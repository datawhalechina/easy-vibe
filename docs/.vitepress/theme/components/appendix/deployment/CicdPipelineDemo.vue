<!--
  CicdPipelineDemo.vue
  CI/CD 流水线：自动炒菜机隐喻
-->
<template>
  <div class="cicd">
    <div class="header">
      <div>
        <div class="title">自动化流水线 (CI/CD)</div>
        <div class="subtitle">就像一台“全自动炒菜机”</div>
      </div>
      <div class="actions">
        <label class="fail-toggle"><input type="checkbox" v-model="failTest" /> 混入一颗烂菜 (模拟报错)</label>
        <button :disabled="running" @click="run" class="run-btn">
          {{ running ? '机器运转中...' : '开始做菜 (触发构建)' }}
        </button>
      </div>
    </div>

    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.id">
        <div class="step-head">
          <span class="badge" :class="step.status">{{
            statusIcon(step.status)
          }}</span>
          <span class="name">{{ step.name }}</span>
        </div>
        <div class="analogy">{{ step.analogy }}</div>
        <div class="desc">{{ step.desc }}</div>
      </div>
    </div>

    <div class="log" v-if="log">
      <div class="log-title">🖥️ 机器日志</div>
      <pre><code>{{ log }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref([
  {
    id: 'install',
    name: '安装依赖 (Install)',
    analogy: '🥬 准备食材',
    desc: 'npm install',
    status: 'idle'
  },
  { 
    id: 'test', 
    name: '自动测试 (Test)', 
    analogy: '🔍 食品安检', 
    desc: 'npm test', 
    status: 'idle' 
  },
  {
    id: 'build',
    name: '打包构建 (Build)',
    analogy: '🍳 下锅烹饪',
    desc: 'npm run build',
    status: 'idle'
  },
  {
    id: 'deploy',
    name: '自动部署 (Deploy)',
    analogy: '🍽️ 端上桌',
    desc: 'pm2 restart',
    status: 'idle'
  }
])

const running = ref(false)
const failTest = ref(false)
const log = ref('')

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const statusIcon = (status) => {
  if (status === 'done') return '✔'
  if (status === 'running') return '⏳'
  if (status === 'fail') return '✖'
  return '•'
}

const reset = () => {
  steps.value = steps.value.map((s) => ({ ...s, status: 'idle' }))
  log.value = ''
}

const run = async () => {
  if (running.value) return
  running.value = true
  reset()

  const timeline = [
    {
      id: 'install',
      ms: 1000,
      log: '> 正在去菜市场买菜...\n> 成功买到 842 个包裹 (node_modules)'
    },
    {
      id: 'test',
      ms: 800,
      log: '> 正在检查食材新鲜度...\n> 单元测试运行中...'
    },
    { 
      id: 'build', 
      ms: 1200, 
      log: '> 开始烹饪...\n> 正在压缩混淆代码...\n> 产出 dist/ 目录 (一盘好菜)' 
    },
    {
      id: 'deploy',
      ms: 1000,
      log: '> 正在把菜端给顾客...\n> 重启服务器...\n> 上线成功！'
    }
  ]

  for (const item of timeline) {
    const step = steps.value.find((s) => s.id === item.id)
    step.status = 'running'
    log.value = item.log
    await wait(item.ms)

    if (item.id === 'test' && failTest.value) {
      step.status = 'fail'
      log.value = '❌ 警告：发现一颗烂白菜！(测试失败)\n❌ 立即停机，防止端给顾客。'
      steps.value
        .filter((s) => s.id !== 'test')
        .forEach((s) => (s.status = 'idle'))
      running.value = false
      return
    }

    step.status = 'done'
  }

  log.value = '✅ 流程结束：大家吃得很开心 (服务正常运行)'
  running.value = false
}
</script>

<style scoped>
.cicd {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.title {
  font-weight: 800;
  font-size: 18px;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.fail-toggle {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.run-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: opacity 0.2s;
}
.run-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 2px solid var(--vp-c-divider);
  font-size: 12px;
}

.badge.running {
  border-color: #f59e0b;
  color: #f59e0b;
}
.badge.done {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}
.badge.fail {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.name {
  font-weight: 700;
  font-size: 14px;
}

.analogy {
  color: var(--vp-c-brand);
  font-size: 13px;
  font-weight: 600;
  margin-left: 32px;
}

.desc {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-left: 32px;
  font-family: var(--vp-font-family-mono);
}

.log {
  background: #1e1e20;
  border-radius: 10px;
  padding: 12px;
  color: #eee;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.log-title {
  font-weight: 700;
  margin-bottom: 8px;
  color: #aaa;
  font-size: 12px;
  text-transform: uppercase;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>
