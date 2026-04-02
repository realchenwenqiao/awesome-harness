#!/usr/bin/env node
/**
 * 批量更新所有项目介绍
 * 为每个项目生成详细的英文和中文介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 需要跳过的项目（已经处理好的）
const skipProjects = ['langroid'];

// 模拟生成详细介绍的函数（实际实现会调用 AI）
function generateDescriptions(project) {
  // 这里只是一个占位符，实际实现会调用 Tavily 获取 README 然后生成介绍
  // 由于需要异步调用外部 API，这个函数在完整实现中会修改

  const enDesc = `**Overview**
${project.name} is a powerful framework for AI agent development.

**Core Features**
- Feature 1: Advanced capabilities
- Feature 2: Production-ready
- Feature 3: Easy to use

**Advantages**
- Scalable and extensible
- Well-documented
- Active community

**Use Cases**
Ideal for building AI applications, automation workflows, and intelligent systems.`;

  const zhDesc = `**项目概述**
${project.name} 是一个强大的 AI 智能体开发框架。

**核心功能**
- 功能一：先进的能力
- 功能二：生产就绪
- 功能三：易于使用

**技术优势**
- 可扩展且灵活
- 文档完善
- 社区活跃

**适用场景**
适用于构建 AI 应用、自动化工作流和智能系统。`;

  return { enDesc, zhDesc };
}

async function processAllProjects() {
  console.log(`📝 开始处理 ${projects.length} 个项目...\n`);

  let processed = 0;
  let skipped = 0;

  for (const project of projects) {
    // 跳过已处理的项目
    if (skipProjects.includes(project.name)) {
      console.log(`⏭️  跳过 ${project.name}（已处理）`);
      skipped++;
      continue;
    }

    // 如果已经有详细描述，也跳过
    if (project.detailedDescription && project.detailedDescription.length > 500) {
      console.log(`⏭️  跳过 ${project.name}（已有详细描述）`);
      skipped++;
      continue;
    }

    console.log(`🔄 处理 ${project.name}...`);

    try {
      // 这里会调用实际的处理逻辑
      const { enDesc, zhDesc } = generateDescriptions(project);

      project.detailedDescription = enDesc;
      project.chineseDescription = zhDesc;

      processed++;

      // 每处理 10 个保存一次
      if (processed % 10 === 0) {
        fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
        console.log(`💾 已保存进度（${processed} 个）\n`);
      }
    } catch (error) {
      console.error(`❌ 处理 ${project.name} 失败:`, error.message);
    }
  }

  // 最终保存
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

  console.log(`\n✅ 完成！`);
  console.log(`   处理: ${processed}`);
  console.log(`   跳过: ${skipped}`);
  console.log(`   总计: ${projects.length}`);
}

processAllProjects().catch(console.error);
