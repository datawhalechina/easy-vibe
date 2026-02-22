<template>
  <div class="protocol-workflow-demo">
    <div class="demo-header">
      <span class="title">MCP + A2A 协作流程</span>
      <span class="subtitle">两者如何配合完成复杂任务</span>
    </div>

    <div class="intro-text">
      想象你要<span class="highlight">装修房子</span>：你需要设计师（主 Agent）出方案，工人（专家 Agent）施工，还要从建材市场（工具）买材料。A2A 让设计师和工人能协作，MCP 让工人能买到材料。
    </div>

    <div class="workflow-diagram">
      <div class="user-node">
        <span class="node-label">用户</span>
      </div>
      <div class="arrow">→</div>
      <div class="agent-node main">
        <span class="node-label">主 Agent</span>
        <span class="node-role">需求分析</span>
      </div>
      <div class="arrow">→</div>
      <div class="a2a-badge">
        <span class="badge-text">A2A</span>
      </div>
      <div class="agent-node expert">
        <span class="node-label">专家 Agent</span>
        <span class="node-role">执行任务</span>
      </div>
      <div class="arrow">↔</div>
      <div class="mcp-badge">
        <span class="badge-text">MCP</span>
      </div>
      <div class="tool-node">
        <span class="node-label">外部工具</span>
        <span class="node-role">API/数据库</span>
      </div>
    </div>

    <div class="flow-steps">
      <div class="flow-step">
        <span class="step-num">1</span>
        <span class="step-text">用户向主 Agent 提出需求（如"分析这个 GitHub 仓库"）</span>
      </div>
      <div class="flow-step">
        <span class="step-num">2</span>
        <span class="step-text">主 Agent 通过 <strong>A2A</strong> 委托专家 Agent 执行任务</span>
      </div>
      <div class="flow-step">
        <span class="step-num">3</span>
        <span class="step-text">专家 Agent 通过 <strong>MCP</strong> 调用外部工具获取数据</span>
      </div>
      <div class="flow-step">
        <span class="step-num">4</span>
        <span class="step-text">专家 Agent 通过 <strong>A2A</strong> 返回结果给主 Agent</span>
      </div>
      <div class="flow-step">
        <span class="step-num">5</span>
        <span class="step-text">主 Agent 汇总结果，回复用户</span>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-dot a2a"></span>
        <span class="legend-text"><strong>A2A</strong>：Agent ↔ Agent 通信</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot mcp"></span>
        <span class="legend-text"><strong>MCP</strong>：Agent ↔ 工具 通信</span>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>A2A 负责 Agent 之间的任务分配和协作，MCP 负责 Agent 与外部工具的交互，两者各司其职，互补协作。
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.protocol-workflow-demo {
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

.workflow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  overflow-x: auto;
}

.user-node,
.agent-node,
.tool-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.user-node {
  border: 1px dashed var(--vp-c-divider);
}

.agent-node.main {
  border: 2px solid var(--vp-c-brand);
  background: rgba(100, 108, 255, 0.1);
}

.agent-node.expert {
  border: 2px solid #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.tool-node {
  border: 1px solid var(--vp-c-divider);
}

.node-icon {
  font-size: 1.25rem;
}

.node-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.node-role {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

.arrow {
  color: var(--vp-c-text-3);
  font-size: 1rem;
  font-weight: bold;
}

.a2a-badge,
.mcp-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
}

.a2a-badge {
  background: rgba(16, 185, 129, 0.15);
}

.a2a-badge .badge-icon {
  font-size: 0.9rem;
}

.a2a-badge .badge-text {
  font-size: 0.6rem;
  font-weight: 700;
  color: #10b981;
}

.mcp-badge {
  background: rgba(59, 130, 246, 0.15);
}

.mcp-badge .badge-icon {
  font-size: 0.9rem;
}

.mcp-badge .badge-text {
  font-size: 0.6rem;
  font-weight: 700;
  color: #3b82f6;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
}

.step-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.step-text strong {
  color: var(--vp-c-brand);
}

.legend {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.a2a {
  background: #10b981;
}

.legend-dot.mcp {
  background: #3b82f6;
}

.legend-text {
  color: var(--vp-c-text-2);
}

.legend-text strong {
  color: var(--vp-c-text-1);
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

@media (max-width: 768px) {
  .workflow-diagram {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0.75rem;
  }

  .flow-steps {
    gap: 0.4rem;
  }

  .flow-step {
    padding: 0.3rem 0.5rem;
  }
}
</style>
