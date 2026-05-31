# كيف تبني تطبيق iOS - تطوير SwiftUI الأصلي

## الفصل 1: ما هو تطبيق iOS وما هو تطوير تطبيقات iOS

في هذا الدرس التعليمي، سنكمل حلقة مغلقة كاملة: **من فكرة في ذهنك إلى تطبيق iOS حقيقي يمكن تثبيته وتشغيله بنجاح على iPhone.**

لهذا الدرس، يجب أن تمتلك على الأقل:

1. جهاز Mac يعمل بنظام macOS حديث نسبيًا
2. جهاز iPhone يعمل بنظام iOS حديث نسبيًا، مع تفعيل وضع المطور
3. Xcode مثبت بنجاح
4. Trae مثبت ومفتوح
5. Apple ID قابل للاستخدام

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image1.png)

### 1.1 تطبيق iOS

تطبيق iOS هو تطبيق أصلي يعمل على نظام تشغيل iPhone. يُطلق بسرعة، ويعمل بسلاسة، ويمكنه استخدام ميزات النظام بعمق مثل الإشعارات والكاميرا والتخزين المحلي.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image2.png)

### 1.2 تطوير تطبيقات iOS

في جوهره، بناء تطبيق iOS يتضمن فقط بضعة أشياء:

1. توضيح المشكلة التي يحلها تطبيقك
2. تصميم الواجهة التي يمكن للمستخدمين رؤيتها وتشغيلها
3. تحديد كيف يتصرف التطبيق تحت إجراءات مختلفة
4. بناء التطبيق بشكل صحيح وتثبيته على iPhone

### 1.3 الطرق الشائعة لبناء تطبيقات iOS

في التطوير الحقيقي، هناك أكثر من طريقة لبناء تطبيق iOS. لن نتعمق هنا، بل سنقدم فهمًا عامًا فقط.

الطريقة الأولى هي النهج الأصلي الرسمي من Apple: إنشاء مشروع في Xcode واستخدام Swift وSwiftUI لبناء الواجهة والمنطق.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image3.png)

الطريقة الثانية هي استخدام أُطر العمل المشتركة بين المنصات، مثل React Native وFlutter، وتكييف قاعدة كود واحدة لمنصات متعددة.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image4.png)

بناءً على الأساليب المذكورة أعلاه، يختار هذا الدرس: **تطوير SwiftUI الأصلي كأساس، مع أدوات الذكاء الاصطناعي التي تقوم بمعظم عمل البرمجة**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image5.png)

### 1.4 خطوات تطوير تطبيقات iOS التي يغطيها هذا الدرس (معاينة عامة)

التطبيق النموذجي المستخدم في هذا الدرس هو **FridgeChef**.

يُدخل المستخدم المكونات المتاحة حاليًا في الثلاجة، ويستخدم التطبيق واجهة برمجة تطبيقات ذكاء اصطناعي حقيقية لتوليد وصفة ممكنة، ثم يحفظ النتيجة محليًا لمراجعتها لاحقًا. يغطي هذا المثال بالكامل الأجزاء الأساسية لتطبيق iOS حقيقي، بما في ذلك إدخال وعرض واجهة المستخدم وطلبات الشبكة وتحليل البيانات والتخزين المحلي والتثبيت النهائي والتشغيل على جهاز حقيقي.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image6.png)

- الفكرة العامة من النموذج الأولي إلى التطبيق الأصلي

في التنفيذ، يتبنى هذا الدرس نهجًا مرحليًا. سنستخدم أولاً الذكاء الاصطناعي لإنشاء نموذج أولي للواجهة بسرعة باستخدام HTML وCSS، وتأكيد هيكل التخطيط والتسلسل الهرمي للمعلومات في المتصفح، ثم ترحيله إلى SwiftUI.

- معاينة تدفق التطوير العام

بشكل عام، ستمر الفصول التالية بهذه المراحل بالترتيب:

1. بناء الفهم الأساسي
   فهم شكل تطبيق iOS وطرق التطوير الشائعة والمشكلة التي يحلها هذا التطبيق النموذجي.
2. إكمال إعداد البيئة
   تحضير Mac وiPhone وتحديث الأنظمة وتثبيت Xcode وTrae وإنشاء مشروع iOS أساسي يعمل بنجاح في المحاكي.
3. الدخول في التطوير الفعلي
   فتح المشروع في Trae وتوليد واجهة المستخدم والتفاعل الأساسي تدريجيًا من خلال المحادثة مع الذكاء الاصطناعي، وتحويل التطبيق من هيكل فارغ إلى شيء قابل للاستخدام.
4. التصحيح والتنظيم
   عندما تظهر أخطاء التجميع أو لا يتطابق السلوك مع التوقعات، دع الذكاء الاصطناعي يساعد في استكشاف الأخطاء؛ عندما يصبح الهيكل فوضويًا، استخدم الذكاء الاصطناعي لإعادة الهيكلة والتبسيط.
5. التشغيل على جهاز حقيقي
   تكوين التوقيع وتثبيت التطبيق على iPhone حقيقي وإكمال تحقق كامل من الكود إلى الأجهزة.

## الفصل 2: تحضير بيئة التطوير

### 2.1 الأجهزة والأنظمة المطلوبة

في هذه الممارسة، هناك قطعتان من الأجهزة لا يمكن استبدالهما: Mac وiPhone.
في نفس الوقت، يجب أن يعمل كلا الجهازين بـ **إصدار نظام رسمي حديث نسبيًا**.

#### 2.1.1 Mac

يمكن تطوير وتجميع تطبيقات iOS فقط على macOS. هذا متطلب صارم لمنصة Apple.

لضمان تثبيت Xcode واستخدامه بشكل طبيعي، يُوصى بتحديث macOS إلى إصدار رسمي حديث نسبيًا أولاً. يمكنك التحقق والتحديث من **إعدادات النظام -> عام -> تحديث البرنامج**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 جهاز iPhone حقيقي

بالإضافة إلى Mac، يتطلب هذا الدرس أيضًا جهاز iPhone حقيقي للتحقق مما إذا كان يمكن تثبيت التطبيق وإطلاقه بشكل صحيح.

للحفاظ على سلاسة عملية التصحيح، يجب أن يعمل iPhone أيضًا بإصدار iOS حديث نسبيًا. يمكنك التحقق والتحديث من **الإعدادات -> عام -> تحديث البرنامج**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

لاحقًا في التطوير، سيتم توصيل iPhone بـ Mac عبر كابل لتصحيح الأخطاء على الجهاز الحقيقي.

#### 2.1.3 تفعيل وضع المطور على iPhone

لتثبيت وتشغيل تطبيقات التصحيح من Xcode على جهاز حقيقي، تحتاج إلى تفعيل وضع المطور على iPhone.

الخطوات:

1. افتح **الإعدادات**
2. ادخل إلى **الخصوصية والأمان**
3. مرر إلى الأسفل وابحث عن **وضع المطور**
4. قم بتفعيله، ثم أعد تشغيل الجهاز كما هو مطلوب
5. بعد إعادة التشغيل، ألغِ قفل الجهاز وأكد تفعيل وضع المطور

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

إذا لم يكن iPhone الخاص بك متصلاً مسبقًا بـ Xcode أو أدوات تطوير أخرى، فقد تجد أن **وضع المطور** لا يظهر تحت **الخصوصية والأمان**. هذه ليست مشكلة في النظام - بل تعني ببساطة أن وضع المطور لم يُفعّل بعد.

في هذه الحالة، يمكنك جعله يظهر باتباع هذه الخطوات:

1. افتح **الإعدادات -> الخصوصية والأمان -> التحليلات والتحسينات**
2. قم بتفعيل **المشاركة مع مطوري التطبيقات**
3. ارجع مستوى واحدًا، ادخل إلى **الخصوصية والأمان** مرة أخرى، ومرر إلى الأسفل
4. يجب أن ترى الآن **وضع المطور**، ثم فعّله وأعد تشغيل الجهاز

بعد إكمال الخطوات المذكورة أعلاه، يحتاج وضع المطور إلى التفعيل مرة واحدة فقط. تصحيح الأخطاء المستقبلي على الجهاز الحقيقي باستخدام Xcode لن يتطلب تكرار هذا التكوين.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 البرامج المطلوبة

بعد تحضير الأجهزة والأنظمة، لا يزال يتعين عليك تثبيت البرامج المستخدمة في التطوير. يستخدم هذا الدرس فئتين فقط من الأدوات: أداة تطوير iOS الرسمية وأداة التطوير المساعدة بالذكاء الاصطناعي.

#### 2.2.1 Xcode

Xcode هو أداة التطوير الرسمية من Apple لنظام iOS. في هذا الدرس، يُستخدم بشكل أساسي لإنشاء مشاريع iOS وتجميع كود Swift / SwiftUI وتشغيل التطبيق على المحاكي أو جهاز حقيقي.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image11.png)

يمكن العثور على Xcode وتثبيته مباشرة من App Store. بعد التثبيت، عند فتحه لأول مرة، سترى شاشة الترحيب. إنشاء المشروع اللاحق يبدأ من هناك.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image12.png)

#### 2.2.2 Trae

Trae هو البيئة الرئيسية التي يتم فيها تنفيذ عمل التطوير في هذا الدرس. ستضع مشروع iOS بالكامل في Trae وتتعاون مع الذكاء الاصطناعي من خلال الحوار لإكمال التطوير.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image13.png)

### 2.3 Apple ID وملاحظات تصحيح التطوير

على منصة iOS، لكي يتم تثبيت التطبيق على جهاز حقيقي، يجب أن يمر عبر توقيع المطور. هذا الدرس لا يتطلب منك الدفع لعضوية Apple Developer Program. Apple ID شخصي كافٍ.

### 2.4 قائمة مراجعة قبل المتابعة

قبل الدخول في الفصل التالي، يمكنك مقارنة حالتك الحالية مع القائمة أدناه.

يجب أن تمتلك الآن بالفعل:

1. جهاز Mac يعمل بنظام macOS حديث نسبيًا
2. جهاز iPhone يعمل بنظام iOS حديث نسبيًا مع تفعيل وضع المطور
3. Xcode مثبت بنجاح
4. Trae مثبت ومفتوح
5. Apple ID قابل للاستخدام

إذا كان كل هذا جاهزًا، يمكنك المتابعة وإنشاء أول تطبيق iOS لك.

## الفصل 3: إنشاء أول مشروع iOS

### 3.1 استخدام Xcode لإنشاء مشروع جديد

افتح Xcode. على شاشة الترحيب، اختر إنشاء مشروع جديد.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image14.png)

انقر **Create new project** للدخول إلى شاشة اختيار قالب المشروع.

### 3.2 اختيار قالب التطبيق ومجموعة التقنيات

على شاشة اختيار القالب، استخدم التكوين التالي:

1. المنصة: iOS
2. نوع التطبيق: App

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image15.png)

انقر **Next** للدخول إلى شاشة تكوين معلومات المشروع.

### 3.3 تكوين معلومات المشروع

على شاشة معلومات المشروع، فقط املأ الإعدادات الأساسية:

1. اسم المنتج: اسم التطبيق (مثلاً `FridgeChef`)
2. الفريق: اختر Apple ID الشخصي الخاص بك
3. معرّف المؤسسة: تنسيق النطاق المعكوس (مثلاً `com.example`)
4. معرّف الحزمة: يُولد تلقائيًا، احتفظ بالافتراضي
5. نظام الاختبار: Swift Testing with XCTest UI Tests
6. التخزين: اختر Core Data (لحفظ سجل الوصفات لاحقًا)
7. اترك الخيارات الأخرى على الوضع الافتراضي

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image16.png)

انقر **Next** واختر موقع تخزين المشروع.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image17.png)

### 3.4 التعرف على هيكل المشروع بعد الإنشاء

بعد إنشاء المشروع، سيفتح Xcode مساحة العمل تلقائيًا. في هذه المرحلة، لا تحتاج إلى فهم كل ملف. تحتاج فقط إلى التعرف على بضعة أجزاء رئيسية.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image18.png)

في المشروع الافتراضي، سترى:

- مجلد باسم المشروع
- ملف Swift ينتهي بـ `App` (نقطة دخول التطبيق)
- ملف `ContentView.swift` (الصفحة الافتراضية)

هذا هو بالفعل أصغر تطبيق iOS قابل للتشغيل.

### 3.5 تشغيل أول تطبيق iOS

قبل تغيير أي كود، شغّل المشروع الأصلي مباشرة.

في شريط الأدوات العلوي لـ Xcode، احتفظ بمحاكي iPhone الافتراضي المحدد، ثم انقر زر **Run** في أعلى اليسار.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image19.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image20.png)

إذا كان كل شيء طبيعيًا، سيُظهر المحاكي تطبيقًا فارغًا يمكن أن يبدأ بنجاح. قد يستغرق التجميع الأول وقتًا طويلاً نسبيًا. في الفصول اللاحقة، نقدم وقت الانتظار باستخدام نماذج HTML الأولية أولاً.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image21.png)

لإيقاف التطبيق، انقر **Stop** بجانب زر Run.

### 3.6 ما أنجزته فعلًا في هذه المرحلة

على الرغم من أن الواجهة لا تزال بسيطة، فقد أكملت بالفعل عدة تأكيدات رئيسية:

1. يمكن تجميع المشروع بنجاح
2. يمكن للمحاكي تشغيل التطبيق بشكل صحيح
3. عملية التطوير أثبتت أنها تعمل من البداية إلى النهاية

هذا يعني أن المشاكل المستقبلية ستركز بشكل أساسي على **الكود والمنطق نفسهما**، وليس على مشاكل البيئة.

### 3.7 تسليم المشروع إلى Trae

بدءًا من القسم التالي، سينتقل عمل التطوير الرئيسي تدريجيًا إلى Trae.

ما تحتاج إلى فعله بسيط: **افتح مجلد مشروع iOS الذي أنشأته للتو في Trae.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image22.png)

## الفصل 4: ممارسة التطوير المساعد بالذكاء الاصطناعي - بناء FridgeChef من الصفر

هذا الفصل هو الجزء الأساسي من الدرس التعليمي بالكامل.

لا يستخدم هذا الدرس المسار التقليدي المتمثل في "كتابة SwiftUI أولاً، والتجميع المتكرر، والاستمرار في تعديل المعاينات." بدلاً من ذلك، نستخدم تدفقًا أكثر كفاءة:
**أولاً استخدم HTML للتحقق السريع من هيكل الواجهة، ثم ترحيل النتيجة المؤكدة إلى SwiftUI، وأخيرًا إكمال منطق الأعمال والبيانات المحلية وتفاصيل التفاعل تدريجيًا.**

### 4.1 المرحلة الأولى: توضيح المتطلبات

قبل كتابة الكود، الخطوة الأولى ليست بناء الصفحات - بل توضيح ماذا نبني. **دع الذكاء الاصطناعي يعمل أولاً كمدير منتج** وينظم المتطلبات في مستند مواصفات منظم.

في نافذة محادثة Trae، أدخل التعليمات التالية. سيُنشئ Trae ملف `REQUIREMENTS.md` في جذر المشروع، يصف وظائف وهيكل التطبيق بالكامل.

📋 **الموجه للنسخ:**

```text
We are now going to develop an iOS App called "FridgeChef".

1. Core concept
This is an AI assistant that solves the problem of "I don't know what to cook with the leftover ingredients in my fridge."
Users input the ingredients they currently have, and the app calls a large model to generate a practical recipe.

2. Core functions
- Home page:
  Show a prominent "Start Cooking" entry, and below it display historical recipe records in card or list form.
- Input page:
  Users input ingredients, supporting text input or simple quick tags.
- Result page:
  Display the AI-generated recipe, including dish name, ingredient list, and cooking steps.

3. Technical requirements
- Use SwiftUI
- Save data locally (Core Data)
- Support basic page navigation and state updates

Please help me organize this into a clear, structured REQUIREMENTS.md document from the perspective of a product manager, and save it in the project root.
```

بعد التوليد، اقرأ المستند بسرعة وتأكد مما إذا كانت نقاط الوظائف تتطابق مع توقعاتك.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23.png)

### 4.2 المرحلة الثانية: النموذج الأولي المرئي

دع الذكاء الاصطناعي يرسم بسرعة نموذج أولي عالي الدقة للواجهة باستخدام **HTML + CSS**، حتى نتمكن من تأكيد التخطيط والنمط العام أولاً. تابع بإدخال هذا في Trae:

📋 **الموجه للنسخ:**

```text
The requirements are confirmed.
Please use HTML + Tailwind CSS to generate a high-fidelity interface prototype for me.

Design style: Neo-Pop
Colors:
- Background: light cream #FFFDF5
- Accent colors: acid green #CCFF00, hot pink

Visual characteristics:
- 3px thick black borders
- Hard shadow without blur (offset 4px)
- Large rounded cards, overall sticker / comic feeling

Layout requirements:
- Home page should use a Bento Grid-like layout
- Include two screens: home page and input page

Please generate a single-file index.html and simulate an iPhone screen ratio around the content.
```

بعد التوليد، ابحث عن `index.html` في قائمة الملفات وافتحه مباشرة في المتصفح.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

في هذه المرحلة، النقطة ليست ما إذا كان كل تفصيل مثاليًا. النقطة هي ما إذا كان **هيكل الصفحة معقولًا، والعناصر الرئيسية مكتملة، والاتجاه العام صحيح.**

### 4.3 المرحلة الثالثة: إعادة الإنشاء الأصلي

بمجرد الانتهاء من النموذج الأولي HTML، **ترجم الواجهة المؤكدة إلى SwiftUI.**

الخطوات:

1. ارفع ملف `index.html` (أو لقطة شاشة من المتصفح) إلى Trae
2. أخبر الذكاء الاصطناعي بتوليد كود SwiftUI بناءً عليه

📋 **الموجه للنسخ:**

```text
[index.html uploaded]

Please read the layout and style of this HTML file.

Task: recreate this interface in the current project using SwiftUI.

Requirements:
1. Encapsulate a NeoPopStyle modifier including background color, thick border, and hard shadow
2. Create HomeView.swift for the home layout
3. Create InputView.swift for the input page
4. Use Mock Data for now, and make sure it can display correctly in Xcode Preview and simulator
```

بعد الانتهاء، افتح Xcode وشغّل المحاكي. سترى تطبيق iOS لديه بالفعل هيكل مرئي كامل.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 المرحلة الرابعة: توصيل واجهة برمجة تطبيقات الذكاء الاصطناعي

بمجرد الانتهاء من الواجهة، التطبيق لا يزال مجرد طبقة عرض. بعد ذلك نحتاج إلى توصيل قدرة ذكاء اصطناعي حقيقية. في هذا الدرس نستخدم خدمة النموذج الكبير التي توفرها **SiliconFlow**:
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow يوفر واجهة برمجة تطبيقات متوافقة مع مواصفات OpenAI API، لذلك من الملائم جدًا استدعاؤها من مشروع iOS باستخدام طلبات الشبكة القياسية.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

قبل البدء، تحتاج إلى تسجيل حساب على الموقع وإنشاء مفتاح API.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

سيُستخدم هذا المفتاح لاستدعاءات النموذج لاحقًا.

📋 **الموجه للنسخ:**

```text
Now we need to connect AI capability.

Please create APIService.swift.

Configuration:
- Base URL: https://api.siliconflow.cn/v1
- Model: Qwen/Qwen2.5-7B-Instruct
- API Key: define it as a variable for now, I will fill it later

Functions:
- Write a generateRecipe(ingredients: [String]) method
- The System Prompt must strictly require the model to return pure JSON only
- JSON fields should include: dishName, ingredients, steps

Also define a RecipeModel struct for parsing the returned data.
```

بعد توليد الكود، املأ مفتاحك الخاص داخل `APIService.swift`.

### 4.5 المرحلة الخامسة: التخزين المحلي Core Data

لجعل التطبيق يتذكر الوصفات التي أنشأها، نحتاج إلى جلب تخزين البيانات المحلي. هذه المرحلة مقسمة إلى خطوتين.

**الخطوة 1: تكوين Core Data يدويًا في Xcode**

1. افتح `FridgeChef.xcdatamodeld`
2. أنشئ كيانًا جديدًا باسم `RecipeEntity`

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. أضف السمات التالية:
   1. `id`: **UUID**
   2. `name`: **String**
   3. `cookTime`: **String**
   4. `difficulty`: **String**
   5. `desc`: **String**
   6. `timestamp`: **Date**
   7. `colorIndex`: **Integer 16**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**الخطوة 2: دع الذكاء الاصطناعي يكتب كود المنطق**

📋 **الموجه للنسخ:**

```text
I have finished configuring the Core Data Entity.

Entity: RecipeEntity
Attributes: id, name, difficulty, timestamp, colorindex, cookTime, desc

Please complete the following tasks:
1. Save data into Core Data after recipe generation succeeds
2. Use FetchRequest on the home page to read historical records and display them in reverse chronological order
3. When the database is empty, show a friendly empty-state message
```

### 4.6 المرحلة السادسة: إنشاء أيقونة التطبيق

الخطوة الأخيرة هي تحضير أيقونة مناسبة للتطبيق. هنا نستخدم **Lovart** لتوليد مورد الأيقونة: [https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

📋 **الموجه للنسخ إلى Lovart:**

```text
Subject: A cute anthropomorphic fridge character with a happy face
Style: Minimalistic App Icon, Neo-pop style, thick black outlines, vector art
Colors: Acid green (#CCFF00) and deep blue
Background: Solid cream color
Negative Prompt: Text, realistic details, 3D render, complex background
```

بعد التوليد، قص الصورة إلى 1024x1024 واسحبها إلى `Assets.xcassets` -> `AppIcon` في Xcode.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

شغّل التطبيق مرة أخرى، وسترى الآن تطبيق iOS حقيقي وكامل التعرف.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 المرحلة السابعة: ترقية التجربة المتقدمة

بمجرد استقرار الوظائف، إذا كنت تريد تحسين النمط المرئي بشكل أكبر، تحتاج فقط إلى وصف التأثير الذي تريده للذكاء الاصطناعي، ودعه يولد مقترح تصميم جديد، ثم ترحيل النتيجة المؤكدة إلى SwiftUI.

📋 موجه مرجعي:

```text
The app's functionality is already complete, but I want to try a more visually impactful UI style.
Please first generate a new design draft in HTML + Tailwind CSS for me, with the file name design_v2.html.

Design style: Neo-Pop (dopamine style)
Color requirements:
Use Deep Royal Blue as the full-screen background
Use Acid Green (#CCFF00) as the accent color

Visual feel:
All cards should use a 3px thick black border
Use a hard shadow without transparency blur, shifted down-right

Layout requirements:
Keep the home page structure unchanged
Use pill-shaped buttons and input boxes

Please generate the full code so I can preview it in a browser.
```

بعد التوليد، افتح ملف HTML هذا في المتصفح.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

بمجرد الانتهاء من نسخة HTML، يمكنك البدء في تعديل مشروع iOS.

📋 موجه مرجعي:

```text
[design_v2.html uploaded]
Please analyze the visual style of this HTML and migrate it into the current iOS project.

Task requirements:
Create a new NeoPopStyle.swift file
Encapsulate a neoPopBlue() style modifier

The modifier needs to include:
- rounded corners
- thick black border
- opaque hard shadow

Refactor HomeView:
- change the background to Deep Royal Blue
- use Acid Green for the primary button
- use white background for historical record cards
- make sure text remains clear and readable on the dark background

Please provide the full modified code.
```

انقر Run في Xcode مرة أخرى. إذا نجح كل شيء، يجب أن ترى:

- الوظائف هي نفسها تمامًا كما كانت من قبل
- النمط المرئي تغير بشكل كبير
- جودة التطبيق العام شعرت بترقية ملحوظة

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image38.png)

## الفصل 5: التشغيل والتصحيح ومعالجة الأخطاء

في الفصل السابق، أكملت الوظائف الأساسية وشغّلت التطبيق بنجاح في المحاكي.
لكن بالنسبة لتطبيق iOS، الاكتمال الحقيقي ليس مجرد "تجميع ناجح" - بل هو **التشغيل المستقر، ومعرفة كيفية التعامل مع المشاكل عندما تظهر**.

### 5.1 تشغيل التطبيق في Xcode

أولاً، تأكد من أن المشروع يمكنه العمل بشكل صحيح في Xcode.

في أعلى يسار Xcode، حدد جهاز التشغيل واحتفظ بمحاكي iPhone الافتراضي المحدد. انقر زر **Run** للتجميع والتشغيل. إذا كان كل شيء طبيعيًا، سيُطلق التطبيق في المحاكي ويعرض الواجهة المبنية في الفصل 4.

### 5.2 تشغيل التطبيق على جهاز حقيقي

قم بتوصيل iPhone بـ Mac باستخدام كابل.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image39.png)

عند التوصيل لأول مرة، سيُظهر الهاتف **Trust This Computer?** اضغط ثق به وأدخل رمز إلغاء القفل.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image40.png)

في قائمة أجهزة Xcode، حدد iPhone الخاص بك، ثم انقر **Run** مرة أخرى.

في هذه المرحلة، يجب أن تكون قادرًا على رؤية أيقونة **FridgeChef** على الشاشة الرئيسية لهاتفك، وفتحها واستخدامها بشكل طبيعي.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image41.png)

هذه الخطوة تمثل إكمال حلقة واحدة كاملة لتطوير iOS.

### 5.3 من أين تأتي أخطاء تطوير iOS عادةً

في التطوير الحقيقي، **مواجهة الأخطاء أمر طبيعي** وليس استثناءً.

المشاكل الشائعة تأتي عادةً من هذه الفئات:

1. **أخطاء التجميع**
   بناء Swift، عدم تطابق الأنواع، معاملات مفقودة، إلخ. سيُبرزها Xcode باللون الأحمر مباشرة.
2. **أخطاء وقت التشغيل**
   التطبيق يُجمع، لكنه يتعطل أثناء التنفيذ - مثلاً، تجاوز حدود المصفوفة أو فك تغليف قيمة nil بالقوة.
3. **أخطاء الصلاحيات أو التكوين**
   طلبات الشبكة محظورة من النظام، تكوين Info.plist مفقود، مشاكل التوقيع، إلخ.
4. **أخطاء المنطق**
   التطبيق لا يتعطل، لكن السلوك خاطئ - مثلاً، الأزرار لا تستجيب أو البيانات لا تتحدث.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image42.png)

عندما يظهر أي خطأ، تحتاج فقط إلى **نسخ رسالة الخطأ الكاملة كما هي بالضبط ولصقها في مربع محادثة Trae.** مع الوعي بسياق المشروع، يمكن لـ Trae مساعدتك في التصحيح.

### 5.4 أخطاء تصحيح الجهاز الحقيقي الشائعة وحلولها

أخطاء تصحيح الجهاز الحقيقي شائعة جدًا. هذه المشاكل عادة لا يسببها الكود نفسه، بل ثقة الجهاز أو قواعد الأمان أو تكوين التوقيع. إذا لم يتمكن التطبيق من العمل على iPhone بسلاسة، يمكنك مراجعة هذا القسم أولاً.

#### 1. مشاكل التوقيع والتسجيل

**الأعراض الشائعة:**

- Xcode يُظهر أخطاء حمراء مثل
  `"Communication with Apple failed"`
  أو
  `"No profiles for 'com.xxx.xxx' were found"`
- أو يقول
  `"Your team has no devices which are compatible"`

**السبب:**

- معرّف الحزمة ليس فريدًا أو صالحًا
- لم يتم تسجيل iPhone الحالي بعد تحت Apple ID الخاص بك للتطوير

**الحل:**

1. **تعديل معرّف الحزمة**
   في إعدادات مشروع Xcode، غيّر معرّف الحزمة إلى شيء أكثر تفردًا، مثل:
   `com.yourname.FridgeChef`
2. **دع Xcode يسجل الجهاز تلقائيًا**
   في موجه الخطأ، انقر `Try Again` أو `Register Device`، ودع Xcode يكمل تسجيل الجهاز وتكوين الشهادة تلقائيًا.

#### 2. مشاكل اقتران وتوصيل الجهاز

**الأعراض الشائعة:**

- Xcode يُظهر
  `"Device is not available because pairing is in progress"`
- أو يقول
  `"Device Locked"`
- أو ضغطت على Trust بالفعل، لكن Xcode لا يزال عالقًا

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image43.png)

**السبب:**

- iPhone لا يزال مقفلاً
- عملية الاقتران لم تكتمل بالكامل
- Xcode لم يُحدّث حالة الاتصال

**الحل:**

1. ألغِ قفل الهاتف
   تأكد من أن iPhone غير مقفل ويبقى على الشاشة الرئيسية.
2. أتمتة عملية الثقة
   عندما يظهر الهاتف **Trust This Computer?**، اضغط **Trust** و**أدخل رمز المرور**.
3. تحديث حالة الاتصال
   إذا لا يزال عالقًا، افصل الكابل وانتظر 2-3 ثوانٍ وأعد التوصيل. إذا لزم الأمر، أعد تشغيل Xcode وحاول مرة أخرى.

#### 3. التطبيق يُثبت لكن لا يمكن فتحه

**العرض الشائع:**

- أيقونة التطبيق تظهر بالفعل على الشاشة الرئيسية لـ iPhone
- النظام يُظهر
  **Untrusted Developer**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image44.png)

**السبب:**

هذه آلية أمان في iOS. تطبيقات التصحيح المثبتة باستخدام Apple ID شخصي تتطلب تفويض ثقة يدوي.

**الحل:**

1. افتح **الإعدادات**
2. ادخل إلى **عام**
3. اضغط على **VPN & Device Management**
4. تحت **Developer App**، ابحث عن Apple ID الخاص بك
5. اضغط **Trust**، ثم أكد مرة أخرى

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image45.png)

بعد ذلك، ارجع إلى الشاشة الرئيسية واضغط على التطبيق مرة أخرى. يجب أن يعمل بشكل طبيعي الآن.

## الفصل 6: إذا كنت تريد نشر التطبيق على App Store

في هذا الدرس، ما أكملناه بشكل أساسي هو الحلقة المغلقة الكاملة لـ **نسخة تطوير وتصحيح شخصية للتطبيق**: من إنشاء المشروع وتنفيذ الوظائف والتصحيح، وصولاً إلى التثبيت والاستخدام الناجح على جهاز حقيقي.

إذا كنت تريد المضي قدمًا ونشر التطبيق رسميًا على **Apple App Store** بحيث يمكن لجميع المستخدمين تنزيله واستخدامه، فستحتاج إلى الدخول في عملية إصدار أكثر رسمية. نظرًا لأن تلك العملية تتضمن حساب مطور مدفوع وقواعد المراجعة ومتطلبات الامتثال، وليست محور الممارسة الرئيسي لهذا الدرس، فإن المحتوى التالي يُقدم كـ **مرجع عام وخريطة طريق** فقط.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image46.png)

> المحتوى التالي يستند إلى متطلبات مراجعة Apple الرسمية ومناقشات التجربة العامة (بما في ذلك المشاركة الأصلية على Zhihu). الروابط مذكورة أدناه. إذا أصبح أي رابط غير متاح، يمكنك البحث بالعنوان أو الكلمة المفتاحية للعثور على المصدر الأصلي.

### 6.1 Apple Developer Program

لنشر تطبيق على App Store، يجب الانضمام إلى برنامج المطورين المدفوع من Apple:

- **Apple Developer Program** (99 دولارًا أمريكيًا سنويًا)
- الموقع الرسمي: [https://developer.apple.com/](https://developer.apple.com/)

بعد الانضمام، يمكنك استخدام **App Store Connect** لإنشاء إدخال التطبيق وإدارة الإصدارات والنشر الرسمي.

### 6.2 App Store Connect: إنشاء إدخال التطبيق

في App Store Connect، تحتاج إلى إنشاء سجل تطبيق كامل، يشمل على سبيل المثال لا الحصر:

1. اسم التطبيق ومعرّف الحزمة
2. الوصف والكلمات المفتاحية ورابط سياسة الخصوصية
3. أيقونة التطبيق ولقطات الشاشة ومواد المعاينة
4. التسعير وإعدادات منطقة التوزيع

يجب إكمال جميع هذه المعلومات قبل التقدم للمراجعة.

### 6.3 البناء والتقديم للمراجعة

بعد تحضير البيانات الوصفية، تحتاج إلى:

1. استخدام حساب المطور المدفوع في Xcode لتوقيع بناء Release
2. بناء ورفع النسخة الرسمية
3. التقديم للمراجعة في App Store Connect

بعد التقديم، يدخل التطبيق في قائمة مراجعة Apple. عادةً ما تستغرق المراجعة 1-3 أيام، حسب الحالة.

### 6.4 قواعد المراجعة وأسباب الرفض الشائعة

تراجع Apple التطبيقات بشكل أساسي من الجوانب التالية:

- الوظائف والاستقرار
- الخصوصية والامتثال للبيانات
- الاتساق بين البيانات الوصفية والوظائف الفعلية
- ما إذا كان هناك انتهاك أو سلوك مضلل

إذا لم يستوفِ التطبيق المتطلبات، ستُرفض المراجعة وستقدم Apple سببًا محددًا. يحتاج المطور بعد ذلك إلى تعديل التطبيق وإعادة التقديم.

### 6.5 ماذا تفعل بعد الرفض

إذا رُفض التطبيق، يمكنك:

- تعديل الكود أو الوصف وفقًا للملاحظات
- إعادة تقديم النسخة
- التواصل مع فريق المراجعة من خلال App Store Connect

هذا جزء شائع جدًا من عملية النشر ولا يعني أن المشروع قد فشل.

### مصادر مرجعية

المحتوى التالي يستند إلى وثائق Apple الرسمية ومشاركات التجربة العامة:

- App Store Review Guidelines (رسمي من Apple)
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- الدليل الرسمي للتقديم للمراجعة
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- دليل كامل مصور لنشر iOS App Store ومخاطر المراجعة (Zhihu)
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## الفصل 7: الخلاصة

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

تهانينا! في هذه المرحلة، مررت شخصيًا بعملية تطوير تطبيق iOS الكاملة من الصفر إلى الواحد. من إعداد البيئة وتشغيل المشروع، ثم الهبوط التدريجي للواجهة والوظائف والبيانات واختبار الجهاز الحقيقي، تم إكمال جميع المراحل الرئيسية بسلاسة. والأهم من ذلك، أنك لم تصل إلى هنا عن طريق حفظ بناء Swift - بل أسندت معظم التنفيذ إلى الذكاء الاصطناعي. بغض النظر عن خلفيتك، كل محاولة كهذه تجعلك أكثر طلاقة، وستدرك أن تطوير iOS ليس بالصعوبة التي كان عليها. حتى لو لم تستطع كتابة سطر كود واحد من قبل، يمكنك بناء تطبيقك الخاص.

بالنظر إلى الوراء، العملية برمها ليست معقدة فعلًا: قرر ماذا تريد بناء، استخدم HTML لاختبار الواجهة بسرعة، حوّلها إلى SwiftUI، وصّل واجهة برمجة التطبيقات والبيانات المحلية، ثم مر بجولة تصحيح. بناءً على ذلك، في المستقبل يمكنك أيضًا بناء منبه شخصي أو قائمة مهام بسيطة أو حتى روبوت محادثة يتحدث بنبرة شخصيتك المفضلة.

هذا هو بالضبط أهم شيء يريد هذا الدرس - وeasy-vibe - أن يعلمك إياه. أتطلع إلى أحدث إبداعاتكم جميعًا أيها أساتذة vibe coding المستقبليون، وإلى اليوم الذي أُبهر فيه بأعمالكم.
