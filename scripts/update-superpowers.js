#!/usr/bin/env node
/**
 * 更新 Superpowers 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'Superpowers');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
Superpowers is a complete software development workflow system for coding agents, built on composable "skills" and initial instructions that ensure agents follow proven engineering practices. It transforms AI coding from ad-hoc code generation into systematic, test-driven development.

**Problem it solves**
Most coding agents jump straight into writing code without understanding the real problem, leading to poor architecture, unnecessary complexity, and code that doesn't meet actual needs. Superpowers solves this by enforcing a structured workflow from the moment you start: brainstorm first, design second, plan third, implement last.

**Core capabilities**
- **Brainstorming Skill**: Before writing code, the agent asks clarifying questions, explores alternatives, and presents design in digestible chunks for user validation
- **Design Documentation**: Saves validated design documents that serve as the single source of truth
- **Implementation Planning**: Creates detailed plans with bite-sized tasks (2-5 minutes each), emphasizing YAGNI (You Aren't Gonna Need It) and DRY principles
- **Subagent-Driven Development**: Dispatches fresh subagents per task with two-stage review (spec compliance, then code quality)
- **True Red/Green TDD**: Enforces RED-GREEN-REFACTOR cycle—write failing test, watch it fail, write minimal code, watch it pass, commit
- **Systematic Debugging**: 4-phase root cause process with condition-based waiting and verification-before-completion
- **Git Worktrees**: Creates isolated workspaces on new branches, verifies clean test baseline before starting work
- **Code Review Integration**: Mandatory pre-review checklist and severity-based issue reporting
- **Branch Completion Workflow**: Verifies tests, presents merge/PR options, cleans up worktree

**Skills Library**
Testing: TDD, systematic debugging, verification. Collaboration: Brainstorming, planning, parallel agents, code review. Meta: Writing new skills, using the skills system.

**Key advantages**
- **Automatic Trigger**: Skills activate automatically based on context—no manual invocation needed
- **Process Over Guessing**: Systematic workflows replace ad-hoc prompting
- **Complexity Reduction**: Simplicity as primary design goal
- **Evidence Over Claims**: Verify before declaring success
- **Multi-Platform**: Available for Claude Code, Cursor, Codex, OpenCode, and Gemini CLI
- **Community-Driven**: Open skill library with contribution workflow`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
Superpowers 是一个面向编程智能体的完整软件开发工作流系统，基于可组合的"技能"和初始指令构建，确保智能体遵循经过验证的工程实践。它将 AI 编程从临时代码生成转变为系统化、测试驱动开发。

**解决的核心问题**
大多数编程智能体在没有理解真正问题的情况下直接开始写代码，导致架构不良、不必要的复杂性和无法满足实际需求的代码。Superpowers 通过在启动时强制执行结构化工作流来解决这一问题：先头脑风暴、再设计、再规划、最后实现。

**核心功能**
- **头脑风暴技能**：在编写代码之前，智能体提出澄清问题、探索替代方案，并以可消化的块呈现设计供用户验证
- **设计文档**：保存经过验证的设计文档作为单一事实来源
- **实现规划**：创建详细计划，包含细粒度任务（每个 2-5 分钟），强调 YAGNI（你不会需要它）和 DRY 原则
- **子智能体驱动开发**：为每个任务分派新鲜子智能体，进行两阶段审查（规范合规性，然后是代码质量）
- **真正红/绿 TDD**：强制执行 RED-GREEN-REFACTOR 循环——编写失败测试、观察失败、编写最小代码、观察通过、提交
- **系统化调试**：四阶段根本原因流程，基于条件的等待和完成前验证
- **Git 工作树**：在新分支上创建隔离工作区，开始前验证干净的测试基线
- **代码审查集成**：强制预审查清单和基于严重性的问题报告
- **分支完成工作流**：验证测试、呈现合并/PR 选项、清理工作树

**技能库**
测试：TDD、系统化调试、验证。协作：头脑风暴、规划、并行智能体、代码审查。元技能：编写新技能、使用技能系统。

**技术优势**
- **自动触发**：技能根据上下文自动激活——无需手动调用
- **流程优于猜测**：系统化工作流取代临时提示
- **复杂度降低**：简洁性作为主要设计目标
- **证据优于声明**：在宣布成功前验证
- **多平台支持**：可用于 Claude Code、Cursor、Codex、OpenCode 和 Gemini CLI
- **社区驱动**：开放的技能库，支持贡献工作流`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ Superpowers 已重写（英文+中文）');
}
