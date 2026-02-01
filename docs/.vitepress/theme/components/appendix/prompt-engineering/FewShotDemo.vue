<!--
  FewShotDemo.vue
  Few-shot 速懂：不给示例 vs 给示例，AI 的“风格”会不会稳定？

  交互：
  - 选择目标风格（随意/正式）
  - 选择是否提供示例
  - 看提示词和输出如何变化
-->
<template>
  <el-card class="few-shot-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">示例的力量：让风格“跟你走”</h3>
          <p class="subtitle">你不是让 AI 更聪明，而是让它更像你要的样子。</p>
        </div>
        <div class="controls">
          <el-select v-model="tone" style="width: 140px">
            <el-option label="随意口语" value="casual" />
            <el-option label="正式书面" value="formal" />
          </el-select>
          <el-switch
            v-model="withExamples"
            active-text="提供示例"
            inactive-text="无示例"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </div>
      </div>
    </template>

    <div class="grid-layout">
      <el-card shadow="never" class="panel">
        <template #header>
          <div class="panel-header">提示词 / Prompt</div>
        </template>
        <div class="code-block">
          <pre><code>{{ prompt }}</code></pre>
        </div>
      </el-card>

      <el-card shadow="never" class="panel">
        <template #header>
          <div class="panel-header">AI 输出（示意）</div>
        </template>
        <div class="output-content">{{ output }}</div>
        <el-alert
          :title="hint"
          :type="withExamples ? 'success' : 'warning'"
          show-icon
          :closable="false"
          style="margin-top: 16px;"
        />
      </el-card>
    </div>

    <div class="examples-section" v-if="withExamples">
      <el-divider content-position="left">示例（AI 会“照着学”）</el-divider>
      <el-row :gutter="12">
        <el-col :span="8" v-for="e in examples" :key="e.in">
          <el-card shadow="hover" class="example-item" :body-style="{ padding: '12px' }">
            <div class="ex-in">输入：{{ e.in }}</div>
            <div class="ex-out">输出：{{ e.out }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
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
.few-shot-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.panel-header {
  font-weight: 600;
  font-size: 15px;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 12px;
  font-family: monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid var(--vp-c-divider);
}

.output-content {
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
  min-height: 60px;
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.example-item {
  font-size: 13px;
  margin-bottom: 8px;
}

.ex-in {
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.ex-out {
  font-weight: 600;
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
  }
  
  .controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
