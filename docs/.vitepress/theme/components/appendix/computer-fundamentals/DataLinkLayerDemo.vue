<template>
  <div class="data-link-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">数据链路层：帧的传递</span>
      <span class="subtitle">MAC 地址如何定位设备</span>
    </div>

    <div class="lan-scene">
      <div class="lan-title">局域网场景</div>
      <div class="lan-devices">
        <div
          v-for="device in devices"
          :key="device.id"
          :class="['lan-device', { active: activeDevice === device.id, sender: device.role === 'sender', receiver: device.role === 'receiver' }]"
          @click="activeDevice = device.id"
        >
          <div class="device-icon">{{ device.icon }}</div>
          <div class="device-name">{{ device.name }}</div>
          <div class="device-mac">{{ device.mac }}</div>
          <div v-if="device.role" class="device-role">{{ device.roleText }}</div>
        </div>
      </div>

      <!-- 交换机 -->
      <div class="switch">
        <div class="switch-icon">🔄</div>
        <div class="switch-name">交换机</div>
        <div class="switch-desc">根据 MAC 地址转发数据帧</div>
      </div>
    </div>

    <!-- 帧结构 -->
    <div class="frame-structure">
      <div class="frame-title">以太网帧结构</div>
      <div class="frame-visual">
        <div class="frame-fields">
          <div
            v-for="(field, index) in frameFields"
            :key="index"
            :class="['frame-field', { highlighted: activeDevice !== null }]"
            :style="{ width: field.width }"
          >
            <div class="field-name">{{ field.name }}</div>
            <div class="field-value">{{ field.value }}</div>
            <div class="field-size">{{ field.size }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 传输过程 -->
    <div class="transfer-process">
      <div class="process-title">数据帧传输过程</div>
      <div class="process-steps">
        <div
          v-for="(step, index) in transferSteps"
          :key="index"
          :class="['process-step', { active: activeStep === index }]"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ARP 协议 -->
    <div class="arp-section">
      <div class="arp-title">ARP：IP 地址到 MAC 地址的映射</div>
      <div class="arp-example">
        <div class="arp-question">
          <span class="question-icon">❓</span>
          <span class="question-text">谁有 IP 地址 192.168.1.200？</span>
        </div>
        <div class="arp-arrow">↓ 广播到局域网</div>
        <div class="arp-answer">
          <span class="answer-icon">✅</span>
          <span class="answer-text">我是！我的 MAC 地址是 00:11:22:33:44:66</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeDevice = ref(null)
const activeStep = ref(0)

const devices = [
  {
    id: 'pc1',
    name: '电脑 A',
    icon: '💻',
    mac: '00:11:22:33:44:55',
    ip: '192.168.1.100',
    role: 'sender',
    roleText: '发送方'
  },
  {
    id: 'pc2',
    name: '电脑 B',
    icon: '🖥️',
    mac: '00:11:22:33:44:66',
    ip: '192.168.1.200',
    role: 'receiver',
    roleText: '接收方'
  },
  {
    id: 'printer',
    name: '打印机',
    icon: '🖨️',
    mac: '00:11:22:33:44:77',
    ip: '192.168.1.50'
  },
  {
    id: 'phone',
    name: '手机',
    icon: '📱',
    mac: '00:11:22:33:44:88',
    ip: '192.168.1.150'
  }
]

const frameFields = [
  {
    name: '目的 MAC',
    value: '00:11:22:33:44:66',
    size: '6 字节',
    width: '18%'
  },
  {
    name: '源 MAC',
    value: '00:11:22:33:44:55',
    size: '6 字节',
    width: '18%'
  },
  {
    name: '类型',
    value: '0x0800 (IPv4)',
    size: '2 字节',
    width: '12%'
  },
  {
    name: '数据',
    value: 'IP 数据包...',
    size: '46-1500 字节',
    width: '44%'
  },
  {
    name: 'FCS',
    value: '校验序列',
    size: '4 字节',
    width: '8%'
  }
]

const transferSteps = [
  {
    title: '封装成帧',
    desc: '发送方将数据封装成以太网帧，添加源 MAC 和目的 MAC 地址'
  },
  {
    title: '发送到交换机',
    desc: '帧通过物理介质（网线或 WiFi）发送到交换机'
  },
  {
    title: '交换机转发',
    desc: '交换机根据目的 MAC 地址，将帧转发到对应端口'
  },
  {
    title: '接收方处理',
    desc: '接收方检查目的 MAC 地址，匹配后接收并处理数据'
  }
]
</script>

<style scoped>
.data-link-demo {
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

.lan-scene {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.lan-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.lan-devices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.lan-device {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.lan-device:hover {
  border-color: var(--vp-c-brand);
}

.lan-device.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.lan-device.sender {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.lan-device.receiver {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.device-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.device-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.device-mac {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.device-role {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 10px;
  display: inline-block;
}

.switch {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.switch-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.switch-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.switch-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.frame-structure {
  margin-bottom: 1.5rem;
}

.frame-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.frame-visual {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.frame-fields {
  display: flex;
  gap: 0.5rem;
}

.frame-field {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s;
}

.frame-field.highlighted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.field-name {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.field-value {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.field-size {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.transfer-process {
  margin-bottom: 1.5rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.process-step {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-number {
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

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.arp-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.arp-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.arp-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.arp-question,
.arp-answer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.arp-question {
  background: rgba(59, 130, 246, 0.1);
}

.arp-answer {
  background: rgba(16, 185, 129, 0.1);
  margin-bottom: 0;
}

.question-icon,
.answer-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.question-text,
.answer-text {
  font-size: 0.9rem;
}

.arp-arrow {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0.75rem 0;
}

@media (max-width: 768px) {
  .frame-fields {
    flex-wrap: wrap;
  }

  .frame-field {
    min-width: 100px;
  }
}
</style>
