<template>
  <div class="triad">
    <div class="demo-header">
      <span class="icon">🎭</span>
      <span class="title">三剑客协作</span>
      <span class="subtitle">同一段页面，切换看 HTML/CSS/JS 各自的作用</span>
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
            {{ m.label }}
          </button>
        </div>

        <div class="preview" :class="current">
          <h1 class="hero" :class="{ selected: selectedPart === 'h1' }" @click="selectedPart = 'h1'">
            <span class="badge">①</span>欢迎来到我的网站
          </h1>
          <p class="desc" :class="{ selected: selectedPart === 'p' }" @click="selectedPart = 'p'">
            <span class="badge">②</span>这是一段描述文字
          </p>
          <button class="cta" :class="{ selected: selectedPart === 'btn' }" @click="handleBtnClick">
            <span class="badge">③</span>点我试试 ({{ clicks }})
          </button>
        </div>
      </div>

      <div class="right-panel">
        <div class="code-section">
          <div class="code-label">{{ codeTitle }}</div>
          <div class="code-block">
            <div v-for="(line, i) in codeLines" :key="i" :class="['line', { hl: line.key === selectedPart }]">
              {{ line.text }}
            </div>
          </div>
        </div>

        <div class="explain-section">
          <div class="explain-label">发生了什么</div>
          <ol class="steps">
            <li v-for="s in steps" :key="s">{{ s }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>HTML 是骨架，CSS 是皮肤，JS 是大脑。三者分工明确，缺一不可。
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const modes = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JS' }
]

const current = ref('html')
const clicks = ref(0)
const selectedPart = ref('h1')

const codeTitle = computed(() => {
  if (current.value === 'html') return 'HTML：定义结构'
  if (current.value === 'css') return 'CSS：定义样式'
  return 'JS：定义行为'
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
      { key: 'h1', text: '.hero { color: #0ea5e9; font-size: 20px; }' },
      { key: 'p', text: '.desc { color: #666; }' },
      { key: 'btn', text: '.cta { background: #0ea5e9; color: #fff; }' }
    ]
  }
  return [
    { key: 'btn', text: "btn.addEventListener('click', () => {" },
    { key: 'btn', text: '  count++' },
    { key: 'btn', text: "  btn.textContent = '点我 (' + count + ')'" },
    { key: 'btn', text: '})' }
  ]
})

const steps = computed(() => {
  if (current.value === 'html') {
    return ['浏览器读取标签，知道"这是标题、这是按钮"', '按默认样式显示（所以看起来朴素）']
  }
  if (current.value === 'css') {
    return ['读取选择器，找到对应元素', '应用颜色、字号、间距等样式']
  }
  return ['给按钮绑定点击事件', '点击时更新计数和文字']
})

const handleBtnClick = () => {
  selectedPart.value = 'btn'
  if (current.value === 'js') clicks.value++
}
</script>

<style scoped>
.triad {
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

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .main-area {
    grid-template-columns: 1fr;
  }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modes {
  display: flex;
  gap: 0.25rem;
}

.mode-btn {
  flex: 1;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s;
}

.mode-btn:hover { background: var(--vp-c-bg-soft); }
.mode-btn.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  margin-right: 8px;
  font-weight: 800;
  font-size: 11px;
  flex-shrink: 0;
}

.hero { margin: 0; cursor: pointer; display: flex; align-items: center; font-size: 1rem; }
.desc { margin: 0; color: var(--vp-c-text-2); cursor: pointer; display: flex; align-items: center; font-size: 0.9rem; }
.cta {
  width: fit-content;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.selected {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
  border-radius: 4px;
}

.preview.css .hero { color: var(--vp-c-brand); font-size: 1.1rem; }
.preview.css .desc { color: var(--vp-c-text-2); }
.preview.css .cta { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.preview.js .cta { background: #22c55e; color: #fff; border-color: #22c55e; }
.preview.js { border-color: rgba(34, 197, 94, 0.4); }

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-section, .explain-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
}

.code-label, .explain-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.code-block {
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  line-height: 1.5;
}

.line { padding-left: 0.25rem; }
.hl {
  background: var(--vp-c-brand-dimm);
  border-left: 2px solid var(--vp-c-brand);
  font-weight: 600;
}

.steps {
  margin: 0;
  padding-left: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
