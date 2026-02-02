<template>
  <div class="agent-chat-demo">
    <div class="header">
      <div class="title">🤖 Agent 初体验：从"能说"到"能做"</div>
      <div class="subtitle">体验 Agent 如何自动调用工具完成任务</div>
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

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <!-- 用户消息 -->
      <div class="message user">
        <div class="avatar">👤</div>
        <div class="bubble">{{ currentScenarioData.query }}</div>
      </div>

      <!-- LLM 回复（对比） -->
      <div class="message llm">
        <div class="avatar">🤖</div>
        <div class="bubble llm-bubble">
          <div class="llm-label">普通 LLM</div>
          <div class="llm-content">{{ currentScenarioData.llmResponse }}</div>
        </div>
      </div>

      <!-- Agent 回复 -->
      <div class="message agent">
        <div class="avatar agent-avatar">🦾</div>
        <div class="bubble agent-bubble">
          <div class="agent-label">Agent 智能体</div>
          
          <!-- 思考过程（可折叠） -->
          <div v-if="showThinking" class="thinking-section">
            <div class="thinking-header" @click="toggleThinking">
              <span>🧠 思考过程</span>
              <span class="toggle-icon">{{ thinkingExpanded ? '▼' : '▶' }}</span>
            </div>
            <div v-if="thinkingExpanded" class="thinking-content">
              <div class="thought-item">{{ currentScenarioData.thinking }}</div>
            </div>
          </div>

          <!-- 工具调用（可折叠） -->
          <div v-if="showTools" ref="toolsSection" class="tools-section">
            <div class="tools-header" @click="toggleTools">
              <span>🔧 工具调用 ({{ currentScenarioData.tools.length }}个)</span>
              <span class="toggle-icon">{{ toolsExpanded ? '▼' : '▶' }}</span>
            </div>
            <div v-if="toolsExpanded" class="tools-list">
              <div 
                v-for="(tool, idx) in currentScenarioData.tools" 
                :key="idx"
                :ref="el => setToolRef(el, idx)"
                class="tool-item"
                :class="{ completed: toolExecuted > idx, executing: toolExecuting === idx }"
              >
                <div class="tool-status">
                  <span v-if="toolExecuted > idx">✅</span>
                  <span v-else-if="toolExecuting === idx" class="spinner">⏳</span>
                  <span v-else>⏸️</span>
                </div>
                <div class="tool-info">
                  <div class="tool-name">{{ tool.name }}</div>
                  <div v-if="toolExecuted > idx || toolExecuting === idx" class="tool-detail">
                    <code class="tool-params">{{ tool.params }}</code>
                    <div v-if="toolExecuted > idx" class="tool-result">{{ tool.result }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 最终回复 -->
          <div v-if="showResponse" class="final-response">
            <div class="response-header">💬 最终回复</div>
            <div class="response-content">{{ currentScenarioData.agentResponse }}</div>
          </div>

          <!-- 执行按钮 -->
          <button v-if="!isExecuting && !executionComplete" class="execute-btn" @click="startExecution">
            ▶ 让 Agent 执行
          </button>
          <button v-else-if="executionComplete" class="execute-btn reset" @click="reset">
            🔄 重置对话
          </button>
        </div>
      </div>
    </div>

    <!-- 核心区别 -->
    <div class="insight-bar">
      <span class="insight-label">💡 核心区别：</span>
      <span class="insight-text">{{ currentScenarioData.insight }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const scenarios = [
  {
    id: 'weather',
    icon: '🌤️',
    name: '查天气',
    query: '北京今天天气怎么样？适合穿什么衣服？',
    llmResponse: '我无法获取实时天气信息。北京一般在春季比较温和，建议穿薄外套。',
    thinking: '用户想知道北京今天的天气和穿衣建议。我需要：1) 查询实时天气 2) 根据温度给出穿衣建议',
    tools: [
      { name: 'weather_api', params: '{"city": "北京", "date": "today"}', result: '☀️ 晴，15-25°C，空气质量良' }
    ],
    agentResponse: '北京今天天气晴朗，15-25°C，空气质量良。建议穿薄外套或长袖T恤，早晚温差较大，可以带件薄外套。',
    insight: 'Agent 调用天气 API 获取实时数据，LLM 只能基于训练数据推测。'
  },
  {
    id: 'calculate',
    icon: '🧮',
    name: '复杂计算',
    query: '帮我算一下：如果贷款100万，年利率4.2%，30年等额本息，每月还多少？总利息多少？',
    llmResponse: '根据公式计算，月供大约5000元左右，总利息约80万。这只是估算，建议用专业计算器。',
    thinking: '这是房贷计算问题，需要用到等额本息公式。月供 = 贷款本金 × 月利率 × (1+月利率)^还款月数 / [(1+月利率)^还款月数 - 1]',
    tools: [
      { name: 'calculator', params: '{"principal": 1000000, "rate": 0.042, "years": 30}', result: '月供: ¥4,890.19, 总利息: ¥760,468.40' }
    ],
    agentResponse: '计算结果：\n• 每月还款：¥4,890.19\n• 还款总额：¥1,760,468.40\n• 总利息：¥760,468.40\n\n30年下来利息约占本金的76%。',
    insight: 'Agent 调用计算器确保 100% 准确，LLM 心算可能出错。'
  },
  {
    id: 'stock',
    icon: '📈',
    name: '股票分析',
    query: '分析一下特斯拉股票最近的表现，并预测明天走势',
    llmResponse: '我无法获取实时股票数据。特斯拉是知名电动车公司，股价波动较大，建议查看专业财经网站。',
    thinking: '用户需要特斯拉股票的近期表现分析和预测。我需要：1) 获取最新股价 2) 获取历史数据 3) 进行技术分析',
    tools: [
      { name: 'stock_api', params: '{"symbol": "TSLA", "period": "1mo"}', result: '当前价: $248.50, 月涨幅: +12.3%, 成交量: 1.2亿' },
      { name: 'news_search', params: '{"query": "Tesla stock news", "limit": 5}', result: '找到5条相关新闻：财报超预期、新车型发布...' },
      { name: 'technical_analysis', params: '{"data": "TSLA_price_data", "indicators": ["MA", "RSI"]}', result: 'RSI: 68(接近超买), MA20: $235, 趋势: 上升' }
    ],
    agentResponse: '特斯拉(TSLA)最近表现：\n📈 月涨幅 +12.3%，现报 $248.50\n📊 技术指标：RSI 68(接近超买)，站上20日均线\n📰 消息面：财报超预期、新车型发布利好\n\n预测：短期可能回调，中长期看好。',
    insight: 'Agent 串联多个工具（股价+新闻+技术分析）完成复杂分析任务。'
  },
  {
    id: 'travel',
    icon: '✈️',
    name: '旅行规划',
    query: '帮我规划一个3天2晚的东京旅行，预算1万人民币，包含机票、酒店、景点',
    llmResponse: '东京是个好地方！我可以给你一些建议：浅草寺、东京塔、银座购物区都很值得去。预算1万可能有点紧张，建议提前预订。',
    thinking: '用户需要完整的东京3天2晚旅行规划。我需要：1) 查询机票价格 2) 搜索酒店 3) 推荐景点 4) 规划路线 5) 计算总预算',
    tools: [
      { name: 'flight_search', params: '{"from": "上海", "to": "东京", "depart": "2024-03-15", "return": "2024-03-17"}', result: '往返机票: ¥3,200 (春秋航空)' },
      { name: 'hotel_search', params: '{"city": "东京", "checkin": "2024-03-15", "nights": 2, "budget": 3000}', result: '新宿华盛顿酒店: ¥1,200/晚, 评分4.5' },
      { name: 'attractions_search', params: '{"city": "东京", "days": 3}', result: '推荐景点: 浅草寺、东京塔、涩谷十字路口、明治神宫、秋叶原' },
      { name: 'route_planner', params: '{"spots": ["浅草寺", "东京塔", "涩谷", "秋叶原"], "days": 3}', result: 'Day1: 浅草寺→东京塔, Day2: 涩谷→明治神宫, Day3: 秋叶原→银座' },
      { name: 'budget_calculator', params: '{"flight": 3200, "hotel": 2400, "food": 1500, "transport": 500, "tickets": 800}', result: '总预算: ¥8,400 (剩余¥1,600用于购物)' }
    ],
    agentResponse: '✈️ 东京3天2晚行程规划\n\n📅 Day1: 浅草寺→东京塔\n📅 Day2: 涩谷→明治神宫\n📅 Day3: 秋叶原→银座\n\n💰 预算明细：\n• 往返机票: ¥3,200\n• 酒店2晚: ¥2,400\n• 餐饮: ¥1,500\n• 交通: ¥500\n• 门票: ¥800\n• 总计: ¥8,400 (剩余¥1,600购物)',
    insight: 'Agent 调用5个工具完成机票、酒店、景点、路线、预算的完整规划。'
  },
  {
    id: 'shopping',
    icon: '🛒',
    name: '智能购物',
    query: '我想买一台5000元左右的笔记本电脑，主要用于编程和轻度游戏，推荐几款并对比',
    llmResponse: '5000元预算可以买到不错的笔记本。推荐联想小新Pro、华为MateBook、小米RedmiBook。具体配置建议16GB内存、512GB SSD。',
    thinking: '用户需要5000元价位的编程+游戏笔记本推荐。我需要：1) 搜索当前热门机型 2) 获取详细规格参数 3) 查询实时价格 4) 查看用户评价 5) 进行性能对比',
    tools: [
      { name: 'product_search', params: '{"category": "laptop", "budget": 5000, "usage": "programming,gaming"}', result: '找到6款: 联想小新Pro16、ThinkBook14+、华为MateBook14、RedmiBook Pro15、荣耀MagicBook14、机械革命极光Pro' },
      { name: 'specs_query', params: '{"products": ["联想小新Pro16", "ThinkBook14+", "华为MateBook14"]}', result: '小新Pro16: R7-7840HS/16G/1TB/2.5K; ThinkBook14+: i5-13500H/16G/512G/2.8K; MateBook14: i5-1340P/16G/512G/2K触控' },
      { name: 'price_compare', params: '{"products": ["联想小新Pro16", "ThinkBook14+", "华为MateBook14"]}', result: '小新Pro16: ¥4,999; ThinkBook14+: ¥5,299; MateBook14: ¥5,499' },
      { name: 'reviews_search', params: '{"products": ["联想小新Pro16", "ThinkBook14+"], "source": "jd,tmall"}', result: '小新Pro16: 好评率96%,  praised for screen and performance; ThinkBook14+: 好评率94%, praised for build quality' },
      { name: 'benchmark_compare', params: '{"products": ["联想小新Pro16", "ThinkBook14+"], "tests": ["cpu", "gpu", "battery"]}', result: 'CPU: 小新Pro16(R7) > ThinkBook14+(i5); GPU: 两者均为核显; 续航: ThinkBook14+ 8h > 小新Pro16 6.5h' }
    ],
    agentResponse: '💻 5000元笔记本推荐对比\n\n🥇 首选: 联想小新Pro16\n• 配置: R7-7840HS/16G/1TB/2.5K 120Hz\n• 价格: ¥4,999\n• 优势: 性能强、屏幕好、存储大\n• 适合: 编程+轻度游戏\n\n🥈 备选: ThinkBook14+\n• 配置: i5-13500H/16G/512G/2.8K\n• 价格: ¥5,299\n• 优势: 做工好、续航长、接口全\n• 适合: 商务办公+编程',
    insight: 'Agent 调用5个工具完成搜索、查规格、比价格、看评价、跑分对比的完整购物决策。'
  },
  {
    id: 'report',
    icon: '📊',
    name: '研究报告',
    query: '帮我生成一份2024年新能源汽车行业分析报告，包含市场规模、主要玩家、技术趋势',
    llmResponse: '新能源汽车行业正在快速发展。特斯拉、比亚迪是行业领导者。市场规模预计持续增长，电池技术是关键。建议查阅专业行业报告获取详细数据。',
    thinking: '用户需要一份完整的新能源汽车行业分析报告。我需要：1) 查询最新市场数据 2) 搜索主要厂商信息 3) 获取技术发展趋势 4) 查找政策法规 5) 生成数据可视化 6) 整理成报告格式',
    tools: [
      { name: 'market_data', params: '{"industry": "NEV", "year": 2024, "metrics": ["size", "growth", "penetration"]}', result: '2024年全球NEV销量: 1,700万辆(+35%), 中国占比60%, 渗透率: 全球18%, 中国35%' },
      { name: 'company_search', params: '{"industry": "NEV", "ranking": "top10"}', result: 'TOP5: 比亚迪(302万辆)、特斯拉(181万辆)、大众(77万辆)、吉利(68万辆)、上汽(63万辆)' },
      { name: 'tech_trends', params: '{"field": "NEV", "technologies": ["battery", "autonomous", "charging"]}', result: '电池: 固态电池量产在即, 能量密度>400Wh/kg; 智驾: L2+普及率>50%, L4开始商用; 充电: 800V高压平台普及, 5分钟补能200km' },
      { name: 'policy_search', params: '{"region": "global", "topic": "NEV_policy", "year": 2024}', result: '中国: 购置税减免延续至2027年; 欧盟: 2035年禁售燃油车; 美国: IRA法案补贴本土化生产' },
      { name: 'data_visualization', params: '{"type": "chart", "data": "NEV_market_share", "chart_type": "pie"}', result: '生成市场份额饼图: 比亚迪35%, 特斯拉21%, 其他44%' },
      { name: 'report_generator', params: '{"title": "2024新能源汽车行业分析报告", "sections": ["market", "players", "tech", "policy"], "format": "markdown"}', result: '报告已生成: 12页, 包含6个图表, 3个数据表格' }
    ],
    agentResponse: '📊 2024新能源汽车行业分析报告\n\n📈 市场规模\n• 全球销量: 1,700万辆 (+35%)\n• 中国市场占比: 60%\n• 全球渗透率: 18% (中国35%)\n\n🏆 主要玩家\n1. 比亚迪: 302万辆 (35%)\n2. 特斯拉: 181万辆 (21%)\n3. 大众: 77万辆\n\n🔋 技术趋势\n• 固态电池能量密度>400Wh/kg\n• L2+智驾普及率超50%\n• 800V高压快充普及\n\n📋 报告已生成: 12页完整分析',
    insight: 'Agent 调用6个工具完成数据收集、分析、可视化和报告生成的完整研究流程。'
  },
  {
    id: 'code-run',
    icon: '💻',
    name: '代码执行',
    query: '生成一个1-100的随机数列表，找出其中的质数，并计算平均值',
    llmResponse: '我可以写出代码，但无法实际执行。质数是指只能被1和自身整除的数，比如2,3,5,7...',
    thinking: '用户需要：1) 生成随机数列表 2) 筛选质数 3) 计算平均值。我需要在沙箱中执行Python代码',
    tools: [
      { name: 'python_executor', params: '{"code": "import random; nums = [random.randint(1,100) for _ in range(20)]; primes = [n for n in nums if all(n%i!=0 for i in range(2,int(n**0.5)+1)) and n>1]; print(f\"随机数: {nums}\"); print(f\"质数: {primes}\"); print(f\"平均值: {sum(nums)/len(nums):.2f}\")"}', result: '随机数: [42, 17, 89, 23, 56, 71, 34, 91, 13, 67...]\n质数: [17, 89, 23, 71, 13, 67, 47, 79]\n平均值: 52.35' }
    ],
    agentResponse: '执行结果：\n🎲 生成20个随机数：42, 17, 89, 23, 56, 71...\n🔢 其中质数：17, 89, 23, 71, 13, 67, 47, 79 (共8个)\n📊 所有数平均值：52.35',
    insight: 'Agent 在沙箱中实际执行代码，LLM 只能推理无法验证结果。'
  },
  {
    id: 'data-analysis',
    icon: '📉',
    name: '数据分析',
    query: '分析一下我们公司上季度的销售数据，找出增长最快的产品线和地区',
    llmResponse: '我无法访问您公司的内部销售数据。建议您使用Excel或专业BI工具进行分析，关注同比和环比增长率。',
    thinking: '用户需要分析公司销售数据。我需要：1) 连接数据库获取销售数据 2) 按产品线分组统计 3) 按地区分组统计 4) 计算增长率 5) 生成可视化图表 6) 输出分析报告',
    tools: [
      { name: 'database_query', params: '{"table": "sales", "period": "Q4_2023", "fields": ["product", "region", "amount", "quantity"]}', result: '获取Q4销售记录: 15,230条, 涵盖12个产品线, 8个地区' },
      { name: 'data_groupby', params: '{"data": "sales_q4", "group": "product", "agg": ["sum", "count", "avg"]}', result: '产品线统计: 电子产品¥2.1M(+45%), 服装¥1.8M(+12%), 家居¥1.2M(+28%)...' },
      { name: 'data_groupby', params: '{"data": "sales_q4", "group": "region", "agg": ["sum", "growth"]}', result: '地区统计: 华东¥3.2M(+38%), 华南¥2.1M(+52%), 华北¥1.5M(+15%)...' },
      { name: 'growth_calculator', params: '{"current": "Q4_2023", "previous": "Q3_2023", "dimensions": ["product", "region"]}', result: '增长最快产品线: 电子产品+45%; 增长最快地区: 华南+52%' },
      { name: 'chart_generator', params: '{"type": "bar", "data": "product_growth", "title": "产品线增长率对比"}', result: '生成柱状图: 电子产品45%, 家居28%, 服装12%' },
      { name: 'chart_generator', params: '{"type": "map", "data": "region_sales", "title": "地区销售热力图"}', result: '生成中国地图热力图: 华东、华南为深色高值区' }
    ],
    agentResponse: '📊 Q4销售数据分析报告\n\n🏆 增长最快产品线\n1. 电子产品: +45% (¥2.1M)\n2. 家居用品: +28% (¥1.2M)\n3. 服装: +12% (¥1.8M)\n\n🌍 增长最快地区\n1. 华南: +52% (¥2.1M)\n2. 华东: +38% (¥3.2M)\n3. 西南: +22% (¥0.8M)\n\n💡 建议: 加大电子产品投入，重点拓展华南市场',
    insight: 'Agent 调用6个工具完成数据查询、分组统计、增长率计算、可视化的完整分析流程。'
  }
]

const currentScenario = ref('weather')
const isExecuting = ref(false)
const executionComplete = ref(false)
const toolExecuting = ref(-1)
const toolExecuted = ref(0)
const showThinking = ref(false)
const showTools = ref(false)
const showResponse = ref(false)
const thinkingExpanded = ref(true)
const toolsExpanded = ref(true)
const toolsSection = ref(null)
const toolRefs = ref([])

const currentScenarioData = computed(() => scenarios.find(s => s.id === currentScenario.value))

const setToolRef = (el, idx) => {
  if (el) {
    toolRefs.value[idx] = el
  }
}

const selectScenario = (id) => {
  currentScenario.value = id
  reset()
}

const startExecution = async () => {
  isExecuting.value = true
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = true
  showTools.value = false
  showResponse.value = false
  thinkingExpanded.value = true
  toolsExpanded.value = true

  // 显示思考
  await wait(800)
  
  // 显示工具调用
  showTools.value = true
  toolsExpanded.value = true
  
  await nextTick()
  
  const tools = currentScenarioData.value.tools
  
  for (let i = 0; i < tools.length; i++) {
    toolExecuting.value = i
    
    // 滚动到当前执行的工具
    await nextTick()
    const toolEl = toolRefs.value[i]
    if (toolEl && toolsSection.value) {
      toolEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    await wait(1000)
    toolExecuted.value = i + 1
    toolExecuting.value = -1
    await wait(300)
  }

  // 显示最终回复
  await wait(500)
  showResponse.value = true
  isExecuting.value = false
  executionComplete.value = true
}

const reset = () => {
  isExecuting.value = false
  executionComplete.value = false
  toolExecuting.value = -1
  toolExecuted.value = 0
  showThinking.value = false
  showTools.value = false
  showResponse.value = false
}

const toggleThinking = () => {
  thinkingExpanded.value = !thinkingExpanded.value
}

const toggleTools = () => {
  toolsExpanded.value = !toolsExpanded.value
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
</script>

<style scoped>
.agent-chat-demo {
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

/* 聊天窗口 */
.chat-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 消息 */
.message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.avatar.agent-avatar {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.bubble {
  max-width: 75%;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.message.user .bubble {
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.llm .bubble {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
}

.message.agent .bubble {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 4px;
  max-width: 85%;
}

.llm-label, .agent-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.agent-label {
  color: var(--vp-c-brand);
}

.llm-content {
  color: #6b7280;
}

/* 思考过程 */
.thinking-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.thinking-header, .tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.2s;
}

.thinking-header:hover, .tools-header:hover {
  background: var(--vp-c-bg-alt);
}

.toggle-icon {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.thinking-content {
  padding: 10px 12px;
  background: #fef3c7;
  font-size: 12px;
  color: #92400e;
}

.thought-item {
  line-height: 1.6;
}

/* 工具调用 */
.tools-section {
  margin-bottom: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.tools-list {
  padding: 10px;
  background: var(--vp-c-bg);
}

.tool-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.tool-item:last-child {
  margin-bottom: 0;
}

.tool-item.completed {
  border-color: #86efac;
  background: #f0fdf4;
}

.tool-item.executing {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tool-status {
  font-size: 14px;
  flex-shrink: 0;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 6px;
}

.tool-params {
  display: block;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 6px;
}

.tool-result {
  font-size: 11px;
  color: #16a34a;
  padding: 6px 8px;
  background: #dcfce7;
  border-radius: 4px;
  white-space: pre-wrap;
}

/* 最终回复 */
.final-response {
  margin-top: 10px;
  padding: 12px;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 8px;
}

.response-header {
  font-size: 11px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 6px;
}

.response-content {
  font-size: 13px;
  color: #166534;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 执行按钮 */
.execute-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.execute-btn:hover {
  background: var(--vp-c-brand-dark);
}

.execute-btn.reset {
  background: #6b7280;
}

.execute-btn.reset:hover {
  background: #4b5563;
}

/* 核心区别 */
.insight-bar {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  font-size: 13px;
}

.insight-label {
  font-weight: 600;
  color: var(--vp-c-brand-dark);
}

.insight-text {
  color: var(--vp-c-text-1);
}
</style>
