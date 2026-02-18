<template>
  <div class="paint-layer-demo">
    <div class="demo-header">
      <span class="icon">🎨</span>
      <span class="title">绘制层优化</span>
      <span class="subtitle">浏览器如何通过分层提升性能</span>
    </div>

    <div class="demo-content">
      <div class="layer-visualization">
        <div class="layers-container">
          <div
            v-for="(layer, index) in layers"
            :key="layer.id"
            class="layer"
            :class="{ active: layer.isActive, promoted: layer.isPromoted }"
            :style="{ zIndex: index }"
          >
            <div class="layer-header">
              <span class="layer-icon">{{ layer.icon }}</span>
              <span class="layer-name">{{ layer.name }}</span>
              <span
                v-if="layer.isPromoted"
                class="promoted-badge"
              >GPU层</span>
            </div>
            <div class="layer-content">
              <div
                v-if="layer.id === 'background'"
                class="background-box"
              />
              <div
                v-if="layer.id === 'card'"
                class="card-box"
              >
                <div class="card-title">
                  卡片
                </div>
              </div>
              <div
                v-if="layer.id === 'button'"
                class="button-box"
              >
                按钮
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="properties-panel">
        <div class="panel-title">
          触发新层的 CSS 属性：
        </div>
        <div class="property-list">
          <div
            v-for="prop in promotedProperties"
            :key="prop.name"
            class="property-item"
            @mouseenter="highlightLayer(prop.layerId)"
            @mouseleave="clearHighlight"
          >
            <code class="property-code">{{ prop.code }}</code>
            <span class="property-desc">{{ prop.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心要点：</strong>浏览器把需要动画的元素提升到独立的 GPU 层，这样动画时只需要调整位置和透明度，不需要重绘。但不要滥用，每个层都会占用 GPU 内存。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const layers = ref([
  {
    id: 'background',
    name: '背景层',
    icon: '🖼️',
    isActive: false,
    isPromoted: false
  },
  {
    id: 'card',
    name: '内容层',
    icon: '📄',
    isActive: false,
    isPromoted: false
  },
  {
    id: 'button',
    name: '动画层',
    icon: '✨',
    isActive: false,
    isPromoted: true
  }
])

const promotedProperties = [
  {
    name: '3D变换',
    code: 'transform: translate3d(0,0,0)',
    desc: '任何3D变换都会创建新层',
    layerId: 'button'
  },
  {
    name: '透明度动画',
    code: 'opacity',
    desc: '配合transition使用时',
    layerId: 'button'
  },
  {
    name: '固定定位',
    code: 'position: fixed',
    desc: '固定定位元素需要独立层',
    layerId: 'button'
  },
  {
    name: 'Will-change',
    code: 'will-change: transform',
    desc: '显式提示浏览器创建层',
    layerId: 'button'
  }
]

function highlightLayer(layerId) {
  layers.value.forEach(layer => {
    layer.isActive = layer.id === layerId
  })
}

function clearHighlight() {
  layers.value.forEach(layer => {
    layer.isActive = false
  })
}
</script>

<style scoped>
.paint-layer-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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
  padding: 0.75rem;
}

.layer-visualization {
  margin-bottom: 1rem;
}

.layers-container {
  position: relative;
  height: 200px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  overflow: hidden;
}

.layer {
  position: absolute;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.layer:nth-child(1) {
  top: 10px;
  left: 10px;
  transform: translate(0, 0);
}

.layer:nth-child(2) {
  top: 20px;
  left: 20px;
  transform: translate(10px, 10px);
}

.layer:nth-child(3) {
  top: 30px;
  left: 30px;
  transform: translate(20px, 20px);
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.2);
  z-index: 100;
}

.layer.promoted {
  border-color: var(--vp-c-success);
}

.layer-header {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.layer-icon {
  font-size: 1rem;
}

.layer-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.promoted-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-success);
  color: white;
  border-radius: 3px;
}

.layer-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.background-box {
  width: 80%;
  height: 60%;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.card-box {
  width: 120px;
  height: 80px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.button-box {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
}

.properties-panel {
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.property-list {
  display: grid;
  gap: 0.5rem;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.property-item:hover {
  background: var(--vp-c-bg-alt);
}

.property-code {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  color: var(--vp-c-brand-1);
}

.property-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
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
