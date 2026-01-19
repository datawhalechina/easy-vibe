<!--
  ApiDocumentDemo.vue
  参考 ide-intro 的“虚拟界面 + 点击探索”风格。
  目标：让新手学会看 API 文档的 3 个重点：入口在哪 / 要填什么 / 会得到什么。
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">怎么读 API 文档？（像找按钮一样找）</div>
      <div class="sub">
        任务：请在下面的“假文档”里，依次点出：<b>入口</b>、<b>要填什么</b>、<b>会得到什么</b>。
      </div>
    </div>

    <div class="game">
      <div class="doc">
        <div class="docBar">
          <span class="dot red" />
          <span class="dot yellow" />
          <span class="dot green" />
          <span class="docTitle">API 文档（示例）</span>
        </div>

        <div class="docBody">
          <button
            class="block"
            :class="{ hit: hits.entry }"
            @click="hit('entry')"
          >
            <div class="blockK">入口</div>
            <div class="blockV">GET /v1/users/{id}</div>
            <div class="blockHint">（你要按哪个按钮）</div>
          </button>

          <button
            class="block"
            :class="{ hit: hits.input }"
            @click="hit('input')"
          >
            <div class="blockK">要填什么</div>
            <div class="blockV">id（用户编号）</div>
            <div class="blockHint">（你要告诉它什么）</div>
          </button>

          <button
            class="block"
            :class="{ hit: hits.output }"
            @click="hit('output')"
          >
            <div class="blockK">会得到什么</div>
            <div class="blockV">{ id, name }</div>
            <div class="blockHint">（成功时给你的结果）</div>
          </button>

          <button
            class="block gray"
            :class="{ hit: hits.fail }"
            @click="hit('fail')"
          >
            <div class="blockK">失败会怎样（常见）</div>
            <div class="blockV">没钥匙 / 找不到 / 太频繁</div>
            <div class="blockHint">（你要能看懂失败原因）</div>
          </button>
        </div>
      </div>

      <div class="side">
        <div class="task">
          <div class="taskTitle">你要找的 3 个重点</div>
          <div class="taskList">
            <div :class="['taskItem', hits.entry && 'done']">
              ① 入口在哪（点“入口”）
            </div>
            <div :class="['taskItem', hits.input && 'done']">
              ② 要填什么（点“要填什么”）
            </div>
            <div :class="['taskItem', hits.output && 'done']">
              ③ 会得到什么（点“会得到什么”）
            </div>
          </div>
          <div class="muted">你只要先会这三件事，就能开始用 API 了。</div>
        </div>

        <div class="explain" v-if="last">
          <div class="explainTitle">你刚刚点的是：{{ labelOf(last) }}</div>
          <div class="explainText">{{ explainOf(last) }}</div>
        </div>

        <div class="actions">
          <button class="btn" @click="autoWin">一键帮我找对</button>
          <button class="ghost" @click="reset">重置</button>
        </div>

        <div class="win" v-if="won">
          <div class="winTitle">完成！</div>
          <div class="winText">
            你已经会读 80% 的 API 文档了：入口 / 要填 / 会得到。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const hits = reactive({
  entry: false,
  input: false,
  output: false,
  fail: false
})
const last = ref('')

const won = computed(() => hits.entry && hits.input && hits.output)

function hit(key) {
  hits[key] = true
  last.value = key
}

function reset() {
  hits.entry = false
  hits.input = false
  hits.output = false
  hits.fail = false
  last.value = ''
}

function autoWin() {
  hits.entry = true
  hits.input = true
  hits.output = true
  last.value = 'output'
}

function labelOf(key) {
  if (key === 'entry') return '入口'
  if (key === 'input') return '要填什么'
  if (key === 'output') return '会得到什么'
  if (key === 'fail') return '失败会怎样'
  return key
}

function explainOf(key) {
  if (key === 'entry') {
    return '入口就是“按钮名字”。你要按哪个按钮，先找到它。'
  }
  if (key === 'input') {
    return '要填什么 = 你需要提供的信息。比如 id、页码、搜索词。'
  }
  if (key === 'output') {
    return '会得到什么 = 成功时返回的数据。你要关心字段有什么、有没有可能为空。'
  }
  if (key === 'fail') {
    return '失败会怎样 = 你要能看懂失败原因，好给用户提示/重试。'
  }
  return ''
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

.game {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 12px;
}

.doc {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.docBar {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
.dot.red {
  background: #ef4444;
}
.dot.yellow {
  background: #f59e0b;
}
.dot.green {
  background: #22c55e;
}

.docTitle {
  margin-left: 6px;
  font-size: 12px;
  font-weight: 900;
  color: var(--vp-c-text-2);
}

.docBody {
  padding: 12px;
  display: grid;
  gap: 10px;
}

.block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.block:hover {
  border-color: var(--vp-c-brand-1);
}

.block.gray {
  background: var(--vp-c-bg);
}

.block.hit {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px color-mix(in srgb, #22c55e 18%, transparent);
}

.blockK {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 900;
}

.blockV {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 900;
}

.blockHint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.side {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 12px;
  display: grid;
  gap: 12px;
}

.taskTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.taskList {
  margin-top: 10px;
  display: grid;
  gap: 8px;
}

.taskItem {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 8px 10px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-weight: 800;
}

.taskItem.done {
  border-color: #22c55e;
  background: color-mix(in srgb, #22c55e 12%, var(--vp-c-bg));
}

.muted {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.explain {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 10px 12px;
}

.explainTitle {
  font-weight: 900;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.explainText {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
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

.win {
  border: 1px solid #22c55e;
  border-radius: 12px;
  background: color-mix(in srgb, #22c55e 12%, var(--vp-c-bg));
  padding: 10px 12px;
}

.winTitle {
  font-weight: 900;
  color: #166534;
  font-size: 13px;
}

.winText {
  margin-top: 8px;
  font-size: 12px;
  color: #166534;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .game {
    grid-template-columns: 1fr;
  }
}
</style>
