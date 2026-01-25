<script setup>
const aiItems = [
  { title: '提示词工程', link: '/zh-cn/appendix/prompt-engineering', description: '掌握与 AI 高效对话的技巧，解锁大模型的潜力。' },
  { title: '人工智能进化史', link: '/zh-cn/appendix/ai-evolution', description: '回顾 AI 发展历程中的关键里程碑，理解技术演进脉络。' },
  { title: '大语言模型', link: '/zh-cn/appendix/llm-intro', description: '深入浅出解析大语言模型（LLM）的工作原理与应用。' },
  { title: '多模态大模型', link: '/zh-cn/appendix/vlm-intro', description: '探索能够处理图像、音频等多种数据模态的先进模型。' },
  { title: 'AI 绘画原理', link: '/zh-cn/appendix/image-gen-intro', description: '揭秘 AI 图像生成的底层逻辑与技术实现。' },
  { title: 'AI 音频模型', link: '/zh-cn/appendix/audio-intro', description: '了解 AI 在语音合成、识别与音乐生成领域的应用。' },
  { title: '上下文工程', link: '/zh-cn/appendix/context-engineering', description: '学习如何优化上下文管理，提升 AI 任务的长程连贯性。' },
  { title: 'Agent 智能体', link: '/zh-cn/appendix/agent-intro', description: '探索具备自主决策与执行能力的 AI 智能体架构。' },
  { title: 'AI 能力词典', link: '/zh-cn/appendix/ai-capability-dictionary', description: 'AI 领域常用术语与核心概念的速查手册。' }
]

const frontendItems = [
  { title: 'HTML/CSS/JS 基础', link: '/zh-cn/appendix/web-basics', description: '构建 Web 页面的三大基石，前端开发的入门必修课。' },
  { title: '前端进化史', link: '/zh-cn/appendix/frontend-evolution', description: '了解前端技术栈的演变历程，把握技术发展趋势。' },
  { title: '前端性能优化', link: '/zh-cn/appendix/frontend-performance', description: '学习提升网页加载速度与交互流畅度的关键策略。' },
  { title: 'Canvas 2D 入门', link: '/zh-cn/appendix/canvas-intro', description: '掌握 Canvas 绘图 API，实现炫酷的图形与动画效果。' },
  { title: 'URL 到浏览器显示', link: '/zh-cn/appendix/url-to-browser', description: '全链路解析浏览器渲染页面的完整过程。' },
  { title: '浏览器调试器', link: '/zh-cn/appendix/browser-devtools', description: '熟练使用开发者工具，高效定位与解决前端问题。' }
]

const backendItems = [
  { title: '后端进化史', link: '/zh-cn/appendix/backend-evolution', description: '从单体到微服务，探索后端架构的演进之路。' },
  { title: '后端编程语言', link: '/zh-cn/appendix/backend-languages', description: '对比主流后端语言的特性与适用场景，选择最佳技术栈。' },
  { title: '数据库原理', link: '/zh-cn/appendix/database-intro', description: '理解数据库核心原理，掌握数据存储与检索的艺术。' },
  { title: '系统缓存设计', link: '/zh-cn/appendix/cache-design', description: '学习缓存策略，提升系统的高并发处理能力。' },
  { title: '消息队列设计', link: '/zh-cn/appendix/queue-design', description: '掌握消息队列在解耦、削峰填谷中的关键作用。' },
  { title: '鉴权原理与实战', link: '/zh-cn/appendix/auth-design', description: '构建安全的身份认证与权限管理系统。' },
  { title: '埋点设计', link: '/zh-cn/appendix/tracking-design', description: '科学设计数据埋点，为产品决策提供数据支持。' },
  { title: '线上运维', link: '/zh-cn/appendix/operations', description: '掌握系统部署、监控与故障排查的运维技能。' }
]

const generalItems = [
  { title: 'API 入门', link: '/zh-cn/appendix/api-intro', description: 'API 接口设计与开发的基础知识。' },
  { title: 'IDE 原理', link: '/zh-cn/appendix/ide-intro', description: '了解集成开发环境（IDE）的内部工作机制。' },
  { title: '终端入门', link: '/zh-cn/appendix/terminal-intro', description: '掌握命令行终端的基本操作，提升开发效率。' },
  { title: 'Git 详细介绍', link: '/zh-cn/appendix/git-intro', description: '深入理解 Git 版本控制原理与高级用法。' },
  { title: '计算机网络', link: '/zh-cn/appendix/computer-networks', description: '网络协议与通信原理的基础知识。' },
  { title: '部署与上线', link: '/zh-cn/appendix/deployment', description: '应用部署发布的完整流程与最佳实践。' }
]
</script>

# 附录

人工智能基础与全栈开发基础知识。

## 人工智能基础

了解人工智能的核心概念、发展历史及前沿技术原理。

<ArticleGrid :items="aiItems" />

## 前端开发

掌握前端开发基础知识、性能优化及调试技巧。

<ArticleGrid :items="frontendItems" />

## 后端开发

深入了解后端架构、数据库设计、缓存与消息队列等核心技术。

<ArticleGrid :items="backendItems" />

## 通用技能

熟悉 API、Git、网络等软件开发必备的通用技能。

<ArticleGrid :items="generalItems" />
