# How to Make Claude Code Work for Long Durations

## Introduction

Traditional AI coding assistants are "conversational": you say one thing, it replies once, and then stops. But for real development tasks, this mode is far from enough.

Imagine these scenarios: you want Claude to refactor an entire project, but it edits a few files and says "done"; you want Claude to keep fixing bugs until all tests pass, but it runs once and stops; you want Claude to "work overnight," but next morning you find it stopped long ago.

In the summer of 2025, an Australian developer named Geoffrey Huntley (who is also a sheep farmer) wrote a 5-line bash script. The script was simple: continuously restart Claude Code and feed it the same task. He named it "Ralph Wiggum," after the Simpsons character who keeps trying and never gives up.

This simple script shocked Silicon Valley. In just two weeks, related projects got 7,000+ GitHub stars. People used it to generate 6 complete projects overnight, delivered $50,000 contract work with only $297 API cost, and even used it to build a complete programming language in 3 months.

The core question this chapter solves is: how to make Claude Code work continuously like a real developer until tasks are truly complete.

---

## Core Principle: Why Does AI "Stop Too Early"?

Before discussing specific methods, first understand the root cause.

### AI's completion judgment is unreliable

LLMs have a fundamental weakness: they cannot reliably judge whether work is truly complete.

Human completion criteria are objective: all tests pass, features are complete, and code quality meets standards. But AI can only judge by "feeling." It may stop because "this looks about right," or because "output seems enough," or because it does not know what to do next.

That is why we need an external system to determine real completion rather than relying on AI's internal sense.

### The core idea of the solution

The core solution is to keep AI working inside a "loop."

Whenever it tries to exit, the external system checks three questions: is it truly complete? does it meet objective criteria? is anything missing? If not, inject the task again and continue another round.

This idea can be implemented in many forms, from simple bash scripts to complex orchestration systems, but the essence is the same.

---

## Method 1: While True Bash Loop (Most Primitive Method)

This is the simplest and most direct implementation. Essentially, write an infinite loop that restarts Claude Code each round and feeds the same task description.

The simplest implementation is only 5 lines:

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### How it works

The script flow is straightforward. Step 1 reads the task description from `PROMPT.md`. Step 2 launches Claude Code and passes the task description in. Step 3 Claude works and outputs results. Step 4 Claude exits after finishing. Step 5 the loop automatically restarts and returns to step 1, creating an infinite cycle unless you interrupt manually with `Ctrl+C`.

### Pros and cons

The advantage is extreme simplicity: anyone can understand it, no configuration needed, immediately usable, and good for quick experiments.

But the disadvantages are obvious: it cannot judge real completion, it may spin forever, it has no safety guardrails, and it can waste API calls.

### Real usage example

First, create a `PROMPT.md` file to describe your task. For example, refactoring a user auth module:

```markdown
# Task: Refactor user authentication module

Requirements:
1. Extract all authentication logic into an independent AuthService class
2. Add unit tests, coverage > 80%
3. Update related documentation

When all tests pass and docs are updated, output: task complete
```

Then create and run the loop script:

```bash
chmod +x loop.sh
./loop.sh
```

### Safer improved version

To avoid endless loops, add an iteration cap:

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== Iteration $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "Reached maximum iterations, stopping"
        break
    fi

    sleep 5  # small delay to avoid API rate limits
done
```

This improved version adds a max-iteration limit, shows per-round progress, and stops automatically at the limit. It also adds a 5-second delay each loop to avoid rate limiting.

---

## Method 2: Ralph Wiggum Plugin (Official Recommendation)

Ralph Wiggum is an official Anthropic plugin built specifically for long-running tasks. It is named after the Simpsons character, representing the spirit of "keep trying despite failure."

### Core mechanism: Stop Hook

The core of Ralph is Stop Hook. When Claude wants to exit, Stop Hook intercepts the exit signal. Then the system checks: did output include the specific completion marker? If no marker is found, it reinjects the original prompt and starts another iteration. Only when the completion marker is detected is Claude allowed to exit.

This guarantees Claude does not stop just because it "feels close enough." It must complete clearly marked requirements.

### Installation

Ralph Wiggum is an official Claude Code plugin and can be installed in two ways.

**Option 1: install from official plugin marketplace (recommended)**

```bash
# run in Claude Code
claude

# add official plugin marketplace
/plugin marketplace add anthropics/claude-code

# install Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# verify installation
/plugin
```

**Option 2: install directly from GitHub**

```bash
# enter plugin directory
cd ~/.claude/plugins/

# clone plugin repo
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

After installation, you can use:

- `/ralph-wiggum:ralph-loop` - start loop
- `/ralph-wiggum:cancel-ralph` - cancel loop
- `/ralph-wiggum:help` - show help

### Basic usage

Use `/ralph-wiggum:ralph-loop`:

```bash
/ralph-wiggum:ralph-loop "Build a todo API with CRUD operations, input validation, and tests.
             Output <promise>COMPLETE</promise> when everything is done." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### Parameter explanation

The two most important parameters are `--max-iterations` and `--completion-promise`.

`--max-iterations` sets the hard safety cap. Recommended values are typically 20-100. Even if unfinished, Ralph stops at this limit to prevent infinite API spending.

`--completion-promise` specifies the completion marker text, which must be explicit and unique. Ralph treats the task as complete only when Claude output contains that marker. Use clear markers such as `COMPLETE` or `TASK_DONE`, and avoid ambiguous words.

### Prompt best practices

Writing good prompts is key to Ralph success.

Bad prompts usually do not define completion criteria. For example, "write a todo API" may lead AI to output a rough skeleton and stop, with no tests, no verification, and no docs.

Good prompts should include phased requirements and clear acceptance criteria. For example:

Describe phased tasks first. Phase 1 is core functionality with all CRUD endpoints: POST `/todos` create, GET `/todos` list, GET `/todos/:id` fetch single, PUT `/todos/:id` update, DELETE `/todos/:id` delete. Phase 2 is input validation: title cannot be empty, completion status must be boolean. Phase 3 is tests: write tests for each endpoint, with coverage > 80%.

Then define acceptance criteria: all tests pass, code passes linter, README includes API docs.

Finally define a unique completion marker: `<promise>TODO_API_COMPLETE</promise>`.

This way Claude knows exactly what to do and when completion is truly achieved.

### More prompt templates

Here are common task templates you can use directly or adapt.

**Template 1: test migration (Jest -> Vitest)**

```text
/ralph-wiggum:ralph-loop "
Migrate all tests in this project from Jest to Vitest:
- Keep all test logic unchanged
- Update config files (vite.config.js, vitest.config.js)
- Replace Jest-specific APIs (e.g., jest.mock -> vi.mock)
- Ensure all tests pass
- Remove Jest-related dependencies

Acceptance criteria:
- npm test passes fully
- no Jest dependency in package.json
- project builds successfully

Output after completion: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**Template 2: UI/UX optimization (mobile-first)**

```text
/ralph-wiggum:ralph-loop "
Polish this project's UI/UX into a refined mobile-first language learning app:
- unify spacing and whitespace (use 4px base unit)
- establish clear type hierarchy (title/body/auxiliary text)
- unify styles for cards, lists, and shared components
- add bottom navigation (Home/Learn/Quiz/Progress/Settings)
- ensure mobile rendering quality

Acceptance criteria:
- npm run build succeeds
- no TypeScript errors
- key pages preview correctly on mobile

Output after completion: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**Template 3: bulk TypeScript annotation**

```text
/ralph-wiggum:ralph-loop "
Add TypeScript type annotations to all functions in the project:
- prioritize src/ directory
- add types for function params and return values
- avoid any, use concrete types or unknown
- add necessary type definitions

Acceptance criteria:
- npm run typecheck passes
- no @ts-ignore or @ts-any comments
- code runs correctly

Output after completion: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**Template 4: TDD-driven feature development**

```text
/ralph-wiggum:ralph-loop "
Implement checkout functionality using TDD:
1. Write tests first (checkout.test.ts)
2. Run tests (should fail)
3. Write minimal code to pass tests
4. Refactor and optimize
5. Repeat until all tests pass

Feature requirements:
- shopping cart item list
- shipping fee calculation
- coupon application
- payment form validation

Acceptance criteria:
- all tests pass (npm test checkout.test.ts)
- code coverage > 80%
- no ESLint errors

Output after completion: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**Template 5: code style unification**

```text
/ralph-wiggum:ralph-loop "
Unify code style across the project:
- format all files with Prettier
- unify naming conventions (variables camelCase, components PascalCase)
- remove unused imports and variables
- unify string quotes (single quotes)
- unify semicolon style (no semicolons)

Acceptance criteria:
- npm run lint passes
- consistent code style
- build succeeds

Output after completion: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### Real-world cases

One famous case happened at a Y Combinator hackathon, where a team used Ralph Loop. At 11 PM, they set a task: implement MVPs for 6 product specs in sequence and emit specific completion markers for each one. They set max iterations to 200 and went to sleep.

The next morning, they had 6 demo-ready projects, and API cost was only $297. That is Ralph's power: while you sleep, AI keeps working.

Another case came from Boris Cherny (Claude Code lead). With Ralph plus Opus 4.5, he delivered 259 PRs in 30 days, including 497 commits, adding 40,000 lines and deleting 38,000 lines. Most strikingly, all of it was produced by Claude Code without manually writing code.

An even wilder case is the CURSED programming language. Ralph creator Geoffrey Huntley used Ralph Loop over 3 months to autonomously build a full programming language. Its keywords use Gen Z slang (such as `slay`, `sus`, `based`), and more importantly it includes a full LLVM compiler implementation, standard library, and partial editor support. This demonstrates Ralph Loop's true potential: if you provide a clear target, it can keep working for months until a complex project is truly finished.

### More real-world cases

**Automated project refactor**

One developer used Ralph to refactor a legacy project with messy code, no tests, and missing documentation. The assigned tasks were:

1. Add tests for existing code
2. Refactor step by step, ensuring tests pass after each change
3. Update documentation

Ralph ran over a full weekend. By Monday, there were 47 commits, cleaner code structure, 75% test coverage, and complete API docs. Cost was around $12.

### Ralph philosophy

Ralph reflects three core philosophies.

The first is iteration over perfection. Do not expect perfection in one pass; use loops to improve. The first pass may only build a skeleton, second fixes bugs, third optimizes, fourth adds tests; every round gets better.

The second is failure as data. Every test failure is an opportunity to improve; do not fear failure, learn from it.

The third is persistent trying: keep trying until it works. That is Ralph spirit.

### When Ralph is suitable or unsuitable

Knowing where Ralph fits helps save both time and cost.

**Suitable scenarios for Ralph**

These tasks have clear completion criteria and are good for automatic iteration:

| Scenario | Why |
|------|------|
| Test migration | Clear target framework, validated by passing tests |
| Large refactors | Specific refactor rules can be defined |
| Framework migration | Successful migration is verifiable by working code |
| Bulk type annotation | Done when typecheck passes |
| Test coverage improvement | Coverage percentage is objective |
| Documentation generation | API docs can be automatically validated |
| UI/UX unification | Concrete design rules can be defined |
| Bug fixes with repro | Pass condition is testable |

**Unsuitable scenarios for Ralph**

These tasks require human judgment or exploration:

| Scenario | Why |
|------|------|
| Architecture decisions | e.g., microservices vs monolith requires trade-off judgment |
| Security-sensitive code | Vulnerabilities can be subtle and hard to detect automatically |
| Ambiguous requirements | No clear completion criteria |
| Exploratory work | Direction changes continuously |
| Creative design | Requires human aesthetic judgment |
| Simple one-off tasks | Using Ralph is overkill |

**Decision checklist**

Ask yourself three questions:
1. **Can I define explicit completion criteria?** If not, not suitable
2. **Is there an objective validation method?** (tests/build/typecheck) If not, not suitable
3. **Does this task require continuous human feedback?** If yes, not suitable

If all three answers are "no," let Ralph run.

---

## Method 3: Enhanced Ralph

This is a community-enhanced implementation of official Ralph. The [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) project adds stronger safety mechanisms.

### Additional features

Enhanced Ralph adds several extra safety features.

First is dual exit conditions. Official Ralph checks only the completion marker, but the enhanced version requires both the completion marker and explicit `EXIT_SIGNAL` before stopping. This means even if Claude outputs completion marker, loop can continue for additional verification unless explicit exit appears.

Second is rate limiting. Default is 100 runs/hour, preventing runaway API bills if a bug causes endless loops. You can adjust this limit.

Third is a smart circuit breaker. If the system detects completion marker 5 consecutive times, it force-stops. This prevents rare edge cases where loops fail to terminate correctly.

Fourth is a real-time dashboard. Enhanced Ralph provides a command-line dashboard showing current iterations, task progress, and estimated cost.

### Installation

Install enhanced Ralph by cloning from GitHub:

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

The install script sets required files and configuration automatically.

### Usage

Enhanced Ralph usage has two steps. First initialize project with `ralph-setup`:

```bash
ralph-setup my-project
```

This creates required config files in project. Then start loop with `ralph loop`:

```bash
ralph loop
```

### Configuration file

Enhanced Ralph uses `.claude/ralph-config.json`:

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` is max loop count. `rateLimitPerHour` is hourly rate cap. `completionPromise` is completion marker text. `exitSignal` is explicit exit signal. `costAlertThresholds` defines budget warning levels.

---

## Method 4: Agent Teams (Parallel Multi-Agent)

When tasks are large enough, a single Claude is not enough; you need "team collaboration."

Agent Teams is an advanced capability that lets multiple Claude instances run in parallel and coordinate through shared task lists and dependencies. This is suitable for very large projects. In Nicholas Carlini's experiment, 16 parallel agents produced 100,000+ lines of code in two weeks and built a C compiler capable of compiling the Linux kernel.

Agent Teams is more complex, and we will cover it in detail in the next section: "3.3 Agent Teams Multi-Agent Collaboration."

---

## Method 5: Background Tasks (Ctrl+B)

This is a simple and practical non-blocking execution method.

### Basic operation

Usage is straightforward. When Claude starts a task, press `Ctrl+B` to push it to background.

For example, you say: "Run full test suite." Claude begins running. You press `Ctrl+B`, and Claude replies: "Task pushed to background (ID: task_abc123)." Then you can continue: "Meanwhile, analyze this log file." Claude can analyze logs while tests continue in background.

### Viewing background tasks

There are several ways to check background tasks. Use `/tasks` to list all tasks with task ID, state, and start time. Press `Ctrl+T` for quick status summary. You can also bring a task back to foreground to inspect live output.

### Suitable scenarios

Background tasks are good for typical situations:

First, long-running tests. Full suites may take tens of minutes, and background mode avoids blocking.

Second, large project builds. Build pipelines can run while you continue other work.

Third, batch file operations such as mass rename and formatting.

Fourth, anything you do not want to wait for synchronously.

---

## Safety Mechanisms: Preventing Infinite Loops

Any automated loop system must include protections, otherwise it may run out of control.

### Hard limits

The most basic protection is setting `--max-iterations` (maximum loop count). This is mandatory. Regardless of completion state, task stops at this cap and prevents unlimited API spending.

You can also enforce time limits, for example auto-stop after 4 hours. You can also set budget alerts that pause and notify at spend thresholds (for example 10 USD, 50 USD, 100 USD).

### Intelligent detection

You can add smart dead-loop detection. For example, check whether recent commits include meaningful changes:

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "No substantive changes in the last 5 commits, possible loop"
    exit 1
fi
```

If recent diffs are minimal, system may be stuck and should stop with alert.

### Cost alerts

Set cost alert thresholds in config:

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

When spending reaches 10, 50, or 100 USD, system pauses and notifies so you can decide whether to continue.

### Manual checkpoints

For important tasks, add manual checkpoints:

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "Completed $iteration iterations. Continue? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

This pauses every 10 iterations for confirmation, allowing timely human intervention.

---

## Practical Build: Complete BBS Forum with Ralph Loop

Let's use a full example to show Ralph Loop power. We will build a BBS-style forum system from scratch, including user auth, posting, profile center, and admin backend.

### Project objective

Build a fully functional BBS forum system with:

**User-side features:**
- user registration, login, logout
- browse post list (pagination)
- view post detail
- publish new posts
- comment feature
- profile center (view own posts, update profile)

**Admin backend features:**
- admin login
- user management (ban/unban)
- post management (delete/pin)
- comment management
- system statistics

**Tech stack:**
- backend: Node.js + Express + SQLite
- frontend: React + React Router + Axios
- auth: JWT token
- styling: Tailwind CSS

### Preparation

First install Ralph Wiggum plugin:

```bash
claude /plugins:add ralph-wiggum
```

### Start Ralph Loop

Now launch Ralph Loop to build the whole project:

```bash
/ralph-wiggum:ralph-loop "
Please build a complete BBS forum system from scratch using TDD.

Project structure requirements:
- backend/ directory: Express API server
- frontend/ directory: React frontend app
- both directories have their own tests

Backend requirements:
- use Express framework
- SQLite storage (better-sqlite3)
- JWT auth (jsonwebtoken + bcrypt)
- user table: id, username, password, email, role, createdAt
- post table: id, title, content, authorId, category, pinned, createdAt
- comment table: id, content, postId, authorId, createdAt

Backend API endpoints:
- POST /api/auth/register - user register
- POST /api/auth/login - user login
- GET /api/posts - get post list (pagination + category filter)
- GET /api/posts/:id - get post detail
- POST /api/posts - create post (auth required)
- PUT /api/posts/:id - edit post (author or admin)
- DELETE /api/posts/:id - delete post (author or admin)
- POST /api/posts/:id/comments - add comment (auth required)
- GET /api/user/profile - get profile (auth required)
- PUT /api/user/profile - update profile (auth required)
- GET /api/admin/stats - admin statistics (admin only)
- GET /api/admin/users - user list (admin only)
- PUT /api/admin/users/:id/ban - ban user (admin only)

Frontend page requirements:
- /login - login page
- /register - register page
- / - home page (post list)
- /post/:id - post detail
- /new - publish post
- /profile - profile center
- /admin - admin panel (admin permission required)

Admin panel features:
- user management (view, ban, unban)
- post management (view, delete, pin)
- comment management (view, delete)
- system statistics (user count, post count, comment count)

TDD requirements:
- write tests first, then implementation
- each feature must have corresponding tests
- backend uses Jest, API tests cover all endpoints
- frontend uses Vitest, component tests cover major features
- auth middleware must have tests

Acceptance criteria:
- npm test (backend) passes
- npm test (frontend) passes
- frontend starts and works correctly
- backend API responds correctly
- proper permission isolation between normal users and admin
- code passes ESLint checks

Output after completion: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### Expected time

Based on complexity:

**If coded manually**: about 40-60 hours (including schema design, auth system, frontend/backend integration, and testing)

**Using Ralph Loop**:
- base version (core features): around 3-5 hours
- full version (admin backend + tests): around 6-10 hours

### Monitoring progress

While Ralph Loop is running, you can monitor progress in several ways:

**Iteration count**: Ralph shows current and max iterations, which helps estimate remaining time.

**Logs**: you can see what Claude is doing now, such as designing schema, writing APIs, building components, and fixing bugs.

**Test status**: every test run result is shown. Passing tests increase and failing tests decrease. When failures begin to drop, project is approaching completion.

### Post-completion verification

After Ralph outputs completion marker, perform manual verification:

```bash
# backend tests
cd backend
npm test

# frontend tests
cd frontend
npm test

# start backend
cd backend
npm start

# start frontend (in another terminal)
cd frontend
npm run dev
```

Open browser and test:

1. register a new user
2. login
3. browse posts
4. publish new post
5. add comment
6. open profile center
7. logout and login as admin (default account: admin/admin123)
8. test admin backend features

### Notes

Ralph Loop is powerful, but keep these points in mind:

**First, more detailed prompts produce better results.** Ambiguous prompts require more iterations for correction.

**Second, set reasonable iteration caps.** BBS systems are complex; recommend at least 100 iterations.

**Third, TDD is recommended.** Writing tests first can significantly reduce debugging time.

**Fourth, final manual verification is required.** AI may miss edge cases or special scenarios, especially in security-sensitive paths.

**Fifth, pay close attention to schema design.** Ralph may need several iterations before landing on a robust schema.

---

## Method Comparison and Selection

Each method has its own characteristics and fits different scenarios.

While True Loop is the simplest: only 5 lines to run, good for quick experiments and prototypes. But it is limited and does not detect real completion, relying only on iteration caps.

Ralph Wiggum is the general recommendation for most scenarios. It has a complete Stop Hook mechanism, supports completion-marker checks, has official support, and solid docs.

Enhanced Ralph is better for production environments, with dual exit conditions, rate limits, and smart circuit breakers.

Background tasks are useful for simple non-blocking execution: just press `Ctrl+B`. But it is only background execution, not iterative loop orchestration.

---

## Summary

The core idea for making Claude Code work long-term is simple: do not ask it to "finish in one shot," ask it to "keep trying until true completion."

All methods are fundamentally doing the same thing: give Claude a task, let it run, check whether completion is real, and if not, continue the next round.

Which method to choose depends on your needs.

If you want simple and fast, use While True Loop. Five lines can run, but features are limited.

If you want general recommendation, use Ralph Wiggum. Official support, complete capability, suitable for most cases.

If this is production usage, use enhanced Ralph. It has extra safety mechanisms and is more reliable.

(For Agent Teams multi-agent collaboration, see the next section: "3.3 Agent Teams Multi-Agent Collaboration.")

Hopefully this chapter helps you use Claude Code more effectively so AI becomes a true productivity tool rather than only a chatbot.

---

## References

### Official Resources

- [Claude Code Official Docs](https://docs.anthropic.com/en/docs/claude-code) - complete official Claude Code documentation
- [Ralph Wiggum Plugin README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - official plugin documentation
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - official Hooks system docs

### Community Projects

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k stars) - enhanced Ralph implementation with additional safeguards
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - curated Ralph resources and examples
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - PRD generation + Ralph loop integration
- [snarktank/ralph](https://github.com/snarktank/ralph) - original Ralph implementation

### Articles and Tutorials

**English resources**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - original Ralph concept by creator
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - deep read of Anthropic engineering blog
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - full usage guide

**Chinese tutorials**

- [Beginner-Friendly Tutorial - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - detailed install and usage guide
- [Deep Analysis - Toutiao](https://m.toutiao.com/a7585579989207188006/) - mechanism and core principles
- [Full-Stack Plain-Language Guide](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - complete walkthrough from principles to practice
- [Beginner and Practical Guide - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - basics and practical examples
- [Ralph Loop Deep Dive - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - Stop Hook mechanism details
- [Claude Code Perpetual Engine - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - infinite-loop iteration plugin deep dive
- [Ralph Loop New User Starter - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - best practices and prompt summary

### Practical Case Studies

- [CURSED Programming Language](https://github.com/geoffreyhuntley/cursed) - complete programming language built with Ralph over 3 months
- [Boris Cherny's 30 Days](https://twitter.com/boriskirov/status/1756002385683786616) - 259 PRs case share
- [Y Combinator Hackathon](https://github.com/geoffreyhuntley/ralph) - 6-project overnight generation case
- [Geoffrey Huntley's Blog](https://ghuntley.com/) - creator's technical blog
