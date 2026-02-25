<!--
  LinuxPermissionsDemo.vue
  Linux 权限系统演示
-->
<template>
  <div class="linux-perm-demo">
    <div class="header">
      <div class="title">Linux 权限解读器</div>
      <div class="subtitle">输入权限字符串或数字，查看含义</div>
    </div>

    <div class="input-row">
      <div class="input-group">
        <label>权限数字（如 755）</label>
        <input v-model="permNum" type="text" maxlength="3" placeholder="755" @input="onNumInput" />
      </div>
      <div class="perm-string">{{ permString }}</div>
    </div>

    <div class="perm-grid">
      <div v-for="(group, gi) in groups" :key="gi" class="perm-group">
        <div class="group-label">{{ group.label }}</div>
        <div class="bits">
          <label v-for="(bit, bi) in group.bits" :key="bi" class="bit-label">
            <input type="checkbox" v-model="bit.on" @change="onBitChange" />
            <span :class="['bit-char', bit.char]">{{ bit.char }}</span>
            <span class="bit-name">{{ bit.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="examples">
      <div class="ex-title">常见权限组合</div>
      <div class="ex-grid">
        <div v-for="ex in examples" :key="ex.num" class="ex-item" @click="setPermNum(ex.num)">
          <code>{{ ex.num }}</code>
          <span class="ex-desc">{{ ex.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const groups = reactive([
  {
    label: '所有者（Owner）',
    bits: [
      { char: 'r', name: '读', on: true },
      { char: 'w', name: '写', on: true },
      { char: 'x', name: '执行', on: true }
    ]
  },
  {
    label: '所属组（Group）',
    bits: [
      { char: 'r', name: '读', on: true },
      { char: 'w', name: '写', on: false },
      { char: 'x', name: '执行', on: true }
    ]
  },
  {
    label: '其他人（Others）',
    bits: [
      { char: 'r', name: '读', on: true },
      { char: 'w', name: '写', on: false },
      { char: 'x', name: '执行', on: true }
    ]
  }
])

const permNum = ref('755')

const permString = computed(() => {
  return '-' + groups.map(g =>
    g.bits.map(b => b.on ? b.char : '-').join('')
  ).join('')
})

function bitsToNum() {
  return groups.map(g => {
    let n = 0
    if (g.bits[0].on) n += 4
    if (g.bits[1].on) n += 2
    if (g.bits[2].on) n += 1
    return n
  }).join('')
}

function onBitChange() {
  permNum.value = bitsToNum()
}

function onNumInput() {
  const s = permNum.value.replace(/[^0-7]/g, '').slice(0, 3)
  permNum.value = s
  if (s.length === 3) {
    s.split('').forEach((ch, gi) => {
      const n = parseInt(ch)
      groups[gi].bits[0].on = !!(n & 4)
      groups[gi].bits[1].on = !!(n & 2)
      groups[gi].bits[2].on = !!(n & 1)
    })
  }
}

function setPermNum(num) {
  permNum.value = num
  onNumInput()
}

const examples = [
  { num: '644', desc: '普通文件（owner 读写，其他只读）' },
  { num: '755', desc: '可执行文件/目录（owner 全权限）' },
  { num: '600', desc: '私密文件（仅 owner 读写）' },
  { num: '777', desc: '完全开放（不推荐）' }
]
</script>

<style scoped>
.linux-perm-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.input-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.input-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}
.input-group input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  width: 80px;
  text-align: center;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.perm-string {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  letter-spacing: 1px;
}
.perm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 480px) {
  .perm-grid { grid-template-columns: 1fr; }
}
.perm-group {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
}
.group-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}
.bits { display: flex; flex-direction: column; gap: 0.25rem; }
.bit-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.bit-char {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  width: 16px;
  text-align: center;
}
.bit-char.r { color: #22c55e; }
.bit-char.w { color: #f59e0b; }
.bit-char.x { color: #ef4444; }
.bit-name { color: var(--vp-c-text-3); font-size: 0.75rem; }
.examples {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
}
.ex-title {
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}
.ex-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ex-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.78rem;
  transition: background 0.2s;
}
.ex-item:hover { background: var(--vp-c-bg-soft); }
.ex-item code {
  font-weight: 700;
  color: var(--vp-c-brand);
}
.ex-desc { color: var(--vp-c-text-3); }
</style>
