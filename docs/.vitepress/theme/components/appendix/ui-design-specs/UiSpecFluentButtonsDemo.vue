<template>
  <div class="usf">
    <div class="usf-head">
      <div class="usf-title">{{ t('fluent.title') }}</div>
      <div class="usf-sub">{{ t('fluent.subtitle') }}</div>
    </div>

    <div class="usf-tools">
      <label class="ctl">
        <span>{{ t('fluent.count') }}</span>
        <input
          v-model.number="count"
          type="range"
          min="2"
          max="8"
          step="1"
        />
        <b>{{ count }}</b>
      </label>
      <div
        class="seg"
        role="group"
        :aria-label="t('fluent.count')"
      >
        <button
          v-for="m in modes"
          :key="m.id"
          type="button"
          class="seg-btn"
          :class="{ on: mode === m.id }"
          :aria-pressed="mode === m.id"
          @click="mode = m.id"
        >
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="stage">
      <span
        v-for="(action, i) in shown"
        :key="action.id"
        class="f-btn"
        :class="kind(i)"
      >
        {{ action.label }}
      </span>
    </div>
    <div
      class="note"
      aria-live="polite"
    >
      {{ mode === 'all' ? t('fluent.allNote') : t('fluent.levelsNote') }}
    </div>

    <div class="legend">
      <div class="legend-title">{{ t('fluent.legendTitle') }}</div>
      <div
        v-for="(level, i) in levels"
        :key="level.name"
        class="level"
      >
        <span
          class="f-btn"
          :class="LEVEL_CLASS[i]"
        >
          {{ level.name }}
        </span>
        <span class="level-desc">{{ level.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const fluent = computed(() => messages.value.fluent)
const actions = computed(() => fluent.value.actions)
const levels = computed(() => fluent.value.levels)
const modes = computed(() => [
  { id: 'all', label: t('fluent.styleAll') },
  { id: 'levels', label: t('fluent.styleLevels') }
])

// Start on the "everything is Primary" state so the problem shows first.
const count = ref(6)
const mode = ref('all')

const LEVEL_CLASS = ['primary', 'secondary', 'subtle', 'transparent']

const shown = computed(() => actions.value.slice(0, count.value))

// With levels on: one Primary, one Secondary, and the rest alternate between the two quiet styles.
function kind(i) {
  if (mode.value === 'all') return 'primary'
  if (i === 0) return 'primary'
  if (i === 1) return 'secondary'
  return i % 2 === 0 ? 'subtle' : 'transparent'
}
</script>

<style scoped>
.usf {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usf-head { text-align: center; margin-bottom: 14px; }
.usf-title { font-size: 17px; font-weight: 700; }
.usf-sub {
  max-width: 620px;
  margin: 4px auto 0;
  font-size: 12px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.usf-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-bottom: 12px;
}
.ctl { display: flex; flex: 1 1 260px; align-items: center; gap: 10px; font-size: 12px; }
.ctl span { white-space: nowrap; }
.ctl input { flex: 1; min-width: 100px; accent-color: var(--vp-c-brand-1); }
.ctl b { min-width: 18px; font-size: 13px; color: var(--vp-c-brand-1); }
.seg {
  display: inline-flex;
  padding: 3px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}
.seg-btn {
  padding: 3px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.seg-btn:hover { color: var(--vp-c-brand-1); }
.seg-btn.on { font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }

.stage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 92px;
  padding: 16px 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.note {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
}

/* Fluent 2's four emphasis levels. Only Primary and Secondary are visible at rest. */
.f-btn {
  display: inline-flex;
  align-items: center;
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.15s;
}
.f-btn.primary { color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.f-btn.secondary { font-weight: 500; color: var(--vp-c-text-1); border-color: var(--vp-c-text-2); }
.f-btn.subtle,
.f-btn.transparent { font-weight: 500; color: var(--vp-c-text-1); }
.f-btn.subtle:hover { background: color-mix(in srgb, var(--vp-c-text-1) 10%, transparent); }
.f-btn.transparent:hover {
  background: color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
  border-color: var(--vp-c-divider);
}

.legend {
  margin-top: 14px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.legend-title { margin-bottom: 8px; font-size: 12px; font-weight: 600; }
.level {
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 5px 0;
  border-top: 1px dashed var(--vp-c-divider);
}
.level:first-of-type { border-top: 0; }
.level .f-btn { justify-content: center; }
.level-desc { font-size: 12px; line-height: 1.5; color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .usf { padding: 14px 12px 16px; }
  .level { grid-template-columns: 104px minmax(0, 1fr); gap: 8px; }
}
</style>
