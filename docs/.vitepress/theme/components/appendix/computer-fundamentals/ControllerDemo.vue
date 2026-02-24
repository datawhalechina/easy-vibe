<template>
  <div class="controller-demo">
    <div class="demo-header">
      <span class="title">控制器工作原理</span>
      <span class="subtitle">控制信号如何协调 CPU 各个部件</span>
    </div>

    <div class="control-unit">
      <div class="cu-box">
        <div class="cu-title">控制单元 CU</div>
        <div class="cu-diagram">
          <div class="cu-internal">
            <div class="cu-component">指令寄存器 IR</div>
            <div class="cu-component">指令译码器</div>
            <div class="cu-component">时序发生器</div>
          </div>
          <div class="cu-output">
            <div class="output-label">输出控制信号：</div>
            <div class="control-signals">
              <div v-for="sig in controlSignals" :key="sig.name" :class="['sig-box', sig.active ? 'active' : '']">
                {{ sig.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cpu-block-diagram">
      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'pc' }">
          <div class="block-name">PC</div>
          <div class="block-desc">程序计数器</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'pc' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'mar' }">
          <div class="block-name">MAR</div>
          <div class="block-desc">地址寄存器</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mar' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'memory' }">
          <div class="block-name">Memory</div>
          <div class="block-desc">主存</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'mdr' }">
          <div class="block-name">MDR</div>
          <div class="block-desc">数据寄存器</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'mdr' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'ir' }">
          <div class="block-name">IR</div>
          <div class="block-desc">指令寄存器</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'ir' }">→</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'decoder' }">
          <div class="block-name">ID</div>
          <div class="block-desc">译码器</div>
        </div>
      </div>

      <div class="block-row">
        <div class="cpu-block" :class="{ active: activeBlock === 'alu' }">
          <div class="block-name">ALU</div>
          <div class="block-desc">算术逻辑单元</div>
        </div>
        <div class="arrow" :class="{ active: activeBlock === 'alu' }">↔</div>
        <div class="cpu-block" :class="{ active: activeBlock === 'acc' }">
          <div class="block-name">ACC</div>
          <div class="block-desc">累加器</div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <button class="btn" @click="executeFetch">执行取指周期</button>
      <button class="btn" @click="executeAdd">执行 ADD 指令</button>
      <button class="btn" @click="executeLoad">执行 LOAD 指令</button>
    </div>

    <div class="microinstruction-panel">
      <div class="panel-title">当前微指令</div>
      <div class="micro-ops">
        <div v-for="(op, i) in microOps" :key="i" :class="['micro-op', op.active ? 'active' : '']">
          <span class="op-cycle">T{{ i + 1 }}</span>
          <span class="op-desc">{{ op.desc }}</span>
        </div>
      </div>
    </div>

    <div class="cu-explanation">
      <div class="exp-title">控制器核心概念</div>
      <div class="exp-content">
        <div class="exp-item">
          <strong>控制信号：</strong>由控制器发出的电信号，用于控制数据通路中各个部件的动作
        </div>
        <div class="exp-item">
          <strong>时序：</strong>CPU 操作按时钟节拍进行，每个节拍执行特定微操作
        </div>
        <div class="exp-item">
          <strong>硬布线 vs 微程序：</strong>硬布线控制器速度快但设计复杂；微程序控制器灵活但速度稍慢
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeBlock = ref('')

const controlSignals = reactive([
  { name: 'PC→MAR', active: false },
  { name: 'MEM→MDR', active: false },
  { name: 'MDR→IR', active: false },
  { name: 'IR→ID', active: false },
  { name: 'ALU→ACC', active: false },
  { name: 'ACC→MDR', active: false },
])

const microOps = reactive([])

const clearSignals = () => {
  controlSignals.forEach(s => s.active = false)
  activeBlock.value = ''
}

const executeFetch = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: 'PC→MAR: 将PC中的地址送入MAR', active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: 'MEM→MDR: 从内存读取指令到MDR', active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: 'MDR→IR: 将指令送入IR', active: true })
  controlSignals[2].active = true
  activeBlock.value = 'mar'
  await wait(1000)

  microOps.push({ desc: 'IR→ID: 指令送入译码器', active: true })
  controlSignals[3].active = true
  activeBlock.value = 'ir'
  await wait(1000)
}

const executeAdd = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: '指令译码：识别为ADD指令', active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: 'ALU执行加法运算', active: true })
  controlSignals[4].active = true
  activeBlock.value = 'alu'
  await wait(1000)

  microOps.push({ desc: '结果写入ACC', active: true })
  activeBlock.value = 'acc'
  await wait(1000)
}

const executeLoad = async () => {
  clearSignals()
  microOps.splice(0, microOps.length)
  
  microOps.push({ desc: '指令译码：识别为LOAD指令', active: true })
  activeBlock.value = 'decoder'
  await wait(1000)

  microOps.push({ desc: 'PC→MAR: 取操作数地址', active: true })
  controlSignals[0].active = true
  activeBlock.value = 'pc'
  await wait(1000)

  microOps.push({ desc: 'MEM→MDR: 读取数据', active: true })
  controlSignals[1].active = true
  activeBlock.value = 'memory'
  await wait(1000)

  microOps.push({ desc: 'MDR→ACC: 数据送入ACC', active: true })
  controlSignals[5].active = true
  activeBlock.value = 'mdr'
  await wait(1000)
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.controller-demo {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  margin-left: auto;
}

.control-unit {
  margin-bottom: 20px;
}

.cu-box {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.cu-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  text-align: center;
}

.cu-diagram {
  display: flex;
  gap: 16px;
}

.cu-internal {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cu-component {
  padding: 8px 12px;
  background: #e0f2fe;
  border-radius: 6px;
  font-size: 12px;
  color: #0369a1;
  text-align: center;
}

.cu-output {
  flex: 1;
}

.output-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.control-signals {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sig-box {
  padding: 6px 10px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 11px;
  color: #64748b;
  font-family: monospace;
}

.sig-box.active {
  background: #3b82f6;
  color: white;
}

.cpu-block-diagram {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.block-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.cpu-block {
  padding: 10px 16px;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s;
}

.cpu-block.active {
  background: #dbeafe;
  border: 2px solid #3b82f6;
}

.block-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.block-desc {
  font-size: 10px;
  color: #64748b;
}

.arrow {
  font-size: 16px;
  color: #cbd5e1;
}

.arrow.active {
  color: #3b82f6;
}

.control-panel {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn:hover {
  background: #2563eb;
}

.microinstruction-panel {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.micro-ops {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.micro-op {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
}

.micro-op.active {
  background: #dbeafe;
}

.op-cycle {
  font-weight: 600;
  color: #3b82f6;
  min-width: 24px;
}

.op-desc {
  color: #475569;
}

.cu-explanation {
  background: white;
  border-radius: 8px;
  padding: 12px;
}

.exp-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.exp-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exp-item {
  font-size: 12px;
  color: #475569;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}
</style>
