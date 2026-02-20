<template>
  <div class="language-type-model-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">编程语言的类型模型</span>
      <span class="subtitle">不同语言的类型系统差异</span>
    </div>

    <div class="dimension-grid">
      <div
        v-for="dim in dimensions"
        :key="dim.id"
        class="dimension-card"
      >
        <div class="card-title">{{ dim.title }}</div>
        <div class="card-options">
          <div
            v-for="opt in dim.options"
            :key="opt.name"
            class="option-item"
          >
            <div class="option-name">{{ opt.name }}</div>
            <div class="option-langs">{{ opt.langs }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="quadrant-matrix">
      <div class="matrix-title">类型系统分类矩阵</div>
      <div class="matrix-grid">
        <div class="matrix-cell">
          <div class="cell-title">静态 + 强</div>
          <div class="cell-langs">Java, C++, Rust, Go</div>
          <div class="cell-desc">编译期检查，类型安全</div>
        </div>
        <div class="matrix-cell">
          <div class="cell-title">静态 + 弱</div>
          <div class="cell-langs">C</div>
          <div class="cell-desc">编译期检查，可随意转换</div>
        </div>
        <div class="matrix-cell">
          <div class="cell-title">动态 + 强</div>
          <div class="cell-langs">Python, Ruby</div>
          <div class="cell-desc">运行时检查，类型安全</div>
        </div>
        <div class="matrix-cell">
          <div class="cell-title">动态 + 弱</div>
          <div class="cell-langs">JavaScript, PHP</div>
          <div class="cell-desc">运行时检查，类型灵活</div>
        </div>
      </div>
    </div>

    <div class="type-inference">
      <div class="inference-title">类型推断</div>
      <div class="inference-content">
        <div class="inference-desc">
          现代语言可以自动推断变量类型，无需显式声明
        </div>
        <div class="inference-examples">
          <div class="example-lang">
            <div class="lang-header">TypeScript</div>
            <pre><code>let x = 5; // 推断为 number
let name = "Alice"; // string</code></pre>
          </div>
          <div class="example-lang">
            <div class="lang-header">Rust</div>
            <pre><code>let x = 5; // 推断为 i32
let name = "Alice"; // &str</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const dimensions = [
  {
    id: 'static',
    title: '类型检查时机',
    options: [
      { name: '静态类型', langs: 'Java, C++, Rust, Go' },
      { name: '动态类型', langs: 'Python, JavaScript, Ruby' }
    ]
  },
  {
    id: 'strength',
    title: '类型强度',
    options: [
      { name: '强类型', langs: 'Python, Java, Rust' },
      { name: '弱类型', langs: 'JavaScript, C, PHP' }
    ]
  }
]
</script>

<style scoped>
.language-type-model-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.dimension-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dimension-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.card-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.option-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.option-langs {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.quadrant-matrix {
  margin-bottom: 2rem;
}

.matrix-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.matrix-cell {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.cell-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.cell-langs {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.cell-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.type-inference {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.inference-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.inference-desc {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.inference-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.example-lang {
  background: #1e1e1e;
  border-radius: 6px;
  overflow: hidden;
}

.lang-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.example-lang pre {
  margin: 0;
  padding: 1rem;
}

.example-lang code {
  color: #d4d4d4;
  font-size: 0.75rem;
  line-height: 1.6;
}
</style>
