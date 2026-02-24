<template>
  <div class="principle-demo">
    <div class="header">
      <div class="title">AI 原生设计原则</div>
      <div class="subtitle">点击卡片，深入了解每条设计原则</div>
    </div>

    <div class="principle-grid">
      <div
        v-for="p in principles"
        :key="p.id"
        :class="['principle-card', { active: selected === p.id }]"
        @click="selected = p.id"
      >
        <div class="p-icon">{{ p.icon }}</div>
        <div class="p-name">{{ p.name }}</div>
        <div class="p-brief">{{ p.brief }}</div>
      </div>
    </div>

    <div v-if="selected" class="detail-panel">
      <div class="detail-header">
        <span>{{ currentPrinciple.icon }} {{ currentPrinciple.name }}</span>
      </div>

      <div class="detail-body">
        <div class="detail-desc">{{ currentPrinciple.detail }}</div>

        <div class="example-section">
          <div class="example-title">实践对比</div>
          <div class="compare-grid">
            <div class="compare-bad">
              <div class="compare-label bad-label">❌ 反面示例</div>
              <div class="compare-text">{{ currentPrinciple.bad }}</div>
            </div>
            <div class="compare-good">
              <div class="compare-label good-label">✅ 正确做法</div>
              <div class="compare-text">{{ currentPrinciple.good }}</div>
            </div>
          </div>
        </div>

        <div class="checklist">
          <div class="checklist-title">检查清单</div>
          <div
            v-for="(item, idx) in currentPrinciple.checklist"
            :key="idx"
            :class="['check-item', { checked: checkedItems[selected]?.[idx] }]"
            @click="toggleCheck(idx)"
          >
            <span class="check-box">
              {{ checkedItems[selected]?.[idx] ? '☑' : '☐' }}
            </span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const principles = [
  {
    id: 'graceful',
    icon: '🛡️',
    name: '优雅降级',
    brief: 'AI 失败时，系统仍然可用',
    detail: 'AI 模型可能超时、返回错误、产生幻觉。优雅降级意味着：当 AI 不可用时，系统应该有兜底方案，而不是直接崩溃。这是 AI 原生应用与玩具项目的分水岭。',
    bad: '模型 API 超时后，页面显示空白错误页，用户只能刷新重试。',
    good: '模型超时后，显示缓存的上一次回答或推荐相关文档，同时后台自动重试。',
    checklist: [
      '设置合理的 API 超时时间（通常 30-60s）',
      '准备降级方案：缓存、规则引擎、人工转接',
      '向用户透明地展示当前状态',
      '记录失败日志用于后续优化'
    ]
  },
  {
    id: 'human',
    icon: '🤝',
    name: '人机协作',
    brief: '关键决策由人类确认',
    detail: 'AI 擅长生成和建议，但不应该在高风险场景中自主决策。人机协作（Human-in-the-Loop）模式让 AI 负责草稿和推荐，人类负责审核和确认。',
    bad: 'AI 自动发送邮件给客户，内容未经人工审核，导致错误信息传播。',
    good: 'AI 生成邮件草稿并高亮不确定的部分，用户审核修改后手动发送。',
    checklist: [
      '识别哪些操作是"高风险"的（发送、删除、支付）',
      '高风险操作前必须有人工确认步骤',
      'AI 输出标注置信度，低置信内容需人工复核',
      '提供便捷的编辑和修改界面'
    ]
  },
  {
    id: 'transparent',
    icon: '🔍',
    name: '透明可解释',
    brief: '让用户理解 AI 的推理过程',
    detail: 'AI 不是黑盒魔法。用户需要知道 AI 为什么给出这个回答、依据了哪些信息、有多大把握。透明性建立信任，也帮助用户判断何时该相信 AI、何时该质疑。',
    bad: 'AI 直接给出一个结论，没有任何解释或来源引用，用户无法判断可靠性。',
    good: '回答附带推理过程、引用来源链接、置信度指示，用户可以追溯验证。',
    checklist: [
      '展示 AI 的推理链路或思考过程',
      '标注信息来源和引用',
      '显示置信度或不确定性指标',
      '提供"为什么这样回答"的解释入口'
    ]
  },
  {
    id: 'feedback',
    icon: '🔄',
    name: '反馈闭环',
    brief: '用户反馈驱动持续改进',
    detail: '每一次用户交互都是改进的机会。通过收集用户对 AI 输出的评价（点赞/点踩、修改记录、追问模式），持续优化 Prompt、微调模型、改进检索策略。',
    bad: 'AI 回答错误后，没有任何反馈渠道，同样的错误会反复出现。',
    good: '用户可以标记错误回答，系统自动收集并用于优化 Prompt 和检索策略。',
    checklist: [
      '提供简单的反馈机制（👍👎 按钮）',
      '记录用户的修改和追问作为隐式反馈',
      '定期分析反馈数据，优化 Prompt 模板',
      '建立 A/B 测试机制验证改进效果'
    ]
  }
]

const selected = ref('graceful')
const checkedItems = reactive({})

const currentPrinciple = computed(() =>
  principles.find(p => p.id === selected.value) || principles[0]
)

const toggleCheck = (idx) => {
  if (!checkedItems[selected.value]) {
    checkedItems[selected.value] = {}
  }
  checkedItems[selected.value][idx] = !checkedItems[selected.value][idx]
}
</script>

<style scoped>
.principle-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 20px; margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #ef4444, #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 16px;
}
.principle-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 14px; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.principle-card:hover { background: var(--vp-c-bg-alt); }
.principle-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.p-icon { font-size: 24px; margin-bottom: 6px; }
.p-name { font-weight: 600; font-size: 13px; }
.p-brief { font-size: 11px; color: var(--vp-c-text-2); margin-top: 4px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; overflow: hidden;
}
.detail-header {
  padding: 14px 16px; font-weight: 700; font-size: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.detail-body { padding: 16px; }
.detail-desc {
  color: var(--vp-c-text-2); font-size: 13px;
  line-height: 1.7; margin-bottom: 16px;
}

.example-section { margin-bottom: 16px; }
.example-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.compare-bad, .compare-good {
  padding: 12px; border-radius: 8px; font-size: 13px; line-height: 1.6;
}
.compare-bad { background: #fef2f2; border: 1px solid #fecaca; }
.compare-good { background: #f0fdf4; border: 1px solid #bbf7d0; }
.compare-label {
  font-weight: 600; font-size: 11px; margin-bottom: 6px;
}
.bad-label { color: #dc2626; }
.good-label { color: #16a34a; }
.compare-text { color: var(--vp-c-text-1); }

.checklist-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.check-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px; font-size: 13px;
  cursor: pointer; transition: background 0.2s;
  border: 1px solid transparent;
}
.check-item:hover { background: var(--vp-c-bg-soft); }
.check-item.checked {
  background: #f0fdf4; border-color: #bbf7d0;
  text-decoration: line-through; color: var(--vp-c-text-3);
}
.check-box { font-size: 16px; flex-shrink: 0; }
</style>
