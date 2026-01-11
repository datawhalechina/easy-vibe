import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/easy-vibe/',
  title: 'Easy-Vibe Tutorial',
  description: 'Easy-Vibe 中文实战课 - 零基础学会用 AI 干实际工作',
  head: [['link', { rel: 'icon', href: '/easy-vibe/logo.png' }]],
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
        link: '/project/chapter4/chapter4-lets-build-hogwarts-portraits'
      }, // Pointing to Project content as Stage 2 based on context
      {
        text: '高级开发',
        link: '/stage-3/3.3-how-to-build-a-wechat-miniprogram/example1/index'
      },
      { text: '附录', link: '/appendix/ai-capability-dictionary' }
    ],
    sidebar: {
      '/stage-0/': [
        {
          text: 'Stage 0：纯新手',
          items: [
            { text: '0.1 学习地图', link: '/stage-0/0.1-learning-map/' },
            {
              text: '0.2 AI 时代，会说话就会编程',
              link: '/stage-0/0.2-ai-capabilities-through-games/'
            }
          ]
        }
      ],
      '/stage-1/': [
        {
          text: 'Stage 1：产品经理',
          items: [
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
          ]
        }
      ],
      '/project/': [
        {
          text: 'Stage 2：初中级开发',
          items: [
            {
              text: '前端开发实战',
              collapsed: true,
              link: '/project/chapter4/chapter4-lets-build-hogwarts-portraits',
              items: [
                {
                  text: '前端四：霍格沃茨画像',
                  link: '/project/chapter4/chapter4-lets-build-hogwarts-portraits'
                }
              ]
            },
            {
              text: '后端与全栈',
              collapsed: true,
              link: '/project/chapter5/chapter5-from-database-to-supabase',
              items: [
                {
                  text: '后端二：Supabase 数据库',
                  link: '/project/chapter5/chapter5-from-database-to-supabase'
                }
              ]
            },
            {
              text: 'AI 能力集成',
              collapsed: true,
              link: '/project/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration',
              items: [
                {
                  text: 'AI 一：Dify & Knowledge Base',
                  link: '/project/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration'
                }
              ]
            }
          ]
        }
      ],
      '/stage-3/': [
        {
          text: 'Stage 3：高级开发',
          items: [
            {
              text: '微信小程序实战',
              link: '/stage-3/3.3-how-to-build-a-wechat-miniprogram/example1/index'
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
          text: 'Extra 扩展知识',
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
          text: 'Examples 实战案例',
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
