<script setup>
import { ref } from 'vue'

// 用户数据
const user = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  age: 25
})

// 显示错误信息
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

// 尝试添加错误类型的属性
const addErrorProperty = () => {
  showError.value = true
  errorMessage.value = '❌ TypeScript 错误：类型 "string" 不可分配给类型 "number"'
  setTimeout(() => {
    showError.value = false
    errorMessage.value = ''
  }, 3000)
}

// 添加新用户
const addNewUser = () => {
  user.value = {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    age: 30
  }
  setMessage('✅ 创建新用户成功！类型检查通过', false)
}

// 修改用户年龄
const modifyAge = () => {
  user.value.age = user.value.age + 1
  setMessage(`✅ 年龄更新为 ${user.value.age}`, false)
}

// 重置
const reset = () => {
  user.value = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 25
  }
  errorMessage.value = ''
  showError.value = false
}
</script>

<template>
  <div class="interface-demo">
    <h3>🎯 Interface 接口演示</h3>

    <div class="demo-container">
      <!-- 接口定义 -->
      <div class="interface-definition">
        <div class="code-header">
          <span class="typescript-logo">TS</span>
          <span>User Interface 定义</span>
        </div>
        <pre><code class="typescript">interface User {
  id: number
  name: string
  email: string
  age: number
}</code></pre>
      </div>

      <!-- 用户对象展示 -->
      <div class="user-display">
        <div class="user-card">
          <div class="card-header">
            <div class="avatar">👤</div>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          </div>
          <div class="user-details">
            <div class="detail-item">
              <span class="label">ID:</span>
              <span class="value">{{ user.id }}</span>
              <span class="type-badge">number</span>
            </div>
            <div class="detail-item">
              <span class="label">年龄:</span>
              <span class="value">{{ user.age }}</span>
              <span class="type-badge">number</span>
            </div>
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
        <button @click="modifyAge" class="btn-primary">
          增加年龄
        </button>
        <button @click="addErrorProperty" class="btn-danger">
          尝试赋值错误类型
        </button>
        <button @click="addNewUser" class="btn-secondary">
          创建新用户
        </button>
        <button @click="reset" class="btn-ghost">重置</button>
      </div>

      <!-- 代码示例 -->
      <div class="code-examples">
        <div class="example-item">
          <div class="example-header">✅ 正确使用</div>
          <pre><code class="typescript">const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
} // ✅ 类型完全匹配</code></pre>
        </div>

        <div class="example-item error">
          <div class="example-header">❌ 错误使用</div>
          <pre><code class="typescript">const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: "25"  // ❌ 错误：age 应该是 number，不是 string
}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interface-demo {
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

.interface-definition {
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

.interface-definition pre {
  margin: 0;
}

.interface-definition code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}

.user-display {
  margin-bottom: 20px;
}

.user-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  max-width: 400px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-border);
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.user-email {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 60px;
}

.value {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.type-badge {
  margin-left: auto;
  padding: 3px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
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

.code-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .code-examples {
    grid-template-columns: 1fr;
  }
}

.example-item {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.example-item.error {
  border-color: #ef4444;
}

.example-header {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.example-item.error .example-header {
  background: #fef2f2;
  color: #991b1b;
}

.example-item pre {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.example-item code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
