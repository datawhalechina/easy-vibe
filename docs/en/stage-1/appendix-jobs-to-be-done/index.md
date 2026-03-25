---
title: 'Use Jobs to Be Done to Find What Users Really Want to Get Done'
description: 'A beginner-friendly introduction to Jobs to Be Done. Learn how to turn a vague idea into a clearer user scenario, a sharper need, and a more grounded MVP direction.'
---

<script setup>
const duration = 'About <strong>1.5 hours</strong>'
</script>

# Use Jobs to Be Done to Find What Users Really Want to Get Done

<a id="top-jtbd"></a>

## Introduction

<ChapterIntroduction
  :duration="duration"
  :tags="['JTBD', 'User Needs', 'Product Thinking', 'Discovery']"
  coreOutput="1 JTBD statement that feels closer to a real user need"
  expectedOutput="Turn a vague idea into a clearer user scenario and a more grounded MVP direction"
>

Many beginners start product thinking from the wrong place: features. You see another product with AI summaries, tags, agents, or workflows, and your first instinct is to ask, “What features should I add too?”

But users rarely choose a product because a feature name sounds cool. Most of the time, they are trying to make progress in a specific situation, and they temporarily “hire” a tool to help them move forward.

That is the core reminder behind **Jobs to Be Done (JTBD)**: users are not buying features. They are hiring a solution to help them make progress.

This article explains JTBD in plain language and turns it into something you can actually use when shaping an AI product.

</ChapterIntroduction>

::: info Minimal SOP
**Goal**: After this, you should be better at turning a vague idea into a real user need instead of just a pile of feature names.

**Action**: Write one rough product idea, talk to 3 possible users about the last time they dealt with this problem, then rewrite it as one JTBD sentence.

**Result**: You will leave with a clearer need hypothesis and a better sense of what your first version should solve.

**Quick links**: [What JTBD is](#jtbd-what) · [One-sentence formula](#jtbd-formula) · [How AI can help](#jtbd-ai)
:::

## What You Will Learn

1. What Jobs to Be Done means in plain language
2. How to separate “what users say they want” from “what they are really trying to get done”
3. How to turn a vague idea into a situation, trigger, progress, workaround, and success condition
4. How JTBD connects to AI product thinking, interviews, and prompt-based analysis

<a id="jtbd-what"></a>
## [1. What Jobs to Be Done Means](#top-jtbd)

Jobs to Be Done, often shortened to **JTBD**, is built around a simple idea: users “hire” a product to get something done.

That “something” is usually not just a surface task. It is a kind of **progress**.

Examples:

- Not “I want an AI meeting-note tool,” but “I want to turn a messy meeting into a clear summary with owners and next steps before I forget everything.”
- Not “I want a budgeting app,” but “I want to stop feeling anxious at the end of the month because I finally understand where my money went.”
- Not “I want a resume optimizer,” but “I want to feel confident enough to send my application instead of endlessly tweaking my resume.”

JTBD helps you focus less on feature names and more on what users are trying to move toward.

It also changes how you see competition. If the job is “make a long PDF easier to understand,” your competition is not just another AI tool. It may be a colleague, an intern, manual skimming, or even delaying the task.

## 2. JTBD vs Personas and Feature Lists

Many beginners start by writing personas: 25 years old, white-collar worker, likes productivity tools, willing to try new apps. That information is not useless, but it usually does **not explain why someone acts right now**.

JTBD pushes you toward more useful questions:

- What situation triggered action?
- What problem felt urgent?
- What are they trying to move toward?
- What clumsy workaround are they using now?
- What result would make them say “this actually helped”?

That is the difference:

- a persona tells you roughly who the person is
- JTBD tells you what they are trying to get done right now

Feature lists have a similar trap. Users may ask for export, rewrite, voice input, or smart tags. Those are surface requests. JTBD asks what sits underneath them:

- Why export to Word instead of PDF?
- Why rewrite: because the tone is weak, or because it must fit a different audience?
- Why voice input: because typing is annoying, or because they usually capture thoughts while walking, commuting, or leaving meetings?

Sometimes a feature is just a temporary translation of a deeper job.

## 3. A Beginner-Friendly Example

Imagine someone buys coffee and a sandwich every morning on the way to work.

On the surface, they are buying breakfast. In JTBD terms, they may really be trying to:

- solve breakfast with as little mental effort as possible
- avoid being hungry before arriving at work
- keep their morning routine moving without disruption

The thing they "hire" is not really one specific sandwich brand. It is a reliable way to keep the morning moving.

The same logic applies to AI products. If you want to build an AI meeting summary tool, JTBD helps you step back from feature brainstorming and ask:

- What moment actually hurts?
- What are users trying to make happen after the meeting?
- What would make the output feel trustworthy enough to share?

If the job becomes clear, priorities become clearer too. Maybe the first version does not need twelve export formats. Maybe it mainly needs:

- a clear structure
- stable action-item extraction
- easy sharing
- output good enough to forward without embarrassment

That is JTBD at its best: it brings you back from “which capabilities should I stack?” to “what progress am I helping the user make?”

## 4. A Practical JTBD Template

If you are a beginner, do not overcomplicate this. Start with five parts.

### 4.1 Situation

In what moment or context does the user look for help?

- right after a meeting
- late at night before submitting a resume
- when the boss suddenly asks for a document
- at the end of the month when money feels tight

If you cannot describe the situation, the need is probably still too vague.

### 4.2 Trigger

What makes them act now?

- a long document they do not know how to start reading
- a deadline tomorrow and messy material today
- a progress question from a manager that exposed their confusion
- repeated friction in a manual workflow

Triggers often come with emotion. That emotion matters.

### 4.3 Progress

What state are they trying to move toward?

- from chaos to clarity
- from anxiety to confidence
- from delay to action
- from friction to flow
- from vague output to something they can actually deliver

Many people are not really buying tools. They are buying **state change**.

### 4.4 Current workaround

What are they doing right now without your product?

- copy-pasting manually
- using Excel or Notes to hold things together
- asking a colleague
- procrastinating
- bouncing between multiple tools

The workaround is often your real competition.

### 4.5 Success condition

What would make the user say this was truly helpful?

- getting a shareable result within 10 minutes
- not needing a second major rewrite
- making fewer mistakes
- immediately knowing what to do next

If you cannot say what “useful enough” means, the direction is probably still not focused enough.

<a id="jtbd-formula"></a>
## [5. A One-Sentence Formula You Can Reuse](#top-jtbd)

Use this sentence pattern:

> When __________, I want to __________, so that I can __________.  
> Right now, I have to __________.

Example:

> When I am preparing to apply for internships, I want to quickly turn my existing resume into a version that fits a specific role, so that I can submit applications without getting stuck in endless revisions.  
> Right now, I have to rewrite things manually and ask friends for feedback.

That is already much more useful than “I want to build a resume AI.”

## 6. Three Layers of a Job in AI Products

Many AI products look powerful in demos but fail to keep users. A common reason is that they solve only the surface task, not the deeper job.

You can roughly look at a job in three layers:

### 6.1 Functional layer

What is the surface task?

- summarize a document
- rewrite text
- extract action items
- generate an image

This is the easiest layer for users to say out loud.

### 6.2 Emotional layer

What discomfort do they want to reduce, or what feeling do they want to gain?

- less panic
- less embarrassment
- less “starting from zero”
- more confidence
- more control

Willingness to pay often has a lot to do with this layer.

### 6.3 Social layer

Who do they want to look like in front of others?

- more reliable
- more organized
- more professional
- more capable

If you only solve the functional layer, you are easier to replace. If you understand the emotional and social layers too, your product direction often becomes much stronger.

## 7. Use JTBD to Filter Product Directions

Sometimes you do not already have a product. You have three to five ideas and do not know which one deserves attention. JTBD is useful here too.

Ask each idea:

1. Is the situation concrete enough?
2. Are users already using some clumsy workaround?
3. Is the job painful enough or frequent enough?
4. If I solved it well, would users clearly feel a better state?
5. Can version one focus on just one important step in the job?

If an idea still sounds like “kind of interesting” after this, but you cannot explain the trigger, workaround, or success condition, it is probably still a vague idea rather than a good starting direction.

## 8. Interview Questions You Can Use Right Away

Many people run interviews by asking: “What features do you want?” That usually gets surface answers.

JTBD-style questions are better:

- When was the last time this problem happened to you?
- What were you doing at the time?
- Why did you get stuck?
- How did you solve it?
- What part felt slow, frustrating, or risky?
- If a tool helped, what result would make you say it was actually useful?
- What alternatives have you tried, and why were they not good enough?

These questions pull the conversation back into real experience instead of imagined preference.

## 9. Use AI to Help You Break Down JTBD

JTBD is not an AI invention, but AI is very useful for organizing and clarifying JTBD.

For example, if you already collected 5 to 10 user quotes, you can ask AI to summarize them like this:

```text
Please act as a product research assistant.
I will give you raw user quotes.
Do not give feature ideas yet.
First organize them using Jobs to Be Done:

1. What situation is the user in?
2. What event triggered action?
3. What progress are they really trying to make?
4. What is the current workaround?
5. What success condition matters most?
6. What emotional words show up repeatedly?

Then turn the result into 3 JTBD hypotheses worth validating first.
```

If you already have an idea, you can also use AI to do the first pass of narrowing:

```text
I want to build [your product idea].
Do not give me a feature list yet.
Use Jobs to Be Done to help me analyze:

1. What concrete situations this product might serve
2. What core job exists in each situation
3. What alternatives already exist
4. Which job is the best starting point for an MVP, and why
5. Write the final recommendation as one clear JTBD sentence
```

This helps prevent the classic AI trap: jumping straight to “brainstorm 50 features” before the direction is clear.

## 10. Four Common Beginner Mistakes

### 10.1 Writing the job as a feature

“AI summary,” “smart classification,” and “auto generation” are not jobs. They are possible solutions.

### 10.2 Making the audience too broad

“All professionals,” “all students,” and “all founders” are usually too wide. The wider it is, the harder it becomes to see a real situation.

### 10.3 Listening only to what users say

What people say matters, but their current workaround often reveals their priorities better.

### 10.4 Trying to build the full platform too early

JTBD works best when you focus on one important step in one concrete situation and make that part feel much better.

## 11. Summary

The real value of JTBD is not the label. It is the shift in perspective:

- stop looking first at features
- start looking at the progress users are trying to make

If you keep asking:

- In what situation does the user hire this?
- What exactly are they stuck on?
- What workaround are they using now?
- What would “better” look like for them?

your idea usually becomes much sharper.

It also helps you avoid one of the biggest mistakes in AI products: falling in love with capability demos instead of user progress.

<a id="jtbd-ai"></a>
## [12. How AI Can Help You Practice JTBD](#top-jtbd)

JTBD is not an AI invention, but AI can be a very helpful research assistant, organizer, and challenger. The key is this:

**use AI to organize and expand your thinking, not to invent user truth for you.**

### 12.1 Turn a vague idea into candidate JTBD statements

```text
I currently have a vague product idea: [your idea].
Do not give me a feature list yet.
Use Jobs to Be Done to help me analyze:
1. What situations might this idea fit?
2. What progress might users want in each situation?
3. What current alternatives might they be using?
4. Which job feels best as an MVP starting point?
Write each job as one clear JTBD sentence.
```

You can also write a very beginner-style input like this:

```text
I want to build something that helps college students find internships.
I can't explain it clearly yet.
Help me figure out what users might actually be trying to get done.
```

Possible AI output:

```text
Possible JTBD directions:

1. When I start internship applications, I want to know what I need to prepare first,
so I do not keep delaying because everything feels confusing.

2. When I see a job post, I want to quickly judge whether it is worth applying to,
so I do not waste energy on poor-fit roles.

3. When I am ready to apply, I want to adapt my resume to a specific role,
so I can submit faster and feel more confident.
```

The value here is that AI helps split one fuzzy idea into several clearer directions.

### 12.2 Organize raw interview notes

```text
Below are raw notes from 5 user interviews.
Do not suggest solutions yet.
First organize them using JTBD:
1. What situation is the user in?
2. What event triggered action?
3. What progress are they trying to make?
4. What is the current workaround?
5. What success condition matters most?
6. What patterns repeat across users?

Then summarize 3 JTBD hypotheses worth validating first.
```

A very simple beginner input can look like this:

```text
I asked 3 people and they roughly said:

1. Every time I apply for internships, I have to redo my resume and it's annoying.
2. I mostly worry that I still don't know if it's good enough.
3. Right now I ask seniors for help, but I don't want to bother them too often.

Please help me summarize the real job they are trying to get done.
```

Possible AI output:

```text
Organized result:

- common situation: preparing internship applications
- common pain: uncertainty about whether the resume is ready enough
- current workaround: asking seniors, revising manually
- possible JTBD:
  When I am preparing to apply, I want to know whether my resume is ready enough to send,
  so I stop getting stuck in endless revisions.
```

This is useful because it turns messy quotes into something closer to a real need.

### 12.3 Do light web research before interviews

Before larger interview work, AI can help you do a light scan of outside information:

- how people complain about this problem in public communities
- what existing tools mostly solve
- what common workarounds people use
- what users praise or dislike in current solutions

This does not replace real user interviews, but it is a good warm-up for the Discover phase.

Simple input:

```text
Please look up common pain points students mention when editing resumes and applying for internships.
Focus on forums, public communities, and real user complaints.
Summarize the top 5 patterns.
```

Possible AI output:

```text
Top recurring pain points:
1. Not knowing what to include
2. Not knowing how to tailor a resume for different roles
3. Feeling unsure whether the resume is good enough
4. Lack of reliable feedback
5. Delaying applications because the process feels heavy
```

This kind of output is not final truth, but it helps you start interviews with a better map.

### 12.4 Ask AI to play the critic

Sometimes we get emotionally attached to our own ideas. AI can help by acting as a strict critic:

```text
Act as a very strict product research advisor.
Here is my JTBD hypothesis: [your hypothesis]
Critique it from these angles:
1. Is the situation still too broad?
2. Is this actually a feature, not a progress statement?
3. Are the alternatives too weak?
4. Is the success condition too vague?
5. What risk most needs validation?
```

That kind of challenge helps you see whether you are really looking at user needs or just defending your favorite solution.

## Assignments

1. Pick one product idea and rewrite it into one JTBD sentence
2. Add the five parts: situation, trigger, progress, workaround, success condition
3. Talk to 3 potential users about the last time they faced this problem
4. Give the interview notes to AI and ask it to summarize 3 possible JTBD hypotheses

## Further Reading

- [Christensen Institute: Jobs to Be Done](https://www.christenseninstitute.org/theory/jobs-to-be-done/)
- [Harvard Business School Online: What Is Jobs to Be Done?](https://online.hbs.edu/blog/post/jobs-to-be-done)
- [Intercom: Jobs-to-be-Done: A framework for customer needs](https://www.intercom.com/blog/jobs-to-be-done-framework/)
- [Mural: Jobs to Be Done framework guide](https://www.mural.co/blog/jobs-to-be-done-framework)
