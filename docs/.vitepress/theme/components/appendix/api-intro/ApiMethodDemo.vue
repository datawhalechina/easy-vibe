<template>
  <div class="api-method-demo">
    <div class="demo-header">
      <h3>🎯 HTTP 方法：四种基本操作</h3>
      <p>点击不同方法，观察对数据的影响</p>
    </div>

    <!-- 方法选择器 -->
    <div class="method-selector">
      <button
        v-for="method in methods"
        :key="method.name"
        @click="selectMethod(method)"
        :class="['method-card', method.name.toLowerCase(), { active: selectedMethod?.name === method.name }]"
      >
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <div class="method-label">{{ method.label }}</div>
        <div class="method-analogy">{{ method.analogy }}</div>
      </button>
    </div>

    <!-- 演示区域 -->
    <div class="demo-area" v-if="selectedMethod">
      <!-- 左侧：请求详情 -->
      <div class="request-panel">
        <h4>📤 请求</h4>
        <div class="request-line">
          <span class="http-method" :class="selectedMethod.name.toLowerCase()">
            {{ selectedMethod.name }}
          </span>
          <span class="url">{{ getMockUrl() }}</span>
        </div>

        <div v-if="selectedMethod.name !== 'GET'" class="request-body">
          <div class="panel-title">Request Body:</div>
          <pre><code>{{ getMockBody() }}</code></pre>
        </div>
      </div>

      <!-- 右侧：响应详情 -->
      <div class="response-panel">
        <h4>📥 响应</h4>
        <div class="status-line">
          <span class="status-code" :class="getStatusClass()">
            {{ getMockStatus() }}
          </span>
          <span class="status-text">{{ getMockStatusText() }}</span>
        </div>

        <div class="response-body">
          <div class="panel-title">Response Body:</div>
          <pre><code>{{ getMockResponse() }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 数据展示区 -->
    <div class="data-view">
      <h4>👥 用户数据</h4>
      <div class="user-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <div class="user-avatar">{{ user.avatar }}</div>
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-email">{{ user.email }}</div>
          </div>
          <div class="user-actions">
            <button @click="editUser(user)" class="btn-edit">✏️</button>
            <button @click="deleteUser(user.id)" class="btn-delete">❌</button>
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button @click="addNewUser" class="btn-add">
          <span>+ POST /users</span>
          <span class="hint">添加新用户</span>
        </button>
      </div>
    </div>

    <!-- 方法对比表 -->
    <div class="comparison-table">
      <h4>📊 方法对比</h4>
      <table>
        <thead>
          <tr>
            <th>方法</th>
            <th>作用</th>
            <th>餐厅类比</th>
            <th>幂等性</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in methods" :key="method.name">
            <td><span :class="['badge', method.name.toLowerCase()]">{{ method.name }}</span></td>
            <td>{{ method.label }}</td>
            <td>{{ method.analogy }}</td>
            <td>{{ method.idempotent ? '✅ 是' : '❌ 否' }}</td>
            <td><code>{{ method.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMethod = ref(null)

const methods = [
  {
    name: 'GET',
    label: '获取数据',
    icon: '📋',
    analogy: '查看菜单',
    idempotent: true,
    example: 'GET /users'
  },
  {
    name: 'POST',
    label: '创建数据',
    icon: '🍽️',
    analogy: '点新菜',
    idempotent: false,
    example: 'POST /users'
  },
  {
    name: 'PUT',
    label: '更新数据',
    icon: '✏️',
    analogy: '修改订单',
    idempotent: true,
    example: 'PUT /users/1'
  },
  {
    name: 'DELETE',
    label: '删除数据',
    icon: '❌',
    analogy: '取消订单',
    idempotent: true,
    example: 'DELETE /users/1'
  }
]

// 模拟用户数据
const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: '👨' },
  { id: 2, name: '李四', email: 'lisi@example.com', avatar: '👩' },
  { id: 3, name: '王五', email: 'wangwu@example.com', avatar: '👨‍💼' }
])

function selectMethod(method) {
  selectedMethod.value = method
}

function getMockUrl() {
  const baseUrl = '/api/users'
  if (selectedMethod.value.name === 'GET' && users.value.length > 0) {
    return `${baseUrl}/${users.value[0].id}`
  }
  return baseUrl
}

function getMockBody() {
  if (selectedMethod.value.name === 'POST') {
    return JSON.stringify(
      {
        name: '赵六',
        email: 'zhaoliu@example.com'
      },
      null,
      2
    )
  }
  if (selectedMethod.value.name === 'PUT') {
    return JSON.stringify(
      {
        name: '张三（已修改）',
        email: 'zhangsan_new@example.com'
      },
      null,
      2
    )
  }
  return ''
}

function getMockStatus() {
  const statusMap = {
    GET: 200,
    POST: 201,
    PUT: 200,
    DELETE: 204
  }
  return statusMap[selectedMethod.value.name] || 200
}

function getMockStatusText() {
  const textMap = {
    200: 'OK',
    201: 'Created',
    204: 'No Content'
  }
  return textMap[getMockStatus()] || 'OK'
}

function getStatusClass() {
  const status = getMockStatus()
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'redirect'
  if (status >= 400 && status < 500) return 'client-error'
  return 'server-error'
}

function getMockResponse() {
  if (selectedMethod.value.name === 'DELETE') {
    return '(无返回内容)'
  }

  if (selectedMethod.value.name === 'GET') {
    return JSON.stringify(users.value[0] || {}, null, 2)
  }

  if (selectedMethod.value.name === 'POST') {
    return JSON.stringify(
      {
        id: 4,
        name: '赵六',
        email: 'zhaoliu@example.com',
        createdAt: '2024-01-15T10:30:00Z'
      },
      null,
      2
    )
  }

  if (selectedMethod.value.name === 'PUT') {
    return JSON.stringify(
      {
        id: 1,
        name: '张三（已修改）',
        email: 'zhangsan_new@example.com',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      null,
      2
    )
  }

  return '{}'
}

function addNewUser() {
  selectMethod(methods[1]) // POST
}

function editUser(user) {
  selectMethod(methods[2]) // PUT
}

function deleteUser(userId) {
  selectMethod(methods[3]) // DELETE
}
</script>

<style scoped>
.api-method-demo {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  background: #fafafa;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h3 {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.method-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.method-card {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.method-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.method-card.active {
  border-width: 3px;
}

.method-card.get {
  border-color: #61affe;
}
.method-card.get.active {
  background: #e8f4ff;
}

.method-card.post {
  border-color: #49cc90;
}
.method-card.post.active {
  background: #e8fff5;
}

.method-card.put {
  border-color: #fca130;
}
.method-card.put.active {
  background: #fff8e8;
}

.method-card.delete {
  border-color: #f93e3e;
}
.method-card.delete.active {
  background: #ffe8e8;
}

.method-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.method-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.method-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.method-analogy {
  color: #999;
  font-size: 12px;
}

.demo-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.request-panel,
.response-panel {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.request-line {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.http-method {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.http-method.get {
  background: #61affe;
  color: white;
}
.http-method.post {
  background: #49cc90;
  color: white;
}
.http-method.put {
  background: #fca130;
  color: white;
}
.http-method.delete {
  background: #f93e3e;
  color: white;
}

.url {
  font-family: monospace;
  color: #333;
}

.panel-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: bold;
}

.request-panel pre,
.response-panel pre {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 13px;
  margin: 0;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.status-code {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.status-code.success {
  background: #d4edda;
  color: #155724;
}
.status-code.redirect {
  background: #fff3cd;
  color: #856404;
}
.status-code.client-error {
  background: #f8d7da;
  color: #721c24;
}
.status-code.server-error {
  background: #f5c6cb;
  color: #721c24;
}

.data-view {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.user-avatar {
  font-size: 32px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.user-email {
  font-size: 12px;
  color: #666;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background: white;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #fff3cd;
}
.btn-delete:hover {
  background: #f8d7da;
}

.action-bar {
  text-align: center;
}

.btn-add {
  padding: 12px 24px;
  background: #49cc90;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.btn-add:hover {
  background: #3db880;
}

.btn-add .hint {
  font-size: 11px;
  opacity: 0.8;
}

.comparison-table {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: bold;
}

.badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  font-size: 13px;
}

.badge.get {
  background: #61affe;
  color: white;
}
.badge.post {
  background: #49cc90;
  color: white;
}
.badge.put {
  background: #fca130;
  color: white;
}
.badge.delete {
  background: #f93e3e;
  color: white;
}

code {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
  color: #e83e8c;
}
</style>
