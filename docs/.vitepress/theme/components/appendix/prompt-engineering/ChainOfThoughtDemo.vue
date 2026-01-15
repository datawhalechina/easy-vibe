<template>
  <div class="chain-of-thought-demo">
    <div class="comparison-container">
      <!-- Direct Answer -->
      <div class="method-card">
        <div class="method-header">
          <span class="method-icon">⚡</span>
          <span class="method-title">直接回答</span>
        </div>
        <div class="method-body">
          <div class="prompt-box">
            <div class="prompt-label">提示词</div>
            <div class="prompt-text">
              罗杰有 5 个网球。他又买了 2 罐网球，每罐有 3 个球。
              现在他总共有多少个网球？
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="result-box">
            <div class="result-label">AI 可能的输出</div>
            <div class="result-content bad">
              "11 个球。"
              <br><br>
              <span class="badge">错误 ❌</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chain of Thought -->
      <div class="method-card highlight">
        <div class="method-header">
          <span class="method-icon">🧠</span>
          <span class="method-title">思维链 (CoT)</span>
        </div>
        <div class="method-body">
          <div class="prompt-box">
            <div class="prompt-label">提示词</div>
            <div class="prompt-text">
              罗杰有 5 个网球。他又买了 2 罐网球，每罐有 3 个球。
              现在他总共有多少个网球？
              <br><br>
              <span class="instruction">请一步步思考：</span>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="result-box">
            <div class="result-label">AI 输出</div>
            <div class="result-content good">
              <div class="thinking-process">
                ① 罗杰原本有 5 个球<br>
                ② 他买了 2 罐，每罐 3 个：2 × 3 = 6 个<br>
                ③ 总共：5 + 6 = 11 个
              </div>
              <div class="final-answer">
                <strong>答案：11 个球</strong>
              </div>
              <span class="badge success">正确 ✅</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation">
      <div class="exp-item">
        <span class="exp-icon">🔍</span>
        <span><strong>思维链</strong>：让 AI "展示思考过程"，一步步推理问题。
        对于数学、逻辑、推理类问题特别有效！</span>
      </div>
      <div class="exp-item">
        <span class="exp-icon">📝</span>
        <span><strong>触发词</strong>：使用"请一步步思考"、"详细说明推理过程"等提示语可以激活 CoT</span>
      </div>
      <div class="exp-item">
        <span class="exp-icon">🎯</span>
        <span><strong>适用场景</strong>：数学计算、逻辑推理、复杂问题拆解、多步骤任务</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chain-of-thought-demo {
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

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.method-card.highlight {
  border-color: #22c55e;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 15px;
  background: var(--vp-c-bg-mute);
}

.method-card.highlight .method-header {
  background: rgba(34, 197, 94, 0.1);
}

.method-icon {
  font-size: 1.3rem;
}

.method-title {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.method-body {
  padding: 15px;
}

.prompt-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
}

.prompt-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.prompt-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.instruction {
  color: #22c55e;
  font-weight: 600;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 10px 0;
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
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.result-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.thinking-process {
  background: #000;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 0.85rem;
  color: #a1a1aa;
}

.final-answer {
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.badge:not(.success) {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.badge.success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.explanation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exp-item {
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

.exp-icon {
  font-size: 1.3rem;
}
</style>
