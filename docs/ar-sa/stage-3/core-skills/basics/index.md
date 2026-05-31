# دليل البدء السريع الأساسي لـ Claude Code

Claude Code هي أداة البرمجة الذكية بالذكاء الاصطناعي الرسمية من Anthropic. تدمج قدرات النماذج اللغوية الكبيرة مباشرة في الطرفية، مما يتيح لك إكمال مهام البرمجة من خلال التعاون مع الذكاء الاصطناعي بلغة طبيعية. على عكس أدوات إكمال الكود التقليدية، يمكن لـ Claude Code فهم سياق المشروع بالكامل وتنفيذ مهام تطوير معقدة. من إنشاء الكود إلى إعادة الهيكلة، ومن تصحيح الأخطاء إلى كتابة الوثائق، يمكنه التعامل مع كل شيء.

يساعدك هذا الفصل على إتقان الاستخدام الأساسي لـ Claude Code بسرعة، بما في ذلك التثبيت والإعداد، والعمليات الأساسية، والتقنيات العملية، والأوامر الشائعة. سواء كانت هذه أول مرة تستخدم فيها أداة برمجة بالذكاء الاصطناعي، أو كنت ترغب في استخدام Claude Code بكفاءة أكبر، ستجد ما تحتاجه هنا.

---

## التثبيت السريع

Claude Code مبني على Node.js، لذا تأكد قبل التثبيت من أن Node.js الإصدار 18 أو أحدث مثبت على نظامك. العملية بسيطة جدًا وعادة ما تستغرق بضع دقائق فقط.

### لماذا تحتاج Claude Code

في سير عمل التطوير التقليدي، يتبادل المطورون التبديل بشكل متكرر بين المحرر والطرفية والمتصفح والوثائق. يوحد Claude Code هذه العمليات في واجهة واحدة: في نفس نافذة الطرفية، يمكنك كتابة الكود، وتشغيل الاختبارات، وقراءة الوثائق، بل والتعاون مع زملائك. والأهم من ذلك، يمكنه فهم هيكل مشروعك وتذكر عاداتك في البرمجة، ليصبح مساعد برمجة حقيقيًا.

### الطريقة 1: التثبيت اليدوي

التثبيت اليدوي مناسب للمطورين الذين يحبون التحكم الكامل في كل خطوة، كما يساعدك على فهم مكونات الأداة بوضوح.

```bash
# تثبيت Claude Code CLI عالميًا
# استخدم -g للتثبيت العام، حتى يمكن استخدامه في أي مجلد
npm install -g @anthropic-ai/claude-code

# التحقق من التثبيت
# إذا ظهر رقم الإصدار (مثلاً 0.1.25)، فقد نجح التثبيت
claude --version
```

أثناء التثبيت، يقوم npm تلقائيًا بتنزيل التبعيات وتكوين متغيرات البيئة. إذا واجهت مشاكل في الصلاحيات، جرب `sudo` (macOS/Linux) أو شغّل الطرفية كمسؤول (Windows).

### الطريقة 2: دع وكيل الذكاء الاصطناعي يثبته لك

إذا كنت تستخدم بالفعل مساعدين آخرين للبرمجة بالذكاء الاصطناعي (مثل Cursor أو Windsurf أو وكيل AI في هذا المشروع)، يمكنك تركهم يكملون التثبيت نيابة عنك. الفائدة هي أن الذكاء الاصطناعي يمكنه اكتشاف بيئتك تلقائيًا، والتعامل مع تعارضات التبعيات، واختيار أفضل مسار تثبيت لنظامك.

**ما عليك سوى القول:**

```text
Help me install Anthropic Claude Code.
```

أو بشكل أكثر تحديدًا:

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

سيقوم وكيل الذكاء الاصطناعي بـ:
1. التحقق من إصدار Node.js الحالي
2. تنبيهك للترقية إذا لم تكن المتطلبات مستوفاة
3. تشغيل أوامر التثبيت
4. التحقق من نتيجة التثبيت
5. محاولة الإصلاح التلقائي إذا كانت هناك مشاكل

### الإطلاق الأولي والتهيئة

بعد التثبيت، انتقل إلى مجلد مشروعك وابدأ Claude Code:

```bash
# الانتقال إلى مجلد المشروع (يعمل Claude Code في المجلد الحالي)
cd /path/to/your/project

# بدء Claude Code
claude
```

عند الإطلاق الأول، يرشدك Claude Code خلال عدة خطوات إعداد مهمة:

1. **تسجيل الدخول إلى حساب Anthropic**: تحتاج حساب Anthropic لاستخدام Claude Code. إذا لم يكن لديك واحد، سيُطلب منك التسجيل.
2. **اختيار خطة**:
   - **الخطة المجانية**: مناسبة للتعلم الشخصي والاستخدام الخفيف، مع حدود على المكالمات
   - **خطة Pro**: مناسبة للمطورين المحترفين، مع حصة أعلى وأولوية في الاستجابة
3. **قبول الشروط**: اقرأ ووافق على شروط Anthropic وسياسة الخصوصية
4. **اختياري: تكوين مفتاح API**: إذا كان لديك مفتاح مخصص (مثلاً من مزود طرف ثالث)، قم بتكوينه هنا

::: info ملاحظة خاصة لمستخدمي بر الصين الرئيسي

بسبب أسباب تتعلق بالشبكة، قد لا يتمكن مستخدمو بر الصين الرئيسي من الوصول مباشرة إلى خدمات Anthropic الرسمية. يدعم Claude Code خدمات الأطراف الثالثة المتوافقة مع تنسيق Anthropic API، وهذا ممكن تقنيًا.

**لديك خياران:**

1. **استخدام رمز API مباشرة**: اشترِ رمزًا من مزود متوافق مع Anthropic API وقم بتكوينه بمتغيرات البيئة
2. **استخدام خطة برمجة**: بعض المزودين يقدمون خططًا محسّنة للبرمجة تكون عادةً أكثر فعالية من حيث التكلفة لسيناريوهات البرمجة

**النهج الموصى به**: دع وكيل الذكاء الاصطناعي يساعدك في التكوين. تحتاج فقط إلى تقديم معلومات تكوين المزود (نقطة نهاية API، المفتاح، إلخ)، ويمكن للذكاء الاصطناعي تعيين متغيرات البيئة بشكل صحيح.

**راجع دليل الإعداد التفصيلي:** [كيفية تثبيت Claude Code وتكوين متغيرات البيئة](/ar-sa/stage-2/backend/modern-cli/)

:::

---

## البدء السريع: قم بإجراء بعض التجارب الصغيرة

بعد التثبيت، لا تتسرع في المشاريع الرسمية. قم بإجراء بعض التجارب الصغيرة أولاً لفهم كيف يعمل Claude Code. هذه التجارب الثلاث مصممة من السهل إلى المتقدم، وتقابل ثلاث قدرات أساسية: فهم اللغة الطبيعية، وإنشاء المحتوى، وتنفيذ الكود.

### التجربة 1: المحادثة - الشعور بفهم الذكاء الاصطناعي

الهدف هو تجربة فهم Claude Code للغة الطبيعية. على عكس محركات البحث العادية، يمكن لـ Claude Code فهم السياق، وإجراء محادثات متعددة الأدوار، وتعديل الإجابات بناءً على ملاحظاتك.

**جرب هذه المطالبات:**

```text
Hello, who are you?
```

يقدم Claude نفسه كـ Claude Code، مساعد برمجة بالذكاء الاصطناعي من Anthropic.

```text
What is a closure? Give me the too-long-didnt-read version.
```

لاحظ كيف يستخدم Claude "too-long-didnt-read" كتلميح ويعطي شرحًا موجزًا ودقيقًا.

```text
What is the difference between JavaScript and TypeScript?
```

هذا سؤال مقارنة تقنية. تحقق مما إذا كان Claude يقدم إجابة منظمة ومتعمقة.

**نقطة التجربة**: لاحظ أسلوب استجابة Claude. عادةً ما يعطي الاستنتاج الأساسي أولاً، ثم التفاصيل. هذا الأسلوب "الهرمي المقلوب" ممتاز للاسترجاع السريع للمعلومات.

### التجربة 2: إنشاء مستند Markdown - تجربة إنشاء المحتوى

توضح هذه التجربة قدرة Claude Code على إنشاء المحتوى. بالنسبة للمطورين، كتابة الوثائق غالبًا ما تكون مؤلمة. يمكن لـ Claude إنشاء وثائق واضحة وكاملة بسرعة من المتطلبات.

**أدخل هذا التعليم:**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**ما يفعله Claude:**

1. تحليل متطلباتك: أوامر Git الشائعة، تنسيق Markdown، وثلاثة عناصر (أمر/شرح/مثال)
2. تخطيط هيكل المستند: عادةً مجمعة حسب سيناريو الاستخدام (التهيئة، التطوير اليومي، سير عمل الفروع، التعاون عن بُعد، إلخ)
3. إنشاء المحتوى: شرح موجز وأمثلة عملية لكل أمر
4. تنسيق الإخراج: استخدام بناء جملة Markdown وهيكل مناسب

**نموذج إخراج متوقع**:

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**محاولات متقدمة**: يمكنك إضافة متطلبات إضافية مثل "أضف تعليقات صينية"، "رتّب حسب التكرار"، "أضف معالجة الأخطاء الشائعة"، إلخ، ولاحظ كيف يكيف Claude مخرجاته.

### التجربة 3: كتابة وتشغيل لعبة - سير عمل البرمجة من البداية للنهاية

هذه هي التجربة الأكثر تحديًا. توضح سير عمل Claude Code الكامل: فهم المتطلبات، كتابة الكود، إنشاء الملفات، تشغيل البرنامج، ومعالجة الأخطاء. من خلالها، يمكنك الشعور حقًا بقوة مساعد البرمجة بالذكاء الاصطناعي.

**أدخل هذا التعليم:**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**ينفذ Claude هذه الخطوات:**

**الخطوة 1: فحص البيئة**
- التحقق مما إذا كان Python مثبتًا
- التحقق مما إذا كان pygame متاحًا
- تنبيه التثبيت إذا كان مفقودًا

**الخطوة 2: كتابة الكود**
- إنشاء ملف دخول اللعبة (مثلاً `snake_game.py`)
- تنفيذ الحركة، وتوليد الطعام، واكتشاف التصادم
- إضافة عرض النتائج
- تنفيذ الخروج بـ ESC

**الخطوة 3: تشغيل اللعبة**
- تنفيذ سكربت Python وإطلاق اللعبة
- تظهر نافذة اللعبة، استخدم مفاتيح الأسهم للتحكم في الثعبان

**الخطوة 4: دعم المتابعة**
- إذا كان هناك خطأ، يمكنك القول مباشرة "الثعبان يمكنه اختراق الجدران، أصلحه"
- إذا كنت تريد ميزات إضافية، مثل "زيادة الصعوبة مع النتائج"، يمكن لـ Claude الاستمرار في التعديل

**قيمة هذه التجربة:**

1. **التحقق من الإعداد**: تأكيد أن Claude Code يمكنه تنفيذ الكود بشكل صحيح
2. **تجربة التفاعل**: الشعور بالتطوير التعاوني مع الذكاء الاصطناعي
3. **بناء الثقة**: رؤية الذكاء الاصطناعي يكمل برنامجًا قابلًا للتشغيل من البداية للنهاية

**الأسئلة الشائعة:**

- **س: ماذا لو لم يتم تثبيت pygame؟**
  - ج: سيكتشفه Claude ويقترح `pip install pygame`، أو يمكنك أن تطلب من Claude تثبيته

- **س: الطرفية مشغولة بعد بدء اللعبة، ماذا أفعل؟**
  - ج: اضغط ESC لإنهاء اللعبة، أو استمر في استخدام Claude Code في نافذة طرفية أخرى

- **س: هل يمكنني تغيير اللغة؟**
  - ج: بالتأكيد. جرب "اكتب بـ JavaScript"، "اكتب باستخدام HTML5 Canvas"، إلخ

---

## التقنيات الأساسية

أتقن هذه التقنيات ويمكن أن تتحسن كفاءة Claude Code لديك عدة مرات. تأتي من ممارسة التطوير الفعلية وتغطي سيناريوهات عالية التكرار.

### التقنية 1: الضغط المزدوج على Esc للتراجع عن المحادثة - التراجع عن العمليات الخاطئة

هذا هو الاختصار الأكثر شيوعًا وأهمية في Claude Code. أثناء التعاون، قد تخطئ في الكتابة، أو تعطي تعليمات خاطئة، أو لا تعجبك إجابة. الضغط المزدوج على Esc يمنحك "إرجاع زمني" سريع.

**تفاصيل الاختصار:**

```text
الضغط على Esc مرة واحدة     -> مسح الإدخال الحالي (مشابه لـ Ctrl+C)
الضغط على Esc مرتين         -> التراجع إلى حالة المحادثة السابقة (التراجع عن الدورة السابقة)
الضغط على Esc ثلاث مرات     -> مسح جميع سجل المحادثة (البدء من جديد)
```

**حالات الاستخدام:**

- **الحالة أ**: أرسلت تعليمات خاطئة عن طريق الخطأ وبدأ Claude في التنفيذ. اضغط Esc مرتين بسرعة للعودة قبل التنفيذ.
- **الحالة ب**: استجابة Claude ليست ما أردته، وتريد إعادة الصياغة. Esc مزدوج للتراجع والسؤال مرة أخرى.
- **الحالة ج**: المحادثة طويلة والسياق فوضوي. Esc ثلاثي للمسح وإعادة البدء.

**ملاحظة مهمة**: Esc المزدوج يتراجع عن **حالة المحادثة**، وليس تغييرات الكود. إذا كان Claude قد عدل الملفات بالفعل، فلن يتم التراجع عن تلك التعديلات تلقائيًا. يجب عليك الاستعادة يدويًا عبر Git.

**التوصية**: قبل التعديلات الكبيرة المحتملة على الكود، احفظ الحالة الحالية (`git commit` أو `git stash`) لتسهيل الاستعادة.

### التقنية 2: استخدام @ للإشارة إلى الملفات - التحكم الدقيق في السياق

على الرغم من أن Claude Code يمكنه قراءة ملفات المشروع تلقائيًا، إلا أن الإشارة الصريحة إلى الملفات تجعل النية أوضح وتتجنب إهدار الرموز على ملفات غير ذات صلة.

**الاستخدام الأساسي:**

بدلاً من الغموض:

```text
Explain src/utils.ts
```

استخدم إشارة صريحة:

```text
@src/utils.ts Explain this file
```

**الاستخدام المتقدم:**

**مقارنة ملفات متعددة:**
```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**الإشارة إلى مجلد:**
```text
@src/components/ Summarize all components under this directory
```

**الإشارة إلى أسطر محددة (مع المحرر):**
```text
@src/utils.ts:45-60 Explain what this code does
```

**نصائح الاستخدام:**

1. **الإكمال بـ Tab**: اكتب `@` ثم اضغط Tab، يعرض Claude قائمة الملفات في المجلد الحالي ويمكنك الاختيار بالأسهم
2. **المسارات النسبية**: يدعم الإشارات مثل `@./config.json` أو `@../shared/types.ts`
3. **المطابقة التقريبية**: يُسمح بأسماء الملفات الجزئية، مثلاً `@utils` يمكن أن يتطابق مع `src/utils.ts` أو `src/utils/index.ts`

### التقنية 3: استخدام ! لتنفيذ الأوامر - التكامل مع الطرفية

يحتوي Claude Code على تنفيذ أوامر مدمج. يمكنك تشغيل الأوامر دون التبديل إلى طرفية أخرى.

**الاستخدام الأساسي:**

```text
!npm test           # تشغيل الاختبارات
!git status         # التحقق من حالة Git
!ls -la             # عرض الملفات
```

**السيناريوهات العملية:**

**سيناريو: تشغيل الاختبارات وتحليل الفشل**
```text
!npm test
# بعد الفشل
Analyze test failure reasons and fix code
```

**سيناريو: فحص Git diff**
```text
!git diff
# اطلب من Claude شرح التغييرات
Summarize key changes in this diff
```

**سيناريو: بناء المشروع**
```text
!npm run build
# إذا فشل البناء
Build failed, help me fix it
```

**ملاحظة أمنية:**

بالنسبة للأوامر الحساسة (مثلاً `rm -rf`، `sudo`)، يطلب Claude Code التأكيد. هذه آلية حماية. تأكد بعناية.

### التقنية 4: /plan قبل البرمجة - الطريقة الصحيحة للتعامل مع المهام المعقدة

للمهام المعقدة، البرمجة المباشرة غالبًا ما تكون غير فعالة. يدخل `/plan` وضع التخطيط: حدد خطة التنفيذ أولاً، ثم نفذ خطوة بخطوة.

**الاستخدام:**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**ما يفعله Claude:**

1. **تحليل المتطلبات**
2. **تقييم المشروع الحالي والمجموعة التقنية**
3. **إنشاء خطة خطوة بخطوة**
4. **المناقشة والتعديل بناءً على ملاحظاتك**

**نموذج الإخراج:**

```text
📋 User Authentication Implementation Plan

Phase 1: Database design
- [ ] Create users table (id, email, password_hash, created_at)
- [ ] Create sessions table (id, user_id, expires_at)

Phase 2: Backend API
- [ ] POST /api/auth/register - register
- [ ] POST /api/auth/login - login
- [ ] POST /api/auth/logout - logout
- [ ] GET /api/auth/me - get current user

Phase 3: Frontend integration
- [ ] Create login page
- [ ] Create register page
- [ ] Add route guards

Phase 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests

Which phase do you want to start with? Or should we adjust the plan?
```

**أفضل الممارسات:**

- للمهام التي تستغرق أكثر من 30 دقيقة، استخدم `/plan` أولاً
- نفذ مرحلة بمرحلة وتحقق من كل مرحلة
- إذا تغيرت المتطلبات، أعد تشغيل `/plan` للتعديل

### التقنية 5: /init لتوليد التكوين تلقائيًا - تهيئة المشروع السريعة

`/init` هو أحد أقوى أوامر Claude Code. يقوم بمسح مشروعك تلقائيًا، وتحديد المجموعة التقنية والهيكل، وإنشاء `CLAUDE.md` كامل.

**الاستخدام:**

```text
/init
```

**ما ينفذه Claude:**

1. **مسح هيكل المشروع**: تحديد إطار العمل/اللغة/أدوات البناء
2. **تحليل ملفات التكوين**: قراءة package.json، tsconfig.json، إلخ
3. **استنتاج الأسلوب**: اصطلاحات التسمية وتنظيم الملفات
4. **إنشاء CLAUDE.md**

**مثال على CLAUDE.md المُنشأ:**

```text
# My Project

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Database: Prisma + PostgreSQL

## Common Commands

\`\`\`bash
npm run dev      # start dev server
npm run build    # production build
npm run test     # run tests
npx prisma migrate dev  # DB migration
\`\`\`

## Code Conventions
- Use function components + Hooks
- File naming: PascalCase (components), camelCase (utility funcs)
- Commit style: Conventional Commits
```

**لماذا هذا مهم:**

`CLAUDE.md` هو "ذاكرة المشروع" لـ Claude Code. في كل إطلاق، يقرأ Claude هذا الملف ويفهم خلفية المشروع. هذا يعني:

- لا تحتاج إلى شرح إطار العمل والمجموعة التقنية مرارًا
- يلتزم Claude بخصائصك وأفضل الممارسات
- يمكن للأعضاء الجدد في الفريق الانضمام بشكل أسرع

**التوصية**: بعد تهيئة المشروع، شغّل `/init` فورًا، ثم قم بتعديل التكوين المُنشأ ليتطابق مع الواقع.

### التقنية 6: /compact لضغط السياق - توفير الرموز

نافذة سياق Claude Code محدودة (غالبًا حوالي 200 ألف رمز). المحادثات الطويلة تستهلك الكثير من الرموز، وتزيد التكلفة، وقد تدفع المعلومات المهمة المبكرة خارج السياق.

**الاستخدام:**

```text
/compact
```

**كيف يعمل:**

يحلل `/compact` سجل الدردشة، ويستخرج المعلومات الرئيسية (القرارات المتخذة، الكود المُنشأ، المتطلبات المؤكدة)، وينشئ ملخصًا موجزًا. يستند الحوار اللاحق إلى هذا الملخص بدلاً من السجل الكامل.

**متى تستخدم:**

- بعد 5-6 جولات
- عندما يبدو أن Claude "نسي" السياق السابق
- عند التبديل إلى مهمة فرعية جديدة مع الحفاظ على الخلفية المهمة

**التوصية:**

```text
# الضغط بعد محادثة طويلة
/compact

# الاستمرار في العمل
Now that user module is done, let's build order module.
```

### التقنية 7: استخدام Claude Code للمساعدة في التزامات Git

في Claude Code، سير عمل الالتزام الموصى به هو: دع Claude يفحص diff ويصيغ رسالة الالتزام، ثم تشغل أوامر Git القياسية. هذا واضح ويمنحك نقطة مراجعة إضافية قبل الالتزام.

المراجع الرسمية:

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**سير العمل الموصى به:**

```bash
# 1. التحقق من التغييرات الحالية
/diff
!git status

# 2. اطلب من Claude تلخيص وإنشاء رسالة الالتزام
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. بعد التأكيد، شغّل التزام Git القياسي
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**فوائد هذا النهج:**

1. **متوافق مع القدرات الرسمية الحالية**: لا اعتماد على الأوامر المدمجة المحذوفة
2. **شفافية**: مراجعة diff ورسالة الالتزام قبل الإرسال
3. **قابلية النقل**: نفس سير العمل يعمل في بيئات تطوير متكاملة أخرى بالذكاء الاصطناعي أو Git خالص

**إذا كنت تريد تجربة "التزام بأمر واحد":**

يوصي Claude Code الآن بالتوسيع القائم على الإضافات. مثلاً، توفر `commit-commands` أوامر مثل `/commit-commands:commit`.

```bash
# 1. إضافة مثال سوق الإضافات
/plugin marketplace add anthropics/claude-code

# 2. تثبيت إضافة سير عمل الالتزام
/plugin install commit-commands@anthropics-claude-code

# 3. إعادة تحميل الإضافات
/reload-plugins

# 4. استخدام أمر الإضافة للالتزام
/commit-commands:commit
```

**ملاحظات إضافية:**

- `/commit-commands:commit` مقدم من الإضافة، وليس أمرًا مدمجًا حاليًا
- إذا كنت تحتاج فقط لفحص التغييرات قبل الالتزام، يُفضل استخدام `/diff` أو اطلب من Claude شرح `git diff`
- تم وضع علامة `review/` الرسمية أيضًا كمُهمَل؛ للحصول على قدرة مشابهة، استخدم إضافة أو سير مراجعة بلغة طبيعية

### التقنية 8: Shift+Tab للقبول التلقائي - تحسين السلاسة

بشكل افتراضي، يطلب Claude التأكيد قبل تعديل الكود. هذا مفيد عند التعلم، لكن قد يبدو بطيئًا لاحقًا. يُفعّل `Shift+Tab` وضع القبول التلقائي للتكرار الأسرع.

**الاستخدام:**

- اضغط `Shift+Tab` -> الدخول في وضع القبول التلقائي
- اضغط `Shift+Tab` مرة أخرى -> الخروج من وضع القبول التلقائي

**مقارنة الأوضاع:**

| الوضع | السلوك | سيناريو الاستخدام |
|------|------|----------|
| الوضع الافتراضي | طلب تأكيد لكل تعديل | مرحلة التعلم، الكود المهم |
| القبول التلقائي | تطبيق التعديلات مباشرة | بعد الإلمام، التكرار السريع |

**ملاحظات:**

- في وضع القبول التلقائي، يعدل Claude الملفات مباشرة بدون تأكيد ثانٍ
- يُوصى بالاقتران مع Git لتسهيل التراجع
- للعمليات الحساسة (حذف الملفات، تعديل التكوينات الرئيسية)، لا يزال Claude يطلب التأكيد

### التقنية 9: Ctrl+C لإلغاء العملية - فرامل الطوارئ

عندما ينفذ Claude مهمة طويلة، أو تدرك أنك أعطيت تعليمات خاطئة، `Ctrl+C` هو فرامل الطوارئ.

**الاستخدام:**

- اضغط `Ctrl+C` مرة واحدة -> إلغاء العملية الجارية حاليًا
- اضغط `Ctrl+C` مرتين -> الخروج الكامل من Claude Code

**حالات الاستخدام:**

- أمر طويل التشغيل يحتاج إلى مقاطعة
- Claude يُنشئ كودًا كبيرًا غير ذي صلة
- اكتشاف تعليمات خاطئة وتريد التوقف فورًا

**الفرق عن Esc المزدوج:**

- `Ctrl+C`: إيقاف **العملية** الجارية (تشغيل أمر / إنشاء كود)
- `Esc المزدوج`: التراجع عن **حالة المحادثة** (التراجع عن الدورة السابقة)

### التقنية 10: /context لفحص استخدام السياق - تحسين تكلفة الرموز

يعرض `/context` استخدام السياق في الجلسة الحالية، مما يساعدك على فهم استهلاك الرموز وتحسين التكلفة.

**الاستخدام:**

```text
/context
```

**نموذج الإخراج:**

```text
📊 Context Usage

Token usage: 45,230 / 200,000 (22.6%)
File references: 12 files
Conversation rounds: 8

Top token-consuming files:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Suggestions:
- Current usage is healthy, no compression needed
- To reduce usage, add node_modules into .claudeignore
```

**كيفية استخدام هذه المعلومات:**

1. **تحديد الملفات الكبيرة**: إذا كان ملف واحد يستهلك الكثير من الرموز، تحقق مما إذا كان ضروريًا فعلًا
2. **تحسين .claudeignore**: تجاهل الملفات غير ذات الصلة (node_modules، مخرجات البناء، إلخ)
3. **تحديد متى تضغط**: عندما يتجاوز الاستخدام 70٪، فكر في `/compact`

### التقنية 11: /resume لاستعادة الجلسة - التبديل بين محادثات المهام المتعددة

عند التعامل مع مهام متعددة، قد تشغل عدة سلاسل محادثات. يتيح لك `/resume` العودة إلى سياق الجلسة السابقة في الدردشة الحالية، دون إعادة التشغيل.

**الاستخدام:**

```text
/resume
```

**كيف يعمل:**

يسجل Claude Code الجلسات السابقة تلقائيًا. عند تشغيل `/resume`، ينتقل إلى سياق الجلسة السابقة ويحتفظ بجميع محتوى النقاش والحالة السابقة.

**حالات الاستخدام:**

**الحالة أ: تعدد المهام المتوازي**
```text
# المهمة 1: إصلاح خطأ
claude> Fix login-page validation issue
# ... محادثة واحدة ...

# المهمة 2: إضافة ميزة (سلسلة جديدة)
claude> Add user registration feature
# ... محادثة أخرى ...

# العودة إلى المهمة 1
claude> /resume
# متابعة عمل إصلاح الخطأ السابق
```

**الحالة ب: بحث مؤقت ثم العودة**
```text
claude> Explain this algorithm
# ... مناقشة الخوارزمية ...

claude> /resume
# العودة إلى عمل البرمجة السابق
```

**الحالة ج: الاستئناف بعد المقاطعة**
```text
claude> Continue previous work
# إذا قاطعت سابقًا، يعيدك /resume إلى ما كنت تقوم به
```

**المقارنة مع الأوامر ذات الصلة:**

| الأمر | الوظيفة | السيناريو |
|------|------|----------|
| `/resume` | العودة إلى الجلسة السابقة في الدردشة الحالية | تبديل المهام المتعددة |
| `claude -c` | متابعة أحدث جلسة | إعادة الاتصال بعد الخروج |
| `claude -r` | استعادة جلسة سابقة | استعادة حالة سابقة بعد الخروج |
| `Esc المزدوج` | التراجع عن دورة واحدة | التراجع عن أحدث دورة محادثة |

**اقتراحات:**

1. **إدارة المهام المتعددة**: `/resume` أكثر كفاءة من إعادة شرح السياق
2. **ذاكرة الجلسة**: كل جلسة لها سياق مستقل؛ يحافظ `/resume` عليه
3. **الاستخدام مع /compact**: في الجلسات الطويلة، اضغط أولًا، ثم استأنف للتبديل للحفاظ على سياق نظيف

---

## التكوين الأساسي

يساعد التكوين المناسب Claude Code على التكيف بشكل أفضل مع مشروعك وفريقك. يشرح هذا القسم دور التكوين وأولويته وتحسينه لسيناريوهات الاستخدام المختلفة.

### مواقع ملفات التكوين والأولوية

يستخدم Claude Code استراتيجية تكوين متدرجة. المستويات المختلفة لها نطاق وأولوية مختلفان. فهم هذا يتيح لك إدارة الإعدادات بمرونة.

**أولوية التكوين (من الأعلى إلى الأدنى):**

| الموقع | النطاق | الغرض | الالتزام بـ Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | المشروع المحلي | التفضيلات الشخصية | ❌ لا |
| `.claude/settings.json` | المشروع المشترك | تكوين الفريق | ✅ نعم |
| `~/.claude/settings.json` | عام | الافتراضيات الشخصية | ❌ لا |

**قواعد الدمج:**

- التكوين ذو الأولوية الأعلى يتجاوز نفس المفتاح في الأولوية الأدنى
- المفاتيح غير المتعارضة تُدمج
- تكوين المشروع يتجاوز التكوين العام
- التكوين المحلي الشخصي يتجاوز تكوين المشروع المشترك

**السيناريوهات العملية:**

**السيناريو 1: مشروع فريق**
```text
~/.claude/settings.json          # إعدادات المحرر الافتراضية الشخصية
.claude/settings.json            # معايير البرمجة وإعدادات الصلاحيات للفريق
.claude/settings.local.json      # إعدادات التصحيح والمظهر الشخصية
```

**السيناريو 2: مشروع شخصي**
```text
~/.claude/settings.json          # التكوين الافتراضي العام
.claude/settings.json            # تكوين خاص بالمشروع (مثلاً: قواعد صلاحيات خاصة)
```

### CLAUDE.md - ذاكرة المشروع

`CLAUDE.md` هو أهم ملف في تكوين Claude Code. يعمل كـ "دليل" للمشروع. في كل مرة يبدأ فيها Claude Code، يقرأ `CLAUDE.md` في المجلد الحالي، ويفهم الخلفية والمجموعة التقنية والاصطلاحات.

**لماذا CLAUDE.md مهم جدًا:**

تخيل الانضمام إلى مشروع جديد: تحتاج إلى تعلم المجموعة التقنية، واصطلاحات البرمجة، والأوامر الشائعة. عادةً يستغرق هذا ساعات من مراجعة الوثائق/الكود والأسئلة لزملائك. مع `CLAUDE.md`، يعرف Claude كل هذا عند بدء التشغيل ويمكنك التعاون بفعالية فورًا.

**القالب الأدنى:**

```text
# [اسم المشروع]

## Tech Stack
- Framework: React 18 + TypeScript
- State: Zustand
- Styling: Tailwind CSS
- Build tool: Vite

## Common Commands

\`\`\`bash
npm run dev      # بدء خادم التطوير (المنفذ 5173)
npm run test     # تشغيل اختبارات الوحدة
npm run build    # بناء الإنتاج
npm run lint     # فحص التنسيق
\`\`\`

## Code Conventions
- Components use function components + Hooks
- Naming: PascalCase (components), camelCase (utility funcs)
- Git commits use Conventional Commits
- All API calls must go through unified request wrapper
```

**القالب الكامل (موصى به):**

```text
# [اسم المشروع]

## Project Overview
وصف جملة واحدة للوظائف الرئيسية والمستخدمين المستهدفين.

## Tech Stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend (إن وجد)
- Runtime: Node.js + Express
- Database: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Project Structure

\`\`\`
src/
├── components/      # مكونات قابلة لإعادة الاستخدام
├── pages/           # مكونات الصفحات
├── hooks/           # Hooks مخصصة
├── lib/             # دوال مساعدة
├── types/           # أنواع TypeScript
└── api/             # استدعاءات API
\`\`\`

## Common Commands

\`\`\`bash
# التطوير
npm run dev              # بدء خادم التطوير
npm run dev:mock         # استخدام بيانات وهمية في التطوير

# الاختبار
npm run test             # تشغيل جميع الاختبارات
npm run test:watch       # وضع المراقبة
npm run test:coverage    # إنشاء تقرير التغطية

# جودة الكود
npm run lint             # فحص ESLint
npm run lint:fix         # إصلاح مشاكل ESLint تلقائيًا
npm run format           # تنسيق Prettier
npm run typecheck        # فحص أنواع TypeScript

# البناء
npm run build            # بناء الإنتاج
npm run preview          # معاينة بناء الإنتاج
\`\`\`

## Development Rules
### Code style
- Use function components, avoid class components
- Prefer custom Hooks for logic abstraction
- Component props must define TypeScript interfaces

### Git workflow
- Branch prefix: `feature/`, `fix/`, `refactor/`
- Commit messages follow Conventional Commits
- PR must pass CI and code review

### Performance requirements
- Component lazy loading to reduce first-screen load time
- Use WebP images and enable lazy loading
- Keep API response time under 200ms

## Environment Variables

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Common Issues

### Dev server failed to start?

Check whether port 5173 is occupied, or try `npm run dev -- --port 3000`

### Type errors?

Run `npm run typecheck` to see detailed errors
```

**الإنشاء السريع لـ CLAUDE.md:**

إذا كان مشروعك موجودًا لكن ليس لديه `CLAUDE.md`، شغّل `/init`:

```bash
claude
# داخل Claude Code
/init
```

يحلل Claude هيكل المشروع و package.json والكود الحالي، ثم ينشئ `CLAUDE.md` عملي. بعد الإنشاء، راجع وعدّل يدويًا.

### .claudeignore - توفير الرموز

يُخبر `.claudeignore` أدوات Claude Code بالملفات التي يجب عدم قراءتها في السياق. التكوين الصحيح يمكن أن يقلل استخدام الرموز بشكل كبير (غالبًا 40-60٪) ويحسن سرعة الاستجابة.

**لماذا تحتاج .claudeignore:**

عندما يحاول Claude Code فهم المشروع، يقرأ الملفات ذات الصلة. بعض الملفات لا تساعد في الفهم ويمكنها:
- استهلاك الكثير من الرموز (مثلاً: ملفات تعريف الأنواع في node_modules)
- إدخال ضوضاء (السجلات، مخرجات البناء)
- تضمين معلومات حساسة (ملفات .env)

**التكوين الموصى به:**

```text
# ===== التبعيات =====
# كود ضخم من أطراف ثالثة، عادةً غير ضروري لسياق Claude
node_modules/
.pnp/
.pnp.js

# ===== مخرجات البناء =====
# القطع الأثرية المُنشأة، ليست منطق المصدر
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== السجلات =====
# سجلات وقت التشغيل، لا قيمة لفهم البنية
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== مخرجات الاختبار =====
coverage/
.nyc_output/

# ===== المحرر / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== ملفات النظام =====
.DS_Store
Thumbs.db

# ===== ملفات البيئة =====
.env
.env.local
.env.*.local

# ===== الأصول الثنائية الكبيرة =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== ملفات القفل (اختياري) =====
# إذا لم تكن بحاجة لـ Claude لتحليل إصدارات التبعيات، تجاهل هذه
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**نصائح التكوين:**

1. **ابدأ بالحد الأدنى**: تجاهل node_modules ومخرجات البناء أولاً، ثم راقب استخدام الرموز
2. **الضبط حسب المشروع**: مشروع كثيف الصور -> تجاهل صيغ الصور؛ مشروع وثائق -> حافظ على Markdown
3. **التحسين المنتظم**: استخدم `/context` لرؤية الملفات الأكثر استهلاكًا للرموز وقرر ما إذا كنت تريد تجاهلها

### تكوين الصلاحيات

بشكل افتراضي، يطلب Claude Code التأكيد قبل العمليات الحساسة. من خلال `permissions` في `settings.json`، يمكنك التحكم في الإجراءات التي يُسمح بها تلقائيًا، أو التي تتطلب تأكيدًا، أو المرفوضة بالكامل.

**هيكل تكوين الصلاحيات:**

```json
{
  "permissions": {
    "allow": [
      // السماح تلقائيًا بدون سؤال
    ],
    "ask": [
      // السؤال قبل التنفيذ
    ],
    "deny": [
      // الرفض الكامل
    ]
  }
}
```

**بناء جملة القواعد:**

تستخدم قواعد الصلاحيات تنسيق `ActionType(pattern)`:

| نوع الإجراء | الوصف | المثال |
|----------|------|------|
| `Bash` | تشغيل أمر طرفية | `Bash(git status)` |
| `Edit` | تعديل ملف | `Edit(src/**/*.ts)` |
| `Read` | قراءة ملف | `Read(README.md)` |
| `Write` | إنشاء ملف | `Write(src/components/*.tsx)` |

**دعم أحرف البدل:**

- `*` يتطابق مع أي أحرف (باستثناء `/`)
- `**` يتطابق مع أي مسارات
- `?` يتطابق مع حرف واحد

**مثال تكوين حقيقي:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**اقتراحات التكوين:**

1. **مرحلة التطوير**: صلاحيات أكثر مرونة للتكرار الأسرع
2. **مرحلة الإنتاج**: صلاحيات أكثر صرامة، خاصةً للنشر وعمليات البيانات الحساسة
3. **التعاون في الفريق**: ضع القواعد الأساسية في `settings.json` المشترك، والتعديلات الشخصية في `settings.local.json`

### مجلد القواعد

في المشاريع الكبيرة، يمكن أن يصبح ملف `CLAUDE.md` واحد منتفخًا وصعب الصيانة. يدعم Claude Code الإدارة المعيارية من خلال **مجلد القواعد**، وتقسيم الاصطلاحات حسب الموضوع إلى ملفات منفصلة.

**هيكل المجلد:**

```text
.claude/
├── settings.json          # ملف التكوين الرئيسي
├── CLAUDE.md              # نظرة عامة على المشروع (لا يزال مطلوبًا)
└── rules/                 # مجلد القواعد
    ├── 00-security.md     # قواعد الأمان (عالمية)
    ├── 01-coding-style.md # قواعد أسلوب البرمجة (عالمية)
    ├── 10-api.md          # قواعد تطوير API
    ├── 11-frontend.md     # قواعد تطوير الواجهة الأمامية
    ├── 12-backend.md      # قواعد تطوير الواجهة الخلفية
    └── 20-testing.md      # قواعد الاختبار
```

**اقتراح تسمية الملفات:**

استخدم بادئات رقمية (`00-`، `01-`) للتحكم في ترتيب التحميل: القواعد الأساسية أولاً، ثم القواعد المحددة.

**تنسيق ملف القواعد:**

تدعم ملفات القواعد YAML frontmatter لتحديد نطاق التطبيق:

```markdown
---
# اختياري: المسارات التي تنطبق عليها هذه القاعدة
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# اختياري: الأوامر التي تنطبق عليها هذه القاعدة
commands:
  - "generate api"
  - "create endpoint"

# اختياري: أولوية القاعدة (رقم أصغر = أولوية أعلى)
priority: 10
---

# API Development Rules

## Route design
- RESTful style, use plural nouns
- Versioning: /api/v1/users
- Nested resources: /api/v1/users/123/orders

## Request/response format
- Use JSON consistently
- Error response must include code and message
- Pagination response uses { data, pagination } structure

## Security requirements
- All endpoints must verify authentication (except public endpoints)
- Sensitive operations require secondary confirmation
- Implement rate limiting to prevent abuse
```

**وراثة القواعد وتجاوزها:**

- القواعد العالمية (بدون frontmatter أو `globs: *`) تنطبق على جميع الملفات
- القواعد الخاصة بالمسار تنطبق فقط على الملفات المتطابقة
- إذا تعارضت القواعد، القاعدة ذات الأولوية الأعلى تفوز
- القواعد المحددة يمكنها تجاوز القواعد العالمية

**أمثلة سيناريوهات الاستخدام:**

**السيناريو 1: مشروع فصل الواجهة الأمامية والخلفية**
```text
.claude/rules/
├── 00-general.md          # معايير عامة (رسائل الالتزام، التسمية)
├── 10-backend.md          # معايير الواجهة الخلفية (خاصة بـ NestJS)
├── 11-frontend.md         # معايير الواجهة الأمامية (خاصة بـ React)
└── 20-database.md         # معايير قاعدة البيانات (خاصة بـ Prisma)
```

**السيناريو 2: بنية الخدمات المصغرة**
```text
.claude/rules/
├── 00-global/             # قواعد عالمية
│   ├── security.md
│   └── logging.md
├── 10-services/           # قواعد خاصة بالخدمات
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # قواعد المكونات المشتركة
    ├── shared-lib.md
    └── common-utils.md
```

**توصية الترحيل:**

إذا كان لديك بالفعل ملف `CLAUDE.md` كبير جدًا، قم بالترحيل إلى مجلد القواعد هكذا:

1. أنشئ `.claude/rules/`
2. قسّم `CLAUDE.md` حسب الموضوع
3. أضف frontmatter مناسب لكل ملف قاعدة
4. احتفظ بـ `CLAUDE.md` كنظرة عامة على المشروع وانقل المعايير التفصيلية إلى الخارج
5. اختبر وتأكد من أن تحميل القواعد يعمل بشكل صحيح

---

## أوامر التشغيل الأساسية

يوفر Claude Code مجموعة غنية من أوامر التشغيل للتعاون الفعال مع الذكاء الاصطناعي. تُقسم هذه الأوامر إلى فئات: أوامر الشرطة المائلة (ميزات مدمجة)، ونظام الرموز (عمليات قصيرة)، والتعليمات بلغة طبيعية (التطوير اليومي).

### مرجع سريع لأوامر الشرطة المائلة

أوامر الشرطة المائلة هي عمليات مدمجة تبدأ بـ `/`. توفر إجراءات موحدة مثل تهيئة المشروع وإدارة التكوين وفحص الحالة.

| الأمر | الوظيفة | سيناريو الاستخدام |
|------|------|----------|
| `/help` | عرض جميع الأوامر | بحث سريع عند نسيان الأوامر |
| `/init` | تهيئة المشروع وإنشاء CLAUDE.md | مشروع جديد أو إضافة تكوين |
| `/plan` | الدخول في وضع التخطيط | إنشاء خطة قبل المهام المعقدة |
| `/clear` | مسح سجل المحادثة | إعادة البدء عند فوضى السياق |
| `/compact` | ضغط السياق | توفير الرموز بعد محادثة طويلة |
| `/diff` | فتح عرض تفاعلي للفروقات | فحص التغييرات غير الملتزم بها حاليًا |
| `/plugin` | إدارة الإضافات | تثبيت امتدادات الالتزام/المراجعة |
| `/context` | عرض استخدام السياق | تحسين تكلفة الرموز |
| `/cost` | عرض تكلفة الجلسة | مراقبة تكلفة الاستخدام |
| `/config` | فتح لوحة التكوين | تحديث الإعدادات |
| `/permissions` | إدارة الصلاحيات | تعديل صلاحيات العمليات |
| `/model` | تبديل النموذج | اختيار نماذج مختلفة |

**مثال على组合 الأوامر:**

```bash
# سير عمل تطوير كامل
/plan                    # 1. إنشاء خطة
# ... تنفيذ التطوير ...
/diff                    # 2. فحص التغييرات
Generate a commit message from current diff
!git add -A              # 3. مرحلة التغييرات
!git commit -m "..."     # 4. الالتزام
/cost                    # 5. فحص التكلفة
```

### نظام الرموز

نظام الرموز هو آلية التشغيل القصيرة لـ Claude Code. الرموز الخاصة تُفعّل قدرات محددة بسرعة.

| الرمز | الاسم | الغرض | المثال |
|------|------|------|------|
| `/` | أمر الشرطة المائلة | تنفيذ عملية مدمجة | `/help`، `/plan` |
| `@` | إشارة at | الإشارة إلى ملف/مجلد | `@src/app.tsx` |
| `!` | وضع bang | تشغيل أمر طرفية | `!npm test` |
| `&` | تشغيل في الخلفية | تشغيل مهمة في الخلفية | `&npm run dev` |

**نصائح组合 الرموز:**

```bash
# 结合 الرموز
@src/utils.ts !npm test
# المعنى: قراءة utils.ts، ثم تشغيل الاختبارات

@src/components/ @src/pages/ compare structures of these two directories
# المعنى: الإشارة إلى مجلدين في وقت واحد للمقارنة

!git diff @src/app.tsx explain these changes
# المعنى: فحص Git diff واطلب من Claude شرح تغييرات الملف المحدد
```

### عمليات الملفات

عمليات الملفات هي الإجراءات اليومية الأكثر شيوعًا: قراءة الملفات، وتعديلها، وإنشائها، وحذفها.

**قراءة الملفات:**

```bash
# قراءة أساسية
@src/app.tsx explain this file

# قراءة + تحليل
@src/utils/helpers.ts find potential performance issues

# قراءة مقارنة
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**تعديل الملفات:**

```bash
# تعديل بسيط
Modify formatDate in src/utils/date.ts to support Chinese locale format

# تعديل معقد
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# تعديل دفعي
Convert all class components under src/components/ into function components
```

**إنشاء الملفات:**

```bash
# إنشاء ملف واحد
Create src/components/UserCard.tsx, a card component to display user info

# إنشاء ملفات مرتبطة
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**حذف الملفات:**

```bash
# حذف مع التأكيد
Delete src/old-component.tsx (this component is no longer used)

# Claude يطلب التأكيد وقد يقترح فحص المراجع أولاً
```

### عمليات Git

يتكامل Claude Code بعمق مع Git حتى تتمكن من إكمال سير عمل التحكم في الإصدارات الكامل دون مغادرة الطرفية.

**فحص الحالة:**

```bash
# عرض حالة Git
Show git status and uncommitted changes

# diff تفصيلي
!git diff
Explain changes in src/api/users.ts
```

**إنشاء التزامات:**

```bash
# فحص التغييرات
/diff

# إنشاء رسالة التزام
Generate a Conventional Commit message from current git diff

# التزام يدوي
!git add -A
!git commit -m "..."
```

**عمليات الفروع:**

```bash
# إنشاء فرع ميزة
!git checkout -b feature/user-authentication

# بعد التنفيذ
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**مثال سير عمل Git الكامل:**

```bash
# 1. بدء ميزة جديدة
!git checkout -b feature/payment-integration

# 2. تطوير الميزة (بمساعدة Claude)
Create payment module with Alipay and WeChat Pay

# 3. تشغيل الاختبارات
!npm test

# 4. فحص التغييرات
/diff

# 5. إنشاء وتأكيد رسالة الالتزام
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. الدفع إلى البعيد
!git push -u origin feature/payment-integration

# 7. إنشاء PR (اختياري، باستخدام GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### عمليات الكود

عمليات الكود هي نقاط القوة الأساسية لـ Claude Code: الإنشاء، الشرح، إعادة الهيكلة، والتحسين.

**إنشاء الكود:**

```bash
# إنشاء مكون
Create a React Hook to manage auth state, including login/logout/permission checks

# إنشاء دالة مساعدة
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# إنشاء وحدة كاملة
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**شرح الكود:**

```bash
# شرح سطر بسطر
Explain src/algorithms/quicksort.ts line by line

# شرح عالي المستوى
@src/services/payment.ts explain architecture design of this module

# شرح المنطق المعقد
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**إعادة هيكلة الكود:**

```bash
# إعادة هيكلة البنية
Convert class components in src/components/ to function components

# إعادة هيكلة الأداء
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# إعادة هيكلة التنظيف
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**تصحيح الكود:**

```bash
# تحليل الأخطاء
npm test failed, analyze root cause and fix it

# تحليل الأداء
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# تحليل السجلات
!cat logs/error.log
Analyze these error logs and identify root cause
```

### عمليات الاختبار

الاختبار ضروري لضمان الجودة. يمكن لـ Claude Code المساعدة في إنشاء الاختبارات وتشغيلها وتحليل النتائج.

**إنشاء الاختبارات:**

```bash
# اختبارات الوحدة
Generate unit tests for src/utils/math.ts, including boundary cases

# اختبارات المكونات
Generate React Testing Library tests for src/components/UserForm.tsx

# اختبارات التكامل
Create integration test for user registration flow from form submission to DB write
```

**تشغيل وتصحيح الاختبارات:**

```bash
# تشغيل الاختبارات
!npm test

# تصحيح الاختبارات الفاشلة
Analyze failure reasons and fix
@tests/auth.test.ts

# فحص التغطية
!npm run test:coverage
Which code paths are not covered?
```

**اقتراح استراتيجية الاختبار:**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### تسلسل الأوامر وتكوين سير العمل

أكثر طريقة كفاءة لاستخدام Claude Code هي تسلسل الأوامر في سير عمل كامل.

**السيناريو 1: سير عمل إصلاح الأخطاء**

```bash
# 1. فحص المشكلة
!npm test
Tests failed, analyze why

# 2. تحديد المشكلة
@src/utils/validation.ts Is the issue in this file?

# 3. إصلاح المشكلة
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. التحقق من الإصلاح
!npm test

# 5. التزام الإصلاح
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**السيناريو 2: سير عمل مراجعة الكود**

```bash
# 1. فحص التغييرات
!git diff --stat
Which files changed?

# 2. مراجعة تفصيلية
@src/components/ Review these component changes

# 3. اقتراح التحسينات
What improvements should be made based on this review?

# 4. تنفيذ التحسينات
Optimize performance of UserList component

# 5. المراجعة النهائية
/diff
Review current changes and point out potential risks and improvements
```

**السيناريو 3: سير عمل ميزة جديدة**

```bash
# 1. التخطيط أولاً
/plan
I want to add shopping cart feature

# 2. إنشاء فرع
!git checkout -b feature/shopping-cart

# 3. تنفيذ الميزة
Implement step by step according to plan

# 4. إضافة اختبارات
Generate tests for shopping cart module

# 5. تشغيل الاختبارات
!npm test

# 6. مراجعة الكود
/diff
Please do a code review on current diff

# 7. الالتزام
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## الأسئلة الشائعة

أثناء استخدام Claude Code، قد تواجه مشاكل متنوعة. يلخص هذا القسم المشاكل الشائعة والحلول.

### استخدام الرموز سريع جدًا؟

الاستهلاك السريع للرموز هو أحد أكثر المشاكل شيوعًا. فيما يلي استراتيجية تحسين كاملة.

**التشخيص:**

أولاً شغّل `/context` لفحص استخدام الرموز الحالي:

```text
/context
```

ركز على:
- **معدل استخدام الرموز**: إذا تجاوز 70٪، فكر في ضغط السياق
- **عدد الملفات المُشار إليها**: ملفات أكثر تعني استهلاك رموز أعلى
- **الملفات الكبيرة**: تحقق من الملفات التي تستهلك أكثر الرموز

**استراتيجية التحسين:**

**1. تحسين .claudeignore**

تأكد من أن `.claudeignore` يتضمن الملفات غير الضرورية:

```text
# يجب التجاهل
node_modules/
dist/
build/
*.log
.env

# خاص بالمشروع
# React
.next/
out/

# Vue
.nuxt/
.output/

# عام
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. ضغط السياق بانتظام**

المحادثات الطويلة تتراكم الكثير من الرموز. يُوصى بتشغيل `/compact` كل 5-6 جولات:

```text
# بعد محادثة طويلة
/compact

# الاستمرار
Now let's implement order module...
```

**3. الإشارة إلى الملفات بدقة**

تجنب الإشارة إلى مجلد كامل إذا لزم الأمر:

```bash
# غير موصى به
@src/ Explain this code

# موصى به
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. تجنب قراءة الملفات الضخمة**

إذا أظهر `/context` أن ملفًا واحدًا يستهلك الكثير من الرموز، فكر:
- هل تحتاجه فعلًا؟
- هل يمكنك الإشارة إلى قسم فقط؟
- هل يمكن تقسيم هذا الملف إلى وحدات أصغر؟

### Claude لا يفهم المشروع؟

إذا كانت إجابات Claude غير دقيقة أو يسأل مرارًا عن معلومات المشروع الأساسية، فهو يفتقر إلى سياق المشروع.

**الحلول:**

**1. إنشاء CLAUDE.md**

شغّل `/init` لإنشاء تكوين المشروع:

```bash
/init
```

بعد الإنشاء، تحقق:
- هل ملخص المشروع دقيق؟
- هل المجموعة التقنية كاملة؟
- هل الأوامر الشائعة صحيحة؟
- هل اصطلاحات البرمجة واضحة؟

**2. تعديل CLAUDE.md يدويًا**

إذا لم يكن التكوين المُنشأ تلقائيًا مفصلًا بما فيه الكفاية، أضف:

```markdown
## Project-Specific Information

### Architecture Decisions
- Why choose X over Y?
- What are core design patterns?

### Common Pitfalls
- When using useEffect, watch out for...
- DB queries must...

### Third-Party Integrations
- Payments via Stripe
- Email via SendGrid
- File storage via AWS S3
```

**3. استخدام مجلد القواعد**

للمشاريع الكبيرة، نظم الاصطلاحات في Rules:

```text
.claude/rules/
├── 00-architecture.md    # نظرة عامة على البنية
├── 01-coding-style.md    # أسلوب البرمجة
├── 10-frontend.md        # قواعد الواجهة الأمامية
├── 11-backend.md         # قواعد الواجهة الخلفية
└── 20-testing.md         # قواعد الاختبار
```

**4. إضافة سياق في المطالبة عند الحاجة**

للمهام المحددة، أضف الخلفية ذات الصلة:

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### كيفية التراجع عن العمليات؟

يوفر Claude Code آليات تراجع متعددة لسيناريوهات مختلفة.

**السيناريو 1: تراجع حالة المحادثة**

إذا أخطأت في الكتابة فقط أو لم تعجبك الاستجابة:

```text
Esc مزدوج  -> تراجع عن الدورة السابقة
Esc ثلاثي  -> مسح جميع سجل المحادثة
```

**ملاحظة**: هذا يتراجع عن حالة المحادثة فقط، وليس تعديلات الملفات.

**السيناريو 2: التراجع عن تعديلات الملفات**

إذا كان Claude قد عدل الملفات بالفعل، تراجع يدويًا:

```bash
# فحص التغييرات
!git status
!git diff

# استعادة ملف واحد
git checkout -- src/utils/helpers.ts

# استعادة جميع تغييرات شجرة العمل
git checkout -- .

# إذا تم الالتزام بالفعل
# تراجع ناعم (الاحتفاظ بالتغييرات)
git reset --soft HEAD~1

# تراجع صلب (تجاهل التغييرات)
git reset --hard HEAD~1
```

**السيناريو 3: استخدام سير عمل Git استباقيًا**

أفضل ممارسة: احفظ عملك الحالي قبل جلسة Claude:

```bash
# حفظ الحالة الحالية قبل البدء
git add .
git commit -m "WIP: before Claude Code session"
# أو استخدم stash
git stash push -m "before claude"

# التطوير مع Claude Code...

# إذا كانت النتائج غير مرضية، تراجع كامل
git reset --hard HEAD~1
# أو
git stash pop
```

### مطالبات الصلاحيات كثيرة جدًا؟

التأكيدات المتكررة على الصلاحيات تضر بالكفاءة. التكوين المناسب للصلاحيات يمكن أن يجعل سير العمل أكثر سلاسة.

**نموذج الصلاحيات:**

صلاحيات Claude Code ثلاثة مستويات:
- **allow**: السماح تلقائيًا
- **ask**: السؤال قبل التنفيذ
- **deny**: الرفض الكامل

**تكوين التحسين:**

عدّل `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // عمليات قراءة Git
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // الاختبارات والفحوص
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // خادم التطوير
      "Bash(npm run dev:*)",

      // تعديلات المصدر
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // عمليات كتابة Git
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // إدارة الحزم
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // البناء والنشر
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // تعديل ملفات التكوين
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // قراءة الملفات الحساسة
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // أوامر خطرة
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // ملفات النظام
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // ملفات Git الداخلية
      "Edit(.git/*)"
    ]
  }
}
```

**استراتيجية الصلاحيات التدريجية:**

- **مرحلة التعلم**: حافظ على الإعدادات الافتراضية وافهم ما يحاول Claude تنفيذه
- **مرحلة الإلمام**: أضف العمليات الآمنة الشائعة (مثل git status، npm test) إلى allow
- **مرحلة الكفاءة العالية**: أنشئ قواعد دقيقة بناءً على خصائص المشروع

### كيفية الاستخدام في بر الصين الرئيسي؟

بسبب قيود الشبكة، قد لا يتمكن المستخدمون في الصين من الوصول مباشرة إلى خدمات Anthropic الرسمية. إليك عدة خيارات.

**الخيار 1: استخدام خدمة وكيل API**

يقدم العديد من مزودي الخدمات السحابية خدمات وكيل API متوافقة مع Anthropic:

```bash
# تعيين متغيرات البيئة
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# بدء Claude Code
claude
```

**الخيار 2: استخدام أدوات متوافقة مع Claude Code من أطراف ثالثة**

بعض المزودين المحليين يقدمون أدوات متوافقة:

```bash
# تثبيت النسخة المتوافقة
npm install -g @some-provider/claude-code

# تكوين مفتاح API
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**الخيار 3: استخدام أدوات برمجة ذكاء اصطناعي أخرى**

إذا لم يكن Claude Code متاحًا، فكر في البدائل:

| الأداة | الميزات | سيناريو الاستخدام |
|------|------|----------|
| Cursor | مبني على VS Code، متكامل | تجربة IDE كاملة |
| GitHub Copilot | إكمال تلقائي قوي | أساسًا إكمال الكود |
| 通义灵码 | منتج محلي، مستقر في الصين | بيئة تطوير محلية |
| Codeium | حصة مجانية سخية | ميزانية محدودة |

**الخيار 4: دع وكيل الذكاء الاصطناعي يساعد في التكوين**

إذا كنت غير متأكد من كيفية التكوين، اطلب من وكيل الذكاء الاصطناعي:

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**الأسئلة الشائعة:**

- **س: لا يزال لا يمكن الاتصال بعد التكوين؟**
  - ج: تحقق من صحة نقطة نهاية API، بما في ذلك مسار `/v1`
  - ج: تحقق من صلاحية مفتاح API والرصيد
  - ج: تحقق مما إذا كانت الشبكة المحلية تحتاج إلى وكيل

- **س: الاستجابة بطيئة؟**
  - ج: اختر مزودًا أقرب جغرافيًا
  - ج: استخدم خطة محسّنة للبرمجة بدلاً من خطة API العامة
  - ج: استخدم `/compact` لتقليل استخدام الرموز

- **س: بعض الميزات غير متاحة؟**
  - ج: بعض المزودين من الأطراف الثالثة قد لا يدعمون جميع ميزات Claude Code بالكامل
  - ج: تحقق من وثائق المزود لمعرفة نطاق الميزات المدعومة

---

## الموارد المرجعية

- [وثائق Claude Code الرسمية](https://code.claude.com/docs)
- [Claude Code على GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
