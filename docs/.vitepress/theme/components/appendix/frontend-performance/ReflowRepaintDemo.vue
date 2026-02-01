<!--
  ReflowRepaintDemo.vue
  重排与重绘演示
-->
<template>
  <div class="reflow-demo">
    <div class="header">
      <div class="title">重排与重绘对比</div>
      <div class="subtitle">观察不同操作对性能的影响</div>
    </div>

    <div class="demo-container">
      <div class="canvas-area">
        <div class="box-container">
          <div
            v-for="box in boxes"
            :key="box.id"
            class="box"
            :class="box.selected ? 'selected' : ''"
            :style="getBoxStyle(box)"
            @click="selectBox(box.id)"
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
        <div class="control-section">
          <h4>重排操作 (Reflow)</h4>
          <p class="control-desc">改变元素尺寸或位置，触发布局计算</p>
          <button @click="changeWidth" class="btn reflow">改变宽度</button>
          <button @click="changePosition" class="btn reflow">改变位置</button>
          <button @click="addBox" class="btn reflow">添加元素</button>
        </div>

        <div class="control-section">
          <h4>重绘操作 (Repaint)</h4>
          <p class="control-desc">只改变外观，不触发布局</p>
          <button @click="changeColor" class="btn repaint">改变颜色</button>
          <button @click="changeBackground" class="btn repaint">
            改变背景
          </button>
          <button @click="toggleBorder" class="btn repaint">切换边框</button>
        </div>

        <div class="control-section">
          <h4>合成操作 (Composite)</h4>
          <p class="control-desc">只触发合成，性能最佳</p>
          <button @click="transformTranslate" class="btn composite">
            Transform 位移
          </button>
          <button @click="transformRotate" class="btn composite">
            Transform 旋转
          </button>
          <button @click="changeOpacity" class="btn composite">
            改变透明度
          </button>
        </div>
      </div>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h4>什么是重排 (Reflow)？</h4>
        <p>
          当元素的位置、尺寸发生变化时，浏览器需要重新计算布局，这个过程叫重排。重排开销最大，因为要重新计算所有受影响元素的位置。
        </p>
      </div>

      <div class="info-card">
        <h4>什么是重绘 (Repaint)？</h4>
        <p>
          当元素的外观（颜色、背景）发生变化，但位置不变时，浏览器只需要重新绘制像素，这个过程叫重绘。比重排快，但仍有开销。
        </p>
      </div>

      <div class="info-card">
        <h4>什么是合成 (Composite)？</h4>
        <p>
          使用 transform 和 opacity
          等属性，浏览器可以在合成层上完成变化，完全不触发布局和绘制。性能最佳，推荐优先使用。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const boxes = ref([
  {
    id: 1,
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    color: '#3b82f6',
    bg: '#dbeafe',
    rotation: 0,
    opacity: 1,
    border: false,
    selected: false
  },
  {
    id: 2,
    x: 100,
    y: 0,
    width: 80,
    height: 80,
    color: '#8b5cf6',
    bg: '#ede9fe',
    rotation: 0,
    opacity: 1,
    border: false,
    selected: false
  },
  {
    id: 3,
    x: 0,
    y: 100,
    width: 80,
    height: 80,
    color: '#ec4899',
    bg: '#fce7f3',
    rotation: 0,
    opacity: 1,
    border: false,
    selected: false
  }
])

const currentOperation = ref('无')
const performanceImpact = ref(0)
const affectedElements = ref(0)

const performanceLevel = computed(() => {
  if (performanceImpact.value <= 33) {
    return { class: 'good', text: '低' }
  } else if (performanceImpact.value <= 66) {
    return { class: 'medium', text: '中' }
  } else {
    return { class: 'high', text: '高' }
  }
})

function getBoxStyle(box) {
  return {
    left: box.x + 'px',
    top: box.y + 'px',
    width: box.width + 'px',
    height: box.height + 'px',
    backgroundColor: box.bg,
    borderColor: box.color,
    borderWidth: box.border ? '3px' : '0px',
    color: box.color,
    transform: `rotate(${box.rotation}deg)`,
    opacity: box.opacity
  }
}

function selectBox(id) {
  boxes.value.forEach((b) => (b.selected = b.id === id))
}

function updateMetrics(operation, impact, affected) {
  currentOperation.value = operation
  performanceImpact.value = impact
  affectedElements.value = affected
}

function changeWidth() {
  boxes.value.forEach((box) => {
    box.width = 60 + Math.random() * 60
  })
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
    color: '#10b981',
    bg: '#d1fae5',
    rotation: 0,
    opacity: 1,
    border: false,
    selected: false
  })
  updateMetrics('添加元素', 95, boxes.value.length)
}

function changeColor() {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
  boxes.value.forEach((box) => {
    box.color = colors[Math.floor(Math.random() * colors.length)]
  })
  updateMetrics('改变颜色', 50, boxes.value.length)
}

function changeBackground() {
  const bgs = ['#dbeafe', '#ede9fe', '#fce7f3', '#d1fae5', '#fef3c7']
  boxes.value.forEach((box) => {
    box.bg = bgs[Math.floor(Math.random() * bgs.length)]
  })
  updateMetrics('改变背景', 45, boxes.value.length)
}

function toggleBorder() {
  boxes.value.forEach((box) => {
    box.border = !box.border
  })
  updateMetrics('切换边框', 55, boxes.value.length)
}

function transformTranslate() {
  boxes.value.forEach((box) => {
    box.x += Math.random() * 20 - 10
  })
  updateMetrics('Transform 位移', 10, boxes.value.length)
}

function transformRotate() {
  boxes.value.forEach((box) => {
    box.rotation += Math.random() * 30 - 15
  })
  updateMetrics('Transform 旋转', 10, boxes.value.length)
}

function changeOpacity() {
  boxes.value.forEach((box) => {
    box.opacity = 0.5 + Math.random() * 0.5
  })
  updateMetrics('改变透明度', 10, boxes.value.length)
}
</script>

<style scoped>
.reflow-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}

.canvas-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
}

.box-container {
  position: relative;
  height: 250px;
  margin-bottom: 1.5rem;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.box:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.box.selected {
  box-shadow: 0 0 0 3px var(--vp-c-brand);
}

.performance-meter {
  margin-bottom: 1rem;
}

.meter-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.meter-bar {
  height: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.meter-fill {
  height: 100%;
  transition: all 0.5s ease;
  border-radius: 6px;
}

.meter-fill.good {
  background: linear-gradient(90deg, #22c55e, #14b8a6);
}

.meter-fill.medium {
  background: linear-gradient(90deg, #f59e0b, #f97316);
}

.meter-fill.high {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.meter-value {
  font-size: 0.9rem;
  font-weight: 600;
  text-align: right;
}

.meter-value.good {
  color: #22c55e;
}

.meter-value.medium {
  color: #f59e0b;
}

.meter-value.high {
  color: #ef4444;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.8rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.control-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.control-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
}

.btn:last-child {
  margin-bottom: 0;
}

.btn.reflow {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.btn.reflow:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
}

.btn.repaint {
  background: linear-gradient(135deg, #f59e0b, #f97316);
}

.btn.repaint:hover {
  background: linear-gradient(135deg, #f97316, #ea580c);
}

.btn.composite {
  background: linear-gradient(135deg, #22c55e, #14b8a6);
}

.btn.composite:hover {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.info-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.info-card h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.info-card p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>
