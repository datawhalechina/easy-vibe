<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">.env 文件 + 代码读取</span>
      <span class="subtitle">左边写配置，右边读取——两者之间只有变量名这一条线</span>
    </div>

    <div class="lang-tabs">
      <button
        v-for="lang in langs"
        :key="lang.id"
        class="lang-tab"
        :class="{ active: currentLang === lang.id }"
        @click="currentLang = lang.id"
      >
        {{ lang.label }}
      </button>
    </div>

    <div class="two-col">
      <!-- Left: .env file -->
      <div class="file-panel">
        <div class="file-title">
          <span class="file-icon">📄</span> .env
          <span class="file-badge no-commit">不提交 Git</span>
        </div>
        <div class="code-area">
          <div v-for="(line, i) in envLines" :key="i" class="code-line" :class="line.type">
            <span
              v-if="line.key"
              class="env-key"
              :class="{ active: hoveredKey === line.key }"
              @mouseenter="hoveredKey = line.key"
              @mouseleave="hoveredKey = null"
            >{{ line.key }}</span>
            <span v-if="line.key" class="env-eq">=</span>
            <span v-if="line.key" class="env-val">{{ line.value }}</span>
            <span v-else class="env-comment">{{ line.text }}</span>
          </div>
        </div>
        <div class="file-title example">
          <span class="file-icon">📋</span> .env.example
          <span class="file-badge can-commit">可以提交 Git</span>
        </div>
        <div class="code-area dim">
          <div v-for="(line, i) in exampleLines" :key="i" class="code-line" :class="line.type">
            <span v-if="line.key" class="env-key">{{ line.key }}</span>
            <span v-if="line.key" class="env-eq">=</span>
            <span v-if="line.key" class="env-val empty">（值留空）</span>
            <span v-else class="env-comment">{{ line.text }}</span>
          </div>
        </div>
      </div>

      <!-- Right: code -->
      <div class="code-panel">
        <div class="file-title">
          <span class="file-icon">💻</span> {{ currentLangObj.filename }}
        </div>
        <div class="code-area">
          <div v-for="(line, i) in currentLangObj.lines" :key="i" class="code-line" :class="line.type">
            <span class="line-content" v-html="line.text" />
          </div>
        </div>
        <div class="read-result">
          <div class="result-title">程序实际读到的值</div>
          <div v-for="kv in readResults" :key="kv.key" class="result-row">
            <span
              class="result-key"
              :class="{ active: hoveredKey === kv.key }"
              @mouseenter="hoveredKey = kv.key"
              @mouseleave="hoveredKey = null"
            >{{ kv.key }}</span>
            <span class="result-arrow">→</span>
            <span class="result-val">{{ kv.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>工作流程：</strong><code>load_dotenv()</code> / <code>import 'dotenv/config'</code> 在启动时读取 <code>.env</code> 文件，把里面的键值注入到进程环境变量中，代码里再用 <code>os.environ</code> 或 <code>process.env</code> 读取，两端只靠变量名连接。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const hoveredKey = ref(null)
const currentLang = ref('python')

const langs = [
  { id: 'python', label: 'Python' },
  { id: 'node', label: 'Node.js' }
]

const envLines = [
  { type: 'comment', text: '# 本地开发配置，不提交到 Git' },
  { key: 'OPENAI_API_KEY', value: 'sk-proj-abc123...' },
  { key: 'DATABASE_URL', value: 'postgresql://localhost/dev' },
  { key: 'PORT', value: '3000' },
  { key: 'NODE_ENV', value: 'development' }
]

const exampleLines = [
  { type: 'comment', text: '# 复制为 .env，填入真实值' },
  { key: 'OPENAI_API_KEY', value: '' },
  { key: 'DATABASE_URL', value: '' },
  { key: 'PORT', value: '' },
  { key: 'NODE_ENV', value: '' }
]

const readResults = [
  { key: 'OPENAI_API_KEY', value: 'sk-proj-abc123...' },
  { key: 'DATABASE_URL', value: 'postgresql://localhost/dev' },
  { key: 'PORT', value: '3000' }
]

const pythonLines = [
  { type: 'comment', text: '# pip install python-dotenv openai' },
  { type: 'normal', text: 'from dotenv import load_dotenv' },
  { type: 'normal', text: 'import os, openai' },
  { type: 'normal', text: '&nbsp;' },
  { type: 'highlight', text: 'load_dotenv()  <span class="comment-inline"># 读取 .env 文件</span>' },
  { type: 'normal', text: '&nbsp;' },
  { type: 'normal', text: 'client = openai.OpenAI(' },
  { type: 'highlight', text: '  api_key=os.environ.get(<span class="key-ref">"OPENAI_API_KEY"</span>)' },
  { type: 'normal', text: ')' },
  { type: 'normal', text: '&nbsp;' },
  { type: 'normal', text: 'db = os.environ.get(<span class="key-ref">"DATABASE_URL"</span>)' },
  { type: 'normal', text: 'port = int(os.environ.get(<span class="key-ref">"PORT"</span>, 8000))' }
]

const nodeLines = [
  { type: 'comment', text: '# npm install dotenv openai' },
  { type: 'highlight', text: "import 'dotenv/config'  <span class=\"comment-inline\">// 读取 .env 文件</span>" },
  { type: 'normal', text: "import OpenAI from 'openai'" },
  { type: 'normal', text: '&nbsp;' },
  { type: 'normal', text: 'const client = new OpenAI({' },
  { type: 'highlight', text: '  apiKey: process.env.<span class="key-ref">OPENAI_API_KEY</span>' },
  { type: 'normal', text: '})' },
  { type: 'normal', text: '&nbsp;' },
  { type: 'normal', text: 'const db = process.env.<span class="key-ref">DATABASE_URL</span>' },
  { type: 'normal', text: 'const port = process.env.<span class="key-ref">PORT</span> ?? 8000' }
]

const currentLangObj = computed(() => {
  if (currentLang.value === 'python') {
    return { filename: 'main.py', lines: pythonLines }
  }
  return { filename: 'index.js', lines: nodeLines }
})
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
  margin-bottom: 0.75rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.lang-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.lang-tab {
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
}

.lang-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 620px) {
  .two-col { grid-template-columns: 1fr; }
}

.file-panel, .code-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.file-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.file-title.example {
  border-top: 1px solid var(--vp-c-divider);
}

.file-icon { flex-shrink: 0; }

.file-badge {
  margin-left: auto;
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-base);
}

.file-badge.no-commit { background: color-mix(in srgb, #f87171 15%, transparent); color: #ef4444; }
.file-badge.can-commit { background: color-mix(in srgb, var(--vp-c-green-1) 15%, transparent); color: var(--vp-c-green-1); }

.code-area {
  background: #1e1e2e;
  padding: 0.45rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.77rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-area.dim { background: #16131e; opacity: 0.75; }

.code-line {
  padding: 0 0.65rem;
  display: flex;
  align-items: baseline;
  gap: 0;
  min-width: max-content;
}

.code-line.highlight { background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent); }
.code-line.comment .env-comment { color: #6c7086; font-style: italic; }

.env-key {
  color: var(--vp-c-brand);
  font-weight: bold;
  cursor: default;
  transition: background 0.15s;
  border-radius: 2px;
  padding: 0 1px;
}

.env-key.active { background: color-mix(in srgb, var(--vp-c-brand) 25%, transparent); }
.env-eq { color: #45475a; margin: 0 1px; }
.env-val { color: #a6e3a1; }
.env-val.empty { color: #45475a; font-style: italic; }
.env-comment { color: #6c7086; font-style: italic; }

.line-content { color: #cdd6f4; white-space: pre; }
.code-line.comment .line-content { color: #6c7086; font-style: italic; }
.code-line.highlight .line-content { color: #cdd6f4; }

:deep(.key-ref) { color: var(--vp-c-brand); font-weight: bold; }
:deep(.comment-inline) { color: #6c7086; font-style: italic; }

.read-result {
  background: #11111b;
  border-top: 1px solid #313244;
  padding: 0.5rem 0.65rem;
}

.result-title {
  font-size: 0.68rem;
  color: #6c7086;
  margin-bottom: 0.3rem;
  font-family: var(--vp-font-family-base);
}

.result-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}

.result-key {
  color: var(--vp-c-brand);
  font-weight: bold;
  cursor: default;
  border-radius: 2px;
  padding: 0 1px;
  transition: background 0.15s;
}

.result-key.active { background: color-mix(in srgb, var(--vp-c-brand) 25%, transparent); }
.result-arrow { color: #45475a; }
.result-val { color: #a6e3a1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

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

.info-box code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
  font-size: 0.8rem;
}
</style>
