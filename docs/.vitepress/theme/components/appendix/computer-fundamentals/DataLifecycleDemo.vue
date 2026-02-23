<template>
  <div class="data-lifecycle-demo">
    <div class="demo-header">
      <span class="title">数据的生命周期</span>
      <span class="subtitle">从输入到存储到传输到输出的全过程</span>
    </div>

    <div class="lifecycle-flow">
      <div v-for="(stage, index) in stages" :key="stage.id" class="flow-stage">
        <div class="stage-header" @click="activeStage = index">
          <span class="stage-number">{{ index + 1 }}</span>
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-icon">{{ stage.icon }}</span>
        </div>

        <Transition name="slide">
          <div v-if="activeStage === index" class="stage-detail">
            <div class="detail-content">
              <h4>{{ stage.title }}</h4>
              <p>{{ stage.description }}</p>

              <div class="stage-example">
                <div class="example-label">示例：{{ stage.example.label }}</div>
                <div class="example-content">
                  <div
                    v-for="(item, i) in stage.example.items"
                    :key="i"
                    class="example-item"
                  >
                    <span class="item-label">{{ item.label }}:</span>
                    <span class="item-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>

              <div class="stage-encoding">
                <div class="encoding-label">编码方式:</div>
                <div class="encoding-value">{{ stage.encoding }}</div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="index < stages.length - 1" class="flow-arrow">↓</div>
      </div>
    </div>

    <div class="lifecycle-summary">
      <div class="summary-title">数据转换的关键点</div>
      <div class="summary-grid">
        <div
          v-for="(point, index) in keyPoints"
          :key="index"
          class="summary-card"
        >
          <div class="card-icon">{{ point.icon }}</div>
          <div class="card-text">
            <div class="card-title">{{ point.title }}</div>
            <div class="card-desc">{{ point.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStage = ref(0)

const stages = [
  {
    id: 'input',
    name: '数据输入',
    icon: '⌨️',
    title: '阶段 1：数据输入',
    description:
      '用户通过各种输入设备（键盘、鼠标、触摸屏、麦克风等）将信息输入到计算机系统中。',
    example: {
      label: '用户输入文字',
      items: [
        { label: '原始动作', value: '按下键盘 A 键' },
        { label: '硬件信号', value: '键盘扫描码' },
        { label: '操作系统', value: '键盘中断' }
      ]
    },
    encoding: 'ASCII: 01000001 (65)'
  },
  {
    id: 'processing',
    name: '数据处理',
    icon: '🔄',
    title: '阶段 2：数据处理',
    description:
      'CPU 对输入的数据进行计算、转换、格式化等操作，应用程序根据业务逻辑处理数据。',
    example: {
      label: '文本编辑器处理',
      items: [
        { label: '应用程序', value: '接收字符 "A"' },
        { label: '内存存储', value: 'Unicode: U+0041' },
        { label: '显示准备', value: '字体渲染' }
      ]
    },
    encoding: 'UTF-8: 0x41 (单字节)'
  },
  {
    id: 'storage',
    name: '数据存储',
    icon: '💾',
    title: '阶段 3：数据存储',
    description:
      '处理后的数据被保存到存储设备中（内存、硬盘、SSD、云存储等），以便后续使用。',
    example: {
      label: '保存文档',
      items: [
        { label: '内存数据', value: '文本内容' },
        { label: '文件系统', value: '创建 .txt 文件' },
        { label: '磁盘写入', value: '二进制数据' }
      ]
    },
    encoding: '磁盘: 二进制位序列'
  },
  {
    id: 'transmission',
    name: '数据传输',
    icon: '📡',
    title: '阶段 4：数据传输',
    description:
      '数据通过网络（局域网、互联网）或内部总线从一个位置传输到另一个位置。',
    example: {
      label: '上传文件',
      items: [
        { label: '文件读取', value: '从磁盘加载' },
        { label: '网络封装', value: 'TCP/IP 数据包' },
        { label: '物理传输', value: '电信号/光信号' }
      ]
    },
    encoding: '网络: 数据包帧格式'
  },
  {
    id: 'output',
    name: '数据输出',
    icon: '🖥️',
    title: '阶段 5：数据输出',
    description:
      '数据通过输出设备（显示器、打印机、扬声器等）呈现给用户，或传输给其他系统。',
    example: {
      label: '显示网页',
      items: [
        { label: '浏览器接收', value: 'HTML 数据' },
        { label: '渲染引擎', value: '解析样式、布局' },
        { label: '屏幕显示', value: '像素点阵' }
      ]
    },
    encoding: '显示: RGB 像素值'
  }
]

const keyPoints = [
  {
    icon: '🔤',
    title: '编码转换',
    desc: '数据在不同阶段使用不同的编码方式（ASCII、Unicode、二进制等）'
  },
  {
    icon: '📦',
    title: '封装格式',
    desc: '传输和存储时需要封装成特定格式（文件、数据包、帧等）'
  },
  {
    icon: '🎯',
    title: '协议标准',
    desc: '每个环节都遵循相应的协议和标准（TCP/IP、USB、HDMI等）'
  },
  {
    icon: '⚡',
    title: '性能优化',
    desc: '编码压缩、缓存、流水线等技术提升数据处理效率'
  }
]
</script>

<style scoped>
.data-lifecycle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.lifecycle-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.flow-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  max-width: 500px;
}

.stage-header:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(5px);
}

.stage-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
}

.stage-name {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
}

.stage-icon {
  font-size: 1.5rem;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
}

.stage-detail {
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;
}

.detail-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.detail-content h4 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

.detail-content > p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.stage-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.example-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.example-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.example-item:last-child {
  margin-bottom: 0;
}

.item-label {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.item-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.stage-encoding {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}

.encoding-label {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.encoding-value {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
}

.lifecycle-summary {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.summary-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.summary-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.card-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>
