<template>
  <div class="usk">
    <div class="usk-head">
      <div class="usk-title">{{ t('skeleton.title') }}</div>
      <div class="usk-sub">{{ t('skeleton.subtitle') }}</div>
    </div>

    <div class="usk-body">
      <div class="side">
        <button
          v-for="(item, i) in items"
          :key="item.id"
          type="button"
          class="item"
          :class="{ hl: !misplaced && active === item.id }"
          :aria-pressed="pinned === item.id"
          @click="toggle(item.id)"
          @mouseenter="active = item.id"
          @mouseleave="active = pinned"
          @focus="active = item.id"
          @blur="active = pinned"
        >
          <span class="n">{{ i + 1 }}</span>
          <span class="name">{{ item.name }}</span>
        </button>

        <div
          class="detail"
          aria-live="polite"
        >
          <div
            v-if="misplaced"
            class="warn"
          >
            {{ t('skeleton.misplacedHint') }}
          </div>
          <template v-else-if="currentItem">
            <div class="d-row">
              <span class="d-k">{{ t('skeleton.taskLabel') }}</span>
              <span class="d-v">{{ currentItem.question }}</span>
            </div>
            <div class="d-row">
              <span class="d-k">{{ t('skeleton.affectLabel') }}</span>
              <span class="d-v">{{ currentItem.affect }}</span>
            </div>
          </template>
        </div>

        <label class="tool">
          <input
            v-model="misplaced"
            type="checkbox"
          />
          {{ t('skeleton.misplacedToggle') }}
        </label>
      </div>

      <div class="paper">
        <div class="legend">
          <span class="lg"><span class="sw ctl" />{{ t('skeleton.legendCtl') }}</span>
          <span class="lg"><span class="sw aff" />{{ t('skeleton.legendAffect') }}</span>
        </div>
        <div class="bar-notes">
          <span>{{ t('skeleton.leading') }}</span>
          <span>{{ t('skeleton.trailing') }}</span>
        </div>

        <div
          class="window"
          :class="{ focus: !!current, misplaced }"
        >
          <aside
            class="zone nav"
            :class="zc('nav')"
          >
            <span
              v-for="(label, i) in mock.nav"
              :key="label"
              class="rail-item"
              :class="{ on: i === 0 }"
            >
              {{ label }}
            </span>
          </aside>

          <div
            class="zone main"
            :class="zc('page')"
          >
            <header class="topbar">
              <div
                class="zone title"
                :class="zc('title')"
              >
                <span class="back">‹</span>
                <span class="t">{{ mock.title }}</span>
              </div>
              <div
                class="zone acts"
                :class="zc('pageact')"
              >
                <span class="btn">{{ mock.export }}</span>
                <span class="btn primary">{{ mock.create }}</span>
                <span
                  v-if="misplaced"
                  class="btn danger"
                >
                  {{ mock.remove }}
                </span>
              </div>
            </header>

            <div class="listhead">
              <span class="section">{{ mock.section }}</span>
              <div
                class="zone listctl"
                :class="zc('listctl')"
              >
                <span class="seg">
                  <span
                    v-for="(f, i) in mock.filters"
                    :key="f"
                    class="seg-btn"
                    :class="{ on: i === 0 }"
                  >
                    {{ f }}
                  </span>
                </span>
                <span class="sort">{{ mock.sort }} ↓</span>
              </div>
            </div>

            <div
              class="zone rows"
              :class="zc('rows')"
            >
              <div
                v-for="(item, i) in mock.items"
                :key="item.name"
                class="zone row"
                :class="zc('row' + i)"
              >
                <span class="name">{{ item.name }}</span>
                <span class="meta">{{ item.meta }}</span>
                <span
                  class="zone itemact"
                  :class="zc('itemact' + i)"
                >
                  <span class="btn ghost">{{ mock.open }}</span>
                  <span
                    class="btn ghost more"
                    :aria-label="mock.more"
                  >
                    ⋯
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const skeleton = computed(() => messages.value.skeleton)
const items = computed(() => skeleton.value.items)
const mock = computed(() => skeleton.value.mock)

const active = ref(null)
const pinned = ref(null)
const misplaced = ref(false)

// Where each item lives on the page (solid outline) and what it affects (dashed outline).
const MAP = {
  global: { ctl: ['nav'], aff: ['page'] },
  locate: { ctl: ['title'], aff: ['page'] },
  content: { ctl: ['rows'], aff: [] },
  listctl: { ctl: ['listctl'], aff: ['rows'] },
  pageact: { ctl: ['pageact'], aff: ['rows'] },
  itemact: { ctl: ['itemact0'], aff: ['row0'] }
}
// With "Delete" up in the toolbar, nobody can tell which row it would affect.
const MISPLACED = { ctl: ['pageact'], aff: ['row0', 'row1'] }

const current = computed(() => (misplaced.value ? MISPLACED : MAP[active.value]) || null)
const currentItem = computed(() => items.value.find((item) => item.id === active.value))

function toggle(id) {
  pinned.value = pinned.value === id ? null : id
  active.value = pinned.value
  misplaced.value = false
}

function zc(id) {
  const map = current.value
  return {
    ctl: !!map && map.ctl.includes(id),
    aff: !!map && map.aff.includes(id)
  }
}
</script>

<style scoped>
.usk {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usk-head { text-align: center; margin-bottom: 14px; }
.usk-title { font-size: 17px; font-weight: 700; }
.usk-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.usk-body {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.side { display: flex; flex-direction: column; gap: 6px; }
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  font-size: 13px;
  text-align: left;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.item:hover,
.item.hl { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.item .n {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--vp-c-text-3);
  border-radius: 50%;
}
.item.hl .n { background: var(--vp-c-brand-1); }
.item .name { font-weight: 600; }

.detail {
  min-height: 104px;
  margin-top: 2px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.65;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}
.d-row { display: flex; gap: 8px; margin-bottom: 6px; }
.d-k { flex-shrink: 0; color: var(--vp-c-text-3); }
.warn { color: var(--vp-c-danger-1); }

.tool { display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 12px; cursor: pointer; user-select: none; }
.tool input { accent-color: var(--vp-c-brand-1); }

.paper {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-bottom: 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}
.lg { display: inline-flex;
  align-items: center;
  gap: 6px; }
.sw { display: inline-block; width: 20px; border-top: 2px solid var(--vp-c-brand-1); }
.sw.aff { border-top: 2px dashed var(--aff); }

.bar-notes {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 0 6px 56px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.window {
  --aff: oklch(66% 0.14 75);
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  overflow: hidden;
  font-size: 12px;
  text-align: left;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.window.misplaced { --aff: var(--vp-c-danger-1); }

/* Zones nest. Anything unmarked, with nothing marked inside it, steps back. */
.zone {
  position: relative;
  border-radius: 6px;
  transition: opacity 0.2s, outline-color 0.2s, background 0.2s;
}
.window.focus .zone:not(.ctl):not(.aff):not(:has(.ctl, .aff)) { opacity: 0.2; }
.zone.ctl { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.zone.aff {
  outline: 2px dashed var(--aff);
  outline-offset: 2px;
  background: color-mix(in srgb, var(--aff) 9%, transparent);
}
/* The two zones touching the window edge draw their outline inward so it is not clipped. */
.zone.nav.ctl,
.zone.main.ctl { outline-offset: -3px; }
.zone.main.aff { outline-offset: -4px; }

.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
}
.rail-item {
  padding: 4px 2px;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  color: var(--vp-c-text-2);
  border-radius: 4px;
}
.rail-item.on { font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }

.topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 10px;
  padding: 8px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.title { display: flex; align-items: center; gap: 6px; padding: 2px 4px; font-weight: 600; }
.back { color: var(--vp-c-text-2); }
.acts { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 2px; }

.btn {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  font-size: 11px;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
}
.btn.primary { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); border-color: transparent; }
.btn.ghost { color: var(--vp-c-text-2); border-color: transparent; }
.btn.danger { color: var(--vp-c-danger-1); border-color: var(--vp-c-danger-1); }

.listhead {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 10px;
  padding: 12px 12px 8px;
}
.section { font-size: 13px; font-weight: 600; }
.listctl { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 2px; }
.seg { display: inline-flex; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 5px; }
.seg-btn { padding: 2px 8px; font-size: 11px; color: var(--vp-c-text-1); }
.seg-btn.on { font-weight: 600; background: var(--vp-c-bg-soft); }
.sort { font-size: 11px; }

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-top: 1px solid var(--vp-c-divider);
}
.row .name { font-weight: 600; }
.row .meta { font-size: 11px; color: var(--vp-c-text-2); }
.itemact { display: flex; gap: 2px; margin-left: auto; padding: 2px; }
.btn.more { padding: 3px 7px; }

@media (max-width: 720px) {
  .usk { padding: 14px 12px 16px; }
  .usk-body { grid-template-columns: minmax(0, 1fr); }
  .side { flex-direction: row; flex-wrap: wrap; }
  .item { flex: 1 1 45%; justify-content: center; }
  .detail { flex-basis: 100%; min-height: 0; }
  .tool { flex-basis: 100%; }
  .bar-notes { margin-left: 0; }
}

/* On a phone the mock is too narrow for name, date and actions on one line. */
@media (max-width: 480px) {
  .window { grid-template-columns: 44px minmax(0, 1fr); }
  .row { flex-wrap: wrap; row-gap: 2px; }
  .row .name { white-space: nowrap; }
  .row .meta { order: 3; flex-basis: 100%; }
}
</style>
