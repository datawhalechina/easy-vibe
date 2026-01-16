<!--
  VLMInferenceDemo.vue
  多模态推理演示
-->
<template>
  <div class="vlm-chat-demo">
    <div class="chat-window">
      <!-- Chat History -->
      <div class="messages">
        <!-- User Message -->
        <div class="message user">
          <div class="avatar">👤</div>
          <div class="bubble">
            <div class="image-upload">
              <div class="placeholder-img">🐱</div>
            </div>
            <div class="text">这只猫在做什么？</div>
          </div>
        </div>

        <!-- Assistant Message -->
        <div class="message assistant" v-if="step > 0">
          <div class="avatar">🤖</div>
          <div class="bubble">
            <div v-if="step === 1" class="thinking">
              <span class="icon">👁️</span> 正在观察图片...
            </div>
            <div v-else-if="step === 2" class="thinking">
              <span class="icon">🧠</span> 正在思考...
            </div>
            <div v-else class="content type-writer">
              {{ typedText }}<span class="cursor">|</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="send-btn"
        :disabled="step > 0 && step < 3"
        @click="startInference"
      >
        {{ step === 0 || step === 3 ? '发送 (Send)' : '生成中...' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const step = ref(0)
const fullText = '它正趴在窗台上晒太阳，看起来非常惬意。'
const typedText = ref('')

const startInference = () => {
  step.value = 1
  typedText.value = ''

  // Step 1: Vision Encoding
  setTimeout(() => {
    step.value = 2
    // Step 2: Thinking
    setTimeout(() => {
      step.value = 3
      typeText()
    }, 1500)
  }, 1500)
}

const typeText = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText[i]
      i++
    } else {
      clearInterval(interval)
    }
  }, 100)
}
</script>

<style scoped>
.vlm-chat-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  overflow: hidden;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.chat-window {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  min-height: 300px;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid var(--vp-c-divider);
}

.bubble {
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  max-width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.message.user .bubble {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-light);
}

.image-upload {
  margin-bottom: 8px;
}

.placeholder-img {
  width: 100px;
  height: 100px;
  background: #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.controls {
  padding: 15px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
}

.send-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.thinking {
  color: var(--vp-c-text-2);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cursor {
  display: inline-block;
  width: 2px;
  background: currentColor;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
