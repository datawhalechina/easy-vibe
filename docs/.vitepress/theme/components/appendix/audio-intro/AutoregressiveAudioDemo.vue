<template>
  <div class="ar-comparison">
    <el-card shadow="never">
      <div class="controls">
        <el-button
          type="primary"
          @click="playDemo"
          :loading="isPlaying"
          icon="VideoPlay"
        >
          开始对比演示
        </el-button>
      </div>

      <div class="comparison-container">
        <!-- Left: Autoregressive -->
        <el-card shadow="hover" class="method-card">
          <template #header>
            <div class="method-header">
              <el-icon :size="20" color="#F56C6C"><Timer /></el-icon>
              <span class="method-title">自回归 (Autoregressive)</span>
            </div>
          </template>
          <div class="method-body">
            <div class="visual-area">
              <div class="token-stream">
                <transition-group name="list">
                  <el-tag
                    v-for="(token, i) in displayedArTokens"
                    :key="i"
                    type="danger"
                    class="token-item"
                    effect="plain"
                  >
                    {{ token }}
                  </el-tag>
                </transition-group>
              </div>
            </div>
            <div class="stats">
              <el-descriptions :column="1" size="small" border>
                <el-descriptions-item label="生成方式"
                  >串行 (Serial)</el-descriptions-item
                >
                <el-descriptions-item label="速度">
                  <el-tag type="danger" size="small">慢 (Slow)</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>

        <!-- Right: Flow Matching -->
        <el-card shadow="hover" class="method-card">
          <template #header>
            <div class="method-header">
              <el-icon :size="20" color="#67C23A"><Lightning /></el-icon>
              <span class="method-title">流匹配 (Flow Matching)</span>
            </div>
          </template>
          <div class="method-body">
            <div class="visual-area">
              <div class="flow-field" :style="{ opacity: flowProgress }">
                <div
                  v-for="n in 20"
                  :key="n"
                  class="flow-bar"
                  :style="{
                    height: flowProgress * (30 + Math.random() * 70) + '%',
                    transitionDelay: n * 0.02 + 's'
                  }"
                ></div>
              </div>
              <div
                class="flow-overlay"
                v-if="flowProgress < 1 && flowProgress > 0"
              >
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>Denoising...</span>
              </div>
            </div>
            <div class="stats">
              <el-descriptions :column="1" size="small" border>
                <el-descriptions-item label="生成方式"
                  >并行 (Parallel)</el-descriptions-item
                >
                <el-descriptions-item label="速度">
                  <el-tag type="success" size="small">极快 (Fast)</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>
      </div>

      <el-divider />

      <el-alert title="技术演进" type="success" :closable="false" show-icon>
        <template #default>
          <p>
            <strong>自回归</strong> (如 VALL-E)
            像人说话一样，必须说完上一个字才能说下一个字，所以很慢。
            <br />
            <strong>流匹配</strong> (如 F5-TTS)
            像画画一样，可以同时在画布的所有角落开始上色，效率提升了 10-20 倍。
          </p>
        </template>
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Timer, Lightning, VideoPlay, Loading } from '@element-plus/icons-vue'

const arTokensSource = [1024, 2048, 3072, 4096, 5120, 6144, 7168, 8192]
const displayedArTokens = ref([])
const flowProgress = ref(0)
const isPlaying = ref(false)

const playDemo = async () => {
  if (isPlaying.value) return
  isPlaying.value = true
  displayedArTokens.value = []
  flowProgress.value = 0

  // Start Flow Matching (Fast)
  const flowPromise = new Promise((resolve) => {
    let p = 0
    const interval = setInterval(() => {
      p += 0.05
      flowProgress.value = p
      if (p >= 1) {
        clearInterval(interval)
        resolve()
      }
    }, 50) // Total ~1s
  })

  // Start AR (Slow)
  const arPromise = new Promise(async (resolve) => {
    for (const token of arTokensSource) {
      await new Promise((r) => setTimeout(r, 400)) // 400ms per token
      displayedArTokens.value.push(token)
    }
    resolve()
  })

  await Promise.all([flowPromise, arPromise])
  isPlaying.value = false
}
</script>

<style scoped>
.ar-comparison {
  margin: 20px 0;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}

.method-card {
  height: 100%;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.visual-area {
  height: 120px;
  background: var(--el-fill-color-light);
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* AR Styles */
.token-stream {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  height: 100%;
}

.token-item {
  font-family: monospace;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Flow Styles */
.flow-field {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 2px;
}

.flow-bar {
  flex: 1;
  background: linear-gradient(to top, #67c23a, #95d475);
  border-radius: 2px 2px 0 0;
  transition: height 0.5s ease;
}

.flow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--el-text-color-secondary);
}
</style>
