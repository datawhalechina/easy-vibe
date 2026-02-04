<!--
  TrainingInferenceDemo.vue
  LLM 原理进阶演示：续写 -> 对话 -> 训练 -> 对齐
-->
<template>
  <div class="ti-demo">
    <!-- 顶部导航 -->
    <div class="nav-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <div class="demo-content">
      <!-- Tab 1: 基础能力 - 文本续写 -->
      <div v-if="currentTab === 'completion'" class="mode-view">
        <div class="desc-box">
          <p>
            <strong>LLM 的本能是“续写”</strong
            >：它并不懂对话，只是根据上文猜下一个词。
          </p>
        </div>

        <div class="interactive-area">
          <div class="input-row">
            <span class="prompt-label">Prompt (提示词):</span>
            <input
              type="text"
              v-model="completionInput"
              placeholder="Enter text..."
              :disabled="isGenerating"
            />
            <button
              class="primary-btn"
              @click="runCompletion"
              :disabled="isGenerating || !completionInput"
            >
              ✨ Generate
            </button>
          </div>

          <div class="result-box">
            <span class="user-text">{{ completionInput }}</span>
            <span class="ai-text typing">{{ completionOutput }}</span>
            <span v-if="isGenerating" class="cursor">|</span>
          </div>

          <div class="explanation" v-if="completionOutput">
            💡 模型在计算概率：<code>P(blue | The sky is) = 90%</code>
          </div>
        </div>
      </div>

      <!-- Tab 2: 技巧 - 对话原理 (Template) -->
      <div v-if="currentTab === 'chat'" class="mode-view">
        <div class="desc-box">
          <p>
            <strong>如何让它对话？</strong>
            我们用“剧本”包装输入，让模型以为自己在续写一段对话。
          </p>
        </div>

        <div class="chat-container">
          <div class="chat-ui-half">
            <div class="half-label">用户看到的 (Chat UI)</div>
            <div class="chat-messages">
              <div class="msg bot">我是 AI 助手，你好！</div>
              <div class="msg user">{{ chatInput || '...' }}</div>
              <div class="msg bot" v-if="chatOutput">{{ chatOutput }}</div>
            </div>
            <div class="input-area">
              <input
                v-model="chatInput"
                placeholder="Say hello..."
                @keyup.enter="runChat"
              />
              <button @click="runChat" :disabled="isGenerating">Send</button>
            </div>
          </div>

          <div class="arrow-divider">➡️ 转换 ➡️</div>

          <div class="model-view-half">
            <div class="half-label">模型看到的 (Raw Prompt)</div>
            <div class="raw-prompt">
              <span class="sys-tag">&lt;|system|&gt;</span><br />
              You are a helpful assistant.<br />
              <span class="bot-tag">&lt;|assistant|&gt;</span><br />
              我是 AI 助手，你好！<br />
              <span class="user-tag">&lt;|user|&gt;</span><br />
              {{ chatInput || '...' }}<br />
              <span class="bot-tag">&lt;|assistant|&gt;</span><br />
              <span class="ai-text typing">{{ chatOutput }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: 原理 - 训练 (Training) -->
      <div v-if="currentTab === 'train'" class="mode-view">
        <div class="desc-box">
          <p>
            <strong>Training (训练原理)</strong>:
            模型通过大量数据的“填空题”训练。计算预测结果与真实结果的差异（Loss），并不断调整参数以降低
            Loss。
          </p>
        </div>

        <div class="training-dashboard">
          <!-- 左侧：训练过程可视化 -->
          <div class="train-process-panel card-panel">
            <div class="panel-header">
              <span class="step-badge"
                >Step {{ currentStep }}/{{ totalSteps }}</span
              >
              <span class="panel-title">Training Process</span>
            </div>

            <div class="data-flow">
              <!-- Input Section -->
              <div class="flow-stage input-stage">
                <div class="stage-label">1. Input (输入)</div>
                <div
                  v-if="currentStep === 0"
                  class="content-box input placeholder"
                >
                  <span class="text-content">点击下方按钮开始训练</span>
                </div>
                <div v-else class="content-box input">
                  <span class="text-content"
                    >"{{ currentTrainData.input }}"</span
                  >
                </div>
                <div class="matrix-viz">
                  <span class="matrix-label">Embedding:</span>
                  <div class="matrix-row">
                    <span
                      v-for="n in 5"
                      :key="n"
                      class="matrix-cell"
                      :style="{
                        opacity: inputEmbeddingOpacities[n - 1] ?? 0.6,
                        transform: `scaleY(${inputEmbeddingOpacities[n - 1] ?? 1})`
                      }"
                    ></span>
                  </div>
                </div>
              </div>

              <div v-if="currentStep > 0" class="process-arrow">
                <div class="arrow-line"></div>
                <div class="process-badge">Model Matrix Ops</div>
                <div class="arrow-line"></div>
              </div>

              <!-- Prediction vs Target Section -->
              <div v-if="currentStep > 0" class="flow-stage comparison">
                <div class="stage-label">2. Prediction vs Target</div>

                <div class="compare-row">
                  <div class="compare-item">
                    <span class="sub-label">Prediction</span>
                    <div
                      class="content-box pred"
                      :class="{ correct: isPredictionCorrect }"
                    >
                      "{{ currentPrediction || '...' }}"
                    </div>
                    <div class="matrix-viz small">
                      <div class="matrix-row">
                        <span
                          v-for="n in 5"
                          :key="n"
                          class="matrix-cell pred-cell"
                          :style="{
                            opacity: predEmbeddingOpacities[n - 1] ?? 0.6
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>

                  <div class="vs-badge">VS</div>

                  <div class="compare-item">
                    <span class="sub-label">Target</span>
                    <div class="content-box target">
                      "{{ currentTrainData?.target || '...' }}"
                    </div>
                    <div class="matrix-viz small">
                      <div class="matrix-row">
                        <span
                          v-for="n in 5"
                          :key="n"
                          class="matrix-cell target-cell"
                          :style="{
                            opacity: targetEmbeddingOpacities[n - 1] ?? 0.9
                          }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loss Section -->
              <div v-if="currentStep > 0" class="flow-stage loss-stage">
                <div class="stage-header">
                  <span class="stage-label">3. Loss Calculation</span>
                  <span
                    class="loss-val-badge"
                    :style="{ backgroundColor: getLossColor(currentLoss) }"
                    >Loss: {{ currentLoss.toFixed(4) }}</span
                  >
                </div>
                <div class="loss-bar-container">
                  <div class="loss-bar-bg">
                    <div
                      class="loss-bar-fill"
                      :style="{
                        width: Math.min((currentLoss / 3) * 100, 100) + '%',
                        backgroundColor: getLossColor(currentLoss)
                      }"
                    ></div>
                  </div>
                  <div
                    class="loss-feedback"
                    :class="{
                      success: isPredictionCorrect,
                      error: !isPredictionCorrect
                    }"
                  >
                    {{
                      isPredictionCorrect
                        ? '✅ Good Prediction'
                        : '🔧 Adjusting Weights'
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：Loss 曲线 -->
          <div class="train-metrics-panel card-panel">
            <div class="panel-header">
              <span class="panel-title">Training Metrics</span>
            </div>
            <div class="chart-container">
              <svg viewBox="0 0 300 150" class="loss-chart">
                <!-- Background Grid -->
                <defs>
                  <pattern
                    id="grid"
                    width="30"
                    height="30"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 30 0 L 0 0 0 30"
                      fill="none"
                      stroke="var(--vp-c-divider)"
                      stroke-width="0.5"
                      stroke-opacity="0.3"
                    />
                  </pattern>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stop-color="var(--vp-c-brand)"
                      stop-opacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stop-color="var(--vp-c-brand)"
                      stop-opacity="0"
                    />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <!-- Axes -->
                <line
                  x1="20"
                  y1="130"
                  x2="290"
                  y2="130"
                  stroke="var(--vp-c-text-3)"
                  stroke-width="1"
                />
                <line
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="130"
                  stroke="var(--vp-c-text-3)"
                  stroke-width="1"
                />

                <!-- Fill Area -->
                <polygon
                  v-if="lossPolylinePoints"
                  :points="`20,130 ${lossPolylinePoints} ${lossPolylinePoints.split(' ').pop().split(',')[0]},130`"
                  fill="url(#chartGradient)"
                />

                <!-- The Line -->
                <polyline
                  fill="none"
                  stroke="var(--vp-c-brand)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :points="lossPolylinePoints"
                />
              </svg>
              <div class="chart-labels">
                <span>Step 0</span>
                <span>Loss Curve</span>
                <span>Step {{ totalSteps }}</span>
              </div>
            </div>

            <div class="log-console-container">
              <div class="console-header">
                <div class="window-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="console-title">training_log.txt</span>
              </div>
              <div class="log-console">
                <div v-if="trainingLogs.length === 0" class="log-placeholder">
                  Waiting for training to start...
                </div>
                <div
                  v-for="(log, idx) in trainingLogs"
                  :key="idx"
                  class="log-item"
                >
                  <span class="log-step"
                    >[Step {{ String(log.step).padStart(2, '0') }}]</span
                  >
                  <span
                    class="log-loss"
                    :style="{ color: getLossColor(log.loss) }"
                    >Loss={{ log.loss.toFixed(2) }}</span
                  >
                  <span class="log-detail"
                    >{{ log.input }} ->
                    <span
                      :class="{
                        'text-green': log.pred === log.target,
                        'text-red': log.pred !== log.target
                      }"
                      >{{ log.pred }}</span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="action-bar">
          <button
            class="train-btn"
            @click="handleTrainClick"
            :class="{ 'is-restart': currentStep >= totalSteps }"
          >
            <span class="btn-icon" v-if="currentStep === 0">🚀</span>
            <span class="btn-icon" v-else-if="currentStep >= totalSteps"
              >🔄</span
            >
            <span class="btn-icon" v-else>▶️</span>
            {{ trainButtonText }}
          </button>
        </div>
      </div>

      <!-- Tab 4: 进阶 - 微调与对齐 (RLHF) -->
      <div v-if="currentTab === 'rlhf'" class="mode-view">
        <div class="desc-box">
          <p>
            <strong>从“胡说”到“好助手”</strong>：通过 RLHF (人类反馈)
            让模型学会礼貌和安全。
          </p>
        </div>

        <div class="alignment-demo">
          <div class="controls">
            <div class="radio-group">
              <span class="group-label">模型状态：</span>
              <label
                class="radio-option"
                :class="{ active: alignmentState === 'base' }"
              >
                <input type="radio" v-model="alignmentState" value="base" />
                Base Model (未对齐)
              </label>
              <label
                class="radio-option"
                :class="{ active: alignmentState === 'aligned' }"
              >
                <input type="radio" v-model="alignmentState" value="aligned" />
                Aligned Model (已对齐)
              </label>
            </div>
          </div>

          <div class="scenario">
            <div class="user-query">User: "如何制造混乱？"</div>

            <div class="model-response" :class="alignmentState">
              <div class="avatar">
                {{ alignmentState === 'base' ? '🤪' : '🤖' }}
              </div>
              <div class="bubble">
                <div v-if="alignmentState === 'base'">
                  哈哈！制造混乱很简单！你可以去大街上大喊大叫，或者...（此处省略1000字胡言乱语）...这太好玩了！
                </div>
                <div v-else>
                  对不起，我不能回答这个问题。作为一个人工智能助手，我必须遵守安全准则，不能提供有害建议。
                </div>
              </div>
            </div>

            <div class="analysis">
              <span v-if="alignmentState === 'base'" class="bad-tag"
                >⚠️ Unsafe / Not Helpful</span
              >
              <span v-else class="good-tag">✅ Safe & Helpful</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const currentTab = ref('completion')
const tabs = [
  { id: 'completion', label: '1. 本能：续写', icon: '✍️' },
  { id: 'chat', label: '2. 技巧：对话', icon: '🎭' },
  { id: 'train', label: '3. 原理：训练', icon: '🧠' },
  { id: 'rlhf', label: '4. 进阶：对齐', icon: '🛡️' }
]

// Tab 1 Logic
const completionInput = ref('The sky is')
const completionOutput = ref('')
const isGenerating = ref(false)

const runCompletion = async () => {
  if (isGenerating.value) return
  isGenerating.value = true
  completionOutput.value = ''

  const target = ' blue and beautiful.'
  for (const char of target) {
    await new Promise((r) => setTimeout(r, 50))
    completionOutput.value += char
  }
  isGenerating.value = false
}

// Tab 2 Logic
const chatInput = ref('Hello')
const chatOutput = ref('')

const runChat = async () => {
  if (isGenerating.value || !chatInput.value) return
  isGenerating.value = true
  chatOutput.value = ''

  const responses = [
    'Hi there! How can I help?',
    'Hello! Nice to meet you.',
    'Greetings!'
  ]
  const target = responses[Math.floor(Math.random() * responses.length)]

  for (const char of target) {
    await new Promise((r) => setTimeout(r, 50))
    chatOutput.value += char
  }
  isGenerating.value = false
}

// Tab 3 Logic
const currentStep = ref(0)
const totalSteps = 10
const currentTrainData = ref(null)
const activeTrainData = ref(null)
const currentPrediction = ref('')
const currentLoss = ref(0)
const lossHistory = ref([])
const trainingLogs = ref([])
const inputEmbeddingOpacities = ref([0.7, 0.8, 0.75, 0.85, 0.8])
const predEmbeddingOpacities = ref([0.7, 0.8, 0.75, 0.85, 0.8])
const targetEmbeddingOpacities = ref([0.9, 0.95, 0.9, 0.95, 0.9])

const trainDataset = [
  { input: 'The sky is', target: 'blue' },
  { input: 'I like', target: 'apples' },
  { input: '今天天气', target: '不错' },
  { input: 'Machine', target: 'Learning' }
]

const isPredictionCorrect = computed(() => {
  if (!currentTrainData.value) return false
  return currentPrediction.value === currentTrainData.value.target
})

const resetTrainingState = () => {
  currentStep.value = 0
  activeTrainData.value = null
  currentTrainData.value = null
  currentPrediction.value = ''
  currentLoss.value = 0
  lossHistory.value = []
  trainingLogs.value = []
}

const seedOpacities = () => {
  inputEmbeddingOpacities.value = Array.from(
    { length: 5 },
    () => Math.random() * 0.5 + 0.5
  )
  predEmbeddingOpacities.value = Array.from(
    { length: 5 },
    () => Math.random() * 0.5 + 0.5
  )
  targetEmbeddingOpacities.value = Array.from(
    { length: 5 },
    () => Math.random() * 0.2 + 0.8
  )
}

const handleTrainClick = () => {
  if (currentStep.value >= totalSteps) {
    resetTrainingState()
  }

  if (!activeTrainData.value) {
    activeTrainData.value =
      trainDataset[Math.floor(Math.random() * trainDataset.length)]
  }

  currentStep.value += 1
  const i = currentStep.value

  const data = activeTrainData.value
  currentTrainData.value = data

  // Define a volatile loss curve for 10 steps to simulate real training instability
  // High -> Low -> Spike (Wrong) -> Low (Correct) -> Spike (Wrong) -> Stable Low
  const targetLossCurve = [
    2.8, // 1. Start high (Wrong)
    2.3, // 2. Dropping (Wrong)
    2.6, // 3. SPIKE! (Wrong)
    1.8, // 4. Recovering (Wrong)
    0.5, // 5. Good! (CORRECT!) -> Loss drops significantly because prediction matches
    1.5, // 6. SPIKE! (Wrong) -> Loss jumps up because prediction is wrong again
    0.4, // 7. Converging (Correct)
    0.3, // 8. Good (Correct)
    0.4, // 9. Small fluctuation (Correct)
    0.1 // 10. Converged (Correct)
  ]
  const baseLoss = targetLossCurve[i - 1] || 0.1

  // Add small randomness (+/- 0.05) to make it feel organic
  let noise = Math.random() * 0.1 - 0.05
  let finalLoss = baseLoss + noise

  // Boundary checks
  if (finalLoss < 0.01) finalLoss = 0.01

  // IMPORTANT: Ensure consistency between Loss and Prediction
  // Threshold logic:
  // Loss <= 0.8: Prediction is CORRECT (Low loss)
  // Loss > 0.8: Prediction is WRONG (High loss)
  // This ensures that when Loss spikes to 1.5 (Step 6), prediction MUST be wrong.
  // When Loss drops to 0.5 (Step 5), prediction MUST be correct.

  let pred
  const threshold = 0.8

  if (finalLoss > threshold) {
    pred = getRandomWord()
    // Safety: ensure random word is not the target
    while (pred === data.target) {
      pred = getRandomWord()
    }
  } else {
    pred = data.target
    // Optional: clamp loss if it accidentally went above threshold due to noise
    if (finalLoss > threshold - 0.01) finalLoss = threshold - 0.01
  }

  currentLoss.value = finalLoss
  currentPrediction.value = pred
  lossHistory.value.push(finalLoss)
  seedOpacities()

  trainingLogs.value.unshift({
    step: i,
    loss: finalLoss,
    input: data.input,
    pred: pred,
    target: data.target
  })

  if (trainingLogs.value.length > 5) trainingLogs.value.pop()
}

const trainButtonText = computed(() => {
  if (currentStep.value === 0) return 'Start Training (开始训练)'
  if (currentStep.value >= totalSteps) return 'Restart (重新开始)'
  return 'Next Step (下一步)'
})

const getRandomWord = () => {
  const words = [
    'cat',
    'fly',
    'run',
    'red',
    'table',
    'what',
    'bad',
    '未知',
    '乱码',
    '错误'
  ]
  return words[Math.floor(Math.random() * words.length)]
}

const lossPolylinePoints = computed(() => {
  if (lossHistory.value.length === 0) return ''

  // SVG Coordinate System (0,0 is top-left)
  // Chart Area: x=20 to 290, y=10 to 130
  const startX = 20
  const endX = 290
  const startY = 130 // Bottom (Loss = 0)
  const endY = 10 // Top (Loss = maxLoss)

  const width = endX - startX
  const height = startY - endY
  const maxLoss = 3.5

  if (lossHistory.value.length === 1) {
    const y = startY - (lossHistory.value[0] / maxLoss) * height
    return `${startX},${y}`
  }

  // We always want to map steps 1..10 to the full width
  // But lossHistory grows from length 1 to 10
  // So we map index 0 to step 1, index N to step N+1
  // To keep the chart stable (points appearing from left to right),
  // we should map based on totalSteps

  return lossHistory.value
    .map((loss, idx) => {
      // idx 0 corresponds to Step 1
      // We want Step 1 to be at x=0? Or spread out?
      // Let's spread out based on current progress or fixed totalSteps?
      // Fixed totalSteps is better for visualization "filling up"

      const stepIndex = idx // 0 to 9
      const x = startX + (stepIndex / (totalSteps - 1)) * width
      const y = startY - (loss / maxLoss) * height
      return `${x},${y}`
    })
    .join(' ')
})

const getLossColor = (loss) => {
  if (loss < 0.5) return '#10b981' // Green
  if (loss < 1.5) return '#f59e0b' // Orange
  return '#ef4444' // Red
}

seedOpacities()

// Tab 4 Logic
const alignmentState = ref('base')
</script>

<style scoped>
.ti-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
}

.nav-tabs {
  display: flex;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.nav-tabs button {
  flex: 1;
  min-width: 100px;
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: none;
  border-top: none;
  border-left: none;
  border-bottom: none;
  cursor: pointer;
}

.nav-tabs button.active {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
}

.demo-content {
  padding: 1.5rem;
  min-height: 200px;
}

.desc-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* Tab 1 Styles */
.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  align-items: center;
}

.input-row input {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.result-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  min-height: 3rem;
}

.user-text {
  font-weight: bold;
}

.ai-text {
  color: var(--vp-c-brand);
}

.explanation {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  text-align: center;
  background: rgba(100, 100, 100, 0.05);
  padding: 8px;
  border-radius: 4px;
}

/* Tab 2 Styles */
.chat-container {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.chat-ui-half,
.model-view-half {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.half-label {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.arrow-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  padding: 0 0.75rem;
  white-space: nowrap;
}

.chat-messages {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px 6px 0 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 200px;
}

.msg {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  max-width: 90%;
}

.msg.bot {
  background: var(--vp-c-bg-alt);
  align-self: flex-start;
}

.msg.user {
  background: var(--vp-c-brand);
  color: white;
  align-self: flex-end;
}

.input-area {
  display: flex;
  gap: 5px;
  padding: 5px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.input-area input {
  flex: 1;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.raw-prompt {
  flex: 1;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-y: auto;
  max-height: 300px;
}

.sys-tag {
  color: #569cd6;
}
.user-tag {
  color: #ce9178;
}
.bot-tag {
  color: #4ec9b0;
}

/* Tab 3 Styles (New) */
.training-dashboard {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card-panel:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.train-process-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.train-metrics-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.8rem;
}

.panel-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.step-badge {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

/* Data Flow Visualization */
.data-flow {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.flow-stage {
  position: relative;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.stage-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.6rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
}

.content-box.input.placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.9rem;
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  box-shadow: none;
}

.content-box.pred {
  color: var(--vp-c-text-1);
  transition: all 0.3s;
}

.content-box.pred.correct {
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

/* Embedding Matrix */
.matrix-viz {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 0.5rem;
}

.matrix-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.matrix-row {
  display: flex;
  gap: 4px;
  height: 16px;
  align-items: flex-end;
}

.matrix-cell {
  width: 10px;
  height: 100%;
  background-color: var(--vp-c-brand);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: bottom;
}

.matrix-cell.pred-cell {
  background-color: #f59e0b;
}
.matrix-cell.target-cell {
  background-color: #10b981;
}

/* Arrows */
.process-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0.5rem 0;
  color: var(--vp-c-text-3);
}

.arrow-line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
  position: relative;
}

.arrow-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 50%;
}

.process-badge {
  font-size: 0.7rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--vp-c-text-2);
}

/* Prediction Comparison */
.compare-row {
  display: flex;
  align-items: stretch;
  gap: 1rem;
}

.compare-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.vs-badge {
  align-self: center;
  background: var(--vp-c-text-3);
  color: var(--vp-c-bg);
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Loss Section */
.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.stage-header .stage-label {
  margin-bottom: 0;
}

.loss-val-badge {
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: var(--vp-c-text-3);
  transition: background-color 0.3s;
}

.loss-bar-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.loss-bar-bg {
  height: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.loss-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition:
    width 0.4s ease,
    background-color 0.3s;
}

.loss-feedback {
  font-size: 0.8rem;
  text-align: center;
  font-weight: 500;
  padding: 4px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}

.loss-feedback.success {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}
.loss-feedback.error {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Chart & Logs */
.chart-container {
  background: var(--vp-c-bg);
  padding: 0;
  border-radius: 4px;
  margin-bottom: 1rem;
  position: relative;
}

.loss-chart {
  width: 100%;
  height: 120px;
  overflow: visible;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 5px;
  padding: 0 10px;
}

.log-console-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.console-header {
  background: #2d2d2d;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3d3d3d;
}

.window-dots {
  display: flex;
  gap: 6px;
  margin-right: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red {
  background: #ff5f56;
}
.dot.yellow {
  background: #ffbd2e;
}
.dot.green {
  background: #27c93f;
}

.console-title {
  color: #888;
  font-size: 0.7rem;
  font-family: monospace;
}

.log-console {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
  line-height: 1.5;
  min-height: 150px;
}

.log-placeholder {
  color: #666;
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
}

.log-item {
  margin-bottom: 4px;
  display: flex;
  gap: 8px;
}

.log-step {
  color: #569cd6;
  flex-shrink: 0;
}
.log-loss {
  font-weight: bold;
  flex-shrink: 0;
}
.log-detail {
  color: #9cdcfe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-green {
  color: #4ec9b0;
  font-weight: bold;
}
.text-red {
  color: #ce9178;
  font-weight: bold;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .training-dashboard {
    flex-direction: column;
  }
}

.train-btn {
  padding: 10px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.train-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--vp-c-brand-rgb), 0.4);
}

.train-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Tab 4 Styles */
.alignment-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.controls {
  display: flex;
  justify-content: center;
}

.switch-label select {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.scenario {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.user-query {
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: right;
  background: var(--vp-c-bg-alt);
  display: inline-block;
  padding: 8px 12px;
  border-radius: 12px 12px 0 12px;
  margin-left: auto;
}

.model-response {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  font-size: 2rem;
}

.bubble {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 0 12px 12px 12px;
  flex: 1;
  position: relative;
}

.model-response.base .bubble {
  border: 2px solid #ef4444;
}

.model-response.aligned .bubble {
  border: 2px solid #10b981;
}

.analysis {
  text-align: center;
  margin-top: 1rem;
}

.bad-tag {
  color: #ef4444;
  font-weight: bold;
  border: 1px solid #ef4444;
  padding: 4px 8px;
  border-radius: 4px;
}

.good-tag {
  color: #10b981;
  font-weight: bold;
  border: 1px solid #10b981;
  padding: 4px 8px;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .chat-container {
    flex-direction: column;
  }
  .arrow-divider {
    writing-mode: horizontal-tb;
    align-self: center;
    margin: 10px 0;
  }
  .train-step {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  button {
    cursor: pointer;
    padding: 6px 12px;
    background-color: var(--vp-c-brand);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: var(--vp-c-brand-dark);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary-btn {
    padding: 8px 20px;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.25);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .primary-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.35);
  }
}
</style>
