<template>
  <div class="lang-scope">
    <div class="nav-bar">
      <button class="arrow" :disabled="current === 0" @click="current--">◀</button>
      <div class="tabs">
        <button
          v-for="(lang, i) in langs"
          :key="lang.id"
          class="tab"
          :class="{ active: current === i }"
          @click="current = i"
        >{{ lang.icon }} {{ lang.name }}</button>
      </div>
      <button class="arrow" :disabled="current === langs.length - 1" @click="current++">▶</button>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="lang-icon">{{ langs[current].icon }}</span>
        <div>
          <div class="lang-name">{{ langs[current].name }}</div>
          <div class="lang-desc">{{ langs[current].tagline }}</div>
        </div>
        <span class="dir-count">{{ langs[current].dirs.length }} 个方向</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:18%">应用方向</th>
              <th style="width:46%">细分示例与说明</th>
              <th style="width:36%">典型应用 / 程序</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in langs[current].dirs" :key="d.dir">
              <td class="dir-cell">{{ d.dir }}</td>
              <td>{{ d.detail }}</td>
              <td class="apps-cell"><span v-for="a in d.apps" :key="a" class="app-tag">{{ a }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)
const langs = [
  {
    id: 'java', icon: '☕', name: 'Java',
    tagline: '企业级常青树 · JVM 生态 · 强类型 · 大数据基石',
    dirs: [
      { dir: '企业级 Web 后端', detail: 'Spring Boot / Spring Cloud 微服务；MyBatis/JPA 数据访问；Spring Security 认证授权', apps: ['淘宝核心系统', 'Spring Boot 项目', '银行网银系统'] },
      { dir: '大数据处理', detail: 'Hadoop MapReduce 批处理；Spark 流/批计算；Flink 实时流处理；Hive 数据仓库', apps: ['Hadoop', 'Spark', 'Flink', 'Hive'] },
      { dir: '中间件开发', detail: '消息队列（Kafka/RocketMQ）；RPC 框架（Dubbo）；注册中心（Nacos/Zookeeper）', apps: ['Kafka', 'RocketMQ', 'Dubbo', 'Nacos'] },
      { dir: '搜索引擎', detail: 'Elasticsearch 全文检索；Lucene 底层索引；Solr 企业搜索', apps: ['Elasticsearch', 'Lucene', 'Solr'] },
      { dir: '金融交易系统', detail: '低延迟撮合引擎；风控规则引擎；清算结算系统', apps: ['LMAX Exchange', '蚂蚁金服核心'] },
      { dir: 'Android 应用', detail: 'Android SDK 原生开发；Jetpack 组件库；与 Kotlin 混合开发', apps: ['企业内部 App', 'Android SDK'] },
      { dir: '构建与 DevOps', detail: 'Maven/Gradle 构建；Jenkins CI/CD；SonarQube 代码质量', apps: ['Maven', 'Gradle', 'Jenkins'] },
      { dir: '桌面应用', detail: 'JavaFX 桌面 GUI；Swing 遗留系统；跨平台工具', apps: ['IntelliJ IDEA', 'Eclipse', 'DBeaver'] }
    ]
  },
  {
    id: 'nodejs', icon: '💚', name: 'Node.js',
    tagline: 'JavaScript 全栈 · 事件驱动 · npm 生态最大 · 实时通信',
    dirs: [
      { dir: 'Web API 后端', detail: 'Express/Koa/Fastify REST API；NestJS 企业级框架；tRPC 类型安全', apps: ['NestJS', 'Express API', 'Strapi CMS'] },
      { dir: '全栈框架', detail: 'Next.js App Router（React SSR）；Nuxt 3（Vue SSR）；Remix；Astro', apps: ['Next.js', 'Nuxt', 'Remix', 'T3 Stack'] },
      { dir: '实时通信', detail: 'Socket.io WebSocket；Yjs/Automerge CRDT 协同编辑；WebRTC 信令', apps: ['协作文档', '实时白板', '聊天室'] },
      { dir: 'Serverless', detail: 'Vercel Edge Functions；Cloudflare Workers；AWS Lambda Node', apps: ['Vercel Serverless', 'Cloudflare Worker'] },
      { dir: 'CLI 工具', detail: 'Commander/Yargs 参数解析；Ink 终端 UI；npx 分发', apps: ['create-react-app', 'Vercel CLI', 'eslint'] },
      { dir: 'Electron 桌面', detail: 'Electron + React/Vue 跨平台桌面；electron-builder 打包', apps: ['VS Code', 'Slack', 'Notion', 'Discord'] },
      { dir: '浏览器/编辑器插件', detail: 'Chrome Extension MV3；VS Code Extension；Obsidian Plugin', apps: ['uBlock Origin', '沉浸式翻译', 'GitLens'] },
      { dir: 'Bot 与自动化', detail: 'Telegraf（Telegram Bot）；discord.js；Slack Bolt', apps: ['grammY Bot', 'discord.js Bot'] }
    ]
  },
  {
    id: 'go', icon: '🐹', name: 'Go',
    tagline: '云原生之王 · 天然高并发 · 单二进制分发 · DevOps 基石',
    dirs: [
      { dir: '高并发 Web API', detail: 'Gin/Echo/Fiber 框架 REST API；标准库 net/http；goroutine 天然并发', apps: ['Gin API', 'Echo 微服务', 'Fiber API'] },
      { dir: '微服务架构', detail: 'gRPC + Protobuf 通信；go-zero/Kratos 框架；服务注册/链路追踪', apps: ['gRPC 微服务', 'go-zero', 'Kratos'] },
      { dir: '云原生基础设施', detail: 'Docker/K8s/Terraform/Prometheus/etcd 全是 Go；自研 K8s Operator', apps: ['Docker', 'Kubernetes', 'Terraform', 'Prometheus'] },
      { dir: 'CLI 命令行工具', detail: 'Cobra 框架；Bubble Tea TUI；编译单文件跨平台分发', apps: ['kubectl', 'gh CLI', 'lazygit', 'fzf'] },
      { dir: '网络代理与中间件', detail: '反向代理/负载均衡；API 网关；VPN/内网穿透；DNS 服务', apps: ['Caddy', 'Traefik', 'frp', 'CoreDNS'] },
      { dir: '分布式存储', detail: '分布式 KV 存储；对象存储；时序数据库', apps: ['etcd', 'MinIO', 'TiKV', 'InfluxDB'] },
      { dir: '区块链', detail: '以太坊客户端；Hyperledger Fabric；共识算法实现', apps: ['go-ethereum', 'Hyperledger Fabric'] },
      { dir: '监控与可观测', detail: 'Prometheus 指标采集；Grafana Agent；日志收集', apps: ['Prometheus', 'Grafana Agent', 'Loki'] }
    ]
  },
  {
    id: 'rust', icon: '🦀', name: 'Rust',
    tagline: '内存安全 · 零成本抽象 · C++ 现代替代 · 增长最快的系统语言',
    dirs: [
      { dir: 'Tauri 桌面应用', detail: 'Tauri 2.0 替代 Electron（体积小 10 倍+）；前端 React/Vue + 后端 Rust', apps: ['Tauri App', 'Spacedrive', 'AppFlowy'] },
      { dir: 'WebAssembly 模块', detail: 'Rust → WASM 高性能计算（图像/PDF/加密）；Web 端编解码', apps: ['Figma 渲染引擎', 'SWC', 'wasm-pack'] },
      { dir: 'CLI 命令行工具', detail: 'ripgrep/fd/bat/exa 等现代 CLI；编译为单二进制零依赖', apps: ['ripgrep', 'fd', 'bat', 'starship', 'delta'] },
      { dir: '操作系统开发', detail: 'Redox OS 微内核；Linux 6.1+ Rust 内核模块；嵌入式 RTOS', apps: ['Redox OS', 'Linux Rust 模块', 'Tock OS'] },
      { dir: '嵌入式开发', detail: 'embedded-rust 在 STM32/ESP32 固件；RTIC 实时并发框架', apps: ['embassy-rs', 'RTIC 项目', 'ESP-RS'] },
      { dir: 'Serverless / 边缘', detail: 'Cloudflare Workers Rust→WASM；Fastly Compute@Edge；冷启动极快', apps: ['Cloudflare Workers', 'Fermyon Spin', 'WasmEdge'] },
      { dir: '高性能网络工具', detail: '网络代理；反向代理/负载均衡；VPN；内网穿透；DNS', apps: ['Pingora', 'Linkerd2-proxy', 'Hickory DNS'] },
      { dir: '区块链开发', detail: 'Solana 链上程序；Substrate 框架（Polkadot）；零知识证明', apps: ['Solana', 'Substrate', 'StarkNet'] },
      { dir: 'Web 后端服务', detail: 'Actix-web / Axum 高性能 API；gRPC；低延迟金融/游戏后端', apps: ['Axum API', 'Actix-web', 'Tonic gRPC'] }
    ]
  },
  {
    id: 'csharp', icon: '🟣', name: 'C#',
    tagline: '.NET 生态 · 企业级 · Unity 游戏 · 跨平台',
    dirs: [
      { dir: '企业级 Web 后端', detail: 'ASP.NET Core Web API；Entity Framework ORM；SignalR 实时通信', apps: ['Stack Overflow', 'ASP.NET 项目'] },
      { dir: 'Unity 游戏开发', detail: 'Unity 引擎 C# 脚本；2D/3D 游戏；AR/VR 应用；游戏工具', apps: ['Unity 游戏', 'Pokemon GO', 'Beat Saber'] },
      { dir: 'Windows 桌面', detail: 'WPF/WinUI 3 桌面 GUI；WinForms 遗留系统；MAUI 跨平台', apps: ['Visual Studio', 'Paint.NET', 'Windows Terminal'] },
      { dir: 'Azure 云服务', detail: 'Azure Functions Serverless；Azure SDK；微服务（Dapr）', apps: ['Azure Functions', 'Dapr', 'Orleans'] },
      { dir: '微服务架构', detail: '.NET Aspire 云原生；gRPC 通信；MassTransit 消息总线', apps: ['.NET Aspire', 'MassTransit', 'CAP'] },
      { dir: 'Blazor Web 前端', detail: 'Blazor Server/WASM 用 C# 写前端；替代 JavaScript', apps: ['Blazor 项目', 'Radzen 组件库'] }
    ]
  },
  {
    id: 'kotlin', icon: '🟠', name: 'Kotlin',
    tagline: '现代 JVM 语言 · Android 官方 · 空安全 · 协程',
    dirs: [
      { dir: 'Android 应用', detail: 'Jetpack Compose 声明式 UI；Google 官方推荐语言', apps: ['Google App', 'Coursera', 'Pinterest'] },
      { dir: 'JVM 后端服务', detail: 'Ktor 轻量框架；Spring Boot Kotlin 支持；协程异步', apps: ['Ktor 服务', 'Spring Boot Kotlin'] },
      { dir: '跨平台开发', detail: 'Kotlin Multiplatform（KMP）共享业务逻辑 iOS/Android/Web', apps: ['KMP 项目', 'Netflix (部分)'] },
      { dir: '服务端脚本', detail: 'Kotlin Script (.kts)；Gradle 构建脚本（build.gradle.kts）', apps: ['Gradle Kotlin DSL', 'kscript'] },
      { dir: '数据处理', detail: 'Kotlin DataFrame；与 Spark/Flink Java 生态互操作', apps: ['Kotlin DataFrame', 'Spark Kotlin'] }
    ]
  },
  {
    id: 'scala', icon: '🔴', name: 'Scala',
    tagline: '大数据 JVM 之王 · 函数式+面向对象 · Spark 生态',
    dirs: [
      { dir: '大数据处理', detail: 'Spark 批/流计算；Flink Scala API；数据管道 ETL', apps: ['Apache Spark', 'Apache Flink', 'Databricks'] },
      { dir: '分布式系统', detail: 'Akka Actor 模型；Akka Cluster 集群；Akka Streams 流处理', apps: ['Akka 项目', 'Lightbend 平台'] },
      { dir: '金融系统', detail: '风险分析引擎；量化交易策略；复杂计算模型', apps: ['高盛交易系统', 'Morgan Stanley'] },
      { dir: 'Web 后端', detail: 'Play Framework 异步 Web；Scala.js 前端；http4s 函数式', apps: ['Play Framework', 'Twitter 后端', 'LinkedIn'] },
      { dir: '消息系统', detail: 'Kafka Streams 流处理；Kafka Connect 数据集成', apps: ['Apache Kafka', 'Kafka Streams'] }
    ]
  },
  {
    id: 'swift', icon: '🍎', name: 'Swift',
    tagline: 'Apple 官方语言 · 类型安全 · 高性能 · iOS/macOS 生态',
    dirs: [
      { dir: 'iOS 应用', detail: 'SwiftUI / UIKit 原生开发；Combine 响应式；WidgetKit 小组件', apps: ['所有 iOS App', 'Apple 全家桶'] },
      { dir: 'macOS 应用', detail: 'AppKit / SwiftUI 桌面；菜单栏工具；系统扩展', apps: ['Xcode', 'Swift Playgrounds'] },
      { dir: 'Web 后端', detail: 'Vapor / Hummingbird 框架；SwiftNIO 网络层', apps: ['Vapor API', 'Hummingbird 服务'] },
      { dir: '跨平台移动', detail: 'Swift on Server + iOS 共享模型层；Swift for Android（实验）', apps: ['LinkedIn (部分)', 'Airbnb (部分)'] },
      { dir: '系统编程', detail: '与 C/Obj-C 互操作；底层框架开发；驱动/内核扩展', apps: ['Apple 系统框架', 'Swift 编译器'] }
    ]
  },
  {
    id: 'ruby', icon: '💎', name: 'Ruby',
    tagline: '开发者幸福 · Rails 快速开发 · 元编程 · 优雅语法',
    dirs: [
      { dir: 'Web 全栈', detail: 'Ruby on Rails MVC；Hotwire/Turbo 现代前端；Action Cable 实时', apps: ['GitHub', 'Shopify', 'Basecamp'] },
      { dir: '快速原型 / MVP', detail: 'Rails scaffold 脚手架；ActiveRecord ORM；约定优于配置', apps: ['Airbnb 早期', 'Twitter 早期'] },
      { dir: 'API 后端', detail: 'Grape / Rails API 模式；GraphQL Ruby；Sidekiq 后台任务', apps: ['Stripe API', 'GitLab'] },
      { dir: 'DevOps 工具', detail: 'Chef/Puppet 配置管理；Vagrant 虚拟化；Homebrew 包管理', apps: ['Homebrew', 'Vagrant', 'Chef'] },
      { dir: '脚本与自动化', detail: 'Rake 任务；数据迁移脚本；文本处理', apps: ['Fastlane', 'CocoaPods', 'Jekyll'] }
    ]
  },
  {
    id: 'wasm', icon: '🔮', name: 'WebAssembly',
    tagline: '浏览器二进制格式 · 多语言编译目标 · 沙箱安全 · 接近原生性能',
    dirs: [
      { dir: '浏览器高性能计算', detail: '图像/视频处理；PDF 渲染；加密解密；科学计算', apps: ['Figma', 'Google Earth', 'Photoshop Web'] },
      { dir: '游戏引擎 Web 化', detail: 'Unity/Godot/Unreal 编译到 Web；WebGL + WASM 渲染', apps: ['Unity WebGL', 'Godot Web', 'itch.io 游戏'] },
      { dir: '开发工具链', detail: 'SWC/esbuild 编译器；SQLite WASM；语言 Playground', apps: ['SWC', 'esbuild', 'SQLite WASM'] },
      { dir: 'Serverless / 边缘', detail: 'Cloudflare Workers WASM；Fermyon Spin；Fastly Compute', apps: ['Cloudflare Workers', 'Fermyon Spin'] },
      { dir: '插件沙箱', detail: 'Envoy WASM Filter；Figma 插件；安全隔离执行第三方代码', apps: ['Envoy Proxy', 'Figma 插件', 'Extism'] }
    ]
  },
]
</script>

<style scoped>
.lang-scope { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 0.75rem; margin: 1rem 0; }
.nav-bar { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.arrow { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.8rem; }
.arrow:disabled { opacity: 0.3; cursor: not-allowed; }
.tabs { display: flex; gap: 0.25rem; overflow-x: auto; flex: 1; }
.tab { white-space: nowrap; padding: 0.25rem 0.5rem; border: 1px solid transparent; border-radius: 6px; background: none; cursor: pointer; font-size: 0.75rem; color: var(--vp-c-text-2); transition: all 0.2s; }
.tab:hover { background: var(--vp-c-bg); }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.card { background: var(--vp-c-bg); border-radius: 8px; overflow: hidden; }
.card-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--vp-c-divider); }
.lang-icon { font-size: 1.5rem; }
.lang-name { font-weight: 700; font-size: 0.95rem; }
.lang-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.dir-count { margin-left: auto; font-size: 0.75rem; color: var(--vp-c-text-3); white-space: nowrap; }
.table-wrap { overflow-x: auto; max-height: 320px; overflow-y: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
thead { position: sticky; top: 0; background: var(--vp-c-bg); z-index: 1; }
th { text-align: left; padding: 0.4rem 0.6rem; border-bottom: 2px solid var(--vp-c-divider); font-size: 0.75rem; color: var(--vp-c-text-2); }
td { padding: 0.4rem 0.6rem; border-bottom: 1px solid var(--vp-c-divider); vertical-align: top; line-height: 1.5; }
.dir-cell { font-weight: 600; white-space: nowrap; color: var(--vp-c-brand-1); }
.apps-cell { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.app-tag { display: inline-block; padding: 0.1rem 0.4rem; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.7rem; white-space: nowrap; }
</style>
