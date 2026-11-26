export default {
  common: {
    before: '调整前',
    after: '调整后',
    reset: '重置'
  },
  compare: {
    title: '同一个页面，两种层级',
    subtitle:
      '左右两边用的是同一批文字，我只改了层级。你可以先把鼠标移到下面的问题上，对照一下两张图，再拖动“眯眼测试”。',
    squint: '眯眼测试',
    squintHint:
      '它就像眯起眼睛看页面：模糊以后还看得清的东西，就是最抢你注意力的东西。',
    squintClear: '清晰',
    squintBlurry: '模糊',
    issueLabel: '左图的四个问题',
    applyHint: '试着点一点右图上方的开关：每关掉一个，右图就会退回一个老问题。',
    tableHead: ['问题', '怎么改', '改完之后'],
    metrics: {
      borders: '装饰性边框',
      solid: '实心按钮',
      legend:
        '对比一下两图上方的数字：右图的边框和实心按钮少了很多，也正因为这样，标题和主按钮才显了出来。'
    },
    moreMenu: ['重命名', '删除'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: '字号分层',
        problem: '标题、筛选和按钮挤在一起，字的大小全都一样',
        fix: '先分层再摆放：标题一行，筛选一行；标题最大，说明其次，时间这类最小',
        result: '一眼就能看出这是什么页面、该先看哪里'
      },
      {
        id: 'borders',
        n: '②',
        short: '减少边框',
        problem: '每个模块都套了一个重边框，里面还要再套一层',
        fix: '先用对齐和间距来分组，只给真的需要边界的地方留一个框',
        result: '线少了，谁和谁是一组反而更好认'
      },
      {
        id: 'buttons',
        n: '③',
        short: '按钮分级',
        problem: '8 个按钮全是实心的，看上去个个都像主操作',
        fix: '一个范围里只留一个主按钮，其余的改成描边或文字按钮',
        result: '下一步该点哪里，看一眼就知道了'
      },
      {
        id: 'scope',
        n: '④',
        short: '动作归位',
        problem: '“删除”只影响某一个项目，却和“新建”这种全局操作放在一起',
        fix: '影响整个页面的放在页面级的位置，只影响某一条的就放在那条旁边',
        result: '每个按钮会影响到谁，都能说得清'
      }
    ],
    mock: {
      pageTitle: '项目',
      count: '共 2 个项目',
      filters: ['全部', '进行中'],
      sort: '最近更新',
      create: '新建项目',
      export: '导出',
      remove: '删除',
      open: '打开',
      more: '更多操作',
      items: [
        { name: '课程设计', meta: '文档 · 今天更新' },
        { name: '调研笔记', meta: '文档 · 3 天前更新' }
      ]
    }
  },
  anatomy: {
    title: '页面解剖图：四个层级各管一件事',
    subtitle:
      '把鼠标移到下面的层级上，右边会告诉你它在页面上的位置。点一下可以固定住。',
    taskLabel: '它负责什么',
    meansLabel: '它靠什么做到',
    showLabels: '显示标注',
    showGuides: '显示参考线',
    guidesNote:
      '打开参考线以后你会看到：所有内容都从同一条竖线开始；挨得近的内容间距很小，不同层级之间则留得很大。',
    gap: '间距',
    typeTitle: '下面这三行字，就是靠字号、粗细和颜色深浅拉开距离的',
    typeSample: '示例',
    layers: [
      {
        id: 'locate',
        name: '定位层',
        task: '让用户知道自己在哪、怎么回去',
        means: '一个不太抢眼的导航标题，加上大家熟悉的返回方式'
      },
      {
        id: 'primary',
        name: '主信息层',
        task: '告诉用户这一页最重要的内容是什么',
        means: '全页最大的字号，后面留一段空白，位置固定'
      },
      {
        id: 'support',
        name: '辅助层',
        task: '补充说明和元数据',
        means: '字更小、颜色更浅，但仍然看得清，而且紧挨着它说明的内容'
      },
      {
        id: 'action',
        name: '操作层',
        task: '告诉用户接下来可以做什么',
        means: '一个实心的主按钮，其余的弱化，放在内容读完之后'
      }
    ],
    typeScale: [
      { name: '内容标题', px: 22, weight: 700, note: '整个页面只出现一次' },
      { name: '正文', px: 14, weight: 400, note: '用来阅读的，行距放宽了一些' },
      {
        name: '辅助信息',
        px: 12,
        weight: 400,
        note: '更小、更浅，但不能再小了'
      }
    ],
    mock: {
      back: '返回',
      navTitle: '项目',
      title: '课程设计',
      meta: '4 位成员 · 12 篇文档 · 昨天更新',
      body: '记录本学期的课程设计进度，每周更新一次。',
      link: '查看全部文档',
      primary: '打开项目',
      secondary: '归档'
    }
  },
  grouping: {
    title: '要不要加边框？分三步看看',
    subtitle:
      '下面是同一份设置表单。请按顺序点这三步，看看分组是从哪一步开始变清楚的。',
    stepLabel: '第 {n} 步',
    metricBorders: '装饰性边框',
    metricGaps: '用了几种间距',
    showGaps: '显示间距',
    explicitToggle: '给“通知”加一层浅底色',
    implicitTitle: '隐式分组',
    implicitText: '不画框，靠距离、对齐和留白，让相关的内容看起来是一组的。',
    explicitTitle: '显式分组',
    explicitText:
      '给某一组加上底色或轮廓，让它的边界更明显。加之前先问问自己：这一组真的需要一条边界吗？',
    gapInside: '组内',
    gapBetween: '组间',
    steps: [
      {
        caption:
          '第一步，全部加上边框。每个元素都在喊“我很重要”，反而看不出谁和谁是一组。'
      },
      {
        caption:
          '第二步，只把边框去掉。页面是安静了，但间距还是一样大，内容散成了一片。'
      },
      {
        caption:
          '第三步，用间距来分组：相关的靠近，不相关的拉开。一条线都没画，但你已经能看出分组了。'
      }
    ],
    mock: {
      pageTitle: '账号设置',
      basic: '基本信息',
      email: '邮箱',
      phone: '手机号',
      password: '修改密码',
      newPassword: '新密码',
      confirm: '确认密码',
      notify: '通知',
      mail: '邮件通知',
      desktop: '桌面通知',
      save: '保存',
      cancel: '取消'
    }
  },
  buttonSpec: {
    title: '一个按钮的完整定义',
    subtitle:
      '平时说“加个按钮”，到了规范里会被拆成 10 个问题。从左边逐个点开，看看每一项都要交代到什么程度。',
    questionLabel: '规范会问什么',
    sampleLabel: '写出来是这样',
    sourceLabel: '想看原文',
    rolesRule:
      '注意，角色说的是“点下去会有什么后果”，而不是“这个按钮有多重要”。所以删除按钮虽然危险，也不该做成最显眼的那个。',
    structureRule:
      '标签最好用动词开头。比起“确定”，“保存草稿”能让人一眼知道点下去会发生什么。',
    visualRule:
      '样式管的是“有多显眼”，角色管的是“后果是什么”，这两件事要分开想。',
    sizeRule:
      '按钮看起来可以不大，但手指能点到的范围不能太小，所以这两个尺寸要分开定义。',
    sizeVisible: '可见高度',
    sizeTarget: '可点区域',
    statesRule: '这几种状态都要提前定义好，而且不能只靠颜色来区分。',
    behaviorRule:
      '点下去之后，用户随时都想知道发生了什么：马上要有反应，等待时要有提示，失败了要告诉他接下来怎么办。',
    adaptiveRule:
      '拖动上面的滑块试试：字号变大时，按钮会跟着变高，标签会换行，而不会被切掉一半。',
    a11yRule: '只用键盘，或者看不见屏幕的时候，这个按钮也要能用。',
    boundaryRule:
      '规范的最后一件大事，是告诉你什么时候不该用它。这和“能做什么”一样重要。',
    a11yNoName: '读屏软件读到：按钮',
    a11yWithName: '读屏软件读到：删除，按钮',
    fontSize: '字号',
    dimsLabel: '定义维度',
    purposeExamples: ['保存', '发送', '删除'],
    purposeLine:
      '这三个按钮看起来不一样，但做的是同一件事：你一点，马上就有事情发生。',
    roleSamples: {
      Normal: '预览',
      Primary: '发布',
      Cancel: '取消',
      Destructive: '删除项目'
    },
    anatomyBtn: '发布项目',
    genericBtn: '继续',
    deleteLabel: '删除',
    roles: [
      { name: 'Normal', desc: '普通动作，不用特别突出' },
      { name: 'Primary', desc: '当前最该点的那个，一个页面里一到两个' },
      { name: 'Cancel', desc: '让用户放弃，不抢主按钮的风头' },
      {
        name: 'Destructive',
        desc: '点了就收不回来，用警示色提醒，也不设成默认'
      }
    ],
    parts: [
      { name: '容器', desc: '按钮的身体，颜色、大小和按下时的变化都在它身上' },
      { name: '图标', desc: '可选，让人一眼认出这是做什么的' },
      { name: '标签', desc: '说清楚点下去会发生什么' }
    ],
    levels: [
      { name: 'Filled', desc: '最显眼，留给当前最重要的动作' },
      { name: 'Tonal', desc: '比描边醒目一点，给次要但希望被看见的动作' },
      { name: 'Outlined', desc: '和实心按钮搭配使用的备选动作' },
      { name: 'Text', desc: '最不显眼，给辅助入口' }
    ],
    stateGallery: ['默认', '悬停', '按下', '聚焦', '禁用'],
    behaviorStages: ['可操作', '已按下', '处理中', '完成 / 失败'],
    a11yChecks: [
      '有可访问的名称，图标按钮也不例外',
      '键盘能聚焦，焦点看得见',
      '文字和背景对比度足够',
      '状态不只靠颜色传达'
    ],
    boundaries: [
      { want: '去另一个页面', use: '链接、标签页' },
      { want: '在两个状态间切换', use: '开关、切换按钮' },
      { want: '从几个值里选一个', use: '弹出按钮、选择器' },
      { want: '收纳一串低频命令', use: '菜单' }
    ],
    boundaryWant: '想做的事',
    boundaryUse: '更合适的组件',
    dims: [
      {
        id: 'purpose',
        name: '用途',
        question: '这个元素解决什么问题？',
        sample: '“发布”按钮提交当前项目，成功后项目状态变为已发布。',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: '语义',
        question: '它表达的是动作、选择还是导航？',
        sample:
          '“删除项目”的角色是 Destructive，样式是 Outlined，不设为默认按钮。',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: '结构',
        question: '由哪些部分构成？',
        sample: '由容器、可选图标和标签组成；标签为一行动词短语。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: '视觉',
        question: '主次靠什么表达？',
        sample: '本页只有“发布”用 Filled，其余动作用 Outlined 或 Text。',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: '尺寸',
        question: '在哪些约束下排列？',
        sample: '可见高度 40，可点区域不小于 44×44；同组按钮等高、间距 8。',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: '状态',
        question: '每种条件下显示什么？',
        sample: '定义默认、悬停、按下、聚焦、禁用、加载六种状态。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: '行为',
        question: '触发后发生什么？',
        sample: '点击后立即进入加载态并阻止重复提交，结束后告知结果。',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: '适配',
        question: '环境变化后如何继续可用？',
        sample: '字号放大时允许标签换成两行，按钮高度随之增加。',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: '无障碍',
        question: '不依赖某一种感官能否操作？',
        sample: '图标按钮提供“删除”这个可访问名称，焦点顺序与视觉顺序一致。',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: '边界',
        question: '什么时候不该用它？',
        sample: '需要跳转页面时改用链接；需要在两个值之间切换时改用开关。',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: '按钮的状态与行为',
    subtitle: '状态是它此刻的样子，行为是点了之后发生的事。',
    statesTitle: '先看状态：一共六种',
    stateHead: ['状态', '什么时候出现', '外观怎么变', '注意'],
    liveHint:
      '你可以把鼠标移上去、按住不放，或者用键盘上的 Tab 键选中它，看看它分别变成什么样：',
    currentState: '当前状态',
    sample: '按钮',
    stateNames: {
      default: '默认',
      hover: '悬停',
      pressed: '按下',
      focus: '聚焦'
    },
    states: [
      {
        id: 'default',
        name: '默认',
        trigger: '没有交互时',
        change: '常规外观',
        tip: '页面里大多数按钮都在这个状态'
      },
      {
        id: 'hover',
        name: '悬停',
        trigger: '指针移入',
        change: '背景略深一点',
        tip: '告诉用户“这里可以点”'
      },
      {
        id: 'pressed',
        name: '按下',
        trigger: '按下还没松开',
        change: '背景更深',
        tip: '自己画的按钮，这一态要自己补上'
      },
      {
        id: 'focus',
        name: '聚焦',
        trigger: '键盘 Tab 移入',
        change: '外圈出现焦点环',
        tip: '不要用 outline: none 把它去掉'
      },
      {
        id: 'disabled',
        name: '禁用',
        trigger: '前置条件不满足时',
        change: '降低不透明度，不响应点击',
        tip: '最好同时说明为什么不能点'
      },
      {
        id: 'loading',
        name: '加载',
        trigger: '动作已触发，还没结束',
        change: '标签改为进行中，出现指示器',
        tip: '它是在告诉用户“我正在办”，而不是“你不能点”'
      }
    ],
    behaviorTitle: '再看行为：点下去之后发生什么',
    behaviorHint: '点一下“发布项目”，看看从点下去到出结果，中间都发生了什么。',
    scenario: '模拟结果',
    scenarioSuccess: '成功',
    scenarioFail: '失败',
    run: '发布项目',
    running: '发布中…',
    done: '已发布',
    failed: '发布失败，内容已保留',
    retry: '再试一次',
    stageHead: ['阶段', '用户需要知道'],
    stages: [
      { name: '可操作', desc: '点之前：按钮告诉我会发生什么' },
      { name: '立即反馈', desc: '点下去的瞬间：外观变了，说明点到了' },
      { name: '处理中', desc: '等待时：有进度指示，重复点击被拦住' },
      { name: '结果', desc: '成功要明确告知；失败要说清下一步' },
      { name: '恢复', desc: '失败后输入还在，可以直接重试' }
    ],
    rulesTitle: '四条规则',
    rules: [
      '点下去马上要有反应，哪怕只是按钮变深了一点',
      '等待的时候要有提示，别让用户以为页面卡住了',
      '加载中和禁用不是一回事：加载是在说“我正在办”，禁用是在说“不能点”',
      '标签也要跟着变：点之前说“发布项目”，点了之后说“发布中…”'
    ]
  },
  lookalike: {
    title: '长得像，但不是一回事',
    subtitle:
      '下面两个控件长得几乎一模一样。请你分别点开，各选一项，看看它们哪里不一样。',
    popupTag: '选一个值',
    pullTag: '执行一个命令',
    popupInitial: '排序：最新',
    popupPrefix: '排序：',
    popupOptions: ['最新', '最早', '名称'],
    pullInitial: '操作',
    pullOptions: ['重命名', '复制链接', '删除'],
    pullDone: '已执行：{name}',
    popupValue: '当前值：{value}',
    pullIdle: '还没有执行任何命令',
    tableHead: ['', 'Pop-up 按钮', 'Pull-down 按钮'],
    rows: [
      ['点开以后', '几个可以选的选项，当前选中的打勾', '几条可以执行的命令'],
      [
        '选一项之后',
        '记住你的选择，按钮上的字也跟着变',
        '执行这条命令然后收起，按钮上的字不变'
      ],
      ['适合做', '切换排序、选择视图、挑选选项', '重命名、导出、删除这类动作'],
      ['别拿它做', '放命令', '当筛选器或者导航']
    ],
    conclusion:
      '看到区别了吗？两个控件长得一样，但你刚才点下去的时候，左边只是帮你换了一个值，右边是真的执行了一件事。以后拿不准该用哪个，别看长相，先问自己：用户点下去，是想换一个值，还是想让它做件事？'
  },
  skeleton: {
    title: '拆开一个页面：谁管导航，谁管内容，谁管操作',
    subtitle:
      '下面是一个很普通的项目列表页。把鼠标移到左边的某一项上（点一下可以固定住），右边会用实线告诉你它在哪里，用虚线告诉你它会影响到谁。',
    legendCtl: '实线：它在哪里',
    legendAffect: '虚线：它会影响到谁',
    leading: '返回和标题放左边',
    trailing: '操作放右边，只突出一个',
    taskLabel: '它要回答的问题是',
    affectLabel: '它会影响到',
    misplacedToggle: '试试把“删除”挪到顶栏',
    misplacedHint:
      '现在“删除”和“新建项目”并排放在了顶栏。点一下它，会删掉哪一个项目？已经说不清了。这就是为什么操作要放在它影响的那条内容旁边。',
    items: [
      {
        id: 'global',
        name: '全局导航',
        question: '我要去产品的哪个区域？',
        affect: '整个页面都会换成另一个区域'
      },
      {
        id: 'locate',
        name: '页面标题',
        question: '我现在在哪个页面？怎么回去？',
        affect: '当前这个页面'
      },
      {
        id: 'content',
        name: '主内容区',
        question: '我在看的是什么？',
        affect: '它就是被别的控件影响的那部分内容'
      },
      {
        id: 'listctl',
        name: '筛选和排序',
        question: '我想怎么看这份列表？',
        affect: '列表里显示哪些项目、按什么顺序'
      },
      {
        id: 'pageact',
        name: '页面级操作',
        question: '我想对整个页面做什么？',
        affect: '列表里的所有项目'
      },
      {
        id: 'itemact',
        name: '条目级操作',
        question: '我想对其中某一条做什么？',
        affect: '只有这一条项目'
      }
    ],
    mock: {
      nav: ['项目', '成员', '设置'],
      title: '项目',
      section: '最近项目',
      filters: ['全部', '进行中'],
      sort: '最近更新',
      export: '导出',
      create: '新建项目',
      remove: '删除',
      open: '打开',
      more: '更多操作',
      items: [
        { name: '课程设计', meta: '文档 · 今天更新' },
        { name: '调研笔记', meta: '文档 · 3 天前更新' }
      ]
    }
  },
  specMap: {
    title: '先看看设计规范里都有什么',
    subtitle:
      '很多人以为设计规范就是讲配色和圆角。我们拿 Apple 的规范目录来数一数：它一共分成 6 大类、158 个主题。你可以点点下面的主题，也可以用上面的开关，把和“页面”“按钮”有关的主题挑出来。',
    checkedAt: '分类和数量按 2026 年 11 月的 Apple HIG 目录核对',
    all: '全部主题',
    page: '和页面有关',
    button: '和按钮有关',
    topicsUnit: '个主题',
    moreTopics: '还有 {n} 个',
    pick: '点一个主题，看看它要回答什么问题',
    questionLabel: '它要回答的问题是',
    relPage: '这一章讲“页面”时会用到它',
    relButton: '这一章讲“按钮”时会用到它',
    relNone: '这一章暂时用不到，但做产品时会遇到',
    relPageShort: '和页面有关',
    relButtonShort: '和按钮有关',
    relBoth: '页面和按钮都用得到',
    paraphraseNote: '这些问题是我们用大白话转述的，不是官方原文。',
    takeaway:
      '数完你会发现，这一章讲到的页面层级和按钮，只占其中很小的一部分。不过弄明白了这一部分，你就有了一把尺子，可以自己去看懂剩下的主题。',
    categories: [
      {
        id: 'getting-started',
        name: '入门与平台',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: '设计原则',
            rel: 'both',
            q: '什么样的界面算是好用、好看，评判的标准是什么'
          },
          {
            name: '为 iOS 设计',
            rel: '',
            q: '在手机上做设计，要特别注意些什么'
          },
          {
            name: '为 macOS 设计',
            rel: '',
            q: '在电脑上做设计，和手机上有什么不同'
          }
        ]
      },
      {
        id: 'foundations',
        name: '基础规范',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: '布局',
            rel: 'page',
            q: '页面上的东西怎么排，才能适应不同大小的屏幕'
          },
          {
            name: '排版',
            rel: 'page',
            q: '用多大的字、多粗的字重，才能让人分得清主次'
          },
          {
            name: '颜色',
            rel: 'both',
            q: '每种颜色用在哪里，换成深色模式又该怎么办'
          },
          {
            name: '无障碍',
            rel: 'both',
            q: '看不见、听不清，或者只用键盘的人，怎么使用你的产品'
          },
          {
            name: '图标',
            rel: 'button',
            q: '图标画成什么风格、多大，什么时候要配上文字'
          },
          {
            name: '界面文案',
            rel: 'both',
            q: '按钮和提示上的字怎么写，才让人一看就懂'
          },
          { name: '动效', rel: '', q: '什么时候该动，怎么动才不让人分心' }
        ]
      },
      {
        id: 'patterns',
        name: '交互模式',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: '反馈',
            rel: 'button',
            q: '用户点了之后，怎么让他知道已经点到了'
          },
          {
            name: '加载',
            rel: 'both',
            q: '等待的时候给用户看什么，才不会以为卡住了'
          },
          {
            name: '撤销与重做',
            rel: 'both',
            q: '做错了怎么退回去，哪些操作不需要先确认'
          },
          {
            name: '模态',
            rel: 'page',
            q: '什么时候可以打断用户，怎么让他退出来'
          },
          { name: '搜索', rel: 'page', q: '怎么帮用户快速找到想要的东西' },
          { name: '设置', rel: 'page', q: '设置页面该怎么组织，才不会让人迷路' }
        ]
      },
      {
        id: 'components',
        name: '组件',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: '按钮',
            rel: 'button',
            q: '什么动作该做成按钮，它有哪些状态'
          },
          {
            name: '工具栏',
            rel: 'page',
            q: '一排操作怎么分组，哪个放在最显眼的位置'
          },
          {
            name: '菜单',
            rel: 'button',
            q: '一大堆命令怎么收起来，什么时候不该用菜单'
          },
          { name: '警告提示', rel: 'both', q: '什么信息重要到必须打断用户' },
          { name: '列表与表格', rel: 'page', q: '很多条数据怎么排，才好扫读' },
          {
            name: '开关',
            rel: 'button',
            q: '在两个状态之间切换，该用什么控件'
          },
          { name: '选择器', rel: 'button', q: '从几个值里挑一个，该用什么控件' }
        ]
      },
      {
        id: 'inputs',
        name: '输入方式',
        en: 'Inputs',
        count: 13,
        topics: [
          { name: '手势', rel: '', q: '哪些操作可以用滑动、轻点来完成' },
          { name: '键盘', rel: 'both', q: '只用键盘，能不能走完整个流程' },
          {
            name: '指针设备',
            rel: 'both',
            q: '鼠标移上去、按下去的时候，控件该怎么回应'
          }
        ]
      },
      {
        id: 'technologies',
        name: '技术与服务',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: '通知',
            rel: '',
            q: '什么时候可以给用户发通知，怎么写才不打扰'
          },
          { name: '小组件', rel: '', q: '放在桌面上的小组件该显示多少内容' },
          { name: 'Siri', rel: '', q: '哪些操作可以让用户动动嘴就完成' }
        ]
      }
    ]
  },
  decision: {
    title: '轮到你了：哪个应该是主按钮？',
    subtitle:
      '下面是一个“编辑项目”页面。为了让问题更明显，我把 5 个按钮画成了一模一样。请你点一下你觉得应该最显眼的那个。',
    cardTitle: '编辑项目',
    nameLabel: '项目名称',
    nameValue: '课程设计',
    descLabel: '项目描述',
    descValue: '记录本学期的课程设计进度',
    buttons: [
      { id: 'save', label: '保存修改' },
      { id: 'preview', label: '预览' },
      { id: 'export', label: '导出' },
      { id: 'cancel', label: '取消' },
      { id: 'remove', label: '删除项目' }
    ],
    hintToggle: '想不出来？看看判断的步骤',
    stepsTitle: '给按钮分主次的三个问题',
    steps: [
      {
        q: '用户打开这个页面，最想完成什么？',
        a: '是“保存修改”。它就是唯一的主按钮。'
      },
      {
        q: '哪些动作只是帮帮忙的？',
        a: '预览、导出和取消。它们用描边或文字按钮，不要抢戏。'
      },
      {
        q: '哪个动作做了就收不回来？',
        a: '删除项目。用警示色提醒，并且让它离主按钮远一点。'
      }
    ],
    feedback: {
      save: '用户打开“编辑项目”这个页面，就是为了把修改存下来，所以它应该是唯一的主按钮。',
      preview:
        '预览是保存之前看一眼的辅助步骤，用描边按钮就够了，不用做成最显眼的。',
      export: '导出是用得比较少的辅助操作，用文字按钮就好。',
      cancel: '取消是给用户留的退路。退路要容易找到，但不该比正事还显眼。',
      remove:
        '删除项目确实是最危险的动作，但用户来这里不是为了删除。危险用红色提醒就够了，不应该抢主按钮的位置。'
    },
    wrongLabel: '还不太对',
    rightLabel: '选对了',
    solvedTitle: '改好以后',
    solvedNote:
      '现在一眼就能看出来：先保存，想先看效果就预览，删除被单独放在了另一侧。',
    reset: '再做一次'
  },
  fluent: {
    title: '按钮越多，越要管住“谁最显眼”',
    subtitle:
      'Fluent 2 把按钮分成四级：Primary、Secondary、Subtle、Transparent。下面这排操作来自一个普通的后台页面。你可以先拖动滑块增减按钮，再切换两种做法，看看有什么不同。',
    count: '按钮数量',
    styleAll: '全部做成 Primary',
    styleLevels: '按 Fluent 分四级',
    allNote: '每一个都是实心的 Primary。按钮一多，眼睛就不知道该先看哪里了。',
    levelsNote:
      '只有“新建项目”还是 Primary，“导出”降成了 Secondary，其余的平时几乎看不见，鼠标移上去才出现。',
    legendTitle: '四级按钮，把鼠标移上去试试',
    levels: [
      { name: 'Primary', desc: '实心。一个区域只放一个' },
      { name: 'Secondary', desc: '描边。次要但常用的动作' },
      { name: 'Subtle', desc: '平时是透明的，移上去出现一层浅底' },
      { name: 'Transparent', desc: '平时连边框都没有，移上去才出现' }
    ],
    actions: [
      { id: 'create', label: '新建项目' },
      { id: 'export', label: '导出' },
      { id: 'import', label: '导入' },
      { id: 'filter', label: '筛选' },
      { id: 'sort', label: '排序' },
      { id: 'refresh', label: '刷新' },
      { id: 'share', label: '分享' },
      { id: 'archive', label: '归档' }
    ]
  },
  tokens: {
    title: '改一处，两个页面一起变',
    subtitle:
      'Atlassian 的做法，是把颜色、圆角、尺寸这些值抽成“令牌”（token），所有页面都从同一套令牌里取值。下面有两个页面，你可以拖动右边的滑块，再勾上“各做各的”，对比一下。',
    pageA: '项目列表',
    pageB: '账号设置',
    radius: '圆角',
    height: '按钮高度',
    accent: '主色',
    pixel: '{n}px',
    colors: ['蓝', '绿', '橙', '紫'],
    inconsistent: '各做各的（不用令牌）',
    inconsistentNote:
      '现在右边的页面用的是有人随手定的颜色、圆角和高度。单看每一个都还行，放在一起就不像同一个产品了。',
    consistentNote:
      '两个页面读的是同一套令牌。你刚才拖动滑块的时候，它们是一起变的。',
    mock: {
      list: {
        title: '项目',
        create: '新建项目',
        open: '打开',
        items: [
          { name: '课程设计', meta: '文档 · 今天更新' },
          { name: '调研笔记', meta: '文档 · 3 天前更新' }
        ]
      },
      settings: {
        title: '账号设置',
        email: '邮箱',
        emailValue: 'you@example.com',
        notify: '接收通知',
        save: '保存',
        cancel: '取消'
      }
    }
  },
  layers3: {
    title: '把三层拉开',
    subtitle:
      '一个页面通常有三层：主信息、辅助信息、次级操作。下面用的是同一份内容，你可以拖动滑块，看看三层从“一样重”到“拉开”的过程。',
    slider: '层级差距',
    flat: '三层一样重：都重要，等于都不重要',
    mid: '拉开了一些：先看到标题，再看到说明',
    full: '完全拉开：一眼就知道先看什么、下一步做什么',
    labels: ['主信息', '辅助信息', '次级操作'],
    mock: {
      title: '课程设计',
      body: '记录本学期的课程设计进度，每周更新一次。',
      meta: '4 位成员 · 12 篇文档 · 昨天更新',
      primary: '打开项目',
      secondary: ['归档', '分享']
    }
  },
  taskflow: {
    title: '同一个页面，两种摆法',
    subtitle:
      '下面两个页面用的是同样的六个模块。左边是“想到什么放什么”，右边是围绕用户的任务组织的。把鼠标移到右边的步骤上，看看这个任务是怎么走下来的。',
    stacked: '堆模块',
    task: '围绕任务',
    taskLine: '用户的任务：找到最近在做的项目，继续编辑',
    steps: [
      {
        name: '知道这是什么页面',
        detail: '标题一句话说清页面目标，最先被看到'
      },
      { name: '缩小范围', detail: '筛选紧跟在标题后面，想找哪个项目可以先筛' },
      { name: '找到目标', detail: '项目列表是页面的主体，最近更新的排在前面' },
      { name: '开始操作', detail: '每一行的主操作，就在那一行旁边' }
    ],
    modules: {
      title: '项目',
      goal: '管理你的全部项目',
      announce: '公告',
      announceText: '本周六 02:00–04:00 例行维护',
      recommend: '推荐',
      recommendText: '试试新的甘特图视图',
      settings: '设置',
      filter: '筛选',
      list: '项目列表',
      open: '打开',
      items: [
        { name: '课程设计', meta: '文档 · 今天更新' },
        { name: '调研笔记', meta: '文档 · 3 天前更新' }
      ]
    }
  },
  roleKinds: {
    title: '五种常见角色，长什么样',
    subtitle:
      '上表里的五种角色，放到一行里就是这样。它们的尺寸和圆角完全一样，区别只在填充和颜色。',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: '当前区域最关键的动作',
        sample: '保存'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: '支持性动作',
        sample: '预览'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: '弱操作',
        sample: '了解更多'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: '删除、停用这类风险操作',
        sample: '删除项目'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: '局部的工具操作',
        sample: '关闭'
      }
    ]
  }
}
