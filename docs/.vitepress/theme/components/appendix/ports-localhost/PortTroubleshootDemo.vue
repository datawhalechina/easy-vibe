<script setup>
import { ref, computed } from 'vue'

const selectedProblem = ref(0)

const problems = [
  {
    symptom: '端口被占用',
    error: 'Error: listen EADDRINUSE :::3000',
    icon: '🔴',
    steps: [
      { cmd: 'lsof -i :3000', desc: '查看谁在用这个端口', output: 'COMMAND  PID   USER   FD   TYPE  SIZE/OFF NODE NAME\nnode     1234  sanbu  22u  IPv6  0t0      TCP  *:3000 (LISTEN)' },
      { cmd: 'kill -9 1234', desc: '强制结束该进程（PID 为 1234）', output: '（进程已终止）' },
      { cmd: 'npm run dev', desc: '重新启动你的服务', output: '✅ Server running at http://localhost:3000' }
    ]
  },
  {
    symptom: '拒绝连接',
    error: 'ERR_CONNECTION_REFUSED (localhost:8080)',
    icon: '🚫',
    steps: [
      { cmd: 'curl http://localhost:8080', desc: '确认服务是否真的在运行', output: 'curl: (7) Failed to connect to localhost port 8080: Connection refused' },
      { cmd: 'lsof -i :8080', desc: '检查是否有程序在监听', output: '（没有输出 = 没有程序在监听）' },
      { cmd: 'npm run dev', desc: '启动你的后端服务', output: '✅ API server listening on port 8080' }
    ]
  },
  {
    symptom: '跨域被拦截',
    error: 'Access-Control-Allow-Origin 错误',
    icon: '🛡️',
    steps: [
      { cmd: '检查前端请求地址', desc: '确认是否从 localhost:5173 请求 localhost:3000', output: '前端 http://localhost:5173 → 后端 http://localhost:3000/api\n不同端口 = 不同源 = 触发跨域策略！' },
      { cmd: '后端添加 CORS 配置', desc: '允许前端域名跨域访问', output: "app.use(cors({ origin: 'http://localhost:5173' }))" },
      { cmd: '或者配置前端代理', desc: '在 vite.config.js 中设置 proxy', output: "server: {\n  proxy: {\n    '/api': 'http://localhost:3000'\n  }\n}" }
    ]
  }
]

const currentProblem = computed(() => problems[selectedProblem.value])
const currentStepIndex = ref(0)
const showingOutput = ref(false)

function selectProblem(i) {
  selectedProblem.value = i
  currentStepIndex.value = 0
  showingOutput.value = false
}

function runStep() {
  showingOutput.value = true
}

function nextStep() {
  if (currentStepIndex.value < currentProblem.value.steps.length - 1) {
    currentStepIndex.value++
    showingOutput.value = false
  }
}

function resetSteps() {
  currentStepIndex.value = 0
  showingOutput.value = false
}
</script>

<template>
  <div class="port-troubleshoot-demo">
    <div class="control-panel">
      <span class="panel-label">选择一个常见问题：</span>
      <div class="problem-tabs">
        <button
          v-for="(p, i) in problems"
          :key="i"
          :class="['tab-btn', { active: selectedProblem === i }]"
          @click="selectProblem(i)"
        >
          {{ p.icon }} {{ p.symptom }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="error-display">
        <span class="error-icon">{{ currentProblem.icon }}</span>
        <div class="error-info">
          <span class="error-symptom">{{ currentProblem.symptom }}</span>
          <code class="error-message">{{ currentProblem.error }}</code>
        </div>
      </div>

      <div class="fix-steps">
        <div class="fix-header">
          <span>排查步骤 ({{ currentStepIndex + 1 }}/{{ currentProblem.steps.length }})</span>
          <button class="reset-btn" @click="resetSteps">重来</button>
        </div>

        <div class="step-content">
          <div class="step-cmd">
            <span class="prompt">$</span>
            <code>{{ currentProblem.steps[currentStepIndex].cmd }}</code>
          </div>
          <div class="step-desc">
            {{ currentProblem.steps[currentStepIndex].desc }}
          </div>
          <button v-if="!showingOutput" class="run-btn" @click="runStep">
            ▶ 执行
          </button>
          <transition name="fade">
            <div v-if="showingOutput" class="step-output">
              <pre>{{ currentProblem.steps[currentStepIndex].output }}</pre>
            </div>
          </transition>
          <button
            v-if="showingOutput && currentStepIndex < currentProblem.steps.length - 1"
            class="next-btn"
            @click="nextStep"
          >
            下一步 →
          </button>
          <div
            v-if="showingOutput && currentStepIndex === currentProblem.steps.length - 1"
            class="done-badge"
          >
            ✅ 问题解决！
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>排查口诀：</strong>先确认服务有没有启动（lsof / netstat），再确认端口对不对，最后确认是不是跨域问题。90% 的 localhost 问题都逃不出这三步。
    </div>
  </div>
</template>

<style scoped>
.port-troubleshoot-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.panel-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.problem-tabs {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.visualization-area {
  padding: 1rem;
}

.error-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid var(--vp-c-red-1);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.error-icon {
  font-size: 1.5rem;
}

.error-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.error-symptom {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-c-red-1);
}

.error-message {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

.fix-steps {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.fix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 600;
}

.reset-btn {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  background: var(--vp-c-bg);
  cursor: pointer;
  color: var(--vp-c-text-3);
}

.step-content {
  padding: 0.75rem;
}

.step-cmd {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #1e1e2e;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.prompt {
  color: #10b981;
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
}

.step-cmd code {
  color: #cdd6f4;
  font-size: 0.82rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.run-btn, .next-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
}

.next-btn {
  background: var(--vp-c-green-1);
  margin-top: 0.5rem;
}

.step-output {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #1e1e2e;
  border-radius: 4px;
}

.step-output pre {
  color: #a6adc8;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.done-badge {
  margin-top: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  font-weight: 700;
  color: var(--vp-c-green-1);
  font-size: 0.9rem;
}

.info-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
