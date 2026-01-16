<!--
  PatchifyDemo.vue
  视觉分词（Patchify）演示
-->
<template>
  <div class="patchify-demo">
    <div class="control-panel">
      <div class="controls">
        <button class="action-btn" @click="toggleState">
          {{ isPatchified ? '还原图片 (Restore)' : '切分图片 (Patchify)' }}
        </button>
        <div class="info">
          <span>Resolution: 224x224</span>
          <span>Patch Size: 16x16</span>
          <span>Total Patches: {{ 14 * 14 }}</span>
        </div>
      </div>
    </div>

    <div class="visual-area">
      <!-- 原始/切分视图容器 -->
      <div class="image-container" :class="{ 'is-patchified': isPatchified }">
        <div
          v-for="n in 196"
          :key="n"
          class="patch"
          :style="{
            '--delay': `${n * 0.005}s`,
            '--hue': `${(n % 14) * 20 + Math.floor(n / 14) * 20}`
          }"
        >
          <span class="patch-id" v-if="isPatchified">{{ n }}</span>
        </div>
      </div>

      <div class="arrow" v-if="isPatchified">⬇</div>

      <!-- 线性序列视图 -->
      <div class="sequence-container" v-if="isPatchified">
        <div class="sequence-label">Flattened Sequence (Token Input)</div>
        <div class="token-stream">
          <div
            v-for="n in 196"
            :key="n"
            class="mini-patch"
            :style="{ '--hue': `${(n % 14) * 20 + Math.floor(n / 14) * 20}` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <p>
        <span class="icon">💡</span>
        计算机将图片切成 <strong>14x14 = 196</strong> 个小方块（Patch）。
        然后把这些方块“拉直”成一长串序列，就像把一段话里的单词排成一排一样。
        这就是 <strong>Visual Tokenization</strong>。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPatchified = ref(false)

const toggleState = () => {
  isPatchified.value = !isPatchified.value
}
</script>

<style scoped>
.patchify-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.control-panel {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
}

.info {
  display: flex;
  gap: 15px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.visual-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 300px;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  width: 280px;
  height: 280px;
  gap: 0;
  background: #333;
  transition: all 0.5s ease;
  border: 2px solid var(--vp-c-text-1);
}

.image-container.is-patchified {
  gap: 2px;
  background: transparent;
  border-color: transparent;
}

.patch {
  background-color: hsl(var(--hue), 70%, 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
}

.is-patchified .patch {
  border-radius: 2px;
  transform: scale(0.9);
}

.sequence-container {
  width: 100%;
  background: var(--vp-c-bg);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  animation: fadeIn 0.5s ease;
}

.sequence-label {
  font-size: 0.9em;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.token-stream {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.mini-patch {
  width: 10px;
  height: 10px;
  background-color: hsl(var(--hue), 70%, 60%);
  border-radius: 1px;
}

.explanation {
  margin-top: 20px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.6;
}

.arrow {
  font-size: 24px;
  color: var(--vp-c-text-2);
  animation: bounce 1s infinite;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
