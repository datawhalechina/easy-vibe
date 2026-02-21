<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: '全部' },
  { id: 'web', label: '网页' },
  { id: 'data', label: '数据库' },
  { id: 'dev', label: '开发常用' },
  { id: 'remote', label: '远程/传输' }
]

const ports = [
  { port: 80, name: 'HTTP', desc: '网页访问（未加密）', category: 'web', risk: 'low', example: 'http://example.com' },
  { port: 443, name: 'HTTPS', desc: '网页访问（加密）', category: 'web', risk: 'low', example: 'https://example.com' },
  { port: 22, name: 'SSH', desc: '安全远程登录', category: 'remote', risk: 'medium', example: 'ssh user@server' },
  { port: 21, name: 'FTP', desc: '文件传输', category: 'remote', risk: 'high', example: 'ftp://server/file.zip' },
  { port: 3306, name: 'MySQL', desc: 'MySQL 数据库', category: 'data', risk: 'high', example: 'mysql -h localhost -P 3306' },
  { port: 5432, name: 'PostgreSQL', desc: 'PostgreSQL 数据库', category: 'data', risk: 'high', example: 'psql -h localhost -p 5432' },
  { port: 27017, name: 'MongoDB', desc: 'MongoDB 数据库', category: 'data', risk: 'high', example: 'mongosh localhost:27017' },
  { port: 6379, name: 'Redis', desc: 'Redis 缓存', category: 'data', risk: 'high', example: 'redis-cli -p 6379' },
  { port: 3000, name: 'Node/React', desc: 'Node.js / React 开发服务器', category: 'dev', risk: 'low', example: 'npm start → localhost:3000' },
  { port: 5173, name: 'Vite', desc: 'Vite 开发服务器', category: 'dev', risk: 'low', example: 'npm run dev → localhost:5173' },
  { port: 8080, name: '通用 HTTP', desc: 'HTTP 备用端口 / 代理', category: 'dev', risk: 'low', example: 'localhost:8080/api' },
  { port: 8000, name: 'Django/Python', desc: 'Django / Python HTTP 服务', category: 'dev', risk: 'low', example: 'python manage.py runserver' },
  { port: 5000, name: 'Flask', desc: 'Flask 开发服务器', category: 'dev', risk: 'low', example: 'flask run → localhost:5000' },
  { port: 4200, name: 'Angular', desc: 'Angular 开发服务器', category: 'dev', risk: 'low', example: 'ng serve → localhost:4200' },
  { port: 53, name: 'DNS', desc: '域名解析', category: 'remote', risk: 'medium', example: 'dig @8.8.8.8 example.com' },
  { port: 25, name: 'SMTP', desc: '邮件发送', category: 'remote', risk: 'medium', example: '邮件服务器发信端口' },
]

const riskLabels = { low: '安全', medium: '注意', high: '敏感' }
const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' }

const filteredPorts = computed(() => {
  return ports.filter(p => {
    const matchCategory = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const matchSearch = !searchQuery.value ||
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.port.toString().includes(searchQuery.value) ||
      p.desc.includes(searchQuery.value)
    return matchCategory && matchSearch
  })
})

const expandedPort = ref(null)

function toggleExpand(port) {
  expandedPort.value = expandedPort.value === port ? null : port
}
</script>

<template>
  <div class="common-ports-demo">
    <div class="control-panel">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索端口号或服务名..."
          class="search-input"
        >
      </div>
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['tab-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="port-table">
        <div class="table-header">
          <span class="col-port">端口</span>
          <span class="col-name">服务</span>
          <span class="col-desc">说明</span>
          <span class="col-risk">暴露风险</span>
        </div>
        <div
          v-for="p in filteredPorts"
          :key="p.port"
          :class="['table-row', { expanded: expandedPort === p.port }]"
          @click="toggleExpand(p.port)"
        >
          <div class="row-main">
            <code class="col-port">{{ p.port }}</code>
            <span class="col-name">{{ p.name }}</span>
            <span class="col-desc">{{ p.desc }}</span>
            <span
              class="col-risk risk-badge"
              :style="{ color: riskColors[p.risk], borderColor: riskColors[p.risk] }"
            >
              {{ riskLabels[p.risk] }}
            </span>
          </div>
          <transition name="expand">
            <div v-if="expandedPort === p.port" class="row-detail">
              <span class="detail-label">使用示例：</span>
              <code>{{ p.example }}</code>
            </div>
          </transition>
        </div>
        <div v-if="filteredPorts.length === 0" class="empty-state">
          没有匹配的端口，试试其他关键词？
        </div>
      </div>
    </div>

    <div class="range-explain">
      <div class="range-item">
        <div class="range-header well-known">0 – 1023</div>
        <div class="range-body">
          <strong>系统端口</strong>
          <span>预留给标准服务（HTTP、SSH 等），普通用户不能随便占用。</span>
        </div>
      </div>
      <div class="range-item">
        <div class="range-header registered">1024 – 49151</div>
        <div class="range-body">
          <strong>注册端口</strong>
          <span>留给常见应用（MySQL 3306、Redis 6379 等），开发中最常遇到的范围。</span>
        </div>
      </div>
      <div class="range-item">
        <div class="range-header dynamic">49152 – 65535</div>
        <div class="range-body">
          <strong>动态端口</strong>
          <span>操作系统临时分配的端口，比如你的浏览器发请求时，系统会随机给你一个。</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>安全提醒：</strong>数据库端口（3306、5432、27017、6379）绝对不要直接暴露到公网！生产环境应只允许内网访问或通过 SSH 隧道连接。
    </div>
  </div>
</template>

<style scoped>
.common-ports-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.search-icon { font-size: 0.9rem; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  outline: none;
}

.category-tabs {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.visualization-area {
  padding: 0.75rem;
}

.port-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.table-header {
  display: grid;
  grid-template-columns: 70px 100px 1fr 70px;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.table-row {
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.15s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--vp-c-bg-alt);
}

.row-main {
  display: grid;
  grid-template-columns: 70px 100px 1fr 70px;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  font-size: 0.85rem;
}

.col-port {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  font-size: 0.85rem;
}

.col-name {
  font-weight: 600;
}

.col-desc {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.risk-badge {
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  text-align: center;
}

.row-detail {
  padding: 0.4rem 0.75rem 0.6rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  border-top: 1px dashed var(--vp-c-divider);
}

.detail-label {
  font-weight: 600;
  margin-right: 0.4rem;
}

.row-detail code {
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
}

.range-explain {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.75rem;
}

.range-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.range-header {
  padding: 0.4rem 0.6rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  color: white;
}

.range-header.well-known { background: #ef4444; }
.range-header.registered { background: #f59e0b; }
.range-header.dynamic { background: #10b981; }

.range-body {
  padding: 0.5rem 0.6rem;
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.range-body strong {
  font-size: 0.82rem;
}

.range-body span {
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.info-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-red-1);
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.2s ease;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 640px) {
  .table-header, .row-main {
    grid-template-columns: 55px 80px 1fr 55px;
    gap: 0.3rem;
  }
  .range-explain {
    grid-template-columns: 1fr;
  }
}
</style>
