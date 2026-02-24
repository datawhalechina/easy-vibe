<template>
  <div class="io-method-demo">
    <div class="demo-header">
      <span class="title">I/O 方式对比</span>
      <span class="subtitle">程序查询 · 中断方式 · DMA</span>
    </div>

    <div class="io-tabs">
      <button 
        v-for="method in ioMethods" 
        :key="method.name"
        :class="['tab-btn', { active: selectedMethod === method.name }]"
        @click="selectedMethod = method.name"
      >
        {{ method.name }}
      </button>
    </div>

    <div class="method-details" v-if="selectedMethodData">
      <div class="detail-header">
        <span class="method-name">{{ selectedMethodData.name }}</span>
        <span class="method-english">{{ selectedMethodData.english }}</span>
      </div>

      <div class="detail-flow">
        <div class="flow-title">工作流程</div>
        <div class="flow-diagram">
          <div v-for="(step, i) in selectedMethodData.steps" :key="i" class="flow-node">
            <div class="node-box" :class="{ active: activeStep === i }" @click="activeStep = i">
              <span class="node-num">{{ i + 1 }}</span>
              <span class="node-text">{{ step }}</span>
            </div>
            <div v-if="i < selectedMethodData.steps.length - 1" class="flow-arrow">↓</div>
          </div>
        </div>
      </div>

      <div class="detail-comparison">
        <div class="comp-grid">
          <div class="comp-item">
            <span class="comp-label">CPU 参与度</span>
            <span class="comp-value" :class="selectedMethodData.cpuLevel">{{ selectedMethodData.cpuLevel }}</span>
          </div>
          <div class="comp-item">
            <span class="comp-label">速度</span>
            <span class="comp-value">{{ selectedMethodData.speed }}</span>
          </div>
          <div class="comp-item">
            <span class="comp-label">复杂度</span>
            <span class="comp-value">{{ selectedMethodData.complexity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-title">三种 I/O 方式对比</div>
      <table class="compare-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>程序查询</th>
            <th>中断方式</th>
            <th>DMA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPU 参与度</td>
            <td>全程参与</td>
            <td>仅处理中断</td>
            <td>几乎不参与</td>
          </tr>
          <tr>
            <td>数据传输</td>
            <td>CPU 逐字节搬运</td>
            <td>CPU 逐字搬运</td>
            <td>外设直接到内存</td>
          </tr>
          <tr>
            <td>优点</td>
            <td>简单、控制灵活</td>
            <td>CPU 效率高</td>
            <td>CPU 完全解放</td>
          </tr>
          <tr>
            <td>缺点</td>
            <td>CPU 利用率低</td>
            <td>中断开销</td>
            <td>硬件复杂</td>
          </tr>
          <tr>
            <td>适用场景</td>
            <td>简单外设、低速设备</td>
            <td>中低速设备</td>
            <td>高速批量传输</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dma-demo" v-if="selectedMethod === 'DMA'">
      <div class="dma-title">DMA 传输过程</div>
      <div class="dma-visual">
        <div class="device cpu-device">
          <div class="device-icon">💻</div>
          <div class="device-name">CPU</div>
        </div>
        
        <div class="dma-channel">
          <div class="channel-step" v-if="dmaStep >= 1">
            <span class="step-label">1. CPU 设置 DMA</span>
            <span class="step-arrow">→</span>
          </div>
        </div>
        
        <div class="device dma-device">
          <div class="device-icon">🔧</div>
          <div class="device-name">DMA 控制器</div>
        </div>
        
        <div class="dma-channel">
          <div class="channel-step" v-if="dmaStep >= 2">
            <span class="step-label">2. DMA 直接访问内存</span>
            <span class="step-arrow">→</span>
          </div>
        </div>
        
        <div class="device memory-device">
          <div class="device-icon">💾</div>
          <div class="device-name">内存</div>
        </div>
      </div>
      
      <div class="dma-controls">
        <button class="btn" @click="startDma" :disabled="dmaStep > 0">开始 DMA 传输</button>
        <button class="btn" @click="resetDma">重置</button>
      </div>
    </div>

    <div class="interrupt-demo" v-if="selectedMethod === '中断方式'">
      <div class="interrupt-title">中断处理流程</div>
      <div class="interrupt-visual">
        <div class="timeline">
          <div class="timeline-item" v-for="(item, i) in interruptFlow" :key="i" :class="{ active: interruptStep === i }">
            <div class="timeline-num">{{ i + 1 }}</div>
            <div class="timeline-content">
              <div class="timeline-title">{{ item.title }}</div>
              <div class="timeline-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="interrupt-controls">
        <button class="btn" @click="nextInterrupt" :disabled="interruptStep >= interruptFlow.length - 1">下一步</button>
        <button class="btn" @click="resetInterrupt">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMethod = ref('程序查询')
const activeStep = ref(0)
const dmaStep = ref(0)
const interruptStep = ref(0)

const ioMethods = ref([
  {
    name: '程序查询',
    english: 'Programmed I/O',
    cpuLevel: '高',
    speed: '慢',
    complexity: '低',
    steps: [
      'CPU 轮询检查 I/O 设备状态',
      '设备忙？继续等待',
      '设备就绪，发送读写命令',
      'CPU 逐字节读取/写入数据',
      '判断是否传输完成',
      '未完成则继续查询'
    ]
  },
  {
    name: '中断方式',
    english: 'Interrupt-Driven I/O',
    cpuLevel: '中',
    speed: '中',
    complexity: '中',
    steps: [
      'CPU 启动 I/O 设备',
      'CPU 继续执行其他任务',
      'I/O 完成后发送中断请求',
      'CPU 响应中断，保存现场',
      '执行中断处理程序',
      '恢复现场，继续执行'
    ]
  },
  {
    name: 'DMA',
    english: 'Direct Memory Access',
    cpuLevel: '低',
    speed: '快',
    complexity: '高',
    steps: [
      'CPU 设置 DMA 控制器',
      '告诉 DMA 源地址、目标地址、传输长度',
      'CPU 去执行其他任务',
      'DMA 控制器直接与内存交换数据',
      '传输完成，DMA 发送中断通知 CPU'
    ]
  }
])

const selectedMethodData = computed(() => {
  return ioMethods.value.find(m => m.name === selectedMethod.value)
})

const interruptFlow = ref([
  { title: '中断请求', desc: 'I/O 设备向 CPU 发送中断请求信号' },
  { title: '中断响应', desc: 'CPU 完成当前指令后响应中断' },
  { title: '保存现场', desc: '保存 PC、寄存器等当前状态到栈' },
  { title: '中断处理', desc: '执行中断服务程序 ISR' },
  { title: '恢复现场', desc: '恢复保存的寄存器值' },
  { title: '返回执行', desc: '返回被中断的程序继续执行' }
])

const startDma = () => {
  dmaStep.value = 1
  setTimeout(() => {
    dmaStep.value = 2
    setTimeout(() => {
      dmaStep.value = 3
    }, 1000)
  }, 1000)
}

const resetDma = () => {
  dmaStep.value = 0
}

const nextInterrupt = () => {
  if (interruptStep.value < interruptFlow.value.length - 1) {
    interruptStep.value++
  }
}

const resetInterrupt = () => {
  interruptStep.value = 0
}
</script>

<style scoped>
.io-method-demo {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
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

.io-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.tab-btn.active {
  border-color: #ec4899;
  background: #fdf2f8;
}

.method-details {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.method-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.method-english {
  font-size: 13px;
  color: #64748b;
}

.detail-flow {
  margin-bottom: 16px;
}

.flow-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.node-box.active {
  border-color: #ec4899;
  background: #fdf2f8;
}

.node-num {
  width: 24px;
  height: 24px;
  background: #ec4899;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.node-text {
  font-size: 13px;
  color: #475569;
}

.flow-arrow {
  font-size: 18px;
  color: #cbd5e1;
}

.detail-comparison {
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.comp-grid {
  display: flex;
  gap: 16px;
}

.comp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comp-label {
  font-size: 11px;
  color: #64748b;
}

.comp-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.comp-value.高 { color: #dc2626; }
.comp-value.中 { color: #f59e0b; }
.comp-value.低 { color: #16a34a; }

.comparison-section {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.compare-table th,
.compare-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.compare-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #1e293b;
}

.compare-table td {
  color: #475569;
}

.dma-demo, .interrupt-demo {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.dma-title, .interrupt-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.dma-visual {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.device-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.device-name {
  font-size: 12px;
  color: #1e293b;
}

.dma-channel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.channel-step {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #dbeafe;
  border-radius: 4px;
  font-size: 10px;
}

.step-arrow {
  color: #3b82f6;
}

.dma-controls, .interrupt-controls {
  display: flex;
  gap: 8px;
  justify-content: center;
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

.btn:disabled {
  background: #94a3b8;
}

.interrupt-visual {
  margin-bottom: 16px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #e2e8f0;
}

.timeline-item.active {
  border-left-color: #ec4899;
  background: #fdf2f8;
}

.timeline-num {
  width: 24px;
  height: 24px;
  background: #ec4899;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.timeline-title {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.timeline-desc {
  font-size: 11px;
  color: #64748b;
}
</style>
