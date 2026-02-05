<!--
  AssetFingerprintDemo.vue
  资源指纹(hash)演示

  用途：
  展示前端构建中如何通过 hash 实现长期缓存策略。

  交互功能：
  - 构建对比：对比无 hash 和带 hash 的文件名
  - 缓存演示：模拟浏览器缓存行为
  - 版本对比：展示文件变更对缓存的影响
-->
<template>
  <div class="asset-fingerprint-demo">
    <div class="control-panel">
      <div class="title-section">
        <span class="icon">🔖</span>
        <span class="title">资源指纹 (Hash)</span>
        <span class="subtitle">长期缓存与版本控制</span>
      </div>

      <div class="controls">
        <button class="control-btn" @click="simulateBuild">
          🔄 重新构建
        </button>

        <div class="toggle-group">
          <label class="toggle-label">
            <input
              type="checkbox"
              v-model="showHash"
              @change="updateFileNames"
            >
            <span class="toggle-text">启用 Hash</span>
          </label>
        </div>
      </div>
    </div>

    <div class="main-content">
      <!-- 文件列表 -->
      <div class="files-panel">
        <div class="panel-header">
          <span class="panel-title">📁 构建产物</span>
          <span class="panel-stats">{{ files.length }} 个文件</span>
        </div>

        <div class="files-list">
          <div
            v-for="file in files"
            :key="file.id"
            class="file-item"
            :class="{
              changed: file.changed,
              selected: selectedFile?.id === file.id,
              'with-hash': showHash
            }"
            @click="selectFile(file)"
          >
            <div class="file-icon" :class="file.type">
              {{ getFileIcon(file.type) }}
            </div>

            <div class="file-info">
              <div class="file-name-row">
                <span class="file-base">{{ file.baseName }}</span>
                <span v-if="showHash" class="file-hash">.{{ file.hash }}</span>
                <span class="file-ext">.{{ file.ext }}</span>
                <span v-if="file.changed" class="changed-badge">更新</span>
              </div>
              <div class="file-meta">
                <span class="file-size">{{ formatSize(file.size) }}</span>
                <span class="dot">•</span>
                <span class="file-mtime">{{ formatTime(file.mtime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 浏览器缓存模拟 -->
      <div class="cache-panel">
        <div class="panel-header">
          <span class="panel-title">🌐 浏览器缓存</span>
          <span class="cache-stats">
            命中: {{ cacheHits }} | 未命中: {{ cacheMisses }}
          </span>
        </div>

        <div class="cache-visualization">
          <div class="cache-legend">
            <div class="legend-item">
              <span class="legend-color hit"></span>
              <span>缓存命中 (Hash 匹配)</span>
            </div>
            <div class="legend-item">
              <span class="legend-color miss"></span>
              <span>缓存未命中 (Hash 变化)</span>
            </div>
            <div class="legend-item">
              <span class="legend-color new"></span>
              <span>新文件 (无缓存)</span>
            </div>
          </div>

          <div class="cache-blocks">
            <div
              v-for="(block, index) in cacheBlocks"
              :key="index"
              class="cache-block"
              :class="block.status"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <div class="block-icon">{{ block.icon }}</div>
              <div class="block-name">{{ block.name }}</div>
              <div v-if="block.hash" class="block-hash">{{ block.hash }}</div>
            </div>
          </div>
        </div>

        <div class="cache-summary">
          <h4>📊 缓存策略效果</h4>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ cacheHitRate }}%</div>
              <div class="stat-label">缓存命中率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ bandwidthSaved }}</div>
              <div class="stat-label">节省带宽</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ loadTime }}</div>
              <div class="stat-label">平均加载时间</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文件详情 -->
    <div v-if="selectedFile" class="file-details">
      <div class="detail-header">
        <span class="detail-icon" :class="selectedFile.type">
          {{ getFileIcon(selectedFile.type) }}
        </span>
        <div class="detail-title-wrap">
          <span class="detail-title">{{ selectedFile.name }}</span>
          <span class="detail-path">dist/{{ selectedFile.path }}</span>
        </div>
        <button class="close-btn" @click="selectedFile = null">×</button>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <h4>📋 文件信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">大小:</span>
              <span class="info-value">{{ formatSize(selectedFile.size) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">类型:</span>
              <span class="info-value">{{ selectedFile.type.toUpperCase() }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">修改时间:</span>
              <span class="info-value">{{ formatTime(selectedFile.mtime) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Hash:</span>
              <span class="info-value hash">{{ selectedFile.hash }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section" v-if="selectedFile.dependencies?.length">
          <h4>🔗 依赖的模块 ({{ selectedFile.dependencies.length }})</h4>
          <div class="deps-tags">
            <span
              v-for="depId in selectedFile.dependencies"
              :key="depId"
              class="dep-tag"
              :style="{ background: getNode(depId)?.color || 'var(--vp-c-brand)' }"
              @click="selectFile(getNode(depId))"
            >
              {{ getNode(depId)?.name || depId }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <h4>💡 缓存策略</h4>
          <div class="cache-strategy">
            <p v-if="showHash">
              ✅ <strong>启用 Hash</strong>：文件名包含内容哈希 ({{ selectedFile.hash }})。
              文件内容变化时，URL 会改变，浏览器会重新请求。
              适合配置 <code>Cache-Control: immutable</code> 长期缓存。
            </p>
            <p v-else>
              ⚠️ <strong>无 Hash</strong>：文件名固定为 <code>{{ selectedFile.baseName }}.{{ selectedFile.ext }}</code>。
              更新文件后，需要手动刷新缓存或使用版本号查询参数。
              容易遇到"缓存不更新"的问题。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>资源指纹的作用：</strong>
        通过给文件名添加内容哈希（如 main.a3f7b2c.js），可以实现
        <strong>永久缓存</strong>策略。
        只有文件内容变化时哈希才会改变，浏览器才会重新下载。
        这样用户每次访问都能享受极速加载，同时又能及时获取最新代码。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const showHash = ref(true)
const selectedNode = ref(null)
const selectedFile = computed(() => selectedNode.value)
const cacheHits = ref(42)
const cacheMisses = ref(8)

// 模拟文件数据
const generateFiles = () => {
  const files = [
    { id: 'main', name: 'main.a3f7b2c.js', baseName: 'main', ext: 'js', type: 'js', size: 125, hash: 'a3f7b2c', mtime: Date.now() - 86400000, dependencies: ['vendor', 'utils'] },
    { id: 'vendor', name: 'vendor.e8d9a1b.js', baseName: 'vendor', ext: 'js', type: 'js', size: 450, hash: 'e8d9a1b', mtime: Date.now() - 172800000, dependencies: [] },
    { id: 'utils', name: 'utils.c4b5d6e.js', baseName: 'utils', ext: 'js', type: 'js', size: 28, hash: 'c4b5d6e', mtime: Date.now() - 3600000, dependencies: [], changed: true },
    { id: 'main-css', name: 'main.f2e8d4a.css', baseName: 'main', ext: 'css', type: 'css', size: 15, hash: 'f2e8d4a', mtime: Date.now() - 86400000, dependencies: [] },
    { id: 'logo', name: 'logo.b7c3a9f.png', baseName: 'logo', ext: 'png', type: 'image', size: 12, hash: 'b7c3a9f', mtime: Date.now() - 259200000, dependencies: [] },
    { id: 'index', name: 'index.html', baseName: 'index', ext: 'html', type: 'html', size: 2, hash: null, mtime: Date.now(), dependencies: ['main', 'main-css'] }
  ]
  return files.map(f => ({ ...f, path: f.name }))
}

const files = ref(generateFiles())

const cacheBlocks = computed(() => {
  return files.value
    .filter(f => f.type !== 'html')
    .map((f, i) => ({
      name: f.baseName,
      icon: getFileIcon(f.type),
      hash: showHash.value ? f.hash : null,
      status: f.changed ? 'miss' : showHash.value ? 'hit' : 'new'
    }))
})

const cacheHitRate = computed(() => {
  const total = cacheBlocks.value.length
  const hits = cacheBlocks.value.filter(b => b.status === 'hit').length
  return Math.round((hits / total) * 100) || 0
})

const bandwidthSaved = computed(() => {
  const total = files.value.reduce((sum, f) => sum + (f.size || 0), 0)
  const saved = Math.round(total * (cacheHitRate.value / 100))
  return saved + ' KB'
})

const loadTime = computed(() => {
  const base = 200
  const hitRate = cacheHitRate.value
  return Math.round(base - (hitRate * 1.5)) + 'ms'
})

const getFileIcon = (type) => {
  const icons = {
    js: '📜',
    css: '🎨',
    image: '🖼️',
    html: '📄'
  }
  return icons[type] || '📄'
}

const formatSize = (size) => {
  if (size > 1024) return (size / 1024).toFixed(1) + ' MB'
  return size + ' KB'
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const simulateBuild = () => {
  files.value = generateFiles()
  // 随机标记一些文件为已更改
  files.value.forEach(f => {
    f.changed = Math.random() > 0.7
  })
}

const updateFileNames = () => {
  // 更新文件名显示
}

const getNode = (id) => files.value.find(f => f.id === id)

onMounted(() => {
  simulateBuild()
})

import { watch } from 'vue'
</script>

<style scoped>
.asset-fingerprint-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-section .icon {
  font-size: 1.5rem;
}

.title-section .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.title-section .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.control-btn:hover {
  opacity: 0.85;
}

.toggle-group {
  display: flex;
  align-items: center;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.toggle-label input {
  cursor: pointer;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

.files-panel,
.cache-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-weight: bold;
  font-size: 0.9rem;
}

.panel-stats,
.cache-stats {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.files-list {
  max-height: 300px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.file-item:last-child {
  border-bottom: none;
}

.file-item:hover,
.file-item.selected {
  background: var(--vp-c-bg-soft);
}

.file-item.changed {
  background: rgba(255, 107, 107, 0.1);
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  background: var(--vp-c-bg-soft);
}

.file-icon.js {
  background: #f7df1e;
}

.file-icon.css {
  background: #264de4;
}

.file-icon.image {
  background: #ff6b6b;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: monospace;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.file-base {
  color: var(--vp-c-text-1);
}

.file-hash {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.file-ext {
  color: var(--vp-c-text-2);
}

.changed-badge {
  background: #ff6b6b;
  color: white;
  font-size: 0.65rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: sans-serif;
  margin-left: 0.25rem;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.dot {
  opacity: 0.5;
}

.cache-visualization {
  padding: 1rem;
}

.cache-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.hit {
  background: #22c55e;
}

.legend-color.miss {
  background: #ef4444;
}

.legend-color.new {
  background: #3b82f6;
}

.cache-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
}

.cache-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  border-radius: 6px;
  text-align: center;
  animation: fadeIn 0.3s ease backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cache-block.hit {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.cache-block.miss {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.cache-block.new {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.block-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.block-name {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.block-hash {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  margin-top: 0.1rem;
}

.cache-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.cache-summary h4 {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.file-details {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.detail-icon.js {
  background: rgba(247, 223, 30, 0.2);
}

.detail-icon.css {
  background: rgba(38, 77, 228, 0.2);
}

.detail-icon.image {
  background: rgba(255, 107, 107, 0.2);
}

.detail-title-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
}

.detail-path {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  gap: 0.75rem;
}

.detail-section h4 {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.info-label {
  color: var(--vp-c-text-3);
  min-width: 60px;
}

.info-value {
  color: var(--vp-c-text-1);
}

.info-value.hash {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-brand);
}

.deps-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.dep-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.dep-tag:hover {
  opacity: 0.85;
}

.cache-strategy {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
}

.cache-strategy p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.cache-strategy code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
