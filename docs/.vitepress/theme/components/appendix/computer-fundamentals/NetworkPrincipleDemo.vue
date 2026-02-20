<template>
  <div class="network-principle-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">网络基本原理</span>
      <span class="subtitle">数据如何在网络中传输</span>
    </div>

    <div class="principle-cards">
      <div
        v-for="(principle, index) in principles"
        :key="index"
        class="principle-card"
      >
        <div class="card-icon">{{ principle.icon }}</div>
        <div class="card-title">{{ principle.title }}</div>
        <div class="card-desc">{{ principle.desc }}</div>
      </div>
    </div>

    <div class="data-flow">
      <div class="flow-title">数据传输流程</div>
      <div class="flow-diagram">
        <div class="flow-step">
          <div class="step-icon">📤</div>
          <div class="step-text">发送方</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">📦</div>
          <div class="step-text">封装数据包</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">🌐</div>
          <div class="step-text">网络传输</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-icon">📥</div>
          <div class="step-text">接收方</div>
        </div>
      </div>
    </div>

    <div class="key-concepts">
      <div class="concepts-title">核心概念</div>
      <div class="concepts-list">
        <div class="concept-item">
          <div class="concept-name">IP 地址</div>
          <div class="concept-value">192.168.1.100</div>
          <div class="concept-desc">设备的网络地址</div>
        </div>
        <div class="concept-item">
          <div class="concept-name">端口</div>
          <div class="concept-value">80, 443, 22</div>
          <div class="concept-desc">应用程序的标识</div>
        </div>
        <div class="concept-item">
          <div class="concept-name">协议</div>
          <div class="concept-value">HTTP, TCP/IP</div>
          <div class="concept-desc">通信的规则</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const principles = [
  {
    icon: '📡',
    title: '分组交换',
    desc: '数据被分成小块独立传输，然后重组'
  },
  {
    icon: '🔄',
    title: '路由转发',
    desc: '路由器根据地址决定数据包的转发路径'
  },
  {
    icon: '📋',
    title: '协议分层',
    desc: '不同层次负责不同的通信功能'
  },
  {
    icon: '🔐',
    title: '可靠传输',
    desc: 'TCP 确保数据完整、有序地到达目的地'
  }
]
</script>

<style scoped>
.network-principle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.principle-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.principle-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.data-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flow-step {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step-text {
  font-size: 0.85rem;
  font-weight: 600;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.key-concepts {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.concepts-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.concepts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.concept-item {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.concept-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.concept-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.concept-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
