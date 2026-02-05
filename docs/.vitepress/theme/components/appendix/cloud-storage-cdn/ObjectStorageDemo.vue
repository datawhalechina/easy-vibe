<!--
  ObjectStorageDemo.vue
  对象存储架构演示 - 展示桶、对象、元数据的核心概念
-->
<template>
  <div class="object-storage-demo">
    <div class="header">
      <div class="title">对象存储架构</div>
      <div class="subtitle">理解 Bucket、Object 和 Metadata 的关系</div>
    </div>

    <div class="storage-architecture">
      <!-- 账户层 -->
      <div class="account-layer">
        <div class="account-icon">👤</div>
        <div class="account-name">云账户 (Account)</div>
        <div class="account-desc">管理权限、计费、全局配置</div>
      </div>

      <div class="connector">▼</div>

      <!-- 桶层 -->
      <div class="buckets-container">
        <div class="section-title">
          <span>📦</span>
          <span>存储桶 (Buckets)</span>
          <span class="section-desc">命名空间隔离，权限控制</span>
        </div>

        <div class="buckets-row">
          <div
            v-for="bucket in buckets"
            :key="bucket.name"
            class="bucket-card"
            :class="{ active: selectedBucket === bucket.name }"
            @click="selectBucket(bucket.name)"
          >
            <div class="bucket-icon">{{ bucket.icon }}</div>
            <div class="bucket-name">{{ bucket.name }}</div>
            <div class="bucket-meta">{{ bucket.objects }} 对象</div>
            <div class="bucket-size">{{ bucket.size }}</div>
          </div>
        </div>
      </div>

      <div class="connector">▼</div>

      <!-- 对象层 -->
      <div class="objects-container">
        <div class="section-title">
          <span>📄</span>
          <span>对象 (Objects)</span>
          <span class="section-desc">文件数据 + 元数据</span>
        </div>

        <div v-if="selectedBucket" class="objects-list">
          <div
            v-for="obj in currentObjects"
            :key="obj.key"
            class="object-item"
            :class="{ selected: selectedObject === obj.key }"
            @click="selectObject(obj)"
          >
            <div class="object-icon">{{ getFileIcon(obj.type) }}</div>
            <div class="object-info">
              <div class="object-key">{{ obj.key }}</div>
              <div class="object-meta">{{ obj.size }} · {{ obj.lastModified }}</div>
            </div>
            <div class="object-arrow">▶</div>
          </div>
        </div>

        <div v-else class="objects-placeholder">
          点击上方存储桶查看对象列表
        </div>
      </div>

      <div class="connector">▼</div>

      <!-- 元数据层 -->
      <div class="metadata-container">
        <div class="section-title">
          <span>🏷️</span>
          <span>元数据 (Metadata)</span>
          <span class="section-desc">系统元数据 + 自定义元数据</span>
        </div>

        <div v-if="selectedObject && currentMetadata" class="metadata-content">
          <div class="metadata-section">
            <div class="metadata-section-title">系统元数据 (System)</div>
            <div class="metadata-list">
              <div v-for="(value, key) in currentMetadata.system" :key="key" class="metadata-item">
                <span class="metadata-key">{{ key }}:</span>
                <span class="metadata-value">{{ value }}</span>
              </div>
            </div>
          </div>

          <div class="metadata-section">
            <div class="metadata-section-title">自定义元数据 (Custom)</div>
            <div class="metadata-list">
              <div v-for="(value, key) in currentMetadata.custom" :key="key" class="metadata-item">
                <span class="metadata-key">{{ key }}:</span>
                <span class="metadata-value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="metadata-placeholder">
          点击左侧对象查看详细元数据
        </div>
      </div>
    </div>

    <div class="architecture-summary">
      <div class="summary-title">架构要点总结</div>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-icon">📦</div>
          <div class="summary-text">
            <strong>Bucket（桶）</strong>
            <span>全局命名空间，用于组织和隔离数据</span>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-icon">📄</div>
          <div class="summary-text">
            <strong>Object（对象）</strong>
            <span>键值对存储，包含数据、元数据和唯一 Key</span>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-icon">🏷️</div>
          <div class="summary-text">
            <strong>Metadata（元数据）</strong>
            <span>系统元数据 + 自定义标签，支持检索和管理</span>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-icon">🔐</div>
          <div class="summary-text">
            <strong>Access Control（访问控制）</strong>
            <span>Bucket Policy、ACL、STS 临时凭证多层权限</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 存储桶数据
const buckets = [
  {
    name: 'myapp-images-prod',
    icon: '🖼️',
    objects: 12543,
    size: '256 GB'
  },
  {
    name: 'myapp-videos-prod',
    icon: '🎬',
    objects: 892,
    size: '1.2 TB'
  },
  {
    name: 'myapp-backups',
    icon: '💾',
    objects: 3456,
    size: '500 GB'
  }
]

// 对象数据
const objectsData = {
  'myapp-images-prod': [
    { key: 'avatars/user123.jpg', type: 'image/jpeg', size: '156 KB', lastModified: '2024-01-15' },
    { key: 'products/shoes-01.png', type: 'image/png', size: '2.3 MB', lastModified: '2024-01-14' },
    { key: 'banners/sale-2024.webp', type: 'image/webp', size: '456 KB', lastModified: '2024-01-13' }
  ],
  'myapp-videos-prod': [
    { key: 'tutorials/intro.mp4', type: 'video/mp4', size: '156 MB', lastModified: '2024-01-15' },
    { key: 'ads/promo-2024.mp4', type: 'video/mp4', size: '234 MB', lastModified: '2024-01-14' }
  ],
  'myapp-backups': [
    { key: 'db/daily-20240115.sql.gz', type: 'application/gzip', size: '456 MB', lastModified: '2024-01-15' },
    { key: 'logs/access-20240114.log.gz', type: 'application/gzip', size: '123 MB', lastModified: '2024-01-14' }
  ]
}

// 元数据
const metadataData = {
  'avatars/user123.jpg': {
    system: {
      'Content-Type': 'image/jpeg',
      'Content-Length': '159745',
      'Last-Modified': '2024-01-15T08:30:00Z',
      'ETag': '"abc123def456"',
      'x-oss-storage-class': 'Standard'
    },
    custom: {
      'x-oss-meta-owner': 'user123',
      'x-oss-meta-usage': 'avatar',
      'x-oss-meta-uploaded-by': 'web-upload'
    }
  },
  'products/shoes-01.png': {
    system: {
      'Content-Type': 'image/png',
      'Content-Length': '2412555',
      'Last-Modified': '2024-01-14T16:20:00Z',
      'ETag': '"xyz789ghi012"',
      'x-oss-storage-class': 'Standard'
    },
    custom: {
      'x-oss-meta-product-id': 'shoes-01',
      'x-oss-meta-category': 'footwear',
      'x-oss-meta-price': '199.99'
    }
  }
}

// 状态
const selectedBucket = ref(null)
const selectedObject = ref(null)

// 计算属性
const currentObjects = computed(() => {
  if (!selectedBucket.value) return []
  return objectsData[selectedBucket.value] || []
})

const currentMetadata = computed(() => {
  if (!selectedObject.value) return null
  return metadataData[selectedObject.value] || null
})

// 方法
const selectBucket = (name) => {
  selectedBucket.value = name
  selectedObject.value = null
}

const selectObject = (obj) => {
  selectedObject.value = obj.key
}

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return '🖼️'
  if (type.startsWith('video/')) return '🎬'
  if (type.startsWith('audio/')) return '🎵'
  if (type.includes('pdf')) return '📄'
  if (type.includes('zip') || type.includes('gzip')) return '📦'
  return '📄'
}
</script>

<style scoped>
.object-storage-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.storage-architecture {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.account-layer {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #6366f1;
}

.account-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.account-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #4338ca;
}

.account-desc {
  font-size: 0.75rem;
  color: #6366f1;
  margin-top: 0.25rem;
}

.connector {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1.25rem;
}

.buckets-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.section-desc {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.buckets-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.bucket-card {
  flex: 1;
  min-width: 140px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.bucket-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.bucket-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-dimm);
}

.bucket-icon {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.bucket-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.bucket-meta {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.bucket-size {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-top: 0.25rem;
}

.objects-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  min-height: 150px;
}

.objects-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.object-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.object-item:hover {
  background: var(--vp-c-bg-mute);
}

.object-item.selected {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.object-icon {
  font-size: 1.25rem;
}

.object-info {
  flex: 1;
  min-width: 0;
}

.object-key {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.object-meta {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.object-arrow {
  color: var(--vp-c-text-3);
}

.objects-placeholder {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.metadata-container {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  min-height: 150px;
}

.metadata-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .metadata-content {
    grid-template-columns: 1fr;
  }
}

.metadata-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
}

.metadata-section-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.metadata-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.75rem;
}

.metadata-key {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.metadata-value {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}

.metadata-placeholder {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.architecture-summary {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  margin-top: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.summary-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

.summary-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.summary-icon {
  font-size: 1.5rem;
}

.summary-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-text strong {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.summary-text span {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
