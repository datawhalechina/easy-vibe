<template>
  <div class="strategy-demo">
    <div class="demo-header">
      <span class="title">Vibe Coding 学习策略</span>
      <span class="subtitle">AI 时代怎么学更高效</span>
    </div>

    <div class="strategy-list">
      <div v-for="(strategy, index) in strategies" :key="index" class="strategy-item">
        <div class="strategy-num">{{ index + 1 }}</div>
        <div class="strategy-content">
          <div class="strategy-title">{{ strategy.title }}</div>
          <div class="strategy-desc">{{ strategy.desc }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心原则：</strong>AI 是你的编程助手，但决策者永远是你。学会提问、学会判断、学会整合，比学会写代码更重要。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategies = ref([
  {
    title: '先理解，再让 AI 写',
    desc: '不要一上来就让 AI 写代码。先理解问题是什么，想清楚解决方案，再用 AI 加速实现。'
  },
  {
    title: '把 AI 当结对编程伙伴',
    desc: '遇到不懂的概念，问 AI 解释。遇到复杂问题，和 AI 讨论方案。AI 是你的知识渊博的同事。'
  },
  {
    title: '学会审核 AI 的输出',
    desc: 'AI 生成的代码不一定对。你需要有能力判断：逻辑对不对？有没有安全隐患？性能如何？'
  },
  {
    title: '建立自己的知识体系',
    desc: 'AI 能帮你查漏补缺，但核心知识框架要自己建立。知道"有什么"，才能问出"怎么用"。'
  },
  {
    title: '在实践中学习',
    desc: '做真实的项目，解决真实的问题。AI 帮你扫清语法障碍，你专注于解决业务问题。'
  }
])
</script>

<style scoped>
.strategy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.strategy-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strategy-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.strategy-num {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.strategy-content {
  flex: 1;
}

.strategy-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.strategy-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}
</style>
