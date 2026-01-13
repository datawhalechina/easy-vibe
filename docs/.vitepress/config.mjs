import { defineConfig } from 'vitepress'

// 判断是否是 Vercel 环境， github page 和 vercel 的部署地址相关不一样
const isVercel = process.env.VERCEL === '1'
const base = isVercel ? '/' : '/easy-vibe/'

// 通用配置
const commonHead = [
  ['link', { rel: 'icon', href: `${base}logo.png`.replace('//', '/') }],
  ['link', { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }]
]

const commonThemeConfig = {
  logo: `${base}logo.png`.replace('//', '/'),
  search: {
    provider: 'local'
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/datawhalechina/easy-vibe' }
  ],
  outline: {
    level: [1, 6]
  }
}

export default defineConfig({
  base: base,

  // 多语言配置 - 使用 cn/en-us/ja 结构
  locales: {
    // 中文
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-cn/',
      title: 'Easy-Vibe 教程',
      description: '从零到一学习 Vibe Coding',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '页面导航'
        },
        nav: [
          { text: '首页', link: '/zh-cn/' },
          { text: '新手入门', link: '/zh-cn/stage-0/0.1-learning-map/' },
          { text: '产品经理', link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: '初中级开发',
            link: '/zh-cn/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: '高级开发',
            link: '/zh-cn/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: '附录', link: '/zh-cn/appendix/ai-capability-dictionary' }
        ],
        sidebar: {
          '/zh-cn/stage-0/': [
            { text: '1. 学习地图', link: '/zh-cn/stage-0/0.1-learning-map/' },
            {
              text: '2. AI 时代，会说话就会编程',
              link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/'
            }
          ],
          '/zh-cn/stage-1/': [
            {
              text: '1. 认识 AI IDE 工具',
              link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/'
            },
            {
              text: '2. 动手做出原型',
              link: '/zh-cn/stage-1/1.2-building-prototype/'
            },
            {
              text: '3. 给原型加上 AI 能力',
              link: '/zh-cn/stage-1/1.3-integrating-ai-capabilities/'
            },
            {
              text: '4. 完整项目实战',
              link: '/zh-cn/stage-1/1.4-complete-project-practice/'
            },
            {
              text: '5. 大作业：完成一个 Web 应用原型',
              link: '/zh-cn/stage-1/1.5-final-project/'
            },
            {
              text: '附录 A：产品思维补充',
              link: '/zh-cn/stage-1/appendix-a-product-thinking/'
            },
            {
              text: '附录 B：常见报错及解决方案',
              link: '/zh-cn/stage-1/appendix-b-common-errors/'
            },
            {
              text: '附录示例：贪吃蛇游戏教程',
              link: '/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
            },
            {
              text: '附录示例：用 AI 搭建完整网站',
              link: '/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
            }
          ],
          '/zh-cn/stage-2/': [
            {
              text: '前端开发',
              collapsed: false,
              items: [
                {
                  text: '前端零：使用 Lovart 生产素材',
                  link: '/zh-cn/stage-2/frontend/2.0-lovart-assets/'
                },
                {
                  text: '前端一：Figma 与 MasterGo 入门',
                  link: '/zh-cn/stage-2/frontend/2.1-figma-mastergo/'
                },
                {
                  text: '前端二：构建第一个现代应用程序 - UI 设计',
                  link: '/zh-cn/stage-2/frontend/2.2-ui-design/'
                },
                {
                  text: '前端三：参考 UI 设计规范与多产品 UI 设计',
                  link: '/zh-cn/stage-2/frontend/2.3-multi-product-ui/'
                },
                {
                  text: '前端四：一起做霍格沃茨画像',
                  link: '/zh-cn/stage-2/frontend/2.4-hogwarts-portraits/chapter4-lets-build-hogwarts-portraits'
                }
              ]
            },
            {
              text: '后端与全栈',
              collapsed: false,
              items: [
                {
                  text: '后端一：什么是 API',
                  link: '/zh-cn/stage-2/backend/2.1-what-is-api/extra2/extra2-what-is-api'
                },
                {
                  text: '后端二：从数据库到 Supabase',
                  link: '/zh-cn/stage-2/backend/2.2-database-supabase/chapter5/chapter5-from-database-to-supabase'
                },
                {
                  text: '后端三：大模型辅助编写接口代码与接口文档',
                  link: '/zh-cn/stage-2/backend/2.3-ai-interface-code/'
                },
                {
                  text: '后端四：Git 工作流',
                  link: '/zh-cn/stage-2/backend/2.4-git-workflow/extra1/extra1-what-is-git-and-what-is-github'
                },
                {
                  text: '后端五：Zeabur 部署',
                  link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications'
                },
                {
                  text: '后端六：现代 CLI 开发工具',
                  link: '/zh-cn/stage-2/backend/2.6-modern-cli/extra7/extra7-cli-ai-coding-tools-and-the-principles-of-test-driven-development'
                },
                {
                  text: '后端七：如何集成 Stripe 等收费系统',
                  link: '/zh-cn/stage-2/backend/2.7-stripe-payment/'
                }
              ]
            },
            {
              text: '大作业',
              collapsed: false,
              items: [
                {
                  text: '大作业 1：构建第一个现代应用程序 - 全栈应用',
                  link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/'
                },
                {
                  text: '大作业 2：现代前端组件库 + Trae 实战',
                  link: '/zh-cn/stage-2/assignments/2.2-modern-frontend-trae/'
                }
              ]
            },
            {
              text: 'AI 能力附录',
              collapsed: false,
              items: [
                {
                  text: 'AI 一：Dify 入门与知识库集成',
                  link: '/zh-cn/stage-2/ai-capabilities/2.1-dify-knowledge-base/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration'
                },
                {
                  text: 'AI 二：学会查询 AI 词典与集成多模态 API',
                  link: '/zh-cn/stage-2/ai-capabilities/2.2-multimodal-api/extra3/extra3-ai-capability-starter-handbook'
                }
              ]
            }
          ],
          '/zh-cn/stage-3/': [
            {
              text: '核心技能',
              collapsed: false,
              items: [
                {
                  text: '高级一：MCP 与 ClaudeCode Skills',
                  link: '/zh-cn/stage-3/core-skills/3.1-mcp-claudecode-skills/'
                },
                {
                  text: '高级二：如何让 Coding Tools 长时间工作',
                  link: '/zh-cn/stage-3/core-skills/3.2-long-running-tasks/'
                }
              ]
            },
            {
              text: '多平台开发',
              collapsed: false,
              items: [
                {
                  text: '高级三：如何构建微信小程序',
                  link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/'
                },
                {
                  text: '高级四：如何构建微信小程序（包含后端）',
                  link: '/zh-cn/stage-3/cross-platform/3.4-wechat-miniprogram-backend/'
                },
                {
                  text: '高级五：如何构建安卓程序',
                  link: '/zh-cn/stage-3/cross-platform/3.5-android-app/'
                },
                {
                  text: '高级六：如何构建 iOS 程序',
                  link: '/zh-cn/stage-3/cross-platform/3.6-ios-app/'
                }
              ]
            },
            {
              text: '个人品牌',
              collapsed: false,
              items: [
                {
                  text: '高级七：如何构建属于自己的个人网页与学术博客',
                  link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/'
                }
              ]
            },
            {
              text: 'AI 能力附录',
              collapsed: false,
              items: [
                {
                  text: '高级 AI 一：什么是 RAG 以及它如何工作',
                  link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/extra5-what-is-rag-and-how-does-it-work-and-future'
                },
                {
                  text: '高级 AI 二：中高级 RAG 与工作流编排 - 以 LangGraph 为例',
                  link: '/zh-cn/stage-3/ai-advanced/3.a2-langgraph-advanced-rag/'
                }
              ]
            }
          ],
          '/zh-cn/guide/': [
            {
              text: '课程指南',
              items: [{ text: '课程介绍', link: '/zh-cn/guide/introduction' }]
            }
          ],
          '/zh-cn/extra/': [
            {
              text: 'Extra 扩展知识（旧版，已迁移到 Stage 2/3）',
              items: [
                {
                  text: 'Extra 1: Git & GitHub',
                  link: '/zh-cn/extra/extra1/extra1-what-is-git-and-what-is-github'
                },
                {
                  text: 'Extra 2: What is API',
                  link: '/zh-cn/extra/extra2/extra2-what-is-api'
                },
                {
                  text: 'Extra 5: What is RAG',
                  link: '/zh-cn/extra/extra5/extra5-what-is-rag-and-how-does-it-work-and-future'
                },
                {
                  text: 'Extra 6: Zeabur Deployment',
                  link: '/zh-cn/extra/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications'
                },
                {
                  text: 'Extra 7: CLI AI Tools & TDD',
                  link: '/zh-cn/extra/extra7/extra7-cli-ai-coding-tools-and-the-principles-of-test-driven-development'
                }
              ]
            }
          ],
          '/zh-cn/examples/': [
            {
              text: 'Examples 实战案例（旧版，已迁移到 Stage 0/3）',
              items: [
                {
                  text: 'Ex 0.1: Snake Game',
                  link: '/zh-cn/examples/example0/example0-1/vibe-coding-tools-snake-game-tutorial'
                },
                {
                  text: 'Ex 0.2: Build Website with AI',
                  link: '/zh-cn/examples/example0/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
                }
              ]
            }
          ],
          '/zh-cn/project/': [
            {
              text: 'Project 文档（旧版，已迁移到 Stage 2）',
              items: [
                {
                  text: '前端四：霍格沃茨画像',
                  link: '/zh-cn/project/chapter4/chapter4-lets-build-hogwarts-portraits'
                },
                {
                  text: '后端二：Supabase 数据库',
                  link: '/zh-cn/project/chapter5/chapter5-from-database-to-supabase'
                },
                {
                  text: 'AI 一：Dify & Knowledge Base',
                  link: '/zh-cn/project/chapter3/chapter3-getting-started-with-dify-and-its-knowledge-base-integration'
                }
              ]
            }
          ],
          '/zh-cn/appendix/': [
            {
              text: '附录',
              items: [
                { text: 'AI 能力词典', link: '/zh-cn/appendix/ai-capability-dictionary' }
              ]
            }
          ]
        }
      }
    },

    // 英文
    'en-us': {
      label: 'English (US)',
      lang: 'en-US',
      link: '/en-us/',
      title: 'Easy-Vibe Tutorial',
      description: 'Learn Vibe Coding from Zero to Advanced',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'On this page'
        },
        nav: [
          { text: 'Home', link: '/en-us/' },
          { text: 'Getting Started', link: '/en-us/stage-0/0.1-learning-map/' },
          { text: 'AI Product Manager', link: '/en-us/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'Full-Stack Development',
            link: '/en-us/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'Advanced Development',
            link: '/en-us/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'Appendix', link: '/en-us/appendix/ai-capability-dictionary' }
        ],
        // TODO: Add English sidebar when content is ready
        sidebar: {}
      }
    },

    // 日文
    'ja-jp': {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja-jp/',
      title: 'Easy-Vibe チュートリアル',
      description: 'ゼロから学ぶ Vibe Coding',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'このページの目次'
        },
        nav: [
          { text: 'ホーム', link: '/ja-jp/' },
          { text: '入門', link: '/ja-jp/stage-0/0.1-learning-map/' },
          { text: 'AI プロダクトマネージャー', link: '/ja-jp/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'フルスタック開発',
            link: '/ja-jp/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: '上級開発',
            link: '/ja-jp/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: '付録', link: '/ja-jp/appendix/ai-capability-dictionary' }
        ],
        // TODO: Add Japanese sidebar when content is ready
        sidebar: {}
      }
    },
    'zh-tw': {
      label: '繁體中文',
      lang: 'zh-TW',
      link: '/zh-tw/',
      title: 'Easy-Vibe 教程',
      description: '從零到一學習 Vibe Coding',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '頁面導航'
        },
        nav: [
          { text: '首頁', link: '/zh-tw/' },
          { text: '新手入門', link: '/zh-tw/stage-0/0.1-learning-map/' },
          { text: '產品經理', link: '/zh-tw/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: '初中級開發',
            link: '/zh-tw/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: '高級開發',
            link: '/zh-tw/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: '附錄', link: '/zh-tw/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'ko-kr': {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko-kr/',
      title: 'Easy-Vibe 튜토리얼',
      description: 'Vibe Coding을 처음부터 체계적으로 학습합니다',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '페이지 탐색'
        },
        nav: [
          { text: '홈', link: '/ko-kr/' },
          { text: '입문', link: '/ko-kr/stage-0/0.1-learning-map/' },
          { text: 'AI PM', link: '/ko-kr/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: '풀스택 개발',
            link: '/ko-kr/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: '고급 개발',
            link: '/ko-kr/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: '부록', link: '/ko-kr/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'es-es': {
      label: 'Español',
      lang: 'es-ES',
      link: '/es-es/',
      title: 'Tutorial de Easy-Vibe',
      description: 'Aprende Vibe Coding desde cero hasta avanzado',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Navegación de página'
        },
        nav: [
          { text: 'Inicio', link: '/es-es/' },
          { text: 'Principiante', link: '/es-es/stage-0/0.1-learning-map/' },
          { text: 'PM de IA', link: '/es-es/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'Desarrollo Full Stack',
            link: '/es-es/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'Desarrollo Avanzado',
            link: '/es-es/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'Apéndice', link: '/es-es/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'fr-fr': {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr-fr/',
      title: 'Tutoriel Easy-Vibe',
      description: 'Apprenez Vibe Coding de zéro à avancé',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Navigation de page'
        },
        nav: [
          { text: 'Accueil', link: '/fr-fr/' },
          { text: 'Débutant', link: '/fr-fr/stage-0/0.1-learning-map/' },
          { text: 'PM IA', link: '/fr-fr/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'Développement Full Stack',
            link: '/fr-fr/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'Développement Avancé',
            link: '/fr-fr/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'Annexe', link: '/fr-fr/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'de-de': {
      label: 'Deutsch',
      lang: 'de-DE',
      link: '/de-de/',
      title: 'Easy-Vibe Tutorial',
      description: 'Lernen Sie Vibe Coding von Null bis Fortgeschritten',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Seitennavigation'
        },
        nav: [
          { text: 'Start', link: '/de-de/' },
          { text: 'Einsteiger', link: '/de-de/stage-0/0.1-learning-map/' },
          { text: 'KI-PM', link: '/de-de/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'Full Stack Entwicklung',
            link: '/de-de/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'Fortgeschrittene Entwicklung',
            link: '/de-de/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'Anhang', link: '/de-de/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'ar-sa': {
      label: 'العربية',
      lang: 'ar-SA',
      link: '/ar-sa/',
      title: 'دروس Easy-Vibe',
      description: 'تعلم Vibe Coding من الصفر إلى المتقدم',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'تنقل الصفحة'
        },
        nav: [
          { text: 'الرئيسية', link: '/ar-sa/' },
          { text: 'المبتدئين', link: '/ar-sa/stage-0/0.1-learning-map/' },
          { text: 'مدير منتج AI', link: '/ar-sa/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'تطوير Full Stack',
            link: '/ar-sa/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'تطوير متقدم',
            link: '/ar-sa/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'ملحق', link: '/ar-sa/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    },
    'vi-vn': {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi-vn/',
      title: 'Hướng dẫn Easy-Vibe',
      description: 'Học Vibe Coding từ cơ bản đến nâng cao',
      head: commonHead,
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Điều hướng trang'
        },
        nav: [
          { text: 'Trang chủ', link: '/vi-vn/' },
          { text: 'Người mới', link: '/vi-vn/stage-0/0.1-learning-map/' },
          { text: 'PM AI', link: '/vi-vn/stage-1/1.1-introduction-to-ai-ide/' },
          {
            text: 'Phát triển Full Stack',
            link: '/vi-vn/stage-2/frontend/2.0-lovart-assets/'
          },
          {
            text: 'Phát triển Nâng cao',
            link: '/vi-vn/stage-3/core-skills/3.1-mcp-claudecode-skills/'
          },
          { text: 'Phụ lục', link: '/vi-vn/appendix/ai-capability-dictionary' }
        ],
        sidebar: {}
      }
    }
  }
})
