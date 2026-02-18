<script setup>
import { ref } from 'vue'

// 泛型函数演示
const inputValue = ref('')
const selectedType = ref('number')
const result = ref(null)
const showResult = ref(false)

// 泛型数组反转（不使用 TypeScript 泛型语法）
function reverseArray(arr) {
  return [...arr].reverse()
}

// 执行反转操作
const executeReverse = () => {
  if (!inputValue.value) {
    result.value = '请输入内容'
    showResult.value = true
    return
  }

  try {
    switch (selectedType.value) {
      case 'number':
        const numArray = inputValue.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
        result.value = {
          input: numArray,
          output: reverseArray(numArray),
          type: 'number[]'
        }
        break
      case 'string':
        const strArray = inputValue.value.split(',').map(s => s.trim())
        result.value = {
          input: strArray,
          output: reverseArray(strArray),
          type: 'string[]'
        }
        break
      default:
        result.value = { error: '未知类型' }
    }
    showResult.value = true
  } catch (error) {
    result.value = { error: '输入格式错误' }
    showResult.value = true
  }
}

// 重置
const reset = () => {
  inputValue.value = ''
  result.value = null
  showResult.value = false
}

// 示例数据
const loadExample = (type) => {
  selectedType.value = type
  if (type === 'number') {
    inputValue.value = '1, 2, 3, 4, 5'
  } else {
    inputValue.value = '苹果, 香蕉, 橙子, 葡萄'
  }
  result.value = null
  showResult.value = false
}
</script>

<template>
  <div class="generic-demo">
    <h3>🔄 泛型 (Generics) 演示</h3>

    <div class="demo-container">
      <!-- 泛型概念说明 -->
      <div class="concept-box">
        <div class="concept-icon">
          💡
        </div>
        <div class="concept-text">
          <strong>泛型就像"通用模板"</strong> - 可以处理不同类型的数据，同时保持类型安全
        </div>
      </div>

      <!-- 泛型函数定义 -->
      <div class="function-definition">
        <div class="code-header">
          <span class="typescript-logo">TS</span>
          <span>泛型函数定义</span>
        </div>
        <pre><code class="typescript">// T 是类型变量，使用时才会确定具体类型
function identity&lt;T&gt;(arg: T): T {
  return arg
}

// 泛型数组反转
function reverseArray&lt;T&gt;(arr: T[]): T[] {
  return [...arr].reverse()
}</code></pre>
      </div>

      <!-- 交互演示 -->
      <div class="interactive-demo">
        <div class="demo-controls">
          <div class="input-group">
            <label>选择数据类型：</label>
            <div class="type-selector">
              <button
                :class="['type-btn', { active: selectedType === 'number' }]"
                @click="selectedType = 'number'"
              >
                数字数组
              </button>
              <button
                :class="['type-btn', { active: selectedType === 'string' }]"
                @click="selectedType = 'string'"
              >
                字符串数组
              </button>
            </div>
          </div>

          <div class="input-group">
            <label>输入数组（逗号分隔）：</label>
            <input
              v-model="inputValue"
              type="text"
              :placeholder="selectedType === 'number' ? '1, 2, 3, 4, 5' : '苹果, 香蕉, 橙子'"
              class="text-input"
            >
          </div>

          <div class="example-buttons">
            <button
              class="btn-example"
              @click="loadExample('number')"
            >
              加载数字示例
            </button>
            <button
              class="btn-example"
              @click="loadExample('string')"
            >
              加载字符串示例
            </button>
          </div>

          <div class="action-buttons">
            <button
              class="btn-primary"
              @click="executeReverse"
            >
              执行反转
            </button>
            <button
              class="btn-secondary"
              @click="reset"
            >
              重置
            </button>
          </div>
        </div>

        <!-- 结果展示 -->
        <div
          v-if="showResult"
          class="result-display"
        >
          <div class="result-header">
            <span class="result-icon">📊</span>
            <span>执行结果</span>
          </div>

          <div
            v-if="result && !result.error"
            class="result-content"
          >
            <div class="result-item">
              <div class="result-label">
                输入类型：
              </div>
              <div class="result-value type-badge">
                {{ result.type }}
              </div>
            </div>

            <div class="result-item">
              <div class="result-label">
                输入数组：
              </div>
              <div class="result-value array-display">
                [{{ result.input.join(', ') }}]
              </div>
            </div>

            <div class="result-item">
              <div class="result-label">
                输出数组：
              </div>
              <div class="result-value array-display output">
                [{{ result.output.join(', ') }}]
              </div>
            </div>

            <div class="type-info">
              <div class="info-icon">
                ✅
              </div>
              <div>类型安全：输入 {{ result.type }}，输出 {{ result.type }}</div>
            </div>
          </div>

          <div
            v-else
            class="error-display"
          >
            {{ result?.error || result }}
          </div>
        </div>
      </div>

      <!-- 使用示例 -->
      <div class="usage-examples">
        <h4>📝 泛型使用示例</h4>
        <div class="example-grid">
          <div class="example-card">
            <div class="example-title">
              数字数组
            </div>
            <pre><code class="typescript">const nums = [1, 2, 3, 4, 5]
const reversed = reverseArray&lt;number&gt;(nums)
// 结果: [5, 4, 3, 2, 1]
// 类型: number[]</code></pre>
          </div>

          <div class="example-card">
            <div class="example-title">
              字符串数组
            </div>
            <pre><code class="typescript">const strs = ["a", "b", "c"]
const reversed = reverseArray&lt;string&gt;(strs)
// 结果: ["c", "b", "a"]
// 类型: string[]</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generic-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
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

.demo-container {
  max-width: 900px;
  margin: 0 auto;
}

.concept-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin-bottom: 20px;
  color: white;
}

.concept-icon {
  font-size: 24px;
}

.concept-text {
  flex: 1;
  font-size: 14px;
}

.function-definition {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  border-left: 4px solid #3178c6;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.typescript-logo {
  background: #3178c6;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.function-definition pre {
  margin: 0;
}

.function-definition code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}

.interactive-demo {
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin-bottom: 20px;
}

.demo-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.type-selector {
  display: flex;
  gap: 8px;
}

.type-btn {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.type-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.text-input {
  padding: 12px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s ease;
}

.text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.example-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
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
  flex: 1;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft-hover);
}

.btn-example {
  background: #dbeafe;
  color: #1e40af;
  flex: 1;
}

.btn-example:hover {
  background: #bfdbfe;
}

.result-display {
  margin-top: 20px;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-brand-1);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-icon {
  font-size: 20px;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.result-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 100px;
}

.result-value {
  flex: 1;
  font-family: 'Courier New', monospace;
}

.type-badge {
  padding: 4px 10px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.array-display {
  padding: 8px 12px;
  background: #f3f4f6;
  border-radius: 6px;
}

.array-display.output {
  background: #d1fae5;
  font-weight: 600;
}

.type-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
  font-size: 13px;
  margin-top: 8px;
}

.info-icon {
  font-size: 16px;
}

.error-display {
  padding: 12px;
  background: #fef2f2;
  color: #991b1b;
  border-radius: 6px;
  text-align: center;
}

.usage-examples {
  margin-top: 20px;
}

.usage-examples h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.example-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.example-title {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-card pre {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.example-card code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
