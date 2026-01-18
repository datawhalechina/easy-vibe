<!--
  VueReactComparisonDemo.vue
  用可视化方式对比 Vue vs React：语法、状态更新、渲染心智模型
-->
<template>
  <div class="vr-demo">
    <div class="header">
      <div class="title">Vue vs React：它们哪里像？哪里不一样？</div>
      <div class="subtitle">
        选一个标签页，然后点“+1”，看看背后发生了什么（示意）。
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ active: currentTab === t.key }"
        @click="currentTab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">Vue</div>
        <div class="preview">
          <div class="row">
            count: <strong>{{ count }}</strong>
          </div>
          <button class="btn vue" @click="inc('vue')">+1</button>
        </div>
        <div class="code">
          <div class="code-title">典型写法（示意）</div>
          <pre><code class="language-vue">{{ vueCode }}</code></pre>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">React</div>
        <div class="preview">
          <div class="row">
            count: <strong>{{ count }}</strong>
          </div>
          <button class="btn react" @click="inc('react')">+1</button>
        </div>
        <div class="code">
          <div class="code-title">典型写法（示意）</div>
          <pre><code class="language-jsx">{{ reactCode }}</code></pre>
        </div>
      </div>
    </div>

    <div class="what">
      <div class="what-title">点击 “+1” 时发生了什么？</div>
      <div class="steps">
        <div
          v-for="(s, idx) in steps"
          :key="idx"
          class="step"
          :class="{ highlight: idx === lastStepIndex }"
        >
          <span class="num">{{ idx + 1 }}</span>
          <span class="text">{{ s }}</span>
        </div>
      </div>
      <div class="note">
        说明：这是为了建立心智模型的<strong>简化示意</strong>，真实框架内部更复杂。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { key: 'syntax', label: '语法（Template vs JSX）' },
  { key: 'state', label: '状态更新（ref vs useState）' },
  { key: 'render', label: '渲染心智模型' }
]

const currentTab = ref('syntax')
const count = ref(1)
const lastClicked = ref('vue')
const lastStepIndex = ref(-1)

const inc = (who) => {
  lastClicked.value = who
  count.value += 1
  // 简单动画：把最后一步高亮一下
  lastStepIndex.value = 2
  setTimeout(() => (lastStepIndex.value = -1), 600)
}

const vueCode = computed(() => {
  if (currentTab.value === 'syntax') {
    // NOTE: Avoid literal closing script tag inside a script block (HTML parser would terminate early).
    return [
      `<template>`,
      `  <button @click="count++">+1</button>`,
      `  <div>count: {{ count }}</div>`,
      `</template>`,
      ``,
      `<script setup>`,
      `import { ref } from 'vue'`,
      `const count = ref(1)`,
      `</scr` + `ipt>`
    ].join('\n')
  }
  if (currentTab.value === 'state') {
    return `import { ref } from 'vue'

const count = ref(1)

function inc() {
  count.value++
}`
  }
  return `// Vue：响应式系统会“追踪依赖”
// count 变了 -> 用到 count 的地方自动更新`
})

const reactCode = computed(() => {
  if (currentTab.value === 'syntax') {
    return `function App() {
  const [count, setCount] = useState(1)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <div>count: {count}</div>
    </>
  )
}`
  }
  if (currentTab.value === 'state') {
    return `const [count, setCount] = useState(1)

function inc() {
  setCount(count + 1)
}`
  }
  return `// React：state 变了 -> 组件函数重新执行（重新渲染）
// 然后 React 决定哪些 DOM 需要更新`
})

const steps = computed(() => {
  if (currentTab.value === 'syntax') {
    return [
      '你写 UI 的方式：Vue 常用 Template；React 常用 JSX',
      '点击按钮触发事件处理函数',
      'count 更新后，界面显示跟着变'
    ]
  }
  if (currentTab.value === 'state') {
    return [
      'Vue：用 ref/ reactive 保存状态；React：用 useState 保存状态',
      lastClicked.value === 'vue'
        ? '你修改了 count.value'
        : '你调用 setCount(...)',
      '框架把变化反映到界面'
    ]
  }
  return [
    'Vue：更偏“依赖追踪”，谁用到了 count，就更新谁',
    'React：更偏“重新执行组件函数”，得到新的 UI 描述',
    '最终都会只更新需要变化的 DOM（避免全量重画）'
  ]
})
</script>

<style scoped>
.vr-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.tab.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.12);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.panel {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1rem;
}

.panel-title {
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.preview {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.9rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.row {
  font-size: 0.95rem;
}

.btn {
  border: none;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
}

.btn.vue {
  background: #22c55e;
}

.btn.react {
  background: #0ea5e9;
}

.code {
  margin-top: 0.9rem;
}

.code-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

pre {
  margin: 0;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: auto;
}

code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.what {
  margin-top: 1rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1rem;
}

.what-title {
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.steps {
  display: grid;
  gap: 0.5rem;
}

.step {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.55rem 0.65rem;
}

.step.highlight {
  border-color: rgba(34, 197, 94, 0.5);
  background: rgba(34, 197, 94, 0.08);
}

.num {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.15);
  color: #4338ca;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  flex: 0 0 auto;
}

.text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.35;
}

.note {
  margin-top: 0.7rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
