<!--
  UrlToBrowserQuickStart.vue
  网络快递之旅 - 紧凑交互版 (Refactored)
  
  设计理念：
  1. 传送带模式：将纵向卡片改为横向时间轴，大幅节省空间。
  2. 动态教学：名词解释不再静态展示，而是随着包裹移动实时浮现。
  3. 极简高度：控制在 200px 以内。
  4. 手动步进：用户自主控制节奏，避免自动播放跟不上。
-->
<template>
  <div class="quick-start-compact">
    <!-- 顶部：极简输入栏 -->
    <div
      class="input-bar"
      :class="{ 'is-active': isActive }"
    >
      <div class="input-wrapper">
        <span class="protocol">https://</span>
        <input 
          v-model="url" 
          type="text" 
          placeholder="输入网址，开始旅程..."
          :disabled="isActive && !isFinished"
          @keyup.enter="handleMainAction"
        >
        
        <!-- 主操作按钮 -->
        <button 
          class="start-btn" 
          :class="{ 'next-btn': isActive && !isFinished, 'reset-btn': isFinished }"
          :disabled="!url" 
          @click="handleMainAction"
        >
          {{ mainButtonText }}
        </button>
      </div>
      
      <!-- 步骤控制按钮组 -->
      <div
        v-if="isActive"
        class="step-controls"
      >
        <button 
          class="control-btn" 
          :disabled="currentStep === 0" 
          title="上一步"
          @click="prevStep"
        >
          ⬅️
        </button>
        <button 
          class="control-btn" 
          :disabled="isFinished" 
          title="下一步"
          @click="nextStep"
        >
          ➡️
        </button>
      </div>

      <!-- 快速体验按钮 (仅在未开始时显示) -->
      <div
        v-if="!isActive"
        class="quick-chips"
      >
        <span class="chip-label">试一试:</span>
        <button
          v-for="u in quickUrls"
          :key="u"
          class="chip"
          @click="quickStart(u)"
        >
          {{ u }}
        </button>
      </div>
    </div>

    <!-- 核心舞台：横向传送带 -->
    <div class="conveyor-stage">
      <!-- 进度轨道 -->
      <div class="track-line">
        <div
          class="track-progress"
          :style="{ width: packagePosition + '%' }"
        />
      </div>

      <!-- 站点节点 -->
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="station"
        :class="{ 
          active: currentStep === index, 
          passed: currentStep > index,
          'final-station': index === steps.length - 1
        }"
        @click="jumpToStep(index)"
      >
        <div class="station-icon-box">
          <span class="station-icon">{{ step.icon }}</span>
          <div class="station-status-dot" />
        </div>
        <div class="station-label">
          {{ step.name }}
        </div>
      </div>

      <!-- 移动的包裹 (绝对定位) -->
      <div 
        v-show="isActive"
        class="moving-package"
        :style="{ '--package-pos': packagePosition }"
      >
        <div class="package-body">
          📦
        </div>
        <div class="package-shadow" />
        <!-- 动态提示气泡 -->
        <div class="package-bubble">
          <span class="bubble-analogy">{{ steps[currentStep]?.analogyAction }}</span>
        </div>
      </div>
    </div>

    <!-- 底部：动态对照条 -->
    <div class="dynamic-info-bar">
      <transition
        name="slide-up"
        mode="out-in"
      >
        <div
          v-if="isActive"
          :key="currentStep"
          class="info-content"
        >
          <div class="info-left">
            <span class="stage-badge">第 {{ currentStep + 1 }} 站</span>
            <span class="stage-title">{{ steps[currentStep].title }}</span>
          </div>
          <div class="info-divider" />
          <div class="info-right">
            <div class="mapping-item">
              <span class="mapping-icon">🚚</span>
              <span class="mapping-text">生活：{{ steps[currentStep].analogyDesc }}</span>
            </div>
            <div class="mapping-arrow">
              ↔️
            </div>
            <div class="mapping-item">
              <span class="mapping-icon">💻</span>
              <span class="mapping-text">技术：{{ steps[currentStep].techDesc }}</span>
            </div>
          </div>
        </div>
        <div
          v-else
          class="info-placeholder"
        >
          👈 在左上角输入网址，开启网络快递之旅
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const url = ref('')
const isActive = ref(false)
const currentStep = ref(0)

const quickUrls = ['baidu.com', 'google.com', 'github.com']

const steps = [
  {
    name: '出发',
    icon: '🛒',
    title: 'URL 解析',
    analogyAction: '填写购物单...',
    analogyDesc: '列出想要的商品清单',
    techDesc: '解析协议、域名和路径'
  },
  {
    name: '查仓库',
    icon: '🗺️',
    title: 'DNS 查询',
    analogyAction: '查发货地...',
    analogyDesc: '在地图上找到商家仓库',
    techDesc: '将域名解析为 IP 地址'
  },
  {
    name: '建立通道',
    icon: '📞',
    title: 'TCP 握手',
    analogyAction: '联系商家...',
    analogyDesc: '确认商家营业且能送货',
    techDesc: '建立可靠的数据通道'
  },
  {
    name: '发货',
    icon: '🚚',
    title: 'HTTP 请求',
    analogyAction: '运输中...',
    analogyDesc: '商家打包发货，快递送达',
    techDesc: '发送请求并接收响应'
  },
  {
    name: '收货',
    icon: '🎁',
    title: '浏览器渲染',
    analogyAction: '拆箱体验！',
    analogyDesc: '收到包裹，取出商品展示',
    techDesc: '解析代码绘制页面'
  }
]

// 计算属性
const isFinished = computed(() => currentStep.value === steps.length - 1)

const mainButtonText = computed(() => {
  if (!isActive.value) return '提交订单'
  if (isFinished.value) return '再来一单'
  return '下一步'
})

// 包裹位置 (0-100)
const packagePosition = computed(() => {
  if (!isActive.value) return 0
  const segmentCount = steps.length - 1
  const segmentWidth = 100 / segmentCount
  return currentStep.value * segmentWidth
})

// 方法
const quickStart = (u) => {
  url.value = u
  handleMainAction()
}

const handleMainAction = () => {
  if (!url.value) return

  if (!isActive.value) {
    // 开始
    isActive.value = true
    currentStep.value = 0
  } else if (isFinished.value) {
    // 重置
    isActive.value = false
    currentStep.value = 0
    url.value = ''
  } else {
    // 下一步
    nextStep()
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const jumpToStep = (index) => {
  if (!isActive.value) return
  currentStep.value = index
}
</script>

<style scoped>
.quick-start-compact {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* 顶部输入栏 */
.input-bar {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px;
  min-width: 280px;
  transition: all 0.3s;
}
.input-wrapper:focus-within {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.2);
}

.protocol {
  padding: 0 8px 0 12px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-family: monospace;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 0;
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
}

.start-btn {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 80px;
}
.start-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: var(--vp-c-divider);
}
.start-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.4);
}

.start-btn.next-btn {
  background: var(--vp-c-brand-light);
}

.start-btn.reset-btn {
  background: var(--vp-c-text-3);
}

.step-controls {
  display: flex;
  gap: 4px;
}
.control-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.control-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}
.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-chips {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chip-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.chip {
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.chip:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

/* 核心传送带舞台 */
.conveyor-stage {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px; /* 留出两端空间 */
  margin-bottom: 20px;
}

.track-line {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 36px;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  z-index: 0;
}
.track-progress {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.station {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px; /* 固定宽度以便定位 */
  cursor: pointer;
}

.station-icon-box {
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 8px;
  transition: all 0.3s;
}
.station.active .station-icon-box {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.2);
}
.station.passed .station-icon-box {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}
.station:hover .station-icon-box {
  border-color: var(--vp-c-brand);
}

.station-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  position: absolute;
  top: 40px;
  width: 80px;
  text-align: center;
  transition: all 0.3s;
}
.station.active .station-label {
  color: var(--vp-c-text-1);
  font-weight: 600;
  top: 44px;
}

/* 移动包裹 */
.moving-package {
  position: absolute;
  top: 16px;
  width: 40px;
  height: 40px;
  z-index: 2;
  pointer-events: none;
  
  /* 定位逻辑 */
  transform: translateX(-50%);
  left: calc(30px + (100% - 60px) * (var(--package-pos) / 100)); 
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.package-body {
  font-size: 24px;
  animation: bounce-move 0.5s infinite alternate;
}
.package-shadow {
  width: 20px;
  height: 6px;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  margin: -4px auto 0;
  animation: shadow-scale 0.5s infinite alternate;
}

.package-bubble {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: 0.9;
}
.package-bubble::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid var(--vp-c-brand);
}

@keyframes bounce-move {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}
@keyframes shadow-scale {
  from { transform: scale(1); opacity: 0.3; }
  to { transform: scale(0.6); opacity: 0.1; }
}

/* 底部动态信息条 */
.dynamic-info-bar {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  height: 50px; /* 极简高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px dashed var(--vp-c-divider);
  margin-top: 8px;
}

.info-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.info-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.stage-badge {
  background: var(--vp-c-brand);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}
.stage-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.info-divider {
  width: 1px;
  height: 20px;
  background: var(--vp-c-divider);
  margin: 0 16px;
}

.info-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.mapping-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.mapping-arrow {
  color: var(--vp-c-divider);
  font-size: 12px;
}
.mapping-text {
  color: var(--vp-c-text-1);
}

.info-placeholder {
  color: var(--vp-c-text-3);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 动画过渡 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .conveyor-stage {
    padding: 0 10px;
  }
  .track-line {
    left: 10px;
    right: 10px;
  }
  .info-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .dynamic-info-bar {
    height: auto;
    padding: 10px;
  }
  .info-divider { display: none; }
  .info-right {
    margin-top: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .mapping-arrow { display: none; }
}
</style>
