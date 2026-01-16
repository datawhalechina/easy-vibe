<template>
  <div class="branch-demo">
    <div class="panel">
      <div class="controls">
        <button @click="init" :disabled="inited" class="btn">初始化</button>
        <button @click="commit" :disabled="!inited" class="btn">提交</button>
        <button @click="branch" :disabled="!inited || hasBranch" class="btn">创建分支</button>
        <button @click="merge" :disabled="!hasBranch" class="btn">合并</button>
        <button @click="reset" class="btn secondary">重置</button>
      </div>

      <div class="graph">
        <svg viewBox="0 0 400 120">
          <line x1="50" y1="40" x2="350" y2="40" stroke="#3b82f6" stroke-width="3"/>
          <line v-if="hasBranch" x1="150" y1="40" x2="150" y2="80" stroke="#10b981" stroke-width="3"/>
          <line v-if="hasBranch" x1="150" y1="80" x2="300" y2="80" stroke="#10b981" stroke-width="3"/>
          <circle v-for="(c,i) in main" :cx="60+i*50" cy="40" r="8" fill="#3b82f6"/>
          <circle v-for="(c,i) in feat" :cx="180+i*50" cy="80" r="8" fill="#10b981"/>
        </svg>
      </div>

      <div class="status">
        <span>提交: {{ main.length }}</span>
        <span>分支: {{ hasBranch ? 2 : 1 }}</span>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 分支策略:</strong> 并行开发，互不干扰，最后合并</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const inited = ref(false)
const hasBranch = ref(false)
const main = ref([])
const feat = ref([])

const init = () => { inited.value = true; main.value = [1] }
const commit = () => { if(inited.value) main.value.push(1) }
const branch = () => { if(inited.value) { hasBranch.value = true; feat.value = [1] } }
const merge = () => { if(hasBranch.value) { main.value.push(1); hasBranch.value = false; feat.value = [] } }
const reset = () => { inited.value = false; hasBranch.value = false; main.value = []; feat.value = [] }
</script>

<style scoped>
.branch-demo { border: 1px solid var(--vp-c-divider); border-radius: 8px; background-color: var(--vp-c-bg-soft); padding: 1.5rem; margin: 1rem 0; }
.controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.btn { padding: 0.5rem 1rem; border: 1px solid var(--vp-c-brand); background: var(--vp-c-bg); color: var(--vp-c-brand); border-radius: 6px; cursor: pointer; }
.btn:hover:not(:disabled) { background: var(--vp-c-brand); color: var(--vp-c-bg); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn.secondary { border-color: var(--vp-c-divider); }
.graph { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); margin: 1rem 0; }
.graph svg { width: 100%; height: auto; }
.status { display: flex; gap: 2rem; }
.info-box { padding: 1rem; background: var(--vp-c-bg); border-left: 4px solid var(--vp-c-brand); border-radius: 4px; margin-top: 1rem; }
.info-box p { margin: 0; color: var(--vp-c-text-1); }
</style>
