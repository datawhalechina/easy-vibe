<!--
  CAPTheoremDemo.vue
  CAP 定理交互演示：展示一致性、可用性、分区容错性的权衡
-->
<template>
  <div class="cap-demo">
    <div class="header">
      <div class="title">CAP 定理交互演示</div>
      <div class="subtitle">点击选择两个属性，查看对应的系统类型</div>
    </div>

    <div class="triangle">
      <div
        v-for="item in capItems"
        :key="item.key"
        :class="['cap-node', { active: selected.includes(item.key) }]"
        @click="toggle(item.key)"
      >
        <div class="cap-letter">{{ item.letter }}</div>
        <div class="cap-name">{{ item.name }}</div>
        <div class="cap-desc">{{ item.desc }}</div>
      </div>
    </div>

    <div v-if="result" class="result-panel">
      <div class="result-title">{{ result.type }}</div>
      <div class="result-desc">{{ result.desc }}</div>
      <div class="result-examples">
        <span class="label">典型系统：</span>{{ result.examples }}
      </div>
      <div class="result-tradeoff">
        <span class="label">放弃了：</span>{{ result.sacrifice }}
      </div>
    </div>

    <div v-else class="hint">请选择两个属性查看结果</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref(['C', 'A'])

const capItems = [
  { key: 'C', letter: 'C', name: '一致性', desc: '所有节点看到相同的数据' },
  { key: 'A', letter: 'A', name: '可用性', desc: '每个请求都能得到响应' },
  { key: 'P', letter: 'P', name: '分区容错', desc: '网络分区时系统仍能运行' }
]

const combinations = {
  'CA': {
    type: 'CA 系统（放弃分区容错）',
    desc: '在没有网络分区的情况下，同时保证一致性和可用性。但在分布式环境中，网络分区是不可避免的，所以纯 CA 系统在实际分布式场景中很少见。',
    examples: '单机 MySQL、PostgreSQL（单节点）',
    sacrifice: '分区容错性（P）— 网络故障时系统不可用'
  },
  'CP': {
    type: 'CP 系统（放弃可用性）',
    desc: '网络分区时优先保证数据一致性，可能拒绝部分请求。适合对数据正确性要求极高的场景。',
    examples: 'ZooKeeper、etcd、HBase、MongoDB（强一致模式）',
    sacrifice: '可用性（A）— 分区时部分请求会被拒绝或超时'
  },
  'AP': {
    type: 'AP 系统（放弃强一致性）',
    desc: '网络分区时优先保证可用性，允许数据暂时不一致（最终一致性）。适合对可用性要求高、能容忍短暂不一致的场景。',
    examples: 'Cassandra、DynamoDB、DNS、CDN',
    sacrifice: '强一致性（C）— 不同节点可能短暂返回不同数据'
  }
}

function toggle(key) {
  const idx = selected.value.indexOf(key)
  if (idx >= 0) {
    selected.value = selected.value.filter(k => k !== key)
  } else {
    if (selected.value.length >= 2) {
      selected.value = [selected.value[1], key]
    } else {
      selected.value = [...selected.value, key]
    }
  }
}

const result = computed(() => {
  if (selected.value.length !== 2) return null
  const combo = [...selected.value].sort().join('')
  return combinations[combo] || null
})
</script>

<style scoped>
.cap-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.triangle { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; justify-content: center; }
.cap-node {
  flex: 1; min-width: 120px; max-width: 200px; padding: 0.75rem; border-radius: 8px;
  cursor: pointer; text-align: center; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); transition: all 0.2s;
}
.cap-node:hover { border-color: var(--vp-c-brand); }
.cap-node.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.08); }
.cap-letter { font-size: 1.5rem; font-weight: 800; color: var(--vp-c-brand); }
.cap-name { font-weight: 700; font-size: 0.9rem; margin: 0.2rem 0; }
.cap-desc { font-size: 0.75rem; color: var(--vp-c-text-2); }
.result-panel {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.result-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; }
.result-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; }
.result-examples, .result-tradeoff { font-size: 0.82rem; margin-bottom: 0.25rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
.hint { text-align: center; color: var(--vp-c-text-3); font-size: 0.85rem; padding: 1rem; }
</style>
