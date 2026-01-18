<!--
  FewShotDemo.vue
  Few-shot 速懂：不给示例 vs 给示例，AI 的“风格”会不会稳定？

  交互：
  - 选择目标风格（随意/正式）
  - 选择是否提供示例
  - 看提示词和输出如何变化
-->
<template>
  <div class="few">
    <div class="header">
      <div>
        <div class="title">示例的力量：让风格“跟你走”</div>
        <div class="subtitle">你不是让 AI 更聪明，而是让它更像你要的样子。</div>
      </div>
      <div class="controls">
        <select v-model="tone">
          <option value="casual">随意口语</option>
          <option value="formal">正式书面</option>
        </select>
        <button
          :class="['toggle', { active: withExamples }]"
          @click="withExamples = !withExamples"
        >
          {{ withExamples ? '已提供示例' : '不提供示例' }}
        </button>
      </div>
    </div>

    <div class="grid">
      <div class="panel">
        <div class="panel-title">提示词 / Prompt</div>
        <pre><code>{{ prompt }}</code></pre>
      </div>
      <div class="panel">
        <div class="panel-title">AI 输出（示意）</div>
        <div class="output">{{ output }}</div>
        <div class="hint">{{ hint }}</div>
      </div>
    </div>

    <div class="examples" v-if="withExamples">
      <div class="examples-title">示例（AI 会“照着学”）</div>
      <div class="examples-grid">
        <div class="ex" v-for="e in examples" :key="e.in">
          <div class="in">输入：{{ e.in }}</div>
          <div class="out">输出：{{ e.out }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tone = ref('casual')
const withExamples = ref(true)

const examples = computed(() => {
  if (tone.value === 'casual') {
    return [
      { in: '你好', out: 'Hi～' },
      { in: '谢谢', out: '谢啦！' },
      { in: '再见', out: '拜拜～' }
    ]
  }
  return [
    { in: '你好', out: '您好。' },
    { in: '谢谢', out: '非常感谢。' },
    { in: '再见', out: '再见，祝您一切顺利。' }
  ]
})

const prompt = computed(() => {
  const base = '将中文翻译成英文。'
  const task = '输入：我很好'
  if (!withExamples.value) return `${base}\n${task}`
  const lines = [base, '示例：']
  for (const e of examples.value) {
    lines.push(`- ${e.in} -> ${e.out}`)
  }
  lines.push(task)
  return lines.join('\n')
})

const output = computed(() => {
  if (!withExamples.value) {
    return tone.value === 'casual' ? "I'm fine." : 'I am fine.'
  }
  return tone.value === 'casual' ? "I'm good!" : 'I am doing well.'
})

const hint = computed(() => {
  if (!withExamples.value) return '没有示例：AI 可能随便选一种语气。'
  return '有示例：AI 更容易“保持同一种语气”。'
})
</script>

<style scoped>
.few {
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
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.toggle {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.toggle.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.panel-title {
  font-weight: 700;
}
pre {
  margin: 0;
  background: #0b1221;
  color: #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
}
.output {
  white-space: pre-wrap;
  line-height: 1.6;
}
.hint {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.examples {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}
.examples-title {
  font-weight: 700;
  margin-bottom: 8px;
}
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.ex {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
}
.in {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.out {
  font-weight: 700;
  margin-top: 4px;
}
</style>
