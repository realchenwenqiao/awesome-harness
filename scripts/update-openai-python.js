#!/usr/bin/env node
/**
 * 更新 openai-python 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'openai-python');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
The OpenAI Python library provides convenient access to the OpenAI REST API from any Python 3.9+ application. With 30k+ stars, it is the official Python SDK for OpenAI, offering type definitions for all request params and response fields, plus both synchronous and asynchronous clients powered by httpx.

**Problem it solves**
Integrating OpenAI's models into Python applications requires handling HTTP requests, parsing responses, managing API keys, and dealing with various model-specific parameters. This library abstracts all of that complexity into a clean, Pythonic interface with full type hints and async support.

**Core capabilities**
- **Official SDK**: Generated from OpenAI's OpenAPI specification with Stainless, ensuring complete API coverage
- **Type Safety**: Full type definitions for all request parameters and response fields
- **Sync & Async**: Both synchronous and asynchronous clients powered by httpx for high-performance HTTP
- **Multiple APIs**: Supports Responses API (new standard), Chat Completions API (supported indefinitely), and all other OpenAI endpoints
- **Vision Support**: Built-in support for image inputs via URLs or base64-encoded strings
- **Streaming**: Support for streaming responses for real-time applications
- **Structured Outputs**: Native support for JSON mode and function calling
- **Error Handling**: Comprehensive error types for different failure modes
- **Environment Integration**: Automatic API key loading from environment variables or .env files

**Key advantages**
- **Official**: Maintained by OpenAI, guaranteed to support latest API features
- **Type Complete**: Every parameter and response field is typed
- **Production Ready**: Used by millions of applications, battle-tested at scale
- **Async First**: Native async/await support for high-concurrency applications
- **Simple API**: Clean, intuitive interface that follows Python conventions
- **Auto-Generated**: Always in sync with the latest OpenAPI spec`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
OpenAI Python 库为任何 Python 3.9+ 应用提供了便捷的 OpenAI REST API 访问。拥有 30k+ Star，它是 OpenAI 的官方 Python SDK，为所有请求参数和响应字段提供类型定义，以及由 httpx 驱动的同步和异步客户端。

**解决的核心问题**
将 OpenAI 模型集成到 Python 应用中需要处理 HTTP 请求、解析响应、管理 API 密钥以及处理各种模型特定参数。该库将所有这些复杂性抽象到一个干净、Pythonic 的接口中，带有完整类型提示和异步支持。

**核心功能**
- **官方 SDK**：使用 Stainless 从 OpenAI 的 OpenAPI 规范生成，确保完整的 API 覆盖
- **类型安全**：所有请求参数和响应字段的完整类型定义
- **同步与异步**：由 httpx 驱动的同步和异步客户端，实现高性能 HTTP
- **多 API 支持**：支持 Responses API（新标准）、Chat Completions API（无限期支持）和所有其他 OpenAI 端点
- **视觉支持**：通过 URL 或 base64 编码字符串内置支持图像输入
- **流式传输**：支持流式响应以用于实时应用
- **结构化输出**：原生支持 JSON 模式和函数调用
- **错误处理**：针对不同故障模式的全面错误类型
- **环境集成**：从环境变量或 .env 文件自动加载 API 密钥

**技术优势**
- **官方维护**：由 OpenAI 维护，保证支持最新 API 功能
- **类型完整**：每个参数和响应字段都有类型
- **生产就绪**：被数百万应用使用，大规模久经考验
- **异步优先**：原生支持 async/await，适用于高并发应用
- **简洁 API**：遵循 Python 约定的干净、直观接口
- **自动生成**：始终与最新的 OpenAPI 规范保持同步`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ openai-python 已更新（英文+中文）');
}
