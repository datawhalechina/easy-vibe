<template>
  <div class="demo data-tracking-demo">

    <!-- Methods: 同一场景，三种方式各自捕获到什么 -->
    <div v-if="activeTab === 'methods'" class="content">
      <div class="scenario-bar">场景：用户在电商 App 点击了「加入购物车」按钮</div>
      <table class="capture-table">
        <thead>
          <tr>
            <th class="col-dim">捕获到的信息</th>
            <th>代码埋点</th>
            <th>可视化埋点</th>
            <th>全埋点</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in captureRows" :key="row.label">
            <td class="col-dim">{{ row.label }}</td>
            <td><span :class="row.code ? 'yes' : 'no'">{{ row.code ? '✔' : '✘' }}</span></td>
            <td><span :class="row.visual ? 'yes' : 'no'">{{ row.visual ? '✔' : '✘' }}</span></td>
            <td><span :class="row.auto ? 'yes' : 'no'">{{ row.auto ? '✔' : '✘' }}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="capture-footer">
        <span class="cf-item"><span class="yes">✔</span> 能捕获</span>
        <span class="cf-item"><span class="no">✘</span> 无法捕获</span>
      </div>
    </div>

    <!-- Model: 点击模拟，看 JSON 逐行组装 -->
    <div v-if="activeTab === 'model'" class="content">
      <div class="sim-header">
        <button class="sim-btn" @click="runSimulation" :disabled="simRunning">
          {{ simRunning ? '记录生成中...' : '模拟：用户点击「加入购物车」' }}
        </button>
      </div>
      <div class="json-build">
        <div class="json-line" v-for="(line, i) in jsonLines" :key="i"
             :class="{ visible: simStep > i, highlight: simStep === i + 1 }">
          <span class="line-tag" :style="{ background: line.color }">{{ line.tag }}</span>
          <code>{{ line.code }}</code>
        </div>
      </div>
      <div class="sim-hint" v-if="simStep === 0">点击上方按钮，观察一条埋点记录是如何被组装出来的</div>
    </div>

    <!-- Pipeline: 动画数据流 -->
    <div v-if="activeTab === 'pipeline'" class="content">
      <div class="pipe-visual">
        <div class="pipe-stage" v-for="(s, i) in pipeStages" :key="i">
          <div class="stage-icon" :style="{ background: s.bg }">{{ s.icon }}</div>
          <div class="stage-name">{{ s.name }}</div>
        </div>
        <div class="pipe-track">
          <div class="packet" :class="{ flying: pipeFlying }"
               v-for="n in 3" :key="n"
               :style="{ animationDelay: (n - 1) * 0.6 + 's' }">
          </div>
        </div>
      </div>
      <button class="sim-btn pipe-btn" @click="startPipeAnim">
        {{ pipeFlying ? '传输中...' : '模拟：发送一批数据' }}
      </button>
      <div class="pipe-legend">
        <span v-for="(s, i) in pipeStages" :key="i" class="legend-item">
          <span class="legend-dot" :style="{ background: s.bg }"></span>{{ s.label }}
        </span>
      </div>
    </div>

    <!-- ETL: before / after 数据对比 -->
    <div v-if="activeTab === 'overview'" class="content">
      <div class="etl-compare">
        <div class="etl-side etl-before">
          <div class="etl-side-title">原始数据（服务器收到的）</div>
          <div class="etl-row-data" v-for="(r, i) in rawData" :key="i" :class="r.issue">
            <code>{{ r.text }}</code>
            <span class="issue-tag" v-if="r.tag">{{ r.tag }}</span>
          </div>
        </div>
        <div class="etl-arrow-col">
          <div class="etl-arrow-label">ETL 清洗</div>
          <div class="etl-arrow-icon">→</div>
        </div>
        <div class="etl-side etl-after">
          <div class="etl-side-title">清洗后（写入数据仓库的）</div>
          <div class="etl-row-data clean" v-for="(r, i) in cleanData" :key="i">
            <code>{{ r }}</code>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tab: { type: String, default: 'overview' }
})
const activeTab = ref(props.tab)

// === Methods tab: 同一场景，三种方式各自能捕获什么 ===
const captureRows = [
  { label: '点击了哪个按钮', code: true, visual: true, auto: true },
  { label: '点击发生的时间', code: true, visual: true, auto: true },
  { label: '用户停留了多久', code: false, visual: false, auto: true },
  { label: '商品名称 / 价格', code: true, visual: false, auto: false },
  { label: '用了哪张优惠券', code: true, visual: false, auto: false },
  { label: '账户余额', code: true, visual: false, auto: false },
  { label: '页面滑动轨迹', code: false, visual: false, auto: true }
]

// === Model tab: 模拟 JSON 逐行组装 ===
const simStep = ref(0)
const simRunning = ref(false)
const jsonLines = [
  { tag: 'What', color: '#10b981', code: '"event": "add_to_cart"' },
  { tag: 'Who', color: '#3b82f6', code: '"user_id": "u_98765"' },
  { tag: 'When', color: '#8b5cf6', code: '"time": "2025-08-12T10:33:09Z"' },
  { tag: 'Where', color: '#f59e0b', code: '"device": "iPhone 15", "network": "5G"' },
  { tag: 'What', color: '#10b981', code: '"product": "新款手机", "price": 2999' }
]

function runSimulation() {
  if (simRunning.value) return
  simRunning.value = true
  simStep.value = 0
  let i = 0
  const timer = setInterval(() => {
    i++
    simStep.value = i
    if (i >= jsonLines.length) {
      clearInterval(timer)
      simRunning.value = false
    }
  }, 600)
}

// === Pipeline tab: 动画数据流 ===
const pipeFlying = ref(false)
const pipeStages = [
  { icon: '📱', name: '手机', label: '产生数据', bg: '#e0f2fe' },
  { icon: '📦', name: '打包', label: '攒一批', bg: '#fef08a' },
  { icon: '🌐', name: '发送', label: '网络传输', bg: '#fed7aa' },
  { icon: '🚦', name: '排队', label: '消息队列', bg: '#fecaca' },
  { icon: '🗄️', name: '入库', label: '数据仓库', bg: '#bbf7d0' }
]

function startPipeAnim() {
  if (pipeFlying.value) return
  pipeFlying.value = true
  setTimeout(() => { pipeFlying.value = false }, 3000)
}

// === ETL tab: before / after 对比 ===
const rawData = [
  { text: 'id-001  userId: "zhang"  add_to_cart  ¥2999', issue: '', tag: '' },
  { text: 'id-001  userId: "zhang"  add_to_cart  ¥2999', issue: 'dup', tag: '重复' },
  { text: 'id-002  user_id: "li"    click_buy    ¥0', issue: '', tag: '' },
  { text: 'id-003  userId: "wang"   pay  1970-01-01', issue: 'bad', tag: '时间异常' },
  { text: 'id-004  user_id: "zhao"  click_buy    ¥599', issue: '', tag: '' }
]

const cleanData = [
  'id-001  user_id: "zhang"  add_to_cart  ¥2999',
  'id-002  user_id: "li"     click_buy    ¥0',
  'id-004  user_id: "zhao"   click_buy    ¥599'
]
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.content {
  padding: 24px;
  background: #f8fafc;
}

.dark .content {
  background: var(--vp-c-bg-soft);
}

.sim-btn {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.sim-btn:hover:not(:disabled) { background: #2563eb; }
.sim-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* === Methods: Capture Table === */
.scenario-bar {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  background: #e0f2fe;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.capture-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  font-size: 13px;
}

.capture-table th,
.capture-table td {
  padding: 10px 14px;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}

.capture-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
  font-size: 13px;
}

.col-dim {
  text-align: left !important;
  font-weight: 500;
  color: #1e293b;
}

.yes { color: #16a34a; font-weight: 700; }
.no { color: #dc2626; opacity: 0.4; }

.capture-footer {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 12px;
  font-size: 12px;
  color: #64748b;
}

.cf-item { display: flex; align-items: center; gap: 4px; }

/* === Model: JSON 逐行组装 === */
.sim-header {
  text-align: center;
}

.json-build {
  background: #1e293b;
  border-radius: 8px;
  padding: 20px 24px;
  min-height: 180px;
}

.json-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.4s ease;
}

.json-line.visible {
  opacity: 1;
  transform: translateY(0);
}

.json-line.highlight {
  background: rgba(56, 189, 248, 0.08);
  border-radius: 4px;
  margin: 0 -8px;
  padding: 6px 8px;
}

.line-tag {
  font-size: 11px;
  font-weight: 700;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  flex-shrink: 0;
  min-width: 44px;
  text-align: center;
}

.json-line code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: #cbd5e1;
}

.sim-hint {
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
  margin-top: 12px;
}

/* === Pipeline: 动画数据流 === */
.pipe-visual {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 28px 24px;
  margin-bottom: 16px;
}

.pipe-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.stage-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stage-name {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.pipe-track {
  position: absolute;
  top: 50%;
  left: 60px;
  right: 60px;
  height: 3px;
  background: #e2e8f0;
  transform: translateY(-8px);
}

.packet {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  top: -3.5px;
  left: 0;
  opacity: 0;
}

.packet.flying {
  animation: fly-across 2.4s ease-in-out forwards;
}

@keyframes fly-across {
  0% { left: 0; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.pipe-btn {
  margin-bottom: 12px;
}

.pipe-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 12px;
  color: #64748b;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

/* === ETL: Before / After 对比 === */
.etl-compare {
  display: flex;
  gap: 0;
  align-items: stretch;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.etl-side {
  flex: 1;
  padding: 16px;
}

.etl-before {
  background: #fefce8;
}

.etl-after {
  background: #f0fdf4;
}

.etl-side-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.etl-before .etl-side-title { color: #854d0e; }
.etl-after .etl-side-title { color: #166534; }

.etl-arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  gap: 4px;
  flex-shrink: 0;
  background: #f1f5f9;
}

.etl-arrow-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
}

.etl-arrow-icon {
  font-size: 22px;
  color: #94a3b8;
}

.etl-row-data {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.etl-row-data:last-child { margin-bottom: 0; }

.etl-row-data.dup {
  background: #fef2f2;
  text-decoration: line-through;
  color: #991b1b;
  opacity: 0.7;
}

.etl-row-data.bad {
  background: #fff7ed;
  color: #9a3412;
  opacity: 0.7;
}

.etl-row-data.clean {
  color: #166534;
}

.issue-tag {
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  flex-shrink: 0;
  background: #fecaca;
  color: #991b1b;
}

/* Responsive */
@media (max-width: 640px) {
  .capture-table { font-size: 12px; }
  .capture-table th,
  .capture-table td { padding: 8px 8px; }

  .etl-compare { flex-direction: column; }

  .etl-arrow-col {
    flex-direction: row;
    padding: 8px;
  }

  .pipe-visual { padding: 20px 12px; }
  .stage-name { font-size: 10px; }
}
</style>
