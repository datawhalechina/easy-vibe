<template>
  <div class="aws-vs-aliyun-demo">
    <div class="demo-header">
      <h4>AWS vs 阿里云 核心差异</h4>
      <p class="demo-desc">点击切换查看不同维度的对比</p>
    </div>

    <div class="comparison-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="comparison-content">
      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="tab-content">
          <div class="vs-cards">
            <div class="vs-card aws-card">
              <div class="card-header">
                <div class="logo">AWS</div>
                <div class="subtitle">Amazon Web Services</div>
              </div>
              <div class="card-body">
                <div
                  v-for="(point, idx) in currentComparison.aws"
                  :key="idx"
                  class="point"
                >
                  <span class="check">✓</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>

            <div class="vs-divider">
              <div class="vs-text">VS</div>
            </div>

            <div class="vs-card aliyun-card">
              <div class="card-header">
                <div class="logo aliyun-logo">阿里云</div>
                <div class="subtitle">Alibaba Cloud</div>
              </div>
              <div class="card-body">
                <div
                  v-for="(point, idx) in currentComparison.aliyun"
                  :key="idx"
                  class="point"
                >
                  <span class="check aliyun-check">✓</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="verdict-box">
            <div class="verdict-title">💡 选型建议</div>
            <div class="verdict-text">{{ currentComparison.verdict }}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('global')

const tabs = [
  { key: 'global', label: '全球布局' },
  { key: 'ecosystem', label: '生态体系' },
  { key: 'pricing', label: '价格策略' },
  { key: 'enterprise', label: '企业服务' },
  { key: 'developer', label: '开发者体验' }
]

const comparisons = {
  global: {
    aws: [
      '全球 30+ 区域，覆盖率最广',
      '发达国家基础设施成熟',
      '跨境数据合规经验丰富'
    ],
    aliyun: [
      '亚太地区覆盖密度最高',
      '中国大陆节点数量领先',
      '一带一路区域布局积极'
    ],
    verdict: '出海欧美选 AWS，深耕亚太选阿里云。跨国企业可考虑双云或多云架构。'
  },
  ecosystem: {
    aws: [
      '服务种类最丰富（200+ 服务）',
      '第三方 SaaS 集成度极高',
      '开源生态支持最全面'
    ],
    aliyun: [
      '阿里系产品无缝集成',
      '电商/零售场景方案成熟',
      '国产化替代支持完善'
    ],
    verdict: '技术栈复杂、需丰富组件选 AWS；阿里系业务、电商零售场景选阿里云。'
  },
  pricing: {
    aws: [
      '预留实例折扣力度大',
      'Spot 竞价实例价格极低',
      '免费额度相对保守'
    ],
    aliyun: [
      '新用户优惠力度大',
      '包年包月性价比高',
      '学生/开发者福利多'
    ],
    verdict: '长期稳定负载选 AWS 预留实例；初创公司、预算敏感选阿里云新客优惠。'
  },
  enterprise: {
    aws: [
      '企业级支持体系成熟',
      '合规认证最全面',
      '混合云方案（Outposts）'
    ],
    aliyun: [
      '本地化服务响应快',
      '政府/央企合作深度高',
      '专有云/混合云方案完善'
    ],
    verdict: '外企、强合规要求选 AWS；政企客户、需本地化支持选阿里云。'
  },
  developer: {
    aws: [
      '文档质量业界标杆',
      '认证体系完善',
      '社区活跃度最高'
    ],
    aliyun: [
      '中文文档详尽',
      '学习路径清晰',
      '技术社区活跃度高'
    ],
    verdict: '英文好、追求国际认证选 AWS；中文开发者、喜欢中文资料选阿里云。'
  }
}

const currentComparison = computed(() => comparisons[activeTab.value])
</script>

<style scoped>
.aws-vs-aliyun-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.comparison-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8892b0;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e6f1ff;
}

.tab-btn.active {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  border-color: transparent;
  color: #fff;
}

.vs-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.vs-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.aws-card {
  border-top: 3px solid #ff9900;
}

.aliyun-card {
  border-top: 3px solid #ff6a00;
}

.card-header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff9900;
  margin-bottom: 4px;
}

.aliyun-logo {
  color: #ff6a00;
}

.subtitle {
  font-size: 0.75rem;
  color: #8892b0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.point {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

.check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.verdict-box {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 44, 191, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.verdict-title {
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 8px;
  font-size: 0.9375rem;
}

.verdict-text {
  color: #e6f1ff;
  font-size: 0.875rem;
  line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .vs-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .vs-divider {
    display: none;
  }

  .comparison-tabs {
    gap: 6px;
  }

  .tab-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>
