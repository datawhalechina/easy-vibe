# How to Build an Industrial Qt Desktop App: Pump Monitoring HMI System

# Chapter 1: What Industrial HMI and Qt Development Are

In this tutorial, we will complete a full closed loop: build an industrial-grade pump monitoring HMI (Human-Machine Interface) system from scratch with Qt. It can read sensor data in real time, draw pressure trend charts, trigger automatic over-threshold alarms, and record fault logs. The whole process uses free simulation software on a PC instead of real industrial hardware.

For this tutorial, you should at least have:

- A computer (Windows or Mac, Windows recommended for better industrial software compatibility)
- Qt 6.5 development environment (Qt Creator + Qt Serial Bus + Qt Charts modules)
- Modbus Slave simulation software (free download, works as a "virtual pump")
- Your AI coding assistant (Cursor / Trae / Claude Code)

> **Zero hardware, zero cost**: use free PC simulation software (Modbus Slave) as the lower-level device; no need to buy hardware. Use official Qt `QModbusTcpClient` + Qt Charts modules directly, no manual protocol parsing needed. After running, you will see real-time pressure trends, over-threshold alarm popups, and fault logs, matching real factory workflow.

## 1.1 What Are Upper Computer and Lower Computer?

In industrial automation, there are two concepts you must understand: **upper computer** and **lower computer**.

**Lower Computer**: the "hands and feet" on-site

The lower computer is the controller that directly interacts with physical devices. In factories, it is usually a **PLC (Programmable Logic Controller)** or **sensor**, responsible for:

* reading field data (temperature, pressure, flow, liquid level, etc.)
* controlling device actions (start pump, close valve, adjust speed, etc.)
* running predefined logic automatically (for example stop pump when pressure exceeds threshold)

You can think of the lower computer as a "worker" on the factory floor. It does not need complex thinking, but must execute tasks reliably.

**Upper Computer**: the "eyes and brain" in the control room

The upper computer is monitoring software running on PC or industrial computer, which is the **HMI (Human-Machine Interface)** we will build today. It is responsible for:

* displaying field data in real time (numbers, charts, animations)
* recording historical data and alarm logs
* enabling remote control for operators
* providing data analysis and reports

You can think of the upper computer as the factory's "monitoring center." Operators can understand plant status from the screen.

**How do they communicate?**

Upper and lower computers exchange data through **industrial communication protocols**. The most common one is **Modbus**, a "veteran" protocol born in 1979. It is still widely used because it is simple, reliable, and supported by almost all industrial devices.

```text
Control room                           Factory site
┌──────────┐    Modbus protocol    ┌──────────┐
│ Upper    │ ◄──────────────────►  │ Lower    │
│ computer │   "Tell me pressure"  │ computer │
│ (Qt HMI) │   "Pressure is 1.20MPa"│ (PLC/Sensor)
│ Display  │                       │ Read data│
│ Log data │                       │ Control  │
│ Alarms   │                       │ Protect  │
└──────────┘                       └──────────┘
```

<!-- ![placeholder: Diagram of upper vs lower computer relationship: PC screen (upper computer) on the left, PLC and pump (lower computer) on the right, connected via Modbus](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image1.png) -->

## 1.2 What Is Modbus Protocol?

Modbus is the "common language" of industrial communication. It defines how upper and lower computers "talk."

**Only two core concepts:**

* **Register**: data "cells" in the lower computer. Each has an address (`0`, `1`, `2`, ...), storing a number. For example, address `0` stores pressure and address `1` stores temperature.
* **Read/Write operations**: upper computer can read registers (get data) or write registers (send control commands).

**Two common Modbus variants:**

| Variant | Transport | Typical Scenario |
|------|---------|---------|
| Modbus RTU | Serial (RS-485/RS-232) | Short distance, direct device connection |
| Modbus TCP | Ethernet (TCP/IP) | Long distance, network communication |

This tutorial uses **Modbus TCP**. Since it is network-based, upper-computer app and lower-computer simulator can run on the same machine with no physical wiring.

## 1.3 Why Choose Qt?

Qt is a top framework choice for industrial software. Many monitoring interfaces in factories, hospitals, and transportation systems are built with Qt. The reasons are simple:

| Advantage | Explanation |
|------|------|
| Cross-platform | One codebase compiles to Windows, Linux, and embedded devices |
| Built-in industrial protocol support | Qt Serial Bus supports Modbus natively, no third-party library required |
| Powerful charting | Qt Charts provides professional real-time charts |
| High performance | C++ foundation suitable for real-time data refresh |
| Mature and stable | 30-year history, proven in industrial domain |

## 1.4 What Are We Building?

We will build a **Pump Monitoring HMI System** simulating real factory pump pressure monitoring:

| Function | Description |
|------|------|
| Real-time data reading | Read pressure from lower computer every second |
| Pressure trend chart | Line chart for last 60 seconds of pressure |
| Over-threshold alarm | Popup warning and red UI when pressure exceeds threshold |
| Fault log | Record all alarm events in database for history queries |
| Manual control | One-click start/stop pump (write lower-computer register) |

<!-- ![placeholder: Pump monitoring HMI preview showing real-time pressure number, trend chart, alarm indicator, start/stop button, and log list](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image2.png) -->

## 1.5 Tutorial Roadmap

We will complete the flow in these steps:

1. **Prepare environment and simulated lower computer** (2 minutes): install Qt 6.5 and Modbus Slave simulator
2. **Create Qt project and connect Modbus** (3 minutes): establish communication between upper app and simulator
3. **Implement real-time read and display** (3 minutes): timed pressure reads and UI updates
4. **Draw real-time pressure trend chart** (3 minutes): dynamic line chart with Qt Charts
5. **Implement alarm and fault logs** (3 minutes): over-threshold alarm + SQLite logging
6. **Package and deploy** (optional): package app into standalone executable

# Chapter 2: Prepare Environment and Simulated Lower Computer (2 Minutes)

## 2.1 Install Qt 6.5

Qt provides a free open-source version, enough for this tutorial.

1. Visit [Qt official site](https://www.qt.io/download-qt-installer) and download Qt Online Installer
2. Run installer, log in or register Qt account (free)
3. In component selection, check:
   - **Qt 6.5.x** (or newer)
   - **Qt Serial Bus** under **Additional Libraries** (Modbus support)
   - **Qt Charts** under **Additional Libraries** (chart rendering)
   - **Qt Creator** (IDE, usually selected by default)
4. Click install and wait

> **Tip**: if Qt is already installed but missing Serial Bus or Charts, rerun Qt Maintenance Tool and add components.

<!-- ![placeholder: Qt installer component selection screenshot highlighting Qt Serial Bus and Qt Charts](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image3.png) -->

## 2.2 Install Modbus Slave: Your "Virtual Pump"

Modbus Slave is a free Modbus slave simulator. It can simulate an industrial device (PLC/sensor) on your computer so your upper app has something to communicate with.

1. Visit [modbustools.com](https://www.modbustools.com/modbus_slave.html) and download Modbus Slave
2. Install and open it
3. Configure connection:
   - Menu **Connection -> Connect**
   - Choose **Modbus TCP/IP**
   - IP address: `127.0.0.1` (localhost)
   - Port: `502` (default Modbus TCP port)
   - Click **OK** to listen

4. Set simulated data:
   - You will see a register table, each row is a register address (`0`, `1`, `2`, ...)
   - Double-click value at address **0**, change to **120** (means pressure 1.20 MPa, divided by 100 in app)
   - Double-click value at address **1**, change to **350** (means temperature 35.0°C)
   - Double-click value at address **2**, change to **1** (pump state: `1=running`, `0=stopped`)

Now Modbus Slave is your "24/7 virtual pump." Keep the window open; it will continuously respond to read/write requests.

<!-- ![placeholder: Modbus Slave screenshot showing TCP config and simulated register values](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image4.png) -->

> **Dynamic simulation tip**: Modbus Slave supports auto increment/random changes. Right-click register value and choose "Auto increment" or "Random" to simulate realistic sensor fluctuations.

# Chapter 3: Create Qt Project and Connect Modbus (3 Minutes)

## 3.1 Create New Qt Project

Open Qt Creator and create a new project:

1. Click **File -> New Project**
2. Choose **Application (Qt) -> Qt Widgets Application**
3. Project name: **PumpHMI**
4. Select installed Qt 6.5 kit
5. Finish creation

Open `PumpHMI.pro` (or `CMakeLists.txt` if using CMake), and add key modules:

```pro
QT += core gui widgets serialbus charts sql
```

| Module | Purpose |
|------|------|
| `serialbus` | Provides `QModbusTcpClient` for Modbus TCP communication |
| `charts` | Provides `QChart`, `QLineSeries` for real-time trend chart |
| `sql` | Provides `QSqlDatabase` for SQLite fault logs |

If using CMake, equivalent config:

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 Declare Core Members

Ask AI to generate header file:

```text
Please help me write mainwindow.h with core members for pump monitoring HMI:
1. QModbusTcpClient for Modbus TCP communication
2. QTimer for timed data reading
3. QChart + QLineSeries for real-time trend chart
4. QSqlDatabase for fault log storage
5. UI elements: pressure label, status indicator, start/stop button, log table
```

Core header:

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
    void connectModbus();        // connect lower computer
    void readPressure();         // timed pressure read
    void onReadReady();          // read callback
    void triggerAlarm(float v);  // trigger alarm
    void togglePump();           // start/stop pump

private:
    // Modbus communication
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // Real-time chart
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // Database
    QSqlDatabase m_db;

    // UI elements
    QLabel *m_pressureLabel = nullptr;    // pressure display
    QLabel *m_statusLight = nullptr;      // status indicator
    QPushButton *m_pumpButton = nullptr;  // start/stop button
    QTableWidget *m_logTable = nullptr;   // log table

    // Alarm threshold
    float m_alarmThreshold = 1.50f;  // alarm above 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Screenshot of mainwindow.h in Qt Creator](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image5.png) -->

## 3.3 Build Modbus TCP Connection

Implement connection logic in `mainwindow.cpp`:

```cpp
// mainwindow.cpp - connection section
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Connect to Modbus Slave simulator
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 1s timeout
    m_modbusClient->setNumberOfRetries(3);  // retry 3 times

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("Failed to connect lower computer!", 3000);
        return;
    }

    statusBar()->showMessage("Connected to lower computer (127.0.0.1:502)", 3000);

    // Start timer, read once per second
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1s
}
```

**Code notes:**

| Code | Meaning |
|------|------|
| `QModbusTcpClient` | Built-in Qt Modbus TCP client, communicates with lower computer |
| `NetworkPortParameter, 502` | Connect to port `502` (same as Modbus Slave config) |
| `NetworkAddressParameter, "127.0.0.1"` | Connect localhost (simulator runs locally) |
| `m_pollTimer->start(1000)` | Call `readPressure()` every second |

## 3.4 Read Pressure Data

```cpp
// mainwindow.cpp - reading section
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // Build read request: start at address 0, read 3 holding registers
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // register type
        0,                                   // start address
        3                                    // quantity
    );

    // Send async read request
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // broadcast request, delete directly
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // Parse values (divide register value for real units)
        float pressure = unit.value(0) / 100.0f;   // addr 0: pressure (MPa)
        float temperature = unit.value(1) / 10.0f;  // addr 1: temperature (°C)
        int pumpStatus = unit.value(2);              // addr 2: pump state

        // Update UI
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // Check alarm
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // Update trend chart (implemented next chapter)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("Read failed: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus reading flow:**

```text
readPressure() triggered by timer
    -> Build QModbusDataUnit ("read addresses 0-2")
    -> sendReadRequest() async send (UI not blocked)
    -> lower computer returns data
    -> onReadReady() triggered
    -> parse register values and update UI
```

<!-- ![placeholder: Running app screenshot showing real-time pressure updates and status bar "connected to lower computer"](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image6.png) -->

# Chapter 4: Draw Real-time Pressure Trend (3 Minutes)

## 4.1 Initialize Chart

Qt Charts provides professional chart components. Ask AI to initialize in constructor:

```text
Please help me initialize Qt Charts real-time line chart in MainWindow constructor:
1. Create QChart and QLineSeries
2. X axis uses QDateTimeAxis, showing latest 60 seconds
3. Y axis uses QValueAxis, range 0-3.0 MPa
4. Line color blue, width 2px
5. Place chart into QChartView and add to layout
```

Core code:

```cpp
// mainwindow.cpp - chart initialization
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pressure (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Real-time Pressure Trend");
    m_chart->setAnimationOptions(QChart::NoAnimation); // no animation for real-time data

    // X axis: time
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Time");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y axis: pressure
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pressure (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // Create chart view
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // Add to layout (assuming existing centralLayout)
    centralLayout->addWidget(chartView);
}
```

## 4.2 Update Chart in Real Time

Whenever a new pressure value is read, append one point and keep only latest 60 seconds:

```cpp
// mainwindow.cpp - chart updates
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // Append new point
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // Keep only latest 60s data
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // Update X axis range: always show latest 60s
    m_axisX->setRange(cutoff, now);
}
```

Then call it in `onReadReady()`:

```cpp
// Add after pressure parsing in onReadReady():
updateChart(pressure);
```

Now run the program. You will see a blue line updating in real time, one point per second, always showing latest 60 seconds. If you modify register values in Modbus Slave manually, the line reflects changes immediately.

<!-- ![placeholder: Real-time pressure trend screenshot showing scrolling blue line, time X-axis, pressure Y-axis](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image7.png) -->

> **Performance tip**: `QChart::NoAnimation` is important. Real-time data refresh every second; animations can cause UI lag. This is a common industrial HMI practice.

# Chapter 5: Alarm System and Fault Logs (3 Minutes)

## 5.1 Over-threshold Alarm

When pressure exceeds threshold, we need: red UI warning + popup alert + log record.

```cpp
// mainwindow.cpp - alarm logic
void MainWindow::triggerAlarm(float pressure)
{
    // Turn UI red
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // Status indicator red
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // Popup alarm (only first time crossing threshold to avoid repeated popups)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Pressure Alarm",
            QString("Current pressure %1 MPa exceeds threshold %2 MPa!\nPlease check pump status immediately.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // Record to DB
    logAlarm(pressure,
        QString("Pressure over threshold: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // Reset when pressure returns to normal
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

<!-- ![placeholder: Over-threshold alarm screenshot showing red pressure background, red indicator, and alarm popup](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image8.png) -->

## 5.2 SQLite Fault Logs

Industrial systems must log all alarm events for traceability. We use SQLite:

```cpp
// mainwindow.cpp - database initialization
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "Cannot open database:" << m_db.lastError().text();
        return;
    }

    // Create alarm table
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

## 5.3 Log and Display Records

```cpp
// mainwindow.cpp - write logs
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // Write to DB
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // Update on-screen table
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // Auto-scroll to latest row
    m_logTable->scrollToBottom();
}
```

Log table has three columns: time, pressure value, and alarm message. Each alarm appends one row and is persisted to SQLite.

<!-- ![placeholder: Fault log table screenshot with multiple records including timestamp, pressure, and alarm message](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image9.png) -->

## 5.4 Manually Start/Stop Pump

Besides reading data, upper computer should control lower computer too. We do this by writing register values:

```cpp
// mainwindow.cpp - pump control
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // Build write request: write 1 (start) or 0 (stop) to address 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "Stop Pump" : "Start Pump");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "Pump started" : "Pump stopped", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

In Modbus Slave, you will see address `2` switching between `0` and `1` as you click the button. This is the upper-computer "control" process.

<!-- ![placeholder: Pump start/stop button screenshot showing green "Start Pump" and red "Stop Pump" states](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image10.png) -->

# Chapter 6: Packaging and Deployment (Optional)

## 6.1 Package with windeployqt / macdeployqt

Qt provides official deployment tools to collect required dynamic libraries automatically.

**Windows:**

```bash
# Build Release first, then run in build directory:
windeployqt PumpHMI.exe
```

`windeployqt` copies Qt DLLs, plugins, translation files, etc. next to the executable. That packaged folder can be sent directly.

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

This generates a `.dmg` installer image.

## 6.2 Build Installer with Qt Installer Framework

If you want a professional setup wizard ("Next -> Next -> Finish"), use Qt Installer Framework:

```text
Please help me create an installer for PumpHMI with Qt Installer Framework:
1. Create installer directory structure (config, packages)
2. Configure config.xml (installer name, version, target directory)
3. Put windeployqt output files into packages/com.example.pumphmi/data/
4. Run binarycreator to generate installer
```

<!-- ![placeholder: PumpHMI setup wizard screenshot showing install path and progress](../../../../zh-cn/stage-3/cross-platform/3.13-qt-industrial-hmi/images/image11.png) -->

# Chapter 7: Final Notes

Congratulations! You have built an industrial-grade pump monitoring HMI system from scratch. Recap:

1. Understood core concepts of upper computer, lower computer, and Modbus protocol
2. Simulated a "virtual pump" with Modbus Slave, with no real hardware
3. Built upper-lower communication using Qt `QModbusTcpClient`
4. Drew real-time rolling pressure trend chart with Qt Charts
5. Implemented over-threshold popup alarms and SQLite fault logs
6. Implemented remote start/stop pump control

The whole process used no real industrial hardware, but the architecture and functions match real factory HMI systems. If you replace Modbus Slave with a real PLC, this app can be used in production scenarios directly.

**Advanced directions:**

* **Multi-device monitoring**: connect multiple lower computers and use tabs/split views for different device data
* **Historical playback**: read historical data from SQLite and replay trend charts with timeline controls
* **OPC UA protocol**: Modbus fits simpler scenarios; complex industrial systems often use OPC UA, also supported by Qt (Qt OPC UA module)
* **Web remote monitoring**: use Qt WebSocket to push real-time data to browser for mobile viewing
* **AI predictive maintenance**: feed historical pressure data to ML models to predict failures in advance

***Use code to protect every device in industrial operations.***

# References

* [Qt Serial Bus Docs](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Qt Modbus TCP Client Example](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Qt Charts Docs](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Modbus Protocol Specs](https://modbus.org/specs.php)
* [Modbus Slave Simulator](https://www.modbustools.com/modbus_slave.html)
* [Qt Installer Framework Docs](https://doc.qt.io/qtinstallerframework/)
