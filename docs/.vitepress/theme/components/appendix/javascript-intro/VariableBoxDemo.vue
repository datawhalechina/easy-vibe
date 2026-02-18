<script setup>
import { ref } from 'vue'

const name = ref('张三')
const age = ref(25)
const isStudent = ref(true)
const showMessage = ref('')
const messageType = ref('')
let messageTimer = null

const clearMessage = () => {
  showMessage.value = ''
  messageType.value = ''
}

const setMessage = (msg, type) => {
  if (messageTimer) clearTimeout(messageTimer)
  showMessage.value = msg
  messageType.value = type
  messageTimer = setTimeout(() => clearMessage(), 2000)
}

const modifyAge = () => {
  age.value = 26
  setMessage('✅ let 可以修改', 'success')
}

const modifyName = () => {
  setMessage('❌ const 不能改', 'error')
}

const reset = () => {
  name.value = '张三'
  age.value = 25
  isStudent.value = true
  clearMessage()
}
</script>

<template>
  <div class="variable-box-demo">
    <div class="demo-header">
      <span class="title">📦 变量就像带名字的盒子</span>
    </div>

    <div class="boxes-row">
      <div class="var-box" :class="{ error: messageType === 'error' }">
        <div class="box-tag const">const</div>
        <div class="box-name">name</div>
        <div class="box-value">{{ name }}</div>
        <div class="box-lock">🔒</div>
      </div>

      <div class="var-box" :class="{ success: messageType === 'success' }">
        <div class="box-tag let">let</div>
        <div class="box-name">age</div>
        <div class="box-value">{{ age }}</div>
        <div class="box-lock">🔓</div>
      </div>

      <div class="var-box">
        <div class="box-tag const">const</div>
        <div class="box-name">isStudent</div>
        <div class="box-value">{{ isStudent }}</div>
        <div class="box-lock">🔒</div>
      </div>
    </div>

    <div class="message" v-if="showMessage" :class="messageType">
      {{ showMessage }}
    </div>

    <div class="controls">
      <button @click="modifyAge" class="btn btn-primary">修改 age</button>
      <button @click="modifyName" class="btn btn-danger">修改 name</button>
      <button @click="reset" class="btn btn-secondary">重置</button>
    </div>

    <div class="code-snippet">
      <code>const name = "{{ name }}"</code>
      <code>let age = {{ age }}</code>
    </div>
  </div>
</template>

<style scoped>
.variable-box-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg);
}

.demo-header {
  margin-bottom: 16px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.boxes-row {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.var-box {
  width: 100px;
  height: 100px;
  border: 2px solid var(--vp-c-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.var-box.error {
  border-color: #ef4444;
  background: #fef2f2;
  animation: shake 0.4s ease;
}

.var-box.success {
  border-color: #10b981;
  background: #ecfdf5;
  animation: pulse 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.box-tag {
  position: absolute;
  top: -10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  color: white;
}

.box-tag.const {
  background: #3b82f6;
}

.box-tag.let {
  background: #10b981;
}

.box-name {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.box-value {
  font-size: 20px;
  font-weight: 600;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.box-lock {
  position: absolute;
  bottom: 8px;
  font-size: 12px;
}

.message {
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 500;
}

.message.error {
  background: #fef2f2;
  color: #dc2626;
}

.message.success {
  background: #ecfdf5;
  color: #059669;
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.code-snippet {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-snippet code {
  font-family: monospace;
  font-size: 12px;
  color: #d4d4d4;
}
</style>
