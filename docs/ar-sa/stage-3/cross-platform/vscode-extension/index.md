# كيفية بناء إضافة لـ VS Code: أنشئ مساعد مشروعك الذكي

# الفصل 1: ما هو تطوير إضافات VS Code

في هذا الدرس، سنقوم بإكمال حلقة كاملة: بناء إضافة VS Code من الصفر تعمل كمساعد مشروعك الذكي، مع إنشاء قوالب المشاريع بنقرة واحدة، ومحادثة AI حول الملفات أو مقتطفات الكود المحددة، وتحليل أسئلة وأجوبة متعدد الملفات، واختصارات مخصصة. ستكمل التطوير والتصحيح وتتعلم كيفية النشر على VS Code Marketplace.

لهذا الدرس، يجب أن تمتلك على الأقل:

- بيئة Node.js (الإصدار 18.0+)
- محرر VS Code (الإصدار 1.90+)
- مساعد البرمجة الذكي الخاص بك (Cursor / Trae / Claude Code)
- (اختياري) اشتراك GitHub Copilot (للوصول إلى Language Model API)

> **Vibe Coding من البداية للنهاية**: سنستخدم مساعد البرمجة الذكي لتوليد معظم الكود. أنت فقط بحاجة لفهم المفاهيم الأساسية والبنية، ثم وصف المتطلبات باللغة الطبيعية.

## 1.1 ماذا يمكن أن تفعل إضافات VS Code؟

أنت تستخدم إضافات VS Code يوميًا بالفعل. Prettier ينسق كودك، وGitLens يعرض تاريخ Git، وGitHub Copilot يساعدك في كتابة الكود. هذه الإضافات هي في الأساس برامج مكتوبة بـ TypeScript/JavaScript توسع المحرر من خلال واجهات برمجة تطبيقات VS Code.

إضافات VS Code يمكنها فعل أكثر بكثير مما يتوقع الكثير من الناس:

* **إضافة عناصر واجهة مستخدم جديدة**: ألواح الشريط الجانبي، معلومات شريط الحالة، صفحات Webview مخصصة
* **التعامل مع الملفات والكود**: قراءة وتعديل وإنشاء الملفات؛ تحليل بنية الكود
* **دمج الخدمات الخارجية**: استدعاء واجهات برمجة التطبيقات، الاتصال بقواعد البيانات، دمج CI/CD
* **توسيع قدرات المحرر**: دعم لغات مخصص، إكمال الكود، التشخيصات
* **إضافة قدرات AI**: إنشاء مساعدين ذكيين باستخدام Chat Participant API، واستدعاء النماذج باستخدام Language Model API

<!-- ![placeholder: VS Code extension ecosystem diagram showing expandable areas: sidebar, editor, status bar, command palette, Chat panel](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![مخطط نظام إضافات VS Code يوضح المناطق القابلة للتوسيع: الشريط الجانبي، المحرر، شريط الحالة، لوحة الأوامر، ولوحة Chat](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 البنية الأساسية لإضافة VS Code

تعمل إضافة VS Code في عملية **Extension Host** معزولة، منفصلة عن العملية الرئيسية للمحرر. هذا يعني أنه حتى لو تعطلت الإضافة، فلن يتأثر المحرر نفسه.

الإضافة النموذجية لديها هذه الأجزاء الأساسية:

* **package.json (البيان)**: "بطاقة هوية" الإضافة، تعلن عن الاسم، ملف الدخول، نقاط المساهمة (`commands`، `menus`، `keybindings`، إلخ)
* **extension.ts (ملف الدخول)**: "عقل" الإضافة، يصدر `activate()` و `deactivate()`
* **نقاط المساهمة (Contribution Points)**: ما تساهمه إضافتك في VS Code في package.json (أوامر، عناصر قائمة، اختصارات، عروض، إلخ)
* **VS Code API**: مجموعة واجهات برمجة تطبيقات TypeScript المستخدمة لتشغيل قدرات المحرر

```text
محرر VS Code
    │
    ├── Extension Host (عملية الإضافة)
    │   ├── إضافتك
    │   │   ├── package.json  -> يعلن "ماذا أستطيع أن أفعل"
    │   │   ├── extension.ts  -> ينفذ "كيف أفعل ذلك"
    │   │   └── وحدات أخرى -> كود الميزات الملموسة
    │   ├── إضافة أخرى A
    │   └── إضافة أخرى B
    │
    └── العملية الرئيسية للمحرر (عرض واجهة المستخدم)
```

<!-- ![placeholder: VS Code extension architecture diagram showing Extension Host vs editor main process](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![مخطط بنية إضافة VS Code يوضح عملية Extension Host والعملية الرئيسية للمحرر](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 ما هي الإضافة التي سنقوم ببنائها؟

سنقوم ببناء إضافة VS Code باسم **"AI Project Bot"**، مساعد مشروع ذكي بالخصائص التالية:

| الميزة | الوصف |
|------|------|
| قوالب المشاريع | قائمة قوالب في الشريط الجانبي، إنشاء هيكل مشروع بنقرة واحدة |
| محادثة AI | مشارك `@project-bot` في VS Code Chat للأسئلة والأجوبة عن المشاريع |
| محادثة ملف/مقتطف | النقر بزر الماوس الأيمن على الكود أو الملف المحدد وإرساله إلى AI للتحليل/الشرح/إعادة البناء |
| أسئلة وأجوبة متعدد الملفات | تحديد ملفات متعددة في المستكشف وطلب من AI تحليل العلاقات والمنطق |
| اختصارات | اختصارات لوحة مفاتيح مخصصة لتشغيل الإجراءات الشائعة بسرعة |

<!-- ![placeholder: AI Project Bot preview showing sidebar templates, @project-bot chat panel, and right-click menu](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![معاينة إضافة AI Project Bot تعرض قائمة القوالب في الشريط الجانبي ولوحة محادثة @project-bot وقائمة النقر بزر الماوس الأيمن](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 خارطة طريق الدرس

سنكمل المسار في هذه الخطوات:

1. **إنشاء مشروع الإضافة** (3 دقائق): إنشاء مشروع باستخدام أداة السقالات وفهم الملفات الأساسية
2. **تنفيذ قوالب المشاريع** (5 دقائق): استخدام TreeView لعرض القوالب في الشريط الجانبي وإنشاء المشاريع
3. **تنفيذ مشارك AI Chat** (5 دقائق): إنشاء `@project-bot` عبر Chat Participant API
4. **تنفيذ محادثة ملف/مقتطف وأسئلة وأجوبة متعدد الملفات** (5 دقائق): قوائم النقر بزر الماوس الأيمن + تحديد متعدد
5. **إضافة اختصارات وتحسين تجربة المستخدم** (3 دقائق): اختصارات لوحة المفاتيح وتلميحات شريط الحالة
6. **النشر على السوق** (اختياري): التغليف والإرسال

# الفصل 2: إنشاء مشروع الإضافة (3 دقائق)

## 2.1 إنشاء المشروع باستخدام أداة السقالات

يوفر VS Code رسميًا أداة سقالات Yeoman. اطلب من AI تشغيل:

```text
الرجاء مساعدتي في تثبيت أدوات سقالات إضافات VS Code وإنشاء مشروع:
1. تثبيت Yeoman ومولد الكود: npm install -g yo generator-code
2. تشغيل yo code واختيار:
   - النوع: New Extension (TypeScript)
   - الاسم: ai-project-bot
   - المعرف: ai-project-bot
   - الوصف: مساعد مشروع ذكي - إنشاء قوالب، محادثة ذكية، أسئلة وأجوبة متعدد الملفات
   - مدير الحزم: npm
3. الدخول إلى مجلد المشروع وتثبيت التبعيات
```

البنية المُنشأة:

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # إعدادات التصحيح (F5 يبدأ التصحيح)
│   └── tasks.json           # مهام البناء
├── src/
│   └── extension.ts         # ملف دخول الإضافة
├── package.json             # بيان الإضافة (أهم ملف)
├── tsconfig.json            # إعدادات TypeScript
└── vsc-extension-quickstart.md  # دليل البدء السريع (يمكن حذفه)
```

## 2.2 فهم package.json: "بطاقة هوية" الإضافة

`package.json` هو الملف الأساسي لإضافة VS Code. بالإضافة إلى حقول npm العادية، يحتوي على `contributes` للإعلان عن كل ما تساهمه إضافتك في VS Code:

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "مساعد مشروع ذكي - إنشاء قوالب، محادثة ذكية، أسئلة وأجوبة متعدد الملفات",
  "version": "0.0.1",
  "engines": { "vscode": "^1.90.0" },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [],
    "menus": {},
    "keybindings": [],
    "viewsContainers": {},
    "views": {},
    "chatParticipants": []
  }
}
```

**الحقول المهمة:**

| الحقل | الغرض |
|------|------|
| `engines.vscode` | الحد الأدنى لإصدار VS Code المدعوم |
| `activationEvents` | متى يتم تفعيل الإضافة (فارغ يعني التفعيل عند الطلب) |
| `main` | مسار ملف الدخول المترجم |
| `contributes` | جميع الميزات المساهمة (أوامر، قوائم، اختصارات، عروض، إلخ) |

<!-- ![placeholder: package.json screenshot with contributes field highlighted](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![لقطة شاشة لملف package.json في المحرر مع تمييز حقل contributes](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 فهم extension.ts: "عقل" الإضافة

افتح `src/extension.ts` وسترى دالتين أساسيتين:

```typescript
import * as vscode from 'vscode'

// يتم استدعاؤها عند تفعيل الإضافة (أول تنفيذ لأمر، فتح ملفات محددة، إلخ)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot activated!')

  // تسجيل الأوامر، العروض، مشاركي Chat، إلخ
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello from AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// يتم استدعاؤها عند إلغاء تفعيل الإضافة (مثلاً عند إغلاق VS Code)
export function deactivate() {}
```

**المفاهيم الأساسية:**

* `activate(context)`: تهيئة الإضافة، سجّل جميع القدرات هنا
* `context.subscriptions`: قائمة تنظيف تلقائي؛ يقوم VS Code بالتخلص من العناصر المسجلة عند إلغاء التفعيل
* `vscode.commands.registerCommand`: تسجيل أمر قابل للاستدعاء من لوحة الأوامر (`Ctrl+Shift+P`)

## 2.4 بدء التصحيح

اضغط **F5**، وسيفتح VS Code نافذة **Extension Development Host** جديدة. هذه نسخة VS Code جديدة مع تحميل إضافتك.

في النافذة الجديدة، اضغط **Ctrl+Shift+P**، واكتب "Hello World"، وسترى رسالة منبثقة. هذا يعني أن إضافتك تعمل.

<!-- ![placeholder: VS Code extension debugging screenshot showing Extension Development Host and Hello World message](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![لقطة شاشة لتصحيح أخطاء إضافة VS Code، تعرض نافذة Extension Development Host ورسالة Hello World](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **نصيحة تصحيح**: بعد تغيير الكود، في Extension Development Host اضغط **Ctrl+Shift+P** -> **Developer: Reload Window** لإعادة تحميل الإضافة بسرعة.

# الفصل 3: تنفيذ قوالب المشاريع (5 دقائق)

## 3.1 تصميم نظام القوالب

نريد إضافة لوحة "قوالب المشاريع" في الشريط الجانبي لـ VS Code حيث يمكن للمستخدمين تصفح القوالب وإنشاء هياكل المشاريع بنقرة واحدة. هذا يستخدم **TreeView API** في VS Code.

اطلب من AI التنفيذ:

```text
الرجاء مساعدتي في تنفيذ قوالب المشاريع في ai-project-bot:

1. إضافة نقاط المساهمة في package.json:
   - إضافة عنصر viewsContainers.activitybar جديد بالمعرف "project-bot" والعنوان "AI Project Bot"
   - إضافة عرض تحته بالمعرف "projectTemplates" والاسم "Project Templates"
   - إضافة الأمر "ai-project-bot.createFromTemplate" والعنوان "Create Project from Template"

2. إنشاء src/templates/templateProvider.ts:
   - تنفيذ TreeDataProvider مع فئات القوالب والقوالب:
     - الواجهة الأمامية: React + TypeScript، Vue 3 + TypeScript، Next.js App
     - الواجهة الخلفية: Express API، FastAPI Python
     - المكدس الكامل: T3 Stack (Next.js + tRPC + Prisma)
   - كل عنصر قالب يعرض الاسم والوصف والأيقونة

3. إنشاء src/templates/scaffolder.ts:
   - تنفيذ دالة createProjectFromTemplate
   - السماح للمستخدمين باختيار المجلد الهدف
   - إنشاء بنية المشروع حسب نوع القالب
```

## 3.2 الإعلان عن العرض في package.json

أولاً أضف مساهمات عرض الشريط الجانبي في `package.json`:

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "project-bot",
          "title": "AI Project Bot",
          "icon": "resources/bot-icon.svg"
        }
      ]
    },
    "views": {
      "project-bot": [
        {
          "id": "projectTemplates",
          "name": "Project Templates"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "Create Project from Template",
        "icon": "$(add)"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "ai-project-bot.createFromTemplate",
          "when": "view == projectTemplates",
          "group": "navigation"
        }
      ]
    }
  }
}
```

هذا الإعداد يفعل ثلاثة أشياء:

1. يضيف أيقونة "AI Project Bot" في شريط النشاط
2. ينشئ عرض "Project Templates" تحت هذا الإدخال
3. يضيف زر "+" في شريط عنوان العرض لإنشاء المشاريع

<!-- ![placeholder: Screenshot showing AI Project Bot icon and project template list in VS Code sidebar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![لقطة شاشة تعرض أيقونة AI Project Bot وقائمة قوالب المشاريع في الشريط الجانبي لـ VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 تنفيذ TreeDataProvider

TreeDataProvider هو الواجهة التي يستخدمها VS Code لملء بيانات الشجرة. نحتاج `getTreeItem` (معلومات عرض لعقدة واحدة) و `getChildren` (قائمة العقد الفرعية).

الكود الأساسي:

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // أمر لإنشاء المشروع، مثلاً "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'مشروع React مبني بـ Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'مشروع Vue 3 مبني بـ Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'مشروع المكدس الكامل Next.js App Router', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'واجهة REST API بـ Express + TypeScript', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'مشروع واجهة خلفية Python FastAPI', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// عقدة الشجرة: فئة أو قالب
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nCommand: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Create Project',
        arguments: [template]
      }
    }
  }
}

export class TemplateProvider implements vscode.TreeDataProvider<TemplateItem> {
  getTreeItem(element: TemplateItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: TemplateItem): TemplateItem[] {
    if (!element) {
      // الجذر: إرجاع قائمة الفئات
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // الفرعي: القوالب في الفئة
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 تسجيل العرض وأمر الإنشاء

سجّل TreeView وأمر إنشاء المشروع في `extension.ts`:

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // تسجيل عرض القوالب
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // تسجيل أمر إنشاء المشروع
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // إذا لم يتم تمرير قالب (تم الاستدعاء من لوحة الأوامر)، دع المستخدم يختار
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'اختر قالب مشروع' }
        )
        if (!pick) return
        template = pick.template
      }

      // طلب اسم المشروع
      const name = await vscode.window.showInputBox({
        prompt: 'أدخل اسم المشروع',
        placeHolder: 'my-awesome-project'
      })
      if (!name) return

      // طلب المجلد الهدف
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'اختر المجلد الهدف'
      })
      if (!folder) return

      // تنفيذ أمر الإنشاء
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`جاري إنشاء مشروع ${template.name}: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

الآن اضغط F5 للتصحيح. سترى AI Project Bot في شريط النشاط. وسّع قائمة القوالب وانقر على أي قالب لإنشاء مشروع.

<!-- ![placeholder: Screenshot showing project name input and folder picker dialog after clicking a template](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![لقطة شاشة تعرض مربع إدخال اسم المشروع ومربع حوار اختيار المجلد بعد النقر على قالب](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# الفصل 4: تنفيذ مشارك AI Chat (5 دقائق)

## 4.1 ما هو Chat Participant API؟

بدءًا من VS Code 1.90، يمكن للإضافات إنشاء مساعد AI خاص بها في لوحة Chat باستخدام **Chat Participant API**. إذا أدخل المستخدم `@project-bot help me analyze this project architecture`، فإن إضافتك تستلم الرسالة وتعيد استجابة مولدة بالنموذج.

المفاهيم الأساسية:

* **المشارك (Participant)**: هوية مساعدك في لوحة Chat، يُستدعى بـ `@name`
* **أوامر الشرطة المائلة (Slash Commands)**: أوامر سريعة يدعمها المشارك، مثل `/explain`، `/refactor`
* **Language Model API**: استدعاء النماذج المدمجة في VS Code (مثلاً Copilot GPT-4o)
* **التدفق (Stream)**: إخراج الاستجابات تدريجيًا من خلال `stream.markdown()`

## 4.2 الإعلان عن Chat Participant في package.json

أضف هذا في `contributes`:

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "مساعد مشروعك الذكي لتحليل الكود وشرح البنية وتوليد الحلول",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` يعني أنه بمجرد التحديد، تذهب رسائل المتابعة إلى هذا المشارك افتراضيًا، دون الحاجة لكتابة `@project-bot` في كل مرة.

## 4.3 تنفيذ معالج Chat Participant

اطلب من AI كتابة المنطق الأساسي:

```text
الرجاء مساعدتي في إنشاء src/chat/chatParticipant.ts وتنفيذ Chat Participant:
1. تسجيل المشارك "ai-project-bot.projectBot"
2. دعم ثلاثة أوامر شرطة مائلة:
   - /explain: شرح الكود المحدد أو الملف الحالي
   - /refactor: تقديم اقتراحات إعادة البناء
   - /template: التوصية بقوالب التقنيات المناسبة
3. استخدام Language Model API مع النموذج المدمج في VS Code
4. إرجاع الاستجابة في وضع التدفق (stream.markdown)
```

الكود الأساسي:

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // اختيار النموذج المتاح
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('لا يوجد نموذج لغوي متاح. يرجى التأكد من تثبيت GitHub Copilot.')
        return
      }

      // بناء prompt النظام حسب أمر الشرطة المائلة
      let systemPrompt = 'أنت مساعد تطوير مشاريع محترف.'

      if (request.command === 'explain') {
        systemPrompt = 'أنت خبير في شرح الكود. يرجى شرح كود المستخدم باللغة العربية بشكل موجز، بما في ذلك الغرض وتدفق المنطق وقرارات التصميم الرئيسية.'
      } else if (request.command === 'refactor') {
        systemPrompt = 'أنت خبير في إعادة بناء الكود. حلل كود المستخدم وقدم اقتراحات محددة لإعادة البناء مع أمثلة كود محسنة.'
      } else if (request.command === 'template') {
        systemPrompt = 'أنت خبير في اختيار التقنيات. أوصِ بتقنيات وقوالب مشاريع مناسبة بناءً على متطلبات المستخدم.'
      }

      // بناء الرسائل
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // إخراج التدفق
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // تسجيل أوامر الشرطة المائلة
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: 'شرح وظيفة ومنطق الكود' },
      { name: 'refactor', description: 'تقديم اقتراحات إعادة البناء والتحسينات' },
      { name: 'template', description: 'التوصية بقوالب مشاريع وتقنيات مناسبة' }
    ]
  }

  // تسجيل اقتراحات المتابعة
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: 'هل يمكنك رسم مخطط تدفق؟', label: 'إنشاء مخطط تدفق' },
          { prompt: 'هل هناك أخطاء محتملة هنا؟', label: 'التحقق من المشاكل المحتملة' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

استدعِ التسجيل في `extension.ts`:

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... كود تسجيل القوالب السابق ...
  registerChatParticipant(context)
}
```

الآن أدخل `@project-bot /explain ماذا يفعل هذا الكود؟` في لوحة Chat، وستقوم إضافتك باستدعاء النموذج وإنشاء الشرح.

<!-- ![placeholder: VS Code Chat screenshot showing @project-bot, /explain command, and streaming response](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![لقطة شاشة للوحة Chat في VS Code تعرض @project-bot وأمر /explain واستجابة متدفقة](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# الفصل 5: محادثة ملف/مقتطف وأسئلة وأجوبة متعدد الملفات (5 دقائق)

## 5.1 قائمة النقر بزر الماوس الأيمن: إرسال الكود المحدد إلى AI

نريد أن يتمكن المستخدمون من تحديد الكود في المحرر وإرساله إلى AI من قائمة السياق. هذا يستخدم نقاط مساهمة **Context Menu** في VS Code.

أضف في `package.json`:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "AI: شرح الكود المحدد"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "AI: إعادة بناء الكود المحدد"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "ai-project-bot.explainSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@1"
        },
        {
          "command": "ai-project-bot.refactorSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@2"
        }
      ]
    }
  }
}
```

**ملاحظات مهمة على الإعداد:**

* `when: "editorHasSelection"`: إظهار القائمة فقط عند تحديد نص
* `group: "ai-project-bot@1"`: تجميع وترتيب القائمة (`@1`، `@2`)

## 5.2 تنفيذ تحليل الكود المحدد

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // شرح الكود المحدد
  const explainCmd = vscode.commands.registerCommand(
    'ai-project-bot.explainSelection',
    async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const selectedText = editor.document.getText(selection)
      const fileName = editor.document.fileName.split('/').pop()
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1

      // بناء prompt مع السياق
      const prompt = [
        `يرجى شرح الكود التالي (من ${fileName}، الأسطر ${startLine}-${endLine}):`,
        '```',
        selectedText,
        '```',
        'يرجى الشرح: 1) ماذا يفعل هذا الكود 2) المنطق الأساسي 3) التحسينات المحتملة'
      ].join('\n')

      // استدعاء Language Model API
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('لا يوجد نموذج لغوي متاح')
        return
      }

      // عرض النتائج في لوحة الإخراج
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- شرح الكود (${fileName}:${startLine}-${endLine}) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(explainCmd)
}
```

<!-- ![placeholder: Screenshot of editor context menu showing AI items after selecting code](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png) -->
![لقطة شاشة لقائمة سياق المحرر تعرض عناصر AI بعد تحديد الكود](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 أسئلة وأجوبة متعدد الملفات: تحليل علاقات الملفات دفعة واحدة

هذه واحدة من أقوى الميزات: تحديد ملفات متعددة في المستكشف وترك AI يحلل العلاقات والمنطق بنقرة واحدة.

أضف قائمة سياق المستكشف في `package.json`:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "AI: تحليل علاقات الملفات المحددة"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "ai-project-bot.analyzeFiles",
          "when": "explorerResourceIsFile",
          "group": "ai-project-bot"
        }
      ]
    }
  }
}
```

تنفيذ أمر تحليل الملفات المتعددة:

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles يحتوي على جميع الملفات المحددة
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('يرجى تحديد ملفين على الأقل للتحليل')
        return
      }

      // قراءة جميع الملفات المحددة
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `يرجى تحليل العلاقات بين هذه الملفات الـ ${files.length}:`,
        '',
        ...fileContents,
        '',
        'يرجى الشرح:',
        '1. مسؤوليات كل ملف',
        '2. علاقات الاعتماد/الاستدعاء بينها',
        '3. تدفق البيانات (إن وجد)',
        '4. اقتراحات معمارية أو مشاكل محتملة'
      ].join('\n')

      // استدعاء النموذج وعرض النتيجة
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('لا يوجد نموذج لغوي متاح')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- تحليل متعدد الملفات (${files.length} ملفات) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(analyzeCmd)
}
```

طريقة الاستخدام: في المستكشف، اضغط مع الاستمرار على `Ctrl` (`Cmd` على Mac) لتحديد ملفات متعددة، وانقر بزر الماوس الأيمن واختر "AI: تحليل علاقات الملفات المحددة." سيقرأ AI جميع الملفات المحددة ويعيد التحليل.

<!-- ![placeholder: Screenshot of explorer with multi-selected files and AI analysis context menu item](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png) -->
![لقطة شاشة للمستكشف مع ملفات محددة متعددة وعنصر تحليل AI في قائمة السياق](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# الفصل 6: الاختصارات وتحسين تجربة المستخدم (3 دقائق)

## 6.1 اختصارات لوحة المفاتيح المخصصة

الاختصارات هي مفتاح الكفاءة. أضف في `package.json`:

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "ai-project-bot.explainSelection",
        "key": "ctrl+shift+e",
        "mac": "cmd+shift+e",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "key": "ctrl+shift+r",
        "mac": "cmd+shift+r",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.createFromTemplate",
        "key": "ctrl+shift+n",
        "mac": "cmd+shift+n",
        "when": ""
      }
    ]
  }
}
```

**شروط `when`:**

| الشرط | المعنى |
|------|------|
| `editorTextFocus` | المؤشر في المحرر |
| `editorHasSelection` | يوجد نص محدد |
| `explorerViewletVisible` | لوحة المستكشف مرئية |
| `!editorReadonly` | الملف ليس للقراءة فقط |

الشروط المتعددة المتصلة بـ `&&` تعني أنه يجب تحقيقها جميعًا.

## 6.2 تلميح شريط الحالة

أضف عنصر شريط حالة سريع ليعرف المستخدمون دائمًا أن الإضافة تعمل:

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = 'انقر لفتح AI Project Bot'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` هو بناء أيقونات VS Code المدمج. يمكنك العثور على جميع الأيقونات في [مكتبة Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

<!-- ![placeholder: Screenshot of AI Bot icon displayed in VS Code status bar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![لقطة شاشة لأيقونة AI Bot المعروضة في شريط حالة VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# الفصل 7: النشر على Marketplace (اختياري)

## 7.1 التحضير للنشر

يتم تغليف ونشر إضافات VS Code باستخدام **vsce**:

```text
الرجاء مساعدتي في تثبيت vsce: npm install -g @vscode/vsce
```

قبل النشر، جهّز ما يلي:

1. **حساب Azure DevOps**: سجّل وأنشئ مؤسسة على [dev.azure.com](https://dev.azure.com/)
2. **رمز الوصول الشخصي (PAT)**: أنشئه في Azure DevOps بصلاحية **Marketplace -> Manage**
3. **معرف الناشر (Publisher ID)**: أنشئ هوية ناشر في [VS Code Marketplace](https://marketplace.visualstudio.com/manage)

## 7.2 تحسين بيانات package.json

أضف البيانات الوصفية قبل النشر:

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "project", "template", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

ستحتاج أيضًا إلى `README.md` لوصف السوق و `CHANGELOG.md` لتاريخ الإصدارات.

## 7.3 التغليف والنشر

```bash
# التغليف إلى .vsix (ملف تثبيت يدوي)
vsce package

# النشر على السوق
vsce publish
```

بعد التغليف، ستحصل على `ai-project-bot-0.0.1.vsix`. يمكنك إرسال هذا الملف لأصدقائك ويمكنهم التثبيت عبر "Install from VSIX" في VS Code.

للنشر الرسمي على السوق، شغّل `vsce publish`؛ ستظهر الإضافة عادةً خلال دقائق.

<!-- ![placeholder: Screenshot of AI Project Bot extension page in VS Code Marketplace](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **نصيحة**: الإصدار الأول قد يتطلب مراجعة. تأكد من أن README واضح ولقطات الشاشة مكتملة لتسريع الموافقة.

# الفصل 8: ملاحظات ختامية

تهانينا! لقد بنيت إضافة VS Code كاملة الوظائف من الصفر. ملخص:

1. أنشأت مشروع إضافة بأداة سقالات Yeoman وفهمت أدوار `package.json` و `extension.ts`
2. نفّذت قائمة قوالب المشاريع في الشريط الجانبي باستخدام TreeView API وإنشاء المشاريع بنقرة واحدة
3. أنشأت مساعد AI `@project-bot` باستخدام Chat Participant API، بما في ذلك أوامر الشرطة المائلة والاستجابات المتدفقة
4. نفّذت تحليل تحديد الكود بالنقر بزر الماوس الأيمن
5. نفّذت تحليل العلاقات متعدد الملفات
6. أضفت اختصارات مخصصة وتلميح شريط الحالة

خيال تطوير إضافات VS Code واسع جدًا. التقنيات وراء الإضافات المفيدة التي تستخدمها يوميًا هي بالضبط ما تعلمته للتو.

**اتجاهات متقدمة:**

* **ألواح Webview المخصصة**: بناء واجهة مستخدم مخصصة بالكامل باستخدام HTML/CSS/JS، مثل رسوم البنية المرئية وواجهات مراجعة الكود التفاعلية
* **أدوات Language Model**: تسجيل أدوات مخصصة يمكن لـ AI استدعاؤها، مثل الاستعلام عن قاعدة بيانات أو تنفيذ طلبات API
* **التشخيصات و CodeLens**: عرض اقتراحات AI وتلميحات الأداء وتحذيرات الأمان مباشرة في المحرر
* **دعم اللغات المخصصة**: توفير تمييز بناء الجملة والإكمال والتشخيصات لـ DSLs أو تنسيقات التكوين المحددة
* **دمج التطوير عن بُعد**: جعل الإضافة تعمل في SSH والحاويات و WSL

***محررك، قواعدك.***

# المراجع

* [توثيق VS Code Extension API](https://code.visualstudio.com/api)
* [دليل Chat Participant API](https://code.visualstudio.com/api/extension-guides/chat)
* [دليل Language Model API](https://code.visualstudio.com/api/extension-guides/language-model)
* [دليل TreeView API](https://code.visualstudio.com/api/extension-guides/tree-view)
* [دليل Webview API](https://code.visualstudio.com/api/extension-guides/webview)
* [دليل نشر إضافات VS Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [مكتبة أيقونات Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
