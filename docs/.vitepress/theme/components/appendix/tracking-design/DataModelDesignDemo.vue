<!--
  DataModelDesignDemo.vue
  数据模型设计 - 事件、用户、会话模型
-->
<template>
  <div class="data-model-design-demo">
    <div class="header">
      <div class="title">数据模型设计</div>
      <div class="subtitle">埋点数据的核心三要素：事件、用户、会话</div>
    </div>

    <div class="model-tabs">
      <button
        v-for="model in models"
        :key="model.id"
        class="model-tab"
        :class="{ active: selectedModel === model.id }"
        @click="selectModel(model.id)"
      >
        {{ model.name }}
      </button>
    </div>

    <div class="model-content">
      <!-- 事件模型 -->
      <div v-if="selectedModel === 'event'" class="model-detail">
        <div class="model-intro">
          <div class="intro-icon">📊</div>
          <div class="intro-text">
            <div class="intro-title">事件模型 (Event Model)</div>
            <div class="intro-desc">
              一个事件 = 用户的一次行为动作，是埋点系统中最基本的数据单元
            </div>
          </div>
        </div>

        <div class="event-naming">
          <div class="section-title">命名规范</div>
          <div class="naming-rules">
            <div class="rule-item good">
              <div class="rule-label">✅ 好的命名</div>
              <div class="rule-examples">
                <code>click_button</code>
                <code>view_page</code>
                <code>add_to_cart</code>
                <code>submit_form</code>
              </div>
            </div>
            <div class="rule-item bad">
              <div class="rule-label">❌ 不好的命名</div>
              <div class="rule-examples">
                <code>button_click</code>
                <code>page_view</code>
                <code>cart_add</code>
                <code>form_submit</code>
              </div>
            </div>
          </div>
          <div class="naming-tip">💡 原则：动词在前，名词在后，简洁明确</div>
        </div>

        <div class="event-structure">
          <div class="section-title">事件数据结构</div>
          <div class="code-example">
            <pre><code>{
  <span class="key">"event"</span>: <span class="string">"click_button"</span>,
  <span class="key">"timestamp"</span>: <span class="number">1704067200000</span>,

  <span class="comment">// 公共属性 (SDK 自动采集)</span>
  <span class="key">"common"</span>: {
    <span class="key">"platform"</span>: <span class="string">"iOS"</span>,
    <span class="key">"app_version"</span>: <span class="string">"1.2.3"</span>,
    <span class="key">"device_id"</span>: <span class="string">"device_123"</span>,
    <span class="key">"network"</span>: <span class="string">"WiFi"</span>
  },

  <span class="comment">// 自定义属性 (业务数据)</span>
  <span class="key">"properties"</span>: {
    <span class="key">"button_name"</span>: <span class="string">"立即购买"</span>,
    <span class="key">"page"</span>: <span class="string">"商品详情页"</span>,
    <span class="key">"product_id"</span>: <span class="string">"prod_98765"</span>,
    <span class="key">"price"</span>: <span class="number">299.00</span>
  }
}</code></pre>
          </div>
        </div>

        <div class="event-best-practices">
          <div class="section-title">最佳实践</div>
          <div class="practices-grid">
            <div class="practice-item">
              <div class="practice-icon">🎯</div>
              <div class="practice-content">
                <div class="practice-title">明确事件目标</div>
                <div class="practice-desc">
                  每个事件都应有明确的业务分析目标
                </div>
              </div>
            </div>
            <div class="practice-item">
              <div class="practice-icon">📝</div>
              <div class="practice-content">
                <div class="practice-title">属性完整丰富</div>
                <div class="practice-desc">包含所有可能影响业务决策的维度</div>
              </div>
            </div>
            <div class="practice-item">
              <div class="practice-icon">🔄</div>
              <div class="practice-content">
                <div class="practice-title">保持命名一致</div>
                <div class="practice-desc">同一类型事件使用统一的命名规范</div>
              </div>
            </div>
            <div class="practice-item">
              <div class="practice-icon">🚫</div>
              <div class="practice-content">
                <div class="practice-title">避免过度采集</div>
                <div class="practice-desc">只采集必要数据，减少隐私风险</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户模型 -->
      <div v-if="selectedModel === 'user'" class="model-detail">
        <div class="model-intro">
          <div class="intro-icon">👤</div>
          <div class="intro-text">
            <div class="intro-title">用户模型 (User Model)</div>
            <div class="intro-desc">
              跨设备关联用户身份，实现用户全生命周期管理
            </div>
          </div>
        </div>

        <div class="user-identity">
          <div class="section-title">身份识别体系</div>
          <div class="identity-types">
            <div class="identity-card primary">
              <div class="identity-header">
                <div class="identity-icon">🆔</div>
                <div class="identity-name">user_id</div>
              </div>
              <div class="identity-info">
                <div class="info-row">
                  <span class="label">稳定性：</span>
                  <span class="value high">极高</span>
                </div>
                <div class="info-row">
                  <span class="label">来源：</span>
                  <span class="value">后端分配</span>
                </div>
                <div class="info-row">
                  <span class="label">用途：</span>
                  <span class="value">跨设备关联</span>
                </div>
              </div>
            </div>

            <div class="identity-card secondary">
              <div class="identity-header">
                <div class="identity-icon">📱</div>
                <div class="identity-name">device_id</div>
              </div>
              <div class="identity-info">
                <div class="info-row">
                  <span class="label">稳定性：</span>
                  <span class="value medium">高</span>
                </div>
                <div class="info-row">
                  <span class="label">来源：</span>
                  <span class="value">设备指纹</span>
                </div>
                <div class="info-row">
                  <span class="label">用途：</span>
                  <span class="value">匿名用户分析</span>
                </div>
              </div>
            </div>

            <div class="identity-card tertiary">
              <div class="identity-header">
                <div class="identity-icon">🌐</div>
                <div class="identity-name">session_id</div>
              </div>
              <div class="identity-info">
                <div class="info-row">
                  <span class="label">稳定性：</span>
                  <span class="value low">低</span>
                </div>
                <div class="info-row">
                  <span class="label">来源：</span>
                  <span class="value">会话生成</span>
                </div>
                <div class="info-row">
                  <span class="label">用途：</span>
                  <span class="value">单次会话分析</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="id-mapping">
          <div class="section-title">ID Mapping（身份打通）</div>
          <div class="mapping-flow">
            <div class="mapping-step">
              <div class="step-title">注册前（匿名）</div>
              <div class="step-code">
                <code>device_id: "device_123"</code><br />
                <code>user_id: null</code>
              </div>
            </div>
            <div class="mapping-arrow">→</div>
            <div class="mapping-step">
              <div class="step-title">注册后（登录）</div>
              <div class="step-code">
                <code>device_id: "device_123"</code><br />
                <code>user_id: "user_456"</code>
              </div>
            </div>
            <div class="mapping-arrow">→</div>
            <div class="mapping-step">
              <div class="step-title">数据分析</div>
              <div class="step-desc">
                通过 device_id 关联<br />
                用户注册前后行为
              </div>
            </div>
          </div>
        </div>

        <div class="user-profile">
          <div class="section-title">用户画像维度</div>
          <div class="profile-dimensions">
            <div class="dimension-group">
              <div class="group-title">基础属性</div>
              <div class="dimension-list">
                <span class="dimension-tag">性别</span>
                <span class="dimension-tag">年龄</span>
                <span class="dimension-tag">地域</span>
                <span class="dimension-tag">语言</span>
              </div>
            </div>
            <div class="dimension-group">
              <div class="group-title">行为特征</div>
              <div class="dimension-list">
                <span class="dimension-tag">活跃度</span>
                <span class="dimension-tag">偏好</span>
                <span class="dimension-tag">购买力</span>
                <span class="dimension-tag">生命周期</span>
              </div>
            </div>
            <div class="dimension-group">
              <div class="group-title">设备信息</div>
              <div class="dimension-list">
                <span class="dimension-tag">平台</span>
                <span class="dimension-tag">操作系统</span>
                <span class="dimension-tag">分辨率</span>
                <span class="dimension-tag">运营商</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 会话模型 -->
      <div v-if="selectedModel === 'session'" class="model-detail">
        <div class="model-intro">
          <div class="intro-icon">⏱️</div>
          <div class="intro-text">
            <div class="intro-title">会话模型 (Session Model)</div>
            <div class="intro-desc">
              用户一次连续的使用过程，用于分析用户粘性和转化
            </div>
          </div>
        </div>

        <div class="session-definition">
          <div class="section-title">会话定义</div>
          <div class="session-rules">
            <div class="rule-card web">
              <div class="rule-icon">🌐</div>
              <div class="rule-content">
                <div class="rule-title">Web 会话</div>
                <div class="rule-desc">连续浏览，无操作超过 30 分钟则结束</div>
              </div>
            </div>
            <div class="rule-card app">
              <div class="rule-icon">📱</div>
              <div class="rule-content">
                <div class="rule-title">App 会话</div>
                <div class="rule-desc">
                  App 从后台回到前台，超过 5 分钟则新会话
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="session-metrics">
          <div class="section-title">会话关键指标</div>
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon">📊</div>
              <div class="metric-name">会话时长</div>
              <div class="metric-value">8m 32s</div>
              <div class="metric-desc">用户平均使用时长</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon">📄</div>
              <div class="metric-name">会话深度</div>
              <div class="metric-value">12.5</div>
              <div class="metric-desc">平均浏览页面数</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon">🔄</div>
              <div class="metric-name">会话频率</div>
              <div class="metric-value">3.2/天</div>
              <div class="metric-desc">日均打开次数</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon">💼</div>
              <div class="metric-name">跳出率</div>
              <div class="metric-value">35.2%</div>
              <div class="metric-desc">单页面跳出比例</div>
            </div>
          </div>
        </div>

        <div class="session-use-cases">
          <div class="section-title">典型应用场景</div>
          <div class="use-case-list">
            <div class="use-case-item">
              <div class="use-case-number">1</div>
              <div class="use-case-content">
                <div class="use-case-title">转化漏斗分析</div>
                <div class="use-case-desc">
                  分析用户从进入到完成目标的转化路径，识别流失环节
                </div>
              </div>
            </div>
            <div class="use-case-item">
              <div class="use-case-number">2</div>
              <div class="use-case-content">
                <div class="use-case-title">用户粘性分析</div>
                <div class="use-case-desc">
                  通过会话时长和频次，评估产品吸引力和用户忠诚度
                </div>
              </div>
            </div>
            <div class="use-case-item">
              <div class="use-case-number">3</div>
              <div class="use-case-content">
                <div class="use-case-title">用户分群</div>
                <div class="use-case-desc">
                  基于会话行为特征，将用户分为高价值、流失风险等群体
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedModel = ref('event')

const models = [
  { id: 'event', name: '事件模型' },
  { id: 'user', name: '用户模型' },
  { id: 'session', name: '会话模型' }
]

const selectModel = (modelId) => {
  selectedModel.value = modelId
}
</script>

<style scoped>
.data-model-design-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.model-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.model-tab {
  padding: 0.75rem 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--vp-c-text-1);
}

.model-tab:hover {
  border-color: var(--vp-c-brand);
}

.model-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.model-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.model-intro {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.intro-icon {
  font-size: 3rem;
}

.intro-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.intro-desc {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

/* 事件模型样式 */
.event-naming {
  margin-bottom: 2rem;
}

.naming-rules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.rule-item {
  padding: 1rem;
  border-radius: 10px;
}

.rule-item.good {
  background: #dcfce7;
  border: 2px solid #22c55e;
}

.rule-item.bad {
  background: #fee2e2;
  border: 2px solid #ef4444;
}

.rule-label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.rule-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rule-examples code {
  padding: 0.25rem 0.75rem;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

.naming-tip {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.event-structure {
  margin-bottom: 2rem;
}

.code-example {
  background: #1e1e1e;
  border-radius: 10px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.8;
}

.key {
  color: #9cdcfe;
}

.string {
  color: #ce9178;
}

.number {
  color: #b5cea8;
}

.comment {
  color: #6a9955;
  font-style: italic;
}

.event-best-practices {
  margin-bottom: 1rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.practice-icon {
  font-size: 1.5rem;
}

.practice-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.practice-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 用户模型样式 */
.user-identity {
  margin-bottom: 2rem;
}

.identity-types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.identity-card {
  padding: 1.25rem;
  border-radius: 12px;
  border: 2px solid;
}

.identity-card.primary {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-color: #3b82f6;
}

.identity-card.secondary {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: #f59e0b;
}

.identity-card.tertiary {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-color: #22c55e;
}

.identity-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.identity-icon {
  font-size: 2rem;
}

.identity-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.identity-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  font-size: 0.85rem;
}

.info-row .label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.value.high {
  color: #22c55e;
  font-weight: 600;
}

.value.medium {
  color: #f59e0b;
  font-weight: 600;
}

.value.low {
  color: #ef4444;
  font-weight: 600;
}

.id-mapping {
  margin-bottom: 2rem;
}

.mapping-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mapping-step {
  flex: 1;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  text-align: center;
}

.step-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.step-code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.mapping-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.user-profile {
  margin-bottom: 1rem;
}

.profile-dimensions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dimension-group {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 10px;
}

.group-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.dimension-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dimension-tag {
  padding: 0.25rem 0.75rem;
  background: white;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 会话模型样式 */
.session-definition {
  margin-bottom: 2rem;
}

.session-rules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.rule-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 10px;
  border: 2px solid;
}

.rule-card.web {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  border-color: #6366f1;
}

.rule-card.app {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  border-color: #ec4899;
}

.rule-icon {
  font-size: 2.5rem;
}

.rule-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.rule-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.session-metrics {
  margin-bottom: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.metric-card {
  text-align: center;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.metric-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.metric-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.metric-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.session-use-cases {
  margin-bottom: 1rem;
}

.use-case-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.use-case-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.use-case-number {
  width: 36px;
  height: 36px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.use-case-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.use-case-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .naming-rules,
  .practices-grid,
  .identity-types,
  .mapping-flow,
  .session-rules,
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .mapping-flow {
    flex-direction: column;
  }
}
</style>
