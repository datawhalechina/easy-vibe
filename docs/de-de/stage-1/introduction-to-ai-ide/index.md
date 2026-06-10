---
title: 'AI-Programmierwerkzeuge lernen'
description: 'Lernen Sie den Unterschied zwischen IDE und AI IDE kennen, richten Sie eine lokale Entwicklungsumgebung ein und erstellen Sie mit Trae ein erstes Snake-Spiel. Dieses Kapitel zeigt den kompletten Ablauf von Installation, Projektstart, Ausfuehrung, Fehlerbehebung und Kommunikation mit AI.'
---

# Anfaenger II: AI-Programmierwerkzeuge lernen

## Kapiteluebersicht

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'ca. <strong>1 Tag</strong>, in mehreren Sitzungen moeglich'
const relatedArticles =
  relatedArticlesMap['de-de/stage-1/introduction-to-ai-ide'] ?? []
</script>

<ChapterIntroduction :duration="duration" :tags="['Lokale Entwicklungsumgebung', 'IDE und AI IDE', 'Trae', 'Agent-Entwicklung']" coreOutput="1 selbst erstelltes Spiel" expectedOutput="Ein lokal laufendes Snake-Spiel">

Im vorherigen Kapitel haben wir AI-Programmierung im Browser ausprobiert. Eine Web-Plattform ist bequem, aber sie hat Grenzen: Dateien lassen sich schwer langfristig verwalten, lokale Abhaengigkeiten sind eingeschraenkt, und komplexere Projekte werden schnell unuebersichtlich. In diesem Kapitel holen wir die Entwicklungsumgebung auf den eigenen Rechner.

Sie lernen, was eine IDE ist, wodurch sich eine AI IDE unterscheidet, wie Trae als lokales Werkzeug funktioniert und wie man AI nicht nur zum Chatten, sondern zum Erstellen, Aendern, Ausfuehren und Reparieren von Projekten nutzt. Am Ende haben Sie einen Arbeitsablauf, der dem Alltag echter Entwickler schon deutlich naeher kommt.

::: tip Fortgeschrittenen-Hinweis
Wenn Sie bereits programmieren koennen und lieber in der Kommandozeile arbeiten, lesen Sie spaeter auch [Moderne CLI Coding Werkzeuge](../../stage-2/backend/modern-cli/).
:::

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Umgebung verstehen', description: 'IDE und AI IDE einordnen' },
      { title: 'Lokal ueben', description: 'Snake-Spiel mit Trae' },
      { title: 'Werkzeug kennen', description: 'IDE-Oberflaeche verstehen' },
      { title: 'Besser fragen', description: 'Mit AI klar kommunizieren' }
    ]" />
  </ClientOnly>
</div>

## 1. Welche Umgebung man zum Programmieren braucht

### 1.1 Denkwechsel: Bei Problemen zuerst AI fragen

Beim klassischen Programmierlernen sucht man oft erst im Web: Wie installiere ich Python? Wie konfiguriere ich Conda? Warum haengt `npm install`? Danach arbeitet man Tutorials Schritt fuer Schritt ab und sucht bei jeder Fehlermeldung erneut.

Mit einer AI IDE sollten Sie diese Gewohnheit aendern. Wenn Sie nicht wissen, was zu tun ist, fragen Sie zuerst die AI im Seitenpanel. Sie kann Befehle erklaeren, passende Schritte vorschlagen oder sogar direkt fuer Sie ausfuehren.

- **Umgebung unklar?** Fragen Sie: "Ich moechte Python schreiben. Bitte pruefe, ob Python installiert ist, und hilf mir bei der Installation, falls es fehlt."
- **Abhaengigkeiten laden nicht?** Schreiben Sie: "Der Download schlaegt fehl. Ist das ein Netzwerkproblem? Bitte hilf mir, eine passende Spiegelquelle zu verwenden."
- **Befehl vergessen?** Fragen Sie: "Bitte erstelle eine neue virtuelle Umgebung mit dem Namen `demo`."

Der wichtige Punkt ist: Sie muessen nicht alle Befehle auswendig kennen. Sie muessen lernen, das Ziel klar zu beschreiben und die AI Schritt fuer Schritt pruefen zu lassen.

### 1.2 Warum Werkzeuge noetig sind

Ein paar Codezeilen kann man theoretisch in einem einfachen Texteditor schreiben. Fuer ein wartbares Projekt reicht das aber nicht:

- **Ohne Syntaxhervorhebung** sehen Schluesselwoerter, Strings und Kommentare gleich aus.
- **Ohne Vervollstaendigung** muss jeder Name exakt selbst getippt werden.
- **Ohne Projektansicht** verliert man bei mehreren Dateien schnell den Ueberblick.
- **Ohne Debugging** bleibt bei Fehlern oft nur Raten und Log-Ausgabe.

Eine IDE, also eine integrierte Entwicklungsumgebung, loest diese Probleme. Sie organisiert Dateien, hebt Code farbig hervor, bietet Autovervollstaendigung, startet Programme und hilft beim Debugging.

## 2. Was ist eine IDE?

::: info Vorbereitung
Wenn Ihnen IDEs noch neu sind, lesen Sie spaeter auch [IDE Grundlagen](/de-de/appendix/2-development-tools/ide-basics). Dort werden typische Bereiche wie Editor, Terminal, Seitenleiste und Debugger noch einmal in Ruhe erklaert.
:::

Fruehe Entwickler arbeiteten mit einfachen Editoren und Kommandozeilentools. Als Projekte groesser wurden, brauchte man Werkzeuge, die Dateien, Ausfuehrung und Debugging in einer Oberflaeche vereinen. Daraus entstand die IDE.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image1.png)![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image2.png)

Bildquelle der Terminal-Oberflaeche: https://en.wikipedia.org/wiki/File:Emacs-screenshot.png

Auch heute werden Werkzeuge wie `Vim` oft auf Servern verwendet.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image3.png)

Moderne IDEs sind fuer Einsteiger komfortabler. Sie enthalten normalerweise:

- **Quellcode-Editor**: Syntaxhervorhebung und Autovervollstaendigung.
- **Build- und Startwerkzeuge**: Programme koennen direkt ausgefuehrt werden.
- **Debugger**: Breakpoints, Variablenansicht und schrittweises Ausfuehren.
- **Projektverwaltung**: Dateien und Ordner bleiben im Zusammenhang sichtbar.

Die bekannteste leichte IDE ist **[Visual Studio Code](https://code.visualstudio.com/)**. Sie ist erweiterbar und fuer viele Sprachen geeignet.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image4.png)

VS Code folgt dem Prinzip "Alles ist eine Erweiterung". Mit Python-Erweiterung wird es zur Python-IDE, mit C++-Erweiterung zur C++-IDE. Ohne Erweiterungen ist es eher ein guter Texteditor.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image5.png)

Es eignet sich auch sehr gut zum Schreiben von Markdown-Dokumenten.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image6.png)

Kurz gesagt: Eine IDE ist ein Werkzeugset, das Schreiben, Verwalten, Ausfuehren und Reparieren von Code effizienter macht.

## 3. Was unterscheidet eine AI IDE von einer gewoehnlichen IDE?

Eine normale IDE ist ein Werkzeugkasten. Sie koennen Dateien oeffnen, Code schreiben, Programme starten und Erweiterungen installieren. Aber Sie muessen selbst wissen, welche Datei wichtig ist, welcher Befehl ausgefuehrt werden muss und wie eine Fehlermeldung zu lesen ist.

Eine AI IDE fuegt ein grosses Sprachmodell und haeufig einen Agenten hinzu. Dadurch koennen Sie Aufgaben in natuerlicher Sprache formulieren:

- "Erstelle eine Login-Seite."
- "Hier ist die Fehlermeldung. Bitte erklaere die Ursache und schlage eine Reparatur vor."
- "Fasse die Projektstruktur zusammen und erklaere mir, welche Dateien wichtig sind."
- "Fuege eine Bestenliste zum Spiel hinzu und starte danach die App."

Eine gute AI IDE kann Dateien lesen, neue Dateien erzeugen, Code ueber mehrere Dateien hinweg aendern, Befehle im Terminal ausfuehren und nach Ihrer Bestaetigung Tests oder Entwicklungsserver starten.

VS Code selbst enthaelt inzwischen ebenfalls AI-Funktionen. Trotzdem sind spezialisierte AI IDEs in vielen Aufgaben staerker, weil sie Agentenablaeufe, Kontextverwaltung, Dateiaenderungen und Modellintegration gezielter ausbauen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image7.png)

Viele AI IDEs basieren auf VS Code. Wenn Sie die Grundbedienung von VS Code verstehen, koennen Sie deshalb relativ leicht zwischen Trae, Cursor, Kiro, Qoder oder aehnlichen Werkzeugen wechseln.

Typische AI-IDE-Faehigkeiten sind:

- **Codegenerierung und Vervollstaendigung**: Aus wenigen Saetzen oder Pseudocode entsteht lauffaehige Logik.
- **Codeverstaendnis und Q&A**: Die IDE beantwortet Fragen zu Dateien, Funktionen und Projektstruktur.
- **Refactoring und Optimierung**: Bestehender Code wird nach Ihrer Absicht umgeschrieben.
- **Testgenerierung**: Fuer Funktionen und Module koennen Testfaelle erzeugt werden.
- **Agentische Ausfuehrung**: Ein Agent kann Dateien erstellen, Abhaengigkeiten installieren, Programme starten und Fehler iterativ reparieren.

### Aktuelle AI IDEs im Ueberblick

::: details Antigravity

### [Antigravity](https://antigravity.google/)

Antigravity ist eine von Google vorgestellte AI IDE mit Agent-First-Ansatz. Der Agent kann Editor, Terminal und Browser bedienen, Aufgaben planen, Code ausfuehren, Tests starten und Ergebnisse zusammenfassen. Sie eignet sich besonders, wenn man mit Gemini- und anderen modernen Modellen arbeiten moechte.
:::

::: details Trae

### [Trae](https://www.trae.ai/)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image8.png)

Trae ist ein AI-Programmierassistent von ByteDance. Es unterstuetzt viele Programmiersprachen, kann Code aus natuerlicher Sprache erzeugen, beim Debugging helfen und Designentwuerfe in React- oder Vue-Komponenten umwandeln. Fuer dieses Kapitel nutzen wir Trae als Beispiel, weil es fuer Einsteiger einen relativ klaren Agentenablauf bietet.
:::

::: details Cursor

### [Cursor](https://cursor.com/)

Cursor ist ein AI-Codeeditor auf Basis von VS Code. Er ist besonders stark bei groesseren Codebasen, Multi-File-Aenderungen und Kontextarbeit. Cursor ist sehr beliebt, aber die Pro-Version kostet ungefaehr 20 US-Dollar pro Monat.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image9.png)
:::

::: details Qoder

### [Qoder](https://qoder.com/)

Qoder betont transparente Zusammenarbeit und Kontext-Engineering. Es kann Aufgaben in Schritte zerlegen, Ausfuehrung sichtbar machen und eignet sich fuer groessere Projekte, Architekturarbeit und Analyse alter Systeme.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image10.png)
:::

::: details CodeBuddy

### [CodeBuddy](https://copilot.tencent.com/)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image11.png)

CodeBuddy ist ein AI-Programmierwerkzeug von Tencent Cloud. Es unterstuetzt Codevervollstaendigung, Code-Review, mehrere Modelle und Enterprise-Anforderungen wie private Bereitstellung und Compliance.
:::

::: details Cline

### [Cline](https://cline.bot/)

Cline ist ein Agent-Plugin fuer VS Code. Es kann ueber verschiedene API-Endpunkte mit unterschiedlichen Modellen arbeiten, unterstuetzt MCP-Werkzeuge und verlangt fuer Aktionen normalerweise eine Nutzerbestaetigung. Es ist gut geeignet, um Ideen schnell in bestehenden VS-Code-Workflows zu testen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image12.png)
:::

::: details Kiro

### [Kiro](https://kiro.dev/)

Kiro ist eine AI-IDE von AWS und integriert sich eng mit Amazon Bedrock sowie AWS-Diensten wie Lambda, S3 oder DynamoDB. Sie eignet sich besonders fuer Cloud-native Entwicklung im AWS-Umfeld.
:::

::: tip Modellhinweis
Wenn Sie Anthropic-Claude-Modelle stabil nutzen wollen, sind Cursor, Kiro oder Antigravity oft geeignete Optionen, weil sie offizielle oder tiefere Integrationen anbieten.
:::

## 4. Mit Trae ein Snake-Spiel lokal erstellen

Bis hierhin ging es um Begriffe. Jetzt bringen wir das in die Praxis: Wir erstellen einen leeren Ordner, oeffnen ihn in einer AI IDE, schreiben im Seitenpanel eine klare Aufgabe und lassen Trae ein Snake-Spiel mit React erzeugen.

Wenn Sie vorher schon auf z.ai oder einer anderen Web-Plattform Code erstellt haben, koennen Sie diesen Code auch herunterladen und lokal in Trae weiterbearbeiten. So bleiben alte Ergebnisse erhalten, und Sie bekommen trotzdem die staerkere lokale Umgebung.

### 4.1 Trae installieren

Trae kann von der offiziellen Website installiert werden. Je nach Region gibt es unterschiedliche Versionen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image13.png)

- **CN-Version**: Fuer Einsteiger in China meist einfacher, oft kostenlos nutzbar und ohne Auslandsnetzwerk bequemer.
- **Internationale Version**: Bietet Zugang zu internationalen Modellen, setzt aber passende Netzwerkbedingungen und haeufig ein Abo voraus.
- **Drittanbieter-Modelle**: Wenn Sie API-Token fuer Modelle wie DeepSeek, Qwen, Kimi oder andere Anbieter besitzen, koennen Sie diese als Custom Model einbinden.

Die genaue Version ist weniger wichtig als der Arbeitsablauf: Projektordner oeffnen, Agent starten, Aufgabe klar beschreiben, Ergebnis pruefen.

### 4.2 Trae-Oberflaeche verstehen

Trae sieht VS Code sehr aehnlich: links Dateibaum, in der Mitte Editor, rechts AI-Panel.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image14.png)

Das rechte Panel ist das Copilot- oder Agentenfenster. Wenn es nicht sichtbar ist, oeffnen Sie es ueber das Symbol rechts oben.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image15.png)

Im Seitenpanel finden Sie normalerweise einen **Builder**-Modus. Er funktioniert aehnlich wie ein lokaler z.ai-Agent: Er kann Dateien anlegen, Abhaengigkeiten installieren, Befehle starten und lokale Webseiten oeffnen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image16.png)

Es gibt oft mehrere Modi:

- **Chat**: Gut fuer Fragen zum aktuellen Projekt oder fuer allgemeine Erklaerungen.
- **Builder**: Gut fuer Aufgaben, bei denen Dateien erstellt oder geaendert werden.
- **Builder with MCP**: Erweitert den Agenten um zusaetzliche Werkzeuge, etwa externe Dienste oder lokale Integrationen.

Im Modellmenue koennen Sie das verwendete Modell waehlen. Vermeiden Sie am Anfang nach Moeglichkeit den Auto-Modus, wenn Sie reproduzierbare Ergebnisse wollen. Testen Sie fuer internationale Versionen Modelle wie Gemini oder GPT; fuer chinesische Versionen koennen Kimi, GLM, Qwen oder MiniMax gute Alltagsoptionen sein. Entscheidend ist nicht ein Dogma, sondern ob das Modell Ihre Aufgabe verlaesslich loest.

### 4.3 Leeren Projektordner vorbereiten

Erstellen Sie lokal einen leeren Ordner, zum Beispiel:

```txt
snake-game-react
```

Oeffnen Sie diesen Ordner in Trae. Der Dateibaum sollte anfangs leer oder fast leer sein. Damit weiss der Agent klar, dass er ein neues Projekt von Grund auf anlegen soll.

::: details Optional: API oder Coding Plan einbinden

Einige Cloud-Anbieter bieten Coding Plans oder Modell-APIs an. Damit kann man Modelle haeufiger oder stabiler nutzen als ueber einzelne Token-Abrechnung.

Der typische Ablauf:

1. Website des Anbieters oeffnen.
2. Konto registrieren und anmelden.
3. Preis- oder Coding-Plan-Seite finden.
4. Passenden Plan kaufen oder eine API aktivieren.
5. API Key kopieren.
6. In Trae ueber **Add Model** oder **Custom Model** eintragen.

Fuer erste Uebungen reicht oft ein kostenloses oder sehr guenstiges Modell. Zahlen Sie am Anfang nur kleine Betraege ein, bis Sie wissen, wie lange Ihr Guthaben reicht.

:::

### 4.4 Snake-Spiel mit einem klaren Prompt erstellen

Oeffnen Sie das AI-Seitenpanel, zum Beispiel mit `Ctrl+L` oder ueber das Chat-Symbol. Geben Sie dann eine konkrete Aufgabe ein:

> Bitte implementiere mit React ein Snake-Spiel. Es soll Tastatursteuerung, Essen, Wachstum, Punkteanzeige, Game Over bei Wandkontakt oder Selbstkollision und einen Neustart-Button enthalten. Erstelle das Projekt, installiere fehlende Abhaengigkeiten und starte es lokal. Wenn eine Umgebung fehlt, erklaere zuerst kurz, was installiert werden muss, und hilf mir dann Schritt fuer Schritt.

Der Agent wird normalerweise Dateien anlegen, Abhaengigkeiten installieren und einen Entwicklungsserver starten. Dabei kann er anhalten, wenn er eine Bestaetigung braucht.

::: warning Wichtiger Hinweis
Manchmal pausiert ein Agent, weil ein Befehl eine Eingabe erwartet, etwa `y`, `Enter`, einen Projektnamen oder eine Auswahl. Wenn Sie unsicher sind, machen Sie einen Screenshot und fragen Sie die AI: "Was soll ich in diesem Schritt tun?"
:::

Typische Situationen:

- Wenn ein Button wie **Run** erscheint, muessen Sie die Ausfuehrung bestaetigen.
- Wenn ein Paketmanager `y` erwartet, reicht meist die Eingabe `y`.
- Wenn ein lokaler Entwicklungsserver gestartet wurde, bleibt der Prozess im Terminal aktiv. Das ist normal; oeffnen Sie die angezeigte URL im Browser.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image17.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image18.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image19.png)

Wenn das Ergebnis nicht passt, beschreiben Sie das sichtbare Problem:

- "Die Schlange bewegt sich nach Start nicht."
- "Beim Wandkontakt erscheint kein Game Over."
- "Der Punktestand wird nicht aktualisiert."
- "Hier ist die Fehlermeldung. Bitte erklaere und behebe sie."

Nach kurzer Zeit sollten Sie ein lauffaehiges Ergebnis sehen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image20.png)

### 4.5 Aenderungen pruefen und zurueckrollen

AI IDEs zeigen Aenderungen normalerweise vor oder nach dem Schreiben an. Sie koennen akzeptieren, ablehnen oder einzelne Dateien pruefen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image21.png)

Wenn der Agent eine schlechte Aenderung macht, nutzen Sie **Revert** oder die Versionshistorie der IDE. Das ist eine wichtige Gewohnheit: Lassen Sie AI schnell arbeiten, aber behalten Sie Kontrolle ueber die Aenderungen.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image22.png)

## 5. Den generierten Code verstehen und verbessern

Wenn das Spiel laeuft, ist die Arbeit nicht beendet. Jetzt koennen Sie dieselbe AI nutzen, um das Projekt zu verstehen.

Fragen Sie zum Beispiel:

> Bitte erklaere mir von oben nach unten, wie dieses Snake-Spiel funktioniert. Verwende moeglichst wenig Fachwoerter.

Danach koennen Sie gezielt nachhaken:

> Wie wird der Koerper der Schlange im Code gespeichert? Kannst du eine Alltagsanalogie verwenden?

> Wo im Code wird gesteuert, dass sich die Schlange in festen Zeitabstaenden bewegt?

> Welche Schritte passieren, wenn die Schlange Essen erreicht?

> Wo werden Wandkollision und Selbstkollision erkannt?

Wenn Sie eine Datei wie `SnakeGame.tsx` sehen und sie nicht verstehen, fragen Sie:

> Bitte teile `SnakeGame.tsx` in Funktionsbereiche auf und erklaere jeden Bereich in einfachen Worten.

So lernen Sie nicht alle Konzepte auf einmal, sondern erkennen zuerst die Hauptdaten: Schlange, Essen, Punktzahl und Spielzustand. Danach verstehen Sie, wann diese Daten geaendert werden: Bewegung, Essen, Game Over, Neustart.

### 5.1 Oberflaeche gezielt verbessern

Sagen Sie nicht nur: "Mach es schoener." Das ist zu ungenau. Beschreiben Sie konkrete Aenderungen:

> Bitte verbessere die Spieloberflaeche:
>
> - Zentriere den Spielbereich.
> - Nutze einen hellen Hintergrund.
> - Mache Schlange und Essen gut sichtbar.
> - Vergroessere die Punktzahl.
> - Verwende Blau als Hauptfarbe fuer Buttons.

Fuer Game Over:

> Wenn das Spiel vorbei ist, zeige in der Mitte "Game Over" und darunter einen Neustart-Button.

Wenn das Ergebnis noch nicht passt, gehen Sie in kleinen Schritten weiter:

> Die Punktzahl soll groesser und auffaelliger sein.

> Der Spielbereich soll kompakter wirken und mehr Abstand zum Rand haben.

> Der Neustart-Button soll blau, abgerundet und zentriert sein.

Wenn eine Aenderung Fehler erzeugt, kopieren Sie die Fehlermeldung ins Chatfenster und schreiben Sie: "Dieser Fehler ist nach der Oberflaechenanpassung aufgetreten. Bitte finde die Ursache im aktuellen Projekt und behebe sie."

### 5.2 Gute Referenzen nutzen

Einsteiger wissen oft noch nicht, was eine gute Architektur oder ein gutes UI ist. Dann hilft es, Referenzen zu verwenden. Wenn Sie auf z.ai bereits ein gutes Ergebnis hatten, kopieren Sie dessen README oder Projektbeschreibung in Trae und bitten Sie:

> Bitte vergleiche mein lokales Projekt mit dieser README-Beschreibung und passe Struktur, Funktionen und Oberflaeche so an, dass sie dem beschriebenen Ergebnis naeher kommen.

So erhalten Sie nicht nur "irgendein" Spiel, sondern naehern sich einem konsistenteren Ergebnis.

## 6. IDE-Oberflaeche im Detail

Nachdem der erste Ablauf funktioniert, lohnt sich ein Blick auf die IDE selbst. Die meisten AI IDEs folgen dem VS-Code-Layout.

Typische Bereiche:

- **Title Bar**: Dateiname, Fenstersteuerung und Hauptmenues.
- **Activity Bar**: Wechsel zwischen Dateien, Suche, Git, Erweiterungen und Debugging.
- **Side Bar**: Dateibaum oder Suchergebnisse.
- **Editor Groups**: Hauptbereich zum Lesen und Schreiben von Code.
- **Breadcrumbs**: Pfadnavigation innerhalb der Datei.
- **Minimap**: Kleine Codeuebersicht fuer schnelle Orientierung.
- **Panel**: Terminal, Ausgabe, Probleme und Debug-Informationen.
- **Status Bar**: Umgebung, Branch, Sprache und andere Statusinformationen.

Wenn Sie diese Bereiche erkennen, koennen Sie AI besser anleiten: "Oeffne die Datei im Editor", "Starte den Befehl im Terminal", "Pruefe die Fehlermeldung im Problems-Panel".

## 7. Wie man als Einsteiger besser mit AI spricht

AI ist stark, aber sie braucht klare Aufgaben. Der Unterschied zwischen guten und schlechten Ergebnissen liegt oft nicht an der Intelligenz des Modells, sondern daran, wie konkret Sie fragen.

### 7.1 Von vager Idee zu konkreter Beschreibung

Schlecht:

> Hilf mir, eine Website zu bauen.

Besser:

> Ich kann noch nicht programmieren. Ich moechte eine einseitige persoenliche Website erstellen, die ich Bewerbern oder Recruitern schicken kann. Die Seite soll oben meinen Namen und einen kurzen Satz haben, in der Mitte drei berufliche Stationen zeigen und unten E-Mail sowie Kontaktmoeglichkeit enthalten. Bitte gib mir eine vollstaendige `index.html`, die ich direkt im Browser oeffnen kann.

Ergaenzen Sie moeglichst:

1. Wofuer das Ergebnis genutzt wird.
2. Welche Inhalte enthalten sein muessen.
3. Welche Einschraenkungen gelten.
4. In welcher Form Sie das Ergebnis brauchen.

### 7.2 Erst lauffaehig, dann komplex

Einsteiger wollen oft sofort ein komplettes System: Login, Registrierung, Bestellung, Datenbank, Adminbereich. Das fuehrt schnell zu grossen Codebloecken, die man nicht versteht.

Besser:

1. Erst ein Minimalbeispiel.
2. Dann einen Bereich hinzufuegen.
3. Danach Oberflaeche verbessern.
4. Erst spaeter Datenhaltung, Login oder Deployment.

Beispiel:

> Bitte gib mir zuerst nur ein minimales Beispiel, das im Browser eine Zeile "Das ist meine Startseite" zeigt. Erklaere mir Dateiname, Speichern und Oeffnen Schritt fuer Schritt.

Danach:

> Fuege nun einen Bereich "Berufserfahrung" hinzu und sende mir wieder den vollstaendigen Code.

### 7.3 Screenshots und Fehlermeldungen nutzen

Wenn Sie ein Problem nicht beschreiben koennen, geben Sie AI das, was Sie sehen:

- Kopieren Sie rote Fehlermeldungen.
- Machen Sie Screenshots von falschem Layout.
- Beschreiben Sie knapp, was erwartet war.

Beispiel:

> Hier ist die vollstaendige Fehlermeldung. Ich verstehe das Englisch nicht. Bitte erklaere mir zuerst in einfachen Worten, was ungefaehr passiert ist, und sage mir danach, was ich am einfachsten aendern soll.

Wenn das Modell Bilder unterstuetzt:

> Das ist der aktuelle Screenshot und hier ist mein Code. Ich wollte drei Spalten, aber es erscheint nur eine Spalte. Bitte finde die Ursache und gib mir die korrigierte vollstaendige Datei.

::: tip Bildfaehigkeit pruefen
Nicht jedes Modell kann Screenshots verstehen. Reine LLMs verarbeiten nur Text. Multimodale Modelle koennen Bilder lesen. Wenn Ihr Modell keine Bilder unterstuetzt, kopieren Sie Fehlermeldungen und beschreiben Sie das Layout in Worten.
:::

### 7.4 Wenn AI-Code nicht funktioniert

Fehler sind normal. Nutzen Sie eine feste Routine:

1. **Nicht sofort neu anfangen.** Erst Fehlermeldung kopieren.
2. **Problem isolieren.** Was wurde zuletzt geaendert?
3. **AI im Projektkontext fragen.** Nicht nur die Fehlermeldung, sondern auch Ziel und letzte Aenderung nennen.
4. **Kleine Reparatur verlangen.** Keine komplette Neuentwicklung, wenn nur ein Detail kaputt ist.
5. **Nach jeder Reparatur testen.**

Guter Prompt:

> Nach deiner letzten Aenderung startet das Projekt nicht mehr. Hier ist die Fehlermeldung. Bitte erklaere zuerst die Ursache, aendere dann nur die noetigen Stellen und starte danach erneut den Test.

### 7.5 AI nicht blind vertrauen

AI kann Dateien aendern, aber Sie bleiben verantwortlich. Gewoehnen Sie sich an drei Kontrollen:

- **Diff ansehen**: Welche Dateien wurden geaendert?
- **Starten oder testen**: Laeuft das Projekt wirklich?
- **Rueckgängig machen koennen**: Wenn etwas schlechter wird, Revert nutzen.

Das Ziel ist nicht, jeden Code sofort zu verstehen, sondern genug Kontrolle zu behalten, um sinnvoll mit dem Agenten zu arbeiten.

## 8. Hauefige Begriffe

| Begriff | Bedeutung |
| --- | --- |
| IDE | Entwicklungsumgebung zum Schreiben, Starten und Debuggen von Code. |
| AI IDE | IDE mit integriertem Sprachmodell und oft Agentenfaehigkeiten. |
| Agent | AI-System, das mehrschrittige Aufgaben planen und Werkzeuge bedienen kann. |
| Terminal | Befehlsfenster innerhalb oder ausserhalb der IDE. |
| Dependency | Externe Bibliothek, die ein Projekt benoetigt. |
| Dev Server | Lokaler Server, der eine Web-App waehrend der Entwicklung bereitstellt. |
| Revert | Aenderungen auf einen frueheren Zustand zuruecksetzen. |
| Prompt | Die Anweisung, die Sie der AI geben. |
| Diff | Vergleich zwischen altem und neuem Code. |
| Build | Produktions- oder Pruefprozess, der zeigt, ob ein Projekt korrekt gebaut werden kann. |

## 9. Zusammenfassung

In diesem Kapitel haben Sie gelernt:

1. Eine IDE ist mehr als ein Texteditor: Sie organisiert, startet und debuggt Projekte.
2. Eine AI IDE erweitert die IDE um Sprachmodell, Kontextverstaendnis und Agentenaktionen.
3. Trae kann ein lokales Projekt erstellen, Abhaengigkeiten installieren und ein React-Spiel starten.
4. AI funktioniert am besten, wenn Sie Ziele, Grenzen und erwartete Ausgabe konkret beschreiben.
5. Einsteiger sollten zuerst lauffaehige Minimalversionen erstellen und danach schrittweise verbessern.

Der naechste sinnvolle Schritt ist, mit einem sehr kleinen eigenen Projekt zu ueben: ein Timer, eine To-do-Liste, ein Mini-Spiel oder eine persoenliche Seite. Wichtig ist nicht, sofort perfekt zu programmieren, sondern den Kreislauf zu beherrschen: beschreiben, erzeugen lassen, ausfuehren, pruefen, nachfragen und verbessern.

<RelatedArticles :articles="relatedArticles" />
