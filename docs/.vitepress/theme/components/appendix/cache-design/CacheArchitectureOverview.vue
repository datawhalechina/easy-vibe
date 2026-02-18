<template>
  <div class="cache-architecture-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">多级缓存架构</span>
      <span class="subtitle">像图书分馆一样层层拦截请求</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">连锁图书馆</span>找书：先在桌面上找（CDN），没有就去房间书架（本地缓存），
      再没有就去楼层的公共阅览室（Redis），最后才去总馆（数据库）。每一层都能拦截大量请求。
    </div>

    <div class="architecture-diagram">
      <div class="layer user-layer">
        <div class="layer-icon">
          👤
        </div>
        <div class="layer-label">
          用户请求
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer cdn-layer"
        :class="{ active: activeLayer === 'cdn' }"
      >
        <div class="layer-header">
          <span class="icon">🌐</span>
          <span class="layer-name">CDN 缓存</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">位置</span>
            <span class="value">全球边缘节点</span>
          </div>
          <div class="detail-item">
            <span class="label">内容</span>
            <span class="value">静态资源</span>
          </div>
          <div class="detail-item">
            <span class="label">命中率</span>
            <span class="value highlight">{{ cdnHitRate }}%</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer local-layer"
        :class="{ active: activeLayer === 'local' }"
      >
        <div class="layer-header">
          <span class="icon">💻</span>
          <span class="layer-name">本地缓存</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">位置</span>
            <span class="value">应用服务器内存</span>
          </div>
          <div class="detail-item">
            <span class="label">内容</span>
            <span class="value">热点数据</span>
          </div>
          <div class="detail-item">
            <span class="label">速度</span>
            <span class="value highlight">极快 (~1ms)</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div
        class="layer distributed-layer"
        :class="{ active: activeLayer === 'distributed' }"
      >
        <div class="layer-header">
          <span class="icon">🗄️</span>
          <span class="layer-name">分布式缓存</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">位置</span>
            <span class="value">Redis 集群</span>
          </div>
          <div class="detail-item">
            <span class="label">内容</span>
            <span class="value">共享缓存数据</span>
          </div>
          <div class="detail-item">
            <span class="label">容量</span>
            <span class="value highlight">可扩展</span>
          </div>
        </div>
      </div>

      <div class="arrow-down">
        ⬇
      </div>

      <div class="layer database-layer">
        <div class="layer-header">
          <span class="icon">🗃️</span>
          <span class="layer-name">数据库</span>
        </div>
        <div class="layer-details">
          <div class="detail-item">
            <span class="label">位置</span>
            <span class="value">MySQL / PostgreSQL</span>
          </div>
          <div class="detail-item">
            <span class="label">速度</span>
            <span class="value warning">较慢 (~100ms)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button
        v-for="layer in layers"
        :key="layer.id"
        class="layer-btn"
        :class="{ active: activeLayer === layer.id }"
        @click="activeLayer = layer.id"
      >
        {{ layer.name }}
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>多级缓存通过在不同层次拦截请求，逐层过滤，最终只有极少数请求会打到数据库。就像漏斗一样，越往下流量越小。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref('local')
const cdnHitRate = ref(95)

const layers = [
  { id: 'cdn', name: 'CDN 缓存' },
  { id: 'local', name: '本地缓存' },
  { id: 'distributed', name: '分布式缓存' },
  { id: 'database', name: '数据库' }
]
</script>

<style scoped>
.cache-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.layer {
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  transition: all 0.3s;
}

.user-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.layer-icon {
  font-size: 2rem;
}

.layer-label {
  font-weight: 600;
  margin-top: 0.25rem;
  font-size: 0.9rem;
}

.cdn-layer,
.local-layer,
.distributed-layer,
.database-layer {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  padding: 0.75rem;
  cursor: pointer;
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.layer-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  font-size: 0.8rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item .label {
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
}

.detail-item .value {
  font-weight: 500;
}

.detail-item .value.highlight {
  color: #22c55e;
}

.detail-item .value.warning {
  color: #f59e0b;
}

.arrow-down {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.layer-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.layer-btn:hover {
  border-color: var(--vp-c-brand);
}

.layer-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
