<!--
  NextTokenPrediction.vue
  下一个 Token 预测演示组件
  
  用途：
  展示 LLM 生成文本的核心机制——Next Token Prediction（下一个词预测）。
  让用户体验模型是如何基于概率分布来选择下一个词的。
  
  交互功能：
  - 上下文展示：显示当前生成的文本序列。
  - 概率可视化：动态展示 Top-K 候选词及其概率条。
  - 交互式生成：用户点击候选词来决定生成的走向（模拟 Sampling 过程）。
  - 场景切换：提供几个经典预设场景（英文句子、中文句子、代码片段）。
-->
<template>
  <div class="prediction-demo">
    <div class="header">
      <div class="scene-selector">
        <label>Scenario / 场景:</label>
        <select v-model="currentSceneKey" @change="resetScene">
          <option value="en-fox">English: The quick brown...</option>
          <option value="zh-ai">中文: 人工智能...</option>
          <option value="code">Code: if (x > 0)...</option>
        </select>
      </div>
      <button class="reset-btn" @click="resetScene" title="Reset">
        <span class="icon">↺</span>
      </button>
    </div>

    <div class="context-window">
      <div class="context-content">
        <span
          v-for="(token, index) in tokenizedContext"
          :key="index"
          class="context-token"
          >{{ token }}</span
        >
        <span class="cursor"></span>
      </div>
    </div>

    <div class="prediction-panel">
      <div class="panel-title">
        <span>🤖 AI Prediction (Top 3 Candidates)</span>
        <span class="temperature-hint">Temperature: 0.7</span>
      </div>

      <div class="candidates-list">
        <div
          v-for="(candidate, index) in currentCandidates"
          :key="index"
          class="candidate-item"
          @click="selectCandidate(candidate)"
        >
          <div class="candidate-info">
            <span class="candidate-text">"{{ candidate.text }}"</span>
            <span class="candidate-prob"
              >{{ (candidate.prob * 100).toFixed(1) }}%</span
            >
          </div>
          <div class="prob-bar-bg">
            <div
              class="prob-bar-fill"
              :style="{ width: `${candidate.prob * 100}%` }"
              :class="`rank-${index}`"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <p>
        <strong>原理：</strong> LLM
        并不是一次性写出整段话，而是像上面这样，基于前面的内容（Context），计算下一个最可能出现的
        Token 的概率，然后选择一个（Sampling）填上去，再重复这个过程。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const scenes = {
  'en-fox': {
    initial: 'The quick brown',
    logic: (text) => {
      if (text.endsWith('brown'))
        return [
          { text: ' fox', prob: 0.85 },
          { text: ' dog', prob: 0.1 },
          { text: ' cat', prob: 0.05 }
        ]
      if (text.endsWith('fox'))
        return [
          { text: ' jumps', prob: 0.92 },
          { text: ' runs', prob: 0.05 },
          { text: ' sleeps', prob: 0.03 }
        ]
      if (text.endsWith('jumps'))
        return [
          { text: ' over', prob: 0.98 },
          { text: ' up', prob: 0.01 },
          { text: ' down', prob: 0.01 }
        ]
      if (text.endsWith('over'))
        return [
          { text: ' the', prob: 0.95 },
          { text: ' a', prob: 0.04 },
          { text: ' my', prob: 0.01 }
        ]
      if (text.endsWith('the'))
        return [
          { text: ' lazy', prob: 0.88 },
          { text: ' big', prob: 0.08 },
          { text: ' old', prob: 0.04 }
        ]
      if (text.endsWith('lazy'))
        return [
          { text: ' dog', prob: 0.9 },
          { text: ' cat', prob: 0.08 },
          { text: ' fox', prob: 0.02 }
        ]
      return [
        { text: '.', prob: 0.8 },
        { text: ' and', prob: 0.15 },
        { text: '!', prob: 0.05 }
      ]
    }
  },
  'zh-ai': {
    initial: '人工智能',
    logic: (text) => {
      if (text.endsWith('人工智能'))
        return [
          { text: '是', prob: 0.75 },
          { text: '技术', prob: 0.15 },
          { text: '发展', prob: 0.1 }
        ]
      if (text.endsWith('是'))
        return [
          { text: '未来', prob: 0.4 },
          { text: '一种', prob: 0.35 },
          { text: '什么', prob: 0.25 }
        ]
      if (text.endsWith('一种'))
        return [
          { text: '技术', prob: 0.55 },
          { text: '工具', prob: 0.3 },
          { text: '科学', prob: 0.15 }
        ]
      if (text.endsWith('未来'))
        return [
          { text: '的', prob: 0.85 },
          { text: '方向', prob: 0.1 },
          { text: '趋势', prob: 0.05 }
        ]
      return [
        { text: '。', prob: 0.6 },
        { text: '，', prob: 0.3 },
        { text: '！', prob: 0.1 }
      ]
    }
  },
  code: {
    initial: 'if (x > 0) {',
    logic: (text) => {
      if (text.endsWith('{'))
        return [
          { text: '\n  return', prob: 0.6 },
          { text: '\n  print', prob: 0.3 },
          { text: '\n  x', prob: 0.1 }
        ]
      if (text.includes('return'))
        return [
          { text: ' true', prob: 0.5 },
          { text: ' x', prob: 0.3 },
          { text: ' false', prob: 0.2 }
        ]
      if (text.includes('print'))
        return [
          { text: '("Hello")', prob: 0.7 },
          { text: '(x)', prob: 0.25 },
          { text: '()', prob: 0.05 }
        ]
      return [
        { text: ';', prob: 0.9 },
        { text: ' + 1', prob: 0.08 },
        { text: '.', prob: 0.02 }
      ]
    }
  }
}

const currentSceneKey = ref('en-fox')
const context = ref('')

const tokenizedContext = computed(() => {
  // 简单分词用于展示：按空格或特定字符切分
  // 这里仅做视觉效果，不影响逻辑
  return context.value.match(/(\s+|\S+)/g) || []
})

const currentCandidates = computed(() => {
  const scene = scenes[currentSceneKey.value]
  return scene.logic(context.value)
})

const selectCandidate = (candidate) => {
  context.value += candidate.text
}

const resetScene = () => {
  context.value = scenes[currentSceneKey.value].initial
}

onMounted(() => {
  resetScene()
})
</script>

<style scoped>
.prediction-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.scene-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.reset-btn {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-brand);
}

.context-window {
  padding: 1.5rem;
  min-height: 100px;
  background-color: var(--vp-c-bg);
  border-bottom: 1px dashed var(--vp-c-divider);
  display: flex;
  align-items: flex-start;
}

.context-content {
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.context-token {
  transition: background-color 0.3s;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: var(--vp-c-brand);
  vertical-align: middle;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.prediction-panel {
  padding: 1rem;
}

.panel-title {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.candidate-item {
  position: relative;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}

.candidate-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.candidate-info {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.prob-bar-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  opacity: 0.15;
}

.prob-bar-fill {
  height: 100%;
  transition: width 0.5s ease-out;
}

.rank-0 {
  background-color: #10b981;
}
.rank-1 {
  background-color: #3b82f6;
}
.rank-2 {
  background-color: #f59e0b;
}

.explanation {
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-alt);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}
</style>
