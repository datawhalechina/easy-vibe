# كيف تبني موقعك الشخصي ومدونتك الأكاديمية - النشر الثابت عبر GitHub Pages

# 1. ما هو الموقع الشخصي والمدونة الأكاديمية؟

في هذا الدرس التعليمي، سنتابع حلقة مغلقة كاملة: **من العثور على قالب موقع جاهز، إلى تعديله ليصبح صفحة شخصية لإيلون ماسك، ثم نشره مجانًا على الإنترنت**.

لإتمام هذا الدرس، يجب أن تمتلك على الأقل:

* **حاسوبًا** (ويندوز أو ماك)
* **حساب GitHub خاص بك** (يُستخدم لتخزين كود الموقع واستضافته مجانًا)
* **برنامج Trae مثبَّت** (شريكك في البرمجة بالذكاء الاصطناعي)
* **بيئة Git**
* **بيئة Ruby**

## 1.1 ما هي الصفحة الشخصية الأكاديمية؟

**الصفحة الشخصية الأكاديمية** هي مساحتك الخاصة على الإنترنت.

على عكس حسابات تويتر أو فيسبوك أو لينكدإن، فهي لا تعتمد على خوارزمية توصيات أي منصة، ولن تختفي إذا أُغلقت المنصة. إنها مساحة عرض شخصية طويلة الأمد ومستقرة يمكن فهرستها بواسطة جوجل وGoogle Scholar. وعادةً ما تحتوي على سيرتك الذاتية ومنشوراتك ومشاريعك ومدونتك التقنية.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 لماذا تبني موقعك الخاص؟

في نموذج تطوير Vibe Coding، لم نعد بحاجة لدراسة كتب HTML/CSS الضخمة كما كان الناس يفعلون قبل عشر سنوات. مع الذكاء الاصطناعي، يتحول دور بناء الموقع من "مبرمج يكافح" إلى "رئيس تحرير الموقع":

1. **أنت (المحرر / مدير المنتج)**: تحدد طابع الموقع ومحتواه. مثلاً: "ضع عرض Mars colonization الخاص بماسك هنا"، أو "غيّر هذا الزر إلى لون أحمر تيسلا."
2. **Trae (مهندس الذكاء الاصطناعي)**: يتولى العمل البرمجي الصعب. يحول تعليماتك اللغوية إلى كود، بما في ذلك التخطيط والألوان والتوافق مع الأجهزة المحمولة.
3. **GitHub Pages (صالة العرض)**: يوفر خادمًا واسم نطاق مجانياً حتى يتمكن الناس حول العالم من رؤية عملك.

**لماذا يستحق الأمر امتلاك موقع للأكاديميين أو التقنيين؟**

* **خارجيًا (بناء التأثير)**: إنها **"بطاقة عمل دائمة."** عند التقديم لبرامج الدكتوراه أو الوظائف أو التعاون، غالبًا ما تكون الصفحة الشخصية الأنيقة أكثر إقناعًا بكثير من سيرة ذاتية بصيغة PDF.
* **داخليًا (تراكم المعرفة)**: إنها **"عقلك الثاني."** يمكنك استخدامها لتدوين ملاحظات الدورات والتفكير التقني وبناء نظام معرفي خاص بك.
* **للمستقبل (القابلية للاكتشاف)**: محركات البحث تحب المحتوى المنظم. مع صفحة شخصية، عندما يبحث الناس عن اسمك، **يمكن أن يظهر المحتوى الذي تحدده أنت** أولاً، بدلاً من أشخاص آخرين يحملون نفس الاسم.

## 1.3 أربع طرق نموذجية لبناء موقع شخصي

في الممارسة العملية، هناك طرق لا حصر لبناء موقع. هنا نقدم فقط الطرق الأربع الأكثر شيوعًا:

**الطريقة 1: الكتابة اليدوية من الصفر باستخدام HTML / CSS / JS**
هذا هو المسار التقليدي في علوم الحاسوب. تكتب الكود حرفًا بحرف. الميزة هي المرونة القصوى. والعيب هو الحاجز المرتفع للدخول، وسهولة التعثر في تعديلات CSS. إنها ليست مثالية لمن يريدون التركيز على المحتوى.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**الطريقة 2: برامج بناء المواقع المرئية مثل Wix / WordPress**
هذا يشبه البناء بالقطع. الميزة هي سهولة التحرير بالسحب والإفلات. والعيب هو أنها غالبًا ما تتطلب الدفع وتميل لإنتاج كود منتفخ وتفتقر للطابع الأكاديمي التقني ويصعب تخصيصها بعمق.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**الطريقة 3: قوالب مبنية على GitHub (مولدات المواقع الثابتة)**
هذا هو المسار الأكثر توصية في المجتمعات الأكاديمية والتقنية. نقوم مباشرة بعمل fork لقالب ناضج كتبه آخرون، مثل القوالم المبنية على Jekyll أو Hugo، ثم نعدل فقط ملفات الإعدادات والمحتوى.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**الطريقة 4: Vibe Coding (مسار التوليد المرئي بالذكاء الاصطناعي)**
مع وكلاء الذكاء الاصطناعي الذين يمتلكون فهمًا بصريًا متعدد الوسائط قويًا، تحتاج فقط لرؤية نمط موقع يعجبك على الإنترنت، وأخذ لقطة شاشة، وإخبار الذكاء الاصطناعي: "اكتب لي صفحة ويب بناءً على هذا النمط." يمكن للذكاء الاصطناعي بعد ذلك تحليل العناصر البصرية وتوليد الكود الأساسي لك.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**الاختيار في هذا الدرس: GitHub Pages + قالب أكاديمي + تعديلات بالذكاء الاصطناعي.**
السبب بسيط:

* **تكلفة صفرية**: لا حاجة لشراء خادم أو اسم نطاق.
* **جودة عالية**: القوالب غالبًا ما صممها مطورون من الطراز الأول، بأسلوب بسيط وهيكل احترافي وتحميل سريع.
* **سهولة الصيانة**: تكتب أساسًا بصيغة Markdown، المشابه للكتابة في مستندات جوجل أو Notion، ويساعد الذكاء الاصطناعي في توليد صفحة الويب.

## 1.4 خارطة الطريق الكاملة لهذا الدرس

لجعل عملية الإعداد أكثر وضوحًا وأقل مللاً، سنستخدم حالة ممتعة: **بناء صفحة أكاديمية لماسك**.

رغم أن إيلون ماسك ليس أستاذًا جامعيًا، إلا أنه نشر العديد من "الأوراق البيضاء التقنية" العامة، مثل *Hyperloop Alpha*، ويمتلك أيضًا مشاريع شهيرة مثل SpaceX وTesla. سنستخدم هذه المواد كبيانات اختبار، ومع سير عمل Vibe Coding عبر Trae، نمر بمسار بناء موقع قابل للتكرار:

1. **إيجاد الهيكل**: تحديد قالب موقع عالي الجودة على GitHub وعمل fork له إلى مستودعك الخاص.
2. **إعداد البيئة**: سحب الكود محليًا وإعداد Trae حتى يتمكن الذكاء الاصطناعي من قراءة مشروعك.
3. **التكرار مع الذكاء الاصطناعي**: استبدال بيانات الشخص في القالب بإيلون ماسك، رفع سيرته الذاتية، تحويل "قائمة المنشورات" إلى "عرض للأوراق البيضاء التقنية"، وحتى طلب من الذكاء الاصطناعي تغيير ألوان الموقع إلى "أحمر مريخي."
4. **النشر على الإنترنت**: دفع الكود المعدل مرة أخرى إلى GitHub والحصول فورًا على رابط موقع قابل للوصول.

هذا القسم مسؤول فقط عن رسم الصورة الكبيرة. الآن، تذكر فقط المحور الرئيسي:
**Fork للقالب -> تجديد بالذكاء الاصطناعي -> الدفع على الإنترنت**
في الأقسام التالية، سنتابع معًا كل خطوة.

# 2. إعداد البيئة

## 2.1 الأدوات المستخدمة في هذا الدرس

عملية البناء بأكملها تستخدم أربع أدوات أو موارد، كل منها يلعب دور المصمم أو المقاول أو مالك الأرض أو نظام اللوجستيات.

* **حاسوب**: ويندوز أو ماك. على عكس تطوير أندرويد الذي غالبًا ما يتطلب ذاكرة عالية، تطوير الويب خفيف جدًا ويعمل بسلاسة على حاسوب مكتبي عادي.
* **Trae**: هذا هو **شريكك في البرمجة بالذكاء الاصطناعي** وأداة الإنتاجية الأساسية. في وضع Vibe Coding، لا تحتاج لإتقان بنية HTML أو CSS. تخبر الذكاء الاصطناعي بشكل أساسي بلغة طبيعية، مثل "غيّر شريط التنقل إلى الأسود" أو "ضع صورة ماسك هنا"، ودعه يكتب ويعدل الكود لك.
* **حساب GitHub**: هذا هو **خادمك المجاني وخزنة الكود**. نحتاجه لتخزين جميع ملفات الموقع. والأهم، سنستخدم **GitHub Pages** لتحويل الكود إلى رابط URL يمكن الوصول إليه عالميًا مجانًا، مما يلغي الحاجة لشراء خادم أو اسم نطاق.
* **بيئة Git**: هذا هو **الساعي** في الكواليس. رغم أننا نكتب الكود محليًا في Trae، إلا أن Git هو ما يدفع الكود من حاسوبك إلى GitHub. لا تحتاج لإتقان أوامر Git، ويمكن لـ Trae المساعدة في استدعائها، لكن يجب تثبيت Git أولاً.
* **بيئة Ruby**: هذا هو **ورشة صفحات الويب** المحلية. لأن القالب الأكاديمي في هذا الدرس يستخدم Jekyll الذي يعمل على Ruby، نحتاج إلى Ruby محليًا حتى نتمكن من معاينة الموقع على حاسوبنا قبل دفعه على الإنترنت.

## 2.2 تحميل Trae

**Trae** هو ساحة المعركة الرئيسية لـ Vibe Coding. يمكنك التفكير فيه كـ **محرر كود مع ذكاء اصطناعي خارق مدمج**. على عكس المحررات التقليدية الباردة، إنه كمبرمج ذي خبرة يجلس بجانبك، جاهز دائمًا للمساعدة.

* **رابط التحميل**: قم بزيارة الموقع الرسمي [https://www.trae.cn](https://www.trae.cn) وحمّل النسخة الخاصة بنظام تشغيلك، ويندوز أو ماك.
* **التثبيت**: التثبيت بسيط جدًا، تمامًا مثل تثبيت أي تطبيق. انقر مرتين على حزمة المثبت واضغط "التالي" حتى ينتهي.

بعد إعداد هذه الأداة، في الخطوات العملية التالية لن نحتاج للتحديق في نوافذ الكود المملة. سنفتح المشروع مباشرة هنا ونستخدم لوحة الدردشة على اليمين لإخبار الذكاء الاصطناعي بلغة طبيعية، بالعربية إن أردت، ليساعدنا في كتابة الكود وإصلاح الأخطاء بل إعادة هيكلة صفحات كاملة.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 تحميل Git

**ما هو Git؟**
إذا كان Trae هو مهندس الذكاء الاصطناعي المسؤول عن كتابة الكود في Vibe Coding، فإن **Git هو الساعي المسؤول عن نقل الكود**. تحتاجه لتعبئة الكود المكتوب على حاسوبك ودفعه بأمان إلى GitHub، مستودعك السحابي. بدونه، يعمل موقعك على حاسوبك فقط ولا يمكن لأي شخص آخر رؤيته.

في الماضي، كان عليك الذهاب إلى الموقع الرسمي وتحميل المثبت وإعداد متغيرات البيئة يدويًا. كان هذا مزعجًا. الآن، يمكننا ببساطة ترك Trae يساعد في الكشف والتثبيت.

**الخطوة 1: التحقق مما إذا كان Git مثبتًا بالفعل**

افتح Trae واكتب التعليمات التالية في لوحة الدردشة في الأسفل يمينًا:

```markdown
Please help me check whether Git is already installed on this computer. Please run the `git --version` command in the terminal.
```

* **الحالة أ (مثبت بالفعل)**: إذا رأيت شيئًا مثل `git version 2.xx.x`، تهانينا. يمكنك تخطي خطوة التثبيت مباشرة.
* **الحالة ب (غير مثبت)**: إذا رأيت "command not found" أو مجموعة من رسائل الخطأ الحمراء، تابع أدناه.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**الخطوة 2: التثبيت بمساعدة الذكاء الاصطناعي**

لا تغلق Trae. استمر في الكتابة في لوحة الدردشة:

**التعليمة (لمستخدمي ويندوز):**

```markdown
I have not installed Git. Please write the command that uses the `winget` command-line tool to install Git automatically, and tell me how to run it in the terminal.
```

**التعليمة (لمستخدمي ماك):**

```markdown
I have not installed Git. Please tell me how to quickly install Git through terminal commands, for example using `git` or `brew`.
```

سيمنحك Trae أمرًا، غالبًا شيئًا مثل `winget install --id Git.Git`.

تحتاج فقط للنقر على زر **Run in Terminal** في كتلة الكود أو نسخه في الطرفية السفلية والضغط على Enter. سيقوم تلقائيًا بتحميل وتثبيت Git لك.

إذا كنت لا تزال تشعر أن عملية المساعدة بالذكاء الاصطناعي ليست مثالية بما فيه الكفاية، يمكنك الرجوع إلى هذا الدرس للتحميل والتثبيت اليدوي:
[درس تحميل وتثبيت Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 تثبيت بيئة Ruby

قبل أن نبدأ رسميًا في كتابة الكود، لا يزال لدينا قطعة أخيرة من اللغز. القالب الأكاديمي المستخدم في هذا الدرس مبني بـ Jekyll، وهو نفسه مبني على لغة البرمجة Ruby.

لمعاينة وتصحيح "تأثير التجديد" على حاسوبك قبل دفع الكود إلى GitHub ليراها العالم، يجب تثبيت بيئة Ruby على الحاسوب. فكر في هذا كتعيين مترجم على حاسوبك يفهم Ruby. لا تقلق، لا تحتاج لتعلم كتابة Ruby. تحتاج فقط لتثبيتها، ويمكن لـ Trae التعامل مع الباقي.

### 2.4.1 التثبيت على ويندوز

**الخطوة 1: تحميل المثبت باستخدام مرآة محلية**

لمستخدمي ويندوز، يوفر الموقع الرسمي على https://rubyinstaller.org/downloads/ مثبتات بنقرة واحدة، ولكن بسبب اختلافات الشبكة، من المفيد معرفة خدعة. التوصية الرسمية للمبتدئين عادةً هي **`Ruby+Devkit 3.X.X (x64)`**، لأنها تتضمن سلسلة الأدوات المطلوبة.

**ملاحظة للمبتدئين**: عمليًا، قد يكون التحميل مباشرة من الموقع الرسمي بطيئًا أو يفشل. نوصي بشدة باستخدام المرآة المحلية على [RubyInstaller for Windows - China mirror](https://rubyinstaller.cn/)، والتي عادةً ما تكون أسرع بكثير.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**الخطوة 2: تشغيل التثبيت**

انقر مرتين على المثبت الذي تم تحميله. في معالج الإعداد، تأكد من تحديد **"Add Ruby executables to your PATH."** هذه هي أهم خطوة. بدونها لن يتمكن الحاسوب من "العثور على" المترجم الذي ثبته للتو.

بعد تحديدها، استمر في النقر على **Next** لإكمال التثبيت.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**الخطوة 3: إعداد مجموعة أدوات التطوير**

عندما ينتهي شريط تقدم التثبيت، ستفتح نافذة سطر أوامر سوداء تلقائيًا. لا تهلع. اكتب الرقم `3` حيث يومض المؤشر، مما يعني تثبيت بيئة MSYS2 الأساسية وسلسلة أدوات MINGW، ثم اضغط Enter. انتظر حتى تنتهي الأوامر من العمل وتغلق النافذة تلقائيًا.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**الخطوة 4: التحقق من النتيجة**

الآن حان وقت سؤال الذكاء الاصطناعي للتحقق من عملك. افتح Trae واكتب التعليمة التالية بلغة طبيعية في الدردشة على اليمين:

```markdown
Please help me check whether the Ruby environment has been installed correctly on this computer. Please run the `ruby -v` command in the terminal at the bottom and tell me the result.
```

إذا رد Trae بشيء مثل `ruby 3.x.x`، فبيئة Ruby على ويندوز جاهزة بالكامل.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 التثبيت على ماك

إعداد بيئة ماك يبدو أكثر "تقنية" لأنه عادةً ما يتطلب أوامر الطرفية. لكن في وضع Vibe Coding، لا نحتاج حتى لفتح الطرفية يدويًا. يمكننا ببساطة ترك Trae يعمل كفني تقني شخصي لنا.

**الخطوة 1: إعطاء تعليمة الإعداد الشاملة**

افتح Trae والصق التعليمة التالية بلغة طبيعية في الدردشة على اليمين. سنطلب منه التعامل مع التحقق من Homebrew وتثبيته إن كان مفقودًا، ثم تثبيت Ruby:

```markdown
I am using a Mac computer and need to configure a Ruby development environment. Please help me complete the following steps:
1. Check whether Homebrew is already installed. If not, please run Homebrew's official installation script in the terminal.
2. After confirming Homebrew is ready, run `brew install ruby` in the terminal.
3. When everything is done, run `ruby -v` to confirm the installation succeeded.
Please guide me step by step, and when necessary provide terminal commands that I can click and run directly.
```

بعد تلقي التعليمة، سيبدأ Trae بالعمل ويعرض كتل كود مع أزرار تشغيل في لوحة الدردشة.

**ملاحظة مهمة للمبتدئين**

عند تثبيت Homebrew، غالبًا ما تظهر الطرفية شيئًا مثل `Password:` وتطلب كلمة مرور الدخول للماك.

**ملاحظة:** عند كتابة كلمة المرور في طرفية ماك، لن تعرض الشاشة أي أحرف أو نجوم. هذا طبيعي. فقط اكتب كلمة مرورك عمياءً واضغط Enter.

**الخطوة 2: التحقق من النتيجة**

بعد التثبيت، عد إلى Trae واكتب:

```markdown
I just installed Ruby on this Mac through `brew`. Please help me run the `ruby -v` command in the terminal and check whether the installation and environment variables are correct.
```

عندما ترى شيئًا مثل `ruby 3.x.x` في الطرفية، تكون ورشة صفحات الويب المحلية جاهزة وماكك مستعد لـ Vibe Coding.

## 2.5 إنشاء حساب GitHub

**ما هو GitHub؟**
إذا كان Git هو الساعي، فإن **GitHub هو المستودع السحابي وصالة العرض**. لا يستضيف كودك مجانًا فحسب، بل والأهم، مع **GitHub Pages** يمكنه تحويل كودك إلى رابط موقع يمكن الوصول إليه عالميًا. إنها أيضًا أكبر منصة استضافة كود في العالم، وامتلاك حساب GitHub هو بمثابة جواز سفر إلى العالم التقني.

**خطوات التسجيل:**

1. **زيارة الموقع الرسمي**: افتح [https://github.com/](https://github.com/).
2. **انقر على Sign up**: انقر على **"Sign up"** في الزاوية العلوية اليمنى.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **املأ معلوماتك**
4. **البريد الإلكتروني**: أدخل عنوان بريد إلكتروني حقيقي.
5. **كلمة المرور**: اختر كلمة مرور قوية.
6. **اسم المستخدم (مهم!)**: **اختر بعناية**. سيصبح رابط صفحتك لاحقًا **`https://your-username.github.io`**. من الأفضل استخدام اسمك الإنجليزي أو اسم مألوف أو مجموعة بسيطة من الحروف والأرقام. **لا** تختر شيئًا مثل `a1b2c3d4`، وإلا سيكون رابط موقعك صعب التذكر.
7. **التحقق والتفعيل**: أكمل التحقق البشري، غالبًا تدوير الصور أو اختيار المجرات الحلزونية، ثم تحقق من بريدك الإلكتروني للحصول على رمز التحقق.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

بمجرد اكتمال التسجيل، تمتلك قطعة أرض خاصة بك على الإنترنت. في القسم التالي، سنبني على تلك القطعة.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. من القالب إلى أول صفحة قابلة للوصول

كل شيء جاهز. في الفصلين الأولين، أعددنا الأدوات. في هذا الفصل، سنتولى رسميًا استملاك الأرض على الإنترنت. المهمة في هذا الفصل بسيطة:
**لا تقلق بشأن الديكور أو المحتوى بعد. ابنِ هيكل الموقع أولاً واحصل على رابط وصول مباشر.**

سنقوم مباشرة بعمل fork لقالب أكاديمي ناضج ونستخدم أتمتة GitHub Pages لتشغيله في غضون عشرين دقيقة. عند الانتهاء، سيكون لديك رابط يمكن الوصول إليه عالميًا.

## 3.1 الحصول على قالب موقع

في وضع Vibe Coding، لا نحتاج لكتابة HTML من الصفر. يمتلك GitHub آلاف القوالب الممتازة مفتوحة المصدر. نحتاج فقط لـ "استعارة" واحد وتغيير الاسم لاسمنا.

**الخطوة 1: إيجاد قالب**

هنا اخترنا قالبًا كلاسيكيًا بهيكل واضح وملاءمة قوية للعرض الأكاديمي:
https://github.com/luost26/academic-homepage?tab=readme-ov-file
هذا القالب مبني على إطار Jekyll.

بالطبع، يمكنك أيضًا البحث عن **`academic-homepage`** على GitHub واختيار نمط آخر يعجبك، لكن لمتابعة هذا الدرس، يُنصح باستخدام القالب أعلاه أولاً.

حضرنا أيضًا عدة توصيات قوالب إضافية لك:

* Minimal Light personal homepage theme: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**الخطوة 2: عمل Fork للمشروع**

قم بزيارة الصفحة الرئيسية للمستودع المستهدف وانقر على زر **Fork** في الزاوية العلوية اليمنى. ستظهر نافذة تأكيد. انقر **Create Fork** مباشرة.

* التوضيح: هذه الخطوة تعادل نسخ مستودع كود شخص آخر بمجموعة كاملة من المفاتيح إلى حساب GitHub الخاص بك. الآن، أنت تمتلك نسختك من الموقع.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**الخطوة 3: إعادة تسمية المستودع، أهم خطوة**

غيّر اسم المستودع إلى:
`your-username.github.io`

**ملاحظة مهمة للمبتدئين**:
هذه قاعدة صارمة في GitHub Pages.
مثلاً، إذا كان اسم مستخدم GitHub الخاص بك هو `musk-fan`، فيجب أن يكون اسم المستودع **بالضرورة** `musk-fan.github.io`.
بهذه الطريقة فقط سيخصص لك GitHub نطاقًا مجانيًا. إذا كان الاسم خاطئًا، لن تفتح صفحة الويب لاحقًا.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 الحصول على رابط مشروع GitHub

بعد إعادة التسمية، نحتاج إلى إيصال استلام المستودع.

1. عد إلى الصفحة الرئيسية للمستودع، تحت علامة تبويب **Code**.
2. انقر على زر **Code** الأخضر.
3. تأكد من تحديد علامة تبويب **HTTPS**.
4. انقر على زر النسخ وانسخ الرابط المنتهي بـ `.git`، مثلاً `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 سحب المشروع محليًا

في الماضي، كان على المبرمجين كتابة أوامر Git معقدة في طرفية سوداء لتحميل الكود. في عصر Vibe Coding، لدينا Trae. نحتاج فقط لإخبار الذكاء الاصطناعي، "أريد هذا، ساعدني في سحبه."

**الخطوة 1: التحضير**

أنشئ مجلدًا جديدًا على حاسوبك، مثلاً `MyWebsite`، ثم انقر بزر الماوس الأيمن واختر **Open with Trae**، أو افتح Trae أولاً واختر **Open Folder**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**الخطوة 2: إعطاء أمر النسخ**

بعد فتح Trae، استدعِ لوحة دردشة الذكاء الاصطناعي على اليمين وأدخل التعليمة التالية بلغة طبيعية:

```text
Please help me clone the remote GitHub repository into the current folder.
Repository address: paste the URL you just copied, for example https://github.com/musk-fan/musk-fan.github.io.git
Execution requirement: please run the `git clone` command directly in the terminal.
```

**الخطوة 3: تأكيد التحميل**

سيستدعي Trae تلقائيًا الطرفية السفلية وينفذ الأمر. انتظر بضع ثوانٍ. عندما ترى ملفات مثل `_config.yml` و `index.html` تظهر في شجرة الملفات على اليسار، يكون المشروع قد نُقل بنجاح إلى حاسوبك.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 معاينة صفحة الويب محليًا

الكود على حاسوبك وبيئة Ruby جاهزة. قبل أن نعدل الموقع، يجب أن نفتشه محليًا على حاسوبنا أولاً. هذا يشبه تجديد منزل: ترتب كل شيء في صالة العرض أولاً، وتتأكد أنه يبدو صحيحًا، ثم تفتحه للعامة.

بفضل بيئة Ruby المثبتة في **القسم 2.4**، أصبح هذا الآن بسيطًا جدًا.

**الخطوة 1: تثبيت التبعيات**

يعتمد موقع Jekyll على العديد من الحزم (Gems) ليعمل. هذا مثل شراء كل الأثاث من قائمة تسوق. **لكن** بسبب ظروف الشبكة، قد يتعطل التحميل المباشر. سنطلب من Trae **التبديل إلى مرآة محلية** وتثبيت التبعيات من هناك.

في مربع دردشة Trae، أدخل:

```markdown
I need to install the Jekyll dependencies. Considering the network environment, please first change the `source` in the Gemfile to the domestic mirror `https://gems.ruby-china.com/`. After that, please run the `bundle install` command in the terminal to install all dependencies.
```

**الخطوة 2: بدء الخدمة المحلية**

الآن سنبدأ **خادمًا محليًا** لمحاكاة تشغيل الموقع. تابع وأخبر Trae:

```markdown
The dependencies have finished installing. Please help me start the Jekyll local preview service in the terminal. Please run the `bundle exec jekyll serve` command.
```

بعد أن تعمل الطرفية لبضع ثوانٍ، سترى شيئًا مشابهًا لـ:
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **افتح المتصفح**: انقر على ذلك الرابط، أو اكتبه مباشرة في متصفحك:
   `http://127.0.0.1:4000/academic-homepage/`
2. **شاهد السحر**: موقعك يعمل الآن في المتصفح. رغم أنه لا يزال يعرض اسم مؤلف القالب الأصلي، إلا أنه يعمل بالفعل محليًا على حاسوبك.

من هذه النقطة فصاعدًا، كلما غيّرت محتوى وضغطت `Ctrl+S`، ثم حدثت المتصفح، **ستتغير محتويات صفحة الويب تبعًا لذلك**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

بمجرد أن تعمل المعاينة المحلية، يمكننا الدخول في الفصل التالي وبدء تحويل الموقع إلى شيء يشبه إيلون ماسك.

# 4. تعديل المحتوى بمساعدة الذكاء الاصطناعي

لمساعدة الجميع على تجربة العملية الكاملة بسرعة، لن نستخدم معلوماتنا الشخصية، لتجنب القلق بشأن الخصوصية. بدلاً من ذلك، سنستخدم **إيلون ماسك كمثال** ونبني صفحة أكاديمية له. هذا يتيح لنا التخلص من الضغط الممل لكتابة سيرة ذاتية شخصية والتركيز على متعة Vibe Coding لمواقع الويب. كما يتيح لنا رؤية مدى روعة وضع "الأوراق البيضاء التقنية" لرجل حديد من وادي السيليكون، مثل *Hyperloop Alpha*، على موقع بأسلوب أكاديمي.

سنتابع الحلقة الكاملة من **الحصول على القالب** إلى **نشر الموقع**، ونبني مساحة عرض شخصية عالمية المستوى بأيدينا.

اتبع وتيرتي وأرسل أول تعليمة للذكاء الاصطناعي.

## 4.1 قيود عامة موحدة

هذا هو **موجه الإعداد العام**. تحتاج لإرساله مرة واحدة فقط.
الغرض منه هو وضع قواعد للذكاء الاصطناعي، لمنعه من الارتجال وكسر هيكل الموقع. انسخه مباشرة إلى Trae:

```text
You are now the maintainer of a "GitHub Pages + Jekyll academic homepage template" site.
The current repository is a Jekyll-powered academic homepage (including `_config.yml`, `_data`, `_layouts`, etc.).
Your modifications must follow these principles:
1. Each step should only solve the current stage goal. Do not do later-stage content in advance.
2. Do not modify the site structure, do not introduce new plugins, and do not change the theme style.
3. All content must be renderable by Jekyll without errors.
4. All identity information must follow an "academic-style simulation" tone and must not use first-person voice.
5. Do not invent obviously fake IEEE / Nature papers.
6. If information is uncertain, use "publicly well-known facts" or "reasonable academic simulation labeling."
```

## 4.2 بناء صفحة ماسك، جزء المحتوى

### 4.2.1 أول تعليمة شاملة: استبدال الهوية

أول شيء نحتاج لحله هو "من أنا؟" القالب مليء بمعلومات المؤلف الأصلي، ونحتاج لاستبدالها بالذكاء الاصطناعي دفعة واحدة.

**الخطوة 1: إعداد الأصول**

ضع أصول الصور التي أقدمها لك، `University_of_Pennsylvania.jpg` و `Queen_University.jpg`، في مجلد المشروع المقابل، عادةً `/assets/images/badges/`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**الخطوة 2: إرسال التعليمة**

في مربع دردشة Trae على اليمين، أدخل الموجه التالي. لاحظ أننا لا نحتاج للبحث عن السطور وتعديلها يدويًا. نحتاج فقط لإخبار الذكاء الاصطناعي بما نريده:

```text
1. Goal: replace the "person identity" of the current academic homepage with Elon Musk. Only modify the basic profile information.
2. Specific requirements:
1. Name: Elon Musk
2. Professional identity:
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3. Education:
    Queen's University (Physics and Economics, not completed) (image path: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physics, B.A. in Economics) (image path: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Research Interests (can be simulated as):
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5. Honors & Recognition:
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6. Constraints:
    Do not add papers / publications
    Do not invent IEEE, Nature, or Science papers
    Use academic-style wording and avoid commercial promotional tone
    Keep the original field structure unchanged and only replace the content
```

في هذه النقطة، يمكنك أن ترى أن Trae قد أكمل جميع متطلبات التعديل الخاصة بنا.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**الخطوة 3: تحديث المتصفح المحلي**

حدّث المتصفح المحلي الآن، وينبغي أن ترى كل شيء مستبدلاً بشكل صحيح.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 التحسين التكراري: إضافة "الأوراق" والمشاريع

لأن إيلون ماسك ليس أستاذًا جامعيًا تقليديًا، فهو نادرًا ما ينشر أوراقًا في *Nature* أو *Science*. لكن بصفته "مهندسًا رئيسيًا"، أصدر العديد من **الأوراق البيضاء** و**الخطط الرئيسية** عالية التقنية.

في سياق صفحة أكاديمية، يمكننا إعادة تعريف معنى "المنشورات" ليكون **"الأوراق البيضاء التقنية والخطط الرؤيوية."** هذا ليس محرجًا على الإطلاق. في الواقع، يناسب هويته كبنّاء بشكل جيد للغاية.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**الخطوة 1: إعداد الأصول**

حمّل صور الغلاف التي أقدمها، وهي `Hyperloop_Alpha_sketch.jpg` و `SpaceX_Starship.jpg` و `Neuralink_sewing_machine_robot.jpg`، وضعها تحت `/assets/images/covers/`، وأزل الصور النموذجية الأصلية الموجودة في ذلك المجلد.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**الخطوة 2: إرسال التعليمة**

أرسل الموجه التالي إلى Trae ودعه يساعدنا في إعادة بناء هيكل البيانات:

```text
1. Role setting: you are a static site development expert who is proficient in Jekyll and Liquid syntax.
2. Task goal:
Modify the section title on the homepage or in the navigation bar.
The current file structure is organized by year subfolders, for example `_publications/2023/xxx.md`.
Create three new Markdown files in the specified format to display Elon Musk's technical white papers and visionary plans.
3. Specific steps and requirements:
1. Modify the section title
    Please search globally for the string "Selected Publications" (it may appear in `index.html`, `_config.yml`, or `_pages/publications.md`).
    Replace it with: "Technical White Papers & Visionary Plans".
2. Rebuild the publication data (critical step)
    Clear all old content under the `_publications` folder, including old year folders such as 2023 and 2024.
    Create three new folders: `_publications/2013/`, `_publications/2017/`, and `_publications/2019/`.
    In those folders, create the following three Markdown files.
3. Strictly follow this file format
Important: you must strictly follow the YAML Front Matter format below, and must not invent new field names:
    - title:          "paper title"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "venue / journal name"
    - pub_date:       "year"
    - abstract: >-    abstract content...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Author1- Author2
    - links:Paper:    https://paper-link
4. Please generate the full code for the following three files (including the path descriptions):
(1) Path: `_publications/2013/2013-hyperloop.md`
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Path: `_publications/2017/2017-mars.md`
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Path: `_publications/2019/2019-neuralink.md`
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Execution requirement:
Please directly provide the complete content of these three files, and also provide the modification code for the file where you changed the title.
```

**الخطوة 3: تحديث المتصفح المحلي**

عندما يكتمل البناء، ستجد أن قائمة المنشورات المملة سابقًا تحولت إلى عرض تكنولوجي مستقبلي مذهل.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 التلميع النهائي: الروابط الاجتماعية والصورة الشخصية

هذه هي الخطوة الرئيسية للانتقال من درجة 90 إلى درجة 100. قد لا يزال الشريط الجانبي يحتوي على رابط GitHub الأصلي للقالب أو بريدًا إلكترونيًا خاطئًا. نحتاج لتوجيهها إلى حسابات ماسك الاجتماعية الحقيقية، بشكل أساسي X.com.

**الخطوة 1: التحضير**

ابحث في جوجل عن صورة جميلة لماسك، احفظها باسم `portrait.png`، أو اسحبها إلى مجلد `images/photo` في Trae واستبدل الصورة الأصلية.

**الخطوة 2: انسخ الموجه التالي إلى Trae**

```text
1. Role setting: you are a detail-oriented Jekyll website development expert.
2. Task goal: complete the final update of the website sidebar and personal information configuration. We need to update the author's avatar, intro, and social links to Elon Musk's real information.
Please first scan the project structure and find the configuration file that controls the author information.
3. Please make the following modifications:
1. Avatar path fix
    I have already uploaded a new image named `portrait.png` into the `images/` or `assets/images/` folder.
    Please modify the avatar path in the configuration file to point to this image, and ensure the relative path is correct, for example `/images/portrait.png`.
2. Social link cleanup
    Please update or remove the social icon links in the sidebar:
    Email: change it to `elon@spacex.com`, or if the field allows, comment it out or remove it to avoid harassment.
    Twitter / X: change it to `https://x.com/elonmusk` (this is the core link).
    GitHub: change it to `https://github.com/tesla` to point to the Tesla open-source repository, or remove it directly.
    Google Scholar: must be removed, because he does not maintain it.
    LinkedIn / ResearchGate: if they exist, remove them all.
Output requirement:
Please directly provide the complete modified configuration code snippet.
```

**الخطوة 3: تحديث المتصفح المحلي**

1. انظر إلى الشريط الجانبي. هل يستخدم الآن تلك الصورة الوسيمة؟ هل النقر على أيقونة تويتر ينقلك إلى X.com؟

في هذه النقطة، محليًا، لديك بالفعل صفحة شخصية أكاديمية كاملة واحترافية بطابع ماسك المميز بوضوح.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 حقن الروح من خلال تخصيص واجهة المستخدم، جزء الأسلوب

المحتوى الآن صحيح، لكن الصفحة لا تزال تبدو كسيرة ذاتية مطبوعة. تفتقر للإحساس التقني. في وضع Vibe Coding، لا نحتاج لفهم CSS. نحتاج فقط لوصف **الشعور** الذي نريده للذكاء الاصطناعي.

**سيناريو كمثال**:
إذا كنت تعتقد أن الخلفية الرمادية باهتة جدًا وتريد تغييرها إلى **أحمر مريخي**، فقط اطلب من Trae:
*"أريد تغيير لون خلفية الشريط الجانبي إلى الأحمر الداكن (#8B0000) ليعكس شعور المريخ. أي ملف CSS أو SCSS يجب أن أعدله؟ أعطني الكود مباشرة."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

إذا أعجبك أسلوب **SpaceX Dashboard** في الصورة النموذجية أعلاه، يمكنك نسخ الموجه التالي مباشرة بمستوى المصمم:

```text
1. Role setting: you are a top UI designer who admires "Swiss internationalist style" and is good at interfaces like Notion, Linear, or Apple.
2. Task goal: please completely rewrite the CSS / SCSS to create a "SpaceX Dashboard" style minimalist academic homepage. The core keywords are: transparent, restrained, precise.
3. Please apply the following concrete style overrides:
1. Global typography
    Font: abandon the original serif font. Force the whole site to use the system-level sans-serif stack:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Line height: increase breathing room in the body text with `line-height: 1.75`.
    Colors:
        Main title: #111111
        Body text: #333333
        Secondary information such as dates or citations: #666666
2. Clean header
    Background: remove the previous black background and use pure white (#FFFFFF), or translucent white with blur if supported, for example `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Border: keep only a very thin bottom border, `border-bottom: 1px solid #EAEAEA`.
    Text: navigation links should use dark gray #333333, and only become black and bold on hover.
3. Remove cards and return to content
    Remove the background and shadow of the left sidebar and the About me cards (`box-shadow: none`, `background: transparent`).
    Great minimalism lets the text float directly on the page background.
    Increase spacing: significantly increase `margin-bottom`, for example 80px, between sections and use whitespace instead of borders to separate content.
4. Restrained use of brand color
    Use Tesla Red (#E82127) only on links and important buttons.
    Link style: remove underline and only change color. On hover, add a light red background block such as `background: rgba(232, 33, 39, 0.05)`.
5. Avatar tuning
    Keep it circular with `border-radius: 50%`.
    Remove the border.
    Keep only a very light shadow, such as `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Execution requirement:
Please analyze the `_sass` or CSS files. Do not patch the old code. Instead, directly provide the code that resets and overrides the styles above.
```

## 4.4 استبدله بمعلوماتك الخاصة، جزء التخصيص

تهانينا. بعد المرور بتدفق صفحة ماسك أعلاه، أتقنت بالفعل العقلية الأساسية لـ Vibe Coding لبناء المواقع. تحويل هذه الغرفة النموذجية إلى منزلك الخاص سهل الآن فعليًا.

لا تحتاج للبدء من الصفر. تحتاج فقط لتكرار الخطوات أعلاه، لكن باستراتيجية أكثر مرونة قليلاً:

**الخطوة 1: الاستبدال المادي، الصورة والمعلومات الأساسية**

هذه أسهل خطوة:

1. **تغيير الصورة**: في لوحة الملفات على الجانب الأيسر من Trae، ابحث عن `assets/images/` واسحب صورتك الشخصية هناك، مستبدلاً `portrait.png`.
2. **تغيير الاسم**: أخبر Trae، "استبدل جميع حالات ظهور اسم إيلون ماسك في الموقع بالكامل باسمي [اسمك]."

**الخطوة 2: المعالجة المسبقة بالذكاء الاصطناعي، دع ChatGPT / Gemini يساعد في تنظيم المحتوى**

Trae جيد في كتابة الكود، لكن إذا ألقيت عليه سيرة ذاتية فوضوية بصيغة PDF مباشرة، فقد يرتبك.

**لذا النهج الأكثر كفاءة هو هذا**:
استخدم أولاً ذكاءً اصطناعيًا قويًا في التعامل مع النصوص الطويلة، مثل ChatGPT أو Gemini أو Kimi، ليساعدك في **التنسيق النظيف** لسيرتك الذاتية.

يمكنك إرسال موجه مثل هذا إلى ChatGPT:

```text
Role setting: you are a professional academic website content planner.
Task goal:
I will send you my personal resume / CV. Please help me extract key information from it and organize it into a clear Markdown structure suitable for filling directly into a static website.
Please strictly organize and refine it into the following five modules. If some content does not exist, leave it blank.
1. Profile
Name: my full name.
Tagline: a one-line professional tag, for example "CS Student @ XX Univ | AI Enthusiast".
Bio: a 50 to 100 word third-person introduction summarizing my background and core skills, in a professional academic tone.
Socials: extract email, GitHub, LinkedIn, blog links, and so on.
2. Education
Please list: school name, degree such as B.S. in CS, and time range.
Optional: if GPA or core courses are available, add them on a separate line.
3. Selected Projects - important
Please extract 2 to 3 strongest projects, and for each include:
Title: project name.
Tech Stack: technologies used, such as Python, React, PyTorch.
TL;DR: a one-line summary of what the project does.
Description: 2 to 3 core contributions, refined using STAR style.
Image Placeholder: reserve an image filename such as `project_name.jpg`.
4. Publications / Articles
If there are papers or technical articles, please extract:
Title
Venue
Date, year is enough
Abstract, one-sentence summary
5. Skills
Please organize them into categories: programming languages, frameworks / tools, and other skills.
Output requirement:
Do not explain the process. Directly output the cleaned Markdown content.
```

بمجرد حصولك على هذا النص المنظف، أدفعه إلى Trae، وسوف تتحسن الدقة بشكل كبير.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**الخطوة 3: استبدال المحتوى الأساسي، مع مسارين محتملين**

في هذه الخطوة، حسب تفضيلك، يمكنك اختيار وضعين مختلفين من Vibe Coding:

1. **الوضع أ: دع الذكاء الاصطناعي يتنقل، ثم عدّل يدويًا**

إذا كنت تريد معرفة بالضبط أين تم تغيير كل شيء، يمكنك سؤال Trae:

```markdown
I want to modify the "Education" section. Please tell me where the corresponding file path is and which lines contain the code.
```

سيخبرك Trae في الدردشة شيئًا مثل:
"الملف الذي تحتاج لتعديله هو `_pages/about.md`، والكود ذو الصلة حول السطر XX..."

يمكنك بعد ذلك فتح ذلك الملف بنفسك من شجرة الملفات على اليسار وملء المحتوى المنظف من ChatGPT كتمرين تحرير منظم.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **الوضع ب: أتمتة كاملة مدارة**

إذا كنت تعتقد أن البحث عن الملفات مزعج جدًا، الصق معلوماتك المنظفة مباشرة في Trae:

```markdown
Here is the cleaned content for my "Education" and "Project Experience" sections (paste the Markdown content).
Please directly replace the corresponding content in the current site and preserve the existing layout format.
```

# 5. النشر على الإنترنت

## 5.1 النشر على GitHub Pages

**الخطوة 1: تفعيل GitHub Actions، البناء السحابي**

عد إلى GitHub في المتصفح:

1. انقر على **Settings** في أعلى المستودع.
2. في الشريط الجانبي الأيسر، انقر على **Pages**.
3. تحت **Build and deployment**، غيّر **Source** من `Deploy from a branch` إلى **`GitHub Actions`**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**الخطوة 2: الإعداد التلقائي لسير عمل Jekyll**

بعد التبديل، يتغير تخطيط الصفحة. سيتعرف GitHub تلقائيًا على أن هذا مشروع Jekyll.

1. ابحث عن بطاقة **Jekyll (By GitHub Actions)**.
2. انقر **Configure** على تلك البطاقة.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**الخطوة 3: حفظ ملف الإعداد**

بعد النقر، ستُنقل إلى صفحة مليئة بالكود. هذا ملف إعداد بتنسيق `.yml` كتبه GitHub بالفعل لبناء موقع Jekyll.

1. **لا تعدّل أي كود**.
2. انقر على زر **Commit changes...** الأخضر في الزاوية العلوية اليمنى.
3. في نافذة التأكيد المنبثقة، انقر **Commit changes** مرة أخرى.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**الخطوة 4: الانتظار والتحقق**

بعد الحفظ، تبدأ خوادم GitHub بالعمل تلقائيًا.

1. انقر على علامة تبويب **Actions** في القائمة العلوية.
2. سترى مهمة باسم `Deploy Jekyll site to Pages` تدور.
3. انتظر دقيقة إلى دقيقتين حتى يتحول الدائرة الصفراء إلى **علامة اختيار خضراء**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**الخطوة 5: زيارة موقعك**

بمجرد أن تتحول الدائرة إلى اللون الأخضر، يمكنك الوصول إلى النسخة الافتراضية من القالب عبر عنوان مثل:
**`https://your-username.github.io/`**

تهانينا. لقد نجحت الآن في نشر صفحة شخصية أكاديمية يمكن الوصول إليها عالميًا.

## 5.2 حفظ التغييرات وتحديث الصفحة الشخصية

الآن سنقوم بدفع جميع التعديلات المحلية التي أجريناها سابقًا إلى GitHub، حتى يمكن رؤية هذه الصفحة الشخصية بطابع ماسك من قبل العالم.

1. انقر على **Source Control** على اليسار.
2. أضف جميع **التغييرات** إلى **التغييرات المرحلية**.
3. دع Trae يساعد في توليد رسالة حفظ، ثم انقر **Commit**.
4. انقر **Sync Changes** أو **Push** للدفع إلى فرع `main`.
5. انتظر لحظة حتى تكتمل جميع العمليات تحت علامة تبويب **Actions**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

الآن، تهانينا. افتح **`https://your-username.github.io/`**، وتمتلك بالفعل صفحة شخصية أكاديمية كاملة واحترافية بطابع ماسك القوي.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. مستوى متقدم: بناء صفحة شخصية يدويًا من الصفر

إذا كنت تعتقد أن القوالب الأكاديمية صارمة جدًا، أو إذا كنت تريد إنشاء موقع صفحة واحدة رائع مثل *The Matrix*، مرحبًا بك في **قسم اصنعها بنفسك**.

هنا، لا نقوم بعمل fork لكود أي شخص آخر. سنستخدم Trae، بدءًا من مجلد فارغ، وتوليد موقع كامل بتعليمة واحدة، ثم نشره على الإنترنت.

## 6.1 لماذا نبنيها يدويًا

* **حرية مطلقة**: بلا قيود قوالب. إذا كنت تريد شريط التنقل على اليمين، أو ألعاب نارية في الخلفية، تحتاج فقط لإخبار الذكاء الاصطناعي.
* **بساطة**: القوالب غالبًا ما تحتوي على مئات الملفات، بينما موقع مبني يدويًا قد يحتاج فقط ملف `index.html` واحد.
* **التحكم التقني**: هذه هي أفضل طريقة لفهم كيف تعمل صفحة الويب فعليًا.

سنعرض **مسار HTML النقي** الكلاسيكي:
لا يحتاج لتجميع، ويدعمه GitHub Pages أصلاً، مما يجعله مثاليًا لبناء صفحة هبوط شخصية.

## 6.2 مثال عملي: اطلب من الذكاء الاصطناعي كتابة صفحة رئيسية "لمركز قيادة المريخ"

هذه المرة لن نتبع المسار الأكاديمي. لنفترض أن ماسك يريد صفحة شخصية بسيطة للغاية ومستقبلية لعرض خطة المريخ الخاصة به.

**الخطوة 1: إنشاء مشروع فارغ**

أنشئ مجلدًا جديدًا على حاسوبك وافتحه بـ Trae. في تلك اللحظة، شجرة الملفات على اليسار فارغة تمامًا.

*(نصيحة: يمكنك تحضير صورة لماسك مسبقًا وتسميتها `portrait.png`.)*

**الخطوة 2: بناء الإطار**

أدخل الموجه التالي في لوحة دردشة Trae. لاحظ أننا نطلب من الذكاء الاصطناعي كتابة كل الكود في ملف واحد حتى يكون سهل الإدارة للمبتدئين:

```text
I want to build a minimalist personal homepage for Elon Musk from scratch, without any complex framework, using only HTML + CSS + JS.
Design style: SpaceX dashboard style.
    Background: use deep space black (#000000), with starlight animation.
    Main accent color: use "Mars red" (#E82127).
    Font: use a monospace font stack to imitate the feel of a code terminal.
Page content:
    Place Elon Musk's avatar in the center, circular, with a rotating border. The image path is `portrait.png`.
    Name: Elon Musk (Technoking of Tesla)
    Intro: "Occupying Mars... 99% Loading."
    At the bottom, put three glowing buttons linking to X (Twitter), SpaceX, and Tesla.
Technical requirement:
Please put all CSS styles and HTML structure inside a single `index.html` file.
Please generate the full code directly.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**الخطوة 3: التوليد والمعاينة**

في الخطوة السابقة، ساعدنا Trae بالفعل في توليد ملف `index.html`. إذن كيف نرى تأثيره الحالي؟

أخبر Trae في الدردشة:

```markdown
Please help me start a local service to preview this webpage.
```

ستتلقى رابطًا مثل `http://localhost:8000`. انسخه وافتحه في المتصفح، وسترى "صفحة مريخية" رائعة، ربما مع نجوم تومض في الخلفية.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

لكننا سنلاحظ أن الصفحة الحالية هي مجرد صفحة هبوط رائعة جدًا. كصفحة شخصية كاملة، لا تزال تحتوي على معلومات قليلة جدًا وتفتقر للعمق المتوقع من صفحة أكاديمية. لذا بناءً على هذا الإطار البصري، نستمر الآن في إثرائه بمعلومات أكاديمية النمط عن إيلون ماسك.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**الخطوة 4: التحسين الإضافي للمعلومات**

نريد من Trae أن يحافظ على أسلوب المريخ الحالي، لكن يعيد هيكلة الصفحة لتصبح أشبه بالقالب الأكاديمي. نحتاج لإخباره بوضوح بنقل العناصر الموجودة إلى اليسار وإنشاء منطقة محتوى جديدة على اليمين للنص التعريفي والأوراق البيضاء، مع الحفاظ على كل المحتوى المضاف حديثًا بنفس الأسلوب الأسود والأحمر السايبربانكي.

انسخ الموجه التالي وأرسله إلى Trae:

```text
Core principle:
You must strictly preserve the current "SpaceX / Mars" design style, including pure black background, starlight decorations, red neon accent color, and monospace code-style font. Do not use the white background from the reference image.

Specific modification steps:
1. Create a two-column layout
Split the page into left and right columns. The left sidebar should take about 30% to 35% width, and the right content area should take about 65% to 70%.

2. Left sidebar - move the existing information
Move all current elements from the original hero screen into the fixed left sidebar:
    - Avatar: keep Elon Musk's circular avatar.
    - Name and title: keep the red neon text "ELON MUSK" and "Technoking of Tesla".
    - Loading bar: keep "Occupying Mars... 99% Loading" as the personal signature.
    - Social buttons: move the three red buttons, X, SPACE X, and TESLA, to the bottom of the left sidebar.

3. Right content area - add detailed information
Add detailed personal introduction and achievements in the right area. All new body text should use white or light gray, while titles should use red neon emphasis. Please create the following sections:
- About Me:
    Write a short introduction, for example: "Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas:
    List Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers:
    This is the key section. Refer to the list style in the example image, but convert it into a black-background style.
    Create a list displaying his important technical plans, using red borders or glow effects to distinguish each item.
    Item 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    Item 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    Item 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements:
    Briefly list milestones such as:
    First private liquid-propellant rocket to reach orbit (Falcon 1)
    First reusable orbital class rocket (Falcon 9)

4. Style detail requirements
All section titles on the right, such as "About Me," should use the same red glowing style as the "ELON MUSK" text on the left.
Make sure the whole page remains responsive and preserves a good two-column layout on different screen sizes.
```

حدّث المتصفح بعد ذلك، وصفحتك الأكاديمية السايبربانك مكتملة. بالطبع، يمكنك الاستمرار في التحسين حسب تفضيلاتك الخاصة. كما في الخطوات السابقة، تحتاج فقط لإخبار Trae بالهدف بوضوح، وسيتولى عملية البرمجة الشاقة نيابة عنك.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 كيفية نشر الموقع المبني يدويًا

على عكس القالب السابق الذي عملنا له fork والذي جاء من مستودع شخص آخر، هذا المشروع أنشأته حديثًا ولا يمتلك موقعًا مقابلًا على GitHub بعد. لذلك نحتاج لربطه يدويًا.

**الخطوة 1: إنشاء مستودع جديد على GitHub**

1. سجّل الدخول إلى GitHub في المتصفح.
2. انقر على أيقونة **+** في الزاوية العلوية اليمنى، ثم **New repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **اسم المستودع**: أدخل `mars-profile`، أو أي اسم آخر يعجبك.

**ملاحظة**:
إذا كنت قد استخدمت بالفعل **`your-username.github.io`**، لا يمكنك إعادة استخدام ذلك الاسم هنا. يمكنك اختيار اسم آخر، وسيولّد GitHub حينها رابطًا مثل **`your-username.github.io/mars-link`**.

4. **عام / خاص**: اختر **Public**.
5. **لا تحدد "Add a README file"!**
   اترك الخيارات الأخرى على إعداداتها الافتراضية.
6. انقر **Create repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**الخطوة 2: دفع الكود المحلي إلى السحابة**

بعد الإنشاء، سينقلك GitHub إلى صفحة بها الكثير من المحتوى الذي يشبه الكود. لا تقلق. نحتاج فقط لنسخ رابط المستودع المعروض على تلك الصفحة.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

عد إلى Trae واكتب في الدردشة:

```markdown
I have created an empty repository on GitHub. The address is: https://github.com/your-username/mars-link.git (please replace this with the actual repository address you just created).
Now please help me initialize the current local project as a Git repository and push the code to the `main` branch of this remote address.
```

عادةً ما يساعدك Trae في تنفيذ التسلسل القياسي أدناه، وقد تحتاج فقط للنقر لتشغيلها:

1. `git init`
2. `git add .` و `git commit -m "First commit"`
3. `git branch -M main` و `git remote add origin [عنوانك]`
4. `git push -u origin main`

بعد أن يكمل Trae الدفع، عد إلى GitHub وحدّث الصفحة. انقر على علامة تبويب **Code**، وسترى أن الكود المكتوب في Trae تم دفعه بنجاح إلى المستودع.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**الخطوة 3: تفعيل GitHub Pages**

بعد دفع الكود، لن تظهر صفحة الويب تلقائيًا. لا يزال يتعين علينا تشغيل المفتاح يدويًا:

1. عد إلى صفحة مستودع GitHub وانقر على **Settings** في الأعلى.
2. انقر على **Pages** في الشريط الجانبي الأيسر.
3. تحت **Build and deployment**:
   1. اضبط **Source** على `Deploy from a branch`.
   2. اضبط **Branch** على `main`، واختر `/(root)` كمجلد.
4. انقر **Save**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

بعد النقر على Save، لن تظهر صفحة الويب فورًا. يعمل خلفية GitHub مثل مصنع روبوتات صغير. تحتاج لحوالي **1 إلى 2 دقيقة** لتعبئة الكود وبناءه ونشره على الخوادم العالمية.

انتظر بصبر وحدّث الصفحة. تحت عنوان **GitHub Pages** الكبير، سترى سطرًا يحتوي على رابط مشابه لـ:
**"Your site is live at `https://your-username.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

انقر عليه، ومركز قيادة المريخ الخاص بك متصل بالإنترنت.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. كلمات أخيرة

انتهى الدرس التعليمي. الآن، عندما تنظر إلى `.github.io` المتوهج في شريط عناوين متصفحك، هل تشعر بقليل من أنك غرست علمًا على الإنترنت؟

في هذا الدرس، استعرنا شخصية إيلون ماسك وبنينا موقعًا مثل مشروع ليغو يبدو مثيرًا للإعجاب إلى حد بعيد. لكن هذه مجرد البداية. الجزء الأكثر سحرًا في Vibe Coding ليس مقدار وقت الكتابة الذي يوفره. بل أنه **يحطم تمامًا الجدار بين "الفكرة" و"الواقع."**

في الماضي، ربما كنت تستسلم عن عرض مشروع لأنك **لم تستطع كتابة CSS**.
الآن، الحدود المتبقية الوحيدة هي **خيالك** و**ذوقك**.

**لا تدع هذا الموقع يبقى "نسخة مستوحاة من ماسك".**
رابط تيسلا الذي استخدمته للتدريب وتلك الورقة البيضاء لاستعمار المريخ هي في النهاية قصة شخص آخر. صفحتك الشخصية يجب أن تكون بطاقتك باسمك الخاص في العالم الرقمي.

اذهب وضع تجربتك الأولى في مشروع حقيقي هناك.
اذهب وانشر أفكارك الفريدة حول موضوع تقني.
يمكنك حتى وضع قائمة كتبك المفضلة أو صورك الخاصة عليه.
أفكار ستُدفن على وسائل التواصل الاجتماعي يمكنها البقاء هنا بشكل دائم.
شغف لا يتسع له السيرة الذاتية يمكنه الانتشار بحرية هنا.

لا تترك هذه القطعة فارغة.
اذهب وجرّب. اذهب وكسّرها. اذهب وأعدها بناءً.
استمر في فعل ذلك حتى تنمو للشكل الذي يعجبك أكثر.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***اذهب الآن، ودع العالم يراك.***

# المراجع

CSDN: [درس عام 2025 الأحدث خطوة بخطوة لاستخدام GitHub لبناء صفحة شخصية](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [درس تحميل وتثبيت Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [درس تثبيت Ruby على ويندوز](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
