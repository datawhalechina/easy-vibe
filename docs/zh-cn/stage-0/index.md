<script setup>
const beginnerItems = [
  { title: '1. 学习地图', link: '/zh-cn/stage-0/0.1-learning-map/', description: '了解整个学习路径，明确每个阶段的目标和收获。' },
  { title: '2. AI 时代，会说话就会编程', link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/', description: '通过贪吃蛇等小游戏，体验 AI 编程的魅力，打破对编程的恐惧。' }
]

const pmItems = [
  { title: '1. 认识 AI IDE 工具', link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/', description: '了解当前主流的 AI 编程工具，选择最适合你的开发搭档。' },
  { title: '2. 动手做出原型', link: '/zh-cn/stage-1/1.2-building-prototype/', description: '学习如何快速将产品想法转化为可视化的原型，进行低成本试错。' },
  { title: '3. 给原型加上 AI 能力', link: '/zh-cn/stage-1/1.3-integrating-ai-capabilities/', description: '通过集成简单的 AI API，让你的原型具备智能交互能力。' },
  { title: '4. 完整项目实战', link: '/zh-cn/stage-1/1.4-complete-project-practice/', description: '综合运用所学知识，从 0 到 1 完成一个完整的产品原型开发。' },
  { title: '附录 A：产品思维补充', link: '/zh-cn/stage-1/appendix-a-product-thinking/', description: '补充产品经理必备的思维模型，提升需求分析与产品设计能力。' },
  { title: '附录 B：常见报错及解决方案', link: '/zh-cn/stage-1/appendix-b-common-errors/', description: '汇总开发过程中常见的报错信息及解决方法，助你快速排查问题。' },
  { title: '附录 C：产业多分类场景方向参考', link: '/zh-cn/stage-1/appendix-industry-scenarios/', description: '提供不同行业的 AI 应用场景参考，激发你的产品灵感。' },
  { title: '扩展阅读 1：7 款主流 Vibe Coding 在线平台实测对比', link: '/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial', description: '深度评测主流 AI 编程平台，助你选择最合适的开发工具。' },
  { title: '扩展阅读 2：用编程和设计智能体开发网站', link: '/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents', description: '探索使用 AI Agent 自动进行编程和设计的前沿实践。' }
]
</script>

# AI 产品经理

欢迎来到 AI 产品经理阶段。在这里，你将从零开始，掌握 Vibe Coding 工作流，成为能够独立完成产品设计的超级个体。

## 新手入门

适合产品、运营及非技术背景。通过做游戏理解 AI 编程逻辑，建立信心。

<ArticleGrid :items="beginnerItems" />

## 产品经理

掌握 Vibe Coding 工作流。学会拆解需求，独立完成高保真 Web 应用原型。

<ArticleGrid :items="pmItems" />
