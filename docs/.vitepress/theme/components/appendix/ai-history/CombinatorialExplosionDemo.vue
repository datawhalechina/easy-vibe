<template>
  <div class="combinatorial-explosion-demo">
    <div class="demo-container">
      <div class="controls-panel">
        <h4>🎯 组合爆炸模拟器</h4>
        <p class="subtitle">亲手体验"规则指数增长"的恐怖</p>

        <div class="control-group">
          <label>
            <span class="label-icon">🎨</span>
            物体特征数量：{{ featureCount }}
          </label>
          <input
            v-model.number="featureCount"
            type="range"
            min="2"
            max="6"
            step="1"
            class="feature-slider"
          />
          <div class="feature-preview">
            <span
              v-for="i in featureCount"
              :key="i"
              class="feature-tag"
              :style="{ background: getFeatureColor(i) }"
            >
              特征{{ i }}
            </span>
          </div>
        </div>

        <div class="control-group">
          <label>
            <span class="label-icon">🔢</span>
            每个特征的可能值：{{ valuesPerFeature }}
          </label>
          <input
            v-model.number="valuesPerFeature"
            type="range"
            min="2"
            max="4"
            step="1"
            class="value-slider"
          />
        </div>

        <div class="action-buttons">
          <button @click="addRule" class="add-rule-btn" :disabled="ruleCount >= maxRules">
            ✨ 添加规则 ({{ ruleCount }}/{{ maxRules }})
          </button>
          <button @click="autoGenerate" class="auto-btn" :disabled="autoGenerating">
            ⚡ 自动生成
          </button>
          <button @click="resetRules" class="reset-btn">
            🔄 重置
          </button>
        </div>
      </div>

      <div class="visualization-panel">
        <div class="counter-display">
          <div class="counter-label">需要的规则总数</div>
          <transition name="count-update" mode="out-in">
            <div :key="totalRules" class="counter-value">{{ formatNumber(totalRules) }}</div>
          </transition>
          <div class="counter-formula">
            = {{ valuesPerFeature }}<sup>{{ featureCount }}</sup> =
            <span class="highlight">{{ totalRules }}</span>
          </div>
          <div class="complexity-badge" :class="getComplexityLevel(totalRules)">
            {{ getComplexityLabel(totalRules) }}
          </div>
        </div>

        <div class="rules-container">
          <transition-group name="rule-pop" tag="div" class="rules-grid">
            <div
              v-for="(rule, index) in displayedRules"
              :key="rule.id"
              class="rule-card"
              :style="{ borderColor: rule.color }"
            >
              <div class="rule-number">#{{ index + 1 }}</div>
              <div class="rule-content">
                <code>{{ rule.text }}</code>
              </div>
              <div class="rule-visual" :style="{ background: rule.gradient }"></div>
            </div>
          </transition-group>
        </div>

        <transition name="warning-fade">
          <div v-if="showWarning" class="warning-message">
            <div class="warning-icon">💥</div>
            <div class="warning-content">
              <h5>组合爆炸！</h5>
              <p>
                即使只有 <strong>{{ featureCount }}</strong> 个特征，每个特征
                <strong>{{ valuesPerFeature }}</strong> 种可能，也需要
                <strong>{{ formatNumber(totalRules) }}</strong> 条规则！
              </p>
              <p>
                这就是为什么<strong>基于规则的 AI</strong> 无法处理复杂现实——
                规则数量呈<strong>指数级增长</strong>，根本写不完！
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="comparison-box">
      <h5>📊 对比：人类 vs 规则系统</h5>
      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="comparison-icon">🧠</div>
          <div class="comparison-text">
            <strong>人类识别猫</strong>
            <p>看到 → 瞬间识别（无需列举规则）</p>
          </div>
        </div>
        <div class="comparison-arrow">→</div>
        <div class="comparison-item">
          <div class="comparison-icon">🤖</div>
          <div class="comparison-text">
            <strong>规则系统识别猫</strong>
            <p>需要 {{ formatNumber(totalRules) }} 条规则</p>
          </div>
        </div>
      </div>
    </div>

    <div class="insight-box">
      <h5>💡 关键洞察</h5>
      <p>
        <strong>符号主义 AI 的致命弱点</strong>：现实世界的特征组合是无限的。
        即使是简单的"识别猫"，也需要考虑：
      </p>
      <ul class="feature-list">
        <li>形状：圆脸、尖脸...</li>
        <li>耳朵：立耳、折耳...</li>
        <li>毛色：黑、白、橘、花纹...</li>
        <li>体型：胖、瘦、中等...</li>
        <li>姿态：站立、趴下、跳跃...</li>
        <li>...</li>
      </ul>
      <p class="conclusion">
        <strong>结论</strong>：规则永远写不完，这就是为什么我们需要<strong>机器学习</strong>！
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const featureCount = ref(3)
const valuesPerFeature = ref(3)
const ruleCount = ref(0)
const ruleIdCounter = ref(0)
const autoGenerating = ref(false)
const displayedRules = ref([])
const maxRules = 20

// Use theme colors (works for dark/light) instead of hardcoded hex.
const featureColors = [
  'rgba(var(--vp-c-brand-rgb), 0.18)',
  'rgba(var(--vp-c-brand-rgb), 0.24)',
  'rgba(var(--vp-c-brand-rgb), 0.3)',
  'rgba(var(--vp-c-brand-rgb), 0.36)',
  'rgba(var(--vp-c-brand-rgb), 0.42)',
  'rgba(var(--vp-c-brand-rgb), 0.48)'
]

const totalRules = computed(() => {
  return Math.pow(valuesPerFeature.value, featureCount.value)
})

const showWarning = computed(() => {
  return ruleCount.value >= maxRules || totalRules.value > 50
})

const getFeatureColor = (index) => {
  return featureColors[(index - 1) % featureColors.length]
}

const features = computed(() => {
  const featureNames = ['形状', '颜色', '大小', '纹理', '尾巴', '耳朵']
  return featureNames.slice(0, featureCount.value)
})

const valueOptions = computed(() => {
  const options = {
    2: ['小', '大'],
    3: ['小', '中', '大'],
    4: ['很小', '小', '大', '很大']
  }
  return options[valuesPerFeature.value] || options[3]
})

const generateRuleText = () => {
  const conditions = features.value.map((feature, index) => {
    const value = valueOptions.value[Math.floor(Math.random() * valuesPerFeature.value)]
    return `${feature}=${value}`
  })
  return `IF ${conditions.join(' AND ')} THEN ...`
}

const generateColor = () => {
  // Keep visuals subtle and theme-consistent; avoid heavy gradients.
  return 'rgba(var(--vp-c-brand-rgb), 0.12)'
}

const addRule = () => {
  if (ruleCount.value < maxRules) {
    displayedRules.value.push({
      id: ruleIdCounter.value++,
      text: generateRuleText(),
      color: getFeatureColor(Math.floor(Math.random() * featureCount.value) + 1),
      gradient: generateColor()
    })
    ruleCount.value++
  }
}

const autoGenerate = async () => {
  if (autoGenerating.value) return

  autoGenerating.value = true
  const interval = setInterval(() => {
    if (ruleCount.value >= maxRules) {
      clearInterval(interval)
      autoGenerating.value = false
    } else {
      addRule()
    }
  }, 100)
}

const resetRules = () => {
  displayedRules.value = []
  ruleCount.value = 0
  autoGenerating.value = false
}

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const getComplexityLevel = (num) => {
  if (num < 10) return 'low'
  if (num < 100) return 'medium'
  if (num < 1000) return 'high'
  return 'extreme'
}

const getComplexityLabel = (num) => {
  if (num < 10) return '😊 简单'
  if (num < 100) return '😐 复杂'
  if (num < 1000) return '😰 非常复杂'
  return '😱 指数爆炸'
}

// 重置规则当特征数变化时
watch([featureCount, valuesPerFeature], () => {
  resetRules()
})
</script>

<style scoped>
.combinatorial-explosion-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.controls-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.controls-panel h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.label-icon {
  font-size: 1.25rem;
}

.feature-slider,
.value-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  outline: none;
  margin-bottom: 0.75rem;
}

.feature-slider::-webkit-slider-thumb,
.value-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.25);
}

.feature-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  padding: 0.35rem 0.75rem;
  color: var(--vp-c-bg);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-brand);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.add-rule-btn,
.auto-btn,
.reset-btn {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-rule-btn {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.add-rule-btn:hover:not(:disabled) {
  opacity: 0.95;
}

.add-rule-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auto-btn {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.auto-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}

.reset-btn {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.reset-btn:hover {
  border-color: var(--vp-c-brand);
}

.visualization-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.counter-display {
  text-align: center;
  padding: 2rem 1.5rem;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.15);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.counter-display::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(var(--vp-c-brand-rgb), 0.08) 0%,
    transparent 70%
  );
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.counter-label {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.counter-value {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.counter-formula {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

.counter-formula .highlight {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 1.2rem;
}

.complexity-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.complexity-badge.low {
  border-color: var(--vp-c-green-1, #22c55e);
}

.complexity-badge.medium {
  border-color: var(--vp-c-yellow-1, #f59e0b);
}

.complexity-badge.high {
  border-color: var(--vp-c-yellow-1, #f59e0b);
}

.complexity-badge.extreme {
  border-color: var(--vp-c-red-1, #ef4444);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.rules-container {
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.rule-card {
  position: relative;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.rule-number {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.rule-content code {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 0.7rem;
  line-height: 1.4;
  word-break: break-word;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem;
  border-radius: 3px;
}

.rule-visual {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  opacity: 0.3;
  border-radius: 0 6px 0 6px;
}

.warning-message {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-yellow-1, #f59e0b);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.warning-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.warning-content h5 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
}

.warning-content p {
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
}

.warning-content strong {
  color: var(--vp-c-text-1);
}

.comparison-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.comparison-box h5 {
  margin: 0 0 1.25rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.comparison-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.comparison-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.comparison-text strong {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.comparison-text p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.comparison-arrow {
  font-size: 2rem;
  color: var(--vp-c-text-3);
}

.insight-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.insight-box h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
}

.insight-box p {
  margin: 0 0 1rem 0;
  line-height: 1.8;
}

.insight-box .conclusion {
  padding: 1rem;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.15);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.feature-list li {
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  position: relative;
  color: var(--vp-c-text-2);
}

.feature-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: 700;
}

/* Transitions */
.count-update-enter-active,
.count-update-leave-active {
  transition: all 0.3s ease;
}

.count-update-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.count-update-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.rule-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.rule-pop-enter-from {
  opacity: 0;
  transform: scale(0.3) rotate(-10deg);
}

.warning-fade-enter-active,
.warning-fade-leave-active {
  transition: all 0.5s ease;
}

.warning-fade-enter-from,
.warning-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  .comparison-arrow {
    transform: rotate(90deg);
  }
}
</style>
