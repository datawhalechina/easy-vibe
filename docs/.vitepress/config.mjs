import fs from 'node:fs'
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

const buildLocale = process.env.VITEPRESS_BUILD_LOCALE
const activeBuildLocales = (
  process.env.VITEPRESS_BUILD_LOCALES_ACTIVE ||
  buildLocale ||
  ''
)
  .split(',')
  .map((locale) => locale.trim())
  .filter(Boolean)
const supportedLocaleDirs = Object.keys(localeMap)
const activeSupportedBuildLocales = activeBuildLocales.filter((locale) =>
  supportedLocaleDirs.includes(locale)
)
const localeBuildExcludes = activeSupportedBuildLocales.length
  ? supportedLocaleDirs
      .filter((locale) => !activeSupportedBuildLocales.includes(locale))
      .map((locale) => `${locale}/**`)
  : []
const srcExclude = ['plans/**', ...localeBuildExcludes]
const buildConcurrency = Number.parseInt(
  process.env.VITEPRESS_BUILD_CONCURRENCY || '',
  10
)

if (buildLocale && !supportedLocaleDirs.includes(buildLocale)) {
  console.warn(
    `Unsupported VITEPRESS_BUILD_LOCALE=${buildLocale}. Building all locales.`
  )
}

for (const locale of activeBuildLocales) {
  if (!supportedLocaleDirs.includes(locale)) {
    console.warn(
      `Unsupported active build locale=${locale}. Ignoring it for srcExclude.`
    )
  }
}

const getMarkdownFileUrl = (locale, relativePath) => {
  if (!relativePath) {
    return new URL(`../${locale}/index.md`, import.meta.url)
  }
  const cleanPath = relativePath.replace(/\/$/, '')
  return new URL(`../${locale}/${cleanPath}.md`, import.meta.url)
}

const hasLocalizedPage = (locale, relativePath) => {
  if (!relativePath) return true
  const cleanPath = relativePath.replace(/\/$/, '')
  const candidates = [
    getMarkdownFileUrl(locale, cleanPath),
    new URL(`../${locale}/${cleanPath}/index.md`, import.meta.url)
  ]
  return candidates.some((fileUrl) => fs.existsSync(fileUrl))
}

const getLocalizedFallbackPath = (locale, requestedPath = '') => {
  const cleanPath = requestedPath
    .replace(/^\//, '')
    .replace(/\.html$/, '')
    .replace(/\/index$/, '')
    .replace(/\/$/, '')

  if (!cleanPath || hasLocalizedPage(locale, cleanPath)) {
    return cleanPath
  }

  return ''
}

const parseLocaleHref = (href) => {
  if (!href) return null
  const decodedHref = href.replace(/&amp;/g, '&')
  let pathname

  if (decodedHref.startsWith(siteUrl)) {
    pathname = decodedHref.slice(siteUrl.length)
  } else if (decodedHref.startsWith(base)) {
    pathname = decodedHref.slice(base.length - 1)
  } else if (decodedHref.startsWith('/')) {
    pathname = decodedHref
  } else {
    return null
  }

  const [pathWithoutQuery] = pathname.split(/[?#]/)
  const locale = supportedLocaleDirs.find(
    (item) =>
      pathWithoutQuery === `/${item}/` || pathWithoutQuery.startsWith(`/${item}/`)
  )

  if (!locale) return null

  return {
    locale,
    relativePath: pathWithoutQuery
      .slice(locale.length + 2)
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')
      .replace(/\/$/, '')
  }
}

const toLocaleHtmlHref = (locale, relativePath) => {
  const cleanPath = relativePath.replace(/\/$/, '')
  if (!cleanPath) return `${base}${locale}/`.replace(/\/{2,}/g, '/')
  const suffix = cleanPath.endsWith('.html') ? cleanPath : `${cleanPath}.html`
  return `${base}${locale}/${suffix}`.replace(/\/{2,}/g, '/')
}

const rewriteMissingLocaleMenuLinks = (html) =>
  html.replace(
    /(<a\b(?=[^>]*\bclass="[^"]*\bVPLink\b[^"]*\blink\b[^"]*")[^>]*\bhref=")([^"]+)("[^>]*>)/g,
    (match, before, href, after) => {
      const parsed = parseLocaleHref(href)
      if (!parsed) return match

      const fallbackPath = getLocalizedFallbackPath(
        parsed.locale,
        parsed.relativePath
      )
      if (fallbackPath === parsed.relativePath) return match

      return `${before}${toLocaleHtmlHref(parsed.locale, fallbackPath)}${after}`
    }
  )

// SEO 相关配置
const getSeoHead = (locale, title, description, path = '') => {
  const seoConfig = localeMap[locale] || localeMap['zh-cn']
  const canonicalUrl = path ? `${siteUrl}${path}` : `${siteUrl}/${locale}/`
  const ogImageUrl = `${siteUrl}${base}logo.png`

  // 从路径中提取页面相对路径（去掉语言前缀）
  const getRelativePath = (fullPath, currentLocale) => {
    if (!fullPath) return ''
    const prefix = `/${currentLocale}/`
    if (fullPath.startsWith(prefix)) {
      return fullPath.slice(prefix.length)
    }
    return fullPath.replace(/^\//, '')
  }

  const relativePath = getRelativePath(path, locale)

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
    ['meta', { name: 'bingbot', content: 'index,follow' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    ['meta', { name: 'revisit-after', content: '7 days' }]
  ]

  // 添加 hreflang 标签 - 指向相同页面的不同语言版本
  Object.keys(localeMap).forEach((lang) => {
    if (!hasLocalizedPage(lang, relativePath)) return
    let alternateUrl = `${siteUrl}/${lang}/`
    if (relativePath) {
      alternateUrl = `${siteUrl}/${lang}/${relativePath}`
    }
    head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: localeMap[lang].hreflang,
        href: alternateUrl
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
      },
      sameAs: ['https://github.com/datawhalechina/easy-vibe']
    },
    mainEntity: {
      '@type': 'Course',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'Datawhale',
        sameAs: 'https://github.com/datawhalechina/easy-vibe'
      },
      educationalLevel: 'Beginner to Advanced',
      learningResourceType: 'Course'
    }
  }
  head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

  // 生成动态 BreadcrumbList 结构化数据
  const generateBreadcrumbList = () => {
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh-cn' ? '首页' : 'Home',
        item: `${siteUrl}/${locale}/`
      }
    ]

    if (relativePath) {
      // 解析路径生成面包屑
      const pathParts = relativePath.split('/').filter(Boolean)
      let currentPath = ''

      // 路径分段名称映射
      const segmentNames = {
        'zh-cn': {
          'stage-1': 'AI产品经理',
          'stage-2': '初中级开发工程师',
          'stage-3': '高级开发工程师',
          appendix: '附录',
          guide: '指南',
          frontend: '前端',
          backend: '后端',
          'ai-capabilities': 'AI能力',
          'core-skills': '核心技能',
          'cross-platform': '跨平台开发',
          'personal-brand': '个人品牌',
          'ai-advanced': 'AI进阶'
        },
        en: {
          'stage-1': 'AI Product Manager',
          'stage-2': 'Junior Developer',
          'stage-3': 'Senior Developer',
          appendix: 'Appendix',
          guide: 'Guide',
          frontend: 'Frontend',
          backend: 'Backend',
          'ai-capabilities': 'AI Capabilities',
          'core-skills': 'Core Skills',
          'cross-platform': 'Cross-platform',
          'personal-brand': 'Personal Brand',
          'ai-advanced': 'AI Advanced'
        }
      }

      const names = segmentNames[locale] || segmentNames['zh-cn']

      pathParts.forEach((part, index) => {
        currentPath += `/${part}`
        const name = names[part] || part.replace(/-/g, ' ')
        items.push({
          '@type': 'ListItem',
          position: index + 2,
          name: name,
          item: `${siteUrl}/${locale}${currentPath}/`
        })
      })
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    }
  }

  const breadcrumbJsonLd = generateBreadcrumbList()
  head.push([
    'script',
    { type: 'application/ld+json', class: 'breadcrumb-jsonld' },
    JSON.stringify(breadcrumbJsonLd)
  ])

  return head
}

const commonHead = [
  ['link', { rel: 'icon', href: `${base}logo.png`.replace('//', '/') }],
  ['link', { rel: 'stylesheet', href: `${base}style.css`.replace('//', '/') }]
]

const commonThemeConfig = {
  logo: '/assets/easy-vibe-logo-hd.svg',
  siteTitle: false,
  search: false,
  // socialLinks: [
  //   { icon: 'github', link: 'https://github.com/datawhalechina/easy-vibe' }
  // ],
  editLink: {
    pattern: 'https://github.com/datawhalechina/easy-vibe/edit/main/docs/:path',
    text: 'Edit this page on GitHub'
  },
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
      { text: 'Learning Map', link: '/en/stage-1/learning-map/' },
      {
        text: 'AI Era: If You Can Speak, You Can Code',
        link: '/en/stage-1/ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: 'Product Prototype Skills',
    collapsed: false,
    items: [
      {
        text: 'Master AI Programming Tools',
        link: '/en/stage-1/introduction-to-ai-ide/'
      },
      {
        text: 'Find Great Ideas',
        link: '/en/stage-1/finding-great-idea/'
      },
      {
        text: 'Build Product Prototypes',
        link: '/en/stage-1/building-prototype/'
      },
      {
        text: 'Integrate AI Capabilities',
        link: '/en/stage-1/integrating-ai-capabilities/'
      },
      {
        text: 'Complete Project Practice',
        link: '/en/stage-1/complete-project-practice/'
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
    text: 'Appendix: User Research and Validation',
    collapsed: false,
    items: [
      {
        text: 'Where to Find Ideas: 3 Reference Sources That Work Best for Beginners',
        link: '/en/stage-1/appendix-idea-sources/'
      },
      {
        text: 'Double Diamond: First Do the Right Thing, Then Do It Right',
        link: '/en/stage-1/appendix-double-diamond/'
      },
      {
        text: 'Use Jobs to Be Done to Find What Users Really Want to Get Done',
        link: '/en/stage-1/appendix-jobs-to-be-done/'
      },
      {
        text: 'The Mom Test: A User Interview Method for Validating Demand',
        link: '/en/stage-1/appendix-mom-test/'
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
        link: '/en/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
      },
      {
        text: 'Design Websites with Agents',
        link: '/en/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
      }
    ]
  }
]

const productManagerSidebarKo = [
  {
    text: '시작하기',
    collapsed: false,
    items: [
      { text: '학습 지도', link: '/ko-kr/stage-1/learning-map/' },
      {
        text: 'AI 시대, 말할 수 있으면 코딩할 수 있다',
        link: '/ko-kr/stage-1/ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: '제품 프로토타입 역량',
    collapsed: false,
    items: [
      {
        text: 'AI IDE 도구 익히기',
        link: '/ko-kr/stage-1/introduction-to-ai-ide/'
      },
      {
        text: '좋은 아이디어 찾기',
        link: '/ko-kr/stage-1/finding-great-idea/'
      },
      {
        text: '프로토타입 만들기',
        link: '/ko-kr/stage-1/building-prototype/'
      },
      {
        text: 'AI 기능 통합하기',
        link: '/ko-kr/stage-1/integrating-ai-capabilities/'
      },
      {
        text: '완성 프로젝트 실습',
        link: '/ko-kr/stage-1/complete-project-practice/'
      }
    ]
  },
  {
    text: '부록: 비즈니스 사고',
    collapsed: false,
    items: [
      {
        text: '제품 사고와 솔루션 설계',
        link: '/ko-kr/stage-1/appendix-a-product-thinking/'
      },
      {
        text: 'AI 산업 적용 시나리오',
        link: '/ko-kr/stage-1/appendix-industry-scenarios/'
      },
      {
        text: '소비자용 AI 제품 시나리오',
        link: '/ko-kr/stage-1/appendix-c-consumer-scenarios/'
      }
    ]
  },
  {
    text: '부록: 사용자 조사와 검증',
    collapsed: false,
    items: [
      {
        text: '아이디어는 어디서 찾을까',
        link: '/ko-kr/stage-1/appendix-idea-sources/'
      },
      {
        text: 'Double Diamond',
        link: '/ko-kr/stage-1/appendix-double-diamond/'
      },
      {
        text: 'Jobs to Be Done',
        link: '/ko-kr/stage-1/appendix-jobs-to-be-done/'
      },
      {
        text: 'The Mom Test',
        link: '/ko-kr/stage-1/appendix-mom-test/'
      }
    ]
  },
  {
    text: '부록: 기술 문제 해결',
    collapsed: false,
    items: [
      {
        text: '오류가 났을 때 대처법',
        link: '/ko-kr/stage-1/appendix-b-common-errors/'
      },
      {
        text: 'AI 코딩 도구로 스네이크 게임 만들기',
        link: '/ko-kr/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
      },
      {
        text: '디자인 Agent와 코딩 Agent로 웹사이트 만들기',
        link: '/ko-kr/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
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
        text: 'Asset Production & Agent Building',
        link: '/en/stage-2/frontend/lovart-assets/'
      },
      {
        text: 'Figma & MasterGo Basics',
        link: '/en/stage-2/frontend/figma-mastergo/'
      },
      {
        text: 'UI Design Specs & Multi-Product Interface',
        link: '/en/stage-2/frontend/multi-product-ui/'
      },
      {
        text: 'LLM & Skills Interface Beautification',
        link: '/en/stage-2/frontend/llm-skills-beautiful/'
      },
      {
        text: 'Design Prototype to Project Code',
        link: '/en/stage-2/frontend/design-to-code/'
      },
      {
        text: 'Modern Component Libraries',
        link: '/en/stage-2/frontend/modern-component-library/'
      }
    ]
  },
  {
    text: 'Backend & Full-Stack',
    collapsed: false,
    items: [
      {
        text: 'Database & Supabase',
        link: '/en/stage-2/backend/database-supabase/'
      },
      {
        text: 'Backend API Design & Development',
        link: '/en/stage-2/backend/ai-interface-code/'
      },
      {
        text: 'Git & GitHub Workflow',
        link: '/en/stage-2/backend/git-workflow/'
      },
      {
        text: 'Web App Deployment',
        link: '/en/stage-2/backend/zeabur-deployment/'
      },
      {
        text: 'Modern CLI Dev Tools',
        link: '/en/stage-2/backend/modern-cli/'
      },
      {
        text: 'Stripe Payment Integration',
        link: '/en/stage-2/backend/stripe-payment/'
      }
    ]
  },
  {
    text: 'AI Capabilities Appendix',
    collapsed: false,
    items: [
      {
        text: 'AI 1: Dify & Knowledge Base',
        link: '/en/stage-2/ai-capabilities/dify-knowledge-base/'
      }
    ]
  },
  {
    text: 'Comprehensive Projects',
    collapsed: false,
    items: [
      {
        text: 'Hogwarts Portraits Project',
        link: '/en/stage-2/frontend/hogwarts-portraits/'
      },
      {
        text: 'AI Marketing Copywriting SaaS',
        link: '/en/stage-2/assignments/copywriting-platform-supabase/'
      },
      {
        text: 'Online Exam & Management System',
        link: '/en/stage-2/assignments/exam-management-express/'
      },
      {
        text: 'Modern AI Image SaaS',
        link: '/en/stage-2/assignments/modern-landing-page/'
      },
      {
        text: 'Custom Dify Agent Platform',
        link: '/en/stage-2/assignments/custom-dify-agent-platform/'
      },
      {
        text: 'Travel Planning Agent Platform',
        link: '/en/stage-2/assignments/travel-planning-agent-platform/'
      },
      {
        text: 'Spring Boot Movie Recommender',
        link: '/en/stage-2/assignments/movie-recommendation-springboot/'
      },
      {
        text: 'Grocery Microservices System',
        link: '/en/stage-2/assignments/simple-grocery-microservices/'
      },
      {
        text: 'Go Traffic Data Platform',
        link: '/en/stage-2/assignments/traffic-data-visualization-go/'
      }
    ]
  }
]

const zhCnStage2Sidebar = [
  {
    text: '前端开发',
    collapsed: false,
    items: [
      {
        text: 'NanoBanana 素材生产',
        link: '/zh-cn/stage-2/frontend/lovart-assets/'
      },
      {
        text: 'Figma 与 MasterGo 入门',
        link: '/zh-cn/stage-2/frontend/figma-mastergo/'
      },
      {
        text: 'UI 设计规范与多产品界面',
        link: '/zh-cn/stage-2/frontend/multi-product-ui/'
      },
      {
        text: '结合 Agent Skills 美化界面',
        link: '/zh-cn/stage-2/frontend/llm-skills-beautiful/'
      },
      {
        text: '设计原型到项目代码',
        link: '/zh-cn/stage-2/frontend/design-to-code/'
      },
      {
        text: '现代组件库与界面升级',
        link: '/zh-cn/stage-2/frontend/modern-component-library/'
      }
    ]
  },
  {
    text: '后端开发',
    collapsed: false,
    items: [
      {
        text: '数据库与 Supabase 入门',
        link: '/zh-cn/stage-2/backend/database-supabase/'
      },
      {
        text: '大模型辅助接口开发',
        link: '/zh-cn/stage-2/backend/ai-interface-code/'
      },
      {
        text: 'Git 与 GitHub 入门指南',
        link: '/zh-cn/stage-2/backend/git-workflow/'
      },
      {
        text: '网页应用部署全面指南',
        link: '/zh-cn/stage-2/backend/zeabur-deployment/'
      },
      {
        text: 'CLI Coding Agent 编程助手',
        link: '/zh-cn/stage-2/backend/modern-cli/'
      },
      {
        text: 'Stripe 支付集成',
        link: '/zh-cn/stage-2/backend/stripe-payment/'
      }
    ]
  },
  {
    text: 'AI 能力附录',
    collapsed: false,
    items: [
      {
        text: 'Dify 入门与知识库集成',
        link: '/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/'
      }
    ]
  },
  {
    text: '综合项目',
    collapsed: false,
    items: [
      {
        text: '一起做霍格沃茨画像',
        link: '/zh-cn/stage-2/frontend/hogwarts-portraits/'
      },
      {
        text: 'AI 营销文案 SaaS',
        link: '/zh-cn/stage-2/assignments/copywriting-platform-supabase/'
      },
      {
        text: '在线考试与管理系统',
        link: '/zh-cn/stage-2/assignments/exam-management-express/'
      },
      {
        text: '现代 AI 生图 SaaS',
        link: '/zh-cn/stage-2/assignments/modern-landing-page/'
      },
      {
        text: '类 Dify 智能体平台',
        link: '/zh-cn/stage-2/assignments/custom-dify-agent-platform/'
      },
      {
        text: '智能旅游规划 Agent 平台',
        link: '/zh-cn/stage-2/assignments/travel-planning-agent-platform/'
      },
      {
        text: 'Spring Boot 电影推荐系统',
        link: '/zh-cn/stage-2/assignments/movie-recommendation-springboot/'
      },
      {
        text: '生鲜电商微服务系统',
        link: '/zh-cn/stage-2/assignments/simple-grocery-microservices/'
      },
      {
        text: 'Go 交通数据分析平台',
        link: '/zh-cn/stage-2/assignments/traffic-data-visualization-go/'
      }
    ]
  }
]

const stage3SidebarEn = [
  {
    text: 'Core Skills',
    collapsed: false,
    items: [
      {
        text: 'Claude Code Quickstart Core Guide',
        link: '/en/stage-3/core-skills/basics/'
      },
      {
        text: 'MCP and Claude Code Complete Guide',
        link: '/en/stage-3/core-skills/mcp/'
      },
      {
        text: 'Claude Code Skills Complete Guide',
        link: '/en/stage-3/core-skills/skills/'
      },
      {
        text: 'Making Claude Code Work on Long-Running Tasks',
        link: '/en/stage-3/core-skills/long-running-tasks/'
      },
      {
        text: 'Claude Agent Teams Complete Guide',
        link: '/en/stage-3/core-skills/agent-teams/'
      },
      {
        text: 'Claude Code Superpowers for Production-Grade Development',
        link: '/en/stage-3/core-skills/superpowers/'
      },
      {
        text: 'AI-Assisted Development Workflow',
        link: '/en/stage-3/core-skills/workflow/'
      },
      {
        text: 'Claude Code Remote Development on Mobile',
        link: '/en/stage-3/core-skills/mobile-development/'
      },
      {
        text: 'Claude Agent SDK Complete Guide',
        link: '/en/stage-3/core-skills/claude-agent-sdk/'
      },
      {
        text: 'From Vibe Coding to Spec Coding',
        link: '/en/stage-3/core-skills/spec-coding/'
      }
    ]
  },
  {
    text: 'Cross-Platform Development',
    collapsed: false,
    items: [
      {
        text: 'How to Choose the Right Platform for Your App',
        link: '/en/stage-3/cross-platform/choose-platform/'
      },
      {
        text: 'How to Build a Simple WeChat Mini Program',
        link: '/en/stage-3/cross-platform/wechat-miniprogram/'
      },
      {
        text: 'How to Build a WeChat Mini Program with a Backend',
        link: '/en/stage-3/cross-platform/wechat-miniprogram-backend/'
      },
      {
        text: 'How to Build an Android App with Jetpack Compose',
        link: '/en/stage-3/cross-platform/android-app/'
      },
      {
        text: 'How to Build an iOS App with SwiftUI',
        link: '/en/stage-3/cross-platform/ios-app/'
      },
      {
        text: 'How to Build a PWA Local App',
        link: '/en/stage-3/cross-platform/pwa-local-app/'
      },
      {
        text: 'How to Build a Browser AI Assistant Extension',
        link: '/en/stage-3/cross-platform/browser-ai-extension/'
      },
      {
        text: 'How to Build a Cross-Platform Electron Desktop App',
        link: '/en/stage-3/cross-platform/electron-voice-to-text/'
      },
      {
        text: 'How to Quickly Build and Mint an NFT',
        link: '/en/stage-3/cross-platform/nft-minting/'
      },
      {
        text: 'How to Build a VS Code Extension',
        link: '/en/stage-3/cross-platform/vscode-extension/'
      },
      {
        text: 'How to Build an Industrial Qt Desktop App',
        link: '/en/stage-3/cross-platform/qt-industrial-hmi/'
      },
      {
        text: 'How to Build Your Personal Website and Academic Blog',
        link: '/en/stage-3/personal-brand/personal-website-blog/'
      }
    ]
  },
  {
    text: 'AI Advanced',
    collapsed: false,
    items: [
      {
        text: 'What Is RAG and How It Works',
        link: '/en/stage-3/ai-advanced/rag-introduction/'
      },
      {
        text: 'Advanced RAG and Workflow Orchestration with LangGraph',
        link: '/en/stage-3/ai-advanced/langgraph-advanced-rag/'
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
      }
    ]
  },
  {
    text: 'II. Tools & Environment',
    collapsed: false,
    items: [
      {
        text: 'IDE Basics',
        link: '/en/appendix/2-development-tools/ide-basics'
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
        link: '/zh-cn/appendix/2-development-tools/debugging-art'
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
      { text: '学习地图', link: '/zh-cn/stage-1/learning-map/' },
      {
        text: 'AI 时代，会说话就会编程',
        link: '/zh-cn/stage-1/ai-capabilities-through-games/'
      }
    ]
  },
  {
    text: '产品原型实战',
    collapsed: false,
    items: [
      {
        text: '学会 AI 编程工具',
        link: '/zh-cn/stage-1/introduction-to-ai-ide/'
      },
      {
        text: '找到好点子',
        link: '/zh-cn/stage-1/finding-great-idea/'
      },
      {
        text: '搭建产品原型',
        link: '/zh-cn/stage-1/building-prototype/'
      },
      {
        text: '接入 AI 能力',
        link: '/zh-cn/stage-1/integrating-ai-capabilities/'
      },
      {
        text: '完整项目实战',
        link: '/zh-cn/stage-1/complete-project-practice/'
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
    text: '附录：用户研究与需求验证',
    collapsed: false,
    items: [
      {
        text: '从哪里找点子：3 种最适合新手的参考来源',
        link: '/zh-cn/stage-1/appendix-idea-sources/'
      },
      {
        text: '双钻模型：先做对的事，再把事做对',
        link: '/zh-cn/stage-1/appendix-double-diamond/'
      },
      {
        text: '用 Jobs to Be Done 找到用户真正想完成的事',
        link: '/zh-cn/stage-1/appendix-jobs-to-be-done/'
      },
      {
        text: 'The Mom Test 用户访谈法',
        link: '/zh-cn/stage-1/appendix-mom-test/'
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

const LOCALIZED_PATH_PREFIX_RE =
  /^\/(?:zh-cn|en|zh-tw|ja-jp|ko-kr|es-es|fr-fr|de-de|ar-sa|vi-vn)\//

const appendixGroupLabels = {
  en: [
    'I. Computer Fundamentals',
    'II. Tools & Environment',
    'III. Browser & Frontend',
    'IV. Server & Backend',
    'V. Data',
    'VI. Architecture',
    'VII. Infrastructure',
    'VIII. Artificial Intelligence',
    'IX. Engineering Excellence'
  ],
  'ja-jp': [
    'I. コンピュータ基礎',
    'II. ツールと環境',
    'III. ブラウザとフロントエンド',
    'IV. サーバーとバックエンド',
    'V. データ',
    'VI. アーキテクチャ',
    'VII. インフラ',
    'VIII. 人工知能',
    'IX. エンジニアリング品質'
  ],
  'zh-tw': [
    'I. 計算機基礎',
    'II. 工具與環境',
    'III. 瀏覽器與前端',
    'IV. 伺服器與後端',
    'V. 資料',
    'VI. 架構',
    'VII. 基礎設施',
    'VIII. 人工智慧',
    'IX. 工程品質'
  ],
  'ko-kr': [
    'I. 컴퓨터 기초',
    'II. 도구와 환경',
    'III. 브라우저와 프론트엔드',
    'IV. 서버와 백엔드',
    'V. 데이터',
    'VI. 아키텍처',
    'VII. 인프라',
    'VIII. 인공지능',
    'IX. 엔지니어링 품질'
  ],
  'es-es': [
    'I. Fundamentos de Computación',
    'II. Herramientas y Entorno',
    'III. Navegador y Frontend',
    'IV. Servidor y Backend',
    'V. Datos',
    'VI. Arquitectura',
    'VII. Infraestructura',
    'VIII. Inteligencia Artificial',
    'IX. Excelencia de Ingeniería'
  ],
  'fr-fr': [
    'I. Fondamentaux Informatique',
    'II. Outils et Environnement',
    'III. Navigateur et Frontend',
    'IV. Serveur et Backend',
    'V. Données',
    'VI. Architecture',
    'VII. Infrastructure',
    'VIII. Intelligence Artificielle',
    "IX. Excellence d'Ingénierie"
  ],
  'de-de': [
    'I. Computergrundlagen',
    'II. Werkzeuge und Umgebung',
    'III. Browser und Frontend',
    'IV. Server und Backend',
    'V. Daten',
    'VI. Architektur',
    'VII. Infrastruktur',
    'VIII. Künstliche Intelligenz',
    'IX. Engineering-Qualität'
  ],
  'ar-sa': [
    'I. أساسيات الحاسوب',
    'II. الأدوات والبيئة',
    'III. المتصفح والواجهة الأمامية',
    'IV. الخادم والواجهة الخلفية',
    'V. البيانات',
    'VI. المعمارية',
    'VII. البنية التحتية',
    'VIII. الذكاء الاصطناعي',
    'IX. جودة الهندسة'
  ],
  'vi-vn': [
    'I. Nền tảng Máy tính',
    'II. Công cụ và Môi trường',
    'III. Trinh duyet va Frontend',
    'IV. Máy chủ và Backend',
    'V. Dữ liệu',
    'VI. Kiến trúc',
    'VII. Hạ tầng',
    'VIII. Trí tuệ Nhân tạo',
    'IX. Chất lượng Kỹ thuật'
  ]
}

const markdownTitleCache = new Map()

const getMarkdownTitleForLink = (link) => {
  const cleanLink = link.split(/[?#]/)[0].replace(/\/$/, '')
  if (!cleanLink) return null
  if (markdownTitleCache.has(cleanLink))
    return markdownTitleCache.get(cleanLink)

  const relativePath = cleanLink.replace(/^\//, '')
  const candidates = [
    new URL(`../${relativePath}.md`, import.meta.url),
    new URL(`../${relativePath}/index.md`, import.meta.url)
  ]

  for (const fileUrl of candidates) {
    if (!fs.existsSync(fileUrl)) continue
    const match = fs.readFileSync(fileUrl, 'utf8').match(/^#\s+(.+?)\s*$/m)
    if (match) {
      const title = match[1].trim()
      markdownTitleCache.set(cleanLink, title)
      return title
    }
  }

  markdownTitleCache.set(cleanLink, null)
  return null
}

const localizeSidebarItemLinks = (items, locale) =>
  items.map((item) => ({
    ...item,
    link: item.link
      ? item.link.replace(LOCALIZED_PATH_PREFIX_RE, `/${locale}/`)
      : item.link,
    items: item.items
      ? localizeSidebarItemLinks(item.items, locale)
      : item.items
  }))

const localizeSidebarLinks = (sidebar, locale) =>
  sidebar.map((group) => ({
    ...group,
    link: group.link
      ? group.link.replace(LOCALIZED_PATH_PREFIX_RE, `/${locale}/`)
      : group.link,
    items: group.items
      ? localizeSidebarItemLinks(group.items, locale)
      : group.items
  }))

const localizeAppendixSidebarItem = (item, locale) => {
  const link = item.link
    ? item.link.replace(LOCALIZED_PATH_PREFIX_RE, `/${locale}/`)
    : item.link

  return {
    ...item,
    link,
    text: link ? getMarkdownTitleForLink(link) || item.text : item.text,
    items: item.items
      ? item.items.map((child) => localizeAppendixSidebarItem(child, locale))
      : item.items
  }
}

const localizeAppendixSidebar = (sidebar, locale) =>
  sidebar.map((group, index) => ({
    ...group,
    text: appendixGroupLabels[locale]?.[index] || group.text,
    link: group.link
      ? group.link.replace(LOCALIZED_PATH_PREFIX_RE, `/${locale}/`)
      : group.link,
    items: group.items
      ? group.items.map((item) => localizeAppendixSidebarItem(item, locale))
      : group.items
  }))

const stage1SidebarLabels = {
  'ja-jp': [
    {
      text: 'はじめに',
      items: ['学習ロードマップ', 'AI時代、話せればプログラミングできる']
    },
    {
      text: 'プロダクトプロトタイプ実践',
      items: [
        'AIプログラミングツールを学ぶ',
        '良いアイデアを見つける',
        'プロトタイプを作る',
        'AI能力を統合する',
        '完全プロジェクト実践'
      ]
    },
    {
      text: '付録：ビジネス思考',
      items: [
        'プロダクト思考とソリューション設計',
        'AI業界応用シナリオ参考（B向け）',
        'AI消費者シナリオの着想参考（C向け）'
      ]
    },
    {
      text: '付録：ユーザー調査と需要検証',
      items: [
        'アイデアの見つけ方：初心者向けの3つの参考ソース',
        'Double Diamond：正しいことを先に、次に正しく行う',
        'Jobs to Be Doneでユーザーの本当の目的を見つける',
        'The Mom Test：需要を検証するユーザーインタビュー法'
      ]
    },
    {
      text: '付録：技術的な解決策',
      items: [
        'コードでエラーが出たらどうするか',
        '7つのAIプログラミングツール比較',
        'デザインAgentとコーディングAgentでWebサイトを作る'
      ]
    }
  ],
  'zh-tw': [
    {
      text: '新手入門',
      items: ['學習地圖', 'AI 時代，會說話就會程式設計']
    },
    {
      text: '產品原型實戰',
      items: [
        '學會 AI 程式設計工具',
        '找到好點子',
        '搭建產品原型',
        '接入 AI 能力',
        '完整專案實戰'
      ]
    },
    {
      text: '附錄：業務思維',
      items: [
        '產品思維與方案設計',
        'AI 產業應用場景參考（B 端）',
        'AI 消費場景靈感參考（C 端）'
      ]
    },
    {
      text: '附錄：使用者研究與需求驗證',
      items: [
        '從哪裡找點子：3 種最適合新手的參考來源',
        '雙鑽模型：先做對的事，再把事做對',
        '用 Jobs to Be Done 找到使用者真正想完成的事',
        'The Mom Test 使用者訪談法'
      ]
    },
    {
      text: '附錄：技術方案',
      items: [
        '寫程式碼時遇到錯誤怎麼辦',
        '七款 AI 程式設計工具對比',
        '用設計和程式設計 Agent 設計網站'
      ]
    }
  ],
  'es-es': [
    {
      text: 'Primeros pasos',
      items: ['Ruta de aprendizaje', 'En la era de la IA, hablar es programar']
    },
    {
      text: 'Práctica de prototipos de producto',
      items: [
        'Aprender herramientas de programación con IA',
        'Encontrar buenas ideas',
        'Construir un prototipo',
        'Integrar capacidades de IA',
        'Práctica de proyecto completo'
      ]
    },
    {
      text: 'Apéndice: pensamiento de negocio',
      items: [
        'Pensamiento de producto y diseño de soluciones',
        'Escenarios de aplicación industrial de IA (B2B)',
        'Inspiración para escenarios de consumo con IA (B2C)'
      ]
    },
    {
      text: 'Apéndice: investigación de usuarios y validación',
      items: [
        'Dónde encontrar ideas: 3 fuentes para principiantes',
        'Double Diamond: primero lo correcto, luego hacerlo bien',
        'Jobs to Be Done para descubrir lo que el usuario quiere lograr',
        'The Mom Test: entrevistas para validar demanda'
      ]
    },
    {
      text: 'Apéndice: soluciones técnicas',
      items: [
        'Qué hacer si aparecen errores al programar',
        'Comparación de siete herramientas de programación con IA',
        'Diseñar sitios web con agentes de diseño y programación'
      ]
    }
  ],
  'fr-fr': [
    {
      text: 'Bien démarrer',
      items: [
        "Parcours d'apprentissage",
        "À l'ère de l'IA, savoir parler, c'est savoir programmer"
      ]
    },
    {
      text: 'Pratique de prototype produit',
      items: [
        'Apprendre les outils de programmation IA',
        'Trouver une bonne idée',
        'Créer un prototype produit',
        'Intégrer des capacités IA',
        'Projet complet en conditions réelles'
      ]
    },
    {
      text: 'Annexe : pensée métier',
      items: [
        'Pensée produit et conception de solutions',
        "Scénarios d'application IA en entreprise (B2B)",
        "Inspirations de scénarios consommateurs avec l'IA (B2C)"
      ]
    },
    {
      text: 'Annexe : recherche utilisateur et validation',
      items: [
        'Où trouver des idées : 3 sources pour débutants',
        "Double Diamond : faire d'abord la bonne chose, puis bien la faire",
        'Jobs to Be Done pour trouver ce que les utilisateurs veulent accomplir',
        'The Mom Test : entretiens utilisateur pour valider la demande'
      ]
    },
    {
      text: 'Annexe : solutions techniques',
      items: [
        "Que faire en cas d'erreur de code",
        'Comparaison de sept outils de programmation IA',
        'Concevoir un site avec des agents de design et de programmation'
      ]
    }
  ],
  'de-de': [
    {
      text: 'Einstieg',
      items: ['Lernpfad', 'Im KI-Zeitalter reicht Reden zum Programmieren']
    },
    {
      text: 'Produktprototyp-Praxis',
      items: [
        'KI-Programmierwerkzeuge lernen',
        'Gute Ideen finden',
        'Produktprototyp erstellen',
        'KI-Fähigkeiten integrieren',
        'Vollständiges Projektpraktikum'
      ]
    },
    {
      text: 'Anhang: Geschäftsdenken',
      items: [
        'Produktdenken und Lösungsentwurf',
        'KI-Anwendungsszenarien in Branchen (B2B)',
        'Inspiration für KI-Konsumszenarien (B2C)'
      ]
    },
    {
      text: 'Anhang: Nutzerforschung und Validierung',
      items: [
        'Wo findet man Ideen: 3 Quellen für Einsteiger',
        'Double Diamond: Erst das Richtige tun, dann richtig tun',
        'Mit Jobs to Be Done erkennen, was Nutzer wirklich erreichen wollen',
        'The Mom Test: Nutzerinterviews zur Nachfragevalidierung'
      ]
    },
    {
      text: 'Anhang: technische Lösungen',
      items: [
        'Was tun bei Fehlern im Code',
        'Vergleich von sieben KI-Programmierwerkzeugen',
        'Websites mit Design- und Programmier-Agenten entwerfen'
      ]
    }
  ],
  'ar-sa': [
    {
      text: 'البدء',
      items: [
        'خريطة التعلم',
        'في عصر الذكاء الاصطناعي، من يستطيع التحدث يستطيع البرمجة'
      ]
    },
    {
      text: 'تطبيق نموذج المنتج الأولي',
      items: [
        'تعلم أدوات البرمجة بالذكاء الاصطناعي',
        'إيجاد فكرة جيدة',
        'بناء نموذج أولي للمنتج',
        'دمج قدرات الذكاء الاصطناعي',
        'مشروع عملي كامل'
      ]
    },
    {
      text: 'ملحق: التفكير التجاري',
      items: [
        'التفكير المنتجي وتصميم الحلول',
        'سيناريوهات تطبيق الذكاء الاصطناعي في الصناعة (B2B)',
        'إلهام سيناريوهات المستهلك بالذكاء الاصطناعي (B2C)'
      ]
    },
    {
      text: 'ملحق: بحث المستخدم والتحقق من الطلب',
      items: [
        'من أين تجد الأفكار: 3 مصادر مناسبة للمبتدئين',
        'نموذج الماس المزدوج: افعل الشيء الصحيح أولاً ثم افعله بشكل صحيح',
        'استخدم Jobs to Be Done لمعرفة ما يريد المستخدم إنجازه',
        'The Mom Test: مقابلات المستخدم للتحقق من الطلب'
      ]
    },
    {
      text: 'ملحق: حلول تقنية',
      items: [
        'ماذا تفعل عند ظهور أخطاء في الكود',
        'مقارنة سبع أدوات برمجة بالذكاء الاصطناعي',
        'تصميم المواقع باستخدام وكلاء التصميم والبرمجة'
      ]
    }
  ],
  'vi-vn': [
    {
      text: 'Nhập môn',
      items: ['Lộ trình học tập', 'Thời đại AI, biết nói là biết lập trình']
    },
    {
      text: 'Thực hành nguyên mẫu sản phẩm',
      items: [
        'Học công cụ lập trình AI',
        'Tìm ý tưởng tốt',
        'Xây dựng nguyên mẫu sản phẩm',
        'Tích hợp năng lực AI',
        'Thực chiến dự án hoàn chỉnh'
      ]
    },
    {
      text: 'Phụ lục: tư duy kinh doanh',
      items: [
        'Tư duy sản phẩm và thiết kế giải pháp',
        'Tham khảo kịch bản ứng dụng AI trong ngành (B2B)',
        'Gợi ý kịch bản tiêu dùng với AI (B2C)'
      ]
    },
    {
      text: 'Phụ lục: nghiên cứu người dùng và xác thực nhu cầu',
      items: [
        'Tìm ý tưởng ở đâu: 3 nguồn phù hợp cho người mới',
        'Double Diamond: làm đúng việc trước, rồi làm đúng cách',
        'Dùng Jobs to Be Done để tìm điều người dùng thật sự muốn hoàn thành',
        'The Mom Test: phỏng vấn người dùng để xác thực nhu cầu'
      ]
    },
    {
      text: 'Phụ lục: giải pháp kỹ thuật',
      items: [
        'Làm gì khi gặp lỗi trong code',
        'So sánh bảy công cụ lập trình AI',
        'Thiết kế website bằng agent thiết kế và agent lập trình'
      ]
    }
  ]
}

const applySidebarLabels = (
  sidebar,
  locale,
  labelsSource = stage1SidebarLabels
) => {
  const labels = labelsSource[locale]
  if (!labels) return sidebar

  return sidebar.map((group, groupIndex) => ({
    ...group,
    text: labels[groupIndex]?.text ?? group.text,
    items: group.items.map((item, itemIndex) => ({
      ...item,
      text: labels[groupIndex]?.items[itemIndex] ?? item.text
    }))
  }))
}

const getStage1Sidebar = (locale) => {
  if (locale === 'zh-cn') return productManagerSidebar
  if (locale === 'en') return productManagerSidebarEn
  if (locale === 'ko-kr') return productManagerSidebarKo
  return applySidebarLabels(
    localizeSidebarLinks(productManagerSidebarEn, locale),
    locale
  )
}

const stage2SidebarLabels = {
  'ja-jp': [
    {
      text: 'フロントエンド開発',
      items: [
        'NanoBanana 素材生産',
        'Figma & MasterGo 入門',
        'UI デザイン仕様とマルチプロダクトUI',
        'Agent Skills でインターフェース美化',
        'デザインプロトタイプからプロジェクトコードへ',
        'モダンコンポーネントライブラリとUIアップグレード'
      ]
    },
    {
      text: 'バックエンド開発',
      items: [
        'データベースと Supabase 入門',
        '大規模モデル補助インターフェース開発',
        'Git & GitHub 入門ガイド',
        'Webアプリケーションデプロイ包括ガイド',
        'CLI Coding Agent プログラミングアシスタント',
        'Stripe 決済統合'
      ]
    },
    {
      text: 'AI 能力付録',
      items: ['Dify 入門とナレッジベース統合']
    },
    {
      text: '総合プロジェクト',
      items: [
        'ホグワーツ肖像画を作ろう',
        'AI マーケティングコピー SaaS',
        'オンライン試験・管理システム',
        'モダン AI 画像生成 SaaS',
        'Dify ライクなエージェントプラットフォーム',
        'スマート旅行プランニング Agent プラットフォーム',
        'Spring Boot 映画推薦システム',
        '生鮮ECマイクロサービスシステム',
        'Go 交通データ分析プラットフォーム'
      ]
    }
  ],
  'zh-tw': [
    {
      text: '前端開發',
      items: [
        'NanoBanana 素材生產',
        'Figma 與 MasterGo 入門',
        'UI 設計規範與多產品介面',
        '結合 Agent Skills 美化介面',
        '設計原型到專案程式碼',
        '現代元件庫與介面升級'
      ]
    },
    {
      text: '後端開發',
      items: [
        '資料庫與 Supabase 入門',
        '大模型輔助介面開發',
        'Git 與 GitHub 入門指南',
        '網頁應用部署全面指南',
        'CLI Coding Agent 程式設計助手',
        'Stripe 支付整合'
      ]
    },
    {
      text: 'AI 能力附錄',
      items: ['Dify 入門與知識庫整合']
    },
    {
      text: '綜合專案',
      items: [
        '一起做霍格沃茨畫像',
        'AI 行銷文案 SaaS',
        '線上考試與管理系統',
        '現代 AI 生圖 SaaS',
        '類 Dify 智能體平台',
        '智慧旅遊規劃 Agent 平台',
        'Spring Boot 電影推薦系統',
        '生鮮電商微服務系統',
        'Go 交通資料分析平台'
      ]
    }
  ],
  'ko-kr': [
    {
      text: '프론트엔드 개발',
      items: [
        'NanoBanana 에셋 생산',
        'Figma & MasterGo 입문',
        'UI 디자인 가이드라인과 멀티 프로덕트 UI',
        'Agent Skills 인터페이스 미화',
        '디자인 프로토타입에서 프로젝트 코드로',
        '모던 컴포넌트 라이브러리와 UI 업그레이드'
      ]
    },
    {
      text: '백엔드 개발',
      items: [
        '데이터베이스와 Supabase 입문',
        '대규모 모델 보조 인터페이스 개발',
        'Git & GitHub 입문 가이드',
        '웹 애플리케이션 배포 종합 가이드',
        'CLI Coding Agent 프로그래밍 어시스턴트',
        'Stripe 결제 통합'
      ]
    },
    {
      text: 'AI 역량 부록',
      items: ['Dify 입문과 지식 베이스 통합']
    },
    {
      text: '종합 프로젝트',
      items: [
        '호그와트 초상화 만들기',
        'AI 마케팅 카피 SaaS',
        '온라인 시험 및 관리 시스템',
        '모던 AI 이미지 생성 SaaS',
        'Dify 유사 에이전트 플랫폼',
        '스마트 여행 계획 Agent 플랫폼',
        'Spring Boot 영화 추천 시스템',
        '신선 식품 전자상거래 마이크로서비스',
        'Go 교통 데이터 분석 플랫폼'
      ]
    }
  ],
  'es-es': [
    {
      text: 'Desarrollo Frontend',
      items: [
        'Producción de activos NanoBanana',
        'Introducción a Figma y MasterGo',
        'Especificaciones de diseño UI y multi-producto',
        'Embellecimiento de interfaces con Agent Skills',
        'De prototipo de diseño a código de proyecto',
        'Bibliotecas de componentes modernas'
      ]
    },
    {
      text: 'Desarrollo Backend',
      items: [
        'Introducción a bases de datos y Supabase',
        'Desarrollo de interfaces asistido por LLM',
        'Guía de introducción a Git y GitHub',
        'Guía completa de despliegue de aplicaciones web',
        'CLI Coding Agent - Asistente de programación',
        'Integración de pagos con Stripe'
      ]
    },
    {
      text: 'Apéndice de capacidades IA',
      items: ['Introducción a Dify e integración de base de conocimientos']
    },
    {
      text: 'Proyectos integrales',
      items: [
        'Creemos retratos de Hogwarts',
        'SaaS de copywriting con IA',
        'Sistema de exámenes en línea y gestión',
        'SaaS moderno de generación de imágenes con IA',
        'Plataforma de agentes tipo Dify',
        'Plataforma de planificación de viajes con Agent',
        'Sistema de recomendación de películas con Spring Boot',
        'Sistema de microservicios de comercio electrónico de alimentos',
        'Plataforma de análisis de datos de tráfico con Go'
      ]
    }
  ],
  'fr-fr': [
    {
      text: 'Développement Frontend',
      items: [
        'Production de ressources NanoBanana',
        'Introduction à Figma et MasterGo',
        'Spécifications UI et interfaces multi-produits',
        'Embellissement des interfaces avec Agent Skills',
        'Du prototype de design au code de projet',
        'Bibliothèques de composants modernes'
      ]
    },
    {
      text: 'Développement Backend',
      items: [
        'Introduction aux bases de données et Supabase',
        "Développement d'interfaces assisté par LLM",
        "Guide d'introduction à Git et GitHub",
        "Guide complet de déploiement d'applications web",
        'CLI Coding Agent - Assistant de programmation',
        'Intégration de paiements avec Stripe'
      ]
    },
    {
      text: 'Annexe des capacités IA',
      items: ['Introduction à Dify et intégration de base de connaissances']
    },
    {
      text: 'Projets globaux',
      items: [
        'Créons des portraits de Poudlard',
        'SaaS de rédaction IA',
        "Système d'examens en ligne et de gestion",
        "SaaS moderne de génération d'images IA",
        "Plateforme d'agents de type Dify",
        'Plateforme de planification de voyages avec Agent',
        'Système de recommandation de films avec Spring Boot',
        'Système de microservices e-commerce alimentaire',
        "Plateforme d'analyse de données de trafic avec Go"
      ]
    }
  ],
  'de-de': [
    {
      text: 'Frontend-Entwicklung',
      items: [
        'NanoBanana Asset-Produktion',
        'Einführung in Figma und MasterGo',
        'UI-Design-Spezifikationen und Multi-Produkt-UI',
        'Interface-Verschönerung mit Agent Skills',
        'Vom Design-Prototyp zum Projektcode',
        'Moderne Komponentenbibliotheken und UI-Upgrade'
      ]
    },
    {
      text: 'Backend-Entwicklung',
      items: [
        'Einführung in Datenbanken und Supabase',
        'LLM-gestützte Schnittstellenentwicklung',
        'Git und GitHub Einführungsleitfaden',
        'Umfassender Leitfaden zur Webanwendungsbereitstellung',
        'CLI Coding Agent Programmierassistent',
        'Stripe-Zahlungsintegration'
      ]
    },
    {
      text: 'KI-Fähigkeiten Anhang',
      items: ['Dify Einführung und Wissensdatenbank-Integration']
    },
    {
      text: 'Übergreifende Projekte',
      items: [
        'Erstellen wir Hogwarts-Porträts',
        'KI-Copywriting SaaS',
        'Online-Prüfung und Managementsystem',
        'Modernes KI-Bildgenerierungs-SaaS',
        'Dify-ähnliche Agenten-Plattform',
        'Intelligente Reiseplanungs-Agent-Plattform',
        'Spring Boot Filmempfehlungssystem',
        'Lebensmittel-E-Commerce-Microservices',
        'Go Verkehrsanalyseplattform'
      ]
    }
  ],
  'ar-sa': [
    {
      text: 'تطوير الواجهة الأمامية',
      items: [
        'إنتاج أصول NanoBanana',
        'مقدمة في Figma و MasterGo',
        'مواصفات تصميم UI وواجهات متعددة المنتجات',
        'تحسين الواجهات باستخدام Agent Skills',
        'من النموذج الأولي إلى كود المشروع',
        'مكتبات المكونات الحديثة وترقية الواجهة'
      ]
    },
    {
      text: 'تطوير الواجهة الخلفية',
      items: [
        'مقدمة في قواعد البيانات و Supabase',
        'تطوير الواجهات بمساعدة النماذج الكبيرة',
        'دليل مقدمة في Git و GitHub',
        'دليل شامل لنشر تطبيقات الويب',
        'مساعد برمجة CLI Coding Agent',
        'تكامل مدفوعات Stripe'
      ]
    },
    {
      text: 'ملحق قدرات الذكاء الاصطناعي',
      items: ['مقدمة في Dify وتكامل قاعدة المعرفة']
    },
    {
      text: 'مشاريع شاملة',
      items: [
        'لنصنع صور هوغوورتس',
        'SaaS كتابة التسويق بالذكاء الاصطناعي',
        'نظام الامتحانات عبر الإنترنت والإدارة',
        'SaaS حديث لتوليد الصور بالذكاء الاصطناعي',
        'منصة وكلاء شبيهة بـ Dify',
        'منصة تخطيط السفر الذكي مع Agent',
        'نظام توصية الأفلام بـ Spring Boot',
        'نظام الخدمات المصغرة للتجارة الإلكترونية للأغذية',
        'منصة تحليل بيانات المرور بـ Go'
      ]
    }
  ],
  'vi-vn': [
    {
      text: 'Phát triển Frontend',
      items: [
        'Sản xuất tài sản NanoBanana',
        'Giới thiệu Figma và MasterGo',
        'Quy cách thiết kế UI và đa sản phẩm',
        'Làm đẹp giao diện với Agent Skills',
        'Từ nguyên mẫu thiết kế đến mã dự án',
        'Thư viện thành phần hiện đại và nâng cấp UI'
      ]
    },
    {
      text: 'Phát triển Backend',
      items: [
        'Giới thiệu cơ sở dữ liệu và Supabase',
        'Phát triển giao diện hỗ trợ bằng mô hình lớn',
        'Hướng dẫn入门 Git và GitHub',
        'Hướng dẫn toàn diện triển khai ứng dụng web',
        'Trợ lý lập trình CLI Coding Agent',
        'Tích hợp thanh toán Stripe'
      ]
    },
    {
      text: 'Phụ lục năng lực AI',
      items: ['Giới thiệu Dify và tích hợp cơ sở tri thức']
    },
    {
      text: 'Dự án tổng hợp',
      items: [
        'Cùng làm chân dung Hogwarts',
        'SaaS viết文案 AI',
        'Hệ thống thi trực tuyến và quản lý',
        'SaaS tạo ảnh AI hiện đại',
        'Nền tảng Agent giống Dify',
        'Nền tảng Agent lập kế hoạch du lịch thông minh',
        'Hệ thống gợi ý phim Spring Boot',
        'Hệ thống microservice thương mại điện tử thực phẩm',
        'Nền tảng phân tích dữ liệu giao thông Go'
      ]
    }
  ]
}

const getStage2Sidebar = (locale) => {
  if (locale === 'zh-cn') return zhCnStage2Sidebar
  if (locale === 'en') return stage2SidebarEn
  return applySidebarLabels(
    localizeSidebarLinks(stage2SidebarEn, locale),
    locale,
    stage2SidebarLabels
  )
}

const zhCnStage3Sidebar = [
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
        text: '如何选择你的应用该开发的平台',
        link: '/zh-cn/stage-3/cross-platform/choose-platform/'
      },
      {
        text: '如何构建微信小程序',
        link: '/zh-cn/stage-3/cross-platform/wechat-miniprogram/'
      },
      {
        text: '如何构建微信小程序（包含后端）',
        link: '/zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/'
      },
      {
        text: '如何构建安卓程序-compose 原生开发',
        link: '/zh-cn/stage-3/cross-platform/android-app/'
      },
      {
        text: '如何构建 iOS 程序-swiftUI原生开发',
        link: '/zh-cn/stage-3/cross-platform/ios-app/'
      },
      {
        text: '如何开发 PWA 本地应用',
        link: '/zh-cn/stage-3/cross-platform/pwa-local-app/'
      },
      {
        text: '如何开发浏览器 AI 助手插件',
        link: '/zh-cn/stage-3/cross-platform/browser-ai-extension/'
      },
      {
        text: '如何开发跨平台 Electron 桌面程序',
        link: '/zh-cn/stage-3/cross-platform/electron-voice-to-text/'
      },
      {
        text: '如何快速开发并铸造 NFT',
        link: '/zh-cn/stage-3/cross-platform/nft-minting/'
      },
      {
        text: '如何开发 VS Code 插件',
        link: '/zh-cn/stage-3/cross-platform/vscode-extension/'
      },
      {
        text: '如何开发工业级 Qt 桌面应用',
        link: '/zh-cn/stage-3/cross-platform/qt-industrial-hmi/'
      },
      {
        text: '如何构建属于自己的个人网页与学术博客',
        link: '/zh-cn/stage-3/personal-brand/personal-website-blog/'
      }
    ]
  },
  {
    text: 'AI 能力强化',
    collapsed: false,
    items: [
      {
        text: '什么是 RAG 以及它如何工作',
        link: '/zh-cn/stage-3/ai-advanced/rag-introduction/'
      },
      {
        text: '中高级 RAG 与工作流编排 - 以 LangGraph 为例',
        link: '/zh-cn/stage-3/ai-advanced/langgraph-advanced-rag/'
      }
    ]
  }
]

const stage3SidebarLabels = {
  'ja-jp': [
    {
      text: 'Claude Code 深入解説',
      items: [
        'Claude Code クイックスタートガイド',
        'MCP と Claude Code 完全ガイド',
        'Claude Code Skills 完全ガイド',
        'Coding Tools を長時間稼働させる方法',
        'Claude Agent Teams 完全ガイド',
        'Claude Code Superpowers 実践開発',
        'Claude Code ワークフロー最佳实践',
        'Claude Code モバイルリモート開発',
        'Claude Agent SDK 完全ガイド',
        'Vibe Coding から Spec Coding へ'
      ]
    },
    {
      text: 'マルチプラットフォーム開発',
      items: [
        'アプリ開発プラットフォームの選び方',
        'WeChat ミニプログラムの構築',
        'WeChat ミニプログラム（バックエンド付き）',
        'Android アプリ開発（Jetpack Compose）',
        'iOS アプリ開発（SwiftUI）',
        'PWA ローカルアプリの開発',
        'ブラウザ AI アシスタント拡張機能の開発',
        'クロスプラットフォーム Electron デスクトップアプリ',
        'NFT の迅速開発とミント',
        'VS Code 拡張機能の開発',
        '産業用 Qt デスクトップアプリの開発',
        '個人ウェブサイトと学術ブログの構築'
      ]
    },
    {
      text: 'AI 能力強化',
      items: [
        'RAG とは何か、その仕組み',
        '中級・上級 RAG とワークフロー編成 - LangGraph を例に'
      ]
    }
  ],
  'zh-tw': [
    {
      text: 'Claude Code 深入淺出',
      items: [
        'Claude Code 快速上手核心指南',
        'Claude Code MCP 完全指南',
        'Claude Code Skills 完全指南',
        '如何讓 Coding Tools 長時間工作',
        'Claude Agent Teams 完全指南',
        'Claude Code Superpowers 工程級開發',
        'Claude Code 工作流最佳實踐',
        'Claude Code 手機遠端開發',
        'Claude Agent SDK 完全指南',
        '從 Vibe Coding 到 Spec Coding'
      ]
    },
    {
      text: '多平台開發',
      items: [
        '如何選擇應用開發平台',
        '如何構建微信小程式',
        '如何構建微信小程式（包含後端）',
        '如何構建安卓程式 - Compose 原生開發',
        '如何構建 iOS 程式 - SwiftUI 原生開發',
        '如何開發 PWA 本地應用',
        '如何開發瀏覽器 AI 助手插件',
        '如何開發跨平台 Electron 桌面程式',
        '如何快速開發並鑄造 NFT',
        '如何開發 VS Code 插件',
        '如何開發工業級 Qt 桌面應用',
        '如何構建個人網頁與學術部落格'
      ]
    },
    {
      text: 'AI 能力強化',
      items: [
        '什麼是 RAG 以及它如何工作',
        '中高級 RAG 與工作流編排 - 以 LangGraph 為例'
      ]
    }
  ],
  'ko-kr': [
    {
      text: 'Claude Code 심층 가이드',
      items: [
        'Claude Code 퀵스타트 핵심 가이드',
        'MCP와 Claude Code 완전 가이드',
        'Claude Code Skills 완전 가이드',
        'Coding Tools를 장시간 작동시키는 방법',
        'Claude Agent Teams 완전 가이드',
        'Claude Code Superpowers 엔지니어링 개발',
        'Claude Code 워크플로우 모범 사례',
        'Claude Code 모바일 원격 개발',
        'Claude Agent SDK 완전 가이드',
        'Vibe Coding에서 Spec Coding으로'
      ]
    },
    {
      text: '멀티플랫폼 개발',
      items: [
        '앱 개발 플랫폼 선택 방법',
        'WeChat 미니프로그램 구축',
        'WeChat 미니프로그램 (백엔드 포함)',
        'Android 앱 개발 (Jetpack Compose)',
        'iOS 앱 개발 (SwiftUI)',
        'PWA 로컬 앱 개발',
        '브라우저 AI 어시스턴트 확장 프로그램 개발',
        '크로스 플랫폼 Electron 데스크톱 앱',
        'NFT 빠른 개발 및 민팅',
        'VS Code 확장 프로그램 개발',
        '산업용 Qt 데스크톱 앱 개발',
        '개인 웹사이트 및 학술 블로그 구축'
      ]
    },
    {
      text: 'AI 역량 강화',
      items: [
        'RAG란 무엇이며 어떻게 작동하는가',
        '중고급 RAG와 워크플로우 오케스트레이션 - LangGraph 예제'
      ]
    }
  ],
  'es-es': [
    {
      text: 'Claude Code en Profundidad',
      items: [
        'Guía Core de Inicio Rápido de Claude Code',
        'Guía Completa de MCP y Claude Code',
        'Guía Completa de Claude Code Skills',
        'Cómo hacer que Coding Tools trabajen largas horas',
        'Guía Completa de Claude Agent Teams',
        'Claude Code Superpowers para Desarrollo de Producción',
        'Mejores Prácticas de Flujo de Trabajo con Claude Code',
        'Desarrollo Remoto Móvil con Claude Code',
        'Guía Completa de Claude Agent SDK',
        'De Vibe Coding a Spec Coding'
      ]
    },
    {
      text: 'Desarrollo Multiplataforma',
      items: [
        'Cómo elegir la plataforma para tu aplicación',
        'Cómo construir un Mini Programa de WeChat',
        'Cómo construir un Mini Programa de WeChat (con Backend)',
        'Cómo construir una app Android (Jetpack Compose)',
        'Cómo construir una app iOS (SwiftUI)',
        'Cómo desarrollar una aplicación PWA local',
        'Cómo desarrollar una extensión de navegador AI',
        'Cómo desarrollar una app de escritorio Electron',
        'Cómo desarrollar y acuñar NFTs rápidamente',
        'Cómo desarrollar una extensión de VS Code',
        'Cómo desarrollar una app Qt industrial',
        'Cómo construir tu sitio web personal y blog académico'
      ]
    },
    {
      text: 'IA Avanzada',
      items: [
        'Qué es RAG y cómo funciona',
        'RAG avanzado y orquestación de flujos con LangGraph'
      ]
    }
  ],
  'fr-fr': [
    {
      text: 'Claude Code en Profondeur',
      items: [
        'Guide Core de Démarrage Rapide Claude Code',
        'Guide Complet MCP et Claude Code',
        'Guide Complet Claude Code Skills',
        'Comment faire travailler les Coding Tools sur de longues périodes',
        'Guide Complet Claude Agent Teams',
        'Claude Code Superpowers pour le Développement Production',
        'Meilleures Pratiques de Workflow Claude Code',
        'Développement à Distance sur Mobile avec Claude Code',
        'Guide Complet Claude Agent SDK',
        'Du Vibe Coding au Spec Coding'
      ]
    },
    {
      text: 'Développement Multiplateforme',
      items: [
        'Comment choisir la plateforme pour votre application',
        'Comment construire un Mini Programme WeChat',
        'Comment construire un Mini Programme WeChat (avec Backend)',
        'Comment construire une app Android (Jetpack Compose)',
        'Comment construire une app iOS (SwiftUI)',
        'Comment développer une application PWA locale',
        'Comment développer une extension de navigateur AI',
        'Comment développer une app bureau Electron',
        'Comment développer et minter des NFTs rapidement',
        'Comment développer une extension VS Code',
        'Comment développer une app Qt industrielle',
        'Comment construire votre site personnel et blog académique'
      ]
    },
    {
      text: 'IA Avancée',
      items: [
        "Qu'est-ce que le RAG et comment ça fonctionne",
        'RAG avancé et orchestration de workflows avec LangGraph'
      ]
    }
  ],
  'de-de': [
    {
      text: 'Claude Code Vertieft',
      items: [
        'Claude Code Schnellstart-Kernleitfaden',
        'MCP und Claude Code Vollständiger Leitfaden',
        'Claude Code Skills Vollständiger Leitfaden',
        'Wie man Coding Tools über lange Zeiträume arbeiten lässt',
        'Claude Agent Teams Vollständiger Leitfaden',
        'Claude Code Superpowers für Produktionsentwicklung',
        'Claude Code Workflow Best Practices',
        'Claude Code Mobile Remote-Entwicklung',
        'Claude Agent SDK Vollständiger Leitfaden',
        'Vom Vibe Coding zum Spec Coding'
      ]
    },
    {
      text: 'Plattformübergreifende Entwicklung',
      items: [
        'Wie man die richtige Plattform für seine App wählt',
        'Wie man ein WeChat Mini-Programm erstellt',
        'Wie man ein WeChat Mini-Programm (mit Backend) erstellt',
        'Wie man eine Android-App erstellt (Jetpack Compose)',
        'Wie man eine iOS-App erstellt (SwiftUI)',
        'Wie man eine lokale PWA-App entwickelt',
        'Wie man eine Browser-KI-Assistenten-Erweiterung entwickelt',
        'Wie man eine plattformübergreifende Electron-Desktop-App entwickelt',
        'Wie man schnell NFTs entwickelt und mintet',
        'Wie man eine VS Code-Erweiterung entwickelt',
        'Wie man eine industrielle Qt-Desktop-App entwickelt',
        'Wie man eine persönliche Website und einen akademischen Blog erstellt'
      ]
    },
    {
      text: 'KI Fortgeschritten',
      items: [
        'Was ist RAG und wie funktioniert es',
        'Fortgeschrittenes RAG und Workflow-Orchestrierung mit LangGraph'
      ]
    }
  ],
  'ar-sa': [
    {
      text: 'Claude Code بعمق',
      items: [
        'دليل البدء السريع لـ Claude Code',
        'الدليل الشامل لـ MCP و Claude Code',
        'الدليل الشامل لـ Claude Code Skills',
        'كيف تجعل أدوات البرمجة تعمل لفترات طويلة',
        'الدليل الشامل لـ Claude Agent Teams',
        'Claude Code Superpowers للتطوير على مستوى الإنتاج',
        'أفضل ممارسات سير عمل Claude Code',
        'التطوير عن بُعد عبر الهاتف مع Claude Code',
        'الدليل الشامل لـ Claude Agent SDK',
        'من Vibe Coding إلى Spec Coding'
      ]
    },
    {
      text: 'التطوير متعدد المنصات',
      items: [
        'كيفية اختيار المنصة المناسبة لتطبيقك',
        'كيفية بناء برنامج WeChat المصغر',
        'كيفية بناء برنامج WeChat المصغر (مع خلفية)',
        'كيفية بناء تطبيق Android (Jetpack Compose)',
        'كيفية بناء تطبيق iOS (SwiftUI)',
        'كيفية تطوير تطبيق PWA محلي',
        'كيفية تطوير إضافة مساعد ذكاء اصطناعي للمتصفح',
        'كيفية تطوير تطبيق سطح مكتب Electron',
        'كيفية تطوير وسك NFTs بسرعة',
        'كيفية تطوير إضافة VS Code',
        'كيفية تطوير تطبيق Qt صناعي',
        'كيفية بناء موقعك الشخصي ومدونتك الأكاديمية'
      ]
    },
    {
      text: 'الذكاء الاصطناعي المتقدم',
      items: [
        'ما هو RAG وكيف يعمل',
        'RAG المتقدم وتنسيق سير العمل مع LangGraph'
      ]
    }
  ],
  'vi-vn': [
    {
      text: 'Claude Code Chuyên Sâu',
      items: [
        'Hướng dẫn Khởi động Nhanh Claude Code',
        'Hướng dẫn Toàn diện MCP và Claude Code',
        'Hướng dẫn Toàn diện Claude Code Skills',
        'Cách làm cho Coding Tools hoạt động trong thời gian dài',
        'Hướng dẫn Toàn diện Claude Agent Teams',
        'Claude Code Superpowers cho Phát triển Cấp Production',
        'Thực hành Tốt nhất Workflow Claude Code',
        'Phát triển Từ xa trên Mobile với Claude Code',
        'Hướng dẫn Toàn diện Claude Agent SDK',
        'Từ Vibe Coding đến Spec Coding'
      ]
    },
    {
      text: 'Phát triển Đa nền tảng',
      items: [
        'Cách chọn nền tảng phù hợp cho ứng dụng của bạn',
        'Cách xây dựng WeChat Mini Program',
        'Cách xây dựng WeChat Mini Program (có Backend)',
        'Cách xây dựng ứng dụng Android (Jetpack Compose)',
        'Cách xây dựng ứng dụng iOS (SwiftUI)',
        'Cách phát triển ứng dụng PWA cục bộ',
        'Cách phát triển tiện ích trợ lý AI cho trình duyệt',
        'Cách phát triển ứng dụng desktop Electron đa nền tảng',
        'Cách phát triển và đúc NFT nhanh chóng',
        'Cách phát triển tiện ích mở rộng VS Code',
        'Cách phát triển ứng dụng desktop Qt công nghiệp',
        'Cách xây dựng trang web cá nhân và blog học thuật'
      ]
    },
    {
      text: 'AI Nâng cao',
      items: [
        'RAG là gì và cách nó hoạt động',
        'RAG nâng cao và điều phối workflow với LangGraph'
      ]
    }
  ]
}

const getStage3Sidebar = (locale) => {
  if (locale === 'zh-cn') return zhCnStage3Sidebar
  if (locale === 'en') return stage3SidebarEn
  return applySidebarLabels(
    localizeSidebarLinks(stage3SidebarEn, locale),
    locale,
    stage3SidebarLabels
  )
}

const docFooterLabels = {
  'zh-cn': { prev: '上一页', next: '下一页' },
  en: { prev: 'Previous page', next: 'Next page' },
  'ja-jp': { prev: '前のページ', next: '次のページ' },
  'zh-tw': { prev: '上一頁', next: '下一頁' },
  'ko-kr': { prev: '이전 페이지', next: '다음 페이지' },
  'es-es': { prev: 'Página anterior', next: 'Página siguiente' },
  'fr-fr': { prev: 'Page précédente', next: 'Page suivante' },
  'de-de': { prev: 'Vorherige Seite', next: 'Nächste Seite' },
  'ar-sa': { prev: 'الصفحة السابقة', next: 'الصفحة التالية' },
  'vi-vn': { prev: 'Trang trước', next: 'Trang tiếp theo' }
}

export default defineConfig({
  srcExclude,
  ...(Number.isFinite(buildConcurrency) && buildConcurrency > 0
    ? { buildConcurrency }
    : {}),
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

  transformHtml(code) {
    return rewriteMissingLocaleMenuLinks(code)
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

    const outDir =
      siteConfig.outDir || path.resolve(__dirname, '.vitepress/dist')
    const robotsPath = path.join(outDir, 'robots.txt')

    fs.writeFileSync(robotsPath, robotsTxt, 'utf-8')
    console.log(
      '✓ Generated robots.txt with sitemap URL:',
      `${siteUrl}/sitemap.xml`
    )

    if (process.env.COPY_MD_TO_DIST !== '0') {
      // Copy all .md files to dist for download/copy features.
      const srcDir = siteConfig.srcDir || path.resolve(outDir, '../../')
      function copyMdFiles(src, dest, isRoot = false) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true })
        }
        const entries = fs.readdirSync(src, { withFileTypes: true })
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name)
          const destPath = path.join(dest, entry.name)
          if (entry.isDirectory()) {
            if (
              entry.name === '.vitepress' ||
              entry.name === 'public' ||
              entry.name === 'node_modules'
            )
              continue
            if (
              isRoot &&
              activeSupportedBuildLocales.length &&
              supportedLocaleDirs.includes(entry.name) &&
              !activeSupportedBuildLocales.includes(entry.name)
            ) {
              continue
            }
            copyMdFiles(srcPath, destPath)
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            fs.copyFileSync(srcPath, destPath)
          }
        }
      }
      console.log(
        '✓ Copying markdown files to output directory for download feature...'
      )
      copyMdFiles(srcDir, outDir, true)
    } else {
      console.log(
        '✓ Skipped markdown copy to output directory because COPY_MD_TO_DIST=0.'
      )
    }
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
        docFooter: docFooterLabels['zh-cn'],
        nav: [
          { text: '首页', link: '/zh-cn/' },
          {
            text: '零基础入门',
            link: '/zh-cn/stage-1/learning-map/',
            activeMatch: '/zh-cn/stage-1/'
          },
          {
            text: '初中级开发',
            link: '/zh-cn/stage-2/frontend/lovart-assets/',
            activeMatch: '/zh-cn/stage-2/'
          },
          {
            text: '高级开发',
            link: '/zh-cn/stage-3/core-skills/basics/',
            activeMatch: '/zh-cn/stage-3/'
          },
          {
            text: '附录知识库',
            link: '/zh-cn/appendix/index',
            activeMatch: '/zh-cn/appendix/'
          },
          {
            text: 'Vibe 故事',
            link: '/zh-cn/vibe-stories/story-1',
            activeMatch: '/zh-cn/vibe-stories/'
          }
        ],
        sidebar: {
          '/zh-cn/vibe-stories/': [
            {
              text: 'Vibe 故事',
              collapsed: false,
              items: [
                {
                  text: '放弃月入过万，他在农村小学带孩子们“用AI赶苍蝇”',
                  link: '/zh-cn/vibe-stories/story-1'
                },
                {
                  text: '期末考试周，我偷偷用AI造了个“校园闲鱼”',
                  link: '/zh-cn/vibe-stories/story-2'
                },
                {
                  text: '我给每个学生，做了一个不会累的“学霸同桌”',
                  link: '/zh-cn/vibe-stories/story-3'
                },
                {
                  text: '48岁货车司机，熬了几个通宵，硬是用AI磕出一个出海工具站',
                  link: '/zh-cn/vibe-stories/story-4'
                }
              ]
            }
          ],
          '/zh-cn/stage-1/': productManagerSidebar,
          '/zh-cn/stage-2/': zhCnStage2Sidebar,
          '/zh-cn/stage-3/': zhCnStage3Sidebar,
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
                  link: '/zh-cn/stage-2/backend/git-workflow/'
                },
                {
                  text: 'Extra 2: What is API',
                  link: '/zh-cn/stage-2/backend/ai-interface-code/'
                },
                {
                  text: 'Extra 5: What is RAG',
                  link: '/zh-cn/stage-3/ai-advanced/rag-introduction/'
                },
                {
                  text: 'Extra 6: Zeabur Deployment',
                  link: '/zh-cn/stage-2/backend/zeabur-deployment/'
                },
                {
                  text: 'Extra 7: CLI AI Tools & TDD',
                  link: '/zh-cn/stage-2/backend/modern-cli/'
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
                  link: '/zh-cn/stage-1/appendix-articles/example0-1/vibe-coding-tools-snake-game-tutorial'
                },
                {
                  text: 'Ex 0.2: Build Website with AI',
                  link: '/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents'
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
                  link: '/zh-cn/stage-2/frontend/hogwarts-portraits/'
                },
                {
                  text: 'Supabase 数据库',
                  link: '/zh-cn/stage-2/backend/database-supabase/'
                },
                {
                  text: 'Dify & Knowledge Base',
                  link: '/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/'
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
                  link: '/zh-cn/appendix/2-development-tools/debugging-art'
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
        docFooter: docFooterLabels.en,
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Getting Started',
            link: '/en/stage-1/learning-map/',
            activeMatch: '/en/stage-1/'
          },
          {
            text: 'Full-Stack Development',
            link: '/en/stage-2/frontend/lovart-assets/',
            activeMatch: '/en/stage-2/'
          },
          {
            text: 'Advanced Development',
            link: '/en/stage-3/core-skills/basics/',
            activeMatch: '/en/stage-3/'
          },
          {
            text: 'Appendix',
            link: '/en/appendix/index',
            activeMatch: '/en/appendix/'
          },
          {
            text: 'Vibe Stories',
            link: '/en/vibe-stories/story-1',
            activeMatch: '/en/vibe-stories/'
          }
        ],
        sidebar: {
          '/en/vibe-stories/': [
            {
              text: 'Vibe Stories',
              collapsed: false,
              items: [
                {
                  text: 'He Left a Five-Figure Monthly Salary to Help Rural School Kids "Use AI to Block Flies"',
                  link: '/en/vibe-stories/story-1'
                },
                {
                  text: 'During Finals Week, I Secretly Built a "Campus Xianyu" with AI',
                  link: '/en/vibe-stories/story-2'
                },
                {
                  text: 'I Built Each Student a Tireless "Straight-A Study Buddy"',
                  link: '/en/vibe-stories/story-3'
                },
                {
                  text: 'At 48, a Truck Driver Pulled Several All-Nighters and Used AI to Build an Overseas Tool Site',
                  link: '/en/vibe-stories/story-4'
                }
              ]
            }
          ],
          '/en/stage-1/': productManagerSidebarEn,
          '/en/stage-2/': stage2SidebarEn,
          '/en/stage-3/': stage3SidebarEn,
          '/en/appendix/': localizeAppendixSidebar(appendixSidebarEn, 'en')
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
        docFooter: docFooterLabels['ja-jp'],
        nav: [
          { text: 'ホーム', link: '/ja-jp/' },
          {
            text: '初心者とPM',
            link: '/ja-jp/stage-1/learning-map/',
            activeMatch: '/ja-jp/stage-1/'
          },
          {
            text: 'フルスタック開発',
            link: '/ja-jp/stage-2/',
            activeMatch: '/ja-jp/stage-2/'
          },
          {
            text: '上級開発',
            link: '/ja-jp/stage-3/',
            activeMatch: '/ja-jp/stage-3/'
          },
          {
            text: '付録',
            link: '/ja-jp/appendix/',
            activeMatch: '/ja-jp/appendix/'
          }
        ],
        sidebar: {
          '/ja-jp/stage-1/': getStage1Sidebar('ja-jp'),
          '/ja-jp/stage-2/': getStage2Sidebar('ja-jp'),
          '/ja-jp/stage-3/': getStage3Sidebar('ja-jp'),
          '/ja-jp/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'ja-jp'
          )
        }
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
        docFooter: docFooterLabels['zh-tw'],
        nav: [
          { text: '首頁', link: '/zh-tw/' },
          {
            text: '新手與產品原型',
            link: '/zh-tw/stage-1/learning-map/',
            activeMatch: '/zh-tw/stage-1/'
          },
          {
            text: '初中級開發',
            link: '/zh-tw/stage-2/',
            activeMatch: '/zh-tw/stage-2/'
          },
          {
            text: '高級開發',
            link: '/zh-tw/stage-3/',
            activeMatch: '/zh-tw/stage-3/'
          },
          {
            text: '附錄',
            link: '/zh-tw/appendix/',
            activeMatch: '/zh-tw/appendix/'
          }
        ],
        sidebar: {
          '/zh-tw/stage-1/': getStage1Sidebar('zh-tw'),
          '/zh-tw/stage-2/': getStage2Sidebar('zh-tw'),
          '/zh-tw/stage-3/': getStage3Sidebar('zh-tw'),
          '/zh-tw/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'zh-tw'
          )
        }
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
        docFooter: docFooterLabels['ko-kr'],
        nav: [
          { text: '홈', link: '/ko-kr/' },
          {
            text: '초보자 & PM',
            link: '/ko-kr/stage-1/learning-map/',
            activeMatch: '/ko-kr/stage-1/'
          },
          {
            text: '풀스택 개발',
            link: '/ko-kr/stage-2/',
            activeMatch: '/ko-kr/stage-2/'
          },
          {
            text: '고급 개발',
            link: '/ko-kr/stage-3/',
            activeMatch: '/ko-kr/stage-3/'
          },
          {
            text: '부록',
            link: '/ko-kr/appendix/',
            activeMatch: '/ko-kr/appendix/'
          }
        ],
        sidebar: {
          '/ko-kr/stage-1/': productManagerSidebarKo,
          '/ko-kr/stage-2/': getStage2Sidebar('ko-kr'),
          '/ko-kr/stage-3/': getStage3Sidebar('ko-kr'),
          '/ko-kr/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'ko-kr'
          )
        }
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
        docFooter: docFooterLabels['es-es'],
        nav: [
          { text: 'Inicio', link: '/es-es/' },
          {
            text: 'Principiante y PM',
            link: '/es-es/stage-1/learning-map/',
            activeMatch: '/es-es/stage-1/'
          },
          {
            text: 'Desarrollo Full Stack',
            link: '/es-es/stage-2/',
            activeMatch: '/es-es/stage-2/'
          },
          {
            text: 'Desarrollo Avanzado',
            link: '/es-es/stage-3/',
            activeMatch: '/es-es/stage-3/'
          },
          {
            text: 'Apéndice',
            link: '/es-es/appendix/',
            activeMatch: '/es-es/appendix/'
          }
        ],
        sidebar: {
          '/es-es/stage-1/': getStage1Sidebar('es-es'),
          '/es-es/stage-2/': getStage2Sidebar('es-es'),
          '/es-es/stage-3/': getStage3Sidebar('es-es'),
          '/es-es/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'es-es'
          )
        }
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
        docFooter: docFooterLabels['fr-fr'],
        nav: [
          { text: 'Accueil', link: '/fr-fr/' },
          {
            text: 'Débutant & PM',
            link: '/fr-fr/stage-1/learning-map/',
            activeMatch: '/fr-fr/stage-1/'
          },
          {
            text: 'Développement Full Stack',
            link: '/fr-fr/stage-2/',
            activeMatch: '/fr-fr/stage-2/'
          },
          {
            text: 'Développement Avancé',
            link: '/fr-fr/stage-3/',
            activeMatch: '/fr-fr/stage-3/'
          },
          {
            text: 'Annexe',
            link: '/fr-fr/appendix/',
            activeMatch: '/fr-fr/appendix/'
          }
        ],
        sidebar: {
          '/fr-fr/stage-1/': getStage1Sidebar('fr-fr'),
          '/fr-fr/stage-2/': getStage2Sidebar('fr-fr'),
          '/fr-fr/stage-3/': getStage3Sidebar('fr-fr'),
          '/fr-fr/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'fr-fr'
          )
        }
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
        docFooter: docFooterLabels['de-de'],
        nav: [
          { text: 'Start', link: '/de-de/' },
          {
            text: 'Anfänger & PM',
            link: '/de-de/stage-1/learning-map/',
            activeMatch: '/de-de/stage-1/'
          },
          {
            text: 'Full Stack Entwicklung',
            link: '/de-de/stage-2/',
            activeMatch: '/de-de/stage-2/'
          },
          {
            text: 'Fortgeschrittene Entwicklung',
            link: '/de-de/stage-3/',
            activeMatch: '/de-de/stage-3/'
          },
          {
            text: 'Anhang',
            link: '/de-de/appendix/',
            activeMatch: '/de-de/appendix/'
          }
        ],
        sidebar: {
          '/de-de/stage-1/': getStage1Sidebar('de-de'),
          '/de-de/stage-2/': getStage2Sidebar('de-de'),
          '/de-de/stage-3/': getStage3Sidebar('de-de'),
          '/de-de/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'de-de'
          )
        }
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
        docFooter: docFooterLabels['ar-sa'],
        nav: [
          { text: 'الرئيسية', link: '/ar-sa/' },
          {
            text: 'مبتدأ & PM',
            link: '/ar-sa/stage-1/learning-map/',
            activeMatch: '/ar-sa/stage-1/'
          },
          {
            text: 'تطوير Full Stack',
            link: '/ar-sa/stage-2/',
            activeMatch: '/ar-sa/stage-2/'
          },
          {
            text: 'تطوير متقدم',
            link: '/ar-sa/stage-3/',
            activeMatch: '/ar-sa/stage-3/'
          },
          {
            text: 'ملحق',
            link: '/ar-sa/appendix/',
            activeMatch: '/ar-sa/appendix/'
          }
        ],
        sidebar: {
          '/ar-sa/stage-1/': getStage1Sidebar('ar-sa'),
          '/ar-sa/stage-2/': getStage2Sidebar('ar-sa'),
          '/ar-sa/stage-3/': getStage3Sidebar('ar-sa'),
          '/ar-sa/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'ar-sa'
          )
        }
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
        docFooter: docFooterLabels['vi-vn'],
        nav: [
          { text: 'Trang chủ', link: '/vi-vn/' },
          {
            text: 'Người mới & PM',
            link: '/vi-vn/stage-1/learning-map/',
            activeMatch: '/vi-vn/stage-1/'
          },
          {
            text: 'Phát triển Full Stack',
            link: '/vi-vn/stage-2/',
            activeMatch: '/vi-vn/stage-2/'
          },
          {
            text: 'Phát triển Nâng cao',
            link: '/vi-vn/stage-3/',
            activeMatch: '/vi-vn/stage-3/'
          },
          {
            text: 'Phụ lục',
            link: '/vi-vn/appendix/',
            activeMatch: '/vi-vn/appendix/'
          }
        ],
        sidebar: {
          '/vi-vn/stage-1/': getStage1Sidebar('vi-vn'),
          '/vi-vn/stage-2/': getStage2Sidebar('vi-vn'),
          '/vi-vn/stage-3/': getStage3Sidebar('vi-vn'),
          '/vi-vn/appendix/': localizeAppendixSidebar(
            appendixSidebarEn,
            'vi-vn'
          )
        }
      }
    }
  }
})
