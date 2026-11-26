<template>
  <div class="usg">
    <div class="usg-head">
      <div class="usg-title">{{ t('grouping.title') }}</div>
      <div class="usg-sub">{{ t('grouping.subtitle') }}</div>
    </div>

    <div class="steps">
      <button
        v-for="(step, i) in steps"
        :key="i"
        type="button"
        class="step"
        :class="{ on: i === stepIndex, done: i < stepIndex }"
        :aria-pressed="i === stepIndex"
        @click="stepIndex = i"
      >
        <span class="n">{{ i + 1 }}</span>{{ t('grouping.stepLabel', { n: i + 1 }) }}
      </button>
    </div>
    <div class="caption">{{ steps[stepIndex].caption }}</div>

    <div class="usg-body">
      <div
        class="paper"
        :class="['s' + stepIndex, { guides, tinted: explicit && stepIndex === 2 }]"
      >
        <span class="align-line" />

        <div class="blk">
          <div class="f-title">{{ mock.pageTitle }}</div>
        </div>
        <span
          class="gap block"
          :data-g="blockGap"
        />

        <div class="blk">
          <div class="f-label">{{ mock.basic }}</div>
          <span
            class="gap inner"
            :data-g="innerGap"
          />
          <div class="row">
            <span class="field">{{ mock.email }}</span>
            <span class="field">{{ mock.phone }}</span>
          </div>
        </div>
        <span
          class="gap block"
          :data-g="blockGap"
        />

        <div class="blk">
          <div class="f-label">{{ mock.password }}</div>
          <span
            class="gap inner"
            :data-g="innerGap"
          />
          <div class="row">
            <span class="field">{{ mock.newPassword }}</span>
            <span class="field">{{ mock.confirm }}</span>
          </div>
        </div>
        <span
          class="gap block"
          :data-g="blockGap"
        />

        <div class="blk notify">
          <div class="f-label">{{ mock.notify }}</div>
          <span
            class="gap inner"
            :data-g="innerGap"
          />
          <div class="row">
            <span class="toggle"><span class="knob" />{{ mock.mail }}</span>
            <span class="toggle"><span class="knob" />{{ mock.desktop }}</span>
          </div>
        </div>
        <span
          class="gap block"
          :data-g="blockGap"
        />

        <div class="blk">
          <div class="row">
            <span class="f-btn fill">{{ mock.save }}</span>
            <span class="f-btn text">{{ mock.cancel }}</span>
          </div>
        </div>
      </div>

      <aside class="notes">
        <div class="metrics">
          <div class="metric">
            <span class="m-num">{{ BORDERS[stepIndex] }}</span>
            <span class="m-k">{{ t('grouping.metricBorders') }}</span>
          </div>
          <div class="metric">
            <span class="m-num">{{ GAPS[stepIndex] }}</span>
            <span class="m-k">{{ t('grouping.metricGaps') }}</span>
          </div>
        </div>

        <label class="tool">
          <input
            v-model="guides"
            type="checkbox"
          />
          {{ t('grouping.showGaps') }}
        </label>
        <div
          v-if="guides"
          class="legend"
        >
          <span class="lg"><span class="sw between" />{{ t('grouping.gapBetween') }}</span>
          <span class="lg"><span class="sw inside" />{{ t('grouping.gapInside') }}</span>
        </div>

        <label
          v-if="stepIndex === 2"
          class="tool"
        >
          <input
            v-model="explicit"
            type="checkbox"
          />
          {{ t('grouping.explicitToggle') }}
        </label>

        <div
          v-if="stepIndex === 2"
          class="terms"
        >
          <div class="term">
            <div class="term-k">{{ t('grouping.implicitTitle') }}</div>
            <div class="term-v">{{ t('grouping.implicitText') }}</div>
          </div>
          <div class="term">
            <div class="term-k">{{ t('grouping.explicitTitle') }}</div>
            <div class="term-v">{{ t('grouping.explicitText') }}</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const grouping = computed(() => messages.value.grouping)
const steps = computed(() => grouping.value.steps)
const mock = computed(() => grouping.value.mock)

const stepIndex = ref(0)
const guides = ref(false)
const explicit = ref(false)

// Borders that only decorate, and how many spacing steps the form uses, per step.
const BORDERS = [13, 0, 0]
const GAPS = [1, 1, 3]
const blockGap = computed(() => (stepIndex.value === 2 ? '32' : '12'))
const innerGap = computed(() => (stepIndex.value === 2 ? '4' : '12'))
</script>

<style scoped>
.usg {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usg-head { text-align: center; margin-bottom: 12px; }
.usg-title { font-size: 17px; font-weight: 700; }
.usg-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.steps { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.step {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px 5px 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.step:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.step.on { color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); }
.step .n {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--vp-c-text-3);
  border-radius: 50%;
}
.step.on .n { background: var(--vp-c-brand-1); }
.caption {
  margin: 10px 0 14px;
  font-size: 13px;
  line-height: 1.7;
}

.usg-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 230px;
  gap: 14px;
  align-items: start;
}

/* Spacing lives in two variables, so step 3 only has to change those. */
.paper {
  --g-block: 12px;
  --g-inner: 12px;
  --g-row: 12px;
  position: relative;
  padding: 20px 20px 20px 64px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.paper.s2 { --g-block: 32px; --g-inner: 4px; }

.align-line {
  display: none;
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 64px;
  border-left: 1px dashed var(--vp-c-text-3);
  opacity: 0.6;
}
.guides .align-line { display: block; }

.gap {
  position: relative;
  display: block;
  width: 100%;
}
.gap.block { height: var(--g-block); }
.gap.inner { height: var(--g-inner); }

/* Guides sit in the left gutter, one bar per gap. */
.guides .gap::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 14px;
  width: 2px;
  background: var(--vp-c-text-3);
}
.guides .gap.inner::before { left: -50px; }
.guides .gap::after {
  content: attr(data-g);
  position: absolute;
  top: 50%;
  left: -42px;
  padding: 0 4px;
  font-size: 10px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  transform: translateY(-50%);
}
.guides .gap.block::after { left: 22px; }
.paper.s2.guides .gap.block::before { width: 4px; background: var(--vp-c-brand-1); }
.paper.s2.guides .gap.block::after { left: 24px; color: var(--vp-c-brand-1); font-weight: 600; }

.blk { position: relative; }
.row { display: flex; flex-wrap: wrap; gap: var(--g-row); }

.f-title { font-size: 17px; font-weight: 700; line-height: 1.3; }
.f-label { font-size: 13px; font-weight: 600; line-height: 1.5; }
.field {
  display: inline-flex;
  align-items: center;
  min-width: 128px;
  min-height: 34px;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.toggle { display: inline-flex; align-items: center; gap: 8px; min-height: 34px; font-size: 13px; }
.knob { position: relative; width: 30px; height: 18px; background: var(--vp-c-brand-1); border-radius: 9px; }
.knob::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
}
.f-btn { padding: 6px 14px; font-size: 13px; border-radius: 6px; }
.f-btn.fill { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.f-btn.text { font-weight: 500; color: var(--vp-c-text-2); }

/* Step 1: box everything, including a box around each group. */
.paper.s0 .blk,
.paper.s0 .f-title,
.paper.s0 .f-label,
.paper.s0 .toggle,
.paper.s0 .f-btn {
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-text-1);
  border-radius: 4px;
}
.paper.s0 .blk { padding: 8px; }
.paper.s0 .f-btn.fill { background: var(--vp-c-brand-1); }
.paper.s0 .row { --g-row: 6px; }

/* Step 3 option: one explicit group gets a tint. It is painted behind the
   content, so nothing moves and the guides still measure true. */
.paper.s2.tinted .blk.notify::before {
  content: '';
  position: absolute;
  inset: -8px -14px;
  z-index: 0;
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--vp-c-bg));
  border-radius: 10px;
}
.paper.s2.tinted .blk.notify > * { position: relative; }

.notes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  font-size: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.metrics { display: flex; gap: 18px; }
.metric { display: flex; flex-direction: column; }
.m-num { font-size: 24px; font-weight: 700; line-height: 1.2; color: var(--vp-c-brand-1); }
.m-k { font-size: 11px; color: var(--vp-c-text-2); }

.tool { display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; }
.tool input { accent-color: var(--vp-c-brand-1); }

.legend { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 11px; color: var(--vp-c-text-2); }
.lg { display: inline-flex; align-items: center; gap: 6px; }
.sw { width: 12px; height: 12px; border-radius: 3px; background: var(--vp-c-text-3); }
.sw.between { background: var(--vp-c-brand-1); }

.terms { display: flex; flex-direction: column; gap: 8px; }
.term-k { font-weight: 600; }
.term-v { margin-top: 2px; line-height: 1.6; color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .usg { padding: 14px 12px 16px; }
  .caption { margin: 10px 0 12px; }
  .usg-body { grid-template-columns: minmax(0, 1fr); }
}
</style>
