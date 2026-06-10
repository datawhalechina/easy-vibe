# Claude Code Superpowers fuer Engineering-Grade-Entwicklung

## Einfuehrung in Superpowers

**Superpowers** ist ein Open-Source-Agent-Skills-Framework, erstellt von Jesse Vincent (Online-Handle: obra), speziell entwickelt, um ein Kernproblem in der KI-Programmierung zu loesen: wie man KI dazu bringt, "engineering-grade" Code statt "toy-grade" Code zu produzieren.

Stellen Sie sich einen normalen KI-Coding-Assistenten als einen "schlauen Praktikanten" vor. Er kann ausfuehrbaren Code schreiben, aber es fehlen vielleicht Tests, Dokumentation und Best-Practice-Disziplin. Superpowers ist, als wuerde man diesem Praktikanten einen "Senior-Ingenieur-Mentor" zuweisen, der ihn zwingt, einem vollstaendigen Softwareentwicklungsprozess zu folgen.

### Warum brauchen wir Superpowers?

Vor Superpowers gab es mehrere Probleme bei der Nutzung von Claude Code:

- **Chaos beim Vibe Coding**: KI beginnt direkt mit dem Codieren ohne Planung, was haeufige Nacharbeit verursacht
- **Fehlende TDD-Disziplin**: KI neigt dazu, Code zuerst zu schreiben und Tests spaeter hinzuzufuegen, oder Tests ganz zu ueberspringen
- **Codierung mit vagen Anforderungen**: Nutzer sagt "eine Login-Funktion bauen", KI startet sofort und das Ergebnis entspricht nicht dem Gewuenschten
- **Instabile Codequalitaet**: kein Code-Review-Mechanismus, also haengt die Qualitaet von der KI-"Stimmung" ab

Superpowers loest diese Probleme und verwandelt Claude in ein "diszipliniertes Entwicklungsteam." Es hilft zuerst, Anforderungen zu klaeren, dann einen Plan zu erstellen, dann mit TDD zu entwickeln und schliesslich die Qualitaet durch Code Review sicherzustellen.

---

## Schnellstart

### Schritt 1: Superpowers installieren

In Claude Code ausfuehren:

```bash
# Marktplatz hinzufuegen
/plugin marketplace add obra/superpowers-marketplace

# Superpowers installieren
/plugin install superpowers@superpowers-marketplace
```

Oder manuell klonen:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Schritt 2: Die erste Faehigkeit ausprobieren

Nutzen wir Superpowers' **Brainstorming**-Faehigkeit, um ihren Wert zu erleben.

In Claude Code eingeben:

```text
Bauen Sie mir eine Benutzer-Login-Funktion
```

**Vor Superpowers**: Claude beginnt direkt mit dem Codieren und produziert moeglicherweise etwas, das Sie nicht wirklich wollen.

**Mit Superpowers**: Claude nutzt sokratische Fragen, um Anforderungen zu klaeren:

> Ist diese Login-Funktion fuer eine Web-App oder eine mobile App?
>
> Welche Login-Methoden sind erforderlich? E-Mail/Passwort? Drittanbieter-Login (Google, GitHub)?
>
> Brauchen Sie eine "Angemeldet bleiben"-Funktion?
>
> Soll Passwort-Zuruecksetzung per E-Mail oder SMS erfolgen?
>
> ...

Diese Fragen zoegen Sie dazu, zu klaeren, was Sie tatsaechlich benoetigen, bevor codiert wird, was eine Menge ungenutzten Code verhindert.

### Schritt 3: Skill-Ausloesemechanismen verstehen

Superpowers ist kein "magischer Schalter." Es ist ein **Set von Faehigkeiten**. Zu verstehen, wie Skills ausgeloest werden, ist wichtig.

**Drei Ausloesemethoden:**

1. **Schluesselwort-Ausloesung**
   - Wenn Sie "TDD," "testgetriebene Entwicklung" oder "zuerst Tests schreiben" erwaehnen
   - Wird die `test-driven-development`-Faehigkeit aktiviert

2. **Szenario-Ausloesung**
   - Wenn Anforderungen unklar sind, fragt `brainstorming` proaktiv
   - Wenn Bugs auftreten, wird `systematic-debugging` aktiviert

3. **Manueller Aufruf**
   - Skill-Namen direkt verwenden, wie: `/test-driven-development`

#### Wichtige Klaerung: Was passiert, wenn Sie TDD nicht spezifizieren?

Das ist ein haeufiges Missverstaendnis. Lassen Sie uns klaeren:

```text
# Fall A: TDD nicht erwaehnt
"Einen Taschenrechner implementieren"
-> Claude schreibt vielleicht Tests, vielleicht auch nicht
-> Haengt von den eigenen Gewohnheiten des Modells ab

# Fall B: TDD explizit angefordert
"Einen Taschenrechner mit TDD implementieren"
-> test-driven-development-Skill wird aktiviert
-> RED-GREEN-REFACTOR wird erzwungen
```

**Der echte Wert von Superpowers**: nicht Faehigkeiten aus dem Nichts zu schaffen, sondern Disziplin zu staerken.

- Ohne den TDD-Skill: Claude Tests schreiben ist "vielleicht"
- Mit dem TDD-Skill: Claude wird gezwungen, dem TDD-Ablauf zu folgen

### Den Wert von Superpowers verstehen

Aus der obigen Erklaerung wird der Kernwert von Superpowers deutlich:

1. **Anforderungen zuerst**: `brainstorming` fragt proaktiv, wenn Anforderungen vage sind
2. **Prozessdisziplin**: `test-driven-development` erzwingt den TDD Red-Green-Refactor-Zyklus
3. **Aufgabenzerlegung**: `writing-plans` bricht grosse Projekte in kleine Aufgaben auf
4. **Qualitaetskontrolle**: `code-review`-Skills stellen Codequalitaet sicher

---

## Superpowers Kernfaehigkeiten im Detail

Superpowers enthaelt **20+ komponierbare Skills**, die den vollstaendigen Software-Lebenszyklus abdecken. Gehen wir sie nach Kategorie durch.

### Test-Skills

#### test-driven-development

**Ausloesung**: Schluesselwoerter wie "TDD," "testgetriebene Entwicklung" oder "zuerst Tests schreiben" erwaehnen.

**Was dieser Skill tut**: Erzwingt, dass Claude dem TDD Red-Green-Refactor-Zyklus folgt, anstatt "vielleicht spaeter Tests zu schreiben."

**Traditioneller Ansatz** (haeufige Probleme):
1. Code direkt schreiben
2. Einen schnellen manuellen Test durchfuehren
3. Bugs finden und Code flicken
4. Wiederholen... (Tests? Vielleicht naechstes Mal)

**TDD-Ansatz** (nach Skill-Aktivierung):
1. RED: Zuerst einen fehlschlagenden Test schreiben
2. GREEN: Den minimalen Code schreiben, um den Test zu bestehen
3. REFACTOR: Refactoren, waehrend Tests bestehen bleiben
4. Wiederholen

**Beispielnutzung**:

```text
Ein Benutzer-Authentifizierungsmodul mit TDD implementieren
```

Claude wird:
1. Zuerst Tests schreiben (Benutzername/Passwort-Validierung, Token-Generierung usw.)
2. Tests ausfuehren und bestätigen, dass alle fehlschlagen (RED)
3. Minimale Implementierung schreiben
4. Tests ausfuehren und bestätigen, dass sie bestehen (GREEN)
5. Code refactorn und geteilte Logik extrahieren
6. Tests erneut ausfuehren und bestätigen, dass sie bestehen (REFACTOR)

> **Hinweis**: Wenn Sie "TDD" nicht erwaehnen, schreibt Claude vielleicht Tests oder vielleicht nicht. Die Rolle des Skills ist es, **Prozessdisziplin zu erzwingen**, damit Tests nicht "vergessen" werden.

### Debugging-Skills

#### systematic-debugging

Wenn Bugs auftreten, versuchen menschliche Entwickler oft zufaellige Fixes. Superpowers erzwingt eine vierstufige Ursachenanalyse:

**Stufe 1: Problem reproduzieren**
- Bestätigen, dass der Bug konsistent reproduzierbar ist
- Exakte Reproduktionsschritte aufzeichnen

**Stufe 2: Ursache isolieren**
- Den Bereich mit binaersuchartiger Eingrenzung verkleinern
- Logs hinzufuegen, um problematischen Code zu lokalisieren

**Stufe 3: Hypothesen validieren**
- Ursachen-Hypothesen aufstellen
- Validierungsexperimente entwerfen

**Stufe 4: Reparieren und verifizieren**
- Den Fix implementieren
- Bestätigen, dass der Bug behoben ist
- Regressionstests hinzufuegen

#### verification-before-completion

Dieser Skill verhindert, dass Claude aufhoert, wenn Dinge nur "fast gut genug" aussehen. Vor der Fertigstellungserklaerung verlangt er von Claude:

1. Alle Tests auszufuehren
2. Schluesselfunktionen manuell zu testen
3. Codequalitaet zu pruefen (Lint)
4. Zu bestaetigen, dass die Dokumentation aktualisiert ist

### Kollaborations-Skills

#### brainstorming

Dies ist einer der interessantesten Superpowers-Skills. Er nutzt sokratisches Fragen, um Anforderungen zu klaeren.

**Wie es funktioniert**: Wenn Sie eine vage Anforderung stellen, beginnt Claude nicht direkt mit dem Codieren. Er stellt Fragen:

```text
Sie: Ein Blog-System bauen

Claude:
- Fuer wen ist dieser Blog? Technische Leser oder allgemeine Leser?
- Soll Markdown-Bearbeitung unterstuetzt werden?
- Brauchen Sie Kommentare?
- Brauchen Sie Suche?
- Einzelner Nutzer oder mehrere Autoren?
- ...
```

Diese Fragen zoegen Sie dazu, darueber nachzudenken, welche Funktionalitaet tatsaechlich benoetigt wird, was viele ungenutzte Features vermeidet.

#### writing-plans

Dieser Skill zerlegt grosse Aufgaben in kleine Aufgaben, die jeweils in 2-5 Minuten abgeschlossen werden koennen.

**Beispiel**:

```text
writing-plans verwenden, um die Entwicklung einer Todo-API zu planen
```

Claude wird einen detaillierten Plan generieren:

```markdown
# Implementierungsplan

## Aufgabe 1: Datenbankschema entwerfen (geschaetzt 5 Minuten)
- todos-Tabelle erstellen
- Felder definieren: id, title, completed, createdAt

## Aufgabe 2: Express-Routen erstellen (geschaetzt 10 Minuten)
- POST /todos - Aufgabe erstellen
- GET /todos - Aufgaben auflisten
- GET /todos/:id - eine Aufgabe abrufen
- PUT /todos/:id - aktualisieren
- DELETE /todos/:id - loeschen

## Aufgabe 3: Eingabevalidierung hinzufuegen (geschaetzt 10 Minuten)
- title darf nicht leer sein
- completed muss boolean sein

## Aufgabe 4: Tests schreiben (geschaetzt 15 Minuten)
- Tests fuer jeden Endpunkt schreiben
- Randfaelle abdecken

## Aufgabe 5: Server starten und verifizieren (geschaetzt 5 Minuten)
- Tests ausfuehren
- API manuell testen

Abnahmekriterien:
- Alle Tests bestehen
- curl-Test fuer jeden Endpunkt erfolgreich
```

#### executing-plans

Dieser Skill fuehrt einen Plan chargenweise aus und pausiert an jedem Kontrollpunkt zur Bestaetigung.

**Nutzungsbeispiel**:

```text
Den obigen Plan ausfuehren und nach jeder abgeschlossenen Aufgabe pausieren
```

Claude wird:
1. Aufgabe 1 abschliessen, dann pausieren: `Datenbankschema erledigt. Fortfahren?`
2. Nach Ihrer Bestaetigung Aufgabe 2 abschliessen und erneut pausieren
3. Und so weiter

Das laesst Sie die Richtung in jeder Phase verifizieren und verhindert spaete Entdeckung von Abweichungen.

#### dispatching-parallel-agents

Dieser Skill kann mehrere Sub-Agenten parallel starten.

**Anwendungsfall**: Wenn Sie mehrere unabhaengige Aufgaben gleichzeitig bearbeiten muessen.

```text
Parallele Agenten verwenden zum Abschliessen von:
- Agent A: Backend-APIs schreiben
- Agent B: Frontend-Komponenten schreiben
- Agent C: Tests schreiben
```

Jeder Agent arbeitet in seiner eigenen isolierten Umgebung ohne Behinderung.

#### subagent-driven-development

Dieser Skill startet einen unabhaengigen Sub-Agenten fuer jede kleine Aufgabe.

**Vorteile**:
- Jeder Sub-Agent hat einen isolierten Kontext
- Das Scheitern einer Aufgabe beeinflusst nicht andere
- Mehrere Aufgaben koennen parallel laufen

#### using-git-worktrees

Dieser Skill nutzt Git Worktree, um isolierte Entwicklungsumgebungen zu erstellen.

**Vorteile**:
- Mehrere Features koennen parallel entwickelt werden
- Jedes Worktree ist unabhaengig
- Keine gegenseitigen Konflikte

### Code-Review-Skills

#### requesting-code-review

Nach Abschluss des Codes fordert dieser Skill automatisch ein Code Review an.

```text
Automatisch Code Review nach Abschluss der Funktion ausloesen
```

#### receiving-code-review

Dieser Skill definiert, wie Review-Feedback empfangen und verarbeitet wird.

**Review-Workflow**:
1. Code einreichen
2. Review automatisch ausloesen
3. Pruefer prueft Codequalitaet, Sicherheit und Testabdeckung
4. Pruefer gibt Verbesserungsvorschlaege
5. Probleme beheben
6. Erneut pruefen bis zur Genehmigung

---

## Vollstaendiger Superpowers-Workflow

Die wahre Staerke von Superpowers kommt von der Kombination mehrerer Skills zu einem vollstaendigen Entwicklungs-Workflow.

### Standard-Entwicklungs-Workflow

```text
1. Brainstorming
   ↓ Echte Anforderungen durch Q&A klaeren

2. Designdokument
   ↓ Design in Bloecken praesentieren und auf Bestaetigung warten

3. Writing Plans
   ↓ In 2-5 Minuten Aufgaben aufbrechen

4. Subagent-Entwicklung
   ↓ Isolierten Sub-Agenten pro Aufgabe starten
   ↓ Zwei-Stufen-Review: Spezifikationskonformitaet + Codequalitaet

5. TDD
   ↓ RED-GREEN-REFACTOR erzwingen

6. Code Review
   ↓ Qualitaetsgate

7. Fertig
```

### Praktisches Beispiel: Ein Benutzer-Authentifizierungssystem mit Superpowers bauen

Lassen Sie uns den Superpowers-Workflow an einem vollstaendigen Beispiel erleben.

#### Schritt 1: Anforderungen mit Brainstorming klaeren

```text
Ich brauche ein Benutzer-Authentifizierungssystem
```

Claude wird fragen:
- Ist es eine Web-App oder mobile App?
- Welche Login-Methoden sind erforderlich?
- Wird Passwort-Zuruecksetzung benoetigt?
- Wird "Angemeldet bleiben" benoetigt?
- ...

#### Schritt 2: Ein Designdokument generieren

Nachdem Anforderungen bestaetigt sind, wird Claude ein Designdokument erstellen:

```markdown
# Benutzer-Authentifizierungssystem-Design

## Funktionale Anforderungen
1. Benutzerregistrierung (E-Mail + Passwort)
2. Benutzer-Login
3. Passwort-Zuruecksetzung (E-Mail)
4. Angemeldet bleiben (JWT + Refresh-Token)

## Technologieauswahl
- Backend: Node.js + Express
- Datenbank: SQLite
- Auth: JWT
- Verschluesselung: bcrypt

## API-Design
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Schritt 3: Den Implementierungsplan schreiben

```text
writing-plans verwenden, um den Implementierungsplan zu erstellen
```

Claude wird eine detaillierte Aufgabenliste generieren, jede Aufgabe in 2-5 Minuten abschliessbar.

#### Schritt 4: Entwicklung ausfuehren

```text
Den obigen Plan mit TDD ausfuehren
```

Claude wird:
1. Zuerst Tests schreiben
2. Bestaetigen, dass Tests fehlschlagen (RED)
3. Implementierungscode schreiben
4. Bestaetigen, dass Tests bestehen (GREEN)
5. Code refactorn (REFACTOR)

#### Schritt 5: Code Review

Nach Abschluss wird automatisch ein Code Review ausgeloest, das prueft:
- Codequalitaet
- Sicherheit (SQL-Injection, XSS usw.)
- Testabdeckung
- Dokumentationsvollstaendigkeit

---

## Superpowers vs. direkte Claude-Code-Nutzung

| Dimension | Direkte Claude-Code-Nutzung | Mit Superpowers |
|------|---------------------|-----------------|
| **Anforderungsklaerung** | KI beginnt direkt mit dem Codieren | Sokratische Fragen klaeren zuerst Anforderungen |
| **Entwicklungsprozess** | Frei formlos je nach KI | TDD Red-Green-Refactor erzwungen |
| **Aufgabenmanagement** | Einmalige Fertigstellung | In kleine Aufgaben mit Kontrollpunkten aufgeteilt |
| **Codequalitaet** | Haengt vom KI-Urteil ab | Code Review erzwungen |
| **Vorhersagbarkeit** | Instabile Ergebnisse | Wiederholbarer Prozess |
| **Am besten fuer** | Einfache Aufgaben, Prototyp-Validierung | Komplexe Projekte, Produktionscode |

### Visuelle Metapher

Wenn Claude Code ein "schlauer Praktikant" ist:

- **Direkte Nutzung**: dem Praktikanten sagen "baue eine Login-Funktion" und er faengt sofort an zu coden, moeglicherweise etwas produzierend, das Sie abseits vom Ziel finden
- **Mit Superpowers**: dem Praktikanten einen Senior-Mentor zuweisen, der Anforderungen klaert, Plaene erstellt und Codequalitaet prueft

---

## Installation und Konfiguration im Detail

### Methode 1: Ueber den Marktplatz (empfohlen)

```bash
# Marktplatz hinzufuegen
/plugin marketplace add obra/superpowers-marketplace

# Installieren
/plugin install superpowers@superpowers-marketplace

# Installation verifizieren
/skills
```

### Methode 2: Manuelles Klonen

```bash
# Verzeichnis erstellen
mkdir -p ~/.claude/skills

# Repository klonen
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Methode 3: Projektebenen-Installation

Wenn Sie Superpowers in einem bestimmten Projekt verwenden moechten:

```bash
# Im Projektverzeichnis
mkdir -p .claude/skills

# Klonen oder kopieren
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Das ermoeglicht Teammitgliedern, dieselbe Superpowers-Konfiguration zu teilen.

---

## Haeufige Skills Schnellreferenz

| Skill-Name | Funktion | Anwendungsfall |
|---------|------|---------|
| `brainstorming` | Anforderungen durch sokratisches Fragen klaeren | Wenn Anforderungen unklar sind |
| `writing-plans` | Aufgaben in kleine Schritte aufbrechen | Vor dem Start grosser Projekte |
| `executing-plans` | Plan mit Kontrollpunkten ausfuehren | Waehrend der plangesteuerten Entwicklung |
| `test-driven-development` | TDD Red-Green-Refactor-Zyklus | Fuer alle Funktionsentwicklungen |
| `systematic-debugging` | Vierstufige Ursachenanalyse | Wenn Bugs auftreten |
| `verification-before-completion` | Vor-Fertigstellung-Verifikation | Bei Aufgabenabschluss |
| `requesting-code-review` | Code Review anfordern | Vor Code-Einreichung |
| `subagent-driven-development` | Subagenten-gesteuerte Entwicklung | Parallele Aufgaben |
| `using-git-worktrees` | Git-Worktree-Isolation | Parallele Feature-Entwicklung |

---

## Best Practices

### 1. Klare Ausloeseschluesselwoerter verwenden

Superpowers-Skills werden durch Schluesselwoerter ausgeloest. Lernen Sie haeufige Ausloesewoerter:

| Skill | Ausloese-Schluesselwoerter |
|------|-----------|
| `test-driven-development` | "TDD", "testgetrieben", "zuerst Tests schreiben" |
| `brainstorming` | Automatisch ausgeloest, wenn Anforderungen unklar sind |
| `systematic-debugging` | "debuggen", "Bug", "funktioniert nicht" |
| `writing-plans` | "einen Plan machen", "Planung" |

### 2. Superpowers verwenden, wenn Prozessdisziplin erforderlich ist

- Produktionsgerechte Codeentwicklung -> "TDD" erwaehnen
- Anforderungen sind unklar -> `brainstorming` klaeren lassen
- Komplexes Projekt -> `writing-plans` zur Aufgabenzerlegung nutzen

### 3. Nicht fuer einfache Aufgaben erzwingen

Wenn es ein schneller Prototyp oder ein Einweg-Skript ist, benoetigen Sie nicht den vollstaendigen Prozess. Superpowers ist am besten geeignet fuer Code, der langfristig gewartet werden muss.

### 4. Skills koennen kombiniert werden

```text
Benutzerauthentifizierung mit TDD implementieren und nach Abschluss ein Code Review durchfuehren
```

Dies loest sowohl `test-driven-development` als auch `code-review`-Skills aus.

---

## Haeufig gestellte Fragen

### F1: Muss ich "TDD" spezifizieren, wenn ich Superpowers verwende?

**Nicht erforderlich.**

Superpowers ist ein Skill-Set und jeder Skill hat seine eigenen Ausloesebedingungen:
- "TDD verwenden" sagen -> loest `test-driven-development` aus
- TDD nicht sagen -> Claude schreibt vielleicht Tests oder nicht (haengt vom Modellverhalten ab)

Superpowers existiert, um **Prozessdisziplin zu erzwingen**, nicht um Faehigkeit aus dem Nichts zu schaffen.

### F2: Macht Superpowers die Entwicklung langsamer?

Anfangs kann es sich langsamer anfuehlen, weil:
- Anforderungsklaerung Zeit braucht
- Tests vor Code geschrieben werden
- Code Review erforderlich ist

Langfristig verbessert sich jedoch die Gesamteffizienz durch reduzierte Nacharbeit und weniger Bugs.

### F3: Brauchen kleine Projekte ebenfalls Superpowers?

 Fuer Prototyp-Validierung oder sehr einfache Aufgaben koennen Sie Claude Code direkt verwenden. Superpowers ist besser geeignet fuer:
- produktionsgerechte Projekte
- Mehrpersonen-Kollaboration
- langfristige Wartbarkeit

### F4: Was ist der Unterschied zwischen Superpowers und Skills?

| Dimension | Superpowers | Skills |
|------|-------------|--------|
| **Natur** | Vollstaendiges Entwicklungsmethodik-Framework | Wiederverwendbare Skill-Pakete |
| **Umfang** | Deckt den vollstaendigen Entwicklungsprozess ab | Fokussiert auf spezifische Funktionen |
| **Beziehung** | Superpowers nutzt Skills intern | Superpowers ist eine Sammlung von Skills |

### F5: Kann ich Superpowers-Skills anpassen?

Ja. Superpowers ist Open-Source und Sie koennen:
1. Das Repository forken
2. Bestehende Skills aendern
3. Neue Skills hinzufuegen
4. Zurueck an die Community beitragen

---

## Referenzen

### Offizielle Ressourcen

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - offizielles Repository (50.000+ ⭐)
- [Detaillierter Superpowers-Nutzungs-Tutorial](https://www.cnblogs.com/gyc567/p/19510203) - detailliertes chinesisches Tutorial
- [Superpowers-Umgebungs-Setup-Leitfaden](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - Setup-Leitfaden

### Community-Ressourcen

| Repository | Beschreibung |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | umfassendes Toolkit einschließlich TDD-Workflows |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Community-Best-Practices |

### Verwandte Artikel

- [Auf Wiedersehen Vibe Coding! Superpowers nutzen, damit Claude Code Engineering-Grade-Code schreibt](https://juejin.cn/post/7593573617648123956)
- [Wie ich Superpowers MCP nutze, um Claude Code zum Planen vor dem Codieren zu zwingen](https://juejin.cn/post/7570341520551673871)
- [Claude Code + Superpowers Anfaenger-Tutorial](https://juejin.cn/post/7594832320030638123)

---

## Zusammenfassung

Superpowers ist ein Set von **Engineering-Grade-Entwicklungs-Skills**, das Claude Code von einem "schlauen Praktikanten" zu einem "disziplinierten Entwicklungsteam" aufwertet.

### Kernbotschaften

1. **Superpowers ist ein Skill-Set, keine Magie**
   - Nach der Installation sind Skills im Hintergrund verfuegbar
   - Werden durch Schluesselwoerter oder Szenarien ausgeloest
   - Sie koennen spezifische Skills manuell aufrufen

2. **Wichtige Ausloeseformulierungen merken**
   - TDD wollen -> "TDD verwenden" sagen
   - Vage Anforderungen -> `brainstorming` fragt proaktiv
   - Bug aufgetreten -> "debuggen" erwaehnen, um `systematic-debugging` auszuloesen

3. **Bestpassende Szenarien**
   - Produktionsgerechte Codeentwicklung
   - Langfristig wartbare Projekte
   - Team-Kollaborationsprojekte
   - Schnelle Prototypen (optional)
   - Einweg-Skripte (optional)

Merken Sie sich: **Superpowers macht KI nicht schlauer; es macht KI disziplinierter.**
