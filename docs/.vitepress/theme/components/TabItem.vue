<script setup>
import { inject, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const tabsState = inject('tabsState', null)
// The tab label is static page content; register it once when the component is created.
// eslint-disable-next-line vue/no-setup-props-destructure
const index = ref(tabsState?.registerTab(props.label) ?? 0)
</script>

<template>
  <section class="doc-tab-item">
    <div
      v-show="!tabsState || tabsState.activeTab.value === index"
      class="doc-tab-content"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
.doc-tab-content {
  padding: 14px;
}
</style>
