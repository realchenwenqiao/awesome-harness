#!/usr/bin/env node
/**
 * 更新 UI-TARS-desktop 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'UI-TARS-desktop');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
UI-TARS Desktop is a native GUI agent for your local computer, powered by ByteDance's UI-TARS and Seed-1.5-VL/1.6 series vision-language models. With 29k+ stars, it enables natural language control of your desktop through visual recognition and precise automation.

**Problem it solves**
Traditional automation tools require scripting, API integrations, or specific application support. UI-TARS Desktop solves this by providing a natural language interface that can see and interact with any GUI element on your screen, enabling automation of complex workflows without writing code.

**Core capabilities**
- **Natural Language Control**: Powered by Vision-Language Model (VLM), understand and execute complex instructions in plain English
- **Visual Recognition**: Screenshot-based GUI understanding that works with any application
- **Precise Control**: Accurate mouse and keyboard automation for clicking, typing, scrolling
- **Local & Remote Operation**: Both local computer control and remote browser automation
- **Cross-Platform**: Native support for Windows, macOS, and browser environments
- **Real-time Feedback**: Live status display and execution progress
- **Privacy-First**: Fully local processing, no data sent to external servers
- **Model Flexibility**: Works with UI-TARS-1.5-7B and Seed-1.5-VL/1.6 models

**Integration**
Part of the larger TARS ecosystem including Agent TARS (CLI and Web UI for terminal/browser automation) and Midscene (browser-based agent). UI-TARS Desktop specifically focuses on native desktop GUI automation.

**Key advantages**
- **Native GUI Automation**: Works with any application without APIs or plugins
- **Vision-Based**: Uses computer vision to understand UI elements, not fragile selectors
- **Research-Backed**: Based on published paper "UI-TARS: Pioneering Automated GUI Interaction with Native Agents"
- **ByteDance Official**: Developed by ByteDance's Seed team, production-quality implementation
- **Model Hub**: Available on Hugging Face and ModelScope
- **Dual Mode**: Both local desktop and remote browser operation support
- **Active Community**: Discord server, active development, regular releases`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
UI-TARS Desktop 是一个用于本地计算机的原生 GUI 智能体，由字节跳动的 UI-TARS 和 Seed-1.5-VL/1.6 系列视觉语言模型驱动。拥有 29k+ Star，它通过视觉识别和精准自动化实现桌面的自然语言控制。

**解决的核心问题**
传统自动化工具需要脚本、API 集成或特定应用支持。UI-TARS Desktop 通过提供自然语言界面来解决这一问题，该界面可以看到屏幕上的任何 GUI 元素并与之交互，无需编写代码即可实现复杂工作流的自动化。

**核心功能**
- **自然语言控制**：由视觉语言模型（VLM）驱动，理解和执行复杂的纯英文指令
- **视觉识别**：基于截图的 GUI 理解，适用于任何应用程序
- **精准控制**：精确的鼠标和键盘自动化，实现点击、输入、滚动
- **本地与远程操作**：支持本地计算机控制和远程浏览器自动化
- **跨平台**：原生支持 Windows、macOS 和浏览器环境
- **实时反馈**：实时状态显示和执行进度
- **隐私优先**：完全本地处理，数据不会发送到外部服务器
- **模型灵活性**：兼容 UI-TARS-1.5-7B 和 Seed-1.5-VL/1.6 模型

**生态集成**
TARS 生态系统的一部分，包括 Agent TARS（用于终端/浏览器自动化的 CLI 和 Web UI）和 Midscene（基于浏览器的智能体）。UI-TARS Desktop 专门专注于原生桌面 GUI 自动化。

**技术优势**
- **原生 GUI 自动化**：无需 API 或插件即可与任何应用程序配合使用
- **基于视觉**：使用计算机视觉理解 UI 元素，而非脆弱的 selector
- **研究支撑**：基于已发表论文"UI-TARS：使用原生智能体开创自动化 GUI 交互"
- **字节跳动官方**：由字节跳动 Seed 团队开发，生产级实现
- **模型仓库**：可在 Hugging Face 和 ModelScope 上获取
- **双模式**：支持本地桌面和远程浏览器操作
- **活跃社区**：Discord 服务器，活跃开发，定期发布`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ UI-TARS-desktop 已更新（英文+中文）');
}
