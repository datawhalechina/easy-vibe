# Claude Code Superpowers for Engineering-Grade Development

## Introduction to Superpowers

**Superpowers** is an open-source agent skills framework created by Jesse Vincent (online handle: obra), specifically designed to solve a core problem in AI programming: how to make AI produce "engineering-grade" code instead of "toy-grade" code.

Imagine a normal AI coding assistant as a "smart intern." It can write runnable code, but it may have no tests, no documentation, and no best-practice discipline. Superpowers is like assigning a "senior engineer mentor" to that intern, forcing it to follow a complete software development process.

### Why Do We Need Superpowers?

Before Superpowers, there were several issues when using Claude Code:

- **Chaos in vibe coding**: AI starts coding directly without planning, causing frequent rework
- **Lack of TDD discipline**: AI tends to write code first and add tests later, or skip tests entirely
- **Coding with vague requirements**: user says "build a login feature," AI starts immediately, and the result is not what was wanted
- **Unstable code quality**: no code-review mechanism, so quality depends on AI "mood"

Superpowers solves these issues and turns Claude into a "disciplined development team." It helps clarify requirements first, then creates a plan, then develops with TDD, and finally ensures quality through code review.

---

## Quick Start

### Step 1: Install Superpowers

Run in Claude Code:

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install superpowers
/plugin install superpowers@superpowers-marketplace
```

Or clone manually:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Step 2: Try Your First Skill

Let's use Superpowers' **brainstorming** skill to experience its value.

In Claude Code, type:

```text
Build me a user login feature
```

**Before Superpowers**: Claude starts writing code directly and may produce something you do not really want.

**With Superpowers**: Claude uses Socratic questions to help clarify requirements:

> Is this login feature for a Web app or a mobile app?
>
> Which login methods are required? Email/password? Third-party login (Google, GitHub)?
>
> Do you need a "remember me" feature?
>
> Should password reset be via email or SMS?
>
> ...

These questions force you to clarify what you actually need before coding, preventing a lot of unused code.

### Step 3: Understand Skill Trigger Mechanisms

Superpowers is not a "magic switch." It is a **set of skills**. Understanding how skills are triggered is important.

**Three trigger methods:**

1. **Keyword trigger**
   - When you mention "TDD," "test-driven development," or "write tests first"
   - The `test-driven-development` skill is activated

2. **Scenario trigger**
   - When requirements are unclear, `brainstorming` asks proactive questions
   - When bugs appear, `systematic-debugging` is activated

3. **Manual invocation**
   - Use skill names directly, such as: `/test-driven-development`

#### 💡 Important Clarification: What Happens If You Do Not Specify TDD?

This is a common misunderstanding. Let's clarify:

```text
# Case A: TDD not mentioned
"Implement a calculator"
-> Claude may write tests, or may not
-> Depends on the model's own habits

# Case B: TDD explicitly requested
"Implement a calculator with TDD"
-> test-driven-development skill is activated
-> RED-GREEN-REFACTOR is enforced
```

**The real value of Superpowers**: not creating abilities from nothing, but strengthening discipline.

- Without the TDD skill: Claude writing tests is "maybe"
- With the TDD skill: Claude is forced to follow TDD flow

### Understanding the Value of Superpowers

From the explanation above, the core value of Superpowers is clear:

1. **Requirements first**: `brainstorming` asks actively when requirements are vague
2. **Process discipline**: `test-driven-development` enforces the TDD red-green-refactor cycle
3. **Task decomposition**: `writing-plans` breaks large projects into small tasks
4. **Quality control**: `code-review` skills ensure code quality

---

## Superpowers Core Skills in Detail

Superpowers includes **20+ composable skills** covering the full software lifecycle. Let's go through them by category.

### 🧪 Testing Skills

#### test-driven-development

**How to trigger**: mention keywords like "TDD," "test-driven development," or "write tests first."

**What this skill does**: forces Claude to follow the TDD red-green-refactor cycle instead of "maybe writing tests later."

**Traditional approach** (common problems):
1. Write code directly
2. Do a quick manual test
3. Find bugs and patch code
4. Repeat... (tests? maybe next time)

**TDD approach** (after skill activation):
1. 🔴 **RED**: write a failing test first
2. 🟢 **GREEN**: write the minimal code to pass the test
3. 🔵 **REFACTOR**: refactor while keeping tests passing
4. Repeat

**Example usage**:

```text
Implement a user authentication module using TDD
```

Claude will:
1. Write tests first (username/password validation, token generation, etc.)
2. Run tests and confirm all fail (RED)
3. Write minimal implementation code
4. Run tests and confirm pass (GREEN)
5. Refactor code and extract shared logic
6. Run tests again and confirm pass (REFACTOR)

> **Note**: if you do not mention "TDD," Claude may or may not write tests. The skill's role is to **enforce process discipline** so tests are not "forgotten."

### 🐛 Debugging Skills

#### systematic-debugging

When bugs appear, human developers often try random fixes. Superpowers enforces four-stage root-cause analysis:

**Stage 1: Reproduce the issue**
- Confirm the bug can be reproduced consistently
- Record exact reproduction steps

**Stage 2: Isolate root cause**
- Narrow the scope using binary search style reduction
- Add logs to locate problematic code

**Stage 3: Validate hypotheses**
- Propose root-cause hypotheses
- Design validation experiments

**Stage 4: Fix and verify**
- Implement the fix
- Confirm the bug is resolved
- Add regression tests

#### verification-before-completion

This skill prevents Claude from stopping when things only "seem close enough." Before claiming completion, it requires Claude to:

1. Run all tests
2. Manually test key features
3. Check code quality (lint)
4. Confirm documentation is updated

### 🤝 Collaboration Skills

#### brainstorming

This is one of the most interesting Superpowers skills. It uses Socratic questioning to clarify requirements.

**How it works**: when you provide a vague requirement, Claude does not start coding directly. It asks questions:

```text
You: Build a blog system

Claude:
- Who is this blog for? Technical readers or general readers?
- Should Markdown editing be supported?
- Do you need comments?
- Do you need search?
- Single-user or multi-author?
- ...
```

These questions force you to think about what functionality is truly needed, avoiding lots of unused features.

#### writing-plans

This skill decomposes large tasks into small tasks that can each be completed in 2-5 minutes.

**Example**:

```text
Use writing-plans to plan development of a todo API
```

Claude will generate a detailed plan:

```markdown
# Implementation Plan

## Task 1: Design database schema (estimated 5 minutes)
- Create todos table
- Define fields: id, title, completed, createdAt

## Task 2: Create Express routes (estimated 10 minutes)
- POST /todos - create task
- GET /todos - list tasks
- GET /todos/:id - get one task
- PUT /todos/:id - update
- DELETE /todos/:id - delete

## Task 3: Add input validation (estimated 10 minutes)
- title cannot be empty
- completed must be boolean

## Task 4: Write tests (estimated 15 minutes)
- Write tests for each endpoint
- Cover edge cases

## Task 5: Start server and verify (estimated 5 minutes)
- Run tests
- Manually test API

Acceptance criteria:
- All tests pass
- curl test passes for every endpoint
```

#### executing-plans

This skill executes a plan in batches and pauses at each checkpoint for confirmation.

**Usage example**:

```text
Execute the plan above, and pause after each completed task
```

Claude will:
1. Finish task 1, then pause: `✅ Database schema done. Continue?`
2. After your confirmation, finish task 2 and pause again
3. And so on

This lets you verify direction at every stage, avoiding late discovery that things drifted off track.

#### dispatching-parallel-agents

This skill can launch multiple sub-agents in parallel.

**Use case**: when you need to process multiple independent tasks simultaneously.

```text
Use parallel agents to complete:
- Agent A: write backend APIs
- Agent B: write frontend components
- Agent C: write tests
```

Each agent works in its own isolated environment without interference.

#### subagent-driven-development

This skill launches an independent sub-agent for each small task.

**Advantages**:
- Each sub-agent has an isolated context
- Failure of one task does not affect others
- Multiple tasks can run in parallel

#### using-git-worktrees

This skill uses Git worktree to create isolated development environments.

**Benefits**:
- Multiple features can be developed in parallel
- Each worktree is independent
- No mutual conflicts

### 👀 Code Review Skills

#### requesting-code-review

After code is completed, this skill automatically requests code review.

```text
Automatically trigger code review after finishing the feature
```

#### receiving-code-review

This skill defines how to receive and process review feedback.

**Review workflow**:
1. Submit code
2. Trigger review automatically
3. Reviewer checks code quality, security, and test coverage
4. Reviewer provides improvement suggestions
5. Fix issues
6. Re-review until approval

---

## Full Superpowers Workflow

The real power of Superpowers comes from combining multiple skills into a full development workflow.

### Standard Development Workflow

```text
1. Brainstorming
   ↓ Clarify real requirements through Q&A

2. Design Document
   ↓ Present design in chunks and wait for confirmation

3. Writing Plans
   ↓ Break down into 2-5 minute tasks

4. Subagent Development
   ↓ Launch isolated sub-agent per task
   ↓ Two-stage review: spec conformance + code quality

5. TDD
   ↓ Enforce RED-GREEN-REFACTOR

6. Code Review
   ↓ Quality gate

7. Done
```

### Practical Example: Build a User Authentication System with Superpowers

Let's experience the Superpowers workflow through a complete example.

#### Step 1: Clarify Requirements with Brainstorming

```text
I need a user authentication system
```

Claude will ask:
- Is it a Web app or mobile app?
- Which login methods are required?
- Is password reset needed?
- Is "remember me" needed?
- ...

#### Step 2: Generate a Design Document

After requirements are confirmed, Claude will produce a design document:

```markdown
# User Authentication System Design

## Functional Requirements
1. User registration (email + password)
2. User login
3. Password reset (email)
4. Remember me (JWT + Refresh Token)

## Technology Choices
- Backend: Node.js + Express
- Database: SQLite
- Auth: JWT
- Encryption: bcrypt

## API Design
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Step 3: Write the Implementation Plan

```text
Use writing-plans to create the implementation plan
```

Claude will generate a detailed task list, each task completable in 2-5 minutes.

#### Step 4: Execute Development

```text
Execute the plan above with TDD
```

Claude will:
1. Write tests first
2. Confirm tests fail (RED)
3. Write implementation code
4. Confirm tests pass (GREEN)
5. Refactor code (REFACTOR)

#### Step 5: Code Review

After completion, code review is triggered automatically to check:
- code quality
- security (SQL injection, XSS, etc.)
- test coverage
- documentation completeness

---

## Superpowers vs Direct Claude Code Use

| Dimension | Direct Claude Code Use | Using Superpowers |
|------|---------------------|-----------------|
| **Requirement clarification** | AI starts coding directly | Socratic questions clarify requirements first |
| **Development process** | Free-form depending on AI | TDD red-green-refactor enforced |
| **Task management** | One-shot completion | Broken into small tasks with checkpoints |
| **Code quality** | Depends on AI judgment | Code review enforced |
| **Predictability** | Unstable outcomes | Repeatable process |
| **Best for** | Simple tasks, prototype validation | Complex projects, production code |

### Visual Metaphor

If Claude Code is a "smart intern":

- **Direct use**: tell the intern "build a login feature," and they start coding right away, possibly producing something you find off-target
- **With Superpowers**: assign the intern a senior mentor who clarifies requirements, creates plans, and checks code quality

---

## Installation and Configuration in Detail

### Method 1: Via Marketplace (Recommended)

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install
/plugin install superpowers@superpowers-marketplace

# Verify installation
/skills
```

### Method 2: Manual Clone

```bash
# Create directory
mkdir -p ~/.claude/skills

# Clone repository
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Method 3: Project-Level Installation

If you want to use Superpowers in a specific project:

```bash
# In project root
mkdir -p .claude/skills

# Clone or copy superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

This allows team members to share the same Superpowers configuration.

---

## Common Skills Quick Reference

| Skill Name | Function | Use Case |
|---------|------|---------|
| `brainstorming` | Clarify requirements through Socratic questioning | When requirements are unclear |
| `writing-plans` | Break tasks into small steps | Before starting large projects |
| `executing-plans` | Execute plan with checkpoints | During plan-driven development |
| `test-driven-development` | TDD red-green-refactor loop | For all feature development |
| `systematic-debugging` | Four-stage root-cause analysis | When bugs appear |
| `verification-before-completion` | Pre-completion verification | At task completion |
| `requesting-code-review` | Request code review | Before code submission |
| `subagent-driven-development` | Sub-agent-driven development | Parallel tasks |
| `using-git-worktrees` | Git worktree isolation | Parallel feature development |

---

## Best Practices

### 1. Use Clear Trigger Keywords

Superpowers skills are keyword-triggered. Learn common trigger words:

| Skill | Trigger Keywords |
|------|-----------|
| `test-driven-development` | "TDD", "test-driven", "write tests first" |
| `brainstorming` | Auto-triggered when requirements are unclear |
| `systematic-debugging` | "debug", "bug", "not working" |
| `writing-plans` | "make a plan", "planning" |

### 2. Use Superpowers When Process Discipline Is Needed

- Production-grade code development -> mention "TDD"
- Requirements are unclear -> let `brainstorming` clarify
- Complex project -> use `writing-plans` to decompose tasks

### 3. Do Not Force It for Simple Tasks

If it is a rapid prototype or one-off script, you do not need the full process. Superpowers is most suitable for code requiring long-term maintenance.

### 4. Skills Can Be Combined

```text
Implement user authentication with TDD, and after completion, help me do a code review
```

This triggers both `test-driven-development` and `code-review` skills.

---

## Frequently Asked Questions

### Q1: Do I have to specify "TDD" when using Superpowers?

**Not required**.

Superpowers is a skill set, and each skill has its own trigger conditions:
- Say "use TDD" -> triggers `test-driven-development`
- Do not say TDD -> Claude may write tests or not (depends on model behavior)

Superpowers exists to **enforce process discipline**, not to create capability from nothing.

### Q2: Does Superpowers make development slower?

At first, it may feel slower because:
- requirement clarification takes time
- tests are written before code
- code review is required

But in the long run, overall efficiency improves due to reduced rework and fewer bugs.

### Q3: Do small projects also need Superpowers?

For prototype validation or very simple tasks, you can use Claude Code directly. Superpowers is better suited for:
- production-grade projects
- multi-person collaboration
- long-term maintainability

### Q4: What is the difference between Superpowers and Skills?

| Dimension | Superpowers | Skills |
|------|-------------|--------|
| **Nature** | Complete development methodology framework | Reusable skill packages |
| **Scope** | Covers the full development process | Focuses on specific functions |
| **Relationship** | Superpowers uses Skills internally | Superpowers is a collection of Skills |

### Q5: Can I customize Superpowers skills?

Yes. Superpowers is open-source, and you can:
1. Fork the repository
2. Modify existing skills
3. Add new skills
4. Contribute back to the community

---

## References

### Official Resources

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - official repository (50,000+ ⭐)
- [Detailed Superpowers Usage Tutorial](https://www.cnblogs.com/gyc567/p/19510203) - detailed Chinese tutorial
- [Superpowers Environment Setup Guide](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - setup guide

### Community Resources

| Repository | Description |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | comprehensive toolkit including TDD workflows |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | official best practices |

### Related Articles

- [Goodbye Vibe Coding! Use Superpowers to Make Claude Code Write Engineering-Grade Code](https://juejin.cn/post/7593573617648123956)
- [How I Use Superpowers MCP to Force Claude Code to Plan Before Coding](https://juejin.cn/post/7570341520551673871)
- [Claude Code + Superpowers Beginner Tutorial](https://juejin.cn/post/7594832320030638123)

---

## Summary

Superpowers is a set of **engineering-grade development skills** that upgrades Claude Code from a "smart intern" to a "disciplined development team."

### Core Takeaways

1. **Superpowers is a skill set, not magic**
   - After installation, skills are available in the background
   - Triggered via keywords or scenarios
   - You can manually invoke specific skills

2. **Remember key trigger phrases**
   - Want TDD -> say "use TDD"
   - Vague requirements -> `brainstorming` asks proactively
   - Bug appears -> mention "debug" to trigger `systematic-debugging`

3. **Best-fit scenarios**
   - ✅ Production-grade code development
   - ✅ Long-term maintainable projects
   - ✅ Team collaboration projects
   - ❌ Rapid prototypes (optional)
   - ❌ One-off scripts (optional)

Remember: **Superpowers does not make AI smarter; it makes AI more disciplined.**
