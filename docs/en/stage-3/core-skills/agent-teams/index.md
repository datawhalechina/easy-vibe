# Claude Agent Teams Complete Guide

## Introduction to Agent Teams

**Agent Teams** is a revolutionary feature in Claude Code that allows **multiple independent AI instances to collaborate like a real development team**.

Imagine that in the past, using Claude Code was like being a project manager working with one exceptionally capable assistant. No matter how complex the task was, only that one assistant was doing the work. Now, with Agent Teams, you can assemble a full AI development team: one member can handle the frontend, one can handle the backend, one can handle testing, and they can **work at the same time, communicate with each other, and collaborate to complete complex tasks**.

### From a single assistant to team collaboration

Before diving into Agent Teams, let's first understand the problem it solves.

**Limitations of the single-AI mode**:

When you use a single Claude instance to handle a complex project, you will run into these bottlenecks:

- **Serial processing bottleneck**: AI can only do one thing at a time. For example, when refactoring a project, it may need to analyze the authentication module first, then the database module, and finally the API module. These steps must be done sequentially, even if they do not depend on each other.

- **Context crowding problem**: All information lives in a single conversation window. As the conversation gets longer, important early details can get buried, and AI may forget key decisions discussed earlier.

- **Single-perspective limitation**: Only one AI is thinking, so there is no multi-angle discussion or validation. When complex design decisions appear, there is no "teammate" to debate with or provide a different perspective.

- **Efficiency ceiling**: Large refactors or multi-module development take a long time, and there is no way to speed them up through parallelism.

**The Agent Teams solution**:

Agent Teams solves these problems through **parallel collaboration across multiple instances**:

- **True parallel work**: Multiple AIs can work on different tasks simultaneously. One can handle the frontend UI, another the backend API, and another the database design, without interfering with each other.

- **Independent context spaces**: Every team member has its own full 200K token context window, so important information is not "forgotten" because the conversation gets too long.

- **Team collaboration capability**: Members can communicate directly, discuss design decisions, and validate code quality with each other, just like a real development team.

- **A significant efficiency increase**: According to Anthropic's internal testing, efficiency on large-scale project refactors can improve by around 50%.

---

## Agent Teams vs Subagent

Before going deeper into the architecture of Agent Teams, we should first clear up a common point of confusion: **what is the difference between Agent Teams and Subagent**?

Both features involve "multiple AIs collaborating," but their collaboration models are completely different and suitable for different scenarios.

### Core differences at a glance

| Dimension | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **Topology** | Star topology: all subagents report to the main agent | Mesh topology: members can communicate with each other |
| **Communication style** | The main agent explicitly passes information via prompts, and subagents return results when done | Members can communicate, discuss, and coordinate directly |
| **Context management** | Every subagent has an independent context, and the main agent passes only the necessary information | Every member has a fully independent context |
| **Parallelism** | Can run in parallel, but the collaboration chain still centers on the main agent | True parallel development and collaboration |
| **Task coordination** | The main agent dispatches and coordinates everything centrally | Members can take ownership of tasks more autonomously |
| **Cost** | Not low. Token usage stacks when multiple subagents run in parallel | Higher. Members run independently and communicate more frequently |

### An intuitive analogy

**Subagent is like**: a manager writing separate task slips for several assistants. Each assistant works independently based on its own task slip, and when finished, only returns the result to the manager. The assistants do not communicate directly, and the manager does not see the assistants' full thought process while they work.

```
You → Main Agent → Subagent A: "Analyze this file"
You → Main Agent → Subagent B: "Search for that function"
         ↓
    Subagent A completes → reports result to Main Agent
    Subagent B completes → reports result to Main Agent
         ↓
    Main Agent synthesizes the results → reports back to you
```

**Agent Teams is like**: a project manager leading a real development team. Team members can communicate, discuss, and collaborate directly, rather than routing every detail through the project manager.

```
You → Team Lead: "Build a user authentication feature"
         ↓
    Team Lead creates the team and assigns tasks
         ↓
    Teammate A: "@Teammate B, is the API interface design ready?"
    Teammate B: "Yes, here's the format..."
    Teammate C: "I reviewed the interface and found something we should discuss..."
         ↓
    Team members collaborate to finish the work → Team Lead synthesizes the result → reports back to you
```

### When to use which one

**Use Subagent when**:

- You have a quick, clear, single task, such as "search for this error code"
- Tasks do not depend much on each other
- You want parallel execution, but do not need sustained discussion between members

**Use Agent Teams when**:

- You are doing a complex system refactor that spans multiple modules
- You need multi-angle analysis and discussion, such as a security expert and a performance expert debating a solution
- You need true parallel development, with frontend, backend, and testing happening at the same time
- Tasks require frequent coordination and information sharing

### A simple summary

- **Subagent**: a task distribution tool that breaks a big task into smaller tasks and dispatches them to different "workers"
- **Agent Teams**: a real collaborative team where members can communicate, discuss, and work together like a real team

---

## Core architecture

Agent Teams is not just a simple "open multiple instances" feature. It is a complete **multi-agent collaboration system**. To understand it, we need to understand its core components and how they work together.

### Team composition

An Agent Team consists of four core components, each with its own responsibility, working together to complete complex tasks.

**Team Lead**

The Team Lead is the "brain" and "coordinator" of the entire team. It does not directly execute coding tasks. Instead, it is responsible for:

- **Requirement analysis and task decomposition**: breaking the user's complex requirements into multiple subtasks that can run in parallel
- **Team creation and management**: deciding how many members are needed and what each member should do
- **Task assignment and scheduling**: assigning tasks to the right members and managing task dependencies
- **Result synthesis and quality control**: collecting each member's work, integrating it, and doing the final review

**Teammates**

Teammates are the actual "developers" doing the work. Every Teammate is an independent Claude instance:

- **Independent context window**: each member has a full 200K token context window, completely isolated from the Team Lead and the other members
- **Full tool permissions**: they can use all tools such as Read, Write, Edit, and Bash
- **Autonomous task pickup**: they can independently select and claim tasks from the shared task board
- **Direct communication ability**: they can communicate directly with other members instead of always going through the Team Lead

**TaskList**

TaskList is the team's "project management tool," similar to Jira or Trello:

- **Task status management**: every task has a clear status: `pending`, `in_progress`, or `completed`
- **Dependency management**: tasks can define dependencies, and dependent tasks can only start after prerequisite tasks finish
- **Automatic unlock mechanism**: when one task is completed, the system automatically checks and unlocks tasks waiting on it
- **File lock mechanism**: when a member claims and starts a task, a lock file is created in the task directory to prevent multiple members from editing the same file at the same time

**Messaging System**

The messaging system is the "chat tool" between team members:

- **Point-to-point communication**: member A can send a message directly to member B
- **Broadcast announcements**: a message can be sent to all members at once
- **File-system based**: messages are stored as JSON files in `~/.claude/teams/{team-name}/inboxes/`
- **No network required**: everything works entirely through the local file system, with no network connection or port listening needed

### Collaboration flow

A typical Agent Teams workflow looks like this:

```
The user submits a complex requirement
       ↓
Team Lead analyzes the requirement and breaks it into tasks
       ↓
Creates team members and initializes TaskList
       ↓
       ├─→ Teammate A claims Task 1 ─┐
       ├─→ Teammate B claims Task 2 ─┼→ Run in parallel
       ├─→ Teammate C claims Task 3 ─┤
       │                             ↓
       └──────────────────────────── Members coordinate through the messaging system
                                     ↓
                          Once all tasks are complete, Team Lead synthesizes the result
                                     ↓
                          Final output is delivered to the user
```

### File system layout

Agent Teams creates dedicated directories on your local file system to manage team state:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Team config (member list, model selection, etc.)
│       └── inboxes/
│           ├── team-lead.json   # Team Lead inbox
│           ├── teammate-1.json  # Member 1 inbox
│           └── teammate-2.json  # Member 2 inbox
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Detailed info for Task 1
        ├── task-2.json          # Detailed info for Task 2
        └── current_tasks/
            └── parse_if_statement.txt  # Lock file created while a task is running
```

The advantage of this design is **complete transparency**: you can inspect team status, task progress, and the communication history between members at any time.

---

## Quick start

### Enable the experimental feature

Agent Teams is currently an **experimental feature** and is disabled by default. To use it, you need to enable it first.

**The easiest way: let Claude Code enable it for you**

Type this directly in Claude Code:

```
Help me enable Agent Teams in settings.json
```

Or:

```
Enable the experimental feature agentTeams
```

Claude Code will automatically modify `~/.claude/settings.json` and add the following configuration:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Restart Claude Code**

After the configuration is added, **fully quit and restart Claude Code**, and the feature will take effect.

**Manual configuration (if the automatic method does not work)**:

You can manually edit `~/.claude/settings.json` and add or modify:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**How to verify it is enabled**

After restarting Claude Code, try a conversation like this:

```
You: Can you help me create an Agent Team?

Claude: Yes! I can help you create an Agent Team to collaborate on a task...
```

If Claude understands and responds to the request to create a team, the feature has been enabled successfully.

### Visual mode configuration (optional)

If you want to see team members' work in real time, you can configure **split-pane display mode**.

**Let Claude Code configure it for you**:

Type this directly in Claude Code:

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

Or:

```
Configure agent-teams to use split-panes mode
```

**Install tmux (if you do not have it)**:

If `tmux` is not installed yet, you can ask Claude Code to install it:

```
Help me install tmux
```

Claude Code will automatically run the appropriate installation command based on your operating system, whether macOS or Linux.

**What the configured result looks like**:

After configuration, team members will work in different tmux panes, and you will be able to see all their output at the same time, like a "monitoring wall."

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │  Teammate 3     │
│  Analyzing code │  Building API   │  Writing tests  │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Manual configuration (if the automatic method does not work)**:

You can manually edit `~/.claude/settings.json`:

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

### Hands-on example: build a Pokemon-style RPG game with Agent Teams

Let's experience the power of Agent Teams through a full project. This example will show how multiple AI team members can collaborate to build an RPG game from scratch, including a battle system, dialogue features, and exploration elements.

**Project requirements**:

Build a Pokemon-style web RPG with the following features:

- **Character system**: the player can create a character with level, HP, attack, defense, and other stats
- **Battle system**: turn-based combat with attack, skills, items, and flee options
- **Monster system**: multiple wild monsters with different attributes and skills
- **Dialogue system**: NPC conversations and side quests
- **Map exploration**: a simple 2D map where the player can move between scenes
- **Save system**: save game progress, including level, position, completed quests, and more
- **Sound effects and animation**: visual effects and sound effects for attacks, damage, and leveling up

**Type this in Claude Code**:

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

**How Claude will execute it**:

**Phase 1: architecture design**

Team Lead will first ask Teammate A, the game architect, to design the overall structure:

```
Teammate A is designing the game architecture...

Tech stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Project initialization:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

File structure:
src/
├── App.tsx                 # Main app component
├── main.tsx                # Entry file
├── types/
│   ├── player.ts           # Player type definitions
│   ├── monster.ts          # Monster type definitions
│   ├── skill.ts            # Skill type definitions
│   └── game.ts             # Game state types
├── stores/
│   └── gameStore.ts        # Zustand state management
├── components/
│   ├── map/                # Map-related components
│   │   ├── MapCanvas.tsx   # Map Canvas
│   │   ├── PlayerSprite.tsx # Player sprite
│   │   └── NPCSprite.tsx   # NPC sprite
│   ├── battle/             # Battle-related components
│   │   ├── BattleScreen.tsx    # Battle screen
│   │   ├── BattleMenu.tsx      # Battle menu
│   │   ├── HPBar.tsx           # HP bar component
│   │   └── BattleLog.tsx       # Battle log
│   ├── dialog/             # Dialogue-related components
│   │   ├── DialogBox.tsx   # Dialogue box
│   │   └── Choices.tsx     # Choices component
│   └── ui/                 # Shared UI components
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # Battle system logic
│   ├── DialogSystem.ts     # Dialogue system logic
│   ├── QuestSystem.ts      # Quest system logic
│   └── MapSystem.ts        # Map system logic
├── hooks/
│   ├── useBattle.ts        # Battle hook
│   ├── useDialog.ts        # Dialogue hook
│   └── useAudio.ts         # Audio hook
├── data/
│   ├── monsters.ts         # Monster data
│   ├── skills.ts           # Skill data
│   ├── dialogues.ts        # Dialogue scripts
│   └── maps.ts             # Map data
└── utils/
    ├── audio.ts            # Audio utilities
    └── storage.ts          # Save utilities

Core data structure design:

// types/player.ts - Player type
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

// types/skill.ts - Skill type
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// Game state
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

Battle system design:
- Turn-based, with the player acting first
- Each turn the player can choose: attack, skill, item, or flee
- Skills have PP limits and must be restored when depleted
- Damage formula: (attacker attack / defender defense) × skill power × random factor (0.85~1.0)

Dialogue system design:
- Typewriter effect for text display
- Supports branching options
- Supports conditional triggers, such as after a quest is completed
- NPCs have facing direction, and conversations trigger automatically when the player approaches
```

**Phase 2: parallel development**

Once the architecture is confirmed, Team Lead creates the task list and the other members begin working in parallel:

```
Task list:
├── [Teammate B] Implement battle system core logic (in progress...)
├── [Teammate C] Implement dialogue and quest systems (in progress...)
├── [Teammate D] Implement 2D map rendering (in progress...)
└── [Teammate E] Design UI and audio (in progress...)
```

<details>
<summary>📁 Teammate B: battle system core code</summary>

```javascript
// battle.js - Battle system
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Player attack
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} used ${skill.name}!`);
    this.log.push(`It dealt ${damage} damage!`);

    // Skill effect
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Check whether battle is over
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} collapsed!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Monster attack
  monsterAttack() {
    if (this.state !== 'active') return;

    // Randomly choose a skill
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} used ${skill.name}!`);
    this.log.push(`It dealt ${damage} damage!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} fell...`);
    } else {
      this.turn = 'player';
    }
  }

  // Damage calculation
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Type advantage bonus (simplified)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Apply skill effect
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} was burned!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} recovered ${healAmount} HP!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name}'s attack increased!`);
        break;
    }
  }

  // Gain experience
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} gained ${expGain} EXP!`);

    // Level-up check
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Level up
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Stat growth
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} leveled up to ${this.player.level}!`);
    this.log.push(`HP +${hpGain}, ATK +${atkGain}, DEF +${defGain}`);
  }

  // Flee
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('You fled successfully!');
      return true;
    } else {
      this.log.push('Failed to flee!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Monster data
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'Slime',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'Goblin',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Ember', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Growl', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 Teammate C: dialogue and quest system code</summary>

```javascript
// dialog.js - Dialogue system
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Show dialogue
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Show the next dialogue item
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Handle special dialogue types
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Render the dialogue box
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

    // Typewriter effect
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

    // Show choices, if any
    this.renderChoices();
  }

  // Render choices
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

  // Next
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // must choose when options exist
    this.showNext();
  }
}

// Quest system
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Accept a quest
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Update quest progress
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

  // Check quest completion
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Complete quest
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Give rewards
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Give rewards
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Dialogue script examples
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Village Chief', text: 'Oh, adventurer... you finally arrived.'},
      {speaker: 'Village Chief', text: 'Lately, many wild monsters have appeared near our village, and everyone is frightened.'},
      {speaker: 'Village Chief', text: 'If you can help drive them away, I would be deeply grateful!'},
      {
        choices: [
          {text: 'Okay, I accept this quest', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Village Chief', text: 'Wonderful! Please defeat 3 slimes to the north.'},
              {speaker: 'System', text: 'Quest [Drive Away the Slimes] accepted!'}
            ];
          }},
          {text: 'I am a little busy right now', dialog: [
            {speaker: 'Village Chief', text: 'All right. Come back when you are ready.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Village Chief', text: 'You really did it! Thank you so much!'},
      {speaker: 'System', text: 'Quest [Drive Away the Slimes] completed! You gained 100 EXP!'},
      {speaker: 'Village Chief', text: 'Please take this. It is a small token of my thanks.'}
    ]
  },

  shopkeeper: [
    {speaker: 'Shopkeeper', text: 'Welcome! Looking for something?'},
    {
      choices: [
        {text: 'Browse goods', dialog: () => {
          game.openShop();
          return [{speaker: 'Shopkeeper', text: 'Take whatever catches your eye!'}];
        }},
        {text: 'Leave', dialog: [{speaker: 'Shopkeeper', text: 'Come again next time!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 Teammate D: 2D map rendering system code</summary>

```javascript
// map.js - Map rendering system
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

  // Load map
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Render the map
  render() {
    if (!this.currentMap) return;

    // Clear the canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context
    this.ctx.save();

    // Apply camera offset
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Render map layers
    this.renderLayers();

    // Render NPCs
    this.renderNPCs();

    // Render player
    this.renderPlayer();

    // Restore context
    this.ctx.restore();
  }

  // Render map layers
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

  // Render a single tile
  renderTile(x, y, tileId) {
    // Draw different tiles based on tile ID
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Grass texture
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
        // Ripple effect
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
        // Roof
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Get tile type
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // Render NPCs
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // Draw NPC
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

      // Draw name
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Render player
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Player body
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

    // Player direction indicator
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

  // Update camera position
  updateCamera() {
    if (!this.player) return;

    // Camera follows player and keeps them centered
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Smooth movement
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Prevent camera from going beyond map bounds
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Check collision
  checkCollision(x, y) {
    // Check map bounds
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Check tile collision
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // walls and houses are obstacles

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // Check NPC collision
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // Trigger NPC dialogue
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // Trigger NPC dialogue
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Example map data
const VILLAGE_MAP = {
  name: 'Starter Village',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Map data (simplified)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... more map data
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Village Chief',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Shopkeeper',
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
<summary>📁 Teammate E: battle UI code</summary>

```html
<!-- Battle screen HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- Enemy area -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Slime</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- Player area -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Hero</div>
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

  <!-- Battle menu -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Attack</button>
      <button class="menu-btn" data-action="skills">Skills</button>
      <button class="menu-btn" data-action="items">Items</button>
      <button class="menu-btn" data-action="flee">Flee</button>
    </div>
  </div>

  <!-- Skill submenu -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Choose a skill</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Back</button>
  </div>

  <!-- Battle log -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Battle screen styles */
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

/* Hit animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Attack animation */
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
<summary>📁 Audio system code</summary>

```javascript
// audio.js - Audio system
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Initialize audio context
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Play background music
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Use oscillators to generate simple BGM
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Generate simple background music
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

  // Stop background music
  stopBgm() {
    this.currentBgm = null;
  }

  // Play sound effect
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

  // Attack sound effect
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

  // Hit sound effect
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

  // Victory sound effect
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

  // Level-up sound effect
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

  // Dialogue sound effect
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

**Collaboration dialogue between members**:

```
Teammate B → Teammate C:
"The battle system is done. When the player wins, it calls giveExp() to level up.
Please check the quest system and make sure level-up data is saved correctly."

Teammate C → Teammate B:
"Got it. The quest system stores game data with localStorage,
including level, experience, and the list of completed quests. I'll add an autosave mechanism."

Teammate D → All:
"The map rendering system is finished, and the NPC facing data is now connected to the dialogue system.
When the player faces an NPC, dialogue will trigger automatically. Please confirm the trigger logic in the dialogue system."

Teammate C → Teammate D:
"Confirmed. DialogSystem has a showDialog() method that can accept a dialogue array.
I'll make sure all NPC dialogue data follows that format."

Teammate E → Teammate B:
"The battle UI is finished, but I need real-time player and monster data to update the HP bars.
Does the battle system provide a callback?"

Teammate B → Teammate E:
"Yes. BattleSystem has an onUpdate callback that fires at the end of each turn.
You can register that callback to update the UI."

Teammate E → Teammate D:
"When switching maps, we need to reposition the camera.
Does MapRenderer provide an updateCamera() method?"

Teammate D → Teammate E:
"Yes. updateCamera() is called automatically after every loadMap().
You can also call it manually after the player moves to smoothly update the camera."
```

**Phase 3: integration and testing**

After all components are complete, Team Lead is responsible for integration:

<details>
<summary>📁 Main game controller code</summary>

```javascript
// game.js - Main game controller
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Initialize each system
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Load map
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Input handling
    this.setupInput();

    // Start game loop
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Auto-load save
    this.loadGame();
  }

  // Create player
  createPlayer() {
    return {
      name: 'Hero',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // Set up input handling
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

  // Map input handling
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

      // Check random battle
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Save game
      this.saveGame();
    }
  }

  // Dialogue input handling
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Battle input handling
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Start battle
  startBattle(monsterData) {
    // Randomly choose a monster
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Create monster instance
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

    // Play battle music
    this.audioManager.playBgm('battle');

    // Show battle screen
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Update battle UI
    this.updateBattleUI();
  }

  // Update battle UI
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

    // Update battle log
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // End battle
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Hide battle screen
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Play map music
    this.audioManager.playBgm('village');

    // Save game
    this.saveGame();
  }

  // Save game
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Load game
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Main game loop
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render by state
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Start the game
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**Final result**:

After about 1 to 2 hours, a fully functional Pokemon-style RPG is complete!

```
Project summary:
✅ Game architecture design - Teammate A
✅ Turn-based battle system - Teammate B
✅ Dialogue and quest system - Teammate C
✅ 2D map rendering - Teammate D
✅ UI and sound effects - Teammate E

Project files:
├── index.html (120 lines)
├── css/
│   ├── main.css (100 lines)
│   ├── battle.css (180 lines)
│   └── dialog.css (80 lines)
├── js/
│   ├── game.js (250 lines)
│   ├── state.js (60 lines)
│   ├── player.js (50 lines)
│   ├── monster.js (80 lines)
│   ├── battle.js (220 lines)
│   ├── dialog.js (180 lines)
│   ├── map.js (280 lines)
│   └── audio.js (150 lines)
└── data/
    ├── monsters.js (100 lines)
    ├── skills.js (80 lines)
    └── dialogues.js (120 lines)

Total: about 2050 lines of code, completed collaboratively by 5 AI team members!

Game features:
🎮 Turn-based battle system (attack, skills, items, flee)
💬 NPC dialogue system (typewriter effect, branching choices)
📜 Quest system (accept quests, update progress, completion rewards)
🗺️ 2D map exploration (multi-scene transitions, NPC interaction)
💾 Autosave (progress stored with localStorage)
🔊 Sound effects and BGM (Web Audio API)
📊 Character growth (experience, leveling up, stat increases)
```

**Observe the team at work**:

If you configured tmux split-pane mode, you will see multiple terminal windows working at the same time:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teammate B     │  Teammate C     │  Teammate D     │
│  Implementing   │  Writing        │  Rendering      │
│  damage formula │  dialogue       │  tiles          │
│                 │  scripts        │                 │
│  "Teammate E,   │  "Is            │  "The monsters  │
│   is the HP bar │   MapRenderer   │   need attack   │
│   width a       │   ready yet?"   │   animations..."│
│   percentage?"  │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Key takeaways**:

This hands-on example shows several core advantages of Agent Teams:

1. **True parallel development**: 5 members develop different game systems at the same time
2. **Complex project management**: 2000+ lines of code are split and integrated in a structured way
3. **Specialized division of labor**: battle, dialogue, maps, and UI each have a dedicated owner
4. **Interface coordination**: members negotiate interfaces and data formats through the messaging system
5. **Fast delivery**: work that could take one person weeks can be completed by the team in a few hours

You can try running this game yourself and experience how an AI team collaborates to build a Pokemon-style RPG.

---

### Single prompt vs Agent Teams: test it yourself

To help you feel the power of Agent Teams more directly, we prepared two test plans that you can try yourself and compare.

#### Test plan A: single prompt approach

This is the traditional approach: use one complete prompt and ask AI to develop the game.

**Type this in Claude Code**:

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

**Expected result**:

| Item | Expected situation |
|------|---------|
| **Code quality** | AI will try to generate all the code, but because of context limits, many details will be omitted or replaced with comments |
| **Feature completeness** | Core features may be present, but many advanced features will be missing or simplified |
| **Run-ability** | There may be bugs, and you may need several rounds of debugging before it runs |
| **Development time** | One conversation may take 30 to 60 minutes, with multiple back-and-forth rounds |
| **Code volume** | About 500 to 800 lines, because AI tends to compress code |

**Problems you may encounter**:

1. **Code gets cut off**: AI responses have length limits, so generation may stop halfway through
2. **Incomplete features**: the dialogue system may be only a basic version with no quest system
3. **Missing details**: the audio system may be left as a TODO comment
4. **Hard to debug**: if code has problems, you must ask AI to fix it in the same conversation, and the context becomes increasingly messy

#### Test plan B: Agent Teams approach

This is the approach introduced in this article: let multiple AI team members collaborate on development.

**Type this in Claude Code** (after enabling Agent Teams):

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

**Expected result**:

| Item | Expected situation |
|------|---------|
| **Code quality** | Every member focuses on its own area, so the code is more professional and complete |
| **Feature completeness** | All features are implemented more fully, including the quest system and multi-scene maps |
| **Run-ability** | Members cross-check interfaces with each other, so integration issues are fewer |
| **Development time** | About 1 to 2 hours to complete all features because development happens in parallel |
| **Code volume** | About 2000+ lines, with a complete implementation instead of compressed code |

#### Quantitative comparison table

| Dimension | Single Prompt | Agent Teams |
|---------|-------------|-------------|
| **Total lines of code** | 500-800 lines | 2000+ lines |
| **Development time** | 30-60 minutes, but features are incomplete | 1-2 hours, with complete features |
| **Feature completeness** | 60-70% | 95%+ |
| **Maintainability** | Medium, usually one large file | High, with modular design |
| **Bug count** | Higher, because there is less validation | Lower, because members cross-check each other |
| **Future extensibility** | Difficult, because code is tightly coupled | Easier, because the structure is modular |
| **Token usage** | ~50K tokens | ~200K tokens (5 members) |
| **Cost** | ~$0.50 | ~$2.00 |

#### Suggested real-world test process

**Step 1: test the single-prompt approach first**

```
1. Open a new Claude Code conversation
2. Use the prompt from "Test Plan A" above
3. Record: how long did it take? How many lines of code were produced? Which features were missing?
```

**Step 2: then test the Agent Teams approach**

```
1. Confirm that Agent Teams has been enabled
2. Use the prompt from "Test Plan B" above
3. Observe: how do team members collaborate? Is the code more complete?
```

**Step 3: compare the two results**

```
1. Run both versions of the code separately
2. Compare the feature lists: which features are missing in the single-prompt version?
3. Compare the code structure: is the Agent Teams version more modular?
4. Evaluate: if you wanted to continue developing this game, which version would be easier to extend?
```

#### Why do these differences happen?

**Limitations of the single-prompt approach**:

1. **Context pressure**: AI must handle everything in a single response, so simplification is inevitable
2. **Scattered attention**: battle, dialogue, map, and UI all compete for attention, so details are easy to miss
3. **No collaborative validation**: nobody checks whether interfaces match, so bugs are more likely

**Advantages of Agent Teams**:

1. **Specialized division of labor**: each member focuses on one area and can go deep into the details
2. **Parallel processing**: battle, dialogue, and map development happen at the same time, improving efficiency
3. **Mutual validation**: members negotiate interfaces with each other, reducing integration problems
4. **Independent context**: every member has its own 200K context and does not interfere with the others

#### Conclusion

The core value of Agent Teams is not simply that it is "faster," but that it is **"more complete and more professional."**

- For simple projects such as Snake, a single prompt is enough
- For complex projects such as a Pokemon RPG, Agent Teams can produce better results

The key is to **choose the right tool**: do not use Agent Teams to rename a variable, and do not use a single prompt to build a complete RPG game.

---

## Best practices

Agent Teams is a powerful tool, but to use it well, you need to understand some best practices. These lessons come from real-world experience in the community and can help you avoid common pitfalls while getting the most value from team collaboration.

### Practice 1: contract-first

Before multiple Agents begin working in parallel, spend time defining a clear "contract," meaning the interface agreement.

**Why it matters**:

Suppose Teammate A is responsible for the backend API and Teammate B is responsible for the frontend integration. If they start at the same time without agreeing on the interface format first, something like this can happen:

```
Teammate A: implemented POST /api/login and expects {username, password}
Teammate B: implemented the frontend call and sends {user, pass}
Result: they do not match, and rework is required
```

**How to do it**:

Before starting the team, first ask Claude to design the interfaces:

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**A contract should include**:

- Function signatures and data structures
- Input and output JSON formats
- Meanings of HTTP status codes
- Error-handling conventions
- Field validation rules

### Practice 2: assign models wisely

Different tasks require different models. Good model assignment helps balance quality and cost.

**Use Opus for the Team Lead**:

The Team Lead handles task decomposition and result synthesis, which require stronger reasoning ability, so Opus is recommended:

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Use Sonnet for Teammates**:

For concrete coding and testing work, Sonnet is entirely capable and significantly cheaper:

- Opus 4.6: around $15 per million output tokens
- Sonnet 4.5: around $3 per million output tokens

Using Sonnet for members can significantly reduce overall cost.

**Use Haiku for special cases**:

For simple tasks such as documentation updates or small test-writing tasks, you can consider Haiku, around $0.80 per million output tokens.

### Practice 3: control task granularity

Tasks that are too large or too small both hurt efficiency. You need to find the right granularity.

**Rule of thumb**:

Each task should be something one member can complete independently in **15 to 30 minutes**.

**Task too large**:

```
Bad: implement the user authentication system
```

This task is too broad. It contains several subtasks, and one person would need a long time to finish it, which wastes the advantage of parallelism.

**Task too small**:

```
Bad: create an empty file called auth.js
```

This task is too tiny. Members spend more time coordinating than doing actual work.

**Appropriate granularity**:

```
Good: implement the login API, including:
1. The POST /api/login endpoint
2. Username and password validation
3. JWT token response
4. Error handling
```

This task has clear boundaries and deliverables. One person can finish it independently, and it is not overly fragmented.

**Recommended setup**:

Let each member own **5 to 6 medium-sized tasks**. This gives enough parallelism without making coordination costs too high.

### Practice 4: avoid file conflicts

Multiple members modifying the same file at the same time is the most common problem in Agent Teams.

**Assignment principle**:

Try to let different members own **different files**:

```
Good:
- Teammate A: owns all files under src/auth/
- Teammate B: owns all files under src/api/
- Teammate C: owns all files under tests/auth/

Bad:
- Teammate A and Teammate B both modify src/app.js
```

**If the same file must be modified**:

Design a serial editing phase:

```
Phase 1 (parallel):
- Teammate A: analyze what functionality needs to be added to auth.js
- Teammate B: design the new feature interface
- Teammate C: write the test cases

Phase 2 (serial):
- Team Lead synthesizes all inputs
- One member modifies auth.js in a single integrated pass
```

### Practice 5: provide rich initial context

When Teammates start, their conversation history is empty. They do not know what the Team Lead and the user discussed before.

**Wrong approach**:

```
Create the team and let the members start working.
```

Members will start in a fog: what project is this? What tech stack is it using? What exactly should they build?

**Correct approach**:

```
This is a React + Node.js e-commerce project using TypeScript.

The project structure is:
- src/frontend/: React frontend code
- src/backend/: Node.js backend code
- prisma/: database models

Code style:
- Use function components and Hooks
- Use Express.js on the backend
- Use PostgreSQL for the database

Now create a team and have the members add user authentication under src/auth/.
```

Only with sufficient context can members work efficiently.

### Practice 6: research before implementation

Do not let members start coding immediately. Ask them to research and design the solution first.

**Two-phase process**:

**Phase 1: research and design**

```
Create a team. In phase one, do research:
- One member investigates existing authentication approaches (JWT vs Session)
- One member analyzes the project's tech stack and determines best practices
- One member designs the database schema

After the research is complete, let the members discuss through the messaging system and settle on a final plan.
```

**Phase 2: implementation**

```
After the plan is finalized, begin implementation:
- One member implements the backend authentication logic
- One member implements the frontend login page
- One member writes tests
```

The benefit of doing it this way is that you can **discover architecture mismatches early**, instead of realizing halfway through implementation that the plan does not work.

### Practice 7: monitor and intervene actively

Even if you configured automation, you should still actively monitor the team's work status.

**Use split-pane mode**:

If you configured tmux panes, you can see all members' output in real time:

```
┌─────────────────┬─────────────────┐
│  Teammate 1     │  Teammate 2     │
│  Analyzing code │  Implementing   │
│  ...            │  API...         │
│                 │                 │
│  Wait, this     │                 │
│  approach seems │                 │
│  wrong...       │                 │
└─────────────────┴─────────────────┘
```

When you notice that a member is going in the wrong direction, you can intervene quickly:

```
@Teammate1 Stop for a moment. Your analysis is headed in the wrong direction. The authentication module should be under src/auth/, not src/user/.
```

**Check task status regularly**:

Use the TaskList command to inspect the status of all tasks:

```
/tasks
```

This shows all task states so you can see what is completed, what is still running, and what is blocked.

---

## Suitable scenarios

Agent Teams is powerful, but not every task is suitable for it. Understanding the right scenarios helps you choose correctly.

### Scenarios where Agent Teams fits well

**Complex system refactors**

When the refactor spans multiple modules with clear boundaries:

```
Scenario: split a monolithic application into microservices

Create a team:
- Teammate A: analyze dependencies in the user module
- Teammate B: analyze dependencies in the order module
- Teammate C: analyze dependencies in the payment module
- Teammate D: design the inter-service communication protocol
```

These modules can be analyzed simultaneously, and the final result can be synthesized later, which is much faster than analyzing them serially.

**Multi-angle code review**

When you need to review code from several dimensions:

```
Scenario: conduct a full security review of the payment module

Create a team:
- Teammate A: focus on security vulnerabilities (SQL injection, XSS, etc.)
- Teammate B: inspect performance issues (N+1 queries, memory leaks, etc.)
- Teammate C: verify completeness of error handling
- Teammate D: evaluate test coverage
```

Each member focuses on one dimension, making the review deeper, and the final report more complete.

**Parallel frontend and backend development**

When you need to build frontend and backend at the same time:

```
Scenario: build a user management feature

Create a team:
- Teammate A (frontend): implement the user list page
- Teammate B (frontend): implement the user edit page
- Teammate C (backend): implement the CRUD API
- Teammate D (coordination): design the API contract and make sure frontend and backend stay aligned
```

Frontend and backend can move in parallel as long as the API contract is defined first, following the contract-first principle.

**Competitive debugging**

When you have multiple possible solutions:

```
Scenario: fix a complex bug with two possible repair strategies

Create a team:
- Teammate A: implement solution 1
- Teammate B: implement solution 2
- Teammate C: evaluate the pros and cons of both
```

Both solutions can be implemented and tested in parallel, and the better one can be chosen afterward.

**Documentation generation**

When you need to produce a large amount of documentation:

```
Scenario: write documentation for the whole project

Create a team:
- Teammate A: write API documentation
- Teammate B: write the deployment guide
- Teammate C: write the development guide
- Teammate D: write the troubleshooting manual
```

Multiple documents can be written at the same time, greatly improving efficiency.

### Scenarios where Agent Teams is not a good fit

**Simple modification tasks**

```
Not suitable: variable renaming, single bug fixes, tiny feature additions
```

For these tasks, the cost of starting a team is greater than the actual work.

**Highly serial tasks**

```
Not suitable: tasks that must happen strictly in sequence
```

If task B cannot start until task A finishes, there is no real space for parallelism.

**Cost-sensitive tasks**

Agent Teams consumes **2 to 4 times** the tokens of a single instance, depending on the team size. If cost is the primary concern, a single instance may be the better choice.

### Decision flowchart

```
Are there multiple independent subtasks?
    │
    ├─ No → Use a single instance
    │
    └─ Yes →
         │
         Can the subtasks be assigned to different files?
         │
         ├─ No → Consider serial execution or split the task further
         │
         └─ Yes →
              │
              Is the cost acceptable (2-4x)?
              │
              ├─ No → Use a single instance
              │
              └─ Yes → Use Agent Teams ✓
```

---

## Cost and performance

Using Agent Teams increases cost, but it can also produce significant efficiency gains. Understanding this tradeoff helps you make informed decisions.

### Cost analysis

**Token consumption and team size**

The token consumption of Agent Teams is roughly **linear** with team size:

| Team size | Relative cost | Suitable scenario |
|---------|---------|---------|
| 1 person (single instance) | 1x | Simple tasks |
| 2-person team | 2-2.5x | Medium complexity |
| 3-person team | 3-4x | Complex tasks |
| 5+ person team | 5-6x+ | Large projects |

**Why it is not perfectly linear**:

- **Startup cost**: each member must receive initial context when it starts
- **Coordination cost**: communication between members through the messaging system also consumes tokens
- **Team Lead cost**: Team Lead usually uses Opus, which is more expensive

**Concrete example numbers** (Claude 4.5 Sonnet):

- Input: $3 per million tokens
- Output: $15 per million tokens

Suppose a task requires:
- Team Lead (Opus): 50K input + 20K output ≈ $2.25
- 3 Teammates (Sonnet): each 30K input + 15K output ≈ $2.7 × 3 = $8.1
- **Total**: about $10.35

The same task on a single Sonnet instance:
- 100K input + 50K output ≈ $1.05

**Cost multiplier**: about 10x

**But time saved**: potentially reduced from 3 hours to 1 hour

### Efficiency gains

**Anthropic internal testing data**:

- Large project refactors: around **50%** improvement in efficiency
- Parallel multi-module development: around **60-70%** improvement
- Documentation generation tasks: around **80%** improvement

**Real case**:

Anthropic's engineering team once used **16 parallel agents** to build a C compiler in about 2 weeks that could compile the Linux 6.9 kernel, around 100,000 lines of Rust code, and it passed 99% of GCC tests.

### Cost optimization strategies

**Strategy 1: mix models**

```
Team Lead: Opus (strong reasoning needed)
Teammates: Sonnet (high value for cost)
Simple tasks: Haiku (cheapest)
```

**Strategy 2: adjust team size dynamically**

```
Analysis phase: 5-person team (multi-angle analysis)
Implementation phase: 3-person team (parallel coding)
Testing phase: 2-person team (testing and fixing)
```

**Strategy 3: use Agent Teams only in selected phases**

Do not use Agent Teams for the entire project. Use it only in the most complex phases:

```
Phase 1 (requirements analysis): single instance
Phase 2 (architecture design): Agent Teams (multiple plans explored in parallel)
Phase 3 (coding): single instance
Phase 4 (code review): Agent Teams (multi-angle review)
Phase 5 (documentation): Agent Teams (parallel writing)
```

### When it is worth it

**Worth it when**:

- The project timeline is tight, and the value of efficiency gains exceeds the token cost
- The task is highly complex, and a single instance is likely to miss details
- You need multi-angle analysis and validation

**Not worth it when**:

- The task is simple, and the overhead of starting a team is too high
- Cost is highly sensitive and the token budget is limited
- The task is highly serial and offers no space for parallelism

---

## Frequently asked questions

### Q1: Is Agent Teams stable? Can it be used in production?

Agent Teams is currently an **experimental feature**, so there may still be bugs and unstable behavior. Recommendations:

- Back up important projects first
- Start with small projects so you can test and get familiar with it
- Follow official release notes to see improvements in new versions
- Report issues to the official team promptly when they appear

### Q2: How many members can I create at most?

There is no hard theoretical limit, but from a practical perspective:

- Small projects: 2 to 3 people
- Medium projects: 3 to 5 people
- Large projects: 5 to 10 people

Too many members introduce the following problems:

- Coordination overhead rises sharply
- Token usage grows linearly
- File conflict probability increases
- Monitoring and management become harder

### Q3: Can team members see each other's context?

**No**. Every Teammate has a completely independent context window. They communicate through the messaging system rather than sharing context directly.

This is a deliberate design choice, and the benefits are:

- One member's reasoning is not polluted by another member's reasoning
- Context does not become chaotic because conversations are too long
- It is closer to how a real team works, where everyone has their own mind

### Q4: How do I switch between different members?

If split-pane mode is not configured, you can use shortcut keys:

- `Shift+Up`: switch to the previous member
- `Shift+Down`: switch to the next member
- `Ctrl+O`: return to the Team Lead

### Q5: What if a task fails?

If one member's task fails:

1. Check the cause of failure by reading that member's output log
2. Reassign the task to another member if needed
3. Intervene manually and help unblock the issue directly

### Q6: Can I add or remove members midway through the process?

Yes. You can issue commands to the Team Lead at any time:

```
Add a new member and let it handle XXX.
```

```
Let Teammate 3 leave the team after finishing the current task.
```

### Q7: Can Agent Teams be used together with MCP and Skills?

Absolutely. In fact, they work even better together:

- **Agent Teams + Skills**: each member can carry different skills
- **Agent Teams + MCP**: different members can access external resources through different MCP servers

```
Create a team:
- Teammate A: carries the frontend-design Skill and is responsible for UI
- Teammate B: accesses the repository through GitHub MCP and handles PR management
- Teammate C: queries data through Database MCP and handles analysis
```

---

## References

### Official resources

- [Official Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code) - Complete Claude Code documentation
- [Anthropic engineering blog](https://www.anthropic.com/engineering) - Official technical blog and updates

### Agent Teams tutorial collection

**Complete guides in Chinese**:

- [Claude Code Agent Teams complete guide: from introduction to hands-on practice](https://m.blog.csdn.net/u010634066/article/details/157903022) - Includes configuration details, hands-on examples, and the striking case where 16 parallel agents built a C compiler
- [Collaborative development with Claude Code Agent Team: a complete hands-on guide](https://m.blog.csdn.net/u010028049/article/details/158126612) - Full collaborative project workflow
- [Step-by-step guide to setting up and using Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - Tencent Cloud tutorial with detailed setup instructions

**Getting started in practice**:

- [Hands-on with native Claude Code Agent Teams: from enabling it to running a three-person team](https://www.cnblogs.com/147api/p/19606317) - Three-person team walkthrough
- [Fresh beginner practice with Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - Beginner-friendly introduction with best practices such as contract-first
- [No more going solo: let 7 Claudes help you develop at the same time with Agent Teams](https://m.toutiao.com/a7605229732241736202/) - Case study of a 7-person team

**Best practices**:

- [Agent Teams best practices: contract-first, task granularity, and model assignment](https://blog.csdn.net/sinat_37574187/article/details/144727588) - Detailed explanation of 7 best practices
- [A seven-year big-tech veteran's Claude Code field manual: eight rules from beginner to expert](https://new.qq.com/rain/a/20260111A02HE900) - Enterprise-level real-world experience

**Principles and comparisons**:

- [Claude Code Agent Teams: the right way to do multi-agent collaboration](https://post.m.smzdm.com/p/adoezrmz/) - Deep analysis of multi-agent collaboration
- [Claude Code multi-agent team development: the complete guide from principles to pitfalls](https://m.toutiao.com/a7605229732241736202/) - Principles and pitfalls from real usage

### Official guide translations

- [Claude officially released the "Agent Building Guide" (with PDF download)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - Official Agent Building Guide
- [Full translated version of Claude's official "Guide to Building Effective Agents"](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - Full Chinese translation

### Related technologies

- [Agent Skills standard](https://agentskills.io/) - The Skills ecosystem
- [skills.sh - Agent Skills app store](https://skills.sh/) - 70,000+ skill library
