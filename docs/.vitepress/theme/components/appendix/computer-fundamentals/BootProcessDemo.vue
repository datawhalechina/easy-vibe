<template>
  <div class="boot-demo">
    <div class="demo-label">操作系统启动流程 ── 点击逐步启动</div>

    <div class="timeline">
      <div
        v-for="(step, index) in steps"
        :key="step.name"
        class="timeline-item"
        :class="{ active: currentStep >= index }"
        @click="currentStep = index"
      >
        <div class="timeline-marker">
          <span class="marker-dot" :class="{ filled: currentStep >= index }">{{ index + 1 }}</span>
          <span v-if="index < steps.length - 1" class="marker-line" :class="{ filled: currentStep >= index }"></span>
        </div>
        <div class="timeline-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击查看各步骤</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentStep = ref(0)
const steps = [
  { name: '引导程序', desc: '从硬盘读取 bootloader' },
  { name: '内核加载', desc: '加载操作系统内核' },
  { name: '系统服务', desc: '启动各种后台服务' },
  { name: '桌面环境', desc: '显示登录界面和桌面' }
]
</script>

<style scoped>
.boot-demo {
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

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 0.6rem;
  padding: 0.3rem 0;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.5rem;
}

.marker-dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}

.marker-dot.filled {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.marker-line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-divider);
  min-height: 1.5rem;
}

.marker-line.filled {
  background: var(--vp-c-brand);
}

.timeline-content {
  flex: 1;
  padding-bottom: 0.8rem;
}

.step-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.step-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
}
</style>
