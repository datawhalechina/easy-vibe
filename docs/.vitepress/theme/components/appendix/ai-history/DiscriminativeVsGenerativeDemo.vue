<template>
  <div class="discriminative-vs-generative-demo">
    <div class="demo-header">
      <h4>🎯 判别式 vs 生成式 AI</h4>
      <p>理解两种不同的 AI 范式</p>
    </div>

    <div class="comparison-container">
      <!-- Discriminative AI -->
      <div class="ai-panel discriminative" :class="{ active: mode === 'discriminative' }" @click="mode = 'discriminative'">
        <div class="panel-header">
          <div class="icon">🔍</div>
          <h5>判别式 AI</h5>
          <div class="tag">分类/识别</div>
        </div>

        <div class="panel-content">
          <div class="input-output">
            <div class="io-box input">
              <div class="io-label">输入</div>
              <div class="io-content">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%2348bb78'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-size='12'%3E猫图%3C/text%3E%3C/svg%3E" alt="cat" />
              </div>
            </div>

            <div class="arrow">↓</div>

            <div class="io-box output">
              <div class="io-label">输出</div>
              <div class="io-content">
                <div class="result-tag">这是猫</div>
                <div class="probability">置信度: 98%</div>
              </div>
            </div>
          </div>

          <div class="examples">
            <h6>典型应用:</h6>
            <div class="example-tags">
              <span class="tag">图像分类</span>
              <span class="tag">垃圾邮件过滤</span>
              <span class="tag">疾病诊断</span>
              <span class="tag">人脸识别</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Generative AI -->
      <div class="ai-panel generative" :class="{ active: mode === 'generative' }" @click="mode = 'generative'">
        <div class="panel-header">
          <div class="icon">✨</div>
          <h5>生成式 AI</h5>
          <div class="tag">创造/生成</div>
        </div>

        <div class="panel-content">
          <div class="input-output">
            <div class="io-box input">
              <div class="io-label">输入</div>
              <div class="io-content">
                <div class="prompt-text">"一只戴墨镜的猫"</div>
              </div>
            </div>

            <div class="arrow">↓</div>

            <div class="io-box output">
              <div class="io-label">输出</div>
              <div class="io-content">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'%3E%3Crect width='80' height='60' fill='%23667eea'/%3E%3Ccircle cx='30' cy='25' r='3' fill='black'/%3E%3Cline x1='27' y1='25' x2='33' y2='25' stroke='black' stroke-width='1'/%3E%3Cellipse cx='30' cy='30' rx='8' ry='6' fill='white'/%3E%3Ccircle cx='30' cy='28' r='2' fill='black'/%3E%3Cpath d='M 22 20 Q 30 15 38 20' stroke='orange' stroke-width='2' fill='none'/%3E%3Cpath d='M 38 35 Q 50 30 55 40' stroke='gray' stroke-width='3' fill='none'/%3E%3C/svg%3E" alt="generated cat" />
                <div class="generated-label">生成图像 ✓</div>
              </div>
            </div>
          </div>

          <div class="examples">
            <h6>典型应用:</h6>
            <div class="example-tags">
              <span class="tag">ChatGPT</span>
              <span class="tag">Midjourney</span>
              <span class="tag">代码生成</span>
              <span class="tag">音乐创作</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h5>📊 核心差异对比</h5>
      <table>
        <thead>
          <tr>
            <th>维度</th>
            <th>判别式 AI</th>
            <th>生成式 AI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>目标</strong></td>
            <td>区分、分类、识别</td>
            <td>创造、生成新内容</td>
          </tr>
          <tr>
            <td><strong>输入</strong></td>
            <td>数据（图像、文本等）</td>
            <td>提示词、噪声、种子</td>
          </tr>
          <tr>
            <td><strong>输出</strong></td>
            <td>标签、类别、概率</td>
            <td>新的数据（文本、图像等）</td>
          </tr>
          <tr>
            <td><strong>学习方式</strong></td>
            <td>学习 P(标签|数据)</td>
            <td>学习 P(数据)</td>
          </tr>
          <tr>
            <td><strong>代表模型</strong></td>
            <td>ResNet, BERT(分类)</td>
            <td>GPT, DALL-E, Stable Diffusion</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="key-insight">
      <h5>💡 关键洞察</h5>
      <p>
        <strong>判别式 AI</strong>就像考试中的"选择题"——从给定选项中选出正确答案。<br>
        <strong>生成式 AI</strong>就像考试中的"简答题"——自己创造出全新的答案。
      </p>
      <p class="note">
        从 2020 年代开始，生成式 AI 迅速崛起，成为人工智能的主流方向。
        GPT、Midjourney 等模型展现出了惊人的创造力，开启了 AI 2.0 时代。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('discriminative')
</script>

<style scoped>
.discriminative-vs-generative-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.ai-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.ai-panel:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
}

.ai-panel.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.ai-panel.discriminative {
  --ev-panel-accent: var(--vp-c-green-1, #22c55e);
}

.ai-panel.discriminative.active {
  border-color: var(--ev-panel-accent);
}

.ai-panel.generative {
  --ev-panel-accent: var(--vp-c-brand);
}

.ai-panel.generative.active {
  border-color: var(--ev-panel-accent);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.icon {
  font-size: 2rem;
}

.panel-header h5 {
  margin: 0;
  flex: 1;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.input-output {
  margin-bottom: 1.5rem;
}

.io-box {
  margin-bottom: 1rem;
}

.io-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.io-content {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.io-content img {
  max-width: 100%;
  height: auto;
}

.result-tag,
.prompt-text {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.probability {
  font-size: 0.875rem;
  color: var(--vp-c-green-1, #22c55e);
  font-weight: 600;
}

.generated-label {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  margin: 0.5rem 0;
}

.examples h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example-tags .tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
}

.comparison-table {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.comparison-table h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  text-align: left;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

tbody tr:last-child td {
  border-bottom: none;
}

.key-insight {
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.15);
  padding: 1.5rem;
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.key-insight h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.key-insight p {
  margin: 0 0 1rem 0;
  line-height: 1.8;
}

.key-insight .note {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }
}
</style>
