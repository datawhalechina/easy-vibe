<template>
  <div class="api-concept-demo">
    <!-- 标题和说明 -->
    <div class="demo-header">
      <h3>🍽️ API = 软件世界的"服务员"</h3>
      <p class="subtitle">点击菜单项，观察 API 如何传递请求</p>
    </div>

    <!-- 主场景 -->
    <div class="scene-container">
      <!-- 顾客区域 -->
      <div class="customer-zone">
        <div class="customer-avatar">👤</div>
        <div class="menu">
          <h4>菜单</h4>
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="orderDish(item)"
            :disabled="isProcessing"
            class="menu-item"
          >
            {{ item.name }}
          </button>
        </div>
      </div>

      <!-- API/服务员 -->
      <div class="api-zone">
        <div class="waiter" :class="{ 'moving': isProcessing }">
          <div class="waiter-avatar">🧑‍💼</div>
          <div class="api-label">API</div>
        </div>
        <div class="request-flow" v-if="currentRequest">
          <div class="flow-arrow">→</div>
          <div class="request-info">
            <div>请求: GET /{{ currentRequest }}</div>
          </div>
        </div>
      </div>

      <!-- 厨房/服务器区域 -->
      <div class="kitchen-zone">
        <div class="kitchen-avatar">👨‍🍳</div>
        <div class="kitchen-label">服务器</div>
        <div class="status" :class="statusClass">
          {{ statusText }}
        </div>
      </div>
    </div>

    <!-- 对比演示 -->
    <div class="comparison">
      <button @click="showComparison = !showComparison">
        {{ showComparison ? '隐藏' : '显示' }}对比：有 API vs 无 API
      </button>

      <div v-if="showComparison" class="comparison-scene">
        <div class="with-api">
          <h4>✅ 有 API（服务员）</h4>
          <div class="comparison-visual">
            顾客 → 服务员 → 厨房
          </div>
          <p>秩序井然，高效清晰</p>
        </div>
        <div class="without-api">
          <h4>❌ 无 API（直接冲进厨房）</h4>
          <div class="comparison-visual chaotic">
            顾客 厨房 👷 厨房 👨‍🍳
          </div>
          <p>混乱不堪，效率低下</p>
        </div>
      </div>
    </div>

    <!-- 关键点总结 -->
    <div class="key-points">
      <h4>💡 关键点</h4>
      <ul>
        <li>API 是软件之间的"服务员"</li>
        <li>调用 API = 向服务员点餐</li>
        <li>API 返回数据 = 服务员端菜上来</li>
        <li>有了 API，软件之间可以"对话"</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isProcessing = ref(false)
const currentRequest = ref(null)
const statusText = ref('空闲')
const showComparison = ref(false)

const menuItems = [
  { id: 1, name: '宫保鸡丁', endpoint: 'dishes/kungpao' },
  { id: 2, name: '鱼香肉丝', endpoint: 'dishes/yuxiang' },
  { id: 3, name: '麻婆豆腐', endpoint: 'dishes/mapo' }
]

const statusClass = computed(() => {
  if (isProcessing.value) return 'processing'
  return 'idle'
})

function orderDish(item) {
  if (isProcessing.value) return

  currentRequest.value = item.endpoint
  isProcessing.value = true
  statusText.value = '处理中...'

  // 模拟 API 调用过程
  setTimeout(() => {
    statusText.value = '制作完成'
    setTimeout(() => {
      isProcessing.value = false
      currentRequest.value = null
      statusText.value = '空闲'
    }, 1000)
  }, 2000)
}
</script>

<style scoped>
.api-concept-demo {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h3 {
  font-size: 24px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.scene-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin: 32px 0;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.customer-zone,
.kitchen-zone {
  flex: 1;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
}

.api-zone {
  flex: 1;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: #fff3cd;
  border: 2px dashed #ffc107;
}

.customer-avatar,
.kitchen-avatar {
  font-size: 48px;
  margin-bottom: 8px;
}

.waiter-avatar {
  font-size: 48px;
  margin-bottom: 8px;
  transition: transform 0.3s;
}

.waiter.moving .waiter-avatar {
  animation: bounce 0.5s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.api-label,
.kitchen-label {
  font-weight: bold;
  color: #856404;
  font-size: 14px;
}

.menu {
  margin-top: 16px;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover:not(:disabled) {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.menu-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status {
  margin-top: 12px;
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
}

.status.idle {
  background: #d4edda;
  color: #155724;
}

.status.processing {
  background: #fff3cd;
  color: #856404;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.comparison {
  margin-top: 24px;
  text-align: center;
}

.comparison button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.comparison button:hover {
  background: #0056b3;
}

.comparison-scene {
  display: flex;
  gap: 24px;
  margin-top: 16px;
}

.with-api,
.without-api {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
}

.with-api {
  background: #d4edda;
}

.without-api {
  background: #f8d7da;
}

.comparison-visual {
  font-size: 24px;
  margin: 12px 0;
}

.comparison-visual.chaotic {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.key-points {
  margin-top: 24px;
  padding: 16px;
  background: #e7f3ff;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.key-points h4 {
  margin: 0 0 12px 0;
  color: #007bff;
}

.key-points ul {
  margin: 0;
  padding-left: 20px;
}

.key-points li {
  margin: 8px 0;
  color: #333;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .api-concept-demo {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-color: #444;
  }

  .demo-header h3 {
    color: #e0e0e0;
  }

  .scene-container {
    background: #2d2d2d;
  }

  .customer-zone,
  .kitchen-zone {
    background: #363636;
  }

  .menu-item {
    background: #2d2d2d;
    border-color: #555;
    color: #e0e0e0;
  }

  .menu-item:hover:not(:disabled) {
    background: #007bff;
    color: white;
  }

  .key-points {
    background: #1e3a5f;
    border-left-color: #4dabf7;
  }

  .key-points li {
    color: #c0c0c0;
  }
}
</style>
