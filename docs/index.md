---
layout: home
hero:
  name: 'Easy-Vibe'
  text: 'Learn Vibe Coding from 0 to 1'
  tagline:
    - 不止是写代码，而是成为集产品、设计、全栈开发于一身的超级个体。
    - 从想法到原型，从原型到上线，把每一次输出变成可交付的产品。
    - 让 AI 成为你的搭档：更快、更稳、更有创造力。
    - 用系统化的学习路径，构建你的个人技术与产品护城河。
  actions:
    - theme: brand
      text: 开启学习之旅
      link: /stage-0/0.1-learning-map/
    - theme: alt
      text: ⭐️ github 加速更新
      link: https://github.com/datawhalechina/easy-vibe
features:
  - title: 零基础友好
    details: 专为非技术背景设计。从“会说话就会编程”开始，通过贪吃蛇等小游戏快速上手，打破技术恐惧。
  - title: 循序渐进的实战路径
    details: 独创“三阶段”学习法。从 AI 产品经理思维，到全栈开发落地，再到复杂应用构建，步步为营。
  - title: Vibe Coding 新范式
    details: 掌握 AI 时代的编程核心。学会与 AI 结对编程，让 IDE 成为你的最强搭档。
  - title: 真实项目驱动
    details: 拒绝玩具代码。亲手构建 Web 原型、全栈应用、微信小程序，将每一个想法真正落地为产品。
---

<div align="center" style="margin-top: 40px; margin-bottom: 40px;">
  <h2 style="border: none; font-size: 2rem; font-weight: 700; margin-bottom: 20px;">为什么选择 Easy-Vibe？</h2>
  <p style="font-size: 1.2rem; color: var(--vp-c-text-2); max-width: 800px; margin: 0 auto; line-height: 1.6;">
    2025 年是 AI 编程的元年。越来越多的人开始尝试 AI 编程，但往往止步于简单的 Demo。<br>
    Easy-Vibe 致力于填补这一空白，教你如何像专业人士一样，用 AI 组织开发流程，从原型到上线，打通产品落地的最后一公里。
  </p>
</div>

<div class="stage-container">
  <div class="stage-card">
    <div class="stage-icon">🌱</div>
    <h3>Stage 0: 纯新手</h3>
    <p>适合产品、运营及非技术背景。通过做游戏理解 AI 编程逻辑，建立信心。</p>
    <a href="./stage-0/0.1-learning-map/">查看详情 →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🎨</div>
    <h3>Stage 1: AI 产品经理</h3>
    <p>掌握 Vibe Coding 工作流。学会拆解需求，独立完成高保真 Web 应用原型。</p>
    <a href="./stage-1/1.1-introduction-to-ai-ide/">查看详情 →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>Stage 2: 初中级开发</h3>
    <p>深入全栈开发。前端组件化、数据库设计、后端 API 开发与部署上线。</p>
    <a href="./stage-2/frontend/2.0-lovart-assets/">查看详情 →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>Stage 3: 高级开发</h3>
    <p>构建复杂跨平台应用。微信小程序实战，挑战更高阶的 AI 原生应用开发。</p>
    <a href="./stage-3/core-skills/3.1-mcp-claudecode-skills/">查看详情 →</a>
  </div>
</div>

<style>
.VPHomeHero .text {
  font-size: 1.8rem;
}

.stage-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 20px;
}

  .stage-card:nth-child(1) { --card-color: #10b981; } /* Green for Stage 0 */
  .stage-card:nth-child(2) { --card-color: #3b82f6; } /* Blue for Stage 1 */
  .stage-card:nth-child(3) { --card-color: #8b5cf6; } /* Purple for Stage 2 */
  .stage-card:nth-child(4) { --card-color: #f59e0b; } /* Orange for Stage 3 */

  .stage-card {
    background-color: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 24px;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    border: 1px solid var(--vp-c-bg-soft);
    position: relative;
    overflow: hidden;
  }

  .stage-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: var(--card-color);
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .stage-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--card-color);
  }

  .stage-card:hover::before {
    opacity: 1;
  }

  .stage-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  }

  .stage-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--vp-c-text-1);
    transition: color 0.2s;
  }
  
  .stage-card:hover h3 {
    color: var(--card-color);
  }

  .stage-card p {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .stage-card a {
    color: var(--card-color);
    font-weight: 500;
    text-decoration: none;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    transition: transform 0.2s;
  }

  .stage-card a:hover {
    text-decoration: none;
    transform: translateX(4px);
  }
</style>

<div class="footer-cta">
  <p class="love-text">Made with ❤️ by Open Source Contributors</p>
  <h3 class="support-title">觉得有帮助？</h3>
  <p class="support-text">你的 Star 是我们持续更新的动力 🚀</p>
  <div class="github-badge">
    <a href="https://github.com/datawhalechina/easy-vibe" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/stars/datawhalechina/easy-vibe?style=social&label=Star on GitHub" alt="GitHub stars"/>
    </a>
  </div>
</div>

<style>
/* ... existing styles ... */
.footer-cta {
  margin-top: 100px;
  padding: 40px 24px;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  border: 1px solid var(--vp-c-bg-soft);
  transition: border-color 0.3s;
}

.footer-cta:hover {
  border-color: var(--vp-c-brand);
}

.love-text {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  margin-bottom: 24px;
  font-family: var(--vp-font-family-mono);
}

.support-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.support-text {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.github-badge {
  display: flex;
  justify-content: center;
  align-items: center;
}

.github-badge img {
  height: 32px; /* Make the button slightly larger */
}

/* Custom style for the GitHub Star button in Hero section */
.VPButton.alt[href*="github.com"] {
  background: linear-gradient(90deg, #8B5CF6, #EC4899, #8B5CF6);
  background-size: 200% auto;
  border: 1px solid transparent !important;
  color: white !important;
  font-weight: 600;
  animation: gradient 3s linear infinite;
  box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.5);
  transition: all 0.3s ease;
}

.VPButton.alt[href*="github.com"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
  background-position: right center;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
</style>
