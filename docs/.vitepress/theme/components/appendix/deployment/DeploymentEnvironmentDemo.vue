<script setup>
import { ref, computed } from 'vue'

const environments = ref(['dev', 'test', 'prod'])
const currentEnv = ref('dev')

const envConfigs = {
  dev: {
    name: '开发环境',
    icon: '🔧',
    color: '#3b82f6',
    apiUrl: 'http://dev.api.example.com',
    dbUrl: 'dev-db.example.com',
    features: ['热重载', '详细日志', '调试工具'],
    analogy: '小明的测试厨房，不断尝试新配方'
  },
  test: {
    name: '测试环境',
    icon: '🧪',
    color: '#f59e0b',
    apiUrl: 'http://test.api.example.com',
    dbUrl: 'test-db.example.com',
    features: ['模拟数据', '自动化测试', 'Bug 追踪'],
    analogy: '内部试吃环节，确保品质稳定'
  },
  prod: {
    name: '生产环境',
    icon: '🚀',
    color: '#10b981',
    apiUrl: 'https://api.example.com',
    dbUrl: 'prod-db.example.com',
    features: ['性能优化', '安全加固', '监控告警'],
    analogy: '正式营业的咖啡店，服务真实顾客'
  }
}

const currentConfig = computed(() => envConfigs[currentEnv.value])
</script>

<template>
  <div class="deployment-environment">
    <div class="demo-header">
      <h3>环境配置演示</h3>
      <p class="subtitle">开发、测试、生产三分离</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明有<strong>研发厨房</strong>、<strong>试吃区域</strong>、<strong>正式门店</strong>三个独立空间，
        软件也需要隔离的环境避免开发测试影响真实用户。
      </p>
    </div>

    <div class="demo-content">
      <!-- 环境切换 -->
      <div class="env-tabs">
        <div
          v-for="env in environments"
          :key="env"
          class="env-tab"
          :class="{ active: currentEnv === env }"
          @click="currentEnv = env"
          :style="{ '--env-color': envConfigs[env].color }"
        >
          <span class="tab-icon">{{ envConfigs[env].icon }}</span>
          <span class="tab-name">{{ envConfigs[env].name }}</span>
        </div>
      </div>

      <!-- 环境详情 -->
      <div class="env-detail">
        <div class="detail-header" :style="{ '--env-color': currentConfig.color }">
          <span class="detail-icon">{{ currentConfig.icon }}</span>
          <div class="detail-info">
            <h4>{{ currentConfig.name }}</h4>
            <p class="detail-analogy">{{ currentConfig.analogy }}</p>
          </div>
        </div>

        <div class="config-list">
          <div class="config-item">
            <span class="config-label">API 地址</span>
            <span class="config-value">{{ currentConfig.apiUrl }}</span>
          </div>
          <div class="config-item">
            <span class="config-label">数据库</span>
            <span class="config-value">{{ currentConfig.dbUrl }}</span>
          </div>
        </div>

        <div class="features">
          <div class="features-title">✨ 特性</div>
          <div class="features-list">
            <span
              v-for="feature in currentConfig.features"
              :key="feature"
              class="feature-tag"
            >
              {{ feature }}
            </span>
          </div>
        </div>
      </div>

      <!-- 流程说明 -->
      <div class="flow-diagram">
        <div class="flow-title">🔄 环境流转</div>
        <div class="flow-steps">
          <div class="flow-step" :class="{ active: currentEnv === 'dev' }">
            <div class="step-badge">1</div>
            <div class="step-text">开发</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" :class="{ active: currentEnv === 'test' }">
            <div class="step-badge">2</div>
            <div class="step-text">测试</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" :class="{ active: currentEnv === 'prod' }">
            <div class="step-badge">3</div>
            <div class="step-text">生产</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>最佳实践</strong>：永远不要在开发环境直接修改生产配置！就像小明不会在正式营业时突然换咖啡配方。
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-environment {
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

.env-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.env-tab {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.env-tab:hover {
  border-color: var(--vp-c-brand-soft);
}

.env-tab.active {
  border-color: var(--env-color);
  background: var(--vp-c-brand-soft);
}

.tab-icon {
  font-size: 1.5rem;
}

.tab-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.env-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--env-color);
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 2.5rem;
}

.detail-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.detail-analogy {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.config-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.config-value {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
}

.features {
  margin-top: 1rem;
}

.features-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.flow-diagram {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  min-width: 80px;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
}

.step-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.flow-arrow {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  margin: 0 0.25rem;
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
  .env-tabs {
    grid-template-columns: 1fr;
  }

  .flow-steps {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>
