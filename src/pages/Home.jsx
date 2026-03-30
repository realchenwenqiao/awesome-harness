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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // 分类标签映射（必须在 useMemo 之前定义）
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

    // 分类统计
    const categoryStats = {};
    projects.forEach(p => {
      const cat = categoryLabels[p.category] || p.category;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    // 国家统计
    const countryStats = {};
    projects.forEach(p => {
      const country = p.country || '其他';
      countryStats[country] = (countryStats[country] || 0) + 1;
    });

    // Top 10 项目
    const topProjects = [...projects].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 10);

    return {
      totalProjects: projects.length,
      totalCompanies: companies.length,
      totalCountries: countries.length,
      totalStars,
      companyStats,
      categoryStats,
      countryStats,
      topProjects
    };
  }, []);

  // 筛选数据
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const companies = ['all', ...new Set(projects.map(p => p.company))];
  const countries = ['all', ...new Set(projects.map(p => p.country).filter(Boolean))];
  const useCases = ['all', ...new Set(projects.flatMap(p => p.useCases || []))];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const searchLower = searchTerm.toLowerCase();
      const text = `${project.name} ${project.description || ''} ${project.chineseDescription || ''} ${(project.tags || []).join(' ')}`.toLowerCase();
      const matchesSearch = !searchTerm || text.includes(searchLower);

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesCompany = selectedCompany === 'all' || project.company === selectedCompany;
      const matchesCountry = selectedCountry === 'all' || project.country === selectedCountry;
      const matchesUseCase = selectedUseCase === 'all' || (project.useCases || []).includes(selectedUseCase);

      return matchesSearch && matchesCategory && matchesCompany && matchesCountry && matchesUseCase;
    });
  }, [searchTerm, selectedCategory, selectedCompany, selectedCountry, selectedUseCase]);

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
                    Awesome Harmless
                  </h1>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
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
                  <span className="text-[var(--accent-color)] text-sm font-medium">全球精选开源项目</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-color)]"></span>
                  <span className="text-[var(--text-muted)] text-sm">{stats.totalProjects} 个项目</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight">
                  汇聚顶级企业以及最佳实践的
                  <span className="text-[var(--accent-color)]"> AI Agent, Harmless</span>
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
                    { value: stats.totalProjects, label: '开源项目' },
                    { value: stats.totalCompanies, label: '科技企业' },
                    { value: stats.totalCountries, label: '国家/地区' },
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

              {/* Right: Stats Dashboard - Swapped: Top Projects now on right */}
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

          {/* Data Insights Dashboard - Layout swapped */}
          <section className="mb-12">
            <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
              <span className="text-[var(--accent-color)]">◆</span>
              数据洞察
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: Company Stats (was on right, now on left) */}
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

              {/* Right: Category & Country Distribution */}
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

          {/* Search & Filter Section */}
          <section className="mb-10 space-y-8">
            {/* Search - Fixed: removed icon from input, using placeholder instead */}
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
              {/* Country Filter - New */}
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

              {/* Company Filter */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按企业筛选</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {companies.slice(0, 15).map(company => (
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
                      onClick={() => alert(`更多企业：${companies.slice(15).join(', ')}`)}
                      className="text-sm text-[var(--accent-color)] hover:underline px-2 py-1"
                    >
                      +{companies.length - 16} 更多
                    </button>
                  )}
                </div>
              </div>

              {/* Use Case Filter - Added back */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">按应用场景</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.slice(0, 12).map(useCase => (
                    <button
                      key={useCase}
                      onClick={() => setSelectedUseCase(useCase)}
                      className={`filter-btn ${selectedUseCase === useCase ? 'active' : ''}`}
                    >
                      {useCase === 'all' ? '全部场景' : useCase}
                    </button>
                  ))}
                  {useCases.length > 12 && (
                    <span className="text-sm text-[var(--text-muted)] px-2 py-1">
                      +{useCases.length - 13} 更多
                    </span>
                  )}
                </div>
              </div>

              {/* Category Filter - Removed ai-model */}
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
                  {/* Header: Company & Stars - Removed avatar */}
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

                  {/* Footer - Removed language display */}
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

        {/* Footer - Updated for global focus */}
        <footer className="border-t border-[var(--border-color)] py-12 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Logo className="text-[var(--accent-color)] mx-auto mb-4" size={32} />
            <p className="font-serif text-lg mb-2">连接全球 AI Agent 开源生态</p>
            <p className="text-sm text-[var(--text-muted)]">
              收录 {stats.totalProjects} 个项目 · {stats.totalCompanies} 家企业 · {stats.totalCountries} 个国家/地区
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
