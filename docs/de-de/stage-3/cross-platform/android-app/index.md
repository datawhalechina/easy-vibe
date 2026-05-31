# So erstellen Sie eine einfache Android-App - Native Compose-Entwicklung

# 1 Was Android-Apps und Android-Entwicklung sind

In diesem Tutorial werden wir einen vollstaendigen Prozess durchlaufen: **von einer Idee in deinem Kopf bis zu einer echten App, die erfolgreich auf einem Android-Telefon installiert und ausgefuehrt werden kann.**

Fuer dieses Tutorial solltest du mindestens Folgendes haben:

- Einen Computer mit angemessener Leistung (Windows oder Mac)
- Ein Android-Telefon (optional; wenn du keines hast, verwenden wir einen Emulator)
- Android Studio installiert (zum Erstellen)
- Trae installiert und registriert (fuer KI-gestuetztes Programmieren)

## 1.1 Definition einer Android-App

Eine Android-App ist eine native Anwendung, die auf dem Android-Betriebssystem laeuft. Im Gegensatz zu Mini-Programmen ist sie nicht von einem Host wie WeChat abhaengig. Sie laeuft direkt auf Systemebene, hat ein eigenes Startbildschirm-Symbol, startet schnell, fuehlt sich fluessig an und kann tief auf Systemfunktionen wie Bluetooth, Sensoren und Hintergrunddienste zugreifen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image1.png)

## 1.2 Android-App-Entwicklung

Android-Entwicklung bezeichnet den gesamten Prozess der Erstellung solcher Anwendungen. Im in diesem Tutorial verwendeten Vibe-Coding-Entwicklungsmodus mit **KI-gestuetztem Programmieren** verschiebt sich die Rolle des Entwicklers vom „Code-Schreiber" zum „Produktarchitekten":

1. **Du (Architekt / PM)**: verantwortlich fuer Geschaeftslogik-Design, Prompt-Erstellung und die finale Abnahme des Ergebnisses.
2. **Trae (KI-Ingenieur)**: verantwortlich fuer die Ausfuehrung von Anweisungen, die Umsetzung natuerlicher Sprache in standardmaessigen Kotlin-Code und Jetpack-Compose-Layouts sowie die Behandlung von Syntaxfehlern und Logikdetails.
3. **Android Studio (Baufabrik)**: verantwortlich fuer die Bereitstellung der Kompilierungsumgebung, die Paketierung von Code in eine ausfuehrbare App und Emulator-Vorschauen.

## 1.3 Gaengige Methoden zum Erstellen von Android-Apps

In der echten Entwicklung gibt es mehr als einen Weg, Android-Apps zu erstellen. Wir werden hier nicht tief einsteigen, sondern nur einen Gesamtueberblick geben.

**Der erste Weg: Native Entwicklung**
Dies ist Googles offizielle und empfohlene Route. Du verwendest direkt **Kotlin** und **Jetpack Compose** zur Entwicklung. Der Vorteil ist die beste Performance und der vollstaendige Zugriff auf die Telefon-Hardware.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image2.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image3.png)

**Der zweite Weg: Plattformuebergreifende Entwicklung**
Zum Beispiel Flutter oder React Native. Die Kernidee ist „ein Codebase schreiben und sowohl Android- als auch iOS-Apps generieren".

**Der dritte Weg: Hybrid-Entwicklung**
Im Wesentlichen wird eine Webseite in eine App-Huelle verpackt. Dies ist schnell in der Entwicklung, aber die Erfahrung und Fluessigkeit sind meist nicht so gut wie bei einer nativen App, und es ist schwierig, ein ausgefeiltes, immersives kleines Tool auf diese Weise zu erstellen.

**Die Wahl dieses Tutorials: native Entwicklung (** **Kotlin + Compose)** kombiniert mit KI-Tools zum Programmieren.
Der Grund ist einfach: Nativer Jetpack-Compose-Code hat eine sehr klare Struktur und eignet sich hervorragend dafuer, von KI verstanden und generiert zu werden. Wir muessen den Code nicht von Grund auf selbst schreiben. Stattdessen leiten wir Trae mit natuerlicher Sprache an, hochwertigen nativen Code zu generieren.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image4.png)

## 1.4 In diesem Tutorial behandelte Android-App-Entwicklungsschritte

Um den Lernprozess interessant zu gestalten, dreht sich dieses Tutorial um einen entspannenden, aber technisch repraesentativen Fall - das **Elektronische Holzfisch**. Wir kombinieren Traes Vibe-Coding-Modus mit einer Route, die du wiederholt nutzen kannst:

1. **Verstaendnis und Umgebung aufbauen**: Verstehen, was Android-Apps sind, Android Studio und Trae installieren und chinagerechte Spiegelserver konfigurieren, damit die Toolchain reibungslos funktioniert.
2. **Projektgeruest erstellen**: Ein leeres Android-Projekt erstellen, das erfolgreich im Emulator ausgefuehrt werden kann.
3. **KI-iterative Entwicklung**: Das Projekt in Trae oeffnen und dann durch Konversation mit der KI schrittweise das Holzfisch-Bild, Tipp-Animation, Soundeffekte, schwebenden Text und mehr implementieren.
4. **Echtgeraet-Debugging und Verfeinerung**: Den Emulator verlassen, die App auf deinem tatsaechlichen Telefon installieren, echtes Vibrationsfeedback erleben und die KI bei der Fehlersuche unterstuetzen lassen.
5. **Paketierung und Veroeffentlichung**: Ein formelles APK generieren und verstehen, wie man es teilt oder veroeffentlicht.

Dieser Abschnitt zeichnet nur das Gesamtbild und fuehrt noch nicht alle Befehle aus. Merke dir vorerst nur die Hauptschiene: **Umgebungseinrichtung -> Geruestbau -> KI-Beschreibung und Generierung -> Echtgeraet-Verfeinerung -> Paketierung und Auslieferung**. In den naechsten Kapiteln werden wir dich durch jeden Schritt fuehren.

# 2 Entwicklungsumgebung einrichten

## 2.1 In diesem Tutorial verwendete Tools

Waehrend des gesamten Entwicklungsprozesses verwenden wir drei Tools zusammen, die die Rollen von „Design", „Konstruktion" und „Abnahme" uebernehmen.

- **Trae**: Dies ist dein **KI-Programmierpartner**. Im Vibe-Coding-Modus muessen wir Code nicht mehr Zeile fuer Zeile tippen. Stattdessen sagen wir der KI in natuerlicher Sprache, was wir wollen, und sie uebernimmt Codegenerierung und -aenderung.
- **Android Studio**: Dies ist Googles offizielle **App-Baufabrik**. Obwohl es viele Schaltflaechen hat, verwenden wir es in diesem Tutorial hauptsaechlich, um das Projektgeruest zu erstellen und den von Trae generierten Code in etwas Installierbares zu kompilieren.
- **Ein Android-Geraet**: Dies dient als **Testterminal** zur Begutachtung des Ergebnisses. Du kannst es mit deinem Computer fuer Echtgeraet-Debugging verbinden und echtes Vibrationsfeedback spueren. Wenn du keines hast, kann der in Android Studio integrierte **Emulator** ein virtuelles Telefon perfekt simulieren, was fuer die fruehe Entwicklung ausreicht.

## 2.2 Trae herunterladen

Trae ist unser Hauptschlachtfeld fuer **Vibe Coding**. Du kannst es einfach als einen **„KI-gestuetzten Code-Editor"** verstehen.

Besuche die offizielle Website [https://www.trae.cn](https://www.trae.cn), lade die zu deinem Computersystem passende Version (Windows oder Mac) herunter und installiere sie wie gewoehnliche Software per Doppelklick auf das Installationsprogramm und folge den Anweisungen. Sobald dieses Tool bereit ist, werden wir in der spaeteren Praxis aufhoeren, auf langweilige Code-Fenster zu starren, und stattdessen das Projekt hier oeffnen und der KI in natuerlicher Sprache sagen, was sie erstellen soll.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image5.png)

## 2.3 Android Studio herunterladen

Wir benoetigen Android Studio, um das Android SDK und den Emulator bereitzustellen, die zum Ausfuehren der App benoetigt werden. Besuche die offizielle Download-Seite [https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn) und lade das Paket fuer dein Betriebssystem herunter (dieses Tutorial basiert auf **2025.2.3**). Nach dem Download installiere es wie normale Software und behalte die Standardoptionen bei.

**Besonderer Hinweis fuer Anfaenger:**

Obwohl moderne Android-Studio-Versionen die Konfiguration stark vereinfacht haben, haengt es im Hintergrund weiterhin vom **JDK (Java Development Kit)** ab. Wenn du zum ersten Mal entwickelst oder wenn waehrend der Installation Fehler im Zusammenhang mit Umgebungsvariablen oder SDK-Konfiguration auftreten, gerate nicht in Panik. Du kannst diese detaillierte Einrichtungsanleitung konsultieren: [Android Studio 2024 Setup: SDK und Gradle-Konfiguration](https://blog.csdn.net/keiraee/article/details/142321644?ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image6.png)

## 2.4 Ein neues Projekt erstellen

Oeffne Android Studio und klicke auf dem Willkommensbildschirm auf **New Project**.

**Schritt 1: Vorlage auswaehlen**

Waehle in der Vorlagenliste **Empty Activity** (beachte das Jetpack-Compose-Symbol darauf).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image7.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image8.png)

**Schritt 2: Projektkonfiguration ausfuellen**

Dann siehst du ein Konfigurationsformular. Fuelle es grob wie folgt aus und belasse den Rest auf Standard:

| **Feld** | **Empfohlener Wert** | **Erklaerung** |
| ----------------- | -------------------------------------------------- | ---------------------------------------- |
| **Name** | My Application 1 | App-Name, der auf dem Telefon-Startbildschirm angezeigt wird |
| **Package name** | com.example.myapplication1 | Eindeutiger App-Identifikator |
| **Save location** | Benutzerdefinierter Pfad (z. B. `E:\AndroidProjects\Myapplication1`) | Projektspeicherort; nicht empfohlen auf Laufwerk C |
| **Minimum SDK** | API 30 | Deckt ueber 90 % der aktiven Geraete ab und balanciert Kompatibilitaet und Funktionen |
| **Language** | Kotlin (empfohlen) | Kotlin ist Googles offiziell empfohlene Sprache, sauberer und sicherer |

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image9.png)

**Schritt 3: Auf Projekterstellung warten**

Klicke auf **Finish**. Android Studio laedt automatisch Abhaengigkeiten herunter und erstellt das Projekt (du siehst einen Fortschrittsbalken in der unteren rechten Ecke).

- _Hinweis: Die erste Projekterstellung kann mehrere Minuten dauern. Warte geduldig, bis der Fortschritt unten abgeschlossen ist und der Projektdateibaum links vollstaendig geladen ist._

## 2.5 Abhaengigkeitskonfiguration: Gradle-Download und Gradle-Repository-Spiegel

> Dies ist einer der wenigen Schritte im Vibe-Coding-Workflow, bei denen **manuelle Operation** empfohlen wird. Obwohl KI auch bei der Konfigurationsaenderung helfen kann, betrifft Umgebungskonfiguration Dateien auf niedriger Ebene, sodass manuelle Aenderungen zuverlaessiger sind.

Warum muessen wir die Konfiguration aendern?

Standardmaessig verbindet sich Android Studio mit Servern im Ausland, sodass das Herunterladen von Build-Tools und Abhaengigkeiten eine Stunde dauern oder sogar fehlschlagen kann. Nach dem Wechsel zu inlaendischen Spiegeln ist es oft innerhalb weniger Minuten erledigt. **Dies ist eine einmalige Aufgabe, die sich fuer immer auszahlt.**

1. **Vorbereitung**

Wenn die Statusleiste unten rechts in Android Studio derzeit einen Fortschrittsbalken wie `Gradle Building...` anzeigt, pausiere den laufenden Abhaengigkeits-Download zuerst, um Dateikonflikte zu vermeiden.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image10.png)

2. **Gradle-Download beschleunigen**

Erweitere im linken Projektdateibaum `gradle` -> `wrapper` und oeffne dann `gradle-wrapper.properties`. Aendere die Download-Quelle auf den Tencent-Spiegel:

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

Achtung: Du musst nur `services.gradle.org/distributions` durch `mirrors.cloud.tencent.com/gradle` ersetzen. Aendere nichts anderes.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **Download des Abhaengigkeits-Repositorys beschleunigen**

Oeffne dann `settings.gradle.kts` im Projektstamm und ersetze den Inhalt im `repositories`-Block durch Folgendes:

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image12.png)

Ersetze den hervorgehobenen Bereich durch diesen Code (aktuelle Quellenliste Stand 2025-02-21):

```json
        // Aliyun-Spiegel (deckt Maven Central, Google, JCenter usw. ab)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Huawei Cloud Spiegel
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Tencent Cloud Spiegel
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // NetEase Spiegel
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

Es sollte dann wie im folgenden Screenshot aussehen:

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **Aenderungen speichern und anwenden**

Speichere nun die Datei und klicke auf `Try Again` in der oberen rechten Ecke. Android Studio fuehrt den Download erneut aus. Warte einige Minuten. Wenn die Konsole `BUILD SUCCESSFUL` anzeigt, bedeutet dies, dass die Umgebungseinrichtung vollstaendig abgeschlossen ist und wir bereit sind, mit dem Programmieren zu beginnen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 Die Projektstruktur verstehen

Nach erfolgreicher Projekterstellung erscheint das **Project**-Panel links. Wechsle zur **Android**-Ansicht (Standard), und du siehst Schluesselverzeichnisse wie folgt:

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- App-"Ausweis", deklariert App-Name und Einstiegspunkt-Activity (MainActivity)
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- App-Einstiegspunkt, erstellt UI mit Jetpack Compose
│       │
│       └── ui/                        <- Steuert den Gesamt-UI-Stil (Farben, Schriftarten)
├── res/
│   ├── drawable/                      <- Bildressourcen (z. B. ic_launcher.png)
│   ├── mipmap/                        <- App-Symbol
│   ├── values/                        <- Text, Farben, Themen-Stile
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- Systembezogene Konfigurationsdateien (nicht UI)
└── build.gradle (Module: app)         <- App-Build-Konfiguration (auf Anfaengerstufe meist unveraendert)
```

Als Anfaenger muessen wir uns normalerweise nur auf drei Dateien konzentrieren:

- `MainActivity.kt`: Steuert das Verhalten und entscheidet, „was auf dem Bildschirm erscheint"
- `AndroidManifest.xml`: Registriert Komponenten und entscheidet, „wo die App startet"
- `Theme.kt`: Definiert das visuelle Erscheinungsbild

# 3 Android-App-Entwicklung

In den ersten beiden Kapiteln haben wir bereits verstanden, was Android-Apps sind, und die beiden Schluessel-Tools geschaerft: Trae und Android Studio. Ab diesem Abschnitt verlassen wir die Papierdiskussion und betreten die echte Praxis. Wir werden den Vibe-Coding-Modus verwenden, um von Grund auf eine sehr beliebte Stressabbau-App zu erstellen - den **Elektronischen Holzfisch**. Er passt gut zum „Vibe"-Thema (einfach und entspannend) und deckt gleichzeitig drei Kernbereiche der Android-Entwicklung ab: **UI-Interaktion (Antippen), Datenspeicherung (Verdienstzaehler) und Multimedia (Soundeffekte)**.

Jetzt folge den Anweisungen und sende die erste Anweisung an die KI.

## 3.1 Der erste „Master-Prompt": Von Null auf Eins

Im Vibe-Coding-Modus muessen wir nicht wie bei der traditionellen Entwicklung zuerst Layout-Dateien erstellen und dann Logik-Code schreiben. Was wir tun muessen, ist **die Anforderungen klar in einem Durchgang zu beschreiben und die KI den ersten ausfuehrbaren Prototyp generieren zu lassen**.

Oeffne das gerade erstellte Projektverzeichnis in Trae und gib im Chat-Panel rechts den folgenden Prompt ein:

```text
Du bist ein erfahrener Android-Entwicklungsexperte. Bitte schreibe die aktuelle MainActivity.kt um und verwandle sie in eine "Elektronischer Holzfisch"-App. Anforderungen:
1. Der Bildschirmhintergrund ist schwarz.
2. Zeige eine Holzfisch-Grafik in der Mitte des Bildschirms, moderat gross, in Weiss.
3. Zeige eine Zeile weissen Text darueber: "Verdienst: 0".
4. Wenn der Holzfisch in der Mitte angetippt wird, erhoeht sich die Zahl um 1 und ein einfacher Skalierungs-Animationseffekt erscheint (simuliert das Klopf-Gefuehl).
5. Verwende Jetpack Compose.
```

Nach dem Senden beginnt Trae, deine Projektstruktur zu analysieren. Wenige Sekunden spaeter generiert es den vollstaendigen Code fuer `MainActivity.kt`.

1. Aus der Antwort koennen wir die Schlussfolgerungslogik und Interaktionslogik erkennen
2. Wir koennen direkt sehen, welche Teile des Codes umgeschrieben wurden
3. Wenn wir mit dem Ergebnis nicht zufrieden sind, koennen wir zur vorherigen Version zurueckkehren

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image15.png)

## 3.2 Ausfuehren und Vorschau (Emulator-Debugging)

An diesem Punkt hat die KI die erste Entwicklungsrunde abgeschlossen. Aber denk daran: Was wir in Trae sehen, sind nur Code-„Bauplaene", keine echte interaktive App. Trae selbst kann keine Android-Apps direkt ausfuehren, daher muessen wir uns auf das **Virtual Device**-Emulator verlassen, das von Android Studio bereitgestellt wird. Es ist, als ob du deinen Computerbildschirm in ein virtuelles Android-Telefon verwandelst, sodass wir den Code sofort installieren und das echte Ergebnis betrachten koennen.

Als Naechstes konfigurieren wir dieses „virtuelle Telefon".

**Schritt 1: Den Emulator erstellen**

Gehe zurueck zu Android Studio, finde und klicke auf **Device Manager** in der rechten Toolbar. Wenn du ihn nicht finden kannst, oeffne ihn ueber `View -> Tool Windows -> Device Manager`.

Klicke im Panel auf **Add a new device** und waehle dann **Create Virtual Device**, um in das Geraeteauswahlfenster zu gelangen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image16.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image17.png)

Waehle im Hardware-Auswahlfenster **Phone** und dann **Smart Phone** (mittlere Bildschirmgroesse) oder ein anderes beliebtes Geraeteprofil wie Pixel, und klicke auf **Next**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image18.png)

**Schritt 2: Das Systemabbild konfigurieren**

Im Dialog **System Image** waehle **API 36.1**. Wenn es noch nicht heruntergeladen wurde, klicke zuerst auf **Download**, waehle es nach Abschluss des Downloads aus und klicke auf **Finish**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image19.png)

**Schritt 3: Den Emulator starten**

Nach erfolgreicher Erstellung erscheint dein neues Telefon in der Geraetmanager-Liste. Klicke auf die **dreieckige Abspieltaste** rechts. Nach kurzer Wartezeit oeffnet sich ein telefonfoermiges Fenster - das ist dein Android-Emulator.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image20.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image21.png)

**Schritt 4: Die App ausfuehren**

Jetzt kommt der magische Moment. Stelle sicher, dass der Emulator gestartet ist und den Desktop anzeigt, und klicke dann auf das markante **gruene Run-Dreieck** in der oberen Toolbar von Android Studio (oder verwende die Tastenkombination `Shift + F10`). Android Studio kompiliert automatisch den von Trae geschriebenen Code, verpackt ihn als App und installiert ihn im Emulator.

Innerhalb weniger Sekunden solltest du den Emulator-Bildschirm aufleuchten sehen, der eine weisse Holzfisch-Grafik in der Mitte mit dem Text „Verdienst: 0" darueber anzeigt. Probiere, ihn anzutippen, und pruefe, ob die Zahl steigt und die Animation funktioniert. Das ist deine erste Android-App.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image22.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image23.png)

## 3.3 Optimierungsiteration (Assets und Sound hinzufuegen)

In diesem Stadium hat unsere App bereits eine Grundform: Antippen erhoeht die Zahl. Aber es ist immer noch nur eine „stumme" weisse geometrische Form, die an Spass vermissen laesst. Als Naechstes werden wir den Elektronischen Holzfisch durch ein echtes Bild und Klopf-Soundeffekte viel immersiver gestalten.

**Genau das ist der attraktivste Teil des Vibe-Coding-Modus.** In der traditionellen Entwicklung sind das Hinzufuegen von Soundeffekten und komplexeren Animationen oft der Albtraum eines Anfaengers. Du musst das Laden und Freigeben von `MediaPlayer`-Ressourcen verwalten (sonst kann es zu Speicherlecks kommen) und auch Animationskurven berechnen. Im Vibe-Coding-Modus musst du dich ueberhaupt nicht um diese Details auf niedriger Ebene kuemmern. Du musst der KI nur wie ein Regisseur sagen: „Aendere das Requisit und fuege einen Soundeffekt beim Antippen hinzu", und die Implementierung erscheint sofort.

**Schritt 1: Assets vorbereiten**
Du benoetigst ein Holzfisch-Bild (`png`) und einen Klopf-Soundeffekt (`mp3`).

- **Bild-Asset**: Kopiere das vorbereitete `white_muyu.png` in `app/src/main/res/drawable`
- **Audio-Asset**: Klicke in Android Studio im linken Projekt-Panel mit der rechten Maustaste auf den Ordner `res`, waehle `New -> Android Resource Directory`, waehle **raw** als Ressourcentyp, klicke auf OK, und kopiere dann `voice.mp3` in den neuen Ordner `res/raw`. _(Hinweis: Wenn du eine kommerzielle Veroeffentlichung planst, stelle sicher, dass du die rechtlichen Rechte an allen Assets besitzt.)_

Hier sind die Bild- und Sound-Assets, die ich fuer dich gefunden habe. Wenn es dir unangenehm ist, selbst nach welchen zu suchen, kannst du diese direkt verwenden.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image24.png)

Klopf-Sound-Download-Link: https://www.aigei.com/s?q=%E6%9C%A8%E9%B1%BC&type=sound
Waehle den ersten 1-Sekunden-Soundeffekt aus.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**Schritt 2: Die Iterationsanweisung senden**

Nachdem die Assets vorbereitet sind, gehe zurueck zu Trae. Trae wird den Code erneut aendern und die Audio-Lade- und Animationslogik fuer dich uebernehmen. Du musst ihm nur sagen, welche Assets verwendet werden sollen. Gib diesen Prompt ein:

```text
Ich habe die Assets hinzugefuegt. Der Bildpfad ist res/drawable/white_muyu.png und der Soundeffekt-Pfad ist res/raw/voice.mp3. Bitte aktualisiere den Code:
1. Ersetze das Holzfisch-Symbol in der Mitte durch mein Bild.
2. Spiele bei jedem Antippen des Holzfischs den Klopf-Sound ab.
3. Zeige beim Antippen einen temporaeren "+1"-Text ueber dem Holzfisch an und lasse ihn dann nach oben schweben und verschwinden (wie schwebender Punktetext in Spielen).
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**Schritt 3: Das Ergebnis ueberpruefen**

Nachdem Trae die Codeaenderung abgeschlossen hat, kehre zu Android Studio zurueck und klicke erneut auf die gruene Run-Schaltflaeche (Neu ausfuehren), um den Emulator neu zu starten. Jetzt wird sich deine App verwandelt anfuehlen. Versuche, mehrmals hintereinander zu tippen - du solltest ein knackiges „Tok Tok"-Geraeusch hoeren und den schwebenden „Verdienst +1"-Text aufpoppen sehen. Damit ist der wichtige Uebergang von „Demo" zu „Produkt" abgeschlossen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 Was tun, wenn Bugs auftreten? (Debugging-Schleife mit KI)

KI-generierter Code ist beim ersten Versuch nicht garantiert fehlerfrei, genau wie auch Top-Ingenieure nicht fehlerfreien Code in einem Durchgang versprechen koennen. Im Vibe-Coding-Modus sind Bugs jedoch keine Mauer, die dich blockiert; sie werden zu Trittplatten in deiner Zusammenarbeit mit der KI.

**Fall 1: Die App stuerzt ab**

Angenommen, die App stuerzt sofort nach dem Klick auf Run ab, oder das Antippen des Holzfischs spielt keinen Sound ab. Traditionell muesstest du nach dem Fehlercode suchen, Dutzende technischer Foren durchsuchen und viele schwer verstaendliche englische Beitraege lesen. Im Vibe-Coding-Modus musst du nur eine Sache tun - **Bote sein**.

**Schritte:**

1. **Das Protokoll oeffnen**: Finde das **Logcat**-Panel am unteren Rand von Android Studio (das kleine Katzen-Symbol).
2. **Den Fehler lokalisieren**: Du siehst scrollende Protokolle, und die **roten Zeilen** sind normalerweise die Schlüsselfehler.
3. **Kopieren und einfuegen**: Waehle den roten englischen Fehlertext aus, kopiere ihn und fuege ihn in Trae ein: „Ich habe diesen Fehler beim Ausfuehren erhalten. Bitte hilf mir, ihn zu beheben."
4. Die KI koennte dir sofort etwas sagen wie: „Dies ist passiert, weil die Vibrationsberechtigung in `AndroidManifest.xml` nicht deklariert wurde", und dir dann den korrigierten Code geben. Du klickst einfach auf Uebernehmen und machst weiter.

**Fall 2: Die App laeuft, aber die Erfahrung fuehlt sich schlecht an**

Manchmal stuerzt die App nicht ab, fuehlt sich aber trotzdem unbefriedigend an. Zum Beispiel: Wenn du den Holzfisch sehr schnell antippst, bemerkst du vielleicht, dass neue „+1"-Animationen erst erscheinen, nachdem das vorherige „+1" vollstaendig verschwunden ist. Das macht das Feedback traege und unbefriedigend. Du musst weder Multithreading noch Animations-Warteschlangen selbst studieren. Du musst nur dieses Unbehagen der KI klar beschreiben.

Sende diese „fortgeschrittene Anweisung" an Trae:

```text
Bitte aendere die aktuelle Animationslogik, um das Problem "schnelles Antippen loest nicht aus" zu loesen.
Aktuelles Problem: Es scheint nur einen Animationszustand zu geben, sodass ich warten muss, bis das vorherige "+1" vollstaendig verschwunden ist, bevor ein weiterer Klick reagiert.
Anforderungen:
1. Ersetze den einzelnen Animationszustand durch eine mutableStateListOf-basierte Liste.
2. Fuege jedes Mal, wenn der Holzfisch angetippt wird, sofort eine neue "+1"-Instanz zur Liste hinzu (mit eigener ID und Anfangsposition), unabhaengig davon, ob die vorherige Animation beendet ist.
3. Iteriere in der UI durch diese Liste, sodass jedes "+1" seine eigene Aufwaerts-Schweben- + Ausblend-Animation unabhaengig ausfuehrt.
4. Entferne eine "+1"-Animation nach Abschluss automatisch aus der Liste, um Speicherlecks zu vermeiden.
Bitte stelle den aktualisierten MainActivity.kt-Code direkt zur Verfuegung.
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 Showcase des Endergebnisses

In den vorherigen Schritten haben wir bereits einen Elektronischen Holzfisch fertiggestellt, der gesehen und gehoert werden kann. Um ihn einer veroeffentlichungsfaehigen App naeher zu bringen, werden wir in einer letzten Iteration **Tastatur-Feedback** und **Anpassung** hinzufuegen. Wir werden zwei Kernfunktionen implementieren: Erstens **Vibrations-Feedback**, sodass jeder Tipp eine physische Reaktion vom Telefon-Vibrationsmotor erhaelt und die Immersion stark verbessert; zweitens **anpassbarer Text**, der es Benutzern ermoeglicht, den Text auf dem Bildschirm zu aendern, zum Beispiel „Verdienst +1" in „Gehalt +1" oder „Problem -1".

Sende den folgenden sorgfaeltig gestalteten Prompt an Trae. Er wird die Dialog-Logik, den Statuswechsel und die Hardware-Interaktion in einem Durchgang uebernehmen:

```text
Rolle: Du bist ein Android Jetpack Compose Experte.
Aufgabe: Bitte fuege "anpassbaren Text" und "Vibrations-Feedback" zur bestehenden Elektronischer-Holzfisch-App hinzu.
Anforderungen:
1. Haptisches Feedback
Immer wenn der Benutzer den Holzfisch antippt, zusaetzlich zu Sound und Animation, rufe das haptische Feedback des Telefons auf (verwende LocalHapticFeedback.current), um eine leichte taktile Reaktion zu geben.
2. Anpassbare-Text-Funktion (UI und Interaktion)
Einstieg: Fuege ein kleines Bearbeitungssymbol neben dem oberen Text wie "Verdienst +1" hinzu (du kannst Icons.Default.Edit verwenden).
Dialog-Logik: Wenn das Symbol angetippt wird, zeige einen Dialog (Dialog/AlertDialog).
    Dialog-Titel: "Inhalt aendern"
    Eingabe: Erlaube dem Benutzer, den Text einzugeben, den er ansammeln moechte (Standard ist "Verdienst")
    Wert-Auswahl: Biete unter der Eingabe zwei Optionen an (z. B. RadioButton oder Schalter), damit der Benutzer "+1" oder "-1" waehlen kann
    Speichern-Schaltflaeche: Nach dem Klick auf Speichern, schliesse den Dialog und wende die neuen Einstellungen auf den Hauptbildschirm an
    Datenaktualisierung: Wenn der Benutzer den Inhalt aktualisiert, setze den oberen Zaehler auf 0 zurueck und beginne von vorne zu zaehlen
3. Effekt-Aktualisierung
Nach dem Speichern sollten sowohl der obige Zaehlertext als auch der schwebende Animationstext beim Antippen des Holzfischs zum benutzerdefinierten Format wechseln.
    Die Groesse des schwebenden Textes sollte die Groesse des oberen Zaehlertextes nicht ueberschreiten
    Beispiel: Wenn der Benutzer "Gehalt" eingibt und "+1" waehlt, wird die obige Zaehlerlogik zu +1 und der schwebende Text wird zu "Gehalt+1"
    Wenn der Benutzer "Problem" eingibt und "-1" waehlt, wird die obige Zaehlerlogik zu -1 und der schwebende Text wird zu "Problem-1"
4. Technische Anforderungen:
Stelle sicher, dass der neue Zustand (Text und Zahl) die Animation korrekt beeinflusst.
Bitte stelle den vollstaendig aktualisierten MainActivity.kt zur Verfuegung, waehrend die vorherige Sound- und Animationslogik unveraendert bleibt.
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image31.png)

# 4 Echtgeraet-Debugging und Verfeinerung

Der Emulator ist bequem, aber er kann keine echte Telefon-Vibration simulieren oder die echte Touch-Latenz vollstaendig widerspiegeln. Um das genaueste „Gefuehl" zu bekommen, muessen wir die App auf einem echten Android-Telefon installieren. Unten sind zwei Verbindungsmethoden, aus denen du waehlen kannst:

1. **Kabelloses Debugging (Wi-Fi)**: Kein Datenkabel erforderlich, praktisch fuer taegliche Ueberpruefungen. Aber dein Computer und Telefon muessen sich im **gleichen Wi-Fi-Netzwerk** befinden.
2. **USB-Kabel-Debugging**: Stabiler und weniger wahrscheinlich zu trennen, geeignet wenn das Netzwerk schlecht ist oder die anfaengliche Installation fehlschlaegt.

## 4.1 Kabelloses Debugging

Dies ist die bequemste Methode auf Android 11 und hoeher.

**Schritt 1: Das Telefon vorbereiten**

1. Stelle sicher, dass sich das Telefon und der Computer im **gleichen Wi-Fi** befinden.
2. Oeffne **Entwickleroptionen** und aktiviere **Kabelloses Debugging**.
3. Tippe auf **Kabelloses Debugging**, um in die Details zu gelangen, und waehle dann **Geraet mit QR-Code koppeln**. Dein Telefon oeffnet eine Scanner-Ansicht.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image32.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image33.png)

**Schritt 2: Am Computer koppeln**

1. Gehe zurueck zu Android Studio und klicke auf die Geraeteauswahl in der oberen Toolbar.
2. Waehle **Pair Devices Using Wi-Fi** aus dem Dropdown-Menue.
3. Ein QR-Code wird auf dem Bildschirm angezeigt.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image34.png)

**Schritt 3: Scannen zum Verbinden**

1. Verwende dein Telefon, um den QR-Code auf deinem Computerbildschirm zu scannen.
2. Sowohl das Telefon als auch der Computer sollten „Kopplung erfolgreich" anzeigen.
3. An dieser Stelle zeigt die obere Geraetleiste von Android Studio automatisch dein Telefonmodell an (z. B. `Google Pixel 8`).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image35.png)

4. Fuehre die App aus, indem du auf die Abspieltaste klickst

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image36.png)

## 4.2 USB-Kabel-Debugging

Wenn die kabellose Verbindung instabil ist oder dein Netzwerk kompliziert ist, ist das Anschliessen mit einem Kabel immer die zuverlaessigste Loesung. Obwohl es weniger bequem ist, bietet es die schnellste Uebertragungsgeschwindigkeit und trennt sich fast nie.

### 4.2.1 USB-Treiber in Android Studio vorbereiten (nur Windows)

Mac-Benutzer koennen diesen Schritt ueberspringen, da macOS das Telefon normalerweise direkt erkennt. Windows-Benutzer muessen sicherstellen, dass der Computer das Android-Telefon erkennen kann, was normalerweise die Installation des Google-USB-Treibers bedeutet:

1. Klicke in Android Studio auf `Tools -> SDK Manager` (oder finde es unter `Settings -> Languages & Frameworks -> Android SDK`)
2. Wechsle zum Tab **SDK Tools**
3. Aktiviere **Google USB Driver** und klicke auf **Apply**, um es herunterzuladen und zu installieren

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image37.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image38.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image39.png)

### 4.2.2 Dieselbe SDK-Version wie dein Echtgeraet herunterladen

**Schritt 1: Android-Version des Telefons pruefen**

Am Beispiel eines OPPO-Telefons: Oeffne Einstellungen -> Telefoninfo -> Android-Version pruefen (im Beispiel ist es Android 12).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image40.png)

**Schritt 2: Diese Android-Plattformversion in Android Studio herunterladen**

1. Klicke in Android Studio auf `Tools -> SDK Manager`
2. Bleibe im Standard-Tab **SDK Platforms**
3. Waehle Android 12.0 und klicke auf Apply zum Herunterladen

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image41.png)

### 4.2.3 Entwicklermodus auf dem Telefon aktivieren

Oeffne deine Telefon-Einstellungen, gehe zu den Entwickleroptionen und aktiviere **USB-Debugging**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image42.png)

### 4.2.4 USB-Treiber-Autorisierung auf dem Telefon installieren

Nimm nun dein Telefon zur Hand. Es sollte einen wichtigen Sicherheitsdialog anzeigen: „USB-Debugging erlauben?" Stelle sicher, dass du **Immer erlauben** aktivierst und dann auf **Zulassen** oder **OK** tippst. Dies ist die Schluesselautorisierung, die dem Computer die Kontrolle fuer das Debugging gibt.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image43.png)

### 4.2.5 Die App auf dem Telefon ausfuehren**

1. In der oberen Geraeteauswahl von Android Studio solltest du nun dein Telefonmodell sehen (z. B. `OPPO-PDKM00`)
2. Klicke auf die Abspieltaste. Dein Telefon zeigt den Dialog „USB-Debugging erlauben?" an; aktiviere „Immer erlauben" und bestaetige
3. Die App wird automatisch installiert und gestartet

Probiere nun, den Holzfisch auf deinem Telefon anzutippen, und spuere die Reaktion des echten Vibrationsmotors. Das ist das vollstaendige Vibe-Coding-Erlebnis.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image44.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image45.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image46.png)

# 5 Die App als APK paketieren

Der Code ist fertig und der Echtgeraet-Test funktioniert ebenfalls. Jetzt muessen wir die App aus Android Studio „herausholen" und in eine Datei umwandeln, die du an Freunde zum Installieren senden kannst. Dieser Prozess wird **Paketierung** genannt. In der Android-Entwicklung hat die Paketierung zwei vollstaendig unterschiedliche Modi, und wir waehlen basierend auf dem Verwendungsszenario.

## 5.1 Die Debug-Version paketieren (fuer schnelles Teilen)

Wenn du die App nur mit Freunden zum schnellen Ausprobieren teilen oder an Testtelefone zur Ueberpruefung senden moechtest, ist die **Debug-Version** die schnellste Option. Sie ist wie ein „Entwurf" - voll funktionsfaehig, aber nicht formal signiert, daher kann sie nicht in App-Stores eingereicht werden.

**Die Schritte sind sehr einfach:** Finde im oberen Menue von Android Studio `Build`, faehre ueber `Generate App Bundles or APKs` und klicke im Untermenue auf `Generate APKs`.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image47.png)

Warte etwa 5 Sekunden je nach Projektgroesse. Im unteren rechten Konsolenbereich von Android Studio erscheint eine Meldung. Klicke auf den blauen `locate`-Link und der Ausgabeordner oeffnet sich automatisch. Die Datei namens `app-debug.apk` ist das Paket, das wir wollen.

Du kannst sie direkt ueber WeChat oder QQ an jedes Android-Telefon senden, und der Empfaenger kann sie installieren und verwenden. Beachte, dass die Debug-Version keine Release-Version ist.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image48.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image49.png)

## 5.2 Die Release-Version paketieren

Wenn du die App in einem App-Store (wie Google Play oder Huawei AppGallery) veroeffentlichen oder die Warnung „unsichere App" bei der Installation vermeiden moechtest, musst du eine **Release-Version** paketieren. Diese Version erfordert eine eindeutige **digitale Signatur**, die wie ein Anti-Faelschungs-Siegel ist, das beweist, dass du diese App entwickelt hast und dass sie nicht manipuliert wurde.

> Kernzweck der Signierung
>
> - Identitaet des Herausgebers bestimmen: Da eine App mit demselben Paketnamen ein installiertes Programm ersetzen kann, verhindert die Signierung, dass dies missbraucht wird
> - App-Integritaet sicherstellen: Der Signierungsprozess umfasst jede Datei im Paket und stellt sicher, dass diese danach nicht ersetzt werden

Android-App-Signierung ist wie das Anbringen eines Siegels. Nach dem Siegel sind die App und der Entwickler miteinander verknuepft: Die App gehoert dir, und du bist dafuer verantwortlich. Andere koennen sich nicht als dich ausgeben, und du kannst dich nicht als andere ausgeben.

**Schritt 1: Den Signierungs-Assistenten starten**

Waehle im oberen Menue `Build` und klicke dann auf `Generate Signed Bundle / APK`. Im Popup-Fenster stehst du vor zwei Auswahlmoeglichkeiten:

- Android App Bundle (`.aab`): Von Google Play erforderlich, kleiner in der Groesse, aber kann nicht direkt auf einem Telefon installiert werden
- APK: Standard-Installationspaket, kann direkt installiert werden
_Zur Demonstration waehlen wir zuerst APK und klicken auf Next._

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**Schritt 2: Einen digitalen Schluessel (KeyStore) erstellen**

Hier haengen Anfaenger am haeufigsten fest. Da dies deine erste Release-Paketierung ist, musst du einen neuen **Keystore** erstellen. Klicke unter `Key store path` auf **Create new**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image52.png)

Fuelle im Popup die erforderlichen Informationen aus, aehnlich wie bei der Registrierung eines Kontos. Wir empfehlen dringend, dass das Keystore-Passwort und das Schluesselalias-Passwort **identisch** sind und dass du sie sich **sorgfaeltig aufschreibst**. Wenn du dieses Passwort verlierst, kann deine App in Zukunft nie wieder aktualisiert werden.

Klicke nach Abschluss auf OK. Du kehrst zum vorherigen Bildschirm zurueck, und die gerade ausgefuellten Schluesselinformationen sind bereits automatisch eingetragen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**Schritt 3: Das formelle Paket generieren**

Klicke auf Next, waehle **release** unter Build Variants und klicke abschliessend auf **Create**.

Nach kurzer Wartezeit zeigt Android Studio erneut eine „Generate Signed APK"-Erfolgsmeldung in der unteren rechten Ecke an. Klicke auf **locate**, und dieses Mal siehst du das digital signierte formelle Paket im Ordner (normalerweise namens `app-release.apk`). Diese Datei ist das Endprodukt, das du als Entwickler auslieferst.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 Offizielle Veroeffentlichung in App-Stores / Maerkten

Wenn deine App-Entwicklung abgeschlossen ist und das Release-Paket bereit ist, besteht der naechste Schritt darin, es zu veroeffentlichen, damit mehr Menschen es herunterladen und nutzen koennen. Derzeit sind die Hauptvertriebskanaele in zwei Kategorien unterteilt: **inlaendische Android-App-Stores** und **auslaendische App-Stores (Google Play)**.

## 6.1 Veroeffentlichung auf inlaendischen Maerkten

Das Android-Oekosystem in Festlandchina ist besonders. Es gibt keinen einzigen offiziellen Store (da Google Play nicht direkt zugaenglich ist). Stattdessen ist der Markt zwischen **Handyhersteller-App-Stores** und **Drittanbieter-Plattformen** aufgeteilt. Die grossen **Hersteller-Stores** umfassen Huawei, Xiaomi, OPPO, vivo, Meizu, Samsung usw. Da sie auf Geraeten vorinstalliert sind, haben sie den groessten Traffic. Die wichtigsten **Drittanbieter-Plattformen** umfassen Tencent MyApp und 360 Mobile Assistant.

### 6.1.1 Die Kernschwierigkeit: Das „Hindernis" fuer Einzelentwickler

Bevor du ein Konto registrierst, gibt es eine sehr wichtige Sache, die du wissen musst: **Inlaendische App-Maerkte sind sehr streng mit Einzelentwicklern.**

Derzeit fordern fast alle grossen inlaendischen App-Stores (Huawei, Xiaomi, OV, MyApp usw.) ein *Software-Urheberrechtsregistrierungszertifikat* fuer die Einreichung.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image58.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image59.png)

- **Was ist das?** Es ist ein Rechtsdokument, das beweist, dass die App dir gehoert.
- **Kosten fuer die Beschaffung**: Du musst ueber das Urheberrechtsamt beantragen. Eigenstaendige Beantragung dauert normalerweise 2-3 Monate; Nutzung einer Agentur fuer schnellere Bearbeitung kann mehrere hundert bis ueber tausend RMB kosten.
- **Aktuelle Realitaet**: Ohne dieses Zertifikat wird deine App sehr wahrscheinlich die Pruefung nicht bestehen, oder du kannst den App-Eintrag moeglicherweise nicht einmal erstellen. Darueber hinaus koennen Kategorien wie Nachrichten, Finanzen und Gesundheitswesen auch ICP-Eintragung oder andere Qualifikationen erfordern.

Wenn deine App also nur ein persoenliches Uebungsprojekt oder kleines Tool ist und du keine Zeit und kein Geld fuer die Beantragung dieses Zertifikats aufwenden moechtest, empfehle ich, direkt zu Abschnitt 6.2 zu springen und stattdessen Google Play in Betracht zu ziehen oder die APK-Datei einfach direkt mit Freunden zu teilen.

### 6.1.2 Entwicklerkonto registrieren

Wenn du die erforderlichen Qualifikationen bereits vorbereitet hast oder dich entschieden hast, auf inlaendischen Maerkten zu veroeffentlichen, ist der erste Schritt die Kontoregistrierung. Der Prozess ist bei den grossen Plattformen aehnlich, normalerweise mit Identitaetspruefung fuer Einzelpersonen oder Gewerbeanmeldung fuer Unternehmen.

Unten sind die Entwicklerplattform-URLs der grossen App-Maerkte:

Tencent Open Platform: https://open.tencent.com/

360 Open Platform: http://dev.360.cn

Baidu Developer Platform: http://app.baidu.com

Xiaomi Open Platform: https://dev.mi.com

Huawei Developer Alliance: http://developer.huawei.com/consumer/cn

Alibaba Developer Platform: http://open.uc.cn
Die Alibaba-Distribution integriert Wandoujia, Ali Jiuyou, PP Assistant, UC App Store, Shenma Search und YunOS App Store. Du musst nur ein Alibaba-Entwicklerkonto registrieren.

Samsung Developer Platform: http://support-cn.samsung.com/App/DeveloperChina/Home/Index

OPPO Developer Alliance: http://open.oppomobile.com

vivo Developer Alliance: https://dev.vivo.com.cn

Lenovo Open Platform: http://open.lenovo.com

Meizu Developer Alliance: http://open.flyme.cn

Gionee Developer Alliance: https://open.appgionee.com

**Am Beispiel von Tencent MyApp:** Besuche die Tencent Open Platform und klicke auf Registrieren. Es wird empfohlen, sich direkt mit einem QQ-Konto anzumelden. Beachte, dass ein QQ-Konto nach der Bindung schwer zu entbinden ist, daher ist es besser, ein dediziertes Arbeits-QQ-Konto zu verwenden. Folge den Anweisungen, waehle „Einzelentwickler" oder „Unternehmensentwickler", lade deine Ausweisfotos hoch und schliesse die Gesichtsverifikation ab. Nach bestandener Verifikation klicke auf **App erstellen**, um zu beginnen.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image60.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image61.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image62.png)

### 6.1.3 Einreichungsablauf und erforderliche Unterlagen

Nach Genehmigung der Kontopruefung kannst du die App erstellen und zur Pruefung einreichen. Du musst das folgende „Vierer-Set" vorbereiten:

1. **Installationspaket**: Das in Kapitel 5 paketierte **Release APK**
2. **Textinformationen**:
3. **App-Name**: Darf keine sensiblen Woerter enthalten
4. **Einzeilen-Einleitung**: Innerhalb von 20 chinesischen Zeichen, einfach und direkt (zum Beispiel: „Eine entspannende elektronische Holzfisch-App")
5. **Detaillierte Beschreibung**: 200+ chinesische Zeichen, die die Funktionen und Anwendungsszenarien der App vorstellen
6. **Visuelle Materialien**:
7. **App-Symbol**: Hochaufgeloestes PNG, normalerweise 512x512
8. **App-Screenshots**: Bereite 4-5 klare Screenshots der App in Verwendung vor, vorzugsweise die Hauptseiten abdeckend, normalerweise in einheitlicher Groesse wie 1080x1920
9. **Qualifikationsdokument**: Lade einen Scan deines Software-Urheberrechtsregistrierungszertifikats hoch

**Einreichung und Pruefung:** Nachdem alle Informationen ausgefuellt und das APK hochgeladen wurde, klicke auf **Zur Pruefung einreichen**. Der Pruefungszyklus betraegt normalerweise 1-3 Werktage. Achte in dieser Zeit auf E-Mail oder SMS. Pruefer koennen die Einreichung ablehnen, weil Screenshots unklar sind, Beschreibungen nicht standardisiert sind oder erforderliche Qualifikationen fehlen. In diesem Fall ueberarbeite gemaeß dem Feedback und reiche erneut ein.

## 6.2 Veroeffentlichung auf dem auslaendischen Markt (Google Play)

Wenn du dich nicht mit der Komplexitaet von Software-Urheberrechtszertifikaten und Eintragungen in inlaendischen App-Stores befassen moechtest oder wenn deine Zielgruppe global ist, ist Google Play die beste Wahl fuer Einzelentwickler.

### 6.2.1 Vorbereitung

- **Google-Konto**: Ein normales Gmail-Konto reicht aus
- **25 $ Registrierungsgebuehr**: Dies ist eine **einmalige lebenslange Gebuehr** und erfordert eine Kreditkarte, die USD-Zahlungen unterstuetzt (Visa / Mastercard)
- **Zuverlaessiger Netzwerkzugang**: Du musst Google Play Console reibungslos erreichen koennen
- **Formelles Installationspaket**: Beachte, dass Google Play das **.aab**-Format (Android App Bundle) erfordert, nicht APK. Waehle in Android Studio waehrend der Paketierung Android App Bundle. Die Schritte sind fast identisch mit der APK-Paketierung.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Google Play Console Veroeffentlichungsprozess (Uebersicht)

Da die Google Play-Registrierung und -Zahlung immer noch einige Einstiegshuerden haben (wie die Notwendigkeit einer auslaendischen Kreditkarte), bietet dieses Tutorial derzeit keine schrittweisen Screenshots. Aber hier ist der gaengige vierstufige Prozess:

**Schritt 1: App erstellen und in die Konsole eintreten**

Klicke auf `Create app`, fuelle den App-Namen aus (`Elektronischer Holzfisch`), waehle Englisch als Sprache, waehle App und Free als App-Typ und aktiviere die Vereinbarung. Danach hast du Zugang zum Backend.

**Schritt 2: Die Store-Seite gestalten**

Dies ist der erste Eindruck des Benutzers. Du musst das vorbereitete App-**Symbol** (512x512) und eine **Feature-Grafik** (1024x500) hochladen. Was die englische Beschreibung betrifft, kannst du Trae einfach fragen: **„Bitte hilf mir, eine englische Beschreibung fuer die Veroeffentlichung des Elektronischen Holzfischs auf Google Play zu schreiben, in einem lockeren und entspannenden Ton."** Die KI schreibt es normalerweise natuerlicher als eine direkte Uebersetzung.

**Schritt 3: Datenschutz und Inhaltseinstufung**

- Datenschutzrichtlinie: Suche nach „App Privacy Policy Generator" und generiere einen kostenlosen Link zum Einfuegen
- Inhaltseinstufung: Fuelle einen einfachen Fragebogen aus (z. B. ob Gewalt oder Gluecksspiel vorhanden ist). Der Elektronische Holzfisch erhaelt normalerweise eine allgemeine 3+-Einstufung.

**Schritt 4: Hochladen und veroeffentlichen**

Unter dem Menue `Production` klicke auf `Create new release`, lade deine `.aab`-Datei hoch, speichere und reiche zur Pruefung ein. Die Google Play-Pruefung ist normalerweise schnell (1-3 Tage). Nach Genehmigung kann deine App weltweit heruntergeladen werden.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image64.png)

_Wenn du die Entwicklerkontoregistrierung bereits abgeschlossen hast, kann dir dieses Video-Tutorial durch den restlichen Prozess fuehren:_ [Vollstaendiger Workflow: Hochladen einer Android-App auf Google Play](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 Abschlussbemerkungen

Damit sind wir am Ende des Tutorials angelangt. Wenn du den Elektronischen Holzfisch betrachtest, den du persoenlich auf deinem Telefon erstellt hast, frage ich mich, wie du dich jetzt fuehlst.

Als jemand, der in Softwaretechnik ausgebildet wurde, fuehle ich mich in der heutigen sich schnell entwickelnden KI-Aera tatsaechlich ziemlich emotional. Frueher arbeiteten wir uns durch dicke Programmierbuecher, lernten komplexe Syntax, kaempften mit Umgebungseinrichtung und verbrachten den halben Tag damit, rote Fehlermeldungen zu bekaempfen. Aber die Zeiten haben sich geaendert, und jetzt lernen wir zunehmend, wie man KI lenkt.

Durch diese Vibe-Coding-Praxis hast du bereits den vollstaendigen Android-App-Entwicklungsprozess erlebt. Die technische Barriere sinkt tatsaechlich. Wir muessen nicht mehr die ganze Zeit trockenen Code durcharbeiten und koennen mehr Energie darauf verwenden zu entscheiden, **was wir erstellen wollen**. Aber egal wie stark die Tools sind, sie sind immer noch nur Tools. Lass diese App nicht auf deinem Telefon verstauben. Bastel weiter daran, zerstoere sie und repariere sie wieder. Erst wenn du anfaengst, deine eigenen Ideen zu haben und sie zum Leben zu erwecken, hast du die Schwelle wirklich ueberschritten.

Wenn dieses Tutorial dir das Gefuehl gegeben hat, dass „das Erstellen einer App eigentlich gar nicht so schwer ist", dann bin ich geehrt, einen weiteren neuen Erbauer in der Entwicklungswelt willkommen geheissen zu haben.

Ich freue mich wirklich auf dein naechstes Werk. Mache weiter!

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image65.png)

**_Viel Spass in der Welt der Android-Entwicklung!_**

# Referenzen

CSDN: [So paketieren/erstellen Sie ein Android-Studio-Projekt (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%20%E6%89%93%E5%8C%85%20APK%20%E5%B9%B6%E5%88%86%E4%BA%AB&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Android Studio Installation und Konfiguration](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)
