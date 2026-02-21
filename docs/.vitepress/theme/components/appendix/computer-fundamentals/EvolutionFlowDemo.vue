<template>
  <div class="evolution-flow-demo">
    <div class="demo-header">
      <span class="title">全景图：从沙子到智能</span>
      <span class="subtitle">每一层都是对下一层的抽象封装</span>
    </div>

    <div class="flow-list">
      <div v-for="(step, index) in steps" :key="index" class="flow-row">
        <!-- 卡片 -->
        <div class="step-card">
          <div class="card-left">
            <span class="step-icon">{{ step.icon }}</span>
          </div>
          <div class="card-body">
            <div class="card-title">{{ step.title }}</div>
            <div class="card-desc">{{ step.desc }}</div>
          </div>
          <div class="card-right">
            <span class="card-count">{{ step.count }}</span>
          </div>
        </div>

        <!-- 箭头 -->
        <div v-if="index < steps.length - 1" class="flow-arrow">
          <div class="arrow-line" />
          <div class="arrow-action">{{ step.action }}</div>
          <div class="arrow-sym">↓</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>计算机的本质是"开关的组合"。通过一层层的抽象封装，最底层的物理材料最终变成了能执行任意逻辑的通用计算平台。
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    icon: '🏖️',
    title: '沙子（硅）',
    desc: '地球上最丰富的元素之一，提炼出高纯度硅',
    count: '原材料',
    action: '↓ 提纯 → 切割成晶圆'
  },
  {
    icon: '💿',
    title: '硅晶圆',
    desc: '直径 30cm 的单晶硅片，表面极其光滑',
    count: '基底',
    action: '↓ 光刻 → 蚀刻 → 掺杂'
  },
  {
    icon: '⚡',
    title: '晶体管（开关）',
    desc: 'Gate=1 导通，Gate=0 断开，用电压控制电流',
    count: '数百亿个 / 芯片',
    action: '↓ 组合成逻辑电路'
  },
  {
    icon: '🔌',
    title: '逻辑门',
    desc: 'AND / OR / NOT / XOR，实现基本布尔运算',
    count: '数十亿个',
    action: '↓ 组合成功能模块'
  },
  {
    icon: '🔧',
    title: '功能单元',
    desc: '加法器、寄存器、多路选择器……各司其职',
    count: '数百个',
    action: '↓ 集成为完整处理器'
  },
  {
    icon: '🧠',
    title: 'CPU 核心',
    desc: 'ALU + 控制器 + 寄存器组，执行取指→解码→执行→写回',
    count: '1 ~ 128 核',
    action: '↓ 软件编程'
  },
  {
    icon: '💻',
    title: '软件应用',
    desc: '操作系统 / AI 模型 / 游戏 / 网页……一切皆指令',
    count: '无限可能',
    action: ''
  }
]
</script>

<style scoped>
.evolution-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  margin-left: 0.5rem;
}

/* 整体竖向流程 */
.flow-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.flow-row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* 卡片 */
.step-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.65rem 0.8rem;
  transition: border-color 0.2s;
}

.step-card:hover {
  border-color: var(--vp-c-brand);
}

.card-left {
  flex-shrink: 0;
}

.step-icon {
  font-size: 1.5rem;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.card-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.card-right {
  flex-shrink: 0;
  text-align: right;
}

.card-count {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.15rem 0.45rem;
  white-space: nowrap;
}

/* 箭头区域 */
.flow-arrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 1rem;
  color: var(--vp-c-text-3);
}

.arrow-line {
  width: 2px;
  height: 0.8rem;
  background: var(--vp-c-divider);
  margin-left: 1.3rem;
  flex-shrink: 0;
}

.arrow-action {
  font-size: 0.72rem;
  color: var(--vp-c-brand);
  font-style: italic;
}

.arrow-sym {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  margin-left: auto;
  margin-right: 0.5rem;
}

/* info box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.8rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
