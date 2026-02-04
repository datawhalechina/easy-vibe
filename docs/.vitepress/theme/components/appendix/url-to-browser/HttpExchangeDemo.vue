<!--
  HttpExchangeDemo.vue
  HTTP请求响应演示 - 紧凑交互版
  
  设计理念：
  1. 循循善诱：用"快递员投递"类比 HTTP 请求响应。
  2. 紧凑布局：横向舞台，固定底部详情板。
-->
<template>
  <div class="http-compact">
    <!-- 顶部标题与场景选择 -->
    <div class="top-bar">
      <div class="title-section">
        <span class="app-icon">📦</span>
        <span class="app-title">HTTP 请求/响应</span>
      </div>
      
      <div class="scenario-tabs">
        <button 
          v-for="s in scenarios" 
          :key="s.id"
          @click="selectScenario(s)"
          class="tab-btn"
          :class="{ active: currentScenario.id === s.id }"
          :disabled="isAnimating"
        >
          {{ s.name }}
        </button>
      </div>

      <div class="actions">
         <button 
          class="action-btn primary" 
          @click="toggleAutoPlay"
        >
          {{ isAutoPlaying ? '⏸' : '▶ 演示' }}
        </button>
        <button 
          class="action-btn outline" 
          @click="reset"
        >
          ↺
        </button>
      </div>
    </div>

    <!-- 核心可视化舞台 -->
    <div class="stage-area">
      <!-- 客户端 -->
      <div class="actor client">
        <div class="avatar-box">
          <span class="avatar-icon">🧑‍💻</span>
          <span class="avatar-label">浏览器</span>
        </div>
      </div>

      <!-- 传输通道 -->
      <div class="channel">
        <div class="channel-bg"></div>
        
        <!-- 请求包 -->
        <div class="packet request" :class="{ moving: step === 1, done: step > 1 }">
          <span class="packet-icon">📤</span>
          <span class="packet-label">GET</span>
        </div>

        <!-- 响应包 -->
        <div class="packet response" :class="{ moving: step === 2, done: step > 2 }" v-if="step >= 2">
          <span class="packet-icon">📦</span>
          <span class="packet-label">{{ currentScenario.status }}</span>
        </div>
      </div>

      <!-- 服务器 -->
      <div class="actor server">
        <div class="avatar-box">
          <span class="avatar-icon">🏢</span>
          <span class="avatar-label">服务器</span>
        </div>
      </div>
    </div>

    <!-- 底部详情面板 (固定高度) -->
    <div class="detail-panel">
      <transition name="fade" mode="out-in">
        <div v-if="step > 0" class="detail-content" :key="step">
           <!-- 左侧状态徽章 -->
           <div class="detail-left" :style="{ borderColor: getStatusColor() }">
             <div class="status-badge" :class="currentScenario.statusType">
               {{ step === 1 ? '请求中' : currentScenario.status + ' ' + currentScenario.statusText }}
             </div>
           </div>
           
           <div class="detail-divider"></div>

           <!-- 右侧详情 -->
           <div class="detail-right">
             <div class="info-row">
               <span class="tag life">快递员说</span>
               <span class="text highlight">
                 {{ step === 1 ? currentScenario.requestText : currentScenario.responseText }}
               </span>
             </div>
             <div class="info-row">
               <span class="tag tech">技术报文</span>
               <span class="text code">
                 {{ step === 1 ? `${currentScenario.method} ${currentScenario.path} HTTP/1.1` : `HTTP/1.1 ${currentScenario.status} ${currentScenario.statusText}` }}
               </span>
             </div>
           </div>
        </div>
        
        <div v-else class="detail-placeholder">
          <span class="guide-bounce">📦</span>
          <span>选择一个场景，点击"演示"看看发生了什么</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const scenarios = [
  {
    id: 'success',
    name: '正常送达',
    method: 'GET',
    path: '/index.html',
    requestText: '您好，请给我 index.html 的包裹！',
    status: '200',
    statusText: 'OK',
    statusType: 'success',
    responseText: '好的，这是您的 index.html，请签收！',
    qa: {
      title: '🤔 200 OK 是什么意思？',
      content: [
        {
          q: '200 这个数字代表什么？',
          a: '就像快递单上的"已妥投"。代表一切顺利，服务器成功找到了你要的东西并给了你。'
        },
        {
          q: 'GET 是什么？',
          a: '就像你对服务员说"给我来一份菜单"。是向服务器"索要"东西的意思。绝大多数网页访问都是 GET 请求。'
        }
      ]
    }
  },
  {
    id: 'notfound',
    name: '查无此人',
    method: 'GET',
    path: '/nopage',
    requestText: '您好，我要找 nopage 这个人。',
    status: '404',
    statusText: 'Not Found',
    statusType: 'error',
    responseText: '抱歉，这里查无此人 (404)。',
    qa: {
      title: '🤔 为什么叫 404？',
      content: [
        {
          q: '是谁的错？',
          a: '通常是"你"（客户端）的错。4开头的代码都代表客户端问题，比如你地址输错了，或者这个网页已经被删除了。'
        }
      ]
    }
  },
  {
    id: 'redirect',
    name: '搬家了',
    method: 'GET',
    path: '/old-path',
    requestText: '您好，送到 old-path 这里。',
    status: '301',
    statusText: 'Moved',
    statusType: 'warn',
    responseText: '这里搬家了，请去新地址 (301)。',
    qa: {
      title: '🤔 301 重定向是什么？',
      content: [
        {
          q: '浏览器会怎么做？',
          a: '浏览器收到 301 后，会自动去访问新的地址。这个过程很快，你可能都感觉不到。'
        },
        {
          q: '为什么要重定向？',
          a: '就像店铺搬迁要在门口贴个告示。保证收藏了旧网址的老顾客也能找到新店。'
        }
      ]
    }
  },
  {
    id: 'servererror',
    name: '系统崩溃',
    method: 'GET',
    path: '/api/data',
    requestText: '您好，我要取数据。',
    status: '500',
    statusText: 'Error',
    statusType: 'error',
    responseText: '抱歉，仓库塌了，暂时无法取货 (500)。',
    qa: {
      title: '🤔 500 是谁的错？',
      content: [
        {
          q: '我能修好它吗？',
          a: '不能。5开头的代码代表"服务器"出问题了（比如代码崩了、数据库挂了）。跟你没关系，只能等待网站管理员修复。'
        }
      ]
    }
  }
]

const currentScenario = ref(scenarios[0])
const step = ref(0) // 0: Idle, 1: Requesting, 2: Responding, 3: Done
const isAnimating = ref(false)
const isAutoPlaying = ref(false)
let timer = null

const selectScenario = (s) => {
  if (isAnimating.value) return
  currentScenario.value = s
  reset()
}

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    reset()
  } else {
    startAnimation()
  }
}

const startAnimation = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  isAutoPlaying.value = true
  step.value = 1
  
  // Step 1: Request (Client -> Server)
  timer = setTimeout(() => {
    step.value = 2
    // Step 2: Response (Server -> Client)
    timer = setTimeout(() => {
      step.value = 3
      isAnimating.value = false
      isAutoPlaying.value = false
    }, 1500)
  }, 1500)
}

const reset = () => {
  clearTimeout(timer)
  step.value = 0
  isAnimating.value = false
  isAutoPlaying.value = false
}

const getStatusColor = () => {
  if (step.value === 1) return '#3b82f6' // Blue for request
  const type = currentScenario.value.statusType
  if (type === 'success') return '#10b981'
  if (type === 'warn') return '#f59e0b'
  if (type === 'error') return '#ef4444'
  return '#909399'
}

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.http-compact {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 16px;
  margin: 16px 0;
  font-size: 14px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scenario-tabs {
  display: flex;
  background: var(--vp-c-bg-alt);
  padding: 2px;
  border-radius: 6px;
  gap: 2px;
}

.tab-btn {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-brand);
}

.action-btn.outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

/* 舞台区 */
.stage-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0 30px;
  position: relative;
  margin-bottom: 20px;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  z-index: 2;
}

.avatar-icon { font-size: 28px; }
.avatar-label { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.channel {
  flex: 1;
  height: 40px;
  margin: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
}

.channel-bg {
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  top: 50%;
}

.packet {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1.5s ease-in-out;
  opacity: 0;
  top: 0;
}

.packet-icon { font-size: 20px; }
.packet-label { font-size: 10px; color: var(--vp-c-text-2); background: var(--vp-c-bg); padding: 0 2px; }

.packet.request { left: 0; opacity: 1; }
.packet.request.moving { left: 100%; transform: translateX(-100%); opacity: 0; } 
/* Request moves from 0 to 100% then disappears */

.packet.response { left: 100%; transform: translateX(-100%); opacity: 0; }
.packet.response.moving { left: 0; transform: translateX(0); opacity: 1; }
/* Response starts at 100%, moves to 0 */

/* 动画调整 */
.packet.request.moving {
  animation: sendRequest 1.5s forwards;
}

.packet.response.moving {
  animation: sendResponse 1.5s forwards;
}

@keyframes sendRequest {
  0% { left: 0; opacity: 1; transform: translateX(0); }
  90% { left: 100%; opacity: 1; transform: translateX(-100%); }
  100% { left: 100%; opacity: 0; transform: translateX(-100%); }
}

@keyframes sendResponse {
  0% { left: 100%; opacity: 1; transform: translateX(-100%); }
  100% { left: 0; opacity: 1; transform: translateX(0); }
}

/* 详情面板 */
.detail-panel {
  height: 80px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 0 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.detail-content {
  display: flex;
  width: 100%;
  align-items: center;
}

.detail-left {
  padding-right: 16px;
  border-right: 2px solid transparent;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}
.status-badge.success { background: #10b981; }
.status-badge.warn { background: #f59e0b; }
.status-badge.error { background: #ef4444; }

.detail-divider {
  width: 1px;
  height: 40px;
  background: var(--vp-c-divider);
  margin: 0 16px;
}

.detail-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
}
.tag.life { background: #e6f7ff; color: #1890ff; }
.tag.tech { background: #f6ffed; color: #52c41a; }

.text { font-size: 13px; color: var(--vp-c-text-1); }
.text.highlight { font-weight: 500; color: var(--vp-c-brand); }
.text.code { font-family: monospace; }

.detail-placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-3);
  width: 100%;
  justify-content: center;
}

.guide-bounce { animation: bounce 1.5s infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
</style>
