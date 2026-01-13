---
layout: home
hero:
  name: 'Easy-Vibe'
  text: 'Learn Vibe Coding from 0 to 1'
  tagline:
    - Become a super individual combining product, design, and full-stack development.
    - From idea to prototype, from prototype to production, turn every output into a deliverable product.
    - Make AI your partner: faster, more stable, more creative.
    - Build your personal technology and product moat with a systematic learning path.
  actions:
    - theme: brand
      text: Start Learning
      link: /stage-0/0.1-learning-map/
    - theme: alt
      text: ⭐️ Star on GitHub
      link: https://github.com/datawhalechina/easy-vibe
features:
  - title: Beginner-Friendly
    details: Designed for non-technical backgrounds. Start with "if you can speak, you can code", quickly get started through games like Snake, and overcome technical fear.
  - title: Progressive Practical Path
    details: Unique "three-stage" learning method. From AI product manager thinking, to full-stack development implementation, to complex application construction, step by step.
  - title: Vibe Coding New Paradigm
    details: Master the core of AI era programming. Learn to pair-program with AI, making your IDE your strongest partner.
  - title: Real Project-Driven
    details: No toy code. Build web prototypes, full-stack applications, WeChat mini-programs with your own hands, and truly land every idea as a product.
---

<div align="center" style="margin-top: 40px; margin-bottom: 40px;">
  <h2 style="border: none; font-size: 2rem; font-weight: 700; margin-bottom: 20px;">Why Choose Easy-Vibe?</h2>
  <p style="font-size: 1.2rem; color: var(--vp-c-text-2); max-width: 800px; margin: 0 auto; line-height: 1.6;">
    2025 is the first year of AI programming. More and more people are trying AI programming, but often stop at simple demos.<br>
    Easy-Vibe is dedicated to filling this gap, teaching you how to organize the development process with AI like a professional, from prototype to production, bridging the last mile of product landing.
  </p>
</div>

<div class="stage-container">
  <div class="stage-card">
    <div class="stage-icon">🌱</div>
    <h3>Stage 0: Getting Started</h3>
    <p>Suitable for product, operations, and non-technical backgrounds. Understand AI programming logic through games and build confidence.</p>
    <a href="./stage-0/0.1-learning-map/">Learn More →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🎨</div>
    <h3>Stage 1: AI Product Manager</h3>
    <p>Master the Vibe Coding workflow. Learn to break down requirements and independently complete high-fidelity web application prototypes.</p>
    <a href="./stage-1/1.1-introduction-to-ai-ide/">Learn More →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>Stage 2: Full-Stack Development</h3>
    <p>Dive deep into full-stack development. Frontend componentization, database design, backend API development, and deployment.</p>
    <a href="./stage-2/frontend/2.0-lovart-assets/">Learn More →</a>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>Stage 3: Advanced Development</h3>
    <p>Build complex cross-platform applications. WeChat mini-program practical实战, challenge higher-level AI-native application development.</p>
    <a href="./stage-3/core-skills/3.1-mcp-claudecode-skills/">Learn More →</a>
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
  <h3 class="support-title">Find this helpful?</h3>
  <p class="support-text">Your Star motivates us to keep updating 🚀</p>
  <div class="github-badge">
    <a href="https://github.com/datawhalechina/easy-vibe" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/stars/datawhalechina/easy-vibe?style=social&label=Star on GitHub" alt="GitHub stars"/>
    </a>
  </div>
</div>

<style>
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
  height: 32px;
}

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
