<template>
  <div class="prompt-visualizer">
    <div class="demo-container">
      <!-- Left: Prompt -->
      <div class="prompt-section">
        <div class="section-title">📝 提示词</div>
        <div class="prompt-input">
          "cyberpunk cat, neon lights, futuristic city"
        </div>

        <div class="token-list">
          <div
            v-for="(token, index) in tokens"
            :key="index"
            class="token-item"
            :style="{ opacity: token.weight }"
          >
            <div class="token-text">{{ token.text }}</div>
            <div class="token-weight">
              权重: {{ (token.weight * 100).toFixed(0) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Attention Visualization -->
      <div class="attention-section">
        <div class="section-title">🎯 交叉注意力可视化</div>
        <div class="attention-grid">
          <div
            v-for="(item, index) in attentionMap"
            :key="index"
            class="attention-cell"
          >
            <div class="cell-token">{{ item.token }}</div>
            <div class="cell-bar">
              <div
                class="bar-fill"
                :style="{ width: item.attention * 100 + '%' }"
              ></div>
            </div>
            <div class="cell-value">
              {{ (item.attention * 100).toFixed(0) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <p>
        <span class="icon">💡</span>
        <strong>交叉注意力机制</strong>让 AI 理解提示词的每个词。
        当生成图片时，AI 会"关注"不同的词： "cyberpunk" 影响整体风格，"cat"
        决定主体，"neon lights" 控制灯光效果。 词的顺序和权重都会影响最终画面！
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tokens = ref([
  { text: 'cyberpunk', weight: 0.9 },
  { text: 'cat', weight: 1.0 },
  { text: 'neon', weight: 0.7 },
  { text: 'lights', weight: 0.6 },
  { text: 'futuristic', weight: 0.8 },
  { text: 'city', weight: 0.5 }
])

const attentionMap = ref([
  { token: 'cyberpunk', attention: 0.9 },
  { token: 'cat', attention: 1.0 },
  { token: 'neon', attention: 0.7 },
  { token: 'lights', attention: 0.6 },
  { token: 'futuristic', attention: 0.8 },
  { token: 'city', attention: 0.5 }
])
</script>

<style scoped>
.prompt-visualizer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.prompt-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
}

.prompt-input {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.token-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.token-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.token-text {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.token-weight {
  color: var(--vp-c-brand);
  font-size: 0.75rem;
}

.attention-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
}

.attention-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attention-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
}

.cell-token {
  width: 80px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.cell-bar {
  flex: 1;
  height: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.cell-value {
  width: 40px;
  text-align: right;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.8rem;
}

.explanation {
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
