# So bauen Sie eine plattformübergreifende Electron-Desktop-App: Eine Sprache-zu-Text-Anwendung

# Kapitel 1: Was Electron und Desktop-App-Entwicklung sind

In diesem Tutorial werden wir einen vollständigen geschlossenen Kreislauf durchlaufen: von Grund auf eine Sprache-zu-Text-Desktop-App mit Electron bauen, sowohl Cloud-API als auch lokales Modell-Erkennungsmodi unterstützen und sie schließlich als echte Desktop-Anwendung verpacken, die auf Windows, macOS und Linux installiert und ausgeführt werden kann.

Für dieses Tutorial sollten Sie mindestens Folgendes haben:

- Einen Computer (Windows oder Mac, Mac wird empfohlen, da lokale Modelle auf Apple Silicon sehr schnell laufen)
- Eine Node.js-Umgebung (Version 18.0 oder höher)
- Ihren KI-Coding-Assistenten (Cursor / Trae / Claude Code)
- (Optional) Einen OpenAI API-Schlüssel (wenn Sie den Cloud-Modus verwenden)
- Ein Mikrofon (das eingebaute Laptop-Mikrofon reicht aus)

## 1.1 Was ist Electron?

Apps, die Sie täglich nutzen, wie **VS Code, Slack, Discord und Notion**, haben eines gemeinsam: Sie sind alle Desktop-Anwendungen, die mit **Electron** gebaut wurden.

Electron ist ein Open-Source-Framework, das es Ihnen ermöglicht, **HTML + CSS + JavaScript** (derselbe Stack, der für Webseiten verwendet wird) zu nutzen, um Desktop-Apps zu bauen, die auf **Windows, macOS und Linux** laufen. Sein Prinzip ist einfach: Chromium und Node.js zusammen verpacken, und Ihre Webseite wird zu einer eigenständigen Desktop-App.

**Ein-Satz-Verständnis**: Electron = ein "unsichtbarer Chrome-Browser" + Node.js-Systemfähigkeiten.

<!-- ![Platzhalter: Ein Diagramm der Electron-Architektur: Chromium (für UI-Rendering) + Node.js (für Systemzugriff) = Desktop-Anwendung](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.webp) -->

## 1.2 Electron-Kernarchitektur

Eine Electron-App besteht aus zwei Prozesstypen. Sie zu verstehen ist der Schlüssel zur Entwicklung:

**Hauptprozess (Main Process)**

* Der "Geschäftsführer" der App
* Verantwortlich für die Erstellung von Fenstern, Verwaltung des App-Lebenszyklus und Zugriff auf native Fähigkeiten wie das Dateisystem
* Läuft in der Node.js-Umgebung und kann alle Node.js-Module verwenden
* Es gibt nur einen Hauptprozess pro App

**Renderer-Prozess (Renderer Process)**

* Das "Gesicht" der App
* Im Wesentlichen eine Chromium-Webseite, verantwortlich für UI-Rendering
* Jedes Fenster entspricht einem Renderer-Prozess
* Aus Sicherheitsgründen kann der Renderer-Prozess nicht direkt auf Node.js-APIs zugreifen

**Preload-Skript (Preload Script)**

* Die "Brücke" zwischen Hauptprozess und Renderer-Prozess
* Verwendet `contextBridge`, um ausgewählte APIs sicher dem Renderer-Prozess bereitzustellen

Sie kommunizieren durch **IPC (Inter-Process Communication)**, wie ein Telefonanruf: der Renderer sagt "Ich möchte mit der Aufnahme beginnen", und der Hauptprozess empfängt diese Anfrage und ruft das Systemmikrofon auf.

<!-- ![Platzhalter: Ein Electron-Prozessarchitekturdiagramm mit Hauptprozess, Renderer-Prozess und Preload-Skript sowie IPC-Kommunikation dazwischen](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.webp) -->

## 1.3 Was bauen wir?

In diesem Tutorial werden wir eine **Sprache-zu-Text**-Desktop-App bauen. Ihre Funktionalität ist unkompliziert:

1. Auf die Schaltfläche "Aufnahme starten" klicken, und die App beginnt, das Mikrofon abzuhören
2. Nach dem Sprechen auf "Stopp" klicken, und die App sendet Audio an KI zur Erkennung
3. Der erkannte Text wird in der UI angezeigt und kann mit einem Klick kopiert werden

**Zwei Erkennungsmodi sind verfügbar:**

| Vergleichsdimension | Cloud-API-Modus | Lokales Modell-Modus |
|---------|-------------|------------|
| Repräsentative Lösung | OpenAI Whisper API | whisper.cpp |
| Internet erforderlich | Ja | Nein |
| Erkennungsgeschwindigkeit | Abhängig vom Netzwerk | Abhängig von der Hardware (sehr schnell auf Apple Silicon) |
| Chinesische Erkennungsqualität | Ausgezeichnet | Ausgezeichnet (large-v3-Modell) |
| Kosten | $0,006/Minute | Kostenlos |
| Modellgröße | Kein Download erforderlich | tiny-Modell 75 MB, large-Modell 3 GB |
| Am besten für | Schneller Einstieg, leichte Nutzung | Datenschutzorientiert, Offline-Nutzung, langfristig hohe Nutzungsfrequenz |

<!-- ![Platzhalter: Eine App-Vorschau mit der Sprache-zu-Text-UI: Aufnahmetaste und Wellenformanimation oben, erkannter Text unten und ein Moduswechsel in der oberen rechten Ecke](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.webp) -->

## 1.4 Wichtiger Hinweis: Web Speech API ist in Electron nicht verfügbar

Wenn Sie nach "Electron Spracherkennung" gesucht haben, haben Sie möglicherweise Empfehlungen gesehen, die eingebaute `Web Speech API` des Browsers zu verwenden. **Bitte beachten Sie: Dies funktioniert nicht in Electron.**

Google hat die Sprach-API-Unterstützung für Nicht-Chrome/Edge-Browser-Shells eingestellt. Electron basiert auf Chromium, ist aber nicht Chrome selbst, sodass `window.SpeechRecognition` direkt fehlschlägt.

Deshalb benötigen wir unabhängige Lösungen wie die OpenAI Whisper API oder whisper.cpp.

## 1.5 Tutorial-Übersicht

Wir werden den vollständigen Ablauf in folgenden Schritten abschließen:

1. **Electron-Projekt erstellen**: Electron Forge verwenden, um das Projekt zu rüsten und prozessübergreifende Kommunikation zu verstehen
2. **Aufnahme implementieren**: Mikrofoneingabe im Renderer-Prozess erfassen und Audiodaten verarbeiten
3. **Cloud-Erkennung (Option A)**: OpenAI Whisper API für Sprache-zu-Text verwenden
4. **Lokale Erkennung (Option B)**: whisper.cpp lokal ohne Internetzugang verwenden
5. **Verpackung und Vertrieb**: Die App als installierbares Desktop-Programm verpacken

# Kapitel 2: Das Electron-Projekt erstellen

## 2.1 Projekt mit KI initialisieren

Öffnen Sie Ihren KI-Coding-Assistenten und geben Sie diesen Prompt ein:

```
Bitte helfen Sie mir, ein neues Electron-Projekt mit Electron Forge unter Verwendung der Vite-Vorlage zu erstellen.
Der Projektname ist voice-to-text.
Bitte ausführen: npx create-electron-app voice-to-text --template=vite
Nach der Erstellung in das Projektverzeichnis wechseln und Abhängigkeiten installieren.
```

Electron Forge ist das offiziell von Electron empfohlene Rüstwerkzeug. Es hilft bei Projektinitialisierung, Verpackung, Vertrieb und anderen mühsamen Einrichtungsaufgaben.

Nach der Erstellung ist die Projektstruktur ungefähr:

```text
voice-to-text/
├── src/
│   ├── main.js            # Hauptprozess-Einstieg
│   ├── preload.js         # Preload-Skript (Brücke)
│   ├── renderer.js        # Renderer-Prozess-Einstieg
│   └── index.html         # App-HTML-Seite
├── forge.config.js        # Electron Forge-Konfiguration
├── vite.main.config.mjs   # Hauptprozess-Vite-Konfiguration
├── vite.preload.config.mjs # Preload-Skript-Vite-Konfiguration
├── vite.renderer.config.mjs # Renderer-Prozess-Vite-Konfiguration
└── package.json
```

## 2.2 Starten und Vorschau

Bitten Sie KI, den Entwicklungsserver zu starten:

```
Bitte helfen Sie mir, den Electron-Entwicklungsserver zu starten, indem Sie npm start ausführen
```

Nach einigen Sekunden erscheint ein Desktop-Fenster. Dies ist Ihre Electron-App. Auch wenn sie vorerst nur eine Standard-Willkommensseite anzeigt, ist es bereits ein echtes Desktop-Programm.

<!-- ![Platzhalter: Screenshot des ersten Electron-App-Starts mit der Standard-Willkommensseite](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 IPC verstehen (Inter-Process Communication)

Bevor wir Sprachfunktionen implementieren, müssen wir den wichtigsten Konzept von Electron verstehen: **IPC (Inter-Process Communication)**.

Da der Renderer-Prozess (UI) und der Hauptprozess (Systemfähigkeiten) isoliert sind, müssen sie IPC-"Telefonanrufe" verwenden, um zusammenzuarbeiten:

```text
Renderer-Prozess (UI)                 Hauptprozess (System)
    │                                │
    │── "Ich möchte mit der Aufnahme beginnen" ──────────→   │
    │                                │── Mikrofon aufrufen
    │                                │── Audio verarbeiten
    │   ←──── "Hier ist das Ergebnis" ─────────────│
    │                                │
    │── Text in UI anzeigen           │
```

Im Code wird diese Kommunikation über `preload.js` überbrückt:

```javascript
// preload.js - APIs sicher dem Renderer-Prozess bereitstellen
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Renderer -> Haupt
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Haupt -> Renderer
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - Hauptprozess lauscht auf Nachrichten
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Whisper API oder whisper.cpp hier aufrufen
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![Platzhalter: IPC-Ablaufdiagramm mit Nachrichtenübertragung von Renderer -> Preload -> Main](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.webp) -->

# Kapitel 3: Aufnahme implementieren

## 3.1 Mikrofoneingabe im Renderer-Prozess erfassen

Der Browser (also der Electron-Renderer-Prozess) bietet `navigator.mediaDevices.getUserMedia` für den Mikrofonzugriff. Bitten Sie KI, die Aufnahme zu implementieren:

```
Bitte helfen Sie mir, src/index.html und src/renderer.js wie folgt zu ändern:

UI:
1. Eine große kreisförmige "Aufnahme starten"-Schaltfläche, die beim Klicken zu einer roten "Aufnahme stoppen"-Schaltfläche wird
2. Eine einfache Pulsanimation während der Aufnahme anzeigen
3. Einen Textanzeigebereich unten für Erkennungsergebnisse
4. Zwei Schaltflächen am unteren Rand: "Text kopieren" und "Leeren"
5. Ein Einstellungssymbol oben rechts zum Wechseln des Erkennungsmodus (Cloud/Lokal)

Aufnahme-Logik (in renderer.js):
1. Bei Schaltflächenklick Mikrofonzugriff über navigator.mediaDevices.getUserMedia anfordern
2. MediaRecorder verwenden, um Audio im webm-Format aufzunehmen
3. Nach dem Stoppen Audio-Blob in ArrayBuffer konvertieren
4. An Hauptprozess über window.electronAPI.sendAudio senden
5. Auf Erkennungsergebnis vom Hauptprozess warten und anzeigen
```

Kern-Aufnahme-Code:

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // An Hauptprozess für Transkription senden
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![Platzhalter: Screenshot der Aufnahme-UI mit roter Aufnahme-Schaltfläche und Pulsanimation sowie Textergebnisbereich darunter](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.webp) -->

## 3.2 Mikrofon-Berechtigungen behandeln

Electron blockiert standardmäßig Berechtigungsanfragen. Wir müssen den Mikrofonzugang im Hauptprozess ausdrücklich erlauben:

```
Bitte helfen Sie mir, die Mikrofon-Berechtigungsbehandlung in main.js hinzuzufügen:
1. session.defaultSession.setPermissionRequestHandler verwenden, um Berechtigungsanfragen zu behandeln
2. Automatisch erlauben, wenn der Anfragentyp 'media' ist
3. Für macOS sicherstellen, dass die Mikrofon-Verwendungsbeschreibung in package.json oder entitlements deklariert ist
```

```javascript
// Zu main.js hinzufügen
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **Hinweis für macOS-Nutzer**: macOS zeigt einen systemweiten Mikrofon-Berechtigungsdialog an. Das ist normal. Klicken Sie auf "Zulassen."

# Kapitel 4: Option A - Cloud-Erkennung (OpenAI Whisper API)

Dies ist die einfachste Option. Sie benötigen nur einen API-Schlüssel und wenige Zeilen Code.

## 4.1 OpenAI API-Schlüssel erhalten

1. Besuchen Sie [OpenAI Platform](https://platform.openai.com/), registrieren und anmelden
2. Gehen Sie zur API Keys-Seite und klicken Sie auf **"Create new secret key"**
3. Kopieren Sie den generierten Schlüssel (beginnt mit `sk-`) und speichern Sie ihn sicher

> **Kostenreferenz**: Whisper API kostet **$0,006/Minute**. Das bedeutet, 1 Stunde Audio zu erkennen kostet nur $0,36, was sehr erschwinglich ist.

## 4.2 Whisper API im Hauptprozess aufrufen

Bitten Sie KI, die Spracherkennung im Hauptprozess zu implementieren:

```
Bitte helfen Sie mir, die OpenAI Whisper API in main.js zu implementieren:
1. node-fetch installieren (falls benötigt) oder das integrierte fetch in Node.js verwenden
2. transcribeWithWhisper-Funktion erstellen, die ein Audio-ArrayBuffer akzeptiert
3. ArrayBuffer in Blob/File konvertieren und FormData erstellen
4. https://api.openai.com/v1/audio/transcriptions aufrufen
5. Modell whisper-1 verwenden und Sprache auf zh (Chinesisch) setzen
6. Den erkannten Text zurückgeben
7. API-Schlüssel aus Umgebungsvariablen oder Konfigurationsdatei lesen
```

Kern-Code:

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'zh')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![Platzhalter: Screenshot der laufenden App mit erkannter chinesischer Sprache, zurückgegeben von der Whisper API](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.webp) -->

## 4.3 Einstellungs-UI hinzufügen

Bitten Sie KI, ein einfaches Einstellungspanel im Renderer-Prozess hinzuzufügen, um den API-Schlüssel einzugeben und den Erkennungsmodus zu wechseln:

```
Bitte helfen Sie mir, ein Einstellungspanel in index.html hinzuzufügen:
1. Ein Zahnrad-Symbol oben rechts hinzufügen; Klick öffnet das Einstellungspanel
2. Das Panel enthält:
   - Erkennungsmodus-Schalter (Cloud API / Lokales Modell)
   - API Key-Eingabe (nur im Cloud-Modus sichtbar)
   - Sprach-Dropdown (Chinesisch / Englisch / Automatische Erkennung)
3. Einstellungen in localStorage speichern
4. Panel schließen, wenn außerhalb geklickt wird
```

<!-- ![Platzhalter: Screenshot des erweiterten Einstellungspanels mit Moduswechsel und API-Key-Eingabe](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# Kapitel 5: Option B - Lokale Erkennung (whisper.cpp)

Wenn Sie sich nicht auf Cloud-APIs verlassen möchten oder Offline-Nutzung benötigen, ist whisper.cpp die beste Wahl. Es ist ein C++-Port des OpenAI Whisper-Modells und läuft vollständig lokal ohne Internet.

## 5.1 whisper.cpp Node.js-Bindings installieren

Bitten Sie KI zu installieren und zu konfigurieren:

```
Bitte helfen Sie mir, nodejs-whisper im Projekt zu installieren:
npm install nodejs-whisper

Nach der Installation helfen Sie mir bitte, das whisper tiny-Modell herunterzuladen (kleine Größe, schnell zum Testen).
nodejs-whisper wird den Modell-Download automatisch handhaben.
```

> **Modellauswahl-Leitfaden**:
> * `tiny` (75 MB): am schnellsten, gut zum Testen und leichter Nutzung, durchschnittliche Genauigkeit
> * `base` (142 MB): Balance zwischen Geschwindigkeit und Genauigkeit
> * `small` (466 MB): deutlich bessere chinesische Erkennungsqualität
> * `large-v3-turbo` (1,5 GB): empfohlen; 5-8x schneller als large, mit nur 1-2% niedrigerer Genauigkeit
> * `large-v3` (3 GB): höchste Genauigkeit, aber langsamer und benötigt bessere Hardware

## 5.2 whisper.cpp im Hauptprozess integrieren

Bitten Sie KI, die lokale Erkennung zu implementieren:

```
Bitte helfen Sie mir, whisper.cpp lokale Erkennung in main.js hinzuzufügen:
1. nodejs-whisper importieren
2. transcribeWithLocal-Funktion erstellen
3. Audio-ArrayBuffer akzeptieren und zuerst als temporäre WAV-Datei speichern (16kHz mono)
4. nodejs-whisper zur Erkennung aufrufen
5. Erkannten Text zurückgeben
6. Temporäre Datei nach der Erkennung löschen
```

Kern-Code:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Als temporäre Datei speichern
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'zh',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // Temporäre Datei aufräumen
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![Platzhalter: Screenshot der lokalen Modell-Erkennung, die offline mit chinesischer Spracheingabe funktioniert](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Gute Nachrichten für Apple Silicon-Nutzer

Wenn Sie einen M1/M2/M3/M4 Mac verwenden, kann whisper.cpp automatisch **Metal GPU-Beschleunigung** und **Apple Neural Engine** nutzen. Die Erkennung kann **schneller als in Echtzeit** laufen, was bedeutet, dass 1 Minute Audio nur wenige Sekunden zur Verarbeitung benötigen kann.

Für NVIDIA GPU-Nutzer unterstützt whisper.cpp auch **CUDA-Beschleunigung**, die ebenfalls starke Leistung bietet.

# Kapitel 6: Verpackung und Vertrieb

Nach Abschluss der Entwicklung müssen wir die App in verteilbare Installationsprogramme verpacken.

## 6.1 Mit Electron Forge verpacken

Electron Forge ist bereits in unserem Projekt enthalten, also ist die Verpackung einfach:

```
Bitte helfen Sie mir, den Electron Forge-Verpackungsbefehl auszuführen:
npx electron-forge make
```

Dieser Befehl generiert automatisch Installationsprogramme für Ihr aktuelles Betriebssystem:

* **macOS**: `.dmg`-Installationsabbild und `.zip`-Archiv
* **Windows**: `.exe`-Installationsprogramm (Squirrel-Format)
* **Linux**: `.deb` (Debian/Ubuntu) und `.rpm` (Fedora) Pakete

Build-Ausgaben befinden sich im Verzeichnis `out/make/`.

<!-- ![Platzhalter: Screenshot der Dateien im out/make-Verzeichnis mit generierten .dmg- oder .exe-Installationsprogrammen](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 App-Größenoptimierung

Ein "Schmerzpunkt" von Electron-Apps ist die große Paketgröße (da Chromium mitgeliefert wird). Optimierungsvorschläge:

* Sicherstellen, dass nur Pakete in `dependencies` gebündelt werden und Entwicklungsabhängigkeiten in `devDependencies` bleiben
* Vite Tree-Shaking verwenden, um die JavaScript-Größe zu reduzieren
* Bei Verwendung lokaler Modelle: erwägen, Modelle beim ersten Start herunterzuladen statt in das Installationsprogramm einzubinden

| Konfiguration | Geschätzte Größe |
|------|---------|
| Reine Electron-App (ohne Modell) | ~150-200 MB |
| + whisper tiny-Modell | ~250 MB |
| + whisper large-v3-turbo-Modell | ~1,7 GB |

## 6.3 Plattformübergreifende Hinweise

**macOS:**
* Veröffentlichung im App Store oder Vertrieb an andere erfordert **Code-Signierung** (Apple Developer ID, $99/Jahr)
* Erfordert auch Apples **Notarisierungsprozess**
* Mikrofon-Berechtigungen müssen `NSMicrophoneUsageDescription` in `Info.plist` deklarieren
* Empfehlung: Universal Binary bauen, um sowohl Intel als auch Apple Silicon zu unterstützen

**Windows:**
* Code-Signierung wird empfohlen, andernfalls zeigt Windows SmartScreen Sicherheitswarnungen an
* Nutzer können weiterhin "Trotzdem ausführen" für unsignierte Apps wählen

**Linux:**
* Keine Code-Signierung erforderlich
* Empfohlen, sowohl `.deb` als auch `.AppImage`-Formate anzubieten

> **Tipp**: Für persönliche Projekte oder kleinere Vertrieb können Sie Code-Signierung vorerst überspringen und verpackte Dateien direkt mit Freunden teilen.

# Kapitel 7: Abschließende Bemerkungen

Herzlichen Glückwunsch! Sie haben eine plattformübergreifende Sprache-zu-Text-Desktop-App von Grund auf gebaut. Lassen Sie uns zusammenfassen, was wir getan haben:

1. Electron Forge verwendet, um eine plattformübergreifende Desktop-App zu rüsten
2. Hauptprozess, Renderer-Prozess und IPC-Kommunikation verstanden
3. Mikrofonaufnahme und Audioerfassung implementiert
4. Zwei Spracherkennungsoptionen integriert: Cloud Whisper API und lokales whisper.cpp
5. Gelernt, wie man eine Electron-App verpackt und vertreibt

Was Electron leistungsstark macht, ist, dass Sie Desktop-Apps auf dem Niveau von VS Code oder Slack mit einem Web-Tech-Stack bauen können. Und mit ausgereifter KI-Spracherkennung kann ein Feature wie Sprache-zu-Text, das früher ein spezialisiertes Team erforderte, nun von einer einzelnen Person gebaut werden.

**Fortgeschrittene Richtungen:**

* **Echtzeit-Untertitel**: AudioWorklet für Streaming-Audio verwenden und mit Streaming-Erkennungs-APIs für Live-Transkription kombinieren
* **Meeting-Assistent**: Vollständige Meetings aufzeichnen, automatisch Zeitstempel-Transkripte generieren und Kernaussagen mit KI zusammenfassen
* **Mehrsprachige Übersetzung**: Sprache transkribieren und Übersetzungs-APIs für Echtzeit-Sprachkonvertierung aufrufen
* **Sprachnotizbuch**: Mit einer lokalen Datenbank (wie SQLite) durchsuchbare Sprachnotizen erstellen

***Lassen Sie Ihre Stimme sprechen und lassen Sie Code alles für Sie aufzeichnen.***

# Referenzen

* [Electron Offizielle Dokumentation](https://www.electronjs.org/docs/latest/)
* [Electron Forge Offizielle Dokumentation](https://www.electronforge.io/)
* [OpenAI Whisper API Dokumentation](https://platform.openai.com/docs/guides/speech-to-text)
* [whisper.cpp GitHub Repository](https://github.com/ggml-org/whisper.cpp)
* [nodejs-whisper npm-Paket](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
