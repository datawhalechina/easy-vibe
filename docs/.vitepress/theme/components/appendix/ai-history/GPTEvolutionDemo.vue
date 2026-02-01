<template>
  <div class="gpt-evolution-demo">
    <el-card shadow="hover" class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">🚀 GPT 进化历程</span>
          <span class="subtitle">从 GPT-1 到 GPT-4 的演进之路</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- Replace Vertical Timeline with Horizontal Tabs -->
        <el-tabs v-model="activeModelName" type="card" class="evolution-tabs" @tab-click="handleTabClick">
          <el-tab-pane
            v-for="(model, index) in gptModels"
            :key="index"
            :label="model.name"
            :name="model.name"
          >
            <div class="model-view">
              <div class="model-info-header">
                <el-tag effect="dark" size="large">{{ model.year }}</el-tag>
                <div class="model-stats">
                  <div class="stat-item">
                    <span class="label">参数量</span>
                    <span class="value">{{ model.parameters }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="label">上下文</span>
                    <span class="value">{{ model.context }}</span>
                  </div>
                </div>
              </div>

              <div class="model-description">
                <p>{{ model.description }}</p>
              </div>

              <div class="model-milestones">
                <span class="section-label">🎯 关键能力:</span>
                <div class="tags-container">
                  <el-tag 
                    v-for="(milestone, i) in model.milestones" 
                    :key="i" 
                    size="small" 
                    class="milestone-tag"
                  >
                    {{ milestone }}
                  </el-tag>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-divider class="compact-divider">进化趋势</el-divider>

        <div class="evolution-insight">
          <div class="insight-row">
            <div class="insight-item">
              <el-icon><TrendCharts /></el-icon>
              <div class="insight-text">
                <span class="label">参数量增长</span>
                <span class="value">10000倍+</span>
              </div>
            </div>
            <div class="insight-item">
              <el-icon><ChatDotSquare /></el-icon>
              <div class="insight-text">
                <span class="label">对话能力</span>
                <span class="value">单轮 &rarr; 多轮</span>
              </div>
            </div>
            <div class="insight-item">
              <el-icon><Cpu /></el-icon>
              <div class="insight-text">
                <span class="label">逻辑推理</span>
                <span class="value">弱 &rarr; 强</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TrendCharts, ChatDotSquare, Cpu } from '@element-plus/icons-vue'

const activeModelName = ref('GPT-1')

const gptModels = [
  {
    name: 'GPT-1',
    year: '2018',
    parameters: '1.17 亿',
    paramDetail: '117 Million',
    context: '512 tokens',
    contextDetail: '约 1 页文本',
    capability: '无监督预训练',
    description: '开创性地使用了 Transformer 解码器进行预训练，证明了无监督学习在 NLP 中的潜力。',
    milestones: ['预训练+微调范式', 'BookCorpus 数据集', '单向 Transformer']
  },
  {
    name: 'GPT-2',
    year: '2019',
    parameters: '15 亿',
    paramDetail: '1.5 Billion',
    context: '1024 tokens',
    contextDetail: '约 2 页文本',
    capability: '零样本任务',
    description: '参数量扩大 10 倍，展示了惊人的零样本（Zero-shot）能力，能生成连贯的文本。',
    milestones: ['WebText 数据集', 'Zero-shot Learning', '生成长文本']
  },
  {
    name: 'GPT-3',
    year: '2020',
    parameters: '1750 亿',
    paramDetail: '175 Billion',
    context: '2048 tokens',
    contextDetail: '约 4 页文本',
    capability: '上下文学习 (ICL)',
    description: '参数量爆炸式增长，涌现出上下文学习能力（In-Context Learning），无需微调即可完成任务。',
    milestones: ['Few-shot Learning', 'Common Crawl', '能力涌现']
  },
  {
    name: 'GPT-4',
    year: '2023',
    parameters: '1.8 万亿 (推测)',
    paramDetail: '1.8 Trillion (Est.)',
    context: '128k tokens',
    contextDetail: '约 300 页书',
    capability: '多模态 & 推理',
    description: '引入多模态能力（识图），逻辑推理和代码能力大幅提升，支持超长上下文。',
    milestones: ['多模态输入', 'MoE 架构', 'RLHF 对齐', '考试高手']
  }
]

const handleTabClick = (tab) => {
  // activeModelName updated automatically
}
</script>

<style scoped>
.gpt-evolution-demo {
  margin: 10px 0;
}

.main-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.subtitle {
  font-size: 12px;
  color: #909399;
}

/* Compact Tabs */
.evolution-tabs :deep(.el-tabs__header) {
  margin-bottom: 15px;
}

.model-view {
  padding: 0 10px;
}

.model-info-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
}

.model-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-item .label {
  font-size: 12px;
  color: #909399;
}

.stat-item .value {
  font-weight: bold;
  color: #409eff;
  font-size: 14px;
}

.model-description {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.model-milestones {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.section-label {
  font-size: 13px;
  font-weight: bold;
  color: #303133;
}

.milestone-tag {
  margin-right: 4px;
}

.compact-divider {
  margin: 15px 0;
}

.evolution-insight {
  background-color: #f0f9eb;
  padding: 10px;
  border-radius: 4px;
}

.insight-row {
  display: flex;
  justify-content: space-around;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.insight-text {
  display: flex;
  flex-direction: column;
}

.insight-text .label {
  font-size: 12px;
  color: #67c23a;
}

.insight-text .value {
  font-weight: bold;
  font-size: 13px;
  color: #303133;
}

@media (max-width: 600px) {
  .insight-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>