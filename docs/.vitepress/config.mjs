import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Easy-Vibe Tutorial',
  description: 'Easy-Vibe 中文实战课 - 零基础学会用 AI 干实际工作',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '纯新手', link: '/stage-0/0.1-learning-map/' },
      { text: '产品经理', link: '/stage-1/1.1-introduction-to-ai-ide/' },
      {
        text: '初中级开发',
        link: '/stage-2/frontend/2.0-lovart-assets/'
      },
      {
        text: '高级开发',
        link: '/stage-3/core-skills/3.1-mcp-claudecode-skills/'
      },
      { text: '附录', link: '/appendix/ai-capability-dictionary' }
    ],
    sidebar: {
      '/stage-0/': [
        { text: '0.1 学习地图', link: '/stage-0/0.1-learning-map/' },
        {
          text: '0.2 AI 时代，会说话就会编程',
          link: '/stage-0/0.2-ai-capabilities-through-games/'
        }
      ],
      '/stage-1/': [
        {
          text: '1.1 认识 AI IDE 工具',
          link: '/stage-1/1.1-introduction-to-ai-ide/'
        },
        {
          text: '1.2 动手做出原型',
          link: '/stage-1/1.2-building-prototype/'
        },
        {
          text: '1.3 给原型加上 AI 能力',
          link: '/stage-1/1.3-integrating-ai-capabilities/'
        },
        {
          text: '1.4 完整项目实战',
          link: '/stage-1/1.4-complete-project-practice/'
        },
        {
          text: '1.5 大作业：完成一个 Web 应用原型',
          link: '/stage-1/1.5-final-project/'
        },
        {
          text: '附录 A：产品思维补充',
          link: '/stage-1/appendix-a-product-thinking/'
        },
        {
          text: '附录 B：常见报错及解决方案',
          link: '/stage-1/appendix-b-common-errors/'
        }
        ,
        {
          text: '附录示例：贪吃蛇游戏教程',
          link: '/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
        },
        {
          text: '附录示例：用 AI 搭建完整网站',
          link: '/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
        }
      ],
      '/stage-2/': [
        {
          text: '前端开发',
          collapsed: false,
          items: [
            {
              text: '前端零：使用 Lovart 生产素材',
              link: '/stage-2/frontend/2.0-lovart-assets/'
            },
            {
              text: '前端一：Figma 与 MasterGo 入门',
              link: '/stage-2/frontend/2.1-figma-mastergo/'
            },
            {
              text: '前端二：构建第一个现代应用程序 - UI 设计',
              link: '/stage-2/frontend/2.2-ui-design/'
            },
            {
              text: '前端三：参考 UI 设计规范与多产品 UI 设计',
              link: '/stage-2/frontend/2.3-multi-product-ui/'
            },
            {
              text: '前端四：一起做霍格沃茨画像',
              link: '/stage-2/frontend/2.4-hogwarts-portraits/chapter4-lets-build-hogwarts-portraits'
            }
          ]
        },
        {
          text: '后端与全栈',
          collapsed: false,
          items: [
            {
              text: '后端一：什么是 API',
              link: '/stage-2/backend/2.1-what-is-api/extra2/extra2-what-is-api'
            },
            {
              text: '后端二：从数据库到 Supabase',
              link: '/stage-2/backend/2.2-database-supabase/chapter5/chapter5-from-database-to-supabase'
            },
            {
              text: '后端三：大模型辅助编写接口代码与接口文档',
              link: '/stage-2/backend/2.3-ai-interface-code/'
            },
            {
              text: '后端四：Git 工作流',
              link: '/stage-2/backend/2.4-git-workflow/extra1/extra1-what-is-git-and-what-is-github'
            },
            {
              text: '后端五：Zeabur 部署',
              link: '/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications'
            },
            {
              text: '后端六：现代 CLI 开发工具',
              link: '/stage-2/backend/2.6-modern-cli/extra7/extra7-cli-ai-coding-tools-and-the-principles-of-test-driven-development'
            },
            {
              text: '后端七：如何集成 Stripe 等收费系统',
              link: '/stage-2/backend/2.7-stripe-payment/'
            }
          ]
        },
        {
          text: '大作业',
          collapsed: false,
          items: [
            {
              text: '大作业 1：构建第一个现代应用程序 - 全栈应用',
              link: '/stage-2/assignments/2.1-fullstack-app/'
            },
            {
              text: '大作业 2：现代前端组件库 + Trae 实战',
              link: '/stage-2/assignments/2.2-modern-frontend-trae/'
            }
          ]
        },
        {
          text: 'AI 能力附录',
          collapsed: false,
          items: [
            {
              text: 'AI 一：Dify 入门与知识库集成',
              link: '/stage-2/ai-capabilities/2.1-dify-knowledge-base/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration'
            },
            {
              text: 'AI 二：学会查询 AI 词典与集成多模态 API',
              link: '/stage-2/ai-capabilities/2.2-multimodal-api/extra3/extra3-ai-capability-starter-handbook'
            }
          ]
        }
      ],
      '/stage-3/': [
        {
          text: '核心技能',
          collapsed: false,
          items: [
            {
              text: '高级一：MCP 与 ClaudeCode Skills',
              link: '/stage-3/core-skills/3.1-mcp-claudecode-skills/'
            },
            {
              text: '高级二：如何让 Coding Tools 长时间工作',
              link: '/stage-3/core-skills/3.2-long-running-tasks/'
            }
          ]
        },
        {
          text: '多平台开发',
          collapsed: false,
          items: [
            {
              text: '高级三：如何构建微信小程序',
              link: '/stage-3/cross-platform/3.3-wechat-miniprogram/'
            },
            {
              text: '高级四：如何构建微信小程序（包含后端）',
              link: '/stage-3/cross-platform/3.4-wechat-miniprogram-backend/'
            },
            {
              text: '高级五：如何构建安卓程序',
              link: '/stage-3/cross-platform/3.5-android-app/'
            },
            {
              text: '高级六：如何构建 iOS 程序',
              link: '/stage-3/cross-platform/3.6-ios-app/'
            }
          ]
        },
        {
          text: '个人品牌',
          collapsed: false,
          items: [
            {
              text: '高级七：如何构建属于自己的个人网页与学术博客',
              link: '/stage-3/personal-brand/3.7-personal-website-blog/'
            }
          ]
        },
        {
          text: 'AI 能力附录',
          collapsed: false,
          items: [
            {
              text: '高级 AI 一：什么是 RAG 以及它如何工作',
              link: '/stage-3/ai-advanced/3.a1-rag-introduction/extra5-what-is-rag-and-how-does-it-work-and-future'
            },
            {
              text: '高级 AI 二：中高级 RAG 与工作流编排 - 以 LangGraph 为例',
              link: '/stage-3/ai-advanced/3.a2-langgraph-advanced-rag/'
            }
          ]
        }
      ],
      '/guide/': [
        {
          text: '课程指南',
          items: [{ text: '课程介绍', link: '/guide/introduction' }]
        }
      ],
      '/extra/': [
        {
          text: 'Extra 扩展知识（旧版，已迁移到 Stage 2/3）',
          items: [
            {
              text: 'Extra 1: Git & GitHub',
              link: '/extra/extra1/extra1-what-is-git-and-what-is-github'
            },
            {
              text: 'Extra 2: What is API',
              link: '/extra/extra2/extra2-what-is-api'
            },
            {
              text: 'Extra 5: What is RAG',
              link: '/extra/extra5/extra5-what-is-rag-and-how-does-it-work-and-future'
            },
            {
              text: 'Extra 6: Zeabur Deployment',
              link: '/extra/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications'
            },
            {
              text: 'Extra 7: CLI AI Tools & TDD',
              link: '/extra/extra7/extra7-cli-ai-coding-tools-and-the-principles-of-test-driven-development'
            }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples 实战案例（旧版，已迁移到 Stage 0/3）',
          items: [
            {
              text: 'Ex 0.1: Snake Game',
              link: '/examples/example0/example0-1/vibe-coding-tools-snake-game-tutorial'
            },
            {
              text: 'Ex 0.2: Build Website with AI',
              link: '/examples/example0/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
            }
          ]
        }
      ],
      '/project/': [
        {
          text: 'Project 文档（旧版，已迁移到 Stage 2）',
          items: [
            {
              text: '前端四：霍格沃茨画像',
              link: '/project/chapter4/chapter4-lets-build-hogwarts-portraits'
            },
            {
              text: '后端二：Supabase 数据库',
              link: '/project/chapter5/chapter5-from-database-to-supabase'
            },
            {
              text: 'AI 一：Dify & Knowledge Base',
              link: '/project/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration'
            }
          ]
        }
      ],
      '/appendix/': [
        {
          text: '附录',
          items: [
            { text: 'AI 能力词典', link: '/appendix/ai-capability-dictionary' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/datawhalechina/easy-vibe' }
    ]
  }
})
