<template>
  <div class="architecture-comparison-demo">
    <div class="demo-header">
      <h4>🏗️ 架构演进对比</h4>
      <p>四个时代的核心架构特征对比</p>
    </div>

    <div class="comparison-grid">
      <div class="era-card" v-for="era in eras" :key="era.name" :class="{ active: selectedEra === era.name }" @click="selectedEra = era.name">
        <div class="era-icon">{{ era.icon }}</div>
        <div class="era-name">{{ era.name }}</div>
        <div class="era-year">{{ era.year }}</div>
        <div class="era-tag">{{ era.tag }}</div>
      </div>
    </div>

    <div class="detail-panel" v-if="selectedEra">
      <div class="detail-header">
        <span class="detail-icon">{{ currentEra.icon }}</span>
        <h5>{{ currentEra.name }} ({{ currentEra.year }})</h5>
      </div>

      <div class="detail-content">
        <div class="feature-section">
          <h6>🏗️ 架构特征</h6>
          <ul>
            <li v-for="(feat, i) in currentEra.features" :key="i">{{ feat }}</li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>✅ 优点</h6>
          <ul>
            <li v-for="(pro, i) in currentEra.pros" :key="i">{{ pro }}</li>
          </ul>
        </div>

        <div class="feature-section">
          <h6>❌ 痛点</h6>
          <ul>
            <li v-for="(con, i) in currentEra.cons" :key="i">{{ con }}</li>
          </ul>
        </div>

        <div class="tech-stack">
          <h6>🔧 典型技术</h6>
          <div class="tech-tags">
            <span v-for="(tech, i) in currentEra.techs" :key="i" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEra = ref('单体')

const eras = [
  { name: '物理机', icon: '🖥️', year: '1990s', tag: '单机' },
  { name: '单体', icon: '🏢', year: '2000s', tag: '集中' },
  { name: '微服务', icon: '🏭', year: '2010s', tag: '分布' },
  { name: 'Serverless', icon: '☁️', year: '2020s+', tag: '无服' }
]

const eraDetails = {
  '物理机': {
    features: ['单机部署，无冗余', 'FTP 手动上传代码', '垂直扩展（买更强的机器）', '无服务治理概念'],
    pros: ['部署简单，无需复杂配置', '单机性能好，无网络延迟', '易于调试和排查问题'],
    cons: ['单点故障，服务不可用', '扩展困难，只能垂直扩容', '手动运维，效率低下'],
    techs: ['Apache/Nginx', 'CGI/Perl', 'FTP/SFTP', '物理服务器']
  },
  '单体': {
    features: ['单一代码库，统一技术栈', '共享数据库，事务一致性', '统一部署，整体发布', '进程内通信，无网络开销'],
    pros: ['开发简单，易于上手', '测试方便，本地启动即可', '部署简单，一个包搞定'],
    cons: ['代码耦合，牵一发而动全身', '技术栈单一，难以引入新技术', '团队扩张后协作困难'],
    techs: ['Spring/Django/Rails', 'Tomcat/Gunicorn', 'MySQL/PostgreSQL', 'Maven/Gradle']
  },
  '微服务': {
    features: ['服务拆分，独立部署', '技术栈异构，自由选择', '数据库独立，最终一致性', '服务间网络通信'],
    pros: ['服务独立，团队自治', '技术栈灵活，选择最适合的', '故障隔离，不影响全局'],
    cons: ['分布式复杂度，调试困难', '网络延迟，性能损耗', '运维成本激增'],
    techs: ['Docker/Kubernetes', 'gRPC/REST', 'Kafka/RabbitMQ', 'Prometheus/Grafana']
  },
  'Serverless': {
    features: ['函数粒度，事件驱动', '自动扩缩容，按需计费', '无服务器管理，平台托管', '冷启动，有延迟'],
    pros: ['无需运维，专注业务', '自动扩展，应对流量高峰', '按调用付费，成本低'],
    cons: ['冷启动延迟', '平台锁定，迁移困难', '调试困难，本地难复现'],
    techs: ['AWS Lambda', 'Vercel/Cloudflare', 'Supabase/Firebase', 'EventBridge']
  }
}

const currentEra = computed(() => {
  const name = selectedEra.value
  return {
    icon: eras.find(e => e.name === name)?.icon || '🏗️',
    name,
    year: eras.find(e => e.name === name)?.year || '',
    ...eraDetails[name]
  }
})
</script>

<style scoped>
.architecture-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.era-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.era-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.era-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.era-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.era-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.era-year {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.era-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.detail-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-header h5 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.feature-section {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
}

.feature-section h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.feature-section ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.feature-section li {
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.feature-section li:last-child {
  margin-bottom: 0;
}

.tech-stack {
  grid-column: 1 / -1;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 1rem;
}

.tech-stack h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>