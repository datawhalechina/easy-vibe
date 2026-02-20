<template>
  <div class="language-map-demo">
    <div class="demo-header">
      <span class="title">编程语言图谱：语言的演化</span>
      <span class="subtitle">从机器语言到现代语言</span>
    </div>

    <div class="demo-content">
      <div class="timeline">
        <div
          v-for="(era, i) in eras"
          :key="i"
          class="timeline-item"
        >
          <div class="era-year">
            {{ era.year }}
          </div>
          <div class="era-content">
            <div class="era-name">
              {{ era.name }}
            </div>
            <div class="era-langs">
              {{ era.languages.join(' → ') }}
            </div>
            <div class="era-desc">
              {{ era.desc }}
            </div>
          </div>
        </div>
      </div>

      <div class="paradigm-section">
        <div class="section-title">
          编程范式
        </div>
        <div class="paradigm-tabs">
          <button 
            v-for="p in paradigms" 
            :key="p.name"
            :class="['tab-btn', { active: activeParadigm === p.name }]"
            @click="activeParadigm = p.name"
          >
            {{ p.name }}
          </button>
        </div>
        <div
          v-if="currentParadigm"
          class="paradigm-content"
        >
          <div class="paradigm-desc">
            {{ currentParadigm.desc }}
          </div>
          <div class="paradigm-langs">
            <span class="label">代表语言：</span>
            <span
              v-for="lang in currentParadigm.languages"
              :key="lang"
              class="lang-tag"
            >{{ lang }}</span>
          </div>
          <div class="paradigm-example">
            <div class="example-label">
              代码示例
            </div>
            <pre><code>{{ currentParadigm.example }}</code></pre>
          </div>
        </div>
      </div>

      <div class="type-section">
        <div class="section-title">
          类型系统分类
        </div>
        <div class="type-grid">
          <div
            v-for="t in typeCategories"
            :key="t.name"
            class="type-card"
          >
            <div class="card-header">
              <span class="card-name">{{ t.name }}</span>
              <span class="card-type">{{ t.type }}</span>
            </div>
            <div class="card-desc">
              {{ t.desc }}
            </div>
            <div class="card-examples">
              {{ t.examples.join(', ') }}
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <div class="table-title">
          语言特性对比
        </div>
        <table>
          <thead>
            <tr>
              <th>语言</th>
              <th>类型</th>
              <th>范式</th>
              <th>运行方式</th>
              <th>主要用途</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="lang in languageComparison"
              :key="lang.name"
            >
              <td class="lang-name">
                {{ lang.name }}
              </td>
              <td>{{ lang.type }}</td>
              <td>{{ lang.paradigm }}</td>
              <td>{{ lang.runtime }}</td>
              <td>{{ lang.usage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>编程语言是人类与计算机沟通的桥梁。不同的语言有不同的设计哲学，适合解决不同类型的问题。选择语言时，要考虑问题领域、团队熟悉度、生态系统等因素。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const eras = [
  { year: '1950s', name: '早期语言', languages: ['Fortran', 'Lisp', 'COBOL'], desc: '科学计算和商业应用' },
  { year: '1960s', name: '结构化编程', languages: ['ALGOL', 'BASIC', 'PL/I'], desc: '引入结构化控制流' },
  { year: '1970s', name: '系统编程', languages: ['C', 'Pascal', 'Smalltalk'], desc: '面向对象和系统级开发' },
  { year: '1980s', name: '面向对象', languages: ['C++', 'Objective-C', 'Perl'], desc: 'OOP 成为主流' },
  { year: '1990s', name: '互联网时代', languages: ['Java', 'JavaScript', 'Python', 'PHP'], desc: 'Web 开发驱动语言发展' },
  { year: '2000s', name: '现代语言', languages: ['C#', 'Ruby', 'Scala', 'Go'], desc: '注重开发效率和安全性' },
  { year: '2010s', name: '新一代语言', languages: ['Rust', 'Swift', 'Kotlin', 'TypeScript'], desc: '内存安全与类型系统' }
]

const activeParadigm = ref('命令式')

const paradigms = [
  {
    name: '命令式',
    desc: '通过语句改变程序状态，描述"怎么做"',
    languages: ['C', 'Fortran', 'BASIC'],
    example: `// 计算数组总和
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];
}`
  },
  {
    name: '面向对象',
    desc: '将数据和操作封装在对象中，模拟现实世界',
    languages: ['Java', 'C++', 'Python', 'Ruby'],
    example: `class Dog {
    constructor(name) {
        this.name = name
    }
    bark() {
        console.log(this.name + ' says woof!')
    }
}`
  },
  {
    name: '函数式',
    desc: '将计算视为函数求值，避免状态变化',
    languages: ['Haskell', 'Lisp', 'Erlang', 'F#'],
    example: `-- 计算数组总和
sum arr = foldl (+) 0 arr

-- 或更简洁
sum = foldl (+) 0`
  },
  {
    name: '声明式',
    desc: '描述"做什么"而非"怎么做"',
    languages: ['SQL', 'Prolog', 'HTML'],
    example: `-- 查询所有用户
SELECT name, email 
FROM users 
WHERE active = true
ORDER BY created_at DESC`
  }
]

const currentParadigm = computed(() => {
  return paradigms.find(p => p.name === activeParadigm.value)
})

const typeCategories = [
  { name: '静态类型', type: '编译时检查', desc: '变量类型在编译时确定', examples: ['Java', 'C++', 'Rust', 'TypeScript'] },
  { name: '动态类型', type: '运行时检查', desc: '变量类型在运行时确定', examples: ['Python', 'JavaScript', 'Ruby', 'PHP'] },
  { name: '强类型', type: '严格检查', desc: '不允许隐式类型转换', examples: ['Python', 'Java', 'Rust', 'Haskell'] },
  { name: '弱类型', type: '宽松检查', desc: '允许隐式类型转换', examples: ['JavaScript', 'PHP', 'C'] }
]

const languageComparison = [
  { name: 'Python', type: '动态强类型', paradigm: '多范式', runtime: '解释执行', usage: 'AI、数据分析、Web' },
  { name: 'JavaScript', type: '动态弱类型', paradigm: '多范式', runtime: 'JIT 编译', usage: 'Web 前端、Node.js' },
  { name: 'Java', type: '静态强类型', paradigm: '面向对象', runtime: 'JVM', usage: '企业应用、Android' },
  { name: 'C++', type: '静态弱类型', paradigm: '多范式', runtime: '编译执行', usage: '系统、游戏、嵌入式' },
  { name: 'Rust', type: '静态强类型', paradigm: '多范式', runtime: '编译执行', usage: '系统、WebAssembly' },
  { name: 'Go', type: '静态强类型', paradigm: '并发导向', runtime: '编译执行', usage: '云原生、微服务' }
]
</script>

<style scoped>
.language-map-demo {
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

.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.timeline-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.era-year {
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  min-width: 60px;
}

.era-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.era-langs {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.era-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.section-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.paradigm-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.paradigm-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.paradigm-desc {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.paradigm-langs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.lang-tag {
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  font-size: 0.75rem;
}

.paradigm-example {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.example-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-divider);
}

pre {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  overflow-x: auto;
}

code {
  font-family: monospace;
}

.type-section {
  margin-bottom: 1rem;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.type-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.card-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.card-type {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.card-examples {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.comparison-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem;
  text-align: left;
}

th {
  background: var(--vp-c-bg);
}

.lang-name {
  font-weight: bold;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

</style>
