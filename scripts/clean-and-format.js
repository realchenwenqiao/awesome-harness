#!/usr/bin/env node
/**
 * 清理并生成中英文介绍
 * 严格清理，只保留有意义的文本
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, '../src/data/projects-with-readme.json');
const outputPath = path.join(__dirname, '../src/data/projects.json');

const projects = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// 严格清理文本
function strictClean(text) {
  if (!text) return '';

  return text
    // 移除代码块
    .replace(/```[\s\S]*?```/g, ' ')
    // 移除行内代码
    .replace(/`[^`]*`/g, ' ')
    // 移除 HTML 标签和实体
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    // 移除 markdown 图片和链接
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 移除 URL
    .replace(/https?:\/\/[^\s]+/g, ' ')
    // 移除特殊字符和符号
    .replace(/[*#>`\-_|\[\](){}/\\]/g, ' ')
    // 移除 emoji
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, ' ')
    // 移除连续标点
    .replace(/[!?.]+/g, '. ')
    // 规范化空格
    .replace(/\s+/g, ' ')
    .trim();
}

// 提取核心段落（README的前几个自然段）
function extractCoreParagraphs(readme) {
  if (!readme) return [];

  const cleaned = strictClean(readme);

  // 按句号分割成句子
  const sentences = cleaned
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => {
      // 过滤掉太短的
      if (s.length < 30) return false;
      // 过滤掉太长的（可能是列表）
      if (s.length > 250) return false;
      // 过滤掉包含日期的
      if (/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|202[0-9])\b/i.test(s)) return false;
      // 过滤掉看起来像是导航的
      if (/\b(Docs|Homepage|Blog|Forum|Tutorial|Example|Guide|Installation|Getting Started)\b/i.test(s) && s.length < 80) return false;
      return true;
    });

  // 取前3-5个句子
  return sentences.slice(0, 5);
}

// 生成英文描述
function generateEnglishDesc(sentences, originalDesc) {
  if (sentences.length === 0) {
    return originalDesc || '';
  }

  const desc = sentences.join('. ') + '.';

  // 限制长度
  if (desc.length > 600) {
    return desc.substring(0, 600) + '...';
  }
  return desc;
}

// 生成中文描述
function generateChineseDesc(category, sentences) {
  const categoryMap = {
    'ai-agent': ['AI Agent 开发框架', '构建多智能体协作系统', '智能体通信与任务编排'],
    'ai-workflow': ['AI 工作流编排平台', '自动化复杂业务流程', '可视化工作流设计'],
    'ai-rag': ['RAG 检索增强系统', '知识库问答与文档检索', '语义搜索与信息提取'],
    'ai-memory': ['AI 记忆与存储方案', '长期记忆管理', '向量数据存储'],
    'ai-tool': ['AI 开发工具集', 'LLM 应用开发支持', '开发效率工具'],
    'ai-integration': ['AI 集成解决方案', '多模型统一接入', '企业级集成方案'],
    'automation': ['自动化工具平台', '任务自动化执行', '智能流程自动化'],
    'harness': ['Agent 应用开发框架', '智能体应用开发', 'Harness 范式实现'],
    'ai-infra': ['AI 基础设施组件', '大模型服务支撑', 'AI 系统基础设施']
  };

  const [catName, cap1, cap2] = categoryMap[category] || ['AI 工具', 'AI 应用开发', '智能功能实现'];

  // 提取一些关键词
  const keywords = [];
  const allText = sentences.join(' ').toLowerCase();
  if (allText.includes('multi-agent') || allText.includes('collaborat')) keywords.push('多智能体协作');
  if (allText.includes('workflow') || allText.includes('orchestr')) keywords.push('工作流编排');
  if (allText.includes('rag') || allText.includes('retriev')) keywords.push('检索增强');
  if (allText.includes('production') || allText.includes('enterprise')) keywords.push('企业级部署');
  if (allText.includes('easy') || allText.includes('simple')) keywords.push('简单易用');
  if (allText.includes('fast') || allText.includes('performance')) keywords.push('高性能');
  if (allText.includes('extensible') || allText.includes('flexible')) keywords.push('灵活扩展');

  let zh = `${catName}。`;

  if (keywords.length > 0) {
    zh += `核心特性包括${keywords.slice(0, 3).join('、')}。`;
  } else {
    zh += `支持${cap1}，${cap2}。`;
  }

  zh += '适用于构建智能客服、自动化助手、知识管理系统等企业级 AI 应用场景。';
  zh += '具有模块化设计、易于集成、生产环境可用等优势。';

  return zh;
}

// 主处理
async function processAll() {
  console.log(`📝 开始处理 ${projects.length} 个项目...\n`);

  const processed = [];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];

    // 提取核心句子
    const sentences = extractCoreParagraphs(p.readmeClean);

    // 生成英文描述
    const enDesc = generateEnglishDesc(sentences, p.description);

    // 生成中文描述
    const zhDesc = generateChineseDesc(p.category, sentences);

    processed.push({
      ...p,
      description: p.description || enDesc.substring(0, 150),
      descriptionZh: zhDesc.substring(0, 150),
      detailedDescription: enDesc,
      chineseDescription: zhDesc,
      readme: undefined,
      readmeClean: undefined,
      readmeUrl: undefined
    });

    if ((i + 1) % 50 === 0) {
      console.log(`  已处理 ${i + 1}/${projects.length}...`);
    }
  }

  // 保存
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2), 'utf-8');

  console.log(`\n✅ 完成！`);

  // 示例
  console.log(`\n📝 示例:`);
  ['langroid', 'crewAI', 'AutoGPT', 'langchain'].forEach(name => {
    const p = processed.find(p => p.name === name);
    if (p) {
      console.log(`\n${name}:`);
      console.log(`  EN: ${p.detailedDescription.substring(0, 120)}...`);
      console.log(`  ZH: ${p.chineseDescription}`);
    }
  });
}

processAll().catch(console.error);
