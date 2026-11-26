<template>
  <div class="usl">
    <div class="usl-head">
      <div class="usl-title">{{ t('lookalike.title') }}</div>
      <div class="usl-sub">{{ t('lookalike.subtitle') }}</div>
    </div>

    <div class="pair">
      <!-- Looks the same, but this one holds a value -->
      <div
        class="case"
        :class="{ open: openMenu === 'popup' }"
      >
        <div class="case-head">
          <b>Pop-up</b>
          <span class="tag">{{ t('lookalike.popupTag') }}</span>
        </div>
        <div class="dd-wrap">
          <button
            type="button"
            class="dd"
            :aria-expanded="openMenu === 'popup'"
            @click.stop="toggle('popup')"
          >
            {{ popupLabel }}
            <span
              class="chev"
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          <div
            v-if="openMenu === 'popup'"
            class="menu"
          >
            <button
              v-for="opt in popupOptions"
              :key="opt"
              type="button"
              class="mi"
              :class="{ sel: opt === popupValue }"
              @click.stop="pickPopup(opt)"
            >
              <span class="mi-check">{{ opt === popupValue ? '✓' : '' }}</span>
              {{ opt }}
            </button>
          </div>
        </div>
        <div class="case-note">{{ t('lookalike.popupValue', { value: popupValue }) }}</div>
      </div>

      <!-- Looks the same, but this one runs commands -->
      <div
        class="case"
        :class="{ open: openMenu === 'pull' }"
      >
        <div class="case-head">
          <b>Pull-down</b>
          <span class="tag">{{ t('lookalike.pullTag') }}</span>
        </div>
        <div class="dd-wrap">
          <button
            type="button"
            class="dd"
            :aria-expanded="openMenu === 'pull'"
            @click.stop="toggle('pull')"
          >
            {{ pullLabel }}
            <span
              class="chev"
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          <div
            v-if="openMenu === 'pull'"
            class="menu"
          >
            <button
              v-for="opt in pullOptions"
              :key="opt"
              type="button"
              class="mi"
              :class="{ danger: opt === dangerOption }"
              @click.stop="runPull(opt)"
            >
              <span class="mi-check" />
              {{ opt }}
            </button>
          </div>
        </div>
        <div
          class="case-note"
          aria-live="polite"
        >
          {{ pullResult || t('lookalike.pullIdle') }}
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="row head">
        <span
          v-for="(h, i) in tableHead"
          :key="i"
        >
          {{ h }}
        </span>
      </div>
      <div
        v-for="(row, i) in rows"
        :key="i"
        class="row"
      >
        <span
          v-for="(cell, j) in row"
          :key="j"
          :class="{ k: j === 0 }"
        >
          {{ cell }}
        </span>
      </div>
    </div>

    <div class="conclusion">{{ t('lookalike.conclusion') }}</div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const lookalike = computed(() => messages.value.lookalike)
const popupOptions = computed(() => lookalike.value.popupOptions)
const pullOptions = computed(() => lookalike.value.pullOptions)
const tableHead = computed(() => lookalike.value.tableHead)
const rows = computed(() => lookalike.value.rows)

const openMenu = ref(null)
// A pop-up button remembers a value; a pull-down button only fires commands.
const popupValue = ref(popupOptions.value[0])
const pullResult = ref('')

const popupLabel = computed(() => t('lookalike.popupPrefix') + popupValue.value)
const pullLabel = computed(() => t('lookalike.pullInitial'))
const dangerOption = computed(() => pullOptions.value[pullOptions.value.length - 1])

function toggle(menu) {
  openMenu.value = openMenu.value === menu ? null : menu
}

function pickPopup(opt) {
  popupValue.value = opt
  openMenu.value = null
}

function runPull(opt) {
  pullResult.value = t('lookalike.pullDone', { name: opt })
  openMenu.value = null
}

function onDocumentClick(event) {
  if (!event.target.closest || !event.target.closest('.dd-wrap')) openMenu.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape') openMenu.value = null
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.usl {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usl-head { text-align: center; margin-bottom: 14px; }
.usl-title { font-size: 17px; font-weight: 700; }
.usl-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.pair {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}
.case {
  min-height: 150px;
  padding: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: border-color 0.2s;
}
.case.open { border-color: var(--vp-c-brand-1); }
.case-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 13px; }
.tag {
  padding: 1px 8px;
  font-size: 11px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
}

/* Both controls share this look on purpose: the difference is behavior. */
.dd-wrap { position: relative; display: inline-block; }
.dd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 12px 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
}
.dd:hover { border-color: var(--vp-c-brand-1); }
.chev { font-size: 10px; color: var(--vp-c-text-2); }

.menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 5;
  min-width: 100%;
  padding: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
}
.mi {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px 6px 6px;
  font-size: 13px;
  text-align: left;
  color: var(--vp-c-text-1);
  background: transparent;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
}
.mi:hover { background: var(--vp-c-bg-soft); }
.mi.sel { font-weight: 600; }
.mi.danger { color: var(--vp-c-danger-1); }
.mi-check { display: inline-block; width: 14px; font-size: 12px; font-weight: 700; color: var(--vp-c-brand-1); }

.case-note { margin-top: 14px; font-size: 12px; color: var(--vp-c-text-2); }

.grid {
  margin-top: 14px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.row {
  display: grid;
  grid-template-columns: 96px 1fr 1fr;
  gap: 12px;
  padding: 8px 12px;
  line-height: 1.5;
  border-top: 1px solid var(--vp-c-divider);
}
.row.head { font-weight: 700; background: var(--vp-c-bg-soft); border-top: 0; }
.row .k { font-weight: 600; color: var(--vp-c-text-1); }
.row > span:not(.k) { color: var(--vp-c-text-2); }

.conclusion {
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .usl { padding: 14px 12px 16px; }
  .row.head { display: none; }
  .row { grid-template-columns: minmax(0, 1fr); gap: 2px; padding: 10px 12px; }
}
</style>
