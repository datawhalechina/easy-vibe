<template>
  <div class="cpu-internal-demo">
    <div class="demo-title">CPU 内部微架构剖析</div>
    <div class="demo-subtitle">点击下方各个模块，查看其内部由哪些子电路构成以及工作原理</div>
    
    <div class="demo-container">
      <div class="cpu-chip">
        <div class="chip-title">CPU 核心 (Central Processing Unit)</div>
        
        <div class="bus-top address-bus" :class="{ active: currentModule === 'address_bus' }" @click="selectModule('address_bus')">地址总线 (Address Bus)</div>
        <div class="bus-top data-bus" :class="{ active: currentModule === 'data_bus' }" @click="selectModule('data_bus')">数据总线 (Data Bus)</div>

        <div class="cpu-layout">
          <!-- 左侧：控制单元 -->
          <div class="cu-section section-box" :class="{ active: currentModule === 'cu' }" @click.stop="selectModule('cu')">
            <h4 class="section-title">控制单元 (Control Unit)</h4>
            <div class="sub-modules">
              <div class="sub-mod" :class="{ active: currentModule === 'pc' }" @click.stop="selectModule('pc')">程序计数器 (PC)</div>
              <div class="sub-mod" :class="{ active: currentModule === 'ir' }" @click.stop="selectModule('ir')">指令寄存器 (IR)</div>
              <div class="sub-mod" :class="{ active: currentModule === 'decoder' }" @click.stop="selectModule('decoder')">指令译码器</div>
              <div class="sub-mod" :class="{ active: currentModule === 'clock' }" @click.stop="selectModule('clock')">时钟发生器</div>
            </div>
            <div class="control-lines">控制信号线 ↓</div>
          </div>

          <!-- 右侧：数据通道（ALU + 寄存器） -->
          <div class="datapath-section">
            <!-- 寄存器组 -->
            <div class="reg-section section-box" :class="{ active: currentModule === 'reg' }" @click.stop="selectModule('reg')">
              <h4 class="section-title">寄存器组 (Register File)</h4>
              <div class="sub-modules grid-2">
                <div class="sub-mod">通用寄存器 R0-R3</div>
                <div class="sub-mod">累加器 (ACC)</div>
              </div>
            </div>

            <!-- ALU -->
            <div class="alu-section section-box" :class="{ active: currentModule === 'alu' }" @click.stop="selectModule('alu')">
              <h4 class="section-title">算术逻辑单元 (ALU)</h4>
              <div class="sub-modules">
                <div class="sub-mod" :class="{ active: currentModule === 'adder' }" @click.stop="selectModule('adder')">加法器电路</div>
                <div class="sub-mod" :class="{ active: currentModule === 'flags' }" @click.stop="selectModule('flags')">状态标志 (Flags)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bus-bottom control-bus" :class="{ active: currentModule === 'control_bus' }" @click="selectModule('control_bus')">控制总线 (Control Bus)</div>
      </div>

      <!-- 右侧/下方详细说明面板 -->
      <div class="details-panel" v-if="currentModuleData">
        <h3>{{ currentModuleData.title }}</h3>
        <p class="desc">{{ currentModuleData.description }}</p>
        <div class="circuit-impl" v-if="currentModuleData.subCircuit">
          <h4><span class="icon">🔌</span> 底层子电路实现：</h4>
          <p>{{ currentModuleData.subCircuit }}</p>
        </div>
      </div>
      <div class="details-panel empty" v-else>
        <div class="empty-icon">🖱️</div>
        <p>点击左侧 CPU 内部结构图的各个模块，<br>深入探索其微观电路实现。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentModule = ref(null)

const moduleInfo = {
  // ALU 相关
  alu: {
    title: '算术逻辑单元 (ALU)',
    description: 'ALU 是 CPU 中负责进行数学运算（加减法）和逻辑运算（与、或、非、异或）的核心引擎。所有的高级数学计算最终都会被分解为 ALU 能够执行的这些基础操作。',
    subCircuit: '由海量的逻辑门组成。核心是半加器和全加器的级联（如行波进位加法器或超前进位加法器），并结合多路选择器（MUX）来决定当前是输出加法结果还是某种逻辑运算结果。'
  },
  adder: {
    title: '加法器电路 (Adder)',
    description: '负责执行二进制加法。',
    subCircuit: '底层由异或门（XOR）负责本位相加，与门（AND）和或门（OR）负责产生对高位的进位信号。几十个全加器串联即可实现 32/64 位数的加法。'
  },
  flags: {
    title: '状态标志寄存器 (Flags)',
    description: '记录上一次 ALU 运算的“副作用”特征，例如结果是否为零（Z）、是否产生进位（C）、符号是正还是负（S）、是否溢出（O）。它是实现 `if/else` 等条件跳转指令的核心物理依据。',
    subCircuit: '一组特定的触发器（Flip-Flops），每个触发器通过逻辑门直接连接在 ALU 的输出端电路上。'
  },

  // 寄存器相关
  reg: {
    title: '寄存器组 (Register File)',
    description: 'CPU 内部的高速“草稿本”。由于直接嵌在指令执行的数据通路中，其读写速度和 CPU 主频几乎一致。用来暂存 ALU 需要的输入数据和刚刚算出的输出结果。',
    subCircuit: '本质上是由成千上万个 D 型触发器（D Flip-Flop）按位宽（如 64 位）并列组合而成。配合多路选择器和地址译码电路，实现对特定“草稿本”的数据寻址读写。'
  },

  // 控制单元相关
  cu: {
    title: '控制单元 (Control Unit, CU)',
    description: '整个 CPU 的“大脑和总指挥”。它并不直接参与运算，而是负责从内存读取指令，翻译指令，并像“拉线木偶”一样向全芯片发出各种导通和关断电信号，指挥其余部件开始工作。',
    subCircuit: '通常存在有限状态机（FSM）或微程序的实现方式。本质上是一组庞大复杂的逻辑门网络和触发器组合，将输入的二进制指令（如 0x01）映射为激活对应模块的控制电平。'
  },
  pc: {
    title: '程序计数器 (Program Counter, PC)',
    description: '永远指向“下一条要执行的指令”在内存中的具体地址。每次成功执行完一条指令，它就会自动递增。当程序发生函数调用或循环跳转时，它的值会被强行改写。',
    subCircuit: '一个带有“自增电路（Incrementer）”的寄存器。通过内部的简单半加器加上时钟脉冲边界的触发来同步更新地址值。'
  },
  ir: {
    title: '指令寄存器 (Instruction Register, IR)',
    description: '暂存刚刚从内存中读出、当前正在处于“译码”阶段的那条二进制机器指令。',
    subCircuit: '同样是一排带写使能（Write-Enable）控制端的触发器（Flip-Flop），在"取指"周期时，写使能为1，锁存进指令数据。'
  },
  decoder: {
    title: '指令译码器 (Instruction Decoder)',
    description: '负责破译 IR 中的一长串 0 和 1 到底是什么意思。把二进制的机器码切分成“操作码”（做什么，如做加法）和“操作数”（对谁做，如寻址寄存器）。',
    subCircuit: '由大量的与门和非门组成的组合电路网络。比如输入操作码 0010，只有代表“ADD操作”的那根特定输出管脚会被置 1，其他管脚保持 0。'
  },
  clock: {
    title: '时钟发生器 (Clock)',
    description: 'CPU 的心脏节拍器。发出持续的方波信号，同步全系统各个部件的工作节奏。每一次时钟波形的上升沿，所有的触发器才会统一改变锁存状态（即节拍）。',
    subCircuit: '外部主板上的石英晶振产生极准的基础震荡信号，结合 CPU 内部的锁相环（PLL）倍频电路生成极高频率的脉冲方波。'
  },

  // 总线
  address_bus: {
    title: '地址总线 (Address Bus)',
    description: '单向传输总线。CPU 通过这组电线，将它想访问的内存单元或 I/O 设备地址发送出去。地址总线的宽度决定了 CPU 最大能寻址多少内存（比如 32 位地址总线最多覆盖 4GB 寻址）。',
    subCircuit: '物理上就是一块芯片引出的几十根极其细微的平行导线。通常受到三态门缓冲器（Tri-state Buffer）所驱动。'
  },
  data_bus: {
    title: '数据总线 (Data Bus)',
    description: '双向传输总线。在这组电线上，数据可以从 CPU 流向内存，也可以从内存流回 CPU。它的宽度就是我们平常所说的 32位/64位 处理器一次性处理的数据通路宽度。',
    subCircuit: '同样是平行的导电线路，但两端接有方向控制引脚的三态门，确保不会由于多方同时施加高低电平导致设备短路。'
  },
  control_bus: {
    title: '控制总线 (Control Bus)',
    description: '混合传输总线，承载各种不同类型的核心控制信号：例如“我要读(Read)”、“我要写(Write)”、“外设的中断请求”、“等待反馈”等。',
    subCircuit: '每一条线路一般都有单独而明确的功能分配，直接由控制单元（CU）的逻辑组合端引出，连接并支配外部的所有硬件。'
  }
}

const currentModuleData = computed(() => moduleInfo[currentModule.value])

function selectModule(mod) {
  if (currentModule.value === mod) {
    currentModule.value = null
  } else {
    currentModule.value = mod
  }
}
</script>

<style scoped>
.cpu-internal-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-title {
  text-align: center;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.demo-subtitle {
  text-align: center;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.demo-container {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

.cpu-chip {
  flex: 3;
  background: var(--vp-c-bg);
  border: 3px solid #64748b;
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chip-title {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #64748b;
  color: #fff;
  padding: 2px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85rem;
  white-space: nowrap;
}

.bus-top, .bus-bottom {
  text-align: center;
  padding: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px dashed var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
}

.bus-top:hover, .bus-bottom:hover, .bus-top.active, .bus-bottom.active {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.cpu-layout {
  display: flex;
  gap: 1rem;
  flex: 1;
  min-height: 280px;
}

.section-box {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
}

.section-box:hover, .section-box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.cu-section { margin-top: 0; }
.cu-section:hover, .cu-section.active { border-color: #3b82f6; }
.reg-section:hover, .reg-section.active { border-color: #8b5cf6; }
.alu-section:hover, .alu-section.active { border-color: #f59e0b; }

.section-title {
  margin: 0 0 0.8rem 0;
  font-size: 0.95rem;
  text-align: center;
  color: var(--vp-c-text-1);
}

.cu-section {
  flex: 5;
}

.datapath-section {
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sub-modules {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sub-mod {
  font-size: 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.sub-mod:hover, .sub-mod.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.cu-section .sub-mod:hover, .cu-section .sub-mod.active { background: #3b82f6; border-color: #3b82f6; }
.alu-section .sub-mod:hover, .alu-section .sub-mod.active { background: #f59e0b; border-color: #f59e0b; }
.reg-section .sub-mod:hover, .reg-section .sub-mod.active { background: #8b5cf6; border-color: #8b5cf6; }


.control-lines {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
  font-family: monospace;
}

.details-panel {
  flex: 2;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.details-panel h3 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.details-panel .desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.circuit-impl {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-2);
  padding: 1rem;
  border-radius: 0 4px 4px 0;
  margin-top: auto;
}

.circuit-impl h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.circuit-impl p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.empty {
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none;
  border: 1px dashed var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-3);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@media (max-width: 800px) {
  .demo-container {
    flex-direction: column;
  }
  .cpu-layout {
    flex-direction: column;
  }
}
</style>
