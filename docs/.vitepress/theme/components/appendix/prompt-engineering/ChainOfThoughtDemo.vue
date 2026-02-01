<template>
  <el-card class="cot-demo-card" shadow="hover">
    <template #header>
      <div class="controls-header">
        <div class="control-group">
          <span class="label">任务场景：</span>
          <el-select v-model="currentTask" style="width: 200px">
            <el-option label="代码审查 (Code Review)" value="debug" />
            <el-option label="行程规划 (Travel Plan)" value="travel" />
          </el-select>
        </div>
        
        <div class="control-group">
          <span class="label">思考模式：</span>
          <el-radio-group v-model="currentMode">
            <el-radio-button 
              v-for="m in modes" 
              :key="m.id"
              :label="m.id"
            >
              {{ m.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </template>

    <div class="demo-content">
      <el-row :gutter="20">
        <!-- Left: Prompt Input -->
        <el-col :xs="24" :md="10">
          <el-card shadow="never" class="prompt-panel">
            <template #header>
              <div class="panel-header">
                <el-icon><EditPen /></el-icon>
                <span>输入提示词 (Prompt)</span>
              </div>
            </template>
            <div class="prompt-text">{{ currentScenario.prompt }}</div>
            <div class="action-area">
              <el-button 
                type="primary" 
                :loading="isPlaying"
                @click="runSimulation" 
                class="run-btn"
                size="large"
              >
                {{ isPlaying ? '生成中...' : '开始生成' }}
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- Right: AI Output Process -->
        <el-col :xs="24" :md="14">
          <el-card shadow="never" class="output-panel">
            <template #header>
              <div class="panel-header">
                <div class="left">
                  <el-icon><Cpu /></el-icon>
                  <span>AI 思考与输出</span>
                </div>
                <el-tag :type="statusType" effect="dark" size="small">{{ statusText }}</el-tag>
              </div>
            </template>
            
            <div class="output-container" ref="outputContainer">
              <el-empty 
                v-if="!hasRun && !isPlaying" 
                description="点击“开始生成”观察 AI 如何处理任务..." 
                :image-size="80"
              />
              
              <el-timeline v-else>
                <el-timeline-item
                  v-for="(step, index) in displaySteps"
                  :key="index"
                  :type="getStepType(index)"
                  :hollow="index > currentStepIndex"
                  :timestamp="currentStepIndex === index ? 'Thinking...' : ''"
                  placement="top"
                >
                  <h4 class="step-title">{{ step.title }}</h4>
                  <div class="step-content" v-if="step.content">
                    {{ step.displayedContent }}<span v-if="currentStepIndex === index" class="typing-cursor">|</span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Insight/Analysis Section -->
    <div class="insight-section" v-if="hasRun || isPlaying">
      <el-alert
        :type="currentMode === 'direct' ? 'warning' : 'success'"
        :closable="false"
        show-icon
      >
        <template #title>
          <span class="insight-title">模式分析</span>
        </template>
        <template #default>
          <div v-if="currentMode === 'direct'">
            <strong>直接输出模式：</strong> 模型急于给出结果，容易忽略边界情况或细节，导致内容泛泛而谈。
          </div>
          <div v-else>
            <strong>CoT (思维链) 模式：</strong> 强迫模型先“思考”再“行动”。通过列出清单/计划，它相当于给自己建立了“检查点”，大大降低了遗漏和跑偏的概率。
          </div>
        </template>
      </el-alert>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { EditPen, Cpu } from '@element-plus/icons-vue'

const currentTask = ref('debug')
const currentMode = ref('plan-first')
const isPlaying = ref(false)
const hasRun = ref(false)
const currentStepIndex = ref(0)

// Data Scenarios
const scenarios = {
  debug: {
    prompt: `Review the following code:
function add(a, b) {
  return a - b;
}`,
    direct: [
      { title: '直接输出', content: 'The function `add` incorrectly uses the subtraction operator `-` instead of `+`. It should be `return a + b;`.' }
    ],
    cot: [
      { title: '1. 理解意图', content: 'User wants to add two numbers.' },
      { title: '2. 检查实现', content: 'Line 2 uses `-` operator.' },
      { title: '3. 发现矛盾', content: 'Function name is `add` but logic is subtraction.' },
      { title: '4. 最终输出', content: 'The function has a bug: it subtracts instead of adds. Fix: change `-` to `+`.' }
    ]
  },
  travel: {
    prompt: 'Plan a 2-day trip to Paris for an art lover.',
    direct: [
      { title: '直接输出', content: 'Day 1: Eiffel Tower, Louvre. Day 2: Montmartre, Orsay Museum. Enjoy!' }
    ],
    cot: [
      { title: '1. 分析需求', content: 'Destination: Paris. Duration: 2 days. Interest: Art.' },
      { title: '2. 筛选景点', content: 'Must-sees: Louvre (Mona Lisa), Musee d\'Orsay (Impressionism), Pompidou (Modern).' },
      { title: '3. 规划路线', content: 'Cluster locations to save travel time.' },
      { title: '4. 最终行程', content: 'Day 1: Louvre (morning) -> Tuileries -> Orangerie. Day 2: Orsay (morning) -> Montmartre -> Sacré-Cœur.' }
    ]
  }
}

const modes = [
  { id: 'direct', label: '直接回答 (Zero-Shot)' },
  { id: 'plan-first', label: '思维链 (Chain-of-Thought)' }
]

const currentScenario = computed(() => scenarios[currentTask.value])
const targetSteps = computed(() => {
  return currentMode.value === 'direct' 
    ? currentScenario.value.direct 
    : currentScenario.value.cot
})

// Display state
const displaySteps = ref([])

const statusText = computed(() => {
  if (isPlaying.value) return 'Thinking...'
  if (hasRun.value) return 'Completed'
  return 'Idle'
})

const statusType = computed(() => {
  if (isPlaying.value) return 'primary'
  if (hasRun.value) return 'success'
  return 'info'
})

const getStepType = (index) => {
  if (index < currentStepIndex.value) return 'success'
  if (index === currentStepIndex.value) return 'primary'
  return ''
}

// Reset when controls change
watch([currentTask, currentMode], () => {
  reset()
})

function reset() {
  isPlaying.value = false
  hasRun.value = false
  currentStepIndex.value = 0
  displaySteps.value = []
}

async function runSimulation() {
  if (isPlaying.value) return
  reset()
  isPlaying.value = true
  
  // Initialize steps structure
  displaySteps.value = targetSteps.value.map(s => ({
    ...s,
    displayedContent: ''
  }))

  for (let i = 0; i < displaySteps.value.length; i++) {
    currentStepIndex.value = i
    const step = displaySteps.value[i]
    const fullContent = step.content
    
    // Simulate typing effect
    for (let j = 0; j <= fullContent.length; j++) {
      step.displayedContent = fullContent.slice(0, j)
      await new Promise(r => setTimeout(r, 20)) // typing speed
    }
    await new Promise(r => setTimeout(r, 500)) // pause between steps
  }

  isPlaying.value = false
  hasRun.value = true
  currentStepIndex.value = displaySteps.value.length // Mark all done
}
</script>

<style scoped>
.cot-demo-card {
  margin: 16px 0;
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.demo-content {
  margin-bottom: 24px;
}

.prompt-panel, .output-panel {
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.panel-header .left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.prompt-text {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  border: 1px solid var(--vp-c-divider);
  min-height: 120px;
  margin-bottom: 16px;
}

.action-area {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.run-btn {
  width: 100%;
}

.output-container {
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 4px;
}

.step-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.step-content {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.insight-section {
  margin-top: 16px;
}

.insight-title {
  font-weight: 600;
}

@media (max-width: 768px) {
  .controls-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .control-group {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .control-group .el-select, 
  .control-group .el-radio-group {
    width: 100%;
  }
  
  .prompt-panel {
    margin-bottom: 16px;
    min-height: auto;
  }
}
</style>