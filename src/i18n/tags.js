// 标签国际化映射表
// 项目数据只存储英文标识符，显示时根据语言切换

export const categoryLabels = {
  'agent-framework': { zh: 'Agent框架', en: 'Agent Framework' },
  'multi-agent': { zh: '多智能体', en: 'Multi-Agent' },
  'workflow-engine': { zh: '工作流引擎', en: 'Workflow Engine' },
  'rag-system': { zh: 'RAG系统', en: 'RAG System' },
  'memory-system': { zh: '记忆系统', en: 'Memory System' },
  'tool-integration': { zh: '工具集成', en: 'Tool Integration' },
  'evaluation': { zh: '评估测试', en: 'Evaluation' },
  'dev-tool': { zh: '开发工具', en: 'Dev Tool' }
};

export const useCaseLabels = {
  'software-development': { zh: '软件开发', en: 'Software Development' },
  'process-automation': { zh: '流程自动化', en: 'Process Automation' },
  'agent-deployment': { zh: 'Agent部署', en: 'Agent Deployment' },
  'model-evaluation': { zh: '模型评估', en: 'Model Evaluation' },
  'knowledge-management': { zh: '知识管理', en: 'Knowledge Management' },
  'code-review': { zh: '代码审查', en: 'Code Review' },
  'testing': { zh: '测试', en: 'Testing' },
  'cli-automation': { zh: 'CLI自动化', en: 'CLI Automation' },
  'agent-testing': { zh: 'Agent测试', en: 'Agent Testing' },
  'plugin-ecosystem': { zh: '插件生态', en: 'Plugin Ecosystem' },
  'desktop-automation': { zh: '桌面自动化', en: 'Desktop Automation' },
  'web-automation': { zh: '网页自动化', en: 'Web Automation' },
  'security-compliance': { zh: '安全合规', en: 'Security & Compliance' }
};

// 获取显示文本的辅助函数
export function getCategoryLabel(category, language = 'zh') {
  return categoryLabels[category]?.[language] || category;
}

export function getUseCaseLabel(useCase, language = 'zh') {
  return useCaseLabels[useCase]?.[language] || useCase;
}

export function getUseCaseLabels(useCases, language = 'zh') {
  if (!Array.isArray(useCases)) return [];
  return useCases.map(uc => getUseCaseLabel(uc, language));
}
