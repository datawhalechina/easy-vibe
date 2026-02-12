<template>
  <div class="build-pipeline-demo">
    <div class="demo-header">
      <span class="icon">🏭</span>
      <span class="title">构建流水线</span>
      <span class="subtitle">从源代码到产物的完整旅程</span>
    </div>

    <div class="pipeline">
      <div v-for="(stage, i) in stages" :key="stage.id" class="stage">
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div class="stage-desc">{{ stage.desc }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>流水线思想：</strong>就像工厂流水线一样，代码经过一道道工序，最终变成可以在浏览器运行的产物。每个阶段各司其职，环环相扣。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stages = ref([
  { id: 1, icon: '🔍', name: '代码检查', desc: 'ESLint/TSC' },
  { id: 2, icon: '⚙️', name: '代码转换', desc: 'Babel/SWC' },
  { id: 3, icon: '📦', name: '依赖解析', desc: '构建依赖图' },
  { id: 4, icon: '📚', name: '模块打包', desc: 'Webpack/Rollup' },
  { id: 5, icon: '✨', name: '代码优化', desc: '压缩/TreeShake' }
])
</script>

<style scoped>
.build-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow-x: auto;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  position: relative;
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.stage-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 16px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
