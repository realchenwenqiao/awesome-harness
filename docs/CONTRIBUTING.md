# 贡献指南 (CONTRIBUTING)

感谢你对本项目的关注！我们欢迎各种形式的贡献。

---

## 如何提交项目

### 提交标准

一个项目要被收录，必须满足以下条件：

1. **企业背景**: 必须来自中国互联网大厂（阿里、腾讯、百度、字节跳动、华为、京东、美团、滴滴、小红书、B站等）或其关联公司
2. **开源许可**: 必须有明确的开源许可证（MIT/Apache/GPL 等）
3. **活跃度**: 最近 6 个月内有更新，或 Stars > 1000
4. **AI 相关**: 项目与人工智能、机器学习、深度学习相关
5. **GitHub 存在**: 必须有公开的 GitHub 仓库

### 提交方式

#### 方式一：提交 Issue（推荐）
1. 访问 [Issues 页面](../../issues)
2. 点击 "New Issue"
3. 选择 "项目提交" 模板
4. 填写以下信息：
   ```
   - 项目名称:
   - 所属公司:
   - GitHub 链接:
   - 分类:
   - 应用场景:
   - 一句话介绍:
   ```

#### 方式二：直接提交 PR
1. Fork 本仓库
2. 编辑 `src/data/projects.json`
3. 在数组末尾添加新项目（保持格式一致）
4. 提交 Pull Request

### 数据格式示例

```json
{
  "id": "project-name",
  "name": "项目名称",
  "company": "公司名",
  "companyLogo": "https://avatars.githubusercontent.com/u/xxx?v=4",
  "description": "英文简短描述",
  "github": "https://github.com/company/project",
  "stars": 12345,
  "language": "Python",
  "tags": ["标签1", "标签2"],
  "category": "ai-model",
  "chineseDescription": "中文详细介绍...",
  "createdAt": "2024-01-01",
  "updatedAt": "2026-03-30",
  "useCases": ["应用场景1", "应用场景2"]
}
```

---

## 项目验证流程

每个提交的项目都会经过以下验证：

1. **真实性验证**: 确认 GitHub 仓库存在且可访问
2. **归属验证**: 确认所属公司正确
3. **数据验证**: Star 数、语言等信息准确
4. **内容审核**: 中文描述清晰、标签恰当

---

## 代码贡献

### 开发环境

```bash
# 克隆仓库
git clone https://github.com/joe/awesome-cnbigcompany-hub.git
cd awesome-cnbigcompany-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 提交规范

- **分支命名**: `feature/xxx` 或 `fix/xxx`
- **Commit 信息**: 使用中文，简明扼要
  - `添加 xxx 项目`
  - `修复 xxx 筛选问题`
  - `优化 xxx 页面样式`

### 代码风格

- 使用单引号
- 缩进 2 空格
- 组件使用大驼峰命名
- CSS 变量统一使用 kebab-case

---

## 报告问题

发现数据错误、链接失效或其他问题？

1. 先搜索是否已有相关 Issue
2. 如果没有，新建 Issue 并选择 "Bug 报告" 模板
3. 清晰描述问题和复现步骤

---

## 联系方式

- 项目负责人: @joe
- 邮件: business.joe.chen@gmail.com

---

## 行为准则

- 保持友善和尊重
- 接受建设性批评
- 关注社区最佳利益
