<template>
  <div class="network-layers">
    <div class="layers-stack">
      <div
        v-for="(layer, index) in layers"
        :key="layer.name"
        class="layer-card"
        :class="{ active: selectedLayer === index }"
        @click="selectedLayer = index"
      >
        <div class="layer-number">{{ index + 1 }}</div>
        <div class="layer-content">
          <div class="layer-name">{{ layer.name }}</div>
          <div class="layer-english">{{ layer.english }}</div>
          <div class="layer-protocols">{{ layer.protocols }}</div>
        </div>
        <div class="layer-icon">{{ layer.icon }}</div>
      </div>
    </div>

    <div class="layer-detail" v-if="selectedLayer !== null">
      <div class="detail-title">{{ layers[selectedLayer].name }}</div>
      <div class="detail-desc">{{ layers[selectedLayer].description }}</div>
      <div class="detail-functions">
        <div class="function-title">主要功能</div>
        <div class="function-list">
          <div
            v-for="(func, index) in layers[selectedLayer].functions"
            :key="index"
            class="function-item"
          >
            ✓ {{ func }}
          </div>
        </div>
      </div>
      <div class="detail-examples">
        <div class="example-title">常见设备</div>
        <div class="example-list">
          <div
            v-for="(device, index) in layers[selectedLayer].devices"
            :key="index"
            class="example-item"
          >
            📡 {{ device }}
          </div>
        </div>
      </div>
    </div>

    <div class="data-flow">
      <div class="flow-title">数据封装过程（发送）</div>
      <div class="flow-steps">
        <div class="flow-step" v-for="(step, index) in 5" :key="index">
          <div class="step-label">{{ layers[4 - index].name }}</div>
          <div class="step-box">
            <span class="box-label">{{ layers[4 - index].dataUnit }}</span>
          </div>
          <div class="step-arrow" v-if="index < 4">↓ 添加头部</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLayer = ref(0)

const layers = [
  {
    name: '应用层',
    english: 'Application Layer',
    protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, SSH',
    icon: '📱',
    dataUnit: '数据',
    description:
      '直接为用户的应用程序（如浏览器、邮件客户端）提供网络服务接口。',
    functions: [
      '为应用程序提供网络接口',
      '定义应用程序间通信的协议',
      '处理数据格式和加密',
      '用户认证和授权'
    ],
    devices: ['网关', '防火墙', '代理服务器']
  },
  {
    name: '传输层',
    english: 'Transport Layer',
    protocols: 'TCP, UDP',
    icon: '🚚',
    dataUnit: '段/数据报',
    description: '负责端到端的通信，确保数据可靠地从源端传输到目的端。',
    functions: [
      '分段和重组数据',
      '端口号寻址（进程间通信）',
      '流量控制和拥塞控制',
      '错误检测和纠正（TCP）'
    ],
    devices: ['防火墙', '负载均衡器']
  },
  {
    name: '网络层',
    english: 'Network Layer',
    protocols: 'IP, ICMP, IGMP, ARP',
    icon: '🌐',
    dataUnit: '包',
    description: '负责数据包的路由选择，通过网络将数据从源主机传输到目的主机。',
    functions: [
      '逻辑寻址（IP 地址）',
      '路由选择和转发',
      '分组交换',
      '拥塞控制'
    ],
    devices: ['路由器', '三层交换机']
  },
  {
    name: '数据链路层',
    english: 'Data Link Layer',
    protocols: 'Ethernet, Wi-Fi, PPP',
    icon: '🔗',
    dataUnit: '帧',
    description: '负责在直连的两个节点间传输数据，处理物理层的错误。',
    functions: [
      '物理地址寻址（MAC 地址）',
      '帧的封装和解封装',
      '错误检测（CRC）',
      '流量控制',
      '介质访问控制（MAC）'
    ],
    devices: ['交换机', '网桥', '网卡']
  },
  {
    name: '物理层',
    english: 'Physical Layer',
    protocols: 'Ethernet PHY, Wi-Fi Radio, USB',
    icon: '⚡',
    dataUnit: '比特',
    description: '负责在物理介质上传输原始的比特流（0 和 1）。',
    functions: [
      '定义物理设备标准',
      '传输介质规范',
      '比特传输和同步',
      '电气特性和机械特性'
    ],
    devices: ['中继器', '集线器', '网线', '光纤']
  }
]
</script>

<style scoped>
.network-layers {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.layers-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
}

.layer-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.layer-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(5px);
}

.layer-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.layer-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.layer-content {
  flex: 1;
}

.layer-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.layer-english {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.layer-protocols {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.layer-icon {
  font-size: 2rem;
}

.layer-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid var(--vp-c-brand);
}

.detail-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.detail-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin-bottom: 20px;
}

.detail-functions,
.detail-examples {
  margin-bottom: 15px;
}

.function-title,
.example-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.function-list,
.example-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.function-item,
.example-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding-left: 10px;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
}

.flow-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  text-align: center;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step-label {
  width: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: right;
}

.step-box {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  position: relative;
}

.box-label {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.step-arrow {
  width: 100px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}
</style>
