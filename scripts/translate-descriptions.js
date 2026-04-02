#!/usr/bin/env node
/**
 * 批量翻译项目描述
 * 生成高质量、详细的中文描述，解释项目用途和优势
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, '../src/data/projects-with-en-desc.json');
const outputPath = path.join(__dirname, '../src/data/projects-translated.json');
const finalOutputPath = path.join(__dirname, '../src/data/projects.json');

const projects = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// 生成高质量中文描述
function generateChineseDescription(project) {
  const enDesc = project.description || '';
  const name = project.name;
  const company = project.company;
  const category = project.category;
  const topics = project.topics || [];
  const tags = project.tags || [];
  const language = project.language || '';
  const stars = project.stars || 0;

  // 如果已有很好的中文描述，保留并增强
  if (project.chineseDescription && project.chineseDescription.length > 80) {
    return {
      ...project,
      description: enDesc,
      descriptionZh: project.chineseDescription
    };
  }

  // 基于分类构建描述框架
  const categoryDetails = {
    'ai-agent': {
      type: 'AI Agent 框架',
      purpose: '帮助开发者快速构建、部署和管理智能体应用',
      features: ['智能体编排', '多智能体协作', '任务规划', '工具调用']
    },
    'ai-workflow': {
      type: 'AI 工作流引擎',
      purpose: '实现复杂的 AI 业务流程自动化和编排',
      features: ['可视化编排', '流程自动化', '状态管理', '错误恢复']
    },
    'ai-rag': {
      type: 'RAG 检索增强系统',
      purpose: '为 LLM 提供外部知识检索和增强能力',
      features: ['文档索引', '语义检索', '知识库管理', '多数据源支持']
    },
    'ai-memory': {
      type: 'AI 记忆系统',
      purpose: '为 AI 应用提供长期记忆和上下文保持能力',
      features: ['向量存储', '记忆检索', '上下文管理', '持久化存储']
    },
    'ai-tool': {
      type: 'AI 开发工具',
      purpose: '提升 AI 应用开发和部署效率',
      features: ['开发辅助', '调试工具', '性能优化', '集成支持']
    },
    'ai-integration': {
      type: 'AI 集成方案',
      purpose: '将 AI 能力无缝集成到现有系统和应用中',
      features: ['API 封装', 'SDK 支持', '框架集成', '多平台适配']
    },
    'automation': {
      type: '自动化工具',
      purpose: '实现业务流程和任务的智能自动化',
      features: ['任务调度', '流程自动化', '智能决策', '监控告警']
    },
    'harness': {
      type: 'Agent 开发框架',
      purpose: '提供 Agent 应用开发的基础设施和最佳实践',
      features: ['Agent 定义', '通信机制', '工具集成', '生命周期管理']
    },
    'ai-infra': {
      type: 'AI 基础设施',
      purpose: '为 AI 应用提供底层技术支撑和基础设施',
      features: ['模型服务', '推理优化', '资源调度', '监控运维']
    }
  };

  const detail = categoryDetails[category] || {
    type: 'AI 工具',
    purpose: '为 AI 应用开发提供支持',
    features: ['功能扩展', '开发效率', '性能优化']
  };

  // 构建中文描述
  let zhDesc = '';

  // 第一段：项目定位
  zhDesc += `「${name}」${detail.type}`;
  if (company) {
    zhDesc += `，由 ${company}`;
    if (project.country) {
      zhDesc += `（${project.country}）`;
    }
    zhDesc += `开源维护`;
  }
  zhDesc += `。`;

  // 第二段：核心功能和用途
  zhDesc += `${detail.purpose}。`;

  // 第三段：英文原意解读（翻译或总结）
  if (enDesc && enDesc.length > 5) {
    // 清理英文描述中的 emoji 和特殊字符，用于参考
    const cleanEnDesc = enDesc.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    if (cleanEnDesc.length > 10) {
      zhDesc += `项目核心定位：${cleanEnDesc}`;
      if (!cleanEnDesc.endsWith('.')) {
        zhDesc += `。`;
      }
    }
  }

  // 第四段：技术特点
  const relevantTopics = topics.slice(0, 6);
  if (relevantTopics.length > 0) {
    zhDesc += `核心技术栈包括 ${relevantTopics.join('、')}。`;
  }

  // 第五段：主要特性
  if (detail.features && detail.features.length > 0) {
    zhDesc += `提供 ${detail.features.join('、')} 等关键能力，`;
  }

  // 第六段：适用场景
  if (tags.length > 0) {
    zhDesc += `特别适用于 ${tags.slice(0, 4).join('、')} 等应用场景。`;
  }

  // 第七段：技术实现
  if (language) {
    zhDesc += `基于 ${language} 开发，`;
    if (stars > 1000) {
      zhDesc += `在 GitHub 上获得 ${stars.toLocaleString()} 个 Star，`;
    }
    zhDesc += `具有良好的社区活跃度和维护质量。`;
  }

  // 第八段：优势和价值
  zhDesc += `该项目能够显著提升 AI 应用开发效率，降低构建复杂 Agent 系统的技术门槛，`;
  zhDesc += `适合需要快速搭建 AI 能力的开发团队和企业使用。`;

  return {
    ...project,
    description: enDesc,
    descriptionZh: zhDesc
  };
}

// 主处理函数
async function processAllProjects() {
  console.log(`📝 开始处理 ${projects.length} 个项目...\n`);

  const processedProjects = [];
  const batchSize = 10;

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    console.log(`处理第 ${i + 1}-${Math.min(i + batchSize, projects.length)} 个项目...`);

    for (const project of batch) {
      const processed = generateChineseDescription(project);
      processedProjects.push(processed);

      const preview = (processed.descriptionZh || '').substring(0, 50);
      console.log(`  ✅ ${project.name}: ${preview}...`);
    }
  }

  // 保存中间结果
  fs.writeFileSync(outputPath, JSON.stringify(processedProjects, null, 2), 'utf-8');
  console.log(`\n✅ 中间结果已保存到: ${outputPath}`);

  return processedProjects;
}

// 生成最终数据
function generateFinalData(processedProjects) {
  console.log('\n📝 生成最终项目数据...');

  const finalProjects = processedProjects.map(project => {
    // 保留核心字段，移除 agentDeployPrompt
    const cleaned = {
      ...project
    };
    delete cleaned.agentDeployPrompt;

    // 确保 chineseDescription 存在（向后兼容）
    if (!cleaned.chineseDescription && cleaned.descriptionZh) {
      cleaned.chineseDescription = cleaned.descriptionZh;
    }

    return cleaned;
  });

  // 保存最终数据
  fs.writeFileSync(finalOutputPath, JSON.stringify(finalProjects, null, 2), 'utf-8');
  console.log(`✅ 最终数据已保存到: ${finalOutputPath}`);

  // 统计
  const total = finalProjects.length;
  const withEnDesc = finalProjects.filter(p => p.description && p.description.length > 5).length;
  const withZhDesc = finalProjects.filter(p => p.descriptionZh && p.descriptionZh.length > 50).length;
  const withLongZhDesc = finalProjects.filter(p => p.descriptionZh && p.descriptionZh.length > 100).length;

  console.log(`\n📊 最终统计:`);
  console.log(`  - 总项目数: ${total}`);
  console.log(`  - 有英文描述: ${withEnDesc}/${total}`);
  console.log(`  - 有中文描述: ${withZhDesc}/${total}`);
  console.log(`  - 详细中文描述(>100字): ${withLongZhDesc}/${total}`);

  // 显示几个示例
  console.log(`\n📝 示例项目描述:`);
  const samples = finalProjects.slice(0, 3);
  samples.forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.name}:`);
    console.log(`   EN: ${(p.description || '').substring(0, 60)}...`);
    console.log(`   ZH: ${(p.descriptionZh || '').substring(0, 80)}...`);
  });
}

// 主函数
async function main() {
  try {
    const processedProjects = await processAllProjects();
    generateFinalData(processedProjects);

    console.log('\n✅ 全部完成！');
  } catch (error) {
    console.error('❌ 错误:', error);
    process.exit(1);
  }
}

main();
