# كيف تبني تطبيق Qt صناعي لسطح المكتب: نظام مراقبة مضخات HMI

# الفصل 1: ما هو HMI الصناعي وما هو تطوير Qt

في هذا الدرس التعليمي، سنكمل حلقة مغلقة كاملة: بناء نظام مراقبة مضخات صناعي HMI (واجهة الإنسان-الآلة) من الصفر باستخدام Qt. يمكنه قراءة بيانات المستشعرات في الوقت الفعلي، ورسم مخططات اتجاه الضغط، وتشغيل إنذارات تلقائية عند تجاوز الحد، وتسجيل سجلات الأعطال. العملية بالكامل تستخدم برامج محاكاة مجانية على الكمبيوتر بدلاً من الأجهزة الصناعية الحقيقية.

لهذا الدرس، يجب أن تمتلك على الأقل:

- جهاز كمبيوتر (Windows أو Mac، يُوصى بـ Windows لتوافق أفضل مع البرامج الصناعية)
- بيئة تطوير Qt 6.5 (Qt Creator + وحدات Qt Serial Bus + Qt Charts)
- برمجية محاكاة Modbus Slave (تنزيل مجاني، تعمل كـ "مضخة افتراضية")
- مساعد البرمجة بالذكاء الاصطناعي الخاص بك (Cursor / Trae / Claude Code)

> **صفر أجهزة، صفر تكلفة**: استخدم برمجية محاكاة مجانية على الكمبيوتر (Modbus Slave) كجهاز المستوى الأدنى؛ لا حاجة لشراء أجهزة. استخدم وحدات Qt الرسمية `QModbusTcpClient` + Qt Charts مباشرة، لا حاجة لتحليل البروتوكول يدويًا. بعد التشغيل، سترى اتجاهات ضغط في الوقت الفعلي، وإنذارات منبثقة عند تجاوز الحد، وسجلات أعطال، متطابقة مع سير العمل الحقيقي في المصنع.

## 1.1 ما هو الكمبيوتر العلوي والكمبيوتر السفلي؟

في الأتمتة الصناعية، هناك مفهومان يجب فهمهما: **الكمبيوتر العلوي** و **الكمبيوتر السفلي**.

**الكمبيوتر السفلي**: "اليدان والقدمان" في الموقع

الكمبيوتر السفلي هو وحدة التحكم التي تتفاعل مباشرة مع الأجهزة الفيزيائية. في المصانع، يكون عادةً **PLC (وحدة التحكم المنطقية القابلة للبرمجة)** أو **مستشعر**، ومسؤول عن:

* قراءة بيانات الموقع (الحرارة، الضغط، التدفق، مستوى السائل، إلخ)
* التحكم في إجراءات الأجهزة (تشغيل المضخة، إغلاق الصمام، تعديل السرعة، إلخ)
* تشغيل المنطق المُعرّف مسبقًا تلقائيًا (مثلاً إيقاف المضخة عند تجاوز الضغط للحد)

يمكنك التفكير في الكمبيوتر السفلي كـ "عامل" في أرضية المصنع. لا يحتاج إلى تفكير معقد، لكن يجب تنفيذ المهام بشكل موثوق.

**الكمبيوتر العلوي**: "العينان والدماغ" في غرفة التحكم

الكمبيوتر العلوي هو برنامج مراقبة يعمل على كمبيوتر أو كمبيوتر صناعي، وهو **HMI (واجهة الإنسان-الآلة)** التي سنقوم ببنائها اليوم. وهو مسؤول عن:

* عرض بيانات الموقع في الوقت الفعلي (أرقام، مخططات، رسوم متحركة)
* تسجيل البيانات التاريخية وسجلات الإنذارات
* تمكين التحكم عن بُعد للمشغلين
* توفير تحليل البيانات والتقارير

يمكنك التفكير في الكمبيوتر العلوي كـ "مركز مراقبة" المصنع. يمكن للمشغلين فهم حالة المصنع من الشاشة.

**كيف يتواصلان؟**

يتبادل الكمبيوتر العلوي والسفلي البيانات من خلال **بروتوكولات الاتصال الصناعي**. الأكثر شيوعًا هو **Modbus**، بروتوكول "مخضرم" وُلد عام 1979. لا يزال يُستخدم على نطاق واسع لأنه بسيط وموثوق وتدعمه جميع الأجهزة الصناعية تقريبًا.

```text
غرفة التحكم                           أرضية المصنع
┌──────────┐    بروتوكول Modbus    ┌──────────┐
│ الكمبيوتر│ ◄──────────────────►  │ الكمبيوتر│
│ العلوي   │   "أخبرني بالضغط"      │ السفلي   │
│ (Qt HMI) │   "الضغط 1.20MPa"     │ (PLC/مستشعر)│
│ عرض      │                       │ قراءة بيانات│
│ تسجيل    │                       │ تحكم     │
│ إنذارات  │                       │ حماية    │
└──────────┘                       └──────────┘
```

## 1.2 ما هو بروتوكول Modbus؟

Modbus هو "اللغة المشتركة" للاتصال الصناعي. يحدد كيف "يتحدث" الكمبيوتر العلوي والسفلي.

**مفهومان أساسيان فقط:**

* **السجل (Register)**: "خلايا" البيانات في الكمبيوتر السفلي. لكل واحد عنوان (`0`، `1`، `2`، ...)، يخزن رقمًا. مثلاً، العنوان `0` يخزن الضغط والعنوان `1` يخزن الحرارة.
* **عمليات القراءة/الكتابة**: يمكن للكمبيوتر العلوي قراءة السجلات (الحصول على البيانات) أو كتابة السجلات (إرسال أوامر تحكم).

**نوعان شائعان من Modbus:**

| النوع | طريقة النقل | السيناريو النموذجي |
|------|---------|---------|
| Modbus RTU | تسلسلي (RS-485/RS-232) | مسافة قصيرة، اتصال مباشر بالجهاز |
| Modbus TCP | إيثرنت (TCP/IP) | مسافة طويلة، اتصال شبكي |

يستخدم هذا الدرس **Modbus TCP**. نظرًا لأنه مبني على الشبكة، يمكن لتطبيق الكمبيوتر العلوي ومحاكي الكمبيوتر السفلي العمل على نفس الجهاز بدون أسلاك فعلية.

## 1.3 لماذا تختار Qt؟

Qt هو إطار عمل من أفضل الخيارات للبرمجيات الصناعية. العديد من واجهات المراقبة في المصانع والمستشفيات وأنظمة النقل مبنية بـ Qt. الأسباب بسيطة:

| الميزة | الشرح |
|------|------|
| مشترك بين المنصات | قاعدة كود واحدة تُجمع إلى Windows وLinux والأجهزة المدمجة |
| دعم بروتوكول صناعي مدمج | Qt Serial Bus يدعم Modbus أصلاً، لا حاجة لمكتبة طرف ثالث |
| رسم بياني قوي | Qt Charts يوفر مخططات احترافية في الوقت الفعلي |
| أداء عالي | أساس C++ مناسب لتحديث البيانات في الوقت الفعلي |
| ناضج ومستقر | تاريخ 30 عامًا، مثبت في المجال الصناعي |

## 1.4 ماذا سنقوم ببنائه؟

سنقوم ببناء **نظام مراقبة مضخات HMI** يحاكي مراقبة ضغط المضخات الحقيقية في المصنع:

| الوظيفة | الوصف |
|------|------|
| قراءة البيانات في الوقت الفعلي | قراءة الضغط من الكمبيوتر السفلي كل ثانية |
| مخطط اتجاه الضغط | مخطط خطي لآخر 60 ثانية من الضغط |
| إنذار تجاوز الحد | تحذير منبثق وواجهة حمراء عند تجاوز الضغط للحد |
| سجل الأعطال | تسجيل جميع أحداث الإنذار في قاعدة بيانات للاستعلام التاريخي |
| تحكم يدوي | تشغيل/إيقاف المضخة بنقرة واحدة (كتابة سجل الكمبيوتر السفلي) |

## 1.5 خريطة طريق الدرس

سنكمل العملية بهذه الخطوات:

1. **تحضير البيئة والكمبيوتر السفلي المحاكى** (دقيقتان): تثبيت Qt 6.5 ومحاكي Modbus Slave
2. **إنشاء مشروع Qt والاتصال بـ Modbus** (3 دقائق): إنشاء اتصال بين التطبيق العلوي والمحاكي
3. **تنفيذ القراءة والعرض في الوقت الفعلي** (3 دقائق): قراءة ضغط دورية وتحديث واجهة المستخدم
4. **رسم مخطط اتجاه الضغط في الوقت الفعلي** (3 دقائق): مخطط خطي ديناميكي باستخدام Qt Charts
5. **تنفيذ الإنذارات وسجلات الأعطال** (3 دقائق): إنذار تجاوز الحد + تسجيل SQLite
6. **التغليف والنشر** (اختياري): تغليف التطبيق في ملف تنفيذي مستقل

# الفصل 2: تحضير البيئة والكمبيوتر السفلي المحاكى (دقيقتان)

## 2.1 تثبيت Qt 6.5

يوفر Qt نسخة مفتوحة المصدر مجانية، تكفي لهذا الدرس.

1. قم بزيارة [موقع Qt الرسمي](https://www.qt.io/download-qt-installer) وقم بتنزيل Qt Online Installer
2. شغّل المثبت، سجّل الدخول أو أنشئ حساب Qt (مجاني)
3. في اختيار المكونات، حدد:
   - **Qt 6.5.x** (أو أحدث)
   - **Qt Serial Bus** تحت **Additional Libraries** (دعم Modbus)
   - **Qt Charts** تحت **Additional Libraries** (عرض المخططات)
   - **Qt Creator** (بيئة التطوير، عادةً محدد افتراضيًا)
4. انقر تثبيت وانتظر

> **نصيحة**: إذا كان Qt مثبتًا بالفعل لكن Serial Bus أو Charts مفقودان، أعِد تشغيل Qt Maintenance Tool وأضف المكونات.

## 2.2 تثبيت Modbus Slave: "المضخة الافتراضية" الخاصة بك

Modbus Slave هو محاكي Modbus slave مجاني. يمكنه محاكاة جهاز صناعي (PLC/مستشعر) على الكمبيوتر ليكون لديك ما تتواصل معه تطبيقاتك العلوية.

1. قم بزيارة [modbustools.com](https://www.modbustools.com/modbus_slave.html) وقم بتنزيل Modbus Slave
2. ثبته وافتحه
3. كوّن الاتصال:
   - القائمة **Connection -> Connect**
   - اختر **Modbus TCP/IP**
   - عنوان IP: `127.0.0.1` (localhost)
   - المنفذ: `502` (منفذ Modbus TCP الافتراضي)
   - انقر **OK** لبدء الاستماع

4. عيّن البيانات المحاكاة:
   - سترى جدول سجلات، كل صف هو عنوان سجل (`0`، `1`، `2`، ...)
   - انقر نقرًا مزدوجًا على القيمة عند العنوان **0**، غيّرها إلى **120** (تعني ضغط 1.20 MPa، يُقسم على 100 في التطبيق)
   - انقر نقرًا مزدوجًا على القيمة عند العنوان **1**، غيّرها إلى **350** (تعني حرارة 35.0°C)
   - انقر نقرًا مزدوجًا على القيمة عند العنوان **2**، غيّرها إلى **1** (حالة المضخة: `1=تعمل`، `0=متوقفة`)

الآن Modbus Slave هو "مضختك الافتراضية التي تعمل على مدار الساعة." أبقِ النافذة مفتوحة؛ ستستمر في الاستجابة لطلبات القراءة/الكتابة.

> **نصيحة المحاكاة الديناميكية**: يدعم Modbus Slave الزيادة التلقائية/التغيير العشوائي. انقر بزر الماوس الأيمن على قيمة السجل واختر "Auto increment" أو "Random" لمحاكاة تقلبات المستشعرات الواقعية.

# الفصل 3: إنشاء مشروع Qt والاتصال بـ Modbus (3 دقائق)

## 3.1 إنشاء مشروع Qt جديد

افتح Qt Creator وأنشئ مشروعًا جديدًا:

1. انقر **File -> New Project**
2. اختر **Application (Qt) -> Qt Widgets Application**
3. اسم المشروع: **PumpHMI**
4. حدد طقم Qt 6.5 المثبت
5. أكمل الإنشاء

افتح `PumpHMI.pro` (أو `CMakeLists.txt` إذا كنت تستخدم CMake)، وأضف الوحدات الرئيسية:

```pro
QT += core gui widgets serialbus charts sql
```

| الوحدة | الغرض |
|------|------|
| `serialbus` | يوفر `QModbusTcpClient` لاتصال Modbus TCP |
| `charts` | يوفر `QChart`، `QLineSeries` لمخطط الاتجاه في الوقت الفعلي |
| `sql` | يوفر `QSqlDatabase` لسجلات أعطال SQLite |

إذا كنت تستخدم CMake، التكوين المكافئ:

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 تعريف الأعضاء الأساسيين

اطلب من الذكاء الاصطناعي توليد ملف الرأس:

```text
يرجى مساعدتي في كتابة mainwindow.h مع الأعضاء الأساسيين لمراقبة مضخات HMI:
1. QModbusTcpClient لاتصال Modbus TCP
2. QTimer لقراءة البيانات الدورية
3. QChart + QLineSeries لمخطط الاتجاه في الوقت الفعلي
4. QSqlDatabase لتخزين سجلات الأعطال
5. عناصر واجهة المستخدم: تسمية الضغط، مؤشر الحالة، زر التشغيل/الإيقاف، جدول السجلات
```

الرأس الأساسي:

```cpp
// mainwindow.h
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QModbusTcpClient>
#include <QModbusDataUnit>
#include <QTimer>
#include <QtCharts>
#include <QSqlDatabase>
#include <QLabel>
#include <QPushButton>
#include <QTableWidget>

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void connectModbus();        // الاتصال بالكمبيوتر السفلي
    void readPressure();         // قراءة الضغط الدورية
    void onReadReady();          // استدعاء القراءة
    void triggerAlarm(float v);  // تشغيل الإنذار
    void togglePump();           // تشغيل/إيقاف المضخة

private:
    // اتصال Modbus
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // مخطط في الوقت الفعلي
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // قاعدة البيانات
    QSqlDatabase m_db;

    // عناصر واجهة المستخدم
    QLabel *m_pressureLabel = nullptr;    // عرض الضغط
    QLabel *m_statusLight = nullptr;      // مؤشر الحالة
    QPushButton *m_pumpButton = nullptr;  // زر التشغيل/الإيقاف
    QTableWidget *m_logTable = nullptr;   // جدول السجلات

    // حد الإنذار
    float m_alarmThreshold = 1.50f;  // إنذار فوق 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

## 3.3 بناء اتصال Modbus TCP

نفّذ منطق الاتصال في `mainwindow.cpp`:

```cpp
// mainwindow.cpp - قسم الاتصال
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // الاتصال بمحاكي Modbus Slave
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // مهلة 1 ثانية
    m_modbusClient->setNumberOfRetries(3);  // إعادة المحاولة 3 مرات

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("فشل الاتصال بالكمبيوتر السفلي!", 3000);
        return;
    }

    statusBar()->showMessage("تم الاتصال بالكمبيوتر السفلي (127.0.0.1:502)", 3000);

    // بدء المؤقت، قراءة كل ثانية
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1 ثانية
}
```

**ملاحظات الكود:**

| الكود | المعنى |
|------|------|
| `QModbusTcpClient` | عميل Modbus TCP مدمج في Qt، يتواصل مع الكمبيوتر السفلي |
| `NetworkPortParameter, 502` | الاتصال بالمنفذ `502` (نفس تكوين Modbus Slave) |
| `NetworkAddressParameter, "127.0.0.1"` | الاتصال بـ localhost (المحاكي يعمل محليًا) |
| `m_pollTimer->start(1000)` | استدعاء `readPressure()` كل ثانية |

## 3.4 قراءة بيانات الضغط

```cpp
// mainwindow.cpp - قسم القراءة
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // بناء طلب قراءة: البدء من العنوان 0، قراءة 3 سجلات احتجازية
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // نوع السجل
        0,                                   // عنوان البداية
        3                                    // الكمية
    );

    // إرسال طلب قراءة غير متزامن
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // طلب بث، حذف مباشر
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // تحليل القيم (قسم قيمة السجل للوحدات الحقيقية)
        float pressure = unit.value(0) / 100.0f;   // عنوان 0: ضغط (MPa)
        float temperature = unit.value(1) / 10.0f;  // عنوان 1: حرارة (°C)
        int pumpStatus = unit.value(2);              // عنوان 2: حالة المضخة

        // تحديث واجهة المستخدم
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // فحص الإنذار
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // تحديث مخطط الاتجاه (يُنفذ في الفصل التالي)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("فشلت القراءة: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**تدفق قراءة Modbus:**

```text
readPressure() يُشغلها المؤقت
    -> بناء QModbusDataUnit ("اقرأ العناوين 0-2")
    -> sendReadRequest() إرسال غير متزامن (واجهة المستخدم غير محظورة)
    -> الكمبيوتر السفلي يُرجع البيانات
    -> onReadReady() يُشغل
    -> تحليل قيم السجلات وتحديث واجهة المستخدم
```

# الفصل 4: رسم اتجاه الضغط في الوقت الفعلي (3 دقائق)

## 4.1 تهيئة المخطط

يوفر Qt Charts مكونات مخططات احترافية. اطلب من الذكاء الاصطناعي التهيئة في المُنشئ:

```text
يرجى مساعدتي في تهيئة مخطط خطي في الوقت الفعلي من Qt Charts في مُنشئ MainWindow:
1. إنشاء QChart وQLineSeries
2. المحور X يستخدم QDateTimeAxis، يعرض آخر 60 ثانية
3. المحور Y يستخدم QValueAxis، المدى 0-3.0 MPa
4. لون الخط أزرق، العرض 2px
5. ضع المخطط في QChartView وأضفه إلى التخطيط
```

الكود الأساسي:

```cpp
// mainwindow.cpp - تهيئة المخطط
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pressure (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Real-time Pressure Trend");
    m_chart->setAnimationOptions(QChart::NoAnimation); // بدون رسوم متحركة للبيانات في الوقت الفعلي

    // المحور X: الوقت
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Time");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // المحور Y: الضغط
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pressure (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // إنشاء عرض المخطط
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // إضافة إلى التخطيط (بافتراض وجود centralLayout)
    centralLayout->addWidget(chartView);
}
```

## 4.2 تحديث المخطط في الوقت الفعلي

في كل مرة تُقرأ قيمة ضغط جديدة، أضف نقطة واحدة واحتفظ بآخر 60 ثانية فقط:

```cpp
// mainwindow.cpp - تحديثات المخطط
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // إضافة نقطة جديدة
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // الاحتفاظ بآخر 60 ثانية فقط
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // تحديث مدى المحور X: دائمًا عرض آخر 60 ثانية
    m_axisX->setRange(cutoff, now);
}
```

ثم استدعِها في `onReadReady()`:

```cpp
// أضف بعد تحليل الضغط في onReadReady():
updateChart(pressure);
```

الآن شغّل البرنامج. سترى خطًا أزرق يتحدث في الوقت الفعلي، نقطة واحدة كل ثانية، يعرض دائمًا آخر 60 ثانية. إذا عدّلت قيم السجلات في Modbus Slave يدويًا، سيعكس الخط التغييرات فورًا.

> **نصيحة أداء**: `QChart::NoAnimation` مهمة. البيانات في الوقت الفعلي تتحدث كل ثانية؛ الرسوم المتحركة يمكن أن تسبب تأخرًا في واجهة المستخدم. هذه ممارسة شائعة في HMI الصناعي.

# الفصل 5: نظام الإنذارات وسجلات الأعطال (3 دقائق)

## 5.1 إنذار تجاوز الحد

عندما يتجاوز الضغط الحد، نحتاج إلى: تحذير أحمر في واجهة المستخدم + تنبيه منبثق + تسجيل في السجل.

```cpp
// mainwindow.cpp - منطق الإنذار
void MainWindow::triggerAlarm(float pressure)
{
    // تحويل واجهة المستخدم إلى الأحمر
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // مؤشر الحالة أحمر
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // إنذار منبثق (فقط عند تجاوز الحد لأول مرة لتجنب المنبثقات المتكررة)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Pressure Alarm",
            QString("الضغط الحالي %1 MPa يتجاوز الحد %2 MPa!\nيرجى التحقق من حالة المضخة فورًا.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // التسجيل في قاعدة البيانات
    logAlarm(pressure,
        QString("ضغط يتجاوز الحد: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // إعادة التعيين عند عودة الضغط لطبيعته
    if (pressure <= m_alarmThreshold) {
        alarmActive = false;
        m_pressureLabel->setStyleSheet(
            "color: #2196F3; font-size: 32px; padding: 10px;");
        m_statusLight->setStyleSheet(
            "background-color: #4CAF50; border-radius: 12px;"
            "min-width: 24px; min-height: 24px;");
    }
}
```

## 5.2 سجلات أعطال SQLite

يجب على الأنظمة الصناعية تسجيل جميع أحداث الإنذارات للقابلية للتتبع. نستخدم SQLite:

```cpp
// mainwindow.cpp - تهيئة قاعدة البيانات
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "لا يمكن فتح قاعدة البيانات:" << m_db.lastError().text();
        return;
    }

    // إنشاء جدول الإنذارات
    QSqlQuery query;
    query.exec(
        "CREATE TABLE IF NOT EXISTS alarm_log ("
        "  id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,"
        "  pressure REAL,"
        "  message TEXT"
        ")"
    );
}
```

## 5.3 التسجيل وعرض السجلات

```cpp
// mainwindow.cpp - كتابة السجلات
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // الكتابة في قاعدة البيانات
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // تحديث الجدول على الشاشة
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // التمرير التلقائي إلى آخر صف
    m_logTable->scrollToBottom();
}
```

جدول السجلات لديه ثلاثة أعمدة: الوقت، قيمة الضغط، ورسالة الإنذار. كل إنذار يضيف صفًا واحدًا ويُخزن في SQLite.

## 5.4 تشغيل/إيقاف المضخة يدويًا

بالإضافة إلى قراءة البيانات، يجب أن يتحكم الكمبيوتر العلوي بالكمبيوتر السفلي أيضًا. نفعل ذلك بكتابة قيم السجلات:

```cpp
// mainwindow.cpp - التحكم بالمضخة
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // بناء طلب كتابة: كتابة 1 (تشغيل) أو 0 (إيقاف) في العنوان 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "إيقاف المضخة" : "تشغيل المضخة");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "تم تشغيل المضخة" : "تم إيقاف المضخة", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

في Modbus Slave، سترى العنوان `2` يتبدل بين `0` و `1` كلما نقرت على الزر. هذه هي عملية "التحكم" بالكمبيوتر العلوي.

# الفصل 6: التغليف والنشر (اختياري)

## 6.1 التغليف باستخدام windeployqt / macdeployqt

يوفر Qt أدوات نشر رسمية لجمع المكتبات الديناميكية المطلوبة تلقائيًا.

**Windows:**

```bash
# بناء Release أولاً، ثم شغّل في دليل البناء:
windeployqt PumpHMI.exe
```

ينسخ `windeployqt` ملفات Qt DLL والإضافات وملفات الترجمة بجوار الملف التنفيذي. يمكن إرسال هذا المجلد المُغلف مباشرة.

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

هذا يُنشئ صورة مثبت `.dmg`.

## 6.2 بناء مثبت باستخدام Qt Installer Framework

إذا كنت تريد معالج إعداد احترافي ("التالي -> التالي -> إنهاء")، استخدم Qt Installer Framework:

```text
يرجى مساعدتي في إنشاء مثبت لـ PumpHMI باستخدام Qt Installer Framework:
1. إنشاء هيكل دليل المثبت (config، packages)
2. تكوين config.xml (اسم المثبت، الإصدار، دليل الهدف)
3. وضع مخرجات windeployqt في packages/com.example.pumphmi/data/
4. تشغيل binarycreator لتوليد المثبت
```

# الفصل 7: الخلاصة

تهانينا! لقد بنيت نظام مراقبة مضخات صناعي HMI من الصفر. استرجاع:

1. فهم المفاهيم الأساسية للكمبيوتر العلوي والكمبيوتر السفلي وبروتوكول Modbus
2. محاكاة "مضخة افتراضية" باستخدام Modbus Slave، بدون أجهزة حقيقية
3. بناء اتصال علوي-سفلي باستخدام Qt `QModbusTcpClient`
4. رسم مخطط اتجاه ضغط متدحرج في الوقت الفعلي باستخدام Qt Charts
5. تنفيذ إنذارات منبثقة عند تجاوز الحد وسجلات أعطال SQLite
6. تنفيذ التحكم عن بُعد في تشغيل/إيقاف المضخة

العملية بالكاملة لم تستخدم أجهزة صناعية حقيقية، لكن البنية والوظائف تتطابق مع أنظمة HMI الحقيقية في المصانع. إذا استبدلت Modbus Slave بـ PLC حقيقي، يمكن استخدام هذا التطبيق في سيناريوهات الإنتاج مباشرة.

**اتجاهات متقدمة:**

* **مراقبة أجهزة متعددة**: الاتصال بأجهزة كمبيوتر سفلى متعددة واستخدام علامات تبويب/عرض مقسم لبيانات أجهزة مختلفة
* **إعادة التشغيل التاريخي**: قراءة البيانات التاريخية من SQLite وإعادة تشغيل مخططات الاتجاه مع عناصر تحكم الخط الزمني
* **بروتوكول OPC UA**: Modbus يناسب السيناريوهات الأبسط؛ الأنظمة الصناعية المعقدة تستخدم غالبًا OPC UA، وهو مدعوم أيضًا من Qt (وحدة Qt OPC UA)
* **مراقبة عن بُعد عبر الويب**: استخدام Qt WebSocket لدفع البيانات في الوقت الفعلي إلى المتصفح للعرض على الهاتف
* **الصيانة التنبؤية بالذكاء الاصطناعي**: تغذية بيانات الضغط التاريخية لنماذج ML للتنبؤ بالأعطال مسبقًا

***استخدم الكود لحماية كل جهاز في العمليات الصناعية.***

# المراجع

* [وثائق Qt Serial Bus](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [مثال Qt Modbus TCP Client](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [وثائق Qt Charts](https://doc.qt.io/qt-6/qtcharts-index.html)
* [مواصفات بروتوكول Modbus](https://modbus.org/specs.php)
* [محاكي Modbus Slave](https://www.modbustools.com/modbus_slave.html)
* [وثائق Qt Installer Framework](https://doc.qt.io/qtinstallerframework/)
