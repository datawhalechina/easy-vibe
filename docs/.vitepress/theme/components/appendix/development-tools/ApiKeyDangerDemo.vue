<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">硬编码密钥 vs 用环境变量</span>
      <span class="subtitle">同样的功能，两种写法，安全性天壤之别</span>
    </div>

    <div class="two-col">
      <!-- Bad -->
      <div class="panel bad">
        <div class="panel-title">
          <span class="icon">❌</span> 危险写法：密钥写在代码里
        </div>
        <div class="code-area">
          <div class="code-line comment"># Python</div>
          <div class="code-line normal">import openai</div>
          <div class="code-line normal">&nbsp;</div>
          <div class="code-line highlight-bad">client = openai.OpenAI(</div>
          <div class="code-line highlight-bad">  api_key=<span class="key-literal">"sk-proj-abc123..."</span></div>
          <div class="code-line highlight-bad">)</div>
        </div>
        <div class="consequences">
          <div v-for="c in badConsequences" :key="c" class="consequence bad-item">
            <span class="ci">💀</span><span>{{ c }}</span>
          </div>
        </div>
      </div>

      <!-- Good -->
      <div class="panel good">
        <div class="panel-title">
          <span class="icon">✅</span> 正确写法：从环境变量读取
        </div>
        <div class="code-area">
          <div class="code-line comment"># Python</div>
          <div class="code-line normal">import openai, os</div>
          <div class="code-line normal">&nbsp;</div>
          <div class="code-line highlight-good">client = openai.OpenAI(</div>
          <div class="code-line highlight-good">  api_key=<span class="key-env">os.environ.get(<span class="key-name">"OPENAI_API_KEY"</span>)</span></div>
          <div class="code-line highlight-good">)</div>
        </div>
        <div class="consequences">
          <div v-for="c in goodConsequences" :key="c" class="consequence good-item">
            <span class="ci">✅</span><span>{{ c }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>黄金法则：</strong>代码里出现密钥字符串 = 密钥已泄露。GitHub 的 Secret Scanner 会在推送后秒级扫描，发现 <code>sk-</code> 等前缀就通知厂商吊销。即使立刻删除提交，Git 历史里仍然保存着。
    </div>
  </div>
</template>

<script setup>
const badConsequences = [
  'git push 后，密钥就公开在 GitHub 上',
  '爬虫秒级扫描，密钥被盗用并产生费用',
  'GitHub Secret Scanner 自动吊销密钥',
  '删除提交也没用，Git 历史仍保留'
]

const goodConsequences = [
  '代码里没有任何密钥信息，可以安全开源',
  '不同环境（开发/测试/生产）用不同密钥',
  '密钥泄露时只需重新生成，不用改代码',
  '团队成员各用各的密钥，互不影响'
]
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

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 620px) {
  .two-col { grid-template-columns: 1fr; }
}

.panel {
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid;
  min-width: 0;
}

.panel.bad { border-color: #f87171; }
.panel.good { border-color: var(--vp-c-green-1); }

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  font-size: 0.82rem;
  font-weight: bold;
}

.panel.bad .panel-title { background: color-mix(in srgb, #f87171 15%, var(--vp-c-bg-alt)); color: #ef4444; }
.panel.good .panel-title { background: color-mix(in srgb, var(--vp-c-green-1) 12%, var(--vp-c-bg-alt)); color: var(--vp-c-green-1); }

.code-area {
  background: #1e1e2e;
  padding: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.77rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line {
  padding: 0 0.7rem;
  white-space: pre;
  min-width: max-content;
}

.code-line.comment { color: #6c7086; font-style: italic; }
.code-line.normal { color: #cdd6f4; }
.code-line.highlight-bad { background: color-mix(in srgb, #f87171 10%, transparent); color: #cdd6f4; }
.code-line.highlight-good { background: color-mix(in srgb, #4ade80 6%, transparent); color: #cdd6f4; }

.key-literal { color: #f38ba8; }
.key-env { color: #a6e3a1; }
.key-name { color: #89b4fa; }

.consequences {
  padding: 0.55rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: var(--vp-c-bg);
}

.consequence {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.76rem;
  line-height: 1.4;
}

.bad-item { color: color-mix(in srgb, #f87171 80%, var(--vp-c-text-2)); }
.good-item { color: var(--vp-c-text-2); }

.ci { flex-shrink: 0; font-size: 0.8rem; }

.info-box {
  display: block;
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-alt));
  border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: #ef4444; }

.info-box code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: #ef4444;
  font-size: 0.8rem;
}
</style>
