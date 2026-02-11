<template>
  <div class="compute-instance-demo">
    <div class="config-panel">
      <div class="config-row">
        <label>地域</label>
        <div class="options">
          <button 
            v-for="region in regions" 
            :key="region.id"
            :class="{ active: config.region === region.id }"
            @click="config.region = region.id"
          >
            {{ region.name }}
          </button>
        </div>
      </div>
      <div class="config-row">
        <label>规格</label>
        <div class="options">
          <button 
            v-for="spec in specs" 
            :key="spec.id"
            :class="{ active: config.spec === spec.id }"
            @click="config.spec = spec.id"
          >
            {{ spec.name }}
          </button>
        </div>
      </div>
      <div class="config-row">
        <label>镜像</label>
        <div class="options">
          <button 
            v-for="image in images" 
            :key="image.id"
            :class="{ active: config.image === image.id }"
            @click="config.image = image.id"
          >
            {{ image.name }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="result-panel">
      <div class="result-title">配置结果</div>
      <div class="result-grid">
        <div class="result-item">
          <span class="label">配置</span>
          <span class="value">{{ selectedSpec?.name }} / {{ selectedImage?.name }}</span>
        </div>
        <div class="result-item">
          <span class="label">预估价格</span>
          <span class="value price">¥{{ price }}/月</span>
        </div>
        <div class="result-item">
          <span class="label">适用场景</span>
          <span class="value">{{ selectedSpec?.scene }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = ref({
  region: 'hangzhou',
  spec: 'medium',
  image: 'ubuntu'
})

const regions = [
  { id: 'hangzhou', name: '华东-杭州' },
  { id: 'beijing', name: '华北-北京' },
  { id: 'shenzhen', name: '华南-深圳' },
  { id: 'singapore', name: '亚太-新加坡' }
]

const specs = [
  { id: 'small', name: '1核2G', scene: '测试环境、个人博客', price: 89 },
  { id: 'medium', name: '2核4G', scene: '中小型应用、开发环境', price: 199 },
  { id: 'large', name: '4核8G', scene: '生产环境、中型网站', price: 399 },
  { id: 'xlarge', name: '8核16G', scene: '大型应用、数据库', price: 799 }
]

const images = [
  { id: 'ubuntu', name: 'Ubuntu 22.04' },
  { id: 'centos', name: 'CentOS 7.9' },
  { id: 'windows', name: 'Windows Server' },
  { id: 'alpine', name: 'Alpine Linux' }
]

const selectedSpec = computed(() => specs.find(s => s.id === config.value.spec))
const selectedImage = computed(() => images.find(i => i.id === config.value.image))
const price = computed(() => selectedSpec.value?.price || 0)
</script>

<style scoped>
.compute-instance-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.config-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.config-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.config-row label {
  width: 50px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.options button {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.options button:hover {
  border-color: var(--vp-c-brand);
}

.options button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.result-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.result-item {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.result-item .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.result-item .value {
  font-size: 0.9rem;
  font-weight: 500;
}

.result-item .price {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
  
  .config-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .config-row label {
    width: auto;
  }
}
</style>
