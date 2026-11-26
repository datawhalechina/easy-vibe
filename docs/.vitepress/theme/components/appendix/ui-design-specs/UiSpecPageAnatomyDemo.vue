<template>
  <div class="usa">
    <div class="usa-head">
      <div class="usa-title">{{ t('anatomy.title') }}</div>
      <div class="usa-sub">{{ t('anatomy.subtitle') }}</div>
    </div>

    <div class="usa-tools">
      <label class="tool">
        <input
          v-model="labels"
          type="checkbox"
        />
        {{ t('anatomy.showLabels') }}
      </label>
      <label class="tool">
        <input
          v-model="guides"
          type="checkbox"
        />
        {{ t('anatomy.showGuides') }}
      </label>
      <span
        v-if="guides"
        class="tool-note"
      >
        {{ t('anatomy.guidesNote') }}
      </span>
    </div>

    <div class="usa-body">
      <div class="side">
        <button
          v-for="(layer, i) in layers"
          :key="layer.id"
          type="button"
          class="layer"
          :class="[layer.id, { hl: active === layer.id }]"
          :aria-pressed="pinned === layer.id"
          @click="toggle(layer.id)"
          @mouseenter="active = layer.id"
          @mouseleave="active = pinned"
          @focus="active = layer.id"
          @blur="active = pinned"
        >
          <span class="n">{{ i + 1 }}</span>
          <span class="name">{{ layer.name }}</span>
        </button>
        <div
          v-if="current"
          class="detail"
        >
          <div class="d-row">
            <span class="d-k">{{ t('anatomy.taskLabel') }}</span>
            <span class="d-v">{{ current.task }}</span>
          </div>
          <div class="d-row">
            <span class="d-k">{{ t('anatomy.meansLabel') }}</span>
            <span class="d-v">{{ current.means }}</span>
          </div>
        </div>
      </div>

      <div
        class="paper"
        :class="{ focus: !!active, 'show-labels': labels, 'show-guides': guides }"
      >
        <span class="align-line" />

        <div
          class="region locate"
          :class="lc('locate')"
        >
          <span class="lnum">1</span>
          <span class="p-back">‹ {{ mock.back }}</span>
          <span class="p-nav">{{ mock.navTitle }}</span>
        </div>

        <span
          class="gap block"
          style="height: 24px"
          data-g="24"
        />

        <div
          class="region primary"
          :class="lc('primary')"
        >
          <span class="lnum">2</span>
          <div class="p-title">{{ mock.title }}</div>
          <span
            class="gap inner"
            data-g="4"
          />
          <div class="p-body">{{ mock.body }}</div>
        </div>

        <span
          class="gap block"
          style="height: 20px"
          data-g="20"
        />

        <div
          class="region support"
          :class="lc('support')"
        >
          <span class="lnum">3</span>
          <div class="p-meta">{{ mock.meta }}</div>
          <span
            class="gap inner"
            data-g="6"
          />
          <div class="p-link">{{ mock.link }} ›</div>
        </div>

        <span
          class="gap block"
          style="height: 28px"
          data-g="28"
        />

        <div
          class="region action"
          :class="lc('action')"
        >
          <span class="lnum">4</span>
          <span class="p-btn fill">{{ mock.primary }}</span>
          <span class="p-btn text">{{ mock.secondary }}</span>
        </div>
      </div>
    </div>

    <div class="type">
      <div class="type-title">{{ t('anatomy.typeTitle') }}</div>
      <div
        v-for="row in typeScale"
        :key="row.name"
        class="type-row"
      >
        <span
          class="type-sample"
          :class="{ muted: row.px === 12 }"
          :style="{ fontSize: row.px + 'px', fontWeight: row.weight }"
        >
          {{ row.name }}
        </span>
        <span class="type-spec">{{ row.px }}px / {{ row.weight }}</span>
        <span class="type-note">{{ row.note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const anatomy = computed(() => messages.value.anatomy)
const layers = computed(() => anatomy.value.layers)
const typeScale = computed(() => anatomy.value.typeScale)
const mock = computed(() => anatomy.value.mock)

const active = ref(null)
const pinned = ref(null)
const labels = ref(true)
const guides = ref(false)

function toggle(id) {
  pinned.value = pinned.value === id ? null : id
  active.value = pinned.value
}

const current = computed(() => layers.value.find((layer) => layer.id === active.value))

function lc(id) {
  return { hl: active.value === id }
}
</script>

<style scoped>
.usa {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usa-head { text-align: center; margin-bottom: 12px; }
.usa-title { font-size: 17px; font-weight: 700; }
.usa-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.usa-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  margin-bottom: 14px;
  font-size: 12px;
}
.tool { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; }
.tool input { accent-color: var(--vp-c-brand-1); }
.tool-note { flex-basis: 100%; font-size: 11px; color: var(--vp-c-text-2); }

/* Each layer owns one color, shared by the list item and its region. */
.locate { --lc: oklch(55% 0.14 250); }
.primary { --lc: var(--vp-c-brand-1); }
.support { --lc: oklch(66% 0.14 75); }
.action { --lc: oklch(56% 0.14 155); }

.usa-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.side { display: flex; flex-direction: column; gap: 6px; }
.layer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  font-size: 13px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--lc);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}
.layer.hl { border-color: var(--lc); background: color-mix(in srgb, var(--lc) 10%, var(--vp-c-bg)); }
.layer .n {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--lc);
  border-radius: 50%;
}
.layer .name { font-weight: 600; }

.detail {
  min-height: 96px;
  margin-top: 4px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.6;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}
.d-row { display: flex; gap: 8px; margin-bottom: 6px; }
.d-k { flex-shrink: 0; color: var(--vp-c-text-3); }

.paper {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 24px 24px 24px 32px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.align-line {
  display: none;
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 24px;
  border-left: 1px dashed var(--vp-c-text-3);
  opacity: 0.6;
}
.show-guides .align-line { display: block; }

.region {
  position: relative;
  padding: 3px 8px 3px 8px;
  margin-left: -8px;
  border-radius: 8px;
  transition: opacity 0.25s, background 0.25s, box-shadow 0.25s;
}
.paper.focus .region { opacity: 0.16; }
.paper.focus .region.hl {
  opacity: 1;
  background: color-mix(in srgb, var(--lc) 10%, transparent);
  box-shadow: 0 0 0 1.5px var(--lc);
}
.paper.show-labels .region {
  background: color-mix(in srgb, var(--lc) 6%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--lc) 50%, transparent);
}

.lnum {
  position: absolute;
  top: -9px;
  left: -9px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: var(--lc);
  border-radius: 50%;
}

/* Spacers are the real spacing, so the guides measure the page as laid out. */
.gap { position: relative; flex-shrink: 0; }
.gap.inner { height: 4px; }
.show-guides .gap::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: var(--vp-c-text-3);
  transform: translateX(-50%);
}
.show-guides .gap::after {
  content: attr(data-g);
  position: absolute;
  top: 50%;
  left: calc(50% + 8px);
  padding: 0 4px;
  font-size: 10px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  transform: translateY(-50%);
}
.show-guides .gap.inner::after { display: none; }

.region.locate { display: flex; align-items: center; }
.p-back { margin-right: 14px; font-size: 13px; color: var(--vp-c-text-2); }
.p-nav { font-size: 14px; font-weight: 500; }

.p-title { font-size: 22px; font-weight: 700; line-height: 1.25; }
.p-body { font-size: 14px; line-height: 1.7; }

.p-meta { font-size: 12px; color: var(--vp-c-text-2); }
.p-link { font-size: 12px; font-weight: 500; color: var(--vp-c-brand-1); }

.region.action { display: flex; gap: 10px; }
.p-btn { padding: 6px 14px; font-size: 13px; border-radius: 6px; }
.p-btn.fill { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.p-btn.text { font-weight: 500; color: var(--vp-c-text-2); }

.type {
  margin-top: 16px;
  padding: 12px 16px 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.type-title { margin-bottom: 6px; font-weight: 600; }
.type-row {
  display: grid;
  grid-template-columns: 150px 110px minmax(0, 1fr);
  align-items: baseline;
  gap: 10px;
  padding: 7px 0;
  border-top: 1px dashed var(--vp-c-divider);
}
.type-sample { line-height: 1.3; }
.type-sample.muted { color: var(--vp-c-text-2); }
.type-spec {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.type-note { font-size: 12px; color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .usa { padding: 14px 12px 16px; }
  .usa-body { grid-template-columns: minmax(0, 1fr); }
  .side { flex-direction: row; flex-wrap: wrap; }
  .layer { flex: 1 1 44%; }
  .detail { flex-basis: 100%; min-height: 0; }
  .paper { padding: 20px 16px 20px 24px; }
  .type-row { grid-template-columns: 120px minmax(0, 1fr); }
  .type-note { grid-column: 2; }
}
</style>
