<template>
  <div class="image-gen-architecture">
    <el-card shadow="never">
      <div class="flow-container">
        <!-- Step 1: Prompt -->
        <div class="flow-item">
          <el-card shadow="hover" class="node-card">
            <template #header>
              <div class="node-header">
                <el-icon :size="20"><EditPen /></el-icon>
                <span>提示词 (Prompt)</span>
              </div>
            </template>
            <div class="node-content">
              <el-tag type="info" effect="plain">"一只可爱的猫"</el-tag>
            </div>
          </el-card>
        </div>

        <div class="arrow-connector">
          <el-icon :size="24"><Right /></el-icon>
        </div>

        <!-- Step 2: Text Encoder -->
        <div class="flow-item">
          <el-card shadow="hover" class="node-card">
            <template #header>
              <div class="node-header">
                <el-icon :size="20"><Microphone /></el-icon>
                <span>文本编码器</span>
              </div>
            </template>
            <div class="node-content">
              <div class="model-name">CLIP / T5</div>
              <div class="data-shape">Vector [768]</div>
            </div>
          </el-card>
        </div>

        <div class="arrow-connector">
          <el-icon :size="24"><Right /></el-icon>
        </div>

        <!-- Step 3: UNet/DiT -->
        <div class="flow-item main-node">
          <el-card shadow="hover" class="node-card highlight">
            <template #header>
              <div class="node-header">
                <el-icon :size="20" color="#E6A23C"><Cpu /></el-icon>
                <span>生成模型</span>
              </div>
            </template>
            <div class="node-content">
              <div class="model-name">UNet / DiT</div>
              <div class="action-badge">
                <el-tag type="warning" size="small" effect="dark"
                  >去噪 (Denoise)</el-tag
                >
              </div>
            </div>
          </el-card>
        </div>

        <div class="arrow-connector">
          <el-icon :size="24"><Right /></el-icon>
        </div>

        <!-- Step 4: VAE Decoder -->
        <div class="flow-item">
          <el-card shadow="hover" class="node-card">
            <template #header>
              <div class="node-header">
                <el-icon :size="20"><View /></el-icon>
                <span>图像解码器</span>
              </div>
            </template>
            <div class="node-content">
              <div class="model-name">VAE Decoder</div>
              <div class="final-output">
                <el-icon><Picture /></el-icon> Image
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <el-divider />

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="explanation-item">
            <div class="exp-icon">
              <el-icon color="#409EFF"><Microphone /></el-icon>
            </div>
            <div class="exp-text">
              <h4>耳朵 (Text Encoder)</h4>
              <p>负责"听懂"你的描述，把它翻译成计算机能理解的数学向量。</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="explanation-item">
            <div class="exp-icon">
              <el-icon color="#E6A23C"><Cpu /></el-icon>
            </div>
            <div class="exp-text">
              <h4>大脑 (UNet/DiT)</h4>
              <p>
                核心创造者。在潜空间(Latent Space)中通过预测噪声来构思画面。
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="explanation-item">
            <div class="exp-icon">
              <el-icon color="#67C23A"><View /></el-icon>
            </div>
            <div class="exp-text">
              <h4>眼睛 (VAE)</h4>
              <p>负责"翻译"回图像。把大脑构思的模糊特征还原成高清像素图片。</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import {
  EditPen,
  Microphone,
  Right,
  Cpu,
  View,
  Picture
} from '@element-plus/icons-vue'
</script>

<style scoped>
.image-gen-architecture {
  margin: 20px 0;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.flow-item {
  flex: 1;
  min-width: 140px;
}

.arrow-connector {
  color: var(--el-text-color-placeholder);
  display: flex;
  align-items: center;
}

.node-card {
  height: 100%;
  text-align: center;
}

.node-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  font-size: 0.9em;
}

.node-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  font-size: 0.85em;
  color: var(--el-text-color-regular);
}

.highlight {
  border-color: var(--el-color-warning);
  background-color: var(--el-color-warning-light-9);
}

.model-name {
  font-weight: bold;
}

.data-shape {
  font-family: monospace;
  font-size: 0.8em;
  color: var(--el-text-color-secondary);
}

.explanation-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--el-fill-color-light);
  border-radius: 6px;
  height: 100%;
}

.exp-icon {
  font-size: 24px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.exp-text h4 {
  margin: 0 0 5px 0;
  font-size: 0.95em;
  color: var(--el-text-color-primary);
}

.exp-text p {
  margin: 0;
  font-size: 0.85em;
  color: var(--el-text-color-secondary);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .flow-container {
    flex-direction: column;
  }

  .arrow-connector {
    transform: rotate(90deg);
    margin: 10px 0;
  }

  .explanation-item {
    margin-bottom: 10px;
  }
}
</style>
