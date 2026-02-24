<template>
  <div class="test-pyramid-demo">
    <div class="demo-label">交互式测试金字塔 ── 点击每一层查看详情</div>

    <div class="pyramid-container">
      <div
        v-for="(layer, i) in layers"
        :key="layer.name"
        class="pyramid-layer"
        :class="[layer.cls, { active: selected === i }]"
        :style="{ width: layer.width }"
        @click="selected = selected === i ? -1 : i"
      >
        <span class="layer-icon">{{ layer.icon }}</span>
        <span class="layer-name">{{ layer.name }}</span>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selected >= 0" class="detail-card" :class="layers[selected].cls">
        <h4>{{ layers[selected].icon }} {{ layers[selected].name }}</h4>
        <table>
          <tr v-for="row in detailRows" :key="row.key">
            <td class="row-label">{{ row.label }}</td>
            <td>{{ layers[selected][row.key] }}</td>
          </tr>
        </table>
        <div class="example">
          <strong>示例：</strong>{{ layers[selected].example }}
        </div>
      </div>
    </Transition>

    <div class="pyramid-legend">
      <span class="legend-item"><span class="dot e2e"></span>越往上：越慢、越贵、越接近用户</span>
      <span class="legend-item"><span class="dot unit"></span>越往下：越快、越多、越接近代码</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(-1)

const detailRows = [
  { key: 'count', label: '数量占比' },
  { key: 'speed', label: '执行速度' },
  { key: 'cost', label: '维护成本' },
  { key: 'scope', label: '覆盖范围' },
  { key: 'confidence', label: '信心指数' }
]

const layers = [
  {
    name: 'E2E 测试',
    cls: 'e2e',
    icon: '🖥️',
    width: '40%',
    count: '约 10%',
    speed: '慢（秒~分钟级）',
    cost: '高 — 环境依赖多，易碎',
    scope: '完整用户流程',
    confidence: '最高 — 模拟真实用户操作',
    example: '用 Playwright 模拟用户登录 → 下单 → 支付的完整流程'
  },
  {
    name: '集成测试',
    cls: 'integration',
    icon: '🔗',
    width: '60%',
    count: '约 20%',
    speed: '中等（百毫秒级）',
    cost: '中 — 需要部分外部依赖',
    scope: '模块间协作',
    confidence: '较高 — 验证组件间的配合',
    example: '测试 API 接口能否正确读写数据库并返回预期 JSON'
  },
  {
    name: '单元测试',
    cls: 'unit',
    icon: '🧪',
    width: '85%',
    count: '约 70%',
    speed: '极快（毫秒级）',
    cost: '低 — 无外部依赖',
    scope: '单个函数/类',
    confidence: '基础 — 确保每个零件正常',
    example: '测试 formatPrice(100) 是否返回 "¥1.00"'
  }
]
</script>

<style scoped>
.test-pyramid-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}

.pyramid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 1rem;
}

.pyramid-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
}

.pyramid-layer:hover { transform: scale(1.03); }
.pyramid-layer.active { box-shadow: 0 0 0 2px var(--vp-c-brand); transform: scale(1.05); }

.pyramid-layer.e2e { background: #fee2e2; color: #991b1b; }
.pyramid-layer.integration { background: #fef3c7; color: #92400e; }
.pyramid-layer.unit { background: #d1fae5; color: #065f46; }

:root.dark .pyramid-layer.e2e { background: #450a0a; color: #fca5a5; }
:root.dark .pyramid-layer.integration { background: #451a03; color: #fcd34d; }
:root.dark .pyramid-layer.unit { background: #022c22; color: #6ee7b7; }

.detail-card {
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.detail-card.e2e { background: #fef2f2; border: 1px solid #fecaca; }
.detail-card.integration { background: #fffbeb; border: 1px solid #fde68a; }
.detail-card.unit { background: #ecfdf5; border: 1px solid #a7f3d0; }

:root.dark .detail-card.e2e { background: #1c0606; border-color: #7f1d1d; }
:root.dark .detail-card.integration { background: #1c1303; border-color: #78350f; }
:root.dark .detail-card.unit { background: #031c14; border-color: #065f46; }

.detail-card h4 { margin: 0 0 0.6rem; font-size: 1rem; }

.detail-card table { width: 100%; font-size: 0.85rem; border-collapse: collapse; }
.detail-card td { padding: 4px 8px; border-bottom: 1px solid var(--vp-c-divider); }
.row-label { font-weight: 600; white-space: nowrap; width: 80px; color: var(--vp-c-text-2); }

.example { margin-top: 0.6rem; font-size: 0.83rem; color: var(--vp-c-text-2); }

.pyramid-legend {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  flex-wrap: wrap;
}

.legend-item { display: flex; align-items: center; gap: 4px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.e2e { background: #ef4444; }
.dot.unit { background: #10b981; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
