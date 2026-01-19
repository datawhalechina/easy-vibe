<template>
  <div class="gpt-evolution-demo">
    <div class="demo-header">
      <h4>🚀 GPT 进化历程</h4>
      <p>从 GPT-1 到 GPT-4 的演进之路</p>
    </div>

    <div class="timeline-container">
      <div class="timeline-track"></div>

      <div
        v-for="(model, index) in gptModels"
        :key="index"
        class="timeline-item"
        :class="{ active: activeModel === index }"
        @click="selectModel(index)"
      >
        <div class="timeline-marker">
          <div class="marker-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="model-year">{{ model.year }}</div>
          <div class="model-name">{{ model.name }}</div>
          <div class="model-stats">
            <span class="stat">📊 {{ model.parameters }}</span>
            <span class="stat">🎯 {{ model.context }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="activeModel !== null" class="model-details">
        <div class="details-header">
          <h5>{{ gptModels[activeModel].name }}</h5>
          <span class="year-badge">{{ gptModels[activeModel].year }}</span>
        </div>

        <div class="details-grid">
          <div class="detail-card">
            <div class="card-label">参数量</div>
            <div class="card-value">{{ gptModels[activeModel].parameters }}</div>
            <div class="card-note">{{ gptModels[activeModel].paramDetail }}</div>
          </div>

          <div class="detail-card">
            <div class="card-label">上下文窗口</div>
            <div class="card-value">{{ gptModels[activeModel].context }}</div>
            <div class="card-note">{{ gptModels[activeModel].contextDetail }}</div>
          </div>

          <div class="detail-card">
            <div class="card-label">主要能力</div>
            <div class="card-value">{{ gptModels[activeModel].capability }}</div>
          </div>
        </div>

        <div class="model-description">
          <h6>📝 模型简介</h6>
          <p>{{ gptModels[activeModel].description }}</p>
        </div>

        <div class="model-milestones">
          <h6>🎯 关键里程碑</h6>
          <ul>
            <li v-for="(milestone, i) in gptModels[activeModel].milestones" :key="i">
              {{ milestone }}
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <div class="evolution-insight">
      <h5>💡 进化趋势</h5>
      <div class="trend-grid">
        <div class="trend-item">
          <div class="trend-icon">📈</div>
          <div class="trend-text">参数量从 1.17 亿增长到万亿级别</div>
        </div>
        <div class="trend-item">
          <div class="trend-icon">🧠</div>
          <div class="trend-text">从文本生成到多模态（图像、音频、视频）</div>
        </div>
        <div class="trend-item">
          <div class="trend-icon">🎯</div>
          <div class="trend-text">上下文窗口从 512 tokens 扩展到 128k+</div>
        </div>
        <div class="trend-item">
          <div class="trend-icon">🌐</div>
          <div class="trend-text">从单语言到多语言，从通用到专业领域</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeModel = ref(0)

const gptModels = ref([
  {
    name: 'GPT-1',
    year: '2018',
    parameters: '1.17 亿',
    paramDetail: '117M',
    context: '512 tokens',
    contextDetail: '约 384 英文单词',
    capability: '文本生成',
    description: 'OpenAI 发布的首个 GPT 模型，证明了生成式预训练的可行性。它采用"预训练 + 微调"范式，在无标注文本上学习语言模式。',
    milestones: [
      '首次验证 Transformer 架构在语言模型中的有效性',
      '引入生成式预训练方法',
      '为后续 GPT 系列奠定基础'
    ]
  },
  {
    name: 'GPT-2',
    year: '2019',
    parameters: '15 亿',
    paramDetail: '1.5B',
    context: '1024 tokens',
    contextDetail: '约 768 英文单词',
    capability: '高质量文本生成',
    description: 'GPT-2 的规模扩大了 13 倍，能够生成连贯、高质量的文本。由于担心滥用，OpenAI 最初只发布了缩小版本，引发广泛争议。',
    milestones: [
      '参数量突破 10 亿级别',
      '展现出惊人的零样本学习能力',
      "引发 AI 安全和滥用的讨论",
      '最终完整版本于 2019 年 11 月发布'
    ]
  },
  {
    name: 'GPT-3',
    year: '2020',
    parameters: '1750 亿',
    paramDetail: '175B',
    context: '2048 tokens',
    contextDetail: '约 1536 英文单词',
    capability: '少样本学习',
    description: 'GPT-3 是当时规模最大的语言模型，展现出强大的少样本和零样本学习能力。它证明了"规模就是一切"的假设，只需通过提示词就能完成各种任务。',
    milestones: [
      '参数量达到 1750 亿，比 GPT-2 增长 116 倍',
      '少样本学习能力震惊学术界',
      '催生了大量基于 API 的应用',
      'OpenAI 开始提供商业 API 服务'
    ]
  },
  {
    name: 'GPT-3.5',
    year: '2022',
    parameters: '未知',
    paramDetail: '估计 2000 亿+',
    context: '4096 tokens',
    contextDetail: '约 3072 英文单词',
    capability: '对话系统',
    description: 'GPT-3.5 在 GPT-3 基础上引入了对话训练和强化学习（RLHF），成为 ChatGPT 的基础模型。它能够进行自然、连贯的多轮对话，是 AI 历史上的重要里程碑。',
    milestones: [
      '引入人类反馈强化学习（RLHF）',
      'ChatGPT 发布，5 天用户破百万',
      '2 个月月活破亿，创历史记录',
      '掀起全球 AI 热潮'
    ]
  },
  {
    name: 'GPT-4',
    year: '2023',
    parameters: '未知',
    paramDetail: '估计 1.8 万亿',
    context: '8192-32768 tokens',
    contextDetail: '最多 50 页文档',
    capability: '多模态智能',
    description: 'GPT-4 是一个多模态大模型，能够处理文本、图像等多种输入。它在各项基准测试中接近人类水平，并在复杂推理、数学、编程等任务上表现出色。',
    milestones: [
      '首个大规模多模态模型',
      '在律师考试、奥数等高难度测试中表现出色',
      '支持更长上下文（最多 32k tokens）',
      '推出 GPT-4 Turbo，速度更快、价格更低'
    ]
  }
])

const selectModel = (index) => {
  activeModel.value = index
}
</script>

<style scoped>
.gpt-evolution-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.timeline-container {
  position: relative;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.timeline-track {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  opacity: 0.9;
}

.timeline-item.active .marker-dot {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.timeline-marker {
  width: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: var(--vp-c-bg);
  border-radius: 50%;
  border: 3px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.timeline-content {
  margin-left: 1rem;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  flex: 1;
}

.timeline-item.active .timeline-content {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.model-year {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.model-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.model-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.model-details {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.details-header h5 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.year-badge {
  padding: 0.5rem 1rem;
  background: rgba(var(--vp-c-brand-rgb), 0.12);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.2);
  color: var(--vp-c-brand);
  border-radius: 20px;
  font-weight: 600;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.card-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.card-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.card-note {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.model-description,
.model-milestones {
  margin-bottom: 1rem;
}

.model-description h6,
.model-milestones h6 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.model-description p {
  margin: 0;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.model-milestones ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.model-milestones li {
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  position: relative;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.model-milestones li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-green-1, #22c55e);
  font-weight: 700;
}

.evolution-insight {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.evolution-insight h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.trend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.trend-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.trend-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.trend-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
  .trend-grid {
    grid-template-columns: 1fr;
  }
}
</style>
