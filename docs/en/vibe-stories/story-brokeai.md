---
title: BrokeAI — "Find and Compare Free AI Tools, All in One Place"
description: How a non-developer built a Korean-language AI tools directory with Vibe Coding — featuring 55 services, comparison tools, AI quizzes, and more.
---

# BrokeAI — "Find and Compare Free AI Tools, All in One Place"

<p style="font-size: 52px; line-height: 1; margin: 0 0 12px;">🤖</p>

**By Jongin**

## 01 It Started With "Why Isn't There a Korean AI Tools Directory?"

In early 2026, AI tools were launching every single day. Globally, directories like TAAFT (There's An AI For That) had amassed 800K users and 49,000 tools. But for Korean-speaking users? Nothing comparable existed.

"Why don't I just build one myself?"

The catch: I wasn't a professional web developer. But in the age of Vibe Coding, if you can describe it, you can build it. So I started.

## 02 Built by "Talking" to AI

The concept was simple:

> **The easiest place for Korean users to discover and compare free AI tools**

I planned features like:
- 🔍 **Search + Categories**: Find the right AI tool fast
- 💰 **Free Tier Info**: "Is this really free?" at a glance
- ⭐ **Ratings + Reviews**: Real user evaluations
- ⚖️ **Comparison Tool**: Compare 2-3 tools side by side
- 🧠 **AI Quiz**: 5 questions → personalized tool recommendations
- 💼 **Role-Based Recommendations**: Tools for developers, designers, marketers...

I built all of this by "talking" to AI coding agents. "Split the free filter into 3 levels — completely free, freemium, trial only." "Make tags clickable to filter." "Add a comparison tray at the bottom." — and code appeared.

## 03 Tech Stack: Simple but Powerful

| Component | Technology |
|-----------|------------|
| Framework | Next.js App Router |
| Database | SQLite (better-sqlite3) |
| Styling | Tailwind CSS |
| Auth | NextAuth v5 (Google OAuth) |
| Search | FTS5 Full-Text Search |
| Hosting | Self-hosted (pm2 + nginx) |

No ORM like Prisma. Just SQLite handling 55 services, 9 categories, full-text search, trending logic, and edit history. "No need to overcomplicate things."

## 04 Competitive Analysis for Differentiation

I analyzed global and Korean competitors:

- **TAAFT**: 49K tools, 3-tier free filter, ⌘+K search
- **AI모아 (Korea)**: Role-based categories, 5-metric scoring, Korean support evaluation
- **AI Tools Scoop**: Monthly/yearly price comparison, side-by-side comparison
- **AIpedia Korea**: Star rating TOP 20

Key finding: **No Korean directory offered price tracking, comparison tools, or Korean language support scoring.** This became BrokeAI's differentiator.

## 05 GSD + Superpowers Workflow

I divided 18 features across 3 phases:

**Phase 1 — Quick Wins (3-5 days)**
- Granular free filter (completely free / freemium / trial only)
- Verification date badges
- Tag click filtering
- AdSense optimization
- sitemap.xml + robots.txt
- OG metadata on all pages
- 404 page + loading skeletons

**Phase 2 — Core Differentiation (1-2 weeks)**
- Side-by-side comparison tool (comparison tray + feature matrix)
- "Alternatives to X" auto-generated pages (programmatic SEO)
- Role-based recommendations (8 roles)
- Star rating system + TOP 20 ranking
- Bookmarks "My AI Toolbox"
- Korean language support level (1-5 scale)

**Phase 3 — Growth Engine (2-4 weeks)**
- Free tier change history timeline
- User reviews + verified badges
- AI matching quiz (5 questions → personalized recommendations)
- Naver SEO (JSON-LD + verification meta)

## 06 The Result: 40 Routes, 18 Features, 0 TypeScript Errors

After everything, Next.js build generated 40 routes:

```
/                    Home (search + filters + card grid)
/compare             Coding agent comparison + comparison matrix
/for/[role]          Role-based recommendations (8 roles)
/alternatives/[id]   "Alternatives to X" pages
/quiz                AI matching quiz
/ranking             Star rating rankings
/my-tools            Bookmarked "My AI Toolbox"
/services/[id]       Service detail + reviews + change history
/sitemap.xml         Auto-generated
/robots.txt          Auto-generated
```

Automated batch jobs:
- Hourly: Trending score refresh
- Daily 02:30: Service URL health check + verification date update
- Daily 04:00: SQLite DB backup (30-day retention)

## 07 "Vibe Coding Actually Works"

Honestly, I was skeptical at first. "Build by talking?" But when I actually tried it, AI coding agents truly understood my words and generated code.

Sure, there were problems:
- Build succeeded but actual rendering broke (`.next` cache corruption)
- Missing `SessionProvider` caused SSR errors
- Multiple subagents almost collided on DB schema changes

But the takeaway is this: **If the planning is solid, AI handles the coding.** I defined "what to build," and AI solved "how to build it."

## 08 Lessons Learned Building BrokeAI

1. **Planning is 80%, coding is 20%**: Knowing what to build matters more than writing code
2. **Competitive analysis is essential**: Finding what others don't do is the key to differentiation
3. **Build success ≠ runtime success**: Check actual rendering, error logs, and crawling
4. **Simplicity is powerful**: SQLite alone is enough. Complex infrastructure isn't needed
5. **Vibe Coding is real**: Even non-developers can build, if they have ideas

## 09 What's Next

BrokeAI continues to grow:
- Naver Search Advisor registration for Korean SEO
- Community promotion on Clieng AI and AI Job Talker Cafe
- As user reviews accumulate, building a truly valuable recommendation system
- Automating "free tier change detection" for information accuracy

**BrokeAI**: https://brokeai.gateway.myaddr.io

---

> "I wanted to create a space where people looking for free AI tools could find and compare them all in one place. Thanks to Vibe Coding, that dream became reality."
