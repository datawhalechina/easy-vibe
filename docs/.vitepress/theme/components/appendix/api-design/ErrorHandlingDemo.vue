<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>错误处理演示</h4>
      <p class="hint">展示RESTful API中的错误处理机制</p>
    </div>
    <div class="demo-content">
      <div class="error-types">
        <div class="error-item">
          <span class="code">400</span>
          <span class="name">Bad Request</span>
          <span class="desc">请求参数错误</span>
        </div>
        <div class="error-item">
          <span class="code">401</span>
          <span class="name">Unauthorized</span>
          <span class="desc">未授权访问</span>
        </div>
        <div class="error-item">
          <span class="code">404</span>
          <span class="name">Not Found</span>
          <span class="desc">资源不存在</span>
        </div>
        <div class="error-item">
          <span class="code">500</span>
          <span class="name">Server Error</span>
          <span class="desc">服务器内部错误</span>
        </div>
      </div>
    </div>
  </div>
</template>

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

.error-types {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.error-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 4px solid #f56c6c;
}

.error-item .code {
  font-family: monospace;
  font-weight: 600;
  color: #f56c6c;
  font-size: 16px;
  min-width: 50px;
}

.error-item .name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 120px;
}

.error-item .desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
