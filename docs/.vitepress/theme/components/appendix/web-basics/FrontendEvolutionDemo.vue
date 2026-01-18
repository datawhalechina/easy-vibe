<template>
  <div class="frontend-evolution-demo">
    <!-- Modern Timeline -->
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
            <!-- Code Editor -->
            <div class="mac-window code-window">
              <div class="window-bar">
                <div class="traffic-lights">
                  <span class="light red"></span>
                  <span class="light yellow"></span>
                  <span class="light green"></span>
                </div>
                <div class="window-title">
                  {{ stages[currentStage].codeTitle }}
                </div>
              </div>
              <div class="editor-content">
                <pre><code>{{ stages[currentStage].code }}</code></pre>
              </div>
            </div>

            <!-- Diagram View -->
            <div class="mac-window diagram-window">
              <div class="window-bar">
                <div class="window-title">Architecture Pattern</div>
              </div>
              <div class="diagram-canvas">
                <!-- Stage 0: Static -->
                <div v-if="currentStage === 0" class="diagram static">
                  <div class="flow-stack">
                    <div class="concept-box html">
                      <span class="icon">📄</span> HTML (Content)
                    </div>
                    <div class="flow-arrow">↓</div>
                    <div class="concept-box browser">
                      <span class="icon">🌍</span> Browser (Display)
                    </div>
                  </div>
                  <div class="side-note">Server sends complete HTML</div>
                </div>

                <!-- Stage 1: jQuery -->
                <div v-if="currentStage === 1" class="diagram jquery">
                  <div class="concept-box dom">
                    <span class="icon">🌳</span> DOM Tree
                  </div>
                  <div class="chaos-arrows">
                    <svg viewBox="0 0 100 60" class="chaos-svg">
                      <path
                        d="M10,10 Q50,5 90,10"
                        class="arrow-path"
                        marker-end="url(#arrowhead)"
                      />
                      <path
                        d="M90,50 Q50,55 10,50"
                        class="arrow-path"
                        marker-end="url(#arrowhead)"
                      />
                      <path
                        d="M20,20 Q50,40 80,20"
                        class="arrow-path dashed"
                        marker-end="url(#arrowhead)"
                      />
                    </svg>
                    <span class="label-action">Direct Manipulation</span>
                    <span class="label-event">Events</span>
                  </div>
                  <div class="concept-box js">
                    <span class="icon">🍝</span> jQuery / JS
                  </div>

                  <!-- SVG Marker Definition -->
                  <svg style="position: absolute; width: 0; height: 0">
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <!-- Stage 2: MVC -->
                <div v-if="currentStage === 2" class="diagram mvc">
                  <div class="mvc-triangle">
                    <div class="concept-box model">Model</div>
                    <div class="concept-box view">View</div>
                    <div class="concept-box controller">Controller</div>

                    <!-- Connecting Lines -->
                    <div class="line m-v"></div>
                    <div class="line v-c"></div>
                    <div class="line c-m"></div>
                  </div>
                  <div class="mvc-desc">Two-way Binding</div>
                </div>

                <!-- Stage 3: Component -->
                <div v-if="currentStage === 3" class="diagram component">
                  <div class="comp-structure">
                    <div class="comp-box root">
                      <span class="comp-label">App</span>
                      <div class="comp-children">
                        <div class="comp-box header">Header</div>
                        <div class="comp-box list">
                          ProductList
                          <div class="comp-children row">
                            <div class="comp-box item">Item</div>
                            <div class="comp-box item">Item</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flow-pill">State ➔ UI = f(State)</div>
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
    year: '1990s',
    label: 'Static Web',
    title: 'The Static Era',
    desc: 'Web pages were just digital documents. The server sent HTML, and the browser rendered it. Want new content? Refresh the whole page.',
    codeTitle: 'index.html',
    code: `<html>
<body>
  <h1>Hello World</h1>
  <p>Static content served by server.</p>
</body>
</html>`
  },
  {
    year: '2005+',
    label: 'jQuery Era',
    title: 'Imperative DOM',
    desc: 'JS directly manipulated the DOM. "Find that button, add a click listener, change that div\'s color". Logic became tangled like "spaghetti".',
    codeTitle: 'script.js',
    code: `$('#btn').click(function() {
  // Find & Modify directly
  $('.box').show();
  $('.text').text('Loading...');
  
  // Callback hell...
  $.ajax('/api', function(data) {
    $('.content').html(data);
  });
});`
  },
  {
    year: '2010+',
    label: 'MVC/MVVM',
    title: 'Framework Era',
    desc: 'Separation of concerns. Data (Model) and View were separated. Two-way data binding (like in AngularJS) was magic but performance-heavy.',
    codeTitle: 'controller.js',
    code: `$scope.user = { name: 'Bob' };

// Magic: Data changes -> View updates
$scope.updateName = function() {
  $scope.user.name = 'Alice';
};`
  },
  {
    year: '2013+',
    label: 'Component',
    title: 'Component Era',
    desc: 'UI is broken into independent "Lego blocks" (Components). Declarative: You define "What it looks like given State X", framework handles the "How".',
    codeTitle: 'ProductCard.vue',
    code: `<template>
  <div class="card">
    <h3>{{ product.name }}</h3>
    <button @click="buy">Buy</button>
  </div>
</template>

<script>
// State driven
export default {
  props: ['product'],
  methods: { buy() { ... } }
}
<\/script>`
  }
]
</script>

<style scoped>
.frontend-evolution-demo {
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

/* --- Timeline --- */
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
  top: 2.5rem; /* Center with dots */
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
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* --- Content --- */
.content-wrapper {
  padding: 2rem;
  min-height: 400px;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.header-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, var(--vp-c-brand), #8b5cf6);
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

/* --- Visualization Grid --- */
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  transition: transform 0.3s ease;
}

.mac-window:hover {
  transform: translateY(-5px);
}

.code-window {
  background: #1e1e2e; /* Dark theme */
}

.diagram-window {
  background: var(--vp-c-bg-alt);
}

.window-bar {
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05); /* Transparent on dark */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  position: relative;
}

.diagram-window .window-bar {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
  color: #9ca3af;
  font-family: var(--vp-font-family-mono);
}

.diagram-window .window-title {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.editor-content {
  padding: 1rem;
  overflow: auto;
  flex: 1;
}

.editor-content pre {
  margin: 0;
  background: transparent;
  padding: 0;
}

.editor-content code {
  font-family: 'Fira Code', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #a6accd;
}

.diagram-canvas {
  padding: 2rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  position: relative;
}

/* --- Diagram Specifics --- */
.concept-box {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.icon {
  font-size: 1.2rem;
}

/* Static Diagram */
.diagram.static .flow-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.side-note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
}

/* jQuery Diagram */
.diagram.jquery {
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.chaos-arrows {
  position: relative;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chaos-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.arrow-path {
  fill: none;
  stroke: #9ca3af;
  stroke-width: 2;
}
.arrow-path.dashed {
  stroke-dasharray: 4;
}
.label-action,
.label-event {
  font-size: 0.75rem;
  background: white;
  padding: 2px 4px;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.label-action {
  transform: translate(-20px, -10px);
}
.label-event {
  transform: translate(20px, 10px);
}

/* MVC Diagram */
.diagram.mvc {
  flex-direction: column;
  gap: 1rem;
}
.mvc-triangle {
  position: relative;
  width: 200px;
  height: 160px;
}
.mvc-triangle .model {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.mvc-triangle .view {
  position: absolute;
  bottom: 0;
  left: 0;
}
.mvc-triangle .controller {
  position: absolute;
  bottom: 0;
  right: 0;
}

.line {
  position: absolute;
  background: #cbd5e1;
  z-index: 1;
}
.line.m-v {
  height: 2px;
  width: 110px;
  top: 45%;
  left: 20px;
  transform: rotate(60deg);
}
.line.v-c {
  height: 2px;
  width: 100px;
  bottom: 20px;
  left: 50px;
}
.line.c-m {
  height: 2px;
  width: 110px;
  top: 45%;
  right: 20px;
  transform: rotate(-60deg);
}
.mvc-desc {
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

/* Component Diagram */
.diagram.component {
  flex-direction: column;
  gap: 1.5rem;
}
.comp-structure {
  display: flex;
  justify-content: center;
}
.comp-box {
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  padding: 6px;
  font-size: 0.8rem;
  text-align: center;
  box-shadow: 0 4px 0 rgba(59, 130, 246, 0.2);
}
.comp-box.root {
  background: #eff6ff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}
.comp-label {
  font-weight: bold;
  color: #1e40af;
}
.comp-children {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.comp-children.row {
  margin-top: 4px;
}
.comp-box.header {
  background: #dbeafe;
  border-style: dashed;
}
.comp-box.list {
  background: #dbeafe;
}
.comp-box.item {
  background: #bfdbfe;
  font-size: 0.7rem;
  padding: 4px;
}

.flow-pill {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
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
