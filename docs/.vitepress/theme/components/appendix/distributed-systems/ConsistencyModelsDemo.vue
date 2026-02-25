<!--
  ConsistencyModelsDemo.vue
  一致性模型演示：展示强一致性、最终一致性、因果一致性的区别
-->
<template>
  <div class="consistency-demo">
    <div class="header">
      <div class="title">一致性模型对比</div>
      <div class="subtitle">点击查看不同一致性模型的行为差异</div>
    </div>

    <div class="model-tabs">
      <div
        v-for="m in models"
        :key="m.key"
        :class="['tab', { active: activeModel === m.key }]"
        @click="activeModel = m.key"
      >
        {{ m.name }}
      </div>
    </div>

    <div v-if="current" class="model-detail">
      <div class="model-name">{{ current.name }}</div>
      <div class="model-desc">{{ current.desc }}</div>

      <div class="timeline">
        <div v-for="(step, i) in current.steps" :key="i" class="step">
          <div class="step-time">T{{ i + 1 }}</div>
          <div class="step-nodes">
            <div
              v-for="(node, ni) in step.nodes"
              :key="ni"
              :class="['node', node.status]"
            >
              <div class="node-label">{{ node.name }}</div>
              <div class="node-value">{{ node.value }}</div>
            </div>
          </div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>

      <div class="model-tradeoff">
        <span class="label">权衡：</span>{{ current.tradeoff }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeModel = ref('strong')

const models = [
  {
    key: 'strong',
    name: '强一致性',
    desc: '写入成功后，所有节点立即返回最新值。像单机数据库一样的体验。',
    tradeoff: '延迟高（需要等所有节点确认），可用性低（节点故障时可能阻塞）',
    steps: [
      { nodes: [{ name: '节点A', value: 'v1', status: 'ok' }, { name: '节点B', value: 'v1', status: 'ok' }, { name: '节点C', value: 'v1', status: 'ok' }], desc: '初始状态，所有节点数据一致' },
      { nodes: [{ name: '节点A', value: 'v2 ✍️', status: 'writing' }, { name: '节点B', value: '同步中...', status: 'syncing' }, { name: '节点C', value: '同步中...', status: 'syncing' }], desc: '客户端写入 v2，等待所有节点确认' },
      { nodes: [{ name: '节点A', value: 'v2', status: 'ok' }, { name: '节点B', value: 'v2', status: 'ok' }, { name: '节点C', value: 'v2', status: 'ok' }], desc: '所有节点确认后才返回成功，读任意节点都是 v2' }
    ]
  },
  {
    key: 'eventual',
    name: '最终一致性',
    desc: '写入后不等所有节点同步，数据最终会一致，但中间可能读到旧值。',
    tradeoff: '延迟低、可用性高，但可能短暂读到旧数据',
    steps: [
      { nodes: [{ name: '节点A', value: 'v1', status: 'ok' }, { name: '节点B', value: 'v1', status: 'ok' }, { name: '节点C', value: 'v1', status: 'ok' }], desc: '初始状态' },
      { nodes: [{ name: '节点A', value: 'v2 ✍️', status: 'writing' }, { name: '节点B', value: 'v1', status: 'stale' }, { name: '节点C', value: 'v1', status: 'stale' }], desc: '写入 A 后立即返回成功，B/C 还是旧值' },
      { nodes: [{ name: '节点A', value: 'v2', status: 'ok' }, { name: '节点B', value: 'v2', status: 'ok' }, { name: '节点C', value: 'v1→v2', status: 'syncing' }], desc: '后台异步同步，逐渐达到一致' }
    ]
  },
  {
    key: 'causal',
    name: '因果一致性',
    desc: '有因果关系的操作保证顺序，无因果关系的操作可以乱序。介于强一致和最终一致之间。',
    tradeoff: '比强一致性延迟低，比最终一致性更可预测',
    steps: [
      { nodes: [{ name: '用户A', value: '发帖: "你好"', status: 'ok' }, { name: '用户B', value: '看到帖子', status: 'ok' }, { name: '用户C', value: '看到帖子', status: 'ok' }], desc: '用户 A 发帖' },
      { nodes: [{ name: '用户A', value: '发帖: "你好"', status: 'ok' }, { name: '用户B', value: '回复: "嗨!"', status: 'writing' }, { name: '用户C', value: '看到帖子', status: 'ok' }], desc: '用户 B 回复（因果依赖于 A 的帖子）' },
      { nodes: [{ name: '用户A', value: '看到回复', status: 'ok' }, { name: '用户B', value: '回复: "嗨!"', status: 'ok' }, { name: '用户C', value: '先看到帖子再看到回复', status: 'ok' }], desc: '所有人都先看到帖子再看到回复（因果顺序保证）' }
    ]
  }
]

const current = computed(() => models.find(m => m.key === activeModel.value))
</script>

<style scoped>
.consistency-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.model-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.model-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.model-name { font-weight: 700; font-size: 0.95rem; }
.model-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.timeline { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; }
.step { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.step-time { font-weight: 700; font-size: 0.8rem; color: var(--vp-c-brand); min-width: 28px; }
.step-nodes { display: flex; gap: 0.4rem; flex: 1; }
.node {
  padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.72rem;
  border: 1px solid var(--vp-c-divider); flex: 1; text-align: center;
}
.node.ok { background: rgba(34,197,94,0.08); border-color: #22c55e; }
.node.writing { background: rgba(var(--vp-c-brand-rgb),0.08); border-color: var(--vp-c-brand); }
.node.syncing { background: rgba(245,158,11,0.08); border-color: #f59e0b; }
.node.stale { background: rgba(239,68,68,0.08); border-color: #ef4444; }
.node-label { font-weight: 600; }
.node-value { color: var(--vp-c-text-2); }
.step-desc { font-size: 0.75rem; color: var(--vp-c-text-3); width: 100%; margin-top: 0.15rem; }
.model-tradeoff { font-size: 0.82rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .step { flex-direction: column; } .step-nodes { width: 100%; } }
</style>
