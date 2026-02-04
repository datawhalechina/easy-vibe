<!--
  ResponsiveGridDemo.vue
  响应式布局演示 - 重构版

  用途：
  用"智能变形相框"的比喻，让零基础用户理解响应式设计。
  通过可拖动的滑块，直观展示同一套代码如何适配不同屏幕尺寸。
-->
<template>
  <div class="responsive-demo">
    <div class="scenario-intro">
      <div class="emoji-scene">🖼️ 📱 💻</div>
      <h4>智能变形相框</h4>
      <p>想象你有一张照片，它会自动调整大小和布局，在任何相框里都好看！</p>
    </div>

    <div class="device-presets">
      <button
        v-for="device in devices"
        :key="device.id"
        :class="['device-btn', { active: screenWidth === device.width }]"
        @click="setDevice(device.width)"
      >
        <span class="device-icon">{{ device.icon }}</span>
        <span class="device-name">{{ device.name }}</span>
        <span class="device-size">{{ device.width }}px</span>
      </button>
    </div>

    <div class="slider-control">
      <div class="slider-labels">
        <span>📱 手机</span>
        <span>
          <input
            type="range"
            v-model="screenWidth"
            :min="320"
            :max="1400"
            step="10"
            class="width-slider"
          />
        </span>
        <span>💻 电脑</span>
      </div>
      <div class="current-width">
        当前宽度: <strong>{{ screenWidth }}px</strong> - {{ currentBreakpoint.name }}
      </div>
    </div>

    <div class="viewport-preview">
      <div class="viewport-header">
        <span class="viewport-device">{{ currentDevice }}</span>
        <span class="viewport-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      <div class="viewport-content" :style="{ width: screenWidth + 'px' }">
        <div class="demo-grid" :class="gridClass">
          <div
            v-for="(item, index) in gridItems"
            :key="index"
            class="grid-item"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="item-icon">{{ item.icon }}</div>
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="breakpoint-indicator">
      <div class="bp-track">
        <div
          v-for="bp in breakpoints"
          :key="bp.name"
          class="bp-point"
          :class="{ active: screenWidth >= bp.min && screenWidth < (bp.max || 9999) }"
          :style="{ left: ((bp.min - 320) / (1400 - 320)) * 100 + '%' }"
        >
          <span class="bp-label">{{ bp.name }}</span>
          <span class="bp-range">{{ bp.min }}px</span>
        </div>
      </div>
    </div>

    <div class="code-preview">
      <div class="code-header">
        <span class="code-title">💻 响应式 CSS 代码</span>
        <span class="code-lang">CSS</span>
      </div>
      <pre class="code-block"><code>/* 默认：手机端（单列） */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

/* 平板端：双列（640px 以上） */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 电脑端：三列（1024px 以上） */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}</code></pre>
    </div>

    <div class="tips-box">
      <div class="tips-icon">🎯</div>
      <div class="tips-content">
        <strong>关键点：</strong>
        响应式布局通过 CSS 媒体查询（Media Query）自动适配不同屏幕。
        就像智能相框，无论大屏小屏，内容都能完美展示！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const screenWidth = ref(375)

const devices = [
  { id: 'iphone-se', name: 'iPhone SE', width: 375, icon: '📱' },
  { id: 'iphone-14', name: 'iPhone 14', width: 390, icon: '📱' },
  { id: 'ipad-mini', name: 'iPad Mini', width: 768, icon: '📲' },
  { id: 'macbook', name: 'MacBook', width: 1280, icon: '💻' },
  { id: 'desktop', name: '桌面显示器', width: 1400, icon: '🖥️' }
]

const breakpoints = [
  { name: 'sm', min: 320, max: 640 },
  { name: 'md', min: 640, max: 1024 },
  { name: 'lg', min: 1024, max: 9999 }
]

const currentBreakpoint = computed(() => {
  if (screenWidth.value < 640) return { name: '手机端（小屏）', cols: 1 }
  if (screenWidth.value < 1024) return { name: '平板端（中屏）', cols: 2 }
  return { name: '电脑端（大屏）', cols: 3 }
})

const currentDevice = computed(() => {
  const device = devices.find(d => d.width === screenWidth.value)
  return device ? device.name : `${screenWidth.value}px 视口`
})

const gridClass = computed(() => {
  if (screenWidth.value < 640) return 'grid-cols-1'
  if (screenWidth.value < 1024) return 'grid-cols-2'
  return 'grid-cols-3'
})

const setDevice = (width) => {
  screenWidth.value = width
}

const gridItems = [
  { icon: '📷', title: '摄影', description: '捕捉精彩瞬间' },
  { icon: '🎨', title: '设计', description: '创造视觉美感' },
  { icon: '💻', title: '编程', description: '构建数字世界' },
  { icon: '🎵', title: '音乐', description: '谱写动人旋律' },
  { icon: '📚', title: '阅读', description: '探索知识海洋' },
  { icon: '✈️', title: '旅行', description: '发现世界之美' }
]
</script>

<style scoped>
.responsive-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  padding: 1.5rem;
  margin: 1rem 0;
}

.scenario-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(77, 208, 225, 0.2), rgba(126, 87, 194, 0.2));
  border-radius: 12px;
}

.emoji-scene {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.scenario-intro h4 {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.scenario-intro p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.device-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.device-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}

.device-btn:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.device-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.device-icon {
  font-size: 1.5rem;
}

.device-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.device-size {
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.slider-control {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.width-slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #4dd0e1, #7e57c2);
  border-radius: 4px;
  outline: none;
}

.width-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 3px solid #7e57c2;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.current-width {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.viewport-preview {
  border: 2px solid var(--vp-c-brand);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  margin-bottom: 1rem;
}

.viewport-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-bottom: 1px solid var(--vp-c-brand);
}

.viewport-device {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-dark);
}

.viewport-dots {
  display: flex;
  gap: 4px;
}

.viewport-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand);
}

.viewport-content {
  margin: 0 auto;
  transition: width 0.3s ease;
  overflow: hidden;
}

.demo-grid {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease both;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-desc {
  font-size: 0.75rem;
  opacity: 0.9;
}

.breakpoint-indicator {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.bp-track {
  position: relative;
  height: 40px;
  background: linear-gradient(90deg, #4dd0e1 0%, #7e57c2 50%, #ab47bc 100%);
  border-radius: 20px;
}

.bp-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bp-point.active .bp-label {
  background: white;
  color: #333;
  font-weight: 700;
  transform: scale(1.1);
}

.bp-label {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #555;
  transition: all 0.3s;
}

.bp-range {
  font-size: 0.625rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.code-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.code-lang {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
}

.code-block {
  margin: 0;
  padding: 1rem;
  background: #1e1e2e;
  color: #a6accd;
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-x: auto;
}

.tips-box {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.tips-icon {
  font-size: 1.5rem;
}

.tips-content {
  flex: 1;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .scene-body {
    grid-template-columns: 1fr;
  }

  .device-presets {
    flex-direction: column;
  }

  .bp-track {
    height: 60px;
  }
}
</style>
