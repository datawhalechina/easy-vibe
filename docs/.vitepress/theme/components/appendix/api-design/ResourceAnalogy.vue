<template>
  <div class="demo-container">
    <div class="demo-header">
      <h4>RESTful 资源类比</h4>
      <p class="hint">通过生活中的类比理解 RESTful 资源概念</p>
    </div>
    <div class="demo-content">
      <div class="analogy-box">
        <div class="analogy-item">
          <div class="icon">📚</div>
          <div class="text">
            <strong>资源 = 图书</strong>
            <p>每本书有唯一的 ISBN（资源标识）</p>
          </div>
        </div>
        <div class="analogy-item">
          <div class="icon">🏪</div>
          <div class="text">
            <strong>URL = 书架位置</strong>
            <p>/library/books/123 表示第 123 号书</p>
          </div>
        </div>
        <div class="analogy-item">
          <div class="icon">📝</div>
          <div class="text">
            <strong>HTTP 方法 = 操作</strong>
            <p>GET(查看)、POST(借书)、PUT(修改)、DELETE(还书)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 静态组件，无需逻辑
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

.analogy-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.analogy-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.icon {
  font-size: 24px;
  flex-shrink: 0;
}

.text {
  flex: 1;
}

.text strong {
  display: block;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.text p {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
