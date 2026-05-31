# Comment construire une application de bureau industrielle Qt : système IHM de surveillance de pompe

# Chapitre 1 : Qu'est-ce que l'IHM industrielle et le développement Qt

Dans ce tutoriel, nous allons accomplir une boucle complète : construire de zéro un système IHM (Interface Homme-Machine) de surveillance de pompe de qualité industrielle avec Qt. Il peut lire les données de capteurs en temps réel, tracer des courbes de tendance de pression, déclencher des alarmes automatiques de dépassement de seuil et enregistrer les journaux de défauts. Tout le processus utilise un logiciel de simulation gratuit sur PC au lieu de véritable matériel industriel.

Pour ce tutoriel, vous devez au moins disposer de :

- Un ordinateur (Windows ou Mac, Windows recommandé pour une meilleure compatibilité logicielle industrielle)
- Un environnement de développement Qt 6.5 (modules Qt Creator + Qt Serial Bus + Qt Charts)
- Le logiciel de simulation Modbus Slave (téléchargement gratuit, fonctionne comme une "pompe virtuelle")
- Votre assistant de codage IA (Cursor / Trae / Claude Code)

> **Zéro matériel, zéro coût** : utilisez le logiciel de simulation PC gratuit (Modbus Slave) comme appareil de niveau inférieur ; pas besoin d'acheter du matériel. Utilisez directement les modules officiels Qt `QModbusTcpClient` + Qt Charts, pas besoin d'analyse de protocole manuelle. Après exécution, vous verrez des tendances de pression en temps réel, des popups d'alarme de dépassement de seuil et des journaux de défauts, correspondant au flux de travail réel en usine.

## 1.1 Que sont l'ordinateur supérieur et l'ordinateur inférieur ?

Dans l'automatisation industrielle, il y a deux concepts que vous devez comprendre : **l'ordinateur supérieur** et **l'ordinateur inférieur**.

**Ordinateur inférieur** : les "mains et pieds" sur le terrain

L'ordinateur inférieur est le contrôleur qui interagit directement avec les appareils physiques. Dans les usines, c'est généralement un **PLC (Automate Programmable Industriel)** ou un **capteur**, responsable de :

* lire les données de terrain (température, pression, débit, niveau de liquide, etc.)
* contrôler les actions des appareils (démarrer la pompe, fermer la vanne, ajuster la vitesse, etc.)
* exécuter automatiquement une logique prédéfinie (par exemple arrêter la pompe lorsque la pression dépasse le seuil)

Vous pouvez considérer l'ordinateur inférieur comme un "ouvrier" sur le plancher de l'usine. Il n'a pas besoin de réflexion complexe, mais doit exécuter des tâches de manière fiable.

**Ordinateur supérieur** : les "yeux et le cerveau" dans la salle de contrôle

L'ordinateur supérieur est un logiciel de surveillance fonctionnant sur PC ou ordinateur industriel, qui est l'**IHM (Interface Homme-Machine)** que nous allons construire aujourd'hui. Il est responsable de :

* afficher les données de terrain en temps réel (nombres, graphiques, animations)
* enregistrer les données historiques et les journaux d'alarmes
* permettre le contrôle à distance pour les opérateurs
* fournir des analyses de données et des rapports

Vous pouvez considérer l'ordinateur supérieur comme le "centre de surveillance" de l'usine. Les opérateurs peuvent comprendre l'état de l'usine depuis l'écran.

**Comment communiquent-ils ?**

Les ordinateurs supérieurs et inférieurs échangent des données via des **protocoles de communication industriels**. Le plus courant est **Modbus**, un protocole "vétéran" né en 1979. Il est encore largement utilisé parce qu'il est simple, fiable et supporté par presque tous les appareils industriels.

```text
Salle de contrôle                           Terrain d'usine
+------------+    Protocole Modbus    +------------+
| Ordinateur | <------------------->  | Ordinateur |
| supérieur  |   "Dis-moi la pression"| inférieur  |
| (Qt IHM)   |   "Pression est 1.20MPa"| (PLC/Capteur)
| Affichage  |                        | Lecture    |
| Journaliser|                        | Controle   |
| Alarmes    |                        | Protection |
+------------+                        +------------+
```

<!-- ![placeholder: Diagramme de la relation ordinateur supérieur vs inférieur : écran PC (ordinateur supérieur) à gauche, PLC et pompe (ordinateur inférieur) à droite, connectés via Modbus](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image1.png) -->

## 1.2 Qu'est-ce que le protocole Modbus ?

Modbus est le "langage commun" de la communication industrielle. Il définit comment les ordinateurs supérieurs et inférieurs "parlent."

**Seulement deux concepts clés :**

* **Registre** : les "cellules" de données dans l'ordinateur inférieur. Chacune a une adresse (`0`, `1`, `2`, ...), stockant un nombre. Par exemple, l'adresse `0` stocke la pression et l'adresse `1` stocke la température.
* **Opérations de lecture/écriture** : l'ordinateur supérieur peut lire des registres (obtenir des données) ou écrire des registres (envoyer des commandes de contrôle).

**Deux variantes Modbus courantes :**

| Variante | Transport | Scénario typique |
|------|---------|---------|
| Modbus RTU | Série (RS-485/RS-232) | Courte distance, connexion directe d'appareil |
| Modbus TCP | Ethernet (TCP/IP) | Longue distance, communication réseau |

Ce tutoriel utilise **Modbus TCP**. Puisqu'il est basé sur le réseau, l'application d'ordinateur supérieur et le simulateur d'ordinateur inférieur peuvent fonctionner sur la même machine sans câblage physique.

## 1.3 Pourquoi choisir Qt ?

Qt est un choix de framework de premier plan pour les logiciels industriels. De nombreuses interfaces de surveillance dans les usines, hôpitaux et systèmes de transport sont construites avec Qt. Les raisons sont simples :

| Avantage | Explication |
|------|------|
| Multi-plateforme | Une base de code compile pour Windows, Linux et appareils embarqués |
| Support de protocole industriel intégré | Qt Serial Bus supporte Modbus nativement, aucune bibliothèque tierce requise |
| Graphiques puissants | Qt Charts fournit des graphiques professionnels en temps réel |
| Haute performance | Fondation C++ adaptée au rafraîchissement de données en temps réel |
| Mature et stable | 30 ans d'histoire, éprouvé dans le domaine industriel |

## 1.4 Que construisons-nous ?

Nous allons construire un **système IHM de surveillance de pompe** simulant la surveillance de pression de pompe en usine réelle :

| Fonction | Description |
|------|------|
| Lecture de données en temps réel | Lire la pression de l'ordinateur inférieur chaque seconde |
| Courbe de tendance de pression | Graphique linéaire des 60 dernières secondes de pression |
| Alarme de dépassement de seuil | Avertissement popup et interface rouge lorsque la pression dépasse le seuil |
| Journal de défauts | Enregistrer tous les événements d'alarme dans la base de données pour requêtes historiques |
| Contrôle manuel | Démarrage/arrêt de pompe en un clic (écriture du registre de l'ordinateur inférieur) |

<!-- ![placeholder: Aperçu IHM de surveillance de pompe montrant le nombre de pression en temps réel, le graphique de tendance, l'indicateur d'alarme, le bouton démarrer/arrêter et la liste de journaux](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image2.png) -->

## 1.5 Feuille de route du tutoriel

Nous accomplirons le flux en ces étapes :

1. **Préparer l'environnement et l'ordinateur inférieur simulé** (2 minutes) : installer Qt 6.5 et le simulateur Modbus Slave
2. **Créer le projet Qt et connecter Modbus** (3 minutes) : établir la communication entre l'application supérieure et le simulateur
3. **Implémenter la lecture et l'affichage en temps réel** (3 minutes) : lectures de pression minutées et mises à jour de l'interface
4. **Tracer la courbe de tendance de pression en temps réel** (3 minutes) : graphique linéaire dynamique avec Qt Charts
5. **Implémenter les alarmes et les journaux de défauts** (3 minutes) : alarme de dépassement de seuil + journalisation SQLite
6. **Empaqueter et déployer** (facultatif) : empaqueter l'application en exécutable autonome

# Chapitre 2 : Préparer l'environnement et l'ordinateur inférieur simulé (2 minutes)

## 2.1 Installer Qt 6.5

Qt fournit une version open-source gratuite, suffisante pour ce tutoriel.

1. Visitez le [site officiel de Qt](https://www.qt.io/download-qt-installer) et téléchargez Qt Online Installer
2. Exécutez l'installateur, connectez-vous ou inscrivez-vous pour un compte Qt (gratuit)
3. Dans la sélection de composants, cochez :
   - **Qt 6.5.x** (ou plus récent)
   - **Qt Serial Bus** sous **Additional Libraries** (support Modbus)
   - **Qt Charts** sous **Additional Libraries** (rendu de graphiques)
   - **Qt Creator** (IDE, généralement sélectionné par défaut)
4. Cliquez sur installer et attendez

> **Astuce** : si Qt est déjà installé mais manque Serial Bus ou Charts, relancez Qt Maintenance Tool et ajoutez les composants.

<!-- ![placeholder: Capture d'écran de la sélection de composants de l'installateur Qt mettant en évidence Qt Serial Bus et Qt Charts](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image3.png) -->

## 2.2 Installer Modbus Slave : votre "pompe virtuelle"

Modbus Slave est un simulateur d'esclave Modbus gratuit. Il peut simuler un appareil industriel (PLC/capteur) sur votre ordinateur pour que votre application supérieure ait quelque chose avec qui communiquer.

1. Visitez [modbustools.com](https://www.modbustools.com/modbus_slave.html) et téléchargez Modbus Slave
2. Installez et ouvrez-le
3. Configurez la connexion :
   - Menu **Connection -> Connect**
   - Choisissez **Modbus TCP/IP**
   - Adresse IP : `127.0.0.1` (localhost)
   - Port : `502` (port Modbus TCP par défaut)
   - Cliquez sur **OK** pour écouter

4. Définissez les données simulées :
   - Vous verrez un tableau de registres, chaque ligne est une adresse de registre (`0`, `1`, `2`, ...)
   - Double-cliquez sur la valeur à l'adresse **0**, changez-la en **120** (signifie pression 1.20 MPa, divisée par 100 dans l'application)
   - Double-cliquez sur la valeur à l'adresse **1**, changez-la en **350** (signifie température 35.0°C)
   - Double-cliquez sur la valeur à l'adresse **2**, changez-la en **1** (état de la pompe : `1=en marche`, `0=arrêtée`)

Maintenant Modbus Slave est votre "pompe virtuelle 24/7." Gardez la fenêtre ouverte ; elle répondra continuellement aux requêtes de lecture/écriture.

<!-- ![placeholder: Capture d'écran de Modbus Slave montrant la configuration TCP et les valeurs de registres simulés](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image4.png) -->

> **Astuce de simulation dynamique** : Modbus Slave supporte l'incrémentation automatique/les changements aléatoires. Faites un clic droit sur la valeur du registre et choisissez "Auto increment" ou "Random" pour simuler des fluctuations réalistes de capteurs.

# Chapitre 3 : Créer le projet Qt et connecter Modbus (3 minutes)

## 3.1 Créer un nouveau projet Qt

Ouvrez Qt Creator et créez un nouveau projet :

1. Cliquez sur **File -> New Project**
2. Choisissez **Application (Qt) -> Qt Widgets Application**
3. Nom du projet : **PumpHMI**
4. Sélectionnez le kit Qt 6.5 installé
5. Terminez la création

Ouvrez `PumpHMI.pro` (ou `CMakeLists.txt` si vous utilisez CMake), et ajoutez les modules clés :

```pro
QT += core gui widgets serialbus charts sql
```

| Module | Utilité |
|------|------|
| `serialbus` | Fournit `QModbusTcpClient` pour la communication Modbus TCP |
| `charts` | Fournit `QChart`, `QLineSeries` pour le graphique de tendance en temps réel |
| `sql` | Fournit `QSqlDatabase` pour les journaux de défauts SQLite |

Si vous utilisez CMake, configuration équivalente :

```cmake
find_package(Qt6 REQUIRED COMPONENTS Widgets SerialBus Charts Sql)
target_link_libraries(PumpHMI PRIVATE
    Qt6::Widgets Qt6::SerialBus Qt6::Charts Qt6::Sql)
```

## 3.2 Déclarer les membres principaux

Demandez à l'IA de générer le fichier d'en-tête :

```text
Please help me write mainwindow.h with core members for pump monitoring HMI:
1. QModbusTcpClient for Modbus TCP communication
2. QTimer for timed data reading
3. QChart + QLineSeries for real-time trend chart
4. QSqlDatabase for fault log storage
5. UI elements: pressure label, status indicator, start/stop button, log table
```

En-tête principal :

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
    void connectModbus();        // connecter l'ordinateur inférieur
    void readPressure();         // lecture minutée de pression
    void onReadReady();          // callback de lecture
    void triggerAlarm(float v);  // déclencher l'alarme
    void togglePump();           // démarrer/arrêter la pompe

private:
    // Communication Modbus
    QModbusTcpClient *m_modbusClient = nullptr;
    QTimer *m_pollTimer = nullptr;

    // Graphique en temps réel
    QChart *m_chart = nullptr;
    QLineSeries *m_series = nullptr;
    QDateTimeAxis *m_axisX = nullptr;
    QValueAxis *m_axisY = nullptr;

    // Base de données
    QSqlDatabase m_db;

    // Éléments d'interface
    QLabel *m_pressureLabel = nullptr;    // affichage de pression
    QLabel *m_statusLight = nullptr;      // indicateur de statut
    QPushButton *m_pumpButton = nullptr;  // bouton démarrer/arrêter
    QTableWidget *m_logTable = nullptr;   // table de journaux

    // Seuil d'alarme
    float m_alarmThreshold = 1.50f;  // alarme au-dessus de 1.50 MPa
    bool m_pumpRunning = false;

    void setupUI();
    void setupDatabase();
    void logAlarm(float pressure, const QString &message);
};

#endif // MAINWINDOW_H
```

<!-- ![placeholder: Capture d'écran de mainwindow.h dans Qt Creator](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image5.png) -->

## 3.3 Construire la connexion Modbus TCP

Implémentez la logique de connexion dans `mainwindow.cpp` :

```cpp
// mainwindow.cpp - section connexion
void MainWindow::connectModbus()
{
    m_modbusClient = new QModbusTcpClient(this);

    // Se connecter au simulateur Modbus Slave
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkPortParameter, 502);
    m_modbusClient->setConnectionParameter(
        QModbusDevice::NetworkAddressParameter, "127.0.0.1");
    m_modbusClient->setTimeout(1000);       // délai d'attente 1s
    m_modbusClient->setNumberOfRetries(3);  // 3 tentatives

    if (!m_modbusClient->connectDevice()) {
        statusBar()->showMessage("Echec de connexion a l'ordinateur inferieur !", 3000);
        return;
    }

    statusBar()->showMessage("Connecte a l'ordinateur inferieur (127.0.0.1:502)", 3000);

    // Démarrer le minuteur, lire une fois par seconde
    m_pollTimer = new QTimer(this);
    connect(m_pollTimer, &QTimer::timeout, this, &MainWindow::readPressure);
    m_pollTimer->start(1000);  // 1000ms = 1s
}
```

**Notes sur le code :**

| Code | Signification |
|------|------|
| `QModbusTcpClient` | Client Modbus TCP intégré à Qt, communique avec l'ordinateur inférieur |
| `NetworkPortParameter, 502` | Se connecter au port `502` (identique à la configuration Modbus Slave) |
| `NetworkAddressParameter, "127.0.0.1"` | Se connecter en localhost (le simulateur fonctionne localement) |
| `m_pollTimer->start(1000)` | Appelle `readPressure()` chaque seconde |

## 3.4 Lire les données de pression

```cpp
// mainwindow.cpp - section lecture
void MainWindow::readPressure()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    // Construire la requête de lecture : à partir de l'adresse 0, lire 3 registres holding
    QModbusDataUnit readUnit(
        QModbusDataUnit::HoldingRegisters,  // type de registre
        0,                                   // adresse de départ
        3                                    // quantité
    );

    // Envoyer la requête de lecture asynchrone
    if (auto *reply = m_modbusClient->sendReadRequest(readUnit, 1)) {
        if (!reply->isFinished()) {
            connect(reply, &QModbusReply::finished,
                    this, &MainWindow::onReadReady);
        } else {
            delete reply;  // requête broadcast, supprimer directement
        }
    }
}

void MainWindow::onReadReady()
{
    auto *reply = qobject_cast<QModbusReply *>(sender());
    if (!reply) return;

    if (reply->error() == QModbusDevice::NoError) {
        const QModbusDataUnit unit = reply->result();

        // Analyser les valeurs (diviser la valeur du registre pour les unités réelles)
        float pressure = unit.value(0) / 100.0f;   // adresse 0 : pression (MPa)
        float temperature = unit.value(1) / 10.0f;  // adresse 1 : température (°C)
        int pumpStatus = unit.value(2);              // adresse 2 : état de la pompe

        // Mettre à jour l'interface
        m_pressureLabel->setText(
            QString("%1 MPa").arg(pressure, 0, 'f', 2));

        // Vérifier l'alarme
        if (pressure > m_alarmThreshold) {
            triggerAlarm(pressure);
        }

        // Mettre à jour le graphique de tendance (implémenté au chapitre suivant)
        // updateChart(pressure);

    } else {
        statusBar()->showMessage(
            QString("Echec de lecture : %1").arg(reply->errorString()), 2000);
    }

    reply->deleteLater();
}
```

**Flux de lecture Modbus :**

```text
readPressure() déclenché par le minuteur
    -> Construire QModbusDataUnit ("lire adresses 0-2")
    -> sendReadRequest() envoi asynchrone (UI non bloquée)
    -> l'ordinateur inférieur renvoie les données
    -> onReadReady() déclenché
    -> analyser les valeurs des registres et mettre à jour l'interface
```

<!-- ![placeholder: Capture d'écran de l'application en cours d'exécution montrant les mises à jour de pression en temps réel et la barre d'état "connecté à l'ordinateur inférieur"](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image6.png) -->

# Chapitre 4 : Tracer la tendance de pression en temps réel (3 minutes)

## 4.1 Initialiser le graphique

Qt Charts fournit des composants de graphiques professionnels. Demandez à l'IA d'initialiser dans le constructeur :

```text
Please help me initialize Qt Charts real-time line chart in MainWindow constructor:
1. Create QChart and QLineSeries
2. X axis uses QDateTimeAxis, showing latest 60 seconds
3. Y axis uses QValueAxis, range 0-3.0 MPa
4. Line color blue, width 2px
5. Place chart into QChartView and add to layout
```

Code principal :

```cpp
// mainwindow.cpp - initialisation du graphique
void MainWindow::setupChart()
{
    m_series = new QLineSeries();
    m_series->setName("Pression (MPa)");
    m_series->setPen(QPen(QColor("#2196F3"), 2));

    m_chart = new QChart();
    m_chart->addSeries(m_series);
    m_chart->setTitle("Tendance de pression en temps reel");
    m_chart->setAnimationOptions(QChart::NoAnimation); // pas d'animation pour les données en temps réel

    // Axe X : temps
    m_axisX = new QDateTimeAxis();
    m_axisX->setFormat("HH:mm:ss");
    m_axisX->setTitleText("Temps");
    m_chart->addAxis(m_axisX, Qt::AlignBottom);
    m_series->attachAxis(m_axisX);

    // Axe Y : pression
    m_axisY = new QValueAxis();
    m_axisY->setRange(0, 3.0);
    m_axisY->setTitleText("Pression (MPa)");
    m_axisY->setLabelFormat("%.1f");
    m_chart->addAxis(m_axisY, Qt::AlignLeft);
    m_series->attachAxis(m_axisY);

    // Créer la vue du graphique
    QChartView *chartView = new QChartView(m_chart);
    chartView->setRenderHint(QPainter::Antialiasing);

    // Ajouter à la mise en page (en supposant un centralLayout existant)
    centralLayout->addWidget(chartView);
}
```

## 4.2 Mettre à jour le graphique en temps réel

Chaque fois qu'une nouvelle valeur de pression est lue, ajouter un point et ne garder que les 60 dernières secondes :

```cpp
// mainwindow.cpp - mises à jour du graphique
void MainWindow::updateChart(float pressure)
{
    QDateTime now = QDateTime::currentDateTime();

    // Ajouter un nouveau point
    m_series->append(now.toMSecsSinceEpoch(), pressure);

    // Ne garder que les 60 dernières secondes de données
    QDateTime cutoff = now.addSecs(-60);
    while (m_series->count() > 0 &&
           m_series->at(0).x() < cutoff.toMSecsSinceEpoch()) {
        m_series->remove(0);
    }

    // Mettre à jour la plage de l'axe X : toujours afficher les 60 dernières secondes
    m_axisX->setRange(cutoff, now);
}
```

Puis appelez-le dans `onReadReady()` :

```cpp
// Ajouter après l'analyse de la pression dans onReadReady() :
updateChart(pressure);
```

Maintenant, exécutez le programme. Vous verrez une ligne bleue se mettant à jour en temps réel, un point par seconde, affichant toujours les 60 dernières secondes. Si vous modifiez manuellement les valeurs des registres dans Modbus Slave, la ligne reflète les changements immédiatement.

<!-- ![placeholder: Capture d'écran de la tendance de pression en temps réel montrant la ligne bleue défilante, axe X temps, axe Y pression](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image7.png) -->

> **Astuce de performance** : `QChart::NoAnimation` est important. Les données en temps réel se rafraîchissent chaque seconde ; les animations peuvent causer des saccades de l'interface. C'est une pratique courante en IHM industrielle.

# Chapitre 5 : Système d'alarmes et journaux de défauts (3 minutes)

## 5.1 Alarme de dépassement de seuil

Lorsque la pression dépasse le seuil, nous avons besoin de : avertissement interface rouge + alerte popup + enregistrement dans le journal.

```cpp
// mainwindow.cpp - logique d'alarme
void MainWindow::triggerAlarm(float pressure)
{
    // Passer l'interface en rouge
    m_pressureLabel->setStyleSheet(
        "color: white; background-color: #F44336;"
        "font-size: 32px; padding: 10px; border-radius: 8px;");

    // Indicateur de statut rouge
    m_statusLight->setStyleSheet(
        "background-color: #F44336; border-radius: 12px;"
        "min-width: 24px; min-height: 24px;");

    // Alarme popup (seulement la première fois que le seuil est dépassé pour éviter les popups répétés)
    static bool alarmActive = false;
    if (!alarmActive) {
        alarmActive = true;
        QMessageBox::warning(this, "Alarme de pression",
            QString("Pression actuelle %1 MPa depasse le seuil %2 MPa !\nVerifiez immediatement l'etat de la pompe.")
                .arg(pressure, 0, 'f', 2)
                .arg(m_alarmThreshold, 0, 'f', 2));
    }

    // Enregistrer dans la base de données
    logAlarm(pressure,
        QString("Pression au-dessus du seuil : %1 MPa > %2 MPa")
            .arg(pressure, 0, 'f', 2)
            .arg(m_alarmThreshold, 0, 'f', 2));

    // Réinitialiser lorsque la pression revient à la normale
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

<!-- ![placeholder: Capture d'écran d'alarme de dépassement de seuil montrant le fond de pression rouge, l'indicateur rouge et la popup d'alarme](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image8.png) -->

## 5.2 Journaux de défauts SQLite

Les systèmes industriels doivent enregistrer tous les événements d'alarme pour la traçabilité. Nous utilisons SQLite :

```cpp
// mainwindow.cpp - initialisation de la base de données
void MainWindow::setupDatabase()
{
    m_db = QSqlDatabase::addDatabase("QSQLITE");
    m_db.setDatabaseName("pump_alarm_log.db");

    if (!m_db.open()) {
        qWarning() << "Impossible d'ouvrir la base de donnees :" << m_db.lastError().text();
        return;
    }

    // Créer la table d'alarmes
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

## 5.3 Journaliser et afficher les enregistrements

```cpp
// mainwindow.cpp - écrire les journaux
void MainWindow::logAlarm(float pressure, const QString &message)
{
    // Écrire dans la base de données
    QSqlQuery query;
    query.prepare(
        "INSERT INTO alarm_log (pressure, message) VALUES (?, ?)");
    query.addBindValue(pressure);
    query.addBindValue(message);
    query.exec();

    // Mettre à jour la table à l'écran
    int row = m_logTable->rowCount();
    m_logTable->insertRow(row);
    m_logTable->setItem(row, 0,
        new QTableWidgetItem(
            QDateTime::currentDateTime().toString("yyyy-MM-dd HH:mm:ss")));
    m_logTable->setItem(row, 1,
        new QTableWidgetItem(QString::number(pressure, 'f', 2)));
    m_logTable->setItem(row, 2,
        new QTableWidgetItem(message));

    // Défilement automatique vers la dernière ligne
    m_logTable->scrollToBottom();
}
```

La table de journaux comporte trois colonnes : heure, valeur de pression et message d'alarme. Chaque alarme ajoute une ligne et est persistée dans SQLite.

<!-- ![placeholder: Capture d'écran de la table des journaux de défauts avec plusieurs enregistrements incluant l'horodatage, la pression et le message d'alarme](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image9.png) -->

## 5.4 Démarrer/arrêter manuellement la pompe

En plus de lire les données, l'ordinateur supérieur devrait également contrôler l'ordinateur inférieur. Nous le faisons en écrivant des valeurs de registre :

```cpp
// mainwindow.cpp - contrôle de pompe
void MainWindow::togglePump()
{
    if (!m_modbusClient || m_modbusClient->state() != QModbusDevice::ConnectedState)
        return;

    m_pumpRunning = !m_pumpRunning;

    // Construire la requête d'écriture : écrire 1 (démarrer) ou 0 (arrêter) à l'adresse 2
    QModbusDataUnit writeUnit(
        QModbusDataUnit::HoldingRegisters, 2, 1);
    writeUnit.setValue(0, m_pumpRunning ? 1 : 0);

    if (auto *reply = m_modbusClient->sendWriteRequest(writeUnit, 1)) {
        connect(reply, &QModbusReply::finished, this, [this, reply]() {
            if (reply->error() == QModbusDevice::NoError) {
                m_pumpButton->setText(m_pumpRunning ? "Arreter la pompe" : "Demarrer la pompe");
                m_pumpButton->setStyleSheet(m_pumpRunning
                    ? "background-color: #F44336; color: white; padding: 12px;"
                    : "background-color: #4CAF50; color: white; padding: 12px;");
                statusBar()->showMessage(
                    m_pumpRunning ? "Pompe demarree" : "Pompe arretee", 2000);
            }
            reply->deleteLater();
        });
    }
}
```

Dans Modbus Slave, vous verrez l'adresse `2` basculer entre `0` et `1` au fur et à mesure que vous cliquez sur le bouton. C'est le processus de "contrôle" de l'ordinateur supérieur.

<!-- ![placeholder: Capture d'écran du bouton démarrer/arrêter la pompe montrant les états "Démarrer la pompe" vert et "Arrêter la pompe" rouge](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image10.png) -->

# Chapitre 6 : Empaquetage et déploiement (facultatif)

## 6.1 Empaqueter avec windeployqt / macdeployqt

Qt fournit des outils de déploiement officiels pour collecter automatiquement les bibliothèques dynamiques requises.

**Windows :**

```bash
# D'abord construire en Release, puis exécuter dans le répertoire de build :
windeployqt PumpHMI.exe
```

`windeployqt` copie les DLLs Qt, les plugins, les fichiers de traduction, etc. à côté de l'exécutable. Ce dossier empaqueté peut être envoyé directement.

**macOS :**

```bash
macdeployqt PumpHMI.app -dmg
```

Cela génère une image d'installateur `.dmg`.

## 6.2 Construire un installateur avec Qt Installer Framework

Si vous voulez un assistant d'installation professionnel ("Suivant -> Suivant -> Terminer"), utilisez Qt Installer Framework :

```text
Please help me create an installer for PumpHMI with Qt Installer Framework:
1. Create installer directory structure (config, packages)
2. Configure config.xml (installer name, version, target directory)
3. Put windeployqt output files into packages/com.example.pumphmi/data/
4. Run binarycreator to generate installer
```

<!-- ![placeholder: Capture d'écran de l'assistant d'installation PumpHMI montrant le chemin d'installation et la progression](../../../../zh-cn/stage-3/cross-platform/qt-industrial-hmi/images/image11.png) -->

# Chapitre 7 : Notes finales

Félicitations ! Vous avez construit de zéro un système IHM de surveillance de pompe de qualité industrielle. Récapitulatif :

1. Compris les concepts clés d'ordinateur supérieur, ordinateur inférieur et protocole Modbus
2. Simulé une "pompe virtuelle" avec Modbus Slave, sans véritable matériel
3. Construit la communication supérieur-inférieur en utilisant Qt `QModbusTcpClient`
4. Tracé une courbe de tendance de pression défilante en temps réel avec Qt Charts
5. Implémenté des alarmes popup de dépassement de seuil et des journaux de défauts SQLite
6. Implémenté le contrôle à distance de démarrage/arrêt de la pompe

Tout le processus n'a utilisé aucun véritable matériel industriel, mais l'architecture et les fonctions correspondent aux systèmes IHM d'usine réels. Si vous remplacez Modbus Slave par un vrai PLC, cette application peut être utilisée directement dans des scénarios de production.

**Directions avancées :**

* **Surveillance multi-appareils** : connecter plusieurs ordinateurs inférieurs et utiliser des onglets/vues fractionnées pour les données de différents appareils
* **Relecture historique** : lire les données historiques depuis SQLite et rejouer les courbes de tendance avec des contrôles de chronologie
* **Protocole OPC UA** : Modbus convient aux scénarios plus simples ; les systèmes industriels complexes utilisent souvent OPC UA, également supporté par Qt (module Qt OPC UA)
* **Surveillance à distance web** : utiliser Qt WebSocket pour pousser les données en temps réel vers un navigateur pour une visualisation mobile
* **Maintenance prédictive par IA** : alimenter les données de pression historiques à des modèles ML pour prédire les pannes à l'avance

***Utilisez le code pour protéger chaque appareil dans les opérations industrielles.***

# Références

* [Documentation Qt Serial Bus](https://doc.qt.io/qt-6/qtserialbus-index.html)
* [Exemple Qt Modbus TCP Client](https://doc.qt.io/qt-6/qtserialbus-modbus-client-example.html)
* [Documentation Qt Charts](https://doc.qt.io/qt-6/qtcharts-index.html)
* [Spécifications du protocole Modbus](https://modbus.org/specs.php)
* [Simulateur Modbus Slave](https://www.modbustools.com/modbus_slave.html)
* [Documentation Qt Installer Framework](https://doc.qt.io/qtinstallerframework/)
