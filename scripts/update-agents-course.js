#!/usr/bin/env node
/**
 * 更新 agents-course 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'agents-course');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
The Hugging Face Agents Course is a comprehensive, free educational program that takes you from AI agent basics to building production-ready agents. With 27k+ stars, it covers 4 units of structured learning from agent fundamentals to final projects with benchmarking.

**Problem it solves**
Learning to build AI agents is fragmented across blog posts, documentation, and scattered tutorials. This course solves that by providing a structured, end-to-end curriculum that progresses from theory to practice, with hands-on implementations using popular frameworks.

**Core Curriculum**
- **Unit 0 - Welcome**: Course overview, necessary tools, and guidelines
- **Unit 1 - Introduction to Agents**: Definition of agents, LLMs, model family tree, and special tokens
- **Unit 2 - Frameworks**: Deep dives into smolagents, LangGraph, and LlamaIndex with practical implementations
- **Unit 3 - Agentic RAG**: Using retrieval-augmented generation with agents to handle diverse use cases
- **Unit 4 - Final Project**: Create, test, and certify your agent with automated evaluation and leaderboard

**Bonus Content**
- Fine-tuning LLMs for function-calling
- Observability and evaluation techniques
- Agents in games with Pokemon demonstration

**Key advantages**
- **Completely Free**: Full course access at no cost
- **Hugging Face Official**: Created by the team behind the leading ML platform
- **Hands-On**: Practical implementations with real frameworks
- **Certificate Program**: Earn certification upon completion
- **Active Community**: Discord support, discussions, and peer learning
- **Production Focus**: Goes from basics to production-ready deployment
- **Framework Agnostic**: Covers smolagents, LangGraph, and LlamaIndex
- **Self-Paced**: Learn on your own schedule with structured units`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
Hugging Face 智能体课程是一个全面的免费教育项目，带你从 AI 智能体基础到构建生产级智能体。拥有 27k+ Star，它涵盖 4 个单元的结构化学习，从智能体基础到带有基准测试的期末项目。

**解决的核心问题**
学习构建 AI 智能体的资源分散在博客文章、文档和零散教程中。本课程通过提供结构化的端到端课程来解决这一问题，从理论到实践，使用流行框架进行实践实现。

**核心课程**
- **第 0 单元 - 欢迎**：课程概述、必要工具和指南
- **第 1 单元 - 智能体简介**：智能体定义、LLM、模型家族树和特殊 token
- **第 2 单元 - 框架**：深入探讨 smolagents、LangGraph 和 LlamaIndex，并进行实践实现
- **第 3 单元 - Agentic RAG**：使用检索增强生成与智能体处理多样化用例
- **第 4 单元 - 期末项目**：创建、测试和认证你的智能体，包含自动评估和排行榜

** bonus 内容**
- 为函数调用微调 LLM
- 可观测性和评估技术
- 使用 Pokemon 演示的智能体游戏应用

**技术优势**
- **完全免费**：完整课程访问无需费用
- **Hugging Face 官方**：由领先机器学习平台团队创建
- **实践导向**：使用真实框架进行实践实现
- **证书项目**：完成可获得认证
- **活跃社区**：Discord 支持、讨论和同伴学习
- **生产聚焦**：从基础到生产就绪部署
- **框架无关**：涵盖 smolagents、LangGraph 和 LlamaIndex
- **自定进度**：按照自己的时间表学习结构化单元`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ agents-course 已更新（英文+中文）');
}
