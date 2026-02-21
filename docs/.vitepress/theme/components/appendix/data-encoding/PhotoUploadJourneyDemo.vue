<template>
  <div class="journey-demo">
    <!-- Step tabs -->
    <div class="step-tabs">
      <div
        v-for="(step, i) in steps"
        :key="i"
        :class="['step-tab', { active: currentStep >= i, current: currentStep === i }]"
        @click="goToStep(i)"
      >
        <span class="tab-num">{{ i + 1 }}</span>
        <span class="tab-label">{{ step.label }}</span>
      </div>
    </div>

    <!-- Main canvas -->
    <div class="journey-canvas" :style="{ borderColor: currentStepData.color + '88' }">
      <!-- Scene -->
      <div class="scene">
        <div class="scene-actors">
          <div
            v-for="(actor, i) in currentStepData.actors"
            :key="i"
            class="actor"
            :class="{ highlighted: actor.highlight, animated: actor.animated }"
          >
            <div class="actor-icon">{{ actor.icon }}</div>
            <div class="actor-name">{{ actor.name }}</div>
            <div v-if="actor.value" class="actor-value">{{ actor.value }}</div>
          </div>

          <!-- Arrows between actors -->
          <div
            v-for="(arrow, i) in currentStepData.arrows"
            :key="'arrow' + i"
            class="flow-arrow"
            :class="{ animated: isRunning }"
          >
            <span class="arrow-label">{{ arrow.label }}</span>
            <span class="arrow-sym">→</span>
          </div>
        </div>
      </div>

      <!-- Explanation panel -->
      <div class="explanation-panel" :style="{ borderLeftColor: currentStepData.color }">
        <div class="exp-header">
          <span class="exp-icon">{{ currentStepData.icon }}</span>
          <span class="exp-title">{{ currentStepData.title }}</span>
        </div>
        <ul class="exp-points">
          <li v-for="(pt, i) in currentStepData.points" :key="i" class="exp-point" :class="{ visible: visiblePoints.includes(i) }">
            {{ pt }}
          </li>
        </ul>
        <div class="exp-insight">💡 {{ currentStepData.insight }}</div>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <button class="ctrl-btn secondary" :disabled="currentStep === 0" @click="goToStep(currentStep - 1)">← 上一步</button>
      <button class="ctrl-btn primary" @click="runCurrentStep" :disabled="isRunning">
        {{ isRunning ? '进行中...' : currentStep === steps.length - 1 ? '🔄 重新演示' : '▶ 执行这一步' }}
      </button>
      <button class="ctrl-btn secondary" :disabled="currentStep >= steps.length - 1" @click="goToStep(currentStep + 1)">下一步 →</button>
    </div>

    <!-- Overall insight -->
    <div class="final-insight">
      🎯 <strong>三步三役</strong>：<strong>编码</strong>负责"翻译成机器语言"，<strong>存储</strong>负责"记住它"，<strong>传输</strong>负责"送到目的地"。缺了任何一环，这张照片就不会出现在云端。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const isRunning = ref(false)
const visiblePoints = ref([])

const steps = [
  {
    label: '编码',
    icon: '🔢',
    title: '第一步：编码 — 把光变成数字',
    color: '#7c3aed',
    actors: [
      { icon: '☀️', name: '光线', highlight: false },
      { icon: '📷', name: '传感器', highlight: true, animated: true },
      { icon: '📊', name: 'RAW 数据', value: '24MB / 4860万像素' },
      { icon: '🗜️', name: 'JPEG 压缩', highlight: true },
      { icon: '📄', name: 'JPEG 文件', value: '3.2MB（压缩后）' }
    ],
    arrows: [
      { label: 'ADC 采样' },
      { label: '像素编码' },
      { label: '有损压缩' }
    ],
    points: [
      '📸 相机传感器把光信号转换成 RGB 数值（每个像素 3 × 8 bit = 24 bit）',
      '🔢 整张照片 4860 万像素 × 24 bit ≈ 140 MB 的原始数据',
      '🗜️ JPEG 算法分析像素之间的相似性，去掉人眼不敏感的信息，压缩到 3 MB'
    ],
    insight: '压缩 ≠ 降质，好的压缩算法让你几乎看不出差别，但文件小了 97%。'
  },
  {
    label: '存储',
    icon: '💾',
    title: '第二步：存储 — 先闪存后闪存',
    color: '#059669',
    actors: [
      { icon: '📄', name: 'JPEG（已编码）', value: '3.2 MB' },
      { icon: '🧠', name: 'RAM（内存）', value: '写入耗时：~1 ms', highlight: true, animated: true },
      { icon: '💾', name: '闪存（Flash）', value: '写入耗时：~10 ms', highlight: true }
    ],
    arrows: [
      { label: '临时缓存' },
      { label: '持久写入' }
    ],
    points: [
      '⚡ 图像先写进内存（RAM）——速度极快，但断电消失',
      '💾 内存中的数据再异步写入闪存（手机存储）——速度慢一些，但永久保存',
      '🔒 写完后操作系统标记文件"安全"，你才能看到相册里的新照片'
    ],
    insight: '为什么拍完不能马上拔电池？因为数据可能还在内存里，还没写进闪存！'
  },
  {
    label: '传输',
    icon: '📡',
    title: '第三步：传输 — 数据"旅行"到云端',
    color: '#d97706',
    actors: [
      { icon: '💾', name: '闪存（JPEG）', value: '3.2 MB' },
      { icon: '📶', name: 'Wi-Fi / 4G', value: 'TCP 分包传输', highlight: true, animated: true },
      { icon: '☁️', name: '云端服务器', value: '写入云存储', highlight: true }
    ],
    arrows: [
      { label: '分包 + 加密' },
      { label: '校验 + 重组' }
    ],
    points: [
      '📦 3.2 MB 的 JPEG 文件被 TCP 协议切成数千个小"数据包"',
      '🔐 每个包都有序号和校验码，丢了会自动重传——所以传输是可靠的',
      '☁️ 云端收齐所有包，重新拼成完整 JPEG，写入对象存储（如 OSS/S3）'
    ],
    insight: '上传时你以为数据是"整个发过去"的，其实是"切碎了一片片送过去"。'
  }
]

const currentStepData = computed(() => steps[currentStep.value])

function goToStep(i) {
  currentStep.value = i
  visiblePoints.value = []
  isRunning.value = false
}

async function runCurrentStep() {
  if (currentStep.value === steps.length - 1 && !isRunning.value && visiblePoints.value.length === steps[currentStep.value].points.length) {
    goToStep(0)
    return
  }
  isRunning.value = true
  visiblePoints.value = []
  const pts = steps[currentStep.value].points
  for (let i = 0; i < pts.length; i++) {
    await new Promise(r => setTimeout(r, 600))
    visiblePoints.value.push(i)
  }
  isRunning.value = false
  // Auto advance after last point, unless last step
  if (currentStep.value < steps.length - 1) {
    await new Promise(r => setTimeout(r, 1000))
    currentStep.value++
    visiblePoints.value = []
  }
}
</script>

<style scoped>
.journey-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Step tabs */
.step-tabs {
  display: flex;
  gap: 0.5rem;
}

.step-tab {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
  opacity: 0.6;
}

.step-tab.active { opacity: 1; border-color: var(--vp-c-brand); }
.step-tab.current { background: var(--vp-c-brand-soft); }

.tab-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-tab.active .tab-num { background: var(--vp-c-brand); color: white; }
.tab-label { font-weight: bold; }

/* Canvas */
.journey-canvas {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid;
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.4s;
}

/* Scene */
.scene { padding: 0.5rem 0; }

.scene-actors {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  min-width: 80px;
  transition: all 0.3s;
  text-align: center;
}

.actor.highlighted { border-color: var(--vp-c-brand); background: var(--vp-c-brand-soft); }
.actor.animated { animation: pulse-gentle 1.5s ease-in-out infinite; }

@keyframes pulse-gentle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

.actor-icon { font-size: 1.6rem; }
.actor-name { font-size: 0.72rem; font-weight: bold; margin-top: 2px; }
.actor-value { font-size: 0.65rem; color: var(--vp-c-text-2); margin-top: 2px; white-space: nowrap; }

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.arrow-label { font-size: 0.65rem; color: var(--vp-c-text-3); white-space: nowrap; }
.arrow-sym { font-size: 1.2rem; color: var(--vp-c-brand); }

/* Explanation */
.explanation-panel {
  border-left: 4px solid;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0 6px 6px 0;
  transition: border-left-color 0.4s;
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.exp-icon { font-size: 1.2rem; }
.exp-title { font-weight: bold; font-size: 0.95rem; }

.exp-points { list-style: none; padding: 0; margin: 0 0 0.6rem 0; display: flex; flex-direction: column; gap: 0.4rem; }

.exp-point {
  font-size: 0.83rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.4s ease;
}

.exp-point.visible { opacity: 1; transform: translateX(0); }

.exp-insight {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* Controls */
.controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.ctrl-btn {
  padding: 0.45rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  font-size: 0.88rem;
  transition: all 0.2s;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  flex: 1;
  font-weight: bold;
}

.ctrl-btn.secondary { background: var(--vp-c-bg); }
.ctrl-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.final-insight {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
</style>
