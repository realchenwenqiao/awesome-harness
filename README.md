# 中国大厂开源精选 🐉

[![Website](https://img.shields.io/badge/website-online-green)](https://joe.github.io/awesome-cnbigcompany-hub/)
[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)
[![Projects](https://img.shields.io/badge/projects-16-orange)](src/data/projects.json)

> 汇聚中国互联网大厂开源 AI 项目的精选网站

**在线访问**: [https://joe.github.io/awesome-cnbigcompany-hub/](https://joe.github.io/awesome-cnbigcompany-hub/)

---

## ✨ 特性

- 🎯 **精选项目** - 收录阿里、腾讯、百度、字节、DeepSeek 等 9 家大厂 16+ 优质开源项目
- 📝 **中文文档** - 每个项目都配有详细的中文介绍和应用场景
- 🔍 **三维度筛选** - 按企业、技术类别、应用场景精准筛选
- 🔎 **智能搜索** - 支持按项目名、描述、标签搜索
- 🎨 **现代设计** - 衬线体 + 暖琥珀色主题，支持暗黑模式
- 📊 **数据看板** - 企业开源贡献排行榜，实时统计数据
- 🤖 **AI Agent 友好** - 结构化数据，便于 AI 读取和推荐
- 📱 **响应式设计** - 完美适配手机、平板、电脑

---

## 🚀 快速开始

### 在线使用
直接访问 [GitHub Pages 部署站点](https://joe.github.io/awesome-cnbigcompany-hub/)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/joe/awesome-cnbigcompany-hub.git
cd awesome-cnbigcompany-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## 📁 项目结构

```
awesome-cnbigcompany-hub/
├── docs/                      # 文档
│   ├── PRD.md                 # 产品需求文档
│   ├── CONTRIBUTING.md        # 贡献指南
│   ├── DATA-SCHEMA.md         # 数据规范
│   ├── AI-AGENT.md            # AI Agent 使用指南
│   └── CHANGELOG.md           # 更新日志
├── src/
│   ├── components/
│   │   └── Logo.jsx           # Logo 组件
│   ├── data/
│   │   ├── projects.json      # 项目数据
│   │   └── rejected-projects.json  # 已拒绝项目
│   ├── pages/
│   │   ├── Home.jsx           # 首页
│   │   └── ProjectDetail.jsx  # 项目详情页
│   ├── index.css              # 全局样式
│   └── main.jsx               # 应用入口
├── scripts/                   # 数据抓取脚本
├── index.html
├── package.json
├── vite.config.js
├── LICENSE                    # AGPL-3.0 许可证
└── README.md
```

---

## 📊 数据统计

| 指标 | 数值 |
|------|------|
| 收录项目 | 16 个 |
| 科技企业 | 9 家 |
| 总 Stars | 38.3万+ |

### 企业贡献排行

| 排名 | 企业 | Stars |
|------|------|-------|
| 1 | DeepSeek | 10.2万 |
| 2 | InfiniFlow | 7.7万 |
| 3 | UC Berkeley / 开源社区 | 7.5万 |
| 4 | 百度 | 4.4万 |
| 5 | 字节跳动 | 2.7万 |

---

## 📖 文档

| 文档 | 说明 |
|------|------|
| [PRD.md](docs/PRD.md) | 产品需求文档 - 项目定位、功能需求、技术决策 |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | 贡献指南 - 如何提交项目、代码规范 |
| [DATA-SCHEMA.md](docs/DATA-SCHEMA.md) | 数据规范 - projects.json 完整字段说明 |
| [AI-AGENT.md](docs/AI-AGENT.md) | AI Agent 使用指南 - 数据结构、API 接口、示例 |
| [CHANGELOG.md](docs/CHANGELOG.md) | 更新日志 - 版本变更记录 |

---

## 🤝 贡献指南

欢迎提交优质开源项目！请阅读 [CONTRIBUTING.md](docs/CONTRIBUTING.md) 了解详细流程。

### 快速提交

1. 确认项目符合[提交标准](docs/CONTRIBUTING.md#提交标准)
2. 在 [Issues](../../issues) 页面提交项目信息，或
3. Fork 仓库后编辑 `src/data/projects.json`，提交 Pull Request

---

## 🎯 数据规范

项目数据遵循 [DATA-SCHEMA.md](docs/DATA-SCHEMA.md) 规范：

```json
{
  "id": "deepseek-v3",
  "name": "DeepSeek-V3",
  "company": "DeepSeek",
  "chineseDescription": "...",
  "github": "https://github.com/deepseek-ai/DeepSeek-V3",
  "stars": 102415,
  "category": "ai-model",
  "useCases": ["智能对话", "代码生成"],
  "createdAt": "2024-12-26"
}
```

---

## 🤖 AI Agent 支持

本网站专为 AI Agent 优化：

- 结构化 JSON 数据: `/src/data/projects.json`
- 分类标签体系: 8 大技术类别 + 应用场景
- AI 专用文档: [AI-AGENT.md](docs/AI-AGENT.md)

示例用法：
```javascript
// 获取所有项目
const projects = await fetch('https://joe.github.io/awesome-cnbigcompany-hub/src/data/projects.json').then(r => r.json());

// 筛选企业知识库相关项目
const kbProjects = projects.filter(p => p.useCases.includes('企业知识库'));
```

---

## 📄 许可证

**AGPL-3.0** (GNU Affero General Public License v3.0)

> 本项目采用 AGPL-3.0 许可证，要求任何使用本项目的衍生作品（包括网络服务）必须保持开源。

详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

感谢所有中国互联网大厂对开源社区的贡献！

特别感谢：
- DeepSeek - 开源大模型
- 阿里巴巴 - 通义千问系列
- 百度 - PaddlePaddle 飞桨
- 腾讯 - WeKnora
- 字节跳动 - OpenViking / LightSeq
- 智谱 AI / 清华 - ChatGLM / CogView
- InfiniFlow - RAGFlow

---

Built with ❤️ using React + Vite + Tailwind CSS
