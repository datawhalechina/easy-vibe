# Claude Code Quickstart Core Guide

Claude Code is Anthropic's official AI-native coding tool. It integrates large-language-model capability directly into the terminal, so you can complete programming tasks by collaborating with AI in natural language. Unlike traditional code-completion tools, Claude Code can understand the context of an entire project and execute complex development tasks. From code generation to refactoring, from debugging to documentation writing, it can handle all of them.

This chapter helps you quickly master the core usage of Claude Code, including installation and setup, basic operations, practical techniques, and commonly used commands. Whether this is your first time using an AI coding tool, or you want to use Claude Code more efficiently, you will find what you need here.

---

## Quick Installation

Claude Code is built on Node.js, so before installation make sure Node.js 18 or above is installed on your system. The process is very simple and usually takes only a few minutes.

### Why You Need Claude Code

In traditional development workflows, developers frequently switch between editor, terminal, browser, and docs. Claude Code unifies these workflows into one interface: in the same terminal window, you can write code, run tests, read docs, and even collaborate with teammates. More importantly, it can understand your project structure and remember your coding habits, becoming a true programming assistant.

### Method 1: Manual Installation

Manual installation is suitable for developers who like full control over each step, and it also helps you clearly understand tool components.

```bash
# Install Claude Code CLI globally
# Use -g to install command globally, so it can be used in any directory
npm install -g @anthropic-ai/claude-code

# Verify installation
# If version is shown (for example 0.1.25), installation succeeded
claude --version
```

During installation, npm automatically downloads dependencies and configures environment variables. If you run into permission problems, try `sudo` (macOS/Linux) or run terminal as administrator (Windows).

### Method 2: Let an AI Agent Install It for You

If you are already using other AI coding assistants (such as Cursor, Windsurf, or the AI Agent in this project), you can let them complete installation for you. The benefit is that AI can detect your environment automatically, handle dependency conflicts, and choose the best installation route for your system.

**You can just say:**

```text
Help me install Anthropic Claude Code.
```

Or more specifically:

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

An AI Agent will:
1. Check current Node.js version
2. Prompt you to upgrade if requirements are not met
3. Run installation commands
4. Verify installation result
5. Try automatic fixes if there are issues

### First Launch and Initialization

After installation, enter your project directory and start Claude Code:

```bash
# Enter project directory (Claude Code works in current directory)
cd /path/to/your/project

# Start Claude Code
claude
```

At first launch, Claude Code guides you through several important setup steps:

1. **Sign in to Anthropic account**: you need an Anthropic account to use Claude Code. If you do not have one, you will be prompted to register.
2. **Choose a plan**:
   - **Free plan**: suitable for personal learning and light usage, with call limits
   - **Pro plan**: suitable for professional developers, with higher quota and priority response
3. **Accept terms**: read and accept Anthropic terms and privacy policy
4. **Optional: configure API key**: if you have a custom key (for example from a third-party provider), configure it here

::: info Special Note for Users in Mainland China

Due to network reasons, users in mainland China may not be able to directly access Anthropic official services. Claude Code supports third-party services compatible with Anthropic API format, and this is technically feasible.

**You have two options:**

1. **Use API token directly**: buy a token from a provider compatible with Anthropic API and configure it with environment variables
2. **Use a Coding Plan**: some providers offer coding-optimized plans that are usually more cost-effective for coding scenarios

**Recommended approach**: let an AI Agent help you configure. You only need to provide provider config information (API endpoint, key, etc.), and AI can set environment variables correctly.

**See detailed setup guide:** [How to install claudecode and configure environment variables](/en/stage-2/backend/2.6-modern-cli/)

:::

---

## Quick Start: Run a Few Small Experiments

After installation, do not rush into formal projects. Run a few small experiments first to understand how Claude Code works. These three experiments are designed from easy to advanced, corresponding to three core abilities: natural-language understanding, content generation, and code execution.

### Experiment 1: Conversation - Feel AI Understanding

The purpose is to experience Claude Code's natural-language understanding. Unlike normal search engines, Claude Code can understand context, carry multi-turn conversation, and adjust answers from your feedback.

**Try these prompts:**

```text
Hello, who are you?
```

Claude introduces itself as Claude Code, an AI coding assistant by Anthropic.

```text
What is a closure? Give me the too-long-didnt-read version.
```

Observe how Claude uses "too-long-didnt-read" as a hint and gives concise but accurate explanation.

```text
What is the difference between JavaScript and TypeScript?
```

This is a technical comparison question. Check whether Claude provides a structured and in-depth answer.

**Experiment point**: note Claude's response style. It usually gives the core conclusion first, then details. This "inverted pyramid" style is excellent for fast information retrieval.

### Experiment 2: Generate a Markdown Document - Experience Content Creation

This experiment demonstrates Claude Code's content-generation capability. For developers, writing docs is often painful. Claude can quickly generate clear and complete docs from requirements.

**Enter this instruction:**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**What Claude does:**

1. Analyze your requirement: common Git commands, Markdown format, and three elements (command/explanation/example)
2. Plan document structure: usually grouped by usage scenario (init, daily dev, branch workflow, remote collaboration, etc.)
3. Generate content: concise explanation and practical examples for each command
4. Format output: use Markdown syntax and proper structure

**Expected output sample**:

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**Advanced attempts**: you can add extra requirements like "add Chinese comments", "sort by frequency", "include common error handling", etc., and observe how Claude adapts output.

### Experiment 3: Write and Run a Game - End-to-End Coding Workflow

This is the most challenging experiment. It demonstrates Claude Code's full workflow: understand requirement, write code, create files, run program, and handle errors. Through it, you can really feel the power of an AI coding assistant.

**Enter this instruction:**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**Claude executes these steps:**

**Step 1: Check environment**
- Check whether Python is installed
- Check whether pygame is available
- Prompt installation if missing

**Step 2: Write code**
- Create game entry file (for example `snake_game.py`)
- Implement movement, food generation, collision detection
- Add score rendering
- Implement ESC exit

**Step 3: Run game**
- Execute Python script and launch game
- Game window pops up, use arrow keys to control snake

**Step 4: Follow-up support**
- If there is a bug, you can directly say "snake can pass through walls, fix it"
- If you want more features, such as "increase difficulty with score", Claude can keep modifying

**Value of this experiment:**

1. **Verify setup**: confirm Claude Code can execute code correctly
2. **Experience interaction**: feel collaborative development with AI
3. **Build confidence**: see AI complete an end-to-end runnable program

**Common questions:**

- **Q: What if pygame is not installed?**
  - A: Claude detects it and suggests `pip install pygame`, or you can ask Claude to install it

- **Q: Terminal is occupied after game starts, what should I do?**
  - A: Press ESC to quit game, or keep using Claude Code in another terminal window

- **Q: Can I switch language?**
  - A: Absolutely. Try "write in JavaScript", "write with HTML5 Canvas", etc.

---

## Core Techniques

Master these techniques and your Claude Code efficiency can improve by multiple times. They come from real development practice and cover high-frequency scenarios.

### Technique 1: Double-press Esc to Roll Back Conversation - Undo Misoperations

This is the most common and important shortcut in Claude Code. During collaboration, you may mistype, give wrong instruction, or dislike an answer. Double-pressing Esc gives you quick "time rewind."

**Shortcut details:**

```text
Press Esc once     -> clear current input (similar to Ctrl+C)
Press Esc twice    -> roll back to previous conversation state (undo previous turn)
Press Esc three times -> clear all conversation history (start over)
```

**Use cases:**

- **Case A**: you accidentally sent wrong instruction and Claude started executing. Quickly press Esc twice to return before execution.
- **Case B**: Claude response is not what you wanted, and you want to rephrase. Double Esc to undo and ask again.
- **Case C**: conversation has many rounds and context is messy. Triple Esc to clear and restart.

**Important note**: double Esc rolls back **conversation state**, not code changes. If Claude already edited files, those edits are not auto-reverted. You must manually restore via Git.

**Recommendation**: before potentially large code edits, save current state (`git commit` or `git stash`) so recovery is easy.

### Technique 2: Use @ to Reference Files - Precise Context Control

Although Claude Code can read project files automatically, explicitly referencing files makes intent clearer and avoids wasting tokens on unrelated files.

**Basic usage:**

Instead of vague:

```text
Explain src/utils.ts
```

Use explicit reference:

```text
@src/utils.ts Explain this file
```

**Advanced usage:**

**Compare multiple files:**
```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**Reference directory:**
```text
@src/components/ Summarize all components under this directory
```

**Reference specific lines (with editor):**
```text
@src/utils.ts:45-60 Explain what this code does
```

**Usage tips:**

1. **Tab completion**: type `@` then press Tab, Claude shows file list under current directory and you can choose with arrows
2. **Relative paths**: support references like `@./config.json` or `@../shared/types.ts`
3. **Fuzzy matching**: partial file names are allowed, e.g. `@utils` can match `src/utils.ts` or `src/utils/index.ts`

### Technique 3: Use ! to Execute Commands - Terminal Integration

Claude Code has built-in command execution. You can run commands without switching to another terminal.

**Basic usage:**

```text
!npm test           # run tests
!git status         # check Git status
!ls -la             # list files
```

**Practical scenarios:**

**Scenario: run tests and analyze failure**
```text
!npm test
# after failure
Analyze test failure reasons and fix code
```

**Scenario: inspect Git diff**
```text
!git diff
# ask Claude to explain changes
Summarize key changes in this diff
```

**Scenario: build project**
```text
!npm run build
# if build fails
Build failed, help me fix it
```

**Safety note:**

For sensitive commands (for example `rm -rf`, `sudo`), Claude Code asks for confirmation. This is a protection mechanism. Confirm carefully.

### Technique 4: /plan Before Coding - Correct Way to Handle Complex Tasks

For complex tasks, directly coding is often inefficient. `/plan` enters planning mode: define implementation plan first, then execute step by step.

**Usage:**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**What Claude does:**

1. **Analyze requirement**
2. **Evaluate current project and stack**
3. **Create step-by-step plan**
4. **Discuss and adjust with your feedback**

**Sample output:**

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

**Best practice:**

- For tasks over 30 minutes, use `/plan` first
- Execute phase by phase and verify each phase
- If requirement changes, rerun `/plan` to adjust

### Technique 5: /init Auto-generates Configuration - Fast Project Initialization

`/init` is one of Claude Code's most powerful commands. It scans your project automatically, identifies stack and structure, and generates a complete `CLAUDE.md`.

**Usage:**

```text
/init
```

**Claude performs:**

1. **Scan project structure**: identify framework/language/build tools
2. **Analyze config files**: read package.json, tsconfig.json, etc.
3. **Infer style**: naming conventions and file organization
4. **Generate CLAUDE.md**

**Generated CLAUDE.md example:**

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

**Why this matters:**

`CLAUDE.md` is Claude Code's "project memory." On every launch, Claude reads this file and understands project background. That means:

- you do not need to repeatedly explain framework and stack
- Claude follows your conventions and best practices
- new team members can onboard faster

**Recommendation**: after project initialization, run `/init` immediately, then refine generated config to match reality.

### Technique 6: /compact Compresses Context - Save Tokens

Claude Code context window is limited (often around 200K tokens). Long conversations consume many tokens, increase cost, and may push important early info out of context.

**Usage:**

```text
/compact
```

**How it works:**

`/compact` analyzes chat history, extracts key information (decisions made, code generated, confirmed requirements), and creates a concise summary. Later dialogue is based on this summary rather than full history.

**When to use:**

- after 5-6 rounds
- when Claude seems to "forget" previous context
- when switching to a new subtask but keeping key background

**Recommendation:**

```text
# compress after long conversation
/compact

# keep working
Now that user module is done, let's build order module.
```

### Technique 7: Use Claude Code to Assist Git Commits

In Claude Code, recommended commit workflow is: let Claude inspect diff and draft commit message, then you run standard Git commands. This is clear and gives you one more review checkpoint before commit.

Official references:

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**Recommended workflow:**

```bash
# 1. Check current changes
/diff
!git status

# 2. Ask Claude to summarize and generate commit message
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. After you confirm, run standard Git commit
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**Benefits of this approach:**

1. **Aligned with current official capability**: no dependency on removed built-ins
2. **Transparent**: review diff and commit message before submit
3. **Portable**: same workflow works in other AI IDEs or pure Git

**If you want "one-command commit" experience:**

Claude Code now recommends plugin-based extension. For example, `commit-commands` provides commands like `/commit-commands:commit`.

```bash
# 1. Add plugin marketplace example
/plugin marketplace add anthropics/claude-code

# 2. Install commit workflow plugin
/plugin install commit-commands@anthropics-claude-code

# 3. Reload plugins
/reload-plugins

# 4. Use plugin command to commit
/commit-commands:commit
```

**Additional notes:**

- `/commit-commands:commit` is provided by plugin, not current default built-in command
- if you only need to inspect changes before commit, prefer `/diff` or ask Claude to explain `git diff`
- official `/review` has also been marked deprecated; for similar capability, use plugin or natural-language review flow

### Technique 8: Shift+Tab Auto-Accept - Improve Fluency

By default, Claude asks confirmation before editing code. This is useful when learning, but may feel slow later. `Shift+Tab` enables auto-accept mode for faster iteration.

**Usage:**

- press `Shift+Tab` -> enter auto-accept mode
- press `Shift+Tab` again -> exit auto-accept mode

**Mode comparison:**

| Mode | Behavior | Use scenario |
|------|------|----------|
| Default mode | Ask confirmation for every edit | Learning stage, important code |
| Auto-accept | Apply edits directly | After familiarization, rapid iteration |

**Notes:**

- In auto-accept mode, Claude edits files directly with no second confirmation
- Recommended to pair with Git so rollback is easy
- For sensitive operations (delete files, modify key configs), Claude still asks

### Technique 9: Ctrl+C Cancel Operation - Emergency Brake

When Claude is running a long task, or you realize you gave a wrong instruction, `Ctrl+C` is the emergency brake.

**Usage:**

- press `Ctrl+C` once -> cancel currently running operation
- press `Ctrl+C` twice -> fully exit Claude Code

**Use cases:**

- long-running command needs interruption
- Claude is generating large irrelevant code
- wrong instruction detected and you want immediate stop

**Difference from double Esc:**

- `Ctrl+C`: stop ongoing **operation** (running command / generating code)
- `double Esc`: roll back **conversation state** (undo previous turn)

### Technique 10: /context Check Context Usage - Optimize Token Cost

`/context` displays current session context usage, helping you understand token consumption and optimize cost.

**Usage:**

```text
/context
```

**Sample output:**

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

**How to use this information:**

1. **Identify large files**: if one file consumes a lot of tokens, check if it is really needed
2. **Optimize .claudeignore**: ignore unrelated files (node_modules, build output, etc.)
3. **Decide when to compact**: when usage exceeds 70%, consider `/compact`

### Technique 11: /resume Restore Session - Switch Multi-task Conversations

When handling multiple tasks, you may run multiple conversation threads. `/resume` lets you switch back to previous session context in the current chat, without restarting.

**Usage:**

```text
/resume
```

**How it works:**

Claude Code records previous sessions automatically. When you run `/resume`, it switches to previous session context and keeps all prior discussion content and state.

**Use cases:**

**Case A: parallel multi-tasking**
```text
# Task 1: fix bug
claude> Fix login-page validation issue
# ... one conversation ...

# Task 2: add feature (new thread)
claude> Add user registration feature
# ... another conversation ...

# Switch back to task 1
claude> /resume
# Continue previous bug-fix work
```

**Case B: temporary lookup then return**
```text
claude> Explain this algorithm
# ... discuss algorithm ...

claude> /resume
# Return to previous coding work
```

**Case C: resume after interruption**
```text
claude> Continue previous work
# If you interrupted before, /resume brings you back
```

**Comparison with related commands:**

| Command | Function | Scenario |
|------|------|----------|
| `/resume` | Switch back to previous session in current chat | Multi-task switching |
| `claude -c` | Continue most recent session | Reconnect after exit |
| `claude -r` | Restore previous session | Recover prior state after exit |
| `double Esc` | Roll back one turn | Undo most recent conversation turn |

**Suggestions:**

1. **Multi-task management**: `/resume` is more efficient than re-explaining context
2. **Session memory**: each session has independent context; `/resume` preserves it
3. **Use with /compact**: in long sessions, compact first, then resume switch to keep context clean

---

## Core Configuration

Reasonable configuration helps Claude Code better fit your project and team. This section explains configuration role, priority, and optimization for different usage scenarios.

### Configuration File Locations and Priority

Claude Code uses layered configuration strategy. Different levels have different scope and priority. Understanding this lets you manage settings flexibly.

**Configuration priority (high to low):**

| Location | Scope | Purpose | Commit to Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | local project | personal preferences | ❌ no |
| `.claude/settings.json` | project shared | team-wide configuration | ✅ yes |
| `~/.claude/settings.json` | global | personal defaults | ❌ no |

**Merge rules:**

- Higher-priority config overrides same key in lower priority
- Non-conflicting keys are merged
- Project config overrides global config
- Local personal config overrides shared project config

**Practical scenarios:**

**Scenario 1: team project**
```text
~/.claude/settings.json          # your personal default editor settings
.claude/settings.json            # team coding standards and permission config
.claude/settings.local.json      # your debug preferences and theme settings
```

**Scenario 2: personal project**
```text
~/.claude/settings.json          # global default config
.claude/settings.json            # project-specific config (e.g. special permission rules)
```

### CLAUDE.md - Project Memory

`CLAUDE.md` is the most important file for Claude Code configuration. It acts like a project "manual." Every time Claude Code starts, it reads `CLAUDE.md` under current directory, understanding background, stack, and conventions.

**Why CLAUDE.md is so important:**

Imagine joining a new project: you need to learn stack, coding conventions, and common commands. Normally this takes hours of docs/code review and teammate questions. With `CLAUDE.md`, Claude knows this at startup and you can immediately collaborate effectively.

**Minimum viable template:**

```text
# [Project Name]

## Tech Stack
- Framework: React 18 + TypeScript
- State: Zustand
- Styling: Tailwind CSS
- Build tool: Vite

## Common Commands

\`\`\`bash
npm run dev      # start development server (port 5173)
npm run test     # run unit tests
npm run build    # production build
npm run lint     # lint checks
\`\`\`

## Code Conventions
- Components use function components + Hooks
- Naming: PascalCase (components), camelCase (utility funcs)
- Git commits use Conventional Commits
- All API calls must go through unified request wrapper
```

**Full template (recommended):**

```text
# [Project Name]

## Project Overview
One-sentence description of main functionality and target users.

## Tech Stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend (if applicable)
- Runtime: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Project Structure

\`\`\`
src/
├── components/      # reusable components
├── pages/           # page components
├── hooks/           # custom Hooks
├── lib/             # utility functions
├── types/           # TypeScript types
└── api/             # API calls
\`\`\`

## Common Commands

\`\`\`bash
# development
npm run dev              # start dev server
npm run dev:mock         # use mock data in development

# testing
npm run test             # run all tests
npm run test:watch       # watch mode
npm run test:coverage    # generate coverage report

# code quality
npm run lint             # ESLint check
npm run lint:fix         # auto-fix ESLint issues
npm run format           # Prettier format
npm run typecheck        # TypeScript type check

# build
npm run build            # production build
npm run preview          # preview production build
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

**Fast generation of CLAUDE.md:**

If your project exists but has no `CLAUDE.md`, run `/init`:

```bash
claude
# inside Claude Code
/init
```

Claude analyzes project structure, package.json, and current code, then generates a practical `CLAUDE.md`. After generation, manually review and adjust.

### .claudeignore - Save Tokens

`.claudeignore` tells Claude Code which files should not be read into context. Correct configuration can significantly reduce token usage (often 40-60%) and improve response speed.

**Why .claudeignore is needed:**

When Claude Code tries to understand project, it reads related files. Some files do not help understanding and can:
- consume many tokens (for example type definition files in node_modules)
- introduce noise (logs, build outputs)
- include sensitive info (.env files)

**Recommended config:**

```text
# ===== dependencies =====
# huge third-party code, usually unnecessary for Claude context
node_modules/
.pnp/
.pnp.js

# ===== build outputs =====
# generated artifacts, not source logic
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== logs =====
# runtime logs, no value for understanding architecture
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== testing outputs =====
coverage/
.nyc_output/

# ===== editor / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== system files =====
.DS_Store
Thumbs.db

# ===== env files =====
.env
.env.local
.env.*.local

# ===== large binary assets =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== lock files (optional) =====
# If you do not need Claude to analyze dependency versions, ignore these
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Config tips:**

1. **Start minimal**: ignore node_modules and build outputs first, then observe token usage
2. **Tune per project**: image-heavy project -> ignore image formats; docs project -> keep Markdown
3. **Optimize regularly**: use `/context` to see top token-consuming files and decide whether to ignore

### Permission Configuration

By default, Claude Code asks confirmation before sensitive operations. Through `permissions` in `settings.json`, you can control which actions are auto-allowed, require confirmation, or fully denied.

**Permission config structure:**

```json
{
  "permissions": {
    "allow": [
      // auto-allow without asking
    ],
    "ask": [
      // ask before execution
    ],
    "deny": [
      // fully deny
    ]
  }
}
```

**Rule syntax:**

Permission rules use `ActionType(pattern)` format:

| Action type | Description | Example |
|----------|------|------|
| `Bash` | run terminal command | `Bash(git status)` |
| `Edit` | edit file | `Edit(src/**/*.ts)` |
| `Read` | read file | `Read(README.md)` |
| `Write` | create file | `Write(src/components/*.tsx)` |

**Wildcard support:**

- `*` matches arbitrary characters (excluding `/`)
- `**` matches arbitrary paths
- `?` matches one character

**Real config example:**

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

**Configuration suggestions:**

1. **Development stage**: relatively relaxed permissions for faster iteration
2. **Production stage**: stricter permissions, especially deployment and sensitive data operations
3. **Team collaboration**: place baseline rules in shared `settings.json`, personal tweaks in `settings.local.json`

### Rules Directory

For large projects, a single `CLAUDE.md` can become bloated and hard to maintain. Claude Code supports modular management through **Rules directory**, splitting conventions by topic into separate files.

**Directory structure:**

```text
.claude/
├── settings.json          # main config file
├── CLAUDE.md              # project overview (still needed)
└── rules/                 # rules directory
    ├── 00-security.md     # security rules (global)
    ├── 01-coding-style.md # coding style rules (global)
    ├── 10-api.md          # API dev rules
    ├── 11-frontend.md     # frontend dev rules
    ├── 12-backend.md      # backend dev rules
    └── 20-testing.md      # testing rules
```

**Filename suggestion:**

Use numeric prefixes (`00-`, `01-`) to control load order: base rules first, specific rules later.

**Rule file format:**

Rule files support YAML frontmatter to define applicability:

```markdown
---
# Optional: paths where this rule applies
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Optional: commands where this rule applies
commands:
  - "generate api"
  - "create endpoint"

# Optional: rule priority (smaller number = higher priority)
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

**Rule inheritance and override:**

- Global rules (no frontmatter or `globs: *`) apply to all files
- Path-specific rules apply only to matched files
- If rules conflict, higher-priority rule wins
- Specific rules can override global rules

**Usage scenario examples:**

**Scenario 1: frontend-backend separated project**
```text
.claude/rules/
├── 00-general.md          # general standards (commit message, naming)
├── 10-backend.md          # backend standards (NestJS-specific)
├── 11-frontend.md         # frontend standards (React-specific)
└── 20-database.md         # database standards (Prisma-specific)
```

**Scenario 2: microservice architecture**
```text
.claude/rules/
├── 00-global/             # global rules
│   ├── security.md
│   └── logging.md
├── 10-services/           # service-specific rules
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # shared component rules
    ├── shared-lib.md
    └── common-utils.md
```

**Migration recommendation:**

If you already have a very large `CLAUDE.md`, migrate to Rules directory like this:

1. Create `.claude/rules/`
2. Split `CLAUDE.md` by topic
3. Add suitable frontmatter per rule file
4. Keep `CLAUDE.md` as project overview and move detailed standards out
5. Test and ensure rule loading works correctly

---

## Core Operation Commands

Claude Code provides a rich set of operational commands for efficient AI collaboration. These commands fall into categories: Slash commands (built-in features), symbol system (short operations), and natural-language instructions (daily development).

### Slash Command Quick Reference

Slash commands are built-in operations that start with `/`. They provide standardized actions such as project initialization, config management, and status checks.

| Command | Function | Use scenario |
|------|------|----------|
| `/help` | Show all commands | quick lookup when you forget commands |
| `/init` | Initialize project and generate CLAUDE.md | new project or adding config |
| `/plan` | Enter planning mode | create plan before complex tasks |
| `/clear` | Clear conversation history | restart when context is messy |
| `/compact` | Compress context | save tokens after long chat |
| `/diff` | Open interactive diff view | inspect current uncommitted changes |
| `/plugin` | Manage plugins | install commit/review extensions |
| `/context` | Show context usage | optimize token cost |
| `/cost` | Show session cost | monitor usage cost |
| `/config` | Open config panel | update settings |
| `/permissions` | Permission management | adjust operation permissions |
| `/model` | Switch model | choose different models |

**Command-combination example:**

```bash
# complete development workflow
/plan                    # 1. create plan
# ... execute development ...
/diff                    # 2. inspect changes
Generate a commit message from current diff
!git add -A              # 3. stage changes
!git commit -m "..."     # 4. commit
/cost                    # 5. check cost
```

### Symbol System

Symbol system is Claude Code's shorthand operation mechanism. Special symbols quickly trigger specific capabilities.

| Symbol | Name | Purpose | Example |
|------|------|------|------|
| `/` | Slash command | execute built-in operation | `/help`, `/plan` |
| `@` | At reference | reference file/directory | `@src/app.tsx` |
| `!` | Bang mode | run terminal command | `!npm test` |
| `&` | Background run | run task in background | `&npm run dev` |

**Symbol combination tips:**

```bash
# combine symbols
@src/utils.ts !npm test
# meaning: read utils.ts, then run tests

@src/components/ @src/pages/ compare structures of these two directories
# meaning: reference two directories simultaneously for comparison

!git diff @src/app.tsx explain these changes
# meaning: inspect Git diff and ask Claude to explain specific file changes
```

### File Operations

File operations are the most common daily actions: read, edit, create, and delete files.

**Read files:**

```bash
# basic read
@src/app.tsx explain this file

# read + analyze
@src/utils/helpers.ts find potential performance issues

# compare read
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**Edit files:**

```bash
# simple edit
Modify formatDate in src/utils/date.ts to support Chinese locale format

# complex edit
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# batch edit
Convert all class components under src/components/ into function components
```

**Create files:**

```bash
# create one file
Create src/components/UserCard.tsx, a card component to display user info

# create related files
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**Delete files:**

```bash
# delete with confirmation
Delete src/old-component.tsx (this component is no longer used)

# Claude asks for confirmation and may suggest checking references first
```

### Git Operations

Claude Code deeply integrates with Git so you can complete full version-control workflow without leaving terminal.

**Check status:**

```bash
# show Git status
Show git status and uncommitted changes

# detailed diff
!git diff
Explain changes in src/api/users.ts
```

**Create commits:**

```bash
# inspect changes
/diff

# generate commit message
Generate a Conventional Commit message from current git diff

# commit manually
!git add -A
!git commit -m "..."
```

**Branch operations:**

```bash
# create feature branch
!git checkout -b feature/user-authentication

# after implementation
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Complete Git workflow example:**

```bash
# 1. start new feature
!git checkout -b feature/payment-integration

# 2. develop feature (with Claude assistance)
Create payment module with Alipay and WeChat Pay

# 3. run tests
!npm test

# 4. inspect changes
/diff

# 5. generate and confirm commit message
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. push remote
!git push -u origin feature/payment-integration

# 7. create PR (optional, with GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### Code Operations

Code operations are Claude Code's core strengths: generation, explanation, refactoring, and optimization.

**Generate code:**

```bash
# generate component
Create a React Hook to manage auth state, including login/logout/permission checks

# generate utility function
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# generate complete module
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**Explain code:**

```bash
# line-by-line explanation
Explain src/algorithms/quicksort.ts line by line

# high-level explanation
@src/services/payment.ts explain architecture design of this module

# explain complex logic
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**Refactor code:**

```bash
# architecture refactor
Convert class components in src/components/ to function components

# performance refactor
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# cleanup refactor
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**Debug code:**

```bash
# error analysis
npm test failed, analyze root cause and fix it

# performance analysis
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# log analysis
!cat logs/error.log
Analyze these error logs and identify root cause
```

### Test Operations

Testing is essential for quality assurance. Claude Code can help generate tests, run tests, and analyze results.

**Generate tests:**

```bash
# unit tests
Generate unit tests for src/utils/math.ts, including boundary cases

# component tests
Generate React Testing Library tests for src/components/UserForm.tsx

# integration tests
Create integration test for user registration flow from form submission to DB write
```

**Run and debug tests:**

```bash
# run tests
!npm test

# debug failed tests
Analyze failure reasons and fix
@tests/auth.test.ts

# coverage check
!npm run test:coverage
Which code paths are not covered?
```

**Testing strategy suggestion:**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### Command Chaining and Workflow Composition

The most efficient way to use Claude Code is chaining commands into complete workflows.

**Scenario 1: bug-fix workflow**

```bash
# 1. inspect issue
!npm test
Tests failed, analyze why

# 2. locate issue
@src/utils/validation.ts Is the issue in this file?

# 3. fix issue
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. verify fix
!npm test

# 5. commit fix
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**Scenario 2: code review workflow**

```bash
# 1. inspect changes
!git diff --stat
Which files changed?

# 2. detailed review
@src/components/ Review these component changes

# 3. suggest improvements
What improvements should be made based on this review?

# 4. implement improvements
Optimize performance of UserList component

# 5. final review
/diff
Review current changes and point out potential risks and improvements
```

**Scenario 3: new feature workflow**

```bash
# 1. plan first
/plan
I want to add shopping cart feature

# 2. create branch
!git checkout -b feature/shopping-cart

# 3. implement feature
Implement step by step according to plan

# 4. add tests
Generate tests for shopping cart module

# 5. run tests
!npm test

# 6. code review
/diff
Please do a code review on current diff

# 7. commit
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Frequently Asked Questions

While using Claude Code, you may encounter various issues. This section summarizes common problems and solutions.

### Token Usage Is Too Fast?

Fast token consumption is one of the most common issues. Below is a complete optimization strategy.

**Diagnosis:**

First run `/context` to inspect current token usage:

```text
/context
```

Focus on:
- **Token usage rate**: if over 70%, consider context compression
- **Number of referenced files**: more files means higher token consumption
- **Large files**: check which files consume most tokens

**Optimization strategy:**

**1. Improve .claudeignore**

Make sure `.claudeignore` includes unnecessary files:

```text
# must ignore
node_modules/
dist/
build/
*.log
.env

# project-specific
# React
.next/
out/

# Vue
.nuxt/
.output/

# generic
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Compress context regularly**

Long conversations accumulate many tokens. It is recommended to run `/compact` every 5-6 rounds:

```text
# after long conversation
/compact

# continue
Now let's implement order module...
```

**3. Reference files precisely**

Avoid referencing entire directory if not needed:

```bash
# not recommended
@src/ Explain this code

# recommended
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. Avoid reading huge files**

If `/context` shows one file consuming many tokens, consider:
- do you really need it?
- can you reference only a section?
- can this file be split into smaller modules?

### Claude Does Not Understand the Project?

If Claude answers inaccurately or repeatedly asks basic project info, it lacks project context.

**Solutions:**

**1. Generate CLAUDE.md**

Run `/init` to generate project config:

```bash
/init
```

After generation, validate:
- is project summary accurate?
- is stack complete?
- are common commands correct?
- are coding conventions clear?

**2. Manually edit CLAUDE.md**

If auto-generated config is not detailed enough, add:

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

**3. Use Rules directory**

For large projects, organize conventions in Rules:

```text
.claude/rules/
├── 00-architecture.md    # architecture overview
├── 01-coding-style.md    # coding style
├── 10-frontend.md        # frontend rules
├── 11-backend.md         # backend rules
└── 20-testing.md         # testing rules
```

**4. Add context in prompt when needed**

For specific tasks, append relevant background:

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### How to Roll Back Operations?

Claude Code provides multiple rollback mechanisms for different scenarios.

**Scenario 1: rollback conversation state**

If you only mistyped or dislike response:

```text
Double Esc  -> rollback previous turn
Triple Esc  -> clear all conversation history
```

**Note**: this only rolls back conversation state, not file edits.

**Scenario 2: undo file edits**

If Claude already modified files, undo manually:

```bash
# check changes
!git status
!git diff

# revert one file
git checkout -- src/utils/helpers.ts

# revert all working tree changes
git checkout -- .

# if already committed
# soft rollback (keep changes)
git reset --soft HEAD~1

# hard rollback (discard changes)
git reset --hard HEAD~1
```

**Scenario 3: preventively use Git workflow**

Best practice: save current work before Claude session:

```bash
# save current state before starting
git add .
git commit -m "WIP: before Claude Code session"
# or use stash
git stash push -m "before claude"

# develop with Claude Code...

# if result is unsatisfactory, full rollback
git reset --hard HEAD~1
# or
git stash pop
```

### Too Many Permission Prompts?

Frequent permission confirmations hurt efficiency. Proper permission config can make workflow smoother.

**Permission model:**

Claude Code permissions are three levels:
- **allow**: auto-allow
- **ask**: ask before execution
- **deny**: fully deny

**Optimization config:**

Edit `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // Git read operations
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // test and checks
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // dev server
      "Bash(npm run dev:*)",

      // source edits
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git write operations
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // package management
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // build and deployment
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // config file edits
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // sensitive file reads
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // dangerous commands
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // system files
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git internals
      "Edit(.git/*)"
    ]
  }
}
```

**Progressive permission strategy:**

- **Learning phase**: keep defaults and understand what Claude tries to execute
- **Familiar phase**: add common safe operations (like git status, npm test) into allow
- **High-efficiency phase**: create fine-grained rules based on project characteristics

### How to Use in Mainland China?

Due to network constraints, users in China may not directly access Anthropic official services. Here are several options.

**Option 1: use API proxy service**

Many cloud providers offer Anthropic-compatible API proxy service:

```bash
# set env vars
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# start Claude Code
claude
```

**Option 2: use third-party Claude Code compatible tools**

Some domestic providers offer compatible tooling:

```bash
# install compatible version
npm install -g @some-provider/claude-code

# configure API key
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**Option 3: use other AI coding tools**

If Claude Code is unavailable, consider alternatives:

| Tool | 특징 | Use scenario |
|------|------|----------|
| Cursor | VS Code-based, full-featured | full IDE experience |
| GitHub Copilot | strong autocomplete | primarily code completion |
| Tongyi Lingma | domestic product, stable in China | domestic development environment |
| Codeium | generous free quota | budget-limited |

**Option 4: let AI Agent help configure**

If you are unsure how to configure, ask AI Agent:

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**Common questions:**

- **Q: still cannot connect after configuration?**
  - A: check API endpoint correctness, including `/v1` path
  - A: check API key validity and balance
  - A: check whether local network needs proxy

- **Q: response is slow?**
  - A: choose provider with closer geographic region
  - A: use coding-optimized plan instead of generic API plan
  - A: use `/compact` to reduce token usage

- **Q: some features are unavailable?**
  - A: some third-party providers may not fully support all Claude Code features
  - A: check provider docs for supported feature scope

---

## Reference Resources

- [Claude Code Official Docs](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
