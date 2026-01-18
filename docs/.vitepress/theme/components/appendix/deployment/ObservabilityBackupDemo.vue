<!--
  ObservabilityBackupDemo.vue
  监控与备份：买保险隐喻
-->
<template>
  <div class="obs">
    <div class="header">
      <div class="title">监控与备份</div>
      <div class="subtitle">给你的网站买份“保险”</div>
    </div>

    <div class="controls">
      <div class="control">
        <label>安保级别 (监控)</label>
        <select v-model="monitorLevel">
          <option value="lite">入门：只装个摄像头 (日志)</option>
          <option value="std">标准：雇个保安 (指标+告警)</option>
          <option value="pro">专业：24h 安保中心 (全链路追踪)</option>
        </select>
      </div>
      <div class="control">
        <label>通知谁？(告警渠道)</label>
        <div class="chips">
          <button
            v-for="c in channels"
            :key="c.id"
            :class="['chip', { active: channel === c.id }]"
            @click="channel = c.id"
          >
            {{ c.label }}
          </button>
        </div>
      </div>
      <div class="control">
        <label>备份频率 (小时)</label>
        <input
          type="range"
          min="6"
          max="48"
          step="6"
          v-model.number="backupHours"
        />
        <div class="hint">每 {{ backupHours }} 小时存一次盘</div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="label">安全评分</div>
        <div
          class="value big"
          :class="{
            green: riskScore <= 40,
            orange: riskScore > 40 && riskScore <= 70,
            red: riskScore > 70
          }"
        >
          {{ 100 - riskScore }} 分
        </div>
        <div class="note">
          {{
            riskScore > 70
              ? '极其危险！'
              : riskScore > 40
                ? '勉强及格'
                : '非常稳！'
          }}
        </div>
      </div>
      <div class="card">
        <div class="label">最坏情况 (丢数据)</div>
        <div class="value">{{ rpo }}</div>
        <div class="note">最多丢失多少小时的数据</div>
      </div>
      <div class="card">
        <div class="label">恢复速度</div>
        <div class="value">{{ rto }}</div>
        <div class="note">出事后多久能修好</div>
      </div>
    </div>

    <div class="checklist-box">
      <div class="box-title">保命清单 (Checklist)</div>
      <div class="checks">
        <div class="check" v-for="item in checklist" :key="item.label">
          <input type="checkbox" v-model="item.done" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const monitorLevel = ref('std')
const channels = [
  { id: 'email', label: '发邮件 (慢)' },
  { id: 'chat', label: '企业微信/飞书 (快)' },
  { id: 'pager', label: '电话轰炸 (急)' }
]
const channel = ref('chat')
const backupHours = ref(24)

const checklist = reactive([
  { label: '日志能不能查到？', done: true },
  { label: 'CPU 飙高了会不会报警？', done: false },
  { label: '关键接口慢了知不知道？', done: false },
  { label: '数据库有没有自动备份？', done: true },
  { label: '备份文件真的能恢复吗？(演练过)', done: false }
])

const riskScore = computed(() => {
  let score = 70
  if (monitorLevel.value === 'pro') score -= 20
  else if (monitorLevel.value === 'std') score -= 10

  if (channel.value === 'pager') score -= 10
  else if (channel.value === 'chat') score -= 5

  score -= Math.min(20, (48 - backupHours.value) * 0.8)

  const doneCount = checklist.filter((i) => i.done).length
  score -= doneCount * 4

  return Math.max(0, Math.min(100, Math.round(score)))
})

const rpo = computed(() => `${backupHours.value} 小时`)
const rto = computed(() => {
  if (monitorLevel.value === 'pro') return '15-30 分钟'
  if (monitorLevel.value === 'std') return '30-60 分钟'
  return '1-2 小时 (甚至更久)'
})
</script>

<style scoped>
.obs {
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
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-weight: 700;
  font-size: 14px;
}
select,
input[type='range'] {
  width: 100%;
}
.hint {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 4px;
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
  font-size: 12px;
  transition: all 0.2s;
}
.chip.active {
  border-color: var(--vp-c-brand);
  color: white;
  background: var(--vp-c-brand);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}
.label {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.value {
  font-weight: 800;
  margin-top: 4px;
  font-size: 15px;
}
.value.big {
  font-size: 24px;
}
.value.green {
  color: #22c55e;
}
.value.orange {
  color: #f59e0b;
}
.value.red {
  color: #ef4444;
}
.note {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 4px;
}

.checklist-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}
.box-title {
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 14px;
}
.checks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}
.check {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}
</style>
