<template>
  <div class="programming-paradigm-demo">
    <div class="demo-header">
      <span class="icon">🎨</span>
      <span class="title">编程范式</span>
      <span class="subtitle">不同的编程思维方式</span>
    </div>

    <div class="paradigm-intro">
      编程范式是编程的<strong>思维方式</strong>，决定了如何组织和编写代码
    </div>

    <div class="paradigm-cards">
      <div
        v-for="paradigm in paradigms"
        :key="paradigm.id"
        :class="['paradigm-card', { active: activeParadigm === paradigm.id }]"
        @click="activeParadigm = paradigm.id"
      >
        <div class="card-icon">{{ paradigm.icon }}</div>
        <div class="card-name">{{ paradigm.name }}</div>
        <div class="card-desc">{{ paradigm.desc }}</div>
      </div>
    </div>

    <!-- 详细说明 -->
    <div v-if="activeParadigm" class="paradigm-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentParadigm.icon }}</span>
        <span class="detail-title">{{ currentParadigm.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">核心思想</div>
          <div class="section-text">{{ currentParadigm.idea }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">代码示例</div>
          <div class="code-box">
            <pre><code>{{ currentParadigm.example }}</code></pre>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">特点</div>
          <div class="feature-tags">
            <span
              v-for="(feature, index) in currentParadigm.features"
              :key="index"
              class="feature-tag"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">代表语言</div>
          <div class="lang-list">
            <span
              v-for="(lang, index) in currentParadigm.languages"
              :key="index"
              class="lang-item"
            >
              {{ lang }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 范式对比 -->
    <div class="paradigm-comparison">
      <div class="comparison-title">范式对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>特点</th>
            <th>命令式</th>
            <th>面向对象</th>
            <th>函数式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>关注点</td>
            <td>怎么做</td>
            <td>谁来做</td>
            <td>做什么</td>
          </tr>
          <tr>
            <td>数据管理</td>
            <td>变量和状态</td>
            <td>对象封装</td>
            <td>不可变数据</td>
          </tr>
          <tr>
            <td>代码组织</td>
            <td>语句和函数</td>
            <td>类和对象</td>
            <td>纯函数</td>
          </tr>
          <tr>
            <td>适用场景</td>
            <td>系统编程</td>
            <td>大型应用</td>
            <td>数据处理</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 多范式 -->
    <div class="multi-paradigm">
      <div class="multi-title">现代多范式语言</div>
      <div class="multi-desc">
        大多数现代语言支持多种范式，开发者可以根据需求灵活选择
      </div>
      <div class="lang-grid">
        <div class="multi-lang-card">
          <div class="lang-name">Python</div>
          <div class="lang-paradigms">命令式 + 面向对象 + 函数式</div>
        </div>
        <div class="multi-lang-card">
          <div class="lang-name">JavaScript</div>
          <div class="lang-paradigms">命令式 + 面向对象 + 函数式</div>
        </div>
        <div class="multi-lang-card">
          <div class="lang-name">Rust</div>
          <div class="lang-paradigms">命令式 + 面向对象 + 函数式</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeParadigm = ref('imperative')

const paradigms = [
  {
    id: 'imperative',
    name: '命令式编程',
    icon: '📋',
    desc: '告诉计算机怎么做',
    idea: '通过一系列命令（语句）来改变程序状态，关注"怎么做"',
    example: '// 计算1-10的和\nlet sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}',
    features: ['变量', '循环', '条件判断', '语句'],
    languages: ['C', 'Python', 'JavaScript']
  },
  {
    id: 'oop',
    name: '面向对象编程',
    icon: '🎯',
    desc: '用对象来组织代码',
    idea: '将数据和操作数据的方法封装成对象，通过对象间交互来完成任务',
    example: 'class Calculator {\n  add(a, b) { return a + b; }\n}\nconst calc = new Calculator();',
    features: ['封装', '继承', '多态', '类'],
    languages: ['Java', 'C++', 'Python', 'Ruby']
  },
  {
    id: 'functional',
    name: '函数式编程',
    icon: 'λ',
    desc: '函数是核心',
    idea: '强调纯函数、不可变数据，避免副作用，关注"做什么"',
    example: '// 计算1-10的和\nconst sum = Array.from(\n  {length: 10}, (_, i) => i + 1\n).reduce((a, b) => a + b, 0);',
    features: ['纯函数', '不可变性', '高阶函数', '无副作用'],
    languages: ['Haskell', 'F#', 'Erlang', 'Clojure']
  }
]

const currentParadigm = computed(() => paradigms.find(p => p.id === activeParadigm.value))
</script>

<style scoped>
.programming-paradigm-demo {
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

.paradigm-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.paradigm-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.paradigm-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.paradigm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.paradigm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.paradigm-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-box {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 1rem;
}

.code-box pre {
  margin: 0;
  color: #d4d4d4;
  font-size: 0.8rem;
  line-height: 1.6;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.feature-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
}

.lang-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.lang-item {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

.paradigm-comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
}

.multi-paradigm {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.multi-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.multi-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.multi-lang-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.lang-name {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.lang-paradigms {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
