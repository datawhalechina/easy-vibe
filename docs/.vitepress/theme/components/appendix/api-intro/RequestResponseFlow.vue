<!--
  RequestResponseFlow.vue
  参考 ide-intro 的“可视化演示”风格：更像一个小动画，而不是表单。
  目标：让新手理解一次 API 调用：你发过去 -> 对方处理 -> 回给你。
-->
<template>
  <div class="wrap">
    <div class="head">
      <div class="title">一次 API 调用，会发生什么？</div>
      <div class="sub">点一下“发送”，看小纸飞机飞过去再飞回来。</div>
    </div>

    <div class="controls">
      <div class="ctrl">
        <div class="ctrlK">地址</div>
        <div class="ctrlV">
          <button :class="['pill', { active: addrOk }]" @click="addrOk = true">
            正确
          </button>
          <button
            :class="['pill', { active: !addrOk }]"
            @click="addrOk = false"
          >
            错误
          </button>
        </div>
      </div>
      <div class="ctrl">
        <div class="ctrlK">钥匙</div>
        <div class="ctrlV">
          <button :class="['pill', { active: keyOk }]" @click="keyOk = true">
            有
          </button>
          <button :class="['pill', { active: !keyOk }]" @click="keyOk = false">
            没有
          </button>
        </div>
      </div>
      <button class="send" :disabled="busy" @click="send">
        {{ busy ? '飞行中…' : '发送一次（模拟）' }}
      </button>
    </div>

    <div class="stage">
      <div class="side">
        <div class="window">
          <div class="bar">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
            <span class="barText">你这边（你的程序）</span>
          </div>
          <div class="body">
            <div class="bubble mine">
              我想按按钮拿结果。
              <div class="small">
                地址：{{ addrOk ? '正确' : '错误' }}；钥匙：{{
                  keyOk ? '有' : '没有'
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mid">
        <div class="line" />
        <div class="plane" :class="{ go: flying }">✈︎</div>
        <div class="line" />
      </div>

      <div class="side">
        <div class="window">
          <div class="bar">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
            <span class="barText">对方那边（提供能力）</span>
          </div>
          <div class="body">
            <div class="bubble theirs">
              {{ serverText }}
              <div class="small">（它按规则检查：地址/钥匙/参数…）</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="result">
      <div class="resultTitle">返回结果</div>
      <div v-if="!response" class="muted">还没有结果。点一下“发送一次”。</div>
      <div
        v-else
        class="resBox"
        :class="{ ok: response.ok, bad: !response.ok }"
      >
        <div class="badge">{{ response.ok ? '成功' : '失败' }}</div>
        <div class="resText">{{ response.text }}</div>
      </div>
      <div class="tip">
        玩法：把“地址”改成错误，或者把“钥匙”改成没有，再发送一次。
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const addrOk = ref(true)
const keyOk = ref(true)
const busy = ref(false)
const flying = ref(false)
const response = ref(null)

const serverText = computed(() => {
  if (!addrOk.value) return '我找不到这个按钮（地址错了）'
  if (!keyOk.value) return '你没有钥匙，我不能给你结果'
  return '收到！我去处理一下…'
})

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function send() {
  if (busy.value) return
  busy.value = true
  flying.value = true
  response.value = null

  await sleep(600)
  flying.value = false

  await sleep(260)
  if (!addrOk.value) {
    response.value = { ok: false, text: '失败：地址不对（找不到这个按钮）' }
  } else if (!keyOk.value) {
    response.value = { ok: false, text: '失败：没有钥匙（没权限）' }
  } else {
    response.value = { ok: true, text: '成功：拿到结果（模拟）' }
  }
  busy.value = false
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

.controls {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.ctrl {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  padding: 10px 12px;
}

.ctrlK {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 900;
}

.ctrlV {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.pill {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
}

.pill.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

.send {
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;
}

.send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stage {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  gap: 12px;
  align-items: center;
}

.window {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.bar {
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

.barText {
  margin-left: 6px;
  font-size: 12px;
  font-weight: 900;
  color: var(--vp-c-text-2);
}

.body {
  padding: 12px;
  min-height: 92px;
}

.bubble {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.bubble.mine {
  border-color: color-mix(in srgb, #60a5fa 40%, var(--vp-c-divider));
}

.bubble.theirs {
  border-color: color-mix(in srgb, #a78bfa 45%, var(--vp-c-divider));
}

.small {
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.mid {
  display: grid;
  justify-items: center;
  gap: 10px;
}

.line {
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  border-radius: 99px;
}

.plane {
  font-size: 18px;
  color: var(--vp-c-text-3);
  transition:
    transform 600ms ease,
    color 200ms ease;
}

.plane.go {
  transform: translateX(28px);
  color: var(--vp-c-brand-1);
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

.muted {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.resBox {
  margin-top: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
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
  background: var(--vp-c-bg);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.resText {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.tip {
  margin-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .stage {
    grid-template-columns: 1fr;
  }
  .mid {
    display: none;
  }
}
</style>
