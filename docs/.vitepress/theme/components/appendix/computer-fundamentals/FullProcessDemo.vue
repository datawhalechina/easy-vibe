<template>
  <div class="full-process-demo">
    <div class="demo-label">完整流程概览 ── 点击逐步演示</div>

    <div class="process-flow">
      <div
        v-for="(phase, index) in phases"
        :key="phase.name"
        class="phase"
        :class="{ active: currentPhase >= index }"
        @click="currentPhase = index"
      >
        <div class="phase-icon">{{ phase.icon }}</div>
        <div class="phase-name">{{ phase.name }}</div>
        <div class="phase-steps">
          <span v-for="step in phase.steps" :key="step" class="step-tag">{{ step }}</span>
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击查看各阶段</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentPhase = ref(0)
const phases = [
  { icon: '🔌', name: '硬件启动', steps: ['电源', '主板', 'CPU', 'BIOS'] },
  { icon: '💻', name: '系统启动', steps: ['引导程序', '内核', '服务', '桌面'] },
  { icon: '🌐', name: '浏览器', steps: ['双击图标', '加载程序', '显示窗口'] },
  { icon: '📡', name: '网络请求', steps: ['URL解析', 'DNS', 'TCP', 'HTTP'] },
  { icon: '🎨', name: '页面渲染', steps: ['HTML解析', 'CSS', '布局', '绘制'] }
]
</script>

<style scoped>
.full-process-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.process-flow {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.phase {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  opacity: 0.4;
  transition: all 0.3s;
}

.phase.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.phase-icon {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.phase-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.phase-steps {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  width: 100%;
}

.step-tag {
  font-size: 0.58rem;
  text-align: center;
  padding: 0.15rem 0;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-3);
}

.phase.active .step-tag {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
