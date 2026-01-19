<!--
  ApiMethodDemo.vue
  参考 ide-intro 的“虚拟环境演示”风格。
  目标：把 GET/POST/DELETE 讲成“拿/加/删”三个按钮，并用可视化列表展示效果。
  注意：这是选读内容，但组件本身要足够好玩、足够直观。
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">三个按钮：拿（GET）/ 加（POST）/ 删（DELETE）</div>
      <div class="sub">你不用记英文。先玩：点按钮，看看“列表怎么变”。</div>
    </div>

    <div class="board">
      <div class="left">
        <div class="panelTitle">小列表（服务器里有的东西）</div>
        <div class="list">
          <div v-if="items.length === 0" class="empty">空的</div>
          <div v-for="it in items" :key="it.id" class="row">
            <div class="pillId">#{{ it.id }}</div>
            <div class="name">{{ it.name }}</div>
          </div>
        </div>

        <div class="mini">
          <span class="miniK">提示：</span>
          <span class="miniV">你可以一直点“拿（GET）”，列表不会变。</span>
        </div>
      </div>

      <div class="right">
        <div class="panelTitle">按按钮（模拟 API）</div>

        <div class="btnRow">
          <button class="btn get" :disabled="busy" @click="getList">
            拿（GET）
          </button>
          <button class="btn post" :disabled="busy" @click="addOne">
            加（POST）
          </button>
          <button class="btn del" :disabled="busy" @click="removeOne">
            删（DELETE）
          </button>
        </div>

        <div class="inputs">
          <label class="field">
            <span class="k">要加什么</span>
            <input v-model="newName" class="input" placeholder="随便写个名字" />
          </label>
        </div>

        <div class="result">
          <div class="resultTitle">返回结果</div>
          <div v-if="!last" class="muted">点一个按钮试试。</div>
          <div v-else class="resBox" :class="{ ok: last.ok, bad: !last.ok }">
            <div class="badge">{{ last.ok ? '成功' : '失败' }}</div>
            <div class="text">{{ last.text }}</div>
          </div>
        </div>

        <div class="foot">
          <div class="stat">
            <span class="statK">你点了</span>
            <span class="statV">{{ clicks }}</span>
            <span class="statK">次</span>
          </div>
          <button class="ghost" :disabled="busy" @click="reset">重置</button>
        </div>
      </div>
    </div>

    <div class="one">
      <div class="oneTitle">一句话总结</div>
      <div class="oneText">
        GET 通常只是“拿数据”；POST/DELETE 会“改数据”。所以网络抖动时，重试 POST
        要更小心。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const busy = ref(false)
const clicks = ref(0)

const seq = ref(3)
const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cookie' }
])

const newName = ref('Donut')
const last = ref(null)

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function getList() {
  clicks.value += 1
  busy.value = true
  await sleep(220)
  last.value = {
    ok: true,
    text: `拿到了 ${items.value.length} 条数据（列表不变）`
  }
  busy.value = false
}

async function addOne() {
  clicks.value += 1
  busy.value = true
  await sleep(260)

  const name = String(newName.value || '').trim()
  if (!name) {
    last.value = { ok: false, text: '你还没写“要加什么”' }
    busy.value = false
    return
  }

  seq.value += 1
  items.value = [...items.value, { id: seq.value, name }]
  last.value = { ok: true, text: `已添加：#${seq.value} ${name}` }
  busy.value = false
}

async function removeOne() {
  clicks.value += 1
  busy.value = true
  await sleep(240)

  if (items.value.length === 0) {
    last.value = { ok: false, text: '已经空了，删不了' }
    busy.value = false
    return
  }

  const removed = items.value[items.value.length - 1]
  items.value = items.value.slice(0, -1)
  last.value = { ok: true, text: `已删除：#${removed.id} ${removed.name}` }
  busy.value = false
}

function reset() {
  seq.value = 3
  items.value = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cookie' }
  ]
  newName.value = 'Donut'
  last.value = null
  clicks.value = 0
}
</script>

<style scoped>
.wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
}

.head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-weight: 900;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.sub {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.board {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.left,
.right {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
}

.panelTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.list {
  margin-top: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px;
  display: grid;
  gap: 8px;
  min-height: 160px;
}

.empty {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.row {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 8px 10px;
}

.pillId {
  font-size: 12px;
  font-weight: 900;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  padding: 2px 8px;
}

.name {
  font-size: 13px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.mini {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.miniK {
  font-weight: 900;
}

.btnRow {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.btn {
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn.get {
  border-color: color-mix(in srgb, #60a5fa 45%, var(--vp-c-divider));
}

.btn.post {
  border-color: color-mix(in srgb, #22c55e 45%, var(--vp-c-divider));
}

.btn.del {
  border-color: color-mix(in srgb, #ef4444 45%, var(--vp-c-divider));
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.inputs {
  margin-top: 12px;
}

.field {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  align-items: center;
}

.k {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 900;
}

.input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.result {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.resultTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.muted {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.resBox {
  margin-top: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
}

.resBox.ok {
  border-color: color-mix(in srgb, #22c55e 45%, var(--vp-c-divider));
}

.resBox.bad {
  border-color: color-mix(in srgb, #ef4444 45%, var(--vp-c-divider));
}

.badge {
  display: inline-block;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.text {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.foot {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.stat {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.statV {
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin: 0 6px;
}

.ghost {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 900;
  cursor: pointer;
}

.ghost:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.one {
  margin-top: 12px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
}

.oneTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.oneText {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .board {
    grid-template-columns: 1fr;
  }
  .btnRow {
    grid-template-columns: 1fr;
  }
}
</style>
