<!--
  DataCollectionDemo.vue
  数据采集方案对比 - 客户端、服务端、CDN日志采集
-->
<template>
  <div class="data-collection-demo">
    <div class="header">
      <div class="title">数据采集方案</div>
      <div class="subtitle">客户端、服务端、CDN三种采集方式对比</div>
    </div>

    <div class="collection-methods">
      <div
        v-for="method in methods"
        :key="method.id"
        class="method-card"
        @click="selectedMethod = method.id"
        :class="{ active: selectedMethod === method.id }"
      >
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <div class="method-desc">{{ method.desc }}</div>

        <div class="method-details" v-if="selectedMethod === method.id">
          <div class="detail-section">
            <div class="section-title">✅ 优点</div>
            <ul class="detail-list">
              <li v-for="(pro, i) in method.pros" :key="i">{{ pro }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <div class="section-title">❌ 缺点</div>
            <ul class="detail-list">
              <li v-for="(con, i) in method.cons" :key="i">{{ con }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <div class="section-title">🎯 适用场景</div>
            <ul class="detail-list">
              <li v-for="(use, i) in method.useCases" :key="i">{{ use }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">方案对比</div>
      <table class="comparison">
        <thead>
          <tr>
            <th>对比维度</th>
            <th v-for="method in methods" :key="method.id">
              {{ method.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>数据准确性</td>
            <td v-for="method in methods" :key="method.id">
              {{ method.accuracy }}
            </td>
          </tr>
          <tr>
            <td>实时性</td>
            <td v-for="method in methods" :key="method.id">
              {{ method.realtime }}
            </td>
          </tr>
          <tr>
            <td>开发成本</td>
            <td v-for="method in methods" :key="method.id">
              {{ method.cost }}
            </td>
          </tr>
          <tr>
            <td>维护成本</td>
            <td v-for="method in methods" :key="method.id">
              {{ method.maintenance }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('client')

const methods = [
  {
    id: 'client',
    name: '客户端埋点',
    icon: '📱',
    desc: '在 Web、App 前端代码中集成埋点 SDK',
    pros: ['实时性好', '可采集设备信息', '离线缓存'],
    cons: ['数据可能被篡改', '耗电流量', 'App 崩溃可能丢失'],
    useCases: ['页面浏览', '按钮点击', '表单提交'],
    accuracy: '★★★☆☆',
    realtime: '★★★★★',
    cost: '★★★☆☆',
    maintenance: '★★★☆☆'
  },
  {
    id: 'server',
    name: '服务端埋点',
    icon: '⚙️',
    desc: '在服务器端业务逻辑中添加埋点代码',
    pros: ['数据准确', '不可篡改', '采集服务端特有数据'],
    cons: ['无法获取客户端信息', '需要业务代码侵入'],
    useCases: ['支付成功', '订单创建', 'API 调用'],
    accuracy: '★★★★★',
    realtime: '★★★★☆',
    cost: '★★★☆☆',
    maintenance: '★★★☆☆'
  },
  {
    id: 'cdn',
    name: 'CDN 日志采集',
    icon: '🌐',
    desc: '通过 CDN 访问日志分析用户行为',
    pros: ['零代码侵入', '覆盖所有用户', '成本低'],
    cons: ['数据维度有限', '无法获取业务数据'],
    useCases: ['PV/UV 统计', '资源加载性能', '错误监控'],
    accuracy: '★★★☆☆',
    realtime: '★★★☆☆',
    cost: '★★★★★',
    maintenance: '★★★★★'
  }
]
</script>

<style scoped>
.data-collection-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.collection-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.method-card:hover,
.method-card.active {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.method-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.method-name {
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.method-desc {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.method-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-section {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: var(--vp-c-text-1);
}

.detail-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: 700;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
}

.comparison th {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-divider);
}

.comparison td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison td:first-child {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .collection-methods {
    grid-template-columns: 1fr;
  }
}
</style>
