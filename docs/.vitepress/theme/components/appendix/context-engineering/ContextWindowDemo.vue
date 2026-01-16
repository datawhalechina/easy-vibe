<template>
  <div class="context-window-demo">
    <div class="window-comparison">
      <!-- Short Context -->
      <div class="model-card">
        <div class="model-header">
          <span class="model-icon">📱</span>
          <span class="model-title">短上下文模型</span>
        </div>
        <div class="model-body">
          <div class="window-visual">
            <div class="window-bar">
              <div class="window-label">上下文窗口: 4K tokens</div>
              <div class="window-size">
                <div class="size-fill short" :style="{ width: '20%' }"></div>
              </div>
            </div>
            <div class="content-preview">
              <div class="content-item system">系统提示词</div>
              <div class="content-item user">用户消息</div>
              <div class="content-item assistant">助手回复</div>
              <div class="content-item warning">⚠️ 只能处理短文档</div>
            </div>
          </div>
          <div class="model-info">
            <div class="info-item">
              <span class="label">窗口大小:</span>
              <span>4K tokens (~3000 字)</span>
            </div>
            <div class="info-item">
              <span class="label">适用场景:</span>
              <span>问答、摘要、对话</span>
            </div>
            <div class="info-item">
              <span class="label">代表模型:</span>
              <span>GPT-3.5, Claude 2</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Long Context -->
      <div class="model-card highlight">
        <div class="model-header">
          <span class="model-icon">📚</span>
          <span class="model-title">长上下文模型</span>
        </div>
        <div class="model-body">
          <div class="window-visual">
            <div class="window-bar">
              <div class="window-label">上下文窗口: 200K tokens</div>
              <div class="window-size">
                <div class="size-fill long" :style="{ width: '100%' }"></div>
              </div>
            </div>
            <div class="content-preview">
              <div class="content-item system">系统提示词</div>
              <div class="content-item user">用户消息</div>
              <div class="content-item docs">📄 完整技术文档</div>
              <div class="content-item docs">📄 代码库文件</div>
              <div class="content-item assistant">助手回复</div>
              <div class="content-item success">✅ 可处理长文档</div>
            </div>
          </div>
          <div class="model-info">
            <div class="info-item">
              <span class="label">窗口大小:</span>
              <span>200K tokens (~15 万字)</span>
            </div>
            <div class="info-item">
              <span class="label">适用场景:</span>
              <span>长文档分析、代码审查</span>
            </div>
            <div class="info-item">
              <span class="label">代表模型:</span>
              <span>GPT-4, Claude 3, Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <div class="tip">
        <span class="tip-icon">💡</span>
        <span
          ><strong>选择合适的模型</strong>：短对话用短上下文模型（更快更便宜），
          长文档分析用长上下文模型（避免信息丢失）</span
        >
      </div>
      <div class="tip">
        <span class="tip-icon">📏</span>
        <span
          ><strong>注意 Token 计算</strong>：1 Token ≈ 0.75 个英文单词 或 0.5-1
          个汉字。 100K tokens 大约等于一本 300 页的书</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.context-window-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.window-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .window-comparison {
    grid-template-columns: 1fr;
  }
}

.model-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.model-card.highlight {
  border-color: var(--vp-c-brand);
}

.model-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 15px;
  background: var(--vp-c-bg-mute);
}

.model-card.highlight .model-header {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.model-icon {
  font-size: 1.5rem;
}

.model-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.model-body {
  padding: 15px;
}

.window-visual {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
}

.window-bar {
  margin-bottom: 12px;
}

.window-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.window-size {
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.size-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.size-fill.short {
  background: #ef4444;
}

.size-fill.long {
  background: var(--vp-c-brand);
}

.content-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.content-item {
  font-size: 0.8rem;
  padding: 6px 10px;
  border-radius: 4px;
  text-align: center;
}

.content-item.system {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.content-item.user {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.content-item.assistant {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.content-item.docs {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.content-item.warning {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.content-item.success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.model-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.info-item .label {
  color: var(--vp-c-text-3);
}

.info-item span:last-child {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.tips {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tip {
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

.tip-icon {
  font-size: 1.3rem;
}
</style>
