<template>
  <div class="tcp-udp-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">TCP vs UDP：可靠 vs 快速</span>
      <span class="subtitle">两种不同的传输策略</span>
    </div>

    <div class="demo-content">
      <div class="comparison-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'tcp' }]"
          @click="activeTab = 'tcp'"
        >
          <span class="tab-icon">📨</span>
          <span>TCP (可靠)</span>
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'udp' }]"
          @click="activeTab = 'udp'"
        >
          <span class="tab-icon">📮</span>
          <span>UDP (快速)</span>
        </button>
      </div>

      <div
        v-if="currentProtocol"
        class="protocol-detail"
      >
        <div class="detail-header">
          <span class="detail-name">{{ currentProtocol.name }}</span>
          <span class="detail-full">{{ currentProtocol.fullName }}</span>
        </div>
        
        <div class="feature-grid">
          <div
            v-for="(feature, i) in currentProtocol.features"
            :key="i"
            class="feature-item"
          >
            <span class="feature-icon">{{ feature.icon }}</span>
            <span class="feature-name">{{ feature.name }}</span>
            <span class="feature-value">{{ feature.value }}</span>
          </div>
        </div>

        <div class="mechanism-section">
          <div class="mechanism-title">
            核心机制
          </div>
          <div class="mechanism-list">
            <div
              v-for="(m, i) in currentProtocol.mechanisms"
              :key="i"
              class="mechanism-item"
            >
              <span class="mechanism-name">{{ m.name }}</span>
              <span class="mechanism-desc">{{ m.desc }}</span>
            </div>
          </div>
        </div>

        <div class="use-cases">
          <div class="use-title">
            适用场景
          </div>
          <div class="use-tags">
            <span
              v-for="(use, i) in currentProtocol.useCases"
              :key="i"
              class="use-tag"
            >{{ use }}</span>
          </div>
        </div>
      </div>

      <div class="visual-demo">
        <div class="visual-title">
          传输过程演示
        </div>
        <div class="transmission-demo">
          <div class="sender">
            <div class="node-label">
              发送方
            </div>
            <div class="packets">
              <div 
                v-for="(packet, i) in packets" 
                :key="i"
                :class="['packet', { sent: packet.sent, acked: packet.acked, lost: packet.lost }]"
              >
                {{ packet.seq }}
              </div>
            </div>
          </div>
          
          <div class="network-channel">
            <div class="channel-label">
              网络通道
            </div>
            <div
              class="channel-status"
              :class="{ congested: isCongested }"
            >
              {{ isCongested ? '拥堵' : '正常' }}
            </div>
            <button
              class="demo-btn"
              @click="runDemo"
            >
              开始演示
            </button>
            <button
              class="demo-btn"
              @click="toggleCongestion"
            >
              {{ isCongested ? '恢复网络' : '模拟丢包' }}
            </button>
          </div>
          
          <div class="receiver">
            <div class="node-label">
              接收方
            </div>
            <div class="received-packets">
              <div 
                v-for="(packet, i) in receivedPackets" 
                :key="i"
                class="received-packet"
              >
                {{ packet }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="demo-log">
          <div class="log-title">
            传输日志
          </div>
          <div class="log-content">
            <div
              v-for="(log, i) in logs"
              :key="i"
              class="log-item"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <div class="table-title">
          特性对比
        </div>
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>TCP</th>
              <th>UDP</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in comparisonData"
              :key="i"
            >
              <td class="feature-col">
                {{ row.feature }}
              </td>
              <td :class="{ highlight: row.tcpBetter }">
                {{ row.tcp }}
              </td>
              <td :class="{ highlight: !row.tcpBetter }">
                {{ row.udp }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>TCP 像挂号信，确保送达但较慢；UDP 像平信，快速但不保证送达。选择哪种协议取决于应用场景：需要可靠性选 TCP，需要实时性选 UDP。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const activeTab = ref('tcp')

const protocols = {
  tcp: {
    name: 'TCP',
    fullName: 'Transmission Control Protocol',
    features: [
      { icon: '✅', name: '可靠性', value: '保证数据送达' },
      { icon: '📊', name: '有序性', value: '按顺序重组' },
      { icon: '🔄', name: '重传机制', value: '丢包自动重传' },
      { icon: '⚖️', name: '流量控制', value: '防止接收方溢出' },
      { icon: '🚦', name: '拥塞控制', value: '避免网络拥堵' },
      { icon: '🤝', name: '连接导向', value: '需要建立连接' }
    ],
    mechanisms: [
      { name: '三次握手', desc: '建立可靠连接，确保双方都能收发' },
      { name: '序列号', desc: '每个字节编号，保证有序和完整性' },
      { name: '确认应答', desc: '收到数据必须回复 ACK' },
      { name: '超时重传', desc: '未收到 ACK 则重传' },
      { name: '滑动窗口', desc: '控制发送速率，提高效率' }
    ],
    useCases: ['网页浏览', '文件传输', '邮件发送', '数据库连接']
  },
  udp: {
    name: 'UDP',
    fullName: 'User Datagram Protocol',
    features: [
      { icon: '⚡', name: '速度', value: '无连接开销' },
      { icon: '📦', name: '数据报', value: '独立的数据包' },
      { icon: '❌', name: '无保证', value: '不保证送达' },
      { icon: '🔀', name: '无序', value: '可能乱序到达' },
      { icon: '💡', name: '轻量', value: '头部仅 8 字节' },
      { icon: '🎯', name: '灵活', value: '应用层控制' }
    ],
    mechanisms: [
      { name: '无连接', desc: '直接发送，无需建立连接' },
      { name: '校验和', desc: '检测数据是否损坏' },
      { name: '端口复用', desc: '支持多路复用' },
      { name: '应用层控制', desc: '由应用决定重传等策略' }
    ],
    useCases: ['视频直播', '在线游戏', 'DNS 查询', 'VoIP 通话']
  }
}

const currentProtocol = computed(() => protocols[activeTab.value])

const comparisonData = [
  { feature: '连接', tcp: '面向连接', udp: '无连接', tcpBetter: true },
  { feature: '可靠性', tcp: '可靠传输', udp: '不保证', tcpBetter: true },
  { feature: '顺序', tcp: '有序', udp: '可能乱序', tcpBetter: true },
  { feature: '速度', tcp: '较慢', udp: '快', tcpBetter: false },
  { feature: '头部开销', tcp: '20 字节', udp: '8 字节', tcpBetter: false },
  { feature: '流量控制', tcp: '有', udp: '无', tcpBetter: true },
  { feature: '拥塞控制', tcp: '有', udp: '无', tcpBetter: true },
  { feature: '广播/多播', tcp: '不支持', udp: '支持', tcpBetter: false }
]

const packets = ref([
  { seq: 1, sent: false, acked: false, lost: false },
  { seq: 2, sent: false, acked: false, lost: false },
  { seq: 3, sent: false, acked: false, lost: false },
  { seq: 4, sent: false, acked: false, lost: false }
])

const receivedPackets = ref([])
const logs = ref([])
const isCongested = ref(false)

const toggleCongestion = () => {
  isCongested.value = !isCongested.value
  logs.value.push(`网络状态: ${isCongested.value ? '拥堵(模拟丢包)' : '正常'}`)
}

const runDemo = async () => {
  receivedPackets.value = []
  logs.value = ['开始传输演示...']
  
  for (let i = 0; i < packets.value.length; i++) {
    packets.value[i].sent = false
    packets.value[i].acked = false
    packets.value[i].lost = false
  }
  
  const isTcp = activeTab.value === 'tcp'
  
  for (let i = 0; i < packets.value.length; i++) {
    const packet = packets.value[i]
    packet.sent = true
    
    if (isCongested.value && Math.random() > 0.5) {
      packet.lost = true
      logs.value.push(`包 ${packet.seq} 丢失!`)
      
      if (isTcp) {
        await new Promise(r => setTimeout(r, 500))
        logs.value.push(`TCP 重传包 ${packet.seq}...`)
        packet.lost = false
        receivedPackets.value.push(packet.seq)
        packet.acked = true
        logs.value.push(`包 ${packet.seq} 重传成功`)
      }
    } else {
      receivedPackets.value.push(packet.seq)
      packet.acked = true
      logs.value.push(`包 ${packet.seq} 送达`)
    }
    
    await new Promise(r => setTimeout(r, 300))
  }
  
  if (isTcp) {
    logs.value.push(`TCP 完成: 收到 ${receivedPackets.value.length} 个包，顺序: ${receivedPackets.value.join(', ')}`)
  } else {
    logs.value.push(`UDP 完成: 收到 ${receivedPackets.value.length} 个包`)
  }
}
</script>

<style scoped>
.tcp-udp-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.comparison-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.tab-icon { font-size: 1.1rem; }

.protocol-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.detail-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.detail-full {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.feature-icon { font-size: 1rem; }
.feature-name { font-size: 0.75rem; color: var(--vp-c-text-2); }
.feature-value { font-size: 0.8rem; font-weight: bold; }

.mechanism-section {
  margin-bottom: 0.75rem;
}

.mechanism-title, .use-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.mechanism-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mechanism-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.mechanism-name {
  font-weight: bold;
  color: var(--vp-c-brand);
  min-width: 70px;
}

.mechanism-desc {
  color: var(--vp-c-text-2);
}

.use-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.use-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.visual-demo {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.visual-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.transmission-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.sender, .receiver {
  flex: 1;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.node-label {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.packets, .received-packets {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.packet {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.packet.sent {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.packet.acked {
  background: var(--vp-c-brand);
  color: white;
}

.packet.lost {
  background: #ff6b6b;
  color: white;
}

.received-packet {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.network-channel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
}

.channel-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.channel-status {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: #51cf66;
  color: white;
  border-radius: 3px;
}

.channel-status.congested {
  background: #ff6b6b;
}

.demo-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
}

.demo-btn:hover {
  background: var(--vp-c-bg-alt);
}

.demo-log {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.log-title {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-divider);
}

.log-content {
  padding: 0.5rem;
  max-height: 100px;
  overflow-y: auto;
}

.log-item {
  font-size: 0.75rem;
  font-family: monospace;
  margin-bottom: 0.15rem;
}

.comparison-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

th, td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.4rem;
  text-align: center;
}

th {
  background: var(--vp-c-bg);
}

.feature-col {
  text-align: left;
  font-weight: bold;
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: bold;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
</style>
