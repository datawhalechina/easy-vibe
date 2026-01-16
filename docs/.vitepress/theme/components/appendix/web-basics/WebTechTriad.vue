<!--
  WebTechTriad.vue
  三剑客轻交互：同一段小页面，切换 HTML/CSS/JS。
  目标：让读者“看到页面上的某一块”就能立刻找到“代码里的哪一行”，再用三步解释发生了什么。
  风格：先玩后讲，句子短。
-->
<template>
  <div class="triad">
    <div class="top">
      <div>
        <div class="title">先玩一下：同一段页面，切换层次</div>
        <div class="subtitle">HTML 定骨架 → CSS 换外观 → JS 让它动起来</div>
      </div>
      <div class="modes">
        <button
          v-for="m in modes"
          :key="m.id"
          :class="['mode', { active: current === m.id }]"
          @click="current = m.id"
        >
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="preview" :class="current">
      <div class="hint">点一下标题/段落/按钮，我会在下面的代码里高亮对应行。</div>
      <h1
        class="hero"
        :class="{ selected: selectedPart === 'h1' }"
        @click="selectedPart = 'h1'"
      >
        <span class="badge">①</span>
        欢迎来到我的网站
      </h1>
      <p
        class="desc"
        :class="{ selected: selectedPart === 'p' }"
        @click="selectedPart = 'p'"
      >
        <span class="badge">②</span>
        这是一段描述文字，告诉用户这里能做什么。
      </p>
      <button
        class="cta"
        :class="{ selected: selectedPart === 'btn' }"
        @click="selectedPart = 'btn'; increment()"
      >
        <span class="badge">③</span>
        点我试试看 ({{ clicks }})
      </button>
      <div class="click-tip" v-if="current === 'js'">
        现在再点一次按钮计数会变：这是 JS 在改页面。
      </div>
    </div>

    <div class="code-block">
      <div class="code-title">{{ codeTitle }}</div>
      <div class="code-content">
        <div 
          v-for="(line, i) in codeLines" 
          :key="i" 
          :class="['line', { hl: line.key === selectedPart }]"
        >
          {{ line.text }}
        </div>
      </div>
    </div>

    <div class="explain">
      <div class="card">
        <div class="card-title">对照：页面 ↔ 代码</div>
        <div class="map">
          <button
            v-for="row in mappingRows"
            :key="row.key"
            :class="['map-row', { active: selectedPart === row.key }]"
            @click="selectedPart = row.key"
          >
            <span class="left">{{ row.left }}</span>
            <span class="right">{{ row.right }}</span>
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">发生了什么（简单版）</div>
        <ol class="steps">
          <li v-for="s in steps" :key="s">{{ s }}</li>
        </ol>
      </div>
    </div>

    <div class="one-line">
      <span class="one-line-title">一句话总结：</span>
      <span class="one-line-body">{{ oneLine }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const modes = [
  { id: 'html', label: '看骨架 (HTML)' },
  { id: 'css', label: '看外观 (CSS)' },
  { id: 'js', label: '看交互 (JS)' }
]

const current = ref('html')
const clicks = ref(0)
const selectedPart = ref('h1') // 'h1' | 'p' | 'btn'

const codeTitle = computed(() => {
  if (current.value === 'html') return 'HTML 片段：告诉浏览器这是什么'
  if (current.value === 'css') return 'CSS 片段：决定长什么样'
  return 'JS 片段：让它动起来'
})

const codeLines = computed(() => {
  if (current.value === 'html') {
    return [
      { key: 'h1', text: '<h1>欢迎来到我的网站</h1>' },
      { key: 'p', text: '<p>这是一段描述文字...</p>' },
      { key: 'btn', text: '<button>点我试试看</button>' }
    ]
  }
  if (current.value === 'css') {
    return [
      { key: 'h1', text: '.hero { color: #0ea5e9; font-size: 24px; }' },
      { key: 'p', text: '.desc { color: #111827; }' },
      { key: 'btn', text: '.cta { background: #0ea5e9; color: #fff; border-radius: 10px; }' }
    ]
  }
  return [
    { key: 'btn', text: "const btn = document.querySelector('button')" },
    { key: 'btn', text: 'let count = 0' },
    { key: 'btn', text: "btn.addEventListener('click', () => {" },
    { key: 'btn', text: '  count++' },
    { key: 'btn', text: "  btn.textContent = '点我试试看 (' + count + ')'" },
    { key: 'btn', text: '})' }
  ]
})

const mappingRows = computed(() => {
  if (current.value === 'html') {
    return [
      { key: 'h1', left: '① 标题', right: '<h1>...</h1>' },
      { key: 'p', left: '② 段落', right: '<p>...</p>' },
      { key: 'btn', left: '③ 按钮', right: '<button>...</button>' }
    ]
  }
  if (current.value === 'css') {
    return [
      { key: 'h1', left: '① 标题', right: '.hero { ... }' },
      { key: 'p', left: '② 段落', right: '.desc { ... }' },
      { key: 'btn', left: '③ 按钮', right: '.cta { ... }' }
    ]
  }
  return [
    { key: 'h1', left: '① 标题', right: '（此例未涉及）' },
    { key: 'p', left: '② 段落', right: '（此例未涉及）' },
    { key: 'btn', left: '③ 按钮', right: "addEventListener('click', ...)" }
  ]
})

const steps = computed(() => {
  if (current.value === 'html') {
    return [
      '浏览器读到 HTML：知道页面上有“标题/段落/按钮”。',
      '把它们先按默认规则摆出来（所以看起来很朴素）。',
      '下一步才轮到 CSS 和 JS。'
    ]
  }
  if (current.value === 'css') {
    return [
      '浏览器先把 HTML 结构摆好。',
      '再读取 CSS：给标题/段落/按钮套上颜色、字号、间距。',
      '重新绘制外观：你看到页面“变好看”。'
    ]
  }
  return [
    '页面先按 HTML+CSS 显示出来。',
    'JS 给按钮装上“点击开关”（事件监听）。',
    '你点击按钮时：JS 改按钮文字/计数，页面立即更新。'
  ]
})

const oneLine = computed(() => {
  if (current.value === 'html') return '先把“有哪些东西、是什么东西”说清楚。'
  if (current.value === 'css') return '在不改结构的前提下，把外观调到你想要的样子。'
  return '把“点击/输入”等行为接上逻辑，让页面能互动。'
})

// Keep the demo behavior: only JS mode should increment on click.
// We implement it by watching mode and only allowing clicks to increment in JS mode.
const increment = () => {
  if (current.value !== 'js') return
  clicks.value++
}
</script>

<style scoped>
.triad {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.title { font-weight: 800; font-size: 16px; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; margin-top: 4px; }

.modes { display: flex; gap: 8px; flex-wrap: wrap; }
.mode {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.mode:hover { background: var(--vp-c-bg-soft); }
.mode.active { 
  border-color: var(--vp-c-brand); 
  color: var(--vp-c-brand); 
  background: var(--vp-c-brand-dimm);
}

.preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s;
}

.hint { color: var(--vp-c-text-2); font-size: 13px; margin-bottom: 8px; }
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  margin-right: 12px;
  font-weight: 800;
  font-size: 12px;
  flex-shrink: 0;
}

.hero { margin: 0; cursor: pointer; display: flex; align-items: center; line-height: 1.4; }
.desc { margin: 0; color: var(--vp-c-text-2); cursor: pointer; display: flex; align-items: center; line-height: 1.5; }
.cta {
  width: fit-content;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: all 0.2s;
}

.selected {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 4px;
  border-radius: 4px;
}

.click-tip { margin-top: 6px; color: var(--vp-c-text-2); font-size: 13px; }

.preview.css .hero { color: #0ea5e9; }
.preview.css .desc { color: var(--vp-c-text-1); }
.preview.css .cta { background: #0ea5e9; color: #fff; border-color: #0ea5e9; box-shadow: 0 4px 12px rgba(14,165,233,0.25); }

.preview.js .cta { background: #22c55e; color: #fff; border-color: #22c55e; box-shadow: 0 4px 12px rgba(34,197,94,0.25); }
.preview.js { border-color: rgba(34, 197, 94, 0.4); }

.code-block { background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 16px; }
.code-title { font-weight: 700; margin-bottom: 8px; font-size: 13px; color: var(--vp-c-text-2); }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 8px; padding: 16px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; line-height: 1.6; }
.line { min-height: 1.6em; }
.hl { background: rgba(34, 197, 94, 0.2); border-radius: 4px; display: block; width: 100%; }

.explain { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
.card { background: var(--vp-c-bg); border: 1px dashed var(--vp-c-divider); border-radius: 10px; padding: 10px; }
.card-title { font-weight: 700; margin-bottom: 4px; }
.card-body { color: var(--vp-c-text-2); font-size: 13px; line-height: 1.5; }

.map { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.map-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
}
.map-row.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.left { font-weight: 800; }
.right { color: var(--vp-c-text-2); }
.steps { margin: 8px 0 0 18px; color: var(--vp-c-text-2); line-height: 1.6; }

.one-line {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
}
.one-line-title { font-weight: 800; }
.one-line-body { color: var(--vp-c-text-2); }
</style>
