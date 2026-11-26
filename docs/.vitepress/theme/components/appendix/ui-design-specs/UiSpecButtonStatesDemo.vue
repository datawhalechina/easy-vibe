<template>
  <div class="uss">
    <div class="uss-head">
      <div class="uss-title">{{ t('buttonStates.title') }}</div>
      <div class="uss-sub">{{ t('buttonStates.subtitle') }}</div>
    </div>

    <!-- Part 1: what the button looks like right now -->
    <section class="block">
      <div class="block-title">{{ t('buttonStates.statesTitle') }}</div>

      <div class="live">
        <div class="live-hint">{{ t('buttonStates.liveHint') }}</div>
        <div class="live-stage">
          <button
            type="button"
            class="b"
            @pointerenter="hovering = true"
            @pointerleave="hovering = false; pressing = false"
            @pointerdown="pressing = true"
            @pointerup="pressing = false"
            @pointercancel="pressing = false"
            @focus="onFocus"
            @blur="focused = false; pressing = false"
            @click="pulses++"
          >
            {{ t('buttonStates.run') }}
          </button>
          <span
            class="pulse"
            aria-hidden="true"
          >
            ✓ ×{{ pulses }}
          </span>
          <div
            class="live-state"
            aria-live="polite"
          >
            {{ t('buttonStates.currentState') }}
            <b>{{ t('buttonStates.stateNames.' + liveState) }}</b>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="row head">
          <span
            v-for="h in stateHead"
            :key="h"
          >
            {{ h }}
          </span>
        </div>
        <div
          v-for="s in states"
          :key="s.id"
          class="row"
          :class="{ hl: s.id === liveState }"
        >
          <span class="cell-state">
            <span
              class="b mini"
              :class="'is-' + s.id"
            >
              <span
                v-if="s.id === 'loading'"
                class="spinner"
              />
              <template v-else>{{ t('buttonStates.sample') }}</template>
            </span>
            {{ s.name }}
          </span>
          <span>{{ s.trigger }}</span>
          <span>{{ s.change }}</span>
          <span>{{ s.tip }}</span>
        </div>
      </div>
    </section>

    <!-- Part 2: what happens after the click -->
    <section class="block">
      <div class="block-title">{{ t('buttonStates.behaviorTitle') }}</div>

      <div class="flow">
        <div class="flow-left">
          <div class="hint">{{ t('buttonStates.behaviorHint') }}</div>
          <div class="flow-bar">
            <button
              type="button"
              class="b"
              :class="phase"
              :aria-disabled="phase === 'loading' || phase === 'done'"
              @click="run"
            >
              <span
                v-if="phase === 'loading'"
                class="spinner"
                aria-hidden="true"
              />
              {{ runLabel }}
            </button>
            <button
              v-if="phase !== 'idle'"
              type="button"
              class="reset"
              @click="reset"
            >
              {{ t('common.reset') }}
            </button>
          </div>

          <div class="scenario">
            <span>{{ t('buttonStates.scenario') }}</span>
            <label>
              <input
                v-model="wantFail"
                type="radio"
                name="uss-scenario"
                :value="false"
                :disabled="phase === 'loading'"
              />
              {{ t('buttonStates.scenarioSuccess') }}
            </label>
            <label>
              <input
                v-model="wantFail"
                type="radio"
                name="uss-scenario"
                :value="true"
                :disabled="phase === 'loading'"
              />
              {{ t('buttonStates.scenarioFail') }}
            </label>
          </div>

          <div
            class="result"
            :class="phase === 'done' ? 'ok' : phase === 'failed' ? 'err' : ''"
            aria-live="polite"
          >
            {{ resultText }}
          </div>

          <div class="rules">
            <div class="rules-title">{{ t('buttonStates.rulesTitle') }}</div>
            <div
              v-for="(rule, i) in rules"
              :key="rule"
              class="rule"
            >
              <span class="rule-n">{{ i + 1 }}</span>{{ rule }}
            </div>
          </div>
        </div>

        <ol class="timeline">
          <li
            v-for="(stage, i) in stages"
            :key="stage.name"
            class="stage"
            :class="{ on: onStages.includes(i) }"
          >
            <span class="stage-dot" />
            <span class="stage-body">
              <span class="stage-name">{{ stage.name }}</span>
              <span class="stage-desc">{{ stage.desc }}</span>
            </span>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const buttonStates = computed(() => messages.value.buttonStates)
const states = computed(() => buttonStates.value.states)
const stateHead = computed(() => buttonStates.value.stateHead)
const stages = computed(() => buttonStates.value.stages)
const rules = computed(() => buttonStates.value.rules)

// --- States: tracked from real pointer and keyboard events ---
const hovering = ref(false)
const pressing = ref(false)
const focused = ref(false)
const pulses = ref(0)

// The focus ring only shows for keyboard focus, so only count that as "focused".
function onFocus(event) {
  focused.value = !!event.target.matches(':focus-visible')
}

const liveState = computed(() => {
  if (pressing.value) return 'pressed'
  if (focused.value) return 'focus'
  if (hovering.value) return 'hover'
  return 'default'
})

// --- Behavior: idle -> loading -> done | failed ---
const phase = ref('idle')
const wantFail = ref(false)
const LOAD_MS = 1600
let timer = null

const runLabel = computed(() => {
  if (phase.value === 'loading') return t('buttonStates.running')
  if (phase.value === 'done') return '✓ ' + t('buttonStates.done')
  if (phase.value === 'failed') return t('buttonStates.retry')
  return t('buttonStates.run')
})

const resultText = computed(() => {
  if (phase.value === 'done') return t('buttonStates.done')
  if (phase.value === 'failed') return t('buttonStates.failed')
  return ''
})

// Which stages of the feedback cycle the user has been through so far.
const onStages = computed(() => {
  if (phase.value === 'idle') return [0]
  if (phase.value === 'loading') return [0, 1, 2]
  if (phase.value === 'done') return [0, 1, 2, 3]
  return [0, 1, 2, 3, 4]
})

function run() {
  // aria-disabled keeps focus on the button while still blocking repeats.
  if (phase.value === 'loading' || phase.value === 'done') return
  phase.value = 'loading'
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    timer = null
    phase.value = wantFail.value ? 'failed' : 'done'
  }, LOAD_MS)
}

function reset() {
  if (timer) clearTimeout(timer)
  timer = null
  phase.value = 'idle'
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.uss {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.uss-head { text-align: center; margin-bottom: 14px; }
.uss-title { font-size: 17px; font-weight: 700; }
.uss-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.block {
  padding: 14px 16px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.block + .block { margin-top: 14px; }
.block-title { margin-bottom: 12px; font-size: 15px; font-weight: 700; }

/* The same button drives both parts: real states above, the cycle below. */
.b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 132px;
  height: 40px;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-white);
  background: var(--vp-c-brand-1);
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s, opacity 0.2s;
}
.b:hover { filter: brightness(1.1); }
.b:active { filter: brightness(0.84); transform: scale(0.97); }
.b:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.b[aria-disabled='true'] { cursor: not-allowed; }
.b.loading { cursor: progress; }
.b.failed { border: 1px solid var(--vp-c-brand-1); }

.spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: uss-spin 1s linear infinite;
}
@keyframes uss-spin { to { transform: rotate(360deg); } }

.live { padding: 14px; background: var(--vp-c-bg-soft); border-radius: 8px; }
.live-hint { font-size: 12px; color: var(--vp-c-text-2); }
.live-stage { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; margin-top: 10px; }
.pulse { min-width: 44px; font-size: 13px; font-weight: 700; color: var(--vp-c-success); }
.live-state { font-size: 12px; color: var(--vp-c-text-2); }
.live-state b { color: var(--vp-c-brand-1); }

.grid {
  margin-top: 14px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.row {
  display: grid;
  grid-template-columns: 150px 1fr 1.1fr 1.3fr;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  line-height: 1.5;
  border-top: 1px solid var(--vp-c-divider);
  transition: background 0.2s;
}
.row.head { font-weight: 700; background: var(--vp-c-bg-soft); border-top: 0; }
.row.hl:not(.head) { background: var(--vp-c-brand-soft); }
.row > span:not(.cell-state) { color: var(--vp-c-text-2); }
.cell-state { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--vp-c-text-1); }

.b.mini { min-width: 0; height: 22px; padding: 0 10px; font-size: 10px; cursor: default; }
.is-hover { filter: brightness(1.1); }
.is-pressed { filter: brightness(0.84); }
.is-focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.is-disabled { opacity: 0.45; }
.mini .spinner { width: 10px; height: 10px; }

.flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 20px;
  align-items: start;
}
.hint { margin-bottom: 10px; font-size: 12px; color: var(--vp-c-text-2); }
.flow-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }
.reset {
  padding: 4px 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
}
.reset:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-text-2); }

.scenario {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.scenario label { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; }
.scenario input { accent-color: var(--vp-c-brand-1); }

.result {
  min-height: 40px;
  margin-top: 12px;
  padding: 9px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.result.ok { font-weight: 600; color: var(--vp-c-success); background: color-mix(in srgb, var(--vp-c-success) 12%, transparent); }
.result.err { font-weight: 600; color: var(--vp-c-danger-1); background: color-mix(in srgb, var(--vp-c-danger-1) 12%, transparent); }

.timeline { position: relative; margin: 0; padding: 0 0 0 2px; list-style: none; }
.stage { position: relative; display: flex; gap: 12px; padding-bottom: 16px; opacity: 0.4; transition: opacity 0.25s; }
.stage:last-child { padding-bottom: 0; }
.stage.on { opacity: 1; }
.stage::before {
  content: '';
  position: absolute;
  top: 16px;
  bottom: 0;
  left: 6px;
  width: 2px;
  background: var(--vp-c-divider);
}
.stage:last-child::before { display: none; }
.stage-dot {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  margin-top: 3px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  transition: all 0.25s;
}
.stage.on .stage-dot { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.stage-name { display: block; font-size: 13px; font-weight: 600; }
.stage-desc { display: block; font-size: 12px; line-height: 1.5; color: var(--vp-c-text-2); }

.rules { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--vp-c-divider); }
.rules-title { margin-bottom: 6px; font-size: 13px; font-weight: 600; }
.rule { display: flex; gap: 8px; font-size: 12px; line-height: 1.6; color: var(--vp-c-text-2); }
.rule-n {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
}

@media (max-width: 720px) {
  .uss { padding: 14px 12px 16px; }
  .block { padding: 12px 10px 14px; }
  .row.head { display: none; }
  .row { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .flow { grid-template-columns: minmax(0, 1fr); }
  .timeline { margin-top: 4px; }
}
</style>
