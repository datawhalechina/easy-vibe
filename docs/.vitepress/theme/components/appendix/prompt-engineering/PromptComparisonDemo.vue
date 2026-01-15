<template>
  <div class="prompt-comparison">
    <div class="comparison-container">
      <!-- Bad Prompt -->
      <div class="prompt-card bad">
        <div class="card-header">
          <span class="card-icon">❌</span>
          <span class="card-title">模糊提示词</span>
        </div>
        <div class="card-body">
          <div class="prompt-text">"写个文章"</div>
          <div class="result-box">
            <div class="result-label">AI 输出：</div>
            <div class="result-content">
              好的，这是一篇关于某个主题的文章...
              <br><br>
              <span class="result-comment">❓ 不清楚要写什么主题、风格、长度</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Good Prompt -->
      <div class="prompt-card good">
        <div class="card-header">
          <span class="card-icon">✅</span>
          <span class="card-title">清晰提示词</span>
        </div>
        <div class="card-body">
          <div class="prompt-text">
            "请以<strong>技术博客</strong>的形式，写一篇关于<strong>提示词工程</strong>的文章。
            目标读者：<strong>初学者</strong>。字数：<strong>800-1000 字</strong>。
            包含<strong>3 个实用技巧</strong>和<strong>代码示例</strong>。"
          </div>
          <div class="result-box">
            <div class="result-label">AI 输出：</div>
            <div class="result-content">
              # 提示词工程入门指南
              <br><br>
              作为 AI 时代的核心技能...
              <br><br>
              <span class="result-comment success">✨ 符合所有要求，输出精准</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="key-points">
      <div class="point">
        <span class="point-icon">🎯</span>
        <span><strong>明确目标</strong>：说明要做什么（写文章、写代码、分析）</span>
      </div>
      <div class="point">
        <span class="point-icon">📋</span>
        <span><strong>提供细节</strong>：主题、风格、长度、格式等具体要求</span>
      </div>
      <div class="point">
        <span class="point-icon">👥</span>
        <span><strong>指定受众</strong>：说明目标读者（初学者/专家/儿童等）</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prompt-comparison {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}

.prompt-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.prompt-card.bad {
  border-color: #ef4444;
}

.prompt-card.good {
  border-color: #22c55e;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 15px;
  background: var(--vp-c-bg-mute);
}

.bad .card-header {
  background: rgba(239, 68, 68, 0.1);
}

.good .card-header {
  background: rgba(34, 197, 94, 0.1);
}

.card-icon {
  font-size: 1.3rem;
}

.card-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.card-body {
  padding: 15px;
}

.prompt-text {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  line-height: 1.6;
}

.result-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
}

.result-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.result-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.result-comment {
  display: block;
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.result-comment:not(.success) {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.result-comment.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.key-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.point {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.point-icon {
  font-size: 1.3rem;
}
</style>
