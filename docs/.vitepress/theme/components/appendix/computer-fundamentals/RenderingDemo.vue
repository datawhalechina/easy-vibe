<template>
  <div class="rendering-demo">
    <div class="demo-label">浏览器渲染过程 ── 点击逐步演示</div>

    <div class="pipeline">
      <div
        v-for="(stage, index) in stages"
        :key="stage.name"
        class="pipeline-stage"
        :class="{ active: currentStage >= index }"
        @click="currentStage = index"
      >
        <div class="stage-header">
          <span class="stage-num">{{ index + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
        </div>
        <div class="stage-desc">{{ stage.desc }}</div>
        <div v-if="currentStage >= index" class="stage-detail">
          {{ stage.detail }}
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击查看各阶段详情</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentStage = ref(0)
const stages = [
  { name: 'HTML 解析', desc: '把 HTML 变成 DOM 树', detail: '<div> → Document Object Model 树结构' },
  { name: 'CSS 解析', desc: '把 CSS 变成样式规则', detail: '选择器 + 属性 → 样式规则表' },
  { name: '渲染树', desc: 'DOM + CSS = 渲染树', detail: '哪些节点显示、什么样式' },
  { name: '布局计算', desc: '计算每个元素的位置', detail: '宽高、坐标、层级' },
  { name: '绘制', desc: '把内容画到像素缓冲区', detail: '文字、颜色、图片、边框' },
  { name: '合成', desc: '多层合成一张图', detail: 'GPU 合成，显示到屏幕' }
]
</script>

<style scoped>
.rendering-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.pipeline {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.pipeline-stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  opacity: 0.4;
  transition: all 0.3s;
}

.pipeline-stage.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stage-num {
  width: 1.2rem;
  height: 1.2rem;
  background: var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.pipeline-stage.active .stage-num {
  background: var(--vp-c-brand);
  color: white;
}

.stage-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.stage-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.stage-detail {
  font-size: 0.65rem;
  color: var(--vp-c-brand);
  margin-top: 0.3rem;
  padding: 0.25rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
