# Vibe CodingからSpec Codingへ：AIプログラミングの進化

> "Code is a lossy projection of intent."
> コードは意図の損失のある投影である。
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Spec Codingの核心思想：すべてはMarkdown

Spec Codingに入る前に、まずClaude Codeの根底にある哲学を理解しましょう：**すべてはMarkdown**。

Claude Codeの設計哲学では、プロセス記録、情報伝達、モデルとの会話まですべてがMarkdownです：

- **CLAUDE.md**：プロジェクト規約のためのMarkdownドキュメント
- **.claude/rules/**：階層化されたMarkdownルールファイルのコレクション
- **specs/**：機能要件のMarkdown記述
- **会話履歴**：Claude Codeのチャット記録自体がMarkdown形式
- **AGENTS.md**：エージェントの動作を定義するMarkdown指示

これこそがSpec Codingの核心です：**仕様自体がコードである**。要件、設計決定、受け入れ基準をMarkdownで書くとき、あなたはすでに「コード」を書いています - AIがそのMarkdownを読み取り、実際の実装を生成します。

Josh BeckmanによるGroveの講演の要約が見事に捉えています：

> "Software engineering (and lawmaking and legal review) is specification repair."
> ソフトウェアエンジニアリング（および法律制定と法的審査）は仕様の修復である。

Claude Codeでは、この「仕様の修復」プロセスは：**Markdownの修正 -> AIがMarkdownを読み取り -> コードの生成/修正 -> 結果の検証**。全ワークフローはMarkdown駆動です。

---

## 1. Sean Groveの「The New Code」：考え方を変える講演

2025年、OpenAIの研究者**Sean Grove**がAI Engineer World's Fairで**「The New Code」**という講演を行い、開発者コミュニティ全体に衝撃を与えました。彼は破壊的なアイデアを提起しました：**70年間、問題を解決するためにコードを書いてきたが、コードは意図の損失のある投影に過ぎない - 仕様こそが本当の「新しいコード」である。**

この講演から新しい開発パラダイムが生まれました：**Spec Coding** - コードではなく仕様ドキュメントを開発の中核成果物とし、AIに仕様からコードを生成させる。

Groveの講演を出発点として、この記事はSpec Codingの核心思想の理解、Vibe Codingの限界の振り返り、そしてClaude Codeでの実際の開発にこの方法論を適用する方法を説明します。

::: info :books: 学ぶこと

1. Sean Groveの「The New Code」講演の核心的なアイデアを理解
2. Spec Codingの核心概念と方法論を習得
3. Vibe Codingの価値と限界の両方を認識
4. Claude CodeでSpec Codingワークフローを実践する方法を学ぶ
5. Vibe CodingからSpec Codingへの段階的移行戦略を習得

:::

---

## 1. Sean Groveの「The New Code」：考え方を変える講演

2025年、OpenAIの研究者Sean GroveがAI Engineer World's Fairで**「The New Code」**という講演を行いました。この講演はSpec Codingムーブメントの知的出発点として広く見なされています。

Groveは以前OneGraphを創業しました。これはGraphQL開発者ツール企業で、後にNetlifyに買収され、現在はOpenAIでアライメント推論に取り組んでいます - 高レベルの意図を実行可能な仕様と評価基準に変える仕事です。

### 1.1 核心的主張：コードは意図の損失のある投影

Groveの講演の核心概念は1文で要約できます：

> **Code is a lossy projection of intent.**
> コードは意図の損失のある投影である。

これはどういう意味か？頭の中にアイデアがあり、それをコードに変換するとき、膨大な量のコンテキストが途中で失われます - なぜこのアプローチを選んだ**のか**、どのようなトレードオフを**検討したか**、どの制約が**重要だったか**。最終的なコードは「どうやるか」だけを保持し、「なぜこうすべきか」を失っている。

本をツイートに圧縮するようなもので - 情報密度が急激に低下し、本来の意図が大幅に劣化する。

### 1.2 プログラミングの本質はコミュニケーション

Groveはシンプルだが深遠なアイデアを提示しました：

> "If you can communicate effectively, you can program."
> 効果的にコミュニケーションできれば、プログラミングできる。

実際のコーディング作業は開発の**10-20%**に過ぎないと彼は主張します。残りの80%は要件と目標を巡る**構造化されたコミュニケーション** - ユーザーが何を望むかの理解、チームとのソリューションの合意、受け入れ基準の定義、エッジケースの処理。

つまり、プログラミング能力の核心は特定の言語の構文の習得ではなく、**曖昧な意図を正確な記述に変換する能力**である。

### 1.3 仕様を書く人がプログラマーである

これがGroveの最も破壊的なアイデアです：

> "Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer."
> 仕様を書く人 - PMであれ、法律家であれ、エンジニアであれ、マーケターであれ - が今やプログラマーである。

AIが仕様をコードに変換するのがますます上手になるにつれて、**本当のプログラミング作業**は「コードを書くこと」から「仕様を書くこと」へとシフトする。意図を最も正確に表現できる人が最も価値のある「プログラマー」になる。

### 1.4 仕様はコードのようなツールチェーンを持てる

Groveは、仕様がコードと同じように完全なツールチェーンを持てることを指摘しました：

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **合成**：仕様はモジュール化・合成可能、コードモジュールのように
- **テスト**：仕様に単体テストを埋め込み、動作が期待通りか検証
- **リント**：仕様内の曖昧な表現を検出、リンターが構文の問題を見つけるように
- **一貫性チェック**：部門間の仕様の一貫性をチェック、型チェッカーのように

### 1.5 OpenAI Model Spec：生きた証拠

GroveはOpenAI自身の**Model Spec**ドキュメントを証拠として使用しました。

OpenAIがおべっか問題を発見したとき、モデルを再トレーニングしませんでした。代わりに**仕様ドキュメントを修正**しました。変更はシステム全体に自動的に伝播し、問題は修正されました。

これは重要なポイントを証明しています：**仕様自体が実行可能なコードのように機能できる**。仕様の変更は動作の変更と同等であり、従来のコードを1行も触れることなく。

Josh BeckmanによるGroveの講演の要約が見事に捉えています：

> "Software engineering (and lawmaking and legal review) is specification repair."
> ソフトウェアエンジニアリング（および法律制定と法的審査）は仕様の修復である。

---

## 2. Spec Coding：仕様としてのコード

### 2.1 Spec Codingとは

Spec Coding（Spec-Driven Development / SDDとも呼ばれる）は、**仕様ドキュメントを開発の中核成果物**として扱う方法論です。

核心的なアイデア：**まず仕様を明確に書き、その後AIにその仕様からコードを生成させる。仕様が真実のソースであり、コードはそこから派生した実装成果物に過ぎない。**

Robert C. Martinの*Clean Code*からの古典的な声明は、AI時代において新たな関連性を持ちます：

> "Specifying requirements so precisely that a machine can execute them is programming."
> 機械が実行できるほど正確に要件を指定することがプログラミングである。

### 2.2 Vibe CodingとSpec Codingの比較

| 次元 | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **アプローチ** | 即興プロンプト、反復的なやり取り | まず完全な仕様を書き、その後コードを生成 |
| **最適な用途** | プロトタイプ、ハッカソン、探索 | 本番システム、チームコラボレーション、エンタープライズワーク |
| **コード品質** | 高速だが脆弱 | 構造化、テスト可能、監査可能 |
| **初回成功率** | 不安定 | 95%以上を目指す |
| **再利用性** | 一回限りのプロンプト | 仕様はプロジェクト間で再利用可能 |
| **セキュリティ** | 見落としやすい | 仕様レイヤーに組み込み |
| **ドキュメント** | 欠落または常に遅れをとる | 仕様がドキュメントであり、常に保守される |
| **チームコラボレーション** | 個人のプロンプトスキルに依存 | 共有仕様、共有基準 |

両者は対立するものではありません。Brad Jolicoeurが指摘するように：

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> 優れたエンジニアは、バイブコーディングを最初のステップとして使い、仕様の初期ドラフトを生成することさえある。

### 2.3 Spec Codingの3層仕様構造

Red Hatのエンジニアが実践的な3層仕様モデルをまとめました：

**第1層：機能仕様（What）**

期待される結果を自然言語で記述し、「何をするべきか」に答える：

```markdown
## ユーザー認証機能

### ユーザーストーリー
- 新しいユーザーとして、メールで登録したい
- 登録済みユーザーとして、メールとパスワードでログインしたい
- パスワードを忘れたユーザーとして、メールでリセットしたい

### 受け入れ基準
- 登録時にメール形式とパスワード強度を検証
- ログイン失敗が5回連続したら、アカウントを15分間ロック
- パスワードリセットリンクは30分間有効
```

**第2層：言語非依存仕様（How - アーキテクチャ層）**

データ構造、アーキテクチャパターン、セキュリティ要件を定義：

```markdown
## 技術設計

### データモデル
- usersテーブル：id, email, password_hash, created_at, locked_until
- sessionsテーブル：id, user_id, token, expires_at

### API設計
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### セキュリティ要件
- パスワードはbcryptでコストファクター12以上
- JWTは15分で期限切れ、リフレッシュトークンは7日間
- すべてのエンドポイントでレート制限を有効化
```

**第3層：言語固有仕様（How - 実装層）**

バージョン要件、テストフレームワーク、ドキュメント基準：

```markdown
## 実装の制約

### 技術スタック
- ランタイム：Node.js 20以上
- フレームワーク：Express 5
- ORM：Prisma
- テスト：Vitest

### コード規約
- TypeScript strictモードを使用
- エラー処理にはカスタムAppErrorクラスを使用
- すべてのAPIエンドポイントにJSDocコメントが必要
```

---

## 3. Claude CodeでSpec Codingを実践する

理論を理解した後の次の質問は、Claude Codeでどう適用するかです。Claude Codeの設計哲学は自然にSpec Codingに適合しています - `CLAUDE.md`、Rulesディレクトリ、`/plan`コマンドはすべて仕様駆動開発の形式です。

OpenAI自体がCodexでプロジェクトを構築する際、似たようなパターンを使用しています：`AGENTS.md`ファイルを仕様として使用しAIエージェントをガイド。彼らの核心的な教訓はこれです：**エージェントが苦労したら、それをシグナルとして扱う - 何が欠けているか（ツール、ガードレール、ドキュメント）を特定し、それをリポジトリに追加する**。これはSpec Codingと完全に一致：仕様は生きた成果物であり、進化し続けるべき。

Augment Codeの研究も同じ結論をサポートしています：**実行可能な仕様は正確であり続ける。なぜならAIエージェントが直接コードを生成するため、強制力が生じる - 古くなった仕様は壊れた実装を生み出すから**。つまり、仕様は従来のドキュメントのように腐敗しない。

### 3.1 ステップ1：`CLAUDE.md`でプロジェクト仕様を確立

`CLAUDE.md`はプロジェクトの「生きた仕様」です。Claude Codeが起動するたびにこのファイルを読み取り、AIに永続的なプロジェクトハンドブックを与えるのに相当。

以前の章[Claude Codeクイックスタートコアガイド](../basics/)で、`CLAUDE.md`の作成方法を学びました。Spec Codingの文脈では、その役割はさらに重要になります - **設定ファイルではなく、プロジェクト仕様へのエントリーポイント**です。

LogRocketのエンジニアは、**確かなコンテキストがAIエージェントにとって重要**であることを強調しています。なぜなら、ハルシネーションと非効率を防ぐから。仕様がないと、AIエージェントはプロジェクトに大きく制御不能な変更を加える可能性がある。`CLAUDE.md`はその「確かなコンテキスト」を提供する最初の防衛線。

```markdown
# ECプロジェクト仕様

## プロジェクト位置づけ
中小商人向けSaaS ECプラットフォーム、複数店舗・複数決済チャネルをサポート。

## アーキテクチャの決定
- APIファースト設計によるフロントエンド・バックエンド分離
- マイクロサービスバックエンドアーキテクチャ、メッセージキュー経由でサービス間通信
- 読み書きデータベース分離

## コア制約
- すべての金額はセント単位の整数で保存し、浮動小数点精度の問題を回避
- 注文状態マシンは厳密に従う：支払待ち -> 支払済 -> 出荷済 -> 完了
- 決済関連エンドポイントは冪等でなければならない
```

Aviatorのチームは、仕様が捉えるべき重要な情報をまとめました - それこそがあなたの`CLAUDE.md`がカバーすべき内容です：

- 入力と出力の形式とデータ型
- ビジネスルールとエッジケース
- システムの依存関係と制約
- パフォーマンスとスケーラビリティの要件
- エラー処理とセキュリティ要件

### 3.2 ステップ2：Rulesディレクトリで階層化仕様を管理

プロジェクトが成長すると、単一の`CLAUDE.md`では不十分になります。そのとき、`.claude/rules/`ディレクトリを使用して階層化された仕様を整理します。

これこそがAugment Codeが「実行可能な仕様」と呼ぶアイデアです：**仕様は静的なドキュメントではなく、AIエージェントが直接消費する生きた指示**。ルールをRulesディレクトリに分割すると、各ルールファイルは関連ファイルが編集されているときにのみロードされ、トークンの節約と精度の維持の両方を実現。

Tesslのエンジニアは、要件を構造化ドキュメントに分割すること - PRDで「何となぜ」を定義し、技術仕様で「どうやって」を定義する - が、AIが長い会話で混乱を蓄積するのを防ぎ、出力の一貫性を大幅に向上させると発見しました。

```text
.claude/rules/
├── 00-architecture.md      # アーキテクチャルール（グローバル）
├── 01-security.md          # セキュリティルール（グローバル）
├── 10-api-design.md        # API設計ルール
├── 11-frontend-patterns.md # フロントエンドパターンルール
├── 12-database.md          # データベースルール
└── 20-testing.md           # テストルール
```

各ルールファイルはfrontmatterでスコープを指定できます：

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API設計ルール

## ルート設計
- RESTfulスタイル、複数名詞を使用：/api/v1/orders
- ネストされたリソースは最大2レベルまで：/api/v1/users/123/orders

## レスポンス形式
- 成功：{ data, pagination? }
- エラー：{ error: { code, message, details? } }

## 遵守事項
- すべての書き込み操作には認証が必要
- すべてのリストエンドポイントはページネーションをサポート
- 機密操作には監査ログを書き込み
```

これにより、Claude CodeがAPI関連ファイルを編集するとき、この仕様が自動的にロードされ、生成されるコードが基準に従うことが保証されます。

### 3.3 ステップ3：`/plan`でSpecify -> Plan -> Tasks -> Implementを実現

標準的なSpec Codingワークフローは4段階のループです。GitHub Spec KitはこれをSpecify -> Plan -> Tasks -> Implementとして標準化し、Claude Codeの`/plan`コマンドは自然にこのフローをサポートします。

SpecThisチームは1つの重要な原則を強調しました：**エージェントが実行する前に境界を定義する - コード変更が起こる前に何が変更されるべきかを知る**。これこそが`/plan`の価値です。

**段階1：Specify**

まず何を構築したいかを明確に書く。コードに飛び込まない：

```text
/plan
注文の返金機能を実装する必要がある。仕様は以下：

機能要件：
- 出荷前にユーザーは全額返金をリクエスト可能
- 出荷後7日以内は、返品・返金をリクエスト可能
- 返金には管理者の承認が必要

受け入れ基準：
- 返金額は注文の実際の支払額を超えることはできない
- 返金状態マシン：リクエスト済み -> 承認済み -> 返金中 -> 返金完了
- 返金完了後に在庫を復元
- 全プロセスのすべての操作をログに記録
```

**段階2：Plan**

Claudeが仕様に基づいて技術計画を生成：

```text
📋 返金機能実装計画

1. データモデル設計
   - refundsテーブルの作成
   - 注文状態マシンに返金関連の状態を追加

2. API設計
   - POST /api/orders/:id/refund - 返金リクエスト
   - PUT /api/refunds/:id/approve - 返金承認
   - GET /api/refunds - 返金リスト

3. ビジネスロジック
   - 返金適格性チェック
   - 返金額計算
   - 在庫復元ロジック

4. 統合
   - 決済プロバイダーの返金APIに接続
   - 返金通知の送信
```

**段階3：Tasks**

計画を独立して実行可能な小さなタスクに分割し、各タスクに明確な完了基準を与える。

**段階4：Implement**

1つのタスクをずつ実装し、各タスクの完了後に検証。

### 3.4 実例：Spec Codingでユーザー通知システムを構築

完全な例でVibe CodingとSpec Codingを比較しましょう。Orchestrator.devのデータによると、2025年のStack Overflow調査で、84%の開発者がAIツールを使用または使用を計画しているが、結果に満足しているのはわずか22%で、46%が精度が問題だと考えています。Spec Codingはまさにこの満足度ギャップを埋める鍵です。

**Vibe Codingのアプローチ：**

```text
あなた：通知機能を作って
AI：[すぐにコードを書き始め、シンプルな通知リストを生成]

あなた：既読と未読をサポートして
AI：[コードを修正し、readフィールドを追加]

あなた：複数の通知タイプも必要
AI：[再度変更し、typeフィールドを追加]

あなた：スマホにもプッシュ通知して
AI：[大規模な書き直し、以前の構造があまり合わなくなる...]
```

結果：4回の変更後、アーキテクチャは何度も覆され、コードが混乱していく。

**Spec Codingのアプローチ：**

まず仕様ドキュメント`specs/notification.md`を書く：

```markdown
# ユーザー通知システム仕様

## 機能要件
1. 3つのチャンネルをサポート：アプリ内通知、メール通知、プッシュ通知
2. 通知タイプ：システムのお知らせ、注文ステータス、プロモーション、セキュリティアラート
3. ユーザーはチャンネルとタイプごとに通知設定を構成可能
4. 既読/未読状態と一括既読マークをサポート

## データモデル
- notificationsテーブル：id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferencesテーブル：user_id, type, channel, enabled

## API設計
- GET /api/notifications?type=&is_read= - 通知リストの取得（ページネーション付き）
- PUT /api/notifications/:id/read - 既読マーク
- PUT /api/notifications/read-all - 全て既読マーク
- GET /api/notification-preferences - 設定の取得
- PUT /api/notification-preferences - 設定の更新

## 受け入れ基準
- 未読通知数がリアルタイムで更新される
- 通知リストが無限スクロールをサポート
- プッシュ通知の遅延が3秒未満
- 設定変更が即座に反映される
```

その後Claude Codeで：

```text
@specs/notification.md
この仕様に従ってユーザー通知システムを実装して。
データモデルから始め、次にAPIを実装し、最後にフロントエンドコンポーネントを構築して。
各モジュールの完了後に一時停止し、私が確認してから続けて。
```

結果：一発で綺麗に着地し、アーキテクチャが明確で、何度も壊しては建て直す必要なし。

### 3.5 SuperpowersでSpec Codingを強化

以前の章[エンジニアリンググレード開発のためのSuperpowers](../superpowers/)で、Superpowersスキルシステムについて学びました。Spec CodingとSuperpowersは自然な組み合わせです：

| Spec Codingの段階 | 対応するSuperpowersスキル |
|------------------|---------------------|
| 仕様の定義 | `brainstorming` - ソクラテス式質問で要件を明確化 |
| 技術計画 | `writing-plans` - 仕様を小さなタスクに分解 |
| 段階的実装 | `test-driven-development` - TDDレッド・グリーン・リファクタ |
| 品質検証 | `code-review` + `verification-before-completion` |

**組み合わせ使用の例：**

```text
@specs/notification.md
この仕様に従って通知システムをTDDで実装し、
完了後にコードレビューをして
```

この単一の指示で、Spec CodingワークフローとTDDやCode ReviewなどのSuperpowersスキルの両方が活性化され、完全なエンジニアリンググレード開発プロセスが形成されます。

### 3.6 仕様のバージョン管理と継続的進化

Vibe Coding Substackは重要な観点を提起しました：**Specs are now code（仕様は今やコード）**。仕様がコードなら、コードのように管理すべき：

- **バージョン管理**：仕様ファイルをGitに保持し、コードと一緒にコミット
- **変更追跡**：仕様へのすべての変更にコミット記録があり、誰が何を、なぜ変更したかがわかる
- **コードレビュー**：仕様の変更もPRレビューを経て、チームの認識を合わせる
- **CI統合**：仕様変更が自動テストをトリガーし、実装がまだ仕様に準拠しているか検証

Claude Codeでは、`CLAUDE.md`、`.claude/rules/`、`specs/`ディレクトリをすべてバージョン管理下に置くべきです。Robomotionの経験では、**実装と一緒に仕様をバージョン管理することが、ドリフトを防ぎ、すべてを監査可能に保つ**ことが示されています。

OpenAIのHarness Engineeringプラクティスもこれを確認：彼らの`AGENTS.md`ファイル自体がCodexによって書かれ、プロジェクトの進化に伴って継続的に更新される。エージェントが困難に遭遇したときの修正は、コードを直接変更するのではなく、**Codexに仕様自体を更新させる** - 仕様の自己修復ループを形成。

---

## 4. ハイブリッド戦略：VibeからSpecへの段階的移行

業界のコンセンサスは「Vibe Codingを捨てる」ことではなく、**シナリオに応じて正しいアプローチを選ぶ**ことです。

### 4.1 Vibe Codingを使うべき時

- アイデアが実現可能かを検証、30分以内にプロトタイプ構築
- 不慣れな技術やフレームワークの探索
- ハッカソンや社内デモ
- 一回限りのスクリプトやツール

### 4.2 Spec Codingを使うべき時

- 本番機能の開発
- 複数人でのコラボレーションプロジェクト
- 長期保守が必要なコード
- セキュリティ、決済、データなどの機密領域
- API設計とシステム統合

### 4.3 推奨される段階的ワークフロー

**段階1：Vibe探索**

Vibe Codingを使用してアイデアを素早く検証。まだ仕様を書かず、コード品質を気にしない：

```text
シンプルな通知ポップアップを作って、どんな感じか見てみたい
```

**段階2：仕様の洗練**

実現可能性が確認されたら、探索中に学んだことを仕様に整理。AIに手伝わせることも可能：

```text
今構築した通知機能プロトタイプに基づいて、
データモデル、API設計、受け入れ基準を含む
正式な機能仕様ドキュメントを整理して
```

**段階3：Specで再構築**

その仕様に基づいて、Spec Codingで本番グレード版を再実装：

```text
@specs/notification.md
仕様に従ってゼロから実装して。以前のプロトタイプコードは参照しないで
```

このワークフローの利点は明確：**Vibe Codingの速度で方向性を検証し、Spec Codingの品質で製品を届ける**。

Robomotionがうまくまとめています：

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> 仕様が真実のソースである。AI生成出力はドラフト実装である。検証はオプションではない。

---

## 5. よくある質問

### Q1：Spec Codingは遅く感じない？

仕様を書くには前投資が必要。しかしGreg Ceccarelliのチームは、Spec Codingで**3人で4週間**で完全なmacOS製品を届けた - 従来の開発ではほぼ不可能なこと。

初期に仕様を書く時間は、後の手戻りの削減、バグの減少、コミュニケーションコストの低下で回収できる。

### Q2：仕様はどのくらい詳細に書くべき？

Robomotionの提案：**高品質な仕様は1ページでもよい**。重要なのは、次の8つの質問に答えているかどうか：

1. 何を自動化しているか？
2. 入力は何か？
3. 出力は何か？
4. 制約は何か？
5. 障害モードは何か？
6. セキュリティ要件は何か？
7. パフォーマンス要件は何か？
8. 動作することを証明するテストは何か？

### Q3：AIが仕様通りにしかやらず、「明白な」機能を見落とす場合は？

これは実際にSpec Codingの制限の1つ。GitHub Spec Kitユーザーからのフィードバックでは、AIは仕様に書かれていることを**「正確に、かつそれだけ」**行う。

解決策は、仕様に「非機能要件」セクションを追加し、エラー処理、ログ、アクセシビリティなどの一般的な期待をリストすること。または`CLAUDE.md`にグローバルルールを設定。

### Q4：小さなプロジェクトにもSpec Codingが必要？

いいえ。Spec Codingに最も適しているのは：

- 本番グレードプロジェクト
- チームコラボレーションプロジェクト
- 長期保守が必要なプロジェクト

クイックプロトタイプ、一回限りのスクリプト、学習実験にはVibe Codingが適している。

### Q5：チームにSpec Codingを受け入れさせるには？

小さな機能からパイロットとして始める。チームにSpec Codingが手戻りを減らし、初回成功率を向上させることを体験させる。Stack Overflow 2025調査では、84%の開発者がAIツールを使用または使用を計画しているが、結果に満足しているのはわずか22% - Spec Codingはまさにその満足度を向上させる鍵。

---

## 6. まとめ

Vibe CodingからSpec Codingへの移行は革命ではなく、進化です。

Sean Groveは「The New Code」で明確に述べました：**70年間、問題を解決するためにコードを書いてきた。今は仕様を書いてコードを生成するべきだ。** コードは意図の損失のある投影だが、仕様は意図、コンテキスト、制約を完全に捉えられる。

Claude Codeを使用する開発者にとって、このシフトはすでに始まっている：

- あなたが書く`CLAUDE.md`はプロジェクト仕様
- 設定するRulesディレクトリは階層化仕様システム
- `/plan`で行う計画はSpecify -> Plan -> Tasksのフロー
- SuperpowersのTDDとCode Reviewの組み合わせで完全なSpec Codingワークフローが完成

**重要なポイント：**

- Vibe Codingは探索とプロトタイプに適し、Spec Codingは本番とコラボレーションに適している
- 仕様が真実のソースであり、コードはそこから生成される実装成果物
- 仕様を書く能力 = プログラミング能力、構文能力よりもコミュニケーション能力が重要
- 小さく始める：`CLAUDE.md`をちゃんと書くだけで、Spec Codingの第一歩を踏み出している

::: tip :bulb: 次のステップ
次の章では、Claude CodeのAgent Teams機能を学び、複数のAIインスタンスが本当の開発チームのようにコラボレーションする方法を学びます。
:::

---

## 参考文献

### Sean Groveの「The New Code」講演関連

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Full Transcript of "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec Coding方法論

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### ツールとプラクティス

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
