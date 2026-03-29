#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chineseCompanies = {
  'volcengine': '字节跳动',
  'larksuite': '字节跳动',
  'bytedance': '字节跳动',
  'Tencent': '腾讯',
  'tencent': '腾讯',
  'alibaba': '阿里巴巴',
  'Alibaba': '阿里巴巴',
  'ant-design': '阿里巴巴',
  'baidu': '百度',
  'Baidu': '百度',
  'PaddlePaddle': '百度',
  'meituan': '美团',
  'Meituan': '美团',
  'dianping': '美团',
  'jd': '京东',
  'JD': '京东',
  'NervJS': '京东',
  'xiaohongshu': '小红书',
  'xiaohongshu-mcp': '小红书',
  'THUDM': '智谱 AI',
  'ZhipuAI': '智谱 AI',
  'DeepLink-org': '深度好奇',
  'infiniflow': '深度好奇',
  'deepseek-ai': 'DeepSeek',
  'deepseek': 'DeepSeek'
};

const companyLogos = {
  '字节跳动': 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkul/1656335419611-4c319630-0582-4a9d-ba3f-55874735e16d.png',
  '腾讯': 'https://img12.360buyimg.com/imagetools/jfs/t1/208024/33/25335/101057/647d2253F801c8370/8c29978d40880863.png',
  '阿里巴巴': 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  '百度': 'https://echarts.apache.org/images/echarts-logo.png',
  '美团': 'https://github.com/Meituan-Dianping/mpvue/raw/master/assets/logo.png',
  '京东': 'https://img12.360buyimg.com/imagetools/jfs/t1/208024/33/25335/101057/647d2253F801c8370/8c29978d40880863.png',
  '小红书': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Xiaohongshu_logo.svg/200px-Xiaohongshu_logo.svg.png',
  '智谱 AI': 'https://raw.githubusercontent.com/THUDM/ChatGLM3/main/resources/logo.png',
  'DeepSeek': 'https://avatars.githubusercontent.com/u/153539785?s=200&v=4',
  '深度好奇': 'https://avatars.githubusercontent.com/u/76691925?s=200&v=4'
};

function categorizeProject(name, description, owner) {
  const lowerName = name.toLowerCase();
  const lowerDesc = (description || '').toLowerCase();
  const lowerOwner = owner.toLowerCase();

  if (lowerName.includes('llm') || lowerName.includes('glm') || lowerName.includes('qwen') || 
      lowerName.includes('deepseek') || lowerName.includes('ernie') || lowerName.includes('doubao') ||
      lowerDesc.includes('大模型') || lowerDesc.includes('language model')) {
    return 'ai-model';
  }

  if (lowerName.includes('inference') || lowerName.includes('vllm') || lowerName.includes('lightllm') ||
      lowerName.includes('llama') || lowerDesc.includes('推理')) {
    return 'ai-infra';
  }

  if (lowerName.includes('paddle') || lowerName.includes('framework') || lowerName.includes('deep learning')) {
    return 'ai-framework';
  }

  if (lowerName.includes('nlp') || lowerName.includes('text') || lowerName.includes('sentence')) {
    return 'ai-nlp';
  }

  if (lowerName.includes('cv') || lowerName.includes('vision') || lowerName.includes('image') ||
      lowerName.includes('yolo') || lowerName.includes('优图')) {
    return 'ai-cv';
  }

  if (lowerName.includes('multimodal') || lowerName.includes('cogview') || 
      lowerName.includes('文生图') || lowerName.includes('image generation')) {
    return 'ai-multimodal';
  }

  if (lowerName.includes('rag') || lowerName.includes('weknora')) {
    return 'ai-app';
  }

  if (lowerName.includes('cli') || lowerName.includes('tool') || lowerName.includes('lark') ||
      lowerName.includes('feishu')) {
    return 'tools';
  }

  if (lowerName.includes('vue') || lowerName.includes('react') || lowerName.includes('ant') ||
      lowerName.includes('element') || lowerName.includes('vant') || lowerName.includes('arco')) {
    return 'frontend';
  }

  return 'ai-app';
}

async function fetchStarredProjects() {
  console.log('正在获取你 star 过的项目...');
  
  try {
    const { stdout } = await execAsync('gh api user/starred --paginate');
    const projects = JSON.parse(stdout);
    
    console.log(`共获取到 ${projects.length} 个 star 项目`);
    
    const chineseProjects = projects.filter(project => {
      const owner = project.owner.login;
      const fullName = project.full_name.toLowerCase();
      
      for (const [key, company] of Object.entries(chineseCompanies)) {
        if (fullName.includes(key.toLowerCase()) || owner.toLowerCase() === key.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
    
    console.log(`筛选出 ${chineseProjects.length} 个中国大厂项目`);
    
    return chineseProjects.map(project => {
      const owner = project.owner.login;
      let company = '其他';
      
      for (const [key, comp] of Object.entries(chineseCompanies)) {
        if (project.full_name.toLowerCase().includes(key.toLowerCase()) || owner.toLowerCase() === key.toLowerCase()) {
          company = comp;
          break;
        }
      }
      
      return {
        id: project.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: project.name,
        company: company,
        companyLogo: companyLogos[company] || '',
        description: project.description || '',
        github: project.html_url,
        stars: project.stargazers_count,
        language: project.language || 'Unknown',
        tags: [
          project.language,
          ...(project.topics || []).slice(0, 3)
        ].filter(Boolean),
        category: categorizeProject(project.name, project.description, owner),
        install: {},
        usage: '',
        chineseDescription: project.description || ''
      };
    });
    
  } catch (error) {
    console.error('获取 star 项目失败:', error.message);
    return [];
  }
}

async function main() {
  const newProjects = await fetchStarredProjects();
  
  if (newProjects.length === 0) {
    console.log('没有找到新的中国大厂项目');
    return;
  }
  
  const existingProjectsPath = path.join(__dirname, '../src/data/projects.json');
  let existingProjects = [];
  
  if (fs.existsSync(existingProjectsPath)) {
    existingProjects = JSON.parse(fs.readFileSync(existingProjectsPath, 'utf-8'));
  }
  
  const existingIds = new Set(existingProjects.map(p => p.id));
  const mergedProjects = [...existingProjects];
  
  for (const project of newProjects) {
    if (!existingIds.has(project.id)) {
      console.log(`添加新项目: ${project.name} (${project.company})`);
      mergedProjects.push(project);
    } else {
      console.log(`跳过已存在项目: ${project.name}`);
    }
  }
  
  mergedProjects.sort((a, b) => b.stars - a.stars);
  
  fs.writeFileSync(existingProjectsPath, JSON.stringify(mergedProjects, null, 2));
  console.log(`\n✅ 已更新项目列表，共 ${mergedProjects.length} 个项目`);
}

main().catch(console.error);
