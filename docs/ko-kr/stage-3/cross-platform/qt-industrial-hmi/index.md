# 산업용 Qt 데스크톱 앱 만들기: 펌프 모니터링 HMI 시스템

# 1장: 산업용 HMI와 Qt 개발이란

이 튜토리얼에서는 하나의 완전한 사이클을 완성할 것입니다: Qt를 사용하여 산업용 펌프 모니터링 HMI(Human-Machine Interface) 시스템을 처음부터 만듭니다. 센서 데이터를 실시간으로 읽고, 압력 추이 차트를 그리며, 임계값 초과 자동 알람을 트리거하고, 고장 로그를 기록할 수 있습니다. 전체 과정은 실제 산업용 하드웨어 대신 PC에서 무료 시뮬레이션 소프트웨어를 사용합니다.

이 튜토리얼을 따라하려면 최소한 다음이 필요합니다:

- 컴퓨터(Windows 또는 Mac, 산업용 소프트웨어 호환성을 위해 Windows 권장)
- Qt 6.5 개발 환경(Qt Creator + Qt Serial Bus + Qt Charts 모듈)
- Modbus Slave 시뮬레이션 소프트웨어(무료 다운로드, "가상 펌프"로 작동)
- AI 코딩 어시스턴트(Cursor / Trae / Claude Code)

> **하드웨어 제로, 비용 제로**: 무료 PC 시뮬레이션 소프트웨어(Modbus Slave)를 하위 기기로 사용하고, 하드웨어를 구매할 필요가 없습니다. 공식 Qt `QModbusTcpClient` + Qt Charts 모듈을 직접 사용하며, 수동 프로토콜 파싱이 필요 없습니다. 실행 후 실시간 압력 추이, 임계값 초과 알람 팝업, 고장 로그를 볼 수 있으며, 실제 공장 워크플로와 일치합니다.

## 1.1 상위 컴퓨터와 하위 컴퓨터란?

산업 자동화에서 반드시 이해해야 할 두 가지 개념이 있습니다: **상위 컴퓨터**와 **하위 컴퓨터**.

**하위 컴퓨터**: 현장의 "손과 발"

하위 컴퓨터는 물리적 기기와 직접 상호작용하는 컨트롤러입니다. 공장에서는 보통 **PLC(프로그래밍 가능 로직 컨트롤러)** 또는 **센서**이며, 다음을 담당합니다:

* 현장 데이터 읽기(온도, 압력, 유량, 액위 등)
* 기기 동작 제어(펌프 시작, 밸브 닫기, 속도 조절 등)
* 미리 정의된 로직 자동 실행(예: 압력이 임계값을 초과하면 펌프 정지)

하위 컴퓨터를 공장 현장의 "작업자"로 생각할 수 있습니다. 복잡한 사고가 필요 없지만 작업을 안정적으로 수행해야 합니다.

**상위 컴퓨터**: 제어실의 "눈과 뇌"

상위 컴퓨터는 PC나 산업용 컴퓨터에서 실행되는 모니터링 소프트웨어로, 오늘 만들 **HMI(Human-Machine Interface)**입니다. 다음을 담당합니다:

* 현장 데이터를 실시간으로 표시(숫자, 차트, 애니메이션)
* 이력 데이터 및 알람 로그 기록
* 운영자를 위한 원격 제어 활성화
* 데이터 분석 및 보고서 제공

상위 컴퓨터를 공장의 "모니터링 센터"로 생각할 수 있습니다. 운영자가 화면에서 공장 상태를 파악할 수 있습니다.

**둘은 어떻게 통신할까?**

상위와 하위 컴퓨터는 **산업 통신 프로토콜**을 통해 데이터를 교환합니다. 가장 일반적인 것은 **Modbus**로, 1979년에 탄생한 "베테랑" 프로토콜입니다. 단순하고 신뢰할 수 있으며 거의 모든 산업 기기에서 지원되기 때문에 여전히 널리 사용됩니다.

```text
제어실                           공장 현장
┌──────────┐    Modbus 프로토콜    ┌──────────┐
│ 상위     │ ◄──────────────────►  │ 하위     │
│ 컴퓨터   │   "압력 알려줘"       │ 컴퓨터   │
│ (Qt HMI) │   "압력은 1.20MPa"   │ (PLC/센서)│
│ 표시     │                       │ 데이터 읽기│
│ 로그 기록│                       │ 제어     │
│ 알람     │                       │ 보호     │
└──────────┘                       └──────────┘
```

<!-- ![placeholder: 상위 대 하위 컴퓨터 관계 다이어그램: 왼쪽에 PC 화면(상위 컴퓨터), 오른쪽에 PLC와 펌프(하위 컴퓨터), Modbus로 연결](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image1.png) -->

## 1.2 Modbus 프로토콜이란?

Modbus는 산업 통신의 "공용어"입니다. 상위와 하위 컴퓨터가 어떻게 "대화"하는지 정의합니다.

**단 두 가지 핵심 개념:**

* **레지스터**: 하위 컴퓨터의 데이터 "셀". 각각 주소(`0`, `1`, `2`, ...)를 가지며 숫자를 저장합니다. 예를 들어 주소 `0`은 압력을, 주소 `1`은 온도를 저장합니다.
* **읽기/쓰기 작업**: 상위 컴퓨터는 레지스터를 읽거나(데이터 획득) 레지스터에 쓸 수 있습니다(제어 명령 전송).

**두 가지 일반적인 Modbus 변형:**

| 변형 | 전송 | 일반적인 시나리오 |
|------|---------|---------|
| Modbus RTU | 시리얼(RS-485/RS-232) | 짧은 거리, 직접 기기 연결 |
| Modbus TCP | 이더넷(TCP/IP) | 장거리, 네트워크 통신 |

이 튜토리얼은 **Modbus TCP**를 사용합니다. 네트워크 기반이므로 상위 컴퓨터 앱과 하위 컴퓨터 시뮬레이터를 물리적 배선 없이 같은 기기에서 실행할 수 있습니다.

## 1.3 왜 Qt를 선택할까?

Qt는 산업용 소프트웨어의 최고 프레임워크 선택입니다. 공장, 병원, 교통 시스템의 많은 모니터링 인터페이스가 Qt로 만들어집니다. 이유는 간단합니다:

| 장점 | 설명 |
|------|------|
| 크로스 플랫폼 | 하나의 코드베이스로 Windows, Linux, 임베디드 기기에 컴파일 |
| 산업 프로토콜 내장 지원 | Qt Serial Bus가 Modbus를 기본 지원, 서드파티 라이브러리 불필요 |
| 강력한 차트 | Qt Charts가 전문적인 실시간 차트 제공 |
| 고성능 | C++ 기반으로 실시간 데이터 갱신에 적합 |
| 성숙하고 안정적 | 30년 역사, 산업 분야에서 검증됨 |

## 1.4 무엇을 만들까?

실제 공장 펌프 압력 모니터링을 시뮬레이션하는 **펌프 모니터링 HMI 시스템**을 만듭니다:

| 기능 | 설명 |
|------|------|
| 실시간 데이터 읽기 | 매초 하위 컴퓨터에서 압력 읽기 |
| 압력 추이 차트 | 최근 60초간 압력 꺾은선 차트 |
| 임계값 초과 알람 | 압력이 임계값을 초과하면 팝업 경고 및 빨간 UI |
| 고장 로그 | 모든 알람 이벤트를 데이터베이스에 기록하여 이력 조회 |
| 수동 제어 | 원클릭 펌프 시작/정지(하위 컴퓨터 레지스터에 쓰기) |

<!-- ![placeholder: 실시간 압력 숫자, 추이 차트, 알람 표시기, 시작/정지 버튼, 로그 목록이 있는 펌프 모니터링 HMI 미리보기](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png) -->

## 1.5 튜토리얼 로드맵

다음 단계로 흐름을 완성하겠습니다:

1. **환경 및 시뮬레이션된 하위 컴퓨터 준비**(2분): Qt 6.5 및 Modbus Slave 시뮬레이터 설치
2. **Qt 프로젝트 생성 및 Modbus 연결**(3분): 상위 앱과 시뮬레이터 간 통신 확립
3. **실시간 읽기 및 표시 구현**(3분): 타이머 압력 읽기 및 UI 업데이트
4. **실시간 압력 추이 차트 그리기**(3분): Qt Charts로 동적 꺾은선 차트
5. **알람 및 고장 로그 구현**(3분): 임계값 초과 알람 + SQLite 로깅
6. **패키징 및 배포**(선택): 앱을 독립 실행 파일로 패키징

# 2장: 환경 및 시뮬레이션된 하위 컴퓨터 준비(2분)

## 2.1 Qt 6.5 설치

Qt는 이 튜토리얼에 충분한 무료 오픈소스 버전을 제공합니다.

1. [Qt 공식 사이트](https://www.qt.io/download-qt-installer)를 방문하여 Qt Online Installer 다운로드
2. 설치 프로그램 실행, Qt 계정으로 로그인 또는 등록(무료)
3. 컴포넌트 선택에서 다음을 체크:
   - **Qt 6.5.x**(또는 최신 버전)
   - **Additional Libraries** 아래 **Qt Serial Bus**(Modbus 지원)
   - **Additional Libraries** 아래 **Qt Charts**(차트 렌더링)
   - **Qt Creator**(IDE, 보통 기본 선택됨)
4. 설치 클릭 후 대기

> **팁**: Qt가 이미 설치되어 있지만 Serial Bus나 Charts가 누락된 경우, Qt Maintenance Tool을 다시 실행하여 컴포넌트를 추가하세요.

<!-- ![placeholder: Qt Serial Bus와 Qt Charts가 강조된 Qt 설치 프로그램 컴포넌트 선택 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 Modbus Slave 설치: "가상 펌프"

Modbus Slave는 무료 Modbus 슬레이브 시뮬레이터입니다. 컴퓨터에서 산업 기기(PLC/센서)를 시뮬레이션하여 상위 앱이 통신할 대상을 갖게 합니다.

1. [modbustools.com](https://www.modbustools.com/modbus_slave.html)을 방문하여 Modbus Slave 다운로드
2. 설치 후 열기
3. 연결 설정:
   - 메뉴 **Connection -> Connect**
   - **Modbus TCP/IP** 선택
   - IP 주소: `127.0.0.1`(localhost)
   - 포트: `502`(기본 Modbus TCP 포트)
   - **OK** 클릭하여 대기

4. 시뮬레이션 데이터 설정:
   - 레지스터 테이블이 보이며, 각 행이 레지스터 주소(`0`, `1`, `2`, ...)
   - 주소 **0**의 값을 더블클릭하여 **120**으로 변경(압력 1.20 MPa, 앱에서 100으로 나눔)
   - 주소 **1**의 값을 더블클릭하여 **350**으로 변경(온도 35.0°C)
   - 주소 **2**의 값을 더블클릭하여 **1**로 변경(펌프 상태: `1=실행 중`, `0=정지`)

이제 Modbus Slave가 "24시간 가상 펌프"입니다. 창을 열어두세요; 읽기/쓰기 요청에 계속 응답할 것입니다.

<!-- ![placeholder: TCP 설정과 시뮬레이션된 레지스터 값이 보이는 Modbus Slave 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **동적 시뮬레이션 팁**: Modbus Slave는 자동 증가/무작위 변경을 지원합니다. 레지스터 값을 마우스 오른쪽 버튼으로 클릭하고 "Auto increment" 또는 "Random"을 선택하면 현실적인 센서 변동을 시뮬레이션할 수 있습니다.

# 3장: Qt 프로젝트 생성 및 Modbus 연결(3분)

## 3.1 새 Qt 프로젝트 만들기

Qt Creator를 열고 새 프로젝트를 만듭니다:

1. **File -> New Project** 클릭
2. **Application (Qt) -> Qt Widgets Application** 선택
3. 프로젝트 이름: **PumpHMI**
4. 설치된 Qt 6.5 키트 선택
5. 생성 완료

`PumpHMI.pro`(또는 CMake를 사용하는 경우 `CMakeLists.txt`)를 열고 핵심 모듈을 추가합니다:

```pro
QT += core gui widgets serialbus charts sql
```

| 모듈 | 용도 |
|------|------|
| `serialbus` | Modbus TCP 통신을 위한 `QModbusTcpClient` 제공 |
| `charts` | 실시간 추이 차트를 위한 `QChart`, `QLineSeries` 제공 |
| `sql` | SQLite 고장 로그를 위한 `QSqlDatabase` 제공 |

CMake를 사용하는 경우 동일한 설정:

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 핵심 멤버 선언

AI에게 헤더 파일 생성을 요청합니다:

```text
Please help me write mainwindow.h with core members for pump monitoring HMI:
1. QModbusTcpClient for Modbus TCP communication
2. QTimer for timed data reading
3. QChart + QLineSeries for real-time trend chart
4. QSqlDatabase for fault log storage
5. UI elements: pressure label, status indicator, start/stop button, log table
```

핵심 헤더:

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
    void connectModbus();        // 하위 컴퓨터 연결
    void readPressure();         // 타이머 압력 읽기
    void onReadReady();          // 읽기 콜백
    void triggerAlarm(float v);  // 알람 트리거
    void togglePump();           // 펌프 시작/정지

private:
    // Modbus 통신
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // 실시간 차트
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // 데이터베이스
    QSqlDatabase m_db;

    // UI 요소
    QLabel *m_pressureLabel = nullptr;    // 압력 표시
    QLabel *m_statusLight = nullptr;      // 상태 표시기
    QPushButton *m_pumpButton = nullptr;  // 시작/정지 버튼
    QTableWidget *m_logTable = nullptr;   // 로그 테이블

    // 알람 임계값
    float m_alarmThreshold = 1.50f;  // 1.50 MPa 초과 시 알람
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Qt Creator의 mainwindow.h 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 Modbus TCP 연결 구축

`mainwindow.cpp`에서 연결 로직을 구현합니다:

```cpp
// mainwindow.cpp - 연결 부분
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Modbus Slave 시뮬레이터에 연결
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // 1초 타임아웃
    m_modbusClient->setNumberOfRetries(3);  // 3회 재시도

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("하위 컴퓨터 연결 실패!", 3000);
        return;
    }

    statusBar()->showMessage("하위 컴퓨터에 연결됨 (127.0.0.1:502)", 3000);

    // 타이머 시작, 매초 읽기
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1초
}
```

**코드 설명:**

| 코드 | 의미 |
|------|------|
| `QModbusTcpClient` | Qt 내장 Modbus TCP 클라이언트, 하위 컴퓨터와 통신 |
| `NetworkPortParameter, 502` | 포트 `502`에 연결(Modbus Slave 설정과 동일) |
| `NetworkAddressParameter, "127.0.0.1"` | localhost에 연결(시뮬레이터가 로컬에서 실행) |
| `m_pollTimer->start(1000)` | 매초 `readPressure()` 호출 |

## 3.4 압력 데이터 읽기

```cpp
// mainwindow.cpp - 읽기 부분
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // 읽기 요청 생성: 주소 0부터 3개의 홀딩 레지스터 읽기
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // 레지스터 유형
        0,                                   // 시작 주소
        3                                    // 수량
    );

    // 비동기 읽기 요청 전송
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // 브로드캐스트 요청, 바로 삭제
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // 값 파싱(레지스터 값을 실제 단위로 나눔)
        float pressure = unit.value(0) / 100.0f;   // 주소 0: 압력 (MPa)
        float temperature = unit.value(1) / 10.0f;  // 주소 1: 온도 (°C)
        int pumpStatus = unit.value(2);              // 주소 2: 펌프 상태

        // UI 업데이트
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // 알람 확인
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // 추이 차트 업데이트(다음 장에서 구현)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("읽기 실패: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Modbus 읽기 흐름:**

```text
readPressure() 타이머에 의해 트리거
    -> QModbusDataUnit 생성("주소 0-2 읽기")
    -> sendReadRequest() 비동기 전송(UI 차단 안 함)
    -> 하위 컴퓨터가 데이터 반환
    -> onReadReady() 트리거
    -> 레지스터 값 파싱 및 UI 업데이트
```

<!-- ![placeholder: 실시간 압력 업데이트와 상태 표시줄에 "하위 컴퓨터에 연결됨"이 표시된 실행 중인 앱 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# 4장: 실시간 압력 추이 그리기(3분)

## 4.1 차트 초기화

Qt Charts는 전문적인 차트 컴포넌트를 제공합니다. 생성자에서 초기화하도록 AI에게 요청합니다:

```text
Please help me initialize Qt Charts real-time line chart in MainWindow constructor:
1. Create QChart and QLineSeries
2. X axis uses QDateTimeAxis, showing latest 60 seconds
3. Y axis uses QValueAxis, range 0-3.0 MPa
4. Line color blue, width 2px
5. Place chart into QChartView and add to layout
```

핵심 코드:

```cpp
// mainwindow.cpp - 차트 초기화
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pressure (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Real-time Pressure Trend");
    m_chart->setAnimationOptions(QChart::NoAnimation); // 실시간 데이터에는 애니메이션 없음

    // X축: 시간
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Time");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Y축: 압력
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pressure (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // 차트 뷰 생성
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // 레이아웃에 추가(기존 centralLayout이 있다고 가정)
    centralLayout->addWidget(chartView);
}
```

## 4.2 실시간 차트 업데이트

새로운 압력 값을 읽을 때마다 한 점을 추가하고 최근 60초만 유지합니다:

```cpp
// mainwindow.cpp - 차트 업데이트
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // 새 점 추가
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // 최근 60초 데이터만 유지
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // X축 범위 업데이트: 항상 최근 60초 표시
    m_axisX->setRange(cutoff, now);
}
```

그런 다음 `onReadReady()`에서 호출합니다:

```cpp
// onReadReady()의 압력 파싱 뒤에 추가:
updateChart(pressure);
```

이제 프로그램을 실행하세요. 매초 업데이트되는 파란색 선을 볼 수 있으며, 항상 최근 60초를 표시합니다. Modbus Slave에서 레지스터 값을 수동으로 수정하면 선이 즉시 변화를 반영합니다.

<!-- ![placeholder: 스크롤되는 파란색 선, 시간 X축, 압력 Y축이 보이는 실시간 압력 추이 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **성능 팁**: `QChart::NoAnimation`이 중요합니다. 실시간 데이터는 매초 갱신되며, 애니메이션은 UI 지연을 유발할 수 있습니다. 이것은 일반적인 산업용 HMI 관행입니다.

# 5장: 알람 시스템 및 고장 로그(3분)

## 5.1 임계값 초과 알람

압력이 임계값을 초과하면 다음이 필요합니다: 빨간 UI 경고 + 팝업 알림 + 로그 기록.

```cpp
// mainwindow.cpp - 알람 로직
void MainWindow::triggerAlarm(float pressure)
{
    // UI를 빨간색으로 변경
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // 상태 표시기 빨간색
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // 팝업 알람(반복 팝업을 피하기 위해 임계값을 처음 넘을 때만)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Pressure Alarm",
            QString("Current pressure %1 MPa exceeds threshold %2 MPa!\nPlease check pump status immediately.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // DB에 기록
    logAlarm(pressure,
        QString("Pressure over threshold: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // 압력이 정상으로 돌아오면 리셋
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

<!-- ![placeholder: 빨간 압력 배경, 빨간 표시기, 알람 팝업이 보이는 임계값 초과 알람 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 SQLite 고장 로그

산업 시스템은 추적 가능성을 위해 모든 알람 이벤트를 기록해야 합니다. SQLite를 사용합니다:

```cpp
// mainwindow.cpp - 데이터베이스 초기화
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "Cannot open database:" << m_db.lastError().text();
        return;
    }

    // 알람 테이블 생성
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

## 5.3 로그 기록 및 표시

```cpp
// mainwindow.cpp - 로그 작성
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // DB에 쓰기
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // 화면 테이블 업데이트
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // 최신 행으로 자동 스크롤
    m_logTable->scrollToBottom();
}
```

로그 테이블은 세 개의 열을 가집니다: 시간, 압력 값, 알람 메시지. 각 알람은 한 행을 추가하고 SQLite에 영구 저장됩니다.

<!-- ![placeholder: 타임스탬프, 압력, 알람 메시지가 포함된 여러 레코드가 있는 고장 로그 테이블 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 수동 펌프 시작/정지

데이터를 읽는 것 외에도 상위 컴퓨터는 하위 컴퓨터를 제어해야 합니다. 레지스터 값을 쓰는 것으로 이를 수행합니다:

```cpp
// mainwindow.cpp - 펌프 제어
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // 쓰기 요청 생성: 주소 2에 1(시작) 또는 0(정지) 쓰기
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

Modbus Slave에서 버튼을 클릭할 때마다 주소 `2`가 `0`과 `1` 사이를 전환하는 것을 볼 수 있습니다. 이것이 상위 컴퓨터의 "제어" 과정입니다.

<!-- ![placeholder: 녹색 "Start Pump"와 빨간 "Stop Pump" 상태가 보이는 펌프 시작/정지 버튼 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# 6장: 패키징 및 배포(선택)

## 6.1 windeployqt / macdeployqt로 패키징

Qt는 필요한 동적 라이브러리를 자동으로 수집하는 공식 배포 도구를 제공합니다.

**Windows:**

```bash
# 먼저 Release 빌드, 그런 다음 빌드 디렉토리에서 실행:
windeployqt PumpHMI.exe
```

`windeployqt`가 Qt DLL, 플러그인, 번역 파일 등을 실행 파일 옆에 복사합니다. 패키징된 폴더를 직접 전송할 수 있습니다.

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

이것은 `.dmg` 설치 이미지를 생성합니다.

## 6.2 Qt Installer Framework로 설치 프로그램 빌드

전문적인 설정 마법사("다음 -> 다음 -> 완료")를 원한다면 Qt Installer Framework를 사용합니다:

```text
Please help me create an installer for PumpHMI with Qt Installer Framework:
1. Create installer directory structure (config, packages)
2. Configure config.xml (installer name, version, target directory)
3. Put windeployqt output files into packages/com.example.pumphmi/data/
4. Run binarycreator to generate installer
```

<!-- ![placeholder: 설치 경로와 진행 상황이 보이는 PumpHMI 설정 마법사 스크린샷](/zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image11.png) -->

# 7장: 마무리

축하합니다! 산업용 펌프 모니터링 HMI 시스템을 처음부터 만들었습니다. 회고:

1. 상위 컴퓨터, 하위 컴퓨터, Modbus 프로토콜의 핵심 개념을 이해함
2. Modbus Slave로 "가상 펌프"를 시뮬레이션하고, 실제 하드웨어 없이 구현
3. Qt `QModbusTcpClient`를 사용하여 상위-하위 통신 구축
4. Qt Charts로 실시간 스크롤 압력 추이 차트를 그림
5. 임계값 초과 팝업 알람과 SQLite 고장 로그를 구현함
6. 원격 펌프 시작/정지 제어를 구현함

전체 과정에서 실제 산업용 하드웨어를 사용하지 않았지만, 아키텍처와 기능은 실제 공장 HMI 시스템과 일치합니다. Modbus Slave를 실제 PLC로 교체하면 이 앱을 프로덕션 시나리오에서 직접 사용할 수 있습니다.

**고급 방향:**

* **멀티 기기 모니터링**: 여러 하위 컴퓨터에 연결하고 탭/분할 뷰로 다른 기기 데이터 표시
* **이력 재생**: SQLite에서 이력 데이터를 읽고 타임라인 컨트롤로 추이 차트 재생
* **OPC UA 프로토콜**: Modbus는 단순한 시나리오에 적합; 복잡한 산업 시스템은 종종 OPC UA를 사용하며, Qt(Qt OPC UA 모듈)도 지원함
* **웹 원격 모니터링**: Qt WebSocket을 사용하여 실시간 데이터를 브라우저에 푸시하여 모바일에서 확인
* **AI 예측 유지보수**: 이력 압력 데이터를 ML 모델에 입력하여 고장을 사전에 예측

***코드로 산업 현장의 모든 기기를 보호하세요.***

# 참고 자료

* [Qt Serial Bus 문서](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Qt Modbus TCP 클라이언트 예제](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Qt Charts 문서](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Modbus 프로토콜 사양](https://modbus.org/specs.php)
* [Modbus Slave 시뮬레이터](https://www.modbustools.com/modbus_slave.html)
* [Qt Installer Framework 문서](https://doc.qt.io/qtinstallerframework/)
