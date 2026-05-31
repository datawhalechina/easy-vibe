# Como Construir una Aplicacion de Escritorio Industrial Qt: Sistema HMI de Monitoreo de Bombas

# Capitulo 1: Que Son las HMI Industriales y el Desarrollo Qt

En este tutorial, completaremos un ciclo completo: construir un sistema HMI (Interfaz Humano-Maquina) industrial de monitoreo de bombas desde cero con Qt. Puede leer datos de sensores en tiempo real, dibujar graficos de tendencia de presion, activar alarmas automaticas por superacion de umbral y registrar registros de fallos. Todo el proceso usa software de simulacion gratuito en una PC en lugar de hardware industrial real.

Para este tutorial, debes tener al menos:

- Una computadora (Windows o Mac, se recomienda Windows para mejor compatibilidad con software industrial)
- Entorno de desarrollo Qt 6.5 (modulos Qt Creator + Qt Serial Bus + Qt Charts)
- Software de simulacion Modbus Slave (descarga gratuita, funciona como una "bomba virtual")
- Tu asistente de programacion con IA (Cursor / Trae / Claude Code)

> **Cero hardware, cero costo**: usa el software de simulacion gratuito en PC (Modbus Slave) como el dispositivo de nivel inferior; no necesitas comprar hardware. Usa directamente los modulos oficiales `QModbusTcpClient` + Qt Charts de Qt, sin necesidad de analisis manual de protocolo. Despues de ejecutar, veras tendencias de presion en tiempo real, ventanas emergentes de alarma por superacion de umbral y registros de fallos, coincidiendo con el flujo de trabajo real de fabrica.

## 1.1 Que Son Computadora Superior y Computadora Inferior?

En la automatizacion industrial, hay dos conceptos que debes entender: **computadora superior** y **computadora inferior**.

**Computadora Inferior**: las "manos y pies" en el campo

La computadora inferior es el controlador que interactua directamente con dispositivos fisicos. En las fabricas, suele ser un **PLC (Controlador Logico Programable)** o **sensor**, responsable de:

* leer datos de campo (temperatura, presion, flujo, nivel de liquido, etc.)
* controlar acciones de dispositivos (iniciar bomba, cerrar valvula, ajustar velocidad, etc.)
* ejecutar logica predefinida automaticamente (por ejemplo detener la bomba cuando la presion excede el umbral)

Puedes pensar en la computadora inferior como un "trabajador" en el piso de la fabrica. No necesita pensamiento complejo, pero debe ejecutar tareas de manera confiable.

**Computadora Superior**: los "ojos y cerebro" en la sala de control

La computadora superior es un software de monitoreo que se ejecuta en PC o computadora industrial, que es la **HMI (Interfaz Humano-Maquina)** que construiremos hoy. Es responsable de:

* mostrar datos de campo en tiempo real (numeros, graficos, animaciones)
* registrar datos historicos y registros de alarmas
* habilitar control remoto para operadores
* proporcionar analisis de datos e informes

Puedes pensar en la computadora superior como el "centro de monitoreo" de la fabrica. Los operadores pueden entender el estado de la planta desde la pantalla.

**Como se comunican?**

Las computadoras superior e inferior intercambian datos a traves de **protocolos de comunicacion industrial**. El mas comun es **Modbus**, un protocolo "veterano" nacido en 1979. Aun se usa ampliamente porque es simple, confiable y soportado por casi todos los dispositivos industriales.

```text
Sala de control                           Piso de fabrica
┌──────────┐    Protocolo Modbus    ┌──────────┐
│ Computadora │ ◄──────────────────►  │ Computadora │
│ superior    │   "Dime la presion"  │ inferior    │
│ (Qt HMI) │   "La presion es 1.20MPa"│ (PLC/Sensor)
│ Mostrar  │                       │ Leer datos│
│ Registrar│                       │ Controlar │
│ Alarmas  │                       │ Proteger  │
└──────────┘                       └──────────┘
```

<!-- ![placeholder: Diagrama de la relacion entre computadora superior e inferior: pantalla de PC (computadora superior) a la izquierda, PLC y bomba (computadora inferior) a la derecha, conectados via Modbus](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image1.png) -->

## 1.2 Que Es el Protocolo Modbus?

Modbus es el "idioma comun" de la comunicacion industrial. Define como las computadoras superior e inferior "hablan."

**Solo dos conceptos centrales:**

* **Registro**: las "celdas" de datos en la computadora inferior. Cada una tiene una direccion (`0`, `1`, `2`, ...), almacenando un numero. Por ejemplo, la direccion `0` almacena la presion y la direccion `1` almacena la temperatura.
* **Operaciones de lectura/escritura**: la computadora superior puede leer registros (obtener datos) o escribir registros (enviar comandos de control).

**Dos variantes comunes de Modbus:**

| Variante | Transporte | Escenario Tipico |
|------|---------|---------|
| Modbus RTU | Serial (RS-485/RS-232) | Corta distancia, conexion directa de dispositivo |
| Modbus TCP | Ethernet (TCP/IP) | Larga distancia, comunicacion de red |

Este tutorial usa **Modbus TCP**. Como esta basado en red, la aplicacion de computadora superior y el simulador de computadora inferior pueden ejecutarse en la misma maquina sin cableado fisico.

## 1.3 Por Que Elegir Qt?

Qt es un framework de primer nivel para software industrial. Muchas interfaces de monitoreo en fabricas, hospitales y sistemas de transporte estan construidas con Qt. Las razones son simples:

| Ventaja | Explicacion |
|------|------|
| Multiplataforma | Una base de codigo compila para Windows, Linux y dispositivos embebidos |
| Soporte de protocolo industrial integrado | Qt Serial Bus soporta Modbus nativamente, sin biblioteca de terceros |
| Graficos potentes | Qt Charts proporciona graficos profesionales en tiempo real |
| Alto rendimiento | Base C++ adecuada para actualizacion de datos en tiempo real |
| Maduro y estable | 30 anos de historia, probado en el dominio industrial |

## 1.4 Que Vamos a Construir?

Construiremos un **Sistema HMI de Monitoreo de Bombas** simulando el monitoreo real de presion de bombas de fabrica:

| Funcion | Descripcion |
|------|------|
| Lectura de datos en tiempo real | Leer presion de la computadora inferior cada segundo |
| Grafico de tendencia de presion | Grafico de lineas para los ultimos 60 segundos de presion |
| Alarma por superacion de umbral | Ventana emergente de advertencia y UI roja cuando la presion excede el umbral |
| Registro de fallos | Registrar todos los eventos de alarma en base de datos para consultas historicas |
| Control manual | Iniciar/detener bomba con un clic (escribir registro de computadora inferior) |

<!-- ![placeholder: Vista previa del HMI de monitoreo de bombas mostrando numero de presion en tiempo real, grafico de tendencia, indicador de alarma, boton de inicio/detencion y lista de registros](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png) -->

## 1.5 Hoja de Ruta del Tutorial

Completaremos el flujo en estos pasos:

1. **Preparar entorno y computadora inferior simulada** (2 minutos): instalar Qt 6.5 y simulador Modbus Slave
2. **Crear proyecto Qt y conectar Modbus** (3 minutos): establecer comunicacion entre la aplicacion superior y el simulador
3. **Implementar lectura y visualizacion en tiempo real** (3 minutos): lecturas de presion temporizadas y actualizaciones de UI
4. **Dibujar grafico de tendencia de presion en tiempo real** (3 minutos): grafico de lineas dinamico con Qt Charts
5. **Implementar alarmas y registros de fallos** (3 minutos): alarma por superacion de umbral + registro en SQLite
6. **Empaquetar y desplegar** (opcional): empaquetar la aplicacion en un ejecutable independiente

# Capitulo 2: Preparar Entorno y Computadora Inferior Simulada (2 Minutos)

## 2.1 Instalar Qt 6.5

Qt proporciona una version de codigo abierto gratuita, suficiente para este tutorial.

1. Visita el [sitio oficial de Qt](https://www.qt.io/download-qt-installer) y descarga Qt Online Installer
2. Ejecuta el instalador, inicia sesion o registra una cuenta Qt (gratis)
3. En la seleccion de componentes, marca:
   - **Qt 6.5.x** (o mas reciente)
   - **Qt Serial Bus** bajo **Additional Libraries** (soporte Modbus)
   - **Qt Charts** bajo **Additional Libraries** (renderizado de graficos)
   - **Qt Creator** (IDE, generalmente seleccionado por defecto)
4. Haz clic en instalar y espera

> **Consejo**: si Qt ya esta instalado pero falta Serial Bus o Charts, vuelve a ejecutar Qt Maintenance Tool y agrega componentes.

<!-- ![placeholder: Captura de pantalla de seleccion de componentes del instalador de Qt destacando Qt Serial Bus y Qt Charts](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 Instalar Modbus Slave: Tu "Bomba Virtual"

Modbus Slave es un simulador de esclavo Modbus gratuito. Puede simular un dispositivo industrial (PLC/sensor) en tu computadora para que tu aplicacion superior tenga algo con lo que comunicarse.

1. Visita [modbustools.com](https://www.modbustools.com/modbus_slave.html) y descarga Modbus Slave
2. Instala y abrelo
3. Configura la conexion:
   - Menu **Connection -> Connect**
   - Elige **Modbus TCP/IP**
   - Direccion IP: `127.0.0.1` (localhost)
   - Puerto: `502` (puerto predeterminado Modbus TCP)
   - Haz clic en **OK** para escuchar

4. Establecer datos simulados:
   - Veras una tabla de registros, cada fila es una direccion de registro (`0`, `1`, `2`, ...)
   - Haz doble clic en el valor de la direccion **0**, cambialo a **120** (significa presion 1.20 MPa, dividido por 100 en la aplicacion)
   - Haz doble clic en el valor de la direccion **1**, cambialo a **350** (significa temperatura 35.0°C)
   - Haz doble clic en el valor de la direccion **2**, cambialo a **1** (estado de la bomba: `1=funcionando`, `0=detenida`)

Ahora Modbus Slave es tu "bomba virtual 24/7." Manten la ventana abierta; respondera continuamente a solicitudes de lectura/escritura.

<!-- ![placeholder: Captura de pantalla de Modbus Slave mostrando configuracion TCP y valores de registros simulados](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **Consejo de simulacion dinamica**: Modbus Slave soporta auto incremento/cambios aleatorios. Haz clic derecho en el valor del registro y elige "Auto increment" o "Random" para simular fluctuaciones realistas de sensores.

# Capitulo 3: Crear Proyecto Qt y Conectar Modbus (3 Minutos)

## 3.1 Crear Nuevo Proyecto Qt

Abre Qt Creator y crea un nuevo proyecto:

1. Haz clic en **File -> New Project**
2. Elige **Application (Qt) -> Qt Widgets Application**
3. Nombre del proyecto: **PumpHMI**
4. Selecciona el kit Qt 6.5 instalado
5. Finaliza la creacion

Abre `PumpHMI.pro` (o `CMakeLists.txt` si usas CMake), y agrega los modulos clave:

```pro
QT += core gui widgets serialbus charts sql
```

| Modulo | Proposito |
|------|------|
| `serialbus` | Proporciona `QModbusTcpClient` para comunicacion Modbus TCP |
| `charts` | Proporciona `QChart`, `QLineSeries` para grafico de tendencia en tiempo real |
| `sql` | Proporciona `QSqlDatabase` para registros de fallos SQLite |

Si usas CMake, la configuracion equivalente:

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 Declarar Miembros Centrales

Pidele a la IA que genere el archivo de encabezado:

```text
Por favor ayudame a escribir mainwindow.h con miembros centrales para HMI de monitoreo de bombas:
1. QModbusTcpClient para comunicacion Modbus TCP
2. QTimer para lectura temporizada de datos
3. QChart + QLineSeries para grafico de tendencia en tiempo real
4. QSqlDatabase para almacenamiento de registros de fallos
5. Elementos de UI: etiqueta de presion, indicador de estado, boton de inicio/detencion, tabla de registros
```

Encabezado central:

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
    void connectModbus();        // conectar computadora inferior
    void readPressure();         // lectura temporizada de presion
    void onReadReady();          // callback de lectura
    void triggerAlarm(float v);  // activar alarma
    void togglePump();           // iniciar/detener bomba

private:
    // Comunicacion Modbus
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // Grafico en tiempo real
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // Base de datos
    QSqlDatabase m_db;

    // Elementos de UI
    QLabel *m_pressureLabel = nullptr;    // visualizacion de presion
    QLabel *m_statusLight = nullptr;      // indicador de estado
    QPushButton *m_pumpButton = nullptr;  // boton de inicio/detencion
    QTableWidget *m_logTable = nullptr;   // tabla de registros

    // Umbral de alarma
    float m_alarmThreshold = 1.50f;  // alarma por encima de 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Captura de pantalla de mainwindow.h en Qt Creator](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 Construir Conexion Modbus TCP

Implementa la logica de conexion en `mainwindow.cpp`:

```cpp
// mainwindow.cpp - seccion de conexion
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Conectar al simulador Modbus Slave
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // timeout de 1s
    m_modbusClient->setNumberOfRetries(3);  // reintentar 3 veces

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("Error al conectar con la computadora inferior!", 3000);
        return;
    }

    statusBar()->showMessage("Conectado a la computadora inferior (127.0.0.1:502)", 3000);

    // Iniciar temporizador, leer una vez por segundo
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1s
}
```

**Notas de codigo:**

| Codigo | Significado |
|------|------|
| `QModbusTcpClient` | Cliente Modbus TCP integrado en Qt, se comunica con la computadora inferior |
| `NetworkPortParameter, 502` | Conectar al puerto `502` (igual que la configuracion de Modbus Slave) |
| `NetworkAddressParameter, "127.0.0.1"` | Conectar a localhost (el simulador se ejecuta localmente) |
| `m_pollTimer->start(1000)` | Llamar a `readPressure()` cada segundo |

## 3.4 Leer Datos de Presion

```cpp
// mainwindow.cpp - seccion de lectura
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // Construir solicitud de lectura: comenzar en la direccion 0, leer 3 holding registers
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // tipo de registro
        0,                                   // direccion de inicio
        3                                    // cantidad
    );

    // Enviar solicitud de lectura asincrona
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // solicitud de broadcast, eliminar directamente
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // Analizar valores (dividir valor del registro para unidades reales)
        float pressure = unit.value(0) / 100.0f;   // dir 0: presion (MPa)
        float temperature = unit.value(1) / 10.0f;  // dir 1: temperatura (°C)
        int pumpStatus = unit.value(2);              // dir 2: estado de la bomba

        // Actualizar UI
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // Verificar alarma
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // Actualizar grafico de tendencia (implementado en el proximo capitulo)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("Lectura fallida: %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Flujo de lectura Modbus:**

```text
readPressure() activado por temporizador
    -> Construir QModbusDataUnit ("leer direcciones 0-2")
    -> sendReadRequest() envio asincrono (UI no bloqueada)
    -> la computadora inferior devuelve datos
    -> onReadReady() activado
    -> analizar valores de registros y actualizar UI
```

<!-- ![placeholder: Captura de pantalla de la aplicacion ejecutandose mostrando actualizaciones de presion en tiempo real y barra de estado "conectado a la computadora inferior"](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# Capitulo 4: Dibujar Tendencia de Presion en Tiempo Real (3 Minutos)

## 4.1 Inicializar Grafico

Qt Charts proporciona componentes de graficos profesionales. Pidele a la IA que inicialice en el constructor:

```text
Por favor ayudame a inicializar el grafico de lineas en tiempo real de Qt Charts en el constructor de MainWindow:
1. Crear QChart y QLineSeries
2. Eje X usa QDateTimeAxis, mostrando los ultimos 60 segundos
3. Eje Y usa QValueAxis, rango 0-3.0 MPa
4. Linea de color azul, ancho 2px
5. Colocar el grafico en QChartView y agregar al layout
```

Codigo central:

```cpp
// mainwindow.cpp - inicializacion del grafico
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Presion (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Tendencia de Presion en Tiempo Real");
    m_chart->setAnimationOptions(QChart::NoAnimation); // sin animacion para datos en tiempo real

    // Eje X: tiempo
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Tiempo");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Eje Y: presion
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Presion (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // Crear vista de grafico
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // Agregar al layout (asumiendo centralLayout existente)
    centralLayout->addWidget(chartView);
}
```

## 4.2 Actualizar Grafico en Tiempo Real

Cada vez que se lee un nuevo valor de presion, agregar un punto y mantener solo los ultimos 60 segundos:

```cpp
// mainwindow.cpp - actualizaciones del grafico
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // Agregar nuevo punto
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // Mantener solo los datos de los ultimos 60s
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // Actualizar rango del eje X: siempre mostrar los ultimos 60s
    m_axisX->setRange(cutoff, now);
}
```

Luego llamalo en `onReadReady()`:

```cpp
// Agregar despues del analisis de presion en onReadReady():
updateChart(pressure);
```

Ahora ejecuta el programa. Veras una linea azul actualizandose en tiempo real, un punto por segundo, mostrando siempre los ultimos 60 segundos. Si modificas manualmente los valores de los registros en Modbus Slave, la linea refleja los cambios inmediatamente.

<!-- ![placeholder: Captura de pantalla de tendencia de presion en tiempo real mostrando linea azul desplazandose, eje X de tiempo, eje Y de presion](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **Consejo de rendimiento**: `QChart::NoAnimation` es importante. Los datos en tiempo real se actualizan cada segundo; las animaciones pueden causar retraso en la UI. Esta es una practica comun en HMI industrial.

# Capitulo 5: Sistema de Alarmas y Registros de Fallos (3 Minutos)

## 5.1 Alarma por Superacion de Umbral

Cuando la presion excede el umbral, necesitamos: advertencia visual roja + alerta emergente + registro.

```cpp
// mainwindow.cpp - logica de alarma
void MainWindow::triggerAlarm(float pressure)
{
    // Poner la UI en rojo
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // Indicador de estado rojo
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // Alarma emergente (solo la primera vez que cruza el umbral para evitar ventanas repetidas)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Alarma de Presion",
            QString("La presion actual %1 MPa excede el umbral %2 MPa!\nPor favor verifique el estado de la bomba inmediatamente.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // Registrar en BD
    logAlarm(pressure,
        QString("Presion por encima del umbral: %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // Restablecer cuando la presion vuelve a la normalidad
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

<!-- ![placeholder: Captura de pantalla de alarma por superacion de umbral mostrando fondo de presion rojo, indicador rojo y ventana emergente de alarma](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 Registros de Fallos SQLite

Los sistemas industriales deben registrar todos los eventos de alarma para trazabilidad. Usamos SQLite:

```cpp
// mainwindow.cpp - inicializacion de base de datos
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "No se puede abrir la base de datos:" << m_db.lastError().text();
        return;
    }

    // Crear tabla de alarmas
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

## 5.3 Registrar y Mostrar Registros

```cpp
// mainwindow.cpp - escribir registros
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // Escribir en BD
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // Actualizar tabla en pantalla
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // Desplazamiento automatico a la ultima fila
    m_logTable->scrollToBottom();
}
```

La tabla de registros tiene tres columnas: hora, valor de presion y mensaje de alarma. Cada alarma agrega una fila y se persiste en SQLite.

<!-- ![placeholder: Captura de pantalla de tabla de registros de fallos con multiples registros incluyendo marca de tiempo, presion y mensaje de alarma](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 Iniciar/Detener Bomba Manualmente

Ademas de leer datos, la computadora superior tambien debe controlar la computadora inferior. Hacemos esto escribiendo valores de registro:

```cpp
// mainwindow.cpp - control de bomba
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // Construir solicitud de escritura: escribir 1 (iniciar) o 0 (detener) en la direccion 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "Detener Bomba" : "Iniciar Bomba");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "Bomba iniciada" : "Bomba detenida", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

En Modbus Slave, veras la direccion `2` alternando entre `0` y `1` al hacer clic en el boton. Este es el proceso de "control" de la computadora superior.

<!-- ![placeholder: Captura de pantalla del boton de inicio/detencion de bomba mostrando estados verde "Iniciar Bomba" y rojo "Detener Bomba"](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# Capitulo 6: Empaquetado y Despliegue (Opcional)

## 6.1 Empaquetar con windeployqt / macdeployqt

Qt proporciona herramientas oficiales de despliegue para recolectar las bibliotecas dinamicas necesarias automaticamente.

**Windows:**

```bash
# Construir Release primero, luego ejecutar en el directorio de compilacion:
windeployqt PumpHMI.exe
```

`windeployqt` copia las DLLs de Qt, plugins, archivos de traduccion, etc. junto al ejecutable. Esa carpeta empaquetada puede enviarse directamente.

**macOS:**

```bash
macdeployqt PumpHMI.app -dmg
```

Esto genera una imagen de instalador `.dmg`.

## 6.2 Construir Instalador con Qt Installer Framework

Si quieres un asistente de configuracion profesional ("Siguiente -> Siguiente -> Finalizar"), usa Qt Installer Framework:

```text
Por favor ayudame a crear un instalador para PumpHMI con Qt Installer Framework:
1. Crear estructura de directorios del instalador (config, packages)
2. Configurar config.xml (nombre del instalador, version, directorio de destino)
3. Colocar los archivos de salida de windeployqt en packages/com.example.pumphmi/data/
4. Ejecutar binarycreator para generar el instalador
```

<!-- ![placeholder: Captura de pantalla del asistente de instalacion de PumpHMI mostrando ruta de instalacion y progreso](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image11.png) -->

# Capitulo 7: Notas Finales

Felicidades! Has construido un sistema HMI industrial de monitoreo de bombas desde cero. Recapitulacion:

1. Entendiste conceptos centrales de computadora superior, computadora inferior y protocolo Modbus
2. Simulaste una "bomba virtual" con Modbus Slave, sin hardware real
3. Construiste comunicacion superior-inferior usando Qt `QModbusTcpClient`
4. Dibujaste un grafico de tendencia de presion en desplazamiento en tiempo real con Qt Charts
5. Implementaste alarmas emergentes por superacion de umbral y registros de fallos SQLite
6. Implementaste control remoto de inicio/detencion de bomba

Todo el proceso no uso hardware industrial real, pero la arquitectura y funciones coinciden con sistemas HMI reales de fabrica. Si reemplazas Modbus Slave con un PLC real, esta aplicacion puede usarse directamente en escenarios de produccion.

**Direcciones avanzadas:**

* **Monitoreo de multiples dispositivos**: conectar multiples computadoras inferiores y usar pestanas/vistas divididas para datos de diferentes dispositivos
* **Reproduccion historica**: leer datos historicos de SQLite y reproducir graficos de tendencia con controles de linea de tiempo
* **Protocolo OPC UA**: Modbus se adapta a escenarios mas simples; los sistemas industriales complejos a menudo usan OPC UA, tambien soportado por Qt (modulo Qt OPC UA)
* **Monitoreo remoto web**: usar Qt WebSocket para enviar datos en tiempo real al navegador para visualizacion movil
* **Mantenimiento predictivo con IA**: alimentar datos historicos de presion a modelos de ML para predecir fallos con anticipacion

***Usa codigo para proteger cada dispositivo en operaciones industriales.***

# Referencias

* [Documentacion de Qt Serial Bus](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Ejemplo de Cliente Modbus TCP de Qt](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Documentacion de Qt Charts](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Especificaciones del Protocolo Modbus](https://modbus.org/specs.php)
* [Simulador Modbus Slave](https://www.modbustools.com/modbus_slave.html)
* [Documentacion de Qt Installer Framework](https://doc.qt.io/qtinstallerframework/)
