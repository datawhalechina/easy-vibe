<template>
  <div class="memory-principle">
    <div class="header">
      <div class="title">🧠 Agent 记忆系统原理：如何让 AI "记得"你</div>
      <div class="subtitle">理解短期记忆、工作记忆、长期记忆的协同工作机制</div>
    </div>

    <!-- 记忆类型概览 -->
    <div class="memory-overview">
      <div class="overview-title">📊 三层记忆架构</div>
      <div class="memory-cards">
        <div class="memory-card short-term" :class="{ active: activeTab === 'short' }" @click="activeTab = 'short'">
          <div class="card-icon">⏱️</div>
          <div class="card-name">短期记忆</div>
          <div class="card-desc">当前对话上下文</div>
          <div class="card-lifetime">⚡ 会话级</div>
        </div>
        <div class="memory-card working" :class="{ active: activeTab === 'working' }" @click="activeTab = 'working'">
          <div class="card-icon">📝</div>
          <div class="card-name">工作记忆</div>
          <div class="card-desc">任务相关变量</div>
          <div class="card-lifetime">🔄 任务级</div>
        </div>
        <div class="memory-card long-term" :class="{ active: activeTab === 'long' }" @click="activeTab = 'long'">
          <div class="card-icon">💾</div>
          <div class="card-name">长期记忆</div>
          <div class="card-desc">用户偏好与知识</div>
          <div class="card-lifetime">♾️ 持久化</div>
        </div>
      </div>
    </div>

    <!-- 交互演示区 -->
    <div class="demo-section">
      <div class="demo-title">🎮 交互演示：观察记忆如何工作</div>
      
      <!-- 对话区 -->
      <div class="chat-area">
        <div class="chat-header">
          <span>💬 对话窗口</span>
          <button class="reset-btn" @click="resetDemo">🔄 重置</button>
        </div>
        <div class="messages" ref="messageContainer">
          <div v-for="(msg, idx) in messages" :key="idx" class="message" :class="msg.role">
            <div class="avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</div>
            <div class="bubble">
              <div class="msg-text">{{ msg.text }}</div>
              <div v-if="msg.memoryOps && msg.memoryOps.length" class="memory-ops">
                <div v-for="(op, i) in msg.memoryOps" :key="i" class="memory-op" :class="op.type">
                  <span class="op-icon">{{ op.icon }}</span>
                  <span class="op-text">{{ op.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 快捷输入 -->
        <div class="quick-inputs">
          <button 
            v-for="btn in quickButtons" 
            :key="btn.id"
            class="quick-btn"
            :disabled="isProcessing || btn.used"
            @click="sendMessage(btn)"
          >
            {{ btn.text }}
          </button>
        </div>
      </div>

      <!-- 记忆状态面板 -->
      <div class="memory-panels">
        <div class="panel-title">📂 记忆状态实时监控</div>
        
        <!-- 短期记忆 -->
        <div class="memory-panel" :class="{ highlight: activeTab === 'short' }" @click="activeTab = 'short'">
          <div class="panel-header">
            <span class="panel-icon">⏱️</span>
            <span class="panel-name">短期记忆</span>
            <span class="panel-count">{{ shortTermMemory.length }} 条</span>
          </div>
          <div class="panel-content">
            <div v-if="shortTermMemory.length === 0" class="empty">暂无对话记录</div>
            <div v-for="(item, idx) in shortTermMemory.slice(-5)" :key="idx" class="memory-item">
              <span class="item-role" :class="item.role">{{ item.role === 'user' ? 'U' : 'A' }}</span>
              <span class="item-text">{{ truncate(item.content, 25) }}</span>
            </div>
          </div>
          <div class="panel-footer">💡 保存最近的对话轮次，超出上下文窗口会被遗忘</div>
        </div>

        <!-- 工作记忆 -->
        <div class="memory-panel" :class="{ highlight: activeTab === 'working' }" @click="activeTab = 'working'">
          <div class="panel-header">
            <span class="panel-icon">📝</span>
            <span class="panel-name">工作记忆</span>
            <span class="panel-count">{{ Object.keys(workingMemory).length }} 个变量</span>
          </div>
          <div class="panel-content">
            <div v-if="Object.keys(workingMemory).length === 0" class="empty">暂无任务变量</div>
            <div v-for="(value, key) in workingMemory" :key="key" class="memory-item working-item">
              <span class="item-key">{{ key }}:</span>
              <span class="item-value">{{ value }}</span>
            </div>
          </div>
          <div class="panel-footer">💡 临时存储任务相关变量，任务结束后清除</div>
        </div>

        <!-- 长期记忆 -->
        <div class="memory-panel" :class="{ highlight: activeTab === 'long' }" @click="activeTab = 'long'">
          <div class="panel-header">
            <span class="panel-icon">💾</span>
            <span class="panel-name">长期记忆</span>
            <span class="panel-count">{{ longTermMemory.length }} 条知识</span>
          </div>
          <div class="panel-content">
            <div v-if="longTermMemory.length === 0" class="empty">暂无持久化知识</div>
            <div v-for="(item, idx) in longTermMemory" :key="idx" class="memory-item long-item">
              <span class="item-type" :class="item.type">{{ item.type }}</span>
              <span class="item-content">{{ item.key }} = {{ truncate(item.value, 20) }}</span>
            </div>
          </div>
          <div class="panel-footer">💡 跨会话持久保存，需要显式写入</div>
        </div>
      </div>
    </div>

    <!-- 记忆流转示意 -->
    <div class="memory-flow">
      <div class="flow-title">🔄 记忆流转机制</div>
      <div class="flow-diagram">
        <div class="flow-step">
          <div class="step-box user-input">
            <div class="step-icon">👤</div>
            <div class="step-text">用户输入</div>
          </div>
          <div class="step-arrow">➡️</div>
        </div>
        
        <div class="flow-step">
          <div class="step-box">
            <div class="step-icon">⏱️</div>
            <div class="step-text">短期记忆</div>
            <div class="step-desc">自动记录对话</div>
          </div>
          <div class="step-arrow">➡️</div>
        </div>
        
        <div class="flow-step">
          <div class="step-box">
            <div class="step-icon">🧠</div>
            <div class="step-text">LLM 处理</div>
            <div class="step-desc">理解+决策</div>
          </div>
          <div class="step-arrow">➡️</div>
        </div>
        
        <div class="flow-branch">
          <div class="branch-option">
            <div class="branch-arrow">⬇️</div>
            <div class="step-box small">
              <div class="step-icon">📝</div>
              <div class="step-text">工作记忆</div>
              <div class="step-desc">临时变量</div>
            </div>
          </div>
          <div class="branch-option">
            <div class="branch-arrow">⬇️</div>
            <div class="step-box small">
              <div class="step-icon">💾</div>
              <div class="step-text">长期记忆</div>
              <div class="step-desc">持久化存储</div>
            </div>
          </div>
        </div>
        
        <div class="flow-step">
          <div class="step-arrow">➡️</div>
          <div class="step-box agent-output">
            <div class="step-icon">🤖</div>
            <div class="step-text">Agent 回复</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心机制解释 -->
    <div class="mechanism-section">
      <div class="mechanism-title">⚙️ 核心机制详解</div>
      <div class="mechanism-grid">
        <div class="mechanism-card" :class="{ active: activeTab === 'short' }" @click="activeTab = 'short'">
          <div class="card-header">
            <span class="card-icon">⏱️</span>
            <span class="card-title">短期记忆 (Short-term)</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">存储内容：</span>
              <span class="item-value">当前对话的完整历史</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">生命周期：</span>
              <span class="item-value">当前会话，关闭即消失</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">容量限制：</span>
              <span class="item-value">受限于 LLM 上下文窗口（通常4K-128K tokens）</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">更新方式：</span>
              <span class="item-value">自动追加每条对话</span>
            </div>
            <div class="code-example">
              <code>messages = [{role: "user", content: "..."}, {role: "assistant", content: "..."}]</code>
            </div>
          </div>
        </div>

        <div class="mechanism-card" :class="{ active: activeTab === 'working' }" @click="activeTab = 'working'">
          <div class="card-header">
            <span class="card-icon">📝</span>
            <span class="card-title">工作记忆 (Working)</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">存储内容：</span>
              <span class="item-value">任务相关的临时变量和状态</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">生命周期：</span>
              <span class="item-value">单个任务/会话期间</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">典型用途：</span>
              <span class="item-value">当前步骤、中间结果、用户偏好</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">更新方式：</span>
              <span class="item-value">Agent 主动读写</span>
            </div>
            <div class="code-example">
              <code>working_memory = {"step": 2, "user_name": "张三", "topic": "Python"}</code>
            </div>
          </div>
        </div>

        <div class="mechanism-card" :class="{ active: activeTab === 'long' }" @click="activeTab = 'long'">
          <div class="card-header">
            <span class="card-icon">💾</span>
            <span class="card-title">长期记忆 (Long-term)</span>
          </div>
          <div class="card-body">
            <div class="mechanism-item">
              <span class="item-label">存储内容：</span>
              <span class="item-value">用户画像、偏好设置、历史知识</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">生命周期：</span>
              <span class="item-value">永久保存，跨会话可用</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">存储方式：</span>
              <span class="item-value">向量数据库、知识图谱、键值存储</span>
            </div>
            <div class="mechanism-item">
              <span class="item-label">更新方式：</span>
              <span class="item-value">显式写入，定期总结提炼</span>
            </div>
            <div class="code-example">
              <code>long_term_memory = [{"type": "preference", "key": "语言", "value": "Python"}]</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <div class="practices-title">💡 记忆系统最佳实践</div>
      <div class="practices-list">
        <div class="practice-item">
          <div class="practice-icon">1️⃣</div>
          <div class="practice-content">
            <div class="practice-title">短期记忆优化</div>
            <div class="practice-desc">定期清理无关历史，保留关键上下文；超长对话使用摘要技术压缩</div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">2️⃣</div>
          <div class="practice-content">
            <div class="practice-title">工作记忆管理</div>
            <div class="practice-desc">任务开始时初始化，结束时清理；避免存储大量中间结果</div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">3️⃣</div>
          <div class="practice-content">
            <div class="practice-title">长期记忆构建</div>
            <div class="practice-desc">定期总结对话提炼知识；使用向量检索实现语义搜索；区分事实和偏好</div>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-icon">4️⃣</div>
          <div class="practice-content">
            <div class="practice-title">记忆一致性</div>
            <div class="practice-desc">长期记忆更新前验证；处理矛盾信息；支持用户显式修改记忆</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const activeTab = ref('short')
const isProcessing = ref(false)
const messageContainer = ref(null)

// 记忆存储
const messages = ref([])
const shortTermMemory = ref([])
const workingMemory = reactive({})
const longTermMemory = ref([])

// 快捷按钮
const quickButtons = ref([
  { id: 1, text: '我叫张三', used: false, action: 'setName' },
  { id: 2, text: '我喜欢 Python', used: false, action: 'setPreference' },
  { id: 3, text: '推荐编程书', used: false, action: 'recommend' },
  { id: 4, text: '我叫什么？', used: false, action: 'askName' },
  { id: 5, text: '我喜欢什么语言？', used: false, action: 'askPreference' }
])

const sendMessage = async (btn) => {
  if (isProcessing.value) return
  isProcessing.value = true
  btn.used = true

  // 用户消息
  messages.value.push({
    role: 'user',
    text: btn.text,
    memoryOps: []
  })
  
  // 添加到短期记忆
  shortTermMemory.value.push({
    role: 'user',
    content: btn.text
  })
  
  await scrollToBottom()
  await wait(600)

  // Agent 处理
  let response = {}
  
  switch (btn.action) {
    case 'setName':
      workingMemory.user_name = '张三'
      response = {
        text: '好的，我记住了你叫张三。',
        memoryOps: [
          { icon: '📝', text: '工作记忆: user_name = 张三', type: 'working' },
          { icon: '💾', text: '长期记忆: 姓名 = 张三', type: 'long-term' }
        ]
      }
      // 模拟写入长期记忆（去重：如果已存在则更新，否则添加）
      await wait(300)
      const existingNameIndex = longTermMemory.value.findIndex(m => m.key === '姓名')
      if (existingNameIndex >= 0) {
        longTermMemory.value[existingNameIndex].value = '张三'
      } else {
        longTermMemory.value.push({ type: '身份', key: '姓名', value: '张三' })
      }
      break
      
    case 'setPreference':
      workingMemory.favorite_language = 'Python'
      response = {
        text: '收到！我记住了你喜欢 Python。',
        memoryOps: [
          { icon: '📝', text: '工作记忆: favorite_language = Python', type: 'working' },
          { icon: '💾', text: '长期记忆: 偏好 = Python', type: 'long-term' }
        ]
      }
      await wait(300)
      // 去重逻辑：如果已存在则更新，否则添加
      const existingPrefIndex = longTermMemory.value.findIndex(m => m.key === '编程语言')
      if (existingPrefIndex >= 0) {
        longTermMemory.value[existingPrefIndex].value = 'Python'
      } else {
        longTermMemory.value.push({ type: '偏好', key: '编程语言', value: 'Python' })
      }
      break
      
    case 'recommend':
      const lang = workingMemory.favorite_language || longTermMemory.value.find(m => m.key === '编程语言')?.value
      response = {
        text: lang 
          ? `基于你喜欢 ${lang}，我推荐《${lang}编程：从入门到实践》和《流畅的${lang}》。`
          : '我推荐《代码大全》和《程序员修炼之道》，适合所有编程语言。',
        memoryOps: [
          { icon: '🔍', text: `检索长期记忆: 偏好 = ${lang || '无'}`, type: 'retrieve' }
        ]
      }
      break
      
    case 'askName':
      const name = workingMemory.user_name || longTermMemory.value.find(m => m.key === '姓名')?.value
      response = {
        text: name 
          ? `你叫${name}。` 
          : '我还不知道你的名字，请告诉我。',
        memoryOps: name 
          ? [{ icon: '🔍', text: '检索记忆: 姓名', type: 'retrieve' }]
          : [{ icon: '❓', text: '记忆缺失: 未找到姓名', type: 'missing' }]
      }
      break
      
    case 'askPreference':
      const pref = workingMemory.favorite_language || longTermMemory.value.find(m => m.key === '编程语言')?.value
      response = {
        text: pref 
          ? `你喜欢 ${pref}。` 
          : '我还不知道你喜欢什么编程语言。',
        memoryOps: pref 
          ? [{ icon: '🔍', text: '检索记忆: 偏好', type: 'retrieve' }]
          : [{ icon: '❓', text: '记忆缺失: 未找到偏好', type: 'missing' }]
      }
      break
  }

  // Agent 回复
  messages.value.push({
    role: 'assistant',
    text: response.text,
    memoryOps: response.memoryOps
  })
  
  shortTermMemory.value.push({
    role: 'assistant',
    content: response.text
  })
  
  await scrollToBottom()
  isProcessing.value = false
}

const resetDemo = () => {
  messages.value = []
  shortTermMemory.value = []
  Object.keys(workingMemory).forEach(key => delete workingMemory[key])
  longTermMemory.value = []
  quickButtons.value.forEach(btn => btn.used = false)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const wait = (ms) => new Promise(r => setTimeout(r, ms))
const truncate = (str, len) => str?.length > len ? str.slice(0, len) + '...' : str
</script>

<style scoped>
.memory-principle {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 记忆概览 */
.memory-overview {
  margin-bottom: 20px;
}

.overview-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.memory-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .memory-cards {
    grid-template-columns: 1fr;
  }
}

.memory-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.memory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.memory-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.memory-card.short-term.active { border-color: #3b82f6; background: #dbeafe; }
.memory-card.working.active { border-color: #f59e0b; background: #fef3c7; }
.memory-card.long-term.active { border-color: #10b981; background: #d1fae5; }

.card-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.card-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.card-lifetime {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  display: inline-block;
}

/* 演示区 */
.demo-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.demo-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

/* 对话区 */
.chat-area {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
}

.reset-btn {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
}

.messages {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.bubble {
  max-width: 75%;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.message.user .bubble {
  background: var(--vp-c-brand);
  color: white;
  border: none;
}

.msg-text {
  margin-bottom: 6px;
}

.memory-ops {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.memory-op {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.memory-op.working { background: #fef3c7; color: #92400e; }
.memory-op.long-term { background: #d1fae5; color: #065f46; }
.memory-op.retrieve { background: #dbeafe; color: #1e40af; }
.memory-op.missing { background: #fee2e2; color: #991b1b; }

/* 快捷输入 */
.quick-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.quick-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 记忆面板 */
.memory-panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .memory-panels {
    grid-template-columns: 1fr;
  }
}

.panel-title {
  grid-column: 1 / -1;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.memory-panel {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.memory-panel:hover {
  border-color: var(--vp-c-brand);
}

.memory-panel.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-icon {
  font-size: 16px;
}

.panel-name {
  flex: 1;
  font-size: 12px;
  font-weight: 600;
}

.panel-count {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.panel-content {
  padding: 10px;
  min-height: 80px;
  max-height: 120px;
  overflow-y: auto;
}

.empty {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 20px 0;
}

.memory-item {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 11px;
}

.memory-item:last-child {
  margin-bottom: 0;
}

.item-role {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  flex-shrink: 0;
}

.item-role.user { background: var(--vp-c-brand); color: white; }
.item-role.assistant { background: #10b981; color: white; }

.item-text {
  color: var(--vp-c-text-2);
}

.item-key {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.item-value {
  color: var(--vp-c-text-1);
}

.item-type {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-type.身份 { background: #dbeafe; color: #1e40af; }
.item-type.偏好 { background: #d1fae5; color: #065f46; }

.panel-footer {
  padding: 8px 10px;
  font-size: 10px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

/* 记忆流转 */
.memory-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px 20px;
  text-align: center;
  min-width: 100px;
}

.step-box.small {
  padding: 10px 14px;
  min-width: 80px;
}

.step-box.user-input {
  border-color: #3b82f6;
  background: #dbeafe;
}

.step-box.agent-output {
  border-color: #10b981;
  background: #d1fae5;
}

.step-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.step-box.small .step-icon {
  font-size: 16px;
}

.step-text {
  font-size: 12px;
  font-weight: 600;
}

.step-desc {
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.step-arrow {
  font-size: 16px;
  color: var(--vp-c-text-3);
}

.flow-branch {
  display: flex;
  gap: 40px;
}

.branch-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.branch-arrow {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

/* 核心机制 */
.mechanism-section {
  margin-bottom: 20px;
}

.mechanism-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.mechanism-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .mechanism-grid {
    grid-template-columns: 1fr;
  }
}

.mechanism-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.mechanism-card:hover {
  border-color: var(--vp-c-brand);
}

.mechanism-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-icon {
  font-size: 18px;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
}

.card-body {
  padding: 12px;
}

.mechanism-item {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 11px;
}

.item-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.item-value {
  color: var(--vp-c-text-1);
}

.code-example {
  margin-top: 10px;
  padding: 8px;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.code-example code {
  font-size: 10px;
  color: #d4d4d4;
  font-family: monospace;
}

/* 最佳实践 */
.best-practices {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.practices-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.practice-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.practice-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.practice-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.practice-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
