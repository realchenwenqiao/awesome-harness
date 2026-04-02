#!/usr/bin/env node
/**
 * 更新 prompt-eng-interactive-tutorial 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'prompt-eng-interactive-tutorial');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
Anthropic's Prompt Engineering Interactive Tutorial is a comprehensive, hands-on course for mastering prompt engineering with Claude. With 34k+ stars, it provides step-by-step guidance through 9 chapters of interactive exercises designed to help you build optimal prompts from beginner to advanced levels.

**Problem it solves**
Writing effective prompts is more art than science—small changes can dramatically affect LLM outputs. Many developers struggle with understanding why their prompts fail and how to fix them. This tutorial solves this by providing structured, hands-on practice with immediate feedback, teaching the "80/20" techniques that address most common failure modes.

**Core capabilities**
- **9 Interactive Chapters**: Comprehensive curriculum from basic prompt structure to complex industry use cases
- **Hands-On Exercises**: Each lesson includes practical exercises and an "Example Playground" for experimentation
- **Progressive Difficulty**: Three skill levels—Beginner (chapters 1-3), Intermediate (chapters 4-7), Advanced (chapters 8-9)
- **Beginner Topics**: Basic prompt structure, clarity and directness, role assignment
- **Intermediate Topics**: Separating data from instructions, output formatting, precognition (chain-of-thought), few-shot examples
- **Advanced Topics**: Avoiding hallucinations, complex prompts for chatbots, legal services, financial services, and coding
- **Beyond Standard Prompting**: Appendix covers chaining prompts, tool use, and search & retrieval
- **Answer Key**: Comprehensive solutions available via Google Sheets
- **Multiple Formats**: Available as Jupyter notebooks and Google Sheets with Claude for Sheets extension

**Key advantages**
- **Official Anthropic Course**: Created by the makers of Claude, ensuring best practices
- **Interactive Learning**: Learn by doing with live experimentation environments
- **Real-World Focus**: Covers industry use cases from legal to finance to software development
- **Cost-Optimized**: Uses Claude 3 Haiku (smallest, fastest, cheapest model) for learning
- **Comprehensive**: From absolute beginner to advanced prompt engineering techniques
- **Free Access**: Complete course materials available at no cost`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
Anthropic 的提示工程交互式教程是一个全面的实践课程，用于掌握 Claude 的提示工程。拥有 34k+ Star，它通过 9 章交互式练习提供逐步指导，帮助你从初学者到高级水平构建最佳提示。

**解决的核心问题**
编写有效的提示更像是艺术而非科学——微小的变化会极大地影响 LLM 输出。许多开发者难以理解为什么他们的提示失败以及如何修复。本教程通过提供结构化、实践性的练习和即时反馈来解决这一问题，教授能解决大多数常见失败模式的"80/20"技巧。

**核心功能**
- **9 个交互式章节**：从基本提示结构到复杂行业用例的全面课程
- **实践练习**：每节课包含实践练习和"示例游乐场"用于实验
- **渐进式难度**：三个技能级别——初级（1-3 章）、中级（4-7 章）、高级（8-9 章）
- **初级主题**：基本提示结构、清晰和直接性、角色分配
- **中级主题**：数据与指令分离、输出格式化、预知（思维链）、少样本示例
- **高级主题**：避免幻觉、聊天机器人复杂提示、法律服务、金融服务和编程
- **超越标准提示**：附录涵盖链式提示、工具使用和搜索与检索
- **答案键**：通过 Google Sheets 提供全面的解决方案
- **多种格式**：以 Jupyter notebooks 和 Google Sheets（带 Claude for Sheets 扩展）形式提供

**技术优势**
- **Anthropic 官方课程**：由 Claude 的创造者创建，确保最佳实践
- **交互式学习**：通过实践学习，带有实时实验环境
- **真实世界聚焦**：涵盖从法律到金融到软件开发的行业用例
- **成本优化**：使用 Claude 3 Haiku（最小、最快、最便宜的模型）进行学习
- **全面覆盖**：从绝对初学者到高级提示工程技术
- **免费开放**：完整的课程材料免费获取`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ prompt-eng-interactive-tutorial 已更新（英文+中文）');
}
