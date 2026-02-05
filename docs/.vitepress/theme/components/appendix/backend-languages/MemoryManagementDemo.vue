<template>
  <div class="memory-management-demo">
    <div class="demo-header">
      <h4>内存管理机制可视化</h4>
    </div>
    <div class="memory-models">
      <div class="model-card" v-for="model in models" :key="model.name">
        <div class="model-icon">{{ model.icon }}</div>
        <div class="model-name">{{ model.name }}</div>
        <div class="model-desc">{{ model.desc }}</div>
        <div class="model-languages">
          <span v-for="lang in model.languages" :key="lang" class="lang-tag">{{ lang }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const models = [
  {
    name: '垃圾回收 (GC)',
    icon: '♻️',
    desc: '运行时自动回收不再使用的内存',
    languages: ['Java', 'Go', 'Python', 'Node.js']
  },
  {
    name: '手动管理',
    icon: '🔧',
    desc: '开发者显式申请和释放内存',
    languages: ['C', 'C++']
  },
  {
    name: '所有权系统',
    icon: '🔒',
    desc: '编译时通过规则保证内存安全',
    languages: ['Rust']
  }
]
</script>

<style scoped>
.memory-management-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}
.memory-models {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.model-card {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}
.model-icon {
  font-size: 2em;
  margin-bottom: 8px;
}
.model-name {
  font-weight: bold;
  margin-bottom: 4px;
}
.model-desc {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}
.lang-tag {
  display: inline-block;
  padding: 2px 6px;
  margin: 2px;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  font-size: 0.8em;
}
</style>
