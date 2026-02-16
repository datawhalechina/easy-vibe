<script setup>
import { ref, computed } from 'vue'

const name = ref('张三')
const age = ref(25)
const isActive = ref(true)
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

const modifyName = () => {
  // TypeScript 会在编译时检查类型错误
  // name.value = 123 // 这行会在 TypeScript 中报错
  name.value = '李四'
  setMessage('✅ 修改成功！类型检查通过', false)
}

const modifyAgeError = () => {
  // 演示类型错误
  showError.value = true
  errorMessage.value = '❌ TypeScript 错误：不能将类型 "string" 分配给类型 "number"'
  setTimeout(() => {
    showError.value = false
    errorMessage.value = ''
  }, 3000)
}

const toggleActive = () => {
  isActive.value = !isActive.value
  setMessage(`✅ 状态切换为 ${isActive.value}`, false)
}

const reset = () => {
  name.value = '张三'
  age.value = 25
  isActive.value = true
  errorMessage.value = ''
  showError.value = false
}
</script>

<template>
  <div class="type-annotation-demo">
    <h3>📝 TypeScript 类型注解演示</h3>

    <div class="demo-container">
      <div class="variables-grid">
        <!-- String 类型 -->
        <div class="variable-card string-card">
          <div class="card-header">
            <span class="type-badge string">string</span>
            <span class="var-name">name</span>
          </div>
          <div class="card-value">{{ name }}</div>
          <div class="card-code">
            <code>const name: string = "{{ name }}"</code>
          </div>
        </div>

        <!-- Number 类型 -->
        <div class="variable-card number-card">
          <div class="card-header">
            <span class="type-badge number">number</span>
            <span class="var-name">age</span>
          </div>
          <div class="card-value">{{ age }}</div>
          <div class="card-code">
            <code>const age: number = {{ age }}</code>
          </div>
        </div>

        <!-- Boolean 类型 -->
        <div class="variable-card boolean-card">
          <div class="card-header">
            <span class="type-badge boolean">boolean</span>
            <span class="var-name">isActive</span>
          </div>
          <div class="card-value">
            <span :class="['status-dot', isActive ? 'active' : 'inactive']"></span>
            {{ isActive ? 'true' : 'false' }}
          </div>
          <div class="card-code">
            <code>const isActive: boolean = {{ isActive }}</code>
          </div>
        </div>
      </div>

      <!-- 错误消息显示 -->
      <div
        v-if="errorMessage"
        :class="['message-box', showError ? 'error' : 'success']"
      >
        {{ errorMessage }}
      </div>

      <!-- 操作按钮 -->
      <div class="controls">
        <button @click="modifyName" class="btn-primary">
          修改 name (正确)
        </button>
        <button @click="modifyAgeError" class="btn-danger">
          赋值错误类型
        </button>
        <button @click="toggleActive" class="btn-secondary">
          切换 isActive
        </button>
        <button @click="reset" class="btn-ghost">重置</button>
      </div>

      <!-- 代码对比 -->
      <div class="code-comparison">
        <div class="code-panel javascript">
          <div class="panel-header">JavaScript (无类型检查)</div>
          <pre><code>let name = "张三"
name = 123  // ✅ 运行时才会报错（可能很晚才发现）</code></pre>
        </div>
        <div class="code-panel typescript">
          <div class="panel-header">TypeScript (编译时检查)</div>
          <pre><code>let name: string = "张三"
name = 123  // ❌ 编译时立即报错（写代码时就发现）</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.type-annotation-demo {
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

.variables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.variable-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.variable-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.type-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.type-badge.string {
  background: #dbeafe;
  color: #1e40af;
}

.type-badge.number {
  background: #d1fae5;
  color: #065f46;
}

.type-badge.boolean {
  background: #fef3c7;
  color: #92400e;
}

.var-name {
  font-size: 14px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-2);
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.status-dot.inactive {
  background: #ef4444;
}

.card-code {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  overflow-x: auto;
}

.card-code code {
  font-family: 'Courier New', monospace;
  color: #d4d4d4;
  line-height: 1.5;
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
  flex-wrap: wrap;
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

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.btn-ghost:hover {
  background: var(--vp-c-bg-soft-hover);
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.code-panel.javascript {
  border-color: #f59e0b;
}

.code-panel.typescript {
  border-color: #3178c6;
}

.panel-header {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: white;
}

.code-panel.javascript .panel-header {
  background: #f59e0b;
}

.code-panel.typescript .panel-header {
  background: #3178c6;
}

.code-panel pre {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.code-panel code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
