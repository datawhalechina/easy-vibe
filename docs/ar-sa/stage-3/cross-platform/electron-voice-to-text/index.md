# كيفية بناء تطبيق سطح مكتب Electron متعدد الأنظمة: تطبيق تحويل الكلام إلى نص

# الفصل 1: ما هو Electron وتطوير تطبيقات سطح المكتب

في هذا البرنامج التعليمي، سنكمل حلقة مغلقة كاملة: بناء تطبيق تحويل الكلام إلى نص من الصفر باستخدام Electron، دعم وضعي التعرف عبر API السحابي والنموذج المحلي، وأخيرًا تعبئته في تطبيق سطح مكتب حقيقي يمكن تثبيته وتشغيله على Windows و macOS و Linux.

لهذا البرنامج التعليمي، يجب أن تمتلك على الأقل:

- حاسوب (Windows أو Mac، يُنصح بـ Mac لأن النماذج المحلية تعمل بسرعة كبيرة على Apple Silicon)
- بيئة Node.js (النسخة 18.0 أو أحدث)
- مساعد البرمجة بالذكاء الاصطناعي الخاص بك (Cursor / Trae / Claude Code)
- (اختياري) مفتاح OpenAI API (إذا استخدمت الوضع السحابي)
- ميكروفون (ميكروفون الكمبيوتر المحمول المدمج جيد)

## 1.1 ما هو Electron؟

التطبيقات التي تستخدمها يوميًا، مثل **VS Code و Slack و Discord و Notion**، لها شيء مشترك: جميعها تطبيقات سطح مكتب مبنية بـ **Electron**.

Electron هو إطار عمل مفتوح المصدر يتيح لك استخدام **HTML + CSS + JavaScript** (نفس التقنيات المستخدمة في صفحات الويب) لبناء تطبيقات سطح مكتب تعمل على **Windows و macOS و Linux**. مبدأه بسيط: يعبئ Chromium و Node.js معًا، وصفحة الويب الخاصة بك تصبح تطبيق سطح مكتب مستقل.

**فهم بجملة واحدة**: Electron = "متصفح Chrome غير مرئي" + قدرات نظام Node.js.

<!-- ![placeholder: مخطط يعرض بنية Electron: Chromium (لعرض واجهة المستخدم) + Node.js (للوصول للنظام) = تطبيق سطح مكتب](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.png) -->

## 1.2 البنية الأساسية لـ Electron

يتكون تطبيق Electron من نوعين من العمليات. فهمهما هو مفتاح التطوير:

**العملية الرئيسية (Main Process)**

* "المدير العام" للتطبيق
* مسؤولة عن إنشاء النوافذ، وإدارة دورة حياة التطبيق، والوصول للقدرات الأصلية مثل نظام الملفات
* تعمل في بيئة Node.js ويمكنها استخدام جميع وحدات Node.js
* يوجد عملية رئيسية واحدة فقط لكل تطبيق

**عملية العرض (Renderer Process)**

* "الوجه الأمامي" للتطبيق
* أساسًا صفحة Chromium ويب مسؤولة عن عرض واجهة المستخدم
* كل نافذة تتوافق مع عملية عرض واحدة
* لأسباب أمنية، لا يمكن لعملية العرض الوصول مباشرة إلى واجهات برمجة تطبيقات Node.js

**سكريبت التحميل المسبق (Preload Script)**

* "الجسر" بين العملية الرئيسية وعملية العرض
* يستخدم `contextBridge` لكشف واجهات برمجة تطبيقات محددة بأمان لعملية العرض

يتواصلون عبر **IPC (الاتصال بين العمليات)**، مثل إجراء مكالمة هاتفية: عملية العرض تقول "أريد بدء التسجيل"، والعملية الرئيسية تتلقى هذا الطلب وتستدعي ميكروفون النظام.

<!-- ![placeholder: مخطط بنية عمليات Electron يعرض العملية الرئيسية وعملية العرض وسكريبت التحميل المسبق، بالإضافة إلى اتصال IPC بينهم](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.png) -->

## 1.3 ماذا سنبني؟

في هذا البرنامج التعليمي، سنبني تطبيق سطح مكتب **تحويل الكلام إلى نص**. وظائفه مباشرة:

1. انقر على زر "Start Recording"، يبدأ التطبيق في الاستماع إلى الميكروفون
2. بعد التحدث، انقر "Stop"، يرسل التطبيق الصوت للذكاء الاصطناعي للتعرف عليه
3. النص المُتعرف عليه يُعرض في واجهة المستخدم ويمكن نسخه بنقرة واحدة

**يتوفر وضعان للتعرف:**

| بُعد المقارنة | وضع API السحابي | وضع النموذج المحلي |
|---------|-------------|------------|
| الحل التمثيلي | OpenAI Whisper API | whisper.cpp |
| الإنترنت مطلوب | نعم | لا |
| سرعة التعرف | تعتمد على الشبكة | تعتمد على الأجهزة (سريع جدًا على Apple Silicon) |
| جودة التعرف على الصينية | ممتازة | ممتازة (نموذج large-v3) |
| التكلفة | $0.006/دقيقة | مجاني |
| حجم النموذج | لا تنزيل مطلوب | نموذج tiny 75 ميجابايت، نموذج large 3 جيجابايت |
| الأفضل لـ | البدء السريع، الاستخدام الخفيف | التركيز على الخصوصية، الاستخدام بدون إنترنت، الاستخدام المتكرر طويل الأمد |

<!-- ![placeholder: معاينة التطبيق تعرض واجهة تحويل الكلام إلى نص: زر التسجيل ورسم موجي متحرك في الأعلى، النص المُتعرف أدناه، ومفتاح تبديل الوضع في الزاوية العلوية اليمنى](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.png) -->

## 1.4 ملاحظة مهمة: Web Speech API غير متاحة في Electron

إذا بحثت عن "Electron speech recognition"، ربما رأيت توصيات لاستخدام `Web Speech API` المدمج في المتصفح. **يرجى الملاحظة: هذا لا يعمل في Electron.**

أوقفت Google دعم واجهة برمجة تطبيقات الكلام لأغلفة المتصفحات غير Chrome/Edge. Electron مبني على Chromium، لكنه ليس Chrome نفسه، لذا سيفشل `window.SpeechRecognition` مباشرة.

هذا هو السبب في أننا نحتاج حلولًا مستقلة مثل OpenAI Whisper API أو whisper.cpp.

## 1.5 خارطة طريق البرنامج التعليمي

سنكمل التدفق الكامل بالخطوات التالية:

1. **إنشاء مشروع Electron**: استخدام Electron Forge لبناء المشروع وفهم الاتصال بين العمليات
2. **تنفيذ التسجيل**: التقاط إدخال الميكروفون في عملية العرض ومعالجة بيانات الصوت
3. **التعرف السحابي (الخيار أ)**: استخدام OpenAI Whisper API لتحويل الكلام إلى نص
4. **التعرف المحلي (الخيار ب)**: استخدام whisper.cpp محليًا بدون إنترنت
5. **التعبئة والتوزيع**: تعبئة التطبيق في برنامج سطح مكتب قابل للتثبيت

# الفصل 2: إنشاء مشروع Electron

## 2.1 تهيئة المشروع مع الذكاء الاصطناعي

افتح مساعد البرمجة بالذكاء الاصطناعي وأدخل هذا prompt:

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge هي أداة البناء الموصى بها رسميًا من Electron. تساعد في تهيئة المشروع والتعبئة والتوزيع ومهام الإعداد الشاقة الأخرى.

بعد الإنشاء، بنية المشروع تقريبًا:

```text
voice-to-text/
├── src/
│   ├── main.js            # نقطة دخول العملية الرئيسية
│   ├── preload.js         # سكريبت التحميل المسبق (الجسر)
│   ├── renderer.js        # نقطة دخول عملية العرض
│   └── index.html         # صفحة HTML للتطبيق
├── forge.config.js        # إعدادات Electron Forge
├── vite.main.config.mjs   # إعدادات Vite للعملية الرئيسية
├── vite.preload.config.mjs # إعدادات Vite لسكريبت التحميل المسبق
├── vite.renderer.config.mjs # إعدادات Vite لعملية العرض
└── package.json
```

## 2.2 البدء والمعاينة

اطلب من الذكاء الاصطناعي بدء خادم التطوير:

```
Please help me start the Electron development server by running npm start
```

بعد بضع ثوانٍ، تظهر نافذة سطح مكتب. هذا هو تطبيق Electron الخاص بك. حتى لو كانت تعرض فقط صفحة ترحيب افتراضية الآن، إنها بالفعل برنامج سطح مكتب حقيقي.

<!-- ![placeholder: لقطة شاشة لأول تشغيل لتطبيق Electron مع صفحة الترحيب الافتراضية](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 فهم IPC (الاتصال بين العمليات)

قبل تنفيذ ميزات الكلام، نحتاج فهم أهم مفهوم في Electron: **IPC (الاتصال بين العمليات)**.

لأن عملية العرض (واجهة المستخدم) والعملية الرئيسية (قدرات النظام) معزولتان، يجب عليهما استخدام "مكالمات هاتفية" IPC للتعاون:

```text
عملية العرض (واجهة المستخدم)                 العملية الرئيسية (النظام)
    │                                │
    │── "أريد بدء التسجيل" ──────────→   │
    │                                │── استدعاء الميكروفون
    │                                │── معالجة الصوت
    │   ←──── "إليك النتيجة" ─────────────│
    │                                │
    │── عرض النص في واجهة المستخدم           │
```

في الكود، هذا الاتصال يتم جسرته عبر `preload.js`:

```javascript
// preload.js - كشف واجهات برمجة التطبيقات بأمان لعملية العرض
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // العرض -> الرئيسية
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // الرئيسية -> العرض
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - العملية الرئيسية تستمع للرسائل
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // استدعاء Whisper API أو whisper.cpp هنا
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: مخطط تدفق IPC يعرض نقل الرسائل من العرض -> التحميل المسبق -> الرئيسية](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.png) -->

# الفصل 3: تنفيذ التسجيل

## 3.1 التقاط إدخال الميكروفون في عملية العرض

يوفر المتصفح (وهو عملية عرض Electron) `navigator.mediaDevices.getUserMedia` للوصول إلى الميكروفون. اطلب من الذكاء الاصطناعي المساعدة في تنفيذ التسجيل:

```
Please help me modify src/index.html and src/renderer.js to implement:

UI:
1. زر دائري كبير "Start Recording"، يتحول لزر أحمر "Stop Recording" عند النقر
2. عرض رسم متحرك نبضي بسيط أثناء التسجيل
3. منطقة عرض نص أسفل لنتائج التعرف
4. زران في الأسفل: "Copy Text" و "Clear"
5. أيقونة إعدادات في الزاوية العلوية اليمنى لتبديل وضع التعرف (سحابي/محلي)

منطق التسجيل (في renderer.js):
1. عند النقر على الزر، اطلب الوصول للميكروفون عبر navigator.mediaDevices.getUserMedia
2. استخدم MediaRecorder لتسجيل الصوت بتنسيق webm
3. بعد التوقف، حوّل Blob الصوتي إلى ArrayBuffer
4. أرسله للعملية الرئيسية عبر window.electronAPI.sendAudio
5. انتظر نتيجة التعرف من العملية الرئيسية واعرضها
```

كود التسجيل الأساسي:

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // إرسال للعملية الرئيسية للنسخ
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: لقطة شاشة لواجهة التسجيل مع زر حالة التسجيل الأحمر والرسم المتحرك النبضي، ومنطقة نتيجة النص أدناه](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.png) -->

## 3.2 معالجة أذونات الميكروفون

يحظر Electron طلبات الإذن افتراضيًا. نحتاج للسماح صراحةً بالوصول للميكروفون في العملية الرئيسية:

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// أضف إلى main.js
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **ملاحظة لمستخدمي macOS**: سيعرض macOS حوار إذن ميكروفون على مستوى النظام. هذا طبيعي. انقر "Allow."

# الفصل 4: الخيار أ - التعرف السحابي (OpenAI Whisper API)

هذا هو الخيار الأبسط. تحتاج فقط مفتاح API وبضعة أسطر من الكود.

## 4.1 الحصول على مفتاح OpenAI API

1. زر [منصة OpenAI](https://platform.openai.com/)، سجل، وسجل الدخول
2. اذهب لصفحة API Keys وانقر **"Create new secret key"**
3. انسخ المفتاح المُولّد (يبدأ بـ `sk-`) وخزنه بأمان

> **مرجع التكلفة**: تكلفة Whisper API **$0.006/دقيقة**. هذا يعني التعرف على ساعة واحدة من الصوت يكلف فقط $0.36، وهو ميسور التكلفة جدًا.

## 4.2 استدعاء Whisper API في العملية الرئيسية

اطلب من الذكاء الاصطناعي تنفيذ التعرف على الكلام في العملية الرئيسية:

```
Please help me implement OpenAI Whisper API in main.js:
1. Install node-fetch (if needed) or use built-in fetch in Node.js
2. Create transcribeWithWhisper function that accepts audio ArrayBuffer
3. Convert ArrayBuffer to Blob/File and build FormData
4. Call https://api.openai.com/v1/audio/transcriptions
5. Use model whisper-1 and set language to zh (Chinese)
6. Return the recognized text
7. Read API key from environment variables or config file
```

الكود الأساسي:

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'zh')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![placeholder: لقطة شاشة للتطبيق يعمل تعرض الكلام الصيني المُتعرف عليه الذي أرجعه Whisper API](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.png) -->

## 4.3 إضافة واجهة إعدادات

اطلب من الذكاء الاصطناعي إضافة لوحة إعدادات بسيطة في عملية العرض لإدخال مفتاح API وتبديل وضع التعرف:

```
Please help me add a settings panel in index.html:
1. Add a gear icon in the top-right corner; click to expand settings panel
2. The panel includes:
   - Recognition mode switch (Cloud API / Local model)
   - API Key input (only visible in cloud mode)
   - Language dropdown (Chinese / English / Auto detect)
3. Save settings to localStorage
4. Close panel when clicking outside
```

<!-- ![placeholder: لقطة شاشة للوحة الإعدادات الموسعة تعرض مفتاح تبديل الوضع وإدخال مفتاح API](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# الفصل 5: الخيار ب - التعرف المحلي (whisper.cpp)

إذا كنت لا تريد الاعتماد على APIs سحابية، أو تحتاج استخدام بدون إنترنت، whisper.cpp هو الخيار الأفضل. إنه نقل C++ لنموذج OpenAI Whisper ويعمل محليًا بالكامل بدون إنترنت.

## 5.1 تثبيت روابط whisper.cpp لـ Node.js

اطلب من الذكاء الاصطناعي التثبيت والإعداد:

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **دليل اختيار النموذج**:
> * `tiny` (75 ميجابايت): الأسرع، جيد للاختبار والاستخدام الخفيف، دقة متوسطة
> * `base` (142 ميجابايت): توازن بين السرعة والدقة
> * `small` (466 ميجابايت): جودة تعرف صينية أفضل بوضوح
> * `large-v3-turbo` (1.5 جيجابايت): موصى به؛ أسرع 5-8 مرات من large، مع دقة أقل بـ 1-2% فقط
> * `large-v3` (3 جيجابايت): أعلى دقة، لكن أبطأ ويحتاج أجهزة أفضل

## 5.2 دمج whisper.cpp في العملية الرئيسية

اطلب من الذكاء الاصطناعي تنفيذ التعرف المحلي:

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

الكود الأساسي:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // حفظ كملف مؤقت
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'zh',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // تنظيف الملف المؤقت
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: لقطة شاشة للتعرف بالنموذج المحلي يعمل بدون إنترنت مع إدخال كلام صيني](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 أخبار سارة لمستخدمي Apple Silicon

إذا كنت تستخدم Mac بمعالج M1/M2/M3/M4، يمكن لـ whisper.cpp استخدام **تسريع Metal GPU** و**Apple Neural Engine** تلقائيًا. يمكن أن يعمل التعرف **أسرع من الوقت الحقيقي**، مما يعني دقيقة واحدة من الصوت قد تستغرق بضع ثوانٍ فقط للمعالجة.

لمستخدمي NVIDIA GPU، يدعم whisper.cpp أيضًا **تسريع CUDA**، والذي يوفر أداءً قويًا أيضًا.

# الفصل 6: التعبئة والتوزيع

بعد اكتمال التطوير، نحتاج لتعبئة التطبيق في برامج مثبتة قابلة للتوزيع.

## 6.1 التعبئة مع Electron Forge

Electron Forge مضمّن بالفعل في مشروعنا، لذا التعبئة بسيطة:

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

هذا الأمر يُولّد تلقائيًا برامج مثبتة لنظام التشغيل الحالي:

* **macOS**: صورة مثبت `.dmg` وأرشيف `.zip`
* **Windows**: مثبت `.exe` (تنسيق Squirrel)
* **Linux**: حزم `.deb` (Debian/Ubuntu) و `.rpm` (Fedora)

مخرجات البناء في دليل `out/make/`.

<!-- ![placeholder: لقطة شاشة لملفات في دليل out/make تعرض برامج .dmg أو .exe المُولّدة](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 تحسين حجم التطبيق

"نقطة ألم" واحدة في تطبيقات Electron هي حجم الحزمة الكبير (لأن Chromium مضمّن). اقتراحات التحسين:

* تأكد أن الحزم في `dependencies` فقط هي المضمّنة، واحتفظ بتبعيات التطوير في `devDependencies`
* استخدم Vite tree-shaking لتقليل حجم JavaScript
* إذا كنت تستخدم نماذج محلية، فكر في تنزيل النماذج عند أول تشغيل بدلاً من تضمينها في المثبت

| الإعداد | الحجم المقدر |
|------|---------|
| تطبيق Electron نقي (بدون نموذج) | ~150-200 ميجابايت |
| + نموذج whisper tiny | ~250 ميجابايت |
| + نموذج whisper large-v3-turbo | ~1.7 جيجابايت |

## 6.3 ملاحظات متعددة الأنظمة

**macOS:**
* النشر إلى App Store أو التوزيع للآخرين يتطلب **توقيع الكود** (Apple Developer ID، $99/سنة)
* يتطلب أيضًا عملية **التصديق** من Apple
* أذونات الميكروفون يجب أن تعلن عن `NSMicrophoneUsageDescription` في `Info.plist`
* يُنصح ببناء Universal Binary لدعم كل من Intel و Apple Silicon

**Windows:**
* يُنصح بتوقيع الكود، وإلا سيعرض Windows SmartScreen تحذيرات أمنية
* يمكن للمستخدمين اختيار "Run anyway" للتطبيقات غير الموقعة

**Linux:**
* لا يطلب توقيع الكود
* يُنصح بتوفير كلا التنسيقين `.deb` و `.AppImage`

> **نصيحة**: للمشاريع الشخصية أو التوزيع على نطاق صغير، يمكنك تخطي توقيع الكود مؤقتًا ومشاركة الملفات المعبأة مع الأصدقاء مباشرة.

# الفصل 7: ملاحظات ختامية

تهانينا! لقد بنيت تطبيق تحويل الكلام إلى نص متعدد الأنظمة من الصفر. لنراجع ما فعلناه:

1. استخدمنا Electron Forge لبناء تطبيق سطح مكتب متعدد الأنظمة
2. فهمنا العملية الرئيسية وعملية العرض واتصال IPC
3. نفّذنا تسجيل الميكروفون والتقاط الصوت
4. دمجنا خياري تعرف على الكلام: Whisper API السحابي و whisper.cpp المحلي
5. تعلمنا كيفية تعبئة وتوزيع تطبيق Electron

ما يجعل Electron قويًا هو أنك تستطيع بناء تطبيقات سطح مكتب بمستوى VS Code أو Slack باستخدام تقنيات الويب. ومع نضج التعرف على الكلام بالذكاء الاصطناعي، ميزة مثل تحويل الكلام إلى نص، التي كانت تتطلب فريقًا متخصصًا، يمكن الآن بناؤها بواسطة شخص واحد.

**اتجاهات متقدمة:**

* **ترجمة فورية**: استخدام AudioWorklet للصوت المتدفق والاقتران مع واجهات برمجة تطبيقات التعرف المتدفقة للنسخ المباشر
* **مساعد الاجتماعات**: تسجيل الاجتماعات الكاملة، توليد نسخ مؤقتة تلقائيًا، وتلخيص النقاط الرئيسية بالذكاء الاصطناعي
* **الترجمة متعددة اللغات**: نسخ الكلام واستدعاء واجهات برمجة تطبيقات الترجمة لتحويل اللغة في الوقت الفعلي
* **دفتر ملاحظات صوتي**: الدمج مع قاعدة بيانات محلية (مثل SQLite) لبناء ملاحظات صوتية قابلة للبحث

***دع صوتك، ودع الكود يسجل كل شيء لك.***

# مراجع

* [وثائق Electron الرسمية](https://www.electronjs.org/docs/latest/)
* [وثائق Electron Forge الرسمية](https://www.electronforge.io/)
* [وثائق OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
* [مستودع whisper.cpp على GitHub](https://github.com/ggml-org/whisper.cpp)
* [حزمة nodejs-whisper على npm](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
