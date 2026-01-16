<template>
  <div class="rag-pipeline-demo">
    <div class="pipeline-title">🔄 RAG (检索增强生成) 工作流程</div>

    <div class="pipeline-flow">
      <!-- Step 1: Query -->
      <div class="flow-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-icon">❓</div>
          <div class="step-title">用户提问</div>
          <div class="step-desc">"什么是 RAG？"</div>
        </div>
      </div>

      <div class="flow-arrow">→</div>

      <!-- Step 2: Retrieve -->
      <div class="flow-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-icon">🔍</div>
          <div class="step-title">检索相关文档</div>
          <div class="step-desc">从知识库找到最相关的 3-5 篇文章</div>
        </div>
      </div>

      <div class="flow-arrow">→</div>

      <!-- Step 3: Augment -->
      <div class="flow-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-icon">📝</div>
          <div class="step-title">增强提示词</div>
          <div class="step-desc">将文档内容插入到提示词中</div>
        </div>
      </div>

      <div class="flow-arrow">→</div>

      <!-- Step 4: Generate -->
      <div class="flow-step highlight">
        <div class="step-number">4</div>
        <div class="step-content">
          <div class="step-icon">🤖</div>
          <div class="step-title">生成回答</div>
          <div class="step-desc">基于检索到的信息生成答案</div>
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header">📄 增强后的提示词示例</div>
      <div class="example-content">
        <div class="example-section">
          <span class="section-label">系统提示：</span>
          <span class="section-text">你是一个技术助手。</span>
        </div>
        <div class="example-section">
          <span class="section-label">检索到的文档：</span>
          <div class="retrieved-docs">
            <div class="doc-item">
              📄 Doc 1: "RAG 是一种结合检索和生成的技术..."
            </div>
            <div class="doc-item">
              📄 Doc 2: "RAG 的优势是减少幻觉、提高准确性..."
            </div>
            <div class="doc-item">
              📄 Doc 3: "常见的 RAG 框架包括 LangChain..."
            </div>
          </div>
        </div>
        <div class="example-section">
          <span class="section-label">用户问题：</span>
          <span class="section-text">什么是 RAG？</span>
        </div>
      </div>
    </div>

    <div class="benefits">
      <div class="benefit-item">
        <span class="benefit-icon">✅</span>
        <span><strong>减少幻觉</strong>：基于真实文档回答，不瞎编</span>
      </div>
      <div class="benefit-item">
        <span class="benefit-icon">📚</span>
        <span><strong>知识更新</strong>：无需重新训练，只需更新文档库</span>
      </div>
      <div class="benefit-item">
        <span class="benefit-icon">🎯</span>
        <span><strong>答案可溯源</strong>：可以知道答案来自哪篇文档</span>
      </div>
      <div class="benefit-item">
        <span class="benefit-icon">💰</span>
        <span><strong>降低成本</strong>：不需要频繁微调模型</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rag-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.pipeline-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
  text-align: center;
}

.pipeline-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 120px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.flow-step.highlight .step-number {
  background: var(--vp-c-brand);
  color: white;
}

.step-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  width: 100%;
}

.flow-step.highlight .step-content {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.step-title {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: bold;
  margin-bottom: 5px;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.example {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.example-header {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.example-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example-section {
  font-size: 0.85rem;
}

.section-label {
  color: var(--vp-c-brand);
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

.section-text {
  color: var(--vp-c-text-2);
}

.retrieved-docs {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.doc-item {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  padding: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  border-left: 3px solid #fbbf24;
}

.benefits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 768px) {
  .benefits {
    grid-template-columns: 1fr;
  }
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.benefit-icon {
  font-size: 1.3rem;
}
</style>
