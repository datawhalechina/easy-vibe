<template>
  <div class="transport-layer-demo">
    <div class="demo-header">
      <span class="icon">🚚</span>
      <span class="title">传输层：端到端的可靠传输</span>
      <span class="subtitle">TCP 和 UDP 如何传输数据</span>
    </div>

    <div class="protocol-tabs">
      <button
        :class="['tab-btn', { active: activeProtocol === 'tcp' }]"
        @click="activeProtocol = 'tcp'"
      >
        TCP 📦
      </button>
      <button
        :class="['tab-btn', { active: activeProtocol === 'udp' }]"
        @click="activeProtocol = 'udp'"
      >
        UDP ⚡
      </button>
    </div>

    <!-- 可视化演示 -->
    <div class="protocol-visual">
      <div class="visual-header">
        <span class="protocol-title">{{ currentProtocol.name }}</span>
        <span class="protocol-slogan">{{ currentProtocol.slogan }}</span>
      </div>

      <div class="visual-content">
        <!-- TCP 可靠传输 -->
        <div v-if="activeProtocol === 'tcp'" class="tcp-demo">
          <div class="connection-stages">
            <div
              v-for="(stage, index) in tcpStages"
              :key="index"
              :class="['stage-item', { active: activeTcpStage === index }]"
              @click="activeTcpStage = index"
            >
              <div class="stage-number">{{ index + 1 }}</div>
              <div class="stage-text">{{ stage }}</div>
            </div>
          </div>

          <div class="tcp-reliability">
            <div class="reliability-title">TCP 可靠性机制</div>
            <div class="mechanism-grid">
              <div
                v-for="(mech, index) in tcpMechanisms"
                :key="index"
                class="mechanism-card"
              >
                <div class="mech-icon">{{ mech.icon }}</div>
                <div class="mech-title">{{ mech.title }}</div>
                <div class="mech-desc">{{ mech.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- UDP 快速传输 -->
        <div v-if="activeProtocol === 'udp'" class="udp-demo">
          <div class="udp-comparison">
            <div class="comparison-side tcp-side">
              <div class="side-header">TCP</div>
              <div class="side-animation">
                <div class="packet" v-for="i in 3" :key="'tcp-' + i">
                  📦 {{ i }}
                </div>
              </div>
              <div class="side-desc">三次握手 + 确认应答</div>
            </div>

            <div class="vs-badge">VS</div>

            <div class="comparison-side udp-side">
              <div class="side-header">UDP</div>
              <div class="side-animation">
                <div class="packet fast" v-for="i in 5" :key="'udp-' + i">
                  ⚡ {{ i }}
                </div>
              </div>
              <div class="side-desc">直接发送，无等待</div>
            </div>
          </div>

          <div class="udp-use-cases">
            <div class="use-cases-title">UDP 适用场景</div>
            <div class="use-cases-grid">
              <div
                v-for="(use, index) in udpUseCases"
                :key="index"
                class="use-case-card"
              >
                <div class="use-icon">{{ use.icon }}</div>
                <div class="use-title">{{ use.title }}</div>
                <div class="use-reason">{{ use.reason }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 端口说明 -->
    <div class="port-section">
      <div class="port-title">端口号：应用程序的标识</div>
      <div class="port-examples">
        <div class="port-intro">
          端口号就像公寓房间号，IP 地址是公寓楼地址，合起来才能找到具体的应用程序
        </div>
        <div class="port-list">
          <div
            v-for="(port, index) in commonPorts"
            :key="index"
            class="port-item"
          >
            <div class="port-number">{{ port.number }}</div>
            <div class="port-service">{{ port.service }}</div>
            <div class="port-desc">{{ port.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeProtocol = ref('tcp')
const activeTcpStage = ref(0)

const protocolData = {
  tcp: {
    name: 'TCP：可靠传输协议',
    slogan: '像快递服务，确保每个包裹都送达'
  },
  udp: {
    name: 'UDP：快速传输协议',
    slogan: '像明信片，发送出去就不管了'
  }
}

const tcpStages = [
  '建立连接（三次握手）',
  '数据传输（带序号和确认）',
  '连接关闭（四次挥手）'
]

const tcpMechanisms = [
  {
    icon: '🤝',
    title: '三次握手',
    desc: '建立可靠连接，确保双方都准备好'
  },
  {
    icon: '🔢',
    title: '序号和确认',
    desc: '每个数据包都有编号，收到需要确认'
  },
  {
    icon: '🔁',
    title: '超时重传',
    desc: '未收到确认则自动重传丢失的数据'
  },
  {
    icon: '🚦',
    title: '流量控制',
    desc: '根据接收方能力调整发送速度'
  }
]

const udpUseCases = [
  {
    icon: '🎮',
    title: '在线游戏',
    reason: '速度优先，偶尔丢包可接受'
  },
  {
    icon: '📞',
    title: '视频通话',
    reason: '实时性要求高，延迟比质量更重要'
  },
  {
    icon: '📺',
    title: '直播流',
    reason: '持续的数据流，丢帧比卡顿好'
  },
  {
    icon: '🔍',
    title: 'DNS 查询',
    reason: '请求数据小，快速响应比可靠传输重要'
  }
]

const commonPorts = [
  { number: '80', service: 'HTTP', desc: '网页浏览' },
  { number: '443', service: 'HTTPS', desc: '加密网页浏览' },
  { number: '22', service: 'SSH', desc: '远程登录' },
  { number: '25', service: 'SMTP', desc: '发送邮件' },
  { number: '53', service: 'DNS', desc: '域名解析' },
  { number: '3306', service: 'MySQL', desc: '数据库连接' }
]

const currentProtocol = computed(() => protocolData[activeProtocol.value])
</script>

<style scoped>
.transport-layer-demo {
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

.protocol-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.protocol-visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.visual-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.protocol-title {
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.protocol-slogan {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.tcp-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.connection-stages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stage-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.stage-item:hover {
  border-color: var(--vp-c-brand);
}

.stage-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.stage-text {
  font-size: 0.9rem;
}

.tcp-reliability {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.reliability-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.mechanism-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.mechanism-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.mech-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.mech-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.mech-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.udp-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.udp-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.comparison-side {
  flex: 1;
  text-align: center;
}

.side-header {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.side-animation {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.packet {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.85rem;
  animation: slideRight 2s ease-in-out infinite;
}

.packet.fast {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  animation: slideRight 0.5s ease-in-out infinite;
}

@keyframes slideRight {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

.side-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.vs-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.udp-use-cases {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.use-cases-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.use-case-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.use-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.use-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.use-reason {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.port-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.port-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.port-intro {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.port-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
}

.port-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.port-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.port-service {
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.port-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .udp-comparison {
    flex-direction: column;
  }

  .vs-badge {
    transform: rotate(90deg);
  }
}
</style>
