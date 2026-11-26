<template>
  <div class="ust">
    <div class="ust-head">
      <div class="ust-title">{{ t('tokens.title') }}</div>
      <div class="ust-sub">{{ t('tokens.subtitle') }}</div>
    </div>

    <div class="ust-body">
      <!-- Both pages are drawn only from the CSS variables set here. -->
      <div class="pages">
        <div
          class="page"
          :style="styleA"
        >
          <div class="p-title">{{ t('tokens.pageA') }}</div>
          <div class="p-bar">
            <span class="p-heading">{{ mock.list.title }}</span>
            <span class="p-btn primary">{{ mock.list.create }}</span>
          </div>
          <div
            v-for="item in mock.list.items"
            :key="item.name"
            class="p-row"
          >
            <span class="p-name">{{ item.name }}</span>
            <span class="p-meta">{{ item.meta }}</span>
            <span class="p-btn">{{ mock.list.open }}</span>
          </div>
        </div>

        <div
          class="page"
          :class="{ rogue: inconsistent }"
          :style="styleB"
        >
          <div class="p-title">{{ t('tokens.pageB') }}</div>
          <div class="p-field">
            <span class="p-meta">{{ mock.settings.email }}</span>
            <span class="p-input">{{ mock.settings.emailValue }}</span>
          </div>
          <div class="p-row">
            <span class="p-name">{{ mock.settings.notify }}</span>
            <span class="p-switch" aria-hidden="true"><i /></span>
          </div>
          <div class="p-actions">
            <span class="p-btn">{{ mock.settings.cancel }}</span>
            <span class="p-btn primary">{{ mock.settings.save }}</span>
          </div>
        </div>
      </div>

      <aside class="panel">
        <label class="ctl">
          <span>{{ t('tokens.radius') }}</span>
          <input
            v-model.number="radius"
            type="range"
            min="0"
            max="16"
            step="1"
          />
          <b>{{ t('tokens.pixel', { n: radius }) }}</b>
        </label>
        <label class="ctl">
          <span>{{ t('tokens.height') }}</span>
          <input
            v-model.number="height"
            type="range"
            min="28"
            max="44"
            step="2"
          />
          <b>{{ t('tokens.pixel', { n: height }) }}</b>
        </label>
        <div class="ctl">
          <span>{{ t('tokens.accent') }}</span>
          <div class="swatches">
            <button
              v-for="(name, i) in colors"
              :key="name"
              type="button"
              class="swatch"
              :class="{ on: accent === i }"
              :style="{ background: ACCENTS[i] }"
              :aria-label="name"
              :aria-pressed="accent === i"
              @click="accent = i"
            />
          </div>
        </div>

        <label class="tool">
          <input
            v-model="inconsistent"
            type="checkbox"
          />
          {{ t('tokens.inconsistent') }}
        </label>
        <div
          class="note"
          aria-live="polite"
        >
          {{ inconsistent ? t('tokens.inconsistentNote') : t('tokens.consistentNote') }}
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
const tokens = computed(() => messages.value.tokens)
const mock = computed(() => tokens.value.mock)
const colors = computed(() => tokens.value.colors)

const ACCENTS = ['#0b6bcb', '#1f8a4c', '#d97706', '#7c3aed']

const radius = ref(6)
const height = ref(36)
const accent = ref(0)
const inconsistent = ref(false)

function vars(r, h, a) {
  return { '--tk-radius': r + 'px', '--tk-h': h + 'px', '--tk-accent': ACCENTS[a] }
}

const styleA = computed(() => vars(radius.value, height.value, accent.value))

// Without tokens the second page uses whatever someone picked on the spot.
const styleB = computed(() =>
  inconsistent.value ? vars(0, 44, (accent.value + 2) % ACCENTS.length) : styleA.value
)
</script>

<style scoped>
.ust {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.ust-head { text-align: center; margin-bottom: 14px; }
.ust-title { font-size: 17px; font-weight: 700; }
.ust-sub {
  max-width: 640px;
  margin: 4px auto 0;
  font-size: 12px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.ust-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 230px;
  gap: 14px;
  align-items: start;
}
.pages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}
.page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  text-align: left;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.page.rogue { border-color: var(--vp-c-danger-1); }
.p-title { font-size: 14px; font-weight: 700; }
.p-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px; }
.p-heading { font-size: 12px; font-weight: 600; }
.p-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: var(--tk-radius);
}
.p-name { font-size: 12px; font-weight: 600; }
.p-meta { font-size: 11px; color: var(--vp-c-text-2); }
/* The mock pages are narrow: name and action share the first line, the date drops below. */
.p-row .p-btn { margin-left: auto; }
.p-row .p-meta { order: 3; flex-basis: 100%; }
.p-field { display: flex; flex-direction: column; gap: 3px; }
.p-input {
  padding: 5px 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--tk-radius);
}
.p-switch {
  display: inline-block;
  width: 30px;
  height: 18px;
  background: var(--tk-accent);
  border-radius: 9px;
  transition: background 0.2s;
}
.p-switch i {
  display: block;
  width: 14px;
  height: 14px;
  margin: 2px 2px 0 auto;
  background: #fff;
  border-radius: 50%;
}
.p-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: auto; }
.p-btn {
  display: inline-flex;
  align-items: center;
  height: var(--tk-h);
  padding: 0 14px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--tk-radius);
  transition: all 0.2s;
}
.p-btn.primary { font-weight: 600; color: #fff; background: var(--tk-accent); border-color: transparent; }

.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.ctl { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.ctl > span { flex-shrink: 0; min-width: 64px; }
.ctl input[type='range'] { flex: 1; min-width: 60px; accent-color: var(--vp-c-brand-1); }
.ctl b { min-width: 38px; font-size: 12px; color: var(--vp-c-brand-1); text-align: right; }
.swatches { display: flex; gap: 6px; }
.swatch { width: 22px; height: 22px; border: 2px solid transparent; border-radius: 50%; cursor: pointer; }
.swatch.on { border-color: var(--vp-c-text-1); box-shadow: 0 0 0 2px var(--vp-c-bg) inset; }

.tool { display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer; user-select: none; }
.tool input { accent-color: var(--vp-c-brand-1); }
.note { font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .ust { padding: 14px 12px 16px; }
  .ust-body { grid-template-columns: minmax(0, 1fr); }
}
</style>
