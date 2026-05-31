# Claude Agent Teams 完全ガイド

## Agent Teams 入門

**Agent Teams** は Claude Code の革新的な機能であり、**複数の独立した AI インスタンスが実際の開発チームのように協力して作業**できるようにします。

従来、Claude Code を使用するのは、1人の優秀なアシスタントと働くプロジェクトマネージャーのようなものでした。タスクがどれほど複雑であっても、その1人のアシスタントだけが作業をしていました。現在、Agent Teams を使用すると、完全な AI 開発チームを編成できます。1人のメンバーがフロントエンドを担当し、1人がバックエンドを担当し、1人がテストを担当し、**同時に作業し、互いにコミュニケーションを取り、複雑なタスクを協力して完了**することができます。

### 1人のアシスタントからチームコラボレーションへ

Agent Teams の詳細に入る前に、まずそれが解決する問題を理解しましょう。

**単一 AI モードの限界**：

単一の Claude インスタンスを使用して複雑なプロジェクトを処理する場合、以下のボトルネックに直面します：

- **直列処理のボトルネック**：AI は一度に1つのことしかできません。例えば、プロジェクトをリファクタリングする際、まず認証モジュールを分析し、次にデータベースモジュール、最後に API モジュールを分析する必要があるかもしれません。これらのステップは、互いに依存していなくても順番に行わなければなりません。

- **コンテキストの混雑問題**：すべての情報が1つの会話ウィンドウに存在します。会話が長くなるにつれて、重要な初期の詳細が埋もれてしまい、AI が以前に議論された重要な決定を忘れる可能性があります。

- **単一視点の制限**：1つの AI しか考えていないため、多角的な議論や検証がありません。複雑な設計上の決定が現れたとき、「チームメイト」と議論したり、異なる視点を提供したりする人はいません。

- **効率の上限**：大規模なリファクタリングやマルチモジュール開発には長い時間がかかり、並列化によってスピードアップする方法がありません。

**Agent Teams の解決策**：

Agent Teams は **複数のインスタンス間の並列協力** を通じてこれらの問題を解決します：

- **真の並列作業**：複数の AI が異なるタスクを同時に処理できます。1つはフロントエンド UI を担当し、もう1つはバックエンド API を担当し、さらに別の1つはデータベース設計を担当し、互いに干渉しません。

- **独立したコンテキスト空間**：各チームメンバーは独自の完全な 200K トークンのコンテキストウィンドウを持っているため、会話が長くなりすぎて重要な情報が「忘れられる」ことはありません。

- **チームコラボレーション能力**：メンバーは直接コミュニケーションを取り、設計上の決定を議論し、コードの品質を相互に検証できます。実際の開発チームと同じように。

- **大幅な効率向上**：Anthropic の社内テストによると、大規模なプロジェクトのリファクタリングにおける効率は約 50% 向上します。

---

## Agent Teams と Subagent の比較

Agent Teams のアーキテクチャを深く掘り下げる前に、まず一般的な誤解を解消しましょう：**Agent Teams と Subagent の違いは何でしょうか**？

どちらの機能も「複数の AI の協力」に関係していますが、その協力モデルは全く異なり、異なるシナリオに適しています。

### 核心的な違いの概要

| 次元 | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **トポロジー** | スタートポロジー：すべてのサブエージェントがメインエージェントに報告 | メッシュトポロジー：メンバーは互いに通信可能 |
| **コミュニケーション方式** | メインエージェントがプロンプトを通じて情報を明示的に渡し、サブエージェントは完了時に結果を返す | メンバーは直接通信、議論、調整が可能 |
| **コンテキスト管理** | 各サブエージェントは独立したコンテキストを持ち、メインエージェントは必要な情報のみを渡す | 各メンバーは完全に独立したコンテキストを持つ |
| **並列性** | 並列実行可能だが、協力チェーンはメインエージェントを中心とする | 真の並列開発と協力 |
| **タスク調整** | メインエージェントがすべてを中央集権的に管理・調整 | メンバーはより自律的にタスクを担当可能 |
| **コスト** | 高くない。複数のサブエージェントが並列実行されるとトークン使用量が蓄積する | より高い。メンバーが独立して実行し、より頻繁に通信する |

### 直感的な例え

**Subagent は次のようなもの**：マネージャーが複数のアシスタントに個別のタスクメモを書くようなもの。各アシスタントは自分のタスクメモに基づいて独立して作業し、完了するとマネージャーにのみ結果を返します。アシスタント同士は直接通信せず、マネージャーはアシスタントの作業中の完全な思考プロセスを見ることができません。

```
あなた → メインエージェント → サブエージェント A：「このファイルを分析して」
あなた → メインエージェント → サブエージェント B：「その関数を検索して」
         ↓
    サブエージェント A 完了 → メインエージェントに結果を報告
    サブエージェント B 完了 → メインエージェントに結果を報告
         ↓
    メインエージェントが結果を統合 → あなたに報告
```

**Agent Teams は次のようなもの**：プロジェクトマネージャーが実際の開発チームを率いるようなもの。チームメンバーはプロジェクトマネージャーを通じてすべての詳細を伝えるのではなく、直接コミュニケーション、議論、協力することができます。

```
あなた → チームリーダー：「ユーザー認証機能を構築して」
         ↓
    チームリーダーがチームを作成しタスクを割り当てる
         ↓
    メンバー A：「@メンバー B、API インターフェースの設計はできましたか？」
    メンバー B：「はい、フォーマットはこれです...」
    メンバー C：「インターフェースを確認しましたが、議論すべきことがあります...」
         ↓
    チームメンバーが協力して作業を完了 → チームリーダーが結果を統合 → あなたに報告
```

### どちらを使うべきか

**Subagent を使用する場合**：

- 素早くて明確な単一タスクがある場合、例えば「このエラーコードを検索して」
- タスク間の依存関係が少ない場合
- 並列実行は必要だが、メンバー間の継続的な議論は不要な場合

**Agent Teams を使用する場合**：

- 複数のモジュールにまたがる複雑なシステムのリファクタリングを行う場合
- 多角的な分析と議論が必要な場合、例えばセキュリティ専門家とパフォーマンス専門家がソリューションについて議論する
- フロントエンド、バックエンド、テストが同時に行われる真の並列開発が必要な場合
- タスクに頻繁な調整と情報共有が必要な場合

### 簡単なまとめ

- **Subagent**：大きなタスクを小さなタスクに分割し、異なる「作業者」に割り当てるタスク配布ツール
- **Agent Teams**：メンバーが実際のチームのようにコミュニケーション、議論、協力できる実際の協力チーム

---

## コアアーキテクチャ

Agent Teams は単なる「複数のインスタンスを開く」機能ではありません。それは完全な **マルチエージェント協力システム** です。それを理解するには、そのコアコンポーネントとそれらがどのように連携するかを理解する必要があります。

### チーム構成

Agent Team は4つのコアコンポーネントで構成され、それぞれに独自の責任があり、協力して複雑なタスクを完了します。

**チームリーダー（Team Lead）**

チームリーダーはチーム全体の「頭脳」であり「調整役」です。直接コーディングタスクを実行するわけではありません。その代わり、以下を担当します：

- **要件分析とタスク分解**：ユーザーの複雑な要件を並列実行可能な複数のサブタスクに分解する
- **チームの作成と管理**：何人のメンバーが必要か、各メンバーが何をすべきかを決定する
- **タスクの割り当てとスケジューリング**：適切なメンバーにタスクを割り当て、タスクの依存関係を管理する
- **結果の統合と品質管理**：各メンバーの作業を収集、統合、最終レビューを行う

**チームメイト（Teammates）**

チームメイトは実際に作業を行う「開発者」です。各チームメイトは独立した Claude インスタンスです：

- **独立したコンテキストウィンドウ**：各メンバーは完全な 200K トークンのコンテキストウィンドウを持ち、チームリーダーや他のメンバーから完全に独立している
- **完全なツール権限**：Read、Write、Edit、Bash などのすべてのツールを使用可能
- **自律的なタスク取得**：共有タスクボードから独立してタスクを選択・取得可能
- **直接コミュニケーション能力**：常にチームリーダーを通すのではなく、他のメンバーと直接通信可能

**タスクリスト（TaskList）**

タスクリストはチームの「プロジェクト管理ツール」であり、Jira や Trello に似ています：

- **タスクステータス管理**：各タスクには明確なステータスがある：`pending`、`in_progress`、または `completed`
- **依存関係管理**：タスクは依存関係を定義でき、依存タスクは前提タスクの完了後にのみ開始可能
- **自動アンロックメカニズム**：あるタスクが完了すると、システムは自動的にそれを待っているタスクをチェックしてアンロックする
- **ファイルロックメカニズム**：メンバーがタスクを取得して開始すると、タスクディレクトリにロックファイルが作成され、複数のメンバーが同じファイルを同時に編集するのを防ぐ

**メッセージングシステム（Messaging System）**

メッセージングシステムはチームメンバー間の「チャットツール」です：

- **ポイントツーポイント通信**：メンバー A はメンバー B に直接メッセージを送信可能
- **ブロードキャスト通知**：全メンバーに一度にメッセージを送信可能
- **ファイルシステムベース**：メッセージは JSON ファイルとして `~/.claude/teams/{team-name}/inboxes/` に保存される
- **ネットワーク不要**：すべてローカルファイルシステムを通じて機能し、ネットワーク接続やポートリスニングは不要

### 協力フロー

典型的な Agent Teams のワークフローは次のようになります：

```
ユーザーが複雑な要件を提出
       ↓
チームリーダーが要件を分析しタスクに分解
       ↓
チームメンバーを作成しタスクリストを初期化
       ↓
       ├─→ メンバー A がタスク 1 を取得 ─┐
       ├─→ メンバー B がタスク 2 を取得 ─┼→ 並列実行
       ├─→ メンバー C がタスク 3 を取得 ─┤
       │                             ↓
       └──────────────────────────── メンバーはメッセージングシステムを通じて調整
                                     ↓
                          すべてのタスクが完了したら、チームリーダーが結果を統合
                                     ↓
                          最終出力がユーザーに届けられる
```

### ファイルシステムのレイアウト

Agent Teams はローカルファイルシステム上にチームの状態を管理するための専用ディレクトリを作成します：

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # チーム設定（メンバー一覧、モデル選択など）
│       └── inboxes/
│           ├── team-lead.json   # チームリーダーの受信箱
│           ├── teammate-1.json  # メンバー 1 の受信箱
│           └── teammate-2.json  # メンバー 2 の受信箱
└── tasks/
    └── {team-name}/
        ├── task-1.json          # タスク 1 の詳細情報
        ├── task-2.json          # タスク 2 の詳細情報
        └── current_tasks/
            └── parse_if_statement.txt  # タスク実行中に作成されるロックファイル
```

この設計の利点は **完全な透明性** です。チームの状態、タスクの進捗、メンバー間のコミュニケーション履歴をいつでも検査できます。

---

## クイックスタート

### 実験的機能を有効にする

Agent Teams は現在 **実験的機能** であり、デフォルトでは無効になっています。使用するには、まず有効にする必要があります。

**最も簡単な方法：Claude Code に有効にしてもらう**

Claude Code で次のように入力します：

```
Help me enable Agent Teams in settings.json
```

または：

```
Enable the experimental feature agentTeams
```

Claude Code は自動的に `~/.claude/settings.json` を変更し、次の設定を追加します：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Claude Code を再起動する**

設定が追加された後、**Claude Code を完全に終了して再起動** すると、機能が有効になります。

**手動設定（自動方法が機能しない場合）**：

`~/.claude/settings.json` を手動で編集し、追加または変更します：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**有効になっているか確認する方法**

Claude Code の再起動後、次のような会話を試してみてください：

```
あなた：Agent Team を作成するのを手伝ってもらえますか？

Claude：はい！タスクに協力するための Agent Team を作成するのをお手伝いします...
```

Claude がチーム作成のリクエストを理解して応答する場合、機能は正常に有効になっています。

### ビジュアルモード設定（オプション）

チームメンバーの作業をリアルタイムで見たい場合は、**分割ペイン表示モード** を設定できます。

**Claude Code に設定してもらう**：

Claude Code で次のように入力します：

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

または：

```
Configure agent-teams to use split-panes mode
```

**tmux をインストールする（まだインストールされていない場合）**：

`tmux` がまだインストールされていない場合、Claude Code にインストールを依頼できます：

```
Help me install tmux
```

Claude Code は macOS か Linux かにかかわらず、お使いのオペレーティングシステムに基づいて適切なインストールコマンドを自動的に実行します。

**設定後の結果**：

設定後、チームメンバーは異なる tmux ペインで作業し、「モニタリングウォール」のように、すべての出力を同時に見ることができます。

```
┌─────────────────┬─────────────────┬─────────────────┐
│  メンバー 1      │  メンバー 2      │  メンバー 3      │
│  コードを分析中   │  API を構築中    │  テストを記述中   │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**手動設定（自動方法が機能しない場合）**：

`~/.claude/settings.json` を手動で編集します：

```json
{
  "experimental": {
    "agentTeams": true
  },
  "agent-teams": {
    "displayMode": "split-panes",
    "terminalMultiplexer": "tmux"
  }
}
```

---

### 実践例：Agent Teams でポケモン風 RPG ゲームを構築する

完全なプロジェクトを通じて Agent Teams の力を体験しましょう。この例では、複数の AI チームメンバーが協力してバトルシステム、対話機能、探索要素を含む RPG ゲームをゼロから構築する方法を示します。

**プロジェクト要件**：

次の機能を持つポケモン風ウェブ RPG を構築します：

- **キャラクターシステム**：プレイヤーはレベル、HP、攻撃力、防御力などのステータスを持つキャラクターを作成可能
- **バトルシステム**：攻撃、スキル、アイテム、逃走のオプションを持つターン制バトル
- **モンスターシステム**：異なる属性とスキルを持つ複数の野生モンスター
- **対話システム**：NPC との会話とサブクエスト
- **マップ探索**：プレイヤーがシーン間を移動できるシンプルな 2D マップ
- **セーブシステム**：レベル、位置、完了したクエストなどを含むゲームの進行状況を保存
- **サウンド効果とアニメーション**：攻撃、ダメージ、レベルアップの視覚効果とサウンド効果

**Claude Code で次のように入力します**：

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene switching
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Use Framer Motion for animation
- Use Zustand for state management
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Claude の実行方法**：

**フェーズ 1：アーキテクチャ設計**

チームリーダーはまずメンバー A（ゲームアーキテクト）に全体構造の設計を依頼します：

```
メンバー A がゲームアーキテクチャを設計中...

技術スタック：React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

プロジェクトの初期化：
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

ファイル構造：
src/
├── App.tsx                 # メインアプリコンポーネント
├── main.tsx                # エントリーファイル
├── types/
│   ├── player.ts           # プレイヤーの型定義
│   ├── monster.ts          # モンスターの型定義
│   ├── skill.ts            # スキルの型定義
│   └── game.ts             # ゲーム状態の型
├── stores/
│   └── gameStore.ts        # Zustand 状態管理
├── components/
│   ├── map/                # マップ関連コンポーネント
│   │   ├── MapCanvas.tsx   # マップ Canvas
│   │   ├── PlayerSprite.tsx # プレイヤースプライト
│   │   └── NPCSprite.tsx   # NPC スプライト
│   ├── battle/             # バトル関連コンポーネント
│   │   ├── BattleScreen.tsx    # バトル画面
│   │   ├── BattleMenu.tsx      # バトルメニュー
│   │   ├── HPBar.tsx           # HP バーコンポーネント
│   │   └── BattleLog.tsx       # バトルログ
│   ├── dialog/             # 対話関連コンポーネント
│   │   ├── DialogBox.tsx   # 対話ボックス
│   │   └── Choices.tsx     # 選択肢コンポーネント
│   └── ui/                 # 共有 UI コンポーネント
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # バトルシステムロジック
│   ├── DialogSystem.ts     # 対話システムロジック
│   ├── QuestSystem.ts      # クエストシステムロジック
│   └── MapSystem.ts        # マップシステムロジック
├── hooks/
│   ├── useBattle.ts        # バトルフック
│   ├── useDialog.ts        # 対話フック
│   └── useAudio.ts         # オーディオフック
├── data/
│   ├── monsters.ts         # モンスターデータ
│   ├── skills.ts           # スキルデータ
│   ├── dialogues.ts        # 対話スクリプト
│   └── maps.ts             # マップデータ
└── utils/
    ├── audio.ts            # オーディオユーティリティ
    └── storage.ts          # セーブユーティリティ

コアデータ構造の設計：

// types/player.ts - プレイヤーの型
interface Player {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  position: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  gold: number;
  items: string[];
}

// types/skill.ts - スキルの型
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// ゲームの状態
{
  screen: 'map' | 'battle' | 'dialog' | 'menu',
  player: Player,
  currentMap: string,
  position: {x: number, y: number},
  inBattle: boolean,
  dialogQueue: Array<Dialog>,
  gameData: {
    completedQuests: string[],
    items: string[],
    visitedMaps: string[]
  }
}

バトルシステムの設計：
- ターン制、プレイヤーが先に行動
- 各ターンでプレイヤーは選択可能：攻撃、スキル、アイテム、または逃走
- スキルには PP の制限があり、使い切ると回復が必要
- ダメージ計算式：(攻撃者の攻撃力 / 防御者の防御力) × スキル威力 × ランダム係数 (0.85~1.0)

対話システムの設計：
- テキスト表示にタイプライター効果
- 分岐選択肢をサポート
- 条件付きトリガーをサポート（クエスト完了後など）
- NPC には向きがあり、プレイヤーが近づくと自動的に会話がトリガーされる
```

**フェーズ 2：並列開発**

アーキテクチャが確認されると、チームリーダーはタスクリストを作成し、他のメンバーが並列に作業を開始します：

```
タスクリスト：
├── [メンバー B] バトルシステムのコアロジックを実装（進行中...）
├── [メンバー C] 対話・クエストシステムを実装（進行中...）
├── [メンバー D] 2D マップレンダリングを実装（進行中...）
└── [メンバー E] UI とオーディオを設計（進行中...）
```

<details>
<summary>📁 メンバー B：バトルシステムのコアコード</summary>

```javascript
// battle.js - バトルシステム
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // プレイヤーの攻撃
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} は ${skill.name} を使った！`);
    this.log.push(`${damage} のダメージを与えた！`);

    // スキル効果
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // バトル終了チェック
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} は倒れた！`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // モンスターの攻撃
  monsterAttack() {
    if (this.state !== 'active') return;

    // ランダムにスキルを選択
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} は ${skill.name} を使った！`);
    this.log.push(`${damage} のダメージを与えた！`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} は倒れた...`);
    } else {
      this.turn = 'player';
    }
  }

  // ダメージ計算
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // タイプ相性ボーナス（簡略化）
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // スキル効果を適用
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} はやけどを負った！`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} は HP を ${healAmount} 回復した！`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name} の攻撃力が上がった！`);
        break;
    }
  }

  // 経験値の取得
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} は ${expGain} EXP を獲得した！`);

    // レベルアップチェック
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // レベルアップ
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // ステータス成長
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} はレベル ${this.player.level} になった！`);
    this.log.push(`HP +${hpGain}, 攻撃力 +${atkGain}, 防御力 +${defGain}`);
  }

  // 逃走
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('逃走に成功した！');
      return true;
    } else {
      this.log.push('逃走に失敗した！');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - モンスターデータ
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'スライム',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: '体当たり', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'ゴブリン',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: '体当たり', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'ひっかく', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: '幼竜',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'ひっかく', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'ひのこ', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'なきごえ', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 メンバー C：対話・クエストシステムのコード</summary>

```javascript
// dialog.js - 対話システム
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // 対話を表示
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // 次の対話項目を表示
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // 特別な対話タイプの処理
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // 対話ボックスのレンダリング
  renderDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const speakerEl = document.getElementById('dialogSpeaker');
    const textEl = document.getElementById('dialogText');

    if (this.currentDialog.speaker) {
      speakerEl.textContent = this.currentDialog.speaker;
      speakerEl.style.display = 'block';
    } else {
      speakerEl.style.display = 'none';
    }

    // タイプライター効果
    textEl.textContent = '';
    let i = 0;
    const text = this.currentDialog.text;
    const speed = this.currentDialog.speed || 30;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, speed);

    // 選択肢がある場合は表示
    this.renderChoices();
  }

  // 選択肢のレンダリング
  renderChoices() {
    if (!this.currentDialog.choices) return;

    const choicesEl = document.getElementById('dialogChoices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'block';

    this.currentDialog.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.condition === undefined || choice.condition()) {
          this.dialogQueue = [];
          this.showDialog(choice.dialog, this.onComplete);
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  // 次へ
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // 選択肢がある場合は選択が必要
    this.showNext();
  }
}

// クエストシステム
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // クエストを受諾
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // クエストの進捗を更新
  updateProgress(type, target) {
    this.activeQuests.forEach(questId => {
      const quest = this.quests[questId];
      if (!quest) return;

      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          obj.current = (obj.current || 0) + 1;
          if (obj.current >= obj.required) {
            obj.completed = true;
          }
        }
      });

      this.checkCompletion(questId);
    });
  }

  // クエスト完了をチェック
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // クエストを完了
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // 報酬を与える
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // 報酬を与える
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - 対話スクリプトの例
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: '村長', text: 'おお、冒険者よ... やっと来てくれたか。'},
      {speaker: '村長', text: '最近、村の近くに野生のモンスターがたくさん現れて、皆怖がっているのじゃ。'},
      {speaker: '村長', text: 'もしこれらを追い払ってくれたら、深く感謝するぞ！'},
      {
        choices: [
          {text: 'わかりました、このクエストを受けます', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: '村長', text: '素晴らしい！北にいるスライムを3匹倒してくれ。'},
              {speaker: 'システム', text: 'クエスト【スライムを追い払え】を受諾しました！'}
            ];
          }},
          {text: '今は少し忙しいんです', dialog: [
            {speaker: '村長', text: '分かった。準備ができたらまた来てくれ。'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: '村長', text: '本当にやってくれたか！ありがとう！'},
      {speaker: 'システム', text: 'クエスト【スライムを追い払え】完了！100 EXP を獲得した！'},
      {speaker: '村長', text: 'これを受け取ってくれ。ささやかな感謝の印じゃ。'}
    ]
  },

  shopkeeper: [
    {speaker: '店主', text: 'ようこそ！何かお探しですか？'},
    {
      choices: [
        {text: '商品を見る', dialog: () => {
          game.openShop();
          return [{speaker: '店主', text: '気に入ったものをどうぞ！'}];
        }},
        {text: '立ち去る', dialog: [{speaker: '店主', text: 'またのお越しを！'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 メンバー D：2D マップレンダリングシステムのコード</summary>

```javascript
// map.js - マップレンダリングシステム
class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = 32;
    this.currentMap = null;
    this.player = null;
    this.npcs = [];
    this.camera = {x: 0, y: 0};
  }

  // マップを読み込み
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // マップをレンダリング
  render() {
    if (!this.currentMap) return;

    // Canvas をクリア
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // コンテキストを保存
    this.ctx.save();

    // カメラのオフセットを適用
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // マップレイヤーをレンダリング
    this.renderLayers();

    // NPC をレンダリング
    this.renderNPCs();

    // プレイヤーをレンダリング
    this.renderPlayer();

    // コンテキストを復元
    this.ctx.restore();
  }

  // マップレイヤーをレンダリング
  renderLayers() {
    const map = this.currentMap;

    for (let layer = 0; layer < map.layers.length; layer++) {
      const data = map.layers[layer].data;

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tileId = data[y * map.width + x];
          if (tileId === 0) continue;

          const tileX = x * this.tileSize;
          const tileY = y * this.tileSize;

          this.renderTile(tileX, tileY, tileId);
        }
      }
    }
  }

  // 単一タイルをレンダリング
  renderTile(x, y, tileId) {
    // タイル ID に基づいて異なるタイルを描画
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 草のテクスチャ
        this.ctx.fillStyle = '#3d7f3d';
        for (let i = 0; i < 3; i++) {
          const px = x + Math.random() * this.tileSize;
          const py = y + Math.random() * this.tileSize;
          this.ctx.fillRect(px, py, 2, 2);
        }
        break;

      case 'water':
        this.ctx.fillStyle = '#4a90d9';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 波紋効果
        const wave = Math.sin(Date.now() / 500 + x / 20) * 2;
        this.ctx.fillStyle = '#5aa0e9';
        this.ctx.fillRect(x, y + 10 + wave, this.tileSize, 2);
        break;

      case 'wall':
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = '#7a6248';
        this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        break;

      case 'path':
        this.ctx.fillStyle = '#c4a77d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        break;

      case 'house':
        this.ctx.fillStyle = '#a0522d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 屋根
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // タイルタイプを取得
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // NPC をレンダリング
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // NPC を描画
      this.ctx.fillStyle = npc.color || '#ff6b6b';
      this.ctx.beginPath();
      this.ctx.arc(
        x + this.tileSize / 2,
        y + this.tileSize / 2,
        this.tileSize / 3,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // 名前を描画
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // プレイヤーをレンダリング
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // プレイヤーの体
    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2,
      y + this.tileSize / 2,
      this.tileSize / 3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // プレイヤーの方向指示
    const directions = {UP: [0, -8], DOWN: [0, 8], LEFT: [-8, 0], RIGHT: [8, 0]};
    const [dx, dy] = directions[this.player.direction] || [0, 0];

    this.ctx.fillStyle = '#2d3436';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2 + dx,
      y + this.tileSize / 2 + dy,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  // カメラの位置を更新
  updateCamera() {
    if (!this.player) return;

    // カメラはプレイヤーに追従し、中央に保つ
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // スムーズな移動
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // カメラがマップ境界を超えないようにする
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // 衝突をチェック
  checkCollision(x, y) {
    // マップ境界をチェック
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // タイルの衝突をチェック
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // 壁と家は障害物

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // NPC の衝突をチェック
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // NPC の対話をトリガー
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // NPC の対話をトリガー
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// マップデータの例
const VILLAGE_MAP = {
  name: 'はじまりの村',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // マップデータ（簡略化）
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... その他のマップデータ
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: '村長',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: '店主',
      x: 15,
      y: 8,
      color: '#6bcf7f',
      dialogue: DIALOGUES.shopkeeper,
      direction: 'DOWN'
    }
  ],
  exits: [
    {x: 10, y: 0, to: 'forest_map', spawnX: 5, spawnY: 14}
  ]
};
```

</details>

<details>
<summary>📁 メンバー E：バトル UI のコード</summary>

```html
<!-- バトル画面 HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- 敵エリア -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">スライム</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- プレイヤーエリア -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">勇者</div>
      <div class="level">Lv. <span id="playerLevel">5</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="playerHpBar" style="width: 80%"></div>
      </div>
      <div class="hp-text">
        <span id="playerHp">80</span> / <span id="playerMaxHp">100</span>
      </div>
      <div class="exp-bar">
        <div class="exp-fill" id="expBar" style="width: 60%"></div>
      </div>
    </div>
    <div class="player-sprite">
      <canvas id="playerSprite" width="128" height="128"></canvas>
    </div>
  </div>

  <!-- バトルメニュー -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">攻撃</button>
      <button class="menu-btn" data-action="skills">スキル</button>
      <button class="menu-btn" data-action="items">アイテム</button>
      <button class="menu-btn" data-action="flee">逃走</button>
    </div>
  </div>

  <!-- スキルサブメニュー -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">スキルを選択</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">戻る</button>
  </div>

  <!-- バトルログ -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - バトル画面のスタイル */
.battle-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f7fa 50%, #4a5568 50%, #2d3748 100%);
  display: flex;
  flex-direction: column;
}

.enemy-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.monster-sprite canvas {
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.monster-info {
  margin-left: 40px;
  text-align: center;
}

.monster-info .name {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.monster-info .level {
  font-size: 14px;
  color: #718096;
  margin: 8px 0;
}

.hp-bar {
  width: 200px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a5568;
}

.hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  transition: width 0.3s ease;
}

.hp-text {
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
}

.player-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
}

.player-info {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #4a5568;
}

.exp-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4299e1, #3182ce);
  border-radius: 4px;
}

.battle-menu {
  background: rgba(255,255,255,0.95);
  border: 3px solid #4a5568;
  border-radius: 12px;
  padding: 20px;
  margin: 0 40px 40px;
}

.menu-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.menu-btn {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  border: 2px solid #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: linear-gradient(180deg, #4299e1 0%, #3182ce 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.battle-log {
  position: absolute;
  bottom: 120px;
  left: 40px;
  right: 40px;
  max-height: 100px;
  overflow-y: auto;
  background: rgba(0,0,0,0.7);
  border-radius: 8px;
  padding: 12px;
}

#battleLog {
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}

.log-entry {
  margin-bottom: 4px;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* ヒットアニメーション */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* 攻撃アニメーション */
@keyframes attackRight {
  0% { transform: translateX(0); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

.attack-right {
  animation: attackRight 0.3s ease-in-out;
}
```

</details>

<details>
<summary>📁 オーディオシステムのコード</summary>

```javascript
// audio.js - オーディオシステム
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // オーディオコンテキストの初期化
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // BGM の再生
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // オシレーターを使用してシンプルな BGM を生成
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // シンプルな BGM の生成
  playGeneratedBgm(type) {
    const melodies = {
      battle: [262, 294, 330, 262, 294, 330, 349, 330],
      village: [330, 349, 392, 349, 330, 294, 262, 294],
      victory: [392, 440, 494, 523, 494, 440, 392, 349]
    };

    const melody = melodies[type] || melodies.village;
    let noteIndex = 0;

    const playNote = () => {
      if (this.currentBgm !== type) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = melody[noteIndex];
      osc.type = 'triangle';

      gain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.4);

      noteIndex = (noteIndex + 1) % melody.length;
      setTimeout(playNote, 500);
    };

    playNote();
  }

  // BGM の停止
  stopBgm() {
    this.currentBgm = null;
  }

  // 効果音の再生
  playSfx(sfxName) {
    this.init();

    switch(sfxName) {
      case 'attack':
        this.playAttackSound();
        break;
      case 'hit':
        this.playHitSound();
        break;
      case 'victory':
        this.playVictorySound();
        break;
      case 'levelup':
        this.playLevelUpSound();
        break;
      case 'dialog':
        this.playDialogSound();
        break;
    }
  }

  // 攻撃効果音
  playAttackSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.1
    );
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // ヒット効果音
  playHitSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 100;
    osc.type = 'square';

    gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // 勝利効果音
  playVictorySound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.5
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
      }, i * 150);
    });
  }

  // レベルアップ効果音
  playLevelUpSound() {
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'triangle';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.3
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
      }, i * 100);
    });
  }

  // 対話効果音
  playDialogSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.05
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}
```

</details>

**メンバー間の協力の対話**：

```
メンバー B → メンバー C：
「バトルシステムが完了しました。プレイヤーが勝つと、giveExp() を呼び出してレベルアップします。
クエストシステムを確認して、レベルアップデータが正しく保存されるようにしてください。」

メンバー C → メンバー B：
「了解しました。クエストシステムは localStorage でゲームデータを保存します。
レベル、経験値、完了したクエストのリストが含まれます。オートセーブ機能を追加します。」

メンバー D → 全員：
「マップレンダリングシステムが完了しました。NPC の向きデータが対話システムに接続されています。
プレイヤーが NPC の前に立つと、自動的に対話がトリガーされます。対話システムのトリガーロジックを確認してください。」

メンバー C → メンバー D：
「確認しました。DialogSystem には showDialog() メソッドがあり、対話配列を受け取れます。
すべての NPC 対話データがそのフォーマットに従うようにします。」

メンバー E → メンバー B：
「バトル UI が完了しましたが、HP バーを更新するためにリアルタイムのプレイヤーとモンスターのデータが必要です。
バトルシステムにコールバックはありますか？」

メンバー B → メンバー E：
「はい。BattleSystem には onUpdate コールバックがあり、各ターンの終了時に発火します。
そのコールバックを登録して UI を更新できます。」

メンバー E → メンバー D：
「マップを切り替える際、カメラの位置を再設定する必要があります。
MapRenderer には updateCamera() メソッドはありますか？」

メンバー D → メンバー E：
「はい。updateCamera() は loadMap() の後に自動的に呼び出されます。
プレイヤーの移動後に手動で呼び出して、カメラをスムーズに更新することもできます。」
```

**フェーズ 3：統合とテスト**

すべてのコンポーネントが完了した後、チームリーダーは統合を担当します：

<details>
<summary>📁 メインゲームコントローラーのコード</summary>

```javascript
// game.js - メインゲームコントローラー
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // 各システムを初期化
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // マップを読み込み
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // 入力処理
    this.setupInput();

    // ゲームループを開始
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // セーブデータを自動読み込み
    this.loadGame();
  }

  // プレイヤーを作成
  createPlayer() {
    return {
      name: '勇者',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: '体当たり', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // 入力処理の設定
  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (this.state === 'map') {
        this.handleMapInput(e);
      } else if (this.state === 'dialog') {
        this.handleDialogInput(e);
      } else if (this.state === 'battle') {
        this.handleBattleInput(e);
      }
    });
  }

  // マップ入力処理
  handleMapInput(e) {
    if (this.dialogSystem.isShowing) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.dialogSystem.next();
      }
      return;
    }

    let dx = 0, dy = 0;
    switch(e.key) {
      case 'ArrowUp': case 'w': dy = -1; this.player.direction = 'UP'; break;
      case 'ArrowDown': case 's': dy = 1; this.player.direction = 'DOWN'; break;
      case 'ArrowLeft': case 'a': dx = -1; this.player.direction = 'LEFT'; break;
      case 'ArrowRight': case 'd': dx = 1; this.player.direction = 'RIGHT'; break;
      default: return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (!this.mapRenderer.checkCollision(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.mapRenderer.updateCamera();

      // ランダムエンカウントをチェック
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // ゲームをセーブ
      this.saveGame();
    }
  }

  // 対話入力処理
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // バトル入力処理
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // バトルを開始
  startBattle(monsterData) {
    // ランダムにモンスターを選択
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // モンスターインスタンスを作成
    const monster = {
      ...randomMonster,
      level: Math.max(1, this.player.level + Math.floor(Math.random() * 3) - 1),
      hp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      maxHp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      attack: randomMonster.baseAtk + randomMonster.baseAtk * 0.15 * this.player.level,
      defense: randomMonster.baseDef + randomMonster.baseDef * 0.1 * this.player.level
    };

    this.battleSystem = new BattleSystem(this.player, monster);
    this.state = 'battle';

    // バトル音楽を再生
    this.audioManager.playBgm('battle');

    // バトル画面を表示
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // バトル UI を更新
    this.updateBattleUI();
  }

  // バトル UI を更新
  updateBattleUI() {
    if (!this.battleSystem) return;

    const player = this.battleSystem.player;
    const monster = this.battleSystem.monster;

    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerHp').textContent = Math.floor(player.hp);
    document.getElementById('playerMaxHp').textContent = player.maxHp;
    document.getElementById('playerHpBar').style.width =
      (player.hp / player.maxHp * 100) + '%';

    document.getElementById('enemyName').textContent = monster.name;
    document.getElementById('enemyLevel').textContent = monster.level;
    document.getElementById('enemyHp').textContent = Math.floor(monster.hp);
    document.getElementById('enemyMaxHp').textContent = Math.floor(monster.maxHp);
    document.getElementById('enemyHpBar').style.width =
      (monster.hp / monster.maxHp * 100) + '%';

    // バトルログを更新
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // バトルを終了
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // バトル画面を非表示
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // マップ音楽を再生
    this.audioManager.playBgm('village');

    // ゲームをセーブ
    this.saveGame();
  }

  // ゲームをセーブ
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // ゲームを読み込み
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // メインゲームループ
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Canvas をクリア
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 状態に応じてレンダリング
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// ゲームを開始
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**最終結果**：

約 1〜2 時間で、完全に機能するポケモン風 RPG が完成します！

```
プロジェクトの概要：
✅ ゲームアーキテクチャ設計 - メンバー A
✅ ターン制バトルシステム - メンバー B
✅ 対話・クエストシステム - メンバー C
✅ 2D マップレンダリング - メンバー D
✅ UI とサウンド効果 - メンバー E

プロジェクトファイル：
├── index.html (120 行)
├── css/
│   ├── main.css (100 行)
│   ├── battle.css (180 行)
│   └── dialog.css (80 行)
├── js/
│   ├── game.js (250 行)
│   ├── state.js (60 行)
│   ├── player.js (50 行)
│   ├── monster.js (80 行)
│   ├── battle.js (220 行)
│   ├── dialog.js (180 行)
│   ├── map.js (280 行)
│   └── audio.js (150 行)
└── data/
    ├── monsters.js (100 行)
    ├── skills.js (80 行)
    └── dialogues.js (120 行)

合計：約 2050 行のコード、5 人の AI チームメンバーが協力して完成！

ゲーム機能：
🎮 ターン制バトルシステム（攻撃、スキル、アイテム、逃走）
💬 NPC 対話システム（タイプライター効果、分岐選択肢）
📜 クエストシステム（クエスト受諾、進捗更新、完了報酬）
🗺️ 2D マップ探索（マルチシーン遷移、NPC インタラクション）
💾 オートセーブ（進捗は localStorage に保存）
🔊 サウンド効果と BGM（Web Audio API）
📊 キャラクター成長（経験値、レベルアップ、ステータス上昇）
```

**チームの作業を観察する**：

tmux の分割ペーンモードを設定した場合、複数のターミナルウィンドウが同時に作業しているのを見ることができます：

```
┌─────────────────┬─────────────────┬─────────────────┐
│  メンバー B      │  メンバー C      │  メンバー D      │
│  ダメージ計算式   │  対話スクリプト   │  タイルを        │
│  を実装中        │  を記述中        │  レンダリング中   │
│                 │                 │                 │
│  「メンバー E、  │  「MapRenderer   │  「モンスターに  │
│   HP バーの幅は  │   はまだ        │   攻撃アニメー  │
│   パーセント？「 │   準備できた？「 │   ションが必要...│
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**重要なポイント**：

この実践例は、Agent Teams のいくつかの核心的な利点を示しています：

1. **真の並列開発**：5 人のメンバーが同時に異なるゲームシステムを開発
2. **複雑なプロジェクト管理**：2000 行以上のコードが構造化されて分割・統合される
3. **専門的な役割分担**：バトル、対話、マップ、UI それぞれに専任の担当者がいる
4. **インターフェースの調整**：メンバーはメッセージングシステムを通じてインターフェースとデータ形式を協議
5. **迅速な納品**：1 人で数週間かかる作業をチームで数時間で完了

自分でこのゲームを実行して、AI チームがどのように協力してポケモン風 RPG を構築するかを体験できます。

---

### 単一プロンプトと Agent Teams：自分でテストする

Agent Teams の力をより直接的に感じられるように、自分で試して比較できる2つのテストプランを用意しました。

#### テストプラン A：単一プロンプトアプローチ

これは従来のアプローチです。1つの完全なプロンプトを使用して AI にゲームを開発させます。

**Claude Code で次のように入力します**：

```
Help me build a Pokemon-style web RPG game with the following features:
- Character system (level, HP, attack, defense)
- Turn-based battle system (attack, skills, items, flee)
- NPC dialogue system
- 2D map exploration
- Save system
- Audio system

Use React + TypeScript + Vite + Tailwind CSS.
Please give me complete code that can run directly.
```

**期待される結果**：

| 項目 | 期待される状況 |
|------|---------|
| **コード品質** | AI はすべてのコードを生成しようとするが、コンテキストの制限により多くの詳細が省略されるかコメントに置き換えられる |
| **機能の完全性** | コア機能は存在するかもしれないが、多くの高度な機能が欠落または簡略化される |
| **実行可能性** | バグがある可能性があり、実行するまでに数回のデバッグが必要かもしれない |
| **開発時間** | 1 回の会話で 30〜60 分かかる可能性があり、複数回のやり取りが必要 |
| **コード量** | 約 500〜800 行、AI はコードを圧縮する傾向があるため |

**遭遇する可能性のある問題**：

1. **コードの途切れ**：AI の回答には長さの制限があるため、生成が途中で止まる可能性がある
2. **不完全な機能**：対話システムは基本版のみで、クエストシステムがないかもしれない
3. **詳細の欠落**：オーディオシステムが TODO コメントとして残される可能性がある
4. **デバッグの難しさ**：コードに問題がある場合、同じ会話内で AI に修正を依頼する必要があり、コンテキストがますます混乱する

#### テストプラン B：Agent Teams アプローチ

この記事で紹介したアプローチです。複数の AI チームメンバーに協力して開発させます。

**Claude Code で次のように入力します**（Agent Teams を有効にした後）：

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene transitions
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use plain HTML/CSS/JavaScript
- Use Canvas to render the game screen
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**期待される結果**：

| 項目 | 期待される状況 |
|------|---------|
| **コード品質** | 各メンバーが自分の領域に集中するため、コードはより専門的で完全 |
| **機能の完全性** | すべての機能がより完全に実装され、クエストシステムやマルチシーンマップを含む |
| **実行可能性** | メンバーがインターフェースを相互チェックするため、統合の問題が少ない |
| **開発時間** | 開発が並列に行われるため、約 1〜2 時間ですべての機能が完了 |
| **コード量** | 約 2000 行以上、圧縮されたコードではなく完全な実装 |

#### 定量的比較表

| 次元 | 単一プロンプト | Agent Teams |
|---------|-------------|-------------|
| **総コード行数** | 500-800 行 | 2000+ 行 |
| **開発時間** | 30-60 分、ただし機能は不完全 | 1-2 時間、機能は完全 |
| **機能の完全性** | 60-70% | 95%+ |
| **保守性** | 中程度、通常は1つの大きなファイル | 高い、モジュラー設計 |
| **バグの数** | より多い、検証が少ないため | より少ない、メンバーが相互チェックするため |
| **将来の拡張性** | 困難、コードが密結合のため | 容易、構造がモジュラーのため |
| **トークン使用量** | ~50K トークン | ~200K トークン（5 メンバー） |
| **コスト** | ~$0.50 | ~$2.00 |

#### 推奨される実際のテストプロセス

**ステップ 1：まず単一プロンプトアプローチをテストする**

```
1. 新しい Claude Code の会話を開く
2. 上記の「テストプラン A」のプロンプトを使用する
3. 記録する：どのくらい時間がかかったか？何行のコードが生成されたか？どの機能が欠けていたか？
```

**ステップ 2：次に Agent Teams アプローチをテストする**

```
1. Agent Teams が有効になっていることを確認する
2. 上記の「テストプラン B」のプロンプトを使用する
3. 観察する：チームメンバーはどのように協力しているか？コードはより完全か？
```

**ステップ 3：2 つの結果を比較する**

```
1. 両方のバージョンのコードを別々に実行する
2. 機能リストを比較する：単一プロンプト版にどの機能が欠けているか？
3. コード構造を比較する：Agent Teams 版はよりモジュラーか？
4. 評価する：このゲームの開発を続けるとしたら、どちらのバージョンが拡張しやすいか？
```

#### なぜこれらの違いが生じるのか

**単一プロンプトアプローチの限界**：

1. **コンテキストの圧力**：AI は単一の回答ですべてを処理する必要があるため、簡略化は避けられない
2. **注意の分散**：バトル、対話、マップ、UI がすべて注意を争うため、詳細を見落としやすい
3. **協力的検証の欠如**：インターフェースが一致するかをチェックする人がいないため、バグが発生しやすい

**Agent Teams の利点**：

1. **専門的な役割分担**：各メンバーが1つの領域に集中し、深く掘り下げられる
2. **並列処理**：バトル、対話、マップの開発が同時に行われ、効率が向上
3. **相互検証**：メンバーがインターフェースを協議し、統合の問題を減少
4. **独立したコンテキスト**：各メンバーは独自の 200K コンテキストを持ち、互いに干渉しない

#### 結論

Agent Teams の核心的な価値は、単に「より速い」ということではなく、**「より完全で、よりプロフェッショナル」** であることです。

- スネークゲームのようなシンプルなプロジェクトには、単一プロンプトで十分
- ポケモン RPG のような複雑なプロジェクトには、Agent Teams がより良い結果を生み出す

重要なのは **適切なツールを選択すること**：変数の名前変更に Agent Teams を使用しないでくださいし、完全な RPG ゲームを構築するのに単一プロンプトを使用しないでください。

---

## ベストプラクティス

Agent Teams は強力なツールですが、うまく使用するにはいくつかのベストプラクティスを理解する必要があります。これらの教訓はコミュニティの実際の経験から来ており、一般的な落とし穴を回避しながらチーム協力から最大の価値を得るのに役立ちます。

### プラクティス 1：契約優先

複数の Agent が並列に作業を開始する前に、時間をかけて明確な「契約」、つまりインターフェースの合意を定義してください。

**なぜ重要か**：

メンバー A がバックエンド API を担当し、メンバー B がフロントエンドの統合を担当すると仮定します。インターフェースの形式に事前に合意せずに同時に開始した場合、次のようなことが起こる可能性があります：

```
メンバー A：POST /api/login を実装し、{username, password} を期待
メンバー B：フロントエンドの呼び出しを実装し、{user, pass} を送信
結果：一致せず、やり直しが必要
```

**方法**：

チームを開始する前に、まず Claude にインターフェースを設計させます：

```
まだ開発を開始しないでください。まずユーザー認証システムのインターフェースを設計してください：
1. ログインインターフェースのリクエストとレスポンスの形式
2. 登録インターフェースのリクエストとレスポンスの形式
3. パスワードリセットのフローとインターフェース
4. エラー処理の規約

これらのインターフェースを明確に書き留め、その後チームに開発を開始させてください。
```

**契約に含めるべき内容**：

- 関数のシグネチャとデータ構造
- 入力と出力の JSON 形式
- HTTP ステータスコードの意味
- エラー処理の規約
- フィールドの検証ルール

### プラクティス 2：モデルを賢く割り当てる

異なるタスクには異なるモデルが必要です。良いモデルの割り当ては品質とコストのバランスを取るのに役立ちます。

**チームリーダーに Opus を使用する**：

チームリーダーはタスクの分解と結果の統合を担当するため、より強い推論能力が必要で、Opus が推奨されます：

```
チームを作成してください。チームリーダーは全体の計画と最終レビューに Opus を使用し、
メンバーは実装作業に Sonnet を使用します。
```

**チームメイトに Sonnet を使用する**：

具体的なコーディングとテスト作業には、Sonnet は完全に対応可能であり、大幅に安価です：

- Opus 4.6：出力トークン100万あたり約 $15
- Sonnet 4.5：出力トークン100万あたり約 $3

メンバーに Sonnet を使用することで、全体的なコストを大幅に削減できます。

**特別なケースに Haiku を使用する**：

ドキュメントの更新や小規模なテスト作成タスクのようなシンプルなタスクには、Haiku を検討できます。出力トークン100万あたり約 $0.80 です。

### プラクティス 3：タスクの粒度をコントロールする

大きすぎるタスクや小さすぎるタスクはどちらも効率を損ないます。適切な粒度を見つける必要があります。

**目安**：

各タスクは、1 人のメンバーが **15〜30 分** で独立して完了できるものであるべきです。

**タスクが大きすぎる場合**：

```
悪い例：ユーザー認証システムを実装する
```

このタスクは広すぎます。複数のサブタスクが含まれており、1 人が完了するのに長い時間が必要で、並列性の利点が無駄になります。

**タスクが小さすぎる場合**：

```
悪い例：auth.js という空ファイルを作成する
```

このタスクは小さすぎます。メンバーは実際の作業よりも調整に多くの時間を費やすことになります。

**適切な粒度**：

```
良い例：ログイン API を実装する。以下を含む：
1. POST /api/login エンドポイント
2. ユーザー名とパスワードの検証
3. JWT トークンのレスポンス
4. エラー処理
```

このタスクは明確な境界と成果物があります。1 人が独立して完了でき、過度に細分化されていません。

**推奨される設定**：

各メンバーに **5〜6 個の中規模タスク** を担当させます。これにより、十分な並列性が確保され、調整コストが高くなりすぎません。

### プラクティス 4：ファイルの競合を避ける

複数のメンバーが同じファイルを同時に変更することは、Agent Teams で最も一般的な問題です。

**割り当ての原則**：

異なるメンバーに **異なるファイル** を担当させます：

```
良い例：
- メンバー A：src/auth/ 以下のすべてのファイルを担当
- メンバー B：src/api/ 以下のすべてのファイルを担当
- メンバー C：tests/auth/ 以下のすべてのファイルを担当

悪い例：
- メンバー A とメンバー B が両方とも src/app.js を変更
```

**同じファイルを変更する必要がある場合**：

直列の編集フェーズを設計します：

```
フェーズ 1（並列）：
- メンバー A：auth.js に追加する必要がある機能を分析
- メンバー B：新機能のインターフェースを設計
- メンバー C：テストケースを作成

フェーズ 2（直列）：
- チームリーダーがすべての入力を統合
- 1 人のメンバーが auth.js を一括で統合修正
```

### プラクティス 5：豊富な初期コンテキストを提供する

チームメイトが開始するとき、その会話履歴は空です。チームリーダーやユーザーが以前に何を議論したかを知りません。

**間違ったアプローチ**：

```
チームを作成し、メンバーに作業を開始させる。
```

メンバーは霧の中で開始することになります：これは何のプロジェクトか？どんな技術スタックを使っているのか？何を構築するべきなのか？

**正しいアプローチ**：

```
これは React + Node.js の eコマースプロジェクトで、TypeScript を使用しています。

プロジェクト構造は以下の通り：
- src/frontend/：React フロントエンドコード
- src/backend/：Node.js バックエンドコード
- prisma/：データベースモデル

コードスタイル：
- 関数コンポーネントと Hooks を使用
- バックエンドには Express.js を使用
- データベースには PostgreSQL を使用

チームを作成し、メンバーに src/auth/ にユーザー認証を追加させてください。
```

十分なコンテキストがあって初めて、メンバーは効率的に作業できます。

### プラクティス 6：実装前に調査する

メンバーにすぐにコーディングを開始させないでください。まずソリューションを調査・設計させます。

**2 段階のプロセス**：

**フェーズ 1：調査と設計**

```
チームを作成してください。フェーズ 1 では調査を行います：
- 1 人のメンバーが既存の認証アプローチを調査（JWT vs Session）
- 1 人のメンバーがプロジェクトの技術スタックを分析し、ベストプラクティスを決定
- 1 人のメンバーがデータベーススキーマを設計

調査が完了したら、メンバーにメッセージングシステムを通じて議論させ、最終的な計画を確定させてください。
```

**フェーズ 2：実装**

```
計画が確定したら、実装を開始：
- 1 人のメンバーがバックエンドの認証ロジックを実装
- 1 人のメンバーがフロントエンドのログインページを実装
- 1 人のメンバーがテストを作成
```

この方法の利点は、実装の途中で計画が機能しないことに気づくのではなく、**早期にアーキテクチャの不一致を発見できる** ことです。

### プラクティス 7：積極的に監視・介入する

自動化を設定していても、チームの作業状況を積極的に監視すべきです。

**分割ペーンモードを使用する**：

tmux ペインを設定した場合、すべてのメンバーの出力をリアルタイムで見ることができます：

```
┌─────────────────┬─────────────────┐
│  メンバー 1      │  メンバー 2      │
│  コードを分析中   │  API を         │
│  ...            │  実装中...       │
│                 │                 │
│  待って、この    │                 │
│  アプローチは    │                 │
│  間違っている... │                 │
└─────────────────┴─────────────────┘
```

メンバーが間違った方向に進んでいることに気づいた場合、迅速に介入できます：

```
@メンバー1 ちょっと待って。あなたの分析は間違った方向に向かっている。認証モジュールは src/auth/ の下にあるべきで、src/user/ ではない。
```

**タスクのステータスを定期的に確認する**：

TaskList コマンドを使用してすべてのタスクのステータスを確認します：

```
/tasks
```

これにより、すべてのタスクの状態が表示され、何が完了し、何がまだ実行中で、何がブロックされているかを確認できます。

---

## 適切なシナリオ

Agent Teams は強力ですが、すべてのタスクに適しているわけではありません。適切なシナリオを理解することは、正しい選択に役立ちます。

### Agent Teams が適しているシナリオ

**複雑なシステムのリファクタリング**

リファクタリングが明確な境界を持つ複数のモジュールにまたがる場合：

```
シナリオ：モノリスアプリケーションをマイクロサービスに分割

チームを作成：
- メンバー A：ユーザーモジュールの依存関係を分析
- メンバー B：注文モジュールの依存関係を分析
- メンバー C：決済モジュールの依存関係を分析
- メンバー D：サービス間通信プロトコルを設計
```

これらのモジュールは同時に分析でき、最終的な結果は後で統合できます。直列に分析するよりはるかに速いです。

**多角的なコードレビュー**

複数の次元からコードをレビューする必要がある場合：

```
シナリオ：決済モジュールの完全なセキュリティレビューを実施

チームを作成：
- メンバー A：セキュリティ脆弱性に注目（SQL インジェクション、XSS など）
- メンバー B：パフォーマンスの問題を検査（N+1 クエリ、メモリリークなど）
- メンバー C：エラー処理の完全性を検証
- メンバー D：テストカバレッジを評価
```

各メンバーが1つの次元に集中することで、レビューがより深くなり、最終的なレポートがより完全になります。

**並列のフロントエンド・バックエンド開発**

フロントエンドとバックエンドを同時に構築する必要がある場合：

```
シナリオ：ユーザー管理機能を構築

チームを作成：
- メンバー A（フロントエンド）：ユーザー一覧ページを実装
- メンバー B（フロントエンド）：ユーザー編集ページを実装
- メンバー C（バックエンド）：CRUD API を実装
- メンバー D（調整）：API 契約を設計し、フロントエンドとバックエンドが整合していることを確認
```

API 契約が先に定義されていれば、契約優先の原則に従って、フロントエンドとバックエンドを並列に進めることができます。

**競争的デバッグ**

複数の可能な解決策がある場合：

```
シナリオ：複雑なバグを2つの可能な修正戦略で修正

チームを作成：
- メンバー A：解決策 1 を実装
- メンバー B：解決策 2 を実装
- メンバー C：両方の長所と短所を評価
```

両方の解決策を並列に実装・テストでき、後でより良いものを選択できます。

**ドキュメント生成**

大量のドキュメントを生成する必要がある場合：

```
シナリオ：プロジェクト全体のドキュメントを作成

チームを作成：
- メンバー A：API ドキュメントを作成
- メンバー B：デプロイガイドを作成
- メンバー C：開発ガイドを作成
- メンバー D：トラブルシューティングマニュアルを作成
```

複数のドキュメントを同時に作成でき、効率が大幅に向上します。

### Agent Teams が適していないシナリオ

**シンプルな変更タスク**

```
不適切：変数の名前変更、単一のバグ修正、小さな機能追加
```

これらのタスクでは、チームを開始するコストが実際の作業よりも大きくなります。

**高度に直列なタスク**

```
不適切：厳密に順番に行わなければならないタスク
```

タスク B がタスク A の完了後にしか開始できない場合、並列性のための本当の余地はありません。

**コストに敏感なタスク**

Agent Teams は単一インスタンスの **2〜4 倍** のトークンを消費します（チームサイズによる）。コストが主な懸念事項である場合、単一インスタンスがより良い選択かもしれません。

### 意思決定フローチャート

```
複数の独立したサブタスクがありますか？
    │
    ├─ いいえ → 単一インスタンスを使用
    │
    └─ はい →
         │
         サブタスクを異なるファイルに割り当てられますか？
         │
         ├─ いいえ → 直列実行を検討するか、タスクをさらに分割
         │
         └─ はい →
              │
              コストは許容範囲ですか（2-4倍）？
              │
              ├─ いいえ → 単一インスタンスを使用
              │
              └─ はい → Agent Teams を使用 ✓
```

---

## コストとパフォーマンス

Agent Teams を使用するとコストが増加しますが、大きな効率向上も生み出すことができます。このトレードオフを理解することは、情報に基づいた決定に役立ちます。

### コスト分析

**トークン消費とチームサイズ**

Agent Teams のトークン消費はチームサイズに対してほぼ **線形** です：

| チームサイズ | 相対コスト | 適したシナリオ |
|---------|---------|---------|
| 1 人（単一インスタンス） | 1x | シンプルなタスク |
| 2 人チーム | 2-2.5x | 中程度の複雑さ |
| 3 人チーム | 3-4x | 複雑なタスク |
| 5+ 人チーム | 5-6x+ | 大規模プロジェクト |

**完全に線形ではない理由**：

- **起動コスト**：各メンバーは開始時に初期コンテキストを受け取る必要がある
- **調整コスト**：メンバー間のメッセージングシステムを通じた通信もトークンを消費する
- **チームリーダーのコスト**：チームリーダーは通常 Opus を使用するため、より高価

**具体的な数値例**（Claude 4.5 Sonnet）：

- 入力：100 万トークンあたり $3
- 出力：100 万トークンあたり $15

あるタスクに必要だと仮定：
- チームリーダー（Opus）：50K 入力 + 20K 出力 ≈ $2.25
- 3 人のチームメイト（Sonnet）：各 30K 入力 + 15K 出力 ≈ $2.7 × 3 = $8.1
- **合計**：約 $10.35

同じタスクを単一の Sonnet インスタンスで：
- 100K 入力 + 50K 出力 ≈ $1.05

**コスト倍率**：約 10 倍

**ただし節約される時間**：3 時間から 1 時間に短縮できる可能性

### 効率の向上

**Anthropic 社内テストデータ**：

- 大規模なプロジェクトのリファクタリング：約 **50%** の効率向上
- 並列のマルチモジュール開発：約 **60-70%** の向上
- ドキュメント生成タスク：約 **80%** の向上

**実際のケース**：

Anthropic のエンジニアリングチームはかつて **16 個の並列エージェント** を使用して約 2 週間で C コンパイラを構築しました。このコンパイラは Linux 6.9 カーネルをコンパイルでき、約 10 万行の Rust コードで、GCC テストの 99% を通過しました。

### コスト最適化戦略

**戦略 1：モデルを組み合わせる**：

```
チームリーダー：Opus（強い推論が必要）
チームメイト：Sonnet（コストパフォーマンスが高い）
シンプルなタスク：Haiku（最も安価）
```

**戦略 2：チームサイズを動的に調整する**：

```
分析フェーズ：5 人チーム（多角的な分析）
実装フェーズ：3 人チーム（並列コーディング）
テストフェーズ：2 人チーム（テストと修正）
```

**戦略 3：選択したフェーズのみで Agent Teams を使用する**：

プロジェクト全体で Agent Teams を使用しないでください。最も複雑なフェーズでのみ使用します：

```
フェーズ 1（要件分析）：単一インスタンス
フェーズ 2（アーキテクチャ設計）：Agent Teams（複数の計画を並列に探索）
フェーズ 3（コーディング）：単一インスタンス
フェーズ 4（コードレビュー）：Agent Teams（多角的なレビュー）
フェーズ 5（ドキュメント）：Agent Teams（並列執筆）
```

### 価値がある場合

**価値がある場合**：

- プロジェクトの納期が厳しく、効率向上の価値がトークンコストを上回る場合
- タスクが非常に複雑で、単一インスタンスでは詳細を見逃す可能性が高い場合
- 多角的な分析と検証が必要な場合

**価値がない場合**：

- タスクがシンプルで、チームを開始するオーバーヘッドが高すぎる場合
- コストに非常に敏感で、トークン予算が限られている場合
- タスクが高度に直列で、並列性の余地がない場合

---

## よくある質問

### Q1：Agent Teams は安定していますか？本番環境で使用できますか？

Agent Teams は現在 **実験的機能** であるため、まだバグや不安定な動作がある可能性があります。推奨事項：

- 重要なプロジェクトはまずバックアップを取る
- 小規模なプロジェクトから始めて、テストと習熟を図る
- 公式のリリースノートをフォローして、新バージョンの改善を確認する
- 問題が発生した場合は、速やかに公式チームに報告する

### Q2：最大何人のメンバーを作成できますか？

理論上のハードリミットはありませんが、実用的な観点から：

- 小規模プロジェクト：2〜3 人
- 中規模プロジェクト：3〜5 人
- 大規模プロジェクト：5〜10 人

メンバーが多すぎると次の問題が生じます：

- 調整のオーバーヘッドが急激に増加
- トークン使用量が線形に増加
- ファイルの競合確率が上昇
- 監視と管理が困難に

### Q3：チームメンバーは互いのコンテキストを見ることができますか？

**いいえ**。各チームメイトは完全に独立したコンテキストウィンドウを持っています。メンバーはコンテキストを直接共有するのではなく、メッセージングシステムを通じて通信します。

これは意図的な設計選択であり、利点は：

- あるメンバーの推論が別のメンバーの推論に汚染されない
- 会話が長くなりすぎてコンテキストが混乱しない
- 実際のチームの働き方により近く、誰もが自分の考えを持っている

### Q4：異なるメンバー間で切り替えるにはどうすればよいですか？

分割ペーンモードが設定されていない場合、ショートカットキーを使用できます：

- `Shift+Up`：前のメンバーに切り替え
- `Shift+Down`：次のメンバーに切り替え
- `Ctrl+O`：チームリーダーに戻る

### Q5：タスクが失敗した場合はどうすればよいですか？

あるメンバーのタスクが失敗した場合：

1. そのメンバーの出力ログを読んで失敗の原因を確認
2. 必要に応じてタスクを別のメンバーに再割り当て
3. 手動で介入し、直接問題の解決を支援

### Q6：プロセスの途中でメンバーを追加・削除できますか？

はい。いつでもチームリーダーにコマンドを発行できます：

```
新しいメンバーを追加して、XXX を担当させてください。
```

```
メンバー 3 に現在のタスクを完了したらチームを離れさせてください。
```

### Q7：Agent Teams は MCP や Skills と一緒に使用できますか？

もちろんです。実際、一緒に使用するとさらに効果的です：

- **Agent Teams + Skills**：各メンバーが異なるスキルを持てる
- **Agent Teams + MCP**：異なるメンバーが異なる MCP サーバーを通じて外部リソースにアクセス可能

```
チームを作成：
- メンバー A：フロントエンドデザイン Skill を持ち、UI を担当
- メンバー B：GitHub MCP を通じてリポジトリにアクセスし、PR 管理を担当
- メンバー C：Database MCP を通じてデータをクエリし、分析を担当
```

---

## 参考文献

### 公式リソース

- [公式 Claude Code ドキュメント](https://docs.anthropic.com/en/docs/claude-code) - 完全な Claude Code ドキュメント
- [Anthropic エンジニアリングブログ](https://www.anthropic.com/engineering) - 公式技術ブログとアップデート

### Agent Teams チュートリアル集

**中国語の完全ガイド**：

- [Claude Code Agent Teams 完全ガイド：入門から実践まで](https://m.blog.csdn.net/u010634066/article/details/157903022) - 設定の詳細、実践例、16 の並列エージェントが C コンパイラを構築した注目のケースを含む
- [Claude Code Agent Team での協力開発：完全な実践ガイド](https://m.blog.csdn.net/u010028049/article/details/158126612) - 完全な協力プロジェクトワークフロー
- [Claude Code Agent Teams の設定と使用のステップバイステップガイド](https://cloud.tencent.com/developer/article/2630088) - 詳細な設定手順を含むテンセントクラウドチュートリアル

**実践的な入門**：

- [ネイティブ Claude Code Agent Teams の体験：有効化から3人チームの実行まで](https://www.cnblogs.com/147api/p/19606317) - 3 人チームのウォークスルー
- [Claude Code Agent Teams の初心者向け実践](https://m.toutiao.com/article/7606744384960266793/) - 契約優先などのベストプラクティスを含む初心者向け入門
- [もう一人作業はしない：Agent Teams で 7 人の Claude に同時に開発させよう](https://m.toutiao.com/a7605229732241736202/) - 7 人チームのケーススタディ

**ベストプラクティス**：

- [Agent Teams のベストプラクティス：契約優先、タスクの粒度、モデルの割り当て](https://blog.csdn.net/sinat_37574187/article/details/144727588) - 7 つのベストプラクティスの詳細な解説
- [7 年の大手テック企業経験者の Claude Code 実戦マニュアル：初心者からエキスパートまでの8つのルール](https://new.qq.com/rain/a/20260111A02HE900) - エンタープライズレベルの実際の経験

**原理と比較**：

- [Claude Code Agent Teams：マルチエージェント協力の正しいやり方](https://post.m.smzdm.com/p/adoezrmz/) - マルチエージェント協力の深い分析
- [Claude Code マルチエージェントチーム開発：原理から落とし穴までの完全ガイド](https://m.toutiao.com/a7605229732241736202/) - 実際の使用からの原理と落とし穴

### 公式ガイドの翻訳

- [Claude が公式に「Agent 構築ガイド」をリリース（PDF ダウンロード付き）](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - 公式 Agent 構築ガイド
- [Claude 公式「効果的な Agent の構築ガイド」の完全翻訳版](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - 完全な中国語翻訳

### 関連技術

- [Agent Skills 標準](https://agentskills.io/) - Skills エコシステム
- [skills.sh - Agent Skills アプリストア](https://skills.sh/) - 70,000 以上のスキルライブラリ
