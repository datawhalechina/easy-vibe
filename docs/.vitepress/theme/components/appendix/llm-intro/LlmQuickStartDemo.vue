<template>
  <div class="llm-quick-start">
    <div class="header">
      <div class="title">🤖 LLM 初体验：从闲聊到业务实战</div>
      <div class="subtitle">
        大模型不仅能聊天，更是生产力工具。试试看它如何处理这些业务需求：
      </div>
    </div>

    <div class="chat-window">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="emoji">💼</div>
        <p>请选择一个业务场景开始体验</p>
      </div>

      <div class="messages" ref="messagesRef">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message"
          :class="msg.role"
        >
          <div class="avatar">{{ msg.role === 'user' ? '🧑‍💻' : '🤖' }}</div>
          <div class="content">
            <div v-if="msg.role === 'user'" class="user-text">
              {{ msg.content }}
            </div>
            <div v-else class="assistant-content">
              <pre v-if="msg.isCode"><code>{{ msg.content }}</code></pre>
              <div v-else>{{ msg.content }}</div>
            </div>
            <span
              v-if="
                msg.role === 'assistant' &&
                isGenerating &&
                index === messages.length - 1
              "
              class="cursor"
              >|</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="input-area">
      <div class="quick-actions" v-if="!isGenerating">
        <button
          v-for="q in questions"
          :key="q.text"
          @click="ask(q)"
          class="action-btn"
        >
          <span class="btn-icon">{{ q.icon }}</span>
          <span class="btn-text">{{ q.text }}</span>
        </button>
      </div>
      <div class="status-text" v-else>正在思考业务逻辑并生成 Token...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const questions = [
  { icon: '🤔', text: '给我想一个请假的理由', type: 'casual' },
  { icon: '🐍', text: '帮我写一个 Python 爬虫', type: 'code' },
  { icon: '🎩', text: '用鲁迅的语气夸我', type: 'casual' },
  { icon: '📊', text: '分析这份销售数据的趋势', type: 'analysis' },
  { icon: '📝', text: '为这款咖啡杯写一段小红书文案', type: 'marketing' }
]

const answers = {
  给我想一个请假的理由: {
    isCode: false,
    text: '老板，我感觉身体不适，可能是昨天写代码太投入，CPU（大脑）过热导致系统（身体）宕机了，申请重启（休息）一天。'
  },
  '帮我写一个 Python 爬虫': {
    isCode: true,
    text: `import requests
from bs4 import BeautifulSoup

def fetch_titles(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 提取所有 h1 标签
    titles = [tag.text.strip() for tag in soup.find_all('h1')]
    return titles

# 使用示例
url = "https://example.com"
print(f"正在爬取 {url} 的标题...")
# titles = fetch_titles(url)
# print(titles)`
  },
  用鲁迅的语气夸我: {
    isCode: false,
    text: '我向来是不惮以最坏的恶意来推测中国人的，然而我还不料，也不信竟会遇见这样优秀的人。你的代码，很有几分风骨。'
  },
  分析这份销售数据的趋势: {
    isCode: false,
    text: '基于您提供的数据，我发现以下几个关键趋势：\n\n1. 📈 **总体增长**：Q3 销售额同比增长了 25%，主要得益于线上渠道的爆发。\n2. ⚠️ **库存预警**：热销品类 A 的周转天数已降至 5 天，建议立即补货。\n3. 💡 **潜力市场**：华南地区的转化率（3.2%）显著高于平均水平，建议加大该区域的广告投放。'
  },
  为这款咖啡杯写一段小红书文案: {
    isCode: false,
    text: '☕️ **早八人的续命神器！这款咖啡杯真的太懂我了**\n\n家人们谁懂啊！😭 作为一个每天靠咖啡续命的打工人，终于挖到了这款宝藏杯子！\n\n✨ **颜值绝绝子**：奶油白配色，拿在手里就是妥妥的 ins 风，摆在工位上心情都变好了！\n🌡️ **保温超长待机**：早上泡的冰美式，下午还是冰冰凉，这也太适合夏天了吧！\n🔒 **密封不漏水**：直接塞包里也不怕洒，挤地铁必备！\n\n👇 评论区蹲一个链接，带你一起实现咖啡自由！ #好物分享 #高颜值水杯 #打工人日常'
  }
}

const messages = ref([])
const isGenerating = ref(false)
const messagesRef = ref(null)

const ask = async (qObj) => {
  messages.value.push({ role: 'user', content: qObj.text })
  isGenerating.value = true

  await wait(600)

  const answerData = answers[qObj.text]
  const fullAnswer = answerData ? answerData.text : '正在思考...'

  messages.value.push({
    role: 'assistant',
    content: '',
    isCode: answerData ? answerData.isCode : false
  })

  const answerIdx = messages.value.length - 1

  // Typing animation
  for (let i = 0; i < fullAnswer.length; i++) {
    messages.value[answerIdx].content += fullAnswer[i]
    scrollToBottom()
    // Code typing is usually faster looking
    const speed = answerData.isCode ? 10 : 30 + Math.random() * 30
    await wait(speed)
  }

  isGenerating.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.llm-quick-start {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.chat-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  height: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--vp-c-text-3);
}

.empty-state .emoji {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 90%;
  animation: fadeIn 0.3s ease;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.assistant {
  align-self: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
}

.content {
  background: var(--vp-c-bg-mute);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
}

.message.user .content {
  background: var(--vp-c-brand);
  color: white;
  border-bottom-right-radius: 2px;
}

.message.assistant .content {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 2px;
  min-width: 200px;
}

.assistant-content pre {
  margin: 8px 0 0;
  padding: 8px;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.assistant-content code {
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 12px;
  color: #d4d4d4;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 14px;
  background: currentColor;
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s infinite;
}

.input-area {
  margin-top: 16px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quick-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.status-text {
  font-size: 13px;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-text::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}
</style>
