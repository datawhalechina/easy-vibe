<script setup>
const coreSkillsItems = [
  { title: '高级一：MCP 与 ClaudeCode Skills', link: '/zh-cn/stage-3/core-skills/3.1-mcp-claudecode-skills/', description: '掌握 Model Context Protocol (MCP)，扩展 AI 编程工具的能力边界。' },
  { title: '高级二：如何让 Coding Tools 长时间工作', link: '/zh-cn/stage-3/core-skills/3.2-long-running-tasks/', description: '学习如何让 AI 编码工具处理长时间运行的复杂任务。' }
]

const crossPlatformItems = [
  { title: '高级三：如何构建微信小程序', link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/', description: '从零开始开发微信小程序，掌握小程序开发的核心流程。' },
  { title: '高级四：如何构建微信小程序（包含后端）', link: '/zh-cn/stage-3/cross-platform/3.4-wechat-miniprogram-backend/', description: '构建带有后端支持的完整微信小程序应用。' },
  { title: '高级五：如何构建安卓程序', link: '/zh-cn/stage-3/cross-platform/3.5-android-app/', description: '使用现代跨平台框架构建 Android 原生应用。' },
  { title: '高级六：如何构建 iOS 程序', link: '/zh-cn/stage-3/cross-platform/3.6-ios-app/', description: '开发并发布 iOS 应用，掌握 iOS 生态的开发规范。' }
]

const personalBrandItems = [
  { title: '高级七：如何构建属于自己的个人网页与学术博客', link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/', description: '使用现代化技术栈搭建高性能、高颜值的个人博客。' }
]

const aiAdvancedItems = [
  { title: '高级 AI 一：什么是 RAG 以及它如何工作', link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/extra5-what-is-rag-and-how-does-it-work-and-future', description: '深入理解检索增强生成 (RAG) 的原理及其在 AI 应用中的价值。' },
  { title: '高级 AI 二：中高级 RAG 与工作流编排 - 以 LangGraph 为例', link: '/zh-cn/stage-3/ai-advanced/3.a2-langgraph-advanced-rag/', description: '学习使用 LangGraph 编排复杂的 AI 工作流，构建高级 RAG 系统。' }
]
</script>

# 高级开发

构建复杂跨平台应用。微信小程序实战，挑战更高阶的 AI 原生应用开发。

## 核心技能

深入掌握 MCP 协议与 Claude Code 高级技巧，提升开发效率。

<ArticleGrid :items="coreSkillsItems" />

## 多平台开发

构建微信小程序、Android 和 iOS 应用，实现跨平台覆盖。

<ArticleGrid :items="crossPlatformItems" />

## 个人品牌

打造属于自己的个人网站与技术博客，建立个人影响力。

<ArticleGrid :items="personalBrandItems" />

## AI 能力附录

探索 RAG、LangGraph 等高级 AI 技术，构建复杂的 AI 应用工作流。

<ArticleGrid :items="aiAdvancedItems" />
