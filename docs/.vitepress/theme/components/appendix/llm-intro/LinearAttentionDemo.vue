<template>
  <div class="linear-attention-demo">
    <div class="mode-switch">
      <button
        :class="{ active: mode === 'standard' }"
        @click="mode = 'standard'"
      >
        标准 Attention (网状连接)
      </button>
      <button :class="{ active: mode === 'linear' }" @click="mode = 'linear'">
        线性 Attention (接力传递)
      </button>
    </div>

    <div class="visual-area">
      <div class="control-panel">
        <div class="label">参与者数量 (N): {{ nValue }}</div>
        <input
          type="range"
          v-model="nValue"
          min="3"
          max="12"
          step="1"
          class="slider"
        />
      </div>

      <div class="viz-canvas-container">
        <!-- Canvas for dynamic drawing -->
        <svg class="viz-svg" viewBox="0 0 400 300">
          <!-- STANDARD MODE: Mesh / Web -->
          <g v-if="mode === 'standard'">
            <!-- Active Query Animation -->
            <g class="active-query-scan">
              <!-- Current processing node (last one) -->
              <circle
                :cx="circleNodes[circleNodes.length - 1].x"
                :cy="circleNodes[circleNodes.length - 1].y"
                r="16"
                fill="none"
                stroke="var(--vp-c-brand)"
                stroke-width="3"
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  values="12;20;12"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              <!-- Scanning rays from last node to all others -->
              <line
                v-for="(node, idx) in circleNodes.slice(
                  0,
                  circleNodes.length - 1
                )"
                :key="'ray' + idx"
                :x1="circleNodes[circleNodes.length - 1].x"
                :y1="circleNodes[circleNodes.length - 1].y"
                :x2="node.x"
                :y2="node.y"
                stroke="var(--vp-c-brand)"
                stroke-width="2"
                stroke-dasharray="4"
                class="scanning-ray"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="20;0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </g>

            <!-- Background Mesh -->
            <g class="connections">
              <line
                v-for="(link, idx) in meshLinks"
                :key="idx"
                :x1="link.x1"
                :y1="link.y1"
                :x2="link.x2"
                :y2="link.y2"
                class="connection-line"
                :style="{ animationDelay: idx * 0.05 + 's' }"
              />
            </g>
            <!-- Draw Nodes -->
            <circle
              v-for="(node, idx) in circleNodes"
              :key="idx"
              :cx="node.x"
              :cy="node.y"
              r="12"
              class="node-circle standard"
              :class="{ 'current-node': idx === circleNodes.length - 1 }"
            />
            <text
              v-for="(node, idx) in circleNodes"
              :key="'t' + idx"
              :x="node.x"
              :y="node.y"
              dy="4"
              text-anchor="middle"
              class="node-text"
            >
              {{ idx + 1 }}
            </text>
          </g>

          <!-- LINEAR MODE: Relay / Chain -->
          <g v-else>
            <!-- Relay Path -->
            <line
              x1="40"
              y1="150"
              :x2="40 + (nValue - 1) * 60"
              y2="150"
              class="relay-track"
            />

            <!-- Passing Message Animation -->
            <circle cx="0" cy="0" r="8" class="message-token">
              <animateMotion
                :path="relayPath"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <!-- Nodes -->
            <g v-for="(node, idx) in linearNodes" :key="idx">
              <circle
                :cx="node.x"
                :cy="node.y"
                r="12"
                class="node-circle linear"
              />
              <text
                :x="node.x"
                :y="node.y"
                dy="4"
                text-anchor="middle"
                class="node-text"
              >
                {{ idx + 1 }}
              </text>
              <!-- State Box (Memory) -->
              <rect
                :x="node.x - 15"
                :y="node.y + 20"
                width="30"
                height="20"
                rx="4"
                class="memory-box"
              />
              <text
                :x="node.x"
                :y="node.y + 34"
                text-anchor="middle"
                font-size="8"
                fill="white"
              >
                Mem
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div class="stats-panel">
        <div class="stat-item">
          <div class="stat-label">连接/操作次数</div>
          <div
            class="stat-value"
            :class="mode === 'standard' ? 'text-red' : 'text-green'"
          >
            {{ connectionCount }}
          </div>
        </div>
        <div class="stat-desc">
          <span v-if="mode === 'standard'">
            每个人都要找其他人。<br />N={{ nValue }} 时，连接数高达
            {{ nValue * nValue }}！
          </span>
          <span v-else>
            每个人只传给下一个人。<br />N={{ nValue }} 时，操作数仅为
            {{ nValue }}。
          </span>
        </div>
      </div>
    </div>

    <div class="analogy-box">
      <div class="analogy-title">💡 核心区别：要不要回头看？</div>
      <div v-if="mode === 'standard'">
        <b>回看模式 (Retrospective)</b>：
        <br />想象你在考试。每做一道新题，你都要<b>把之前做过的所有题目再检查一遍</b>，确认有没有关联。
        <br />题目越多，你需要检查的次数就越多，最后累死在检查上。
      </div>
      <div v-else>
        <b>状态模式 (Recurrent)</b>： <br />想象你在跑步。你不需要记得前 100
        步每一步踩在哪，你只需要知道<b>现在的速度和位置</b>（State）。
        <br />跑第 1000 步和跑第 1 步一样轻松，因为你不需要回头。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('standard')
const nValue = ref(5)

// Coordinates for Standard Mode (Circle Layout)
const circleNodes = computed(() => {
  const nodes = []
  const centerX = 200
  const centerY = 150
  const radius = 100

  for (let i = 0; i < nValue.value; i++) {
    const angle = (i / nValue.value) * 2 * Math.PI - Math.PI / 2
    nodes.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    })
  }
  return nodes
})

// Links for Standard Mode (All-to-All)
const meshLinks = computed(() => {
  const links = []
  const nodes = circleNodes.value
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      links.push({
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y
      })
    }
  }
  return links
})

// Coordinates for Linear Mode (Line Layout)
const linearNodes = computed(() => {
  const nodes = []
  const startX = 40
  const gap = 60
  const y = 150

  for (let i = 0; i < nValue.value; i++) {
    nodes.push({
      x: startX + i * gap,
      y: y
    })
  }
  return nodes
})

// SVG Path for animation in Linear Mode
const relayPath = computed(() => {
  const nodes = linearNodes.value
  if (nodes.length < 2) return ''
  // Start from first node, go to last node
  return `M ${nodes[0].x} ${nodes[0].y} L ${nodes[nodes.length - 1].x} ${nodes[nodes.length - 1].y}`
})

const connectionCount = computed(() => {
  if (mode.value === 'standard') {
    return nValue.value * nValue.value
  } else {
    return nValue.value
  }
})
</script>

<style scoped>
.linear-attention-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  user-select: none;
}

.mode-switch {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.mode-switch button {
  padding: 8px 20px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.mode-switch button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px var(--vp-c-brand-dimm);
}

.visual-area {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
}

.slider {
  accent-color: var(--vp-c-brand);
  width: 150px;
}

.viz-canvas-container {
  display: flex;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}

.viz-svg {
  width: 100%;
  max-width: 400px;
  height: 300px;
}

/* SVG Elements */
.node-circle {
  fill: var(--vp-c-bg);
  stroke-width: 2;
}

.node-circle.standard {
  stroke: var(--vp-c-red);
}

.node-circle.linear {
  stroke: var(--vp-c-green);
}

.node-text {
  font-size: 10px;
  fill: var(--vp-c-text-1);
  font-weight: bold;
}

.connection-line {
  stroke: var(--vp-c-red);
  stroke-width: 1;
  opacity: 0;
  animation: fadeInLine 0.5s forwards;
}

@keyframes fadeInLine {
  to {
    opacity: 0.3;
  }
}

.relay-track {
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  stroke-dasharray: 4;
}

.message-token {
  fill: var(--vp-c-green);
}

.memory-box {
  fill: var(--vp-c-green);
  opacity: 0.8;
}

/* Stats */
.stats-panel {
  text-align: center;
  margin-top: 15px;
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
  font-family: monospace;
}

.text-red {
  color: var(--vp-c-red);
}
.text-green {
  color: var(--vp-c-green);
}

.stat-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  margin-top: 5px;
  line-height: 1.5;
}

/* Analogy */
.analogy-box {
  margin-top: 20px;
  background: var(--vp-c-bg-mute);
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9em;
  line-height: 1.6;
  border-left: 4px solid var(--vp-c-brand);
}

.analogy-title {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--vp-c-brand);
}
</style>
