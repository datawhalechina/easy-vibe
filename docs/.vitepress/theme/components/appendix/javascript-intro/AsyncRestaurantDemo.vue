<script setup>
import { ref } from 'vue'

const mode = ref('sync')
const isRunning = ref(false)
const elapsedTime = ref(0)
const customerA = ref({ time: 2, status: 'waiting' })
const customerB = ref({ time: 3, status: 'waiting' })
const customerC = ref({ time: 5, status: 'waiting' })

const modes = [
  { value: 'sync', label: '同步模式 🐢' },
  { value: 'async', label: '异步模式 ⚡' }
]

const reset = () => {
  elapsedTime.value = 0
  customerA.value = { time: 2, status: 'waiting' }
  customerB.value = { time: 3, status: 'waiting' }
  customerC.value = { time: 5, status: 'waiting' }
}

const start = async () => {
  if (isRunning.value) return
  isRunning.value = true
  reset()

  if (mode.value === 'sync') {
    // 同步模式：依次执行
    await processCustomer(customerA, 2000)
    await processCustomer(customerB, 3000)
    await processCustomer(customerC, 5000)
  } else {
    // 异步模式：同时执行
    await Promise.all([
      processCustomer(customerA, 2000),
      processCustomer(customerB, 3000),
      processCustomer(customerC, 5000)
    ])
  }

  isRunning.value = false
}

const processCustomer = async (customer, realTime) => {
  customer.status = 'cooking'
  await new Promise(resolve => setTimeout(resolve, realTime))
  customer.status = 'done'
}
</script>

<template>
  <div class="async-restaurant-demo">
    <h3>异步：同步 vs 异步</h3>

    <div class="mode-selector">
      <button
        v-for="m in modes"
        :key="m.value"
        :class="{ 'active': mode === m.value }"
        class="mode-btn"
        :disabled="isRunning"
        @click="mode = m.value"
      >
        {{ m.label }}
      </button>
    </div>

    <div class="restaurant-scene">
      <!-- 厨房 -->
      <div class="kitchen">
        <h4>厨房</h4>
        <div class="stoves">
          <div
            class="stove"
            :class="{ 'cooking': customerA.status === 'cooking', 'done': customerA.status === 'done' }"
          >
            <div class="stove-label">
              灶位 1
            </div>
            <div class="stove-content">
              <div
                v-if="customerA.status === 'cooking'"
                class="cooking-text"
              >
                煮面 {{ customerA.time }}s
              </div>
              <div
                v-if="customerA.status === 'done'"
                class="done-text"
              >
                ✅ 完成
              </div>
              <div
                v-if="customerA.status === 'waiting'"
                class="waiting-text"
              >
                空闲
              </div>
            </div>
          </div>
          <div
            class="stove"
            :class="{ 'cooking': customerB.status === 'cooking', 'done': customerB.status === 'done' }"
          >
            <div class="stove-label">
              灶位 2
            </div>
            <div class="stove-content">
              <div
                v-if="customerB.status === 'cooking'"
                class="cooking-text"
              >
                炒饭 {{ customerB.time }}s
              </div>
              <div
                v-if="customerB.status === 'done'"
                class="done-text"
              >
                ✅ 完成
              </div>
              <div
                v-if="customerB.status === 'waiting'"
                class="waiting-text"
              >
                空闲
              </div>
            </div>
          </div>
          <div
            class="stove"
            :class="{ 'cooking': customerC.status === 'cooking', 'done': customerC.status === 'done' }"
          >
            <div class="stove-label">
              灶位 3
            </div>
            <div class="stove-content">
              <div
                v-if="customerC.status === 'cooking'"
                class="cooking-text"
              >
                烤鱼 {{ customerC.time }}s
              </div>
              <div
                v-if="customerC.status === 'done'"
                class="done-text"
              >
                ✅ 完成
              </div>
              <div
                v-if="customerC.status === 'waiting'"
                class="waiting-text"
              >
                空闲
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 顾客 -->
      <div class="customers">
        <h4>顾客</h4>
        <div class="customer-list">
          <div
            class="customer"
            :class="{ 'served': customerA.status === 'done' }"
          >
            <div class="customer-avatar">
              👤
            </div>
            <div class="customer-info">
              <div class="customer-name">
                顾客 A
              </div>
              <div class="customer-order">
                煮面 ({{ customerA.time }}秒)
              </div>
            </div>
            <div
              v-if="customerA.status === 'done'"
              class="check-mark"
            >
              ✅
            </div>
          </div>
          <div
            class="customer"
            :class="{ 'served': customerB.status === 'done' }"
          >
            <div class="customer-avatar">
              👤
            </div>
            <div class="customer-info">
              <div class="customer-name">
                顾客 B
              </div>
              <div class="customer-order">
                炒饭 ({{ customerB.time }}秒)
              </div>
            </div>
            <div
              v-if="customerB.status === 'done'"
              class="check-mark"
            >
              ✅
            </div>
          </div>
          <div
            class="customer"
            :class="{ 'served': customerC.status === 'done' }"
          >
            <div class="customer-avatar">
              👤
            </div>
            <div class="customer-info">
              <div class="customer-name">
                顾客 C
              </div>
              <div class="customer-order">
                烤鱼 ({{ customerC.time }}秒)
              </div>
            </div>
            <div
              v-if="customerC.status === 'done'"
              class="check-mark"
            >
              ✅
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        :disabled="isRunning"
        class="btn-start"
        @click="start"
      >
        {{ isRunning ? '执行中...' : '开始' }}
      </button>
      <button
        :disabled="isRunning"
        class="btn-reset"
        @click="reset"
      >
        重置
      </button>
    </div>

    <div
      v-if="!isRunning && (customerA.status === 'done' || customerB.status === 'done')"
      class="comparison"
    >
      <div class="comparison-item">
        <strong>同步模式：</strong> 10 秒（依次执行）
      </div>
      <div class="comparison-item">
        <strong>异步模式：</strong> 约 5 秒（同时执行）
      </div>
      <div class="tip">
        JavaScript 用的就是异步模式——遇到耗时操作（如网络请求），不会傻等，而是先去做别的事。
      </div>
    </div>

    <div class="code-display">
      <h4>代码对比</h4>
      <div class="code-comparison">
        <div class="code-block">
          <h5>同步（阻塞）</h5>
          <pre><code>console.log("1")
console.log("2")  // 等上面执行完
console.log("3")
// 输出：1, 2, 3</code></pre>
        </div>
        <div class="code-block">
          <h5>异步（不阻塞）</h5>
          <pre><code>console.log("1")
setTimeout(() => console.log("2"), 1000)
console.log("3")
// 输出：1, 3, 2</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.async-restaurant-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mode-selector {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

.mode-btn {
  padding: 10px 20px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.mode-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.mode-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.restaurant-scene {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .restaurant-scene {
    grid-template-columns: 1fr;
  }
}

.kitchen, .customers {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stoves {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stove {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.stove.cooking {
  border-color: #ed8936;
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(237, 137, 54, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(237, 137, 54, 0); }
}

.stove.done {
  border-color: #38a169;
}

.stove-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 60px;
}

.stove-content {
  flex: 1;
  font-size: 13px;
}

.cooking-text {
  color: #ed8936;
  font-weight: 500;
}

.done-text {
  color: #38a169;
  font-weight: 600;
}

.waiting-text {
  color: var(--vp-c-text-3);
}

.customer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.customer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.customer.served {
  border-color: #38a169;
}

.customer-avatar {
  font-size: 32px;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.customer-order {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.check-mark {
  font-size: 24px;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-start {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-start:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn-start:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-reset:hover:not(:disabled) {
  background: var(--vp-c-bg-soft-hover);
}

.comparison {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.comparison-item {
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.comparison-item:last-child {
  margin-bottom: 0;
}

.tip {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-border);
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.code-block h5 {
  color: #d4d4d4;
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #d4d4d4;
}
</style>
