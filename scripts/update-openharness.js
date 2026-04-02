#!/usr/bin/env node
/**
 * 更新 OpenHarness 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'OpenHarness');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
OpenHarness is a long-term, fully autonomous AI agent execution framework built on the concept of Harness Engineering. Designed specifically for OpenClaw, it enables AI agents to work tirelessly 24/7 with just a single command.

**Problem it solves**
Most autonomous AI frameworks (AutoGPT, BabyAGI) rely on the agent's "subjective judgment" to decide what to do next, resulting in infinite loops, context window explosions, and premature task completion. OpenHarness takes a completely different approach: Absolute Reliability over Emergent Intelligence.

**Core capabilities**
- **One-Sentence Start**: Users describe task ideas, and the framework automatically initializes working directory, writes contracts, configures scheduling, and executes the first run
- **Cross-Session Memory**: Solves long-term amnesia through heartbeat.md — resumes from exact breakpoints regardless of interruptions
- **External Validation Loop**: Strict eval_criteria.md and harness_eval.py prevent AI self-certification, ensuring output quality through independent audit
- **Entropy Control & Sandbox**: Built-in harness_cleanup.py periodically cleans redundant logs to prevent context bloat and maintain pure runtime environment
- **Machine-Verifiable Contract**: Translates user requirements into clear mission.md to constrain AI behavioral boundaries
- **24/7 Cron Scheduling**: Fully unattended execution with automatic trigger mechanisms

**Harness Engineering Mapping**
The framework strictly implements six load-bearing Harness Engineering components:
- Completion contracts via mission.md + eval_criteria.md
- Knowledge systems via playbook.md + progress.md
- Agent senses/tools via tool definitions in playbook
- Long-term memory via heartbeat.md state recovery
- External validation via independent harness_eval.py
- Sandbox constraints via cleanup scripts and boundary enforcement

**Key advantages**
- **Mechanical Constraints + External Audit + 100% Traceability**
- **Breakpoint Recovery**: Precise state restoration vs. vector DB mess
- **Strict Quality Control**: External validation vs. AI self-certification
- **Execution Sandbox**: Contract-constrained vs. unbounded execution
- **Entropy Management**: Built-in garbage collection vs. context bloat`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
OpenHarness 是一个基于 Harness Engineering 概念的长期全自主 AI 智能体执行框架。专为 OpenClaw 设计，只需一条命令即可让 AI 智能体 7×24 小时不知疲倦地工作。

**解决的核心问题**
大多数自主 AI 框架（AutoGPT、BabyAGI）依赖智能体的"主观判断"来决定下一步做什么，导致无限循环、上下文窗口爆炸和过早任务完成。OpenHarness 采取完全不同的方法：绝对可靠性优先于涌现智能。

**核心功能**
- **一句话启动**：用户描述任务想法，框架自动初始化工作目录、编写契约、配置调度并执行首次运行
- **跨会话记忆**：通过 heartbeat.md 解决长期失忆问题——无论中断多少次，都能从精确断点恢复
- **外部验证循环**：严格的 eval_criteria.md 和 harness_eval.py 防止 AI 自我认证完成，通过独立审计确保输出质量
- **熵控制与沙箱**：内置 harness_cleanup.py 定期清理冗余日志，防止上下文膨胀，保持运行时环境纯净
- **机器可验证契约**：将用户需求转化为清晰的 mission.md，约束 AI 行为边界
- **7×24 小时定时调度**：完全无人值守的执行，带有自动触发机制

**Harness Engineering 映射**
框架严格实现 Harness Engineering 的六个承重组件：
- 通过 mission.md + eval_criteria.md 实现完成契约
- 通过 playbook.md + progress.md 实现知识系统
- 通过工具定义实现智能体感官/工具
- 通过 heartbeat.md 状态恢复实现长期记忆
- 通过独立的 harness_eval.py 实现外部验证
- 通过清理脚本和边界约束实现沙箱限制

**技术优势**
- **机械约束 + 外部审计 + 100% 可追溯性**
- **断点恢复**：精确状态恢复，而非向量数据库混乱
- **严格质量控制**：外部验证，而非 AI 自我认证
- **执行沙箱**：契约约束，而非无边界执行
- **熵管理**：内置垃圾回收，而非上下文膨胀`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ OpenHarness 已更新（英文+中文）');
}
