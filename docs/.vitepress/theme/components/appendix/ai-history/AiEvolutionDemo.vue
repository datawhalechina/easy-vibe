<template>
  <div class="ai-evolution-demo">
    <!-- Timeline -->
    <div class="timeline-container">
      <div class="timeline-track"></div>
      <button
        v-for="(stage, index) in stages"
        :key="index"
        class="timeline-node"
        :class="{
          active: currentStage === index,
          passed: currentStage > index
        }"
        @click="currentStage = index"
      >
        <div class="node-dot">
          <div class="inner-dot"></div>
        </div>
        <div class="node-content">
          <span class="year-badge">{{ stage.year }}</span>
          <span class="node-label">{{ stage.label }}</span>
        </div>
      </button>
    </div>

    <!-- Content -->
    <div class="content-wrapper">
      <transition name="fade-slide" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <div class="header-section">
            <h3>
              <span class="stage-index"
                >{{ indexToRoman(currentStage + 1) }}.</span
              >
              {{ stages[currentStage].title }}
            </h3>
            <p>{{ stages[currentStage].desc }}</p>
          </div>

          <div class="visualization-grid">
            <!-- Concept/Logic View -->
            <div class="mac-window concept-window">
              <div class="window-bar">
                <div class="traffic-lights">
                  <span class="light red"></span>
                  <span class="light yellow"></span>
                  <span class="light green"></span>
                </div>
                <div class="window-title">Core Logic</div>
              </div>
              <div class="concept-canvas">
                <!-- Stage 0: Symbolism -->
                <div v-if="currentStage === 0" class="vis-symbolism">
                  <div class="logic-gate">
                    <div class="input-group">
                      <span class="input-val">A: True</span>
                      <span class="input-val">B: False</span>
                    </div>
                    <div class="gate-box">AND Rule</div>
                    <div class="output-val">Output: False</div>
                  </div>
                  <div class="math-note">If A and B then C</div>
                </div>

                <!-- Stage 1: Expert Systems -->
                <div v-if="currentStage === 1" class="vis-expert">
                  <div class="decision-tree">
                    <div class="tree-node root">Is it raining?</div>
                    <div class="branches">
                      <div class="branch">
                        <span class="condition">Yes</span>
                        <div class="tree-node leaf">Take Umbrella</div>
                      </div>
                      <div class="branch">
                        <span class="condition">No</span>
                        <div class="tree-node leaf">Go Out</div>
                      </div>
                    </div>
                  </div>
                  <div class="kb-note">Knowledge Base + Inference Engine</div>
                </div>

                <!-- Stage 2: Deep Learning -->
                <div v-if="currentStage === 2" class="vis-dl">
                  <div class="neural-net">
                    <div class="layer input">
                      <div class="neuron" v-for="n in 3" :key="`i-${n}`"></div>
                    </div>
                    <div class="layer hidden">
                      <div class="neuron" v-for="n in 4" :key="`h-${n}`"></div>
                    </div>
                    <div class="layer output">
                      <div class="neuron" v-for="n in 2" :key="`o-${n}`"></div>
                    </div>
                    <!-- Connections drawn via CSS/SVG ideally, simplified here -->
                    <svg class="connections">
                      <line x1="10" y1="20" x2="60" y2="10" />
                      <line x1="10" y1="20" x2="60" y2="30" />
                      <!-- Abstract lines -->
                    </svg>
                  </div>
                  <div class="dl-note">Feature Extraction (Black Box)</div>
                </div>

                <!-- Stage 3: GenAI -->
                <div v-if="currentStage === 3" class="vis-genai">
                  <div class="transformer-block">
                    <div class="block-layer attn">Self-Attention</div>
                    <div class="block-layer ff">Feed Forward</div>
                    <div class="block-layer norm">Norm & Add</div>
                  </div>
                  <div class="chat-sim">
                    <div class="msg user">"Draw a cat"</div>
                    <div class="msg ai">Generates 🐱...</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Application/Impact View -->
            <div class="mac-window app-window">
              <div class="window-bar">
                <div class="window-title">Real-world Impact</div>
              </div>
              <div class="app-canvas">
                <div class="impact-card">
                  <div class="impact-icon">{{ stages[currentStage].icon }}</div>
                  <div class="impact-title">
                    {{ stages[currentStage].appTitle }}
                  </div>
                  <div class="impact-desc">
                    {{ stages[currentStage].appDesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const indexToRoman = (num) => {
  const map = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }
  return map[num] || num
}

const stages = [
  {
    year: '1950s-1970s',
    label: 'Symbolism',
    title: 'The Dawn: Logic & Rules',
    desc: 'AI started as "Symbolic AI". Scientists believed intelligence could be described by formal logic and rules. If we can write down all the rules of the world, a computer can be intelligent.',
    icon: '♟️',
    appTitle: 'Chess & Logic',
    appDesc:
      'Programs could solve logic puzzles and play simple chess, but failed at "common sense" or recognizing a cat in a photo.'
  },
  {
    year: '1980s-1990s',
    label: 'Expert Systems',
    title: 'Knowledge Engineering',
    desc: 'The era of "Expert Systems". We tried to hard-code human expertise (e.g., medical diagnosis rules) into databases. Useful for specific domains, but brittle and hard to maintain.',
    icon: '🏥',
    appTitle: 'MYCIN / Deep Blue',
    appDesc:
      'Systems that could diagnose blood infections or beat Garry Kasparov at chess (Deep Blue, 1997), but still lacked true learning capability.'
  },
  {
    year: '2010s',
    label: 'Deep Learning',
    title: 'Connectionism & Big Data',
    desc: 'The breakthrough of Neural Networks. Inspired by the human brain, computers learned patterns from massive data instead of being told rules. AlexNet (2012) changed everything.',
    icon: '🧠',
    appTitle: 'AlphaGo & FaceID',
    appDesc:
      'AI learned to see (ImageNet), hear (Siri), and play Go (AlphaGo). It surpassed humans in specific perceptual tasks.'
  },
  {
    year: '2020s+',
    label: 'Generative AI',
    title: 'Generative Intelligence (LLMs)',
    desc: 'The Transformer architecture allowed AI to understand context and generate new content. AI moved from "classifying" (is this a cat?) to "creating" (draw a cat).',
    icon: '✨',
    appTitle: 'ChatGPT & Midjourney',
    appDesc:
      'AI that can write code, poetry, paint images, and reason across multiple domains. A step towards AGI (General Intelligence).'
  }
]
</script>

<style scoped>
.ai-evolution-demo {
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  margin: 2rem 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
}

/* Reusing Timeline Styles from FrontendEvolutionDemo for consistency */
.timeline-container {
  padding: 2rem 1rem 1rem;
  background: linear-gradient(to bottom, var(--vp-c-bg-soft), var(--vp-c-bg));
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
}

.timeline-track {
  position: absolute;
  top: 2.5rem;
  left: 3rem;
  right: 3rem;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.timeline-node {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0;
  width: 25%;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.timeline-node:hover {
  opacity: 0.9;
}
.timeline-node.active,
.timeline-node.passed {
  opacity: 1;
}

.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-text-3);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.inner-dot {
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--vp-c-brand);
  transition: all 0.3s;
}

.timeline-node.active .node-dot {
  border-color: var(--vp-c-brand);
  transform: scale(1.3);
  box-shadow: 0 0 0 4px var(--vp-c-bg-soft);
}
.timeline-node.active .inner-dot {
  width: 8px;
  height: 8px;
}
.timeline-node.passed .node-dot {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
}

.node-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.year-badge {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.node-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Content Area */
.content-wrapper {
  padding: 2rem;
  min-height: 400px;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.header-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    120deg,
    #10b981,
    #3b82f6
  ); /* Green to Blue for AI */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stage-index {
  color: var(--vp-c-text-3);
  -webkit-text-fill-color: var(--vp-c-text-3);
  margin-right: 0.5rem;
  font-weight: normal;
}
.header-section p {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Visualization */
.visualization-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: stretch;
}

@media (max-width: 768px) {
  .visualization-grid {
    grid-template-columns: 1fr;
  }
}

.mac-window {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  transition: transform 0.3s;
}
.mac-window:hover {
  transform: translateY(-5px);
}

.concept-window {
  background: #f8fafc;
}
.app-window {
  background: white;
}

.window-bar {
  padding: 0.8rem 1rem;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  position: relative;
}

.traffic-lights {
  display: flex;
  gap: 6px;
}
.light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.light.red {
  background: #ff5f56;
}
.light.yellow {
  background: #ffbd2e;
}
.light.green {
  background: #27c93f;
}

.window-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.concept-canvas,
.app-canvas {
  padding: 2rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

/* Visualizations */
/* Symbolism */
.logic-gate {
  border: 2px solid #334155;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background: white;
}
.input-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-family: monospace;
}
.gate-box {
  background: #334155;
  color: white;
  padding: 4px 10px;
  margin: 0.5rem 0;
  border-radius: 4px;
}
.math-note {
  margin-top: 1rem;
  font-family: monospace;
  color: #64748b;
  font-size: 0.8rem;
}

/* Expert Systems */
.decision-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.tree-node {
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 20px;
  background: white;
  font-size: 0.8rem;
}
.tree-node.root {
  border-color: #3b82f6;
  color: #3b82f6;
  font-weight: bold;
}
.branches {
  display: flex;
  gap: 2rem;
}
.branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.condition {
  font-size: 0.7rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
}
.kb-note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #64748b;
  font-style: italic;
}

/* Deep Learning */
.neural-net {
  display: flex;
  gap: 2rem;
  align-items: center;
  position: relative;
}
.layer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.neuron {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e1;
  border: 1px solid #94a3b8;
}
.layer.input .neuron {
  background: #93c5fd;
}
.layer.hidden .neuron {
  background: #fca5a5;
}
.layer.output .neuron {
  background: #86efac;
}
.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.2;
}
.connections line {
  stroke: #000;
  stroke-width: 1;
}
.dl-note {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #64748b;
}

/* GenAI */
.vis-genai {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
}
.transformer-block {
  border: 2px solid #8b5cf6;
  border-radius: 8px;
  padding: 0.5rem;
  width: 120px;
  text-align: center;
  background: #f5f3ff;
}
.block-layer {
  border: 1px solid #ddd6fe;
  background: white;
  margin: 4px 0;
  padding: 4px;
  font-size: 0.7rem;
  border-radius: 4px;
}
.chat-sim {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  font-size: 0.8rem;
}
.msg {
  padding: 6px 10px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  max-width: 80%;
}
.msg.user {
  background: #eff6ff;
  margin-left: auto;
  color: #1e40af;
}
.msg.ai {
  background: #f0fdf4;
  margin-right: auto;
  color: #166534;
}

/* Impact Card */
.impact-card {
  text-align: center;
}
.impact-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.impact-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}
.impact-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
