<template>
  <div class="usd">
    <div class="usd-head">
      <div class="usd-title">{{ t('decision.title') }}</div>
      <div class="usd-sub">{{ t('decision.subtitle') }}</div>
    </div>

    <div class="usd-body">
      <div
        class="card"
        :class="{ solved }"
      >
        <div class="card-title">{{ t('decision.cardTitle') }}</div>
        <div class="field">
          <span class="f-label">{{ t('decision.nameLabel') }}</span>
          <span class="f-input">{{ t('decision.nameValue') }}</span>
        </div>
        <div class="field">
          <span class="f-label">{{ t('decision.descLabel') }}</span>
          <span class="f-input">{{ t('decision.descValue') }}</span>
        </div>

        <!-- Before: every button looks the same, so the reader has to decide. -->
        <div
          v-if="!solved"
          class="btn-row"
        >
          <button
            v-for="b in buttons"
            :key="b.id"
            type="button"
            class="b plain"
            :class="{ picked: picked === b.id }"
            @click="choose(b.id)"
          >
            {{ b.label }}
          </button>
        </div>

        <!-- After: one primary, helpers toned down, the destructive one set apart. -->
        <template v-else>
          <div class="solved-title">{{ t('decision.solvedTitle') }}</div>
          <div class="btn-row solved-row">
            <span class="b danger">{{ label('remove') }}</span>
          </div>
          <div class="btn-row main-row">
            <span class="b text">{{ label('cancel') }}</span>
            <span class="b text">{{ label('export') }}</span>
            <span class="b outlined">{{ label('preview') }}</span>
            <span class="b fill">{{ label('save') }}</span>
          </div>
        </template>
      </div>

      <div class="panel">
        <label
          v-if="!solved"
          class="tool"
        >
          <input
            v-model="showSteps"
            type="checkbox"
          />
          {{ t('decision.hintToggle') }}
        </label>

        <template v-if="showSteps || solved">
          <div class="steps-title">{{ t('decision.stepsTitle') }}</div>
          <ol class="steps">
            <li
              v-for="(step, i) in steps"
              :key="step.q"
              class="step"
            >
              <span class="s-n">{{ i + 1 }}</span>
              <span class="s-body">
                <span class="s-q">{{ step.q }}</span>
                <span class="s-a">{{ step.a }}</span>
              </span>
            </li>
          </ol>
        </template>

        <div
          v-if="feedback"
          class="feedback"
          :class="{ ok: solved }"
          aria-live="polite"
        >
          <span class="tag">{{ solved ? t('decision.rightLabel') : t('decision.wrongLabel') }}</span>
          <span>{{ feedback }}</span>
        </div>

        <div
          v-if="solved"
          class="solved-note"
        >
          {{ t('decision.solvedNote') }}
        </div>
        <button
          v-if="solved"
          type="button"
          class="reset"
          @click="reset"
        >
          {{ t('decision.reset') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const decision = computed(() => messages.value.decision)
const buttons = computed(() => decision.value.buttons)
const steps = computed(() => decision.value.steps)

const ANSWER = 'save'

const picked = ref(null)
const solved = ref(false)
const showSteps = ref(false)

const feedback = computed(() => (picked.value ? t('decision.feedback.' + picked.value) : ''))

function choose(id) {
  picked.value = id
  solved.value = id === ANSWER
}

function reset() {
  picked.value = null
  solved.value = false
  showSteps.value = false
}

function label(id) {
  return buttons.value.find((b) => b.id === id).label
}
</script>

<style scoped>
.usd {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usd-head { text-align: center; margin-bottom: 14px; }
.usd-title { font-size: 17px; font-weight: 700; }
.usd-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.usd-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.card {
  padding: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: border-color 0.3s;
}
.card.solved { border-color: var(--vp-c-brand-1); }
.card-title { margin-bottom: 10px; font-size: 15px; font-weight: 700; }
.field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.f-label { font-size: 11px; color: var(--vp-c-text-3); }
.f-input {
  padding: 6px 10px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.solved-title { margin-top: 12px; font-size: 11px; font-weight: 600; color: var(--vp-c-brand-1); }
.btn-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px; }
.solved-row { margin-bottom: 0; }
.main-row { justify-content: flex-end; margin-top: 12px; }

.b {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 6px;
}
.b.plain {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.15s;
}
.b.plain:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.b.plain.picked { box-shadow: 0 0 0 2px var(--vp-c-warning-1); }
.b.fill { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.b.outlined { color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.b.text { color: var(--vp-c-brand-1); }
.b.danger { color: var(--vp-c-danger-1); }

.panel {
  padding: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.tool { display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer; user-select: none; }
.tool input { accent-color: var(--vp-c-brand-1); }

.steps-title { margin: 12px 0 6px; font-size: 13px; font-weight: 600; }
.steps { margin: 0; padding: 0; list-style: none; }
.step { display: flex; gap: 8px; padding: 5px 0; }
.s-n {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
}
.s-body { display: flex; flex-direction: column; }
.s-q { font-size: 13px; font-weight: 600; line-height: 1.5; }
.s-a { font-size: 12px; line-height: 1.6; color: var(--vp-c-text-2); }

.feedback {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.65;
  background: color-mix(in srgb, var(--vp-c-warning-1) 12%, transparent);
  border-radius: 8px;
}
.feedback .tag { flex-shrink: 0; font-weight: 700; color: var(--vp-c-warning-1); }
.feedback.ok { background: color-mix(in srgb, var(--vp-c-success) 12%, transparent); }
.feedback.ok .tag { color: var(--vp-c-success); }

.solved-note { margin-top: 10px; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }
.reset {
  margin-top: 12px;
  padding: 4px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
}
.reset:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .usd { padding: 14px 12px 16px; }
  .usd-body { grid-template-columns: minmax(0, 1fr); }
}
</style>
