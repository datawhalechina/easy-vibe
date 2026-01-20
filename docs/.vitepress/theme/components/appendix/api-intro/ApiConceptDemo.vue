<!--
  ApiConceptDemo.vue
  目标：互动演示 API 必须写清楚的 4 个要点
-->
<template>
  <div class="demo">
    <div class="title">📋 API 必须写清楚的 4 件事</div>
    <p class="subtitle">点每一项看看是什么意思</p>

    <div class="cards">
      <div
        v-for="item in items"
        :key="item.id"
        :class="['card', { active: selectedId === item.id }]"
        @click="select(item.id)"
      >
        <div class="card-icon">{{ item.icon }}</div>
        <div class="card-title">{{ item.title }}</div>
        <div class="card-hint">{{ item.hint }}</div>
      </div>
    </div>

    <div class="detail" v-if="selected">
      <div class="detail-header">
        <span class="detail-icon">{{ selected.icon }}</span>
        <span class="detail-title">{{ selected.title }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-desc">{{ selected.desc }}</div>
        <div class="detail-example">
          <strong>例子：</strong>
          <code>{{ selected.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedId = ref('entry')

const items = [
  {
    id: 'entry',
    icon: '📍',
    title: '入口在哪',
    hint: '网址 / 函数名',
    desc: '你要调用的"按钮"在哪里。是 HTTP 网址，还是代码里的函数名？',
    example: 'GET /api/users/{id}'
  },
  {
    id: 'params',
    icon: '📝',
    title: '要填什么',
    hint: '需要哪些参数',
    desc: '调用这个 API 时，你需要提供哪些信息？哪些是必填的，哪些是可选的？',
    example: 'id（必填）、page（可选）'
  },
  {
    id: 'response',
    icon: '✅',
    title: '会得到什么',
    hint: '返回什么数据',
    desc: '成功的时候，API 会返回什么数据？有哪些字段，分别代表什么意思？',
    example: '{ id, name, email }'
  },
  {
    id: 'error',
    icon: '⚠️',
    title: '失败怎么说',
    hint: '错误提示',
    desc: '调用失败的时候会返回什么错误信息？你应该怎么处理这些错误？',
    example: '401 没权限、404 找不到、429 太频繁'
  }
]

const selected = computed(() => items.find(i => i.id === selectedId.value))

function select(id) {
  selectedId.value = id
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.card.active {
  border-color: var(--vp-c-brand-1);
  background: #f0f9ff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.card-hint {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.detail {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.detail-icon {
  font-size: 28px;
}

.detail-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.detail-body {
  line-height: 1.8;
}

.detail-desc {
  font-size: 15px;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.detail-example strong {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.detail-example code {
  display: block;
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
