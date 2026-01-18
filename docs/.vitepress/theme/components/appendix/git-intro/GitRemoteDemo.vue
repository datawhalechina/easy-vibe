<template>
  <div class="remote-demo">
    <div class="panel">
      <div class="repos">
        <div class="repo">
          <div class="header">💻 本地</div>
          <div class="commits">
            <div v-for="c in local" :key="c" class="commit-dot">
              <span class="dot local"></span>
              <span class="hash">{{ c.substring(0, 6) }}</span>
            </div>
            <div v-if="local.length === 0" class="empty">无</div>
          </div>
        </div>

        <div class="sync">⇄</div>

        <div class="repo">
          <div class="header">☁️ 远程</div>
          <div class="commits">
            <div v-for="c in remote" :key="c" class="commit-dot">
              <span class="dot remote"></span>
              <span class="hash">{{ c.substring(0, 6) }}</span>
            </div>
            <div v-if="remote.length === 0" class="empty">无</div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button @click="localCommit" class="btn">本地提交</button>
        <button
          @click="push"
          :disabled="local.length <= remote.length"
          class="btn"
        >
          推送 Push
        </button>
        <button @click="pull" :disabled="!hasRemote" class="btn">
          拉取 Pull
        </button>
        <button @click="reset" class="btn secondary">重置</button>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 远程协作:</strong> Push 上传，Pull 下载，保持同步</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const local = ref([])
const remote = ref([])
const hasRemote = ref(false)

const localCommit = () => {
  local.value.push(Math.random().toString(16).substr(2, 7))
}
const push = () => {
  remote.value.push(...local.value.slice(remote.value.length))
  hasRemote.value = false
}
const pull = () => {
  if (hasRemote.value) local.value.push(Math.random().toString(16).substr(2, 7))
  hasRemote.value = false
}
const reset = () => {
  local.value = []
  remote.value = []
  hasRemote.value = false
}
</script>

<style scoped>
.remote-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}
.repos {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: stretch;
  margin-bottom: 1rem;
}
.repo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}
.header {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.commits {
  min-height: 80px;
}
.commit-dot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.local {
  background: #3b82f6;
}
.dot.remote {
  background: #10b981;
}
.hash {
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.sync {
  font-size: 2rem;
  text-align: center;
}
.empty {
  color: var(--vp-c-text-3);
  text-align: center;
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

@media (max-width: 768px) {
  .repos {
    grid-template-columns: 1fr;
  }
  .sync {
    transform: rotate(90deg);
  }
}
</style>
