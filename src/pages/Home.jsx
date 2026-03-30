import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedUseCase, setSelectedUseCase] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // 切换主题
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // 计算统计数据
  const stats = useMemo(() => {
    const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);
    const companies = [...new Set(projects.map(p => p.company))];

    // 按企业统计
    const companyStats = companies.map(company => {
      const companyProjects = projects.filter(p => p.company === company);
      const stars = companyProjects.reduce((sum, p) => sum + p.stars, 0);
      return { name: company, count: companyProjects.length, stars };
    }).sort((a, b) => b.stars - a.stars);

    // 按年份统计
    const yearStats = {};
    projects.forEach(p => {
      const year = new Date(p.createdAt).getFullYear();
      yearStats[year] = (yearStats[year] || 0) + 1;
    });

    return {
      totalProjects: projects.length,
      totalCompanies: companies.length,
      totalStars,
      companyStats,
      yearStats
    };
  }, []);

  // 筛选数据
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const companies = ['all', ...new Set(projects.map(p => p.company))];
  const useCases = ['all', ...new Set(projects.flatMap(p => p.useCases || []))];

  const categoryLabels = {
    'all': '全部',
    'ai-model': '大模型',
    'ai-infra': '基础设施',
    'ai-framework': '深度学习框架',
    'ai-nlp': 'NLP',
    'ai-cv': '计算机视觉',
    'ai-multimodal': '多模态',
    'ai-training': '训练框架',
    'ai-app': 'AI应用',
    'tools': '工具'
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.chineseDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesCompany = selectedCompany === 'all' || project.company === selectedCompany;
      const matchesUseCase = selectedUseCase === 'all' || (project.useCases || []).includes(selectedUseCase);

      return matchesSearch && matchesCategory && matchesCompany && matchesUseCase;
    });
  }, [searchTerm, selectedCategory, selectedCompany, selectedUseCase]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCompany('all');
    setSelectedUseCase('all');
  };

  const getRandomProject = () => {
    if (filteredProjects.length === 0) return null;
    return filteredProjects[Math.floor(Math.random() * filteredProjects.length)];
  };

  // 格式化数字
  const formatNumber = (num) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen paper-texture">

        {/* 顶部导航 - 新中式风格 */}
        <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[var(--border-color)]
                         bg-[var(--bg-primary)]/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo区域 */}
              <div className="flex items-center gap-4">
                <div className="seal-mark w-12 h-12 text-lg">开源</div>
                <div>
                  <h1 className="font-calligraphy text-2xl tracking-[0.2em]">
                    中国大厂开源
                  </h1>
                  <p className="text-xs text-[var(--text-muted)] tracking-widest">
                    SELECTED AI PROJECTS
                  </p>
                </div>
              </div>

              {/* 右侧操作 */}
              <div className="flex items-center gap-3">
                {filteredProjects.length > 0 && (
                  <Link
                    to={`/project/${getRandomProject().id}`}
                    className="hidden md:flex items-center gap-2 px-4 py-2
                             border border-[var(--border-color)] rounded-sm
                             hover:border-[var(--cinnabar)] hover:text-[var(--cinnabar)]
                             transition-all duration-300 text-sm"
                  >
                    <span>随机</span>
                    <span className="text-lg">骰</span>
                  </Link>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="p-3 border border-[var(--border-color)] rounded-sm
                           hover:border-[var(--gold-accent)] transition-all duration-300"
                >
                  {darkMode ? '明' : '暗'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          {/* Hero区域 - 项目介绍 */}
          <section className="relative mb-16 animate-fade-in-up">
            {/* 装饰性竖排文字 */}
            <div className="absolute -left-8 top-0 hidden lg:block">
              <div className="vertical-text text-[var(--text-muted)] text-sm tracking-[1em] opacity-50">
                汇聚开源力量
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 左侧文案 */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[var(--cinnabar)]"></div>
                  <span className="text-[var(--cinnabar)] text-sm tracking-widest">精选项目</span>
                </div>

                <h2 className="font-calligraphy text-4xl md:text-5xl lg:text-6xl leading-tight">
                  探索中国科技大厂
                  <span className="text-[var(--cinnabar)]"> AI开源 </span>
                  生态
                </h2>

                <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
                  汇聚阿里、腾讯、百度、字节跳动、DeepSeek等国内顶尖科技企业的开源AI项目，
                  为大模型、NLP、计算机视觉等领域提供精选资源。
                </p>

                {/* 快速统计 */}
                <div className="flex flex-wrap gap-6 pt-4">
                  {[
                    { value: stats.totalProjects, label: '开源项目', unit: '个' },
                    { value: stats.totalCompanies, label: '科技企业', unit: '家' },
                    { value: formatNumber(stats.totalStars), label: 'GitHub星标', unit: '' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-calligraphy text-3xl text-[var(--cinnabar)]">
                        {stat.value}
                        <span className="text-sm">{stat.unit}</span>
                      </div>
                      <div className="text-xs text-[var(--text-muted)] tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧数据看板 */}
              <div className="relative">
                <div className="absolute inset-0 ink-gradient rounded-2xl"></div>
                <div className="relative bg-[var(--bg-secondary)]/50 border border-[var(--border-color)]
                              rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="font-calligraphy text-xl mb-6 flex items-center gap-2">
                    <span className="text-[var(--cinnabar)]">◆</span>
                    企业开源贡献排行
                  </h3>

                  {/* 企业排行榜 */}
                  <div className="space-y-4">
                    {stats.companyStats.slice(0, 5).map((company, index) => (
                      <div key={company.name} className="flex items-center gap-4">
                        <div className="w-6 text-center font-calligraphy text-[var(--text-muted)]">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{company.name}</span>
                            <span className="text-xs text-[var(--text-muted)]">
                              {formatNumber(company.stars)} ⭐
                            </span>
                          </div>
                          <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[var(--cinnabar)] to-[var(--gold-accent)]
                                       rounded-full transition-all duration-1000"
                              style={{ width: `${(company.stars / stats.companyStats[0].stars) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="divider-ink mb-12"></div>

          {/* 搜索与筛选区域 */}
          <section className="mb-12 space-y-8">
            {/* 搜索框 */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl">寻</div>
              <input
                type="text"
                placeholder="搜索项目名称、技术栈、应用场景..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-transparent
                         border-2 border-[var(--border-color)]
                         focus:border-[var(--cinnabar)] focus:outline-none
                         transition-all duration-300 text-lg
                         placeholder:text-[var(--text-muted)]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                           text-[var(--text-muted)] hover:text-[var(--cinnabar)]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 三维度筛选 */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* 企业筛选 */}
              <div className="space-y-3">
                <h4 className="text-sm text-[var(--text-muted)] tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--cinnabar)] rounded-full"></span>
                  按企业筛选
                </h4>
                <div className="flex flex-wrap gap-2">
                  {companies.map(company => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`filter-btn px-3 py-1.5 text-sm border border-[var(--border-color)]
                                ${selectedCompany === company ? 'active border-[var(--cinnabar)]' : ''}
                                hover:border-[var(--cinnabar)] transition-all`}
                    >
                      {company === 'all' ? '全部' : company}
                    </button>
                  ))}
                </div>
              </div>

              {/* 类别筛选 */}
              <div className="space-y-3">
                <h4 className="text-sm text-[var(--text-muted)] tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--gold-accent)] rounded-full"></span>
                  按技术类别
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`filter-btn px-3 py-1.5 text-sm border border-[var(--border-color)]
                                ${selectedCategory === category ? 'active border-[var(--gold-accent)]' : ''}
                                hover:border-[var(--gold-accent)] transition-all`}
                    >
                      {categoryLabels[category] || category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 应用场景筛选 */}
              <div className="space-y-3">
                <h4 className="text-sm text-[var(--text-muted)] tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  按应用场景
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.slice(0, 8).map(useCase => (
                    <button
                      key={useCase}
                      onClick={() => setSelectedUseCase(useCase)}
                      className={`filter-btn px-3 py-1.5 text-sm border border-[var(--border-color)]
                                ${selectedUseCase === useCase ? 'active border-emerald-500 text-emerald-600' : ''}
                                hover:border-emerald-500 transition-all`}
                    >
                      {useCase === 'all' ? '全部' : useCase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 清除筛选 */}
            {(selectedCompany !== 'all' || selectedCategory !== 'all' || selectedUseCase !== 'all' || searchTerm) && (
              <div className="flex justify-center">
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--cinnabar)] hover:underline flex items-center gap-2"
                >
                  <span>清除所有筛选</span>
                  <span>⟲</span>
                </button>
              </div>
            )}
          </section>

          {/* 结果统计 */}
          <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-[var(--text-muted)] text-sm">
              找到 <span className="text-[var(--cinnabar)] font-semibold">{filteredProjects.length}</span> 个项目
            </p>
            <div className="text-xs text-[var(--text-muted)]">
              按 Star 数排序
            </div>
          </div>

          {/* 项目网格 */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.sort((a, b) => b.stars - a.stars).map((project, index) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="group card-hover bg-[var(--bg-secondary)]/50
                           border border-[var(--border-color)]
                           p-6 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* 悬停时的水墨扩散效果 */}
                  <div className="absolute inset-0 ink-gradient opacity-0 group-hover:opacity-100
                                transition-opacity duration-500"></div>

                  <div className="relative">
                    {/* 头部：Logo和公司 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {project.companyLogo ? (
                          <img
                            src={project.companyLogo}
                            alt={project.company}
                            className="w-10 h-10 rounded-sm object-contain bg-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-[var(--bg-tertiary)] flex items-center justify-center
                                        text-sm font-bold text-[var(--text-muted)]">
                            {project.company.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className="font-calligraphy text-xl group-hover:text-[var(--cinnabar)]
                                       transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)]">{project.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[var(--gold-accent)]">
                          <span>★</span>
                          <span className="text-sm font-medium">
                            {project.stars >= 10000
                              ? (project.stars / 10000).toFixed(1) + '万'
                              : project.stars >= 1000
                                ? (project.stars / 1000).toFixed(1) + 'k'
                                : project.stars}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2
                                leading-relaxed">
                      {project.chineseDescription}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2">
                      {/* 类别标签 */}
                      <span className="tag-style bg-[var(--cinnabar)]/10 text-[var(--cinnabar)]
                                     border-[var(--cinnabar)]/30">
                        {categoryLabels[project.category] || project.category}
                      </span>

                      {/* 应用场景 */}
                      {(project.useCases || []).slice(0, 2).map((useCase, i) => (
                        <span key={i} className="tag-style text-[var(--text-muted)]">
                          {useCase}
                        </span>
                      ))}

                      {/* 技术标签 */}
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="tag-style text-[var(--text-muted)] text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 底部信息 */}
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]
                                  flex justify-between items-center text-xs text-[var(--text-muted)]">
                      <span>{project.language}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">无</div>
              <h3 className="font-calligraphy text-2xl mb-2">未找到匹配项目</h3>
              <p className="text-[var(--text-muted)] mb-6">请尝试调整筛选条件</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 border border-[var(--cinnabar)] text-[var(--cinnabar)]
                         hover:bg-[var(--cinnabar)] hover:text-white transition-all"
              >
                清除筛选
              </button>
            </div>
          )}

        </main>

        {/* 页脚 */}
        <footer className="border-t border-[var(--border-color)] py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="seal-mark w-8 h-8 text-xs mx-auto mb-4">开源</div>
            <p className="font-calligraphy text-lg mb-2">汇聚中国科技开源力量</p>
            <p className="text-xs text-[var(--text-muted)] tracking-widest">
              SELECTED AI PROJECTS FROM CHINA'S TECH GIANTS
            </p>
            <div className="mt-6 text-xs text-[var(--text-muted)]">
              共收录 {stats.totalProjects} 个项目 · {stats.totalCompanies} 家企业 · {formatNumber(stats.totalStars)} Stars
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;
