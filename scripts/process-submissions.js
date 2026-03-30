#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function fetchRecentIssues() {
  console.log('正在获取最近的提交 Issues...');
  
  try {
    // 获取最近的 Issues
    const { stdout } = await execAsync('gh issue list --state open --json number,title,body,createdAt --limit 50');
    const issues = JSON.parse(stdout);
    
    console.log(`找到 ${issues.length} 个 Issues`);
    return issues;
  } catch (error) {
    console.error('获取 Issues 失败:', error.message);
    return [];
  }
}

function extractGithubUrls(body) {
  // 从 Issue 内容中提取 GitHub 链接
  const urlRegex = /https:\/\/github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]*)?/g;
  return [...new Set(body.match(urlRegex) || [])]; // 去重
}

async function processRepository(owner, repoName) {
  try {
    console.log(`  - 处理仓库: ${owner}/${repoName}`);
    
    // 获取仓库信息
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    if (!response.ok) {
      console.log(`    - 无法获取仓库信息: ${response.status}`);
      return null;
    }

    const repoData = await response.json();
    
    // 检查是否是开源项目
    if (repoData.private || !repoData.html_url) {
      console.log(`    - 非公开仓库，跳过`);
      return null;
    }

    return {
      id: repoData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: repoData.name,
      company: owner,
      description: repoData.description || '',
      github: repoData.html_url,
      stars: repoData.stargazers_count,
      language: repoData.language || 'Unknown',
      tags: repoData.topics?.slice(0, 3) || [],
      category: categorizeProject(repoData.name, repoData.description, owner),
      install: {},
      usage: '',
      chineseDescription: repoData.description || ''
    };
  } catch (error) {
    console.error(`    - 处理仓库 ${owner}/${repoName} 时出错:`, error.message);
    return null;
  }
}

async function processUser(username) {
  try {
    console.log(`  - 处理用户/组织: ${username}`);
    
    // 获取用户仓库列表
    const response = await fetch(`https://api.github.com/users/${username}/repos?type=public`);
    if (!response.ok) {
      console.log(`    - 无法获取用户仓库列表: ${response.status}`);
      return [];
    }

    const repos = await response.json();
    const validRepos = repos.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      repo.visibility !== 'private' &&
      repo.stargazers_count >= 10
    );

    console.log(`    - 找到 ${validRepos.length} 个符合条件的仓库`);

    const projects = [];
    for (const repo of validRepos) {
      const project = await processRepository(username, repo.name);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error(`    - 处理用户 ${username} 时出错:`, error.message);
    return [];
  }
}

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

function updateCompanyAccounts(username) {
  // 更新大厂账号列表
  const accountsPath = path.join(__dirname, 'company-accounts.json');
  let companyAccounts = JSON.parse(fs.readFileSync(accountsPath, 'utf-8'));
  
  // 检查是否已存在
  let exists = false;
  for (const company of companyAccounts.companies) {
    if (company.githubAccounts.includes(username)) {
      exists = true;
      break;
    }
  }
  
  if (!exists) {
    // 添加到"其他"类别或创建新类别（如果能识别公司的话）
    let companyName = username; // 默认使用用户名作为公司名
    
    // 尝试识别常见的大厂
    const knownCompanies = {
      'alibaba': '阿里巴巴',
      'ant-design': '阿里巴巴',
      'bytedance': '字节跳动',
      'larksuite': '字节跳动',
      'volcengine': '字节跳动',
      'tencent': '腾讯',
      'Tencent': '腾讯',
      'baidu': '百度',
      'PaddlePaddle': '百度',
      'meituan': '美团',
      'Meituan-Dianping': '美团',
      'jd': '京东',
      'NervJS': '京东',
      'xiaohongshu': '小红书',
      'THUDM': '智谱 AI',
      'ZhipuAI': '智谱 AI',
      'deepseek-ai': 'DeepSeek',
      'infiniflow': '深度好奇'
    };
    
    if (knownCompanies[username.toLowerCase()]) {
      companyName = knownCompanies[username.toLowerCase()];
    }
    
    // 检查公司是否已存在
    let companyExists = false;
    for (const company of companyAccounts.companies) {
      if (company.name === companyName) {
        if (!company.githubAccounts.includes(username)) {
          company.githubAccounts.push(username);
          console.log(`    - 已将 ${username} 添加到 ${companyName} 账号列表`);
        }
        companyExists = true;
        break;
      }
    }
    
    if (!companyExists) {
      // 添加新公司
      companyAccounts.companies.push({
        name: companyName,
        githubAccounts: [username],
        logo: '' // 需要手动添加 logo
      });
      console.log(`    - 已添加新公司: ${companyName} (${username})`);
    }
    
    // 保存更新
    fs.writeFileSync(accountsPath, JSON.stringify(companyAccounts, null, 2));
    return true;
  }
  
  return false;
}

async function processSubmissions() {
  console.log('🚀 开始处理用户提交...\n');
  
  const issues = await fetchRecentIssues();
  if (issues.length === 0) {
    console.log('没有新的提交');
    return;
  }

  const existingProjectsPath = path.join(__dirname, '../src/data/projects.json');
  let existingProjects = [];
  
  if (fs.existsSync(existingProjectsPath)) {
    existingProjects = JSON.parse(fs.readFileSync(existingProjectsPath, 'utf-8'));
  }
  
  const existingIds = new Set(existingProjects.map(p => p.id));
  let newProjectsAdded = 0;
  let newCompaniesAdded = 0;

  for (const issue of issues) {
    console.log(`\n处理 Issue #${issue.number}: ${issue.title}`);
    
    const urls = extractGithubUrls(issue.body || '');
    if (urls.length === 0) {
      console.log('  - 未找到 GitHub 链接，跳过');
      continue;
    }

    for (const url of urls) {
      console.log(`  - 发现链接: ${url}`);
      
      try {
        // 解析 URL
        const match = url.match(/^https:\/\/github\.com\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]*))?/);
        if (!match) {
          console.log('    - 无效的 URL 格式，跳过');
          continue;
        }

        const [, owner, repoName] = match;
        
        if (repoName) {
          // 这是一个具体的仓库链接
          const project = await processRepository(owner, repoName);
          if (project && !existingIds.has(project.id)) {
            console.log(`    - 添加新项目: ${project.name} (${project.company}) ⭐${project.stars}`);
            existingProjects.push(project);
            existingIds.add(project.id);
            newProjectsAdded++;
          } else if (project) {
            console.log(`    - 项目已存在，跳过: ${project.name}`);
          }
        } else {
          // 这是一个用户/组织链接
          const updated = updateCompanyAccounts(owner);
          if (updated) {
            newCompaniesAdded++;
          }
          
          // 获取该用户/组织的所有仓库
          const projects = await processUser(owner);
          for (const project of projects) {
            if (!existingIds.has(project.id)) {
              console.log(`    - 添加新项目: ${project.name} (${project.company}) ⭐${project.stars}`);
              existingProjects.push(project);
              existingIds.add(project.id);
              newProjectsAdded++;
            } else {
              console.log(`    - 项目已存在，跳过: ${project.name}`);
            }
          }
        }
      } catch (error) {
        console.error(`    - 处理链接 ${url} 时出错:`, error.message);
      }
    }
  }

  // 保存更新后的项目列表
  if (newProjectsAdded > 0 || newCompaniesAdded > 0) {
    existingProjects.sort((a, b) => b.stars - a.stars);
    fs.writeFileSync(existingProjectsPath, JSON.stringify(existingProjects, null, 2));
    
    console.log(`\n✅ 更新完成！`);
    console.log(`   - 新增项目: ${newProjectsAdded}`);
    console.log(`   - 新增公司账号: ${newCompaniesAdded}`);
    console.log(`   - 总计: ${existingProjects.length} 个项目`);
  } else {
    console.log('\n没有新的项目需要添加');
  }
}

// 运行主函数
processSubmissions().catch(console.error);
