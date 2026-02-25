<!--
  DataQualityDemo.vue
  数据质量维度演示：展示数据质量的六个核心维度
-->
<template>
  <div class="data-quality-demo">
    <div class="header">
      <div class="title">数据质量检测器</div>
      <div class="subtitle">点击不同维度，查看数据质量问题示例</div>
    </div>

    <div class="dimensions">
      <div
        v-for="dim in dimensions"
        :key="dim.key"
        :class="['dim-card', { active: activeDim === dim.key }]"
        @click="activeDim = dim.key"
      >
        <div class="dim-icon">{{ dim.icon }}</div>
        <div class="dim-name">{{ dim.name }}</div>
      </div>
    </div>

    <div v-if="currentDim" class="detail-panel">
      <div class="detail-header">
        <span class="detail-icon">{{ currentDim.icon }}</span>
        <span class="detail-title">{{ currentDim.name }}</span>
        <span class="detail-desc">{{ currentDim.desc }}</span>
      </div>

      <div class="example-section">
        <div class="example bad">
          <div class="example-label bad-label">问题数据</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.badData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.badData.rows" :key="i">
                <td
                  v-for="(cell, j) in row"
                  :key="j"
                  :class="{ 'cell-error': cell.error }"
                >{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example good">
          <div class="example-label good-label">治理后</div>
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="col in currentDim.goodData.cols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in currentDim.goodData.rows" :key="i">
                <td v-for="(cell, j) in row" :key="j">{{ cell.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="quality-score">
        <div class="score-label">质量评分</div>
        <div class="score-bar-bg">
          <div
            class="score-bar-fill"
            :style="{ width: currentDim.score + '%', background: scoreColor(currentDim.score) }"
          ></div>
        </div>
        <div class="score-value">{{ currentDim.score }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDim = ref('completeness')

const dimensions = [
  {
    key: 'completeness', name: '完整性', icon: '📋',
    desc: '数据是否存在缺失值',
    score: 72,
    badData: {
      cols: ['用户ID', '姓名', '邮箱', '手机号'],
      rows: [
        [{ value: '001' }, { value: '张三' }, { value: 'zhang@mail.com' }, { value: '138xxxx1234' }],
        [{ value: '002' }, { value: '李四' }, { value: '', error: true }, { value: '', error: true }],
        [{ value: '003' }, { value: '', error: true }, { value: 'wang@mail.com' }, { value: '139xxxx5678' }]
      ]
    },
    goodData: {
      cols: ['用户ID', '姓名', '邮箱', '手机号'],
      rows: [
        [{ value: '001' }, { value: '张三' }, { value: 'zhang@mail.com' }, { value: '138xxxx1234' }],
        [{ value: '002' }, { value: '李四' }, { value: 'li@mail.com' }, { value: '137xxxx9012' }],
        [{ value: '003' }, { value: '王五' }, { value: 'wang@mail.com' }, { value: '139xxxx5678' }]
      ]
    }
  },
  {
    key: 'accuracy', name: '准确性', icon: '🎯',
    desc: '数据值是否正确反映真实情况',
    score: 65,
    badData: {
      cols: ['订单ID', '金额', '日期', '状态'],
      rows: [
        [{ value: 'ORD-101' }, { value: '-50.00', error: true }, { value: '2025-01-15' }, { value: '已完成' }],
        [{ value: 'ORD-102' }, { value: '299.00' }, { value: '2025-13-01', error: true }, { value: '已发货' }],
        [{ value: 'ORD-103' }, { value: '1500.00' }, { value: '2025-02-28' }, { value: '已退款', error: true }]
      ]
    },
    goodData: {
      cols: ['订单ID', '金额', '日期', '状态'],
      rows: [
        [{ value: 'ORD-101' }, { value: '50.00' }, { value: '2025-01-15' }, { value: '已完成' }],
        [{ value: 'ORD-102' }, { value: '299.00' }, { value: '2025-01-13' }, { value: '已发货' }],
        [{ value: 'ORD-103' }, { value: '1500.00' }, { value: '2025-02-28' }, { value: '已完成' }]
      ]
    }
  },
  {
    key: 'consistency', name: '一致性', icon: '🔗',
    desc: '同一数据在不同系统中是否一致',
    score: 58,
    badData: {
      cols: ['来源', '用户名', '手机号', '地址'],
      rows: [
        [{ value: 'CRM' }, { value: '张三' }, { value: '13812341234' }, { value: '北京市朝阳区' }],
        [{ value: '订单系统' }, { value: '张三丰', error: true }, { value: '13812341234' }, { value: '北京朝阳', error: true }],
        [{ value: '客服系统' }, { value: '张三' }, { value: '13899999999', error: true }, { value: '北京市朝阳区' }]
      ]
    },
    goodData: {
      cols: ['来源', '用户名', '手机号', '地址'],
      rows: [
        [{ value: 'CRM' }, { value: '张三' }, { value: '13812341234' }, { value: '北京市朝阳区' }],
        [{ value: '订单系统' }, { value: '张三' }, { value: '13812341234' }, { value: '北京市朝阳区' }],
        [{ value: '客服系统' }, { value: '张三' }, { value: '13812341234' }, { value: '北京市朝阳区' }]
      ]
    }
  },
  {
    key: 'timeliness', name: '时效性', icon: '⏰',
    desc: '数据是否及时更新',
    score: 80,
    badData: {
      cols: ['商品ID', '价格', '库存', '更新时间'],
      rows: [
        [{ value: 'SKU-001' }, { value: '¥299' }, { value: '50' }, { value: '2024-06-01', error: true }],
        [{ value: 'SKU-002' }, { value: '¥599' }, { value: '0', error: true }, { value: '2024-03-15', error: true }],
        [{ value: 'SKU-003' }, { value: '¥199' }, { value: '200' }, { value: '2025-02-20' }]
      ]
    },
    goodData: {
      cols: ['商品ID', '价格', '库存', '更新时间'],
      rows: [
        [{ value: 'SKU-001' }, { value: '¥259' }, { value: '35' }, { value: '2025-02-25' }],
        [{ value: 'SKU-002' }, { value: '¥549' }, { value: '12' }, { value: '2025-02-25' }],
        [{ value: 'SKU-003' }, { value: '¥199' }, { value: '180' }, { value: '2025-02-25' }]
      ]
    }
  },
  {
    key: 'uniqueness', name: '唯一性', icon: '🔑',
    desc: '数据是否存在重复记录',
    score: 70,
    badData: {
      cols: ['用户ID', '姓名', '邮箱', '注册时间'],
      rows: [
        [{ value: '001' }, { value: '张三' }, { value: 'zhang@mail.com' }, { value: '2025-01-01' }],
        [{ value: '005' }, { value: '张三', error: true }, { value: 'zhang@mail.com', error: true }, { value: '2025-01-15', error: true }],
        [{ value: '002' }, { value: '李四' }, { value: 'li@mail.com' }, { value: '2025-01-10' }]
      ]
    },
    goodData: {
      cols: ['用户ID', '姓名', '邮箱', '注册时间'],
      rows: [
        [{ value: '001' }, { value: '张三' }, { value: 'zhang@mail.com' }, { value: '2025-01-01' }],
        [{ value: '002' }, { value: '李四' }, { value: 'li@mail.com' }, { value: '2025-01-10' }]
      ]
    }
  },
  {
    key: 'validity', name: '有效性', icon: '✅',
    desc: '数据是否符合预定义的格式和规则',
    score: 75,
    badData: {
      cols: ['字段', '值', '规则'],
      rows: [
        [{ value: '邮箱' }, { value: 'not-an-email', error: true }, { value: '需包含@' }],
        [{ value: '年龄' }, { value: '-5', error: true }, { value: '0~150' }],
        [{ value: '手机号' }, { value: '1234', error: true }, { value: '11位数字' }]
      ]
    },
    goodData: {
      cols: ['字段', '值', '规则'],
      rows: [
        [{ value: '邮箱' }, { value: 'user@mail.com' }, { value: '需包含@' }],
        [{ value: '年龄' }, { value: '28' }, { value: '0~150' }],
        [{ value: '手机号' }, { value: '13812345678' }, { value: '11位数字' }]
      ]
    }
  }
]

const currentDim = computed(() => dimensions.find(d => d.key === activeDim.value))

function scoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}
</script>

<style scoped>
.data-quality-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.dimensions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.dim-card {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
}
.dim-card:hover { border-color: var(--vp-c-brand); }
.dim-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.dim-icon { font-size: 1.1rem; }
.dim-name { font-weight: 600; }
.detail-panel {
  padding: 1rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); margin-bottom: 1rem;
}
.detail-header { margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.detail-icon { font-size: 1.2rem; }
.detail-title { font-weight: 700; font-size: 1rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; }
.example-section { display: flex; gap: 1rem; margin-bottom: 1rem; }
.example { flex: 1; }
.example-label { font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; }
.bad-label { background: rgba(239,68,68,0.1); color: #ef4444; }
.good-label { background: rgba(34,197,94,0.1); color: #22c55e; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.data-table th { background: var(--vp-c-bg-soft); padding: 0.3rem 0.4rem; text-align: left; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.data-table td { padding: 0.3rem 0.4rem; border-bottom: 1px solid var(--vp-c-divider); }
.cell-error { background: rgba(239,68,68,0.1); color: #ef4444; font-weight: 600; }
.quality-score { display: flex; align-items: center; gap: 0.75rem; }
.score-label { font-weight: 600; font-size: 0.85rem; white-space: nowrap; }
.score-bar-bg { flex: 1; height: 10px; background: var(--vp-c-bg-soft); border-radius: 5px; overflow: hidden; }
.score-bar-fill { height: 100%; border-radius: 5px; transition: width 0.4s; }
.score-value { font-weight: 700; font-size: 0.9rem; font-family: var(--vp-font-family-mono); min-width: 40px; }
@media (max-width: 640px) { .example-section { flex-direction: column; } }
</style>
