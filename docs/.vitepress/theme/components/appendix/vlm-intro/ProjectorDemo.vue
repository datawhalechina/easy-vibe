<!--
  ProjectorDemo.vue
  投射器（Projector）原理演示
-->
<template>
  <div class="projector-demo">
    <div class="mode-switch">
      <button :class="{ active: mode === 'linear' }" @click="mode = 'linear'">
        Linear (LLaVA)
      </button>
      <button :class="{ active: mode === 'qformer' }" @click="mode = 'qformer'">
        Q-Former (BLIP-2)
      </button>
    </div>

    <div class="pipeline">
      <!-- Input: Visual Tokens -->
      <div class="stage">
        <div class="label">Visual Tokens (ViT)</div>
        <div class="token-container input">
          <div v-for="n in 16" :key="n" class="token visual"></div>
        </div>
        <div class="count">
          {{ mode === 'linear' ? '256 Tokens' : '256 Tokens' }}
        </div>
      </div>

      <!-- Process: The Projector -->
      <div class="stage connector">
        <div class="arrow-line"></div>
        <div class="projector-box" :class="mode">
          <div class="title">
            {{ mode === 'linear' ? 'Linear Layer' : 'Q-Former' }}
          </div>
          <div class="desc">
            {{ mode === 'linear' ? '直接映射 (1:1)' : '查询提取 (N:M)' }}
          </div>
          <div class="animation-dots" v-if="mode === 'qformer'">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="arrow-line"></div>
      </div>

      <!-- Output: LLM Tokens -->
      <div class="stage">
        <div class="label">LLM Tokens</div>
        <div class="token-container output">
          <div
            v-for="n in mode === 'linear' ? 16 : 4"
            :key="n"
            class="token llm"
          ></div>
        </div>
        <div class="count">
          {{
            mode === 'linear'
              ? '256 Tokens (保留全部细节)'
              : '32 Tokens (只保留关键信息)'
          }}
        </div>
      </div>
    </div>

    <div class="explanation">
      <div v-if="mode === 'linear'">
        <strong>Linear Projector:</strong>
        简单高效。它像一个直译器，保留了所有的视觉信息，虽然 Token
        数量多（计算量大），但对细节的把控更好。
      </div>
      <div v-else>
        <strong>Q-Former:</strong>
        精细优雅。它使用一组“查询向量”主动去图像中提取与文本相关的信息。大大压缩了
        Token 数量，让 LLM 跑得更快。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('linear')
</script>

<style scoped>
.projector-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.mode-switch {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.mode-switch button {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.mode-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.pipeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.label {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.token-container {
  display: grid;
  gap: 4px;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.token-container.input {
  grid-template-columns: repeat(4, 1fr);
}

.token-container.output {
  grid-template-columns: repeat(4, 1fr);
}

.token {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.token.visual {
  background-color: #3b82f6;
}

.token.llm {
  background-color: #10b981;
}

.connector {
  flex: 0.5;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.projector-box {
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  min-width: 100px;
  transition: all 0.3s;
}

.projector-box.qformer {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

.title {
  font-weight: bold;
  font-size: 0.9em;
}

.desc {
  font-size: 0.7em;
  color: var(--vp-c-text-2);
}

.count {
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

.explanation {
  margin-top: 20px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.6;
}

.arrow-line {
  height: 2px;
  background: var(--vp-c-divider);
  flex-grow: 1;
}

.animation-dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #8b5cf6;
  animation: pulse 1s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
