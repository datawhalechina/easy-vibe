# المشروع 4: لنصنع صور هوجورتس معًا

في الدروس السابقة، تعلمنا كيفية تحقيق تفاعلات AI أكثر تعقيدًا بناءً على هندسة الأوامر (prompt engineering) واستدعاءات API. تمكنا من ترقية روبوتات محادثة AI البسيطة إلى وكلاء AI (AI Agents) وسير عمل AI (AI Workflows)؛ من خلال المنطق الشرطي الأكثر تعقيدًا ومنطق التفرع، تمكنا من تطوير وظائف ذات قابلية تطبيق عملية أقوى.

لجعل هذا المنطق AI المعقد يعمل بشكل أفضل في البرامج المختلفة وسيناريوهات التطبيق الفعلية، انتقلنا من بيئة z.ai عبر الإنترنت البسيطة تدريجيًا إلى بيئة AI IDE المحلية الأكثر حداثة، ونقلنا بيئة البرمجة التي كانت في المتصفح إلى جهاز الكمبيوتر الخاص بك. ومع ذلك، بدأت تواجه حقًا مشاكل تثبيت وتكوين البيئة المختلفة، لكن في عملية الحوار مع Trae Agent، أصبحت هذه التحديات التي تبدو صعبة قابلة للحل أيضًا.

في هذا المشروع، سنتقدم خطوة أخرى في قابلية تطبيق التطبيق، ليس فقط تحسين وظائف AI نفسها، بل سنبدأ أيضًا في صقل "المظهر الخارجي" للمنتج. ستحاول جعل واجهتك أكثر جمالًا وسهولة في الاستخدام، وتخصيص تخطيط وأسلوب واجهة البرنامج وفقًا للاحتياجات الفعلية.

قبل البدء رسميًا، استخدم اختبارًا سريعًا لمساعدتك على مراجعة محتوى الدرس السابق:

1. ما هو Dify؟ ماذا يفعل؟ لماذا نحتاجه؟
2. كيف تستدعي واجهة برمجة تطبيقات Dify؟
3. ما هو RAG؟ كيف تستخدم Dify لبناء وكيل RAG أو سير عمل RAG؟ كيفية استخدام عُقد Dify الشائعة
4. ما هو AI IDE؟ ما هو Trae؟ ما الفرق بينه وبين z.ai؟

إذا كان لديك أي شكوك حول أي من الأسئلة أعلاه، يمكنك مراجعة وثائق الدرس السابق أولاً، أو طرح الأسئلة والمناقشة مباشرة في مجموعة WeChat.

موضوع مشروع هذا الدرس هو **صور هوجورتس (Hogwarts Portraits)**. كما يوحي الاسم، مستوحى من الصور التي "تأتي إلى الحياة" في مدرسة هوجورتس للسحر. نأمل في استخدام AI لإنشاء تجربة صور سحرية "تفاعلية" - التحدث مع الصورة مثل التحدث مع "الشخص نفسه"، مع الحفاظ على ذاكرة المحادثة وامتلاك خلفية وتاريخ الشخصية. من خلال هذا المشروع، ستدمج الوكلاء الذكيين وسير العمل الذي تعلمته سابقًا في واجهة منتج ملموسة حقًا.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

لإنشاء صور هوجورتس حقًا، نحتاج إلى بناء واجهة واجهة أمامية تناسب الصور السحرية بأنفسنا. لتحقيق ذلك، ستبدأ في التعرف على أدوات تصميم الواجهات الأمامية الحديثة، وتتعلم كيفية الجمع بين تصميم الواجهة والكود، وتحويل مسودات الواجهة على الورق أو لوحة الرسم إلى صفحات ويب قابلة للتشغيل فعليًا.

ستحتاج أيضًا إلى تعلم كيفية نشر صفحة الويب هذه من البيئة المحلية إلى الإنترنت، بحيث يمكن لصفحة الويب المميزة التي أنشأتها بنفسك أن تعمل ليس فقط على جهاز الكمبيوتر الخاص بك، بل يمكن أيضًا الوصول إليها وتجربتها من قبل المستخدمين في جميع أنحاء العالم.

عنوان المشروع المرجعي لهذا الدرس هو: [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# ما ستتعلمه

1. فهم ما هي أدوات تصميم الواجهات الأمامية، والمشاكل التي تحلها، وما هي أدوات تصميم الواجهات الأمامية الشائعة حاليًا.
2. التعرف على Figma و MasterGo، وإتقان عملياتهما الأساسية، وتعلم استخدام المكونات الإضافية لتصدير كود الواجهة الأمامية.
3. استخدام Figma AI و MasterGo AI لإنشاء تصميمات الويب وتصدير كود الصفحات القابل للاستخدام.
4. فهم ما هو GitHub، وتعلم تكوين اتصال SSH وإنشاء مستودع كود وإكمال دفع الكود.
5. توضيح مفهوم "النشر"، وتعلم كيفية استخدام Zeabur لنشر الكود من GitHub أو البيئة المحلية إلى الإنترنت.

صور هوجورتس الخاصة بك، صفحة ويب لعرض **نجم معين، أو شخصية تاريخية، أو شخصية رسوم متحركة**.

# 1. صور هوجورتس

ما نوع "الصور السحرية" الذي نريد إنشاءه بالضبط؟ ببساطة، نأمل في استعادة مشهد من هاري بوتر قدر الإمكان، حيث لم تعد الصورة مجرد صورة ثابتة معلقة على الجدار، بل شخصية مجسدة يمكنها التحدث معك وتغيير تعابيرها و"مزاجها" بناءً على محتوى المحادثة.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

لجعل هذه الصورة لا تبدو كروبوت محادثة AI، بل أقرب إلى "شخص حقيقي موجود"، يجب حل مشكلتين: الأولى هي الذاكرة والمعرفة: يجب أن تمتلك الصورة كمية كبيرة من المعلومات الأساسية المتعلقة بالشخصية (إعداد الشخصية، قصص التجارب، مقالات ذات صلة، إلخ). يمكن تحقيق هذا الجزء من خلال قاعدة المعرفة، عن طريق ربط المواد النصية التي أعددتها للشخصية بـ Dify الذي يحتوي على قاعدة المعرفة، مما يتيح للصورة القدرة على شرح معلومات أساسية معينة.

الثانية هي مسألة أسلوب التعبير. المعرفة وحدها ليست كافية، نأمل أيضًا أن يكون أسلوبها في الكلام قريبًا قدر الإمكان من "الشخص نفسه"، بما في ذلك النبرة، وعادات الكلمات، وطريقة التفكير، وحتى المزاج الدوري وحس الفكاهة. يتطلب هذا المستوى المعالجة من خلال هندسة الأوامر: في أمر النظام، نحتاج إلى توضيح إعداد هوية الشخصية، وحدود worldview (النظرة للعالم) وأسلوب اللغة، بحيث تدور كل إجابة حول الشخصية المحددة بدلاً من العودة إلى الأسلوب المحايد لـ AI العام.

بالإضافة إلى وظيفة المحادثة، نأمل أيضًا أن تكون المشاعر مرئية حقًا. لتحقيق ذلك، يمكننا بناء مؤشر قيمة المشاعر، ويمكننا تعيين محتوى إخراج Dify بحيث يُخرج النموذج بالإضافة إلى نص الرد قيمة "مزاج" أو تسمية مشاعر. عندما تحصل الواجهة الأمامية على مؤشر المشاعر، يمكنها عرض صورة الصورة المقابلة وفقًا لقيمة المزاج أو التسمية. عندما تكون قيمة المزاج مرتفعة، تبدو الصورة سعيدة جدًا، وعندما تكون قيمة المزاج منخفضة أو غاضبة، تبدو الصورة حزينة جدًا أو غاضبة. من خلال هذه الطريقة، ما يراه المستخدم لم يعد صورة ثابتة لا تتغير أبدًا، بل "صورة سحرية" حقيقية "تتغير التعبيرات" مع تقلبات المحتوى.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

بالإضافة إلى ذلك، بالنسبة لمحتوى هذه الصورة، يمكن أن يكون نجمًا حقيقيًا أو شخصية تاريخية، أو شخصية أنمي IP، أو حتى شخصية أصلية تبنيها من الصفر. الصفحة نفسها لا تحتاج إلى أن تكون معقدة، لكن العديد من العناصر الأساسية لا غنى عنها: اسم الشخصية الواضح، مقدمة شخصية مكثفة للغاية، صورة أساسية أو ملصق يمثل الشخصية بشكل كافٍ، ومنطقة تفاعلية "تحدث معه"؛ يمكنك ربط وكيل AI أو سير العمل الذي قمت بتكوينه في Dify/Trae في وحدة المحادثة هذه لتحقيق وظيفة لعب الأدوار للصورة.

## 1.2 جمع معلومات الشخصية

باستخدام Elon Musk كمثال، نحتاج إلى جمع تصريحاته العامة لاستخدامها في محاكاة أسلوبه في الكلام وحقنها في الأوامر. يمكن أن تأتي هذه المواد من الخطب والمقابلات ومنشورات وسائل التواصل الاجتماعي. تحتاج فقط إلى تحويل هذا المحتوى إلى نص، واستخدامه كمرجع few shot أثناء المحادثة، مما يسمح للنموذج الكبير بالرد بنفس أسلوب Elon Musk العفوي وذو السخرية الذاتية، على سبيل المثال:

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

بالنسبة لكيفية جمع المعرفة الأساسية واستخدامها كقاعدة معرفة، يمكننا البحث عن مقدمته الشخصية ومقدمة شركته ونسخ جميع النصوص كمحتوى لقاعدة المعرفة لإضافتها إلى Dify. إذا نسيت كيفية استخدام Dify، يرجى العودة إلى ملاحظات الدرس السابق وإعادة تعلم كيفية إضافة المعرفة إلى قاعدة المعرفة.

بالإضافة إلى ذلك، بالنظر إلى تصميم الصورة، قد لا يكون استخدام الصور العامة للشخصية المقابلة جذابًا جدًا، وقد يكون هناك خطر معين. في هذه الحالة يُنصح بأن يمكنك استخدام وظيفة إنشاء الصور من صورة في أداة إنشاء الصور، مما يسمح لـ AI بإرجاع صور عالية الدقة وعالية الجودة. يمكنك أيضًا استخدام أداة إنشاء الصور لإنشاء سلسلة من مواد الصور بتعبيرات مختلفة، لاستخدامها في تغيير الصورة المقابلة بعد تغير قيمة المشاعر لاحقًا.

في هذا الدرس التعليمي نستخدم [Lovart](https://www.lovart.ai/home). Lovart هو وكيل تصميم AI يمكنه من خلال أوامر اللغة الطبيعية، تخطيط وتنفيذ سير عمل التصميم الشامل من المفهوم إلى التسليم تلقائيًا، وإنشاء ملصقات وشعارات العلامة التجارية ومقاطع الفيديو والموسيقى والمحتويات الأخرى، ويدعم التحرير الطبقي (في الواقع المبدأ الوظيفي الداخلي هو استدعاء نموذج Seedream أو google nanobanana المقابل، الذي ذكرناه بالفعل في الدروس السابقة). من خلال Lovart، يمكننا الحصول على سلسلة من مواد التعبيرات. يمكنك الحصول على معلومات صور شخصيتك المفضلة مسبقًا وحفظها لاستخدامها لاحقًا.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

بعد أن يكون كل شيء جاهزًا، يمكننا البدء في العمل على تصميم الصفحة العامة. نأمل أن يكون أسلوب هذه الصفحة مرتبطًا ارتباطًا وثيقًا بالشخصية.

## 1.3 تصميم النموذج الأولي للصفحة

يمكننا أيضًا تصور النموذج الأولي للصفحة أولاً. كما ذكرنا أعلاه، نأمل أن يكون لدينا صفحة محادثة وصورة، ومقدمة شخصية مثيرة للاهتمام. في هذا المثال، قمنا بتنفيذ واجهة محادثة مشابهة لـ X كبديل للمقدمة الشخصية. يمكنك أيضًا التفكير في طرق أخرى تتوافق مع "خصائص الشخصية" واختيار عناصر جديدة لاستبدال قسم المقدمة الشخصية.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

أبسط طريقة، يمكننا استخدام PowerPoint لتصميم النموذج الأولي لعرض صفحة الويب الأولي. نجد صورة صورة سحرية من الإنترنت، ونضبط الشاشة على ترتيب أفقي، الجانب الأيسر هو منطقة المحادثة، المنتصف هو منطقة الصورة، والجانب الأيمن هو منطقة X.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

بناءً على النموذج الأولي البسيط أعلاه، يمكننا جعل النموذج الكبير يُنشئ تصميم واجهة أمامية حقيقي ونتائج الكود المقابلة.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

لكن بشكل عام، في الممارسة الفعلية لن نستخدم PowerPoint لتصميم صفحات الواجهة الأمامية. سنستخدم أدوات نماذج أولية أفضل، أو بالأحرى أدوات تصميم الواجهات الأمامية لتحقيق ذلك.

---

# 2. تصميم الواجهة باستخدام Figma و MasterGo

::: tip 📚 المعارف المسبقة
قبل البدء في هذا القسم، يُنصح بأن تتعلم أولاً درس [مقدمة في Figma و MasterGo](../figma-mastergo/) لإتقان العمليات الأساسية لأدوات تصميم الواجهات الأمامية، بما في ذلك:
- إنشاء ملفات Design وإطارات Frame
- استخدام Auto Layout لتحقيق تخطيط متكيف
- طرق تصدير الكود من التصاميم
:::

يفترض هذا القسم أنك قد أتقنت العمليات الأساسية لـ Figma أو MasterGo. سيركز على شرح كيفية تطبيق هذه الأدوات في مشروع صور هوجورتس.

## 2.1 تصميم واجهة الصورة السحرية

بناءً على تصور النموذج الأولي في القسم 1.3، نحتاج إلى إنشاء واجهة بتخطيط ثلاثي الأعمدة في Figma أو MasterGo:

1. **الجانب الأيسر**: منطقة محادثة الدردشة
2. **المنتصف**: منطقة عرض الصورة السحرية (ستتغير وفقًا للمشاعر)
3. **الجانب الأيمن**: منطقة عرض منصة التواصل الاجتماعي للشخصية (مثل الخط الزمني لـ X)

يمكنك استخدام وظيفة AI في Figma (Figma Make) أو وظيفة إنشاء الصفحات بالذكاء الاصطناعي في MasterGo، وإدخال أمر مشابه لما يلي:

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 تصدير الكود وتشغيله محليًا

بعد اكتمال التصميم، يمكنك تحويل التصميم إلى كود قابل للتشغيل من خلال الطرق التالية:

**الطريقة الأولى: استخدام Figma Make**
1. انقر على زر Make في Figma
2. قم بتحميل صورة التصميم المرجعية الخاصة بك
3. أضف أمرًا لوصف المتطلبات
4. بعد الإنشاء، انقر على أيقونة المحرر لإجراء تعديلات دقيقة
5. صدّر الكود إلى المحلي أو قم بالمزامنة مع GitHub

**الطريقة الثانية: استخدام MasterGo AI**
1. ابحث عن أداة AI في شريط الأدوات العلوي في واجهة تحرير MasterGo
2. اختر وظيفة "إنشاء صفحة"
3. قم بتحميل صورة مرجعية وصف المتطلبات
4. بعد الإنشاء، انقر على "معاينة الكود" للحصول على الكود

**الطريقة الثالثة: استخدام AI متعدد الوسائط**
1. احفظ لقطة شاشة التصميم
2. استخدم نماذج مثل Gemini و Qwen لتحويل الصورة إلى كود
3. اطلب إنشاء كود HTML أو React
4. قم بتشغيله وتصحيحه في IDE المحلي

## 2.3 إعداد مواد تغير المشاعر

لجعل الصورة السحرية "تأتي إلى الحياة"، تحتاج إلى إعداد مجموعة من صور التعبيرات. يُنصح بتضمين المشاعر التالية على الأقل:

| قيمة المشاعر | التعبير | الشرح |
|--------|------|------|
| 0 | حزين | الشخصية تشعر بالحزن أو الإحباط |
| 1 | غاضب | الشخصية تشعر بالغضب أو الاستياء |
| 5 | هادئ | الحالة الافتراضية، المشاعر مستقرة |
| 10 | سعيد | الشخصية تشعر بالسعادة أو الحماس |

يمكنك استخدام Lovart أو أدوات إنشاء صور AI أخرى لإنشاء متغيرات تعبيرات مختلفة بناءً على نفس الشخصية، مع ضمان اتساق الأسلوب.

---

# 3. تشغيل صور هوجورتس

## 3.1 تصدير كود الاختبار

من خلال الممارسة في تحويل النموذج الأولي إلى كود، يُعتقد أنك حصلت بالفعل على كود النموذج الأولي بتنسيق HTML أو React. نحتاج فقط إلى نسخه إلى المحلي، وشرح في IDE: "الرجاء مساعدتي في تشغيل هذا الكود ودعم الوظائف الضرورية فيه"، لتشغيل نسخة الاختبار الأولية. لكن تجدر الإشارة إلى أن هذه الخطوة غالبًا ما تنتج العديد من الأخطاء، وتحتاج إلى الحفاظ على الصبر، وتمرير جميع التفاعلات الأساسية والوظائف.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

تجدر الإشارة إلى أن مفاتيحنا يجب وضعها في متغيرات البيئة، وليس كتابتها في الكود. نحتاج إلى التأكيد بشكل خاص على أن المحتوى المتعلق بواجهة برمجة تطبيقات Dify اللاحقة يجب وضعه في متغيرات البيئة. يمكننا تحديد متغيرات البيئة الخاصة بشكل صريح في أداة النشر على موقع النشر في رابط النشر العام اللاحق؛ أو يمكننا جعل النموذج الكبير ينشئ زر إعدادات في صفحة الويب، حيث يمكننا تمرير متغيرات البيئة الخاصة المقابلة في زر الإعدادات. المتغيرات الحالية يمكن حفظها فقط في الصفحة الحالية، ولا يمكن للآخرين الوصول إليها.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 تصميم سير عمل Dify وربط واجهة برمجة التطبيقات

في الجزء أعلاه، أكملنا فقط العرض المرئي لواجهة الواجهة الأمامية، ولم نربط بعد سير عمل تفاعل محادثة الشخصية المجسدة الأساسي. هذه الخطوة هي المفتاح لتحويل النموذج الأولي من عرض ثابت إلى صورة سحرية. يمكننا الرجوع إلى سير عمل Dify في المشروع النموذجي لتصميم نظام إجابات الشخصية والمشاعر. هنا ترتيبنا هو أن الجانب الأيسر هو واجهة المحادثة، المنتصف هو الصورة السحرية (ستتغير التعبير المقابل وفقًا لمحتوى المحادثة)، والجانب الأيمن هو حساب منصة التواصل الاجتماعي X (سيحدد بناءً على محتوى المحادثة ما إذا كان يحتاج إلى نشر المشاعر على حساب التواصل الاجتماعي).

بشكل عام، الصورة السحرية تحتاج فقط إلى واجهة المحادثة والصورة المتغيرة. هذا المكان لإظهار المزيد من الخيارات الممكنة، تمت إضافة وظيفة جديدة تتوافق مع خصائص الشخصية على الجانب الأيمن؛ يمكنك إضافة وظائف تتوافق مع الشخصية التي تلعب دورها للعرض.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

يمكنك إضافة جميع معلومات المهام إلى عُقدة قاعدة المعرفة، وتعيين منطق الرد المقابل للنموذج الكبير في عُقدة RESPONSE. يمكننا الرجوع إلى أمر منطق الرد الافتراضي البسيط التالي:

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

وأمر نظام المشاعر المقابل:

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

حيث يتم دعم تشغيل تجميع نتيجة الإخراج النهائية في عُقدة RESULT في الزاوية العلوية اليمنى:

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

هنا نحتاج إلى تقديم بعض الشروح حول سير العمل. ما يتم إرجاعه هنا elon_chat هو محتوى محادثة Elon Musk المعروض على اليسار، و elon_x يمثل محتوى المعلومات المنشورة على حساب X (على اليمين)، و elon_score هو لعرض صور تعبيرات الصورة السحرية المختلفة بناءً على درجة المشاعر.

يمكنك أن ترى عُقدة if else في سير العمل، هذه العُقدة تُستخدم لتحقيق ما إذا كان هناك محتوى elon_x لإنشاء محادثة x. إذا كانت قيمة المشاعر لا تساوي 5 (5 هنا تعني هادئ، والهدوء لا يحتاج إلى النشر على منصة التواصل الاجتماعي؛ بينما 0 تعني حزين، و1 تعني غاضب، و10 تعني سعيد جدًا، يحتاج إلى النشر على منصة التواصل الاجتماعي) سيتم إنشاء المحتوى اللاحق لإرسال مقال منصة التواصل الاجتماعي على الجانب الأيمن. افتراضيًا، يجب أن يكون هناك elon_chat للعودة إلى محتوى المحادثة على الجانب الأيسر.

بالنسبة لكيفية ربط واجهة برمجة التطبيقات هذه، يمكننا تحقيق ذلك من خلال الحوار مع AI IDE. يرجى الرجوع إلى طريقة التكامل التي قدمناها في درس Dify السابق، وتذكر استبدال عنوان Dify والمفتاح مسبقًا. (إذا نسيت كيفية تكامل واجهة برمجة التطبيقات بناءً على الوثائق، يرجى مراجعة محتوى درس Dify السابق)

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

كما يُنصح بإضافة متطلب: "يحتاج الكود أيضًا إلى إضافة منطق معالجة الأخطاء الأساسي، مثل عرض 'فشل الاتصال، يرجى إعادة المحاولة' عند انقطاع الشبكة، وإعادة المحاولة تلقائيًا مرة واحدة عند انتهاء مهلة استدعاء API، ومطالبة فشل التحقق من الصلاحيات عند خطأ المفتاح، وغيرها من تقارير الأخطاء التفصيلية، لضمان استقرار المحادثة والسماح للمطورين باكتشاف مشاكل API بسرعة."

## 3.3 GitHub والنشر العام

أخيرًا، تهانينا على إكمال تطوير واجهة صفحة صور هوجورتس بنجاح! بعد ذلك نحتاج إلى تحميلها على منصة GitHub ونشرها في بيئة عامة للوصول إليها من قبل الجميع.

تحتاج إلى الرجوع إلى هذا الدرس التعليمي للبحث حول كيفية استخدام GitHub وتحميل مشروعك إلى GitHub: [ما هو GitHub](/ar-sa/stage-2/backend/git-workflow/)

بالإضافة إلى ذلك، تحتاج أيضًا إلى تعلم كيفية استخدام Zeabur وربطه بـ GitHub ونشر مشروعك بنجاح: [ما هو Zeabur](/ar-sa/stage-2/backend/zeabur-deployment/)

إذا كنت تشعر أن تطوير مشروع صور هوجورتس الخاص بك أمر صعب، يمكنك البدء بالرجوع إلى مشاريع الآخرين وإجراء التعديلات. عنوان الكود الرسمي لهذا الدرس هو: https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. تجربة أساليب تصميم مختلفة

بعد إكمال التصميم الأول، لا يتعين علينا أن نقتصر على ذلك، بل نشجع الجميع على استكشاف أساليب بصرية أكثر تنوعًا بسرعة. يمكنك إجراء تعديلات جريئة في جزء النموذج الأولي، أو إجراء تعديلات جديدة كاملة على الأوامر بناءً على المشروع النهائي، مما يؤدي إلى إنشاء مجموعات متعددة من الصفحات ذات الأساليب المختلفة بشكل كبير. على سبيل المثال، صفحة داكنة بنسيج عتيق مع أسلوب "الكتب القديمة/الأكاديمي"، أو صفحة فاتحة الألوان مليئة بإحساس "الحكاية الخيالية/الرسوم المتحركة"، أو تصميم مسطح حديث بعناصر بسيطة وواجهة نظيفة بصريًا. على سبيل المثال، الصورة أدناه هي حالة تحويل إلى أسلوب تصميم شاعر صيني قديم، حيث لم يتم تغيير صورة الصورة، وتم تعديل الأجزاء الأخرى فقط:

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

لا تلتزم بالأنماط المذكورة أعلاه. يمكنك تعديل الصورة السحرية أو صفحة الملف الشخصي لتكون أكثر تميزًا، وتتوافق مع عادات "الصورة السحرية" نفسها، مما سيجعل تطبيقك أكثر متعة. نتطلع إلى رؤية نتائج صورك السحرية!

# 📚 الواجب

هدف واجب هذا الدرس هو جعلك تكمل نسخة من صور هوجورتس الخاصة بك حقًا والتي يمكن الوصول إليها من خلال رابط شبكة عامة.

تحتاج إلى تقديم شيئين في تقديم الواجب:

1. **رابط مستودع GitHub الخاص بك؛**
   1. **اكتب في README.md جملة أو جملتين من الشرح: من اخترته كبطل للصورة، ولماذا اخترته.**
2. **رابط الوصول عبر الإنترنت لصور هوجورتس الخاص بك؛**

يمكنك أيضًا الرجوع إلى الدرس الذي كتبته Yerim [إنشاء صفحات الويب باستخدام وكلاء التصميم والكود](/ar-sa/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) للبناء السريع لمعرض أعمال شخصي أو أي صفحة ويب بوظائف بسيطة.
