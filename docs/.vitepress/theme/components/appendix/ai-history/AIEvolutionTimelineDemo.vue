<template>
  <div class="ai-evolution-timeline-demo">
    <div class="timeline-container">
      <div class="timeline-track"></div>

      <div
        v-for="(era, index) in eras"
        :key="index"
        class="timeline-era"
        :class="{ active: activeEra === index }"
        @click="activeEra = index"
      >
        <div class="era-marker">
          <div class="marker-dot"></div>
          <div class="marker-line"></div>
        </div>
        <div class="era-content">
          <div class="era-year">{{ era.year }}</div>
          <div class="era-title">{{ era.title }}</div>
          <div class="era-desc">{{ era.desc }}</div>
          <div class="era-examples">
            <span
              v-for="(example, i) in era.examples"
              :key="i"
              class="example-tag"
            >
              {{ example }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Era Details Panel -->
    <transition name="fade">
      <div v-if="activeEra !== null" class="era-details">
        <div class="details-header">
          <h4>{{ eras[activeEra].title }}</h4>
          <span class="year-badge">{{ eras[activeEra].year }}</span>
        </div>
        <div class="details-content">
          <p>{{ eras[activeEra].fullDesc }}</p>
          <div class="key-points">
            <h5>核心特点：</h5>
            <ul>
              <li v-for="(point, i) in eras[activeEra].keyPoints" :key="i">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeEra = ref(0)

const eras = ref([
  {
    year: '20世纪50-80年代',
    title: '符号主义时代',
    desc: '规则与逻辑推理',
    fullDesc: '早期人工智能研究认为，智能可以通过符号和逻辑规则来表达。科学家们尝试编写大量规则来让机器模拟人类专家的决策过程。',
    examples: ['专家系统', '深蓝', 'MYCIN'],
    keyPoints: [
      '人工编写 If-Then 规则',
      '逻辑推理能力强大',
      '可解释性强',
      '无法处理复杂现实世界',
      '容易遇到组合爆炸问题'
    ]
  },
  {
    year: '21世纪10年代',
    title: '连接主义时代',
    desc: '神经网络与深度学习',
    fullDesc: '随着大数据和 GPU 算力的突破，深度学习迎来了春天。神经网络通过多层结构自动学习特征，在图像识别、语音识别等领域取得巨大成功。',
    examples: ['AlexNet', 'AlphaGo', '人脸识别'],
    keyPoints: [
      '模仿人脑神经元结构',
      '从数据中自动学习',
      '强大的模式识别能力',
      '需要海量标注数据',
      '黑盒模型，缺乏可解释性'
    ]
  },
  {
    year: '21世纪20年代至今',
    title: '生成式人工智能时代',
    desc: '大模型与创造力',
    fullDesc: 'Transformer 架构的诞生让机器理解了上下文关系。GPT 等大语言模型不仅能生成文本、图像，还展现出了惊人的推理和创造能力。',
    examples: ['ChatGPT', 'Midjourney', 'GPT-4'],
    keyPoints: [
      '基于注意力机制',
      '理解上下文和语义',
      '能生成新内容',
      '通用智能雏形',
      '存在幻觉和偏见问题'
    ]
  }
])
</script>

<style scoped>
.ai-evolution-timeline-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
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

.timeline-era {
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-era:hover {
  opacity: 0.9;
}

.timeline-era.active .era-marker .marker-dot {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.era-marker {
  position: relative;
  width: 44px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.marker-line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-divider);
  margin-top: 4px;
}

.timeline-era:last-child .marker-line {
  display: none;
}

.era-content {
  margin-left: 1rem;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  flex: 1;
}

.timeline-era.active .era-content {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.era-year {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.era-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.era-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.era-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.era-details {
  margin-top: 1.5rem;
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
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.details-header h4 {
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
  font-size: 0.875rem;
}

.details-content p {
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}

.key-points {
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
  border: 1px solid var(--vp-c-divider);
}

.key-points h5 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.key-points ul {
  margin: 0;
  padding-left: 1.25rem;
}

.key-points li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
