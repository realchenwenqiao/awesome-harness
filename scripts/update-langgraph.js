#!/usr/bin/env node
/**
 * 更新 langgraph 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'langgraph');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
LangGraph is a low-level orchestration framework for building, managing, and deploying long-running, stateful agents. With 27k+ stars and trusted by companies like Klarna, Replit, and Elastic, it provides the foundational infrastructure for complex agent workflows.

**Problem it solves**
Most agent frameworks provide high-level abstractions that work for simple demos but break down in production. LangGraph solves this by offering low-level infrastructure for durable execution, human oversight, and state management—enabling production-grade agents that can run for extended periods and recover from failures.

**Core capabilities**
- **Durable Execution**: Build agents that persist through failures, automatically resuming from exactly where they left off. Critical for long-running workflows.
- **Human-in-the-Loop**: Seamlessly incorporate human oversight by inspecting and modifying agent state at any point during execution.
- **Comprehensive Memory**: Create truly stateful agents with short-term working memory for ongoing reasoning and long-term persistent memory across sessions.
- **Graph-Based Workflows**: Inspired by Pregel and Apache Beam, uses directed graphs to model agent workflows with nodes (functions) and edges (transitions).
- **State Management**: Precise control over agent state with support for branching, subgraphs, and complex state transitions.
- **Streaming Support**: Real-time streaming of agent outputs and intermediate states.
- **Debugging with LangSmith**: Deep visibility into complex agent behavior with visualization tools that trace execution paths and capture state transitions.
- **Production Deployment**: Purpose-built infrastructure for deploying stateful, long-running workflows at scale.

**Key advantages**
- **Enterprise Trusted**: Used by Klarna, Replit, Elastic, and other industry leaders
- **Low-Level Control**: Unlike high-level frameworks, provides precise control over execution flow
- **Fault Tolerant**: Built-in persistence and recovery mechanisms for production reliability
- **LangChain Ecosystem**: Seamless integration with LangChain components and LangSmith observability
- **Multi-Language**: Available in Python and JavaScript/TypeScript
- **Research-Inspired**: Architecture based on Google's Pregel and Apache Beam
- **Visual Prototyping**: LangSmith Studio for visual workflow design and iteration`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
LangGraph 是一个用于构建、管理和部署长时间运行、有状态智能体的低级编排框架。拥有 27k+ Star，被 Klarna、Replit 和 Elastic 等公司信任，它为复杂智能体工作流提供基础基础设施。

**解决的核心问题**
大多数智能体框架提供适用于简单演示的高级抽象，但在生产环境中会崩溃。LangGraph 通过为持久执行、人工监督和状态管理提供低级基础设施来解决这一问题——使生产级智能体能够长时间运行并从故障中恢复。

**核心功能**
- **持久执行**：构建能够经受故障的持久智能体，自动从断点精确恢复。对长时间运行的工作流至关重要。
- **人机协同**：通过在执行过程中随时检查和修改智能体状态，无缝整合人工监督。
- **全面记忆**：创建真正具有状态的智能体，具备用于持续推理的短期工作记忆和跨会话的长期持久记忆。
- **基于图的工作流**：受 Pregel 和 Apache Beam 启发，使用有向图来建模智能体工作流，包含节点（函数）和边（转换）。
- **状态管理**：通过支持分支、子图和复杂状态转换来精确控制智能体状态。
- **流式传输**：智能体输出和中间状态的实时流式传输。
- **LangSmith 调试**：通过可视化工具深入洞察复杂智能体行为，追踪执行路径并捕获状态转换。
- **生产部署**：专为部署有状态、长时间运行工作流而构建的基础架构。

**技术优势**
- **企业信任**：被 Klarna、Replit、Elastic 和其他行业领导者使用
- **低级控制**：与高级框架不同，提供对执行流的精确控制
- **容错**：内置持久化和恢复机制，确保生产可靠性
- **LangChain 生态**：与 LangChain 组件和 LangSmith 可观测性无缝集成
- **多语言**：提供 Python 和 JavaScript/TypeScript 版本
- **研究启发**：架构基于 Google Pregel 和 Apache Beam
- **可视化原型**：LangSmith Studio 用于可视化工作流设计和迭代`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ langgraph 已更新（英文+中文）');
}
