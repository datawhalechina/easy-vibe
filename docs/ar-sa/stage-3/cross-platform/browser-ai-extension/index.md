# كيفية بناء إضافة مساعد ذكاء اصطناعي للمتصفح: تلخيص أي صفحة ويب بنقرة واحدة

# الفصل 1: ما هي إضافات المتصفح وتطوير إضافات Chrome

في هذا البرنامج التعليمي، سنكمل حلقة مغلقة كاملة: بناء إضافة متصفح Chrome مدعومة بالذكاء الاصطناعي من الصفر. يمكنها قراءة محتوى أي صفحة ويب تتصفحها، ثم استخدام الذكاء الاصطناعي لتوليد ملخص بنقرة واحدة. ستكمل شخصيًا تطوير الإضافة وتصحيحها، وتتعلم كيفية نشرها على Chrome Web Store.

لهذا البرنامج التعليمي، يجب أن تمتلك على الأقل:

- متصفح Chrome (يُنصح بالنسخة 138+ إذا أردت استخدام الذكاء الاصطناعي المدمج)
- محرر كود (VS Code / Cursor / Trae)
- (اختياري) مفتاح OpenAI أو Claude API

## 1.1 ما هي إضافة المتصفح؟

لقد استخدمت بالتأكيد إضافات المتصفح من قبل: أدوات حظر الإعلانات، أدوات الترجمة، مديرات كلمات المرور... إنها مثل "أدوات إضافية" لمتصفحك، تمنحك قدرات خارقة أثناء تصفح الويب.

تخيل هذا: تفتح مقالاً تقنيًا من 5000 كلمة، تنقر على زر الإضافة مرة واحدة، وبعد بضع ثوانٍ يظهر ملخص موجز بالعربية في اللوحة الجانبية. هذا بالضبط ما سنقوم ببنائه.

![placeholder: صورة معاينة تعرض صفحة مقال طويلة على اليسار وملخص مولد بالذكاء الاصطناعي معروض في اللوحة الجانبية لـ Chrome على اليمين](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png)

<!-- ![placeholder: صورة معاينة تعرض صفحة مقال طويلة على اليسار وملخص مولد بالذكاء الاصطناعي معروض في اللوحة الجانبية لـ Chrome على اليمين](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png) -->

## 1.2 البنية الأساسية لإضافة Chrome

تتكون إضافات Chrome (المبنية على Manifest V3) من عدة أجزاء أساسية، لكل منها دوره:

* **ملف البيان (`manifest.json`)**: "بطاقة الهوية" للإضافة، يعلن اسمها وصلاحياتها وملفات الدخول والمزيد.
* **Service Worker (سكريبت الخلفية)**: "عقل" الإضافة، يعالج الأحداث ويستدعي APIs في الخلفية. لا يعمل باستمرار، بل يبدأ عند الحاجة.
* **Content Script**: "عيون" الإضافة، يُحقن في صفحات الويب ويمكنه قراءة محتوى DOM.
* **اللوحة الجانبية (Side Panel)**: "وجه" الإضافة، يعرض واجهة المستخدم على الجانب الأيمن من المتصفح حيث يرى المستخدمون نتائج ملخص الذكاء الاصطناعي.
* **صفحة الإعدادات (Options Page)**: تتيح للمستخدمين تهيئة مفتاح API والإعدادات ذات الصلة.

سير عملهم يبدو هكذا:

```text
المستخدم ينقر على أيقونة الإضافة
    -> تفتح اللوحة الجانبية
    -> المستخدم ينقر على زر "تلخيص"
    -> اللوحة الجانبية تخطر Service Worker
    -> Service Worker يطلب من Content Script قراءة نص الصفحة
    -> Content Script يعيد محتوى الصفحة
    -> Service Worker يرسل المحتوى لـ AI API
    -> الذكاء الاصطناعي يعيد الملخص
    -> Service Worker يرسل الملخص للوحة الجانبية للعرض
```

![placeholder: مخطط تدفق البنية يعرض كيف يتبادل Content Script و Service Worker و Side Panel الرسائل بينهم](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png)
<!-- ![placeholder: مخطط تدفق البنية يعرض كيف يتبادل Content Script و Service Worker و Side Panel الرسائل بينهم](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png) -->

## 1.3 خياران للذكاء الاصطناعي: API السحابي مقابل الذكاء الاصطناعي المدمج في المتصفح

لإضافتنا طريقتان للوصول لقدرة الذكاء الاصطناعي:

**الخيار أ: استدعاء APIs ذكاء اصطناعي سحابية (OpenAI / Claude)**

* المزايا: قدرة نموذج قوية، يدعم جميع الأجهزة
* العيوب: يحتاج مفتاح API، يتطلب إنترنت، له تكلفة استخدام
* الأفضل لـ: ملخصات عالية الجودة ومعالجة المحتوى الأكثر تعقيدًا

**الخيار ب: استخدام الذكاء الاصطناعي المدمج في Chrome (Summarizer API)**

بدءًا من Chrome 138، دمجت Google قدرة الذكاء الاصطناعي المبنية على Gemini Nano مباشرة في المتصفح. واحدة منها هي **Summarizer API** - تعمل محليًا بالكامل، لا تحتاج مفتاح API، لا إنترنت، ومجانية تمامًا.

* المزايا: مجانية، صديقة للخصوصية، لا تحتاج مفتاح API
* العيوب: تتطلب Chrome 138+، أجهزة أفضل (4 جيجابايت+ VRAM أو 16 جيجابايت+ RAM)، قدرة النموذج أضعف من الذكاء الاصطناعي السحابي
* الأفضل لـ: المستخدمين الذين يهتمون بالخصوصية، لا يريدون الدفع، ولديهم أجهزة كافية

**هذا البرنامج التعليمي سي نفذ كلا الخيارين**، ويمكنك الاختيار بناءً على وضعك.

## 1.4 خارطة طريق البرنامج التعليمي

سنبني إضافة Chrome اسمها **"AI Page Summarizer"** من الصفر، باتباع هذه الخطوات:

1. **بناء هيكل الإضافة**: إنشاء هيكل مشروع Manifest V3 وتحميله في Chrome
2. **تنفيذ الميزة الأساسية**: Content Script يقرأ الصفحة + Service Worker يستدعي AI API + اللوحة الجانبية تعرض النتائج
3. **دمج الذكاء الاصطناعي المدمج في Chrome**: استخدام Summarizer API لتوفير تلخيص محلي مجاني
4. **الاختبار والتصحيح**: تعلم تقنيات تصحيح إضافات Chrome
5. **النشر على Chrome Web Store**: تعبئة الإضافة وإرسالها للمراجعة

# الفصل 2: بناء هيكل الإضافة

## 2.1 إنشاء هيكل المشروع

افتح مساعد البرمجة بالذكاء الاصطناعي (Cursor / Trae / Claude Code)، أنشئ مجلدًا فارغًا اسمه `ai-page-summarizer`، ثم أدخل ما يلي في صندوق الدردشة:

```text
Please help me create a Chrome browser extension project using Manifest V3.
The project name is ai-page-summarizer, and its function is to summarize webpage content with AI.
Please create the following file structure:

ai-page-summarizer/
├── manifest.json          # ملف بيان MV3
├── background.js          # Service Worker سكريبت الخلفية
├── content.js             # Content script (يقرأ نص صفحة الويب)
├── sidepanel.html         # HTML اللوحة الجانبية
├── sidepanel.js           # منطق اللوحة الجانبية
├── sidepanel.css          # تنسيق اللوحة الجانبية
├── options.html           # صفحة الإعدادات
├── options.js             # منطق صفحة الإعدادات
└── icons/                 # مجلد الأيقونات

Requirements for manifest.json:
1. manifest_version: 3
2. Permissions: storage, activeTab, scripting, sidePanel
3. Use service_worker: "background.js" for background
4. Configure side_panel with default path sidepanel.html
5. Configure default icon and title for action
```

سيولد الذكاء الاصطناعي هيكل المشروع الكامل لك. لننظر ماذا يفعل كل ملف.

## 2.2 `manifest.json`: "بطاقة الهوية" للإضافة

هذا هو أهم ملف في إضافة Chrome. يخبر المتصفح ما هي الإضافة، ما الصلاحيات التي تحتاجها، وأي المكونات تحتويها:

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Use AI to summarize any webpage in one click",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Page Summarizer",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

**شرح الصلاحيات:**

* `storage`: يتيح للإضافة تخزين البيانات مثل مفتاح API للمستخدم
* `activeTab`: يتيح للإضافة الوصول للتبويب الحالي الذي يشاهده المستخدم (فقط بعد تفاعل المستخدم، لذا هو آمن جدًا)
* `scripting`: يتيح للإضافة حقن سكريبتات في الصفحات لقراءة المحتوى
* `sidePanel`: يتيح للإضافة استخدام واجهة برمجة تطبيقات اللوحة الجانبية في Chrome

![placeholder: لقطة شاشة لملف manifest.json في المحرر](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![placeholder: لقطة شاشة لملف manifest.json في المحرر](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 إعداد الأيقونات

تحتاج إضافات Chrome أيقونات بثلاثة أحجام: 16x16 و 48x48 و 128x128. يمكنك طلب من الذكاء الاصطناعي توليدها:

```text
Please help me generate three simple Chrome extension icons (16x16, 48x48, 128x128),
with a rounded rectangle, gradient purple background, and a white AI lightning symbol in the center.
Save them in the icons/ directory as icon-16.png, icon-48.png, and icon-128.png.
```

## 2.4 تحميل الإضافة في Chrome

قبل كتابة الكود، لنحمل أولاً إضافة "القشرة الفارغة" هذه في Chrome، حتى يمكن معاينة كل تغيير لاحق فورًا:

1. افتح Chrome وأدخل `chrome://extensions/` في شريط العنوان
2. فعّل **Developer mode** في الزاوية العلوية اليمنى
3. انقر **Load unpacked**
4. حدد مجلد `ai-page-summarizer` الخاص بك

ستظهر الإضافة في القائمة، وستظهر أيقونتها في شريط أدوات Chrome.

![placeholder: لقطة شاشة لصفحة إضافات Chrome تعرض كيفية تفعيل وضع المطور وتحميل إضافة](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![placeholder: لقطة شاشة لصفحة إضافات Chrome تعرض كيفية تفعيل وضع المطور وتحميل إضافة](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **نصيحة**: بعد كل تغيير في الكود، عد إلى `chrome://extensions/` وانقر **زر التحديث** على بطاقة الإضافة لتحديثها.

# الفصل 3: تنفيذ الميزة الأساسية - قراءة الصفحة + ملخص الذكاء الاصطناعي

## 3.1 Content Script: قراءة نص الصفحة

Content Script هو سكريبت يُحقن في صفحة الويب. يمكنه الوصول مباشرة إلى DOM الصفحة. نستخدمه لاستخراج نص الصفحة.

اطلب من الذكاء الاصطناعي كتابة `content.js`:

```text
Please help me write content.js with the following functions:
1. Listen for messages from Service Worker
2. When receiving a "getPageContent" message, extract the current page text content
3. Extraction logic: get document.body.innerText, and also get the page title and URL
4. Return the extracted content via sendResponse
```

سيولد الذكاء الاصطناعي كودًا مثل هذا:

```javascript
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const content = document.body.innerText || document.body.textContent
    sendResponse({
      content: content.trim(),
      title: document.title,
      url: window.location.href
    })
  }
  return true // أبقي قناة الرسائل مفتوحة
})
```

## 3.2 Service Worker: استدعاء AI API

Service Worker هو "عقل" الإضافة. ينسق الاتصال بين المكونات ويستدعي APIs ذكاء اصطناعي خارجية.

اطلب من الذكاء الاصطناعي كتابة `background.js`:

```text
Please help me write background.js with the following functions:
1. When the user clicks the extension icon, open the side panel
2. Listen for "summarize" messages from the side panel
3. After receiving the message, send "getPageContent" to the content script in the current tab to get page content
4. After receiving the page content, read the user's configured API Key and model selection from chrome.storage.local
5. Call the corresponding AI API according to the configuration (support OpenAI and Claude)
6. Send the AI summary back to the side panel

For OpenAI, call https://api.openai.com/v1/chat/completions and use model gpt-4o-mini
For Claude, call https://api.anthropic.com/v1/messages and use model claude-sonnet-4-20250514
System prompt: Please summarize the following webpage content in Chinese, extract the key points, and keep it within 300 Chinese characters.
```

الكود الأساسي يبدو هكذا:

```javascript
// background.js

// فتح اللوحة الجانبية عندما ينقر المستخدم على الأيقونة
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// الاستماع للرسائل من اللوحة الجانبية
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // استجابة غير متزامنة
  }
})

async function handleSummarize(tabId) {
  // 1. الحصول على محتوى الصفحة
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. قراءة إعدادات المستخدم
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Please configure your API Key in the settings page first' }
  }

  // 3. استدعاء AI API
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![placeholder: لقطة شاشة لكود background.js في المحرر](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 واجهة اللوحة الجانبية: عرض نتيجة الملخص

اللوحة الجانبية هي واجهة التفاعل الرئيسية للمستخدمين. اطلب من الذكاء الاصطناعي كتابة HTML و CSS و JS للوحة الجانبية:

```text
Please help me write these three files for the side panel:

sidepanel.html:
- Show the plugin name "AI Page Summarizer" at the top
- A blue "Summarize Current Page" button
- A loading animation area (hidden by default)
- A result display area showing the page title and AI summary
- A "Copy Summary" button at the bottom

sidepanel.css:
- Clean modern design, similar to Notion typography
- Width adapts to the side panel
- Buttons have hover effects
- Loading animation implemented with CSS

sidepanel.js:
- When clicking the "Summarize" button, get the current tab ID
- Send a summarize message to background.js
- Show loading animation
- Hide loading and display summary after receiving result
- Use navigator.clipboard.writeText in the "Copy" button to copy text
```

![placeholder: لقطة شاشة لواجهة اللوحة الجانبية تعرض ثلاث حالات: زر الملخص، حالة التحميل، ونتيجة الملخص](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![placeholder: لقطة شاشة لواجهة اللوحة الجانبية تعرض ثلاث حالات: زر الملخص، حالة التحميل، ونتيجة الملخص](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 صفحة الإعدادات: تهيئة مفتاح API

يحتاج المستخدمون مكانًا لإدخال مفتاح API الخاص بهم. اطلب من الذكاء الاصطناعي كتابة صفحة الإعدادات:

```text
Please help me write options.html and options.js:
- A dropdown to choose AI provider (OpenAI / Claude)
- A password input for API Key (type="password")
- A "Save" button
- Save config with chrome.storage.local.set
- Read saved config from storage and fill the form on page load
- Show "Settings saved" after saving
```

> **تذكير أمني**: مفتاح API مخزن في `chrome.storage.local` ويبقى على الجهاز المحلي فقط. لكن إذا أردت نشر هذه الإضافة على Chrome Web Store ليستخدمها الآخرون، فإن النهج الأكثر أمانًا هو بناء خادم وكيل خلفي حتى لا يُكشف مفتاح API مباشرة على جانب العميل.

![placeholder: لقطة شاشة لصفحة الإعدادات تعرض اختيار مزود الخدمة وإدخال مفتاح API p1](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![placeholder: لقطة شاشة لصفحة الإعدادات تعرض اختيار مزود الخدمة وإدخال مفتاح API p2](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![placeholder: لقطة شاشة لصفحة الإعدادات تعرض اختيار مزود الخدمة وإدخال مفتاح API p3](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![placeholder: لقطة شاشة لصفحة الإعدادات تعرض اختيار مزود الخدمة وإدخال مفتاح API](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# الفصل 4: استخدام الذكاء الاصطناعي المدمج في Chrome (لا حاجة لمفتاح API)

بدءًا من Chrome 138، دمجت Google قدرة الذكاء الاصطناعي المبنية على **Gemini Nano** مباشرة في المتصفح. الأنسب لحالتنا هو **Summarizer API** - يعمل محليًا بالكامل، لا يحتاج مفتاح API، لا يحتاج إنترنت، ومجاني.

## 4.1 التحقق من دعم المتصفح

الذكاء الاصطناعي المدمج له متطلبات أجهزة:

* Chrome سطح المكتب 138+ (Windows 10+، macOS 13+، Linux، ChromeOS)
* 22 جيجابايت مساحة تخزين متاحة (لتنزيل النموذج)
* 4 جيجابايت+ GPU VRAM، أو 16 جيجابايت+ RAM للنظام مع 4+ أنوية CPU

أدخل `chrome://flags` في شريط عناوين Chrome، ابحث عن المفتاح المتعلق بـ Summarization، وتأكد أنه **Enabled**.
* في Chrome 131-137، كان هذا المفتاح يسمى Summarization API.
* في Chrome 138-144، أُعيدت تسميته إلى Summarization API for Gemini Nano.
* في Chrome 145+، أُزيل Summarization API for Gemini Nano، ودمجت وظيفة التلخيص في Prompt API for Gemini Nano.

![placeholder: لقطة شاشة لـ chrome://flags تعرض مفتاح Summarization API](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![placeholder: لقطة شاشة لـ chrome://flags تعرض مفتاح Summarization API](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 استخدام Summarizer API

اطلب من الذكاء الاصطناعي إضافة دعم الذكاء الاصطناعي المدمج في `background.js`:

```text
Please help me add Chrome built-in Summarizer API support in background.js:
1. Add a summarizeWithBuiltinAI function
2. First check whether Summarizer.availability() returns 'readily-available'
3. If available, create a summarizer instance, configure type as 'key-points', format as 'markdown', and length as 'medium'
4. Call summarizer.summarize() to summarize
5. In handleSummarize, add a branch for provider === 'builtin'
```

الكود الأساسي:

```javascript
async function summarizeWithBuiltinAI(text) {
  // التحقق من التوفر
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('Chrome built-in AI is not available. Please check browser version and hardware requirements.')
  }

  // إنشاء أداة التلخيص
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // تشغيل التلخيص
  const summary = await summarizer.summarize(text, {
    context: 'This is a webpage article'
  })

  return summary
}
```

## 4.3 تحديث صفحة الإعدادات

أضف خيار **"Chrome Built-in AI (مجاني، لا حاجة لمفتاح API)"** للقائمة المنسدلة لمزود الخدمة في `options.html`. عندما يختار المستخدمون هذا الخيار، أخفِ حقل إدخال مفتاح API لأنه لم يعد مطلوبًا.

```text
Please help me modify options.html and options.js:
1. Add an option "Chrome built-in AI (free, no API Key needed)" to the provider dropdown, with value "builtin"
2. Hide the API Key input when builtin is selected
3. Show the API Key input when OpenAI or Claude is selected
```

![placeholder: لقطة شاشة لصفحة الإعدادات المحدثة تعرض ثلاثة خيارات لمزود الذكاء الاصطناعي، مع إخفاء حقل إدخال مفتاح API عند اختيار الذكاء الاصطناعي المدمج في Chrome](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![placeholder: لقطة شاشة لصفحة الإعدادات المحدثة تعرض ثلاثة خيارات لمزود الذكاء الاصطناعي، مع إخفاء حقل إدخال مفتاح API عند اختيار الذكاء الاصطناعي المدمج في Chrome](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# الفصل 5: الاختبار والتصحيح

## 5.1 سير عمل الاختبار المحلي

تصحيح إضافات Chrome يختلف قليلاً عن تصحيح صفحات الويب العادية:

**تصحيح Service Worker:**
1. افتح `chrome://extensions/`
2. ابحث عن إضافتك وانقر على رابط **Service Worker**
3. تفتح نافذة DevTools مخصصة حيث يمكنك رؤية مخرجات `console.log` وطلبات الشبكة

**تصحيح اللوحة الجانبية:**
1. افتح اللوحة الجانبية
2. انقر بزر الماوس الأيمن داخل محتوى اللوحة الجانبية
3. اختر **Inspect**
4. هذا يفتح DevTools للوحة الجانبية

**تصحيح Content Script:**
1. افتح DevTools بـ F12 على أي صفحة ويب
2. في لوحة Console، انقر على القائمة المنسدلة لسياق التنفيذ في الزاوية العلوية اليسرى
3. حدد اسم إضافتك
4. عندها يمكنك رؤية مخرجات `console` من Content Script

![placeholder: لقطة شاشة لـ Chrome DevTools تعرض كيفية اختيار سياقات تنفيذ مختلفة لتصحيح مكونات إضافة مختلفة](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png)
<!-- ![placeholder: لقطة شاشة لـ Chrome DevTools تعرض كيفية اختيار سياقات تنفيذ مختلفة لتصحيح مكونات إضافة مختلفة](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png) -->

## 5.2 استكشاف الأخطاء الشائعة وإصلاحها

| المشكلة | السبب المحتمل | الحل |
|------|---------|---------|
| النقر على الأيقونة لا يفعل شيئًا | خطأ في Service Worker | تحقق من وحدة تحكم Service Worker DevTools |
| لا يمكن الحصول على محتوى الصفحة | لم يُحقن Content Script | حدّث الصفحة وحاول مرة أخرى، تحقق من إعداد `matches` في manifest |
| فشل استدعاء API | مفتاح API خاطئ أو منتهي الصلاحية | أعد إدخال مفتاح API في صفحة الإعدادات |
| اللوحة الجانبية فارغة | مسار `sidepanel.html` خاطئ | تحقق من `side_panel.default_path` في manifest |


# الفصل 6: النشر على Chrome Web Store (اختياري)

إذا أردت مشاركة الإضافة مع الآخرين، يمكنك نشرها على Chrome Web Store.

## 6.1 الإعداد للنشر

1. **تسجيل حساب مطور**: زر [لوحة تحكم مطوري Chrome Web Store](https://chrome.google.com/webstore/devconsole) وادفع رسوم التسجيل لمرة واحدة بقيمة $5
2. **تفعيل التحقق بخطوتين**: يجب تفعيل التحقق بخطوتين لحساب Google الخاص بك قبل النشر
3. **إعداد الأصول**:
   * أيقونة الإضافة: PNG بحجم 128x128
   * لقطة شاشة واحدة على الأقل: يُنصح بحجم 1280x800
   * وصف وظيفي مفصل
   * شرح سياسة الخصوصية (إذا كانت إضافتك تعالج بيانات المستخدم)

## 6.2 التعبئة والرفع

1. اضغط مجلد الإضافة كملف `.zip` (وليس `.crx`)
2. انقر **New Item** في لوحة تحكم المطورين
3. ارفع ملف `.zip`
4. املأ معلومات المتجر (الاسم، الوصف، لقطات الشاشة، الفئة، إلخ)
5. املأ ممارسات الخصوصية (أعلن عن بيانات المستخدم التي تجمعها إضافتك)
6. انقر **Submit for Review**

ستراجع Google الإضافات المُقدمة، مما يستغرق عادةً عدة أيام عمل. كلما طلبت صلاحيات أقل وكان وصفك أوضح، كان المراجعة أسرع عادةً.

![placeholder: لقطة شاشة للوحة تحكم مطوري Chrome Web Store تعرض رفع الإضافة ونموذج البيانات الوصفية](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![placeholder: لقطة شاشة للوحة تحكم مطوري Chrome Web Store تعرض رفع الإضافة ونموذج البيانات الوصفية p2](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![placeholder: لقطة شاشة للوحة تحكم مطوري Chrome Web Store تعرض رفع الإضافة ونموذج البيانات الوصفية](../../../../zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# الفصل 7: ملاحظات ختامية

تهانينا! لقد بنيت إضافة متصفح مدعومة بالذكاء الاصطناعي من الصفر. لنراجع ما فعلناه:

1. فهمنا بنية Manifest V3 لإضافات Chrome
2. استخدمنا Content Script لقراءة محتوى صفحات الويب
3. استخدمنا Service Worker لاستدعاء APIs الذكاء الاصطناعي وتوليد الملخصات
4. استخدمنا Side Panel لعرض نتيجة الملخص
5. تعلمنا أيضًا كيفية استخدام الذكاء الاصطناعي المدمج في Chrome بدون أي مفتاح API

تطوير إضافات المتصفح مجال مثير جدًا - فهو يتيح لك "تعزيز" أي صفحة ويب على الإنترنت. بالإضافة لتلخيص الصفحات، يمكنك بناء الكثير باستخدام بنية مشابهة:

**اتجاهات متقدمة:**

* **مساعد ترجمة**: ترجمة صفحات الويب الأجنبية للعربية بنقرة واحدة
* **تعليقات القراءة**: تمييز والتعليق على الصفحات، ثم الحفظ في السحابة
* **تتبع الأسعار**: مراقبة تغيرات الأسعار على صفحات التجارة الإلكترونية وإشعار المستخدمين
* **شارح الكود**: تحديد الكود على GitHub ودع الذكاء الاصطناعي يشرحه تلقائيًا

وصول الذكاء الاصطناعي المدمج في Chrome يخفض الحاجز أكثر - لا تحتاج حتى لمفتاح API لبناء إضافات مدعومة بالذكاء الاصطناعي. مع استمرار نمو قدرات الذكاء الاصطناعي في المتصفح، ستتسع مساحة الخيال في هذا المجال فقط.

***امنح متصفحك بعض القدرات الخارقة!***

# مراجع

* [وثائق إضافات Chrome الرسمية - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [نشر إضافة Chrome على Chrome Web Store](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [واجهة برمجة تطبيقات Chrome Side Panel](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [الذكاء الاصطناعي المدمج في Chrome - Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
* [الذكاء الاصطناعي المدمج في Chrome - Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
* [وثائق OpenAI API](https://platform.openai.com/docs/api-reference)
* [وثائق Anthropic Claude API](https://docs.anthropic.com/en/docs/)
* [وثائق Anthropic Claude API](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
