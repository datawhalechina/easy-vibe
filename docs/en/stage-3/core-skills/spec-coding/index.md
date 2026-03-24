# From Vibe Coding to Spec Coding: The Evolution of AI Programming

> "Code is a lossy projection of intent."
> Code is a lossy projection of intent.
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## The Core Idea of Spec Coding: Everything Is Markdown

Before going deeper into Spec Coding, first understand the underlying philosophy of Claude Code: **everything is Markdown**.

In Claude Code's design philosophy, process records, information transfer, and even conversations with the model can all be Markdown:

- **CLAUDE.md**: a Markdown document for project conventions
- **.claude/rules/**: a collection of layered Markdown rule files
- **specs/**: Markdown descriptions of feature requirements
- **Conversation history**: Claude Code's chat records are themselves in Markdown format
- **AGENTS.md**: Markdown instructions that define agent behavior

This is exactly the core of Spec Coding: **the specification itself is code**. When you write requirements, design decisions, and acceptance criteria in Markdown, you are already writing "code" - AI will read that Markdown and then generate the real implementation.

Josh Beckman's summary of Grove's talk captures it perfectly:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Software engineering (and lawmaking and legal review) is specification repair.

In Claude Code, this "specification repair" process is: **modify Markdown -> AI reads Markdown -> generate/modify code -> verify the result**. The entire workflow is Markdown-driven.

---

## 1. Sean Grove's "The New Code": A Talk That Changes How You Think

In 2025, OpenAI researcher **Sean Grove** gave a talk titled **"The New Code"** at AI Engineer World's Fair, and it shook the entire developer community. He proposed a disruptive idea: **for 70 years we have been writing code to solve problems, but code is only a lossy projection of intent - specifications are the real "new code."**

That talk gave rise to a new development paradigm: **Spec Coding** - making specification documents, rather than code, the core artifact of development, and letting AI generate code from the specification.

Starting from Grove's talk, this article will help you understand the core ideas of Spec Coding, review the limits of Vibe Coding, and show how to apply this methodology in real development with Claude Code.

::: info 📚 What you will learn

1. Understand the key ideas in Sean Grove's "The New Code" talk
2. Master the core concepts and methodology of Spec Coding
3. Recognize both the value and the ceiling of Vibe Coding
4. Learn how to practice a Spec Coding workflow in Claude Code
5. Master a gradual transition strategy from Vibe Coding to Spec Coding

:::

---

## 1. Sean Grove's "The New Code": A Talk That Changes How You Think

In 2025, OpenAI researcher Sean Grove gave a talk titled **"The New Code"** at AI Engineer World's Fair. This talk is widely seen as the intellectual starting point of the Spec Coding movement.

Grove previously founded OneGraph, a GraphQL developer tools company later acquired by Netlify, and now works on alignment reasoning at OpenAI - helping turn high-level intent into executable specifications and evaluation standards.

### 1.1 Core Argument: Code Is a Lossy Projection of Intent

The core concept of Grove's talk can be summarized in one sentence:

> **Code is a lossy projection of intent.**
> Code is a lossy projection of intent.

What does that mean? When you have an idea in your head and turn it into code, a huge amount of context gets lost along the way - **why** you chose this approach, **what trade-offs** you considered, and **which constraints** mattered. The final code only preserves "how to do it," while losing "why it should be done this way."

It is like compressing a book into a tweet - the information density drops sharply, and the original intent is heavily degraded.

### 1.2 The Essence of Programming Is Communication

Grove proposed a simple but profound idea:

> "If you can communicate effectively, you can program."
> If you can communicate effectively, you can program.

He argues that actual coding work only accounts for **10-20%** of development. The other 80% is **structured communication** around requirements and goals - understanding what users want, aligning with the team on solutions, defining acceptance criteria, and handling edge cases.

That means the core of programming ability is not mastery of syntax in a particular language, but the ability to **turn vague intent into precise descriptions**.

### 1.3 Whoever Writes the Spec Is the Programmer

This is Grove's most disruptive idea:

> "Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer."
> Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer.

As AI becomes increasingly good at turning specifications into code, the **real programming work** shifts from "writing code" to "writing specifications." Whoever can express intent most precisely becomes the most valuable "programmer."

### 1.4 Specifications Can Have a Code-Like Toolchain

Grove pointed out that specifications can have a complete toolchain just like code:

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **Composition**: specifications can be modular and composable, like code modules
- **Testing**: specifications can embed unit tests to verify that behavior matches expectations
- **Linting**: ambiguous language in specifications can be detected, just like a linter catches syntax issues
- **Consistency checks**: specifications across departments can be checked for consistency, similar to a type checker

### 1.5 OpenAI Model Spec: Living Proof

Grove used OpenAI's own **Model Spec** document as evidence.

When OpenAI discovered a sycophancy problem, they did not retrain the model. Instead, they **modified the specification document**. The change propagated automatically across the system, and the issue was corrected.

This proves a crucial point: **the specification itself can act like executable code**. Changing the specification is equivalent to changing behavior, without touching a single line of traditional code.

Josh Beckman's summary of Grove's talk captures it perfectly:

> "Software engineering (and lawmaking and legal review) is specification repair."
> Software engineering (and lawmaking and legal review) is specification repair.

---

## 2. Spec Coding: Specification as Code

### 2.1 What Is Spec Coding

Spec Coding, also called Spec-Driven Development (SDD), is a methodology that treats **specification documents as the core artifact of development**.

The core idea is: **write the specification clearly first, then let AI generate code from that specification. The specification is the source of truth, and code is only the implementation artifact derived from it.**

Robert C. Martin's classic statement from *Clean Code* becomes newly relevant in the AI era:

> "Specifying requirements so precisely that a machine can execute them is programming."
> Specifying requirements so precisely that a machine can execute them is programming.

### 2.2 Comparing Vibe Coding and Spec Coding

| Dimension | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **Approach** | Improvised prompts, iterative back-and-forth | Write a complete specification first, then generate code |
| **Best for** | Prototypes, hackathons, exploration | Production systems, team collaboration, enterprise work |
| **Code quality** | Fast but fragile | Structured, testable, auditable |
| **First-pass success rate** | Unstable | Targets 95%+ |
| **Reusability** | One-off prompts | Specifications can be reused across projects |
| **Security** | Easy to overlook things | Built in at the specification layer |
| **Documentation** | Missing or always lagging behind | The specification is the documentation and stays maintained |
| **Team collaboration** | Depends on personal prompting skill | Shared specifications, shared standards |

The two are not opposites. As Brad Jolicoeur points out:

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification.

### 2.3 The Three-Layer Specification Structure of Spec Coding

Engineers at Red Hat summarized a practical three-layer specification model:

**Layer 1: Functional Specification (What)**

Describe the expected result in natural language and answer "what should it do":

```markdown
## User Authentication Feature

### User Stories
- As a new user, I want to register with my email
- As a registered user, I want to log in with email and password
- As a user who forgot my password, I want to reset it by email

### Acceptance Criteria
- Validate email format and password strength during registration
- Lock the account for 15 minutes after 5 failed login attempts
- Password reset links are valid for 30 minutes
```

**Layer 2: Language-Agnostic Specification (How - Architecture Layer)**

Define data structures, architectural patterns, and security requirements:

```markdown
## Technical Design

### Data Model
- users table: id, email, password_hash, created_at, locked_until
- sessions table: id, user_id, token, expires_at

### API Design
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### Security Requirements
- Passwords use bcrypt with cost factor >= 12
- JWT expires in 15 minutes, refresh token in 7 days
- Enable rate limiting on all endpoints
```

**Layer 3: Language-Specific Specification (How - Implementation Layer)**

Version requirements, test framework, and documentation standards:

```markdown
## Implementation Constraints

### Tech Stack
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Code Conventions
- Use TypeScript strict mode
- Use a custom AppError class for error handling
- All API endpoints require JSDoc comments
```

---

## 3. Practicing Spec Coding in Claude Code

Once you understand the theory, the next question is how to apply it in Claude Code. Claude Code's design philosophy naturally fits Spec Coding - its `CLAUDE.md`, Rules directory, and `/plan` command are all forms of specification-driven development.

When OpenAI itself builds projects with Codex, it uses a similar pattern: using an `AGENTS.md` file as a specification to guide the AI agent. Their core lesson is this: **when the agent struggles, treat that as a signal - identify what is missing, whether it is tools, guardrails, or documentation, and then add it to the repository**. That aligns perfectly with Spec Coding: specifications are living artifacts and should keep evolving.

Research from Augment Code supports the same conclusion: **executable specifications stay accurate because AI agents generate code directly from them, creating a forcing function - outdated specifications produce broken implementations**. That means specifications do not rot the way traditional documentation does.

### 3.1 Step One: Use `CLAUDE.md` to Establish Project Specifications

`CLAUDE.md` is the "living specification" of your project. Every time Claude Code starts, it reads this file, which is equivalent to giving AI a persistent project handbook.

In the earlier chapter [Claude Code Quick Start Core Guide](../basics/), we already learned how to create `CLAUDE.md`. In the context of Spec Coding, its role becomes even more important - **it is not just a config file, but the entry point to the project specification**.

Engineers at LogRocket emphasize that **solid context is crucial for AI agents because it prevents hallucinations and inefficiency**. Without specifications, an AI agent may make large, uncontrolled changes to a project. `CLAUDE.md` is the first line of defense that provides that "solid context."

```markdown
# E-commerce Project Specification

## Project Positioning
A SaaS e-commerce platform for small and medium-sized merchants, supporting multiple stores and multiple payment channels.

## Architectural Decisions
- Frontend-backend separation with an API-first design
- Microservice backend architecture, with services communicating through a message queue
- Read-write database separation

## Core Constraints
- Store all monetary amounts as integers in cents to avoid floating-point precision issues
- The order state machine must strictly follow: pending payment -> paid -> shipped -> completed
- Payment-related endpoints must be idempotent
```

Aviator's team summarized the key information that specifications should capture - and that is exactly what your `CLAUDE.md` should cover:

- input and output formats and data types
- business rules and edge cases
- system dependencies and constraints
- performance and scalability requirements
- error handling and security requirements

### 3.2 Step Two: Use the Rules Directory to Manage Layered Specifications

As your project grows, a single `CLAUDE.md` will not be enough. At that point, use the `.claude/rules/` directory to organize layered specifications.

This is exactly what Augment Code calls the idea of "executable specifications": **specifications are not static documents, but living instructions consumed directly by AI agents**. When you split rules into the Rules directory, each rule file is loaded only when related files are being edited, which both saves tokens and preserves precision.

Engineers at Tessl found that breaking requirements into structured documents - with a PRD defining "what and why," and technical specifications defining "how" - helps prevent AI from accumulating confusion in long conversations and significantly improves output consistency.

```text
.claude/rules/
├── 00-architecture.md      # Architecture rules (global)
├── 01-security.md          # Security rules (global)
├── 10-api-design.md        # API design rules
├── 11-frontend-patterns.md # Frontend pattern rules
├── 12-database.md          # Database rules
└── 20-testing.md           # Testing rules
```

Each rule file can specify its scope through frontmatter:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API Design Rules

## Route Design
- RESTful style, use plural nouns: /api/v1/orders
- Nested resources can go at most two levels deep: /api/v1/users/123/orders

## Response Format
- Success: { data, pagination? }
- Error: { error: { code, message, details? } }

## Must Follow
- All write operations require authentication
- All list endpoints must support pagination
- Sensitive operations must write audit logs
```

That way, when Claude Code edits API-related files, it will automatically load this specification and make sure the generated code follows the standard.

### 3.3 Step Three: Use `/plan` to Implement Specify -> Plan -> Tasks -> Implement

The standard Spec Coding workflow is a four-stage loop. GitHub Spec Kit standardizes it as Specify -> Plan -> Tasks -> Implement, and Claude Code's `/plan` command naturally supports this flow.

The SpecThis team emphasized one key principle: **define boundaries before the agent runs - know what should change before any code changes happen**. That is exactly the value of `/plan`.

**Stage 1: Specify**

First write clearly what you want to build. Do not rush into code:

```text
/plan
I need to implement an order refund feature. The specification is:

Functional requirements:
- Users can request a full refund before shipment
- Within 7 days after shipment, users can request a return and refund
- Refunds require administrator approval

Acceptance criteria:
- The refund amount cannot exceed the amount actually paid for the order
- Refund state machine: requested -> approved -> refunding -> refunded
- Inventory is restored after the refund is completed
- Log every operation throughout the process
```

**Stage 2: Plan**

Claude will generate a technical plan based on your specification:

```text
📋 Refund Feature Implementation Plan

1. Data model design
   - Create a refunds table
   - Add refund-related states to the order state machine

2. API design
   - POST /api/orders/:id/refund - request a refund
   - PUT /api/refunds/:id/approve - approve a refund
   - GET /api/refunds - refund list

3. Business logic
   - Refund eligibility checks
   - Refund amount calculation
   - Inventory restoration logic

4. Integrations
   - Connect to the payment provider's refund API
   - Send refund notifications
```

**Stage 3: Tasks**

Break the plan into small tasks that can be executed independently, and give each task a clear completion standard.

**Stage 4: Implement**

Implement one task at a time, validating after each one is completed.

### 3.4 Real Example: Building a User Notification System with Spec Coding

Let's use a full example to compare Vibe Coding and Spec Coding. Data from Orchestrator.dev shows that in the 2025 Stack Overflow survey, 84% of developers use or plan to use AI tools, but only 22% are satisfied with the results, and 46% believe accuracy is a problem. Spec Coding is exactly the key to closing that satisfaction gap.

**Vibe Coding approach:**

```text
You: Build a notification feature
AI: [Immediately starts writing code and generates a simple notification list]

You: It should support read and unread
AI: [Modifies the code and adds a read field]

You: It also needs multiple notification types
AI: [Changes it again and adds a type field]

You: It should push notifications to phones too
AI: [Makes a big rewrite, and the previous structure no longer fits very well...]
```

Result: after four rounds of changes, the architecture has been overturned again and again, and the code gets messier over time.

**Spec Coding approach:**

First write a specification document `specs/notification.md`:

```markdown
# User Notification System Specification

## Functional Requirements
1. Support three channels: in-app notifications, email notifications, and push notifications
2. Notification types: system announcements, order status, promotional campaigns, security alerts
3. Users can configure notification preferences by channel and type
4. Support read/unread state and bulk mark-as-read

## Data Model
- notifications table: id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences table: user_id, type, channel, enabled

## API Design
- GET /api/notifications?type=&is_read= - get notification list (paginated)
- PUT /api/notifications/:id/read - mark as read
- PUT /api/notifications/read-all - mark all as read
- GET /api/notification-preferences - get preference settings
- PUT /api/notification-preferences - update preference settings

## Acceptance Criteria
- The unread notification count updates in real time
- The notification list supports infinite scrolling
- Push notification latency < 3 seconds
- Preference changes take effect immediately
```

Then in Claude Code:

```text
@specs/notification.md
Implement the user notification system according to this specification.
Start with the data model, then implement the API, and finally build the frontend components.
Pause after each module is complete, and I will confirm before you continue.
```

Result: it lands cleanly in one go, with a clear architecture and no need to repeatedly tear things down and rebuild them.

### 3.5 Strengthening Spec Coding with Superpowers

In the earlier chapter [Superpowers for Engineering-Grade Development](../superpowers/), we learned about the Superpowers skill system. Spec Coding and Superpowers are natural companions:

| Spec Coding Stage | Matching Superpowers Skill |
|------------------|---------------------|
| Define the specification | `brainstorming` - use Socratic questioning to clarify requirements |
| Technical planning | `writing-plans` - break the specification into small tasks |
| Incremental implementation | `test-driven-development` - TDD red-green-refactor |
| Quality verification | `code-review` + `verification-before-completion` |

**Example of combined usage:**

```text
@specs/notification.md
Implement the notification system according to this specification using TDD,
and help me review the code after it is done
```

This single instruction activates both the Spec Coding workflow and Superpowers skills like TDD and Code Review, forming a complete engineering-grade development process.

### 3.6 Version Control and Continuous Evolution of Specifications

The Vibe Coding Substack proposed an important viewpoint: **Specs are now code**. If specifications are code, then they should be managed like code:

- **Version control**: keep specification files in Git and commit them together with the code
- **Change tracking**: every change to the specification has a commit record so you know who changed what and why
- **Code review**: changes to specifications should also go through PR review so the team stays aligned
- **CI integration**: specification changes trigger automated tests to verify whether the implementation still conforms to the specification

In Claude Code, that means your `CLAUDE.md`, `.claude/rules/`, and `specs/` directory should all be version-controlled. Robomotion's experience is that **versioning specifications together with implementations prevents drift and keeps everything auditable**.

OpenAI's Harness Engineering practice also confirms this: their `AGENTS.md` file is itself written by Codex and is continuously updated as the project evolves. When the agent encounters difficulties, the fix is not to change the code directly, but to **have Codex update the specification itself** - forming a self-healing loop for specifications.

---

## 4. A Hybrid Strategy: Gradually Moving from Vibe to Spec

The industry consensus is not "abandon Vibe Coding," but rather **choose the right approach for the right scenario**.

### 4.1 When to Use Vibe Coding

- Validate whether an idea is feasible, with a prototype built within 30 minutes
- Explore unfamiliar technologies or frameworks
- Hackathons or internal demos
- One-off scripts or tools

### 4.2 When to Use Spec Coding

- Production feature development
- Multi-person collaborative projects
- Code that will need long-term maintenance
- Sensitive domains such as security, payments, or data
- API design and system integration

### 4.3 A Recommended Gradual Workflow

**Stage 1: Vibe Exploration**

Use Vibe Coding to validate the idea quickly. Do not write specifications yet, and do not worry about code quality:

```text
Build a simple notification popup so we can see how it feels
```

**Stage 2: Refine the Specification**

Once feasibility is confirmed, organize what you learned during exploration into a specification. You can even ask AI to help:

```text
Based on the notification feature prototype we just built,
help me organize a formal functional specification document,
including the data model, API design, and acceptance criteria
```

**Stage 3: Rebuild with Spec**

Based on that specification, re-implement the production-grade version using Spec Coding:

```text
@specs/notification.md
Implement this from scratch according to the specification, and do not refer to the previous prototype code
```

The advantage of this workflow is clear: **use the speed of Vibe Coding to validate direction, and the quality of Spec Coding to deliver the product**.

Robomotion summarized it well:

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional.

---

## 5. Frequently Asked Questions

### Q1: Doesn't Spec Coding feel too slow?

Writing specifications does require up-front investment. But Greg Ceccarelli's team used Spec Coding to deliver a complete macOS product with **three people in four weeks** - something that would be nearly impossible in traditional development.

The time spent writing specifications early will be recovered later through less rework, fewer bugs, and lower communication cost.

### Q2: How detailed should a specification be?

Robomotion's suggestion is: **a high-quality specification can be only one page**. What matters is whether it answers these eight questions:

1. What are we automating?
2. What is the input?
3. What is the output?
4. What are the constraints?
5. What are the failure modes?
6. What are the security requirements?
7. What are the performance requirements?
8. What tests prove that it works?

### Q3: What if AI only does exactly what the specification says and misses "obvious" features?

This really is one limitation of Spec Coding. Feedback from GitHub Spec Kit users is that AI will do **"exactly and only"** what is written in the specification.

The solution is to add a "non-functional requirements" section to the specification and list common expectations there, such as error handling, logging, and accessibility. Or set global rules in `CLAUDE.md`.

### Q4: Do small projects also need Spec Coding?

No. Spec Coding is best suited to:

- production-grade projects
- collaborative team projects
- projects that need long-term maintenance

For quick prototypes, one-off scripts, and learning experiments, Vibe Coding is more suitable.

### Q5: How do you get a team to accept Spec Coding?

Start with a small feature as a pilot. Let the team see how Spec Coding reduces rework and improves first-pass success. The Stack Overflow 2025 survey shows that 84% of developers use or plan to use AI tools, but only 22% are satisfied with the results - Spec Coding is exactly the key to improving that satisfaction.

---

## 6. Summary

Moving from Vibe Coding to Spec Coding is not a revolution. It is an evolution.

Sean Grove made it very clear in "The New Code": **for 70 years, we have been writing code to solve problems; now we should be writing specifications to generate code**. Code is a lossy projection of intent, while specifications can fully capture intent, context, and constraints.

For developers using Claude Code, this shift is already happening:

- the `CLAUDE.md` you write is your project specification
- the Rules directory you configure is your layered specification system
- the planning you do with `/plan` is the Specify -> Plan -> Tasks flow
- combining TDD and Code Review from Superpowers gives you a complete Spec Coding workflow

**Key takeaways:**

- Vibe Coding is suitable for exploration and prototypes, while Spec Coding is suitable for production and collaboration
- The specification is the source of truth, and code is an implementation artifact produced from it
- The ability to write specifications = programming ability, and communication ability matters more than syntax ability
- Start small: just by writing `CLAUDE.md` well, you have already taken the first step into Spec Coding

::: tip 💡 Next step
In the next chapter, we will learn how to use Claude Code's Agent Teams capability so multiple AI instances can collaborate like a real development team.
:::

---

## References

### Related to Sean Grove's "The New Code" Talk

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Full Transcript of "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec Coding Methodology

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### Tools and Practices

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
