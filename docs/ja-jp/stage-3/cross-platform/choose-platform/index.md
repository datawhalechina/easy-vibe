# アプリケーションに適したプラットフォームの選び方

アイデアがあり、それを本物の製品にしたい。しかし、WeChatミニプログラム、iOSアプリ、Androidアプリ、ウェブサイト、ブラウザ拡張機能、デスクトップアプリケーションなど、多くのプラットフォームオプションがあります - どこから始めるべきでしょうか？

::: tip :bulb: クイックナビゲーション
各プラットフォームの特徴をすでに知っている場合は、[セクション2](#2-まず自分に3つの質問を)の意思決定プロセスに直接ジャンプするか、[セクション7の意思決定フローチャート](#7-まとめ-プラットフォーム選択の意思決定フロー)をご覧ください。
:::

この記事は、思考を整理し、具体的なシナリオに基づいて最適な開発プラットフォームを見つけるお手伝いをします。

## 1 まず各プラットフォームを知る

「どれを選ぶか」を議論する前に、「何が存在するか」を理解しましょう。以下は現在の主要なプラットフォームカテゴリです：

### 1.1 モバイルプラットフォーム

#### iOSネイティブアプリ

iPhoneでApp StoreからダウンロードするアプリがiOSネイティブアプリです。特徴：高速起動、スムーズな体験、スマホ機能（カメラ、位置情報、ヘルスデータなど）へのフルアクセス。ただし開発にはMacが必要で、App StoreリリースにはAppleの審査が必要。

**一般的な例**：WeChat、Douyin（TikTok中国）、Xiaohongshu、Keep、Meituan、Alipay

#### Androidネイティブアプリ

Androidアプリストアからダウンロード、または友人から送られたAPKファイルからインストールするアプリがAndroidネイティブアプリです。iOSアプリと似ていますが、Androidはユーザーが多く、配布チャネルも多い。欠点はデバイスの断片化：開発者は多くの画面サイズとシステムバージョンに適応する必要があります。

**一般的な例**：Tasker（自動化）、MX Player（動画プレーヤー）、AirDroid（スマホ管理）、Greenify（バッテリー最適化）、Xposed Framework（システムカスタマイズ）

#### WeChatミニプログラム

WeChat内でQRコードをスキャンしたり名前で検索して直接使用できる「小さなアプリ」。インストール不要。メリットはユーザーの摩擦が低いこと：皆すでにWeChatを持っているので、ユーザーはすぐに始められる。欠点は機能が制限され、WeChat内でのみ動作すること。

**一般的な例**：Pinduoduo（共同購入EC）、Meituan Waimai（ローカルサービス）、Mobike（シェアサイクル）、Jump Jump（ミニゲーム）、Zhouheiya（注文/ショッピング）

#### PWA（Progressive Web App）

技術的に聞こえますが、基本的には「アプリのようにインストールできるWebページ」です。モバイルブラウザでサイトを開くと、「ホーム画面に追加」が表示される場合があります。ワンタップでホーム画面にアイコンが表示され、アプリのように動作。メリットはモバイルとデスクトップで1つのコードベース。欠点は多くのユーザーがこの使用パターンを知らないこと。

**一般的な例**：Twitter Lite、Starbucks、Pinterest、Uber、Spotify Web Player

### 1.2 デスクトッププラットフォーム

#### Electronデスクトップアプリ

毎日使っているかもしれません：VS Code、Slack、Discord、Notion、Figma - すべてElectronで構築されています。主要な特徴：Web技術（HTML、CSS、JavaScript）を使用してデスクトップソフトウェアを構築し、1つのコードベースでWindows、Mac、Linuxで動作。欠点はインストーラーが大きく、実行時のメモリ使用量が多いこと。

**一般的な例**：VS Code、Slack、Discord、Notion、Figma、WeChat Developer Tools

#### Qtデスクトップアプリケーション

WPS、VirtualBox、OBSを使用したことがあるなら、それらはQtで構築されているかもしれません。QtはC++を使用し、パフォーマンスと安定性に優れ、特に産業シナリオに適しています。ただし学習曲線は高く、C++の知識が必要。

**一般的な例**：WPS Office、VirtualBox、Autodesk Maya、Telegram Desktop、OBS Studio

#### ネイティブデスクトップアプリケーション

これらの「重量級」アプリケーションは通常、ネイティブ技術で構築されています。WindowsではC#やC++、macOSではSwiftがよく使われます。最高のパフォーマンスと最もスムーズな体験を提供しますが、WindowsとmacOS版を別々に開発する必要があり、コストが高い。

**一般的な例**：Microsoft Office、Adobe Photoshop、Final Cut Pro、WeChat（Windows/Mac）、QQ Music

### 1.3 Web関連プラットフォーム

#### ウェブサイト

ブラウザでURLを入力して開くページです。メリット：任意のデバイス（スマホ、PC、タブレット）でアクセス可能、インストール不要、検索エンジンで検索可能。欠点：インターネット接続が必要で、オフライン使用不可。

**一般的な例**：Taobao、Zhihu、GitHub、Bilibili、Juejin、CSDN

#### ブラウザ拡張機能

広告ブロッカー、翻訳ツール、パスワードマネージャーを使ったことがありますか？これらはブラウザ拡張機能です。ブラウザ内で動作し、Webページの内容を読み取り/変更できます。例えば、翻訳拡張機能をインストールすれば、英語ページをワンクリックで翻訳。メリット：軽量でブラウザと一緒に起動。欠点：ブラウザ内でのみ動作し、Chrome、Edge、Firefox間で常に互換性があるわけではない。

**一般的な例**：AdBlock Plus、Immersive Translate、1Password、Grammarly、Tampermonkey、Dark Reader

### 1.4 その他のプラットフォーム

#### VS Code拡張機能

開発者なら、おそらくVS Codeを使っているでしょう。VS Code拡張機能はエディタに「機能を追加」する小程序。メリット：非常にターゲットされた開発者オーディエンス。欠点：開発者ユーザーにのみ有用。

**一般的な例**：Prettier、GitLens、GitHub Copilot、ESLint、Live Server、Chinese Language Pack

#### NFTスマートコントラクト

NFTについて聞いたことがあるかもしれません - 数百万で売られた「デジタルアバター」のこと。NFTは本質的にブロックチェーンベースの所有権証明書で、デジタルアイテムがあなたのものであることを証明します。スマートコントラクトはブロックチェーン上で実行されるプログラムで、NFTを作成・管理します。メリット：改ざん困難で取引可能。欠点：技術的ハードルが高く、市場が不安定。

**一般的な例**：BAYC、CryptoPunks、NBA Top Shot、Azuki、Moonbirds

### 1.5 さらに多くの選択肢

上記のプラットフォーム以外にも、「中間の道」とさらなる可能性があります：

#### クロスプラットフォームフレームワーク

::: details クロスプラットフォームフレームワークの詳細をクリックして表示

**React Native / Flutter**：iOSとAndroidの両方で、2つのコードベースを書かずに済ませたいですか？これらのフレームワークは一度書けば両プラットフォームのアプリを生成。AirbnbやInstagramなど多くの企業が使用。

**Tauri**：Electronの「軽量代替」。同じくWeb技術でデスクトップアプリを構築しますが、インストーラーが小さく、実行時のパフォーマンスが良い。欠点：エコシステムの成熟度が低い。

**uni-app**：中国で非常に人気。1つのコードベースでWeChatミニプログラム、iOSアプリ、Androidアプリ、H5ウェブサイトに対応。「一度構築すれば、どこでも実行」したいチームに適している。

**Capacitor / Ionic**：すでにウェブサイトがあり、それを素早くアプリにしたい？これらのツールはウェブサイトをアプリストア向けのインストール可能なアプリに「ラップ」できる。

これらのフレームワークは本質的にネイティブとWeb開発のトレードオフ：開発効率は高いが、パフォーマンスと体験面でいくつか妥協が必要。
:::

#### 中国ミニプログラムエコシステム

::: details 中国のミニプログラムオプションをクリックして表示

**Alipayミニプログラム**：金融・ローカルサービスシナリオ。ユーザーがAlipayで公共料金の支払い、食事の注文、交通機関の利用をするなら、Alipayミニプログラムが適合。芝麻信用や信任身分などの機能はAlipay独自。

**Douyinミニプログラム**：コンテンツコマースとライブ販売。Douyinで販売するなら、動画の下にミニプログラムを付けて即時コンバージョン可能。

**Kuaishouミニプログラム**：下位市場と強いコミュニティ経済。Kuaishouユーザーはエンゲージメントが高く、コミュニティ共同購入やローカルサービスに適している。

**Baiduミニプログラム**：検索トラフィックのエントリ。ユーザーがBaiduで「近くのレストラン」を検索すると、ミニプログラムが検索結果に直接表示。
:::

#### HarmonyOSエコシステム

**HarmonyOSアプリ**：Huaweiスマホ、タブレット、時計、スマートホームデバイスで動作。ArkTS（TypeScriptに似た言語）で開発、1つのコードベースで複数デバイスをサポート。ターゲット層がHuaweiエコシステム内か、製品がIoT連携を含む場合、HarmonyOSは重要な選択肢。

#### その他の開発者ツール

::: details その他の開発者ツールオプションをクリックして表示

**コマンドラインツール（CLI）**：開発者は日常的にターミナルを使用。CLIツールは反復作業の自動化、コードテンプレートの生成、プロジェクトのデプロイに役立つ。`create-react-app`、`git`、`npm`などが例。開発者の生産性向上とDevOps自動化に適している。

**JetBrainsプラグイン**：VS Code以外にも、IntelliJ IDEA、PyCharm、WebStormを使用する開発者は多い。ツールがJava、Python、フロントエンド開発者をターゲットにする場合、JetBrains Marketplaceも検討に値する。

**Cursor / Windsurfプラグイン**：AIコーディングツールの新興エコシステム。AI支援コーディング機能を構築する場合、これらのIDEプラグインエコシステムは急速に成長中。
:::

#### コミュニティボット

::: details コミュニティボットオプションをクリックして表示

**Telegram Bot**：海外に大きなユーザーベースがあり、開発者にフレンドリーなAPI。通知、自動化タスク、コミュニティ管理に適している。多くの暗号通貨プロジェクトや開発者コミュニティがTelegramを使用。

**Discord Bot**：ゲームと開発者コミュニティのコアプラットフォーム。音楽再生、ゲームデータ照会、サーバー管理に役立つ。ユーザーがゲーマーや海外開発者の場合、Discordボットは必須のことが多い。
:::

#### デザインと生産性ツール

::: details デザインツールオプションをクリックして表示

**Figmaプラグイン**：デザイナーは毎日Figmaを使用。プラグインはデザインワークフローの自動化、コード生成、デザインシステムの管理に役立つ。デザインツーリングとフロントエンド支援に適している。

**Notionインテグレーション**：Notion APIを使用してワークフローの自動化、データ同期、レポート生成が可能。ナレッジマネジメントとプロジェクト管理ツールに適している。
:::

#### 空間コンピューティング

**visionOSアプリ（Apple Vision Pro）**：空間コンピューティングの新時代。3Dコンテンツ表示、没入型体験、教育/トレーニング、バーチャルコラボレーションに適している。技術的ハードルは高いが、最先端の探索には将来の方向性。

---

## 2 まず自分に3つの質問を

プラットフォームを選ぶ前に、以下の3つのコア質問に答えてください：

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">質問1：ユーザーはどこにいる？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>ユーザーはいつでもどこでも使う必要がある？（モバイルファースト）</li>
      <li>ユーザーはWeChat内でタスクを完了するのに慣れている？（ミニプログラム）</li>
      <li>ユーザーはオフィスシナリオで長時間使用する？（デスクトップアプリ）</li>
      <li>ユーザーは検索エンジンであなたを見つける必要がある？（ウェブサイト）</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">質問2：アプリにどのような機能が必要？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>カメラ、マイク、GPS、その他ハードウェアへのアクセスが必要？</li>
      <li>オフラインサポートが必要？</li>
      <li>プッシュ通知が必要？</li>
      <li>大量のローカルデータを処理する必要がある？</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">質問3：どれくらいのリソースがある？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>開発時間の予算は？</li>
      <li>Macデバイスを持っている？（iOS開発に必要）</li>
      <li>複数のプラットフォームを同時にカバーする必要がある？</li>
    </ul>
  </div>
</el-card>

---

## 3 プラットフォーム選択の意思決定テーブル

このテーブルを使用して適合するものを素早く特定：

| あなたのシナリオ | 推奨プラットフォーム | 理由 |
|---------|---------|------|
| ユーザーはWeChatエコシステム内におり、急速なユーザー獲得を望む | <el-tag type="success">WeChatミニプログラム</el-tag> | ダウンロード不要、WeChat共有が容易、獲得コストが低い |
| バックグラウンドでの継続的なGPS追跡とヘルスデータアクセスが必要 | <el-tag type="primary">iOS / Androidネイティブ</el-tag> | 直接的なシステムAPIアクセス、最高のパフォーマンス |
| 複数プラットフォーム向けに1つのコードベースを希望 | <el-tag type="warning">PWA / Electron</el-tag> | 高効率、低メンテナンスコスト |
| ユーザーがPCで長時間使用する必要がある | <el-tag type="primary">デスクトップアプリ</el-tag>（Electron / Qt） | 別ウィンドウ、オフラインサポート、強力なシステム統合 |
| ブラウジング中に自動要約/翻訳/パスワード管理が必要 | <el-tag type="info">ブラウザ拡張機能</el-tag> | Webページコンテンツの読み取り/変更が可能、ブラウザと一緒に起動 |
| 技術記事/プロジェクトショーケースをGoogleにインデックスさせたい | <el-tag type="warning">ウェブサイト / 個人ブログ</el-tag> | SEOに有利、コンテンツが検索可能 |
| 取引可能なデジタル会員カードやコレクティブルを発行したい | <el-tag type="danger">NFTスマートコントラクト</el-tag> | オンチェーンの所有権、転送/取引可能 |

---

## 4 実践的なシナリオ例

### シナリオ1：コミュニティ共同購入ツールを作りたい

**:bulb: 推奨：WeChatミニプログラム**

なぜミニプログラムか？

- **ユーザーはすでにWeChatにいる**：コミュニティユーザーはWeChatグループで活発。ミニプログラムはグループで直接共有可能
- **使って離れる行動**：野菜を注文するためだけに専用アプリをインストールしたくない
- **シームレスな決済**：ワンタップWeChat Pay、コンテキスト切り替え不要
- **低い獲得コスト**：1つのグループ共有フローで数十人のユーザーを獲得可能

::: tip :bulb: 適用シナリオ
製品が類似している場合 - 共同購入、予約、アンケート、イベント申し込み - ミニプログラムが通常は第一選択。
:::

---

### シナリオ2：ランニングトラッカーアプリを作りたい

**⚡ 推奨：iOS / Androidネイティブ**

なぜネイティブアプリか？

- **バックグラウンド実行**：ランニング中もルート追跡を継続する必要がある。ミニプログラムやウェブサイトでは信頼性が低い
- **GPS精度**：ネイティブアプリは高精度位置情報にアクセス可能、誤差範囲が小さい
- **ヘルスデータアクセス**：歩数や心拍数へのアクセスにはApple HealthKit / Google Fitが必要
- **信頼性の高いプッシュ通知**：毎日の「ランニングの時間です」の通知はネイティブプッシュが最適

::: warning :warning: 重要な注意
**長期のバックグラウンド実行**や**深いハードウェアアクセス**が必要なアプリは、ネイティブ開発を選択すべき。
:::

---

### シナリオ3：家計簿アプリを作りたい

**:memo: 推奨：PWAまたはミニプログラム**

なぜか？

- **高頻度だが短いセッション**：1日1回の記録、30秒で完了
- **複雑なハードウェア不要**：主にデータ入力と表示
- **強いクロスプラットフォーム要件**：スマホで記録し、PCでレポートを確認
- **オフラインシナリオ**：地下鉄で電波がない状態で支出を記録したい

PWAはホーム画面にインストール可能でアプリのように感じられ、開発コストはネイティブの約3分の1。中国ユーザーにはミニプログラムが適している場合が多い。

---

### シナリオ4：オンライン教育プラットフォームを作りたい

**:books: 推奨：ウェブサイト + ミニプログラムの組み合わせ**

なぜか？

- **ウェブサイトが獲得を担当**：コースページ、講師紹介、SEO最適化
- **ミニプログラムがコンバージョンを担当**：体験授業、入会金支払い、QRコードでグループ参加
- **ウェブサイトが配信を担当**：動画再生は大きいWeb画面の方が良い
- **ミニプログラムがタッチポイントを担当**：授業のリマインダーや宿題通知

::: tip :bulb: 組み合わせ戦略
複雑なビジネスは単一プラットフォームではなく、**マルチプラットフォームの組み合わせ**が必要になることが多い。
:::

---

### シナリオ5：チームコラボレーションツールを作りたい

**🤝 推奨：Electronデスクトップアプリ + Web版**

なぜか？

- **デスクトップ側**：仕事中はPCをつけっぱなし。デスクトップアプリは常駐してメッセージを受信可能
- **Web側**：他のPCでインストールなしで一時使用
- **システム統合**：デスクトップアプリはローカルファイル、システム通知、ショートカットにアクセス可能
- **1つのコードベース**：ElectronはWeb技術スタックを使用し、デスクトップ/Webで約80%のコードを再利用可能

Slack、Notion、Discordはすべてこのパターンに従っている。

---

### シナリオ6：パスワードマネージャーを作りたい

**🔐 推奨：デスクトップアプリ + ブラウザ拡張機能**

なぜか？

- **デスクトップアプリ**：安全なローカルパスワードデータベースストレージ、生体認証ロック解除をサポート
- **ブラウザ拡張機能**：ログインページでウィンドウ切り替えなしで自動入力
- **オフライン利用**：パスワードデータはローカル保存、ネットワークに依存しない
- **セキュリティ管理**：ユーザーはデータの場所を把握、クラウド漏洩の懸念を軽減

1PasswordとBitwardenはどちらもこの組み合わせを使用。

---

### シナリオ7：コンテンツ作成プラットフォームを作りたい

**✍️ 推奨：ウェブサイト + 個人ブログ**

なぜか？

- **SEOが命綱**：検索は最大の長期トラフィックソース
- **コンテンツが製品**：記事、チュートリアル、動画がコアバリュー
- **長期資産**：ウェブサイトは何年も運営可能。ソーシャルアカウントはいつでも停止される可能性
- **柔軟なマネタイズ**：広告、有料サブスクリプション、ナレッジコマースはすべてウェブサイトで運営可能

Medium、Zhihuコラム、個人技術ブログはすべて本質的にコンテンツプラットフォーム。

---

### シナリオ8：開発者生産性ツールを作りたい

**🛠️ 推奨：VS Code拡張機能またはCLIツール**

なぜか？

- **ユーザーはすでにエディタ内にいる**：開発者はコンテキストスイッチを嫌う
- **コンテキスト認識**：ツールが現在のコードを読み取り、的確な提案を提供可能
- **簡単な配布**：拡張機能マーケットプレイスに公開すれば、ユーザーはワンクリックでインストール
- **高速な反復**：アプリストアの審査遅延なし、同日リリース/更新

Prettier、ESLint、GitHub CopilotはすべてVS Code拡張機能。

---

### シナリオ9：産業監視ダッシュボードを作りたい

**🏭 推奨：Qtデスクトップアプリケーション**

なぜか？

- **安定性が最優先**：工場は24時間稼働、ソフトウェアがクラッシュできない
- **ハードウェア通信**：センサーとのシリアル/Modbus通信が必要
- **リアルタイムチャート**：圧力/温度/流量はミリ秒更新が必要なことが多い
- **産業環境**：産業用PCはWindowsが一般的で、Qtの互換性が強い

::: warning :warning: 産業シナリオ
産業シナリオでは、Web技術では通常満たせない安定性とハードウェアインターフェースが必要。
:::

---

### シナリオ10：デジタル会員カードを発行したい

**🎫 推奨：NFTスマートコントラクト**

なぜか？

- **偽造不可**：オンチェーン記録は改ざん不可
- **転送可能**：会員権はギフトや二次市場で取引可能
- **プログラマブル**：スマートコントラクトは特典を自動化（例：1年後に自動アップグレード）
- **グローバルリーチ**：国境なし、世界的な参加が可能

Starbucks OdysseyとNBA Top Shotはどちらも会員システムにNFTを使用。

---

## 5 プラットフォーム機能クイック比較

### 5.1 モバイルソリューションの比較

| 機能 | WeChatミニプログラム | iOSネイティブ | Androidネイティブ | PWA |
|-----|----------|---------|-------------|-----|
| ユーザー獲得コスト | <el-tag type="success">低</el-tag>（WeChat共有） | <el-tag type="danger">高</el-tag>（アプリストア） | <el-tag type="danger">高</el-tag>（アプリストア） | <el-tag type="warning">中</el-tag>（検索エンジン） |
| オフライン使用 | <el-tag type="warning">制限あり</el-tag> | <el-tag type="success">完全</el-tag> | <el-tag type="success">完全</el-tag> | <el-tag type="success">サポート</el-tag> |
| プッシュ通知 | <el-tag type="success">サポート</el-tag> | <el-tag type="success">サポート</el-tag> | <el-tag type="success">サポート</el-tag> | <el-tag type="warning">部分的</el-tag> |
| ハードウェアアクセス | <el-tag type="warning">制限あり</el-tag> | <el-tag type="success">フルアクセス</el-tag> | <el-tag type="success">フルアクセス</el-tag> | <el-tag type="warning">制限あり</el-tag> |
| バックグラウンド実行 | <el-tag type="warning">制限あり</el-tag> | <el-tag type="success">サポート</el-tag> | <el-tag type="success">サポート</el-tag> | <el-tag type="warning">制限あり</el-tag> |
| 開発コスト | <el-tag type="success">低</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="success">低</el-tag> |
| 審査必要 | <el-tag type="warning">はい</el-tag> | <el-tag type="warning">はい</el-tag> | <el-tag type="warning">はい</el-tag> | <el-tag type="success">いいえ</el-tag> |

### 5.2 デスクトップソリューションの比較

| 機能 | Electron | Qt | ブラウザ拡張機能 |
|-----|----------|-----|-----------|
| クロスプラットフォーム | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| システム統合 | <el-tag type="warning">中</el-tag> | <el-tag type="success">高</el-tag> | <el-tag type="warning">低</el-tag> |
| オフライン使用 | <el-tag type="success">サポート</el-tag> | <el-tag type="success">サポート</el-tag> | <el-tag type="warning">部分的</el-tag> |
| ハードウェアアクセス | <el-tag type="warning">Node.js経由</el-tag> | <el-tag type="success">フルアクセス</el-tag> | <el-tag type="warning">制限あり</el-tag> |
| インストール | インストーラーパッケージ | インストーラーパッケージ | ブラウザ拡張機能ストア |
| 開発スタック | Web技術 | C++/QML | JavaScript |

---

## 6 一般的な誤解

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解1：「アプリを作りたいなら、iOSとAndroidの両方を作らなければならない」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      必ずしもそうではありません。アプリが軽量で使って離れるタイプなら、ミニプログラムやPWAがより良い選択かもしれません。深いシステムアクセスや最高のパフォーマンスが必要な場合のみ、ネイティブ開発の価値がある。
    </div>
  </el-collapse-item>

  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解2：「ウェブサイトは時代遅れで、もう誰も読まない」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      実際は逆です。ウェブサイトは検索エンジンがインデックスできる唯一のプラットフォームです。コンテンツ主導のユーザー成長を望むなら、ウェブサイトと個人ブログがトップの選択肢。技術記事やプロジェクトショーケースは継続的にSEOトラフィックをもたらします。
    </div>
  </el-collapse-item>

  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解3：「デスクトップアプリはもう使われていない」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      オフィスシナリオでは、デスクトップアプリがまだ主流です。VS Code、Slack、Notionはすべてデスクトップアプリです。アプリが長時間使用、重いデータ処理、システム統合を必要とする場合、デスクトップが多くの場合最適な選択。
    </div>
  </el-collapse-item>

  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 誤解4：「PWAの体験はネイティブより劣る」</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      最新のPWAはすでにネイティブ体験に非常に近くなっています。Starbucks、Pinterest、UberにはすべてPWA版があります。アプリが複雑なハードウェア統合を必要としない場合、PWAが多くの場合最も費用対効果の高いクロスプラットフォームソリューション。
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 まとめ：プラットフォーム選択の意思決定フロー

```text
スタート
  │
  ├─ ユーザーはWeChatエコシステム内？ ───────────────────→ WeChatミニプログラム
  │
  ├─ 最高のパフォーマンスと深いハードウェアアクセスが必要？ ──→ iOS / Androidネイティブ
  │
  ├─ PCでの長時間使用が必要？ ───────────→ デスクトップアプリ
  │     │
  │     ├─ 産業シナリオ？ ───────────────────────→ Qt
  │     └─ 一般シナリオ？ ──────────────────────────→ Electron
  │
  ├─ ブラウザページコンテンツを処理する必要がある？ ────────────→ ブラウザ拡張機能
  │
  ├─ 軽量 + クロスプラットフォーム + オフライン？ ──────────→ PWA
  │
  ├─ 検索で見つけてもらう必要がある？ ───────────────→ ウェブサイト / ブログ
  │
  ├─ 開発者ツール？ ───────────────────────────────────→ VS Code拡張機能
  │
  └─ ブロックチェーン資産？ ────────────────────────────────→ NFTスマートコントラクト
```

---

## 8 次のステップ

::: tip 🎯 行動を始めよう
上記の分析に基づき、「どのプラットフォームを選ぶか」についての予備的な答えが出ているはずです。次に、対応するチュートリアルをクリックして始めましょう：
:::

<NavGrid>
  <NavCard
    href="/ja-jp/stage-3/cross-platform/wechat-miniprogram/"
    title="WeChatミニプログラムの作り方"
    description="WeChatミニプログラムをゼロから構築し、コア開発ワークフローを習得"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/android-app/"
    title="Androidアプリの作り方"
    description="モダンなクロスプラットフォームフレームワークでAndroidネイティブアプリを構築"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/ios-app/"
    title="iOSアプリの作り方"
    description="AppleエコシステムのベストプラクティスでiOSアプリを開発・公開"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/pwa-local-app/"
    title="ローカルPWAアプリの作り方"
    description="ウェブサイトをオフラインサポートとデスクトップインストール可能な本物のアプリに変換"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/browser-ai-extension/"
    title="ブラウザAIアシスタント拡張機能の作り方"
    description="ワンクリックで任意のWebページを要約し、ブラウザAIアシスタントを構築"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/electron-voice-to-text/"
    title="クロスプラットフォームElectronデスクトップアプリの作り方"
    description="Windows、macOS、Linux向けの音声テキスト変換デスクトップアプリを構築"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/vscode-extension/"
    title="VS Code拡張機能の作り方"
    description="マルチファイルQ&Aとカスタムショートカットを持つAIプロジェクトアシスタントを作成"
  />
  <NavCard
    href="/ja-jp/stage-3/cross-platform/qt-industrial-hmi/"
    title="Qt産業HMIの作り方"
    description="実際のハードウェアに接続する産業グレードのヒューマンマシンインターフェースを構築"
  />
</NavGrid>
