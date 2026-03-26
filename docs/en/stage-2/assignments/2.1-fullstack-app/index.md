# Build Your First Modern App: Full-Stack Application

::: tip Goal
Turn a prototype idea into a small but complete web application with a real frontend, backend logic, persistent data, and a public deployment link.
:::

At this point, the goal is no longer just “make a page look right.” The goal is to make the core product loop actually work: a user opens the app, does something meaningful, triggers backend logic, stores or reads data, and gets a result that still exists the next time they come back.

You do not need to build a huge platform. A small product with a clear scope and a fully working flow is a much better submission than a large project full of unfinished features.

This assignment is meant to connect the Stage 2 path:

- [UI Design](../../frontend/2.2-ui-design/)
- [From Design Prototype to Project Code](../../frontend/2.6-design-to-code/)
- [Modern Component Libraries](../../frontend/2.7-modern-component-library/)
- [From Database to Supabase](../../backend/2.2-database-supabase/)
- [Using LLMs to Write API Code](../../backend/2.3-ai-interface-code/)
- [Git and GitHub Workflow](../../backend/2.4-git-workflow/)
- [How to Deploy Web Applications](../../backend/2.5-zeabur-deployment/)

## 1. Assignment Goal

Build a **working, demoable, publicly accessible** full-stack web app.

Your project should have:

1. **A clear user and use case**
   - You should be able to explain who the product is for and what problem it solves.
2. **A complete product loop**
   - The key action must go beyond frontend mock data and trigger real backend or database behavior.
3. **A real engineering handoff**
   - The code should live in a repo, secrets should be handled correctly, and someone else should be able to understand how the project works.

Good project directions include:

- upgrading a Stage 1 prototype into a real application
- extending [Hogwarts Portraits](../../frontend/2.5-hogwarts-portraits/) into a more complete product
- building a small AI utility such as a writing tool, summarizer, or research workspace
- building a lightweight vertical tool such as a CRM, scheduling tool, or learning assistant

## 2. Minimum Requirements

| Area | Minimum Requirement | Notes |
| --- | --- | --- |
| Product scope | One clear core workflow | Example: create and save content, upload and process input, create a character and chat |
| Frontend | At least 2 pages, or 1 complex main page plus 1 supporting page | Desktop-ready is required |
| States | Handle loading, empty, and error states | Do not build happy-path only |
| Data | At least 1 core table, ideally 2 related entities | Example: `users` + `projects`, `characters` + `messages` |
| Backend | At least 3 real API endpoints or equivalent server-side capabilities | Express, Next.js route handlers, or edge functions are all acceptable |
| Persistence | Core user actions must be saved and retrievable | Not just mock data |
| Delivery | A GitHub repo and a public online link | Vercel or Zeabur are recommended |
| Documentation | A readable `README.md` | Include purpose, stack, setup, and env vars |

## 3. Recommended Stack

You can use any reasonable stack, but if you want the safest path, this combination works well:

| Layer | Recommended Option |
| --- | --- |
| Frontend | React / Next.js or Vue |
| Component library | shadcn/ui, Ant Design, HeroUI, or Element Plus |
| Data and auth | Supabase |
| Backend | Next.js route handlers, Express, or Supabase Edge Functions |
| Deployment | Vercel or Zeabur |

For a first full-stack project, “frontend + Supabase + a small amount of server logic” is usually the fastest way to a successful submission.

## 4. Suggested Workflow

### 4.1 Write the core task in one sentence

Before coding, answer:

> What is the single most important thing a user should be able to do in this app?

Examples:

- upload text, generate a summary, and save it to history
- create a character profile and continue chatting with it
- add a customer lead and review its status later

If that sentence is still vague, the scope is probably too wide.

### 4.2 Plan the structure first

Sketch:

- what pages you need
- the most important module on each page
- which actions read data
- which actions write data

This will make AI-assisted implementation much more stable.

### 4.3 Start with mock data

A practical order is:

1. build the frontend structure with mock data
2. connect real backend logic
3. replace mock data with real persistence

This keeps the debugging surface much smaller.

### 4.4 Starter prompt for AI IDEs

```text
Help me build a deployable full-stack web app for [your use case].

Do not generate everything at once. First break the project into:
1. page structure and routes
2. data model design
3. API or server-side capability design
4. frontend component breakdown
5. environment variable and deployment setup

Requirements:
- Use [React/Next.js/Vue + your component library + Supabase/Express]
- Prioritize a working MVP over over-engineering
- Tell me which files to create
- Include loading, empty, error, and validation states
```

## 5. Deliverables

Please submit:

1. **A GitHub repository link**
2. **A public online link**
3. **A `README.md`**
   - project name and one-line description
   - target users and use case
   - tech stack
   - main features
   - local setup steps
   - environment variable notes
4. **A short demo asset**
   - ideally a 60 to 90 second video, or a few key screenshots/GIFs

Useful optional additions:

- database schema or ER diagram
- API notes or endpoint list
- design/architecture explanation
- a short iteration log

## 6. Evaluation Checklist

Your project is in good shape if:

- a user can complete a real end-to-end flow
- key actions create visible changes in the system
- data still exists after refresh
- backend failures do not crash the UI
- you can explain the product clearly in about one minute

## 7. Bonus Ideas

You can go further with:

- authentication and multi-user support
- real AI capabilities with streaming or retries
- better UI quality with a modern component library
- monitoring, logging, or analytics
- basic tests
- payment or subscription flows
- mobile adaptation

## 8. Common Mistakes

### 8.1 The scope is too large

If your first version requires auth, admin tools, payments, workflow builders, knowledge bases, and multi-user collaboration all at once, the project is probably too big.

### 8.2 The frontend looks good, but nothing is real

That may still be a useful frontend exercise, but not a strong full-stack assignment. This project should include real persistence and server-side behavior.

### 8.3 Secrets are committed into the repo

API keys and database secrets belong in environment variables, not in frontend source code.

### 8.4 Only testing the happy path

Manually test:

- empty input
- duplicate actions
- network failure
- missing data
- permission errors

That is where the most useful product fixes usually appear.

## 9. Final Advice

Treat this assignment as your first real product delivery exercise, not as a feature-count competition.

What matters most is not how many tools you used, but whether you can:

- define a clear product goal
- use AI tools to move from idea to implementation
- deliver something another person can understand, try, and reproduce

::: tip Next
After this assignment, continue with [Assignment 2: Modern Frontend Component Library + Trae](../2.2-modern-frontend-trae/) to push the interface quality even further.
:::
