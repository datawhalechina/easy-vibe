<template>
  <div class="training-data-demo">
    <div class="demo-header">
      <h4>训练数据格式演示</h4>
      <p class="subtitle">切换不同格式，了解微调数据的组织方式</p>
    </div>

    <div class="format-tabs">
      <button
        v-for="fmt in formats"
        :key="fmt.id"
        class="fmt-btn"
        :class="{ active: activeFormat === fmt.id }"
        @click="activeFormat = fmt.id"
      >
        <span class="fmt-icon">{{ fmt.icon }}</span>
        <span>{{ fmt.label }}</span>
      </button>
    </div>

    <div class="format-detail">
      <div class="format-info">
        <div class="info-title">{{ currentFormat.label }}</div>
        <p class="info-desc">{{ currentFormat.description }}</p>
        <div class="info-tags">
          <span class="tag" v-for="tag in currentFormat.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="data-preview">
        <div class="preview-header">
          <span class="preview-label">数据样例</span>
          <button class="switch-btn" @click="nextExample">
            换一条 ↻
          </button>
        </div>
        <div class="json-block">
          <div v-for="(line, i) in currentExample" :key="i" class="json-line">
            <span class="json-key" v-if="line.key">{{ line.key }}</span>
            <span class="json-colon" v-if="line.key">: </span>
            <span :class="'json-value ' + (line.type || '')">{{ line.value }}</span>
          </div>
        </div>
      </div>

      <div class="quality-tips">
        <div class="tips-title">数据质量要点</div>
        <div class="tips-list">
          <div v-for="(tip, i) in currentFormat.tips" :key="i" class="tip-item">
            <span class="tip-check">✓</span>
            <span>{{ tip }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFormat = ref('instruction')
const exampleIndex = ref(0)

const formats = [
  {
    id: 'instruction',
    icon: '📝',
    label: '指令跟随',
    description: '最常见的微调数据格式。每条数据包含一个指令（instruction）、可选的输入（input）和期望的输出（output）。适合训练通用助手类模型。',
    tags: ['通用助手', 'ChatGPT 风格', '最常用'],
    tips: [
      '指令要清晰明确，避免歧义',
      '输出要完整、准确、格式规范',
      '覆盖多种任务类型（翻译、摘要、问答等）',
      '数据量建议：1,000 ~ 50,000 条'
    ],
    examples: [
      [
        { key: '"instruction"', value: '"请将以下中文翻译成英文"', type: 'string' },
        { key: '"input"', value: '"人工智能正在改变世界"', type: 'string' },
        { key: '"output"', value: '"AI is changing the world"', type: 'string' }
      ],
      [
        { key: '"instruction"', value: '"用一句话总结以下段落"', type: 'string' },
        { key: '"input"', value: '"深度学习是机器学习的一个分支..."', type: 'string' },
        { key: '"output"', value: '"深度学习通过多层神经网络自动学习数据特征"', type: 'string' }
      ],
      [
        { key: '"instruction"', value: '"解释什么是 API"', type: 'string' },
        { key: '"input"', value: '""', type: 'string' },
        { key: '"output"', value: '"API 是应用程序编程接口，它定义了..."', type: 'string' }
      ]
    ]
  },
  {
    id: 'conversation',
    icon: '💬',
    label: '多轮对话',
    description: '模拟真实的多轮对话场景。每条数据包含一组对话消息，包括系统提示、用户消息和助手回复。适合训练聊天机器人。',
    tags: ['聊天机器人', '多轮交互', '上下文理解'],
    tips: [
      '对话要自然流畅，符合真实交互模式',
      '保持角色一致性（系统提示贯穿始终）',
      '包含上下文引用和追问场景',
      '数据量建议：5,000 ~ 100,000 条对话'
    ],
    examples: [
      [
        { key: '"messages"', value: '[', type: 'bracket' },
        { key: '  {"role"', value: '"system", "content": "你是一个编程助手"}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "Python 怎么读取文件？"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "使用 open() 函数..."}', type: 'string' },
        { key: '', value: ']', type: 'bracket' }
      ],
      [
        { key: '"messages"', value: '[', type: 'bracket' },
        { key: '  {"role"', value: '"system", "content": "你是一个医疗顾问"}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "感冒了怎么办？"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "建议多休息多喝水..."}', type: 'string' },
        { key: '  {"role"', value: '"user", "content": "需要吃药吗？"}', type: 'string' },
        { key: '  {"role"', value: '"assistant", "content": "如果症状较轻..."}', type: 'string' },
        { key: '', value: ']', type: 'bracket' }
      ]
    ]
  },
  {
    id: 'classification',
    icon: '🏷️',
    label: '分类标注',
    description: '用于训练文本分类任务。每条数据包含输入文本和对应的类别标签。适合情感分析、意图识别、内容审核等场景。',
    tags: ['情感分析', '意图识别', '内容审核'],
    tips: [
      '类别标签要统一规范，避免拼写差异',
      '各类别样本数量尽量均衡',
      '包含边界案例和易混淆样本',
      '数据量建议：每个类别至少 100 条'
    ],
    examples: [
      [
        { key: '"text"', value: '"这家餐厅的菜品非常好吃，服务也很周到"', type: 'string' },
        { key: '"label"', value: '"positive"', type: 'label' }
      ],
      [
        { key: '"text"', value: '"等了一个小时还没上菜，太失望了"', type: 'string' },
        { key: '"label"', value: '"negative"', type: 'label' }
      ],
      [
        { key: '"text"', value: '"餐厅环境一般，价格中等"', type: 'string' },
        { key: '"label"', value: '"neutral"', type: 'label' }
      ]
    ]
  }
]

const currentFormat = computed(() => {
  return formats.find(f => f.id === activeFormat.value)
})

const currentExample = computed(() => {
  const examples = currentFormat.value.examples
  return examples[exampleIndex.value % examples.length]
})

function nextExample() {
  exampleIndex.value++
}
</script>

<style scoped>
.training-data-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.format-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.fmt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.fmt-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.fmt-icon {
  font-size: 16px;
}

.format-detail {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.format-info {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.info-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.info-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 10px;
}

.info-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.data-preview {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.preview-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.switch-btn {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 12px;
}

.switch-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.json-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  font-family: 'Fira Code', monospace;
}

.json-line {
  font-size: 12px;
  line-height: 1.8;
}

.json-key {
  color: #818cf8;
}

.json-colon {
  color: var(--vp-c-text-3);
}

.json-value.string {
  color: #10b981;
}

.json-value.label {
  color: #f59e0b;
  font-weight: 600;
}

.json-value.bracket {
  color: var(--vp-c-text-3);
}

.quality-tips {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border-left: 3px solid #10b981;
}

.tips-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tip-check {
  color: #10b981;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
