<template>
  <div class="tcp-udp-comparison">
    <div class="comparison-grid">
      <div class="protocol-card tcp">
        <div class="protocol-header">
          <div class="protocol-icon">🔒</div>
          <div class="protocol-title">TCP</div>
          <div class="protocol-subtitle">传输控制协议</div>
        </div>

        <div class="protocol-features">
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">可靠传输</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">面向连接</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">流量控制</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">拥塞控制</div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">✗</div>
            <div class="feature-text">速度较慢</div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">✗</div>
            <div class="feature-text">开销较大</div>
          </div>
        </div>

        <div class="protocol-example">
          <div class="example-title">应用场景</div>
          <div class="example-tags">
            <span class="tag">网页浏览</span>
            <span class="tag">文件传输</span>
            <span class="tag">邮件发送</span>
          </div>
        </div>

        <div class="handshake-demo">
          <div class="demo-title">三次握手</div>
          <div class="handshake-steps">
            <div class="step" :class="{ active: tcpStep >= 1 }">
              <div class="step-arrow">→</div>
              <div class="step-text">SYN</div>
            </div>
            <div class="step" :class="{ active: tcpStep >= 2 }">
              <div class="step-arrow">←</div>
              <div class="step-text">SYN-ACK</div>
            </div>
            <div class="step" :class="{ active: tcpStep >= 3 }">
              <div class="step-arrow">→</div>
              <div class="step-text">ACK</div>
            </div>
          </div>
          <button class="demo-btn" @click="startTcpHandshake">
            {{ tcpStep === 0 ? '演示握手' : '重新演示' }}
          </button>
        </div>
      </div>

      <div class="protocol-card udp">
        <div class="protocol-header">
          <div class="protocol-icon">⚡</div>
          <div class="protocol-title">UDP</div>
          <div class="protocol-subtitle">用户数据报协议</div>
        </div>

        <div class="protocol-features">
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">快速传输</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">开销小</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">无连接</div>
          </div>
          <div class="feature-item good">
            <div class="feature-icon">✓</div>
            <div class="feature-text">支持多播</div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">✗</div>
            <div class="feature-text">不可靠</div>
          </div>
          <div class="feature-item bad">
            <div class="feature-icon">✗</div>
            <div class="feature-text">可能丢包</div>
          </div>
        </div>

        <div class="protocol-example">
          <div class="example-title">应用场景</div>
          <div class="example-tags">
            <span class="tag">视频直播</span>
            <span class="tag">在线游戏</span>
            <span class="tag">语音通话</span>
          </div>
        </div>

        <div class="handshake-demo">
          <div class="demo-title">直接发送</div>
          <div class="handshake-steps">
            <div class="step direct">
              <div class="step-arrow">→</div>
              <div class="step-text">直接发送数据</div>
            </div>
          </div>
          <button class="demo-btn" @click="sendUdpData">
            {{ udpSent ? '再发一次' : '发送数据' }}
          </button>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>TCP</th>
            <th>UDP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>连接</td>
            <td>面向连接</td>
            <td>无连接</td>
          </tr>
          <tr>
            <td>可靠性</td>
            <td>可靠（确认重传）</td>
            <td>不可靠（尽最大努力）</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>较慢</td>
            <td>很快</td>
          </tr>
          <tr>
            <td>开销</td>
            <td>高（20字节头部）</td>
            <td>低（8字节头部）</td>
          </tr>
          <tr>
            <td>流量控制</td>
            <td>有（滑动窗口）</td>
            <td>无</td>
          </tr>
          <tr>
            <td>应用</td>
            <td>HTTP, FTP, SMTP, SSH</td>
            <td>DNS, DHCP, 视频流</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="real-world-example">
      <div class="example-title">🎬 实际应用示例</div>
      <div class="scenario-grid">
        <div class="scenario">
          <div class="scenario-icon">📺</div>
          <div class="scenario-name">视频直播</div>
          <div class="scenario-desc">
            使用 <strong>UDP</strong>，因为： <br />• 丢几帧没关系，关键是实时
            <br />• 重传会造成延迟和卡顿
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">🌐</div>
          <div class="scenario-name">网页浏览</div>
          <div class="scenario-desc">
            使用 <strong>TCP</strong>，因为： <br />• 内容必须完整准确 <br />•
            丢失任何数据都不可接受
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">🎮</div>
          <div class="scenario-name">在线游戏</div>
          <div class="scenario-desc">
            使用 <strong>UDP</strong>，因为： <br />• 响应速度比准确更重要
            <br />• 实时同步玩家位置
          </div>
        </div>
        <div class="scenario">
          <div class="scenario-icon">📧</div>
          <div class="scenario-name">邮件发送</div>
          <div class="scenario-desc">
            使用 <strong>TCP</strong>，因为： <br />• 邮件内容不能丢失 <br />•
            可靠性是第一要务
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tcpStep = ref(0)
const udpSent = ref(false)

const startTcpHandshake = () => {
  tcpStep.value = 0
  setTimeout(() => (tcpStep.value = 1), 500)
  setTimeout(() => (tcpStep.value = 2), 1200)
  setTimeout(() => (tcpStep.value = 3), 1900)
  setTimeout(() => {
    tcpStep.value = 0
  }, 4000)
}

const sendUdpData = () => {
  udpSent.value = true
  setTimeout(() => {
    udpSent.value = false
  }, 1000)
}
</script>

<style scoped>
.tcp-udp-comparison {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.protocol-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
}

.protocol-card.tcp {
  border-color: #e34c26;
}

.protocol-card.udp {
  border-color: #264de4;
}

.protocol-header {
  text-align: center;
  margin-bottom: 20px;
}

.protocol-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.protocol-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 5px;
}

.protocol-subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.protocol-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.feature-item.good {
  border-left: 3px solid #22c55e;
}

.feature-item.bad {
  border-left: 3px solid #ef4444;
}

.feature-icon {
  font-weight: bold;
  font-size: 1rem;
}

.feature-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.protocol-example {
  margin-bottom: 20px;
}

.example-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
}

.handshake-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.demo-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  text-align: center;
}

.handshake-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step.direct {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.step-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.demo-btn {
  width: 100%;
  padding: 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.demo-btn:hover {
  background: var(--vp-c-brand-dark);
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

td {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

tr:last-child td {
  border-bottom: none;
}

.real-world-example {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
}

.example-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .scenario-grid {
    grid-template-columns: 1fr;
  }
}

.scenario {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.scenario-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.scenario-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
