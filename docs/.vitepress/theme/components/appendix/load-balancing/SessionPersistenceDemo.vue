<template>
  <div class="session-persistence-demo">
    <div class="header">
      <div class="title">会话保持机制</div>
      <div class="subtitle">Cookie、IP哈希与粘性会话的技术对比</div>
    </div>

    <!-- 场景选择 -->
    <div class="scenario-selector">
      <div class="scenario-label">应用场景：</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.key"
          class="scenario-btn"
          :class="{ active: currentScenario === scenario.key }"
          @click="currentScenario = scenario.key"
        >
          {{ scenario.name }}
        </button>
      </div>
    </div>

    <!-- 机制选择器 -->
    <div class="mechanism-selector">
      <button
        v-for="mech in mechanisms"
        :key="mech.key"
        class="mechanism-btn"
        :class="{ active: currentMechanism === mech.key }"
        @click="currentMechanism = mech.key"
      >
        <span class="mechanism-icon">{{ mech.icon }}</span>
        <span class="mechanism-name">{{ mech.name }}</span>
        <span class="mechanism-tag">{{ mech.tag }}</span>
      </button>
    </div>

    <!-- 可视化演示区 -->
    <div class="demo-stage">
      <!-- 用户层 -->
      <div class="user-layer">
        <div class="user-avatars">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-avatar"
            :class="{ active: activeUser === user.id }"
            @click="activeUser = user.id"
          >
            <div class="avatar-icon">{{ user.avatar }}</div>
            <div class="user-name">{{ user.name }}</div>
            <div v-if="hasSessionCookie" class="cookie-badge">🍪</div>
          </div>
        </div>
      </div>

      <!-- 请求流程 -->
      <div class="request-flow">
        <div class="flow-step">
          <div class="step-label">请求</div>
          <div class="step-arrow">↓</div>
        </div>

        <!-- 负载均衡器 -->
        <div class="lb-box">
          <div class="lb-header">
            <span class="lb-icon">⚖️</span>
            <span class="lb-title">负载均衡器</span>
          </div>
          <div class="lb-mechanism">
            <div class="mechanism-display">
              <span class="display-icon">{{ currentMechanismData.icon }}</span>
              <div class="display-info">
                <div class="display-name">{{ currentMechanismData.name }}</div>
                <div class="display-desc">{{ currentMechanismData.shortDesc }}</div>
              </div>
            </div>
          </div>
          <!-- 会话表 -->
          <div v-if="currentMechanism === 'cookie' || currentMechanism === 'sticky'" class="session-table">
            <div class="table-title">会话映射表</div>
            <div class="table-rows">
              <div v-for="mapping in sessionMappings" :key="mapping.session" class="table-row">
                <span class="session-id">{{ mapping.session }}</span>
                <span class="mapping-arrow">→</span>
                <span class="server-name">{{ mapping.server }}</span>
              </div>
            </div>
          </div>
          <!-- IP哈希环 -->
          <div v-if="currentMechanism === 'iphash'" class="hash-ring">
            <div class="ring-title">IP哈希环</div>
            <div class="ring-visual">
              <div
                v-for="(server, index) in hashRingServers"
                :key="index"
                class="ring-segment"
                :style="getSegmentStyle(index)"
                :title="server"
              >
                {{ server.slice(-1) }}
              </div>
            </div>
            <div class="hash-formula">
              <code>server = hash(client_ip) % server_count</code>
            </div>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-arrow">↓</div>
        </div>

        <!-- 后端服务器 -->
        <div class="backend-servers">
          <div
            v-for="server in backendServers"
            :key="server.id"
            class="backend-server"
            :class="{ target: isTargetServer(server.id) }"
          >
            <div class="server-icon">🖥️</div>
            <div class="server-info">
              <div class="server-name">{{ server.name }}</div>
              <div class="server-ip">{{ server.ip }}</div>
            </div>
            <div class="server-status" :class="server.status">
              {{ server.status === 'healthy' ? '✓' : '✗' }}
            </div>
            <div v-if="isTargetServer(server.id)" class="selected-indicator">
              选中
            </div>
          </div>
        </div>
      </div>

      <!-- 响应流程 -->
      <div class="response-flow" v-if="currentMechanism === 'cookie'">
        <div class="flow-step">
          <div class="step-arrow">↑</div>
        </div>
        <div class="set-cookie-box">
          <div class="cookie-header">
            <span class="cookie-icon">🍪</span>
            <span class="cookie-title">Set-Cookie 响应头</span>
          </div>
          <div class="cookie-content">
            <code>SERVERID=srv001; Path=/; HttpOnly</code>
          </div>
        </div>
      </div>
    </div>

    <!-- 机制对比表 -->
    <div class="mechanism-comparison">
      <div class="comparison-title">三种会话保持机制对比</div>
      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">🍪</span>
            <span class="card-title">Cookie 插入</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>不受客户端IP变化影响</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>首次请求即可保持会话</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>客户端需支持Cookie</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>存在Cookie被禁用的风险</span>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">#️⃣</span>
            <span class="card-title">IP Hash</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>无需客户端支持任何机制</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>无状态，LB重启不影响会话</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>客户端IP变化会丢失会话</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>难以做到真正的负载均衡</span>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="card-header">
            <span class="card-icon">📝</span>
            <span class="card-title">粘性会话</span>
          </div>
          <div class="card-body">
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>结合Cookie和IP两种方式优势</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon good">✓</span>
                <span>支持会话复制和故障转移</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>实现复杂，需要应用支持</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon bad">✗</span>
                <span>会话复制带来性能开销</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentMode = ref('active')
const currentScenario = ref('shopping')
const currentMechanism = ref('cookie')
const activeUser = ref(1)

const modes = [
  { key: 'active', name: '主动检查', icon: '🔍' },
  { key: 'passive', name: '被动感知', icon: '👁️' },
  { key: 'threshold', name: '阈值判定', icon: '📊' }
]

const scenarios = [
  { key: 'shopping', name: '购物车' },
  { key: 'login', name: '登录状态' },
  { key: 'websocket', name: '实时通信' }
]

const mechanisms = [
  { key: 'cookie', name: 'Cookie插入', icon: '🍪', tag: '应用层' },
  { key: 'iphash', name: 'IP哈希', icon: '#️⃣', tag: '传输层' },
  { key: 'sticky', name: '粘性会话', icon: '📝', tag: '会话层' }
]

const currentMechanismData = computed(() => {
  const data = {
    cookie: {
      name: 'Cookie 插入',
      icon: '🍪',
      label: 'Set-Cookie',
      shortDesc: '通过HTTP Cookie保持会话',
      description: '负载均衡器在第一次响应时向客户端设置Cookie（如SERVERID=srv001），后续请求携带此Cookie，LB根据Cookie值将请求路由到对应后端服务器。'
    },
    iphash: {
      name: 'IP 哈希',
      icon: '#️⃣',
      label: 'IP Hash',
      shortDesc: '基于客户端IP计算哈希',
      description: '通过对客户端IP地址进行哈希计算（如hash(client_ip) % server_count），确定请求应该路由到哪台后端服务器。同一IP的请求总是落到同一台服务器。'
    },
    sticky: {
      name: '粘性会话',
      icon: '📝',
      label: 'Sticky Session',
      shortDesc: '服务端维护会话映射表',
      description: '负载均衡器在内存中维护会话映射表（session_id -> server），首次请求建立映射关系，后续相同会话ID的请求都路由到同一服务器。支持会话复制实现高可用。'
    }
  }
  return data[currentMechanism.value]
})

const users = [
  { id: 1, name: '用户A', avatar: '👤', ip: '192.168.1.100' },
  { id: 2, name: '用户B', avatar: '👥', ip: '192.168.1.101' },
  { id: 3, name: '用户C', avatar: '👨‍💼', ip: '192.168.1.102' }
]

const sessionMappings = [
  { session: 'sess_abc123', server: 'Server 1' },
  { session: 'sess_def456', server: 'Server 2' },
  { session: 'sess_ghi789', server: 'Server 1' }
]

const hashRingServers = ['Server 1', 'Server 2', 'Server 3', 'Server 4']

const backendServers = [
  { id: 1, name: 'Server 1', ip: '10.0.1.10', status: 'healthy' },
  { id: 2, name: 'Server 2', ip: '10.0.1.11', status: 'healthy' },
  { id: 3, name: 'Server 3', ip: '10.0.1.12', status: 'unhealthy' }
]

const hasSessionCookie = computed(() => {
  return currentMechanism.value === 'cookie' && activeUser.value > 0
})

const isTargetServer = (serverId) => {
  // 模拟根据机制选择目标服务器
  if (currentMechanism.value === 'iphash') {
    return serverId === ((activeUser.value + serverId) % 3) + 1
  }
  return serverId === 1 || (activeUser.value === serverId)
}

const getSegmentStyle = (index) => {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']
  const rotation = index * 90
  return {
    background: colors[index],
    transform: `rotate(${rotation}deg) translateY(-20px)`
  }
}

// 轮播演示
let demoInterval
onMounted(() => {
  demoInterval = setInterval(() => {
    activeUser.value = (activeUser.value % 3) + 1
  }, 3000)
})

onUnmounted(() => {
  clearInterval(demoInterval)
})
</script>

<style scoped>
.session-persistence-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Scenario Selector */
.scenario-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.scenario-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.scenario-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.scenario-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* Mechanism Selector */
.mechanism-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .mechanism-selector {
    grid-template-columns: 1fr;
  }
}

.mechanism-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.mechanism-btn:hover {
  border-color: var(--vp-c-brand-light);
}

.mechanism-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.mechanism-icon {
  font-size: 1.5rem;
}

.mechanism-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mechanism-tag {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 1px 4px;
  border-radius: 3px;
}

/* Demo Stage */
.demo-stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* User Layer */
.user-layer {
  margin-bottom: 1.5rem;
}

.user-avatars {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.user-avatar:hover {
  background: var(--vp-c-bg-soft);
}

.user-avatar.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.avatar-icon {
  font-size: 2rem;
}

.user-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cookie-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 1rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Request Flow */
.request-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  line-height: 1;
}

/* LB Box */
.lb-box {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
}

.lb-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.lb-icon {
  font-size: 1.25rem;
}

.lb-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lb-mechanism {
  margin-bottom: 1rem;
}

.mechanism-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.display-icon {
  font-size: 1.5rem;
}

.display-info {
  flex: 1;
}

.display-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.display-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Session Table */
.session-table {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
}

.table-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.table-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-family: monospace;
}

.session-id {
  color: #3b82f6;
}

.mapping-arrow {
  color: #94a3b8;
}

.server-name {
  color: #22c55e;
}

/* Hash Ring */
.hash-ring {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
}

.ring-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  text-align: center;
}

.ring-visual {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.ring-segment {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.hash-formula {
  text-align: center;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
}

.hash-formula code {
  font-size: 0.75rem;
  color: #3b82f6;
}

/* Backend Servers */
.backend-servers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}

@media (max-width: 768px) {
  .backend-servers {
    grid-template-columns: 1fr;
  }
}

.backend-server {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: all 0.3s;
  position: relative;
}

.backend-server.target {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.server-icon {
  font-size: 1.5rem;
}

.server-info {
  text-align: center;
}

.server-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.server-ip {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.server-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.7rem;
}

.server-status.healthy {
  background: #dcfce7;
  color: #16a34a;
}

.server-status.unhealthy {
  background: #fee2e2;
  color: #dc2626;
}

.selected-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Response Flow - Set Cookie */
.response-flow {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.set-cookie-box {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.cookie-icon {
  font-size: 1.25rem;
}

.cookie-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #92400e;
}

.cookie-content {
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  border-radius: 4px;
  color: #78350f;
}

/* Mechanism Comparison */
.mechanism-comparison {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.comparison-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison-card .card-icon {
  font-size: 1.25rem;
}

.comparison-card .card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.comparison-card .card-body {
  padding: 0.75rem;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.feature-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: bold;
  margin-top: 2px;
}

.feature-icon.good {
  background: #dcfce7;
  color: #16a34a;
}

.feature-icon.bad {
  background: #fee2e2;
  color: #dc2626;
}
</style>
