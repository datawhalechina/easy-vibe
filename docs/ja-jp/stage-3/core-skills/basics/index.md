# Claude Code クイックスタート コアガイド

Claude Code は Anthropic の公式 AI ネイティブコーディングツールです。大規模言語モデルの機能をターミナルに直接統合しており、自然言語で AI と協力しながらプログラミングタスクを完了できます。従来のコード補完ツールとは異なり、Claude Code はプロジェクト全体のコンテキストを理解し、複雑な開発タスクを実行できます。コード生成からリファクタリング、デバッグからドキュメント作成まで、すべてに対応します。

この章では、Claude Code のインストールとセットアップ、基本操作、実践的なテクニック、よく使うコマンドなど、コアとなる使い方を素早く習得できます。AI コーディングツールを初めて使う方にも、Claude Code をより効率的に活用したい方にも、必要な情報が見つかります。

---

## クイックインストール

Claude Code は Node.js 上に構築されているため、インストール前に Node.js 18 以上がシステムにインストールされていることを確認してください。手順は非常にシンプルで、通常は数分で完了します。

### なぜ Claude Code が必要なのか

従来の開発ワークフローでは、開発者はエディタ、ターミナル、ブラウザ、ドキュメント間を頻繁に切り替える必要があります。Claude Code はこれらのワークフローを一つのインターフェースに統合します。同じターミナルウィンドウ内で、コードの作成、テストの実行、ドキュメントの閲覧、さらにはチームメイトとの協力作業まで行えます。さらに重要なのは、プロジェクト構造を理解し、あなたのコーディング習慣を記憶し、真のプログラミングアシスタントになることです。

### 方法 1：手動インストール

手動インストールは、各ステップを完全に制御したい開発者に適しており、ツールの構成要素を明確に理解するのにも役立ちます。

```bash
# Claude Code CLI をグローバルにインストール
# -g を使ってグローバルにインストールすると、任意のディレクトリで使用可能
npm install -g @anthropic-ai/claude-code

# インストールの確認
# バージョンが表示されれば（例：0.1.25）インストール成功
claude --version
```

インストール中、npm は自動的に依存関係をダウンロードし、環境変数を設定します。権限の問題が発生した場合は、`sudo`（macOS/Linux）を試すか、管理者としてターミナルを実行してください（Windows）。

### 方法 2：AI エージェントにインストールしてもらう

他の AI コーディングアシスタント（Cursor、Windsurf、このプロジェクトの AI エージェントなど）を既に使用している場合、インストールを任せることができます。AI は環境を自動的に検出し、依存関係の競合を処理し、システムに最適なインストール方法を選択します。

**次のように言うだけ：**

```text
Help me install Anthropic Claude Code.
```

または、より具体的に：

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

AI エージェントは次のことを行います：
1. 現在の Node.js バージョンを確認
2. 要件を満たさない場合はアップグレードを促す
3. インストールコマンドを実行
4. インストール結果を確認
5. 問題がある場合は自動修復を試みる

### 初回起動と初期設定

インストール後、プロジェクトディレクトリに移動して Claude Code を起動します：

```bash
# プロジェクトディレクトリに移動（Claude Code はカレントディレクトリで動作）
cd /path/to/your/project

# Claude Code を起動
claude
```

初回起動時、Claude Code はいくつかの重要なセットアップ手順をガイドします：

1. **Anthropic アカウントにサインイン**：Claude Code を使用するには Anthropic アカウントが必要です。お持ちでない場合は、登録を促されます。
2. **プランの選択**：
   - **Free プラン**：個人学習や軽い使用に適しており、呼び出し制限があります
   - **Pro プラン**：プロの開発者に適しており、より高いクォータと優先応答があります
3. **利用規約の同意**：Anthropic の利用規約とプライバシーポリシーを読んで同意
4. **オプション：API キーの設定**：カスタムキー（例：サードパーティプロバイダーのもの）がある場合は、ここで設定

::: info 中国本土のユーザーへの特記事項

ネットワークの理由により、中国本土のユーザーは Anthropic の公式サービスに直接アクセスできない場合があります。Claude Code は Anthropic API 形式と互換性のあるサードパーティサービスをサポートしており、技術的に利用可能です。

**2つの選択肢があります：**

1. **API トークンを直接使用**：Anthropic API と互換性のあるプロバイダーからトークンを購入し、環境変数で設定
2. **コーディングプランを使用**：一部のプロバイダーはコーディングに最適化されたプランを提供しており、コーディングシナリオでは通常よりコスト効率が良いです

**推奨アプローチ**：AI エージェントに設定を手伝ってもらう。プロバイダーの設定情報（API エンドポイント、キーなど）を提供するだけで、AI が環境変数を正しく設定します。

**詳細なセットアップガイド：** [Claude Code のインストールと環境変数の設定方法](/ja-jp/stage-2/backend/modern-cli/)

:::

---

## クイックスタート：いくつかの小さな実験を実行

インストール後、すぐに本格的なプロジェクトに取り組む前に、いくつかの小さな実験を実行して Claude Code の動作を理解しましょう。これら3つの実験は、やさしいものから高度なものへと設計されており、自然言語理解、コンテンツ生成、コード実行という3つのコア能力に対応しています。

### 実験 1：対話 — AI の理解力を体験

この目的は、Claude Code の自然言語理解を体験することです。通常の検索エンジンとは異なり、Claude Code はコンテキストを理解し、複数回の対話を維持し、フィードバックに基づいて回答を調整できます。

**次のプロンプトを試してください：**

```text
Hello, who are you?
```

Claude は自身を Claude Code、Anthropic の AI コーディングアシスタントとして紹介します。

```text
What is a closure? Give me the too-long-didnt-read version.
```

Claude が「too-long-didnt-read」をヒントとして使い、簡潔かつ正確な説明を与える様子を観察してください。

```text
What is the difference between JavaScript and TypeScript?
```

これは技術的な比較の質問です。Claude が構造化された深い回答を提供するか確認してください。

**実験のポイント**：Claude の応答スタイルに注目してください。通常、最初に核心的な結論を述べ、その後に詳細を説明します。この「逆ピラミッド」スタイルは、迅速な情報取得に最適です。

### 実験 2：Markdown ドキュメントの生成 — コンテンツ作成を体験

この実験は、Claude Code のコンテンツ生成能力を示します。開発者にとって、ドキュメントの作成は時に苦痛です。Claude は要件から明確で完全なドキュメントを素早く生成できます。

**次の指示を入力：**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**Claude が行うこと：**

1. 要件を分析：一般的な Git コマンド、Markdown 形式、3つの要素（コマンド/説明/例）
2. ドキュメント構造を計画：通常、使用シナリオ別にグループ化（初期化、日常の開発、ブランチワークフロー、リモート協力など）
3. コンテンツを生成：各コマンドに簡潔な説明と実用的な例
4. 形式を出力：Markdown 構文と適切な構造を使用

**期待される出力例**：

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**高度な試み**：「中国語のコメントを追加」、「頻度順にソート」、「よくあるエラー処理を含める」などの追加要件を加えて、Claude がどのように出力を調整するか観察してください。

### 実験 3：ゲームを作成して実行 — エンドツーエンドのコーディングワークフロー

これは最も挑戦的な実験です。Claude Code の完全なワークフローを示します：要件の理解、コードの作成、ファイルの作成、プログラムの実行、エラーの処理。この実験を通じて、AI コーディングアシスタントの力を本当に感じることができます。

**次の指示を入力：**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**Claude は以下のステップを実行：**

**ステップ 1：環境の確認**
- Python がインストールされているか確認
- pygame が利用可能か確認
- 欠落している場合はインストールを促す

**ステップ 2：コードの作成**
- ゲームエントリファイルを作成（例：`snake_game.py`）
- 移動、食べ物の生成、衝突判定を実装
- スコア表示を追加
- ESC 終了を実装

**ステップ 3：ゲームの実行**
- Python スクリプトを実行してゲームを起動
- ゲームウィンドウが表示され、矢印キーでスネークを操作

**ステップ 4：フォローアップサポート**
- バグがある場合、「スネークが壁を通り抜けられる、修正して」と直接言えます
- 追加機能を希望する場合、「スコアに応じて難易度を上げる」など、Claude が継続的に修正可能

**この実験の価値：**

1. **セットアップの検証**：Claude Code がコードを正しく実行できることを確認
2. **インタラクションの体験**：AI との協力開発を感じる
3. **自信の構築**：AI がエンドツーエンドで実行可能なプログラムを完成させるのを見る

**よくある質問：**

- **Q：pygame がインストールされていない場合は？**
  - A：Claude が検出して `pip install pygame` を提案します。Claude にインストールを依頼することもできます

- **Q：ゲーム開始後、ターミナルが占有される場合、どうすればいいですか？**
  - A：ESC を押してゲームを終了するか、別のターミナルウィンドウで Claude Code を使用してください

- **Q：言語を切り替えられますか？**
  - A：もちろん。「JavaScript で書いて」「HTML5 Canvas で書いて」などお試しください

---

## コアテクニック

これらのテクニックをマスターすれば、Claude Code の効率が何倍も向上します。実際の開発実践から得られたもので、高頻度のシナリオを網羅しています。

### テクニック 1：Esc ダブル押しで対話をロールバック — 誤操作の取り消し

これは Claude Code で最も一般的かつ重要なショートカットです。協力作業中、誤入力、間違った指示、気に入らない回答が発生することがあります。Esc ダブル押しで素早く「時間を巻き戻せます」。

**ショートカットの詳細：**

```text
Esc 1回押し     -> 現在の入力をクリア（Ctrl+C と同様）
Esc 2回押し     -> 前回の対話状態にロールバック（前回のターンを取り消し）
Esc 3回押し     -> すべての対話履歴をクリア（最初からやり直し）
```

**使用例：**

- **ケース A**：間違った指示を誤って送信し、Claude が実行を開始した。素早く Esc を2回押して実行前に戻る。
- **ケース B**：Claude の回答が期待と異なり、言い直したい。Esc ダブル押しで取り消して再度質問。
- **ケース C**：対話が多くなりコンテキストが混乱。Esc トリプル押しでクリアして再開。

**重要な注意**：Esc ダブル押しは**対話状態**をロールバックするもので、コードの変更はロールバックしません。Claude が既にファイルを編集している場合、それらの編集は自動的に元に戻りません。Git で手動で復元する必要があります。

**推奨事項**：大規模なコード編集を行う可能性がある前に、現在の状態を保存（`git commit` または `git stash`）しておくと、復元が簡単です。

### テクニック 2：@ でファイルを参照 — 正確なコンテキスト制御

Claude Code はプロジェクトファイルを自動的に読み取れますが、ファイルを明示的に参照することで意図がより明確になり、無関係なファイルへのトークン消費を防げます。

**基本的な使い方：**

曖昧な指定ではなく：

```text
Explain src/utils.ts
```

明示的な参照を使用：

```text
@src/utils.ts Explain this file
```

**高度な使い方：**

**複数ファイルの比較：**
```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**ディレクトリの参照：**
```text
@src/components/ Summarize all components under this directory
```

**特定の行の参照（エディタ使用時）：**
```text
@src/utils.ts:45-60 Explain what this code does
```

**使用のヒント：**

1. **タブ補完**：`@` を入力して Tab を押すと、Claude がカレントディレクトリのファイル一覧を表示し、矢印キーで選択できます
2. **相対パス**：`@./config.json` や `@../shared/types.ts` などの参照をサポート
3. **ファジーマッチング**：部分的なファイル名が許可されます（例：`@utils` は `src/utils.ts` や `src/utils/index.ts` にマッチ）

### テクニック 3：! でコマンドを実行 — ターミナル統合

Claude Code にはコマンド実行機能が組み込まれています。別のターミナルに切り替えることなくコマンドを実行できます。

**基本的な使い方：**

```text
!npm test           # テストを実行
!git status         # Git ステータスを確認
!ls -la             # ファイル一覧を表示
```

**実践的なシナリオ：**

**シナリオ：テストを実行して失敗を分析**
```text
!npm test
# 失敗後
Analyze test failure reasons and fix code
```

**シナリオ：Git diff を確認**
```text
!git diff
# Claude に変更の説明を依頼
Summarize key changes in this diff
```

**シナリオ：プロジェクトをビルド**
```text
!npm run build
# ビルドが失敗した場合
Build failed, help me fix it
```

**安全上の注意：**

機密性の高いコマンド（例：`rm -rf`、`sudo`）の場合、Claude Code は確認を求めます。これは保護機能です。慎重に確認してください。

### テクニック 4：コーディング前に /plan — 複雑なタスクの正しい扱い方

複雑なタスクの場合、いきなりコーディングするのは非効率なことが多いです。`/plan` は計画モードに入ります：まず実装計画を定義し、その後段階的に実行します。

**使い方：**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**Claude が行うこと：**

1. **要件を分析**
2. **現在のプロジェクトとスタックを評価**
3. **段階的な計画を作成**
4. **フィードバックに基づいて議論・調整**

**出力例：**

```text
📋 User Authentication Implementation Plan

Phase 1: Database design
- [ ] Create users table (id, email, password_hash, created_at)
- [ ] Create sessions table (id, user_id, expires_at)

Phase 2: Backend API
- [ ] POST /api/auth/register - register
- [ ] POST /api/auth/login - login
- [ ] POST /api/auth/logout - logout
- [ ] GET /api/auth/me - get current user

Phase 3: Frontend integration
- [ ] Create login page
- [ ] Create register page
- [ ] Add route guards

Phase 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests

Which phase do you want to start with? Or should we adjust the plan?
```

**ベストプラクティス：**

- 30分以上かかるタスクには、まず `/plan` を使用
- フェーズごとに実行し、各フェーズを検証
- 要件が変更された場合、`/plan` を再実行して調整

### テクニック 5：/init で設定を自動生成 — 高速プロジェクト初期化

`/init` は Claude Code の最も強力なコマンドの一つです。プロジェクトを自動的にスキャンし、スタックと構造を特定し、完全な `CLAUDE.md` を生成します。

**使い方：**

```text
/init
```

**Claude が実行：**

1. **プロジェクト構造をスキャン**：フレームワーク/言語/ビルドツールを特定
2. **設定ファイルを分析**：package.json、tsconfig.json などを読み取り
3. **スタイルを推論**：命名規則とファイル構成
4. **CLAUDE.md を生成**

**生成された CLAUDE.md の例：**

```text
# My Project

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Database: Prisma + PostgreSQL

## Common Commands

\`\`\`bash
npm run dev      # start dev server
npm run build    # production build
npm run test     # run tests
npx prisma migrate dev  # DB migration
\`\`\`

## Code Conventions
- Use function components + Hooks
- File naming: PascalCase (components), camelCase (utility funcs)
- Commit style: Conventional Commits
```

**なぜこれが重要か：**

`CLAUDE.md` は Claude Code の「プロジェクトメモリ」です。Claude Code が起動するたびにこのファイルを読み込み、プロジェクトの背景、スタック、規約を理解します。つまり：

- フレームワークやスタックを繰り返し説明する必要がない
- Claude があなたの規約とベストプラクティスに従う
- 新しいチームメンバーのオンボーディングが速くなる

**推奨事項**：プロジェクトの初期化後、すぐに `/init` を実行し、生成された設定を実際に合わせて調整してください。

### テクニック 6：/compact でコンテキストを圧縮 — トークンの節約

Claude Code のコンテキストウィンドウは限られています（通常約200Kトークン）。長い対話は多くのトークンを消費し、コストが増加し、重要な初期情報がコンテキストから押し出される可能性があります。

**使い方：**

```text
/compact
```

**仕組み：**

`/compact` はチャット履歴を分析し、重要な情報（決定事項、生成されたコード、確認された要件）を抽出して簡潔な要約を作成します。その後の対話は、完全な履歴ではなくこの要約に基づいて行われます。

**使用するタイミング：**

- 5〜6ラウンド後
- Claude が以前のコンテキストを「忘れた」ように見えるとき
- 新しいサブタスクに切り替えるが、重要な背景を保持したいとき

**推奨：**

```text
# 長い対話の後に圧縮
/compact

# 作業を継続
Now that user module is done, let's build order module.
```

### テクニック 7：Claude Code を使って Git コミットをサポート

Claude Code では、推奨されるコミットワークフローは次のとおりです：Claude に diff を確認させてコミットメッセージを作成し、その後標準の Git コマンドを実行する。これにより明確で、コミット前にもう一度レビューの機会があります。

公式リファレンス：

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**推奨ワークフロー：**

```bash
# 1. 現在の変更を確認
/diff
!git status

# 2. Claude に要約とコミットメッセージの生成を依頼
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. 確認後、標準の Git コミットを実行
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**このアプローチの利点：**

1. **現在の公式機能との整合性**：削除された組み込み機能への依存なし
2. **透明性**：送信前に diff とコミットメッセージをレビュー
3. **移植性**：同じワークフローが他の AI IDE や純粋な Git でも機能

**「ワンコマンドコミット」体験を希望する場合：**

Claude Code は現在、プラグインベースの拡張を推奨しています。例えば、`commit-commands` は `/commit-commands:commit` などのコマンドを提供します。

```bash
# 1. プラグインマーケットプレイスの例を追加
/plugin marketplace add anthropics/claude-code

# 2. コミットワークフロープラグインをインストール
/plugin install commit-commands@anthropics-claude-code

# 3. プラグインをリロード
/reload-plugins

# 4. プラグインコマンドでコミット
/commit-commands:commit
```

**追加事項：**

- `/commit-commands:commit` はプラグインによって提供されるもので、現在のデフォルトの組み込みコマンドではありません
- コミット前に変更を確認するだけの場合は、`/diff` を使用するか、Claude に `git diff` の説明を依頼することを推奨
- 公式の `/review` も非推奨としてマークされています。類似機能が必要な場合は、プラグインまたは自然言語によるレビューフローを使用してください

### テクニック 8：Shift+Tab で自動承認 — 流暢さの向上

デフォルトでは、Claude はコードを編集する前に確認を求めます。学習中は便利ですが、その後は遅く感じるかもしれません。`Shift+Tab` は自動承認モードを有効にし、より速いイテレーションを可能にします。

**使い方：**

- `Shift+Tab` を押す -> 自動承認モードに入る
- もう一度 `Shift+Tab` を押す -> 自動承認モードを終了

**モードの比較：**

| モード | 動作 | 使用シナリオ |
|------|------|----------|
| デフォルトモード | 各編集で確認を求める | 学習段階、重要なコード |
| 自動承認 | 編集を直接適用 | 熟練後、迅速なイテレーション |

**注意事項：**

- 自動承認モードでは、Claude は確認なしでファイルを直接編集します
- Git と組み合わせて使用し、ロールバックを容易にすることを推奨
- 機密性の高い操作（ファイルの削除、主要設定の変更）では、Claude は確認を求めます

### テクニック 9：Ctrl+C で操作をキャンセル — 緊急ブレーキ

Claude が長時間のタスクを実行している場合や、間違った指示を与えたことに気づいた場合、`Ctrl+C` が緊急ブレーキです。

**使い方：**

- `Ctrl+C` を1回押す -> 現在実行中の操作をキャンセル
- `Ctrl+C` を2回押す -> Claude Code を完全に終了

**使用例：**

- 長時間実行中のコマンドを中断する必要がある
- Claude が大量の無関係なコードを生成している
- 間違った指示を検出し、すぐに停止したい

**Esc ダブル押しとの違い：**

- `Ctrl+C`：実行中の**操作**を停止（コマンドの実行/コードの生成）
- `Esc ダブル押し`：**対話状態**をロールバック（前回のターンを取り消し）

### テクニック 10：/context でコンテキスト使用量を確認 — トークンコストの最適化

`/context` は現在のセッションのコンテキスト使用量を表示し、トークン消費の理解とコストの最適化に役立ちます。

**使い方：**

```text
/context
```

**出力例：**

```text
📊 Context Usage

Token usage: 45,230 / 200,000 (22.6%)
File references: 12 files
Conversation rounds: 8

Top token-consuming files:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Suggestions:
- Current usage is healthy, no compression needed
- To reduce usage, add node_modules into .claudeignore
```

**この情報の活用方法：**

1. **大きなファイルを特定**：あるファイルが多くのトークンを消費している場合、本当に必要か確認
2. **.claudeignore を最適化**：無関係なファイル（node_modules、ビルド出力など）を無視
3. **コンパクトのタイミングを決定**：使用量が70%を超えたら、`/compact` を検討

### テクニック 11：/resume でセッションを復元 — マルチタスクの切り替え

複数のタスクを処理する際、複数の対話スレッドを実行することがあります。`/resume` を使うと、再開することなく、現在のチャットで以前のセッションコンテキストに切り替えられます。

**使い方：**

```text
/resume
```

**仕組み：**

Claude Code は以前のセッションを自動的に記録します。`/resume` を実行すると、以前のセッションコンテキストに切り替わり、以前の議論内容と状態がすべて保持されます。

**使用例：**

**ケース A：並行マルチタスク**
```text
# タスク 1：バグ修正
claude> Fix login-page validation issue
# ... ある対話 ...

# タスク 2：機能追加（新しいスレッド）
claude> Add user registration feature
# ... 別の対話 ...

# タスク 1 に切り替え
claude> /resume
# 以前のバグ修正作業を継続
```

**ケース B：一時的な調べ物の後に戻る**
```text
claude> Explain this algorithm
# ... アルゴリズムについて議論 ...

claude> /resume
# 以前のコーディング作業に戻る
```

**ケース C：中断後の再開**
```text
claude> Continue previous work
# 以前に中断した場合、/resume で戻れます
```

**関連コマンドとの比較：**

| コマンド | 機能 | シナリオ |
|------|------|----------|
| `/resume` | 現在のチャットで前のセッションに切り替え | マルチタスクの切り替え |
| `claude -c` | 最新のセッションを継続 | 終了後の再接続 |
| `claude -r` | 以前のセッションを復元 | 終了後の以前の状態の復旧 |
| `Esc ダブル押し` | 1ターンをロールバック | 最新の対話ターンの取り消し |

**提案：**

1. **マルチタスク管理**：`/resume` はコンテキストを再説明するより効率的
2. **セッションメモリ**：各セッションには独立したコンテキストがあり、`/resume` はそれを保持
3. **/compact と併用**：長いセッションでは、まずコンパクトしてから resume で切り替えることでコンテキストをクリーンに保つ

---

## コア設定

適切な設定は、Claude Code がプロジェクトやチームにより適合するのに役立ちます。このセクションでは、設定の役割、優先度、および異なる使用シナリオに応じた最適化について説明します。

### 設定ファイルの場所と優先度

Claude Code は階層型設定戦略を使用しています。異なるレベルには異なるスコープと優先度があります。これを理解することで、設定を柔軟に管理できます。

**設定の優先度（高から低）：**

| 場所 | スコープ | 目的 | Git にコミット |
|------|--------|------|--------------|
| `.claude/settings.local.json` | ローカルプロジェクト | 個人の設定 | ❌ いいえ |
| `.claude/settings.json` | プロジェクト共有 | チーム全体の設定 | ✅ はい |
| `~/.claude/settings.json` | グローバル | 個人のデフォルト | ❌ いいえ |

**マージルール：**

- 優先度の高い設定が、低い優先度の同じキーを上書き
- 競合しないキーはマージされる
- プロジェクト設定がグローバル設定を上書き
- ローカルの個人設定が共有プロジェクト設定を上書き

**実践的なシナリオ：**

**シナリオ 1：チームプロジェクト**
```text
~/.claude/settings.json          # 個人のデフォルトエディタ設定
.claude/settings.json            # チームのコーディング規約と権限設定
.claude/settings.local.json      # 個人のデバッグ設定とテーマ設定
```

**シナリオ 2：個人プロジェクト**
```text
~/.claude/settings.json          # グローバルデフォルト設定
.claude/settings.json            # プロジェクト固有の設定（例：特別な権限ルール）
```

### CLAUDE.md - プロジェクトメモリ

`CLAUDE.md` は Claude Code の設定において最も重要なファイルです。プロジェクトの「マニュアル」のような役割を果たします。Claude Code が起動するたびに、カレントディレクトリの `CLAUDE.md` を読み込み、背景、スタック、規約を理解します。

**なぜ CLAUDE.md がこれほど重要なのか：**

新しいプロジェクトに参加する場面を想像してください：スタック、コーディング規約、よく使うコマンドを学ぶ必要があります。通常、これにはドキュメントやコードの確認、チームメイトへの質問に何時間もかかります。`CLAUDE.md` があれば、Claude は起動時にこれを把握しており、すぐに効果的に協力できます。

**最小限のテンプレート：**

```text
# [プロジェクト名]

## Tech Stack
- Framework: React 18 + TypeScript
- State: Zustand
- Styling: Tailwind CSS
- Build tool: Vite

## Common Commands

\`\`\`bash
npm run dev      # 開発サーバーを起動（ポート 5173）
npm run test     # ユニットテストを実行
npm run build    # プロダクションビルド
npm run lint     # リントチェック
\`\`\`

## Code Conventions
- Components use function components + Hooks
- Naming: PascalCase (components), camelCase (utility funcs)
- Git commits use Conventional Commits
- All API calls must go through unified request wrapper
```

**完全なテンプレート（推奨）：**

```text
# [プロジェクト名]

## Project Overview
主な機能とターゲットユーザーを一文で説明。

## Tech Stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend（該当する場合）
- Runtime: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Project Structure

\`\`\`
src/
├── components/      # 再利用可能なコンポーネント
├── pages/           # ページコンポーネント
├── hooks/           # カスタム Hooks
├── lib/             # ユーティリティ関数
├── types/           # TypeScript 型
└── api/             # API 呼び出し
\`\`\`

## Common Commands

\`\`\`bash
# 開発
npm run dev              # 開発サーバーを起動
npm run dev:mock         # 開発時にモックデータを使用

# テスト
npm run test             # すべてのテストを実行
npm run test:watch       # ウォッチモード
npm run test:coverage    # カバレッジレポートを生成

# コード品質
npm run lint             # ESLint チェック
npm run lint:fix         # ESLint の問題を自動修正
npm run format           # Prettier フォーマット
npm run typecheck        # TypeScript 型チェック

# ビルド
npm run build            # プロダクションビルド
npm run preview          # プロダクションビルドをプレビュー
\`\`\`

## Development Rules
### Code style
- Use function components, avoid class components
- Prefer custom Hooks for logic abstraction
- Component props must define TypeScript interfaces

### Git workflow
- Branch prefix: `feature/`, `fix/`, `refactor/`
- Commit messages follow Conventional Commits
- PR must pass CI and code review

### Performance requirements
- Component lazy loading to reduce first-screen load time
- Use WebP images and enable lazy loading
- Keep API response time under 200ms

## Environment Variables

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Common Issues

### Dev server failed to start?

Check whether port 5173 is occupied, or try `npm run dev -- --port 3000`

### Type errors?

Run `npm run typecheck` to see detailed errors
```

**CLAUDE.md の高速生成：**

プロジェクトが存在するが `CLAUDE.md` がない場合、`/init` を実行：

```bash
claude
# Claude Code 内で
/init
```

Claude はプロジェクト構造、package.json、現在のコードを分析し、実用的な `CLAUDE.md` を生成します。生成後、手動で確認・調整してください。

### .claudeignore - トークンの節約

`.claudeignore` は Claude Code にどのファイルをコンテキストに読み込まないかを指示します。正しい設定により、トークン使用量を大幅に削減（通常40〜60%）し、応答速度を向上できます。

**なぜ .claudeignore が必要なのか：**

Claude Code がプロジェクトを理解しようとするとき、関連ファイルを読み込みます。一部のファイルは理解に役立たず、次のような問題を引き起こす可能性があります：
- 多くのトークンを消費（例：node_modules 内の型定義ファイル）
- ノイズを導入（ログ、ビルド出力）
- 機密情報を含む（.env ファイル）

**推奨設定：**

```text
# ===== 依存関係 =====
# 巨大なサードパーティコード、通常 Claude のコンテキストには不要
node_modules/
.pnp/
.pnp.js

# ===== ビルド出力 =====
# 生成された成果物、ソースロジックではない
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== ログ =====
# 実行時ログ、アーキテクチャ理解に価値なし
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== テスト出力 =====
coverage/
.nyc_output/

# ===== エディタ / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== システムファイル =====
.DS_Store
Thumbs.db

# ===== 環境ファイル =====
.env
.env.local
.env.*.local

# ===== 大きなバイナリアセット =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== ロックファイル（オプション） =====
# Claude に依存バージョンの分析をさせたくない場合は無視
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**設定のヒント：**

1. **最小限で開始**：まず node_modules とビルド出力を無視し、トークン使用量を観察
2. **プロジェクトに応じて調整**：画像中心のプロジェクト -> 画像形式を無視、ドキュメントプロジェクト -> Markdown を保持
3. **定期的に最適化**：`/context` でトークン消費の多いファイルを確認し、無視するかどうかを判断

### 権限設定

デフォルトでは、Claude Code は機密性の高い操作の前に確認を求めます。`settings.json` の `permissions` を通じて、どの操作を自動許可するか、確認を求めるか、完全に拒否するかを制御できます。

**権限設定の構造：**

```json
{
  "permissions": {
    "allow": [
      // 確認なしで自動許可
    ],
    "ask": [
      // 実行前に確認
    ],
    "deny": [
      // 完全に拒否
    ]
  }
}
```

**ルールの構文：**

権限ルールは `ActionType(pattern)` 形式を使用：

| アクションタイプ | 説明 | 例 |
|----------|------|------|
| `Bash` | ターミナルコマンドを実行 | `Bash(git status)` |
| `Edit` | ファイルを編集 | `Edit(src/**/*.ts)` |
| `Read` | ファイルを読み取り | `Read(README.md)` |
| `Write` | ファイルを作成 | `Write(src/components/*.tsx)` |

**ワイルドカードのサポート：**

- `*` は任意の文字にマッチ（`/` を除く）
- `**` は任意のパスにマッチ
- `?` は1文字にマッチ

**実際の設定例：**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**設定の提案：**

1. **開発段階**：より緩やかな権限で迅速なイテレーション
2. **プロダクション段階**：より厳格な権限、特にデプロイと機密データ操作
3. **チーム協力**：ベースラインルールを共有の `settings.json` に配置、個人の調整は `settings.local.json` に

### Rules ディレクトリ

大規模なプロジェクトでは、単一の `CLAUDE.md` が肥大化して保守が難しくなります。Claude Code は**Rules ディレクトリ**によるモジュール管理をサポートしており、規約をトピックごとに別々のファイルに分割できます。

**ディレクトリ構造：**

```text
.claude/
├── settings.json          # メイン設定ファイル
├── CLAUDE.md              # プロジェクト概要（引き続き必要）
└── rules/                 # ルールディレクトリ
    ├── 00-security.md     # セキュリティルール（グローバル）
    ├── 01-coding-style.md # コーディングスタイルのルール（グローバル）
    ├── 10-api.md          # API 開発ルール
    ├── 11-frontend.md     # フロントエンド開発ルール
    ├── 12-backend.md      # バックエンド開発ルール
    └── 20-testing.md      # テストルール
```

**ファイル名の提案：**

数字プレフィックス（`00-`、`01-`）を使用して読み込み順序を制御：基本ルールを先に、特定ルールを後に。

**ルールファイルの形式：**

ルールファイルは YAML frontmatter をサポートして適用範囲を定義：

```markdown
---
# オプション：このルールが適用されるパス
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# オプション：このルールが適用されるコマンド
commands:
  - "generate api"
  - "create endpoint"

# オプション：ルールの優先度（数字が小さいほど優先度が高い）
priority: 10
---

# API Development Rules

## Route design
- RESTful style, use plural nouns
- Versioning: /api/v1/users
- Nested resources: /api/v1/users/123/orders

## Request/response format
- Use JSON consistently
- Error response must include code and message
- Pagination response uses { data, pagination } structure

## Security requirements
- All endpoints must verify authentication (except public endpoints)
- Sensitive operations require secondary confirmation
- Implement rate limiting to prevent abuse
```

**ルールの継承と上書き：**

- グローバルルール（frontmatter なし、または `globs: *`）はすべてのファイルに適用
- パス固有のルールはマッチしたファイルにのみ適用
- ルールが競合する場合、優先度の高いルールが優先
- 特定のルールがグローバルルールを上書き可能

**使用シナリオの例：**

**シナリオ 1：フロントエンド・バックエンド分離プロジェクト**
```text
.claude/rules/
├── 00-general.md          # 一般的な基準（コミットメッセージ、命名）
├── 10-backend.md          # バックエンド基準（NestJS 固有）
├── 11-frontend.md         # フロントエンド基準（React 固有）
└── 20-database.md         # データベース基準（Prisma 固有）
```

**シナリオ 2：マイクロサービスアーキテクチャ**
```text
.claude/rules/
├── 00-global/             # グローバルルール
│   ├── security.md
│   └── logging.md
├── 10-services/           # サービス固有のルール
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # 共有コンポーネントのルール
    ├── shared-lib.md
    └── common-utils.md
```

**移行の推奨事項：**

既に非常に大きな `CLAUDE.md` がある場合、次のように Rules ディレクトリに移行：

1. `.claude/rules/` を作成
2. `CLAUDE.md` をトピックごとに分割
3. 各ルールファイルに適切な frontmatter を追加
4. `CLAUDE.md` をプロジェクト概要として保持し、詳細な基準を外部に移動
5. テストしてルールの読み込みが正しく動作することを確認

---

## コア操作コマンド

Claude Code は効率的な AI 協力のための豊富な操作コマンドを提供します。これらのコマンドは、スラッシュコマンド（組み込み機能）、記号システム（短縮操作）、自然言語指示（日常の開発）のカテゴリに分類されます。

### スラッシュコマンドクイックリファレンス

スラッシュコマンドは `/` で始まる組み込み操作です。プロジェクトの初期化、設定管理、ステータス確認などの標準化されたアクションを提供します。

| コマンド | 機能 | 使用シナリオ |
|------|------|----------|
| `/help` | すべてのコマンドを表示 | コマンドを忘れたときのクイック検索 |
| `/init` | プロジェクトを初期化して CLAUDE.md を生成 | 新規プロジェクトや設定の追加 |
| `/plan` | 計画モードに入る | 複雑なタスクの前に計画を作成 |
| `/clear` | 対話履歴をクリア | コンテキストが混乱したときの再開 |
| `/compact` | コンテキストを圧縮 | 長い対話後のトークン節約 |
| `/diff` | インタラクティブな差分ビューを開く | 現在の未コミット変更の確認 |
| `/plugin` | プラグインを管理 | コミット/レビュー拡張のインストール |
| `/context` | コンテキスト使用量を表示 | トークンコストの最適化 |
| `/cost` | セッションコストを表示 | 使用コストの監視 |
| `/config` | 設定パネルを開く | 設定の更新 |
| `/permissions` | 権限管理 | 操作権限の調整 |
| `/model` | モデルを切り替え | 異なるモデルの選択 |

**コマンド組み合わせの例：**

```bash
# 完全な開発ワークフロー
/plan                    # 1. 計画を作成
# ... 開発を実行 ...
/diff                    # 2. 変更を確認
Generate a commit message from current diff
!git add -A              # 3. 変更をステージ
!git commit -m "..."     # 4. コミット
/cost                    # 5. コストを確認
```

### 記号システム

記号システムは Claude Code の短縮操作メカニズムです。特殊記号で特定の機能を素早く起動できます。

| 記号 | 名称 | 目的 | 例 |
|------|------|------|------|
| `/` | スラッシュコマンド | 組み込み操作を実行 | `/help`、`/plan` |
| `@` | アット参照 | ファイル/ディレクトリを参照 | `@src/app.tsx` |
| `!` | バングモード | ターミナルコマンドを実行 | `!npm test` |
| `&` | バックグラウンド実行 | タスクをバックグラウンドで実行 | `&npm run dev` |

**記号の組み合わせのヒント：**

```bash
# 記号を組み合わせる
@src/utils.ts !npm test
# 意味：utils.ts を読み込み、テストを実行

@src/components/ @src/pages/ compare structures of these two directories
# 意味：2つのディレクトリを同時に参照して比較

!git diff @src/app.tsx explain these changes
# 意味：Git diff を確認し、Claude に特定のファイルの変更を説明させる
```

### ファイル操作

ファイル操作は最も一般的な日常アクションです：ファイルの読み取り、編集、作成、削除。

**ファイルの読み取り：**

```bash
# 基本的な読み取り
@src/app.tsx explain this file

# 読み取り + 分析
@src/utils/helpers.ts find potential performance issues

# 比較読み取り
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**ファイルの編集：**

```bash
# 簡単な編集
Modify formatDate in src/utils/date.ts to support Chinese locale format

# 複雑な編集
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# バッチ編集
Convert all class components under src/components/ into function components
```

**ファイルの作成：**

```bash
# 1つのファイルを作成
Create src/components/UserCard.tsx, a card component to display user info

# 関連ファイルを作成
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**ファイルの削除：**

```bash
# 確認付きで削除
Delete src/old-component.tsx (this component is no longer used)

# Claude が確認を求め、まず参照を確認することを提案する場合があります
```

### Git 操作

Claude Code は Git と深く統合されており、ターミナルを離れることなく完全なバージョン管理ワークフローを完了できます。

**ステータスの確認：**

```bash
# Git ステータスを表示
Show git status and uncommitted changes

# 詳細な diff
!git diff
Explain changes in src/api/users.ts
```

**コミットの作成：**

```bash
# 変更を確認
/diff

# コミットメッセージを生成
Generate a Conventional Commit message from current git diff

# 手動でコミット
!git add -A
!git commit -m "..."
```

**ブランチ操作：**

```bash
# フィーチャーブランチを作成
!git checkout -b feature/user-authentication

# 実装後
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**完全な Git ワークフローの例：**

```bash
# 1. 新機能を開始
!git checkout -b feature/payment-integration

# 2. 機能を開発（Claude のサポート付き）
Create payment module with Alipay and WeChat Pay

# 3. テストを実行
!npm test

# 4. 変更を確認
/diff

# 5. コミットメッセージを生成して確認
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. リモートにプッシュ
!git push -u origin feature/payment-integration

# 7. PR を作成（オプション、GitHub CLI 使用）
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### コード操作

コード操作は Claude Code のコアの強みです：生成、説明、リファクタリング、最適化。

**コードの生成：**

```bash
# コンポーネントを生成
Create a React Hook to manage auth state, including login/logout/permission checks

# ユーティリティ関数を生成
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# 完全なモジュールを生成
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**コードの説明：**

```bash
# 行ごとの説明
Explain src/algorithms/quicksort.ts line by line

# 高レベルの説明
@src/services/payment.ts explain architecture design of this module

# 複雑なロジックの説明
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**コードのリファクタリング：**

```bash
# アーキテクチャのリファクタリング
Convert class components in src/components/ to function components

# パフォーマンスのリファクタリング
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# クリーンアップのリファクタリング
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**コードのデバッグ：**

```bash
# エラー分析
npm test failed, analyze root cause and fix it

# パフォーマンス分析
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# ログ分析
!cat logs/error.log
Analyze these error logs and identify root cause
```

### テスト操作

テストは品質保証に不可欠です。Claude Code はテストの生成、テストの実行、結果の分析をサポートします。

**テストの生成：**

```bash
# ユニットテスト
Generate unit tests for src/utils/math.ts, including boundary cases

# コンポーネントテスト
Generate React Testing Library tests for src/components/UserForm.tsx

# 統合テスト
Create integration test for user registration flow from form submission to DB write
```

**テストの実行とデバッグ：**

```bash
# テストを実行
!npm test

# 失敗したテストをデバッグ
Analyze failure reasons and fix
@tests/auth.test.ts

# カバレッジの確認
!npm run test:coverage
Which code paths are not covered?
```

**テスト戦略の提案：**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### コマンドのチェーンとワークフローの構成

Claude Code を最も効率的に使用する方法は、コマンドを完全なワークフローにチェーンすることです。

**シナリオ 1：バグ修正ワークフロー**

```bash
# 1. 問題を確認
!npm test
Tests failed, analyze why

# 2. 問題を特定
@src/utils/validation.ts Is the issue in this file?

# 3. 問題を修正
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. 修正を確認
!npm test

# 5. 修正をコミット
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**シナリオ 2：コードレビューワークフロー**

```bash
# 1. 変更を確認
!git diff --stat
Which files changed?

# 2. 詳細なレビュー
@src/components/ Review these component changes

# 3. 改善を提案
What improvements should be made based on this review?

# 4. 改善を実装
Optimize performance of UserList component

# 5. 最終レビュー
/diff
Review current changes and point out potential risks and improvements
```

**シナリオ 3：新機能ワークフロー**

```bash
# 1. まず計画
/plan
I want to add shopping cart feature

# 2. ブランチを作成
!git checkout -b feature/shopping-cart

# 3. 機能を実装
Implement step by step according to plan

# 4. テストを追加
Generate tests for shopping cart module

# 5. テストを実行
!npm test

# 6. コードレビュー
/diff
Please do a code review on current diff

# 7. コミット
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## よくある質問

Claude Code の使用中に様々な問題に遭遇する可能性があります。このセクションでは、よくある問題と解決策をまとめています。

### トークンの消費が速すぎる？

トークンの急速な消費は最も一般的な問題の一つです。以下に完全な最適化戦略を示します。

**診断：**

まず `/context` を実行して現在のトークン使用量を確認：

```text
/context
```

次に注目：
- **トークン使用率**：70%を超える場合、コンテキストの圧縮を検討
- **参照ファイル数**：ファイルが多いほどトークン消費が高い
- **大きなファイル**：どのファイルが最もトークンを消費しているか確認

**最適化戦略：**

**1. .claudeignore を改善**

`.claudeignore` に不要なファイルが含まれていることを確認：

```text
# 必ず無視
node_modules/
dist/
build/
*.log
.env

# プロジェクト固有
# React
.next/
out/

# Vue
.nuxt/
.output/

# 一般
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. 定期的にコンテキストを圧縮**

長い対話は多くのトークンを蓄積します。5〜6ラウンドごとに `/compact` を実行することを推奨：

```text
# 長い対話の後に
/compact

# 継続
Now let's implement order module...
```

**3. ファイルを正確に参照**

必要がない場合、ディレクトリ全体の参照を避ける：

```bash
# 非推奨
@src/ Explain this code

# 推奨
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. 巨大なファイルの読み取りを避ける**

`/context` で1つのファイルが多くのトークンを消費している場合、検討：
- 本当に必要か？
- 一部だけを参照できるか？
- このファイルをより小さなモジュールに分割できるか？

### Claude がプロジェクトを理解しない？

Claude の回答が不正確だったり、基本的なプロジェクト情報を繰り返し尋ねる場合、プロジェクトコンテキストが不足しています。

**解決策：**

**1. CLAUDE.md を生成**

`/init` を実行してプロジェクト設定を生成：

```bash
/init
```

生成後、確認：
- プロジェクトの概要は正確か？
- スタックは完全か？
- よく使うコマンドは正しいか？
- コーディング規約は明確か？

**2. CLAUDE.md を手動で編集**

自動生成された設定が十分に詳細でない場合、追加：

```markdown
## Project-Specific Information

### Architecture Decisions
- Why choose X over Y?
- What are core design patterns?

### Common Pitfalls
- When using useEffect, watch out for...
- DB queries must...

### Third-Party Integrations
- Payments via Stripe
- Email via SendGrid
- File storage via AWS S3
```

**3. Rules ディレクトリを使用**

大規模なプロジェクトでは、規約を Rules で整理：

```text
.claude/rules/
├── 00-architecture.md    # アーキテクチャ概要
├── 01-coding-style.md    # コーディングスタイル
├── 10-frontend.md        # フロントエンドルール
├── 11-backend.md         # バックエンドルール
└── 20-testing.md         # テストルール
```

**4. 必要に応じてプロンプトにコンテキストを追加**

特定のタスクについては、関連する背景を追加：

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### 操作をロールバックする方法は？

Claude Code は異なるシナリオに対応する複数のロールバックメカニズムを提供しています。

**シナリオ 1：対話状態のロールバック**

誤入力や気に入らない応答の場合：

```text
Esc ダブル押し  -> 前回のターンをロールバック
Esc トリプル押し  -> すべての対話履歴をクリア
```

**注意**：これは対話状態のみをロールバックし、ファイルの編集はロールバックしません。

**シナリオ 2：ファイル編集の取り消し**

Claude が既にファイルを変更している場合、手動で取り消し：

```bash
# 変更を確認
!git status
!git diff

# 1つのファイルを元に戻す
git checkout -- src/utils/helpers.ts

# すべての作業ツリーの変更を元に戻す
git checkout -- .

# 既にコミット済みの場合
# ソフトロールバック（変更を保持）
git reset --soft HEAD~1

# ハードロールバック（変更を破棄）
git reset --hard HEAD~1
```

**シナリオ 3：予防的な Git ワークフローの使用**

ベストプラクティス：Claude セッションの前に現在の作業を保存：

```bash
# 開始前に現在の状態を保存
git add .
git commit -m "WIP: before Claude Code session"
# または stash を使用
git stash push -m "before claude"

# Claude Code で開発...

# 結果が満足できない場合、完全にロールバック
git reset --hard HEAD~1
# または
git stash pop
```

### 権限の確認プロンプトが多すぎる？

頻繁な権限確認は効率を低下させます。適切な権限設定により、ワークフローをよりスムーズにできます。

**権限モデル：**

Claude Code の権限は3つのレベル：
- **allow**：自動許可
- **ask**：実行前に確認
- **deny**：完全に拒否

**最適化設定：**

`.claude/settings.json` を編集：

```json
{
  "permissions": {
    "allow": [
      // Git 読み取り操作
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // テストとチェック
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // 開発サーバー
      "Bash(npm run dev:*)",

      // ソースコードの編集
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git 書き込み操作
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // パッケージ管理
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // ビルドとデプロイ
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // 設定ファイルの編集
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // 機密ファイルの読み取り
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // 危険なコマンド
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // システムファイル
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git 内部
      "Edit(.git/*)"
    ]
  }
}
```

**段階的な権限戦略：**

- **学習段階**：デフォルトを維持し、Claude が何を実行しようとしているか理解
- **習熟段階**：よく使う安全な操作（git status、npm test など）を allow に追加
- **高効率段階**：プロジェクトの特性に基づいてきめ細かいルールを作成

### 中国本土での使用方法

ネットワークの制約により、中国のユーザーは Anthropic の公式サービスに直接アクセスできない場合があります。いくつかの選択肢を紹介します。

**選択肢 1：API プロキシサービスを使用**

多くのクラウドプロバイダーが Anthropic 互換の API プロキシサービスを提供：

```bash
# 環境変数を設定
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# Claude Code を起動
claude
```

**選択肢 2：サードパーティの Claude Code 互換ツールを使用**

一部の国内プロバイダーが互換ツールを提供：

```bash
# 互換バージョンをインストール
npm install -g @some-provider/claude-code

# API キーを設定
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**選択肢 3：他の AI コーディングツールを使用**

Claude Code が利用できない場合、代替を検討：

| ツール | 特徴 | 使用シナリオ |
|------|------|----------|
| Cursor | VS Code ベース、フル機能 | フル IDE 体験 |
| GitHub Copilot | 強力な自動補完 | 主にコード補完 |
| 通義霊碼 | 国内製品、中国で安定 | 国内開発環境 |
| Codeium | 寛大な無料枠 | 予算制限 |

**選択肢 4：AI エージェントに設定を手伝ってもらう**

設定方法が不明な場合、AI エージェントに依頼：

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**よくある質問：**

- **Q：設定後も接続できない？**
  - A：API エンドポイントの正確性を確認、`/v1` パスを含むか
  - A：API キーの有効性と残高を確認
  - A：ローカルネットワークにプロキシが必要か確認

- **Q：応答が遅い？**
  - A：地理的に近いプロバイダーを選択
  - A：一般的な API プランではなくコーディング最適化プランを使用
  - A：`/compact` を使用してトークン使用量を削減

- **Q：一部の機能が利用できない？**
  - A：一部のサードパーティプロバイダーはすべての Claude Code 機能を完全にサポートしていない可能性
  - A：プロバイダーのドキュメントでサポートされる機能範囲を確認

---

## 参考リソース

- [Claude Code 公式ドキュメント](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
