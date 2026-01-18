<template>
  <div class="stash-demo">
    <div class="panel">
      <div class="areas">
        <div class="area">
          <div class="header">💻 工作区 ({{ work.length }})</div>
          <div v-for="f in work" :key="f" class="file">📄 {{ f }}</div>
          <div v-if="work.length === 0" class="empty">空</div>
        </div>

        <div class="area">
          <div class="header">📚 Stash 栈 ({{ stash.length }})</div>
          <div v-for="(s, i) in stash" :key="i" class="stash-item">
            <span class="num">{{ i + 1 }}</span>
            <span class="msg">{{ s }}</span>
          </div>
          <div v-if="stash.length === 0" class="empty">空</div>
        </div>
      </div>

      <div class="controls">
        <button @click="doWork" :disabled="work.length > 0" class="btn">
          修改
        </button>
        <button
          @click="save"
          :disabled="work.length === 0 || stash.length >= 3"
          class="btn"
        >
          保存
        </button>
        <button @click="pop" :disabled="stash.length === 0" class="btn">
          恢复
        </button>
        <button @click="reset" class="btn secondary">重置</button>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 Stash 用途:</strong> 临时保存工作现场，切换任务</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const work = ref([])
const stash = ref([])
const doWork = () => {
  work.value = ['file.js', 'style.css']
}
const save = () => {
  stash.value.push('WIP')
  work.value = []
}
const pop = () => {
  if (stash.value.length) {
    stash.value.pop()
    work.value = ['file.js']
  }
}
const reset = () => {
  work.value = []
  stash.value = []
}
</script>

<style scoped>
.stash-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}
.areas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
.area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}
.header {
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.file,
.stash-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  margin-bottom: 0.25rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.stash-item .num {
  width: 20px;
  height: 20px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}
.empty {
  color: var(--vp-c-text-3);
  text-align: center;
  font-style: italic;
  padding: 1rem;
}
.controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border-radius: 6px;
  cursor: pointer;
}
.btn:hover:not(:disabled) {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn.secondary {
  border-color: var(--vp-c-divider);
}
.info-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
}
.info-box p {
  margin: 0;
  color: var(--vp-c-text-1);
}
</style>
