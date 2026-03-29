---
title: I Built Each Student a Tireless "Straight-A Study Buddy"
description: The story of a high school IT teacher who used AI to build a coding learning companion.
---

# I Built Each Student a Tireless "Straight-A Study Buddy"

<p style="font-size: 52px; line-height: 1; margin: 0 0 12px;">🧑‍🏫</p>

**Narrated by: A high school information technology teacher**

I am a high school information technology teacher, the director of my school's information center, and also one of Shijiazhuang's AIGC seed teachers. Those titles may sound flashy, but in plain language, I am really trying to do just three things: train students well, reduce the burden on teachers, and improve the efficiency of teaching.

That is why I started learning AI and thinking about how to apply it. At first, it was both a work requirement and a personal interest. But what truly pushed me to build something was the Python practice course I was responsible for.

## 01 The Python Class That Nearly Drowned Me

The Python class I teach is not especially complex in terms of content. Students only need to write a simple program to calculate BMI: input height and weight, determine the category, and print the result. But for students with absolutely no programming background, entering a completely new field and understanding how it works is much harder than it looks.

Very often, what the teacher explains and what students actually understand are worlds apart. So the same points that had already been covered would keep coming back as repeated questions. Not long after I assigned the task, hands would shoot up from every direction, and the classroom would fill with calls of "Teacher! Teacher! Teacher!" It felt like standing in the middle of a noisy market, with every stall owner trying to get your attention at once.

Fifty students. One teacher. Every student got stuck in a different place. Some did not understand what `input()` was for. Some could not figure out how to write an `if` statement. Some did not understand type conversion at all. In a 45-minute class, I felt like a factory worker tightening screws nonstop. Just as I tightened one, three more would come loose beside it.

![The BMI task from that Python practice class](../../zh-cn/vibe-stories/images/story-3/image1.png)

Even though I never stopped moving, the number of students with raised hands never seemed to go down. Some waited a few minutes and still could not get help, so they started randomly fiddling with their computers. Others simply gave up and put their heads on the desk to sleep. When the bell rang and class ended, I stood in the computer lab looking at the chaos and suddenly felt powerless.

It was not the students' fault. They were already trying hard. It was not that I was teaching badly either. The problem was that the model itself was broken. Programming is not like math. You cannot solve everyone's problem by explaining one standard answer to the entire class. You can only guide them one by one.

## 02 What If Every Student Had a Tireless Top Student Beside Them?

That night, I could not sleep. Not because of anxiety, but because I kept thinking about one question: what if every student had an assistant who could answer questions at any time?

This assistant would not directly give away the answer. It would simply say things like, "There is a mistake here," "This function works like this," or "Try thinking about it from another angle."

It would be like that top student you once sat next to in school. When you got stuck, you asked a quick question, they gave you a hint, and then you figured the rest out yourself. That was when I suddenly realized AI might be able to become exactly that kind of "straight-A desk mate."

Existing AI coding tools could already give direct answers, but they still could not truly guide learning. So I decided to build a new application myself: an AI teaching assistant that could teach, guide, and stay with students as they worked through problems.

![Homepage prototype of the Information Technology Course Center](../../zh-cn/vibe-stories/images/story-3/image2.png)

## 03 From Idea to Reality: The Coding Learning Companion

Before this, I had only written some simple software. I had never built anything this complex. And I had no experience at all with AI-integrated application development, so honestly, I felt very unsure at the start. But that was also the first time I truly took an idea from my head and pushed it into the real world as a usable application.

During that period, I spent five consecutive nights checking in with the course and learning step by step. The hardest part of development was not writing code. It was choosing the AI API: which platform was free, which one was fast, which one was suitable for education, and so on. I had to test them one by one.

I still remember the first time I successfully integrated AI into the app. I typed in "How do I use the `input` function?" and saw it return sample code and an explanation. That feeling of excitement and relief is still vivid to me. I named the application **Information Technology Course Center**, and its core module was the **Coding Learning Companion**.

![The code review interface of the Coding Learning Companion](../../zh-cn/vibe-stories/images/story-3/image3.png)

It can do three things:

- **Answer basic knowledge questions**: when students ask "How do I write a `for` loop?" or "How do lists work?", the companion gives usage explanations and sample code, because these are foundational concepts rather than homework answers.
- **Guide homework problem solving**: when students bring a teacher-assigned question, the companion does not output the full solution. Instead, it uses Socratic questioning to guide the student toward figuring it out independently.
- **Review student code**: when students paste in their own code, the companion points out what is wrong, but does not directly rewrite everything for them.

Why design it this way? Because the point of learning is not just to "finish homework." It is to learn how to solve problems. If AI gives answers directly, students will only copy and paste. On the surface, the assignment gets turned in. In reality, nothing has been learned.

## 04 Assignments and Records Became the Next Problem

After the software was built, I tested it myself and felt pretty good about it. My colleagues looked at it and said, "This is fantastic. It solves our pain point." But in the first week after school started, a new problem appeared: students used the coding companion to solve issues in class, but where were they supposed to submit homework afterward?

Previously, we used an electronic classroom system in the computer lab. Students submitted work there, and I collected it on the teacher's machine. But that system had one fatal flaw: it only worked inside the computer lab. Once class ended, everything stopped. Outside the lab, students could neither continue working on assignments nor review their previous learning records.

So I spent a few more late evenings adding a complete class and course management system to the coding companion:

- Teachers can create classes and courses.
- After joining a class, students can see all course content and assignments.
- If they do not finish something in class, they can keep working on it and submit it afterward.
- Teachers can review assignments after class and send back incomplete work for revision.
- When a student passes every assignment in a course, the system automatically issues a course completion certificate.

![Course and class management interface](../../zh-cn/vibe-stories/images/story-3/image4.png)

That certificate was something I intentionally added. I know that for high school students, even a small sense of recognition and ceremony can make them feel, "I really learned something."

![A sample course completion certificate](../../zh-cn/vibe-stories/images/story-3/image5.png)

With the coding companion plus course management, the system finally formed a complete learning loop. It gave students a clearer beginning, a clearer ending, and a stronger sense of accomplishment.

## 05 If Only Every Teacher Had One More Helper

The students are on break now. The course management system has not yet been deployed at scale in real classes, but the feedback from colleagues who tested it has already made me confident: "This is exactly what we need." What surprised me even more is that the system may even be promoted to other schools across Shijiazhuang.

At first, I built it simply to solve a problem for the 50 students in my own class. I did not imagine doing anything bigger. But then I thought about it again: if information technology teachers across the whole city are facing the same dilemma, and every classroom is full of students calling "Teacher!" while there is only one teacher, then this tool really should be used by more people.

AI may be part of the answer. Not as a replacement for teachers, but as something that helps teachers so every student can receive more personalized guidance.

## 06 Closing

Finally, a few words about the technical side. I used Baidu Miaoda and deployed it at zero cost. Our school does not have a server budget, so that zero cost mattered a lot. In just five days, the product moved from an idea to an online application. Even learning Vibe Coding and building the app all happened in fragmented time at night.

I am not a professional developer, and I am definitely not a tech genius. I am just an ordinary high school information technology teacher who, on a sleepless night, wanted to solve a real problem. Later, I discovered that technology really can change education. Not in the grand narrative sense of some sweeping "education revolution," but in a specific, modest, and genuinely effective way.

If you are also an information technology teacher facing similar challenges, or simply someone interested in AI plus education, I would be happy to keep talking. Let's work together to make technology truly serve education.
