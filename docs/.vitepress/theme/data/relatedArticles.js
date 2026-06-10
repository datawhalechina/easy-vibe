/**
 * 统一维护教程“相关文章”映射表：
 * - key: 文档相对路径（不含 /index.md）
 * - value: 该文档底部相关文章卡片数组
 * 页面只负责按 key 读取并渲染，不在页面内重复维护映射数据。
 */
const rawRelatedArticlesMap = {
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
      href: '/zh-cn/stage-2/assignments/copywriting-platform-supabase/',
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

const supportedLocales = [
  'zh-cn',
  'en',
  'zh-tw',
  'ja-jp',
  'ko-kr',
  'es-es',
  'fr-fr',
  'de-de',
  'ar-sa',
  'vi-vn'
]

const getLocaleFromKey = (key) =>
  supportedLocales.find((locale) => key.startsWith(`${locale}/`))

const getArticleSlug = (href) =>
  href
    .replace(/^\/zh-cn\//, '')
    .replace(/\/$/, '')
    .split('/')
    .at(-1)

const localizedArticleText = {
  en: {
    'ai-capabilities-through-games': {
      title: '0.2 Understand AI Capabilities Through Mini Games',
      description:
        'Build intuition through a playful exercise and see what problems are suitable for AI.'
    },
    'finding-great-idea': {
      title: '1.0 Find Ideas Worth Building',
      description:
        'Turn "I have an idea" into a product direction you can validate.'
    },
    'building-prototype': {
      title: '1.2 Turn Ideas into Interactive Prototypes',
      description:
        'Go from requirement breakdown to a working first demo quickly.'
    },
    'lovart-assets': {
      title: '2.0 Build an Asset Agent from NanoBanana',
      description:
        'Move into practice and build a stable, reusable asset production workflow.'
    },
    'introduction-to-ai-ide': {
      title: 'Beginner 2: Master AI Coding Tools',
      description:
        'Move from web experiments to a local AI IDE and set up a real development environment.'
    },
    'learning-map': {
      title: 'Back to the Learning Map',
      description:
        'Review the full path, stage goals, and recommended learning order.'
    },
    'integrating-ai-capabilities': {
      title: 'Beginner 4: Add AI Capabilities',
      description:
        'Connect real APIs and turn a visual prototype into a usable product.'
    },
    'appendix-b-common-errors': {
      title: 'Appendix: Common Errors and Fixes',
      description:
        'Quickly diagnose and fix environment, dependency, and runtime issues.'
    },
    'complete-project-practice': {
      title: 'Beginner 5: Complete Project Practice',
      description:
        'Connect the pieces into a complete business flow and build a presentable product.'
    },
    'figma-mastergo': {
      title: 'Advanced: Figma and MasterGo Basics',
      description:
        'Strengthen the design-to-development workflow for more structured delivery.'
    },
    'ai-interface-code': {
      title: 'Junior Backend: API Design and Development',
      description:
        'Connect AI capabilities through maintainable backend interfaces.'
    },
    'fullstack-app': {
      title: 'Stage 2 Assignment: Full-Stack App',
      description:
        'Upgrade prototype skills into a deployable full-stack application.'
    },
    'database-supabase': {
      title: 'Junior Backend: Database to Supabase',
      description: 'Add data modeling, storage, and permission capabilities.'
    },
    'ui-design': {
      title: '2.2 Build a Modern App: UI Design',
      description:
        'Complete page hierarchy, components, and layout under a unified visual system.'
    },
    'design-to-code': {
      title: '2.6 From Design Prototype to Code',
      description:
        'Convert design files into maintainable frontend code and components.'
    },
    'modern-component-library': {
      title: '2.7 Upgrade UI with Modern Component Libraries',
      description:
        'Use component libraries to improve consistency and development speed.'
    }
  },
  'zh-tw': {
    'ai-capabilities-through-games': {
      title: '0.2 用「小遊戲」理解 AI 能力邊界',
      description: '先用遊戲化方式建立手感，快速理解哪些問題適合交給 AI。'
    },
    'finding-great-idea': {
      title: '1.0 找到值得做的點子',
      description: '把「我有想法」變成「我有可驗證的產品方向」。'
    },
    'building-prototype': {
      title: '1.2 把想法做成可互動原型',
      description: '從需求拆解到頁面落地，快速完成第一版 Demo。'
    },
    'lovart-assets': {
      title: '2.0 從 NanoBanana 出發做素材 Agent',
      description: '進入實戰階段，學習構建穩定可複用的素材生產流程。'
    },
    'introduction-to-ai-ide': {
      title: '初級二：學會 AI 程式設計工具',
      description: '把網頁試玩升級到本地 AI IDE，建立完整開發環境。'
    },
    'learning-map': {
      title: '返回學習地圖',
      description: '按完整路線查看每個階段目標與推薦學習順序。'
    },
    'integrating-ai-capabilities': {
      title: '初級四：給原型加上 AI 能力',
      description: '接入真實 API，讓頁面從「可看」變成「可用」。'
    },
    'appendix-b-common-errors': {
      title: '附錄：常見報錯與解決方案',
      description: '遇到環境、依賴或執行異常時，快速定位並修復。'
    },
    'complete-project-practice': {
      title: '初級五：完整專案實戰',
      description: '把分散能力拼成完整業務鏈路，做出可展示的成品。'
    },
    'figma-mastergo': {
      title: '進階：Figma 與 MasterGo 入門',
      description: '繼續強化設計到開發的協作流程，為工程化打基礎。'
    }
  },
  'ja-jp': {
    'ai-capabilities-through-games': {
      title: '0.2 ミニゲームで AI の能力境界を理解する',
      description:
        'ゲーム感覚で手触りをつかみ、AI に任せやすい問題を素早く理解します。'
    },
    'finding-great-idea': {
      title: '1.0 作る価値のあるアイデアを見つける',
      description:
        '「アイデアがある」を「検証できるプロダクト方向」に変えます。'
    },
    'building-prototype': {
      title: '1.2 アイデアを操作できるプロトタイプにする',
      description:
        '要件分解から画面実装まで進め、最初の Demo を素早く完成させます。'
    },
    'lovart-assets': {
      title: '2.0 NanoBanana から素材 Agent を作る',
      description:
        '実践段階に進み、安定して再利用できる素材制作フローを学びます。'
    },
    'introduction-to-ai-ide': {
      title: '初級二：AI プログラミングツールを学ぶ',
      description:
        'Web 上の試作からローカル AI IDE へ進み、開発環境を整えます。'
    },
    'learning-map': {
      title: '学習ロードマップに戻る',
      description: '全体ルート、各段階の目標、推奨学習順を確認します。'
    },
    'integrating-ai-capabilities': {
      title: '初級四：プロトタイプに AI 能力を追加する',
      description:
        '実際の API を接続し、画面を「見える」から「使える」へ進化させます。'
    },
    'appendix-b-common-errors': {
      title: '付録：よくあるエラーと解決策',
      description: '環境、依存関係、実行時の問題を素早く特定して修正します。'
    },
    'complete-project-practice': {
      title: '初級五：完全プロジェクト実践',
      description:
        '分散した能力を一つの業務フローにまとめ、見せられる成果物にします。'
    },
    'figma-mastergo': {
      title: '発展：Figma と MasterGo 入門',
      description:
        '設計から開発までの協作フローを強化し、工程化の基礎を固めます。'
    }
  },
  'ko-kr': {
    'ai-capabilities-through-games': {
      title: '0.2 미니게임으로 AI 역량의 경계 이해하기',
      description:
        '게임형 실습으로 감각을 익히고 어떤 문제를 AI에 맡기기 좋은지 이해합니다.'
    },
    'finding-great-idea': {
      title: '1.0 만들 가치가 있는 아이디어 찾기',
      description: '"아이디어가 있다"를 검증 가능한 제품 방향으로 바꿉니다.'
    },
    'building-prototype': {
      title: '1.2 아이디어를 인터랙티브 프로토타입으로 만들기',
      description:
        '요구사항 분해부터 화면 구현까지 빠르게 첫 Demo를 완성합니다.'
    },
    'lovart-assets': {
      title: '2.0 NanoBanana에서 소재 Agent 만들기',
      description:
        '실전 단계로 들어가 안정적으로 재사용 가능한 소재 생산 흐름을 배웁니다.'
    },
    'introduction-to-ai-ide': {
      title: '초급 2: AI 코딩 도구 익히기',
      description: '웹 실습에서 로컬 AI IDE로 넘어가 개발 환경을 갖춥니다.'
    },
    'learning-map': {
      title: '학습 지도 돌아가기',
      description: '전체 경로, 단계별 목표, 추천 학습 순서를 확인합니다.'
    },
    'integrating-ai-capabilities': {
      title: '초급 4: 프로토타입에 AI 기능 추가하기',
      description:
        '실제 API를 연결해 화면을 볼 수 있는 것에서 쓸 수 있는 것으로 바꿉니다.'
    },
    'appendix-b-common-errors': {
      title: '부록: 자주 만나는 오류와 해결책',
      description: '환경, 의존성, 실행 오류를 빠르게 찾고 고칩니다.'
    },
    'complete-project-practice': {
      title: '초급 5: 완성 프로젝트 실습',
      description:
        '분산된 기능을 완전한 업무 흐름으로 묶어 보여줄 수 있는 결과물을 만듭니다.'
    },
    'figma-mastergo': {
      title: '심화: Figma와 MasterGo 입문',
      description: '디자인에서 개발까지의 협업 흐름을 강화합니다.'
    }
  },
  'es-es': {
    'ai-capabilities-through-games': {
      title: '0.2 Entender las capacidades de IA con minijuegos',
      description:
        'Desarrolla intuición con un ejercicio lúdico y entiende qué problemas encajan con IA.'
    },
    'finding-great-idea': {
      title: '1.0 Encontrar ideas que vale la pena construir',
      description:
        'Convierte "tengo una idea" en una dirección de producto verificable.'
    },
    'building-prototype': {
      title: '1.2 Convertir ideas en prototipos interactivos',
      description:
        'Pasa del desglose de requisitos a una primera demo funcional.'
    },
    'lovart-assets': {
      title: '2.0 Crear un Agent de recursos desde NanoBanana',
      description:
        'Entra en la práctica y construye un flujo estable de producción de recursos reutilizables.'
    },
    'introduction-to-ai-ide': {
      title: 'Nivel inicial 2: dominar herramientas de programación con IA',
      description:
        'Pasa de probar en la web a trabajar con un AI IDE local y un entorno completo.'
    },
    'learning-map': {
      title: 'Volver a la ruta de aprendizaje',
      description:
        'Revisa la ruta completa, los objetivos por etapa y el orden recomendado.'
    },
    'integrating-ai-capabilities': {
      title: 'Nivel inicial 4: añadir capacidades de IA',
      description:
        'Conecta APIs reales y convierte una pantalla visible en una herramienta usable.'
    },
    'appendix-b-common-errors': {
      title: 'Apéndice: errores comunes y soluciones',
      description:
        'Diagnostica y corrige problemas de entorno, dependencias y ejecución.'
    },
    'complete-project-practice': {
      title: 'Nivel inicial 5: práctica de proyecto completo',
      description:
        'Une capacidades dispersas en un flujo de negocio completo y presentable.'
    },
    'figma-mastergo': {
      title: 'Avanzado: introducción a Figma y MasterGo',
      description: 'Refuerza el flujo de colaboración de diseño a desarrollo.'
    }
  },
  'fr-fr': {
    'ai-capabilities-through-games': {
      title: "0.2 Comprendre les limites de l'IA avec des mini-jeux",
      description:
        "Développez l'intuition avec un exercice ludique et voyez quels problèmes conviennent à l'IA."
    },
    'finding-great-idea': {
      title: '1.0 Trouver une idée qui vaut la peine',
      description:
        'Transformez "j’ai une idée" en direction produit vérifiable.'
    },
    'building-prototype': {
      title: '1.2 Transformer une idée en prototype interactif',
      description:
        'Passez du découpage des besoins à une première démo fonctionnelle.'
    },
    'lovart-assets': {
      title: '2.0 Créer un Agent de ressources avec NanoBanana',
      description:
        'Entrez dans la pratique et construisez un flux stable de production de ressources réutilisables.'
    },
    'introduction-to-ai-ide': {
      title: 'Débutant 2 : maîtriser les outils de programmation IA',
      description:
        'Passez des essais web à un AI IDE local avec un vrai environnement de développement.'
    },
    'learning-map': {
      title: "Retour au parcours d'apprentissage",
      description:
        'Revoyez le parcours complet, les objectifs par étape et l’ordre recommandé.'
    },
    'integrating-ai-capabilities': {
      title: 'Débutant 4 : ajouter des capacités IA',
      description:
        'Connectez de vraies API et transformez un prototype visible en produit utilisable.'
    },
    'appendix-b-common-errors': {
      title: 'Annexe : erreurs courantes et solutions',
      description:
        'Diagnostiquez et corrigez rapidement les problèmes d’environnement, de dépendances et d’exécution.'
    },
    'complete-project-practice': {
      title: 'Débutant 5 : projet complet',
      description:
        'Assemblez les capacités en un flux métier complet et présentable.'
    },
    'figma-mastergo': {
      title: 'Avancé : bases de Figma et MasterGo',
      description:
        'Renforcez le flux de collaboration entre design et développement.'
    }
  },
  'de-de': {
    'ai-capabilities-through-games': {
      title: '0.2 KI-Fähigkeiten mit Mini-Games verstheen',
      description:
        'Entwickeln Sie spielerisch ein Gefühl dafür, welche Probleme gut zu KI passen.'
    },
    'finding-great-idea': {
      title: '1.0 Ideen finden, die sich lohnen',
      description:
        'Machen Sie aus "ich habe eine Idee" eine überprüfbare Produktrichtung.'
    },
    'building-prototype': {
      title: '1.2 Ideen in interaktive Prototypen verwandeln',
      description: 'Vom Anforderungszuschnitt zur ersten lauffähigen Demo.'
    },
    'lovart-assets': {
      title: '2.0 Einen Asset-Agent mit NanoBanana bauen',
      description:
        'Gehen Sie in die Praxis und bauen Sie einen stabilen, wiederverwendbaren Produktionsfluss.'
    },
    'introduction-to-ai-ide': {
      title: 'Anfänger 2: KI-Programmierwerkzeuge beherrschen',
      description: 'Wechseln Sie von Web-Experimenten zu einer lokalen AI IDE.'
    },
    'learning-map': {
      title: 'Zurück zum Lernpfad',
      description:
        'Prüfen Sie den Gesamtpfad, die Etappenziele und die empfohlene Reihenfolge.'
    },
    'integrating-ai-capabilities': {
      title: 'Anfänger 4: KI-Fähigkeiten hinzufügen',
      description:
        'Binden Sie echte APIs an und machen Sie aus einem sichtbaren Prototyp ein nutzbares Produkt.'
    },
    'appendix-b-common-errors': {
      title: 'Anhang: häufige Fehler und Lösungen',
      description:
        'Finden und beheben Sie Umgebungs-, Abhängigkeits- und Laufzeitprobleme schnell.'
    },
    'complete-project-practice': {
      title: 'Anfänger 5: vollständiges Projektpraktikum',
      description:
        'Verbinden Sie einzelne Fähigkeiten zu einem vollständigen, vorzeigbaren Ablauf.'
    },
    'figma-mastergo': {
      title: 'Fortgeschritten: Figma und MasterGo Grundlagen',
      description: 'Stärken Sie den Workflow von Design zu Entwicklung.'
    }
  },
  'ar-sa': {
    'ai-capabilities-through-games': {
      title: '0.2 فهم حدود قدرات الذكاء الاصطناعي عبر ألعاب صغيرة',
      description:
        'اكتسب إحساساً عملياً بطريقة ممتعة وافهم ما يناسب الذكاء الاصطناعي.'
    },
    'finding-great-idea': {
      title: '1.0 العثور على فكرة تستحق البناء',
      description: 'حوّل "لدي فكرة" إلى اتجاه منتج قابل للتحقق.'
    },
    'building-prototype': {
      title: '1.2 تحويل الفكرة إلى نموذج أولي تفاعلي',
      description: 'من تحليل المتطلبات إلى أول عرض عملي بسرعة.'
    },
    'lovart-assets': {
      title: '2.0 بناء Agent للمواد انطلاقاً من NanoBanana',
      description:
        'ادخل مرحلة التطبيق وابنِ سير عمل مستقراً وقابلاً لإعادة الاستخدام.'
    },
    'introduction-to-ai-ide': {
      title: 'المستوى الثاني: إتقان أدوات البرمجة بالذكاء الاصطناعي',
      description: 'انتقل من التجربة على الويب إلى بيئة AI IDE محلية كاملة.'
    },
    'learning-map': {
      title: 'العودة إلى خريطة التعلم',
      description: 'راجع المسار الكامل وأهداف كل مرحلة وترتيب التعلم المقترح.'
    },
    'integrating-ai-capabilities': {
      title: 'المستوى الرابع: إضافة قدرات الذكاء الاصطناعي',
      description:
        'اربط واجهات API حقيقية وحوّل النموذج من قابل للمشاهدة إلى قابل للاستخدام.'
    },
    'appendix-b-common-errors': {
      title: 'ملحق: الأخطاء الشائعة والحلول',
      description: 'شخّص مشكلات البيئة والاعتماديات والتشغيل وأصلحها بسرعة.'
    },
    'complete-project-practice': {
      title: 'المستوى الخامس: مشروع عملي كامل',
      description: 'اجمع القدرات المتفرقة في مسار عمل كامل قابل للعرض.'
    },
    'figma-mastergo': {
      title: 'متقدم: أساسيات Figma و MasterGo',
      description: 'عزّز سير العمل من التصميم إلى التطوير.'
    }
  },
  'vi-vn': {
    'ai-capabilities-through-games': {
      title: '0.2 Hiểu ranh giới năng lực AI qua trò chơi nhỏ',
      description:
        'Tạo cảm giác thực hành qua trò chơi và hiểu nhanh vấn đề nào phù hợp để giao cho AI.'
    },
    'finding-great-idea': {
      title: '1.0 Tìm ý tưởng đáng làm',
      description:
        'Biến "tôi có ý tưởng" thành một hướng sản phẩm có thể kiểm chứng.'
    },
    'building-prototype': {
      title: '1.2 Biến ý tưởng thành nguyên mẫu tương tác',
      description:
        'Từ tách yêu cầu đến dựng trang, hoàn thành nhanh bản Demo đầu tiên.'
    },
    'lovart-assets': {
      title: '2.0 Tạo Agent sản xuất tài nguyên từ NanoBanana',
      description:
        'Bước vào thực chiến và học cách xây dựng quy trình sản xuất tài nguyên ổn định, tái sử dụng được.'
    },
    'introduction-to-ai-ide': {
      title: 'Sơ cấp 2: học công cụ lập trình AI',
      description:
        'Từ thử nghiệm trên web chuyển sang AI IDE cục bộ và thiết lập môi trường phát triển đầy đủ.'
    },
    'learning-map': {
      title: 'Quay lại lộ trình học tập',
      description:
        'Xem lại toàn bộ lộ trình, mục tiêu từng giai đoạn và thứ tự học đề xuất.'
    },
    'integrating-ai-capabilities': {
      title: 'Sơ cấp 4: thêm năng lực AI vào nguyên mẫu',
      description:
        'Kết nối API thật để biến giao diện từ "xem được" thành "dùng được".'
    },
    'appendix-b-common-errors': {
      title: 'Phụ lục: lỗi thường gặp và cách xử lý',
      description:
        'Nhanh chóng xác định và sửa lỗi môi trường, phụ thuộc hoặc khi chạy.'
    },
    'complete-project-practice': {
      title: 'Sơ cấp 5: thực chiến dự án hoàn chỉnh',
      description:
        'Ghép các năng lực rời rạc thành một luồng nghiệp vụ hoàn chỉnh có thể trình bày.'
    },
    'figma-mastergo': {
      title: 'Nâng cao: nhập môn Figma và MasterGo',
      description:
        'Tiếp tục củng cố quy trình cộng tác từ thiết kế đến phát triển.'
    }
  }
}

const localizedStage2ArticleText = {
  en: {
    'ai-interface-code': {
      title: 'Junior Backend: API Design and Development',
      description:
        'Connect AI capabilities through maintainable backend interfaces.'
    },
    'fullstack-app': {
      title: 'Stage 2 Assignment: Full-Stack App',
      description:
        'Upgrade prototype skills into a deployable full-stack application.'
    },
    'database-supabase': {
      title: 'Junior Backend: Database to Supabase',
      description: 'Add data modeling, storage, and permission capabilities.'
    },
    'ui-design': {
      title: '2.2 Build a Modern App: UI Design',
      description:
        'Complete page hierarchy, components, and layout under a unified visual system.'
    },
    'design-to-code': {
      title: '2.6 From Design Prototype to Code',
      description:
        'Convert design files into maintainable frontend code and components.'
    },
    'modern-component-library': {
      title: '2.7 Upgrade UI with Modern Component Libraries',
      description:
        'Use component libraries to improve consistency and development speed.'
    }
  },
  'zh-tw': {
    'ai-interface-code': {
      title: '初中級：後端介面設計與開發',
      description: '把 AI 能力規範地接入後端介面，提升工程可維護性。'
    },
    'fullstack-app': {
      title: 'Stage 2 大作業：全端應用實戰',
      description: '把原型能力升級為前後端一體化的可上線應用。'
    },
    'database-supabase': {
      title: '初中級後端：從資料庫到 Supabase',
      description: '補齊資料建模、儲存與權限能力，邁向工程化開發。'
    },
    'ui-design': {
      title: '2.2 建構第一個現代應用程式 - UI 設計',
      description: '在統一視覺規範下，完成頁面層級、元件和版面設計。'
    },
    'design-to-code': {
      title: '2.6 從設計原型到專案程式碼',
      description: '把設計稿準確轉成可維護的前端程式碼與元件結構。'
    },
    'modern-component-library': {
      title: '2.7 使用現代元件庫更新你的介面',
      description: '利用元件庫提升工程效率，讓介面一致性更穩定。'
    }
  },
  'ja-jp': {
    'ai-interface-code': {
      title: '初中級：バックエンド API 設計と開発',
      description: 'AI 能力を保守しやすいバックエンド接口として接続します。'
    },
    'fullstack-app': {
      title: 'Stage 2 課題：フルスタックアプリ実践',
      description:
        'プロトタイプ能力を、公開可能なフルスタックアプリへ発展させます。'
    },
    'database-supabase': {
      title: '初中級バックエンド：データベースから Supabase へ',
      description:
        'データモデリング、保存、権限管理を補い、工程化開発へ進みます。'
    },
    'ui-design': {
      title: '2.2 最初のモダンアプリを作る - UI デザイン',
      description:
        '統一された視覚仕様のもとで、ページ階層、コンポーネント、レイアウトを完成させます。'
    },
    'design-to-code': {
      title: '2.6 デザインプロトタイプからコードへ',
      description:
        'デザインを保守しやすいフロントエンドコードとコンポーネント構造に変換します。'
    },
    'modern-component-library': {
      title: '2.7 モダンコンポーネントライブラリで UI を更新する',
      description: 'コンポーネントライブラリで一貫性と開発効率を高めます。'
    }
  },
  'ko-kr': {
    'ai-interface-code': {
      title: '초중급: 백엔드 API 설계와 개발',
      description: 'AI 기능을 유지보수 가능한 백엔드 인터페이스로 연결합니다.'
    },
    'fullstack-app': {
      title: 'Stage 2 과제: 풀스택 앱 실전',
      description:
        '프로토타입 역량을 배포 가능한 풀스택 애플리케이션으로 확장합니다.'
    },
    'database-supabase': {
      title: '초중급 백엔드: 데이터베이스에서 Supabase까지',
      description:
        '데이터 모델링, 저장, 권한 기능을 보강해 엔지니어링 개발로 나아갑니다.'
    },
    'ui-design': {
      title: '2.2 첫 번째 모던 앱 만들기 - UI 디자인',
      description:
        '통일된 시각 규칙 아래 페이지 구조, 컴포넌트, 레이아웃을 완성합니다.'
    },
    'design-to-code': {
      title: '2.6 디자인 프로토타입에서 코드로',
      description:
        '디자인을 유지보수 가능한 프런트엔드 코드와 컴포넌트로 전환합니다.'
    },
    'modern-component-library': {
      title: '2.7 모던 컴포넌트 라이브러리로 UI 개선하기',
      description: '컴포넌트 라이브러리로 UI 일관성과 개발 속도를 높입니다.'
    }
  },
  'es-es': {
    'ai-interface-code': {
      title: 'Backend junior: diseño y desarrollo de APIs',
      description:
        'Integra capacidades de IA mediante interfaces backend mantenibles.'
    },
    'fullstack-app': {
      title: 'Tarea Stage 2: aplicación full-stack',
      description:
        'Convierte las habilidades de prototipado en una aplicación desplegable.'
    },
    'database-supabase': {
      title: 'Backend junior: de base de datos a Supabase',
      description: 'Completa modelado de datos, almacenamiento y permisos.'
    },
    'ui-design': {
      title: '2.2 Crear una app moderna - Diseño UI',
      description:
        'Completa jerarquía, componentes y layout bajo una guía visual unificada.'
    },
    'design-to-code': {
      title: '2.6 Del prototipo de diseño al código',
      description:
        'Convierte diseños en código frontend y componentes mantenibles.'
    },
    'modern-component-library': {
      title: '2.7 Actualizar la UI con librerías modernas',
      description:
        'Usa librerías de componentes para mejorar consistencia y velocidad.'
    }
  },
  'fr-fr': {
    'ai-interface-code': {
      title: 'Backend junior : conception et développement d’API',
      description:
        'Intégrez les capacités IA via des interfaces backend maintenables.'
    },
    'fullstack-app': {
      title: 'Devoir Stage 2 : application full-stack',
      description:
        'Transformez les compétences de prototypage en application déployable.'
    },
    'database-supabase': {
      title: 'Backend junior : de la base de données à Supabase',
      description: 'Ajoutez modélisation de données, stockage et permissions.'
    },
    'ui-design': {
      title: '2.2 Créer une application moderne - UI Design',
      description:
        'Finalisez hiérarchie, composants et mise en page avec un système visuel unifié.'
    },
    'design-to-code': {
      title: '2.6 Du prototype design au code',
      description:
        'Transformez les maquettes en code frontend et composants maintenables.'
    },
    'modern-component-library': {
      title: '2.7 Moderniser l’interface avec une bibliothèque de composants',
      description:
        'Améliorez cohérence et efficacité avec des composants réutilisables.'
    }
  },
  'de-de': {
    'ai-interface-code': {
      title: 'Junior Backend: API-Design und Entwicklung',
      description:
        'Binden Sie KI-Fähigkeiten über wartbare Backend-Schnittstellen ein.'
    },
    'fullstack-app': {
      title: 'Stage 2 Aufgabe: Full-Stack-App',
      description:
        'Entwickeln Sie Prototyping-Fähigkeiten zu einer deploybaren Anwendung weiter.'
    },
    'database-supabase': {
      title: 'Junior Backend: von Datenbank zu Supabase',
      description:
        'Ergänzen Sie Datenmodellierung, Speicherung und Berechtigungen.'
    },
    'ui-design': {
      title: '2.2 Erste moderne App bauen - UI Design',
      description:
        'Erstellen Sie Seitenhierarchie, Komponenten und Layout in einem einheitlichen visuellen System.'
    },
    'design-to-code': {
      title: '2.6 Vom Designprototyp zum Code',
      description:
        'Überführen Sie Designs in wartbaren Frontend-Code und Komponenten.'
    },
    'modern-component-library': {
      title: '2.7 UI mit modernen Komponentenbibliotheken verbessern',
      description:
        'Steigern Sie Konsistenz und Entwicklungstempo mit Komponentenbibliotheken.'
    }
  },
  'ar-sa': {
    'ai-interface-code': {
      title: 'الخلفية للمستوى المتوسط: تصميم وتطوير الواجهات',
      description: 'اربط قدرات الذكاء الاصطناعي عبر واجهات خلفية قابلة للصيانة.'
    },
    'fullstack-app': {
      title: 'مهمة Stage 2: تطبيق Full-Stack',
      description: 'طوّر مهارات النمذجة إلى تطبيق كامل قابل للنشر.'
    },
    'database-supabase': {
      title: 'الخلفية للمستوى المتوسط: من قاعدة البيانات إلى Supabase',
      description: 'أكمل نمذجة البيانات والتخزين والصلاحيات.'
    },
    'ui-design': {
      title: '2.2 بناء أول تطبيق حديث - تصميم UI',
      description: 'أنجز هيكل الصفحات والمكونات والتخطيط ضمن نظام بصري موحد.'
    },
    'design-to-code': {
      title: '2.6 من نموذج التصميم إلى الكود',
      description: 'حوّل التصميم إلى كود واجهة أمامية ومكونات قابلة للصيانة.'
    },
    'modern-component-library': {
      title: '2.7 تحديث الواجهة بمكتبات مكونات حديثة',
      description: 'استخدم مكتبات المكونات لتحسين الاتساق وسرعة التطوير.'
    }
  },
  'vi-vn': {
    'ai-interface-code': {
      title: 'Backend sơ-trung cấp: thiết kế và phát triển API',
      description: 'Kết nối năng lực AI qua các API backend dễ bảo trì.'
    },
    'fullstack-app': {
      title: 'Bài tập Stage 2: ứng dụng full-stack',
      description:
        'Nâng kỹ năng nguyên mẫu thành ứng dụng full-stack có thể triển khai.'
    },
    'database-supabase': {
      title: 'Backend sơ-trung cấp: từ cơ sở dữ liệu đến Supabase',
      description: 'Bổ sung mô hình dữ liệu, lưu trữ và phân quyền.'
    },
    'ui-design': {
      title: '2.2 Xây dựng ứng dụng hiện đại đầu tiên - Thiết kế UI',
      description:
        'Hoàn thiện tầng trang, component và bố cục trong một hệ thống thị giác thống nhất.'
    },
    'design-to-code': {
      title: '2.6 Từ prototype thiết kế đến code',
      description:
        'Chuyển thiết kế thành code frontend và cấu trúc component dễ bảo trì.'
    },
    'modern-component-library': {
      title: '2.7 Cập nhật giao diện bằng thư viện component hiện đại',
      description:
        'Dùng thư viện component để tăng tính nhất quán và tốc độ phát triển.'
    }
  }
}

for (const locale of Object.keys(localizedStage2ArticleText)) {
  localizedArticleText[locale] = {
    ...localizedStage2ArticleText[locale],
    ...localizedArticleText[locale]
  }
}

const withLocalizedArticleText = (item, locale) => {
  const text = localizedArticleText[locale]?.[getArticleSlug(item.href)]
  return text ? { ...item, ...text } : item
}

const localizeArticleLinks = (items, locale) =>
  items.map((item) => ({
    ...withLocalizedArticleText(item, locale),
    href: item.href.replace(/^\/zh-cn\/stage-1\//, `/${locale}/stage-1/`)
  }))

export const relatedArticlesMap = new Proxy(rawRelatedArticlesMap, {
  get(target, prop) {
    if (typeof prop !== 'string') return target[prop]
    if (prop in target) return target[prop]

    const locale = getLocaleFromKey(prop)
    if (!locale || locale === 'zh-cn') return undefined

    const fallbackKey = prop.replace(`${locale}/`, 'zh-cn/')
    const fallbackItems = target[fallbackKey]
    if (!fallbackItems) return undefined

    return localizeArticleLinks(fallbackItems, locale)
  }
})
