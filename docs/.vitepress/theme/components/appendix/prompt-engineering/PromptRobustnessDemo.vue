<!--
  PromptRobustnessDemo.vue
  演示如何通过“允许提问”和“自我修正”让 AI 输出更稳定。
  场景：策划团建活动
-->
<template>
  <el-card class="robustness-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="title">让 AI 更“稳”：拒绝瞎猜，学会反问与自查</h3>
          <p class="subtitle">面对模糊指令，AI 应该“不懂就问”而不是“一本正经胡说”。</p>
        </div>
      </div>
    </template>

    <div class="controls-section">
      <el-row :gutter="20" align="middle">
        <el-col :span="12" :xs="24">
          <div class="input-display">
            <span class="label">你的指令：</span>
            <el-tag type="info" size="large" effect="plain">“帮我策划一个团建活动。”</el-tag>
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="mode-switch">
            <el-radio-group v-model="mode" @change="resetState">
              <el-radio-button label="raw">直接生成</el-radio-button>
              <el-radio-button label="clarify">允许提问</el-radio-button>
              <el-radio-button label="verify">要求自检</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="simulation-area">
      <!-- 模式 1: 直接生成 -->
      <div v-if="mode === 'raw'" class="scenario raw">
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar :size="40" style="background-color: var(--vp-c-brand)">AI</el-avatar>
          </div>
          <el-card shadow="never" class="bubble-content">
            <p>好的！为您推荐以下活动：</p>
            <ol>
              <li>豪华游艇出海派对（人均 5000）</li>
              <li>也就是去楼下吃个火锅（人均 100）</li>
              <li>徒步穿越无人区（高风险）</li>
            </ol>
            <div class="note">（AI 内心：你不说预算和人数，我就随便猜了...）</div>
          </el-card>
        </div>
        <el-alert title="结果不可控：AI 只能盲猜，方案可能完全不靠谱" type="error" show-icon :closable="false" />
      </div>

      <!-- 模式 2: 澄清问题 -->
      <div v-if="mode === 'clarify'" class="scenario clarify">
        <div class="chat-bubble ai">
          <div class="avatar-container">
            <el-avatar :size="40" style="background-color: var(--vp-c-brand)">AI</el-avatar>
          </div>
          <el-card shadow="never" class="bubble-content">
            <p>收到。为了给出精准建议，我需要确认 3 点：</p>
            <el-form label-position="top" size="small" class="questions-form">
              <el-row :gutter="12">
                <el-col :span="8" :xs="24">
                  <el-form-item label="1. 人数规模？">
                    <el-select v-model="answers.count">
                      <el-option label="10人小团队" value="10" />
                      <el-option label="100人大大公司" value="100" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :xs="24">
                  <el-form-item label="2. 人均预算？">
                    <el-select v-model="answers.budget">
                      <el-option label="低（<200元）" value="low" />
                      <el-option label="高（>1000元）" value="high" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :xs="24">
                  <el-form-item label="3. 偏好？">
                    <el-select v-model="answers.type">
                      <el-option label="轻松吃喝" value="relax" />
                      <el-option label="户外运动" value="active" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button type="primary" @click="generatePlan" style="margin-top: 8px">生成方案</el-button>
            </el-form>
          </el-card>
        </div>
        
        <div v-if="planResult" class="chat-bubble ai result fade-in">
          <div class="avatar-container">
            <el-avatar :size="40" style="background-color: var(--vp-c-brand)">AI</el-avatar>
          </div>
          <el-card shadow="never" class="bubble-content plan-result">
            <p>基于您的要求（{{ answerSummary }}），推荐方案：</p>
            <div class="plan-card">
              <h3>{{ planResult.title }}</h3>
              <p>{{ planResult.desc }}</p>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 模式 3: 自我修正 -->
      <div v-if="mode === 'verify'" class="scenario verify">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px">
          <template #title>
            指令升级：策划一个活动，<strong>必须包含素食选项</strong>，且<strong>总预算不超过 2000 元</strong>。
          </template>
        </el-alert>
        
        <el-steps :active="verifyStep" align-center finish-status="success" style="margin-bottom: 24px">
          <el-step title="初次生成" :icon="Edit" />
          <el-step title="自我检查" :icon="View" />
          <el-step title="修正输出" :icon="CircleCheck" />
        </el-steps>

        <div class="monitor-log">
          <el-collapse-transition>
            <div v-if="verifyStep >= 1" class="log-item">
              <el-tag size="small" type="info">生成草稿</el-tag>
              <span class="log-text">“全牛宴烧烤，预计花费 3000 元...”</span>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-if="verifyStep >= 2" class="log-item check-fail">
              <el-tag size="small" type="danger">自检发现</el-tag>
              <div class="check-list">
                <div class="fail-item"><el-icon color="#f56c6c"><Close /></el-icon> 包含素食？否（全是肉）</div>
                <div class="fail-item"><el-icon color="#f56c6c"><Close /></el-icon> 预算&lt;2000？否（3000超标）</div>
              </div>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-if="verifyStep >= 3" class="log-item success">
              <el-tag size="small" type="success">修正后</el-tag>
              <span class="log-text">“田园蔬菜自助 + 少量烤肉，预计花费 1800 元。” ✅</span>
            </div>
          </el-collapse-transition>
        </div>
        
        <div class="actions" style="text-align: center; margin-top: 20px;">
          <el-button v-if="verifyStep === 0" type="primary" @click="runVerify" size="large">开始运行</el-button>
          <el-button v-else-if="verifyStep === 3" @click="verifyStep = 0">重置演示</el-button>
          <el-button v-else loading disabled>处理中...</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Edit, View, CircleCheck, Close } from '@element-plus/icons-vue'

const mode = ref('raw') // raw, clarify, verify
const answers = ref({
  count: '10',
  budget: 'low',
  type: 'relax'
})
const planResult = ref(null)
const verifyStep = ref(0)

const resetState = () => {
  planResult.value = null
  verifyStep.value = 0
}

const answerSummary = computed(() => {
  const m = {
    '10': '10人', '100': '100人',
    'low': '低预算', 'high': '高预算',
    'relax': '轻松', 'active': '运动'
  }
  return `${m[answers.value.count]} + ${m[answers.value.budget]} + ${m[answers.value.type]}`
})

const generatePlan = () => {
  const { count, budget, type } = answers.value
  let title = ''
  let desc = ''
  
  if (budget === 'high') {
    title = type === 'relax' ? '五星级酒店 SPA & 自助晚宴' : '高端高尔夫球体验'
  } else {
    title = type === 'relax' ? '桌游轰趴馆 & 披萨外卖' : '城市公园定向越野'
  }
  
  desc = `适合 ${count} 人团队，${budget === 'high' ? '尽享奢华' : '性价比极高'}。`
  planResult.value = { title, desc }
}

const runVerify = () => {
  verifyStep.value = 1
  setTimeout(() => verifyStep.value = 2, 1000)
  setTimeout(() => verifyStep.value = 3, 2500)
}
</script>

<style scoped>
.robustness-card {
  margin: 16px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.controls-section {
  margin-bottom: 24px;
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 8px;
}

.input-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mode-switch {
  display: flex;
  justify-content: flex-end;
}

.simulation-area {
  min-height: 250px;
}

.chat-bubble {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar-container {
  flex-shrink: 0;
}

.bubble-content {
  flex: 1;
  border-radius: 0 12px 12px 12px;
}

.note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  font-style: italic;
}

.questions-form {
  margin-top: 12px;
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 8px;
}

.plan-result {
  border-left: 4px solid var(--vp-c-brand);
}

.plan-card h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
}

.plan-card p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.monitor-log {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.log-item:last-child {
  margin-bottom: 0;
}

.log-text {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-top: 2px;
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.fail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-danger);
  font-size: 13px;
}

@media (max-width: 768px) {
  .mode-switch {
    justify-content: flex-start;
    margin-top: 12px;
  }
}
</style>