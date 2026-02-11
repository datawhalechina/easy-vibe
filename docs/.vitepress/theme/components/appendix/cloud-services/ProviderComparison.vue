<template>
  <div class="provider-comparison">
    <div class="compare-table">
      <div class="table-header">
        <div class="col feature">对比项</div>
        <div class="col provider">AWS</div>
        <div class="col provider">阿里云</div>
        <div class="col provider">腾讯云</div>
      </div>
      <div 
        v-for="row in compareData" 
        :key="row.feature"
        class="table-row"
      >
        <div class="col feature">{{ row.feature }}</div>
        <div class="col provider" :class="{ highlight: row.awsHighlight }">
          {{ row.aws }}
        </div>
        <div class="col provider" :class="{ highlight: row.aliyunHighlight }">
          {{ row.aliyun }}
        </div>
        <div class="col provider" :class="{ highlight: row.tencentHighlight }">
          {{ row.tencent }}
        </div>
      </div>
    </div>
    
    <div class="selection-guide">
      <div class="guide-title">💡 选择建议</div>
      <div class="guide-items">
        <div class="guide-item">
          <span class="scenario">出海业务</span>
          <span class="recommend">→ AWS</span>
        </div>
        <div class="guide-item">
          <span class="scenario">国内电商</span>
          <span class="recommend">→ 阿里云</span>
        </div>
        <div class="guide-item">
          <span class="scenario">游戏/社交</span>
          <span class="recommend">→ 腾讯云</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const compareData = [
  {
    feature: '全球覆盖',
    aws: '⭐⭐⭐⭐⭐',
    aliyun: '⭐⭐⭐',
    tencent: '⭐⭐⭐',
    awsHighlight: true
  },
  {
    feature: '国内速度',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    aliyunHighlight: true,
    tencentHighlight: true
  },
  {
    feature: '文档中文',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    aliyunHighlight: true,
    tencentHighlight: true
  },
  {
    feature: '价格优势',
    aws: '⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐⭐',
    tencentHighlight: true
  },
  {
    feature: '生态丰富',
    aws: '⭐⭐⭐⭐⭐',
    aliyun: '⭐⭐⭐⭐',
    tencent: '⭐⭐⭐⭐',
    awsHighlight: true
  }
]
</script>

<style scoped>
.provider-comparison {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.compare-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.table-header {
  font-weight: 600;
  font-size: 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.table-row {
  font-size: 0.85rem;
  padding: 0.4rem 0;
}

.col {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}

.col.feature {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.col.provider {
  text-align: center;
  background: var(--vp-c-bg);
}

.col.provider.highlight {
  background: var(--vp-c-brand-soft);
  font-weight: 500;
}

.selection-guide {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.guide-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.guide-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.guide-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.guide-item .scenario {
  color: var(--vp-c-text-2);
}

.guide-item .recommend {
  font-weight: 500;
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .table-header,
  .table-row {
    grid-template-columns: 80px 1fr 1fr 1fr;
    font-size: 0.75rem;
  }
  
  .col {
    padding: 0.3rem 0.4rem;
  }
}
</style>
