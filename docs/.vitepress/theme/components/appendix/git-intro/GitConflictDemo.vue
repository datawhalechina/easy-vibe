<template>
  <div class="conflict-demo">
    <div class="panel">
      <div class="editor">
        <div class="line normal"><span class="ln">1</span>function greet() {</div>
        <div class="line normal"><span class="ln">2</span>  console.log('Hi');</div>
        <div class="line conflict"><span class="ln">3</span>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
        <div class="line current"><span class="ln">4</span>  console.log('Welcome') // 当前版本</div>
        <div class="line conflict"><span class="ln">5</span>=======</div>
        <div class="line incoming"><span class="ln">6</span>  console.log('Greetings') // 传入版本</div>
        <div class="line conflict"><span class="ln">7</span>&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</div>
        <div class="line normal"><span class="ln">8</span>  console.log('Bye');</div>
      </div>

      <div class="actions">
        <button @click="resolve('current')" class="action-btn">保留当前</button>
        <button @click="resolve('incoming')" class="action-btn">保留传入</button>
        <button @click="resolve('manual')" class="action-btn">手动合并</button>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 解决冲突:</strong> 选择保留哪个版本，或手动编辑合并</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const resolved = ref(false)
const resolve = (choice) => { resolved.value = true }
</script>

<style scoped>
.conflict-demo { border: 1px solid var(--vp-c-divider); border-radius: 8px; background-color: var(--vp-c-bg-soft); padding: 1.5rem; margin: 1rem 0; }
.editor { background: #1f2937; border-radius: 8px; padding: 1rem; font-family: monospace; margin-bottom: 1rem; }
.line { display: flex; gap: 0.5rem; line-height: 1.6; }
.ln { color: #6b7280; min-width: 2rem; }
.line.normal { color: #d1d5db; }
.line.conflict { color: #f59e0b; }
.line.current { color: #60a5fa; background: rgba(96,165,250,0.1); }
.line.incoming { color: #a78bfa; background: rgba(167,139,250,0.1); }
.actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.action-btn { padding: 0.625rem 1.25rem; border: 1px solid var(--vp-c-brand); background: var(--vp-c-bg); color: var(--vp-c-brand); border-radius: 6px; cursor: pointer; }
.action-btn:hover { background: var(--vp-c-brand); color: var(--vp-c-bg); }
.info-box { padding: 1rem; background: var(--vp-c-bg); border-left: 4px solid var(--vp-c-brand); border-radius: 4px; }
.info-box p { margin: 0; color: var(--vp-c-text-1); }
</style>
