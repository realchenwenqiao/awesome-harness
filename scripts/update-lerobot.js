#!/usr/bin/env node
/**
 * 更新 lerobot 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'lerobot');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
LeRobot is Hugging Face's PyTorch library for real-world robotics. With 22k+ stars, it provides models, datasets, and tools that lower the barrier to entry for robotics, enabling everyone to contribute to and benefit from shared datasets and pretrained models.

**Problem it solves**
Robotics research suffers from data fragmentation, hardware-specific implementations, and lack of standardized tools. LeRobot solves this by providing a hardware-agnostic, Python-native interface that standardizes control across diverse platforms—from low-cost arms to humanoids—along with a unified dataset format and pretrained policies.

**Core capabilities**
- **Hardware-Agnostic Control**: Unified Robot class interface decouples control logic from hardware specifics. Supports SO100, LeKiwi, Koch, Reachy2, Unitree G1, and more.
- **LeRobotDataset Format**: Standardized format (Parquet + MP4/images) hosted on Hugging Face Hub for efficient storage, streaming, and visualization of massive robotic datasets
- **State-of-the-Art Policies**: Pretrained policies that transfer to real-world including ACT, Diffusion, VQ-BeT for imitation learning; HIL-SERL, TDMPC for RL; Pi0, GR00T, SmolVLA for VLA models
- **Teleoperation Support**: Gamepads, keyboards, phones for data collection
- **Training Pipeline**: Simple CLI for training policies with configuration files
- **Evaluation Framework**: Unified evaluation on benchmarks like LIBERO, MetaWorld
- **Visualization Tools**: Built-in tools for inspecting training and visualizing datasets
- **Extensible**: Easy to add custom robots, policies, and environments

**Key advantages**
- **Hugging Face Official**: Backed by the leading ML platform with HF Hub integration
- **Hardware Agnostic**: Works with diverse robots from $500 arms to humanoids
- **Real-World Ready**: Policies proven to transfer from simulation to physical robots
- **Open Ecosystem**: Thousands of datasets on HF Hub, community contributions
- **Comprehensive**: Covers full pipeline—data collection, training, deployment
- **Democratizes Physical AI**: Lowers barrier for robotics research and development
- **Active Community**: Discord support, regular updates, Chinese tutorials available`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
LeRobot 是 Hugging Face 用于真实世界机器人的 PyTorch 库。拥有 22k+ Star，它提供模型、数据集和工具，降低机器人技术的入门门槛，让每个人都能为共享数据集和预训练模型做出贡献并从中受益。

**解决的核心问题**
机器人研究面临数据碎片化、硬件特定实现和缺乏标准化工具的问题。LeRobot 通过提供硬件无关的 Python 原生接口来解决这一问题，该接口在从低成本机械臂到人形机器人的多样化平台上标准化控制，并提供统一的数据集格式和预训练策略。

**核心功能**
- **硬件无关控制**：统一的 Robot 类接口将控制逻辑与硬件细节解耦。支持 SO100、LeKiwi、Koch、Reachy2、Unitree G1 等。
- **LeRobotDataset 格式**：标准化格式（Parquet + MP4/图像）托管在 Hugging Face Hub 上，用于大规模机器人数据集的高效存储、流式传输和可视化
- **最先进策略**：可迁移到真实世界的预训练策略，包括用于模仿学习的 ACT、Diffusion、VQ-BeT；用于 RL 的 HIL-SERL、TDMPC；用于 VLA 模型的 Pi0、GR00T、SmolVLA
- **遥操作支持**：用于数据采集的游戏手柄、键盘、手机
- **训练管道**：使用配置文件训练策略的简单 CLI
- **评估框架**：在 LIBERO、MetaWorld 等基准上进行统一评估
- **可视化工具**：用于检查训练和可视化数据集的内置工具
- **可扩展**：易于添加自定义机器人、策略和环境

**技术优势**
- **Hugging Face 官方**：由领先 ML 平台支持，集成 HF Hub
- **硬件无关**：适用于从 500 美元机械臂到人形机器人的多样化机器人
- **真实世界就绪**：经证明可从模拟迁移到物理机器人的策略
- **开放生态**：HF Hub 上的数千个数据集，社区贡献
- **全面覆盖**：涵盖完整管道——数据采集、训练、部署
- **民主化物理 AI**：降低机器人研究和开发的门槛
- **活跃社区**：Discord 支持，定期更新，提供中文教程`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ lerobot 已更新（英文+中文）');
}
