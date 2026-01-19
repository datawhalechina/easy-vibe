<template>
  <div class="attention-mechanism-demo">
    <div class="demo-header">
      <h4>👁️ 注意力机制演示</h4>
      <p>点击词语，观察它如何"关注"句子中的其他词</p>
    </div>

    <div class="sentence-container">
      <div class="sentence">
        <span
          v-for="(word, index) in sentence"
          :key="index"
          :class="['word-token', { active: activeIndex === index, source: activeIndex === index }]"
          @click="selectWord(index)"
        >
          {{ word }}
        </span>
      </div>

      <div class="attention-heatmap">
        <transition-group name="fade">
          <div
            v-for="(attention, index) in attentionWeights"
            :key="index"
            v-show="activeIndex !== null"
            :class="['attention-bar', { highlight: attention.weight > 0.5 }]"
            :style="{ width: (attention.weight * 100) + '%', opacity: activeIndex !== null ? 1 : 0 }"
          >
            <span class="attention-label">{{ attention.word }}: {{ (attention.weight * 100).toFixed(0) }}%</span>
          </div>
        </transition-group>
      </div>
    </div>

    <div class="explanation-panel">
      <div v-if="activeIndex !== null" class="explanation-content">
        <h5>当前词: "{{ sentence[activeIndex] }}"</h5>
        <p><strong>注意力权重:</strong></p>
        <ul>
          <li v-for="(item, index) in attentionWeights" :key="index">
            "{{ item.word }}" - {{ (item.weight * 100).toFixed(0) }}% 的关注度
          </li>
        </ul>
        <p class="insight">
          💡 <strong>关键洞察:</strong> {{ getInsight(activeIndex) }}
        </p>
      </div>
      <div v-else class="placeholder">
        👆 点击句子中的任意词语开始
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sentence = ref(['小明', '把', '苹果', '给了', '他', '的', '母亲'])
const activeIndex = ref(null)

// 注意力权重矩阵（模拟）
const attentionMatrix = {
  0: [0.15, 0.05, 0.60, 0.05, 0.05, 0.05, 0.05], // 小明 主要关注 苹果、他
  1: [0.10, 0.10, 0.40, 0.30, 0.05, 0.03, 0.02], // 把 主要关注 苹果、给了
  2: [0.50, 0.10, 0.15, 0.15, 0.05, 0.03, 0.02], // 苹果 主要关注 小明
  3: [0.10, 0.10, 0.35, 0.15, 0.20, 0.05, 0.05], // 给了 主要关注 苹果、他
  4: [0.65, 0.05, 0.10, 0.10, 0.05, 0.03, 0.02], // 他 主要关注 小明
  5: [0.08, 0.05, 0.07, 0.08, 0.62, 0.05, 0.05], // 的 主要关注 他
  6: [0.25, 0.10, 0.15, 0.15, 0.20, 0.10, 0.05]  // 母亲 关注多个词
}

const insights = {
  0: '当模型处理"小明"时，它最关注"苹果"（60%），因为这表明是"谁"拥有苹果。',
  1: '"把"是介词，模型关注"苹果"和"给了"，理解动作的对象和方向。',
  2: '"苹果"作为宾语，主要关注主语"小明"，确定归属关系。',
  3: '"给了"关注"苹果"和"他"，理解传递动作的对象。',
  4: '"他"最关注"小明"（65%），因为"他"指代的就是"小明"！',
  5: '"的"连接"他"和"母亲"，主要关注"他"（62%）。',
  6: '"母亲"作为句末宾语，关注前面的多个词语来理解完整语境。'
}

const attentionWeights = computed(() => {
  if (activeIndex.value === null) return []

  return sentence.value.map((word, index) => ({
    word,
    weight: attentionMatrix[activeIndex.value][index]
  }))
})

const selectWord = (index) => {
  activeIndex.value = index
}

const getInsight = (index) => {
  return insights[index] || '模型正在理解这个词的上下文关系。'
}
</script>

<style scoped>
.attention-mechanism-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.demo-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.sentence-container {
  background: var(--vp-c-bg);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.sentence {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.word-token {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--vp-c-text-1);
  user-select: none;
  border: 1px solid var(--vp-c-divider);
}

.word-token:hover {
  border-color: var(--vp-c-brand);
}

.word-token.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.attention-heatmap {
  min-height: 150px;
}

.attention-bar {
  margin-bottom: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(var(--vp-c-brand-rgb), 0.2);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.25);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.5s ease;
}

.attention-bar.highlight {
  background: rgba(var(--vp-c-brand-rgb), 0.35);
  border-color: rgba(var(--vp-c-brand-rgb), 0.4);
}

.attention-label {
  white-space: nowrap;
}

.explanation-panel {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.explanation-content h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
}

.explanation-content p {
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.explanation-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.explanation-content li {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-brand);
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
}

.insight {
  padding: 1rem;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.15);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.placeholder {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
