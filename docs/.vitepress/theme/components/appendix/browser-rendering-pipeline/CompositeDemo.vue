<template>
  <div class="composite-demo">
    <div class="demo-header">
      <span class="icon">🎬</span>
      <span class="title">合成层演示</span>
      <span class="subtitle">浏览器渲染的最后阶段 - 图层合成</span>
    </div>

    <div class="intro-text">
      合成是浏览器渲染的最后一步。想象你在<span class="highlight">制作PPT动画</span>：你已经准备好了所有图层，现在只需要调整它们的位置、透明度，然后把它们叠在一起显示出来。这就是合成要做的事情。
    </div>

    <div class="demo-content">
      <div class="layers-stage">
        <div
          v-for="layer in layers"
          :key="layer.id"
          class="layer-item"
          :class="{ animating: layer.isAnimating }"
          :style="getLayerStyle(layer)"
        >
          <div class="layer-visual">
            <span class="layer-emoji">{{ layer.emoji }}</span>
            <span class="layer-name">{{ layer.name }}</span>
          </div>
        </div>
      </div>

      <div class="composite-result">
        <div class="result-box">
          <div class="result-title">合成结果</div>
          <div class="result-display">
            <div
              v-for="layer in layers"
              :key="layer.id"
              class="result-layer"
              :class="{ moving: layer.isAnimating }"
              :style="getResultLayerStyle(layer)"
            >
              {{ layer.emoji }}
            </div>
          </div>
        </div>
      </div>

      <div class="control-panel">
        <button class="action-btn" @click="toggleAnimation">
          {{ isAnimating ? '⏸ 暂停动画' : '▶️ 开始动画' }}
        </button>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>合成阶段在 GPU 上执行，只调整位置、透明度等，不重新绘制像素。因此 transform 和 opacity 动画性能最好，不会触发重排和重绘。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)

const layers = ref([
  {
    id: 'bg',
    name: '背景层',
    emoji: '🖼️',
    x: 50,
    y: 20,
    opacity: 1,
    isAnimating: false
  },
  {
    id: 'content',
    name: '内容层',
    emoji: '📄',
    x: 50,
    y: 50,
    opacity: 1,
    isAnimating: false
  },
  {
    id: 'overlay',
    name: '浮层',
    emoji: '✨',
    x: 50,
    y: 80,
    opacity: 0.8,
    isAnimating: false
  }
])

function toggleAnimation() {
  isAnimating.value = !isAnimating.value
  layers.value.forEach(layer => {
    layer.isAnimating = isAnimating.value
  })
}

function getLayerStyle(layer) {
  return {
    left: `${layer.x}%`,
    top: `${layer.y}%`,
    opacity: layer.opacity
  }
}

function getResultLayerStyle(layer) {
  if (!layer.isAnimating) {
    return {
      transform: `translate(${layer.x - 50}%, ${layer.y - 50}%)`,
      opacity: layer.opacity
    }
  }
  return {
    transform: `translate(${layer.x - 50}%, ${layer.y - 30}%)`,
    opacity: layer.opacity,
    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
  }
}
</script>

<style scoped>
.composite-demo {
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
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.layers-stage {
  position: relative;
  height: 150px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px dashed var(--vp-c-divider);
}

.layer-item {
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.layer-item.animating {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, -70%); }
}

.layer-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.layer-emoji { font-size: 1.5rem; }
.layer-name { font-size: 0.7rem; color: var(--vp-c-text-2); }

.composite-result {
  margin-bottom: 1rem;
}

.result-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.result-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.result-display {
  position: relative;
  height: 100px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.result-layer {
  position: absolute;
  font-size: 2rem;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.result-layer.moving {
  animation: resultFloat 2s ease-in-out infinite;
}

@keyframes resultFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -20px); }
}

.control-panel {
  display: flex;
  justify-content: center;
}

.action-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: var(--vp-c-brand-dark);
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
