import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';
import { Logo } from '../components/Logo';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { getCategoryLabel, getUseCaseLabel } from '../i18n/tags';
import { useTranslations } from '../i18n/useTranslations';

// 简单 Markdown 转 HTML 函数
function markdownToHtml(text) {
  if (!text) return '';
  return text
    // 粗体 **text** -> <strong>text</strong>
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // 斜体 *text* -> <em>text</em>
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // 代码块 `text` -> <code>text</code>
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // 换行符处理
    .replace(/\n/g, '<br>');
}

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isZh } = useLanguage();
  const { t } = useTranslations();
  const project = projects.find(p => p.id === id);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-serif text-2xl mb-2 text-[var(--text-primary)]">
            {t('projectDetail.notFound.title')}
          </h2>
          <Link to="/" className="btn btn-primary">
            {t('projectDetail.notFound.backHome')}
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

  const countryLabels = {
    '中国': isZh ? '🇨🇳 中国' : '🇨🇳 China',
    '美国': isZh ? '🇺🇸 美国' : '🇺🇸 USA',
    '荷兰': isZh ? '🇳🇱 荷兰' : '🇳🇱 Netherlands',
    '法国': isZh ? '🇫🇷 法国' : '🇫🇷 France'
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
                {t('projectDetail.nav.backToList')}
              </Link>
              <div className="flex items-center gap-2">
                {prevProject && (
                  <Link
                    to={`/project/${prevProject.id}`}
                    className="hidden sm:flex btn btn-secondary text-sm"
                  >
                    {t('projectDetail.nav.previous')}
                  </Link>
                )}
                {nextProject && (
                  <Link
                    to={`/project/${nextProject.id}`}
                    className="hidden sm:flex btn btn-secondary text-sm"
                  >
                    {t('projectDetail.nav.next')}
                  </Link>
                )}
                <LanguageSwitcher />
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
              <span className="tag tag-accent">{getCategoryLabel(project.category, language)}</span>
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
              <span>{t('projectDetail.buttons.viewGithub')}</span>
              <span>→</span>
            </a>

            {/* Description */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                {isZh ? '项目介绍' : 'About'}
              </h2>
              <div
                className="text-[var(--text-secondary)] leading-relaxed project-description"
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(
                    isZh
                      ? (project.chineseDescription || project.descriptionZh || project.description || '')
                      : (project.detailedDescription || project.description || '')
                  )
                }}
              />
            </section>

            {/* Use Cases */}
            {project.useCases && project.useCases.length > 0 && (
              <section className="mb-10">
                <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                  {t('projectDetail.sections.useCases')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)]">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]
                                     flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-[var(--text-secondary)]">{getUseCaseLabel(useCase, language)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline - Simplified to single row */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                {t('projectDetail.sections.timeline')}
              </h2>
              <div className="flex flex-wrap gap-6 p-4 rounded-lg bg-[var(--bg-tertiary)]">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--accent-color)] text-lg">📅</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{t('projectDetail.timeline.created')}</p>
                    <p className="font-medium">{project.createdAt ? new Date(project.createdAt).toLocaleDateString(isZh ? 'zh-CN' : 'en-US') : t('common.unknown')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--accent-color)] text-lg">🔄</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{t('projectDetail.timeline.lastUpdated')}</p>
                    <p className="font-medium">{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString(isZh ? 'zh-CN' : 'en-US') : t('common.unknown')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI One-Click Deploy - HIDDEN as per user request */}
            {/*
            <section className="mb-10">
              ... AI deploy content hidden ...
            </section>
            */}

            {/* Installation Guide */}
            <section className="mb-10">
              <h2 className="font-serif text-xl font-semibold mb-4 text-[var(--text-primary)]">
                {t('projectDetail.sections.installGuide')}
              </h2>

              {project.installGuide && Object.keys(project.installGuide).length > 0 ? (
                <div className="space-y-6">
                  {/* Docker 安装 */}
                  {project.installGuide.docker && (
                    <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center gap-2">
                        <span className="text-xl">🐳</span>
                        <span className="font-medium">{t('projectDetail.install.docker')}</span>
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
                        <span className="font-medium">{t('projectDetail.install.conda')}</span>
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
                        <span className="font-medium">{t('projectDetail.install.pip')}</span>
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
                        <span className="font-medium">{t('projectDetail.install.source')}</span>
                      </div>
                      <div className="p-4">
                        {project.installGuide.source.prerequisites && (
                          <div className="mb-4">
                            <p className="text-sm text-[var(--text-muted)] mb-2">{t('projectDetail.install.prerequisites')}</p>
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
                      <p className="text-sm text-[var(--text-muted)] mb-2">{t('projectDetail.install.requirements')}</p>
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
                    {t('projectDetail.install.noGuide')}
                  </p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    {t('projectDetail.install.visitGithub')}
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
              {t('home.footer.globalTagline')}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default ProjectDetail;
