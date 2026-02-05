<!--
  UploadProcessDemo.vue
  上传流程演示 - 展示直传、分片、断点续传等上传方式
-->
<template>
  <div class="upload-process-demo">
    <div class="header">
      <div class="title">文件上传流程</div>
      <div class="subtitle">直传 vs 分片上传 vs 断点续传</div>
    </div>

    <!-- 上传方式选择 -->
    <div class="upload-methods">
      <div
        v-for="method in uploadMethods"
        :key="method.id"
        class="method-card"
        :class="{ active: selectedMethod === method.id }"
        @click="selectMethod(method.id)"
      >
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <div class="method-desc">{{ method.description }}</div>
        <div class="method-size">适合: {{ method.suitable }}</div>
      </div>
    </div>

    <!-- 上传流程可视化 -->
    <div class="upload-flow">
      <div class="flow-title">
        <span v-if="selectedMethod === 'direct'">🚀 直传流程</span>
        <span v-else-if="selectedMethod === 'multipart'">🔪 分片上传流程</span>
        <span v-else>💾 断点续传流程</span>
      </div>

      <!-- 直传流程 -->
      <div v-if="selectedMethod === 'direct'" class="flow-steps">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">用户选择文件</div>
            <div class="step-detail">浏览器选择 5MB 图片文件</div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 2 }">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">申请上传凭证</div>
            <div class="step-detail">前端 → 后端 → STS 临时凭证</div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">直传到对象存储</div>
            <div class="step-detail">浏览器 → OSS/COS（5MB 一次性上传）</div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title">上传完成</div>
            <div class="step-detail">返回 URL，前端通知后端保存记录</div>
          </div>
        </div>
      </div>

      <!-- 分片上传流程 -->
      <div v-else-if="selectedMethod === 'multipart'" class="flow-steps multipart-flow">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">文件分片</div>
            <div class="step-detail">500MB 视频 → 50个 10MB 分片</div>
            <div class="chunks-preview">
              <div v-for="i in 10" :key="i" class="chunk" :class="{ uploaded: i <= 3 }">{{ i }}</div>
              <span class="chunks-more">...</span>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 2 }">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">初始化分片上传</div>
            <div class="step-detail">获取 uploadId（上传会话 ID）</div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">并行上传分片</div>
            <div class="step-detail">3 个并发，每片 10MB</div>
            <div class="parallel-upload">
              <div class="upload-slot" :class="{ active: parallelActive >= 1 }">分片 1</div>
              <div class="upload-slot" :class="{ active: parallelActive >= 2 }">分片 2</div>
              <div class="upload-slot" :class="{ active: parallelActive >= 3 }">分片 3</div>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title">合并分片</div>
            <div class="step-detail">服务端合并所有分片为完整文件</div>
          </div>
        </div>
      </div>

      <!-- 断点续传流程 -->
      <div v-else class="flow-steps resume-flow">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">开始上传 1GB 视频</div>
            <div class="step-detail">已上传 6 个分片（60MB），正在上传第 7 个</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 6%;"></div>
              <div class="progress-text">6% (60MB / 1GB)</div>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step error-step" :class="{ active: currentStep >= 2 }">
          <div class="step-num">⚠️</div>
          <div class="step-content">
            <div class="step-title">网络中断！</div>
            <div class="step-detail">WiFi 切换到 4G，上传中断，第 7 个分片上传失败</div>
            <div class="error-info">
              <span>❌ Error: ETIMEDOUT</span>
              <span>已上传分片: 6/100</span>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">查询已上传分片</div>
            <div class="step-detail">恢复网络后，查询服务端已保存的分片列表</div>
            <div class="resume-info">
              <div class="resume-item success">
                <span>✅ 分片 1-6</span>
                <span>已上传</span>
              </div>
              <div class="resume-item pending">
                <span>⏳ 分片 7-100</span>
                <span>待上传</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-num">4</div>
          <div class="step-content">
            <div class="step-title">断点续传成功！</div>
            <div class="step-detail">从第 7 个分片继续上传，无需重传前 6 个分片</div>
            <div class="success-info">
              <div class="success-item">
                <span>💾 节省流量</span>
                <span>60MB</span>
              </div>
              <div class="success-item">
                <span>⏱️ 节省时间</span>
                <span>~6s</span>
              </div>
              <div class="success-item">
                <span>🎯 续传进度</span>
                <span>6% → 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 上传方式数据
const uploadMethods = [
  {
    id: 'direct',
    name: '直传',
    icon: '🚀',
    description: '小文件一次性上传到对象存储',
    suitable: '< 100MB'
  },
  {
    id: 'multipart',
    name: '分片上传',
    icon: '🔪',
    description: '大文件切分多片并行上传',
    suitable: '> 100MB'
  },
  {
    id: 'resume',
    name: '断点续传',
    icon: '💾',
    description: '网络中断后从断点继续上传',
    suitable: '任何大小'
  }
]

// 状态
const selectedMethod = ref('direct')
const currentStep = ref(0)
const parallelActive = ref(0)
const stats = ref({
  uploadedChunks: 3,
  totalChunks: 50,
  uploadedSize: '60MB',
  totalSize: '1GB',
  progress: 6
})

// 方法
const selectMethod = (id) => {
  selectedMethod.value = id
  resetDemo()
}

const simulateCacheHit = () => {
  resetDemo()
  currentStep.value = 4
}

const simulateCacheMiss = () => {
  resetDemo()
  currentStep.value = 4
}

const resetDemo = () => {
  currentStep.value = 0
  parallelActive.value = 0
}

// 计算属性
const uploadProgress = computed(() => {
  return Math.round((stats.value.uploadedChunks / stats.value.totalChunks) * 100)
})

// 方法
const selectMethod = (id) => {
  selectedMethod.value = id
  resetDemo()
}

const simulateCacheHit = () => {
  resetDemo()
  currentStep.value = 4
}

const simulateCacheMiss = () => {
  resetDemo()
  currentStep.value = 4
}

const resetDemo = () => {
  currentStep.value = 0
  parallelActive.value = 0
}
</script>

<style scoped>
.upload-process-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.upload-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .upload-methods {
    grid-template-columns: 1fr;
  }
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.method-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.method-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-dimm);
}

.method-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.method-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.method-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.method-size {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

.upload-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
}

.flow-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-step.active {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.flow-step.error-step {
  background: #fef2f2;
  border-left-color: #dc2626;
}

.step-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.flow-step.error-step .step-num {
  background: #dc2626;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

/* 分片预览 */
.chunks-preview {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.chunk {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.chunk.uploaded {
  background: var(--vp-c-brand);
  color: white;
}

.chunks-more {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* 并行上传 */
.parallel-upload {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.upload-slot {
  flex: 1;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.upload-slot.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* 进度条 */
.progress-bar {
  position: relative;
  height: 24px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 12px;
  transition: width 0.3s;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

/* 错误信息 */
.error-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #dc2626;
}

.error-info span {
  font-size: 0.75rem;
  color: #dc2626;
  font-family: var(--vp-font-family-mono);
}

/* 恢复信息 */
.resume-info {
  margin-top: 0.5rem;
}

.resume-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.25rem;
  background: white;
  border-radius: 4px;
  font-size: 0.75rem;
}

.resume-item.success {
  border-left: 3px solid #22c55e;
}

.resume-item.success span:first-child {
  color: #166534;
}

.resume-item.pending {
  border-left: 3px solid #f59e0b;
}

.resume-item.pending span:first-child {
  color: #92400e;
}

.resume-item span:last-child {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

/* 成功信息 */
.success-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.success-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #bbf7d0;
}

.success-item span:first-child {
  font-size: 0.7rem;
  color: #166534;
  margin-bottom: 0.25rem;
}

.success-item span:last-child {
  font-size: 0.85rem;
  font-weight: 700;
  color: #16a34a;
}
</style>
