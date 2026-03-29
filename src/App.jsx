import { useState } from 'react';
import './App.css';
import projects from './data/projects.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const companies = ['all', ...new Set(projects.map(p => p.company))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.includes(searchTerm));
    const matchesCompany = selectedCompany === 'all' || project.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getRandomProject = () => {
    const randomIndex = Math.floor(Math.random() * projects.length);
    setSelectedProject(projects[randomIndex]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">龙</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  中国大厂开源
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  awesome-cnbigcompany-hub
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={getRandomProject}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🎲 随机发现
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all hover:scale-105 ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedProject ? (
          <>
            {/* Search & Filter */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索项目、技术栈、公司..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 text-lg transition-all focus:outline-none focus:ring-4 focus:ring-red-500/20 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500'}`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {companies.map(company => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCompany === company
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {company === 'all' ? '全部' : company}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{projects.length}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>开源项目</p>
              </div>
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{new Set(projects.map(p => p.company)).size}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>大厂</p>
              </div>
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{(projects.reduce((sum, p) => sum + p.stars, 0) / 1000).toFixed(0)}k+</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>总星标</p>
              </div>
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>中文</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>文档</p>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {project.companyLogo && (
                        <img src={project.companyLogo} alt={project.company} className="w-8 h-8 rounded-lg object-contain" />
                      )}
                      <div>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{project.company}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      {project.language}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-2 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      ⭐ {project.stars.toLocaleString()}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>查看详情 →</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className="text-4xl mb-4">🔍</p>
                <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>没有找到匹配的项目</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>试试其他关键词吧</p>
              </div>
            )}
          </>
        ) : (
          /* Project Detail */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              ← 返回列表
            </button>

            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {selectedProject.companyLogo && (
                    <img src={selectedProject.companyLogo} alt={selectedProject.company} className="w-16 h-16 rounded-2xl object-contain" />
                  )}
                  <div>
                    <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProject.name}</h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedProject.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedProject.language}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1 ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                    ⭐ {selectedProject.stars.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{tag}</span>
                ))}
              </div>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-600 transition-all mb-8"
              >
                <span>GitHub</span>
                <span>→</span>
              </a>

              {/* Chinese Description */}
              <section className="mb-8">
                <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📝 项目介绍
                </h2>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedProject.chineseDescription}</p>
              </section>

              {/* Installation */}
              <section className="mb-8">
                <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🚀 快速安装
                </h2>
                <div className="space-y-3">
                  {selectedProject.install.npm && (
                    <div className={`p-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                      <span className="text-gray-500"># npm</span>
                      <br />
                      {selectedProject.install.npm}
                    </div>
                  )}
                  {selectedProject.install.yarn && (
                    <div className={`p-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-900 text-blue-400' : 'bg-gray-900 text-blue-400'}`}>
                      <span className="text-gray-500"># yarn</span>
                      <br />
                      {selectedProject.install.yarn}
                    </div>
                  )}
                  {selectedProject.install.pnpm && (
                    <div className={`p-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-900 text-yellow-400' : 'bg-gray-900 text-yellow-400'}`}>
                      <span className="text-gray-500"># pnpm</span>
                      <br />
                      {selectedProject.install.pnpm}
                    </div>
                  )}
                </div>
              </section>

              {/* Usage */}
              <section>
                <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  💡 使用示例
                </h2>
                <div className={`p-4 rounded-xl font-mono text-sm overflow-x-auto ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-300'}`}>
                  <pre>{selectedProject.usage}</pre>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 mt-12 ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            🐉 汇聚中国大厂开源力量 | Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
