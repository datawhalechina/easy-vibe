<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">环境变量的三个层级</span>
      <span class="subtitle">变量从外到内单向传递，子进程继承父进程的副本</span>
    </div>

    <div class="scope-stack">
      <div class="scope-layer system">
        <div class="layer-header">
          <span class="layer-icon">🖥️</span>
          <div>
            <div class="layer-title">系统级 <code>/etc/environment</code></div>
            <div class="layer-desc">所有用户、所有进程都能看到，由管理员配置</div>
          </div>
        </div>
        <div class="var-list">
          <div v-for="v in systemVars" :key="v.key" class="var-chip system-chip">
            <span class="chip-key">{{ v.key }}</span><span class="chip-eq">=</span><span class="chip-val">{{ v.value }}</span>
          </div>
        </div>
      </div>

      <div class="arrow-row">
        <span class="arrow-line" />
        <span class="arrow-label">▼ 子进程继承父进程环境</span>
        <span class="arrow-line" />
      </div>

      <div class="scope-layer user">
        <div class="layer-header">
          <span class="layer-icon">👤</span>
          <div>
            <div class="layer-title">用户级 <code>~/.zshrc</code></div>
            <div class="layer-desc">只影响当前用户，登录 Shell 启动时自动加载</div>
          </div>
        </div>
        <div class="var-list">
          <div v-for="v in userVars" :key="v.key" class="var-chip user-chip">
            <span class="chip-key">{{ v.key }}</span><span class="chip-eq">=</span><span class="chip-val">{{ v.value }}</span>
          </div>
          <div class="add-row">
            <input v-model="newKey" class="var-input" placeholder="KEY" maxlength="18" @keyup.enter="addVar" />
            <span class="eq-sign">=</span>
            <input v-model="newVal" class="var-input" placeholder="value" maxlength="24" @keyup.enter="addVar" />
            <button class="add-btn" :disabled="!newKey || !newVal" @click="addVar">export</button>
          </div>
        </div>
      </div>

      <div class="arrow-row">
        <span class="arrow-line" />
        <span class="arrow-label">▼ 启动子进程（如 node app.js）</span>
        <span class="arrow-line" />
      </div>

      <div class="scope-layer process">
        <div class="layer-header">
          <span class="layer-icon">⚙️</span>
          <div>
            <div class="layer-title">进程级（当前运行的程序）</div>
            <div class="layer-desc">继承所有上层变量，退出后消失，修改不影响父进程</div>
          </div>
        </div>
        <div class="var-list">
          <div v-for="v in processVars" :key="v.key" class="var-chip process-chip" :class="{ 'is-new': v.isNew }">
            <span class="chip-key">{{ v.key }}</span><span class="chip-eq">=</span><span class="chip-val">{{ v.value }}</span>
            <span v-if="v.isNew" class="new-badge">你加的</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>单向传递：</strong>变量只能向下继承，子进程修改变量值不会影响父进程。关闭终端后，直接 <code>export</code> 的变量也会消失。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const systemVars = [
  { key: 'PATH', value: '/usr/local/bin:/usr/bin:/bin' },
  { key: 'LANG', value: 'zh_CN.UTF-8' },
  { key: 'TZ', value: 'Asia/Shanghai' }
]

const baseUserVars = [
  { key: 'HOME', value: '/Users/alice' },
  { key: 'SHELL', value: '/bin/zsh' },
  { key: 'NVM_DIR', value: '$HOME/.nvm' }
]

const extraVars = ref([])
const newKey = ref('')
const newVal = ref('')

const userVars = computed(() => [...baseUserVars, ...extraVars.value])

const processVars = computed(() => [
  ...systemVars,
  ...userVars.value.map((v) => ({ ...v })),
  { key: 'NODE_ENV', value: 'development' },
  { key: 'PORT', value: '3000' }
])

const addVar = () => {
  if (!newKey.value || !newVal.value) return
  const key = newKey.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_')
  if (extraVars.value.some((v) => v.key === key)) return
  extraVars.value.push({ key, value: newVal.value, isNew: true })
  newKey.value = ''
  newVal.value = ''
}
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
  margin-bottom: 1rem;
}

.demo-header .title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.scope-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 0.75rem;
  min-width: 0;
}

.scope-layer {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.7rem 0.85rem;
  background: var(--vp-c-bg);
}

.scope-layer.system {
  border-color: var(--vp-c-yellow-1, #f59e0b);
  background: color-mix(in srgb, var(--vp-c-yellow-1, #f59e0b) 5%, var(--vp-c-bg));
}

.scope-layer.user {
  border-color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 5%, var(--vp-c-bg));
}

.scope-layer.process {
  border-color: var(--vp-c-green-1);
  background: color-mix(in srgb, var(--vp-c-green-1) 5%, var(--vp-c-bg));
}

.layer-header {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin-bottom: 0.55rem;
}

.layer-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.layer-title {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.layer-title code {
  font-size: 0.78rem;
  background: var(--vp-c-bg-soft);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
}

.layer-desc {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.var-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  min-width: 0;
}

.var-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.45rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  border: 1px solid;
  max-width: 100%;
  min-width: 0;
}

.system-chip { border-color: var(--vp-c-yellow-1, #f59e0b); background: color-mix(in srgb, var(--vp-c-yellow-1, #f59e0b) 12%, var(--vp-c-bg)); }
.user-chip { border-color: var(--vp-c-brand); background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg)); }
.process-chip { border-color: var(--vp-c-green-1); background: color-mix(in srgb, var(--vp-c-green-1) 10%, var(--vp-c-bg)); }
.process-chip.is-new { border-style: dashed; }

.chip-key { font-weight: bold; color: var(--vp-c-brand); }
.chip-eq { color: var(--vp-c-text-3); margin: 0 1px; }
.chip-val { color: var(--vp-c-text-2); max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.new-badge {
  margin-left: 0.35rem;
  background: var(--vp-c-green-1);
  color: white;
  font-size: 0.62rem;
  padding: 0 0.28rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-base);
  white-space: nowrap;
}

.add-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  margin-top: 0.1rem;
}

.var-input {
  flex: 1;
  min-width: 0;
  padding: 0.22rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  outline: none;
}

.var-input:focus { border-color: var(--vp-c-brand); }

.eq-sign { color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); }

.add-btn {
  padding: 0.22rem 0.6rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.76rem;
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
  flex-shrink: 0;
}

.add-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.arrow-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
}

.arrow-line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}

.arrow-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

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

.info-box code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  padding: 0 0.3rem;
  border-radius: 3px;
  color: var(--vp-c-brand);
}
</style>
