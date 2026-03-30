#!/usr/bin/env node
/**
 * 修复项目 stars 数据
 * 使用 GitHub API 获取真实的 stars 数据
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 从 GitHub URL 提取 owner/repo
function parseGithubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}

// 批量获取 stars（每次 10 个，避免限流）
async function fetchStarsBatch(projectsBatch) {
  const results = [];
  for (const project of projectsBatch) {
    const parsed = parseGithubUrl(project.github);
    if (!parsed) {
      console.log(`  ⚠️  无法解析: ${project.name}`);
      results.push({ ...project, stars: project.stars || 0 });
      continue;
    }

    try {
      const { stdout } = await execAsync(
        `gh api repos/${parsed.owner}/${parsed.repo} --jq '{stars: .stargazers_count, language: .language}'`,
        { timeout: 10000 }
      );
      const data = JSON.parse(stdout);
      results.push({
        ...project,
        stars: data.stars || 0,
        language: data.language || project.language || null
      });
      console.log(`  ✅ ${project.name}: ${data.stars} ★`);
    } catch (error) {
      console.log(`  ❌ ${project.name}: ${error.message}`);
      results.push({ ...project, stars: project.stars || 0 });
    }
  }
  return results;
}

async function fixStars() {
  console.log('🔧 开始修复 stars 数据...\n');
  console.log(`共 ${projects.length} 个项目需要处理\n`);

  const fixedProjects = [];
  const batchSize = 5; // 每批 5 个，避免限流

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    console.log(`处理第 ${i + 1}-${Math.min(i + batchSize, projects.length)} 个项目...`);
    const batchResults = await fetchStarsBatch(batch);
    fixedProjects.push(...batchResults);

    // 每批之间等待 1 秒
    if (i + batchSize < projects.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // 按 stars 排序
  fixedProjects.sort((a, b) => b.stars - a.stars);

  // 保存
  fs.writeFileSync(projectsPath, JSON.stringify(fixedProjects, null, 2), 'utf-8');

  console.log('\n✅ 修复完成！');
  console.log(`\n📊 Stars 统计:`);
  console.log(`  最高: ${fixedProjects[0]?.stars || 0} (${fixedProjects[0]?.name})`);
  console.log(`  最低: ${fixedProjects[fixedProjects.length - 1]?.stars || 0}`);
  console.log(`  平均: ${Math.round(fixedProjects.reduce((s, p) => s + p.stars, 0) / fixedProjects.length)}`);
}

fixStars().catch(console.error);
