<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, withBase, useData } from 'vitepress'
import GitHubStars from './GitHubStars.vue'
import VibeStories from './VibeStories.vue'
import { provide } from 'vue'
import stage2LovartCover from '../../../zh-cn/stage-2/frontend/lovart-assets/images/image1.png'
import stage2FigmaCover from '../../../zh-cn/stage-2/frontend/figma-mastergo/images/image8.png'
import stage2DesignToCodeCover from '../../../zh-cn/stage-2/frontend/design-to-code/images/image42.png'
import stage2SupabaseCover from '../../../zh-cn/stage-2/backend/database-supabase/images/image1.png'
import stage2ZeaburCover from '../../../zh-cn/stage-2/backend/zeabur-deployment/images/image1.png'
import stage2DifyCover from '../../../zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image1.png'
import stage3ElectronCover from '../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.png'
import stage3AgentTeamsCover from '../../../zh-cn/stage-3/core-skills/agent-teams/images/home-cover.svg'
import stage3LongRunningCover from '../../../zh-cn/stage-3/core-skills/long-running-tasks/images/home-cover.svg'
import stage3PersonalBrandCover from '../../../zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png'

const router = useRouter()
const { site, page, lang } = useData()
const activeTab = ref('home')
const showLangMenu = ref(false)
const topPromoProgress = ref(1)
const topPromoDismissed = ref(false)
const topPromoIntroProgress = ref(0)
const topPromoColorProgress = ref(0)
let topPromoIntroRaf = 0
let topPromoColorRaf = 0
let topPromoColorTimer = 0
const WELCOME_SEEN_KEY = 'easy-vibe-welcome-seen'

// Appendix Scroll Logic
const appendixWrapper = ref(null)
const vibeStoriesSection = ref(null)
const totalPages = ref(1)
const currentPage = ref(0)

const updatePagination = () => {
  if (appendixWrapper.value) {
    const { scrollLeft, clientWidth, scrollWidth } = appendixWrapper.value
    // If scrollWidth is close to clientWidth, only 1 page
    if (scrollWidth <= clientWidth + 5) {
      totalPages.value = 1
      currentPage.value = 0
    } else {
      totalPages.value = Math.ceil(scrollWidth / clientWidth)
      currentPage.value = Math.round(scrollLeft / clientWidth)
    }
  }
}

const onAppendixScroll = () => {
  if (!appendixWrapper.value) return
  const { scrollLeft, clientWidth } = appendixWrapper.value
  const newPage = Math.round(scrollLeft / clientWidth)
  if (currentPage.value !== newPage) {
    currentPage.value = newPage
  }
}

const scrollToPage = (pageIndex) => {
  if (appendixWrapper.value) {
    const width = appendixWrapper.value.clientWidth
    appendixWrapper.value.scrollTo({
      left: pageIndex * width,
      behavior: 'smooth'
    })
  }
}

const scrollAppendixByPage = (direction) => {
  const nextPage = Math.min(
    totalPages.value - 1,
    Math.max(0, currentPage.value + direction)
  )
  scrollToPage(nextPage)
}

const autoScroll = () => {
  if (appendixWrapper.value) {
    const { scrollLeft, clientWidth, scrollWidth } = appendixWrapper.value
    const maxScroll = scrollWidth - clientWidth
    if (scrollLeft >= maxScroll - 20) {
      appendixWrapper.value.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      appendixWrapper.value.scrollBy({ left: clientWidth, behavior: 'smooth' })
    }
  }
}

const i18n = {
  'zh-cn': {
    nav: {
      title: 'Easy-Vibe 教程',
      home: '首页',
      stories: '用户故事',
      pm: '零基础入门',
      junior: '初中级开发',
      senior: '高级开发',
      appendix: '附录',
      start: '开始学习'
    },
    stories: {
      cat: '用户故事',
      title: '看见每一个<br><span class="highlight">闪亮的你</span>',
      sub: '加入他们，分享你的 vibe coding 故事',
      s1: { title: '放弃月入过万，他在农村小学带孩子们“用AI赶苍蝇”', author: '小学老师小浩' },
      s2: { title: '期末考试周，我偷偷用AI造了个“校园闲鱼”', author: '一位大二学生' },
      s3: { title: '我给每个学生，做了一个不会累的“学霸同桌”', author: '高中信息技术老师' },
      s4: { title: '48岁货车司机，熬了几个通宵，硬是用AI磕出一个出海工具站', author: '货车司机老黄' },
      authorPrefix: '讲述者：',
      ui: {
        prevLabel: '上一则故事',
        nextLabel: '下一则故事',
        selectLabel: '查看这个故事',
        imageAlt: '用户故事封面'
      }
    },
    stage1: {
      cat: 'Stage 1 · 零基础入门',
      title:
        '没有技术背景？<br><span class="highlight">正好。</span>',
      sub: '不看专业、不看出身——会说话，你就能做产品。',
      cards: [
        {
          title: '学习地图',
          desc: '了解从零基础到全栈开发的完整学习路径，明确每个阶段的目标和收获。',
          sub: '全年龄友好',
          link: '/zh-cn/stage-1/learning-map/'
        },
        {
          title: '游戏化入门',
          desc: '通过制作贪吃蛇等 AI 原生小游戏，体验 AI 编程的魅力，打破对代码的恐惧。',
          sub: '边玩边学',
          link: '/zh-cn/stage-1/ai-capabilities-through-games/'
        },
        {
          title: '产品原型实战',
          desc: '掌握 Vibe Coding 工作流，从想法到可交互原型，独立完成高保真 Web 应用。',
          sub: '核心心法',
          link: '/zh-cn/stage-1/finding-great-idea/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中级开发',
      title: '一个人，<br><span class="highlight">就是一支团队。</span>',
      sub: '从前端到后端，从数据库到上线。',
      cards: [
        {
          title: '素材生成 Agent',
          headline: '先把素材生产提速。',
          desc: '从 Lovart 和 Nanobanana 出发，搭建自己的素材生产工作流和绘图 Agent。',
          link: '/zh-cn/stage-2/frontend/lovart-assets/'
        },
        {
          title: 'Figma 与 MasterGo',
          headline: '先把设计工具用顺。',
          desc: '掌握专业 UI 设计工具的基础操作，理解从设计稿到开发协作的关键链路。',
          link: '/zh-cn/stage-2/frontend/figma-mastergo/'
        },
        {
          title: '设计稿转代码',
          headline: '把原型真正变成页面。',
          desc: '学习如何将设计原型转成可以在浏览器里运行的前端代码，减少手工重搭。',
          link: '/zh-cn/stage-2/frontend/design-to-code/'
        },
        {
          title: '真实数据项目',
          headline: '连上真正的数据库。',
          desc: '在 Supabase 上设计数据表和权限，用真实读写操作支撑你的产品数据层。',
          link: '/zh-cn/stage-2/backend/database-supabase/'
        },
        {
          title: '部署上线',
          headline: '让世界看到你的作品。',
          desc: '使用 CloudBase、Vercel、Zeabur 等平台，一口气打通从代码到公网访问的完整流程。',
          link: '/zh-cn/stage-2/backend/zeabur-deployment/'
        },
        {
          title: 'AI 知识库集成',
          headline: '让应用接上智能问答。',
          desc: '学习用 Dify 构建 AI 应用和知识库，把检索增强能力接进你的真实产品。',
          link: '/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 高级开发',
      title: '产品和结果，<br><span class="highlight">我全都要。</span>',
      sub: '突破时间与设备限制，让 AI 产品随处可见。',
      cards: [
        {
          title: '跨平台桌面应用',
          desc: '用 Electron 做语音转文字桌面程序，一次开发同时跑在 Windows、macOS、Linux。',
          link: '/zh-cn/stage-3/cross-platform/electron-voice-to-text/'
        },
        {
          title: 'AI 智能体团队',
          desc: '用 Claude Agent Teams 组建 AI 开发小队，多代理协作完成大型任务。',
          link: '/zh-cn/stage-3/core-skills/agent-teams/'
        },
        {
          title: '长效稳定执行',
          desc: '用循环脚本和 Ralph 插件管理长时间任务，让 Claude Code 过夜稳定跑完工作。',
          link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
        },
        {
          title: '个人品牌与输出',
          desc: '搭建个人网站与技术博客，让你的项目和经验长期沉淀并被更多人看到。',
          link: '/zh-cn/stage-3/personal-brand/personal-website-blog/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · 附录',
      title: '让代码，<br><span class="highlight">活灵活现。</span>',
      sub: '告别晦涩的文字堆砌。用动态演示和实时交互，重新定义技术文档。',
      cards: [
        {
          title: 'AI 进化史',
          desc: '回顾人工智能发展历程中的关键里程碑。',
          link: '/zh-cn/appendix/8-artificial-intelligence/ai-history'
        },
        {
          title: '提示词工程',
          desc: '掌握与 AI 高效对话的技巧，解锁潜力。',
          link: '/zh-cn/appendix/8-artificial-intelligence/prompt-engineering'
        },
        {
          title: '大语言模型',
          desc: '深入浅出解析 LLM 的工作原理与应用。',
          link: '/zh-cn/appendix/8-artificial-intelligence/llm-principles'
        },
        {
          title: 'Agent 智能体',
          desc: '探索具备自主决策与执行能力的 AI 架构。',
          link: '/zh-cn/appendix/8-artificial-intelligence/ai-agents'
        },
        {
          title: '前端基础',
          desc: 'HTML/CSS/JS 三大基石，入门必修课。',
          link: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive'
        },
        {
          title: '前端进化史',
          desc: '了解前端技术栈演变，把握发展趋势。',
          link: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks'
        },
        {
          title: '后端架构',
          desc: '从单体到微服务，探索架构演进之路。',
          link: '/zh-cn/appendix/4-server-and-backend/backend-layered-architecture'
        },
        {
          title: '后端语言',
          desc: '对比主流后端语言特性，选择最佳技术栈。',
          link: '/zh-cn/appendix/4-server-and-backend/backend-languages'
        },
        {
          title: '数据库原理',
          desc: '理解数据库核心原理，掌握数据存储艺术。',
          link: '/zh-cn/appendix/5-data/database-fundamentals'
        },
        {
          title: 'API 设计',
          desc: 'API 接口设计与开发的基础知识。',
          link: '/zh-cn/appendix/4-server-and-backend/api-intro'
        },
        {
          title: 'Git 版本控制',
          desc: '深入理解 Git 原理与高级用法。',
          link: '/zh-cn/appendix/2-development-tools/git-version-control'
        },
        {
          title: '计算机网络',
          desc: '网络协议与通信原理的基础知识。',
          link: '/zh-cn/appendix/1-computer-fundamentals/computer-networks'
        }
      ]
    },
    footer: {
      title: '你的想法，<br>此刻上线。',
      desc: '灵感到现实，何不从现在开始。',
      btn: '>_ Start'
    }
  },
  'en': {
    nav: {
      title: 'Easy-Vibe Tutorial',
      home: 'Home',
      stories: 'Vibe Stories',
      pm: 'Product Manager',
      junior: 'Junior Dev',
      senior: 'Senior Dev',
      appendix: 'Appendix',
      start: 'Start Learning'
    },
    stories: {
      cat: 'Vibe Stories',
      title: 'Meet every <br><span class="highlight">shining builder.</span>',
      sub: 'See how people from different backgrounds use AI to solve real problems.',
      s1: { title: 'He gave up a high salary to help rural kids "fight flies" with AI', author: 'Xiaohao, primary school teacher' },
      s2: { title: 'During finals week, I secretly built a campus marketplace with AI', author: 'A sophomore student' },
      s3: { title: 'I built every student a tireless AI study buddy', author: 'A high school IT teacher' },
      s4: { title: 'A 48-year-old truck driver stayed up for nights to build an overseas AI tool site', author: 'Lao Huang, truck driver' },
      authorPrefix: 'By',
      ui: {
        prevLabel: 'Previous story',
        nextLabel: 'Next story',
        selectLabel: 'View this story',
        imageAlt: 'Vibe story cover'
      }
    },
    stage1: {
      cat: 'Stage 1 · Getting Started',
      title: 'Zero to Hero, <br><span class="highlight">Be Your Own PM.</span>',
      sub: 'No CS background needed. Just speak your ideas—AI will turn them into high-fidelity web prototypes.',
      cards: [
        {
          title: 'Learning Map',
          desc: 'Understand the complete learning path from zero to full-stack development.',
          sub: 'All Ages Friendly',
          link: '/en/stage-1/learning-map/'
        },
        {
          title: 'Gamified Intro',
          desc: 'Experience the magic of AI programming by building games like Snake.',
          sub: 'Learn by Playing',
          link: '/en/stage-1/ai-capabilities-through-games/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Master the core of AI coding: From product ideas to interactive prototypes.',
          sub: 'Core Mindset',
          link: '/en/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Junior/Mid Dev',
      title:
        'Go Full Stack, <br><span class="highlight">Build Real Apps.</span>',
      sub: 'Understand the full journey from frontend to backend, database and deployment.',
      cards: [
        {
          title: 'Asset Agent',
          headline: 'Speed up content production.',
          desc: 'Build your own design-asset workflow and drawing agent with Lovart and Nanobanana.',
          link: '/zh-cn/stage-2/frontend/lovart-assets/'
        },
        {
          title: 'Figma & MasterGo',
          headline: 'Get fluent with design tools.',
          desc: 'Learn the basics of modern UI design tools and how design files flow into development.',
          link: '/zh-cn/stage-2/frontend/figma-mastergo/'
        },
        {
          title: 'Design to Code',
          headline: 'Turn mockups into pages.',
          desc: 'Convert prototypes into real frontend code that runs in the browser instead of staying as static designs.',
          link: '/zh-cn/stage-2/frontend/design-to-code/'
        },
        {
          title: 'Real Data Project',
          headline: 'Backed by a real DB.',
          desc: 'Design tables and permissions on Supabase and wire them into real read/write flows.',
          link: '/zh-cn/stage-2/backend/database-supabase/'
        },
        {
          title: 'Deployment',
          headline: 'Ship it to the world.',
          desc: 'Use CloudBase, Vercel and Zeabur to turn local projects into publicly reachable sites.',
          link: '/zh-cn/stage-2/backend/zeabur-deployment/'
        },
        {
          title: 'AI Knowledge Base',
          headline: 'Plug AI into the app.',
          desc: 'Use Dify to build AI workflows and knowledge-base powered product experiences.',
          link: '/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Senior Dev',
      title:
        'Advanced Practice, <br><span class="highlight">Infinite Possibilities.</span>',
      sub: 'Cross-platform apps and AI-native workflows, powered by Claude Code.',
      cards: [
        {
          title: 'Electron Desktop App',
          desc: 'Build a speech-to-text desktop app that runs on Windows, macOS and Linux from one codebase.',
          link: '/zh-cn/stage-3/cross-platform/electron-voice-to-text/'
        },
        {
          title: 'Agent Teams',
          desc: 'Use Claude Agent Teams to orchestrate multiple agents like a real dev team.',
          link: '/zh-cn/stage-3/core-skills/agent-teams/'
        },
        {
          title: 'Long-running Tasks',
          desc: 'Design loops and task queues so Claude Code can safely run overnight until work is truly done.',
          link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
        },
        {
          title: 'Personal Brand',
          desc: 'Build your own website and tech blog to showcase projects and writing.',
          link: '/zh-cn/stage-3/personal-brand/personal-website-blog/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI History',
          desc: 'Milestones in AI evolution.',
          link: '/zh-cn/appendix/8-artificial-intelligence/ai-history'
        },
        {
          title: 'Prompt Eng',
          desc: 'Master AI communication skills.',
          link: '/zh-cn/appendix/8-artificial-intelligence/prompt-engineering'
        },
        {
          title: 'LLM Intro',
          desc: 'Understanding Large Language Models.',
          link: '/zh-cn/appendix/8-artificial-intelligence/llm-principles'
        },
        {
          title: 'AI Agents',
          desc: 'Autonomous decision-making AI.',
          link: '/zh-cn/appendix/8-artificial-intelligence/ai-agents'
        },
        {
          title: 'Web Basics',
          desc: 'HTML/CSS/JS fundamentals.',
          link: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive'
        },
        {
          title: 'Frontend Evo',
          desc: 'Evolution of frontend tech stack.',
          link: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks'
        },
        {
          title: 'Backend Arch',
          desc: 'From monolith to microservices.',
          link: '/zh-cn/appendix/4-server-and-backend/backend-layered-architecture'
        },
        {
          title: 'Backend Lang',
          desc: 'Choosing the right tech stack.',
          link: '/zh-cn/appendix/4-server-and-backend/backend-languages'
        },
        {
          title: 'Database',
          desc: 'Core principles of data storage.',
          link: '/zh-cn/appendix/5-data/database-fundamentals'
        },
        {
          title: 'API Design',
          desc: 'Designing robust interfaces.',
          link: '/zh-cn/appendix/4-server-and-backend/api-intro'
        },
        {
          title: 'Git',
          desc: 'Version control mastery.',
          link: '/zh-cn/appendix/2-development-tools/git-version-control'
        },
        {
          title: 'Networks',
          desc: 'Protocols and communication.',
          link: '/zh-cn/appendix/1-computer-fundamentals/computer-networks'
        }
      ]
    },
    footer: {
      title: 'Ready to start?',
      desc: 'Easy-Vibe, make coding as natural as breathing.',
      btn: 'Start Now'
    }
  },
  'ja-jp': {
    nav: {
      title: 'Easy-Vibe チュートリアル',
      home: 'ホーム',
      stories: 'ユーザーストーリー',
      pm: 'プロダクトマネージャー',
      junior: '初中級開発者',
      senior: '上級開発者',
      appendix: '付録',
      start: '学習を開始'
    },
    stories: {
      cat: 'ユーザーストーリー',
      title: 'それぞれの<br><span class="highlight">輝く物語を見よう。</span>',
      sub: 'さまざまな背景の人たちが、AIで現実の課題をどう解決したかを紹介します。',
      s1: { title: '高収入の仕事を辞め、農村の子どもたちとAIで「ハエ対策」アプリを作った先生', author: '小学校教師 小浩' },
      s2: { title: '期末試験の週に、AIでこっそり「学内版フリマ」を作った', author: '大学2年生' },
      s3: { title: '生徒一人ひとりに、疲れない「AI優等生の隣の席」を作った', author: '高校の情報技術教師' },
      s4: { title: '48歳のトラック運転手が、徹夜で海外向けAIツールサイトを作り上げた', author: 'トラック運転手 老黄' },
      authorPrefix: '語り手：',
      ui: {
        prevLabel: '前のストーリー',
        nextLabel: '次のストーリー',
        selectLabel: 'このストーリーを見る',
        imageAlt: 'ユーザーストーリーのカバー'
      }
    },
    stage1: {
      cat: 'Stage 1 · 初心者とPM',
      title:
        'ゼロからの入門、<br><span class="highlight">自分だけのPMになる。</span>',
      sub: 'CSの背景は不要。アイデアを話すだけで、AIが高精度のWebプロトタイプに変換します。',
      cards: [
        {
          title: 'AI PM',
          desc: 'アイデアからプロトタイプまで、話すだけ。',
          sub: '非技術者向け',
          link: '/ja-jp/stage-1/'
        },
        {
          title: 'ゲーム化入門',
          desc: 'スネークゲームやテトリスを作って、コードへの恐怖を克服。',
          sub: '遊びながら学ぶ',
          link: '/ja-jp/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'AI時代のコーディングの核心：プロンプトエンジニアリングとコンテキスト管理。',
          sub: '核心的な考え方',
          link: '/ja-jp/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中級開発者',
      title:
        'フルスタックへ、<br><span class="highlight">リアルなアプリを構築。</span>',
      sub: 'フロントエンドとバックエンドの分離をマスター。DB、API、複雑なインタラクションを含む商用レベルのプロジェクトを構築。',
      cards: [
        {
          title: 'フルスタック',
          headline: 'フロント＆バックエンド。',
          desc: 'DB設計からAPI、コンポーネントまで、現代的なWebアプリを完全に構築。',
          link: '/ja-jp/stage-2/'
        },
        {
          title: 'リアルプロジェクト',
          headline: 'おもちゃのコードは卒業。',
          desc: '認証、ストレージ、ファイルアップロード、コアビジネスロジックを深く掘り下げる。',
          link: '/ja-jp/stage-2/'
        },
        {
          title: 'デプロイ',
          headline: '世界に公開。',
          desc: 'サーバー設定、DNS、CI/CD。製品リリースのラストワンマイル。',
          link: '/ja-jp/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 上級開発者',
      title: '高度な実践、<br><span class="highlight">無限の可能性。</span>',
      sub: 'モバイルミニプログラムとAIネイティブアプリ。LLM時代の可能性を探求。',
      cards: [
        {
          title: 'WeChatミニアプリ',
          desc: 'クロスプラットフォーム開発、数億人のユーザーに到達。',
          link: '/ja-jp/stage-3/'
        },
        {
          title: 'AIネイティブアプリ',
          desc: 'RAG、Agent。LLMの限界を探る。',
          link: '/ja-jp/stage-3/'
        },
        {
          title: '複雑なアーキテクチャ',
          desc: '高並行性、高可用性のアーキテクチャ設計。',
          link: '/ja-jp/stage-3/'
        },
        {
          title: 'パーソナルブランド',
          desc: '自分のウェブサイトと学術ブログを構築。',
          link: '/ja-jp/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · 付録',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/ja-jp/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/ja-jp/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/ja-jp/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/ja-jp/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: '準備はいいですか？',
      desc: 'Easy-Vibe、呼吸するように自然にコーディング。',
      btn: '今すぐ開始'
    }
  },
  'zh-tw': {
    nav: {
      title: 'Easy-Vibe 教學',
      home: '首頁',
      stories: '使用者故事',
      pm: '產品經理',
      junior: '初中級開發',
      senior: '高級開發',
      appendix: '附錄',
      start: '開始學習'
    },
    stories: {
      cat: '使用者故事',
      title: '看見每一個<br><span class="highlight">閃光的你。</span>',
      sub: '看看不同背景的人，如何用 AI 解決真實問題、做出真實產品。',
      s1: { title: '放棄月入過萬，他在鄉村小學帶孩子們「用 AI 趕蒼蠅」', author: '小學老師小浩' },
      s2: { title: '期末考週，我偷偷用 AI 做了個「校園閒魚」', author: '一位大二學生' },
      s3: { title: '我給每個學生，做了一個不會累的「學霸同桌」', author: '高中資訊科技老師' },
      s4: { title: '48 歲貨車司機熬了幾個通宵，硬是用 AI 做出一個出海工具站', author: '貨車司機老黃' },
      authorPrefix: '講述者：',
      ui: {
        prevLabel: '上一則故事',
        nextLabel: '下一則故事',
        selectLabel: '查看這個故事',
        imageAlt: '使用者故事封面'
      }
    },
    stage1: {
      cat: 'Stage 1 · 新手與產品原型',
      title:
        '零基礎入門，<br><span class="highlight">做自己的產品經理。</span>',
      sub: '不需要計算機專業背景，只要會說話，就能通過 AI 將你的創意轉化為高保真的 Web 原型。',
      cards: [
        {
          title: 'AI 產品經理',
          desc: '從想法到高保真原型，你只需要會說話。',
          sub: '適合非技術背景',
          link: '/zh-tw/stage-1/'
        },
        {
          title: '遊戲化入門',
          desc: '通過製作貪吃蛇、俄羅斯方塊，打破對代碼的恐懼。',
          sub: '邊玩邊學',
          link: '/zh-tw/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: '掌握 AI 時代的編程核心：提示詞工程與上下文管理。',
          sub: '核心心法',
          link: '/zh-tw/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中級開發',
      title: '深入全棧，<br><span class="highlight">構建真實應用。</span>',
      sub: '掌握前後端分離架構，親手打造包含數據庫、API 和複雜交互的完整商業級項目。',
      cards: [
        {
          title: '全棧開發',
          headline: '獨立完成前後端。',
          desc: '從數據庫設計到 API 開發，再到前端組件化，完整構建一個現代化 Web 應用。',
          link: '/zh-tw/stage-2/'
        },
        {
          title: '真實項目',
          headline: '拒絕玩具代碼。',
          desc: '深入理解用戶鑑權、數據存儲、文件上傳等核心業務邏輯。',
          link: '/zh-tw/stage-2/'
        },
        {
          title: '部署上線',
          headline: '讓世界看到你的作品。',
          desc: '學習服務器配置、域名解析和自動化部署，打通產品落地的最後一公里。',
          link: '/zh-tw/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 高級開發',
      title: '高階實戰，<br><span class="highlight">挑戰無限可能。</span>',
      sub: '進軍移動端小程序與 AI 原生應用開發，探索大模型時代的無限機遇。',
      cards: [
        {
          title: '微信小程序',
          desc: '跨平台開發，觸達億級用戶。',
          link: '/zh-tw/stage-3/'
        },
        {
          title: 'AI 原生應用',
          desc: 'RAG、Agent，探索 LLM 的無限可能。',
          link: '/zh-tw/stage-3/'
        },
        {
          title: '複雜業務架構',
          desc: '應對高並發、高可用場景的架構設計。',
          link: '/zh-tw/stage-3/'
        },
        {
          title: '個人品牌',
          desc: '構建屬於自己的個人網頁與學術博客。',
          link: '/zh-tw/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · 附錄',
      title: '百科全書，<br><span class="highlight">夯實基礎。</span>',
      sub: '從計算機網絡到 AI 原理，補齊你的技術拼圖。',
      cards: [
        {
          title: '人工智能',
          desc: 'LLM、Agent、RAG，深入 AI 底層原理。',
          link: '/zh-tw/appendix/ai-evolution'
        },
        {
          title: '前端開發',
          desc: '瀏覽器原理、性能優化、Canvas 圖形學。',
          link: '/zh-tw/appendix/web-basics'
        },
        {
          title: '後端架構',
          desc: '高並發、分佈式、微服務架構設計。',
          link: '/zh-tw/appendix/backend-evolution'
        },
        {
          title: '通用技能',
          desc: 'Git、網絡、IDE 原理，開發者必備素養。',
          link: '/zh-tw/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: '準備好開始了嗎？',
      desc: 'Easy-Vibe，讓編程像呼吸一樣自然。',
      btn: '立即開啟'
    }
  },
  'ko-kr': {
    nav: {
      title: 'Easy-Vibe 튜토리얼',
      home: '홈',
      stories: '사용자 이야기',
      pm: '제품 관리자',
      junior: '초/중급 개발자',
      senior: '고급 개발자',
      appendix: '부록',
      start: '학습 시작'
    },
    stories: {
      cat: '사용자 이야기',
      title: '빛나는 모두의<br><span class="highlight">이야기를 만나보세요.</span>',
      sub: '서로 다른 배경의 사람들이 AI로 현실의 문제를 어떻게 해결했는지 살펴보세요.',
      s1: { title: '높은 월급을 포기하고 시골 초등학교 아이들과 AI로 "파리 막기"를 만든 선생님', author: '초등학교 교사 샤오하오' },
      s2: { title: '기말고사 주간에 몰래 AI로 "캠퍼스 중고장터"를 만든 이야기', author: '대학교 2학년 학생' },
      s3: { title: '모든 학생에게 지치지 않는 "AI 우등생 짝꿍"을 만들어 준 선생님', author: '고등학교 정보기술 교사' },
      s4: { title: '48세 트럭 운전사가 며칠 밤을 새워 해외용 AI 툴 사이트를 만든 이야기', author: '트럭 운전사 라오황' },
      authorPrefix: '화자:',
      ui: {
        prevLabel: '이전 이야기',
        nextLabel: '다음 이야기',
        selectLabel: '이 이야기 보기',
        imageAlt: '사용자 이야기 표지'
      }
    },
    stage1: {
      cat: 'Stage 1 · 초보자 & PM',
      title:
        '제로 베이스 입문,<br><span class="highlight">나만의 PM이 되다.</span>',
      sub: 'CS 배경지식이 없어도 괜찮습니다. 아이디어를 말하기만 하면 AI가 고품질 웹 프로토타입으로 변환해줍니다.',
      cards: [
        {
          title: 'AI 제품 관리자',
          desc: '아이디어에서 프로토타입까지, 말 한마디로.',
          sub: '비전공자 추천',
          link: '/ko-kr/stage-1/'
        },
        {
          title: '게임으로 입문',
          desc: '스네이크 게임, 테트리스를 만들며 코딩 공포증 극복.',
          sub: '놀면서 배우기',
          link: '/ko-kr/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'AI 시대 코딩의 핵심: 프롬프트 엔지니어링과 컨텍스트 관리.',
          sub: '핵심 마인드셋',
          link: '/ko-kr/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 초/중급 개발자',
      title: '풀스택 심화,<br><span class="highlight">실제 앱 구축.</span>',
      sub: '프론트엔드-백엔드 분리 아키텍처 마스터. DB, API, 복잡한 상호작용이 포함된 상용급 프로젝트 구축.',
      cards: [
        {
          title: '풀스택 개발',
          headline: '프론트 & 백엔드 독립 완성.',
          desc: 'DB 설계부터 API 개발, 프론트엔드 컴포넌트화까지 현대적인 웹 앱을 완벽하게 구축.',
          link: '/ko-kr/stage-2/'
        },
        {
          title: '실전 프로젝트',
          headline: '장난감 코드는 그만.',
          desc: '사용자 인증, 데이터 저장, 파일 업로드 등 핵심 비즈니스 로직 심층 이해.',
          link: '/ko-kr/stage-2/'
        },
        {
          title: '배포 및 출시',
          headline: '세상에 보여주세요.',
          desc: '서버 설정, 도메인 연결, CI/CD. 제품 출시의 마지막 관문.',
          link: '/ko-kr/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 고급 개발자',
      title:
        '고급 실전,<br><span class="highlight">무한한 가능성에 도전.</span>',
      sub: '모바일 미니 프로그램 및 AI 네이티브 앱 개발. LLM 시대의 무한한 기회 탐색.',
      cards: [
        {
          title: '위챗 미니프로그램',
          desc: '크로스 플랫폼 개발, 수억 명의 사용자 도달.',
          link: '/ko-kr/stage-3/'
        },
        {
          title: 'AI 네이티브 앱',
          desc: 'RAG, Agent. LLM의 한계 탐색.',
          link: '/ko-kr/stage-3/'
        },
        {
          title: '복잡한 아키텍처',
          desc: '고동시성, 고가용성 아키텍처 설계.',
          link: '/ko-kr/stage-3/'
        },
        {
          title: '퍼스널 브랜딩',
          desc: '나만의 웹사이트와 학술 블로그 구축.',
          link: '/ko-kr/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · 부록',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/ko-kr/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/ko-kr/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/ko-kr/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/ko-kr/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: '시작할 준비 되셨나요?',
      desc: 'Easy-Vibe, 숨 쉬듯 자연스러운 코딩.',
      btn: '지금 시작하기'
    }
  },
  'es-es': {
    nav: {
      title: 'Tutorial Easy-Vibe',
      home: 'Inicio',
      stories: 'Historias de usuarios',
      pm: 'Gerente de Producto',
      junior: 'Desarrollador Junior',
      senior: 'Desarrollador Senior',
      appendix: 'Apéndice',
      start: 'Empezar'
    },
    stories: {
      cat: 'Historias de usuarios',
      title: 'Conoce cada <br><span class="highlight">historia que brilla.</span>',
      sub: 'Descubre cómo personas de distintos contextos usan la IA para resolver problemas reales.',
      s1: { title: 'Dejó un salario de cinco cifras para ayudar a niños rurales a "ahuyentar moscas" con IA', author: 'Xiaohao, maestro de primaria rural' },
      s2: { title: 'Durante la semana de finales, construí en secreto un mercado universitario con IA', author: 'Una estudiante de segundo año' },
      s3: { title: 'Le construí a cada alumno un compañero de estudio con IA que nunca se cansa', author: 'Un profesor de informática de secundaria' },
      s4: { title: 'Un camionero de 48 años pasó varias noches despierto para crear una web de herramientas de IA para el extranjero', author: 'Lao Huang, camionero' },
      authorPrefix: 'Por',
      ui: {
        prevLabel: 'Historia anterior',
        nextLabel: 'Siguiente historia',
        selectLabel: 'Ver esta historia',
        imageAlt: 'Portada de la historia'
      }
    },
    stage1: {
      cat: 'Stage 1 · Principiante y PM',
      title:
        'De Cero a Héroe,<br><span class="highlight">Sé tu propio PM.</span>',
      sub: 'No necesitas experiencia en CS. Solo di tu idea y la IA la convertirá en prototipos web de alta fidelidad.',
      cards: [
        {
          title: 'PM de IA',
          desc: 'De la idea al prototipo, solo hablando.',
          sub: 'Amigable para no técnicos',
          link: '/es-es/stage-1/'
        },
        {
          title: 'Intro Gamificada',
          desc: 'Crea Snake, Tetris y rompe el miedo al código.',
          sub: 'Aprende jugando',
          link: '/es-es/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Domina el núcleo de la programación con IA: Ingeniería de Prompts y Contexto.',
          sub: 'Mentalidad Clave',
          link: '/es-es/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Desarrollador Junior/Mid',
      title: 'Full Stack,<br><span class="highlight">Crea Apps Reales.</span>',
      sub: 'De la base de datos al despliegue: conecta frontend, backend y operaciones en un solo recorrido.',
      cards: [
        {
          title: 'Mapa de la Etapa',
          headline: 'Primero entiende el recorrido completo.',
          desc: 'Revisa la vista general de Stage 2 para ver cómo encajan frontend, backend, DB y despliegue.',
          link: '/zh-cn/stage-2/'
        },
        {
          title: 'Proyecto con DB real',
          headline: 'Supabase como base de datos de verdad.',
          desc: 'Diseña tablas y permisos en Supabase y conéctalos a flujos reales de lectura/escritura.',
          link: '/zh-cn/stage-2/backend/database-supabase/'
        },
        {
          title: 'Despliegue en producción',
          headline: 'Lleva tu app al mundo real.',
          desc: 'Usa CloudBase, Vercel y Zeabur para convertir tu código local en un sitio público.',
          link: '/zh-cn/stage-2/backend/zeabur-deployment/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Desarrollador Senior',
      title:
        'Práctica Avanzada,<br><span class="highlight">Posibilidades Infinitas.</span>',
      sub: 'Apps multiplataforma y flujos de trabajo AI-native impulsados por Claude Code.',
      cards: [
        {
          title: 'App de escritorio multiplataforma',
          desc: 'Crea con Electron una app de voz a texto que funciona en Windows, macOS y Linux con una sola base de código.',
          link: '/zh-cn/stage-3/cross-platform/electron-voice-to-text/'
        },
        {
          title: 'Equipos de agentes IA',
          desc: 'Usa Claude Agent Teams para orquestar varios agentes como si fueran un equipo de desarrollo real.',
          link: '/zh-cn/stage-3/core-skills/agent-teams/'
        },
        {
          title: 'Tareas de larga duración',
          desc: 'Diseña bucles y colas de tareas para que Claude Code pueda trabajar durante horas de forma estable.',
          link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
        },
        {
          title: 'Marca personal',
          desc: 'Construye tu sitio web y blog técnico para dar visibilidad a tus proyectos.',
          link: '/zh-cn/stage-3/personal-brand/personal-website-blog/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · Apéndice',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/es-es/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/es-es/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/es-es/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/es-es/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: '¿Listo para empezar?',
      desc: 'Easy-Vibe, haz que programar sea tan natural como respirar.',
      btn: 'Empezar Ahora'
    }
  },
  'fr-fr': {
    nav: {
      title: 'Tutoriel Easy-Vibe',
      home: 'Accueil',
      stories: 'Histoires d’utilisateurs',
      pm: 'Chef de Produit',
      junior: 'Dév Junior',
      senior: 'Dév Senior',
      appendix: 'Annexe',
      start: 'Commencer'
    },
    stories: {
      cat: 'Histoires d’utilisateurs',
      title: 'Découvrez chaque <br><span class="highlight">parcours inspirant.</span>',
      sub: 'Voyez comment des personnes de tous horizons utilisent l’IA pour résoudre de vrais problèmes.',
      s1: { title: 'Il a quitté un salaire confortable pour aider des enfants d’une école rurale à "chasser les mouches" avec l’IA', author: 'Xiaohao, instituteur' },
      s2: { title: 'Pendant la semaine des examens, j’ai secrètement créé une marketplace de campus avec l’IA', author: 'Une étudiante de deuxième année' },
      s3: { title: 'J’ai créé pour chaque élève un binôme d’étude IA qui ne se fatigue jamais', author: 'Un professeur d’informatique au lycée' },
      s4: { title: 'Un chauffeur routier de 48 ans a veillé plusieurs nuits pour lancer un site d’outils IA à l’international', author: 'Lao Huang, chauffeur routier' },
      authorPrefix: 'Par',
      ui: {
        prevLabel: 'Histoire précédente',
        nextLabel: 'Histoire suivante',
        selectLabel: 'Voir cette histoire',
        imageAlt: 'Couverture de l’histoire'
      }
    },
    stage1: {
      cat: 'Stage 1 · Débutant & PM',
      title:
        'De Zéro à Héros,<br><span class="highlight">Soyez votre propre PM.</span>',
      sub: "Pas besoin de background CS. Parlez juste de votre idée, et l'IA la transformera en prototypes web haute fidélité.",
      cards: [
        {
          title: 'PM IA',
          desc: "De l'idée au prototype, juste en parlant.",
          sub: 'Accessible aux non-tech',
          link: '/fr-fr/stage-1/'
        },
        {
          title: 'Intro Gamifiée',
          desc: 'Créez Snake, Tetris et brisez la peur du code.',
          sub: 'Apprendre en jouant',
          link: '/fr-fr/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Maîtrisez le cœur du codage IA : Prompt Engineering & Contexte.',
          sub: 'Esprit Clé',
          link: '/fr-fr/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Dév Junior/Mid',
      title:
        'Full Stack,<br><span class="highlight">Créez de Vraies Apps.</span>',
      sub: 'Maîtrisez la séparation frontend-backend. Créez des projets commerciaux avec DB, API et interactions complexes.',
      cards: [
        {
          title: 'Full Stack',
          headline: 'Frontend & Backend.',
          desc: 'Du design DB aux API et composants, construisez une web app moderne complète.',
          link: '/fr-fr/stage-2/'
        },
        {
          title: 'Projets Réels',
          headline: 'Pas de code jouet.',
          desc: "Plongez dans l'Auth, le Stockage, l'Upload de fichiers et la logique métier.",
          link: '/fr-fr/stage-2/'
        },
        {
          title: 'Déploiement',
          headline: 'Montrez au monde.',
          desc: 'Config serveur, DNS, CI/CD. Le dernier kilomètre de la livraison produit.',
          link: '/fr-fr/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Dév Senior',
      title:
        'Pratique Avancée,<br><span class="highlight">Possibilités Infinies.</span>',
      sub: "Mini-programmes mobiles et Apps Natives IA. Explorez l'ère des LLM.",
      cards: [
        {
          title: 'WeChat Mini-app',
          desc: "Dév multiplateforme, touchant des millions d'utilisateurs.",
          link: '/fr-fr/stage-3/'
        },
        {
          title: 'Apps Natives IA',
          desc: 'RAG, Agent. Explorez les limites des LLM.',
          link: '/fr-fr/stage-3/'
        },
        {
          title: 'Arch. Complexe',
          desc: "Conception d'architecture haute concurrence et haute disponibilité.",
          link: '/fr-fr/stage-3/'
        },
        {
          title: 'Marque Perso',
          desc: 'Construisez votre propre site web et blog académique.',
          link: '/fr-fr/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · Annexe',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/fr-fr/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/fr-fr/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/fr-fr/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/fr-fr/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: 'Prêt à commencer ?',
      desc: 'Easy-Vibe, rendez le codage aussi naturel que la respiration.',
      btn: 'Commencer'
    }
  },
  'de-de': {
    nav: {
      title: 'Easy-Vibe Tutorial',
      home: 'Startseite',
      stories: 'Nutzergeschichten',
      pm: 'Produktmanager',
      junior: 'Junior Dev',
      senior: 'Senior Dev',
      appendix: 'Anhang',
      start: 'Starten'
    },
    stories: {
      cat: 'Nutzergeschichten',
      title: 'Entdecke jede <br><span class="highlight">inspirierende Geschichte.</span>',
      sub: 'Sieh, wie Menschen mit ganz unterschiedlichen Hintergründen mit KI echte Probleme lösen.',
      s1: { title: 'Er gab ein hohes Gehalt auf, um Kindern auf dem Land mit KI beim "Fliegenvertreiben" zu helfen', author: 'Xiaohao, Grundschullehrer' },
      s2: { title: 'In der Prüfungswoche habe ich heimlich mit KI einen Campus-Marktplatz gebaut', author: 'Eine Studentin im zweiten Jahr' },
      s3: { title: 'Ich habe jedem Schüler einen unermüdlichen KI-Lernpartner gebaut', author: 'Ein Informatiklehrer an einer Oberschule' },
      s4: { title: 'Ein 48-jähriger Lkw-Fahrer blieb mehrere Nächte wach, um eine internationale KI-Toolseite zu bauen', author: 'Lao Huang, Lkw-Fahrer' },
      authorPrefix: 'Von',
      ui: {
        prevLabel: 'Vorherige Geschichte',
        nextLabel: 'Nächste Geschichte',
        selectLabel: 'Diese Geschichte ansehen',
        imageAlt: 'Titelbild der Geschichte'
      }
    },
    stage1: {
      cat: 'Stage 1 · Anfänger & PM',
      title:
        'Von Null auf Hundert,<br><span class="highlight">Sei dein eigener PM.</span>',
      sub: 'Kein CS-Hintergrund nötig. Sprich einfach deine Idee aus, und KI verwandelt sie in High-Fidelity-Web-Prototypen.',
      cards: [
        {
          title: 'KI PM',
          desc: 'Von der Idee zum Prototyp, einfach durch Sprechen.',
          sub: 'Nicht-Tech-freundlich',
          link: '/de-de/stage-1/'
        },
        {
          title: 'Gamifizierte Intro',
          desc: 'Baue Snake, Tetris und überwinde die Angst vor Code.',
          sub: 'Spielend lernen',
          link: '/de-de/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Meistere den Kern des KI-Codings: Prompt Engineering & Kontext.',
          sub: 'Kern-Mindset',
          link: '/de-de/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Junior/Mid Dev',
      title: 'Full Stack,<br><span class="highlight">Baue echte Apps.</span>',
      sub: 'Meistere die Frontend-Backend-Trennung. Baue kommerzielle Projekte mit DB, API und komplexen Interaktionen.',
      cards: [
        {
          title: 'Full Stack',
          headline: 'Frontend & Backend.',
          desc: 'Vom DB-Design bis zu APIs und Komponenten, baue eine moderne Web-App komplett.',
          link: '/de-de/stage-2/'
        },
        {
          title: 'Echte Projekte',
          headline: 'Kein Spielzeug-Code.',
          desc: 'Tauche ein in Auth, Speicher, Datei-Uploads und Kern-Geschäftslogik.',
          link: '/de-de/stage-2/'
        },
        {
          title: 'Deployment',
          headline: 'Zeig es der Welt.',
          desc: 'Server-Konfig, DNS, CI/CD. Die letzte Meile der Produktlieferung.',
          link: '/de-de/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Senior Dev',
      title:
        'Fortgeschrittene Praxis,<br><span class="highlight">Unendliche Möglichkeiten.</span>',
      sub: 'Mobile Mini-Programme & KI-Native Apps. Erkunde die Ära der LLMs.',
      cards: [
        {
          title: 'WeChat Mini-App',
          desc: 'Plattformübergreifende Entwicklung, Millionen von Nutzern erreichen.',
          link: '/de-de/stage-3/'
        },
        {
          title: 'KI-Native Apps',
          desc: 'RAG, Agent. Erkunde die Grenzen von LLMs.',
          link: '/de-de/stage-3/'
        },
        {
          title: 'Komplexe Arch',
          desc: 'Architekturdesign für hohe Gleichzeitigkeit und hohe Verfügbarkeit.',
          link: '/de-de/stage-3/'
        },
        {
          title: 'Persönliche Marke',
          desc: 'Baue deine eigene Website und deinen akademischen Blog.',
          link: '/de-de/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · Anhang',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/de-de/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/de-de/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/de-de/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/de-de/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: 'Bereit zu starten?',
      desc: 'Easy-Vibe, mache Coden so natürlich wie Atmen.',
      btn: 'Jetzt starten'
    }
  },
  'ar-sa': {
    nav: {
      title: 'دليل Easy-Vibe',
      home: 'الرئيسية',
      stories: 'قصص المستخدمين',
      pm: 'مدير المنتج',
      junior: 'مطور مبتدئ',
      senior: 'مطور خبير',
      appendix: 'ملحق',
      start: 'ابدأ التعلم'
    },
    stories: {
      cat: 'قصص المستخدمين',
      title: 'تعرّف على كل <br><span class="highlight">قصة ملهمة.</span>',
      sub: 'اكتشف كيف يستخدم أشخاص من خلفيات مختلفة الذكاء الاصطناعي لحل مشكلات حقيقية.',
      s1: { title: 'تخلّى عن راتب مرتفع ليساعد أطفال مدرسة ريفية على "طرد الذباب" باستخدام الذكاء الاصطناعي', author: 'شياوهاو، معلم مدرسة ابتدائية' },
      s2: { title: 'خلال أسبوع الامتحانات النهائية، بنيت سرًا سوقًا جامعيًا باستخدام الذكاء الاصطناعي', author: 'طالبة في السنة الثانية' },
      s3: { title: 'صنعت لكل طالب زميل دراسة بالذكاء الاصطناعي لا يتعب أبدًا', author: 'معلم تقنية معلومات في الثانوية' },
      s4: { title: 'سائق شاحنة يبلغ 48 عامًا سهر عدة ليالٍ ليبني موقع أدوات ذكاء اصطناعي للأسواق الخارجية', author: 'لاو هوانغ، سائق شاحنة' },
      authorPrefix: 'الراوي:',
      ui: {
        prevLabel: 'القصة السابقة',
        nextLabel: 'القصة التالية',
        selectLabel: 'عرض هذه القصة',
        imageAlt: 'غلاف القصة'
      }
    },
    stage1: {
      cat: 'Stage 1 · مدير المنتج',
      title:
        'من الصفر إلى الاحتراف،<br><span class="highlight">كن مدير منتجك الخاص.</span>',
      sub: 'لا حاجة لخلفية في علوم الحاسوب. فقط تحدث بفكرتك، وسيُحولها الذكاء الاصطناعي إلى نماذج ويب عالية الدقة.',
      cards: [
        {
          title: 'مدير منتج AI',
          desc: 'من الفكرة إلى النموذج الأولي، بمجرد التحدث.',
          sub: 'صديق لغير التقنيين',
          link: '/ar-sa/stage-1/'
        },
        {
          title: 'مقدمة بالألعاب',
          desc: 'ابنِ Snake و Tetris واكسر حاجز الخوف من الكود.',
          sub: 'تعلم باللعب',
          link: '/ar-sa/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'أتقن جوهر برمجة الذكاء الاصطناعي: هندسة الأوامر والسياق.',
          sub: 'العقلية الأساسية',
          link: '/ar-sa/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · مطور مبتدئ/متوسط',
      title:
        'Full Stack،<br><span class="highlight">ابنِ تطبيقات حقيقية.</span>',
      sub: 'أتقن فصل الواجهة الأمامية عن الخلفية. ابنِ مشاريع تجارية مع قواعد بيانات و API وتفاعلات معقدة.',
      cards: [
        {
          title: 'Full Stack',
          headline: 'واجهة أمامية وخلفية.',
          desc: 'من تصميم DB إلى API والمكونات، ابنِ تطبيق ويب حديث بالكامل.',
          link: '/ar-sa/stage-2/'
        },
        {
          title: 'مشاريع حقيقية',
          headline: 'ليس كود ألعاب.',
          desc: 'تعمق في المصادقة، التخزين، رفع الملفات ومنطق العمل الأساسي.',
          link: '/ar-sa/stage-2/'
        },
        {
          title: 'النشر',
          headline: 'أظهر للعالم.',
          desc: 'إعداد الخادم، DNS، CI/CD. الميل الأخير لتسليم المنتج.',
          link: '/ar-sa/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · مطور خبير',
      title:
        'ممارسة متقدمة،<br><span class="highlight">إمكانيات لا نهائية.</span>',
      sub: 'برامج WeChat الصغيرة وتطبيقات AI الأصلية. استكشف عصر LLMs.',
      cards: [
        {
          title: 'برنامج WeChat المصغر',
          desc: 'تطوير متعدد المنصات، الوصول لملايين المستخدمين.',
          link: '/ar-sa/stage-3/'
        },
        {
          title: 'تطبيقات AI الأصلية',
          desc: 'RAG، Agent. استكشف حدود LLMs.',
          link: '/ar-sa/stage-3/'
        },
        {
          title: 'هندسة معقدة',
          desc: 'تصميم هندسة التزامن العالي والتوافر العالي.',
          link: '/ar-sa/stage-3/'
        },
        {
          title: 'العلامة التجارية الشخصية',
          desc: 'ابنِ موقعك الخاص ومدونتك الأكاديمية.',
          link: '/ar-sa/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · ملحق',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/ar-sa/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/ar-sa/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/ar-sa/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/ar-sa/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: 'جاهز للبدء؟',
      desc: 'Easy-Vibe، اجعل البرمجة طبيعية كالتنفس.',
      btn: 'ابدأ الآن'
    }
  },
  'vi-vn': {
    nav: {
      title: 'Hướng dẫn Easy-Vibe',
      home: 'Trang chủ',
      stories: 'Câu chuyện người dùng',
      pm: 'Quản lý sản phẩm',
      junior: 'Dev Sơ/Trung cấp',
      senior: 'Dev Cao cấp',
      appendix: 'Phụ lục',
      start: 'Bắt đầu học'
    },
    stories: {
      cat: 'Câu chuyện người dùng',
      title: 'Gặp gỡ từng <br><span class="highlight">câu chuyện tỏa sáng.</span>',
      sub: 'Khám phá cách những người từ nhiều xuất phát điểm khác nhau dùng AI để giải quyết vấn đề thật.',
      s1: { title: 'Anh bỏ mức lương cao để giúp trẻ em vùng quê "đuổi ruồi" bằng AI', author: 'Xiaohao, giáo viên tiểu học' },
      s2: { title: 'Trong tuần thi cuối kỳ, tôi lặng lẽ làm một chợ đồ cũ trong trường bằng AI', author: 'Một sinh viên năm hai' },
      s3: { title: 'Tôi tạo cho mỗi học sinh một bạn học giỏi AI không biết mệt', author: 'Một giáo viên CNTT trung học' },
      s4: { title: 'Một tài xế xe tải 48 tuổi thức trắng nhiều đêm để làm một website công cụ AI cho thị trường quốc tế', author: 'Lao Huang, tài xế xe tải' },
      authorPrefix: 'Người kể:',
      ui: {
        prevLabel: 'Câu chuyện trước',
        nextLabel: 'Câu chuyện tiếp theo',
        selectLabel: 'Xem câu chuyện này',
        imageAlt: 'Ảnh bìa câu chuyện'
      }
    },
    stage1: {
      cat: 'Stage 1 · Người mới & PM',
      title:
        'Từ số 0 đến Hero,<br><span class="highlight">Tự làm PM cho chính mình.</span>',
      sub: 'Không cần nền tảng CS. Chỉ cần nói ra ý tưởng, AI sẽ biến nó thành nguyên mẫu web độ trung thực cao.',
      cards: [
        {
          title: 'AI PM',
          desc: 'Từ ý tưởng đến nguyên mẫu, chỉ bằng lời nói.',
          sub: 'Thân thiện với non-tech',
          link: '/vi-vn/stage-1/'
        },
        {
          title: 'Nhập môn qua Game',
          desc: 'Xây dựng Snake, Tetris và phá bỏ nỗi sợ code.',
          sub: 'Học mà chơi',
          link: '/vi-vn/stage-1/'
        },
        {
          title: 'Vibe Coding',
          desc: 'Nắm vững cốt lõi lập trình AI: Prompt Engineering & Context.',
          sub: 'Tư duy cốt lõi',
          link: '/vi-vn/stage-1/'
        }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Dev Sơ/Trung cấp',
      title:
        'Full Stack,<br><span class="highlight">Xây dựng App thực tế.</span>',
      sub: 'Nắm vững tách biệt frontend-backend. Xây dựng dự án thương mại với DB, API và tương tác phức tạp.',
      cards: [
        {
          title: 'Full Stack',
          headline: 'Frontend & Backend.',
          desc: 'Từ thiết kế DB đến API và component, xây dựng trọn vẹn web app hiện đại.',
          link: '/vi-vn/stage-2/'
        },
        {
          title: 'Dự án thực tế',
          headline: 'Không phải code đồ chơi.',
          desc: 'Đi sâu vào Auth, Lưu trữ, Upload file và logic nghiệp vụ cốt lõi.',
          link: '/vi-vn/stage-2/'
        },
        {
          title: 'Triển khai',
          headline: 'Show cho thế giới.',
          desc: 'Cấu hình server, DNS, CI/CD. Chặng cuối của việc giao sản phẩm.',
          link: '/vi-vn/stage-2/'
        }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Dev Cao cấp',
      title:
        'Thực hành nâng cao,<br><span class="highlight">Khả năng vô hạn.</span>',
      sub: 'Mini-app di động & Ứng dụng AI Native. Khám phá kỷ nguyên LLM.',
      cards: [
        {
          title: 'WeChat Mini-app',
          desc: 'Phát triển đa nền tảng, tiếp cận hàng triệu người dùng.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'App AI Native',
          desc: 'RAG, Agent. Khám phá giới hạn của LLM.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'Kiến trúc phức tạp',
          desc: 'Thiết kế kiến trúc chịu tải cao và sẵn sàng cao.',
          link: '/vi-vn/stage-3/'
        },
        {
          title: 'Thương hiệu cá nhân',
          desc: 'Xây dựng website và blog học thuật của riêng bạn.',
          link: '/vi-vn/stage-3/'
        }
      ]
    },
    appendix: {
      cat: 'Appendix · Phụ lục',
      title:
        'Encyclopedia, <br><span class="highlight">Solid Foundation.</span>',
      sub: 'From Computer Networks to AI Principles, complete your tech puzzle.',
      cards: [
        {
          title: 'AI Fundamentals',
          desc: 'LLM, Agent, RAG. Dive into AI internals.',
          link: '/vi-vn/appendix/ai-evolution'
        },
        {
          title: 'Frontend',
          desc: 'Browser internals, Performance, Canvas.',
          link: '/vi-vn/appendix/web-basics'
        },
        {
          title: 'Backend',
          desc: 'High concurrency, Distributed systems, Microservices.',
          link: '/vi-vn/appendix/backend-evolution'
        },
        {
          title: 'General Skills',
          desc: 'Git, Networks, IDE internals.',
          link: '/vi-vn/appendix/git-intro'
        }
      ]
    },
    footer: {
      title: 'Sẵn sàng chưa?',
      desc: 'Easy-Vibe, biến lập trình trở nên tự nhiên như hơi thở.',
      btn: 'Bắt đầu ngay'
    }
  }
}

const t = computed(() => {
  const code = lang.value ? lang.value.toLowerCase() : 'zh-cn'
  return i18n[code] || i18n['en']
})

provide('t', t)

const isCjkLocale = computed(() => {
  const code = lang.value ? lang.value.toLowerCase() : ''
  if (['zh-cn', 'zh-tw', 'ja-jp', 'ko-kr'].includes(code)) {
    return true
  }
  const path = router.route.path.toLowerCase()
  return /^\/(zh-cn|zh-tw|ja-jp|ko-kr)\//.test(path)
})

const topPromo = computed(() => {
  const code = lang.value ? lang.value.toLowerCase() : 'en'
  if (code === 'zh-cn' || code === 'zh-tw') {
    return {
      text: '用 Easy-Vibe 构建你的第一个 AI 应用，最快当天可上线原型。',
      cta: '开始学习 ›',
      link: '/zh-cn/stage-1/learning-map/'
    }
  }
  return {
    text: 'Build your first AI app with Easy-Vibe and ship a working prototype fast.',
    cta: 'Start learning ›',
    link: '/en/stage-1/learning-map/'
  }
})

const appleFooterInfo = computed(() => {
  const locale = lang.value ? lang.value.toLowerCase() : 'zh-cn'
  const content = {
    'zh-cn': {
      notes: [
        '1. 学习路径与章节内容会持续更新，显示内容以当前页面为准。',
        '2. 示例项目与截图用于教学演示，可能与后续版本界面存在差异。',
        '3. 部分章节链接会随着课程迭代调整，建议优先从首页导航进入最新路径。'
      ],
      breadcrumbPrefix: 'Easy-Vibe',
      breadcrumbCurrent: '学习导航',
      columns: [
        {
          title: '学习与导航',
          links: ['零基础入门', '初中级开发', '高级开发', '附录', '学习地图', '课程总览']
        },
        {
          title: '学习支持',
          links: ['常见问题', '学习建议', '章节勘误', '版本更新']
        },
        {
          title: '项目资源',
          links: ['GitHub 仓库', '开源协议', '提交 Issue', '贡献指南']
        },
        {
          title: '社区',
          links: ['学习社群', '讨论区', '课程反馈']
        },
        {
          title: '关于 Easy-Vibe',
          links: ['项目介绍', '更新日志', '联系我们']
        }
      ],
      more: '更多学习方式：访问',
      moreLink: 'GitHub 仓库',
      moreTail: '，获取更新与交流信息。',
      copyright: 'Copyright © 2026 Easy-Vibe. 保留所有权利。',
      policies: ['隐私政策', '使用条款', '网站地图']
    },
    en: {
      notes: [
        '1. Learning paths and chapters are continuously updated.',
        '2. Screenshots and demo projects are for educational illustration.',
        '3. Some chapter links may change as the course evolves.',
        '4. The page is optimized for modern desktop browsers and responsive layouts.'
      ],
      breadcrumbPrefix: 'Easy-Vibe',
      breadcrumbCurrent: 'Learning Navigation',
      columns: [
        {
          title: 'Explore',
          links: ['Foundations', 'Junior/Mid Dev', 'Senior Dev', 'Appendix', 'Learning Map', 'Course Outline']
        },
        {
          title: 'Support',
          links: ['FAQ', 'Learning Tips', 'Errata', 'Release Notes']
        },
        {
          title: 'Resources',
          links: ['GitHub Repository', 'License', 'Report Issue', 'Contribution Guide']
        },
        {
          title: 'Community',
          links: ['Community', 'Discussions', 'Feedback']
        },
        {
          title: 'About Easy-Vibe',
          links: ['Overview', 'Changelog', 'Contact']
        }
      ],
      more: 'More ways to learn: visit',
      moreLink: 'GitHub Repository',
      moreTail: ' for updates and community discussions.',
      copyright: 'Copyright © 2026 Easy-Vibe. All rights reserved.',
      policies: ['Privacy Policy', 'Terms of Use', 'Sitemap']
    }
  }
  return content[locale] || content.en
})

const footerRepositoryLink = computed(() => {
  const locale = lang.value ? lang.value.toLowerCase() : 'zh-cn'
  if (locale === 'zh-cn') {
    return 'https://github.com/datawhalechina/easy-vibe'
  }
  return 'https://github.com/datawhalechina/easy-vibe'
})

const footerPolicyLinkMap = {
  '隐私政策': '#',
  '使用条款': '#',
  '网站地图': '#',
  'Privacy Policy': '#',
  'Terms of Use': '#',
  'Sitemap': '#'
}

const footerColumnLinkMap = {
  '零基础入门': '/zh-cn/stage-1/',
  '初中级开发': '/zh-cn/stage-2/',
  '高级开发': '/zh-cn/stage-3/',
  '附录': '/zh-cn/appendix/',
  '学习地图': '/zh-cn/stage-1/learning-map/',
  '课程总览': '/zh-cn/stage-1/',
  'GitHub 仓库': 'https://github.com/datawhalechina/easy-vibe',
  'Foundations': '/en/stage-1/',
  'Junior/Mid Dev': '/en/stage-2/',
  'Senior Dev': '/en/stage-3/',
  'Appendix': '/en/appendix/',
  'Learning Map': '/en/stage-1/learning-map/',
  'Course Outline': '/en/stage-1/',
  'GitHub Repository': 'https://github.com/datawhalechina/easy-vibe',
  'Overview': '/en/guide/introduction',
  'Changelog': 'https://github.com/datawhalechina/easy-vibe/releases'
}

const getFooterLink = (label) => {
  return footerColumnLinkMap[label] || '#'
}

const getPolicyLink = (label) => {
  return footerPolicyLinkMap[label] || '#'
}

const resolveFooterHref = (link) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  return withBase(link)
}

const locales = [
  { code: 'zh-cn', text: '简体中文' },
  { code: 'en', text: 'English' },
  { code: 'ja-jp', text: '日本語' },
  { code: 'zh-tw', text: '繁體中文' },
  { code: 'ko-kr', text: '한국어' },
  { code: 'es-es', text: 'Español' },
  { code: 'fr-fr', text: 'Français' },
  { code: 'de-de', text: 'Deutsch' },
  { code: 'ar-sa', text: 'العربية' },
  { code: 'vi-vn', text: 'Tiếng Việt' }
]

const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value
}

const updateHash = (id) => {
  const targetHash = id === 'home' ? '#home' : `#${id}`
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const nextUrl = `${window.location.pathname}${window.location.search}${targetHash}`
  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl)
  }
}

const syncTopPromoWithHash = () => {
  const rawHash = window.location.hash.replace(/^#/, '')
  const targetId = rawHash || 'home'
  if (targetId === 'home') {
    topPromoDismissed.value = false
    topPromoProgress.value = 1
    return
  }
  topPromoDismissed.value = true
  topPromoProgress.value = 0
}

const changeLang = (targetLocale) => {
  const currentPath = router.route.path
  // Find current locale based on path prefix
  const currentLocale = locales.find((l) =>
    currentPath.startsWith(`/${l.code}/`)
  )

  let newPath
  if (currentLocale) {
    newPath = currentPath.replace(
      `/${currentLocale.code}/`,
      `/${targetLocale}/`
    )
  } else {
    // Fallback for root path or missing locale prefix
    newPath = `/${targetLocale}/`
  }

  const hash = window.location.hash || ''
  router.go(withBase(`${newPath}${hash}`))
  showLangMenu.value = false
}

const scrollTo = (id) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeTab.value = 'home'
    updateHash('home')
    syncTopPromoWithHash()
    updateTopPromoVisibility()
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const navHeight = 48
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const extraOffset = id === 'vibe-stories' ? 20 : 40
    const offset = elementPosition - navHeight - extraOffset
    window.scrollTo({ top: offset, behavior: 'smooth' })
    activeTab.value = id
    updateHash(id)
    syncTopPromoWithHash()
  }
}

const scrollToHashTarget = (behavior = 'auto') => {
  const rawHash = window.location.hash.replace(/^#/, '')
  const targetId = rawHash || 'home'
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior })
    activeTab.value = 'home'
    syncTopPromoWithHash()
    updateTopPromoVisibility()
    return
  }
  const el = document.getElementById(targetId)
  if (el) {
    const navHeight = 48
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const extraOffset = targetId === 'vibe-stories' ? 20 : 40
    const offset = elementPosition - navHeight - extraOffset
    window.scrollTo({ top: offset, behavior })
    activeTab.value = targetId
    syncTopPromoWithHash()
  }
}

// Close lang menu on click outside
const closeLangMenu = (e) => {
  if (!e.target.closest('.lang-switch-wrapper')) {
    showLangMenu.value = false
  }
}

const updateTopPromoVisibility = () => {
  if (topPromoDismissed.value) {
    topPromoProgress.value = 0
    return
  }
  if (!vibeStoriesSection.value) {
    topPromoProgress.value = 1
    return
  }
  const navHeight = 44
  const sectionTop =
    vibeStoriesSection.value.getBoundingClientRect().top + window.pageYOffset
  const endY = sectionTop - navHeight
  const startY = endY - 96
  const scrollY = window.pageYOffset
  if (scrollY <= startY) {
    topPromoProgress.value = 1
    return
  }
  if (scrollY >= endY) {
    topPromoProgress.value = 0
    topPromoDismissed.value = true
    return
  }
  topPromoProgress.value = (endY - scrollY) / (endY - startY)
}

const topPromoStyle = computed(() => {
  const scrollProgress = topPromoProgress.value
  const introProgress = topPromoIntroProgress.value
  const colorProgress = topPromoColorProgress.value
  const progress = scrollProgress * introProgress
  const scrollOffset = -100 * (1 - scrollProgress)
  const startTextColor = { r: 255, g: 255, b: 255 }
  const endTextColor = { r: 29, g: 29, b: 31 }
  const startBgColor = { r: 0, g: 113, b: 227 }
  const endBgColor = { r: 245, g: 245, b: 247 }
  const startLinkColor = { r: 255, g: 255, b: 255 }
  const endLinkColor = { r: 0, g: 102, b: 204 }
  const textColor = `rgb(${Math.round(startTextColor.r + (endTextColor.r - startTextColor.r) * colorProgress)}, ${Math.round(startTextColor.g + (endTextColor.g - startTextColor.g) * colorProgress)}, ${Math.round(startTextColor.b + (endTextColor.b - startTextColor.b) * colorProgress)})`
  const bgColor = `rgb(${Math.round(startBgColor.r + (endBgColor.r - startBgColor.r) * colorProgress)}, ${Math.round(startBgColor.g + (endBgColor.g - startBgColor.g) * colorProgress)}, ${Math.round(startBgColor.b + (endBgColor.b - startBgColor.b) * colorProgress)})`
  const linkColor = `rgb(${Math.round(startLinkColor.r + (endLinkColor.r - startLinkColor.r) * colorProgress)}, ${Math.round(startLinkColor.g + (endLinkColor.g - startLinkColor.g) * colorProgress)}, ${Math.round(startLinkColor.b + (endLinkColor.b - startLinkColor.b) * colorProgress)})`
  return {
    opacity: progress,
    transform: `translateY(${scrollOffset}%)`,
    maxHeight: `${30 * progress}px`,
    backgroundColor: bgColor,
    color: textColor,
    '--top-promo-link-color': linkColor,
    pointerEvents: progress < 0.02 ? 'none' : 'auto'
  }
})

onMounted(() => {
  const introDuration = 1800
  const colorDelay = 500
  const colorDuration = 1800
  const introStart = performance.now()
  const stepTopPromoIntro = (now) => {
    const raw = Math.min(1, (now - introStart) / introDuration)
    const eased = 1 - Math.pow(1 - raw, 3)
    topPromoIntroProgress.value = eased
    if (raw < 1) {
      topPromoIntroRaf = window.requestAnimationFrame(stepTopPromoIntro)
      return
    }
    topPromoColorTimer = window.setTimeout(() => {
      const colorStart = performance.now()
      const stepTopPromoColor = (time) => {
        const colorRaw = Math.min(1, (time - colorStart) / colorDuration)
        const colorEased = 1 - Math.pow(1 - colorRaw, 3)
        topPromoColorProgress.value = colorEased
        if (colorRaw < 1) {
          topPromoColorRaf = window.requestAnimationFrame(stepTopPromoColor)
        }
      }
      topPromoColorRaf = window.requestAnimationFrame(stepTopPromoColor)
    }, colorDelay)
  }
  topPromoIntroRaf = window.requestAnimationFrame(stepTopPromoIntro)

  const currentPath = window.location.pathname
  const basePath = site.value.base || '/'
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const normalizedPath = currentPath.endsWith('/')
    ? currentPath
    : `${currentPath}/`
  const localeHomeSuffixes = [
    '/zh-cn/',
    '/en/',
    '/zh-tw/',
    '/ja-jp/',
    '/ko-kr/',
    '/es-es/',
    '/fr-fr/',
    '/de-de/',
    '/ar-sa/',
    '/vi-vn/'
  ]
  const isLocaleHome = localeHomeSuffixes.some(
    (suffix) =>
      currentPath.endsWith(suffix) ||
      currentPath.endsWith(`${suffix}index.html`)
  )
  const isRootHome =
    normalizedPath === normalizedBase ||
    currentPath === `${normalizedBase}index.html`
  if (isRootHome && !isLocaleHome) {
    const hasSeenWelcome = window.localStorage.getItem(WELCOME_SEEN_KEY) === '1'
    if (!hasSeenWelcome) {
      router.go(withBase(`/welcome/?next=${encodeURIComponent(currentPath)}`))
      return
    }
  }

  document.addEventListener('click', closeLangMenu)
  if (appendixWrapper.value) {
    appendixWrapper.value.addEventListener('scroll', onAppendixScroll)
    updatePagination()
    window.addEventListener('resize', updatePagination)
  }
  syncTopPromoWithHash()
  window.setTimeout(() => {
    scrollToHashTarget('auto')
  }, 0)
  updateTopPromoVisibility()
  window.addEventListener('scroll', updateTopPromoVisibility, { passive: true })
  window.addEventListener('resize', updateTopPromoVisibility)
  window.addEventListener('hashchange', scrollToHashTarget)
})

onUnmounted(() => {
  if (topPromoIntroRaf) {
    window.cancelAnimationFrame(topPromoIntroRaf)
    topPromoIntroRaf = 0
  }
  if (topPromoColorRaf) {
    window.cancelAnimationFrame(topPromoColorRaf)
    topPromoColorRaf = 0
  }
  if (topPromoColorTimer) {
    window.clearTimeout(topPromoColorTimer)
    topPromoColorTimer = 0
  }
  document.removeEventListener('click', closeLangMenu)
  if (appendixWrapper.value) {
    appendixWrapper.value.removeEventListener('scroll', onAppendixScroll)
  }
  window.removeEventListener('resize', updatePagination)
  window.removeEventListener('scroll', updateTopPromoVisibility)
  window.removeEventListener('resize', updateTopPromoVisibility)
  window.removeEventListener('hashchange', scrollToHashTarget)
})

// Stage 1: 产品经理 (Web 原型)
const stage1Cards = [
  {
    title: 'AI 产品经理',
    desc: '从想法到高保真原型，你只需要会说话。',
    sub: '适合非技术背景',
    color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    icon: '🎨',
    link: '/zh-cn/stage-1/learning-map/'
  },
  {
    title: '游戏化入门',
    desc: '通过制作贪吃蛇、俄罗斯方块，打破对代码的恐惧。',
    sub: '边玩边学',
    color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    icon: '🎮',
    link: '/zh-cn/stage-1/ai-capabilities-through-games/'
  },
  {
    title: 'Vibe Coding',
    desc: '掌握 AI 时代的编程核心：提示词工程与上下文管理。',
    sub: '核心心法',
    color: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    icon: '💡',
    link: '/zh-cn/stage-1/introduction-to-ai-ide/'
  }
]

// Stage 2: 初中级开发 (全栈)
const stage2Cards = [
  {
    imageColor: '#E0C3FC',
    image: stage2LovartCover,
    imageAlt: 'Lovart 素材生产 Agent 界面截图',
    link: '/zh-cn/stage-2/frontend/lovart-assets/'
  },
  {
    imageColor: '#D8C4F8',
    image: stage2FigmaCover,
    imageAlt: 'Figma 与 MasterGo 设计工具截图',
    link: '/zh-cn/stage-2/frontend/figma-mastergo/'
  },
  {
    imageColor: '#C7DDFB',
    image: stage2DesignToCodeCover,
    imageAlt: '设计稿转代码示意截图',
    link: '/zh-cn/stage-2/frontend/design-to-code/'
  },
  {
    imageColor: '#8EC5FC',
    image: stage2SupabaseCover,
    imageAlt: 'Supabase 数据库控制台截图',
    link: '/zh-cn/stage-2/backend/database-supabase/'
  },
  {
    imageColor: '#96E6A1',
    image: stage2ZeaburCover,
    imageAlt: 'Zeabur 部署流程截图',
    link: '/zh-cn/stage-2/backend/zeabur-deployment/'
  },
  {
    imageColor: '#A7F3D0',
    image: stage2DifyCover,
    imageAlt: 'Dify 知识库工作台截图',
    link: '/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/'
  }
]

const localizedStage2Cards = computed(() => {
  return t.value.stage2.cards.map((card, index) => {
    const visual = stage2Cards.find((item) => item.link === card.link) || stage2Cards[index]
    return {
      ...card,
      ...visual
    }
  })
})

// Stage 3: 高级开发 (小程序 & AI)
const stage3Cards = [
  {
    title: '跨平台桌面应用',
    desc: '用 Electron 做语音转文字桌面程序，一次开发同时跑在 Windows、macOS、Linux。',
    tag: 'Stage 3',
    visualType: 'phone',
    image: stage3ElectronCover,
    imageAlt: 'Electron 语音转文字桌面应用预览图',
    link: '/zh-cn/stage-3/cross-platform/electron-voice-to-text/'
  },
  {
    title: 'AI 智能体团队',
    desc: '用 Claude Agent Teams 组建 AI 开发小队，多代理协作完成大型任务。',
    tag: 'Advanced',
    visualType: 'ai',
    image: stage3AgentTeamsCover,
    imageAlt: 'Claude Agent Teams 协作流程封面图',
    link: '/zh-cn/stage-3/core-skills/agent-teams/'
  },
  {
    title: '长效稳定执行',
    desc: '用循环脚本和 Ralph 插件管理长时间任务，让 Claude Code 过夜稳定跑完工作。',
    tag: 'Architecture',
    visualType: 'arch',
    image: stage3LongRunningCover,
    imageAlt: 'Claude Code 长时间执行与循环任务封面图',
    link: '/zh-cn/stage-3/core-skills/long-running-tasks/'
  },
  {
    title: '个人品牌与输出',
    desc: '搭建个人网站与技术博客，让你的项目和经验长期沉淀并被更多人看到。',
    tag: 'Brand',
    visualType: 'brand',
    image: stage3PersonalBrandCover,
    imageAlt: '个人网站与学术博客示例截图',
    imageClass: 'prod-image--personal-brand',
    link: '/zh-cn/stage-3/personal-brand/personal-website-blog/'
  }
]

// Appendix: 附录
const appendixCards = [
  {
    title: '人工智能',
    desc: 'LLM、Agent、RAG，深入 AI 底层原理。',
    tag: 'AI',
    link: '/zh-cn/appendix/8-artificial-intelligence/ai-history'
  },
  {
    title: '提示词工程',
    desc: '掌握与 AI 高效对话的技巧，解锁潜力。',
    tag: 'AI',
    link: '/zh-cn/appendix/8-artificial-intelligence/prompt-engineering'
  },
  {
    title: '大语言模型',
    desc: '深入浅出解析 LLM 的工作原理与应用。',
    tag: 'AI',
    link: '/zh-cn/appendix/8-artificial-intelligence/llm-principles'
  },
  {
    title: 'Agent 智能体',
    desc: '探索具备自主决策与执行能力的 AI 架构。',
    tag: 'AI',
    link: '/zh-cn/appendix/8-artificial-intelligence/ai-agents'
  },
  {
    title: '前端基础',
    desc: 'HTML/CSS/JS 三大基石，入门必修课。',
    tag: 'Frontend',
    link: '/zh-cn/appendix/3-browser-and-frontend/javascript-deep-dive'
  },
  {
    title: '前端进化史',
    desc: '了解前端技术栈演变，把握发展趋势。',
    tag: 'Frontend',
    link: '/zh-cn/appendix/3-browser-and-frontend/frontend-frameworks'
  },
  {
    title: '后端架构',
    desc: '从单体到微服务，探索架构演进之路。',
    tag: 'Backend',
    link: '/zh-cn/appendix/4-server-and-backend/backend-layered-architecture'
  },
  {
    title: '后端语言',
    desc: '对比主流后端语言特性，选择最佳技术栈。',
    tag: 'Backend',
    link: '/zh-cn/appendix/4-server-and-backend/backend-languages'
  },
  {
    title: '数据库原理',
    desc: '理解数据库核心原理，掌握数据存储艺术。',
    tag: 'Database',
    link: '/zh-cn/appendix/5-data/database-fundamentals'
  },
  {
    title: 'API 设计',
    desc: 'API 接口设计与开发的基础知识。',
    tag: 'API',
    link: '/zh-cn/appendix/4-server-and-backend/api-intro'
  },
  {
    title: 'Git 版本控制',
    desc: '深入理解 Git 原理与高级用法。',
    tag: 'General',
    link: '/zh-cn/appendix/2-development-tools/git-version-control'
  },
  {
    title: '计算机网络',
    desc: '网络协议与通信原理的基础知识。',
    tag: 'General',
    link: '/zh-cn/appendix/1-computer-fundamentals/computer-networks'
  }
]
</script>

<template>
  <div class="apple-container">
    <!-- Sticky Navigation -->
    <nav class="sticky-nav glass">
      <div class="nav-content">
        <div class="nav-cluster">
          <div
            class="nav-title"
            :aria-label="t.nav.title"
          >
            <img
              class="nav-title-logo no-viewer"
              :src="withBase('/assets/easy-vibe-logo-hd.svg')"
              :alt="t.nav.title"
              width="64"
              height="30"
              draggable="false"
            >
          </div>
          <div class="nav-links">
            <button
              :class="{ active: activeTab === 'home' }"
              class="nav-link-item"
              @click="scrollTo('home')"
            >
              {{ t.nav.home }}
            </button>
            <button
              :class="{ active: activeTab === 'vibe-stories' }"
              class="nav-link-item"
              @click="scrollTo('vibe-stories')"
            >
              {{ t.nav.stories || 'Vibe 故事' }}
            </button>
            <button
              :class="{ active: activeTab === 'pm' }"
              class="nav-link-item"
              @click="scrollTo('pm')"
            >
              {{ t.nav.pm }}
            </button>
            <button
              :class="{ active: activeTab === 'junior' }"
              class="nav-link-item"
              @click="scrollTo('junior')"
            >
              {{ t.nav.junior }}
            </button>
            <button
              :class="{ active: activeTab === 'senior' }"
              class="nav-link-item"
              @click="scrollTo('senior')"
            >
              {{ t.nav.senior }}
            </button>
            <button
              :class="{ active: activeTab === 'appendix' }"
              class="nav-link-item"
              @click="scrollTo('appendix')"
            >
              {{ t.nav.appendix }}
            </button>
          </div>
          <div class="nav-action">
            <div class="nav-icons">
              <div class="lang-switch-wrapper">
                <button
                  type="button"
                  class="button"
                  aria-haspopup="true"
                  :aria-expanded="showLangMenu"
                  aria-label="Change language"
                  @click.stop="toggleLangMenu"
                >
                  <span class="text">
                    <span class="vpi-languages option-icon" />
                    <span class="vpi-chevron-down text-icon" />
                  </span>
                </button>
                <div
                  v-if="showLangMenu"
                  class="lang-dropdown glass"
                >
                  <button
                    v-for="locale in locales"
                    :key="locale.code"
                    class="lang-item"
                    @click="changeLang(locale.code)"
                  >
                    {{ locale.text }}
                  </button>
                </div>
              </div>
              <GitHubStars class="nav-github-stars" />
            </div>
            <a
              class="buy-btn"
              :href="withBase(t.stage1.cards[0].link)"
            >{{ t.footer.btn }}</a>
          </div>
        </div>
      </div>
      <div
        class="nav-promo"
        :style="topPromoStyle"
      >
        <span>{{ topPromo.text }}</span>
        <a :href="resolveFooterHref(topPromo.link)">{{ topPromo.cta }}</a>
      </div>
    </nav>

    <!-- Home Anchor -->
    <div
      id="home"
      style="height: 0"
    />

    <!-- Vibe Stories -->
    <section
      id="vibe-stories"
      ref="vibeStoriesSection"
      class="section-container"
    >
      <VibeStories />
    </section>

    <div class="section-band section-band-learning">
      <!-- Stage 1: Product Manager -->
      <section id="pm" class="section-container section-pm">
        <div class="section-header">
          <h2 class="section-category">
            {{ t.stage1.cat }}
          </h2>
          <h3
            class="section-headline"
            v-html="t.stage1.title"
          />
          <p class="section-sub">
            {{ t.stage1.sub }}
          </p>
        </div>

        <div class="feature-grid">
          <a
            v-for="(card, i) in stage1Cards"
            :key="i"
            :href="withBase(t.stage1.cards[i].link)"
            class="feature-card glass"
          >
            <div
              class="feature-icon"
              :style="{ background: card.color }"
            >
              {{ card.icon }}
            </div>
            <div class="feature-content">
              <h4>{{ t.stage1.cards[i].title }}</h4>
              <p>{{ t.stage1.cards[i].desc }}</p>
            </div>
          </a>
        </div>
      </section>

      <!-- Stage 2: Junior/Mid Dev -->
      <section
        id="junior"
        class="section-container section-junior"
      >
        <div class="section-header">
          <h2 class="section-category">
            {{ t.stage2.cat }}
          </h2>
          <h3
            class="section-headline"
            v-html="t.stage2.title"
          />
          <p class="section-sub">
            {{ t.stage2.sub }}
          </p>
        </div>

        <div class="comm-grid">
          <a
            v-for="(card, index) in localizedStage2Cards"
            :key="index"
            :href="withBase(card.link)"
            class="comm-card glass"
          >
            <div
              class="comm-visual"
              :style="{ backgroundColor: card.imageColor }"
            >
              <img
                :src="card.image"
                :alt="card.imageAlt || card.title"
                loading="lazy"
              >
            </div>
            <div class="comm-text">
              <h4 class="comm-title">{{ card.title }}</h4>
              <p class="comm-desc">{{ card.desc }}</p>
              <span class="comm-note">进一步了解 ›</span>
            </div>
          </a>
        </div>
      </section>
    </div>

    <!-- Stage 3: Senior Dev -->
    <section
      id="senior"
      class="section-container section-senior"
    >
      <div class="section-header">
        <h2 class="section-category">
          {{ t.stage3.cat }}
        </h2>
        <h3
          class="section-headline"
          v-html="t.stage3.title"
        />
        <p class="section-sub">
          {{ t.stage3.sub }}
        </p>
      </div>

      <div class="scroll-container">
        <div class="scroll-track">
          <a
            v-for="(card, index) in stage3Cards"
            :key="index"
            :href="withBase(t.stage3.cards[index].link)"
            class="prod-card glass"
          >
            <div class="prod-tag">{{ card.tag }}</div>
            <h4>{{ t.stage3.cards[index].title }}</h4>
            <p>{{ t.stage3.cards[index].desc }}</p>
            <div class="prod-visual">
              <img
                :src="card.image"
                :alt="card.imageAlt"
                :class="card.imageClass"
                loading="lazy"
              >
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Appendix -->
    <section
      id="appendix"
      class="section-container section-appendix"
    >
      <div class="section-header">
        <h2 class="section-category">
          {{ t.appendix.cat }}
        </h2>
        <h3
          class="section-headline"
          v-html="t.appendix.title"
        />
        <p class="section-sub">
          {{ t.appendix.sub }}
        </p>
      </div>

      <div
        ref="appendixWrapper"
        class="appendix-scroll-wrapper"
      >
        <div class="appendix-track">
          <a
            v-for="(card, index) in t.appendix.cards"
            :key="index"
            :href="withBase(card.link)"
            class="appendix-card"
          >
            <span class="appendix-emoji">{{
              ['🤖', '🧠', '🎨', '🚀', '⚙️', '💾', '🛠️', '🌐'][index] || '📚'
            }}</span>
            <span class="appendix-title">{{ card.title }}</span>
          </a>
        </div>
      </div>

      <div
        v-if="totalPages > 1"
        class="appendix-scroll-hint"
      >
        <div class="appendix-progress-track">
          <div
            class="appendix-progress-thumb"
            :style="{
              width: `${100 / totalPages}%`,
              transform: `translateX(${currentPage * 100}%)`
            }"
          />
        </div>
        <div class="appendix-scroll-actions">
          <button
            class="appendix-arrow-btn"
            :class="{ disabled: currentPage === 0 }"
            :disabled="currentPage === 0"
            aria-label="向左滑动"
            @click="scrollAppendixByPage(-1)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M11.5 5.5L7 10L11.5 14.5"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="appendix-arrow-btn"
            :class="{ disabled: currentPage >= totalPages - 1 }"
            :disabled="currentPage >= totalPages - 1"
            aria-label="向右滑动"
            @click="scrollAppendixByPage(1)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.5 5.5L13 10L8.5 14.5"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer Callout -->
    <div class="footer-callout">
      <h2 v-html="t.footer.title" />
      <p>{{ t.footer.desc }}</p>
      <a
        class="buy-btn large"
        :href="withBase('/zh-cn/stage-1/learning-map/')"
      >{{ t.footer.btn }}</a>
    </div>

    <div
      class="apple-site-footer"
      :class="{ 'is-cjk-locale': isCjkLocale }"
    >
      <div class="apple-site-footer-inner">
        <div class="apple-footer-breadcrumb">
          <span>⌘</span>
          <span>›</span>
          <span>{{ appleFooterInfo.breadcrumbPrefix }}</span>
          <span>›</span>
          <span>{{ appleFooterInfo.breadcrumbCurrent }}</span>
        </div>

        <div class="apple-footer-notes">
          <p
            v-for="(item, idx) in appleFooterInfo.notes"
            :key="idx"
          >
            {{ item }}
          </p>
        </div>

        <div class="apple-footer-grid">
          <div
            v-for="(column, index) in appleFooterInfo.columns"
            :key="index"
            class="apple-footer-column"
          >
            <h4>{{ column.title }}</h4>
            <a
              v-for="(link, linkIndex) in column.links"
              :key="linkIndex"
              :href="resolveFooterHref(getFooterLink(link))"
            >
              {{ link }}
            </a>
          </div>
        </div>

        <div class="apple-footer-more">
          {{ appleFooterInfo.more }}
          <a :href="footerRepositoryLink">{{ appleFooterInfo.moreLink }}</a>
          {{ appleFooterInfo.moreTail }}
        </div>

        <div class="apple-footer-bottom">
          <p>{{ appleFooterInfo.copyright }}</p>
          <div class="apple-footer-policy">
            <a
              v-for="(policy, policyIndex) in appleFooterInfo.policies"
              :key="policyIndex"
              :href="resolveFooterHref(getPolicyLink(policy))"
            >
              {{ policy }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
.apple-container {
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC',
    'Helvetica Neue', sans-serif;
  color: var(--vp-c-text-1);
  background: transparent;
}

#vibe-stories,
#vibe-stories:focus,
#vibe-stories:focus-visible,
#vibe-stories:target {
  outline: none !important;
  box-shadow: none !important;
}

a {
  text-decoration: none;
  color: inherit;
}

:is(.feature-card, .comm-card, .prod-card, .appendix-card, .buy-btn) {
  border-bottom: none !important;
  outline: none !important;
  -webkit-tap-highlight-color: transparent;
}

:is(
    .feature-card,
    .comm-card,
    .prod-card,
    .appendix-card,
    .buy-btn
  ):is(:hover, :focus, :focus-visible, :active) {
  border-bottom-color: transparent !important;
  text-decoration: none !important;
  outline: none !important;
}

.highlight {
  color: var(--vp-c-text-2);
}

/* Sticky Nav */
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #d2d2d7;
  transition: all 0.3s ease;
  background: rgba(245, 245, 247, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Dark mode adjustment for glass effect */
:root.dark .sticky-nav {
  background: rgba(18, 18, 20, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.nav-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 28px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.nav-cluster {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 100%;
}

.nav-title {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: default;
  display: inline-flex;
  align-items: center;
}

.nav-title-logo {
  display: block;
  max-width: 64px !important;
  max-height: 30px !important;
  height: 30px !important;
  width: 64px !important;
  min-width: 64px;
  min-height: 30px;
  object-fit: contain;
  flex: 0 0 auto;
  filter: grayscale(1) brightness(0.28) contrast(1.05);
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
  white-space: nowrap;
}

.nav-links button,
.nav-link-item {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--vp-c-text-1) !important;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-weight: 400;
  opacity: 0.76;
  text-decoration: none;
}

.nav-links button:hover,
.nav-links button.active,
.nav-link-item:hover {
  color: var(--vp-c-text-1) !important;
  opacity: 1;
}

.nav-action {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

:deep(.nav-github-stars) {
  display: flex;
  align-items: center;
}

:deep(.nav-github-stars .github-stars-link) {
  color: var(--vp-c-text-1) !important;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

:deep(.nav-github-stars .github-stars-link:hover) {
  opacity: 0.7;
}

:deep(.nav-github-stars .github-stars-wrapper) {
  padding-left: 0 !important;
}

.nav-promo {
  height: 30px;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: #1d1d1f;
  padding: 0 16px;
  overflow: hidden;
  transform-origin: top center;
  position: relative;
  z-index: 1;
  will-change: transform, opacity, max-height, background-color, color;
  transition:
    transform 0.16s ease-out,
    opacity 0.16s ease-out,
    max-height 0.16s ease-out,
    background-color 0.22s ease-out,
    color 0.22s ease-out;
}

.nav-promo a {
  color: var(--top-promo-link-color, #0066cc);
  text-decoration: none;
  transition: color 0.25s ease-out;
}

.button {
  background: none;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1) !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.7;
}

.button .text {
  display: flex;
  align-items: center;
  gap: 2px;
}

.button .option-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-text-1) !important;
}

.button .text-icon {
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-1) !important;
}

/* Lang Switcher */
.lang-switch-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: -10px; /* Align slightly to right */
  margin-top: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 6px;
  min-width: 140px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 20;
}

.lang-item {
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  transition: background 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.lang-item:hover {
  background: var(--vp-c-bg-soft);
}

.buy-btn {
  background: #0071e3;
  color: #fff !important;
  padding: 7px 16px;
  border-radius: 980px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s ease;
}

.buy-btn:hover {
  background: #0077ed;
  transform: scale(1.02);
}

.buy-btn.large {
  padding: 12px 24px;
  font-size: 15px;
  margin-top: 20px;
  display: inline-block;
}

/* Sections General */
.section-container {
  max-width: 1280px;
  margin: 0 auto 96px;
  padding: 0 40px;
}

.section-band-learning {
  width: 100vw;
  max-width: none;
  margin: 0 calc(50% - 50vw) 96px;
  background: #f5f5f7;
  border-radius: 0;
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: max(40px, calc((100vw - 1280px) / 2 + 40px));
  padding-right: max(40px, calc((100vw - 1280px) / 2 + 40px));
}

.section-band-learning .section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
}

.section-band-learning .section-junior {
  margin-top: 72px;
}

.section-appendix {
  background: transparent;
  border-radius: 0;
  padding-top: 64px;
  padding-bottom: 64px;
}

.dark .section-band-learning {
  background: rgba(255, 255, 255, 0.03);
}

.dark .section-appendix {
  background: transparent;
}

.section-header {
  margin-bottom: 44px;
}

.section-category {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 14px;
  border: none;
  padding: 0;
  color: #1d1d1f;
  letter-spacing: -0.024em;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.section-headline {
  font-size: 64px;
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.034em;
  margin-bottom: 12px;
  color: #1d1d1f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.section-sub {
  font-size: 21px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #6e6e73;
  max-width: 760px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC',
    sans-serif;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  height: 500px;
}

.bento-item {
  border-radius: 30px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  color: #1d1d1f; /* Force dark text on colorful backgrounds */
  display: block;
}

.bento-item:hover {
  transform: scale(1.02);
}

.bento-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bento-item.small {
  flex: 1;
  padding: 30px;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
}

.bento-item h4 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.2;
}

.bento-item p {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  opacity: 0.8;
}

.card-sub {
  position: absolute;
  bottom: 40px;
  font-size: 14px;
  opacity: 0.6;
}

/* Communication Grid (Now used for Stage 2) */
.comm-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  width: calc(100% + 40px);
  margin: 0 -20px;
  padding: 12px 20px 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.comm-grid::-webkit-scrollbar {
  display: none;
}

.comm-card {
  flex: 0 0 380px;
  border-radius: 32px;
  overflow: hidden;
  background: #fff;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.025);
  transition: transform 0.3s;
  transform-origin: center top;
  display: block;
  scroll-snap-align: start;
}

.comm-card:hover {
  transform: scale(1.015);
}

.comm-visual {
  height: 220px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.comm-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
}

.comm-text {
  padding: 26px 26px 30px;
}

.comm-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.comm-desc {
  font-size: 16px;
  color: #6e6e73;
  margin-bottom: 20px;
  line-height: 1.5;
}

.comm-note {
  font-size: 17px;
  color: #0066cc;
  letter-spacing: -0.01em;
}

/* Productivity Scroll (Now used for Stage 3) */
.scroll-container {
  overflow-x: auto;
  padding-bottom: 40px;
  margin: 0 -20px;
  padding: 12px 20px 40px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-track {
  display: flex;
  gap: 24px;
  width: max-content;
}

.prod-card {
  width: 300px;
  height: 400px;
  border-radius: 32px;
  background: #f7f7f9;
  padding: 30px;
  scroll-snap-align: center;
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
  transform-origin: center top;
  border: 1px solid rgba(0, 0, 0, 0.025);
  box-shadow: none;
}

.prod-card:hover {
  transform: scale(1.015);
}

.prod-tag {
  font-size: 12px;
  font-weight: 600;
  color: #6e6e73;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.prod-card h4 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.prod-card p {
  color: #6e6e73;
  font-size: 16px;
  line-height: 1.5;
}

.prod-visual {
  margin-top: auto;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #dbeafe 0%, #e5e7eb 100%);
}

.prod-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.prod-visual img.prod-image--personal-brand {
  transform: scale(1.18) translateY(-10px);
  transform-origin: center top;
}

/* Appendix Horizontal Scroll */
.appendix-scroll-wrapper {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin: 0 -20px;
  padding: 0 20px 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overscroll-behavior-x: contain;
}

.appendix-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.appendix-track {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: max-content;
}

.appendix-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  text-decoration: none !important;
  color: inherit !important;
  background: transparent;
  padding: 0;
  border: 0;
  box-shadow: none;
  scroll-snap-align: start;
  width: 120px;
  min-height: 120px;
  transition: transform 0.25s ease;
  text-align: center;
}

.appendix-card:hover {
  transform: scale(1.03);
}

.appendix-emoji {
  font-size: 52px;
  line-height: 1;
  display: block;
}

.appendix-title {
  font-weight: 600;
  color: #3c3c43;
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  letter-spacing: -0.01em;
  white-space: normal;
}

.appendix-scroll-hint {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 20px;
  min-height: 40px;
}

.appendix-progress-track {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 4px;
  border-radius: 999px;
  background: rgba(60, 60, 67, 0.08);
  overflow: hidden;
}

.appendix-progress-thumb {
  height: 100%;
  border-radius: inherit;
  background: rgba(60, 60, 67, 0.28);
  transition: transform 0.25s ease;
}

.appendix-scroll-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 56px;
}

.appendix-arrow-btn {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(60, 60, 67, 0.05);
  background: rgba(60, 60, 67, 0.05);
  color: rgba(60, 60, 67, 0.62);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.appendix-arrow-btn:hover {
  background: rgba(255, 255, 255, 0.78);
  border-color: rgba(60, 60, 67, 0.08);
  color: rgba(60, 60, 67, 0.74);
  transform: scale(1.04);
}

.appendix-arrow-btn.disabled,
.appendix-arrow-btn:disabled {
  opacity: 0.42;
  cursor: default;
  transform: none;
}

.appendix-arrow-btn.disabled:hover,
.appendix-arrow-btn:disabled:hover {
  background: rgba(60, 60, 67, 0.05);
  color: rgba(60, 60, 67, 0.62);
}

/* Footer */
.footer-callout {
  text-align: center;
  padding: 92px 20px;
  background: #fff;
  margin: 0 40px 64px;
  border-radius: 40px;
}

.footer-callout h2 {
  font-size: 62px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #1d1d1f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.footer-callout p {
  color: #6e6e73;
  font-size: 20px;
  margin-bottom: 18px;
}

.apple-site-footer {
  max-width: 1060px;
  margin: 0 auto 56px;
  padding: 0 40px;
}

.apple-site-footer-inner {
  border-top: 1px solid #d2d2d7;
  color: #6e6e73;
  font-size: 12px;
}

.apple-footer-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6e6e73;
  font-size: 12px;
  padding-top: 12px;
}

.apple-site-footer.is-cjk-locale .apple-footer-breadcrumb {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.apple-footer-notes {
  padding-top: 18px;
}

.apple-footer-notes p {
  margin: 0 0 8px;
  line-height: 1.45;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-notes p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.88;
  letter-spacing: 0.03em;
  font-weight: 400;
  color: #7d7d83;
}

.apple-footer-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 22px;
}

.apple-footer-column h4 {
  margin: 0 0 10px;
  color: #1d1d1f;
  font-size: 12px;
  font-weight: 600;
}

.apple-site-footer.is-cjk-locale .apple-footer-column h4 {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: 0.025em;
}

.apple-footer-column a {
  display: block;
  color: #424245;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.25;
}

.apple-site-footer.is-cjk-locale .apple-footer-column a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
  margin-bottom: 9px;
}

.apple-footer-column a:hover {
  color: #0066cc;
}

.apple-footer-more {
  margin-top: 18px;
  border-top: 1px solid #d2d2d7;
  padding-top: 14px;
  color: #6e6e73;
}

.apple-site-footer.is-cjk-locale .apple-footer-more {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
}

.apple-footer-more a {
  color: #0066cc;
}

.apple-footer-bottom {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #d2d2d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.apple-footer-bottom p {
  margin: 0;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-bottom p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

.apple-footer-policy {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.apple-footer-policy a {
  color: #424245;
}

.apple-footer-policy a:hover {
  color: #0066cc;
}

.apple-site-footer.is-cjk-locale .apple-footer-policy a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

@media (min-width: 1024px) {
  .apple-site-footer {
    max-width: 996px;
    padding: 0 24px;
  }

  .apple-site-footer-inner {
    font-size: 11px;
  }

  .apple-footer-notes p {
    font-size: 11px;
    line-height: 1.38;
    margin-bottom: 6px;
  }

  .apple-footer-grid {
    grid-template-columns: 1.2fr repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .apple-footer-column h4 {
    font-size: 11px;
    margin-bottom: 8px;
  }

  .apple-footer-column a {
    font-size: 11px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .apple-site-footer-inner {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-notes p {
    font-size: 13px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column h4 {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column a {
    font-size: 13px;
    margin-bottom: 8px;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .section-headline {
    font-size: 42px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    height: auto;
  }

  .nav-links {
    display: none;
  }

  .nav-promo {
    font-size: 12px;
    height: 28px;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
  }

  .section-appendix {
    padding-top: 42px;
    padding-bottom: 42px;
  }

  .section-band-learning {
    margin-bottom: 96px;
    padding-top: 42px;
    padding-bottom: 42px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-band-learning .section-junior {
    margin-top: 56px;
  }

  .footer-callout {
    margin: 0 16px 40px;
    border-radius: 28px;
  }

  .footer-callout h2 {
    font-size: 38px;
  }

  .footer-callout p {
    font-size: 17px;
  }

  .apple-site-footer {
    padding: 0 16px;
  }

  .apple-footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 14px;
  }

  .apple-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<style>
/* Global layout fix for fixed nav */
.VPHome {
  padding-top: 84px !important;
}
</style>

<style scoped>
/* Feature Grid (Apple Store Style) */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: #fff;
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  box-shadow: none;
  height: 100%;
  position: relative;
  overflow: hidden;
  text-decoration: none !important;
  border: 1px solid rgba(0, 0, 0, 0.025);
}

.dark .feature-card {
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: var(--vp-c-bg-mute);
}

.feature-card:hover {
  transform: scale(1.015);
  box-shadow: none;
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 24px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.feature-content {
  display: flex;
  flex-direction: column;
}

.feature-content h4 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1d1d1f;
  line-height: 1.3;
  letter-spacing: -0.024em;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.feature-content p {
  font-size: 17px;
  color: #6e6e73;
  line-height: 1.6;
  margin-top: 4px;
  margin-bottom: 0;
}

@media (max-width: 960px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .comm-card {
    flex-basis: 340px;
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .feature-card {
    padding: 24px;
  }

  .comm-card {
    flex-basis: min(86vw, 340px);
  }
}
</style>
