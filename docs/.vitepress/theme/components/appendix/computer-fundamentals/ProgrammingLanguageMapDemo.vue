<template>
  <div class="language-map-demo">
    <div class="demo-header">
      <span class="title">编程语言分类</span>
      <span class="subtitle">不同维度看语言</span>
    </div>

    <div class="classification-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="classification-content">
      <div v-for="item in currentItems" :key="item.name" class="item-card">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="item-examples">
          <span v-for="ex in item.examples" :key="ex" class="example-tag">{{ ex }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>选择建议：</strong>先学一门主流语言深入，理解编程思想，再学其他语言会容易很多。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('type')

const tabs = [
  { key: 'type', label: '按类型系统' },
  { key: 'level', label: '按抽象层级' },
  { key: 'paradigm', label: '按编程范式' }
]

const classifications = {
  type: [
    { name: '静态类型', desc: '变量类型在编译时确定', examples: ['Java', 'C++', 'Go', 'TypeScript'] },
    { name: '动态类型', desc: '变量类型在运行时确定', examples: ['Python', 'JavaScript', 'Ruby'] }
  ],
  level: [
    { name: '低级语言', desc: '接近硬件，执行效率高', examples: ['C', '汇编'] },
    { name: '高级语言', desc: '接近人类语言，开发效率高', examples: ['Python', 'Java', 'JavaScript'] }
  ],
  paradigm: [
    { name: '面向对象', desc: '以对象为中心组织代码', examples: ['Java', 'C++', 'Python'] },
    { name: '函数式', desc: '以函数为中心，强调不可变', examples: ['Haskell', 'Elixir', 'Clojure'] },
    { name: '多范式', desc: '支持多种编程风格', examples: ['Python', 'JavaScript', 'Rust'] }
  ]
}

const currentItems = computed(() => classifications[activeTab.value])
</script>

<style scoped>
.language-map-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.classification-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.classification-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-card {
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.item-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.item-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}

.item-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.example-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}
</style>
