# Claude Code Skills 完全ガイド

## Skills（スキル）とは

**Claude Code Skills** は、専門知識、ワークフロー、ベストプラクティスを再利用可能な「スキルパック」としてパッケージ化する機能です。

Skills は Claude に装備させる「スキルブック」のようなものと考えてください。特定のタスクを完了させる必要があるとき、毎回要件を説明し直す必要はありません。事前に Skill で定義された基準に従って、直接作業を進めることができます。

### なぜ Skills が必要なのか？

Skills が登場する前、Claude Code の利用にはいくつかの課題がありました：

- **指示の繰り返し**：毎回「どのコーディングスタイルに従うか」「コミットメッセージをどう書くか」などを説明する必要があった
- **知識の蓄積が不可能**：チームメンバー個人の Claude 利用経験を共有できなかった
- **基準の不統一**：使う人によって全く異なる結果になることがあった
- **非効率**：よくあるタスクでも毎回ゼロから説明する必要があった

Skills はこれらの課題を解決し、Claude を「経験豊富なチームメンバー」に変えます。プロジェクトの規約、ワークフロー、ベストプラクティスを理解できるようになります。

---

## なぜ今 Skills を学ぶべきなのか？

**Skills は AI エンジニアにとって必須の能力になりつつあります**：

- **コミュニティの高い関心**：関連する GitHub リポジトリのスター獲得が急増しています。例えば、OpenSkills プロジェクトはすでに 7.2k スターに達し、Obsidian Skills はわずか 9 日間で 6.6k スターを獲得しました
- **公式サポート**：Anthropic は公式 Skills リポジトリを維持し、Vercel は Agent Skills と find-skills ツールをリリースしています
- **高い実用性**：コードレビューや Git 操作から動画制作、PPT 生成まで、Skills は多くのシナリオをカバーしています。skills.sh プラットフォームには 60K+ のサブスクリプションを持つ人気スキルがすでに存在します
- **効率の向上**：一度設定すれば繰り返し利用でき、Claude を本当の意味で「デジタル従業員」にすることができます
- **開発者の評価**：複数の技術コミュニティで推奨され、AI プログラミング効率向上の重要ツールとして広く認識されています

---

## クイックスタート

Skills の価値をご理解いただいたところで、さっそく試してみましょう。このセクションでは、最初の Skill のインストールから、いくつかの興味深い実践的なタスクまで、直感的に理解できるようガイドします。

### ステップ 1：`find-skills` をインストール（強く推奨）

Skills の使用を開始する前に、まず `find-skills` をインストールすることを強くお勧めします。これは AI Agent の世界における「究極のスキル検索ツール」であり、すでに 60K+ のサブスクリプションがあります。

**`find-skills` とは？**

簡単に言うと、`find-skills` は AI Agent のための「アプリストア検索エンジン」のようなものです。タスクを完了させたいが適切なローカル Skill がない場合、自動的に検索して最適なものを推奨してくれます。

**`find-skills` のインストール：**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

インストール後、Claude に必要なものを直接伝えるだけで、`find-skills` を使って自動的に関連スキルを検索してくれます。

**使用例：**

```text
React コンポーネントのパフォーマンスを最適化したい。使えるスキルを探して。
```

Claude は `find-skills` を通じて検索し、見つかった関連スキルを教えてくれるので、インストールするものを選択できます。

**なぜまず `find-skills` をインストールするのか？**

`find-skills` がない場合：
- GitHub で手動で関連スキルを検索する
- 一つずつコピー、インストール、設定する
- 繰り返しデバッグと調整を行う

`find-skills` がある場合：
- 一文で要件を説明するだけ
- AI が自動的に最適なスキルを検索
- ワンクリックでインストールしてすぐに使用可能

**Windows ユーザーへの注意**：公式版は Windows サポートが限定的です。コミュニティが CMD と PowerShell に対応し、中国語検索を追加した Windows 互換版を作成しています。

Windows 版のダウンロード：[github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

インストール手順：
1. Windows 版の `SKILL.md` をダウンロード
2. `C:/Users/your-username/.agents/skills/find-skills` のファイルを置き換える
3. Claude Code を再起動すると有効になります

**関連リンク**：
- [Skills 公式サイト](https://skills.sh/) - 利用可能なすべてのスキルを閲覧
- [find-skills リポジトリ](https://github.com/vercel-labs/agent-skills) - 公式ソースコード

### 最初の Skill をインストールして試す

`find-skills` をインストールした後、それを使って面白い最初の Skill を検索・インストールしてみましょう：Remotion 動画制作ツールです。

#### ステップ 1：`find-skills` で Remotion を検索

Claude Code で次のように入力します：

```text
Remotion に関連するスキルを探して。動画を作りたい。
```

Claude は `find-skills` を通じて検索し、`remotion-dev/skills` を推奨します。

#### ステップ 2：Remotion Skills をインストール

```bash
npx skills add remotion-dev/skills -g
```

#### ステップ 3：何か面白いものを作ってみる

Remotion は React コードで動画を作成するフレームワークです。この Skill をインストールすると、自然言語で Claude に動画コードの作成を依頼できます。

**タスク 1：クールなアニメーション文字動画を作る**

```text
Remotion で動画を作成：
- 1920x1080、5 秒
- "Hello World" のテキストが左から飛んでくる
- 同時に回転とスケーリング効果
- 背景はグラデーション
```

Claude が完全な Remotion コードを生成し、実行してアニメーションを確認できます。

**タスク 2：データ可視化動画を作る**

```text
データ成長を示す 10 秒の動画を作成：
- バーチャートから始める
- バーがアニメーションで一つずつ成長
- 数字がカウントアップ
- 最後に "300% growth" の大きなテキストを表示
```

**タスク 3：マルチシーンの製品デモ動画を作る**

```text
3 つのシーンで製品デモ動画を作成：
シーン 1：ロゴがフェードイン、2 秒
シーン 2：製品機能が一つずつ表示、3 秒
シーン 3：CTA ボタンがポップアップ、2 秒
各シーン間にスムーズなトランジションを使用
```

**コードの実行**：

Claude が生成するコードは完全な Remotion プロジェクトです。以下の手順で実行できます：

1. 新しいプロジェクトを作成：`npx create-video my-video`
2. Claude が生成したコードをコピー
3. プレビューを実行：`npm start`
4. 動画をレンダリング：`npm run build`

---

### 2 つ目の Skill：`find-skills` で「フロントエンドがダサくて遅い」問題を解決

#### ステップ 1：自然言語で問題を説明する

Claude に大まかなニーズを直接伝えます：

```text
ウェブサイトが古くて読み込みが遅い。使えるスキルを探して。
```

またはもう少し具体的に：

```text
フロントエンドをもっと良く見せたいし、もっとサクサク動くようにしたい。
```

#### ステップ 2：Claude が `find-skills` で検索

Claude は `find-skills` を通じて skills.sh データベースを検索し、関連スキルを推奨します。「見た目を良くする + カクつきを減らす」という要件には以下を推奨します：

**anthropics/skills/frontend-design**（公式スキル）

このスキルは、AI が生成したインターフェースが「味気なくて普通」に見える問題を解決するために設計されており、Claude のデザインを支援します：

- 同じような「AI テンプレート感」を避けるユニークなビジュアルスタイル
- プロフェッショナルなカラースキームとタイポグラフィ
- スムーズなアニメーション効果
- 本番グレードのコード品質、クリーンなコードで自然とパフォーマンスも向上

#### ステップ 3：インストールして使用する

**インストール**：

```bash
npx skills add anthropics/skills/frontend-design -g
```

**このスキルでできること**：

```text
このページを再デザインして。とてもプロフェッショナルに見えるようにして、AI が生成したようには見えないように。
```

```text
この UI はダサすぎる。もっとモダンなデザインスタイルで書き直して。
```

```text
ダークテーマのダッシュボードを作って。テック感を強く。
```

Claude はこのスキルの規約に従って、デザインを支援します：
- ミニマリズム、レトロフューチャリズム、ブルータリズムなどのユニークなビジュアル方向
- 慎重に選ばれたカラーやフォント
- 適切なスペーシングとレイアウト
- スムーズなインタラクティブアニメーション

---

### 2 つのスキルの比較

| スキル | 解決する問題 | 面白さ |
|--------|-------------|---------|
| **remotion-dev/skills** | コードで動画を作成 | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | フロントエンドを見栄え良く | ⭐⭐⭐⭐ |

---

### 3 つ目の Skill：`frontend-slides` で美しい PPT プレゼンテーションを素早く作成

#### はじめに

**frontend-slides** は、自然言語で美しい HTML プレゼンテーションを作成できる Skill です。CSS や JavaScript の知識がなくても使えます。

その中核思想は「**見せる、説明しない**」です。希望するデザインスタイルを明確に説明できない場合、抽象的な要件（「青い背景、大きなフォント」など）を強制するのではなく、3 つのビジュアルプレビューを生成して選択させます。

#### `frontend-slides` のインストール

**方法 1：手動インストール**

```bash
# スキルディレクトリを作成
mkdir -p ~/.claude/skills/frontend-slides

# ファイルをダウンロード（または GitHub からコピー）
# 1. https://github.com/zarazhangrui/frontend-slides にアクセス
# 2. SKILL.md と STYLE_PRESETS.md をダウンロード
# 3. ~/.claude/skills/frontend-slides/ に配置
```

**方法 2：`find-skills` でインストール**

```text
PPT プレゼンテーションを作成するスキルを探して
```

Claude は `find-skills` を通じて検索し、`frontend-slides` を推奨します。

#### 使用シナリオ

**シナリオ 1：ゼロからプレゼンテーションを作成**

```text
/frontend-slides

AI スタートアッププロジェクトの資金調達ピッチデッキを作成したい、10 スライド程度で
```

Claude が以下をガイドします：
1. 各スライドのコンテンツ（タイトル、箇条書き、画像など）を記入
2. 表現したい雰囲気（驚き、プロフェッショナル、温かみなど）を説明
3. 3 つのビジュアルスタイルプレビューから選択
4. 完全な HTML プレゼンテーションを作成
5. ブラウザでプレビューを開く

**シナリオ 2：PowerPoint ファイルを変換**

```text
/frontend-slides

presentation.pptx をウェブプレゼンテーションに変換して
```

Claude が以下を実行します：
1. PPT からすべてのテキスト、画像、ノートを抽出
2. 抽出したコンテンツを確認用に表示
3. ビジュアルスタイルを選択
4. 元のコンテンツをすべて保持した HTML プレゼンテーションを生成

**シナリオ 3：スタイルプレビューを素早く生成**

```text
/frontend-slides

技術トーク用の PPT を作りたい。まず利用可能なビジュアルスタイルを見せて。
```

Claude は異なるスタイルで 3 つのプレビューページを直接生成します：
- **ダークテーマ**：Neon Cyber、Terminal Green、Deep Space
- **ライトテーマ**：Paper & Ink、Swiss Modern、Soft Pastel
- **スペシャルスタイル**：Brutalist、Gradient Wave

#### 内蔵ビジュアルスタイル

| スタイル名 | 特徴 | 適したシナリオ |
|---------|------|---------|
| **Neon Cyber** | 未来感のあるテック感、パーティクル効果 | 技術トーク、AI 製品 |
| **Midnight Executive** | 高級ビジネス、信頼感 | ビジネスレポート、資金調達ピッチ |
| **Paper & Ink** | エディトリアルスタイル、文学的雰囲気 | コンテンツ制作、教育共有 |
| **Swiss Modern** | シンプルな幾何学、バウハウススタイル | デザインポートフォリオ、ミニマリズム |
| **Brutalist** | 生々しい、大胆、目を引く | アートショーケース、自己表現 |

#### 出力結果

生成されたプレゼンテーションは**単一ファイル HTML** ドキュメントで、以下が含まれます：

- 完全なスタイリングとインタラクションコード
- 矢印キーとスペースによるキーボードナビゲーション
- タッチとスワイプのサポート
- マウスホイールでのスライド切り替え
- プログレスバーとナビゲーションドット
- スクロールトリガーアニメーション
- レスポンシブデザイン

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- すべてのスタイルがインライン化、依存関係ゼロ -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">あなたのタイトル</h1>
    </section>
    <!-- その他のスライド... -->
</body>
</html>
```

#### おすすめの理由

1. **依存関係ゼロ**：10 年後でも開ける単一 HTML ファイル
2. **ビジュアル発見**：デザインを説明する必要はなく、好きなものを選ぶだけ
3. **PPT 変換**：既存のコンテンツを保持し、より良いビジュアルスキンを適用
4. **本番グレードのコード**：アクセシブル、明確なコメント、カスタマイズが容易

**関連リンク**：
- [frontend-slides GitHub リポジトリ](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ スター
- [オンラインプレビュー例](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### 3 つのスキルの比較

| スキル | 解決する問題 | 面白さ | 実用性 |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | コードで動画を作成 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | フロントエンドを見栄え良く | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | 素早く美しい PPT を作成 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### インストール後の使い方

インストール後、追加の設定は不要です。Claude にタスクを依頼すると、自動的に対応する Skill を呼び出します。

インストール済みの Skills を確認：

```bash
npx skills list
```

---

## Skills とは

### コアコンセプト

**Skills はファイルシステムに保存される「スキルパック」** で、以下を含めることができます：

- **SKILL.md**：スキルの定義ファイル、必須
- **scripts/**：ヘルパースクリプト、オプション
- **templates/**：出力テンプレート、オプション
- **references/**：リファレンスドキュメント、オプション

### Skills とプロンプトの違い

Skills と Claude に直接プロンプトを送ることの違いは何かと思うかもしれません：

| プロンプト | Skills |
|--------|--------|
| 一時的、毎回繰り返す必要がある | 永続的、一度書けば何度も再利用可能 |
| 会話履歴に残りトークンを消費 | 必要に応じてロードされトークンを節約 |
| セッション間で共有不可 | チーム内で共有可能 |
| バージョン管理が困難 | Git で管理可能 |

### 2 種類の Skills

**グローバル Skills（個人用）**：
- 保存場所：`~/.claude/skills/`
- スコープ：すべてのプロジェクト
- 適したシナリオ：汎用的な個人スキル

**プロジェクト Skills（チーム用）**：
- 保存場所：`project-directory/.claude/skills/`
- スコープ：現在のプロジェクト
- 適したシナリオ：チーム共有とプロジェクト固有の規約

### Skills の仕組み

Claude Code の起動時、以下の処理が行われます：

1. Skills ディレクトリをスキャン
2. 各 `SKILL.md` ファイルを解析
3. YAML frontmatter のメタデータを抽出
4. スキルの内容を「ナレッジベース」に追加
5. 説明に基づいて自動的にトリガーをマッチング

---

## `SKILL.md` ファイル構造

### 基本構造

完全な Skill ディレクトリは次のようになります：

```text
my-skill/
├── SKILL.md          # 必須：スキル定義ファイル
├── scripts/          # オプション：ヘルパースクリプト
├── templates/        # オプション：出力テンプレート
├── references/       # オプション：リファレンスドキュメント
└── examples/         # オプション：サンプルファイル
```

### `SKILL.md` テンプレート

`SKILL.md` ファイルは 2 つの部分で構成されます：

**パート 1：YAML Frontmatter（メタデータ）**

```yaml
---
name: skill-name              # スキル名、/skill-name コマンドになる
description: short description # Claude の自動トリガーマッチングに使用
category: development         # カテゴリ
tags:                         # タグ
  - code
  - automation
---
```

**パート 2：Markdown コンテンツ（手順）**

```markdown
# スキルタイトル

## 使用例
このスキルを使用するタイミング

## 実行手順
1. ステップ 1
2. ステップ 2

## 注意事項
- 注意 1
- 注意 2
```

### 主要フィールドの説明

| フィールド | 必須 | 説明 |
|------|------|------|
| `name` | はい | スキル名。小文字、数字、ハイフンのみ使用可能 |
| `description` | はい | スキルの説明。具体的であるほど Claude が自動マッチングしやすい |
| `category` | いいえ | カテゴリラベル |
| `tags` | いいえ | 追加のカテゴリラベル |
| `allowed-tools` | いいえ | 追加許可なしで使用可能なツール |

---

## Skills と MCP：違いは何か？

多くの初心者が Skills と MCP を混同しますが、これらは完全に異なるものです。

### コアの違い

| 項目 | Skills | MCP |
|------|--------|-----|
| **性質** | 知識とワークフロー | ツールとインターフェース |
| **提供するもの** | AI に「やり方」を教える | AI に「使えるもの」を与える |
| **保存場所** | `skills/` ディレクトリ | MCP サーバー |
| **設定形式** | Markdown ファイル | JSON 設定ファイル |
| **トリガー方法** | `/skill-name` または自動認識 | 設定を通じて自動ロード |

| 直感的な例え |

もし Claude が「作業員」だとしたら：

- **MCP** は作業員に与える「道具」、例えばレンチ、コンピューター、アクセス権
- **Skills** は作業員に与える「操作マニュアル」、例えばコードレビューの方法やコードの提出方法

### 両者の関係

Skills と MCP は競合するものではありません。補完関係にあります：

```text
ユーザーのタスク -> Claude が要件を認識
               ↓
        関連する Skills をロード（やり方を知る）
               ↓
        MCP を通じてツールを呼び出す（道具が利用可能）
               ↓
        タスクを完了
```

### 例

**シナリオ：コードレビュー**

- **Skills** はレビューの手順、チェックリスト、出力形式を定義
- **MCP** は GitHub PR へのアクセスとコード diff の取得機能を提供

連携：Skills は Claude に「レビューの方法」を教え、MCP は Claude に「コードにアクセスする能力」を与えます。

### 選択の推奨

| ニーズ | 推奨されるソリューション |
|----------|----------|
| ワークフローを定義したい | Skills を使用 |
| 外部データにアクセスしたい | MCP を使用 |
| 両方必要 | 組み合わせて使用 |

---

## Skills の一般的な入手リソース

### 公式リソース

- [Anthropic 公式 Skills リポジトリ](https://github.com/anthropics/skills) - 公式に維持されるスキルコレクション
- [Claude Code 公式ドキュメント - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - 公式ドキュメント

### GitHub コミュニティリソース

| リポジトリ | 説明 |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | コミュニティがまとめた Claude Code 実践資料。Skills、Agents、Hooks などを含む |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 事前設定済み Skills を含む包括的なツールキット |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | 厳選された Skills リソースリスト |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 のプロフェッショナルスキルと 300+ のリファレンスドキュメント |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitCode_Trending/aw/awesome-claude-skills) | 厳選オープンソースコレクション |

### コミュニティ Skills のインストール方法

`find-skills` を使用すれば、必要なものを Claude に伝えるだけで、自動的に検索して推奨してくれます：

```text
React パフォーマンス最適化に関連するスキルを探して
```

Claude は `find-skills` を通じて skills.sh データベースを検索し、最も関連性の高いスキルをリストアップするので、インストールするものを選択できます。

**検索のコツ**：

- 具体的なキーワードを使用：「testing」より「react testing」の方が良い
- 「ドメイン + アクション」の組み合わせ：「nextjs deploy」、「typescript lint」
- インストール数が多いスキルを優先、10K+ は通常実証済み
- トレンドリストをチェックして新しいスキルを発見

---

## 独自の Skills の作成方法

Skills の作成には 2 つの方法があります：Claude に直接作成を依頼するか、専用の `skill-creator` ツールを使用するかです。

### 方法 1：Claude に直接作成を依頼する

これが最もシンプルなアプローチです。要件を自然言語で Claude に伝えるだけです。

**例**：

```text
"format-code" という名前のスキルを作成して、コードを自動フォーマットするように。

要件：
1. プログラミング言語を自動検出
2. 対応するフォーマットルールを適用
3. フォーマット前後の diff を返す
```

Claude が自動的に：
1. ディレクトリ構造を作成
2. `SKILL.md` ファイルを生成
3. YAML frontmatter を記入
4. スキルの内容を記述

**適したシナリオ**：
- シンプルなスキルを素早く作成
- やりたいことは分かっているが `SKILL.md` 形式に不慣れ
- 素早く反復・修正したい

### 方法 2：`skill-creator` を使用する

`skill-creator` は Skills 作成用の専用ツールで、ステップバイステップでプロセスをガイドします。

**インストール**：

```bash
npx skills add anthropics/skills@skill-creator -g
```

または公式 Skills リポジトリ全体をインストール：

```bash
npx skills add anthropics/skills -g
```

**使用方法**：

```text
/skill-creator
```

その後、プロンプトに従って入力します：
- スキル名
- 機能説明
- 使用シナリオ
- 実行手順

`skill-creator` が以下を実行します：
1. スキルの目的を明確にするようガイド
2. ドラフト `SKILL.md` を生成
3. テストケースを作成
4. 評価を実行して最適化

**適したシナリオ**：
- 複雑なスキルの作成
- より標準化された作成プロセスが必要
- スキルのテストと検証を行いたい

### 2 つの方法の比較

| 方法 1：直接作成 | 方法 2：`skill-creator` |
|-----------------|---------------------|
| 高速でシンプル | ガイド付きステップ |
| シンプルなスキルに適している | 複雑なスキルに適している |
| 会話内で直接完了 | 標準化されたプロセス |
| 柔軟な修正 | テストと検証を含む |

### ヒント：良い要件の書き方

**良い要件の説明**：

```text
"git-commit" スキルを作成して、コードを自動コミットする。

実行手順：
1. どのファイルが変更されたか確認
2. Conventional Commits に従ったコミットメッセージを生成
3. git commit を実行
4. プッシュするかどうか確認

注意事項：
- コミット前に機密情報を確認
- dist/ や node_modules/ などのディレクトリはコミットしない
```

**悪い要件の説明**：

```text
コードをコミットするスキルを書いて
```

これは曖昧すぎます。Claude は具体的に何をすべきか分かりません。

---

## 一般的なスキルの例

### 例 1：コードレビュースキル

ディレクトリとファイルを作成：

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

使い方：

```text
/review-pr
現在のブランチの PR をレビューして
```

### 例 2：Git 自動コミットスキル

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

使い方：

```text
/git-commit
```

### 例 3：テスト生成スキル

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

使い方：

```text
/gen-test
src/utils.ts の単体テストを生成して
```

### 例 4：ドキュメント生成スキル

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

使い方：

```text
/gen-readme
現在のプロジェクトの README ドキュメントを生成して
```

---

## 高度なヒント

### Skills と Hooks の組み合わせ

Hooks は特定のイベントで自動的にアクションを実行できます。Skills と組み合わせることで、より強力な自動化が可能です。

例：保存後に自動的にコードをフォーマット：

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // format-code スキルを呼び出し
      }
    }]
  }
}
```

### Skills と Commands の組み合わせ

Commands はシンプルなショートカットコマンドです。Skills は複雑なワークフローです。これらは一緒に使用できます。

### チームコラボレーション

**プロジェクト Skills の共有**：

1. Skills を `.claude/skills/` に配置
2. Git にコミット
3. チームメンバーはプロジェクトをクローン後すぐに使用可能

**バージョン管理**：

- Skills はコードと同様にバージョン管理可能
- 各コミットで Skills の変更を記録
- 以前のバージョンにロールバック可能

---

## よくある質問

### Q1：スキルがトリガーされないのはなぜ？

考えられる原因：
- YAML frontmatter の形式が間違っている
- 説明が十分に具体的でない
- Claude Code が再起動されていない

解決方法：
- YAML 形式が正しいか確認
- 説明を改善し、具体的な使用シナリオを含める
- Claude Code を再起動

### Q2：正確な説明の書き方は？

良い説明には以下を含めます：
- スキルの具体的な機能
- 使用シナリオ（「ユーザーが...に言及したとき」など）
- トリガーキーワード

**悪い例**：
```text
description: Review code
```

**良い例**：
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### Q3：Skills と Commands の違いは？

| Commands | Skills |
|----------|--------|
| シンプルなショートカットコマンド | 完全なワークフロー |
| 単一の `.md` ファイル | ディレクトリ構造（`SKILL.md` + オプションファイル） |
| 手動トリガー | 自動トリガー可能 |
| シンプルな操作に適している | 複雑なプロセスに適している |

### Q4：Skill のデバッグ方法は？

1. `/skills` を使用してスキルが認識されているか確認
2. スキル名を直接入力して手動トリガー
3. `SKILL.md` の内容が正しいか確認
4. Claude Code のログを確認

---

## 参考文献

### 公式リソース

- [Claude Code 公式ドキュメント - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills 標準](https://agentskills.io/)
- [Anthropic エンジニアリング記事（Agent Skills の実践的アイデア）](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic 公式 Skills GitHub リポジトリ](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills ドキュメント](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### リソースディレクトリ

- [skills.sh](https://skills.sh/) - Vercel の Agent Skills アプリストア、48,000+ のスキルライブラリ
- [find-skills](https://github.com/vercel-labs/agent-skills) - インテリジェントスキル検索ツール、60K+ サブスクリプション
- [Skills マーケットプレイス（中国語インターフェース）](https://skillsmp.com/zh) - コミュニティ Skills の発見とインストール

### GitHub コミュニティプロジェクト

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel Labs 公式 Agent Skills コレクション、find-skills を含む
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - コミュニティがまとめた Claude Code 実践資料
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 事前設定済み Skills を含む包括的なツールキット
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - 厳選された Skills リソースのリスト
- [superpowers](https://github.com/obra/superpowers) - ソフトウェア開発自動化ワークフロー用 Skills コレクション
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 のプロフェッショナルスキルと 300+ のリファレンスドキュメント
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - 厳選リソースリスト

### 公式スキル例

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - 新しいスキルを作成するためのスキル
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - MCP サーバーを構築するためのスキル
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - Slack GIF を作成するためのスキル

### 中国語チュートリアル

- [Claude Code 高度な設定と使用テクニックの完全ガイド](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - CLAUDE.md、Skills、Subagents を使った全链条実践](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Claude Code Skills カスタマイズのステップバイステップガイド](https://m.blog.csdn.net/u010028049/article/details/157979705)

## さらに詳しく：Claude Skills の内部メカニズム

次に、Claude Skills が内部的にどのように動作するかを深く掘り下げます。使い方を知るだけでなく、なぜこのように設計されているのかを理解しましょう。

### 第一原理の視点：プロンプトベースの動的コンテキスト注入

まず、一つの重要な事実を理解してください：**Skills は実行可能なコードではありません**。

Skills は本質的に高度な指示、つまりプロンプトであり、必要なときに Claude のコンテキストに「注入」されます。この設計は「**Prompt-based Dynamic Context Injection & Meta-Tool Architecture**」と呼ばれています。

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ User Request│ ───> │ LLM Matches │ ───> │ Trigger Skill│
└─────────────┘      │Description  │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Inject Full  │
                                          │ Instructions │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Execute Task │
                                          └──────────────┘
```

### 3 段階の段階的ローディングアーキテクチャ（トークン最適化）

多数の Skills を消費しすぎるトークンなしで処理するため、Claude はスマートな 3 段階ローディングメカニズムを使用しています：

| 層 | 内容 | ロードタイミング | トークンコスト |
|------|------|----------|-----------|
| **第 1 層：メタデータ** | YAML frontmatter（`name + description`） | Claude 起動時 | ~30-50 トークン/スキル |
| **第 2 層：手順** | 完全な `SKILL.md` の内容 | スキルがトリガーされた時 | ~5,000 トークン |
| **第 3 層：リソース** | スクリプト、テンプレート、リファレンス | ファイルシステムから必要に応じてアクセス | コンテキストに追加されない |

**この設計の利点**：

- 100 の Skills があると仮定すると、起動時のメタデータ消費は約 3,000-5,000 トークンのみ
- トリガーされたスキルのみが完全な内容をロード
- リファレンス文書などのリソースファイルはコンテキストに完全にロードされることはない

**Skills なしとの比較**：

```text
Skills なし：すべての会話で 50,000+ トークンですべての機能を説明する必要がある
Skills あり：起動時 ~100 トークン/スキル + 必要に応じて 5,000 トークンをロード
節約：会話あたり平均 40,000+ トークンの節約
```

### デュアルコンテキスト注入メカニズム

スキルがアクティブになると、システムは同時に 2 つの変更を行います：

**1. 会話コンテキストへの注入**

```javascript
// ユーザーが見るもの（表示されるメッセージ）
<command-message>The "pdf" skill is loading</command-message>

// AI が実際に受け取るもの（非表示のメタメッセージ）
{
  isMeta: true,  // メタメッセージとしてマーク、UI には表示されない
  content: `
    # PDF Analysis Expert Instructions

    You are a professional PDF analysis expert. Workflow:
    1. Use pdftotext to extract text
    2. Analyze the document structure
    3. Generate a summary report
    ...
  `  // 完全な SKILL.md の内容、数千語になる可能性がある
}
```

**2. 実行コンテキストの変更**

手順の注入に加えて、スキルは Claude の環境を動的に変更することもできます：

| 変更タイプ | 例 | 説明 |
|---------|------|------|
| **ツール権限** | `allowed-tools: "Bash(pdftotext:*)"` | 特定のツールへの一時的なアクセスを許可 |
| **モデル切り替え** | Sonnet から Opus に切り替え | 一部の複雑なタスクにはより強力な推論が必要 |
| **コンテキストの分離** | 子セッションスペースを作成 | メインの会話コンテキストの汚染を回避 |

### LLM 推論に完全に基づくルーティングメカニズム

これは非常に重要な設計上の決定です：**Claude Skills はハードコードされたルーティングを使用しません**。

| 従来のアプローチ | Claude Skills |
|---------|--------------|
| ❌ 埋め込みベクトルマッチング | ✅ 純粋な LLM 推論 |
| ❌ 分類器 | ✅ Transformer 順伝播 |
| ❌ 正規表現やキーワードマッチング | ✅ 自然言語理解 |
| ❌ 独立したルーティングアルゴリズム | ✅ 統一されたモデル判断 |

**ワークフロー**：

```text
1. 各スキルの name と description が Skill ツールの説明にフォーマットされる

2. Claude が受け取る：
   - ユーザーメッセージ
   - 利用可能なツールのリスト（Skill メタツールを含む）
   - スキルリスト（name + description）

3. Claude の自然言語理解がユーザーの意図をスキルの説明にマッチング

4. マッチングが成功すると、呼び出し：command: "skill-name"
```

**なぜこのような設計なのか？**

**ハードコードされたルーティングの課題**：
- 追加の保守コスト
- 複雑な意味的関係を理解する能力がない
- 複数言語の処理が困難
- ファジーマッチングをサポートしていない

**純粋な LLM 推論**：
- Claude 自身の言語理解を活用
- 複数言語、同義語、曖昧な説明を自動的に処理
- 追加の保守が不要
- よりインテリジェントなルーティング判断

### ファイル解析メカニズム

**`SKILL.md` ファイル構造**：

```bash
my-custom-skill/
├── SKILL.md              # 必須：コア定義ファイル
├── config.json           # オプション：メタデータ設定
├── README.md             # 推奨：使用ドキュメント
├── scripts/              # オプション：実行可能スクリプト
├── templates/            # オプション：テンプレートフォルダ
└── references/           # オプション：リファレンスドキュメント
```

**解析フロー**：

```text
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code startup                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Scan ~/.claude/skills/ and .claude/skills/ directories    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Use the gray-matter library to parse each SKILL.md        │
│  YAML frontmatter                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Validate required fields (name and description)           │
│  - name: max 64 characters, only lowercase letters,        │
│    numbers, and hyphens                                     │
│  - description: used for LLM automatic matching            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Extract metadata and build the Skill list                 │
│  (only load name + description, not the full body)         │
└─────────────────────────────────────────────────────────────┘
```

### 完全な実行フローの例

具体的な例を通して全体の流れを見てみましょう：

```text
ユーザー："この PDF ファイルを分析して"

═══════════════════════════════════════════════════════════════

ステップ 1：LLM の判断
────────────────
Claude がスキルリスト内の "pdf" スキルの説明を見つける：
  description: "Analyze PDF document content, extract text, generate a summary"

═══════════════════════════════════════════════════════════════

ステップ 2：システム介入
────────────────
Claude Code が実行：
  1. ~/.claude/skills/pdf/SKILL.md を読み込む
  2. 表示メッセージを生成："The pdf skill is loading"
  3. 非表示のメタメッセージを生成：完全な SKILL.md の内容
  4. セッション権限を変更：allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

ステップ 3：LLM の実行
────────────────
Claude のコンテキストには以下が含まれる：
  - 元のユーザーリクエスト
  - PDF エキスパートのワークフロー手順
  - pdftotext ツールへのアクセス権限

Claude が実行：
  1. pdftotext を使用して PDF テキストを抽出
  2. コンテンツ構造を分析
  3. 要約レポートを生成
  4. 結果をユーザーに提示

═══════════════════════════════════════════════════════════════

ステップ 4：使用後の破棄
────────────────
タスク完了後、完全なスキル内容はコンテキストから削除される
（完全なスキル手順ではなく、会話履歴のみが残る）
```

### コアとなる設計イノベーション

| イノベーション | 従来のアプローチ | Skills のアプローチ | 利点 |
|--------|---------|------------|------|
| **能力の源泉** | モデルの重みに固定 | 動的にロードされるプロンプト | 拡張・更新可能 |
| **トークン効率** | すべての機能が常にメモリに | 必要に応じてロード | 80%+ のトークン節約 |
| **ナレッジ管理** | 会話履歴に散在 | モジュラー型ファイルシステム | バージョン管理・共有可能 |
| **ライフサイクル** | 継続的にスペースを占有 | 使用後に破棄 | クリーンなコンテキスト |

### 学術的基盤

Claude Skills の設計は以下の研究を参考にしています：

| 研究分野 | 代表的な業績 | ここでの応用 |
|---------|---------|---------|
| **強化学習** | Voyager（2023） | スキルライブラリを蓄積するアイデア |
| **認知アーキテクチャ** | ACT-R、Soar | 手続的記憶と宣言的記憶の分離 |
| **階層的ポリシー** | Options Framework | 3 段階の段階的ローディング |

**思考のコアシフト**：

```text
従来：AI はすべてを記憶する必要がある
      ↓
Skills：AI は専門知識がどこにあるかを知っている
      ↓
結果：人間の専門家の思考パターンに近い
```

### Agent Skills 標準との関係

Claude Skills は [Agent Skills オープン標準](https://agentskills.io/) に従っています。つまり：

- ✅ クロスプラットフォーム互換性：Cursor、Windsurf、Aider などのツールもサポート
- ✅ 統一されたファイル形式：標準化された `SKILL.md` 構造
- ✅ 相互運用性：異なるツール間で Skills を共有可能

```text
Agent Skills 標準が定義するもの：
├── 必須：SKILL.md ファイル（メタデータ + 手順）
├── オプション：scripts/（実行可能コード）
├── オプション：references/（ナレッジベースドキュメント）
└── オプション：assets/（テンプレートとリソース）
```

### まとめ：なぜこの設計は優れているのか？

1. **能力とモデルの分離**：専門知識はもはやモデルのトレーニングに依存せず、Markdown ファイルでいつでも更新可能

2. **極限のトークン効率**：3 段階ローディングメカニズムにより、必要なコンテンツのみをロード

3. **LLM 自身の強みを活用**：ルーティングとマッチングは Claude の言語理解に完全に依存し、追加のアルゴリズムが不要

4. **開発者フレンドリー**：スキルの作成には Markdown を書くだけで、プログラミングは不要

5. **コンポーザブル**：Skills は互いに参照・組み合わせて複雑なワークフローを形成可能

6. **使用後の破棄**：完了後に自動的にクリーンアップし、コンテキストを新鮮に保つ

---

### まとめ

Skills は Claude Code を「汎用アシスタント」から「チームの専門家」に変える鍵です。

Skills を通じて、以下が可能になります：
- ワークフローの標準化
- チーム知識の再利用
- コラボレーション効率の向上
- 繰り返しの説明を削減

覚えておいてください：**同じ指示を 2 回繰り返していることに気づいたら、Skill の作成を検討すべきです**。

さあ、最初の Skill を作成しましょう。
