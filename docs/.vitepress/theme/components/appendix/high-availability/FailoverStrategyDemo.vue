<!--
  FailoverStrategyDemo.vue
  故障转移策略演示：展示主备、主主、多活等高可用架构
-->
<template>
  <div class="failover-demo">
    <div class="header">
      <div class="title">故障转移策略对比</div>
      <div class="subtitle">点击查看不同高可用架构的工作方式</div>
    </div>

    <div class="strategy-tabs">
      <div
        v-for="s in strategies"
        :key="s.key"
        :class="['tab', { active: activeStrategy === s.key }]"
        @click="activeStrategy = s.key"
      >
        {{ s.name }}
      </div>
    </div>

    <div v-if="current" class="strategy-detail">
      <div class="strategy-name">{{ current.name }}</div>
      <div class="strategy-desc">{{ current.desc }}</div>

      <div class="arch-visual">
        <div
          v-for="(node, i) in current.nodes"
          :key="i"
          :class="['arch-node', node.role]"
        >
          <div class="node-role">{{ node.label }}</div>
          <div class="node-status">{{ node.status }}</div>
        </div>
      </div>

      <div class="pros-cons">
        <div class="pros">
          <div class="pc-title">优点</div>
          <div v-for="p in current.pros" :key="p" class="pc-item good">{{ p }}</div>
        </div>
        <div class="cons">
          <div class="pc-title">缺点</div>
          <div v-for="c in current.cons" :key="c" class="pc-item bad">{{ c }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStrategy = ref('active-standby')

const strategies = [
  {
    key: 'active-standby',
    name: '主备模式',
    desc: '一个主节点处理所有请求，备节点待命。主节点故障时，备节点接管。',
    nodes: [
      { label: '主节点', status: '处理请求', role: 'primary' },
      { label: '备节点', status: '待命同步', role: 'standby' }
    ],
    pros: ['架构简单，易于理解', '数据一致性好保证'],
    cons: ['备节点资源浪费', '切换有短暂中断（秒级）']
  },
  {
    key: 'active-active',
    name: '主主模式',
    desc: '两个节点都处理请求，互相同步数据。任一节点故障，另一个继续服务。',
    nodes: [
      { label: '节点 A', status: '处理请求', role: 'primary' },
      { label: '节点 B', status: '处理请求', role: 'primary' }
    ],
    pros: ['资源利用率高', '无切换中断'],
    cons: ['数据冲突处理复杂', '需要解决写冲突']
  },
  {
    key: 'multi-az',
    name: '多可用区',
    desc: '在同一地域的不同数据中心部署，防止单个机房故障。',
    nodes: [
      { label: 'AZ-1 主', status: '读写', role: 'primary' },
      { label: 'AZ-2 从', status: '只读', role: 'secondary' },
      { label: 'AZ-3 从', status: '只读', role: 'secondary' }
    ],
    pros: ['机房级容灾', '读性能可扩展'],
    cons: ['跨 AZ 延迟（1-2ms）', '成本增加']
  },
  {
    key: 'multi-region',
    name: '异地多活',
    desc: '在不同地域部署完整的服务，每个地域独立处理本地流量。',
    nodes: [
      { label: '北京', status: '独立服务', role: 'primary' },
      { label: '上海', status: '独立服务', role: 'primary' },
      { label: '广州', status: '独立服务', role: 'primary' }
    ],
    pros: ['地域级容灾', '就近访问延迟低'],
    cons: ['架构极其复杂', '数据同步挑战大']
  }
]

const current = computed(() => strategies.find(s => s.key === activeStrategy.value))
</script>

<style scoped>
.failover-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.strategy-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab {
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.tab:hover { border-color: var(--vp-c-brand); }
.tab.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.strategy-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.strategy-name { font-weight: 700; font-size: 0.95rem; }
.strategy-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.arch-visual { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; justify-content: center; }
.arch-node {
  padding: 0.5rem 0.75rem; border-radius: 6px; text-align: center;
  border: 1px dashed var(--vp-c-divider); min-width: 90px;
}
.arch-node.primary { background: rgba(var(--vp-c-brand-rgb), 0.08); border-color: var(--vp-c-brand); }
.arch-node.standby { background: rgba(245,158,11,0.08); border-color: #f59e0b; }
.arch-node.secondary { background: rgba(99,102,241,0.08); border-color: #6366f1; }
.node-role { font-weight: 700; font-size: 0.82rem; }
.node-status { font-size: 0.72rem; color: var(--vp-c-text-2); }
.pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.pc-title { font-weight: 700; font-size: 0.82rem; margin-bottom: 0.3rem; }
.pc-item { font-size: 0.78rem; padding: 0.2rem 0; }
.pc-item.good::before { content: '+ '; color: #22c55e; font-weight: 700; }
.pc-item.bad::before { content: '- '; color: #ef4444; font-weight: 700; }
</style>
