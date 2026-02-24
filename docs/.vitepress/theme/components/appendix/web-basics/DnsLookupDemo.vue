<template>
  <div class="dns-lookup-demo custom-demo-base">
    <div class="demo-label">DNS 解析 ── 查地址簿找坐标</div>
    <div class="demo-panel">
      
      <div class="lookup-flow">
        <!-- 浏览器 -->
        <div class="flow-node browser-node" :class="{ active: true }">
          <div class="node-icon">📱</div>
          <div class="node-title">浏览器</div>
          <div class="node-desc" v-if="step === 0">要去 www.google.com</div>
          <div class="node-desc" v-if="step === 1">问 114查号台...</div>
          <div class="node-desc success" v-if="step === 2">收到: 142... 发车!</div>
        </div>

        <div class="flow-path-wrapper">
          <div class="flow-path" :class="{ active: step >= 0 }">
            <span class="path-label">询问坐标</span>
            <div class="moving-dot" v-if="step === 1"></div>
          </div>
          <div class="flow-path reverse" :class="{ active: step === 2 }">
            <span class="path-label">返回 IP</span>
            <div class="moving-dot reverse" v-if="step === 2"></div>
          </div>
        </div>

        <!-- 查号台 -->
        <div class="flow-node dns-node" :class="{ active: step >= 1, flash: step === 1 }">
          <div class="node-icon">📞</div>
          <div class="node-title">114查号台 (DNS)</div>
          <div class="node-desc" v-if="step === 0">待命</div>
          <div class="node-desc" v-if="step === 1">正在翻地址簿...</div>
          <div class="node-desc success" v-if="step === 2">找到啦: 142.250.80.46</div>
        </div>
      </div>

      <div class="action-bar">
        <button class="action-btn" @click="runDemo" :disabled="isRunning"> 
          {{ isRunning ? '查询中...' : (step === 2 ? '重新查询' : '开始 DNS 查询') }} 
        </button>
      </div>

    </div>
    <div class="demo-status">{{ statusText }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)
const isRunning = ref(false)
const statusList = [
  '点击按钮，告诉浏览器你不知道 Google 服务器在哪',
  '浏览器向营运商查号台 (DNS) 请求数字坐标...',
  '拿到具体的 IP 地址，准备开始发车通信！'
]

const statusText = computed(() => statusList[step.value])

const runDemo = () => {
  if (isRunning.value) return
  step.value = 0
  isRunning.value = true
  
  setTimeout(() => {
    step.value = 1
    setTimeout(() => {
      step.value = 2
      isRunning.value = false
    }, 1500)
  }, 300)
}
</script>

<style scoped>
.custom-demo-base {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.demo-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.demo-status {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-align: center;
  font-weight: bold;
}

.lookup-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  transition: all 0.3s;
  z-index: 2;
}

.flow-node.active {
  border-color: var(--vp-c-brand-1, #3b82f6);
  background: var(--vp-c-brand-soft, #eff6ff);
}

.flow-node.flash {
  box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2);
}

.dns-node.active {
  border-color: var(--vp-c-success-1, #10b981);
  background: var(--vp-c-success-soft, #ecfdf5);
}
.dns-node.flash {
  box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.2);
}

.node-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.node-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-top: 0.2rem;
  padding: 0 0.5rem;
  min-height: 2.2em;
}

.node-desc.success {
  color: var(--vp-c-success-1, #10b981);
  font-weight: bold;
}

.flow-path-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 60px;
  margin: 0 -20px;
  z-index: 1;
}

.flow-path {
  height: 2px;
  background: var(--vp-c-divider);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
}

.flow-path.active {
  background: var(--vp-c-brand-1, #3b82f6);
}

.flow-path.reverse.active {
  background: var(--vp-c-success-1, #10b981);
}

.path-label {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0 0.4rem;
  white-space: nowrap;
}

.flow-path.reverse .path-label {
  top: auto;
  bottom: -24px;
}

.moving-dot {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1, #3b82f6);
  animation: moveRight 1.5s linear infinite;
}

.moving-dot.reverse {
  background: var(--vp-c-success-1, #10b981);
  left: auto;
  right: 0;
  animation: moveLeft 1.5s linear infinite;
}

@keyframes moveRight {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes moveLeft {
  0% { right: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { right: 100%; opacity: 0; }
}

.action-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn {
  background: var(--vp-c-brand-1, #3b82f6);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #2563eb);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .lookup-flow {
    flex-direction: column;
    gap: 2rem;
  }
  .flow-path-wrapper {
    height: 40px;
    width: 2px;
    margin: -10px 0;
  }
  .flow-path {
    width: 2px;
    height: 100%;
    top: 0;
    left: 50%;
  }
  .path-label {
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .flow-path.reverse .path-label {
    left: auto;
    right: 10px;
  }
  .moving-dot, .moving-dot.reverse {
    display: none;
  }
}
</style>
