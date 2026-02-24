<template>
  <div class="demo-wrapper">
    <div class="demo-header">Accessibility (a11y) / 读屏机眼里的你</div>
    
    <div class="split-pane">
      <!-- 糟糕的做法 -->
      <div class="pane bad-pane">
        <h4 class="pane-title label-bad">❌ 野路子开发：全是 DIV</h4>
        
        <div class="component-card">
          <!-- 这里全是用 div 伪造的组件 -->
          <div 
            class="fake-btn" 
            @mouseenter="speakBad('提交')" 
            @mouseleave="stopSpeak"
            @keydown.enter="showError"
          >
            提交
          </div>
          
          <div 
            class="fake-icon" 
            @mouseenter="speakBad('叉叉图')" 
            @mouseleave="stopSpeak"
          >
            ✖
          </div>
        </div>

        <div class="reader-box">
          <div class="reader-header">🎧 读屏机播报内容：</div>
          <div class="reader-text" :class="{ empty: !currentBadSpeech }">
            {{ currentBadSpeech || '（只有字面，不知用途，键盘 Enter 无效）' }}
          </div>
        </div>
      </div>

      <!-- 优秀做法 -->
      <div class="pane good-pane">
        <h4 class="pane-title label-good">✅ 专业前端：语义化 + ARIA</h4>
        
        <div class="component-card">
          <!-- 使用真正的按钮和 ARIA -->
          <button 
            class="real-btn" 
            @mouseenter="speakGood('提交按钮。按下以发送表单。')" 
            @mouseleave="stopSpeak"
            @click="triggerAction"
          >
            提交
          </button>
          
          <button 
            class="real-icon-btn" 
            aria-label="关闭窗口" 
            @mouseenter="speakGood('关闭窗口，按钮。')" 
            @mouseleave="stopSpeak"
          >
            <span aria-hidden="true">✖</span>
          </button>
        </div>

        <div class="reader-box">
          <div class="reader-header">🎧 读屏机播报内容：</div>
          <div class="reader-text active">
            {{ currentGoodSpeech || '（悬停查看播报，支持 Tab 和 Enter 交互）' }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="status-msg">
      💡 提示：将鼠标悬停在上方按钮上，模拟视障用户读屏机“听到”的内容。<br/>
      可以尝试用键盘 Tab 键选中并按 Enter！只有右侧的按钮会响应。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentBadSpeech = ref('')
const currentGoodSpeech = ref('')

const speakBad = (text) => {
  currentBadSpeech.value = `文本："${text}"`
}
const speakGood = (text) => {
  currentGoodSpeech.value = `🗣️ ${text}`
}
const stopSpeak = () => {
  currentBadSpeech.value = ''
  currentGoodSpeech.value = ''
}
const showError = () => {
  alert('假按钮的 @keydown.enter 事件不会天生自带！')
}
const triggerAction = () => {
  alert('真按钮成功触发！')
}
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.demo-header {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.split-pane {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.pane {
  flex: 1;
  min-width: 250px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.pane-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.label-bad { color: var(--vp-c-danger, #e74c3c); }
.label-good { color: var(--vp-c-brand-1, #10b981); }

.component-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-grow: 1;
  padding: 2rem 0;
}

/* 假按钮完全不响应 tab 且无默认高亮样式 */
.fake-btn, .real-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  user-select: none;
}
.fake-btn {
  background: #e2e8f0;
  color: #475569;
  cursor: pointer;
  /* 缺少 focus 可见轮廓 */
  outline: none; 
}
.real-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  cursor: pointer;
}
.real-btn:focus-visible {
  outline: 3px solid var(--vp-c-brand-soft);
  outline-offset: 2px;
}

.fake-icon, .real-icon-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
}
.fake-icon {
  background: #f1f5f9;
  cursor: pointer;
}
.real-icon-btn {
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
}
.real-icon-btn:focus-visible {
  outline: 3px solid var(--vp-c-brand-soft);
}

.reader-box {
  background: #1e293b;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: auto;
  min-height: 80px;
  display: flex;
  flex-direction: column;
}

.reader-header {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.reader-text {
  color: white;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: bold;
  line-height: 1.4;
}
.reader-text.empty {
  color: #64748b;
  font-weight: normal;
}
.reader-text.active {
  color: #34d399; /* emerald-400 */
}

.status-msg {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  background: var(--vp-c-bg);
  padding: 0.8rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}
</style>
