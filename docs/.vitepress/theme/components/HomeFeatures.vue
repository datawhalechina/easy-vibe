<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, withBase, useData } from 'vitepress'
import GitHubStars from './GitHubStars.vue'

const router = useRouter()
const { site, page, lang } = useData()
const activeTab = ref('home')
const showLangMenu = ref(false)

const i18n = {
  'zh-cn': {
    nav: {
      title: 'Easy-Vibe 教程',
      home: '首页',
      pm: '产品经理',
      junior: '初中级开发',
      senior: '高级开发',
      appendix: '附录',
      start: '开始学习'
    },
    stage1: {
      cat: 'Stage 1 · 产品经理',
      title: '零基础入门，<br><span class="highlight">做自己的产品经理。</span>',
      sub: '不需要计算机专业背景，只要会说话，就能通过 AI 将你的创意转化为高保真的 Web 原型。',
      cards: [
        { title: 'AI 产品经理', desc: '从想法到高保真原型，你只需要会说话。', sub: '适合非技术背景', link: '/zh-cn/stage-0/0.1-learning-map/' },
        { title: '游戏化入门', desc: '通过制作贪吃蛇、俄罗斯方块，打破对代码的恐惧。', sub: '边玩边学', link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/' },
        { title: 'Vibe Coding', desc: '掌握 AI 时代的编程核心：提示词工程与上下文管理。', sub: '核心心法', link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中级开发',
      title: '深入全栈，<br><span class="highlight">构建真实应用。</span>',
      sub: '掌握前后端分离架构，亲手打造包含数据库、API 和复杂交互的完整商业级项目。',
      cards: [
        { title: '全栈开发', headline: '独立完成前后端。', desc: '从数据库设计到 API 开发，再到前端组件化，完整构建一个现代化 Web 应用。', link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/' },
        { title: '真实项目', headline: '拒绝玩具代码。', desc: '深入理解用户鉴权、数据存储、文件上传等核心业务逻辑。', link: '/zh-cn/stage-2/backend/2.2-database-supabase/chapter5/chapter5-from-database-to-supabase' },
        { title: '部署上线', headline: '让世界看到你的作品。', desc: '学习服务器配置、域名解析和自动化部署，打通产品落地的最后一公里。', link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 高级开发',
      title: '高阶实战，<br><span class="highlight">挑战无限可能。</span>',
      sub: '进军移动端小程序与 AI 原生应用开发，探索大模型时代的无限机遇。',
      cards: [
        { title: '微信小程序', desc: '跨平台开发，触达亿级用户。', link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/' },
        { title: 'AI 原生应用', desc: 'RAG、Agent，探索 LLM 的无限可能。', link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/extra5-what-is-rag-and-how-does-it-work-and-future' },
        { title: '复杂业务架构', desc: '应对高并发、高可用场景的架构设计。', link: '/zh-cn/stage-3/core-skills/3.2-long-running-tasks/' },
        { title: '个人品牌', desc: '构建属于自己的个人网页与学术博客。', link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/' }
      ]
    },
    footer: {
      title: '准备好开始了吗？',
      desc: 'Easy-Vibe，让编程像呼吸一样自然。',
      btn: '立即开启'
    }
  },
  'en-us': {
    nav: {
      title: 'Easy-Vibe Tutorial',
      home: 'Home',
      pm: 'Product Manager',
      junior: 'Junior Dev',
      senior: 'Senior Dev',
      appendix: 'Appendix',
      start: 'Start Learning'
    },
    stage1: {
      cat: 'Stage 1 · Product Manager',
      title: 'Zero to Hero, <br><span class="highlight">Be Your Own PM.</span>',
      sub: 'No CS background needed. Just speak your idea, and AI will turn it into high-fidelity web prototypes.',
      cards: [
        { title: 'AI Product Manager', desc: 'From idea to prototype, just by speaking.', sub: 'Non-tech friendly', link: '/en-us/stage-0/' },
        { title: 'Gamified Intro', desc: 'Build Snake, Tetris, and break the fear of code.', sub: 'Learn by playing', link: '/en-us/stage-0/' },
        { title: 'Vibe Coding', desc: 'Master the core of AI coding: Prompt Engineering & Context.', sub: 'Core Mindset', link: '/en-us/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Junior/Mid Dev',
      title: 'Go Full Stack, <br><span class="highlight">Build Real Apps.</span>',
      sub: 'Master frontend-backend separation. Build commercial-grade projects with DB, API, and complex interactions.',
      cards: [
        { title: 'Full Stack', headline: 'Frontend & Backend.', desc: 'From DB design to API and components, build a modern web app completely.', link: '/en-us/stage-2/' },
        { title: 'Real Projects', headline: 'No Toy Code.', desc: 'Deep dive into Auth, Storage, File Uploads and core business logic.', link: '/en-us/stage-2/' },
        { title: 'Deployment', headline: 'Show the World.', desc: 'Server config, DNS, CI/CD. The last mile of product delivery.', link: '/en-us/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Senior Dev',
      title: 'Advanced Practice, <br><span class="highlight">Infinite Possibilities.</span>',
      sub: 'Mobile Mini-programs & AI Native Apps. Explore the era of LLMs.',
      cards: [
        { title: 'WeChat Mini-app', desc: 'Cross-platform dev, reaching millions of users.', link: '/en-us/stage-3/' },
        { title: 'AI Native Apps', desc: 'RAG, Agent. Explore the limits of LLMs.', link: '/en-us/stage-3/' },
        { title: 'Complex Arch', desc: 'High concurrency, High availability architecture design.', link: '/en-us/stage-3/' },
        { title: 'Personal Brand', desc: 'Build your own website and academic blog.', link: '/en-us/stage-3/' }
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
      pm: 'プロダクトマネージャー',
      junior: '初中級開発者',
      senior: '上級開発者',
      appendix: '付録',
      start: '学習を開始'
    },
    stage1: {
      cat: 'Stage 1 · プロダクトマネージャー',
      title: 'ゼロからの入門、<br><span class="highlight">自分だけのPMになる。</span>',
      sub: 'CSの背景は不要。アイデアを話すだけで、AIが高精度のWebプロトタイプに変換します。',
      cards: [
        { title: 'AI PM', desc: 'アイデアからプロトタイプまで、話すだけ。', sub: '非技術者向け', link: '/ja-jp/stage-0/' },
        { title: 'ゲーム化入門', desc: 'スネークゲームやテトリスを作って、コードへの恐怖を克服。', sub: '遊びながら学ぶ', link: '/ja-jp/stage-0/' },
        { title: 'Vibe Coding', desc: 'AI時代のコーディングの核心：プロンプトエンジニアリングとコンテキスト管理。', sub: '核心的な考え方', link: '/ja-jp/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中級開発者',
      title: 'フルスタックへ、<br><span class="highlight">リアルなアプリを構築。</span>',
      sub: 'フロントエンドとバックエンドの分離をマスター。DB、API、複雑なインタラクションを含む商用レベルのプロジェクトを構築。',
      cards: [
        { title: 'フルスタック', headline: 'フロント＆バックエンド。', desc: 'DB設計からAPI、コンポーネントまで、現代的なWebアプリを完全に構築。', link: '/ja-jp/stage-2/' },
        { title: 'リアルプロジェクト', headline: 'おもちゃのコードは卒業。', desc: '認証、ストレージ、ファイルアップロード、コアビジネスロジックを深く掘り下げる。', link: '/ja-jp/stage-2/' },
        { title: 'デプロイ', headline: '世界に公開。', desc: 'サーバー設定、DNS、CI/CD。製品リリースのラストワンマイル。', link: '/ja-jp/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 上級開発者',
      title: '高度な実践、<br><span class="highlight">無限の可能性。</span>',
      sub: 'モバイルミニプログラムとAIネイティブアプリ。LLM時代の可能性を探求。',
      cards: [
        { title: 'WeChatミニアプリ', desc: 'クロスプラットフォーム開発、数億人のユーザーに到達。', link: '/ja-jp/stage-3/' },
        { title: 'AIネイティブアプリ', desc: 'RAG、Agent。LLMの限界を探る。', link: '/ja-jp/stage-3/' },
        { title: '複雑なアーキテクチャ', desc: '高並行性、高可用性のアーキテクチャ設計。', link: '/ja-jp/stage-3/' },
        { title: 'パーソナルブランド', desc: '自分のウェブサイトと学術ブログを構築。', link: '/ja-jp/stage-3/' }
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
      pm: '產品經理',
      junior: '初中級開發',
      senior: '高級開發',
      appendix: '附錄',
      start: '開始學習'
    },
    stage1: {
      cat: 'Stage 1 · 產品經理',
      title: '零基礎入門，<br><span class="highlight">做自己的產品經理。</span>',
      sub: '不需要計算機專業背景，只要會說話，就能通過 AI 將你的創意轉化為高保真的 Web 原型。',
      cards: [
        { title: 'AI 產品經理', desc: '從想法到高保真原型，你只需要會說話。', sub: '適合非技術背景', link: '/zh-tw/stage-0/' },
        { title: '遊戲化入門', desc: '通過製作貪吃蛇、俄羅斯方塊，打破對代碼的恐懼。', sub: '邊玩邊學', link: '/zh-tw/stage-0/' },
        { title: 'Vibe Coding', desc: '掌握 AI 時代的編程核心：提示詞工程與上下文管理。', sub: '核心心法', link: '/zh-tw/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 初中級開發',
      title: '深入全棧，<br><span class="highlight">構建真實應用。</span>',
      sub: '掌握前後端分離架構，親手打造包含數據庫、API 和複雜交互的完整商業級項目。',
      cards: [
        { title: '全棧開發', headline: '獨立完成前後端。', desc: '從數據庫設計到 API 開發，再到前端組件化，完整構建一個現代化 Web 應用。', link: '/zh-tw/stage-2/' },
        { title: '真實項目', headline: '拒絕玩具代碼。', desc: '深入理解用戶鑑權、數據存儲、文件上傳等核心業務邏輯。', link: '/zh-tw/stage-2/' },
        { title: '部署上線', headline: '讓世界看到你的作品。', desc: '學習服務器配置、域名解析和自動化部署，打通產品落地的最後一公里。', link: '/zh-tw/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 高級開發',
      title: '高階實戰，<br><span class="highlight">挑戰無限可能。</span>',
      sub: '進軍移動端小程序與 AI 原生應用開發，探索大模型時代的無限機遇。',
      cards: [
        { title: '微信小程序', desc: '跨平台開發，觸達億級用戶。', link: '/zh-tw/stage-3/' },
        { title: 'AI 原生應用', desc: 'RAG、Agent，探索 LLM 的無限可能。', link: '/zh-tw/stage-3/' },
        { title: '複雜業務架構', desc: '應對高並發、高可用場景的架構設計。', link: '/zh-tw/stage-3/' },
        { title: '個人品牌', desc: '構建屬於自己的個人網頁與學術博客。', link: '/zh-tw/stage-3/' }
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
      pm: '제품 관리자',
      junior: '초/중급 개발자',
      senior: '고급 개발자',
      appendix: '부록',
      start: '학습 시작'
    },
    stage1: {
      cat: 'Stage 1 · 제품 관리자',
      title: '제로 베이스 입문,<br><span class="highlight">나만의 PM이 되다.</span>',
      sub: 'CS 배경지식이 없어도 괜찮습니다. 아이디어를 말하기만 하면 AI가 고품질 웹 프로토타입으로 변환해줍니다.',
      cards: [
        { title: 'AI 제품 관리자', desc: '아이디어에서 프로토타입까지, 말 한마디로.', sub: '비전공자 추천', link: '/ko-kr/stage-0/' },
        { title: '게임으로 입문', desc: '스네이크 게임, 테트리스를 만들며 코딩 공포증 극복.', sub: '놀면서 배우기', link: '/ko-kr/stage-0/' },
        { title: 'Vibe Coding', desc: 'AI 시대 코딩의 핵심: 프롬프트 엔지니어링과 컨텍스트 관리.', sub: '핵심 마인드셋', link: '/ko-kr/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · 초/중급 개발자',
      title: '풀스택 심화,<br><span class="highlight">실제 앱 구축.</span>',
      sub: '프론트엔드-백엔드 분리 아키텍처 마스터. DB, API, 복잡한 상호작용이 포함된 상용급 프로젝트 구축.',
      cards: [
        { title: '풀스택 개발', headline: '프론트 & 백엔드 독립 완성.', desc: 'DB 설계부터 API 개발, 프론트엔드 컴포넌트화까지 현대적인 웹 앱을 완벽하게 구축.', link: '/ko-kr/stage-2/' },
        { title: '실전 프로젝트', headline: '장난감 코드는 그만.', desc: '사용자 인증, 데이터 저장, 파일 업로드 등 핵심 비즈니스 로직 심층 이해.', link: '/ko-kr/stage-2/' },
        { title: '배포 및 출시', headline: '세상에 보여주세요.', desc: '서버 설정, 도메인 연결, CI/CD. 제품 출시의 마지막 관문.', link: '/ko-kr/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · 고급 개발자',
      title: '고급 실전,<br><span class="highlight">무한한 가능성에 도전.</span>',
      sub: '모바일 미니 프로그램 및 AI 네이티브 앱 개발. LLM 시대의 무한한 기회 탐색.',
      cards: [
        { title: '위챗 미니프로그램', desc: '크로스 플랫폼 개발, 수억 명의 사용자 도달.', link: '/ko-kr/stage-3/' },
        { title: 'AI 네이티브 앱', desc: 'RAG, Agent. LLM의 한계 탐색.', link: '/ko-kr/stage-3/' },
        { title: '복잡한 아키텍처', desc: '고동시성, 고가용성 아키텍처 설계.', link: '/ko-kr/stage-3/' },
        { title: '퍼스널 브랜딩', desc: '나만의 웹사이트와 학술 블로그 구축.', link: '/ko-kr/stage-3/' }
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
      pm: 'Gerente de Producto',
      junior: 'Desarrollador Junior',
      senior: 'Desarrollador Senior',
      appendix: 'Apéndice',
      start: 'Empezar'
    },
    stage1: {
      cat: 'Stage 1 · Gerente de Producto',
      title: 'De Cero a Héroe,<br><span class="highlight">Sé tu propio PM.</span>',
      sub: 'No necesitas experiencia en CS. Solo di tu idea y la IA la convertirá en prototipos web de alta fidelidad.',
      cards: [
        { title: 'PM de IA', desc: 'De la idea al prototipo, solo hablando.', sub: 'Amigable para no técnicos', link: '/es-es/stage-0/' },
        { title: 'Intro Gamificada', desc: 'Crea Snake, Tetris y rompe el miedo al código.', sub: 'Aprende jugando', link: '/es-es/stage-0/' },
        { title: 'Vibe Coding', desc: 'Domina el núcleo de la programación con IA: Ingeniería de Prompts y Contexto.', sub: 'Mentalidad Clave', link: '/es-es/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Desarrollador Junior/Mid',
      title: 'Full Stack,<br><span class="highlight">Crea Apps Reales.</span>',
      sub: 'Domina la separación frontend-backend. Crea proyectos de nivel comercial con DB, API e interacciones complejas.',
      cards: [
        { title: 'Full Stack', headline: 'Frontend y Backend.', desc: 'Desde el diseño de DB hasta API y componentes, construye una web app moderna completamente.', link: '/es-es/stage-2/' },
        { title: 'Proyectos Reales', headline: 'Sin código de juguete.', desc: 'Profundiza en Auth, Almacenamiento, Subida de Archivos y lógica de negocio.', link: '/es-es/stage-2/' },
        { title: 'Despliegue', headline: 'Muestra al mundo.', desc: 'Configuración de servidor, DNS, CI/CD. La última milla de la entrega del producto.', link: '/es-es/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Desarrollador Senior',
      title: 'Práctica Avanzada,<br><span class="highlight">Posibilidades Infinitas.</span>',
      sub: 'Mini-programas móviles y Apps Nativas de IA. Explora la era de los LLMs.',
      cards: [
        { title: 'WeChat Mini-app', desc: 'Desarrollo multiplataforma, llegando a millones de usuarios.', link: '/es-es/stage-3/' },
        { title: 'Apps Nativas IA', desc: 'RAG, Agent. Explora los límites de los LLMs.', link: '/es-es/stage-3/' },
        { title: 'Arq. Compleja', desc: 'Diseño de arquitectura de alta concurrencia y alta disponibilidad.', link: '/es-es/stage-3/' },
        { title: 'Marca Personal', desc: 'Construye tu propio sitio web y blog académico.', link: '/es-es/stage-3/' }
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
      pm: 'Chef de Produit',
      junior: 'Dév Junior',
      senior: 'Dév Senior',
      appendix: 'Annexe',
      start: 'Commencer'
    },
    stage1: {
      cat: 'Stage 1 · Chef de Produit',
      title: 'De Zéro à Héros,<br><span class="highlight">Soyez votre propre PM.</span>',
      sub: 'Pas besoin de background CS. Parlez juste de votre idée, et l\'IA la transformera en prototypes web haute fidélité.',
      cards: [
        { title: 'PM IA', desc: 'De l\'idée au prototype, juste en parlant.', sub: 'Accessible aux non-tech', link: '/fr-fr/stage-0/' },
        { title: 'Intro Gamifiée', desc: 'Créez Snake, Tetris et brisez la peur du code.', sub: 'Apprendre en jouant', link: '/fr-fr/stage-0/' },
        { title: 'Vibe Coding', desc: 'Maîtrisez le cœur du codage IA : Prompt Engineering & Contexte.', sub: 'Esprit Clé', link: '/fr-fr/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Dév Junior/Mid',
      title: 'Full Stack,<br><span class="highlight">Créez de Vraies Apps.</span>',
      sub: 'Maîtrisez la séparation frontend-backend. Créez des projets commerciaux avec DB, API et interactions complexes.',
      cards: [
        { title: 'Full Stack', headline: 'Frontend & Backend.', desc: 'Du design DB aux API et composants, construisez une web app moderne complète.', link: '/fr-fr/stage-2/' },
        { title: 'Projets Réels', headline: 'Pas de code jouet.', desc: 'Plongez dans l\'Auth, le Stockage, l\'Upload de fichiers et la logique métier.', link: '/fr-fr/stage-2/' },
        { title: 'Déploiement', headline: 'Montrez au monde.', desc: 'Config serveur, DNS, CI/CD. Le dernier kilomètre de la livraison produit.', link: '/fr-fr/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Dév Senior',
      title: 'Pratique Avancée,<br><span class="highlight">Possibilités Infinies.</span>',
      sub: 'Mini-programmes mobiles et Apps Natives IA. Explorez l\'ère des LLM.',
      cards: [
        { title: 'WeChat Mini-app', desc: 'Dév multiplateforme, touchant des millions d\'utilisateurs.', link: '/fr-fr/stage-3/' },
        { title: 'Apps Natives IA', desc: 'RAG, Agent. Explorez les limites des LLM.', link: '/fr-fr/stage-3/' },
        { title: 'Arch. Complexe', desc: 'Conception d\'architecture haute concurrence et haute disponibilité.', link: '/fr-fr/stage-3/' },
        { title: 'Marque Perso', desc: 'Construisez votre propre site web et blog académique.', link: '/fr-fr/stage-3/' }
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
      pm: 'Produktmanager',
      junior: 'Junior Dev',
      senior: 'Senior Dev',
      appendix: 'Anhang',
      start: 'Starten'
    },
    stage1: {
      cat: 'Stage 1 · Produktmanager',
      title: 'Von Null auf Hundert,<br><span class="highlight">Sei dein eigener PM.</span>',
      sub: 'Kein CS-Hintergrund nötig. Sprich einfach deine Idee aus, und KI verwandelt sie in High-Fidelity-Web-Prototypen.',
      cards: [
        { title: 'KI PM', desc: 'Von der Idee zum Prototyp, einfach durch Sprechen.', sub: 'Nicht-Tech-freundlich', link: '/de-de/stage-0/' },
        { title: 'Gamifizierte Intro', desc: 'Baue Snake, Tetris und überwinde die Angst vor Code.', sub: 'Spielend lernen', link: '/de-de/stage-0/' },
        { title: 'Vibe Coding', desc: 'Meistere den Kern des KI-Codings: Prompt Engineering & Kontext.', sub: 'Kern-Mindset', link: '/de-de/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Junior/Mid Dev',
      title: 'Full Stack,<br><span class="highlight">Baue echte Apps.</span>',
      sub: 'Meistere die Frontend-Backend-Trennung. Baue kommerzielle Projekte mit DB, API und komplexen Interaktionen.',
      cards: [
        { title: 'Full Stack', headline: 'Frontend & Backend.', desc: 'Vom DB-Design bis zu APIs und Komponenten, baue eine moderne Web-App komplett.', link: '/de-de/stage-2/' },
        { title: 'Echte Projekte', headline: 'Kein Spielzeug-Code.', desc: 'Tauche ein in Auth, Speicher, Datei-Uploads und Kern-Geschäftslogik.', link: '/de-de/stage-2/' },
        { title: 'Deployment', headline: 'Zeig es der Welt.', desc: 'Server-Konfig, DNS, CI/CD. Die letzte Meile der Produktlieferung.', link: '/de-de/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Senior Dev',
      title: 'Fortgeschrittene Praxis,<br><span class="highlight">Unendliche Möglichkeiten.</span>',
      sub: 'Mobile Mini-Programme & KI-Native Apps. Erkunde die Ära der LLMs.',
      cards: [
        { title: 'WeChat Mini-App', desc: 'Plattformübergreifende Entwicklung, Millionen von Nutzern erreichen.', link: '/de-de/stage-3/' },
        { title: 'KI-Native Apps', desc: 'RAG, Agent. Erkunde die Grenzen von LLMs.', link: '/de-de/stage-3/' },
        { title: 'Komplexe Arch', desc: 'Architekturdesign für hohe Gleichzeitigkeit und hohe Verfügbarkeit.', link: '/de-de/stage-3/' },
        { title: 'Persönliche Marke', desc: 'Baue deine eigene Website und deinen akademischen Blog.', link: '/de-de/stage-3/' }
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
      title: 'Easy-Vibe درس تعليمي',
      home: 'الرئيسية',
      pm: 'مدير المنتج',
      junior: 'مطور مبتدئ',
      senior: 'مطور خبير',
      appendix: 'ملحق',
      start: 'ابدأ التعلم'
    },
    stage1: {
      cat: 'Stage 1 · مدير المنتج',
      title: 'من الصفر إلى الاحتراف،<br><span class="highlight">كن مدير منتجك الخاص.</span>',
      sub: 'لا حاجة لخلفية في علوم الحاسوب. فقط تحدث بفكرتك، وسيُحولها الذكاء الاصطناعي إلى نماذج ويب عالية الدقة.',
      cards: [
        { title: 'مدير منتج AI', desc: 'من الفكرة إلى النموذج الأولي، بمجرد التحدث.', sub: 'صديق لغير التقنيين', link: '/ar-sa/stage-0/' },
        { title: 'مقدمة بالألعاب', desc: 'ابنِ Snake و Tetris واكسر حاجز الخوف من الكود.', sub: 'تعلم باللعب', link: '/ar-sa/stage-0/' },
        { title: 'Vibe Coding', desc: 'أتقن جوهر برمجة الذكاء الاصطناعي: هندسة الأوامر والسياق.', sub: 'العقلية الأساسية', link: '/ar-sa/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · مطور مبتدئ/متوسط',
      title: 'Full Stack،<br><span class="highlight">ابنِ تطبيقات حقيقية.</span>',
      sub: 'أتقن فصل الواجهة الأمامية عن الخلفية. ابنِ مشاريع تجارية مع قواعد بيانات و API وتفاعلات معقدة.',
      cards: [
        { title: 'Full Stack', headline: 'واجهة أمامية وخلفية.', desc: 'من تصميم DB إلى API والمكونات، ابنِ تطبيق ويب حديث بالكامل.', link: '/ar-sa/stage-2/' },
        { title: 'مشاريع حقيقية', headline: 'ليس كود ألعاب.', desc: 'تعمق في المصادقة، التخزين، رفع الملفات ومنطق العمل الأساسي.', link: '/ar-sa/stage-2/' },
        { title: 'النشر', headline: 'أظهر للعالم.', desc: 'إعداد الخادم، DNS، CI/CD. الميل الأخير لتسليم المنتج.', link: '/ar-sa/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · مطور خبير',
      title: 'ممارسة متقدمة،<br><span class="highlight">إمكانيات لا نهائية.</span>',
      sub: 'برامج WeChat الصغيرة وتطبيقات AI الأصلية. استكشف عصر LLMs.',
      cards: [
        { title: 'برنامج WeChat المصغر', desc: 'تطوير متعدد المنصات، الوصول لملايين المستخدمين.', link: '/ar-sa/stage-3/' },
        { title: 'تطبيقات AI الأصلية', desc: 'RAG، Agent. استكشف حدود LLMs.', link: '/ar-sa/stage-3/' },
        { title: 'هندسة معقدة', desc: 'تصميم هندسة التزامن العالي والتوافر العالي.', link: '/ar-sa/stage-3/' },
        { title: 'العلامة التجارية الشخصية', desc: 'ابنِ موقعك الخاص ومدونتك الأكاديمية.', link: '/ar-sa/stage-3/' }
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
      pm: 'Quản lý sản phẩm',
      junior: 'Dev Sơ/Trung cấp',
      senior: 'Dev Cao cấp',
      appendix: 'Phụ lục',
      start: 'Bắt đầu học'
    },
    stage1: {
      cat: 'Stage 1 · Quản lý sản phẩm',
      title: 'Từ số 0 đến Hero,<br><span class="highlight">Tự làm PM cho chính mình.</span>',
      sub: 'Không cần nền tảng CS. Chỉ cần nói ra ý tưởng, AI sẽ biến nó thành nguyên mẫu web độ trung thực cao.',
      cards: [
        { title: 'AI PM', desc: 'Từ ý tưởng đến nguyên mẫu, chỉ bằng lời nói.', sub: 'Thân thiện với non-tech', link: '/vi-vn/stage-0/' },
        { title: 'Nhập môn qua Game', desc: 'Xây dựng Snake, Tetris và phá bỏ nỗi sợ code.', sub: 'Học mà chơi', link: '/vi-vn/stage-0/' },
        { title: 'Vibe Coding', desc: 'Nắm vững cốt lõi lập trình AI: Prompt Engineering & Context.', sub: 'Tư duy cốt lõi', link: '/vi-vn/stage-0/' }
      ]
    },
    stage2: {
      cat: 'Stage 2 · Dev Sơ/Trung cấp',
      title: 'Full Stack,<br><span class="highlight">Xây dựng App thực tế.</span>',
      sub: 'Nắm vững tách biệt frontend-backend. Xây dựng dự án thương mại với DB, API và tương tác phức tạp.',
      cards: [
        { title: 'Full Stack', headline: 'Frontend & Backend.', desc: 'Từ thiết kế DB đến API và component, xây dựng trọn vẹn web app hiện đại.', link: '/vi-vn/stage-2/' },
        { title: 'Dự án thực tế', headline: 'Không phải code đồ chơi.', desc: 'Đi sâu vào Auth, Lưu trữ, Upload file và logic nghiệp vụ cốt lõi.', link: '/vi-vn/stage-2/' },
        { title: 'Triển khai', headline: 'Show cho thế giới.', desc: 'Cấu hình server, DNS, CI/CD. Chặng cuối của việc giao sản phẩm.', link: '/vi-vn/stage-2/' }
      ]
    },
    stage3: {
      cat: 'Stage 3 · Dev Cao cấp',
      title: 'Thực hành nâng cao,<br><span class="highlight">Khả năng vô hạn.</span>',
      sub: 'Mini-app di động & Ứng dụng AI Native. Khám phá kỷ nguyên LLM.',
      cards: [
        { title: 'WeChat Mini-app', desc: 'Phát triển đa nền tảng, tiếp cận hàng triệu người dùng.', link: '/vi-vn/stage-3/' },
        { title: 'App AI Native', desc: 'RAG, Agent. Khám phá giới hạn của LLM.', link: '/vi-vn/stage-3/' },
        { title: 'Kiến trúc phức tạp', desc: 'Thiết kế kiến trúc chịu tải cao và sẵn sàng cao.', link: '/vi-vn/stage-3/' },
        { title: 'Thương hiệu cá nhân', desc: 'Xây dựng website và blog học thuật của riêng bạn.', link: '/vi-vn/stage-3/' }
      ]
    },
    footer: {
      title: 'Sẵn sàng chưa?',
      desc: 'Easy-Vibe, biến lập trình trở nên tự nhiên như hơi thở.',
      btn: 'Bắt đầu ngay'
    }
  }
}

// Fallback to English for other languages
import { computed } from 'vue'
const t = computed(() => {
  const code = lang.value ? lang.value.toLowerCase() : 'zh-cn'
  return i18n[code] || i18n['en-us']
})

const locales = [
  { code: 'zh-cn', text: '简体中文' },
  { code: 'en-us', text: 'English' },
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

const changeLang = (targetLocale) => {
  const currentPath = router.route.path
  // Find current locale based on path prefix
  const currentLocale = locales.find(l => currentPath.startsWith(`/${l.code}/`))
  
  let newPath
  if (currentLocale) {
    newPath = currentPath.replace(`/${currentLocale.code}/`, `/${targetLocale}/`)
  } else {
    // Fallback for root path or missing locale prefix
    newPath = `/${targetLocale}/`
  }
  
  router.go(withBase(newPath))
  showLangMenu.value = false
}

const scrollTo = (id) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    activeTab.value = 'home'
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const navHeight = 64 // Approximate nav height
    const offset = el.offsetTop - navHeight - 20
    window.scrollTo({ top: offset, behavior: 'smooth' })
    activeTab.value = id
  }
}

// Close lang menu on click outside
const closeLangMenu = (e) => {
  if (!e.target.closest('.lang-switch-wrapper')) {
    showLangMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeLangMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeLangMenu)
})

// Stage 1: 产品经理 (Web 原型)
const stage1Cards = [
  {
    title: 'AI 产品经理',
    desc: '从想法到高保真原型，你只需要会说话。',
    sub: '适合非技术背景',
    color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    icon: '🎨',
    link: '/zh-cn/stage-0/0.1-learning-map/'
  },
  {
    title: '游戏化入门',
    desc: '通过制作贪吃蛇、俄罗斯方块，打破对代码的恐惧。',
    sub: '边玩边学',
    color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    icon: '🎮',
    link: '/zh-cn/stage-0/0.2-ai-capabilities-through-games/'
  },
  {
    title: 'Vibe Coding',
    desc: '掌握 AI 时代的编程核心：提示词工程与上下文管理。',
    sub: '核心心法',
    color: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    icon: '💡',
    link: '/zh-cn/stage-1/1.1-introduction-to-ai-ide/'
  }
]

// Stage 2: 初中级开发 (全栈)
const stage2Cards = [
  {
    title: '全栈开发',
    headline: '独立完成前后端。',
    desc: '从数据库设计到 API 开发，再到前端组件化，完整构建一个现代化 Web 应用。',
    imageColor: '#E0C3FC',
    visualType: 'code',
    link: '/zh-cn/stage-2/assignments/2.1-fullstack-app/'
  },
  {
    title: '真实项目',
    headline: '拒绝玩具代码。',
    desc: '深入理解用户鉴权、数据存储、文件上传等核心业务逻辑。',
    imageColor: '#8EC5FC',
    visualType: 'server',
    link: '/zh-cn/stage-2/backend/2.2-database-supabase/chapter5/chapter5-from-database-to-supabase'
  },
  {
    title: '部署上线',
    headline: '让世界看到你的作品。',
    desc: '学习服务器配置、域名解析和自动化部署，打通产品落地的最后一公里。',
    imageColor: '#96E6A1',
    visualType: 'cloud',
    link: '/zh-cn/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications'
  }
]

// Stage 3: 高级开发 (小程序 & AI)
const stage3Cards = [
  {
    title: '微信小程序',
    desc: '跨平台开发，触达亿级用户。',
    tag: 'Stage 3',
    visualType: 'phone',
    link: '/zh-cn/stage-3/cross-platform/3.3-wechat-miniprogram/'
  },
  {
    title: 'AI 原生应用',
    desc: 'RAG、Agent，探索 LLM 的无限可能。',
    tag: 'Advanced',
    visualType: 'ai',
    link: '/zh-cn/stage-3/ai-advanced/3.a1-rag-introduction/extra5-what-is-rag-and-how-does-it-work-and-future'
  },
  {
    title: '复杂业务架构',
    desc: '应对高并发、高可用场景的架构设计。',
    tag: 'Architecture',
    visualType: 'arch',
    link: '/zh-cn/stage-3/core-skills/3.2-long-running-tasks/'
  },
  {
    title: '个人品牌',
    desc: '构建属于自己的个人网页与学术博客。',
    tag: 'Brand',
    visualType: 'brand',
    link: '/zh-cn/stage-3/personal-brand/3.7-personal-website-blog/'
  }
]
</script>

<template>
  <div class="apple-container">
    <!-- Sticky Navigation -->
    <nav class="sticky-nav glass">
      <div class="nav-content">
        <span class="nav-title">{{ t.nav.title }}</span>
        <div class="nav-links">
          <button :class="{ active: activeTab === 'home' }" @click="scrollTo('home')">{{ t.nav.home }}</button>
          <button :class="{ active: activeTab === 'pm' }" @click="scrollTo('pm')">{{ t.nav.pm }}</button>
          <button :class="{ active: activeTab === 'junior' }" @click="scrollTo('junior')">{{ t.nav.junior }}</button>
          <button :class="{ active: activeTab === 'senior' }" @click="scrollTo('senior')">{{ t.nav.senior }}</button>
          <a class="nav-link-item" :href="withBase('/zh-cn/appendix/')">{{ t.nav.appendix }}</a>
        </div>
        <div class="nav-action">
          <div class="nav-icons">
            <!-- Language Switcher -->
            <div class="lang-switch-wrapper">
              <button class="icon-btn" aria-label="Change language" @click.stop="toggleLangMenu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </button>
              <!-- Dropdown Menu -->
              <div class="lang-dropdown glass" v-if="showLangMenu">
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
            
            <!-- GitHub Link -->
            <a class="icon-btn" href="https://github.com/datawhalechina/easy-vibe" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          <a class="buy-btn" :href="withBase('/zh-cn/stage-0/0.1-learning-map/')">{{ t.footer.btn }}</a>
        </div>
      </div>
    </nav>

    <!-- Home Anchor -->
    <div id="home" style="height: 0;"></div>

    <!-- Stage 1: Product Manager -->
    <section id="pm" class="section-container">
      <div class="section-header">
        <h2 class="section-category">{{ t.stage1.cat }}</h2>
        <h3 class="section-headline" v-html="t.stage1.title"></h3>
        <p class="section-sub">{{ t.stage1.sub }}</p>
      </div>

      <div class="bento-grid">
        <a :href="withBase(t.stage1.cards[0].link)" class="bento-item large" :style="{ background: stage1Cards[0].color }">
          <div class="card-content">
            <span class="card-icon">{{ stage1Cards[0].icon }}</span>
            <h4>{{ t.stage1.cards[0].title }}</h4>
            <p>{{ t.stage1.cards[0].desc }}</p>
            <span class="card-sub">{{ t.stage1.cards[0].sub }}</span>
          </div>
        </a>
        <div class="bento-column">
          <a v-for="(card, i) in stage1Cards.slice(1)" :key="i" :href="withBase(t.stage1.cards[i+1].link)" class="bento-item small" :style="{ background: card.color }">
            <div class="card-content">
              <span class="card-icon">{{ card.icon }}</span>
              <h4>{{ t.stage1.cards[i+1].title }}</h4>
              <p>{{ t.stage1.cards[i+1].desc }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Stage 2: Junior/Mid Dev -->
    <section id="junior" class="section-container">
      <div class="section-header">
        <h2 class="section-category">{{ t.stage2.cat }}</h2>
        <h3 class="section-headline" v-html="t.stage2.title"></h3>
        <p class="section-sub">{{ t.stage2.sub }}</p>
      </div>

      <div class="comm-grid">
        <a v-for="(card, index) in stage2Cards" :key="index" :href="withBase(t.stage2.cards[index].link)" class="comm-card glass">
          <div class="comm-visual" :style="{ backgroundColor: card.imageColor }">
            <div class="visual-placeholder"></div>
          </div>
          <div class="comm-text">
            <h4 class="comm-title">{{ t.stage2.cards[index].title }}</h4>
            <p class="comm-desc">{{ t.stage2.cards[index].desc }}</p>
            <span class="comm-note">点击查看详情</span>
          </div>
        </a>
      </div>
    </section>

    <!-- Stage 3: Senior Dev -->
    <section id="senior" class="section-container">
      <div class="section-header">
        <h2 class="section-category">{{ t.stage3.cat }}</h2>
        <h3 class="section-headline" v-html="t.stage3.title"></h3>
        <p class="section-sub">{{ t.stage3.sub }}</p>
      </div>

      <div class="scroll-container">
        <div class="scroll-track">
          <a v-for="(card, index) in stage3Cards" :key="index" :href="withBase(t.stage3.cards[index].link)" class="prod-card glass">
            <div class="prod-tag">{{ card.tag }}</div>
            <h4>{{ t.stage3.cards[index].title }}</h4>
            <p>{{ t.stage3.cards[index].desc }}</p>
            <div class="prod-visual"></div>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer Callout -->
    <div class="footer-callout">
      <h2>{{ t.footer.title }}</h2>
      <p>{{ t.footer.desc }}</p>
      <a class="buy-btn large" :href="withBase('/zh-cn/stage-0/0.1-learning-map/')">{{ t.footer.btn }}</a>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
.apple-container {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  color: var(--vp-c-text-1);
  overflow: hidden;
}

a {
  text-decoration: none;
  color: inherit;
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
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Dark mode adjustment for glass effect */
:root.dark .sticky-nav {
  background: rgba(0, 0, 0, 0.7);
}

.nav-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-title {
  font-weight: 600;
  font-size: 21px;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-links button, .nav-link-item {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  margin: 0;
  line-height: 1;
}

.nav-links button:hover,
.nav-links button.active,
.nav-link-item:hover {
  color: var(--vp-c-text-1);
}

.nav-action {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-icons {
  display: flex;
  gap: 12px;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.icon-btn:hover {
  opacity: 1;
}

/* Lang Switcher */
.lang-switch-wrapper {
  position: relative;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: -10px; /* Align slightly to right */
  margin-top: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 6px;
  min-width: 140px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  overflow-y: auto;
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
  background: var(--vp-c-brand-1);
  color: white;
  padding: 4px 12px;
  border-radius: 980px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.buy-btn:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.02);
}

.buy-btn.large {
  padding: 12px 28px;
  font-size: 17px;
  margin-top: 20px;
  display: inline-block;
}

/* Sections General */
.section-container {
  max-width: 1280px;
  margin: 0 auto 120px;
  padding: 0 40px;
}

.section-header {
  margin-bottom: 60px;
}

.section-category {
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 10px;
  border: none;
  padding: 0;
}

.section-headline {
  font-size: 48px;
  line-height: 1.08349;
  font-weight: 600;
  letter-spacing: -0.003em;
  margin-bottom: 20px;
}

.section-sub {
  font-size: 21px;
  line-height: 1.381;
  font-weight: 400;
  letter-spacing: 0.011em;
  color: var(--vp-c-text-2);
  max-width: 70%;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.comm-card {
  border-radius: 24px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  transition: transform 0.3s;
  display: block;
}

.comm-card:hover {
  transform: translateY(-5px);
}

.comm-visual {
  height: 200px;
  width: 100%;
  position: relative;
}

.visual-placeholder {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.comm-text {
  padding: 30px;
}

.comm-title {
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 8px;
}

.comm-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.comm-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Productivity Scroll (Now used for Stage 3) */
.scroll-container {
  overflow-x: auto;
  padding-bottom: 40px;
  margin: 0 -20px;
  padding: 0 20px 40px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.scroll-track {
  display: flex;
  gap: 24px;
  width: max-content;
}

.prod-card {
  width: 300px;
  height: 400px;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  padding: 30px;
  scroll-snap-align: center;
  text-decoration: none !important;
  color: inherit !important;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
}

.prod-card:hover {
  transform: scale(1.03);
}

.prod-tag {
  font-size: 12px;
  font-weight: 600;
  color: #0071e3;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.prod-card h4 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.prod-card p {
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.prod-visual {
  margin-top: auto;
  height: 150px;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  border-radius: 12px;
  opacity: 0.5;
}

/* Footer */
.footer-callout {
  text-align: center;
  padding: 100px 20px;
  background: var(--vp-c-bg-soft);
}

.footer-callout h2 {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .section-headline {
    font-size: 32px;
  }
  
  .bento-grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .comm-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-links {
    display: none; /* Simplify for mobile for now, or use overflow scroll */
  }
}
</style>

<style>
/* Global layout fix for fixed nav */
.VPHome {
  padding-top: 52px !important;
}
</style>
