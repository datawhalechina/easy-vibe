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

// 站点 URL 配置 - 根据部署环境动态确定
const getSiteUrl = () => {
  if (isVercel && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (isEdgeOne && process.env.EDGEONE_URL) {
    return `https://${process.env.EDGEONE_URL}`
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL
  }
  return 'https://datawhalechina.github.io/easy-vibe'
}

const siteUrl = getSiteUrl()

// 语言映射配置
const localeMap = {
  'zh-cn': {
    ogLocale: 'zh_CN',
    twitterSite: '@datawhale',
    lang: 'zh-CN',
    hreflang: 'zh-CN'
  },
  en: {
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
    },
    mainEntity: {
      '@type': 'Course',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'Datawhale',
        sameAs: 'https://github.com/datawhalechina/easy-vibe'
      }
    }
  }
  head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

  // 添加 BreadcrumbList 结构化数据
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh-cn' ? '教程' : 'Tutorial',
        item: `${siteUrl}/${locale}/`
      }
    ]
  }
  head.push(['script', { type: 'application/ld+json', class: 'breadcrumb-jsonld' }, JSON.stringify(breadcrumbJsonLd)])

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

const productManagerSidebarEn = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Learning Map', link: '/en/stage-0/0.1-learning-map/' },
      {
        text: 'AI Era: If You Can Speak, You Can Code',
        link: '/en/stage-0/0.2-ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: 'Product Prototype Skills',
    collapsed: false,
    items: [
      {
        text: 'Master AI Programming Tools',
        link: '/en/stage-1/1.1-introduction-to-ai-ide/'
      },
      {
        text: 'Find Great Ideas',
        link: '/en/stage-1/1.0-finding-great-idea/'
      },
      {
        text: 'Build Product Prototypes',
        link: '/en/stage-1/1.2-building-prototype/'
      },
      {
        text: 'Integrate AI Capabilities',
        link: '/en/stage-1/1.3-integrating-ai-capabilities/'
      },
      {
        text: 'Complete Project Practice',
        link: '/en/stage-1/1.4-complete-project-practice/'
      }
    ]
  },
  {
    text: 'Appendix: Business Thinking',
    collapsed: false,
    items: [
      {
        text: 'Product Thinking and Solution Design',
        link: '/en/stage-1/appendix-a-product-thinking/'
      },
      {
        text: 'AI Industry Application Scenarios (B-end)',
        link: '/en/stage-1/appendix-industry-scenarios/'
      },
      {
        text: 'AI Consumer Scenarios Inspiration (C-end)',
        link: '/en/stage-1/appendix-c-consumer-scenarios/'
      }
    ]
  },
  {
    text: 'Appendix: Technical Solutions',
    collapsed: false,
    items: [
      {
        text: 'What to do if you encounter errors',
        link: '/en/stage-1/appendix-b-common-errors/'
      },
      {
        text: 'Comparison of Seven AI Programming Tools',
        link: '/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
      },
      {
        text: 'Design Websites with Agents',
        link: '/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
      }
    ]
  }
]

const stage2SidebarEn = [
  {
    text: 'Frontend Development',
    collapsed: false,
    items: [
      {
        text: 'Using Lovart for Assets',
        link: '/zh-cn/stage-2/frontend/2.0-lovart-assets/'
      },
      {
        text: 'Figma & MasterGo Basics',
        link: '/zh-cn/stage-2/frontend/2.1-figma-mastergo/'
      },
      {
        text: 'UI Design for Modern Apps',
        link: '/zh-cn/stage-2/frontend/2.2-ui-design/'
      },
      {
        text: 'UI Design Specs & Multi-Product',
        link: '/zh-cn/stage-2/frontend/2.3-multi-product-ui/'
      }
    ]
  },
  {
    text: 'Backend & Full-Stack',
    collapsed: false,
    items: [
      {
        text: 'Backend 1: What is API',
        link: '/zh-cn/stage-2/backend/2.1-what-is-api/'
      },
      {
        text: 'Backend 2: Database & Supabase',
        link: '/zh-cn/stage-2/backend/2.2-database-supabase/'
      },
      {
        text: 'Backend 3: AI-Assisted API Code',
        link: '/zh-cn/stage-2/backend/2.3-ai-interface-code/'
      },
      {
        text: 'Backend 4: Git Workflow',
        link: '/zh-cn/stage-2/backend/2.4-git-workflow/'
      },
      {
        text: 'Backend 5: Deployment',
        link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/'
      },
      {
        text: 'Backend 6: Modern CLI Tools',
        link: '/zh-cn/stage-2/backend/2.6-modern-cli/'
      },
      {
        text: 'Backend 7: Stripe Payment',
        link: '/zh-cn/stage-2/backend/2.7-stripe-payment/'
      }
    ]
  },
  {
    text: 'AI Capabilities Appendix',
    collapsed: false,
    items: [
      {
        text: 'AI 1: Dify & Knowledge Base',
        link: '/zh-cn/stage-2/ai-capabilities/2.1-dify-knowledge-base/'
      }
    ]
  },
  {
    text: 'Comprehensive Projects',
    collapsed: false,
    items: [
      {
        text: 'Hogwarts Portraits Project',
        link: '/zh-cn/stage-2/frontend/2.4-hogwarts-portraits/'
      },
      {
        text: 'Assignment 1: Full-Stack App',
        link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/'
      },
      {
        text: 'Assignment 2: UI Library & Trae',
        link: '/zh-cn/stage-2/assignments/2.2-modern-frontend-trae/'
      }
    ]
  }
]

const stage3SidebarEn = [
  {
    text: 'Claude Code In-Depth',
    collapsed: false,
    items: [
      {
        text: 'Claude Code 快速上手核心指南',
        link: '/zh-cn/stage-3/core-skills/basics/'
      },
      {
        text: 'Claude Code MCP 完全指南',
        link: '/zh-cn/stage-3/core-skills/mcp/'
      },
      {
        text: 'Claude Code Skills 完全指南',
        link: '/zh-cn/stage-3/core-skills/skills/'
      },
      {
        text: 'Long Running Tasks',
        link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
      },
      {
        text: 'Claude Agent Teams 完全指南',
        link: '/zh-cn/stage-3/core-skills/agent-teams/'
      },
      {
        text: 'Claude Code Superpowers 工程级开发',
        link: '/zh-cn/stage-3/core-skills/superpowers/'
      },
      {
        text: 'Claude Code 工作流最佳实践',
        link: '/zh-cn/stage-3/core-skills/workflow/'
      },
      {
        text: 'Claude Code 手机远程开发',
        link: '/zh-cn/stage-3/core-skills/mobile-development/'
      },
      {
        text: 'Claude Agent SDK 完全指南',
        link: '/zh-cn/stage-3/core-skills/claude-agent-sdk/',
        items: [
          {
            text: 'Spec Coding：规范驱动开发',
            link: '/zh-cn/stage-3/core-skills/claude-agent-sdk/spec-coding'
          }
        ]
      }
    ]
  },
  {
    text: 'Multi-Platform',
    collapsed: false,
    items: [
      {
        text: 'Advanced 3: WeChat Mini Program',
        link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/'
      },
      {
        text: 'Advanced 4: WeChat Mini Program (Backend)',
        link: '/zh-cn/stage-3/cross-platform/3.4-wechat-miniprogram-backend/'
      },
      {
        text: 'Advanced 5: Android App - Compose',
        link: '/zh-cn/stage-3/cross-platform/3.5-android-app/'
      },
      {
        text: 'Advanced 6: iOS App - SwiftUI',
        link: '/zh-cn/stage-3/cross-platform/3.6-ios-app/'
      },
      {
        text: 'Advanced 7: Personal Website & Blog',
        link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/'
      }
    ]
  },
  {
    text: 'AI Advanced',
    collapsed: false,
    items: [
      {
        text: 'AI Advanced 1: RAG Introduction',
        link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/'
      },
      {
        text: 'AI Advanced 2: LangGraph & Advanced RAG',
        link: '/zh-cn/stage-3/ai-advanced/3.a2-langgraph-advanced-rag/'
      }
    ]
  }
]

const appendixSidebarEn = [
  {
    text: 'I. Computer Fundamentals',
    collapsed: false,
    items: [
      {
        text: 'Full-Stack in Vibe Coding Era',
        link: '/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack'
      },
      {
        text: 'Power On to Web Visit',
        link: '/zh-cn/appendix/1-computer-fundamentals/power-on-to-web'
      },
      {
        text: 'Transistor to CPU',
        link: '/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu'
      },
      {
        text: 'Computer Organization',
        link: '/zh-cn/appendix/1-computer-fundamentals/computer-organization'
      },
      {
        text: 'Operating Systems',
        link: '/zh-cn/appendix/1-computer-fundamentals/operating-systems'
      },
      {
        text: 'Data Encoding & Storage',
        link: '/zh-cn/appendix/1-computer-fundamentals/data-encoding-storage'
      },
      {
        text: 'Computer Networks',
        link: '/zh-cn/appendix/1-computer-fundamentals/computer-networks'
      },
      {
        text: 'Data Structures',
        link: '/zh-cn/appendix/1-computer-fundamentals/data-structures'
      },
      {
        text: 'Algorithm Thinking',
        link: '/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking'
      },
      {
        text: 'Programming Languages',
        link: '/zh-cn/appendix/1-computer-fundamentals/programming-languages'
      },
      {
        text: 'Compilers Intro',
        link: '/zh-cn/appendix/1-computer-fundamentals/compilers'
      },
      {
        text: 'Type Systems Intro',
        link: '/zh-cn/appendix/1-computer-fundamentals/type-systems'
      },
      {
        text: 'Linking & Loading',
        link: '/zh-cn/appendix/1-computer-fundamentals/linking-loading'
      },
      {
        text: 'Assembly Basics',
        link: '/zh-cn/appendix/1-computer-fundamentals/assembly-basics'
      },
      {
        text: 'Memory Hierarchy',
        link: '/zh-cn/appendix/1-computer-fundamentals/memory-hierarchy'
      },
      {
        text: 'Processor Architecture',
        link: '/zh-cn/appendix/1-computer-fundamentals/processor-architecture'
      },
      {
        text: 'System I/O',
        link: '/zh-cn/appendix/1-computer-fundamentals/system-io'
      },
      {
        text: 'Socket Programming',
        link: '/zh-cn/appendix/1-computer-fundamentals/socket-programming'
      }
    ]
  },
  {
    text: 'II. Tools & Environment',
    collapsed: false,
    items: [
      {
        text: 'IDE Basics',
        link: '/zh-cn/appendix/2-development-tools/ide-basics'
      },
      {
        text: 'Command Line & Shell',
        link: '/zh-cn/appendix/2-development-tools/command-line-shell'
      },
      {
        text: 'Git: Code Time Machine',
        link: '/zh-cn/appendix/2-development-tools/git-version-control'
      },
      {
        text: 'Env Vars & PATH',
        link: '/zh-cn/appendix/2-development-tools/environment-path'
      },
      {
        text: 'Ports & Localhost',
        link: '/zh-cn/appendix/2-development-tools/ports-localhost'
      },
      {
        text: 'SSH & Key Auth',
        link: '/zh-cn/appendix/2-development-tools/ssh-authentication'
      },
      {
        text: 'Package Managers',
        link: '/zh-cn/appendix/2-development-tools/package-managers'
      },
      {
        text: 'Art of Debugging',
        link: '/zh-cn/appendix/2-development-tools/debugging-art/'
      },
      {
        text: 'Regex',
        link: '/zh-cn/appendix/2-development-tools/regex'
      }
    ]
  },
  {
    text: 'III. Browser & Frontend',
    collapsed: false,
    items: [
      {
        text: 'JavaScript Deep Dive',
        link: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive'
      },
      {
        text: 'TypeScript Intro',
        link: '/zh-cn/appendix/3-browser-and-frontend/typescript'
      },
      {
        text: 'Frontend Frameworks',
        link: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks'
      },
      {
        text: 'Browser as OS',
        link: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os'
      },
      {
        text: 'Rendering Pipeline',
        link: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os-rendering'
      },
      {
        text: 'HTML / CSS Layout',
        link: '/zh-cn/appendix/3-browser-and-frontend/html-css-layout'
      },
      {
        text: 'JS Runtime',
        link: '/zh-cn/appendix/3-browser-and-frontend/javascript-runtime'
      },
      {
        text: 'Nature of Frameworks',
        link: '/zh-cn/appendix/3-browser-and-frontend/frontend-framework-nature'
      },
      {
        text: 'State Management',
        link: '/zh-cn/appendix/3-browser-and-frontend/state-management'
      },
      {
        text: 'Routing & Navigation',
        link: '/zh-cn/appendix/3-browser-and-frontend/routing-navigation'
      },
      {
        text: 'Graphics & Animation',
        link: '/zh-cn/appendix/3-browser-and-frontend/graphics-animation'
      },
      {
        text: 'Real-time Comm',
        link: '/zh-cn/appendix/3-browser-and-frontend/realtime-communication'
      },
      {
        text: 'Web Performance',
        link: '/zh-cn/appendix/3-browser-and-frontend/web-performance'
      },
      {
        text: 'Frontend Engineering',
        link: '/zh-cn/appendix/3-browser-and-frontend/frontend-engineering'
      },
      {
        text: 'Project Architecture',
        link: '/zh-cn/appendix/3-browser-and-frontend/frontend-project-architecture'
      },
      {
        text: 'A11y & i18n',
        link: '/zh-cn/appendix/3-browser-and-frontend/a11n-i18n'
      }
    ]
  },
  {
    text: 'IV. Server & Backend',
    collapsed: false,
    items: [
      {
        text: 'Backend Languages',
        link: '/zh-cn/appendix/4-server-and-backend/backend-languages'
      },
      {
        text: 'Client Languages',
        link: '/zh-cn/appendix/4-server-and-backend/client-languages'
      },
      {
        text: 'Cross-platform Solutions',
        link: '/zh-cn/appendix/4-server-and-backend/cross-platform'
      },
      {
        text: 'HTTP Protocol',
        link: '/zh-cn/appendix/4-server-and-backend/http-protocol'
      },
      {
        text: 'Request Journey',
        link: '/zh-cn/appendix/4-server-and-backend/request-journey'
      },
      {
        text: 'Web Frameworks',
        link: '/zh-cn/appendix/4-server-and-backend/web-frameworks'
      },
      {
        text: 'API Intro',
        link: '/zh-cn/appendix/4-server-and-backend/api-intro'
      },
      {
        text: 'API Design Philosophy',
        link: '/zh-cn/appendix/4-server-and-backend/api-design'
      },
      {
        text: 'Serialization',
        link: '/zh-cn/appendix/4-server-and-backend/serialization'
      },
      {
        text: 'Auth & Authorization',
        link: '/zh-cn/appendix/4-server-and-backend/auth-authorization'
      },
      {
        text: 'Concurrency & Async',
        link: '/zh-cn/appendix/4-server-and-backend/concurrency-async'
      },
      {
        text: 'Caching Strategies',
        link: '/zh-cn/appendix/4-server-and-backend/caching'
      },
      {
        text: 'Message Queues',
        link: '/zh-cn/appendix/4-server-and-backend/message-queues'
      },
      {
        text: 'Async Task Queues',
        link: '/zh-cn/appendix/4-server-and-backend/async-task-queues'
      },
      {
        text: 'Rate Limiting',
        link: '/zh-cn/appendix/4-server-and-backend/rate-limiting-backpressure'
      },
      {
        text: 'Search Engine Principles',
        link: '/zh-cn/appendix/4-server-and-backend/search-engines'
      },
      {
        text: 'File Storage',
        link: '/zh-cn/appendix/4-server-and-backend/file-storage'
      },
      {
        text: 'Backend Architecture',
        link: '/zh-cn/appendix/4-server-and-backend/backend-layered-architecture'
      },
      {
        text: 'Project Architecture',
        link: '/zh-cn/appendix/4-server-and-backend/backend-project-architecture'
      },
      {
        text: 'DSL Intro',
        link: '/zh-cn/appendix/4-server-and-backend/domain-specific-languages'
      }
    ]
  },
  {
    text: 'V. Data',
    collapsed: false,
    items: [
      {
        text: 'Database Fundamentals',
        link: '/zh-cn/appendix/5-data/database-fundamentals'
      },
      {
        text: 'Data Models Panorama',
        link: '/zh-cn/appendix/5-data/data-models'
      },
      {
        text: 'Data Tracking',
        link: '/zh-cn/appendix/5-data/data-tracking'
      },
      {
        text: 'Data Analysis',
        link: '/zh-cn/appendix/5-data/data-analysis'
      },
      {
        text: 'A/B Testing',
        link: '/zh-cn/appendix/5-data/ab-testing'
      },
      {
        text: 'Data Visualization',
        link: '/zh-cn/appendix/5-data/data-visualization'
      },
      {
        text: 'Data Governance',
        link: '/zh-cn/appendix/5-data/data-governance'
      }
    ]
  },
  {
    text: 'VI. Architecture',
    collapsed: false,
    items: [
      {
        text: 'Monolith to Microservices',
        link: '/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices'
      },
      {
        text: 'Distributed Systems',
        link: '/zh-cn/appendix/6-architecture-and-system-design/distributed-systems'
      },
      {
        text: 'HA & Disaster Recovery',
        link: '/zh-cn/appendix/6-architecture-and-system-design/high-availability'
      },
      {
        text: 'System Design',
        link: '/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology'
      }
    ]
  },
  {
    text: 'VII. Infrastructure',
    collapsed: false,
    items: [
      {
        text: 'Linux Basics',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/linux-basics'
      },
      {
        text: 'Docker Containers',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/docker-containers'
      },
      {
        text: 'Kubernetes',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/kubernetes'
      },
      {
        text: 'CI / CD',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/ci-cd'
      },
      {
        text: 'Domain, DNS & HTTPS',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/dns-https'
      },
      {
        text: 'Load Balancing',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/load-balancing-gateway'
      },
      {
        text: 'Gateway & Reverse Proxy',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/gateway-proxy'
      },
      {
        text: 'Cloud Platforms',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-platforms'
      },
      {
        text: 'IAM',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-iam'
      },
      {
        text: 'Storage & CDN',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn'
      },
      {
        text: 'IaC',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/infrastructure-as-code'
      },
      {
        text: 'Monitoring & Logging',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/monitoring-logging'
      },
      {
        text: 'Incident Response',
        link: '/zh-cn/appendix/7-infrastructure-and-operations/incident-response'
      }
    ]
  },
  {
    text: 'VIII. Artificial Intelligence',
    collapsed: false,
    items: [
      {
        text: 'AI History & Concepts',
        link: '/en/appendix/8-artificial-intelligence/ai-history'
      },
      {
        text: 'Neural Networks',
        link: '/zh-cn/appendix/8-artificial-intelligence/neural-networks'
      },
      {
        text: 'Transformer & Attention',
        link: '/zh-cn/appendix/8-artificial-intelligence/transformer-attention'
      },
      {
        text: 'LLM Principles',
        link: '/zh-cn/appendix/8-artificial-intelligence/llm-principles'
      },
      {
        text: 'Prompt Engineering',
        link: '/zh-cn/appendix/8-artificial-intelligence/prompt-engineering'
      },
      {
        text: 'Context Engineering',
        link: '/zh-cn/appendix/8-artificial-intelligence/context-engineering'
      },
      {
        text: 'Multimodal Models',
        link: '/zh-cn/appendix/8-artificial-intelligence/multimodal-models'
      },
      {
        text: 'Image Generation',
        link: '/zh-cn/appendix/8-artificial-intelligence/image-generation'
      },
      {
        text: 'Speech Synthesis',
        link: '/zh-cn/appendix/8-artificial-intelligence/speech-synthesis-recognition'
      },
      {
        text: 'Embedding & Vector Search',
        link: '/zh-cn/appendix/8-artificial-intelligence/embedding-vector-retrieval'
      },
      {
        text: 'RAG Architecture',
        link: '/zh-cn/appendix/8-artificial-intelligence/rag'
      },
      {
        text: 'AI Agent & Tools',
        link: '/zh-cn/appendix/8-artificial-intelligence/ai-agents'
      },
      {
        text: 'AI Protocols (MCP)',
        link: '/zh-cn/appendix/8-artificial-intelligence/ai-protocols'
      },
      {
        text: 'Fine-tuning & Deployment',
        link: '/zh-cn/appendix/8-artificial-intelligence/model-finetuning-deployment'
      },
      {
        text: 'AI Native Design',
        link: '/zh-cn/appendix/8-artificial-intelligence/ai-native-app-design'
      },
      {
        text: 'AI Dictionary',
        link: '/zh-cn/appendix/8-artificial-intelligence/ai-capability-dictionary'
      }
    ]
  },
  {
    text: 'IX. Engineering Excellence',
    collapsed: false,
    items: [
      {
        text: 'Code Quality',
        link: '/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring'
      },
      {
        text: 'Testing Strategies',
        link: '/zh-cn/appendix/9-engineering-excellence/testing-strategies'
      },
      {
        text: 'Design Patterns',
        link: '/zh-cn/appendix/9-engineering-excellence/design-patterns'
      },
      {
        text: 'Security Thinking',
        link: '/zh-cn/appendix/9-engineering-excellence/security-thinking'
      },
      {
        text: 'Technical Writing',
        link: '/zh-cn/appendix/9-engineering-excellence/technical-writing'
      },
      {
        text: 'Open Source',
        link: '/zh-cn/appendix/9-engineering-excellence/open-source-collaboration'
      },
      {
        text: 'Tech Selection',
        link: '/zh-cn/appendix/9-engineering-excellence/technology-selection'
      }
    ]
  }
]

const productManagerSidebar = [
  {
    text: '新手入门',
    collapsed: false,
    items: [
      { text: '学习地图', link: '/zh-cn/stage-0/0.1-learning-map/' },
      {
        text: 'AI 时代，会说话就会编程',
        link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: '产品原型实战',
    collapsed: false,
    items: [
      {
        text: '学会 AI 编程工具',
        link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/'
      },
      {
        text: '找到好点子',
        link: '/zh-cn/stage-1/1.0-finding-great-idea/'
      },
      {
        text: '搭建产品原型',
        link: '/zh-cn/stage-1/1.2-building-prototype/'
      },
      {
        text: '接入 AI 能力',
        link: '/zh-cn/stage-1/1.3-integrating-ai-capabilities/'
      },
      {
        text: '完整项目实战',
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
        text: 'AI 行业应用场景参考 (B端)',
        link: '/zh-cn/stage-1/appendix-industry-scenarios/'
      },
      {
        text: 'AI 消费场景灵感参考 (C端)',
        link: '/zh-cn/stage-1/appendix-c-consumer-scenarios/'
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

  // Vite 配置
  vite: {
    server: {
      watch: {
        ignored: ['**/docs/.vitepress/dist/**']
      }
    },
    build: {
      chunkSizeWarningLimit: 2000
    }
  },

  // Sitemap 配置
  sitemap: {
    hostname: siteUrl,
    changefreq: 'weekly',
    priority: {
      '/': 1.0,
      '/zh-cn/': 0.9,
      '/zh-cn/stage-0/': 0.9,
      '/zh-cn/stage-1/': 0.8,
      '/zh-cn/stage-2/': 0.8,
      '/zh-cn/stage-3/': 0.8,
      '/zh-cn/appendix/': 0.7
    },
    transformItems(items) {
      return items.filter((item) => {
        const url = item.url
        if (
          url.includes('/extra/') ||
          url.includes('/examples/') ||
          url.includes('/project/')
        ) {
          return false
        }
        return true
      })
    }
  },

  // 构建结束时动态生成 robots.txt
  async buildEnd(siteConfig) {
    const fs = await import('fs')
    const path = await import('path')
    
    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# 禁止搜索引擎抓取旧版内容（已迁移到新目录结构）
Disallow: /zh-cn/extra/
Disallow: /zh-cn/examples/
Disallow: /zh-cn/project/
Disallow: /en/extra/
Disallow: /en/examples/
Disallow: /en/project/

# 禁止抓取 VitePress 缓存和构建文件
Disallow: /.vitepress/
Disallow: /@fs/

# Sitemap 位置
Sitemap: ${siteUrl}/sitemap.xml
`
    
    const outDir = siteConfig.outDir || path.resolve(__dirname, '.vitepress/dist')
    const robotsPath = path.join(outDir, 'robots.txt')
    
    fs.writeFileSync(robotsPath, robotsTxt, 'utf-8')
    console.log('✓ Generated robots.txt with sitemap URL:', `${siteUrl}/sitemap.xml`)
  },

  // 多语言配置 - 使用 cn/en-us/ja 结构
  locales: {
    // 根路径 — 仅用于 404 页面兜底，实际首页由 docs/index.md 自动重定向
    root: {
      label: '',
      lang: 'zh-CN',
      link: '/zh-cn/',
      themeConfig: {
        ...commonThemeConfig,
        notFound: {
          title: '页面未找到',
          quote: '你访问的页面不存在，可能已被移动或删除。',
          linkText: '返回首页',
          linkUrl: '/zh-cn/'
        }
      }
    },
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
        notFound: {
          title: '页面未找到',
          quote: '你访问的页面不存在，可能已被移动或删除。',
          linkText: '返回首页',
          linkUrl: '/zh-cn/'
        },
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
            link: '/zh-cn/stage-2/'
          },
          {
            text: '高级开发',
            link: '/zh-cn/stage-3/'
          },
          { text: '附录', link: '/zh-cn/appendix/index' }
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
                  text: '使用 Lovart 生产素材',
                  link: '/zh-cn/stage-2/frontend/2.0-lovart-assets/'
                },
                {
                  text: 'Figma 与 MasterGo 入门',
                  link: '/zh-cn/stage-2/frontend/2.1-figma-mastergo/'
                },
                {
                  text: '参考 UI 设计规范与多产品 UI 设计',
                  link: '/zh-cn/stage-2/frontend/2.3-multi-product-ui/'
                },
                {
                  text: '用 LLM 和 Skills 让界面变好看',
                  link: '/zh-cn/stage-2/frontend/2.4-llm-skills-beautiful/'
                },
                {
                  text: '霍格沃茨的画像们：SVG 交互动画',
                  link: '/zh-cn/stage-2/frontend/2.5-hogwarts-portraits/'
                },
                {
                  text: '从设计原型到项目代码',
                  link: '/zh-cn/stage-2/frontend/2.6-design-to-code/'
                },
                {
                  text: '使用现代组件库更新你的界面',
                  link: '/zh-cn/stage-2/frontend/2.7-modern-component-library/'
                }
              ]
            },
            {
              text: '后端开发',
              collapsed: false,
              items: [
                {
                  text: '从数据库到 Supabase',
                  link: '/zh-cn/stage-2/backend/2.2-database-supabase/'
                },
                {
                  text: '大模型辅助编写接口代码与接口文档',
                  link: '/zh-cn/stage-2/backend/2.3-ai-interface-code/'
                },
                {
                  text: 'Git 工作流',
                  link: '/zh-cn/stage-2/backend/2.4-git-workflow/'
                },
                {
                  text: '如何部署 Web 应用',
                  link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/'
                },
                {
                  text: '现代 CLI 开发工具',
                  link: '/zh-cn/stage-2/backend/2.6-modern-cli/'
                },
                {
                  text: '如何集成 Stripe 等收费系统',
                  link: '/zh-cn/stage-2/backend/2.7-stripe-payment/'
                }
              ]
            },
            {
              text: 'AI 能力附录',
              collapsed: false,
              items: [
                {
                  text: 'Dify 入门与知识库集成',
                  link: '/zh-cn/stage-2/ai-capabilities/2.1-dify-knowledge-base/'
                }
              ]
            },
            {
              text: '综合项目',
              collapsed: false,
              items: [
                {
                  text: '一起做霍格沃茨画像',
                  link: '/zh-cn/stage-2/frontend/2.4-hogwarts-portraits/'
                },
                {
                  text: '构建第一个现代应用程序 - 全栈应用',
                  link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/'
                },
                {
                  text: '现代前端组件库 + Trae 实战',
                  link: '/zh-cn/stage-2/assignments/2.2-modern-frontend-trae/'
                }
              ]
            }
          ],
          '/zh-cn/stage-3/': [
            {
              text: 'Claude Code 深入浅出',
              collapsed: false,
              items: [
                {
                  text: 'Claude Code 快速上手核心指南',
                  link: '/zh-cn/stage-3/core-skills/basics/'
                },
                {
                  text: 'Claude Code MCP 完全指南',
                  link: '/zh-cn/stage-3/core-skills/mcp/'
                },
                {
                  text: 'Claude Code Skills 完全指南',
                  link: '/zh-cn/stage-3/core-skills/skills/'
                },
                {
                  text: '如何让 Coding Tools 长时间工作',
                  link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
                },
                {
                  text: 'Claude Agent Teams 完全指南',
                  link: '/zh-cn/stage-3/core-skills/agent-teams/'
                },
                {
                  text: 'Claude Code Superpowers 工程级开发',
                  link: '/zh-cn/stage-3/core-skills/superpowers/'
                },
                {
                  text: 'Claude Code 工作流最佳实践',
                  link: '/zh-cn/stage-3/core-skills/workflow/'
                },
                {
                  text: 'Claude Code 手机远程开发',
                  link: '/zh-cn/stage-3/core-skills/mobile-development/'
                },
                {
                  text: 'Claude Agent SDK 完全指南',
                  link: '/zh-cn/stage-3/core-skills/claude-agent-sdk/'
                },
                {
                  text: '从 Vibe Coding 到 Spec Coding',
                  link: '/zh-cn/stage-3/core-skills/spec-coding/'
                }
              ]
            },
            {
              text: '多平台开发',
              collapsed: false,
              items: [
                {
                  text: '如何构建微信小程序',
                  link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/'
                },
                {
                  text: '如何构建微信小程序（包含后端）',
                  link: '/zh-cn/stage-3/cross-platform/3.4-wechat-miniprogram-backend/'
                },
                {
                  text: '如何构建安卓程序-compose 原生开发',
                  link: '/zh-cn/stage-3/cross-platform/3.5-android-app/'
                },
                {
                  text: '如何构建 iOS 程序-swiftUI原生开发',
                  link: '/zh-cn/stage-3/cross-platform/3.6-ios-app/'
                },
                {
                  text: '如何开发 PWA 本地应用',
                  link: '/zh-cn/stage-3/cross-platform/3.8-pwa-local-app/'
                },
                {
                  text: '如何开发浏览器 AI 助手插件',
                  link: '/zh-cn/stage-3/cross-platform/3.9-browser-ai-extension/'
                },
                {
                  text: '如何开发跨平台 Electron 桌面程序',
                  link: '/zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/'
                },
                {
                  text: '如何快速开发并铸造 NFT',
                  link: '/zh-cn/stage-3/cross-platform/3.11-nft-minting/'
                },
                {
                  text: '如何开发 VS Code 插件',
                  link: '/zh-cn/stage-3/cross-platform/3.12-vscode-extension/'
                },
                {
                  text: '如何开发工业级 Qt 桌面应用',
                  link: '/zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/'
                },
                {
                  text: '如何构建属于自己的个人网页与学术博客',
                  link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/'
                }
              ]
            },
            {
              text: 'AI 能力强化',
              collapsed: false,
              items: [
                {
                  text: '什么是 RAG 以及它如何工作',
                  link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/'
                },
                {
                  text: '中高级 RAG 与工作流编排 - 以 LangGraph 为例',
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
                  link: '/zh-cn/stage-2/backend/2.4-git-workflow/'
                },
                {
                  text: 'Extra 2: What is API',
                  link: '/zh-cn/stage-2/backend/2.1-what-is-api/'
                },
                {
                  text: 'Extra 5: What is RAG',
                  link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/'
                },
                {
                  text: 'Extra 6: Zeabur Deployment',
                  link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/'
                },
                {
                  text: 'Extra 7: CLI AI Tools & TDD',
                  link: '/zh-cn/stage-2/backend/2.6-modern-cli/'
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
                  text: '一起做霍格沃茨画像',
                  link: '/zh-cn/stage-2/frontend/2.4-hogwarts-portraits/'
                },
                {
                  text: 'Supabase 数据库',
                  link: '/zh-cn/stage-2/backend/2.2-database-supabase/'
                },
                {
                  text: 'Dify & Knowledge Base',
                  link: '/zh-cn/stage-2/ai-capabilities/2.1-dify-knowledge-base/'
                }
              ]
            }
          ],
          '/zh-cn/appendix/': [
            {
              text: '一、计算机是怎么回事',
              collapsed: false,
              items: [
                {
                  text: 'Vibe Coding 时代下的全栈开发',
                  link: '/zh-cn/appendix/1-computer-fundamentals/vibe-coding-fullstack'
                },
                {
                  text: '从按下电源到访问网站发生了什么',
                  link: '/zh-cn/appendix/1-computer-fundamentals/power-on-to-web'
                },
                {
                  text: '从晶体管到 CPU',
                  link: '/zh-cn/appendix/1-computer-fundamentals/transistor-to-cpu'
                },
                {
                  text: '计算机组成原理',
                  link: '/zh-cn/appendix/1-computer-fundamentals/computer-organization'
                },
                {
                  text: '操作系统（进程 / 内存 / 文件系统）',
                  link: '/zh-cn/appendix/1-computer-fundamentals/operating-systems'
                },
                {
                  text: '数据的编码、存储与传输',
                  link: '/zh-cn/appendix/1-computer-fundamentals/data-encoding-storage'
                },
                {
                  text: '网络：从输入网址到返回结果的过程',
                  link: '/zh-cn/appendix/1-computer-fundamentals/computer-networks'
                },
                {
                  text: '数据结构',
                  link: '/zh-cn/appendix/1-computer-fundamentals/data-structures'
                },
                {
                  text: '算法思维入门',
                  link: '/zh-cn/appendix/1-computer-fundamentals/algorithm-thinking'
                },
                {
                  text: '编程语言图谱',
                  link: '/zh-cn/appendix/1-computer-fundamentals/programming-languages'
                },
                {
                  text: '编译原理入门',
                  link: '/zh-cn/appendix/1-computer-fundamentals/compilers'
                },
                {
                  text: '类型系统入门',
                  link: '/zh-cn/appendix/1-computer-fundamentals/type-systems'
                }
              ]
            },
            {
              text: '二、开发环境与工具',
              collapsed: false,
              items: [
                {
                  text: '集成开发环境 (IDE) 基础',
                  link: '/zh-cn/appendix/2-development-tools/ide-basics'
                },
                {
                  text: '命令行与 Shell 脚本',
                  link: '/zh-cn/appendix/2-development-tools/command-line-shell'
                },
                {
                  text: 'Git：代码的时光机',
                  link: '/zh-cn/appendix/2-development-tools/git-version-control'
                },
                {
                  text: '环境变量与 PATH',
                  link: '/zh-cn/appendix/2-development-tools/environment-path'
                },
                {
                  text: '端口与 localhost',
                  link: '/zh-cn/appendix/2-development-tools/ports-localhost'
                },
                {
                  text: 'SSH 与密钥认证',
                  link: '/zh-cn/appendix/2-development-tools/ssh-authentication'
                },
                {
                  text: '包管理器（npm / pip / cargo）',
                  link: '/zh-cn/appendix/2-development-tools/package-managers'
                },
                {
                  text: '调试的艺术',
                  link: '/zh-cn/appendix/2-development-tools/debugging-art/'
                },
                {
                  text: '正则表达式',
                  link: '/zh-cn/appendix/2-development-tools/regex'
                }
              ]
            },
            {
              text: '三、浏览器与前端',
              collapsed: false,
              items: [
                {
                  text: 'JavaScript 语言深入',
                  link: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive'
                },
                {
                  text: 'TypeScript：给 JS 加上类型系统',
                  link: '/zh-cn/appendix/3-browser-and-frontend/typescript'
                },
                {
                  text: '前端框架对比（React / Vue / Svelte / Angular）',
                  link: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks'
                },
                {
                  text: '浏览器是一个操作系统',
                  link: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os'
                },
                {
                  text: '浏览器渲染管道',
                  link: '/zh-cn/appendix/3-browser-and-frontend/browser-as-os-rendering'
                },
                {
                  text: 'HTML / CSS 布局体系',
                  link: '/zh-cn/appendix/3-browser-and-frontend/html-css-layout'
                },
                {
                  text: 'JavaScript 运行时',
                  link: '/zh-cn/appendix/3-browser-and-frontend/javascript-runtime'
                },
                {
                  text: '前端框架的本质',
                  link: '/zh-cn/appendix/3-browser-and-frontend/frontend-framework-nature'
                },
                {
                  text: '状态管理哲学',
                  link: '/zh-cn/appendix/3-browser-and-frontend/state-management'
                },
                {
                  text: '路由与导航',
                  link: '/zh-cn/appendix/3-browser-and-frontend/routing-navigation'
                },
                {
                  text: '图形与动画（Canvas / SVG / WebGL）',
                  link: '/zh-cn/appendix/3-browser-and-frontend/graphics-animation'
                },
                {
                  text: '实时通信（WebSocket / SSE）',
                  link: '/zh-cn/appendix/3-browser-and-frontend/realtime-communication'
                },
                {
                  text: '网页性能的度量与优化',
                  link: '/zh-cn/appendix/3-browser-and-frontend/web-performance'
                },
                {
                  text: '前端工程化全貌',
                  link: '/zh-cn/appendix/3-browser-and-frontend/frontend-engineering'
                },
                {
                  text: '前端项目文件目录设计',
                  link: '/zh-cn/appendix/3-browser-and-frontend/frontend-project-architecture'
                },
                {
                  text: '无障碍与国际化',
                  link: '/zh-cn/appendix/3-browser-and-frontend/a11n-i18n'
                }
              ]
            },
            {
              text: '四、服务器与后端',
              collapsed: false,
              items: [
                {
                  text: '后端语言对比（Node.js / Go / Java / Rust）',
                  link: '/zh-cn/appendix/4-server-and-backend/backend-languages'
                },
                {
                  text: '客户端语言对比（Swift / Kotlin / Dart）',
                  link: '/zh-cn/appendix/4-server-and-backend/client-languages'
                },
                {
                  text: '跨平台方案对比（React Native / Flutter / Electron / Tauri）',
                  link: '/zh-cn/appendix/4-server-and-backend/cross-platform'
                },
                {
                  text: 'HTTP 协议',
                  link: '/zh-cn/appendix/4-server-and-backend/http-protocol'
                },
                {
                  text: '一个请求的完整旅程',
                  link: '/zh-cn/appendix/4-server-and-backend/request-journey'
                },
                {
                  text: 'Web 框架的本质',
                  link: '/zh-cn/appendix/4-server-and-backend/web-frameworks'
                },
                {
                  text: 'API 入门',
                  link: '/zh-cn/appendix/4-server-and-backend/api-intro'
                },
                {
                  text: 'API 设计哲学（REST / GraphQL / gRPC）',
                  link: '/zh-cn/appendix/4-server-and-backend/api-design'
                },
                {
                  text: '序列化与数据格式',
                  link: '/zh-cn/appendix/4-server-and-backend/serialization'
                },
                {
                  text: '认证与授权体系',
                  link: '/zh-cn/appendix/4-server-and-backend/auth-authorization'
                },
                {
                  text: '并发、异步与多线程',
                  link: '/zh-cn/appendix/4-server-and-backend/concurrency-async'
                },
                {
                  text: '缓存的层次与策略',
                  link: '/zh-cn/appendix/4-server-and-backend/caching'
                },
                {
                  text: '消息队列与事件驱动',
                  link: '/zh-cn/appendix/4-server-and-backend/message-queues'
                },
                {
                  text: '异步任务队列与生产消费模型',
                  link: '/zh-cn/appendix/4-server-and-backend/async-task-queues'
                },
                {
                  text: '限流与背压控制',
                  link: '/zh-cn/appendix/4-server-and-backend/rate-limiting-backpressure'
                },
                {
                  text: '搜索引擎原理',
                  link: '/zh-cn/appendix/4-server-and-backend/search-engines'
                },
                {
                  text: '文件存储与对象存储',
                  link: '/zh-cn/appendix/4-server-and-backend/file-storage'
                },
                {
                  text: '后端分层架构',
                  link: '/zh-cn/appendix/4-server-and-backend/backend-layered-architecture'
                },
                {
                  text: '后端项目文件目录设计',
                  link: '/zh-cn/appendix/4-server-and-backend/backend-project-architecture'
                },
                {
                  text: '领域特定语言（DSL）',
                  link: '/zh-cn/appendix/4-server-and-backend/domain-specific-languages'
                }
              ]
            },
            {
              text: '五、数据',
              collapsed: false,
              items: [
                {
                  text: '数据库原理（索引 / 事务 / 查询优化）',
                  link: '/zh-cn/appendix/5-data/database-fundamentals'
                },
                {
                  text: '数据模型全景（文档 / 图 / 时序 / 向量）',
                  link: '/zh-cn/appendix/5-data/data-models'
                },
                {
                  text: '数据埋点与用户行为采集',
                  link: '/zh-cn/appendix/5-data/data-tracking'
                },
                {
                  text: '数据分析基础（统计 / 指标 / 漏斗）',
                  link: '/zh-cn/appendix/5-data/data-analysis'
                },
                {
                  text: 'A/B 测试与实验驱动',
                  link: '/zh-cn/appendix/5-data/ab-testing'
                },
                {
                  text: '数据可视化与仪表盘',
                  link: '/zh-cn/appendix/5-data/data-visualization'
                },
                {
                  text: '数据治理与数据质量',
                  link: '/zh-cn/appendix/5-data/data-governance'
                }
              ]
            },
            {
              text: '六、架构与系统设计',
              collapsed: false,
              items: [
                {
                  text: '从单体到微服务的演进',
                  link: '/zh-cn/appendix/6-architecture-and-system-design/monolith-to-microservices'
                },
                {
                  text: '分布式系统的挑战',
                  link: '/zh-cn/appendix/6-architecture-and-system-design/distributed-systems'
                },
                {
                  text: '高可用与容灾',
                  link: '/zh-cn/appendix/6-architecture-and-system-design/high-availability'
                },
                {
                  text: '系统设计方法论',
                  link: '/zh-cn/appendix/6-architecture-and-system-design/system-design-methodology'
                }
              ]
            },
            {
              text: '七、基础设施与运维',
              collapsed: false,
              items: [
                {
                  text: 'Linux 基础',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/linux-basics'
                },
                {
                  text: 'Docker 容器化',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/docker-containers'
                },
                {
                  text: 'Kubernetes 编排',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/kubernetes'
                },
                {
                  text: 'CI / CD 自动化',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/ci-cd'
                },
                {
                  text: '域名、DNS 与 HTTPS',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/dns-https'
                },
                {
                  text: '负载均衡与网关',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/load-balancing-gateway'
                },
                {
                  text: '网关与反向代理',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/gateway-proxy'
                },
                {
                  text: '云平台实战',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-platforms'
                },
                {
                  text: 'IAM 权限管理',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-iam'
                },
                {
                  text: '对象存储与 CDN',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn'
                },
                {
                  text: '基础设施即代码',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/infrastructure-as-code'
                },
                {
                  text: '监控、日志与告警',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/monitoring-logging'
                },
                {
                  text: '故障排查与应急响应',
                  link: '/zh-cn/appendix/7-infrastructure-and-operations/incident-response'
                }
              ]
            },
            {
              text: '八、人工智能',
              collapsed: false,
              items: [
                {
                  text: 'AI 简史与核心概念',
                  link: '/zh-cn/appendix/8-artificial-intelligence/ai-history'
                },
                {
                  text: '神经网络与深度学习',
                  link: '/zh-cn/appendix/8-artificial-intelligence/neural-networks'
                },
                {
                  text: 'Transformer 与注意力机制',
                  link: '/zh-cn/appendix/8-artificial-intelligence/transformer-attention'
                },
                {
                  text: '大语言模型的工作原理',
                  link: '/zh-cn/appendix/8-artificial-intelligence/llm-principles'
                },
                {
                  text: '提示词工程',
                  link: '/zh-cn/appendix/8-artificial-intelligence/prompt-engineering'
                },
                {
                  text: '上下文工程',
                  link: '/zh-cn/appendix/8-artificial-intelligence/context-engineering'
                },
                {
                  text: '多模态模型（视觉 / 音频 / 视频）',
                  link: '/zh-cn/appendix/8-artificial-intelligence/multimodal-models'
                },
                {
                  text: '图像生成原理',
                  link: '/zh-cn/appendix/8-artificial-intelligence/image-generation'
                },
                {
                  text: '语音合成与识别',
                  link: '/zh-cn/appendix/8-artificial-intelligence/speech-synthesis-recognition'
                },
                {
                  text: 'Embedding 与向量检索',
                  link: '/zh-cn/appendix/8-artificial-intelligence/embedding-vector-retrieval'
                },
                {
                  text: 'RAG 架构',
                  link: '/zh-cn/appendix/8-artificial-intelligence/rag'
                },
                {
                  text: 'AI Agent 与工具调用',
                  link: '/zh-cn/appendix/8-artificial-intelligence/ai-agents'
                },
                {
                  text: 'AI 协议（MCP & A2A）',
                  link: '/zh-cn/appendix/8-artificial-intelligence/ai-protocols'
                },
                {
                  text: '模型微调与部署',
                  link: '/zh-cn/appendix/8-artificial-intelligence/model-finetuning-deployment'
                },
                {
                  text: 'AI 原生应用设计',
                  link: '/zh-cn/appendix/8-artificial-intelligence/ai-native-app-design'
                },
                {
                  text: 'AI 能力词典',
                  link: '/zh-cn/appendix/8-artificial-intelligence/ai-capability-dictionary'
                }
              ]
            },
            {
              text: '九、工程素养',
              collapsed: false,
              items: [
                {
                  text: '代码质量与重构',
                  link: '/zh-cn/appendix/9-engineering-excellence/code-quality-refactoring'
                },
                {
                  text: '测试策略',
                  link: '/zh-cn/appendix/9-engineering-excellence/testing-strategies'
                },
                {
                  text: '设计模式',
                  link: '/zh-cn/appendix/9-engineering-excellence/design-patterns'
                },
                {
                  text: '安全思维与攻防基础',
                  link: '/zh-cn/appendix/9-engineering-excellence/security-thinking'
                },
                {
                  text: '技术文档写作',
                  link: '/zh-cn/appendix/9-engineering-excellence/technical-writing'
                },
                {
                  text: '开源协作',
                  link: '/zh-cn/appendix/9-engineering-excellence/open-source-collaboration'
                },
                {
                  text: '技术选型方法论',
                  link: '/zh-cn/appendix/9-engineering-excellence/technology-selection'
                }
              ]
            }
          ]
        }
      }
    },

    // 英文
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Easy-Vibe Tutorial',
      description:
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools',
      head: getSeoHead(
        'en',
        'Easy-Vibe Tutorial',
        'Learn Vibe Coding from Zero to Advanced - Master AI programming with Claude Code, Cursor, and other AI IDE tools'
      ),
      themeConfig: {
        ...commonThemeConfig,
        notFound: {
          title: 'Page Not Found',
          quote:
            'The page you are looking for does not exist or has been moved.',
          linkText: 'Take me home',
          linkUrl: '/en/'
        },
        outline: {
          level: [1, 6],
          label: 'On this page'
        },
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Novice & PM',
            link: '/en/stage-0/'
          },
          {
            text: 'Full-Stack Development',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'Advanced Development',
            link: '/zh-cn/stage-3/'
          },
          { text: 'Appendix', link: '/zh-cn/appendix/index' }
        ],
        sidebar: {
          '/en/stage-0/': productManagerSidebarEn,
          '/en/stage-1/': productManagerSidebarEn,
          '/en/stage-2/': stage2SidebarEn,
          '/en/stage-3/': stage3SidebarEn,
          '/en/appendix/': appendixSidebarEn
        }
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
        notFound: {
          title: 'ページが見つかりません',
          quote: 'お探しのページは存在しないか、移動された可能性があります。',
          linkText: 'ホームに戻る',
          linkUrl: '/ja-jp/'
        },
        outline: {
          level: [1, 6],
          label: 'このページの目次'
        },
        nav: [
          { text: 'ホーム', link: '/ja-jp/' },
          {
            text: '初心者とPM',
            link: '/zh-cn/stage-0/'
          },
          {
            text: 'フルスタック開発',
            link: '/zh-cn/stage-2/'
          },
          {
            text: '上級開発',
            link: '/zh-cn/stage-3/'
          },
          { text: '付録', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: '頁面未找到',
          quote: '你訪問的頁面不存在，可能已被移動或刪除。',
          linkText: '返回首頁',
          linkUrl: '/zh-tw/'
        },
        outline: {
          level: [1, 6],
          label: '頁面導航'
        },
        nav: [
          { text: '首頁', link: '/zh-tw/' },
          {
            text: '新手與產品原型',
            link: '/zh-cn/stage-0/'
          },
          {
            text: '初中級開發',
            link: '/zh-cn/stage-2/'
          },
          {
            text: '高級開發',
            link: '/zh-cn/stage-3/'
          },
          { text: '附錄', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: '페이지를 찾을 수 없습니다',
          quote: '찾고 있는 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
          linkText: '홈으로 돌아가기',
          linkUrl: '/ko-kr/'
        },
        outline: {
          level: [1, 6],
          label: '페이지 탐색'
        },
        nav: [
          { text: '홈', link: '/ko-kr/' },
          { text: '초보자 & PM', link: '/zh-cn/stage-0/' },
          {
            text: '풀스택 개발',
            link: '/zh-cn/stage-2/'
          },
          {
            text: '고급 개발',
            link: '/zh-cn/stage-3/'
          },
          { text: '부록', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: 'Página no encontrada',
          quote: 'La página que buscas no existe o ha sido movida.',
          linkText: 'Volver al inicio',
          linkUrl: '/es-es/'
        },
        outline: {
          level: [1, 6],
          label: 'Navegación de página'
        },
        nav: [
          { text: 'Inicio', link: '/es-es/' },
          {
            text: 'Principiante y PM',
            link: '/zh-cn/stage-0/'
          },
          {
            text: 'Desarrollo Full Stack',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'Desarrollo Avanzado',
            link: '/zh-cn/stage-3/'
          },
          { text: 'Apéndice', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: 'Page non trouvée',
          quote: "La page que vous recherchez n'existe pas ou a été déplacée.",
          linkText: "Retour à l'accueil",
          linkUrl: '/fr-fr/'
        },
        outline: {
          level: [1, 6],
          label: 'Navigation de page'
        },
        nav: [
          { text: 'Accueil', link: '/fr-fr/' },
          { text: 'Débutant & PM', link: '/zh-cn/stage-0/' },
          {
            text: 'Développement Full Stack',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'Développement Avancé',
            link: '/zh-cn/stage-3/'
          },
          { text: 'Annexe', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: 'Seite nicht gefunden',
          quote: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
          linkText: 'Zurück zur Startseite',
          linkUrl: '/de-de/'
        },
        outline: {
          level: [1, 6],
          label: 'Seitennavigation'
        },
        nav: [
          { text: 'Start', link: '/de-de/' },
          { text: 'Anfänger & PM', link: '/zh-cn/stage-0/' },
          {
            text: 'Full Stack Entwicklung',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'Fortgeschrittene Entwicklung',
            link: '/zh-cn/stage-3/'
          },
          { text: 'Anhang', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: 'الصفحة غير موجودة',
          quote: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
          linkText: 'العودة إلى الرئيسية',
          linkUrl: '/ar-sa/'
        },
        outline: {
          level: [1, 6],
          label: 'تنقل الصفحة'
        },
        nav: [
          { text: 'الرئيسية', link: '/ar-sa/' },
          {
            text: 'مبتدأ & PM',
            link: '/zh-cn/stage-0/'
          },
          {
            text: 'تطوير Full Stack',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'تطوير متقدم',
            link: '/zh-cn/stage-3/'
          },
          { text: 'ملحق', link: '/zh-cn/appendix/' }
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
        notFound: {
          title: 'Không tìm thấy trang',
          quote:
            'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
          linkText: 'Về trang chủ',
          linkUrl: '/vi-vn/'
        },
        outline: {
          level: [1, 6],
          label: 'Điều hướng trang'
        },
        nav: [
          { text: 'Trang chủ', link: '/vi-vn/' },
          {
            text: 'Người mới & PM',
            link: '/zh-cn/stage-0/'
          },
          {
            text: 'Phát triển Full Stack',
            link: '/zh-cn/stage-2/'
          },
          {
            text: 'Phát triển Nâng cao',
            link: '/zh-cn/stage-3/'
          },
          { text: 'Phụ lục', link: '/zh-cn/appendix/' }
        ],
        sidebar: {}
      }
    }
  }
})
