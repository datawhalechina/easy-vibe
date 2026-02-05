<template>
  <div class="database-services-demo">
    <div class="demo-header">
      <h4>数据库选型助手</h4>
      <p class="demo-desc">根据您的业务特点，推荐最适合的数据库方案</p>
    </div>

    <div class="db-selection">
      <div class="db-categories">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </button>
      </div>

      <div v-if="selectedCategory" class="db-comparison">
        <div class="comparison-header">
          <span class="aws-badge">AWS</span>
          <span class="vs-text">对比</span>
          <span class="aliyun-badge">阿里云</span>
        </div>

        <div class="db-cards">
          <div class="db-card">
            <div class="db-header aws">
              <div class="db-name">{{ currentCategory.aws }}</div>
            </div>
            <div class="db-body">
              <div class="feature-list">
                <div v-for="(feat, i) in currentCategory.awsFeatures" :key="i" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
              <div class="price-tag">{{ currentCategory.awsPrice }}</div>
            </div>
          </div>

          <div class="db-card">
            <div class="db-header aliyun">
              <div class="db-name">{{ currentCategory.aliyun }}</div>
            </div>
            <div class="db-body">
              <div class="feature-list">
                <div v-for="(feat, i) in currentCategory.aliyunFeatures" :key="i" class="feature">
                  ✓ {{ feat }}
                </div>
              </div>
              <div class="price-tag aliyun">{{ currentCategory.aliyunPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('relational')

const categories = [
  { id: 'relational', name: '关系型数据库', icon: '📊' },
  { id: 'nosql', name: 'NoSQL 数据库', icon: '📦' },
  { id: 'cache', name: '缓存服务', icon: '⚡' },
  { id: 'analytics', name: '分析型数据库', icon: '📈' }
]

const categoryData = {
  relational: {
    aws: 'Amazon RDS / Aurora',
    aliyun: 'RDS / PolarDB',
    awsFeatures: ['MySQL/PostgreSQL/Oracle/SQL Server 支持', 'Aurora 5 倍性能提升', '自动故障转移和读副本', 'Serverless 自动扩缩容'],
    aliyunFeatures: ['MySQL/SQL Server/PostgreSQL/Oracle 支持', 'PolarDB 计算存储分离', '秒级备份恢复', 'Oracle 语法兼容模式'],
    awsPrice: '$0.017/小时起',
    aliyunPrice: '¥0.12/小时起'
  },
  nosql: {
    aws: 'Amazon DynamoDB',
    aliyun: 'Tablestore',
    awsFeatures: ['全托管 NoSQL 键值和文档数据库', '单表设计支持 PB 级规模', 'DAX 内存缓存加速', '全局表多区域复制'],
    aliyunFeatures: ['分布式 NoSQL 数据库存储', '自动分片和负载均衡', '二级索引和全文检索', '毫秒级单点读写延迟'],
    awsPrice: '按需 $1.25/百万次写',
    aliyunPrice: '按量 0.4元/万次写'
  },
  cache: {
    aws: 'Amazon ElastiCache',
    aliyun: '云数据库 Redis',
    awsFeatures: ['托管 Redis 和 Memcached', '集群模式自动分片', '只读副本和自动故障转移', '备份恢复和快照'],
    aliyunFeatures: ['主从双节点架构', '自动故障切换', '读写分离能力', '数据持久化备份'],
    awsPrice: '$0.012/小时起',
    aliyunPrice: '¥0.08/小时起'
  },
  analytics: {
    aws: 'Amazon Redshift',
    aliyun: 'AnalyticDB',
    awsFeatures: ['PB 级数据仓库', '列式存储和压缩', 'Spectrum 查询 S3 数据', '并发扩展和自动优化'],
    aliyunFeatures: ['实时分析型数据库', 'MPP 大规模并行处理', '高并发低延迟查询', '自动索引和优化'],
    awsPrice: '$0.25/小时起',
    aliyunPrice: '¥2.0/小时起'
  }
}

const selectCategory = (id) => {
  selectedCategory.value = id
}

const currentCategory = computed(() => categoryData[selectedCategory.value])
</script>

<style scoped>
.database-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.db-selection {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
}

.db-categories {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.cat-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cat-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.cat-icon {
  font-size: 1rem;
}

.comparison-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.aws-badge, .aliyun-badge {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.aws-badge {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.aliyun-badge {
  background: rgba(255, 106, 0, 0.2);
  color: #ff6a00;
}

.vs-text {
  color: #8892b0;
  font-size: 0.75rem;
}

.db-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.db-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.db-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.db-header.aws {
  background: rgba(255, 153, 0, 0.1);
}

.db-header.aliyun {
  background: rgba(255, 106, 0, 0.1);
}

.db-name {
  font-size: 1rem;
  font-weight: 600;
  color: #e6f1ff;
}

.db-body {
  padding: 16px;
}

.feature-list {
  margin-bottom: 12px;
}

.feature {
  font-size: 0.8125rem;
  color: #e6f1ff;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.price-tag {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  text-align: center;
}

.price-tag.aliyun {
  color: #ff6a00;
  background: rgba(255, 106, 0, 0.1);
}

@media (max-width: 768px) {
  .db-categories {
    justify-content: center;
  }

  .db-cards {
    grid-template-columns: 1fr;
  }
}
</style>
