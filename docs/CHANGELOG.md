# 更新日志 (CHANGELOG)

所有重要变更都会记录在此文件。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

---

## [Unreleased]

### 计划中
- [ ] 自动同步 GitHub Stars 数据
- [ ] 项目提交表单
- [ ] 增强搜索功能

---

## [2.0.0] - 2026-03-30

### 重大改版：全球 AI Agent Harness 生态平台

**项目定位重构**
- 从"中国大厂开源精选"全面升级为"全球 AI Agent Harness 开源生态平台"
- 项目数量从 15 个扩展到 312 个
- 收录范围从中国 9 家企业扩展到全球 30+ 科技企业
- 剔除大模型分类，专注 AI Agent 可直接使用的工具

### 新增
- **全球化企业收录**
  - 美国企业：OpenAI (50项目)、LangChain (33)、Amazon (28)、Hugging Face (19)、Anthropic (16) 等
  - 中国企业：阿里巴巴 (19)、智谱AI (19)、腾讯 (15)、字节跳动 (14) 等
  - 欧洲企业：Weaviate (荷兰)、Dust (法国)
- **国家/地区筛选功能**
  - 新增按国家/地区筛选（中国、美国、荷兰、法国）
  - 项目卡片显示国家信息
  - 国家/地区分布统计
- **数据架构升级**
  - 新增 `country` 字段
  - 移除 `language` 字段显示
  - 增强 `chineseDescription` 描述
  - 添加 `companyLogo` 自动获取

### 变更
- **首页重构**
  - Hero 标题更新为"汇聚世界顶级科技企业的 AI Agent Harness 开源生态"
  - 数据洞察板块左右布局对调：左侧企业排行，右侧分类/国家分布
  - 移除下方统计卡片（安装指南覆盖率、部署支持率、年份跨度、技术类别）
  - 新增国家/地区分布统计
- **筛选器调整**
  - 新增国家/地区筛选
  - 移除"大模型"分类选项
  - 企业筛选扩展到全球企业
- **项目卡片调整**
  - 移除编程语言显示
  - 移除部署按钮（改为详情页内嵌）
  - 显示国家/地区信息
- **详情页重构**
  - AI 一键部署从弹窗改为页面内嵌
  - 时间线简化为一行并列显示
  - 添加 GitHub 仓库入口链接
  - 移除编程语言标签显示
- **底部信息**
  - 从"汇聚中国大厂开源力量"更新为"连接全球 AI Agent 开源生态"

### 数据
- 收录项目：312 个（+297）
- 收录企业：30+ 家（+21）
- 国家/地区：4 个
- 分类分布：ai-tool (200)、ai-agent (49)、ai-rag (26)、ai-workflow (20)、ai-memory (9)、automation (4)、ai-integration (4)

---

## [1.1.0] - 2026-03-30

### 新增
- **AI 一键部署功能**
  - `DeployModal` 组件：部署提示词弹窗
  - 首页项目卡片添加 🤖 部署按钮
  - 项目详情页添加"AI 一键部署"入口
  - 支持一键复制提示词
  - 支持直接在 Claude 中打开
- **安装指南数据** (`installGuide`)
  - 为全部 15 个项目添加安装指南（100% 覆盖）
  - 支持 Docker、Pip、Conda、源码多种部署方式
  - 包含系统要求和前置依赖
- **AI Agent 部署提示词** (`agentDeployPrompt`)
  - 为全部 15 个项目添加标准化部署提示词
  - 支持 Claude、Cursor 等 AI Agent 直接执行
- **首页数据看板增强**
  - 技术分类分布统计
  - 编程语言分布统计
  - Star 数 Top 5 项目展示
  - 数据覆盖统计（安装指南覆盖率、部署支持率）

### 数据
- 扩展数据字段：`installGuide`, `agentDeployPrompt`
- 移除非中国公司项目：vLLM (UC Berkeley)
- 当前收录：15 个项目，9 家科技企业

---

## [1.0.0] - 2026-03-30

### 新增
- 完整的项目展示页面
- 三维度筛选功能（企业/分类/应用场景）
- 实时搜索功能
- 项目详情页，包含时间线展示
- 企业开源贡献排行榜
- 暗黑模式切换
- 响应式设计，支持移动端
- 16 个精选开源项目数据
- 完整的文档体系（PRD/CONTRIBUTING/DATA-SCHEMA/AI-AGENT）

### 数据
- 收录 16 个项目，涵盖 9 家科技企业
- 总 Stars: 38.3万+
- 数据字段：id, name, company, description, chineseDescription, github, stars, language, category, tags, useCases, createdAt, updatedAt

### 设计
- 现代简洁的 UI 风格
- 暖琥珀色主题色 (#d97706)
- 衬线体标题 (Newsreader) + 无衬线正文 (Inter)
- 圆角卡片设计
- 自定义 SVG Logo

---

## [0.2.0] - 2026-03-28

### 新增
- React Router 路由
- 项目详情页框架
- GitHub Pages 部署配置

### 数据
- 添加 20+ 个项目
- 添加分类字段

---

## [0.1.0] - 2026-03-25

### 初始化
- 项目创建
- Vite + React + Tailwind CSS 技术栈
- 基础项目展示列表
