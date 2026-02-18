<script setup>
import { ref, computed } from 'vue'

// 类型推断演示
const codeExamples = ref([
  {
    id: 1,
    code: 'let name = "张三"',
    inferredType: 'string',
    explanation: 'TypeScript 根据赋值的字符串推断出 name 的类型是 string'
  },
  {
    id: 2,
    code: 'let age = 25',
    inferredType: 'number',
    explanation: 'TypeScript 根据数字字面量推断出 age 的类型是 number'
  },
  {
    id: 3,
    code: 'let isActive = true',
    inferredType: 'boolean',
    explanation: 'TypeScript 根据布尔值推断出 isActive 的类型是 boolean'
  },
  {
    id: 4,
    code: 'let numbers = [1, 2, 3]',
    inferredType: 'number[]',
    explanation: 'TypeScript 推断出这是一个数字数组'
  }
])

const currentExample = ref(codeExamples.value[0])

// 显示类型错误
const showError = ref(false)
const errorMessage = ref('')

const setMessage = (msg, isError = false) => {
  errorMessage.value = msg
  showError.value = isError
  setTimeout(() => {
    errorMessage.value = ''
    showError.value = false
  }, 3000)
}

// 切换示例
const selectExample = (example) => {
  currentExample.value = example
  errorMessage.value = ''
  showError.value = false
}

// 尝试类型错误
const tryTypeError = () => {
  showError.value = true
  errorMessage.value = `❌ TypeScript 错误：不能将类型 "number" 分配给类型 "${currentExample.value.inferredType}"`
  setTimeout(() => {
    showError.value = false
    errorMessage.value = ''
  }, 3000)
}

// 最佳实践示例
const bestPractices = ref([
  {
    title: '何时使用类型推断',
    items: [
      '变量初始化时有明确的值',
      '函数返回值可以明显推断',
      '简单的字面量赋值'
    ]
  },
  {
    title: '何时需要显式注解',
    items: [
      '函数参数（必须）',
      '对象或数组的复杂结构',
      '无法从初始值推断类型',
      '需要明确的类型约束'
    ]
  }
])

// 代码对比
const codeComparisons = ref([
  {
    scenario: '函数返回值',
    withInference: 'function add(a: number, b: number) {\n  return a + b  // 推断为 number\n}',
    withAnnotation: 'function add(a: number, b: number): number {\n  return a + b\n}',
    recommendation: '推荐使用推断'
  },
  {
    scenario: '复杂对象',
    withInference: 'const user = {\n  name: "张三",\n  age: 25,\n  email: "test@example.com"\n}  // 类型自动推断',
    withAnnotation: 'interface User {\n  name: string\n  age: number\n  email: string\n}\n\nconst user: User = { ... }',
    recommendation: '复杂结构建议用接口'
  }
])
</script>

<template>
  <div class="type-inference-demo">
    <h3>🔮 类型推断演示</h3>

    <div class="demo-container">
      <!-- 概念说明 -->
      <div class="concept-section">
        <div class="concept-card">
          <div class="concept-icon">🧠</div>
          <div class="concept-content">
            <h4>什么是类型推断？</h4>
            <p>TypeScript 很聪明，它能根据你写的代码自动推断出变量的类型，不需要每次都手动标注。</p>
          </div>
        </div>
      </div>

      <!-- 示例选择器 -->
      <div class="example-selector">
        <h4>选择一个示例看看类型推断是如何工作的：</h4>
        <div class="examples-grid">
          <div
            v-for="example in codeExamples"
            :key="example.id"
            :class="['example-card', { active: currentExample.id === example.id }]"
            @click="selectExample(example)"
          >
            <div class="example-code">{{ example.code }}</div>
            <div class="example-type">→ {{ example.inferredType }}</div>
          </div>
        </div>
      </div>

      <!-- 当前示例详情 -->
      <div class="current-example">
        <div class="example-display">
          <div class="code-panel">
            <div class="panel-header">
              <span class="code-icon">💻</span>
              <span>代码</span>
            </div>
            <pre><code class="typescript">{{ currentExample.code }}</code></pre>
          </div>

          <div class="inference-arrow">→</div>

          <div class="type-panel">
            <div class="panel-header">
              <span class="type-icon">🏷️</span>
              <span>推断的类型</span>
            </div>
            <div class="inferred-type">{{ currentExample.inferredType }}</div>
          </div>
        </div>

        <div class="explanation">
          <div class="explanation-icon">💡</div>
          <div class="explanation-text">{{ currentExample.explanation }}</div>
        </div>
      </div>

      <!-- 错误消息 -->
      <div
        v-if="errorMessage"
        :class="['message-box', showError ? 'error' : 'success']"
      >
        {{ errorMessage }}
      </div>

      <!-- 操作按钮 -->
      <div class="controls">
        <button @click="tryTypeError" class="btn-danger">
          尝试类型错误
        </button>
        <button @click="showError = false; errorMessage = ''" class="btn-secondary">
          清除消息
        </button>
      </div>

      <!-- 最佳实践 -->
      <div class="best-practices">
        <h4>📚 最佳实践</h4>
        <div class="practices-grid">
          <div
            v-for="(practice, index) in bestPractices"
            :key="index"
            class="practice-card"
          >
            <div class="practice-header">{{ practice.title }}</div>
            <ul class="practice-list">
              <li v-for="(item, i) in practice.items" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 代码对比 -->
      <div class="comparisons">
        <h4>🔄 类型推断 vs 显式注解</h4>
        <div
          v-for="(comparison, index) in codeComparisons"
          :key="index"
          class="comparison-item"
        >
          <div class="comparison-scenario">{{ comparison.scenario }}</div>
          <div class="comparison-codes">
            <div class="comparison-code">
              <div class="code-label">使用推断</div>
              <pre><code class="typescript">{{ comparison.withInference }}</code></pre>
            </div>
            <div class="comparison-code">
              <div class="code-label">显式注解</div>
              <pre><code class="typescript">{{ comparison.withAnnotation }}</code></pre>
            </div>
          </div>
          <div class="comparison-recommendation">
            <span class="recommendation-icon">✅</span>
            {{ comparison.recommendation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.type-inference-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3, h4 {
  margin: 0 0 16px 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
}

.demo-container {
  max-width: 1000px;
  margin: 0 auto;
}

.concept-section {
  margin-bottom: 24px;
}

.concept-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.concept-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.concept-content h4 {
  color: white;
  margin-bottom: 8px;
}

.concept-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.95;
}

.example-selector {
  margin-bottom: 24px;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.example-card {
  padding: 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.example-card.active {
  border-color: var(--vp-c-brand-1);
  background: #dbeafe;
}

.example-code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  font-weight: 600;
}

.example-type {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.current-example {
  margin-bottom: 24px;
}

.example-display {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .example-display {
    flex-direction: column;
  }

  .inference-arrow {
    transform: rotate(90deg);
  }
}

.code-panel, .type-panel {
  flex: 1;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-icon, .type-icon {
  font-size: 16px;
}

.code-panel pre {
  margin: 0;
  padding: 20px;
  background: #1e1e1e;
  overflow-x: auto;
}

.code-panel code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #d4d4d4;
}

.inference-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.type-panel {
  display: flex;
  flex-direction: column;
}

.inferred-type {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: #dbeafe;
}

.explanation {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.explanation-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.explanation-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.message-box {
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-box.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.message-box.success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
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

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft-hover);
}

.best-practices {
  margin-bottom: 24px;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.practice-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.practice-header {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.practice-list {
  margin: 0;
  padding-left: 20px;
}

.practice-list li {
  font-size: 14px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.comparisons {
  margin-top: 24px;
}

.comparison-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.comparison-scenario {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.comparison-codes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .comparison-codes {
    grid-template-columns: 1fr;
  }
}

.comparison-code {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
}

.code-label {
  padding: 10px 16px;
  background: #374151;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.comparison-code pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.comparison-code code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}

.comparison-recommendation {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
  font-size: 14px;
  font-weight: 500;
}

.recommendation-icon {
  font-size: 16px;
}
</style>
