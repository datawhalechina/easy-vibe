<template>
  <div class="ai-evolution-timeline-demo">
    <el-card shadow="hover" class="main-card">
      <template #header>
        <div class="card-header">
          <h3>AI 进化时间轴</h3>
          <p class="subtitle">点击不同时期，查看 AI 是如何一步步进化的</p>
        </div>
      </template>

      <div class="demo-content">
        <el-tabs v-model="activeEraName" type="border-card" class="timeline-tabs">
          <el-tab-pane
            v-for="(era, index) in eras"
            :key="index"
            :label="era.title"
            :name="era.title"
          >
            <div class="era-content">
              <div class="era-header">
                <el-tag effect="dark" size="large" class="year-tag">{{ era.year }}</el-tag>
                <span class="era-desc-short">{{ era.desc }}</span>
              </div>
              
              <div class="era-body">
                <p class="full-desc">{{ era.fullDesc }}</p>
                
                <div class="info-grid">
                  <div class="info-column">
                    <span class="column-title">💡 核心特点</span>
                    <ul class="key-points-list">
                      <li v-for="(point, i) in era.keyPoints" :key="i">
                        <el-icon class="point-icon"><CaretRight /></el-icon>
                        {{ point }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="info-column">
                    <span class="column-title">🌟 代表成就</span>
                    <div class="examples-container">
                      <el-tag
                        v-for="(example, i) in era.examples"
                        :key="i"
                        class="example-tag"
                        effect="plain"
                      >
                        {{ example }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'

const activeEraName = ref('符号主义时代')

const eras = [
  {
    year: '20世纪50-80年代',
    title: '符号主义时代',
    desc: '规则与逻辑推理',
    fullDesc:
      '早期人工智能研究认为，智能可以通过符号和逻辑规则来表达。科学家们尝试编写大量规则来让机器模拟人类专家的决策过程。',
    examples: ['专家系统', '深蓝 (Deep Blue)', 'MYCIN'],
    keyPoints: [
      '人工编写 If-Then 规则',
      '逻辑推理能力强大',
      '可解释性强',
      '难以处理模糊/复杂问题'
    ]
  },
  {
    year: '21世纪10年代',
    title: '连接主义时代',
    desc: '神经网络与深度学习',
    fullDesc:
      '随着大数据和 GPU 算力的突破，深度学习迎来了春天。神经网络通过多层结构自动学习特征，在图像识别、语音识别等领域取得巨大成功。',
    examples: ['AlexNet', 'AlphaGo', '人脸识别'],
    keyPoints: [
      '模仿人脑神经元结构',
      '从数据中自动学习特征',
      '强大的模式识别能力',
      '模型是"黑盒"，缺乏可解释性'
    ]
  },
  {
    year: '21世纪20年代至今',
    title: '生成式 AI 时代',
    desc: '大模型与创造力',
    fullDesc:
      'Transformer 架构的诞生让机器理解了上下文关系。GPT 等大语言模型不仅能生成文本、图像，还展现出了惊人的推理和创造能力。',
    examples: ['ChatGPT', 'Midjourney', 'Sora'],
    keyPoints: [
      '基于 Transformer 架构',
      '通用的理解与生成能力',
      '涌现出推理、规划等高级智能',
      '通过提示词 (Prompt) 交互'
    ]
  }
]
</script>

<style scoped>
.ai-evolution-timeline-demo {
  margin: 10px 0;
}

.main-card {
  /* Compact card style */
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.subtitle {
  font-size: 12px;
  color: #909399;
  margin: 5px 0 0 0;
}

.timeline-tabs {
  margin-top: 10px;
}

.era-content {
  padding: 10px;
}

.era-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.era-desc-short {
  font-weight: bold;
  color: #606266;
  font-size: 14px;
}

.full-desc {
  font-size: 14px;
  color: #303133;
  line-height: 1.6;
  margin-bottom: 20px;
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
}

.info-grid {
  display: flex;
  gap: 20px;
}

.info-column {
  flex: 1;
}

.column-title {
  display: block;
  font-size: 13px;
  font-weight: bold;
  color: #909399;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 5px;
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-points-list li {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #606266;
  margin-bottom: 6px;
}

.point-icon {
  margin-right: 5px;
  color: #409eff;
}

.examples-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .info-grid {
    flex-direction: column;
    gap: 15px;
  }
}
</style>