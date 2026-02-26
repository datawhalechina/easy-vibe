<template>
  <div class="cron-demo">
    <div class="header">
      <div class="title">Cron 表达式解析</div>
      <div class="subtitle">选择或输入 Cron 表达式，查看下次执行时间</div>
    </div>
    <div class="presets">
      <button v-for="p in presets" :key="p.expr" :class="['preset-btn', { active: expr === p.expr }]" @click="expr = p.expr">
        {{ p.label }}
      </button>
    </div>
    <div class="input-row">
      <input v-model="expr" class="cron-input" placeholder="* * * * *" />
      <button class="calc-btn" @click="calculate">计算</button>
    </div>
    <div class="result" v-if="nextRun">
      <div class="next-label">下次执行时间：</div>
      <div class="next-time">{{ nextRun }}</div>
    </div>
    <div class="desc">
      <div class="desc-title">字段说明：</div>
      <div class="desc-grid">
        <div class="desc-item"><span class="field">分</span> 0-59</div>
        <div class="desc-item"><span class="field">时</span> 0-23</div>
        <div class="desc-item"><span class="field">日</span> 1-31</div>
        <div class="desc-item"><span class="field">月</span> 1-12</div>
        <div class="desc-item"><span class="field">周</span> 0-6</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expr = ref('0 * * * *')
const nextRun = ref('')

const presets = [
  { label: '每小时', expr: '0 * * * *' },
  { label: '每天午夜', expr: '0 0 * * *' },
  { label: '每周一', expr: '0 0 * * 1' },
  { label: '每月1号', expr: '0 0 1 * *' },
  { label: '每5分钟', expr: '*/5 * * * *' },
]

function calculate() {
  const parts = expr.value.trim().split(/\s+/)
  if (parts.length !== 5) {
    nextRun.value = '请输入 5 个字段的 Cron 表达式'
    return
  }
  const now = new Date()
  const fieldNames = ['分钟', '小时', '日', '月', '星期']
  let desc = parts.map((p, i) => `${fieldNames[i]}: ${p}`).join('，')
  nextRun.value = `${now.toLocaleString()} 开始，${desc}`
}
</script>

<style scoped>
.cron-demo { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; }
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.presets { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.preset-btn { padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; }
.preset-btn.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.input-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.cron-input { flex: 1; padding: 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); font-family: var(--vp-font-family-mono); font-size: 1rem; }
.calc-btn { padding: 0.5rem 1rem; border-radius: 6px; background: var(--vp-c-brand); color: #fff; border: none; cursor: pointer; }
.result { padding: 1rem; background: var(--vp-c-bg); border-radius: 8px; margin-bottom: 1rem; }
.next-label { font-size: 0.9rem; color: var(--vp-c-text-2); }
.next-time { font-size: 1rem; font-weight: 600; color: var(--vp-c-brand); }
.desc { font-size: 0.85rem; }
.desc-title { font-weight: 600; margin-bottom: 0.5rem; }
.desc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 0.5rem; }
.desc-item { padding: 0.5rem; background: var(--vp-c-bg); border-radius: 4px; }
.field { font-weight: 600; color: var(--vp-c-brand); }
</style>
