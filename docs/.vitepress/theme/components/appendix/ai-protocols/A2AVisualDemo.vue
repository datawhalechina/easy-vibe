<template>
  <div class="a2a-visual-demo">
    <div class="section-title">A2A 是什么？</div>

    <div class="intro-text">
      A2A（Agent-to-Agent Protocol）是 Google 于 2025 年 4 月推出的<strong>Agent 之间相互协作的通信标准</strong>。它让不同厂商、不同框架的 Agent 能够相互发现、分配任务、交换信息，就像给 AI 世界装上了"对讲机"。
    </div>

    <div class="section-title">核心概念</div>

    <div class="concepts-grid">
      <div class="concept">
        <div class="concept-title">Agent Card（Agent 名片）</div>
        <div class="concept-desc">每个 Agent 公开的元数据，包括能力描述、版本号、端点地址等，相当于人的"名片"</div>
      </div>
      <div class="concept">
        <div class="concept-title">Task（任务）</div>
        <div class="concept-desc">Agent 之间传递的工作单元，可以包含多轮对话、文件附件等</div>
      </div>
      <div class="concept">
        <div class="concept-title">Message（消息）</div>
        <div class="concept-desc">Agent 之间的通信内容，支持文本、文件、语音等多模态</div>
      </div>
      <div class="concept">
        <div class="concept-title">SSE（Server-Sent Events）</div>
        <div class="concept-desc">服务器推送技术，用于实时任务进度更新</div>
      </div>
    </div>

    <div class="section-title">什么时候用 A2A？</div>

    <div class="use-cases">
      <div class="use-case">
        <div class="use-case-title">当需要多个 Agent 协作完成复杂任务时</div>
        <div class="use-case-desc">一个 Agent 负责需求分析，一个负责写代码，一个负责测试，各自发挥专长</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">当需要集成不同厂商的 Agent 时</div>
        <div class="use-case-desc">Google 的 Agent、Anthropic 的 Agent、OpenAI 的 Agent 需要相互协作</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">当需要任务委托和进度追踪时</div>
        <div class="use-case-desc">主 Agent 分配任务给专家 Agent，并实时接收进度更新</div>
      </div>
    </div>

    <div class="section-title">如何使用 A2A？</div>

    <div class="usage-steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">发布 Agent Card</div>
          <div class="step-desc">在 /.well-known/agent.json 路径暴露 Agent 的能力描述</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">发现 Agent</div>
          <div class="step-desc">通过 agents/get API 获取其他 Agent 的名片，了解其能力</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">发送任务</div>
          <div class="step-desc">通过 tasks/send API 发送任务，支持 SSE 接收进度更新</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-content">
          <div class="step-title">获取结果</div>
          <div class="step-desc">任务完成后，通过 tasks/get API 获取最终结果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.a2a-visual-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.section-title:first-child {
  margin-top: 0;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-text strong {
  color: var(--vp-c-brand);
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.concept {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.concept-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.concept-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.use-cases {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.use-case {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-case-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .concepts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
