---
layout: home
hero:
  name: 'Easy-Vibe'
  text: 'Vibe Coding を 0 から 1 へ'
  tagline:
    - プロダクト、デザイン、フルスタック開発を兼ね備えたスーパー個人になりましょう。
    - アイデアからプロトタイプへ、プロトタイプから製品へ、すべてのアウトプットを納品可能な製品にします。
    - AI をあなたのパートナーに：より速く、より安定して、より創造的に。
    - システマティックな学習パスで、あなたの個人的技術と製品の護城河を構築します。
  actions:
    - theme: brand
      text: 学習を始める
      link: /stage-0/0.1-learning-map/
    - theme: alt
      text: ⭐️ GitHub で Star
      link: https://github.com/datawhalechina/easy-vibe
features:
  - title: 初心者に優しい
    details: 非技術的背景のために設計されています。「話せるならコードも書ける」から始めて、Snake などのゲームを通じて素早く始め、技術への恐怖を克服しましょう。
  - title: 段階的な実践パス
    details: 独自の「3段階」学習法。AI プロダクトマネージャー思考から、フルスタック開発実装、複雑なアプリケーション構築へ、着実に進みます。
  - title: Vibe Coding の新しいパラダイム
    details: AI 時代のプログラミングの中核をマスターしましょう。AI とペアプログラミングする方法を学び、IDE を最強のパートナーにします。
  - title: リアルプロジェクト主導
    details: おもちゃのコードはありません。Web プロトタイプ、フルスタックアプリケーション、WeChat ミニプログラムを自分の手で構築し、すべてのアイデアを本当の製品として落地させます。
---

<div align="center" style="margin-top: 40px; margin-bottom: 40px;">
  <h2 style="border: none; font-size: 2rem; font-weight: 700; margin-bottom: 20px;">Easy-Vibe を選ぶ理由</h2>
  <p style="font-size: 1.2rem; color: var(--vp-c-text-2); max-width: 800px; margin: 0 auto; line-height: 1.6;">
    2025 年は AI プログラミングの元年です。ますます多くの人々が AI プログラミングを試していますが、しばしば単純なデモで止まっています。<br>
    Easy-Vibe はこのギャップを埋めることに専念しており、プロのように AI で開発プロセスを整理し、プロトタイプから製品まで、製品落地の最後の 1 キロを橋渡しする方法を教えます。
  </p>
</div>

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const base = site.value.base
</script>

<div class="stage-container">
  <a :href="base + 'ja-jp/stage-0/0.1-learning-map/'" class="stage-card">
    <div class="stage-icon">🌱</div>
    <h3>Stage 0: 入門</h3>
    <p>プロダクト、運用、非技術的背景に適しています。ゲームを通じて AI プログラミングロジックを理解し、自信を構築しましょう。</p>
    <span>詳しく見る →</span>
  </a>
  <a :href="base + 'ja-jp/stage-1/1.1-introduction-to-ai-ide/'" class="stage-card">
    <div class="stage-icon">🎨</div>
    <h3>Stage 1: AI プロダクトマネージャー</h3>
    <p>Vibe Coding ワークフローをマスターしましょう。要件を分解し、高品質な Web アプリケーションプロトタイプを独立して完成させる方法を学びます。</p>
    <span>詳しく見る →</span>
  </a>
  <a :href="base + 'ja-jp/stage-2/frontend/2.0-lovart-assets/'" class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>Stage 2: フルスタック開発</h3>
    <p>フルスタック開発に深く潜り込みましょう。フロントエンドコンポーネント化、データベース設計、バックエンド API 開発、デプロイメント。</p>
    <span>詳しく見る →</span>
  </a>
  <a :href="base + 'ja-jp/stage-3/core-skills/3.1-mcp-claudecode-skills/'" class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>Stage 3: 上級開発</h3>
    <p>複雑なクロスプラットフォームアプリケーションを構築しましょう。WeChat ミニプログラム実戦、より高レベルの AI ネイティブアプリケーション開発に挑戦します。</p>
    <span>詳しく見る →</span>
  </a>
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
  <h3 class="support-title">お役に立ちましたか？</h3>
  <p class="support-text">あなたの Star が更新の励みになります 🚀</p>
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
