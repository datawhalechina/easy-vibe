<!--
  MonolithReleaseRiskDemo.vue
  单体发布的影响面与风险演示
-->
<template>
  <div class="release-demo">
    <div class="header">
      <div class="title">单体发布：牵一发而动全身</div>
      <div class="subtitle">选择修改范围，看看“爆炸半径”</div>
    </div>

    <div class="content">
      <div class="modules">
        <div class="section-title">本次改动涉及</div>
        <div class="module-grid">
          <button
            v-for="module in modules"
            :key="module.key"
            class="module-btn"
            :class="{ active: module.active }"
            @click="toggleModule(module.key)"
          >
            {{ module.label }}
          </button>
        </div>

        <div class="slider">
          <label>
            改动规模：<strong>{{ changeSizeLabel }}</strong>
          </label>
          <input v-model="changeSize" type="range" min="1" max="5" step="1" />
        </div>
      </div>

      <div class="result">
        <div class="risk-meter">
          <div class="risk-title">故障概率</div>
          <div class="risk-value">{{ riskPercent }}%</div>
          <div class="meter">
            <div class="bar" :style="{ width: riskPercent + '%' }"></div>
          </div>
        </div>

        <button class="deploy-btn" @click="deployRelease">模拟发布</button>
        <div class="status" :class="deployStatusClass">
          {{ deployStatus }}
        </div>

        <div class="history">
          <div class="section-title">最近 3 次发布</div>
          <ul>
            <li v-for="(item, index) in deployHistory" :key="index">
              {{ item }}
            </li>
            <li v-if="deployHistory.length === 0">暂无记录</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const modules = ref([
  { key: 'user', label: '用户', active: true },
  { key: 'order', label: '订单', active: true },
  { key: 'payment', label: '支付', active: false },
  { key: 'product', label: '商品', active: false }
])

const changeSize = ref(3)
const deployHistory = ref([])
const deployStatus = ref('等待发布...')
const deployStatusClass = ref('idle')

const activeModules = computed(
  () => modules.value.filter((m) => m.active).length
)

const riskPercent = computed(() => {
  const base = 8
  const moduleRisk = activeModules.value * 12
  const changeRisk = changeSize.value * 6
  return Math.min(95, base + moduleRisk + changeRisk)
})

const changeSizeLabel = computed(() => {
  const labels = ['很小', '小', '中等', '大', '特大']
  return labels[changeSize.value - 1] || '中等'
})

const toggleModule = (key) => {
  const target = modules.value.find((m) => m.key === key)
  if (!target) return
  target.active = !target.active
}

const deployRelease = () => {
  const roll = Math.random() * 100
  if (roll < riskPercent.value) {
    deployStatus.value = `发布失败：全站回滚，用时 ${8 + changeSize.value * 4} 分钟`
    deployStatusClass.value = 'fail'
  } else {
    deployStatus.value = '发布成功：流量切换完成'
    deployStatusClass.value = 'success'
  }

  const summary = `${new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })} - ${deployStatus.value}`
  deployHistory.value.unshift(summary)
  deployHistory.value = deployHistory.value.slice(0, 3)
}
</script>

<style scoped>
.release-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.25rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.section-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

.module-btn {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.module-btn.active {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #1d4ed8;
}

.slider label {
  display: block;
  margin: 1rem 0 0.5rem;
  font-size: 0.9rem;
}

.slider input[type='range'] {
  width: 100%;
}

.risk-meter {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.risk-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.risk-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.35rem 0 0.75rem;
}

.meter {
  height: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.deploy-btn {
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0.6rem;
  background: var(--vp-c-brand);
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.status {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
}

.status.success {
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.4);
}

.status.fail {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.history {
  margin-top: 1rem;
}

.history ul {
  padding-left: 1rem;
  margin: 0.25rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 720px) {
  .module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
