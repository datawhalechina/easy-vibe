<template>
  <div class="protocol-comparison-demo">
    <div class="demo-header">
      <span class="title">MCP vs A2A</span>
      <span class="subtitle">AI Agent 两大协议的定位差异</span>
    </div>

    <div class="intro-text">
      想象你在一个<span class="highlight">大型商场</span>：MCP 就像商场的"统一插座标准"，让各种电器（工具）都能插上使用；A2A 就像商场的"内部对讲系统"，让不同店铺（Agent）之间可以协作。
    </div>

    <div class="protocol-cards">
      <div class="protocol-card mcp">
        <div class="card-header">
          <span class="card-title">MCP</span>
          <span class="card-badge">工具连接</span>
        </div>
        <div class="card-fullname">Model Context Protocol</div>
        <div class="card-desc">
          AI 与外部工具、数据源的连接协议，让工具开发者写一次代码，所有 AI 应用都能用
        </div>
        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">发起方</span>
            <span class="meta-value">Anthropic</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">发布时间</span>
            <span class="meta-value">2024.11</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">架构</span>
            <span class="meta-value">Client-Server</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">数据格式</span>
            <span class="meta-value">JSON-RPC 2.0</span>
          </div>
        </div>
        <div class="card-analogy">
          <span class="analogy-label">类比</span>
          <span class="analogy-text">USB-C 接口 —— 统一各种设备的充电方式</span>
        </div>
      </div>

      <div class="protocol-card a2a">
        <div class="card-header">
          <span class="card-title">A2A</span>
          <span class="card-badge">Agent协作</span>
        </div>
        <div class="card-fullname">Agent-to-Agent Protocol</div>
        <div class="card-desc">
          Agent 之间的通信协议，让不同厂商、不同框架的 Agent 能够无缝协作
        </div>
        <div class="card-meta">
          <div class="meta-item">
            <span class="meta-label">发起方</span>
            <span class="meta-value">Google</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">发布时间</span>
            <span class="meta-value">2025.04</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">架构</span>
            <span class="meta-value">Peer-to-Peer</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">数据格式</span>
            <span class="meta-value">HTTP + JSON</span>
          </div>
        </div>
        <div class="card-analogy">
          <span class="analogy-label">类比</span>
          <span class="analogy-text">企业微信 —— 让同事之间可以发任务、聊天</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>MCP 和 A2A 不是竞争关系，而是互补关系。MCP 解决"AI 如何获取外部能力"，A2A 解决"多个 AI 如何协作"。
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.protocol-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.intro-text .highlight {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.protocol-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.protocol-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
}

.protocol-card.mcp {
  border-left: 3px solid #3b82f6;
}

.protocol-card.a2a {
  border-left: 3px solid #10b981;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.card-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: auto;
}

.protocol-card.mcp .card-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.protocol-card.a2a .card-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.card-fullname {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 0.6rem;
}

.card-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.meta-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.meta-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.card-analogy {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.analogy-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.analogy-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
  align-items: flex-start;
}

.info-box .icon {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .protocol-cards {
    grid-template-columns: 1fr;
  }
}
</style>
