<template>
  <div class="language-scenario-demo">
    <div class="demo-header">
      <span class="icon">🎬</span>
      <span class="title">为什么需要编程语言？</span>
      <span class="subtitle">从场景看编程语言的价值</span>
    </div>

    <div class="scenario-intro">
      编程语言是<strong>人类思维</strong>和<strong>计算机执行</strong>之间的桥梁
    </div>

    <div class="scenario-cards">
      <div
        v-for="scenario in scenarios"
        :key="scenario.id"
        :class="['scenario-card', { active: activeScenario === scenario.id }]"
        @click="activeScenario = scenario.id"
      >
        <div class="card-icon">{{ scenario.icon }}</div>
        <div class="card-title">{{ scenario.title }}</div>
        <div class="card-desc">{{ scenario.desc }}</div>
      </div>
    </div>

    <!-- 场景详解 -->
    <div v-if="activeScenario" class="scenario-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentScenario.icon }}</span>
        <span class="detail-title">{{ currentScenario.title }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">场景描述</div>
          <div class="section-text">{{ currentScenario.fullDesc }}</div>
        </div>

        <div class="detail-section">
          <div class="section-title">为什么需要编程语言？</div>
          <div class="reason-steps">
            <div
              v-for="(step, index) in currentScenario.reasons"
              :key="index"
              class="reason-step"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-text">{{ step }}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">不用编程语言会怎样？</div>
          <div class="without-code">
            <div class="without-box">
              <div class="without-icon">😰</div>
              <div class="without-text">{{ currentScenario.withoutLang }}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">适合的语言</div>
          <div class="lang-tags">
            <span
              v-for="(lang, index) in currentScenario.languages"
              :key="index"
              class="lang-tag"
            >
              {{ lang }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 编程语言的作用 -->
    <div class="language-role">
      <div class="role-title">编程语言的三大作用</div>
      <div class="role-grid">
        <div class="role-card">
          <div class="role-icon">💬</div>
          <div class="role-title">表达思想</div>
          <div class="role-desc">将人类思维转化为计算机可理解的指令</div>
        </div>
        <div class="role-card">
          <div class="role-icon">🔧</div>
          <div class="role-title">控制硬件</div>
          <div class="role-desc">精确控制计算机执行各种操作</div>
        </div>
        <div class="role-card">
          <div class="role-icon">🤝</div>
          <div class="role-title">团队协作</div>
          <div class="role-desc">标准化的语法便于多人协作开发</div>
        </div>
      </div>
    </div>

    <!-- 演化历程 -->
    <div class="evolution">
      <div class="evolution-title">从机器码到高级语言</div>
      <div class="evolution-steps">
        <div class="evo-step">
          <div class="evo-level">低级</div>
          <div class="evo-name">机器语言</div>
          <div class="evo-arrow">↓</div>
        </div>
        <div class="evo-step">
          <div class="evo-level">低级</div>
          <div class="evo-name">汇编语言</div>
          <div class="evo-arrow">↓</div>
        </div>
        <div class="evo-step">
          <div class="evo-level">中级</div>
          <div class="evo-name">C 语言</div>
          <div class="evo-arrow">↓</div>
        </div>
        <div class="evo-step">
          <div class="evo-level">高级</div>
          <div class="evo-name">现代语言</div>
          <div class="evo-arrow">→</div>
        </div>
        <div class="evo-result">
          越来越接近<br>人类思维
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref('web')

const scenarios = [
  {
    id: 'web',
    icon: '🌐',
    title: '开发网站',
    desc: '创建交互式网页',
    fullDesc: '你需要创建一个在线购物网站，用户可以浏览商品、加入购物车、下单支付',
    reasons: [
      'HTML 定义网页结构',
      'CSS 实现美观样式',
      'JavaScript 实现交互功能',
      'Python/Node.js 处理后端逻辑'
    ],
    withoutLang: '只能手工编写网页，无法实现动态内容和用户交互',
    languages: ['JavaScript', 'HTML', 'CSS', 'Python', 'TypeScript']
  },
  {
    id: 'mobile',
    icon: '📱',
    title: '开发 App',
    desc: '创建手机应用',
    fullDesc: '开发一个功能丰富的手机应用，支持 iOS 和 Android 平台',
    reasons: [
      'Swift/Kotlin 提供原生体验',
      'React Native 实现跨平台',
      '编程语言调用设备功能',
      '管理应用状态和数据'
    ],
    withoutLang: '无法创建手机应用，只能使用系统自带的功能',
    languages: ['Swift', 'Kotlin', 'React Native', 'Flutter']
  },
  {
    id: 'data',
    icon: '📊',
    title: '数据分析',
    desc: '处理和分析大量数据',
    fullDesc: '分析百万级用户数据，找出行为模式和趋势',
    reasons: [
      'Python 提供丰富的数据科学库',
      '简洁的语法便于快速迭代',
      '强大的数据处理能力',
      '可视化工具支持'
    ],
    withoutLang: '手工计算几乎不可能，需要几天才能完成分析',
    languages: ['Python', 'R', 'SQL', 'Julia']
  },
  {
    id: 'system',
    icon: '⚙️',
    title: '系统编程',
    desc: '编写操作系统和驱动',
    fullDesc: '开发操作系统内核、设备驱动等底层软件',
    reasons: [
      'C/C++ 提供底层访问能力',
      '精确控制内存管理',
      '高效的执行性能',
      '直接操作硬件'
    ],
    withoutLang: '无法控制系统硬件，只能使用现有的操作系统功能',
    languages: ['C', 'C++', 'Rust', 'Assembly']
  },
  {
    id: 'ai',
    icon: '🤖',
    title: '人工智能',
    desc: '训练机器学习模型',
    fullDesc: '构建深度学习模型，识别图像、理解自然语言',
    reasons: [
      'Python 拥有丰富的 AI 框架',
      '简洁的数学表达',
      'GPU 加速支持',
      '庞大的社区支持'
    ],
    withoutLang: '无法实现复杂的 AI 算法，只能使用简单的规则',
    languages: ['Python', 'R', 'Julia', 'C++']
  }
]

const currentScenario = computed(() => scenarios.find(s => s.id === activeScenario.value))
</script>

<style scoped>
.language-scenario-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.scenario-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.scenario-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.scenario-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
}

.reason-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reason-step {
  display: flex;
  gap: 0.75rem;
  align-items: start;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.85rem;
  line-height: 1.5;
  padding-top: 0.15rem;
}

.without-code {
  text-align: center;
}

.without-box {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 6px;
}

.without-icon {
  font-size: 1.5rem;
}

.without-text {
  font-size: 0.85rem;
  color: #ef4444;
}

.lang-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.lang-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
}

.language-role {
  margin-bottom: 2rem;
}

.role-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.role-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.role-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.role-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.role-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.evolution {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.evolution-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.evolution-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.evo-step {
  text-align: center;
}

.evo-level {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.evo-name {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.evo-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.evo-result {
  padding: 0.75rem 1rem;
  background: #10b981;
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}
</style>
