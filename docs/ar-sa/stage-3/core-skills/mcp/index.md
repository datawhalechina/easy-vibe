# دليل Claude Code MCP الكامل

## ما هو Claude Code MCP؟

**Claude Code** هي أداة سطر الأوامر الرسمية للذكاء الاصطناعي من Anthropic، بينما **MCP (بروتوكول سياق النموذج)** هو البروتوكول الذي يتيح لـ Claude Code الاتصال بأدوات وخدمات خارجية.

ببساطة، MCP يحول Claude Code من مساعد ذكاء اصطناعي يمكنه فقط قراءة وكتابة الملفات المحلية إلى مساعد خارق يمكنه الوصول إلى GitHub وقواعد البيانات و APIs والخدمات السحابية.

## لماذا تستخدم MCP في Claude Code؟

### Claude Code بدون MCP

```text
ما يمكنك فعله:
✓ قراءة الملفات المحلية
✓ تعديل الكود
✓ تشغيل الأوامر
✓ استخدام أدوات Bash

ما لا يمكنك فعله:
✗ عرض GitHub Issues الخاص بك
✗ الوصول لقاعدة بيانات سحابية
✗ استدعاء APIs خارجية
✓ الحصول على حالة الطقس في الوقت الفعلي
```

### Claude Code مع MCP

```text
ما يمكنك فعله:
✓ جميع الوظائف الأصلية
✓ عرض / إنشاء GitHub Issues و PRs
✓ استعلام قواعد بيانات SQLite و PostgreSQL
✓ الوصول لخدمات خارجية مثل Notion و Slack
✓ الحصول على حالة الطقس وبيانات الخرائط في الوقت الفعلي
✓ أتمتة المتصفح
✓ ...والمزيد
```

## البدء السريع

### الخطوة 1: فهم أين تعيش ملفات الإعدادات

ملفات إعدادات MCP لـ Claude Code تقع في:

| المستوى | مسار ملف الإعدادات | النطاق |
|-----|-------------|----------|
| **مستوى المستخدم** | `~/.claude.json` | جميع المشاريع |
| **مستوى المشروع** | `.claude/mcp.json` | المشروع الحالي |

يُنصح باستخدام **إعدادات مستوى المشروع** أولاً، حتى تتمكن المشاريع المختلفة من استخدام خدمات MCP مختلفة.

### الخطوة 2: إضافة خوادم MCP بلغة طبيعية

في Claude Code، لا تحتاج لتعديل ملفات الإعدادات يدويًا أو حفظ الأوامر. يمكنك وصف ما تريد بلغة طبيعية:

```text
أنت: ساعدني في إضافة خادم GitHub MCP. الرمز الخاص بي هو ghp_xxx

Claude: سأساعدك في إعداد خادم GitHub MCP...

[يحدّث .claude/mcp.json تلقائيًا]
```

```text
أنت: أضف خادم قاعدة بيانات SQLite. ملف قاعدة البيانات في ./data/app.db

Claude: حسنًا، سأُعد خادم SQLite MCP...
```

```text
أنت: أضف خادم MCP من نوع HTTP بالعنوان https://api.example.com/mcp

Claude: سأضيف خادم MCP البعيد...
```

### الخطوة 3: التحقق من الإعدادات

اسأل Claude Code مباشرة:

```text
أنت: ما خوادم MCP المتاحة الآن؟

Claude: خوادم MCP المُعدة حاليًا:
• github - تكامل GitHub
• sqlite - قاعدة بيانات SQLite
• filesystem - الوصول لنظام الملفات
```

أو استخدم أمر التشخيص:

```text
/doctor
```

### الخطوة 4: ابدأ الاستخدام

بمجرد نجاح الإعداد، يمكنك استدعاء وظائف MCP مباشرة بلغة طبيعية:

```text
أنت: ساعدني في إنشاء Issue على GitHub

Claude: يمكنني مساعدتك في إنشاء GitHub Issue. أرجو إخباري:
- عنوان المستودع، مثلاً owner/repo
- عنوان Issue
- وصف Issue
```

## إدارة اللغة الطبيعية في Claude Code

### عرض وإدارة خوادم MCP

يمكنك التفاعل مع Claude Code بالكامل بلغة طبيعية:

```text
أنت: اعرض جميع خوادم MCP المُعدة

أنت: تحقق من حالة اتصال خوادم MCP

أنت: احذف خادم MCP المسمى notion

أنت: حدّث الرمز لخادم github
```

### تشخيص المشاكل

عندما تواجه مشاكل:

```text
أنت: تحقق مما هو خطأ في اتصال MCP

Claude: [سيشغل التشخيص تلقائيًا، يحلل ملفات الإعدادات، ويتحقق من حالة الخادم]
```

## طرق الإعداد بالتفصيل

### إعدادات مستوى المستخدم، عالمية

عدّل `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### إعدادات مستوى المشروع، موصى بها

عدّل `.claude/mcp.json` في جذر المشروع:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**مزايا إعدادات مستوى المشروع:**

- يمكن لأعضاء الفريق مشاركة الإعدادات عبر الالتزام بها في Git
- المشاريع المختلفة يمكنها استخدام خدمات MCP مختلفة
- الإعدادات أكثر مرونة ولا تلوث الإعدادات العامة

### أوضاع النقل

يدعم Claude Code ثلاثة أوضاع نقل:

#### STDIO، عملية محلية

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP، خدمة بعيدة

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE، أحداث مرسلة من الخادم

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## أمثلة عملية

### مثال 1: أتمتة سير عمل GitHub

```text
أنت: ساعدني في دفع التغييرات الحالية إلى GitHub، ثم أنشئ PR بعنوان "Add new feature"

Claude:
1. التحقق من حالة git الحالية...
2. إنشاء فرع جديد feature/new-feature...
3. الالتزام بالتغييرات...
4. الدفع للبعيد...
5. استدعاء github_create_pull_request لإنشاء PR...
6. تم إنشاء PR: https://github.com/owner/repo/pull/123
```

### مثال 2: استعلام قاعدة بيانات

```text
أنت: استعلم عن أحدث 10 مستخدمين مسجلين في قاعدة البيانات

Claude:
1. الاتصال بقاعدة بيانات SQLite...
2. تنفيذ الاستعلام: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. إرجاع النتائج:
   - أحمد (ahmed@example.com) - 2025-02-28
   - سارة (sara@example.com) - 2025-02-27
   ...
```

### مثال 3: تحليل لقطة شاشة لصفحة ويب

```text
أنت: افتح https://example.com، التقط لقطة شاشة، وحلل تصميم الصفحة

Claude:
1. تشغيل المتصفح...
2. الانتقال إلى https://example.com...
3. التقاط لقطة شاشة...
4. [تُرجع لقطة الشاشة]
5. تحليل تصميم الصفحة:
   - يستخدم التخطيط تصميمًا مركزيًا بعرض أقصى 1200 بكسل
   - اللون الرئيسي أزرق (#3b82f6)
   - شريط التنقل ثابت في الأعلى
   ...
```

### مثال 4: التكامل مع Notion

```text
أنت: احفظ الملاحظات التي كتبتها للتو في Notion

Claude:
1. استخدام خادم Notion MCP...
2. إنشاء صفحة جديدة...
3. تم الحفظ: https://notion.so/page/xxx
```

## نصائح التصحيح

### التشخيص بلغة طبيعية

عندما يسير شيء خاطئ، أخبر Claude Code مباشرة:

```text
أنت: خادم MCP الخاص بي لا يمكنه الاتصال. أرجو فحصه من أجلي

أنت: فشل استدعاء أداة GitHub MCP. ما السبب؟

أنت: لماذا يعرض خادم sqlite دائمًا "connecting"؟
```

سيقوم Claude Code تلقائيًا:

1. التحقق من تنسيق ملف الإعدادات
2. التحقق من متغيرات البيئة
3. اختبار اتصال الخادم
4. تقديم اقتراحات إصلاح محددة

### استكشاف الأخطاء الشائعة وإصلاحها

| المشكلة | السبب المحتمل | الحل |
|-----|---------|----------|
| الخادم غير متصل | خطأ في تنسيق ملف الإعدادات | تحقق من بناء JSON |
| لا يمكن استدعاء الأداة | صلاحيات غير كافية | تحقق من متغيرات البيئة |
| انتهاء مهلة الاتصال | مشكلة في الشبكة | تحقق من URL أو الشبكة |
| تعطل العملية | خطأ في كود الخادم | تحقق من سجلات الخادم |

### أمر التشخيص اليدوي

```text
/doctor
```

مثال على المخرجات:

```text
تقرير تشخيص النظام:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

حالة خوادم MCP:
• github: ✓ متصل (12 أداة)
• sqlite: ✗ فشل الاتصال - ملف قاعدة البيانات غير موجود
• puppeteer: ✓ متصل (8 أدوات)

اقتراحات:
1. تحقق مما إذا كان مسار قاعدة بيانات sqlite صحيحًا
2. تأكد من أن تنسيق .claude/mcp.json صحيح
```

## أفضل الممارسات

### 1. فضّل الإعدادات على مستوى المشروع

**لماذا يُوصى بالإعدادات على مستوى المشروع؟**

المشاريع المختلفة غالبًا تحتاج خدمات MCP مختلفة. مثلاً، مشروع واجهة أمامية قد يحتاج أدوات اختبار المتصفح، بينما مشروع واجهة خلفية قد يحتاج اتصال قاعدة بيانات. مع الإعدادات على مستوى المشروع، يمكن لكل مشروع الحصول على مجموعته المخصصة من خوادم MCP، مما يتجنب فوضى إعدادات عامة كبيرة واحدة.

الأهم من ذلك، يمكن الالتزام بإعدادات مستوى المشروع في Git. بعد استنساخ أعضاء الفريق للمشروع، يمكنهم استخدام نفس خدمات MCP مباشرة بدون إعادة إعداد كل شيء.

```text
المشروع أ، مشروع واجهة أمامية -> .claude/mcp.json يحتوي على MCP اختبار المتصفح
المشروع ب، مشروع واجهة خلفية -> .claude/mcp.json يحتوي على MCP قاعدة بيانات
```

### 2. خزّن المعلومات الحساسة في متغيرات البيئة

**لا تقم أبدًا بتشفير الأسرار مباشرة في ملف الإعدادات.**

قد تُلتزم ملفات الإعدادات عن طريق الخطأ في Git وتسرب المفاتيح. النهج الصحيح هو تخزين القيم الحساسة في متغيرات البيئة والإشارة فقط لأسماء المتغيرات من ملف الإعدادات. بهذه الطريقة، حتى لو أصبح ملف الإعدادات عامًا، تبقى الأسرار الحقيقية مخفية.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

الشكل الأول جيد لأنه يقرأ من متغير البيئة. الشكل الثاني سيء لأنه يشفر سرًا مباشرة.

### 3. ثبّت الإصدارات

**لماذا تحتاج لتثبيت الإصدارات؟**

افتراضيًا، سيستخدم `npx -y` دائمًا أحدث نسخة من خادم MCP. هذا يمكن أن يسبب مشاكل: نسخة جديدة قد تقدم تغييرات جذرية، أو قد تُزال حزمة فجأة أو تُعاد تسميتها.

بإضافة `@version` لاسم الحزمة، تتأكد من استخدام نسخة محققة دائمًا، مما يقلل المفاجآت الناتجة عن الترقيات التلقائية.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. وثّق إعدادات MCP الخاصة بك

**ساعد زملائك في الفهم السريع لإعداد MCP**

عندما يتضمن المشروع خوادم MCP متعددة، قد لا يفهم الأعضاء الجدد في الفريق ماذا يفعل كل خادم أو ما الإعدادات المطلوبة. إنشاء `README.md` تحت دليل `.claude/` يشرح غرض كل خادم والإعدادات المطلوبة وكيفية الحصول على بيانات الاعتماد يمكن أن يقلل تكلفة التواصل بشكل كبير.

أنشئ `.claude/README.md` في مشروعك:

```markdown
# ملاحظات إعدادات MCP

خوادم MCP المستخدمة في هذا المشروع:

## github
تُستخدم لأتمتة GitHub. تتطلب GITHUB_TOKEN.

## sqlite
تتصل بـ ./data/app.db للاستعلام وتعديل البيانات.

## puppeteer
تُستخدم لاختبار E2E.
```

## Claude Code مقابل Claude Desktop

| الميزة | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **ملف الإعدادات** | `~/.claude.json` أو `.claude/mcp.json` | `claude_desktop_config.json` |
| **إعدادات مستوى المشروع** | ✓ مدعومة | ✗ غير مدعومة |
| **الإدارة بلغة طبيعية** | ✓ مدعومة | ✗ يتطلب تعديلًا يدويًا |
| **التشخيص** | ✓ `/doctor` | ✗ لا يوجد |
| **إعادة التحميل السريع** | ✓ تلقائية | ✗ يتطلب إعادة تشغيل التطبيق |
| **حالات الاستخدام** | سير عمل التطوير، CI/CD | الاستخدام اليومي، مهام المكتب |

## خوادم MCP الشائعة

> 💡 لقائمة خوادم MCP الكاملة، يرجى الرجوع للملحق: [دليل خوادم MCP](/ar-sa/appendix/8-artificial-intelligence/ai-protocols)

### خادم GitHub

**الوظيفة:** Issues، PRs، إدارة المستودعات

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**احصل على رمز من:** https://github.com/settings/tokens

### خادم SQLite

**الوظيفة:** استعلام وإدارة قواعد بيانات SQLite

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### خادم نظام الملفات

**الوظيفة:** الوصول للملفات داخل دليل محدد

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### أتمتة متصفح Puppeteer

**الوظيفة:** التحكم في المتصفح، لقطات الشاشة، الاختبار الآلي

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### خادم بحث Brave

**الوظيفة:** بحث الويب

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## مصادر مرجعية

### الوثائق الرسمية

- [وثائق Claude Code الرسمية - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [موقع MCP الرسمي](https://modelcontextprotocol.io/)
- [وثائق مواصفات MCP](https://modelcontextprotocol.io/specification/)
- [مستودع MCP على GitHub](https://github.com/modelcontextprotocol)

### الخوادم الرسمية

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - تكامل GitHub
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - قاعدة بيانات SQLite
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - قاعدة بيانات PostgreSQL
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - الوصول لنظام الملفات
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - أتمتة المتصفح
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - جلب الويب
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - بحث Brave
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - عمليات Git

### مقالات تعليمية

- [شرح شامل لمبادئ MCP وممارساتها](https://view.inews.qq.com/a/20250414A023WV00)
- [بنية MCP (بروتوكول سياق النموذج) وكيفية عمله](https://m.toutiao.com/w/1826385835060307/)
- [دليل النماذج الكبيرة 2025: من البداية لإتقان بروتوكول MCP](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [تعلم MCP من الصفر (8) - بناء خادم MCP](https://juejin.cn/post/7582510291667419187)

### أدلة الإعدادات

- [أفضل ممارسات Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices)
- [دليل إعدادات Claude Code الكامل](https://juejin.cn/post/7576838552472043563)

### دروس التطوير

- [دليل عملي لبناء خادم MCP للمبتدئين بـ TypeScript و Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [دليل بناء خادم MCP الشامل: دروس TypeScript و Python كاملة](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [بناء أبسط خادم MCP بـ TypeScript](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [توليد خادم MCP بـ TypeScript باستخدام تطبيقات حاويات Azure](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### موارد خوادم MCP

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - أكثر قائمة شاملة لخوادم MCP
- [سجل MCP الرسمي](https://registry.modelcontextprotocol.io) - متجر تطبيقات Anthropic الرسمي
- [MCP.so](https://mcp.so) - مركز خوادم MCP المجتمعي
- [Glama.ai MCP](https://glama.ai/mcp/servers) - دليل MCP مع تقييمات وتعليقات
- [Smithery](https://smithery.ai) - سوق خوادم MCP
- [MCPHub](https://mcphub.io/registry) - دليل بواجهة نظيفة
- [LobeHub MCP](https://lobehub.com/zh/mcp) - دليل MCP صيني

### خدمات الخرائط والطقس

- [خادم Amap MCP](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [وثائق خادم Tencent Location Service MCP](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [خادم Caiyun Weather MCP](https://github.com/caiyunapp/mcp-caiyun-weather)
- [خادم OpenWeatherMap MCP](https://github.com/CodeByWaqas/weather-mcp-server)

### موارد المجتمع

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - مجموعة إعدادات Claude Code بمستوى الإنتاج
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - مسار تعلم صيني لـ Claude Code

### حالات تطبيق حقيقية

- [BlenderMCP - نمذجة ثلاثية الأبعاد بالذكاء الاصطناعي](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [15 أفضل ممارسة لـ MCP في الإنتاج](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
