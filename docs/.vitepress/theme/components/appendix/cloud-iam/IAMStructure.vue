<template>
  <div class="iam-structure">
    <div class="structure-layers">
      <div 
        v-for="(layer, index) in layers" 
        :key="index"
        class="layer"
        :class="{ active: selectedLayer === index }"
        @click="selectLayer(index)"
      >
        <div class="layer-icon">{{ layer.icon }}</div>
        <div class="layer-content">
          <div class="layer-name">{{ layer.name }}</div>
          <div class="layer-desc">{{ layer.shortDesc }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedLayerData" class="layer-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ selectedLayerData.icon }}</span>
        <span class="detail-name">{{ selectedLayerData.name }}</span>
      </div>
      <div class="detail-desc">{{ selectedLayerData.description }}</div>
      <div class="detail-examples">
        <div class="example-title">示例：</div>
        <ul>
          <li v-for="(example, i) in selectedLayerData.examples" :key="i">
            {{ example }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedLayer = ref(0)

const layers = [
  {
    icon: '👑',
    name: '根账号',
    shortDesc: '最高权限',
    description: '云账号的所有者，拥有全部资源的完全控制权限。建议仅用于初始设置，日常操作使用子账号。',
    examples: [
      '创建/删除 IAM 用户',
      '管理账单和支付方式',
      '关闭账号',
      '恢复已删除资源'
    ]
  },
  {
    icon: '👤',
    name: 'IAM 用户',
    shortDesc: '个人身份',
    description: '为具体人员（如员工）创建的长期凭证，用于日常登录和操作云服务。',
    examples: [
      '开发人员账号',
      '运维人员账号',
      '只读审计账号',
      'API 调用账号'
    ]
  },
  {
    icon: '👥',
    name: '用户组',
    shortDesc: '批量管理',
    description: '将多个用户归为一组，统一分配权限，简化管理。',
    examples: [
      '开发组（开发权限）',
      '运维组（运维权限）',
      '财务组（账单权限）',
      '审计组（只读权限）'
    ]
  },
  {
    icon: '🎭',
    name: '角色',
    shortDesc: '临时授权',
    description: '一种临时身份，可以被切换或赋予其他账号/服务，具有时效性更安全。',
    examples: [
      '跨账号访问角色',
      '服务角色（如 Lambda）',
      '临时运维角色',
      '第三方登录角色'
    ]
  },
  {
    icon: '📋',
    name: '策略',
    shortDesc: '权限规则',
    description: '定义"谁可以对什么资源执行什么操作"的规则文档，以 JSON 格式编写。',
    examples: [
      '允许访问 S3 存储桶',
      '禁止删除 EC2 实例',
      '只允许查看 RDS',
      '允许特定时间段访问'
    ]
  }
]

const selectedLayerData = computed(() => layers[selectedLayer.value])

function selectLayer(index) {
  selectedLayer.value = index
}
</script>

<style scoped>
.iam-structure {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.structure-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.layer:hover {
  border-color: var(--vp-c-brand);
}

.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon {
  font-size: 1.25rem;
  width: 32px;
  text-align: center;
}

.layer-content {
  flex: 1;
}

.layer-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.layer-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.layer-detail {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-name {
  font-weight: 600;
  font-size: 1rem;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.detail-examples {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.example-title {
  font-weight: 500;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.detail-examples ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.detail-examples li {
  margin-bottom: 0.25rem;
}

.detail-examples li:last-child {
  margin-bottom: 0;
}
</style>
