#!/usr/bin/env node
/**
 * 抓取项目 README
 * 使用 GitHub API 获取每个项目的 README 内容
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectsPath = path.join(__dirname, '../src/data/projects.json');
const outputPath = path.join(__dirname, '../src/data/projects-with-readme.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 从 GitHub URL 提取 owner/repo
function parseGithubUrl(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }
  return null;
}

// 解码 base64 内容
function decodeBase64(content) {
  try {
    return Buffer.from(content, 'base64').toString('utf-8');
  } catch (e) {
    return '';
  }
}

// 清理 README 内容（提取前 8000 字符，去除代码块等）
function cleanReadme(content) {
  if (!content) return '';

  // 移除图片标签
  let cleaned = content.replace(/!\[.*?\]\(.*?\)/g, '');
  // 移除 HTML 标签
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  // 保留前 8000 字符
  return cleaned.substring(0, 8000);
}

// 批量获取 README
async function fetchReadmes() {
  console.log(`🔍 开始抓取 ${projects.length} 个项目的 README...\n`);

  const updatedProjects = [];
  const batchSize = 5;

  for (let i = 0; i < projects.length; i += batchSize) {
    const batch = projects.slice(i, i + batchSize);
    console.log(`处理第 ${i + 1}-${Math.min(i + batchSize, projects.length)} 个项目...`);

    for (const project of batch) {
      const parsed = parseGithubUrl(project.github);
      if (!parsed) {
        console.log(`  ⚠️  无法解析: ${project.name}`);
        updatedProjects.push({
          ...project,
          readme: '',
          readmeClean: ''
        });
        continue;
      }

      try {
        // 获取 README
        const { stdout } = await execAsync(
          `gh api repos/${parsed.owner}/${parsed.repo}/readme --jq '{content: .content, path: .path, html_url: .html_url}'`,
          { timeout: 20000 }
        );
        const data = JSON.parse(stdout);

        // 解码内容
        const readmeContent = decodeBase64(data.content || '');
        const readmeClean = cleanReadme(readmeContent);

        updatedProjects.push({
          ...project,
          readme: readmeContent,
          readmeClean: readmeClean,
          readmeUrl: data.html_url
        });

        console.log(`  ✅ ${project.name}: ${readmeClean.length} 字符`);
      } catch (error) {
        console.log(`  ❌ ${project.name}: ${error.message.split('\n')[0]}`);
        // 失败时保留原数据
        updatedProjects.push({
          ...project,
          readme: '',
          readmeClean: ''
        });
      }
    }

    // 每批之间等待 500ms
    if (i + batchSize < projects.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // 保存
  fs.writeFileSync(outputPath, JSON.stringify(updatedProjects, null, 2), 'utf-8');
  console.log(`\n✅ 完成！已保存到: ${outputPath}`);

  // 统计
  const withReadme = updatedProjects.filter(p => p.readmeClean && p.readmeClean.length > 100).length;
  const avgLength = updatedProjects
    .filter(p => p.readmeClean)
    .reduce((sum, p) => sum + p.readmeClean.length, 0) / withReadme;
  console.log(`📊 统计: ${withReadme}/${updatedProjects.length} 个项目有 README，平均 ${Math.round(avgLength)} 字符`);
}

fetchReadmes().catch(console.error);
