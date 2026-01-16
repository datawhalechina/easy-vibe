<template>
  <div class="model-evolution-demo">
    <div class="controls-header">
      <div class="toggle-container" @click="toggleMode">
        <div class="toggle-track" :class="{ active: isVLM }">
          <div class="toggle-thumb">
            {{ isVLM ? '👁️' : '🧠' }}
          </div>
        </div>
        <div class="toggle-label">
          <span :class="{ active: !isVLM }">Pure LLM</span>
          <span class="arrow">→</span>
          <span :class="{ active: isVLM }">Multimodal VLM</span>
        </div>
      </div>
      <div class="status-desc">
        {{
          isVLM
            ? '给大脑装上眼睛：视觉信号经过翻译，变成 Token 混入文字流。'
            : '纯文本大脑：只能听懂 Token 语言，无法感知图像。'
        }}
      </div>
    </div>

    <div class="diagram-stage" :class="{ 'vlm-mode': isVLM }">
      <!-- Vision Pipeline (Only visible in VLM mode) -->
      <div class="pipeline vision-pipeline">
        <div class="node-group">
          <div class="node input-node image-node">
            <span class="icon">�️</span>
            <span class="label">Image</span>
          </div>
          <div class="flow-arrow">⬇</div>
          <div
            class="node process-node vit-node"
            title="Vision Transformer: The Eye"
          >
            <span class="icon">�️</span>
            <span class="label">ViT</span>
          </div>
          <div class="flow-arrow">⬇</div>
          <div
            class="node adapter-node projector-node"
            title="Projector: The Translator"
          >
            <span class="icon">🔌</span>
            <span class="label">Projector</span>
          </div>
          <div class="flow-arrow connector-arrow">⤵</div>
        </div>
      </div>

      <!-- Text Pipeline (Always visible) -->
      <div class="pipeline text-pipeline">
        <div class="node-group horizontal">
          <div class="node input-node text-node">
            <span class="icon">�</span>
            <span class="label">Prompt</span>
          </div>
          <div class="flow-arrow">➜</div>
          <div class="node process-node embed-node">
            <span class="icon">�</span>
            <span class="label">Embed</span>
          </div>

          <!-- Merge Point Visualization -->
          <div class="merge-point" :class="{ active: isVLM }">
            <div class="plus-icon">+</div>
            <div class="merge-label">Concat</div>
          </div>

          <div class="flow-arrow">➜</div>
          <div class="node core-node llm-node">
            <span class="icon">🧠</span>
            <span class="label">LLM Backbone</span>
            <div class="inner-flow">
              <span class="dot t1"></span>
              <span class="dot t2"></span>
              <span class="dot v1" v-if="isVLM"></span>
            </div>
          </div>
          <div class="flow-arrow">➜</div>
          <div class="node output-node">
            <span class="icon">💬</span>
            <span class="label">Response</span>
          </div>
        </div>
      </div>
    </div>

    <div class="interactive-info">
      <div class="info-card" v-if="!isVLM">
        <h3>Standard LLM Flow</h3>
        <p>
          Text is converted into vectors (Embeddings) and processed by the
          Transformer to predict the next word.
        </p>
      </div>
      <div class="info-card vlm-info" v-else>
        <h3>VLM = LLM + Vision Encoder</h3>
        <ul>
          <li>
            <strong>ViT (The Eye):</strong> Slices image into patches and
            extracts features.
          </li>
          <li>
            <strong>Projector (The Translator):</strong> Converts visual
            features into the same "language" (vector dimension) as text
            embeddings.
          </li>
          <li>
            <strong>Concatenation:</strong> The translated visual tokens are
            pasted <em>before</em> the text tokens. The LLM sees them as
            "foreign words" it learned to understand.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVLM = ref(false)

const toggleMode = () => {
  isVLM.value = !isVLM.value
}
</script>

<style scoped>
.model-evolution-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  font-family: 'Menlo', 'Monaco', sans-serif;
  user-select: none;
}

/* Controls */
.controls-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  gap: 12px;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  background: var(--vp-c-bg-mute);
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.toggle-container:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.toggle-track {
  width: 50px;
  height: 28px;
  background: #ccc;
  border-radius: 14px;
  position: relative;
  transition: background 0.3s;
}

.toggle-track.active {
  background: var(--vp-c-brand);
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-track.active .toggle-thumb {
  transform: translateX(22px);
}

.toggle-label {
  font-size: 14px;
  font-weight: bold;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 8px;
  align-items: center;
}

.toggle-label span.active {
  color: var(--vp-c-text-1);
}

.status-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
  height: 20px;
}

/* Diagram Stage */
.diagram-stage {
  position: relative;
  height: 240px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Pipelines */
.pipeline {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-pipeline {
  position: absolute;
  bottom: 80px; /* Centered vertically in LLM mode */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
}

.vlm-mode .text-pipeline {
  bottom: 40px; /* Move down in VLM mode */
}

.vision-pipeline {
  position: absolute;
  top: 20px;
  left: 20%; /* Align with input side */
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

.vlm-mode .vision-pipeline {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.node-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.node-group.horizontal {
  flex-direction: row;
}

.vision-pipeline .node-group {
  flex-direction: column;
}

/* Nodes */
.node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;
}

.icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.label {
  font-size: 11px;
  font-weight: bold;
}

.input-node {
  border-color: #aaa;
}
.process-node {
  border-color: var(--vp-c-brand-dimm);
}
.core-node {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  min-width: 100px;
}
.output-node {
  border-color: var(--vp-c-brand);
}

.vit-node {
  border-color: var(--vp-c-yellow);
  background: rgba(255, 197, 23, 0.05);
}
.projector-node {
  border-color: var(--vp-c-yellow);
  background: var(--vp-c-yellow-dimm);
}

/* Arrows */
.flow-arrow {
  color: var(--vp-c-text-3);
  font-size: 16px;
}

.connector-arrow {
  font-size: 24px;
  color: var(--vp-c-yellow);
  margin-top: -10px;
  margin-bottom: -10px;
  transform: rotate(-45deg) translateX(10px);
}

/* Merge Point */
.merge-point {
  width: 0;
  overflow: hidden;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
}

.merge-point.active {
  width: 40px;
  opacity: 1;
}

.plus-icon {
  font-weight: bold;
  color: var(--vp-c-text-2);
  font-size: 18px;
}

.merge-label {
  font-size: 9px;
  color: var(--vp-c-text-3);
}

/* Inner Flow Animation inside LLM */
.inner-flow {
  display: flex;
  gap: 4px;
  margin-top: 4px;
  height: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.6;
  animation: pulse 1s infinite alternate;
}

.t1 {
  animation-delay: 0s;
}
.t2 {
  animation-delay: 0.2s;
}
.v1 {
  background: var(--vp-c-yellow);
  animation-delay: 0.4s;
}

@keyframes pulse {
  from {
    opacity: 0.3;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* Interactive Info */
.interactive-info {
  margin-top: 20px;
}

.info-card {
  background: var(--vp-c-bg-mute);
  padding: 16px;
  border-radius: 8px;
  animation: fadeIn 0.3s;
}

.info-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.info-card p,
.info-card li {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-card ul {
  padding-left: 20px;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .diagram-stage {
    height: 300px;
  }

  .text-pipeline {
    flex-wrap: wrap;
    gap: 10px;
    width: 90%;
  }

  .vision-pipeline {
    left: 10%;
  }
}
</style>
