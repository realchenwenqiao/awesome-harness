#!/usr/bin/env node
/**
 * 修复重复的项目 id
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 检查重复的 id
const idMap = {};
const duplicates = [];

projects.forEach((p, index) => {
  if (idMap[p.id]) {
    duplicates.push({ id: p.id, indices: [idMap[p.id], index] });
  } else {
    idMap[p.id] = index;
  }
});

console.log('发现重复 id:', duplicates.map(d => d.id).join(', ') || '无');

// 修复重复的 id
duplicates.forEach(({ id, indices }) => {
  indices.forEach((idx, i) => {
    const project = projects[idx];
    const oldId = project.id;
    // 使用 company-name 格式生成新 id
    const companyPrefix = project.company.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newId = `${companyPrefix}-${project.name}`;
    project.id = newId;
    console.log(`  修复: ${oldId} -> ${newId} (${project.company}/${project.name})`);
  });
});

// 保存
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf-8');
console.log('\n✅ 修复完成！');

// 再次检查
const newIdMap = {};
const newDuplicates = [];
projects.forEach((p, index) => {
  if (newIdMap[p.id]) {
    newDuplicates.push(p.id);
  } else {
    newIdMap[p.id] = index;
  }
});

if (newDuplicates.length === 0) {
  console.log('✅ 所有项目 id 现在都是唯一的');
} else {
  console.log('⚠️ 还有重复:', newDuplicates);
}
