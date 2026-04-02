# Harness AI Agent 标签系统 v4
## 从用户需求出发的双维度设计

---

## 核心原则

1. **技术类别** = 它是什么（8选1）
2. **应用场景** = 解决什么需求（用户角度的业务问题）

**关键区分**：
- ❌ "多Agent协作" → 是执行过程，不是需求
- ✅ "软件开发" → 是用户需求
- ❌ "工作流编排" → 是技术实现
- ✅ "流程自动化" → 是用户想要的结果

---

## 维度一：技术类别（单选）

| 技术类别 | 说明 |
|----------|------|
| `agent-framework` | Agent核心框架（提供推理、工具调用、记忆等基础能力） |
| `multi-agent` | 多智能体系统（多Agent协作、通信、任务分配） |
| `workflow-engine` | 工作流引擎（任务编排、状态机、流程控制） |
| `rag-system` | RAG系统（检索增强、知识库、文档问答） |
| `memory-system` | 记忆系统（上下文管理、长期记忆、向量存储） |
| `tool-integration` | 工具集成（第三方API连接、MCP、插件生态） |
| `evaluation` | 评估测试（Agent能力评测、基准测试、Harness） |
| `dev-tool` | 开发工具（编程辅助、IDE、CLI、SDK） |

---

## 维度二：应用场景（多选，用户需求导向）

**设计标准**：用户带着明确问题来找解决方案

| 应用场景 | 用户需求描述 | 典型项目 |
|----------|--------------|----------|
| `software-development` | 我需要做软件开发 | Superpowers, Claude Code |
| `document-processing` | 我需要处理文档（生成/分析/转换） | LlamaIndex, LangChain |
| `video-production` | 我需要制作/编辑视频 | (视频类Agent) |
| `digital-human` | 我需要数字人/虚拟形象 | (数字人项目) |
| `customer-service` | 我需要做客服/用户支持 | 客服机器人项目 |
| `data-analysis` | 我需要分析数据 | 数据分析Agent |
| `content-creation` | 我需要创作内容（文案/设计/营销） | 内容生成工具 |
| `knowledge-management` | 我需要管理企业知识 | RAG知识库项目 |
| `research` | 我需要做研究/调研 | DeepAgents, 学术工具 |
| `education` | 我需要教学/培训 | learn-claude-code |
| `process-automation` | 我需要自动化流程/减少重复工作 | n8n, 自动化工具 |
| `security-compliance` | 我需要安全审计/合规检查 | 代码审计工具 |
| `system-integration` | 我需要打通多个系统/数据同步 | 集成类工具 |
| `meeting-assistant` | 我需要会议助手（记录/摘要/跟进） | 会议AI工具 |
| `email-assistant` | 我需要邮件处理助手 | 邮件Agent |

---

## 标签映射（中英对照）

### 保留英文（技术术语已普及）

| 英文 | 中文显示 |
|------|----------|
| RAG | RAG |
| API | API |
| SDK | SDK |
| CLI | CLI |
| TDD | TDD |
| AI | AI |
| LLM | LLM |

### 中文翻译

| 英文标签 | 中文显示 |
|----------|----------|
| software-development | 软件开发 |
| document-processing | 文档处理 |
| video-production | 视频制作 |
| digital-human | 数字人 |
| customer-service | 客户服务 |
| data-analysis | 数据分析 |
| content-creation | 内容创作 |
| knowledge-management | 知识管理 |
| research | 研究探索 |
| education | 教育培训 |
| process-automation | 流程自动化 |
| security-compliance | 安全合规 |
| system-integration | 系统集成 |
| meeting-assistant | 会议助手 |
| email-assistant | 邮件助手 |

---

## 数据结构规范

项目数据只存储英文标识符，不包含中文翻译：

```json
{
  "id": "superpowers",
  "name": "Superpowers",
  "category": "workflow-engine",
  "useCases": ["software-development"]
}
```

**重要**：数据文件中不包含 `categoryZh` 或 `useCasesZh` 字段。

---

## 前端 i18n 实现

### 1. 标签映射文件 (`src/i18n/tags.js`)

```javascript
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
  // ... 更多场景
};

// 翻译辅助函数
export function getCategoryLabel(category, language = 'zh') {
  return categoryLabels[category]?.[language] || category;
}

export function getUseCaseLabel(useCase, language = 'zh') {
  return useCaseLabels[useCase]?.[language] || useCase;
}
```

### 2. 在组件中使用

```jsx
import { getCategoryLabel, getUseCaseLabel } from '../i18n/tags';
import { useLanguage } from '../contexts/LanguageContext';

function ProjectCard({ project }) {
  const { language } = useLanguage();

  return (
    <div>
      {/* 技术类别 - 动态翻译 */}
      <span>{getCategoryLabel(project.category, language)}</span>

      {/* 应用场景 - 动态翻译 */}
      {project.useCases.map(useCase => (
        <span key={useCase}>
          {getUseCaseLabel(useCase, language)}
        </span>
      ))}
    </div>
  );
}
```

### 3. 关键原则

| 层级 | 职责 | 示例 |
|------|------|------|
| **数据层** | 只存英文标识符 | `"category": "workflow-engine"` |
| **映射层** | 维护翻译字典 | `tags.js` 中的 `categoryLabels` |
| **UI层** | 根据语言动态渲染 | `getCategoryLabel(cat, language)` |

---

## 示例映射

### Superpowers
```json
{
  "category": "workflow-engine",
  "useCases": ["software-development"]
}
```
**判断依据**：
- 技术类别：workflow-engine（提供结构化的软件开发工作流）
- 应用场景：software-development（用户用它来做软件开发）

### learn-claude-code
```json
{
  "category": "dev-tool",
  "useCases": ["education"]
}
```
**判断依据**：
- 技术类别：dev-tool（是教程/学习工具）
- 应用场景：education（用户用它来学习Claude Code）

### langchain
```json
{
  "category": "agent-framework",
  "useCases": ["software-development", "knowledge-management", "process-automation"]
}
```
**判断依据**：
- 技术类别：agent-framework（提供构建Agent的基础框架）
- 应用场景：多选，因为它可以支撑多种需求

### AutoGPT
```json
{
  "category": "workflow-engine",
  "useCases": ["process-automation"]
}
```
**判断依据**：
- 技术类别：workflow-engine（编排复杂工作流）
- 应用场景：process-automation（用户用它来自动化任务流程）

---

## 数据结构设计（v4 最终版）

### 正确格式

```json
{
  "id": "superpowers",
  "name": "Superpowers",
  "category": "workflow-engine",
  "useCases": ["software-development"]
}
```

**关键规则**：
- ✅ 只使用英文标识符
- ✅ 不存储 `categoryZh` 或 `useCasesZh`
- ✅ 中文显示通过 `src/i18n/tags.js` 动态映射

### 错误示例（不要这样做）

```json
{
  "category": "workflow-engine",
  "categoryZh": "工作流引擎",
  "useCases": ["software-development"],
  "useCasesZh": ["软件开发"]
}
```

原因：中英文标签混在一起会导致语言切换时数据混乱。

### 完整项目数据示例

```json
{
  "id": "superpowers",
  "name": "Superpowers",
  "category": "workflow-engine",
  "useCases": ["software-development", "code-review"],
  "github": "https://github.com/...",
  "company": "Example Corp",
  "country": "美国",
  "stars": 5000,
  "description": "AI-powered code review tool",
  "descriptionZh": "AI驱动的代码审查工具"
}
```

**注意**：只有 `description` 和 `descriptionZh` 是允许的例外，因为它们是不可翻译的内容字段。
