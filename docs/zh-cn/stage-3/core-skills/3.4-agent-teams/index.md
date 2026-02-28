# Claude Agent Teams 完全指南

## Agent Teams 简介

**Agent Teams** 是 Claude Code 的一个革命性功能，它让**多个独立的 AI 实例可以像真正的开发团队一样协同工作**。

想象一下，以前你使用 Claude Code，就像是一个项目经理带着一个超级能干的助手工作。无论任务多复杂，只有这一个助手在干活。现在有了 Agent Teams，你可以组建一支完整的 AI 开发团队——有的负责前端，有的负责后端，有的负责测试，它们可以**同时工作、互相交流、协同完成复杂任务**。

### 从单助手到团队协作

在深入了解 Agent Teams 之前，让我们先理解它解决的问题。

**单 AI 模式的局限性**：

当你用单个 Claude 实例处理复杂项目时，会遇到这些瓶颈：

- **串行处理瓶颈**：AI 只能一次做一件事。比如要重构一个项目，它需要先分析认证模块，再分析数据库模块，最后分析 API 模块。这些步骤必须串行进行，即使它们之间没有依赖关系。

- **上下文拥挤问题**：所有信息都在一个对话窗口里。当对话变长，早期的关键细节容易被淹没，AI 可能忘记之前讨论的重要决策。

- **单一视角局限**：只有一个 AI 在思考，缺乏多角度的讨论和验证。当遇到复杂的设计决策时，没有"同事"可以辩论或提供不同观点。

- **效率天花板**：大型重构或多模块开发需要很长时间，无法通过并行加速来提升效率。

**Agent Teams 的解决方案**：

Agent Teams 通过**多实例并行协作**解决了这些问题：

- **真正的并行工作**：多个 AI 可以同时处理不同的任务。一个负责前端 UI，一个负责后端 API，一个负责数据库设计，三者互不干扰。

- **独立的上下文空间**：每个团队成员都有自己完整的 200K token 上下文窗口，不会因为对话过长而"忘记"重要信息。

- **团队协作能力**：成员之间可以直接通信，讨论设计决策，互相验证代码质量，就像真正的开发团队一样。

- **效率大幅提升**：根据 Anthropic 内部测试，大型项目重构的效率可以提升约 50%。

---

## Agent Teams vs Subagent

在深入 Agent Teams 的架构之前，有必要先澄清一个常见的混淆：**Agent Teams 和 Subagent 有什么区别**？

这两种功能都涉及"多个 AI 协同工作"，但它们的协作模式完全不同，适用于不同的场景。

### 核心区别对比

| 对比维度 | Subagent（子代理） | Agent Teams（团队代理） |
|---------|-------------------|----------------------|
| **拓扑结构** | 星型拓扑——所有子代理向主代理汇报 | 网状拓扑——成员可以互相通信 |
| **通信方式** | 单向——子代理只能向主代理报告结果 | 双向——成员之间可以直接交流 |
| **上下文管理** | 子代理与主代理共享上下文 | 每个成员拥有完全独立的上下文 |
| **并行能力** | 有限的并行或串行执行 | 真正的并行开发 |
| **任务协调** | 由主代理统一派发和协调 | 成员可以自主认领任务 |
| **成本** | 较低（共享上下文） | 较高（每个成员独立上下文） |

### 形象比喻

**Subagent 就像**：一个经理给几个助理分配任务。每个助理领到任务后去完成，完成后向经理汇报。助理之间不直接交流，所有信息都通过经理中转。

```
你 → 主代理 → 子代理 A："去分析这个文件"
你 → 主代理 → 子代理 B："去搜索那个函数"
         ↓
    子代理 A 完成 → 向主代理汇报结果
    子代理 B 完成 → 向主代理汇报结果
         ↓
    主代理综合结果 → 向你汇报
```

**Agent Teams 就像**：一个项目经理带领一个真正的开发团队。团队成员之间可以直接沟通、讨论、协作，不是所有事情都要通过项目经理中转。

```
你 → Team Lead："做用户认证功能"
         ↓
    Team Lead 创建团队，分配任务
         ↓
    Teammate A："@Teammate B，API 接口设计好了吗？"
    Teammate B："设计好了，格式是这样的..."
    Teammate C："我看了接口，有个问题需要讨论一下..."
         ↓
    团队成员协作完成 → Team Lead 综合结果 → 向你汇报
```

### 什么时候用哪个

**使用 Subagent 的场景**：

- 快速、明确的单一任务（如"搜索这个错误代码"）
- 任务之间没有太多依赖关系
- 成本敏感，不需要复杂的协作

**使用 Agent Teams 的场景**：

- 复杂的系统重构，涉及多个模块
- 需要多角度分析和讨论（如安全专家和性能专家辩论方案）
- 需要真正的并行开发（前端、后端、测试同时进行）
- 任务之间需要频繁协调和信息共享

### 简单总结

- **Subagent**：任务分发工具，把大任务拆成小任务，派发给不同的"工人"完成
- **Agent Teams**：真正的协作团队，成员之间可以像真实团队一样交流、讨论、协同工作

---

## 核心架构

Agent Teams 不是一个简单的"多开"功能，而是一套完整的**多代理协作系统**。要理解它，我们需要了解其核心组件和它们之间的协作方式。

### 团队组成

一个 Agent Team 由四种核心组件构成，它们各司其职，共同完成复杂任务。

**Team Lead（团队负责人）**

Team Lead 是整个团队的"大脑"和"协调者"，它不直接执行具体的编码任务，而是负责：

- **需求分析与任务拆解**：将用户的复杂需求分解成多个可并行执行的子任务
- **团队创建与管理**：根据任务特点决定需要多少成员、每个成员的职责
- **任务分配与调度**：将任务分配给合适的成员，管理任务的依赖关系
- **结果综合与质量把控**：收集所有成员的工作成果，进行整合和最终审查

**Teammates（团队成员）**

Teammates 是真正干活的"开发者"，每个 Teammate 都是一个独立的 Claude 实例：

- **独立的上下文窗口**：每个成员拥有完整的 200K token 上下文，与 Team Lead 和其他成员完全隔离
- **完整的工具权限**：可以使用 Read、Write、Edit、Bash 等所有工具
- **自主任务认领**：可以从共享任务板上自主选择和认领任务
- **直接通信能力**：可以与其他成员直接交流，不一定要通过 Team Lead

**TaskList（共享任务板）**

TaskList 是团队的"项目管理工具"，类似于 Jira 或 Trello：

- **任务状态管理**：每个任务有明确的状态——pending（待处理）、in_progress（进行中）、completed（已完成）
- **依赖关系管理**：任务可以定义依赖关系，只有依赖的任务完成后，被依赖的任务才能开始
- **自动解锁机制**：当一个任务完成时，系统会自动检查并解锁那些等待它的任务
- **文件锁机制**：当成员认领并开始处理任务时，会在任务目录中创建锁文件，防止多个成员同时修改同一文件

**Messaging System（消息系统）**

消息系统是团队成员之间"聊天工具"：

- **点对点通信**：成员 A 可以直接向成员 B 发送消息
- **群发广播**：可以同时向所有成员发送公告
- **基于文件系统**：消息以 JSON 文件形式存储在 `~/.claude/teams/{team-name}/inboxes/` 目录下
- **无需网络**：完全基于本地文件系统，不需要网络连接或端口监听

### 协作流程

一个典型的 Agent Teams 工作流程是这样的：

```
用户提出复杂需求
       ↓
Team Lead 分析需求，拆解任务
       ↓
创建团队成员，初始化 TaskList
       ↓
       ├─→ Teammate A 认领任务 1 ─┐
       ├─→ Teammate B 认领任务 2 ─┼→ 并行执行
       ├─→ Teammate C 认领任务 3 ─┤
       │                           ↓
       └────────────────────────── 成员间通过消息系统通信协调
                                   ↓
                          所有任务完成后，Team Lead 综合结果
                                   ↓
                          向用户输出最终成果
```

### 文件系统布局

Agent Teams 在你的本地文件系统中创建专门的目录来管理团队状态：

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # 团队配置（成员列表、模型选择等）
│       └── inboxes/
│           ├── team-lead.json   # Team Lead 的收件箱
│           ├── teammate-1.json  # 成员 1 的收件箱
│           └── teammate-2.json  # 成员 2 的收件箱
└── tasks/
    └── {team-name}/
        ├── task-1.json          # 任务 1 的详细信息
        ├── task-2.json          # 任务 2 的详细信息
        └── current_tasks/
            └── parse_if_statement.txt  # 任务执行时的锁文件
```

这种设计的好处是**完全透明**——你可以随时查看团队的运行状态、任务进展、成员之间的通信记录。

---

## 快速开始

### 开启实验性功能

Agent Teams 目前是一个**实验性功能**，默认是关闭的。要使用它，需要先开启。

**最简单的方法：让 Claude Code 帮你开启**

直接在 Claude Code 中输入：

```
帮我在 settings.json 中开启 Agent Teams 功能
```

或者：

```
开启实验性功能 agentTeams
```

Claude Code 会自动修改 `~/.claude/settings.json` 文件，添加以下配置：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**重启 Claude Code**

配置完成后，**完全退出并重启 Claude Code**，功能就会生效。

**手动配置（如果自动方法不工作）**：

你可以手动编辑 `~/.claude/settings.json` 文件，添加或修改：

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**验证是否开启成功**

重启 Claude Code 后，你可以尝试这样的对话来验证：

```
你：你可以帮我创建一个 Agent Team 吗？

Claude：可以！我可以帮你创建一个 Agent Team 来协作完成任务...
```

如果 Claude 能够理解并响应创建团队的需求，说明功能已经成功开启。

### 可视化模式配置（可选）

如果你想实时看到团队成员的工作状态，可以配置**分屏显示模式**。

**让 Claude Code 帮你配置**：

直接在 Claude Code 中输入：

```
帮我在 settings.json 中开启 Agent Teams 的分屏显示模式，使用 tmux
```

或者：

```
配置 agent-teams 使用 split-panes 模式
```

**安装 tmux（如果没有）**：

如果你还没有安装 tmux，可以让 Claude Code 帮你安装：

```
帮我安装 tmux
```

Claude Code 会根据你的操作系统（macOS 或 Linux）自动执行相应的安装命令。

**配置后的效果**：

配置完成后，团队成员会在 tmux 的不同分屏中工作，你可以同时看到所有成员的输出，就像有一个"监控墙"一样。

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │  Teammate 3     │
│  正在分析代码... │  正在实现 API... │  正在编写测试... │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**手动配置（如果自动方法不工作）**：

你可以手动编辑 `~/.claude/settings.json` 文件：

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

### 实战：用 Agent Teams 开发一个宝可梦风格的 RPG 游戏

让我们通过一个完整的项目，体验 Agent Teams 的强大功能。这个例子会展示多个 AI 团队成员如何协作，从零开始开发一个有战斗系统、对话功能和探索元素的 RPG 游戏。

**项目需求**：

开发一个宝可梦风格的网页 RPG 游戏，包含以下功能：

- **角色系统**：玩家可以创建角色，有等级、HP、攻击力、防御力等属性
- **战斗系统**：回合制战斗，有攻击、技能、道具、逃跑等选项
- **怪物系统**：多种野怪，有不同的属性和技能
- **对话系统**：NPC 对话，支线任务
- **地图探索**：简单的 2D 地图，可以在不同场景之间移动
- **存档系统**：保存游戏进度（角色等级、位置、完成任务等）
- **音效和动画**：攻击、受伤、升级的视觉效果和音效

**在 Claude Code 中输入**：

```
我想开发一个宝可梦风格的网页 RPG 游戏。

创建一个团队来协作开发：

团队成员分工：
- Teammate A（游戏架构师）：设计整体架构，定义游戏状态机，规划数据结构
- Teammate B（战斗系统）：实现回合制战斗逻辑、技能系统、伤害计算
- Teammate C（对话系统）：实现 NPC 对话、任务系统、剧情脚本
- Teammate D（地图渲染）：使用 Canvas 实现 2D 地图渲染、角色移动、场景切换
- Teammate E（UI 音效）：设计游戏界面、战斗 UI、音效播放

技术要求：
- 使用 React + TypeScript + Vite
- 使用 Tailwind CSS 做样式
- 使用 Framer Motion 做动画
- 使用 Zustand 做状态管理
- 回合制战斗系统
- 存档使用 localStorage
- 音效使用 Web Audio API

每个成员使用 Sonnet 模型，Team Lead 使用 Opus。

请先让架构师设计整体方案，定义好数据结构后，其他成员再并行开发。
```

**Claude 会如何执行**：

**第一阶段：架构设计**

Team Lead 会先让 Teammate A（游戏架构师）进行整体设计：

```
Teammate A 正在设计游戏架构...

技术栈：React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

项目初始化：
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

文件结构：
src/
├── App.tsx                 # 主应用组件
├── main.tsx                # 入口文件
├── types/
│   ├── player.ts           # 玩家类型定义
│   ├── monster.ts          # 怪物类型定义
│   ├── skill.ts            # 技能类型定义
│   └── game.ts             # 游戏状态类型
├── stores/
│   └── gameStore.ts        # Zustand 状态管理
├── components/
│   ├── map/                # 地图相关组件
│   │   ├── MapCanvas.tsx   # 地图 Canvas
│   │   ├── PlayerSprite.tsx # 玩家精灵
│   │   └── NPCSprite.tsx   # NPC 精灵
│   ├── battle/             # 战斗相关组件
│   │   ├── BattleScreen.tsx    # 战斗界面
│   │   ├── BattleMenu.tsx      # 战斗菜单
│   │   ├── HPBar.tsx           # 血条组件
│   │   └── BattleLog.tsx       # 战斗日志
│   ├── dialog/             # 对话相关组件
│   │   ├── DialogBox.tsx   # 对话框
│   │   └── Choices.tsx     # 选项组件
│   └── ui/                 # 通用 UI 组件
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # 战斗系统逻辑
│   ├── DialogSystem.ts     # 对话系统逻辑
│   ├── QuestSystem.ts      # 任务系统逻辑
│   └── MapSystem.ts        # 地图系统逻辑
├── hooks/
│   ├── useBattle.ts        # 战斗 Hook
│   ├── useDialog.ts        # 对话 Hook
│   └── useAudio.ts         # 音频 Hook
├── data/
│   ├── monsters.ts         # 怪物数据
│   ├── skills.ts           # 技能数据
│   ├── dialogues.ts        # 对话脚本
│   └── maps.ts             # 地图数据
└── utils/
    ├── audio.ts            # 音频工具
    └── storage.ts          # 存档工具

核心数据结构设计：

// types/player.ts - 玩家类型
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

// types/skill.ts - 技能类型
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// 游戏状态
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

战斗系统设计：
- 回合制，玩家先行动
- 每回合可以选择：攻击、技能、道具、逃跑
- 技能有 PP 限制，用完需要回复
- 伤害公式：(攻击方攻击力 / 防御方防御力) × 技能威力 × 随机因子(0.85~1.0)

对话系统设计：
- 打字机效果显示文字
- 支持选项分支
- 支持条件触发（完成任务后）
- NPC 有朝向，玩家靠近自动触发
```

**第二阶段：并行开发**

架构确定后，Team Lead 会创建任务列表，其他成员开始并行工作：

```
任务列表：
├── [Teammate B] 实现战斗系统核心逻辑 (进行中...)
├── [Teammate C] 实现对话和任务系统 (进行中...)
├── [Teammate D] 实现 2D 地图渲染 (进行中...)
└── [Teammate E] 设计 UI 和音效 (进行中...)
```

<details>
<summary>📁 Teammate B：战斗系统核心代码</summary>

```javascript
// battle.js - 战斗系统
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // 玩家攻击
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} 使用了 ${skill.name}！`);
    this.log.push(`造成了 ${damage} 点伤害！`);

    // 技能效果
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // 检查战斗结束
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} 倒下了！`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // 怪物攻击
  monsterAttack() {
    if (this.state !== 'active') return;

    // 随机选择技能
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} 使用了 ${skill.name}！`);
    this.log.push(`造成了 ${damage} 点伤害！`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} 倒下了...`);
    } else {
      this.turn = 'player';
    }
  }

  // 伤害计算
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // 属性克制加成（简化版）
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // 应用技能效果
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} 被烧伤了！`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} 恢复了 ${healAmount} 点 HP！`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name} 的攻击力上升了！`);
        break;
    }
  }

  // 获得经验
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} 获得了 ${expGain} 点经验！`);

    // 升级检查
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // 升级
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // 属性提升
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} 升到了 ${this.player.level} 级！`);
    this.log.push(`HP +${hpGain}, 攻击 +${atkGain}, 防御 +${defGain}`);
  }

  // 逃跑
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('成功逃跑了！');
      return true;
    } else {
      this.log.push('逃跑失败！');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - 怪物数据
const MONSTER_DATA = [
  {
    id: 'slime',
    name: '史莱姆',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: '撞击', type: 'attack', power: 40, accuracy: 100, pp: 35}
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
      {id: 'tackle', name: '撞击', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: '抓击', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: '幼龙',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: '抓击', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: '火花', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: '吼叫', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 Teammate C：对话和任务系统代码</summary>

```javascript
// dialog.js - 对话系统
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // 显示对话
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // 显示下一条对话
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // 处理特殊类型的对话
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // 渲染对话框
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

    // 打字机效果
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

    // 显示选项（如果有）
    this.renderChoices();
  }

  // 渲染选项
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

  // 下一条
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // 有选项时需要选择
    this.showNext();
  }
}

// 任务系统
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // 接受任务
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // 更新任务进度
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

  // 检查任务完成
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // 完成任务
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // 给予奖励
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // 给予奖励
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - 对话脚本示例
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: '村长', text: '哦，冒险者啊...你终于来了。'},
      {speaker: '村长', text: '我们村子附近最近出现了很多野生的怪物，村民们都很害怕。'},
      {speaker: '村长', text: '如果你能帮忙驱赶那些怪物，我将不胜感激！'},
      {
        choices: [
          {text: '好的，我接受这个任务', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: '村长', text: '太好了！请击败北边的 3 只史莱姆。'},
              {speaker: '系统', text: '任务【驱赶史莱姆】已接受！'}
            ];
          }},
          {text: '我现在有点忙', dialog: [
            {speaker: '村长', text: '好吧，等你准备好了再来找我。'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: '村长', text: '你真的做到了！太感谢你了！'},
      {speaker: '系统', text: '任务【驱赶史莱姆】完成！获得 100 经验值！'},
      {speaker: '村长', text: '请收下这个，这是我的一点心意。'}
    ]
  },

  shopkeeper: [
    {speaker: '店主', text: '欢迎光临！要买点什么吗？'},
    {
      choices: [
        {text: '查看商品', dialog: () => {
          game.openShop();
          return [{speaker: '店主', text: '看中什么就拿去吧！'}];
        }},
        {text: '离开', dialog: [{speaker: '店主', text: '下次再来！'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 Teammate D：2D 地图渲染系统代码</summary>

```javascript
// map.js - 地图渲染系统
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

  // 加载地图
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // 渲染地图
  render() {
    if (!this.currentMap) return;

    // 清空画布
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 保存上下文
    this.ctx.save();

    // 应用摄像机偏移
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // 渲染地图层
    this.renderLayers();

    // 渲染 NPC
    this.renderNPCs();

    // 渲染玩家
    this.renderPlayer();

    // 恢复上下文
    this.ctx.restore();
  }

  // 渲染地图层
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

  // 渲染单个地块
  renderTile(x, y, tileId) {
    // 根据地块 ID 绘制不同的地块
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 草地纹理
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
        // 水波纹效果
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
        // 屋顶
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // 获取地块类型
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

      // 绘制 NPC
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

      // 绘制名字
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

    // 玩家身体
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

    // 玩家朝向指示
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

  // 更新摄像机位置
  updateCamera() {
    if (!this.player) return;

    // 摄像机跟随玩家，保持在画面中心
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // 平滑移动
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // 限制摄像机不要超出地图边界
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // 检查碰撞
  checkCollision(x, y) {
    // 检查地图边界
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // 检查地块碰撞
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // 墙和房子是障碍物

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // 检查 NPC 碰撞
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // 触发 NPC 对话
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // 触发 NPC 对话
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// 示例地图数据
const VILLAGE_MAP = {
  name: '新手村',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // 地图数据（简化展示）
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... 更多地图数据
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: '村长',
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
<summary>📁 Teammate E：战斗 UI 界面代码</summary>

```html
<!-- 战斗界面 HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- 敌方区域 -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">史莱姆</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- 玩家区域 -->
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

  <!-- 战斗菜单 -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">攻击</button>
      <button class="menu-btn" data-action="skills">技能</button>
      <button class="menu-btn" data-action="items">道具</button>
      <button class="menu-btn" data-action="flee">逃跑</button>
    </div>
  </div>

  <!-- 技能子菜单 -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">选择技能</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">返回</button>
  </div>

  <!-- 战斗日志 -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - 战斗界面样式 */
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

/* 受击动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* 攻击动画 */
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
<summary>📁 音频系统代码</summary>

```javascript
// audio.js - 音频系统
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // 初始化音频上下文
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // 播放背景音乐
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // 使用振荡器生成简单的 BGM
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // 生成简单的背景音乐
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

  // 停止背景音乐
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

  // 攻击音效
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

  // 受击音效
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

  // 胜利音效
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

  // 升级音效
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

  // 对话音效
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

**成员之间的协作对话**：

```
Teammate B → Teammate C：
"战斗系统已经完成了，当玩家获胜时会调用 giveExp() 方法升级。
请你检查一下任务系统，确保升级后能正确保存。"

Teammate C → Teammate B：
"收到。任务系统使用 localStorage 保存游戏数据，
包括等级、经验值、已完成任务列表等。我会添加一个自动保存机制。"

Teammate D → All：
"地图渲染系统完成了，NPC 的朝向数据已经和对话系统对接。
当玩家面向 NPC 时会自动触发对话，请确认对话系统的触发逻辑。"

Teammate C → Teammate D：
"确认了。DialogSystem 有 showDialog() 方法可以接收对话数组，
我会确保所有 NPC 的对话数据都是这个格式。"

Teammate E → Teammate B：
"战斗 UI 已经做好了，但是需要知道玩家和怪物的实时数据来更新血条。
请问战斗系统有提供回调函数吗？"

Teammate B → Teammate E：
"有的。BattleSystem 有 onUpdate 回调，每回合结束时会触发。
你可以注册这个回调来更新 UI。"

Teammate E → Teammate D：
"地图切换时需要重新定位摄像机。
请问 MapRenderer 有 updateCamera() 方法吗？"

Teammate D → Teammate E：
"有。每次 loadMap() 后都会自动调用 updateCamera()。
你也可以在玩家移动后手动调用它来平滑移动摄像机。"
```

**第三阶段：集成和测试**

所有组件完成后，Team Lead 会负责整合：

<details>
<summary>📁 游戏主控制器代码</summary>

```javascript
// game.js - 游戏主控制器
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // 初始化各个系统
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // 加载地图
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // 输入处理
    this.setupInput();

    // 开始游戏循环
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // 自动加载存档
    this.loadGame();
  }

  // 创建玩家
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
        {id: 'tackle', name: '撞击', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // 设置输入处理
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

  // 地图输入处理
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

      // 检查随机战斗
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // 保存游戏
      this.saveGame();
    }
  }

  // 对话输入处理
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // 战斗输入处理
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // 开始战斗
  startBattle(monsterData) {
    // 随机选择怪物
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // 生成怪物实例
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

    // 播放战斗音乐
    this.audioManager.playBgm('battle');

    // 显示战斗界面
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // 更新战斗 UI
    this.updateBattleUI();
  }

  // 更新战斗 UI
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

    // 更新战斗日志
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // 结束战斗
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // 隐藏战斗界面
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // 播放地图音乐
    this.audioManager.playBgm('village');

    // 保存游戏
    this.saveGame();
  }

  // 保存游戏
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // 加载游戏
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // 游戏主循环
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // 清空画布
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 根据状态渲染
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// 启动游戏
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**最终成果**：

大约 1-2 小时后，一个功能完整的宝可梦风格 RPG 游戏就完成了！

```
项目完成总结：
✅ 游戏架构设计 - Teammate A
✅ 回合制战斗系统 - Teammate B
✅ 对话和任务系统 - Teammate C
✅ 2D 地图渲染 - Teammate D
✅ UI 界面和音效 - Teammate E

项目文件：
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

总计：约 2050 行代码，5 个 AI 团队成员协作完成！

游戏功能：
🎮 回合制战斗系统（攻击、技能、道具、逃跑）
💬 NPC 对话系统（打字机效果、选项分支）
📜 任务系统（接受任务、更新进度、完成奖励）
🗺️ 2D 地图探索（多场景切换、NPC 交互）
💾 自动存档（localStorage 保存进度）
🔊 音效和 BGM（Web Audio API）
📊 角色成长（经验、升级、属性提升）
```

**观察团队工作**：

如果你配置了 tmux 分屏模式，你会看到多个终端窗口同时工作：

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate B     │  Teammate C     │  Teammate D     │
│  实现伤害公式... │  编写对话脚本... │  渲染地块...     │
│                 │                 │                 │
│  "Teammate E，  │  "MapRenderer   │  "怪物需要      │
│   血条宽度是    │   准备好了吗？" │   攻击动画..."   │
│   百分比吗？"   │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**关键要点**：

这个实战案例展示了 Agent Teams 的几个核心优势：

1. **真正的并行开发**：5 个成员同时开发不同的游戏系统
2. **复杂项目管理**：2000+ 行代码被合理拆分和整合
3. **专业分工协作**：战斗、对话、地图、UI 各有专人负责
4. **接口协调**：成员之间通过消息系统协商接口和数据格式
5. **快速交付**：原本需要一个人几周的工作，团队几小时就完成了

你可以尝试运行这个游戏，体验 AI 团队协作开发的宝可梦风格 RPG！

---

### 单个 Prompt vs Agent Teams：你可以自己测试

为了让你直观感受 Agent Teams 的强大，我们准备了两套测试方案，你可以自己尝试对比差异。

#### 测试方案 A：单个 Prompt 方式

这是传统的使用方式，用一个完整的 prompt 让 AI 帮你开发游戏。

**在 Claude Code 中输入**：

```
帮我开发一个宝可梦风格的网页 RPG 游戏，包含以下功能：
- 角色系统（等级、HP、攻击、防御）
- 回合制战斗系统（攻击、技能、道具、逃跑）
- NPC 对话系统
- 2D 地图探索
- 存档功能
- 音效系统

使用 React + TypeScript + Vite + Tailwind CSS。
请给我完整的代码，可以直接运行的。
```

**预期结果**：

| 项目 | 预期情况 |
|------|---------|
| **代码质量** | AI 会尝试生成所有代码，但由于上下文限制，很多细节会省略或用注释代替 |
| **功能完整性** | 核心功能可能有，但很多高级功能会缺失或简化 |
| **代码可运行性** | 可能有一些 bug，需要多次调试才能运行 |
| **开发时间** | 一次对话可能需要 30-60 分钟，且需要多次往返修改 |
| **代码量** | 约 500-800 行（因为 AI 会压缩代码） |

**你可能遇到的问题**：

1. **代码被截断**：AI 回复有长度限制，代码可能生成到一半就停止了
2. **功能不完整**：对话系统可能只有基础版本，没有任务系统
3. **缺少细节**：音效可能只是一个 TODO 注释
4. **难以调试**：如果代码有问题，需要让 AI 在同一对话中修改，上下文会越来越混乱

#### 测试方案 B：Agent Teams 方式

这是本文介绍的方式，让多个 AI 团队成员协作开发。

**在 Claude Code 中输入**（开启 Agent Teams 后）：

```
我想开发一个宝可梦风格的网页 RPG 游戏。

创建一个团队来协作开发：

团队成员分工：
- Teammate A（游戏架构师）：设计整体架构，定义游戏状态机，规划数据结构
- Teammate B（战斗系统）：实现回合制战斗逻辑、技能系统、伤害计算
- Teammate C（对话系统）：实现 NPC 对话、任务系统、剧情脚本
- Teammate D（地图渲染）：使用 Canvas 实现 2D 地图渲染、角色移动、场景切换
- Teammate E（UI 音效）：设计游戏界面、战斗 UI、音效播放

技术要求：
- 使用原生 HTML/CSS/JavaScript
- 使用 Canvas 渲染游戏画面
- 回合制战斗系统
- 存档使用 localStorage
- 音效使用 Web Audio API

每个成员使用 Sonnet 模型，Team Lead 使用 Opus。

请先让架构师设计整体方案，定义好数据结构后，其他成员再并行开发。
```

**预期结果**：

| 项目 | 预期情况 |
|------|---------|
| **代码质量** | 每个成员专注自己的领域，代码更加专业和完整 |
| **功能完整性** | 所有功能都有完整实现，包括任务系统、多场景地图等 |
| **代码可运行性** | 成员之间会互相检查接口，集成问题更少 |
| **开发时间** | 约 1-2 小时完成全部功能（因为并行开发） |
| **代码量** | 约 2000+ 行（完整实现，没有压缩） |

#### 量化对比表

| 对比维度 | 单个 Prompt | Agent Teams |
|---------|-------------|-------------|
| **总代码行数** | 500-800 行 | 2000+ 行 |
| **开发时间** | 30-60 分钟（但功能不完整） | 1-2 小时（功能完整） |
| **功能完整性** | 60-70% | 95%+ |
| **代码可维护性** | 中等（一个大文件） | 高（模块化设计） |
| **Bug 数量** | 较多（缺少测试） | 较少（成员互相验证） |
| **后期扩展** | 困难（代码耦合） | 容易（模块化结构） |
| **Token 消耗** | ~50K tokens | ~200K tokens（5 个成员） |
| **成本** | ~$0.50 | ~$2.00 |

#### 实际测试建议

**步骤 1：先测试单个 Prompt 方式**

```
1. 打开一个新的 Claude Code 对话
2. 使用上面的"测试方案 A"的 prompt
3. 记录：花了多长时间？代码有多少行？哪些功能缺失？
```

**步骤 2：再测试 Agent Teams 方式**

```
1. 确认 Agent Teams 已开启
2. 使用上面的"测试方案 B"的 prompt
3. 观察：团队成员如何协作？代码是否更完整？
```

**步骤 3：对比两个结果**

```
1. 分别运行两个版本的代码
2. 对比功能列表：哪些功能单个 Prompt 有缺失？
3. 对比代码结构：Agent Teams 的代码是否更模块化？
4. 评估：如果让你继续开发这个游戏，哪个版本更容易扩展？
```

#### 为什么会有这些差异？

**单个 Prompt 的局限**：

1. **上下文压力**：AI 需要在一个回复中处理所有信息，必然会简化
2. **注意力分散**：同时关注战斗、对话、地图、UI，细节容易遗漏
3. **没有协作验证**：没有人检查接口是否匹配，bug 容易产生

**Agent Teams 的优势**：

1. **专业分工**：每个成员专注一个领域，可以深入细节
2. **并行处理**：战斗、对话、地图同时开发，效率更高
3. **互相验证**：成员之间会协商接口，减少集成问题
4. **独立上下文**：每个成员有自己的 200K 上下文，不会互相干扰

#### 结论

Agent Teams 的核心价值不在于"更快"，而在于**"更完整、更专业"**。

- 对于简单项目（如贪吃蛇），单个 Prompt 就够了
- 对于复杂项目（如宝可梦 RPG），Agent Teams 能产生更好的结果

关键是**选择合适的工具**：不要用 Agent Teams 去做变量重命名，也不要用单个 Prompt 去做一个完整的 RPG 游戏。

---

## 最佳实践

Agent Teams 是一个强大的工具，但要用好它，需要掌握一些最佳实践。这些经验来自社区使用者的实战总结，能帮你避免常见陷阱，发挥团队协作的最大价值。

### 实践一：合同优先（Contract-First）

在多个 Agent 开始并行工作之前，先花时间定义清晰的"合同"——也就是接口契约。

**为什么重要**：

假设 Teammate A 负责后端 API，Teammate B 负责前端调用。如果他们同时开工，没有事先约定接口格式，很可能出现这种情况：

```
Teammate A：实现了 POST /api/login，接收 {username, password}
Teammate B：实现了前端调用，发送 {user, pass}
结果：对不上，需要返工修改
```

**如何做**：

在启动团队之前，先让 Claude 帮你设计接口：

```
先别急着开发，先帮我设计一下用户认证系统的接口：

1. 登录接口的请求和响应格式
2. 注册接口的请求和响应格式
3. 密码重置的流程和接口
4. 错误处理的规范

把这些接口定义清楚地写下来，然后再让团队开始开发。
```

**合同应该包含**：

- 函数签名和数据结构
- 输入输出的 JSON 格式
- HTTP 状态码的含义
- 错误处理的约定
- 字段验证规则

### 实践二：合理分配模型

不同的任务需要不同能力的模型，合理分配可以平衡效果和成本。

**Team Lead 用 Opus**：

Team Lead 负责任务拆解、结果综合，这些需要强大的推理能力，推荐使用 Opus：

```
创建一个团队，Team Lead 使用 Opus 模型，负责整体规划和结果审核。
Teammates 使用 Sonnet 模型，负责具体实现。
```

**Teammates 用 Sonnet**：

具体的编码、测试等任务，Sonnet 完全胜任，而且成本更低：

- Opus 4.6：约 $15/百万输出 tokens
- Sonnet 4.5：约 $3/百万输出 tokens

使用 Sonnet 作为成员可以显著降低整体成本。

**特殊情况用 Haiku**：

对于简单的任务（如文档更新、简单测试编写），可以考虑使用 Haiku（约 $0.80/百万输出 tokens）。

### 实践三：控制任务粒度

任务太大或太小都会影响效率，需要找到合适的粒度。

**经验法则**：

每个任务应该让一个成员在 **15-30 分钟内**独立完成。

**任务太大**：

```
不好：实现用户认证系统
```

这个任务太大了，包含多个子任务，一个人需要很长时间才能完成，失去了并行优势。

**任务太小**：

```
不好：创建一个名为 auth.js 的空文件
```

这个任务太细碎，成员之间花在协调上的时间比实际干活时间还多。

**合适的粒度**：

```
好：实现登录 API 接口，包括：
1. POST /api/login 接口
2. 验证用户名密码
3. 返回 JWT token
4. 错误处理
```

这个任务有明确的边界和交付物，一个人可以独立完成，也不会太细碎。

**推荐配置**：

每个成员负责 **5-6 个中等粒度的任务**，这样既有足够的并行度，又不会让协调成本过高。

### 实践四：避免文件冲突

多个成员同时修改同一个文件会导致合并冲突，这是 Agent Teams 最常见的问题。

**分配原则**：

尽量让不同成员负责**不同的文件**：

```
好：
- Teammate A：负责 src/auth/ 目录下的所有文件
- Teammate B：负责 src/api/ 目录下的所有文件
- Teammate C：负责 tests/auth/ 目录下的所有文件

不好：
- Teammate A 和 Teammate B 都要修改 src/app.js
```

**如果必须修改同一文件**：

设计串行修改阶段：

```
阶段 1（并行）：
- Teammate A：分析 auth.js 需要添加什么功能
- Teammate B：设计新功能的接口
- Teammate C：编写测试用例

阶段 2（串行）：
- Team Lead 综合所有输入
- 一个成员统一修改 auth.js
```

### 实践五：提供丰富的初始上下文

Teammates 启动时，对话历史是空的——它们不知道 Team Lead 和用户之前讨论了什么。

**错误做法**：

```
创建团队，让成员开始干活。
```

成员们启动后会一脸茫然：什么项目？用什么技术栈？要做什么？

**正确做法**：

```
这是一个 React + Node.js 的电商项目，使用 TypeScript。

项目结构是：
- src/frontend/：React 前端代码
- src/backend/：Node.js 后端代码
- prisma/：数据库模型

代码风格：
- 使用函数组件和 Hooks
- 后端使用 Express.js
- 数据库用 PostgreSQL

现在创建一个团队，让成员在 src/auth/ 下添加用户认证功能。
```

提供充分的上下文，成员们才能高效工作。

### 实践六：先研究再实现

不要让成员直接开始编码，先让它们研究和设计方案。

**两阶段流程**：

**阶段 1：研究和设计**

```
创建一个团队，第一阶段是研究：
- 一个成员调研现有的认证方案（JWT vs Session）
- 一个成员分析项目的技术栈，确定最佳实践
- 一个成员设计数据库表结构

完成研究后，成员们通过消息系统讨论，确定最终方案。
```

**阶段 2：实现**

```
方案确定后，第二阶段开始实现：
- 一个成员实现后端认证逻辑
- 一个成员实现前端登录页面
- 一个成员编写测试
```

这样做的好处是：**提前发现架构不匹配的问题**，避免写到一半发现方案行不通。

### 实践七：主动监控和干预

即使配置了自动化，你还是应该主动监控团队的工作状态。

**使用分屏模式**：

如果你配置了 tmux 分屏，可以实时看到所有成员的输出：

```
┌─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │
│  正在分析代码... │  正在实现 API... │
│                 │                 │
│  等等，这个方案  │                 │
│  似乎有问题...   │                 │
└─────────────────┴─────────────────┘
```

当你发现某个成员走偏了，可以及时干预：

```
@Teammate1 停一下，你分析的方向不对。认证模块应该在 src/auth/ 下，不是 src/user/。
```

**定期检查任务状态**：

使用 TaskList 命令查看所有任务的状态：

```
/tasks
```

这会显示所有任务的当前状态，你可以看到哪些任务完成了、哪些还在进行中、哪些被阻塞了。

---

## 适用场景

Agent Teams 很强大，但不是所有任务都适合用它。了解它的适用场景，可以帮你做出正确的选择。

### 适合 Agent Teams 的场景

**复杂系统重构**

当你的重构涉及多个模块，且模块之间有明确边界时：

```
场景：将单体应用拆分为微服务

创建团队：
- Teammate A：分析用户模块的依赖关系
- Teammate B：分析订单模块的依赖关系
- Teammate C：分析支付模块的依赖关系
- Teammate D：设计服务间的通信协议
```

三个模块可以同时分析，最后综合结果，比串行分析快得多。

**多角度代码审查**

当你需要从多个维度审查代码时：

```
场景：全面审查支付模块的安全性

创建团队：
- Teammate A：专注安全漏洞（SQL 注入、XSS 等）
- Teammate B：检查性能问题（N+1 查询、内存泄漏等）
- Teammate C：验证错误处理的完整性
- Teammate D：评估测试覆盖率
```

每个成员专注于一个维度，审查更深入，最终综合成一份完整的报告。

**前后端并行开发**

当你需要同时开发前后端时：

```
场景：开发用户管理功能

创建团队：
- Teammate A（前端）：实现用户列表页面
- Teammate B（前端）：实现用户编辑页面
- Teammate C（后端）：实现 CRUD API
- Teammate D（协调）：设计 API 接口，确保前后端一致
```

前后端可以同时开发，只要 API 接口事先定义好（合同优先原则）。

**竞争性调试**

当你有多个可能的解决方案时：

```
场景：修复一个复杂的 bug，有两个可能的修复方案

创建团队：
- Teammate A：实施方案 1
- Teammate B：实施方案 2
- Teammate C：评估两个方案的优劣
```

两个方案同时实施和测试，最后比较效果，选择更好的。

**文档生成**

当你需要生成大量文档时：

```
场景：为整个项目编写文档

创建团队：
- Teammate A：编写 API 文档
- Teammate B：编写部署指南
- Teammate C：编写开发指南
- Teammate D：编写故障排查手册
```

多个文档可以同时编写，大幅提升效率。

### 不适合 Agent Teams 的场景

**简单修改任务**

```
不适合：变量重命名、单个 bug 修复、小功能添加
```

这些任务启动团队的开销比实际干活时间还长，得不偿失。

**高度串行的任务**

```
不适合：必须按顺序执行的步骤
```

如果任务 B 必须等任务 A 完成才能开始，那就没有并行空间了。

**成本敏感的任务**

Agent Teams 的 Token 消耗是单实例的 **2-4 倍**（取决于团队规模）。如果成本是首要考虑，单实例可能是更好的选择。

### 决策流程图

```
是否有多个独立的子任务？
    │
    ├─ 否 → 使用单实例
    │
    └─ 是 →
         │
         子任务是否可以分配给不同文件？
         │
         ├─ 否 → 考虑串行执行或拆分任务
         │
         └─ 是 →
              │
              成本是否可接受（2-4x）？
              │
              ├─ 否 → 使用单实例
              │
              └─ 是 → 使用 Agent Teams ✓
```

---

## 成本和性能

使用 Agent Teams 会增加成本，但也可能带来显著的效率提升。理解这个权衡，可以帮助你做出明智的决策。

### 成本分析

**Token 消耗与团队规模**

Agent Teams 的 Token 消耗大致与团队规模呈**线性关系**：

| 团队规模 | 相对成本 | 适用场景 |
|---------|---------|---------|
| 1 人（单实例） | 1x | 简单任务 |
| 2 人团队 | 2-2.5x | 中等复杂度 |
| 3 人团队 | 3-4x | 复杂任务 |
| 5+ 人团队 | 5-6x+ | 大型项目 |

**为什么不是精确的线性关系**：

- **启动开销**：每个成员启动时需要接收初始上下文
- **协调开销**：成员之间通过消息系统通信也消耗 tokens
- **Team Lead 成本**：Team Lead 通常使用 Opus，成本更高

**具体数字示例**（Claude 4.5 Sonnet）：

- 输入：$3/百万 tokens
- 输出：$15/百万 tokens

假设一个任务需要：
- Team Lead（Opus）：50K 输入 + 20K 输出 ≈ $2.25
- 3 个 Teammates（Sonnet）：各 30K 输入 + 15K 输出 ≈ $2.7 × 3 = $8.1
- **总计**：约 $10.35

同样的任务用单实例（Sonnet）：
- 100K 输入 + 50K 输出 ≈ $1.05

**成本倍数**：约 10 倍

**但时间节省**：可能从 3 小时缩短到 1 小时

### 效率提升

**Anthropic 内部测试数据**：

- 大型项目重构：效率提升约 **50%**
- 多模块并行开发：效率提升约 **60-70%**
- 文档生成任务：效率提升约 **80%**

**真实案例**：

Anthropic 工程团队曾用 **16 个并行代理**，在约 2 周时间内构建了一个能够编译 Linux 6.9 内核的 C 编译器（约 10 万行 Rust 代码），通过了 99% 的 GCC 测试。

### 成本优化策略

**策略 1：混合使用模型**

```
Team Lead：Opus（需要强大推理）
Teammates：Sonnet（性价比高）
简单任务：Haiku（最便宜）
```

**策略 2：动态调整团队规模**

```
分析阶段：5 人团队（多角度分析）
实现阶段：3 人团队（并行编码）
测试阶段：2 人团队（测试和修复）
```

**策略 3：分阶段使用 Agent Teams**

不是整个项目都用 Agent Teams，只在最复杂的阶段使用：

```
阶段 1（需求分析）：单实例
阶段 2（架构设计）：Agent Teams（多方案并行）
阶段 3（编码实现）：单实例
阶段 4（代码审查）：Agent Teams（多维度审查）
阶段 5（文档编写）：Agent Teams（并行编写）
```

### 什么时候值得

**值得的情况**：

- 项目时间紧张，效率提升带来的价值 > Token 成本
- 任务复杂度高，单实例容易遗漏细节
- 需要多角度分析和验证

**不值得的情况**：

- 简单任务，启动团队的开销太大
- 成本敏感，Token 预算有限
- 任务高度串行，没有并行空间

---

## 常见问题

### Q1：Agent Teams 稳定吗？可以用于生产环境吗？

Agent Teams 目前是**实验性功能**，可能会有一些 bug 和不稳定的情况。建议：

- 重要项目先做好备份
- 先在小项目上测试和熟悉
- 关注官方更新日志，了解新版本的改进
- 遇到问题时及时反馈给官方

### Q2：最多可以创建多少个成员？

理论上没有硬性限制，但从实用角度考虑：

- 小项目：2-3 人
- 中等项目：3-5 人
- 大型项目：5-10 人

成员过多会带来以下问题：

- 协调开销急剧增加
- Token 消耗线性增长
- 文件冲突概率上升
- 难以监控和管理

### Q3：团队成员可以互相看到对方的上下文吗？

**不能**。每个 Teammate 有完全独立的上下文窗口，它们通过消息系统通信，而不是共享上下文。

这是设计上的选择，好处是：

- 每个成员的思路不会被其他成员污染
- 上下文不会因为对话过长而混乱
- 更接近真实团队的协作方式（每个人都有自己的大脑）

### Q4：如何在不同成员之间切换？

如果没有配置分屏模式，可以使用快捷键：

- `Shift+Up`：切换到上一个成员
- `Shift+Down`：切换到下一个成员
- `Ctrl+O`：回到 Team Lead

### Q5：任务失败了怎么办？

如果某个成员的任务失败了：

1. 查看失败原因：读取该成员的输出日志
2. 重新分配任务：可以将任务重新分配给其他成员
3. 手动干预：你可以直接介入，帮助解决卡住的问题

### Q6：可以中途添加或删除成员吗？

可以。你可以随时向 Team Lead 发出指令：

```
添加一个新成员，让它负责 XXX 任务。
```

```
让 Teammate 3 完成当前任务后退出团队。
```

### Q7：Agent Teams 和之前学的 MCP、Skills 能一起用吗？

完全可以！而且配合使用效果更好：

- **Agent Teams + Skills**：每个成员可以携带不同的技能
- **Agent Teams + MCP**：不同成员可以通过不同的 MCP 服务器访问外部资源

```
创建一个团队：
- Teammate A：携带 frontend-design Skill，负责 UI
- Teammate B：通过 GitHub MCP 访问仓库，负责 PR 管理
- Teammate C：通过 Database MCP 查询数据，负责数据分析
```

---

## 参考资料

### 官方资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code) - Claude Code 完整文档
- [Anthropic 官方工程博客](https://www.anthropic.com/engineering) - 官方技术博客与更新

### Agent Teams 专题教程

**中文完全指南**：

- [Claude Code Agent Teams 完全指南：从入门到实战](https://m.blog.csdn.net/u010634066/article/details/157903022) - 包含配置细节和实战案例，16 个并行代理构建 C 编译器的震撼案例
- [使用 Claude Code Agent Team 协作开发项目：完整实战指南](https://m.blog.csdn.net/u010028049/article/details/158126612) - 完整项目协作开发流程
- [手把手教你设置和使用 Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - 腾讯云，详细配置教程

**上手实战**：

- [Claude Code 原生 Agent Teams 上手实战：从开启到跑通一个三人团队](https://www.cnblogs.com/147api/p/19606317) - 三人团队实战
- [Claude Code Agent Teams 新鲜入门实践](https://m.toutiao.com/article/7606744384960266793/) - 新手入门，包含合同优先等最佳实践
- [不再单打独斗！用 Agent Teams 让 7 个 Claude 同时帮你开发](https://m.toutiao.com/a7605229732241736202/) - 7 人团队协作案例

**最佳实践**：

- [Agent Teams 最佳实践：合同优先、任务粒度、模型分配](https://blog.csdn.net/sinat_37574187/article/details/144727588) - 7 大最佳实践详解
- [七年大厂老兵的 Claude Code 实战手册：从入门到精通的八条军规](https://new.qq.com/rain/a/20260111A02HE900) - 企业级实战经验

**原理与对比**：

- [Claude Code Agent Teams：多 Agent 协作的正确打开方式](https://post.m.smzdm.com/p/adoezrmz/) - 多代理协作深度解析
- [Claude Code 多 Agent 组队开发：从原理到踩坑全指南](https://m.toutiao.com/a7605229732241736202/) - 原理与踩坑经验

### 官方指南翻译

- [Claude 官方发布《Agent 构建指南》(附 PDF 下载)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - 官方 Agent 构建指南
- [Claude 官方发布《构建高效的 Agents 指南》全文翻译版](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - 完整中文翻译

### 相关技术

- [Agent Skills 标准](https://agentskills.io/) - Skills 生态系统
- [skills.sh - Agent Skills 应用商店](https://skills.sh/) - 70,000+ 技能库
