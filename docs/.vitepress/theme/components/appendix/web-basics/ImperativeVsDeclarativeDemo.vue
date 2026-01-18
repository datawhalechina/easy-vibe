<template>
  <div class="imperative-declarative-demo">
    <div class="demo-grid">
      <!-- Imperative (jQuery Style) -->
      <div class="panel imperative">
        <div class="panel-header">
          <span class="badge yellow">Imperative (命令式)</span>
          <span class="sub-text">jQuery Style</span>
        </div>
        <div class="code-preview">
          <code>
            // 手动操作 DOM<br />
            $('#count').text(val);<br />
            if (val > 5) $('#msg').show();
          </code>
        </div>
        <div class="interactive-area">
          <div class="output-box">
            Count: <span id="imp-count-display">{{ impCount }}</span>
            <div v-show="impShowMsg" class="warning-msg">⚠️ Count is high!</div>
          </div>
          <div class="actions">
            <button @click="impIncrement" class="btn">Step 1: Value++</button>
            <button @click="impUpdateText" class="btn" :disabled="!impChanged">
              Step 2: Update Text
            </button>
            <button
              @click="impCheckState"
              class="btn"
              :disabled="!impTextUpdated"
            >
              Step 3: Check Logic
            </button>
          </div>
          <div class="status-log">{{ impStatus }}</div>
        </div>
      </div>

      <!-- Declarative (Vue Style) -->
      <div class="panel declarative">
        <div class="panel-header">
          <span class="badge green">Declarative (声明式)</span>
          <span class="sub-text">Vue/React Style</span>
        </div>
        <div class="code-preview">
          <code>
            // 只需要绑定数据<br />
            {{ '{' + '{ count }' + '}' }}<br />
            &lt;div v-if="count > 5"&gt;...&lt;/div&gt;
          </code>
        </div>
        <div class="interactive-area">
          <div class="output-box">
            Count: <span>{{ decCount }}</span>
            <div v-if="decCount > 5" class="warning-msg">⚠️ Count is high!</div>
          </div>
          <div class="actions">
            <button @click="decIncrement" class="btn primary">
              Value++ (Auto Render)
            </button>
          </div>
          <div class="status-log">
            Framework handles DOM updates automatically.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Imperative State
const impCount = ref(0)
const impShowMsg = ref(false)
const impChanged = ref(false)
const impTextUpdated = ref(false)
const impStatus = ref('Ready.')

const impIncrement = () => {
  // Logic layer changes, but DOM doesn't
  impStatus.value =
    'Variable `count` is now ' + (impCount.value + 1) + '. DOM is NOT updated.'
  impCount.value++
  impChanged.value = true
  impTextUpdated.value = false
}

const impUpdateText = () => {
  // Manually update text
  impStatus.value = 'DOM text updated manually.'
  impChanged.value = false
  impTextUpdated.value = true
}

const impCheckState = () => {
  // Manually check logic
  if (impCount.value > 5) {
    impShowMsg.value = true
    impStatus.value = 'Logic checked: > 5. Manually showing message.'
  } else {
    impShowMsg.value = false
    impStatus.value = 'Logic checked: <= 5. No message.'
  }
}

// Declarative State
const decCount = ref(0)
const decIncrement = () => {
  decCount.value++
}
</script>

<style scoped>
.imperative-declarative-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-alt);
}

.badge {
  font-size: 0.8rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  color: white;
}
.badge.yellow {
  background: #f59e0b;
}
.badge.green {
  background: #10b981;
}

.sub-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.code-preview {
  background: #1e1e2e;
  padding: 0.8rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: #a6accd;
  height: 80px;
}

.interactive-area {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.output-box {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.warning-msg {
  color: #ef4444;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  animation: popIn 0.3s;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.btn:hover:not(:disabled) {
  background: #f3f4f6;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn.primary {
  background: #3b82f6;
  color: white;
  border: none;
}
.btn.primary:hover {
  background: #2563eb;
}

.status-log {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-style: italic;
  min-height: 1.2em;
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
