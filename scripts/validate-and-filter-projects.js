#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 中国大公司验证列表（严格版）
const verifiedChineseCompanies = {
  // 核心大厂
  '字节跳动': ['bytedance', 'volcengine', 'larksuite', 'youzan', 'vllm-project', 'modeltc', 'modeltc-lightllm'],
  '阿里巴巴': ['alibaba', 'ant-design', 'alipay', 'taobao', 'aliyun', 'qwenlm', 'alibaba-cloud-docs'],
  '腾讯': ['Tencent', 'tencent', 'WeBankFinTech', 'TencentCloudBase', 'tencentmlimages', 'modeltc'],
  '百度': ['baidu', 'PaddlePaddle', 'apache'],
  '美团': ['meituan', 'Meituan-Dianping', 'dianping'],
  '京东': ['jd', 'JD', 'NervJS'],
  '智谱 AI / 清华大学': ['THUDM', 'ZhipuAI'],
  '小红书': ['xiaohongshu', 'xpzouying'],
  'DeepSeek': ['deepseek-ai'],
  '深度好奇': ['infiniflow']
};

// AI 相关分类（保留）
const aiCategories = [
  'ai-model',        // 大模型
  'ai-infra',        // AI基础设施
  'ai-training',     // 训练框架
  'ai-nlp',          // 自然语言处理
  'ai-cv',           // 计算机视觉
  'ai-multimodal',    // 多模态
  'ai-optimization', // 优化
  'ai-framework',    // 深度学习框架
  'ai-app',          // AI应用
  'tools'            // AI相关工具
];

// 排除的非AI分类
const excludedCategories = ['frontend'];

// 公司验证函数
function verifyCompany(company, githubUrl) {
  const companyLower = company.toLowerCase();
  const githubUrlLower = githubUrl.toLowerCase();
  
  // 首先检查公司名称是否在验证列表中
  for (const [verifiedCompany, orgs] of Object.entries(verifiedChineseCompanies)) {
    if (verifiedCompany.toLowerCase().includes(companyLower) || 
        company.toLowerCase().includes(verifiedCompany.toLowerCase())) {
      // 进一步验证 GitHub 组织
      for (const org of orgs) {
        if (githubUrlLower.includes(org.toLowerCase())) {
          return { 
            verified: true, 
            verifiedCompany,
            verifiedOrganization: org 
          };
        }
      }
    }
  }
  
  return { verified: false };
}

// 验证项目是否AI相关
function isAIProject(project) {
  // 检查分类
  if (excludedCategories.includes(project.category)) {
    return false;
  }
  
  if (!aiCategories.includes(project.category) && project.category !== 'tools') {
    return false;
  }
  
  // 检查标签中是否有AI相关关键词
  const aiKeywords = [
    'ai', 'artificial', 'intelligence', 'model', 'llm', 'gpt',
    'transformer', 'nlp', 'natural', 'language', 'vision', 'cv',
    'computer', 'multimodal', 'rag', 'agent', 'robot',
    'paddle', 'deep', 'learning', 'neural', 'network',
    'chat', 'dialog', 'inference', 'training'
  ];
  
  const tagsText = project.tags.join(' ').toLowerCase();
  const descriptionText = (project.description + ' ' + project.chineseDescription).toLowerCase();
  
  // 检查是否有AI相关关键词
  const hasAIKeywords = aiKeywords.some(keyword => 
    tagsText.includes(keyword) || descriptionText.includes(keyword)
  );
  
  // 检查公司是否是AI相关公司
  const isAICompany = ['智谱 AI', 'DeepSeek', '深度好奇', '字节跳动', '阿里巴巴', '腾讯', '百度'].some(
    company => project.company.toLowerCase().includes(company.toLowerCase())
  );
  
  return hasAIKeywords || isAICompany;
}

// 主处理函数
async function validateAndFilterProjects() {
  console.log('🚀 开始严格验证和筛选项目...\n');
  
  const projectsPath = path.join(__dirname, '../src/data/projects.json');
  const originalProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
  
  console.log(`📊 原始项目总数: ${originalProjects.length}\n`);
  
  const verifiedProjects = [];
  const rejectedProjects = [];
  
  for (const project of originalProjects) {
    console.log(`🔍 验证项目: ${project.name} (${project.company})`);
    
    // 1. 验证公司
    const companyVerification = verifyCompany(project.company, project.github);
    
    if (!companyVerification.verified) {
      console.log(`  ❌ 公司未通过验证: ${project.company}`);
      rejectedProjects.push({
        ...project,
        rejectionReason: '公司未通过验证'
      });
      continue;
    }
    
    console.log(`  ✅ 公司验证通过: ${companyVerification.verifiedCompany}`);
    
    // 2. 验证是否AI相关
    if (!isAIProject(project)) {
      console.log(`  ❌ 项目非AI相关，过滤掉`);
      rejectedProjects.push({
        ...project,
        rejectionReason: '项目非AI相关'
      });
      continue;
    }
    
    console.log(`  ✅ AI相关验证通过`);
    
    // 3. 验证通过，添加到列表
    verifiedProjects.push({
      ...project,
      company: companyVerification.verifiedCompany,
      verifiedOrganization: companyVerification.verifiedOrganization
    });
    
    console.log('');
  }
  
  console.log('\n📊 筛选结果:');
  console.log(`  ✅ 验证通过: ${verifiedProjects.length} 个项目`);
  console.log(`  ❌ 被过滤: ${rejectedProjects.length} 个项目`);
  console.log('');
  
  // 保存验证通过的项目
  verifiedProjects.sort((a, b) => b.stars - a.stars);
  fs.writeFileSync(projectsPath, JSON.stringify(verifiedProjects, null, 2));
  
  // 保存被过滤的项目记录（用于调试）
  fs.writeFileSync(
    path.join(__dirname, '../src/data/rejected-projects.json'), 
    JSON.stringify(rejectedProjects, null, 2)
  );
  
  console.log('✅ 筛选完成！已更新项目列表。');
  
  // 显示验证通过的项目列表
  console.log('\n📋 验证通过的项目列表:');
  verifiedProjects.forEach((project, index) => {
    console.log(`  ${index + 1}. ${project.name} (${project.company}) - ⭐${project.stars}`);
  });
}

validateAndFilterProjects().catch(console.error);
