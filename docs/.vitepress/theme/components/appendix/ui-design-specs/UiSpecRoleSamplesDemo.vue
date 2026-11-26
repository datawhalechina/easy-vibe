<template>
  <div class="usr">
    <div class="usr-head">
      <div class="usr-title">{{ t('roleKinds.title') }}</div>
      <div class="usr-sub">{{ t('roleKinds.subtitle') }}</div>
    </div>
    <div class="usr-row">
      <div
        v-for="item in items"
        :key="item.kind"
        class="card"
      >
        <span
          class="b"
          :class="item.kind"
          :aria-label="item.kind === 'icon' ? item.sample : null"
          :role="item.kind === 'icon' ? 'img' : null"
        >
          <template v-if="item.kind === 'icon'">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </template>
          <template v-else>{{ item.sample }}</template>
        </span>
        <div class="name">{{ item.name }}</div>
        <div class="use">{{ item.use }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const items = computed(() => messages.value.roleKinds.items)
</script>

<style scoped>
.usr {
  margin: 20px 0;
  padding: 16px 20px 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usr-head { text-align: center; margin-bottom: 12px; }
.usr-title { font-size: 16px; font-weight: 700; }
.usr-sub { margin: 4px auto 0; max-width: 600px; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); }

.usr-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
  gap: 10px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 8px;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

/* Same size and radius for every role: only fill and color differ. */
.b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  min-width: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 6px;
}
.b.secondary { font-weight: 500; color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.b.text { padding: 0 6px; font-weight: 500; color: var(--vp-c-brand-1); }
.b.danger { font-weight: 500; color: var(--vp-c-danger-1); border-color: var(--vp-c-danger-1); }
.b.icon { padding: 0; color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.b:not(.secondary):not(.text):not(.danger):not(.icon) { color: var(--vp-c-white); background: var(--vp-c-brand-1); }

.name { font-size: 12px; font-weight: 600; }
.use { font-size: 11px; line-height: 1.5; color: var(--vp-c-text-2); }

@media (max-width: 720px) {
  .usr { padding: 14px 12px 16px; }
}
</style>
