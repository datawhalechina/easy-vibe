<template>
  <div class="usl3">
    <div class="usl3-head">
      <div class="usl3-title">{{ t('layers3.title') }}</div>
      <div class="usl3-sub">{{ t('layers3.subtitle') }}</div>
    </div>

    <label class="ctl">
      <span>{{ t('layers3.slider') }}</span>
      <input
        v-model.number="gap"
        type="range"
        min="0"
        max="100"
        step="1"
      />
      <b>{{ gap }}%</b>
    </label>

    <div class="usl3-body">
      <div
        class="page"
        :style="{ gap: 6 + 20 * k + 'px' }"
      >
        <div
          class="zone"
          :class="zc(0)"
        >
          <span
            class="mark"
            :style="{ background: COLORS[0] }"
          >{{ labels[0] }}</span>
          <div
            class="p-title"
            :style="{ fontSize: 14 + 10 * k + 'px' }"
          >
            {{ mock.title }}
          </div>
          <div class="p-body">{{ mock.body }}</div>
        </div>

        <div
          class="zone"
          :class="zc(1)"
        >
          <span
            class="mark"
            :style="{ background: COLORS[1] }"
          >{{ labels[1] }}</span>
          <div
            class="p-meta"
            :style="{
              fontSize: 14 - 2 * k + 'px',
              fontWeight: 700 - 300 * k,
              color: `color-mix(in srgb, var(--vp-c-text-2) ${100 * k}%, var(--vp-c-text-1))`
            }"
          >
            {{ mock.meta }}
          </div>
        </div>

        <div
          class="zone"
          :class="zc(2)"
        >
          <span
            class="mark"
            :style="{ background: COLORS[2] }"
          >{{ labels[2] }}</span>
          <div class="p-actions">
            <span class="p-btn primary">{{ mock.primary }}</span>
            <span
              v-for="s in mock.secondary"
              :key="s"
              class="p-btn"
              :class="secClass"
            >
              {{ s }}
            </span>
          </div>
        </div>
      </div>

      <aside class="side">
        <div
          v-for="(label, i) in labels"
          :key="label"
          class="row"
          :class="{ hl: active === i }"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
          <span
            class="dot"
            :style="{ background: COLORS[i] }"
          />{{ label }}
        </div>
        <div
          class="note"
          aria-live="polite"
        >
          {{ caption }}
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
const layers3 = computed(() => messages.value.layers3)
const labels = computed(() => layers3.value.labels)
const mock = computed(() => layers3.value.mock)

const COLORS = ['var(--vp-c-brand-1)', 'oklch(66% 0.14 75)', 'oklch(56% 0.14 155)']

// 0 = all three layers equally heavy, 1 = fully pulled apart.
const gap = ref(0)
const k = computed(() => gap.value / 100)
const active = ref(null)

const caption = computed(() => {
  if (gap.value < 20) return t('layers3.flat')
  if (gap.value < 75) return t('layers3.mid')
  return t('layers3.full')
})

// Secondary actions step down from filled to outlined to text as the layers separate.
const secClass = computed(() => {
  if (gap.value < 33) return 'as-primary'
  if (gap.value < 66) return 'as-outlined'
  return 'as-text'
})

function zc(i) {
  return { hl: active.value === i }
}
</script>

<style scoped>
.usl3 {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usl3-head { text-align: center; margin-bottom: 14px; }
.usl3-title { font-size: 17px; font-weight: 700; }
.usl3-sub { margin: 4px auto 0; max-width: 620px; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }

.ctl { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 12px; }
.ctl span { white-space: nowrap; }
.ctl input { flex: 1; accent-color: var(--vp-c-brand-1); }
.ctl b { min-width: 40px; font-size: 13px; color: var(--vp-c-brand-1); text-align: right; }

.usl3-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 14px;
  align-items: stretch;
}
.page {
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: gap 0.15s;
}
.zone {
  position: relative;
  padding: 8px;
  margin: 0 -8px;
  border-radius: 8px;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.zone.hl { box-shadow: 0 0 0 1.5px var(--vp-c-brand-1); }
.page:has(.zone.hl) .zone:not(.hl) { opacity: 0.25; }

.mark {
  position: absolute;
  top: -9px;
  left: -6px;
  z-index: 2;
  padding: 1px 7px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.5;
  color: #fff;
  border-radius: 999px;
}
.p-title { font-weight: 700; line-height: 1.25; }
.p-body { font-size: 14px; line-height: 1.7; }
.p-meta { line-height: 1.5; }
.p-actions { display: flex; flex-wrap: wrap; gap: 8px; }

.p-btn {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.2s;
}
.p-btn.primary,
.p-btn.as-primary { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.p-btn.as-outlined { font-weight: 500; color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.p-btn.as-text { padding: 0 6px; font-weight: 500; color: var(--vp-c-text-2); }

.side { display: flex; flex-direction: column; gap: 6px; }
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 600;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s;
}
.row.hl { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.note {
  margin-top: 4px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

@media (max-width: 720px) {
  .usl3 { padding: 14px 12px 16px; }
  .usl3-body { grid-template-columns: minmax(0, 1fr); }
}
</style>
