<template>
  <div class="vit-output-demo">
    <div class="pipeline">
      <!-- 1. Transformer Output Grid -->
      <div class="stage">
        <div class="stage-label">1. Processed Patches (Grid)</div>
        <div class="grid-container">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="grid-item"
            :class="{ active: activeIndex === index }"
            @mouseenter="activeIndex = index"
          >
            <span class="icon">{{ item.icon }}</span>
          </div>
        </div>
      </div>

      <div class="arrow-section">
        <div class="arrow-line"></div>
        <div class="arrow-text">Flatten & Output</div>
      </div>

      <!-- 2. Feature Vector Sequence -->
      <div class="stage">
        <div class="stage-label">
          2. Feature Vector Sequence (The "Image Sentence")
        </div>
        <div class="vector-sequence">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="vector-wrapper"
            :class="{ active: activeIndex === index }"
            @mouseenter="activeIndex = index"
          >
            <div class="vector-col">
              <!-- Simulated vector dimensions -->
              <div
                class="v-cell"
                :style="{ opacity: 0.9, background: item.color }"
              ></div>
              <div
                class="v-cell"
                :style="{ opacity: 0.7, background: item.color }"
              ></div>
              <div
                class="v-cell"
                :style="{ opacity: 0.5, background: item.color }"
              ></div>
              <div
                class="v-cell"
                :style="{ opacity: 0.8, background: item.color }"
              ></div>
              <div
                class="v-cell"
                :style="{ opacity: 0.6, background: item.color }"
              ></div>
            </div>
            <div class="vector-idx">{{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Semantic Panel -->
    <div class="semantic-panel">
      <div v-if="activeIndex !== -1" class="semantic-content">
        <div class="header" :style="{ borderColor: items[activeIndex].color }">
          <span class="large-icon">{{ items[activeIndex].icon }}</span>
          <div class="title-group">
            <span class="title"
              >Token #{{ activeIndex + 1 }}:
              {{ items[activeIndex].label }}</span
            >
            <span class="subtitle">Type: {{ items[activeIndex].type }}</span>
          </div>
        </div>
        <div class="desc">
          <div class="vector-repr">
            <span class="label">Vector Value:</span>
            <span class="code" :style="{ color: items[activeIndex].color }">
              [0.{{ (Math.random() * 99).toFixed(0) }}, -0.{{
                (Math.random() * 99).toFixed(0)
              }}, 1.{{ (Math.random() * 99).toFixed(0) }}, ...]
            </span>
          </div>
          <div class="meaning">
            <strong>🤖 What ViT sees (Semantic):</strong>
            <p>{{ items[activeIndex].desc }}</p>
          </div>
        </div>
      </div>
      <div v-else class="placeholder">
        <span class="hint-icon">👆</span>
        <span class="hint-text"
          >悬停在上方方块或向量上，查看 ViT 输出的“语义特征”</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(-1)

const items = [
  {
    icon: '🌲',
    label: 'Background',
    type: 'Environment',
    color: '#4caf50',
    desc: 'Recognized as outdoor nature elements (Trees/Greenery). Low relevance to main subject.'
  },
  {
    icon: '🌲',
    label: 'Background',
    type: 'Environment',
    color: '#4caf50',
    desc: 'Redundant background info. Contextualizes the scene as "Outdoors".'
  },
  {
    icon: '☁️',
    label: 'Sky',
    type: 'Environment',
    color: '#2196f3',
    desc: 'Spatial context: Upper region, open area.'
  },
  {
    icon: '👂',
    label: 'Cat Ear',
    type: 'Subject Part',
    color: '#ff9800',
    desc: 'High Importance. Identified as "Feline Feature". Strongly linked to "Cat Face".'
  },
  {
    icon: '😼',
    label: 'Cat Face',
    type: 'Subject Core',
    color: '#ff5722',
    desc: 'Global Focus Center. Contains "Eyes", "Whiskers". Aggregates info from surrounding patches.'
  },
  {
    icon: '🌲',
    label: 'Background',
    type: 'Environment',
    color: '#4caf50',
    desc: 'Background noise.'
  },
  {
    icon: '🐾',
    label: 'Cat Paw',
    type: 'Subject Part',
    color: '#ff9800',
    desc: 'Action component. Suggests "Standing" or "Walking" posture.'
  },
  {
    icon: '🧶',
    label: 'Yarn',
    type: 'Object',
    color: '#e91e63',
    desc: 'Interacting Object. Semantically linked to "Play" or "Toy".'
  },
  {
    icon: '🌱',
    label: 'Grass',
    type: 'Environment',
    color: '#8bc34a',
    desc: 'Ground context. Confirms "Ground level" view.'
  }
]
</script>

<style scoped>
.vit-output-demo {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  max-width: 700px;
  margin: 20px auto;
}

.dark .vit-output-demo {
  background: #1e1e20;
  border-color: #2d2d30;
  color: #e0e0e0;
}

.pipeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.stage {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage-label {
  font-size: 12px;
  text-transform: uppercase;
  color: #868e96;
  margin-bottom: 8px;
  font-weight: 600;
}

/* Grid Stage */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.dark .grid-container {
  background: #252529;
}

.grid-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
}
.dark .grid-item {
  background: #343a40;
}

.grid-item:hover,
.grid-item.active {
  background: #e7f5ff;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.dark .grid-item:hover,
.dark .grid-item.active {
  background: #1c7ed6;
}

/* Arrow */
.arrow-section {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #adb5bd;
}
.arrow-line {
  width: 2px;
  height: 20px;
  background: #dee2e6;
}

/* Vector Sequence Stage */
.vector-sequence {
  display: flex;
  gap: 4px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  max-width: 100%;
}
.dark .vector-sequence {
  background: #252529;
}

.vector-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.vector-wrapper:hover,
.vector-wrapper.active {
  background: rgba(0, 0, 0, 0.05);
}
.dark .vector-wrapper:hover,
.dark .vector-wrapper.active {
  background: rgba(255, 255, 255, 0.1);
}

.vector-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.v-cell {
  width: 12px;
  height: 6px;
  border-radius: 1px;
}

.vector-idx {
  font-size: 10px;
  color: #adb5bd;
}

/* Semantic Panel */
.semantic-panel {
  margin-top: 24px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark .semantic-panel {
  background: #252529;
  border-color: #343a40;
}

.placeholder {
  color: #868e96;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.semantic-content {
  width: 100%;
  text-align: left;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eee;
}

.large-icon {
  font-size: 32px;
  background: #f8f9fa;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.dark .large-icon {
  background: #343a40;
}

.title-group {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  font-size: 16px;
  color: #343a40;
}
.dark .title {
  color: #f8f9fa;
}

.subtitle {
  font-size: 12px;
  color: #868e96;
}

.desc {
  font-size: 14px;
  color: #495057;
}
.dark .desc {
  color: #ced4da;
}

.vector-repr {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-family: 'Menlo', monospace;
  font-size: 12px;
  background: #f1f3f5;
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
}
.dark .vector-repr {
  background: #343a40;
}

.label {
  color: #868e96;
}

.meaning strong {
  display: block;
  margin-bottom: 4px;
  color: #212529;
}
.dark .meaning strong {
  color: #f8f9fa;
}
</style>
