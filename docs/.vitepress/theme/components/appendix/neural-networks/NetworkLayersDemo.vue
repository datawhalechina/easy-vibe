<!--
  NetworkLayersDemo.vue
  神经网络层类型交互演示
-->
<template>
  <div class="layers-demo">
    <div class="header">
      <div class="title">神经网络常见层类型</div>
      <div class="subtitle">点击查看各层的作用和参数</div>
    </div>

    <div class="layer-tabs">
      <button v-for="l in layers" :key="l.key"
        :class="['tab-btn', { active: activeLayer === l.key }]"
        @click="activeLayer = activeLayer === l.key ? null : l.key">
        {{ l.name }}
      </button>
    </div>

    <div v-if="current" class="layer-detail">
      <div class="detail-name">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-section">
        <span class="section-label">核心参数：</span>
        <code v-for="(p, i) in current.params" :key="i" class="param-tag">{{ p }}</code>
      </div>
      <div class="detail-section">
        <span class="section-label">典型用途：</span>
        <span class="usage-text">{{ current.usage }}</span>
      </div>
      <div class="detail-code">
        <code>{{ current.code }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayer = ref('dense')

const layers = [
  {
    key: 'dense',
    name: '全连接层',
    desc: '每个神经元与上一层所有神经元相连。最基础的层类型，用于学习输入特征的组合。',
    params: ['units（神经元数）', 'activation（激活函数）'],
    usage: '分类、回归任务的输出层，以及简单特征提取',
    code: 'Dense(128, activation="relu")'
  },
  {
    key: 'conv',
    name: '卷积层',
    desc: '用滑动窗口（卷积核）扫描输入，提取局部特征。参数共享大幅减少参数量，是图像处理的核心。',
    params: ['filters（卷积核数）', 'kernel_size（核大小）', 'stride（步长）'],
    usage: '图像分类、目标检测、图像分割',
    code: 'Conv2D(64, kernel_size=3, stride=1, padding=1)'
  },
  {
    key: 'rnn',
    name: '循环层',
    desc: '具有"记忆"能力，能处理序列数据。每个时间步的输出会作为下一步的输入，形成循环。',
    params: ['hidden_size（隐藏维度）', 'num_layers（层数）'],
    usage: '文本生成、语音识别、时间序列预测',
    code: 'LSTM(hidden_size=256, num_layers=2)'
  },
  {
    key: 'attention',
    name: '注意力层',
    desc: '让模型学会"关注"输入中最重要的部分。Transformer 的核心，彻底改变了 NLP 领域。',
    params: ['embed_dim（嵌入维度）', 'num_heads（注意力头数）'],
    usage: 'GPT、BERT 等大语言模型，机器翻译',
    code: 'MultiHeadAttention(embed_dim=512, num_heads=8)'
  },
  {
    key: 'norm',
    name: '归一化层',
    desc: '将数据标准化到合理范围，加速训练收敛，缓解梯度消失/爆炸问题。',
    params: ['num_features（特征数）'],
    usage: '几乎所有深度网络中都会使用，通常跟在卷积或全连接层后面',
    code: 'BatchNorm2d(64) / LayerNorm(512)'
  },
  {
    key: 'dropout',
    name: 'Dropout 层',
    desc: '训练时随机"关闭"一部分神经元，防止网络过度依赖某些特征，是最常用的正则化手段。',
    params: ['p（丢弃概率，通常 0.1~0.5）'],
    usage: '防止过拟合，提升模型泛化能力',
    code: 'Dropout(p=0.3)'
  }
]

const current = computed(() => layers.find(l => l.key === activeLayer.value))
</script>

<style scoped>
.layers-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.layer-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab-btn {
  padding: 0.35rem 0.7rem; border-radius: 6px; cursor: pointer;
  font-size: 0.8rem; font-weight: 600; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s;
  color: var(--vp-c-text-2);
}
.tab-btn:hover { border-color: var(--vp-c-brand); }
.tab-btn.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); color: var(--vp-c-text-1); }
.layer-detail {
  background: var(--vp-c-bg); border-radius: 8px; padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-name { font-weight: 700; font-size: 0.95rem; color: var(--vp-c-brand); margin-bottom: 0.3rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.6rem; line-height: 1.5; }
.detail-section { font-size: 0.8rem; margin-bottom: 0.4rem; display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; }
.section-label { font-weight: 600; color: var(--vp-c-text-2); }
.param-tag {
  background: rgba(var(--vp-c-brand-rgb), 0.08); padding: 0.15rem 0.4rem;
  border-radius: 4px; font-size: 0.72rem;
}
.usage-text { color: var(--vp-c-text-2); }
.detail-code {
  margin-top: 0.5rem; padding: 0.5rem 0.7rem; background: var(--vp-c-bg-soft);
  border-radius: 6px; font-family: var(--vp-font-family-mono); font-size: 0.75rem;
  color: var(--vp-c-brand);
}
</style>
