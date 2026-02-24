<template>
  <div class="decision-matrix-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">决策矩阵</span>
      <span class="subtitle">量化对比，科学选型</span>
    </div>

    <div class="section">
      <h6 class="section-title">待比较技术</h6>
      <div class="options-row">
        <span
          v-for="opt in options"
          :key="opt"
          class="option-tag"
        >
          {{ opt }}
          <button class="remove-btn" @click="removeOption(opt)">×</button>
        </span>
        <div v-if="options.length < 5" class="add-option">
          <input
            v-model="newOption"
            placeholder="添加技术..."
            class="add-input"
            @keyup.enter="addOption"
          />
          <button class="add-btn" @click="addOption">+</button>
        </div>
      </div>
    </div>

    <div class="section">
      <h6 class="section-title">评估维度与权重</h6>
      <div class="dimensions-list">
        <div
          v-for="dim in dimensions"
          :key="dim.key"
          class="dim-row"
        >
          <span class="dim-name">{{ dim.label }}</span>
          <input
            type="range"
            min="1"
            max="5"
            :value="weights[dim.key]"
            class="weight-slider"
            @input="weights[dim.key] = Number($event.target.value)"
          />
          <span class="weight-val">{{ weights[dim.key] }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h6 class="section-title">打分（1-5）</h6>
      <div class="score-table-wrapper">
        <table class="score-table">
          <thead>
            <tr>
              <th>维度</th>
              <th v-for="opt in options" :key="opt">{{ opt }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dim in dimensions" :key="dim.key">
              <td class="dim-cell">{{ dim.label }}</td>
              <td v-for="opt in options" :key="opt">
                <div class="score-btns">
                  <button
                    v-for="s in 5"
                    :key="s"
                    class="score-btn"
                    :class="{ active: scores[opt]?.[dim.key] >= s }"
                    @click="setScore(opt, dim.key, s)"
                  >
                    {{ s }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="hasAllScores" class="section results">
      <h6 class="section-title">加权总分排名</h6>
      <div class="bar-chart">
        <div
          v-for="(r, i) in ranked"
          :key="r.name"
          class="bar-row"
        >
          <span class="bar-rank" :class="{ first: i === 0 }">
            {{ i === 0 ? '🏆' : `#${i + 1}` }}
          </span>
          <span class="bar-name">{{ r.name }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: (r.score / maxScore) * 100 + '%',
                background: barColors[i % barColors.length]
              }"
            />
          </div>
          <span class="bar-score">{{ r.score.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="reset-btn" @click="resetAll">重置全部</button>
      <button class="preset-btn" @click="loadPreset">加载预设</button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>使用方法：</strong>
      调整权重反映你的项目优先级，为每个技术在各维度打分，系统自动计算加权总分。权重越高的维度对最终结果影响越大。
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const barColors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']

const dimensions = [
  { key: 'learning', label: '学习曲线' },
  { key: 'ecosystem', label: '生态系统' },
  { key: 'performance', label: '性能' },
  { key: 'community', label: '社区活跃度' },
  { key: 'hiring', label: '招聘难度' }
]

const options = ref(['React', 'Vue', 'Svelte'])
const newOption = ref('')
const weights = reactive({
  learning: 3,
  ecosystem: 4,
  performance: 3,
  community: 3,
  hiring: 2
})

const scores = reactive({
  React: { learning: 3, ecosystem: 5, performance: 4, community: 5, hiring: 4 },
  Vue: { learning: 4, ecosystem: 4, performance: 4, community: 4, hiring: 3 },
  Svelte: { learning: 5, ecosystem: 2, performance: 5, community: 3, hiring: 1 }
})

const addOption = () => {
  const name = newOption.value.trim()
  if (name && !options.value.includes(name) && options.value.length < 5) {
    options.value.push(name)
    scores[name] = {}
    newOption.value = ''
  }
}

const removeOption = (opt) => {
  if (options.value.length <= 2) return
  options.value = options.value.filter((o) => o !== opt)
  delete scores[opt]
}

const setScore = (opt, dim, val) => {
  if (!scores[opt]) scores[opt] = {}
  scores[opt][dim] = val
}

const hasAllScores = computed(() => {
  return options.value.every((opt) =>
    dimensions.every((dim) => scores[opt]?.[dim.key])
  )
})

const ranked = computed(() => {
  return options.value
    .map((opt) => {
      let total = 0
      dimensions.forEach((dim) => {
        total += (scores[opt]?.[dim.key] || 0) * weights[dim.key]
      })
      return { name: opt, score: total }
    })
    .sort((a, b) => b.score - a.score)
})

const maxScore = computed(() => {
  return Math.max(...ranked.value.map((r) => r.score), 1)
})

const resetAll = () => {
  options.value = ['React', 'Vue', 'Svelte']
  Object.keys(scores).forEach((k) => delete scores[k])
  Object.assign(weights, { learning: 3, ecosystem: 4, performance: 3, community: 3, hiring: 2 })
}

const loadPreset = () => {
  options.value = ['React', 'Vue', 'Svelte']
  Object.keys(scores).forEach((k) => delete scores[k])
  Object.assign(scores, {
    React: { learning: 3, ecosystem: 5, performance: 4, community: 5, hiring: 4 },
    Vue: { learning: 4, ecosystem: 4, performance: 4, community: 4, hiring: 3 },
    Svelte: { learning: 5, ecosystem: 2, performance: 5, community: 3, hiring: 1 }
  })
}
</script>

<style scoped>
.decision-matrix-demo {
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

.demo-header .icon { font-size: 1.25rem }
.demo-header .title { font-weight: bold; font-size: 1rem }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem }

.section {
  margin-bottom: 0.75rem;
}

.section-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.options-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.option-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 0.15rem;
}

.remove-btn:hover { color: #fff }

.add-option {
  display: flex;
  gap: 0.25rem;
}

.add-input {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  width: 120px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.add-btn {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.dimensions-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.dim-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dim-name {
  width: 80px;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.weight-slider {
  flex: 1;
  accent-color: var(--vp-c-brand);
}

.weight-val {
  width: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

.score-table-wrapper {
  overflow-x: auto;
}

.score-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.score-table th,
.score-table td {
  padding: 0.4rem 0.5rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.score-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.dim-cell {
  text-align: left !important;
  font-weight: 500;
}

.score-btns {
  display: flex;
  gap: 2px;
  justify-content: center;
}

.score-btn {
  width: 24px;
  height: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.15s;
  color: var(--vp-c-text-2);
}

.score-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.results {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-brand);
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-rank {
  width: 32px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.bar-rank.first {
  font-size: 1.1rem;
}

.bar-name {
  width: 60px;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 22px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.bar-score {
  width: 40px;
  text-align: right;
  font-weight: bold;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.reset-btn,
.preset-btn {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.preset-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.reset-btn:hover { background: var(--vp-c-bg-alt) }
.preset-btn:hover { opacity: 0.9 }

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem }
</style>
