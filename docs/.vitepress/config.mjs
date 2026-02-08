import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

// 判断是否是 Vercel 环境， github page 和 vercel 的部署地址相关不一样
const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL_URL
// 检查是否为 EdgeOne 部署 (通过环境变量 EDGEONE 判断)
const isEdgeOne = !!process.env.EDGEONE || process.env.EDGEONE === '1'

// 确定 Base 路径：
// 1. 如果设置了 BASE 环境变量，优先使用
// 2. 如果是 Vercel 或 EdgeOne，默认使用根路径 '/'
// 3. 否则（如 GitHub Pages），使用 '/easy-vibe/'
const base = process.env.BASE || (isVercel || isEdgeOne ? '/' : '/easy-vibe/')

// 语言映射配置
const localeMap = {
  'zh-cn': {
    ogLocale: 'zh_CN',
    twitterSite: '@datawhale',
    lang: 'zh-CN',
    hreflang: 'zh-CN'
  },
  'en-us': {
    ogLocale: 'en_US',
    twitterSite: '@datawhale',
    lang: 'en-US',
    hreflang: 'en'
  },
  'ja-jp': {
    ogLocale: 'ja_JP',
    twitterSite: '@datawhale',
    lang: 'ja-JP',
    hreflang: 'ja'
  },
  'zh-tw': {
    ogLocale: 'zh_TW',
    twitterSite: '@datawhale',
    lang: 'zh-TW',
    hreflang: 'zh-TW'
  },
  'ko-kr': {
    ogLocale: 'ko_KR',
    twitterSite: '@datawhale',
    lang: 'ko-KR',
    hreflang: 'ko'
  },
  'es-es': {
    ogLocale: 'es_ES',
    twitterSite: '@datawhale',
    lang: 'es-ES',
    hreflang: 'es'
  },
  'fr-fr': {
    ogLocale: 'fr_FR',
    twitterSite: '@datawhale',
    lang: 'fr-FR',
    hreflang: 'fr'
  },
  'de-de': {
    ogLocale: 'de_DE',
    twitterSite: '@datawhale',
    lang: 'de-DE',
    hreflang: 'de'
  },
  'ar-sa': {
    ogLocale: 'ar_SA',
    twitterSite: '@datawhale',
    lang: 'ar-SA',
    hreflang: 'ar'
  },
  'vi-vn': {
    ogLocale: 'vi_VN',
    twitterSite: '@datawhale',
    lang: 'vi-VN',
    hreflang: 'vi'
  }
}

// SEO 相关配置
const getSeoHead = (locale, title, description, path = '') => {
  const seoConfig = localeMap[locale] || localeMap['zh-cn']
  const siteUrl = isVercel
    ? 'https://your-project.vercel.app'
    : 'https://datawhalechina.github.io/easy-vibe'
  const canonicalUrl = path ? `${siteUrl}${path}` : `${siteUrl}/${locale}/`
  const ogImageUrl = `${siteUrl}${base}logo.png`

  const head = [
    ['link', { rel: 'icon', href: `${base}logo.png`.replace('//', '/') }],
    [
      'link',
      { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }
    ],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['link', { rel: 'canonical', href: canonicalUrl }],
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: seoConfig.ogLocale }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImageUrl }],
    ['meta', { property: 'og:image:alt', content: title }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: seoConfig.twitterSite }],
    ['meta', { name: 'twitter:creator', content: seoConfig.twitterSite }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImageUrl }],
    ['meta', { name: 'twitter:image:alt', content: title }],
    // Additional SEO
    [
      'meta',
      {
        name: 'keywords',
        content:
          'AI编程,Vibe Coding,Claude Code,Cursor,Trae,AI IDE,零基础学编程,AI辅助开发,产品经理,全栈开发,编程教程,编程工具,Datawhale,Supabase,React,大模型,LLM,人工智能,微信小程序,Android开发,iOS开发,MCP,RAG,LangGraph,Dify,跨平台开发,AI应用开发'
      }
    ],
    ['meta', { name: 'author', content: 'Datawhale' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'baiduspider', content: 'index,follow' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'revisit-after', content: '7 days' }]
  ]

  // 添加 hreflang 标签
  Object.keys(localeMap).forEach((lang) => {
    head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: localeMap[lang].hreflang,
        href: `${siteUrl}/${lang}/`
      }
    ])
  })
  head.push([
    'link',
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/zh-cn/` }
  ])

  // 添加 JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description: description,
    url: siteUrl,
    inLanguage: seoConfig.ogLocale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Datawhale',
      url: 'https://datawhalechina.github.io',
      logo: {
        '@type': 'ImageObject',
        url: ogImageUrl
      }
    }
  }
  head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

  return head
}

const commonHead = [
  ['link', { rel: 'icon', href: `${base}logo.png`.replace('//', '/') }],
  ['link', { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }]
]

const commonThemeConfig = {
  logo: `${base}logo.png`.replace('//', '/'),
  search: {
    provider: 'local'
  },
  // socialLinks: [
  //   { icon: 'github', link: 'https://github.com/datawhalechina/easy-vibe' }
  // ],
  outline: {
    level: [1, 6]
  },
  footer: {
    message:
      '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2026002630号-1</a> | <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010602202215" rel="noreferrer" target="_blank">京公网安备11010602202215号</a>',
    copyright:
      '本作品采用 <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）</a> 进行许可'
  }
}

const productManagerSidebar = [
  {
    text: '新手入门',
    collapsed: false,
    items: [
      { text: '1. 学习地图', link: '/zh-cn/stage-0/0.1-learning-map/' },
      {
        text: '2. 对话式编程入门',
        link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: '产品原型实战',
    collapsed: false,
    items: [
      {
        text: '1. 学会 AI 编程工具',
        link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/'
      },
      {
        text: '2. 找到好点子',
        link: '/zh-cn/stage-1/1.0-finding-great-idea/'
      },
      {
        text: '3. 搭建产品原型',
        link: '/zh-cn/stage-1/1.2-building-prototype/'
      },
      {
        text: '4. 接入 AI 能力',
        link: '/zh-cn/stage-1/1.3-integrating-ai-capabilities/'
      },
      {
        text: '5. 完整项目实战',
        link: '/zh-cn/stage-1/1.4-complete-project-practice/'
      }
    ]
  },
  {
    text: '附录：业务思维',
    collapsed: false,
    items: [
      {
        text: '产品思维与方案设计',
        link: '/zh-cn/stage-1/appendix-a-product-thinking/'
      },
      {
        text: 'AI 行业应用场景参考',
        link: '/zh-cn/stage-1/appendix-industry-scenarios/'
      }
    ]
  },
  {
    text: '附录：技术方案',
    collapsed: false,
    items: [
      {
        text: '写代码时遇到错误怎么办',
        link: '/zh-cn/stage-1/appendix-b-common-errors/'
      },
      {
        text: '七款 AI 编程工具对比',
        link: '/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
      },
      {
        text: '用设计和编程 Agent 设计网站',
        link: '/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
      }
    ]
  }
]

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  base: base,
  ignoreDeadLinks: true,

  // Sitemap 配置
  sitemap: {
    hostname: 'https://datawhalechina.github.io/easy-vibe',
    transformItems(items) {
      // 过滤掉旧版内容和未完成的语言版本
      return items.filter((item) => {
        const url = item.url
        // 排除旧版内容目录
        if (
          url.includes('/extra/') ||
          url.includes('/examples/') ||
          url.includes('/project/')
        ) {
          return false
        }
        // 包含所有语言版本
        return true
      })
    }
  },

  // 多语言配置 - 使用 cn/en-us/ja 结构
  locales: {
    // 中文
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-cn/',
      title: 'Easy-Vibe 教程',
      description:
        '从零到一学习 Vibe Coding - 零基础学会用 AI 编程，掌握 Claude Code、Cursor 等 AI IDE 工具',
      head: getSeoHead(
        'zh-cn',
        'Easy-Vibe 教程',
        '从零到一学习 Vibe Coding - 零基础学会用 AI 编程，掌握 Claude Code、Cursor 等 AI IDE 工具'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '页面导航'
        },
        nav: [
          { text: '首页', link: '/zh-cn/' },
          {
            text: '零基础入门',
            link: '/zh-cn/stage-0/'
          },
          {
            text: '初中级开发',
            link: '/zh-cn/stage-2/intro'
          },
          {
            text: '高级开发',
            link: '/zh-cn/stage-3/intro'
          },
          { text: '附录', link: '/zh-cn/appendix/intro' }
        ],
        sidebar: {
          '/zh-cn/stage-0/': productManagerSidebar,
          '/zh-cn/stage-1/': productManagerSidebar,
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
                  text: '后端五：如何部署 Web 应用',
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
                  text: '高级五：如何构建安卓程序-compose 原生开发',
                  link: '/zh-cn/stage-3/cross-platform/3.5-android-app/'
                },
                {
                  text: '高级六：如何构建 iOS 程序-swiftUI原生开发',
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
              text: '人工智能基础',
              collapsed: false,
              items: [
                {
                  text: '提示词工程',
                  link: '/zh-cn/appendix/prompt-engineering'
                },
                {
                  text: '人工智能进化史',
                  link: '/zh-cn/appendix/ai-evolution'
                },
                { text: '大语言模型', link: '/zh-cn/appendix/llm-intro' },
                { text: '多模态大模型', link: '/zh-cn/appendix/vlm-intro' },
                {
                  text: 'AI 绘画原理',
                  link: '/zh-cn/appendix/image-gen-intro'
                },
                { text: 'AI 音频模型', link: '/zh-cn/appendix/audio-intro' },
                {
                  text: '上下文工程',
                  link: '/zh-cn/appendix/context-engineering'
                },
                { text: 'Agent 智能体', link: '/zh-cn/appendix/agent-intro' },
                {
                  text: 'AI 能力词典',
                  link: '/zh-cn/appendix/ai-capability-dictionary'
                }
              ]
            },
            {
              text: '前端开发',
              collapsed: false,
              items: [
                {
                  text: 'HTML/CSS/JS 基础',
                  link: '/zh-cn/appendix/web-basics'
                },
                {
                  text: '前端进化史',
                  link: '/zh-cn/appendix/frontend-evolution'
                },
                {
                  text: '前端性能优化',
                  link: '/zh-cn/appendix/frontend-performance'
                },
                {
                  text: 'Canvas 2D 入门',
                  link: '/zh-cn/appendix/canvas-intro'
                },
                {
                  text: 'URL 到浏览器显示',
                  link: '/zh-cn/appendix/url-to-browser'
                },
                {
                  text: '浏览器调试器',
                  link: '/zh-cn/appendix/browser-devtools'
                },
                {
                  text: '浏览器渲染原理',
                  link: '/zh-cn/appendix/browser-rendering-pipeline'
                },
                {
                  text: '前端路由原理',
                  link: '/zh-cn/appendix/frontend-routing'
                },
                {
                  text: '组件状态管理',
                  link: '/zh-cn/appendix/component-state-management'
                },
                {
                  text: '前端工程化',
                  link: '/zh-cn/appendix/frontend-engineering'
                }
              ]
            },
            {
              text: '后端开发',
              collapsed: false,
              items: [
                {
                  text: '后端进化史',
                  link: '/zh-cn/appendix/backend-evolution'
                },
                {
                  text: '后端分层架构',
                  link: '/zh-cn/appendix/backend-layered-architecture'
                },
                {
                  text: '后端编程语言',
                  link: '/zh-cn/appendix/backend-languages'
                },
                {
                  text: '并发编程模型',
                  link: '/zh-cn/appendix/concurrency-models'
                },
                {
                  text: '接口设计规范',
                  link: '/zh-cn/appendix/api-design'
                },
                { text: '数据库原理', link: '/zh-cn/appendix/database-intro' },
                { text: '系统缓存设计', link: '/zh-cn/appendix/cache-design' },
                { text: '消息队列设计', link: '/zh-cn/appendix/queue-design' },
                { text: '鉴权原理与实战', link: '/zh-cn/appendix/auth-design' },
                { text: '网关与反向代理', link: '/zh-cn/appendix/gateway-proxy' },
                { text: '负载均衡策略', link: '/zh-cn/appendix/load-balancing' },
                { text: '埋点设计', link: '/zh-cn/appendix/tracking-design' },
                { text: '线上运维', link: '/zh-cn/appendix/operations' }
              ]
            },
            {
              text: '云计算与服务',
              collapsed: false,
              items: [
                {
                  text: '云服务基础',
                  link: '/zh-cn/appendix/cloud-services'
                },
                {
                  text: 'IAM 权限管理',
                  link: '/zh-cn/appendix/cloud-iam'
                },
                {
                  text: '对象存储与 CDN',
                  link: '/zh-cn/appendix/cloud-storage-cdn'
                }
              ]
            },
            {
              text: '通用技能',
              collapsed: false,
              items: [
                { text: 'API 入门', link: '/zh-cn/appendix/api-intro' },
                { text: 'IDE 原理', link: '/zh-cn/appendix/ide-intro' },
                { text: '终端入门', link: '/zh-cn/appendix/terminal-intro' },
                { text: 'Git 详细介绍', link: '/zh-cn/appendix/git-intro' },
                {
                  text: '计算机网络',
                  link: '/zh-cn/appendix/computer-networks'
                },
                { text: '部署与上线', link: '/zh-cn/appendix/deployment' }
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
      description:
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools',
      head: getSeoHead(
        'en-us',
        'Easy-Vibe Tutorial',
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'On this page'
        },
        nav: [
          { text: 'Home', link: '/en-us/' },
          {
            text: 'Novice & PM',
            link: '/en-us/stage-0/'
          },
          {
            text: 'Full-Stack Development',
            link: '/en-us/stage-2/intro'
          },
          {
            text: 'Advanced Development',
            link: '/en-us/stage-3/intro'
          },
          { text: 'Appendix', link: '/en-us/appendix/intro' }
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
      description:
        'ゼロから学ぶ Vibe Coding - AIプログラミングを初めから体系的に学習',
      head: getSeoHead(
        'ja-jp',
        'Easy-Vibe チュートリアル',
        'ゼロから学ぶ Vibe Coding - AIプログラミングを初めから体系的に学習'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'このページの目次'
        },
        nav: [
          { text: 'ホーム', link: '/ja-jp/' },
          {
            text: '初心者とPM',
            link: '/ja-jp/stage-0/'
          },
          {
            text: 'フルスタック開発',
            link: '/ja-jp/stage-2/intro'
          },
          {
            text: '上級開発',
            link: '/ja-jp/stage-3/intro'
          },
          { text: '付録', link: '/ja-jp/appendix/intro' }
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
      description:
        '從零到一學習 Vibe Coding - 零基礎學會用 AI 編程，掌握 Claude Code、Cursor 等 AI IDE 工具',
      head: getSeoHead(
        'zh-tw',
        'Easy-Vibe 教程',
        '從零到一學習 Vibe Coding - 零基礎學會用 AI 編程，掌握 Claude Code、Cursor 等 AI IDE 工具'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '頁面導航'
        },
        nav: [
          { text: '首頁', link: '/zh-tw/' },
          {
            text: '新手與產品原型',
            link: '/zh-tw/stage-0/'
          },
          {
            text: '初中級開發',
            link: '/zh-tw/stage-2/intro'
          },
          {
            text: '高級開發',
            link: '/zh-tw/stage-3/intro'
          },
          { text: '附錄', link: '/zh-tw/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'ko-kr': {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko-kr/',
      title: 'Easy-Vibe 튜토리얼',
      description:
        'Vibe Coding을 처음부터 체계적으로 학습합니다 - AI 프로그래밍을 처음부터 고급까지',
      head: getSeoHead(
        'ko-kr',
        'Easy-Vibe 튜토리얼',
        'Vibe Coding을 처음부터 체계적으로 학습합니다 - AI 프로그래밍을 처음부터 고급까지'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: '페이지 탐색'
        },
        nav: [
          { text: '홈', link: '/ko-kr/' },
          { text: '초보자 & PM', link: '/ko-kr/stage-0/' },
          {
            text: '풀스택 개발',
            link: '/ko-kr/stage-2/intro'
          },
          {
            text: '고급 개발',
            link: '/ko-kr/stage-3/intro'
          },
          { text: '부록', link: '/ko-kr/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'es-es': {
      label: 'Español',
      lang: 'es-ES',
      link: '/es-es/',
      title: 'Tutorial de Easy-Vibe',
      description:
        'Aprende Vibe Coding desde cero hasta avanzado - Domina la programación con IA desde el principio',
      head: getSeoHead(
        'es-es',
        'Tutorial de Easy-Vibe',
        'Aprende Vibe Coding desde cero hasta avanzado - Domina la programación con IA desde el principio'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Navegación de página'
        },
        nav: [
          { text: 'Inicio', link: '/es-es/' },
          {
            text: 'Principiante y PM',
            link: '/es-es/stage-0/'
          },
          {
            text: 'Desarrollo Full Stack',
            link: '/es-es/stage-2/intro'
          },
          {
            text: 'Desarrollo Avanzado',
            link: '/es-es/stage-3/intro'
          },
          { text: 'Apéndice', link: '/es-es/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'fr-fr': {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr-fr/',
      title: 'Tutoriel Easy-Vibe',
      description:
        'Apprenez Vibe Coding de zéro à avancé - Maîtrisez la programmation IA du début au niveau avancé',
      head: getSeoHead(
        'fr-fr',
        'Tutoriel Easy-Vibe',
        'Apprenez Vibe Coding de zéro à avancé - Maîtrisez la programmation IA du début au niveau avancé'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Navigation de page'
        },
        nav: [
          { text: 'Accueil', link: '/fr-fr/' },
          { text: 'Débutant & PM', link: '/fr-fr/stage-0/' },
          {
            text: 'Développement Full Stack',
            link: '/fr-fr/stage-2/intro'
          },
          {
            text: 'Développement Avancé',
            link: '/fr-fr/stage-3/intro'
          },
          { text: 'Annexe', link: '/fr-fr/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'de-de': {
      label: 'Deutsch',
      lang: 'de-DE',
      link: '/de-de/',
      title: 'Easy-Vibe Tutorial',
      description:
        'Lernen Sie Vibe Coding von Null bis Fortgeschritten - Meistern Sie die KI-Programmierung von Grund auf',
      head: getSeoHead(
        'de-de',
        'Easy-Vibe Tutorial',
        'Lernen Sie Vibe Coding von Null bis Fortgeschritten - Meistern Sie die KI-Programmierung von Grund auf'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Seitennavigation'
        },
        nav: [
          { text: 'Start', link: '/de-de/' },
          { text: 'Anfänger & PM', link: '/de-de/stage-0/' },
          {
            text: 'Full Stack Entwicklung',
            link: '/de-de/stage-2/intro'
          },
          {
            text: 'Fortgeschrittene Entwicklung',
            link: '/de-de/stage-3/intro'
          },
          { text: 'Anhang', link: '/de-de/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'ar-sa': {
      label: 'العربية',
      lang: 'ar-SA',
      link: '/ar-sa/',
      title: 'دروس Easy-Vibe',
      description:
        'تعلم Vibe Coding من الصفر إلى المتقدم - إتقان البرمجة بالذكاء الاصطناعي من البداية',
      head: getSeoHead(
        'ar-sa',
        'دروس Easy-Vibe',
        'تعلم Vibe Coding من الصفر إلى المتقدم - إتقان البرمجة بالذكاء الاصطناعي من البداية'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'تنقل الصفحة'
        },
        nav: [
          { text: 'الرئيسية', link: '/ar-sa/' },
          {
            text: 'مبتدأ & PM',
            link: '/ar-sa/stage-0/'
          },
          {
            text: 'تطوير Full Stack',
            link: '/ar-sa/stage-2/intro'
          },
          {
            text: 'تطوير متقدم',
            link: '/ar-sa/stage-3/intro'
          },
          { text: 'ملحق', link: '/ar-sa/appendix/intro' }
        ],
        sidebar: {}
      }
    },
    'vi-vn': {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi-vn/',
      title: 'Hướng dẫn Easy-Vibe',
      description:
        'Học Vibe Coding từ cơ bản đến nâng cao - Làm chủ lập trình AI từ cơ bản đến chuyên sâu',
      head: getSeoHead(
        'vi-vn',
        'Hướng dẫn Easy-Vibe',
        'Học Vibe Coding từ cơ bản đến nâng cao - Làm chủ lập trình AI từ cơ bản đến chuyên sâu'
      ),
      themeConfig: {
        ...commonThemeConfig,
        outline: {
          level: [1, 6],
          label: 'Điều hướng trang'
        },
        nav: [
          { text: 'Trang chủ', link: '/vi-vn/' },
          {
            text: 'Người mới & PM',
            link: '/vi-vn/stage-0/'
          },
          {
            text: 'Phát triển Full Stack',
            link: '/vi-vn/stage-2/intro'
          },
          {
            text: 'Phát triển Nâng cao',
            link: '/vi-vn/stage-3/intro'
          },
          { text: 'Phụ lục', link: '/vi-vn/appendix/intro' }
        ],
        sidebar: {}
      }
    }
  }
})
