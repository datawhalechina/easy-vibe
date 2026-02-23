<template>
  <div class="http-exchange-demo">
    <div class="demo-header">
      <span class="title">HTTP 请求/响应</span>
      <span class="subtitle">浏览器与服务器的对话</span>
    </div>

    <div class="exchange-flow">
      <div class="actor browser">
        <span class="actor-icon">🧑‍💻</span>
        <span class="actor-name">浏览器</span>
      </div>

      <div class="messages">
        <div class="request-box">
          <span class="method">GET</span>
          <span class="path">/search?q=hello</span>
          <span class="arrow">→</span>
        </div>
        <div class="response-box">
          <span class="arrow">←</span>
          <span class="status">200 OK</span>
          <span class="size">HTML 页面</span>
        </div>
      </div>

      <div class="actor server">
        <span class="actor-icon">🖥️</span>
        <span class="actor-name">服务器</span>
      </div>
    </div>

    <div class="code-preview">
      <div class="code-block">
        <div class="code-header">请求</div>
        <code>GET /search?q=hello HTTP/1.1</code>
        <code>Host: www.google.com</code>
      </div>
      <div class="code-block">
        <div class="code-header">响应</div>
        <code>HTTP/1.1 200 OK</code>
        <code>Content-Type: text/html</code>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      HTTP 是请求-响应模式：浏览器发送请求，服务器返回状态码和响应内容。
    </div>
  </div>
</template>

<style scoped>
.http-exchange-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header {
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  display: block;
}

.demo-header .subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.exchange-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin-bottom: 0.75rem;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.actor-icon {
  font-size: 1.5rem;
}

.actor-name {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.request-box,
.response-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.method {
  font-size: 0.75rem;
  font-weight: bold;
  color: #2563eb;
  font-family: var(--vp-font-family-mono);
}

.path {
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.status {
  font-size: 0.75rem;
  font-weight: bold;
  color: #059669;
  font-family: var(--vp-font-family-mono);
}

.size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.arrow {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.code-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
}

.code-header {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block code {
  display: block;
  font-size: 0.7rem;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  line-height: 1.5;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background-color: var(--vp-c-bg-alt);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
</style>
