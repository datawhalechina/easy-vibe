<template>
  <div class="tech-stack-timeline-demo">
    <div class="demo-header">
      <h4>📚 技术栈演进时间线</h4>
      <p>每个时代的主流技术栈</p>
    </div>

    <div class="timeline">
      <div
        v-for="(era, idx) in eras"
        :key="idx"
        class="era-section"
        :class="{ active: activeEra === idx }"
        @click="activeEra = idx"
      >
        <div class="era-marker">
          <div class="era-dot"></div>
          <div class="era-line"></div>
        </div>

        <div class="era-content">
          <div class="era-header">
            <span class="era-icon">{{ era.icon }}</span>
            <span class="era-name">{{ era.name }}</span>
            <span class="era-period">{{ era.period }}</span>
          </div>

          <div class="tech-categories">
            <div class="category" v-for="(cat, cIdx) in era.categories" :key="cIdx">
              <div class="category-name">{{ cat.name }}</div>
              <div class="tech-tags">
                <span
                  v-for="(tech, tIdx) in cat.techs"
                  :key="tIdx"
                  class="tech-tag"
                  :class="{ highlight: tIdx === 0 }"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeEra = ref(0)

const eras = [
  {
    icon: '🖥️',
    name: '物理机时代',
    period: '1990s',
    categories: [
      { name: 'Web服务器', techs: ['Apache', 'Nginx', 'IIS'] },
      { name: '后端语言', techs: ['Perl', 'PHP', 'ASP'] },
      { name: '数据库', techs: ['MySQL', 'PostgreSQL', 'Oracle'] },
      { name: '部署方式', techs: ['FTP', 'SSH', '手动'] }
    ]
  },
  {
    icon: '🏢',
    name: '单体架构',
    period: '2000s',
    categories: [
      { name: '后端框架', techs: ['Spring', 'Django', 'Rails', 'Laravel'] },
      { name: '前端技术', techs: ['jQuery', 'Bootstrap', 'JSP'] },
      { name: '数据库', techs: ['MySQL', 'Redis', 'MongoDB'] },
      { name: '构建工具', techs: ['Maven', 'Gradle', 'Ant'] }
    ]
  },
  {
    icon: '🏭',
    name: '微服务',
    period: '2010s',
    categories: [
      { name: '容器化', techs: ['Docker', 'Kubernetes', 'Helm'] },
      { name: '服务框架', techs: ['Spring Cloud', 'gRPC', 'Dubbo'] },
      { name: '数据存储', techs: ['Redis', 'MongoDB', 'Kafka', 'ES'] },
      { name: '可观测', techs: ['Prometheus', 'Grafana', 'Jaeger'] }
    ]
  },
  {
    icon: '☁️',
    name: 'Serverless',
    period: '2020s+',
    categories: [
      { name: '函数计算', techs: ['Lambda', 'Vercel', 'Cloudflare'] },
      { name: 'BaaS', techs: ['Supabase', 'Firebase', 'Auth0'] },
      { name: '前端框架', techs: ['Next.js', 'Nuxt', 'SvelteKit'] },
      { name: '数据库', techs: ['PlanetScale', 'Neon', 'Turso'] }
    ]
  }
]
</script>

<style scoped>
.tech-stack-timeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-header h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.era-section {
  display: flex;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.era-section:hover,
.era-section.active {
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.era-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
}

.era-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  border: 2px solid var(--vp-c-bg);
  transition: all 0.2s;
}

.era-section.active .era-dot {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.era-line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-divider);
  margin: 4px 0;
}

.era-content {
  flex: 1;
  padding: 0.5rem 0.5rem 0.5rem 0;
}

.era-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.era-icon {
  font-size: 1.25rem;
}

.era-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.era-period {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.category {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.5rem;
}

.category-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.tech-tag.highlight {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.05);
}

@media (max-width: 768px) {
  .tech-categories {
    grid-template-columns: 1fr;
  }
}
</style>
