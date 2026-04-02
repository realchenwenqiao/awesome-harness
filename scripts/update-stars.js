#!/usr/bin/env node
/**
 * 更新项目 stars 数量
 * 用法: node scripts/update-stars.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_FILE = path.join(__dirname, '../src/data/projects.json');

// GitHub API 配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'realchenwenqiao';
const REPO_NAME = 'awesome-harness';

if (!GITHUB_TOKEN) {
  console.log('⚠️ 未设置 GITHUB_TOKEN，将使用公开 API (rate limit: 60次/小时)');
}

const headers = GITHUB_TOKEN
  ? { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' }
  : { Accept: 'application/vnd.github.v3+json' };

// 延迟函数，避免过快请求
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取单个项目的 stars
async function fetchStars(repoUrl) {
  if (!repoUrl || !repoUrl.includes('github.com')) {
    return null;
  }

  // 从 URL 提取 owner/repo
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/\s]+)/);
  if (!match) return null;

  const [, owner, repo] = match;
  const repoName = repo.replace(/\.git$/, '');

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
      headers
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`  ❌ 仓库不存在: ${owner}/${repoName}`);
        return null;
      }
      console.log(`  ⚠️ API 错误 ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    console.log(`  ❌ 请求失败: ${error.message}`);
    return null;
  }
}

// 主函数
async function updateStars() {
  console.log('🔄 开始更新项目 stars...\n');

  // 读取项目数据
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  console.log(`📊 共 ${projects.length} 个项目待检查\n`);

  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  // 逐个获取 stars
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const repoUrl = project.github;

    process.stdout.write(`[${i + 1}/${projects.length}] ${project.name}: `);

    const newStars = await fetchStars(repoUrl);

    if (newStars === null) {
      failed++;
      console.log('跳过');
      continue;
    }

    const oldStars = project.stars || 0;

    if (newStars !== oldStars) {
      project.stars = newStars;
      updated++;
      console.log(`${oldStars} → ${newStars} ⭐`);
    } else {
      unchanged++;
      console.log(`${newStars} ⭐ (无变化)`);
    }

    // 每次请求后延迟，避免 rate limit
    await delay(100);
  }

  console.log('\n💾 保存数据...');
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));

  console.log('\n✅ 完成!');
  console.log(`   更新: ${updated} 个`);
  console.log(`   无变化: ${unchanged} 个`);
  console.log(`   失败: ${failed} 个`);

  // 输出摘要用于 commit
  console.log(`\n📝 UPDATED=${updated} UNCHANGED=${unchanged} FAILED=${failed}`);
}

updateStars().catch(console.error);