#!/usr/bin/env node
/**
 * 更新 ai (Vercel AI SDK) 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'ai');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
The AI SDK is a provider-agnostic TypeScript toolkit designed to help build AI-powered applications and agents using popular UI frameworks like Next.js, React, Svelte, Vue, Angular, and runtimes like Node.js. With 23k+ stars, it's maintained by Vercel and the Next.js team.

**Problem it solves**
Building AI applications requires integrating different model providers, managing streaming responses, handling UI state, and implementing tool use. This SDK provides a unified, framework-agnostic API that abstracts provider differences while offering first-class integration with modern frontend frameworks.

**Core capabilities**
- **Unified Provider Architecture**: Single API to interact with OpenAI, Anthropic, Google, and other providers via Vercel AI Gateway
- **Text Generation**: Simple generateText function for LLM completions with automatic streaming support
- **Structured Output**: Generate typed JSON data using Zod schemas with Output.object
- **Agent Framework**: ToolLoopAgent class for building agents with tool-calling capabilities
- **UI Integration**: Framework-agnostic hooks for building chatbots and generative UIs in React, Svelte, Vue
- **Streaming**: Native support for streaming text and structured responses
- **Multi-Framework**: Works with Next.js App Router, React, Svelte, Vue, Angular
- **Provider SDKs**: Direct SDK packages for OpenAI, Anthropic, Google with type-safe APIs
- **Skills Integration**: CLI tool for adding AI SDK skills to coding agents

**Key advantages**
- **Vercel Official**: Built by the team behind Next.js and Vercel deployment platform
- **Provider Agnostic**: Switch between OpenAI, Anthropic, Google without code changes
- **Type-Safe**: Full TypeScript support with typed outputs via Zod
- **Framework Native**: Deep integration with modern frontend frameworks
- **Production Ready**: Battle-tested at Vercel scale
- **AI Gateway**: Built-in access to all major providers via Vercel's AI Gateway
- **Active Development**: Regular releases, comprehensive documentation, strong community`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
AI SDK 是一个与提供商无关的 TypeScript 工具包，旨在帮助使用 Next.js、React、Svelte、Vue、Angular 等流行 UI 框架和 Node.js 运行时构建 AI 驱动的应用和智能体。拥有 23k+ Star，由 Vercel 和 Next.js 团队维护。

**解决的核心问题**
构建 AI 应用需要集成不同的模型提供商、管理流式响应、处理 UI 状态以及实现工具使用。该 SDK 提供统一、与框架无关的 API，抽象提供商差异，同时与现代前端框架提供一流集成。

**核心功能**
- **统一提供商架构**：通过 Vercel AI Gateway，使用单一 API 与 OpenAI、Anthropic、Google 和其他提供商交互
- **文本生成**：用于 LLM 补全的简单 generateText 函数，支持自动流式传输
- **结构化输出**：使用 Zod schema 通过 Output.object 生成类型化 JSON 数据
- **智能体框架**：ToolLoopAgent 类，用于构建具有工具调用能力的智能体
- **UI 集成**：与框架无关的 hooks，用于在 React、Svelte、Vue 中构建聊天机器人和生成式 UI
- **流式传输**：原生支持文本和结构化响应的流式传输
- **多框架**：适用于 Next.js App Router、React、Svelte、Vue、Angular
- **提供商 SDK**：OpenAI、Anthropic、Google 的直接 SDK 包，带有类型安全 API
- **技能集成**：用于向编程智能体添加 AI SDK 技能的 CLI 工具

**技术优势**
- **Vercel 官方**：由 Next.js 和 Vercel 部署平台背后的团队构建
- **提供商无关**：在 OpenAI、Anthropic、Google 之间切换无需更改代码
- **类型安全**：通过 Zod 提供完整 TypeScript 支持和类型化输出
- **框架原生**：与现代前端框架深度集成
- **生产就绪**：在 Vercel 规模下久经考验
- **AI Gateway**：通过 Vercel 的 AI Gateway 内置访问所有主要提供商
- **活跃开发**：定期发布，全面文档，强大社区`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ ai (Vercel AI SDK) 已更新（英文+中文）');
}
