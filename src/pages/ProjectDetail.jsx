import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';
import { Logo } from '../components/Logo';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-serif text-2xl mb-2 text-[var(--text-primary)]">
            项目未找到
          </h2>
          <Link to="/" className="btn btn-primary">
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

  const categoryLabels = {
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

  const countryLabels = {
    '中国': '🇨🇳 中国',
    '美国': '🇺🇸 美国',
    '荷兰': '🇳🇱 荷兰',
    '法国': '🇫🇷 法国'
  };

  const handleCopyPrompt = async () => {
    const prompt = project.agentDeployPrompt || `请帮我部署 ${project.name}。\n\n项目信息：\n- 名称: ${project.name}\n- GitHub: ${project.github}\n\n请访问 GitHub 仓库查看安装说明。`;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-[var(--border-color)]
                         bg-[var(--bg-secondary)]/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <Link to="/" className="btn btn-secondary text-sm">
                ← 返回列表
              </Link>
              <div className="flex items-center gap-2">
                {prevProject && (
                  <Link
                    to={`/project/${prevProject.id}`}
                    className="hidden sm:flex btn btn-secondary text-sm"
                  >
                    ← 上一个
                  </Link>
                )}
                {nextProject && (
                  <Link
                    to={`/project/${nextProject.id}`}
                    className="hidden sm:flex btn btn-secondary text-sm"
                  >
                    下一个 →
                  </Link>
                )}
                <button onClick={toggleDarkMode} className="btn btn-secondary p-2">
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="card p-6 md:p-10">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                {project.companyLogo ? (
                  <img
                    src={project.companyLogo}
                    alt={project.company}
                    className="w-14 h-14 rounded-xl object-contain bg-[var(--bg-tertiary)]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--bg-tertiary)]
                                text-lg font-semibold text-[var(--text-muted)]">
                    {project.company?.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
                    {project.name}
                  </h1>
                  <p className="text-[var(--text-secondary)]">{project.company}</p>
                  {project.country && (
                    <span className="text-xs text-[var(--text-muted)]">{countryLabels[project.country] || project.country}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="tag tag-accent">
                  ★ {(project.stars || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="tag tag-accent">{categoryLabels[project.category] || project.category}</span>
              {(project.tags || []).map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            {/* GitHub Link - Prominent placement */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] transition-colors text-[var(--text-primary)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>查看 GitHub 仓库</span>
              <span>→</span>
            </a>

            {/* Description */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                项目介绍
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.chineseDescription}
              </p>
            </section>

            {/* Use Cases */}
            {project.useCases && project.useCases.length > 0 && (
              <section className="mb-10">
                <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                  应用场景
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)]">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]
                                     flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-[var(--text-secondary)]">{useCase}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline - Simplified to single row */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                项目时间线
              </h2>
              <div className="flex flex-wrap gap-6 p-4 rounded-lg bg-[var(--bg-tertiary)]">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--accent-color)] text-lg">📅</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">创建时间</p>
                    <p className="font-medium">{project.createdAt ? new Date(project.createdAt).toLocaleDateString('zh-CN') : '未知'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--accent-color)] text-lg">🔄</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">最后更新</p>
                    <p className="font-medium">{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('zh-CN') : '未知'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI One-Click Deploy - Embedded instead of Modal */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
                <span>🤖</span>
                AI 一键部署
              </h2>

              <div className="border border-[var(--border-color)] rounded-xl overflow-hidden">
                {/* Deploy Methods */}
                {project.installGuide && Object.keys(project.installGuide).length > 0 && (
                  <div className="bg-[var(--bg-tertiary)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border-color)]">
                    <span className="text-sm text-[var(--text-muted)]">支持方式:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.installGuide.docker && (
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-xs">🐳 Docker</span>
                      )}
                      {project.installGuide.pip && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 text-xs">📦 Pip</span>
                      )}
                      {project.installGuide.conda && (
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-xs">🐍 Conda</span>
                      )}
                      {project.installGuide.source && (
                        <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-xs">🔧 源码</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Prompt Preview */}
                <div className="p-4">
                  <p className="text-sm text-[var(--text-muted)] mb-2">复制下方提示词发送给 Claude、Cursor 或其他 AI Agent:</p>
                  <div className="relative">
                    <pre className="p-4 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-secondary)] font-mono whitespace-pre-wrap max-h-48 overflow-auto">
                      {project.agentDeployPrompt || `请帮我部署 ${project.name}。\n\n项目信息：\n- 名称: ${project.name}\n- GitHub: ${project.github}\n\n请访问 GitHub 仓库查看安装说明。`}
                    </pre>
                    <button
                      onClick={handleCopyPrompt}
                      className="absolute top-2 right-2 px-3 py-1.5 text-xs bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg transition-colors"
                    >
                      {copied ? '已复制 ✓' : '复制'}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={handleCopyPrompt}
                      className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>复制提示词</span>
                    </button>
                    <a
                      href={`https://claude.ai/new?q=${encodeURIComponent(project.agentDeployPrompt || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <span>在 Claude 中打开</span>
                    </a>
                  </div>
                </div>

                {/* Tips */}
                <div className="px-4 pb-4">
                  <div className="p-4 rounded-lg bg-[var(--accent-color)]/5 border border-[var(--accent-color)]/10">
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-color)] font-medium">💡 提示：</span>
                      将上方提示词发送给 Claude、Cursor 或其他 AI Agent，它会自动帮你完成部署。
                      请确保你的环境满足项目的系统要求。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation Guide */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                安装指南
              </h2>

              {project.installGuide && Object.keys(project.installGuide).length > 0 ? (
                <div className="space-y-6">
                  {/* Docker 安装 */}
                  {project.installGuide.docker && (
                    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center gap-2">
                        <span className="text-xl">🐳</span>
                        <span className="font-medium">Docker 部署（推荐）</span>
                      </div>
                      <div className="p-4 bg-gray-900">
                        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                          {project.installGuide.docker}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Conda 安装 */}
                  {project.installGuide.conda && (
                    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center gap-2">
                        <span className="text-xl">🐍</span>
                        <span className="font-medium">Conda 安装</span>
                      </div>
                      <div className="p-4 bg-gray-900">
                        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                          {project.installGuide.conda}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Pip 安装 */}
                  {project.installGuide.pip && (
                    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center gap-2">
                        <span className="text-xl">📦</span>
                        <span className="font-medium">Pip 安装</span>
                      </div>
                      <div className="p-4 bg-gray-900">
                        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                          {project.installGuide.pip}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* 源码安装 */}
                  {project.installGuide.source && (
                    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center gap-2">
                        <span className="text-xl">🔧</span>
                        <span className="font-medium">源码安装</span>
                      </div>
                      <div className="p-4">
                        {project.installGuide.source.prerequisites && (
                          <div className="mb-4">
                            <p className="text-sm text-[var(--text-muted)] mb-2">前置依赖：</p>
                            <ul className="list-disc list-inside text-sm text-[var(--text-secondary)]">
                              {project.installGuide.source.prerequisites.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.installGuide.source.commands && (
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                              {project.installGuide.source.commands.join('\n')}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 系统要求 */}
                  {project.installGuide.requirements && (
                    <div className="border border-[var(--border-color)] rounded-lg p-4">
                      <p className="text-sm text-[var(--text-muted)] mb-2">系统要求：</p>
                      <ul className="list-disc list-inside text-sm text-[var(--text-secondary)]">
                        {project.installGuide.requirements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-lg bg-[var(--bg-tertiary)] text-center">
                  <p className="text-[var(--text-muted)] mb-4">
                    安装指南数据正在完善中，请访问 GitHub 仓库获取最新安装说明。
                  </p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    查看 GitHub README
                  </a>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Footer - Updated for global focus */}
        <footer className="border-t border-[var(--border-color)] py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[var(--text-muted)] text-sm">
              连接全球 AI Agent 开源生态 | Built with ❤️
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default ProjectDetail;
