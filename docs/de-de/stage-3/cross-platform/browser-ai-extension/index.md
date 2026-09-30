# So bauen Sie eine Browser-KI-Assistent-Erweiterung: Jede Webseite mit einem Klick zusammenfassen

# Kapitel 1: Was Browser-Erweiterungen und Chrome-Extension-Entwicklung sind

In diesem Tutorial werden wir einen vollständigen geschlossenen Kreislauf durchlaufen: eine KI-gesteuerte Chrome-Browser-Erweiterung von Grund auf bauen. Sie kann den Inhalt jeder Webseite lesen, die Sie gerade besuchen, und dann mit KI eine Ein-Klick-Zusammenfassung generieren. Sie werden die Extension-Entwicklung und das Debugging selbst abschließen und lernen, wie Sie sie im Chrome Web Store veröffentlichen.

Für dieses Tutorial sollten Sie mindestens Folgendes haben:

- Chrome-Browser (Version 138+ empfohlen, wenn Sie die eingebaute KI nutzen möchten)
- Einen Code-Editor (VS Code / Cursor / Trae)
- (Optional) Einen OpenAI- oder Claude-API-Schlüssel

## 1.1 Was ist eine Browser-Erweiterung?

Sie haben definitiv schon Browser-Erweiterungen genutzt: Werbeblocker, Übersetzungstools, Passwortmanager... Sie sind wie "zusätzliches Werkzeug" für Ihren Browser und verleihen Ihnen Superkräfte beim Surfen.

Stellen Sie sich Folgendes vor: Sie öffnen einen 5.000 Wörter langen technischen Blog-Beitrag, klicken einmal auf die Extension-Schaltfläche, und wenige Sekunden später erscheint eine prägnante deutsche Zusammenfassung im Seitenpanel. Genau das werden wir bauen.

![Platzhalter: Ein Vorschaubild, das eine lange Artikel-Webseite links und eine KI-generierte Zusammenfassung im Chrome-Seitenpanel rechts zeigt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp)

<!-- ![Platzhalter: Ein Vorschaubild, das eine lange Artikel-Webseite links und eine KI-generierte Zusammenfassung im Chrome-Seitenpanel rechts zeigt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp) -->

## 1.2 Die Grundarchitektur einer Chrome-Extension

Chrome-Erweiterungen (basierend auf Manifest V3) bestehen aus mehreren Kernkomponenten, jede mit ihrer eigenen Rolle:

* **Manifest-Datei (`manifest.json`)**: der "Ausweis" der Extension, der Name, Berechtigungen, Einstiegsdateien und mehr deklariert.
* **Service Worker (Hintergrundskript)**: das "Gehirn" der Extension, das Ereignisse verarbeitet und APIs im Hintergrund aufruft. Es läuft nicht kontinuierlich, sondern startet bei Bedarf.
* **Content Script**: die "Augen" der Extension, in Webseiten injiziert und in der Lage, DOM-Inhalte zu lesen.
* **Side Panel**: das "Gesicht" der Extension, das UI auf der rechten Seite des Browsers anzeigt, wo Nutzer KI-Zusammenfassungsergebnisse sehen.
* **Options-Seite**: ermöglicht Nutzern die Konfiguration von API-Schlüssel und verwandten Einstellungen.

Ihr Arbeitsablauf sieht so aus:

```text
Nutzer klickt auf das Extension-Symbol
    -> Seitenpanel öffnet sich
    -> Nutzer klickt auf die "Zusammenfassen"-Schaltfläche
    -> Seitenpanel benachrichtigt den Service Worker
    -> Service Worker bittet das Content Script, den Seitentext zu lesen
    -> Content Script gibt Seiteninhalt zurück
    -> Service Worker sendet Inhalt an KI-API
    -> KI gibt Zusammenfassung zurück
    -> Service Worker sendet Zusammenfassung zurück an Seitenpanel zur Anzeige
```

![Platzhalter: Ein Architektur-Ablaufdiagramm, das zeigt, wie Content Script, Service Worker und Side Panel Nachrichten aneinander weitergeben](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp)
<!-- ![Platzhalter: Ein Architektur-Ablaufdiagramm, das zeigt, wie Content Script, Service Worker und Side Panel Nachrichten aneinander weitergeben](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp) -->

## 1.3 Zwei KI-Optionen: Cloud-API vs. eingebaute Browser-KI

Unsere Extension hat zwei Möglichkeiten, auf KI-Fähigkeiten zuzugreifen:

**Option A: Cloud-KI-APIs aufrufen (OpenAI / Claude)**

* Vorteile: leistungsstarkes Modell, unterstützt alle Geräte
* Nachteile: benötigt API-Schlüssel, erfordert Internet, hat Nutzungskosten
* Am besten für: hochwertige Zusammenfassungen und komplexere Inhalte

**Option B: Chromes eingebaute KI (Summarizer API)**

Ab Chrome 138 hat Google KI-Fähigkeiten basierend auf Gemini Nano direkt in den Browser eingebaut. Eine davon ist die **Summarizer API** - sie läuft vollständig lokal, benötigt keinen API-Schlüssel, kein Internet und ist komplett kostenlos.

* Vorteile: kostenlos, datenschutzfreundlich, kein API-Schlüssel benötigt
* Nachteile: erfordert Chrome 138+, bessere Hardware (4GB+ VRAM oder 16GB+ RAM), Modellfähigkeiten schwächer als Cloud-KI
* Am besten für: Nutzer, die Datenschutz schätzen, nicht bezahlen möchten und ausreichende Hardware haben

**Dieses Tutorial wird beide Optionen implementieren**, und Sie können je nach Ihrer Situation wählen.

## 1.4 Tutorial-Übersicht

Wir werden eine Chrome-Extension namens **"AI Page Summarizer"** von Grund auf bauen, in folgenden Schritten:

1. **Extension-Gerüst bauen**: Manifest V3-Projektstruktur erstellen und in Chrome laden
2. **Kernfunktion implementieren**: Content Script liest Seite + Service Worker ruft KI-API auf + Seitenpanel zeigt Ergebnisse
3. **Chromes eingebaute KI integrieren**: Summarizer API für kostenlose lokale Zusammenfassung nutzen
4. **Testen und Debuggen**: Chrome-Extension-Debugging-Techniken lernen
5. **Im Chrome Web Store veröffentlichen**: Verpacken und zur Überprüfung einreichen

# Kapitel 2: Das Extension-Gerüst bauen

## 2.1 Projektstruktur erstellen

Öffnen Sie Ihren KI-Coding-Assistenten (Cursor / Trae / Claude Code), erstellen Sie einen leeren Ordner namens `ai-page-summarizer` und geben Sie Folgendes in das Chat-Feld ein:

```text
Bitte helfen Sie mir, ein Chrome-Browser-Extension-Projekt mit Manifest V3 zu erstellen.
Der Projektname ist ai-page-summarizer und seine Funktion ist es, Webseiteninhalte mit KI zusammenzufassen.
Bitte erstellen Sie die folgende Dateistruktur:

ai-page-summarizer/
├── manifest.json          # MV3 Manifest-Datei
├── background.js          # Service Worker Hintergrundskript
├── content.js             # Content Script (liest Webseiten-Text)
├── sidepanel.html         # Seitenpanel HTML
├── sidepanel.js           # Seitenpanel-Logik
├── sidepanel.css          # Seitenpanel-Styling
├── options.html           # Einstellungsseite
├── options.js             # Einstellungsseiten-Logik
└── icons/                 # Icons-Ordner

Anforderungen für manifest.json:
1. manifest_version: 3
2. Berechtigungen: storage, activeTab, scripting, sidePanel
3. service_worker: "background.js" für Hintergrund verwenden
4. side_panel mit Standardpfad sidepanel.html konfigurieren
5. Standard-Icon und Titel für action konfigurieren
```

KI wird das vollständige Projektgerüst für Sie generieren. Schauen wir uns an, was jede Datei macht.

## 2.2 `manifest.json`: Der "Ausweis" der Extension

Dies ist die wichtigste Datei in einer Chrome-Extension. Sie teilt dem Browser mit, was die Extension ist, welche Berechtigungen sie benötigt und welche Komponenten sie enthält:

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "KI nutzen, um jede Webseite mit einem Klick zusammenzufassen",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Page Summarizer",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

**Berechtigungserklärung:**

* `storage`: ermöglicht der Extension, Daten wie den API-Schlüssel des Nutzers zu speichern
* `activeTab`: ermöglicht der Extension, auf den aktuellen Tab zuzugreifen, den der Nutzer betrachtet (nur nach Nutzerinteraktion, also sehr sicher)
* `scripting`: ermöglicht der Extension, Skripte in Seiten zu injizieren, um Inhalte zu lesen
* `sidePanel`: ermöglicht der Extension, die Chrome-Seitenpanel-API zu nutzen

![Platzhalter: Screenshot von manifest.json im Editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![Platzhalter: Screenshot von manifest.json im Editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 Icons vorbereiten

Chrome-Erweiterungen benötigen Icons in drei Größen: 16x16, 48x48 und 128x128. Sie können KI bitten, sie zu generieren:

```text
Bitte helfen Sie mir, drei einfache Chrome-Extension-Icons zu generieren (16x16, 48x48, 128x128),
mit einem abgerundeten Rechteck, lila Farbverlauf-Hintergrund und einem weißen KI-Blitz-Symbol in der Mitte.
Speichern Sie sie im icons/-Verzeichnis als icon-16.png, icon-48.png und icon-128.png.
```

## 2.4 Extension in Chrome laden

Bevor wir Code schreiben, laden wir diese "leere Hülle"-Extension zuerst in Chrome, damit jede spätere Änderung sofort vorgeschaut werden kann:

1. Öffnen Sie Chrome und geben Sie `chrome://extensions/` in die Adressleiste ein
2. Schalten Sie **Entwicklermodus** oben rechts ein
3. Klicken Sie auf **Entpackte Extension laden**
4. Wählen Sie Ihren `ai-page-summarizer`-Ordner aus

Sie sehen die Extension in der Liste erscheinen und ihr Symbol in der Chrome-Symbolleiste.

![Platzhalter: Screenshot der Chrome-Erweiterungsseite, der zeigt, wie man den Entwicklermodus aktiviert und eine Erweiterung lädt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![Platzhalter: Screenshot der Chrome-Erweiterungsseite, der zeigt, wie man den Entwicklermodus aktiviert und eine Erweiterung lädt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **Tipp**: Nach jeder Code-Änderung zurück zu `chrome://extensions/` gehen und auf die **Aktualisierungsschaltfläche** auf der Extension-Karte klicken, um sie zu aktualisieren.

# Kapitel 3: Kernfunktion implementieren - Seite lesen + KI-Zusammenfassung

## 3.1 Content Script: Seitentext lesen

Content Script ist ein Skript, das in die Webseite injiziert wird. Es kann direkt auf das Seiten-DOM zugreifen. Wir verwenden es, um den Seitentext zu extrahieren.

Bitten Sie KI, `content.js` zu schreiben:

```text
Bitte helfen Sie mir, content.js mit folgenden Funktionen zu schreiben:
1. Auf Nachrichten vom Service Worker lauschen
2. Beim Empfang einer "getPageContent"-Nachricht den aktuellen Seitentext extrahieren
3. Extraktionslogik: document.body.innerText abrufen, sowie Seitentitel und URL
4. Den extrahierten Inhalt über sendResponse zurückgeben
```

KI wird Code wie diesen generieren:

```javascript
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const content = document.body.innerText || document.body.textContent
    sendResponse({
      content: content.trim(),
      title: document.title,
      url: window.location.href
    })
  }
  return true // Nachrichtenkanal offen halten
})
```

## 3.2 Service Worker: KI-API aufrufen

Der Service Worker ist das "Gehirn" der Extension. Er koordiniert die Kommunikation zwischen Komponenten und ruft externe KI-APIs auf.

Bitten Sie KI, `background.js` zu schreiben:

```text
Bitte helfen Sie mir, background.js mit folgenden Funktionen zu schreiben:
1. Wenn der Nutzer auf das Extension-Symbol klickt, das Seitenpanel öffnen
2. Auf "summarize"-Nachrichten vom Seitenpanel lauschen
3. Nach Erhalt der Nachricht "getPageContent" an das Content Script im aktuellen Tab senden, um Seiteninhalt zu erhalten
4. Nach Erhalt des Seiteninhalts den konfigurierten API-Schlüssel und die Modellauswahl des Nutzers aus chrome.storage.local lesen
5. Die entsprechende KI-API gemäß der Konfiguration aufrufen (OpenAI und Claude unterstützen)
6. Die KI-Zusammenfassung an das Seitenpanel zurücksenden

Für OpenAI: https://api.openai.com/v1/chat/completions aufrufen und Modell gpt-4o-mini verwenden
Für Claude: https://api.anthropic.com/v1/messages aufrufen und Modell claude-sonnet-4-20250514 verwenden
System-Prompt: Bitte fassen Sie den folgenden Webseiteninhalt auf Deutsch zusammen, extrahieren Sie die Kernaussagen und halten Sie es innerhalb von 300 Wörtern.
```

Kern-Code sieht so aus:

```javascript
// background.js

// Seitenpanel öffnen, wenn Nutzer auf das Symbol klickt
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Auf Nachrichten vom Seitenpanel lauschen
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // Asynchrone Antwort
  }
})

async function handleSummarize(tabId) {
  // 1. Seiteninhalt abrufen
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. Nutzereinstellungen lesen
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Bitte konfigurieren Sie zuerst Ihren API-Schlüssel auf der Einstellungsseite' }
  }

  // 3. KI-API aufrufen
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![Platzhalter: Screenshot von background.js-Code im Editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 Seitenpanel-UI: Zusammenfassungsergebnis anzeigen

Das Seitenpanel ist die Haupt-Interaktions-UI für Nutzer. Bitten Sie KI, HTML, CSS und JS für das Seitenpanel zu schreiben:

```text
Bitte helfen Sie mir, diese drei Dateien für das Seitenpanel zu schreiben:

sidepanel.html:
- Oben den Plugin-Namen "AI Page Summarizer" anzeigen
- Eine blaue "Aktuelle Seite zusammenfassen"-Schaltfläche
- Einen Ladeanimationsbereich (standardmäßig ausgeblendet)
- Einen Ergebnisanzeigebereich, der Seitentitel und KI-Zusammenfassung zeigt
- Eine "Zusammenfassung kopieren"-Schaltfläche am unteren Rand

sidepanel.css:
- Sauberes modernes Design, ähnlich der Notion-Typografie
- Breite passt sich dem Seitenpanel an
- Schaltflächen mit Hover-Effekten
- Ladeanimation mit CSS implementiert

sidepanel.js:
- Beim Klicken auf die "Zusammenfassen"-Schaltfläche die aktuelle Tab-ID abrufen
- Zusammenfassungs-Nachricht an background.js senden
- Ladeanimation anzeigen
- Laden ausblenden und Zusammenfassung nach Erhalt des Ergebnisses anzeigen
- navigator.clipboard.writeText in der "Kopieren"-Schaltfläche verwenden, um Text zu kopieren
```

![Platzhalter: Screenshot der Seitenpanel-UI mit drei Zuständen: Zusammenfassungs-Schaltfläche, Ladezustand und Zusammenfassungsergebnis](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![Platzhalter: Screenshot der Seitenpanel-UI mit drei Zuständen: Zusammenfassungs-Schaltfläche, Ladezustand und Zusammenfassungsergebnis](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 Einstellungsseite: API-Schlüssel konfigurieren

Nutzer benötigen einen Ort, um ihren eigenen API-Schlüssel einzugeben. Bitten Sie KI, die Einstellungsseite zu schreiben:

```text
Bitte helfen Sie mir, options.html und options.js zu schreiben:
- Ein Dropdown zur Auswahl des KI-Anbieters (OpenAI / Claude)
- Ein Passwort-Eingabefeld für den API-Schlüssel (type="password")
- Eine "Speichern"-Schaltfläche
- Konfiguration mit chrome.storage.local.set speichern
- Gespeicherte Konfiguration aus Storage lesen und das Formular beim Laden der Seite ausfüllen
- "Einstellungen gespeichert" nach dem Speichern anzeigen
```

> **Sicherheitshinweis**: Der API-Schlüssel wird in `chrome.storage.local` gespeichert und nur auf dem lokalen Gerät aufbewahrt. Wenn Sie diese Extension jedoch im Chrome Web Store für andere veröffentlichen möchten, ist ein sichererer Ansatz, einen Backend-Proxy-Server zu bauen, damit der API-Schlüssel nicht direkt auf der Client-Seite offengelegt wird.

![Platzhalter: Screenshot der Einstellungsseite mit Anbieterauswahl und API-Key-Eingabe p1](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![Platzhalter: Screenshot der Einstellungsseite mit Anbieterauswahl und API-Key-Eingabe p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![Platzhalter: Screenshot der Einstellungsseite mit Anbieterauswahl und API-Key-Eingabe p3](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![Platzhalter: Screenshot der Einstellungsseite mit Anbieterauswahl und API-Key-Eingabe](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# Kapitel 4: Chromes eingebaute KI nutzen (kein API-Schlüssel benötigt)

Ab Chrome 138 hat Google KI-Fähigkeiten basierend auf **Gemini Nano** direkt in den Browser eingebaut. Die für unseren Fall am besten geeignete ist die **Summarizer API** - sie läuft vollständig lokal, benötigt keinen API-Schlüssel, kein Internet und ist kostenlos.

## 4.1 Browser-Unterstützung prüfen

Die eingebaute KI hat Hardware-Anforderungen:

* Desktop Chrome 138+ (Windows 10+, macOS 13+, Linux, ChromeOS)
* 22 GB verfügbarer Speicherplatz (für Modell-Download)
* 4GB+ GPU VRAM oder 16GB+ System-RAM mit 4+ CPU-Kernen

Geben Sie `chrome://flags` in der Chrome-Adressleiste ein, suchen Sie nach dem Flag für Summarization und stellen Sie sicher, dass es **Enabled** ist.
* In Chrome 131-137 heißt dieser Schalter Summarization API.
* In Chrome 138-144 wurde er in Summarization API for Gemini Nano umbenannt.
* In Chrome 145+ wurde Summarization API for Gemini Nano entfernt und seine Zusammenfassungsfunktion in Prompt API for Gemini Nano integriert.

![Platzhalter: Screenshot von chrome://flags mit dem Summarization API-Schalter](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![Platzhalter: Screenshot von chrome://flags mit dem Summarization API-Schalter](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 Summarizer API verwenden

Bitten Sie KI, eingebaute KI-Unterstützung in `background.js` hinzuzufügen:

```text
Bitte helfen Sie mir, die Chrome eingebaute Summarizer API-Unterstützung in background.js hinzuzufügen:
1. Eine summarizeWithBuiltinAI-Funktion hinzufügen
2. Zuerst prüfen, ob Summarizer.availability() 'readily-available' zurückgibt
3. Wenn verfügbar, eine Summarizer-Instanz erstellen, type als 'key-points', format als 'markdown' und length als 'medium' konfigurieren
4. summarizer.summarize() für die Zusammenfassung aufrufen
5. In handleSummarize einen Zweig für provider === 'builtin' hinzufügen
```

Kern-Code:

```javascript
async function summarizeWithBuiltinAI(text) {
  // Verfügbarkeit prüfen
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('Chrome eingebaute KI ist nicht verfügbar. Bitte überprüfen Sie die Browserversion und die Hardwareanforderungen.')
  }

  // Summarizer erstellen
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // Zusammenfassung ausführen
  const summary = await summarizer.summarize(text, {
    context: 'Dies ist ein Webseiten-Artikel'
  })

  return summary
}
```

## 4.3 Einstellungsseite aktualisieren

Fügen Sie eine Option **"Chrome eingebaute KI (kostenlos, kein API-Schlüssel benötigt)"** zum Anbieter-Dropdown in `options.html` hinzu. Wenn Nutzer sie wählen, wird die API-Schlüssel-Eingabe ausgeblendet, da sie nicht mehr benötigt wird.

```text
Bitte helfen Sie mir, options.html und options.js zu ändern:
1. Eine Option "Chrome eingebaute KI (kostenlos, kein API-Schlüssel benötigt)" zum Anbieter-Dropdown hinzufügen, mit Wert "builtin"
2. API-Schlüssel-Eingabe ausblenden, wenn builtin ausgewählt ist
3. API-Schlüssel-Eingabe anzeigen, wenn OpenAI oder Claude ausgewählt ist
```

![Platzhalter: Screenshot der aktualisierten Einstellungsseite mit drei KI-Anbieter-Optionen, API-Schlüssel-Eingabe ausgeblendet wenn Chrome eingebaute KI ausgewählt ist](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![Platzhalter: Screenshot der aktualisierten Einstellungsseite mit drei KI-Anbieter-Optionen, API-Schlüssel-Eingabe ausgeblendet wenn Chrome eingebaute KI ausgewählt ist](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# Kapitel 5: Testen und Debuggen

## 5.1 Lokaler Test-Workflow

Das Debuggen von Chrome-Erweiterungen unterscheidet sich etwas vom Debuggen normaler Webseiten:

**Service Worker debuggen:**
1. `chrome://extensions/` öffnen
2. Ihre Extension finden und auf den **Service Worker**-Link klicken
3. Ein spezielles DevTools-Fenster öffnet sich, in dem Sie `console.log`-Ausgaben und Netzwerkanfragen sehen können

**Seitenpanel debuggen:**
1. Seitenpanel öffnen
2. Rechtsklick innerhalb des Seitenpanel-Inhalts
3. **Untersuchen** wählen
4. Dies öffnet DevTools für das Seitenpanel

**Content Script debuggen:**
1. DevTools mit F12 auf einer beliebigen Webseite öffnen
2. Im Console-Panel auf das Ausführungskontext-Dropdown oben links klicken
3. Ihren Extension-Namen auswählen
4. Dann können Sie `console`-Ausgaben vom Content Script sehen

![Platzhalter: Screenshot von Chrome DevTools, der zeigt, wie man verschiedene Ausführungskontexte wählt, um verschiedene Extension-Komponenten zu debuggen](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp)
<!-- ![Platzhalter: Screenshot von Chrome DevTools, der zeigt, wie man verschiedene Ausführungskontexte wählt, um verschiedene Extension-Komponenten zu debuggen](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp) -->

## 5.2 Häufige Fehlerbehebung

| Problem | Mögliche Ursache | Lösung |
|------|---------|---------|
| Klick auf das Symbol bewirkt nichts | Service Worker-Fehler | Service Worker DevTools Console prüfen |
| Seiteninhalt kann nicht abgerufen werden | Content Script nicht injiziert | Seite aktualisieren und erneut versuchen, `matches`-Konfiguration im Manifest prüfen |
| API-Aufruf schlägt fehl | API-Schlüssel falsch oder abgelaufen | API-Schlüssel auf der Einstellungsseite neu eingeben |
| Seitenpanel ist leer | `sidepanel.html`-Pfad falsch | `side_panel.default_path` im Manifest prüfen |


# Kapitel 6: Im Chrome Web Store veröffentlichen (optional)

Wenn Sie die Extension mit anderen teilen möchten, können Sie sie im Chrome Web Store veröffentlichen.

## 6.1 Veröffentlichung vorbereiten

1. **Entwicklerkonto registrieren**: [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) besuchen und die einmalige $5 Registrierungsgebühr zahlen
2. **2-Schritt-Verifizierung aktivieren**: Ihr Google-Konto muss die 2-Schritt-Verifizierung vor der Veröffentlichung aktivieren
3. **Assets vorbereiten**:
   * Extension-Icon: 128x128 PNG
   * Mindestens ein Screenshot: 1280x800 empfohlen
   * Detaillierte Funktionsbeschreibung
   * Datenschutzerklärung (wenn Ihre Extension Nutzerdaten verarbeitet)

## 6.2 Verpacken und hochladen

1. Den Extension-Ordner als `.zip`-Datei komprimieren (nicht `.crx`)
2. Im Developer Dashboard auf **New Item** klicken
3. Die `.zip`-Datei hochladen
4. Store-Informationen ausfüllen (Name, Beschreibung, Screenshots, Kategorie usw.)
5. Datenschutzpraktiken ausfüllen (deklarieren, welche Nutzerdaten Ihre Extension erfasst)
6. Auf **Submit for Review** klicken

Google überprüft eingereichte Erweiterungen, was normalerweise mehrere Werktage dauert. Je weniger Berechtigungen Sie anfordern und je klarer Ihre Beschreibung ist, desto schneller verläuft die Überprüfung.

![Platzhalter: Screenshot des Chrome Web Store Developer Dashboard mit Extension-Upload und Metadaten-Formular](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![Platzhalter: Screenshot des Chrome Web Store Developer Dashboard mit Extension-Upload und Metadaten-Formular p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![Platzhalter: Screenshot des Chrome Web Store Developer Dashboard mit Extension-Upload und Metadaten-Formular](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# Kapitel 7: Abschließende Bemerkungen

Herzlichen Glückwunsch! Sie haben eine KI-gesteuerte Browser-Erweiterung von Grund auf gebaut. Lassen Sie uns rekapitulieren, was wir getan haben:

1. Die Manifest V3-Architektur von Chrome-Erweiterungen verstanden
2. Content Script verwendet, um Webseiteninhalte zu lesen
3. Service Worker verwendet, um KI-APIs aufzurufen und Zusammenfassungen zu generieren
4. Seitenpanel verwendet, um das Zusammenfassungsergebnis anzuzeigen
5. Gelernt, wie man Chromes eingebaute KI ohne API-Schlüssel nutzt

Die Entwicklung von Browser-Erweiterungen ist ein sehr interessantes Gebiet - sie ermöglicht es Ihnen, jede Webseite im Internet zu "verstärken". Neben der Zusammenfassung von Seiten können Sie mit einer ähnlichen Architektur noch vieles mehr bauen:

**Fortgeschrittene Richtungen:**

* **Übersetzungsassistent**: Fremdsprachige Webseiten mit einem Klick ins Deutsche übersetzen
* **Lese-Annotationen**: Seiten markieren und annotieren, dann in der Cloud speichern
* **Preisüberwachung**: Preisänderungen auf E-Commerce-Seiten überwachen und Nutzer benachrichtigen
* **Code-Erklärer**: Code auf GitHub auswählen und von KI automatisch erklären lassen

Die Ankunft von Chromes eingebauter KI senkt die Hürde noch weiter - Sie benötigen nicht einmal einen API-Schlüssel, um KI-gestützte Erweiterungen zu bauen. Da die Browser-KI-Fähigkeiten weiter wachsen, wird der Imaginationsraum in diesem Bereich nur noch größer.

***Geben Sie Ihrem Browser einige Superkräfte!***

# Referenzen

* [Chrome Extension Offizielle Dokumentation - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [Chrome Extension im Chrome Web Store veröffentlichen](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [Chrome Side Panel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [Chrome eingebaute KI - Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
* [Chrome eingebaute KI - Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
* [OpenAI API Dokumentation](https://platform.openai.com/docs/api-reference)
* [Anthropic Claude API Dokumentation](https://docs.anthropic.com/en/docs/)
* [Anthropic Claude API Dokumentation](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
