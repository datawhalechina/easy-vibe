<!--
  CdnCacheDemo.vue
  CDN 加速原理：快递柜隐喻
-->
<template>
  <div class="cdn">
    <div class="header">
      <div class="title">CDN 加速演示</div>
      <div class="subtitle">就像在小区楼下装了个“丰巢快递柜”</div>
    </div>

    <div class="controls">
      <div class="control">
        <label>你要取什么东西？(资源类型)</label>
        <div class="chips">
          <button
            v-for="r in resourceTypes"
            :key="r.id"
            :class="['chip', { active: r.id === resourceType }]"
            @click="resourceType = r.id"
          >
            {{ r.label }}
          </button>
        </div>
      </div>
      <div class="control">
        <label>快递柜里有吗？(命中率)</label>
        <input type="range" min="0" max="100" v-model.number="hit" />
        <div class="hint">当前概率：{{ hit }}% ({{ hit > 80 ? '大部分都有' : '经常要跑远路' }})</div>
      </div>
    </div>

    <div class="summary">
      <div class="card">
        <div class="label">跑总仓库的次数 (回源)</div>
        <div class="value">{{ miss }}%</div>
        <div class="note">次数越少，总仓库越轻松</div>
      </div>
      <div class="card">
        <div class="label">省下的路费 (带宽节省)</div>
        <div class="value">{{ saved }}%</div>
        <div class="note">省到就是赚到</div>
      </div>
      <div class="card">
        <div class="label">老司机的建议</div>
        <div class="value">{{ cacheAdvice }}</div>
      </div>
    </div>

    <div class="flow">
      <div class="step" v-for="(s, idx) in flow" :key="idx">
        <div class="head">
          <span class="dot" :style="{ background: s.color }"></span>
          <span class="name">{{ s.name }}</span>
          <span class="time">{{ s.time }}</span>
        </div>
        <div class="desc">{{ s.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const resourceTypes = [
  { id: 'static', label: '标准件 (图片/CSS/JS)' },
  { id: 'html', label: '信件 (HTML)' },
  { id: 'api', label: '生鲜 (API数据)' }
]

const resourceType = ref('static')
const hit = ref(85)

const miss = computed(() => 100 - hit.value)
const saved = computed(() => hit.value)

const cacheAdvice = computed(() => {
  if (resourceType.value === 'static')
    return '标准件保质期长，建议放柜子里一年 (max-age=1年)'
  if (resourceType.value === 'html')
    return '信件可能随时更新，每次取之前问一下 (no-cache)'
  return '生鲜容易坏，不要放柜子，直接去产地拿 (no-store)'
})

const flow = computed(() => {
  const base = [
    {
      name: '用户 🙋‍♂️',
      time: '0ms',
      desc: '我想取个包裹',
      color: '#6366f1'
    },
    {
      name: '家门口快递柜 📦',
      time: '15ms',
      desc: '看看柜子里有没有...',
      color: '#6366f1'
    }
  ]
  if (hit.value >= 70 && resourceType.value === 'static') {
    base.push({
      name: '有货！✅',
      time: '+5ms',
      desc: '直接拿走，不用跑远路',
      color: '#22c55e'
    })
  } else {
    base.push({
      name: '没货... ❌',
      time: '+10ms',
      desc: '柜子是空的，得去总仓库',
      color: '#f59e0b'
    })
    base.push({
      name: '总仓库 (源站) 🏭',
      time: resourceType.value === 'api' ? '+60ms' : '+40ms',
      desc: '翻山越岭把货取回来',
      color: '#e11d48'
    })
    if (resourceType.value !== 'api') {
      base.push({
        name: '顺手存柜子',
        time: '+8ms',
        desc: '下次邻居来拿就不用跑了',
        color: '#22c55e'
      })
    }
  }
  base.push({
    name: '拿到手 🎁',
    time: 'Total',
    desc: '交易完成',
    color: '#0ea5e9'
  })
  return base
})
</script>

<style scoped>
.cdn {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header .title {
  font-weight: 800;
  font-size: 18px;
}
.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.chip.active {
  border-color: var(--vp-c-brand);
  color: white;
  background: var(--vp-c-brand);
}

.hint {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 4px;
}

.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.card {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}

.label {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.value {
  font-weight: 800;
  margin-top: 4px;
  font-size: 16px;
}

.note {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 4px;
}

.flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.step {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.name {
  font-weight: 700;
  font-size: 14px;
}

.time {
  margin-left: auto;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.desc {
  color: var(--vp-c-text-2);
  font-size: 12px;
}
</style>
