<script setup>
import { ref } from 'vue'

const name = ref('张三')
const age = ref(25)
const isStudent = ref(true)
const showMessage = ref('')
const showSuccess = ref(false)

const modifyAge = () => {
  age.value = 26
  showMessage.value = '✅ let 变量可以修改值'
  showSuccess.value = true
  setTimeout(() => {
    showMessage.value = ''
    showSuccess.value = false
  }, 2000)
}

const modifyName = () => {
  showMessage.value = '❌ const 不能重新赋值'
  showSuccess.value = false
  setTimeout(() => {
    showMessage.value = ''
  }, 2000)
}

const reset = () => {
  name.value = '张三'
  age.value = 25
  isStudent.value = true
  showMessage.value = ''
}

const codeLines = ref([
  `const name = "张三"`,
  `let age = 25`,
  `const isStudent = true`
])

const executeCode = ref([])
</script>

<template>
  <div class="variable-box-demo">
    <h3>变量就像带名字的盒子</h3>

    <div class="boxes-container">
      <!-- 盒子 1: const name -->
      <div class="variable-box const-box">
        <div class="box-label">const name</div>
        <div class="box-value">{{ name }}</div>
        <div class="box-icon">🔒</div>
      </div>

      <!-- 盒子 2: let age -->
      <div class="variable-box let-box" :class="{ 'success': showSuccess && age === 26 }">
        <div class="box-label">let age</div>
        <div class="box-value">{{ age }}</div>
        <div class="box-icon">🔓</div>
      </div>

      <!-- 盒子 3: const isStudent -->
      <div class="variable-box const-box">
        <div class="box-label">const isStudent</div>
        <div class="box-value">{{ isStudent }}</div>
        <div class="box-icon">🔒</div>
      </div>
    </div>

    <div class="message-bubble" :class="{ 'error': !showSuccess, 'success': showSuccess }" v-if="showMessage">
      {{ showMessage }}
    </div>

    <div class="controls">
      <button @click="modifyAge" class="btn-primary">修改 age 为 26</button>
      <button @click="modifyName" class="btn-danger">修改 name 为李四</button>
      <button @click="reset" class="btn-secondary">重置</button>
    </div>

    <div class="code-display">
      <pre><code>const name = "张三"
let age = 25
const isStudent = true

{{ executeCode.join('\n') }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.variable-box-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.boxes-container {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.variable-box {
  position: relative;
  width: 120px;
  height: 120px;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.variable-box.success {
  border-color: #3eaf7c;
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.box-label {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.let-box .box-label {
  background: #42b983;
}

.box-value {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.box-icon {
  font-size: 16px;
}

.message-bubble {
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-bubble.error {
  background: #fee;
  color: #c00;
}

.message-bubble.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-danger {
  background: #f56565;
  color: white;
}

.btn-danger:hover {
  background: #e53e3e;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft-hover);
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
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

@media (max-width: 640px) {
  .boxes-container {
    flex-direction: column;
    align-items: center;
  }

  .variable-box {
    width: 200px;
  }

  .controls {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
