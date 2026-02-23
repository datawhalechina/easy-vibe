<template>
  <div class="http-methods-demo">
    <div class="methods-grid">
      <div
        v-for="method in methods"
        :key="method.id"
        :class="['method-card', method.id, { active: active === method.id }]"
        @click="active = method.id"
      >
        <span class="method-badge">{{ method.id }}</span>
        <div class="method-info">
          <div class="method-name">{{ method.name }}</div>
          <div class="method-use">{{ method.use }}</div>
        </div>
        <div class="method-flags">
          <span :class="['flag', method.idempotent ? 'yes' : 'no']">
            {{ method.idempotent ? '幂等' : '不幂等' }}
          </span>
        </div>
      </div>
    </div>

    <div class="method-detail">
      <div class="detail-header">
        <span :class="['detail-badge', currentMethod.id]">{{
          currentMethod.id
        }}</span>
        <span class="detail-title">{{ currentMethod.name }} - {{ currentMethod.use }}</span>
      </div>
      <div class="detail-desc">{{ currentMethod.desc }}</div>
      <div class="detail-analogy">
        <span class="analogy-label">餐厅类比:</span>
        <span class="analogy-text">{{ currentMethod.analogy }}</span>
      </div>
      <div class="detail-code">
        <pre><code>{{ currentMethod.example }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('get')

const methods = [
  {
    id: 'get',
    name: '获取',
    use: '查询数据',
    idempotent: true,
    desc: '从服务器获取资源,不会修改任何数据',
    analogy: '"服务员,菜单给我看看"',
    example: `GET /api/users           # 获取用户列表
GET /api/users/123       # 获取单个用户
GET /api/products?cat=phone  # 查询手机商品`
  },
  {
    id: 'post',
    name: '创建',
    use: '新增数据',
    idempotent: false,
    desc: '向服务器提交数据,创建新资源',
    analogy: '"给我来份宫保鸡丁"',
    example: `POST /api/users
Body: {"name": "张三", "email": "zhang@example.com"}

POST /api/orders
Body: {"items": [{"id": 1, "qty": 2}]}`
  },
  {
    id: 'put',
    name: '全量更新',
    use: '替换资源',
    idempotent: true,
    desc: '用新数据完整替换旧资源',
    analogy: '"把宫保鸡丁改成糖醋里脊"',
    example: `PUT /api/users/123
Body: {"name": "李四", "email": "li@example.com", "age": 25}
# 注意:必须提供所有字段`
  },
  {
    id: 'patch',
    name: '部分更新',
    use: '修改字段',
    idempotent: false,
    desc: '只修改资源的部分字段',
    analogy: '"宫保鸡丁不要放花生"',
    example: `PATCH /api/users/123
Body: {"name": "王五"}
# 只修改 name,其他字段保持不变`
  },
  {
    id: 'delete',
    name: '删除',
    use: '删除资源',
    idempotent: true,
    desc: '从服务器删除资源',
    analogy: '"算了,那道菜不要了"',
    example: `DELETE /api/users/123       # 删除指定用户
DELETE /api/orders/456      # 取消订单`
  }
]

const currentMethod = computed(() => {
  return methods.find((m) => m.id === active.value) || methods[0]
})
</script>

<style scoped>
.http-methods-demo {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.method-card {
  padding: 12px 8px;
  background: var(--vp-c-bg);
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.method-card:last-child {
  border-right: none;
}

.method-card:hover {
  background: var(--vp-c-bg-mute);
}

.method-card.active {
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
}

.method-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  min-width: 36px;
  text-align: center;
}

.method-card.get .method-badge {
  background: #22c55e;
  color: white;
}
.method-card.post .method-badge {
  background: #3b82f6;
  color: white;
}
.method-card.put .method-badge {
  background: #f59e0b;
  color: white;
}
.method-card.patch .method-badge {
  background: #8b5cf6;
  color: white;
}
.method-card.delete .method-badge {
  background: #ef4444;
  color: white;
}

.method-info {
  text-align: center;
}

.method-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.method-use {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.method-flags {
  margin-top: auto;
}

.flag {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 3px;
}

.flag.yes {
  background: #22c55e22;
  color: #22c55e;
}

.flag.no {
  background: #ef444422;
  color: #ef4444;
}

.method-detail {
  padding: 16px;
  background: var(--vp-c-bg);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.detail-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.detail-badge.get {
  background: #22c55e;
  color: white;
}
.detail-badge.post {
  background: #3b82f6;
  color: white;
}
.detail-badge.put {
  background: #f59e0b;
  color: white;
}
.detail-badge.patch {
  background: #8b5cf6;
  color: white;
}
.detail-badge.delete {
  background: #ef4444;
  color: white;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 8px;
}

.detail-analogy {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.analogy-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.detail-code {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.detail-code pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

.detail-code code {
  font-family: 'Menlo', 'Monaco', monospace;
}
</style>
