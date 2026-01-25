<script setup>
const frontendItems = [
  { title: '前端零：使用 Lovart 生产素材', link: '/zh-cn/stage-2/frontend/2.0-lovart-assets/', description: '学习如何使用 Lovart 等 AI 工具快速生成高质量的游戏素材与 UI 资源。' },
  { title: '前端一：Figma 与 MasterGo 入门', link: '/zh-cn/stage-2/frontend/2.1-figma-mastergo/', description: '掌握专业 UI 设计工具的基础操作，从设计稿到代码的协作流程。' },
  { title: '前端二：构建第一个现代应用程序 - UI 设计', link: '/zh-cn/stage-2/frontend/2.2-ui-design/', description: '从零开始设计一个现代 Web 应用的界面，实践 UI 设计原则。' },
  { title: '前端三：参考 UI 设计规范与多产品 UI 设计', link: '/zh-cn/stage-2/frontend/2.3-multi-product-ui/', description: '学习主流 UI 设计规范，提升产品设计的一致性与美感。' },
  { title: '前端四：一起做霍格沃茨画像', link: '/zh-cn/stage-2/frontend/2.4-hogwarts-portraits/chapter4-lets-build-hogwarts-portraits', description: '实战项目：结合 AI 生成的图像，构建一个交互式的霍格沃茨画像应用。' }
]

const backendItems = [
  { title: '后端一：什么是 API', link: '/zh-cn/stage-2/backend/2.1-what-is-api/extra2/extra2-what-is-api', description: '理解 API 的核心概念，它是前后端交互的桥梁。' },
  { title: '后端二：从数据库到 Supabase', link: '/zh-cn/stage-2/backend/2.2-database-supabase/chapter5/chapter5-from-database-to-supabase', description: '掌握关系型数据库基础，并学习使用 Supabase 这一现代 BaaS 平台。' },
  { title: '后端三：大模型辅助编写接口代码与接口文档', link: '/zh-cn/stage-2/backend/2.3-ai-interface-code/', description: '利用 AI 辅助生成后端接口代码及标准的接口文档，提升开发效率。' },
  { title: '后端四：Git 工作流', link: '/zh-cn/stage-2/backend/2.4-git-workflow/extra1/extra1-what-is-git-and-what-is-github', description: '掌握 Git 版本控制系统的核心操作与协作流程。' },
  { title: '后端五：Zeabur 部署', link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications', description: '学习使用 Zeabur 快速部署你的全栈应用到云端。' },
  { title: '后端六：现代 CLI 开发工具', link: '/zh-cn/stage-2/backend/2.6-modern-cli/extra7/extra7-cli-ai-coding-tools-and-the-principles-of-test-driven-development', description: '探索现代 CLI 工具，提升命令行环境下的开发体验。' },
  { title: '后端七：如何集成 Stripe 等收费系统', link: '/zh-cn/stage-2/backend/2.7-stripe-payment/', description: '实战：为你的应用集成 Stripe 支付功能，实现商业化变现。' }
]

const assignmentItems = [
  { title: '大作业 1：构建第一个现代应用程序 - 全栈应用', link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/', description: '综合运用所学知识，独立完成一个功能完整的全栈应用开发。' },
  { title: '大作业 2：现代前端组件库 + Trae 实战', link: '/zh-cn/stage-2/assignments/2.2-modern-frontend-trae/', description: '使用现代组件库与 Trae IDE，高效构建复杂的前端界面。' }
]

const aiItems = [
  { title: 'AI 一：Dify 入门与知识库集成', link: '/zh-cn/stage-2/ai-capabilities/2.1-dify-knowledge-base/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration', description: '学习使用 Dify 构建 AI 应用，并集成私有知识库。' },
  { title: 'AI 二：学会查询 AI 词典与集成多模态 API', link: '/zh-cn/stage-2/ai-capabilities/2.2-multimodal-api/extra3/extra3-ai-capability-starter-handbook', description: '探索更多 AI 能力，集成视觉、语音等多模态 API。' }
]
</script>

# 初中级开发

深入全栈开发。前端组件化、数据库设计、后端 API 开发与部署上线。

## 前端开发

掌握现代前端开发，学习组件库与设计工具的使用。

<ArticleGrid :items="frontendItems" />

## 后端与全栈

学习 API 设计、数据库管理以及应用部署策略。

<ArticleGrid :items="backendItems" />

## 大作业

通过实战项目巩固你的全栈开发技能。

<ArticleGrid :items="assignmentItems" />

## AI 能力附录

集成知识库、多模态 API 等 AI 功能，提升应用智能化水平。

<ArticleGrid :items="aiItems" />
