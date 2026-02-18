<template>
  <div class="remote-demo">
    <div class="panel">
      <div class="repos">
        <div class="repo">
          <div class="header">
            💻 本地
          </div>
          <div class="meta">
            <span class="badge">main</span>
            <span class="hint"> Ahead {{ ahead }} / Behind {{ behind }} </span>
          </div>
          <div class="commits">
            <div
              v-for="c in local"
              :key="c"
              class="commit-dot"
            >
              <span class="dot local" />
              <span class="hash">{{ c.substring(0, 6) }}</span>
            </div>
            <div
              v-if="local.length === 0"
              class="empty"
            >
              无
            </div>
          </div>
        </div>

        <div class="sync">
          ⇄
        </div>

        <div class="repo">
          <div class="header">
            ☁️ 远程
          </div>
          <div class="meta">
            <span class="badge">origin/main</span>
            <span class="hint">模拟队友提交在这里发生</span>
          </div>
          <div class="commits">
            <div
              v-for="c in remote"
              :key="c"
              class="commit-dot"
            >
              <span class="dot remote" />
              <span class="hash">{{ c.substring(0, 6) }}</span>
            </div>
            <div
              v-if="remote.length === 0"
              class="empty"
            >
              无
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button
          class="btn"
          @click="localCommit"
        >
          本地提交
        </button>
        <button
          class="btn"
          @click="remoteCommit"
        >
          远程新增提交
        </button>
        <button
          :disabled="local.length <= remote.length"
          class="btn"
          @click="push"
        >
          git push
        </button>
        <button
          :disabled="behind === 0"
          class="btn"
          @click="pull"
        >
          git pull
        </button>
        <button
          class="btn secondary"
          @click="reset"
        >
          重置
        </button>
      </div>
    </div>

    <div class="info-box">
      <p>
        <strong>💡 远程协作:</strong> 你本地落后（Behind）就
        pull，你本地领先（Ahead）就 push。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const local = ref([])
const remote = ref([])

const localCommit = () => {
  local.value.push(Math.random().toString(16).substr(2, 7))
}

const remoteCommit = () => {
  remote.value.push(Math.random().toString(16).substr(2, 7))
}

const push = () => {
  remote.value = [...local.value]
}

const pull = () => {
  local.value = [...remote.value]
}

const ahead = computed(() =>
  Math.max(0, local.value.length - remote.value.length)
)
const behind = computed(() =>
  Math.max(0, remote.value.length - local.value.length)
)

const reset = () => {
  local.value = []
  remote.value = []
}
</script>

<style scoped>
.remote-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 0.5rem 0;
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
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
}
.header {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
}
.hint {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
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
  background: var(--vp-c-brand);
}
.dot.remote {
  background: rgba(var(--vp-c-brand-rgb), 0.5);
}
.hash {
  font-family: var(--vp-font-family-mono);
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
  padding: 0.75rem;
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
  padding: 0.75rem;
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
