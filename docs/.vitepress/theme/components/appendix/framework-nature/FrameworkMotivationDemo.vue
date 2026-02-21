<template>
  <div class="framework-motivation">
    <div class="card">
      <div class="card-title">
        问题
      </div>
      <ul>
        <li>数据变化时，手动更新 DOM 容易遗漏</li>
        <li>页面越复杂，需要同步的地方越多，越容易出 bug</li>
        <li>多人协作时，DOM 操作散落各处，维护成本高</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-title">
        根本原因
      </div>
      <ul>
        <li>浏览器不知道"数据"和"界面"的对应关系</li>
        <li>原生 DOM API 只提供底层操作，没有"数据变了就更新 UI"的能力</li>
        <li>开发者被迫充当"人肉同步器"</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-title">
        框架的解法
      </div>
      <ul>
        <li>建立数据到 UI 的映射关系（UI = f(State)）</li>
        <li>自动检测数据变化（响应式系统）</li>
        <li>自动计算最小 DOM 更新（虚拟 DOM / 编译优化）</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.framework-motivation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.4rem;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

li + li {
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .framework-motivation {
    grid-template-columns: 1fr;
  }
}
</style>
