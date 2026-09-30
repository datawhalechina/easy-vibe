# GitとGitHubワークフロー

前のコースでは、Webベースのvibe codingツールを使ってコードを書く方法を学びました。毎回の対話で新しいバージョンのコードが作成されます。しかし、一つ考えてみましょう：以前の修正に戻りたい場合、便利な方法はあるでしょうか？異なる段階のコードを記録し、いつでも異なるバージョン間で切り替えや修正ができるツールはあるでしょうか？

このニーズを満たすために、バージョン管理ソフトウェアが誕生しました。本記事では、最も有名なバージョン管理プログラム——Git——と、最も優れたコードホスティングプラットフォーム——GitHub——を紹介します。Gitを使ったコード管理、GitHubから他人のコードの取得、自分のコードのアップロード、そして他の人との協業による大規模プロジェクトの進め方を学びます。

個人プロジェクトのバージョン追跡、チーム協業でのコード同期、オープンソースコミュニティへの貢献のいずれにおいても、GitとGitHubはモダンな開発者にとって必須のツールです。これらをマスターすることで、コードをより効率的に管理し、必要に応じてチェックポイントを作成し、コードの異なる段階間を自由に切り替え、単一ファイルの変更から大規模プロジェクトの開発まで、すべてを簡単に処理できるようになります——コードの毎回のイテレーションを管理可能かつトレース可能にします。

> 💡 **前提知識**
>
> Gitを学ぶ前に、以下の概念を先に理解しておくことをお勧めします：
> - [ターミナル/コマンドラインとは](/ja-jp/appendix/2-development-tools/command-line-shell) - コマンドラインを使ったコンピュータとのやり取りを学ぶ
> - [Gitとは](/ja-jp/appendix/2-development-tools/git-version-control) - Gitバージョン管理システムの核心概念を理解
>
> 本記事ではGitHubワークフローと実際の操作に焦点を当て、上記の基礎知識については付録のリンクを参照してください。

# Gitクイックスタート

Gitを使い始める前に、付録の[コマンドライン](/ja-jp/appendix/2-development-tools/command-line-shell)と[Git基礎](/ja-jp/appendix/2-development-tools/git-version-control)の内容をすでに読んでいることを確認してください。本記事はこれらの基礎知識があることを前提に、Gitのインストール・設定とGitHubを使った協業の方法を直接説明します。

## Gitのインストール方法

異なるコンピュータのオペレーティングシステムにGitをインストールする3つの方法をデモします。自分のシステムバージョンに応じて手順に従ってください：

### Windows

1. [Git公式ダウンロードページ](https://git-scm.com/download/win)にアクセスし、自分のシステムに合ったインストーラーをダウンロード：[インストーラー](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe)。デフォルトではx64インストーラーの使用を推奨。
2. インストーラーをダブルクリックし、インストールウィザードの指示に従う：
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. デフォルトのオプションを維持することをお勧めします。カスタマイズが必要な場合は以下に注意：（ほとんどの場合、「Next」をクリックし続ければ問題ありません）
      - Gitが使用するデフォルトエディタを選択：お好みのエディタ（例：VS Code）を選択。最初のオプションであるVim（テキストエディタ）をデフォルトとして選択するか、「Visual Studio Code as Git's default editor」オプション（VS Codeの事前インストールが必要）を選択できます。デフォルトのまま「Next」をクリックして続行できます。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Gitの使用方法を選択：これら3つのオプションは、システム内でのGitのアクセシビリティを制御します。オプション2（"from command line and 3rd-party software"）の選択をお勧めします——基本的なGitツールをPATHに追加し、Git Bash、コマンドプロンプト、PowerShell、IDEでGitを使用できるようにしますが、システムを汚しません。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. インストール後、デスクトップで右クリック。メニューに「Git Bash Here」が表示されていれば、インストール成功です。

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

macOSの場合、まずターミナルで`git --version`と入力して、Gitがすでにインストールされているか確認できます。インストールされていない場合、インストールを促すメッセージが表示されます——指示に従ってインストールを完了してください。

1. 方法1：Homebrewでインストール
   [Homebrew](https://brew.sh/)（Macパッケージマネージャー）がインストールされている場合、ターミナルを開いて以下を入力
   ```bash
   brew install git
   ```
2. 方法2：（推奨）Xcodeでインストール： https://developer.apple.com/xcode/ 、XcodeにはGitが内蔵されています。インストール後、指示に従って続行してください。

### Linux

ほとんどのLinuxディストリビューションはパッケージマネージャーでGitをインストールできます：

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- インストールの確認：ターミナルでgit --versionと入力。バージョン番号が表示されればインストール成功です。

## Gitの初期化

Gitをインストールした後、まずユーザー情報を設定する必要があります——これはGitを使ったバージョン管理の基本ステップです。ターミナルで以下のコマンドを実行してください（括弧内の内容は自分の情報に置き換えてください）：

```bash
# グローバルユーザー名を設定（コミット記録に表示される）
git config --global user.name "Your Name"

# グローバルメールアドレスを設定（GitHub/GitLabなどのプラットフォームで登録したメールアドレスの使用を推奨）
git config --global user.email "your.email@example.com"
```

Gitはこの情報を各コミット記録に組み込み、毎回の修正の「作者情報」として使用します。バージョン履歴（例：git logを使用）を確認する際、誰がどの行のコードを修正したかが明確にわかり、責任の追跡とコミュニケーションに便利です。協業プロジェクトでは、統一されたID情報により、チームメンバーが誰がどの変更を行ったかを迅速に特定でき、協業効率が向上します（例：コミット記録から関連する開発者を見つけて問題を議論するなど）。

コマンドラインで`git config --list`と入力することで、現在のGit設定情報を確認し、設定が成功したか確認できます。

# GitHubとは

GitHubはGitベースのコードホスティングプラットフォームです。Gitリポジトリのリモートストレージを提供するだけでなく、協業ツール（Issues、Pull Requests、Projectsなど）も含み、開発者がコードを共有し協業しやすくします。簡単に言えば、Gitはローカルバージョン管理ツールであり、GitHubはリモートの「コードリポジトリクラウド + 協業コミュニティ」です。

GitHubは世界最大のコードホスティングプラットフォームであるだけでなく、世界で最も活発で影響力のあるオープンソースコミュニティです。ここでの「オープンソース」の核心的な考え方は、誰でもソフトウェアのソースコードをダウンロードして実行できるということです。このモデルにより、世界中の人々が互いのコードを検査して修正したり、それに基づいて新しいプロジェクトを作成したりできます。例えば、GitHubで各種学習チュートリアルや、GPTモデルのトレーニングに使用されるフレームワーク（PyTorchなど）の完全なソースコードを見つけることができます。毎日、世界中で無数の人がコードをレビューし改善するために協業しています。

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

多くの大企業がGitHubでプログラムやチュートリアルをオープンソース化し、業界での競争優位性を得ています——これは一種の広告形態とも言えます。GitHubコミュニティでは、プロジェクトが獲得した「スター（stars）」の数がその価値を測る主な指標であり、プロジェクトや組織が持つスターが多いほど、その信頼性と影響力が大きくなります。

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

本コースでは、サポートリソースや課題も専用のGitHubリポジトリにアップロードされます。課題のアップロードプロセスを通じて、GitHubの使用に徐々に慣れ親しみマスターし、将来のアプリケーション開発におけるバージョン管理の基盤を築きます。

## GitHubアカウントの登録

1. [GitHub公式サイト](https://github.com/)にアクセスし、右上の「Sign up」をクリック。
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. メールアドレスを入力（検証や通知がそこに送信されるため、常用メールの使用を推奨）、パスワードを設定（文字、数字、特殊文字を含める必要があります）。
3. 人工検証を完了し、指示に従ってメールを検証すれば、アカウントの作成完了です。

## GitHubで最初のリポジトリを作成

次に、最初の保存フォルダー、すなわちリポジトリまたは「repo」を作成します。

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name：他人に表示されるリポジトリ名。
2. Description：リポジトリの詳細な説明。
3. Choose visibility：個人リポジトリの場合、privateに設定すると、自分と特別に招待された人のみが閲覧可能。publicに設定すると、誰でも閲覧可能。
   組織内のリポジトリの場合、Privateにすると組織内の人のみが閲覧可能。
   Publicにすると組織外の人も閲覧可能。
4. README：一般的に、すべてのリポジトリにREADMEファイルがあることが推奨されます。これはリポジトリの完全な紹介と考えられ、使用説明、ファイルリスト、操作方法などが含まれます。
5. Add .gitignore and license：
   1. .gitignoreファイルは、GitにGitHubへのアップロード時に特定のフォルダやファイルを無視するよう指示し、それらが追跡やステージングエリアに追加されないようにします。これは一時テストファイル、依存パッケージ、大きなファイルに便利です。指定すると、これらのファイルは追跡されなくなります。
   2. licenseは、選択するオープンソースライセンスのタイプを指します。異なるライセンスは、他人があなたのコードを商用目的で使用できるかどうかなどを詳細に規定し、他の条項や条件も含みます。

「Add README」にチェックを入れ、リポジトリの可視性を「Private」に設定し、リポジトリ名と説明をお好みで入力してから「Create repository」をクリックして最初のリモートリポジトリの作成を完了することをお勧めします。

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

その後、余分なファイルのないクリーンなリポジトリが手に入ります。次にファイルのアップロードを始められます。

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

リポジトリを取得するコマンドは`git clone`ですが、リポジトリのアドレスが必要です。緑色の「Code」ボタンをクリックしてリポジトリのアドレスを見つけられます。HTTPSとSSHのオプションが表示されます。通常、どちらの方法でもリポジトリをローカルマシンにダウンロードできます（そうして初めてファイルの修正とアップロードが可能になります）。

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

一般的に、HTTPでクローンしたリポジトリは他人のリポジトリを一時的にダウンロードしてテストするのに適していますが、自分の開発にはお勧めしません。より良い学習体験のために、まずSSH認証を設定してください。

## ローカルSSHのバインド

GitHubにおける「SSHプロトコルバインド」とは、本質的にローカルデバイスのSSH公開鍵をGitHubアカウントに関連付け、GitHubがSSHプロトコルを通じてデバイスを識別できるようにすることです。これにより、パスワードなしでリモートリポジトリを安全に操作（clone、push、pullコードなど）できるようになります。

簡単に言えば：これはデバイスに「GitHub専用のセキュリティカード」を与えるようなものです。バインド後、デバイスがSSHプロトコルでGitHubリポジトリにアクセスする際、GitHubはこの「セキュリティカード」（あなたのSSH公開鍵）を検証します。あなたの認可されたデバイスであることが確認されれば、直接操作できます——毎回アカウントのパスワードを入力する必要はありません。

> 💡 SSHとは

### なぜSSHプロトコルのバインドが必要なのか？

GitHubは主に2つのリポジトリ操作プロトコルをサポートしています：HTTPSプロトコルとSSHプロトコル：

- HTTPSプロトコル：毎回の操作（pushなど）でGitHubのアカウントパスワード（またはPersonal Access Token）の入力が必要。検証プロセスが煩雑で、パスワード漏洩のリスクもあります。
- SSHプロトコル：認証は「鍵ペア」で完了するため、パスワードの繰り返し入力が不要で、暗号化転送もより安全です。

「SSHプロトコルバインド」はGitHubのSSH認証を有効にするための前提ステップです——ローカルのSSH公開鍵をGitHubアカウントに「バインド」して初めて、GitHubはあなたのデバイスを識別し、リポジトリのSSH操作を許可します。

### 「バインド」の核心的なロジック：SSH鍵ペアの役割

SSH認証は鍵ペア（公開鍵 + 秘密鍵）に依存しており、これらは一致する暗号化ファイルです。生成後、「公開鍵」をGitHubに提供（「バインド」）し、「秘密鍵」はローカルデバイスに残します：

1. 秘密鍵：ローカルデバイス（PCなど）の指定されたディレクトリ（通常は~/.ssh/）に保存され、「あなた専用の鍵」として機能し、誰とも共有してはいけません。
2. 公開鍵：これは公開して共有できる「鍵」です——GitHubアカウントの「SSH keys list」にコピー（「バインド」操作）する必要があります。

SSHでGitHubリポジトリを操作する際（例：git push git@github.com:xxx/xxx.git）：

- ローカルデバイスが秘密鍵を使って「操作リクエスト」を暗号化しGitHubに送信；
- リクエストを受信したGitHubは、以前にバインドした公開鍵を使って復号を試みる；
- 復号が成功すれば、デバイスは認可されたものとして確認され、操作が許可される。そうでない場合、アクセスは拒否されます。

### 「バインド」の具体的な手順（核心的なフロー）

原理を理解すれば、実際の操作はシンプルです——核心は「鍵ペアの生成 → 公開鍵のGitHubへのアップロード」です：

1. ローカルでSSH鍵ペアを生成
   1. Traeを使って公開鍵を取得（推奨）
      プロンプト：`Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   プロンプトを入力した後、左側のターミナルでEnterキーを押す必要があります。そうしないとコマンドが待機状態のままになります。Traeは条件判断を実行できないため、ひたすらEnterを押し続けるだけで問題ありません。

   最終的に、右側のTraeが読み取った公開鍵が返されます。それをコピーし、次のステップで貼り付ける準備をしてください。

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. 手動で公開鍵を取得
   ローカルのターミナルを開き（WindowsではGit BashまたはPowerShell、macOS/Linuxではターミナル）、以下のコマンドを入力（your_email@example.comをGitHubアカウント登録時に使用したメールアドレスに置き換えてください）：

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Enterを押してデフォルト値を受け入れる（デフォルトのファイルパス、パスワードなし、または必要に応じてパスワードを設定）。これで~/.ssh/ディレクトリに2つのファイルが生成されます：
      - id_ed25519：秘密鍵（ローカルに保存、**絶対に共有しない**）；
      - id_ed25519.pub：公開鍵（GitHubにアップロードが必要）。

2. 公開鍵をGitHubアカウントに「バインド」

これが核心的なバインドステップです——ローカルの公開鍵をGitHubアカウントの「SSH keys list」に追加：

1. 公開鍵の内容をコピー：
   1. Trae：
   2. Windows：メモ帳でC:\Users\<your>\.ssh\id_ed25519.pubを開き、全内容をコピー；
   3. macOS/Linux：ターミナルでcat ~/.ssh/id_ed25519.pubを実行し、全出力をコピー（先頭のSSH-ed25519から末尾のメールアドレスまで）。
2. GitHubにログインし「SSH Key Management」ページに進む：
   1. 右上のアバターをクリック → Settings → 左側のメニューSSH and GPG keys → New SSH keyをクリック。
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. 任意のタイトルを入力（例：your local computer's SSH）し、取得したSSH公開鍵をここに貼り付け。

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. バインドの成功を確認

ターミナルで以下のコマンドを入力（**Traeでも以下の操作が可能**）して、GitHubがデバイスを識別できるかテスト：

```bash
ssh -T git@github.com
```

- Hi [your GitHub username]! You've successfully authenticated...のような内容が表示されれば、鍵のバインドは成功；
- エラーが発生した場合、通常は公開鍵のコピーが不完全、秘密鍵の権限が高すぎる（ローカルの~/.ssh/ディレクトリは自分のみが読み書き可能にすべき）などが原因です。必要に応じてこれらの問題を確認してください。

### 重要な注意事項

複数のデバイス（ノートPCやデスクトップなど）を持っている場合、各デバイスに対して個別のSSH鍵ペアを生成し、各公開鍵を同じGitHubアカウントにバインドする必要があります——各デバイスには独自の「セキュリティカード」があります。

秘密鍵を共有しないでください（GitHubにアップロードしたり他人と共有しない）。そうしないと、誰かがあなたになりすましてリポジトリを操作する可能性があります。秘密鍵が漏洩した場合は、GitHubから対応する公開鍵を直ちに削除し、新しい鍵ペアを生成してください。

SSHをバインドした後、操作にはSSH形式のリポジトリアドレス（例：git@github.com:username/repository.git）を使用し、HTTPS形式（例：https://github.com/username/repository.git）は使用しないでください。以前にHTTPSでリポジトリをクローンした場合は、git remote set-url origin `<new>`でプロトコルを切り替えられます。

# TraeでGitHub操作を行う

Gitとは何か、GitHubとは何か、SSHとは何か、そしてその設定方法について説明しました。これでTraeを使って自由にGit操作を行えます。まず、リモートリポジトリをローカルマシンにクローンする方法を学びましょう。

## Git clone：既存のリポジトリをダウンロード

クローンしたいリポジトリのアドレスを直接伝えることができます

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull：リモートリポジトリから更新を取得

リポジトリを更新する前に、複数人でメンテナンスされている可能性があるため、まず最新の変更をプルする必要があります。その後、ファイルを修正してプッシュできます。

**間違ったリポジトリにプッシュしないよう、フォルダ名とその相対パスまたは絶対パスを必ず含めてください。**

prompt:`Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push：更新をステージしてGitHubにプッシュ

すべての準備が整ったら、ローカルファイルの修正、フォルダ内のアイテムの追加や削除を試みてください。その後、Traeに変更を検出させ、GitHubへのプッシュを支援させます。

prompt:`I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

プッシュ成功。これでGitHubで更新された内容を確認できます。

# 参考資料

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
