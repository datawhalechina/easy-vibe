<template>
  <div class="network-overview-demo">
    <div class="demo-header">
      <span class="icon">🌐</span>
      <span class="title">网络是怎么连接的</span>
      <span class="subtitle">从发送到接收的完整过程</span>
    </div>

    <div class="network-scene">
      <div class="scene-devices">
        <!-- 发送方 -->
        <div class="device sender">
          <div class="device-icon">💻</div>
          <div class="device-name">发送方</div>
          <div class="device-ip">192.168.1.100</div>
          <div class="app-layer">
            <div class="app-icon">📧</div>
            <div class="app-name">邮件应用</div>
          </div>
        </div>

        <!-- 网络路径 -->
        <div class="network-path">
          <div class="path-steps">
            <div
              v-for="(step, index) in pathSteps"
              :key="index"
              :class="['path-step', { active: activeStep === index }]"
              @click="activeStep = index"
            >
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-name">{{ step.name }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          </div>

          <div class="data-flow">
            <div v-if="activeStep !== null" class="flow-animation">
              <div class="flow-packet">📦 数据包</div>
            </div>
          </div>
        </div>

        <!-- 接收方 -->
        <div class="device receiver">
          <div class="device-icon">🖥️</div>
          <div class="device-name">接收方</div>
          <div class="device-ip">192.168.1.200</div>
          <div class="app-layer">
            <div class="app-icon">📧</div>
            <div class="app-name">邮件应用</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 封装过程 -->
    <div class="encapsulation-process">
      <div class="process-title">数据封装过程</div>
      <div class="encapsulation-layers">
        <div
          v-for="(layer, index) in encapsulationLayers"
          :key="index"
          :class="['encap-layer', { active: activeStep === index }]"
        >
          <div class="layer-header">
            <span class="layer-num">{{ layer.num }}</span>
            <span class="layer-name">{{ layer.name }}</span>
          </div>
          <div class="layer-content">
            <div class="layer-data">{{ layer.data }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 协议栈 -->
    <div class="protocol-stack">
      <div class="stack-title">网络协议栈 (OSI 模型)</div>
      <div class="stack-container">
        <div class="stack-column sender-stack">
          <div class="stack-header">发送方</div>
          <div
            v-for="(layer, index) in protocolLayers"
            :key="'sender-' + index"
            :class="['stack-layer', { highlighted: activeStep === index }]"
          >
            {{ layer }}
          </div>
        </div>

        <div class="stack-arrow">→</div>

        <div class="stack-column receiver-stack">
          <div class="stack-header">接收方</div>
          <div
            v-for="(layer, index) in protocolLayers"
            :key="'receiver-' + index"
            :class="['stack-layer', { highlighted: activeStep === index }]"
          >
            {{ layer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(null)

const pathSteps = [
  {
    icon: '📧',
    name: '应用层',
    desc: '邮件软件创建邮件内容'
  },
  {
    icon: '🔐',
    name: '传输层',
    desc: 'TCP 添加端口号和序号'
  },
  {
    icon: '🌐',
    name: '网络层',
    desc: 'IP 添加源地址和目标地址'
  },
  {
    icon: '🔌',
    name: '数据链路层',
    desc: '以太网添加 MAC 地址'
  },
  {
    icon: '⚡',
    name: '物理层',
    desc: '转换成电信号发送'
  }
]

const encapsulationLayers = [
  {
    num: '7',
    name: '应用层',
    data: '邮件内容: "Hello!"'
  },
  {
    num: '6',
    name: '表示层',
    data: '数据编码: UTF-8'
  },
  {
    num: '5',
    name: '会话层',
    data: '会话ID: sess_123'
  },
  {
    num: '4',
    name: '传输层',
    data: 'TCP 头: 端口 25'
  },
  {
    num: '3',
    name: '网络层',
    data: 'IP 头: 192.168.1.100 → 192.168.1.200'
  },
  {
    num: '2',
    name: '数据链路层',
    data: '以太网帧: MAC 地址'
  },
  {
    num: '1',
    name: '物理层',
    data: '比特流: 01010101...'
  }
]

const protocolLayers = [
  '应用层 (HTTP, SMTP)',
  '传输层 (TCP, UDP)',
  '网络层 (IP)',
  '数据链路层 (Ethernet)',
  '物理层 (电信号)'
]
</script>

<style scoped>
.network-overview-demo {
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

.network-scene {
  margin-bottom: 2rem;
}

.scene-devices {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.device {
  flex: 1;
  max-width: 200px;
  text-align: center;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
}

.device-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.device-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.device-ip {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.app-layer {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.app-icon { font-size: 1.5rem; }
.app-name { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-brand); }

.network-path {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.path-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.path-step:hover {
  border-color: var(--vp-c-brand);
}

.path-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-name {
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.data-flow {
  text-align: center;
  padding: 0.5rem;
}

.flow-animation {
  animation: flowMove 2s ease-in-out infinite;
}

@keyframes flowMove {
  0%, 100% { transform: translateX(-20px); opacity: 0; }
  50% { transform: translateX(20px); opacity: 1; }
}

.flow-packet {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.encapsulation-process {
  margin-bottom: 2rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.encapsulation-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.encap-layer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.encap-layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;
}

.layer-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.layer-name {
  font-weight: 600;
  font-size: 0.85rem;
}

.layer-content {
  flex: 1;
}

.layer-data {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.protocol-stack {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.stack-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.stack-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.stack-column {
  flex: 1;
  max-width: 250px;
}

.stack-header {
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.stack-layer {
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
  transition: all 0.3s;
}

.stack-layer.highlighted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

.stack-arrow {
  font-size: 2rem;
  color: var(--vp-c-brand);
}

@media (max-width: 968px) {
  .scene-devices {
    flex-direction: column;
  }

  .network-path {
    width: 100%;
  }

  .stack-container {
    flex-direction: column;
    gap: 1rem;
  }

  .stack-arrow {
    transform: rotate(90deg);
  }
}
</style>
