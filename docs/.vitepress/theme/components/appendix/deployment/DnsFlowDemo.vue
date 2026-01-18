<!--
  DnsFlowDemo.vue
  DNS 记录操练台：地址簿隐喻
-->
<template>
  <div class="dns">
    <div class="header">
      <div class="title">DNS 查号台</div>
      <div class="subtitle">把“好记的名字”变成“机器的 IP”</div>
    </div>

    <div class="controls">
      <div class="field">
        <label>你要配哪个域名？</label>
        <input v-model="domain" placeholder="例如：baidu.com" />
      </div>
      <div class="field">
        <label>你要做什么？(记录类型)</label>
        <div class="chips">
          <button
            v-for="r in recordTypes"
            :key="r.type"
            :class="['chip', { active: recordType === r.type }]"
            @click="recordType = r.type"
          >
            {{ r.desc }}
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="row">
        <span>类型 (Type)</span>
        <code class="highlight">{{ recordType }}</code>
      </div>
      <div class="row">
        <span>前缀 (Host)</span>
        <code>{{ hostLabel }}</code>
      </div>
      <div class="row">
        <span>目标 (Value)</span>
        <code>{{ recordValue }}</code>
      </div>
      <div class="row">
        <span>记忆时间 (TTL)</span>
        <code>{{ ttlSuggestion }}</code>
      </div>

      <div class="human-speak">
        <span class="emoji">💡</span>
        <div class="text">
          <strong>人话解释：</strong>
          {{ humanExplanation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const domain = ref('my-site.com')
const recordType = ref('A')

const recordTypes = [
  {
    type: 'A',
    desc: '直接指向 IP',
    value: '1.2.3.4',
    explanation: '告诉查号台：我家住在“1.2.3.4”这个门牌号。最常用！',
    ttl: '600s (10分钟)'
  },
  {
    type: 'CNAME',
    desc: '指向别名',
    value: 'shops.myshopify.com',
    explanation: '告诉查号台：我搬家了，你去问问“shops.myshopify.com”我在哪。',
    ttl: '600s (10分钟)'
  },
  {
    type: 'MX',
    desc: '配置邮箱',
    value: 'mxbiz1.qq.com',
    explanation: '告诉邮递员：寄给我的信，请送到“mxbiz1.qq.com”这个邮局去。',
    ttl: '3600s (1小时)'
  }
]

const currentRecord = computed(() =>
  recordTypes.find((r) => r.type === recordType.value)
)

const hostLabel = computed(() => (recordType.value === 'CNAME' ? 'www' : '@'))
const recordValue = computed(() => currentRecord.value?.value || '')
const ttlSuggestion = computed(() => currentRecord.value?.ttl || '600s')
const humanExplanation = computed(() => currentRecord.value?.explanation || '')
</script>

<style scoped>
.dns {
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
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

input {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px;
  background: var(--vp-c-bg);
  width: 100%;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 6px 14px;
  background: var(--vp-c-bg);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.chip.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  align-items: center;
}

.row span {
  color: var(--vp-c-text-2);
}

code {
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.highlight {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.human-speak {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
  display: flex;
  gap: 10px;
}

.emoji {
  font-size: 20px;
}

.text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
</style>
