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
          <span :class="{ active: !isVLM }">Pure LLM (纯文本)</span>
          <span class="arrow">→</span>
          <span :class="{ active: isVLM }">Multimodal VLM (多模态)</span>
        </div>
      </div>
      <div class="status-desc">
        {{
          isVLM
            ? 'Tokens from vision are translated and placed before text tokens. (视觉信息被翻译成 Token，放在文字 Token 之前。)'
            : 'Text-only tokens flow into the LLM. (只有文字 Token 流入大模型。)'
        }}
      </div>
    </div>

    <div class="diagram-stage">
      <div class="lanes">
        <div class="lane lane-vision" v-show="isVLM">
          <div class="lane-title">Vision Path (视觉路径)</div>
          <div class="lane-flow">
            <div class="node input-node">
              <span class="icon">🖼️</span>
              <span class="label">Image (图片)</span>
            </div>
            <span class="mini-arrow">→</span>
            <div class="node process-node vit-node">
              <span class="icon">👁️</span>
              <span class="label">ViT (视觉模型)</span>
            </div>
            <span class="mini-arrow">→</span>
            <div class="node adapter-node">
              <span class="icon">🔌</span>
              <span class="label">Projector (投影器)</span>
            </div>
            <span class="mini-arrow">→</span>
            <div class="token-box token-box-vision">
              <div class="token-box-title">Vision Tokens (视觉 Token)</div>
              <div class="tokens">
                <span class="token vision">v1</span>
                <span class="token vision">v2</span>
                <span class="token vision">v3</span>
                <span class="token vision">…</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lane lane-text">
          <div class="lane-title">Text Path (文字路径)</div>
          <div class="lane-flow">
            <div class="node input-node">
              <span class="icon">⌨️</span>
              <span class="label">Prompt (提示词)</span>
            </div>
            <span class="mini-arrow">→</span>
            <div class="node process-node">
              <span class="icon">🔤</span>
              <span class="label">Embed (向量化)</span>
            </div>
            <span class="mini-arrow">→</span>
            <div class="token-box">
              <div class="token-box-title">Text Tokens (文字 Token)</div>
              <div class="tokens">
                <span class="token text">t1</span>
                <span class="token text">t2</span>
                <span class="token text">t3</span>
                <span class="token text">…</span>
              </div>
            </div>
          </div>
        </div>

        <div class="merge-stage">
          <div class="merge-title">Token Sequence (输入序列)</div>
          <div class="sequence">
            <div v-if="isVLM" class="sequence-row">
              <span class="sequence-tag vision">Vision (视觉)</span>
              <div class="tokens">
                <span class="token vision">v1</span>
                <span class="token vision">v2</span>
                <span class="token vision">v3</span>
                <span class="token vision">…</span>
              </div>
            </div>
            <div class="sequence-row">
              <span class="sequence-tag text">Text (文字)</span>
              <div class="tokens">
                <span class="token text">t1</span>
                <span class="token text">t2</span>
                <span class="token text">t3</span>
                <span class="token text">…</span>
              </div>
            </div>
            <div class="sequence-hint">
              <span v-if="isVLM"
                >Concat: [Vision Tokens] + [Text Tokens]
                (拼接：视觉在前，文字在后)</span
              >
              <span v-else>Only [Text Tokens] (只有文字 Token)</span>
            </div>
          </div>

          <div class="core-stage">
            <span class="big-arrow">→</span>
            <div class="node core-node">
              <span class="icon">🧠</span>
              <span class="label">LLM Backbone (大模型)</span>
            </div>
            <span class="big-arrow">→</span>
            <div class="node output-node">
              <span class="icon">💬</span>
              <span class="label">Response (回复)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="interactive-info">
      <transition name="fade" mode="out-in">
        <div class="info-card" v-if="!isVLM" key="llm">
          <h3>Standard LLM Flow (标准大模型流程)</h3>
          <p>Prompt → Embedding → Token Sequence → LLM → Response。</p>
        </div>
        <div class="info-card vlm-info" v-else key="vlm">
          <h3>VLM = LLM + Vision Encoder (视觉大模型原理)</h3>
          <ul>
            <li><strong>ViT (The Eye):</strong> 把图片编码成视觉特征。</li>
            <li>
              <strong>Projector (The Translator):</strong> 把视觉特征映射到 LLM
              的 Token 空间。
            </li>
            <li>
              <strong>Concatenation (拼接):</strong> 把视觉 Token 放在文字 Token
              之前，作为同一条输入序列。
            </li>
          </ul>
        </div>
      </transition>
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

.controls-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
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
  line-height: 1.5;
  max-width: 720px;
}

.diagram-stage {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  padding: 18px;
}

.lanes {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lane {
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}

.lane-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-weight: 700;
}

.lane-flow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.merge-stage {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}

.merge-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  font-weight: 700;
}

.sequence {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 10px;
}

.sequence-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.sequence-row:last-child {
  margin-bottom: 0;
}

.sequence-tag {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.sequence-tag.vision {
  border-color: var(--vp-c-yellow);
}

.sequence-tag.text {
  border-color: var(--vp-c-brand);
}

.sequence-hint {
  margin-top: 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.core-stage {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.big-arrow {
  font-size: 18px;
  color: var(--vp-c-text-2);
  font-weight: 800;
}

.mini-arrow {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 800;
}

.node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 110px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.label {
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
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
  min-width: 140px;
}

.output-node {
  border-color: var(--vp-c-brand);
}

.vit-node {
  border-color: var(--vp-c-yellow);
  background: rgba(255, 197, 23, 0.05);
}

.adapter-node {
  border-color: var(--vp-c-yellow);
  background: var(--vp-c-yellow-dimm);
}

.token-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
  min-width: 220px;
}

.token-box-vision {
  border-color: var(--vp-c-yellow);
}

.token-box-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.tokens {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.token {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.token.vision {
  border-color: var(--vp-c-yellow);
  background: rgba(255, 197, 23, 0.12);
}

.token.text {
  border-color: var(--vp-c-brand);
  background: rgba(59, 130, 246, 0.12);
}

.interactive-info {
  margin-top: 16px;
}

.info-card {
  background: var(--vp-c-bg-mute);
  padding: 16px;
  border-radius: 8px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .diagram-stage {
    padding: 14px;
  }
  .node {
    min-width: 100px;
  }
  .token-box {
    min-width: 200px;
  }
}
</style>
