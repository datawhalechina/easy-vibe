<template>
  <div class="few-shot-demo">
    <div class="mode-switch">
      <button :class="{ active: mode === 'zero' }" @click="mode = 'zero'">
        🎯 Zero-shot（零样本）
      </button>
      <button :class="{ active: mode === 'few' }" @click="mode = 'few'">
        📚 Few-shot（少样本）
      </button>
    </div>

    <div class="demo-container">
      <!-- Zero-shot -->
      <div v-if="mode === 'zero'" class="zero-shot">
        <div class="prompt-box">
          <div class="prompt-header">提示词</div>
          <div class="prompt-content">
            将<strong>中文</strong>翻译成<strong>英文</strong>：
            <br><br>
            "我很好"
          </div>
        </div>

        <div class="arrow">↓</div>

        <div class="output-box">
          <div class="output-header">AI 可能的输出</div>
          <div class="output-content">
            "I'm fine." 或 "I'm very good." 或 "I am well."
            <br><br>
            <span class="comment">❓ 不确定应该用什么语气，可能是正式或随意</span>
          </div>
        </div>
      </div>

      <!-- Few-shot -->
      <div v-else class="few-shot">
        <div class="prompt-box">
          <div class="prompt-header">提示词（含示例）</div>
          <div class="prompt-content">
            将<strong>中文</strong>翻译成<strong>英文</strong>：
            <br><br>
            <div class="examples">
              <div class="example-item">
                <span class="input">你好</span> → <span class="output">Hi!</span>
              </div>
              <div class="example-item">
                <span class="input">谢谢</span> → <span class="output">Thanks!</span>
              </div>
              <div class="example-item">
                <span class="input">再见</span> → <span class="output">Bye!</span>
              </div>
            </div>
            <div class="task">
              <strong>任务：</strong>"我很好"
            </div>
          </div>
        </div>

        <div class="arrow">↓</div>

        <div class="output-box">
          <div class="output-header">AI 输出</div>
          <div class="output-content">
            "I'm great!"
            <br><br>
            <span class="comment success">✨ 通过示例学会了随意的对话风格</span>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <div v-if="mode === 'zero'">
        <strong>Zero-shot</strong>：不给任何示例，直接让 AI 完成任务。简单但可能不够准确。
      </div>
      <div v-else>
        <strong>Few-shot</strong>：提供几个示例让 AI 学习规律。示例的质量和数量直接影响输出效果。
        通常 3-5 个示例就足够了！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('zero')
</script>

<style scoped>
.few-shot-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.mode-switch {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.mode-switch button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9em;
}

.mode-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.demo-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.prompt-box,
.output-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 15px;
}

.prompt-header,
.output-header {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.prompt-content,
.output-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.examples {
  background: #000;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-family: monospace;
  font-size: 0.85rem;
}

.example-item:last-child {
  margin-bottom: 0;
}

.example-item .input {
  color: #60a5fa;
}

.example-item .output {
  color: #22c55e;
}

.task {
  background: var(--vp-c-brand);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.arrow {
  text-align: center;
  font-size: 2rem;
  color: var(--vp-c-text-3);
  margin: 15px 0;
}

.comment {
  display: block;
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.comment:not(.success) {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.comment.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.explanation {
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.6;
}
</style>
