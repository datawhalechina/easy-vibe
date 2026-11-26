export default {
  common: {
    before: '変更前',
    after: '変更後',
    reset: 'リセット'
  },
  compare: {
    title: '同じページ、2つの階層',
    subtitle:
      '左右で使っている文言はまったく同じです。変えたのは階層だけです。まず下の問題にマウスを乗せて左右を見比べ、そのあと「ぼかしテスト」のスライダーを動かしてみましょう。',
    squint: 'ぼかしテスト',
    squintHint:
      '目を細めてページを見るのと同じです。ぼかしても見えるものが、最も目を引く要素です。',
    squintClear: 'くっきり',
    squintBlurry: 'ぼかし',
    issueLabel: '左のページの4つの問題',
    applyHint:
      '右の図の上にあるスイッチを試してみましょう。オフにするたびに、以前の問題が1つ戻ってきます。',
    tableHead: ['問題', '改善方法', '改善後'],
    metrics: {
      borders: '装飾用の枠線',
      solid: '塗りつぶしボタン',
      legend:
        '左右の図の上にある数字を比べてみましょう。右の図では枠線と塗りつぶしボタンが大幅に減り、タイトルとメインボタンが目立ちます。'
    },
    moreMenu: ['名前を変更', '削除'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'フォントサイズで階層を作る',
        problem:
          'タイトル、フィルター、ボタンが詰め込まれ、文字の大きさもすべて同じです',
        fix: '階層を決めてから配置します。タイトルとフィルターは別の行にし、タイトルを最も大きく、説明をその次に、日時などの詳細を最も小さくします',
        result: '何のページか、どこを先に見ればよいかが一目でわかります'
      },
      {
        id: 'borders',
        n: '②',
        short: '枠線を減らす',
        problem: '各モジュールが太い枠線で囲まれ、その内側にも枠線があります',
        fix: 'まず位置を揃えて間隔でグループを作り、境界が必要なところにだけ枠線を残します',
        result: '線が減って、何がひとまとまりなのか見分けやすくなります'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'ボタンに優先度をつける',
        problem:
          '8個のボタンがすべて塗りつぶされ、どれもメインアクションに見えます',
        fix: '1つのエリアにつきメインボタンを1つだけ残し、ほかはアウトラインボタンかテキストボタンにします',
        result: '次にどこを押せばよいかが一目でわかります'
      },
      {
        id: 'scope',
        n: '④',
        short: '操作を対象の近くに置く',
        problem:
          '「削除」は1件のプロジェクトにしか影響しませんが、「新規作成」のようにページ全体に関わる操作と並んでいます',
        fix: 'ページ全体に関わる操作はページ単位の位置に置き、1件だけに関わる操作はその項目の隣に置きます',
        result: 'どのボタンが何に影響するかが明確になります'
      }
    ],
    mock: {
      pageTitle: 'プロジェクト',
      count: '全2件のプロジェクト',
      filters: ['すべて', '進行中'],
      sort: '最近の更新順',
      create: '新規プロジェクト',
      export: 'エクスポート',
      remove: '削除',
      open: '開く',
      more: 'その他の操作',
      items: [
        {
          name: '授業設計',
          meta: 'ドキュメント · 今日更新'
        },
        {
          name: '調査メモ',
          meta: 'ドキュメント · 3日前に更新'
        }
      ]
    }
  },
  anatomy: {
    title: 'ページの構成を読み解く：4つの層とその役割',
    subtitle:
      '下の項目にマウスを乗せると、ページ内のどこにあるかが右側に表示されます。クリックすると表示を固定できます。',
    taskLabel: '役割',
    meansLabel: '表現方法',
    showLabels: 'ラベルを表示',
    showGuides: 'ガイドを表示',
    guidesNote:
      'ガイドを表示すると、すべてのコンテンツが同じ縦線から始まっていることがわかります。関連するコンテンツは間隔が狭く、階層が変わるところには広い余白があります。',
    gap: '間隔',
    typeTitle: '下の3行は、フォントサイズ、太さ、色の濃淡で差をつけています',
    typeSample: 'サンプル',
    layers: [
      {
        id: 'locate',
        name: '現在地',
        task: 'ユーザーに今いる場所と戻り方を伝えます',
        means:
          '控えめなナビゲーションタイトルと、見慣れた戻り方を組み合わせます'
      },
      {
        id: 'primary',
        name: 'メイン情報',
        task: 'このページで最も重要な内容を伝えます',
        means:
          'ページで最も大きな文字を使い、そのあとに余白を取り、位置を固定します'
      },
      {
        id: 'support',
        name: '補助情報',
        task: '補足説明やメタデータを伝えます',
        means:
          '小さめの文字と薄めの色でも読みやすさを保ち、説明する内容のすぐそばに置きます'
      },
      {
        id: 'action',
        name: '操作',
        task: '次にできることをユーザーに伝えます',
        means:
          '塗りつぶしのメインボタンを1つ置き、ほかは控えめにします。操作はコンテンツのあとに並べます'
      }
    ],
    typeScale: [
      {
        name: 'コンテンツのタイトル',
        px: 22,
        weight: 700,
        note: 'ページに1度だけ出てきます'
      },
      {
        name: '本文',
        px: 14,
        weight: 400,
        note: '読みやすいように、行間を少し広げています'
      },
      {
        name: '補助情報',
        px: 12,
        weight: 400,
        note: '小さめの文字と薄めの色を使いますが、これ以上小さくはしません'
      }
    ],
    mock: {
      back: '戻る',
      navTitle: 'プロジェクト',
      title: '授業設計',
      meta: 'メンバー4人 · ドキュメント12件 · 昨日更新',
      body: '今学期の授業設計の進捗を記録します。週に1回更新します。',
      link: 'すべてのドキュメントを見る',
      primary: 'プロジェクトを開く',
      secondary: 'アーカイブ'
    }
  },
  grouping: {
    title: '枠線は必要でしょうか？ 3ステップで確認しましょう',
    subtitle:
      '下は同じ設定フォームです。3つのステップを順番にクリックし、どこからグループが見分けやすくなるか確かめてみましょう。',
    stepLabel: 'ステップ {n}',
    metricBorders: '装飾用の枠線',
    metricGaps: '間隔の種類',
    showGaps: '間隔を表示',
    explicitToggle: '「通知」に薄い背景色をつける',
    implicitTitle: '暗黙的なグループ化',
    implicitText:
      '間隔、整列、余白を使うと、枠線を引かなくても関連する内容がひとまとまりに見えます。',
    explicitTitle: '明示的なグループ化',
    explicitText:
      '背景色や枠線をつけると、そのグループの境界がはっきりします。足す前に、このグループには本当に境界が必要か考えてみましょう。',
    gapInside: 'グループ内',
    gapBetween: 'グループ間',
    steps: [
      {
        caption:
          '最初はすべてに枠線をつけます。どの要素も「重要です」と主張して、何がひとまとまりなのか見分けにくくなります。'
      },
      {
        caption:
          '次に、枠線だけを外します。見た目はすっきりしますが、間隔がどこも同じなので、内容がばらばらに見えます。'
      },
      {
        caption:
          '最後に、間隔でグループを作ります。関連する項目は近づけ、それ以外は離します。線を引かなくても、グループが見えてきます。'
      }
    ],
    mock: {
      pageTitle: 'アカウント設定',
      basic: '基本情報',
      email: 'メールアドレス',
      phone: '携帯電話番号',
      password: 'パスワードを変更',
      newPassword: '新しいパスワード',
      confirm: 'パスワードを確認',
      notify: '通知',
      mail: 'メール通知',
      desktop: 'デスクトップ通知',
      save: '保存',
      cancel: 'キャンセル'
    }
  },
  buttonSpec: {
    title: '1つのボタンを定義する',
    subtitle:
      '「ボタンを追加して」という一言が、ガイドラインでは10の問いに分かれます。左側を1つずつ開いて、各項目をどこまで説明する必要があるか見てみましょう。',
    questionLabel: 'ガイドラインの問い',
    sampleLabel: '定義の例',
    sourceLabel: '公式ガイドラインを見る',
    rolesRule:
      '役割が示すのは、押したときに何が起きるかです。ボタンをどれだけ目立たせるかは別に決めます。削除は危険な操作ですが、ページで一番目立つ必要はありません。',
    structureRule:
      'ラベルには動作を表す言葉を使いましょう。「確定」より「下書きを保存」のほうが、押したときに何が起きるか一目でわかります。',
    visualRule:
      'スタイルは目立ち方を、役割は操作の結果を表します。この2つは別々に考えましょう。',
    sizeRule:
      'ボタンの見た目が小さくても、指で押せる範囲には十分な広さが必要です。この2つのサイズは別々に定義します。',
    sizeVisible: '見た目の高さ',
    sizeTarget: '押せる範囲',
    statesRule:
      '各状態をあらかじめ定義し、色以外の手がかりでも見分けられるようにします。',
    behaviorRule:
      'ボタンを押したあとも、ユーザーは何が起きているか知りたいものです。すぐに反応を返し、待っている間は処理中と伝え、失敗したら次にできることを示します。',
    adaptiveRule:
      '上のスライダーを動かしてみましょう。文字が大きくなるとボタンも高くなり、ラベルは途中で切れずに折り返されます。',
    a11yRule:
      'キーボードだけで操作する場合や、画面を見ることができない場合も使えるようにします。',
    boundaryRule:
      'コンポーネントの使いどころと同じくらい、使用を避ける場面を示すことも大切です。',
    a11yNoName: 'スクリーンリーダーの読み上げ「ボタン」',
    a11yWithName: 'スクリーンリーダーの読み上げ「削除、ボタン」',
    fontSize: 'フォントサイズ',
    dimsLabel: '定義項目',
    purposeExamples: ['保存', '送信', '削除'],
    purposeLine:
      '見た目は違っても、3つのボタンには共通点があります。押した瞬間にアクションが始まります。',
    roleSamples: {
      Normal: 'プレビュー',
      Primary: '公開',
      Cancel: 'キャンセル',
      Destructive: 'プロジェクトを削除'
    },
    anatomyBtn: 'プロジェクトを公開',
    genericBtn: '続ける',
    deleteLabel: '削除',
    roles: [
      {
        name: 'Normal',
        desc: '通常の操作です。特に目立たせる必要はありません'
      },
      {
        name: 'Primary',
        desc: '今押してほしいボタンです。1画面に1つか2つ置きます'
      },
      {
        name: 'Cancel',
        desc: 'ユーザーが操作を取りやめられるようにします。メインボタンより控えめにします'
      },
      {
        name: 'Destructive',
        desc: '元に戻せない操作です。警告色で知らせ、デフォルトには設定しません'
      }
    ],
    parts: [
      {
        name: 'コンテナ',
        desc: 'ボタン本体です。色、サイズ、押したときの変化を受け持ちます'
      },
      {
        name: 'アイコン',
        desc: '必要に応じて使います。ボタンの用途が一目でわかります'
      },
      {
        name: 'ラベル',
        desc: '押すと何が起きるかを明確に伝えます'
      }
    ],
    levels: [
      {
        name: 'Filled',
        desc: '最も目立ちます。その場で最も重要なアクションに使います'
      },
      {
        name: 'Tonal',
        desc: 'アウトラインより少し目立ちます。気づいてほしいセカンダリアクションに使います'
      },
      {
        name: 'Outlined',
        desc: '塗りつぶしボタンと並べる、別の選択肢に使います'
      },
      {
        name: 'Text',
        desc: '最も控えめです。補助的な機能への入り口に使います'
      }
    ],
    stateGallery: ['デフォルト', 'ホバー', '押下', 'フォーカス', '無効'],
    behaviorStages: ['操作可能', '押下', '処理中', '完了 / 失敗'],
    a11yChecks: [
      'アイコンだけのボタンにもアクセシブルな名前がある',
      'キーボードでフォーカスでき、フォーカスの位置が見える',
      '文字と背景のコントラストが十分にある',
      '色以外の手がかりでも状態が伝わる'
    ],
    boundaries: [
      {
        want: '別のページに移動する',
        use: 'リンク、タブ'
      },
      {
        want: '2つの状態を切り替える',
        use: 'スイッチ、トグルボタン'
      },
      {
        want: '複数の値から1つ選ぶ',
        use: 'Pop-upボタン、セレクター'
      },
      {
        want: '使用頻度の低いコマンドをまとめる',
        use: 'メニュー'
      }
    ],
    boundaryWant: 'やりたいこと',
    boundaryUse: 'より適したコンポーネント',
    dims: [
      {
        id: 'purpose',
        name: '用途',
        question: 'この要素は何のために使いますか？',
        sample:
          '「公開」ボタンで現在のプロジェクトを送信します。成功すると、プロジェクトが公開済みになります。',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'セマンティクス',
        question: 'アクション、選択、ナビゲーションのどれを表しますか？',
        sample:
          '「プロジェクトを削除」の役割はDestructive、スタイルはOutlinedです。デフォルトのボタンには設定しません。',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: '構造',
        question: 'どの部分で構成されますか？',
        sample:
          'コンテナ、任意のアイコン、ラベルで構成します。ラベルは動作を表す1行の文言にします。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: '見た目',
        question: '優先度をどう表しますか？',
        sample:
          'このページでFilledを使うのは「公開」だけです。ほかの操作にはOutlinedかTextを使います。',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'サイズ',
        question: 'どんな制約のもとで配置しますか？',
        sample:
          '見た目の高さは40、押せる範囲は44×44以上です。同じグループのボタンは高さを揃え、間隔を8にします。',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: '状態',
        question: '状態ごとに何を表示しますか？',
        sample:
          'デフォルト、ホバー、押下、フォーカス、無効、読み込み中の6つの状態を定義します。',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: '動作',
        question: '操作すると何が起きますか？',
        sample:
          '押すとすぐに読み込み中になり、重複送信を防ぎます。処理が終わったら結果を伝えます。',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: '表示への対応',
        question: '利用環境が変わっても使えるようにするにはどうしますか？',
        sample:
          'フォントサイズを大きくすると、ラベルは2行に折り返し、ボタンの高さもそれに合わせて伸びます。',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'アクセシビリティ',
        question: '特定の感覚に頼らずに操作できますか？',
        sample:
          'アイコンボタンに「削除」というアクセシブルな名前を付けます。フォーカス順は見た目の並び順と揃えます。',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: '適用範囲',
        question: 'どんなときに使用を避けますか？',
        sample:
          '別のページに移動するならリンクを、2つの値を切り替えるならスイッチを使います。',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'ボタンの状態と動作',
    subtitle:
      '状態はその時点のボタンの見た目、動作は押したあとに起きることです。',
    statesTitle: 'まずは6つの状態',
    stateHead: ['状態', 'いつ現れるか', '見た目の変化', '注意点'],
    liveHint:
      'ボタンにマウスを乗せたり、押したままにしたり、Tabキーでフォーカスを当てたりして、見た目がどう変わるか確かめましょう。',
    currentState: '現在の状態',
    sample: 'ボタン',
    stateNames: {
      default: 'デフォルト',
      hover: 'ホバー',
      pressed: '押下',
      focus: 'フォーカス'
    },
    states: [
      {
        id: 'default',
        name: 'デフォルト',
        trigger: '操作していないとき',
        change: '通常の見た目',
        tip: 'ページ上のほとんどのボタンはこの状態です'
      },
      {
        id: 'hover',
        name: 'ホバー',
        trigger: 'ポインターを乗せたとき',
        change: '背景が少し濃くなる',
        tip: '「ここを押せます」とユーザーに伝えます'
      },
      {
        id: 'pressed',
        name: '押下',
        trigger: '押したまま離していないとき',
        change: '背景がさらに濃くなる',
        tip: '独自のボタンを作るときは、この状態も実装します'
      },
      {
        id: 'focus',
        name: 'フォーカス',
        trigger: 'Tabキーでフォーカスが移ったとき',
        change: '周囲にフォーカスリングが現れる',
        tip: 'outline: none で消さないようにしましょう'
      },
      {
        id: 'disabled',
        name: '無効',
        trigger: '前提条件を満たしていないとき',
        change: '不透明度が下がり、クリックに反応しなくなる',
        tip: '押せない理由も伝えましょう'
      },
      {
        id: 'loading',
        name: '読み込み中',
        trigger: '操作を実行し、まだ処理が終わっていないとき',
        change: 'ラベルが処理中を示す文言に変わり、インジケーターが現れる',
        tip: '操作を受け付けて処理していることを伝えます'
      }
    ],
    behaviorTitle: '次は動作：押したあとに起きること',
    behaviorHint:
      '「プロジェクトを公開」を押し、結果が出るまでに何が起きるか見てみましょう。',
    scenario: 'シミュレーション結果',
    scenarioSuccess: '成功',
    scenarioFail: '失敗',
    run: 'プロジェクトを公開',
    running: '公開中…',
    done: '公開済み',
    failed: '公開できませんでした。入力内容は保持されています',
    retry: 'もう一度試す',
    stageHead: ['段階', 'ユーザーに伝えること'],
    stages: [
      {
        name: '操作可能',
        desc: '押す前に、何が起きるかをボタンで伝えます'
      },
      {
        name: '即時フィードバック',
        desc: '押した瞬間に見た目を変え、操作を受け付けたことを伝えます'
      },
      {
        name: '処理中',
        desc: '待機中は進行状況を示し、繰り返し押しても二重に実行されないようにします'
      },
      {
        name: '結果',
        desc: '成功したら明確に伝え、失敗したら次にできることを示します'
      },
      {
        name: '復旧',
        desc: '失敗しても入力内容を残し、すぐにやり直せるようにします'
      }
    ],
    rulesTitle: '4つのルール',
    rules: [
      '押したらすぐに反応を返しましょう。ボタンの色を少し濃くするだけでも伝わります',
      '待っている間は処理中と伝え、ページが止まったとユーザーが思わないようにします',
      '読み込み中は「処理しています」、無効は「押せません」という意味です',
      'ラベルも状態に合わせて変えます。押す前は「プロジェクトを公開」、押したあとは「公開中…」と表示します'
    ]
  },
  lookalike: {
    title: '見た目が似ていても、役割は違います',
    subtitle:
      '下の2つのコントロールは見た目がほとんど同じです。それぞれ開いて項目を1つ選び、どんな違いがあるか確かめましょう。',
    popupTag: '値を1つ選ぶ',
    pullTag: 'コマンドを実行する',
    popupInitial: '並べ替え：新しい順',
    popupPrefix: '並べ替え：',
    popupOptions: ['新しい順', '古い順', '名前順'],
    pullInitial: '操作',
    pullOptions: ['名前を変更', 'リンクをコピー', '削除'],
    pullDone: '実行済み：{name}',
    popupValue: '現在の値：{value}',
    pullIdle: 'まだコマンドを実行していません',
    tableHead: ['', 'Pop-upボタン', 'Pull-downボタン'],
    rows: [
      [
        '開くと',
        '選択肢が並び、現在の値にチェックが付きます',
        '実行できるコマンドが並びます'
      ],
      [
        '1つ選ぶと',
        '選んだ値が保持され、ボタンの表示も変わります',
        'コマンドを実行して閉じます。ボタンの表示はそのままです'
      ],
      [
        '適した用途',
        '並び順の切り替え、ビューやオプションの選択',
        '名前の変更、エクスポート、削除などの操作'
      ],
      ['避ける用途', 'コマンドを並べる', 'フィルターやナビゲーションに使う']
    ],
    conclusion:
      '違いはわかりましたか？ 左では値を切り替え、右では実際にコマンドを実行しました。見た目が同じでも動作は違います。使い分けに迷ったら、ユーザーは値を変えたいのか、それとも操作を実行したいのかを考えてみましょう。'
  },
  skeleton: {
    title: 'ページを分解する：ナビゲーション、コンテンツ、操作の役割',
    subtitle:
      '下は一般的なプロジェクト一覧ページです。左側の項目にマウスを乗せると、右側の実線がその位置を、破線が影響範囲を示します。クリックすると表示を固定できます。',
    legendCtl: '実線：配置されている場所',
    legendAffect: '破線：影響する範囲',
    leading: '左に戻るボタンとタイトルを置きます',
    trailing: '右に操作を置き、1つだけ目立たせます',
    taskLabel: '答える問い',
    affectLabel: '影響する範囲',
    misplacedToggle: '削除を上部バーに移してみる',
    misplacedHint:
      '上部バーで「削除」が「新規プロジェクト」と並びました。押すとどのプロジェクトが削除されるのでしょうか。対象がわかるよう、操作は影響を受ける項目のそばに置きましょう。',
    items: [
      {
        id: 'global',
        name: 'グローバルナビゲーション',
        question: 'プロダクトのどのエリアに移動しますか？',
        affect: 'ページ全体が別のエリアに切り替わります'
      },
      {
        id: 'locate',
        name: 'ページタイトル',
        question: '今はどのページにいますか？ どう戻れますか？',
        affect: '今いるページです'
      },
      {
        id: 'content',
        name: 'メインコンテンツエリア',
        question: '何を見ていますか？',
        affect: 'ほかのコントロールによって表示や内容が変わる部分です'
      },
      {
        id: 'listctl',
        name: 'フィルターと並べ替え',
        question: 'この一覧をどう表示しますか？',
        affect: '一覧に表示するプロジェクトとその順序が変わります'
      },
      {
        id: 'pageact',
        name: 'ページ全体の操作',
        question: 'ページ全体に対してどんな操作を行いますか？',
        affect: '一覧のすべてのプロジェクトが対象です'
      },
      {
        id: 'itemact',
        name: '項目ごとの操作',
        question: 'この項目に対してどんな操作を行いますか？',
        affect: 'そのプロジェクト1件だけが対象です'
      }
    ],
    mock: {
      nav: ['プロジェクト', 'メンバー', '設定'],
      title: 'プロジェクト',
      section: '最近のプロジェクト',
      filters: ['すべて', '進行中'],
      sort: '最近の更新順',
      export: 'エクスポート',
      create: '新規プロジェクト',
      remove: '削除',
      open: '開く',
      more: 'その他の操作',
      items: [
        {
          name: '授業設計',
          meta: 'ドキュメント · 今日更新'
        },
        {
          name: '調査メモ',
          meta: 'ドキュメント · 3日前に更新'
        }
      ]
    }
  },
  specMap: {
    title: 'デザインガイドラインには何が載っているのでしょうか',
    subtitle:
      '配色や角丸を決めるものだと思われがちですが、Appleのガイドラインの目次を数えると、6つの大分類に158のトピックがあります。下のトピックをクリックしたり、上のスイッチでページやボタンに関係するものに絞ったりしてみましょう。',
    checkedAt: '分類と件数は2026年11月にApple HIGの目次で確認しました',
    all: 'すべてのトピック',
    page: 'ページ関連',
    button: 'ボタン関連',
    topicsUnit: '件のトピック',
    moreTopics: 'ほかに{n}件',
    pick: 'トピックをクリックして、どんな問いに答えるか見てみましょう',
    questionLabel: '答える問い',
    relPage: 'この章でページを扱うときに使います',
    relButton: 'この章でボタンを扱うときに使います',
    relNone: 'この章では扱いませんが、プロダクトを作るときに出会います',
    relPageShort: 'ページ関連',
    relButtonShort: 'ボタン関連',
    relBoth: 'ページにもボタンにも関係します',
    paraphraseNote:
      'ここでの問いは、公式ガイドラインの内容を平易な言葉で言い換えたものです。',
    takeaway:
      '数えてみると、この章で扱うページ階層とボタンはごく一部だとわかります。この部分を理解すると、ほかのトピックを自分で読むときにも判断の手がかりになります。',
    categories: [
      {
        id: 'getting-started',
        name: '入門とプラットフォーム',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'デザインの原則',
            rel: 'both',
            q: '使いやすく、見た目もよいインターフェースは、どんな基準で判断しますか？'
          },
          {
            name: 'iOS向けのデザイン',
            rel: '',
            q: 'スマートフォン向けの設計では、何に気をつけますか？'
          },
          {
            name: 'macOS向けのデザイン',
            rel: '',
            q: 'パソコン向けの設計は、スマートフォン向けとどう違いますか？'
          }
        ]
      },
      {
        id: 'foundations',
        name: '基礎ガイドライン',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'レイアウト',
            rel: 'page',
            q: 'さまざまな画面サイズに対応するには、ページの要素をどう配置しますか？'
          },
          {
            name: 'タイポグラフィ',
            rel: 'page',
            q: '情報の主従を見分けられるように、文字のサイズと太さをどう選びますか？'
          },
          {
            name: '色',
            rel: 'both',
            q: 'それぞれの色をどこで使い、ダークモードではどう調整しますか？'
          },
          {
            name: 'アクセシビリティ',
            rel: 'both',
            q: '画面が見えにくい人、音が聞こえにくい人、キーボードだけを使う人は、どうすればプロダクトを使えますか？'
          },
          {
            name: 'アイコン',
            rel: 'button',
            q: 'どんなスタイルやサイズにし、どんなときにテキストを添えますか？'
          },
          {
            name: 'UIテキスト',
            rel: 'both',
            q: '一目で意味が伝わるように、ボタンやメッセージの文言をどう書きますか？'
          },
          {
            name: 'モーション',
            rel: '',
            q: 'どんなときに動きを使い、どうすれば注意をそらさずに済みますか？'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'インタラクションパターン',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'フィードバック',
            rel: 'button',
            q: '押したことが伝わるように、どんな反応を返しますか？'
          },
          {
            name: '読み込み',
            rel: 'both',
            q: '処理が止まったように見えないように、待ち時間には何を表示しますか？'
          },
          {
            name: '取り消しとやり直し',
            rel: 'both',
            q: '操作を誤ったらどう元に戻しますか？ 事前確認が不要な操作はどれですか？'
          },
          {
            name: 'モーダル',
            rel: 'page',
            q: 'どんなときにユーザーの作業を中断してよいですか？ どうやって元の画面に戻れますか？'
          },
          {
            name: '検索',
            rel: 'page',
            q: '欲しいものをすばやく見つけられるようにするにはどうしますか？'
          },
          {
            name: '設定',
            rel: 'page',
            q: 'ユーザーが迷わないように、設定ページをどう整理しますか？'
          }
        ]
      },
      {
        id: 'components',
        name: 'コンポーネント',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'ボタン',
            rel: 'button',
            q: 'どの操作をボタンにしますか？ どんな状態が必要ですか？'
          },
          {
            name: 'ツールバー',
            rel: 'page',
            q: '一列の操作をどうまとめ、どれを最も目立つ位置に置きますか？'
          },
          {
            name: 'メニュー',
            rel: 'button',
            q: '多くのコマンドをどうまとめますか？ どんなときにメニューの使用を避けますか？'
          },
          {
            name: '警告',
            rel: 'both',
            q: 'どんな情報なら、ユーザーの作業を中断してでもすぐに伝える必要がありますか？'
          },
          {
            name: 'リストとテーブル',
            rel: 'page',
            q: '多くのデータをざっと見渡せるようにするには、どう並べますか？'
          },
          {
            name: 'スイッチ',
            rel: 'button',
            q: '2つの状態を切り替えるには、どのコントロールを使いますか？'
          },
          {
            name: 'セレクター',
            rel: 'button',
            q: 'いくつかの値から1つ選ぶには、どのコントロールを使いますか？'
          }
        ]
      },
      {
        id: 'inputs',
        name: '入力方法',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'ジェスチャー',
            rel: '',
            q: 'どんな操作をスワイプやタップで行えますか？'
          },
          {
            name: 'キーボード',
            rel: 'both',
            q: 'キーボードだけで一連の操作を完了できますか？'
          },
          {
            name: 'ポインティングデバイス',
            rel: 'both',
            q: 'マウスを乗せたり押したりしたとき、コントロールはどう反応しますか？'
          }
        ]
      },
      {
        id: 'technologies',
        name: '技術とサービス',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: '通知',
            rel: '',
            q: 'いつ通知を送り、どう書けばユーザーの邪魔になりませんか？'
          },
          {
            name: 'ウィジェット',
            rel: '',
            q: 'ホーム画面のウィジェットには、どれくらいの情報を表示しますか？'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'どの操作なら声で頼むだけで完了できますか？'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'どれをメインボタンにしますか？',
    subtitle:
      '下は「プロジェクトを編集」ページです。判断しやすいよう、5つのボタンの見た目を揃えています。一番目立つべきだと思うボタンを押してみましょう。',
    cardTitle: 'プロジェクトを編集',
    nameLabel: 'プロジェクト名',
    nameValue: '授業設計',
    descLabel: 'プロジェクトの説明',
    descValue: '今学期の授業設計の進捗を記録します',
    buttons: [
      {
        id: 'save',
        label: '変更を保存'
      },
      {
        id: 'preview',
        label: 'プレビュー'
      },
      {
        id: 'export',
        label: 'エクスポート'
      },
      {
        id: 'cancel',
        label: 'キャンセル'
      },
      {
        id: 'remove',
        label: 'プロジェクトを削除'
      }
    ],
    hintToggle: '迷ったら判断の手順を見る',
    stepsTitle: 'ボタンの優先度を決める3つの問い',
    steps: [
      {
        q: 'ユーザーがこのページで一番やりたいことは何ですか？',
        a: '「変更を保存」です。メインボタンはこれ1つです。'
      },
      {
        q: '補助的な操作はどれですか？',
        a: 'プレビュー、エクスポート、キャンセルです。アウトラインボタンかテキストボタンで、強調を抑えます。'
      },
      {
        q: '元に戻せない操作はどれですか？',
        a: '「プロジェクトを削除」です。警告色を使い、メインボタンから離して置きます。'
      }
    ],
    feedback: {
      save: 'ユーザーが「プロジェクトを編集」ページを開いた目的は、変更を保存することです。メインボタンはこれ1つです。',
      preview:
        'プレビューは保存する前に見た目を確かめるための操作です。アウトラインボタンで十分です。',
      export:
        'エクスポートは使用頻度の低い補助的な操作です。テキストボタンで十分です。',
      cancel:
        'キャンセルは操作を取りやめるためのボタンです。見つけやすい位置に置き、メインボタンより控えめにします。',
      remove:
        'プロジェクトの削除は最も危険な操作です。このページを開く主な目的は変更の保存なので、削除は警告色の赤で示し、メインボタンの位置には置きません。'
    },
    wrongLabel: 'もう少し考えてみましょう',
    rightLabel: '正解です',
    solvedTitle: '改善後',
    solvedNote:
      '変更を保存するボタンが一目でわかります。先に見た目を確認したいときはプレビューを使えます。削除は反対側に離してあります。',
    reset: 'もう一度試す'
  },
  fluent: {
    title: 'ボタンが多いほど、何を目立たせるかが大切です',
    subtitle:
      'Fluent 2はボタンをPrimary、Secondary、Subtle、Transparentの4段階に分けています。下は一般的な管理画面で使う操作です。まずスライダーでボタンの数を変え、表示方法を切り替えて見比べましょう。',
    count: 'ボタンの数',
    styleAll: 'すべてPrimaryにする',
    styleLevels: 'Fluentの4段階に分ける',
    allNote:
      'すべて塗りつぶしのPrimaryです。ボタンが増えると、どこを先に見ればよいか迷います。',
    levelsNote:
      '「新規プロジェクト」だけをPrimaryにし、「エクスポート」はSecondaryにします。ほかのボタンは普段ほとんど目立たず、マウスを乗せると浮かび上がります。',
    legendTitle: '4段階の違いをマウスで確認',
    levels: [
      {
        name: 'Primary',
        desc: '塗りつぶしです。1つのエリアにつき1つ置きます'
      },
      {
        name: 'Secondary',
        desc: 'アウトラインです。サブの操作のうち、よく使うものに向いています'
      },
      {
        name: 'Subtle',
        desc: '通常は透明で、マウスを乗せると薄い背景が現れます'
      },
      {
        name: 'Transparent',
        desc: '通常は枠線がなく、マウスを乗せると現れます'
      }
    ],
    actions: [
      {
        id: 'create',
        label: '新規プロジェクト'
      },
      {
        id: 'export',
        label: 'エクスポート'
      },
      {
        id: 'import',
        label: 'インポート'
      },
      {
        id: 'filter',
        label: 'フィルター'
      },
      {
        id: 'sort',
        label: '並べ替え'
      },
      {
        id: 'refresh',
        label: '更新'
      },
      {
        id: 'share',
        label: '共有'
      },
      {
        id: 'archive',
        label: 'アーカイブ'
      }
    ]
  },
  tokens: {
    title: '1か所を変えると、2つのページが一緒に変わります',
    subtitle:
      'Atlassianでは、色、角丸、サイズといった値をtokenとして定義し、すべてのページが同じtokenを参照します。右側のスライダーを動かし、「ページごとに個別設定」にチェックを入れて見比べましょう。',
    pageA: 'プロジェクト一覧',
    pageB: 'アカウント設定',
    radius: '角丸',
    height: 'ボタンの高さ',
    accent: 'アクセントカラー',
    pixel: '{n}px',
    colors: ['青', '緑', 'オレンジ', '紫'],
    inconsistent: 'ページごとに個別設定（tokenを使わない）',
    inconsistentNote:
      '今、右のページでは色、角丸、高さを個別に決めています。それぞれ単独なら違和感は少なくても、並べると同じプロダクトには見えません。',
    consistentNote:
      '2つのページが同じtokenを参照しています。スライダーを動かすと、両方のページが一緒に変わります。',
    mock: {
      list: {
        title: 'プロジェクト',
        create: '新規プロジェクト',
        open: '開く',
        items: [
          {
            name: '授業設計',
            meta: 'ドキュメント · 今日更新'
          },
          {
            name: '調査メモ',
            meta: 'ドキュメント · 3日前に更新'
          }
        ]
      },
      settings: {
        title: 'アカウント設定',
        email: 'メールアドレス',
        emailValue: 'you@example.com',
        notify: '通知を受け取る',
        save: '保存',
        cancel: 'キャンセル'
      }
    }
  },
  layers3: {
    title: '3つの層に差をつける',
    subtitle:
      'ページには通常、メイン情報、補助情報、サブ操作の3つの層があります。下では同じコンテンツを使っています。スライダーを動かし、3つの層の目立ち方が同じ状態から、それぞれに差がつくまでを見てみましょう。',
    slider: '階層の差',
    flat: '3つの層の強さが同じで、どれも目立ちません',
    mid: '少し差がつくと、まずタイトル、そのあとに説明が目に入ります',
    full: '差がはっきりすると、何を先に見て、次に何をするか一目でわかります',
    labels: ['メイン情報', '補助情報', 'サブ操作'],
    mock: {
      title: '授業設計',
      body: '今学期の授業設計の進捗を記録します。週に1回更新します。',
      meta: 'メンバー4人 · ドキュメント12件 · 昨日更新',
      primary: 'プロジェクトを開く',
      secondary: ['アーカイブ', '共有']
    }
  },
  taskflow: {
    title: '同じページ、2つのレイアウト',
    subtitle:
      '下の2つのページには同じ6つのモジュールがあります。左は思いついた順に並べ、右はユーザーのタスクに沿って配置しています。右側のステップにマウスを乗せて、タスクの流れを追ってみましょう。',
    stacked: 'モジュールを並べただけ',
    task: 'タスクに沿った配置',
    taskLine:
      'ユーザーのタスク：最近作業したプロジェクトを見つけ、編集を続ける',
    steps: [
      {
        name: '何のページか把握する',
        detail: '最初に目に入るタイトルが、ページの目的を一言で伝えます'
      },
      {
        name: '候補を絞る',
        detail:
          'タイトルの下にフィルターがあり、探したいプロジェクトを絞り込めます'
      },
      {
        name: '目的の項目を見つける',
        detail:
          'プロジェクト一覧がページの中心にあり、更新が新しい順に並んでいます'
      },
      {
        name: '操作を始める',
        detail: '各行のメインアクションは、その行のすぐそばにあります'
      }
    ],
    modules: {
      title: 'プロジェクト',
      goal: 'すべてのプロジェクトを管理',
      announce: 'お知らせ',
      announceText: '今週土曜日の02:00–04:00に定期メンテナンスを行います',
      recommend: 'おすすめ',
      recommendText: '新しいガントチャートビューをお試しください',
      settings: '設定',
      filter: 'フィルター',
      list: 'プロジェクト一覧',
      open: '開く',
      items: [
        {
          name: '授業設計',
          meta: 'ドキュメント · 今日更新'
        },
        {
          name: '調査メモ',
          meta: 'ドキュメント · 3日前に更新'
        }
      ]
    }
  },
  roleKinds: {
    title: 'よく使う5つの役割の見た目',
    subtitle:
      '上の表にある5つの役割を1列に並べました。サイズと角丸はすべて同じで、塗りつぶしと色だけが違います。',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: '現在のエリアで最も重要なアクション',
        sample: '保存'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: '補助的なアクション',
        sample: 'プレビュー'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: '強調を抑えた操作',
        sample: '詳しく見る'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: '削除、無効化などのリスクを伴う操作',
        sample: 'プロジェクトを削除'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: '特定の場所で使うツール操作',
        sample: '閉じる'
      }
    ]
  }
}
