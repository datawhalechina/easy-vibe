<template>
  <div class="status-categories">
    <div class="cards-grid">
      <div
        v-for="cat in categories"
        :key="cat.code"
        :class="['status-card', cat.id]"
      >
        <div class="card-header">
          <span class="card-code">{{ cat.code }}xx</span>
          <span class="card-name">{{ cat.name }}</span>
        </div>
        <div class="card-desc">{{ cat.desc }}</div>
        <div class="card-examples">
          <span v-for="ex in cat.examples" :key="ex" class="tag">{{ ex }}</span>
        </div>
      </div>
    </div>
    <div class="memory-tip">
      <span class="tip-icon">💡</span>
      <span class="tip-text">
        <strong>记忆技巧:</strong>
        <span class="tip-2">2️⃣ 成功</span> •
        <span class="tip-3">3️⃣ 重定向</span> •
        <span class="tip-4">4️⃣ 客户端错</span> •
        <span class="tip-5">5️⃣ 服务器错</span>
      </span>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    id: 'success',
    code: '2',
    name: '成功',
    desc: '请求被成功接收、理解并处理',
    examples: ['200 OK', '201 Created', '204 No Content']
  },
  {
    id: 'redirect',
    code: '3',
    name: '重定向',
    desc: '需要进一步操作才能完成请求',
    examples: ['301 永久移动', '304 未修改', '307 临时重定向']
  },
  {
    id: 'client-error',
    code: '4',
    name: '客户端错误',
    desc: '请求包含错误或无法完成',
    examples: ['400 参数错误', '401 未认证', '403 无权限', '404 不存在']
  },
  {
    id: 'server-error',
    code: '5',
    name: '服务器错误',
    desc: '服务器无法处理有效请求',
    examples: ['500 内部错误', '502 网关错误', '503 服务不可用']
  }
]
</script>

<style scoped>
.status-categories {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

.status-card {
  padding: 14px 12px;
  background: var(--vp-c-bg);
  border-right: 1px solid var(--vp-c-divider);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.status-card:last-child {
  border-right: none;
}

.status-card.success {
  border-top: 3px solid #22c55e;
}

.status-card.redirect {
  border-top: 3px solid #f59e0b;
}

.status-card.client-error {
  border-top: 3px solid #ef4444;
}

.status-card.server-error {
  border-top: 3px solid #8b5cf6;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.card-code {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  min-width: 32px;
  text-align: center;
}

.success .card-code {
  background: #22c55e22;
  color: #22c55e;
}

.redirect .card-code {
  background: #f59e0b22;
  color: #f59e0b;
}

.client-error .card-code {
  background: #ef444422;
  color: #ef4444;
}

.server-error .card-code {
  background: #8b5cf622;
  color: #8b5cf6;
}

.card-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 8px;
}

.card-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 9px;
  font-family: 'Menlo', 'Monaco', monospace;
  color: var(--vp-c-text-3);
}

.memory-tip {
  padding: 12px 16px;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  gap: 10px;
}

.tip-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.tip-text strong {
  color: var(--vp-c-text-1);
  margin-right: 6px;
}

.tip-2 {
  color: #22c55e;
}
.tip-3 {
  color: #f59e0b;
}
.tip-4 {
  color: #ef4444;
}
.tip-5 {
  color: #8b5cf6;
}
</style>
