#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const companyAccounts = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'company-accounts.json'), 'utf-8')
);

function categorizeProject(name, description, owner) {
  const lowerName = name.toLowerCase();
  const lowerDesc = (description || '').toLowerCase();
  const lowerOwner = owner.toLowerCase();

  if (lowerName.includes('llm') || lowerName.includes('glm') || lowerName.includes('qwen') || 
      lowerName.includes('deepseek') || lowerName.includes('ernie') || lowerName.includes('doubao') ||
      lowerDesc.includes('大模型') || lowerDesc.includes('language model') ||
      lowerName.includes('chat') || lowerName.includes('model')) {
    return 'ai-model';
  }

  if (lowerName.includes('inference') || lowerName.includes('vllm') || lowerName.includes('lightllm') ||
      lowerName.includes('llama') || lowerDesc.includes('推理') ||
      lowerName.includes('server') || lowerName.includes('serving')) {
    return 'ai-infra';
  }

  if (lowerName.includes('paddle') || lowerName.includes('framework') || lowerName.includes('deep learning') ||
      lowerName.includes('torch') || lowerName.includes('tensorflow')) {
    return 'ai-framework';
  }

  if (lowerName.includes('nlp') || lowerName.includes('text') || lowerName.includes('sentence') ||
      lowerName.includes('token') || lowerName.includes('embedding')) {
    return 'ai-nlp';
  }

  if (lowerName.includes('cv') || lowerName.includes('vision') || lowerName.includes('image') ||
      lowerName.includes('yolo') || lowerName.includes('优图') || lowerName.includes('detection') ||
      lowerName.includes('recognition')) {
    return 'ai-cv';
  }

  if (lowerName.includes('multimodal') || lowerName.includes('cogview') || 
      lowerName.includes('文生图') || lowerName.includes('image generation') ||
      lowerName.includes('diffusion') || lowerName.includes('stable')) {
    return 'ai-multimodal';
  }

  if (lowerName.includes('rag') || lowerName.includes('weknora') || lowerName.includes('retrieval')) {
    return 'ai-app';
  }

  if (lowerName.includes('cli') || lowerName.includes('tool') || lowerName.includes('lark') ||
      lowerName.includes('feishu') || lowerName.includes('bot') || lowerName.includes('sdk')) {
    return 'tools';
  }

  if (lowerName.includes('vue') || lowerName.includes('react') || lowerName.includes('ant') ||
      lowerName.includes('element') || lowerName.includes('vant') || lowerName.includes('arco') ||
      lowerName.includes('ui') || lowerName.includes('component')) {
    return 'frontend';
  }

  return 'ai-app';
}

async function fetchReposFromAccount(account, companyInfo) {
  console.log(`正在获取 ${companyInfo.name} (${account}) 的开源项目...`);
  
  try {
    const { stdout } = await execAsync(`gh api users/${account}/repos --paginate`);
    const repos = JSON.parse(stdout);
    
    console.log(`  - 获取到 ${repos.length} 个项目`);
    
    return repos
      .filter(repo => !repo.fork && !repo.archived && repo.stargazers_count >= 10)
      .map(repo => ({
        id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: repo.name,
        company: companyInfo.name,
        companyLogo: companyInfo.logo,
        description: repo.description || '',
        github: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        tags: [
          repo.language,
          ...(repo.topics || []).slice(0, 3)
        ].filter(Boolean),
        category: categorizeProject(repo.name, repo.description, account),
        install: {},
        usage: '',
        chineseDescription: repo.description || ''
      }));
    
  } catch (error) {
    console.error(`  - 获取 ${account} 项目失败:`, error.message);
    return [];
  }
}

async function fetchAllCompanyRepos() {
  console.log('🚀 开始从大厂账号抓取开源项目...\n');
  
  let allProjects = [];
  
  for (const company of companyAccounts.companies) {
    console.log(`\n===== ${company.name} =====`);
    
    for (const account of company.githubAccounts) {
      const repos = await fetchReposFromAccount(account, company);
      allProjects = allProjects.concat(repos);
    }
  }
  
  console.log(`\n✅ 共获取到 ${allProjects.length} 个项目`);
  
  return allProjects;
}

async function main() {
  const newProjects = await fetchAllCompanyRepos();
  
  if (newProjects.length === 0) {
    console.log('没有获取到新项目');
    return;
  }
  
  const existingProjectsPath = path.join(__dirname, '../src/data/projects.json');
  let existingProjects = [];
  
  if (fs.existsSync(existingProjectsPath)) {
    existingProjects = JSON.parse(fs.readFileSync(existingProjectsPath, 'utf-8'));
  }
  
  const existingIds = new Set(existingProjects.map(p => p.id));
  const mergedProjects = [...existingProjects];
  let addedCount = 0;
  
  for (const project of newProjects) {
    if (!existingIds.has(project.id)) {
      console.log(`添加新项目: ${project.name} (${project.company}) ⭐${project.stars}`);
      mergedProjects.push(project);
      addedCount++;
    }
  }
  
  mergedProjects.sort((a, b) => b.stars - a.stars);
  
  fs.writeFileSync(existingProjectsPath, JSON.stringify(mergedProjects, null, 2));
  console.log(`\n✅ 更新完成！`);
  console.log(`   - 原有项目: ${existingProjects.length}`);
  console.log(`   - 新增项目: ${addedCount}`);
  console.log(`   - 总计: ${mergedProjects.length} 个项目`);
}

main().catch(console.error);
