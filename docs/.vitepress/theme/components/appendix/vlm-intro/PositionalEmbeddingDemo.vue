<template>
  <div class="pos-demo">
    <div class="demo-row">
      <!-- Input Feature -->
      <div class="grid-wrapper">
        <div class="grid-title">Feature Vectors</div>
        <div class="grid-box feature-grid">
          <div v-for="n in 9" :key="'f' + n" class="cell feature-cell">V</div>
        </div>
      </div>

      <div class="op">+</div>

      <!-- Positional Embedding -->
      <div class="grid-wrapper">
        <div class="grid-title">Position Embeddings</div>
        <div class="grid-box pos-grid">
          <div v-for="n in 9" :key="'p' + n" class="cell pos-cell">{{ n }}</div>
        </div>
      </div>

      <div class="op">=</div>

      <!-- Result -->
      <div class="grid-wrapper">
        <div class="grid-title">Input to Transformer</div>
        <div class="grid-box result-grid">
          <div v-for="n in 9" :key="'r' + n" class="cell result-cell">
            <span class="v">V</span><span class="plus">+</span
            ><span class="p">{{ n }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="caption">
      位置编码 (Position Embedding)
      是一组可学习的向量，直接<b>加</b>在图像特征上。
    </div>
  </div>
</template>

<style scoped>
.pos-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 20px 0;
  overflow-x: auto;
}

.demo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-width: 500px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.grid-title {
  font-size: 0.85em;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.grid-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.cell {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: monospace;
}

.feature-cell {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.pos-grid .pos-cell {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-darker);
}

.result-cell {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green-darker);
  font-size: 0.7em;
  display: flex;
  gap: 1px;
}

.op {
  font-size: 2em;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.caption {
  text-align: center;
  margin-top: 15px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.plus {
  color: var(--vp-c-text-3);
  font-weight: normal;
}
</style>
