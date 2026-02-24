<template>
  <div class="prompt-demo">
    <div class="header">
      <div class="title">Prompt 工程实验室</div>
      <div class="subtitle">修改 Prompt 结构，观察输出质量的变化</div>
    </div>

    <div class="template-tabs">
      <button
        v-for="t in templates"
        :key="t.id"
        :class="['tab-btn', { active: currentTemplate === t.id }]"
        @click="selectTemplate(t.id)"
      >
        <span>{{ t.icon }}</span>
        <span>{{ t.name }}</span>
      </button>
    </div>

    <div class="editor-grid">
      <div class="editor-panel">
        <div class="panel-label">System Prompt（系统指令）</div>
        <textarea
          v-model="systemPrompt"
          class="prompt-input"
          rows="3"
          placeholder="设定 AI 的角色和行为规则..."
        />

        <div class="panel-label">User Prompt（用户输入）</div>
        <textarea
          v-model="userPrompt"
          class="prompt-input"
          rows="3"
          placeholder="用户的具体问题或指令..."
        />

        <button class="run-btn" @click="runPrompt">
          ▶ 模拟生成
        </button>
      </div>

      <div class="output-panel">
        <div class="panel-label">模拟输出</div>
        <div class="output-box">
          <div v-if="isGenerating" class="generating">
            <span class="dot-anim">●●●</span> 生成中...
          </div>
          <div v-else-if="output" class="output-text">
            {{ output }}
          </div>
          <div v-else class="output-placeholder">
            点击"模拟生成"查看效果
          </div>
        </div>

        <div v-if="output" class="quality-bar">
          <div class="quality-label">输出质量评估</div>
          <div class="quality-metrics">
            <div
              v-for="m in currentQuality"
              :key="m.name"
              class="metric"
            >
              <div class="metric-name">{{ m.name }}</div>
              <div class="meter">
                <div
                  class="meter-fill"
                  :style="{ width: m.score + '%', background: m.color }"
                />
              </div>
              <div class="metric-score">{{ m.score }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips-bar">
      <span class="tips-label">💡 Prompt 技巧：</span>
      <span class="tips-text">{{ currentTip }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const templates = [
  { id: 'bad', icon: '❌', name: '模糊提问' },
  { id: 'basic', icon: '📝', name: '基础结构' },
  { id: 'good', icon: '✅', name: '最佳实践' }
]

const currentTemplate = ref('bad')
const systemPrompt = ref('')
const userPrompt = ref('')
const output = ref('')
const isGenerating = ref(false)

const templateData = {
  bad: {
    system: '',
    user: '帮我写个介绍',
    output: '好的，这是一个介绍：\n\n大家好，我是一个人，我喜欢很多东西。我觉得生活很有趣。谢谢大家。\n\n（输出模糊、缺乏方向、没有实际价值）',
    quality: [
      { name: '相关性', score: 20, color: '#ef4444' },
      { name: '具体性', score: 10, color: '#ef4444' },
      { name: '可用性', score: 15, color: '#ef4444' }
    ],
    tip: '没有 System Prompt，没有上下文，问题过于模糊 —— AI 只能猜测你的意图。'
  },
  basic: {
    system: '你是一个技术文档写手。',
    user: '帮我写一段关于 React 的介绍，大约100字。',
    output: 'React 是由 Meta（原 Facebook）开发的开源 JavaScript 库，用于构建用户界面。它采用组件化开发模式和虚拟 DOM 技术，能够高效地更新和渲染页面。React 的声明式编程风格让开发者可以更直观地描述 UI 状态，广泛应用于现代 Web 开发中。',
    quality: [
      { name: '相关性', score: 70, color: '#f59e0b' },
      { name: '具体性', score: 65, color: '#f59e0b' },
      { name: '可用性', score: 60, color: '#f59e0b' }
    ],
    tip: '有了角色设定和基本约束（字数），输出质量明显提升，但仍缺少格式和受众定义。'
  },
  good: {
    system: '你是一位资深前端技术博主。写作风格：简洁专业，善用类比。目标读者：编程初学者。输出格式：先用一句话总结，再展开说明，最后给出一个生活类比。',
    user: '请介绍 React 是什么，以及为什么它如此流行。控制在150字以内。',
    output: '一句话总结：React 是一个帮你高效搭建网页界面的 JavaScript 工具库。\n\n展开说明：React 由 Meta 团队开发，核心理念是"组件化"——把复杂页面拆成独立的小积木，每个积木管理自己的状态和外观。它的虚拟 DOM 机制能智能计算最小更新范围，避免不必要的页面重绘。\n\n生活类比：如果网页是一面乐高墙，React 就是那套标准化的乐高积木系统——你可以独立替换任何一块，而不用推倒重来。',
    quality: [
      { name: '相关性', score: 95, color: '#10b981' },
      { name: '具体性', score: 90, color: '#10b981' },
      { name: '可用性', score: 95, color: '#10b981' }
    ],
    tip: '角色 + 风格 + 受众 + 格式 + 约束 = 高质量输出。好的 Prompt 就是好的需求文档。'
  }
}

const currentQuality = ref([])
const currentTip = computed(() => templateData[currentTemplate.value].tip)

const selectTemplate = (id) => {
  currentTemplate.value = id
  const data = templateData[id]
  systemPrompt.value = data.system
  userPrompt.value = data.user
  output.value = ''
  currentQuality.value = []
}

const runPrompt = async () => {
  isGenerating.value = true
  output.value = ''
  currentQuality.value = []
  await new Promise(r => setTimeout(r, 1200))
  const data = templateData[currentTemplate.value]
  output.value = data.output
  currentQuality.value = data.quality
  isGenerating.value = false
}

// Initialize
selectTemplate('bad')
</script>

<style scoped>
.prompt-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, #8b5cf6, var(--vp-c-brand));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.template-tabs {
  display: flex; gap: 8px; justify-content: center;
  margin-bottom: 16px; flex-wrap: wrap;
}
.tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.tab-btn:hover { background: var(--vp-c-bg-alt); }
.tab-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.editor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
.editor-panel, .output-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 14px;
}
.panel-label {
  font-weight: 600; font-size: 12px; margin-bottom: 6px;
  color: var(--vp-c-text-2);
}
.prompt-input {
  width: 100%; padding: 10px; border: 1px solid var(--vp-c-divider);
  border-radius: 8px; background: var(--vp-c-bg-soft);
  font-size: 13px; line-height: 1.5; resize: vertical;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1); margin-bottom: 10px;
  box-sizing: border-box;
}
.prompt-input:focus {
  outline: none; border-color: var(--vp-c-brand);
}
.run-btn {
  width: 100%; padding: 10px; background: var(--vp-c-brand);
  color: white; border: none; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background 0.2s;
}
.run-btn:hover { background: var(--vp-c-brand-dark); }

.output-box {
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  border-radius: 8px; padding: 14px; min-height: 120px;
  font-size: 13px; line-height: 1.7;
}
.output-text { white-space: pre-wrap; color: var(--vp-c-text-1); }
.output-placeholder { color: var(--vp-c-text-3); text-align: center; padding: 30px 0; }
.generating { color: var(--vp-c-brand); text-align: center; padding: 30px 0; }
.dot-anim { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.3; } }

.quality-bar { margin-top: 12px; }
.quality-label { font-weight: 600; font-size: 12px; margin-bottom: 8px; }
.quality-metrics { display: flex; flex-direction: column; gap: 6px; }
.metric { display: flex; align-items: center; gap: 8px; }
.metric-name { font-size: 11px; width: 50px; color: var(--vp-c-text-2); }
.meter {
  flex: 1; height: 8px; background: var(--vp-c-bg-soft);
  border-radius: 4px; overflow: hidden;
}
.meter-fill {
  height: 100%; border-radius: 4px;
  transition: width 0.6s ease;
}
.metric-score { font-size: 11px; font-weight: 600; width: 36px; text-align: right; }

.tips-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.tips-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.tips-text { color: var(--vp-c-text-1); }
</style>
