<template>
  <div class="quick-start-demo-container">
    <el-card class="quick-start-card" shadow="hover">
      <template #header>
        <div class="header-content">
          <div class="title-group">
            <div class="title">🕹️ 互动体验：提示词进化论</div>
            <div class="subtitle">不要一次性写好，试着像搭积木一样优化你的指令。</div>
          </div>
          <div class="controls">
            <span class="label">选择任务：</span>
            <el-select v-model="taskId" @change="reset" style="width: 160px" size="large">
              <el-option
                v-for="t in tasks"
                :key="t.id"
                :label="t.label"
                :value="t.id"
              />
            </el-select>
          </div>
        </div>
      </template>

      <!-- 游戏区 -->
      <div class="game-area">
        <!-- 左侧：提示词构建 -->
        <div class="prompt-builder">
          <div class="section-title">你的指令 (Prompt)</div>
          
          <div class="prompt-box">
            <!-- 基础层 -->
            <div class="block base" :class="{ active: true }">
              <span class="icon">📝</span>
              <span class="text">{{ basePrompt }}</span>
            </div>

            <!-- 进阶层：清晰指令 -->
            <div v-if="level >= 1" class="block clear animate-in">
              <span class="icon">🎯</span>
              <span class="text">{{ clearPromptAddon }}</span>
            </div>

            <!-- 专家层：结构化 -->
            <div v-if="level >= 2" class="block pro animate-in">
              <span class="icon">🧠</span>
              <span class="text">{{ proPromptAddon }}</span>
            </div>
          </div>

          <!-- 升级按钮 -->
          <div class="upgrade-controls">
            <div class="level-info">
              <el-tag :type="levelColor" effect="dark" size="small" style="margin-bottom: 4px;">Level {{ level }}</el-tag>
              <span class="level-desc" :style="{ color: levelColorCode }">{{ levelLabel }}</span>
            </div>
            
            <div class="actions">
              <el-button-group>
                <el-button 
                  :disabled="level === 0"
                  @click="downgrade"
                  icon="Minus"
                >
                  ➖ 降级
                </el-button>
                <el-button 
                  type="primary" 
                  :disabled="level === 2"
                  @click="upgrade"
                  icon="Plus"
                >
                  升级 ➕
                </el-button>
              </el-button-group>
            </div>
          </div>
          
          <el-button 
            type="primary" 
            size="large" 
            :loading="isRunning"
            @click="run"
            style="width: 100%; font-weight: bold; font-size: 1.1rem;"
          >
            {{ isRunning ? '生成中...' : '🚀 发送给 AI' }}
          </el-button>
        </div>

        <!-- 右侧：AI 模拟输出 -->
        <div class="chat-preview">
          <div class="section-title">
            <span>AI 回复 (Output)</span>
            <!-- 历史记录切换 -->
            <div class="history-tabs" v-if="hasAnyHistory">
              <el-radio-group v-model="viewLevel" size="small">
                <el-radio-button 
                  v-for="l in availableLevels" 
                  :key="l" 
                  :label="l"
                >
                  L{{ l }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="chat-window">
            <!-- 空状态 -->
            <div v-if="!hasRun && !hasAnyHistory" class="empty-state">
              <el-empty description="点击左侧“发送”按钮，看看 AI 会怎么回。" :image-size="100" />
            </div>

            <!-- 内容区域 -->
            <div v-else>
              <!-- 比较模式提示 -->
              <el-alert
                v-if="viewLevel !== level"
                type="info"
                show-icon
                :closable="false"
                style="margin-bottom: 12px;"
              >
                <template #title>
                  正在查看 Level {{ viewLevel }} 的历史记录 (当前是 L{{ level }})
                  <el-button link type="primary" @click="viewLevel = level" style="padding: 0; vertical-align: baseline;">回到当前</el-button>
                </template>
              </el-alert>

              <div class="message-bubble" :class="{ typing: isRunning && viewLevel === level }">
                <div class="avatar">🤖</div>
                <div class="content">
                  <div v-if="isRunning && viewLevel === level" class="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                  <div v-else class="markdown-body" v-html="renderMarkdown(getOutputForLevel(viewLevel))"></div>
                </div>
              </div>
              
              <!-- 点评气泡 -->
              <div v-if="(!isRunning || viewLevel !== level) && getOutputForLevel(viewLevel)" class="feedback-bubble animate-pop">
                <div class="feedback-title">💡 {{ getFeedbackForLevel(viewLevel).title }}</div>
                <div class="feedback-text">{{ getFeedbackForLevel(viewLevel).text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tasks = [
  { id: 'copy', label: '写小红书文案' },
  { id: 'summary', label: '总结会议纪要' },
  { id: 'code', label: '写代码函数' }
]

const taskId = ref('copy')
const level = ref(0) // 0: vague, 1: clear, 2: pro
const isRunning = ref(false)
const hasRun = ref(false)
const displayedOutput = ref('')

// 存储历史输出：{ 0: "...", 1: "..." }
const outputs = ref({})
const viewLevel = ref(0) // 当前查阅的 Level

const hasAnyHistory = computed(() => Object.keys(outputs.value).length > 0)
const availableLevels = computed(() => Object.keys(outputs.value).map(Number).sort())

const reset = () => {
  level.value = 0
  hasRun.value = false
  displayedOutput.value = ''
  outputs.value = {}
  viewLevel.value = 0
}

const upgrade = () => {
  if (level.value < 2) level.value++
  hasRun.value = false 
  viewLevel.value = level.value // 切换到新等级时，视角跟随
}

const downgrade = () => {
  if (level.value > 0) level.value--
  hasRun.value = false
  viewLevel.value = level.value
}

const levelLabel = computed(() => ['随口一说', '清晰指令', '结构化 Prompt'][level.value])
const levelColor = computed(() => ['info', 'warning', 'success'][level.value])
const levelColorCode = computed(() => ['#909399', '#e6a23c', '#67c23a'][level.value])

// Prompt 内容配置
const promptConfig = {
  copy: {
    base: '写个咖啡杯文案',
    clear: '+ 风格：小红书，轻松活泼。长度：100字左右。卖点：颜值高、保温好。',
    pro: '+ 角色：资深种草博主\n+ 结构：痛点 -> 卖点 -> 场景 -> 结尾互动\n+ 格式：多用 Emoji，分段清晰'
  },
  summary: {
    base: '帮我总结一下这段文字',
    clear: '+ 要求：提炼 3 个核心要点，每点不超过 20 字。',
    pro: '+ 角色：专业秘书\n+ 格式：Markdown 无序列表\n+ 排除：不要客套话，只要干货'
  },
  code: {
    base: '写个排序函数',
    clear: '+ 语言：JavaScript (ES6)。要求：快速排序，带注释。',
    pro: '+ 角色：资深前端架构师\n+ 健壮性：处理边界情况（空数组、非数组）\n+ 示例：附带一个测试用例'
  }
}

const basePrompt = computed(() => promptConfig[taskId.value].base)
const clearPromptAddon = computed(() => promptConfig[taskId.value].clear)
const proPromptAddon = computed(() => promptConfig[taskId.value].pro)

// 模拟输出内容
const outputConfig = {
  copy: [
    '这个咖啡杯真的很好用，推荐给大家。它颜色很好看，而且保温效果也不错。快去买吧。',
    '✨ 早八人必备！这个保温杯颜值真的绝绝子！💖 拿在手里超有质感，而且保温效果超级好，早上装的咖啡下午还是热的！☕️ 放在包里也不漏水，集美们冲鸭！',
    '👋 还在为冷咖啡烦恼？\n\n😫 **痛点**：早起冲的咖啡，还没到公司就凉了？\n\n🌟 **安利**：这款“拿铁杯”必须拥有！\n1️⃣ **颜值主义**：奶油白配色，随手一拍就是大片 📸\n2️⃣ **硬核保温**：实测 6 小时依然烫嘴 🔥\n3️⃣ **办公绝配**：密封圈设计，随便塞包里不漏洒 🎒\n\n👇 评论区告诉我，你最喜欢哪个颜色？'
  ],
  summary: [
    '这段文字主要讲了关于...（此处省略500字流水账）...总之就是这些内容。',
    '- 核心观点：用户增长放缓\n- 主要原因：市场竞争加剧\n- 建议：加大投放力度',
    '### 📝 会议核心摘要\n\n* **📉 现状**：Q3 用户增长率下降 15%\n* **🔍 原因**：竞品推出低价策略，分流明显\n* **🚀 行动**：下周启动“老用户回馈”专项活动'
  ],
  code: [
    'function sort(arr) { return arr.sort() } // 没写快排，或者写了但没注释',
    '// 快速排序\nconst quickSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const p = arr[0];\n  const left = arr.slice(1).filter(x => x < p);\n  const right = arr.slice(1).filter(x => x >= p);\n  return [...quickSort(left), p, ...quickSort(right)];\n}',
    '/**\n * 快速排序 (ES6+)\n * @param {Array} arr - 输入数组\n * @returns {Array} - 排序后的新数组\n */\nconst quickSort = (arr) => {\n  // 🛡️ 边界检查\n  if (!Array.isArray(arr)) throw new Error("Input must be an array");\n  if (arr.length <= 1) return arr;\n\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n\n  // 分区\n  for (let i = 1; i < arr.length; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n\n  return [...quickSort(left), pivot, ...quickSort(right)];\n};\n\n// ✅ 测试用例\nconsole.log(quickSort([3, 1, 4, 1, 5, 9])); // [1, 1, 3, 4, 5, 9]'
  ]
}

const feedbackConfig = {
  copy: [
    { title: '太泛了', text: 'AI 不知道你要什么风格，只能给你“说明书”式的文案。' },
    { title: '好多了', text: '有了风格和卖点，AI 知道怎么“说话”了，但结构还不够抓人。' },
    { title: '专业级', text: '指定了角色和结构（痛点-卖点），输出逻辑清晰，转化率更高。' }
  ],
  summary: [
    { title: '抓不住重点', text: '没有字数和格式限制，AI 可能会罗嗦一大堆。' },
    { title: '清晰明了', text: '限制了字数和要点数量，可读性大幅提升。' },
    { title: '结构化交付', text: '指定 Markdown 格式和角色，直接可用，无需二次编辑。' }
  ],
  code: [
    { title: '不可用', text: '可能偷懒用内置函数，或者缺少注释，难以维护。' },
    { title: '可用', text: '代码正确，有基本注释，但缺乏健壮性考虑。' },
    { title: '生产级', text: '考虑了边界情况和类型检查，直接复制就能进项目。' }
  ]
}

const getFeedbackForLevel = (l) => feedbackConfig[taskId.value][l]

// 获取某等级的输出（如果是当前等级正在运行，显示实时打字内容；否则显示历史记录）
const getOutputForLevel = (l) => {
  if (l === level.value && isRunning.value) return displayedOutput.value
  return outputs.value[l] || ''
}

const renderMarkdown = (text) => {
  if (!text) return ''
  
  // 1. HTML Escape (Basic)
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

  // 2. Bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  return html
}

const run = () => {
  if (isRunning.value) return
  // 直接显示结果，不进行模拟等待
  hasRun.value = true
  viewLevel.value = level.value // 强制看当前
  
  const fullText = outputConfig[taskId.value][level.value]
  displayedOutput.value = fullText
  outputs.value[level.value] = fullText
  isRunning.value = false
}
</script>

<style scoped>
.quick-start-demo-container {
  margin: 24px 0;
}

.quick-start-card {
  border-radius: 12px;
  overflow: visible; /* Allow selects to overflow if needed, though el-select uses popper */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 4px;
  background: linear-gradient(120deg, var(--vp-c-brand) 30%, var(--vp-c-brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.game-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .game-area {
    grid-template-columns: 1fr;
  }
}

/* 左侧构建区 */
.prompt-builder {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prompt-box {
  background: var(--vp-c-bg-alt);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s;
}

.block {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  align-items: flex-start;
}

.block.base {
  border-left: 3px solid var(--vp-c-text-2);
}

.block.clear {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.2);
  border-left: 3px solid var(--vp-c-brand);
}

.block.pro {
  background: rgba(100, 108, 255, 0.05); /* Indigo-ish */
  border: 1px solid rgba(100, 108, 255, 0.2);
  border-left: 3px solid #646cff;
}

.block .icon {
  font-size: 1.2rem;
}

.block .text {
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.animate-in {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.upgrade-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-alt);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.level-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.level-desc {
  font-size: 0.9rem;
  font-weight: 700;
}

/* 右侧预览区 */
.chat-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-window {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--vp-c-divider);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
}

.message-bubble {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.content {
  background: var(--vp-c-bg);
  padding: 12px 16px;
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 100%;
  position: relative;
}

.markdown-body {
  white-space: pre-wrap;
  line-height: 1.6;
}

.message-bubble.typing .content {
  min-width: 60px;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.feedback-bubble {
  background: rgba(var(--vp-c-yellow-rgb), 0.1);
  border: 1px solid rgba(var(--vp-c-yellow-rgb), 0.3);
  padding: 12px;
  border-radius: 8px;
  margin-top: auto;
}

.feedback-title {
  font-weight: 700;
  color: var(--vp-c-yellow-1);
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.feedback-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.animate-pop {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>