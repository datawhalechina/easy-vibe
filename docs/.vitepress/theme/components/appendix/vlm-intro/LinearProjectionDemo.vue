<template>
  <div class="linear-projection-demo">
    <div class="demo-container">
      <!-- Step 1: Patch -->
      <div class="step-box">
        <div class="label">1. Patch (4x4)</div>
        <div class="grid-patch">
          <div
            v-for="n in 16"
            :key="n"
            class="pixel"
            :style="{ backgroundColor: getPixelColor(n) }"
          ></div>
        </div>
        <div class="desc">768 像素点</div>
      </div>

      <div class="arrow">➜</div>

      <!-- Step 2: Flattened -->
      <div class="step-box">
        <div class="label">2. Flatten</div>
        <div class="vector-container">
          <div
            v-for="n in 16"
            :key="n"
            class="vector-cell"
            :style="{ backgroundColor: getPixelColor(n) }"
          ></div>
        </div>
        <div class="desc">拉平成向量</div>
      </div>

      <div class="arrow">× W</div>

      <!-- Step 3: Projected -->
      <div class="step-box">
        <div class="label">3. Embedding</div>
        <div class="embedding-container">
          <div v-for="n in 8" :key="n" class="embed-cell"></div>
        </div>
        <div class="desc">压缩特征 (D=8)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const getPixelColor = (n) => {
  // Generate a gradient of colors
  const hue = (n * 20) % 360
  return `hsl(${hue}, 70%, 60%)`
}
</script>

<style scoped>
.linear-projection-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 20px 0;
  overflow-x: auto;
}

.demo-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 600px;
}

.step-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.label {
  font-weight: bold;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.desc {
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

.grid-patch {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  width: 80px;
  height: 80px;
}

.pixel {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.vector-container {
  display: flex;
  flex-direction: column;
  gap: 1px;
  height: 120px;
  width: 20px;
  justify-content: center;
}

.vector-cell {
  width: 100%;
  flex: 1;
}

.embedding-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 80px;
  width: 20px;
}

.embed-cell {
  width: 100%;
  flex: 1;
  background-color: var(--vp-c-brand);
  opacity: 0.8;
  border-radius: 2px;
}

.arrow {
  font-size: 1.5em;
  color: var(--vp-c-text-3);
  font-weight: bold;
}
</style>
