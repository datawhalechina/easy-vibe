<!--
  CgiQueueDemo.vue
  物理服务器/CGI 时代的排队与响应时间演示
-->
<template>
  <div class="cgi-demo">
    <div class="panel">
      <div class="panel-header">
        <div class="title">CGI 串行处理：排队效应</div>
        <div class="subtitle">请求越多，响应越慢</div>
      </div>

      <div class="controls">
        <label>
          并发用户：<strong>{{ concurrentUsers }}</strong>
        </label>
        <input
          v-model="concurrentUsers"
          type="range"
          min="1"
          max="200"
          step="1"
        />

        <div class="toggles">
          <label class="toggle">
            <input v-model="staticCache" type="checkbox" />
            启用静态缓存 (减少脚本开销)
          </label>
          <button class="burst" @click="simulateBurst">模拟秒杀</button>
        </div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="label">平均响应时间</div>
          <div class="value">{{ avgResponse }} ms</div>
          <div class="meter">
            <div class="bar" :style="{ width: responseBar + '%' }"></div>
          </div>
        </div>
        <div class="stat">
          <div class="label">排队请求数</div>
          <div class="value">{{ queueLength }}</div>
          <div class="meter">
            <div class="bar warn" :style="{ width: queueBar + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="note">
        <span class="dot" :class="statusClass"></span>
        <span>{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const concurrentUsers = ref(24)
const staticCache = ref(false)

const baseLatency = computed(() => (staticCache.value ? 40 : 80))
const perRequestCost = computed(() => (staticCache.value ? 25 : 60))

const avgResponse = computed(() =>
  Math.round(
    baseLatency.value + (concurrentUsers.value - 1) * perRequestCost.value
  )
)

const queueLength = computed(() => Math.max(0, concurrentUsers.value - 1))

const responseBar = computed(() =>
  Math.min(100, Math.round(avgResponse.value / 25))
)
const queueBar = computed(() =>
  Math.min(100, Math.round((queueLength.value / 200) * 100))
)

const statusClass = computed(() => {
  if (avgResponse.value < 800) return 'ok'
  if (avgResponse.value < 3000) return 'warn'
  return 'danger'
})

const statusText = computed(() => {
  if (avgResponse.value < 800) return '系统还扛得住，但已经在排队了'
  if (avgResponse.value < 3000) return '响应变慢，用户开始抱怨'
  return '排队爆炸，网站接近不可用'
})

const simulateBurst = () => {
  const original = concurrentUsers.value
  concurrentUsers.value = 160
  setTimeout(() => {
    concurrentUsers.value = original
  }, 800)
}
</script>

<style scoped>
.cgi-demo {
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.panel {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.panel-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.controls label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.controls input[type='range'] {
  width: 100%;
}

.toggles {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.toggle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.burst {
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--vp-c-brand);
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.stat .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.stat .value {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
}

.meter {
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #14b8a6);
}

.bar.warn {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
}

.dot.warn {
  background: #f59e0b;
}

.dot.danger {
  background: #ef4444;
}

@media (max-width: 720px) {
  .toggles {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
