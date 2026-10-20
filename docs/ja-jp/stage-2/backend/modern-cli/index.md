# CLI AI プログラミングツール

本チュートリアルでは、コマンドライン上で直接動作する AI プログラミング Agent を紹介します。これまで学んだ Trae や Cursor に組み込まれた Agent とは異なり、CLI AI プログラミングツールはターミナル上でのみ使用します。AI IDE 内蔵の Agent と比べて、より長いコンテキストウィンドウ、より高速なツール呼び出し、そしてより多くの種類の大規模モデルとの互換性を備えています。最新の AI Vibe Coding の実践では、IDE 内蔵のコーディング Agent よりも CLI AI プログラミングツールを優先して使用することが多くなっています。

## CLI とは

以前のチュートリアルで CLI について紹介しましたね。CLI とは、ターミナルやコマンドプロンプトを通じて、グラフィカルインターフェース（GUI——ボタンがあってクリック操作ができる、コマンドを入力する必要のない画面と理解して構いません）に頼らず、純粋なテキストコマンドでソフトウェアを操作する仕組みです。

> Windows では、代表的なターミナルとして「コマンドプロンプト（cmd）」と「PowerShell」があります。PC の「ファイル名を指定して実行」や検索ボックスに「cmd」または「powershell」と入力することで、これらのコマンドラインプログラムを起動できます。

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI は元来テキストコマンドの操作に適しており、一部のギーク（極限まで追求するプログラミング愛好家）の間では、CLI の方が GUI よりも好まれることすらあります——彼らはすべての操作をキーボードで完了させたいと考えており、マウスを使うとかえってコーディング効率が下がると感じています。

業界においても、CLI は最も一般的なインターフェース形式の一つです。なぜなら、GUI は OS に追加で画面を描画し、ウィンドウを管理する必要があるため、コンピュータリソースの要求が高くなります。一方 CLI は、受け取ったコマンドをシステムに渡して実行するだけで済みます。そのため、大規模なサーバークラスタに接続する際、通常は CLI でのみやり取りを行います。

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

CLI の経験がない方にとっては、CLI の操作は複雑でコマンドが多すぎると感じたり、「間違えたら PC が壊れてしまうのではないか」と心配したりするかもしれません。心配は不要です。以前のチュートリアルで、Trae に様々な基本操作を手伝ってもらったことを思い出してください。ここでも全く同じ考え方が使えます——CLI プログラミングツールにすべての CLI 操作を代行させることができます。指定したフォルダへの移動、ファイルの検索や処理、オープンソースプロジェクトの実行やコピーなどを、すべて CLI AI プログラミングツールとの対話を通じて完了できます。

## AI IDE との違い

CLI AI プログラミングツールは、以前学んだ z.ai や Trae に例えることができます。ある意味で、CLI AI プログラミングツールは特殊な z.ai と見なすことができます。どちらもシンプルな対話の入口だけで、必要なすべての操作を自動的に実行してくれます（ただし、最終的な結果を確認するために手動でブラウザを開く必要がある場合があります）。また、AI IDE に例えるなら、CLI AI プログラミングツールは IDE 内の Agent モジュール——つまり、サイドバーにある対話エリアに相当します。

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

ただし、AI IDE によって Agent の実装方法が異なり、能力差も大きいため、AI プログラミングの効果は安定しにくい傾向があります。そのため、CLI AI プログラミングツールは通常、Claude を開発した Anthropic や ChatGPT を開発した OpenAI などの大手テック企業によって直接開発されています。

他の AI プログラミング Agent と比べ、これらの大企業製品を直接利用する方が優れた実践となることが多いです。特に Claude Code は、もともと Anthropic の内部開発チーム向けのツールであり、「エンジニアの実際のニーズを満たす」という観点から設計されています。

より直感的に比較するため、Claude Code とある AI IDE Agent（ここでは Cursor を例にします）の違いを見てみましょう。

| 機能特性          | Claude Code   | Cursor          | 優位性        |
| ----------------- | ------------- | --------------- | ----------- |
| 自動タスク実行      | ✅ 非常に強い     | ❌ 能力限定     | Claude Code |
| IDE 統合          | ❌ コマンドラインのみ   | ✅ ネイティブ VS Code | Cursor      |
| リアルタイムコード補完      | ❌ なし         | ✅ 優れた体験     | Cursor      |
| 複数ファイル操作        | ✅ 非常に強い     | ⚠️ 悪くない       | Claude Code |
| GitHub 統合操作 | ✅ 直接コミット可能 | ⚠️ 手動操作が必要 | Claude Code |
| 学習コスト          | ⚠️ 中程度       | ✅ 簡単に始められる     | Cursor      |
| コンテキスト長        | ✅ 非常に長い     | ⚠️ まずまず         | Claude Code |
| デバッグ支援          | ✅ 自動化     | ⚠️ 手動作業が多い   | Claude Code |

表の出典：<https://northflank.com/blog/claude-code-vs-cursor-comparison>

端的に言えば、CLI AI プログラミングツールは一般的に以下のことが可能です。

- より長時間の連続対話をサポート（「一日中作業」を手伝うことすら可能）。
- より長いコンテキストウィンドウを提供（「続けて」と頻繁に言う必要がなくなる）。
- より高速な応答速度（より多くのカスタムモデル API に接続可能）。

コーディング関連の操作において、これらは大半の IDE 内蔵 Agent よりも賢く、安定しています。

## 代表的な CLI AI プログラミングツール

現在、多くのオープンソース実装がありますが、実践においては 2 つのタイプの CLI AI プログラミングツールを「おすすめの組み合わせ」としてお勧めします。ご自身の好みに合わせてどちらかを選択してください。両方試した上で、最も適したものを選ぶことを強くお勧めします。

- Codex は GPT-5 を使用し、総合力がより高い。
- Claude Code は GLM 4.6 を経由した API 転送で、全体的な体験は Claude 4 に近いが、価格はより安い。
- OpenCode はモデルを自由に切り替えて組み合わせることができ、無料モデルも提供されており、コストをより良くコントロールできる。

ただし、実際のプロジェクトでどれが使いやすいかは、実際に試してみなければ判断できません。複数の AI プログラミングツールを使いこなすことは常に有益です。慣れてくれば、場面に応じて Claude Code、Codex、Trae を柔軟に切り替えることができます。あるツールの効果がいま一つだと感じたら、別のツールやモデルに切り替えて試行を続ければよいのです。

また、モデルのバージョンアップは非常に速いため、「コストパフォーマンス（効果 / コスト）」の面で最も優れた方案を優先して選ぶことをお勧めします。

### Claude Code

Claude Code は、Anthropic が Claude 大規模モデルの能力を基に開発した AI プログラミングツールです。主な利用シーンはターミナルですが、VS Code の拡張機能としても使用できます。AI IDE の Agent と同様に、開発者のコードリポジトリを深く理解し、自然言語の指示によりエンドツーエンドの開発タスクを完了できます。コードの編集、バグ修正、テストの実行と修正、Git ワークフローの管理（マージコンフリクトの解決や PR の作成など）、複雑なコードの解説、ターミナルコマンドの実行などが含まれます。

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Claude Code の強みは主に以下の点にあります。極めて長いコンテキストウィンドウ（ファイル全体や小規模プロジェクトの処理が可能）、曖昧な要件を自ら確認し、タスクを自動的に計画・分配する能力、そしてコードベース全体の内容を深く理解し説明する能力です。一般的な IDE Agent と比べ、「没入型 vibe coding」の開発プロセスにより適しています。

実際の使用では、対話による指示を通じて、新しいプロジェクトの作成、CLI 操作の実行（フォルダの整理、ファイルの一括リネーム、オープンソースプロジェクトのデプロイなど）、開発環境の構築（Python 環境のインストールやデバッグなど）を依頼できます。あるコードが理解しにくい場合や、ディレクトリ構造が不明確な場合も、Claude Code に構造化された分析ドキュメントを生成させたり、特定の内容をステップごとに解説させたりすることができます。

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Claude Code を体系的に学びたい場合は、Andrew Ng と Anthropic が共同で提供しているコースを参照してください。
<https://www.bilibili.com/video/BV176t2zSEpr>

それでは、Claude Code の使い方を学びましょう。公式の Claude Code を直接使用するとコストが非常に高くなるため（下図参照）、Claude Code のプロトコルと互換性がありながら、他の大規模モデルの API プラットフォームを基にした方案を使用します。

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

以下のいくつかの異なる方案を学ぶ必要があります（できればすべて試してください）。最後に、最も適したものをメインの実践パスとして選んでください。

1つ目の方法は、「Anthropic インターフェース互換」の API を直接使用することです。Claude Code の普及に伴い、越来越多の大規模モデルサービス事業者が Anthropic 形式の呼び出し方法をサポートし始めています。代表的なサービス事業者には GLM、Kimi、DeepSeek、Siliconflow などがあり、いずれも互換 API インターフェースを提供しています。具体的な設定については後で詳しく説明します。

なお、Claude Code は通常大量のトークンを消費するため、API 呼び出しによる高額な費用を懸念される場合は、GLM の月額プラン（約 20 元/月）の購入を検討するとコストを抑えられます。実際の使用料を先に確認したい場合は、10 元をチャージして小規模なテストを行うのも良いでしょう。

もう1つの方法は、「Claude Code Router」プロジェクトを使用することです。これはオープンソースツールであり、一般的なすべての API 呼び出しインターフェースをサポートするだけでなく、場面に応じて使用するモデルをきめ細かく設定でき、ローカルにデプロイされた大規模モデルとの接続も可能です。ただし、この方案の設定は比較的複雑なため、まずは1つ目の方案から始めることをお勧めします。

#### 智譜 GLM をバックエンドとして使用する（推奨）

GLM（General Language Model）は、智譜 AI が独自に開発した大型言語モデルシリーズです。GLM-4.6 は現在の GLM シリーズの最新バージョンであり、コード能力における優れたパフォーマンスが最大のハイライトです（公開ベンチマークと実際のタスクにおいて Claude Sonnet 4 と同等レベルであり、国内ではトップクラスに位置しています）。

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

また、コンテキストウィンドウを 200K に拡張し、長文や大規模なコードをより余裕を持って処理できるようになりました。推論とツール呼び出しの能力も強化され、パフォーマンスとコストのバランスも良好です。

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

GLM に接続する前に、まず Claude Code をインストールする必要があります。

コマンドラインでのインストール手順が煩わしいと感じる場合や、途中でエラーが発生した場合は、Trae の Agent にインストールを手伝わせることができます。

```python
# Claude Code のインストール
npm install -g @anthropic-ai/claude-code

# プロジェクトに移動
cd your-awesome-project

# Claude Code の起動
claude

# Ctrl+C で Claude を終了
```

次に、Claude Code のデフォルトの API リクエスト先を変更し、GLM の API サービスに対応させる必要があります。以下の内容をコピーして、Trae に対応する環境変数の作成を依頼できます。または、システム環境変数に永続的に書き込むことも選択できます（問題が発生した場合も、Agent に修正を依頼できます）。

まず、GLM の API Key を取得し、ご自身にとって最も便利な方法で保管してください。

国内版 URL：<https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
国際版 URL：<https://z.ai/manage-apikey/apikey-list>

**国内版 GLM** を使用する場合は、以下の環境変数を設定してください。

```python
# Cmd で以下のコマンドを実行
# `your_zhipu_api_key` を取得した API Key に置き換えてください
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

**国際版 GLM** を使用する場合は、以下の設定を使用してください。

```python
# Cmd で以下のコマンドを実行
# `your_zai_api_key` も必ず置き換えてください
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Trae で以下のようなプロンプトを直接入力できます。

> **注意**：Trae を通じて「永続的な環境変数」を設定した場合、設定完了後に **必ず Trae を再起動してください**。再起動しないと、内蔵ターミナルの環境変数が更新されず、ログイン失敗やネットワーク接続エラーが発生する可能性があります。

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

以下のような出力が表示されます。

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> **環境変数とは？**
>
> 環境変数は、本質的にはオペレーティングシステムに保存される「キーと値のペア」の設定情報であり、通常「変数名 = 具体的な値」という形式で存在します。ターミナルやシステム設定であらかじめ設定しておけば、プログラムはいつでもこれらの変数を読み取って関連情報を取得できます。環境変数はターミナルから直接書き込めるため、コード自体を変更する必要がありません。そのため、大規模モデルにアクセスするためのシークレットキーは、漏洩を防ぐために環境変数に保存するのが一般的です。プログラムは対応する環境変数を読み取るだけで、大規模モデルの呼び出しを完了できます。
>
> Windows システムでは、環境変数は大規模モデルのアクセスキーの保存以外にも、コマンドラインツールの「呼び出しパス」の保存によく使われます。
>
> ターミナル自体もプログラムです。ターミナルで外部プログラムを起動したい場合、例えばターミナルで `claude` と入力して Claude Code を起動するケースを考えます。`claude` と入力するだけで実行できるのは、ターミナルがシステムの環境変数を読み取り、その中の PATH 変数に Claude Code の実行ファイルが含まれるディレクトリが登録されているため、ターミナルが該当プログラムを見つけて実行できるからです（ターミナルにそのプログラムの絶対パスを貼り付けて Enter を押すのと同じです）。
>
> 代表的な環境変数は例えば `PATH=C:\Windows\system32;C:\Program Files\Python` のようになります。これにより、どのパスからでもシステム内のこれらのプログラムを実行できます。例えば、コマンドラインで直接 `python` と入力して Python インタープリタを起動できます。
>
> システムの現在の環境変数を確認したい場合は、Windows の検索で「環境変数」と入力し、「システム環境変数の編集」ウィンドウを開くと、すべての変数とその値が表示されます。一部の変数は大規模モデルのキーの保存に、一部はプログラムディレクトリの追加に使用されており、どのパスからでも呼び出せるようになっています。

これで、最新の GLM を使用した Claude Code 開発が可能になりました。以前のプロジェクトをもう一度実行したり、Trae ではうまく完了できなかったタスクに再挑戦したりして、体験の違いを比較してみてください。

何度も「やり直す」ことは時間の無駄ではありません——やり直すたびに、スキルはより確かなものになります。

GLM と全く同じ考え方で、Anthropic 互換形式をサポートする他のインターフェースにも簡単に接続できます。

#### Kimi K2 をバックエンドとして使用する（推奨）

Kimi K2 は月之暗面（Moonshot AI）が発表した次世代の大規模言語モデルであり、コードの理解と生成能力に優れています。Kimi K2 は超長コンテキストウィンドウ（最大 200K トークン）をサポートし、大規模なコードベースや複雑なプロジェクトを容易に処理できます。

**主な強み：**

- **超長コンテキスト**：200K コンテキストウィンドウをサポートし、プロジェクト全体のコードを一度に処理可能
- **強力なコード能力**：コード生成、リファクタリング、デバッグにおいて優れたパフォーマンス
- **中国語理解に優れる**：中国語のプログラミング要件の理解がより正確
- **安定したツール呼び出し**：安定した関数呼び出しとツール使用をサポート

**API Key の取得：**

<https://platform.moonshot.cn/console/account> にアクセスして登録し、API Key を取得してください。

**設定方法：**

参考ドキュメント：<https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Minimax をバックエンドとして使用する（推奨）

Minimax は稀宇科技（MiniMax）が発表した次世代の大規模言語モデルであり、プログラミングタスクにおいて優れたパフォーマンスを発揮します。Minimax モデルは、優れた推論能力とコード生成品質で知られており、特に複雑なプログラミングシナリオに適しています。

**主な強み：**

- **強力な推論能力**：複雑な論理推論とコードアーキテクチャ設計において優れたパフォーマンス
- **高品質なコード**：生成されるコードは構造が明確で読みやすい
- **多言語サポート**：複数のプログラミング言語のコード生成と変換をサポート
- **高速な応答**：API の応答速度が速く、高頻度呼び出しのシナリオに適している

**API Key の取得：**

<https://platform.minimax.io/> にアクセスして登録し、API Key を取得してください。

**設定方法：**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### DeepSeek をバックエンドとして使用する（推奨）

DeepSeek は深度求索が発表したオープンソースの大規模言語モデルであり、優れたコード能力と高いコストパフォーマンスで開発者に支持されています。DeepSeek Coder はプログラミングタスク向けに特化して最適化された学習が行われています。

**主な強み：**

- **優れたコード能力**：コード生成、コード理解、バグ修正において優れたパフォーマンス
- **オープンソースでカスタマイズ可能**：モデルがオープンソースであり、要件に応じてファインチューニングが可能
- **高いコストパフォーマンス**：API 価格が比較的低く、高頻度での利用に適している
- **中国語サポートが良好**：中国語のプログラミングシナリオの理解が正確

**API Key の取得：**

<https://platform.deepseek.com/usage> にアクセスして登録し、API Key を取得してください。

**設定方法：**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### 火山引擎 Coding Plan をバックエンドとして使用する（推奨）

火山引擎（Volcano Engine）は字節跳動（ByteDance）傘下のクラウドサービスプラットフォームで、エンタープライズグレードの AI モデルサービスを提供しています。火山引擎の Coding Plan はプログラミングシナリオ向けに特化して最適化されており、安定した効率的なコード生成能力を提供します。

**主な強み：**

- **エンタープライズグレードの安定性**：サービスレベル契約（SLA）を提供し、サービスの安定性を保証
- **コードシナリオの最適化**：プログラミングタスク向けに特化して最適化
- **豊富なモデル選択**：Doubao-pro、Doubao-lite など複数のモデルをサポート
- **国内からの高速アクセス**：国内ノードにデプロイされており、アクセス速度が速い

**API Key の取得：**

<https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> にアクセスして登録し、API Key を取得してください。

**設定方法：**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### その他の Anthropic 互換 API

Siliconflow：

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # 必要なモデルに変更可能
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # API Key を置き換えてください
```

阿里雲 DashScope（Aliyuncs）：<https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Claude Code Router をバックエンドとして使用する（応用編）

上記では、GLM 公式 API を使って Claude Code の Anthropic インターフェースを置き換える方法を説明しました。次に、Claude Code Router というツールがどのように Claude Code をより多くのモデル API に適合させるのかを見てみましょう。

[Claude Code Router](https://github.com/musistudio/claude-code-router) は、Claude Code 専用に設計されたインテリジェントルーティング拡張ツールです。その主な役割は、ユーザーのニーズに応じて AI リクエストを異なるプラットフォーム上のモデルに振り分け、高度なカスタマイズを可能にすることです。OpenRouter、DeepSeek、Ollama、Gemini など数十のプラットフォームへの接続をサポートし、シナリオに応じてタスクを特定のモデル（例：GLM-4.5、Kimi-K2、Qwen3-Coder など）にルーティングすることもできます。例えば、バックグラウンドタスクを自動的にローカルの Ollama に任せてコストを節約し、長文や長いコードのタスクを Gemini-2.5-Pro に、コードの解説を DeepSeek に振り分けることができます。

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

このツールは、便利な UI/CLI 設定管理機能も提供し、「コンバーター（converter）」を通じて異なるプラットフォームの API 形式に適合させます。GitHub Actions などの自動化統合やカスタム拡張をサポートし、「単一のモデルではすべてのシナリオをカバーできない」問題や「プラットフォームの頻繁な切り替えが面倒」という課題を解決し、ユーザーがより柔軟かつ低コストで AI ツールを活用できるようにします。

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

Claude Code Router のインストール方法を簡単に説明します。大まかに以下のステップが必要です（これも Trae に実行させることができます）。

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

インストール完了後、ローカルで `ccr` コマンドが使用できることを確認してください。以下のような出力が表示されれば、インストールは成功しています。

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

次に、モデルの初期化と設定には 2 つの方法があります。

- CCR 内蔵の UI を使用し、ブラウザで提供される設定ページから操作する。
- CCR のデフォルト設定ファイルを直接編集する（UI も本質的には設定ファイルを変更しているだけで、より直感的なインターフェースを提供しています）。

CCR UI を使用する場合、以下のような画面が表示されます。

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

「Add Provider」ボタンをクリックすると、以下の画面が表示されます。以下の操作が必要です。

1. Name にモデルプロバイダーの名前を入力。
2. API Full URL にそのプロバイダーの OpenAI 互換インターフェースのアドレスを入力。
3. API Key に対応するプラットフォームの API Key を入力。
4. Models エリアにモデル名を入力し、「Add Model」をクリックして追加。
5. 最後に「Save」をクリックして設定を保存。

（画面を下にスクロールすると多数の詳細オプションがありますが、今は無視して構いません。）

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

以下は DeepSeek と Kimi の設定例です。

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

モデル設定を保存した後、右側の Router エリアでデフォルトモデル（Default）を指定する必要があります。該当するドロップダウン選択をクリックし、`kimi`（推奨）に設定した後、右上の「Save and Restart」をクリックしてください。

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

その後、ターミナルで `ccr code` と入力するだけで、Claude Code Router を通じて Claude Code のコーディングワークフローを起動できます。

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Claude Code の応用的な使い方

Claude Code を使い始めたばかりの頃は、単なる対話ツールとして使っている人が多いでしょう。しかし実際には、より効率的で柔軟な使用を可能にする豊富な機能が内蔵されています。以下に、一般的なコマンドと使用例をいくつか紹介します。

参考ドキュメント：

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| コマンド              | 機能                                      | 例                                     |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude            | インタラクティブモードの起動                              | `claude`                                 |
| claude "query"    | 一度限りのタスクを実行し結果を出力                  | `claude "explain this project"`          |
| claude -p "query" | 一度限りの質問を実行し、終了後に自動的に終了          | `claude -p "explain this function xxxx"` |
| claude -c         | 直近のセッションを再開                        | `claude -c`                              |
| claude -r         | 前回のセッションを復元                            | `claude -r`                              |
| /resume           | 現在のチャットで前回のセッションに切り替え              | `claude -c`、`/resume`                   |
| /plugin           | プラグインの管理。コミットやレビュー機能の拡張をインストール可能     | `/plugin`                                |
| /init             | CLAUDE.md でプロジェクト説明を初期化               | `/init`                                  |
| /clear            | 現在のセッションのコンテキストをクリアし、情報過多を防止          | `/clear`                                 |
| /compact          | セッション履歴を圧縮し、コンテキストのトークン消費を削減       | `/compact`                               |
| /cost             | 現在の利用料金を確認                          | `/cost`                                  |
| /model            | 使用するモデルを切り替え（互換 API 使用時は基本的に無視可能） | `/model`                                 |
| /memory           | CLAUDE.md メモリファイルの管理                   |                                          |
| /help             | 利用可能なコマンド一覧を表示                          | `/help`                                  |
| exit or Ctrl+C    | Claude Code を終了                          | `exit` または `Ctrl+C`                       |
| /agents           | 高度な機能、後述                      |                                          |
| /mcp              | 高度な機能、後述                      |                                          |

**CLAUDE.md**

参考： <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` は、Claude が対話を開始する際に自動的に読み込み、コンテキストに追加する特別なファイルです。そのため、以下の内容を記録するのに非常に適しています。

- よく使う bash コマンド
- コアファイルとユーティリティ関数
- コードスタイルの規約
- テスト方法の説明
- リポジトリのコラボレーションルール（ブランチの命名、merge か rebase かなど）
- 開発環境の設定説明（pyenv の使用有無、推奨コンパイラなど）
- プロジェクト内で特に注意すべき動作や落とし穴
- Claude に「記憶」してほしいあらゆる情報

`CLAUDE.md` 自体に強制フォーマットはありません。簡潔で人間が読みやすい形式であれば問題ありません。例えば以下の通りです。

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Claude Code の内部仕組み

参考： <https://github.com/shareAI-lab/analysis_claude_code>

Claude Code が多くの場面で Trae や Cursor などの Agent プログラミングツールより使いやすい理由に興味がある場合は、その内部の仕組みを簡単に見てみましょう。

他の CLI AI プログラミングツールも、全体的な実装方法は概ね同様です。

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code は、プログラミングタスクを継続的な「知覚—思考—行動—検証」のサイクルに分解し、その中で異なるツールを呼び出してタスクを完了させます。人間の開発者のワークフローを模倣し、「コードを書く→実行する→結果を見る→さらに改善する」を繰り返します。システム内部では、メインタスクのループを通じてステップを継続的に実行し、各サイクルで Claude は異なるツール（ファイルの読み書き、コマンドの実行、コードの検索など）を呼び出し、ツールから返された実際の結果に基づいて次のアクションを決定します。

その中で、特に注目すべき特徴がいくつかあります。

- **ストリーム処理（Stream Processing）**：Claude は考えながら同時に結果を出力でき、すべてのコードを書き終わるまで待つ必要がありません。
- **インテリジェント圧縮（Intelligent Compression）**：長い対話はコンテキストが過剰に長くなりやすいため、Claude は履歴を重要な情報に圧縮することで「忘却」の確率を下げ、長期記憶と短期記憶を区別して効率的な動作を保証します。
- **並行制御（Concurrency Control）**：内部の並列設計により、複数のタスクを同時に実行し、互いに干渉しません。
- **サブ Agent 管理（Sub-agent Management）**：実際の作業では、単一の「役割」がすべてを処理するわけではありません。複数のサブ Agent を管理してコードを協力して処理でき、各 Agent が異なるタスク（テスト専用、ドキュメント作成専用など）を担当します。

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Claude Code と同様に、Codex は OpenAI が開発した AI 協力プログラミングツールであり、「OpenAI 版の Claude Code」と理解できます。最大の強みは GPT-5 の効率的な適応です。

実際の体験から言うと、GPT-5 は現在レスポンスがより速く、エラー率も低いです（複数回の複雑なタスクにおいて、正しく完了する確率が高い）。一方、欠点として、説明が「学術的」で「技術的」に偏りがちで、時には過度に厳密で情報量が多く、初心者には少し分かりにくいと感じる場合があります。

以下のコマンドで Codex をインストールできます。

```
npm i -g @openai/codex
```

#### OpenAI 公式 API をバックエンドとして使用する

OpenAI 公式の Codex エントリポイントを直接使用する場合、設定は非常にシンプルです。OpenAI のサブスクリプションを有効にしているか、対応する API クォータを取得した後、コマンドラインで `codex` と入力してプログラムを起動し、指示に従ってログインを完了するだけです。

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### OpenAI API の転送方式をバックエンドとして使用する

公式の OPENAI API は価格が高く、ネットワーク要件が厳しいなどの問題がある可能性があるため、これらの制限を回避するために、他の API ゲートウェイサービスを通じて呼び出しを転送することもできます。

この方式では、サードパーティの転送プラットフォームで対応する Codex API クォータを購入するだけで、ネイティブの OpenAI Codex に近い使用体験を得られます。

参考： <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
チャージ URL： <https://api.zyai.online/account/topup/recharge>

なお、トークンクォータを取得した後、ローカルで API Key の設定も行う必要があります。

キーグループの設定では、Codex 専用の項目を選択するよう注意してください。

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

次に、取得した Key を以下のプロンプトに記入し、プロンプト全体を Trae に渡して、設定プロセス全体を完了させます。

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

設定が完了すると、`codex --profile myrelay` で転送 API を使用する Codex を起動できます。その後の使い方は Claude Code と同様で、チャットボックスにいつでもアイデアや要望を入力するだけです。

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode は開発者向けのオープンソース AI Coding Agent プラットフォームであり、「マルチモデル版の Claude Code」という位置づけです。Terminal を主なインタラクションの入口としながら、VS Code、Neovim などのエディタ統合もサポートし、ローカルのコードリポジトリに深くアクセスし、自然言語でコードの理解からエンジニアリングの実行まで、開発プロセス全体を完了できます。

単一のモデルに縛られた AI プログラミングツールではなく、GPT、Claude、Gemini からローカルモデルまで自由に切り替えられるオープンな AI Coding Agent プラットフォームです。OpenAI 公式も OpenCode を通じた Codex / OpenAI サブスクリプションへの接続をサポートしています。

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

以下のコマンドで OpenCode をインストールできます。

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### OpenCode の無料モデルを使用する

OpenCode では不定期に無料モデルが提供されており、設定も非常にシンプルです。OpenCode を使用したいディレクトリでコマンドラインに `opencode` と入力して OpenCode プログラムを起動し、チャットパネルに入ります。`/models` コマンドを入力して「free」キーワードで検索すると、「free」という文字を含む無料モデルが表示されます。

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

一般的に、無料モデルはコーディングタスクの完了において有料/サブスクリプションモデルより遅くなります。これは通常、モデル回線の混雑状況、ピーク時間帯かどうか、モデル自体の能力に依存します。

#### サードパーティのモデルを OpenCode のメインコーディングモデルとして使用する

これが OpenCode の最大の強みです。同じ MCP、Skills、コンテキストを使用したまま、モデルを自由に切り替えて異なるコーディングタスクを完了できます。以下では、OpenAI 公式の GPT-5.3 Codex を例に、OpenCode にメインコーディングモデルとして接続します。

OpenCode のチャットウィンドウで `/connect` コマンドを入力し、最初の最も関連性の高い指示を選択して Enter キーを押すと、サードパーティモデルプロバイダーの認証認可を選択できます。

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

ここでは OpenAI を選択する例で、Enter キーを押して認証方式を選択します。

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

どちらでも構いません。認証方式が異なるだけです。ここでは最初の方法でブラウザログインを行います。

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

このリンクをブラウザにコピーして、通常の OpenAI ログイン操作を行います。ブラウザに「Authorization Successful」と表示されたら、OpenCode クライアントは自動的に OpenAI のモデル選択画面に遷移します。

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Oh My OpenAgent プラグインのインストール

OpenCode の強力さは、非常に活発なコミュニティエコシステムにもあります。GitHub で OpenCode 関連のプラグインが多数見つかります。OpenCode がモデルを自由に切り替えられる AI 協力ツールだとすれば、Oh-My-OpenAgent は OpenCode 上で動作する「マルチ Agent AI プログラミング指揮システム」です。複雑なタスクを複数のサブタスクに分解し、異なるモデルに分担させて各々の役割を果たさせることができます。

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

以下のテキストをコピーして、OpenCode で設定済みのモデルに貼り付け、OpenCode にインストールさせます。

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

以下は Oh-My-OpenAgent の機能と説明です。

| 特性 | 機能説明 |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **自律軍団 (Discipline Agents)** | Sisyphus が Hephaestus、Oracle、Librarian、Explore のスケジュールを管理。完全な AI 開発チームが並列で作業。 |
| **Team Mode** (v4.0, オプション) | リーダー Agent + 最大 8 名の並列メンバー、リアルタイム tmux 可視化、専用 `team_*` ツール群。`hyperplan`（5 人の敵対的レビュアー）と `security-research`（3 人のハンター + 2 人の PoC エンジニア）を駆動。[ドキュメント →](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | ワンクリックで全 Agent が出動。タスク完了まで決して停止しない。 |
| **[IntentGate 意図ゲート](https://factory.ai/news/terminal-bench)** | 本当に行動する前に、ユーザーの真の意図を分析。文字通りの意味に誤導される AI の無駄発言に完全に別れを告げる。 |
| **ハッシュベースの編集ツール** | 各修正は `LINE#ID` コンテンツハッシュで検証。誤修正率 0%。[oh-my-pi](https://github.com/can1357/oh-my-pi) にインスパイア。[The Harness Problem →](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | ワークスペースレベルのリネーム、ビルド前診断、AST ベースの書き換え。Agent に IDE レベルの精度を提供。 |
| **バックグラウンド Agent** | 5 人以上の専門家が同時に並列作業。コンテキストをクリーンに保ちながら、いつでも成果を取得可能。 |
| **内蔵 MCP** | Exa（ウェブ検索）、Context7（公式ドキュメント）、Grep.app（GitHub ソースコード検索）。デフォルトで有効。 |
| **Ralph Loop / `/ulw-loop`** | 自己参照のループ。100% の完了度に達するまで停止しない。 |
| **Todo 強制実行** | Agent がサボろうとしたら、システムが強制的に引き戻す。あなたのタスクは必ず完了させる。 |
| **コメントレビューアー** | 強い AI 臭のある冗長なコメントを除去。熟練したシニアエンジニアが書いたようなコードを出力。 |
| **Tmux 統合** | 完全なインタラクティブターミナルサポート。REPL の実行、デバッガの使用、TUI ツールの利用、すべてリアルタイムセッションで完了。 |
| **Claude Code 互換** | 既存の Hooks、コマンド、Skills、MCP、プラグインはすべてシームレスに移行可能。 |
| **Skills 内蔵 MCP** | Skills が必要な MCP サーバーを内蔵。オンデマンドで起動し、コンテキストウィンドウを圧迫しない。 |
| **Prometheus プランナー** | コードを書き始める前に、インタビューモードで戦略計画を作成。 |
| **`/init-deep`** | プロジェクトディレクトリ階層全体に `AGENTS.md` を自動生成。トークンの節約だけでなく、Agent の理解力も大幅に向上。 |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) はメインコマンダーです。計画の策定、専門家チームへのタスク割り当てを担当し、極めてアグレッシブな並列戦略でタスクを完了まで推進します。彼は途中で諦めることはありません。

Hephaestus (gpt-5.5) は自律的なディープワーカーです。目標だけを与え、具体的な方法は指示しないでください。彼は自動的にコードベースのパターンを探索し、最初から最後まで独立してタスクを実行し、途中であなたに世話を焼かせることはありません。名実ともに正真正銘の職人です。

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) は戦略プランナーです。インタビューモードを通じて、1行のコードを書く前に、質問によってスコープを確定し、詳細な実行計画を構築します。

これらを理解したら、Oh-My-OpenAgent プラグインをインストールした OpenCode を使ってコーディングタスクに取り組むことができます。

## CLI AI プログラミングツールのさらに多くの使い方

### AI で要件文書を書く：「要件の具体化」を学ぶ

大規模言語モデルにとって、抽象的な要件は「具体化」される必要があります。例えば、「お腹が空いた」というのは抽象的な要件であり、「お腹が少し空いているので、あんパンを一つ食べて、豆乳を一杯合わせたい」——これが実行可能な具体的な要件です。

しかし、抽象的な要件を具体的にするのは、実はかなり労力のかかるプロセスです。十分な数の事例に触れていなければ、抽象的な問題を細かなモジュールに分解する方法をすぐに思いつくのは難しいでしょう。そのような場合、最も良い方法は AI に「具体化」のステップを手伝わせることです。
例えば、「毎日の計画」アプリを開発したい場合、最もシンプルなアイデアは次のようになるでしょう。

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

AI はこの要件に基づいてタスクを分割し、段階的に完了させることも可能ですが、途中でエラーや理解のズレが生じやすくなります。リスクを下げるために、まず AI に要件を拡張してもらいましょう。

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

すると、AI は以下のような完全な PRD を提案してくれるかもしれません。

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system—ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today's plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won't miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: "Today" as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom "To-do List" section.
Interactions:
Click the "+" button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday's and tomorrow's plans.
3.1.2 Create/Edit Task
Entry: Click "+" on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., "10 AM Weekly Product Meeting."
Task time (optional):
Set "start time" and "end time."
Provide "all-day" option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal "Delete" button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task's set "start time" and the user's "reminder lead time," send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name "Today's Plan."
Body: "Reminder: [Task Title] will start at [Start Time]." E.g., "Reminder: Product Meeting will start at 10:00."
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., "15 minutes before task starts." New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide "no reminder" option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): "How was your day? Take a look at your achievements!"
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., "Efficient Workday," "Relaxing Weekend."
When creating tomorrow's plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product's lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value—planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

最初の「毎日計画を記録してリマインドするアプリを作って」という一言と比べると、このドキュメントはずっと詳細になっています。実際の要件に基づいて内容を追加・削除・変更できます。一部のモジュールが不確かな場合は、AI にさらに多くの代替案を提案させ、それらから選択・統合して最終版を作成できます。

この方法により、抽象的なアイデアを簡単に具体的な説明に変換できます。AI 開発において、「具体性」こそが生産性です。要件が具体的であればあるほど、構造が安定した品質の高いプロジェクトを得やすくなります。この方法で以前の小規模プロジェクトをもう一度作り直して、効果の違いを比較してみてください。

このような「要件プロンプト」が長すぎると感じる場合、非常に自然なアプローチは、それを個別の Markdown ドキュメントに書き出し、あなたの「要件文書/開発文書/PRD」として扱うことです。その後、AI にプロジェクトを作成させるたびに、「この文書を参考にして」と指示するだけで、毎回長いプロンプトを入力し直す必要がありません。また、反復を通じてこの文書を継続的に改善し、後続のプロジェクトにも活用できます。

以下に、その他の一般的な使用シナリオをいくつか紹介します。

### フォルダの管理

CLI AI プログラミングツールを使って、現在のフォルダ内の様々なファイルを管理してみましょう。例えば、整理されていないファイルがたくさんあり、整理・分類したい場合、Claude Code や Codex に次のように依頼できます。

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### 新規プロジェクトの開発

これは、以前に z.ai や Trae で行った使い方とほぼ同じです。CLI AI プログラミングツールを使って、ゼロから新規プロジェクトを開発することも可能です。もちろん、あらかじめ要件文書を用意しておくのが理想的です。

要件文書が詳細であればあるほど、最終的な成果は良くなります。アイデアが変化するたびに文書を複数回最適化できます。文書が完成度を増すほど、コードの実装はより安定し、成熟したものになります。

### オープンソースプロジェクトのデプロイ（例：Dify）

コンピュータに触れたばかりの方にとって、GitHub からオープンソースプロジェクトをデプロイするのは難しく感じられることが多いでしょう。しかし、この作業は完全に Claude Code に任せることができます。Dify のチュートリアルでやったように。

<https://github.com/langgenius/dify>

自分の Dify をローカルで動かしたい場合、このリンクを Claude Code に渡して、次のように入力するだけです。

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

リクエストを受け取ると、Claude Code は GitHub からのコードの取得、実行環境の設定、プロジェクトの起動など、一連の操作を自動的に完了します。途中でエラーが発生した場合や、プロジェクトの起動状態が異常な場合は、指示に従って少量の手動対応を行うだけで済みます。Dify 以外にも、Claude Code を使って一般的な GitHub オープンソースプロジェクトの大半をデプロイできます。必要なのは一つのチャットボックスと、コーヒーを一杯飲む時間だけです。

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### コードの解説とドキュメントの作成

複雑なプロジェクトや、AI が自動生成した大規模なプロジェクトでは、コードが長すぎて論理が多すぎ、理解するのが難しいと感じることがあるでしょう。そんな時は、CLI AI プログラミングツールに「コードを読む」のを手伝わせることができます。次のように質問してみてください。

- このプロジェクトを説明してください。どのように実行するか、どのように使うか、今後どのように変更して開発を続けるか。
- このプロジェクトの全体の流れを説明してください。プログラムはどのように動いているか。ユーザーは画面でどのような操作ができるか。
- このプロジェクトのために完全なドキュメントを作成してください。開発ドキュメントと実行ドキュメントを含めてください。
- 現在のフォルダ内のすべての内容に基づいて、詳細な説明を作成し、指定した Markdown ドキュメントに保存してください。

### さらに多くの使い方

もちろん、CLI AI プログラミングツールにできることは、上記のものにとどまりません。「コードを書くツール」としてだけでなく、独立した行動力を持つインテリジェントな Agent として捉えてください。次のようなことを依頼できます。

- ローカルファイルの管理と整理
- 日記やまとめの作成
- システムエラーの分析と修正
- 各種反復的なコマンドラインタスクの実行

おそらく近い将来、それはあなたの PC 上で最も重要であり、最もあなたを理解している AI パートナーになるでしょう。
