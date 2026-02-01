<!--
  LazyLoadingDemo.vue
  懒加载演示
-->
<template>
  <div class="lazy-loading-demo">
    <div class="header">
      <div class="title">图片懒加载：节省带宽，提升性能</div>
      <div class="subtitle">对比懒加载和立即加载的区别</div>
    </div>

    <div class="demo-container">
      <div class="mode-selector">
        <button
          @click="mode = 'eager'"
          :class="['mode-btn', { active: mode === 'eager' }]"
        >
          📦 立即加载
        </button>
        <button
          @click="mode = 'lazy'"
          :class="['mode-btn', { active: mode === 'lazy' }]"
        >
          ⏳ 懒加载
        </button>
      </div>

      <div class="stats-bar">
        <div class="stat">
          <span class="stat-label">已加载图片</span>
          <span class="stat-value">{{ loadedImages }} / {{ totalImages }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">节省流量</span>
          <span class="stat-value" :class="{ positive: savedBandwidth > 0 }">
            {{ savedBandwidth > 0 ? '-' : '' }}{{ savedBandwidth }} KB
          </span>
        </div>
        <div class="stat">
          <span class="stat-label">加载时间</span>
          <span class="stat-value">{{ loadTime }} ms</span>
        </div>
      </div>

      <div
        class="scroll-container"
        ref="scrollContainer"
        @scroll="handleScroll"
      >
        <div class="content-area">
          <div class="placeholder">向下滚动查看更多内容</div>

          <div
            v-for="(image, index) in images"
            :key="index"
            class="image-item"
            :ref="(el) => setImageRef(el, index)"
          >
            <div
              class="image-wrapper"
              :class="{ loading: image.loading, loaded: image.loaded }"
            >
              <div
                v-if="!image.loaded && mode === 'lazy'"
                class="placeholder-box"
              >
                <div class="spinner"></div>
                <div class="placeholder-text">加载中...</div>
              </div>
              <div v-else-if="image.loaded" class="image-box">
                <div class="image-icon">🖼️</div>
                <div class="image-info">
                  <div class="image-size">{{ image.size }}</div>
                  <div class="image-dim">{{ image.dimensions }}</div>
                </div>
              </div>
            </div>
            <div class="image-caption">图片 {{ index + 1 }}</div>
          </div>

          <div class="placeholder">已经到底了</div>
        </div>
      </div>

      <div class="explanation">
        <div class="explanation-item">
          <h4>💡 懒加载原理</h4>
          <p>
            只有当图片进入视口（用户可见区域）时才开始加载。使用 Intersection
            Observer API 可以高效实现。
          </p>
        </div>

        <div class="explanation-item">
          <h4>📊 性能收益</h4>
          <p>
            懒加载可以节省 30-60%
            的带宽，大幅提升首屏加载速度，特别是在移动端效果显著。
          </p>
        </div>

        <div class="explanation-item">
          <h4>🔧 实现方式</h4>
          <p>
            <code>loading="lazy"</code>
            属性是最简单的方式，现代浏览器都支持。需要更多控制时使用
            Intersection Observer。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const mode = ref('eager')
const scrollContainer = ref(null)
const totalImages = 12
const imageRefs = ref([])

const images = ref([])

const loadedImages = computed(() => {
  return images.value.filter((img) => img.loaded).length
})

const savedBandwidth = computed(() => {
  if (mode.value === 'eager') return 0
  const notLoaded = images.value.filter(
    (img) =>
      !img.loaded && !imageRefs.value[images.value.indexOf(img)]?.isVisible
  ).length
  return notLoaded * 150 // 假设每张图片 150KB
})

const loadTime = computed(() => {
  if (mode.value === 'eager') return 2400
  return loadedImages.value * 150
})

function initializeImages() {
  images.value = Array.from({ length: totalImages }, (_, i) => ({
    loaded: mode.value === 'eager',
    loading: false,
    size: '150 KB',
    dimensions: '800×600'
  }))
}

function setImageRef(el, index) {
  if (el) {
    imageRefs.value[index] = el
  }
}

function handleScroll() {
  if (mode.value === 'lazy') {
    checkVisibility()
  }
}

function checkVisibility() {
  const container = scrollContainer.value
  if (!container) return

  const containerRect = container.getBoundingClientRect()
  const threshold = 100 // 提前 100px 开始加载

  images.value.forEach((image, index) => {
    if (image.loaded || image.loading) return

    const ref = imageRefs.value[index]
    if (!ref) return

    const rect = ref.getBoundingClientRect()
    const isVisible = rect.top < containerRect.bottom + threshold

    if (isVisible) {
      loadImage(index)
    }
  })
}

function loadImage(index) {
  const image = images.value[index]
  if (!image || image.loaded || image.loading) return

  image.loading = true

  // 模拟加载延迟
  setTimeout(
    () => {
      image.loaded = true
      image.loading = false
    },
    300 + Math.random() * 500
  )
}

watch(mode, () => {
  initializeImages()
  if (mode.value === 'lazy') {
    setTimeout(() => checkVisibility(), 100)
  }
})

onMounted(() => {
  initializeImages()
  if (mode.value === 'lazy') {
    setTimeout(() => checkVisibility(), 100)
  }
})
</script>

<style scoped>
.lazy-loading-demo {
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
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.5rem;
}

.mode-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.mode-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.mode-btn:hover {
  border-color: var(--vp-c-brand);
}

.mode-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat {
  flex: 1;
  min-width: 120px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.stat-value.positive {
  color: #22c55e;
}

.scroll-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
}

.content-area {
  padding: 1rem;
}

.placeholder {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.image-item {
  margin-bottom: 1rem;
}

.image-wrapper {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.image-wrapper.loading {
  border-color: var(--vp-c-brand);
}

.image-wrapper.loaded {
  border-color: #22c55e;
}

.placeholder-box {
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.placeholder-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.image-box {
  height: 150px;
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.image-icon {
  font-size: 3rem;
}

.image-info {
  flex: 1;
}

.image-size {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.image-dim {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.image-caption {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.explanation-item {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.explanation-item h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.explanation-item p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.explanation-item code {
  background: var(--vp-c-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}
</style>
