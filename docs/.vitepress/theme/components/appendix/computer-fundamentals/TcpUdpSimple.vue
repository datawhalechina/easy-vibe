<template>
  <div class="tcp-udp-simple">
    <div class="comparison-container">
      <div
        :class="['protocol-card', { active: activeTab === 'tcp' }]"
        @click="activeTab = 'tcp'"
      >
        <div class="card-header">
          <span class="card-icon">📨</span>
          <span class="card-title">TCP</span>
          <span class="card-subtitle">可靠传输</span>
        </div>
        <div class="card-body">
          <div class="feature">
            <span class="feature-icon">✅</span>
            <span>保证数据送达</span>
          </div>
          <div class="feature">
            <span class="feature-icon">📞</span>
            <span>需要先建立连接</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🐢</span>
            <span>速度较慢</span>
          </div>
        </div>
        <div class="card-example">网页浏览、邮件、文件下载</div>
      </div>

      <div class="vs-badge">VS</div>

      <div
        :class="['protocol-card', { active: activeTab === 'udp' }]"
        @click="activeTab = 'udp'"
      >
        <div class="card-header">
          <span class="card-icon">📮</span>
          <span class="card-title">UDP</span>
          <span class="card-subtitle">快速传输</span>
        </div>
        <div class="card-body">
          <div class="feature">
            <span>速度极快</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🚀</span>
            <span>不需要建立连接</span>
          </div>
          <div class="feature">
            <span class="feature-icon">❓</span>
            <span>可能丢包</span>
          </div>
        </div>
        <div class="card-example">视频通话、在线游戏、直播</div>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-title">📦 生活类比</div>
      <div class="analogy-content">
        <div class="analogy-item">
          <strong>TCP</strong> = 挂号信（要签收，丢了重发）
        </div>
        <div class="analogy-item">
          <strong>UDP</strong> = 平信（直接扔信箱，不管丢没丢）
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tcp')
</script>

<style scoped>
.tcp-udp-simple {
  margin: 20px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.comparison-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto 20px;
  flex-wrap: wrap;
}

.protocol-card {
  flex: 1;
  min-width: 260px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.protocol-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.protocol-card.active {
  border-color: #667eea;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
}

.card-header {
  text-align: center;
  margin-bottom: 16px;
}

.card-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 8px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 14px;
  color: #666;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.feature-icon {
  font-size: 18px;
}

.card-example {
  text-align: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
}

.vs-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.analogy {
  max-width: 700px;
  margin: 20px auto 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.analogy-title {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

.analogy-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.analogy-item {
  font-size: 14px;
  color: #555;
}

@media (max-width: 640px) {
  .comparison-container {
    flex-direction: column;
  }

  .vs-badge {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }

  .protocol-card {
    width: 100%;
  }
}
</style>
