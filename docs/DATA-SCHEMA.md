# 数据规范 (DATA-SCHEMA)

本文档定义 `projects.json` 的完整数据结构和约束规则。

---

## 项目结构 (Project)

```typescript
interface Project {
  // 基础信息
  id: string;                    // 唯一标识，必需
  name: string;                  // 项目名称，必需
  company: string;               // 所属公司，必需
  companyLogo: string;           // GitHub 头像 URL，可选

  // 描述信息
  description: string;           // 英文描述，必需
  chineseDescription: string;    // 中文描述，必需

  // GitHub 数据
  github: string;                // GitHub 链接，必需
  stars: number;                 // Star 数量，必需
  language: string;              // 主要编程语言，必需

  // 分类与标签
  category: Category;            // 分类，必需
  tags: string[];                // 技术标签，必需
  useCases: string[];            // 应用场景，可选

  // 时间线
  createdAt: string;             // 创建日期 (YYYY-MM-DD)，可选
  updatedAt: string;             // 最后更新日期 (YYYY-MM-DD)，可选
}
```

---

## 字段详细说明

### id
- **类型**: `string`
- **格式**: 小写字母、数字、连字符
- **示例**: `"deepseek-v3"`, `"paddlepaddle"`
- **规则**: 必须唯一，作为 URL 路径使用

### name
- **类型**: `string`
- **示例**: `"DeepSeek-V3"`, `"PaddlePaddle"`
- **规则**: 使用官方项目名称

### company
- **类型**: `string`
- **示例**: `"DeepSeek"`, `"百度"`, `"阿里巴巴"`
- **规则**: 使用中文公司名，如阿里巴巴而非 Alibaba

### companyLogo
- **类型**: `string` (URL)
- **格式**: GitHub 头像 URL
- **示例**: `"https://avatars.githubusercontent.com/u/148330874?v=4"`
- **获取方式**: 访问公司 GitHub 组织页，复制头像链接

### description
- **类型**: `string`
- **长度**: 50-150 字符
- **示例**: `"DeepSeek large language model"`
- **规则**: 简洁的英文描述

### chineseDescription
- **类型**: `string`
- **长度**: 100-300 字符
- **示例**: `"DeepSeek-V3 是深度求索推出的先进大语言模型..."`
- **规则**: 必须包含核心价值和技术特点

### github
- **类型**: `string` (URL)
- **格式**: `https://github.com/{org}/{repo}`
- **示例**: `"https://github.com/deepseek-ai/DeepSeek-V3"`

### stars
- **类型**: `number`
- **规则**: 非负整数，定期从 GitHub API 同步

### language
- **类型**: `string`
- **取值**: 主要编程语言
- **示例**: `"Python"`, `"C++"`, `"Go"`, `"Java"`

### category
- **类型**: `Category` (枚举)
- **取值范围**:
  - `ai-model`: 大语言模型
  - `ai-infra`: 基础设施/推理引擎
  - `ai-framework`: 深度学习框架
  - `ai-nlp`: 自然语言处理
  - `ai-cv`: 计算机视觉
  - `ai-multimodal`: 多模态
  - `ai-app`: AI 应用
  - `tools`: 工具类

### tags
- **类型**: `string[]`
- **数量**: 3-8 个
- **示例**: `["大模型", "LLM", "DeepSeek"]`
- **规则**: 技术关键词，包含中英文对照

### useCases
- **类型**: `string[]`
- **数量**: 2-6 个
- **示例**: `["智能对话", "代码生成", "多语言翻译"]`
- **规则**: 描述实际应用场景，便于筛选

### createdAt / updatedAt
- **类型**: `string` (ISO 8601 日期)
- **格式**: `"YYYY-MM-DD"`
- **示例**: `"2024-12-26"`

---

## 完整示例

```json
{
  "id": "deepseek-v3",
  "name": "DeepSeek-V3",
  "company": "DeepSeek",
  "companyLogo": "https://avatars.githubusercontent.com/u/148330874?v=4",
  "description": "DeepSeek large language model",
  "github": "https://github.com/deepseek-ai/DeepSeek-V3",
  "stars": 102415,
  "language": "Python",
  "tags": ["大模型", "LLM", "DeepSeek"],
  "category": "ai-model",
  "chineseDescription": "DeepSeek-V3 是深度求索（DeepSeek）推出的先进大语言模型，具有强大的语言理解和生成能力，适用于复杂推理和多语言任务。",
  "createdAt": "2024-12-26",
  "updatedAt": "2026-03-30",
  "useCases": ["智能对话", "代码生成", "多语言翻译", "复杂推理"]
}
```

---

## 数据验证脚本

```javascript
// 验证规则
const rules = {
  required: ['id', 'name', 'company', 'description', 'chineseDescription',
             'github', 'stars', 'language', 'category', 'tags'],
  categoryEnum: ['ai-model', 'ai-infra', 'ai-framework', 'ai-nlp',
                 'ai-cv', 'ai-multimodal', 'ai-app', 'tools'],
  minStars: 100,  // 最小 Star 数
  maxTags: 8,
  minUseCases: 2
};
```

---

## AI Agent 专用字段

### agentInstallPrompt (可选)
用于生成 AI 安装提示词的模板。

```json
{
  "agentInstallPrompt": "请帮我安装 DeepSeek-V3。项目地址: https://github.com/deepseek-ai/DeepSeek-V3。请根据 README 提供完整的安装步骤。"
}
```
