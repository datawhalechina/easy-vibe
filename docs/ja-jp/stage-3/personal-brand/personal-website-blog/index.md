# 個人ウェブサイトと学術ブログの作り方 - GitHub Pages による静的デプロイ

# 1. 個人ウェブサイトと学術ブログとは？

このチュートリアルでは、**既存のウェブサイトテンプレートを見つけ、それをイーロン・マスクの個人ホームページに改造し、最終的に無料でオンライン公開する**という完全なループを体験します。

このチュートリアルにあたり、最低限以下のものが必要です：

* **パソコン**（Windows または Mac）
* **GitHub アカウント**（ウェブサイトのコード保存と無料ホスティングに使用）
* **Trae**（AI プログラミングパートナー）
* **Git 環境**
* **Ruby 環境**

## 1.1 学術的個人ホームページとは？

**学術的個人ホームページ**とは、インターネット上のあなた専用の領地です。

WeChat Moments、知乎、LinkedIn とは異なり、どのプラットフォームのレコメンドアルゴリズムにも依存せず、プラットフォームが閉鎖されても消えることはありません。Google や Google Scholar にインデックスされる、長期的で安定した**個人ショーケーススペース**です。通常、略歴、出版物、プロジェクト、技術ブログが含まれます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 なぜ自分のウェブサイトを作るべきなのか？

Vibe Coding の開発モデルでは、10年前のように分厚い HTML/CSS の本と格闘する必要はもうありません。AI の力により、ウェブサイト構築の役割は「苦戦するコーダー」から「ウェブサイトの編集長」へと変わります：

1. **あなた（編集者 / PM）**：サイトのトーンとコンテンツを決定します。例：「マスクの火星植民 PPT をここに置いて」や「このボタンをテスラレッドに変更して」。
2. **Trae（AI エンジニア）**：難しい実装作業を担当します。自然言語の指示をコードに変換し、レイアウト、配色、モバイル対応も含みます。
3. **GitHub Pages（ショールーム）**：無料のサーバーとドメインを提供し、世界中の人があなたの作品を見られるようにします。

**学術界や技術者にとってなぜ価値があるのか？**

* **対外的（影響力の構築）**：これは**「永遠に色褪せない名刺」**です。博士課程への応募、就職、コラボレーションの際、きちんとした個人ホームページは PDF の履歴書よりも説得力があります。
* **対内的（知識の蓄積）**：あなたの**「セカンドブレイン」**です。講義ノート、技術的思考の記録、自分の知識体系の構築に使えます。
* **将来に向けて（発見されること）**：検索エンジンは構造化されたコンテンツを好みます。ホームページがあれば、名前が検索された際、**あなたが定義したコンテンツ**が最初に表示され、同姓の無関係な人物ではなくなります。

## 1.3 個人ウェブサイトを構築する4つの典型的な方法

実際にはウェブサイトの構築方法は無数にありますが、ここでは最も主流な4つだけを紹介します：

**方法1：HTML / CSS / JS をゼロから手書き**
これは伝統的なコンピュータサイエンスのルートです。一文字ずつコードを書きます。利点は究極の柔軟性です。欠点は参入障壁が非常に高く、CSS の調整でつまずきやすいことです。コンテンツに集中したい人には不向きです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**方法2：Wix / WordPress などのビジュアルサイトビルダー**
ブロック組み立てのようなものです。利点はドラッグ＆ドロップで簡単に編集できることです。欠点は有料であることが多く、コードが肥大化しがちで、学術的なギーク感に欠け、深いカスタマイズが難しいことです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**方法3：GitHub ベースのテンプレート（静的サイトジェネレーター）**
これは学術界やギークコミュニティで**最も推奨される**主流ルートです。Jekyll や Hugo ベースの成熟したテンプレートを直接フォークし、設定ファイルとコンテンツだけを変更します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**方法4：Vibe Coding（AI ビジュアル生成フロー）**
強力なマルチモーダル視覚理解を持つ AI エージェントを使えば、ネット上で気に入ったウェブサイトスタイルのスクリーンショットを撮り、AI に「このスタイルでウェブページを作って」と伝えるだけです。AI が視覚要素を分析し、基盤となるコードを生成してくれます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**このチュートリアルでの選択：GitHub Pages + 学術テンプレート + AI による修正**
理由は単純です：

* **ゼロコスト**：サーバーを買う必要も、ドメインを買う必要もありません。
* **高品質**：テンプレートはトップクラスの開発者が設計したものが多く、ミニマルなスタイル、プロフェッショナルな構造、高速な読み込みが特徴です。
* **保守が簡単**：主に Markdown を書くだけで、Feishu Docs や Notion で書くような感覚で、AI がウェブページを生成します。

## 1.4 このチュートリアルの全体ロードマップ

設定プロセスをより直感的で退屈しないものにするため、面白いケースを使います：**マスクの学術ホームページを作る**。

イーロン・マスクは大学教授ではありませんが、*Hyperloop Alpha* のような多くの公開「技術白書」を発表しており、SpaceX や Tesla のような有名なプロジェクトもあります。これらの資料をテストデータとして使用し、Trae の Vibe Coding ワークフローと組み合わせて、再利用可能なサイト構築ルートを歩みます：

1. **骨格を見つける**：GitHub で高品質なウェブサイトテンプレートを見つけ、自分のリポジトリにフォークする。
2. **環境の準備**：コードをローカルに pull し、Trae を設定して AI がプロジェクトを読めるようにする。
3. **AI と反復**：テンプレートのプレースホルダー人物をイーロン・マスクに置き換え、履歴書をアップロードし、「出版物リスト」を「技術白書ショーケース」に変更し、さらに AI にサイトの色を「マーズレッド」に変更させる。
4. **オンラインデプロイ**：変更したコードを GitHub に push し、即座にアクセス可能なウェブサイト URL を取得する。

このセクションは全体像を描くことだけを担当します。今はメインラインだけ覚えておいてください：
**テンプレートをフォーク -> AI で改装 -> オンラインに push**
以下のセクションで、各ステップを一緒に進めます。

# 2. 環境準備

## 2.1 このチュートリアルで使用するツール

ビルドプロセス全体で4つのツールまたはリソースを使用し、それぞれがデザイナー、請負業者、地主、物流システムの役割を果たします。

* **パソコン**：Windows でも Mac でも構いません。メモリ要件が高いことが多い Android 開発とは異なり、ウェブ開発は非常に軽量で、普通のオフィスノート PC でもスムーズに動作します。
* **Trae**：あなたの **AI プログラミングパートナー**であり、コアの生産性ツールです。Vibe Coding モードでは、HTML や CSS の構文をマスターする必要はありません。主に「ナビゲーションバーを黒に変えて」や「マスクの写真をここに置いて」のように自然言語で AI に伝え、コードの作成と修正を任せます。
* **GitHub アカウント**：あなたの**無料サーバー兼コード保管庫**です。すべてのウェブサイトファイルの保存に必要です。最も重要なのは、**GitHub Pages** を使ってコードをグローバルにアクセス可能な URL に無料で変換でき、サーバーやドメインの購入が不要になることです。
* **Git 環境**：バックステージの**配達員**です。Trae でローカルにコードを書いても、Git がコードをパソコンから GitHub に push します。Git コマンドをマスターする必要はなく、Trae が呼び出しを支援できますが、Git 自体は先にインストールしておく必要があります。
* **Ruby 環境**：ローカルの**ウェブページ工房**です。このチュートリアルの学術テンプレートは Jekyll を使用しており、Jekyll は Ruby 上で動作するため、オンラインに push する前に自分のパソコンでウェブサイトをプレビューできるよう Ruby をローカルにインストールする必要があります。

## 2.2 Trae のダウンロード

**Trae** は Vibe Coding の主戦場です。**スーパー AI を内蔵したコードエディター**と考えてください。従来の冷たいエディターとは異なり、経験豊富なプログラマーが隣に座って、いつでも助けようとしているようなものです。

* **ダウンロード先**：公式サイト [https://www.trae.cn](https://www.trae.cn) にアクセスし、お使いの OS 用のバージョンをダウンロードしてください。
* **インストール**：インストールは非常に簡単で、WeChat や QQ のインストールと同じです。インストーラーパッケージをダブルクリックし、「次へ」をクリックして完了します。

このツールの準備ができたら、次の実践的なステップでは、退屈なコードペインを見つめる必要はありません。ここでプロジェクトを直接開き、右側のチャットパネルを使って AI に自然言語で指示を出します。日本語でも構いません。コードの作成、バグの修正、さらにはページ全体のリファクタリングを支援してくれます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Git のダウンロード

**Git とは？**
Trae が Vibe Coding でコードを書く AI エンジニアだとすれば、**Git はコードを運ぶ配達員**です。パソコンで書かれたコードをパッケージ化し、GitHub というクラウドリポジトリに安全に push するために必要です。これがないと、サイトは自分のマシンでしか動かず、他の人は見られません。

昔は公式サイトに行ってインストーラーをダウンロードし、環境変数を手動で設定する必要がありました。面倒でした。今では、Trae に検出とインストールを手伝わせるだけで済みます。

**ステップ1：Git がすでにインストールされているか確認**

Trae を開き、右下のチャットパネルに以下の指示を入力してください：

```markdown
Please help me check whether Git is already installed on this computer. Please run the `git --version` command in the terminal.
```

* **ケースA（インストール済み）**：`git version 2.xx.x` のような表示があれば、おめでとうございます。インストールステップをスキップできます。
* **ケースB（未インストール）**：「command not found」や赤いエラーメッセージが表示されたら、以下に進んでください。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**ステップ2：AI 支援インストール**

Trae を閉じないでください。チャットパネルで引き続き入力します：

**指示（Windows ユーザー）：**

```markdown
I have not installed Git. Please write the command that uses the `winget` command-line tool to install Git automatically, and tell me how to run it in the terminal.
```

**指示（Mac ユーザー）：**

```markdown
I have not installed Git. Please tell me how to quickly install Git through terminal commands, for example using `git` or `brew`.
```

Trae がコマンドを提示します。通常は `winget install --id Git.Git` のようなものです。

コードブロック内の **Run in Terminal** ボタンをクリックするか、下部のターミナルにコピーして Enter を押すだけです。自動的に Git がダウンロード・インストールされます。

AI 支援プロセスがまだ完璧ではないと感じる場合は、このチュートリアルを参考に手動でダウンロードとインストールを行ってください：
[Git download and installation tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Ruby 環境のインストール

本格的にコードを書き始める前に、最後のピースがまだ必要です。このチュートリアルで使用する学術ホームページテンプレートは Jekyll で構築されており、Jekyll 自体は Ruby プログラミング言語に基づいています。

コードを GitHub に push して世界中に見せる前に、自分のパソコンで「改装効果」をプレビュー・デバッグするには、パソコンに Ruby 環境をインストールする必要があります。これは Ruby を理解する通訳をパソコンに雇うようなものです。安心してください、Ruby の書き方を学ぶ必要はありません。インストールだけでよく、残りは Trae が処理してくれます。

### 2.4.1 Windows インストール

**ステップ1：国内ミラーを使ってインストーラーをダウンロード**

Windows ユーザーの場合、公式サイト https://rubyinstaller.org/downloads/ からワンクリックインストーラーが提供されていますが、ネットワーク環境の違いを考慮し、コツを知っておくと便利です。初心者には通常 **`Ruby+Devkit 3.X.X (x64)`** が推奨されます。必要なツールチェーンが含まれているためです。

**初心者への注意**：実際には、公式サイトからの直接ダウンロードは遅かったり失敗したりすることがあります。国内ミラー [RubyInstaller for Windows - China mirror](https://rubyinstaller.cn/) の使用を強くお勧めします。通常はるかに速いです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**ステップ2：インストールの実行**

ダウンロードしたインストーラーをダブルクリックします。セットアップウィザードで、必ず **"Add Ruby executables to your PATH"** にチェックを入れてください。これが最も重要なステップです。これをしないと、パソコンがインストールしたばかりのインタープリターを「見つけられません」。

チェックを入れたら、**Next** をクリックし続けてインストールを完了します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**ステップ3：開発ツールキットの設定**

インストールの進行が終わると、黒いコマンドラインウィンドウが自動的に開きます。慌てないでください。カーソルが点滅している場所に数字の `3` を入力してください。これは MSYS2 ベース環境と MINGW ツールチェーンをインストールすることを意味します。その後 Enter を押します。コマンドの実行が終わり、ウィンドウが自動的に閉じるまで待ちます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**ステップ4：結果の確認**

さあ、AI に宿題をチェックしてもらう時間です。Trae を開き、右側のチャットに以下の自然言語指示を入力してください：

```markdown
Please help me check whether the Ruby environment has been installed correctly on this computer. Please run the `ruby -v` command in the terminal at the bottom and tell me the result.
```

Trae が `ruby 3.x.x` のように返答すれば、Windows の Ruby 環境は完全にセットアップされています。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Mac インストール

Mac 環境の設定はより「ギーク」な感じがします。通常はターミナルコマンドが必要だからです。しかし Vibe Coding モードでは、ターミナルを手動で開く必要すらありません。Trae に個人の IT オペレーターとして動いてもらいます。

**ステップ1：ワンショット環境セットアップ指示を入力**

Trae を開き、右側のチャットに以下の自然言語指示を貼り付けてください。Homebrew の確認、未インストールならインストール、その後 Ruby のインストールまでお願いします：

```markdown
I am using a Mac computer and need to configure a Ruby development environment. Please help me complete the following steps:
1. Check whether Homebrew is already installed. If not, please run Homebrew's official installation script in the terminal.
2. After confirming Homebrew is ready, run `brew install ruby` in the terminal.
3. When everything is done, run `ruby -v` to confirm the installation succeeded.
Please guide me step by step, and when necessary provide terminal commands that I can click and run directly.
```

指示を受け取ると、Trae は作業を開始し、チャットパネルに実行ボタン付きのコードブロックを表示します。

**初心者への重要な注意**

Homebrew のインストール時、ターミナルに `Password:` のようなプロンプトが表示され、Mac のログインパスワードの入力を求められることがよくあります。

**注意：** Mac のターミナルでパスワードを入力する際、画面には文字やアスタリスクが一切表示されません。これは正常です。ブラインドタッチでパスワードを入力し、Enter を押してください。

**ステップ2：結果の確認**

インストール完了後、Trae に戻って以下を入力してください：

```markdown
I just installed Ruby on this Mac through `brew`. Please help me run the `ruby -v` command in the terminal and check whether the installation and environment variables are correct.
```

ターミナルに `ruby 3.x.x` のような表示があれば、ローカルウェブページ工房の準備ができ、Mac は Vibe Coding の準備が整いました。

## 2.5 GitHub アカウントの登録

**GitHub とは？**
Git が配達員だとすれば、**GitHub はクラウド倉庫兼ショールーム**です。コードを無料でホストするだけでなく、さらに重要なのは **GitHub Pages** を使ってコードをグローバルにアクセス可能なウェブサイト URL に変換できることです。世界最大のコードホスティングプラットフォームでもあり、GitHub アカウントを持つことは技術界へのパスポートのようなものです。

**登録手順：**

1. **公式サイトにアクセス**：[https://github.com/](https://github.com/) を開きます。
2. **Sign up をクリック**：右上の **"Sign up"** をクリックします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **情報を入力**
4. **メールアドレス**：実際のメールアドレスを入力します。
5. **パスワード**：強力なパスワードを選んでください。
6. **ユーザー名（重要！）**：**慎重に選んでください**。後であなたのホームページ URL は **`https://your-username.github.io`** になります。英語名、ピンイン、使い慣れた ID、またはシンプルな文字と数字の組み合わせを使用するのが最善です。`a1b2c3d4` のようなものは**選ばないでください**。さもないとウェブサイトリンクが覚えにくくなります。
7. **確認とアクティベーション**：人間確認（画像の回転や渦巻き銀河の選択など）を完了し、メールで確認コードを確認します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

登録が完了すれば、インターネット上に自分の土地を手に入れました。次のセクションで、その土地に建て始めましょう。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. テンプレートから最初のアクセス可能ページまで

すべて準備が整いました。最初の2章でツールを準備しました。この章では、インターネット上に正式に土地を確保します。この章のタスクはシンプルです：
**装飾やコンテンツはまだ気にしないでください。まずサイトの骨格を構築し、ライブアクセスリンクを取得しましょう。**

成熟した学術テンプレートを直接フォークし、GitHub Pages の自動化を使って20分以内に動かします。完了すれば、グローバルにアクセス可能なリンクが手に入ります。

## 3.1 ウェブサイトテンプレートの取得

Vibe Coding モードでは、HTML をゼロから書く必要はありません。GitHub には数千の優れたオープンソーステンプレートがあります。「借りて」名前を自分のものに変えるだけでいいのです。

**ステップ1：テンプレートを見つける**

ここでは、構造が明確で学術的展示への適合性が高いクラシックなテンプレートを選びました：
https://github.com/luost26/academic-homepage?tab=readme-ov-file
このテンプレートは Jekyll フレームワークに基づいています。

もちろん、GitHub で **`academic-homepage`** を検索し、別のスタイルを選ぶこともできますが、このチュートリアルに従うなら、まず上記のテンプレートを使用することをお勧めします。

いくつかの追加テンプレート推奨も用意しました：

* Minimal Light personal homepage theme: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**ステップ2：プロジェクトをフォーク**

対象リポジトリのホームページにアクセスし、右上の **Fork** ボタンをクリックします。確認ボックスが表示されたら、**Create Fork** を直接クリックします。

* 説明：このステップは、他人のコードリポジトリをフルセットの鍵付きで自分の GitHub アカウントにコピーするようなものです。これで、サイトの自分用コピーを所有することになります。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**ステップ3：リポジトリ名の変更、最も重要なステップ**

リポジトリ名を以下に変更してください：
`your-username.github.io`

**初心者への重要な注意**：
これは GitHub Pages の厳格なルールです。
例えば、GitHub のユーザー名が `musk-fan` の場合、リポジトリ名は**必ず** `musk-fan.github.io` でなければなりません。
そうしないと、GitHub は無料ドメインを割り当ててくれません。名前が間違っていると、後でウェブページが開きません。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 GitHub プロジェクト URL の取得

名前を変更した後、リポジトリの引取伝票が必要です。

1. リポジトリのホームページに戻り、**Code** タブの下に移動します。
2. 緑色の **Code** ボタンをクリックします。
3. **HTTPS** タブが選択されていることを確認します。
4. コピーボタンをクリックし、`.git` で終わる URL（例：`https://github.com/musk-fan/musk-fan.github.io.git`）をコピーします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 プロジェクトをローカルに pull

昔は、プログラマーが黒いターミナルで複雑な Git コマンドを入力してコードをダウンロードしていました。Vibe Coding の時代には Trae があります。「これが欲しい、引っ張ってきて」と AI に伝えるだけでいいのです。

**ステップ1：準備**

パソコンに新しいフォルダーを作成します（例：`MyWebsite`）。右クリックして **Open with Trae** を選択するか、先に Trae を開いて **Open Folder** を選択します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**ステップ2：clone コマンドを入力**

Trae が開いたら、右側の AI チャットパネルを開き、以下の自然言語指示を入力します：

```text
Please help me clone the remote GitHub repository into the current folder.
Repository address: paste the URL you just copied, for example https://github.com/musk-fan/musk-fan.github.io.git
Execution requirement: please run the `git clone` command directly in the terminal.
```

**ステップ3：ダウンロードの確認**

Trae が下部のターミナルを自動的に呼び出し、コマンドを実行します。数秒待ちます。左側のファイルツリーに `_config.yml` や `index.html` などのファイルが表示されたら、プロジェクトは正常にパソコンに移動されています。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 ウェブページのローカルプレビュー

コードがマシンにあり、Ruby 環境の準備もできています。サイトを修正する前に、まず自分のパソコンでローカルに検査する必要があります。これは家の改装のようなものです。まずショールームですべてを配置し、正しく見えることを確認してから、公開するのです。

**セクション2.4** でインストールした Ruby 環境のおかげで、これは非常にシンプルです。

**ステップ1：依存関係のインストール**

Jekyll サイトの実行には多くの Gems への依存があります。これは買い物リストからすべての家具を買うようなものです。**しかし**、ネットワーク環境のせいで直接ダウンロードが止まることがあります。Trae に**国内ミラーに切り替えて**依存関係をインストールするようお願いします。

Trae のチャットボックスに以下を入力します：

```markdown
I need to install the Jekyll dependencies. Considering the network environment, please first change the `source` in the Gemfile to the domestic mirror `https://gems.ruby-china.com/`. After that, please run the `bundle install` command in the terminal to install all dependencies.
```

**ステップ2：ローカルサービスの起動**

次に**ローカルサーバー**を起動して、ウェブサイトの実行をシミュレートします。続けて Trae に伝えます：

```markdown
The dependencies have finished installing. Please help me start the Jekyll local preview service in the terminal. Please run the `bundle exec jekyll serve` command.
```

ターミナルが数秒実行すると、以下のような表示が見られます：
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **ブラウザを開く**：そのリンクをクリックするか、ブラウザに直接入力します：
   `http://127.0.0.1:4000/academic-homepage/`
2. **魔法を見る**：あなたのサイトはすでにブラウザで動いています。まだ元のテンプレート作者の名前が表示されていますが、すでにあなたのパソコンでローカルに動いています。

これ以降、コンテンツを変更して `Ctrl+S` を押し、ブラウザを更新するたびに、**ウェブページの内容がそれに合わせて変わります**。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

ローカルプレビューが動作したら、次の章に進み、ウェブサイトをイーロン・マスクの形に作り変え始めることができます。

# 4. AI 支援によるコンテンツ修正

皆さんがすぐに全体プロセスを体験できるよう、プライバシーの不安を避けるため、自分の個人情報は使いません。代わりに**イーロン・マスクを例に**、彼の学術ホームページを構築します。これにより、個人の履歴書を書く退屈なプレッシャーから解放され、ウェブサイトの Vibe Coding の楽しさに集中できます。また、*Hyperloop Alpha* のようなシリコンバレーの鉄人の「技術白書」を学術スタイルのウェブサイトに配置することがどれほどクールかを体験できます。

**テンプレートの取得**から**サイトの公開**までの完全なループを経験し、世界クラスの個人ショーケーススペースを手作りします。

私のペースについてきて、最初の指示を AI に送ってください。

## 4.1 統一されたグローバル制約

これは**グローバルセットアッププロンプト**です。一度だけ送信すればよいです。
その目的は、AI が即興でサイト構造を壊すのを防ぐためのルールを設定することです。そのまま Trae にコピーしてください：

```text
You are now the maintainer of a "GitHub Pages + Jekyll academic homepage template" site.
The current repository is a Jekyll-powered academic homepage (including `_config.yml`, `_data`, `_layouts`, etc.).
Your modifications must follow these principles:
1. Each step should only solve the current stage goal. Do not do later-stage content in advance.
2. Do not modify the site structure, do not introduce new plugins, and do not change the theme style.
3. All content must be renderable by Jekyll without errors.
4. All identity information must follow an "academic-style simulation" tone and must not use first-person voice.
5. Do not invent obviously fake IEEE / Nature papers.
6. If information is uncertain, use "publicly well-known facts" or "reasonable academic simulation labeling."
```

## 4.2 マスクのホームページを構築、コンテンツ部分

### 4.2.1 最初のグローバル指示：アイデンティティの置き換え

最初に解決すべきは「私は誰か？」です。テンプレートには元の作者の情報が埋め込まれており、AI で一気に置き換える必要があります。

**ステップ1：アセットの準備**

提供した画像アセット `University_of_Pennsylvania.jpg` と `Queen_University.jpg` を対応するプロジェクトフォルダー（通常は `/assets/images/badges/`）に配置してください。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**ステップ2：指示を送信**

Trae の右側のチャットボックスに、以下のプロンプトを入力します。手動で行を探して編集する必要はないことに注意してください。AI に望むものを伝えるだけです：

```text
1. Goal: replace the "person identity" of the current academic homepage with Elon Musk. Only modify the basic profile information.
2. Specific requirements:
1. Name: Elon Musk
2. Professional identity:
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3. Education:
    Queen's University (Physics and Economics, not completed) (image path: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physics, B.A. in Economics) (image path: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Research Interests (can be simulated as):
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5. Honors & Recognition:
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6. Constraints:
    Do not add papers / publications
    Do not invent IEEE, Nature, or Science papers
    Use academic-style wording and avoid commercial promotional tone
    Keep the original field structure unchanged and only replace the content
```

この時点で、Trae がすべての修正要件を完了したことが確認できます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**ステップ3：ローカルブラウザの更新**

ローカルブラウザを更新すると、すべてが正しく置き換えられているのが確認できるはずです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 反復的改善：「論文」とプロジェクトの追加

イーロン・マスクは伝統的な大学教授ではないため、*Nature* や *Science* に論文を発表することはほとんどありません。しかし「チーフエンジニア」として、多くの高度に技術的な**白書**と**マスタープラン**を発表しています。

学術ホームページの文脈では、「Publications」の意味を**「技術白書＆ビジョナリープラン」**として再定義できます。これは決って不自然ではありません。実際、彼のビルダーとしてのアイデンティティに非常によく合っています。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**ステップ1：アセットの準備**

提供した表紙画像 `Hyperloop_Alpha_sketch.jpg`、`SpaceX_Starship.jpg`、`Neuralink_sewing_machine_robot.jpg` をダウンロードし、`/assets/images/covers/` に配置して、そのフォルダーに元々あったサンプル画像を削除してください。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**ステップ2：指示を送信**

以下のプロンプトを Trae に送信し、データ構造の再構築を支援してもらいます：

```text
1. Role setting: you are a static site development expert who is proficient in Jekyll and Liquid syntax.
2. Task goal:
Modify the section title on the homepage or in the navigation bar.
The current file structure is organized by year subfolders, for example `_publications/2023/xxx.md`.
Create three new Markdown files in the specified format to display Elon Musk's technical white papers and visionary plans.
3. Specific steps and requirements:
1. Modify the section title
    Please search globally for the string "Selected Publications" (it may appear in `index.html`, `_config.yml`, or `_pages/publications.md`).
    Replace it with: "Technical White Papers & Visionary Plans".
2. Rebuild the publication data (critical step)
    Clear all old content under the `_publications` folder, including old year folders such as 2023 and 2024.
    Create three new folders: `_publications/2013/`, `_publications/2017/`, and `_publications/2019/`.
    In those folders, create the following three Markdown files.
3. Strictly follow this file format
Important: you must strictly follow the YAML Front Matter format below, and must not invent new field names:
    - title:          "paper title"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "venue / journal name"
    - pub_date:       "year"
    - abstract: >-    abstract content...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Author1- Author2
    - links:Paper:    https://paper-link
4. Please generate the full code for the following three files (including the path descriptions):
(1) Path: `_publications/2013/2013-hyperloop.md`
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Path: `_publications/2017/2017-mars.md`
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Path: `_publications/2019/2019-neuralink.md`
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Execution requirement:
Please directly provide the complete content of these three files, and also provide the modification code for the file where you changed the title.
```

**ステップ3：ローカルブラウザの更新**

ビルドが完了すると、元の退屈な出版物リストが未来的なブラックテクノロジーのショーケースに変わったことがわかります。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 最終仕上げ：ソーシャルリンクとアバター

これは90点から100点に到達するための重要なステップです。サイドバーにはまだテンプレートの元の GitHub リンクや間違ったメールが含まれているかもしれません。マスクの実際のソーシャルアカウント（主に X.com）に向ける必要があります。

**ステップ1：準備**

Google でマスクの格好良い写真を検索し、`portrait.png` として保存するか、Trae の `images/photo` フォルダーにドラッグして元の画像を置き換えます。

**ステップ2：以下のプロンプトを Trae にコピー**

```text
1. Role setting: you are a detail-oriented Jekyll website development expert.
2. Task goal: complete the final update of the website sidebar and personal information configuration. We need to update the author's avatar, intro, and social links to Elon Musk's real information.
Please first scan the project structure and find the configuration file that controls the author information.
3. Please make the following modifications:
1. Avatar path fix
    I have already uploaded a new image named `portrait.png` into the `images/` or `assets/images/` folder.
    Please modify the avatar path in the configuration file to point to this image, and ensure the relative path is correct, for example `/images/portrait.png`.
2. Social link cleanup
    Please update or remove the social icon links in the sidebar:
    Email: change it to `elon@spacex.com`, or if the field allows, comment it out or remove it to avoid harassment.
    Twitter / X: change it to `https://x.com/elonmusk` (this is the core link).
    GitHub: change it to `https://github.com/tesla` to point to the Tesla open-source repository, or remove it directly.
    Google Scholar: must be removed, because he does not maintain it.
    LinkedIn / ResearchGate: if they exist, remove them all.
Output requirement:
Please directly provide the complete modified configuration code snippet.
```

**ステップ3：ローカルブラウザの更新**

1. サイドバーを見てください。あのハンサムな写真が使われていますか？ Twitter アイコンをクリックすると X.com に移動しますか？

この時点で、ローカルには完全でプロフェッショナル、そしてマスクのスタイルが強く感じられる学術的個人ホームページが完成しています。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 UI カスタマイズで魂を注入、スタイル部分

現在、コンテンツは正しくなりましたが、ページはまだ印刷された履歴書のように見えます。テクノロジー感が不足しています。Vibe Coding モードでは、CSS を理解する必要はありません。AI に望む**感覚**を説明するだけでいいのです。

**シナリオ例**：
グレーの背景が退屈すぎると感じ、「マーズレッド」に変更したい場合、Trae にこう聞くだけです：
*「サイドバーの背景色をダークレッド（#8B0000）に変更して、火星の感じを表現したい。どの CSS または SCSS ファイルを修正すればいい？ コードを直接教えて。」*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

上の例の画像のような **SpaceX Dashboard** スタイルが気に入った場合、以下のデザイナーレベルのプロンプトを直接コピーできます：

```text
1. Role setting: you are a top UI designer who admires "Swiss internationalist style" and is good at interfaces like Notion, Linear, or Apple.
2. Task goal: please completely rewrite the CSS / SCSS to create a "SpaceX Dashboard" style minimalist academic homepage. The core keywords are: transparent, restrained, precise.
3. Please apply the following concrete style overrides:
1. Global typography
    Font: abandon the original serif font. Force the whole site to use the system-level sans-serif stack:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Line height: increase breathing room in the body text with `line-height: 1.75`.
    Colors:
        Main title: #111111
        Body text: #333333
        Secondary information such as dates or citations: #666666
2. Clean header
    Background: remove the previous black background and use pure white (#FFFFFF), or translucent white with blur if supported, for example `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Border: keep only a very thin bottom border, `border-bottom: 1px solid #EAEAEA`.
    Text: navigation links should use dark gray #333333, and only become black and bold on hover.
3. Remove cards and return to content
    Remove the background and shadow of the left sidebar and the About me cards (`box-shadow: none`, `background: transparent`).
    Great minimalism lets the text float directly on the page background.
    Increase spacing: significantly increase `margin-bottom`, for example 80px, between sections and use whitespace instead of borders to separate content.
4. Restrained use of brand color
    Use Tesla Red (#E82127) only on links and important buttons.
    Link style: remove underline and only change color. On hover, add a light red background block such as `background: rgba(232, 33, 39, 0.05)`.
5. Avatar tuning
    Keep it circular with `border-radius: 50%`.
    Remove the border.
    Keep only a very light shadow, such as `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Execution requirement:
Please analyze the `_sass` or CSS files. Do not patch the old code. Instead, directly provide the code that resets and overrides the styles above.
```

## 4.4 自分の情報に置き換える、カスタマイズ部分

おめでとうございます。上記のマスクホームページのフローを経て、あなたはすでにサイト構築における Vibe Coding のコアマインドセットをマスターしました。このモデルルームを自分の家に変えるのは、実はとても簡単です。

一からやり直す必要はありません。上記のステップを繰り返すだけで、少し戦略を柔軟にするだけです：

**ステップ1：物理的置き換え、アバターと基本情報**

これは最も簡単なステップです：

1. **写真の変更**：Trae の左側のファイルパネルで `assets/images/` を見つけ、自分の顔写真をドラッグして `portrait.png` を置き換えます。
2. **名前の変更**：Trae に「サイト全体のすべての Elon Musk を[あなたの名前]に置き換えて」と伝えます。

**ステップ2：AI による前処理、ChatGPT / Gemini にコンテンツの整理を手伝ってもらう**

Trae はコードを書くのが得意ですが、乱雑な PDF 履歴書を直接投げると混乱するかもしれません。

**より効率的なアプローチは**：
まず、長文テキストの処理が得意な AI（ChatGPT、Gemini、Kimi など）を使って、履歴書を**きれいにフォーマット**してもらうことです。

ChatGPT に次のようなプロンプトを送れます：

```text
Role setting: you are a professional academic website content planner.
Task goal:
I will send you my personal resume / CV. Please help me extract key information from it and organize it into a clear Markdown structure suitable for filling directly into a static website.
Please strictly organize and refine it into the following five modules. If some content does not exist, leave it blank.
1. Profile
Name: my full name.
Tagline: a one-line professional tag, for example "CS Student @ XX Univ | AI Enthusiast".
Bio: a 50 to 100 word third-person introduction summarizing my background and core skills, in a professional academic tone.
Socials: extract email, GitHub, LinkedIn, blog links, and so on.
2. Education
Please list: school name, degree such as B.S. in CS, and time range.
Optional: if GPA or core courses are available, add them on a separate line.
3. Selected Projects — important
Please extract 2 to 3 strongest projects, and for each include:
Title: project name.
Tech Stack: technologies used, such as Python, React, PyTorch.
TL;DR: a one-line summary of what the project does.
Description: 2 to 3 core contributions, refined using STAR style.
Image Placeholder: reserve an image filename such as `project_name.jpg`.
4. Publications / Articles
If there are papers or technical articles, please extract:
Title
Venue
Date, year is enough
Abstract, one-sentence summary
5. Skills
Please organize them into categories: programming languages, frameworks / tools, and other skills.
Output requirement:
Do not explain the process. Directly output the cleaned Markdown content.
```

このきれいになったテキストを手に入れたら、Trae に入力するだけで、精度が劇的に向上します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**ステップ3：コアコンテンツの置き換え、2つのルートが可能**

このステップでは、好みに応じて2つの異なる Vibe Coding モードを選択できます：

1. **モードA：AI にナビゲートさせ、手動で編集**

どこがすべて変更されたのか正確に知りたい場合は、Trae に聞けます：

```markdown
I want to modify the "Education" section. Please tell me where the corresponding file path is and which lines contain the code.
```

Trae はチャットで次のように教えてくれます：
「修正が必要なファイルは `_pages/about.md` で、該当コードは XX 行目付近です...」

その後、左側のファイルツリーからそのファイルを自分で開き、ChatGPT から出力されたきれいなコンテンツを構造化された編集演習のように入力できます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **モードB：完全お任せ自動化**

ファイルを探すのが面倒だと思うなら、きれいになった情報を直接 Trae に貼り付けます：

```markdown
Here is the cleaned content for my "Education" and "Project Experience" sections (paste the Markdown content).
Please directly replace the corresponding content in the current site and preserve the existing layout format.
```

# 5. オンラインデプロイ

## 5.1 GitHub Pages へのデプロイ

**ステップ1：GitHub Actions の有効化、クラウドビルド**

ブラウザで GitHub に戻ります：

1. リポジトリ上部の **Settings** をクリックします。
2. 左サイドバーで **Pages** をクリックします。
3. **Build and deployment** の下で、**Source** を `Deploy from a branch` から **`GitHub Actions`** に変更します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**ステップ2：Jekyll ワークフローの自動設定**

切り替え後、ページのレイアウトが変わります。GitHub がこれが Jekyll プロジェクトであることを自動的に認識します。

1. **Jekyll (By GitHub Actions)** カードを見つけます。
2. そのカードの **Configure** をクリックします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**ステップ3：設定ファイルのコミット**

クリックすると、コードがたくさん書かれたページに移動します。これは Jekyll サイトをビルドするために GitHub が既に書いた `.yml` 設定ファイルです。

1. **コードは一切変更しないでください**。
2. 右上の緑色の **Commit changes...** ボタンをクリックします。
3. ポップアップ確認ボックスで、もう一度 **Commit changes** をクリックします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**ステップ4：待機と確認**

コミット後、GitHub のサーバーが自動的に動き始めます。

1. 上部メニューの **Actions** タブをクリックします。
2. `Deploy Jekyll site to Pages` という名前のタスクが回っているのが見えます。
3. 黄色い丸が**緑のチェックマーク**になるまで1〜2分待ちます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**ステップ5：ウェブサイトにアクセス**

丸が緑になったら、次のようなアドレスでテンプレートのデフォルトバージョンにアクセスできます：
**`https://your-username.github.io/`**

おめでとうございます。グローバルにアクセス可能な学術的個人ホームページのデプロイに成功しました。

## 5.2 変更をコミットしてホームページを更新

次に、以前に行ったすべてのローカル修正を GitHub に push し、このマスク風の個人ホームページを世界中に見てもらいましょう。

1. 左側の **Source Control** をクリックします。
2. すべての**変更**を**staged changes** に追加します。
3. Trae にコミットメッセージを生成させ、**Commit** をクリックします。
4. **Sync Changes** または **Push** をクリックして `main` ブランチに push します。
5. **Actions** タブの下のすべてのプロセスが完了するまで少し待ちます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

これで、おめでとうございます。**`https://your-username.github.io/`** を開くと、完全でプロフェッショナル、そしてマスクの風味が強い学術ホームページが完成しています。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. 応用編：ゼロから手作りする個人ホームページ

学術テンプレートが堅苦しすぎると思う方、または *The Matrix* のようなクールなワンページウェブサイトを作りたい方は、**DIY セクション**へようこそ。

ここでは、他人のコードをフォークしません。Trae を使い、空のフォルダーから始めて、一つの指示で完全なウェブサイトを生成し、それをオンラインにデプロイします。

## 6.1 なぜ手作りするのか

* **絶対的自由**：テンプレートの制約がありません。ナビゲーションバーを右にしたい、背景に花火を入れたいなら、AI に伝えるだけです。
* **ミニマリズム**：テンプレートは数百のファイルを含むことが多いですが、手作りウェブサイトは `index.html` 一つだけで済むかもしれません。
* **技術的制御**：ウェブページが実際にどう動いているかを理解する最良の方法です。

ここではクラシックな**ピュア HTML フロー**をデモします：
コンパイル不要で、GitHub Pages がネイティブにサポートしており、個人のランディングページを作るのに理想的です。

## 6.2 実践例：AI に「火星指令センター」ホームページを書いてもらう

今回は学術ルートではありません。マスクが自身の火星計画を提示するための、極めてミニマルで未来的な個人ホームページを作りたいと仮定しましょう。

**ステップ1：空のプロジェクトを作成**

パソコンに新しいフォルダーを作成し、Trae で開きます。この時点で、左側のファイルツリーは完全に空です。

*(ヒント：マスクの写真を事前に準備して `portrait.png` と名付けておくことができます。)*

**ステップ2：フレームワークの構築**

Trae のチャットパネルに以下のプロンプトを入力します。初心者が管理しやすいよう、AI にすべてのコードを一つのファイルに書くよう要求していることに注意してください：

```text
I want to build a minimalist personal homepage for Elon Musk from scratch, without any complex framework, using only HTML + CSS + JS.
Design style: SpaceX dashboard style.
    Background: use deep space black (#000000), with starlight animation.
    Main accent color: use "Mars red" (#E82127).
    Font: use a monospace font stack to imitate the feel of a code terminal.
Page content:
    Place Elon Musk's avatar in the center, circular, with a rotating border. The image path is `portrait.png`.
    Name: Elon Musk (Technoking of Tesla)
    Intro: "Occupying Mars... 99% Loading."
    At the bottom, put three glowing buttons linking to X (Twitter), SpaceX, and Tesla.
Technical requirement:
Please put all CSS styles and HTML structure inside a single `index.html` file.
Please generate the full code directly.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**ステップ3：生成とプレビュー**

前のステップで、Trae が `index.html` ファイルを生成してくれました。では、現在の効果を確認するにはどうすればいいのでしょうか？

チャットで Trae に伝えます：

```markdown
Please help me start a local service to preview this webpage.
```

`http://localhost:8000` のようなリンクが表示されます。ブラウザにコピーして開くと、背景に星が瞬いている、クールな「マーズホームページ」が見られます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

しかし、現在のページは非常にクールなランディングページに過ぎないことに気づくでしょう。完全な個人ホームページとして見ると、情報が少なすぎ、学術ホームページに期待される深みが不足しています。そこで、このビジュアルフレームワークに基づいて、イーロン・マスクの学術スタイル情報をさらに追加していきます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**ステップ4：情報のさらなる充実**

Trae に現在の火星スタイルを維持しつつ、ページをより学術テンプレートに近いものに再構築してほしいと伝えます。既存の要素を左に移動し、右側にプロフィールテキストと白書のための新しいコンテンツエリアを作成し、新しく追加されるすべてのコンテンツを同じ黒と赤のサイバーパンクスタイルに保つよう明確に指示する必要があります。

以下のプロンプトをコピーして Trae に送ってください：

```text
Core principle:
You must strictly preserve the current "SpaceX / Mars" design style, including pure black background, starlight decorations, red neon accent color, and monospace code-style font. Do not use the white background from the reference image.

Specific modification steps:
1. Create a two-column layout
Split the page into left and right columns. The left sidebar should take about 30% to 35% width, and the right content area should take about 65% to 70%.

2. Left sidebar - move the existing information
Move all current elements from the original hero screen into the fixed left sidebar:
    - Avatar: keep Elon Musk's circular avatar.
    - Name and title: keep the red neon text "ELON MUSK" and "Technoking of Tesla".
    - Loading bar: keep "Occupying Mars... 99% Loading" as the personal signature.
    - Social buttons: move the three red buttons, X, SPACE X, and TESLA, to the bottom of the left sidebar.

3. Right content area - add detailed information
Add detailed personal introduction and achievements in the right area. All new body text should use white or light gray, while titles should use red neon emphasis. Please create the following sections:
- About Me:
    Write a short introduction, for example: "Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas:
    List Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers:
    This is the key section. Refer to the list style in the example image, but convert it into a black-background style.
    Create a list displaying his important technical plans, using red borders or glow effects to distinguish each item.
    Item 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    Item 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    Item 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements:
    Briefly list milestones such as:
    First private liquid-propellant rocket to reach orbit (Falcon 1)
    First reusable orbital class rocket (Falcon 9)

4. Style detail requirements
All section titles on the right, such as "About Me," should use the same red glowing style as the "ELON MUSK" text on the left.
Make sure the whole page remains responsive and preserves a good two-column layout on different screen sizes.
```

その後ブラウザを更新すると、サイバーパンク学術ページの完成です。もちろん、自分の好みに合わせて改善を続けることもできます。前のステップと同様、Trae に目標を明確に伝えるだけで、面倒なコーディングプロセスを処理してくれます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 手作りサイトのデプロイ方法

以前フォークしたテンプレート（他人のリポジトリ由来）とは異なり、このプロジェクトは新規作成されたもので、対応する GitHub 上の場所がまだありません。そのため手動でバインドする必要があります。

**ステップ1：GitHub に新しいリポジトリを作成**

1. ブラウザで GitHub にログインします。
2. 右上の **+** アイコンをクリックし、**New repository** を選択します。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **リポジトリ名**：`mars-profile` または他のお好きな名前を入力します。

**注意**：
すでに **`your-username.github.io`** を使用している場合、ここでその名前を再利用することはできません。別の名前を選ぶと、GitHub は **`your-username.github.io/mars-link`** のような URL を生成します。

4. **Public / Private**：**Public** を選択します。
5. **"Add a README file" にはチェックを入れないでください！**
   他のオプションはデフォルトのままにします。
6. **Create repository** をクリックします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**ステップ2：ローカルコードをクラウドに push**

作成後、GitHub はコードのような内容がたくさん書かれたページに移動します。心配しないでください。そのページに表示されているリポジトリリンクをコピーするだけです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Trae に戻り、チャットに入力します：

```markdown
I have created an empty repository on GitHub. The address is: https://github.com/your-username/mars-link.git (please replace this with the actual repository address you just created).
Now please help me initialize the current local project as a Git repository and push the code to the `main` branch of this remote address.
```

Trae は通常、以下の標準的なシーケンスの実行を支援し、クリックして実行するだけです：

1. `git init`
2. `git add .` および `git commit -m "First commit"`
3. `git branch -M main` および `git remote add origin [あなたのアドレス]`
4. `git push -u origin main`

Trae が push を完了したら、GitHub に戻ってページを更新します。**Code** タブをクリックすると、Trae で書かれたコードが正常にリポジトリに push されているのが確認できます。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**ステップ3：GitHub Pages の有効化**

コードが push された後、ウェブページは自動的には表示されません。手動でスイッチをオンにする必要があります：

1. GitHub リポジトリページに戻り、上部の **Settings** をクリックします。
2. 左サイドバーの **Pages** をクリックします。
3. **Build and deployment** の下で：
   1. **Source** を `Deploy from a branch` に設定します。
   2. **Branch** を `main` に設定し、フォルダーとして `/(root)` を選択します。
4. **Save** をクリックします。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Save をクリックしても、ウェブページはすぐには表示されません。GitHub のバックエンドは小さなロボット工場のように動作します。コードのパッケージング、ビルド、グローバルサーバーへの公開に約 **1〜2分** かかります。

辛抱強く待ってページを更新してください。大きな **GitHub Pages** 見出しの下に、次のような URL の行が見えます：
**"Your site is live at `https://your-username.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

クリックすれば、火星指令センターがオンラインです。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. おわりに

チュートリアルは終わりです。ブラウザのアドレスバーで光る `.github.io` を見て、インターネットに旗を立てたような気分になっていませんか？

このチュートリアルでは、イーロン・マスクのペルソナを借りて、Lego プロジェクトのようにかなり印象的なウェブサイトを構築しました。しかし、これはほんの始まりにすぎません。Vibe Coding の最も魅力的な部分は、どれだけのタイピング時間を節約できるかではありません。それは**「アイデア」と「現実」の間の壁を完全に打ち砕く**ことです。

以前なら、**CSS が書けない**という理由でプロジェクトの展示を諦めたかもしれません。
今や、残された唯一の限界はあなたの**想像力**と**センス**だけです。

**このサイトを「マスク風のクローン」のままにしないでください。**
練習に使った Tesla へのリンクも、火星植民の白書も、最終的には他人の物語です。あなたのホームページは、デジタル世界におけるあなた自身の名刺であるべきです。

最初の本当のプロジェクト体験をそこに載せに行きましょう。
技術トピックについてのあなただけのユニークな思考を発表しましょう。
お気に入りの本のリストや自分の写真を載せることすらできます。
WeChat Moments で埋もれてしまう思考も、ここに永遠に残せます。
履歴書に収まらない情熱も、ここで自由に広がれます。

この土地を空のままにしないでください。
実験に行きましょう。壊してみましょう。作り直しましょう。
一番好きな形になるまで、それを続けてください。

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***さあ進もう、そして世界に自分を見せてください。***

# 参考文献

CSDN: [2025 latest nanny-level tutorial: step by step on using GitHub to build a personal homepage](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Git download and installation tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Ruby installation tutorial under Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
