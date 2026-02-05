<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>HTTP 请求结构解析</h4>
      <p class="hint">详解 HTTP 请求的组成部分</p>
    </div>
    <div class="demo-content">
      <div class="structure-box">
        <div class="section request-line">
          <div class="label">请求行</div>
          <div class="content">
            <code>GET /api/users/123 HTTP/1.1</code>
          </div>
          <div class="explain">
            <span>方法</span> + <span>路径</span> + <span>协议版本</span>
          </div>
        </div>

        <div class="section headers">
          <div class="label">请求头</div>
          <div class="content header-list">
            <div><code>Host: api.example.com</code></div>
            <div><code>Content-Type: application/json</code></div>
            <div><code>Authorization: Bearer token123</code></div>
          </div>
          <div class="explain">元信息：域名、数据格式、认证等</div>
        </div>

        <div class="section body">
          <div class="label">请求体 (可选)</div>
          <div class="content">
            <pre>{
  "name": "张三",
  "email": "zhangsan@example.com"
}</pre>
          </div>
          <div class="explain">POST/PUT 请求携带的数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 纯静态展示组件
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.structure-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid var(--vp-c-brand);
}

.section.headers {
  border-left-color: #67c23a;
}

.section.body {
  border-left-color: #e6a23c;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  font-size: 14px;
}

.content {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
  overflow-x: auto;
}

.content code {
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
}

.content pre {
  margin: 0;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.header-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.explain {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.explain span {
  display: inline-block;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}
</style>
