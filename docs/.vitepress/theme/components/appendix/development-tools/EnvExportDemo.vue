<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">export 决定子进程能不能"看见"变量</span>
      <span class="subtitle">切换开关，观察子进程是否能读到父进程设置的变量</span>
    </div>

    <div class="control-panel">
      <label class="toggle-wrap">
        <span class="toggle-label">使用 <code>export</code></span>
        <button class="toggle-btn" :class="{ on: useExport }" @click="useExport = !useExport">
          <span class="thumb" />
        </button>
      </label>
    </div>

    <div class="two-col">
      <!-- Parent shell -->
      <div class="shell-box parent">
        <div class="shell-title">父进程（Shell）</div>
        <div class="shell-body">
          <div class="cmd-line">
            <span class="prompt">$</span>
            <span class="cmd" :class="{ exported: useExport }">
              <span v-if="useExport">export </span>MY_VAR="hello"
            </span>
          </div>
          <div class="cmd-line">
            <span class="prompt">$</span>
            <span class="cmd">echo $MY_VAR</span>
          </div>
          <div class="output">hello</div>
          <div class="cmd-line">
            <span class="prompt">$</span>
            <span class="cmd">bash -c 'echo $MY_VAR'</span>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="arrow-col">
        <div class="arrow-label">启动子进程</div>
        <div class="arrow-icon">→</div>
        <div class="inherit-tag" :class="useExport ? 'yes' : 'no'">
          {{ useExport ? '变量已继承' : '变量未继承' }}
        </div>
      </div>

      <!-- Child shell -->
      <div class="shell-box child" :class="{ has: useExport, missing: !useExport }">
        <div class="shell-title">子进程（bash -c ...）</div>
        <div class="shell-body">
          <div class="cmd-line">
            <span class="prompt">$</span>
            <span class="cmd">echo $MY_VAR</span>
          </div>
          <div v-if="useExport" class="output success">hello</div>
          <div v-else class="output empty">（空，什么都没有）</div>
          <div class="cmd-line muted">
            <span class="prompt">#</span>
            <span class="cmd muted-text">子进程无法修改父进程的变量</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ useExport ? '有 export：' : '没有 export：' }}</strong>
      {{ useExport
        ? '变量被标记为"可导出"，子进程启动时自动继承一份副本。'
        : '变量只存在于当前 Shell，子进程读到的是空字符串。' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const useExport = ref(false)
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 0.75rem 0;
  min-width: 0;
  overflow: hidden;
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.demo-header .title { font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); }
.demo-header .subtitle { font-size: 0.82rem; color: var(--vp-c-text-2); }

.control-panel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  margin-bottom: 0.85rem;
}

.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
}

.toggle-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  user-select: none;
}

.toggle-label code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
  font-size: 0.82rem;
}

.toggle-btn {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.25s;
  flex-shrink: 0;
}

.toggle-btn.on {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.thumb {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--vp-c-text-2);
  top: 2px;
  left: 2px;
  transition: all 0.25s;
}

.toggle-btn.on .thumb {
  left: 22px;
  background: white;
}

/* ── Two column layout ── */
.two-col {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.6rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

@media (max-width: 600px) {
  .two-col {
    grid-template-columns: 1fr;
  }
  .arrow-col { flex-direction: row; justify-content: center; }
}

.shell-box {
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: #1e1e2e;
  transition: border-color 0.3s;
  min-width: 0;
}

.shell-box.has { border-color: var(--vp-c-green-1); }
.shell-box.missing { border-color: color-mix(in srgb, #f87171 60%, transparent); }

.shell-title {
  background: #181825;
  padding: 0.28rem 0.65rem;
  font-size: 0.72rem;
  color: #6c7086;
}

.shell-body {
  padding: 0.5rem 0.65rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.8;
}

.cmd-line { display: flex; gap: 0.4rem; align-items: baseline; }

.prompt { color: #6c7086; flex-shrink: 0; }
.cmd { color: #cdd6f4; word-break: break-all; }
.cmd.exported { color: #a6e3a1; }

.muted .prompt { color: #45475a; }
.muted-text { color: #45475a; font-style: italic; font-size: 0.72rem; }

.output {
  padding-left: 1rem;
  font-size: 0.82rem;
  line-height: 1.6;
}

.output.success { color: #a6e3a1; }
.output.empty { color: #585b70; font-style: italic; }

.arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.arrow-label { font-size: 0.7rem; color: var(--vp-c-text-3); white-space: nowrap; }

.arrow-icon {
  font-size: 1.4rem;
  color: var(--vp-c-text-3);
  transition: color 0.3s;
}

.inherit-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: bold;
  white-space: nowrap;
  transition: all 0.3s;
}

.inherit-tag.yes { background: color-mix(in srgb, var(--vp-c-green-1) 15%, transparent); color: var(--vp-c-green-1); border: 1px solid var(--vp-c-green-1); }
.inherit-tag.no { background: color-mix(in srgb, #f87171 12%, transparent); color: #f87171; border: 1px solid #f87171; }

.info-box {
  display: block;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong { white-space: nowrap; color: var(--vp-c-text-1); }
</style>
