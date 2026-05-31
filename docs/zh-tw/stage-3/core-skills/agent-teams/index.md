# Claude Agent Teams 完整指南

## Agent Teams 簡介

**Agent Teams** 是 Claude Code 中的一項革命性功能，允許**多個獨立的 AI 實例像真正的開發團隊一樣協作**。

想像一下，過去使用 Claude Code 就像是一位專案經理帶著一位能力超強的助手。無論任務多複雜，都只有這一位助手在工作。現在，有了 Agent Teams，你可以組建一支完整的 AI 開發團隊：一位成員負責前端，一位負責後端，一位負責測試，他們可以**同時工作、相互溝通、協作完成複雜任務**。

### 從單一助手到團隊協作

在深入了解 Agent Teams 之前，我們先來看看它解決了什麼問題。

**單一 AI 模式的限制**：

當你使用單一 Claude 實例處理一個複雜專案時，會遇到以下瓶頸：

- **序列處理瓶頸**：AI 一次只能做一件事。例如在重構一個專案時，它可能需要先分析認證模組，然後是資料庫模組，最後是 API 模組。這些步驟必須依序進行，即使它們之間並沒有依賴關係。

- **上下文擁擠問題**：所有資訊都存在於單一對話視窗中。隨著對話變長，早期的重要細節可能被淹沒，AI 可能忘記之前討論過的關鍵決策。

- **單一視角限制**：只有一個 AI 在思考，沒有多角度的討論或驗證。當出現複雜的設計決策時，沒有「隊友」可以辯論或提供不同的觀點。

- **效率天花板**：大型重構或多模組開發需要很長時間，無法透過並行處理來加速。

**Agent Teams 的解決方案**：

Agent Teams 透過**多實例並行協作**來解決這些問題：

- **真正的並行工作**：多個 AI 可以同時處理不同的任務。一個處理前端 UI，另一個處理後端 API，還有一個處理資料庫設計，互不干擾。

- **獨立的上下文空間**：每個團隊成員都有自己的完整 200K token 上下文視窗，重要資訊不會因為對話過長而「被遺忘」。

- **團隊協作能力**：成員之間可以直接溝通、討論設計決策、互相驗證程式碼品質，就像一個真正的開發團隊。

- **顯著的效率提升**：根據 Anthropic 內部測試，大型專案重構的效率可提升約 50%。

---

## Agent Teams 與 Subagent 的比較

在深入了解 Agent Teams 的架構之前，我們需要先釐清一個常見的困惑：**Agent Teams 和 Subagent 有什麼區別**？

兩個功能都涉及「多個 AI 協作」，但它們的協作模式完全不同，適用於不同的場景。

### 核心差異一覽

| 維度 | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **拓撲結構** | 星狀拓撲：所有子代理向主代理回報 | 網狀拓撲：成員之間可以互相溝通 |
| **溝通方式** | 主代理透過提示詞明確傳遞資訊，子代理完成後回傳結果 | 成員可以直接溝通、討論、協調 |
| **上下文管理** | 每個子代理有獨立上下文，主代理只傳遞必要資訊 | 每個成員有完全獨立的上下文 |
| **並行性** | 可以並行執行，但協作鏈仍以主代理為中心 | 真正的並行開發和協作 |
| **任務協調** | 主代理集中分派和協調一切 | 成員可以更自主地認領任務 |
| **成本** | 不低。多個子代理並行時 token 用量疊加 | 較高。成員獨立執行且溝通更頻繁 |

### 直觀的類比

**Subagent 就像**：一位經理為幾位助手分別寫了任務單。每位助手根據自己的任務單獨立工作，完成後只將結果回報給經理。助手之間不直接溝通，經理也看不到助手工作時的完整思考過程。

```
You → 主代理 → 子代理 A：「分析這個檔案」
You → 主代理 → 子代理 B：「搜尋那個函式」
         ↓
    子代理 A 完成 → 向主代理回報結果
    子代理 B 完成 → 向主代理回報結果
         ↓
    主代理彙整結果 → 回報給你
```

**Agent Teams 就像**：一位專案經理帶領一個真正的開發團隊。團隊成員可以直接溝通、討論、協作，而不是把每個細節都透過專案經理轉達。

```
You → 團隊負責人：「建立一個使用者認證功能」
         ↓
    團隊負責人建立團隊並分配任務
         ↓
    成員 A：「@成員 B，API 介面設計好了嗎？」
    成員 B：「好了，格式是這樣的...」
    成員 C：「我審查了介面，發現有個問題需要討論...」
         ↓
    團隊成員協作完成工作 → 團隊負責人彙整結果 → 回報給你
```

### 何時使用哪個

**使用 Subagent 的場景**：

- 有一個快速、明確的單一任務，例如「搜尋這個錯誤代碼」
- 任務之間的依賴性不高
- 需要並行執行，但不需要成員之間持續討論

**使用 Agent Teams 的場景**：

- 進行跨越多個模組的複雜系統重構
- 需要多角度分析和討論，例如安全專家和效能專家辯論一個解決方案
- 需要真正的並行開發，前端、後端和測試同時進行
- 任務需要頻繁的協調和資訊分享

### 簡單總結

- **Subagent**：一個任務分派工具，將大任務拆成小任務分派給不同的「工人」
- **Agent Teams**：一個真正的協作團隊，成員可以像真正團隊一樣溝通、討論、共同工作

---

## 核心架構

Agent Teams 不只是一個簡單的「開啟多個實例」功能。它是一個完整的**多代理協作系統**。要理解它，我們需要了解它的核心元件以及它們如何協同工作。

### 團隊組成

一個 Agent Team 由四個核心元件組成，每個元件都有自己的職責，共同完成複雜任務。

**團隊負責人（Team Lead）**

團隊負責人是整個團隊的「大腦」和「協調者」。它不直接執行程式設計任務，而是負責：

- **需求分析和任務分解**：將使用者的複雜需求拆分為多個可並行執行的子任務
- **團隊建立和管理**：決定需要多少成員以及每個成員應該做什麼
- **任務分派和調度**：將任務分派給合適的成員，管理任務之間的依賴關係
- **結果彙整和品質控制**：收集每位成員的工作成果，進行整合和最終審查

**團隊成員（Teammates）**

團隊成員是實際工作的「開發者」。每位成員都是一個獨立的 Claude 實例：

- **獨立的上下文視窗**：每個成員都有完整的 200K token 上下文視窗，與團隊負責人和其他成員完全隔離
- **完整的工具權限**：可以使用 Read、Write、Edit、Bash 等所有工具
- **自主認領任務**：可以獨立從共享任務面板中選擇和認領任務
- **直接溝通能力**：可以直接與其他成員溝通，而不需要每次都透過團隊負責人

**任務清單（TaskList）**

TaskList 是團隊的「專案管理工具」，類似於 Jira 或 Trello：

- **任務狀態管理**：每個任務都有明確的狀態：`pending`、`in_progress` 或 `completed`
- **依賴管理**：任務可以定義依賴關係，有依賴的任務只能在前置任務完成後才能開始
- **自動解鎖機制**：當一個任務完成時，系統會自動檢查並解鎖正在等待該任務的其他任務
- **檔案鎖定機制**：當成員認領並開始一個任務時，會在任務目錄中建立鎖定檔案，防止多個成員同時編輯同一個檔案

**訊息系統（Messaging System）**

訊息系統是團隊成員之間的「聊天工具」：

- **點對點通訊**：成員 A 可以直接向成員 B 發送訊息
- **廣播公告**：可以一次向所有成員發送訊息
- **基於檔案系統**：訊息以 JSON 檔案的形式儲存在 `~/.claude/teams/{team-name}/inboxes/` 中
- **無需網路**：一切完全透過本地檔案系統運作，不需要網路連線或連接埠監聽

### 協作流程

一個典型的 Agent Teams 工作流程如下：

```
使用者提交一個複雜需求
       ↓
團隊負責人分析需求並拆分為任務
       ↓
建立團隊成員並初始化任務清單
       ↓
       ├─→ 成員 A 認領任務 1 ─┐
       ├─→ 成員 B 認領任務 2 ─┼→ 並行執行
       ├─→ 成員 C 認領任務 3 ─┤
       │                      ↓
       └──────────────────── 成員透過訊息系統協調
                              ↓
                   所有任務完成後，團隊負責人彙整結果
                              ↓
                   最終輸出交付給使用者
```

### 檔案系統佈局

Agent Teams 會在你的本地檔案系統上建立專門的目錄來管理團隊狀態：

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # 團隊設定（成員列表、模型選擇等）
│       └── inboxes/
│           ├── team-lead.json   # 團隊負責人的收件匣
│           ├── teammate-1.json  # 成員 1 的收件匣
│           └── teammate-2.json  # 成員 2 的收件匣
└── tasks/
    └── {team-name}/
        ├── task-1.json          # 任務 1 的詳細資訊
        ├── task-2.json          # 任務 2 的詳細資訊
        └── current_tasks/
            └── parse_if_statement.txt  # 任務執行時建立的鎖定檔案
```

這種設計的好處是**完全透明**：你可以隨時檢查團隊狀態、任務進度以及成員之間的溝通歷史。

---

## 快速開始

### 啟用實驗性功能

Agent Teams 目前是一個**實驗性功能**，預設是停用的。要使用它，需要先啟用。

**最簡單的方式：讓 Claude Code 為你啟用**

直接在 Claude Code 中輸入：

```
幫我在 settings.json 中啟用 Agent Teams
```

或者：

```
啟用實驗性功能 agentTeams
```

Claude Code 會自動修改 `~/.claude/settings.json`，新增以下設定：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**重新啟動 Claude Code**

設定新增後，**完全退出並重新啟動 Claude Code**，功能就會生效。

**手動設定（如果自動方式不起作用）**：

你可以手動編輯 `~/.claude/settings.json`，新增或修改：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**如何驗證是否已啟用**

重新啟動 Claude Code 後，嘗試這樣的對話：

```
你：可以幫我建立一個 Agent Team 嗎？

Claude：可以！我可以幫你建立一個 Agent Team 來協作處理任務...
```

如果 Claude 能理解並回應建立團隊的請求，就表示功能已成功啟用。

### 視覺化模式設定（可選）

如果你想即時查看團隊成員的工作狀態，可以設定**分割面板顯示模式**。

**讓 Claude Code 為你設定**：

直接在 Claude Code 中輸入：

```
幫我在 settings.json 中啟用 Agent Teams 的分割面板顯示模式，使用 tmux
```

或者：

```
設定 agent-teams 使用 split-panes 模式
```

**安裝 tmux（如果尚未安裝）**：

如果還沒有安裝 `tmux`，可以請 Claude Code 幫你安裝：

```
幫我安裝 tmux
```

Claude Code 會根據你的作業系統自動執行適當的安裝指令，無論是 macOS 還是 Linux。

**設定後的效果**：

設定完成後，團隊成員將在不同的 tmux 面板中工作，你可以同時看到所有成員的輸出，就像一面「監控牆」。

```
┌─────────────────┬─────────────────┬─────────────────┐
│  成員 1         │  成員 2         │  成員 3         │
│  分析程式碼中   │  建置 API 中    │  撰寫測試中     │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**手動設定（如果自動方式不起作用）**：

你可以手動編輯 `~/.claude/settings.json`：

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

### 實戰範例：使用 Agent Teams 建立一個寶可夢風格的 RPG 遊戲

讓我們透過一個完整的專案來體驗 Agent Teams 的強大之處。這個範例將展示多個 AI 團隊成員如何協作從零開始建立一個 RPG 遊戲，包含戰鬥系統、對話功能和探索要素。

**專案需求**：

建立一個寶可夢風格的網頁 RPG 遊戲，具備以下功能：

- **角色系統**：玩家可以建立角色，包含等級、HP、攻擊力、防禦力等屬性
- **戰鬥系統**：回合制戰鬥，可選擇攻擊、技能、道具和逃跑
- **怪物系統**：多種野生怪物，具有不同的屬性和技能
- **對話系統**：NPC 對話和支線任務
- **地圖探索**：簡單的 2D 地圖，玩家可以在場景之間移動
- **存檔系統**：儲存遊戲進度，包含等級、位置、已完成任務等
- **音效和動畫**：攻擊、受傷和升級時的視覺效果和音效

**在 Claude Code 中輸入**：

```
我想建立一個寶可夢風格的網頁 RPG 遊戲。

建立一個團隊來協作開發：

團隊成員職責：
- 成員 A（遊戲架構師）：設計整體架構，定義遊戲狀態機，規劃資料結構
- 成員 B（戰鬥系統）：實作回合制戰鬥邏輯、技能系統和傷害計算
- 成員 C（對話系統）：實作 NPC 對話、任務系統和劇本腳本
- 成員 D（地圖渲染）：使用 Canvas 實作 2D 地圖渲染、角色移動和場景切換
- 成員 E（UI 與音效）：設計遊戲介面、戰鬥 UI 和音效播放

技術要求：
- 使用 React + TypeScript + Vite
- 使用 Tailwind CSS 進行樣式設計
- 使用 Framer Motion 處理動畫
- 使用 Zustand 管理狀態
- 回合制戰鬥系統
- 使用 localStorage 儲存資料
- 使用 Web Audio API 處理音效

每位成員使用 Sonnet，團隊負責人使用 Opus。

先請架構師設計整體方案。資料結構定義完成後，再讓其他成員並行開發。
```

**Claude 將如何執行**：

**第一階段：架構設計**

團隊負責人會先請成員 A（遊戲架構師）設計整體結構：

```
成員 A 正在設計遊戲架構...

技術堆疊：React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

專案初始化：
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

檔案結構：
src/
├── App.tsx                 # 主應用元件
├── main.tsx                # 進入點檔案
├── types/
│   ├── player.ts           # 玩家型別定義
│   ├── monster.ts          # 怪物型別定義
│   ├── skill.ts            # 技能型別定義
│   └── game.ts             # 遊戲狀態型別
├── stores/
│   └── gameStore.ts        # Zustand 狀態管理
├── components/
│   ├── map/                # 地圖相關元件
│   │   ├── MapCanvas.tsx   # 地圖 Canvas
│   │   ├── PlayerSprite.tsx # 玩家精靈
│   │   └── NPCSprite.tsx   # NPC 精靈
│   ├── battle/             # 戰鬥相關元件
│   │   ├── BattleScreen.tsx    # 戰鬥畫面
│   │   ├── BattleMenu.tsx      # 戰鬥選單
│   │   ├── HPBar.tsx           # HP 血條元件
│   │   └── BattleLog.tsx       # 戰鬥日誌
│   ├── dialog/             # 對話相關元件
│   │   ├── DialogBox.tsx   # 對話框
│   │   └── Choices.tsx     # 選項元件
│   └── ui/                 # 共用 UI 元件
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # 戰鬥系統邏輯
│   ├── DialogSystem.ts     # 對話系統邏輯
│   ├── QuestSystem.ts      # 任務系統邏輯
│   └── MapSystem.ts        # 地圖系統邏輯
├── hooks/
│   ├── useBattle.ts        # 戰鬥 hook
│   ├── useDialog.ts        # 對話 hook
│   └── useAudio.ts         # 音效 hook
├── data/
│   ├── monsters.ts         # 怪物資料
│   ├── skills.ts           # 技能資料
│   ├── dialogues.ts        # 對話腳本
│   └── maps.ts             # 地圖資料
└── utils/
    ├── audio.ts            # 音效工具
    └── storage.ts          # 存檔工具

核心資料結構設計：

// types/player.ts - 玩家型別
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

// types/skill.ts - 技能型別
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// 遊戲狀態
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

戰鬥系統設計：
- 回合制，玩家先行動
- 每回合玩家可選擇：攻擊、技能、道具或逃跑
- 技能有 PP 限制，耗盡後需要恢復
- 傷害公式：（攻擊方攻擊力 / 防禦方防禦力）× 技能威力 × 隨機係數（0.85~1.0）

對話系統設計：
- 打字機效果的文字顯示
- 支援分支選項
- 支援條件觸發，例如任務完成後
- NPC 有面向方向，玩家靠近時自動觸發對話
```

**第二階段：並行開發**

架構確認後，團隊負責人建立任務清單，其他成員開始並行工作：

```
任務清單：
├── [成員 B] 實作戰鬥系統核心邏輯（進行中...）
├── [成員 C] 實作對話和任務系統（進行中...）
├── [成員 D] 實作 2D 地圖渲染（進行中...）
└── [成員 E] 設計 UI 和音效（進行中...）
```

<details>
<summary>📁 成員 B：戰鬥系統核心程式碼</summary>

```javascript
// battle.js - 戰鬥系統
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // 玩家攻擊
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} 使用了 ${skill.name}！`);
    this.log.push(`造成了 ${damage} 點傷害！`);

    // 技能效果
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // 檢查戰鬥是否結束
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} 倒下了！`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // 怪物攻擊
  monsterAttack() {
    if (this.state !== 'active') return;

    // 隨機選擇技能
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} 使用了 ${skill.name}！`);
    this.log.push(`造成了 ${damage} 點傷害！`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} 倒下了...`);
    } else {
      this.turn = 'player';
    }
  }

  // 傷害計算
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // 屬性相剋加成（簡化版）
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // 套用技能效果
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} 被燒傷了！`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} 恢復了 ${healAmount} HP！`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name} 的攻擊力提升了！`);
        break;
    }
  }

  // 獲得經驗值
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} 獲得了 ${expGain} 點經驗值！`);

    // 升級檢查
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // 升級
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // 屬性成長
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} 升到了 ${this.player.level} 級！`);
    this.log.push(`HP +${hpGain}，攻擊力 +${atkGain}，防禦力 +${defGain}`);
  }

  // 逃跑
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('成功逃跑了！');
      return true;
    } else {
      this.log.push('逃跑失敗！');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - 怪物資料
const MONSTER_DATA = [
  {
    id: 'slime',
    name: '史萊姆',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: '撞擊', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: '哥布林',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: '撞擊', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: '抓擊', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: '幼龍',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: '抓擊', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: '火花', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: '低吼', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 成員 C：對話和任務系統程式碼</summary>

```javascript
// dialog.js - 對話系統
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // 顯示對話
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // 顯示下一條對話
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // 處理特殊對話類型
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // 渲染對話框
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

    // 打字機效果
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

    // 如果有選項則顯示
    this.renderChoices();
  }

  // 渲染選項
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

  // 下一條
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // 有選項時必須選擇
    this.showNext();
  }
}

// 任務系統
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // 接受任務
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // 更新任務進度
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

  // 檢查任務完成
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // 完成任務
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // 發放獎勵
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // 發放獎勵
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - 對話腳本範例
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: '村長', text: '哦，冒險者... 你終於來了。'},
      {speaker: '村長', text: '最近我們村莊附近出現了許多野生怪物，大家都很害怕。'},
      {speaker: '村長', text: '如果你能幫忙趕走它們，我會非常感激！'},
      {
        choices: [
          {text: '好的，我接受這個任務', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: '村長', text: '太好了！請到北方擊敗 3 隻史萊姆。'},
              {speaker: '系統', text: '任務【趕走史萊姆】已接受！'}
            ];
          }},
          {text: '我現在有點忙', dialog: [
            {speaker: '村長', text: '好的，準備好了再來找我。'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: '村長', text: '你真的做到了！非常感謝！'},
      {speaker: '系統', text: '任務【趕走史萊姆】已完成！你獲得了 100 經驗值！'},
      {speaker: '村長', text: '請收下這個，這是我的一點心意。'}
    ]
  },

  shopkeeper: [
    {speaker: '商店老闆', text: '歡迎光臨！需要什麼嗎？'},
    {
      choices: [
        {text: '瀏覽商品', dialog: () => {
          game.openShop();
          return [{speaker: '商店老闆', text: '喜歡什麼就拿吧！'}];
        }},
        {text: '離開', dialog: [{speaker: '商店老闆', text: '下次再來！'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 成員 D：2D 地圖渲染系統程式碼</summary>

```javascript
// map.js - 地圖渲染系統
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

  // 載入地圖
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // 渲染地圖
  render() {
    if (!this.currentMap) return;

    // 清除畫布
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 儲存上下文
    this.ctx.save();

    // 套用攝影機偏移
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // 渲染地圖圖層
    this.renderLayers();

    // 渲染 NPC
    this.renderNPCs();

    // 渲染玩家
    this.renderPlayer();

    // 還原上下文
    this.ctx.restore();
  }

  // 渲染地圖圖層
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

  // 渲染單個圖塊
  renderTile(x, y, tileId) {
    // 根據圖塊 ID 繪製不同的圖塊
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 草地紋理
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
        // 水波紋效果
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
        // 屋頂
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // 取得圖塊類型
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // 渲染 NPC
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // 繪製 NPC
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

      // 繪製名稱
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // 渲染玩家
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // 玩家身體
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

    // 玩家方向指示
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

  // 更新攝影機位置
  updateCamera() {
    if (!this.player) return;

    // 攝影機跟隨玩家並保持其居中
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // 平滑移動
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // 防止攝影機超出地圖邊界
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // 檢查碰撞
  checkCollision(x, y) {
    // 檢查地圖邊界
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // 檢查圖塊碰撞
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // 牆壁和房屋是障礙物

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // 檢查 NPC 碰撞
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // 觸發 NPC 對話
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // 觸發 NPC 對話
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// 範例地圖資料
const VILLAGE_MAP = {
  name: '新手村',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // 地圖資料（簡化版）
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... 更多地圖資料
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
      name: '商店老闆',
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
<summary>📁 成員 E：戰鬥 UI 程式碼</summary>

```html
<!-- 戰鬥畫面 HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- 敵方區域 -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">史萊姆</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- 玩家區域 -->
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

  <!-- 戰鬥選單 -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">攻擊</button>
      <button class="menu-btn" data-action="skills">技能</button>
      <button class="menu-btn" data-action="items">道具</button>
      <button class="menu-btn" data-action="flee">逃跑</button>
    </div>
  </div>

  <!-- 技能子選單 -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">選擇一個技能</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">返回</button>
  </div>

  <!-- 戰鬥日誌 -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - 戰鬥畫面樣式 */
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

/* 受擊動畫 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* 攻擊動畫 */
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
<summary>📁 音效系統程式碼</summary>

```javascript
// audio.js - 音效系統
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // 初始化音效上下文
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // 播放背景音樂
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // 使用振盪器生成簡單的背景音樂
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // 生成簡單背景音樂
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

  // 停止背景音樂
  stopBgm() {
    this.currentBgm = null;
  }

  // 播放音效
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

  // 攻擊音效
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

  // 受擊音效
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

  // 勝利音效
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

  // 升級音效
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

  // 對話音效
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

**成員之間的協作對話**：

```
成員 B → 成員 C：
「戰鬥系統完成了。玩家勝利時會呼叫 giveExp() 進行升級。
請檢查任務系統，確保升級資料被正確儲存。」

成員 C → 成員 B：
「收到。任務系統使用 localStorage 儲存遊戲資料，
包含等級、經驗值和已完成任務列表。我會新增一個自動儲存機制。」

成員 D → 所有人：
「地圖渲染系統完成了，NPC 面向資料已連接到對話系統。
當玩家面向 NPC 時，對話會自動觸發。請確認對話系統中的觸發邏輯。」

成員 C → 成員 D：
「確認了。DialogSystem 有一個 showDialog() 方法可以接受對話陣列。
我會確保所有 NPC 對話資料都遵循這個格式。」

成員 E → 成員 B：
「戰鬥 UI 完成了，但我需要即時的玩家和怪物資料來更新 HP 血條。
戰鬥系統有提供回呼函式嗎？」

成員 B → 成員 E：
「有的。BattleSystem 有一個 onUpdate 回呼，會在每回合結束時觸發。
你可以註冊那個回呼來更新 UI。」

成員 E → 成員 D：
「切換地圖時，我們需要重新定位攝影機。
MapRenderer 有提供 updateCamera() 方法嗎？」

成員 D → 成員 E：
「有的。每次 loadMap() 後都會自動呼叫 updateCamera()。
你也可以在玩家移動後手動呼叫它來平滑更新攝影機。」
```

**第三階段：整合和測試**

所有元件完成後，團隊負責人負責整合：

<details>
<summary>📁 主遊戲控制器程式碼</summary>

```javascript
// game.js - 主遊戲控制器
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // 初始化各個系統
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // 載入地圖
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // 輸入處理
    this.setupInput();

    // 開始遊戲迴圈
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // 自動載入存檔
    this.loadGame();
  }

  // 建立玩家
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
        {id: 'tackle', name: '撞擊', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // 設定輸入處理
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

  // 地圖輸入處理
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

      // 檢查隨機戰鬥
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // 儲存遊戲
      this.saveGame();
    }
  }

  // 對話輸入處理
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // 戰鬥輸入處理
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // 開始戰鬥
  startBattle(monsterData) {
    // 隨機選擇一隻怪物
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // 建立怪物實例
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

    // 播放戰鬥音樂
    this.audioManager.playBgm('battle');

    // 顯示戰鬥畫面
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // 更新戰鬥 UI
    this.updateBattleUI();
  }

  // 更新戰鬥 UI
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

    // 更新戰鬥日誌
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // 結束戰鬥
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // 隱藏戰鬥畫面
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // 播放地圖音樂
    this.audioManager.playBgm('village');

    // 儲存遊戲
    this.saveGame();
  }

  // 儲存遊戲
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // 載入遊戲
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // 主遊戲迴圈
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // 清除畫布
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 根據狀態渲染
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// 啟動遊戲
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**最終成果**：

大約 1 到 2 小時後，一個功能完整的寶可夢風格 RPG 就完成了！

```
專案總結：
✅ 遊戲架構設計 - 成員 A
✅ 回合制戰鬥系統 - 成員 B
✅ 對話和任務系統 - 成員 C
✅ 2D 地圖渲染 - 成員 D
✅ UI 和音效 - 成員 E

專案檔案：
├── index.html（120 行）
├── css/
│   ├── main.css（100 行）
│   ├── battle.css（180 行）
│   └── dialog.css（80 行）
├── js/
│   ├── game.js（250 行）
│   ├── state.js（60 行）
│   ├── player.js（50 行）
│   ├── monster.js（80 行）
│   ├── battle.js（220 行）
│   ├── dialog.js（180 行）
│   ├── map.js（280 行）
│   └── audio.js（150 行）
└── data/
    ├── monsters.js（100 行）
    ├── skills.js（80 行）
    └── dialogues.js（120 行）

總計：約 2050 行程式碼，由 5 位 AI 團隊成員協作完成！

遊戲功能：
🎮 回合制戰鬥系統（攻擊、技能、道具、逃跑）
💬 NPC 對話系統（打字機效果、分支選項）
📜 任務系統（接受任務、更新進度、完成獎勵）
🗺️ 2D 地圖探索（多場景切換、NPC 互動）
💾 自動存檔（使用 localStorage 儲存進度）
🔊 音效和背景音樂（Web Audio API）
📊 角色成長（經驗值、升級、屬性提升）
```

**觀察團隊工作**：

如果你設定了 tmux 分割面板模式，你會看到多個終端視窗同時工作：

```
┌─────────────────┬─────────────────┬─────────────────┐
│  成員 B         │  成員 C         │  成員 D         │
│  實作傷害公式   │  撰寫對話腳本   │  渲染圖塊       │
│                 │                 │                 │
│  「成員 E，     │  「MapRenderer  │  「怪物需要     │
│   HP 血條的     │   好了嗎？」     │   攻擊動畫...」 │
│   寬度是        │                 │                 │
│   百分比嗎？」  │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**關鍵收穫**：

這個實戰範例展示了 Agent Teams 的幾個核心優勢：

1. **真正的並行開發**：5 位成員同時開發不同的遊戲系統
2. **複雜專案管理**：2000+ 行程式碼以結構化的方式被拆分和整合
3. **專業分工**：戰鬥、對話、地圖和 UI 各有專人負責
4. **介面協調**：成員透過訊息系統協商介面和資料格式
5. **快速交付**：一個人可能需要數週的工作，團隊在幾小時內完成

你可以親自嘗試執行這個遊戲，體驗 AI 團隊如何協作建立一個寶可夢風格的 RPG。

---

### 單一提示詞 vs Agent Teams：親自測試比較

為了讓你更直觀地感受 Agent Teams 的強大之處，我們準備了兩個測試方案，你可以親自嘗試並比較。

#### 測試方案 A：單一提示詞方式

這是傳統方式：使用一個完整的提示詞，請 AI 開發遊戲。

**在 Claude Code 中輸入**：

```
幫我建立一個寶可夢風格的網頁 RPG 遊戲，具備以下功能：
- 角色系統（等級、HP、攻擊力、防禦力）
- 回合制戰鬥系統（攻擊、技能、道具、逃跑）
- NPC 對話系統
- 2D 地圖探索
- 存檔系統
- 音效系統

使用 React + TypeScript + Vite + Tailwind CSS。
請給我完整可執行的程式碼。
```

**預期結果**：

| 項目 | 預期情況 |
|------|---------|
| **程式碼品質** | AI 會嘗試生成所有程式碼，但由於上下文限制，許多細節會被省略或以註解代替 |
| **功能完整性** | 核心功能可能有，但許多進階功能會缺失或被簡化 |
| **可執行性** | 可能有 bug，需要多輪除錯才能執行 |
| **開發時間** | 一次對話可能需要 30 到 60 分鐘，需要多次來回 |
| **程式碼量** | 約 500 到 800 行，因為 AI 傾向壓縮程式碼 |

**可能遇到的問題**：

1. **程式碼被截斷**：AI 回應有長度限制，生成可能中途停止
2. **功能不完整**：對話系統可能只有基本版本，沒有任務系統
3. **缺少細節**：音效系統可能只留下 TODO 註解
4. **難以除錯**：如果程式碼有問題，必須在同一個對話中請 AI 修復，上下文會越來越混亂

#### 測試方案 B：Agent Teams 方式

這是本文介紹的方式：讓多個 AI 團隊成員協作開發。

**在 Claude Code 中輸入**（啟用 Agent Teams 後）：

```
我想建立一個寶可夢風格的網頁 RPG 遊戲。

建立一個團隊來協作開發：

團隊成員職責：
- 成員 A（遊戲架構師）：設計整體架構，定義遊戲狀態機，規劃資料結構
- 成員 B（戰鬥系統）：實作回合制戰鬥邏輯、技能系統和傷害計算
- 成員 C（對話系統）：實作 NPC 對話、任務系統和劇本腳本
- 成員 D（地圖渲染）：使用 Canvas 實作 2D 地圖渲染、角色移動和場景切換
- 成員 E（UI 與音效）：設計遊戲介面、戰鬥 UI 和音效播放

技術要求：
- 使用純 HTML/CSS/JavaScript
- 使用 Canvas 渲染遊戲畫面
- 回合制戰鬥系統
- 使用 localStorage 儲存資料
- 使用 Web Audio API 處理音效

每位成員使用 Sonnet，團隊負責人使用 Opus。

先請架構師設計整體方案。資料結構定義完成後，再讓其他成員並行開發。
```

**預期結果**：

| 項目 | 預期情況 |
|------|---------|
| **程式碼品質** | 每個成員專注於自己的領域，程式碼更專業且完整 |
| **功能完整性** | 所有功能都實作得更完整，包含任務系統和多場景地圖 |
| **可執行性** | 成員之間互相檢查介面，整合問題較少 |
| **開發時間** | 約 1 到 2 小時完成所有功能，因為開發是並行進行的 |
| **程式碼量** | 約 2000+ 行，是完整實作而非壓縮程式碼 |

#### 量化比較表

| 維度 | 單一提示詞 | Agent Teams |
|---------|-------------|-------------|
| **總程式碼行數** | 500-800 行 | 2000+ 行 |
| **開發時間** | 30-60 分鐘，但功能不完整 | 1-2 小時，功能完整 |
| **功能完整性** | 60-70% | 95%+ |
| **可維護性** | 中等，通常是一個大檔案 | 高，採用模組化設計 |
| **Bug 數量** | 較多，因為驗證較少 | 較少，因為成員互相檢查 |
| **未來擴展性** | 困難，因為程式碼高度耦合 | 較容易，因為結構是模組化的 |
| **Token 用量** | ~50K tokens | ~200K tokens（5 位成員） |
| **成本** | ~$0.50 | ~$2.00 |

#### 建議的實際測試流程

**步驟 1：先測試單一提示詞方式**

```
1. 開啟一個新的 Claude Code 對話
2. 使用上面「測試方案 A」的提示詞
3. 記錄：花了多長時間？產生了多少行程式碼？哪些功能缺失？
```

**步驟 2：再測試 Agent Teams 方式**

```
1. 確認 Agent Teams 已啟用
2. 使用上面「測試方案 B」的提示詞
3. 觀察：團隊成員如何協作？程式碼是否更完整？
```

**步驟 3：比較兩者結果**

```
1. 分別執行兩個版本的程式碼
2. 比較功能列表：單一提示詞版本缺少哪些功能？
3. 比較程式碼結構：Agent Teams 版本是否更加模組化？
4. 評估：如果你想繼續開發這個遊戲，哪個版本更容易擴展？
```

#### 為什麼會有這些差異

**單一提示詞方式的限制**：

1. **上下文壓力**：AI 必須在單一回應中處理所有事情，簡化是不可避免的
2. **注意力分散**：戰鬥、對話、地圖和 UI 爭搶注意力，細節容易被忽略
3. **沒有協作驗證**：沒有人檢查介面是否匹配，bug 更容易產生

**Agent Teams 的優勢**：

1. **專業分工**：每個成員專注於一個領域，可以深入細節
2. **並行處理**：戰鬥、對話和地圖開發同時進行，提高效率
3. **互相驗證**：成員之間協商介面，減少整合問題
4. **獨立上下文**：每個成員都有自己的 200K 上下文，不會互相干擾

#### 結論

Agent Teams 的核心價值不僅僅是「更快」，而是**「更完整、更專業」**。

- 對於簡單的專案例如貪吃蛇，單一提示詞就夠了
- 對於複雜的專案例如寶可夢 RPG，Agent Teams 能產出更好的結果

關鍵是**選擇正確的工具**：不要用 Agent Teams 來重新命名一個變數，也不要用單一提示詞來建立一個完整的 RPG 遊戲。

---

## 最佳實踐

Agent Teams 是一個強大的工具，但要善用它，需要了解一些最佳實踐。這些經驗來自社群的實際使用經歷，可以幫助你避免常見的陷阱，同時從團隊協作中獲得最大價值。

### 實踐 1：合約優先

在多個 Agent 開始並行工作之前，先花時間定義一個清晰的「合約」，也就是介面約定。

**為什麼這很重要**：

假設成員 A 負責後端 API，成員 B 負責前端整合。如果他們同時開始但沒有先約定介面格式，可能會出現這種情況：

```
成員 A：實作了 POST /api/login，期望 {username, password}
成員 B：實作了前端呼叫，傳送 {user, pass}
結果：兩者不匹配，需要返工
```

**如何做到**：

在啟動團隊之前，先請 Claude 設計介面：

```
先不要開始開發。先幫我設計使用者認證系統的介面：

1. 登入介面的請求和回應格式
2. 註冊介面的請求和回應格式
3. 密碼重設流程和介面
4. 錯誤處理約定

把這些介面寫清楚，然後再讓團隊開始開發。
```

**合約應包含**：

- 函式簽名和資料結構
- 輸入和輸出的 JSON 格式
- HTTP 狀態碼的含義
- 錯誤處理約定
- 欄位驗證規則

### 實踐 2：合理分配模型

不同的任務需要不同的模型。好的模型分配有助於平衡品質和成本。

**團隊負責人使用 Opus**：

團隊負責人處理任務分解和結果彙整，需要更強的推理能力，因此建議使用 Opus：

```
建立一個團隊，團隊負責人使用 Opus 進行整體規劃和最終審查。
團隊成員使用 Sonnet 進行實作工作。
```

**團隊成員使用 Sonnet**：

對於具體的程式設計和測試工作，Sonnet 完全勝任且成本顯著更低：

- Opus 4.6：每百萬輸出 token 約 $15
- Sonnet 4.5：每百萬輸出 token 約 $3

成員使用 Sonnet 可以顯著降低整體成本。

**特殊情況使用 Haiku**：

對於簡單的任務例如文件更新或小規模的測試撰寫，可以考慮 Haiku，每百萬輸出 token 約 $0.80。

### 實踐 3：控制任務粒度

任務太大或太小都會影響效率。你需要找到適當的粒度。

**經驗法則**：

每個任務應該是一位成員可以在 **15 到 30 分鐘** 內獨立完成的事情。

**任務太大**：

```
不好的做法：實作使用者認證系統
```

這個任務太寬泛。它包含多個子任務，一個人需要很長時間才能完成，這浪費了並行的優勢。

**任務太小**：

```
不好的做法：建立一個名為 auth.js 的空檔案
```

這個任務太小了。成員花在協調上的時間比實際工作還多。

**適當的粒度**：

```
好的做法：實作登入 API，包含：
1. POST /api/login 端點
2. 使用者名稱和密碼驗證
3. JWT token 回應
4. 錯誤處理
```

這個任務有明確的邊界和交付物。一個人可以獨立完成，而且不會過度碎片化。

**建議設定**：

讓每位成員負責 **5 到 6 個中等規模的任務**。這樣可以提供足夠的並行性，而不會讓協調成本過高。

### 實踐 4：避免檔案衝突

多個成員同時修改同一個檔案是 Agent Teams 中最常見的問題。

**分派原則**：

盡量讓不同的成員負責**不同的檔案**：

```
好的做法：
- 成員 A：負責 src/auth/ 下的所有檔案
- 成員 B：負責 src/api/ 下的所有檔案
- 成員 C：負責 tests/auth/ 下的所有檔案

不好的做法：
- 成員 A 和成員 B 同時修改 src/app.js
```

**如果必須修改同一個檔案**：

設計一個序列編輯階段：

```
第一階段（並行）：
- 成員 A：分析 auth.js 需要新增什麼功能
- 成員 B：設計新功能的介面
- 成員 C：撰寫測試案例

第二階段（序列）：
- 團隊負責人彙整所有意見
- 一位成員一次性修改 auth.js 進行整合
```

### 實踐 5：提供豐富的初始上下文

當團隊成員開始工作時，他們的對話歷史是空的。他們不知道團隊負責人和使用者之前討論了什麼。

**錯誤做法**：

```
建立團隊並讓成員開始工作。
```

成員會在一片茫然中開始：這是什麼專案？使用什麼技術堆疊？到底要建什麼？

**正確做法**：

```
這是一個 React + Node.js 電子商務專案，使用 TypeScript。

專案結構是：
- src/frontend/：React 前端程式碼
- src/backend/：Node.js 後端程式碼
- prisma/：資料庫模型

程式碼風格：
- 使用函式元件和 Hooks
- 後端使用 Express.js
- 資料庫使用 PostgreSQL

現在建立一個團隊，讓成員在 src/auth/ 下新增使用者認證功能。
```

只有提供足夠的上下文，成員才能高效工作。

### 實踐 6：先研究再實作

不要讓成員立即開始寫程式。先讓他們研究和設計解決方案。

**兩階段流程**：

**第一階段：研究和設計**

```
建立一個團隊。在第一階段進行研究：
- 一位成員調查現有的認證方案（JWT vs Session）
- 一位成員分析專案的技術堆疊並確定最佳實踐
- 一位成員設計資料庫 schema

研究完成後，讓成員透過訊息系統討論並確定最終方案。
```

**第二階段：實作**

```
方案確定後，開始實作：
- 一位成員實作後端認證邏輯
- 一位成員實作前端登入頁面
- 一位成員撰寫測試
```

這樣做的好處是可以**及早發現架構不匹配的問題**，而不是在實作中途才發現方案行不通。

### 實踐 7：主動監控和介入

即使你設定了自動化，仍然應該主動監控團隊的工作狀態。

**使用分割面板模式**：

如果你設定了 tmux 面板，你可以即時看到所有成員的輸出：

```
┌─────────────────┬─────────────────┐
│  成員 1         │  成員 2         │
│  分析程式碼中   │  實作 API 中    │
│  ...            │  ...            │
│                 │                 │
│  等等，這個     │                 │
│  方向好像       │                 │
│  不太對...      │                 │
└─────────────────┴─────────────────┘
```

當你注意到某個成員走錯方向時，可以快速介入：

```
@成員1 先停一下。你的分析方向不對。認證模組應該在 src/auth/ 下，而不是 src/user/。
```

**定期檢查任務狀態**：

使用 TaskList 指令檢查所有任務的狀態：

```
/tasks
```

這會顯示所有任務的狀態，讓你了解哪些已完成、哪些還在進行中、哪些被阻塞。

---

## 適用場景

Agent Teams 很強大，但並非每個任務都適合它。了解適合的場景可以幫助你做出正確的選擇。

### 適合 Agent Teams 的場景

**複雜系統重構**

當重構跨越多個模組且邊界清晰時：

```
場景：將單體應用拆分為微服務

建立一個團隊：
- 成員 A：分析使用者模組的依賴關係
- 成員 B：分析訂單模組的依賴關係
- 成員 C：分析支付模組的依賴關係
- 成員 D：設計服務間的通訊協定
```

這些模組可以同時分析，最後再彙整結果，比序列分析快得多。

**多角度程式碼審查**

當你需要從多個維度審查程式碼時：

```
場景：對支付模組進行全面安全審查

建立一個團隊：
- 成員 A：專注於安全漏洞（SQL 注入、XSS 等）
- 成員 B：檢查效能問題（N+1 查詢、記憶體洩漏等）
- 成員 C：驗證錯誤處理的完整性
- 成員 D：評估測試覆蓋率
```

每位成員專注於一個維度，使審查更深入，最終報告更完整。

**前後端並行開發**

當你需要同時建置前端和後端時：

```
場景：建立一個使用者管理功能

建立一個團隊：
- 成員 A（前端）：實作使用者列表頁面
- 成員 B（前端）：實作使用者編輯頁面
- 成員 C（後端）：實作 CRUD API
- 成員 D（協調）：設計 API 合約並確保前後端保持一致
```

只要先定義好 API 合約，遵循合約優先原則，前後端就可以並行推進。

**競爭式除錯**

當你有多個可能的解決方案時：

```
場景：修復一個複雜的 bug，有兩種可能的修復策略

建立一個團隊：
- 成員 A：實作解決方案 1
- 成員 B：實作解決方案 2
- 成員 C：評估兩者的優缺點
```

兩個解決方案可以並行實作和測試，之後選擇更好的那一個。

**文件生成**

當你需要產生大量文件時：

```
場景：為整個專案撰寫文件

建立一個團隊：
- 成員 A：撰寫 API 文件
- 成員 B：撰寫部署指南
- 成員 C：撰寫開發指南
- 成員 D：撰寫疑難排解手冊
```

多份文件可以同時撰寫，大幅提高效率。

### 不適合 Agent Teams 的場景

**簡單修改任務**

```
不適合：變數重新命名、單一 bug 修復、微小功能新增
```

對於這些任務，啟動團隊的成本大於實際工作。

**高度序列化的任務**

```
不適合：必須嚴格按順序執行的任務
```

如果任務 B 必須等任務 A 完成才能開始，就沒有真正的並行空間。

**成本敏感的任務**

Agent Teams 消耗的 token 大約是單一實例的 **2 到 4 倍**，取決於團隊大小。如果成本是主要考量，單一實例可能是更好的選擇。

### 決策流程圖

```
是否有多個獨立的子任務？
    │
    ├─ 否 → 使用單一實例
    │
    └─ 是 →
         │
         子任務可以分配到不同的檔案嗎？
         │
         ├─ 否 → 考慮序列執行或進一步拆分任務
         │
         └─ 是 →
              │
              成本可接受嗎（2-4 倍）？
              │
              ├─ 否 → 使用單一實例
              │
              └─ 是 → 使用 Agent Teams ✓
```

---

## 成本與效能

使用 Agent Teams 會增加成本，但也能帶來顯著的效率提升。了解這個權衡取捨有助於你做出明智的決策。

### 成本分析

**Token 消耗與團隊大小**

Agent Teams 的 token 消耗大致與團隊大小**線性相關**：

| 團隊大小 | 相對成本 | 適用場景 |
|---------|---------|---------|
| 1 人（單一實例） | 1x | 簡單任務 |
| 2 人團隊 | 2-2.5x | 中等複雜度 |
| 3 人團隊 | 3-4x | 複雜任務 |
| 5+ 人團隊 | 5-6x+ | 大型專案 |

**為什麼不是完美線性**：

- **啟動成本**：每個成員啟動時都需要接收初始上下文
- **協調成本**：成員之間透過訊息系統溝通也消耗 token
- **團隊負責人成本**：團隊負責人通常使用 Opus，更為昂貴

**具體範例數字**（Claude 4.5 Sonnet）：

- 輸入：每百萬 token $3
- 輸出：每百萬 token $15

假設一個任務需要：
- 團隊負責人（Opus）：50K 輸入 + 20K 輸出 ≈ $2.25
- 3 位成員（Sonnet）：每位 30K 輸入 + 15K 輸出 ≈ $2.7 × 3 = $8.1
- **總計**：約 $10.35

同樣的任務使用單一 Sonnet 實例：
- 100K 輸入 + 50K 輸出 ≈ $1.05

**成本倍數**：約 10 倍

**但節省的時間**：可能從 3 小時縮短到 1 小時

### 效率提升

**Anthropic 內部測試資料**：

- 大型專案重構：效率提升約 **50%**
- 並行多模組開發：效率提升約 **60-70%**
- 文件生成任務：效率提升約 **80%**

**真實案例**：

Anthropic 的工程團隊曾使用 **16 個並行代理**，在大約 2 週內建構了一個可以編譯 Linux 6.9 核心的 C 編譯器，約 10 萬行 Rust 程式碼，並通過了 99% 的 GCC 測試。

### 成本最佳化策略

**策略 1：混合模型**

```
團隊負責人：Opus（需要強大推理能力）
團隊成員：Sonnet（高性價比）
簡單任務：Haiku（最便宜）
```

**策略 2：動態調整團隊大小**

```
分析階段：5 人團隊（多角度分析）
實作階段：3 人團隊（並行程式設計）
測試階段：2 人團隊（測試和修復）
```

**策略 3：僅在特定階段使用 Agent Teams**

不要在整個專案中都使用 Agent Teams。只在最複雜的階段使用：

```
第一階段（需求分析）：單一實例
第二階段（架構設計）：Agent Teams（並行探索多個方案）
第三階段（程式設計）：單一實例
第四階段（程式碼審查）：Agent Teams（多角度審查）
第五階段（文件撰寫）：Agent Teams（並行撰寫）
```

### 何時值得

**值得使用的情況**：

- 專案時程緊迫，效率提升的價值超過 token 成本
- 任務高度複雜，單一實例可能遺漏細節
- 需要多角度分析和驗證

**不值得使用的情況**：

- 任務簡單，啟動團隊的開銷太高
- 成本高度敏感，token 預算有限
- 任務高度序列化，沒有並行的空間

---

## 常見問題

### Q1：Agent Teams 穩定嗎？可以在正式環境中使用嗎？

Agent Teams 目前是一個**實驗性功能**，可能仍然存在 bug 和不穩定的行為。建議：

- 先備份重要的專案
- 從小專案開始，以便測試和熟悉
- 關注官方發布說明以了解新版本的改進
- 出現問題時及時向官方團隊回報

### Q2：最多可以建立多少成員？

理論上沒有硬性限制，但從實際角度來看：

- 小型專案：2 到 3 人
- 中型專案：3 到 5 人
- 大型專案：5 到 10 人

成員過多會帶來以下問題：

- 協調開銷急劇上升
- Token 用量線性增長
- 檔案衝突機率增加
- 監控和管理變得更困難

### Q3：團隊成員可以看到彼此的上下文嗎？

**不能**。每位團隊成員都有完全獨立的上下文視窗。他們透過訊息系統溝通，而不是直接共享上下文。

這是一個刻意的設計選擇，好處是：

- 一個成員的推理不會被另一個成員的推理所污染
- 上下文不會因為對話過長而變得混亂
- 更接近真實團隊的運作方式，每個人都有自己的思考

### Q4：如何在不同成員之間切換？

如果沒有設定分割面板模式，你可以使用快捷鍵：

- `Shift+Up`：切換到上一個成員
- `Shift+Down`：切換到下一個成員
- `Ctrl+O`：回到團隊負責人

### Q5：如果任務失敗了怎麼辦？

如果某個成員的任務失敗：

1. 透過閱讀該成員的輸出日誌來檢查失敗原因
2. 如有需要，將任務重新分配給另一個成員
3. 手動介入，直接幫助解鎖問題

### Q6：可以在過程中新增或移除成員嗎？

可以。你可以隨時向團隊負責人下達指令：

```
新增一個成員，讓它處理 XXX。
```

```
讓成員 3 在完成當前任務後離開團隊。
```

### Q7：Agent Teams 可以和 MCP 和 Skills 一起使用嗎？

當然可以。事實上，它們搭配使用效果更好：

- **Agent Teams + Skills**：每個成員可以攜帶不同的 Skills
- **Agent Teams + MCP**：不同的成員可以透過不同的 MCP 伺服器存取外部資源

```
建立一個團隊：
- 成員 A：攜帶前端設計 Skill，負責 UI
- 成員 B：透過 GitHub MCP 存取程式庫，處理 PR 管理
- 成員 C：透過 Database MCP 查詢資料，處理分析
```

---

## 參考資料

### 官方資源

- [Claude Code 官方文件](https://docs.anthropic.com/en/docs/claude-code) - 完整的 Claude Code 文件
- [Anthropic 工程部落格](https://www.anthropic.com/engineering) - 官方技術部落格和更新

### Agent Teams 教學彙整

**完整指南（中文）**：

- [Claude Code Agent Teams 完整指南：從入門到實戰](https://m.blog.csdn.net/u010634066/article/details/157903022) - 包含設定細節、實戰範例以及 16 個並行代理建構 C 編譯器的精彩案例
- [使用 Claude Code Agent Team 協作開發：完整實戰指南](https://m.blog.csdn.net/u010028049/article/details/158126612) - 完整的協作專案工作流程
- [Claude Code Agent Teams 設定與使用逐步指南](https://cloud.tencent.com/developer/article/2630088) - 騰訊雲教學，包含詳細的設定說明

**實戰入門**：

- [原生 Claude Code Agent Teams 實戰：從啟用到三人團隊運行](https://www.cnblogs.com/147api/p/19606317) - 三人團隊演練
- [Claude Code Agent Teams 新手實踐](https://m.toutiao.com/article/7606744384960266793/) - 適合初學者的入門介紹，包含合約優先等最佳實踐
- [不再單打獨鬥：讓 7 個 Claude 同時幫你開發的 Agent Teams](https://m.toutiao.com/a7605229732241736202/) - 7 人團隊案例研究

**最佳實踐**：

- [Agent Teams 最佳實踐：合約優先、任務粒度和模型分配](https://blog.csdn.net/sinat_37574187/article/details/144727588) - 7 個最佳實踐的詳細解說
- [七年大廠老兵的 Claude Code 實戰手冊：從新手到專家的八條法則](https://new.qq.com/rain/a/20260111A02HE900) - 企業級實戰經驗

**原理與比較**：

- [Claude Code Agent Teams：多代理協作的正確方式](https://post.m.smzdm.com/p/adoezrmz/) - 多代理協作的深度分析
- [Claude Code 多代理團隊開發：從原理到踩坑的完整指南](https://m.toutiao.com/a7605229732241736202/) - 來自實際使用的原理與踩坑經驗

### 官方指南翻譯

- [Claude 官方發布《Agent 建構指南》（附 PDF 下載）](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - 官方 Agent 建構指南
- [Claude 官方《建構有效代理指南》完整翻譯版](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - 完整中文翻譯

### 相關技術

- [Agent Skills 標準](https://agentskills.io/) - Skills 生態系統
- [skills.sh - Agent Skills 應用商店](https://skills.sh/) - 70,000+ 技能庫
