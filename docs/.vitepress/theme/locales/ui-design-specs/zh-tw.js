export default {
  common: {
    before: '調整前',
    after: '調整後',
    reset: '重置'
  },
  compare: {
    title: '同一個頁面，兩種層級',
    subtitle:
      '左右兩邊用的是同一份文字，我只改了層級。你可以先把滑鼠移到下面的問題上，比較兩張圖，再拖動「瞇眼測試」的滑桿。',
    squint: '瞇眼測試',
    squintHint:
      '就像瞇起眼睛看頁面一樣。畫面模糊後還看得清楚的東西，就是最搶你注意力的東西。',
    squintClear: '清晰',
    squintBlurry: '模糊',
    issueLabel: '左圖的四個問題',
    applyHint:
      '點點右圖上方的開關。每關掉一項改進，右圖就會重新出現一個原本的問題。',
    tableHead: ['問題', '怎麼改', '改完之後'],
    metrics: {
      borders: '裝飾性邊框',
      solid: '實心按鈕',
      legend:
        '比較兩張圖上方的數字。右圖少了許多邊框和實心按鈕，標題和主按鈕就更顯眼了。'
    },
    moreMenu: ['重新命名', '刪除'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: '字級分層',
        problem: '標題、篩選和按鈕擠在一起，字的大小全都一樣',
        fix: '先分層再擺放：標題和篩選各占一列，標題最大，說明其次，時間這類資訊最小',
        result: '一眼就能看出這是什麼頁面、該先看哪裡'
      },
      {
        id: 'borders',
        n: '②',
        short: '減少邊框',
        problem: '每個模塊外面都加了粗邊框，裡面又加了一層',
        fix: '先用對齊和間距來分組，只給真的需要邊界的地方留一個框',
        result: '線少了，誰和誰是一組反而更好認'
      },
      {
        id: 'buttons',
        n: '③',
        short: '按鈕分級',
        problem: '8 個按鈕全是實心的，看上去個個都像主操作',
        fix: '一個範圍裡只留一個主按鈕，其餘的改成描邊或文字按鈕',
        result: '下一步該點哪裡，看一眼就知道了'
      },
      {
        id: 'scope',
        n: '④',
        short: '操作放回該放的位置',
        problem: '「刪除」隻影響某一個項目，卻和「新建」這種全域操作放在一起',
        fix: '影響整個頁面的操作放在頁面層級，只影響一筆的操作就放在那筆旁邊',
        result: '每個按鈕會影響到誰，都能說得清'
      }
    ],
    mock: {
      pageTitle: '項目',
      count: '共 2 個項目',
      filters: ['全部', '進行中'],
      sort: '最近更新',
      create: '新建項目',
      export: '導出',
      remove: '刪除',
      open: '打開',
      more: '更多操作',
      items: [
        {
          name: '課程設計',
          meta: '文件 · 今天更新'
        },
        {
          name: '調查筆記',
          meta: '文件 · 3 天前更新'
        }
      ]
    }
  },
  anatomy: {
    title: '頁面解剖圖：四個層級各管一件事',
    subtitle:
      '把滑鼠移到下面的層級上，右邊會告訴你它在頁面上的位置。點一下可以固定住。',
    taskLabel: '它負責什麼',
    meansLabel: '它靠什麼做到',
    showLabels: '顯示標註',
    showGuides: '顯示參考線',
    guidesNote:
      '打開參考線後你會看到，所有內容都沿著同一條垂直線對齊。相關內容排得很近，不同層級之間則留得比較寬。',
    gap: '間距',
    typeTitle: '下面三行文字靠字級、字重和顏色深淺拉開層級',
    typeSample: '示例',
    layers: [
      {
        id: 'locate',
        name: '定位層',
        task: '讓用戶知道自己在哪、怎麼回去',
        means: '一個不太搶眼的導航標題，加上大家熟悉的返回方式'
      },
      {
        id: 'primary',
        name: '主資訊層',
        task: '告訴用戶這一頁最重要的內容是什麼',
        means: '全頁最大的字級，後面留一段空白，位置固定'
      },
      {
        id: 'support',
        name: '輔助層',
        task: '補充說明和中繼資料',
        means: '字更小、顏色更淺，但仍然看得清楚，而且緊鄰它說明的內容'
      },
      {
        id: 'action',
        name: '操作層',
        task: '告訴用戶接下來可以做什麼',
        means: '一個實心的主按鈕，其餘的弱化，放在內容讀完之後'
      }
    ],
    typeScale: [
      {
        name: '內容標題',
        px: 22,
        weight: 700,
        note: '整個頁面只出現一次'
      },
      {
        name: '正文',
        px: 14,
        weight: 400,
        note: '用來閱讀，所以行距放寬了一些'
      },
      {
        name: '輔助資訊',
        px: 12,
        weight: 400,
        note: '更小、更淺，但不能再小了'
      }
    ],
    mock: {
      back: '返回',
      navTitle: '項目',
      title: '課程設計',
      meta: '4 位成員 · 12 篇文件 · 昨天更新',
      body: '記錄本學期的課程設計進度，每週更新一次。',
      link: '查看全部文件',
      primary: '打開項目',
      secondary: '歸檔'
    }
  },
  grouping: {
    title: '要不要加邊框？分三步看看',
    subtitle:
      '下面是同一份設定表單。請按順序點這三步，看看分組是從哪一步開始變清楚的。',
    stepLabel: '第 {n} 步',
    metricBorders: '裝飾性邊框',
    metricGaps: '用了幾種間距',
    showGaps: '顯示間距',
    explicitToggle: '給「通知」加一層淺底色',
    implicitTitle: '隱式分組',
    implicitText: '光靠間距、對齊和留白，就能讓相關內容看起來像同一組。',
    explicitTitle: '顯式分組',
    explicitText:
      '給某一組加上底色或輪廓，讓它的邊界更明顯。加之前先問問自己，這一組真的需要一條邊界嗎？',
    gapInside: '組內',
    gapBetween: '組間',
    steps: [
      {
        caption:
          '第一步，全部加上邊框。每個元素都在喊「我很重要」，反而看不出誰和誰是一組。'
      },
      {
        caption:
          '第二步，只去掉邊框。畫面清爽了，但間距還是一樣大，內容依然散成一片。'
      },
      {
        caption:
          '第三步，用間距來分組：相關的靠近，不相關的拉開。一條線都沒畫，但你已經能看出分組了。'
      }
    ],
    mock: {
      pageTitle: '帳號設定',
      basic: '基本資訊',
      email: '電子郵件',
      phone: '手機號碼',
      password: '變更密碼',
      newPassword: '新密碼',
      confirm: '再次輸入密碼',
      notify: '通知',
      mail: '郵件通知',
      desktop: '桌面通知',
      save: '保存',
      cancel: '取消'
    }
  },
  buttonSpec: {
    title: '一個按鈕的完整定義',
    subtitle:
      '平常說「加個按鈕」，到了規範裡會拆成 10 個問題。從左邊逐一點開，看看每項要交代到什麼程度。',
    questionLabel: '規範會問什麼',
    sampleLabel: '寫出來是這樣',
    sourceLabel: '想看原文',
    rolesRule:
      '角色說明按下去會有什麼後果，這和按鈕顯不顯眼是兩回事。刪除按鈕有風險，也不用做成最顯眼的按鈕。',
    structureRule:
      '標籤最好用動詞開頭。比起「確定」，「保存草稿」能讓人一眼知道點下去會發生什麼。',
    visualRule:
      '樣式管的是「有多顯眼」，角色管的是「後果是什麼」，這兩件事要分開想。',
    sizeRule:
      '按鈕看起來可以不大，但手指能點到的範圍要夠大，所以兩個尺寸要分開定義。',
    sizeVisible: '可見高度',
    sizeTarget: '可點區域',
    statesRule: '這幾種狀態都要提前定義好，而且不能只靠顏色來區分。',
    behaviorRule:
      '按下按鈕後，每一步都要讓用戶知道發生了什麼。按下時立即回應，等待時給提示，失敗時說明接下來可以怎麼做。',
    adaptiveRule:
      '拖動上面的滑桿試試。字級放大時，按鈕會跟著變高，標籤會換行，文字也能完整顯示。',
    a11yRule: '即使用戶只用鍵盤，或看不見螢幕，也要能操作這個按鈕。',
    boundaryRule:
      '規範的最後一件大事，是告訴你什麼時候不該用它。這和「能做什麼」一樣重要。',
    a11yNoName: '螢幕閱讀器讀到：按鈕',
    a11yWithName: '螢幕閱讀器讀到：刪除，按鈕',
    fontSize: '字級',
    dimsLabel: '定義維度',
    purposeExamples: ['保存', '發送', '刪除'],
    purposeLine:
      '這三個按鈕看起來不一樣，但有個共通點：你一按，就會立刻觸發一個動作。',
    roleSamples: {
      Normal: '預覽',
      Primary: '發佈',
      Cancel: '取消',
      Destructive: '刪除項目'
    },
    anatomyBtn: '發佈項目',
    genericBtn: '繼續',
    deleteLabel: '刪除',
    roles: [
      {
        name: 'Normal',
        desc: '普通動作，不用特別突出'
      },
      {
        name: 'Primary',
        desc: '當前最該點的那個，一個頁面裡一到兩個'
      },
      {
        name: 'Cancel',
        desc: '讓用戶放棄，不搶主按鈕的風頭'
      },
      {
        name: 'Destructive',
        desc: '點了就收不回來，用警示色提醒，也不設成預設'
      }
    ],
    parts: [
      {
        name: '容器',
        desc: '按鈕的本體，呈現顏色、大小和按下時的變化'
      },
      {
        name: '圖示',
        desc: '可選，讓人一眼認出這是做什麼的'
      },
      {
        name: '標籤',
        desc: '說清楚點下去會發生什麼'
      }
    ],
    levels: [
      {
        name: 'Filled',
        desc: '最顯眼，留給當前最重要的動作'
      },
      {
        name: 'Tonal',
        desc: '比描邊醒目一點，給次要但仍希望用戶留意的動作'
      },
      {
        name: 'Outlined',
        desc: '和實心按鈕搭配使用的備選動作'
      },
      {
        name: 'Text',
        desc: '最不顯眼，給輔助入口'
      }
    ],
    stateGallery: ['預設', '懸停', '按下', '聚焦', '禁用'],
    behaviorStages: ['可操作', '已按下', '處理中', '完成 / 失敗'],
    a11yChecks: [
      '有無障礙名稱，圖示按鈕也不例外',
      '用鍵盤可以移到按鈕上，也看得到焦點',
      '文字和背景對比度足夠',
      '狀態不只靠顏色傳達'
    ],
    boundaries: [
      {
        want: '去另一個頁面',
        use: '連結、分頁'
      },
      {
        want: '在兩個狀態間切換',
        use: '開關、切換按鈕'
      },
      {
        want: '從幾個值裡選一個',
        use: '彈出按鈕、選擇器'
      },
      {
        want: '收納一組不常用的命令',
        use: '菜單'
      }
    ],
    boundaryWant: '想做的事',
    boundaryUse: '更合適的組件',
    dims: [
      {
        id: 'purpose',
        name: '用途',
        question: '這個元素解決什麼問題？',
        sample: '「發佈」按鈕提交當前項目，成功後項目狀態變為已發佈。',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: '語義',
        question: '它表達的是動作、選擇還是導航？',
        sample:
          '「刪除項目」的角色是 Destructive，樣式是 Outlined，不設為預設按鈕。',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: '結構',
        question: '由哪些部分構成？',
        sample: '包含容器、選用的圖示和標籤。標籤是一行以動詞開頭的短語。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: '視覺',
        question: '主次靠什麼表達？',
        sample: '本頁只有「發佈」用 Filled，其餘動作用 Outlined 或 Text。',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: '尺寸',
        question: '在哪些約束下排列？',
        sample: '可見高度 40，點按範圍至少 44×44。同組按鈕等高，間距為 8。',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: '狀態',
        question: '每種條件下顯示什麼？',
        sample: '定義預設、懸停、按下、聚焦、禁用、載入六種狀態。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: '行為',
        question: '觸發後發生什麼？',
        sample: '按下後立即顯示載入狀態，避免重複提交，並在結束後告知結果。',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: '適應情境',
        question: '使用環境改變時，要怎麼讓它維持可用？',
        sample: '字級放大時允許標籤換成兩行，按鈕高度隨之增加。',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: '無障礙',
        question: '用戶能不能在不依賴單一感官的情況下操作？',
        sample: '圖示按鈕提供「刪除」這個無障礙名稱，焦點順序與視覺順序一致。',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: '邊界',
        question: '什麼時候不該用它？',
        sample: '要跳到其他頁面時用連結，要在兩個值之間切換時用開關。',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: '按鈕的狀態與行為',
    subtitle: '狀態是它此刻的樣子，行為是點了之後發生的事。',
    statesTitle: '先看狀態：一共六種',
    stateHead: ['狀態', '什麼時候出現', '外觀怎麼變', '注意'],
    liveHint:
      '你可以把滑鼠移上去、按住不放，或用鍵盤上的 Tab 鍵把焦點移到按鈕上，看看它分別會變成什麼樣子：',
    currentState: '當前狀態',
    sample: '按鈕',
    stateNames: {
      default: '預設',
      hover: '懸停',
      pressed: '按下',
      focus: '聚焦'
    },
    states: [
      {
        id: 'default',
        name: '預設',
        trigger: '沒有交互時',
        change: '常規外觀',
        tip: '頁面裡大多數按鈕都在這個狀態'
      },
      {
        id: 'hover',
        name: '懸停',
        trigger: '游標移到按鈕上',
        change: '背景略深一點',
        tip: '告訴用戶「這裡可以點」'
      },
      {
        id: 'pressed',
        name: '按下',
        trigger: '按下後還沒放開',
        change: '背景更深',
        tip: '如果按鈕是自己做的，記得補上這個狀態'
      },
      {
        id: 'focus',
        name: '聚焦',
        trigger: '用 Tab 鍵把焦點移到按鈕上',
        change: '按鈕外圍出現焦點外框',
        tip: '不要用 outline: none 把它去掉'
      },
      {
        id: 'disabled',
        name: '禁用',
        trigger: '前置條件不滿足時',
        change: '降低不透明度，按下時不會有反應',
        tip: '最好同時說明為什麼不能點'
      },
      {
        id: 'loading',
        name: '載入',
        trigger: '動作已觸發，還沒結束',
        change: '標籤改為進行中，出現指示器',
        tip: '用「處理中」告訴用戶正在執行操作，跟單純不能按的情況區分開來'
      }
    ],
    behaviorTitle: '再看行為：點下去之後發生什麼',
    behaviorHint:
      '點一下「發佈項目」，看看從點下去到出結果，中間都發生了什麼。',
    scenario: '模擬結果',
    scenarioSuccess: '成功',
    scenarioFail: '失敗',
    run: '發佈項目',
    running: '發佈中…',
    done: '已發佈',
    failed: '發佈失敗，內容已保留',
    retry: '再試一次',
    stageHead: ['階段', '用戶需要知道'],
    stages: [
      {
        name: '可操作',
        desc: '點之前：按鈕告訴我會發生什麼'
      },
      {
        name: '立即回饋',
        desc: '點下去的瞬間：外觀變了，說明點到了'
      },
      {
        name: '處理中',
        desc: '等待時，顯示進度並避免重複點按'
      },
      {
        name: '結果',
        desc: '成功時明確告知結果，失敗時說明下一步'
      },
      {
        name: '恢復',
        desc: '失敗後保留輸入內容，可以直接重試'
      }
    ],
    rulesTitle: '四條規則',
    rules: [
      '點下去馬上要有反應，哪怕只是按鈕變深了一點',
      '等待的時候要有提示，別讓用戶以為頁面卡住了',
      '載入表示「正在處理」，禁用表示「現在不能按」',
      '標籤也要跟著變：點之前說「發佈項目」，點了之後說「發佈中…」'
    ]
  },
  lookalike: {
    title: '長得像，但不是一回事',
    subtitle:
      '下面兩個控件長得幾乎一模一樣。請你分別點開，各選一項，看看它們哪裡不一樣。',
    popupTag: '選一個值',
    pullTag: '執行一個命令',
    popupInitial: '排序：最新',
    popupPrefix: '排序：',
    popupOptions: ['最新', '最早', '名稱'],
    pullInitial: '操作',
    pullOptions: ['重新命名', '複製連結', '刪除'],
    pullDone: '已執行：{name}',
    popupValue: '當前值：{value}',
    pullIdle: '還沒有執行任何命令',
    tableHead: ['', 'Pop-up 按鈕', 'Pull-down 按鈕'],
    rows: [
      ['點開以後', '幾個可以選的選項，當前選中的打勾', '幾條可以執行的命令'],
      [
        '選一項之後',
        '記住你的選擇，按鈕上的字也跟著變',
        '執行這條命令然後收起，按鈕上的字不變'
      ],
      [
        '適合做',
        '切換排序、選擇視圖、挑選選項',
        '重新命名、導出、刪除這類動作'
      ],
      ['別拿它做', '放命令', '當篩選器或者導航']
    ],
    conclusion:
      '看到差別了嗎？兩個控件長得一樣，但你剛才點下去時，左邊幫你換了個值，右邊則執行了一個動作。下次不確定要用哪個，就先問自己：用戶點下去是想換個值，還是想讓控件做件事？'
  },
  skeleton: {
    title: '拆開一個頁面：誰管導航，誰管內容，誰管操作',
    subtitle:
      '下面是一個很普通的項目列表頁。把滑鼠移到左邊任一項，或點一下固定，右邊的實線會標出它的位置，虛線則指出它影響的範圍。',
    legendCtl: '實線：它在哪裡',
    legendAffect: '虛線：它會影響到誰',
    leading: '返回和標題放左邊',
    trailing: '操作放右邊，只突出一個',
    taskLabel: '它要回答的問題是',
    affectLabel: '它會影響到',
    misplacedToggle: '試試把「刪除」移到頂端列',
    misplacedHint:
      '現在「刪除」和「新建項目」並排放在頂端列。按下「刪除」會刪掉哪個項目？這下就看不出來了。所以操作要放在它影響的那筆內容旁邊。',
    items: [
      {
        id: 'global',
        name: '全域導航',
        question: '我要去產品的哪個區域？',
        affect: '整個頁面都會換成另一個區域'
      },
      {
        id: 'locate',
        name: '頁面標題',
        question: '我現在在哪個頁面？怎麼回去？',
        affect: '當前這個頁面'
      },
      {
        id: 'content',
        name: '主內容區',
        question: '我在看的是什麼？',
        affect: '其他控件影響的就是這一區的內容'
      },
      {
        id: 'listctl',
        name: '篩選和排序',
        question: '我想怎麼看這份列表？',
        affect: '列表裡顯示哪些項目、按什麼順序'
      },
      {
        id: 'pageact',
        name: '頁面級操作',
        question: '我想對整個頁面做什麼？',
        affect: '列表裡的所有項目'
      },
      {
        id: 'itemact',
        name: '條目級操作',
        question: '我想對其中某一條做什麼？',
        affect: '只有這一筆項目'
      }
    ],
    mock: {
      nav: ['項目', '成員', '設定'],
      title: '項目',
      section: '最近項目',
      filters: ['全部', '進行中'],
      sort: '最近更新',
      export: '導出',
      create: '新建項目',
      remove: '刪除',
      open: '打開',
      more: '更多操作',
      items: [
        {
          name: '課程設計',
          meta: '文件 · 今天更新'
        },
        {
          name: '調查筆記',
          meta: '文件 · 3 天前更新'
        }
      ]
    }
  },
  specMap: {
    title: '先看看設計規範裡都有什麼',
    subtitle:
      '很多人以為設計規範只講配色和圓角。我們拿 Apple 的規範目錄來數一數，一共分成 6 大類、158 個主題。你可以點下面的主題，也可以用上方的開關挑出和「頁面」「按鈕」有關的主題。',
    checkedAt: '分類和數量已依 2026 年 11 月的 Apple HIG 目錄核對',
    all: '全部主題',
    page: '和頁面有關',
    button: '和按鈕有關',
    topicsUnit: '個主題',
    moreTopics: '還有 {n} 個',
    pick: '點一個主題，看看它要回答什麼問題',
    questionLabel: '它要回答的問題是',
    relPage: '這一章講「頁面」時會用到它',
    relButton: '這一章講「按鈕」時會用到它',
    relNone: '這一章暫時用不到，但做產品時會遇到',
    relPageShort: '和頁面有關',
    relButtonShort: '和按鈕有關',
    relBoth: '頁面和按鈕都用得到',
    paraphraseNote: '這些問題是我們用白話轉述的，官方原文的寫法不同。',
    takeaway:
      '數完你會發現，這一章講的頁面層級和按鈕只占其中一小部分。弄懂這部分之後，你就有一套判斷標準，可以自己看懂其餘主題。',
    categories: [
      {
        id: 'getting-started',
        name: '入門與平臺',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: '設計原則',
            rel: 'both',
            q: '什麼樣的介面算是好用、好看，評判的標準是什麼'
          },
          {
            name: '為 iOS 設計',
            rel: '',
            q: '在手機上做設計，要特別注意些什麼'
          },
          {
            name: '為 macOS 設計',
            rel: '',
            q: '在電腦上做設計，和手機上有什麼不同'
          }
        ]
      },
      {
        id: 'foundations',
        name: '基礎規範',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: '佈局',
            rel: 'page',
            q: '頁面上的東西怎麼排，才能適應不同大小的螢幕'
          },
          {
            name: '排版',
            rel: 'page',
            q: '用多大的字、多粗的字重，才能讓人分得清主次'
          },
          {
            name: '顏色',
            rel: 'both',
            q: '每種顏色用在哪裡，換成深色模式又該怎麼辦'
          },
          {
            name: '無障礙',
            rel: 'both',
            q: '看不見、聽不清，或者只用鍵盤的人，怎麼使用你的產品'
          },
          {
            name: '圖示',
            rel: 'button',
            q: '圖示畫成什麼風格、多大，什麼時候要配上文字'
          },
          {
            name: '介面文案',
            rel: 'both',
            q: '按鈕和提示上的字怎麼寫，才讓人一看就懂'
          },
          {
            name: '動效',
            rel: '',
            q: '什麼時候該動，怎麼動才不讓人分心'
          }
        ]
      },
      {
        id: 'patterns',
        name: '交互模式',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: '回饋',
            rel: 'button',
            q: '用戶點了之後，怎麼讓他知道已經點到了'
          },
          {
            name: '載入',
            rel: 'both',
            q: '等待的時候給用戶看什麼，才不會以為卡住了'
          },
          {
            name: '復原與重做',
            rel: 'both',
            q: '做錯了怎麼退回去，哪些操作不需要先確認'
          },
          {
            name: '模態',
            rel: 'page',
            q: '什麼時候可以打斷用戶，怎麼讓他退出來'
          },
          {
            name: '搜尋',
            rel: 'page',
            q: '怎麼幫用戶快速找到想要的東西'
          },
          {
            name: '設定',
            rel: 'page',
            q: '設定頁面要怎麼整理，才不會讓人找不到要調整的項目'
          }
        ]
      },
      {
        id: 'components',
        name: '組件',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: '按鈕',
            rel: 'button',
            q: '什麼動作該做成按鈕，它有哪些狀態'
          },
          {
            name: '工具列',
            rel: 'page',
            q: '一排操作怎麼分組，哪個放在最顯眼的位置'
          },
          {
            name: '菜單',
            rel: 'button',
            q: '一大堆命令怎麼收起來，什麼時候不該用菜單'
          },
          {
            name: '警告提示',
            rel: 'both',
            q: '什麼資訊重要到必須打斷用戶'
          },
          {
            name: '列表與表格',
            rel: 'page',
            q: '很多條資料怎麼排，才好掃讀'
          },
          {
            name: '開關',
            rel: 'button',
            q: '在兩個狀態之間切換，該用什麼控件'
          },
          {
            name: '選擇器',
            rel: 'button',
            q: '從幾個值裡挑一個，該用什麼控件'
          }
        ]
      },
      {
        id: 'inputs',
        name: '輸入方式',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: '手勢',
            rel: '',
            q: '哪些操作可以用滑動、輕點來完成'
          },
          {
            name: '鍵盤',
            rel: 'both',
            q: '只用鍵盤，能不能走完整個流程'
          },
          {
            name: '指針設備',
            rel: 'both',
            q: '滑鼠移上去、按下去的時候，控件該怎麼回應'
          }
        ]
      },
      {
        id: 'technologies',
        name: '技術與服務',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: '通知',
            rel: '',
            q: '什麼時候可以給用戶發通知，怎麼寫才不打擾'
          },
          {
            name: '小工具',
            rel: '',
            q: '放在桌面上的小工具該顯示多少內容'
          },
          {
            name: 'Siri',
            rel: '',
            q: '哪些操作可以讓用戶開口就完成'
          }
        ]
      }
    ]
  },
  decision: {
    title: '輪到你了：哪個應該是主按鈕？',
    subtitle:
      '下面是「編輯項目」頁面。為了讓問題更明顯，我把 5 個按鈕做得一模一樣。請點一下你覺得應該最顯眼的那一個。',
    cardTitle: '編輯項目',
    nameLabel: '項目名稱',
    nameValue: '課程設計',
    descLabel: '項目描述',
    descValue: '記錄本學期的課程設計進度',
    buttons: [
      {
        id: 'save',
        label: '保存修改'
      },
      {
        id: 'preview',
        label: '預覽'
      },
      {
        id: 'export',
        label: '導出'
      },
      {
        id: 'cancel',
        label: '取消'
      },
      {
        id: 'remove',
        label: '刪除項目'
      }
    ],
    hintToggle: '想不出來？看看判斷的步驟',
    stepsTitle: '給按鈕分主次的三個問題',
    steps: [
      {
        q: '用戶打開這個頁面，最想完成什麼？',
        a: '是「保存修改」。它就是唯一的主按鈕。'
      },
      {
        q: '哪些動作只是輔助？',
        a: '預覽、導出和取消。用描邊或文字按鈕就好，讓主按鈕保持最顯眼。'
      },
      {
        q: '哪個動作做了就收不回來？',
        a: '刪除項目。用警示色提醒，並且讓它離主按鈕遠一點。'
      }
    ],
    feedback: {
      save: '用戶打開「編輯項目」這個頁面，就是為了把修改存下來，所以它應該是唯一的主按鈕。',
      preview:
        '預覽是保存之前看一眼的輔助步驟，用描邊按鈕就夠了，不用做成最顯眼的。',
      export: '導出是用得比較少的輔助操作，用文字按鈕就好。',
      cancel:
        '取消讓用戶可以放棄這次修改。要讓人容易找到，但不能比主要操作更搶眼。',
      remove:
        '刪除項目確實是最危險的動作，但用戶來這裡不是為了刪除。危險用紅色提醒就夠了，不應該搶主按鈕的位置。'
    },
    wrongLabel: '還不太對',
    rightLabel: '選對了',
    solvedTitle: '改好以後',
    solvedNote:
      '現在一眼就看得出來，主要操作是保存。想先看看效果，可以按預覽，刪除則獨立放在另一側。',
    reset: '再做一次'
  },
  fluent: {
    title: '按鈕越多，越要管住「誰最顯眼」',
    subtitle:
      'Fluent 2 把按鈕分成四級：Primary、Secondary、Subtle、Transparent。下面是一般後臺頁面上的一排操作。你可以先拖動滑桿增減按鈕，再切換兩種做法，看看有什麼不同。',
    count: '按鈕數量',
    styleAll: '全部做成 Primary',
    styleLevels: '按 Fluent 分四級',
    allNote: '每個按鈕都是實心的 Primary。按鈕一多，就不知道該先看哪裡了。',
    levelsNote:
      '只有「新建項目」維持 Primary，「導出」降為 Secondary。其他按鈕平常幾乎看不見，滑鼠移上去才會顯示。',
    legendTitle: '四級按鈕，把滑鼠移上去試試',
    levels: [
      {
        name: 'Primary',
        desc: '實心。一個區域只放一個'
      },
      {
        name: 'Secondary',
        desc: '描邊。次要但常用的動作'
      },
      {
        name: 'Subtle',
        desc: '平時是透明的，移上去出現一層淺底'
      },
      {
        name: 'Transparent',
        desc: '平時連邊框都沒有，移上去才出現'
      }
    ],
    actions: [
      {
        id: 'create',
        label: '新建項目'
      },
      {
        id: 'export',
        label: '導出'
      },
      {
        id: 'import',
        label: '導入'
      },
      {
        id: 'filter',
        label: '篩選'
      },
      {
        id: 'sort',
        label: '排序'
      },
      {
        id: 'refresh',
        label: '重新整理'
      },
      {
        id: 'share',
        label: '分享'
      },
      {
        id: 'archive',
        label: '歸檔'
      }
    ]
  },
  tokens: {
    title: '改一處，兩個頁面一起變',
    subtitle:
      'Atlassian 把顏色、圓角、尺寸等數值定義成設計 token，讓所有頁面都從同一套 token 取值。下面有兩個頁面，你可以拖動右邊的滑桿，再勾選「各做各的」，比較看看。',
    pageA: '項目列表',
    pageB: '帳號設定',
    radius: '圓角',
    height: '按鈕高度',
    accent: '主色',
    pixel: '{n}px',
    colors: ['藍', '綠', '橘', '紫'],
    inconsistent: '各做各的（不用設計 token）',
    inconsistentNote:
      '現在右邊頁面的顏色、圓角和高度是各自決定的。單獨看每個頁面都還可以，放在一起就不像同一個產品了。',
    consistentNote:
      '兩個頁面都用同一套設計 token，所以你剛才拖動滑桿時，它們會一起變。',
    mock: {
      list: {
        title: '項目',
        create: '新建項目',
        open: '打開',
        items: [
          {
            name: '課程設計',
            meta: '文件 · 今天更新'
          },
          {
            name: '調查筆記',
            meta: '文件 · 3 天前更新'
          }
        ]
      },
      settings: {
        title: '帳號設定',
        email: '電子郵件',
        emailValue: 'you@example.com',
        notify: '接收通知',
        save: '保存',
        cancel: '取消'
      }
    }
  },
  layers3: {
    title: '把三層拉開',
    subtitle:
      '一個頁面通常有三層：主資訊、輔助資訊和次級操作。下面用的是同一份內容，你可以拖動滑桿，看看三層如何從「一樣顯眼」到「拉開層級」。',
    slider: '層級差距',
    flat: '三層一樣重：都重要，等於都不重要',
    mid: '拉開了一些：先看到標題，再看到說明',
    full: '完全拉開：一眼就知道先看什麼、下一步做什麼',
    labels: ['主資訊', '輔助資訊', '次級操作'],
    mock: {
      title: '課程設計',
      body: '記錄本學期的課程設計進度，每週更新一次。',
      meta: '4 位成員 · 12 篇文件 · 昨天更新',
      primary: '打開項目',
      secondary: ['歸檔', '分享']
    }
  },
  taskflow: {
    title: '同一個頁面，兩種擺法',
    subtitle:
      '下面兩個頁面用的是同樣六個模塊。左邊是「想到什麼放什麼」，右邊則依用戶的任務安排。把滑鼠移到右邊的步驟上，看看用戶會怎麼完成任務。',
    stacked: '堆模塊',
    task: '圍繞任務',
    taskLine: '用戶的任務：找到最近在做的項目，繼續編輯',
    steps: [
      {
        name: '知道這是什麼頁面',
        detail: '標題用一句話說清楚頁面的目標，讓用戶一眼就看到'
      },
      {
        name: '縮小範圍',
        detail: '篩選緊接在標題下方，可以先縮小要找的項目範圍'
      },
      {
        name: '找到目標',
        detail: '項目列表是頁面的主體，最近更新的排在前面'
      },
      {
        name: '開始操作',
        detail: '每一筆的主要操作就放在那一筆旁邊'
      }
    ],
    modules: {
      title: '項目',
      goal: '管理你的全部項目',
      announce: '公告',
      announceText: '本週六 02:00–04:00 例行維護',
      recommend: '推薦',
      recommendText: '試試新的甘特圖視圖',
      settings: '設定',
      filter: '篩選',
      list: '項目列表',
      open: '打開',
      items: [
        {
          name: '課程設計',
          meta: '文件 · 今天更新'
        },
        {
          name: '調查筆記',
          meta: '文件 · 3 天前更新'
        }
      ]
    }
  },
  roleKinds: {
    title: '五種常見的按鈕角色長什麼樣',
    subtitle:
      '把上表的五種角色排成一列，就是下面這個樣子。它們的尺寸和圓角完全一樣，差別只在填色方式和用色。',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: '當前區域最關鍵的動作',
        sample: '保存'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: '支持性動作',
        sample: '預覽'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: '弱操作',
        sample: '瞭解更多'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: '刪除、停用這類風險操作',
        sample: '刪除項目'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: '局部的工具操作',
        sample: '關閉'
      }
    ]
  }
}
