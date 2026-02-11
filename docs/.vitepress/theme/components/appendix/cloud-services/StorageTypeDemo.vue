<template>
  <div class="storage-type-demo">
    <div class="type-cards">
      <div 
        v-for="type in storageTypes" 
        :key="type.id"
        class="type-card"
        :class="{ active: selectedType === type.id }"
        @click="selectedType = type.id"
      >
        <div class="type-icon">{{ type.icon }}</div>
        <div class="type-name">{{ type.name }}</div>
        <div class="type-example">{{ type.example }}</div>
      </div>
    </div>
    
    <div v-if="selectedTypeData" class="type-detail">
      <div class="detail-row">
        <span class="label">特点</span>
        <span class="value">{{ selectedTypeData.features }}</span>
      </div>
      <div class="detail-row">
        <span class="label">适用场景</span>
        <span class="value">{{ selectedTypeData.scenarios }}</span>
      </div>
      <div class="detail-row">
        <span class="label">计费方式</span>
        <span class="value">{{ selectedTypeData.pricing }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedType = ref('object')

const storageTypes = [
  {
    id: 'object',
    icon: '📦',
    name: '对象存储',
    example: 'S3 / OSS',
    features: '海量存储、高可靠、低成本',
    scenarios: '图片、视频、备份、静态网站',
    pricing: '按存储容量 + 请求次数'
  },
  {
    id: 'block',
    icon: '💽',
    name: '块存储',
    example: 'EBS / 云盘',
    features: '低延迟、高性能、可挂载',
    scenarios: '数据库、文件系统、操作系统',
    pricing: '按容量 + IOPS'
  },
  {
    id: 'file',
    icon: '📁',
    name: '文件存储',
    example: 'EFS / NAS',
    features: '共享访问、POSIX 兼容',
    scenarios: '共享文件、内容管理、HPC',
    pricing: '按容量 + 吞吐'
  },
  {
    id: 'archive',
    icon: '🗃️',
    name: '归档存储',
    example: 'Glacier / 归档',
    features: '极低成本、取回慢',
    scenarios: '冷数据、合规备份、长期归档',
    pricing: '按容量，取回额外收费'
  }
]

const selectedTypeData = computed(() => 
  storageTypes.find(t => t.id === selectedType.value)
)
</script>

<style scoped>
.storage-type-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.type-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.type-card:hover {
  border-color: var(--vp-c-brand);
}

.type-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.type-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.15rem;
}

.type-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.type-detail {
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.detail-row .label {
  color: var(--vp-c-text-2);
  width: 80px;
  flex-shrink: 0;
}

.detail-row .value {
  flex: 1;
}

@media (max-width: 640px) {
  .type-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
