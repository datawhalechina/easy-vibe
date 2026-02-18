<template>
  <div class="memory-management-demo">
    <div class="demo-header">
      <span class="icon">🧠</span>
      <span class="title">内存管理</span>
      <span class="subtitle">不同语言的内存处理方式</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">收拾房间</span>：有的房间有自动扫地机器人定期清理（GC），有的需要自己动手整理（手动管理），有的房间设计得不会变乱（所有权系统）。
    </div>

    <div class="models-container">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
      >
        <div class="model-icon">
          {{ model.icon }}
        </div>
        <div class="model-name">
          {{ model.name }}
        </div>
        <div class="model-desc">
          {{ model.description }}
        </div>
        <div class="model-languages">
          <span
            v-for="lang in model.languages"
            :key="lang"
            class="lang-tag"
          >
            {{ lang }}
          </span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>GC 语言（Java、Go、Python）让开发者省心，但有性能开销。手动管理（C、C++）性能最好但容易内存泄漏。Rust 的所有权系统编译时保证安全，无运行时开销。
    </div>
  </div>
</template>

<script setup>
const models = [
  {
    name: '垃圾回收 (GC)',
    icon: '♻️',
    description: '运行时自动回收不再使用的内存',
    languages: ['Java', 'Go', 'Python', 'Node.js']
  },
  {
    name: '手动管理',
    icon: '🔧',
    description: '开发者显式申请和释放内存',
    languages: ['C', 'C++']
  },
  {
    name: '所有权系统',
    icon: '🔒',
    description: '编译时通过规则保证内存安全',
    languages: ['Rust']
  }
]
</script>

<style scoped>
.memory-management-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.models-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.model-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.model-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.model-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.model-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.model-languages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
}

.lang-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
