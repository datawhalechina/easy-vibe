<template>
  <div class="lc-root">
    <h4 class="lc-title">开源许可证对比工具</h4>

    <!-- Filter -->
    <div class="lc-filter">
      <span class="lc-filter-label">我的需求：</span>
      <button
        v-for="f in filters"
        :key="f.id"
        :class="['lc-tag', { 'lc-tag--on': activeFilters.includes(f.id) }]"
        @click="toggle(f.id)"
      >{{ f.label }}</button>
      <button v-if="activeFilters.length" class="lc-tag lc-tag--clear" @click="activeFilters = []">清除筛选</button>
    </div>

    <!-- Recommendation -->
    <div v-if="recommended" class="lc-recommend">
      推荐许可证：<strong>{{ recommended.name }}</strong> — {{ recommended.summary }}
    </div>

    <!-- Table -->
    <div class="lc-table-wrap">
      <table class="lc-table">
        <thead>
          <tr>
            <th>许可证</th>
            <th v-for="p in permissions" :key="p.id">{{ p.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="l in licenses"
            :key="l.id"
            :class="{ 'lc-row--hl': recommended && recommended.id === l.id }"
          >
            <td class="lc-name-cell">
              <strong>{{ l.name }}</strong>
              <span class="lc-desc">{{ l.summary }}</span>
            </td>
            <td v-for="p in permissions" :key="p.id" class="lc-cell">
              <span v-if="l.perms[p.id] === true" class="lc-yes">&#10003;</span>
              <span v-else-if="l.perms[p.id] === false" class="lc-no">&#10007;</span>
              <span v-else class="lc-cond">&#9888;</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div class="lc-legend">
      <span><span class="lc-yes">&#10003;</span> 允许</span>
      <span><span class="lc-no">&#10007;</span> 不允许/限制</span>
      <span><span class="lc-cond">&#9888;</span> 有条件</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const permissions = [
  { id: 'commercial', label: '商用' },
  { id: 'modify', label: '修改' },
  { id: 'distribute', label: '分发' },
  { id: 'patent', label: '专利授权' },
  { id: 'private', label: '私用' },
  { id: 'copyleft', label: '需开源衍生' },
  { id: 'liability', label: '免责' }
]

const licenses = [
  {
    id: 'mit', name: 'MIT', summary: '最宽松，几乎无限制',
    perms: { commercial: true, modify: true, distribute: true, patent: false, private: true, copyleft: false, liability: true },
    tags: ['commercial', 'simple', 'private']
  },
  {
    id: 'apache2', name: 'Apache 2.0', summary: '宽松 + 专利保护',
    perms: { commercial: true, modify: true, distribute: true, patent: true, private: true, copyleft: false, liability: true },
    tags: ['commercial', 'patent', 'private']
  },
  {
    id: 'gpl3', name: 'GPL 3.0', summary: '强 Copyleft，衍生必须开源',
    perms: { commercial: true, modify: true, distribute: true, patent: true, private: true, copyleft: true, liability: true },
    tags: ['copyleft', 'patent']
  },
  {
    id: 'bsd2', name: 'BSD 2-Clause', summary: '类似 MIT，极简宽松',
    perms: { commercial: true, modify: true, distribute: true, patent: false, private: true, copyleft: false, liability: true },
    tags: ['commercial', 'simple', 'private']
  },
  {
    id: 'mpl2', name: 'MPL 2.0', summary: '文件级 Copyleft，折中方案',
    perms: { commercial: true, modify: true, distribute: true, patent: true, private: true, copyleft: 'cond', liability: true },
    tags: ['commercial', 'patent', 'copyleft']
  }
]

const filters = [
  { id: 'commercial', label: '允许商用' },
  { id: 'patent', label: '需要专利保护' },
  { id: 'simple', label: '尽量简单' },
  { id: 'copyleft', label: '要求衍生开源' },
  { id: 'private', label: '允许闭源使用' }
]

const activeFilters = ref([])

function toggle(id) {
  const idx = activeFilters.value.indexOf(id)
  if (idx >= 0) activeFilters.value.splice(idx, 1)
  else activeFilters.value.push(id)
}

const recommended = computed(() => {
  if (!activeFilters.value.length) return null
  let best = null
  let bestScore = -1
  for (const l of licenses) {
    const score = activeFilters.value.filter(f => l.tags.includes(f)).length
    if (score > bestScore) { bestScore = score; best = l }
  }
  return bestScore > 0 ? best : null
})
</script>

<style scoped>
.lc-root {
  margin: 1.5em 0;
  padding: 1.2em;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.lc-title {
  margin: 0 0 1em;
  font-size: 1.05em;
  font-weight: 600;
  text-align: center;
}

/* Filter */
.lc-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 1em;
}
.lc-filter-label {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
.lc-tag {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.82em;
  cursor: pointer;
  transition: all 0.2s;
}
.lc-tag:hover { border-color: var(--vp-c-brand-1); }
.lc-tag--on {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.lc-tag--clear {
  color: var(--vp-c-text-3);
  font-size: 0.78em;
}

/* Recommend */
.lc-recommend {
  padding: 0.6em 1em;
  margin-bottom: 1em;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  font-size: 0.9em;
  color: var(--vp-c-brand-1);
}

/* Table */
.lc-table-wrap {
  overflow-x: auto;
  margin-bottom: 0.8em;
}
.lc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88em;
}
.lc-table th,
.lc-table td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.lc-table th {
  background: var(--vp-c-bg);
  font-weight: 600;
  font-size: 0.85em;
  white-space: nowrap;
}
.lc-name-cell {
  text-align: left !important;
  min-width: 130px;
}
.lc-desc {
  display: block;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
  font-weight: 400;
}
.lc-row--hl {
  background: var(--vp-c-brand-soft);
}
.lc-cell { font-size: 1.1em; }
.lc-yes { color: #10b981; font-weight: 700; }
.lc-no { color: #ef4444; font-weight: 700; }
.lc-cond { color: #f59e0b; }

/* Legend */
.lc-legend {
  display: flex;
  gap: 1.5em;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}
</style>
