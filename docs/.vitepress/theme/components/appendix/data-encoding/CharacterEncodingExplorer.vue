<template>
  <div class="encoding-explorer">
    <div class="input-row">
      <label class="input-label">输入任意文字，看看它在计算机里长什么样</label>
      <input
        v-model="inputText"
        class="text-input"
        placeholder="输入文字，如：你好 Hello 🎉"
        maxlength="20"
      />
      <div class="quick-btns">
        <button v-for="preset in presets" :key="preset" class="preset-btn" @click="inputText = preset">
          {{ preset }}
        </button>
      </div>
    </div>

    <div v-if="inputText" class="char-breakdown">
      <div class="breakdown-header">
        <span class="col-char">字符</span>
        <span class="col-arrow">→</span>
        <span class="col-unicode">Unicode 码点</span>
        <span class="col-arrow">→</span>
        <span class="col-utf8">UTF-8 字节</span>
        <span class="col-bytes">字节数</span>
      </div>
      <transition-group name="fade" tag="div">
        <div
          v-for="(item, i) in charData"
          :key="i"
          class="char-row"
          :class="item.type"
        >
          <span class="col-char char-glyph">{{ item.char }}</span>
          <span class="col-arrow dim">→</span>
          <span class="col-unicode codepoint">{{ item.codepoint }}</span>
          <span class="col-arrow dim">→</span>
          <div class="col-utf8 bytes-grid">
            <span v-for="(b, j) in item.utf8Bytes" :key="j" class="hex-byte">{{ b }}</span>
          </div>
          <span class="col-bytes byte-count">{{ item.byteCount }} 字节</span>
        </div>
      </transition-group>
    </div>

    <div v-if="inputText" class="summary-row">
      <div class="summary-item">
        <span class="s-label">字符数</span>
        <span class="s-value">{{ charData.length }}</span>
      </div>
      <div class="summary-item">
        <span class="s-label">UTF-8 总字节数</span>
        <span class="s-value highlight">{{ totalBytes }}</span>
      </div>
      <div class="summary-item">
        <span class="s-label">平均每字符</span>
        <span class="s-value">{{ avgBytes }} 字节</span>
      </div>
    </div>

    <div class="tip-box">
      <span><strong>提示：</strong>英文字母在 UTF-8 中只占 <strong>1 字节</strong>，常用汉字占 <strong>3 字节</strong>，Emoji 占 <strong>4 字节</strong>。这就是为什么处理中文文本时，“字符数”和“字节数”是两个完全不同的概念。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('你好 Hello')
const presets = ['你好', 'Hello', '你好 Hello', '🎉', 'AI助手']

function toUtf8Bytes(char) {
  const bytes = []
  const encoder = new TextEncoder()
  const encoded = encoder.encode(char)
  for (const b of encoded) {
    bytes.push('0x' + b.toString(16).toUpperCase().padStart(2, '0'))
  }
  return bytes
}

function getCharType(char) {
  const code = char.codePointAt(0)
  if (code > 0xFFFF) return 'emoji'
  if (code > 0x4E00 && code < 0x9FFF) return 'cjk'
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return 'ascii'
  return 'other'
}

const charData = computed(() => {
  return [...inputText.value].slice(0, 12).map(char => {
    const utf8Bytes = toUtf8Bytes(char)
    return {
      char,
      codepoint: 'U+' + char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
      utf8Bytes,
      byteCount: utf8Bytes.length,
      type: getCharType(char)
    }
  })
})

const totalBytes = computed(() => charData.value.reduce((s, c) => s + c.byteCount, 0))
const avgBytes = computed(() => charData.value.length ? (totalBytes.value / charData.value.length).toFixed(1) : 0)
</script>

<style scoped>
.encoding-explorer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--vp-font-family-base);
}

.input-label {
  display: block;
  font-size: 0.88rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.text-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 1rem;
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.text-input:focus { border-color: var(--vp-c-brand); }

.quick-btns {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.preset-btn {
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.15s;
}

.preset-btn:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.char-breakdown {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.breakdown-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  gap: 0.5rem;
}

.char-row {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  gap: 0.5rem;
  transition: background 0.2s;
}

.char-row:hover { background: var(--vp-c-bg-soft); }
.char-row.emoji { border-left: 3px solid #f59e0b; }
.char-row.cjk { border-left: 3px solid var(--vp-c-brand); }
.char-row.ascii { border-left: 3px solid var(--vp-c-green-1); }
.char-row.other { border-left: 3px solid var(--vp-c-divider); }

.col-char { width: 2.5rem; text-align: center; }
.col-unicode { width: 6rem; font-family: monospace; font-size: 0.82rem; color: var(--vp-c-brand); }
.col-utf8 { flex: 1; }
.col-bytes { width: 4.5rem; text-align: right; font-size: 0.8rem; }
.col-arrow { color: var(--vp-c-divider); font-size: 0.8rem; }

.char-glyph { font-size: 1.4rem; font-weight: bold; }
.codepoint { font-family: monospace; }
.dim { opacity: 0.4; }

.bytes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.hex-byte {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 1px 5px;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.byte-count {
  font-weight: bold;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.summary-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.summary-item {
  flex: 1;
  min-width: 100px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.s-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.s-value {
  font-size: 1.4rem;
  font-weight: bold;
}

.s-value.highlight { color: var(--vp-c-brand); }

.tip-box {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-yellow-1);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  display: flex;
  gap: 0.5rem;
}

.tip-icon { font-size: 1rem; flex-shrink: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
