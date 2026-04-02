#!/usr/bin/env node
/**
 * 更新 chroma 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'chroma');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
Chroma is the open-source embedding database and vector search infrastructure for AI applications. With 27k+ stars, it provides a simple, developer-friendly API for storing embeddings and performing semantic search, hybrid search, and full-text search.

**Problem it solves**
Adding semantic search and retrieval capabilities to AI applications traditionally requires complex infrastructure setup—managing vector indices, embedding models, and search algorithms. Chroma solves this by providing a simple 4-function API that handles tokenization, embedding, and indexing automatically.

**Core capabilities**
- **Simple API**: Only 4 core functions—create_collection, add, query, and get. Minimal learning curve for developers.
- **Automatic Embeddings**: Handles tokenization, embedding, and indexing automatically. Supports custom embeddings if needed.
- **Multiple Modes**: In-memory for prototyping, persistent storage for production, and client-server mode for distributed deployments.
- **Metadata Filtering**: Filter search results by metadata fields for precise retrieval.
- **Document Filtering**: Query with document content filters using operators like $contains.
- **Multi-Language**: Native Python and JavaScript/TypeScript clients.
- **Vector + Hybrid + Full-Text**: Supports semantic search, hybrid search combining vector and keyword, and full-text search.
- **Cloud Offering**: Chroma Cloud provides serverless, scalable vector search with $5 free credits.

**Key advantages**
- **Developer Friendly**: Simplest API among vector databases—get started in minutes
- **Automatic Processing**: No need to manage embedding models or tokenization
- **Flexible Deployment**: From in-memory prototyping to production client-server setups
- **Cost Effective**: Open-source with generous free tier; cloud offering is cost-competitive
- **Active Development**: Weekly releases, active Discord community, responsive maintainers
- **RAG Ready**: Perfect for retrieval-augmented generation applications
- **Filtering**: Rich metadata and document filtering for precise results`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
Chroma 是面向 AI 应用的开源嵌入数据库和向量搜索基础设施。拥有 27k+ Star，它为存储嵌入和执行语义搜索、混合搜索和全文搜索提供简单、开发者友好的 API。

**解决的核心问题**
为 AI 应用添加语义搜索和检索能力传统上需要复杂的基础设施设置——管理向量索引、嵌入模型和搜索算法。Chroma 通过提供简单的 4 函数 API 来解决这一问题，自动处理分词、嵌入和索引。

**核心功能**
- **简单 API**：仅 4 个核心函数——create_collection、add、query 和 get。开发者学习曲线极低。
- **自动嵌入**：自动处理分词、嵌入和索引。如需要支持自定义嵌入。
- **多种模式**：内存模式用于原型设计，持久存储用于生产，客户端-服务器模式用于分布式部署。
- **元数据过滤**：按元数据字段过滤搜索结果以实现精确检索。
- **文档过滤**：使用 $contains 等运算符通过文档内容过滤器查询。
- **多语言**：原生 Python 和 JavaScript/TypeScript 客户端。
- **向量 + 混合 + 全文**：支持语义搜索、结合向量和关键字的混合搜索以及全文搜索。
- **云服务**：Chroma Cloud 提供无服务器、可扩展的向量搜索，含 $5 免费额度。

**技术优势**
- **开发者友好**：向量数据库中最简单的 API——几分钟即可上手
- **自动处理**：无需管理嵌入模型或分词
- **灵活部署**：从内存原型设计到生产客户端-服务器设置
- **成本效益**：开源且有慷慨的免费层；云服务具有成本竞争力
- **活跃开发**：每周发布，活跃的 Discord 社区，响应迅速的维护者
- **RAG 就绪**：完美适用于检索增强生成应用
- **过滤功能**：丰富的元数据和文档过滤以实现精确结果`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ chroma 已更新（英文+中文）');
}
