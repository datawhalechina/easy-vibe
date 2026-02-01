<template>
  <div class="rule-learning-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>规则 vs 学习</h4>
          <p class="subtitle">
            对比：你写阈值 (规则) vs 让模型从数据里"推断"阈值 (学习)
          </p>
        </div>
      </template>

      <el-row :gutter="20">
        <!-- Rule Based -->
        <el-col :xs="24" :md="12" class="mb-4-xs">
          <el-card shadow="never" class="panel-card">
            <template #header>
              <div class="panel-title">规则系统（手写 If/Else）</div>
            </template>
            <div class="panel-content">
              <div class="control-row">
                <span class="label">阈值 size &gt;</span>
                <el-input-number
                  v-model="ruleThreshold"
                  :min="1"
                  :max="10"
                  size="small"
                />
                <span class="text-xs text-gray">（必须明确写出）</span>
              </div>

              <div class="control-row mt-4">
                <span class="label">测试输入 size</span>
                <el-slider
                  v-model="testInput"
                  :min="1"
                  :max="10"
                  show-input
                  input-size="small"
                  class="flex-1"
                />
              </div>

              <div
                class="result-box mt-4"
                :class="{
                  good: ruleResult.label === '🍎',
                  bad: ruleResult.label === '🍒'
                }"
              >
                <div class="result-title">输出</div>
                <div class="result-value">{{ ruleResult.text }}</div>
                <div class="result-code">
                  if (size &gt; {{ ruleThreshold }}) return 🍎 else return 🍒
                </div>
              </div>

              <el-alert
                title="当环境变化（比如'苹果平均变小了'），你需要手动改规则；规则越多，维护成本越高。"
                type="warning"
                :closable="false"
                class="mt-4"
              />
            </div>
          </el-card>
        </el-col>

        <!-- Machine Learning -->
        <el-col :xs="24" :md="12">
          <el-card shadow="never" class="panel-card">
            <template #header>
              <div class="panel-title">机器学习（从样本推断边界）</div>
            </template>
            <div class="panel-content">
              <div class="control-row">
                <el-input-number
                  v-model="newSize"
                  :min="1"
                  :max="10"
                  size="small"
                  placeholder="Size"
                />
                <el-select
                  v-model="newLabel"
                  size="small"
                  placeholder="Label"
                  style="width: 120px"
                >
                  <el-option label="🍒 樱桃" value="🍒" />
                  <el-option label="🍎 苹果" value="🍎" />
                </el-select>
                <el-button type="primary" size="small" @click="addSample"
                  >添加样本</el-button
                >
              </div>

              <div class="samples-area mt-4">
                <el-empty
                  v-if="trainingData.length === 0"
                  description="还没有样本：先添加 2-4 个样本再训练"
                  :image-size="40"
                />
                <div v-else class="sample-chips">
                  <el-tag
                    v-for="(p, i) in trainingData"
                    :key="p.id"
                    closable
                    @close="removeSample(i)"
                    :type="p.label === '🍎' ? 'danger' : 'info'"
                    effect="plain"
                  >
                    {{ p.size }} → {{ p.label }}
                  </el-tag>
                </div>
              </div>

              <div class="actions mt-4 flex gap-2">
                <el-button
                  type="success"
                  @click="train"
                  :disabled="trainingData.length < 2"
                >
                  训练（推断阈值）
                </el-button>
                <el-button @click="resetLearning">重置</el-button>
              </div>

              <div v-if="learnedThreshold !== null" class="learned-result mt-4">
                <el-alert
                  type="success"
                  :closable="false"
                  show-icon
                  title="学习完成！"
                >
                  <p>
                    模型推断出阈值应为: <strong>{{ learnedThreshold }}</strong>
                  </p>
                  <p class="text-xs">
                    (大于 {{ learnedThreshold }} 是苹果，否则是樱桃)
                  </p>
                </el-alert>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Rule Based Logic
const ruleThreshold = ref(5)
const testInput = ref(6)

const ruleResult = computed(() => {
  if (testInput.value > ruleThreshold.value) {
    return { label: '🍎', text: '🍎 苹果' }
  } else {
    return { label: '🍒', text: '🍒 樱桃' }
  }
})

// ML Logic
const newSize = ref(5)
const newLabel = ref('🍎')
const trainingData = ref([
  { id: 1, size: 2, label: '🍒' },
  { id: 2, size: 8, label: '🍎' }
])
const learnedThreshold = ref(null)

const addSample = () => {
  trainingData.value.push({
    id: Date.now(),
    size: newSize.value,
    label: newLabel.value
  })
}

const removeSample = (index) => {
  trainingData.value.splice(index, 1)
}

const resetLearning = () => {
  trainingData.value = []
  learnedThreshold.value = null
}

const train = () => {
  // Simple "training": find the boundary between cherry and apple
  // Sort data by size
  const sorted = [...trainingData.value].sort((a, b) => a.size - b.size)

  // Find the first Apple
  const firstAppleIndex = sorted.findIndex((item) => item.label === '🍎')

  if (firstAppleIndex === -1) {
    // All cherries
    learnedThreshold.value = 10
  } else if (firstAppleIndex === 0) {
    // All apples
    learnedThreshold.value = 0
  } else {
    // Boundary is between last cherry and first apple
    const lastCherry = sorted[firstAppleIndex - 1]
    const firstApple = sorted[firstAppleIndex]
    learnedThreshold.value = (lastCherry.size + firstApple.size) / 2
  }
}
</script>

<style scoped>
.rule-learning-demo {
  margin: 20px 0;
}

.card-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 4px 0 0;
}

.panel-title {
  font-weight: bold;
  font-size: 14px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  font-size: 14px;
}

.text-xs {
  font-size: 12px;
}

.text-gray {
  color: var(--vp-c-text-2);
}

.flex-1 {
  flex: 1;
}

.mt-4 {
  margin-top: 16px;
}

.mb-4-xs {
  margin-bottom: 20px;
}

@media (min-width: 992px) {
  .mb-4-xs {
    margin-bottom: 0;
  }
}

.result-box {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.result-box.good {
  border-color: var(--el-color-danger);
  background-color: var(--el-color-danger-light-9);
}

.result-box.bad {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.result-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

.result-value {
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
}

.result-code {
  font-family: monospace;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 4px;
  border-radius: 4px;
}

.sample-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}

.gap-2 {
  gap: 8px;
}
</style>
