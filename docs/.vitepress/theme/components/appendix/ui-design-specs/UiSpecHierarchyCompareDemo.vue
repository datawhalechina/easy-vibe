<template>
  <div class="usc">
    <div class="usc-head">
      <div class="usc-title">{{ t('compare.title') }}</div>
      <div class="usc-sub">{{ t('compare.subtitle') }}</div>
    </div>

    <div class="squint">
      <span class="squint-name">{{ t('compare.squint') }}</span>
      <input
        v-model.number="blur"
        class="squint-range"
        type="range"
        min="0"
        max="8"
        step="0.5"
        :aria-label="t('compare.squint')"
      />
      <span class="squint-ends">{{ t('compare.squintClear') }} — {{ t('compare.squintBlurry') }}</span>
    </div>
    <div class="squint-hint">{{ t('compare.squintHint') }}</div>

    <div class="stage">
      <figure
        v-for="side in sides"
        :key="side"
        class="panel"
      >
        <figcaption class="panel-head">
          <span
            class="tag"
            :class="side === 'before' ? 'bad' : 'good'"
          >
            {{ side === 'before' ? t('common.before') : t('common.after') }}
          </span>
          <span class="stat">{{ stat(side) }}</span>
        </figcaption>

        <div
          v-if="side === 'after'"
          class="fixes"
        >
          <button
            v-for="issue in issues"
            :key="issue.id"
            type="button"
            class="fix"
            :class="{ on: fixes[issue.id], hl: active === issue.id }"
            :aria-pressed="fixes[issue.id]"
            @click="toggle(issue.id)"
            @mouseenter="active = issue.id"
            @mouseleave="active = null"
            @focus="active = issue.id"
            @blur="active = null"
          >
            <span class="fix-n">{{ issue.n }}</span>{{ issue.short }}
          </button>
          <button
            v-if="!allOn"
            type="button"
            class="reset"
            @click="reset"
          >
            {{ t('common.reset') }}
          </button>
        </div>

        <div
          class="screen"
          :style="screenStyle"
        >
          <div
            class="mock"
            :class="mockClass(side)"
          >
            <div
              class="zone z-title"
              :class="zc('z-title')"
            >
              <span class="m-title">{{ mock.pageTitle }}</span>
              <span class="m-count">{{ mock.count }}</span>
              <span
                v-if="!has(side, 'type')"
                class="badge"
                :style="badgeStyle"
              >
                1
              </span>
            </div>

            <div
              class="zone z-bar"
              :class="zc('z-bar')"
            >
              <span class="m-filters">
                <span
                  v-for="(f, i) in mock.filters"
                  :key="f"
                  class="m-btn filter"
                  :class="{ on: i === 0 }"
                >
                  {{ f }}
                </span>
                <span class="m-btn sort">{{ mock.sort }} ↓</span>
              </span>
              <span class="m-actions">
                <span class="m-btn export">{{ mock.export }}</span>
                <span class="m-btn create">{{ mock.create }}</span>
                <span
                  v-if="!has(side, 'scope')"
                  class="btn-wrap"
                >
                  <span class="m-btn remove">{{ mock.remove }}</span>
                  <span
                    class="badge"
                    :style="badgeStyle"
                  >
                    4
                  </span>
                </span>
              </span>
              <span
                v-if="!has(side, 'buttons')"
                class="badge"
                :style="badgeStyle"
              >
                3
              </span>
            </div>

            <template
              v-for="(item, i) in mock.items"
              :key="item.name"
            >
              <div
                class="zone z-item-main"
                :class="zc('z-item-main')"
              >
                <span class="m-name">{{ item.name }}</span>
                <span class="m-meta">{{ item.meta }}</span>
                <span
                  v-if="i === 0 && !has(side, 'borders')"
                  class="badge"
                  :style="badgeStyle"
                >
                  2
                </span>
              </div>
              <div
                class="zone z-item-act"
                :class="zc('z-item-act')"
              >
                <span class="m-btn open">{{ mock.open }}</span>
                <span
                  v-if="has(side, 'scope')"
                  class="btn-wrap menu-wrap"
                >
                  <button
                    type="button"
                    class="m-btn more"
                    :aria-label="mock.more"
                    :aria-expanded="openMenu === i"
                    @click.stop="openMenu = openMenu === i ? -1 : i"
                  >
                    ⋯
                  </button>
                  <span
                    v-if="openMenu === i"
                    class="m-menu"
                  >
                    <span
                      v-for="m in moreMenu"
                      :key="m"
                      class="m-menu-item"
                      :class="{ danger: m === mock.remove }"
                    >
                      {{ m }}
                    </span>
                  </span>
                </span>
              </div>
            </template>
          </div>
        </div>
      </figure>
    </div>
    <div class="legend">{{ t('compare.metrics.legend') }}</div>

    <div class="issues">
      <div class="i-head">
        <span class="i-n">{{ t('compare.issueLabel') }}</span>
        <span>{{ tableHead[0] }}</span>
        <span>{{ tableHead[1] }}</span>
        <span>{{ tableHead[2] }}</span>
      </div>
      <div
        v-for="issue in issues"
        :key="issue.id"
        class="i-row"
        :class="{ hl: active === issue.id }"
        @mouseenter="active = issue.id"
        @mouseleave="active = null"
      >
        <span class="i-n">{{ issue.n }}</span>
        <span>{{ issue.problem }}</span>
        <span>{{ issue.fix }}</span>
        <span>{{ issue.result }}</span>
      </div>
      <div class="i-foot">{{ t('compare.applyHint') }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const compare = computed(() => messages.value.compare)
const issues = computed(() => compare.value.issues)
const mock = computed(() => compare.value.mock)
const moreMenu = computed(() => compare.value.moreMenu)
const tableHead = computed(() => compare.value.tableHead)

const sides = ['before', 'after']
const fixes = reactive({ type: true, borders: true, buttons: true, scope: true })
const active = ref(null)
const blur = ref(0)
const openMenu = ref(-1)

// Which page regions each problem lives in.
const ZONES = {
  type: ['z-title', 'z-bar', 'z-item-main'],
  borders: ['z-bar', 'z-item-main', 'z-item-act'],
  buttons: ['z-bar', 'z-item-act'],
  scope: ['z-bar', 'z-item-act']
}

const allOn = computed(() => Object.values(fixes).every(Boolean))
const has = (side, key) => side === 'after' && fixes[key]

function toggle(id) {
  fixes[id] = !fixes[id]
}

function reset() {
  Object.keys(fixes).forEach((key) => {
    fixes[key] = true
  })
}

function zc(zone) {
  return { hl: !!active.value && ZONES[active.value].includes(zone) }
}

function mockClass(side) {
  return {
    'fix-type': has(side, 'type'),
    'fix-borders': has(side, 'borders'),
    'fix-buttons': has(side, 'buttons'),
    'fix-scope': has(side, 'scope'),
    focus: !!active.value
  }
}

function stat(side) {
  const borders = has(side, 'borders') ? 1 : 14
  const solid = has(side, 'buttons') ? 1 : has(side, 'scope') ? 9 : 8
  return `${borders} ${t('compare.metrics.borders')} · ${solid} ${t('compare.metrics.solid')}`
}

const screenStyle = computed(() => ({
  filter: blur.value > 0 ? `blur(${blur.value}px)` : 'none'
}))

// Badges are reading aids, so they step aside once the squint test starts.
const badgeStyle = computed(() => ({
  opacity: Math.max(0, 1 - blur.value / 2)
}))

function onDocumentClick(event) {
  if (!event.target.closest || !event.target.closest('.menu-wrap')) openMenu.value = -1
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<style scoped>
.usc {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usc-head { text-align: center; margin-bottom: 14px; }
.usc-title { font-size: 17px; font-weight: 700; }
.usc-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.squint { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.squint-name { font-weight: 600; white-space: nowrap; }
.squint-range { flex: 1; min-width: 120px; accent-color: var(--vp-c-brand-1); }
.squint-ends { font-size: 11px; color: var(--vp-c-text-3); white-space: nowrap; }
.squint-hint { font-size: 12px; color: var(--vp-c-text-2); margin: 2px 0 14px; }

.stage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  align-items: start;
  gap: 14px;
}

.panel {
  margin: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.tag { font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 999px; }
.tag.bad { color: var(--vp-c-danger-1); background: color-mix(in srgb, var(--vp-c-danger-1) 14%, transparent); }
.tag.good { color: var(--vp-c-success); background: color-mix(in srgb, var(--vp-c-success) 16%, transparent); }
.stat { font-size: 11px; color: var(--vp-c-text-2); }

.fixes { display: flex; flex-wrap: wrap; gap: 6px; }
.fix {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}
.fix:hover, .fix.hl { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.fix.on { color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); }
.fix-n { font-size: 11px; }
.reset {
  padding: 3px 9px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
}
.reset:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-text-2); }

.screen {
  position: relative;
  flex: 1;
  min-height: 250px;
  padding: 16px 14px;
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

/* The mock page: "before" is the base look, each fix is a modifier class. */
.mock {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px;
  text-align: left;
}
.mock.fix-type { gap: 22px 12px; }

.zone { position: relative; display: flex; align-items: center; gap: 6px; transition: opacity 0.25s; }
.mock.focus .zone { opacity: 0.16; }
.mock.focus .zone.hl { opacity: 1; }

.z-title, .z-bar { grid-column: 1 / -1; }
.z-bar { flex-wrap: wrap; }
.z-item-act { justify-content: flex-end; }

.m-title, .m-count, .m-name, .m-meta, .z-bar, .z-item-main, .z-item-act {
  padding: 4px 6px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-text-1);
  border-radius: 4px;
}
.z-bar { padding: 4px; gap: 4px; }
.z-item-main { border-right: 0; border-radius: 4px 0 0 4px; }
.z-item-act { border-radius: 0 4px 4px 0; }

.m-title, .m-count, .m-name, .m-meta { font-size: 13px; font-weight: 700; white-space: nowrap; }
.m-filters, .m-actions, .btn-wrap { display: inline-flex; align-items: center; gap: 4px; }

.m-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--vp-c-bg);
  background: var(--vp-c-text-1);
  border-radius: 4px;
}

.badge {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: var(--vp-c-danger-1);
  border-radius: 50%;
  transition: opacity 0.2s;
}

.menu-wrap { position: relative; }
.m-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  min-width: 104px;
  padding: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
}
.m-menu-item { padding: 5px 10px; font-size: 12px; font-weight: 500; white-space: nowrap; border-radius: 5px; }

/* Fix 1: pull the type apart into layers. */
.fix-type .z-title { flex-direction: column; align-items: flex-start; gap: 2px; }
.fix-type .m-title { font-size: 22px; line-height: 1.15; }
.fix-type .m-count { font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); }
.fix-type .z-bar { justify-content: space-between; }
.fix-type .z-item-main { flex-direction: column; align-items: flex-start; gap: 2px; }
.fix-type .m-name { font-size: 15px; }
.fix-type .m-meta { font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); }

/* Fix 2: group with whitespace instead of boxes. */
.fix-borders .m-title, .fix-borders .m-count, .fix-borders .m-name, .fix-borders .m-meta,
.fix-borders .z-bar, .fix-borders .z-item-main, .fix-borders .z-item-act {
  padding: 0;
  border: 0;
  border-radius: 0;
}

/* Fix 3: one filled button per scope. */
.fix-buttons .m-btn { font-weight: 500; color: var(--vp-c-text-1); background: transparent; }
.fix-buttons .m-btn.create { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.fix-buttons .m-btn.export { border: 1px solid var(--vp-c-divider); }
.fix-buttons .m-actions { gap: 8px; }
.fix-buttons .m-filters { border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.fix-buttons .m-btn.filter { border-radius: 0; }
.fix-buttons .m-btn.filter.on { font-weight: 600; background: var(--vp-c-bg-soft); }
.fix-buttons .m-btn.more { padding: 2px 8px; border: 1px solid var(--vp-c-divider); border-radius: 50%; }
.fix-buttons .m-menu-item.danger { color: var(--vp-c-danger-1); }

.legend { margin-top: 14px; font-size: 13px; line-height: 1.7; }

.issues { margin-top: 16px; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 10px; }
.i-head, .i-row {
  display: grid;
  grid-template-columns: 96px 1.25fr 1.45fr 1fr;
  gap: 12px;
  padding: 9px 14px;
  font-size: 12px;
  line-height: 1.6;
}
.i-head { font-weight: 700; background: var(--vp-c-bg); }
.i-row { border-top: 1px solid var(--vp-c-divider); transition: background 0.2s; }
.i-row.hl { background: var(--vp-c-brand-soft); }
.i-n { font-weight: 700; color: var(--vp-c-brand-1); }
.i-foot { padding: 7px 14px; font-size: 11px; color: var(--vp-c-text-3); border-top: 1px solid var(--vp-c-divider); }

@media (max-width: 720px) {
  .usc { padding: 14px 12px 16px; }
  .i-head { display: none; }
  .i-head, .i-row { grid-template-columns: 24px 1fr; gap: 4px 8px; }
  .i-row > span:not(.i-n) { grid-column: 2; }
}
</style>
