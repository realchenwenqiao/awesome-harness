import { useState } from 'react';

function DeployModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const prompt = project.agentDeployPrompt || `请帮我部署 ${project.name}。\n\n项目信息：\n- 名称: ${project.name}\n- GitHub: ${project.github}\n\n请访问 GitHub 仓库查看安装说明。`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleOpenInClaude = () => {
    const encodedPrompt = encodeURIComponent(prompt);
    window.open(`https://claude.ai/new?q=${encodedPrompt}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-color)]">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                {project.name} 一键部署
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                AI Agent 自动部署提示词
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors text-[var(--text-muted)]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Install Methods */}
          {project.installGuide && Object.keys(project.installGuide).length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">
                支持的部署方式
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.installGuide.docker && (
                  <span className="tag tag-accent">🐳 Docker</span>
                )}
                {project.installGuide.pip && (
                  <span className="tag" style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.15)' }}>
                    📦 Pip
                  </span>
                )}
                {project.installGuide.conda && (
                  <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                    🐍 Conda
                  </span>
                )}
                {project.installGuide.source && (
                  <span className="tag" style={{ background: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.15)' }}>
                    🔧 源码
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Prompt Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[var(--text-secondary)]">
              复制下方提示词发送给 AI Agent
            </h4>
            <div className="relative">
              <pre className="p-4 bg-[var(--bg-tertiary)] rounded-xl text-sm text-[var(--text-secondary)] font-mono whitespace-pre-wrap max-h-64 overflow-auto border border-[var(--border-color)]">
                {prompt}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 text-xs bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg transition-colors"
              >
                {copied ? '已复制 ✓' : '复制'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 btn btn-primary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>复制提示词</span>
            </button>
            <button
              onClick={handleOpenInClaude}
              className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>在 Claude 中打开</span>
            </button>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-lg bg-[var(--accent-color)]/5 border border-[var(--accent-color)]/10">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--accent-color)] font-medium">💡 提示：</span>
              将上方提示词发送给 Claude、Cursor 或其他 AI Agent，它会自动帮你完成部署。
              请确保你的环境满足项目的系统要求。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeployModal;
