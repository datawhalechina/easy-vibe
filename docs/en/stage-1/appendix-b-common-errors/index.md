---
title: 'What to Do When You Encounter Errors While Coding - A Practical Guide to Asking AI with Screenshots'
description: 'Learn how to efficiently ask AI to solve various error problems during development. Master the standard process of screenshotting, describing, and locating problems, making AI your debugging assistant.'
---

<script setup>
const duration = 'Approx. <strong>30 minutes</strong>'
</script>

# What to Do When You Encounter Errors While Coding

## Chapter Overview

<ChapterIntroduction :duration="duration" :tags="['Debugging Skills', 'AI Collaboration', 'Problem Solving', 'Developer Tools']" coreOutput="A standardized error troubleshooting process" expectedOutput="Ability to independently solve 90% of common errors">

In the AI era, the way we troubleshoot errors has changed.

You don't need to memorize all error types, you don't need to become a debugging expert, and you don't even need to understand what the error means.

<strong>You only need to learn one thing: how to ask AI.</strong>

This chapter will teach you a troubleshooting process <strong>from simple to advanced</strong>:

1. <strong>Step 1: Ask directly</strong>: Describe the phenomenon + screenshot, ask in one sentence
2. <strong>Step 2: Add information</strong>: If it can't be solved, open F12 to add key information

After mastering this process, <strong>you'll be able to solve 90% of errors yourself</strong>.

</ChapterIntroduction>

::: info Note
All methods in this chapter are based on actual experience with AI IDEs like Cursor/Trae/Claude, and can be directly applied to daily development.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Ask Directly', description: 'Describe phenomenon + screenshot' },
      { title: 'Add Information', description: 'Open F12 to locate problem' },
      { title: 'Iterate', description: 'Until problem is solved' }
    ]" />
  </ClientOnly>
</div>

## 1. Core Mindset: Screenshot and Ask AI

::: warning Why is this chapter important?

Many beginners' first reaction when encountering errors is:
- Panic and start randomly modifying code
- Spend half an hour searching "how to solve this specific error"
- Try to understand what the error means yourself
- Debug alone until late at night

<strong>These are all wasting time.</strong>

In the AI era, debugging has become a very simple matter:

```
See error → Screenshot → Ask AI → Do what AI says
```

You don't need to understand the error, you don't need to know how to debug, you don't even need to know where the problem is.

<strong>You only need to learn how to ask.</strong>

:::

### 1.1 The Simplest Way to Ask

No complex templates needed, choose from two methods:

**Method 1: Describe the phenomenon**

Format: What you just did, what happened now

```
I just modified the login page code, now the page is blank, what should I do?
```

**Method 2: Screenshot**

Directly screenshot the current page or error message

```
[Screenshot]

How to solve this error?
```

**Best method: Description + Screenshot**

```
I just modified the login page code, now the page is blank.

[Screenshot]

What should I do?
```

**Remember: Describe the context clearly, add a screenshot, and AI can help you solve the problem faster.**

### 1.2 How to Explain the Problem Clearly

Many beginners know they need to ask, but don't know how to say it. Actually, you only need to explain three things:

**1. What you just did**

```
I just clicked the save button
I just modified the login page code
I just refreshed the page
```

**2. What you see now**

```
Now the page is blank
Now the button has no response when clicked
Now it shows an error message
```

**3. What effect you want to achieve**

```
I want the data to save successfully
I want the page to display normally
I want a prompt to pop up after clicking the button
```

**Complete example:**

```
I just clicked the save button, now the page shows "Save failed" error.

[Screenshot]

I want the form data to save to the database successfully, what should I do?
```

**Key principles:**
- Use plain language, no technical jargon needed
- Speak in chronological order: what you did first, then what happened
- State your expectations so AI knows what you want

## 2. Step 1: Describe the Phenomenon Directly and Ask

When encountering a problem, <strong>don't rush to open F12</strong>. First describe the phenomenon directly, screenshot the current page, and show it to AI.

Many times, AI can directly give a solution after seeing the screenshot.

### 2.1 How to Describe Common Phenomena

::: tip Just describe directly

**Page is blank**
```
The page opens blank, what should I do?

[Screenshot]
```

**Button click has no response**
```
Clicking this button has no response, help me check.

[Screenshot]
```

**Data won't save**
```
Clicked save, data didn't save, what should I do?

[Screenshot]
```

**Style displays incorrectly**
```
This button position is off, how to adjust?

[Screenshot]
```

**API error**
```
Calling the API resulted in an error, help me check.

[Screenshot]
```

:::

### 2.2 If AI Solves It Directly

Congratulations, problem solved! Just modify according to what AI says.

### 2.3 If AI Says "Need More Information"

Then you need to open F12 and add key information. Read on.

## 3. Step 2: Add Key Information

When AI says it needs more information, open F12 and screenshot the corresponding content based on the problem type.

### 3.1 When to Add Information

AI might reply like this:
- "Please open Console to see if there are any errors"
- "Screenshot the Network panel for me to see"
- "Need to see the specific error message"

At this point, add screenshots according to the guidance below.

### 3.2 Add Console Information (Page Blank/Error)

::: tip Operation steps

**Step 1: Press F12 to open Developer Tools**

On Mac it's `Cmd+Option+I`, or right-click the page and select "Inspect".

**Step 2: Switch to Console tab**

**Step 3: Screenshot the red error message**

**Step 4: Send to AI**

```
Console error is as follows:

[Screenshot]
```

:::

### 3.3 Add Network Information (Data Issues/API Errors)

::: tip Operation steps

**Step 1: Press F12 to open Developer Tools**

**Step 2: Switch to Network tab**

**Step 3: Perform the operation again** (click save/refresh page)

**Step 4: Find the corresponding request and screenshot**

- Look at URL and status code
- Look at Payload (parameters passed)
- Look at Response (returned result)

**Step 5: Send to AI**

```
Network information is as follows:

Request: [Screenshot 1]
Parameters: [Screenshot 2]
Response: [Screenshot 3]
```

:::

### 3.4 Add Elements Information (Style Issues)

::: tip Operation steps

**Step 1: Right-click element → "Inspect"**

Developer Tools will automatically locate that element.

**Step 2: Screenshot the Styles panel**

**Step 3: Send to AI**

```
Element styles are as follows:

[Screenshot]
```

:::

## 4. Step 3: Iterate Until Solved

### 4.1 Inefficient Approaches

These approaches will waste your time:

- Panic when seeing an error and start randomly modifying code
- Spend half an hour searching for error solutions
- Try to understand the meaning of every error yourself
- Debug alone until late at night

### 4.2 Efficient Approaches

Follow this process:

- First describe the phenomenon directly and screenshot to ask
- When AI says it needs more information, open F12 to add
- Modify code according to suggestions
- After modifying, test; if problem persists, continue screenshotting and asking

## 5. Summary: Complete Process

```
Encounter problem
    ↓
Describe phenomenon directly + screenshot
    ↓
Send to AI: "What should I do?"
    ↓
AI solves directly?
    ↓ Yes
Do what AI says
    ↓
Test if solved
    ↓
    ↓ No / AI needs more information
Open F12, add key information
    ↓
Send to AI again
    ↓
Repeat until solved
```
