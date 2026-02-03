<template>
  <div class="intro-prs">
    <div class="prs-item">
      <div class="prs-title">问题</div>
      <ul>
        <li><strong>上下文难以保持一致</strong>：对话一长，前后语义容易脱节。</li>
        <li><strong>关键事实容易丢失</strong>：早期给出的信息在后续轮次中难以被准确引用。</li>
        <li><strong>调用成本持续上升</strong>：每一轮都要重新处理大量历史内容。</li>
      </ul>
    </div>
    <div class="prs-item">
      <div class="prs-title">可能的成因</div>
      <ul>
        <li><strong>视野仅限当前调用</strong>：模型只能依赖这一轮提供的上下文。</li>
        <li><strong>信息缺乏结构化组织</strong>：重要信息与次要细节混在一起，难以形成稳定记忆。</li>
        <li><strong>历史内容反复计算</strong>：大量固定前缀在多轮对话中被一遍遍重新处理。</li>
      </ul>
    </div>
    <div class="prs-item">
      <div class="prs-title">带来的影响</div>
      <ul>
        <li><strong>回答质量不稳定</strong>：对话越长，模型越难保持一致性和可追溯性。</li>
        <li><strong>成本难以预估</strong>：每轮上下文大小高度波动，调用费用不可控。</li>
        <li><strong>难以工程化落地</strong>：缺乏明确的上下文管理策略，系统在生产环境中难以维护与扩展。</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.intro-prs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  font-size: 0.82rem;
}

.prs-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.prs-title {
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
  .intro-prs {
    grid-template-columns: 1fr;
  }
}
</style>
