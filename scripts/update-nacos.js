#!/usr/bin/env node
/**
 * 更新 nacos 项目介绍
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const project = projects.find(p => p.name === 'nacos');
if (project) {
  // 英文介绍
  project.detailedDescription = `**Overview**
Nacos (Dynamic Naming and Configuration Service) is an easy-to-use platform designed for dynamic service discovery, configuration management, and service management. Developed by Alibaba, it helps developers build cloud-native applications and microservices platforms with 32k+ stars.

**Problem it solves**
Building cloud-native microservices requires solving complex infrastructure challenges: how do services find each other, how to manage configurations across environments, how to ensure service health. Nacos solves these by providing a unified platform for service discovery, configuration management, and service metadata management—eliminating the need for multiple separate tools.

**Core capabilities**
- **Service Discovery and Health Check**: Services register themselves and discover other services via DNS or HTTP interfaces. Real-time health checks prevent requests to unhealthy instances.
- **Dynamic Configuration Management**: Centralized, dynamic configuration management across all environments. Eliminates redeployment when configurations update, making changes efficient and agile.
- **Dynamic DNS Service**: Weighted routing for mid-tier load balancing, flexible routing policies, flow control, and DNS resolution services. Prevents vendor lock-in to specific service discovery APIs.
- **Service and Metadata Management**: Easy-to-use service dashboard for managing service metadata, configuration, Kubernetes DNS, health status, and metrics statistics.
- **Multi-Framework Support**: Works with Dubbo/gRPC services, Spring Cloud RESTful services, and Kubernetes services.
- **Cloud Deployment**: Easy deployment on cloud platforms with managed services available.

**Key advantages**
- **Production Proven**: Battle-tested at Alibaba scale, handling massive microservice ecosystems
- **Multi-Protocol**: Supports both HTTP and DNS-based service discovery
- **Real-Time Updates**: Configuration changes push to services immediately without restart
- **Health Monitoring**: Automatic health checks and traffic routing away from failed instances
- **Spring Cloud Integration**: First-class integration with Spring Cloud, Dubbo, and Kubernetes
- **Active Community**: 32k+ stars, active Gitter community, comprehensive Chinese and English documentation
- **Enterprise Ready**: Used by thousands of companies in production environments`;

  // 中文介绍
  project.chineseDescription = `**项目概述**
Nacos（动态命名和配置服务）是一个用于动态服务发现、配置管理和服务管理的易用平台。由阿里巴巴开发，拥有 32k+ Star，帮助开发者构建云原生应用和微服务平台。

**解决的核心问题**
构建云原生微服务需要解决复杂的基础设施挑战：服务如何相互发现、如何跨环境管理配置、如何确保服务健康。Nacos 通过为服务发现、配置管理和服务元数据管理提供统一平台来解决这些问题——消除了对多个单独工具的需求。

**核心功能**
- **服务发现与健康检查**：服务自行注册并通过 DNS 或 HTTP 接口发现其他服务。实时健康检查防止请求发送到不健康实例。
- **动态配置管理**：跨所有环境的集中式动态配置管理。消除配置更新时的重新部署需求，使变更高效敏捷。
- **动态 DNS 服务**：加权路由用于中间层负载均衡、灵活路由策略、流量控制和 DNS 解析服务。防止锁定到特定服务发现 API。
- **服务与元数据管理**：易于使用的服务仪表板，用于管理服务元数据、配置、Kubernetes DNS、健康状态和指标统计。
- **多框架支持**：适用于 Dubbo/gRPC 服务、Spring Cloud RESTful 服务和 Kubernetes 服务。
- **云部署**：支持在云平台轻松部署，提供托管服务。

**技术优势**
- **生产验证**：在阿里巴巴规模下久经考验，处理大规模微服务生态系统
- **多协议**：支持基于 HTTP 和 DNS 的服务发现
- **实时更新**：配置变更立即推送到服务，无需重启
- **健康监控**：自动健康检查，流量从故障实例路由出去
- **Spring Cloud 集成**：与 Spring Cloud、Dubbo 和 Kubernetes 的一流集成
- **活跃社区**：32k+ Star，活跃的 Gitter 社区，全面的中英文文档
- **企业就绪**：数千家公司在生产环境中使用`;

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('✅ nacos 已更新（英文+中文）');
}
