<template>
  <div class="garbled-demo">
    <div class="demo-scenario">
      <div class="scenario-label">你收到的文件内容（字节流）</div>
      <div class="bytes-display">
        <span v-for="(byte, i) in fileBytes" :key="i" class="byte-chip">0x{{ byte }}</span>
      </div>
    </div>

    <div class="decoder-panel">
      <div class="decoder-label">用什么规则来「读」它？</div>
      <div class="encoding-buttons">
        <button
          v-for="enc in encodings"
          :key="enc.name"
          :class="['enc-btn', { active: selectedEncoding === enc.name }]"
          @click="selectedEncoding = enc.name"
        >
          {{ enc.label }}
        </button>
      </div>
    </div>

    <div class="result-panel" :class="currentEncoding.correct ? 'correct' : 'garbled'">
      <div class="result-label">
        <span v-if="currentEncoding.correct">正确（{{ selectedEncoding }}）</span>
        <span v-else>乱码！（用 {{ selectedEncoding }} 读 UTF-8 文件）</span>
      </div>
      <div class="result-text">{{ currentEncoding.result }}</div>
      <div class="result-explanation">{{ currentEncoding.explanation }}</div>
    </div>

    <div class="insight-box">
      <strong>核心领悟</strong>：字节本身没有含义，<strong>编码规则决定了字节变成什么字</strong>。发件人用 UTF-8 存，你用 GBK 读，当然面目全非。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// "你好" in UTF-8 bytes (hex)
const fileBytes = ['E4', 'BD', 'A0', 'E5', 'A5', 'BD']

const encodings = [
  {
    name: 'UTF-8',
    label: 'UTF-8（正确）',
    result: '你好',
    correct: true,
    explanation: '发件人用 UTF-8 存储了「你好」，你也用 UTF-8 读，当然正确。'
  },
  {
    name: 'GBK',
    label: 'GBK（乱码）',
    result: '浣犲ソ',
    correct: false,
    explanation: 'GBK 用不同的规则把同样的字节解读成了另一些字，所以出现了乱码。'
  },
  {
    name: 'Latin-1',
    label: 'Latin-1（乱码）',
    result: 'ä½ å¥½',
    correct: false,
    explanation: 'Latin-1（ISO-8859-1）只能表示 256 个字符，把 UTF-8 的多字节序列当成单字节，全乱了。'
  }
]

const selectedEncoding = ref('UTF-8')

const currentEncoding = computed(() =>
  encodings.find(e => e.name === selectedEncoding.value) || encodings[0]
)
</script>

<style scoped>
.garbled-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-scenario {
  background: var(--vp-c-bg);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.scenario-label,
.decoder-label {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.bytes-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.byte-chip {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 7px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.decoder-panel {
  background: var(--vp-c-bg);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.encoding-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.enc-btn {
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.enc-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.result-panel {
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid;
  transition: all 0.3s;
}

.result-panel.correct {
  border-color: var(--vp-c-green-1);
  background: rgba(16, 185, 129, 0.08);
}

.result-panel.garbled {
  border-color: #f87171;
  background: rgba(248, 113, 113, 0.08);
}

.result-label {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.result-text {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  font-family: sans-serif;
}

.result-explanation {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.insight-box {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
