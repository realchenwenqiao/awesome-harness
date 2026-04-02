#!/usr/bin/env node
/**
 * 更新 AutoGPT 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'AutoGPT');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
AutoGPT is a powerful platform for creating, deploying, and managing continuous AI agents that automate complex workflows. With 182k+ stars, it's one of the most popular open-source AI agent platforms, offering both a visual workflow builder and a classic code-first agent framework.

**Problem it solves**
Building AI agents traditionally requires deep technical expertise in LLM orchestration, tool integration, and deployment infrastructure. AutoGPT solves this by providing both a low-code visual interface for non-technical users and a comprehensive toolkit for developers, enabling anyone to build and deploy autonomous agents.

**Core Platform (AutoGPT Platform)**
- **Agent Builder**: Intuitive, low-code visual interface for designing and configuring AI agents by connecting blocks where each block performs a single action
- **Workflow Management**: Build, modify, and optimize automation workflows by chaining actions into complete pipelines
- **Pre-configured Agents**: Library of ready-to-use agents for immediate deployment without building from scratch
- **Deployment Controls**: Manage agent lifecycle from testing to production with monitoring and analytics
- **AutoGPT Server**: Backend infrastructure that runs deployed agents continuously, triggered by external sources
- **Marketplace**: Comprehensive marketplace for discovering and deploying pre-built agents

**Classic Framework**
- **Forge**: Ready-to-go toolkit for building custom agent applications, handling boilerplate code so developers can focus on unique features
- **Benchmark**: Tools for evaluating and comparing agent performance
- **GUI**: Standalone interface for running classic AutoGPT agents

**Key advantages**
- **Flexible Hosting**: Self-host for free with Docker or join cloud-hosted beta
- **One-Line Setup**: Automatic install script for macOS/Linux/Windows
- **Dual Approach**: Visual builder for beginners, code framework for advanced users
- **Continuous Operation**: Agents run 24/7, triggered by external events
- **Large Community**: 182k+ stars, active Discord, extensive documentation
- **Multi-Language Support**: Documentation available in 8+ languages`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
AutoGPT 是一个用于创建、部署和管理持续运行 AI 智能体的强大平台，可自动化复杂工作流。拥有 182k+ Star，是最受欢迎的开源 AI 智能体平台之一，同时提供可视化工作流构建器和经典代码优先智能体框架。

**解决的核心问题**
构建 AI 智能体传统上需要深厚的 LLM 编排、工具集成和部署基础设施技术专长。AutoGPT 通过为非技术用户提供低代码可视化界面，为开发者提供全面工具包来解决这一问题，使任何人都能构建和部署自主智能体。

**核心平台（AutoGPT Platform）**
- **智能体构建器**：直观的低代码可视化界面，通过连接块来设计和配置 AI 智能体，每个块执行单一操作
- **工作流管理**：将操作链式组合成完整管道，构建、修改和优化自动化工作流
- **预配置智能体**：可直接部署的即用型智能体库，无需从零构建
- **部署控制**：通过监控和分析管理智能体从测试到生产的生命周期
- **AutoGPT 服务器**：运行已部署智能体的后端基础设施，可由外部源触发
- **市场**：用于发现和部署预构建智能体的综合市场

**经典框架**
- **Forge**：构建自定义智能体应用的现成工具包，处理样板代码，让开发者专注于独特功能
- **Benchmark**：评估和比较智能体性能的工具
- **GUI**：用于运行经典 AutoGPT 智能体的独立界面

**技术优势**
- **灵活托管**：免费使用 Docker 自托管，或加入云托管测试版
- **一行命令设置**：macOS/Linux/Windows 自动安装脚本
- **双重方法**：面向初学者的可视化构建器，面向高级用户的代码框架
- **持续运行**：智能体 7×24 小时运行，由外部事件触发
- **庞大社区**：182k+ Star，活跃的 Discord，广泛的文档
- **多语言支持**：文档提供 8+ 种语言版本`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ AutoGPT 已更新（英文+中文）');
}
