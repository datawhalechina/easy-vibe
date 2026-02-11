<template>
  <div class="cloud-history-demo">
    <div class="timeline">
      <div 
        v-for="(event, index) in events" 
        :key="index"
        class="timeline-item"
        :class="{ active: selectedEvent === index }"
        @click="selectedEvent = index"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-year">{{ event.year }}</div>
          <div class="timeline-title">{{ event.title }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedEventData" class="event-detail">
      <div class="detail-year">{{ selectedEventData.year }}</div>
      <div class="detail-title">{{ selectedEventData.title }}</div>
      <div class="detail-desc">{{ selectedEventData.description }}</div>
      <div class="detail-impact">
        <span class="impact-label">影响:</span>
        <span class="impact-text">{{ selectedEventData.impact }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent = ref(3)

const events = [
  {
    year: '1960s',
    title: '概念萌芽',
    description: 'J.C.R. Licklider 提出"星际计算机网络"设想，是云计算概念的最早雏形。',
    impact: '奠定了分布式计算的理论基础'
  },
  {
    year: '1990s',
    title: '虚拟化技术',
    description: 'VMware 推出 x86 虚拟化技术，允许在一台物理机上运行多个虚拟机。',
    impact: '为云计算的资源池化提供了技术基础'
  },
  {
    year: '2006',
    title: 'AWS 诞生',
    description: 'Amazon 推出 EC2 和 S3，标志着现代云计算服务的正式诞生。',
    impact: '开创了公有云服务的商业模式'
  },
  {
    year: '2009',
    title: '阿里云成立',
    description: '阿里巴巴成立阿里云，成为中国最早的云计算服务商。',
    impact: '推动了中国云计算市场的发展'
  },
  {
    year: '2010s',
    title: '云原生时代',
    description: 'Docker、Kubernetes 等技术兴起，微服务架构成为主流。',
    impact: '改变了应用开发和部署的方式'
  },
  {
    year: '2020s',
    title: 'AI 云时代',
    description: '大模型和 AI 服务成为云厂商的核心竞争力，Serverless 普及。',
    impact: '云计算进入智能化新阶段'
  }
]

const selectedEventData = computed(() => events[selectedEvent.value])
</script>

<style scoped>
.cloud-history-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.timeline {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}

.timeline-item:hover {
  background: var(--vp-c-bg);
}

.timeline-item.active {
  background: var(--vp-c-brand-soft);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.2s;
}

.timeline-item.active .timeline-dot {
  background: var(--vp-c-brand);
}

.timeline-content {
  text-align: center;
}

.timeline-year {
  font-weight: 600;
  font-size: 0.85rem;
}

.timeline-title {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.event-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
}

.detail-year {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-impact {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.impact-label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.impact-text {
  font-weight: 500;
}
</style>
