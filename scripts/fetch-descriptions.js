#!/usr/bin/env node
/**
 * 批量抓取 GitHub 项目描述
 * 使用 gh CLI 获取每个项目的英文描述
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectsPath = path.join(__dirname, '../src/data/projects.json');
const outputPath = path.join(__dirname, '../src/data/projects-with-en-desc.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 从 GitHub URL 提取 owner/repo
function parseGithubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }
  return null;
}

// 批量获取描述
async function fetchDescriptions() {
  console.log(`🔍 开始抓取 ${projects.length} 个项目的描述...\n`);

  const updatedProjects = [];
  const batchSize = 10; // 每批 10 个，避免 rate limit

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    console.log(`处理第 ${i + 1}-${Math.min(i + batchSize, projects.length)} 个项目...`);

    for (const project of batch) {
      const parsed = parseGithubUrl(project.github);
      if (!parsed) {
        console.log(`  ⚠️  无法解析: ${project.name}`);
        updatedProjects.push({
          ...project,
          description: project.description || ''
        });
        continue;
      }

      try {
        const { stdout } = await execAsync(
          `gh api repos/${parsed.owner}/${parsed.repo} --jq '{description: .description, topics: .topics}'`,
          { timeout: 15000 }
        );
        const data = JSON.parse(stdout);

        // 保留原有字段，添加/更新英文描述
        updatedProjects.push({
          ...project,
          description: data.description || project.description || '',
          topics: data.topics || project.tags || []
        });

        console.log(`  ✅ ${project.name}: ${(data.description || '').substring(0, 50)}...`);
      } catch (error) {
        console.log(`  ❌ ${project.name}: ${error.message}`);
        // 失败时保留原数据
        updatedProjects.push({
          ...project,
          description: project.description || ''
        });
      }
    }

    // 每批之间等待 1 秒
    if (i + batchSize < projects.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // 保存
  fs.writeFileSync(outputPath, JSON.stringify(updatedProjects, null, 2), 'utf-8');
  console.log(`\n✅ 完成！已保存到: ${outputPath}`);

  // 统计
  const withDesc = updatedProjects.filter(p => p.description && p.description.length > 10).length;
  console.log(`📊 统计: ${withDesc}/${updatedProjects.length} 个项目有有效描述`);
}

fetchDescriptions().catch(console.error);
