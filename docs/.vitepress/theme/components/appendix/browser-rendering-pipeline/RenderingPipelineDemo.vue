<template>
  <div class="rendering-pipeline-demo">
    <div class="demo-header">
      <span class="icon">🏭</span>
      <span class="title">渲染管线</span>
      <span class="subtitle">从代码到像素的五步旅程</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">印刷厂</span>工作：稿件要排版、印刷、装订，最后才能变成书本。浏览器渲染网页也一样，HTML 和 CSS 要经过一道道"工序"，才能变成屏幕上的画面。
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-simple">
          {{ stage.simple }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="arrow"
        >
          →
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="activeStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
        </div>
        <div class="detail-content">
          <p class="detail-desc">
            {{ currentStage?.detailDesc }}
          </p>
          <div class="detail-example">
            <div class="example-label">
              🌰 举个例子：
            </div>
            <div class="example-content">
              {{ currentStage?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="!activeStage"
      class="hint-text"
    >
      👆 点击上方任意阶段，查看详细解释
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>每个阶段各司其职，前面的阶段为后面阶段准备数据。理解这个流程，你就能知道什么时候用什么方式修改页面，才能避免性能问题。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)

const stages = ref([
  {
    id: 1,
    icon: '🌲',
    name: '构建DOM/CSSOM',
    simple: '解析代码',
    detailDesc: '浏览器把 HTML 标签解析成 DOM 树（骨架），把 CSS 解析成 CSSOM 树（样式）。这两个树是并行构建的，但 CSS 会阻塞渲染，因为浏览器必须知道样式才能正确显示页面。',
    example: '浏览器读到 <div class="container">，会在 DOM 树中创建一个 div 节点；读到 .container { width: 100px }，会在 CSSOM 树中记录这个样式规则。'
  },
  {
    id: 2,
    icon: '🎨',
    name: '构建渲染树',
    simple: '合并筛选',
    detailDesc: '把 DOM 树和 CSSOM 树合并，生成渲染树。只包含真正会显示在页面上的元素（不包括 head、script、display:none 的元素等）。',
    example: '就像从完整的建筑图纸中抠出"看得见的部分"，去掉墙里的电线、管道，只保留墙面和家具。这样后续的计算会更高效。'
  },
  {
    id: 3,
    icon: '📐',
    name: '布局',
    simple: '计算位置',
    detailDesc: '计算每个元素在屏幕上的精确位置和大小（几何信息）。这是最昂贵的操作之一，因为改一个元素可能影响其他元素的位置（"牵一发而动全身"）。',
    example: '浏览器算出："这个 div 在距离顶部 100px 的地方，宽度 200px，高度 50px"。如果改了这个 div 的宽度，它的子元素、兄弟元素的位置都要重新计算。'
  },
  {
    id: 4,
    icon: '✏️',
    name: '绘制',
    simple: '填充颜色',
    detailDesc: '把"计算好位置"的元素真正"画"成像素。包括填充背景色、绘制文字、绘制边框等。只改变外观（如 color、background-color）会触发重绘，成本比重排低。',
    example: '就像给家具上漆：改家具颜色只需要重新上漆（重绘），但改家具位置需要重新摆放所有家具（重排）。'
  },
  {
    id: 5,
    icon: '🔮',
    name: '合成',
    simple: '合并图层',
    detailDesc: '现代浏览器的终极武器。把多个绘制层（Layer）按照正确的顺序合并成最终画面。利用 GPU 并行处理，性能极佳。transform 和 opacity 动画只触发这一步。',
    example: '就像 Photoshop 的图层：每个图层单独画，最后合并在一起。某些元素（如动画）会被提升到独立层，变化时只需要调整位置和透明度，不需要重绘。'
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.rendering-pipeline-demo {
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
  min-width: 90px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  background: var(--vp-c-brand-soft);
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
}

.stage:hover .stage-icon {
  transform: scale(1.1);
}

.stage-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-simple {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.2rem;
  font-weight: 500;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
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
