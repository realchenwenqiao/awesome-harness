#!/usr/bin/env node
/**
 * 更新 langchain 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'langchain');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
LangChain is the leading agent engineering platform and framework for building LLM-powered applications. With 131k+ stars, it provides interoperable components and third-party integrations that simplify AI application development while future-proofing decisions as underlying technology evolves.

**Problem it solves**
Building production-ready LLM applications requires integrating diverse components—models, embeddings, vector stores, tools—and managing their orchestration. LangChain solves this complexity by providing a standard interface for all these components, enabling developers to swap implementations without rewriting application logic.

**Core capabilities**
- **Component Abstractions**: Standardized interfaces for chat models, embedding models, vector stores, retrievers, document loaders, and tools
- **Real-time Data Augmentation**: Easily connect LLMs to diverse data sources and external/internal systems through LangChain's vast integration library
- **Model Interoperability**: Swap models in and out as you experiment to find the best choice—adapt quickly as the industry frontier evolves
- **Rapid Prototyping**: Modular, component-based architecture enables quick building and iteration without rebuilding from scratch
- **Production-Ready Features**: Built-in support for monitoring, evaluation, and debugging through LangSmith integration
- **Flexible Abstraction Layers**: Work at the level that suits your needs—from high-level chains for quick starts to low-level components for fine-grained control

**Ecosystem**
- **LangGraph**: Low-level agent orchestration framework for building controllable agent workflows
- **LangSmith**: Agent evals, observability, and debugging platform for LLM apps
- **Deep Agents**: Build agents that plan, use subagents, and leverage file systems for complex tasks
- **LangSmith Deployment**: Purpose-built platform for deploying and scaling long-running, stateful agent workflows
- **Integrations**: 100+ providers including OpenAI, Anthropic, HuggingFace, Pinecone, Weaviate, and more

**Key advantages**
- **Industry Standard**: Most widely adopted LLM framework with 131k+ stars
- **Battle-Tested**: Production-ready patterns and best practices
- **Vibrant Community**: Rich ecosystem of integrations, templates, and community-contributed components
- **Multi-Language**: Python and JavaScript/TypeScript libraries
- **Future-Proof**: Abstractions keep you moving without losing momentum as technology evolves
- **Comprehensive Documentation**: Extensive docs, API reference, and LangChain Academy free courses`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
LangChain 是领先的智能体工程平台和 LLM 应用开发框架。拥有 131k+ Star，它提供可互操作的组件和第三方集成，简化 AI 应用开发，同时确保底层技术演进时的决策前瞻性。

**解决的核心问题**
构建生产级 LLM 应用需要集成 diverse 组件——模型、嵌入、向量存储、工具——并管理它们的编排。LangChain 通过为所有这些组件提供标准接口来解决这种复杂性，使开发者能够在不重写应用逻辑的情况下更换实现。

**核心功能**
- **组件抽象**：聊天模型、嵌入模型、向量存储、检索器、文档加载器和工具的标准化接口
- **实时数据增强**：通过 LangChain 庞大的集成库，轻松将 LLM 连接到 diverse 数据源和外部/内部系统
- **模型互操作性**：在实验过程中更换模型以找到最佳选择——随着行业前沿演进快速适应
- **快速原型**：模块化、基于组件的架构支持快速构建和迭代，无需从头重建
- **生产就绪功能**：通过 LangSmith 集成内置监控、评估和调试支持
- **灵活抽象层**：在适合你需求的级别工作——从用于快速启动的高级链到用于细粒度控制的低级组件

**生态系统**
- **LangGraph**：用于构建可控智能体工作流的低级智能体编排框架
- **LangSmith**：用于 LLM 应用的智能体评估、可观测性和调试平台
- **Deep Agents**：构建能够规划、使用子智能体并利用文件系统处理复杂任务的智能体
- **LangSmith Deployment**：专为部署和扩展长时间运行、有状态智能体工作流而构建的平台
- **集成**：100+ 提供商，包括 OpenAI、Anthropic、HuggingFace、Pinecone、Weaviate 等

**技术优势**
- **行业标准**：拥有 131k+ Star 的最广泛采用的 LLM 框架
- **久经考验**：生产就绪的模式和最佳实践
- **活跃社区**：丰富的集成、模板和社区贡献组件生态系统
- **多语言**：Python 和 JavaScript/TypeScript 库
- **面向未来**：抽象层让你在不断发展的技术中保持前进而不失去动力
- **综合文档**：广泛的文档、API 参考和 LangChain Academy 免费课程`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ langchain 已更新（英文+中文）');
}
