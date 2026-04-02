/**
 * 统一维护教程“相关文章”映射表：
 * - key: 文档相对路径（不含 /index.md）
 * - value: 该文档底部相关文章卡片数组
 * 页面只负责按 key 读取并渲染，不在页面内重复维护映射数据。
 */
export const relatedArticlesMap = {
  'zh-cn/stage-1/learning-map': [
    {
      href: '/zh-cn/stage-1/ai-capabilities-through-games/',
      title: '0.2 用“小游戏”理解 AI 能力边界',
      description: '先用游戏化方式建立手感，快速理解“什么问题适合交给 AI”。',
      icon: '🎮'
    },
    {
      href: '/zh-cn/stage-1/finding-great-idea/',
      title: '1.0 找到值得做的点子',
      description: '把“我有想法”变成“我有可验证的产品方向”。',
      icon: '💡'
    },
    {
      href: '/zh-cn/stage-1/building-prototype/',
      title: '1.2 把想法做成可交互原型',
      description: '从需求拆解到页面落地，快速完成第一版 Demo。',
      icon: '🧩'
    },
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '2.0 从 NanoBanana 出发做素材 Agent',
      description: '进入实战阶段，学习构建稳定可复用的素材生产流程。',
      icon: '🖼️'
    }
  ],
  'zh-cn/stage-1/ai-capabilities-through-games': [
    {
      href: '/zh-cn/stage-1/introduction-to-ai-ide/',
      title: '初级二：学会 AI 编程工具',
      description: '把网页试玩升级到本地 AI IDE，建立完整开发环境。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-1/finding-great-idea/',
      title: '初级：找到好点子',
      description: '从“会用工具”走向“做对方向”，明确真实用户问题。',
      icon: '💡'
    },
    {
      href: '/zh-cn/stage-1/learning-map/',
      title: '返回学习地图',
      description: '按完整路线查看每个阶段目标与推荐学习顺序。',
      icon: '🗺️'
    }
  ],
  'zh-cn/stage-1/introduction-to-ai-ide': [
    {
      href: '/zh-cn/stage-1/building-prototype/',
      title: '初级三：动手做出原型',
      description: '从会用 AI IDE 进阶到真正落地业务原型。',
      icon: '🧩'
    },
    {
      href: '/zh-cn/stage-1/integrating-ai-capabilities/',
      title: '初级四：给原型加上 AI 能力',
      description: '接入真实 API，让页面从“可看”变“可用”。',
      icon: '🤖'
    },
    {
      href: '/zh-cn/stage-1/appendix-b-common-errors/',
      title: '附录：常见报错与解决方案',
      description: '遇到环境、依赖或运行异常时，快速定位并修复。',
      icon: '🛠️'
    }
  ],
  'zh-cn/stage-1/building-prototype': [
    {
      href: '/zh-cn/stage-1/integrating-ai-capabilities/',
      title: '初级四：给原型加上 AI 能力',
      description: '把静态原型升级为可调用真实模型服务的应用。',
      icon: '🤖'
    },
    {
      href: '/zh-cn/stage-1/complete-project-practice/',
      title: '初级五：完整项目实战',
      description: '补齐数据、交互与异常处理，完成可演示的完整项目。',
      icon: '🚀'
    },
    {
      href: '/zh-cn/stage-2/frontend/figma-mastergo/',
      title: '进阶：Figma 与 MasterGo 入门',
      description: '继续强化设计到开发的协作流程，为工程化打基础。',
      icon: '🎨'
    }
  ],
  'zh-cn/stage-1/integrating-ai-capabilities': [
    {
      href: '/zh-cn/stage-1/complete-project-practice/',
      title: '初级五：完整项目实战',
      description: '把分散能力拼成完整业务链路，做出可展示的成品。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '初中级：素材生产 Agent',
      description: '进入更真实的多模型协同流程，搭建可复用的生成系统。',
      icon: '🖼️'
    },
    {
      href: '/zh-cn/stage-2/backend/ai-interface-code/',
      title: '初中级：后端接口设计与开发',
      description: '把 AI 能力规范地接入后端接口，提升工程可维护性。',
      icon: '🔌'
    }
  ],
  'zh-cn/stage-1/complete-project-practice': [
    {
      href: '/zh-cn/stage-2/frontend/lovart-assets/',
      title: '初中级前端：素材生产 Agent',
      description: '学习更复杂的多模型素材生产流程，提升视觉资产效率。',
      icon: '🎯'
    },
    {
      href: '/zh-cn/stage-2/assignments/fullstack-app/',
      title: 'Stage 2 大作业：全栈应用实战',
      description: '把原型能力升级为前后端一体化的可上线应用。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/backend/database-supabase/',
      title: '初中级后端：从数据库到 Supabase',
      description: '补齐数据建模、存储与权限能力，迈向工程化开发。',
      icon: '🗄️'
    }
  ],
  'zh-cn/stage-2/frontend/lovart-assets': [
    {
      href: '/zh-cn/stage-2/frontend/figma-mastergo/',
      title: '2.1 Figma 与 MasterGo 入门',
      description: '把素材放进设计稿，建立从视觉到布局的结构化表达。',
      icon: '🎨'
    },
    {
      href: '/zh-cn/stage-2/frontend/ui-design/',
      title: '2.2 构建第一个现代应用程序 - UI 设计',
      description: '在统一视觉规范下，完成页面层级、组件和布局设计。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/design-to-code/',
      title: '2.6 从设计原型到项目代码',
      description: '把设计稿准确转成可维护的前端代码与组件结构。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/frontend/modern-component-library/',
      title: '2.7 使用现代组件库更新你的界面',
      description: '利用组件库做工程化提效，让界面一致性更稳定。',
      icon: '🧩'
    }
  ],
  'zh-cn/stage-2/frontend/figma-mastergo': [
    {
      href: '/zh-cn/stage-2/frontend/ui-design/',
      title: '2.2 构建第一个现代应用程序 - UI 设计',
      description: '继续完善界面结构、视觉层级与交互细节。',
      icon: '🧱'
    },
    {
      href: '/zh-cn/stage-2/frontend/design-to-code/',
      title: '2.6 从设计原型到项目代码',
      description: '把设计稿系统化转译为可维护的前端代码。',
      icon: '💻'
    },
    {
      href: '/zh-cn/stage-2/frontend/modern-component-library/',
      title: '2.7 使用现代组件库更新你的界面',
      description: '用组件库统一 UI 规范并提升页面开发效率。',
      icon: '🧩'
    }
  ]
}
