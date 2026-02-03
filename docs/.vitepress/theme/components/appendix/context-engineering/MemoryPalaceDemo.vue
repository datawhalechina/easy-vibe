<!--
 * Component: MemoryPalaceDemo.vue
 * Description: Visualizes the "Memory Palace" 4-layer context structure.
 * Features:
 *  - Step-by-step assembly of the context layers
 *  - Visual distinction between Static (Cached) and Dynamic parts
 *  - Explains the purpose of each layer
-->

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const steps = [
  { 
    id: 'base',
    title: '第一层：地基 (System)',
    desc: '系统设定、身份、原则',
    detail: '✅ 永远不变，利用 KV Cache 实现 0 成本背诵',
    color: 'var(--vp-c-brand)',
    icon: '🏛️'
  },
  { 
    id: 'task',
    title: '第二层：支柱 (Task)',
    desc: '当前任务目标、用户画像',
    detail: '📌 任务期内“钉死”，保证方向不偏',
    color: '#8e44ad',
    icon: '📌'
  },
  { 
    id: 'chat',
    title: '第三层：客厅 (Chat)',
    desc: '最近 5-10 轮对话',
    detail: '🔄 滑动窗口，旧的自动腾出空间',
    color: '#e67e22',
    icon: '💬'
  },
  { 
    id: 'rag',
    title: '第四层：图书馆 (RAG)',
    desc: '按需检索的知识',
    detail: '📚 不占脑子，用时再查，无限扩展',
    color: '#27ae60',
    icon: '🔍'
  }
]

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    currentStep.value = 0
  }
}

const isComplete = computed(() => currentStep.value === 4)
</script>

<template>
  <div class="memory-palace-demo">
    
    <!-- Visual Area -->
    <div class="palace-container">
      <div class="palace-stack">
        <!-- Layer 4: RAG (Top/Side) -->
        <div 
          class="layer-block rag-layer" 
          :class="{ visible: currentStep >= 4 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[3].icon }}</span>
            <div class="text">
              <div class="layer-title">{{ steps[3].title }}</div>
              <div class="layer-desc">{{ steps[3].desc }}</div>
            </div>
          </div>
          <div class="layer-detail" v-if="currentStep >= 4">{{ steps[3].detail }}</div>
        </div>

        <!-- Layer 3: Chat -->
        <div 
          class="layer-block chat-layer" 
          :class="{ visible: currentStep >= 3 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[2].icon }}</span>
            <div class="text">
              <div class="layer-title">{{ steps[2].title }}</div>
              <div class="layer-desc">{{ steps[2].desc }}</div>
            </div>
          </div>
          <div class="layer-detail" v-if="currentStep >= 3">{{ steps[2].detail }}</div>
        </div>

        <!-- Layer 2: Task -->
        <div 
          class="layer-block task-layer" 
          :class="{ visible: currentStep >= 2 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[1].icon }}</span>
            <div class="text">
              <div class="layer-title">{{ steps[1].title }}</div>
              <div class="layer-desc">{{ steps[1].desc }}</div>
            </div>
          </div>
          <div class="layer-detail" v-if="currentStep >= 2">{{ steps[1].detail }}</div>
        </div>

        <!-- Layer 1: Base -->
        <div 
          class="layer-block base-layer" 
          :class="{ visible: currentStep >= 1 }"
        >
          <div class="layer-content">
            <span class="icon">{{ steps[0].icon }}</span>
            <div class="text">
              <div class="layer-title">{{ steps[0].title }}</div>
              <div class="layer-desc">{{ steps[0].desc }}</div>
            </div>
          </div>
          <div class="layer-detail" v-if="currentStep >= 1">{{ steps[0].detail }}</div>
        </div>
        
        <!-- Empty State Placeholder -->
        <div class="empty-placeholder" v-if="currentStep === 0">
          🚧 空地：点击下方按钮开始建造记忆宫殿
        </div>
      </div>
    </div>

    <!-- Control Area -->
    <div class="control-area">
      <div class="step-indicator">
        当前进度: {{ currentStep }}/4
      </div>
      <button class="build-btn" @click="nextStep" :class="{ 'reset-mode': isComplete }">
        {{ isComplete ? '🔄 重置重建' : (currentStep === 0 ? '🏗️ 开始建造' : '➕ 添加下一层') }}
      </button>
    </div>

    <!-- Explanation Box -->
    <div class="explanation-box" v-if="currentStep > 0">
      <div class="exp-title">为什么这样设计？</div>
      <div class="exp-content" v-if="currentStep === 1">
        **地基最稳**：把 System Prompt 放在最前面，利用 KV Cache 机制，让 AI "背下来"，后续请求**速度快且免费**。
      </div>
      <div class="exp-content" v-if="currentStep === 2">
        **目标明确**：无论聊得多嗨，任务目标（如“写一个 Python 爬虫”）必须**钉死**，防止 AI 聊偏了。
      </div>
      <div class="exp-content" v-if="currentStep === 3">
        **保持鲜活**：最近的对话最重要，用滑动窗口保留，**旧的自动忘掉**，给新信息腾地方。
      </div>
      <div class="exp-content" v-if="currentStep === 4">
        **无限外脑**：遇到不懂的，不要瞎编，去“图书馆”查资料。**用完即走**，不占宝贵的脑容量。
      </div>
    </div>

  </div>
</template>

<style scoped>
.memory-palace-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  margin: 1.5rem 0;
  overflow: hidden;
}

.palace-container {
  padding: 2rem;
  min-height: 320px;
  display: flex;
  align-items: flex-end; /* Stack from bottom */
  justify-content: center;
  background: linear-gradient(to top, var(--vp-c-bg-alt), var(--vp-c-bg));
}

.palace-stack {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column-reverse; /* Stack from bottom */
  gap: 8px;
  position: relative;
}

.layer-block {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-block.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Layer Specific Styles */
.base-layer {
  border-color: var(--vp-c-brand);
  border-bottom-width: 6px; /* Heavy foundation */
  background: var(--vp-c-brand-dimm);
}

.task-layer {
  border-color: #8e44ad;
  background: rgba(142, 68, 173, 0.1);
  margin: 0 10px; /* Slightly narrower */
}

.chat-layer {
  border-color: #e67e22;
  background: rgba(230, 126, 34, 0.1);
  margin: 0 20px; /* Narrower */
}

.rag-layer {
  border-color: #27ae60;
  border-style: dashed;
  background: rgba(39, 174, 96, 0.1);
  margin: 0 30px; /* Narrowest */
}

.layer-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.layer-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.layer-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.layer-detail {
  font-size: 0.75rem;
  background: rgba(255,255,255,0.5);
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  display: inline-block;
  align-self: flex-start;
}
.dark .layer-detail {
  background: rgba(0,0,0,0.3);
}

.empty-placeholder {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
}

/* Controls */
.control-area {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-indicator {
  font-family: var(--vp-font-mono);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.build-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

.build-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.build-btn.reset-mode {
  background: var(--vp-c-text-3);
}

/* Explanation */
.explanation-box {
  padding: 1rem;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
}

.exp-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.exp-content {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
