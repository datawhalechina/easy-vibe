<template>
  <div class="code-to-instruction-demo">
    <h4>🔗 从代码到指令：一行代码的翻译之旅</h4>
    <p class="desc">点击每个阶段，看你写的代码如何一步步变成 CPU 能执行的指令</p>

    <div class="example-selector">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        :class="['ex-btn', { active: selectedExample === i }]"
        @click="selectedExample = i"
      >
        <code>{{ ex.code }}</code>
      </button>
    </div>

    <div class="translation-chain">
      <div
        v-for="(stage, j) in examples[selectedExample].stages"
        :key="j"
        :class="['stage-card', { active: activeStage === j }]"
        @click="activeStage = j"
      >
        <div class="stage-header">
          <span class="stage-num">{{ j + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
        </div>
        <pre class="stage-code">{{ stage.content }}</pre>
        <div v-if="activeStage === j" class="stage-explain">
          {{ stage.explain }}
        </div>
      </div>

      <div
        v-for="j in examples[selectedExample].stages.length - 1"
        :key="'arrow-' + j"
        class="chain-arrow"
        :style="{ order: j * 2 }"
      >
        ↓
      </div>
    </div>

    <div class="key-insight">
      <div class="insight-title">💡 关键理解</div>
      <div class="insight-text">
        指令集就是 CPU 的「API」——它定义了 CPU 能听懂的所有命令。
        编译器的工作就是把你写的高级语言「翻译」成这套 API 的调用序列。
        不同的 CPU（x86、ARM）有不同的指令集，就像不同的服务有不同的 API。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedExample = ref(0)
const activeStage = ref(0)

const examples = [
  {
    code: 'int a = 10 + 5;',
    stages: [
      {
        name: '你写的代码',
        content: 'int a = 10 + 5;',
        explain:
          '这是你在编辑器里写的高级语言代码。对人类来说很好懂，但 CPU 完全看不懂——它不认识 int、也不知道 + 是什么。'
      },
      {
        name: '编译器翻译成汇编',
        content: 'MOV  R1, #10    ; 把 10 放入寄存器 R1\nMOV  R2, #5     ; 把 5 放入寄存器 R2\nADD  R3, R1, R2 ; R3 = R1 + R2\nSTORE R3, [a]   ; 把结果存到变量 a 的内存地址',
        explain:
          '编译器把一行高级代码拆成了 4 条汇编指令。每条指令只做一件最简单的事：搬数据、做加法、存结果。这就是 CPU 的「能力粒度」。'
      },
      {
        name: '汇编器转成机器码',
        content: '0001 0001 0000 1010  → MOV R1, #10\n0001 0010 0000 0101  → MOV R2, #5\n0010 0011 0001 0010  → ADD R3, R1, R2\n0100 0011 1000 0000  → STORE R3, [a]',
        explain:
          '汇编器把每条汇编指令编码成二进制数字。操作码（前几位）告诉 CPU「做什么」，操作数（后面的位）告诉 CPU「对谁做」。这就是 CPU 真正执行的东西。'
      },
      {
        name: 'CPU 逐条执行',
        content: '时钟 1: 取指 → 译码 → 执行 MOV R1, #10\n时钟 2: 取指 → 译码 → 执行 MOV R2, #5\n时钟 3: 取指 → 译码 → 执行 ADD R3, R1, R2\n时钟 4: 取指 → 译码 → 执行 STORE R3, [a]',
        explain:
          'CPU 按顺序从内存取出每条指令，译码后执行。每个时钟周期处理一条指令（简化模型）。4 条指令执行完，变量 a 的值就是 15 了。'
      }
    ]
  },
  {
    code: 'if (x > 0) y = 1;',
    stages: [
      {
        name: '你写的代码',
        content: 'if (x > 0) y = 1;',
        explain:
          '一个简单的条件判断。人类一眼就懂，但 CPU 没有「if」的概念——它只会比较和跳转。'
      },
      {
        name: '编译器翻译成汇编',
        content: 'LOAD R1, [x]     ; 从内存读取 x 的值\nCMP  R1, #0       ; 比较 R1 和 0\nBLE  skip         ; 如果 ≤ 0，跳过下面\nMOV  R2, #1       ; R2 = 1\nSTORE R2, [y]     ; 把 1 存到 y\nskip:             ; 跳转目标',
        explain:
          '编译器把 if 语句拆成了「比较 + 条件跳转」。CMP 指令比较两个值并设置标志位，BLE 根据标志位决定是否跳过赋值代码。这就是 CPU 实现条件逻辑的方式。'
      },
      {
        name: '汇编器转成机器码',
        content: '0011 0001 1000 0000  → LOAD R1, [x]\n0101 0001 0000 0000  → CMP R1, #0\n0110 0000 0000 0011  → BLE +3（跳过3条）\n0001 0010 0000 0001  → MOV R2, #1\n0100 0010 1000 0001  → STORE R2, [y]',
        explain:
          '注意 BLE 指令的操作数是「+3」——这是一个相对地址偏移，告诉 CPU 向前跳 3 条指令。这就是「相对寻址」的实际应用。'
      },
      {
        name: 'CPU 逐条执行',
        content: '假设 x = 5（大于 0）:\n→ LOAD: 读取 x=5 到 R1\n→ CMP:  比较 5 > 0，设置标志位\n→ BLE:  条件不满足，不跳转\n→ MOV:  R2 = 1\n→ STORE: y = 1 ✅',
        explain:
          '因为 x=5 大于 0，BLE 的条件不满足，所以 CPU 继续执行下面的赋值。如果 x=0，BLE 会跳过赋值，直接到 skip 标签处。'
      }
    ]
  }
]
</script>

<style scoped>
.code-to-instruction-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }

.example-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.ex-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.ex-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.ex-btn code { font-size: 13px; }

.translation-chain {
  display: flex; flex-direction: column; gap: 0; margin-bottom: 16px;
}
.stage-card {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden; cursor: pointer;
  transition: all 0.2s; order: 0;
}
.stage-card:nth-child(1) { order: 0; }
.stage-card:nth-child(3) { order: 2; }
.stage-card:nth-child(5) { order: 4; }
.stage-card:nth-child(7) { order: 6; }
.stage-card.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 1px var(--vp-c-brand-1); }
.stage-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.stage-num {
  width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand-1);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
}
.stage-name { font-size: 13px; font-weight: 600; }
.stage-code {
  padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5;
  white-space: pre-wrap; max-height: 120px; overflow-y: auto;
}
.stage-explain {
  padding: 8px 12px; font-size: 12px; line-height: 1.6;
  background: var(--vp-c-brand-soft); border-top: 1px solid var(--vp-c-divider);
}
.chain-arrow {
  text-align: center; font-size: 18px; color: var(--vp-c-brand-1);
  font-weight: 700; padding: 4px 0;
}

.key-insight {
  padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px;
}
.insight-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.insight-text { font-size: 13px; line-height: 1.6; }
</style>
