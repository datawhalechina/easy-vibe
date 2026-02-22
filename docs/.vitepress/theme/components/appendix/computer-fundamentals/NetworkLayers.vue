<template>
  <div class="network-layers-demo">
    <div class="demo-header">
      <span class="title">网络五层模型</span>
      <span class="subtitle">从应用到物理的数据封装过程</span>
    </div>

    <div class="demo-content">
      <div class="layers-container">
        <div
          v-for="(layer, i) in layers"
          :key="i"
          :class="['layer', { active: activeLayer === i }]"
          @click="activeLayer = i"
        >
          <div class="layer-num">
            {{ 5 - i }}
          </div>
          <div class="layer-info">
            <div class="layer-name">
              {{ layer.name }}
            </div>
            <div class="layer-protocol">
              {{ layer.protocols }}
            </div>
          </div>
          <div v-if="layer.device" class="layer-device">
            {{ layer.device }}
          </div>
        </div>
      </div>

      <div v-if="currentLayer" class="layer-detail">
        <div class="detail-header">
          <span class="detail-name">{{ currentLayer.name }}</span>
          <span class="detail-analogy">{{ currentLayer.analogy }}</span>
        </div>
        <div class="detail-desc">
          {{ currentLayer.desc }}
        </div>
        <div class="detail-tasks">
          <div class="task-title">核心任务</div>
          <ul>
            <li v-for="(task, j) in currentLayer.tasks" :key="j">
              {{ task }}
            </li>
          </ul>
        </div>
        <div class="detail-unit">
          <span class="label">数据单位：</span>
          <span class="value">{{ currentLayer.unit }}</span>
        </div>
      </div>

      <div class="encapsulation-demo">
        <div class="encap-title">数据封装过程</div>
        <div class="encap-flow">
          <div v-for="(step, i) in encapsulation" :key="i" class="encap-step">
            <div class="step-layer">
              {{ step.layer }}
            </div>
            <div class="step-data">
              <span v-if="step.header" class="header">{{ step.header }}</span>
              <span class="payload">{{ step.payload }}</span>
            </div>
          </div>
          <div class="arrow">↓ 发送</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong
      >分层设计让网络协议模块化，每层只关心自己的职责。数据从应用层向下传递时，每层都会添加自己的"信封"(头部)，接收时再逐层拆开。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayer = ref(0)

const layers = [
  {
    name: '应用层',
    protocols: 'HTTP, FTP, SMTP, DNS',
    device: '',
    analogy: '客户服务部门',
    desc: '直接为用户的应用程序提供服务，处理具体的业务逻辑。',
    tasks: ['定义应用程序之间的通信格式', '处理用户身份认证', '数据格式转换'],
    unit: '消息(Message)'
  },
  {
    name: '传输层',
    protocols: 'TCP, UDP',
    device: '',
    analogy: '包裹分拣组',
    desc: '负责端到端的数据传输，确保数据的可靠性或实时性。',
    tasks: [
      '建立和管理端到端连接',
      '分段和重组数据',
      '流量控制和拥塞控制',
      '端口寻址'
    ],
    unit: '段(Segment)'
  },
  {
    name: '网络层',
    protocols: 'IP, ICMP, ARP',
    device: '路由器',
    analogy: '路由规划部',
    desc: '负责将数据包从源主机传送到目标主机，实现跨网络通信。',
    tasks: ['IP地址分配和管理', '路由选择', '数据包转发', '拥塞控制'],
    unit: '包(Packet)'
  },
  {
    name: '数据链路层',
    protocols: '以太网, Wi-Fi',
    device: '交换机',
    analogy: '车队管理',
    desc: '负责在直连的两个节点之间传输数据帧。',
    tasks: ['MAC地址寻址', '帧的封装和解封装', '错误检测', '介质访问控制'],
    unit: '帧(Frame)'
  },
  {
    name: '物理层',
    protocols: 'RS-232, RJ45',
    device: '中继器, 集线器',
    analogy: '道路和车辆',
    desc: '负责在物理介质上传输原始的比特流。',
    tasks: ['定义物理设备标准', '规定传输介质', '确定电气特性', '比特同步'],
    unit: '比特(Bit)'
  }
]

const currentLayer = computed(() => layers[activeLayer.value])

const encapsulation = [
  { layer: '应用层', header: '', payload: '原始数据' },
  { layer: '传输层', header: 'TCP头', payload: '原始数据' },
  { layer: '网络层', header: 'IP头', payload: 'TCP头+原始数据' },
  { layer: '数据链路层', header: 'MAC头', payload: 'IP头+TCP头+原始数据' },
  { layer: '物理层', header: '', payload: '比特流 010101...' }
]
</script>

<style scoped>
.network-layers-demo {
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

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.layers-container {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.layer:hover {
  background: var(--vp-c-bg-alt);
}

.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
}

.layer-info {
  flex: 1;
}

.layer-name {
  font-weight: bold;
  font-size: 0.85rem;
}

.layer-protocol {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.layer-device {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.layer-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.detail-name {
  font-weight: bold;
  font-size: 1rem;
}

.detail-analogy {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.detail-tasks {
  margin-bottom: 0.5rem;
}

.task-title {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.detail-tasks ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
}

.detail-tasks li {
  margin: 0.15rem 0;
}

.detail-unit {
  font-size: 0.8rem;
}

.detail-unit .label {
  color: var(--vp-c-text-2);
}

.detail-unit .value {
  font-weight: bold;
  color: var(--vp-c-brand);
}

.encapsulation-demo {
  grid-column: 1 / -1;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.encap-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.encap-flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.encap-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.35rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  min-width: 80px;
}

.step-layer {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.step-data {
  display: flex;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.header {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
}

.payload {
  background: var(--vp-c-divider);
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
}

.arrow {
  font-size: 0.8rem;
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

@media (max-width: 640px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}
</style>
