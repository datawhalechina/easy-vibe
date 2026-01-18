<script setup>
import { ref, computed } from 'vue'

const currentScenario = ref('editor') // 'editor' | 'extension' | 'full'
const isRunning = ref(false)
const logs = ref([])
const activeStep = ref('') // 'start' | 'error-editor' | 'extension' | 'error-env' | 'env' | 'result'

const scenarios = {
  editor: {
    tab: '1. 仅编辑器',
    title: '场景 1: 只有 VS Code (纯文本模式)',
    desc: '就像用 Windows 记事本写代码。虽然能打字，但它根本不懂什么是 Python。',
    result: '❌ 失败：VS Code 把代码当成普通文本，不知道该怎么运行。'
  },
  extension: {
    tab: '2. +插件',
    title: '场景 2: 安装了插件 (缺环境)',
    desc: '你安装了 Python 插件。插件知道“运行”意味着要找 Python 程序，但你的电脑里并没有安装 Python。',
    result: '⚠️ 报错：插件生成了指令，但在系统里找不到 "python.exe"。'
  },
  full: {
    tab: '3. +环境 (完整)',
    title: '场景 3: 完整形态 (IDE + 插件 + 环境)',
    desc: '你安装了 Python 解释器。插件生成指令，解释器接收并执行，完美配合。',
    result: '✅ 成功：Hello World'
  }
}

const run = async () => {
  if (isRunning.value) return
  isRunning.value = true
  logs.value = []
  activeStep.value = 'start'

  await wait(600)

  if (currentScenario.value === 'editor') {
    logs.value.push('VS Code: "这是什么文件？我不认识。"')
    logs.value.push('VS Code: "我只是个打字机，无法运行。"')
    activeStep.value = 'error-editor'
  } else {
    // Has extension
    activeStep.value = 'extension'
    await wait(800)

    if (currentScenario.value === 'extension') {
      logs.value.push('> python main.py')
      await wait(600)
      logs.value.push("Error: command 'python' not found")
      logs.value.push('系统: 找不到 Python 解释器')
      activeStep.value = 'error-env'
    } else {
      // Full
      logs.value.push('> python main.py')
      activeStep.value = 'env'
      await wait(1200)
      activeStep.value = 'result'
      logs.value.push('Hello World')
    }
  }

  isRunning.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const setScenario = (key) => {
  if (isRunning.value) return
  currentScenario.value = key
  logs.value = []
  activeStep.value = ''
}
</script>

<template>
  <div class="arch-demo">
    <div class="demo-header">
      <div class="title">🛠️ IDE 核心机制模拟器</div>
      <div class="subtitle">
        点击下方标签，体验不同配置下的运行结果，理解为什么缺一不可。
      </div>
    </div>

    <!-- Tab Selection -->
    <div class="tabs">
      <div
        v-for="(conf, key) in scenarios"
        :key="key"
        class="tab"
        :class="{ active: currentScenario === key }"
        @click="setScenario(key)"
      >
        {{ conf.tab }}
      </div>
    </div>

    <div class="scenario-desc">
      <strong>{{ scenarios[currentScenario].title }}</strong>
      <p>{{ scenarios[currentScenario].desc }}</p>
    </div>

    <div class="diagram-container">
      <!-- Layer 1: VS Code -->
      <div class="component vscode" :class="{ dim: activeStep === 'env' }">
        <div class="comp-label">1. 外壳 (VS Code)</div>
        <div class="editor-window">
          <div class="file-tab">main.py</div>
          <div class="code-area">
            <span style="color: #c586c0">print</span>(<span
              style="color: #ce9178"
              >"Hello"</span
            >)
          </div>
          <button
            class="run-btn-small"
            @click="run"
            :disabled="isRunning"
            title="点击运行"
          >
            {{ isRunning ? '...' : '▶ 运行' }}
          </button>
        </div>
        <div class="status-badge error" v-if="activeStep === 'error-editor'">
          🚫 不懂怎么运行
        </div>
      </div>

      <!-- Connector 1 -->
      <div class="connector">
        <div
          class="line"
          :class="{
            active: ['extension', 'env', 'result', 'error-env'].includes(
              activeStep
            )
          }"
        ></div>
        <div
          class="arrow-tip"
          :class="{
            active: ['extension', 'env', 'result', 'error-env'].includes(
              activeStep
            )
          }"
        >
          ⬇
        </div>
      </div>

      <!-- Layer 2: Extension -->
      <div
        class="component extension"
        :class="{
          missing: currentScenario === 'editor',
          active: activeStep === 'extension'
        }"
      >
        <div class="comp-label">2. 中介 (插件)</div>
        <div class="comp-box">
          <div v-if="currentScenario === 'editor'" class="missing-content">
            <span class="icon">❌</span> 未安装插件
          </div>
          <div v-else class="active-content">
            <div class="icon">🧩</div>
            <div class="text">Python 插件</div>
            <div
              class="action"
              v-if="
                activeStep === 'extension' ||
                activeStep === 'env' ||
                activeStep === 'error-env'
              "
            >
              生成指令: <code>python main.py</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Connector 2 -->
      <div class="connector">
        <div
          class="line"
          :class="{ active: ['env', 'result'].includes(activeStep) }"
        ></div>
        <div
          class="arrow-tip"
          :class="{ active: ['env', 'result'].includes(activeStep) }"
        >
          ⬇
        </div>
      </div>

      <!-- Layer 3: Environment -->
      <div
        class="component env"
        :class="{
          missing: currentScenario !== 'full',
          active: activeStep === 'env'
        }"
      >
        <div class="comp-label">3. 引擎 (环境)</div>
        <div class="comp-box">
          <div v-if="currentScenario !== 'full'" class="missing-content">
            <span class="icon">❌</span> 未安装环境
          </div>
          <div v-else class="active-content">
            <div class="icon">⚙️</div>
            <div class="text">Python 解释器</div>
            <div class="action" v-if="activeStep === 'env'">
              <span class="spin">⚙️</span> 正在计算...
            </div>
            <div class="action success" v-if="activeStep === 'result'">
              ✅ 计算完成
            </div>
          </div>
        </div>
        <div class="status-badge error" v-if="activeStep === 'error-env'">
          🚫 找不到程序
        </div>
      </div>
    </div>

    <!-- Output Console -->
    <div class="terminal-box">
      <div class="term-header">
        <span class="term-icon">_</span> 终端 (Terminal)
      </div>
      <div class="term-body">
        <div
          v-for="(l, i) in logs"
          :key="i"
          class="log-line"
          :class="{ error: l.includes('Error') || l.includes('失败') }"
        >
          {{ l }}
        </div>
        <div v-if="logs.length === 0" class="placeholder">
          点击上方“运行”按钮开始...
        </div>
      </div>
    </div>

    <div
      class="result-bar"
      :class="{
        success: scenarios[currentScenario].result.includes('成功'),
        error: !scenarios[currentScenario].result.includes('成功')
      }"
      v-if="!isRunning && logs.length > 0"
    >
      {{ scenarios[currentScenario].result }}
    </div>
  </div>
</template>

<style scoped>
.arch-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* Tabs */
.tabs {
  display: flex;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
  gap: 4px;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  font-weight: 500;
}
.tab:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.scenario-desc {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
}
.scenario-desc strong {
  display: block;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}
.scenario-desc p {
  margin: 0;
  color: var(--vp-c-text-2);
}

/* Diagram */
.diagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
}

.component {
  width: 100%;
  max-width: 320px;
  position: relative;
  transition: all 0.3s;
}

.comp-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* VS Code Style */
.vscode .editor-window {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #333;
}
.vscode .file-tab {
  background: #2d2d2d;
  color: #fff;
  padding: 4px 12px;
  font-size: 12px;
  border-bottom: 1px solid #1e1e1e;
  width: fit-content;
}
.vscode .code-area {
  padding: 12px;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  color: #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.run-btn-small {
  background: #007acc;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}
.run-btn-small:hover {
  background: #0062a3;
}
.run-btn-small:disabled {
  background: #444;
  cursor: not-allowed;
}

/* Extension & Env Box Style */
.comp-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.component.missing .comp-box {
  border-style: dashed;
  background: var(--vp-c-bg-alt);
  opacity: 0.7;
}
.component.active .comp-box {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.2);
}

.missing-content {
  color: var(--vp-c-text-3);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.active-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
}
.active-content .icon {
  font-size: 20px;
}
.active-content .text {
  font-weight: 600;
  font-size: 14px;
}
.active-content .action {
  font-size: 12px;
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 4px;
  font-family: monospace;
  animation: fadeIn 0.3s;
}
.active-content .action.success {
  color: var(--vp-c-green);
  background: var(--vp-c-green-dimm);
}

/* Connectors */
.connector {
  height: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.line {
  width: 2px;
  height: 100%;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}
.line.active {
  background: var(--vp-c-brand);
}
.arrow-tip {
  position: absolute;
  bottom: -4px;
  font-size: 12px;
  color: var(--vp-c-divider);
  transition: color 0.3s;
  background: var(--vp-c-bg-soft);
}
.arrow-tip.active {
  color: var(--vp-c-brand);
}

/* Status Badges */
.status-badge {
  position: absolute;
  top: 50%;
  right: -100px;
  transform: translateY(-50%);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  animation: slideIn 0.3s;
}
.status-badge.error {
  background: #ffe6e6;
  color: #d93025;
  border: 1px solid #ffcdd2;
}

/* Terminal */
.terminal-box {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Consolas', monospace;
  border: 1px solid #333;
}
.term-header {
  background: #2d2d2d;
  color: #ccc;
  padding: 4px 12px;
  font-size: 12px;
  border-bottom: 1px solid #333;
}
.term-body {
  padding: 12px;
  min-height: 80px;
  font-size: 13px;
  color: #fff;
}
.log-line {
  margin-bottom: 4px;
}
.log-line.error {
  color: #ff6b68;
}
.placeholder {
  color: #666;
  font-style: italic;
}

.result-bar {
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}
.result-bar.success {
  background: var(--vp-c-green-dimm);
  color: var(--vp-c-green-dark);
}
.result-bar.error {
  background: var(--vp-c-red-dimm);
  color: var(--vp-c-red-dark);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-10px, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%);
  }
}
.spin {
  display: inline-block;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Mobile Responsive */
@media (max-width: 600px) {
  .status-badge {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    margin-top: 8px;
    display: inline-block;
    width: 100%;
    text-align: center;
  }
}
</style>
