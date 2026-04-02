# AI Agent 使用指南

本文档面向 AI Agent 开发者，说明如何读取和使用本网站的数据。

---

## 数据接口

### 1. 项目列表 JSON

```
GET https://awesome-harness.vercel.app/src/data/projects.json
```

返回完整的项目列表数组。

### 2. 单个项目数据

通过项目 `id` 在数组中查找：

```javascript
const project = projects.find(p => p.id === 'deepseek-v3');
```

---

## 数据字段说明

AI Agent 最关注的字段：

| 字段 | 用途 |
|------|------|
| `id` | 项目唯一标识 |
| `name` | 显示名称 |
| `github` | 仓库地址 |
| `chineseDescription` | 向用户展示的中文介绍 |
| `category` | 技术分类 |
| `language` | 编程语言 |
| `useCases` | 推荐的应用场景 |
| `stars` | 受欢迎程度参考 |

---

## 推荐交互流程

### 场景 1：用户询问某个项目

```
用户："我想了解 DeepSeek-V3"

AI Agent：
1. 搜索 projects.json，找到 id="deepseek-v3"
2. 提取 chineseDescription 向用户介绍
3. 提供 github 链接
4. 列出 useCases 作为使用建议
```

### 场景 2：用户需要安装指导

```
用户："怎么安装 RAGFlow？"

AI Agent：
1. 找到 id="ragflow" 的项目
2. 访问 project.github 获取 README
3. 提取安装指令
4. 结合项目语言 (Python) 给出具体命令
```

### 场景 3：按场景推荐

```
用户："有哪些适合做企业知识库的项目？"

AI Agent：
1. 遍历 projects，筛选 useCases 包含 "企业知识库" 的项目
2. 按 stars 排序
3. 推荐前 3-5 个，附上 chineseDescription
```

---

## 提示词模板

### 安装提示词生成

```javascript
function generateInstallPrompt(project) {
  return `我需要安装 ${project.name}。

项目信息：
- 名称: ${project.name}
- 公司: ${project.company}
- 语言: ${project.language}
- GitHub: ${project.github}
- 描述: ${project.chineseDescription}

请帮我：
1. 访问 GitHub 仓库，读取 README 的安装部分
2. 提供完整的安装步骤
3. 如果有 Docker 部署方式，也请说明
4. 列出常见安装问题和解决方案`;
}
```

---

## 数据结构示例

```json
{
  "id": "ragflow",
  "name": "RAGFlow",
  "company": "InfiniFlow",
  "description": "Open-source RAG engine",
  "github": "https://github.com/infiniflow/ragflow",
  "stars": 76539,
  "language": "Python",
  "category": "ai-app",
  "chineseDescription": "RAGFlow 是 InfiniFlow 开源的检索增强生成（RAG）引擎...",
  "useCases": ["企业知识库", "智能问答", "文档分析"],
  "tags": ["RAG", "Agent", "知识库"]
}
```

---

## 分类速查

| 分类 | 说明 | 典型项目 |
|------|------|----------|
| ai-model | 大语言模型 | DeepSeek, Qwen, ChatGLM |
| ai-infra | 推理/训练基础设施 | vLLM, LightLLM |
| ai-framework | 深度学习框架 | PaddlePaddle |
| ai-nlp | 自然语言处理 | PaddleNLP |
| ai-cv | 计算机视觉 | Tencent ML-Images |
| ai-multimodal | 多模态 | CogView |
| ai-app | AI 应用 | RAGFlow, OpenViking |
| tools | 开发工具 | Lark CLI |

---

## 注意事项

1. **数据更新**: 数据每周更新一次，Star 数可能略有延迟
2. **链接验证**: 访问 GitHub 链接前请检查网络可用性
3. **许可证**: 所有项目均为开源，但使用请遵守各自许可证
4. **中文优先**: 向用户展示时优先使用 chineseDescription
