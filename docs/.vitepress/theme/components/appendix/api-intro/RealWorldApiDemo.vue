<!--
  RealWorldApiDemo.vue
  目标：展示真实场景中调用 AI 服务的两种方式
-->
<template>
  <div class="demo">
    <div class="title">🤖 真实场景：让 AI 帮你写产品文案</div>
    <p class="subtitle">体验两种调用方式的区别</p>

    <div class="scenario">
      <div class="scenario-header">
        <span class="scenario-icon">📝</span>
        <span class="scenario-title">你的需求</span>
      </div>
      <div class="scenario-body">
        我想让 AI 帮智能手表写一段吸引人的产品文案
      </div>
    </div>

    <div class="modes">
      <div class="mode-tabs">
        <button
          :class="['tab', { active: mode === 'http' }]"
          @click="mode = 'http'"
        >
          🌐 HTTP API（外卖模式）
        </button>
        <button
          :class="['tab', { active: mode === 'sdk' }]"
          @click="mode = 'sdk'"
        >
          📦 SDK（堂食模式）
        </button>
      </div>

      <div class="mode-content">
        <!-- HTTP 模式 -->
        <div v-if="mode === 'http'" class="mode-details">
          <div class="steps">
            <div class="step" :class="{ active: currentStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="step-title">找到网址（打开外卖 APP）</div>
                <div class="step-code">
                  https://api.openai.com/v1/chat/completions
                </div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">准备订单（填写信息）</div>
                <div class="step-code">
                  Authorization: Bearer 你的API密钥<br />
                  Content-Type: application/json
                </div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">下单（发送请求）</div>
                <div class="step-code">
                  {<br />
                  &nbsp;&nbsp;"model": "gpt-4",<br />
                  &nbsp;&nbsp;"messages": [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "role": "system", "content":
                  "你是营销文案专家" },<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "role": "user", "content":
                  "写智能手表文案" }<br />
                  &nbsp;&nbsp;]<br />
                  }
                </div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <div class="step-title">等待配送（解析响应）</div>
                <div class="step-code">
                  response.choices[0].message.content<br />
                  <span class="step-hint">⚠️ 需要自己处理解析错误</span>
                </div>
              </div>
            </div>
          </div>

          <div class="summary">
            <p><strong>💡 HTTP API 特点：</strong></p>
            <ul>
              <li>✅ 灵活：任何语言都能用</li>
              <li>❌ 复杂：要手动处理很多细节</li>
              <li>❌ 容易出错：鉴权、数据格式、错误处理都要自己写</li>
            </ul>
          </div>
        </div>

        <!-- SDK 模式 -->
        <div v-else class="mode-details">
          <div class="steps">
            <div class="step" :class="{ active: currentStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="step-title">走进餐厅（安装 SDK）</div>
                <div class="step-code">import OpenAI from 'openai'</div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">找服务员（初始化客户端）</div>
                <div class="step-code">
                  const client = new OpenAI({<br />
                  &nbsp;&nbsp;apiKey: '你的密钥'<br />
                  })
                </div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">直接点菜（调用函数）</div>
                <div class="step-code">
                  const response = await client.chat.completions.create({<br />
                  &nbsp;&nbsp;model: 'gpt-4',<br />
                  &nbsp;&nbsp;messages: [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{ role: 'system', content:
                  '你是营销文案专家' },<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{ role: 'user', content:
                  '写智能手表文案' }<br />
                  &nbsp;&nbsp;]<br />
                  })
                </div>
              </div>
            </div>

            <div class="step" :class="{ active: currentStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <div class="step-title">享用美食（直接使用）</div>
                <div class="step-code">
                  console.log(response.choices[0].message.content)<br />
                  <span class="step-hint">✅ SDK 帮你处理好了所有细节</span>
                </div>
              </div>
            </div>
          </div>

          <div class="summary">
            <p><strong>💡 SDK 特点：</strong></p>
            <ul>
              <li>✅ 简单：只管调用函数</li>
              <li>✅ 省心：SDK 自动处理鉴权、错误、数据格式</li>
              <li>❌ 限制：通常只能在特定语言使用</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="action">
        <button class="run-btn" :disabled="running" @click="runDemo">
          {{ running ? '调用中...' : '🚀 开始调用 AI' }}
        </button>

        <div class="result" v-if="result">
          <div class="result-header">
            {{ mode === 'http' ? '🌐 HTTP API 返回' : '📦 SDK 返回' }}
          </div>
          <div class="result-body">
            "这款智能手表，是你的贴身健康管家。全天候心率监测，运动模式自动识别..."
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('http')
const currentStep = ref(0)
const running = ref(false)
const result = ref(null)

async function runDemo() {
  running.value = true
  result.value = null
  currentStep.value = 0

  // 模拟逐步执行
  for (let i = 1; i <= 4; i++) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    currentStep.value = i
  }

  await new Promise((resolve) => setTimeout(resolve, 400))
  result.value = true
  running.value = false
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.scenario {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.scenario-icon {
  font-size: 24px;
}

.scenario-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scenario-body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  padding-left: 32px;
}

.modes {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.mode-tabs {
  display: flex;
  border-bottom: 2px solid var(--vp-c-divider);
}

.tab {
  flex: 1;
  padding: 14px 20px;
  border: none;
  background: var(--vp-c-bg-soft);
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab:hover {
  background: var(--vp-c-bg);
}

.tab.active {
  background: var(--vp-c-bg);
  border-bottom-color: var(--vp-c-brand-1);
}

.mode-content {
  padding: 20px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.step {
  display: flex;
  gap: 16px;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
}

.step-number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--vp-c-text-1);
}

.step-code {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  line-height: 1.6;
  position: relative;
}

.step-hint {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 4px;
}

.step.active .step-hint {
  background: rgba(255, 255, 255, 0.1);
}

.summary {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.8;
}

.summary p {
  margin-bottom: 8px;
}

.summary ul {
  margin: 0;
  padding-left: 20px;
}

.summary li {
  margin: 4px 0;
}

.action {
  padding: 20px;
  border-top: 2px solid var(--vp-c-divider);
}

.run-btn {
  width: 100%;
  padding: 14px 24px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.02);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  margin-top: 16px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.result-body {
  background: #f0fdf4;
  border: 2px solid #86efac;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #166534;
}
</style>
