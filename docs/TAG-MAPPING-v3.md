# AI Agent Harness 标签系统 v3
## 中英双语标签映射规范

---

## 一、技术类别（单选）

| 英文标签 | 中文显示 | 说明 |
|----------|----------|------|
| `agent-framework` | Agent框架 | 构建Agent的核心框架 |
| `multi-agent` | 多智能体 | 多Agent协作系统 |
| `workflow-engine` | 工作流引擎 | 任务编排和流程控制 |
| `rag-system` | RAG系统 | 检索增强生成 |
| `memory-system` | 记忆系统 | 上下文和长期记忆 |
| `tool-integration` | 工具集成 | 第三方API和插件 |
| `evaluation` | 评估测试 | Agent能力评测 |
| `dev-tool` | 开发工具 | 编程辅助工具 |

---

## 二、应用场景标签（多选）

### 保留英文的词汇（无需翻译）

这些词在中文技术圈已广泛接受，直接使用：

| 保留英文 | 原因 |
|----------|------|
| `AI` | 人工智能缩写，通用 |
| `LLM` | 大语言模型标准缩写 |
| `API` | 应用程序接口标准缩写 |
| `SDK` | 软件开发工具包标准缩写 |
| `CLI` | 命令行界面标准缩写 |
| `UI` | 用户界面标准缩写 |
| `GUI` | 图形用户界面标准缩写 |
| `Git` | 版本控制系统名 |
| `GitHub` | 平台名 |
| `RAG` | 检索增强生成标准术语 |
| `Agent` | 智能体标准术语 |
| `Prompt` | 提示词标准术语 |
| `TDD` | 测试驱动开发标准缩写 |
| `CI/CD` | 持续集成/部署标准缩写 |
| `SaaS` | 软件即服务标准缩写 |
| `MCP` | Model Context Protocol |
| `JSON` | 数据格式标准名 |
| `HTTP/REST` | 协议标准名 |
| `SQL/NoSQL` | 数据库类型标准名 |

### 需要翻译的标签（英文 → 中文）

| 英文标签 | 中文显示 | 说明 |
|----------|----------|------|
| `software-development` | 软件开发 | 代码生成、审查、架构 |
| `data-analysis` | 数据分析 | 数据处理、可视化 |
| `content-creation` | 内容创作 | 写作、设计、媒体生成 |
| `knowledge-management` | 知识管理 | 知识库、文档问答 |
| `customer-service` | 客户服务 | 客服机器人、支持系统 |
| `office-automation` | 办公自动化 | 邮件、日程、行政任务 |
| `research` | 研究开发 | 学术研究、调研分析 |
| `system-integration` | 系统集成 | 跨系统连接、数据同步 |
| `security` | 安全合规 | 代码审计、安全扫描 |
| `education` | 教育培训 | 教学辅助、学习路径 |
| `code-review` | 代码审查 | Code Review |
| `testing` | 测试 | 自动化测试、性能测试 |
| `documentation` | 文档 | 文档生成、管理 |
| `deployment` | 部署 | 应用部署、发布 |
| `monitoring` | 监控 | 性能监控、日志分析 |
| `automation` | 自动化 | 通用自动化 |
| `chatbot` | 聊天机器人 | 对话系统 |
| `visualization` | 可视化 | 数据/图表可视化 |

---

## 三、技术属性标签（可选）

| 英文标签 | 中文显示 | 说明 |
|----------|----------|------|
| `open-source` | 开源 | 开源项目 |
| `enterprise` | 企业级 | 企业就绪 |
| `cloud-native` | 云原生 | 云架构 |
| `real-time` | 实时 | 低延迟 |
| `multi-model` | 多模型 | 支持多模型 |
| `local-deployment` | 本地部署 | 可私有化部署 |
| `python` | Python | 编程语言保留英文 |
| `typescript` | TypeScript | 编程语言保留英文 |
| `javascript` | JavaScript | 编程语言保留英文 |
| `golang` | Go | 编程语言保留英文 |
| `rust` | Rust | 编程语言保留英文 |
| `java` | Java | 编程语言保留英文 |

---

## 四、标签使用示例

### 示例项目标签

```json
{
  "name": "Superpowers",
  "category": "agent-framework",
  "tags": ["AI", "TDD", "software-development", "code-review", "open-source"],
  "tagsZh": ["AI", "TDD", "软件开发", "代码审查", "开源"]
}
```

```json
{
  "name": "langchain",
  "category": "agent-framework",
  "tags": ["LLM", "API", "Python", "open-source", "system-integration"],
  "tagsZh": ["LLM", "API", "Python", "开源", "系统集成"]
}
```

```json
{
  "name": "spec-kit",
  "category": "dev-tool",
  "tags": ["GitHub", "API", "documentation", "software-development"],
  "tagsZh": ["GitHub", "API", "文档", "软件开发"]
}
```

---

## 五、标签提取原则

1. **从中文简介中提取关键词**
2. **每个项目最多 5 个标签**
3. **优先使用标准标签词汇表中的词**
4. **技术类别单选，应用场景可多选**
5. **千星以下项目保持原标签不动**

---

## 六、待讨论问题

1. **"智能体" vs "Agent"** - 是否统一用 "Agent"？
2. **"大模型" vs "LLM"** - 是否统一用 "LLM"？
3. **"人工智能" vs "AI"** - 是否统一用 "AI"？

建议：技术术语保留英文，描述性词汇用中文。
