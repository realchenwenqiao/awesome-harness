import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { Logo } from '../components/Logo';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedUseCase, setSelectedUseCase] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [showNewStars, setShowNewStars] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [showAllUseCases, setShowAllUseCases] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // 分类标签映射
  const categoryLabels = {
    'all': '全部',
    'ai-agent': 'AI Agent',
    'ai-workflow': '工作流编排',
    'ai-rag': 'RAG 工具',
    'ai-memory': '记忆系统',
    'ai-tool': 'AI 工具',
    'ai-integration': '集成方案',
    'automation': '自动化',
    'harness': 'Harness 范式',
    'ai-infra': 'Agent 基础设施'
  };

  // 国家/地区标签映射
  const countryLabels = {
    'all': '全部地区',
    '中国': '🇨🇳 中国',
    '美国': '🇺🇸 美国',
    '荷兰': '🇳🇱 荷兰',
    '法国': '🇫🇷 法国'
  };

  // 项目分区：1000 stars 以上和以下
  const MIN_STARS = 1000;

  const establishedProjects = useMemo(() => {
    return projects.filter(p => (p.stars || 0) >= MIN_STARS);
  }, []);

  const risingStars = useMemo(() => {
    return projects.filter(p => (p.stars || 0) < MIN_STARS);
  }, []);

  // AI Builder 统计（个人开发者 - 非公司项目）
  const aiBuilders = useMemo(() => {
    const companies = [...new Set(projects.map(p => p.company))];
    // 假设知名公司列表
    const knownCompanies = [
      'OpenAI', 'Anthropic', 'Google', 'Meta', 'Microsoft', 'Amazon', 'NVIDIA',
      '阿里巴巴', '腾讯', '百度', '字节跳动', 'DeepSeek', '智谱AI', '商汤', '华为', '京东', '美团', '小米', '快手', '网易',
      'LangChain', 'Hugging Face', 'LlamaIndex', 'CrewAI', 'AutoGPT',
      'Stripe', 'Vercel', 'Replicate', 'Modal', 'Fixie', 'Dust', 'Poe',
      'Pinecone', 'Weaviate', 'Chroma', 'Cohere',
      'InfiniFlow', 'THUDM', 'zhipuai', 'open-mmlab'
    ];
    return companies.filter(c => !knownCompanies.includes(c));
  }, []);

  // 统计数据
  const stats = useMemo(() => {
    const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
    const companies = [...new Set(projects.map(p => p.company))];
    const countries = [...new Set(projects.map(p => p.country).filter(Boolean))];

    const companyStats = companies.map(company => {
      const companyProjects = projects.filter(p => p.company === company);
      const stars = companyProjects.reduce((sum, p) => sum + (p.stars || 0), 0);
      return { name: company, count: companyProjects.length, stars };
    }).sort((a, b) => b.stars - a.stars);

    const categoryStats = {};
    projects.forEach(p => {
      const cat = categoryLabels[p.category] || p.category;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    const countryStats = {};
    projects.forEach(p => {
      const country = p.country || '其他';
      countryStats[country] = (countryStats[country] || 0) + 1;
    });

    const topProjects = [...projects].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 10);

    return {
      totalProjects: projects.length,
      establishedCount: establishedProjects.length,
      risingCount: risingStars.length,
      totalCompanies: companies.length,
      totalCountries: countries.length,
      aiBuilderCount: aiBuilders.length,
      totalStars,
      companyStats,
      categoryStats,
      countryStats,
      topProjects
    };
  }, [establishedProjects, risingStars, aiBuilders]);

  // 筛选数据
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const companies = ['all', ...new Set(projects.map(p => p.company))];
  const countries = ['all', ...new Set(projects.map(p => p.country).filter(Boolean))];
  const useCases = ['all', ...new Set(projects.flatMap(p => p.useCases || []))];

  // 当前展示的项目列表
  const currentProjects = showNewStars ? risingStars : establishedProjects;

  const filteredProjects = useMemo(() => {
    return currentProjects.filter(project => {
      const searchLower = searchTerm.toLowerCase();
      const text = `${project.name} ${project.description || ''} ${project.chineseDescription || ''} ${(project.tags || []).join(' ')}`.toLowerCase();
      const matchesSearch = !searchTerm || text.includes(searchLower);

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesCompany = selectedCompany === 'all' || project.company === selectedCompany;
      const matchesCountry = selectedCountry === 'all' || project.country === selectedCountry;
      const matchesUseCase = selectedUseCase === 'all' || (project.useCases || []).includes(selectedUseCase);

      return matchesSearch && matchesCategory && matchesCompany && matchesCountry && matchesUseCase;
    });
  }, [currentProjects, searchTerm, selectedCategory, selectedCompany, selectedCountry, selectedUseCase]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCompany('all');
    setSelectedCountry('all');
    setSelectedUseCase('all');
  };

  const getRandomProject = () => {
    if (filteredProjects.length === 0) return null;
    return filteredProjects[Math.floor(Math.random() * filteredProjects.length)];
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-[var(--border-color)]
                         bg-[var(--bg-secondary)]/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Logo className="text-[var(--accent-color)]" size={36} />
                <div>
                  <h1 className="font-serif text-xl font-semibold tracking-tight">
                    Awesome Harness
                  </h1>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {/* Rising Stars Toggle */}
                <button
                  onClick={() => setShowNewStars(!showNewStars)}
                  className={`btn text-sm ${showNewStars ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <span>🌟</span>
                  <span className="hidden sm:inline">{showNewStars ? '返回精选' : '新星榜'}</span>
                </button>
                {/* GitHub Link */}
                <a
                  href="https://github.com/realchenwenqiao/awesome-harness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm hidden sm:flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                {filteredProjects.length > 0 && (
                  <Link
                    to={`/project/${getRandomProject().id}`}
                    className="hidden sm:flex btn btn-secondary text-sm"
                  >
                    <span>随机探索</span>
                    <span className="text-lg">✦</span>
                  </Link>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="btn btn-secondary p-2"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Hero Section */}
          <section className="mb-16 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title & Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent-color)] text-sm font-medium">Awesome Harness</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-color)]"></span>
                  <span className="text-[var(--text-muted)] text-sm">{showNewStars ? stats.risingCount : stats.establishedCount} 个项目</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight">
                  汇聚顶级企业以及最佳实践的
                  <span className="text-[var(--accent-color)]"> AI Agent, Harness</span>
                  开源生态
                </h2>

                <p className="text-[var(--text-secondary)] text-lg max-w-lg leading-relaxed">
                  聚焦 AI Agent 生态和 Harness 范式的可直接使用工具，
                  收录 OpenAI、Anthropic、Google、阿里巴巴、腾讯、百度等全球 30+ 科技企业的开源项目。
                  汇聚顶级开发者的最佳实践。
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-8 pt-4">
                  {[
                    { value: showNewStars ? stats.risingCount : stats.establishedCount, label: showNewStars ? '新生代项目' : '精选项目' },
                    { value: stats.totalCompanies, label: '科技企业' },
                    { value: stats.aiBuilderCount, label: 'AI Builder' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="font-serif text-3xl text-[var(--accent-color)] font-semibold">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Top 10 Projects */}
              <div className="card p-6">
                <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
                  <span className="text-[var(--accent-color)]">◆</span>
                  Star 数 Top 10 项目
                </h3>

                <div className="space-y-3">
                  {stats.topProjects.map((p, i) => (
                    <Link
                      key={p.id}
                      to={`/project/${p.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors group"
                    >
                      <span className="w-5 text-center text-sm text-[var(--text-muted)] font-medium">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent-color)] transition-colors">
                            {p.name}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">{p.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        <span>★</span>
                        <span>{formatNumber(p.stars)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="divider mb-12"></div>

          {/* Data Insights Dashboard */}
          <section className="mb-12">
            <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
              <span className="text-[var(--accent-color)]">◆</span>
              数据洞察
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: Company Stats */}
              <div className="card p-6">
                <h3 className="font-serif text-lg mb-6 flex items-center gap-2">
                  <span className="text-[var(--accent-color)]">◆</span>
                  企业开源贡献排行
                </h3>

                <div className="space-y-4">
                  {stats.companyStats.slice(0, 10).map((company, index) => (
                    <div key={company.name} className="flex items-center gap-4">
                      <div className="w-6 text-center text-sm text-[var(--text-muted)] font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{company.name}</span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatNumber(company.stars)} ★
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${(company.stars / stats.companyStats[0].stars) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Stats */}
              <div className="space-y-5">
                {/* Category Stats */}
                <div className="card p-5">
                  <h4 className="text-sm font-medium text-[var(--text-muted)] mb-4">技术分类分布</h4>
                  <div className="space-y-3">
                    {Object.entries(stats.categoryStats)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 8)
                      .map(([cat, count]) => (
                        <div key={cat} className="flex items-center justify-between">
                          <span className="text-sm text-[var(--text-secondary)]">{cat}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[var(--accent-color)] rounded-full"
                                style={{ width: `${(count / stats.totalProjects) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-[var(--text-muted)]">{count}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Country Stats */}
                <div className="card p-5">
                  <h4 className="text-sm font-medium text-[var(--text-muted)] mb-4">国家/地区分布</h4>
                  <div className="space-y-3">
                    {Object.entries(stats.countryStats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([country, count]) => (
                        <div key={country} className="flex items-center justify-between">
                          <span className="text-sm text-[var(--text-secondary)]">{countryLabels[country] || country}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${(count / stats.totalProjects) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-[var(--text-muted)]">{count}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="divider mb-12"></div>

          {/* Section Header */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-2">
              {showNewStars ? '🌟 新生代项目' : '✨ 精选项目'}
            </h2>
            <p className="text-[var(--text-muted)] text-sm">
              {showNewStars
                ? `${stats.risingCount} 个 ${MIN_STARS} stars 以下的潜力项目`
                : `${stats.establishedCount} 个 ${MIN_STARS}+ stars 的成熟项目`
              }
            </p>
          </div>

          {/* Search & Filter Section */}
          <section className="mb-10 space-y-8">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="🔍 搜索项目名称、技术栈、应用场景..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full px-4 py-3"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Multi-dimension Filters */}
            <div className="space-y-6">
              {/* Country Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按国家/地区</h4>
                <div className="flex flex-wrap gap-2">
                  {countries.map(country => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`filter-btn ${selectedCountry === country ? 'active' : ''}`}
                    >
                      {countryLabels[country] || country}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Filter - Expandable */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按企业筛选</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {companies.slice(0, showAllCompanies ? companies.length : 15).map(company => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`filter-btn ${selectedCompany === company ? 'active' : ''}`}
                    >
                      {company === 'all' ? '全部企业' : company}
                    </button>
                  ))}
                  {companies.length > 15 && (
                    <button
                      onClick={() => setShowAllCompanies(!showAllCompanies)}
                      className="text-sm text-[var(--accent-color)] hover:underline px-2 py-1"
                    >
                      {showAllCompanies ? '收起' : `+${companies.length - 16} 更多`}
                    </button>
                  )}
                </div>
              </div>

              {/* Use Case Filter - Expandable */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按应用场景</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {useCases.slice(0, showAllUseCases ? useCases.length : 12).map(useCase => (
                    <button
                      key={useCase}
                      onClick={() => setSelectedUseCase(useCase)}
                      className={`filter-btn ${selectedUseCase === useCase ? 'active' : ''}`}
                    >
                      {useCase === 'all' ? '全部场景' : useCase}
                    </button>
                  ))}
                  {useCases.length > 12 && (
                    <button
                      onClick={() => setShowAllUseCases(!showAllUseCases)}
                      className="text-sm text-[var(--accent-color)] hover:underline px-2 py-1"
                    >
                      {showAllUseCases ? '收起' : `+${useCases.length - 13} 更多`}
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按技术类别</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(cat => cat !== 'ai-model').map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                      {categoryLabels[category] || category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCompany !== 'all' || selectedCategory !== 'all' || selectedCountry !== 'all' || selectedUseCase !== 'all' || searchTerm) && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--accent-color)] hover:underline flex items-center gap-1"
                >
                  <span>清除所有筛选</span>
                  <span>↺</span>
                </button>
              </div>
            )}
          </section>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-[var(--text-secondary)] text-sm">
              找到 <span className="text-[var(--accent-color)] font-semibold">{filteredProjects.length}</span> 个项目
            </p>
            <div className="text-xs text-[var(--text-muted)]">
              按 Star 数排序
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.sort((a, b) => (b.stars || 0) - (a.stars || 0)).map((project, index) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="card group p-5 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  {/* Header: Company & Stars */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-color)]
                                   transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">{project.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>★</span>
                      <span className="text-sm font-medium">
                        {project.stars >= 10000
                          ? (project.stars / 10000).toFixed(1) + '万'
                          : project.stars >= 1000
                            ? (project.stars / 1000).toFixed(1) + 'k'
                            : project.stars || 0}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.chineseDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="tag tag-accent">
                      {categoryLabels[project.category] || project.category}
                    </span>
                    {(project.useCases || []).slice(0, 2).map((useCase, i) => (
                      <span key={i} className="tag">
                        {useCase}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
                    <span className="text-xs text-[var(--text-muted)]">{project.country || '未知'}</span>
                    <span className="text-[var(--accent-color)] text-sm group-hover:translate-x-1 transition-transform">
                      查看详情 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4 text-[var(--text-muted)]">🔍</div>
              <h3 className="font-serif text-2xl mb-2">未找到匹配项目</h3>
              <p className="text-[var(--text-muted)] mb-6">请尝试调整筛选条件</p>
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                清除筛选
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--border-color)] py-12 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Logo className="text-[var(--accent-color)] mx-auto mb-4" size={32} />
            <p className="font-serif text-lg mb-2">Awesome Harness - AI Agent 开源生态</p>
            <p className="text-sm text-[var(--text-muted)]">
              {stats.establishedCount} 个精选项目 · {stats.risingCount} 个新生代项目 · {stats.aiBuilderCount} 位 AI Builder
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              专注 AI Agent Harness 范式 · 去中心化智能 · 开源共建
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;
