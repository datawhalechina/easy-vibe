<template>
  <div class="gcc-root">
    <p class="gcc-desc">把这张表存起来，遇到忘了的命令随时查：</p>
    <div class="gcc-chart-wrap">
      <div class="chart-header">
        <span class="y-axis-label">使用频率</span>
        <div class="chart-area">
          <svg class="chart-svg" :viewBox="`0 0 ${chartWidth} ${height}`" preserveAspectRatio="none" :width="chartWidth" :height="height">
            <!-- Grid lines (horizontal) -->
            <line v-for="y in gridY" :key="y" :x1="padding.left" :y1="y" :x2="chartWidth - padding.right" :y2="y" class="grid-line" />
            <!-- Y axis labels (1-5) -->
            <text v-for="label in yLabels" :key="label.val" :x="padding.left - 8" :y="label.y" class="y-label">{{ label.val }}</text>
            <!-- Bars -->
            <rect v-for="(row, i) in rows" :key="i" :x="barX(i)" :y="barY(row)" :width="barW" :height="barHeight(row)" class="bar-rect">
              <title>{{ row.cmd }} — {{ row.freqLabel || levelLabel(row.level) }}</title>
            </rect>
            <!-- X axis: 命令名 + 下方一行简短功能描述，旋转 -45° -->
            <g v-for="(row, i) in rows" :key="'label-'+i">
              <text
                :x="barX(i) + barW / 2"
                :y="labelY"
                class="x-label"
                text-anchor="end"
                :transform="`rotate(-45, ${barX(i) + barW / 2}, ${labelY})`"
              >
                {{ row.cmd }}
              </text>
              <text
                :x="barX(i) + barW / 2"
                :y="labelY + 26"
                class="x-desc"
                text-anchor="end"
                :transform="`rotate(-45, ${barX(i) + barW / 2}, ${labelY + 26})`"
              >
                {{ row.desc }}
              </text>
            </g>
          </svg>
        </div>
        <div class="x-axis-label">命令 <span class="scroll-hint">（可左右滑动查看）</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const rawRows = [
  { cmd: 'git init', desc: '在当前目录初始化 Git 仓库', level: 0, freqLabel: '项目开始时一次' },
  { cmd: 'git status', desc: '查看工作区和暂存区的状态', level: 5, freqLabel: '极高频' },
  { cmd: 'git add <文件>', desc: '把指定文件放入暂存区', level: 5, freqLabel: '每次提交前' },
  { cmd: 'git add .', desc: '把所有修改放入暂存区', level: 5, freqLabel: '' },
  { cmd: 'git commit -m "..."', desc: '提交暂存区内容，附上说明', level: 5, freqLabel: '' },
  { cmd: 'git push', desc: '推送到远程仓库', level: 5, freqLabel: '' },
  { cmd: 'git pull', desc: '拉取远程最新内容', level: 5, freqLabel: '' },
  { cmd: 'git log --oneline', desc: '查看简洁的提交历史', level: 4, freqLabel: '' },
  { cmd: 'git checkout -b <分支名>', desc: '创建并切换到新分支', level: 4, freqLabel: '' },
  { cmd: 'git checkout <分支名>', desc: '切换到已有分支', level: 4, freqLabel: '' },
  { cmd: 'git clone <url>', desc: '克隆远程仓库到本地', level: 4, freqLabel: '' },
  { cmd: 'git branch', desc: '查看所有本地分支', level: 3, freqLabel: '' },
  { cmd: 'git merge <分支名>', desc: '将指定分支合并到当前分支', level: 3, freqLabel: '' },
  { cmd: 'git stash', desc: '临时保存未提交的改动（切换任务时用）', level: 3, freqLabel: '' },
  { cmd: 'git stash pop', desc: '恢复之前 stash 的改动', level: 3, freqLabel: '' },
  { cmd: 'git reset HEAD~1', desc: '撤销最近一次提交（保留改动）', level: 3, freqLabel: '' },
  { cmd: 'git diff', desc: '查看工作区和暂存区的具体差异', level: 3, freqLabel: '' },
  { cmd: 'git branch -d <分支名>', desc: '删除已合并的分支', level: 2, freqLabel: '' },
  { cmd: 'git remote add origin <url>', desc: '关联远程仓库（只做一次）', level: 0, freqLabel: '项目初始时' },
]

const rows = computed(() => [...rawRows].sort((a, b) => b.level - a.level))

function levelLabel(level) {
  const map = { 5: '极高频', 4: '高频', 3: '中频', 2: '低频', 1: '很少', 0: '一次性' }
  return map[level] || ''
}

const barW = 24
const slotWidth = 88
const chartWidth = computed(() => rawRows.length * slotWidth + 44 + 24)
const height = 320
const padding = { top: 12, right: 24, bottom: 150, left: 44 }
const labelY = height - padding.bottom + 16

function barX(index) {
  return padding.left + index * slotWidth + (slotWidth - barW) / 2
}
function barHeight(row) {
  const plotHeight = height - padding.top - padding.bottom
  return Math.max(4, (row.level / 5) * plotHeight)
}
function barY(row) {
  const plotHeight = height - padding.top - padding.bottom
  return height - padding.bottom - barHeight(row)
}

const gridY = computed(() => {
  const plotHeight = height - padding.top - padding.bottom
  const step = plotHeight / 5
  return Array.from({ length: 6 }, (_, i) => padding.top + i * step)
})

const yLabels = computed(() => {
  const plotHeight = height - padding.top - padding.bottom
  const step = plotHeight / 5
  return Array.from({ length: 6 }, (_, i) => ({
    val: 5 - i,
    y: padding.top + i * step + 4,
  }))
})
</script>

<style scoped>
.gcc-root {
  margin: 1rem 0;
  font-size: 0.9rem;
}

.gcc-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.gcc-chart-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 8px 10px;
  margin-bottom: 1rem;
}

.chart-header {
  position: relative;
}
.y-axis-label {
  position: absolute;
  left: -26px;
  top: 50%;
  transform: rotate(-90deg) translateX(50%);
  transform-origin: left center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.chart-area {
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 320px;
  -webkit-overflow-scrolling: touch;
}
.chart-svg {
  display: block;
}
.grid-line {
  stroke: var(--vp-c-divider);
  stroke-dasharray: 3 2;
  stroke-width: 1;
}
.y-label {
  font-size: 0.8rem;
  fill: var(--vp-c-text-3);
  text-anchor: end;
}
.bar-rect {
  fill: var(--vp-c-brand);
  rx: 2;
  transition: fill 0.2s;
  cursor: pointer;
}
.bar-rect:hover {
  fill: var(--vp-c-brand-2);
}
.x-label {
  font-size: 0.85rem;
  fill: var(--vp-c-text-2);
}
.x-desc {
  font-size: 0.72rem;
  fill: var(--vp-c-text-3);
}
.x-axis-label {
  margin-top: 0.25rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.scroll-hint {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
}
</style>
