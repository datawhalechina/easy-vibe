<template>
  <div class="network-layers-simple">
    <div class="layers-stack">
      <div
        v-for="(layer, index) in layers"
        :key="index"
        :class="['layer-item', layer.type]"
      >
        <div class="layer-icon">
          {{ layer.icon }}
        </div>
        <div class="layer-content">
          <div class="layer-name">
            {{ layer.name }}
          </div>
          <div class="layer-desc">
            {{ layer.desc }}
          </div>
        </div>
      </div>
    </div>

    <div class="flow-arrow">↓ 数据从上往下逐层封装，就像给礼物层层包装</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const layers = ref([
  {
    name: '应用层 (HTTP, DNS)',
    desc: '具体业务：浏览网页、发邮件',
    icon: '📱',
    type: 'application'
  },
  {
    name: '传输层 (TCP, UDP)',
    desc: '决定用可靠还是快速的方式传输',
    icon: '📦',
    type: 'transport'
  },
  {
    name: '网络层 (IP)',
    desc: '规划路线：走哪条路到达目的地',
    icon: '🗺️',
    type: 'network'
  },
  {
    name: '数据链路层 (MAC)',
    desc: '把数据装上"车"，准备运输',
    icon: '🚚',
    type: 'datalink'
  },
  {
    name: '物理层 (网线、光纤)',
    desc: '实际的物理传输：电信号、光信号',
    icon: '🔌',
    type: 'physical'
  }
])
</script>

<style scoped>
.network-layers-simple {
  margin: 20px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.layers-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.layer-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.layer-item:hover {
  transform: translateX(4px);
}

.layer-item.application {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.layer-item.transport {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.layer-item.network {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.layer-item.datalink {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.layer-item.physical {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.layer-icon {
  font-size: 32px;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-content {
  flex: 1;
}

.layer-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.layer-desc {
  font-size: 14px;
  opacity: 0.95;
  line-height: 1.4;
}

.flow-arrow {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>
