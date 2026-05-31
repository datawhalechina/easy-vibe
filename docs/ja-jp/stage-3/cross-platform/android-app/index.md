# シンプルなAndroidアプリの作り方 - ネイティブCompose開発

# 1 AndroidアプリとAndroid開発とは

このチュートリアルでは、完全なクローズドループを完成させます：**頭の中のアイデアから、Androidスマホにインストールして実行できるリアルなアプリまで。**

このチュートリアルに取り組む前に、少なくとも以下のものを用意してください：

- そこそこの性能のパソコン（WindowsまたはMac）
- Androidスマホ（オプション。ない場合はエミュレーターを使用します）
- Android Studioのインストール済み（ビルド用）
- Traeのインストールと登録済み（AIコーディング用）

## 1.1 Androidアプリとは

Androidアプリとは、Androidオペレーティングシステム上で動作するネイティブアプリケーションです。ミニプログラムとは異なり、WeChatのようなホストに依存しません。システムレベルで直接動作し、独自のホームスクリーンアイコンを持ち、起動が速く、操作感が滑らかで、Bluetooth、センサー、バックグラウンドサービスなどのシステムレベル機能に深くアクセスできます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image1.png)

## 1.2 Androidアプリ開発とは

Android開発とは、このようなアプリケーションを構築するプロセス全体を指します。このチュートリアルで使用するVibe Coding開発モードでは、**AI支援プログラミング**により、開発者の役割は「コードを書く人」から「プロダクトアーキテクト」へと変わります：

1. **あなた（アーキテクト / PM）**：ビジネスロジック設計、プロンプト作成、最終成果物の受け入れを担当します。
2. **Trae（AIエンジニア）**：指示の実行、自然言語から標準的なKotlinコードとJetpack Composeレイアウトへの変換、構文エラーやロジックの細部の処理を担当します。
3. **Android Studio（ビルド工場）**：コンパイル環境の提供、コードを実行可能なアプリにパッケージング、エミュレータープレビューの提供を担当します。

## 1.3 Androidアプリを作る一般的な方法

実際の開発では、Androidアプリを作る方法は一つではありません。ここでは深く掘り下げず、全体的な理解を提供します。

**第一の方法：ネイティブ開発**
これはGoogle公式の推奨ルートです。直接**Kotlin**と**Jetpack Compose**を使って開発します。利点は最高のパフォーマンスとスマホハードウェアへの完全なアクセスです。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image2.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image3.png)

**第二の方法：クロスプラットフォーム開発**
例えばFlutterやReact Nativeです。核心的なアイデアは「一つのコードベースを書いて、AndroidとiOSの両方のアプリを生成する」ことです。

**第三の方法：ハイブリッド開発**
本質的には、ウェブページをアプリのシェル内に包むことです。開発は速いですが、体験や滑らかさは通常ネイティブアプリに劣り、洗練された没入型の小ツールを作るのは難しいです。

**このチュートリアルの選択：ネイティブ開発（** **Kotlin + Compose）**をAIツールと組み合わせてコーディングします。
理由はシンプルです：ネイティブのJetpack Composeコードは構造が非常に明確で、AIが理解して生成するのに非常に適しています。ゼロからコードを手書きする必要はありません。代わりに、自然言語でTraeをガイドして、高品質なネイティブコードを生成させます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image4.png)

## 1.4 このチュートリアルで取り上げるAndroidアプリ開発手順

学習プロセスを面白くするため、このチュートリアルはリラックスできる技術的に代表的なケースを中心に進めます - **電子木魚**です。TraeのVibe Codingモードと、繰り返し再利用できるルートを組み合わせます：

1. **理解と環境構築**：Androidアプリとは何かを理解し、Android StudioとTraeをインストールし、中国国内向けミラーを設定してツールチェーンがスムーズに動くようにします。
2. **プロジェクトスケルトンの構築**：エミュレーターで正常に実行できる空のAndroidプロジェクトを作成します。
3. **AIによる反復開発**：プロジェクトをTraeで開き、AIとの対話を通じて、木魚の画像、タップアニメーション、効果音、浮遊テキストなどを段階的に実装します。
4. **実機デバッグと改善**：エミュレーターを超えて、実際のスマホにアプリをインストールし、本物の振動フィードバックを体験し、AIにバグ調査を手伝ってもらいます。
5. **パッケージングと公開**：正式なAPKを生成し、共有やリリースの方法を理解します。

このセクションでは全体像を描くだけで、すべてのコマンドはまだ展開しません。今はメインラインを覚えておいてください：**環境構築 → スケルトン作成 → AIによる記述と生成 → 実機での改善 → パッケージングと納品**。次の章で、各ステップを詳しく説明します。

# 2 開発環境のセットアップ

## 2.1 このチュートリアルで使用するツール

開発プロセス全体で、3つのツールを組み合わせて使用し、それぞれが「設計」「構築」「受け入れ」の役割を果たします。

- **Trae**：あなたの**AIコーディングパートナー**です。Vibe Codingモードでは、コードを一行ずつ打つ必要はありません。代わりに、自然言語でAIに何を作りたいかを伝え、コードの生成と修正を任せます。
- **Android Studio**：Google公式の**アプリビルド工場**です。ボタンがたくさんありますが、このチュートリアルでは主にプロジェクトスケルトンの作成と、Traeが生成したコードをスマホにインストール可能な形にコンパイルするために使用します。
- **Androidデバイス**：結果を確認するための**テスト端末**です。パソコンに接続して実機デバッグを行い、本物の振動フィードバックを感じることができます。ない場合は、Android Studioに内蔵された**エミュレーター**が仮想スマホを完璧にシミュレートでき、初期開発には十分です。

## 2.2 Traeのダウンロード

Traeは**Vibe Coding**の主戦場です。シンプルに**「AI搭載のコードエディタ」**と考えてください。

公式サイト[https://www.trae.cn](https://www.trae.cn)にアクセスし、お使いのパソコンのシステム（WindowsまたはMac）に合ったバージョンをダウンロードし、通常のソフトウェアと同じようにインストーラーをダブルクリックして指示に従います。このツールの準備ができたら、以降の実践では退屈なコードウィンドウを見つめるのをやめ、ここでプロジェクトを開いて自然言語でAIに何を作るかを伝えます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image5.png)

## 2.3 Android Studioのダウンロード

アプリの実行に必要なAndroid SDKとエミュレーターを提供するためにAndroid Studioが必要です。公式ダウンロードページ[https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn)にアクセスし、お使いのオペレーティングシステム用のパッケージをダウンロードします（このチュートリアルは**2025.2.3**をベースにしています）。ダウンロード後、通常のソフトウェアと同じようにインストールし、全体を通してデフォルトオプションを保持します。

**初心者への特別な注意：**

最新バージョンのAndroid Studioは設定を大幅に簡素化していますが、裏側では**JDK（Java Development Kit）**に依存しています。開発をするのが初めての場合や、インストール中に環境変数やSDK設定に関するエラーが発生した場合は、慌てないでください。この詳細なセットアップガイドを参照してください：[Android Studio 2024 setup: SDK and Gradle configuration](https://blog.csdn.net/keiraee/article/details/142321644?ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image6.png)

## 2.4 新規プロジェクトの作成

Android Studioを開き、ウェルカム画面で**New Project**をクリックします。

**ステップ1：テンプレートの選択**

テンプレートリストから**Empty Activity**を選択します（Jetpack Composeのアイコンが付いていることに注意してください）。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image7.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image8.png)

**ステップ2：プロジェクト設定の入力**

設定フォームが表示されます。以下のように入力し、残りはデフォルトのままにします：

| **項目** | **推奨値** | **説明** |
| ----------------- | -------------------------------------------------- | ---------------------------------------- |
| **Name** | My Application 1 | スマホのホーム画面に表示されるアプリ名 |
| **Package name** | com.example.myapplication1 | アプリの一意識別子 |
| **Save location** | カスタムパス（例：`E:\AndroidProjects\Myapplication1`） | プロジェクトの保存場所。Cドライブは非推奨 |
| **Minimum SDK** | API 30 | アクティブなデバイスの90%以上をカバーしつつ、互換性と機能のバランスを取る |
| **Language** | Kotlin（推奨） | KotlinはGoogle公式推奨の言語で、よりクリーンで安全 |

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image9.png)

**ステップ3：プロジェクトビルドの待機**

**Finish**をクリックします。Android Studioが自動的に依存関係をダウンロードしてプロジェクトをビルドします（右下にプログレスバーが表示されます）。

- _注意：初回のプロジェクト作成は数分かかる場合があります。下部のプログレスが完了し、左側にプロジェクトファイルツリーが完全に読み込まれるまで辛抱強く待ってください。_

## 2.5 依存関係の設定：GradleダウンロードとGradleリポジトリミラー

> これはVibe Codingワークフローで**手動操作**が推奨される数少ないステップの一つです。AIも設定の変更を手伝えますが、環境設定は低レベルのファイルに触れるため、手動での変更がより確実です。

なぜ設定を変更する必要があるのでしょうか？

デフォルトでは、Android Studioは海外のサーバーに接続するため、ビルドツールや依存関係のダウンロードに1時間かかったり、失敗することすらあります。国内ミラーに切り替えると、通常数分で完了します。**これは一度の設定で永続的に効果がある作業です。**

1. **準備**

Android Studioの右下のステータスバーに`Gradle Building...`というプログレスバーが表示されている場合、まず進行中の依存関係のダウンロードを一時停止し、ファイルの競合を避けます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image10.png)

2. **Gradleダウンロードの高速化**

左側のプロジェクトファイルツリーで、`gradle` -> `wrapper`を展開し、`gradle-wrapper.properties`を開きます。ダウンロード元をTencentのミラーに変更します：

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

注意：`services.gradle.org/distributions`を`mirrors.cloud.tencent.com/gradle`に置き換えるだけです。他は変更しないでください。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **依存関係リポジトリダウンロードの高速化**

次に、プロジェクトルートの`settings.gradle.kts`を開き、`repositories`ブロック内の内容を以下に置き換えます：

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image12.png)

ハイライトされた部分を以下のコードに置き換えます（2025-02-21時点の最新ソースリスト）：

```json
        // Aliyun mirrors (covering Maven Central, Google, JCenter, etc.)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Huawei Cloud mirror
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Tencent Cloud mirror
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // NetEase mirror
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

その後、以下のスクリーンショットのようになります：

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **保存して変更を適用**

ファイルを保存し、右上の`Try Again`をクリックします。Android Studioがダウンロードを再実行します。数分待ちます。コンソールに`BUILD SUCCESSFUL`と表示されたら、環境設定は完全に完了し、コーディングを開始する準備が整いました。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 プロジェクト構造を理解する

プロジェクトの作成が成功すると、左側に**Project**パネルが表示されます。**Android**ビュー（デフォルト）に切り替えると、以下のような主要ディレクトリが表示されます：

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- アプリの「IDカード」。アプリ名とエントリーActivity（MainActivity）を宣言
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- アプリのエントリー。Jetpack ComposeでUIを構築
│       │
│       └── ui/                        <- 全体のUIスタイル（色、フォント）を制御
├── res/
│   ├── drawable/                      <- 画像リソース（例：ic_launcher.png）
│   ├── mipmap/                        <- アプリアイコン
│   ├── values/                        <- テキスト、色、テーマスタイル
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- システム関連の設定ファイル（UI以外）
└── build.gradle (Module: app)         <- アプリのビルド設定（初心者段階では通常変更不要）
```

初心者として、通常は3つのファイルに注目するだけで済みます：

- `MainActivity.kt`：動作を制御し、「画面に何が表示されるか」を決定します
- `AndroidManifest.xml`：コンポーネントを登録し、「アプリがどこから始まるか」を決定します
- `Theme.kt`：視覚的な外観を定義します

# 3 Androidアプリ開発

最初の2章で、Androidアプリとは何かを理解し、TraeとAndroid Studioという2つの主要ツールを準備しました。このセクションから、座学を離れて実際の練習に入ります。Vibe Codingモードを採用して、ゼロから非常に人気のあるストレス解消アプリを構築します - **電子木魚**です。これは「Vibe」のテーマにぴったり合い（シンプルでリラックスできる）、同時にAndroid開発の3つのコア部分をカバーします：**UIインタラクション（タップ）、データ保存（功徳カウント）、マルチメディア（効果音）**。

それでは、AIに最初の指示を送りましょう。

## 3.1 最初の「マスタープロンプト」：ゼロからイチへ

Vibe Codingモードでは、従来の開発のように最初にレイアウトファイルを作成してからロジックコードを書く必要はありません。必要なのは、**要件を一度に明確に記述し、AIに最初の実行可能なプロトタイプを生成させること**です。

作成したプロジェクトディレクトリをTraeで開き、右側のチャットパネルに以下のプロンプトを入力します：

```text
あなたはシニアAndroid開発エキスパートです。現在のMainActivity.ktを書き換えて、「電子木魚」アプリにしてください。要件：
1. 画面の背景は黒色にする。
2. 画面の中央に木魚のグラフィックを表示し、適度なサイズで白色にする。
3. その上に「功徳：0」という白いテキストを1行表示する。
4. 中央の木魚がタップされたら、数値が1増え、シンプルなスケールアニメーション効果が表示される（叩いた感覚をシミュレート）。
5. Jetpack Composeを使用する。
```

送信後、Traeはプロジェクト構造の分析を開始します。数秒後、`MainActivity.kt`の完全なコードが直接生成されます。

1. レスポンスから推論ロジックとインタラクションロジックを確認できます
2. コードのどの部分が書き換えられたかを直接確認できます
3. 結果に満足できない場合、以前のバージョンにロールバックできます

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image15.png)

## 3.2 実行とプレビュー（エミュレーターデバッグ）

この時点で、AIは最初のラウンドの開発を完了しました。しかし、覚えておいてください：Traeで見ているのはコードの「設計図」であり、実際のインタラクティブアプリではありません。Trae自体はAndroidアプリを直接実行できないため、Android Studioが提供する**仮想デバイスエミュレーター**に頼る必要があります。これはパソコンの画面を仮想Androidスマホに変えるようなもので、コードをすぐにインストールして実際の結果を確認できます。

次に、この「仮想スマホ」を設定しましょう。

**ステップ1：エミュレーターの作成**

Android Studioに戻り、右ツールバーの**Device Manager**を見つけてクリックします。見つからない場合は、`View -> Tool Windows -> Device Manager`から開いてください。

パネルで**Add a new device**をクリックし、**Create Virtual Device**を選択してデバイス選択ウィンドウに入ります。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image16.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image17.png)

ハードウェア選択ウィンドウで、**Phone**を選び、次に**Smart Phone**（中程度の画面サイズ）を選ぶか、Pixelなど他のデバイスプロファイルを選択して、**Next**をクリックします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image18.png)

**ステップ2：システムイメージの設定**

**System Image**ダイアログで、**API 36.1**を選択します。まだダウンロードしていない場合は、まず**Download**をクリックし、ダウンロードが完了したら選択して**Finish**をクリックします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image19.png)

**ステップ3：エミュレーターの起動**

作成が成功すると、デバイスマネージャーリストに新しいスマホが表示されます。右側の**三角形の再生ボタン**をクリックします。少し待つと、スマホ型のウィンドウがポップアップします - これがAndroidエミュレーターです。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image20.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image21.png)

**ステップ4：アプリの実行**

いよいよ魔法の瞬間です。エミュレーターが起動しデスクトップが表示されていることを確認し、Android Studioの上部ツールバーにある目立つ**緑色のRun三角形**をクリックします（またはショートカット`Shift + F10`を使用）。Android StudioがTraeの書いたコードを自動的にコンパイルし、アプリとしてパッケージングし、エミュレーターにインストールします。

数秒以内に、エミュレーターの画面が点灯し、中央に白い木魚のグラフィックとその上に「功徳：0」というテキストが表示されるはずです。タップして数値が増えるか、アニメーションが動くか試してみてください。これがあなたの最初のAndroidアプリです。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image22.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image23.png)

## 3.3 最適化の反復（アセットとサウンドの追加）

この段階で、アプリは基本的な形を持ちます：タップで数値が増えます。しかし、まだ「ミュート」の白い幾何学的形状にすぎず、面白みに欠けます。次に、実際の画像と叩いた音の効果を追加して、電子木魚をより没入感のあるものにします。

**これこそがVibe Codingモードの最も魅力的な部分です。**従来の開発では、効果音やより複雑なアニメーションの追加は初心者にとって悪夢のようなものでした。`MediaPlayer`のリソースの読み込みと解放を管理する必要があり（そうしないとメモリリークが発生する可能性があります）、アニメーションカーブも計算する必要があります。Vibe Codingモードでは、これらの低レベルの詳細を全く気にする必要はありません。監督のようにAIに伝えるだけで：「小道具を変えて、タップしたときに効果音を追加して」と言えば、実装がすぐに現れます。

**ステップ1：アセットの準備**
木魚の画像（`png`）1枚と叩いた効果音（`mp3`）1つが必要です。

- **画像アセット**：用意した`white_muyu.png`を`app/src/main/res/drawable`にコピーします
- **音声アセット**：Android Studioで、左側のプロジェクトパネルの`res`フォルダーを右クリックし、`New -> Android Resource Directory`を選択し、リソースタイプとして**raw**を選んでOKをクリックし、`voice.mp3`を新しく作成された`res/raw`フォルダーにコピーします。_（注意：商業リリースを予定している場合は、すべてのアセットの合法的な使用権を確保してください。）_

以下は私が見つけた画像とサウンドアセットです。自分で探すのが不便な場合は、直接使用できます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image24.png)

叩いた音のダウンロードリンク：https://www.aigei.com/s?q=%E6%9C%A8%E9%B1%BC&type=sound
最初の1秒の効果音を選んでください。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**ステップ2：反復指示の送信**

アセットの準備ができたら、Traeに戻ります。Traeはコードを再度修正し、音声の読み込みとアニメーションロジックを処理します。どのアセットを使用するかを伝えるだけで済みます。以下のプロンプトを入力します：

```text
アセットを追加しました。画像のパスはres/drawable/white_muyu.png、効果音のパスはres/raw/voice.mp3です。コードを更新してください：
1. 中央の木魚アイコンを私の画像に置き換える。
2. 木魚がタップされるたびに叩いた音を再生する。
3. タップされたとき、木魚の上に一時的な「+1」テキストを表示し、上に浮かんで消えるようにする（ゲームのスコアテキストのように）。
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**ステップ3：結果の確認**

Traeがコードの修正を終えたら、Android Studioに戻り、緑色のRunボタンを再度クリック（再実行）してエミュレーターを再起動します。この時点で、アプリは生まれ変わったように感じるはずです。連続してタップしてみてください - カリカリという「トクトク」音が聞こえ、「功徳+1」の浮遊テキストが飛び出してくるのが見えるはずです。これで「デモ」から「プロダクト」への重要な移行が完了しました。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 バグが発生したら？（AIとのデバッグループ）

AIが生成したコードが最初の試行で完璧であることは保証されません。それはトップエンジニアでも一度でバグのないコードを約束できないのと同じです。しかし、Vibe Codingモードでは、バグはもうあなたを阻む壁ではなく、AIとの協力の踏み台になります。

**ケース1：アプリがクラッシュする**

Runをクリックした直後にアプリがクラッシュする、または木魚をタップしても音が鳴らないと仮定します。従来なら、エラーコードを検索し、数十の技術フォーラムを閲覧し、難しい英語の投稿をたくさん読む必要がありました。Vibe Codingモードでは、一つのことだけをする必要があります - **配達人になる**ことです。

**手順：**

1. **ログを開く**：Android Studioの下部にある**Logcat**パネルを見つけます（小さな猫のアイコン）。
2. **エラーを特定する**：スクロールするログが表示され、**赤い行**が通常重要なエラーです。
3. **コピー＆ペースト**：赤い英語のエラーテキストを選択してコピーし、Traeに貼り付けます：「実行中にこのエラーが発生しました。修正をお願いします。」
4. AIはすぐに「これは`AndroidManifest.xml`で振動パーミッションが宣言されていなかったために発生しました」のように教え、修正済みのコードを提供するかもしれません。Applyをクリックして次に進むだけです。

**ケース2：アプリは動くが、体験が悪い**

アプリがクラッシュしないのに、まだ満足感がない場合があります。例えば、木魚を非常に速くタップすると、前の「+1」が完全に消えるまで新しい「+1」アニメーションが表示されないことに気付くかもしれません。これによりフィードバックが遅く感じられ、満足感が得られません。マルチスレッドやアニメーションキューを自分で学ぶ必要はありません。その不快感をAIにはっきりと説明するだけで済みます。

この「高度な指示」をTraeに送ります：

```text
現在のアニメーションロジックを変更して、「高速タップが反応しない」問題を解決してください。
現在の問題：アニメーション状態が1つしかないようで、前の「+1」が完全に消えるまで次のクリックに応答しなければなりません。
要件：
1. 単一のアニメーション状態をmutableStateListOfベースのリストに置き換える。
2. 木魚がタップされるたびに、前のアニメーションが終了したかどうかにかかわらず、すぐに新しい「+1」インスタンスをリストに追加する（固有のIDと初期位置を持つ）。
3. UIでこのリストを反復処理し、各「+1」が独立して上に浮かぶ+フェードアウトアニメーションを実行するようにする。
4. 「+1」アニメーションが完了したら、メモリリークを防ぐためにリストから自動的に削除する。
更新されたMainActivity.ktコードを直接提供してください。
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 最終結果のショーケース

前のステップで、見て聞くことができる電子木魚を完成させました。公開可能なアプリに近づけるため、最後の反復で**タッチフィードバック**と**カスタマイズ**を追加します。2つのコア機能を実装します：第一に、**振動フィードバック**により、毎回のタップでスマホのモーターから物理的な応答が得られ、没入感が大幅に向上します。第二に、**カスタムテキスト**により、ユーザーが画面上のテキストを変更できるようにします。例えば「功徳+1」を「給料+1」や「悩み-1」に変更できます。

以下の慎重に設計されたプロンプトをTraeに送ります。ダイアログロジック、状態切り替え、ハードウェアインタラクションを一度に処理します：

```text
ロール：あなたはAndroid Jetpack Composeのエキスパートです。
タスク：既存の電子木魚アプリに「カスタムテキスト」と「振動フィードバック」を追加してください。
要件：
1. ハプティックフィードバック
ユーザーが木魚をタップするたびに、音とアニメーションに加えて、スマホのハプティックフィードバックを呼び出し（LocalHapticFeedback.currentを使用）、軽い触覚応答を与える。
2. カスタムテキスト機能（UIとインタラクション）
エントリー：「功徳+1」などの上部テキストの横に小さな編集アイコンを追加（Icons.Default.Editを使用可能）。
ダイアログロジック：アイコンがタップされたら、ダイアログ（Dialog/AlertDialog）を表示。
    ダイアログのタイトル：「内容を変更」
    入力：ユーザーが蓄積したいテキストを入力できるようにする（デフォルトは「功徳」）
    値の選択：入力の下に2つのオプション（例：RadioButtonまたはトグル）を提供し、ユーザーが「+1」または「-1」を選択できるようにする
    保存ボタン：保存をクリックした後、ダイアログを閉じて新しい設定をホーム画面に適用
    データのリフレッシュ：ユーザーが内容を更新した場合、上部のカウンターを0にリセットし、ゼロから再カウント開始
3. 効果の更新
保存後、上部のカウン_Targetテキストと木魚タップ時に表示される浮遊アニメーションテキストの両方がユーザーのカスタム形式に変更される。
    浮遊テキストのサイズは上部カウン_Targetテキストのサイズを超えないこと
    例：ユーザーが「給料」と入力し「+1」を選択した場合、上部のカウン_Targetロジックは+1になり、浮遊テキストは「給料+1」になる
    ユーザーが「悩み」と入力し「-1」を選択した場合、上部のカウン_Targetロジックは-1になり、浮遊テキストは「悩み-1」になる
4. 技術要件：
新しい状態（テキストと数値）がアニメーションに正しく影響することを確認。
以前の音とアニメーションのロジックを保持したまま、完全に更新されたMainActivity.ktを直接提供。
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image31.png)

# 4 実機デバッグと改善

エミュレーターは便利ですが、実際のスマホの振動をシミュレートしたり、実際のタッチ遅延を完全に反映することはできません。最も正確な「感覚」を得るために、アプリを実際のAndroidスマホにインストールする必要があります。以下の2つの接続方法から選択できます：

1. **ワイヤレスデバッグ（Wi-Fi）**：データケーブル不要で、日常的な確認に便利です。ただし、パソコンとスマホは**同じWi-Fiネットワーク**に接続されている必要があります。
2. **USB有線デバッグ**：より安定しており、切断されにくく、ネットワークが悪い場合や初回インストールが失敗した場合に適しています。

## 4.1 ワイヤレスデバッグ

これはAndroid 11以降で最も便利な方法です。

**ステップ1：スマホの準備**

1. スマホとパソコンが**同じWi-Fi**に接続されていることを確認します。
2. **開発者向けオプション**を開き、**ワイヤレスデバッグ**を有効にします。
3. **ワイヤレスデバッグ**をタップして詳細に入り、**QRコードでデバイスをペアリング**を選択します。スマホにスキャナー画面が開きます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image32.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image33.png)

**ステップ2：パソコンでのペアリング**

1. Android Studioに戻り、上部ツールバーのデバイスセレクターをクリックします。
2. ドロップダウンから**Pair Devices Using Wi-Fi**を選択します。
3. 画面にQRコードがポップアップします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image34.png)

**ステップ3：スキャンして接続**

1. スマホでパソコンの画面のQRコードをスキャンします。
2. スマホとパソコンの両方に「ペアリング成功」と表示されます。
3. この時点で、Android Studioの上部デバイスバーにスマホのモデル（例：`Google Pixel 8`）が自動的に表示されます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image35.png)

4. ▶️ Runをクリックしてアプリを実行

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image36.png)

## 4.2 USB有線デバッグ

ワイヤレス接続が不安定な場合や、ネットワークが複雑な場合は、ケーブルを接続するのが常に最も確実な方法です。利便性は劣りますが、最速の転送速度を提供し、ほとんど切断されません。

### 4.2.1 Android StudioでのUSBドライバーの準備（Windowsのみ）

Macユーザーはこのステップをスキップできます。macOSは通常スマホを直接認識するからです。Windowsユーザーは、パソコンがAndroidスマホを認識できることを確認する必要があります。これは通常、GoogleのUSBドライバーをインストールすることを意味します：

1. Android Studioで、`Tools -> SDK Manager`をクリックします（または`Settings -> Languages & Frameworks -> Android SDK`にあります）
2. **SDK Tools**タブに切り替えます
3. **Google USB Driver**にチェックを入れ、**Apply**をクリックしてダウンロード・インストールします

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image37.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image38.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image39.png)

### 4.2.2 実機と同じSDKバージョンのダウンロード

**ステップ1：スマホのAndroidバージョンの確認**

OPPOスマホを例にします：設定 -> スマホについて -> Androidバージョンを確認します（例ではAndroid 12です）。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image40.png)

**ステップ2：Android StudioでそのAndroidプラットフォームバージョンをダウンロード**

1. Android Studioで、`Tools -> SDK Manager`をクリックします
2. デフォルトの**SDK Platforms**タブのままにします
3. Android 12.0を選択し、Applyをクリックしてダウンロードします

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image41.png)

### 4.2.3 スマホでの開発者モードの有効化

スマホの設定を開き、開発者向けオプションに入り、**USBデバッグ**をオンにします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image42.png)

### 4.2.4 スマホでのUSBドライバー認証のインストール

この時点で、スマホを手に取ってください。重要なセキュリティダイアログが表示されるはずです：「USBデバッグを許可しますか？」**常に許可**にチェックを入れ、**許可**または**OK**をタップしてください。これがパソコンにデバッグの制御を与える重要な認証です。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image43.png)

### 4.2.5 スマホでのアプリの実行

1. Android Studioの上部デバイスセレクターに、スマホのモデル（例：`OPPO-PDKM00`）が表示されるはずです
2. ▶️ Runをクリックします。スマホに「USBデバッグを許可しますか？」ダイアログが表示されます。「常に許可」にチェックを入れて確認します
3. アプリが自動的にインストールされて起動します

今、スマホで木魚をタップして、本物の振動モーターの応答を感じてみてください。これが完全なVibe Coding体験です。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image44.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image45.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image46.png)

# 5 アプリをAPKとしてパッケージング

コードは完成し、実機テストも動作しています。次に、アプリをAndroid Studioから「取り出し」、友達に送ってインストールできるファイルに変換する必要があります。このプロセスは**パッケージング**と呼ばれます。Android開発では、パッケージングには2つの全く異なるモードがあり、使用シーンに応じて選択します。

## 5.1 デバッグ版のパッケージング（迅速な共有用）

アプリを友達に素早く試してもらうためだけに共有したい場合や、テスト用スマホに送って確認したい場合は、**デバッグ版**が最速の選択肢です。これは「下書き」のようなもので、完全に機能しますが、正式に署名されていないため、アプリストアに提出できません。

**手順は非常にシンプルです：**Android Studioの上部メニューで`Build`を見つけ、`Generate App Bundles or APKs`にカーソルを合わせ、サブメニューから`Generate APKs`をクリックします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image47.png)

プロジェクトのサイズにもよりますが、約5秒待ちます。Android Studioの右下のコンソールエリアにプロンプトが表示されます。青い`locate`リンクをクリックすると、出力フォルダーが自動的に開きます。`app-debug.apk`という名前のファイルが、私たちが求めているパッケージです。

WeChatやQQ経由で任意のAndroidスマホに直接送信でき、受信者はインストールして使用できます。デバッグ版はリリース版ではないことに注意してください。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image48.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image49.png)

## 5.2 リリース版のパッケージング

アプリをアプリストア（Google PlayやHuawei AppGalleryなど）に公開したい場合や、インストール時の「安全でないアプリ」の警告を回避したい場合は、**リリース版**をパッケージングする必要があります。このバージョンは固有の**デジタル署名**を必要とし、これは偽造防止の印で、あなたがこのアプリを開発し、改ざんされていないことを証明するものです。

> 署名の核心的な目的
>
> - 発行元の身元を確認する：同じパッケージ名のアプリはインストール済みのプログラムを置き換える可能性があるため、署名は悪用を防ぎます
> - アプリの完全性を確保する：署名プロセスはパッケージ内のすべてのファイルをカバーし、事後の置き換えを防ぎます

Androidアプリの署名は印鑑を添付するようなものです。印鑑が添付されると、アプリと開発者は結びつけられます：アプリはあなたのものであり、あなたが責任を負います。他人があなたを偽装することはできず、あなたが他人を偽装することもできません。

**ステップ1：署名ウィザードの開始**

上部メニューで`Build`を選択し、`Generate Signed Bundle / APK`をクリックします。ポップアップウィンドウで2つの選択肢に直面します：

- Android App Bundle（`.aab`）：Google Playで必要。サイズは小さいが、スマホに直接インストールできない
- APK：標準インストールパッケージ。直接インストール可能
_デモンストレーションのため、まずAPKを選択してNextをクリックします。_

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**ステップ2：デジタルキー（KeyStore）の作成**

ここが初心者が最もつまずきやすい場所です。これは初めてのリリースパッケージングなので、新しい**キーストア**を作成する必要があります。`Key store path`の下の**Create new**をクリックします。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image52.png)

ポップアップで必要な情報を入力します。アカウント登録に似ています。キーストアのパスワードとキーエイリアスのパスワードは**同じ**にすることを強くお勧めし、**慎重に書き留めてください**。このパスワードを紛失すると、将来アプリを更新することが二度とできなくなります。

完了後、OKをクリックします。前の画面に戻り、入力したキー情報が自動的に入力されます。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**ステップ3：正式パッケージの生成**

Nextをクリックし、Build Variantsで**release**を選択し、最後に**Create**をクリックします。

少し待つと、Android Studioは再び右下に「Generate Signed APK」成功のプロンプトを表示します。**locate**をクリックすると、今度はフォルダーにデジタル署名された正式パッケージ（通常は`app-release.apk`という名前）が表示されます。このファイルが、開発者としてあなたが納品する最終製品です。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 アプリストア / マーケットへの公式リリース

アプリ開発が完了し、リリースパッケージの準備ができたら、次は公開してより多くの人がダウンロードして使用できるようにすることです。現在、主な配布チャネルは2つのカテゴリーに分かれます：**国内Androidアプリストア**と**海外アプリストア（Google Play）**です。

## 6.1 国内マーケットへの公開

中国本土のAndroidエコシステムは特殊です。単一の公式ストアがありません（Google Playに直接アクセスできないため）。代わりに、市場は**スマホメーカーのアプリストア**と**サードパーティプラットフォーム**に分かれています。主要な**メーカーストア**にはHuawei、Xiaomi、OPPO、vivo、Meizu、Samsungなどがあります。デバイスにプリインストールされているため、最も大きなトラフィックを持っています。主要な**サードパーティプラットフォーム**にはTencent MyAppと360 Mobile Assistantがあります。

### 6.1.1 核心的な難しさ：個人開発者にとっての「障壁」

アカウントを登録する前に、知っておくべき非常に重要なことがあります：**国内アプリマーケットは個人開発者に非常に厳しい**ということです。

現在、ほぼすべての主要国内アプリストア（Huawei、Xiaomi、OV、MyAppなど）は、提出に*ソフトウェア著作権登録証明書*を**必要**としています。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image58.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image59.png)

- **それは何ですか？** アプリがあなたのものであることを証明する法的文書です。
- **取得費用**：著作権局を通じて申請する必要があります。自分で行うと通常2〜3ヶ月かかります。代理店を使って迅速に処理すると数百元から千元以上かかる場合があります。
- **現在の現実**：この証明書がないと、アプリが審査に不合格になる可能性が非常に高く、アプリエントリーの作成すらできない場合があります。さらに、ニュース、金融、医療などのカテゴリではICP届出や他の資格も必要な場合があります。

したがって、アプリが個人の練習プロジェクトや小ツールに過ぎず、この証明書の申請に時間と費用をかけたくない場合は、セクション6.2に直接ジャンプしてGoogle Playを検討するか、APKファイルを友達と直接共有することをお勧めします。

### 6.1.2 開発者アカウントの登録

必要な資格をすでに準備しているか、国内マーケットでの公開を決定した場合、最初のステップはアカウント登録です。プロセスは主要プラットフォームで似ており、通常は個人の場合は身分証明書の確認、企業の場合は営業許可証の確認が必要です。

以下は主要アプリマーケットの開発者プラットフォームURLです：

Tencent Open Platform：https://open.tencent.com/

360 Open Platform：http://dev.360.cn

Baidu Developer Platform：http://app.baidu.com

Xiaomi Open Platform：https://dev.mi.com

Huawei Developer Alliance：http://developer.huawei.com/consumer/cn

Alibaba Developer Platform：http://open.uc.cn
Alibaba配信はWandoujia、Ali Jiuyou、PP Assistant、UC App Store、Shenma Search、YunOS App Storeを統合しています。Alibaba開発者アカウントを1つ登録するだけで済みます。

Samsung Developer Platform：http://support-cn.samsung.com/App/DeveloperChina/Home/Index

OPPO Developer Alliance：http://open.oppomobile.com

vivo Developer Alliance：https://dev.vivo.com.cn

Lenovo Open Platform：http://open.lenovo.com

Meizu Developer Alliance：http://open.flyme.cn

Gionee Developer Alliance：https://open.appgionee.com

**Tencent MyAppを例にします：**Tencent Open Platformにアクセスし、登録をクリックします。QQアカウントで直接ログインすることをお勧めします。QQアカウントが一度バインドされると解除が困難なため、専用の仕事用QQアカウントを使用するのが良いでしょう。指示に従い、「個人開発者」または「企業開発者」を選択し、身分証明書の写真をアップロードし、顔認証を完了します。認証が通ったら、**アプリを作成**をクリックして開始します。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image60.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image61.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image62.png)

### 6.1.3 提出フローと必要書類

アカウントの審査が承認されたら、アプリを作成して審査に提出できます。以下の「4点セット」を準備する必要があります：

1. **インストールパッケージ**：第5章でパッケージングした**リリースAPK**
2. **テキスト情報**：
3. **アプリ名**：機密語を含んではいけません
4. **一言紹介**：中国語20文字以内、シンプルかつ直接的（例：「リラックスできる電子木魚アプリ」）
5. **詳細説明**：中国語200文字以上で、アプリの機能と使用シーンを紹介
6. **ビジュアル素材**：
7. **アプリアイコン**：高解像度PNG、通常512x512
8. **アプリのスクリーンショット**：アプリ使用中の鮮明なスクリーンショットを4〜5枚準備。主要ページをカバーすることが望ましく、通常は1080x1920などの統一サイズ
9. **資格書類**：ソフトウェア著作権登録証明書のスキャンコピーをアップロード

**提出と審査：**すべての情報を入力しAPKをアップロードした後、**審査に提出**をクリックします。審査サイクルは通常1〜3営業日です。その期間中、メールやSMSに注意してください。審査員はスクリーンショットが不明瞭、記述が不適切、必要な資格が不足などの理由で提出を却下する場合があります。その場合は、フィードバックに従って修正し、再提出します。

## 6.2 海外マーケット（Google Play）への公開

国内アプリストアのソフトウェア著作権証明書や届出の複雑さに対処したくない場合や、ターゲット層がグローバルな場合は、Google Playが個人開発者にとって最良の選択です。

### 6.2.1 準備

- **Googleアカウント**：通常のGmailアカウントで十分です
- **$25の登録費**：これは**一度限りの終身費用**で、米ドル決済に対応したクレジットカード（Visa / Mastercard）が必要です
- **安定したネットワークアクセス**：Google Play Consoleにスムーズにアクセスできる必要があります
- **正式なインストールパッケージ**：Google Playは**.aab**（Android App Bundle）形式を必要とすることに注意してください。APKではありません。Android Studioでパッケージング時にAndroid App Bundleを選択します。手順はAPKのパッケージングとほぼ同じです。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Google Play Consoleリリースフロー（概要）

Google Playの登録と支払いにはまだいくつかの参入障壁があるため（海外クレジットカードの必要性など）、このチュートリアルでは現在、ステップバイステップのスクリーンショットを提供していません。しかし、ここに一般的な4ステップのプロセスを示します：

**ステップ1：アプリの作成とコンソールへの入力**

`Create app`をクリックし、アプリ名（`Electronic Wooden Fish`）を入力し、言語として英語を選択し、アプリタイプとしてAppとFreeを選択し、同意にチェックを入れます。その後、バックエンドにアクセスできます。

**ステップ2：ストアページの装飾**

これはユーザーの第一印象です。準備したアプリ**アイコン**（512x512）と**特集グラフィック**（1024x500）をアップロードする必要があります。英語の説明については、Traeにシンプルに頼むことができます：**「Google Playで電子木魚を公開するための英語の説明を書いてください。軽くてリラックスしたトーンで。」**AIは通常、直訳よりも自然に書きます。

**ステップ3：プライバシーとコンテンツレーティング**

- プライバシーポリシー：「App Privacy Policy Generator」を検索して無料のリンクを生成し、貼り付けます
- コンテンツレーティング：簡単なアンケートに記入します（例：暴力やギャンブルがあるかどうか）。電子木魚は通常、一般の3+レーティングを取得します。

**ステップ4：アップロードと公開**

`Production`メニューの下で、`Create new release`をクリックし、`.aab`ファイルをアップロードし、保存して審査に提出します。Google Playの審査は通常速いです（1〜3日）。承認されると、世界中でアプリがダウンロード可能になります。

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image64.png)

_開発者アカウントの登録が完了している場合は、このビデオチュートリアルで残りのプロセスをガイドできます：_ [Full workflow: uploading an Android app to Google Play](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 おわりに

これでチュートリアルは終了です。自分で作った電子木魚をスマホで見て、今どんな気持ちでしょうか。

ソフトウェアエンジニアリングの教育を受けた者として、今日の急速に発展するAI時代において、私は実際にかなり感傷的です。昔は、分厚いプログラミングの本を読み込み、複雑な文法を学び、環境設定に苦労し、赤いエラーメッセージと戦うのに半日を費やしました。しかし時代は変わり、今ではAIをどう指揮するかをますます学ぶようになっています。

このVibe Codingの実践を通じて、あなたはすでにAndroidアプリ開発の完全なプロセスを経験しました。技術的な壁は確かに低くなっています。もはや常に乾燥したコードをこねくり回す必要はなく、**何を作るか**を決定するのにより多くのエネルギーを注げるようになりました。しかし、ツールがどんなに強力でも、依然としてツールにすぎません。アプリをスマホで埃を被らせないでください。遊び続け、壊しては直すことを繰り返してください。自分自身のアイデアを持ち、それを実現し始めたとき、初めて本当のスタートラインに立ったことになります。

このチュートリアルが「アプリを作ることは実はそれほど難しくない」と感じさせたなら、新世代のクリエイターをもう一人開発の世界に導くお手伝いができたことを光栄に思います。

あなたの次の作品を楽しみにしています。頑張ってください！

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image65.png)

**_Android開発の世界で楽しんでください！_**

# 参考文献

CSDN：[How to package/build an Android Studio project (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%20%E6%89%93%E5%8C%85%20APK%20%E5%B9%B6%E5%88%86%E4%BA%AB&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN：[Android Studio installation and configuration](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)
