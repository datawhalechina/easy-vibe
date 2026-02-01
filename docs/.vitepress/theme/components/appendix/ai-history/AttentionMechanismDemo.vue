<template>
  <div class="attention-mechanism-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>👁️ 注意力机制演示</h4>
          <p class="subtitle">点击词语，观察它如何"关注"句子中的其他词</p>
        </div>
      </template>

      <div class="sentence-container">
        <div class="sentence">
          <el-tag
            v-for="(word, index) in sentence"
            :key="index"
            :type="activeIndex === index ? 'primary' : 'info'"
            :effect="activeIndex === index ? 'dark' : 'plain'"
            class="word-token"
            @click="selectWord(index)"
          >
            {{ word }}
          </el-tag>
        </div>

        <div class="attention-bars" v-if="activeIndex !== null">
          <div
            v-for="(attention, index) in attentionWeights"
            :key="index"
            class="attention-item"
          >
            <div class="word-label">{{ attention.word }}</div>
            <el-progress
              :percentage="Math.round(attention.weight * 100)"
              :status="attention.weight > 0.5 ? 'exception' : ''"
              :color="customColors"
              class="attention-progress"
            />
          </div>
        </div>
        <el-empty
          v-else
          description="👆 点击句子中的任意词语开始"
          :image-size="60"
        />
      </div>

      <el-collapse-transition>
        <div v-if="activeIndex !== null" class="explanation-panel">
          <el-alert
            type="success"
            :closable="false"
            show-icon
            class="insight-alert"
          >
            <template #title>
              <span class="insight-title">关键洞察</span>
            </template>
            <p>{{ getInsight(activeIndex) }}</p>
          </el-alert>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sentence = ref(['小明', '把', '苹果', '给了', '他', '的', '母亲'])
const activeIndex = ref(null)

const customColors = [
  { color: '#909399', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#f56c6c', percentage: 80 },
  { color: '#67c23a', percentage: 100 }
]

// 注意力权重矩阵（模拟）
const attentionMatrix = {
  0: [0.15, 0.05, 0.6, 0.05, 0.05, 0.05, 0.05], // 小明 主要关注 苹果、他
  1: [0.1, 0.1, 0.4, 0.3, 0.05, 0.03, 0.02], // 把 主要关注 苹果、给了
  2: [0.5, 0.1, 0.15, 0.15, 0.05, 0.03, 0.02], // 苹果 主要关注 小明
  3: [0.1, 0.1, 0.35, 0.15, 0.2, 0.05, 0.05], // 给了 主要关注 苹果、他
  4: [0.65, 0.05, 0.1, 0.1, 0.05, 0.03, 0.02], // 他 主要关注 小明
  5: [0.08, 0.05, 0.07, 0.08, 0.62, 0.05, 0.05], // 的 主要关注 他
  6: [0.25, 0.1, 0.15, 0.15, 0.2, 0.1, 0.05] // 母亲 关注多个词
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
  return insights[index]
}
</script>

<style scoped>
.attention-mechanism-demo {
  margin: 20px 0;
}

.card-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 4px 0 0;
}

.sentence {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
}

.word-token {
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  transition: all 0.2s;
}

.word-token:hover {
  transform: translateY(-2px);
}

.attention-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.attention-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.word-label {
  width: 40px;
  text-align: right;
  font-weight: bold;
  font-size: 14px;
}

.attention-progress {
  flex: 1;
}

.explanation-panel {
  margin-top: 16px;
}

.insight-title {
  font-weight: bold;
  font-size: 14px;
}
</style>
