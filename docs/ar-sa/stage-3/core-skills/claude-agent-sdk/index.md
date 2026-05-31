# الدليل الشامل لـ Claude Agent SDK

## مقدمة

ربما تكون قد استخدمت بالفعل واجهة برمجة تطبيقات Claude الأساسية: ترسل رسالة واحدة، تحصل على رد واحد، تمامًا مثل المحادثة. لكن إذا كنت تريد من Claude مساعدتك في قراءة الملفات وتشغيل الأوامر والبحث في الكود وإصلاح الأخطاء والتحقق من النتائج بنفسه والاستمرار في التكرار، فهذا النوع من "العمل المستقل" ليس شيئًا يمكن لواجهة برمجة التطبيقات الأساسية القيام به.

تم بناء Claude Agent SDK تحديدًا لهذا السيناريو. إنه يجمع جميع قدرات Claude Code - قراءة وكتابة الملفات وتنفيذ الأوامر والبحث في الكود وتحرير الملفات وتصفح الويب - في مكتبة قابلة للبرمجة. لا تحتاج إلى كتابة حلقة استدعاء الأدوات بنفسك. يمكن لـ Claude تنفيذ الأدوات بشكل مستقل والتكرار بشكل مستقل حتى تكتمل المهمة فعلًا.

ملخص بجملة واحدة: SDK الأساسي هو "أنت تسأل، هو يجيب"؛ Agent SDK هو "أنت تُكلف، هو يعمل."

---

## ما الفرق عن SDK الأساسي؟

انظر إلى الكود أولاً والفر سيكون واضحًا:

```python
# SDK الأساسي anthropic: يجب عليك كتابة حلقتك الخاصة للتعامل مع استدعاءات الأدوات
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Fix the bug in auth.py"}],
    tools=[...]  # يجب عليك تعريف الأدوات بنفسك
)
# Claude يطلب استدعاء بعض الأدوات
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # يجب عليك تنفيذها بنفسك
    response = client.messages.create(tool_result=result, **params)  # يجب عليك إعادة التغذية بنفسك
```

```python
# Agent SDK: كتلة واحدة وانتهى، Claude يقرأ الملفات ويجد الأخطاء ويحرر الكود بنفسه
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude يقرأ الملفات ويحدد المشاكل ويحرر الكود بنفسه
```

الفرق واضح:

| عنصر المقارنة | SDK الأساسي anthropic | Claude Agent SDK |
|--------|-------------------|-----------------|
| تنفيذ الأدوات | أنت تنفذه | Claude يتولى الأمر |
| حلقة الأدوات | أنت تنفذها | حلقة الوكيل مدمجة |
| الأدوات المدمجة | لا شيء، كلها معرّفة ذاتيًا | قراءة/كتابة ملفات وBash وبحث والمزيد جاهزة |
| إدارة السياق | أنت تحافظ عليه | ضغط وإدارة تلقائية |
| الأنسب لـ | المحادثة والتوليد واستخدام الأدوات البسيط | إكمال المهام المعقدة بشكل مستقل |

---

## ما الفرق عن أُطر العملاء الأخرى؟

هناك العديد من أُطر العملاء في السوق - LangChain وLlamaIndex وCrewAI وAutoGPT والمزيد. ما الفريد في Claude Agent SDK مقارنة بها؟

> لمزيد من التفاصيل، راجع الملحق: [مقارنة أُطر العملاء السائدة](/ar-sa/appendix/8-artificial-intelligence/ai-agents.html)

باختصار:

| الإطار | السيناريو الأنسب |
|------|-------------|
| **Claude Agent SDK** | جعل Claude يكمل البرمجة وعمليات الملفات وتنفيذ الأوامر بشكل مستقل |
| **LangChain** | بناء تطبيقات ذكاء اصطناعي عامة معقدة بتدفقات قابلة للتخصيص بدرجة عالية |
| **CrewAI** | محاكاة سيناريوهات التعاون متعدد الأدوار (فرق افتراضية، لعب الأدوار) |
| **LlamaIndex** | بناء أنظمة أسئلة وأجوبة قائمة على المعرفة تربط بيانات المؤسسة بنماذج اللغات الكبيرة |

---

## التثبيت والتكوين

### التثبيت

Python يحتاج 3.10+، وTypeScript يحتاج Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### المصادقة

فقط عيّن متغير بيئة مفتاح API:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

المصادقة عبر المنصات السحابية مدعومة أيضًا:
- AWS Bedrock: عيّن `CLAUDE_CODE_USE_BEDROCK=1` + بيانات اعتماد AWS
- Google Vertex AI: عيّن `CLAUDE_CODE_USE_VERTEX=1` + بيانات اعتماد GCP
- Microsoft Azure: عيّن `CLAUDE_CODE_USE_FOUNDRY=1` + بيانات اعتماد Azure

### نقطة نهاية API مخصصة

إذا كنت تستخدم وكيلًا أو بوابة أو نقطة نهاية API مستضافة ذاتيًا، يمكنك تغيير عنوان URL الافتراضي لـ API عبر معامل `env`:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` لا يحتوي على معامل `base_url` مباشر، لكن حقل `env` يمكنه تمرير متغيرات بيئة عشوائية إلى واجهة سطر أوامر Claude Code الأساسية. متغيرات البيئة الشائعة:

| متغير البيئة | الغرض |
|---------|------|
| `ANTHROPIC_BASE_URL` | نقطة نهاية API مخصصة (وكيل، بوابة) |
| `ANTHROPIC_API_KEY` | مفتاح API |
| `ANTHROPIC_AUTH_TOKEN` | رمز مصادقة بديل |
| `ANTHROPIC_CUSTOM_HEADERS` | رؤوس طلب مخصصة |

---

## المفاهيم الأساسية

يمكن تلخيص مبدأ تشغيل Agent SDK بجملة واحدة: **جمع السياق -> تنفيذ الإجراءات -> التحقق من النتائج -> التكرار**.

هذا هو بالضبط كيف يعمل المطورون البشر: اقرأ الكود أولاً، ثم عدّل الكود، ثم شغّل الاختبارات وتحقق من النتائج. إذا كان خطأ، استمر في التكرار. Agent SDK يؤتمت هذه الحلقة.

### وضعان للاستخدام

**الوضع 1: دالة `query()` - بدون حالة، مناسبة للمهام لمرة واحدة**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="ما الملفات الموجودة في هذا الدليل؟",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**الوضع 2: `ClaudeSDKClient` - ذو حالة، مناسب للمحادثات متعددة الأدوار**

استخدم هذا عندما تحتاج إلى الحفاظ على السياق والتفاعل عبر أدوار متعددة. على سبيل المثال، اطلب أولاً من Claude قراءة وحدة واحدة، ثم اطلب منه العثور على جميع مواقع الاستدعاء لتلك الوحدة - في الدور الثاني لا يزال يتذكر ما قرأه في الدور الأول.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # الدور 1: قراءة وحدة المصادقة
    async for message in query(
        prompt="Read the authentication module code",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # الدور 2: المتابعة بناءً على السياق السابق
    async for message in query(
        prompt="Find all places that call it",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## الأدوات المدمجة: جاهزة للاستخدام

هذا أحد أفضل أجزاء Agent SDK - لا تحتاج إلى تنفيذ أي أدوات بنفسك، يمكن لـ Claude استخدامها مباشرة:

| الأداة | القدرة | الاستخدام النموذجي |
|------|------|---------|
| Read | قراءة الملفات | عرض الكود، قراءة التكوينات |
| Write | إنشاء ملفات | توليد ملفات جديدة |
| Edit | تحرير دقيق للملفات | إصلاح الأخطاء، إعادة الهيكلة |
| Bash | تشغيل أوامر الطرفية | تشغيل الاختبارات، تثبيت التبعيات، عمليات git |
| Glob | بحث عن الملفات بالنمط | `**/*.py`، `src/**/*.ts` |
| Grep | بحث المحتوى بالتعبيرات النمطية | إيجاد تعريفات الدوال، TODOs |
| WebSearch | البحث في صفحات الويب | البحث عن الوثائق، إيجاد الحلول |
| WebFetch | جلب محتوى الويب | قراءة الوثائق عبر الإنترنت |
| Task | إطلاق وكلاء فرعيين | موازنة المهام الفرعية |

استخدم `allowed_tools` للتحكم في الأدوات التي يمكن للوكيل استخدامها:

```python
# وكيل للقراءة فقط: يمكنه الفحص但不能 التعديل
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# وكيل كامل: يمكنه القراءة والكتابة وتنفيذ الأوامر
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## الميزات المتقدمة

### الخطاطيف (Hooks): أدخل منطقك الخاص في النقاط الرئيسية

تتيح لك الخطاطيف حقن كود مخصص في اللحظات الحرجة من تنفيذ الوكيل - على سبيل المثال، التسجيل واعتراض العمليات المحفوفة بالمخاطر وتدقيق تغييرات الملفات.

أنواع الخطاطيف المدعومة تشمل: `PreToolUse` (قبل تنفيذ الأداة)، `PostToolUse` (بعد تنفيذ الأداة)، `Stop` (عند توقف الوكيل)، `SessionStart`، `SessionEnd`، والمزيد.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# تسجيل سجل تدقيق في كل مرة يُعدَّل فيها ملف
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactor utils.py for better readability",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

استخدامات واقعية:
- سجلات التدقيق: تسجيل كل عملية ينفذها الوكيل
- الاعتراض الأمني: منع التعديلات على الملفات الحرجة
- إشعارات فورية: إرسال رسائل عند اكتمال مهام الوكيل
- مراقبة التكلفة: عد استدعاءات الأدوات واستخدام الرموز

### الوكلاء الفرعيون: تقسيم المهام الكبيرة عبر المتخصصين

عندما تكون المهمة معقدة بما يكفي، يمكنك تعريف عدة وكلاء فرعيين متخصصين والسماح للوكيل الرئيسي بتفويض المهام الفرعية لهم. كل وكيل فرعي لديه تعليماته وصلاحيات أدواته الخاصة، ومعزول عن الآخرين.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Use the code-reviewer agent to review this project's code quality",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="مراجع كود محترف مسؤول عن مراجعات الجودة والأمان",
                prompt="Analyze code quality, identify potential issues, and provide improvement suggestions.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="متخصص في الاختبار مسؤول عن كتابة اختبارات الوحدة",
                prompt="Write unit tests for functions that are missing tests.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

رسائل الوكلاء الفرعيين تتضمن حقل `parent_tool_use_id`، مما يسهل تتبع الرسائل التي جاءت من أي وكيل فرعي.

### تكامل MCP: الاتصال بالعالم الخارجي

من خلال Model Context Protocol (MCP)، يمكن لوكيلك الاتصال بأنظمة خارجية مثل قواعد البيانات والمتصفحات وواجهات برمجة التطبيقات الخارجية. المجتمع يوفر بالفعل [مئات خوادم MCP](https://github.com/modelcontextprotocol/servers) يمكنك استخدامها مباشرة.

```python
# توصيل Playwright حتى يتمكن الوكيل من تشغيل متصفح
async for message in query(
    prompt="Open example.com and describe what you see",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

سيناريوهات تكامل MCP الشائعة:
- Playwright: أتمتة المتصفح، كشط الصفحات، ملء النماذج
- PostgreSQL/MySQL: الاستعلام عن قواعد البيانات والعمليات عليها مباشرة
- Slack/Email: إرسال الإشعارات والرسائل
- GitHub: إدارة طلبات السحب والمشاكل والمستودعات

---

## ماذا يمكنك بناؤه؟ سيناريوهات عملية

بعد فهم الميزات، السؤال الأهم هو: ماذا يمكن أن يفعل هذا فعلًا؟ فيما يلي سيناريوهات حقيقية تحققت من قبل المجتمع.

### السيناريو 1: وكيل إصلاح أخطاء تلقائي

أعطه وصف خطأ، ويمكنه العثور على الكود وتحديد المشكلة وإصلاحها وتشغيل الاختبارات للتحقق:

```python
async for message in query(
    prompt="Users report occasional HTTP 500 errors during login. Investigate and fix code under src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

سيقوم Claude بالبحث grep في السجلات وقراءة الكود ذي الصلة وإيجاد الخطأ وتعديل الكود وتشغيل الاختبارات لتأكيد الإصلاح.

### السيناريو 2: وكيل مراجعة الكود

بناء وكيل مراجعة كود للقراءة فقط يقوم بتدقيق الجودة بدون إجراء أي تعديلات:

```python
async for message in query(
    prompt="Review code under src/ with focus on security vulnerabilities, performance issues, and coding conventions",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### السيناريو 3: تكامل CI/CD

في خط أنابيب CI، اجعل الوكيل يحلل الاختبارات الفاشلة ويحاول الإصلاح التلقائي:

```python
async for message in query(
    prompt="Run npm test, analyze failing test cases, and fix the code so all tests pass",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

هذه ميزة كبيرة لـ Agent SDK مقارنة بواجهة سطر الأوامر - واجهة سطر الأوامر جيدة عندما يجلس شخص أمام الطرفية، بينما SDK مثالي للتضمين في سير العمل المؤتمت.

### السيناريو 4: وكيل بحث

اجعل الوكيل يبحث في الويب ويقرأ الوثائق ويجمع المعلومات وينتج تقريرًا:

```python
async for message in query(
    prompt="Research mainstream Python Web frameworks in 2026. Compare FastAPI, Django, and Litestar, then write a technical selection report to report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### السيناريو 5: وكيل تطوير كامل مع قدرة المتصفح

بتوصيل Playwright عبر MCP، يمكن للوكيل ليس فقط كتابة الكود بل أيضًا فتح متصفح للتحقق من النتائج:

```python
async for message in query(
    prompt="Fix the homepage style issue, then open a browser and take screenshots to verify the result",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### مرجع سريع للسيناريوهات

| السيناريو | الأدوات الأساسية | الصعوبة |
|------|---------|------|
| إصلاح أخطاء تلقائي | Read, Edit, Bash, Grep | مبتدئ |
| مراجعة الكود | Read, Glob, Grep | مبتدئ |
| إصلاح تلقائي في CI/CD | Read, Edit, Bash | متوسط |
| تقرير بحث تقني | WebSearch, WebFetch, Write | مبتدئ |
| أتمتة المتصفح | MCP (Playwright) | متوسط |
| تعاون متعدد الوكلاء | Task + AgentDefinition | متقدم |
| عمليات قاعدة البيانات | MCP (PostgreSQL/MySQL) | متوسط |
| مساعد البريد/الإشعارات | MCP (Slack/Email) | متوسط |

---

## متى يجب أن تستخدم Agent SDK؟

ليس كل سيناريو يحتاج إلى Agent SDK. اختيار الأداة المناسبة مهم:

| ما تريد فعله | الأداة الموصى بها |
|-----------|---------|
| محادثة بسيطة، توليد نصوص، ترجمة | SDK الأساسي `anthropic` |
| استخدام أدوات لمرة واحدة (بحث الطقس، حساب) | SDK الأساسي `anthropic` |
| إكمال مهام تطوير متعددة الخطوات بشكل مستقل | Agent SDK |
| التضمين في خطوط أنابيب CI/CD | Agent SDK |
| بناء تطبيقات تعمل على نظام الملفات | Agent SDK |
| التطوير التفاعلي اليومي | Claude Code CLI |
| المهام السريعة لمرة واحدة | Claude Code CLI |

باختصار: إذا كانت مهمتك تتطلب من Claude "العمل بيديه" بنفسه (قراءة ملفات، تحرير كود، تشغيل أوامر)، استخدم Agent SDK. إذا كنت تحتاج فقط أسئلة وأجوبة، SDK الأساسي كافٍ.

---

## الممارسة المؤسسية: بناء خط أنابيب حماية جودة الكود

السيناريوهات السابقة استخدمت جميعها وكيلًا واحدًا لمهمة واحدة. في بيئات المؤسسات الحقيقية، ما تحتاجه هو خط أنابيب كامل - عدة وكلاء متسلسلين، كل مرحلة بمدخلات/مخرجات واضحة، بالإضافة إلى التدقيق والتراجع والإشعارات.

الآن سنقوم ببناء سيناريو حقيقي: بعد كل تقديم PR، يتم تشغيل **مراجعة كود -> فحص أمني -> إصلاح تلقائي -> تحقق من الاختبارات -> توليد تقرير** تلقائيًا كخط أنابيب كامل.

### تصميم البنية المعمارية

```text
تم تقديم PR
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Code Review │───▶│ Security Scan│───▶│   Auto Fix   │
│    Agent     │    │    Agent     │    │    Agent     │
│ (للقراءة فقط)  │    │ (للقراءة فقط)  │    │ (قابل للكتابة) │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ Test Verify  │───▶│ Report Build │
                                     │    Agent     │    │    Agent     │
                                     │   (Bash)     │    │   (Write)    │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       إشعار Slack
```

الفكرة الأساسية: **كل وكيل يقوم بشيء واحد، الصلاحيات في حدها الأدنى، والنتائج تُمرر بالتسلسل**.

### الخطوة 1: تعريف إطار خط الأنابيب

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# سجل التدقيق: تسجيل كل عملية لكل وكيل
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# تكوين خطاطيف مشترك: جميع الوكلاء يشاركون قدرة التدقيق
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### الخطوة 2: وكيل مراجعة الكود (للقراءة فقط)

```python
async def run_code_review(pr_diff: str) -> str:
    """وكيل للقراءة فقط، يراجع جودة الكود ويخرج تقريرًا منظمًا"""
    result_text = ""
    async for message in query(
        prompt=f"""Review the following PR diff from these dimensions:
1. Code conventions: naming, formatting, comments
2. Logic issues: edge cases, null pointer risks, race conditions
3. Performance risks: N+1 queries, memory leaks, unnecessary loops
4. Maintainability: oversized functions, unclear responsibilities, magic numbers

PR Diff:
{pr_diff}

Output JSON format: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### الخطوة 3: وكيل الفحص الأمني (للقراءة فقط)

```python
async def run_security_scan() -> str:
    """وكيل للقراءة فقط مركز على فحص الثغرات"""
    result_text = ""
    async for message in query(
        prompt="""Scan the project code for security vulnerabilities:
1. SQL injection, XSS, CSRF
2. Hardcoded keys or credentials
3. Insecure dependency versions
4. Missing permission checks

Output JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### الخطوة 4: وكيل الإصلاح التلقائي (قابل للكتابة)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """وكيل قابل للكتابة يصلح الكود تلقائيًا بناءً على نتائج المراجعة والفحص"""
    result_text = ""
    async for message in query(
        prompt=f"""Fix code according to the following review results:

Code review report:
{review_result}

Security scan report:
{security_result}

Fix rules:
1. Only fix issues with severity high or critical
2. Run related tests after each change to ensure no existing functionality is broken
3. Do not refactor unrelated code, apply minimal fixes only
4. Output the list of modified files after completion""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### الخطوة 5: تحقق من الاختبارات + توليد التقرير

```python
async def run_test_and_report(fix_result: str) -> str:
    """تشغيل الاختبارات وتوليد التقرير النهائي"""
    result_text = ""
    async for message in query(
        prompt=f"""Execute these actions:
1. Run the full test suite (npm test or pytest)
2. Compute test pass rate
3. Generate a Markdown quality report into pr-report.md, including:
   - Count of issues found in code review and severity distribution
   - Number of security vulnerabilities
   - Auto-fix changes: {fix_result}
   - Test pass rate
   - Final conclusion: whether merge is recommended""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### الخطوة 6: ربط خط الأنابيب بالكامل

```python
import subprocess

async def run_pipeline():
    """خط أنابيب حماية جودة PR الكامل"""
    print("🔍 المرحلة 1/4: مراجعة الكود...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ المرحلة 2/4: الفحص الأمني...")
    security_result = await run_security_scan()

    print("🔧 المرحلة 3/4: الإصلاح التلقائي...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ المرحلة 4/4: التحقق من الاختبارات + توليد التقرير...")
    report = await run_test_and_report(fix_result)

    # حفظ سجل التدقيق
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"انتهى خط الأنابيب، تم حفظ سجل التدقيق ({len(audit_log)} سجل عمليات)")
    return report

asyncio.run(run_pipeline())
```

### التفكير في التصميم المؤسسي

يعكس خط الأنابيب هذا عدة مبادئ تصميم مؤسسية رئيسية:

**أقل امتياز**: وكلاء مراجعة الكود والفحص الأمني للقراءة فقط ولا يمكنهم تعديل الكود عن طريق الخطأ. فقط وكيل الإصلاح التلقائي لديه صلاحية الكتابة، وحتى ذلك مقيد بـ `acceptEdits`.

**قابلية التدقيق**: كل خطوة لكل وكيل تُسجل عبر الخطاطيف. إذا حدث خطأ ما، يمكنك تتبع أي وكيل فعل ماذا ومتى.

**تسلسل النتائج**: مخرجات كل وكيل تصبح مدخلات الوكيل التالي. نتائج المراجعة تغذي الإصلاح التلقائي؛ نتائج الإصلاح التلقائي تغذي التحقق من الاختبارات. كل مرحلة لها عقد مدخلات/مخرجات واضح.

**التحكم في التكلفة**: كل وكيل لديه حد `max_turns` لمنع الحلقات الجامحة. في الإنتاج، يمكنك أيضًا إضافة `max_budget_usd` للتحكم في الميزانية.

**القابلية للتوسع**: تريد مرحلة إضافية، مثل "وكيل فحص الوثائق" أو "وكيل اختبار الأداء"؟ أضف دالة جديدة وأدرجها في خط الأنابيب.

هذا النموذج يمكن تضمينه مباشرة في GitHub Actions أو GitLab CI، ويُطلق تلقائيًا عند كل PR، محققًا فعلًا "حواجز جودة كود مدعومة بالذكاء الاصطناعي."

---

## معالجة الأخطاء

يوفر Agent SDK أنواع استثناءات واضحة حتى تتمكن من بناء تحمل للأخطاء قوي في الإنتاج:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Analyze code"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI غير مثبت. يرجى تثبيته أولاً.")
except ProcessError as e:
    print(f"العملية خرجت بشكل غير متوقع بكود الخروج: {e.exit_code}")
```

---

## الخلاصة

القيمة الأساسية لـ Claude Agent SDK هي ترقية "استدلال النموذج" إلى "تنفيذ مُتحكم فيه." إنه لا يولد النص فقط. بل يمكنه فعلًا إكمال المهام داخل نظام أدوات قابل للتدقيق ومقيد.

تذكر سطرًا من مدونة Anthropic الرسمية: فلسفة تصميم Agent SDK هي "أعط الوكيل حاسوبًا واجعله يعمل مثل إنسان."

تطبيق وكيل جيد = تصميم أدوات واضح + حدود مهام صريحة + إشراف بشري مناسب. الأدوات تعطي الوكيل القدرة، الحدود تعطيه القيود، والإشراف يعطيك الثقة. الثلاثة لا يمكن الاستغناء عن أي منها.

---

## المراجع

### الموارد الرسمية

- [وثائق Agent SDK الرسمية](https://platform.claude.com/docs/en/agent-sdk/overview) - المرجع الأكثر موثوقية
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - مصدر SDK لـ Python
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - مصدر SDK لـ TypeScript
- [مشاريع تجريبية لـ Agent SDK](https://github.com/anthropics/claude-agent-sdk-demos) - مساعد بريد، وكيل بحث، والمزيد

### المدونات والدروس

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - مدونة Anthropic الهندسية عن فلسفة التصميم والبنية المعمارية
- [دليل دراسة Claude Agent SDK Python](https://redreamality.com/blog/claude-agent-sdk-python-) - درس كامل من الصفر صديق للصينيين
- [دليل Claude Agent SDK الشامل](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - دليل عملي لأنظمة الأدوات وحلقة الوكيل والتنفيذ المُتحكم
- [12 سيناريو عملي لـ Agent SDK](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - يغطي البرمجة والبيانات والأتمتة والمزيد
- [دليل Agent خطوة بخطوة](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - درس بمسارين TypeScript + Python
