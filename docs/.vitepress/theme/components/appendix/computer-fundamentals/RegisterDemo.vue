<template>
  <div class="register-demo">
    <div class="demo-label">1 位寄存器 ── 只在"写入"时更新存储值</div>

    <div class="reg-panel">
      <!-- Input -->
      <div class="reg-block">
        <span class="reg-title">输入</span>
        <button
          class="toggle-btn"
          :class="{ on: inputData === 1 }"
          @click="inputData = inputData === 1 ? 0 : 1"
        >
          {{ inputData }}
        </button>
      </div>

      <!-- Write -->
      <button
        class="write-btn"
        :class="{ flash: isWriting }"
        @click="writeOnce"
      >
        写入 →
      </button>

      <!-- Stored -->
      <div class="reg-block">
        <span class="reg-title">存储</span>
        <span
          class="val-box"
          :class="{ on: storedData === 1, flash: isWriting }"
          >{{ storedData }}</span
        >
      </div>

      <!-- Output -->
      <div class="reg-block">
        <span class="reg-title">输出</span>
        <span class="val-box out" :class="{ on: storedData === 1 }">{{
          storedData
        }}</span>
      </div>
    </div>

    <div class="status-line">
      {{
        inputData !== storedData
          ? '⚡ 输入≠存储 → 点"写入"即可更新'
          : '✓ 输入与存储一致'
      }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputData = ref(0)
const storedData = ref(0)
const isWriting = ref(false)

const writeOnce = () => {
  isWriting.value = true
  storedData.value = inputData.value
  setTimeout(() => {
    isWriting.value = false
  }, 400)
}
</script>

<style scoped>
.register-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

/* ── panel ── */
.reg-panel {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.reg-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.reg-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.toggle-btn {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.on {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.write-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-warning-1, #d97706);
  background: var(--vp-c-bg);
  color: var(--vp-c-warning-1, #d97706);
  font-size: 0.82rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.write-btn:hover {
  background: var(--vp-c-warning-soft, rgba(217, 119, 6, 0.1));
}

.write-btn.flash {
  background: var(--vp-c-warning-1, #d97706);
  color: white;
}

.val-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  transition: all 0.2s;
}

.val-box.on {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.val-box.flash {
  box-shadow: 0 0 0 3px var(--vp-c-warning-soft, rgba(217, 119, 6, 0.25));
}

.val-box.out {
  border-style: dashed;
}

.status-line {
  margin-top: 0.5rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 480px) {
  .reg-panel {
    justify-content: center;
  }
}
</style>
