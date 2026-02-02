<!--
  PromptEngineeringDemo.vue
  提示词工程演示组件

  用途：
  展示提示词如何影响生成结果，帮助用户理解提示词工程的重要性。

  交互功能：
  - 提示词实时编辑
  - 关键词提取和高亮
  - 权重调节
  - 对比不同提示词的效果
-->
<template>
  <div class="prompt-engineering-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><EditPen /></el-icon>
          <span>✍️ 提示词工程实验室</span>
        </div>
      </template>

      <div class="demo-layout">
        <!-- 左侧：提示词编辑 -->
        <div class="prompt-panel">
          <div class="prompt-input-section">
            <label>提示词 (Prompt)</label>
            <el-input
              v-model="prompt"
              type="textarea"
              :rows="4"
              placeholder="输入你的提示词..."
            />
          </div>

          <div class="prompt-analysis">
            <div class="analysis-title">关键词分析</div>
            <div class="keywords-list">
              <div
                v-for="(keyword, index) in analyzedKeywords"
                :key="index"
                class="keyword-item"
                :class="keyword.type"
              >
                <span class="keyword-text">{{ keyword.text }}</span>
                <el-slider
                  v-model="keyword.weight"
                  :min="0"
                  :max="2"
                  :step="0.1"
                  size="small"
                  class="weight-slider"
                />
                <span class="weight-value">{{ keyword.weight.toFixed(1) }}</span>
              </div>
            </div>
          </div>

          <div class="prompt-tips">
            <el-collapse>
              <el-collapse-item title="💡 提示词技巧">
                <ul class="tips-list">
                  <li><strong>主体描述</strong>：明确你要画什么（如 "一只橘猫"）</li>
                  <li><strong>风格词</strong>：指定艺术风格（如 "水彩画"、"赛博朋克"）</li>
                  <li><strong>质量词</strong>：提升画质（如 "8k"、" masterpiece"、"highly detailed"）</li>
                  <li><strong>光照</strong>：控制光线效果（如 "golden hour"、"volumetric lighting"）</li>
                  <li><strong>权重语法</strong>：使用 (word:1.5) 增加权重，(word:0.5) 降低权重</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

        <!-- 右侧：效果预览 -->
        <div class="preview-panel">
          <div class="preview-tabs">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="结构解析" name="structure">
                <div class="structure-viz">
                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="primary">主体 (Subject)</el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractSubject() || '未检测到主体' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="success">风格 (Style)</el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractStyle() || '未检测到风格词' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="warning">质量 (Quality)</el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractQuality() || '未检测到质量词' }}
                    </div>
                  </div>

                  <div class="structure-section">
                    <div class="section-header">
                      <el-tag type="info">环境 (Environment)</el-tag>
                    </div>
                    <div class="section-content">
                      {{ extractEnvironment() || '未检测到环境描述' }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="对比示例" name="comparison">
                <div class="comparison-list">
                  <div
                    v-for="(example, index) in promptExamples"
                    :key="index"
                    class="comparison-item"
                    :class="{ active: selectedExample === index }"
                    @click="selectExample(index)"
                  >
                    <div class="example-prompt">{{ example.prompt }}</div>
                    <div class="example-desc">{{ example.description }}</div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="负面提示词" name="negative">
                <div class="negative-prompt-section">
                  <label>负面提示词 (Negative Prompt)</label>
                  <el-input
                    v-model="negativePrompt"
                    type="textarea"
                    :rows="3"
                    placeholder="输入你不希望出现的内容..."
                  />
                  <div class="negative-presets">
                    <el-tag
                      v-for="preset in negativePresets"
                      :key="preset"
                      size="small"
                      class="negative-preset-tag"
                      @click="addNegativePreset(preset)"
                    >
                      + {{ preset }}
                    </el-tag>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>提示词工程的核心：</strong>
          好的提示词 = 清晰的描述 + 适当的风格词 + 质量增强词。通过调整不同部分的权重，可以精确控制生成结果。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EditPen } from '@element-plus/icons-vue'

const prompt = ref('一只橘猫，坐在窗台上，阳光照射，水彩画风格，8k高清')
const negativePrompt = ref('模糊, 低质量, 变形, 多余的手指')
const activeTab = ref('structure')
const selectedExample = ref(0)

// 关键词类型
const keywordTypes = {
  subject: ['猫', '狗', '人', '风景', '建筑', '汽车', '花', '树'],
  style: ['水彩', '油画', '素描', '赛博朋克', '像素', '写实', '卡通', '动漫'],
  quality: ['8k', '高清', ' masterpiece', 'detailed', 'high quality', '4k', 'sharp'],
  environment: ['阳光', '雨天', '夜晚', '森林', '城市', '海边', '室内', '户外']
}

// 分析关键词
const analyzedKeywords = computed(() => {
  const keywords = []
  const words = prompt.value.split(/[,，\s]+/).filter(w => w.length > 0)

  words.forEach(word => {
    let type = 'other'
    if (keywordTypes.subject.some(k => word.includes(k))) type = 'subject'
    else if (keywordTypes.style.some(k => word.includes(k))) type = 'style'
    else if (keywordTypes.quality.some(k => word.toLowerCase().includes(k.toLowerCase()))) type = 'quality'
    else if (keywordTypes.environment.some(k => word.includes(k))) type = 'environment'

    keywords.push({
      text: word,
      type,
      weight: 1.0
    })
  })

  return keywords
})

// 提取不同类型的词
const extractSubject = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'subject')
    .map(k => k.text)
    .join(', ')
}

const extractStyle = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'style')
    .map(k => k.text)
    .join(', ')
}

const extractQuality = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'quality')
    .map(k => k.text)
    .join(', ')
}

const extractEnvironment = () => {
  return analyzedKeywords.value
    .filter(k => k.type === 'environment')
    .map(k => k.text)
    .join(', ')
}

// 提示词示例
const promptExamples = [
  {
    prompt: '一只猫',
    description: '基础描述，结果可能不够理想'
  },
  {
    prompt: '一只橘猫，坐在窗台上',
    description: '添加主体细节和场景'
  },
  {
    prompt: '一只橘猫，坐在窗台上，阳光照射，水彩画风格',
    description: '添加光照和风格'
  },
  {
    prompt: '一只橘猫，坐在窗台上，阳光照射，水彩画风格，8k高清， masterpiece',
    description: '完整提示词，包含质量词'
  }
]

// 负面提示词预设
const negativePresets = [
  '模糊',
  '低质量',
  '变形',
  '多余的手指',
  '扭曲的脸',
  '噪点',
  '水印',
  '文字'
]

const selectExample = (index) => {
  selectedExample.value = index
  prompt.value = promptExamples[index].prompt
}

const addNegativePreset = (preset) => {
  if (!negativePrompt.value.includes(preset)) {
    negativePrompt.value = negativePrompt.value
      ? `${negativePrompt.value}, ${preset}`
      : preset
  }
}
</script>

<style scoped>
.prompt-engineering-demo {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.prompt-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prompt-input-section label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
}

.prompt-analysis {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
}

.analysis-title {
  font-weight: 500;
  margin-bottom: 12px;
}

.keywords-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-divider);
}

.keyword-item.subject {
  border-left-color: #409eff;
}

.keyword-item.style {
  border-left-color: #67c23a;
}

.keyword-item.quality {
  border-left-color: #e6a23c;
}

.keyword-item.environment {
  border-left-color: #909399;
}

.keyword-text {
  min-width: 80px;
  font-size: 0.875rem;
}

.weight-slider {
  flex: 1;
}

.weight-value {
  min-width: 40px;
  text-align: right;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.prompt-tips {
  margin-top: 8px;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.preview-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
}

.structure-viz {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.structure-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
}

.section-header {
  margin-bottom: 8px;
}

.section-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  min-height: 24px;
}

.comparison-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comparison-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.comparison-item:hover {
  border-color: var(--vp-c-brand);
}

.comparison-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.example-prompt {
  font-weight: 500;
  margin-bottom: 4px;
}

.example-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.negative-prompt-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.negative-prompt-section label {
  font-size: 0.875rem;
  font-weight: 500;
}

.negative-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.negative-preset-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.negative-preset-tag:hover {
  transform: translateY(-2px);
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}
</style>
