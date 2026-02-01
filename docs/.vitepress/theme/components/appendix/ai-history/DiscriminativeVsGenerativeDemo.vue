<template>
  <div class="discriminative-vs-generative-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>🎯 判别式 vs 生成式 AI</h4>
          <p class="subtitle">理解两种不同的 AI 范式</p>
        </div>
      </template>

      <div class="comparison-container">
        <el-row :gutter="20">
          <!-- Discriminative AI -->
          <el-col :xs="24" :sm="12">
            <el-card
              shadow="always"
              class="ai-panel discriminative"
              :class="{ active: mode === 'discriminative' }"
              @click="mode = 'discriminative'"
            >
              <div class="panel-header">
                <div class="icon">🔍</div>
                <h5>判别式 AI</h5>
                <el-tag size="small" type="success">分类/识别</el-tag>
              </div>

              <div class="panel-content">
                <div class="input-output">
                  <div class="io-box input">
                    <div class="io-label">输入</div>
                    <div class="io-content">
                      <div class="svg-placeholder green">
                        <span class="svg-text">猫图</span>
                      </div>
                    </div>
                  </div>

                  <div class="arrow">
                    <el-icon><Bottom /></el-icon>
                  </div>

                  <div class="io-box output">
                    <div class="io-label">输出</div>
                    <div class="io-content">
                      <el-tag effect="dark" type="success">这是猫</el-tag>
                      <div class="probability">置信度: 98%</div>
                    </div>
                  </div>
                </div>

                <div class="examples">
                  <h6>典型应用:</h6>
                  <div class="example-tags">
                    <el-tag
                      size="small"
                      effect="plain"
                      v-for="tag in [
                        '图像分类',
                        '垃圾邮件过滤',
                        '疾病诊断',
                        '人脸识别'
                      ]"
                      :key="tag"
                      >{{ tag }}</el-tag
                    >
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- Generative AI -->
          <el-col :xs="24" :sm="12">
            <el-card
              shadow="always"
              class="ai-panel generative"
              :class="{ active: mode === 'generative' }"
              @click="mode = 'generative'"
            >
              <div class="panel-header">
                <div class="icon">✨</div>
                <h5>生成式 AI</h5>
                <el-tag size="small" type="primary">创造/生成</el-tag>
              </div>

              <div class="panel-content">
                <div class="input-output">
                  <div class="io-box input">
                    <div class="io-label">输入</div>
                    <div class="io-content">
                      <div class="prompt-text">"一只戴墨镜的猫"</div>
                    </div>
                  </div>

                  <div class="arrow">
                    <el-icon><Bottom /></el-icon>
                  </div>

                  <div class="io-box output">
                    <div class="io-label">输出</div>
                    <div class="io-content">
                      <div class="svg-placeholder blue">
                        <span class="svg-text">生成图像 ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="examples">
                  <h6>典型应用:</h6>
                  <div class="example-tags">
                    <el-tag
                      size="small"
                      effect="plain"
                      type="primary"
                      v-for="tag in [
                        'ChatGPT',
                        'Midjourney',
                        '代码生成',
                        '音乐创作'
                      ]"
                      :key="tag"
                      >{{ tag }}</el-tag
                    >
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bottom } from '@element-plus/icons-vue'

const mode = ref('discriminative')
</script>

<style scoped>
.discriminative-vs-generative-demo {
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

.comparison-container {
  padding: 10px;
}

.ai-panel {
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  height: 100%;
}

.ai-panel:hover {
  transform: translateY(-2px);
}

.ai-panel.active {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.icon {
  font-size: 24px;
}

.panel-header h5 {
  margin: 0;
  flex: 1;
  font-size: 16px;
  font-weight: 600;
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-output {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
}

.io-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.io-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

.io-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.svg-placeholder {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.svg-placeholder.green {
  background-color: #48bb78;
}

.svg-placeholder.blue {
  background-color: #667eea;
}

.svg-text {
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.prompt-text {
  background-color: var(--vp-c-bg-alt);
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.arrow {
  color: var(--vp-c-text-2);
}

.probability {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.examples h6 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
