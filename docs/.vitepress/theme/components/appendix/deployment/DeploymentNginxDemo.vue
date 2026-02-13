<script setup>
import { ref, computed } from 'vue'

const enableProxy = ref(false)
const incomingRequests = ref(0)
const proxiedRequests = ref(0)

const serverPort = ref(3000)
const nginxPort = ref(80)

const servers = ref([
  { id: 1, name: 'Node.js 应用', port: 3000, status: 'running', load: 45 },
  { id: 2, name: 'Python API', port: 4000, status: 'running', load: 30 }
])

const selectedServer = ref(0)

const toggleProxy = () => {
  enableProxy.value = !enableProxy.value
  if (!enableProxy.value) {
    proxiedRequests.value = 0
  }
}

const simulateRequest = () => {
  if (!enableProxy.value) return
  incomingRequests.value++
  proxiedRequests.value++
  servers.value[selectedServer.value].load = Math.min(100, servers.value[selectedServer.value].load + 5)
  setTimeout(() => {
    servers.value[selectedServer.value].load = Math.max(10, servers.value[selectedServer.value].load - 5)
  }, 1000)
}

// Auto simulate
setInterval(() => {
  if (enableProxy.value) {
    simulateRequest()
  }
}, 2000)
</script>

<template>
  <div class="deployment-nginx">
    <div class="demo-header">
      <h3>Nginx反向代理演示</h3>
      <p class="subtitle">门店服务员引导顾客</p>
    </div>

    <div class="intro-text">
      <p>
        就像咖啡店的<strong>服务员</strong>引导顾客到相应的吧台（咖啡、蛋糕、收银），
        Nginx 作为反向代理，把外部请求转发给后端的不同服务。
      </p>
    </div>

    <div class="demo-content">
      <!-- 开关控制 -->
      <div class="control-panel">
        <div class="switch-section">
          <span class="switch-label">启用反向代理</span>
          <button
            class="toggle-btn"
            :class="{ active: enableProxy }"
            @click="toggleProxy"
          >
            <span class="toggle-slider"></span>
          </button>
        </div>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">{{ incomingRequests }}</span>
            <span class="stat-label">总请求</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ proxiedRequests }}</span>
            <span class="stat-label">已转发</span>
          </div>
        </div>
      </div>

      <!-- 架构图 -->
      <div class="architecture-diagram">
        <div class="diagram-layer client">
          <div class="layer-icon">👥</div>
          <div class="layer-title">用户浏览器</div>
          <div class="layer-detail">访问 :80</div>
        </div>

        <div class="diagram-arrow">↓</div>

        <div class="diagram-layer nginx" :class="{ active: enableProxy }">
          <div class="layer-icon">🛎️</div>
          <div class="layer-title">Nginx (反向代理)</div>
          <div class="layer-detail">监听 {{ nginxPort }} 端口</div>
        </div>

        <div class="diagram-arrow" :class="{ active: enableProxy }">↓ 转发</div>

        <div class="diagram-layer backend">
          <div class="layer-title">后端服务</div>
          <div class="server-list">
            <div
              v-for="(server, idx) in servers"
              :key="server.id"
              class="server-item"
              :class="{ active: selectedServer === idx }"
            >
              <div class="server-icon">🖥️</div>
              <div class="server-info">
                <div class="server-name">{{ server.name }}</div>
                <div class="server-port">:{{ server.port }}</div>
              </div>
              <div class="server-load">
                <div class="load-bar">
                  <div
                    class="load-fill"
                    :style="{ width: `${server.load}%` }"
                  ></div>
                </div>
                <span class="load-text">{{ server.load }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 配置示例 -->
      <div class="config-example">
        <div class="config-title">📝 Nginx 配置示例</div>
        <pre class="code-block"><code>server {
    listen {{ nginxPort }};
    server_name example.com;

    location / {
        proxy_pass http://localhost:{{ serverPort }};
        proxy_set_header Host $host;
    }
}</code></pre>
      </div>
    </div>

    <div class="info-box">
      <p v-if="!enableProxy">
        💡 <strong>等待启用</strong>：点击"启用反向代理"开关，看看 Nginx 如何将请求转发给后端服务。
      </p>
      <p v-else>
        ✅ <strong>运行中</strong>：Nginx 正在监听 {{ nginxPort }} 端口，将请求转发到后端的 {{ serverPort }} 端口！
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-nginx {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.switch-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.switch-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.toggle-btn {
  width: 50px;
  height: 26px;
  background: var(--vp-c-bg-alt);
  border-radius: 13px;
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.toggle-slider {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: all 0.3s ease;
}

.toggle-btn.active .toggle-slider {
  left: 25px;
}

.stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.architecture-diagram {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.diagram-layer {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 350px;
  transition: all 0.3s ease;
}

.diagram-layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.layer-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.layer-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.diagram-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.diagram-arrow.active {
  color: var(--vp-c-brand);
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.server-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.server-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.server-item.active {
  border-color: var(--vp-c-brand);
}

.server-icon {
  font-size: 1.5rem;
}

.server-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.server-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.server-port {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.server-load {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.load-bar {
  width: 60px;
  height: 6px;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.load-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  transition: width 0.3s ease;
}

.load-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  min-width: 2.5rem;
  text-align: right;
}

.config-example {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.config-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.code-block {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: #d4d4d4;
  line-height: 1.5;
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .control-panel {
    flex-direction: column;
  }

  .stats {
    width: 100%;
    justify-content: space-around;
  }
}
</style>
