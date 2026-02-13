<!--
  ReflowRepaintDemo.vue
  重排与重绘演示
-->
<template>
  <div class="reflow-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">重排与重绘</span>
      <span class="subtitle">观察不同操作对性能的影响</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <div class="demo-area">
      <div class="canvas-area">
        <div class="box-container">
          <div
            v-for="box in boxes"
            :key="box.id"
            class="box"
            :style="getBoxStyle(box)"
          >
            {{ box.id }}
          </div>
        </div>

        <div class="performance-meter">
          <div class="meter-label">性能影响</div>
          <div class="meter-bar">
            <div
              class="meter-fill"
              :class="performanceLevel.class"
              :style="{ width: performanceImpact + '%' }"
            ></div>
          </div>
          <div class="meter-value" :class="performanceLevel.class">
            {{ performanceLevel.text }}
          </div>
        </div>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-label">操作类型</div>
            <div class="stat-value">{{ currentOperation }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">影响范围</div>
            <div class="stat-value">{{ affectedElements }} 个元素</div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div v-if="activeTab === 'reflow'" class="control-group">
          <button @click="changeWidth" class="btn high-impact">改变宽度</button>
          <button @click="changePosition" class="btn high-impact">改变位置</button>
          <button @click="addBox" class="btn high-impact">添加元素</button>
        </div>

        <div v-if="activeTab === 'repaint'" class="control-group">
          <button @click="changeColor" class="btn medium-impact">改变颜色</button>
          <button @click="changeBackground" class="btn medium-impact">
            改变背景
          </button>
          <button @click="toggleBorder" class="btn medium-impact">切换边框</button>
        </div>

        <div v-if="activeTab === 'composite'" class="control-group">
          <button @click="transformTranslate" class="btn low-impact">
            Transform 位移
          </button>
          <button @click="transformRotate" class="btn low-impact">
            Transform 旋转
          </button>
          <button @click="changeOpacity" class="btn low-impact">
            改变透明度
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="activeTab" class="tab-info">
        <div v-if="activeTab === 'reflow'" class="info-content">
          <p>
            <strong>重排 (Reflow)</strong>：当元素的位置、尺寸发生变化时，浏览器需要重新计算布局。重排开销最大，因为要重新计算所有受影响元素的位置。
          </p>
        </div>
        <div v-if="activeTab === 'repaint'" class="info-content">
          <p>
            <strong>重绘 (Repaint)</strong>：当元素的外观（颜色、背景）发生变化，但位置不变时，浏览器只需要重新绘制像素。比重排快，但仍有开销。
          </p>
        </div>
        <div v-if="activeTab === 'composite'" class="info-content">
          <p>
            <strong>合成 (Composite)</strong>：使用 transform 和 opacity 等属性，浏览器可以在合成层上完成变化，完全不触发布局和绘制。性能最佳，推荐优先使用。
          </p>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>性能优化原则：</strong>优先使用 transform 和 opacity 进行动画，避免频繁触发布局计算（如 width、height、top、left），可以大幅提升页面性能。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('reflow')

const tabs = [
  { id: 'reflow', icon: '🔴', label: '重排' },
  { id: 'repaint', icon: '🟡', label: '重绘' },
  { id: 'composite', icon: '🟢', label: '合成' }
]

const boxes = ref([
  { id: 1, x: 20, y: 20, width: 80, height: 80, bg: 'var(--vp-c-brand-1)', rotation: 0, opacity: 1 },
  { id: 2, x: 120, y: 20, width: 80, height: 80, bg: 'var(--vp-c-brand-2)', rotation: 0, opacity: 1 },
  { id: 3, x: 20, y: 120, width: 80, height: 80, bg: 'var(--vp-c-brand-3)', rotation: 0, opacity: 1 }
])

const currentOperation = ref('无')
const performanceImpact = ref(0)
const affectedElements = ref(0)

const performanceLevel = computed(() => {
  if (performanceImpact.value <= 33) return { class: 'good', text: '低' }
  if (performanceImpact.value <= 66) return { class: 'medium', text: '中' }
  return { class: 'high', text: '高' }
})

function getBoxStyle(box) {
  return {
    left: box.x + 'px',
    top: box.y + 'px',
    width: box.width + 'px',
    height: box.height + 'px',
    backgroundColor: box.bg,
    transform: `rotate(${box.rotation}deg)`,
    opacity: box.opacity
  }
}

function updateMetrics(operation, impact, affected) {
  currentOperation.value = operation
  performanceImpact.value = impact
  affectedElements.value = affected
}

function changeWidth() {
  boxes.value.forEach((box) => { box.width = 60 + Math.random() * 60 })
  updateMetrics('改变宽度', 90, boxes.value.length)
}

function changePosition() {
  boxes.value.forEach((box) => {
    box.x = Math.random() * 150
    box.y = Math.random() * 150
  })
  updateMetrics('改变位置', 85, boxes.value.length)
}

function addBox() {
  const newId = boxes.value.length + 1
  boxes.value.push({
    id: newId,
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: 80,
    height: 80,
    bg: 'var(--vp-c-brand)',
    rotation: 0,
    opacity: 1
  })
  updateMetrics('添加元素', 95, boxes.value.length)
}

function changeColor() {
  const colors = ['var(--vp-c-brand-1)', 'var(--vp-c-brand-2)', 'var(--vp-c-brand-3)']
  boxes.value.forEach((box) => { box.bg = colors[Math.floor(Math.random() * colors.length)] })
  updateMetrics('改变颜色', 50, boxes.value.length)
}

function changeBackground() {
  const bgs = ['var(--vp-c-brand-1)', 'var(--vp-c-brand-2)', 'var(--vp-c-brand-3)']
  boxes.value.forEach((box) => { box.bg = bgs[Math.floor(Math.random() * bgs.length)] })
  updateMetrics('改变背景', 45, boxes.value.length)
}

function toggleBorder() {
  updateMetrics('切换边框', 55, boxes.value.length)
}

function transformTranslate() {
  boxes.value.forEach((box) => { box.x += Math.random() * 20 - 10 })
  updateMetrics('Transform 位移', 10, boxes.value.length)
}

function transformRotate() {
  boxes.value.forEach((box) => { box.rotation += Math.random() * 30 - 15 })
  updateMetrics('Transform 旋转', 10, boxes.value.length)
}

function changeOpacity() {
  boxes.value.forEach((box) => { box.opacity = 0.5 + Math.random() * 0.5 })
  updateMetrics('改变透明度', 10, boxes.value.length)
}
</script>

<style scoped>
.reflow-demo {
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

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg-inverse);
  border-color: var(--vp-c-brand);
}

.tab-icon { font-size: 1rem; }
.tab-label { font-weight: 500; }

.demo-area {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 1rem;
}

@media (max-width: 768px) {
  .demo-area { grid-template-columns: 1fr; }
}

.canvas-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.box-container {
  position: relative;
  height: 200px;
  margin-bottom: 1rem;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 6px;
}

.box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-bg-inverse);
  border-radius: 6px;
  transition: all 0.3s ease;
  user-select: none;
}

.performance-meter {
  margin-bottom: 0.75rem;
}

.meter-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.meter-bar {
  height: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.35rem;
}

.meter-fill {
  height: 100%;
  transition: all 0.5s ease;
  border-radius: 5px;
}

.meter-fill.good { background: var(--vp-c-success-1); }
.meter-fill.medium { background: var(--vp-c-warning-1); }
.meter-fill.high { background: var(--vp-c-error-1); }

.meter-value {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: right;
}

.meter-value.good { color: var(--vp-c-success-1); }
.meter-value.medium { color: var(--vp-c-warning-1); }
.meter-value.high { color: var(--vp-c-error-1); }

.stats {
  display: flex;
  gap: 0.75rem;
}

.stat-item {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
  text-align: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-bg-inverse);
}

.btn.high-impact { background: var(--vp-c-error-1); }
.btn.high-impact:hover { opacity: 0.9; }

.btn.medium-impact { background: var(--vp-c-warning-1); }
.btn.medium-impact:hover { opacity: 0.9; }

.btn.low-impact { background: var(--vp-c-success-1); }
.btn.low-impact:hover { opacity: 0.9; }

.tab-info {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.info-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-content strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
