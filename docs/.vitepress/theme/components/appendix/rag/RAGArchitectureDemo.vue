<!--
  RAGArchitectureDemo.vue
  RAG 架构演进交互演示

  用途：
  展示三种 RAG 架构：Naive RAG、Advanced RAG、Modular RAG
  用户可以切换查看不同架构的流程图和特点。

  交互功能：
  - 切换三种架构
  - 查看每种架构的流程节点
  - 对比各架构的优劣
-->
<template>
  <div class="rag-arch-demo">
    <div class="arch-tabs">
      <button
        v-for="(arch, i) in architectures"
        :key="i"
        :class="['arch-tab', { active: currentArch === i }]"
        @click="currentArch = i"
      >
        <span class="tab-badge">{{ arch.badge }}</span>
        <span class="tab-name">{{ arch.name }}</span>
      </button>
    </div>

    <div class="arch-desc">
      {{ activeArch.desc }}
    </div>

    <div class="flow-diagram">
      <div
        v-for="(node, j) in activeArch.nodes"
        :key="j"
        class="flow-node-wrapper"
      >
        <div
          :class="['flow-node', node.type]"
          @click="selectedNode = selectedNode === j ? null : j"
        >
          <div class="node-icon">{{ node.icon }}</div>
          <div class="node-label">{{ node.label }}</div>
        </div>
        <div
          v-if="j < activeArch.nodes.length - 1"
          class="flow-connector"
        >
          <span class="connector-arrow">→</span>
          <span
            v-if="node.connectorLabel"
            class="connector-label"
          >{{ node.connectorLabel }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="selectedNode !== null"
      class="node-detail"
    >
      <div class="node-detail-title">
        {{ activeArch.nodes[selectedNode].icon }}
        {{ activeArch.nodes[selectedNode].label }}
      </div>
      <div class="node-detail-desc">
        {{ activeArch.nodes[selectedNode].detail }}
      </div>
    </div>
    <div
      v-else
      class="node-hint"
    >
      点击流程节点查看详细说明
    </div>

    <div class="arch-features">
      <div class="feature-title">架构特点</div>
      <div class="feature-grid">
        <div
          v-for="(f, i) in activeArch.features"
          :key="i"
          class="feature-item"
        >
          <span class="feature-icon">{{ f.icon }}</span>
          <span class="feature-text">{{ f.text }}</span>
        </div>
      </div>
    </div>

    <div class="evolution-bar">
      <div class="evo-title">架构演进路线</div>
      <div class="evo-track">
        <div
          v-for="(arch, i) in architectures"
          :key="i"
          :class="['evo-node', { active: currentArch >= i }]"
        >
          <div class="evo-dot" />
          <div class="evo-label">{{ arch.name }}</div>
          <div class="evo-year">{{ arch.year }}</div>
        </div>
        <div class="evo-line">
          <div
            class="evo-line-fill"
            :style="{ width: (currentArch / (architectures.length - 1)) * 100 + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentArch = ref(0)
const selectedNode = ref(null)

watch(currentArch, () => { selectedNode.value = null })

const architectures = [
  {
    name: 'Naive RAG',
    badge: 'v1',
    year: '2023',
    desc: '最基础的 RAG 架构，流程简单直接：索引 → 检索 → 生成。适合快速原型验证，但在复杂场景下效果有限。',
    nodes: [
      { icon: '📄', label: '文档加载', type: 'input', detail: '将原始文档（PDF、网页、数据库等）加载到系统中，进行基本的文本提取和清洗。', connectorLabel: '' },
      { icon: '✂️', label: '文本分块', type: 'process', detail: '将长文档按固定大小切分为较小的文本块（chunk），通常 200-500 个 token。', connectorLabel: '' },
      { icon: '🔢', label: '向量化', type: 'process', detail: '使用嵌入模型将每个文本块转化为向量，存入向量数据库。', connectorLabel: '' },
      { icon: '🔍', label: '检索', type: 'process', detail: '用户提问时，将问题向量化后在向量数据库中搜索最相似的文本块。', connectorLabel: '' },
      { icon: '🤖', label: '生成', type: 'output', detail: '将检索到的文本块与问题拼接为 Prompt，交给 LLM 生成回答。' }
    ],
    features: [
      { icon: '✅', text: '实现简单，上手快' },
      { icon: '✅', text: '适合结构化知识库' },
      { icon: '⚠️', text: '检索质量依赖分块策略' },
      { icon: '❌', text: '无法处理复杂查询' }
    ]
  },
  {
    name: 'Advanced RAG',
    badge: 'v2',
    year: '2024',
    desc: '在 Naive RAG 基础上增加了查询优化和检索后处理，显著提升检索质量和生成准确性。',
    nodes: [
      { icon: '💬', label: '用户查询', type: 'input', detail: '接收用户的原始问题。', connectorLabel: '' },
      { icon: '🔄', label: '查询改写', type: 'enhance', detail: '使用 LLM 对原始查询进行改写、扩展或分解。例如将模糊问题改写为更精确的检索查询，或生成多个子查询。', connectorLabel: '' },
      { icon: '🔍', label: '混合检索', type: 'process', detail: '同时使用向量检索（语义）和关键词检索（BM25），融合两者的结果，兼顾语义理解和精确匹配。', connectorLabel: '' },
      { icon: '📊', label: '重排序', type: 'enhance', detail: '使用交叉编码器对检索结果进行精细排序，过滤掉不相关的文档片段。', connectorLabel: '' },
      { icon: '📋', label: '上下文压缩', type: 'enhance', detail: '从检索到的文档中提取与问题最相关的部分，去除冗余信息，节省上下文窗口。', connectorLabel: '' },
      { icon: '🤖', label: '生成', type: 'output', detail: '基于优化后的上下文生成高质量回答。' }
    ],
    features: [
      { icon: '✅', text: '查询改写提升检索召回率' },
      { icon: '✅', text: '混合检索兼顾语义和关键词' },
      { icon: '✅', text: '重排序显著提升精度' },
      { icon: '⚠️', text: '流程较长，延迟增加' }
    ]
  },
  {
    name: 'Modular RAG',
    badge: 'v3',
    year: '2025',
    desc: '将 RAG 拆解为可插拔的模块，支持灵活组合和路由。可根据查询类型动态选择最优流程。',
    nodes: [
      { icon: '💬', label: '用户查询', type: 'input', detail: '接收用户的原始问题。', connectorLabel: '' },
      { icon: '🧭', label: '路由判断', type: 'enhance', detail: '分析查询意图，决定走哪条处理路径：简单问题直接回答，复杂问题走检索流程，多步问题走分解流程。', connectorLabel: '' },
      { icon: '🔀', label: '查询转换', type: 'enhance', detail: '根据路由结果选择：HyDE（假设文档嵌入）、Step-back（退一步提问）、子问题分解等策略。', connectorLabel: '' },
      { icon: '🔍', label: '自适应检索', type: 'process', detail: '根据查询特征自动选择检索策略：向量检索、图检索、SQL 检索或多路检索融合。', connectorLabel: '' },
      { icon: '🔄', label: '自我反思', type: 'enhance', detail: 'LLM 评估检索结果是否充分，不充分则触发二次检索或调整检索策略（Self-RAG / CRAG）。', connectorLabel: '' },
      { icon: '🤖', label: '生成', type: 'output', detail: '基于充分验证的上下文生成最终回答，并附带置信度评分。' }
    ],
    features: [
      { icon: '✅', text: '模块化设计，灵活可扩展' },
      { icon: '✅', text: '自适应路由，智能选择策略' },
      { icon: '✅', text: '自我反思机制提升可靠性' },
      { icon: '⚠️', text: '系统复杂度高，需要精心调优' }
    ]
  }
]

const activeArch = computed(() => architectures[currentArch.value])
</script>

<style scoped>
.rag-arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.arch-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.arch-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}
.arch-tab.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.tab-badge {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  font-size: 11px;
  font-weight: 700;
}
.arch-tab.active .tab-badge {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.tab-name {
  font-weight: 600;
}
.arch-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.flow-diagram {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 12px;
}
.flow-node-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.flow-node {
  padding: 10px 14px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;
}
.flow-node:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.flow-node.input {
  border-color: #3b82f6;
  background: #eff6ff;
}
.flow-node.output {
  border-color: #10b981;
  background: #ecfdf5;
}
.flow-node.enhance {
  border-color: #f59e0b;
  background: #fffbeb;
}
.flow-node.process {
  border-color: #8b5cf6;
  background: #f5f3ff;
}
.node-icon {
  font-size: 20px;
  margin-bottom: 2px;
}
.node-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.flow-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 4px;
}
.connector-arrow {
  font-size: 16px;
  color: var(--vp-c-text-3);
}
.connector-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
}
.node-detail {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand-1);
  margin-bottom: 16px;
}
.node-detail-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.node-detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.node-hint {
  text-align: center;
  padding: 12px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin-bottom: 16px;
}
.feature-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
}
.feature-icon {
  flex-shrink: 0;
}
.feature-text {
  color: var(--vp-c-text-2);
}
.evolution-bar {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.evo-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 16px;
  text-align: center;
}
.evo-track {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
}
.evo-node {
  text-align: center;
  z-index: 1;
  opacity: 0.4;
  transition: opacity 0.3s;
}
.evo-node.active {
  opacity: 1;
}
.evo-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  margin: 0 auto 6px;
  transition: background 0.3s;
}
.evo-node.active .evo-dot {
  background: var(--vp-c-brand-1);
}
.evo-label {
  font-size: 12px;
  font-weight: 600;
}
.evo-year {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.evo-line {
  position: absolute;
  top: 6px;
  left: 20px;
  right: 20px;
  height: 2px;
  background: var(--vp-c-divider);
}
.evo-line-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.5s;
}
</style>
