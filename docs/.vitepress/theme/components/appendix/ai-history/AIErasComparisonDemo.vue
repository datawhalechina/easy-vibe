<template>
  <div class="demo-card">
    <div class="era-container">
      <div class="era-header">
        🌟 AI 发展阶段与核心范式全景对比
      </div>
      <div class="era-grid">
        <div class="era-item" v-for="era in eras" :key="era.name" :style="{ borderTopColor: era.color }">
          <div class="e-icon" :style="{ background: era.color }">{{ era.icon }}</div>
          <div class="e-name" :style="{ color: era.color }">{{ era.name }}</div>
          <div class="e-time">{{ era.time }}</div>
          
          <div class="e-section">
            <div class="e-label">驱动方式</div>
            <div class="e-value">{{ era.driver }}</div>
          </div>
          
          <div class="e-section">
            <div class="e-label">核心机制</div>
            <div class="e-value">
              <span class="highlight">{{ era.mechanism }}</span>
            </div>
          </div>
          
          <div class="e-section">
            <div class="e-label">典型代表</div>
            <div class="e-tags">
              <span class="e-tag" v-for="tag in era.examples" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const eras = [
  {
    name: '规则系统时代',
    time: '1960s - 1980s',
    icon: '📜',
    color: '#059669', // emerald
    driver: '人类硬编码知识',
    mechanism: 'If-Then 逻辑推演',
    examples: ['Dendral', '深蓝 (Deep Blue)']
  },
  {
    name: '传统机器学习',
    time: '1990s - 2000s',
    icon: '📊',
    color: '#d97706', // amber
    driver: '人工特征工程 + 统计学',
    mechanism: '寻找数学决策边界',
    examples: ['支持向量机 (SVM)', '随机森林']
  },
  {
    name: '深度学习革命',
    time: '2010s',
    icon: '🧠',
    color: '#dc2626', // red
    driver: '大数据 + 算力爬升',
    mechanism: '神经网络自动提取特征',
    examples: ['AlexNet (CNN)', 'AlphaGo (RL)']
  },
  {
    name: '大语言模型 (LLM)',
    time: '2018 - 至今',
    icon: '💬',
    color: '#7c3aed', // violet
    driver: '海量无标注数据 + 暴力计算',
    mechanism: '预测下一个词 + 涌现常识',
    examples: ['GPT-4', 'Claude 3']
  },
  {
    name: '智能体 (Agentic AI)',
    time: '现在 - 未来',
    icon: '🤖',
    color: '#0284c7', // light blue
    driver: '大模型大脑 + 环境感知',
    mechanism: '自主规划 + 工具调用',
    examples: ['AI 程序员', '具身智能']
  }
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto; }
.era-container { min-width: 800px; display: flex; flex-direction: column; gap: 1rem; }
.era-header { text-align: center; font-weight: bold; font-size: 1.1rem; color: var(--vp-c-text-1); margin-bottom: 0.5rem; }

.era-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.8rem; }
.era-item { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-top: 4px solid; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.8rem; }

.e-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 0.2rem; }
.e-name { font-weight: 800; font-size: 0.95rem; }
.e-time { font-size: 0.75rem; color: var(--vp-c-text-3); font-weight: bold; margin-top: -0.6rem; }

.e-section { width: 100%; display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.2rem; }
.e-label { font-size: 0.7rem; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 0.5px; }
.e-value { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.4; }
.highlight { display: inline-block; background: var(--vp-c-bg-soft); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; color: var(--vp-c-text-1); border: 1px dashed var(--vp-c-divider); }

.e-tags { display: flex; flex-direction: column; gap: 0.4rem; align-items: center; justify-content: center; }
.e-tag { font-size: 0.75rem; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); padding: 0.25rem 0.6rem; border-radius: 12px; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.html.dark .highlight { background: var(--vp-c-bg-alt); }
</style>
