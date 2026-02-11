<template>
  <div class="cloud-services-overview">
    <div class="services-grid">
      <div 
        v-for="service in services" 
        :key="service.id"
        class="service-card"
        :class="{ active: selectedService === service.id }"
        @click="selectService(service.id)"
      >
        <div class="service-icon">{{ service.icon }}</div>
        <div class="service-name">{{ service.name }}</div>
        <div class="service-examples">{{ service.examples }}</div>
      </div>
    </div>
    
    <div v-if="selectedServiceData" class="service-detail">
      <div class="detail-title">{{ selectedServiceData.name }}</div>
      <div class="detail-desc">{{ selectedServiceData.description }}</div>
      <div class="detail-compare">
        <div class="compare-item">
          <span class="label">AWS:</span>
          <span class="value">{{ selectedServiceData.aws }}</span>
        </div>
        <div class="compare-item">
          <span class="label">阿里云:</span>
          <span class="value">{{ selectedServiceData.aliyun }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedService = ref(null)

const services = [
  { 
    id: 'compute', 
    icon: '⚙️', 
    name: '计算', 
    examples: 'EC2 / ECS',
    description: '提供虚拟服务器和计算能力，是云服务的基础',
    aws: 'Amazon EC2',
    aliyun: 'ECS 云服务器'
  },
  { 
    id: 'storage', 
    icon: '💾', 
    name: '存储', 
    examples: 'S3 / OSS',
    description: '对象存储服务，用于存放图片、文档等文件',
    aws: 'Amazon S3',
    aliyun: 'OSS 对象存储'
  },
  { 
    id: 'network', 
    icon: '🌐', 
    name: '网络', 
    examples: 'VPC / 专有网络',
    description: '构建隔离的虚拟网络环境',
    aws: 'Amazon VPC',
    aliyun: '专有网络 VPC'
  },
  { 
    id: 'database', 
    icon: '🗄️', 
    name: '数据库', 
    examples: 'RDS / PolarDB',
    description: '托管的关系型数据库服务',
    aws: 'Amazon RDS',
    aliyun: 'RDS 关系型数据库'
  },
  { 
    id: 'security', 
    icon: '🔒', 
    name: '安全', 
    examples: 'IAM / RAM',
    description: '身份认证和访问控制服务',
    aws: 'AWS IAM',
    aliyun: 'RAM 访问控制'
  },
  { 
    id: 'middleware', 
    icon: '🔧', 
    name: '中间件', 
    examples: 'MQ / RocketMQ',
    description: '消息队列和缓存服务',
    aws: 'Amazon MQ',
    aliyun: 'RocketMQ'
  }
]

const selectedServiceData = computed(() => 
  services.find(s => s.id === selectedService.value)
)

function selectService(id) {
  selectedService.value = selectedService.value === id ? null : id
}
</script>

<style scoped>
.cloud-services-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.service-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.service-card:hover {
  border-color: var(--vp-c-brand);
}

.service-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.service-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.service-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.service-examples {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.service-detail {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.detail-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-item {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.compare-item .label {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.compare-item .value {
  font-weight: 500;
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .detail-compare {
    grid-template-columns: 1fr;
  }
}
</style>
