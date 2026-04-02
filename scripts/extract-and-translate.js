#!/usr/bin/env node
/**
 * 提取 README 核心内容并翻译
 * 直接复制项目官方介绍，不做额外发挥
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, '../src/data/projects-with-readme.json');
const outputPath = path.join(__dirname, '../src/data/projects.json');

const projects = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// 提取 README 核心介绍（找到第一个实质性段落）
function extractCoreDescription(readme) {
  if (!readme) return '';

  // 移除代码块
  let cleaned = readme.replace(/```[\s\S]*?```/g, '');
  // 移除 HTML
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  // 移除所有 URL
  cleaned = cleaned.replace(/https?:\/\/[^\s\)]+/g, '');
  // 移除图片
  cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, '');
  // 移除链接只保留文本 [text](url) -> text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  // 移除空链接 []
  cleaned = cleaned.replace(/\[\]/g, '');
  // 移除单独的括号
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  // 移除连续的空格
  cleaned = cleaned.replace(/\s+/g, ' ');

  // 分割成行
  const lines = cleaned.split('\n');
  const paragraphs = [];

  // 找到第一个实质性段落
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // 跳过标题
    if (line.startsWith('#')) continue;
    // 跳过空行
    if (line.length === 0) continue;
    // 跳过长度过短的行
    if (line.length < 40) continue;
    // 跳过列表项开头
    if (/^[-*•]\s/.test(line)) continue;
    // 跳过大写标题行
    if (/^[A-Z][A-Z\s:()]+$/.test(line)) continue;
    // 跳过全是链接的行
    if (/^\s*\(/.test(line)) continue;

    // 收集这个段落
    let paragraph = line;

    // 继续收集后续行
    for (let j = i + 1; j < lines.length && paragraphs.length < 4; j++) {
      let nextLine = lines[j].trim();

      // 遇到标题停止
      if (nextLine.startsWith('#')) break;
      // 遇到短行可能是新段落
      if (nextLine.length === 0) {
        if (paragraph.length > 150) break;
        continue;
      }
      // 遇到列表项可能是新段落
      if (/^[-*•]\s/.test(nextLine)) {
        if (paragraph.length > 200) break;
      }

      paragraph += ' ' + nextLine;
    }

    // 清理
    paragraph = paragraph
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '"$1"')
      .replace(/\s+/g, ' ')
      .replace(/^[-*•]\s*/, '')
      .trim();

    if (paragraph.length > 80) {
      paragraphs.push(paragraph);

      // 收集到2-4个段落或1000字就停止
      if (paragraphs.length >= 4 || paragraphs.join(' ').length > 1000) {
        break;
      }
    }
  }

  return paragraphs.join('\n\n');
}

// 简单的中英翻译映射（常用技术术语）
const techTerms = {
  'framework': '框架',
  'agent': '智能体',
  'multi-agent': '多智能体',
  'LLM': '大语言模型',
  'AI': '人工智能',
  'API': 'API',
  'SDK': 'SDK',
  'open-source': '开源',
  'autonomous': '自主的',
  'orchestration': '编排',
  'workflow': '工作流',
  'tool': '工具',
  'integration': '集成',
  'development': '开发',
  'production': '生产环境',
  'scalable': '可扩展的',
  'extensible': '可扩展的',
  'lightweight': '轻量级的',
  'powerful': '强大的',
  'easy to use': '易于使用',
  'build': '构建',
  'deploy': '部署',
  'manage': '管理',
  'create': '创建',
  'application': '应用',
  'platform': '平台',
  'library': '库',
  'interface': '接口',
  'component': '组件',
  'module': '模块',
  'function': '功能',
  'feature': '特性',
  'support': '支持',
  'provide': '提供',
  'allow': '允许',
  'enable': '使能够',
  'based on': '基于',
  'using': '使用',
  'designed for': '专为...设计',
  'aimed at': '旨在'
};

// 翻译英文描述为中文
function translateDescription(enDesc) {
  if (!enDesc) return '';

  let zhDesc = enDesc;

  // 替换技术术语
  for (let [en, zh] of Object.entries(techTerms)) {
    const regex = new RegExp('\\b' + en + '\\b', 'gi');
    zhDesc = zhDesc.replace(regex, zh);
  }

  // 简单的句式转换
  zhDesc = zhDesc
    .replace(/is a /gi, '是一个 ')
    .replace(/is an /gi, '是一个 ')
    .replace(/that allows /gi, '允许 ')
    .replace(/that enables /gi, '使 ')
    .replace(/to build /gi, '构建 ')
    .replace(/to create /gi, '创建 ')
    .replace(/for building /gi, '用于构建 ')
    .replace(/for creating /gi, '用于创建 ')
    .replace(/designed to /gi, '旨在 ')
    .replace(/focused on /gi, '专注于 ');

  return zhDesc;
}

// 主处理函数
async function processAll() {
  console.log(`📝 开始处理 ${projects.length} 个项目...\n`);

  const processedProjects = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    // 提取核心描述
    const coreDesc = extractCoreDescription(project.readmeClean);

    // 翻译为中文
    const chineseDesc = translateDescription(coreDesc);

    // 合并成详细描述
    let detailedDesc = '';

    if (chineseDesc) {
      detailedDesc = chineseDesc;
    } else if (project.description) {
      // 如果没有提取到 README，使用原有描述
      detailedDesc = project.descriptionZh || project.chineseDescription || project.description;
    }

    processedProjects.push({
      ...project,
      detailedDescription: detailedDesc,
      // 保留简短描述用于列表页
      descriptionZh: project.descriptionZh || project.chineseDescription || chineseDesc.substring(0, 150)
    });

    console.log(`  ✅ ${project.name}: ${detailedDesc.length} 字符`);
  }

  // 保存
  const finalProjects = processedProjects.map(p => {
    const { readme, readmeClean, readmeUrl, ...cleaned } = p;
    return cleaned;
  });

  fs.writeFileSync(outputPath, JSON.stringify(finalProjects, null, 2), 'utf-8');
  console.log(`\n✅ 完成！已保存到: ${outputPath}`);

  // 统计
  const withDesc = finalProjects.filter(p => p.detailedDescription && p.detailedDescription.length > 100).length;
  console.log(`📊 统计: ${withDesc}/${finalProjects.length} 个项目有详细描述`);

  // 显示示例
  console.log(`\n📝 示例 - ${finalProjects[0].name}:`);
  console.log(finalProjects[0].detailedDescription.substring(0, 500) + '...');
}

processAll().catch(console.error);
