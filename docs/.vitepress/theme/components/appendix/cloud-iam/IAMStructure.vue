<template>
  <div class="iam-structure">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">IAM 五大核心概念</span>
      <span class="subtitle">云上权限管理的基础构件</span>
    </div>

    <div class="main-area">
      <div class="layers-list">
        <div
          v-for="(layer, index) in layers"
          :key="index"
          class="layer"
          :class="{ active: selectedLayer === index }"
          @click="selectLayer(index)"
        >
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-desc">{{ layer.shortDesc }}</span>
        </div>
      </div>

      <div class="layer-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedLayerData.icon }}</span>
          <span class="detail-name">{{ selectedLayerData.name }}</span>
        </div>
        <div class="detail-desc">
          {{ selectedLayerData.description }}
        </div>
        <div class="detail-examples">
          <span class="example-label">示例：</span>
          <span
            v-for="(example, i) in selectedLayerData.examples.slice(0, 2)"
            :key="i"
            class="example-tag"
          >{{ example }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>IAM 就像公司的门禁系统——根账号是老板，用户是员工，角色是临时访客证，策略是"谁能进哪些门"的规则。
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
    description: '云账号的所有者，拥有全部资源的完全控制权限。建议仅用于初始设置。',
    examples: ['创建/删除 IAM 用户', '管理账单和支付方式']
  },
  {
    icon: '👤',
    name: 'IAM 用户',
    shortDesc: '个人身份',
    description: '为具体人员创建的长期凭证，用于日常登录和操作云服务。',
    examples: ['开发人员账号', '运维人员账号']
  },
  {
    icon: '👥',
    name: '用户组',
    shortDesc: '批量管理',
    description: '将多个用户归为一组，统一分配权限，简化管理。',
    examples: ['开发组', '运维组']
  },
  {
    icon: '🎭',
    name: '角色',
    shortDesc: '临时授权',
    description: '一种临时身份，可以被切换或赋予其他账号/服务，具有时效性更安全。',
    examples: ['跨账号访问角色', '服务角色']
  },
  {
    icon: '📋',
    name: '策略',
    shortDesc: '权限规则',
    description: '定义"谁可以对什么资源执行什么操作"的规则文档，以 JSON 格式编写。',
    examples: ['允许访问 S3', '禁止删除 EC2']
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
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.main-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .main-area { grid-template-columns: 1fr; }
}

.layers-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.layer:hover { border-color: var(--vp-c-brand); }
.layer.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.layer-icon { font-size: 1rem; }
.layer-name { font-weight: 600; font-size: 0.85rem; }
.layer-desc { font-size: 0.75rem; color: var(--vp-c-text-2); margin-left: auto; }

.layer-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-icon { font-size: 1.25rem; }
.detail-name { font-weight: 600; font-size: 0.95rem; }

.detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.example-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.example-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 4px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
