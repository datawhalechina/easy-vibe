# IDE-Grundlagen: Entwicklungsumgebung

::: tip 💡 Lernleitfaden
Dieses Kapitel fuhrt Sie tief in das wichtigste Produktivitatswerkzeug von Programmierern ein — die **Integrierte Entwicklungsumgebung (IDE)**. Wir beginnen mit dem Designkonzept der IDE, analysieren die Kernkomponenten Schritt fur Schritt und demonstrieren die Funktionsweise anhand einer virtuellen IDE.
:::

## Überblick über tun, wenn man etwas nicht versteht (How to solve problems)


Beim Erlernen und Verwenden einer IDE stoßen Sie vielleicht auf verschiedene unverstandliche Schaltflachen, Menus oder Codefehler. In diesem Fall **nicht in Panik geraten — die Nutzung von KI-Assistenten ist die effizienteste Losung**.

**Empfohlene Vorgehensweise: Screenshot an die KI schicken**

Heutige KI (wie ChatGPT, Claude, DeepSeek usw.) verfugen uber leistungsstarke Bilderkennungsfahigkeiten. Wenn Sie auf unverstandliche Oberflachenelemente oder komplexe Codefragmente stoßen:

1.  **Screenshot**: Machen Sie einen Screenshot des unverstandlichen Teils (z.B. eines seltsamen Symbols oder eines komplexen Konfigurationscodes).
2.  **Fragen**: Senden Sie das Bild an die KI und fragen Sie: "Was ist das? Wofur ist es?" oder "Was macht xxx in diesem Code?".
3.  **Nachfragen**: Wenn die Antwort der KI zu fachlich und unverstandlich ist, fragen Sie weiter: "Bitte erklaren Sie es in einfachen Worten, am besten mit einem Alltag-Beispiel."

<AiHelpDemo />

---

## 0. Einleitung: Motivation von braucht man eine IDE

Beim Softwareentwicklungsprozess mussen Programmierer haufig Code schreiben, Dateien verwalten, kompilieren/ausfuhren und Fehler debuggen. Wenn all diese Operationen in verschiedenen, unabhangigen Programmen durchgefuhrt werden mussen (z.B. Code im Editor schreiben, in der Kommandozeile kompilieren, Dateien im Dateimanager verwalten), ist die Effizienz extrem niedrig und fehleranfallig.

Der Kernwert einer **IDE (Integrated Development Environment)** liegt in der **Integration**. Sie vereinigt die verschiedenen Werkzeuge, die fur die Softwareentwicklung bentigt werden (Editor, Compiler, Debugger, Dateimanager usw.), in einer einheitlichen grafischen Oberflache und bietet ein All-in-One-Arbeitserlebnis.

**VS Code ist eine der beliebtesten IDEs.** Obwohl es im Kern ein leichtgewichtiger Code-Editor ist, verfugt es durch ein starkes Plugin-System uber alle Kernfunktionen einer IDE (Codebearbeitung, Debugging, Versionskontrolle usw.) und wird daher weithin als die erste Wahl fur modernes Frontend- und Fullstack-Entwicklung betrachtet.

Kurz gesagt: Eine IDE zielt darauf ab, die Produktivitat von Entwicklern zu maximieren und die Zeitkosten fur den Wechsel zwischen verschiedenen Werkzeugen zu reduzieren.

> 🔗 **Ressourcen-Download**:
>
> - [VS Code Offizieller Download](https://code.visualstudio.com/Download)
> - [VS Code Web-Version ausprobieren](https://vscode.dev/)
>
> **VS Code (Visual Studio Code)** ist ein von Microsoft entwickelter, kostenloser, Open-Source- und plattformubergreifender Code-Editor. Mit seinen Eigenschaften — **leichtgewichtig, reich an Plugins und schnellem Start** — wurde es zu einem der weltweit beliebtesten Entwicklungswerkzeuge.egal ob Sie Python, JavaScript oder C++ schreiben, VS Code kann durch Plugin-Installation zu dem "Must-have-Tool" werden, das am besten zu Ihnen passt.

---

## 1. Analyse der Kernoberflache

Die Oberflache moderner IDEs (am Beispiel von VS Code) ist sorgfaltig gestaltet und umfasst in der Regel vier Kernbereiche:

1. **Seitenleiste (Sidebar)**: Ressourcenverwaltung
   Zeigt den Dateibaum des Projekts an, unterstutzt das Erstellen, Umbenennen, Verschieben und Loschen von Dateien und bietet eine globale Sicht und schnellen Zugriff auf die Projektstruktur.

2. **Editor-Bereich (Editor Area)**: Code-Erstellung
   Der Kernbereich zum Schreiben und Ändern von Code. Unterstutzt Syntaxhervorhebung, intelligente Code-Autovervollstandigung, Syntaxprufung und bietet eine effiziente, intelligente Code-Schreibumgebung.

3. **Unteres Panel (Panel)**: Ausfuhrung und Feedback
   Interaktion mit dem zugrundeliegenden System und Anzeige der Ausfuhrungsergebnisse. Enthalt Terminal (Terminal), Ausgabe (Output) usw. zur Ausfuhrung von Befehlen, Anzeige von Logs und zum Debuggen.

4. **Aktivitatsleiste (Activity Bar)**: Funktionsnavigation
   Befindet sich ganz links in der Oberflache und enthalt Symbole fur den Datei-Explorer, Suche, Git-Verwaltung usw. Ermoglicht schnelles Wechseln zwischen verschiedenen Arbeitskontexten (wie "Code schreiben" vs. "Code committen").

---

## 2. Interaktive Demo: Funktionen erleben

Hundertmal horen ist nicht so gut wie einmal sehen. Damit Sie die Bequemlichkeit einer IDE wirklich spuren konnen, haben wir eine **virtuelle VS Code-Umgebung** fur Sie vorbereitet.

**Bitte versuchen Sie Folgendes**:

1.  Klicken Sie oben rechts auf **"▶ Gefuhrte Tour starten"** und folgen Sie dem Cursor, um die verschiedenen Bereiche kennenzulernen.
2.  **Frei erkunden**: Klicken Sie auf die linken Symbole, um die Ansicht zu wechseln, oder klicken Sie auf Dateinamen, um Code zu offnen.
3.  **Integration erleben**: Sie werden feststellen, dass Dateiverwaltung, Codebearbeitung und Terminalausfuhrung nahtlos in einem einzigen Fenster verbunden sind.
4.  **Plugins installieren**: Wahlen Sie im Dropdown-Menü den Modus **"Erweiterungen installieren (Extensions)"** und erleben Sie, wie Sie ein Python-Plugin in einem virtuellen Store installieren.

<ClientOnly>
  <VirtualVSCodeDemo />
</ClientOnly>

---

## 3. Kernmechanismus: Motivation von kann VS Code alles

Sie fragen sich vielleicht: Warum kann dieselbe Software Python schreiben, C++ schreiben und Webentwicklung betreiben? Wie macht sie das?
Die Designphilosophie von VS Code lasst sich in einem Satz zusammenfassen: **"Minimaler Kern, Fahigkeiten uber Plugins".**

### 3.1 Minimaler Kern: Nur eine "Leinwand"

Stellen Sie sich vor, Sie haben VS Code gerade heruntergeladen und kein einziges Plugin installiert — es **versteht eigentlich kein Programmieren**.
Zu diesem Zeitpunkt ist es im Wesentlichen nur ein **leistungsfahiger Texteditor**.

- Es ist fur die Darstellung von Text (Rendering) zustandig.
- Es ist fur die Verwaltung von Dateien (I/O) zustandig.
- Es weiß aber nicht, dass `print("Hello")` Python-Code ist oder dass `int main()` der Einstiegspunkt von C++ ist.

### 3.2 Plugin-System: Die "Seele" injizieren

Damit VS Code Code "versteht", mussen wir **Plugins (Extensions)** installieren.
Plugins sind wie spezialisierte **Dolmetscher**:

- **Python-Plugin**: Sagt VS Code, was eine Variable ist, was eine Funktion ist und wie `.py`-Dateien ausgefuhrt werden.
- **C++-Plugin**: Sagt VS Code, wie der Compiler aufgerufen wird und wie der Speicher gedebuggt wird.

Dieses Design macht VS Code sehr leichtgewichtig — wenn Sie kein Java schreiben, mussen Sie keine Java-Laufzeitumgebung mit sich herumtragen.

### 3.3 Der Hintergrundprozess: Vom Code zur Ausfuhrung

<ClientOnly>
  <IdeArchitectureDemo />
</ClientOnly>

Schauen wir uns anhand eines konkreten Szenarios an, wie VS Code, Plugins und die zugrundeliegende Umgebung zusammenarbeiten.
Angenommen, Sie haben eine Zeile Python-Code geschrieben und auf **Ausfuhren** oder **Debuggen** geklickt:

#### 1. Spracherkennung (Activation)

VS Code erkennt die `.py`-Endung und aktiviert automatisch das **Python-Plugin**. Das Plugin ubernehmt sofort den Editor, beginnt mit der Syntaxanalyse, farbt den Code unterschiedlich ein (Syntaxhervorhebung) und bietet intelligente Vorschlage.

#### 2. Aufgaben-Delegation (Delegation)

Wenn Sie einen Befehl geben, fuhrt das Plugin den Code nicht selbst aus, sondern **delegiert** die Aufgabe an spezialisierte Tools im Hintergrund:

- **Ausfuhrungsmodus**: Das Plugin generiert einen Befehl (z.B. `python main.py`) und sendet ihn an das **Terminal** des Systems zur Ausfuhrung.
- **Debug-Modus**: Das Plugin startet einen **Debug-Adapter (Debug Adapter)**. Dieser ist wie eine "Uberwachungssonde", die sich mit dem Python-Interpreter verbindet und Ihnen ermoglicht, die Codeausfuhrung Zeile fur Zeile zu steuern.

#### 3. Ergebnis-Feedback (Feedback)

Der Python-Interpreter (oder Compiler) fuhrt den Code aus und gibt die Ergebnisse (oder Fehlerinformationen) an das Plugin zuruck. Das Plugin "transportiert" diese Informationen zuruck und zeigt sie im **unteren Terminal-Panel** von VS Code an.

### 3.4 Zusammenfassung: Die "Restaurant"-Analogie

Wenn Ihnen die obige Formel zu abstrakt erscheint, konnen Sie den Prozess des Code-Schreibens mit einem **Restaurantbesuch** vergleichen:

1.  **VS Code ist der "Restaurantsaal"**:
    - Hier ist die Einrichtung luxurios und die Atmosphare angenehm (Code-Hervorhebung, schones Theme).
    - **Aber der Saal selbst produziert kein Essen**. Sie sitzen hier nur, um bequemer zu "bestellen" (Code zu schreiben).

2.  **Die Umgebung (Python/Node) ist die "Kuche"**:
    - Hier wird wirklich **gekocht (Code ausgefuhrt)**.
    - Wenn das Restaurant keine Kuche hat (Python nicht installiert), konnen Sie im Saal noch so lange warten — Sie bekommen kein Essen.

3.  **Die Plugins sind der "Kellner"**:
    - Er verbindet den Saal mit der Kuche.
    - Er versteht Ihre Speisekarte, geht zur Kuche und sagt: "Tisch 3 bestellt 'main.py ausfuhren'!"
    - Wenn es fertig ist, bringt er Ihnen das Ergebnis (das heiße Essen) zuruck.

**Fazit**:

- Nur VS Code installiert = **Nur Saal, keine Kuche** (kann nur ansehen, nicht essen).
- Nur Python installiert = **Nur Kuche, kein Saal** (kann essen, muss aber auf dem Kuchenboden hocken — sehr schlechte Erfahrung).
- **VS Code + Plugins + Python installiert = Das perfekte Dinnerlebnis.**

---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const openTarget = () => {
    const hash = window.location.hash
    if (hash) {
      try {
        // Handle encoded Chinese characters in hash
        const target = document.querySelector(decodeURIComponent(hash))
        // If the target is a details element, open it
        if (target && target.tagName === 'DETAILS') {
          target.setAttribute('open', '')
        }
        // If the target is inside a details element, open the parent details
        const parentDetails = target?.closest('details')
        if (parentDetails) {
          parentDetails.setAttribute('open', '')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  openTarget()
  window.addEventListener('hashchange', openTarget)
})
</script>

# Anhang: Visual Studio Code Menu-Analyse

Um die Bedeutung jeder Option leicht verstandlich zu machen, analysieren wir hier die Menuleiste im Detail:

![](../../../zh-cn/appendix/2-development-tools/editors-and-ai/images/index-2026-01-09-11-35-55.webp)

![](../../../zh-cn/appendix/2-development-tools/editors-and-ai/images/index-2026-01-09-11-36-23.png)

<details class="custom-block details" id="vscode-file-menu">
  <summary>File (Datei): Offnen/Speichern/Workspace-Verwaltung von Projekten und Dateien</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Dateien erstellen/offnen**, **Projektordner (Folder) offnen**, **Workspace verwalten**, **Speichern und Schließen**.

> Am haufigsten verwendet man: Open Folder (Ordner offnen), um ein Projekt zu offnen; Open... (Offnen...), um eine einzelne Datei zu offnen; dann Save / Save All (Speichern/Alle speichern), um Änderungen zu speichern; und schließlich Close Editor / Close Folder (Editor schließen/Ordner schließen), um die Arbeit zu beenden. Workspace, Workspace duplizieren und ahnliches konnen Sie nutzen, wenn Sie mehr Projekte haben — Sie mussen nicht gleich am Anfang alles verstehen.

- **New Text File (Neue Textdatei)**: Erstellt einen unbenannten Textpuffer fur temporare Notizen oder schnelles Einfugen.
- **New File... (Neue Datei...)**: Erstellt eine neue Datei im Projekt (in der Regel mussen Sie den Pfad wahlen/benennen).
- **New Window (Neues Fenster)**: Offnet eine neue VS Code-Fensterinstanz.
- **New Window with Profile (Neues Fenster mit Profil)**: Offnet ein neues Fenster mit einem bestimmten Profil (Erweiterungs-/Einstellungskombination), geeignet fur die Trennung verschiedener Kurse/Projekte.
- **Open... (Offnen...)**: Offnet eine einzelne Datei zur Bearbeitung.
- **Open Folder... (Ordner offnen...)**: Offnet einen Ordner als Projektstammverzeichnis (die am haufigsten verwendete "Projekt offnen"-Methode).
- **Open Workspace from File... (Workspace aus Datei offnen...)**: Offnet eine `.code-workspace`-Datei und ladet einen Multi-Ordner-/spezifischen Einstellungs-Workspace.
- **Open Recent (Zuletzt geoffnet)**: Schnellzugriff auf zuletzt geoffnete Dateien/Ordner/Workspaces.
- **Add Folder to Workspace... (Ordner zum Workspace hinzufugen...)**: Fugt einen weiteren Ordner zum aktuellen Workspace hinzu (bildet einen Multi-Root-Workspace).
- **Save Workspace As... (Workspace speichern unter...)**: Speichert die aktuelle Workspace-Struktur als `.code-workspace`-Datei zur einfachen Weitergabe/Wiederverwendung.
- **Duplicate Workspace (Workspace duplizieren)**: Kopiert die aktuelle Workspace-Konfiguration (haufig verwendet, um ahnliche Projektumgebungen zu erstellen).
- **Save (Speichern)**: Speichert die Änderungen der aktuellen Datei.
- **Save As... (Speichern unter...)**: Speichert die aktuelle Datei unter einem neuen Namen/neuen Pfad.
- **Save All (Alle speichern)**: Speichert alle geoffneten und geanderten Dateien.

- **Share (Teilen)**: Einstiegspunkt fur Freigabe/Zusammenarbeit (genauer Inhalt hangt von Version und Erweiterungen ab).
- **Auto Save (Automatisches Speichern)**: Wechselt die Strategie fur automatisches Speichern (z.B. verzogertes Speichern/Spichern bei Fokusverlust).
- **Revert File (Datei zurucksetzen)**: Verwirft ungespeicherte Änderungen der aktuellen Datei und kehrt zur Festplattenversion zuruck.
- **Close Editor (Editor schließen)**: Schließt den aktuellen Tab.
- **Close Folder (Ordner schließen)**: Schließt den aktuellen Projektordner (der Workspace wird leer).
- **Close Window (Fenster schließen)**: Schließt das aktuelle VS Code-Fenster.

</details>

<details class="custom-block details" id="vscode-edit-menu">
  <summary>Edit (Bearbeiten): Grundlegende Bearbeitung, Suchen/Ersetzen, Kommentare und schnelle Bearbeitungsaktionen</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Ruckgangig/Wiederherstellen**, **Ausschneiden/Kopieren/Einfugen**, **Suchen/Ersetzen**, **Kommentare und Editor-Aktionen** (Bearbeitungseffizienz steigern).

- **Undo / Redo (Ruckgangig / Wiederherstellen)**: Die "Bereuhen-Pille" fur falschen Code, die grundlegendste Operation.
- **Cut / Copy / Paste (Ausschneiden / Kopieren / Einfugen)**: Text-Transporteure.
- **Find / Replace (Suchen / Ersetzen)**: Suche oder Massenänderung in der aktuellen Datei.
- **Find in Files / Replace in Files (In Dateien suchen / In Dateien ersetzen)**: Globale (projektweite) Suche und Ersetzung — sehr machtig, aber mit Vorsicht zu verwenden.
- **Toggle Line Comment (Zeilenkommentar umschalten)**: `Strg + /`, kommentiert die aktuelle Zeile schnell aus/entkommentiert sie.
- **Toggle Block Comment (Blockkommentar umschalten)**: `Umschalt + Alt + A`, kommentiert die Auswahl schnell aus/entkommentiert sie.
- **Emmet: Expand Abbreviation (Emmet-Abkurzung erweitern)**: Das Must-have-Tool fur die HTML/CSS-Entwicklung — Abkurzung eingeben und Tab drucken, um Code zu erweitern.

</details>

<details class="custom-block details" id="vscode-selection-menu">
  <summary>Selection (Auswahl): Multi-Cursor und intelligente Auswahl</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Cursor-Steuerung**, **Mehrzeilenbearbeitung**, **Auswahl erweitern/verkleinern**. Dies ist der "Gamechanger" fur die Effizienzsteigerung in VS Code.

- **Select All (Alles auswahlen)**: Wahlt den gesamten Inhalt der aktuellen Datei aus.
- **Expand Selection / Shrink Selection (Auswahl erweitern / verkleinern)**: Erkennt intelligent die Syntaxstruktur und erweitert oder verkleinert die Auswahl schrittweise (z.B.: Wort -> Zeichenfolge -> innerhalb von Klammern -> ganze Zeile -> Funktionskorper).
- **Copy Line Up / Down (Zeile nach oben/unten kopieren)**: Klont die aktuelle Zeile schnell.
- **Move Line Up / Down (Zeile nach oben/unten verschieben)**: `Alt + ↑ / ↓`, passt die Reihenfolge der Codezeilen direkt an, ohne Ausschneiden und Einfugen.
- **Add Cursor Above / Below (Cursor oben/unten hinzufugen)**: `Strg + Alt + ↑ / ↓`, aktiviert den Multi-Cursor-Modus zur gleichzeitigen Bearbeitung mehrerer Zeilen.
- **Add Cursor to Line Ends (Cursor an Zeilenenden hinzufugen)**: Nach der Auswahl mehrerer Textzeilen wird am Ende jeder Zeile ein Cursor hinzugefugt.

</details>

<details class="custom-block details" id="vscode-view-menu">
  <summary>View (Ansicht): Oberflachenlayout und Panel-Steuerung</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Seitenleiste/Panel ein-/ausschalten**, **Layout anpassen**, **Befehlspalette**, **Ausgabe- und Debug-Konsole**.

- **Command Palette... (Befehlspalette...)**: `Strg + Umschalt + P` / `F1`, das Kommandozentrum von VS Code, in dem alle Befehle gesucht und ausgefuhrt werden konnen.
- **Open View... (Ansicht offnen...)**: Offnet schnell eine bestimmte Seitenleistenansicht (z.B. Datei-Explorer, Quellcodeverwaltung).
- **Appearance (Erscheinungsbild)**: Steuert Vollbild, Menuleisten-Sichtbarkeit, Seitenleistenposition, Zoom-Stufe (Zoom In/Out).
- **Editor Layout (Editor-Layout)**: Teilt den Editor (Split Up/Down/Left/Right) fur die Code-Ansicht nebeneinander.
- **Explorer / Search / Source Control / Run / Extensions**: Wechselt direkt die Ansichten der Aktivitatsleiste (Activity Bar).
- **Problems / Output / Debug Console / Terminal**: Steuert direkt den Inhalt des unteren Panels.
- **Word Wrap (Zeilenumbruch)**: `Alt + Z`, steuert, ob lange Codezeilen automatisch umgebrochen werden (beeinflusst nicht den tatsachlichen Dateiinhalt).

</details>

<details class="custom-block details" id="vscode-go-menu">
  <summary>Go (Gehe zu): Code-Navigation und Sprunge</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Sprunge zwischen Dateien**, **Sprunge zwischen Symbolen (Funktionen/Variablen)**.

- **Back / Forward (Zuruck / Vorwarts)**: Springt wie in einem Browser zwischen den vergangenen Cursor-Positionen.
- **Switch Editor... (Editor wechseln...)**: Wechselt schnell zwischen geoffneten Tabs.
- **Go to File... (Gehe zu Datei...)**: `Strg + P`, Dateinamen eingeben und Datei schnell offnen.
- **Go to Symbol in Editor... (Gehe zu Symbol im Editor...)**: `Strg + Umschalt + O`, listet Funktionen/Klassen/Variablen der aktuellen Datei auf und springt schnell zu ihnen.
- **Go to Definition (Gehe zur Definition)**: `F12`, springt zur Definition der Variablen oder Funktion unter dem Cursor.
- **Go to References (Gehe zu Verweisen)**: `Umschalt + F12`, zeigt an, wo die Variable oder Funktion verwendet wird.
- **Go to Line/Column... (Gehe zu Zeile/Spalte...)**: `Strg + G`, springt zur angegebenen Zeilennummer.

</details>

<details class="custom-block details" id="vscode-run-menu">
  <summary>Run (Ausfuhren): Debugging und Ausfuhrung</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Debugging starten**, **Breakpoint-Verwaltung**.

- **Start Debugging (Debugging starten)**: `F5`, fuhrt das Programm im Debug-Modus aus (unterstutzt Breakpoints, Variablenuberwachung).
- **Run Without Debugging (Ohne Debugging ausfuhren)**: `Strg + F5`, fuhrt das Programm direkt aus, ohne den Debugger anzudocken (etwas schneller).
- **Stop Debugging (Debugging stoppen)**: Beendet die aktuelle Debug-Sitzung erzwingend.
- **Restart Debugging (Debugging neu starten)**: Fuhrt das Programm erneut aus.
- **Toggle Breakpoint (Breakpoint umschalten)**: `F9`, setzt oder entfernt einen roten Punkt (Breakpoint) in der aktuellen Zeile.
- **New Breakpoint (Neuer Breakpoint)**: Unterstutzt fortgeschrittene Funktionen wie bedingte Breakpoints und Logpoint-Breakpoints.

</details>

<details class="custom-block details" id="vscode-terminal-menu">
  <summary>Terminal: Integrierte Kommandozeile</summary>

Dieses Menu ist hauptsachlich fur Folgendes zustandig: **Neues Terminal erstellen**, **Terminal-Fenster verwalten**.

- **New Terminal (Neues Terminal)**: Offnet eine neue Shell (PowerShell/Bash/Zsh) im unteren Panel.
- **Split Terminal (Terminal teilen)**: Teilt das Terminal-Panel links/rechts oder oben/unten, um mehrere Befehle gleichzeitig auszufuhren.
- **Run Task... (Aufgabe ausfuhren...)**: Fuhrt in `tasks.json` definierte Build-/Testaufgaben aus.

</details>

<details class="custom-block details" id="vscode-help-menu">
  <summary>Help (Hilfe): Dokumentation und Feedback</summary>

- **Welcome (Willkommen)**: Offnet die Willkommensseite (mit Einstiegsanleitung und letzten Projekten).
- **Show All Commands (Alle Befehle anzeigen)**: Entspricht der Befehlspalette.
- **Documentation (Dokumentation)**: Geht zur offiziellen Dokumentation.
- **Editor Playground (Editor-Testbereich)**: Interaktives Tutorial zum Erlernen von Editiertechniken.
- **Check for Updates... (Nach Updates suchen...)**: Sucht manuell nach Updates.
- **About (Uber)**: Zeigt Versionsnummer, Build-Zeit, Electron/Node-Versionsinformationen.

</details>

