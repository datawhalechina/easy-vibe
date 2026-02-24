<template>
  <div class="bios-post-demo">
    <div class="demo-label">BIOS POST 硬件自检 ── 点击查看检测项目</div>

    <div class="post-items">
      <div
        v-for="item in postItems"
        :key="item.name"
        class="post-item"
        :class="{ passed: item.passed, error: item.error }"
        @click="item.passed = !item.passed"
      >
        <div class="item-status">{{ item.passed ? '✅' : item.error ? '❌' : '⏳' }}</div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div class="post-result">
      <span v-if="allPassed" class="result-pass">✅ 自检通过，准备启动</span>
      <span v-else class="result-pending">⏳ 点击项目模拟检测状态</span>
    </div>

    <div class="tap-hint">👆 点击模拟检测结果</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const postItems = ref([
  { name: 'CPU', desc: '处理器完整性检测', passed: false, error: false },
  { name: '内存', desc: 'RAM 容量和可用性检测', passed: false, error: false },
  { name: '显卡', desc: '显示适配器初始化', passed: false, error: false },
  { name: '硬盘', desc: '存储设备识别', passed: false, error: false },
  { name: '键盘', desc: '键盘接口检测', passed: false, error: false },
  { name: '鼠标', desc: '鼠标接口检测', passed: false, error: false }
])

const allPassed = computed(() => postItems.value.every(item => item.passed))
</script>

<style scoped>
.bios-post-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.post-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.3s;
}

.post-item.passed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.post-item.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.item-status {
  font-size: 1rem;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.item-desc {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-result {
  margin-top: 0.75rem;
  text-align: center;
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.result-pass {
  color: #22c55e;
  font-weight: 600;
}

.result-pending {
  color: var(--vp-c-text-3);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
}
</style>
