# awesome-cnbigcompany-hub 🐉

汇聚中国互联网大厂开源项目的精选网站！

## ✨ 特性

- 🎯 **精选项目** - 收录阿里、腾讯、百度、字节、京东、美团等大厂优质开源项目
- 📝 **中文文档** - 每个项目都配有详细的中文介绍、安装方法和使用示例
- 🔍 **智能搜索** - 支持按项目名、公司、技术栈、标签搜索
- 🎨 **暗黑模式** - 支持明暗主题切换
- 🎲 **随机发现** - 一键随机探索有趣的开源项目
- 📊 **数据统计** - 实时展示项目总数、大厂数量、总星标等
- 📱 **响应式设计** - 完美适配手机、平板、电脑

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 部署到 GitHub Pages

```bash
# 构建
npm run build

# 推送代码到 GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

然后在 GitHub 仓库设置中开启 GitHub Pages，源选择 `gh-pages` 分支或 `main` 分支的 `/docs` 文件夹。

## 📁 项目结构

```
awesome-cnbigcompany-hub/
├── src/
│   ├── data/
│   │   └── projects.json       # 项目数据
│   ├── App.jsx                  # 主应用组件
│   ├── main.jsx                 # 应用入口
│   └── index.css                # 全局样式
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 贡献指南

欢迎添加更多优质开源项目！

### 添加新项目

编辑 `src/data/projects.json`，按照以下格式添加：

```json
{
  "id": "项目唯一ID",
  "name": "项目名称",
  "company": "所属公司",
  "companyLogo": "公司Logo URL（可选）",
  "description": "项目描述",
  "github": "GitHub 仓库地址",
  "stars": 星标数量,
  "language": "主要编程语言",
  "tags": ["标签1", "标签2"],
  "install": {
    "npm": "npm 安装命令",
    "yarn": "yarn 安装命令",
    "pnpm": "pnpm 安装命令"
  },
  "usage": "使用示例代码",
  "chineseDescription": "详细的中文介绍"
}
```

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有中国互联网大厂对开源社区的贡献！

---

Built with ❤️ using React + Vite + Tailwind CSS
