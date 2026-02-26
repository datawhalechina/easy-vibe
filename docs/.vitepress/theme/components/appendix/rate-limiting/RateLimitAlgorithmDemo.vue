<!--
  RateLimitAlgorithmDemo.vue
  限流算法演示：令牌桶、漏桶、滑动窗口
-->
<template>
  <div class="rate-limit-demo">
    <div class="header">
      <div class="title">限流算法对比</div>
      <div class="subtitle">选择算法，点击"发送请求"观察效果</div>
    </div>

    <div class="algo-tabs">
      <button
        v-for="a in algorithms"
        :key="a.key"
        :class="['tab', { active: algo === a.key }]"
        @click="algo = a.key; reset()"
      >{{ a.label }}</button>
    </div>

    <div class="sim-area">
      <div class="controls">
        <button class="send-btn" @click="sendRequest">发送请求</button>
        <button class="burst-btn" @click="burstRequests">突发 10 个请求</button>
        <button class="reset-btn" @click="reset">重置</button>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat-label">通过</span>
          <span class="stat-value ok">{{ passed }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">拒绝</span>
          <span class="stat-value reject">{{ rejected }}</span>
        </div>
        <div class="stat" v-if="algo === 'token'">
          <span class="stat-label">剩余令牌</span>
          <span class="stat-value">{{ tokens }}</span>
        </div>
        <div class="stat" v-if="algo === 'leaky'">
          <span class="stat-label">桶中排队</span>
          <span class="stat-value">{{ bucketQueue }}</span>
        </div>
        <div class="stat" v-if="algo === 'sliding'">
          <span class="stat-label">窗口内请求</span>
          <span class="stat-value">{{ windowCount }}</span>
        </div>
      </div>

      <div class="log-area">
        <div
          v-for="(log, i) in logs.slice(-8)"
          :key="i"
          :class="['log-item', log.status]"
        >
          <span class="log-time">{{ log.time }}</span>
          <span>{{ log.msg }}</span>
        </div>
      </div>
    </div>

    <div class="algo-info">
      <div class="info-name">{{ currentAlgo.label }}</div>
      <div class="info-desc">{{ currentAlgo.desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const algo = ref('token')
const passed = ref(0)
const rejected = ref(0)
const tokens = ref(5)
const bucketQueue = ref(0)
const windowCount = ref(0)
const logs = ref([])

const algorithms = [
  { key: 'token', label: '令牌桶', desc: '以固定速率往桶里放令牌，每个请求消耗一个令牌。桶满时多余令牌丢弃。允许一定程度的突发流量（桶里有存量令牌时）。' },
  { key: 'leaky', label: '漏桶', desc: '请求先进入桶中排队，以固定速率从桶底"漏出"处理。桶满时新请求被拒绝。输出速率恒定，完全平滑流量。' },
  { key: 'sliding', label: '滑动窗口', desc: '统计最近 N 秒内的请求数，超过阈值则拒绝。比固定窗口更精确，避免窗口边界的突发问题。' }
]

const currentAlgo = computed(() => algorithms.find(a => a.key === algo.value))

// Token bucket: refill 1 token per second, max 5
let tokenTimer = null
function startTokenRefill() {
  if (tokenTimer) clearInterval(tokenTimer)
  tokenTimer = setInterval(() => {
    if (tokens.value < 5) tokens.value++
  }, 1000)
}

// Leaky bucket: drain 1 per second, max queue 5
let leakyTimer = null
function startLeakyDrain() {
  if (leakyTimer) clearInterval(leakyTimer)
  leakyTimer = setInterval(() => {
    if (bucketQueue.value > 0) {
      bucketQueue.value--
      passed.value++
      addLog('ok', '漏桶处理了一个排队请求')
    }
  }, 1000)
}

// Sliding window: max 5 per 3 seconds
const windowRequests = ref([])

function reset() {
  passed.value = 0
  rejected.value = 0
  tokens.value = 5
  bucketQueue.value = 0
  windowCount.value = 0
  logs.value = []
  windowRequests.value = []
  if (tokenTimer) clearInterval(tokenTimer)
  if (leakyTimer) clearInterval(leakyTimer)
  if (algo.value === 'token') startTokenRefill()
  if (algo.value === 'leaky') startLeakyDrain()
}

function addLog(status, msg) {
  const now = new Date()
  logs.value.push({ status, msg, time: now.toLocaleTimeString() })
}

function sendRequest() {
  if (algo.value === 'token') {
    if (tokens.value > 0) {
      tokens.value--
      passed.value++
      addLog('ok', `请求通过（剩余令牌: ${tokens.value}）`)
    } else {
      rejected.value++
      addLog('reject', '令牌不足，请求被拒绝 (429)')
    }
    if (!tokenTimer) startTokenRefill()
  } else if (algo.value === 'leaky') {
    if (bucketQueue.value < 5) {
      bucketQueue.value++
      addLog('ok', `请求进入排队（队列: ${bucketQueue.value}/5）`)
    } else {
      rejected.value++
      addLog('reject', '桶已满，请求被拒绝 (429)')
    }
    if (!leakyTimer) startLeakyDrain()
  } else {
    const now = Date.now()
    windowRequests.value = windowRequests.value.filter(t => now - t < 3000)
    windowCount.value = windowRequests.value.length
    if (windowCount.value < 5) {
      windowRequests.value.push(now)
      windowCount.value++
      passed.value++
      addLog('ok', `请求通过（窗口内: ${windowCount.value}/5）`)
    } else {
      rejected.value++
      addLog('reject', '窗口内请求数超限 (429)')
    }
  }
}

function burstRequests() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => sendRequest(), i * 80)
  }
}

onUnmounted(() => {
  if (tokenTimer) clearInterval(tokenTimer)
  if (leakyTimer) clearInterval(leakyTimer)
})
</script>

<style scoped>
.rate-limit-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.algo-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.controls { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.send-btn, .burst-btn, .reset-btn {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.send-btn { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.burst-btn { background: #f59e0b; color: #fff; border-color: #f59e0b; }
.stats { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
.stat { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; }
.stat-label { color: var(--vp-c-text-3); }
.stat-value { font-weight: 700; font-family: var(--vp-font-family-mono); }
.stat-value.ok { color: #22c55e; }
.stat-value.reject { color: #ef4444; }
.log-area { max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; }
.log-item {
  padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.8rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.log-item.ok { border-color: rgba(34,197,94,0.3); }
.log-item.reject { border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.03); }
.log-time { color: var(--vp-c-text-3); margin-right: 0.5rem; font-family: var(--vp-font-family-mono); }
.algo-info {
  margin-top: 1rem; padding: 0.75rem; border-radius: 8px;
  background: rgba(var(--vp-c-brand-rgb), 0.05); border: 1px solid var(--vp-c-brand);
}
.info-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem; }
.info-desc { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.6; }
</style>
