<script setup>
import { ref, computed } from 'vue'

const scenarios = ref([
  {
    id: 'personal',
    name: '个人博客',
    icon: '📝',
    users: '100/天',
    cpu: '1核',
    memory: '1GB',
    cost: '¥50/月',
    suitable: '适合',
    color: '#10b981'
  },
  {
    id: 'small',
    name: '小型电商',
    icon: '🛒',
    users: '1000/天',
    cpu: '2核',
    memory: '4GB',
    cost: '¥200/月',
    suitable: '适合',
    color: '#3b82f6'
  },
  {
    id: 'medium',
    name: '中型应用',
    icon: '🏢',
    users: '10000/天',
    cpu: '4核',
    memory: '8GB',
    cost: '¥800/月',
    suitable: '适合',
    color: '#f59e0b'
  },
  {
    id: 'large',
    name: '大型平台',
    icon: '🏛️',
    users: '100000+/天',
    cpu: '8核+',
    memory: '16GB+',
    cost: '¥3000+/月',
    suitable: '集群',
    color: '#ef4444'
  }
])

const selectedScenario = ref('small')
const serverTypes = ['云服务器', '物理服务器', '容器化部署']
const selectedServerType = ref('云服务器')

const currentScenario = computed(() => {
  return scenarios.value.find(s => s.id === selectedScenario.value)
})
</script>

<template>
  <div class="deployment-server">
    <div class="demo-header">
      <h3>服务器选择演示</h3>
      <p class="subtitle">根据客流量选择合适的店面</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明开咖啡店，<strong>街边小摊</strong>、<strong>社区店</strong>、<strong>商场店</strong>、<strong>旗舰店</strong>需要的场地面积和设备完全不同，
        选择服务器也要根据用户量来匹配，避免<strong>资源浪费</strong>或<strong>性能不足</strong>。
      </p>
    </div>

    <div class="demo-content">
      <!-- 场景选择 -->
      <div class="scenario-section">
        <div class="section-title">🎯 选择你的场景</div>
        <div class="scenario-cards">
          <div
            v-for="scenario in scenarios"
            :key="scenario.id"
            class="scenario-card"
            :class="{ active: selectedScenario === scenario.id }"
            @click="selectedScenario = scenario.id"
            :style="{ '--scenario-color': scenario.color }"
          >
            <div class="scenario-icon">{{ scenario.icon }}</div>
            <div class="scenario-name">{{ scenario.name }}</div>
            <div class="scenario-users">{{ scenario.users }}</div>
            <div class="scenario-badge" :class="scenario.suitable === '适合' ? 'good' : 'cluster'">
              {{ scenario.suitable === '适合' ? '✓ 单机' : '需要集群' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 服务器配置 -->
      <div class="config-section">
        <div class="section-title">⚙️ 推荐配置</div>
        <div class="config-cards">
          <div class="config-card">
            <div class="config-icon">🖥️</div>
            <div class="config-label">CPU</div>
            <div class="config-value">{{ currentScenario.cpu }}</div>
            <div class="config-desc">处理订单的厨师数量</div>
          </div>

          <div class="config-card">
            <div class="config-icon">💾</div>
            <div class="config-label">内存</div>
            <div class="config-value">{{ currentScenario.memory }}</div>
            <div class="config-desc">同时处理订单的能力</div>
          </div>

          <div class="config-card">
            <div class="config-icon">💰</div>
            <div class="config-label">成本</div>
            <div class="config-value">{{ currentScenario.cost }}</div>
            <div class="config-desc">相当于租金+水电费</div>
          </div>
        </div>
      </div>

      <!-- 服务器类型选择 -->
      <div class="server-type-section">
        <div class="section-title">🏗️ 部署方式</div>
        <div class="server-types">
          <div
            v-for="type in serverTypes"
            :key="type"
            class="type-item"
            :class="{ active: selectedServerType === type }"
            @click="selectedServerType = type"
          >
            <span class="type-icon">
              {{ type === '云服务器' ? '☁️' : type === '物理服务器' ? '🏢' : '📦' }}
            </span>
            <span class="type-name">{{ type }}</span>
            <span v-if="selectedServerType === type" class="type-check">✓</span>
          </div>
        </div>

        <!-- 类型说明 -->
        <div class="type-description">
          <div v-if="selectedServerType === '云服务器'" class="desc-content">
            <strong>☁️ 云服务器（推荐）</strong>
            <p>像租用共享厨房，灵活扩展，按需付费。适合大多数场景。</p>
          </div>
          <div v-if="selectedServerType === '物理服务器'" class="desc-content">
            <strong>🏢 物理服务器</strong>
            <p>像买下整个店面，性能稳定但成本高，适合大规模应用。</p>
          </div>
          <div v-if="selectedServerType === '容器化部署'" class="desc-content">
            <strong>📦 容器化部署（Docker/K8s）</strong>
            <p>像用预制盒做饭，标准化、可复制，适合快速扩容和微服务。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>小明建议</strong>：刚开始用云服务器最合适，就像开咖啡店先租个小店面测试生意，
        客流量大了再升级或开分店（集群部署）。<strong>不要一开始就租豪华店面！</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-server {
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

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
}

.scenario-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
}

.scenario-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.scenario-card.active {
  border-color: var(--scenario-color);
  background: var(--vp-c-brand-soft);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.scenario-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.scenario-users {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.scenario-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  display: inline-block;
}

.scenario-badge.good {
  background: var(--vp-c-brand-delta);
  color: white;
}

.scenario-badge.cluster {
  background: var(--vp-c-red);
  color: white;
}

.config-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.config-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.config-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.config-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.config-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.config-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
  margin-bottom: 0.25rem;
}

.config-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.server-type-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.server-types {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-item:hover {
  border-color: var(--vp-c-brand-soft);
}

.type-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 1.25rem;
}

.type-name {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.type-check {
  color: var(--vp-c-brand);
  font-weight: 700;
}

.type-description {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  border-left: 3px solid var(--vp-c-brand);
}

.desc-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.desc-content strong {
  display: block;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.desc-content p {
  margin: 0;
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
  .scenario-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .config-cards {
    grid-template-columns: 1fr;
  }
}
</style>
