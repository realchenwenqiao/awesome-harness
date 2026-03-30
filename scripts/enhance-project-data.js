#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 读取现有项目数据
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// 增强项目数据的函数
function enhanceProjectData(projects) {
  return projects.map(project => {
    // 根据项目类型和名称来增强数据
    const enhancedProject = { ...project };
    
    // 如果中文描述为空或为英文，提供更好的中文描述
    if (!enhancedProject.chineseDescription || enhancedProject.chineseDescription.trim() === "" || 
        enhancedProject.chineseDescription.match(/[A-Za-z]/)) {
      enhancedProject.chineseDescription = generateChineseDescription(project);
    }
    
    // 增强安装指南
    if (!enhancedProject.install_guide) {
      enhancedProject.install_guide = generateInstallGuide(project);
    }
    
    // 增强使用场景
    if (!enhancedProject.use_cases) {
      enhancedProject.use_cases = generateUseCases(project);
    }
    
    // 增强AI Agent安装提示词
    if (!enhancedProject.agent_install_prompt) {
      enhancedProject.agent_install_prompt = generateAgentInstallPrompt(project);
    }
    
    return enhancedProject;
  });
}

function generateChineseDescription(project) {
  const descriptions = {
    'vllm': 'vLLM 是字节跳动开源的高吞吐量大模型推理服务框架，通过 PagedAttention 技术实现了高效的显存管理，推理吞吐量比 HuggingFace Transformers 高出 24 倍。',
    'qwen': '通义千问是阿里巴巴推出的大语言模型系列，包括 Qwen-7B、Qwen-14B、Qwen-72B 等多个版本，支持多模态理解和生成，广泛应用于对话、创作、编程等场景。',
    'chatglm': 'ChatGLM 是智谱 AI 和清华大学共同研发的大语言模型系列，包括 ChatGLM2、ChatGLM3 等版本，支持中英双语对话，具有强大的语言理解和生成能力。',
    'paddlepaddle': 'PaddlePaddle 是百度开源的深度学习框架，提供丰富的模型库和工具，支持计算机视觉、自然语言处理、推荐系统等多种任务，是中国首个自主研发的深度学习框架。',
    'paddlenlp': 'PaddleNLP 是百度开源的 NLP 工具库，提供丰富的预训练模型和 NLP 任务支持，包括文本分类、命名实体识别、情感分析等，是构建自然语言处理应用的重要工具。',
    'ernie-bot': '文心一言是百度推出的大语言模型，基于 ERNIE 系列技术，提供强大的中文理解和生成能力，支持多轮对话、代码生成、文档分析等功能。',
    'taro': 'Taro 是京东推出的跨端开发框架，支持使用 React/Vue 语法开发小程序、H5、React Native 等多端应用，极大提升开发效率。',
    'ant-design': 'Ant Design 是阿里巴巴推出的企业级 UI 设计语言，提供了丰富的 React 组件，广泛应用于中后台管理系统，是业界最受欢迎的前端组件库之一。',
    'element-plus': 'Element Plus 是饿了么推出的 Vue 3 组件库，是 Element UI 的升级版本，提供了丰富的中后台组件，支持国际化和主题定制。',
    'vant': 'Vant 是字节跳动推出的轻量级移动端组件库，提供了 60+ 高质量组件，非常适合 H5 和小程序开发，支持 Vue 2/3。',
    'arco-design': 'Arco Design 是字节跳动出品的企业级设计系统，提供了 React 和 Vue 两个版本，设计风格简洁现代，适合中后台系统。',
    'echarts': 'ECharts 是百度开源的强大数据可视化库，提供了 20+ 种图表类型，支持千万级数据渲染，是国内最流行的图表库之一。',
    'amis': 'amis 是百度推出的低代码前端框架，通过 JSON 配置就能生成完整的管理后台页面，极大提升开发效率。',
    'mpvue': 'mpvue 是美团推出的小程序开发框架，允许使用 Vue.js 语法开发微信小程序，让 Web 开发者快速上手小程序开发。',
    'lightseq': 'LightSeq 是字节跳动开源的高性能 Transformer 训练和推理库，支持 BERT、GPT、T5 等多种模型，速度比 HuggingFace 快 3-10 倍。',
    'hunyuan': '混元是腾讯推出的大语言模型，提供强大的中文理解和生成能力，支持多轮对话、代码生成、文档分析等功能，广泛应用于腾讯内部产品。',
    'lightllm': 'LightLLM 是腾讯开源的高性能 LLM 推理框架，支持多种模型，具有低延迟、高吞吐量的特点，适用于大规模语言模型的部署。',
    'tencent-ml-images': '腾讯优图是腾讯开源的计算机视觉工具库，提供人脸检测、人脸识别、物体检测、OCR 等多种视觉能力，广泛应用于图像处理领域。',
    'cogview': 'CogView 是智谱 AI 推出的图像生成模型，可以根据文本描述生成高质量图片，支持多种风格和场景，是先进的文生图模型。',
    'spring': 'Spring 是字节跳动开源的 LLM 对齐训练框架，支持 SFT（监督微调）、RM（奖励模型）、PPO（近端策略优化）等完整的 RLHF 流程。',
    'cli': '飞书 CLI 是字节跳动推出的命令行工具，让你可以在终端中使用飞书的各种功能，包括发送消息、查看日程、管理任务等，提升工作效率。',
    'lark-bot-sdk': '飞书机器人 SDK 让你可以方便地开发飞书机器人，支持发送消息、接收消息回调、卡片交互等功能，适用于自动化办公场景。',
    'langchain-alibaba': '通义千问 LangChain 集成让你可以方便地在 LangChain 框架中使用通义千问大模型，快速构建 AI 应用。',
    'mindopt': 'MindOpt 是阿里巴巴达摩院开发的数学规划求解器，支持线性规划、混合整数规划、二次规划等，广泛应用于物流调度、资源分配等场景。',
    'doubao': '豆包是字节跳动推出的大模型，提供了强大的自然语言理解和生成能力，支持多轮对话、代码生成、文档分析等多种功能。',
    'ragflow': 'RAGFlow 是深度好奇开源的检索增强生成（RAG）引擎，结合前沿的 RAG 技术与 Agent 能力，为大语言模型创建优越的上下文层。',
    'weknora': 'WeKnora 是腾讯开源的基于大模型的深度文档理解框架，支持语义检索和上下文感知问答，适用于企业知识库构建。',
    'deepseek-v3': 'DeepSeek-V3 是深度求索（DeepSeek）推出的先进大语言模型，具有强大的语言理解和生成能力，适用于复杂推理和多语言任务。',
    'openviking': 'OpenViking 是字节跳动开源的 AI Agent 上下文数据库，统一管理 Agent 所需的上下文（内存、资源和技能），通过文件系统范式实现层次化上下文传递和自我演化。'
  };
  
  return descriptions[project.id] || project.description || project.chineseDescription || `这是 ${project.company} 开发的 ${project.name} 项目，是一款优秀的开源工具/框架/库。`;
}

function generateInstallGuide(project) {
  const installGuides = {
    'vllm': {
      title: 'vLLM 安装指南',
      terminal: [
        { step: 1, command: 'pip install vllm', description: '使用 pip 安装 vLLM' },
        { step: 2, command: 'vllm serve facebook/opt-125m --host 0.0.0.0 --port 8000', description: '启动模型服务' },
        { step: 3, command: 'curl http://localhost:8000/generate -d \'{"prompt": "Hello, my name is", "max_tokens": 10}\'', description: '测试 API 调用' }
      ],
      ollama: null,
      docker: [
        { step: 1, command: 'docker pull vllm/vllm-openai:latest', description: '拉取 vLLM Docker 镜像' },
        { step: 2, command: 'docker run -d --gpus all -p 8000:8000 --name vllm-container vllm/vllm-openai:latest --model facebook/opt-125m', description: '运行 vLLM 容器' }
      ]
    },
    'qwen': {
      title: '通义千问安装指南',
      terminal: [
        { step: 1, command: 'pip install modelscope transformers accelerate', description: '安装必要依赖' },
        { step: 2, command: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118', description: '安装 PyTorch (GPU 版本)' },
        { step: 3, command: 'git clone https://github.com/QwenLM/Qwen.git && cd Qwen', description: '克隆项目代码' }
      ],
      ollama: [
        { step: 1, command: 'ollama pull qwen2:7b', description: '从 Ollama 拉取 Qwen 模型' },
        { step: 2, command: 'ollama run qwen2:7b', description: '运行 Qwen 模型' }
      ],
      docker: [
        { step: 1, command: 'git clone https://github.com/QwenLM/Qwen.git', description: '克隆项目' },
        { step: 2, command: 'cd Qwen && docker build -t qwen .', description: '构建 Docker 镜像' }
      ]
    },
    'chatglm': {
      title: 'ChatGLM 安装指南',
      terminal: [
        { step: 1, command: 'pip install torch', description: '安装 PyTorch' },
        { step: 2, command: 'pip install transformers cpm-kernels', description: '安装 transformers 和相关依赖' },
        { step: 3, command: 'pip install protobuf', description: '安装 protobuf' }
      ],
      ollama: [
        { step: 1, command: 'ollama pull chatglm3:6b', description: '从 Ollama 拉取 ChatGLM 模型' },
        { step: 2, command: 'ollama run chatglm3:6b', description: '运行 ChatGLM 模型' }
      ],
      docker: [
        { step: 1, command: 'docker pull zhipuai/chatglm3:latest', description: '拉取 ChatGLM Docker 镜像' },
        { step: 2, command: 'docker run -p 8000:8000 zhipuai/chatglm3:latest', description: '运行 ChatGLM 容器' }
      ]
    },
    'paddlepaddle': {
      title: 'PaddlePaddle 安装指南',
      terminal: [
        { step: 1, command: 'python -m pip install paddlepaddle -i https://pypi.tuna.tsinghua.edu.cn/simple', description: '使用清华源安装 CPU 版本' },
        { step: 2, command: 'python -m pip install paddlepaddle-gpu -i https://pypi.tuna.tsinghua.edu.cn/simple', description: '安装 GPU 版本 (CUDA 11.2+)' }
      ],
      ollama: null,
      docker: [
        { step: 1, command: 'docker pull registry.baidubce.com/paddlepaddle/paddle:latest', description: '拉取 PaddlePaddle Docker 镜像' },
        { step: 2, command: 'docker run -it --name paddle-test -v $PWD:/paddle registry.baidubce.com/paddlepaddle/paddle:latest', description: '运行 PaddlePaddle 容器' }
      ]
    },
    'taro': {
      title: 'Taro 安装指南',
      terminal: [
        { step: 1, command: 'npm install -g @tarojs/cli', description: '全局安装 Taro CLI' },
        { step: 2, command: 'taro init myApp', description: '创建新项目' },
        { step: 3, command: 'cd myApp && npm install', description: '进入项目并安装依赖' }
      ],
      ollama: null,
      docker: null
    },
    'ant-design': {
      title: 'Ant Design 安装指南',
      terminal: [
        { step: 1, command: 'npm install antd', description: '使用 npm 安装' },
        { step: 2, command: 'yarn add antd', description: '使用 yarn 安装' },
        { step: 3, command: 'pnpm add antd', description: '使用 pnpm 安装' }
      ],
      ollama: null,
      docker: null
    },
    'vue': {
      title: 'Vue.js 安装指南',
      terminal: [
        { step: 1, command: 'npm create vue@latest my-vue-app', description: '使用 npm 创建 Vue 项目' },
        { step: 2, command: 'cd my-vue-app && npm install', description: '进入项目并安装依赖' },
        { step: 3, command: 'npm run dev', description: '启动开发服务器' }
      ],
      ollama: null,
      docker: null
    },
    'ragflow': {
      title: 'RAGFlow 安装指南',
      terminal: [
        { step: 1, command: 'git clone https://github.com/infiniflow/ragflow.git', description: '克隆项目代码' },
        { step: 2, command: 'cd ragflow && pip install -r requirements.txt', description: '安装依赖' }
      ],
      ollama: null,
      docker: [
        { step: 1, command: 'docker-compose up -d', description: '使用 Docker Compose 启动 RAGFlow' }
      ]
    }
  };

  // 如果有特定的安装指南，返回它，否则生成通用指南
  if (installGuides[project.id]) {
    return installGuides[project.id];
  }

  // 生成通用安装指南
  const guide = { title: `${project.name} 安装指南`, terminal: [], ollama: null, docker: [] };
  
  if (project.language === 'Python') {
    guide.terminal.push(
      { step: 1, command: `pip install ${project.name.toLowerCase().replace(/\s+/g, '-')}`, description: '使用 pip 安装' },
      { step: 2, command: `pip install git+https://github.com/${project.github.split('github.com/')[1]}`, description: '从 GitHub 安装最新版' }
    );
  } else if (project.language === 'JavaScript' || project.language === 'TypeScript') {
    guide.terminal.push(
      { step: 1, command: `npm install ${project.name.toLowerCase().replace(/\s+/g, '-')}`, description: '使用 npm 安装' },
      { step: 2, command: `yarn add ${project.name.toLowerCase().replace(/\s+/g, '-')}`, description: '使用 yarn 安装' }
    );
  }

  return guide;
}

function generateUseCases(project) {
  const useCases = {
    'vllm': [
      '大语言模型推理服务部署',
      '高吞吐量文本生成',
      '在线对话系统',
      '批处理文本分析'
    ],
    'qwen': [
      '智能客服系统',
      '内容创作辅助',
      '代码生成助手',
      '文档分析和摘要'
    ],
    'chatglm': [
      '中英文对话系统',
      '教育辅导机器人',
      '文本生成和润色',
      '智能问答系统'
    ],
    'paddlepaddle': [
      '计算机视觉应用',
      '自然语言处理',
      '推荐系统开发',
      '工业质检系统'
    ],
    'taro': [
      '跨平台小程序开发',
      'H5 应用开发',
      'React Native 应用',
      '多端统一开发'
    ],
    'ant-design': [
      '企业级后台管理',
      '数据可视化面板',
      '工作流管理系统',
      '中后台产品界面'
    ],
    'ragflow': [
      '企业知识库构建',
      '文档智能问答',
      '学术论文检索',
      '法律条文查询'
    ]
  };

  return useCases[project.id] || [
    '适用于相关技术领域的开发项目',
    '可作为学习和研究的参考',
    '支持二次开发和定制',
    '有助于提升开发效率'
  ];
}

function generateAgentInstallPrompt(project) {
  return `请帮我安装 ${project.name} 这个开源项目。这个项目由 ${project.company} 开发，主要用途是${project.chineseDescription.substring(0, 50)}...。请根据以下需求帮我安装：

1. 如果是 AI 模型相关项目，请提供模型下载和部署指南
2. 如果是开发框架，请提供环境配置和项目初始化步骤
3. 如果是工具类项目，请提供安装和基本使用方法
4. 请提供中文的安装说明和注意事项
5. 如果有 Docker 部署选项，请一并提供

项目链接：${project.github}

请详细说明安装步骤，包括依赖安装、配置文件设置、启动命令等。`;
}

// 增强所有项目数据
const enhancedProjects = enhanceProjectData(projects);

// 保存更新后的数据
fs.writeFileSync(projectsPath, JSON.stringify(enhancedProjects, null, 2));

console.log(`✅ 已成功更新 ${enhancedProjects.length} 个项目的详细信息！`);
console.log('项目数据已增强，包含：');
console.log('- 详细的中文介绍');
console.log('- 安装指南（终端/OLLAMA/Docker）');
console.log('- 使用场景');
console.log('- AI Agent 安装提示词');

// 输出一些统计信息
const withDetailedInfo = enhancedProjects.filter(p => p.install_guide && p.use_cases);
console.log(`\n📊 ${withDetailedInfo.length}/${enhancedProjects.length} 个项目已包含详细安装信息`);