# Claude Code Schnellstart-Kernleitfaden

Claude Code ist das offizielle AI-native Codierungstool von Anthropic. Es integriert die Fahigkeiten grosser Sprachmodelle direkt in das Terminal, sodass Sie Programmieraufgaben durch Zusammenarbeit mit AI in natuerlicher Sprache erledigen koennen. Anders als herkoemmliche Codevervollstaendigungstools kann Claude Code den Kontext eines gesamten Projekts verstehen und komplexe Entwicklungsaufgaben ausfuehren. Von Codegenerierung ueber Refactoring, Debugging bis hin zur Dokumentationserstellung - es kann alles bewaeltigen.

Dieses Kapitel hilft Ihnen, die Kernverwendung von Claude Code schnell zu beherrschen, einschliesslich Installation und Einrichtung, grundlegende Operationen, praktische Techniken und haeufig verwendete Befehle. Ob Sie zum ersten Mal ein AI-Codierungstool verwenden oder Claude Code effizienter nutzen moechten, hier finden Sie, was Sie brauchen.

---

## Schnellinstallation

Claude Code baut auf Node.js auf, stellen Sie also vor der Installation sicher, dass Node.js 18 oder hoeher auf Ihrem System installiert ist. Der Prozess ist sehr einfach und dauert normalerweise nur wenige Minuten.

### Warum Sie Claude Code brauchen

In herkoemmlichen Entwicklungsworkflows wechseln Entwickler haeufig zwischen Editor, Terminal, Browser und Dokumentation. Claude Code vereint diese Workflows in einer einzigen Oberflaeche: im selben Terminalfenster koennen Sie Code schreiben, Tests ausfuehren, Dokumentation lesen und sogar mit Teammitgliedern zusammenarbeiten. Wichtiger noch, es kann Ihre Projektstruktur verstehen und sich Ihre Codierungsgewohnheiten merken, wodurch es zu einem echten Programmierassistenten wird.

### Methode 1: Manuelle Installation

Die manuelle Installation eignet sich fuer Entwickler, die gerne die volle Kontrolle ueber jeden Schritt haben, und hilft Ihnen auch, die Toolkomponenten klar zu verstehen.

```bash
# Claude Code CLI global installieren
# Verwenden Sie -g, um den Befehl global zu installieren, damit er in jedem Verzeichnis verwendet werden kann
npm install -g @anthropic-ai/claude-code

# Installation ueberpruefen
# Wenn die Version angezeigt wird (z.B. 0.1.25), war die Installation erfolgreich
claude --version
```

Waehrend der Installation laedt npm automatisch Abhaengigkeiten herunter und konfiguriert Umgebungsvariablen. Wenn Sie auf Berechtigungsprobleme stossen, versuchen Sie `sudo` (macOS/Linux) oder fuehren Sie das Terminal als Administrator aus (Windows).

### Methode 2: Lassen Sie einen AI-Agenten es fuer Sie installieren

Wenn Sie bereits andere AI-Codierungsassistenten verwenden (wie Cursor, Windsurf oder den AI-Agenten in diesem Projekt), koennen Sie diese die Installation fuer Sie erledigen lassen. Der Vorteil ist, dass die AI Ihre Umgebung automatisch erkennen, Abhaengigkeitskonflikte behandeln und den besten Installationspfad fuer Ihr System waehlen kann.

**Sie koennen einfach sagen:**

```text
Help me install Anthropic Claude Code.
```

Oder genauer:

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

Ein AI-Agent wird:
1. Die aktuelle Node.js-Version ueberpruefen
2. Sie zum Upgrade auffordern, wenn die Anforderungen nicht erfuellt sind
3. Installationsbefehle ausfuehren
4. Das Installationsergebnis ueberpruefen
5. Automatische Korrekturen versuchen, wenn Probleme auftreten

### Erster Start und Initialisierung

Nach der Installation wechseln Sie in Ihr Projektverzeichnis und starten Claude Code:

```bash
# In das Projektverzeichnis wechseln (Claude Code arbeitet im aktuellen Verzeichnis)
cd /path/to/your/project

# Claude Code starten
claude
```

Beim ersten Start fuehrt Sie Claude Code durch mehrere wichtige Einrichtungsschritte:

1. **Beim Anthropic-Konto anmelden**: Sie benoetigen ein Anthropic-Konto, um Claude Code zu verwenden. Wenn Sie keins haben, werden Sie zur Registrierung aufgefordert.
2. **Plan waehlen**:
   - **Kostenloser Plan**: geeignet fuer persoenliches Lernen und leichte Nutzung, mit Anrufbegrenzungen
   - **Pro-Plan**: geeignet fuer professionelle Entwickler, mit hoeherem Kontingent und Prioritaetsantwort
3. **Bedingungen akzeptieren**: Lesen und akzeptieren Sie die Anthropic-Nutzungsbedingungen und Datenschutzrichtlinie
4. **Optional: API-Schluessel konfigurieren**: Wenn Sie einen benutzerdefinierten Schluessel haben (z.B. von einem Drittanbieter), konfigurieren Sie ihn hier

::: info Besonderer Hinweis fuer Nutzer in Festlandchina

Aufgrund von Netzwerkbeschraenkungen koennen Nutzer in Festlandchina moeglicherweise nicht direkt auf die offiziellen Dienste von Anthropic zugreifen. Claude Code unterstuetzt Drittanbieterdienste, die mit dem Anthropic-API-Format kompatibel sind, was technisch machbar ist.

**Sie haben zwei Optionen:**

1. **API-Token direkt verwenden**: Kaufen Sie ein Token von einem Anbieter, der mit der Anthropic-API kompatibel ist, und konfigurieren Sie es mit Umgebungsvariablen
2. **Codierungsplan verwenden**: Einige Anbieter bieten codierungsoptimierte Plaene, die fuer Codierungsszenarien通常 kostenguenstiger sind

**Empfohlener Ansatz**: Lassen Sie einen AI-Agenten Ihnen bei der Konfiguration helfen. Sie muessen nur die Anbieterkonfigurationsinformationen (API-Endpunkt, Schluessel usw.) bereitstellen, und die AI kann die Umgebungsvariablen korrekt setzen.

**Ausfuehrlicher Einrichtungsleitfaden:** [Wie man Claude Code installiert und Umgebungsvariablen konfiguriert](/de-de/stage-2/backend/modern-cli/)

:::

---

## Schnellstart: Fuehren Sie einige kleine Experimente durch

Installieren Sie sich nicht gleich in formelle Projekte. Fuehren Sie zuerst einige kleine Experimente durch, um zu verstehen, wie Claude Code funktioniert. Diese drei Experimente sind von einfach bis fortgeschritten gestaltet und entsprechen drei Kernfaehigkeiten: natuerlichsprachliches Verstaendnis, Inhaltserstellung und Codeausfuehrung.

### Experiment 1: Konversation - AI-Verstaendnis erleben

Das Ziel ist es, das natuerlichsprachliche Verstaendnis von Claude Code zu erleben. Anders als herkoemmliche Suchmaschinen kann Claude Code Kontext verstehen, Mehr-Runden-Gespraeche fuehren und Antworten aus Ihrem Feedback anpassen.

**Probieren Sie diese Prompts:**

```text
Hello, who are you?
```

Claude stellt sich als Claude Code vor, ein AI-Codierungsassistent von Anthropic.

```text
What is a closure? Give me the too-long-didnt-read version.
```

Beobachten Sie, wie Claude "too-long-didnt-read" als Hinweis verwendet und eine kurze aber praezise Erklaerung gibt.

```text
What is the difference between JavaScript and TypeScript?
```

Dies ist eine technische Vergleichsfrage. Pruefen Sie, ob Claude eine strukturierte und tiefgruendige Antwort liefert.

**Experiment-Punkt**: Beachten Sie Claudes Antwortstil. Es gibt normalerweise zuerst die Kernfolgerung, dann Details. Dieser "umgekehrte Pyramiden"-Stil ist ausgezeichnet fuer schnellen Informationsabruf.

### Experiment 2: Ein Markdown-Dokument generieren - Inhaltserstellung erleben

Dieses Experiment veranschaulicht die Inhaltserstellungsfaehigkeit von Claude Code. Fuer Entwickler ist das Schreiben von Dokumentation oft muehsam. Claude kann schnell klare und vollstaendige Dokumentation aus Anforderungen generieren.

**Geben Sie diese Anweisung ein:**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**Was Claude tut:**

1. Analysiert Ihre Anforderung: haeufige Git-Befehle, Markdown-Format und drei Elemente (Befehl/Erklaerung/Beispiel)
2. Plant die Dokumentstruktur: normalerweise nach Verwendungsszenario gruppiert (Initialisierung, taegliche Entwicklung, Branch-Workflow, Remote-Zusammenarbeit usw.)
3. Generiert Inhalt: kurze Erklaerung und praktische Beispiele fuer jeden Befehl
4. Formatiert die Ausgabe: verwendet Markdown-Syntax und passende Struktur

**Erwartete Beispielausgabe:**

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**Fortgeschrittene Versuche**: Sie koennen zusaetzliche Anforderungen hinzufuegen wie "chinesische Kommentare hinzufuegen", "nach Haeufigkeit sortieren", "haeufige Fehlerbehandlung einbeziehen" usw. und beobachten, wie Claude die Ausgabe anpasst.

### Experiment 3: Ein Spiel schreiben und ausfuehren - Ende-zu-Ende-Codierungsworkflow

Dies ist das anspruchsvollste Experiment. Es veranschaulicht den vollstaendigen Workflow von Claude Code: Anforderungen verstehen, Code schreiben, Dateien erstellen, Programme ausfuehren und Fehler behandeln. Dadurch koennen Sie die Staerke eines AI-Codierungsassistenten wirklich spueren.

**Geben Sie diese Anweisung ein:**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**Claude fuehrt diese Schritte aus:**

**Schritt 1: Umgebung ueberpruefen**
- Ueberpruefen, ob Python installiert ist
- Ueberpruefen, ob pygame verfuegbar ist
- Installation vorschlagen, falls fehlend

**Schritt 2: Code schreiben**
- Spieleinstiegsdatei erstellen (z.B. `snake_game.py`)
- Bewegung, Nahrungsgenerierung, Kollisionserkennung implementieren
- Score-Anzeige hinzufuegen
- ESC-Beendigung implementieren

**Schritt 3: Spiel ausfuehren**
- Python-Skript ausfuehren und Spiel starten
- Spielfenster erscheint, Pfeiltasten zum Steuern der Schlange verwenden

**Schritt 4: Folgeunterstuetzung**
- Wenn es einen Bug gibt, koennen Sie einfach sagen "die Schlange kann durch Waende gehen, repariere es"
- Wenn Sie weitere Funktionen moechten, wie "Schwierigkeit mit Score erhoehen", kann Claude weiter aendern

**Wert dieses Experiments:**

1. **Einrichtung verifizieren**: bestaetigen, dass Claude Code Code korrekt ausfuehren kann
2. **Interaktion erleben**: kollaborative Entwicklung mit AI spueren
3. **Vertrauen aufbauen**: sehen, wie AI ein Ende-zu-Ende ausfuehrbares Programm erstellt

**Haeufige Fragen:**

- **F: Was tun, wenn pygame nicht installiert ist?**
  - A: Claude erkennt es und schlaegt `pip install pygame` vor, oder Sie koennen Claude bitten, es zu installieren

- **F: Das Terminal ist nach Spielstart belegt, was tun?**
  - A: Druecken Sie ESC, um das Spiel zu beenden, oder verwenden Sie Claude Code in einem anderen Terminalfenster

- **F: Kann ich die Sprache wechseln?**
  - A: Absolut. Probieren Sie "write in JavaScript", "write with HTML5 Canvas" usw.

---

## Kerntechniken

Beherrschen Sie diese Techniken und Ihre Claude-Code-Effizienz kann sich vervielfachen. Sie stammen aus der echten Entwicklungspraxis und decken hochfrequente Szenarien ab.

### Technik 1: Doppeltes Esc zum Zurueckrollen der Konversation - Fehlbedienungen rueckgaengig machen

Dies ist die haeufigste und wichtigste Tastenkombination in Claude Code. Waehrend der Zusammenarbeit koennen Sie sich vertippen, eine falsche Anweisung geben oder eine Antwort nicht moegen. Doppeltes Esc gibt Ihnen ein schnelles "Zeitreisen".

**Tastenkombinations-Details:**

```text
Einmal Esc druecken     -> aktuelle Eingabe loeschen (aehnlich wie Strg+C)
Zweimal Esc druecken    -> zum vorherigen Konversationszustand zurueckkehren (vorherige Runde rueckgaengig machen)
Dreimal Esc druecken    -> gesamten Konversationsverlauf loeschen (neu beginnen)
```

**Anwendungsfaelle:**

- **Fall A**: Sie haben versehentlich eine falsche Anweisung gesendet und Claude hat mit der Ausfuehrung begonnen. Druecken Sie schnell zweimal Esc, um vor der Ausfuehrung zurueckzukehren.
- **Fall B**: Claudes Antwort entspricht nicht dem, was Sie wollten, und Sie moechten neu formulieren. Doppeltes Esc zum Rueckgaengigmachen und nochmal fragen.
- **Fall C**: Die Konversation hat viele Runden und der Kontext ist unuebersichtlich. Dreifaches Esc zum Loeschen und Neustarten.

**Wichtiger Hinweis**: Doppeltes Esc rollt den **Konversationszustand** zurueck, nicht Codeaenderungen. Wenn Claude bereits Dateien bearbeitet hat, werden diese Aenderungen nicht automatisch rueckgaengig gemacht. Sie muessen sie manuell ueber Git wiederherstellen.

**Empfehlung**: Speichern Sie vor potenziell grossen Codeaenderungen den aktuellen Zustand (`git commit` oder `git stash`), um die Wiederherstellung zu erleichtern.

### Technik 2: @ verwenden, um Dateien zu referenzieren - Praezise Kontextsteuerung

Obwohl Claude Code Projektdateien automatisch lesen kann, macht explizites Referenzieren von Dateien die Absicht klarer und vermeidet Token-Verschwendung fuer unzusammenhaengende Dateien.

**Grundlegende Verwendung:**

Anstatt vage:

```text
Explain src/utils.ts
```

Explizite Referenz verwenden:

```text
@src/utils.ts Explain this file
```

**Erweiterte Verwendung:**

**Mehrere Dateien vergleichen:**
```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**Verzeichnis referenzieren:**
```text
@src/components/ Summarize all components under this directory
```

**Spezifische Zeilen referenzieren (mit Editor):**
```text
@src/utils.ts:45-60 Explain what this code does
```

**Verwendungstipps:**

1. **Tab-Vervollstaendigung**: Geben Sie `@` ein und druecken Sie Tab, Claude zeigt die Dateiliste im aktuellen Verzeichnis an und Sie koennen mit Pfeiltasten waehlen
2. **Relative Pfade**: unterstuetzt Referenzen wie `@./config.json` oder `@../shared/types.ts`
3. **Fuzzy-Matching**: teilweise Dateinamen sind erlaubt, z.B. kann `@utils` zu `src/utils.ts` oder `src/utils/index.ts` passen

### Technik 3: ! verwenden, um Befehle auszufuehren - Terminal-Integration

Claude Code hat eingebaute Befehlsausfuehrung. Sie koennen Befehle ausfuehren, ohne zu einem anderen Terminal zu wechseln.

**Grundlegende Verwendung:**

```text
!npm test           # Tests ausfuehren
!git status         # Git-Status pruefen
!ls -la             # Dateien auflisten
```

**Praktische Szenarien:**

**Szenario: Tests ausfuehren und Fehlschlaege analysieren**
```text
!npm test
# nach dem Fehlschlag
Analyze test failure reasons and fix code
```

**Szenario: Git-Diff inspizieren**
```text
!git diff
# Claude bitten, Aenderungen zu erklaeren
Summarize key changes in this diff
```

**Szenario: Projekt erstellen**
```text
!npm run build
# wenn Build fehlschlaegt
Build failed, help me fix it
```

**Sicherheitshinweis:**

Fuer sensible Befehle (z.B. `rm -rf`, `sudo`) fragt Claude Code nach Bestaetigung. Dies ist ein Schutzmechanismus. Bestaetigen Sie sorgfaeltig.

### Technik 4: /plan vor dem Codieren - Der richtige Weg, komplexe Aufgaben zu behandeln

Bei komplexen Aufgaben ist direktes Codieren oft ineffizient. `/plan` tritt in den Planungsmodus ein: Implementierungsplan zuerst definieren, dann Schritt fuer Schritt ausfuehren.

**Verwendung:**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**Was Claude tut:**

1. **Anforderungen analysieren**
2. **Aktuelles Projekt und Technologie-Stack bewerten**
3. **Schritt-fuer-Schritt-Plan erstellen**
4. **Diskutieren und mit Ihrem Feedback anpassen**

**Beispielausgabe:**

```text
📋 User Authentication Implementation Plan

Phase 1: Database design
- [ ] Create users table (id, email, password_hash, created_at)
- [ ] Create sessions table (id, user_id, expires_at)

Phase 2: Backend API
- [ ] POST /api/auth/register - register
- [ ] POST /api/auth/login - login
- [ ] POST /api/auth/logout - logout
- [ ] GET /api/auth/me - get current user

Phase 3: Frontend integration
- [ ] Create login page
- [ ] Create register page
- [ ] Add route guards

Phase 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests

Which phase do you want to start with? Or should we adjust the plan?
```

**Best Practice:**

- Fuer Aufgaben ueber 30 Minuten zuerst `/plan` verwenden
- Phase fuer Phase ausfuehren und jede Phase verifizieren
- Wenn sich Anforderungen aendern, `/plan` erneut ausfuehren zum Anpassen

### Technik 5: /init generiert automatisch Konfiguration - Schnelle Projektinitialisierung

`/init` ist einer der maechtigsten Befehle von Claude Code. Es scannt Ihr Projekt automatisch, identifiziert Technologie-Stack und Struktur und generiert eine vollstaendige `CLAUDE.md`.

**Verwendung:**

```text
/init
```

**Claude fuehrt aus:**

1. **Projektstruktur scannen**: Framework/Sprache/Build-Tools identifizieren
2. **Konfigurationsdateien analysieren**: package.json, tsconfig.json usw. lesen
3. **Stil ableiten**: Namenskonventionen und Dateiorganisation
4. **CLAUDE.md generieren**

**Beispiel einer generierten CLAUDE.md:**

```text
# My Project

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Database: Prisma + PostgreSQL

## Common Commands

\`\`\`bash
npm run dev      # start dev server
npm run build    # production build
npm run test     # run tests
npx prisma migrate dev  # DB migration
\`\`\`

## Code Conventions
- Use function components + Hooks
- File naming: PascalCase (components), camelCase (utility funcs)
- Commit style: Conventional Commits
```

**Warum dies wichtig ist:**

`CLAUDE.md` ist das "Projektgedaechtnis" von Claude Code. Bei jedem Start liest Claude diese Datei und versteht den Projekthintergrund. Das bedeutet:

- Sie muessen nicht wiederholt Framework und Technologie-Stack erklaeren
- Claude folgt Ihren Konventionen und Best Practices
- Neue Teammitglieder koennen schneller eingearbeitet werden

**Empfehlung**: Fuehren Sie `/init` sofort nach der Projektinitialisierung aus und verfeinern Sie dann die generierte Konfiguration entsprechend der Realitaet.

### Technik 6: /compact komprimiert den Kontext - Tokens sparen

Das Kontextfenster von Claude Code ist begrenzt (oft ca. 200K Tokens). Lange Konversationen verbrauchen viele Tokens, erhoehen die Kosten und koennen wichtige fruehe Informationen aus dem Kontext draengen.

**Verwendung:**

```text
/compact
```

**Wie es funktioniert:**

`/compact` analysiert den Chatverlauf, extrahiert Schluesselinformationen (getroffene Entscheidungen, generierter Code, bestaetigte Anforderungen) und erstellt eine kurze Zusammenfassung. Spaetere Dialoge basieren auf dieser Zusammenfassung statt auf dem vollstaendigen Verlauf.

**Wann verwenden:**

- nach 5-6 Runden
- wenn Claude vorherigen Kontext zu "vergessen" scheint
- beim Wechsel zu einer neuen Unteraufgabe unter Beibehaltung wichtiger Hintergrundinformationen

**Empfehlung:**

```text
# nach langer Konversation komprimieren
/compact

# weiterarbeiten
Now that user module is done, let's build order module.
```

### Technik 7: Claude Code fuer Git-Commits nutzen

In Claude Code ist der empfohlene Commit-Workflow: Claude den Diff inspizieren und die Commit-Nachricht entwerfen lassen, dann fuehren Sie Standard-Git-Befehle aus. Dies ist klar und gibt Ihnen einen weiteren Pruefpunkt vor dem Commit.

Offizielle Referenzen:

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**Empfohlener Workflow:**

```bash
# 1. Aktuelle Aenderungen pruefen
/diff
!git status

# 2. Claude bitten zusammenzufassen und Commit-Nachricht zu generieren
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. Nach Ihrer Bestaetigung Standard-Git-Commit ausfuehren
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**Vorteile dieses Ansatzes:**

1. **Aligniert mit aktuellen offiziellen Faehigkeiten**: keine Abhaengigkeit von entfernten integrierten Befehlen
2. **Transparent**: Diff und Commit-Nachricht vor dem Einreichen pruefen
3. **Portabel**: gleicher Workflow funktioniert in anderen AI-IDEs oder mit reinem Git

**Wenn Sie "Ein-Befehl-Commit"-Erlebnis moechten:**

Claude Code empfiehlt jetzt pluginbasierte Erweiterung. Zum Beispiel bietet `commit-commands` Befehle wie `/commit-commands:commit`.

```bash
# 1. Plugin-Marktplatz-Beispiel hinzufuegen
/plugin marketplace add anthropics/claude-code

# 2. Commit-Workflow-Plugin installieren
/plugin install commit-commands@anthropics-claude-code

# 3. Plugins neu laden
/reload-plugins

# 4. Plugin-Befehl zum Committen verwenden
/commit-commands:commit
```

**Zusaetzliche Hinweise:**

- `/commit-commands:commit` wird von einem Plugin bereitgestellt, nicht von einem aktuellen Standard-integrierten Befehl
- Wenn Sie nur Aenderungen vor dem Commit inspizieren moechten, bevorzugen Sie `/diff` oder bitten Sie Claude, `git diff` zu erklaeren
- Das offizielle `/review` wurde ebenfalls als veraltet markiert; fuer aehnliche Faehigkeit verwenden Sie ein Plugin oder einen natuerlichsprachlichen Review-Workflow

### Technik 8: Shift+Tab Auto-Akzeptanz - Fluessigkeit verbessern

Standardmaessig fragt Claude vor dem Bearbeiten von Code nach Bestaetigung. Dies ist in der Lernphase nuetzlich, kann sich aber spaeter langsam anfuehlen. `Shift+Tab` aktiviert den Auto-Akzeptanz-Modus fuer schnellere Iteration.

**Verwendung:**

- `Shift+Tab` druecken -> Auto-Akzeptanz-Modus aktivieren
- `Shift+Tab` erneut druecken -> Auto-Akzeptanz-Modus beenden

**Modus-Vergleich:**

| Modus | Verhalten | Verwendungsszenario |
|------|------|----------|
| Standardmodus | Bei jeder Bearbeitung nach Bestaetigung fragen | Lernphase, wichtiger Code |
| Auto-Akzeptanz | Bearbeitungen direkt anwenden | Nach Vertrautheit, schnelle Iteration |

**Hinweise:**

- Im Auto-Akzeptanz-Modus bearbeitet Claude Dateien direkt ohne zweite Bestaetigung
- Empfohlen, mit Git zu koppeln, damit Rollback einfach ist
- Fuer sensible Operationen (Dateien loeschen, Schluesselkonfigurationen aendern) fragt Claude trotzdem

### Technik 9: Strg+C Operation abbrechen - Notbremse

Wenn Claude eine lange Aufgabe ausfuehrt oder Sie merken, dass Sie eine falsche Anweisung gegeben haben, ist `Strg+C` die Notbremse.

**Verwendung:**

- Einmal `Strg+C` druecken -> aktuell ausgefuehrte Operation abbrechen
- Zweimal `Strg+C` druecken -> Claude Code komplett beenden

**Anwendungsfaelle:**

- ein langlaufender Befehl muss unterbrochen werden
- Claude generiert grossen irrelevanten Code
- falsche Anweisung erkannt und Sie wollen sofort stoppen

**Unterschied zu doppeltem Esc:**

- `Strg+C`: laufende **Operation** stoppen (Befehl ausfuehren / Code generieren)
- `Doppeltes Esc`: **Konversationszustand** zurueckrollen (vorherige Runde rueckgaengig machen)

### Technik 10: /context Kontextnutzung pruefen - Token-Kosten optimieren

`/context` zeigt die aktuelle Sitzungskontextnutzung an und hilft Ihnen, den Token-Verbrauch zu verstehen und Kosten zu optimieren.

**Verwendung:**

```text
/context
```

**Beispielausgabe:**

```text
📊 Context Usage

Token usage: 45,230 / 200,000 (22.6%)
File references: 12 files
Conversation rounds: 8

Top token-consuming files:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Suggestions:
- Current usage is healthy, no compression needed
- To reduce usage, add node_modules into .claudeignore
```

**Wie diese Informationen nutzen:**

1. **Grosse Dateien identifizieren**: Wenn eine Datei viele Tokens verbraucht, pruefen Sie, ob sie wirklich noetig ist
2. **.claudeignore optimieren**: unzusammenhaengende Dateien ignorieren (node_modules, Build-Ausgaben usw.)
3. **Entscheiden, wann komprimiert werden soll**: Wenn die Nutzung 70% ueberschreitet, `/compact` in Betracht ziehen

### Technik 11: /resume Sitzung wiederherstellen - Multi-Task-Konversationen wechseln

Beim Bearbeiten mehrerer Aufgaben koennen Sie mehrere Konversationsfaeden haben. `/resume` laesst Sie zum vorherigen Sitzungskontext im aktuellen Chat zurueckkehren, ohne neu zu starten.

**Verwendung:**

```text
/resume
```

**Wie es funktioniert:**

Claude Code zeichnet vorherige Sitzungen automatisch auf. Wenn Sie `/resume` ausfuehren, wechselt es zum vorherigen Sitzungskontext und behaelt allen bisherigen Diskussionsinhalt und Zustand bei.

**Anwendungsfaelle:**

**Fall A: paralleles Multi-Tasking**
```text
# Aufgabe 1: Bug beheben
claude> Fix login-page validation issue
# ... eine Konversation ...

# Aufgabe 2: Feature hinzufuegen (neuer Faden)
claude> Add user registration feature
# ... eine andere Konversation ...

# Zurueck zu Aufgabe 1 wechseln
claude> /resume
# Vorherige Bugfix-Arbeit fortsetzen
```

**Fall B: kurzes Nachschlagen, dann zurueckkehren**
```text
claude> Explain this algorithm
# ... Algorithmus besprechen ...

claude> /resume
# Zurueck zur vorherigen Codierungsarbeit
```

**Fall C: nach Unterbrechung fortfahren**
```text
claude> Continue previous work
# Wenn Sie vorher unterbrochen wurden, bringt Sie /resume zurueck
```

**Vergleich mit verwandten Befehlen:**

| Befehl | Funktion | Szenario |
|------|------|----------|
| `/resume` | Zur vorherigen Sitzung im aktuellen Chat zurueckkehren | Multi-Task-Wechsel |
| `claude -c` | Juengste Sitzung fortsetzen | Wiederverbindung nach Beendigung |
| `claude -r` | Vorherige Sitzung wiederherstellen | Vorherigen Zustand nach Beendigung wiederherstellen |
| `Doppeltes Esc` | Eine Runde zurueckrollen | Juengste Konversationsrunde rueckgaengig machen |

**Vorschlaege:**

1. **Multi-Task-Verwaltung**: `/resume` ist effizienter als den Kontext neu zu erklaeren
2. **Sitzungsgedaechtnis**: jede Sitzung hat unabhaengigen Kontext; `/resume` bewahrt ihn
3. **Mit /compact verwenden**: in langen Sitzungen zuerst komprimieren, dann Sitzungswechsel durchfuehren, um den Kontext sauber zu halten

---

## Kernkonfiguration

Eine vernuenftige Konfiguration hilft Claude Code, sich besser an Ihr Projekt und Ihr Team anzupassen. Dieser Abschnitt erklaert die Rolle der Konfiguration, Prioritaet und Optimierung fuer verschiedene Verwendungsszenarien.

### Konfigurationsdateispeicherorte und Prioritaet

Claude Code verwendet eine schichtweise Konfigurationsstrategie. Unterschiedliche Ebenen haben unterschiedlichen Geltungsbereich und Prioritaet. Dies zu verstehen laesst Sie Einstellungen flexibel verwalten.

**Konfigurationsprioritaet (hoch bis niedrig):**

| Speicherort | Geltungsbereich | Zweck | In Git committen |
|------|--------|------|--------------|
| `.claude/settings.local.json` | lokales Projekt | persoenliche Praeferenzen | Nein |
| `.claude/settings.json` | Projekt geteilt | teamweite Konfiguration | Ja |
| `~/.claude/settings.json` | global | persoenliche Standards | Nein |

**Zusammenfuehrungsregeln:**

- Hoeherpriorisierte Konfiguration ueberschreibt denselben Schluessel in niedrigerer Prioritaet
- Nicht-konfliktierende Schluessel werden zusammengefuehrt
- Projektkonfiguration ueberschreibt globale Konfiguration
- Lokale persoenliche Konfiguration ueberschreibt geteilte Projektkonfiguration

**Praktische Szenarien:**

**Szenario 1: Teamprojekt**
```text
~/.claude/settings.json          # Ihre persoenlichen Standard-Editor-Einstellungen
.claude/settings.json            # Team-Codierungsstandards und Berechtigungskonfiguration
.claude/settings.local.json      # Ihre Debug-Praeferenzen und Theme-Einstellungen
```

**Szenario 2: Persoenliches Projekt**
```text
~/.claude/settings.json          # globale Standardkonfiguration
.claude/settings.json            # projektspezifische Konfiguration (z.B. spezielle Berechtigungsregeln)
```

### CLAUDE.md - Projektgedaechtnis

`CLAUDE.md` ist die wichtigste Datei fuer die Claude-Code-Konfiguration. Sie fungiert als ein "Handbuch" des Projekts. Bei jedem Start von Claude Code liest es die `CLAUDE.md` im aktuellen Verzeichnis und versteht Hintergrund, Technologie-Stack und Konventionen.

**Warum CLAUDE.md so wichtig ist:**

Stellen Sie sich vor, Sie treten einem neuen Projekt bei: Sie muessen den Technologie-Stack, Codierungskonventionen und haeufige Befehle lernen. Normalerweise dauert das Stunden an Dokumentation/Code-Ueberpruefung und Teammitglieder-Fragen. Mit `CLAUDE.md` weiss Claude dies beim Start und Sie koennen sofort effektiv zusammenarbeiten.

**Minimal lebensfaehige Vorlage:**

```text
# [Projektname]

## Technologie-Stack
- Framework: React 18 + TypeScript
- Zustandsverwaltung: Zustand
- Styling: Tailwind CSS
- Build-Tool: Vite

## Haeufige Befehle

\`\`\`bash
npm run dev      # Development-Server starten (Port 5173)
npm run test     # Unit-Tests ausfuehren
npm run build    # Produktions-Build
npm run lint     # Lint-Pruefungen
\`\`\`

## Codierungskonventionen
- Komponenten verwenden Funktionskomponenten + Hooks
- Namensgebung: PascalCase (Komponenten), camelCase (Hilfsfunktionen)
- Git-Commits verwenden Conventional Commits
- Alle API-Aufrufe muessen durch einen einheitlichen Request-Wrapper gehen
```

**Vollstaendige Vorlage (empfohlen):**

```text
# [Projektname]

## Projektuebersicht
Ein-Satz-Beschreibung der Hauptfunktionalitaet und Zielnutzer.

## Technologie-Stack
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- Zustandsverwaltung: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend (falls zutreffend)
- Laufzeitumgebung: Node.js + Express
- Datenbank: PostgreSQL + Prisma
- Authentifizierung: JWT + bcrypt

## Projektstruktur

\`\`\`
src/
├── components/      # wiederverwendbare Komponenten
├── pages/           # Seitenkomponenten
├── hooks/           # benutzerdefinierte Hooks
├── lib/             # Hilfsfunktionen
├── types/           # TypeScript-Typen
└── api/             # API-Aufrufe
\`\`\`

## Haeufige Befehle

\`\`\`bash
# Entwicklung
npm run dev              # Dev-Server starten
npm run dev:mock         # Mock-Daten in der Entwicklung verwenden

# Tests
npm run test             # Alle Tests ausfuehren
npm run test:watch       # Watch-Modus
npm run test:coverage    # Coverage-Bericht generieren

# Codequalitaet
npm run lint             # ESLint-Pruefung
npm run lint:fix         # ESLint-Probleme automatisch beheben
npm run format           # Prettier-Formatierung
npm run typecheck        # TypeScript-Typpruefung

# Build
npm run build            # Produktions-Build
npm run preview          # Produktions-Build vorschauen
\`\`\`

## Entwicklungsregeln
### Code-Stil
- Funktionskomponenten verwenden, Klassenkomponenten vermeiden
- Benutzerdefinierte Hooks fuer Logik-Abstraktion bevorzugen
- Komponenten-Props muessen TypeScript-Interfaces definieren

### Git-Workflow
- Branch-Praefix: `feature/`, `fix/`, `refactor/`
- Commit-Nachrichten folgen Conventional Commits
- PRs muessen CI und Code-Review bestehen

### Leistungsanforderungen
- Lazy Loading von Komponenten zur Reduzierung der First-Screen-Ladezeit
- WebP-Bilder verwenden und Lazy Loading aktivieren
- API-Antwortzeit unter 200ms halten

## Umgebungsvariablen

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Haeufige Probleme

### Dev-Server konnte nicht starten?

Pruefen Sie, ob Port 5173 belegt ist, oder versuchen Sie `npm run dev -- --port 3000`

### Typfehler?

Fuehren Sie `npm run typecheck` aus, um detaillierte Fehler zu sehen
```

**Schnelle Generierung von CLAUDE.md:**

Wenn Ihr Projekt existiert, aber keine `CLAUDE.md` hat, fuehren Sie `/init` aus:

```bash
claude
# innerhalb von Claude Code
/init
```

Claude analysiert Projektstruktur, package.json und aktuellen Code und generiert dann eine praktische `CLAUDE.md`. Nach der Generierung manuell ueberpruefen und anpassen.

### .claudeignore - Tokens sparen

`.claudeignore` sagt Claude Code, welche Dateien nicht in den Kontext gelesen werden sollen. Korrekte Konfiguration kann den Token-Verbrauch erheblich reduzieren (oft 40-60%) und die Antwortgeschwindigkeit verbessern.

**Warum .claudeignore noetig ist:**

Wenn Claude Code versucht, das Projekt zu verstehen, liest es zugehoerige Dateien. Einige Dateien helfen nicht beim Verstaendnis und koennen:
- viele Tokens verbrauchen (z.B. Typdefinitionsdateien in node_modules)
- Rauschen einfuehren (Logs, Build-Ausgaben)
- sensible Informationen enthalten (.env-Dateien)

**Empfohlene Konfiguration:**

```text
# ===== Abhaengigkeiten =====
# riesiger Drittanbieter-Code, normalerweise unnoetig fuer Claude-Kontext
node_modules/
.pnp/
.pnp.js

# ===== Build-Ausgaben =====
# generierte Artefakte, keine Quelllogik
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== Logs =====
# Laufzeit-Logs, kein Wert fuer Architekturverstaendnis
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== Test-Ausgaben =====
coverage/
.nyc_output/

# ===== Editor / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== Systemdateien =====
.DS_Store
Thumbs.db

# ===== Env-Dateien =====
.env
.env.local
.env.*.local

# ===== grosse binaere Assets =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== Lock-Dateien (optional) =====
# Wenn Sie nicht brauchen, dass Claude Abhaengigkeitsversionen analysiert, ignorieren Sie diese
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Konfigurationstipps:**

1. **Minimal starten**: zuerst node_modules und Build-Ausgaben ignorieren, dann Token-Nutzung beobachten
2. **Projektspezifisch anpassen**: bildreiches Projekt -> Bildformate ignorieren; Dokumentationsprojekt -> Markdown behalten
3. **Regelmaessig optimieren**: `/context` verwenden, um die top token-verbrauchenden Dateien zu sehen und zu entscheiden, ob sie ignoriert werden sollen

### Berechtigungskonfiguration

Standardmaessig fragt Claude Code vor sensiblen Operationen nach Bestaetigung. Ueber `permissions` in `settings.json` koennen Sie steuern, welche Aktionen automatisch erlaubt, bestaetigt oder komplett verweigert werden.

**Berechtigungskonfigurationsstruktur:**

```json
{
  "permissions": {
    "allow": [
      // automatisch erlauben ohne Nachfrage
    ],
    "ask": [
      // vor Ausfuehrung fragen
    ],
    "deny": [
      // komplett verweigern
    ]
  }
}
```

**Regelsyntax:**

Berechtigungsregeln verwenden das Format `ActionType(pattern)`:

| Aktionstyp | Beschreibung | Beispiel |
|----------|------|------|
| `Bash` | Terminal-Befehl ausfuehren | `Bash(git status)` |
| `Edit` | Datei bearbeiten | `Edit(src/**/*.ts)` |
| `Read` | Datei lesen | `Read(README.md)` |
| `Write` | Datei erstellen | `Write(src/components/*.tsx)` |

**Platzhalterunterstuetzung:**

- `*` entspricht beliebigen Zeichen (ohne `/`)
- `**` entspricht beliebigen Pfaden
- `?` entspricht einem Zeichen

**Beispiel einer echten Konfiguration:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**Konfigurationsvorschlaege:**

1. **Entwicklungsphase**: relativ lockere Berechtigungen fuer schnellere Iteration
2. **Produktionsphase**: strengere Berechtigungen, besonders fuer Deployment und sensible Datenoperationen
3. **Teamzusammenarbeit**: Basisregeln in geteiltem `settings.json` platzieren, persoenliche Anpassungen in `settings.local.json`

### Regeln-Verzeichnis

Bei grossen Projekten kann eine einzige `CLAUDE.md` aufgeschwemmt und schwer zu warten werden. Claude Code unterstuetzt modulare Verwaltung durch das **Regeln-Verzeichnis**, das Konventionen nach Thema in separate Dateien aufteilt.

**Verzeichnisstruktur:**

```text
.claude/
├── settings.json          # Hauptkonfigurationsdatei
├── CLAUDE.md              # Projektuebersicht (immer noch noetig)
└── rules/                 # Regeln-Verzeichnis
    ├── 00-security.md     # Sicherheitsregeln (global)
    ├── 01-coding-style.md # Codestil-Regeln (global)
    ├── 10-api.md          # API-Entwicklungsregeln
    ├── 11-frontend.md     # Frontend-Entwicklungsregeln
    ├── 12-backend.md      # Backend-Entwicklungsregeln
    └── 20-testing.md      # Testregeln
```

**Dateinamensvorschlag:**

Verwenden Sie numerische Praefixe (`00-`, `01-`), um die Ladereihenfolge zu steuern: Basisregeln zuerst, spezifische Regeln spaeter.

**Regeldateiformat:**

Regeldateien unterstuetzen YAML-Frontmatter zur Definition der Anwendbarkeit:

```markdown
---
# Optional: Pfade, auf die diese Regel angewendet wird
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Optional: Befehle, auf die diese Regel angewendet wird
commands:
  - "generate api"
  - "create endpoint"

# Optional: Regel-Prioritaet (kleinere Zahl = hoehere Prioritaet)
priority: 10
---

# API Development Rules

## Route design
- RESTful style, use plural nouns
- Versioning: /api/v1/users
- Nested resources: /api/v1/users/123/orders

## Request/response format
- Use JSON consistently
- Error response must include code and message
- Pagination response uses { data, pagination } structure

## Security requirements
- All endpoints must verify authentication (except public endpoints)
- Sensitive operations require secondary confirmation
- Implement rate limiting to prevent abuse
```

**Regelvererbung und -ueberschreibung:**

- Globale Regeln (ohne Frontmatter oder `globs: *`) gelten fuer alle Dateien
- Pfadspezifische Regeln gelten nur fuer passende Dateien
- Bei Regelkonflikten gewinnt die Regel mit hoeherer Prioritaet
- Spezifische Regeln koennen globale Regeln ueberschreiben

**Beispiele fuer Verwendungsszenarien:**

**Szenario 1: Frontend-Backend-getrenntes Projekt**
```text
.claude/rules/
├── 00-general.md          # allgemeine Standards (Commit-Nachricht, Namensgebung)
├── 10-backend.md          # Backend-Standards (NestJS-spezifisch)
├── 11-frontend.md         # Frontend-Standards (React-spezifisch)
└── 20-database.md         # Datenbank-Standards (Prisma-spezifisch)
```

**Szenario 2: Microservice-Architektur**
```text
.claude/rules/
├── 00-global/             # globale Regeln
│   ├── security.md
│   └── logging.md
├── 10-services/           # dienstspezifische Regeln
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # Regeln fuer gemeinsame Komponenten
    ├── shared-lib.md
    └── common-utils.md
```

**Migrationsempfehlung:**

Wenn Sie bereits eine sehr grosse `CLAUDE.md` haben, migrieren Sie zum Regeln-Verzeichnis wie folgt:

1. `.claude/rules/` erstellen
2. `CLAUDE.md` nach Thema aufteilen
3. Angemessenen Frontmatter pro Regeldatei hinzufuegen
4. `CLAUDE.md` als Projektuebersicht behalten und detaillierte Standards auslagern
5. Testen und sicherstellen, dass das Laden der Regeln korrekt funktioniert

---

## Kernoperationsbefehle

Claude Code bietet einen reichen Satz an Operationsbefehlen fuer effiziente AI-Zusammenarbeit. Diese Befehle fallen in Kategorien: Slash-Befehle (integrierte Funktionen), Symbolsystem (Kurzoperationen) und natuerlichsprachliche Anweisungen (taegliche Entwicklung).

### Slash-Befehl-Kurzreferenz

Slash-Befehle sind integrierte Operationen, die mit `/` beginnen. Sie bieten standardisierte Aktionen wie Projektinitialisierung, Konfigurationsverwaltung und Statuspruefungen.

| Befehl | Funktion | Verwendungsszenario |
|------|------|----------|
| `/help` | Alle Befehle anzeigen | schnelles Nachschlagen, wenn Sie Befehle vergessen |
| `/init` | Projekt initialisieren und CLAUDE.md generieren | neues Projekt oder Konfiguration hinzufuegen |
| `/plan` | Planungsmodus aktivieren | Plan erstellen vor komplexen Aufgaben |
| `/clear` | Konversationsverlauf loeschen | neu starten, wenn Kontext unuebersichtlich ist |
| `/compact` | Kontext komprimieren | Tokens sparen nach langem Chat |
| `/diff` | Interaktive Diff-Ansicht oeffnen | aktuelle uncommittete Aenderungen inspizieren |
| `/plugin` | Plugins verwalten | Commit/Review-Erweiterungen installieren |
| `/context` | Kontextnutzung anzeigen | Token-Kosten optimieren |
| `/cost` | Sitzungskosten anzeigen | Nutzungskosten ueberwachen |
| `/config` | Konfigurationspanel oeffnen | Einstellungen aktualisieren |
| `/permissions` | Berechtigungsverwaltung | Operationsberechtigungen anpassen |
| `/model` | Modell wechseln | unterschiedliche Modelle waehlen |

**Beispiel fuer Befehlskombination:**

```bash
# vollstaendiger Entwicklungsworkflow
/plan                    # 1. Plan erstellen
# ... Entwicklung ausfuehren ...
/diff                    # 2. Aenderungen inspizieren
Generate a commit message from current diff
!git add -A              # 3. Aenderungen stagen
!git commit -m "..."     # 4. Committen
/cost                    # 5. Kosten pruefen
```

### Symbolsystem

Das Symbolsystem ist Claude Codes Kurzschrift-Operationsmechanismus. Spezielle Symbole loesen schnell spezifische Faehigkeiten aus.

| Symbol | Name | Zweck | Beispiel |
|------|------|------|------|
| `/` | Slash-Befehl | integrierte Operation ausfuehren | `/help`, `/plan` |
| `@` | At-Referenz | Datei/Verzeichnis referenzieren | `@src/app.tsx` |
| `!` | Bang-Modus | Terminal-Befehl ausfuehren | `!npm test` |
| `&` | Hintergrund-Ausfuehrung | Aufgabe im Hintergrund ausfuehren | `&npm run dev` |

**Symbolkombinations-Tipps:**

```bash
# Symbole kombinieren
@src/utils.ts !npm test
# Bedeutung: utils.ts lesen, dann Tests ausfuehren

@src/components/ @src/pages/ compare structures of these two directories
# Bedeutung: zwei Verzeichnisse gleichzeitig fuer Vergleich referenzieren

!git diff @src/app.tsx explain these changes
# Bedeutung: Git-Diff inspizieren und Claude bitten, spezifische Dateiaenderungen zu erklaeren
```

### Dateioperationen

Dateioperationen sind die haeufigsten taeglichen Aktionen: Dateien lesen, bearbeiten, erstellen und loeschen.

**Dateien lesen:**

```bash
# grundlegendes Lesen
@src/app.tsx explain this file

# Lesen + Analysieren
@src/utils/helpers.ts find potential performance issues

# vergleichendes Lesen
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**Dateien bearbeiten:**

```bash
# einfache Bearbeitung
Modify formatDate in src/utils/date.ts to support Chinese locale format

# komplexe Bearbeitung
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# Stapelbearbeitung
Convert all class components under src/components/ into function components
```

**Dateien erstellen:**

```bash
# eine Datei erstellen
Create src/components/UserCard.tsx, a card component to display user info

# verknuepfte Dateien erstellen
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**Dateien loeschen:**

```bash
# mit Bestaetigung loeschen
Delete src/old-component.tsx (this component is no longer used)

# Claude fragt nach Bestaetigung und schlaegt moeglicherweise vor, zuerst Referenzen zu pruefen
```

### Git-Operationen

Claude Code integriert tief mit Git, sodass Sie den vollstaendigen Versionskontroll-Workflow abschliessen koennen, ohne das Terminal zu verlassen.

**Status pruefen:**

```bash
# Git-Status anzeigen
Show git status and uncommitted changes

# detaillierter Diff
!git diff
Explain changes in src/api/users.ts
```

**Commits erstellen:**

```bash
# Aenderungen inspizieren
/diff

# Commit-Nachricht generieren
Generate a Conventional Commit message from current git diff

# manuell committen
!git add -A
!git commit -m "..."
```

**Branch-Operationen:**

```bash
# Feature-Branch erstellen
!git checkout -b feature/user-authentication

# nach Implementierung
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Vollstaendiges Git-Workflow-Beispiel:**

```bash
# 1. Neues Feature starten
!git checkout -b feature/payment-integration

# 2. Feature entwickeln (mit Claude-Unterstützung)
Create payment module with Alipay and WeChat Pay

# 3. Tests ausfuehren
!npm test

# 4. Aenderungen inspizieren
/diff

# 5. Commit-Nachricht generieren und bestaetigen
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. Remote pushen
!git push -u origin feature/payment-integration

# 7. PR erstellen (optional, mit GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### Code-Operationen

Code-Operationen sind Claude Codes Kernstaerken: Generierung, Erklaerung, Refactoring und Optimierung.

**Code generieren:**

```bash
# Komponente generieren
Create a React Hook to manage auth state, including login/logout/permission checks

# Hilfsfunktion generieren
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# vollstaendiges Modul generieren
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**Code erklaeren:**

```bash
# Zeile-fuer-Zeile-Erklaerung
Explain src/algorithms/quicksort.ts line by line

# uebergeordnete Erklaerung
@src/services/payment.ts explain architecture design of this module

# komplexe Logik erklaeren
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**Code refactoren:**

```bash
# Architektur-Refactoring
Convert class components in src/components/ to function components

# Performance-Refactoring
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# Aufraeum-Refactoring
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**Code debuggen:**

```bash
# Fehleranalyse
npm test failed, analyze root cause and fix it

# Performance-Analyse
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# Log-Analyse
!cat logs/error.log
Analyze these error logs and identify root cause
```

### Testoperationen

Tests sind wesentlich fuer die Qualitaetssicherung. Claude Code kann beim Generieren von Tests, Ausfuehren von Tests und Analysieren von Ergebnissen helfen.

**Tests generieren:**

```bash
# Unit-Tests
Generate unit tests for src/utils/math.ts, including boundary cases

# Komponenten-Tests
Generate React Testing Library tests for src/components/UserForm.tsx

# Integrationstests
Create integration test for user registration flow from form submission to DB write
```

**Tests ausfuehren und debuggen:**

```bash
# Tests ausfuehren
!npm test

# fehlgeschlagene Tests debuggen
Analyze failure reasons and fix
@tests/auth.test.ts

# Coverage-Pruefung
!npm run test:coverage
Which code paths are not covered?
```

**Teststrategie-Vorschlag:**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### Befehlsverkettung und Workflow-Zusammensetzung

Die effizienteste Art, Claude Code zu verwenden, ist die Verkettung von Befehlen zu vollstaendigen Workflows.

**Szenario 1: Bugfix-Workflow**

```bash
# 1. Problem inspizieren
!npm test
Tests failed, analyze why

# 2. Problem lokalisieren
@src/utils/validation.ts Is the issue in this file?

# 3. Problem beheben
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. Fix verifizieren
!npm test

# 5. Fix committen
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**Szenario 2: Code-Review-Workflow**

```bash
# 1. Aenderungen inspizieren
!git diff --stat
Which files changed?

# 2. Detailliertes Review
@src/components/ Review these component changes

# 3. Verbesserungen vorschlagen
What improvements should be made based on this review?

# 4. Verbesserungen implementieren
Optimize performance of UserList component

# 5. Abschluss-Review
/diff
Review current changes and point out potential risks and improvements
```

**Szenario 3: Neues-Feature-Workflow**

```bash
# 1. Zuerst planen
/plan
I want to add shopping cart feature

# 2. Branch erstellen
!git checkout -b feature/shopping-cart

# 3. Feature implementieren
Implement step by step according to plan

# 4. Tests hinzufuegen
Generate tests for shopping cart module

# 5. Tests ausfuehren
!npm test

# 6. Code-Review
/diff
Please do a code review on current diff

# 7. Committen
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Haeufig gestellte Fragen

Bei der Verwendung von Claude Code koennen Sie auf verschiedene Probleme stossen. Dieser Abschnitt fasst haeufige Probleme und Loesungen zusammen.

### Token-Verbrauch ist zu schnell?

Schneller Token-Verbrauch ist eines der haeufigsten Probleme. Im Folgenden finden Sie eine vollstaendige Optimierungsstrategie.

**Diagnose:**

Fuehren Sie zuerst `/context` aus, um die aktuelle Token-Nutzung zu inspizieren:

```text
/context
```

Konzentrieren Sie sich auf:
- **Token-Nutzungsrate**: wenn ueber 70%, Kontextkomprimierung in Betracht ziehen
- **Anzahl referenzierter Dateien**: mehr Dateien bedeuten hoehere Token-Kosten
- **Grosse Dateien**: pruefen Sie, welche Dateien die meisten Tokens verbrauchen

**Optimierungsstrategie:**

**1. .claudeignore verbessern**

Stellen Sie sicher, dass `.claudeignore` unnoetige Dateien enthaelt:

```text
# unbedingt ignorieren
node_modules/
dist/
build/
*.log
.env

# projektspezifisch
# React
.next/
out/

# Vue
.nuxt/
.output/

# generisch
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Kontext regelmaessig komprimieren**

Lange Konversationen akkumulieren viele Tokens. Es wird empfohlen, alle 5-6 Runden `/compact` auszufuehren:

```text
# nach langer Konversation
/compact

# weitermachen
Now let's implement order module...
```

**3. Dateien praezise referenzieren**

Vermeiden Sie es, ein gesamtes Verzeichnis zu referenzieren, wenn nicht noetig:

```bash
# nicht empfohlen
@src/ Explain this code

# empfohlen
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. Vermeiden, grosse Dateien zu lesen**

Wenn `/context` zeigt, dass eine Datei viele Tokens verbraucht, erwaeen Sie:
- brauchen Sie sie wirklich?
- koennen Sie nur einen Abschnitt referenzieren?
- kann diese Datei in kleinere Module aufgeteilt werden?

### Claude versteht das Projekt nicht?

Wenn Claude ungenau antwortet oder wiederholt grundlegende Projektinformationen anfragt, fehlt ihm der Projektkontext.

**Loesungen:**

**1. CLAUDE.md generieren**

Fuehren Sie `/init` aus, um die Projektkonfiguration zu generieren:

```bash
/init
```

Nach der Generierung validieren:
- ist die Projektzusammenfassung praezise?
- ist der Technologie-Stack vollstaendig?
- sind die haeufigen Befehle korrekt?
- sind die Codierungskonventionen klar?

**2. CLAUDE.md manuell bearbeiten**

Wenn die auto-generierte Konfiguration nicht detailliert genug ist, fuegen Sie hinzu:

```markdown
## Projektspezifische Informationen

### Architekturentscheidungen
- Warum X statt Y waehlen?
- Was sind die Kern-Designmuster?

### Haeufige Fallen
- Bei der Verwendung von useEffect aufpassen...
- DB-Abfragen muessen...

### Drittanbieter-Integrationen
- Zahlungen ueber Stripe
- E-Mail ueber SendGrid
- Dateispeicherung ueber AWS S3
```

**3. Regeln-Verzeichnis verwenden**

Bei grossen Projekten Konventionen in Regeln organisieren:

```text
.claude/rules/
├── 00-architecture.md    # Architekturuuebersicht
├── 01-coding-style.md    # Codestil
├── 10-frontend.md        # Frontend-Regeln
├── 11-backend.md         # Backend-Regeln
└── 20-testing.md         # Testregeln
```

**4. Kontext im Prompt hinzufuegen, wenn noetig**

Fuer spezifische Aufgaben relevante Hintergrundinformationen anhaengen:

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### Wie kann man Operationen rueckgaengig machen?

Claude Code bietet mehrere Rollback-Mechanismen fuer verschiedene Szenarien.

**Szenario 1: Konversationszustand zurueckrollen**

Wenn Sie sich nur vertippt haben oder die Antwort nicht moegen:

```text
Doppeltes Esc  -> vorherige Runde zurueckrollen
Dreifaches Esc  -> gesamten Konversationsverlauf loeschen
```

**Hinweis**: Dies rollt nur den Konversationszustand zurueck, nicht Dateibearbeitungen.

**Szenario 2: Dateibearbeitungen rueckgaengig machen**

Wenn Claude bereits Dateien geaendert hat, manuell rueckgaengig machen:

```bash
# Aenderungen pruefen
!git status
!git diff

# eine Datei zuruecksetzen
git checkout -- src/utils/helpers.ts

# alle Arbeitsbaum-Aenderungen zuruecksetzen
git checkout -- .

# wenn bereits committet
# weiches Rollback (Aenderungen behalten)
git reset --soft HEAD~1

# hartes Rollback (Aenderungen verwerfen)
git reset --hard HEAD~1
```

**Szenario 3: praeventiv Git-Workflow verwenden**

Best Practice: Aktuelle Arbeit vor der Claude-Sitzung speichern:

```bash
# aktuellen Zustand vor dem Start speichern
git add .
git commit -m "WIP: before Claude Code session"
# oder stash verwenden
git stash push -m "before claude"

# mit Claude Code entwickeln...

# wenn das Ergebnis unbefriedigend ist, vollstaendiges Rollback
git reset --hard HEAD~1
# oder
git stash pop
```

### Zu viele Berechtigungsabfragen?

Haeufie Berechtigungsbestaetigungen beeintraehtigen die Effizienz. Eine angemessene Berechtigungskonfiguration kann den Workflow reibungsloser machen.

**Berechtigungsmodell:**

Claude-Code-Berechtigungen haben drei Stufen:
- **allow**: automatisch erlauben
- **ask**: vor Ausfuehrung fragen
- **deny**: komplett verweigern

**Optimierungskonfiguration:**

Bearbeiten Sie `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // Git-Leseoperationen
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // Tests und Pruefungen
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // Dev-Server
      "Bash(npm run dev:*)",

      // Quellcode-Bearbeitungen
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git-Schreiboperationen
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // Paketverwaltung
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // Build und Deployment
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // Konfigurationsdatei-Bearbeitungen
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // sensible Datei-Lesezugriffe
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // gefaehrliche Befehle
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // Systemdateien
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git-Interna
      "Edit(.git/*)"
    ]
  }
}
```

**Progressive Berechtigungsstrategie:**

- **Lernphase**: Standards beibehalten und verstehen, was Claude auszufuehren versucht
- **Vertrautheitsphase**: haeufige sichere Operationen (wie git status, npm test) zu allow hinzufuegen
- **Hocheffizienzphase**: feinkoernige Regeln basierend auf Projektmerkmalen erstellen

### Wie in Festlandchina verwenden?

Aufgrund von Netzwerkbeschraenkungen koennen Nutzer in China moeglicherweise nicht direkt auf offizielle Anthropic-Dienste zugreifen. Hier sind mehrere Optionen.

**Option 1: API-Proxy-Dienst verwenden**

Viele Cloud-Anbieter bieten API-Proxy-Dienste, die mit Anthropic kompatibel sind:

```bash
# Umgebungsvariablen setzen
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# Claude Code starten
claude
```

**Option 2: Drittanbieter Claude-Code-kompatible Tools verwenden**

Einige inlaendische Anbieter bieten kompatible Tools an:

```bash
# kompatible Version installieren
npm install -g @some-provider/claude-code

# API-Schluessel konfigurieren
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**Option 3: Andere AI-Codierungstools verwenden**

Wenn Claude Code nicht verfuegbar ist, erwaeen Sie Alternativen:

| Tool | Merkmale | Verwendungsszenario |
|------|------|----------|
| Cursor | VS-Code-basiert, vollstaendig | vollstaendige IDE-Erfahrung |
| GitHub Copilot | starke Autovervollstaendigung | hauptsaechlich Codevervollstaendigung |
| Tongyi Lingma | inlaendisches Produkt, stabil in China | inlaendische Entwicklungsumgebung |
| Codeium | grosszuegiges kostenloses Kontingent | begrenztes Budget |

**Option 4: AI-Agenten bei der Konfiguration helfen lassen**

Wenn Sie sich nicht sicher sind, wie man konfiguriert, fragen Sie einen AI-Agenten:

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**Haeufige Fragen:**

- **F: Trotz Konfiguration immer noch keine Verbindung?**
  - A: API-Endpunkt-Korrektheit pruefen, einschliesslich `/v1`-Pfad
  - A: API-Schluessel-Gueltigkeit und Guthaben pruefen
  - A: Pruefen, ob das lokale Netzwerk einen Proxy benoetigt

- **F: Antwort ist langsam?**
  - A: Anbieter mit geografisch naeeerem Standort waehlen
  - A: Codierungsoptimierten Plan statt generischem API-Plan verwenden
  - A: `/compact` verwenden, um Token-Verbrauch zu reduzieren

- **F: Einige Funktionen sind nicht verfuegbar?**
  - A: Einige Drittanbieter unterstuetzen moeglicherweise nicht vollstaendig alle Claude-Code-Funktionen
  - A: Anbieterdokumentation fuer den Umfang der unterstuetzten Funktionen pruefen

---

## Referenzressourcen

- [Claude Code Offizielle Dokumentation](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
