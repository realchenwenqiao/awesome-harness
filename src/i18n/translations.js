// 中英文翻译字典
// 所有 UI 文本的翻译集中管理

export const translations = {
  zh: {
    // 通用文本
    common: {
      all: '全部',
      unknown: '未知',
      viewDetails: '查看详情 →',
      cancel: '取消',
      submit: '提交',
      submitting: '提交中...',
      collapse: '收起',
      more: '+{{count}} 更多',
      back: '返回',
      clear: '清除',
      search: '搜索',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      close: '关闭',
      open: '打开',
      copy: '复制',
      copied: '已复制',
    },

    // Home 页面
    home: {
      // Hero 区域
      hero: {
        subtitle: 'AI Agent Harness 开源生态',
        projectsCount: '个项目',
        title: '汇聚顶级企业以及 AI Builder 关于 AI Agent Harness 的最佳实践开源项目',
        description: '聚焦 AI Agent 生态和 Harness 范式的可直接使用工具，收录 OpenAI、Anthropic、Google、阿里巴巴、腾讯、百度等全球 30+ 科技企业和顶级开发者的开源项目，欢迎投稿补充。',
      },
      // 统计标签
      stats: {
        establishedProjects: '精选项目',
        risingProjects: '新生代项目',
        techCompanies: '科技企业',
        aiBuilders: 'AI Builder',
      },
      // Top 10
      topProjects: {
        title: 'Star 数 Top 10 项目',
      },
      // 数据洞察
      insights: {
        title: '数据洞察',
        companyRanking: '企业开源贡献排行',
        categoryDistribution: '技术分类分布',
        countryDistribution: '国家/地区分布',
      },
      // 项目列表区域
      projectsSection: {
        establishedTitle: '✨ 精选项目',
        risingTitle: '🌟 新生代项目',
        establishedDescription: '{{count}} 个 {{minStars}}+ stars 的成熟项目',
        risingDescription: '{{count}} 个 {{minStars}} stars 以下的潜力项目',
      },
      // 搜索
      search: {
        placeholder: '🔍 搜索项目名称、技术栈、应用场景...',
      },
      // 筛选器
      filters: {
        byCountry: '按国家/地区',
        byCompany: '按企业筛选',
        byUseCase: '按应用场景',
        byCategory: '按技术类别',
        allCompanies: '全部企业',
        allRegions: '全部地区',
        allScenes: '全部场景',
        clearAll: '清除所有筛选 ↺',
      },
      // 结果
      results: {
        found: '找到 {{count}} 个项目',
        thousandStars: '千星项目',
        risingStars: '新星项目',
      },
      // 空状态
      emptyState: {
        title: '未找到匹配项目',
        description: '请尝试调整筛选条件',
        clearFilters: '清除筛选',
      },
      // 页脚
      footer: {
        title: 'AI Agent Harness 开源生态',
        stats: '{{established}} 个精选项目 · {{rising}} 个新生代项目 · {{builders}} 位 AI Builder · 欢迎投稿补充',
        tagline: '专注 AI Agent Harness 范式 · 去中心化智能 · 开源共建',
        globalTagline: '连接全球 AI Agent 开源生态 | Built with ❤️',
      },
    },

    // ProjectDetail 页面
    projectDetail: {
      // 404
      notFound: {
        title: '项目未找到',
        backHome: '返回首页',
      },
      // 导航
      nav: {
        backToList: '← 返回列表',
        previous: '← 上一个',
        next: '下一个 →',
      },
      // 按钮
      buttons: {
        viewGithub: '查看 GitHub 仓库',
      },
      // 区域标题
      sections: {
        about: '项目介绍',
        useCases: '应用场景',
        timeline: '项目时间线',
        installGuide: '安装指南',
      },
      // 时间线
      timeline: {
        created: '创建时间',
        lastUpdated: '最后更新',
      },
      // 安装指南
      install: {
        docker: '🐳 Docker 部署（推荐）',
        conda: '🐍 Conda 安装',
        pip: '📦 Pip 安装',
        source: '🔧 源码安装',
        prerequisites: '前置依赖：',
        requirements: '系统要求：',
        noGuide: '安装指南数据正在完善中，请访问 GitHub 仓库获取最新安装说明。',
        visitGithub: '查看 GitHub README',
      },
    },

    // SubmitProject 组件
    submitProject: {
      modal: {
        title: '提交 GitHub 项目',
      },
      form: {
        urlLabel: 'GitHub 链接',
        urlPlaceholder: 'https://github.com/username 或 https://github.com/username/repository',
      },
      errors: {
        invalidUrl: '请输入有效的 GitHub 链接',
        submitFailed: '提交失败，请稍后重试',
      },
      success: {
        message: '已打开 GitHub Issues 页面，请提交你的请求！',
      },
      issue: {
        title: '提交 GitHub 项目',
        body: '我想要提交以下 GitHub 项目/组织：\n{{url}}\n\n请将其添加到网站中。',
      },
      help: {
        title: '支持以下格式：',
        format1: 'https://github.com/username (用户/组织主页)',
        format2: 'https://github.com/username/repository (具体仓库)',
        note: '提交后，管理员会审核并将其添加到网站中。',
      },
    },
  },

  en: {
    // Common texts
    common: {
      all: 'All',
      unknown: 'Unknown',
      viewDetails: 'View Details →',
      cancel: 'Cancel',
      submit: 'Submit',
      submitting: 'Submitting...',
      collapse: 'Show Less',
      more: '+{{count}} More',
      back: 'Back',
      clear: 'Clear',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      open: 'Open',
      copy: 'Copy',
      copied: 'Copied',
    },

    // Home Page
    home: {
      // Hero Section
      hero: {
        subtitle: 'AI Agent Harness Open Source Ecosystem',
        projectsCount: ' projects',
        title: 'Curated Best Practices from Top Tech Companies and AI Builders for AI Agent Harness',
        description: 'Focused on ready-to-use tools for AI Agent ecosystem and Harness paradigm. Featuring open source projects from 30+ global tech companies including OpenAI, Anthropic, Google, Alibaba, Tencent, Baidu, and top developers. Submissions welcome.',
      },
      // Stats labels
      stats: {
        establishedProjects: 'Established',
        risingProjects: 'Rising Stars',
        techCompanies: 'Tech Companies',
        aiBuilders: 'AI Builders',
      },
      // Top 10
      topProjects: {
        title: 'Top 10 by Stars',
      },
      // Data Insights
      insights: {
        title: 'Data Insights',
        companyRanking: 'Company Contribution Ranking',
        categoryDistribution: 'Category Distribution',
        countryDistribution: 'Country/Region Distribution',
      },
      // Projects Section
      projectsSection: {
        establishedTitle: '✨ Established Projects',
        risingTitle: '🌟 Rising Stars',
        establishedDescription: '{{count}} mature projects with {{minStars}}+ stars',
        risingDescription: '{{count}} promising projects below {{minStars}} stars',
      },
      // Search
      search: {
        placeholder: '🔍 Search projects, tech stack, use cases...',
      },
      // Filters
      filters: {
        byCountry: 'By Country/Region',
        byCompany: 'By Company',
        byUseCase: 'By Use Case',
        byCategory: 'By Category',
        allCompanies: 'All Companies',
        allRegions: 'All Regions',
        allScenes: 'All Scenes',
        clearAll: 'Clear All Filters ↺',
      },
      // Results
      results: {
        found: 'Found {{count}} projects',
        thousandStars: '1000+ Stars',
        risingStars: 'Rising Stars',
      },
      // Empty State
      emptyState: {
        title: 'No Matching Projects',
        description: 'Try adjusting your filters',
        clearFilters: 'Clear Filters',
      },
      // Footer
      footer: {
        title: 'AI Agent Harness Open Source Ecosystem',
        stats: '{{established}} Established · {{rising}} Rising Stars · {{builders}} AI Builders · Submissions Welcome',
        tagline: 'Focused on AI Agent Harness · Decentralized Intelligence · Open Source Collaboration',
        globalTagline: 'Connecting Global AI Agent Open Source Ecosystem | Built with ❤️',
      },
    },

    // ProjectDetail Page
    projectDetail: {
      // 404
      notFound: {
        title: 'Project Not Found',
        backHome: 'Back to Home',
      },
      // Navigation
      nav: {
        backToList: '← Back to List',
        previous: '← Previous',
        next: 'Next →',
      },
      // Buttons
      buttons: {
        viewGithub: 'View GitHub Repository',
      },
      // Section titles
      sections: {
        about: 'About',
        useCases: 'Use Cases',
        timeline: 'Project Timeline',
        installGuide: 'Installation Guide',
      },
      // Timeline
      timeline: {
        created: 'Created',
        lastUpdated: 'Last Updated',
      },
      // Installation Guide
      install: {
        docker: '🐳 Docker Deployment (Recommended)',
        conda: '🐍 Conda Installation',
        pip: '📦 Pip Installation',
        source: '🔧 Source Installation',
        prerequisites: 'Prerequisites:',
        requirements: 'System Requirements:',
        noGuide: 'Installation guide data is being improved. Please visit the GitHub repository for the latest installation instructions.',
        visitGithub: 'View GitHub README',
      },
    },

    // SubmitProject Component
    submitProject: {
      modal: {
        title: 'Submit GitHub Project',
      },
      form: {
        urlLabel: 'GitHub URL',
        urlPlaceholder: 'https://github.com/username or https://github.com/username/repository',
      },
      errors: {
        invalidUrl: 'Please enter a valid GitHub URL',
        submitFailed: 'Submission failed, please try again later',
      },
      success: {
        message: 'GitHub Issues page opened. Please submit your request!',
      },
      issue: {
        title: 'Submit GitHub Project',
        body: 'I would like to submit the following GitHub project/organization:\n{{url}}\n\nPlease add it to the website.',
      },
      help: {
        title: 'Supported formats:',
        format1: 'https://github.com/username (user/organization profile)',
        format2: 'https://github.com/username/repository (specific repository)',
        note: 'After submission, an admin will review and add it to the website.',
      },
    },
  },
};

// 辅助函数：获取翻译
export function getTranslation(key, language = 'zh', params = {}) {
  const keys = key.split('.');
  let value = translations[language];

  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // 回退到中文
      value = translations['zh'];
      for (const fallbackKey of keys) {
        if (value && value[fallbackKey] !== undefined) {
          value = value[fallbackKey];
        } else {
          return key;
        }
      }
      return value;
    }
  }

  // 替换参数
  if (typeof value === 'string') {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }

  return value;
}
