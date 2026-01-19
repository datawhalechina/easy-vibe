<template>
  <div class="ai-evolution-demo">
    <div class="header">
      <div class="title">AI 进化：规则 → 学习 → 生成</div>
      <div class="subtitle">
        点击切换阶段；不自动推进，避免“点一下就连续发生很多事”的误解。
      </div>
    </div>

    <div class="tabs" role="tablist" aria-label="AI Evolution Stages">
      <button
        v-for="(stage, index) in stages"
        :key="stage.key"
        class="tab"
        :class="{ active: currentStage === index }"
        role="tab"
        :aria-selected="currentStage === index"
        @click="currentStage = index"
      >
        <div class="tab-year">{{ stage.year }}</div>
        <div class="tab-label">{{ stage.label }}</div>
      </button>
    </div>

    <div class="stage">
      <div class="stage-head">
        <div class="stage-title">{{ stages[currentStage].title }}</div>
        <div class="stage-desc">{{ stages[currentStage].desc }}</div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title">核心思想</div>
          <ul class="list">
            <li v-for="(item, i) in stages[currentStage].core" :key="i">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="card">
          <div class="card-title">代表应用</div>
          <div class="pill-row">
            <span
              v-for="(tag, i) in stages[currentStage].examples"
              :key="i"
              class="pill"
              >{{ tag }}</span
            >
          </div>
          <div class="note">{{ stages[currentStage].appDesc }}</div>
        </div>

        <div class="card full">
          <div class="card-title">优势 / 局限</div>
          <div class="two-col">
            <div class="col">
              <div class="col-title">优势</div>
              <ul class="list">
                <li v-for="(item, i) in stages[currentStage].pros" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="col">
              <div class="col-title">局限</div>
              <ul class="list">
                <li v-for="(item, i) in stages[currentStage].cons" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    key: 'symbolic',
    year: '1950s–1980s',
    label: '符号主义',
    title: '规则与逻辑推理（专家系统）',
    desc: '相信“智能 = 规则 + 推理”。把专家经验写成 If/Then 规则与知识库。',
    core: [
      '知识用“符号/规则”表达：If 条件 Then 结论',
      '推理引擎按规则匹配、触发、推导',
      '可解释：能指出用了哪条规则'
    ],
    pros: ['可解释性强', '在边界明确的垂直领域有效'],
    cons: [
      '规则写不完（组合爆炸）',
      '脆弱：世界稍变就失效',
      '难处理不确定性与常识'
    ],
    examples: ['专家系统', 'MYCIN', '逻辑推理'],
    appDesc:
      '适合“规则明确”的任务（如部分诊断流程、合规校验），但遇到现实世界的灰度与噪声会迅速失效。'
  },
  {
    key: 'dl',
    year: '2010s',
    label: '深度学习',
    title: '从数据中学习（连接主义）',
    desc: '相信“智能 = 表示学习 + 统计优化”。用神经网络从大量数据里自动学特征与决策边界。',
    core: [
      '用参数（权重）表示知识；通过优化让参数拟合数据',
      '特征提取从“手写规则”变成“自动学习”',
      '数据、算力、算法（GPU + 大数据 + 网络结构）共同推动'
    ],
    pros: ['强大的模式识别能力', '同一范式覆盖多任务（视觉/语音/推荐等）'],
    cons: ['数据需求大', '可解释性较弱', '对分布外/对抗样本敏感'],
    examples: ['AlexNet', 'ImageNet', 'AlphaGo'],
    appDesc:
      '擅长“感知类”任务（图像、语音、推荐）；但对“为何这么判”解释不够直观，且对数据分布较敏感。'
  },
  {
    key: 'genai',
    year: '2020s+',
    label: '生成式 AI',
    title: '从“分类”到“生成”（大模型）',
    desc: '用 Transformer 建模上下文关系，学习“下一 token”分布，从而能生成文本/代码/图像等新内容。',
    core: [
      '统一接口：给提示词（prompt）→ 生成输出',
      '能力来源：规模化预训练 + 指令微调/对齐',
      '把很多任务“变成一个生成问题”'
    ],
    pros: ['通用性强（多任务）', '交互友好（自然语言接口）'],
    cons: [
      '可能幻觉',
      '安全与权限边界复杂',
      '需要系统化评测与约束（格式/工具/检索）'
    ],
    examples: ['ChatGPT', 'GPT-4', 'Midjourney'],
    appDesc:
      '更像“通用助手”：能写、能改、能解释、能生成；但要通过提示词、上下文与工具链把它约束到可验收、可控。'
  }
]
</script>

<style scoped>
.ai-evolution-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: var(--vp-c-text-1);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 0.75rem 0 1rem;
}

.tab {
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.tab:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.55);
}

.tab.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tab-year {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.tab-label {
  margin-top: 0.15rem;
  font-weight: 800;
}

.stage-head {
  margin-bottom: 0.75rem;
}

.stage-title {
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.stage-desc {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 720px) {
  .tabs {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
}

.card.full {
  grid-column: 1 / -1;
}

.card-title {
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.list {
  margin: 0;
  padding-left: 1.15rem;
  color: var(--vp-c-text-1);
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.pill {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.note {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 720px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}

.col-title {
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}
</style>
