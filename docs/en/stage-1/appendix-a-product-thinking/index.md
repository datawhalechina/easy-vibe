---
title: 'Product Thinking and Solution Design'
description: 'Learn how to transition from building AI tools to thinking, judging, and polishing an AI application with sense. Master the core concepts and practical methods of product thinking.'
---

<script setup>
const duration = 'Approx. <strong>6 hours</strong>'
</script>

# Product Thinking and Solution Design

## Chapter Overview

<ChapterIntroduction :duration="duration" :tags="['Product Thinking', 'Requirement Analysis', 'Solution Design', 'User Insight']" coreOutput="1 complete product solution" expectedOutput="Actionable product design ideas">

In previous chapters, you've learned how to build various small tools in z.ai and local AI IDEs, and tried using Trae to handle engineering issues like environment configuration and dependency installation. You now have the ability to move ideas from browser to local projects.

Next, we need to shift our focus from <strong>"can it be built"</strong> to <strong>"what exactly should be built that's worth building"</strong>.

This lesson will systematically discuss:
- What counts as an "idea" and what makes a "good idea"
- How to judge whether a product direction is worth investing in
- How to use a repeatable process to turn vague inspiration into clear application solutions

<strong>Core Goal:</strong> Upgrade from being able to build tools to being able to create AI applications that people actually use and create real value.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Idea Sources', description: 'Find reliable product ideas' },
      { title: 'Solution Breakdown', description: 'Turn ideas into actionable apps' },
      { title: 'Polish & Judge', description: 'From usable to great' },
      { title: 'AI Amplification', description: 'Use AI to create value' }
    ]" />
  </ClientOnly>
</div>

## What You Will Learn

In summary, you will learn the basics of building an application: where ideas come from → how ideas become applications → how applications go from usable to great → how to use AI in applications → how to find users after completion.

1. I want to build an application, where do reliable ideas come from?
2. Once I have an idea, how do I break it down into something that can be built?
3. After building it, how do I judge and polish it into a "good application"?
4. At which step and how do I reasonably use AI to amplify value?
5. After having an application, how do I find the first batch of real users from zero?

# 1. I Want to Build an Application, Where Do Reliable Ideas Come From?

Many people, when mentioning building an application, their first reaction is: I need to think of a creative idea that's memorable enough. So they browse rankings every day, read reports, study various hot products, staring at others' success stories, hoping one day they'll encounter a particularly unique idea.

But the reality is, many people actually have no ideas at all, just anxious because they don't have ideas; some set a very high threshold from the start: if it's not interesting enough, don't start, thinking ordinary equals failure. But when you really walk a stretch of the road, you'll find that applications that can go far and steady are mostly not thought up in some late night brainstorm, but grow bit by bit in specific life scenarios, around real problems.

So, this chapter wants to solve a starting point problem: **How can I have an idea? Is this idea reliable? Is it worth your time and energy to turn it into a real application?**

## 1.1 What is an Idea

Let's start with a most basic but often overlooked question: what exactly counts as an idea.

In daily conversation, what people often call an idea is often a very subjective excitement. You might see a video on the street and instantly think this direction is so cool, so a sentence pops up in your mind: I can make something similar too. Or at a party chat, everyone complains about a product being hard to use, and you casually add: if only there was something that could automatically handle all this for me. At this moment, you do have a hazy thought, but it's still far from something that can be made.

Here, let's set a slightly more rigorous standard for ourselves. Only when a thought meets at least the following things, do we call it an idea:

First, **it must target a clear type of user**. Not vaguely saying everyone, but being able to clearly say who this is mainly for. Is it college students, workplace newcomers, parents with kids, or independent developers, e-commerce merchants, small business owners. Different people care about completely different things in the same matter. If you haven't even determined the crowd, then all subsequent judgments will be floating in the air.

Second, **it needs to be rooted in a specific scenario**. When is this application used by users, is it on the morning commute subway, during work breaks, before sleep, or on weekends when organizing materials. Even seemingly abstract tools, like notes and task management, if you observe carefully, the part that's actually used frequently is definitely tied very tightly to certain scenarios.

Third, **it needs to help users complete a clear task**. The task doesn't have to be big, but it needs to be expressible. Like organizing the day's to-do list, condensing a long article into a few key points, generating a structured meeting minute for a meeting, or generating a feasible route for a city weekend trip. The more specifically you can state the task, the easier it will be to design features and evaluate value later.

Fourth, **it provides a better approach or tool than the current situation**. How did users originally complete this task, was it by memory, paper notes, Excel, screenshot collections, or switching back and forth between different applications. If you can provide a clearly more effortless, more stable, more pleasant way, then this idea truly starts to have value.

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image1.png)

If you can't think clearly about the above, it doesn't matter. Now is the AI era, you can organize the above content into a complete prompt, then write your thoughts, target users and usage scenarios together, and hand it to a large model to help you complete and refine. Treat the model as an always-online product partner, repeatedly dialogue, question, modify, and you can turn a vague concept into something concrete.

## 1.2 Ideas and User Needs: The First Line of Defense Against Self-Indulgence

Many people, when building an application for the first time, most easily fall into the trap of self-indulgence. Self-indulgence means you're incredibly excited about your own creative idea, thinking this is a world-disrupting direction, but when you explain it to ordinary users, their reaction is often calm, even somewhat confused, just politely nodding and saying "sounds pretty good." However, after the product launches, they neither download nor use it long-term.

To avoid this situation, you must separate ideas from user needs.

Let's first talk about what **user needs** are. It can be summarized in a relatively simple sentence: in a specific scenario, **the various costs users hope to reduce, or various values they hope to increase, to achieve a certain goal.** The costs here include not just money, but also time, energy, mental burden, risk of making mistakes, and even social pressure. For example, a newcomer just entering the workplace might be willing to spend money on a set of templates, just to be less nervous during their first report; a parent with children might be willing to pay a bit more, as long as they can guarantee half an hour for themselves every day.

Understanding this, you'll find that **pure coolness doesn't constitute a need.** Many creative ideas are indeed novel enough, but if it doesn't make users more effortless, more at ease, more confident on some specific goal, then it's hard to support a truly sustainable application.

There's an often-overlooked gap between ideas and needs. **Ideas represent your subjective judgment rather than data support** - what you think is fun, interesting, looks avant-garde. Needs represent what users are actually experiencing and what they're worrying about. You might think an automatic poetry generation feature is very cool, but for most users, a tool that can save them ten minutes a day on repetitive organizing work might be more attractive. Unless you're like Jobs or have very good design aesthetic level, making everyone think "automatic poetry generation feature" is very cool and spontaneously want to follow you, but this has certain difficulty.

When judging a thought, there's a simple way to distinguish whether it's more like a **real need or a fake need**. A clear characteristic of real needs is that even without your application now, users are actively trying to solve this problem. Even if the current approach is clumsy, they're still willing to spend time, energy, even money to fill this gap. For example, some people write their own scripts just to reduce some repetitive labor for themselves. In these scenarios, if you can provide a friendlier, more universal solution, there's often an opportunity to stand firm.

The typical situation of fake needs is exactly the opposite. If you don't actively bring it up, most people won't realize that's a problem, and won't even feel it must be solved. The usage scenarios you describe exist more in your imagination than in users' daily lives. After hearing your introduction, they'll just think this thing is good, quite interesting, but won't pay, and might even turn around and forget. Such ideas are okay for writing stories, but very dangerous for making products.

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image2.png)

So, **the first line of defense against self-indulgence is understanding user needs.** From the beginning, you need to force yourself to answer a seemingly simple but very critical question: besides myself, who else is seriously worrying about this matter. You can go to forums, communities, comment sections, or directly ask a few people around you who might become users. If you rarely hear complaints with real emotion like "I get stuck on this every time" or "the current approach is really too troublesome," then it means this idea is still some distance from real needs.

## 1.3 Why Good Ideas Are Good Ideas

Not all ideas have the same fate. Some ideas, even if you only spend a few days making a rough but working version, will naturally attract a small group of real users who are willing to stay and patiently give you feedback. Other ideas, even if you desperately pile on features, spend money on ads, and do a lot of promotion on various platforms, can only briefly pile up some data through external force, and soon return to silence.

The most essential difference behind this is whether the idea itself has stepped on some key problem point.

**A good idea naturally welcomes growth**: Even appearing in a very crude form, with only a few simple buttons, as long as it can solve a specific small trouble for users, it can achieve a certain degree of natural growth. For example, a small tool that can quickly convert speech to text, at first might just be a webpage with a few simple buttons, but as long as the recognition quality is good enough and the function conversion is particularly natural, many people will be willing to forward the link to friends, because this simply saves them time.

**A bad idea is often destined from the start to rely on external force to drive**. Even if your appearance is particularly good, the core displays particularly high-end, you need to keep pushing, keep shouting, keep explaining, but once your recruitment action slows down, usage data will slide straight down. You keep throwing resources in, pulling partnerships, doing activities, but always feel like you're going against the current. The problem isn't that you didn't execute well enough, but that the point itself didn't hit a real enough pain point.

Of course, the above situations aren't absolute. For example, in early markets, users might not realize value has some lag. For example, when there are competing products, we also need to consider appearance, operation difficulty, brand characteristics, etc., but these are deeper content, not considered for now.

So, when we discuss whether to continue investing in an idea, what we should really focus on isn't how flashy the creativity itself is, but whether it can naturally grow a path from problem to solution. We make ideas not just to prove to others how creative we are, but to find a valuable starting point, along which we can slowly polish a small tool into a truly useful application.

Choice is more important than effort.

## 1.4 Where Good Ideas Come From: Four Sources and Specific Examples

Many people, when mentioning thinking of ideas, the picture that comes to mind is a person stuck at a desk, staring at the ceiling, hoping one day inspiration will suddenly fall and hit them. Real good ideas, however, mostly don't come this way. They more often come from small observations in life, repeated questions in communities, piles of complaints on the internet, and being sifted out bit by bit from existing products.

These four sources below, if you're willing to seriously do them, are easy to dig out directions you can start with.

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image3.png)

### Love Your Own Life

A very simple but effective principle is: **the more participatory you are in life, the easier it is to discover problems, and the more capable you are of judging what problems are worth solving.** So-called participatory means you're not watching others live through a screen, but personally experiencing, trying, and making mistakes. The more seriously you treat your hobbies, the more likely they'll become fertile ground for ideas to grow.

For example, if you particularly love raising cats, a day you live with a cat yourself often has more information value than scrolling through a hundred "cat raising tips." You'll know where cats are most likely to knock things over, remember what time every day they're most active, in which situations they're most easily stressed, and personally experience details like cleaning litter boxes, brushing fur, trimming nails, and vet visits. **Every slightly unsmooth experience is actually a potential product clue.**

Like taking photos of your cat: many people have encountered the situation where you're holding your phone up, but the cat just won't look at the lens, either lowering its head to lick paws or staring at some other corner. Could there be a small tool that makes your phone or tablet screen show an automatically moving red dot, feather, or bug animation, specifically attracting the cat's attention? When you press the photo button, it automatically waves around near the front camera, "tricking" the cat's gaze toward the lens, and conveniently takes several consecutive shots, helping you pick out the clear and good-looking one. Thinking one step further, this app could also record which color and movement trajectory each cat is most interested in, next time automatically using its "exclusive" teasing mode to increase success rate.

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image4.png)

If you enjoy makeup or skincare, every bottle on your cabinet represents a lot of trial and error and decision-making. You might already be used to taking photos of each makeup look with your phone album, but every time you look back, you have to recall bit by bit which lipstick and which eyeshadow palette you used that day. Could these pieces of information be systematically recorded to create your own makeup look collection? The app could even help you count which makeup looks you use most in what occasions, which combinations perform best in photos, so you don't have to think from scratch every time you choose makeup.

More specifically, many people have this scenario: morning time is tight, you open the album wanting to find "that successful commuter makeup from last time," but after scrolling for ages, you still can't remember which products you actually used. Could there be a small feature where after taking a makeup photo, you just casually say to your phone: "Today is interview makeup, used #01 orange-brown eyeshadow palette and bean paste color lipstick," and the app automatically recognizes and generates a "makeup recipe" bound to the photo? Next time you just search "interview," "orange-brown eyeshadow," "bean paste," and you can instantly see all related makeup looks, and even automatically generate a "today only show commuter-suitable, five-minute-complete makeup" recommendation list. Those few minutes you save every morning are actually a very specific "solved problem."

If you like city walks or various forms of slow travel, you might already be piecing together your experience with various tools: map software recording routes, notes listing cafes to visit, photos and thoughts scattered in albums. Could there be an app that combines routes, check-in points, photos, and text into a walking log with timeline and story? Even further, share your route with friends with one click, letting them walk out different versions in the same city.

You could also dig into a more daily detail: many people during city walks have the frustration of "feeling this corner is beautiful in the moment, but completely unable to find that spot on the map after going home." Could there be a super lightweight feature: when you walk to a corner that feels right, just hold down your earphone button and say "mark this, it's a road suitable for date walks," and the app instantly drops a voice-tagged marker at your current location, automatically recording time, weather, and noise level. Later, you or your friends, just by opening this city's map, can see these "pedestrian-tested atmosphere points": where's good for spacing out alone, where's good for night views, where's good for walking and chatting with friends. Those small intersections that would have been "forgotten after walking past" slowly grow into a textured city experience database.

These examples actually want to illustrate just one thing: **you need to love your life, life is your best source of ideas.** Every confusion encountered, temporary workarounds invented, those places you feel are a bit troublesome but have been tolerating - as long as you're willing to look a bit more, ask whether it's possible to use a small tool to change it a bit, they all have the potential to become future product prototypes.

### Dig From Your Crowd Assets

So-called crowd assets, simply put, are a group of people you can already reach. It could be your readers, communities you operate, your company's internal colleague group, or an interest community you've long participated in. As long as you have channels to **stably hear what some people are talking about, worrying about, and expecting every day**, then you have a big advantage over someone starting completely from scratch.

Take a very common example. If you're an organizer of a designer community, what you can see in the group every day is actually an extremely precious pool of needs. Some complain about clients always revising drafts repeatedly, some are dissatisfied with certain material websites' charging methods, some feel wasting too much time adjusting between different size specifications. Behind every complaint hides a potential product clue. For example, you could make a simple size adaptation tool that generates one design into various common platform size ratios with one click; or make a small tool that can save and reuse common components, helping designers complete repetitive work with less time.

If you're in an exam preparation community, the group might long be filled with similar topics: today's state isn't good, the plan was delayed again, what materials to read more efficiently, how to persist in check-ins. You don't need to imagine out of thin air, just observe for a while, organize the several common difficulties repeatedly mentioned by everyone, and you can roughly outline the initial functional direction of a learning application: like more reasonable goal breakdown, more humanized check-in feedback, more realistic progress visualization.

In these scenarios, you don't have to try to make a big and comprehensive product for everyone from the start. You just need to admit one thing: this small circle of people in your hands is your best starting point. The deeper you understand them, the more you know those spoken and unspoken small annoyances in their real lives, the more opportunity you have to make something truly used.

### Dig Needs From Public Spaces

Even if you temporarily don't have any community or reader group of your own, don't worry at all. Every day countless people on the internet are loudly telling their difficulties and dissatisfaction on various platforms. These voices in public spaces are themselves a huge treasure trove, just that most people never seriously listen.

You can select several platforms related to industries you're interested in, regularly search for keywords with emotional colors. For example, **so annoying, any recommendations, how to solve, really troublesome, any better way.** Then patiently look through those posts and comments, focusing on two types of information.

One type is certain problems being mentioned repeatedly over a long period. For example, in job hunting sections, every so often someone comes to ask how to write a resume, how to prepare self-introduction, how to follow up on interview results; in parent groups, confusion about complementary food combinations, sleep schedule adjustment, and parent-child communication repeatedly appears; in small merchant exchange communities, everyone might always be worrying about inventory management, cash flow, and employee scheduling. These long-existing repeated problems are systematic pain points repeatedly exposed by an industry.

The other type is in certain scenarios, users are barely coping in very clumsy ways. For example, some people write all to-do items on paper, then take photos to upload to the cloud; some copy and paste back and forth between different applications, just to convert content from one format to another; some manually organize data from different channels into one table. In these places, as long as you observe carefully, you'll find many small cuts that can be proceduralized and toolized.

Digging for needs in public spaces is actually training an ability: turning yourself from a bystander into a catcher. When you habitually search these keywords, habitually record cases, your brain will slowly accumulate a set of sensitivity to real problems, this sensitivity will help you again and again in your subsequent product design process.

---

Please complete the following assignments based on the above content:

1. Please use any large language model, for your previous idea, let AI reference the Double Diamond model to give divergent results, you need to select a feasible solution from the divergent results.
2. Based on the idea you came up with before, use the breakdown refinement method to get more specific executable content. Similar to: "Provide users with a web tool that lets them upload a text-only PDF of no more than 20 pages, and get an editable text with clear paragraph structure and preserved heading hierarchy within 10 seconds, supporting one-click copy and download as .txt."
3. Based on the refined idea, try to draw your application on a whiteboard. The application needs to focus on two parts: how the UI should be designed, and what features there should be, where each feature is located.

# 3. After Building, How to Judge and Polish into a Good Application

When you finally build the first version and put it into the real world for people to use, you'll enter a completely different stage. All previous discussions were still at the idea and design level, and now, the product will be tested by real usage scenarios for the first time. You'll see where users click wrong, where they hesitate, where they get stuck, and also see where they proceed surprisingly smoothly, even unexpectedly lingering a few extra seconds in some corner. These details are far more honest than all your imaginations about the product in your mind.

This chapter wants to solve a core problem: when an application has already been built, and even has a batch of early users using it, how to judge how far it is from a good application, and how to use this information from real usage to polish it step by step.

## 3.1 What is a Good Application: 4 Core Characteristics

To judge whether an application is good, you can't just look at how much you like it yourself, nor just look at download numbers or one or two days of usage count, but look at whether it has some more fundamental, more stable characteristics. Simply speaking, refer to the following characteristics:

### Good Applications Bring Concrete Value

The most direct characteristic of a good application is that it can let people get some real benefit in some scenario. This benefit doesn't have to be grand, nor does it need to be packaged in profound language, but must be specific enough that you can clearly say: **what exactly did it help users do less, how much time did it save, or what did it make less error-prone.**

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image14.png)

For example, a simple meeting minutes tool, if it can automatically generate a structured meeting minute after uploading a recording or directly recording during a meeting, and clearly list action items, responsible persons, and deadlines, then what it saves users is not just typing time, but the entire mental effort from recording, organizing, screening to formatted output. You can very clearly say that this tool probably saves one person twenty minutes per meeting. And if the entire team has ten such meetings every week, then the total time saved is very considerable.

Another example is a seemingly unremarkable image compression tool, if it can compress a batch of images to one-third of their original size while keeping differences almost invisible to the naked eye, while ensuring one-click export, folder structure not messed up, and naming rules unified, then the value it brings is not just hard drive space savings, but also faster transmission, smoother uploads, and fewer errors when interfacing with other systems. This seemingly ordinary concrete value is often much more reliable than a vague "efficiency improvement."

So, when you say your application has value, it's best to break the value into one or two specific scenarios, explain in language ordinary people can understand: your application makes what users originally needed to spend how long, do how much manual work, bear how much risk, become more effortless.

### Users Can Get Started Easily, Almost Without Needing Instructions

Another easily underestimated but extremely important characteristic is that **good applications usually don't need much explanation.** When users open it for the first time, they can intuitively know roughly where to start, what will happen when clicking what, the largest button usually does the most core thing, the most important entrance is placed in a truly important position, not hidden in the third layer of the menu.

You can imagine a new user who just downloaded your application, they might have opened it casually while queuing, on the bus, or in a coffee shop. The network signal might not be very good at the time, and they don't have patience to read any long instructions. The confusion time they can tolerate is often only a few seconds. If in these few seconds they don't see any clear guidance, don't know what to do next, it's easy to just close it and never come back.

So, when you feel the product logic is smooth yourself, it's best to find someone who has never seen your application, let them explore from scratch without you speaking. You just observe where they pause, where they hesitate, when they show that "what is this" expression. If users are blocked by various splash screen popups, complex options, and account binding right when entering, it's hard to seriously experience the value you truly want to provide.

**Being easy to get started is essentially a form of respect for user costs from the product.** You're acknowledging one thing: no one has an obligation to spend time studying your application.

### In High-Frequency or Key Scenarios, Users Naturally Think of You

Good applications often have a stable usage rhythm, either high-frequency or key. **High-frequency means it integrates into users' daily lives, for example, messaging apps opened several times a day**, commuting tools used every day to and from work, check-in apps recorded daily. Key means even if not used every day, once encountering certain scenarios, users will think of you first, like tax filing tools, renovation budget calculators, interview question management tools, visa document checklist assistants.

You can ask yourself a few questions: when exactly and in what situation will users use you; if they miss you, will they really feel inconvenience; in similar scenarios, what method are they currently using to get by. If there's an alternative, even if very troublesome, but already habituated, then what you need to do is not just feature parity, but make them feel that switching to you is indeed more worthwhile.

A common misconception is directly binding usage frequency with application quality. Actually, it's not necessary. For example, making annual reports, processing certain documents, making a large transfer - these things themselves aren't high frequency, but once they happen, for users, they're among the most important things at the moment. **If your application can handle this type of key scenario steadily, quickly, and with confidence, then it can also be called a good application.**

**What really needs vigilance is that type where users neither use you frequently nor actively think of you at any key moment**, and even if your application disappeared from their phone, they'd only vaguely remember having installed such a thing months later when clearing memory. This situation often indicates your application hasn't deeply bound with any real scenario, just piled some weak presence at the functional level.

### Altruism

Many people when starting to make products, simultaneously calculating several things in their minds: how to charge after building, how to raise prices, how to make users pay for a bit more usage, how to lock data to prevent users from migrating away. Business calculations themselves aren't problematic, but if the thinking completely revolves around these from the start, it's easy to make applications full of wariness at first glance: asking for various permissions right away,花样收费点 everywhere, feature design clearly not for letting users smoothly complete tasks, but trying to guide users to some payment button.

In contrast, truly good applications all carry a relatively simple altruism. It indeed thinks clearly about how to survive, and also sets reasonable charging methods, but when designing paths and experiences, the priority is always: **how to make it easier for users to smoothly complete this matter, not how to add a step to create extra obstacles.** You'll see it uses more user-friendly methods in many places, like giving clear prompts at key steps, not overly setting barriers for export and migration, letting you experience at least some real value before charging.

This altruism is often reflected in some tiny design details. For example, that form field doesn't randomly ask for a bunch of data unrelated to the task just to collect more information, the tutorial sequence is designed around the goal users want to complete, not around feature modules themselves. You can feel this application is seriously helping you accomplish one thing, not treating you as an object to be squeezed.

There's another important point: **good applications don't have to be big applications. They can be very small, only serving one type of person, one scenario, one task**, but doing it very well in that small piece. For example, specifically helping designers export drafts to formats required by print shops, or specifically helping freelancers organize personal project cases - these ranges aren't large, but the value inside isn't small at all.

## 3.2 Insight into Needs: Maslow's Hierarchy of Needs Theory

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image16.png)

Before making an application, many people jump directly to the functional level thinking: can something more be done here, should a button be added there. What truly determines whether an application can survive is which level of human needs you've stepped on, and how accurately you've stepped.

The reason Maslow's hierarchy of needs theory is repeatedly mentioned in so many fields isn't because it's very rigorous, but because it provides a sufficiently usable observation framework. You don't need to treat it as a strict psychological conclusion, just treat it as a simple framework: helping you hang users' various motivations on several relatively clear levels, convenient for you to judge which type of need your application is satisfying. The more needs you can satisfy, the better the application.

Maslow's hierarchy of needs theory is usually divided into five levels, from bottom to top: physiological needs, safety needs, belonging and love, esteem needs, self-actualization.

### Physiological and Survival-Related Needs

This level is most basic, directly related to eating, sleeping, survival state itself. Sounds like it might be far from internet products, but actually quite a few applications play a role at this level.

For example, food delivery, grocery shopping, errand running, hotel booking, ride-hailing - these typical home and travel services are essentially helping users solve most basic problems like eating, going out, and resting with lower time costs. Another example is fitness tracking, sleep monitoring, diet check-ins - although appearing more health management-oriented, for many people, they're trying to maintain a body state that won't spiral out of control, which can also be seen as an extension of the physiological and survival level.

If your application works at this level, one characteristic is: **users will be particularly sensitive to stability, reliability, and predictability.** Food delivery not arriving, ride-hailing not getting a car for a long time, hotel booking information errors - the emotional reactions brought by these problems will be very strong, because these problems directly interrupt the basic rhythm of life.

### Safety and Certainty Needs

Safety needs include physical-level safety, as well as economic, information, and psychological security.

Many tool-type applications actually mainly work at this safety level. For example, accounting, asset management, insurance assistants, contract template tools, password managers, backup tools, privacy protection tools, cloud drive sync, data recovery. The core promise of these applications is often: help you reduce error probability, help you have backup plans when things go wrong, or at least let you have confidence.

A typical type is various anti-loss, anti-forget, anti-error small tools: schedule reminders, medication reminders, important document expiration reminders, key node memos. This type of application even if it only reminds you a few times a day, as long as it saves you once or twice at critical moments, it will quickly be classified by you as a must-keep type of tool.

When designing this type of product, you can ask one more question: **what type of risk exactly are you helping users reduce, is it financial, time, relationship**, or compliance and legal. If even you can't explain clearly, then users will find it hard to truly trust you.

### Belonging, Connection, and Being Seen

Going up another level is the need for belonging and love. Simply put, I don't want to be alone, I want to be connected with certain people. This level is the home base for social, community, and interest group applications.

Moments, group chats, interest forums, hobby communities, online book clubs, guilds in games, even some tools centered around specific identities, like new parent groups, international student mutual aid, industry internal anonymous complaint platforms - essentially all provide some sense of belonging: there's a group of people similar to me, we're looking at similar topics, complaining about similar difficulties, sharing similar experiences.

Some tools appear to be functional applications on the surface, but what truly retains users is often this level of need. For example, in accounting apps where everyone shares their saving progress, ranking and check-in circles in running apps, mutual supervision groups in learning apps. These seemingly value-added social modules are actually letting users bind your application with their own group identity.

If your application tries to stand at this level, having content alone isn't enough, you need to think about: **why would users feel this is their own people, are they willing to leave traces here, have some slight but real interaction with others.** Otherwise, what you're making is just a one-way broadcast tool.

### Esteem, Self-Worth, and Achievement

Going up another level is esteem and self-esteem needs. People don't just want to be accepted, at some stage they'll start caring: am I considered a pretty good person here, have I been seen, recognized, does anyone know about the things I've accomplished.

Large amounts of check-ins, badges, leaderboards, titles, achievement systems are actually playing a role at this level. Learning apps give you a title after completing certain course hours, exercise apps give you a certificate after reaching goals, creation platforms give authors different level identity markers, communities have obvious highlighting for quality content authors.

A common mistake here is thinking that adding a bunch of badges, points, and titles will stimulate users. What users want isn't flashy decorations, but that my real effort is recorded and taken seriously. If your achievement system is completely disconnected from users' real investment, like getting a "senior" title with just a few random clicks, then this incentive will quickly fail, even make people feel cheap.

So at this level, the key isn't whether you've made an incentive system, but: **has your application provided a stage where users can accumulate, letting them clearly see their change from beginner to proficient**, and at key nodes, giving them a ritual sense that "this step is worth remembering."

### Self-Actualization and Self-Transcendence

The top of the pyramid points to what kind of person I want to become, and what part of myself I want to contribute. This sounds abstract, but when it falls into specific scenarios, it often has very practical manifestations.

For example, creation tools: writing, painting, music production, video editing, programming project management - on the surface they're providing technical capabilities, but behind they're承接 users' desire to create something of their own. Another example is some long-term learning platforms, career planning tools, habit formation tools - they serve not just single skills, but some longer-term self-growth goals.

There's another type: the need to make others better. Many people use knowledge sharing platforms, Q&A communities, public welfare applications, collaborative creation tools not just to earn some points or traffic, but because when helping others and pushing a project forward, there's a feeling that I'm doing something meaningful, which also belongs to self-actualization.

When your application truly touches this level, it often has a very strong stickiness: even if the interface isn't the prettiest, features aren't necessarily the most complete, users will still stay here, because **it has established a deeper connection with who I am and what kind of things I'm doing.**

A benefit of treating Maslow's pyramid as a product perspective is that it can help you avoid two common biases.

**The first bias is only staring at some wrong level.** For example, you're making a tool to help users safely store files, essentially standing at the safety level, but you blindly imitate social products, piling various likes, comments, leaderboards on the interface, resulting in neither grabbing social product users' mindshare nor making people who just want a reliable storage tool feel you're not doing your job.

**The second bias is ignoring the sequence between levels.** When a person can't even get the most basic stable usage experience guaranteed, it's hard to seriously pursue self-actualization here. For example, if the app crashes frequently and data is occasionally lost, no matter how many badges and growth curves you give, users won't genuinely invest. Conversely, if you do solidly at the basic level, then gradually stack higher-level value, users will more easily follow you up.

In actual design, you can self-check like this:

- First ask yourself: which level is my application mainly and most core satisfying, only allowed to choose one level
- Then ask: above this core level, do I have opportunity to naturally extend to the next level, not hard-sticking a concept on
- Finally, take a look: in those levels lower than my target level, do I have obvious shortcomings, even dragging users down

When you can answer these questions clearly, your understanding of what users really want is no longer just staying at the vague level of "feeling they might like it," which helps you make better applications.

## 3.3 Classify by User Type: Differences Between C-End and B-End Applications

After an application is built, you'll quickly discover another important thing: facing ordinary individual users versus facing enterprise or institutional users are two completely different games. They both look like users, but care about completely different priorities.

- C-End (Consumer End): refers to "consumer end," the core is ordinary individual users.
  For example, WeChat, Douyin, Meituan food delivery that we use daily - the users of these Apps are individual persons one by one. This type of scenario serving individuals is C-End business.
- B-End (Business End): refers to "enterprise end," the core is enterprise, institution, or organization users.
  For example, DingTalk (enterprise collaboration tool) used in companies, financial software (like Yonyou, Kingdee), POS systems in retail stores - the users of these products are enterprise employees, teams, or entire organizations, serving enterprises' operation, management, production and other needs. This type of scenario serving organizations is B-End business.

### C-End Applications: Facing Ordinary People's Lives, Emotions, and Habits

C-End applications face individual users, embedded in everyone's daily life. Common types include content, tools, entertainment, social, learning, etc.

![](../../../zh-cn/stage-1/appendix-a-product-thinking/images/image17.png)

Content applications, like news reading, short video platforms, podcast tools. Their core task is usually to screen out content users are interested in from massive information within limited time. Also need to ensure there's constantly new things attracting users back.

Tool applications, like accounting, to-do items, file management, calendar scheduling. They often provide a handier solution than the original way on some specific task, belonging to one of the infrastructure users use daily.

Entertainment applications, including games, light interaction, fun small tools. They provide users with emotional relaxation and pleasure. The standard for measuring good or not is more about whether users are willing to continuously spend time on it.

Social applications revolve around connection and interaction between people. Learning applications revolve around improvement of some ability, like vocabulary memorization, question practice, reading check-ins, course management.

Although these applications have different types, they have several common concerns.

**First, user growth.** That is, how to let more people try your application for the first time. This involves channels, communication copy, user incentives, but the premise is always: you first need to have a clear enough usage scenario. Otherwise, even the most powerful growth methods can only bring a wave of short-term curiosity.

**Second, retention and return visits.** Not about whether people have come, but whether they're willing to stay and come back. A content application, if it can't guarantee continuously producing content users are interested in, will soon be replaced; a tool application, if it doesn't help users truly complete tasks in several key uses, it's also hard to establish long-term usage habits. You can judge how many people have truly incorporated you into their life rhythm by observing retention on day 1, day 7, and day 30.

**Third, conversion and payment.** Why users are willing to pay usually isn't because you made the free version very bad, but because after they've already obtained some value from you, they see that paid features can bring higher-level convenience. For example, higher usage quotas, stronger collaboration capabilities, more professional templates, more stable performance.

**Fourth, shareability and spread.** Many C-End products can quickly spread because they naturally have sharing attributes during use. For example, generating an image, a video, a piece of text - users themselves need to send the result to others to complete their own goals. In this process, as long as you make brand exposure natural and not annoying, you can gain some word-of-mouth spread.
