<!--
  DnsLookupDemo.vue
  DNS查询演示 - 查地址簿 vs 真实DNS查询 双栏对照

  用途：
  用"查地址簿"的生活化比喻，配合真实DNS查询过程，
  让0基础用户理解域名如何转换成IP地址。
-->
<template>
  <div class="dns-lookup-demo">
    <!-- 标题区 -->
    <div class="demo-header">
      <div class="header-title">
        <span class="title-icon">[地址簿]</span>
        <span>查地址簿 vs DNS查询</span>
      </div>
      <div class="header-subtitle">生活比喻 ↔ 技术实现 双栏对照</div>
    </div>

    <!-- 场景设置 -->
    <div class="scenario-setup">
      <div class="setup-text">
        快递员要送包裹给 <strong>"{{ currentTarget.name }}"</strong>（{{ currentTarget.domain }}），
        但他只知道名字，不知道具体门牌号...
      </div>
      <div class="target-selector">
        <span class="selector-label">换个目标：</span>
        <button
          v-for="target in targets"
          :key="target.name"
          @click="selectTarget(target)"
          class="target-chip"
          :class="{ active: currentTarget.name === target.name }"
          :disabled="isSearching"
        >
          {{ target.name }}
        </button>
      </div>
    </div>

    <!-- 开始查询按钮 -->
    <div class="start-action" v-if="!isSearching && !showResult">
      <button class="start-btn" @click="startSearch">
        [查询] 开始查询地址
      </button>
    </div>

    <!-- 双栏对照展示 -->
    <div class="comparison-container" v-if="isSearching || showResult">
      <!-- 左侧：生活比喻（查地址簿） -->
      <div class="comparison-side analogy-side">
        <div class="side-header">
          <span class="side-icon">[生活]</span>
          <span class="side-title">查地址簿流程</span>
        </div>
        <div class="analogy-flow">
          <div
            v-for="(level, index) in queryLevels"
            :key="level.id"
            class="flow-level"
            :class="{
              passed: currentStep > index,
              current: currentStep === index,
              pending: currentStep < index
            }"
          >
            <div class="level-icon">{{ level.analogyIcon }}</div>
            <div class="level-content">
              <div class="level-name">{{ level.analogyName }}</div>
              <div class="level-role">{{ level.analogyRole }}</div>
              <div class="level-action" v-if="currentStep === index">
                <span class="action-text">{{ level.analogyAction }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间：连接指示 -->
      <div class="connection-indicator">
        <div class="indicator-line" v-for="i in 5" :key="i">
          <span class="indicator-arrow">→</span>
          <span class="indicator-text">对应</span>
        </div>
      </div>

      <!-- 右侧：技术实现（真实DNS） -->
      <div class="comparison-side tech-side">
        <div class="side-header">
          <span class="side-icon">[技术]</span>
          <span class="side-title">DNS查询流程</span>
        </div>
        <div class="tech-flow">
          <div
            v-for="(level, index) in queryLevels"
            :key="level.id"
            class="flow-level"
            :class="{
              passed: currentStep > index,
              current: currentStep === index,
              pending: currentStep < index
            }"
          >
            <div class="level-icon" :style="{ background: level.techColor }">{{ level.techIcon }}</div>
            <div class="level-content">
              <div class="level-name">{{ level.techName }}</div>
              <div class="level-role">{{ level.techRole }}</div>
              <div class="level-action" v-if="currentStep === index">
                <code class="action-code">{{ level.techAction }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 查询结果 -->
    <div class="result-section" v-if="showResult">
      <div class="result-card">
        <div class="result-header">[成功] 查询成功！</div>
        <div class="result-body">
          <div class="result-row">
            <span class="result-label">域名（名字）：</span>
            <code class="result-value">{{ currentTarget.domain }}</code>
          </div>
          <div class="result-row">
            <span class="result-label">IP地址（门牌号）：</span>
            <code class="result-value highlight">{{ currentTarget.ip }}</code>
          </div>
        </div>
      </div>

      <!-- 技术说明卡片 -->
      <div class="tech-explanation">
        <div class="explanation-header">
          <span class="explanation-icon">[详解]</span>
          <span>DNS查询技术详解</span>
        </div>
        <div class="explanation-body">
          <div class="explanation-item">
            <strong>[查询] 查询类型：</strong>
            <p><strong>递归查询</strong>：浏览器只发一次请求，本地DNS负责层层查询后返回结果（像委托代理）</p>
            <p><strong>迭代查询</strong>：每层只告诉下一层去哪查，浏览器需要多次查询（像自己跑腿）</p>
          </div>
          <div class="explanation-item">
            <strong>[缓存] 缓存机制：</strong>
            <p>查询结果会被缓存在浏览器、操作系统、路由器、本地DNS服务器等多个层级，下次直接返回，大大加速访问。</p>
          </div>
          <div class="explanation-item">
            <strong>[根] 根域名服务器：</strong>
            <p>全球只有13组根服务器（字母A-M命名），管理所有顶级域（.com/.org/.cn等）。它们知道每个顶级域由谁管理。</p>
          </div>
        </div>
      </div>

      <button class="reset-btn" @click="reset">[重置] 再查一次</button>
    </div>

    <!-- 层级说明（未开始查询时显示） -->
    <div class="levels-info" v-if="!isSearching && !showResult">
      <div class="info-title">[对照] DNS查询层级对照表</div>
      <div class="info-grid">
        <div class="info-card" v-for="level in queryLevels" :key="level.id">
          <div class="info-analogy">
            <span class="info-icon">{{ level.analogyIcon }}</span>
            <span class="info-name">{{ level.analogyName }}</span>
          </div>
          <div class="info-arrow">↓</div>
          <div class="info-tech">
            <span class="info-icon" :style="{ background: level.techColor }">{{ level.techIcon }}</span>
            <span class="info-name">{{ level.techName }}</span>
          </div>
          <div class="info-desc">{{ level.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const targets = [
  { name: '百度', domain: 'baidu.com', ip: '110.242.68.66' },
  { name: '谷歌', domain: 'google.com', ip: '142.250.80.46' },
  { name: 'GitHub', domain: 'github.com', ip: '140.82.114.4' },
  { name: 'B站', domain: 'bilibili.com', ip: '120.92.78.57' }
]

const currentTarget = ref(targets[0])
const isSearching = ref(false)
const showResult = ref(false)
const currentStep = ref(0)

const queryLevels = [
  {
    id: 'browser',
    analogyIcon: '自',
    analogyName: '翻通讯录',
    analogyRole: '快递员自己',
    analogyAction: '先看看自己记没记过这个地址',
    techIcon: '浏',
    techName: '浏览器缓存',
    techRole: '本地缓存',
    techAction: '检查 DNS cache',
    techColor: '#67c23a',
    description: '浏览器会缓存最近访问过的域名，避免重复查询'
  },
  {
    id: 'os',
    analogyIcon: '本',
    analogyName: '查记事本',
    analogyRole: '自己的记录',
    analogyAction: '看看之前有没有记过',
    techIcon: '系',
    techName: '操作系统缓存',
    techRole: 'OS DNS Cache',
    techAction: '检查 hosts 文件',
    techColor: '#95d475',
    description: '操作系统也有DNS缓存，hosts文件可手动指定域名映射'
  },
  {
    id: 'recursive',
    analogyIcon: '服',
    analogyName: '社区服务中心',
    analogyRole: '帮跑腿的人',
    analogyAction: '帮用户查询，自己跑遍各部门',
    techIcon: '递',
    techName: '本地DNS服务器',
    techRole: 'Recursive Resolver',
    techAction: 'ISP DNS 查询',
    techColor: '#409eff',
    description: '通常由网络运营商提供，负责递归查询并缓存结果'
  },
  {
    id: 'root',
    analogyIcon: '根',
    analogyName: '国务院',
    analogyRole: '最高管理机构',
    analogyAction: '.com 归谁管？去问它！',
    techIcon: '根',
    techName: '根域名服务器',
    techRole: 'Root Server',
    techAction: '返回 TLD 服务器地址',
    techColor: '#e6a23c',
    description: '全球13组，管理所有顶级域，知道.com/.cn等归谁管'
  },
  {
    id: 'tld',
    analogyIcon: '省',
    analogyName: '省政府',
    analogyRole: '省级管理机构',
    analogyAction: 'baidu.com 归谁管？',
    techIcon: '顶',
    techName: '顶级域服务器',
    techRole: 'TLD Server',
    techAction: '返回权威DNS地址',
    techColor: '#f56c6c',
    description: '管理特定顶级域（如Verisign管理.com），知道具体域名归谁管'
  },
  {
    id: 'auth',
    analogyIcon: '户',
    analogyName: '户籍系统',
    analogyRole: '最终档案',
    analogyAction: '查到具体门牌号了！',
    techIcon: '权',
    techName: '权威DNS服务器',
    techRole: 'Authoritative DNS',
    techAction: '返回 A 记录',
    techColor: '#b37feb',
    description: '域名所有者设置的DNS服务器，保存着域名到IP的最终映射'
  }
]

const selectTarget = (target) => {
  currentTarget.value = target
  reset()
}

const startSearch = () => {
  isSearching.value = true
  showResult.value = false
  currentStep.value = 0

  // 模拟查询过程
  const steps = [0, 1, 2, 3, 4, 5]
  let i = 0

  const nextStep = () => {
    if (i < steps.length) {
      currentStep.value = steps[i]
      i++
      setTimeout(nextStep, 800)
    } else {
      setTimeout(() => {
        showResult.value = true
        isSearching.value = false
      }, 500)
    }
  }

  nextStep()
}

const reset = () => {
  isSearching.value = false
  showResult.value = false
  currentStep.value = 0
}
</script>

<style scoped>
.dns-lookup-demo {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
}

/* 头部 */
.demo-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.title-icon {
  font-size: 14px;
  color: var(--vp-c-brand);
  font-weight: 600;
}
.header-subtitle {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* 场景设置 */
.scenario-setup {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(103, 194, 58, 0.1));
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.setup-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 12px;
}
.setup-text strong {
  color: var(--vp-c-brand);
}
.target-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.selector-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.target-chip {
  padding: 6px 12px;
  background: white;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.target-chip:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
.target-chip.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.target-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 开始按钮 */
.start-action {
  text-align: center;
  margin-bottom: 20px;
}
.start-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--vp-c-brand), #67c23a);
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s;
}
.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.3);
}

/* 双栏对照容器 */
.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

/* 侧边栏 */
.comparison-side {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.side-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: white;
}
.analogy-side .side-header {
  background: linear-gradient(90deg, #67c23a, #95d475);
}
.tech-side .side-header {
  background: linear-gradient(90deg, #409eff, #79bbff);
}
.side-icon {
  font-size: 12px;
  font-weight: 600;
}

/* 流程展示 */
.analogy-flow, .tech-flow {
  padding: 12px;
}
.flow-level {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
  opacity: 0.4;
}
.flow-level.passed {
  opacity: 0.7;
  border-color: #67c23a;
  background: rgba(103, 194, 58, 0.1);
}
.flow-level.current {
  opacity: 1;
  border-color: var(--vp-c-brand);
  background: rgba(64, 158, 255, 0.1);
  transform: scale(1.02);
}
.level-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}
.analogy-flow .level-icon {
  background: #fff3e0;
  color: #666;
}
.level-content {
  flex: 1;
}
.level-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.level-role {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.level-action {
  margin-top: 4px;
}
.action-text {
  font-size: 11px;
  color: var(--vp-c-brand);
  background: white;
  padding: 2px 8px;
  border-radius: 10px;
}
.action-code {
  font-size: 10px;
  color: var(--vp-c-brand);
  background: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* 连接指示器 */
.connection-indicator {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40px 0;
}
.indicator-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.indicator-arrow {
  font-size: 18px;
  color: var(--vp-c-brand);
  font-weight: bold;
}
.indicator-text {
  font-size: 10px;
  color: var(--vp-c-text-3);
  writing-mode: vertical-rl;
}

/* 结果区域 */
.result-section {
  animation: fadeIn 0.5s ease;
}
.result-card {
  background: linear-gradient(135deg, #67c23a, #85ce61);
  border-radius: 12px;
  padding: 20px;
  color: white;
  margin-bottom: 16px;
}
.result-header {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}
.result-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
.result-label {
  opacity: 0.9;
}
.result-value {
  font-family: monospace;
  background: rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 4px;
}
.result-value.highlight {
  background: rgba(255,255,255,0.3);
  font-weight: 600;
}

/* 技术说明 */
.tech-explanation {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.explanation-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.explanation-icon {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
}
.explanation-item {
  margin-bottom: 12px;
}
.explanation-item strong {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}
.explanation-item p {
  margin: 4px 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 重置按钮 */
.reset-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.reset-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* 层级信息 */
.levels-info {
  margin-top: 20px;
}
.info-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.info-card {
  background: white;
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.info-analogy, .info-tech {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.info-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
.info-analogy .info-icon {
  background: #fff3e0;
  color: #666;
}
.info-name {
  font-size: 12px;
  font-weight: 600;
}
.info-arrow {
  font-size: 16px;
  color: var(--vp-c-brand);
  margin: 4px 0;
}
.info-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  line-height: 1.4;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 响应式 */
@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
  .connection-indicator {
    flex-direction: row;
    padding: 8px 0;
    justify-content: center;
    gap: 16px;
  }
  .indicator-text {
    writing-mode: horizontal-tb;
  }
}
</style>
