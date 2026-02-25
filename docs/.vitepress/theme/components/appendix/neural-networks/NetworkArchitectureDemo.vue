<!--
  NetworkArchitectureDemo.vue
  神经网络架构对比演示
-->
<template>
  <div class="net-arch-demo">
    <div class="header">
      <div class="title">常见神经网络架构</div>
      <div class="subtitle">点击查看不同网络架构的特点和应用</div>
    </div>

    <div class="arch-tabs">
      <button
        v-for="arch in architectures"
        :key="arch.key"
        :class="['arch-btn', { active: activeArch === arch.key }]"
        @click="activeArch = arch.key"
      >
        {{ arch.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }}（{{ current.abbr }}）</div>
        <div class="detail-year">{{ current.year }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>

      <div class="structure">
        <div class="struct-label">网络结构</div>
        <div class="struct-visual">
          <span v-for="(layer, i) in current.layers" :key="i" class="layer-tag">
            {{ layer }}
            <span v-if="i < current.layers.length - 1" class="layer-arrow">→</span>
          </span>
        </div>
      </div>

      <div class="apps">
        <div class="apps-label">典型应用</div>
        <div class="apps-list">
          <span v-for="(app, i) in current.applications" :key="i" class="app-tag">{{ app }}</span>
        </div>
      </div>

      <div class="key-idea">
        <span class="idea-label">核心思想：</span>{{ current.keyIdea }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeArch = ref('ffn')

const architectures = [
  {
    key: 'ffn',
    name: '前馈神经网络',
    abbr: 'FNN',
    year: '1958',
    desc: '最基础的神经网络结构，数据从输入层经过隐藏层到输出层，单向流动，没有循环。每一层的每个神经元与下一层的所有神经元相连（全连接）。',
    layers: ['输入层', '隐藏层 ×N', '输出层'],
    applications: ['分类', '回归', '函数逼近'],
    keyIdea: '通过多层非线性变换，将输入映射到输出。层数越多，能表达的函数越复杂。'
  },
  {
    key: 'cnn',
    name: '卷积神经网络',
    abbr: 'CNN',
    year: '1998',
    desc: '专为处理网格状数据（如图像）设计。通过卷积核在输入上滑动提取局部特征，池化层降低维度，最后全连接层做分类。参数共享大幅减少了参数量。',
    layers: ['输入', '卷积层', '池化层', '...', '全连接层', '输出'],
    applications: ['图像分类', '目标检测', '人脸识别', '医学影像'],
    keyIdea: '局部感受野 + 参数共享。卷积核只关注局部区域，同一个卷积核在整张图上共享参数。'
  },
  {
    key: 'rnn',
    name: '循环神经网络',
    abbr: 'RNN/LSTM',
    year: '1997',
    desc: '专为处理序列数据设计。隐藏状态会传递到下一个时间步，让网络具有"记忆"能力。LSTM 通过门控机制解决了长序列中的梯度消失问题。',
    layers: ['输入序列', '循环层(含记忆)', '...', '输出序列'],
    applications: ['机器翻译', '语音识别', '时间序列预测', '文本生成'],
    keyIdea: '引入时间维度的循环连接，让网络能处理变长序列并保持上下文记忆。'
  },
  {
    key: 'transformer',
    name: 'Transformer',
    abbr: 'Transformer',
    year: '2017',
    desc: '用自注意力机制替代循环结构，可以并行处理整个序列。每个位置都能直接关注序列中的任意其他位置，解决了 RNN 的长距离依赖问题。是 GPT、BERT 等大模型的基础。',
    layers: ['输入嵌入', '位置编码', '多头注意力', '前馈网络', '...×N', '输出'],
    applications: ['ChatGPT', 'BERT', '机器翻译', '代码生成', '图像生成'],
    keyIdea: '自注意力（Self-Attention）：让序列中的每个元素都能"看到"其他所有元素，计算相关性权重。'
  },
  {
    key: 'gan',
    name: '生成对抗网络',
    abbr: 'GAN',
    year: '2014',
    desc: '由生成器和判别器两个网络对抗训练。生成器试图生成以假乱真的数据，判别器试图区分真假。两者博弈的结果是生成器越来越强。',
    layers: ['随机噪声', '生成器', '生成数据', '判别器', '真/假'],
    applications: ['图像生成', '风格迁移', '超分辨率', '数据增强'],
    keyIdea: '对抗训练：生成器和判别器互相博弈，共同进步，最终生成器能产生逼真的数据。'
  }
]

const current = computed(() => architectures.find(a => a.key === activeArch.value))
</script>

<style scoped>
.net-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.arch-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.arch-btn:hover { border-color: var(--vp-c-brand); }
.arch-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-year {
  font-size: 0.72rem;
  padding: 0.1rem 0.4rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.structure, .apps {
  margin-bottom: 0.5rem;
}
.struct-label, .apps-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.struct-visual {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem;
}
.layer-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-weight: 600;
}
.layer-arrow {
  color: var(--vp-c-text-3);
  margin: 0 0.1rem;
}
.apps-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.app-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: rgba(34, 197, 94, 0.1);
  color: var(--vp-c-text-1);
  border-radius: 4px;
}
.key-idea {
  font-size: 0.8rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  line-height: 1.5;
}
.idea-label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
