<template>
  <div class="demo">
    <div class="title">🚀 双击图标后，电脑在忙什么？</div>
    
    <div class="timeline">
      <div 
        v-for="(step, idx) in steps" 
        :key="idx"
        class="step"
        :class="{ 
          done: currentStep > idx,
          active: currentStep === idx,
          pending: currentStep < idx 
        }"
      >
        <div class="step-marker">
          <span class="step-num">{{ idx + 1 }}</span>
          <span class="step-icon">{{ step.icon }}</span>
        </div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc" v-if="currentStep === idx">{{ step.desc }}</div>
        </div>
        <div class="step-arrow" v-if="idx < steps.length - 1">→</div>
      </div>
    </div>

    <div class="visualization" v-if="currentStep >= 0">
      <div class="viz-box" :class="vizClass">
        <div class="viz-icon">{{ currentViz.icon }}</div>
        <div class="viz-text">{{ currentViz.text }}</div>
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const steps = [
  { 
    icon: '👆', 
    title: '你双击图标', 
    desc: '操作系统收到"启动浏览器"的请求' 
  },
  { 
    icon: '📋', 
    title: '创建进程', 
    desc: '建立"户口本"，记录进程ID和状态' 
  },
  { 
    icon: '🧠', 
    title: '分配内存', 
    desc: '划分虚拟内存空间，让程序以为独占内存' 
  },
  { 
    icon: '📁', 
    title: '加载文件', 
    desc: '从硬盘读取程序代码到内存' 
  },
  { 
    icon: '▶️', 
    title: '开始运行', 
    desc: 'CPU开始执行，窗口出现在屏幕上！' 
  }
]

const vizStates = [
  { icon: '🖱️', text: '点击中...' },
  { icon: '📋', text: '创建进程...' },
  { icon: '💾', text: '分配内存...' },
  { icon: '💿', text: '读取文件...' },
  { icon: '🖥️', text: '运行中！' }
]

const currentStep = ref(0)
let timer = null

const vizClass = computed(() => {
  const classes = ['click', 'process', 'memory', 'file', 'run']
  return classes[currentStep.value] || ''
})

const currentViz = computed(() => vizStates[currentStep.value] || vizStates[0])

const progressPercent = computed(() => {
  return ((currentStep.value + 1) / steps.length) * 100
})

onMounted(() => {
  timer = setInterval(() => {
    currentStep.value = (currentStep.value + 1) % steps.length
  }, 2000)
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

.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
}

.timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.step-marker {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  position: relative;
  transition: all 0.3s;
}

.step-num {
  font-size: 10px;
  font-weight: 600;
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon {
  font-size: 16px;
}

.step.done .step-marker {
  background: #10b981;
  color: white;
}

.step.active .step-marker {
  background: var(--vp-c-brand);
  color: white;
  animation: pulse 1s infinite;
  transform: scale(1.1);
}

.step.pending .step-marker {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

.step-content {
  text-align: center;
  min-height: 40px;
}

.step-title {
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 2px;
}

.step.done .step-title {
  color: #10b981;
}

.step.active .step-title {
  color: var(--vp-c-brand);
}

.step.pending .step-title {
  color: var(--vp-c-text-3);
}

.step-desc {
  font-size: 9px;
  color: var(--vp-c-text-2);
  line-height: 1.3;
  max-width: 80px;
}

.step-arrow {
  position: absolute;
  right: -10px;
  top: 10px;
  font-size: 12px;
  color: var(--vp-c-divider);
}

.visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  text-align: center;
}

.viz-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 8px;
  transition: all 0.3s;
}

.viz-box.click {
  background: #667eea22;
  border: 2px solid #667eea;
}

.viz-box.process {
  background: #f093fb22;
  border: 2px solid #f5576c;
}

.viz-box.memory {
  background: #4facfe22;
  border: 2px solid #4facfe;
}

.viz-box.file {
  background: #fa709a22;
  border: 2px solid #fa709a;
}

.viz-box.run {
  background: #10b98122;
  border: 2px solid #10b981;
  animation: success 0.5s ease;
}

.viz-icon {
  font-size: 32px;
}

.viz-text {
  font-size: 12px;
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: var(--vp-c-bg);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #10b981);
  border-radius: 2px;
  transition: width 0.5s ease;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--vp-c-brand-soft); }
  50% { box-shadow: 0 0 0 8px transparent; }
}

@keyframes success {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>
