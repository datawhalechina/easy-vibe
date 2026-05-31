# 如何建置工業級 Qt 桌面應用程式：幫浦監控 HMI 系統

# 第 1 章：什麼是工業 HMI 與 Qt 開發

在本教學中，我們將完成一個完整的閉環：使用 Qt 從零開始建置一個工業級的幫浦監控 HMI（人機介面）系統。它能即時讀取感測器資料、繪製壓力趨勢圖、觸發自動超限警報，並記錄故障日誌。整個過程在 PC 上使用免費的模擬軟體，無需真實的工業硬體。

進行本教學，你至少需要具備：

- 一台電腦（Windows 或 Mac，建議使用 Windows 以獲得更好的工業軟體相容性）
- Qt 6.5 開發環境（Qt Creator + Qt Serial Bus + Qt Charts 模組）
- Modbus Slave 模擬軟體（免費下載，充當「虛擬幫浦」）
- 你的 AI 程式設計助手（Cursor / Trae / Claude Code）

> **零硬體、零成本**：使用免費的 PC 模擬軟體（Modbus Slave）作為下位機裝置，無需購買硬體。直接使用 Qt 官方的 `QModbusTcpClient` + Qt Charts 模組，無需手動解析協議。執行後，你將看到即時壓力趨勢、超限警報彈出和故障日誌，完全匹配真實工廠的工作流程。

## 1.1 什麼是上位機和下位機？

在工業自動化中，有兩個你必須理解的概念：**上位機**和**下位機**。

**下位機**：現場的「手和腳」

下位機是直接與實體裝置互動的控制器。在工廠中，它通常是一個 **PLC（可程式化邏輯控制器）** 或 **感測器**，負責：

* 讀取現場資料（溫度、壓力、流量、液位等）
* 控制裝置動作（啟動幫浦、關閉閥門、調整轉速等）
* 自動執行預定義邏輯（例如壓力超限時停止幫浦）

你可以把下位機想像成工廠車間裡的「工人」。它不需要複雜的思考，但必須可靠地執行任務。

**上位機**：控制室的「眼睛和大腦」

上位機是運行在 PC 或工業電腦上的監控軟體，也就是我們今天要建置的 **HMI（人機介面）**。它負責：

* 即時顯示現場資料（數值、圖表、動畫）
* 記錄歷史資料和警報日誌
* 讓操作員可以遠端控制
* 提供資料分析和報表

你可以把上位機想像成工廠的「監控中心」。操作員可以從螢幕上了解整個工廠的狀態。

**它們如何通訊？**

上位機和下位機透過**工業通訊協議**交換資料。最常見的是 **Modbus**，一個誕生於 1979 年的「老將」協議。它至今仍被廣泛使用，因為它簡單、可靠，且幾乎所有工業裝置都支援它。

```text
控制室                           工廠現場
┌──────────┐    Modbus 協議    ┌──────────┐
│ 上位機   │ ◄──────────────────►  │ 下位機   │
│ (Qt HMI) │   「告訴我壓力」     │ (PLC/感測器)
│ 顯示     │   「壓力是 1.20MPa」 │ 讀取資料 │
│ 記錄     │                       │ 控制     │
│ 警報     │                       │ 保護     │
└──────────┘                       └──────────┘
```

<!-- ![placeholder: 上位機與下位機關係示意圖：左側為 PC 螢幕（上位機），右側為 PLC 和幫浦（下位機），透過 Modbus 連接](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image1.png) -->

## 1.2 什麼是 Modbus 協議？

Modbus 是工業通訊的「通用語言」。它定義了上位機和下位機如何「對話」。

**只有兩個核心概念：**

* **暫存器（Register）**：下位機中的資料「儲存格」。每個暫存器有一個位址（`0`、`1`、`2`...），儲存一個數值。例如，位址 `0` 儲存壓力，位址 `1` 儲存溫度。
* **讀寫操作**：上位機可以讀取暫存器（獲取資料）或寫入暫存器（傳送控制指令）。

**兩種常見的 Modbus 變體：**

| 變體 | 傳輸方式 | 典型場景 |
|------|---------|---------|
| Modbus RTU | 序列通訊（RS-485/RS-232） | 短距離，直接裝置連接 |
| Modbus TCP | 乙太網路（TCP/IP） | 長距離，網路通訊 |

本教學使用 **Modbus TCP**。由於它基於網路，上位機應用程式和下位機模擬器可以在同一台機器上運行，無需實體佈線。

## 1.3 為什麼選擇 Qt？

Qt 是工業軟體的首選框架。工廠、醫院和交通系統中的許多監控介面都是使用 Qt 建置的。原因很簡單：

| 優勢 | 說明 |
|------|------|
| 跨平台 | 一份程式碼可編譯到 Windows、Linux 和嵌入式裝置 |
| 內建工業協議支援 | Qt Serial Bus 原生支援 Modbus，無需第三方函式庫 |
| 強大的圖表功能 | Qt Charts 提供專業的即時圖表 |
| 高效能 | C++ 基礎適合即時資料刷新 |
| 成熟穩定 | 30 年歷史，在工業領域經過驗證 |

## 1.4 我們要建置什麼？

我們將建置一個**幫浦監控 HMI 系統**，模擬真實工廠的幫浦壓力監控：

| 功能 | 說明 |
|------|------|
| 即時資料讀取 | 每秒從下位機讀取壓力值 |
| 壓力趨勢圖 | 顯示最近 60 秒的壓力折線圖 |
| 超限警報 | 壓力超過閾值時彈出警告並顯示紅色介面 |
| 故障日誌 | 將所有警報事件記錄到資料庫，供歷史查詢 |
| 手動控制 | 一鍵啟動/停止幫浦（寫入下位機暫存器） |

<!-- ![placeholder: 幫浦監控 HMI 預覽，顯示即時壓力數值、趨勢圖、警報指示器、啟動/停止按鈕和日誌列表](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png) -->

## 1.5 教學路線圖

我們將按以下步驟完成整個流程：

1. **準備環境和模擬下位機**（2 分鐘）：安裝 Qt 6.5 和 Modbus Slave 模擬器
2. **建立 Qt 專案並連接 Modbus**（3 分鐘）：建立上位機應用程式與模擬器之間的通訊
3. **實現即時讀取和顯示**（3 分鐘）：定時讀取壓力並更新介面
4. **繪製即時壓力趨勢圖**（3 分鐘）：使用 Qt Charts 的動態折線圖
5. **實現警報和故障日誌**（3 分鐘）：超限警報 + SQLite 記錄
6. **打包和部署**（選修）：將應用程式打包為獨立可執行檔

# 第 2 章：準備環境和模擬下位機（2 分鐘）

## 2.1 安裝 Qt 6.5

Qt 提供免費的開源版本，足夠本教學使用。

1. 前往 [Qt 官方網站](https://www.qt.io/download-qt-installer) 下載 Qt Online Installer
2. 執行安裝程式，登入或註冊 Qt 帳號（免費）
3. 在元件選擇中，勾選：
   - **Qt 6.5.x**（或更新版本）
   - **Additional Libraries** 下的 **Qt Serial Bus**（Modbus 支援）
   - **Additional Libraries** 下的 **Qt Charts**（圖表渲染）
   - **Qt Creator**（IDE，通常預設選取）
4. 點擊安裝並等待

> **提示**：如果 Qt 已安裝但缺少 Serial Bus 或 Charts，重新執行 Qt Maintenance Tool 新增元件即可。

<!-- ![placeholder: Qt 安裝程式元件選擇截圖，標記了 Qt Serial Bus 和 Qt Charts](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 安裝 Modbus Slave：你的「虛擬幫浦」

Modbus Slave 是一個免費的 Modbus 從站模擬器。它可以在你的電腦上模擬工業裝置（PLC/感測器），讓你的上位機應用程式有通訊對象。

1. 前往 [modbustools.com](https://www.modbustools.com/modbus_slave.html) 下載 Modbus Slave
2. 安裝並開啟它
3. 配置連接：
   - 選單 **Connection -> Connect**
   - 選擇 **Modbus TCP/IP**
   - IP 位址：`127.0.0.1`（本機）
   - 連接埠：`502`（Modbus TCP 預設連接埠）
   - 點擊 **OK** 開始監聽

4. 設定模擬資料：
   - 你會看到一個暫存器表格，每一行是一個暫存器位址（`0`、`1`、`2`...）
   - 雙擊位址 **0** 的值，改為 **120**（代表壓力 1.20 MPa，在應用程式中除以 100）
   - 雙擊位址 **1** 的值，改為 **350**（代表溫度 35.0°C）
   - 雙擊位址 **2** 的值，改為 **1**（幫浦狀態：`1=運行中`，`0=已停止`）

現在 Modbus Slave 就是你的「24/7 虛擬幫浦」。保持視窗開啟，它會持續回應讀寫請求。

<!-- ![placeholder: Modbus Slave 截圖顯示 TCP 配置和模擬暫存器值](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **動態模擬提示**：Modbus Slave 支援自動遞增/隨機變化。右鍵點擊暫存器值並選擇「Auto increment」或「Random」即可模擬真實的感測器波動。

# 第 3 章：建立 Qt 專案並連接 Modbus（3 分鐘）

## 3.1 建立新的 Qt 專案

開啟 Qt Creator 並建立新專案：

1. 點擊 **File -> New Project**
2. 選擇 **Application (Qt) -> Qt Widgets Application**
3. 專案名稱：**PumpHMI**
4. 選擇已安裝的 Qt 6.5 套件
5. 完成建立

開啟 `PumpHMI.pro`（或使用 CMake 時的 `CMakeLists.txt`），新增關鍵模組：

```pro
QT += core gui widgets serialbus charts sql
```

| 模組 | 用途 |
|------|------|
| `serialbus` | 提供 `QModbusTcpClient` 用於 Modbus TCP 通訊 |
| `charts` | 提供 `QChart`、`QLineSeries` 用於即時趨勢圖 |
| `sql` | 提供 `QSqlDatabase` 用於 SQLite 故障日誌 |

如果使用 CMake，等效配置為：

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 宣告核心成員

請 AI 生成標頭檔：

```text
請幫我撰寫 mainwindow.h，包含幫浦監控 HMI 的核心成員：
1. QModbusTcpClient 用於 Modbus TCP 通訊
2. QTimer 用於定時資料讀取
3. QChart + QLineSeries 用於即時趨勢圖
4. QSqlDatabase 用於故障日誌儲存
5. UI 元素：壓力標籤、狀態指示器、啟動/停止按鈕、日誌表格
```

核心標頭檔：

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
    void connectModbus();        // 連接下位機
    void readPressure();         // 定時讀取壓力
    void onReadReady();          // 讀取回呼
    void triggerAlarm(float v);  // 觸發警報
    void togglePump();           // 啟動/停止幫浦

private:
    // Modbus 通訊
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // 即時圖表
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // 資料庫
    QSqlDatabase m_db;

    // UI 元素
    QLabel *m_pressureLabel = nullptr;    // 壓力顯示
    QLabel *m_statusLight = nullptr;      // 狀態指示器
    QPushButton *m_pumpButton = nullptr;  // 啟動/停止按鈕
    QTableWidget *m_logTable = nullptr;   // 日誌表格

    // 警報閾值
    float m_alarmThreshold = 1.50f;  // 超過 1.50 MPa 觸發警報
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Qt Creator 中 mainwindow.h 的截圖](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 建立 Modbus TCP 連接

在 `mainwindow.cpp` 中實現連接邏輯：

```cpp
// mainwindow.cpp - 連接部分
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // 連接到 Modbus Slave 模擬器
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 1 秒超時
    m_modbusClient->setNumberOfRetries(3);  // 重試 3 次

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("連接下位機失敗！", 3000);
        return;
    }

    statusBar()->showMessage("已連接到下位機 (127.0.0.1:502)", 3000);

    // 啟動計時器，每秒讀取一次
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1 秒
}
```

**程式碼說明：**

| 程式碼 | 含義 |
|------|------|
| `QModbusTcpClient` | Qt 內建的 Modbus TCP 客戶端，與下位機通訊 |
| `NetworkPortParameter, 502` | 連接到連接埠 `502`（與 Modbus Slave 配置相同） |
| `NetworkAddressParameter, "127.0.0.1"` | 連接本機（模擬器在本機運行） |
| `m_pollTimer->start(1000)` | 每秒呼叫 `readPressure()` |

## 3.4 讀取壓力資料

```cpp
// mainwindow.cpp - 讀取部分
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // 建立讀取請求：從位址 0 開始，讀取 3 個保持暫存器
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // 暫存器類型
        0,                                   // 起始位址
        3                                    // 數量
    );

    // 發送非同步讀取請求
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // 廣播請求，直接刪除
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // 解析數值（將暫存器值除以對應係數得到實際單位）
        float pressure = unit.value(0) / 100.0f;   // 位址 0：壓力 (MPa)
        float temperature = unit.value(1) / 10.0f;  // 位址 1：溫度 (°C)
        int pumpStatus = unit.value(2);              // 位址 2：幫浦狀態

        // 更新 UI
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // 檢查警報
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // 更新趨勢圖（下一章實現）
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("讀取失敗：%1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus 讀取流程：**

```text
readPressure() 由計時器觸發
    -> 建立 QModbusDataUnit（「讀取位址 0-2」）
    -> sendReadRequest() 非同步發送（UI 不會被阻塞）
    -> 下位機回傳資料
    -> onReadReady() 被觸發
    -> 解析暫存器值並更新 UI
```

<!-- ![placeholder: 運行中的應用程式截圖，顯示即時壓力更新和狀態列「已連接到下位機」](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# 第 4 章：繪製即時壓力趨勢（3 分鐘）

## 4.1 初始化圖表

Qt Charts 提供專業的圖表元件。請 AI 在建構子中初始化：

```text
請幫我在 MainWindow 建構子中初始化 Qt Charts 即時折線圖：
1. 建立 QChart 和 QLineSeries
2. X 軸使用 QDateTimeAxis，顯示最近 60 秒
3. Y 軸使用 QValueAxis，範圍 0-3.0 MPa
4. 線條顏色藍色，寬度 2px
5. 將圖表放入 QChartView 並加入佈局
```

核心程式碼：

```cpp
// mainwindow.cpp - 圖表初始化
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("壓力 (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("即時壓力趨勢");
    m_chart->setAnimationOptions(QChart::NoAnimation); // 即時資料不要動畫

    // X 軸：時間
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("時間");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y 軸：壓力
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("壓力 (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // 建立圖表視圖
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // 加入佈局（假設已有 centralLayout）
    centralLayout->addWidget(chartView);
}
```

## 4.2 即時更新圖表

每次讀取到新的壓力值時，新增一個資料點並只保留最近 60 秒：

```cpp
// mainwindow.cpp - 圖表更新
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // 新增新資料點
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // 只保留最近 60 秒的資料
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // 更新 X 軸範圍：始終顯示最近 60 秒
    m_axisX->setRange(cutoff, now);
}
```

然後在 `onReadReady()` 中呼叫：

```cpp
// 在 onReadReady() 的壓力解析後新增：
updateChart(pressure);
```

現在執行程式。你會看到一條藍色的線即時更新，每秒一個點，始終顯示最近 60 秒。如果你在 Modbus Slave 中手動修改暫存器值，折線會立即反映變化。

<!-- ![placeholder: 即時壓力趨勢截圖，顯示滾動的藍色線條、時間 X 軸、壓力 Y 軸](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **效能提示**：`QChart::NoAnimation` 很重要。即時資料每秒刷新，動畫會導致 UI 延遲。這是工業 HMI 的常見做法。

# 第 5 章：警報系統和故障日誌（3 分鐘）

## 5.1 超限警報

當壓力超過閾值時，我們需要：紅色 UI 警告 + 彈出提示 + 日誌記錄。

```cpp
// mainwindow.cpp - 警報邏輯
void MainWindow::triggerAlarm(float pressure)
{
    // UI 變紅
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // 狀態指示器變紅
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // 彈出警報（僅在首次超限時彈出，避免重複彈窗）
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "壓力警報",
            QString("當前壓力 %1 MPa 超過閾值 %2 MPa！\n請立即檢查幫浦狀態。")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // 記錄到資料庫
    logAlarm(pressure,
        QString("壓力超限：%1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // 壓力恢復正常時重置
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

<!-- ![placeholder: 超限警報截圖，顯示紅色壓力背景、紅色指示器和警報彈窗](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 SQLite 故障日誌

工業系統必須記錄所有警報事件以便追溯。我們使用 SQLite：

```cpp
// mainwindow.cpp - 資料庫初始化
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "無法開啟資料庫：" << m_db.lastError().text();
        return;
    }

    // 建立警報表
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

## 5.3 記錄和顯示日誌

```cpp
// mainwindow.cpp - 寫入日誌
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // 寫入資料庫
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // 更新畫面上的表格
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // 自動捲動到最新一行
    m_logTable->scrollToBottom();
}
```

日誌表格有三列：時間、壓力值和警報訊息。每次警報都會新增一行並持久化到 SQLite。

<!-- ![placeholder: 故障日誌表格截圖，包含多條記錄，含時間戳、壓力和警報訊息](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 手動啟動/停止幫浦

除了讀取資料，上位機還應該能控制下位機。我們透過寫入暫存器值來實現：

```cpp
// mainwindow.cpp - 幫浦控制
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // 建立寫入請求：寫入 1（啟動）或 0（停止）到位址 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "停止幫浦" : "啟動幫浦");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "幫浦已啟動" : "幫浦已停止", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

在 Modbus Slave 中，你會看到位址 `2` 的值隨著按鈕點擊在 `0` 和 `1` 之間切換。這就是上位機的「控制」過程。

<!-- ![placeholder: 幫浦啟動/停止按鈕截圖，顯示綠色「啟動幫浦」和紅色「停止幫浦」狀態](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# 第 6 章：打包和部署（選修）

## 6.1 使用 windeployqt / macdeployqt 打包

Qt 提供官方部署工具，可自動收集所需的動態函式庫。

**Windows：**

```bash
# 先建置 Release 版本，然後在建置目錄中執行：
windeployqt PumpHMI.exe
```

`windeployqt` 會將 Qt DLL、外掛程式、翻譯檔案等複製到可執行檔旁邊。打包後的資料夾可以直接傳送。

**macOS：**

```bash
macdeployqt PumpHMI.app -dmg
```

這會產生一個 `.dmg` 安裝映像檔。

## 6.2 使用 Qt Installer Framework 建置安裝程式

如果你想要一個專業的安裝精靈（「下一步 -> 下一步 -> 完成」），可以使用 Qt Installer Framework：

```text
請幫我使用 Qt Installer Framework 為 PumpHMI 建立安裝程式：
1. 建立安裝程式目錄結構（config, packages）
2. 配置 config.xml（安裝程式名稱、版本、目標目錄）
3. 將 windeployqt 輸出的檔案放入 packages/com.example.pumphmi/data/
4. 執行 binarycreator 生成安裝程式
```

<!-- ![placeholder: PumpHMI 安裝精靈截圖，顯示安裝路徑和進度](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image11.png) -->

# 第 7 章：總結

恭喜！你已經從零開始建置了一個工業級的幫浦監控 HMI 系統。回顧一下：

1. 理解了上位機、下位機和 Modbus 協議的核心概念
2. 使用 Modbus Slave 模擬了「虛擬幫浦」，無需真實硬體
3. 使用 Qt `QModbusTcpClient` 建立了上下位機通訊
4. 使用 Qt Charts 繪製了即時滾動壓力趨勢圖
5. 實現了超限彈出警報和 SQLite 故障日誌
6. 實現了遠端啟動/停止幫浦控制

整個過程沒有使用真實的工業硬體，但架構和功能完全匹配真實工廠的 HMI 系統。如果你將 Modbus Slave 替換為真實的 PLC，這個應用程式可以直接用於生產場景。

**進階方向：**

* **多裝置監控**：連接多台下位機，使用分頁/分割視圖顯示不同裝置的資料
* **歷史回放**：從 SQLite 讀取歷史資料，使用時間軸控制重播趨勢圖
* **OPC UA 協議**：Modbus 適合較簡單的場景；複雜的工業系統通常使用 OPC UA，Qt 也支援（Qt OPC UA 模組）
* **Web 遠端監控**：使用 Qt WebSocket 將即時資料推送到瀏覽器，實現行動端查看
* **AI 預測性維護**：將歷史壓力資料餵給機器學習模型，提前預測故障

***用程式碼守護工業運作中的每一台裝置。***

# 參考資料

* [Qt Serial Bus 文件](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Qt Modbus TCP 客戶端範例](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Qt Charts 文件](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Modbus 協議規範](https://modbus.org/specs.php)
* [Modbus Slave 模擬器](https://www.modbustools.com/modbus_slave.html)
* [Qt Installer Framework 文件](https://doc.qt.io/qtinstallerframework/)
