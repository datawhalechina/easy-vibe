<template>
  <div class="physical-layer-demo">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">物理层：电信号的传递</span>
      <span class="subtitle">比特如何通过物理介质传输</span>
    </div>

    <div class="media-selector">
      <div class="selector-label">选择传输介质：</div>
      <div class="media-buttons">
        <button
          v-for="media in mediaTypes"
          :key="media.id"
          :class="['media-btn', { active: activeMedia === media.id }]"
          @click="activeMedia = media.id"
        >
          {{ media.icon }} {{ media.name }}
        </button>
      </div>
    </div>

    <!-- 信号可视化 -->
    <div class="signal-visualization">
      <div class="signal-header">
        <span class="signal-title">{{ currentMedia.signalName }}</span>
        <span class="signal-desc">{{ currentMedia.signalDesc }}</span>
      </div>

      <div class="signal-canvas">
        <div class="signal-wave">
          <svg viewBox="0 0 800 150" class="wave-svg">
            <!-- 坐标轴 -->
            <line x1="50" y1="75" x2="750" y2="75" stroke="var(--vp-c-divider)" stroke-width="2" />

            <!-- 信号波形 -->
            <path
              :d="currentMedia.wavePath"
              fill="none"
              :stroke="activeMedia === 'fiber' ? '#ff6b6b' : 'var(--vp-c-brand)'"
              stroke-width="3"
              class="signal-path"
            />

            <!-- 数据标记 -->
            <g v-if="activeMedia === 'copper'">
              <text x="100" y="40" fill="var(--vp-c-text-2)" font-size="12">1</text>
              <text x="180" y="110" fill="var(--vp-c-text-2)" font-size="12">0</text>
              <text x="260" y="40" fill="var(--vp-c-text-2)" font-size="12">1</text>
              <text x="340" y="40" fill="var(--vp-c-text-2)" font-size="12">1</text>
              <text x="420" y="110" fill="var(--vp-c-text-2)" font-size="12">0</text>
            </g>

            <g v-if="activeMedia === 'fiber'">
              <text x="100" y="40" fill="#ff6b6b" font-size="12">开</text>
              <text x="180" y="110" fill="var(--vp-c-text-2)" font-size="12">关</text>
              <text x="260" y="40" fill="#ff6b6b" font-size="12">开</text>
              <text x="340" y="40" fill="#ff6b6b" font-size="12">开</text>
              <text x="420" y="110" fill="var(--vp-c-text-2)" font-size="12">关</text>
            </g>
          </svg>
        </div>

        <div class="signal-legend">
          <div class="legend-item">
            <div class="legend-color high"></div>
            <span class="legend-label">高电平/开 (1)</span>
          </div>
          <div class="legend-item">
            <div class="legend-color low"></div>
            <span class="legend-label">低电平/关 (0)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 介质特性 -->
    <div class="media-specs">
      <div class="specs-grid">
        <div class="spec-card">
          <div class="spec-icon">🚀</div>
          <div class="spec-content">
            <div class="spec-label">传输速度</div>
            <div class="spec-value">{{ currentMedia.speed }}</div>
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-icon">📏</div>
          <div class="spec-content">
            <div class="spec-label">最大距离</div>
            <div class="spec-value">{{ currentMedia.distance }}</div>
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-icon">🛡️</div>
          <div class="spec-content">
            <div class="spec-label">抗干扰能力</div>
            <div class="spec-value">{{ currentMedia.immunity }}</div>
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-icon">💰</div>
          <div class="spec-content">
            <div class="spec-label">成本</div>
            <div class="spec-value">{{ currentMedia.cost }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="applications">
      <div class="app-title">典型应用场景</div>
      <div class="app-list">
        <div v-for="(app, index) in currentMedia.applications" :key="index" class="app-item">
          <span class="app-icon">{{ app.icon }}</span>
          <span class="app-text">{{ app.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMedia = ref('copper')

const mediaTypes = [
  { id: 'copper', name: '双绞线', icon: '🔌' },
  { id: 'fiber', name: '光纤', icon: '💡' },
  { id: 'wireless', name: '无线', icon: '📡' }
]

const mediaData = {
  copper: {
    signalName: '电信号（电压高低）',
    signalDesc: '用高低电压表示 0 和 1',
    wavePath: 'M 50 75 L 100 75 L 100 25 L 150 25 L 150 125 L 200 125 L 200 25 L 250 25 L 250 25 L 300 25 L 300 125 L 350 125 L 350 25 L 400 25',
    speed: '最高 10 Gbps',
    distance: '100 米',
    immunity: '较差（易受电磁干扰）',
    cost: '低',
    applications: [
      { icon: '🏠', text: '家庭局域网（网线连接）' },
      { icon: '🏢', text: '办公室网络布线' },
      { icon: '🖥️', text: '电脑连接路由器' }
    ]
  },
  fiber: {
    signalName: '光信号（光的开关）',
    signalDesc: '用光脉冲表示 0 和 1',
    wavePath: 'M 50 75 L 100 75 L 100 25 L 150 25 L 150 125 L 200 125 L 200 25 L 250 25 L 250 25 L 300 25 L 300 125 L 350 125 L 350 25 L 400 25',
    speed: '最高 100+ Tbps',
    distance: '几十公里',
    immunity: '极强（不受电磁干扰）',
    cost: '高',
    applications: [
      { icon: '🌐', text: '互联网骨干网' },
      { icon: '🏢', text: '跨楼宇网络连接' },
      { icon: '📺', text: '光纤入户（FTTH）' }
    ]
  },
  wireless: {
    signalName: '电磁波（无线电波）',
    signalDesc: '用不同频率的电磁波表示数据',
    wavePath: 'M 50 75 Q 87.5 25 125 75 T 200 75 T 275 75 T 350 75 T 425 75',
    speed: '最高 10+ Gbps (WiFi 6E)',
    distance: '几十米到几公里',
    immunity: '一般（易受障碍物影响）',
    cost: '中等',
    applications: [
      { icon: '📱', text: '手机连接移动网络' },
      { icon: '💻', text: '笔记本 WiFi 上网' },
      { icon: '🎮', text: '蓝牙设备连接' }
    ]
  }
}

const currentMedia = computed(() => mediaData[activeMedia.value])
</script>

<style scoped>
.physical-layer-demo {
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

.media-selector {
  margin-bottom: 2rem;
}

.selector-label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.media-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.media-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.media-btn:hover {
  border-color: var(--vp-c-brand);
}

.media-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.signal-visualization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.signal-header {
  margin-bottom: 1rem;
}

.signal-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-brand);
  display: block;
  margin-bottom: 0.35rem;
}

.signal-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.signal-canvas {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
}

.signal-wave {
  margin-bottom: 1rem;
}

.wave-svg {
  width: 100%;
  height: auto;
  display: block;
}

.signal-path {
  animation: drawSignal 2s ease-in-out infinite;
}

@keyframes drawSignal {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

.signal-legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.legend-color.high {
  background: var(--vp-c-brand);
}

.legend-color.low {
  background: var(--vp-c-divider);
}

.media-specs {
  margin-bottom: 1.5rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.spec-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.spec-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.spec-content {
  flex: 1;
}

.spec-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.spec-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.applications {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.app-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.app-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.app-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.app-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}
</style>
