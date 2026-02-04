<!--
  DnsLookupDemo.vue
  DNS查询演示 - 增强技术细节版
  
  设计理念：
  1. 循循善诱：通过"接力跑腿"的比喻，展示浏览器如何一步步找到IP。
  2. 技术硬核：新增终端模拟器，展示真实的 dig/系统命令输出，解决"太抽象"的问题。
  3. 紧凑布局：横向流式布局，固定底部详情板。
-->
<template>
  <div class="dns-compact">
    <!-- 顶部控制栏 -->
    <div class="top-bar">
      <div class="title-section">
        <span class="app-icon">🌐</span>
        <span class="app-title">DNS 寻址原理</span>
      </div>
      
      <div class="target-select">
        <span class="label">目标：</span>
        <select v-model="selectedTargetIndex" :disabled="isSearching" @change="reset">
          <option v-for="(t, i) in targets" :key="t.name" :value="i">
            {{ t.name }} ({{ t.domain }})
          </option>
        </select>
      </div>

      <div class="actions">
        <button 
          class="action-btn primary" 
          @click="startAutoSearch"
          v-if="!isSearching && !isFinished"
        >
          ▶ 开始寻址
        </button>
        <button 
          class="action-btn secondary" 
          @click="nextStep"
          v-if="isSearching && !autoPlay"
        >
          ⏭ 下一步
        </button>
        <button 
          class="action-btn outline" 
          @click="reset"
          v-if="isFinished || isSearching"
        >
          ↺ 重置
        </button>
      </div>
    </div>

    <!-- 进度条/状态展示 -->
    <div class="status-bar">
      <div v-if="!isSearching && !isFinished" class="status-text">
        <span class="icon">👋</span>
        准备出发：去问问 <strong>{{ targets[selectedTargetIndex].domain }}</strong> 的 IP 是多少？
      </div>
      <div v-else-if="isSearching" class="status-text running">
        <span class="icon spin">⏳</span>
        正在询问：{{ queryLevels[currentStep]?.analogyName }}...
      </div>
      <div v-else class="status-text success">
        <span class="icon">✅</span>
        找到了！IP 地址是：<strong>{{ targets[selectedTargetIndex].ip }}</strong>
      </div>
    </div>

    <!-- 可视化流程 (横向) -->
    <div class="flow-stage">
      <div 
        v-for="(level, index) in queryLevels"
        :key="level.id"
        class="flow-step"
        :class="{ 
          active: currentStep === index,
          passed: currentStep > index,
          pending: currentStep < index
        }"
        @click="jumpToStep(index)"
      >
        <div class="step-icon-box" :style="{ '--step-color': level.color }">
          <span class="step-icon">{{ level.analogyIcon }}</span>
        </div>
        <div class="step-label">{{ level.analogyName }}</div>
        
        <!-- 连接线 -->
        <div class="step-line" v-if="index < queryLevels.length - 1"></div>
      </div>
    </div>

    <!-- 底部双面板：左侧生活比喻，右侧技术终端 -->
    <div class="info-panels">
      <!-- 左侧：生活场景 -->
      <div class="detail-panel analogy-panel">
        <transition name="fade" mode="out-in">
          <div v-if="currentStep >= 0" class="panel-content" :key="currentStep">
            <div class="panel-header" :style="{ color: currentLevel.color }">
              <span class="header-icon">{{ currentLevel.analogyIcon }}</span>
              <span class="header-title">{{ currentLevel.analogyName }} ({{ currentLevel.techName }})</span>
            </div>
            <div class="panel-body">
              <p class="analogy-text">{{ currentLevel.analogyAction }}</p>
              <div class="tech-hint-badge">
                {{ currentLevel.techAction }}
              </div>
            </div>
          </div>
          <div v-else class="panel-placeholder">
            <span>生活场景视角</span>
          </div>
        </transition>
      </div>

      <!-- 右侧：硬核终端 -->
      <div class="detail-panel terminal-panel">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span></span><span></span><span></span>
          </div>
          <div class="terminal-title">Terminal</div>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="currentStep >= 0" class="terminal-body" :key="currentStep">
            <div class="cmd-line">
              <span class="prompt">$</span>
              <span class="cmd">{{ formatText(currentLevel.techCommand) }}</span>
            </div>
            <div class="cmd-output">
              <pre>{{ formatText(currentLevel.techOutput) }}</pre>
            </div>
          </div>
          <div v-else class="terminal-placeholder">
            <span>Waiting for command...</span>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const targets = [
  { name: '百度', domain: 'baidu.com', ip: '110.242.68.66' },
  { name: '谷歌', domain: 'google.com', ip: '142.250.80.46' },
  { name: 'GitHub', domain: 'github.com', ip: '140.82.114.4' }
]

const selectedTargetIndex = ref(0)
const currentStep = ref(-1)
const isSearching = ref(false)
const isFinished = ref(false)
const autoPlay = ref(false)
let timer = null

const queryLevels = [
  {
    id: 'browser',
    analogyName: '通讯录',
    analogyIcon: '📒',
    analogyAction: '先翻翻自己的通讯录（缓存），看最近有没有记过。',
    techIcon: 'Browser',
    techName: '浏览器缓存',
    techAction: '检查 Browser DNS Cache',
    color: '#67c23a',
    techCommand: 'chrome://net-internals/#dns',
    techOutput: 'Active entries: 0\nCache miss: No entry found for ${domain}',
    qa: {
      title: '🤔 浏览器能记多久？',
      content: [
        {
          q: '是一直记着吗？',
          a: '不是的。通常只有几分钟（比如 chrome 是一分钟）。而且每家浏览器（Chrome, Firefox）的"记性"都不太一样。'
        }
      ]
    }
  },
  {
    id: 'os',
    analogyName: '记事本',
    analogyIcon: '📝',
    analogyAction: '问问操作系统（管家），查查系统 hosts 文件或缓存。',
    techIcon: 'OS',
    techName: '系统缓存/Hosts',
    techAction: '检查 OS Cache / hosts',
    color: '#409eff',
    techCommand: 'cat /etc/hosts',
    techOutput: '127.0.0.1 localhost\n::1 localhost\n# No match for ${domain}',
    qa: {
      title: '🤔 什么是 hosts 文件？',
      content: [
        {
          q: '它有什么用？',
          a: '它是你电脑里的"私人通讯录"。你可以在这里手动强行指定 IP（比如开发时把 test.com 指向本机）。黑客有时也改这里来劫持网站。'
        }
      ]
    }
  },
  {
    id: 'ldns',
    analogyName: '传达室',
    analogyIcon: '💁',
    analogyAction: '问小区的传达室（本地DNS），让他帮忙去外面问。',
    techIcon: 'LDNS',
    techName: '本地DNS (递归)',
    techAction: '向 ISP DNS 发起递归查询',
    color: '#e6a23c',
    techCommand: 'dig ${domain} @192.168.1.1',
    techOutput: ';; QUESTION SECTION:\n;${domain}. IN A\n\n;; ANSWER SECTION:\n(empty) -> Recursion Desired',
    qa: {
      title: '🤔 为什么叫"递归"？',
      content: [
        {
          q: '通俗点解释？',
          a: '就像你问传达室大爷，大爷去帮你跑腿问一圈回来告诉你结果。你只问了一次，大爷跑了好几趟，这就叫递归（帮你跑到底）。'
        }
      ]
    }
  },
  {
    id: 'root',
    analogyName: '总局',
    analogyIcon: '🏛️',
    analogyAction: '传达室问全球总局：".com" 归谁管？',
    techIcon: 'Root',
    techName: '根域名服务器',
    techAction: '查询 Root Server',
    color: '#f56c6c',
    techCommand: 'dig ${domain} @a.root-servers.net +norecurse',
    techOutput: ';; AUTHORITY SECTION:\ncom. 172800 IN NS a.gtld-servers.net.\n;; ADDITIONAL SECTION:\na.gtld-servers.net. IN A 192.5.6.30',
    qa: {
      title: '🤔 全球只有13台吗？',
      content: [
        {
          q: '那样不会被挤爆吗？',
          a: '不是13台，是13组！每组都有几百台"分身"（镜像服务器）分布在全球，包括中国也有，所以不用担心断网。'
        }
      ]
    }
  },
  {
    id: 'tld',
    analogyName: '分局',
    analogyIcon: '🏢',
    analogyAction: '去问 ".com" 分局：baidu.com 归谁管？',
    techIcon: 'TLD',
    techName: '顶级域名服务器',
    techAction: '查询 TLD Server',
    color: '#909399',
    techCommand: 'dig ${domain} @a.gtld-servers.net +norecurse',
    techOutput: ';; AUTHORITY SECTION:\n${domain}. 172800 IN NS ns1.${domain}.\n;; ADDITIONAL SECTION:\nns1.${domain}. IN A 202.108.22.5',
    qa: {
      title: '🤔 谁在管理 .com？',
      content: [
        {
          q: '所有的后缀都一样吗？',
          a: '不一样。.com 归 Verisign 公司管，.cn 归中国互联网络信息中心(CNNIC)管。所以要找不同的"分局"。'
        }
      ]
    }
  },
  {
    id: 'auth',
    analogyName: '办事处',
    analogyIcon: '📍',
    analogyAction: '找到目标办事处：请告诉我 www 的 IP。',
    techIcon: 'Auth',
    techName: '权威DNS服务器',
    techAction: '查询 Authoritative Server',
    color: '#8e44ad',
    techCommand: 'dig ${domain} @ns1.${domain} +norecurse',
    techOutput: ';; ANSWER SECTION:\n${domain}. 600 IN A ${ip}\n;; Query time: 24 msec',
    qa: {
      title: '🤔 为什么叫"权威"？',
      content: [
        {
          q: '它说的话最准吗？',
          a: '对！因为它就是域名的主人（比如百度自己）管理的服务器，它说的话是一手资料，不像前面的可能只是传话。'
        }
      ]
    }
  }
]

const currentLevel = computed(() => 
  currentStep.value >= 0 ? queryLevels[currentStep.value] : {}
)

// 简单的模板替换函数
const formatText = (text) => {
  if (!text) return ''
  const currentTarget = targets[selectedTargetIndex.value]
  return text
    .replace(/\${domain}/g, currentTarget.domain)
    .replace(/\${ip}/g, currentTarget.ip)
}

const startAutoSearch = () => {
  reset()
  isSearching.value = true
  autoPlay.value = true
  nextStep()
}

const nextStep = () => {
  if (currentStep.value < queryLevels.length - 1) {
    currentStep.value++
    if (autoPlay.value) {
      timer = setTimeout(nextStep, 2500) // 增加时间给用户看终端
    }
  } else {
    finish()
  }
}

const finish = () => {
  isFinished.value = true
  isSearching.value = false
  autoPlay.value = false
}

const reset = () => {
  currentStep.value = -1
  isSearching.value = false
  isFinished.value = false
  autoPlay.value = false
  clearTimeout(timer)
}

const jumpToStep = (index) => {
  if (isSearching.value && autoPlay.value) return
  currentStep.value = index
  isSearching.value = true
  isFinished.value = false
}

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.dns-compact {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 16px;
  margin: 16px 0;
  font-size: 14px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.target-select {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.target-select select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.action-btn {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.action-btn.primary { background: var(--vp-c-brand); color: white; }
.action-btn.secondary { background: var(--vp-c-bg-alt); border-color: var(--vp-c-divider); color: var(--vp-c-text-1); }
.action-btn.outline { border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); background: transparent; }

.status-bar {
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: center;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-text strong { color: var(--vp-c-brand); margin: 0 4px; }

/* 流程图部分 */
.flow-stage {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 0 4px;
  position: relative;
  overflow-x: auto;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 50px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s;
}

.flow-step:last-child { flex: 0 0 auto; }
.flow-step.active, .flow-step.passed { opacity: 1; }

.step-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
  font-size: 18px;
}

.flow-step.active .step-icon-box {
  border-color: var(--step-color);
  background: var(--step-color);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.flow-step.passed .step-icon-box {
  border-color: var(--step-color);
  color: var(--step-color);
}

.step-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.flow-step.active .step-label {
  color: var(--step-color);
  font-weight: bold;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 1;
}

.flow-step.passed .step-line { background: var(--step-color); }

/* 底部双面板布局 */
.info-panels {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .info-panels { grid-template-columns: 1fr; }
}

.detail-panel {
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  overflow: hidden;
  height: 180px; /* 固定高度防止跳动 */
  display: flex;
  flex-direction: column;
}

/* 左侧生活比喻面板 */
.analogy-panel {
  padding: 16px;
  position: relative;
}

.panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.analogy-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.tech-hint-badge {
  display: inline-block;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  align-self: flex-start;
  margin-top: 8px;
}

.panel-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

/* 右侧终端面板 */
.terminal-panel {
  background: #1e1e1e; /* 强制深色背景 */
  border-color: #333;
  color: #d4d4d4;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.terminal-header {
  background: #2d2d2d;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
}

.terminal-dots {
  display: flex;
  gap: 6px;
  margin-right: 12px;
}

.terminal-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #555;
}
.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.terminal-title {
  font-size: 12px;
  color: #999;
}

.terminal-body {
  padding: 12px;
  font-size: 12px;
  line-height: 1.4;
  overflow-y: auto;
  flex: 1;
}

.cmd-line {
  display: flex;
  gap: 8px;
  color: #fff;
  margin-bottom: 8px;
}

.prompt { color: #27c93f; font-weight: bold; }
.cmd { color: #fff; }

.cmd-output pre {
  margin: 0;
  color: #aaa;
  white-space: pre-wrap;
  word-break: break-all;
}

.terminal-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 13px;
}

.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Dark mode 适配 - 这里主要针对非终端部分 */
:root.dark .dns-compact {
  background: var(--vp-c-bg);
}
</style>
