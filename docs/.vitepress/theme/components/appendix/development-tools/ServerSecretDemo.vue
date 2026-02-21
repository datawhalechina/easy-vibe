<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">生产环境如何注入密钥</span>
      <span class="subtitle">.env 是开发工具，服务器上不能靠它</span>
    </div>

    <div class="tab-bar">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="tab-btn"
        :class="{ active: current === s.id }"
        @click="current = s.id"
      >
        {{ s.icon }} {{ s.label }}
      </button>
    </div>

    <div class="scenario-body">
      <div class="code-block">
        <div class="code-title">{{ currentScenario.codeTitle }}</div>
        <div class="code-area">
          <div
            v-for="(line, i) in currentScenario.lines"
            :key="i"
            class="code-line"
            :class="line.type"
          >
            <span class="line-content" v-html="line.text" />
          </div>
        </div>
      </div>

      <div class="tips">
        <div v-for="tip in currentScenario.tips" :key="tip.text" class="tip" :class="tip.level">
          <span class="tip-dot" />
          <span class="tip-text">{{ tip.text }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>原则：</strong>.env 文件是本地开发便利工具，生产环境应由运行平台负责注入环境变量——代码完全不感知密钥存在哪、怎么来的。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const current = ref('systemd')

const scenarios = [
  { id: 'systemd', icon: '🖥️', label: '服务器 (systemd)' },
  { id: 'cloud', icon: '☁️', label: '云平台 (Vercel 等)' },
  { id: 'docker', icon: '🐳', label: 'Docker' }
]

const scenarioData = {
  systemd: {
    codeTitle: '/etc/systemd/system/myapp.service',
    lines: [
      { type: 'comment', text: '# 推荐：用独立密钥文件，权限可控' },
      { type: 'normal', text: '[Service]' },
      { type: 'highlight', text: 'EnvironmentFile=/etc/myapp/secrets.env' },
      { type: 'normal', text: 'ExecStart=/usr/bin/node /app/index.js' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# 设置文件权限：只有所有者可读' },
      { type: 'good', text: 'sudo chmod 600 /etc/myapp/secrets.env' },
      { type: 'good', text: 'sudo chown deploy:deploy /etc/myapp/secrets.env' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# 应用配置后重启服务' },
      { type: 'normal', text: 'sudo systemctl daemon-reload' },
      { type: 'normal', text: 'sudo systemctl restart myapp' }
    ],
    tips: [
      { level: 'safe', text: '密钥文件 chmod 600 后，只有 deploy 用户可读，其他账号无法访问' },
      { level: 'safe', text: '密钥和代码完全分离，更新密钥不需要重新部署代码' },
      { level: 'warn', text: '不要直接在 systemd 文件里写 Environment="KEY=val"——改动需要 reload，且明文在配置里' }
    ]
  },
  cloud: {
    codeTitle: '云平台控制台（Vercel / Railway / Render / Netlify）',
    lines: [
      { type: 'comment', text: '# 在平台控制台界面操作，无需写配置文件' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# 平台会自动将变量注入到运行时环境' },
      { type: 'normal', text: '# 代码不变，照常读取：' },
      { type: 'highlight', text: 'const key = process.env.OPENAI_API_KEY' },
      { type: 'highlight', text: 'api_key = os.environ.get("OPENAI_API_KEY")' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# 通常支持按环境设置不同的值：' },
      { type: 'normal', text: '# Preview  → OPENAI_API_KEY = sk-test-...' },
      { type: 'normal', text: '# Production → OPENAI_API_KEY = sk-prod-...' }
    ],
    tips: [
      { level: 'safe', text: '平台加密存储密钥，你自己都不能再次查看原始值（只能重新生成）' },
      { level: 'safe', text: '支持 Preview / Production 分环境设置，测试和生产用不同密钥' },
      { level: 'info', text: '不要把 .env 文件提交到 Git 再让平台读取——这样密钥就进代码仓库了' }
    ]
  },
  docker: {
    codeTitle: 'docker run / docker-compose.yml',
    lines: [
      { type: 'comment', text: '# ❌ 错误：写在 Dockerfile ENV 里会固化到镜像层' },
      { type: 'bad', text: 'ENV OPENAI_API_KEY=sk-xxx  <span class="warn-inline">← 任何人都能 docker inspect 取到</span>' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# ✅ 正确：运行时从宿主机环境注入' },
      { type: 'highlight', text: 'docker run \\' },
      { type: 'highlight', text: '  -e OPENAI_API_KEY="$OPENAI_API_KEY" \\' },
      { type: 'highlight', text: '  -e DATABASE_URL="$DATABASE_URL" \\' },
      { type: 'highlight', text: '  myapp:latest' },
      { type: 'normal', text: '' },
      { type: 'comment', text: '# 或用 --env-file（文件不进 Git）' },
      { type: 'good', text: 'docker run --env-file .env myapp:latest' }
    ],
    tips: [
      { level: 'safe', text: '镜像本身不含任何密钥，可以安全上传到公开 Registry' },
      { level: 'safe', text: '--env-file 在运行时读取，文件不需要进入镜像' },
      { level: 'warn', text: 'docker history 可以查看所有镜像层内容——写在 Dockerfile ENV 里就永远泄露了' }
    ]
  }
}

const currentScenario = computed(() => scenarioData[current.value])
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.tab-bar {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.28rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
  white-space: nowrap;
}

.tab-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.tab-btn.active { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: white; }

.scenario-body {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .scenario-body { grid-template-columns: 1fr; }
}

.code-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  min-width: 0;
}

.code-title {
  background: var(--vp-c-bg-alt);
  padding: 0.3rem 0.65rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-area {
  background: #1e1e2e;
  padding: 0.45rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line {
  padding: 0 0.7rem;
  min-width: max-content;
}

.code-line.highlight { background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent); }
.code-line.good { background: color-mix(in srgb, #4ade80 6%, transparent); }
.code-line.bad { background: color-mix(in srgb, #f87171 10%, transparent); }

.line-content { color: #cdd6f4; white-space: pre; }
.code-line.comment .line-content { color: #6c7086; font-style: italic; }
.code-line.bad .line-content { color: #f38ba8; }
.code-line.good .line-content { color: #a6e3a1; }

:deep(.warn-inline) { color: #f87171; font-size: 0.7em; }

.tips {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.tip {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 0.45rem 0.6rem;
  border-left: 3px solid;
}

.tip.safe { border-left-color: var(--vp-c-green-1); }
.tip.warn { border-left-color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info { border-left-color: var(--vp-c-brand); }

.tip-dot { flex-shrink: 0; margin-top: 5px; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.tip.safe .tip-dot { color: var(--vp-c-green-1); }
.tip.warn .tip-dot { color: var(--vp-c-yellow-1, #f59e0b); }
.tip.info .tip-dot { color: var(--vp-c-brand); }

.tip-text {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: var(--vp-c-text-1); }
</style>
