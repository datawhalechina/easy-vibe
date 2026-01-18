<!--
  PatchifyDemo.vue
  视觉分词（Patchify）演示
-->
<template>
  <div class="patchify-demo">
    <div class="control-panel">
      <div class="controls">
        <button
          class="action-btn"
          @click="prevStep"
          :disabled="currentStep === 0"
        >
          ⬅ 上一步 (Prev)
        </button>
        <span class="step-indicator">Step {{ currentStep + 1 }} / 4</span>
        <button
          class="action-btn primary"
          @click="nextStep"
          :disabled="currentStep === 3"
        >
          {{ currentStep === 3 ? '完成 (Done)' : '下一步 (Next) ➡' }}
        </button>
      </div>
      <div class="step-desc">
        {{ stepDescriptions[currentStep] }}
      </div>
    </div>

    <div class="visual-area">
      <!-- 原始/切分视图容器 -->
      <!-- 
        Step 0: Show container background, cells hidden
        Step 1: Show container background, grid overlay visible (cells with border)
        Step 2+: Container background hidden, cells visible with individual backgrounds
      -->
      <div
        class="image-container"
        :class="{
          'is-pixelated': currentStep >= 1,
          'is-patchified': currentStep >= 2
        }"
      >
        <div class="grid-overlay" v-if="currentStep === 1"></div>
        <div v-for="n in 196" :key="n" class="patch" :style="getPatchStyle(n)">
          <!-- Show number only in Pixelated stage to represent 'digitization' -->
          <span class="pixel-val" v-if="currentStep === 1">{{
            Math.floor(Math.random() * 9)
          }}</span>
          <!-- Show ID in Patchified stage -->
          <span class="patch-id" v-if="currentStep >= 2">{{ n }}</span>
        </div>
      </div>

      <div class="arrow-down" v-if="currentStep >= 3">⬇</div>

      <!-- 线性序列视图 -->
      <div class="sequence-container" v-if="currentStep >= 3">
        <div class="sequence-label">
          Token Sequence: 196×D (每个 Token 是 D 维向量)
        </div>
        <div class="token-stream">
          <div
            v-for="n in 196"
            :key="n"
            class="mini-patch"
            :style="getMiniPatchStyle(n)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)

const stepDescriptions = [
  '1. 原始图片 (Original Image): 计算机看到的原始输入。',
  '2. 数字化 (Digitization): 图片本质上是一个数字矩阵 (H x W x C)。',
  '3. 切块 (Patchify): 典型设置：224×224 按 16×16 切成 14×14=196 个 Patch（此处等比示意）。',
  '4. 序列化 (Serialize): 将二维分布的 Patch “拍扁”成一维序列 (Spatial Flatten)。现在它看起来就像一串“视觉单词”，可以被 Transformer 逐个读取。'
]

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

// 模拟一张风景图的 CSS 渐变
// Sky (Blue) -> Mountains (Green/Grey) -> Sun (Yellow)
const bgImage =
  'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 50%, #228B22 50%, #228B22 100%)'
// Add a sun using radial gradient
const complexBg =
  'radial-gradient(circle at 70% 20%, #FFD700 0%, #FFD700 10%, transparent 10.5%), linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #4CA1AF 60%, #2C3E50 100%)'

const getPatchStyle = (n) => {
  const row = Math.floor((n - 1) / 14)
  const col = (n - 1) % 14

  // Calculate background position for each patch to match the original image
  // The container is 280px, each patch is 20px.
  // 14 cols.
  const posX = col * -20
  const posY = row * -20

  const isPatchified = currentStep.value >= 2

  return {
    backgroundImage: complexBg,
    backgroundPosition: `${posX}px ${posY}px`,
    backgroundSize: '280px 280px',
    // In Step 0, patches are hidden to show pure container background
    // In Step 1, patches are visible but transparent background to show numbers/borders over container background
    // In Step 2, patches take over with their own background
    opacity: currentStep.value === 0 ? 0 : 1,
    // In Step 1, background must be transparent to see container bg
    backgroundImage: isPatchified ? complexBg : 'none',
    transform: isPatchified ? 'scale(0.9)' : 'scale(1)',
    transition: 'all 0.5s ease'
  }
}

const getMiniPatchStyle = (n) => {
  const row = Math.floor((n - 1) / 14)
  const col = (n - 1) % 14
  const posX = col * -20
  const posY = row * -20

  return {
    backgroundImage: complexBg,
    backgroundPosition: `${posX}px ${posY}px`,
    backgroundSize: '280px 280px'
  }
}
</script>

<style scoped>
.patchify-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
  user-select: none;
}

.control-panel {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

.step-indicator {
  font-family: monospace;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.step-desc {
  font-size: 0.9em;
  color: var(--vp-c-text-1);
  text-align: center;
  background: var(--vp-c-bg-mute);
  padding: 8px 16px;
  border-radius: 4px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.action-btn {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9em;
}

.action-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn:not(:disabled):hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.visual-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 350px;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  width: 280px;
  height: 280px;
  /* Step 0 & 1 Background */
  background-image:
    radial-gradient(
      circle at 70% 20%,
      #ffd700 0%,
      #ffd700 10%,
      transparent 10.5%
    ),
    linear-gradient(
      to bottom,
      #87ceeb 0%,
      #87ceeb 60%,
      #4ca1af 60%,
      #2c3e50 100%
    );
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Step 2+: Remove container background, let patches show */
.image-container.is-patchified {
  background-image: none;
  background-color: transparent;
  gap: 2px;
}

.patch {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
}

/* Step 1: Pixelated Overlay Effect */
.image-container.is-pixelated:not(.is-patchified) .patch {
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* Use pseudo-element or just opacity logic in JS */
}

/* Step 1: Digitization numbers */
.pixel-val {
  font-family: monospace;
  font-size: 8px;
  color: rgba(0, 0, 0, 0.3);
  mix-blend-mode: overlay;
}

.patch-id {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1px 2px;
  border-radius: 2px;
  font-size: 7px;
}

.arrow-down {
  font-size: 24px;
  color: var(--vp-c-text-2);
  animation: bounce 1s infinite;
}

.sequence-container {
  width: 100%;
  background: var(--vp-c-bg);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  animation: slideUp 0.5s ease;
}

.sequence-label {
  font-size: 0.9em;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.token-stream {
  display: flex;
  flex-wrap: nowrap;
  gap: 1px;
  overflow-x: auto;
  padding: 10px 5px; /* Space for brackets */
  align-items: center;
  position: relative;
}

/* Add Matrix Brackets */
.token-stream::before,
.token-stream::after {
  content: '';
  display: block;
  width: 6px;
  height: 36px; /* Match vector height + padding */
  border: 2px solid var(--vp-c-text-3);
  flex-shrink: 0;
}

.token-stream::before {
  border-right: none;
}

.token-stream::after {
  border-left: none;
}

.mini-patch {
  width: 6px; /* Thinner to allow more density */
  height: 32px; /* Taller to represent Vector Dimension D */
  border-radius: 1px;
  flex-shrink: 0;
  opacity: 0.9;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
