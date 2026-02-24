<template>
  <div class="flow-demo">
    <div class="flow-section">
      <div class="flow-label traditional">传统开发流程</div>
      <div class="flow-steps">
        <span v-for="(step, i) in traditionalSteps" :key="step">
          <span class="flow-step">{{ step }}</span>
          <span v-if="i < traditionalSteps.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
      <div class="flow-loop">↑ 反复循环 ↓</div>
    </div>

    <div class="flow-section">
      <div class="flow-label vibe">Vibe Coding 流程</div>
      <div class="flow-steps">
        <span v-for="(step, i) in vibeSteps" :key="step">
          <span class="flow-step" :class="{ highlight: step.highlight }">{{ step.text }}</span>
          <span v-if="i < vibeSteps.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
      <div class="flow-loop">↑ 快速迭代 ↓</div>
    </div>
  </div>
</template>

<script setup>
const traditionalSteps = ['你', '学习语法', '写代码', '调试', '查文档', '修改', '运行']

const vibeSteps = [
  { text: '你', highlight: false },
  { text: '用自然语言描述需求', highlight: true },
  { text: 'AI 生成代码', highlight: true },
  { text: '你审核修改', highlight: false },
  { text: '运行', highlight: false }
]
</script>

<style scoped>
.flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.flow-label {
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.flow-label.traditional {
  color: var(--vp-c-text-2);
}

.flow-label.vibe {
  color: var(--vp-c-brand-1);
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.35rem;
}

.flow-step {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.flow-step.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.flow-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.flow-loop {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
</style>
