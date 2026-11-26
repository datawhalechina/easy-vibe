<template>
  <div class="usm">
    <div class="usm-head">
      <div class="usm-title">{{ t('specMap.title') }}</div>
      <div class="usm-sub">{{ t('specMap.subtitle') }}</div>
    </div>

    <div class="usm-tools">
      <div
        class="seg"
        role="group"
        :aria-label="t('specMap.all')"
      >
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="seg-btn"
          :class="{ on: filter === f.id }"
          :aria-pressed="filter === f.id"
          @click="filter = f.id"
        >
          {{ f.label }}
        </button>
      </div>
      <span class="checked">{{ t('specMap.checkedAt') }}</span>
    </div>

    <div class="legend">
      <span class="lg"><span class="sw page" />{{ t('specMap.relPageShort') }}</span>
      <span class="lg"><span class="sw button" />{{ t('specMap.relButtonShort') }}</span>
      <span class="lg"><span class="sw both" />{{ t('specMap.relBoth') }}</span>
    </div>

    <div class="map">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="cat"
        :class="{ mute: filter !== 'all' && !catHasMatch(cat) }"
      >
        <div class="cat-head">
          <span class="cat-name">{{ cat.name }}</span>
          <span
            v-if="cat.en !== cat.name"
            class="cat-en"
          >
            {{ cat.en }}
          </span>
          <span class="cat-count">{{ cat.count }} {{ t('specMap.topicsUnit') }}</span>
        </div>
        <div class="chips">
          <button
            v-for="topic in cat.topics"
            :key="topic.name"
            type="button"
            class="chip"
            :class="['rel-' + (topic.rel || 'none'), { sel: selected === topic, off: !on(topic) }]"
            @click="selected = topic"
            @mouseenter="selected = topic"
            @focus="selected = topic"
          >
            {{ topic.name }}
          </button>
          <span
            v-if="moreCount(cat) > 0"
            class="chip more"
            :class="{ off: !catHasMatch(cat) }"
          >
            {{ t('specMap.moreTopics', { n: moreCount(cat) }) }}
          </span>
        </div>
      </div>
    </div>

    <div
      class="detail"
      aria-live="polite"
    >
      <template v-if="selected">
        <div class="d-row">
          <span class="d-k">{{ t('specMap.questionLabel') }}</span>
          <span class="d-v">{{ selected.q }}</span>
        </div>
        <div class="d-row">
          <span class="d-k" />
          <span class="d-v d-rel">
            <template v-if="!selected.rel">{{ t('specMap.relNone') }}</template>
            <template v-else>
              <span
                v-if="selected.rel !== 'button'"
                class="badge page"
              >
                {{ t('specMap.relPageShort') }}
              </span>
              <span
                v-if="selected.rel !== 'page'"
                class="badge button"
              >
                {{ t('specMap.relButtonShort') }}
              </span>
            </template>
          </span>
        </div>
      </template>
      <div
        v-else
        class="d-empty"
      >
        {{ t('specMap.pick') }}
      </div>
    </div>

    <div class="note">{{ t('specMap.paraphraseNote') }}</div>
    <div class="takeaway">{{ t('specMap.takeaway') }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const specMap = computed(() => messages.value.specMap)
const categories = computed(() => specMap.value.categories)
const filters = computed(() => [
  { id: 'all', label: t('specMap.all') },
  { id: 'page', label: t('specMap.page') },
  { id: 'button', label: t('specMap.button') }
])

const filter = ref('all')
const selected = ref(null)

// A topic counts for a filter if it is about that thing, or about both.
function on(topic) {
  return filter.value === 'all' || topic.rel === filter.value || topic.rel === 'both'
}

function catHasMatch(cat) {
  return cat.topics.some((topic) => on(topic))
}

function moreCount(cat) {
  return Math.max(0, cat.count - cat.topics.length)
}
</script>

<style scoped>
.usm {
  --rel-page: oklch(55% 0.14 250);
  --rel-button: oklch(56% 0.14 155);
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usm-head { text-align: center; margin-bottom: 14px; }
.usm-title { font-size: 17px; font-weight: 700; }
.usm-sub { margin-top: 4px; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }

.usm-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-bottom: 10px;
}
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
.checked { font-size: 11px; color: var(--vp-c-text-3); }

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-bottom: 10px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}
.lg { display: inline-flex;
  align-items: center;
  gap: 6px; }
.sw { display: inline-block; width: 12px; height: 12px; border: 2px solid var(--vp-c-divider); border-radius: 4px; }
.sw.page { border-color: var(--rel-page); }
.sw.button { border-color: var(--rel-button); }
.sw.both { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }

.map {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 10px;
}
.cat {
  padding: 10px 12px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: opacity 0.2s;
}
.cat.mute { opacity: 0.45; }
.cat-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px 8px;
  margin-bottom: 8px;
}
.cat-name { font-size: 13px; font-weight: 700; }
.cat-en { font-size: 11px; color: var(--vp-c-text-3); }
.cat-count {
  margin-left: auto;
  padding: 1px 8px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
}
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  padding: 3px 10px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: opacity 0.2s, box-shadow 0.2s, background 0.2s;
}
.chip.rel-page { border-color: var(--rel-page); }
.chip.rel-button { border-color: var(--rel-button); }
.chip.rel-both {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.chip:hover,
.chip.sel { box-shadow: 0 0 0 2px var(--vp-c-brand-1); }
.chip.more { color: var(--vp-c-text-3); border-style: dashed; cursor: default; box-shadow: none; }
.chip.off { opacity: 0.3; }

.detail {
  min-height: 78px;
  margin-top: 12px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.65;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
}
.d-row { display: flex; gap: 8px; margin-bottom: 4px; }
.d-k { flex-shrink: 0; color: var(--vp-c-text-3); }
.d-empty { color: var(--vp-c-text-3); }
.d-rel { display: flex; flex-wrap: wrap; gap: 6px; }
.badge {
  padding: 1px 8px;
  font-size: 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
}
.badge.page { border-color: var(--rel-page); }
.badge.button { border-color: var(--rel-button); }

.note { margin-top: 8px; font-size: 11px; color: var(--vp-c-text-3); }
.takeaway {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 720px) {
  .usm { padding: 14px 12px 16px; }
}
</style>
