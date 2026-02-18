<template>
  <div class="triad">
    <div class="demo-header">
      <span class="title">HTML / CSS / JavaScript 协作演示</span>
      <span class="subtitle">同一段页面，切换查看三者各自的作用</span>
    </div>

    <div class="main-area">
      <div class="left-panel">
        <div class="modes">
          <button
            v-for="m in modes"
            :key="m.id"
            :class="['mode-btn', { active: current === m.id }]"
            @click="current = m.id"
          >
            <span class="mode-icon">{{ m.icon }}</span>
            {{ m.label }}
          </button>
        </div>

        <div
          class="preview"
          :class="current"
        >
          <h1
            class="hero"
            :class="{ selected: selectedPart === 'h1' }"
            @click="selectedPart = 'h1'"
          >
            <span class="badge">①</span>欢迎来到我的网站
          </h1>
          <p
            class="desc"
            :class="{ selected: selectedPart === 'p' }"
            @click="selectedPart = 'p'"
          >
            <span class="badge">②</span>这是一段描述文字
          </p>
          <button
            class="cta"
            :class="{ selected: selectedPart === 'btn' }"
            @click="handleBtnClick"
          >
            <span class="badge">③</span>点我试试 ({{ clicks }})
          </button>
        </div>
      </div>

      <div class="right-panel">
        <div class="code-section">
          <div class="code-label">
            {{ codeTitle }}
          </div>
          <div class="code-block">
            <div
              v-for="(line, i) in codeLines"
              :key="i"
              :class="['line', { hl: line.key === selectedPart }]"
            >
              {{ line.text }}
            </div>
          </div>
        </div>

        <div class="explain-section">
          <div class="explain-label">
            执行过程
          </div>
          <ol class="steps">
            <li
              v-for="s in steps"
              :key="s"
            >
              {{ s }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>分工原则：</strong>HTML 定义结构（是什么），CSS 定义样式（长什么样），JavaScript 定义行为（能做什么）。
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const modes = [
  { id: 'html', label: 'HTML', icon: '结构' },
  { id: 'css', label: 'CSS', icon: '样式' },
  { id: 'js', label: 'JavaScript', icon: '行为' }
]

const current = ref('html')
const clicks = ref(0)
const selectedPart = ref('h1')

const codeTitle = computed(() => {
  if (current.value === 'html') return 'HTML 代码'
  if (current.value === 'css') return 'CSS 代码'
  return 'JavaScript 代码'
})

const codeLines = computed(() => {
  if (current.value === 'html') {
    return [
      { key: 'h1', text: '<h1>欢迎来到我的网站</h1>' },
      { key: 'p', text: '<p>这是一段描述文字</p>' },
      { key: 'btn', text: '<button>点我试试</button>' }
    ]
  }
  if (current.value === 'css') {
    return [
      { key: 'h1', text: '.hero {' },
      { key: 'h1', text: '  color: #0ea5e9;' },
      { key: 'h1', text: '  font-size: 20px;' },
      { key: 'h1', text: '}' },
      { key: 'btn', text: '.cta { background: #0ea5e9; }' }
    ]
  }
  return [
    { key: 'btn', text: "const btn = document.querySelector('.cta')" },
    { key: 'btn', text: "btn.addEventListener('click', () => {" },
    { key: 'btn', text: '  count++' },
    { key: 'btn', text: "  btn.textContent = '点我 (' + count + ')'" },
    { key: 'btn', text: '})' }
  ]
})

const steps = computed(() => {
  if (current.value === 'html') {
    return [
      '浏览器解析标签，识别内容类型',
      'h1 是标题，p 是段落，button 是按钮',
      '按默认样式渲染（此时看起来很朴素）'
    ]
  }
  if (current.value === 'css') {
    return [
      '解析选择器，找到对应元素',
      '应用颜色、字号、间距等样式规则',
      '页面外观发生变化'
    ]
  }
  return [
    '通过选择器获取按钮元素',
    '注册 click 事件监听器',
    '点击时执行回调函数，更新计数'
  ]
})

const handleBtnClick = () => {
  selectedPart.value = 'btn'
  if (current.value === 'js') clicks.value++
}
</script>

<style scoped>
.triad {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.demo-header .title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-area {
    grid-template-columns: 1fr;
  }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modes {
  display: flex;
  gap: 0.5rem;
}

.mode-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.mode-icon {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.mode-btn:hover { background: var(--vp-c-bg-soft); }
.mode-btn.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mode-btn.active .mode-icon {
  color: var(--vp-c-brand);
}

.preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  margin-right: 8px;
  font-weight: 700;
  font-size: 11px;
  flex-shrink: 0;
}

.hero { 
  margin: 0; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  font-size: 1.1rem;
  transition: all 0.2s;
}
.desc { 
  margin: 0; 
  color: var(--vp-c-text-2); 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  font-size: 0.9rem;
}
.cta {
  width: fit-content;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.selected {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
  border-radius: 4px;
}

.preview.css .hero { color: var(--vp-c-brand); font-weight: 600; }
.preview.css .cta { 
  background: var(--vp-c-brand); 
  color: #fff; 
  border-color: var(--vp-c-brand); 
}

.preview.js .cta { 
  background: #22c55e; 
  color: #fff; 
  border-color: #22c55e; 
}
.preview.js { border-color: rgba(34, 197, 94, 0.3); }

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.code-section, .explain-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.code-label, .explain-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block {
  background: #1a1a2e;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
}

.line { padding-left: 0.25rem; }
.hl {
  background: rgba(14, 165, 233, 0.2);
  border-left: 2px solid var(--vp-c-brand);
  margin-left: -0.25rem;
  padding-left: 0.5rem;
}

.steps {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.6;
}

.steps li {
  margin-bottom: 0.25rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong { color: var(--vp-c-text-1); }
</style>
