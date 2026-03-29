import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [darkMode, setDarkMode] = useState(false);

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            项目未找到
          </h2>
          <Link
            to="/"
            className={`inline-block px-6 py-3 rounded-xl font-medium transition-all ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              to="/"
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all text-sm md:text-base ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              ← 返回列表
            </Link>
            <div className="flex items-center gap-2 md:gap-3">
              {prevProject && (
                <Link
                  to={`/project/${prevProject.id}`}
                  className={`px-2.5 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all hover:scale-105 hidden sm:inline-flex ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  ← 上一个
                </Link>
              )}
              {nextProject && (
                <Link
                  to={`/project/${nextProject.id}`}
                  className={`px-2.5 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all hover:scale-105 hidden sm:inline-flex ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  下一个 →
                </Link>
              )}
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
      <main className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className={`p-5 md:p-8 rounded-2xl md:rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 md:gap-4">
              {project.companyLogo && (
                <img src={project.companyLogo} alt={project.company} className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl object-contain flex-shrink-0" />
              )}
              <div className="min-w-0">
                <h1 className={`text-xl md:text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h1>
                <p className={`text-sm md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-medium flex-shrink-0 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {project.language}
              </span>
              <span className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-medium flex items-center gap-1 flex-shrink-0 ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                ⭐ {project.stars.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className={`px-2.5 md:px-3 py-1 rounded-lg text-xs md:text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{tag}</span>
            ))}
          </div>

          {/* GitHub Link */}
          <a
            href={project.github}
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
            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.chineseDescription}</p>
          </section>

          {/* Installation */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🚀 快速安装
            </h2>
            <div className="space-y-3">
              {project.install && Object.entries(project.install).map(([key, command]) => (
                <div key={key} className={`p-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-900' : 'bg-gray-900'}`}>
                  <span className="text-gray-500"># {key}</span>
                  <br />
                  <span className={key === 'npm' ? 'text-green-400' : key === 'yarn' ? 'text-blue-400' : key === 'pip' ? 'text-yellow-400' : key === 'brew' ? 'text-orange-400' : 'text-purple-400'}>
                    {command}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Usage */}
          {project.usage && (
            <section>
              <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                💡 使用示例
              </h2>
              <div className={`p-4 rounded-xl font-mono text-sm overflow-x-auto ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-300'}`}>
                <pre>{project.usage}</pre>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 mt-12 ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            🐉 汇聚中国大厂开源力量 | Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ProjectDetail;
