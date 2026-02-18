<script setup>
import { ref } from 'vue'

const price = ref(100)
const discount = ref(0.8)
const result = ref(null)
const isRunning = ref(false)
const functionType = ref('arrow') // 'declaration', 'expression', 'arrow'

const functionTypes = [
  { value: 'declaration', label: 'function 声明' },
  { value: 'expression', label: '函数表达式' },
  { value: 'arrow', label: '箭头函数' }
]

const execute = async () => {
  if (isRunning.value) return
  isRunning.value = true
  result.value = null

  // 模拟处理动画
  await new Promise(resolve => setTimeout(resolve, 500))

  result.value = price.value * discount.value
  isRunning.value = false
}

const currentCode = ref(`const calculatePrice = (price, discount) => {
  return price * discount
}`)
</script>

<template>
  <div class="function-machine-demo">
    <h3>函数就像一台机器</h3>

    <div class="pipeline">
      <!-- 输入区 -->
      <div class="pipeline-section input-section">
        <h4>参数（输入）</h4>
        <div class="input-group">
          <label>
            价格:
            <input
              v-model.number="price"
              type="number"
              min="0"
              :disabled="isRunning"
            >
          </label>
          <label>
            折扣:
            <select
              v-model.number="discount"
              :disabled="isRunning"
            >
              <option :value="0.8">8 折 (0.8)</option>
              <option :value="0.5">5 折 (0.5)</option>
              <option :value="0.7">7 折 (0.7)</option>
            </select>
          </label>
        </div>
      </div>

      <!-- 机器区 -->
      <div class="pipeline-section machine-section">
        <h4>函数</h4>
        <div class="machine">
          <div class="machine-label">
            calculatePrice
          </div>
          <div class="machine-code">
            <pre v-if="functionType === 'declaration'"><code>return price * discount</code></pre>
            <pre v-else-if="functionType === 'expression'"><code>return price * discount</code></pre>
            <pre v-else><code>price * discount</code></pre>
          </div>
        </div>

        <div class="function-type-selector">
          <button
            v-for="type in functionTypes"
            :key="type.value"
            :class="{ active: functionType === type.value }"
            class="type-btn"
            @click="functionType = type.value"
          >
            {{ type.label }}
          </button>
        </div>
        <div
          v-if="functionType !== 'arrow'"
          class="tip"
        >
          ✏️ 写法不同，但做的事一模一样
        </div>
      </div>

      <!-- 输出区 -->
      <div class="pipeline-section output-section">
        <h4>返回值（输出）</h4>
        <div
          class="output-display"
          :class="{ 'processing': isRunning }"
        >
          <div
            v-if="result === null"
            class="placeholder"
          >
            ?
          </div>
          <div
            v-else
            class="result"
          >
            ¥{{ result.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        :disabled="isRunning"
        class="btn-execute"
        @click="execute"
      >
        {{ isRunning ? '处理中...' : '执行 ▶' }}
      </button>
    </div>

    <div class="code-display">
      <h4>当前函数定义</h4>
      <pre><code v-if="functionType === 'declaration'">function calculatePrice(price, discount) {
  return price * discount
}</code>
      <code v-else-if="functionType === 'expression'">const calculatePrice = function(price, discount) {
  return price * discount
}</code>
      <code v-else>const calculatePrice = (price, discount) => {
  return price * discount
}

// 或者更简洁：
const calculatePrice = (price, discount) => price * discount</code></pre>
    </div>
  </div>
</template>

<style scoped>
.function-machine-demo {
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

h4 {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.pipeline {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .pipeline {
    flex-direction: column;
  }
}

.pipeline-section {
  flex: 1;
  min-width: 200px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

input, select {
  padding: 6px 8px;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

input:disabled, select:disabled {
  opacity: 0.6;
}

.machine {
  background: var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
  color: white;
  text-align: center;
}

.machine-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.9;
}

.machine-code pre {
  margin: 0;
}

.machine-code code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: white;
}

.function-type-selector {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.type-btn {
  flex: 1;
  min-width: 100px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn:hover {
  background: var(--vp-c-bg-soft);
}

.type-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.output-display {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 24px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
}

.output-display.processing {
  border-color: var(--vp-c-brand-1);
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(62, 175, 124, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(62, 175, 124, 0); }
}

.placeholder {
  color: var(--vp-c-text-3);
  font-size: 32px;
}

.result {
  color: var(--vp-c-brand-1);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-execute {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-execute:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.btn-execute:active:not(:disabled) {
  transform: scale(0.95);
}

.btn-execute:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin-bottom: 12px;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
