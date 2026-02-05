<script setup>
import { ref, computed } from 'vue'

const round = ref(1)
const maxRound = 20
const windowLimit = 4000 

// 模拟数据配置
const systemPromptTokens = 1000 
const tokensPerRound = 300 
const costPer1kTokens = 0.002 

// 计算属性
const historyTokens = computed(() => (round.value - 1) * tokensPerRound)
const currentInputTokens = 200 
const totalTokens = computed(() => systemPromptTokens + historyTokens.value + currentInputTokens)

// 是否溢出
const isOverflow = computed(() => totalTokens.value > windowLimit)
const overflowAmount = computed(() => Math.max(0, totalTokens.value - windowLimit))
const forgottenRounds = computed(() => Math.floor(overflowAmount.value / tokensPerRound))

// 成本计算
const currentCost = computed(() => (totalTokens.value / 1000 * costPer1kTokens).toFixed(4))

// 高度计算 (相对于 windowLimit)
const systemHeight = computed(() => (systemPromptTokens / windowLimit) * 100)
const inputHeight = computed(() => (currentInputTokens / windowLimit) * 100)
// History 高度展示逻辑：
// 我们希望展示“总高度”，即使超过 100%。
// 父容器会限制显示区域，溢出部分通过视觉暗示。
const historyHeight = computed(() => (historyTokens.value / windowLimit) * 100)

const totalHeight = computed(() => systemHeight.value + historyHeight.value + inputHeight.value)
</script>

<template>
  <div class="agent-context-flow">
    <!-- 1. 顶部统计栏 -->
    <div class="control-panel">
      <div class="stat-group">
        <div class="stat-item">
          <span class="value">{{ round }}</span>
          <span class="label">当前轮次</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="value" :class="{ error: isOverflow }">{{ totalTokens }}</span>
          <span class="label">Token 占用</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="value">${{ currentCost }}</span>
          <span class="label">本轮成本</span>
        </div>
      </div>
    </div>

    <!-- 2. 可视化区域 -->
    <div class="visualization-area">
      <!-- 上方预留空间给溢出提示 -->
      <div class="overflow-zone">
        <transition name="fade">
          <div v-if="isOverflow" class="overflow-badge">
            <span class="icon">🗑️</span>
            <span>溢出截断：前 {{ forgottenRounds }} 轮对话已被遗忘！</span>
          </div>
          <div v-else class="safe-badge">
            <span class="icon">✅</span>
            <span>记忆完整</span>
          </div>
        </transition>
      </div>

      <!-- 窗口容器 -->
      <div class="window-frame">
        <div class="limit-line">
          <span>Context Window Limit ({{ windowLimit }})</span>
        </div>

        <!-- 堆叠内容容器 -->
        <!-- 使用 flex-direction: column-reverse 让底部对齐 -->
        <div class="stack-container">
          
          <!-- System (基座) -->
          <div class="block system" :style="{ height: `${systemHeight}%` }">
            <span class="block-text">System Prompt ({{ systemPromptTokens }})</span>
          </div>

          <!-- History (中间) -->
          <div class="block history" :style="{ height: `${historyHeight}%` }">
            <span class="block-text" v-if="historyHeight > 10">
              History ({{ round - 1 }} rounds)
            </span>
            <!-- 溢出遮罩：当溢出时，History 的底部实际上是被“挤出去”的 -->
            <!-- 但为了可视化简单，我们让顶部溢出。或者，我们让整个 stack 向上移动？ -->
            <!-- 修正逻辑：Context Window 只有那么大。内容是先进先出。 -->
            <!-- 所以 System 永远在。History 的旧内容被挤出。New 在最上。 -->
            <!-- 这里的可视化：如果不溢出，自底向上堆叠。 -->
            <!-- 如果溢出，System 在底，New 在顶，History 中间部分被挤压/溢出？ -->
            <!-- 不，真实的 LLM 是滑动窗口。System 通常是 Pinned。 -->
            <!-- 让我们展示“总量”超过“窗口”。 -->
          </div>

          <!-- Input (最新) -->
          <div class="block input" :style="{ height: `${inputHeight}%` }">
            <span class="block-text">New Input</span>
          </div>
          
        </div>
        
        <!-- 溢出遮罩层：如果 totalHeight > 100%，显示一个红色的遮罩在顶部，表示这部分虽然生成了但塞不进去/或者旧的被挤走了 -->
        <!-- 为了简化，我们让 stack-container 的高度允许超过 100%，然后 window-frame overflow: hidden -->
        <!-- 但这样用户看不到溢出了多少。 -->
        <!-- 更好的方式：window-frame 是视口。stack-container 绝对定位。 -->
      </div>
    </div>

    <!-- 3. 底部控制 -->
    <div class="input-section">
      <div class="slider-wrapper">
        <span class="slider-hint">拖动滑块增加对话轮次：</span>
        <input 
          type="range" 
          min="1" 
          :max="maxRound" 
          v-model.number="round" 
          class="custom-slider"
        />
        <div class="slider-labels">
          <span>第 1 轮</span>
          <span>第 {{ maxRound }} 轮</span>
        </div>
      </div>
      
      <div class="info-box">
        <p v-if="!isOverflow">
          💡 <strong>一切正常</strong>：当前 Token 数 ({{ totalTokens }}) 未超过窗口限制。模型能完美回忆起所有对话细节。
        </p>
        <p v-else class="warning-text">
          ⚠️ <strong>发生遗忘</strong>：Token 总量 ({{ totalTokens }}) 已超过窗口限制 ({{ windowLimit }})。
          为了放入新对话，系统被迫丢弃了最早的 <strong>{{ forgottenRounds }}</strong> 轮历史记录。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-context-flow {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1rem 0;
}

/* 1. 顶部统计栏 */
.control-panel {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.stat-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-item .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.stat-item .value.error {
  color: var(--vp-c-red);
}

.stat-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background-color: var(--vp-c-divider);
}

/* 2. 可视化区域 */
.visualization-area {
  padding: 1rem 2rem;
  background-color: var(--vp-c-bg-alt); /* 稍微深一点的背景 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.overflow-zone {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overflow-badge {
  color: var(--vp-c-red);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-red-dimm);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.safe-badge {
  color: var(--vp-c-green);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-frame {
  width: 100%;
  max-width: 300px; /* 限制宽度，像手机屏幕 */
  height: 300px;
  border: 2px solid var(--vp-c-divider);
  border-top: 2px dashed var(--vp-c-red); /* 顶部虚线表示 Limit */
  border-radius: 0 0 8px 8px;
  background: var(--vp-c-bg);
  position: relative;
  display: flex;
  flex-direction: column-reverse; /* 底部对齐 */
  overflow: visible; /* 允许溢出显示 */
}

.limit-line {
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.limit-line span {
  background: var(--vp-c-red);
  color: white;
  font-size: 0.75rem;
  padding: 0 8px;
  border-radius: 10px;
}

.stack-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse; /* 让 System 在最底 */
  /* 这里不设 overflow: hidden，让它自然溢出，但是我们通过高度控制 */
}

.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.block-text {
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.block.system {
  background-color: #10b981; /* Green */
  flex-shrink: 0; /* System 不会被压缩 */
}

.block.history {
  background-color: #3b82f6; /* Blue */
  /* 溢出逻辑：当高度增加时，history 会向上顶 */
}

.block.input {
  background-color: #f59e0b; /* Amber */
  flex-shrink: 0;
}

/* 溢出样式处理 */
/* 当总高度超过 100% 时，stack-container 会溢出 window-frame */
/* 我们希望溢出的部分变红或者虚化 */

/* 3. 底部控制 */
.input-section {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-hint {
  font-size: 0.9rem;
  font-weight: 600;
}

.custom-slider {
  width: 100%;
  accent-color: var(--vp-c-brand);
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box p {
  margin: 0;
}

.warning-text {
  color: var(--vp-c-red-text);
}

/* 移动端适配 */
@media (max-width: 640px) {
  .stat-group {
    gap: 0.5rem;
  }
  .stat-item .value {
    font-size: 1.2rem;
  }
  .window-frame {
    height: 250px;
  }
}
</style>