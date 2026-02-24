<!--
  RAGvsFineTuningDemo.vue
  RAG vs 微调对比演示

  用途：
  并排对比 RAG 和微调两种方案的优劣势，
  帮助用户理解何时选择哪种方案。

  交互功能：
  - 切换不同维度的对比
  - 场景选择器：根据需求推荐方案
-->
<template>
  <div class="rag-vs-ft-demo">
    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: view === 'compare' }]"
        @click="view = 'compare'"
      >
        维度对比
      </button>
      <button
        :class="['toggle-btn', { active: view === 'scenario' }]"
        @click="view = 'scenario'"
      >
        场景推荐
      </button>
    </div>

    <div
      v-if="view === 'compare'"
      class="compare-view"
    >
      <div class="compare-header">
        <div class="col-label rag-label">RAG 检索增强生成</div>
        <div class="col-label vs-label">VS</div>
        <div class="col-label ft-label">Fine-tuning 微调</div>
      </div>

      <div
        v-for="(dim, i) in dimensions"
        :key="i"
        class="compare-row"
      >
        <div class="dim-name">{{ dim.name }}</div>
        <div class="dim-content">
          <div class="rag-side">
            <div class="score-bar">
              <div
                class="score-fill rag-fill"
                :style="{ width: dim.ragScore + '%' }"
              />
            </div>
            <div class="side-text">{{ dim.ragText }}</div>
          </div>
          <div class="dim-icon">{{ dim.icon }}</div>
          <div class="ft-side">
            <div class="score-bar">
              <div
                class="score-fill ft-fill"
                :style="{ width: dim.ftScore + '%' }"
              />
            </div>
            <div class="side-text">{{ dim.ftText }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="view === 'scenario'"
      class="scenario-view"
    >
      <div class="scenario-question">你的需求是什么？</div>
      <div class="scenario-grid">
        <div
          v-for="(s, i) in scenarios"
          :key="i"
          :class="['scenario-card', { selected: selectedScenario === i }]"
          @click="selectedScenario = i"
        >
          <div class="scenario-icon">{{ s.icon }}</div>
          <div class="scenario-name">{{ s.name }}</div>
          <div class="scenario-desc">{{ s.desc }}</div>
          <div :class="['recommendation', s.recommend]">
            {{ s.recommend === 'rag' ? '推荐 RAG' : s.recommend === 'ft' ? '推荐微调' : '两者结合' }}
          </div>
        </div>
      </div>

      <div
        v-if="selectedScenario !== null"
        class="scenario-detail"
      >
        <div class="detail-title">{{ scenarios[selectedScenario].name }} — 详细分析</div>
        <div class="detail-reason">{{ scenarios[selectedScenario].reason }}</div>
      </div>
    </div>

    <div class="summary-box">
      <div class="summary-title">一句话总结</div>
      <div class="summary-text">
        RAG 像是给模型配了一个<strong>实时更新的参考书库</strong>，适合知识频繁变化的场景；
        微调像是让模型<strong>上了一门专业课</strong>，适合需要特定风格或领域深度的场景。
        实际项目中，两者常常结合使用。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('compare')
const selectedScenario = ref(null)

const dimensions = [
  {
    name: '知识更新速度',
    icon: '⚡',
    ragScore: 95,
    ragText: '实时更新，修改文档即生效',
    ftScore: 25,
    ftText: '需要重新训练，周期长'
  },
  {
    name: '实施成本',
    icon: '💰',
    ragScore: 80,
    ragText: '搭建检索系统，成本适中',
    ftScore: 35,
    ftText: '需要 GPU 资源和标注数据'
  },
  {
    name: '回答风格控制',
    icon: '🎨',
    ragScore: 40,
    ragText: '依赖 Prompt 工程',
    ftScore: 90,
    ftText: '可深度定制输出风格'
  },
  {
    name: '幻觉控制',
    icon: '🎯',
    ragScore: 85,
    ragText: '有据可查，可追溯来源',
    ftScore: 50,
    ftText: '仍可能产生幻觉'
  },
  {
    name: '推理延迟',
    icon: '⏱️',
    ragScore: 55,
    ragText: '需要额外的检索步骤',
    ftScore: 85,
    ftText: '直接生成，无额外开销'
  },
  {
    name: '私有数据安全',
    icon: '🔒',
    ragScore: 90,
    ragText: '数据留在本地，不进入模型',
    ftScore: 45,
    ftText: '数据融入模型权重'
  }
]

const scenarios = [
  {
    icon: '📚',
    name: '企业知识库问答',
    desc: '内部文档、政策、FAQ 等频繁更新的知识',
    recommend: 'rag',
    reason: '企业知识库的内容更新频繁，使用 RAG 可以在文档更新后立即生效，无需重新训练。同时数据留在本地，满足企业数据安全要求。'
  },
  {
    icon: '🏥',
    name: '医疗报告生成',
    desc: '需要严格遵循特定格式和术语的专业文档',
    recommend: 'ft',
    reason: '医疗报告有严格的格式要求和专业术语规范，微调可以让模型深度学习这些模式，生成更符合行业标准的内容。'
  },
  {
    icon: '💬',
    name: '客服对话系统',
    desc: '需要准确回答产品问题，同时保持品牌语调',
    recommend: 'both',
    reason: '客服系统需要 RAG 来检索最新的产品信息和解决方案，同时需要微调来保持一致的品牌语调和对话风格。两者结合效果最佳。'
  },
  {
    icon: '📰',
    name: '实时新闻摘要',
    desc: '需要基于最新信息生成摘要',
    recommend: 'rag',
    reason: '新闻内容实时变化，RAG 可以检索最新的新闻源并生成摘要，而微调无法跟上信息更新的速度。'
  },
  {
    icon: '✍️',
    name: '特定风格写作',
    desc: '模仿特定作者或品牌的写作风格',
    recommend: 'ft',
    reason: '写作风格是一种内化的模式，通过微调让模型学习大量风格样本，能更自然地模仿目标风格，RAG 难以实现这种深层次的风格迁移。'
  },
  {
    icon: '🔬',
    name: '科研文献助手',
    desc: '基于海量论文回答学术问题',
    recommend: 'rag',
    reason: '科研文献数量庞大且持续增长，RAG 可以动态检索相关论文片段，并提供引用来源，便于研究者验证和追溯。'
  }
]
</script>

<style scoped>
.rag-vs-ft-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.toggle-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.toggle-btn {
  padding: 8px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.toggle-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.compare-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}
.col-label {
  font-weight: 600;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 6px;
}
.rag-label {
  background: #dbeafe;
  color: #2563eb;
}
.vs-label {
  color: var(--vp-c-text-3);
  font-size: 16px;
}
.ft-label {
  background: #fce7f3;
  color: #db2777;
}
.compare-row {
  margin-bottom: 14px;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.dim-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  text-align: center;
}
.dim-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rag-side,
.ft-side {
  flex: 1;
}
.dim-icon {
  font-size: 20px;
  flex-shrink: 0;
}
.score-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  margin-bottom: 4px;
  overflow: hidden;
}
.score-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}
.rag-fill {
  background: #3b82f6;
}
.ft-fill {
  background: #ec4899;
}
.side-text {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.scenario-question {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
}
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}
.scenario-card {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.scenario-card.selected {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.15);
}
.scenario-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.scenario-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
}
.scenario-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  line-height: 1.4;
}
.recommendation {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.recommendation.rag {
  background: #dbeafe;
  color: #2563eb;
}
.recommendation.ft {
  background: #fce7f3;
  color: #db2777;
}
.recommendation.both {
  background: #f0fdf4;
  color: #16a34a;
}
.scenario-detail {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.detail-reason {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.summary-box {
  margin-top: 16px;
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
}
.summary-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.summary-text {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
