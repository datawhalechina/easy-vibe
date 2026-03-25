---
title: 'Double Diamond: First Choose the Right Problem, Then Build the Right Solution'
description: 'A beginner-friendly introduction to the Double Diamond. Learn when to explore the problem, when to narrow it down, and when to start comparing solutions and prototypes.'
---

<script setup>
const duration = 'About <strong>1.5 hours</strong>'
</script>

# Double Diamond: First Choose the Right Problem, Then Build the Right Solution

<a id="top-dd"></a>

## Introduction

<ChapterIntroduction
  :duration="duration"
  :tags="['Double Diamond', 'Design Thinking', 'Discovery', 'Problem Framing']"
  coreOutput="1 clearer problem definition and 1 better validation starting point"
  expectedOutput="Stop jumping straight into prototypes and learn to define the problem before comparing solutions"
>

One of the most common beginner mistakes is not a lack of effort. It is moving to solutions too fast.

You get an idea, then immediately start sketching pages, features, AI integrations, buttons, and flows. Later you realize the real issue was never clear in the first place: is this even the right problem, and is it worth solving now?

That is exactly what the **Double Diamond** helps prevent.

</ChapterIntroduction>

::: info Minimal SOP
**Goal**: After this, you should be better at knowing when to think about the problem first and when to start designing solutions.

**Action**: Move through `Discover → Define → Develop → Deliver`, and only do the work that belongs to the current stage.

**Result**: You will leave with a clearer problem definition, a few comparable solution directions, and a more realistic first validation cut.

**Quick links**: [What it is](#dd-what) · [The first diamond](#dd-first) · [How AI can help](#dd-ai)
:::

## What You Will Learn

1. What the Double Diamond is and why it helps beginners
2. What Discover, Define, Develop, and Deliver actually mean
3. How to tell whether you should still be exploring or should start narrowing
4. How to use the Double Diamond in AI products, prototyping, and validation

<a id="dd-what"></a>
## 1. What the Double Diamond Is [↩ Back to top](#top-dd)

The Double Diamond is a design process framework popularized by the UK **Design Council**.

It divides the process into four stages:

1. **Discover**
2. **Define**
3. **Develop**
4. **Deliver**

It is called a “double diamond” because it includes two cycles of:

- divergence: opening up possibilities
- convergence: narrowing and choosing

In simple language:

- the first diamond is about choosing the right problem
- the second diamond is about building the right solution

## 2. Why It Matters for Beginners

Beginners often do this:

- get an idea
- start prototyping immediately
- keep adding more features
- lose track of the real problem

The Double Diamond helps by separating two very different questions:

- What problem is worth solving?
- What solution is best for that problem?

Many failed products are not weak because people did not work hard. They fail because they polished the wrong thing.

<a id="dd-first"></a>
## 3. The First Diamond: Choose the Right Problem [↩ Back to top](#top-dd)

The first diamond is about the **problem space**, not the solution space.

You can translate it as:

**before building, first make sure this is worth building.**

### 3.1 Discover

This is the broad exploration stage.

You look at:

- what users actually do
- when the pain shows up
- what workarounds they use now
- what other products or substitutes already exist
- what constraints, environments, or process details shape the problem

The goal is not to rush to a conclusion. The goal is to avoid acting as if you already know the answer.

### 3.2 Define

This is the narrowing stage.

You turn a broad topic into a focused problem definition.

For example:

- too broad: “I want to improve resume writing”
- more useful: “Students applying for internships often delay submitting because they are unsure whether their resume is good enough”

Now the direction is more actionable:

- who the users are
- in what situation the problem appears
- where they get stuck
- what success would look like

## 4. The Second Diamond: Build the Right Solution

Once the first diamond is done, you can move into solutions without drifting as much.

### 4.1 Develop

Now you explore multiple solution directions:

- checklist
- AI rewrite tool
- feedback tool
- example library
- role comparison view

The goal here is not to fall in love with the first idea. It is to open the solution space while keeping the problem fixed.

### 4.2 Deliver

This is where you narrow again:

- choose the most testable direction
- build the smallest useful version
- test it with real people

Deliver does not have to mean “launch the full product.” It can be:

- a flow sketch
- a low-fidelity prototype
- a tiny MVP
- a small user test

What matters is that the solution becomes testable.

## 5. A Simple Comparison Table

| Stage | What you are doing | Keywords | Typical outputs |
| --- | --- | --- | --- |
| Discover | Understanding the problem | research, observation, interviews | notes, patterns, pain points |
| Define | Narrowing the problem | synthesis, prioritization, framing | problem definition, target slice |
| Develop | Expanding solution directions | brainstorming, comparison, prototyping ideas | multiple concepts, rough flows |
| Deliver | Narrowing and testing | prototype, test, iterate | prototype, user feedback, validation cut |

If you want the shortest version:

- **Discover / Define** = choose the right problem
- **Develop / Deliver** = build the right solution

## 6. Common Double Diamond Mistakes

### 6.1 Jumping to Deliver before Discover

This is the classic one: people build screens and flows before they even know whether the problem deserves attention.

### 6.2 Staying in Discover forever

The opposite mistake is endless research with no convergence. The Double Diamond is not “keep exploring forever.” It is “explore, then decide.”

### 6.3 Quietly changing the problem to fit a favorite solution

Sometimes teams define a problem, then later shift the problem statement just to justify the solution they already wanted to build.

That is dangerous because you may stop solving the real problem and start defending a favorite idea.

### 6.4 Treating Deliver as “build everything”

Deliver does not mean a complete polished product. A useful prototype or a small validation test can already be a strong deliverable.

## 7. How This Helps in AI Products

AI products are especially vulnerable to “capability-first” thinking because the technology looks exciting.

It is easy to jump to:

- Should we add multimodal support?
- Should we build an agent?
- Should we connect a workflow engine?
- Should we add voice, image, web search?

The Double Diamond helps you ask first:

- where are users genuinely stuck?
- is this a place where AI is actually necessary?
- what is weak about the current workaround without AI?
- what progress would AI make possible here?

That protects you from a common failure mode:

**high capability, low value.**

## 8. A Template You Can Use Right Away

If you are working on your own product, you can write through the stages like this.

### Discover

- Who are the users I am observing?
- When did they last experience this problem?
- What do they do now?
- What feels slow, painful, or risky?

### Define

- Which problem is most worth prioritizing?
- Which situation is most frequent or most important?
- Who does version one serve, and what exactly does it solve?
- What changes for the user if we solve it well?

### Develop

- What solution directions are possible?
- Which are the lightest, fastest, and easiest to validate?
- What is essential now, and what can wait?

### Deliver

- What is the smallest useful thing we can put in front of users?
- Is it a sketch, prototype, or MVP?
- Who do we need to test with?
- What would make us continue, change direction, or stop?

## 9. A Beginner-Friendly Example

Suppose you want to build an AI tool that helps students prepare resumes for job applications.

Many people would jump straight into the second diamond and start asking:

- should there be one-click beautification?
- should there be AI rewriting?
- should it auto-match job descriptions?
- should it generate self-introductions?

The Double Diamond suggests a better process.

### First diamond

**Discover**

- talk to recent graduates about the last time they edited a resume
- watch how they move from an old resume to a new version
- see whether their pain is “I can't write,” “I can't revise,” or “I can't judge quality”

**Define**

- narrow down to something more concrete
- not “students cannot make resumes”
- but “students applying for internships for the first time struggle to turn existing experiences into role-fit wording, so they delay applying”

### Second diamond

**Develop**

- compare directions: templates, AI rewriting, job comparison, resume scoring, examples

**Deliver**

- build only one narrow version first, such as “rewrite bullet points using a job description”
- test it with five students and see whether it helps them submit faster

When the first diamond is solid, the second diamond becomes much clearer.

## 10. Summary

The real strength of the Double Diamond is that it breaks a messy process into four clearer moves:

- first expand the problem space
- then narrow the problem definition
- then expand the solution space
- finally narrow toward delivery

It does not make you slower. It helps you avoid spending a lot of energy on the wrong direction.

This matters even more in the AI era, because building things is getting easier. When making becomes cheap, choosing the right problem becomes even more valuable.

<a id="dd-ai"></a>
## 11. How AI Can Help You Use the Double Diamond [↩ Back to top](#top-dd)

AI is useful here not as the decision-maker, but as a helper for research, synthesis, and comparison.

### 11.1 Discover: Build a rough problem map

Before interviews and deeper research, AI can help you scan the problem space:

- common substitutes
- frequent public complaints
- typical situations and user groups
- what current tools ignore

Simple input:

```text
I want to build something that helps students improve resumes.
Do not give me features yet.
First help me map the most common problems people seem to face.
```

Possible AI output:

```text
Initial problem map:
1. Not knowing what to include
2. Not knowing how to tailor for different roles
3. Not knowing when the resume is good enough
4. Depending on others for feedback
5. Delaying applications because of uncertainty
```

This does not replace research, but it helps you enter Discover faster.

### 11.2 Define: Narrow the problem

```text
Here are the issues I collected:
1. people don't know what to write
2. people don't know how to revise
3. people keep delaying because they are unsure it is good enough

Help me decide which one is the best first problem to focus on.
```

Possible AI output:

```text
Recommended first problem:
"Students applying for internships delay applications because they cannot tell when their resume is good enough to submit."
```

That kind of output is useful because it turns a pile of fuzzy issues into a more testable first problem.

### 11.3 Develop: Generate multiple directions

```text
My problem definition is:
"Students delay applications because they are unsure whether their resume is ready."

Please suggest 4 different solution directions.
```

Possible AI output:

```text
1. Resume readiness checklist
2. Role-specific rewrite assistant
3. Risk and gap detector
4. Example comparison library
```

This helps you compare rather than overcommit too early.

### 11.4 Deliver: Generate a lightweight test script

```text
I built a simple prototype where users upload a resume and get "not ready yet" feedback.
Please generate a 15-minute user testing script.
```

Possible AI output:

```text
15-minute test script:

1. Ask the user to describe their last resume-editing experience
2. Let them upload a resume on their own
3. Observe whether the feedback is understandable
4. Ask which parts feel useful and which parts feel confusing
5. Ask whether they would want to use this before their next application
```

### 11.5 Use AI as a stage guard

One of the biggest Double Diamond risks is jumping stages. AI can help by acting like a process coach:

```text
Act as a product process coach.
Here is my current project state: [your description]
Please tell me whether I am mainly in Discover, Define, Develop, or Deliver.
Also tell me:
1. whether I am jumping too early
2. what the most important action in this stage is
3. what I should not do yet
```

That is especially useful for beginners who tend to prototype before the problem is clear.

## Assignments

1. Pick one product idea and map it into Discover, Define, Develop, Deliver
2. Write one clear problem definition
3. Generate at least 3 different solution directions
4. Define one small validation version you could test within a week

## Further Reading

- [Design Council: The Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/)
- [Design Council: Framework for Innovation](https://www.designcouncil.org.uk/our-work/skills-learning/tools-frameworks/framework-for-innovation-design-councils-evolved-double-diamond/)
- [Design Council: History of the Double Diamond](https://www.designcouncil.org.uk/our-resources/the-double-diamond/history-of-the-double-diamond/)
