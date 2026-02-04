<!--
  PerformanceOverviewDemo.vue
  前端性能优化全景图：展示瓶颈与优化手段的对应关系

  交互功能：
  - 点击不同维度（传输、渲染、执行）查看对应的瓶颈和方案
  - 动态展示瓶颈对用户体验的影响
-->
<template>
  <div class="performance-overview">
    <div class="header">
      <div class="title">前端性能优化全景图</div>
      <div class="subtitle">点击下方维度，探索性能瓶颈与优化方案的对应关系</div>
    </div>

    <!-- 维度切换 -->
    <div class="dimension-tabs">
      <button
        v-for="dim in dimensions"
        :key="dim.id"
        class="tab-btn"
        :class="{ active: currentDim.id === dim.id }"
        @click="currentDim = dim"
      >
        <span class="icon">{{ dim.icon }}</span>
        <span class="text">{{ dim.name }}</span>
      </button>
    </div>

    <!-- 内容展示区 -->
    <div class="content-area" :class="currentDim.id">
      <div class="panel bottlenecks">
        <h3>
          <span class="icon">⚠️</span>
          常见瓶颈 (Bottlenecks)
        </h3>
        <ul class="list">
          <li v-for="(item, index) in currentDim.bottlenecks" :key="index">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">{{ item.desc }}</div>
          </li>
        </ul>
      </div>

      <div class="arrow">
        <div class="arrow-line"></div>
        <div class="arrow-text">如何解决？</div>
      </div>

      <div class="panel solutions">
        <h3>
          <span class="icon">🚀</span>
          优化方案 (Solutions)
        </h3>
        <ul class="list">
          <li v-for="(item, index) in currentDim.solutions" :key="index">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">{{ item.desc }}</div>
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 总结栏 -->
    <div class="summary-bar">
      <p>
        <strong>核心目标：</strong>
        {{ currentDim.goal }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dimensions = [
  {
    id: 'network',
    name: '传输层 (Network)',
    icon: '📡',
    goal: '让资源更快到达浏览器 (减体积、减次数、缩短距离)',
    bottlenecks: [
      { title: '体积过大', desc: '图片、JS bundle 未压缩，下载耗时久' },
      { title: '请求过多', desc: 'HTTP/1.1 队头阻塞，资源排队下载' },
      { title: '网络延迟', desc: '服务器物理距离远，RTT 时间长' }
    ],
    solutions: [
      { title: '资源压缩', desc: 'Gzip/Brotli, 图片格式转换 (WebP)', tags: ['减体积'] },
      { title: '懒加载', desc: '只加载当前视口可见的资源', tags: ['减体积', '减次数'] },
      { title: 'CDN 加速', desc: '将资源分发到离用户最近的节点', tags: ['缩短距离'] },
      { title: 'HTTP 缓存', desc: '利用浏览器缓存，避免重复请求', tags: ['减次数'] }
    ]
  },
  {
    id: 'rendering',
    name: '渲染层 (Rendering)',
    icon: '🎨',
    goal: '让页面更快画出来 (减少重排重绘、利用 GPU)',
    bottlenecks: [
      { title: '关键路径阻塞', desc: 'CSS/JS 阻塞了 DOM 树构建' },
      { title: '频繁重排 (Reflow)', desc: '修改布局属性导致全量重新计算' },
      { title: '动画卡顿', desc: '使用 CPU 绘制动画，帧率低于 60fps' }
    ],
    solutions: [
      { title: '关键 CSS 内联', desc: '首屏样式直接写在 HTML 中', tags: ['关键路径'] },
      { title: 'GPU 加速', desc: '使用 transform/opacity 触发合成层', tags: ['动画'] },
      { title: '虚拟列表', desc: '只渲染可见 DOM，处理海量数据', tags: ['DOM 优化'] },
      { title: '防抖节流', desc: '减少高频事件触发渲染的频率', tags: ['逻辑优化'] }
    ]
  },
  {
    id: 'execution',
    name: '执行层 (Scripting)',
    icon: '⚙️',
    goal: '让主线程不卡顿 (减少长任务、并行计算)',
    bottlenecks: [
      { title: '主线程阻塞', desc: '长任务 (Long Tasks) 导致无法响应交互' },
      { title: '无效计算', desc: 'React/Vue 中不必要的组件重渲染' },
      { title: '内存泄漏', desc: '未清理的监听器导致页面越来越卡' }
    ],
    solutions: [
      { title: 'Web Workers', desc: '将复杂计算移到后台线程', tags: ['并行'] },
      { title: '代码分割', desc: '按需加载 JS，减少主线程解析压力', tags: ['减负'] },
      { title: '时间切片', desc: '将大任务拆分为多个小任务', tags: ['响应'] },
      { title: '算法优化', desc: '降低时间复杂度 (如 O(n²) -> O(n))', tags: ['效率'] }
    ]
  }
]

const currentDim = ref(dimensions[0])
</script>

<style scoped>
.performance-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-sans);
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.dimension-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.tab-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.content-area {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  background-color: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
}

.panel {
  flex: 1;
}

.panel h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.list li {
  padding: 0.8rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  transition: all 0.2s;
}

.bottlenecks .list li {
  border-left: 3px solid var(--vp-c-danger);
}

.solutions .list li {
  border-left: 3px solid var(--vp-c-brand);
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.item-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.tags {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  width: 80px;
}

@media (max-width: 768px) {
  .arrow {
    width: 100%;
    height: 40px;
    flex-direction: row;
    gap: 0.5rem;
  }
}

.arrow-line {
  flex: 1;
  width: 2px;
  background-color: var(--vp-c-divider);
}

@media (max-width: 768px) {
  .arrow-line {
    width: 100%;
    height: 2px;
    flex: 1;
  }
}

.summary-bar {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--vp-c-brand-dimm);
  border-radius: 6px;
  text-align: center;
  color: var(--vp-c-brand-dark);
  font-size: 0.95rem;
}
</style>
