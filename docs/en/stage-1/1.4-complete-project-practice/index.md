---
title: 'Complete Project Practice - From Demo to Production-Grade Prototype'
description: 'Move beyond the Demo stage, learn how to complete product flows, build realistic simulated data, iterate quickly through feedback, and finally complete a presentable, interactive AI product prototype.'
---

<script setup>
const duration = 'About <strong>3 days</strong>'
</script>

# Beginner Level 5: Complete Project Practice

## Chapter Overview

<ChapterIntroduction :duration="duration" :tags="['Product Thinking', 'Mock Data', 'Interaction Improvement', 'LocalStorage']" coreOutput="1 fully functional AI product prototype" expectedOutput="Web application with complete flows and real data">

In the previous chapter, we integrated AI capabilities. The Demo runs, but it's still <strong>far from a real "product"</strong>: Refresh the page and <strong>data is gone</strong>, errors cause <strong>white screens</strong>, the list only has "test data 1, test data 2", users can't <strong>undo</strong> mistakes...

This chapter will <strong>fill all these gaps</strong>: We'll <strong>complete the product's full flow</strong>, use AI to generate <strong>realistic business data</strong> to replace fake data, add <strong>error handling and user feedback</strong>, and finally polish a <strong>presentable prototype that can be demonstrated to others</strong>.

This is the <strong>final chapter of the beginner stage</strong>. After completing this step, you'll have transformed from "can't program at all" to "<strong>can independently build AI product prototypes</strong>".

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Complete Flows', description: 'From single feature to complete loop' },
      { title: 'Inject Soul', description: 'Simulate real business data' },
      { title: 'Feedback Iteration', description: 'Fix experience based on real feedback' },
      { title: 'Final Project', description: 'Your graduation design' }
    ]" />
  </ClientOnly>
</div>

## 1. Reject "Happy Path": Complete Core Flows

Many beginners building prototypes often only do the "Happy Path" (the ideal path): User clicks -> API responds successfully -> Display result.
But in the real world, things often don't go that smoothly. To make your prototype look like a real product, you need to consider these "hidden" elements.

### 1.1 Add "Waiting" and "Feedback"

When users click "Generate Copy", AI often needs several seconds to respond. If the interface shows no reaction, users will think the program is broken.
**You need to let AI IDE help you add Loading states:**

> Prompt example:
> "When I click the generate button, please change the button to 'Generating...' and make it unclickable, while showing a loading animation in the right area. Only restore to normal after the API returns results."

### 1.2 Handle "Failures" and "Exceptions"

API Keys can expire, networks can disconnect.
**You need to let AI IDE help you handle errors:**

> Prompt example:
> "If the API request fails, don't just log an error in the console. Please pop up a red notification (Toast) at the top of the page telling the user 'Generation failed, please try again later', and allow users to click generate again."

### 1.3 Conversation History Persistence

During interaction with AI, we need to save conversation content so users can review history and continue previous conversations. At this stage, we won't introduce a database yet. We can choose from these lightweight solutions:

**Storage Options:**

| Option | Use Case | Characteristics |
| ------ | -------- | --------------- |
| **LocalStorage** | Pure frontend projects, user data saved in browser | Simple implementation, survives refresh, can't sync across devices |
| **JSON Files** | Local prototypes, data stored as files | Clear structure, easy debugging, manually editable |
| **TXT Files** | Simplest solution, quickly record text content | Free format, good compatibility |

**Conversation Content Example:**
Saved conversation history typically includes:

```json
[
  {
    "role": "user",
    "content": "Help me generate Douyin e-commerce copy for a Bluetooth headset",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "【Bluetooth Headset Product Copy】\n\n🎧 Say goodbye to lag, immersive music experience\n\nLadies! This Bluetooth headset is absolutely amazing👇\n\n✅ 40dB active noise cancellation, instantly enter music world\n✅ 30 hours ultra-long battery life, one week commute without charging\n✅ Crystal clear calls like face-to-face, can chat even on noisy subway\n✅ Semi-in-ear design, comfortable for long wear\n\n💰 Limited time offer, click the link below to get yours!",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**Implementation Prompt:**

> "Please help me implement conversation history saving functionality. Support saving user and AI conversation records as JSON files (or use LocalStorage). Automatically load historical conversations when entering the page, support viewing and deleting individual conversation records."

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Complete Flows', description: 'From single feature to complete loop' },
      { title: 'Inject Soul', description: 'Simulate real business data' },
      { title: 'Feedback Iteration', description: 'Fix experience based on real feedback' },
      { title: 'Final Project', description: 'Your graduation design' }
    ]" />
  </ClientOnly>
</div>

## 2. Inject Soul: Simulate Real Data (Mock Data)

An empty page can't impress anyone. Imagine showing your "E-commerce Material Workbench" to others, but the history is empty, or just has one line "test / test / test".
To make the demo effect best, we need to "fake" some realistic data to make your prototype look like a real product that's been running for six months.

### 2.1 Let AI Help You Design Data Structures

We don't need to think about what each field should be called ourselves (like whether it's `name` or `title`). This can be completely left to AI.

You just need to tell AI your **business scenario**:

> **Prompt Example:**
> "I'm building a **Douyin e-commerce material workbench** prototype.
> Please help me design a JSON data structure to describe a 'product task'.
> This task should include: product basic info (name, category), input materials (image links), and AI generated results (title, copy, poster image).
> Please give me a JSON example directly."

AI will automatically help you conceive fields like `productName`, `generatedContent` based on your description.

### 2.2 Let AI Batch Produce "Realistic" Data

After having the data structure, the next step is letting AI help you "fill in the blanks" and generate a batch of realistic-looking data.

**Prompt Techniques:**
You can't just tell AI "help me generate data". You need to tell it **business background** and **content requirements** like assigning tasks to an intern:

- **Business Background**: Tell AI we're doing "Douyin e-commerce", so product titles should be eye-catching (like "slimming miracle", "students must-have"), copy should be conversational.
- **Image Requirements**: To make the prototype look good, images shouldn't be black-and-white placeholders. Best to use random colorful landscapes or product photos.

> **Prompt Example:**
> "Based on the structure just designed, please help me generate 10 realistic mock data entries.
> (Note: Doesn't have to be JSON format. If you're writing frontend, have it generate JavaScript arrays directly; if using Python, have it generate Lists.)
>
> **Business Scenario Requirements:**
>
> 1. Assume this is a general merchandise store, products cover 'women's clothing', 'electronics', 'beauty' three categories.
> 2. **Generated titles and copy should be very 'Douyin style'**: Like titles should include Emoji (🔥, ✨), copy should use phrases like 'absolutely amazing', 'tested and works great'.
> 3. **Image fields**: Please uniformly use the format `https://picsum.photos/seed/{random_id}/300/400` to ensure each image is different."

**Generated Mock Data Example:**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: 'Summer French Vintage Floral Dress',
    status: 'completed',
    input: {
      category: 'Women\'s Clothing',
      features: ['Waist-cinching', 'Slimming', 'Elegant'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: '✨Looks great on everyone! This French floral dress is absolutely amazing🔥',
      generatedCopy:
        'Ladies! This dress is so slimming! The waist design is incredible, put it on and instantly have a waistline. Fabric is very breathable, not stuffy at all in summer. Perfect for dates and shopping! 👗',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: 'Super Strong Noise Cancelling Bluetooth Headset Pro',
    status: 'completed',
    input: {
      category: 'Electronics',
      features: ['Noise cancelling', 'Ultra-long battery', 'Low latency'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: '🎧 Finally found it! This headset\'s noise cancelling is so strong! 🔇',
      generatedCopy:
        'Put it on and the world instantly goes quiet. Sound quality is excellent, listening to music is like being there live. Battery life is impressive too, charge once use for a week! Students must-have!',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... more data
]
```

### 2.3 (Advanced) Use LocalStorage for "Fake CRUD"

If you want the "mock data" just generated to not only be viewable but also deletable and editable, and even have newly created tasks persist after page refresh, you can combine with `LocalStorage`.

> **Prompt Example:**
> "Please help me implement a data storage feature.
>
> 1. Prioritize reading data from `localStorage`.
> 2. If `localStorage` is empty, initialize with the mock data just generated and store them in `localStorage`.
> 3. Also help me write `addProductTask` and `deleteProductTask` functions, each operation should synchronously update `localStorage`."

Through this step, your prototype has "memory", and user experience is almost indistinguishable from a real product.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Complete Flows', description: 'From single feature to complete loop' },
      { title: 'Inject Soul', description: 'Simulate real business data' },
      { title: 'Feedback Iteration', description: 'Fix experience based on real feedback' },
      { title: 'Final Project', description: 'Your graduation design' }
    ]" />
  </ClientOnly>
</div>

## 3. Collect Feedback and Quick Iteration

Building behind closed doors won't produce good products. Now your prototype has "core functionality" + "complete flows" + "demo data", it's time to show it to others.

### 3.1 Who to Test? How to Test?

- **Find friends/colleagues**: They don't need to understand technology, just let them try using it.
- **Observe, don't guide**: Don't say "click here", instead watch where they would click. If they can't find a button, the design has problems.
- **"Wizard of Oz" Method**: If your AI isn't connected yet, you can manually modify data in the backend (or database) to simulate AI returns, first validating whether users need this feature.

### 3.2 Facing Bugs and Complaints

- **Layout issues**: Might be messy at different screen sizes.
  - **Action**: Screenshot and send to AI IDE -> "It's messed up at this screen width, help me fix it."
- **Awkward operations**: "This flow is too complicated."
  - **Action**: Tell the suggestion to AI IDE -> "Users think upload-then-generate is too slow, can we change to one-click generate?"
- **New requirements**: "If only it had this feature."
  - **Action**: Evaluate if it's core. If yes, have AI quickly implement a simplified version.

**Remember: At this stage, AI is your best modification assistant. You just need to discover problems; leave code modifications to it.**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Complete Flows', description: 'From single feature to complete loop' },
      { title: 'Inject Soul', description: 'Simulate real business data' },
      { title: 'Feedback Iteration', description: 'Fix experience based on real feedback' },
      { title: 'Final Project', description: 'Your graduation design' }
    ]" />
  </ClientOnly>
</div>

## 4. Graduation Project: Complete Your "Final Design"

Congratulations! You've completed the entire process from "requirements" to "prototype" to "AI integration". Now it's time to showcase your final results.

**This final project is no longer limited to the "E-commerce Material Workbench"**. You need to combine your own interests or industry background to create a unique AI product prototype.

### Topic Selection and Requirements

You need to choose a scenario closest to your interests from **Industry Scenario References**, or conceive a completely new scenario based on your own ideas.

**The project must comprehensively apply everything learned in previous lessons:**

1. **Prototype Construction**: Use frontend technology to build beautiful, easy-to-use interfaces.
2. **Requirement Control**: Don't aim for comprehensive, but ensure core functionality logic is complete.
3. **API Integration**: Connect to real AI models (LLM/VLM, etc.), giving the application real intelligence.
4. **Implement a Playable Application**: Not just static pages, but a dynamic application with data flow and interactive feedback.

### Project Deliverables

Finally, you need to submit two things:

1. **A Complete Prototype Application**: Deployed online or runnable locally, with complete usage flows.
2. **30-Second Demo Video**: Record a video briefly introducing your application scenario and demonstrating core functionality in action.

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Final Challenge Checklist</div>
  </template>

  <p>
    This is Stage 1's final battle. Please check your work against this list:
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">Core Functionality Self-Check</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Clear Scenario</strong>: Selected a specific industry or application scenario</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Complete Logic</strong>: Core flow works end-to-end, not just Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>AI Driven</strong>: Actually calls large model APIs, not preset responses</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Complete Experience</strong>: Includes Loading, error handling, and mock data</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">Deliverables Preparation</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>Prototype Application</strong>: Code is complete and runnable</label></li>
    <li><label><input type="checkbox" disabled /> <strong>Demo Video</strong>: About 30 seconds, clearly showing core highlights</label></li>
  </ul>
</el-card>

## Next Steps

After completing the final project, you now have the ability to "independently develop AI application prototypes."
In the upcoming Stage 2, we'll dive into more complex full-stack development, learning how to turn this prototype into a truly deployable commercial-grade application with database and user systems.

See you in the next stage!
