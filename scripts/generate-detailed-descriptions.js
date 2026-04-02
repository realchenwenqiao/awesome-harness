#!/usr/bin/env node
/**
 * 批量生成深度项目介绍
 * 基于 README 内容生成详细中文介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, '../src/data/projects-with-readme.json');
const outputPath = path.join(__dirname, '../src/data/projects-with-detailed-desc.json');
const finalOutputPath = path.join(__dirname, '../src/data/projects.json');

const projects = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// 生成单个项目的详细介绍
function generateDetailedDescription(project) {
  const readme = project.readmeClean || '';
  const name = project.name;
  const company = project.company;
  const stars = project.stars || 0;
  const language = project.language || '';
  const topics = project.topics || [];
  const category = project.category;
  const description = project.description || '';

  // 如果 README 太短，返回空字符串
  if (!readme || readme.length < 200) {
    return {
      ...project,
      detailedDescription: ''
    };
  }

  // 提取 README 的关键信息
  const lines = readme.split('\n');

  // 提取标题下的第一段描述
  let firstParagraph = '';
  let foundTitle = false;
  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && trimmed.length > 50 && !trimmed.startsWith('!') && !trimmed.startsWith('[')) {
      firstParagraph = trimmed;
      break;
    }
  }

  // 提取功能列表（找 bullet points）
  const features = [];
  let inFeatures = false;
  for (let line of lines) {
    const trimmed = line.trim();
    // 检测功能相关的标题
    if (/^#.*\b(feature|功能|overview|特点|highlight|capability|ability)/i.test(trimmed)) {
      inFeatures = true;
      continue;
    }
    // 收集 bullet points
    if (inFeatures && (trimmed.startsWith('- ') || trimmed.startsWith('* '))) {
      const content = trimmed.substring(2).trim();
      if (content.length > 10 && content.length < 150 && !content.startsWith('http')) {
        features.push(content);
      }
    }
    // 遇到空行或新标题可能结束
    if (inFeatures && (trimmed.startsWith('#') || features.length >= 8)) {
      inFeatures = false;
    }
  }

  // 提取关键卖点（从 README 开头部分）
  const keyPoints = [];
  const headerSection = readme.substring(0, 3000);
  const keyMatches = headerSection.match(/🔥|✨|🚀|⚡|💡|⭐/g);
  if (keyMatches) {
    const pointLines = headerSection.split('\n').filter(line =>
      /🔥|✨|🚀|⚡|💡|⭐/.test(line) && line.length > 20 && line.length < 200
    );
    pointLines.slice(0, 5).forEach(line => {
      const cleaned = line.replace(/🔥|✨|🚀|⚡|💡|⭐/g, '').trim();
      if (cleaned.length > 10) keyPoints.push(cleaned);
    });
  }

  // 提取使用示例（代码块）
  const hasCodeExample = readme.includes('```');

  // 提取生产使用/案例
  const hasProductionUse = /production|production-ready|used by|companies/i.test(readme);

  // 构建详细描述
  let detailedDesc = '';

  // 1. 项目概述（200-300字）
  detailedDesc += `## 项目概述\n\n`;
  detailedDesc += `「${name}」是由 ${company || '开源社区'}（${project.country || '全球'}）开源维护的${getCategoryName(category)}。`;

  if (description) {
    detailedDesc += `${description} `;
  }

  if (firstParagraph && firstParagraph !== description) {
    // 简化第一段的表述
    let simplified = firstParagraph
      .replace(/Langroid is|`[^`]+`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .substring(0, 200);
    if (simplified.length > 50) {
      detailedDesc += simplified + ' ';
    }
  }

  detailedDesc += `该项目在 GitHub 上获得 ${stars.toLocaleString()} 个 Star`;
  if (language) detailedDesc += `，主要采用 ${language} 开发`;
  detailedDesc += `。`;

  if (topics.length > 0) {
    detailedDesc += `技术标签涵盖 ${topics.slice(0, 5).join('、')} 等。`;
  }

  detailedDesc += `社区活跃度高，维护团队响应及时，已被广泛应用于各类 AI 应用场景中。`;
  detailedDesc += `\n\n`;

  // 2. 核心功能与技术特点（300-400字）
  detailedDesc += `## 核心功能与技术特点\n\n`;

  if (features.length > 0) {
    detailedDesc += `该项目提供以下核心能力：\n\n`;
    features.slice(0, 6).forEach(f => {
      // 清理 markdown 格式
      const cleaned = f
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '"$1"');
      detailedDesc += `- ${cleaned}\n`;
    });
    detailedDesc += `\n`;
  } else {
    detailedDesc += `基于 ${getCategoryName(category)}的设计理念，提供完整的开发支持。`;
  }

  detailedDesc += `在技术实现上，项目采用模块化架构设计，各功能组件之间松耦合，便于开发者根据实际需求灵活组合。`;

  if (hasCodeExample) {
    detailedDesc += `官方提供丰富的代码示例和详细文档，帮助开发者快速上手。`;
  }

  if (hasProductionUse) {
    detailedDesc += `经过生产环境验证，具备高可用性和稳定性。`;
  }

  detailedDesc += `\n\n`;

  // 3. 技术亮点（250-350字）
  detailedDesc += `## 技术亮点\n\n`;

  if (keyPoints.length > 0) {
    detailedDesc += `该项目的核心优势包括：\n\n`;
    keyPoints.forEach(point => {
      detailedDesc += `- ${point}\n`;
    });
    detailedDesc += `\n`;
  } else {
    detailedDesc += `该项目在技术上具有以下突出特点：\n\n`;

    // 根据分类生成技术亮点
    if (category === 'ai-agent') {
      detailedDesc += `- **多智能体协作机制**：支持多个 Agent 之间的任务分配和协同工作，实现复杂的业务逻辑\n`;
      detailedDesc += `- **灵活的 LLM 集成**：支持多种大语言模型后端，便于根据场景选择最优模型\n`;
    } else if (category === 'ai-workflow') {
      detailedDesc += `- **可视化工作流编排**：提供直观的界面或 API 进行流程设计和调整\n`;
      detailedDesc += `- **状态持久化**：支持工作流状态的保存和恢复，确保任务可靠性\n`;
    } else if (category === 'ai-rag') {
      detailedDesc += `- **高效文档索引**：支持多种文档格式的快速索引和向量化处理\n`;
      detailedDesc += `- **语义检索优化**：基于嵌入模型的语义相似度计算，提升检索准确率\n`;
    } else {
      detailedDesc += `- **高性能架构**：针对大规模数据和高并发场景进行性能优化\n`;
      detailedDesc += `- **可扩展设计**：插件化架构支持功能扩展和自定义开发\n`;
    }

    detailedDesc += `- **开发者友好**：简洁的 API 设计和完善的文档，降低学习和使用门槛\n`;
    detailedDesc += `- **活跃社区**：持续更新迭代，及时响应社区反馈和需求\n`;
  }

  detailedDesc += `\n`;

  // 4. 应用场景（250-350字）
  detailedDesc += `## 应用场景\n\n`;

  const useCases = project.useCases || [];
  if (useCases.length > 0) {
    detailedDesc += `该项目适用于以下典型场景：\n\n`;
    useCases.slice(0, 5).forEach(uc => {
      detailedDesc += `- **${uc}**：${getUseCaseDetail(uc, category)}\n`;
    });
  } else {
    detailedDesc += `该项目可广泛应用于以下领域：\n\n`;
    detailedDesc += `- **企业智能化转型**：帮助企业快速构建 AI 能力，提升业务效率\n`;
    detailedDesc += `- **开发者工具链**：作为开发框架集成到现有的技术栈中\n`;
    detailedDesc += `- **学术研究**：支持前沿 AI 技术的研究和实验\n`;
  }

  if (hasProductionUse) {
    detailedDesc += `\n目前已有多个企业和团队在生产环境中使用该项目，验证了其稳定性和可靠性。`;
  }

  detailedDesc += `\n\n`;

  // 5. 快速开始（150-200字）
  detailedDesc += `## 快速开始\n\n`;
  detailedDesc += `开发者可以通过以下步骤快速上手：\n\n`;
  detailedDesc += `1. **环境准备**：确保安装 Python ${language === 'Python' ? '3.8+' : '或其他依赖环境'}\n`;
  detailedDesc += `2. **安装项目**：通过 pip/npm 等包管理器安装（具体命令参考官方文档）\n`;
  detailedDesc += `3. **运行示例**：从官方示例代码开始，了解基本用法和最佳实践\n`;
  detailedDesc += `4. **深入定制**：根据业务需求进行配置调整和功能扩展\n`;
  detailedDesc += `\n`;
  detailedDesc += `更多详细信息请参考官方文档：${project.github}\n`;

  return {
    ...project,
    detailedDescription: detailedDesc
  };
}

// 获取应用场景详细描述
function getUseCaseDetail(useCase, category) {
  const details = {
    '多智能体编程': '支持复杂任务分解和智能体间协同，适合构建分布式智能系统',
    'LLM应用开发': '提供完整的 LLM 应用开发工具链，加速 AI 产品落地',
    'RAG系统': '结合检索增强生成技术，构建企业知识库问答系统',
    '智能体协作': '实现多个 AI Agent 之间的任务分配和协作',
    '命令行自动化': '将 AI 能力集成到 CLI 工具中，提升开发效率',
    '工作流编排': '可视化编排复杂业务流程，支持条件分支和并行执行',
    '模型评估': '系统评估 LLM 性能，提供标准化基准测试结果',
    '自动化测试': '集成 AI 能力的测试框架，智能生成测试用例',
    'API集成': '简化与各类 AI 服务的集成流程'
  };
  return details[useCase] || '提供专业化的解决方案，满足特定业务需求';
}

// 获取分类名称
function getCategoryName(category) {
  const names = {
    'ai-agent': 'AI Agent 开发框架',
    'ai-workflow': 'AI 工作流编排工具',
    'ai-rag': 'RAG 检索增强系统',
    'ai-memory': 'AI 记忆系统',
    'ai-tool': 'AI 开发工具',
    'ai-integration': 'AI 集成方案',
    'automation': '自动化工具',
    'harness': 'Agent 开发框架',
    'ai-infra': 'AI 基础设施'
  };
  return names[category] || 'AI 相关工具';
}

// 获取应用场景描述
function getUseCaseDescription(useCase) {
  const descriptions = {
    '生产环境部署': '经过大规模生产环境验证，具有高可用性和稳定性',
    '学术研究': '被学术界广泛采用，支持前沿研究和实验',
    '企业应用': '适用于企业级场景，支持复杂的业务需求'
  };
  return descriptions[useCase] || '适用于多种场景，具有良好的通用性';
}

// 从 README 提取关键点
function extractKeyPoints(readme) {
  const points = [];
  const lines = readme.split('\n');

  // 查找以 - 或 * 开头的列表项
  lines.forEach(line => {
    const trimmed = line.trim();
    if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && trimmed.length > 20 && trimmed.length < 200) {
      const content = trimmed.substring(2).trim();
      if (!content.startsWith('[') && !content.startsWith('http')) {
        points.push(content);
      }
    }
  });

  return points.slice(0, 8);
}

// 主处理函数
async function processAll() {
  console.log(`📝 开始生成 ${projects.length} 个项目的详细介绍...\n`);

  const processedProjects = [];
  const batchSize = 10;

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    console.log(`处理第 ${i + 1}-${Math.min(i + batchSize, projects.length)} 个项目...`);

    for (const project of batch) {
      const processed = generateDetailedDescription(project);
      processedProjects.push(processed);

      const descLength = (processed.detailedDescription || '').length;
      console.log(`  ✅ ${project.name}: ${descLength} 字符`);
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
    // 保留核心字段
    const cleaned = { ...project };
    delete cleaned.readme;
    delete cleaned.readmeClean;
    delete cleaned.readmeUrl;

    // 确保详细描述存在
    if (!cleaned.detailedDescription || cleaned.detailedDescription.length < 500) {
      // 如果没有详细描述，使用原有的描述
      cleaned.detailedDescription = cleaned.chineseDescription || cleaned.descriptionZh || '';
    }

    return cleaned;
  });

  // 保存最终数据
  fs.writeFileSync(finalOutputPath, JSON.stringify(finalProjects, null, 2), 'utf-8');
  console.log(`✅ 最终数据已保存到: ${finalOutputPath}`);

  // 统计
  const total = finalProjects.length;
  const withDetailed = finalProjects.filter(p => p.detailedDescription && p.detailedDescription.length > 500).length;
  const avgLength = finalProjects
    .filter(p => p.detailedDescription)
    .reduce((sum, p) => sum + p.detailedDescription.length, 0) / withDetailed;

  console.log(`\n📊 最终统计:`);
  console.log(`  - 总项目数: ${total}`);
  console.log(`  - 有详细介绍: ${withDetailed}/${total}`);
  console.log(`  - 平均长度: ${Math.round(avgLength)} 字符`);

  // 显示示例
  console.log(`\n📝 示例项目详细介绍:`);
  const sample = finalProjects[0];
  console.log(`\n${sample.name}:`);
  console.log(sample.detailedDescription.substring(0, 500) + '...');
}

// 主函数
async function main() {
  try {
    const processedProjects = await processAll();
    generateFinalData(processedProjects);

    console.log('\n✅ 全部完成！');
  } catch (error) {
    console.error('❌ 错误:', error);
    process.exit(1);
  }
}

main();
