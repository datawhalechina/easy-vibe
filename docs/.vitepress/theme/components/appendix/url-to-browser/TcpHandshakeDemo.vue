<template>
  <div class="tcp-handshake-demo">
    <div class="demo-header">
      <span class="title">TCP 三次握手</span>
      <span class="subtitle">建立可靠连接的过程</span>
    </div>

    <div class="handshake-flow">
      <div class="actor client">
        <span class="actor-icon">🧑‍💻</span>
        <span class="actor-name">客户端</span>
      </div>

      <div class="messages">
        <div class="message-row">
          <span class="msg-label">SYN</span>
          <span class="msg-arrow">→</span>
          <span class="msg-desc">"我能连你吗？"</span>
        </div>
        <div class="message-row">
          <span class="msg-desc">"能，你也能收到我吗？"</span>
          <span class="msg-arrow">←</span>
          <span class="msg-label">SYN-ACK</span>
        </div>
        <div class="message-row">
          <span class="msg-label">ACK</span>
          <span class="msg-arrow">→</span>
          <span class="msg-desc">"能，开始吧！"</span>
        </div>
      </div>

      <div class="actor server">
        <span class="actor-icon">🖥️</span>
        <span class="actor-name">服务器</span>
      </div>
    </div>

    <div class="status-bar">
      <span class="status-badge success">✓ 连接已建立</span>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      三次握手确保双方都能收发数据，就像打电话时互相确认"能听到吗"。
    </div>
  </div>
</template>

<style scoped>
.tcp-handshake-demo {
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

.handshake-flow {
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

.message-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.msg-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
  min-width: 50px;
  text-align: center;
}

.msg-arrow {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.msg-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  flex: 1;
  text-align: center;
}

.status-bar {
  text-align: center;
  margin-bottom: 0.75rem;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.success {
  background: #d1fae5;
  color: #059669;
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
