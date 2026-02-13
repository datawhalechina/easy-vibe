<template>
  <div class="layout-reflow-demo">
    <div class="demo-header">
      <span class="icon">📐</span>
      <span class="title">布局与重排</span>
      <span class="subtitle">看看布局计算如何影响页面</span>
    </div>

    <div class="demo-content">
      <div class="control-panel">
        <div class="control-group">
          <label>选择要修改的属性：</label>
          <select v-model="selectedProperty" @change="resetDemo">
            <option value="transform">transform: translateY() (只触发合成)</option>
            <option value="width">width (触发重排)</option>
            <option value="marginLeft">margin-left (触发重排)</option>
          </select>
        </div>
        <button class="toggle-btn" @click="toggleAnimation">
          {{ isAnimating ? '停止动画' : '开始动画' }}
        </button>
      </div>

      <div class="visualization">
        <div class="element-container">
          <div
            class="animated-element"
            :class="{ animating: isAnimating }"
            :style="elementStyle"
          >
            <span class="element-label">盒子</span>
          </div>
          <div class="neighbor-element">
            <span class="element-label">邻居元素</span>
          </div>
        </div>

        <div class="stats-panel">
          <div class="stat-item">
            <span class="stat-label">触发阶段：</span>
            <span class="stat-value" :class="statClass">{{ currentStage }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">性能影响：</span>
            <span class="stat-value" :class="performanceClass">{{ performanceImpact }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">是否影响其他元素：</span>
            <span class="stat-value">{{ affectsOthers }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>布局属性（如 width、margin）会触发重排，影响周围元素的位置。而 transform 只触发合成，在 GPU 上处理，不影响其他元素，性能更好。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedProperty = ref('transform')
const isAnimating = ref(false)

const elementStyle = computed(() => {
  if (!isAnimating.value) return {}

  if (selectedProperty.value === 'transform') {
    return { transform: 'translateY(20px)' }
  } else if (selectedProperty.value === 'width') {
    return { width: '150px' }
  } else if (selectedProperty.value === 'marginLeft') {
    return { marginLeft: '20px' }
  }
  return {}
})

const currentStage = computed(() => {
  if (!isAnimating.value) return '无'

  if (selectedProperty.value === 'transform') {
    return '合成（Composite）'
  }
  return '布局（Layout）+ 重绘（Paint）+ 合成'
})

const performanceClass = computed(() => {
  if (!isAnimating.value) return ''
  return selectedProperty.value === 'transform' ? 'good' : 'bad'
})

const performanceImpact = computed(() => {
  if (!isAnimating.value) return '-'

  if (selectedProperty.value === 'transform') {
    return '低（GPU加速）'
  }
  return '高（CPU计算）'
})

const affectsOthers = computed(() => {
  if (!isAnimating.value) return '-'

  if (selectedProperty.value === 'transform') {
    return '否'
  }
  return '是（需要重新计算）'
})

function toggleAnimation() {
  isAnimating.value = !isAnimating.value
}

function resetDemo() {
  isAnimating.value = false
}
</script>

<style scoped>
.layout-reflow-demo {
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

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.control-group select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
}

.toggle-btn {
  padding: 0.4rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: var(--vp-c-brand-dark);
}

.visualization {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.element-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  min-height: 150px;
}

.animated-element {
  width: 100px;
  height: 60px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.neighbor-element {
  width: 100px;
  height: 60px;
  background: var(--vp-c-text-3);
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: margin-left 0.3s ease;
}

.element-label {
  font-size: 0.85rem;
  font-weight: 500;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stat-value.good {
  color: var(--vp-c-success);
}

.stat-value.bad {
  color: var(--vp-c-danger);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon { margin-right: 0.25rem; }
</style>
