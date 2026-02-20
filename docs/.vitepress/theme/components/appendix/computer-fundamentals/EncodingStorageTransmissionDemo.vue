<template>
  <div class="est-demo">
    <div class="demo-header">
      <span class="icon">🔗</span>
      <span class="title">编码、存储与传输的协作</span>
      <span class="subtitle">三大系统如何协同处理数据</span>
    </div>

    <div class="scenario-selector">
      <div class="selector-label">选择场景：</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-btn', { active: activeScenario === scenario.id }]"
          @click="activeScenario = scenario.id"
        >
          {{ scenario.icon }} {{ scenario.name }}
        </button>
      </div>
    </div>

    <div class="collab-diagram">
      <div class="diagram-flow">
        <!-- 编码阶段 -->
        <div class="flow-stage encoding-stage">
          <div class="stage-header">
            <span class="stage-icon">🔤</span>
            <span class="stage-title">编码</span>
          </div>
          <div class="stage-content">
            <div class="input-box">
              <div class="box-label">原始数据</div>
              <div class="box-value">{{ currentScenario.encoding.input }}</div>
            </div>
            <div class="arrow">↓</div>
            <div class="output-box">
              <div class="box-label">编码后</div>
              <div class="box-value code">{{ currentScenario.encoding.output }}</div>
            </div>
          </div>
        </div>

        <!-- 存储阶段 -->
        <div class="flow-stage storage-stage">
          <div class="stage-header">
            <span class="stage-icon">💾</span>
            <span class="stage-title">存储</span>
          </div>
          <div class="stage-content">
            <div class="storage-visual">
              <div class="storage-blocks">
                <div
                  v-for="(block, index) in currentScenario.storage.blocks"
                  :key="index"
                  class="storage-block"
                  :title="block"
                >
                  {{ block }}
                </div>
              </div>
            </div>
            <div class="storage-info">
              <div class="info-item">
                <span class="info-label">位置:</span>
                <span class="info-value">{{ currentScenario.storage.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">大小:</span>
                <span class="info-value">{{ currentScenario.storage.size }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 传输阶段 -->
        <div class="flow-stage transmission-stage">
          <div class="stage-header">
            <span class="stage-icon">📡</span>
            <span class="stage-title">传输</span>
          </div>
          <div class="stage-content">
            <div class="transmission-flow">
              <div class="transmission-packet">
                <div class="packet-header">数据包</div>
                <div class="packet-body">
                  <div class="packet-layer" v-for="(layer, index) in currentScenario.transmission.layers" :key="index">
                    <span class="layer-name">{{ layer.name }}:</span>
                    <span class="layer-value">{{ layer.value }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="transmission-info">
              <div class="info-item">
                <span class="info-label">协议:</span>
                <span class="info-value">{{ currentScenario.transmission.protocol }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">路径:</span>
                <span class="info-value">{{ currentScenario.transmission.path }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 协作关系 -->
      <div class="collab-relationships">
        <div class="relationship-arrow encoding-to-storage">
          <span class="arrow-text">{{ currentScenario.relationships.encodingToStorage }}</span>
          <span class="arrow-icon">→</span>
        </div>
        <div class="relationship-arrow storage-to-transmission">
          <span class="arrow-text">{{ currentScenario.relationships.storageToTransmission }}</span>
          <span class="arrow-icon">→</span>
        </div>
      </div>
    </div>

    <!-- 关键要点 -->
    <div class="key-points">
      <div class="points-title">协作要点</div>
      <div class="points-grid">
        <div v-for="(point, index) in currentScenario.points" :key="index" class="point-card">
          <div class="point-icon">{{ point.icon }}</div>
          <div class="point-content">
            <div class="point-title">{{ point.title }}</div>
            <div class="point-desc">{{ point.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref('text-file')

const scenarios = [
  {
    id: 'text-file',
    name: '保存文本文件',
    icon: '📝'
  },
  {
    id: 'upload-image',
    name: '上传图片',
    icon: '🖼️'
  },
  {
    id: 'stream-video',
    name: '流媒体播放',
    icon: '🎬'
  },
  {
    id: 'send-message',
    name: '发送消息',
    icon: '💬'
  }
]

const scenarioData = {
  'text-file': {
    encoding: {
      input: '你好',
      output: 'U+4F60 U+597D'
    },
    storage: {
      location: '文档文件夹 /hello.txt',
      size: '6 字节 (UTF-8)',
      blocks: ['E4', 'BD', 'A0', 'E5', 'A5', 'BD']
    },
    transmission: {
      protocol: 'HTTP + TCP/IP',
      path: '客户端 → 服务器 → 云存储',
      layers: [
        { name: '应用层', value: 'HTTP POST' },
        { name: '传输层', value: 'TCP 端口 443' },
        { name: '网络层', value: 'IP 数据包' }
      ]
    },
    relationships: {
      encodingToStorage: 'UTF-8 编码后的字节序列写入磁盘',
      storageToTransmission: '读取文件并通过网络发送'
    },
    points: [
      {
        icon: '🔤',
        title: '编码统一',
        desc: '使用 UTF-8 编码确保中文字符正确存储和传输'
      },
      {
        icon: '📦',
        title: '文件封装',
        desc: '文本内容被封装成 .txt 文件格式存储'
      },
      {
        icon: '🔄',
        title: '协议转换',
        desc: '存储时用文件系统协议，传输时用 HTTP 协议'
      }
    ]
  },
  'upload-image': {
    encoding: {
      input: '图片数据',
      output: 'JPEG 压缩编码'
    },
    storage: {
      location: '相册 /photo.jpg',
      size: '2.5 MB',
      blocks: ['FF', 'D8', 'FF', 'E0', '...', 'FF', 'D9']
    },
    transmission: {
      protocol: 'HTTPS + MIME multipart',
      path: '手机 → API 网关 → 对象存储',
      layers: [
        { name: '应用层', value: 'HTTPS POST' },
        { name: '传输层', value: 'TLS 加密' },
        { name: '网络层', value: 'IP 分片' }
      ]
    },
    relationships: {
      encodingToStorage: 'JPEG 压缩编码减少文件大小',
      storageToTransmission: '二进制数据分块上传'
    },
    points: [
      {
        icon: '🗜️',
        title: '压缩编码',
        desc: 'JPEG 压缩算法减少图片体积，节省存储空间'
      },
      {
        icon: '🔐',
        title: '安全传输',
        desc: 'HTTPS 加密保护图片数据在网络传输中的安全'
      },
      {
        icon: '⚡',
        title: '分块上传',
        desc: '大文件分块传输，支持断点续传'
      }
    ]
  },
  'stream-video': {
    encoding: {
      input: '视频流',
      output: 'H.264 编码'
    },
    storage: {
      location: 'CDN 缓存节点',
      size: '动态调整',
      blocks: ['帧1', '帧2', '帧3', '...']
    },
    transmission: {
      protocol: 'HLS + DASH',
      path: '服务器 → CDN → 用户设备',
      layers: [
        { name: '应用层', value: 'HLS 播放列表' },
        { name: '传输层', value: 'TCP 流式' },
        { name: '网络层', value: 'UDP 可能' }
      ]
    },
    relationships: {
      encodingToStorage: '视频分段存储在 CDN',
      storageToTransmission: '根据网络状况自适应码率'
    },
    points: [
      {
        icon: '🎬',
        title: '流式编码',
        desc: 'H.264 视频编码压缩，适合网络传输'
      },
      {
        icon: '🌐',
        title: 'CDN 加速',
        desc: '内容分发网络缓存视频，就近提供服务'
      },
      {
        icon: '📊',
        title: '自适应码率',
        desc: '根据网络状况动态调整视频质量'
      }
    ]
  },
  'send-message': {
    encoding: {
      input: '消息内容',
      output: 'JSON 格式'
    },
    storage: {
      location: '本地数据库 + 服务器',
      size: '约 200 字节',
      blocks: ['JSON格式']
    },
    transmission: {
      protocol: 'WebSocket',
      path: '发送方 → 即时通讯服务器 → 接收方',
      layers: [
        { name: '应用层', value: 'WebSocket 帧' },
        { name: '传输层', value: 'TCP 长连接' },
        { name: '网络层', value: 'IP 路由' }
      ]
    },
    relationships: {
      encodingToStorage: 'JSON 格式便于解析和存储',
      storageToTransmission: 'WebSocket 保持实时连接'
    },
    points: [
      {
        icon: '📨',
        title: '实时推送',
        desc: 'WebSocket 长连接实现消息即时送达'
      },
      {
        icon: '💾',
        title: '双重存储',
        desc: '本地存储离线消息，服务器存储历史记录'
      },
      {
        icon: '🔗',
        title: 'JSON 编码',
        desc: '结构化数据格式，易于解析和扩展'
      }
    ]
  }
}

const currentScenario = computed(() => scenarioData[activeScenario.value])
</script>

<style scoped>
.est-demo {
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

.scenario-selector {
  margin-bottom: 2rem;
}

.selector-label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.scenario-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.collab-diagram {
  position: relative;
  margin-bottom: 2rem;
}

.diagram-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 968px) {
  .diagram-flow {
    grid-template-columns: 1fr;
  }
}

.flow-stage {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stage-icon { font-size: 1.3rem; }
.stage-title { font-weight: 600; font-size: 0.95rem; }

.stage-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-box,
.output-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.box-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.box-value {
  font-size: 0.9rem;
  font-weight: 500;
}

.box-value.code {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand);
}

.arrow {
  text-align: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.storage-visual {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.storage-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.storage-block {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.info-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.info-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.transmission-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.transmission-packet {
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  overflow: hidden;
}

.packet-header {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.packet-body {
  padding: 0.75rem;
}

.packet-layer {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.packet-layer:last-child {
  margin-bottom: 0;
}

.layer-name {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.layer-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.collab-relationships {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.relationship-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  text-align: center;
}

.arrow-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.arrow-icon {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.key-points {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.points-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.point-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.point-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.point-content {
  flex: 1;
}

.point-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.point-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
