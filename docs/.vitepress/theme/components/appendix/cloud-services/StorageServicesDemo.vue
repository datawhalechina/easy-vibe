<template>
  <div class="storage-services-demo">
    <div class="demo-header">
      <h4>存储服务选型助手</h4>
      <p class="demo-desc">根据您的使用场景，推荐最适合的存储方案</p>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">选择您的主要使用场景：</div>
      <div class="scenario-grid">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-card"
          :class="{ active: selectedScenario === scenario.id }"
          @click="selectScenario(scenario.id)"
        >
          <div class="scenario-icon">{{ scenario.icon }}</div>
          <div class="scenario-name">{{ scenario.name }}</div>
          <div class="scenario-desc">{{ scenario.shortDesc }}</div>
        </button>
      </div>
    </div>

    <div v-if="selectedScenario" class="recommendation-result">
      <div class="result-header">
        <span class="result-icon">🎯</span>
        <span class="result-title">推荐方案</span>
      </div>

      <div class="storage-comparison">
        <div class="provider-card aws">
          <div class="provider-header">
            <div class="provider-logo">AWS</div>
            <div class="provider-service">{{ currentScenario.awsService }}</div>
          </div>
          <div class="provider-features">
            <div v-for="(feature, idx) in currentScenario.awsFeatures" :key="idx" class="feature-item">
              <span class="check">✓</span>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="provider-pricing">
            <div class="price-label">定价模式</div>
            <div class="price-value">{{ currentScenario.awsPricing }}</div>
          </div>
        </div>

        <div class="vs-divider">
          <div class="vs-line"></div>
          <div class="vs-badge">VS</div>
          <div class="vs-line"></div>
        </div>

        <div class="provider-card aliyun">
          <div class="provider-header">
            <div class="provider-logo aliyun-logo">阿里云</div>
            <div class="provider-service">{{ currentScenario.aliyunService }}</div>
          </div>
          <div class="provider-features">
            <div v-for="(feature, idx) in currentScenario.aliyunFeatures" :key="idx" class="feature-item">
              <span class="check aliyun-check">✓</span>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="provider-pricing">
            <div class="price-label">定价模式</div>
            <div class="price-value">{{ currentScenario.aliyunPricing }}</div>
          </div>
        </div>
      </div>

      <div class="decision-guide">
        <div class="guide-title">🤔 如何选择？</div>
        <div class="guide-content">
          <div class="guide-item">
            <div class="guide-condition">选择 AWS 如果：</div>
            <div class="guide-reason">{{ currentScenario.chooseAwsWhen }}</div>
          </div>
          <div class="guide-item">
            <div class="guide-condition">选择阿里云如果：</div>
            <div class="guide-reason">{{ currentScenario.chooseAliyunWhen }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref(null)

const scenarios = [
  {
    id: 'website',
    name: '静态网站托管',
    icon: '🌐',
    shortDesc: '托管 HTML/CSS/JS 等静态资源',
    awsService: 'Amazon S3 + CloudFront',
    aliyunService: 'OSS + CDN',
    awsFeatures: [
      '全球 400+ 边缘节点加速',
      '自动压缩和 HTTP/2 支持',
      '与 Route 53 无缝集成',
      '支持静态网站托管配置'
    ],
    aliyunFeatures: [
      '国内 2800+ 节点覆盖',
      '智能压缩和 QUIC 协议支持',
      '与万网域名一键绑定',
      '实时日志分析和监控'
    ],
    awsPricing: '存储 $0.023/GB/月 + 流量 $0.085-0.12/GB',
    aliyunPricing: '存储 ¥0.12/GB/月 + 流量 ¥0.24-0.80/GB',
    chooseAwsWhen: '用户主要在海外，需要全球加速，或已使用 AWS 其他服务',
    chooseAliyunWhen: '用户主要在中国大陆，需要备案支持，追求国内访问速度'
  },
  {
    id: 'database',
    name: '数据库存储',
    icon: '🗄️',
    shortDesc: '关系型和非关系型数据库',
    awsService: 'Amazon RDS/Aurora',
    aliyunService: 'RDS/PolarDB',
    awsFeatures: [
      'Aurora 性能是 MySQL 的 5 倍',
      '自动故障转移和读副本',
      '支持 6 种数据库引擎',
      'Serverless 自动扩缩容'
    ],
    aliyunFeatures: [
      'PolarDB 计算存储分离架构',
      '一写多读，读写分离',
      '秒级备份和恢复',
      'Oracle 语法兼容模式'
    ],
    awsPricing: '按需 $0.017-0.68/小时，预留可省 40-60%',
    aliyunPricing: '按量 ¥0.12-4.8/小时，包年包月更优惠',
    chooseAwsWhen: '需要 Aurora 的高性能，或有多种数据库引擎需求',
    chooseAliyunWhen: '需要 Oracle 兼容，或追求性价比和本地化支持'
  },
  {
    id: 'backup',
    name: '备份与归档',
    icon: '💾',
    shortDesc: '冷数据和长期归档存储',
    awsService: 'Amazon S3 Glacier',
    aliyunService: 'OSS 归档存储',
    awsFeatures: [
      'Glacier Deep Archive  cheapest',
      '检索时间从分钟到小时可选',
      'S3 生命周期策略自动迁移',
      'WORM 合规保留策略'
    ],
    aliyunFeatures: [
      '归档存储单价行业最低',
      '解冻时间可配置',
      '跨地域冗余存储',
      '符合国内合规要求'
    ],
    awsPricing: 'Glacier $0.004/GB/月，Deep Archive $0.00099/GB/月',
    aliyunPricing: '归档存储 ¥0.033/GB/月，冷归档更低',
    chooseAwsWhen: '需要 Deep Archive 超低成本，或有复杂生命周期策略',
    chooseAliyunWhen: '数据需在国内归档，或追求极致性价比'
  },
  {
    id: 'media',
    name: '媒体处理',
    icon: '🎬',
    shortDesc: '音视频存储和分发',
    awsService: 'S3 + Elemental',
    aliyunService: 'OSS + 媒体处理',
    awsFeatures: [
      'Elemental 专业级视频处理',
      'MediaConvert 格式转码',
      'MediaLive 直播流处理',
      'CloudFront 低延迟分发'
    ],
    aliyunFeatures: [
      '视频截帧、转码、水印',
      '智能封面和内容审核',
      '直播录制和时移回看',
      'CDN 全球加速分发'
    ],
    awsPricing: '按使用量计费，转码 $0.007-0.1/分钟',
    aliyunPricing: '按量计费，转码 ¥0.03-0.5/分钟',
    chooseAwsWhen: '需要广播级专业处理，或全球直播分发',
    chooseAliyunWhen: '需要智能内容审核，或国内视频处理'
  }
]

const selectScenario = (id) => {
  selectedScenario.value = id
}

const currentScenario = computed(() => {
  return scenarios.find(s => s.id === selectedScenario.value)
})
</script>

<style scoped>
.storage-services-demo {
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

.scenario-selector {
  margin-bottom: 24px;
}

.selector-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.scenario-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.scenario-card.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 44, 191, 0.15));
  border-color: rgba(0, 212, 255, 0.3);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #e6f1ff;
  margin-bottom: 4px;
}

.scenario-desc {
  font-size: 0.75rem;
  color: #8892b0;
}

.recommendation-result {
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.result-icon {
  font-size: 1.25rem;
}

.result-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
}

.storage-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.provider-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.provider-card.aws {
  border-top: 3px solid #ff9900;
}

.provider-card.aliyun {
  border-top: 3px solid #ff6a00;
}

.provider-header {
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.provider-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff9900;
}

.provider-logo.aliyun-logo {
  color: #ff6a00;
}

.provider-service {
  font-size: 0.8125rem;
  color: #8892b0;
  margin-top: 4px;
}

.provider-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.8125rem;
  color: #e6f1ff;
  line-height: 1.4;
}

.check {
  color: #ff9900;
  font-weight: 700;
  flex-shrink: 0;
}

.aliyun-check {
  color: #ff6a00;
}

.provider-pricing {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
}

.price-label {
  font-size: 0.75rem;
  color: #8892b0;
  margin-bottom: 4px;
}

.price-value {
  font-size: 0.8125rem;
  color: #e6f1ff;
  font-weight: 500;
}

.vs-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.vs-line {
  width: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
}

.vs-badge {
  background: linear-gradient(135deg, #00d4ff, #7b2cbf);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.decision-guide {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.guide-title {
  font-weight: 600;
  font-size: 1rem;
  color: #e6f1ff;
  margin-bottom: 12px;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border-left: 3px solid #00d4ff;
}

.guide-condition {
  font-size: 0.8125rem;
  color: #00d4ff;
  font-weight: 500;
  margin-bottom: 4px;
}

.guide-reason {
  font-size: 0.875rem;
  color: #e6f1ff;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .scenario-grid {
    grid-template-columns: 1fr;
  }

  .storage-comparison {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .vs-divider {
    display: none;
  }
}
</style>
