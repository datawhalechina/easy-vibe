<!--
  ApiConceptDemo.vue
  参考 ide-intro 的“虚拟 UI + 先玩再讲”风格。
  目标：用一个简单的“分类小游戏”讲清楚 API 到底要写清楚什么，
  以及哪些是“你不用管的内部细节”。
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">API 到底是什么？（先玩 10 秒）</div>
      <div class="sub">
        下面有一些卡片。请你把它们分成两类：<b>必须写清楚</b> vs
        <b>不用写给别人看</b>。
      </div>
    </div>

    <div class="arena">
      <div class="cards">
        <div class="cardsTitle">卡片池</div>
        <div class="cardGrid">
          <button
            v-for="c in pool"
            :key="c.id"
            class="card"
            @click="pick(c.id)"
          >
            <div class="cardTop">
              <span class="tag" :class="c.type">{{ c.typeLabel }}</span>
            </div>
            <div class="cardText">{{ c.text }}</div>
          </button>
        </div>
        <div class="muted">
          提示：API
          的核心就是“怎么用”。所以：入口、要填什么、会返回什么、失败怎么说。
        </div>
      </div>

      <div class="bins">
        <div class="bin must">
          <div class="binHead">
            <div class="binTitle">必须写清楚</div>
            <div class="binHint">不写清楚就会用错</div>
          </div>
          <div class="drop">
            <div v-if="must.length === 0" class="empty">点卡片，把它放进来</div>
            <button v-for="id in must" :key="id" class="chip" @click="undo(id)">
              {{ byId(id).text }}
              <span class="x">×</span>
            </button>
          </div>
        </div>

        <div class="bin internal">
          <div class="binHead">
            <div class="binTitle">不用写给别人看</div>
            <div class="binHint">这是内部实现，换了也不影响“怎么用”</div>
          </div>
          <div class="drop">
            <div v-if="internal.length === 0" class="empty">
              点卡片，把它放进来
            </div>
            <button
              v-for="id in internal"
              :key="id"
              class="chip"
              @click="undo(id)"
            >
              {{ byId(id).text }}
              <span class="x">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bar">
      <button class="btn" @click="check">检查一下</button>
      <button class="ghost" @click="reset">重来</button>
      <div class="score">
        <span
          >正确：<b>{{ score.ok }}</b></span
        >
        <span
          >错误：<b>{{ score.bad }}</b></span
        >
      </div>
    </div>

    <div class="result" v-if="checked">
      <div class="resultTitle">结论（新手版一句话）</div>
      <div class="resultText">
        API =
        你告诉别人“这个按钮怎么按”。<b>入口在哪</b>、<b>要填什么</b>、<b>会得到什么</b>、<b>失败怎么说</b>。
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const all = [
  // must
  {
    id: 'where',
    bucket: 'must',
    type: 'must',
    typeLabel: '必填脑子',
    text: '入口在哪（网址 / 函数名）'
  },
  {
    id: 'input',
    bucket: 'must',
    type: 'must',
    typeLabel: '必填脑子',
    text: '要填什么（需要哪些信息）'
  },
  {
    id: 'output',
    bucket: 'must',
    type: 'must',
    typeLabel: '必填脑子',
    text: '会拿到什么（成功的结果）'
  },
  {
    id: 'error',
    bucket: 'must',
    type: 'must',
    typeLabel: '必填脑子',
    text: '失败怎么说（提示/原因）'
  },

  // internal
  {
    id: 'db',
    bucket: 'internal',
    type: 'internal',
    typeLabel: '内部',
    text: '数据库表怎么设计'
  },
  {
    id: 'topo',
    bucket: 'internal',
    type: 'internal',
    typeLabel: '内部',
    text: '服务有几个机器/怎么部署'
  },
  {
    id: 'perf',
    bucket: 'internal',
    type: 'internal',
    typeLabel: '内部',
    text: '内部怎么做性能优化'
  }
]

const must = ref([])
const internal = ref([])
const checked = ref(false)
const score = reactive({ ok: 0, bad: 0 })

const used = computed(() => new Set([...must.value, ...internal.value]))
const pool = computed(() => all.filter((c) => !used.value.has(c.id)))

function byId(id) {
  return all.find((x) => x.id === id) || { id, text: id }
}

function pick(id) {
  // 简化交互：按顺序放进“必须写清楚”，再点一次放进“内部”
  // 这样新手不需要理解拖拽，也不需要想“放哪儿”：玩起来更顺。
  // 如果想放“内部”，可以先把它放错，再点 chip 撤回重新放。
  if (must.value.length <= internal.value.length) {
    must.value.push(id)
  } else {
    internal.value.push(id)
  }
  checked.value = false
}

function undo(id) {
  must.value = must.value.filter((x) => x !== id)
  internal.value = internal.value.filter((x) => x !== id)
  checked.value = false
}

function reset() {
  must.value = []
  internal.value = []
  checked.value = false
  score.ok = 0
  score.bad = 0
}

function check() {
  let ok = 0
  let bad = 0
  for (const id of must.value) {
    byId(id).bucket === 'must' ? (ok += 1) : (bad += 1)
  }
  for (const id of internal.value) {
    byId(id).bucket === 'internal' ? (ok += 1) : (bad += 1)
  }
  score.ok = ok
  score.bad = bad
  checked.value = true
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
  line-height: 1.6;
}

.arena {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.cards,
.bin {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
}

.cardsTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.cardGrid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
}

.cardTop {
  display: flex;
  justify-content: flex-end;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.tag.must {
  border-color: color-mix(in srgb, #22c55e 40%, var(--vp-c-divider));
  background: color-mix(in srgb, #22c55e 12%, var(--vp-c-bg));
  color: #166534;
}

.tag.internal {
  border-color: color-mix(in srgb, #f59e0b 45%, var(--vp-c-divider));
  background: color-mix(in srgb, #f59e0b 14%, var(--vp-c-bg));
  color: #92400e;
}

.cardText {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 900;
  line-height: 1.4;
}

.bins {
  display: grid;
  gap: 12px;
}

.binHead {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
}

.binTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.binHint {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.drop {
  margin-top: 10px;
  min-height: 120px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
  align-content: flex-start;
  background: var(--vp-c-bg-soft);
}

.empty {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.chip {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.x {
  font-weight: 900;
  color: var(--vp-c-text-3);
}

.bar {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 900;
  cursor: pointer;
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

.score {
  margin-left: auto;
  display: flex;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.result {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
}

.resultTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.resultText {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.muted {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .arena {
    grid-template-columns: 1fr;
  }
  .cardGrid {
    grid-template-columns: 1fr;
  }
  .score {
    margin-left: 0;
  }
}
</style>
