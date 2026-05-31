# الدليل الشامل لفرق وكيل Claude

## مقدمة في فرق الوكيل

**فرق الوكيل (Agent Teams)** هي ميزة ثورية في Claude Code تتيح **عدة مثيلات ذكاء اصطناعي مستقلة بالتعاون مثل فريق تطوير حقيقي**.

تخيل أن استخدام Claude Code في الماضي كان مثل أن تكون مدير مشروع يعمل مع مساعد واحد استثنائي القدرة. مهما كانت المهمة معقدة، كان ذلك المساعد الواحد فقط هو من يقوم بالعمل. الآن، مع فرق الوكيل، يمكنك تجميع فريق تطوير AI كامل: عضو واحد يمكنه التعامل مع الواجهة الأمامية، وآخر مع الواجهة الخلفية، وثالث مع الاختبار، ويمكنهم **العمل في نفس الوقت، والتواصل مع بعضهم البعض، والتعاون لإكمال المهام المعقدة**.

### من مساعد واحد إلى تعاون الفريق

قبل الغوص في فرق الوكيل، دعونا أولاً نفهم المشكلة التي يحلها.

**قيود وضع AI الواحد**:

عند استخدام مثيل Claude واحد للتعامل مع مشروع معقد، ستواجه هذه العوائق:

- **عنق الزجاجة في المعالجة التسلسلية**: يمكن لـ AI أن يفعل شيئًا واحدًا فقط في كل مرة. على سبيل المثال، عند إعادة هيكلة مشروع، قد يحتاج إلى تحليل وحدة المصادقة أولاً، ثم وحدة قاعدة البيانات، وأخيرًا وحدة API. يجب القيام بهذه الخطوات بالتسلسل، حتى لو لم تعتمد على بعضها البعض.

- **مشكلة ازدحام السياق**: جميع المعلومات تعيش في نافذة محادثة واحدة. كلما طالت المحادثة، يمكن دفن التفاصيل المهمة المبكرة، وقد ينسى AI القرارات الرئيسية التي نوقشت سابقًا.

- **قيود المنظور الواحد**: AI واحد فقط يفكر، لذلك لا يوجد نقاش متعدد الزوايا أو تحقق. عندما تظهر قرارات تصميم معقدة، لا يوجد "زميل" للمناقشة أو تقديم منظور مختلف.

- **سقف الكفاءة**: إعادة الهيكلة الكبيرة أو تطوير الوحدات المتعددة يستغرق وقتًا طويلاً، ولا توجد طريقة لتسريعها من خلال التوازي.

**حل فرق الوكيل**:

تحل فرق الوكيل هذه المشاكل من خلال **التعاون المتوازي عبر مثيلات متعددة**:

- **عمل متوازي حقيقي**: يمكن لعدة عمليات AI العمل على مهام مختلفة في نفس الوقت. واحدة يمكنها التعامل مع واجهة المستخدم الأمامية، وأخرى واجهة API الخلفية، وثالثة تصميم قاعدة البيانات، دون التداخل مع بعضها البعض.

- **مساحات سياق مستقلة**: كل عضو في الفريق لديه نافذة سياق كاملة بسعة 200K رمز، لذلك لا يتم "نسيان" المعلومات المهمة لأن المحادثة أصبحت طويلة جدًا.

- **قدرة تعاون الفريق**: يمكن للأعضاء التواصل مباشرة، ومناقشة قرارات التصميم، والتحقق من جودة الكود مع بعضهم البعض، تمامًا مثل فريق تطوير حقيقي.

- **زيادة كبيرة في الكفاءة**: وفقًا للاختبارات الداخلية لـ Anthropic، يمكن أن تتحسن الكفاءة في إعادة هيكلة المشاريع الكبيرة بحوالي 50%.

---

## فرق الوكيل مقابل الوكيل الفرعي

قبل التعمق في بنية فرق الوكيل، يجب أن نوضح أولاً نقطة ارتباك شائعة: **ما الفرق بين فرق الوكيل والوكيل الفرعي (Subagent)**؟

كلتا الميزتين تتضمنان "عدة عمليات AI تتعاون"، لكن نموذج التعاون الخاص بهما مختلف تمامًا ومناسب لسيناريوهات مختلفة.

### الاختلافات الأساسية بنظرة سريعة

| البُعد | الوكيل الفرعي | فرق الوكيل |
|---------|-------------------|----------------------|
| **الطوبولوجيا** | طوبولوجيا نجمية: جميع الوكلاء الفرعيين يقدمون تقاريرهم للوكيل الرئيسي | طوبولوجيا شبكية: يمكن للأعضاء التواصل مع بعضهم البعض |
| **أسلوب التواصل** | الوكيل الرئيسي يمرر المعلومات صراحة عبر المطالبات، والوكلاء الفرعيون يعيدون النتائج عند الانتهاء | يمكن للأعضاء التواصل والمناقشة والتنسيق مباشرة |
| **إدارة السياق** | كل وكيل فرعي لديه سياق مستقل، والوكيل الرئيسي يمرر المعلومات الضرورية فقط | كل عضو لديه سياق مستقل بالكامل |
| **التوازي** | يمكن التشغيل بالتوازي، لكن سلسلة التعاون لا تزال تتمحور حول الوكيل الرئيسي | تطوير وتعاون متوازي حقيقي |
| **تنسيق المهام** | الوكيل الرئيسي يوزع وينسق كل شيء مركزيًا | يمكن للأعضاء تولي المهام بشكل أكثر استقلالية |
| **التكلفة** | ليست منخفضة. يتراكم استخدام الرموز عند تشغيل عدة وكلاء فرعيين بالتوازي | أعلى. يعمل الأعضاء بشكل مستقل ويتواصلون بشكل أكثر تكرارًا |

### تشبيه حدسي

**الوكيل الفرعي مثل**: مدير يكتب ملاحظات مهام منفصلة لعدة مساعدين. كل مساعد يعمل بشكل مستقل بناءً على ملاحظة مهمته الخاصة، وعند الانتهاء، يعيد النتيجة فقط للمدير. المساعدون لا يتواصلون مباشرة، والمدير لا يرى عملية التفكير الكاملة للمساعدين أثناء عملهم.

```
أنت → الوكيل الرئيسي → الوكيل الفرعي A: "حلل هذا الملف"
أنت → الوكيل الرئيسي → الوكيل الفرعي B: "ابحث عن تلك الدالة"
         ↓
    الوكيل الفرعي A يكتمل → يقدم تقريرًا بالنتيجة للوكيل الرئيسي
    الوكيل الفرعي B يكتمل → يقدم تقريرًا بالنتيجة للوكيل الرئيسي
         ↓
    الوكيل الرئيسي يجمع النتائج → يقدم تقريرًا لك
```

**فرق الوكيل مثل**: مدير مشروع يقود فريق تطوير حقيقي. يمكن لأعضاء الفريق التواصل والمناقشة والتعاون مباشرة، بدلاً من توجيه كل تفصيلة عبر مدير المشروع.

```
أنت → قائد الفريق: "قم ببناء ميزة مصادقة المستخدم"
         ↓
    قائد الفريق ينشئ الفريق ويخصص المهام
         ↓
    العضو A: "@العضو B، هل تصميم واجهة API جاهز؟"
    العضو B: "نعم، هذا هو التنسيق..."
    العضو C: "راجعت الواجهة ووجدت شيئًا يجب أن نناقشه..."
         ↓
    أعضاء الفريق يتعاونون لإنهاء العمل → قائد الفريق يجمع النتيجة → يقدم تقريرًا لك
```

### متى تستخدم أي منهما

**استخدم الوكيل الفرعي عندما**:

- لديك مهمة واحدة سريعة وواضحة، مثل "ابحث عن رمز الخطأ هذا"
- المهام لا تعتمد كثيرًا على بعضها البعض
- تريد تنفيذًا متوازيًا، لكنك لا تحتاج إلى مناقشة مستمرة بين الأعضاء

**استخدم فرق الوكيل عندما**:

- تقوم بإعادة هيكلة نظام معقد يمتد عبر وحدات متعددة
- تحتاج إلى تحليل ومناقشة متعدد الزوايا، مثل خبير أمن وخبير أداء يناقشان حلًا
- تحتاج إلى تطوير متوازي حقيقي، مع الواجهة الأمامية والخلفية والاختبار يحدث في نفس الوقت
- المهام تتطلب تنسيقًا ومشاركة معلومات متكررة

### ملخص بسيط

- **الوكيل الفرعي**: أداة توزيع مهام تقسم مهمة كبيرة إلى مهام أصغر وتوزعها على "عمال" مختلفين
- **فرق الوكيل**: فريق تعاوني حقيقي حيث يمكن للأعضاء التواصل والمناقشة والعمل معًا مثل فريق حقيقي

---

## البنية الأساسية

فرق الوكيل ليست مجرد ميزة "فتح مثيلات متعددة" بسيطة. إنها **نظام تعاون متعدد الوكلاء** كامل. لفهمها، نحتاج إلى فهم مكوناتها الأساسية وكيفية عملها معًا.

### تكوين الفريق

يتكون فريق الوكيل من أربعة مكونات أساسية، لكل منها مسؤوليته الخاصة، يعملون معًا لإكمال المهام المعقدة.

**قائد الفريق (Team Lead)**

قائد الفريق هو "الدماغ" و"المنسق" للفريق بأكمله. لا يقوم بمهام البرمجة مباشرة. بدلاً من ذلك، هو مسؤول عن:

- **تحليل المتطلبات وتفكيك المهام**: تفكيك متطلبات المستخدم المعقدة إلى مهام فرعية متعددة يمكن تشغيلها بالتوازي
- **إنشاء الفريق وإدارته**: تحديد عدد الأعضاء المطلوبين وما يجب أن يفعله كل عضو
- **تخصيص المهام والجدولة**: تعيين المهام للأعضاء المناسبين وإدارة تبعيات المهام
- **تلخيص النتائج والتحكم في الجودة**: جمع عمل كل عضو ودمجه والقيام بالمراجعة النهائية

**أعضاء الفريق (Teammates)**

أعضاء الفريق هم "المطورون" الفعليون الذين يقومون بالعمل. كل عضو هو مثيل Claude مستقل:

- **نافذة سياق مستقلة**: كل عضو لديه نافذة سياق كاملة بسعة 200K رمز، معزولة تمامًا عن قائد الفريق والأعضاء الآخرين
- **صلاحيات أدوات كاملة**: يمكنهم استخدام جميع الأدوات مثل Read و Write و Edit و Bash
- **استلام المهام المستقل**: يمكنهم اختيار واستلام المهام من لوحة المهام المشتركة بشكل مستقل
- **قدرة التواصل المباشر**: يمكنهم التواصل مباشرة مع الأعضاء الآخرين بدلاً من المرور دائمًا عبر قائد الفريق

**قائمة المهام (TaskList)**

قائمة المهام هي "أداة إدارة المشاريع" للفريق، مشابهة لـ Jira أو Trello:

- **إدارة حالة المهام**: كل مهمة لها حالة واضحة: `pending` أو `in_progress` أو `completed`
- **إدارة التبعيات**: يمكن للمهام تعريف التبعيات، والمهام التابعة لا يمكن أن تبدأ إلا بعد انتهاء المهام المسبقة
- **آلية الفتح التلقائي**: عند اكتمال مهمة واحدة، يتحقق النظام تلقائيًا ويفتح المهام التي تنتظرها
- **آلية قفل الملفات**: عندما يستلم عضو مهمة ويبدأ العمل، يتم إنشاء ملف قفل في دليل المهام لمنع أعضاء متعددين من تحرير نفس الملف في نفس الوقت

**نظام المراسلة (Messaging System)**

نظام المراسلة هو "أداة الدردشة" بين أعضاء الفريق:

- **اتصال من نقطة إلى نقطة**: يمكن للعضو A إرسال رسالة مباشرة إلى العضو B
- **إعلانات البث**: يمكن إرسال رسالة إلى جميع الأعضاء في وقت واحد
- **مبني على نظام الملفات**: يتم تخزين الرسائل كملفات JSON في `~/.claude/teams/{team-name}/inboxes/`
- **لا يحتاج إلى شبكة**: كل شيء يعمل بالكامل من خلال نظام الملفات المحلي، دون الحاجة إلى اتصال شبكة أو استماع على منفذ

### تدفق التعاون

يبدو سير عمل فرق الوكيل النموذجي هكذا:

```
المستخدم يقدم متطلبًا معقدًا
       ↓
قائد الفريق يحلل المتطلب ويقسمه إلى مهام
       ↓
ينشئ أعضاء الفريق ويهيئ قائمة المهام
       ↓
       ├─→ العضو A يستلم المهمة 1 ─┐
       ├─→ العضو B يستلم المهمة 2 ─┼→ تشغيل متوازي
       ├─→ العضو C يستلم المهمة 3 ─┤
       │                             ↓
       └──────────────────────────── الأعضاء ينسقون عبر نظام المراسلة
                                     ↓
                          عند اكتمال جميع المهام، يجمع قائد الفريق النتيجة
                                     ↓
                          المخرج النهائي يتم تسليمه للمستخدم
```

### تخطيط نظام الملفات

تنشئ فرق الوكيل أدلة مخصصة على نظام الملفات المحلي لإدارة حالة الفريق:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # إعدادات الفريق (قائمة الأعضاء، اختيار النموذج، إلخ)
│       └── inboxes/
│           ├── team-lead.json   # صندوق وارد قائد الفريق
│           ├── teammate-1.json  # صندوق وارد العضو 1
│           └── teammate-2.json  # صندوق وارد العضو 2
└── tasks/
    └── {team-name}/
        ├── task-1.json          # معلومات تفصيلية للمهمة 1
        ├── task-2.json          # معلومات تفصيلية للمهمة 2
        └── current_tasks/
            └── parse_if_statement.txt  # ملف القفل الذي يتم إنشاؤه أثناء تشغيل مهمة
```

ميزة هذا التصميم هي **الشفافية الكاملة**: يمكنك فحص حالة الفريق وتقدم المهام وتاريخ التواصل بين الأعضاء في أي وقت.

---

## البدء السريع

### تفعيل الميزة التجريبية

فرق الوكيل هي حاليًا **ميزة تجريبية** ومعطلة افتراضيًا. لاستخدامها، تحتاج إلى تفعيلها أولاً.

**الطريقة الأسهل: دع Claude Code يفعلها لك**

اكتب هذا مباشرة في Claude Code:

```
Help me enable Agent Teams in settings.json
```

أو:

```
Enable the experimental feature agentTeams
```

سيقوم Claude Code تلقائيًا بتعديل `~/.claude/settings.json` وإضافة الإعداد التالي:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**أعد تشغيل Claude Code**

بعد إضافة الإعداد، **أغلق بالكامل وأعد تشغيل Claude Code**، وستصبح الميزة سارية المفعول.

**الإعداد اليدوي (إذا لم تعمل الطريقة التلقائية)**:

يمكنك تعديل `~/.claude/settings.json` يدويًا وإضافة أو تغيير:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**كيفية التحقق من تفعيلها**

بعد إعادة تشغيل Claude Code، جرب محادثة مثل هذه:

```
أنت: هل يمكنك مساعدتي في إنشاء فريق وكيل؟

Claude: نعم! يمكنني مساعدتك في إنشاء فريق وكيل للتعاون في مهمة...
```

إذا فهم Claude واستجاب لطلب إنشاء فريق، فقد تم تفعيل الميزة بنجاح.

### إعداد الوضع المرئي (اختياري)

إذا كنت تريد رؤية عمل أعضاء الفريق في الوقت الفعلي، يمكنك تهيئة **وضع العرض مقسم الأجزاء**.

**دع Claude Code يقوم بالإعداد لك**:

اكتب هذا مباشرة في Claude Code:

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

أو:

```
Configure agent-teams to use split-panes mode
```

**تثبيت tmux (إذا لم يكن مثبتًا لديك)**:

إذا لم يكن `tmux` مثبتًا بعد، يمكنك أن تطلب من Claude Code تثبيته:

```
Help me install tmux
```

سيقوم Claude Code تلقائيًا بتشغيل أمر التثبيت المناسب بناءً على نظام التشغيل الخاص بك، سواء كان macOS أو Linux.

**كيف يبدو النتيجة المُعدّة**:

بعد الإعداد، سيعمل أعضاء الفريق في أجزاء tmux مختلفة، وستتمكن من رؤية جميع مخرجاتهم في نفس الوقت، مثل "جدار مراقبة".

```
┌─────────────────┬─────────────────┬─────────────────┐
│  العضو 1        │  العضو 2        │  العضو 3        │
│  تحليل الكود    │  بناء API       │  كتابة الاختبارات│
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**الإعداد اليدوي (إذا لم تعمل الطريقة التلقائية)**:

يمكنك تعديل `~/.claude/settings.json` يدويًا:

```json
{
  "experimental": {
    "agentTeams": true
  },
  "agent-teams": {
    "displayMode": "split-panes",
    "terminalMultiplexer": "tmux"
  }
}
```

---

### مثال عملي: بناء لعبة RPG على طراز بوكيمون مع فرق الوكيل

دعونا نختبر قوة فرق الوكيل من خلال مشروع كامل. سيوضح هذا المثال كيف يمكن لعدة أعضاء AI في الفريق التعاون لبناء لعبة RPG من الصفر، بما في ذلك نظام القتال وميزات الحوار وعناصر الاستكشاف.

**متطلبات المشروع**:

بناء لعبة RPG ويب على طراز بوكيمون بالملامح التالية:

- **نظام الشخصيات**: يمكن للاعب إنشاء شخصية بمستوى ونقاط الصحة والهجوم والدفاع وغيرها من الإحصائيات
- **نظام القتال**: قتال دوري بخيارات الهجوم والمهارات والعناصر والهروب
- **نظام الوحوش**: وحوش برية متعددة بسمات ومهارات مختلفة
- **نظام الحوار**: محادثات NPC ومهام فرعية
- **استكشاف الخريطة**: خريطة ثنائية الأبعاد بسيطة يمكن للاعب التنقل بين المشاهد
- **نظام الحفظ**: حفظ تقدم اللعبة، بما في ذلك المستوى والموقع والمهام المكتملة والمزيد
- **المؤثرات الصوتية والرسوم المتحركة**: تأثيرات بصرية وصوتية للهجوم والضرر ورفع المستوى

**اكتب هذا في Claude Code**:

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene switching
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Use Framer Motion for animation
- Use Zustand for state management
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**كيف سيقوم Claude بالتنفيذ**:

**المرحلة 1: تصميم البنية**

سيطلب قائد الفريق أولاً من العضو A، مهندس اللعبة، تصميم البنية الشاملة:

```
العضو A يصمم بنية اللعبة...

مكدس التقنية: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

تهيئة المشروع:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

هيكل الملفات:
src/
├── App.tsx                 # مكون التطبيق الرئيسي
├── main.tsx                # ملف الدخول
├── types/
│   ├── player.ts           # تعريفات أنواع اللاعب
│   ├── monster.ts          # تعريفات أنواع الوحوش
│   ├── skill.ts            # تعريفات أنواع المهارات
│   └── game.ts             # أنواع حالة اللعبة
├── stores/
│   └── gameStore.ts        # إدارة حالة Zustand
├── components/
│   ├── map/                # مكونات الخريطة
│   │   ├── MapCanvas.tsx   # Canvas الخريطة
│   │   ├── PlayerSprite.tsx # كيان اللاعب
│   │   └── NPCSprite.tsx   # كيان NPC
│   ├── battle/             # مكونات القتال
│   │   ├── BattleScreen.tsx    # شاشة القتال
│   │   ├── BattleMenu.tsx      # قائمة القتال
│   │   ├── HPBar.tsx           # مكون شريط HP
│   │   └── BattleLog.tsx       # سجل القتال
│   ├── dialog/             # مكونات الحوار
│   │   ├── DialogBox.tsx   # صندوق الحوار
│   │   └── Choices.tsx     # مكون الخيارات
│   └── ui/                 # مكونات UI المشتركة
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # منطق نظام القتال
│   ├── DialogSystem.ts     # منطق نظام الحوار
│   ├── QuestSystem.ts      # منطق نظام المهام
│   └── MapSystem.ts        # منطق نظام الخريطة
├── hooks/
│   ├── useBattle.ts        # خطاف القتال
│   ├── useDialog.ts        # خطاف الحوار
│   └── useAudio.ts         # خطاف الصوت
├── data/
│   ├── monsters.ts         # بيانات الوحوش
│   ├── skills.ts           # بيانات المهارات
│   ├── dialogues.ts        # نصوص الحوار
│   └── maps.ts             # بيانات الخريطة
└── utils/
    ├── audio.ts            # أدوات الصوت
    └── storage.ts          # أدوات الحفظ

تصميم بنية البيانات الأساسية:

// types/player.ts - نوع اللاعب
interface Player {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  position: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  gold: number;
  items: string[];
}

// types/skill.ts - نوع المهارة
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// حالة اللعبة
{
  screen: 'map' | 'battle' | 'dialog' | 'menu',
  player: Player,
  currentMap: string,
  position: {x: number, y: number},
  inBattle: boolean,
  dialogQueue: Array<Dialog>,
  gameData: {
    completedQuests: string[],
    items: string[],
    visitedMaps: string[]
  }
}

تصميم نظام القتال:
- قتال دوري، اللاعب يتحرك أولاً
- كل دور يمكن للاعب الاختيار: هجوم، مهارة، عنصر، أو هروب
- المهارات لها حدود PP ويجب استعادتها عند النفاد
- معادلة الضرر: (هجوم المهاجم / دفاع المدافع) × قوة المهارة × عامل عشوائي (0.85~1.0)

تصميم نظام الحوار:
- تأثير الآلة الكاتبة لعرض النص
- يدعم الخيارات المتفرعة
- يدعم المحفزات المشروطة، مثل بعد إكمال مهمة
- الشخصيات غير اللاعبة (NPC) لها اتجاه، وتُفعّل المحادثات تلقائيًا عندما يقترب اللاعب
```

**المرحلة 2: التطوير المتوازي**

بمجرد تأكيد البنية، ينشئ قائد الفريق قائمة المهام ويبدأ الأعضاء الآخرون العمل بالتوازي:

```
قائمة المهام:
├── [العضو B] تنفيذ منطق نظام القتال الأساسي (قيد التنفيذ...)
├── [العضو C] تنفيذ أنظمة الحوار والمهام (قيد التنفيذ...)
├── [العضو D] تنفيذ عرض الخريطة ثنائية الأبعاد (قيد التنفيذ...)
└── [العضو E] تصميم واجهة المستخدم والصوت (قيد التنفيذ...)
```

<details>
<summary>📁 العضو B: كود نظام القتال الأساسي</summary>

```javascript
// battle.js - نظام القتال
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // هجوم اللاعب
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} استخدم ${skill.name}!`);
    this.log.push(`تسبب في ${damage} ضرر!`);

    // تأثير المهارة
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // التحقق من انتهاء القتال
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} سقط!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // هجوم الوحش
  monsterAttack() {
    if (this.state !== 'active') return;

    // اختيار مهارة عشوائية
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} استخدم ${skill.name}!`);
    this.log.push(`تسبب في ${damage} ضرر!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} سقط...`);
    } else {
      this.turn = 'player';
    }
  }

  // حساب الضرر
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // مكافأة أفضلية النوع (مبسطة)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // تطبيق تأثير المهارة
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} احترق!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} استعاد ${healAmount} HP!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`ارتفع هجوم ${user.name}!`);
        break;
    }
  }

  // كسب الخبرة
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} حصل على ${expGain} EXP!`);

    // التحقق من رفع المستوى
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // رفع المستوى
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // نمو الإحصائيات
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} ارتفع إلى المستوى ${this.player.level}!`);
    this.log.push(`HP +${hpGain}, هجوم +${atkGain}, دفاع +${defGain}`);
  }

  // الهروب
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('هربت بنجاح!');
      return true;
    } else {
      this.log.push('فشل الهروب!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - بيانات الوحوش
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'السلايم',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: 'الاصطدام', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'الغوبلن',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'الاصطدام', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'الخدش', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'التنين الصغير',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'الخدش', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'الشرارة', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'الهدير', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 العضو C: كود نظام الحوار والمهام</summary>

```javascript
// dialog.js - نظام الحوار
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // عرض الحوار
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // عرض عنصر الحوار التالي
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // معالجة أنواع الحوار الخاصة
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // عرض صندوق الحوار
  renderDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const speakerEl = document.getElementById('dialogSpeaker');
    const textEl = document.getElementById('dialogText');

    if (this.currentDialog.speaker) {
      speakerEl.textContent = this.currentDialog.speaker;
      speakerEl.style.display = 'block';
    } else {
      speakerEl.style.display = 'none';
    }

    // تأثير الآلة الكاتبة
    textEl.textContent = '';
    let i = 0;
    const text = this.currentDialog.text;
    const speed = this.currentDialog.speed || 30;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, speed);

    // عرض الخيارات إن وجدت
    this.renderChoices();
  }

  // عرض الخيارات
  renderChoices() {
    if (!this.currentDialog.choices) return;

    const choicesEl = document.getElementById('dialogChoices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'block';

    this.currentDialog.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.condition === undefined || choice.condition()) {
          this.dialogQueue = [];
          this.showDialog(choice.dialog, this.onComplete);
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  // التالي
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // يجب الاختيار عند وجود خيارات
    this.showNext();
  }
}

// نظام المهام
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // قبول مهمة
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // تحديث تقدم المهمة
  updateProgress(type, target) {
    this.activeQuests.forEach(questId => {
      const quest = this.quests[questId];
      if (!quest) return;

      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          obj.current = (obj.current || 0) + 1;
          if (obj.current >= obj.required) {
            obj.completed = true;
          }
        }
      });

      this.checkCompletion(questId);
    });
  }

  // التحقق من إكمال المهمة
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // إكمال المهمة
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // منح المكافآت
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // منح المكافآت
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - أمثلة نصوص الحوار
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'زعيم القرية', text: 'آه، أيها المغامر... لقد وصلت أخيرًا.'},
      {speaker: 'زعيم القرية', text: 'في الآونة الأخيرة، ظهرت العديد من الوحوش البرية بالقرب من قريتنا، والجميع خائف.'},
      {speaker: 'زعيم القرية', text: 'إذا يمكنك مساعدتنا في طردها، سأكون ممتنًا جدًا!'},
      {
        choices: [
          {text: 'حسنًا، أقبل هذه المهمة', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'زعيم القرية', text: 'رائع! يرجى هزيمة 3 سلايم في الشمال.'},
              {speaker: 'النظام', text: 'تم قبول المهمة [طرد السلايم]!'}
            ];
          }},
          {text: 'أنا مشغول قليلاً الآن', dialog: [
            {speaker: 'زعيم القرية', text: 'حسنًا. عد عندما تكون مستعدًا.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'زعيم القرية', text: 'لقد فعلتها حقًا! شكرًا جزيلاً لك!'},
      {speaker: 'النظام', text: 'تم إكمال المهمة [طرد السلايم]! حصلت على 100 EXP!'},
      {speaker: 'زعيم القرية', text: 'يرجى قبول هذا. إنه عربون شكر صغير مني.'}
    ]
  },

  shopkeeper: [
    {speaker: 'صاحب المتجر', text: 'أهلاً! هل تبحث عن شيء ما؟'},
    {
      choices: [
        {text: 'تصفح البضائع', dialog: () => {
          game.openShop();
          return [{speaker: 'صاحب المتجر', text: 'خذ ما يعجبك!'}];
        }},
        {text: 'المغادرة', dialog: [{speaker: 'صاحب المتجر', text: 'تعال مرة أخرى في المرة القادمة!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 العضو D: كود نظام عرض الخريطة ثنائية الأبعاد</summary>

```javascript
// map.js - نظام عرض الخريطة
class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = 32;
    this.currentMap = null;
    this.player = null;
    this.npcs = [];
    this.camera = {x: 0, y: 0};
  }

  // تحميل الخريطة
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // عرض الخريطة
  render() {
    if (!this.currentMap) return;

    // مسح الـ canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // حفظ السياق
    this.ctx.save();

    // تطبيق إزاحة الكاميرا
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // عرض طبقات الخريطة
    this.renderLayers();

    // عرض الشخصيات غير اللاعبة
    this.renderNPCs();

    // عرض اللاعب
    this.renderPlayer();

    // استعادة السياق
    this.ctx.restore();
  }

  // عرض طبقات الخريطة
  renderLayers() {
    const map = this.currentMap;

    for (let layer = 0; layer < map.layers.length; layer++) {
      const data = map.layers[layer].data;

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tileId = data[y * map.width + x];
          if (tileId === 0) continue;

          const tileX = x * this.tileSize;
          const tileY = y * this.tileSize;

          this.renderTile(tileX, tileY, tileId);
        }
      }
    }
  }

  // عرض بلاطة واحدة
  renderTile(x, y, tileId) {
    // رسم بلاطات مختلفة بناءً على معرف البلاطة
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // نسيج العشب
        this.ctx.fillStyle = '#3d7f3d';
        for (let i = 0; i < 3; i++) {
          const px = x + Math.random() * this.tileSize;
          const py = y + Math.random() * this.tileSize;
          this.ctx.fillRect(px, py, 2, 2);
        }
        break;

      case 'water':
        this.ctx.fillStyle = '#4a90d9';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // تأثير التموج
        const wave = Math.sin(Date.now() / 500 + x / 20) * 2;
        this.ctx.fillStyle = '#5aa0e9';
        this.ctx.fillRect(x, y + 10 + wave, this.tileSize, 2);
        break;

      case 'wall':
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = '#7a6248';
        this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        break;

      case 'path':
        this.ctx.fillStyle = '#c4a77d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        break;

      case 'house':
        this.ctx.fillStyle = '#a0522d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // السقف
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // الحصول على نوع البلاطة
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // عرض الشخصيات غير اللاعبة
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // رسم NPC
      this.ctx.fillStyle = npc.color || '#ff6b6b';
      this.ctx.beginPath();
      this.ctx.arc(
        x + this.tileSize / 2,
        y + this.tileSize / 2,
        this.tileSize / 3,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // رسم الاسم
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // عرض اللاعب
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // جسم اللاعب
    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2,
      y + this.tileSize / 2,
      this.tileSize / 3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // مؤشر اتجاه اللاعب
    const directions = {UP: [0, -8], DOWN: [0, 8], LEFT: [-8, 0], RIGHT: [8, 0]};
    const [dx, dy] = directions[this.player.direction] || [0, 0];

    this.ctx.fillStyle = '#2d3436';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2 + dx,
      y + this.tileSize / 2 + dy,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  // تحديث موقع الكاميرا
  updateCamera() {
    if (!this.player) return;

    // الكاميرا تتبع اللاعب وتبقيه في المنتصف
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // حركة سلسة
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // منع الكاميرا من تجاوز حدود الخريطة
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // التحقق من التصادم
  checkCollision(x, y) {
    // التحقق من حدود الخريطة
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // التحقق من تصادم البلاطات
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // الجدران والمنازل هي عوائق

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // التحقق من تصادم الشخصيات غير اللاعبة
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // تفعيل حوار NPC
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // تفعيل حوار NPC
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// مثال على بيانات الخريطة
const VILLAGE_MAP = {
  name: 'قرية البداية',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // بيانات الخريطة (مبسطة)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... المزيد من بيانات الخريطة
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'زعيم القرية',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'صاحب المتجر',
      x: 15,
      y: 8,
      color: '#6bcf7f',
      dialogue: DIALOGUES.shopkeeper,
      direction: 'DOWN'
    }
  ],
  exits: [
    {x: 10, y: 0, to: 'forest_map', spawnX: 5, spawnY: 14}
  ]
};
```

</details>

<details>
<summary>📁 العضو E: كود واجهة قتال</summary>

```html
<!-- HTML شاشة القتال -->
<div id="battleScreen" class="screen hidden">
  <!-- منطقة العدو -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">السلايم</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- منطقة اللاعب -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">البطل</div>
      <div class="level">Lv. <span id="playerLevel">5</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="playerHpBar" style="width: 80%"></div>
      </div>
      <div class="hp-text">
        <span id="playerHp">80</span> / <span id="playerMaxHp">100</span>
      </div>
      <div class="exp-bar">
        <div class="exp-fill" id="expBar" style="width: 60%"></div>
      </div>
    </div>
    <div class="player-sprite">
      <canvas id="playerSprite" width="128" height="128"></canvas>
    </div>
  </div>

  <!-- قائمة القتال -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">هجوم</button>
      <button class="menu-btn" data-action="skills">المهارات</button>
      <button class="menu-btn" data-action="items">العناصر</button>
      <button class="menu-btn" data-action="flee">هروب</button>
    </div>
  </div>

  <!-- قائمة المهارات الفرعية -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">اختر مهارة</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">رجوع</button>
  </div>

  <!-- سجل القتال -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - أنماط شاشة القتال */
.battle-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f7fa 50%, #4a5568 50%, #2d3748 100%);
  display: flex;
  flex-direction: column;
}

.enemy-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.monster-sprite canvas {
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.monster-info {
  margin-left: 40px;
  text-align: center;
}

.monster-info .name {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.monster-info .level {
  font-size: 14px;
  color: #718096;
  margin: 8px 0;
}

.hp-bar {
  width: 200px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a5568;
}

.hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  transition: width 0.3s ease;
}

.hp-text {
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
}

.player-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
}

.player-info {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #4a5568;
}

.exp-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4299e1, #3182ce);
  border-radius: 4px;
}

.battle-menu {
  background: rgba(255,255,255,0.95);
  border: 3px solid #4a5568;
  border-radius: 12px;
  padding: 20px;
  margin: 0 40px 40px;
}

.menu-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.menu-btn {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  border: 2px solid #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: linear-gradient(180deg, #4299e1 0%, #3182ce 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.battle-log {
  position: absolute;
  bottom: 120px;
  left: 40px;
  right: 40px;
  max-height: 100px;
  overflow-y: auto;
  background: rgba(0,0,0,0.7);
  border-radius: 8px;
  padding: 12px;
}

#battleLog {
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}

.log-entry {
  margin-bottom: 4px;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* رسوم الهجوم المتحركة */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* رسوم الهجوم المتحركة */
@keyframes attackRight {
  0% { transform: translateX(0); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

.attack-right {
  animation: attackRight 0.3s ease-in-out;
}
```

</details>

<details>
<summary>📁 كود نظام الصوت</summary>

```javascript
// audio.js - نظام الصوت
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // تهيئة سياق الصوت
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // تشغيل الموسيقى الخلفية
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // استخدام المذبذبات لتوليد موسيقى خلفية بسيطة
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // توليد موسيقى خلفية بسيطة
  playGeneratedBgm(type) {
    const melodies = {
      battle: [262, 294, 330, 262, 294, 330, 349, 330],
      village: [330, 349, 392, 349, 330, 294, 262, 294],
      victory: [392, 440, 494, 523, 494, 440, 392, 349]
    };

    const melody = melodies[type] || melodies.village;
    let noteIndex = 0;

    const playNote = () => {
      if (this.currentBgm !== type) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = melody[noteIndex];
      osc.type = 'triangle';

      gain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.4);

      noteIndex = (noteIndex + 1) % melody.length;
      setTimeout(playNote, 500);
    };

    playNote();
  }

  // إيقاف الموسيقى الخلفية
  stopBgm() {
    this.currentBgm = null;
  }

  // تشغيل مؤثر صوتي
  playSfx(sfxName) {
    this.init();

    switch(sfxName) {
      case 'attack':
        this.playAttackSound();
        break;
      case 'hit':
        this.playHitSound();
        break;
      case 'victory':
        this.playVictorySound();
        break;
      case 'levelup':
        this.playLevelUpSound();
        break;
      case 'dialog':
        this.playDialogSound();
        break;
    }
  }

  // مؤثر صوتي للهجوم
  playAttackSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.1
    );
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // مؤثر صوتي للإصابة
  playHitSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 100;
    osc.type = 'square';

    gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // مؤثر صوتي للنصر
  playVictorySound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.5
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
      }, i * 150);
    });
  }

  // مؤثر صوتي لرفع المستوى
  playLevelUpSound() {
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'triangle';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.3
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
      }, i * 100);
    });
  }

  // مؤثر صوتي للحوار
  playDialogSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.05
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}
```

</details>

**حوار التعاون بين الأعضاء**:

```
العضو B → العضو C:
"نظام القتال جاهز. عندما يفوز اللاعب، يستدعي giveExp() لرفع المستوى.
يرجى التحقق من نظام المهام والتأكد من حفظ بيانات رفع المستوى بشكل صحيح."

العضو C → العضو B:
"فهمت. نظام المهام يخزن بيانات اللعبة باستخدام localStorage،
بما في ذلك المستوى والخبرة وقائمة المهام المكتملة. سأضيف آلية حفظ تلقائي."

العضو D → الجميع:
"نظام عرض الخريطة جاهز، وبيانات اتجاه NPC متصلة الآن بنظام الحوار.
عندما يواجه اللاعب NPC، سيتم تفعيل الحوار تلقائيًا. يرجى تأكيد منطق التفعيل في نظام الحوار."

العضو C → العضو D:
"مؤكد. DialogSystem لديه طريقة showDialog() يمكنها قبول مصفوفة حوار.
سأتأكد من أن جميع بيانات حوار NPC تتبع هذا التنسيق."

العضو E → العضو B:
"واجهة القتال جاهزة، لكنني أحتاج بيانات اللاعب والوحش في الوقت الفعلي لتحديث أشرطة HP.
هل يوفر نظام القتال استدعاءًا (callback)؟"

العضو B → العضو E:
"نعم. BattleSystem لديه استدعاء onUpdate يعمل في نهاية كل دور.
يمكنك تسجيل هذا الاستدعاء لتحديث واجهة المستخدم."

العضو E → العضو D:
"عند تبديل الخرائط، نحتاج إلى إعادة تموضع الكاميرا.
هل يوفر MapRenderer طريقة updateCamera()؟"

العضو D → العضو E:
"نعم. يتم استدعاء updateCamera() تلقائيًا بعد كل loadMap().
يمكنك أيضًا استدعاؤها يدويًا بعد تحرك اللاعب لتحديث الكاميرا بسلاسة."
```

**المرحلة 3: التكامل والاختبار**

بعد اكتمال جميع المكونات، قائد الفريق مسؤول عن التكامل:

<details>
<summary>📁 كود متحكم اللعبة الرئيسي</summary>

```javascript
// game.js - متحكم اللعبة الرئيسي
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // تهيئة كل نظام
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // تحميل الخريطة
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // معالجة الإدخال
    this.setupInput();

    // بدء حلقة اللعبة
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // تحميل الحفظ تلقائيًا
    this.loadGame();
  }

  // إنشاء اللاعب
  createPlayer() {
    return {
      name: 'البطل',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: 'الاصطدام', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // إعداد معالجة الإدخال
  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (this.state === 'map') {
        this.handleMapInput(e);
      } else if (this.state === 'dialog') {
        this.handleDialogInput(e);
      } else if (this.state === 'battle') {
        this.handleBattleInput(e);
      }
    });
  }

  // معالجة إدخال الخريطة
  handleMapInput(e) {
    if (this.dialogSystem.isShowing) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.dialogSystem.next();
      }
      return;
    }

    let dx = 0, dy = 0;
    switch(e.key) {
      case 'ArrowUp': case 'w': dy = -1; this.player.direction = 'UP'; break;
      case 'ArrowDown': case 's': dy = 1; this.player.direction = 'DOWN'; break;
      case 'ArrowLeft': case 'a': dx = -1; this.player.direction = 'LEFT'; break;
      case 'ArrowRight': case 'd': dx = 1; this.player.direction = 'RIGHT'; break;
      default: return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (!this.mapRenderer.checkCollision(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.mapRenderer.updateCamera();

      // التحقق من المعركة العشوائية
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // حفظ اللعبة
      this.saveGame();
    }
  }

  // معالجة إدخال الحوار
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // معالجة إدخال القتال
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // بدء القتال
  startBattle(monsterData) {
    // اختيار وحش عشوائي
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // إنشاء مثيل الوحش
    const monster = {
      ...randomMonster,
      level: Math.max(1, this.player.level + Math.floor(Math.random() * 3) - 1),
      hp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      maxHp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      attack: randomMonster.baseAtk + randomMonster.baseAtk * 0.15 * this.player.level,
      defense: randomMonster.baseDef + randomMonster.baseDef * 0.1 * this.player.level
    };

    this.battleSystem = new BattleSystem(this.player, monster);
    this.state = 'battle';

    // تشغيل موسيقى القتال
    this.audioManager.playBgm('battle');

    // عرض شاشة القتال
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // تحديث واجهة القتال
    this.updateBattleUI();
  }

  // تحديث واجهة القتال
  updateBattleUI() {
    if (!this.battleSystem) return;

    const player = this.battleSystem.player;
    const monster = this.battleSystem.monster;

    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerHp').textContent = Math.floor(player.hp);
    document.getElementById('playerMaxHp').textContent = player.maxHp;
    document.getElementById('playerHpBar').style.width =
      (player.hp / player.maxHp * 100) + '%';

    document.getElementById('enemyName').textContent = monster.name;
    document.getElementById('enemyLevel').textContent = monster.level;
    document.getElementById('enemyHp').textContent = Math.floor(monster.hp);
    document.getElementById('enemyMaxHp').textContent = Math.floor(monster.maxHp);
    document.getElementById('enemyHpBar').style.width =
      (monster.hp / monster.maxHp * 100) + '%';

    // تحديث سجل القتال
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // إنهاء القتال
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // إخفاء شاشة القتال
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // تشغيل موسيقى الخريطة
    this.audioManager.playBgm('village');

    // حفظ اللعبة
    this.saveGame();
  }

  // حفظ اللعبة
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // تحميل اللعبة
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // حلقة اللعبة الرئيسية
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // مسح الـ canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // العرض حسب الحالة
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// بدء اللعبة
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**النتيجة النهائية**:

بعد حوالي ساعة إلى ساعتين، تكون لعبة RPG على طراز بوكيمون كاملة الوظائف جاهزة!

```
ملخص المشروع:
✅ تصميم بنية اللعبة - العضو A
✅ نظام القتال الدوري - العضو B
✅ نظام الحوار والمهام - العضو C
✅ عرض الخريطة ثنائية الأبعاد - العضو D
✅ واجهة المستخدم والمؤثرات الصوتية - العضو E

ملفات المشروع:
├── index.html (120 سطر)
├── css/
│   ├── main.css (100 سطر)
│   ├── battle.css (180 سطر)
│   └── dialog.css (80 سطر)
├── js/
│   ├── game.js (250 سطر)
│   ├── state.js (60 سطر)
│   ├── player.js (50 سطر)
│   ├── monster.js (80 سطر)
│   ├── battle.js (220 سطر)
│   ├── dialog.js (180 سطر)
│   ├── map.js (280 سطر)
│   └── audio.js (150 سطر)
└── data/
    ├── monsters.js (100 سطر)
    ├── skills.js (80 سطر)
    └── dialogues.js (120 سطر)

الإجمالي: حوالي 2050 سطر من الكود، أكملها 5 أعضاء AI في الفريق بشكل تعاوني!

ميزات اللعبة:
🎮 نظام القتال الدوري (هجوم، مهارات، عناصر، هروب)
💬 نظام حوار NPC (تأثير الآلة الكاتبة، خيارات متفرعة)
📜 نظام المهام (قبول المهام، تحديث التقدم، مكافآت الإكمال)
🗺️ استكشاف الخريطة ثنائية الأبعاد (انتقالات متعددة المشاهد، تفاعل NPC)
💾 حفظ تلقائي (التقدم مخزن باستخدام localStorage)
🔊 مؤثرات صوتية وموسيقى خلفية (Web Audio API)
📊 نمو الشخصية (خبرة، رفع المستوى، زيادة الإحصائيات)
```

**مراقبة الفريق أثناء العمل**:

إذا قمت بإعداد وضع أجزاء tmux المقسمة، سترى نوافذ طرفية متعددة تعمل في نفس الوقت:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  العضو B        │  العضو C        │  العضو D        │
│  تنفيذ معادلة   │  كتابة نصوص     │  عرض البلاطات   │
│  الضرر          │  الحوار         │                 │
│                 │                 │                 │
│  "العضو E،     │  "هل            │  "الوحوش        │
│   هل عرض شريط  │   MapRenderer   │   تحتاج إلى     │
│   HP نسبة؟"    │   جاهز؟"       │   رسوم متحركة..."│
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**النقاط الرئيسية**:

يوضح هذا المثال العملي عدة مزايا أساسية لفرق الوكيل:

1. **تطوير متوازي حقيقي**: 5 أعضاء يطورون أنظمة لعبة مختلفة في نفس الوقت
2. **إدارة مشاريع معقدة**: أكثر من 2000 سطر من الكود مقسمة ومدمجة بطريقة منظمة
3. **تقسيم عمل متخصص**: القتال والحوار والخرائط وواجهة المستخدم كل منها له مالك مخصص
4. **تنسيق الواجهات**: يتفاوض الأعضاء على الواجهات وتنسيقات البيانات من خلال نظام المراسلة
5. **التسليم السريع**: العمل الذي قد يستغرق أسابيع لشخص واحد يمكن للفريق إكماله في ساعات

يمكنك تجربة تشغيل هذه اللعبة بنفسك وتجربة كيف يتعاون فريق AI لبناء لعبة RPG على طراز بوكيمون.

---

### مطالبة واحدة مقابل فرق الوكيل: اختبرها بنفسك

لمساعدتك على الشعور بقوة فرق الوكيل بشكل مباشر أكثر، أعددنا خطتي اختبار يمكنك تجربتهما بنفسك والمقارنة بينهما.

#### خطة الاختبار A: نهج المطالبة الواحدة

هذا هو النهج التقليدي: استخدام مطالبة واحدة كاملة وطلب من AI تطوير اللعبة.

**اكتب هذا في Claude Code**:

```
Help me build a Pokemon-style web RPG game with the following features:
- Character system (level, HP, attack, defense)
- Turn-based battle system (attack, skills, items, flee)
- NPC dialogue system
- 2D map exploration
- Save system
- Audio system

Use React + TypeScript + Vite + Tailwind CSS.
Please give me complete code that can run directly.
```

**النتيجة المتوقعة**:

| العنصر | الوضع المتوقع |
|------|---------|
| **جودة الكود** | سيحاول AI إنشاء جميع الكود، لكن بسبب قيود السياق، سيتم حذف العديد من التفاصيل أو استبدالها بتعليقات |
| **اكتمال الميزات** | قد تكون الميزات الأساسية موجودة، لكن العديد من الميزات المتقدمة ستكون مفقودة أو مبسطة |
| **قابلية التشغيل** | قد تكون هناك أخطاء، وقد تحتاج إلى عدة جولات من التصحيح قبل التشغيل |
| **وقت التطوير** | محادثة واحدة قد تستغرق 30 إلى 60 دقيقة، مع جولات متعددة ذهابًا وإيابًا |
| **حجم الكود** | حوالي 500 إلى 800 سطر، لأن AI يميل إلى ضغط الكود |

**المشاكل التي قد تواجهها**:

1. **انقطاع الكود**: استجابات AI لها حدود طولية، لذا قد يتوقف التوليد في منتصف الطريق
2. **ميزات غير مكتملة**: نظام الحوار قد يكون نسخة أساسية فقط بدون نظام مهام
3. **تفاصيل مفقودة**: نظام الصوت قد يُترك كتعليق TODO
4. **صعوبة التصحيح**: إذا كانت هناك مشاكل في الكود، يجب أن تطلب من AI إصلاحها في نفس المحادثة، ويصبح السياق فوضويًا بشكل متزايد

#### خطة الاختبار B: نهج فرق الوكيل

هذا هو النهج المقدم في هذه المقالة: ترك أعضاء فريق AI متعددين يتعاونون في التطوير.

**اكتب هذا في Claude Code** (بعد تفعيل فرق الوكيل):

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene transitions
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use plain HTML/CSS/JavaScript
- Use Canvas to render the game screen
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**النتيجة المتوقعة**:

| العنصر | الوضع المتوقع |
|------|---------|
| **جودة الكود** | كل عضو يركز على منطقته الخاصة، لذا الكود أكثر احترافية واكتمالاً |
| **اكتمال الميزات** | جميع الميزات مطبقة بشكل أكثر اكتمالاً، بما في ذلك نظام المهام والخرائط متعددة المشاهد |
| **قابلية التشغيل** | يتقاطع الأعضاء في التحقق من الواجهات مع بعضهم البعض، لذا مشاكل التكامل أقل |
| **وقت التطوير** | حوالي ساعة إلى ساعتين لإكمال جميع الميزات لأن التطوير يحدث بالتوازي |
| **حجم الكود** | حوالي 2000+ سطر، مع تنفيذ كامل بدلاً من كود مضغوط |

#### جدول المقارنة الكمي

| البُعد | مطالبة واحدة | فرق الوكيل |
|---------|-------------|-------------|
| **إجمالي أسطر الكود** | 500-800 سطر | 2000+ سطر |
| **وقت التطوير** | 30-60 دقيقة، لكن الميزات غير مكتملة | 1-2 ساعة، مع ميزات كاملة |
| **اكتمال الميزات** | 60-70% | 95%+ |
| **قابلية الصيانة** | متوسطة، عادة ملف واحد كبير | عالية، مع تصميم معياري |
| **عدد الأخطاء** | أعلى، لأن هناك تحقق أقل | أقل، لأن الأعضاء يتحققون من بعضهم البعض |
| **قابلية التوسع المستقبلية** | صعبة، لأن الكود مقترن بإحكام | أسهل، لأن الهيكل معياري |
| **استخدام الرموز** | ~50K رمز | ~200K رمز (5 أعضاء) |
| **التكلفة** | ~$0.50 | ~$2.00 |

#### عملية الاختبار العملي الموصى بها

**الخطوة 1: اختبر نهج المطالبة الواحدة أولاً**

```
1. افتح محادثة Claude Code جديدة
2. استخدم المطالبة من "خطة الاختبار A" أعلاه
3. سجل: كم استغرق من الوقت؟ كم سطر كود تم إنتاجه؟ أي ميزات كانت مفقودة؟
```

**الخطوة 2: ثم اختبر نهج فرق الوكيل**

```
1. تأكد من تفعيل فرق الوكيل
2. استخدم المطالبة من "خطة الاختبار B" أعلاه
3. راقب: كيف يتعاون أعضاء الفريق؟ هل الكود أكثر اكتمالاً؟
```

**الخطوة 3: قارن بين النتيجتين**

```
1. شغل كلا النسختين من الكود بشكل منفصل
2. قارن قوائم الميزات: أي ميزات مفقودة في نسخة المطالبة الواحدة؟
3. قارن هيكل الكود: هل نسخة فرق الوكيل أكثر معيارية؟
4. قيّم: إذا أردت الاستمرار في تطوير هذه اللعبة، أي نسخة ستكون أسهل للتوسع؟
```

#### لماذا تحدث هذه الاختلافات

**قيود نهج المطالبة الواحدة**:

1. **ضغط السياق**: يجب على AI التعامل مع كل شيء في استجابة واحدة، لذا التبسيط أمر لا مفر منه
2. **تشتت الانتباه**: القتال والحوار والخريطة وواجهة المستخدم تتنافس جميعها على الانتباه، لذا من السهل تفويت التفاصيل
3. **لا يوجد تحقق تعاوني**: لا أحد يتحقق مما إذا كانت الواجهات متطابقة، لذا الأخطاء أكثر احتمالاً

**مزايا فرق الوكيل**:

1. **تقسيم عمل متخصص**: كل عضو يركز على منطقة واحدة ويمكنه التعمق في التفاصيل
2. **المعالجة المتوازية**: تطوير القتال والحوار والخريطة يحدث في نفس الوقت، مما يحسن الكفاءة
3. **التحقق المتبادل**: يتفاوض الأعضاء على الواجهات مع بعضهم البعض، مما يقلل مشاكل التكامل
4. **سياق مستقل**: كل عضو لديه سياق 200K الخاص به ولا يتداخل مع الآخرين

#### الخلاصة

القيمة الأساسية لفرق الوكيل ليست ببساطة أنها "أسرع"، بل أنها **"أكثر اكتمالاً وأكثر احترافية"**.

- للمشاريع البسيطة مثل لعبة الثعبان، مطالبة واحدة كافية
- للمشاريع المعقدة مثل لعبة RPG بوكيمون، يمكن لفرق الوكيل إنتاج نتائج أفضل

المفتاح هو **اختيار الأداة المناسبة**: لا تستخدم فرق الوكيل لإعادة تسمية متغير، ولا تستخدم مطالبة واحدة لبناء لعبة RPG كاملة.

---

## أفضل الممارسات

فرق الوكيل أداة قوية، لكن لاستخدامها بشكل جيد، تحتاج إلى فهم بعض أفضل الممارسات. هذه الدروس تأتي من التجربة العملية في المجتمع ويمكن أن تساعدك في تجنب الأخطاء الشائعة مع الحصول على أقصى قيمة من تعاون الفريق.

### الممارسة 1: العقد أولاً

قبل أن يبدأ عدة وكلاء العمل بالتوازي، اقضِ بعض الوقت في تعريف "عقد" واضح، أي اتفاقية الواجهة.

**لماذا هو مهم**:

لنفترض أن العضو A مسؤول عن واجهة API الخلفية والعضو B مسؤول عن تكامل الواجهة الأمامية. إذا بدأوا في نفس الوقت دون الاتفاق على تنسيق الواجهة أولاً، يمكن أن يحدث شيء مثل هذا:

```
العضو A: نفذ POST /api/login ويتوقع {username, password}
العضو B: نفذ استدعاء الواجهة الأمامية ويرسل {user, pass}
النتيجة: لا يتطابقان، ويحتاج الأمر إعادة العمل
```

**كيفية القيام بذلك**:

قبل بدء الفريق، اطلب من Claude أولاً تصميم الواجهات:

```
لا تبدأ التطوير بعد. ساعدني أولاً في تصميم واجهات نظام مصادقة المستخدم:
1. تنسيق الطلب والاستجابة لواجهة تسجيل الدخول
2. تنسيق الطلب والاستجابة لواجهة التسجيل
3. تدفق وإجراءات إعادة تعيين كلمة المرور
4. اتفاقيات معالجة الأخطاء

اكتب هذه الواجهات بوضوح، ثم فقط دع الفريق يبدأ التطوير.
```

**ما يجب أن يتضمنه العقد**:

- تواقيع الدوال وهياكل البيانات
- تنسيقات JSON للإدخال والإخراج
- معاني رموز حالة HTTP
- اتفاقيات معالجة الأخطاء
- قواعد التحقق من الحقول

### الممارسة 2: تخصيص النماذج بحكمة

المهام المختلفة تتطلب نماذج مختلفة. تخصيص النماذج الجيد يساعد في موازنة الجودة والتكلفة.

**استخدم Opus لقائد الفريق**:

قائد الفريق يتعامل مع تفكيك المهام وتلخيص النتائج، مما يتطلب قدرة استدلال أقوى، لذا يوصى بـ Opus:

```
أنشئ فريقًا حيث يستخدم قائد الفريق Opus للتخطيط العام والمراجعة النهائية.
يستخدم الأعضاء Sonnet لعمل التنفيذ.
```

**استخدم Sonnet لأعضاء الفريق**:

لعمل البرمجة الملموس والاختبار، Sonnet قادر تمامًا وأرخص بكثير:

- Opus 4.6: حوالي $15 لكل مليون رمز إخراج
- Sonnet 4.5: حوالي $3 لكل مليون رمز إخراج

استخدام Sonnet للأعضاء يمكن أن يقلل التكلفة الإجمالية بشكل كبير.

**استخدم Haiku للحالات الخاصة**:

للمهام البسيطة مثل تحديث الوثائق أو كتابة الاختبارات الصغيرة، يمكنك النظر في Haiku، حوالي $0.80 لكل مليون رمز إخراج.

### الممارسة 3: التحكم في دقة المهام

المهام الكبيرة جدًا أو الصغيرة جدًا تؤذي الكفاءة. تحتاج إلى العثور على الدقة المناسبة.

**القاعدة العامة**:

يجب أن تكون كل مهمة شيئًا يمكن لعضو واحد إكماله بشكل مستقل في **15 إلى 30 دقيقة**.

**المهمة كبيرة جدًا**:

```
سيئ: تنفيذ نظام مصادقة المستخدم
```

هذه المهمة واسعة جدًا. تحتوي على عدة مهام فرعية، وسيحتاج شخص واحد وقتًا طويلاً لإنهائها، مما يهدر ميزة التوازي.

**المهمة صغيرة جدًا**:

```
سيئ: إنشاء ملف فارغ باسم auth.js
```

هذه المهمة صغيرة جدًا. يقضي الأعضاء وقتًا أكثر في التنسيق من العمل الفعلي.

**الدقة المناسبة**:

```
جيد: تنفيذ واجهة تسجيل الدخول API، بما في ذلك:
1. نقطة نهاية POST /api/login
2. التحقق من اسم المستخدم وكلمة المرور
3. استجابة JWT token
4. معالجة الأخطاء
```

هذه المهمة لها حدود واضحة ومخرجات. يمكن لشخص واحد إنهاؤها بشكل مستقل، وهي ليست مجزأة بشكل مفرط.

**الإعداد الموصى به**:

دع كل عضو يمتلك **5 إلى 6 مهام متوسطة الحجم**. هذا يوفر توازيًا كافيًا دون جعل تكاليف التنسيق مرتفعة جدًا.

### الممارسة 4: تجنب تعارضات الملفات

تعديل أعضاء متعددين لنفس الملف في نفس الوقت هو المشكلة الأكثر شيوعًا في فرق الوكيل.

**مبدأ التخصيص**:

حاول أن تدع أعضاء مختلفين يمتلكون **ملفات مختلفة**:

```
جيد:
- العضو A: يمتلك جميع الملفات تحت src/auth/
- العضو B: يمتلك جميع الملفات تحت src/api/
- العضو C: يمتلك جميع الملفات تحت tests/auth/

سيئ:
- العضو A والعضو B كلاهما يعدل src/app.js
```

**إذا كان يجب تعديل نفس الملف**:

صمم مرحلة تعديل تسلسلية:

```
المرحلة 1 (متوازية):
- العضو A: تحليل ما يجب إضافته إلى auth.js من وظائف
- العضو B: تصميم واجهة الميزة الجديدة
- العضو C: كتابة حالات الاختبار

المرحلة 2 (تسلسلية):
- قائد الفريق يجمع جميع المدخلات
- عضو واحد يعدل auth.js في مرحلة تكامل واحدة
```

### الممارسة 5: تقديم سياق أولي غني

عندما يبدأ أعضاء الفريق، تاريخ محادثاتهم فارغ. هم لا يعرفون ما ناقشه قائد الفريق والمستخدم من قبل.

**النهج الخاطئ**:

```
أنشئ الفريق ودع الأعضاء يبدأون العمل.
```

سيبدأ الأعضاء في ضباب: ما هذا المشروع؟ ما المكدس التقني المستخدم؟ ما الذي يجب أن يبنوه بالضبط؟

**النهج الصحيح**:

```
هذا مشروع تجارة إلكترونية React + Node.js باستخدام TypeScript.

هيكل المشروع:
- src/frontend/: كود الواجهة الأمامية React
- src/backend/: كود الواجهة الخلفية Node.js
- prisma/: نماذج قاعدة البيانات

نمط الكود:
- استخدام مكونات الدوال و Hooks
- استخدام Express.js في الواجهة الخلفية
- استخدام PostgreSQL لقاعدة البيانات

الآن أنشئ فريقًا ودع الأعضاء يضيفون مصادقة المستخدم تحت src/auth/.
```

فقط مع سياق كافٍ يمكن للأعضاء العمل بكفاءة.

### الممارسة 6: البحث قبل التنفيذ

لا تدع الأعضاء يبدأون البرمجة فورًا. اطلب منهم البحث وتصميم الحل أولاً.

**عملية من مرحلتين**:

**المرحلة 1: البحث والتصميم**

```
أنشئ فريقًا. في المرحلة الأولى، قم بالبحث:
- عضو واحد يبحث في أساليب المصادقة الحالية (JWT مقابل Session)
- عضو واحد يحلل المكدس التقني للمشروع ويحدد أفضل الممارسات
- عضو واحد يصمم مخطط قاعدة البيانات

بعد اكتمال البحث، دع الأعضاء يناقشون عبر نظام المراسلة ويستقرون على خطة نهائية.
```

**المرحلة 2: التنفيذ**

```
بعد تأكيد الخطة، ابدأ التنفيذ:
- عضو واحد ينفذ منطق المصادقة الخلفي
- عضو واحد ينفذ صفحة تسجيل الدخول الأمامية
- عضو واحد يكتب الاختبارات
```

فائدة هذه الطريقة هي أنه يمكنك **اكتشاف عدم تطابق البنية مبكرًا**، بدلاً من إدراك أن الخطة لا تعمل في منتصف التنفيذ.

### الممارسة 7: المراقبة والتدخل الفعال

حتى لو قمت بإعداد الأتمتة، يجب أن تراقب حالة عمل الفريق بشكل فعال.

**استخدم وضع الأجزاء المقسمة**:

إذا قمت بإعداد أجزاء tmux، يمكنك رؤية مخرجات جميع الأعضاء في الوقت الفعلي:

```
┌─────────────────┬─────────────────┐
│  العضو 1        │  العضو 2        │
│  تحليل الكود    │  تنفيذ          │
│  ...            │  API...         │
│                 │                 │
│  انتظر، هذا     │                 │
│  النهج يبدو     │                 │
│  خاطئًا...      │                 │
└─────────────────┴─────────────────┘
```

عندما تلاحظ أن عضوًا يسير في الاتجاه الخاطئ، يمكنك التدخل بسرعة:

```
@العضو1 توقف لحظة. تحليلك يسير في الاتجاه الخاطئ. وحدة المصادقة يجب أن تكون تحت src/auth/، وليس src/user/.
```

**تحقق من حالة المهام بانتظام**:

استخدم أمر TaskList لفحص حالة جميع المهام:

```
/tasks
```

هذا يعرض حالات جميع المهام حتى تتمكن من رؤية ما تم إكماله، وما لا يزال قيد التشغيل، وما هو محظور.

---

## السيناريوهات المناسبة

فرق الوكيل قوية، لكن ليست كل مهمة مناسبة لها. فهم السيناريوهات الصحيحة يساعدك على الاختيار بشكل صحيح.

### سيناريوهات تناسب فرق الوكيل

**إعادة هيكلة الأنظمة المعقدة**

عندما تمتد إعادة الهيكلة عبر وحدات متعددة بحدود واضحة:

```
السيناريو: تقسيم تطبيق متكامل إلى خدمات مصغرة

أنشئ فريقًا:
- العضو A: تحليل التبعيات في وحدة المستخدم
- العضو B: تحليل التبعيات في وحدة الطلبات
- العضو C: تحليل التبعيات في وحدة الدفع
- العضو D: تصميم بروتوكول الاتصال بين الخدمات
```

هذه الوحدات يمكن تحليلها في نفس الوقت، ويمكن تجميع النتيجة النهائية لاحقًا، وهو أسرع بكثير من تحليلها بالتسلسل.

**مراجعة كود متعددة الزوايا**

عندما تحتاج إلى مراجعة الكود من عدة أبعاد:

```
السيناريو: إجراء مراجعة أمنية كاملة لوحدة الدفع

أنشئ فريقًا:
- العضو A: التركيز على الثغرات الأمنية (حقن SQL، XSS، إلخ)
- العضو B: فحص مشاكل الأداء (استعلامات N+1، تسرب الذاكرة، إلخ)
- العضو C: التحقق من اكتمال معالجة الأخطاء
- العضو D: تقييم تغطية الاختبار
```

كل عضو يركز على بُعد واحد، مما يجعل المراجعة أعمق والتقرير النهائي أكثر اكتمالاً.

**تطوير الواجهة الأمامية والخلفية بالتوازي**

عندما تحتاج إلى بناء الواجهة الأمامية والخلفية في نفس الوقت:

```
السيناريو: بناء ميزة إدارة المستخدمين

أنشئ فريقًا:
- العضو A (واجهة أمامية): تنفيذ صفحة قائمة المستخدمين
- العضو B (واجهة أمامية): تنفيذ صفحة تعديل المستخدم
- العضو C (واجهة خلفية): تنفيذ واجهة CRUD API
- العضو D (تنسيق): تصميم عقد API والتأكد من بقاء الواجهة الأمامية والخلفية متطابقتين
```

يمكن للواجهة الأمامية والخلفية التحرك بالتوازي طالما تم تعريف عقد API أولاً، باتباع مبدأ العقد أولاً.

**التصحيح التنافسي**

عندما يكون لديك عدة حلول ممكنة:

```
السيناريو: إصلاح خطأ معقد باستراتيجيتي إصلاح محتملتين

أنشئ فريقًا:
- العضو A: تنفيذ الحل 1
- العضو B: تنفيذ الحل 2
- العضو C: تقييم إيجابيات وسلبيات كلاهما
```

يمكن تنفيذ كلا الحلين واختبارهما بالتوازي، ويمكن اختيار الأفضل بعد ذلك.

**توليد الوثائق**

عندما تحتاج إلى إنتاج كمية كبيرة من الوثائق:

```
السيناريو: كتابة وثائق للمشروع بأكمله

أنشئ فريقًا:
- العضو A: كتابة وثائق API
- العضو B: كتابة دليل النشر
- العضو C: كتابة دليل التطوير
- العضو D: كتابة دليل استكشاف الأخطاء وإصلاحها
```

يمكن كتابة وثائق متعددة في نفس الوقت، مما يحسن الكفاءة بشكل كبير.

### سيناريوهات لا تناسب فرق الوكيل

**مهام التعديل البسيطة**

```
غير مناسب: إعادة تسمية المتغيرات، إصلاح أخطاء فردية، إضافات ميزات صغيرة
```

لهذه المهام، تكلفة بدء فريق أكبر من العمل الفعلي.

**المهام التسلسلية للغاية**

```
غير مناسب: مهام يجب أن تحدث بالتتابع بدقة
```

إذا كانت المهمة B لا يمكن أن تبدأ حتى تنتهي المهمة A، فلا توجد مساحة حقيقية للتوازي.

**المهام الحساسة للتكلفة**

تستهلك فرق الوكيل **2 إلى 4 أضعاف** رموز المثيل الواحد، حسب حجم الفريق. إذا كانت التكلفة هي الشاغل الرئيسي، فقد يكون المثيل الواحد الخيار الأفضل.

### مخطط اتخاذ القرار

```
هل هناك مهام فرعية مستقلة متعددة؟
    │
    ├─ لا → استخدم مثيلًا واحدًا
    │
    └─ نعم →
         │
         هل يمكن تخصيص المهام الفرعية لملفات مختلفة؟
         │
         ├─ لا → فكر في التنفيذ التسلسلي أو قسّم المهمة أكثر
         │
         └─ نعم →
              │
              هل التكلفة مقبولة (2-4 أضعاف)؟
              │
              ├─ لا → استخدم مثيلًا واحدًا
              │
              └─ نعم → استخدم فرق الوكيل ✓
```

---

## التكلفة والأداء

استخدام فرق الوكيل يزيد التكلفة، لكنه يمكن أن يحقق أيضًا مكاسب كبيرة في الكفاءة. فهم هذه المقايضة يساعدك في اتخاذ قرارات مستنيرة.

### تحليل التكلفة

**استهلاك الرموز وحجم الفريق**

استهلاك الرموز لفرق الوكيل تقريبًا **خطي** مع حجم الفريق:

| حجم الفريق | التكلفة النسبية | السيناريو المناسب |
|---------|---------|---------|
| شخص واحد (مثيل واحد) | 1x | مهام بسيطة |
| فريق من شخصين | 2-2.5x | تعقيد متوسط |
| فريق من 3 أشخاص | 3-4x | مهام معقدة |
| فريق من 5+ أشخاص | 5-6x+ | مشاريع كبيرة |

**لماذا ليست خطية تمامًا**:

- **تكلفة البدء**: كل عضو يجب أن يتلقى سياقًا أوليًا عند البدء
- **تكلفة التنسيق**: التواصل بين الأعضاء عبر نظام المراسلة يستهلك أيضًا رموزًا
- **تكلفة قائد الفريق**: قائد الفريق عادة يستخدم Opus، وهو أغلى

**أرقام مثال ملموسة** (Claude 4.5 Sonnet):

- الإدخال: $3 لكل مليون رمز
- الإخراج: $15 لكل مليون رمز

لنفترض أن مهمة تتطلب:
- قائد الفريق (Opus): 50K إدخال + 20K إخراج ≈ $2.25
- 3 أعضاء (Sonnet): كل 30K إدخال + 15K إخراج ≈ $2.7 × 3 = $8.1
- **الإجمالي**: حوالي $10.35

نفس المهمة على مثيل Sonnet واحد:
- 100K إدخال + 50K إخراج ≈ $1.05

**مضاعف التكلفة**: حوالي 10x

**لكن الوقت الموفر**: يمكن تقليله من 3 ساعات إلى ساعة واحدة

### مكاسب الكفاءة

**بيانات الاختبار الداخلي لـ Anthropic**:

- إعادة هيكلة المشاريع الكبيرة: حوالي **50%** تحسن في الكفاءة
- تطوير الوحدات المتعددة بالتوازي: حوالي **60-70%** تحسن
- مهام توليد الوثائق: حوالي **80%** تحسن

**حالة واقعية**:

فريق هندسة Anthropic استخدم مرة **16 وكيلًا متوازيًا** لبناء مترجم C في حوالي أسبوعين يمكنه تجميع نواة Linux 6.9، حوالي 100,000 سطر من كود Rust، واجتاز 99% من اختبارات GCC.

### استراتيجيات تحسين التكلفة

**الاستراتيجية 1: مزج النماذج**:

```
قائد الفريق: Opus (يحتاج استدلال قوي)
أعضاء الفريق: Sonnet (قيمة عالية مقابل التكلفة)
المهام البسيطة: Haiku (الأرخص)
```

**الاستراتيجية 2: تعديل حجم الفريق ديناميكيًا**:

```
مرحلة التحليل: فريق من 5 أشخاص (تحليل متعدد الزوايا)
مرحلة التنفيذ: فريق من 3 أشخاص (برمجة متوازية)
مرحلة الاختبار: فريق من شخصين (اختبار وإصلاح)
```

**الاستراتيجية 3: استخدام فرق الوكيل في مراحل مختارة فقط**:

لا تستخدم فرق الوكيل للمشروع بأكمله. استخدمها فقط في المراحل الأكثر تعقيدًا:

```
المرحلة 1 (تحليل المتطلبات): مثيل واحد
المرحلة 2 (تصميم البنية): فرق الوكيل (استكشاف خطط متعددة بالتوازي)
المرحلة 3 (البرمجة): مثيل واحد
المرحلة 4 (مراجعة الكود): فرق الوكيل (مراجعة متعددة الزوايا)
المرحلة 5 (الوثائق): فرق الوكيل (كتابة متوازية)
```

### متى يستحق الأمر

**يستحق الأمر عندما**:

- الجدول الزمني للمشروع ضيق، وقيمة مكاسب الكفاءة تتجاوز تكلفة الرموز
- المهمة معقدة للغاية، والمثيل الواحد عرضة لتفويت التفاصيل
- تحتاج إلى تحليل وتحقق متعدد الزوايا

**لا يستحق الأمر عندما**:

- المهمة بسيطة، والنفقات العامة لبدء فريق مرتفعة جدًا
- التكلفة حساسة جدًا وميزانية الرموز محدودة
- المهمة تسلسلية للغاية ولا تقدم مساحة للتوازي

---

## الأسئلة الشائعة

### س 1: هل فرق الوكيل مستقرة؟ هل يمكن استخدامها في الإنتاج؟

فرق الوكيل حاليًا **ميزة تجريبية**، لذا قد لا تزال هناك أخطاء وسلوك غير مستقر. التوصيات:

- احتفظ بنسخة احتياطية من المشاريع المهمة أولاً
- ابدأ بمشاريع صغيرة حتى تتمكن من الاختبار والتعرف عليها
- تابع ملاحظات الإصدار الرسمية لرؤية التحسينات في الإصدارات الجديدة
- أبلغ عن المشاكل للفريق الرسمي فور ظهورها

### س 2: كم عدد الأعضاء الذين يمكنني إنشاؤهم كحد أقصى؟

لا يوجد حد نظري صارم، لكن من منظور عملي:

- المشاريع الصغيرة: 2 إلى 3 أشخاص
- المشاريع المتوسطة: 3 إلى 5 أشخاص
- المشاريع الكبيرة: 5 إلى 10 أشخاص

الكثير من الأعضاء يقدم المشاكل التالية:

- نفقات التنسيق ترتفع بشكل حاد
- استخدام الرموز ينمو بشكل خطي
- احتمال تعارض الملفات يزداد
- المراقبة والإدارة تصبح أصعب

### س 3: هل يمكن لأعضاء الفريق رؤية سياق بعضهم البعض؟

**لا**. كل عضو لديه نافذة سياق مستقلة تمامًا. يتواصلون من خلال نظام المراسلة بدلاً من مشاركة السياق مباشرة.

هذا اختيار تصميم متعمد، والفوائد هي:

- استنتاج عضو واحد لا يتلوث باستنتاج عضو آخر
- السياق لا يصبح فوضويًا لأن المحادثات طويلة جدًا
- أقرب إلى كيفية عمل الفريق الحقيقي، حيث يمتلك الجميع عقلهم الخاص

### س 4: كيف أتنقل بين الأعضاء المختلفين؟

إذا لم يتم إعداد وضع الأجزاء المقسمة، يمكنك استخدام مفاتيح الاختصار:

- `Shift+Up`: التبديل إلى العضو السابق
- `Shift+Down`: التبديل إلى العضو التالي
- `Ctrl+O`: العودة إلى قائد الفريق

### س 5: ماذا لو فشلت مهمة؟

إذا فشلت مهمة أحد الأعضاء:

1. تحقق من سبب الفشل بقراءة سجل المخرجات لذلك العضو
2. أعد تخصيص المهمة لعضو آخر إذا لزم الأمر
3. تدخل يدويًا وساعد في حل المشكلة مباشرة

### س 6: هل يمكنني إضافة أو إزالة أعضاء في منتصف العملية؟

نعم. يمكنك إصدار أوامر لقائد الفريق في أي وقت:

```
أضف عضوًا جديدًا ودعه يتعامل مع XXX.
```

```
دع العضو 3 يغادر الفريق بعد إكمال المهمة الحالية.
```

### س 7: هل يمكن استخدام فرق الوكيل مع MCP و Skills؟

بالتأكيد. في الواقع، يعملون بشكل أفضل معًا:

- **فرق الوكيل + Skills**: كل عضو يمكنه حمل مهارات مختلفة
- **فرق الوكيل + MCP**: أعضاء مختلفون يمكنهم الوصول إلى موارد خارجية عبر خوادم MCP مختلفة

```
أنشئ فريقًا:
- العضو A: يحمل Skill تصميم الواجهة الأمامية ومسؤول عن UI
- العضو B: يصل إلى المستودع عبر GitHub MCP ويتولى إدارة PR
- العضو C: يستعلم عن البيانات عبر Database MCP ويتولى التحليل
```

---

## المراجع

### الموارد الرسمية

- [وثائق Claude Code الرسمية](https://docs.anthropic.com/en/docs/claude-code) - وثائق Claude Code الكاملة
- [مدونة هندسة Anthropic](https://www.anthropic.com/engineering) - المدونة التقنية الرسمية والتحديثات

### مجموعة دروس فرق الوكيل

**أدلة شاملة بالصينية**:

- [الدليل الشامل لـ Claude Code Agent Teams: من المقدمة إلى الممارسة](https://m.blog.csdn.net/u010634066/article/details/157903022) - يتضمن تفاصيل الإعداد وأمثلة عملية وحالة لافتة حيث 16 وكيلًا متوازيًا بنوا مترجم C
- [التطوير التعاوني مع Claude Code Agent Team: دليل عملي شامل](https://m.blog.csdn.net/u010028049/article/details/158126612) - سير عمل مشروع تعاوني كامل
- [دليل خطوة بخطوة لإعداد واستخدام Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - درس Tencent Cloud مع تعليمات إعداد مفصلة

**البدء عمليًا**:

- [تجربة Claude Code Agent Teams الأصلية: من التفعيل إلى تشغيل فريق من ثلاثة أشخاص](https://www.cnblogs.com/147api/p/19606317) - جولة لفريق من 3 أشخاص
- [ممارسة مبتدئين حديثين مع Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - مقدمة صديقة للمبتدئين مع أفضل الممارسات مثل العقد أولاً
- [لا مزيد من العمل الفردي: دع 7 Claudes يساعدوك في التطوير في نفس الوقت مع Agent Teams](https://m.toutiao.com/a7605229732241736202/) - دراسة حالة لفريق من 7 أشخاص

**أفضل الممارسات**:

- [أفضل ممارسات Agent Teams: العقد أولاً، دقة المهام، وتخصيص النماذج](https://blog.csdn.net/sinat_37574187/article/details/144727588) - شرح مفصل لـ 7 أفضل الممارسات
- [دليل ميداني لـ Claude Code من محارب قديم في الشركات التقنية الكبرى لمدة 7 سنوات: ثماني قواعد من المبتدئ إلى الخبير](https://new.qq.com/rain/a/20260111A02HE900) - تجربة واقعية على مستوى المؤسسة

**المبادئ والمقارنات**:

- [Claude Code Agent Teams: الطريقة الصحيحة للتعاون متعدد الوكلاء](https://post.m.smzdm.com/p/adoezrmz/) - تحليل عميق للتعاون متعدد الوكلاء
- [تطوير فريق الوكلاء المتعددين Claude Code: الدليل الشامل من المبادئ إلى الأخطاء](https://m.toutiao.com/a7605229732241736202/) - المبادئ والأخطاء من الاستخدام الفعلي

### ترجمات الدليل الرسمي

- [أصدر Claude رسميًا "دليل بناء الوكلاء" (مع تحميل PDF)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - دليل بناء الوكلاء الرسمي
- [الترجمة الكاملة للدليل الرسمي لـ Claude "دليل بناء وكلاء فعالين"](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - ترجمة صينية كاملة

### التقنيات ذات الصلة

- [معيار Agent Skills](https://agentskills.io/) - نظام Skills البيئي
- [skills.sh - متجر تطبيقات Agent Skills](https://skills.sh/) - مكتبة تضم أكثر من 70,000 مهارة
