<!--
  ApiDocumentDemo.vue - 紧凑版
  目标：演示如何阅读 API 文档
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">📖</span>
      <span class="title">API 文档翻译机</span>
    </div>

    <div class="demo-layout">
      <div class="left-panel">
        <div class="doc-section">
          <div class="doc-title">Base URL</div>
          <code class="doc-code">https://api.deepseek.com</code>
        </div>

        <div class="doc-section">
          <div class="doc-title">Endpoint</div>
          <code class="doc-code">POST /v1/chat/completions</code>
        </div>

        <div class="doc-section">
          <div class="doc-title">Headers</div>
          <pre class="doc-pre">
Authorization: Bearer sk-xxx
Content-Type: application/json</pre>
        </div>

        <div class="doc-section">
          <div class="doc-title">Body 参数</div>
          <div class="params-list">
            <div class="param-item">
              <span class="p-name">model</span>
              <span class="p-req">必填</span>
              <span class="p-desc">模型名称</span>
            </div>
            <div class="param-item">
              <span class="p-name">messages</span>
              <span class="p-req">必填</span>
              <span class="p-desc">对话消息</span>
            </div>
            <div class="param-item">
              <span class="p-name">temperature</span>
              <span class="p-opt">可选</span>
              <span class="p-desc">0-2，默认1</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="result-title">翻译成代码</div>
        <pre class="result-code"><code>from openai import OpenAI

client = OpenAI(
    api_key="sk-xxx",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "你好"}]
)</code></pre>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span>看文档找三样：地址（Base
        URL）、鉴权（Authorization）、参数（Parameters）。</span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
}

.left-panel {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid var(--vp-c-divider);
}

.right-panel {
  width: 280px;
  padding: 12px;
  background: var(--vp-c-bg);
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .left-panel {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .right-panel {
    width: 100%;
  }
}

.doc-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.doc-title {
  padding: 6px 10px;
  background: var(--vp-c-bg-alt);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-code {
  display: block;
  padding: 8px 10px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.doc-pre {
  margin: 0;
  padding: 8px 10px;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

.params-list {
  padding: 6px 10px;
}

.param-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 0.75rem;
}

.p-name {
  font-family: monospace;
  font-weight: 600;
}

.p-req {
  background: #fee2e2;
  color: #991b1b;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.65rem;
}

.p-opt {
  background: #dbeafe;
  color: #1e40af;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.65rem;
}

.p-desc {
  color: var(--vp-c-text-3);
}

.result-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.result-code {
  margin: 0;
  padding: 10px;
  background: #1e293b;
  border-radius: 6px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.7rem;
  line-height: 1.5;
  color: #e2e8f0;
  overflow-x: auto;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
