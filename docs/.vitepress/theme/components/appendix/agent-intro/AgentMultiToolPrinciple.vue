<template>
  <div class="multi-tool-principle">
    <div class="header">
      <div class="title">🔧 多工具调用原理：Agent 如何"串联"工具完成任务</div>
      <div class="subtitle">理解 Agent 的链式思考(Chain-of-Thought)和工具编排机制</div>
    </div>

    <!-- 场景选择 -->
    <div class="scenario-tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['tab-btn', { active: currentScenario === s.id }]"
        @click="selectScenario(s.id)"
      >
        <span>{{ s.icon }}</span>
        <span>{{ s.name }}</span>
      </button>
    </div>

    <!-- 用户意图 -->
    <div class="intent-box">
      <div class="intent-label">👤 用户意图</div>
      <div class="intent-text">{{ currentData.intent }}</div>
    </div>

    <!-- 执行流程可视化 -->
    <div class="execution-flow">
      <div class="flow-title">🔄 工具调用执行流程</div>
      
      <!-- 思考阶段 -->
      <div class="phase thinking-phase" :class="{ active: currentPhase >= 0 }">
        <div class="phase-header">
          <span class="phase-icon">🧠</span>
          <span class="phase-name">思考规划</span>
          <span class="phase-status">{{ currentPhase > 0 ? '✅ 完成' : currentPhase === 0 ? '🔄 进行中' : '⏳ 等待' }}</span>
        </div>
        <div v-if="currentPhase >= 0" class="phase-content">
          <div class="thought-steps">
            <div v-for="(step, idx) in currentData.planningSteps" :key="idx" class="thought-step">
              <span class="step-num">{{ idx + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具执行阶段 -->
      <div class="phase tools-phase" :class="{ active: currentPhase >= 1 }">
        <div class="phase-header">
          <span class="phase-icon">🔧</span>
          <span class="phase-name">工具执行</span>
          <span class="phase-status">{{ currentPhase > 1 ? '✅ 完成' : currentPhase === 1 ? '🔄 进行中' : '⏳ 等待' }}</span>
        </div>
        <div v-if="currentPhase >= 1" class="phase-content">
          <div class="tools-chain">
            <div 
              v-for="(tool, idx) in currentData.tools" 
              :key="idx"
              class="tool-node"
              :class="{ 
                completed: currentTool > idx, 
                executing: currentTool === idx,
                pending: currentTool < idx 
              }"
            >
              <div class="node-connector" v-if="idx > 0">
                <div class="connector-line" :class="{ active: currentTool >= idx }"></div>
              </div>
              <div class="node-content">
                <div class="node-icon">{{ tool.icon }}</div>
                <div class="node-name">{{ tool.name }}</div>
                <div class="node-status">
                  <span v-if="currentTool > idx" class="status-done">✓</span>
                  <span v-else-if="currentTool === idx" class="status-running">
                    <span class="pulse"></span>
                  </span>
                  <span v-else class="status-wait">○</span>
                </div>
              </div>
              
              <!-- 工具详情 -->
              <div v-if="currentTool >= idx" class="tool-detail-popup">
                <div class="detail-row">
                  <span class="detail-label">输入:</span>
                  <code class="detail-code">{{ tool.input }}</code>
                </div>
                <div v-if="currentTool > idx" class="detail-row">
                  <span class="detail-label">输出:</span>
                  <span class="detail-output">{{ truncate(tool.output, 50) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 数据流转示意 -->
          <div v-if="currentPhase === 1" class="data-flow-hint">
            <div class="flow-arrow">⬇️ 数据在工具间流转，上一步的输出成为下一步的输入</div>
          </div>
        </div>
      </div>

      <!-- 结果整合阶段 -->
      <div class="phase result-phase" :class="{ active: currentPhase >= 2 }">
        <div class="phase-header">
          <span class="phase-icon">📝</span>
          <span class="phase-name">结果整合</span>
          <span class="phase-status">{{ currentPhase > 2 ? '✅ 完成' : currentPhase === 2 ? '🔄 进行中' : '⏳ 等待' }}</span>
        </div>
        <div v-if="currentPhase >= 2" class="phase-content">
          <div class="integration-steps">
            <div class="integration-step" :class="{ done: integrationStep >= 0 }">
              <span class="check">{{ integrationStep >= 0 ? '✓' : '○' }}</span>
              <span>收集所有工具输出</span>
            </div>
            <div class="integration-step" :class="{ done: integrationStep >= 1 }">
              <span class="check">{{ integrationStep >= 1 ? '✓' : '○' }}</span>
              <span>去重与验证</span>
            </div>
            <div class="integration-step" :class="{ done: integrationStep >= 2 }">
              <span class="check">{{ integrationStep >= 2 ? '✓' : '○' }}</span>
              <span>结构化整理</span>
            </div>
            <div class="integration-step" :class="{ done: integrationStep >= 3 }">
              <span class="check">{{ integrationStep >= 3 ? '✓' : '○' }}</span>
              <span>生成自然语言回复</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最终输出 -->
      <div class="phase output-phase" :class="{ active: currentPhase >= 3 }">
        <div class="phase-header">
          <span class="phase-icon">💬</span>
          <span class="phase-name">最终输出</span>
          <span class="phase-status">{{ currentPhase >= 3 ? '✅ 完成' : '⏳ 等待' }}</span>
        </div>
        <div v-if="currentPhase >= 3" class="phase-content">
          <div class="final-output">
            <div class="output-bubble">{{ currentData.finalOutput }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button v-if="!isRunning && currentPhase === -1" class="control-btn primary" @click="startDemo">
        ▶ 开始演示
      </button>
      <button v-else-if="isRunning" class="control-btn" disabled>
        ⏳ 执行中...
      </button>
      <button v-else class="control-btn secondary" @click="reset">
        🔄 重新演示
      </button>
    </div>

    <!-- 原理说明 -->
    <div class="principle-explanation">
      <div class="explanation-title">📚 核心原理</div>
      <div class="explanation-grid">
        <div class="explanation-card">
          <div class="card-icon">🧩</div>
          <div class="card-title">任务分解</div>
          <div class="card-desc">Agent 将复杂任务拆解为多个子任务，每个子任务对应一个工具调用</div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">🔗</div>
          <div class="card-title">链式调用</div>
          <div class="card-desc">工具按依赖关系串联执行，前一个工具的输出成为后一个工具的输入</div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">🔄</div>
          <div class="card-title">动态调整</div>
          <div class="card-desc">根据中间结果，Agent 可以动态决定下一步调用哪个工具</div>
        </div>
        <div class="explanation-card">
          <div class="card-icon">🎯</div>
          <div class="card-title">结果整合</div>
          <div class="card-desc">将所有工具输出整合为连贯、有用的最终回复</div>
        </div>
      </div>
    </div>

    <!-- 与 LLM 对比 -->
    <div class="comparison-section">
      <div class="comparison-title">⚖️ 为什么需要多工具调用？</div>
      <div class="comparison-table">
        <div class="comparison-row header">
          <div class="col scenario">场景</div>
          <div class="col llm">普通 LLM</div>
          <div class="col agent">Agent + 多工具</div>
        </div>
        <div v-for="(item, idx) in comparisons" :key="idx" class="comparison-row">
          <div class="col scenario">{{ item.scenario }}</div>
          <div class="col llm">{{ item.llm }}</div>
          <div class="col agent">{{ item.agent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scenarios = [
  {
    id: 'travel',
    icon: '✈️',
    name: '旅行规划',
    intent: '规划一个3天2晚的东京旅行，预算1万元',
    planningSteps: [
      '分析需求：东京、3天2晚、预算1万',
      '确定需要查询：机票、酒店、景点、路线、预算',
      '规划工具调用顺序：机票→酒店→景点→路线→预算汇总'
    ],
    tools: [
      { icon: '✈️', name: '查机票', input: '{from:上海, to:东京, date:3.15}', output: '往返¥3,200' },
      { icon: '🏨', name: '查酒店', input: '{city:东京, nights:2, budget:3000}', output: '新宿酒店¥1,200/晚' },
      { icon: '📍', name: '查景点', input: '{city:东京, days:3}', output: '推荐5个景点' },
      { icon: '🗺️', name: '规划路线', input: '{spots:[...], days:3}', output: '3天路线规划' },
      { icon: '💰', name: '算预算', input: '{items:[...]}', output: '总计¥8,400' }
    ],
    finalOutput: '✈️ 东京3天2晚行程已规划好！\n• 机票：¥3,200\n• 酒店：¥2,400\n• 餐饮交通：¥2,000\n• 门票购物：¥1,000\n• 总计：¥8,400（剩余¥1,600）'
  },
  {
    id: 'research',
    icon: '📊',
    name: '行业研究',
    intent: '生成2024年新能源汽车行业分析报告',
    planningSteps: [
      '分析需求：行业报告需要市场数据、厂商信息、技术趋势、政策',
      '确定数据来源：市场数据库、公司信息、技术文献、政策文件',
      '规划工具调用：市场数据→厂商排名→技术趋势→政策→可视化→报告生成'
    ],
    tools: [
      { icon: '📈', name: '市场数据', input: '{industry:NEV, year:2024}', output: '销量1700万辆，+35%' },
      { icon: '🏢', name: '厂商信息', input: '{industry:NEV, top:10}', output: '比亚迪302万，特斯拉181万...' },
      { icon: '🔋', name: '技术趋势', input: '{field:NEV, tech:[电池,智驾]}', output: '固态电池、L2+智驾普及' },
      { icon: '📋', name: '政策查询', input: '{region:全球, topic:NEV}', output: '中国减免购置税至2027' },
      { icon: '📊', name: '数据可视化', input: '{type:饼图, data:市场份额}', output: '生成6个图表' },
      { icon: '📝', name: '报告生成', input: '{sections:[...]}', output: '12页完整报告' }
    ],
    finalOutput: '📊 2024新能源汽车行业分析报告已完成！\n• 全球销量1700万辆（+35%）\n• 比亚迪领先（302万辆）\n• 技术趋势：固态电池、800V快充\n• 完整报告：12页，6个图表'
  },
  {
    id: 'shopping',
    icon: '🛒',
    name: '智能购物',
    intent: '买5000元笔记本，编程+轻度游戏',
    planningSteps: [
      '分析需求：5000元、编程、轻度游戏',
      '确定评估维度：机型、规格、价格、评价、性能跑分',
      '规划工具调用：搜索→查规格→比价格→看评价→跑分对比'
    ],
    tools: [
      { icon: '🔍', name: '搜索机型', input: '{category:笔记本, budget:5000}', output: '找到6款候选机型' },
      { icon: '⚙️', name: '查规格', input: '{products:[...]}', output: 'CPU/内存/屏幕参数' },
      { icon: '💰', name: '比价格', input: '{products:[...]}', output: '价格对比表' },
      { icon: '⭐', name: '看评价', input: '{products:[...], source:电商}', output: '好评率96% vs 94%' },
      { icon: '📊', name: '跑分对比', input: '{products:[...], tests:[CPU,GPU]}', output: 'R7>i5，续航8h vs 6.5h' }
    ],
    finalOutput: '💻 笔记本推荐结果\n🥇 首选：联想小新Pro16（¥4,999）\n• R7-7840HS/16G/1TB/2.5K\n• 性能强、屏幕好、存储大\n\n🥈 备选：ThinkBook14+（¥5,299）\n• 做工好、续航长、接口全'
  }
]

const comparisons = [
  { scenario: '查天气+穿衣建议', llm: '只能推测，无法获取实时数据', agent: '调用天气API获取实时数据，再给出穿衣建议' },
  { scenario: '股票分析', llm: '无法获取股价，只能泛泛而谈', agent: '股价+新闻+技术分析，三个工具串联完成深度分析' },
  { scenario: '旅行规划', llm: '只能给建议，无法查询实时价格', agent: '机票+酒店+景点+路线+预算，5个工具完成完整规划' },
  { scenario: '数据分析', llm: '无法访问数据，只能讲分析方法', agent: '查询+分组+计算+可视化，6个工具完成完整分析' }
]

const currentScenario = ref('travel')
const currentPhase = ref(-1)
const currentTool = ref(-1)
const integrationStep = ref(-1)
const isRunning = ref(false)

const currentData = computed(() => scenarios.find(s => s.id === currentScenario.value))

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const startDemo = async () => {
  isRunning.value = true
  currentPhase.value = 0
  currentTool.value = -1
  integrationStep.value = -1

  // 思考阶段
  await wait(1500)

  // 工具执行阶段
  currentPhase.value = 1
  const tools = currentData.value.tools

  for (let i = 0; i < tools.length; i++) {
    currentTool.value = i
    await wait(1200)
  }
  currentTool.value = tools.length

  await wait(500)

  // 结果整合阶段
  currentPhase.value = 2
  for (let i = 0; i < 4; i++) {
    integrationStep.value = i
    await wait(600)
  }

  // 最终输出
  await wait(300)
  currentPhase.value = 3

  isRunning.value = false
}

const reset = () => {
  currentPhase.value = -1
  currentTool.value = -1
  integrationStep.value = -1
  isRunning.value = false
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
const truncate = (str, len) => str.length > len ? str.slice(0, len) + '...' : str
</script>

<style scoped>
.multi-tool-principle {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 场景标签 */
.scenario-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

/* 用户意图 */
.intent-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
}

.intent-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.intent-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

/* 执行流程 */
.execution-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

/* 阶段 */
.phase {
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  opacity: 0.5;
  transition: all 0.3s;
}

.phase.active {
  opacity: 1;
  border-color: var(--vp-c-brand);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.phase-icon {
  font-size: 16px;
}

.phase-name {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
}

.phase-status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg);
}

.phase-content {
  padding: 14px;
}

/* 思考步骤 */
.thought-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thought-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background: #fef3c7;
  border-radius: 6px;
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  font-size: 12px;
  color: #92400e;
  line-height: 1.5;
}

/* 工具链 */
.tools-chain {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tool-node {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s;
  position: relative;
}

.tool-node.completed {
  border-color: #86efac;
  background: #f0fdf4;
}

.tool-node.executing {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tool-node.pending {
  opacity: 0.5;
}

.node-connector {
  position: absolute;
  left: 24px;
  top: -14px;
  width: 2px;
  height: 14px;
}

.connector-line {
  width: 100%;
  height: 100%;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.connector-line.active {
  background: var(--vp-c-brand);
}

.node-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.node-icon {
  font-size: 20px;
}

.node-name {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
}

.node-status {
  font-size: 14px;
}

.status-done {
  color: #16a34a;
}

.status-running .pulse {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.status-wait {
  color: var(--vp-c-text-3);
}

/* 工具详情 */
.tool-detail-popup {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 11px;
}

.detail-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.detail-code {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.detail-output {
  color: #16a34a;
}

.data-flow-hint {
  text-align: center;
  margin-top: 12px;
  padding: 10px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  font-size: 12px;
  color: var(--vp-c-brand-dark);
}

/* 整合步骤 */
.integration-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.integration-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.3s;
}

.integration-step.done {
  background: #dcfce7;
  color: #166534;
}

.check {
  font-weight: 600;
}

/* 最终输出 */
.final-output {
  padding: 12px;
  background: #dcfce7;
  border-radius: 8px;
}

.output-bubble {
  font-size: 13px;
  color: #166534;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.control-btn {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.control-btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.control-btn.primary:hover {
  background: var(--vp-c-brand-dark);
}

.control-btn.secondary {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.control-btn.secondary:hover {
  background: var(--vp-c-bg-alt);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 原理解释 */
.principle-explanation {
  margin-bottom: 20px;
}

.explanation-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .explanation-grid {
    grid-template-columns: 1fr;
  }
}

.explanation-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  text-align: center;
}

.card-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 对比表格 */
.comparison-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
}

.comparison-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.comparison-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.comparison-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  gap: 12px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  font-size: 12px;
  align-items: center;
}

.comparison-row.header {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.col.scenario {
  font-weight: 500;
}

.col.llm {
  color: #6b7280;
}

.col.agent {
  color: var(--vp-c-brand-dark);
}
</style>
