# 産業用Qtデスクトップアプリの構築方法：ポンプ監視HMIシステム

# 第1章：産業用HMIとQt開発とは

このチュートリアルでは、ゼロから産業用ポンプ監視HMI（ヒューマンマシンインターフェース）システムをQtで構築します。センサーデータのリアルタイム読み取り、圧力トレンドチャートの描画、閾値超過時の自動アラームトリガー、故障ログの記録が可能です。整過程では、実際の産業ハードウェアの代わりにPC上の無料シミュレーションソフトウェアを使用します。

このチュートリアルにあたり、少なくとも以下のものが必要です：

- コンピュータ（WindowsまたはMac、産業ソフトウェアの互換性を考慮しWindows推奨）
- Qt 6.5開発環境（Qt Creator + Qt Serial Bus + Qt Chartsモジュール）
- Modbus Slaveシミュレーションソフトウェア（無料ダウンロード、「仮想ポンプ」として動作）
- AIコーディングアシスタント（Cursor / Trae / Claude Code）

> **ハードウェア不要、コスト不要**：無料のPCシミュレーションソフトウェア（Modbus Slave）を下位デバイスとして使用するため、ハードウェアを購入する必要はありません。公式Qtの `QModbusTcpClient` + Qt Chartsモジュールを直接使用し、手動プロトコル解析は不要です。実行後、リアルタイム圧力トレンド、閾値超過アラームポップアップ、故障ログが表示され、実際の工場ワークフローと一致します。

## 1.1 上位コンピュータと下位コンピュータとは？

産業オートメーションにおいて、理解すべき2つの概念があります：**上位コンピュータ**と**下位コンピュータ**です。

**下位コンピュータ**：現場の「手足」

下位コンピュータは、物理デバイスと直接対話するコントローラーです。工場では通常**PLC（プログラマブルロジックコントローラー）**または**センサー**であり、以下を担当します：

* 現場データの読み取り（温度、圧力、流量、液面など）
* デバイス動作の制御（ポンプ起動、バルブ閉鎖、速度調整など）
* 事前定義されたロジックの自動実行（例：圧力が閾値を超えたらポンプ停止）

下位コンピュータは工場の現場にいる「作業員」と考えることができます。複雑な思考は不要ですが、タスクを確実に実行する必要があります。

**上位コンピュータ**：制御室の「目と頭脳」

上位コンピュータはPCまたは産業用コンピュータ上で動作する監視ソフトウェアであり、私たちが構築する**HMI（ヒューマンマシンインターフェース）**です。以下を担当します：

* 現場データのリアルタイム表示（数値、チャート、アニメーション）
* 履歴データとアラームログの記録
* オペレーターによる遠隔制御の実現
* データ分析とレポートの提供

上位コンピュータは工場の「監視センター」と考えることができます。オペレーターは画面から工場の状態を把握できます。

**通信方式は？**

上位コンピュータと下位コンピュータは、**産業通信プロトコル**を通じてデータを交換します。最も一般的なのは**Modbus**で、1979年に誕生した「ベテラン」プロトコルです。シンプルで信頼性が高く、ほぼすべての産業デバイスでサポートされているため、現在も広く使用されています。

```text
制御室                           工場現場
┌──────────┐    Modbusプロトコル    ┌──────────┐
│ 上位     │ ◄──────────────────►  │ 下位     │
│ コンピュータ│   「圧力を教えて」     │ コンピュータ│
│ (Qt HMI) │   「圧力は1.20MPa」    │ (PLC/センサー)│
│ 表示     │                       │ データ読取│
│ ログ記録 │                       │ 制御     │
│ アラーム │                       │ 保護     │
└──────────┘                       └──────────┘
```

<!-- ![placeholder: Diagram of upper vs lower computer relationship: PC screen (upper computer) on the left, PLC and pump (lower computer) on the right, connected via Modbus](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image1.png) -->

## 1.2 Modbusプロトコルとは？

Modbusは産業通信の「共通言語」です。上位コンピュータと下位コンピュータがどのように「会話」するかを定義します。

**たった2つのコア概念：**

* **レジスタ**：下位コンピュータ内のデータ「セル」。それぞれにアドレス（`0`、`1`、`2`、...）があり、数値を格納します。例えば、アドレス`0`に圧力、アドレス`1`に温度を格納します。
* **読み取り/書き込み操作**：上位コンピュータはレジスタを読み取る（データを取得）またはレジスタに書き込む（制御コマンドを送信）ことができます。

**2つの一般的なModbusバリアント：**

| バリアント | 伝送方式 | 典型的なシナリオ |
|------|---------|---------|
| Modbus RTU | シリアル（RS-485/RS-232） | 短距離、デバイス直結 |
| Modbus TCP | イーサネット（TCP/IP） | 長距離、ネットワーク通信 |

このチュートリアルでは**Modbus TCP**を使用します。ネットワークベースであるため、上位コンピュータアプリと下位コンピュータシミュレーターを同じマシンで実行でき、物理配線が不要です。

## 1.3 なぜQtを選ぶのか？

Qtは産業ソフトウェアのトップフレームワークの選択肢です。工場、病院、交通システムの多くの監視インターフェースがQtで構築されています。その理由はシンプルです：

| 利点 | 説明 |
|------|------|
| クロスプラットフォーム | 一つのコードベースでWindows、Linux、組み込みデバイスにコンパイル |
| 組み込み産業プロトコルサポート | Qt Serial BusがModbusをネイティブサポート、サードパーティライブラリ不要 |
| 強力なチャート機能 | Qt Chartsがプロフェッショナルなリアルタイムチャートを提供 |
| 高パフォーマンス | C++基盤によりリアルタイムデータ更新に適している |
| 成熟と安定 | 30年の歴史、産業分野で実証済み |

## 1.4 何を構築するのか？

実際の工場のポンプ圧力監視をシミュレートする**ポンプ監視HMIシステム**を構築します：

| 機能 | 説明 |
|------|------|
| リアルタイムデータ読み取り | 下位コンピュータから毎秒圧力を読み取り |
| 圧力トレンドチャート | 過去60秒間の圧力の折れ線グラフ |
| 閾値超過アラーム | 圧力が閾値を超えたときに警告ポップアップと赤いUI表示 |
| 故障ログ | すべてのアラームイベントをデータベースに記録し履歴照会可能 |
| 手動制御 | ワンクリックでポンプの起動/停止（下位コンピュータのレジスタに書き込み） |

<!-- ![placeholder: Pump monitoring HMI preview showing real-time pressure number, trend chart, alarm indicator, start/stop button, and log list](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png) -->

## 1.5 チュートリアルロードマップ

以下の手順でフローを完了します：

1. **環境準備とシミュレート下位コンピュータ**（2分）：Qt 6.5とModbus Slaveシミュレーターをインストール
2. **Qtプロジェクトの作成とModbus接続**（3分）：上位アプリとシミュレーター間の通信を確立
3. **リアルタイム読み取りと表示の実装**（3分）：定期圧力読み取りとUI更新
4. **リアルタイム圧力トレンドチャートの描画**（3分）：Qt Chartsによる動的折れ線グラフ
5. **アラームと故障ログの実装**（3分）：閾値超過アラーム + SQLiteログ記録
6. **パッケージングとデプロイ**（オプション）：アプリを単体実行可能ファイルにパッケージング

# 第2章：環境準備とシミュレート下位コンピュータ（2分）

## 2.1 Qt 6.5のインストール

Qtは無料のオープンソース版を提供しており、このチュートリアルには十分です。

1. [Qt公式サイト](https://www.qt.io/download-qt-installer)にアクセスし、Qt Online Installerをダウンロード
2. インストーラーを実行し、Qtアカウントにログインまたは登録（無料）
3. コンポーネント選択で以下をチェック：
   - **Qt 6.5.x**（またはそれ以降）
   - **Additional Libraries**配下の**Qt Serial Bus**（Modbusサポート）
   - **Additional Libraries**配下の**Qt Charts**（チャートレンダリング）
   - **Qt Creator**（IDE、通常デフォルトで選択済み）
4. インストールをクリックして待機

> **ヒント**：Qtが既にインストールされているがSerial BusまたはChartsが欠けている場合、Qt Maintenance Toolを再実行してコンポーネントを追加してください。

<!-- ![placeholder: Qt installer component selection screenshot highlighting Qt Serial Bus and Qt Charts](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 Modbus Slaveのインストール：あなたの「仮想ポンプ」

Modbus Slaveは無料のModbusスレーブシミュレーターです。コンピュータ上で産業デバイス（PLC/センサー）をシミュレートでき、上位アプリとの通信対象となります。

1. [modbustools.com](https://www.modbustools.com/modbus_slave.html)にアクセスし、Modbus Slaveをダウンロード
2. インストールして開く
3. 接続を設定：
   - メニュー **Connection -> Connect**
   - **Modbus TCP/IP**を選択
   - IPアドレス：`127.0.0.1`（ローカルホスト）
   - ポート：`502`（デフォルトのModbus TCPポート）
   - **OK**をクリックしてリッスン開始

4. シミュレーションデータを設定：
   - レジスタテーブルが表示され、各行がレジスタアドレス（`0`、`1`、`2`、...）です
   - アドレス**0**の値をダブルクリックし、**120**に変更（圧力1.20 MPaを意味、アプリ内で100で割ります）
   - アドレス**1**の値をダブルクリックし、**350**に変更（温度35.0°Cを意味）
   - アドレス**2**の値をダブルクリックし、**1**に変更（ポンプ状態：`1=稼働中`、`0=停止`）

これでModbus Slaveがあなたの「24時間稼働の仮想ポンプ」になります。ウィンドウを開いたままにしてください。読み取り/書き込みリクエストに継続的に応答します。

<!-- ![placeholder: Modbus Slave screenshot showing TCP config and simulated register values](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **動的シミュレーションのヒント**：Modbus Slaveは自動増分/ランダム変更をサポートしています。レジスタ値を右クリックし「Auto increment」または「Random」を選択すると、リアルなセンサー変動をシミュレートできます。

# 第3章：Qtプロジェクトの作成とModbus接続（3分）

## 3.1 新しいQtプロジェクトの作成

Qt Creatorを開き、新しいプロジェクトを作成します：

1. **File -> New Project**をクリック
2. **Application (Qt) -> Qt Widgets Application**を選択
3. プロジェクト名：**PumpHMI**
4. インストール済みのQt 6.5キットを選択
5. 作成を完了

`PumpHMI.pro`（またはCMakeを使用する場合は`CMakeLists.txt`）を開き、主要モジュールを追加：

```pro
QT += core gui widgets serialbus charts sql
```

| モジュール | 用途 |
|------|------|
| `serialbus` | Modbus TCP通信用の `QModbusTcpClient` を提供 |
| `charts` | リアルタイムトレンドチャート用の `QChart`、`QLineSeries` を提供 |
| `sql` | SQLite故障ログ用の `QSqlDatabase` を提供 |

CMakeを使用する場合、同等の設定：

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 コアメンバーの宣言

AIにヘッダーファイルの生成を依頼します：

```text
ポンプ監視HMIのコアメンバーを含むmainwindow.hを作成してください：
1. Modbus TCP通信用のQModbusTcpClient
2. 定期データ読み取り用のQTimer
3. リアルタイムトレンドチャート用のQChart + QLineSeries
4. 故障ログストレージ用のQSqlDatabase
5. UI要素：圧力ラベル、ステータスインジケーター、起動/停止ボタン、ログテーブル
```

コアヘッダー：

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
    void connectModbus();        // 下位コンピュータに接続
    void readPressure();         // 定期圧力読み取り
    void onReadReady();          // 読み取りコールバック
    void triggerAlarm(float v);  // アラームトリガー
    void togglePump();           // ポンプ起動/停止

private:
    // Modbus通信
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // リアルタイムチャート
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // データベース
    QSqlDatabase m_db;

    // UI要素
    QLabel *m_pressureLabel = nullptr;    // 圧力表示
    QLabel *m_statusLight = nullptr;      // ステータスインジケーター
    QPushButton *m_pumpButton = nullptr;  // 起動/停止ボタン
    QTableWidget *m_logTable = nullptr;   // ログテーブル

    // アラーム閾値
    float m_alarmThreshold = 1.50f;  // 1.50 MPaを超えたらアラーム
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Screenshot of mainwindow.h in Qt Creator](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 Modbus TCP接続の構築

`mainwindow.cpp`に接続ロジックを実装します：

```cpp
// mainwindow.cpp - 接続セクション
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Modbus Slaveシミュレーターに接続
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 1秒タイムアウト
    m_modbusClient->setNumberOfRetries(3);  // 3回リトライ

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("下位コンピュータへの接続に失敗しました！", 3000);
        return;
    }

    statusBar()->showMessage("下位コンピュータに接続済み (127.0.0.1:502)", 3000);

    // タイマーを開始、毎秒1回読み取り
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1秒
}
```

**コードの解説：**

| コード | 意味 |
|------|------|
| `QModbusTcpClient` | Qt内蔵のModbus TCPクライアント、下位コンピュータと通信 |
| `NetworkPortParameter, 502` | ポート`502`に接続（Modbus Slaveの設定と同じ） |
| `NetworkAddressParameter, "127.0.0.1"` | ローカルホストに接続（シミュレーターはローカルで実行） |
| `m_pollTimer->start(1000)` | 毎秒 `readPressure()` を呼び出し |

## 3.4 圧力データの読み取り

```cpp
// mainwindow.cpp - 読み取りセクション
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // 読み取りリクエストを構築：アドレス0から開始、3つのホールディングレジスタを読み取り
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // レジスタタイプ
        0,                                   // 開始アドレス
        3                                    // 数量
    );

    // 非同期読み取りリクエストを送信
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // ブロードキャストリクエスト、直接削除
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // 値を解析（レジスタ値を実単位に変換）
        float pressure = unit.value(0) / 100.0f;   // アドレス0：圧力 (MPa)
        float temperature = unit.value(1) / 10.0f;  // アドレス1：温度 (°C)
        int pumpStatus = unit.value(2);              // アドレス2：ポンプ状態

        // UIを更新
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // アラームをチェック
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // トレンドチャートを更新（次章で実装）
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("読み取り失敗： %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus読み取りフロー：**

```text
readPressure()がタイマーでトリガー
    -> QModbusDataUnitを構築（「アドレス0-2を読み取り」）
    -> sendReadRequest()で非同期送信（UIはブロックされない）
    -> 下位コンピュータがデータを返信
    -> onReadReady()がトリガー
    -> レジスタ値を解析してUIを更新
```

<!-- ![placeholder: Running app screenshot showing real-time pressure updates and status bar "connected to lower computer"](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# 第4章：リアルタイム圧力トレンドの描画（3分）

## 4.1 チャートの初期化

Qt Chartsはプロフェッショナルなチャートコンポーネントを提供します。コンストラクタでAIに初期化を依頼します：

```text
MainWindowコンストラクタでQt Chartsリアルタイム折れ線グラフを初期化してください：
1. QChartとQLineSeriesを作成
2. X軸にQDateTimeAxisを使用、直近60秒を表示
3. Y軸にQValueAxisを使用、範囲0-3.0 MPa
4. 線の色を青、太さ2px
5. チャートをQChartViewに配置しレイアウトに追加
```

コアコード：

```cpp
// mainwindow.cpp - チャート初期化
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pressure (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Real-time Pressure Trend");
    m_chart->setAnimationOptions(QChart::NoAnimation); // リアルタイムデータではアニメーションなし

    // X軸：時間
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Time");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y軸：圧力
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pressure (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // チャートビューを作成
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // レイアウトに追加（centralLayoutが既存と仮定）
    centralLayout->addWidget(chartView);
}
```

## 4.2 チャートのリアルタイム更新

新しい圧力値が読み取られるたびに、ポイントを1つ追加し、直近60秒分のみ保持します：

```cpp
// mainwindow.cpp - チャート更新
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // 新しいポイントを追加
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // 直近60秒のデータのみ保持
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // X軸の範囲を更新：常に直近60秒を表示
    m_axisX->setRange(cutoff, now);
}
```

次に `onReadReady()` で呼び出します：

```cpp
// onReadReady()の圧力解析の後に追加：
updateChart(pressure);
```

プログラムを実行すると、青い線がリアルタイムで更新され、毎秒1ポイントずつ、常に直近60秒を表示します。Modbus Slaveでレジスタ値を手動で変更すると、線が即座に変化を反映します。

<!-- ![placeholder: Real-time pressure trend screenshot showing scrolling blue line, time X-axis, pressure Y-axis](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **パフォーマンスのヒント**：`QChart::NoAnimation`は重要です。リアルタイムデータは毎秒更新されるため、アニメーションはUIのラグを引き起こす可能性があります。これは産業用HMIの一般的なプラクティスです。

# 第5章：アラームシステムと故障ログ（3分）

## 5.1 閾値超過アラーム

圧力が閾値を超えたとき、赤いUI警告 + ポップアップアラート + ログ記録が必要です。

```cpp
// mainwindow.cpp - アラームロジック
void MainWindow::triggerAlarm(float pressure)
{
    // UIを赤に変更
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // ステータスインジケーターを赤に
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // ポップアップアラーム（閾値を最初に超えた時のみ、繰り返しポップアップを防止）
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Pressure Alarm",
            QString("現在の圧力 %1 MPa が閾値 %2 MPa を超えています！\n直ちにポンプの状態を確認してください。")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // データベースに記録
    logAlarm(pressure,
        QString("圧力閾値超過： %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // 圧力が正常に戻ったときにリセット
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

<!-- ![placeholder: Over-threshold alarm screenshot showing red pressure background, red indicator, and alarm popup](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 SQLite故障ログ

産業システムではトレーサビリティのためにすべてのアラームイベントをログに記録する必要があります。SQLiteを使用します：

```cpp
// mainwindow.cpp - データベース初期化
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "データベースを開けません：" << m_db.lastError().text();
        return;
    }

    // アラームテーブルを作成
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

## 5.3 ログの記録と表示

```cpp
// mainwindow.cpp - ログ書き込み
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // データベースに書き込み
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // 画面上のテーブルを更新
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // 最新の行に自動スクロール
    m_logTable->scrollToBottom();
}
```

ログテーブルは3列：時刻、圧力値、アラームメッセージ。各アラームが1行追加され、SQLiteに永続化されます。

<!-- ![placeholder: Fault log table screenshot with multiple records including timestamp, pressure, and alarm message](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 ポンプの手動起動/停止

データの読み取りだけでなく、上位コンピュータは下位コンピュータを制御する必要があります。レジスタ値の書き込みによって行います：

```cpp
// mainwindow.cpp - ポンプ制御
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // 書き込みリクエストを構築：アドレス2に1（起動）または0（停止）を書き込み
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "ポンプ停止" : "ポンプ起動");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "ポンプ起動済み" : "ポンプ停止済み", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

Modbus Slaveでは、ボタンをクリックするたびにアドレス`2`が`0`と`1`の間で切り替わるのが確認できます。これが上位コンピュータの「制御」プロセスです。

<!-- ![placeholder: Pump start/stop button screenshot showing green "Start Pump" and red "Stop Pump" states](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# 第6章：パッケージングとデプロイ（オプション）

## 6.1 windeployqt / macdeployqtでパッケージング

Qtは必要な動的ライブラリを自動収集する公式デプロイツールを提供しています。

**Windows：**

```bash
# まずReleaseビルド、次にビルドディレクトリで実行：
windeployqt PumpHMI.exe
```

`windeployqt`はQt DLL、プラグイン、翻訳ファイルなどを本体の実行ファイルの横にコピーします。そのパッケージフォルダをそのまま配布できます。

**macOS：**

```bash
macdeployqt PumpHMI.app -dmg
```

これにより`.dmg`インストーラーイメージが生成されます。

## 6.2 Qt Installer Frameworkでインストーラーを構築

プロフェッショナルなセットアップウィザード（「次へ -> 次へ -> 完了」）が必要な場合、Qt Installer Frameworkを使用します：

```text
Qt Installer FrameworkでPumpHMIのインストーラーを作成してください：
1. インストーラーディレクトリ構造（config、packages）を作成
2. config.xmlを設定（インストーラー名、バージョン、インストール先ディレクトリ）
3. windeployqtの出力ファイルをpackages/com.example.pumphmi/data/に配置
4. binarycreatorを実行してインストーラーを生成
```

<!-- ![placeholder: PumpHMI setup wizard screenshot showing install path and progress](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image11.png) -->

# 第7章：まとめ

おめでとうございます！ゼロから産業用のポンプ監視HMIシステムを構築しました。振り返り：

1. 上位コンピュータ、下位コンピュータ、Modbusプロトコルのコア概念を理解
2. Modbus Slaveで「仮想ポンプ」をシミュレート、実際のハードウェア不要
3. Qt `QModbusTcpClient`を使用して上位居/下位通信を構築
4. Qt Chartsでリアルタイムローリング圧力トレンドチャートを描画
5. 閾値超過ポップアップアラームとSQLite故障ログを実装
6. リモートポンプ起動/停止制御を実装

全過程で実際の産業ハードウェアを使用しませんでしたが、アーキテクチャと機能は実際の工場HMIシステムと一致しています。Modbus Slaveを実際のPLCに置き換えれば、このアプリは本番環境で直接使用可能です。

**高度な発展方向：**

* **マルチデバイス監視**：複数の下位コンピュータに接続し、タブ/分割ビューで異なるデバイスデータを表示
* **履歴再生**：SQLiteから履歴データを読み取り、タイムラインコントロールでトレンドチャートを再生
* **OPC UAプロトコル**：Modbusはシンプルなシナリオに適していますが、複雑な産業システムではOPC UAを使用することが多く、これもQtでサポートされています（Qt OPC UAモジュール）
* **Webリモート監視**：Qt WebSocketを使用してリアルタイムデータをブラウザにプッシュし、モバイルで閲覧可能に
* **AI予知保全**：履歴圧力データをMLモデルに入力し、事前に故障を予測

***コードで産業現場のすべてのデバイスを守りましょう。***

# 参考文献

* [Qt Serial Bus Docs](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Qt Modbus TCP Client Example](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Qt Charts Docs](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Modbus Protocol Specs](https://modbus.org/specs.php)
* [Modbus Slave Simulator](https://www.modbustools.com/modbus_slave.html)
* [Qt Installer Framework Docs](https://doc.qt.io/qtinstallerframework/)
