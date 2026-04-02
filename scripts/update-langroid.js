import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const langroid = projects.find(p => p.name === 'langroid');
if (langroid) {
  langroid.detailedDescription = `Langroid is an intuitive, lightweight, extensible Python framework for building LLM-powered multi-agent applications, developed by researchers from CMU and UW-Madison.

**Problem it solves**
Traditional LLM frameworks are complex and heavyweight. Langroid simplifies multi-agent development by providing a clean, principled approach inspired by the Actor Framework—without the learning curve.

**Core capabilities**
- **Agent definition and composition**: Equip agents with LLMs, vector stores, and tools/functions
- **Multi-agent collaboration**: Agents communicate by exchanging messages to solve problems together
- **Task orchestration**: Wrap agents in tasks with interactive loops, sub-tasks, and state management
- **Function calling & tools**: Built-in support for LLM tool use and structured output
- **RAG support**: DocChatAgent for document QA, SQLChatAgent for database interaction
- **Universal LLM support**: Works with OpenAI, local models (Ollama), and any OpenAI-compatible API
- **MCP integration**: Connect to MCP servers via adapter

**Key advantages**
- **Framework-agnostic**: Does not depend on LangChain or other LLM frameworks
- **Production-ready**: Used by companies like Nullify for vulnerability detection in production
- **Developer experience**: Intuitive Agent and Task abstractions; get results in minutes not weeks
- **Active development**: Claude Code plugin available; continuous updates (Pydantic V2, Crawl4AI, multimodal support)

**Use cases**
Multi-agent information extraction, document QA systems, SQL database agents, structured data extraction, automated research workflows`;

  langroid.chineseDescription = `Langroid 是由 CMU 和威斯康星大学研究人员开发的 Python 多智能体框架，用于构建基于大语言模型的应用程序。

**解决的核心问题**
现有的 LLM 框架往往复杂且笨重。Langroid 通过借鉴 Actor 模型的设计思想，提供了一种简洁、优雅的多智能体开发方式，大大降低了学习门槛。

**核心功能**
- **智能体定义与组装**：为智能体配置 LLM、向量存储、工具/函数等组件
- **多智能体协作**：智能体通过消息交换协同解决问题
- **任务编排**：将智能体包装为任务，支持交互循环、子任务和状态管理
- **函数调用与工具**：内置 LLM 工具调用和结构化输出支持
- **RAG 能力**：DocChatAgent 支持文档问答，SQLChatAgent 支持数据库交互
- **多模型兼容**：支持 OpenAI、本地模型（Ollama）及任何 OpenAI 兼容 API
- **MCP 集成**：通过适配器连接 MCP 服务器

**技术优势**
- **框架独立**：不依赖 LangChain 或其他 LLM 框架
- **生产验证**：Nullify 等公司已用于生产环境的漏洞检测
- **开发体验**：直观的智能体和任务抽象，几分钟内即可上手（而非数周）
- **持续迭代**：支持 Claude Code 插件，持续更新（Pydantic V2、Crawl4AI、多模态支持）

**适用场景**
多智能体信息提取、文档问答系统、SQL 数据库智能体、结构化数据提取、自动化研究工作流`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ Langroid 已更新成功');
}
