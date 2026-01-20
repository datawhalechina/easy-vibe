<!--
  ApiDocumentDemo.vue - 简化版
  目标：用简单的示例展示如何阅读 API 文档
-->
<template>
  <div class="demo">
    <div class="title">📖 怎么读 API 文档？</div>
    <p class="subtitle">找到这 3 个信息就够了</p>

    <div class="doc-example">
      <div class="doc-header">API 文档示例</div>
      <div class="doc-body">
        <div class="section">
          <div class="section-title">📍 1️⃣ 入口在哪</div>
          <div class="section-content">
            <code>GET /api/users/{id}</code>
            <p class="hint">这就是你要调用的"按钮"</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📝 2️⃣ 要填什么</div>
          <div class="section-content">
            <div class="param">
              <span class="param-name">id</span>
              <span class="param-desc">用户编号（必填）</span>
            </div>
            <p class="hint">你需要提供这个参数</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">✅ 3️⃣ 会得到什么</div>
          <div class="section-content">
            <pre><code>{
  "id": "123",
  "name": "张三",
  "email": "zhang@example.com"
}</code></pre>
            <p class="hint">成功时返回的数据格式</p>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <p><strong>💡 小贴士：</strong></p>
      <ul>
        <li>先确认这个 API 是不是你需要的</li>
        <li>再看要填什么参数（必填 vs 可选）</li>
        <li>最后看返回什么、失败会怎样</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 无需脚本逻辑
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.doc-example {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.doc-header {
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-body {
  padding: 16px;
}

.section {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.section-content {
  margin-left: 0;
}

code {
  background: #1e293b;
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
}

.hint {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.param {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.param-name {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  font-weight: bold;
}

.param-desc {
  font-size: 13px;
  color: var(--vp-c-text-1);
}

pre {
  background: #1e293b;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

pre code {
  background: transparent;
  padding: 0;
  color: #e2e8f0;
  font-size: 12px;
  line-height: 1.5;
}

.tips {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.tips ul {
  margin: 8px 0 0 20px;
}

.tips li {
  margin: 4px 0;
}
</style>
