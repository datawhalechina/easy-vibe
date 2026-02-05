<template>
  <div class="service-selection-demo">
    <div class="demo-header">
      <h4>云服务选型决策树</h4>
      <p class="demo-desc">回答几个简单问题，获取最适合您的云服务方案</p>
    </div>

    <div v-if="!result" class="decision-flow">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="question-card">
        <div class="question-number">问题 {{ currentStep + 1 }}/{{ questions.length }}</div>
        <h5 class="question-text">{{ currentQuestion.text }}</h5>

        <div class="options-list">
          <button
            v-for="option in currentQuestion.options"
            :key="option.value"
            class="option-btn"
            @click="selectOption(option)"
          >
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-text">{{ option.text }}</span>
            <span class="option-desc">{{ option.desc }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="result-panel">
      <div class="result-header">
        <span class="result-icon">🎯</span>
        <h5>推荐方案</h5>
      </div>

      <div class="recommendation-cards">
        <div class="rec-card primary">
          <div class="rec-badge">最佳匹配</div>
          <div class="rec-icon">{{ result.primary.icon }}</div>
          <div class="rec-title">{{ result.primary.name }}</div>
          <div class="rec-services">
            <span class="service aws">{{ result.primary.aws }}</span>
            <span class="vs">vs</span>
            <span class="service aliyun">{{ result.primary.aliyun }}</span>
          </div>
          <div class="rec-reason">{{ result.primary.reason }}</div>
        </div>

        <div class="rec-card secondary">
          <div class="rec-badge alt">备选</div>
          <div class="rec-icon">{{ result.secondary.icon }}</div>
          <div class="rec-title">{{ result.secondary.name }}</div>
          <div class="rec-services">
            <span class="service aws">{{ result.secondary.aws }}</span>
            <span class="vs">vs</span>
            <span class="service aliyun">{{ result.secondary.aliyun }}</span>
          </div>
          <div class="rec-reason">{{ result.secondary.reason }}</div>
        </div>
      </div>

      <div class="result-actions">
        <button class="restart-btn" @click="restart">
          <span>↺</span> 重新测试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const answers = ref([])

const questions = [
  {
    text: '您的应用主要面向哪个地区？',
    options: [
      { value: 'global', icon: '🌍', text: '全球用户', desc: '需要覆盖多个国家和地区' },
      { value: 'china', icon: '🇨🇳', text: '中国大陆', desc: '主要服务国内用户' },
      { value: 'asia', icon: '🌏', text: '亚太区域', desc: '覆盖亚洲及太平洋地区' },
      { value: 'us', icon: '🇺🇸', text: '北美/欧洲', desc: '主要服务欧美用户' }
    ]
  },
  {
    text: '您的应用对计算资源的需求如何？',
    options: [
      { value: 'serverless', icon: '⚡', text: '事件驱动/无服务器', desc: '按需运行，流量波动大' },
      { value: 'webapp', icon: '🌐', text: 'Web 应用服务', desc: '需要 24/7 在线运行' },
      { value: 'batch', icon: '📊', text: '批处理/计算任务', desc: '定时或按需批量执行' },
      { value: 'hpc', icon: '🔬', text: '高性能计算', desc: '需要 GPU 或大规模集群' }
    ]
  },
  {
    text: '您对成本优化的优先级是？',
    options: [
      { value: 'lowest', icon: '💰', text: '极致成本优化', desc: '可以接受复杂配置换取最低价' },
      { value: 'balanced', icon: '⚖️', text: '平衡型', desc: '在成本和易用性间找平衡' },
      { value: 'stable', icon: '📈', text: '成本可预测', desc: '偏好固定成本，方便预算' },
      { value: 'premium', icon: '💎', text: '性能优先', desc: '成本次之，追求最佳性能' }
    ]
  },
  {
    text: '您的数据存储需求主要是？',
    options: [
      { value: 'object', icon: '📦', text: '对象存储（文件/图片/视频）', desc: '海量非结构化数据' },
      { value: 'database', icon: '🗄️', text: '数据库存储', desc: '结构化数据和事务处理' },
      { value: 'cache', icon: '⚡', text: '缓存/会话存储', desc: '高性能临时数据存储' },
      { value: 'mixed', icon: '🔀', text: '混合存储', desc: '多种存储类型组合' }
    ]
  }
]

const progress = computed(() => {
  return ((currentStep.value + 1) / questions.length) * 100
})

const currentQuestion = computed(() => {
  return questions[currentStep.value]
})

const selectOption = (option) => {
  answers.value.push(option.value)
  if (currentStep.value < questions.length - 1) {
    currentStep.value++
  }
}

const result = computed(() => {
  if (answers.value.length < 4) return null

  const [region, compute, cost, storage] = answers.value

  // 计算推荐
  let primary, secondary

  if (compute === 'serverless') {
    primary = {
      icon: '⚡',
      name: '无服务器架构',
      aws: 'AWS Lambda + API Gateway',
      aliyun: '函数计算 + API 网关',
      reason: '事件驱动场景下，按调用计费，无需预置服务器资源'
    }
    secondary = {
      icon: '🔲',
      name: '容器服务',
      aws: 'AWS Fargate',
      aliyun: 'Serverless Kubernetes',
      reason: '需要长时间运行但需要灵活扩缩容的场景'
    }
  } else if (compute === 'hpc') {
    primary = {
      icon: '🔬',
      name: '高性能计算集群',
      aws: 'AWS ParallelCluster',
      aliyun: 'E-HPC + 超级计算集群',
      reason: 'GPU 实例和高速互联网络，满足科学计算和 AI 训练需求'
    }
    secondary = {
      icon: '⚡',
      name: '弹性裸金属',
      aws: 'EC2 Bare Metal',
      aliyun: '弹性裸金属服务器',
      reason: '需要物理机性能但希望云化管理的场景'
    }
  } else if (cost === 'lowest') {
    primary = {
      icon: '💰',
      name: '抢占式实例',
      aws: 'EC2 Spot Instances',
      aliyun: '抢占式实例',
      reason: '价格最低至按需实例的 10%，适合容错性高的批处理任务'
    }
    secondary = {
      icon: '📅',
      name: '预留实例',
      aws: 'Reserved Instances',
      aliyun: '包年包月',
      reason: '长期稳定负载选择预留实例，可节省 30-60% 成本'
    }
  } else {
    primary = {
      icon: '☁️',
      name: '云服务器 ECS',
      aws: 'Amazon EC2',
      aliyun: 'ECS 云服务器',
      reason: '最通用的计算服务，支持多种计费模式和实例规格，生态完善'
    }
    secondary = {
      icon: '📦',
      name: '容器实例',
      aws: 'AWS Fargate',
      aliyun: 'ECI 容器实例',
      reason: '无需管理服务器，直接运行容器，适合微服务架构'
    }
  }

  return { primary, secondary }
})

const restart = () => {
  currentStep.value = 0
  answers.value = []
}
</script>

<style scoped>
/* Add styles here */
</style>
