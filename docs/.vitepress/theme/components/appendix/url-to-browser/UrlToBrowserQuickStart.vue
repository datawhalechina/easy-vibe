<!--
  UrlToBrowserQuickStart.vue
  网络快递之旅 - 全流程快速体验组件

  用途：
  用"寄快递"的故事主线，让0基础用户在30秒内体验从输入URL到页面显示的完整过程。
  设计原则：故事化、可视化、即时反馈
-->
<template>
  <div class="delivery-journey">
    <!-- 故事标题 -->
    <div class="journey-header">
      <span class="journey-icon">[包裹]</span>
      <span class="journey-title">体验一次"网络快递"之旅</span>
    </div>

    <!-- 快递单填写 -->
    <div class="delivery-form">
      <div class="form-label">填写快递单（输入网址）：</div>
      <div class="address-input">
        <span class="protocol-badge">https://</span>
        <input
          v-model="url"
          type="text"
          placeholder="比如：baidu.com"
          @keyup.enter="startJourney"
          :disabled="isRunning"
        />
        <button class="send-btn" @click="startJourney" :disabled="!url || isRunning">
          {{ isRunning ? '运送中...' : '寄出' }}
        </button>
      </div>
    </div>

    <!-- 快速选择 -->
    <div class="quick-select" v-if="!isRunning && !showResult">
      <span class="quick-hint">快速体验：</span>
      <button
        v-for="u in quickUrls"
        :key="u.domain"
        @click="url = u.domain; startJourney()"
        class="quick-btn"
        :title="u.desc"
      >
        {{ u.domain }}
      </button>
    </div>

    <!-- 双栏对照展示 -->
    <div class="comparison-view" v-if="isRunning || showResult">
      <div class="comparison-header">
        <div class="side-label delivery-side">寄快递流程</div>
        <div class="connection-hint">对应关系</div>
        <div class="side-label network-side">网络访问流程</div>
      </div>

      <div class="comparison-steps">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step-row"
          :class="{
            passed: currentStep > index,
            current: currentStep === index,
            waiting: currentStep < index
          }"
        >
          <!-- 左侧：快递流程 -->
          <div class="step-delivery">
            <div class="step-icon">{{ step.deliveryIcon }}</div>
            <div class="step-content">
              <div class="step-title">{{ step.deliveryTitle }}</div>
              <div class="step-desc">{{ step.deliveryDesc }}</div>
            </div>
          </div>

          <!-- 中间：对应指示 -->
          <div class="step-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">→</div>
            <div class="connector-label">{{ step.mappingLabel }}</div>
          </div>

          <!-- 右侧：网络流程 -->
          <div class="step-network">
            <div class="step-icon">{{ step.networkIcon }}</div>
            <div class="step-content">
              <div class="step-title">{{ step.networkTitle }}</div>
              <div class="step-desc">{{ step.networkDesc }}</div>
              <div class="step-tech" v-if="currentStep >= index">{{ step.techDetail }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 当前步骤高亮提示 -->
      <div class="current-step-hint" v-if="isRunning && steps[currentStep]">
        <div class="hint-label">当前阶段</div>
        <div class="hint-content">
          <span class="hint-delivery">{{ steps[currentStep].deliveryTitle }}</span>
          <span class="hint-equals">=</span>
          <span class="hint-network">{{ steps[currentStep].networkTitle }}</span>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-track" v-if="isRunning">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <!-- 送达结果 -->
    <div class="delivery-result" v-if="showResult">
      <div class="success-banner">
        包裹送达！耗时 {{ time }}ms
      </div>

      <!-- 网页预览 -->
      <div class="page-preview">
        <div class="browser-chrome">
          <div class="chrome-dots">
            <span></span><span></span><span></span>
          </div>
          <div class="chrome-address">{{ url }}</div>
        </div>
        <div class="page-content">
          <div class="skeleton-line" style="width: 70%"></div>
          <div class="skeleton-line" style="width: 50%"></div>
          <div class="skeleton-img"></div>
          <div class="skeleton-line" style="width: 80%"></div>
        </div>
      </div>

      <button class="retry-btn" @click="reset">再寄一次</button>
    </div>

    <!-- 名词对照卡片（默认显示） -->
    <div class="glossary-cards" v-if="!isRunning && !showResult">
      <div class="glossary-title">快递 vs 网络 名词对照</div>
      <div class="cards-grid">
        <div
          v-for="item in glossary"
          :key="item.delivery"
          class="glossary-card"
          @mouseenter="hoveredCard = item"
          @mouseleave="hoveredCard = null"
        >
          <div class="card-delivery">
            <span class="card-label">快递</span>
            <span class="card-value">{{ item.delivery }}</span>
          </div>
          <div class="card-arrow">↔</div>
          <div class="card-network">
            <span class="card-label">网络</span>
            <span class="card-value">{{ item.network }}</span>
          </div>
          <div class="card-explanation" v-if="hoveredCard === item">
            {{ item.explanation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const url = ref('')
const isRunning = ref(false)
const showResult = ref(false)
const currentStep = ref(0)
const progress = ref(0)
const time = ref(0)
const hoveredCard = ref(null)

const quickUrls = [
  { domain: 'baidu.com', desc: '百度搜索引擎' },
  { domain: 'github.com', desc: '代码托管平台' },
  { domain: 'vuejs.org', desc: 'Vue.js 官网' }
]

// 步骤定义
const steps = [
  {
    id: 'parse',
    deliveryIcon: '写',
    deliveryTitle: '填写快递单',
    deliveryDesc: '写明收件人、地址、电话',
    mappingLabel: '对应',
    networkIcon: '输',
    networkTitle: '输入网址',
    networkDesc: '浏览器解析 URL',
    techDetail: '协议 + 域名 + 路径 + 参数'
  },
  {
    id: 'dns',
    deliveryIcon: '查',
    deliveryTitle: '查地址簿',
    deliveryDesc: '姓名 → 门牌号',
    mappingLabel: '对应',
    networkIcon: 'DNS',
    networkTitle: 'DNS 查询',
    networkDesc: '域名 → IP 地址',
    techDetail: 'google.com → 142.250.80.46'
  },
  {
    id: 'tcp',
    deliveryIcon: '电',
    deliveryTitle: '打电话确认',
    deliveryDesc: '"在家吗？能收件吗？"',
    mappingLabel: '对应',
    networkIcon: 'TCP',
    networkTitle: 'TCP 三次握手',
    networkDesc: '建立可靠连接',
    techDetail: 'SYN → SYN-ACK → ACK'
  },
  {
    id: 'http',
    deliveryIcon: '送',
    deliveryTitle: '快递员送货',
    deliveryDesc: '把包裹送到对方手中',
    mappingLabel: '对应',
    networkIcon: 'HTTP',
    networkTitle: 'HTTP 传输',
    networkDesc: '请求网页数据',
    techDetail: 'GET /index.html → 200 OK'
  },
  {
    id: 'render',
    deliveryIcon: '拆',
    deliveryTitle: '拆开包裹',
    deliveryDesc: '看到礼物内容',
    mappingLabel: '对应',
    networkIcon: '渲染',
    networkTitle: '浏览器渲染',
    networkDesc: '显示网页内容',
    techDetail: 'HTML + CSS + JS → 像素'
  }
]

// 名词对照表
const glossary = [
  {
    delivery: '快递单',
    network: 'URL',
    explanation: '网页的完整地址，包含去哪里找、找什么资源'
  },
  {
    delivery: '收件人姓名',
    network: '域名',
    explanation: '服务器的名字，如 google.com，方便人类记忆'
  },
  {
    delivery: '门牌号',
    network: 'IP 地址',
    explanation: '服务器的数字地址，如 142.250.80.46，计算机使用'
  },
  {
    delivery: '查地址簿',
    network: 'DNS 查询',
    explanation: '把域名转换成 IP 地址的查询系统'
  },
  {
    delivery: '打电话确认',
    network: 'TCP 握手',
    explanation: '确保双方在线且能正常通信的确认过程'
  },
  {
    delivery: '快递员送货',
    network: 'HTTP 请求',
    explanation: '浏览器向服务器请求数据，服务器返回响应'
  },
  {
    delivery: '拆开包裹',
    network: '浏览器渲染',
    explanation: '把代码转换成屏幕上看到的图文页面'
  }
]

const startJourney = () => {
  if (!url.value) return
  isRunning.value = true
  showResult.value = false
  currentStep.value = 0
  progress.value = 0
  const startTime = Date.now()

  let step = 0
  const runStep = () => {
    if (step >= steps.length) {
      isRunning.value = false
      showResult.value = true
      time.value = Date.now() - startTime
      return
    }
    currentStep.value = step

    // 进度动画
    let p = step * 20
    const interval = setInterval(() => {
      p += 1
      progress.value = p
      if (p >= (step + 1) * 20) {
        clearInterval(interval)
        step++
        setTimeout(runStep, 600)
      }
    }, 80)
  }
  runStep()
}

const reset = () => {
  url.value = ''
  isRunning.value = false
  showResult.value = false
  currentStep.value = 0
  progress.value = 0
}
</script>

<style scoped>
.delivery-journey {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部 */
.journey-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.journey-icon {
  font-size: 20px;
  font-weight: bold;
  color: var(--vp-c-brand);
}
.journey-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* 快递单 */
.delivery-form {
  margin-bottom: 16px;
}
.form-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-weight: 500;
}
.address-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 4px;
  transition: border-color 0.3s;
}
.address-input:focus-within {
  border-color: var(--vp-c-brand);
}
.protocol-badge {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-family: monospace;
}
.address-input input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 8px;
  outline: none;
  color: var(--vp-c-text-1);
}
.send-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--vp-c-brand), #67c23a);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}
.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}
.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 快速选择 */
.quick-select {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.quick-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.quick-btn {
  padding: 6px 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.quick-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

/* 双栏对照视图 */
.comparison-view {
  margin-top: 20px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
}

.comparison-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.side-label {
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  text-align: center;
}

.delivery-side {
  background: linear-gradient(135deg, #e6f7ff, #bae7ff);
  color: #096dd9;
}

.network-side {
  background: linear-gradient(135deg, #f6ffed, #d9f7be);
  color: #389e0d;
}

.connection-hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding: 4px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

/* 步骤行 */
.comparison-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: stretch;
  padding: 12px;
  border-radius: 10px;
  transition: all 0.3s;
  opacity: 0.4;
}

.step-row.passed {
  opacity: 0.7;
  background: rgba(103, 194, 58, 0.05);
}

.step-row.current {
  opacity: 1;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(103, 194, 58, 0.1));
  border: 2px solid var(--vp-c-brand);
  transform: scale(1.02);
}

/* 左侧：快递流程 */
.step-delivery {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #e6f7ff, #f0f5ff);
  border-radius: 10px;
  border: 1px solid #91d5ff;
}

.step-delivery .step-icon {
  width: 40px;
  height: 40px;
  background: #1890ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
}

.step-delivery .step-title {
  font-size: 14px;
  font-weight: 600;
  color: #096dd9;
}

.step-delivery .step-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 中间：连接器 */
.step-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 60px;
}

.connector-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
}

.connector-arrow {
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
}

.connector-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 右侧：网络流程 */
.step-network {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #f6ffed, #f0f9ff);
  border-radius: 10px;
  border: 1px solid #b7eb8f;
}

.step-network .step-icon {
  width: 40px;
  height: 40px;
  background: #52c41a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.step-network .step-title {
  font-size: 14px;
  font-weight: 600;
  color: #389e0d;
}

.step-network .step-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.step-network .step-tech {
  font-size: 11px;
  color: var(--vp-c-brand);
  margin-top: 6px;
  padding: 4px 8px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 4px;
  font-family: monospace;
}

/* 当前步骤提示 */
.current-step-hint {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(103, 194, 58, 0.1));
  border-radius: 10px;
  text-align: center;
}

.hint-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.hint-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hint-delivery {
  font-size: 14px;
  font-weight: 600;
  color: #096dd9;
  padding: 6px 12px;
  background: #e6f7ff;
  border-radius: 6px;
}

.hint-equals {
  font-size: 16px;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.hint-network {
  font-size: 14px;
  font-weight: 600;
  color: #389e0d;
  padding: 6px 12px;
  background: #f6ffed;
  border-radius: 6px;
}

/* 进度条 */
.progress-track {
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 16px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #67c23a);
  border-radius: 4px;
  transition: width 0.1s linear;
}

/* 送达结果 */
.delivery-result {
  margin-top: 20px;
  text-align: center;
}
.success-banner {
  font-size: 16px;
  font-weight: 600;
  color: #67c23a;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(103, 194, 58, 0.1);
  border-radius: 10px;
}
.page-preview {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.browser-chrome {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.chrome-dots {
  display: flex;
  gap: 6px;
}
.chrome-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-divider);
}
.chrome-dots span:nth-child(1) { background: #ff5f57; }
.chrome-dots span:nth-child(2) { background: #febc2e; }
.chrome-dots span:nth-child(3) { background: #28c840; }
.chrome-address {
  flex: 1;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: left;
}
.page-content {
  padding: 20px;
}
.skeleton-line {
  height: 12px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  margin-bottom: 12px;
}
.skeleton-img {
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, var(--vp-c-divider), var(--vp-c-bg-soft));
  border-radius: 8px;
  margin: 16px auto;
}
.retry-btn {
  padding: 10px 24px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  transition: all 0.3s;
}
.retry-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* 名词对照卡片 */
.glossary-cards {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.glossary-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  text-align: center;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.glossary-card {
  position: relative;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.glossary-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-delivery,
.card-network {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-network {
  margin-top: 8px;
}

.card-label {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.card-delivery .card-label {
  background: #e6f7ff;
  color: #096dd9;
}

.card-network .card-label {
  background: #f6ffed;
  color: #389e0d;
}

.card-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-arrow {
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
}

.card-explanation {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 响应式 */
@media (max-width: 768px) {
  .comparison-header {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .connection-hint {
    display: none;
  }

  .step-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .step-connector {
    flex-direction: row;
    min-height: 40px;
  }

  .connector-line {
    position: static;
    width: 100%;
    height: 2px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .address-input {
    flex-wrap: wrap;
  }

  .protocol-badge {
    display: none;
  }
}
</style>
