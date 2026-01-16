<!--
  PromptQuickStartDemo.vue
  提示词“先玩后讲”快速体验：同一任务，切换提示词写法，看输出质量变化。

  交互：
  - 选择任务（写文案/总结/写代码）
  - 选择提示词等级（随口一句 / 清晰版 / 专业版）
  - 展示“你写的提示词”和“AI 输出”，并提示改进点
-->
<template>
  <div class="quick">
    <div class="header">
      <div>
        <div class="title">先玩一下：同一个需求，换一种说法</div>
        <div class="subtitle">你改的不是“字数”，而是“边界”和“标准”。</div>
      </div>
      <div class="controls">
        <select v-model="taskId">
          <option v-for="t in tasks" :key="t.id" :value="t.id">
            {{ t.label }}
          </option>
        </select>
        <div class="levels">
          <button
            v-for="l in levels"
            :key="l.id"
            :class="['level', { active: levelId === l.id }]"
            @click="levelId = l.id"
          >
            {{ l.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">提示词 / Prompt</div>
        <pre><code>{{ prompt }}</code></pre>
        <div class="hint">{{ promptHint }}</div>
      </div>
      <div class="panel">
        <div class="panel-title">AI 输出 / Output（示意）</div>
        <div class="output">{{ output }}</div>
        <div class="hint">{{ outputHint }}</div>
      </div>
    </div>

    <div class="tips">
      <div class="tip" v-for="t in tips" :key="t.title">
        <div class="tip-title">{{ t.title }}</div>
        <div class="tip-body">{{ t.body }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tasks = [
  { id: 'copy', label: '写一段小红书文案' },
  { id: 'summary', label: '把一段文字总结成要点' },
  { id: 'code', label: '写一个小函数' }
]

const levels = [
  { id: 'vague', label: '随口一句' },
  { id: 'clear', label: '清晰版' },
  { id: 'pro', label: '专业版' }
]

const taskId = ref('copy')
const levelId = ref('vague')

const prompt = computed(() => {
  if (taskId.value === 'copy') {
    if (levelId.value === 'vague') return '写个咖啡杯文案'
    if (levelId.value === 'clear')
      return '写一段小红书风格文案，主题：保温咖啡杯。语气：轻松。长度：120-160 字。'
    return `你是小红书资深种草博主。\n任务：写一段保温咖啡杯的种草文案。\n受众：通勤上班族。\n要求：\n- 120-160 字\n- 3 个卖点（颜值/密封/保温）\n- 结尾加一句行动号召\n输出：一段中文文案，不要标题。`
  }
  if (taskId.value === 'summary') {
    if (levelId.value === 'vague') return '帮我总结一下这段文字'
    if (levelId.value === 'clear')
      return '把下面内容总结成 3-5 个要点，每点不超过 15 个字。'
    return `任务：把输入文本总结成要点。\n要求：\n- 5 个以内\n- 每点 <= 15 字\n- 只输出要点列表，不要解释\n格式：Markdown 无序列表`
  }
  // code
  if (levelId.value === 'vague') return '写个排序函数'
  if (levelId.value === 'clear')
    return '用 JavaScript 写一个快速排序函数，并给一个使用示例。'
  return `你是资深前端工程师。\n任务：实现 quickSort(arr)。\n要求：\n- 纯函数（不修改原数组）\n- 处理重复值\n- 代码加简短注释\n- 给一个示例输入输出\n输出：只给 JS 代码块`
})

const output = computed(() => {
  if (taskId.value === 'copy') {
    if (levelId.value === 'vague') return '这是一款很好用的咖啡杯，适合日常使用...'
    if (levelId.value === 'clear')
      return '早八通勤救星！这只保温杯颜值在线，放包里不漏，热咖啡到下午还温温的...'
    return '通勤党必备！奶油配色超耐看，密封圈一拧就稳，放包里也不怕洒；保温够久，早上冲的拿铁下午还是温热...想要链接评论区见～'
  }
  if (taskId.value === 'summary') {
    if (levelId.value === 'vague') return '这段文字主要讲了……（可能很长）'
    if (levelId.value === 'clear')
      return '- 核心观点 1\n- 核心观点 2\n- 核心观点 3'
    return '- 关键结论\n- 主要原因\n- 影响范围\n- 建议行动'
  }
  // code
  if (levelId.value === 'vague') return 'function sort(arr) { /* ... */ }'
  if (levelId.value === 'clear')
    return 'function quickSort(arr) { /* ... */ }\nconsole.log(quickSort([3,1,2]))'
  return `function quickSort(arr) {\n  const a = [...arr]\n  if (a.length <= 1) return a\n  const pivot = a[0]\n  const left = a.slice(1).filter(x => x < pivot)\n  const right = a.slice(1).filter(x => x >= pivot)\n  return [...quickSort(left), pivot, ...quickSort(right)]\n}\n\nconsole.log(quickSort([3, 1, 2, 2])) // [1,2,2,3]`
})

const promptHint = computed(() => {
  if (levelId.value === 'vague') return '问题：AI 不知道你要什么标准。'
  if (levelId.value === 'clear') return '好一点：有风格/长度，但仍缺少“检查标准”。'
  return '最好：角色 + 任务 + 要求 + 输出格式，AI 很难跑偏。'
})

const outputHint = computed(() => {
  if (levelId.value === 'vague') return '常见结果：泛泛而谈、风格不稳、格式不对。'
  if (levelId.value === 'clear') return '常见结果：更像你要的，但细节/格式可能还会飘。'
  return '常见结果：风格稳定、结构清晰、可直接复制使用。'
})

const tips = computed(() => {
  if (levelId.value === 'vague') {
    return [
      { title: '先补 3 件事', body: '你要做什么？给谁看？最后要什么格式？' },
      { title: '别怕写长', body: '长不是目的，“可检查”才是目的。' }
    ]
  }
  if (levelId.value === 'clear') {
    return [
      { title: '再加一条', body: '加“输出格式”或“要点数量”，能明显更稳。' },
      { title: '再加一个例子', body: '给 1 个示例，AI 会更像你的口吻。' }
    ]
  }
  return [
    { title: '记住模板', body: '角色 / 任务 / 输入 / 要求 / 输出格式。' },
    { title: '写完就测', body: '同一输入跑 2-3 次，看是否稳定。' }
  ]
})
</script>

<style scoped>
.quick {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.title { font-weight: 800; }
.subtitle { color: var(--vp-c-text-2); font-size: 13px; }

.controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.levels { display: flex; gap: 8px; flex-wrap: wrap; }
.level {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.level.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 12px; }
.panel-title { font-weight: 700; margin-bottom: 6px; }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 8px; padding: 12px; font-family: var(--vp-font-family-mono); font-size: 13px; overflow-x: auto; white-space: pre-wrap; }
.output { color: var(--vp-c-text-1); white-space: pre-wrap; line-height: 1.6; }
.hint { margin-top: 6px; color: var(--vp-c-text-2); font-size: 13px; }

.tips { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
.tip { background: var(--vp-c-bg); border: 1px dashed var(--vp-c-divider); border-radius: 10px; padding: 10px; }
.tip-title { font-weight: 700; margin-bottom: 4px; }
.tip-body { color: var(--vp-c-text-2); font-size: 13px; line-height: 1.5; }
</style>

