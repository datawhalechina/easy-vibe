<template>
  <div class="agent-workflow-demo">
    <div class="workflow-container">
      <div class="cycle-diagram">
        <div class="center-label">Agent 核心循环</div>

        <div
          v-for="(step, index) in steps"
          :key="step.name"
          class="cycle-step"
          :class="{
            active: currentStep === index,
            completed: currentStep > index
          }"
          :style="getStepPosition(index)"
        >
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>

        <svg class="arrows" v-if="currentStep < steps.length">
          <circle cx="200" cy="200" r="130" fill="none" :stroke="arrowColor" stroke-width="2" stroke-dasharray="5,5">
            <animate
              v-if="isPlaying"
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div class="step-details">
        <div class="current-action">
          <div class="action-label">当前步骤</div>
          <div class="action-content">
            <span class="action-icon">{{ steps[currentStep]?.icon }}</span>
            <span class="action-text">{{ steps[currentStep]?.name }}</span>
          </div>
        </div>

        <div class="step-explanation">
          <h4>{{ steps[currentStep]?.name }}</h4>
          <p>{{ steps[currentStep]?.detail }}</p>

          <div v-if="currentStep > 0 && currentStep <= steps.length" class="example-box">
            <div class="example-title">📝 示例</div>
            <div class="example-content">{{ steps[currentStep]?.example }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="prevStep" :disabled="currentStep === 0" class="control-btn">
        ← 上一步
      </button>
      <button @click="togglePlay" class="control-btn primary">
        {{ isPlaying ? '⏸ 暂停' : '▶ 自动播放' }}
      </button>
      <button @click="nextStep" :disabled="currentStep === steps.length" class="control-btn">
        下一步 →
      </button>
      <button @click="reset" class="control-btn">
        ↺ 重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentStep = ref(0)
const isPlaying = ref(false)
let playInterval = null

const steps = [
  {
    name: '感知',
    icon: '👁️',
    desc: 'Perceive',
    detail: 'Agent 从环境中接收信息，包括用户输入、文件内容、网页数据等。',
    example: '用户说：帮我搜索最新的 AI 文章'
  },
  {
    name: '决策',
    icon: '🤔',
    desc: 'Reason',
    detail: '分析当前状态，制定行动计划，选择合适的工具来完成任务。',
    example: '分析：需要搜索 → 应该使用 web_search 工具'
  },
  {
    name: '行动',
    icon: '🔧',
    desc: 'Act',
    detail: '执行决策，调用工具，修改文件，发送请求等具体操作。',
    example: '执行：web_search("AI 文章 2024")'
  },
  {
    name: '观察',
    icon: '👀',
    desc: 'Observe',
    detail: '查看行动结果，评估是否达成目标，决定是继续还是结束。',
    example: '观察：找到 10 篇相关文章 → 继续阅读'
  }
]

const arrowColor = computed(() => {
  if (currentStep.value === 0) return 'var(--vp-c-divider)'
  return 'var(--vp-c-brand)'
})

const getStepPosition = (index) => {
  const positions = [
    { top: '10%', left: '50%', transform: 'translateX(-50%)' },    // Top
    { right: '10%', top: '50%', transform: 'translateY(-50%)' },  // Right
    { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }, // Bottom
    { left: '10%', top: '50%', transform: 'translateY(-50%)' }    // Left
  ]
  return positions[index]
}

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    playInterval = setInterval(() => {
      if (currentStep.value < steps.length) {
        currentStep.value++
      } else {
        currentStep.value = 0
      }
    }, 2000)
  } else {
    clearInterval(playInterval)
  }
}

const reset = () => {
  currentStep.value = 0
  isPlaying.value = false
  clearInterval(playInterval)
}

onUnmounted(() => {
  clearInterval(playInterval)
})
</script>

<style scoped>
.agent-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.workflow-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .workflow-container {
    grid-template-columns: 1fr;
  }
}

.cycle-diagram {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 400px;
  margin: 0 auto;
}

.center-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
  text-align: center;
  white-space: nowrap;
}

.cycle-step {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  min-width: 100px;
}

.cycle-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 0 20px rgba(66, 153, 225, 0.3);
  transform: scale(1.1) !important;
  z-index: 10;
}

.cycle-step.completed {
  border-color: var(--vp-c-brand);
  opacity: 0.7;
}

.step-icon {
  font-size: 2rem;
}

.step-name {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.arrows {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.current-action {
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand);
}

.action-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.action-icon {
  font-size: 1.8rem;
}

.step-explanation {
  flex: 1;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 12px;
}

.step-explanation h4 {
  margin: 0 0 12px 0;
  color: var(--vp-c-brand);
  font-size: 1.2rem;
}

.step-explanation p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.example-box {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.example-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.example-content {
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.control-btn {
  padding: 10px 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.control-btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}
</style>
