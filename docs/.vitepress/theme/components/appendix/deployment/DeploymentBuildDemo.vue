<!--
  DeploymentBuildDemo.vue
  构建过程演示：原材料变成品（简化版）
-->
<template>
  <div class="deployment-build">
    <div class="header">
      <span class="icon">📦</span>
      <span class="title">代码构建</span>
    </div>

    <div class="content">
      <div class="flow">
        <div class="step" :class="{ done: buildProgress >= 25 }">
          <span class="num">1</span>
          <span class="text">解析依赖</span>
        </div>
        <span class="arrow">→</span>
        <div class="step" :class="{ done: buildProgress >= 50 }">
          <span class="num">2</span>
          <span class="text">编译转换</span>
        </div>
        <span class="arrow">→</span>
        <div class="step" :class="{ done: buildProgress >= 75 }">
          <span class="num">3</span>
          <span class="text">打包压缩</span>
        </div>
        <span class="arrow">→</span>
        <div class="step" :class="{ done: buildProgress >= 100 }">
          <span class="num">4</span>
          <span class="text">完成</span>
        </div>
      </div>

      <div class="progress">
        <div class="bar">
          <div class="fill" :style="{ width: `${buildProgress}%` }"></div>
        </div>
        <div class="percent">{{ buildProgress }}%</div>
      </div>

      <button @click="startBuild" class="build-btn" :disabled="building">
        {{ building ? '构建中...' : '▶ 开始构建' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const building = ref(false)
const buildProgress = ref(0)

const startBuild = () => {
  if (building.value) return
  building.value = true
  buildProgress.value = 0

  const interval = setInterval(() => {
    buildProgress.value += 5
    if (buildProgress.value >= 100) {
      clearInterval(interval)
      building.value = false
      setTimeout(() => {
        buildProgress.value = 0
      }, 2000)
    }
  }, 150)
}
</script>

<style scoped>
.deployment-build {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 1rem 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.header .icon {
  font-size: 1.25rem;
}

.header .title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow-x: auto;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  min-width: 60px;
}

.step.done {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-delta);
}

.step .num {
  font-weight: 700;
  font-size: 0.9rem;
}

.arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.percent {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.build-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.build-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
}

.build-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
