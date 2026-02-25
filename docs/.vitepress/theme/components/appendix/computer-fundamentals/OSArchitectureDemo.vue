<template>
  <div class="demo">
    <div class="scene">
      <!-- 应用程序层 -->
      <div class="layer-box app-layer" :class="{ active: currentStep >= 1 }">
        <div class="layer-title">📱 应用程序</div>
        <div class="apps">
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">🎵</span>
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">💬</span>
          <span class="app-icon" :class="{ pulse: currentStep === 1 }">🎮</span>
        </div>
      </div>

      <!-- 流动箭头 -->
      <div class="flow-arrow" :class="{ flowing: currentStep === 2 }">
        <div class="arrow-line"></div>
        <div class="arrow-head">▼</div>
        <div class="packet" v-if="currentStep === 2">📦 请求</div>
      </div>

      <!-- 操作系统层 -->
      <div class="layer-box os-layer" :class="{ active: currentStep >= 2, processing: currentStep === 3 }">
        <div class="layer-title">🖥️ 操作系统</div>
        <div class="os-core">
          <div class="core-item" :class="{ working: currentStep === 3 && subStep === 0 }">调度CPU</div>
          <div class="core-item" :class="{ working: currentStep === 3 && subStep === 1 }">分配内存</div>
          <div class="core-item" :class="{ working: currentStep === 3 && subStep === 2 }">管理文件</div>
        </div>
      </div>

      <!-- 流动箭头 -->
      <div class="flow-arrow" :class="{ flowing: currentStep === 4 }">
        <div class="arrow-line"></div>
        <div class="arrow-head">▼</div>
        <div class="packet" v-if="currentStep === 4">⚡ 指令</div>
      </div>

      <!-- 硬件层 -->
      <div class="layer-box hw-layer" :class="{ active: currentStep >= 4, working: currentStep === 5 }">
        <div class="layer-title">💾 硬件</div>
        <div class="hw-items">
          <span class="hw-icon" :class="{ spin: currentStep === 5 }">🧠 CPU</span>
          <span class="hw-icon" :class="{ flash: currentStep === 5 }">💾 内存</span>
          <span class="hw-icon" :class="{ flash: currentStep === 5 }">💿 硬盘</span>
        </div>
      </div>
    </div>

    <div class="status-bar">
      <span class="status-text">{{ statusText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentStep = ref(0)
const subStep = ref(0)
let timer = null

const statusTexts = [
  '应用程序准备发起请求...',
  '应用程序：我要播放音乐！',
  '请求发送给操作系统...',
  '操作系统正在协调资源...',
  '指令下发到硬件...',
  '硬件开始执行：音乐播放中 🎵'
]

const statusText = computed(() => statusTexts[currentStep.value] || '')

const nextStep = () => {
  if (currentStep.value === 3) {
    // 在操作系统处理阶段，循环显示子步骤
    subStep.value = (subStep.value + 1) % 3
    if (subStep.value === 0) {
      currentStep.value = 4
    }
  } else {
    currentStep.value = (currentStep.value + 1) % 6
    if (currentStep.value === 3) {
      subStep.value = 0
    }
  }
}

onMounted(() => {
  timer = setInterval(nextStep, 1500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 1rem 0;
}

.scene {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-box {
  padding: 12px;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s;
  opacity: 0.5;
}

.layer-box.active {
  opacity: 1;
}

.app-layer {
  background: linear-gradient(135deg, #667eea22, #764ba222);
  border-color: #667eea55;
}

.app-layer.active {
  border-color: #667eea;
  box-shadow: 0 0 15px #667eea55;
}

.os-layer {
  background: linear-gradient(135deg, #f093fb22, #f5576c22);
  border-color: #f5576c55;
}

.os-layer.active {
  border-color: #f5576c;
  box-shadow: 0 0 15px #f5576c55;
}

.os-layer.processing {
  animation: pulse-os 1s infinite;
}

.hw-layer {
  background: linear-gradient(135deg, #4facfe22, #00f2fe22);
  border-color: #4facfe55;
}

.hw-layer.active {
  border-color: #4facfe;
  box-shadow: 0 0 15px #4facfe55;
}

.hw-layer.working {
  animation: pulse-hw 0.5s infinite;
}

.layer-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  text-align: center;
}

.apps {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.app-icon {
  font-size: 24px;
  transition: transform 0.3s;
}

.app-icon.pulse {
  animation: bounce 0.5s infinite;
}

.os-core {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.core-item {
  padding: 6px 12px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 11px;
  transition: all 0.3s;
}

.core-item.working {
  background: #f5576c;
  color: white;
  transform: scale(1.1);
}

.hw-items {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hw-icon {
  font-size: 12px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  transition: all 0.3s;
}

.hw-icon.spin {
  animation: spin 1s linear infinite;
}

.hw-icon.flash {
  animation: flash 0.5s infinite;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  position: relative;
}

.arrow-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-arrow.flowing .arrow-line {
  background: linear-gradient(to bottom, #f5576c, #4facfe);
  box-shadow: 0 0 5px #f5576c;
}

.arrow-head {
  font-size: 10px;
  color: var(--vp-c-divider);
  line-height: 1;
}

.flow-arrow.flowing .arrow-head {
  color: #4facfe;
}

.packet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f5576c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  animation: flow-down 1s ease-in-out;
  white-space: nowrap;
}

.status-bar {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
}

.status-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse-os {
  0%, 100% { box-shadow: 0 0 5px #f5576c55; }
  50% { box-shadow: 0 0 20px #f5576caa; }
}

@keyframes pulse-hw {
  0%, 100% { box-shadow: 0 0 5px #4facfe55; }
  50% { box-shadow: 0 0 20px #4facfeaa; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes flow-down {
  0% { opacity: 0; transform: translate(-50%, -100%); }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 0%); }
}
</style>
