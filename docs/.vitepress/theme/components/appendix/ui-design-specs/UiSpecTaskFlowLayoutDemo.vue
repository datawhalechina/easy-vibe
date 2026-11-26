<template>
  <div class="ustf">
    <div class="ustf-head">
      <div class="ustf-title">{{ t('taskflow.title') }}</div>
      <div class="ustf-sub">{{ t('taskflow.subtitle') }}</div>
    </div>

    <div class="ustf-body">
      <div class="side">
        <div class="task">{{ t('taskflow.taskLine') }}</div>
        <button
          v-for="(step, i) in steps"
          :key="step.name"
          type="button"
          class="step"
          :class="{ hl: active === i }"
          :aria-pressed="pinned === i"
          @click="toggle(i)"
          @mouseenter="active = i"
          @mouseleave="active = pinned"
          @focus="active = i"
          @blur="active = pinned"
        >
          <span class="n">{{ i + 1 }}</span>
          <span class="s-body">
            <span class="s-name">{{ step.name }}</span>
            <span class="s-detail">{{ step.detail }}</span>
          </span>
        </button>
      </div>

      <div class="pages">
        <!-- Piled up: every module is an equally heavy card, in no particular order. -->
        <div class="page">
          <div class="p-title">{{ m.title }}</div>
          <div class="grid">
            <div class="card">
              <div class="c-name">{{ m.announce }}</div>
              <div class="c-text">{{ m.announceText }}</div>
            </div>
            <div class="card">
              <div class="c-name">{{ m.recommend }}</div>
              <div class="c-text">{{ m.recommendText }}</div>
            </div>
            <div class="card">
              <div class="c-name">{{ m.settings }}</div>
            </div>
            <div class="card">
              <div class="c-name">{{ m.filter }}</div>
            </div>
            <div class="card wide">
              <div class="c-name">{{ m.list }}</div>
              <div
                v-for="item in m.items"
                :key="item.name"
                class="row"
              >
                <span class="r-name">{{ item.name }}</span>
                <span class="r-meta">{{ item.meta }}</span>
                <span class="r-btn">{{ m.open }}</span>
              </div>
            </div>
          </div>
          <div class="p-tag">{{ t('taskflow.stacked') }}</div>
        </div>

        <!-- Around the task: each module sits where the user needs it in the task. -->
        <div
          class="page"
          :class="{ focus: active !== null }"
        >
          <div
            class="zone z0"
            :class="zc(0)"
          >
            <div class="p-title">{{ m.title }}</div>
            <div class="p-goal">{{ m.goal }}</div>
          </div>
          <div
            class="zone z1"
            :class="zc(1)"
          >
            <span class="chip">{{ m.filter }}</span>
            <span class="chip">{{ m.list }}</span>
          </div>
          <div
            class="zone z2"
            :class="zc(2)"
          >
            <div
              v-for="(item, i) in m.items"
              :key="item.name"
              class="row"
            >
              <span class="r-name">{{ item.name }}</span>
              <span class="r-meta">{{ item.meta }}</span>
              <span
                class="zone z3"
                :class="zc(3, i)"
              >
                <span class="r-btn primary">{{ m.open }}</span>
              </span>
            </div>
          </div>
          <div class="foot">{{ m.announce }} · {{ m.recommend }} · {{ m.settings }}</div>
          <div class="p-tag task">{{ t('taskflow.task') }}</div>
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
const taskflow = computed(() => messages.value.taskflow)
const steps = computed(() => taskflow.value.steps)
const m = computed(() => taskflow.value.modules)

const active = ref(null)
const pinned = ref(null)

function toggle(i) {
  pinned.value = pinned.value === i ? null : i
  active.value = pinned.value
}

// `zoneIndex` is the step number whose region this is; steps and zones are numbered alike.
function zc(zoneIndex, rowIndex) {
  if (active.value !== zoneIndex) return { hl: false }
  // Step 4 highlights the action on the first row only.
  return { hl: zoneIndex !== 3 || rowIndex === 0 }
}
</script>

<style scoped>
.ustf {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.ustf-head { text-align: center; margin-bottom: 14px; }
.ustf-title { font-size: 17px; font-weight: 700; }
.ustf-sub { margin: 4px auto 0; max-width: 640px; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }

.ustf-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 14px;
  align-items: start;
}
/* The copy talks about the pages on the left and the steps on the right. */
.side {
  order: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.task {
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
}
.step {
  display: flex;
  gap: 8px;
  padding: 7px 10px;
  text-align: left;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.step:hover,
.step.hl { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.n {
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
.step.hl .n { background: var(--vp-c-brand-1); }
.s-body { display: flex; flex-direction: column; }
.s-name { font-size: 13px; font-weight: 600; }
.s-detail { font-size: 11px; line-height: 1.5; color: var(--vp-c-text-2); }

.pages {
  order: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}
.page {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.p-title { font-size: 13px; font-weight: 700; }
.p-goal { margin-top: 2px; font-size: 12px; color: var(--vp-c-text-2); }
.p-tag {
  margin-top: auto;
  padding-top: 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  border-top: 1px dashed var(--vp-c-divider);
}
.p-tag.task { color: var(--vp-c-brand-1); }

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.card {
  padding: 8px;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 6px;
}
.card.wide { grid-column: 1 / -1; }
.c-name { font-size: 12px; font-weight: 700; }
.c-text { margin-top: 2px; font-size: 11px; line-height: 1.5; color: var(--vp-c-text-2); }

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  padding: 6px 0;
  border-top: 1px solid var(--vp-c-divider);
}
.r-name { font-size: 12px; font-weight: 600; }
.r-meta { font-size: 11px; color: var(--vp-c-text-2); }
.r-btn {
  margin-left: auto;
  padding: 2px 9px;
  font-size: 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
}
.r-btn.primary { font-weight: 600; color: var(--vp-c-white); background: var(--vp-c-brand-1); border-color: transparent; }

.zone { position: relative; padding: 4px; margin: 0 -4px; border-radius: 6px; transition: opacity 0.2s, box-shadow 0.2s; }
.zone.hl { box-shadow: 0 0 0 1.5px var(--vp-c-brand-1); }
.page.focus .zone:not(.hl):not(:has(.hl)) { opacity: 0.2; }
.chip {
  padding: 2px 9px;
  font-size: 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
}
.foot { font-size: 11px; color: var(--vp-c-text-3); }

@media (max-width: 720px) {
  .ustf { padding: 14px 12px 16px; }
  .ustf-body { grid-template-columns: minmax(0, 1fr); }
  .side { order: 0; flex-direction: row; flex-wrap: wrap; }
  .pages { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .task,
  .step { flex: 1 1 46%; }
}
</style>
