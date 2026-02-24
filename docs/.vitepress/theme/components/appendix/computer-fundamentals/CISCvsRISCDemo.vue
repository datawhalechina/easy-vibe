<template>
  <div class="cisc-risc-demo">
    <h4>⚔️ 两种设计哲学：CISC vs RISC</h4>
    <p class="desc">点击对比维度，看两种指令集架构的核心差异</p>

    <div class="arch-toggle">
      <button
        :class="['toggle-btn', { active: view === 'cisc' }]"
        @click="view = 'cisc'"
      >
        CISC (x86)
      </button>
      <button
        :class="['toggle-btn', { active: view === 'both' }]"
        @click="view = 'both'"
      >
        对比
      </button>
      <button
        :class="['toggle-btn', { active: view === 'risc' }]"
        @click="view = 'risc'"
      >
        RISC (ARM)
      </button>
    </div>

    <div v-if="view === 'both'" class="comparison-grid">
      <div v-for="dim in dimensions" :key="dim.label" class="dim-row">
        <div class="dim-cisc">{{ dim.cisc }}</div>
        <div class="dim-label">{{ dim.label }}</div>
        <div class="dim-risc">{{ dim.risc }}</div>
      </div>
    </div>

    <div v-else class="arch-detail">
      <div class="detail-card">
        <div class="card-header" :class="view">
          <span class="card-title">{{ archData[view].name }}</span>
          <span class="card-full">{{ archData[view].full }}</span>
        </div>
        <div class="card-philosophy">
          <span class="phi-label">设计哲学：</span>
          <span>{{ archData[view].philosophy }}</span>
        </div>
        <div class="card-analogy">
          <span class="ana-label">类比：</span>
          <span>{{ archData[view].analogy }}</span>
        </div>
        <div class="card-example">
          <div class="example-title">{{ archData[view].exampleTitle }}</div>
          <pre class="example-code">{{ archData[view].example }}</pre>
          <div class="example-note">{{ archData[view].exampleNote }}</div>
        </div>
        <div class="card-products">
          <span class="prod-label">代表产品：</span>
          <span v-for="p in archData[view].products" :key="p" class="prod-tag">{{ p }}</span>
        </div>
      </div>
    </div>

    <div class="real-world">
      <div class="rw-title">🌍 现实中的选择</div>
      <div class="rw-items">
        <div class="rw-item">
          <span class="rw-device">💻 你的电脑</span>
          <span class="rw-arch">x86 (CISC)</span>
          <span class="rw-why">兼容几十年的软件生态</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">📱 你的手机</span>
          <span class="rw-arch">ARM (RISC)</span>
          <span class="rw-why">低功耗，电池续航更久</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">🍎 Apple Silicon</span>
          <span class="rw-arch">ARM (RISC)</span>
          <span class="rw-why">高性能低功耗，颠覆了笔记本市场</span>
        </div>
        <div class="rw-item">
          <span class="rw-device">🔬 RISC-V 开发板</span>
          <span class="rw-arch">RISC-V (RISC)</span>
          <span class="rw-why">开源免费，IoT 和教育领域崛起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('both')

const dimensions = [
  { label: '指令数量', cisc: '上千条复杂指令', risc: '几十到几百条精简指令' },
  { label: '单条指令', cisc: '一条能做很多事', risc: '一条只做一件事' },
  { label: '指令长度', cisc: '变长（1-15字节）', risc: '定长（通常4字节）' },
  { label: '执行速度', cisc: '复杂指令多周期', risc: '大多数单周期完成' },
  { label: '功耗', cisc: '较高', risc: '较低' },
  { label: '流水线', cisc: '难优化（指令长度不一）', risc: '易优化（指令整齐）' },
  { label: '编译器负担', cisc: '轻（硬件做更多）', risc: '重（软件做更多优化）' }
]

const archData = {
  cisc: {
    name: 'CISC',
    full: 'Complex Instruction Set Computer',
    philosophy: '让硬件尽可能强大，一条指令完成复杂操作，减轻编译器负担',
    analogy: '像一把瑞士军刀——功能多，但每个功能不一定最好用',
    exampleTitle: '用一条指令完成「内存加法」',
    example: 'ADD [0x1000], R1\n; 一条指令完成：读内存 → 加法 → 写回内存\n; CPU 内部拆成多个微操作执行',
    exampleNote: 'CISC 允许指令直接操作内存，一条指令背后可能是 5-6 个微操作',
    products: ['Intel Core', 'AMD Ryzen', 'x86 服务器']
  },
  risc: {
    name: 'RISC',
    full: 'Reduced Instruction Set Computer',
    philosophy: '让每条指令尽可能简单快速，复杂操作由多条简单指令组合完成',
    analogy: '像一套专业工具——每个工具只做一件事，但做得又快又好',
    exampleTitle: '用三条指令完成同样的「内存加法」',
    example: 'LOAD  R2, [0x1000]  ; 第1步：从内存读数据到寄存器\nADD   R2, R2, R1    ; 第2步：寄存器之间做加法\nSTORE R2, [0x1000]  ; 第3步：把结果写回内存',
    exampleNote: 'RISC 要求数据先加载到寄存器，运算只在寄存器间进行，结果再存回内存',
    products: ['Apple M 系列', '高通骁龙', 'AWS Graviton', 'RISC-V']
  }
}
</script>

<style scoped>
.cisc-risc-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }

.arch-toggle { display: flex; gap: 4px; margin-bottom: 16px; background: var(--vp-c-bg); border-radius: 8px; padding: 4px; }
.toggle-btn {
  flex: 1; padding: 8px; border: none; border-radius: 6px;
  background: transparent; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s;
}
.toggle-btn.active { background: var(--vp-c-brand-1); color: #fff; }

.comparison-grid { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.dim-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; }
.dim-cisc, .dim-risc {
  padding: 8px 12px; border-radius: 6px; font-size: 12px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.dim-cisc { text-align: right; }
.dim-label {
  padding: 4px 10px; background: var(--vp-c-brand-1); color: #fff;
  border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap;
}

.arch-detail { margin-bottom: 16px; }
.detail-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); overflow: hidden; }
.card-header { padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.card-header.cisc { background: #dbeafe; }
.card-header.risc { background: #dcfce7; }
.card-title { font-size: 16px; font-weight: 700; }
.card-full { font-size: 12px; color: var(--vp-c-text-3); }
.card-philosophy, .card-analogy { padding: 8px 14px; font-size: 13px; border-bottom: 1px solid var(--vp-c-divider); }
.phi-label, .ana-label { font-weight: 600; font-size: 12px; color: var(--vp-c-text-3); margin-right: 6px; }
.card-example { padding: 12px 14px; border-bottom: 1px solid var(--vp-c-divider); }
.example-title { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.example-code { padding: 8px 10px; margin: 0; font-size: 12px; line-height: 1.5; background: var(--vp-c-bg-soft); border-radius: 4px; white-space: pre-wrap; }
.example-note { font-size: 11px; color: var(--vp-c-text-3); margin-top: 6px; }
.card-products { padding: 10px 14px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.prod-label { font-size: 12px; color: var(--vp-c-text-3); font-weight: 600; }
.prod-tag { font-size: 11px; padding: 2px 8px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); border-radius: 4px; }

.real-world { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.rw-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.rw-items { display: flex; flex-direction: column; gap: 6px; }
.rw-item { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 6px 8px; background: var(--vp-c-bg); border-radius: 6px; }
.rw-device { font-weight: 600; min-width: 110px; }
.rw-arch { padding: 2px 8px; background: var(--vp-c-brand-soft); border-radius: 4px; font-weight: 500; white-space: nowrap; }
.rw-why { color: var(--vp-c-text-2); }

@media (max-width: 640px) {
  .dim-row { grid-template-columns: 1fr; gap: 4px; }
  .dim-cisc { text-align: left; }
  .dim-label { justify-self: start; }
  .rw-item { flex-wrap: wrap; }
}
</style>
