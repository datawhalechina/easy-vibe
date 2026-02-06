<!--
  RateLimitingDemo.vue
  限流算法 - 令牌桶/漏桶/滑动窗口
-->
<template>
  <div class="rate-limiting-demo">
    <div class="header">
      <div class="title">⚡ 限流算法：系统不会被"流量洪水"冲垮的秘诀</div>
      <div class="subtitle">想象成水坝的闸门——控制水流速度，防止下游被淹没</div>
    </div>

    <div class="algorithm-selector">
      <div class="selector-title">选择限流算法</div>
      <div class="algorithm-tabs">
        <button
          v-for="algo in algorithms"
          :key="algo.id"
          :class="['algo-tab', { active: currentAlgo === algo.id }]"
          @click="currentAlgo = algo.id"
        >
          <span class="algo-icon">{{ algo.icon }}</span>
          <span class="algo-name">{{ algo.name }}</span>
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="vis-header">
        <div class="vis-title">{{ currentAlgoData.visualTitle }}</div>
        <div class="vis-controls">
          <button class="control-btn" @click="toggleSimulation" :disabled="isSimulating">
            {{ isSimulating ? '模拟中...' : '▶ 开始模拟' }}
          </button>
          <button class="control-btn reset" @click="resetSimulation">↺ 重置</button>
        </div>
      </div>

      <!-- 令牌桶可视化 -->
      <div v-if="currentAlgo === 'token'" class="token-bucket-vis">
        <div class="bucket-container">
          <div class="bucket">
            <div class="bucket-label">令牌桶</div>
            <div class="tokens-area">
              <div
                v-for="n in bucketState.tokens"
                :key="n"
                class="token"
                :style="{ animationDelay: `${n * 0.1}s` }"
              >🪙</div>
            </div>
            <div class="bucket-capacity">{{ bucketState.tokens }} / {{ bucketState.capacity }} 令牌</div>
          </div>
          <div class="token-producer">
            <div class="producer-label">⏰ 令牌产生器 ({{ bucketState.rate }}/秒)</div>
            <div class="producer-stream">
              <div
                v-for="n in 3"
                :key="n"
                class="producing-token"
                :style="{ animationDelay: `${n * 0.3}s` }"
              >🪙</div>
            </div>
          </div>
        </div>
        <div class="requests-queue">
          <div class="queue-title">📥 请求队列</div>
          <div class="requests">
            <div
              v-for="(req, index) in requestQueue"
              :key="index"
              class="request-item"
              :class="{ processing: req.status === 'processing', allowed: req.status === 'allowed', rejected: req.status === 'rejected' }"
            >
              <span class="req-method">{{ req.method }}</span>
              <span class="req-path">{{ req.path }}</span>
              <span class="req-status">{{ getStatusEmoji(req.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 漏桶可视化 -->
      <div v-if="currentAlgo === 'leaky'" class="leaky-bucket-vis">
        <div class="leaky-container">
          <div class="leaky-bucket">
            <div class="bucket-label">漏桶</div>
            <div class="bucket-content">
              <div
                class="water-level"
                :style="{ height: `${(leakyState.current / leakyState.capacity) * 100}%` }"
              ></div>
            </div>
            <div class="bucket-stats">{{ leakyState.current }} / {{ leakyState.capacity }} 请求</div>
          </div>
          <div class="leak-hole">
            <div class="hole">🔘</div>
            <div class="leak-rate">⏱️ 流出速率: {{ leakyState.rate }}/秒</div>
          </div>
        </div>
        <div class="leaky-legend">
          <div class="legend-item">
            <span class="legend-color water"></span>
            <span>桶内请求（排队中）</span>
          </div>
          <div class="legend-item">
            <span class="legend-color hole"></span>
            <span>匀速流出（处理中）</span>
          </div>
          <div class="legend-item">
            <span class="legend-color overflow"></span>
            <span>桶满溢出（被拒绝）</span>
          </div>
        </div>
      </div>

      <!-- 滑动窗口可视化 -->
      <div v-if="currentAlgo === 'sliding'" class="sliding-window-vis">
        <div class="window-container">
          <div class="window-label">⏰ 时间窗口（过去1分钟）</div>
          <div class="window-timeline">
            <div class="time-marks">
              <span v-for="n in 6" :key="n">{{ 60 - (n - 1) * 10 }}s</span>
            </div>
            <div class="window-bars">
              <div
                v-for="(slot, index) in slidingWindow.slots"
                :key="index"
                class="time-slot"
                :class="{ active: slot.count > 0, current: index === slidingWindow.currentSlot }"
                :style="{ height: `${Math.min((slot.count / 20) * 100, 100)}%` }"
              >
                <span class="slot-count" v-if="slot.count > 0">{{ slot.count }}</span>
              </div>
            </div>
          </div>
          <div class="window-stats">
            <div class="stat">
              <span class="stat-label">当前窗口请求数:</span>
              <span class="stat-value">{{ slidingWindow.totalRequests }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">限流阈值:</span>
              <span class="stat-value">{{ slidingWindow.limit }}/分钟</span>
            </div>
            <div class="stat">
              <span class="stat-label">剩余额度:</span>
              <span class="stat-value" :class="{ warning: slidingWindow.remaining < 20 }">{{ slidingWindow.remaining }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-title">📊 三种算法对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>维度</th>
            <th>令牌桶 (Token Bucket)</th>
            <th>漏桶 (Leaky Bucket)</th>
            <th>滑动窗口 (Sliding Window)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="dim">核心思想</td>
            <td>桶里装令牌，有令牌才能通过</td>
            <td>请求进桶，匀速流出处理</td>
            <td>统计时间窗口内的请求数</td>
          </tr>
          <tr>
            <td class="dim">突发流量</td>
            <td>✅ 允许一定程度的突发（桶里有令牌）</td>
            <td>❌ 强制平滑，突发会被缓存或拒绝</td>
            <td>❌ 严格按窗口计数，超出一律拒绝</td>
          </tr>
          <tr>
            <td class="dim">适用场景</td>
            <td>API 限流、带宽控制（允许突发）</td>
            <td>需要严格匀速处理的场景（如消息队列）</td>
            <td>精确统计（如"1分钟内最多100次"）</td>
          </tr>
          <tr>
            <td class="dim">实现复杂度</td>
            <td>中等</td>
            <td>中等</td>
            <td>较高（需要记录每个时间窗口的请求）</td>
          </tr>
          <tr>
            <td class="dim">Nginx 配置</td>
            <td>limit_req_zone (漏桶)</td>
            <td>limit_req_zone (漏桶)</td>
            <td>需第三方模块或 Lua</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="nginx-config">
      <div class="config-title">📝 Nginx 限流配置示例</div>
      <div class="config-tabs">
        <button
          v-for="config in nginxConfigs"
          :key="config.id"
          :class="['config-tab', { active: currentConfig === config.id }]"
          @click="currentConfig = config.id"
        >
          {{ config.name }}
        </button>
      </div>
      <pre class="config-code"><code>{{ currentNginxConfig.code }}</code></pre>
      <div class="config-explanation">
        <div class="exp-title">💡 配置说明</div>
        <ul>
          <li v-for="(item, index) in currentNginxConfig.explanation" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const currentAlgo = ref('token')
const isMatching = ref(false)
const isSimulating = ref(false)

const algorithms = [
  {
    id: 'token',
    icon: '🪙',
    name: '令牌桶',
    visualTitle: '🪙 令牌桶算法可视化'
  },
  {
    id: 'leaky',
    icon: '🚿',
    name: '漏桶',
    visualTitle: '🚿 漏桶算法可视化'
  },
  {
    id: 'sliding',
    icon: '📊',
    name: '滑动窗口',
    visualTitle: '📊 滑动窗口算法可视化'
  }
]

const currentAlgoData = computed(() => algorithms.find(a => a.id === currentAlgo.value))

// 令牌桶状态
const bucketState = reactive({
  tokens: 5,
  capacity: 10,
  rate: 2,
  totalRequests: 0
})

// 请求队列
const requestQueue = ref([])

// 漏桶状态
const leakyState = reactive({
  current: 3,
  capacity: 8,
  rate: 1
})

// 滑动窗口状态
const slidingWindow = reactive({
  slots: Array(12).fill(0).map(() => ({ count: Math.floor(Math.random() * 10) })),
  currentSlot: 11,
  totalRequests: 45,
  limit: 100,
  remaining: 55
})

const currentConfig = ref('basic')

const nginxConfigs = [
  {
    id: 'basic',
    name: '基础限流',
    code: `# 定义限流区域
# $binary_remote_addr: 按 IP 限流
# zone=mylimit:10m: 区域名称和大小
# rate=10r/s: 每秒最多10个请求
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name api.example.com;

    location / {
        # 应用限流
        # burst=20: 桶容量，允许突发20个请求
        # nodelay: 不延迟处理突发请求
        limit_req zone=mylimit burst=20 nodelay;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'limit_req_zone: 在 http 块中定义限流区域',
      '$binary_remote_addr: 使用二进制 IP 地址作为限流键（省内存）',
      'zone=mylimit:10m: 区域名称 mylimit，分配 10MB 内存',
      'rate=10r/s: 每秒允许 10 个请求（漏桶算法）',
      'burst=20: 桶的容量为 20，允许一定程度的突发流量',
      'nodelay: 不延迟处理突发请求（立即处理或拒绝）'
    ]
  },
  {
    id: 'connection',
    name: '连接数限制',
    code: `# 限制并发连接数
# zone=addr:10m: 区域名称为 addr，大小 10MB
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    listen 80;
    server_name download.example.com;

    location / {
        # 每个 IP 最多 5 个并发连接
        limit_conn addr 5;

        # 同时应用限流：每秒 1 个请求
        limit_req zone=mylimit rate=1r/s;

        proxy_pass http://fileserver;
    }
}`,
    explanation: [
      'limit_conn_zone: 定义连接数限制区域',
      'limit_conn addr 5: 每个 IP 最多同时保持 5 个连接',
      '适用于文件下载、视频流媒体等长连接场景',
      '可以和 limit_req 同时使用（双重保护）',
      '超过连接数限制时返回 503 Service Unavailable'
    ]
  },
  {
    id: 'whiteblack',
    name: '黑白名单',
    code: `# 白名单 + 限流组合
# 公司内网 IP 不限流
geo $limit {
    default 1;
    10.0.0.0/8 0;     # 内网网段
    172.16.0.0/12 0;  # 内网网段
    192.168.0.0/16 0; # 内网网段
}

map $limit $limit_key {
    0 "";
    1 $binary_remote_addr;
}

# 只有外网 IP 会触发限流
limit_req_zone $limit_key zone=sensitive:10m rate=1r/s;

server {
    listen 80;
    server_name api.example.com;

    location /admin {
        # 管理后台严格限流
        limit_req zone=sensitive burst=5 nodelay;

        # 拒绝特定 IP
        deny 1.2.3.4;
        deny 5.6.7.8;

        proxy_pass http://backend;
    }
}`,
    explanation: [
      'geo 模块：根据 IP 地址设置变量值',
      '内网 IP 设置为 0，外网 IP 默认为 1',
      'map 模块：将 0 映射为空字符串（不限流），1 映射为 IP 地址',
      '只有外网 IP 会被限流，内网访问畅通无阻',
      'deny 指令：直接拒绝特定 IP 访问',
      '适用于管理后台、敏感接口的安全防护'
    ]
  }
]

const currentNginxConfig = computed(() => nginxConfigs.find(c => c.id === currentConfig.value))

const toggleSimulation = async () => {
  isSimulating.value = true

  // 模拟产生请求
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 800))

    const methods = ['GET', 'POST', 'GET', 'GET', 'DELETE']
    const paths = ['/api/users', '/api/orders', '/api/products', '/health', '/api/pay']

    const newRequest = {
      id: Date.now() + i,
      method: methods[Math.floor(Math.random() * methods.length)],
      path: paths[Math.floor(Math.random() * paths.length)],
      status: 'processing'
    }

    requestQueue.value.unshift(newRequest)

    // 模拟处理
    setTimeout(() => {
      const req = requestQueue.value.find(r => r.id === newRequest.id)
      if (req) {
        if (currentAlgo.value === 'token') {
          // 令牌桶逻辑
          if (bucketState.tokens > 0) {
            bucketState.tokens--
            req.status = 'allowed'
            bucketState.totalRequests++
          } else {
            req.status = 'rejected'
          }
        } else {
          req.status = Math.random() > 0.3 ? 'allowed' : 'rejected'
        }
      }
    }, 500)
  }

  isSimulating.value = false
}

const resetSimulation = () => {
  requestQueue.value = []
  bucketState.tokens = 5
  bucketState.totalRequests = 0
  leakyState.current = 3
  isSimulating.value = false
}

const getStatusEmoji = (status) => {
  switch (status) {
    case 'processing': return '⏳'
    case 'allowed': return '✅'
    case 'rejected': return '❌'
    default: return '⏳'
  }
}

let tokenInterval = null
let leakyInterval = null

onMounted(() => {
  tokenInterval = setInterval(() => {
    if (bucketState.tokens < bucketState.capacity) {
      bucketState.tokens = Math.min(
        bucketState.tokens + bucketState.rate,
        bucketState.capacity
      )
    }
  }, 1000)

  leakyInterval = setInterval(() => {
    if (leakyState.current > 0) {
      leakyState.current = Math.max(0, leakyState.current - leakyState.rate)
    }
  }, 1000)
})

onUnmounted(() => {
  if (tokenInterval) {
    clearInterval(tokenInterval)
    tokenInterval = null
  }
  if (leakyInterval) {
    clearInterval(leakyInterval)
    leakyInterval = null
  }
})
</script>

<style scoped>
.rate-limiting-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.algorithm-selector {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.selector-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.algorithm-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.algo-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.algo-tab:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.algo-tab.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.algo-icon {
  font-size: 2rem;
}

.algo-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.visualization-area {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.vis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.vis-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.vis-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.reset {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

/* 令牌桶可视化 */
.token-bucket-vis {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.bucket-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bucket {
  background: linear-gradient(180deg, #fef3c7, #fde68a);
  border: 3px solid #f59e0b;
  border-radius: 12px;
  padding: 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.bucket-label {
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #92400e;
}

.tokens-area {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
}

.token {
  font-size: 1.5rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.bucket-capacity {
  text-align: center;
  font-weight: 600;
  margin-top: 0.5rem;
  color: #92400e;
}

.token-producer {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.producer-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.producer-stream {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  height: 30px;
}

.producing-token {
  font-size: 1.25rem;
  animation: drop 1.5s ease-in infinite;
}

@keyframes drop {
  0% { transform: translateY(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

.requests-queue {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}

.queue-title {
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.requests {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
}

.request-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  border-left: 3px solid var(--vp-c-divider);
}

.request-item.processing {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.request-item.allowed {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.request-item.rejected {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.req-method {
  font-weight: 700;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.req-path {
  flex: 1;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.req-status {
  font-size: 1.1rem;
}

/* 漏桶可视化 */
.leaky-bucket-vis {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.leaky-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: flex-end;
}

.leaky-bucket {
  width: 200px;
  background: linear-gradient(180deg, #dbeafe, #bfdbfe);
  border: 3px solid #3b82f6;
  border-radius: 12px;
  padding: 1rem;
  position: relative;
}

.bucket-content {
  height: 150px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.water-level {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #60a5fa, #3b82f6);
  transition: height 0.5s ease;
}

.leak-hole {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hole {
  font-size: 3rem;
  animation: drip 1s ease-in-out infinite;
}

@keyframes drip {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.leak-rate {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.leaky-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.water {
  background: #3b82f6;
}

.legend-color.hole {
  background: #6b7280;
}

.legend-color.overflow {
  background: #ef4444;
}

/* 滑动窗口可视化 */
.sliding-window-vis {
  padding: 1rem;
}

.window-container {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-divider);
}

.window-label {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.window-timeline {
  margin-bottom: 1.5rem;
}

.time-marks {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.window-bars {
  display: flex;
  gap: 0.25rem;
  height: 120px;
  align-items: flex-end;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.time-slot {
  flex: 1;
  background: #e5e7eb;
  border-radius: 4px 4px 0 0;
  min-height: 5px;
  position: relative;
  transition: all 0.3s;
}

.time-slot.active {
  background: #3b82f6;
}

.time-slot.current {
  box-shadow: 0 0 0 2px #f59e0b;
}

.slot-count {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.window-stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.stat {
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
}

.stat-value.warning {
  color: #ef4444;
}

.comparison-section {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.section-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  overflow-x: auto;
  display: block;
}

.comparison-table thead,
.comparison-table tbody {
  display: table;
  width: 100%;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.comparison-table th {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.comparison-table td.dim {
  font-weight: 600;
  background: var(--vp-c-bg-soft);
  white-space: nowrap;
}

.nginx-config {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.config-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.config-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.config-tab {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.85rem;
}

.config-tab:hover {
  border-color: var(--vp-c-brand);
}

.config-tab.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.config-code {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.config-explanation {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.exp-title {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.config-explanation ul {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .algorithm-tabs {
    grid-template-columns: 1fr;
  }

  .input-section {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.75rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.5rem;
  }

  .window-bars {
    height: 80px;
  }
}
</style>
