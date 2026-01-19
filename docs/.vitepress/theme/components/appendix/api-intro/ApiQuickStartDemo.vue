<template>
  <div class="api-quick-start-demo">
    <div class="demo-header">
      <h2>⚡ API 快速入门</h2>
      <p class="subtitle">3 分钟理解 API 是什么</p>
    </div>

    <!-- 场景选择器 -->
    <div class="scene-selector">
      <button
        v-for="scene in scenes"
        :key="scene.id"
        @click="switchScene(scene.id)"
        :class="{ active: currentScene === scene.id }"
        class="scene-btn"
      >
        {{ scene.icon }} {{ scene.name }}
      </button>
    </div>

    <!-- 主演示区域 -->
    <div class="demo-stage">
      <!-- 客户端 -->
      <div class="client-zone">
        <div class="phone-frame">
          <div class="phone-screen">
            <div class="app-header">{{ getSceneData().appTitle }}</div>
            <div class="app-content">
              <!-- 外卖点餐场景 -->
              <div v-if="currentScene === 'delivery'" class="delivery-ui">
                <div class="restaurant-info">
                  <div class="restaurant-name">🍔 汉堡王</div>
                  <div class="dish-list">
                    <div class="dish-item">
                      <span class="dish-name">牛肉汉堡</span>
                      <span class="dish-price">¥35</span>
                    </div>
                    <div class="dish-item">
                      <span class="dish-name">薯条</span>
                      <span class="dish-price">¥12</span>
                    </div>
                  </div>
                </div>
                <button @click="placeOrder" :disabled="isProcessing" class="order-btn">
                  {{ isProcessing ? '配送中...' : '🛒 立即下单' }}
                </button>
              </div>

              <!-- 微信登录场景 -->
              <div v-if="currentScene === 'wechat'" class="wechat-ui">
                <div class="login-logo">👤</div>
                <div class="login-title">欢迎登录</div>
                <button @click="wechatLogin" :disabled="isProcessing" class="login-btn">
                  <span class="wechat-icon">💬</span>
                  {{ isProcessing ? '登录中...' : '微信快速登录' }}
                </button>
              </div>

              <!-- 天气查询场景 -->
              <div v-if="currentScene === 'weather'" class="weather-ui">
                <div class="weather-search">
                  <input
                    v-model="searchCity"
                    placeholder="输入城市名称"
                    class="search-input"
                    @keyup.enter="searchWeather"
                  />
                  <button @click="searchWeather" :disabled="isProcessing" class="search-btn">
                    {{ isProcessing ? '查询中...' : '🔍 查询' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="zone-label">👤 客户端 (你)</div>
      </div>

      <!-- API 中间层 -->
      <div class="api-zone">
        <div class="api-container">
          <div class="api-icon" :class="{ moving: isProcessing }">
            {{ getSceneData().apiIcon }}
          </div>
          <div class="api-label">API</div>
          <div v-if="isProcessing" class="data-flow">
            <div class="data-packet">{{ getSceneData().requestData }}</div>
          </div>
        </div>
        <div class="zone-label">🔗 API (桥梁)</div>
      </div>

      <!-- 服务器 -->
      <div class="server-zone">
        <div class="server-container">
          <div class="server-icon">🏢</div>
          <div class="server-label">{{ getSceneData().serverName }}</div>
          <div v-if="isProcessing && currentStep >= 3" class="processing-indicator">
            <div class="dots">
              <span></span><span></span><span></span>
            </div>
            <div class="processing-text">处理中...</div>
          </div>
          <div v-if="response && !isProcessing" class="result-display">
            <div class="result-label">返回数据：</div>
            <pre class="result-data">{{ formatResponse(response) }}</pre>
          </div>
        </div>
        <div class="zone-label">🖥️ 服务器</div>
      </div>
    </div>

    <!-- 流程说明 -->
    <div class="flow-explanation">
      <div class="step" :class="{ active: currentStep >= 1 }">
        <div class="step-number">1</div>
        <div class="step-text">发起请求</div>
      </div>
      <div class="arrow">→</div>
      <div class="step" :class="{ active: currentStep >= 2 }">
        <div class="step-number">2</div>
        <div class="step-text">API 传递</div>
      </div>
      <div class="arrow">→</div>
      <div class="step" :class="{ active: currentStep >= 3 }">
        <div class="step-number">3</div>
        <div class="step-text">服务器处理</div>
      </div>
      <div class="arrow">→</div>
      <div class="step" :class="{ active: currentStep >= 4 }">
        <div class="step-number">4</div>
        <div class="step-text">返回结果</div>
      </div>
    </div>

    <!-- 关键要点 -->
    <div class="key-points">
      <h4>💡 理解 API 的三个关键点</h4>
      <div class="points-grid">
        <div class="point-card">
          <div class="point-icon">🔌</div>
          <div class="point-title">API 是"接口"</div>
          <div class="point-desc">就像插头连接电器，API 连接不同的软件系统</div>
        </div>
        <div class="point-card">
          <div class="point-icon">📨</div>
          <div class="point-title">API 是"信使"</div>
          <div class="point-desc">你告诉 API 需要什么，API 去服务器取来给你</div>
        </div>
        <div class="point-card">
          <div class="point-icon">📋</div>
          <div class="point-title">API 是"菜单"</div>
          <div class="point-desc">API 文档告诉你有哪些功能可以调用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentScene = ref('delivery')
const isProcessing = ref(false)
const currentStep = ref(0)
const response = ref(null)
const searchCity = ref('北京')

const scenes = [
  { id: 'delivery', name: '外卖点餐', icon: '🍔' },
  { id: 'wechat', name: '微信登录', icon: '💬' },
  { id: 'weather', name: '天气查询', icon: '🌤️' }
]

function getSceneData() {
  const sceneMap = {
    delivery: {
      appTitle: '外卖 APP',
      apiIcon: '🛵',
      serverName: '餐厅系统',
      requestData: '订单: 汉堡+薯条'
    },
    wechat: {
      appTitle: '第三方 APP',
      apiIcon: '🔐',
      serverName: '微信服务器',
      requestData: '验证用户身份'
    },
    weather: {
      appTitle: '天气 APP',
      apiIcon: '📡',
      serverName: '气象局数据',
      requestData: `查询: ${searchCity.value}天气`
    }
  }
  return sceneMap[currentScene.value]
}

async function placeOrder() {
  if (isProcessing.value) return
  await processRequest({
    status: 'success',
    message: '下单成功',
    data: {
      orderId: 'DD20240115001',
      estimatedTime: '30分钟',
      items: [
        { name: '牛肉汉堡', quantity: 1, price: 35 },
        { name: '薯条', quantity: 1, price: 12 }
      ],
      total: 47
    }
  })
}

async function wechatLogin() {
  if (isProcessing.value) return
  await processRequest({
    status: 'success',
    message: '登录成功',
    data: {
      userId: 'wx_123456',
      nickname: '微信用户',
      avatar: 'https://example.com/avatar.jpg'
    }
  })
}

async function searchWeather() {
  if (isProcessing.value || !searchCity.value) return
  await processRequest({
    status: 'success',
    message: '查询成功',
    data: {
      city: searchCity.value,
      temperature: '22°C',
      weather: '晴',
      humidity: '45%',
      wind: '东南风 3级'
    }
  })
}

async function processRequest(mockResponse) {
  isProcessing.value = true
  response.value = null

  // 步骤1: 发起请求
  currentStep.value = 1
  await sleep(600)

  // 步骤2: API 传递
  currentStep.value = 2
  await sleep(800)

  // 步骤3: 服务器处理
  currentStep.value = 3
  await sleep(1000)

  // 步骤4: 返回结果
  currentStep.value = 4
  response.value = mockResponse
  await sleep(500)

  isProcessing.value = false
}

function switchScene(sceneId) {
  currentScene.value = sceneId
  currentStep.value = 0
  response.value = null
  searchCity.value = '北京'
}

function formatResponse(resp) {
  return JSON.stringify(resp, null, 2)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<style scoped>
.api-quick-start-demo {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.demo-header {
  text-align: center;
  margin-bottom: 32px;
}

.demo-header h2 {
  font-size: 32px;
  margin: 0 0 12px 0;
  color: white;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.scene-selector {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.scene-btn {
  padding: 12px 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s;
}

.scene-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.scene-btn.active {
  background: white;
  color: #667eea;
  border-color: white;
}

.demo-stage {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.client-zone,
.api-zone,
.server-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phone-frame {
  width: 180px;
  height: 320px;
  background: #1a1a1a;
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #667eea;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
}

.app-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  color: #333;
}

.restaurant-info {
  margin-bottom: 16px;
}

.restaurant-name {
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.dish-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dish-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 12px;
}

.order-btn,
.login-btn,
.search-btn {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.order-btn:disabled,
.login-btn:disabled,
.search-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-logo {
  font-size: 48px;
  text-align: center;
  margin-bottom: 12px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
}

.wechat-icon {
  margin-right: 6px;
}

.weather-search {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
}

.api-container {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.api-icon {
  font-size: 48px;
  transition: transform 0.3s;
}

.api-icon.moving {
  animation: deliveryMove 1.5s ease-in-out infinite;
}

@keyframes deliveryMove {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
}

.api-label {
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
}

.data-flow {
  position: absolute;
  top: -20px;
  background: white;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  animation: floatData 1s infinite;
}

@keyframes floatData {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.server-container {
  width: 200px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 120px;
}

.server-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.server-label {
  font-size: 13px;
  font-weight: bold;
}

.processing-indicator {
  margin-top: 12px;
  text-align: center;
}

.dots {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.dots span {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dots span:nth-child(1) {
  animation-delay: -0.32s;
}
.dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.processing-text {
  margin-top: 8px;
  font-size: 12px;
}

.result-display {
  margin-top: 12px;
  width: 100%;
}

.result-label {
  font-size: 11px;
  margin-bottom: 6px;
  opacity: 0.8;
}

.result-data {
  background: rgba(0, 0, 0, 0.3);
  color: #4ade80;
  padding: 8px;
  border-radius: 6px;
  font-size: 10px;
  margin: 0;
  overflow-x: auto;
}

.zone-label {
  margin-top: 12px;
  font-size: 13px;
  opacity: 0.9;
}

.flow-explanation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  transition: all 0.3s;
}

.step.active {
  opacity: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.step.active .step-number {
  background: white;
  color: #667eea;
}

.step-text {
  font-size: 12px;
}

.arrow {
  font-size: 24px;
  opacity: 0.5;
}

.key-points {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
}

.key-points h4 {
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 18px;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.point-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.point-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.point-title {
  font-weight: bold;
  margin-bottom: 6px;
}

.point-desc {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .demo-stage {
    grid-template-columns: 1fr;
  }

  .flow-explanation {
    flex-wrap: wrap;
  }

  .api-quick-start-demo {
    padding: 16px;
  }

  .demo-header h2 {
    font-size: 24px;
  }

  .points-grid {
    grid-template-columns: 1fr;
  }
}
</style>
