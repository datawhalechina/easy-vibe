<template>
  <div class="combinatorial-explosion-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>🎯 组合爆炸模拟器</h4>
          <p class="subtitle">亲手体验"规则指数增长"的恐怖</p>
        </div>
      </template>

      <div class="demo-content">
        <div class="controls-grid">
          <div class="control-item">
            <div class="label-row">
              <span class="label-icon">🎨</span>
              <span class="label-text">物体特征数量: {{ featureCount }}</span>
            </div>
            <el-slider
              v-model="featureCount"
              :min="2"
              :max="6"
              show-stops
              :marks="{ 2: '2', 4: '4', 6: '6' }"
            />
            <div class="preview-tags">
              <el-tag
                v-for="i in featureCount"
                :key="i"
                size="small"
                :type="getFeatureTagType(i)"
                effect="plain"
              >
                特征{{ i }}
              </el-tag>
            </div>
          </div>

          <div class="control-item">
            <div class="label-row">
              <span class="label-icon">🔢</span>
              <span class="label-text"
                >每个特征的可能值: {{ valuesPerFeature }}</span
              >
            </div>
            <el-slider
              v-model="valuesPerFeature"
              :min="2"
              :max="4"
              show-stops
              :marks="{ 2: '2', 3: '3', 4: '4' }"
            />
          </div>
        </div>

        <el-divider />

        <div class="visualization-panel">
          <div class="counter-display">
            <el-statistic
              title="需要的规则总数"
              :value="totalRules"
              value-style="font-weight: bold; color: var(--el-color-primary)"
            >
              <template #suffix>
                <span class="formula-suffix"
                  >= {{ valuesPerFeature }}<sup>{{ featureCount }}</sup></span
                >
              </template>
            </el-statistic>
            <el-tag :type="complexityInfo.type" effect="dark" class="mt-2">
              {{ complexityInfo.label }}
            </el-tag>
          </div>

          <div class="action-buttons mt-4">
            <el-button
              type="primary"
              @click="addRule"
              :disabled="ruleCount >= maxRules"
            >
              ✨ 添加规则 ({{ ruleCount }}/{{ maxRules }})
            </el-button>
            <el-button @click="resetRules">🔄 重置</el-button>
          </div>

          <div class="rules-container mt-4">
            <transition-group name="el-zoom-in-center" tag="div" class="rules-grid">
              <div
                v-for="(rule, index) in displayedRules"
                :key="rule.id"
                class="rule-card-mini"
                :style="{ borderColor: rule.color }"
              >
                <div class="rule-idx">#{{ index + 1 }}</div>
                <div class="rule-dots">
                  <span
                    v-for="d in 3"
                    :key="d"
                    class="dot"
                    :style="{ backgroundColor: rule.color }"
                  ></span>
                </div>
              </div>
            </transition-group>
          </div>

          <el-alert
            v-if="showWarning"
            title="规则太多了！"
            description="这就是'组合爆炸'。仅仅增加一点点复杂度，规则数量就会爆炸式增长，人类根本写不完。"
            type="error"
            show-icon
            class="mt-4"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const featureCount = ref(3)
const valuesPerFeature = ref(2)
const displayedRules = ref([])
const maxRules = 20 // Visual limit

const totalRules = computed(() =>
  Math.pow(valuesPerFeature.value, featureCount.value)
)
const ruleCount = computed(() => displayedRules.value.length)
const showWarning = computed(() => totalRules.value > 50)

const complexityInfo = computed(() => {
  if (totalRules.value <= 10)
    return { label: '简单 (可人工处理)', type: 'success' }
  if (totalRules.value <= 50)
    return { label: '中等 (有点累了)', type: 'warning' }
  return { label: '极难 (组合爆炸!)', type: 'danger' }
})

const getFeatureTagType = (i) => {
  const types = ['', 'success', 'warning', 'danger', 'info']
  return types[i % types.length]
}

const addRule = () => {
  if (ruleCount.value >= maxRules) return

  const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
  displayedRules.value.push({
    id: Date.now(),
    color: colors[Math.floor(Math.random() * colors.length)]
  })
}

const resetRules = () => {
  displayedRules.value = []
}

// Reset rules when parameters change
watch([featureCount, valuesPerFeature], () => {
  resetRules()
})
</script>

<style scoped>
.combinatorial-explosion-demo {
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

.controls-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 640px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }
}

.label-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
}

.preview-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.counter-display {
  text-align: center;
  background-color: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 8px;
}

.formula-suffix {
  font-size: 0.6em;
  color: var(--vp-c-text-2);
  margin-left: 8px;
}

.rules-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  min-height: 60px;
}

.rule-card-mini {
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg);
}

.rule-idx {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.rule-dots {
  display: flex;
  gap: 2px;
  margin-top: 2px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.mt-2 {
  margin-top: 8px;
}
.mt-4 {
  margin-top: 16px;
}
</style>
