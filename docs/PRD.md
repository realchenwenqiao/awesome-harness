# 产品需求文档 (PRD)

## 项目概述

**名称**: AI Agent Harness 开源生态 (awesome-harness)
**定位**: 面向国内用户的中国互联网大厂开源项目精选网站
**目标用户**: 开发者、AI Agent、技术研究者
**技术栈**: React + Vite + Tailwind CSS

---

## 用户画像

### 1. 开发者
- 寻找可靠的开源 AI 项目
- 需要中文介绍和安装指南
- 关注项目活跃度和企业背书

### 2. AI Agent
- 需要结构化数据接口
- 通过 API 获取项目信息
- 自动生成安装命令

---

## 功能需求

### P0 - 核心功能
- [x] 项目展示卡片（Logo、名称、描述、Star 数）
- [x] 三维度筛选（企业/技术类别/应用场景）
- [x] 搜索功能（名称、描述、标签）
- [x] 项目详情页
- [x] 暗黑模式切换
- [x] 企业贡献排行榜

### P1 - 增强体验
- [ ] 安装指南自动抓取
- [ ] 项目时间线展示
- [ ] GitHub API 数据同步
- [ ] AI Agent 数据接口
- [ ] 响应式优化

### P2 - 生态建设
- [ ] 项目提交入口
- [ ] 社区贡献流程
- [ ] 数据更新自动化

---

## 数据规范

### 项目数据结构
```typescript
interface Project {
  id: string;              // 唯一标识
  name: string;            // 项目名称
  company: string;         // 所属公司
  companyLogo: string;     // 公司 Logo URL
  description: string;     // 英文描述
  chineseDescription: string; // 中文描述（必须）
  github: string;          // GitHub 链接
  stars: number;           // Star 数量
  language: string;        // 主要语言
  tags: string[];          // 技术标签
  category: string;        // 分类（ai-model/ai-infra/...）
  useCases: string[];      // 应用场景
  createdAt: string;       // 创建时间
  updatedAt: string;       // 最后更新时间
}
```

### 分类定义
- `ai-model`: 大语言模型
- `ai-infra`: 基础设施/推理引擎
- `ai-framework`: 深度学习框架
- `ai-nlp`: 自然语言处理
- `ai-cv`: 计算机视觉
- `ai-multimodal`: 多模态
- `ai-app`: AI 应用
- `tools`: 工具类

---

## 非功能需求

### 性能
- 首屏加载 < 2s
- 项目列表虚拟滚动（当项目 > 50 个时）
- 图片懒加载

### SEO
- 每个项目独立 URL (/project/:id)
- 动态生成 meta 标签
- 结构化数据 (JSON-LD)

### AI 可读性
- 提供 /api/projects.json 端点
- 每个项目包含 AI 安装提示词
- Schema.org 标记

### 可访问性
- WCAG 2.1 AA 标准
- 键盘导航支持
- 语义化 HTML

---

## 技术决策

### 为什么选择 GitHub Pages？
- 零成本部署
- 与 GitHub 源码天然结合
- 适合静态内容展示

### 为什么用 React + Vite？
- 开发体验好
- 构建速度快
- 生态成熟

---

## 里程碑

### v1.0 (当前)
- 基础展示功能
- 筛选搜索
- 16+ 精选项目

### v1.1 (计划中)
- 自动数据同步
- 安装指南抓取
- AI Agent 接口

### v2.0 (远期)
- 用户账户系统
- 收藏功能
- 评论互动
