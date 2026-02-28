# 如何开发工业级 Qt 桌面应用——水泵监控 HMI 系统

# 第 1 章：什么是工业 HMI 和 Qt 开发

在这篇教程中，我们将完整跑通一条闭环：从零开始用 Qt 构建一个工业级的水泵监控 HMI（人机界面）系统，能实时读取传感器数据、绘制压力趋势图、超阈值自动报警、记录故障日志。全程使用 PC 上的免费模拟软件代替真实工控设备，不需要买任何硬件。

本次教程，你至少需要具备：

- 一台电脑（Windows 或 Mac 均可，推荐 Windows，工控软件兼容性更好）
- Qt 6.5 开发环境（Qt Creator + Qt Serial Bus + Qt Charts 模块）
- Modbus Slave 模拟软件（免费下载，充当"虚拟水泵"）
- 你的 AI 编程助手（Cursor / Trae / Claude Code）

> **零硬件、零成本**：全程用 PC 上的免费模拟软件（Modbus Slave）模拟下位机，不用买任何工控设备；代码直接用 Qt 官方的 QModbusTcpClient + Qt Charts 模块，不用手写协议解析；运行后能看到实时压力趋势图、超阈值弹窗报警、故障日志记录，和真实工厂现场效果一致。

## 1.1 什么是上位机和下位机？

在工业自动化领域，有两个你必须理解的概念：**上位机**和**下位机**。

**下位机（Lower Computer）**——现场的"手和脚"

下位机是直接和物理设备打交道的控制器。在工厂里，它通常是 **PLC（可编程逻辑控制器）** 或 **传感器**，负责：

* 读取现场数据（温度、压力、流量、液位……）
* 控制设备动作（启动水泵、关闭阀门、调节转速……）
* 按照预设逻辑自动运行（压力超标就停泵）

你可以把下位机理解为工厂里的"工人"——它不需要思考太多，但必须可靠地执行任务。

**上位机（Upper Computer）**——控制室的"眼睛和大脑"

上位机是运行在 PC 或工控机上的监控软件，也就是我们今天要开发的 **HMI（Human-Machine Interface，人机界面）**。它负责：

* 实时显示现场数据（数字、图表、动画）
* 记录历史数据和报警日志
* 让操作员远程控制设备
* 提供数据分析和报表

你可以把上位机理解为工厂的"监控中心"——操作员坐在屏幕前，就能掌握整个工厂的运行状态。

**它们之间怎么通信？**

上位机和下位机之间通过 **工业通信协议** 交换数据。最常用的协议就是 **Modbus**——一个诞生于 1979 年的"老前辈"，至今仍是工业领域使用最广泛的协议，因为它简单、可靠、几乎所有工控设备都支持。

```
控制室                              工厂现场
┌──────────┐    Modbus 协议    ┌──────────┐
│  上位机   │ ◄──────────────► │  下位机   │
│ (Qt HMI) │   "请告诉我压力"   │ (PLC/传感器)│
│          │   "压力是 1.20MPa" │          │
│ 显示数据  │                   │ 读取传感器 │
│ 记录日志  │                   │ 控制水泵  │
│ 报警提示  │                   │ 自动保护  │
└──────────┘                   └──────────┘
```

<!-- ![placeholder: 上位机和下位机的关系示意图，左边是控制室的 PC 屏幕（上位机），右边是工厂现场的 PLC 和水泵（下位机），中间用 Modbus 协议连接](images/image1.png) -->

## 1.2 什么是 Modbus 协议？

Modbus 是工业通信的"普通话"。它定义了上位机和下位机之间"怎么说话"的规则。

**核心概念只有两个：**

* **寄存器（Register）**：下位机中存储数据的"格子"。每个格子有一个地址（0、1、2……），里面存一个数字。比如地址 0 存压力值，地址 1 存温度值。
* **读/写操作**：上位机可以"读"寄存器（获取数据）或"写"寄存器（发送控制指令）。

**Modbus 有两种常见变体：**

| 变体 | 传输方式 | 适用场景 |
|------|---------|---------|
| Modbus RTU | 串口（RS-485/RS-232） | 短距离、设备直连 |
| Modbus TCP | 以太网（TCP/IP） | 远距离、网络通信 |

本教程使用 **Modbus TCP**，因为它基于网络，我们可以在同一台电脑上同时运行上位机和模拟下位机，不需要任何物理连线。

## 1.3 为什么选择 Qt？

Qt 是工业软件开发的首选框架之一，很多你在工厂、医院、交通系统中看到的监控界面都是用 Qt 开发的。原因很简单：

| 优势 | 说明 |
|------|------|
| 跨平台 | 一套代码编译到 Windows、Linux、嵌入式设备 |
| 内置工业协议 | Qt Serial Bus 模块原生支持 Modbus，不用第三方库 |
| 强大的图表 | Qt Charts 模块提供专业级实时图表 |
| 高性能 | C++ 底层，适合实时数据刷新 |
| 成熟稳定 | 30 年历史，工业领域验证充分 |

## 1.4 我们要做什么？

我们将构建一个 **水泵监控 HMI 系统**，模拟真实工厂中的水泵压力监控场景：

| 功能 | 说明 |
|------|------|
| 实时数据读取 | 每秒从下位机读取压力值并显示 |
| 压力趋势图 | 用折线图展示最近 60 秒的压力变化 |
| 超阈值报警 | 压力超过设定值时弹窗报警，界面变红 |
| 故障日志 | 所有报警事件记录到数据库，可查询历史 |
| 手动控制 | 一键启停水泵（写入下位机寄存器） |

<!-- ![placeholder: 水泵监控 HMI 系统效果预览图，展示实时压力数值、趋势图、报警指示灯、启停按钮和日志列表](images/image2.png) -->

## 1.5 本教程的路线图

我们将按以下步骤完成整个流程：

1. **准备环境和模拟下位机**（2 分钟）：安装 Qt 6.5 和 Modbus Slave 模拟器
2. **创建 Qt 项目并连接 Modbus**（3 分钟）：建立上位机与模拟下位机的通信
3. **实现实时数据读取和显示**（3 分钟）：定时读取压力值并更新界面
4. **绘制实时压力趋势图**（3 分钟）：用 Qt Charts 绘制动态折线图
5. **实现报警系统和故障日志**（3 分钟）：超阈值报警 + SQLite 日志记录
6. **打包与部署**（可选）：将应用打包为独立可执行文件

# 第 2 章：准备环境和模拟下位机（2 分钟）

## 2.1 安装 Qt 6.5

Qt 提供了免费的开源版本，足够我们使用。

1. 访问 [Qt 官网](https://www.qt.io/download-qt-installer)，下载 Qt Online Installer
2. 运行安装器，登录或注册 Qt 账号（免费）
3. 在组件选择页面，勾选以下内容：
   - **Qt 6.5.x**（或更高版本）
   - **Additional Libraries** 中勾选 **Qt Serial Bus**（Modbus 协议支持）
   - **Additional Libraries** 中勾选 **Qt Charts**（图表绘制）
   - **Qt Creator**（IDE，通常默认勾选）
4. 点击安装，等待完成

> **提示**：如果你已经安装了 Qt 但没有 Serial Bus 或 Charts 模块，可以重新运行 Qt Maintenance Tool，在"添加或移除组件"中补装。

<!-- ![placeholder: Qt 安装器的组件选择页面截图，高亮 Qt Serial Bus 和 Qt Charts 的勾选项](images/image3.png) -->

## 2.2 安装 Modbus Slave——你的"虚拟水泵"

Modbus Slave 是一款免费的 Modbus 从站模拟软件，它可以在你的电脑上模拟一台工业设备（PLC/传感器），让你的上位机程序有东西可以"对话"。

1. 访问 [modbustools.com](https://www.modbustools.com/modbus_slave.html)，下载 Modbus Slave
2. 安装并打开软件
3. 配置连接：
   - 点击菜单 **Connection → Connect**
   - 选择 **Modbus TCP/IP**
   - IP 地址填 `127.0.0.1`（本机）
   - 端口填 `502`（Modbus TCP 默认端口）
   - 点击 **OK** 开始监听

4. 设置模拟数据：
   - 你会看到一个寄存器表格，每行是一个寄存器地址（0、1、2……）
   - 双击地址 **0** 的值，改为 **120**（代表压力 1.20 MPa，程序中会除以 100 换算）
   - 双击地址 **1** 的值，改为 **350**（代表温度 35.0°C）
   - 双击地址 **2** 的值，改为 **1**（代表水泵运行状态：1=运行，0=停止）

现在 Modbus Slave 就是你的"24 小时运行的虚拟水泵"——窗口保持开着，它会一直响应上位机的读写请求。

<!-- ![placeholder: Modbus Slave 软件截图，展示 TCP 连接配置和寄存器表格中的模拟数据](images/image4.png) -->

> **动态模拟技巧**：Modbus Slave 支持自动递增/随机变化。右键点击寄存器值，选择 "Auto increment" 或 "Random"，就能模拟真实传感器的数据波动，让你的趋势图更生动。

# 第 3 章：创建 Qt 项目并连接 Modbus（3 分钟）

## 3.1 新建 Qt 项目

打开 Qt Creator，创建新项目：

1. 点击 **File → New Project**
2. 选择 **Application (Qt) → Qt Widgets Application**
3. 项目名称填 **PumpHMI**
4. 选择你安装的 Qt 6.5 Kit
5. 完成创建

打开 `PumpHMI.pro` 文件（如果用 CMake 则是 `CMakeLists.txt`），添加两个关键模块：

```pro
QT += core gui widgets serialbus charts sql
```

| 模块 | 作用 |
|------|------|
| `serialbus` | 提供 QModbusTcpClient，用于 Modbus TCP 通信 |
| `charts` | 提供 QChart、QLineSeries，用于绘制实时趋势图 |
| `sql` | 提供 QSqlDatabase，用于 SQLite 故障日志存储 |

如果使用 CMake，对应的配置是：

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 声明核心成员

让 AI 帮你编写头文件：

```
请帮我编写 mainwindow.h，声明水泵监控 HMI 的核心成员：
1. QModbusTcpClient 用于 Modbus TCP 通信
2. QTimer 用于定时读取数据
3. QChart + QLineSeries 用于实时趋势图
4. QSqlDatabase 用于故障日志存储
5. 界面元素：压力显示标签、状态指示灯、启停按钮、日志表格
```

核心头文件：

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
    void connectModbus();        // 连接下位机
    void readPressure();         // 定时读取压力数据
    void onReadReady();          // 读取完成回调
    void triggerAlarm(float v);  // 触发报警
    void togglePump();           // 启停水泵

private:
    // Modbus 通信
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // 实时图表
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // 数据库
    QSqlDatabase m_db;

    // 界面元素
    QLabel *m_pressureLabel = nullptr;    // 压力数值显示
    QLabel *m_statusLight = nullptr;      // 状态指示灯
    QPushButton *m_pumpButton = nullptr;  // 启停按钮
    QTableWidget *m_logTable = nullptr;   // 日志表格

    // 报警阈值
    float m_alarmThreshold = 1.50f;  // 压力超过 1.50 MPa 报警
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Qt Creator 中 mainwindow.h 文件的截图](images/image5.png) -->

## 3.3 建立 Modbus TCP 连接

在 `mainwindow.cpp` 中实现连接逻辑：

```cpp
// mainwindow.cpp — 连接部分
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // 连接到 Modbus Slave 模拟器
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 超时 1 秒
    m_modbusClient->setNumberOfRetries(3);  // 重试 3 次

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("连接下位机失败！", 3000);
        return;
    }

    statusBar()->showMessage("已连接到下位机 (127.0.0.1:502)", 3000);

    // 启动定时器，每秒读取一次数据
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1秒
}
```

**代码解读：**

| 代码 | 含义 |
|------|------|
| `QModbusTcpClient` | Qt 内置的 Modbus TCP 客户端，负责和下位机通信 |
| `NetworkPortParameter, 502` | 连接到 502 端口（和 Modbus Slave 中设置的一致） |
| `NetworkAddressParameter, "127.0.0.1"` | 连接本机（因为模拟器就在本机运行） |
| `m_pollTimer->start(1000)` | 每隔 1 秒自动调用 `readPressure()` 读取数据 |

## 3.4 读取压力数据

```cpp
// mainwindow.cpp — 读取部分
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // 构建读取请求：从地址 0 开始，读取 3 个保持寄存器
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // 寄存器类型
        0,                                   // 起始地址
        3                                    // 读取数量
    );

    // 发送读取请求（异步）
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // 广播请求，直接删除
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // 解析数据（寄存器值除以 100 得到实际值）
        float pressure = unit.value(0) / 100.0f;   // 地址 0：压力 (MPa)
        float temperature = unit.value(1) / 10.0f;  // 地址 1：温度 (°C)
        int pumpStatus = unit.value(2);              // 地址 2：水泵状态

        // 更新界面显示
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // 检查是否需要报警
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // 更新趋势图（下一章实现）
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("读取失败: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus 读取流程解读：**

```
readPressure() 被定时器触发
    → 构建 QModbusDataUnit（告诉下位机"我要读地址 0-2 的数据"）
    → sendReadRequest() 发送请求（异步，不阻塞界面）
    → 下位机返回数据
    → onReadReady() 被触发
    → 解析寄存器值，更新界面
```

<!-- ![placeholder: 程序运行截图，展示压力数值实时更新，状态栏显示"已连接到下位机"](images/image6.png) -->

# 第 4 章：绘制实时压力趋势图（3 分钟）

## 4.1 初始化图表

Qt Charts 提供了专业级的图表组件。让 AI 帮你在构造函数中初始化：

```
请帮我在 MainWindow 构造函数中初始化 Qt Charts 实时折线图：
1. 创建 QChart 和 QLineSeries
2. X 轴为时间轴（QDateTimeAxis），显示最近 60 秒
3. Y 轴为数值轴（QValueAxis），范围 0-3.0 MPa
4. 折线颜色为蓝色，线宽 2px
5. 将图表放入 QChartView 并添加到界面布局中
```

核心代码：

```cpp
// mainwindow.cpp — 图表初始化
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("压力 (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("实时压力趋势");
    m_chart->setAnimationOptions(QChart::NoAnimation); // 实时数据不要动画

    // X 轴：时间
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("时间");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y 轴：压力值
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("压力 (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // 创建图表视图
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // 添加到布局（假设已有 centralLayout）
    centralLayout->addWidget(chartView);
}
```

## 4.2 实时更新图表数据

每次读取到新的压力值时，往折线图中追加一个数据点，并保持只显示最近 60 秒的数据：

```cpp
// mainwindow.cpp — 图表更新
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // 追加新数据点
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // 只保留最近 60 秒的数据（避免内存无限增长）
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // 更新 X 轴范围：始终显示最近 60 秒
    m_axisX->setRange(cutoff, now);
}
```

然后在 `onReadReady()` 中调用它：

```cpp
// 在 onReadReady() 中，解析完压力值后添加：
updateChart(pressure);
```

现在运行程序，你会看到一条蓝色折线在实时滚动——每秒新增一个数据点，始终显示最近 60 秒的压力变化。如果你在 Modbus Slave 中手动修改寄存器值，折线会立刻反映出变化。

<!-- ![placeholder: 实时压力趋势图运行截图，展示蓝色折线在滚动更新，X 轴为时间，Y 轴为压力值](images/image7.png) -->

> **性能提示**：`QChart::NoAnimation` 很重要——实时数据每秒刷新，如果开启动画会导致界面卡顿。这是工业 HMI 开发中的常见经验。

# 第 5 章：报警系统与故障日志（3 分钟）

## 5.1 超阈值报警

当压力超过设定阈值时，我们需要：界面变红警示 + 弹窗提醒 + 记录日志。

```cpp
// mainwindow.cpp — 报警逻辑
void MainWindow::triggerAlarm(float pressure)
{
    // 界面变红
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // 状态指示灯变红
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // 弹窗报警（只在首次超阈值时弹出，避免反复弹窗）
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "压力报警",
            QString("当前压力 %1 MPa 超过阈值 %2 MPa！\n请立即检查水泵运行状态。")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // 记录到数据库
    logAlarm(pressure,
        QString("压力超阈值: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // 压力恢复正常时重置
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

<!-- ![placeholder: 压力超阈值时的报警截图，展示红色背景的压力数值、红色指示灯和报警弹窗](images/image8.png) -->

## 5.2 SQLite 故障日志

工业系统必须记录所有报警事件，方便事后追溯。我们用 SQLite 数据库来存储：

```cpp
// mainwindow.cpp — 数据库初始化
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "无法打开数据库:" << m_db.lastError().text();
        return;
    }

    // 创建报警日志表
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

## 5.3 记录和展示日志

```cpp
// mainwindow.cpp — 写入日志
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // 写入数据库
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // 同时更新界面上的日志表格
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // 自动滚动到最新一条
    m_logTable->scrollToBottom();
}
```

日志表格显示三列：时间、压力值、报警信息。每次报警都会自动追加一行，同时写入 SQLite 数据库持久化存储。

<!-- ![placeholder: 故障日志表格截图，展示多条报警记录，包含时间戳、压力值和报警信息](images/image9.png) -->

## 5.4 手动启停水泵

除了读取数据，上位机还需要能控制下位机。我们通过"写入寄存器"来实现水泵的启停：

```cpp
// mainwindow.cpp — 控制水泵
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // 构建写入请求：向地址 2 写入 1（启动）或 0（停止）
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "停止水泵" : "启动水泵");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "水泵已启动" : "水泵已停止", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

在 Modbus Slave 中，你会看到地址 2 的值随着你点击按钮在 0 和 1 之间切换——这就是上位机"控制"下位机的过程。

<!-- ![placeholder: 水泵启停按钮的截图，展示绿色"启动水泵"和红色"停止水泵"两种状态](images/image10.png) -->

# 第 6 章：打包与部署（可选）

## 6.1 使用 windeployqt / macdeployqt 打包

Qt 提供了官方的部署工具，自动收集应用所需的所有动态库：

**Windows：**

```bash
# 先构建 Release 版本，然后在构建目录中执行：
windeployqt PumpHMI.exe
```

`windeployqt` 会自动把 Qt 的 DLL、插件、翻译文件等复制到 exe 所在目录，打包后的文件夹可以直接发给别人使用。

**macOS：**

```bash
macdeployqt PumpHMI.app -dmg
```

这会生成一个 `.dmg` 安装镜像，双击即可安装。

## 6.2 使用 Qt Installer Framework 制作安装包

如果你想做一个专业的安装向导（像 Windows 上常见的"下一步、下一步、完成"），可以使用 Qt Installer Framework：

```
请帮我用 Qt Installer Framework 为 PumpHMI 创建安装包：
1. 创建 installer 目录结构（config、packages）
2. 配置 config.xml（安装包名称、版本、目标目录）
3. 将 windeployqt 输出的文件放入 packages/com.example.pumphmi/data/
4. 运行 binarycreator 生成安装包
```

<!-- ![placeholder: PumpHMI 安装向导截图，展示安装路径选择和安装进度](images/image11.png) -->

# 第 7 章：写在最后

恭喜你！你已经从零构建了一个工业级的水泵监控 HMI 系统。回顾一下我们做了什么：

1. 理解了上位机、下位机和 Modbus 协议的核心概念
2. 用 Modbus Slave 模拟了一台"虚拟水泵"，无需任何真实硬件
3. 用 Qt 的 QModbusTcpClient 建立了上位机与下位机的通信
4. 用 Qt Charts 绘制了实时滚动的压力趋势图
5. 实现了超阈值报警弹窗和 SQLite 故障日志记录
6. 实现了远程启停水泵的控制功能

整个过程没有用到任何真实工控设备，但开发出的程序和真实工厂现场使用的 HMI 系统在架构和功能上完全一致。当你把 Modbus Slave 换成真实的 PLC，这个程序就能直接用在生产环境中。

**进阶方向：**

* **多设备监控**：同时连接多台下位机，用选项卡或分屏展示不同设备的数据
* **历史数据回放**：从 SQLite 中读取历史数据，用时间滑块回放任意时段的趋势图
* **OPC UA 协议**：Modbus 适合简单场景，更复杂的工业系统通常使用 OPC UA 协议，Qt 同样有官方支持（Qt OPC UA 模块）
* **Web 远程监控**：用 Qt WebSocket 模块把实时数据推送到浏览器端，实现手机远程查看
* **AI 预测性维护**：把历史压力数据喂给机器学习模型，预测设备何时可能故障，提前维护

***用代码守护工业现场的每一台设备。***

# 参考文献

* [Qt Serial Bus 官方文档](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Qt Modbus TCP Client 示例](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Qt Charts 官方文档](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Modbus 协议规范](https://modbus.org/specs.php)
* [Modbus Slave 模拟工具](https://www.modbustools.com/modbus_slave.html)
* [Qt Installer Framework 文档](https://doc.qt.io/qtinstallerframework/)
```
