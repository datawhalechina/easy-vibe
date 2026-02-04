<!--
  TcpHandshakeDemo.vue
  TCP三次握手演示 - 紧凑交互版
  
  设计理念：
  1. 循循善诱：用"打电话"的生活场景类比 TCP 连接建立过程。
  2. 紧凑布局：保留核心可视化区，使用固定底部详情板代替长列表。
-->
<template>
  <div class="tcp-compact">
    <!-- 顶部标题与控制 -->
    <div class="top-bar">
      <div class="title-section">
        <span class="app-icon">📞</span>
        <span class="app-title">TCP 三次握手</span>
      </div>
      
      <div class="actions">
         <button 
          class="action-btn primary" 
          @click="nextStep"
          :disabled="currentStep >= 3"
          v-if="currentStep < 3"
        >
          {{ currentStep === 0 ? '▶ 开始拨号' : '下一步 ➔' }}
        </button>
        <button 
          class="action-btn outline" 
          @click="reset"
        >
          ↺ 重置
        </button>
      </div>
    </div>

    <!-- 核心可视化舞台 -->
    <div class="stage-area">
      <!-- 左侧：客户端/快递员 -->
      <div class="actor client">
        <div class="avatar-box">
          <span class="avatar-icon">🧑‍💻</span>
          <span class="avatar-label">客户端 (你)</span>
        </div>
        <transition name="pop">
          <div class="bubble client" v-if="currentStep >= 1">
            {{ getBubbleText(1) }}
          </div>
        </transition>
      </div>

      <!-- 中间：连接状态线 -->
      <div class="connection-line">
        <div class="line-bg"></div>
        <div class="signal-packet" :class="getSignalClass()">
          <span class="packet-icon" v-if="currentStep > 0">{{ getSignalIcon() }}</span>
        </div>
        <div class="status-badge" :class="{ connected: currentStep === 3 }">
          {{ currentStep === 3 ? '✅ 连接建立' : '⏳ 连接中...' }}
        </div>
      </div>

      <!-- 右侧：服务器/收件人 -->
      <div class="actor server">
        <div class="avatar-box">
          <span class="avatar-icon">🖥️</span>
          <span class="avatar-label">服务器</span>
        </div>
        <transition name="pop">
          <div class="bubble server" v-if="currentStep >= 2">
            {{ getBubbleText(2) }}
          </div>
        </transition>
      </div>
    </div>

    <!-- 步骤进度条 (可点击跳转) -->
    <div class="step-indicator">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step-dot"
        :class="{ active: currentStep === index + 1, passed: currentStep > index + 1 }"
        @click="goToStep(index + 1)"
        :title="step.techTitle"
      >
        <span class="dot-num">{{ index + 1 }}</span>
        <span class="dot-line" v-if="index < steps.length - 1"></span>
      </div>
    </div>

    <!-- 底部详情面板 (固定高度) -->
    <div class="detail-panel">
      <transition name="fade" mode="out-in">
        <div v-if="currentStep > 0" class="detail-content" :key="currentStep">
           <div class="detail-left" :style="{ borderColor: getCurrentStepColor() }">
             <div class="step-badge" :style="{ background: getCurrentStepColor() }">
               步骤 {{ currentStep }}
             </div>
           </div>
           
           <div class="detail-divider"></div>

           <div class="detail-right">
             <div class="info-row">
               <span class="tag life">生活对话</span>
               <span class="text highlight">{{ steps[currentStep-1].simpleTitle }}</span>
             </div>
             <div class="info-row">
               <span class="tag tech">技术原理</span>
               <div class="tech-content">
                 <div class="tech-desc">{{ steps[currentStep-1].techDesc }}</div>
                 <!-- 动态名词解码卡片 -->
                 <div class="term-glossary">
                   <div v-for="term in steps[currentStep-1].terms" :key="term.key" class="term-item">
                     <span class="term-key">{{ term.key }}</span>
                     <span class="term-val">{{ term.val }}</span>
                   </div>
                 </div>

                 <!-- 代码实现细节 (折叠) -->
                 <details class="code-details" v-if="steps[currentStep-1].codeImpl">
                   <summary class="code-summary">
                     <span class="summary-icon">🛠️</span>
                     <span class="summary-text">技术深究：底层代码如何实现？</span>
                   </summary>
                   <div class="code-block-wrapper">
                     <div class="code-title">{{ steps[currentStep-1].codeImpl.title }}</div>
                    <pre class="code-block"><code v-html="steps[currentStep-1].codeImpl.code"></code></pre>
                  </div>
                </details>

                <!-- 技术问答 (折叠) - 仅在有问答时显示 -->
                <details class="code-details qa-details" v-if="steps[currentStep-1].qa">
                  <summary class="code-summary qa-summary">
                    <span class="summary-icon">🎓</span>
                    <span class="summary-text">{{ steps[currentStep-1].qa.title }}</span>
                  </summary>
                  <div class="code-block-wrapper qa-content">
                    <div v-for="(item, idx) in steps[currentStep-1].qa.content" :key="idx" class="qa-item">
                      <div class="qa-q">Q: {{ item.q }}</div>
                      <div class="qa-a" v-html="item.a"></div>
                    </div>
                  </div>
                </details>
               </div>
             </div>
           </div>

           <!-- 下一步按钮 -->
           <button 
             class="next-btn" 
             v-if="currentStep < 3"
             @click="nextStep"
           >
             下一步 ➔
           </button>
        </div>
        
        <div v-else class="detail-placeholder">
          <span class="guide-bounce">📞</span>
          <span>点击"开始拨号"或步骤圆点，开始拨打电话</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    simpleTitle: '喂，在家吗？我是快递员！',
    techTitle: 'SYN',
    techDesc: '客户端发送 SYN 包 (Seq=x)，请求建立连接。',
    color: '#3b82f6',
    terms: [
      { key: 'SYN', val: '是单词 Synchronize (同步) 的缩写。💡 为什么叫"同步"？因为建立连接的第一步，就是双方要"对表"，把暗号（序号）对齐，确保后续对话在同一个频道上。' },
      { key: 'Seq=x', val: '意思是："我的数据计数器，从 x 开始"。💡 为什么要特意告诉对方？这就像是两个人约定"暗号"。我告诉你："我的暗号是从 x 开始算的"。以后我每发给你一个字，暗号就加 1。如果你不知道我的起始暗号是 x，以后收到 x+100 你就不知道它是第几个字，也没法判断中间有没有丢字。' }
    ],
    codeImpl: {
      title: '💻 真实 TCP 报文构建 (伪代码)',
      code: `// 1. 设置标志位：只置 SYN
<span class="kw">tcph->syn</span> = 1;
<span class="kw">tcph->ack</span> = 0;

// 2. 生成随机序号 (Seq)
// 操作系统内核会维护一个计数器
// 这里的 htonl 是为了处理网络字节序
<span class="kw">tcph->seq</span> = htonl(<span class="var">random_x</span>); 

// 3. 发送数据包
send_packet(client_socket, tcph);`
    }
  },
  {
    simpleTitle: '在的！我听到了，请说！',
    techTitle: 'SYN-ACK',
    techDesc: '服务器回复 SYN-ACK 包 (Seq=y, Ack=x+1)，确认并请求连接。',
    color: '#10b981',
    terms: [
      { key: 'ACK', val: '是单词 Acknowledgment (确认) 的缩写。💡 就像快递签收单，表示"我收到你的请求了"。' },
      { key: 'Ack=x+1', val: '确认号。💡 为什么要 +1？这是一种期待机制。意思是："x 号那一页我已经收好了，请你下次从 x+1 页开始讲"。' },
      { key: 'Seq=y', val: '服务器也生成自己的随机序号 y，方便客户端确认服务器发来的话。' }
    ],
    codeImpl: {
      title: '💻 服务器内核响应逻辑 (伪代码)',
      code: `// 1. 检查收到的是否是 SYN
if (<span class="kw">recv_tcph->syn</span> == 1) {
    // 2. 准备回复包
    <span class="kw">reply_tcph->syn</span> = 1; // 同步
    <span class="kw">reply_tcph->ack</span> = 1; // 确认

    // 3. 确认号 = 对方 Seq + 1
    // 表示期待对方下一次发在这个序号之后的数据
    <span class="kw">reply_tcph->ack_seq</span> = htonl(ntohl(<span class="var">recv_tcph->seq</span>) + 1);

    // 4. 生成服务器自己的序号
    <span class="kw">reply_tcph->seq</span> = htonl(<span class="var">random_y</span>);
    
    send_packet(server_socket, reply_tcph);
}`
    }
  },
  {
    simpleTitle: '好的，那我开始说了！',
    techTitle: 'ACK',
    techDesc: '客户端发送 ACK 包 (Ack=y+1)，连接建立成功，可以传输数据。',
    color: '#8b5cf6',
    terms: [
      { key: 'Ack=y+1', val: '客户端确认收到。意思是："服务器你的 y 号信我也收到了，我们正式开始聊天吧！"' },
      { key: '连接建立', val: '双方都确认了对方"能听能说"，通道正式打通。' }
    ],
    codeImpl: {
      title: '💻 客户端最终确认 (伪代码)',
      code: `// 1. 检查收到的包
if (<span class="kw">recv_tcph->syn</span> == 1 && <span class="kw">recv_tcph->ack</span> == 1) {
    // 2. 准备 ACK 包
    <span class="kw">ack_tcph->syn</span> = 0; // 第三次握手不需要 SYN 了
    <span class="kw">ack_tcph->ack</span> = 1;

    // 3. 确认号 = 服务器 Seq + 1
    <span class="kw">ack_tcph->ack_seq</span> = htonl(ntohl(<span class="var">recv_tcph->seq</span>) + 1);
    
    // 4. 序号 = 自己的 Seq + 1
    <span class="kw">ack_tcph->seq</span> = htonl(<span class="var">my_seq</span> + 1);
    
    // 5. 连接状态变为 ESTABLISHED
    <span class="hl">socket->state = TCP_ESTABLISHED;</span>
    send_packet(client_socket, ack_tcph);
}`
    },
    qa: {
       title: '🤔 为什么必须是三次？(核心逻辑)',
       content: [
         {
           q: '为什么一定要三次？(双工确认原理)',
           a: `这其实是在验证<strong>双方的"听说能力"</strong>是否正常。TCP 是全双工的（双方都能同时发和收），所以必须双方都确认对方能发能收：<br>
           1️⃣ <strong>第一次 (Client -> Server)</strong>：Server 收到，证明 <strong>Client 能发</strong>，<strong>Server 能收</strong>。<br>
           2️⃣ <strong>第二次 (Server -> Client)</strong>：Client 收到，证明 <strong>Server 能发</strong>，<strong>Client 能收</strong>。同时 Client 知道 Server 收到了自己的第一次请求。<br>
           3️⃣ <strong>第三次 (Client -> Server)</strong>：Server 收到，证明 <strong>Client 能收</strong>（因为 Client 回复了 Server 的消息）。<br>
           <br>
           <strong>结论：</strong> 只有经过这三次，双方都明确知道"自己"和"对方"的发送、接收功能全是好的。少一次都不行（Server 不知道 Client 能不能收），多一次没必要。`
         },
         {
           q: '为什么这就算"连上"了？',
           a: `所谓的"连接建立"，在计算机里并不是真的拉了一根线。它的本质是：<strong>双方内存里都保存好了对方的"状态信息"</strong>。<br>
           通过这三次握手，双方主要完成了两件事：<br>
           1. <strong>确认通道畅通</strong>：就是上面说的双工能力确认。<br>
           2. <strong>同步初始序号 (ISN)</strong>：双方交换了 Seq (x 和 y)。<br>
           <br>
           只要双方都记住了对方的 Seq，并且确认了对方在线，操作系统就会把 Socket 状态标记为 <code style="color:#10b981">ESTABLISHED</code> (已建立)，这就叫"连上了"。`
         }
       ]
     }
  }
]

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const goToStep = (step) => {
  currentStep.value = step
}

const reset = () => {
  currentStep.value = 0
}

const getBubbleText = (stepIndex) => {
  // stepIndex 1: Client speaks (Step 1)
  // stepIndex 2: Server speaks (Step 2)
  if (stepIndex === 1) return steps[0].simpleTitle
  if (stepIndex === 2) return steps[1].simpleTitle
  return ''
}

const getSignalClass = () => {
  if (currentStep.value === 1) return 'sending' // Left to Right
  if (currentStep.value === 2) return 'receiving' // Right to Left
  if (currentStep.value === 3) return 'sending-final' // Left to Right
  return ''
}

const getSignalIcon = () => {
  return '🔔'
}

const getCurrentStepColor = () => {
  return steps[currentStep.value - 1]?.color || '#ccc'
}
</script>

<style scoped>
.tcp-compact {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 16px;
  margin: 16px 0;
  font-size: 14px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}


.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-brand);
}

.action-btn.outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

/* 舞台区 */
.stage-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0 30px;
  position: relative;
  margin-bottom: 20px;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  position: relative;
}

.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.avatar-icon { font-size: 32px; }
.avatar-label { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

/* 气泡 */
.bubble {
  position: absolute;
  top: -40px;
  background: white;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  white-space: nowrap;
  border: 1px solid var(--vp-c-divider);
  color: #333;
}
.bubble.client { left: 50%; transform: translateX(-50%); }
.bubble.server { left: 50%; transform: translateX(-50%); }

.pop-enter-active, .pop-leave-active { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateX(-50%) scale(0.8); }

/* 连接线 */
.connection-line {
  flex: 1;
  height: 2px;
  background: var(--vp-c-divider);
  margin: 0 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-badge {
  position: absolute;
  top: 15px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}
.status-badge.connected { color: var(--vp-c-brand); font-weight: bold; }

.signal-packet {
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  opacity: 0;
  top: -11px;
}

.signal-packet.sending {
  animation: moveRight 1.5s forwards;
  opacity: 1;
}

.signal-packet.receiving {
  animation: moveLeft 1.5s forwards;
  opacity: 1;
  background: #10b981;
}

.signal-packet.sending-final {
  animation: moveRight 1.5s forwards;
  opacity: 1;
  background: #8b5cf6;
}

@keyframes moveRight {
  0% { left: 0; }
  100% { left: 100%; }
}

@keyframes moveLeft {
  0% { left: 100%; }
  100% { left: 0; }
}

/* 步骤指示器 */
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
}

.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.step-dot.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
}

.step-dot.passed {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.dot-line {
  position: absolute;
  left: 24px;
  width: 40px;
  height: 2px;
  background: var(--vp-c-divider);
}

/* 详情面板 */
.detail-panel {
  min-height: 80px; /* 改为最小高度 */
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 12px 16px;
  display: flex;
  align-items: flex-start; /* 顶部对齐 */
  /* overflow: hidden; 移除隐藏 */
}

.detail-content {
  display: flex;
  width: 100%;
  align-items: flex-start; /* 顶部对齐 */
}

.detail-left {
  padding-right: 16px;
  border-right: 2px solid transparent;
  margin-top: 4px; /* 微调对齐 */
}

.step-badge {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}

.detail-divider {
  width: 1px;
  align-self: stretch; /* 拉伸高度 */
  background: var(--vp-c-divider);
  margin: 0 16px;
}

.detail-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px; /* 增加间距 */
  padding-bottom: 4px;
}

.info-row {
  display: flex;
  align-items: flex-start; /* 顶部对齐 */
  gap: 8px;
}

.tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
  margin-top: 2px;
}

.tag.life { background: #e6f7ff; color: #1890ff; }
.tag.tech { background: #f6ffed; color: #52c41a; }

.text {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.text.highlight {
  font-weight: 500;
  color: var(--vp-c-brand);
}

/* 新增：术语解释样式 */
.term-glossary {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(0,0,0,0.03);
  padding: 8px;
  border-radius: 6px;
}

.term-item {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.term-key {
  font-weight: bold;
  color: var(--vp-c-brand-dark);
  margin-right: 6px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  padding: 0 4px;
  border-radius: 3px;
}

.next-btn {
  padding: 6px 16px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 12px;
  margin-top: 4px;
  white-space: nowrap;
  align-self: flex-start; /* 按钮顶部对齐 */
}

.detail-placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-3);
  width: 100%;
  justify-content: center;
}

.guide-bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* 代码实现折叠块 */
.code-details {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.code-summary {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  user-select: none;
  background: rgba(0,0,0,0.02);
  transition: background 0.2s;
}

.code-summary:hover {
  background: rgba(0,0,0,0.05);
  color: var(--vp-c-brand);
}

.code-block-wrapper {
  padding: 12px;
  border-top: 1px solid var(--vp-c-divider);
  background: #282c34; /* 深色背景适合代码 */
  color: #abb2bf;
}

.code-title {
  font-size: 11px;
  color: #61afef;
  margin-bottom: 6px;
  font-family: monospace;
  font-weight: bold;
}

.code-block {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 语法高亮类 (深色模式) */
:deep(.kw) { color: #c678dd; } /* 紫色 - 关键字/字段 */
:deep(.var) { color: #d19a66; } /* 橙色 - 变量 */
:deep(.hl) { color: #98c379; font-weight: bold; } /* 绿色 - 高亮行 */

/* 问答折叠块 */
.qa-details {
  background: rgba(255, 165, 0, 0.05); /* 淡淡的橙色背景 */
  border-color: rgba(255, 165, 0, 0.2);
}

.qa-summary {
  color: #d46b08;
}

.qa-summary:hover {
  color: #ff7a45;
  background: rgba(255, 165, 0, 0.1);
}

.qa-content {
  background: var(--vp-c-bg); /* 恢复浅色/深色背景 */
  color: var(--vp-c-text-1);
  padding: 16px;
}

.qa-item {
  margin-bottom: 12px;
}
.qa-item:last-child { margin-bottom: 0; }

.qa-q {
  font-weight: bold;
  font-size: 13px;
  color: var(--vp-c-brand-dark);
  margin-bottom: 4px;
}

.qa-a {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
