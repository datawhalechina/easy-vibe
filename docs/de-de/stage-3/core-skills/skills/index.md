# Claude Code Skills Vollstandiger Leitfaden

## Einfuhrung in Skills

**Claude Code Skills** ist eine Funktion, die spezialisiertes Wissen, Arbeitsablaufe und bewahrte Praktiken in wiederverwendbare „Fahigkeitspakete" verpackt.

Sie konnen sich Skills als „Fahigkeitsbucher" vorstellen, mit denen Claude ausgestattet wird. Wenn Sie mochten, dass er eine bestimmte Aufgabe erledigt, muss Sie nicht immer wieder die Anforderungen erklaren. Stattdessen kann er die Arbeit direkt nach den im Voraus definierten Standards des Skills ausfuhren.

### Warum brauchen wir Skills?

Bevor es Skills gab, hatte die Nutzung von Claude Code mehrere Probleme:

- **Wiederholte Anweisungen**: jedes Mal mussten Sie Dinge erklaren wie „welchen Codestil befolgen" und „wie Commit-Nachrichten geschrieben werden sollen"
- **Wissen konnte nicht akkumuliert werden**: die individuelle Erfahrung der Teammitglieder mit Claude konnte nicht geteilt werden
- **Inkonsistente Standards**: verschiedene Personen konnten mit Claude vollig unterschiedliche Ergebnisse erzielen
- **Geringe Effizienz**: haufige Aufgaben mussten jedes Mal von Grund auf neu erklart werden

Skills losen diese Probleme und verwandeln Claude in ein „erfahrenes Teammitglied" - er kennt Ihre Projektkonventionen, Arbeitsablaufe und bewahrten Praktiken.

---

## Warum jetzt Skills lernen?

**Skills werden zu einer unverzichtbaren Fahigkeit fur KI-Ingenieure** :

- **Hohes Interesse der Community**: Verwandte GitHub-Repositories gewinnen schnell an Stars. Zum Beispiel hat das OpenSkills-Projekt bereits 7,2k Stars erreicht, und Obsidian Skills gewann 6,6k Stars in nur 9 Tagen
- **Offizielle Unterstutzung**: Anthropic pflegt ein offizielles Skills-Repository, und Vercel hat Agent Skills und das Tool find-skills veroffentlicht
- **Sehr praktisch**: von Code-Reviews und Git-Operationen bis hin zur Videoerstellung und PPT-Generierung decken Skills viele Szenarien ab. Die Plattform skills.sh hat bereits beliebte Skills mit 60K+ Abonnements
- **Effizienzsteigerungen**: einmal konfigurieren, wiederholt nutzen und Claude wirklich zu Ihrem „digitalen Mitarbeiter" werden lassen
- **Anerkennung durch Entwickler**: empfohlen von mehreren technischen Communities und weithin als Schlusselwerkzeug zur Verbesserung der KI-Programmiereffizienz anerkannt

---

## Schnellstart

Jetzt, wo Sie den Wert von Skills verstehen, lassen Sie uns sie sofort ausprobieren. Dieser Abschnitt fuhrt Sie durch die Installation Ihres ersten Skills und einige interessante praktische Aufgaben, damit Sie schnell ein Gefuhl dafur bekommen.

### Schritt 1: `find-skills` installieren (dringend empfohlen)

Bevor Sie mit der Nutzung von Skills beginnen, wird dringend empfohlen, zunachst `find-skills` zu installieren. Es ist das „ultimative Skill-Suchwerkzeug" in der Welt der KI-Agenten und hat bereits uber 60K Abonnements.

**Was ist `find-skills`?**

Einfach gesagt ist `find-skills` wie eine „App-Store-Suchmaschine" fur KI-Agenten. Wenn Sie eine Aufgabe erledigen mussen, aber keinen passenden lokalen Skill haben, sucht es automatisch nach dem passendsten und empfiehlt ihn.

**`find-skills` installieren:**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

Nach der Installation konnen Sie Claude direkt sagen, was Sie brauchen, und es wird `find-skills` verwenden, um automatisch nach relevanten Skills zu suchen.

**Beispiel fur die Nutzung:**

```text
Ich muss die Leistung einer React-Komponente optimieren. Hilf mir herauszufinden, welche Skills ich verwenden kann.
```

Claude wird uber `find-skills` suchen und Ihnen dann mitteilen, welche relevanten Skills es gefunden hat, damit Sie einen zum Installieren auswahlen konnen.

**Warum zuerst `find-skills` installieren?**

Vor `find-skills`:
- manuell auf GitHub nach verwandten Skills suchen
- einzeln kopieren, installieren und konfigurieren
- wiederholt debuggen und anpassen

Nach `find-skills`:
- das Bedurfnis in einem Satz beschreiben
- die KI sucht automatisch nach dem am besten passenden Skill
- mit einem Klick installieren und sofort nutzen

**Hinweis fur Windows-Benutzer**: Die offizielle Version hat eingeschrankte Windows-Unterstützung. Die Community hat eine Windows-kompatible Version erstellt, die CMD und PowerShell unterstutzt und die chinesischsprachige Suche hinzufugt.

Windows-Version herunterladen: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Installationsschritte:
1. Die Windows-Version von `SKILL.md` herunterladen
2. Die Datei in `C:/Users/your-username/.agents/skills/find-skills` ersetzen
3. Claude Code neu starten, damit es wirksam wird

**Verwandte Links**:
- [Skills offizielle Website](https://skills.sh/) - alle verfugbaren Skills durchsuchen
- [find-skills Repository](https://github.com/vercel-labs/agent-skills) - offizieller Quellcode

### Installieren und Ihren ersten Skill ausprobieren

Nachdem Sie `find-skills` installiert haben, nutzen wir es, um einen lustigen ersten Skill zu suchen und zu installieren: das Remotion-Videoerstellungstool.

#### Schritt 1: `find-skills` verwenden, um nach Remotion zu suchen

Geben Sie Folgendes in Claude Code ein:

```text
Hilf mir, Skills im Zusammenhang mit Remotion zu finden. Ich mochte Videos erstellen.
```

Claude wird uber `find-skills` suchen und `remotion-dev/skills` empfehlen.

#### Schritt 2: Remotion Skills installieren

```bash
npx skills add remotion-dev/skills -g
```

#### Schritt 3: Damit etwas Spannendes erstellen

Remotion ist ein Framework zum Erstellen von Videos mit React-Code. Nach der Installation dieses Skills konnen Sie Claude in naturlicher Sprache bitten, Ihnen beim Schreiben von Videocode zu helfen.

**Aufgabe 1: Ein cooles animiertes Textvideo erstellen**

```text
Verwende Remotion, um ein Video zu erstellen:
- 1920x1080, 5 Sekunden
- Eine Textzeile „Hello World" fliegt von links herein
- Gleichzeitig mit Rotations- und Skalierungseffekten
- Der Hintergrund ist ein Farbverlauf
```

Claude generiert vollstandigen Remotion-Code, den Sie ausfuhren konnen, um die Animation zu sehen.

**Aufgabe 2: Ein Datenvisualisierungsvideo erstellen**

```text
Erstelle ein 10-Sekunden-Video, das Datenwachstum zeigt:
- Beginnt mit einem Balkendiagramm
- Die Balken wachsen einzeln mit Animation
- Zahlen zahlen nach oben
- Am Ende wird großer Text „300% Wachstum" angezeigt
```

**Aufgabe 3: Ein Multi-Szenen-Produkt-Demo-Video erstellen**

```text
Erstelle ein Produkt-Demo-Video mit drei Szenen:
Szene 1: Logo blendet ein, 2 Sekunden
Szene 2: Produktfunktionen erscheinen einzeln, 3 Sekunden
Szene 3: CTA-Button poppt auf, 2 Sekunden
Verwende fließende Übergange zwischen jeder Szene
```

**Den Code ausfuhren**:

Der von Claude generierte Code ist ein vollstandiges Remotion-Projekt. Sie konnen:

1. Ein neues Projekt erstellen: `npx create-video my-video`
2. Den von Claude generierten Code hineinkopieren
3. Eine Vorschau starten: `npm start`
4. Das Video rendern: `npm run build`

---

### Der zweite Skill: `find-skills` verwenden, um „das Frontend sieht schlecht aus und fuhlt sich langsam an" zu losen

#### Schritt 1: Beschreiben Sie Ihr Problem in naturlicher Sprache

Sagen Sie Claude direkt Ihr uberordnetes Bedurfnis:

```text
Meine Website sieht veraltet aus und ladet langsam. Hilf mir herauszufinden, welche Skills ich verwenden kann.
```

Oder werden Sie etwas konkreter:

```text
Ich mochte, dass das Frontend besser aussieht und nicht mehr so ruckelt.
```

#### Schritt 2: Claude wird mit `find-skills` suchen

Claude wird die skills.sh-Datenbank uber `find-skills` durchsuchen und verwandte Skills empfehlen. Fur eine Anforderung wie „besser aussehen + Langsamkeit reduzieren" wird es empfehlen:

**anthropics/skills/frontend-design** (offizieller Skill)

Dieser Skill ist speziell dafur konzipiert, das Problem von KI-generierten Oberflachen zu losen, die „schlicht und generisch aussehen", und hilft Claude bei der Gestaltung von:

- einzigartigen visuellen Stilen, die das ubliche „KI-Vorlagen-Aussehen" vermeiden
- professionellen Farbschemata und Typografie
- flussigen Animationseffekten
- produktionsreifer Codequalitat, mit sauberem Code und naturlich besseren Leistungen

#### Schritt 3: Installieren und nutzen

**Installieren**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Aufgaben, die Sie damit erledigen konnen**:

```text
Hilf mir, diese Seite neu zu gestalten. Sie soll sehr professionell aussehen und nicht wie KI-generiert wirken.
```

```text
Diese UI ist zu hässlich. Schreibe sie in einem moderneren Designstil neu.
```

```text
Erstelle ein Dashboard im Dark-Theme mit starkem Tech-Feeling.
```

Claude wird den Konventionen dieses Skills folgen und Ihnen bei der Gestaltung helfen:
- einer einzigartigen visuellen Richtung wie Minimalismus, Retro-Futurismus oder Brutalismus
- sorgfaltig ausgewahlten Farben und Schriftarten
- angemessenem Abstand und Layout
- flussiger interaktiver Animation

---

### Vergleich der beiden Skills

| Skills | Welches Problem lost es? | Spaßfaktor |
|--------|-------------|---------|
| **remotion-dev/skills** | Videos mit Code erstellen | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Das Frontend besser aussehen lassen | ⭐⭐⭐⭐ |

---

### Der dritte Skill: `frontend-slides` verwenden, um schnell schöne PPT-Praesentationen zu erstellen

#### Einfuhrung

**frontend-slides** ist ein Skill, mit dem Sie in naturlicher Sprache schöne HTML-Praesentationen erstellen konnen - selbst wenn Sie kein CSS oder JavaScript kennen.

Sein Kerngedanke ist „**zeigen, nicht erzahlen**". Wenn Sie den gewunschten Designstil nicht klar beschreiben konnen, generiert es 3 visuelle Vorschauen zur Auswahl, anstatt Sie zu zwingen, abstrakte Anforderungen wie „blauer Hintergrund, große Schrift" zu beschreiben.

#### `frontend-slides` installieren

**Methode 1: Manuell installieren**

```bash
# Das Skill-Verzeichnis erstellen
mkdir -p ~/.claude/skills/frontend-slides

# Dateien herunterladen (oder von GitHub kopieren)
# 1. https://github.com/zarazhangrui/frontend-slides besuchen
# 2. SKILL.md und STYLE_PRESETS.md herunterladen
# 3. In ~/.claude/skills/frontend-slides/ ablegen
```

**Methode 2: Mit `find-skills` installieren**

```text
Hilf mir, einen Skill zum Erstellen von PPT-Praesentationen zu finden
```

Claude wird uber `find-skills` suchen und `frontend-slides` empfehlen.

#### Nutzungsszenarien

**Szenario 1: Eine Praesentation von Grund auf erstellen**

```text
/frontend-slides

Ich mochte eine Fundraising-Pitch-Deck fur ein KI-Startup-Projekt erstellen, etwa 10 Folien
```

Claude wird Sie anleiten:
1. den Inhalt jeder Folie auszufullen, wie Titel, Stichpunkte und Bilder
2. das gewunschte Gefuhl zu beschreiben, wie beeindruckend, professionell oder warm
3. aus 3 visuellen Stilvorschauen auszuwahlen
4. die vollstandige HTML-Praesentation zu erstellen
5. eine Vorschau im Browser zu offnen

**Szenario 2: Eine PowerPoint-Datei konvertieren**

```text
/frontend-slides

Konvertiere meine presentation.pptx in eine Web-Praesentation
```

Claude wird:
1. den gesamten Text, alle Bilder und Notizen aus dem PPT extrahieren
2. den extrahierten Inhalt zur Bestatigung anzeigen
3. Sie einen visuellen Stil auswahlen lassen
4. eine HTML-Praesentation generieren, die alle Originalinhalte bewahrt

**Szenario 3: Schnell Stilvorschauen generieren**

```text
/frontend-slides

Ich mochte ein PPT fur einen technischen Vortrag erstellen. Zeige mir zuerst die verfugbaren visuellen Stile.
```

Claude wird direkt 3 Vorschauseiten in verschiedenen Stilen generieren:
- **Dunkle Themen**: Neon Cyber, Terminal Green, Deep Space
- **Helle Themen**: Paper & Ink, Swiss Modern, Soft Pastel
- **Spezielle Stile**: Brutalist, Gradient Wave

#### Integrierte visuelle Stile

| Stilname | Merkmale | Geeignete Szenarien |
|---------|------|---------|
| **Neon Cyber** | Futuristisches Tech-Feeling, Partikeleffekte | Technische Vortrage, KI-Produkte |
| **Midnight Executive** | Hochwertiges Business, vertrauenswurdig | Geschaeftsberichte, Fundraising-Pitches |
| **Paper & Ink** | Editorial-Stil, literarische Atmosphare | Content-Erstellung, Bildungssharing |
| **Swiss Modern** | Klare Geometrie, Bauhaus-Stil | Design-Portfolios, Minimalismus |
| **Brutalist** | Roh, gewagt, aufmerksamkeitsstark | Kunst-Showcase, personlicher Ausdruck |

#### Ausgabeergebnis

Die generierte Praesentation ist ein **einzelnes HTML-Dokument**, das enthalt:

- vollstandige Stil- und Interaktionscode
- Tastaturnavigation mit Pfeiltasten und Leertaste
- Touch- und Swipe-Unterstutzung
- Folienwechsel mit Mausrad
- Fortschrittsbalken und Navigationspunkte
- Scroll-ausgeloste Animationen
- responsives Design

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Alle Stile sind inline, null Abhängigkeiten -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Your Title</h1>
    </section>
    <!-- Weitere Folien... -->
</body>
</html>
```

#### Warum empfehlen wir es?

1. **Null Abhangigkeiten**: eine einzige HTML-Datei, die sich auch in 10 Jahren noch offnen lasst
2. **Visuelle Entdeckung**: muss den Design nicht beschreiben, wahlen Sie einfach, was Ihnen gefallt
3. **PPT-Konvertierung**: bewahren Sie Ihren bestehenden Inhalt und geben Sie ihm eine bessere visuelle Hulle
4. **Produktionsreifer Code**: zuganglich, klar kommentiert und einfach anzupassen

**Verwandte Links**:
- [frontend-slides GitHub-Repository](https://github.com/zarazhangrui/frontend-slides) - 6,1k+ Stars
- [Online-Vorschau-Beispiel](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### Vergleich der drei Skills

| Skills | Welches Problem lost es? | Spaßfaktor | Praktikabilitat |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | Videos mit Code erstellen | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Das Frontend besser aussehen lassen | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Schnell schöne PPTs erstellen | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### Wie man sie nach der Installation nutzt

Nach der Installation benotigen Sie keine zusatzliche Konfiguration. Wenn Sie Claude bitten, eine verwandte Aufgabe auszufuhren, ruft es automatisch den entsprechenden Skill auf.

Installierte Skills anzeigen:

```bash
npx skills list
```

---

## Was sind Skills?

### Kernkonzept

**Skills sind „Fahigkeitspakete", die im Dateisystem gespeichert sind** und konnen Folgendes umfassen:

- **SKILL.md**: die Definitionsdatei des Skills, obligatorisch
- **scripts/**: Hilfsskripte, optional
- **templates/**: Ausgabevorlagen, optional
- **references/**: Referenzdokumente, optional

### Skills vs. Prompts

Sie fragen sich vielleicht: Was ist der Unterschied zwischen Skills und dem direkten Senden von Prompts an Claude?

| Prompts | Skills |
|--------|--------|
| Vorubergehend, muss jedes Mal wiederholt werden | Dauerhaft, einmal schreiben und oft wiederverwenden |
| Leben im Konversationsverlauf und verbrauchen Tokens | Bei Bedarf geladen und sparen Tokens |
| Konnen nicht sitzungsuebergreifend geteilt werden | Konnen im Team geteilt werden |
| Schwer zu versionieren | Konnen mit Git verwaltet werden |

### Zwei Arten von Skills

**Globale Skills (personlich)** :
- Speicherort: `~/.claude/skills/`
- Geltungsbereich: alle Projekte
- Geeignete Szenarien: allgemeine personliche Fahigkeiten

**Projekt-Skills (Team)** :
- Speicherort: `projektverzeichnis/.claude/skills/`
- Geltungsbereich: das aktuelle Projekt
- Geeignete Szenarien: Team-Sharing und projektspezifische Konventionen

### Wie Skills funktionieren

Wenn Claude Code startet, wird es:

1. die Skills-Verzeichnisse scannen
2. jede `SKILL.md`-Datei analysieren
3. die YAML-Frontmatter-Metadaten extrahieren
4. den Skill-Inhalt in seine „Wissensbasis" aufnehmen
5. automatisch Trigger basierend auf der Beschreibung zuordnen

---

## `SKILL.md`-Dateistruktur

### Grundstruktur

Ein vollstandiges Skill-Verzeichnis sieht so aus:

```text
my-skill/
├── SKILL.md          # Obligatorisch: Skill-Definitionsdatei
├── scripts/          # Optional: Hilfsskripte
├── templates/        # Optional: Ausgabevorlagen
├── references/       # Optional: Referenzdokumente
└── examples/         # Optional: Beispieldateien
```

### `SKILL.md`-Vorlage

Die `SKILL.md`-Datei besteht aus zwei Teilen:

**Teil 1: YAML-Frontmatter (Metadaten)**

```yaml
---
name: skill-name              # Skill-Name, wird zum /skill-name-Befehl
description: short description # Wird fur Claudes automatische Trigger-Zuordnung verwendet
category: development         # Kategorie
tags:                         # Tags
  - code
  - automation
---
```

**Teil 2: Markdown-Inhalt (Anweisungen)**

```markdown
# Skill Title

## Use cases
When to use this skill

## Execution steps
1. Step one
2. Step two

## Notes
- Note 1
- Note 2
```

### Erklarung der Schlussfelder

| Feld | Obligatorisch | Erklarung |
|------|------|------|
| `name` | Ja | Der Skill-Name. Nur Kleinbuchstaben, Ziffern und Bindestriche sind erlaubt |
| `description` | Ja | Die Skill-Beschreibung. Je spezifischer, desto leichter kann Claude automatisch zuordnen |
| `category` | Nein | Kategorie-Label |
| `tags` | Nein | Zusatzliche Kategorie-Labels |
| `allowed-tools` | Nein | Tools, die ohne zusatzliche Berechtigung verwendet werden durfen |

---

## Skills vs. MCP: Was ist der Unterschied?

Viele Anfanger verwechseln Skills und MCP, aber es sind vollig unterschiedliche Dinge.

### Kernunterschiede

| Dimension | Skills | MCP |
|------|--------|-----|
| **Natur** | Wissen und Arbeitsablaufe | Werkzeuge und Schnittstellen |
| **Was es bietet** | Sagt der KI „wie es geht" | Gibt der KI „was sie nutzen kann" |
| **Speicherort** | `skills/`-Verzeichnis | MCP-Server |
| **Konfigurationsformat** | Markdown-Dateien | JSON-Konfigurationsdateien |
| **Trigger-Methode** | `/skill-name` oder automatische Erkennung | Automatisch uber Konfiguration geladen |

### Eine intuitive Analogie

Wenn Claude ein „Arbeiter" ware:

- **MCP** waren die „Werkzeuge", die dem Arbeiter gegeben werden, wie ein Schraubenschlussel, ein Computer und Zugangsberechtigungen
- **Skills** waren das „Bedienungshandbuch", das dem Arbeiter gegeben wird, wie man ein Code-Review durchfuhrt oder Code einreicht

### Ihre Beziehung

Skills und MCP stehen nicht in Konkurrenz zueinander. Sie erganzen sich:

```text
Benutzeraufgabe -> Claude erkennt die Anforderung
               ↓
        Relevante Skills laden (weiß, wie es geht)
               ↓
        Werkzeuge uber MCP aufrufen (hat Werkzeuge zur Verfugung)
               ↓
        Aufgabe erledigen
```

### Beispiel

**Szenario: Code-Review**

- **Skills** definieren die Review-Schritte, die Checkliste und das Ausgabeformat
- **MCP** bietet die Fahigkeit, auf GitHub-PRs zuzugreifen und Code-Diffs abzurufen

Zusammenarbeit: Skills sagen Claude „wie man reviewed", und MCP gibt Claude „die Fahigkeit, auf den Code zuzugreifen".

### Empfehlung zur Auswahl

| Ihr Bedarf | Empfohlene Losung |
|----------|----------|
| Muss einen Arbeitsablauf definieren | Skills verwenden |
| Muss auf externe Daten zugreifen | MCP verwenden |
| Braucht beides | Gemeinsam verwenden |

---

## Gängige Ressourcen zum Erhalten von Skills

### Offizielle Ressourcen

- [Anthropic offizielles Skills-Repository](https://github.com/anthropics/skills) - eine offiziell gepflegte Skills-Sammlung
- [Claude Code offizielle Docs - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - offizielle Dokumentation

### GitHub-Community-Ressourcen

| Repository | Beschreibung |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Gepflegt von Boris Cherny, Leiter von Claude Code, inklusive Skills, Agents, Hooks und mehr |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Umfassendes Toolkit mit vorkonfigurierten Skills |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Kuratierte Skills-Ressourcenliste |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 professionelle Skills und 300+ Referenzdokumente |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Ausgewahlte Open-Source-Sammlung |

### Wie man Community-Skills installiert

Mit `find-skills` mussen Sie Claude nur sagen, was Sie brauchen, und es sucht automatisch und empfiehlt:

```text
Hilf mir, einen Skill im Zusammenhang mit React-Leistungsoptimierung zu finden
```

Claude wird die skills.sh-Datenbank uber `find-skills` durchsuchen, dann die relevantesten Skills auflisten, und Sie konnen einen zum Installieren auswahlen.

**Suchtipps** :

- verwenden Sie spezifische Schlussworter: „react testing" ist besser als „testing"
- kombinieren Sie „Bereich + Aktion": „nextjs deploy", „typescript lint"
- priorisieren Sie Skills mit hohen Installationszahlen, da 10K+ in der Regel bewahrt bedeutet
- beobachten Sie die Trendliste, um aufstrebende Skills zu entdecken

---

## Wie man eigene Skills erstellt

Es gibt zwei Methoden zum Erstellen von Skills: Claude direkt bitten, einen fur Sie zu erstellen, oder das dedizierte `skill-creator`-Tool verwenden.

### Methode 1: Claude direkt bitten, Ihnen beim Erstellen zu helfen

Dies ist der einfachste Ansatz. Sagen Sie Claude einfach Ihr Bedurfnis in naturlicher Sprache.

**Beispiel** :

```text
Bitte hilf mir, einen Skill namens „format-code" zu erstellen, um Code automatisch zu formatieren.

Anforderungen:
1. Automatisch die Programmiersprache erkennen
2. Die entsprechenden Formatierungsregeln anwenden
3. Den Diff vor und nach der Formatierung zuruckgeben
```

Claude wird automatisch:
1. die Verzeichnisstruktur erstellen
2. die `SKILL.md`-Datei generieren
3. den YAML-Frontmatter ausfullen
4. den Skill-Inhalt schreiben

**Geeignete Szenarien** :
- schnelles Erstellen einfacher Skills
- Sie wissen, was Sie wollen, sind aber nicht mit dem `SKILL.md`-Format vertraut
- Sie mochten schnell iterieren und andern

### Methode 2: `skill-creator` verwenden

`skill-creator` ist ein dediziertes Werkzeug zum Erstellen von Skills. Es fuhrt Sie Schritt fur Schritt durch den Prozess.

**Installieren** :

```bash
npx skills add anthropics/skills@skill-creator -g
```

Oder das gesamte offizielle Skills-Repository installieren:

```bash
npx skills add anthropics/skills -g
```

**Verwenden** :

```text
/skill-creator
```

Füllen Sie dann die Eingabeaufforderungen aus:
- Skill-Name
- Funktionsbeschreibung
- Nutzungsszenarien
- Ausfuhrungsschritte

`skill-creator` wird:
1. Sie anleiten, den Zweck des Skills zu klaren
2. einen Entwurf von `SKILL.md` generieren
3. Testfalle erstellen
4. eine Evaluierung durchfuhren und optimieren

**Geeignete Szenarien** :
- komplexe Skills erstellen
- einen standardisierteren Erstellungsprozess benotigen
- den Skill testen und verifizieren mochten

### Vergleich der beiden Methoden

| Methode 1: Direkte Erstellung | Methode 2: `skill-creator` |
|-----------------|---------------------|
| Schnell und einfach | Gefuhrte Schritte |
| Fur einfache Skills geeignet | Fur komplexe Skills geeignet |
| Direkt im Gesprach abgeschlossen | Standardisierter Prozess |
| Flexible Änderung | Inklusive Tests und Verifikation |

### Tipp: Wie man eine gute Anforderung schreibt

**Eine gute Anforderungsbeschreibung** :

```text
Erstelle einen „git-commit"-Skill, der Code automatisch committet.

Ausfuhrungsschritte:
1. Uberprufen, welche Dateien geändert wurden
2. Eine Commit-Nachricht generieren, die Conventional Commits folgt
3. git commit ausfuhren
4. Fragen, ob gepusht werden soll

Hinweise:
- Vor dem Commit auf sensible Informationen prufen
- Verzeichnisse wie dist/ oder node_modules/ nicht committen
```

**Eine schlechte Anforderungsbeschreibung** :

```text
Hilf mir, einen Skill zum Committen von Code zu schreiben
```

Das ist zu vage. Claude weiß nicht genau, was es tun soll.

---

## Gängige Skill-Beispiele

### Beispiel 1: Code-Review-Skill

Verzeichnis und Datei erstellen:

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

Verwendung:

```text
/review-pr
Please review the PR for the current branch
```

### Beispiel 2: Git Auto-Commit-Skill

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

Verwendung:

```text
/git-commit
```

### Beispiel 3: Test-Generierungs-Skill

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

Verwendung:

```text
/gen-test
Generate unit tests for src/utils.ts
```

### Beispiel 4: Dokumentations-Generierungs-Skill

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

Verwendung:

```text
/gen-readme
Generate a README document for the current project
```

---

## Fortgeschrittene Tipps

### Skills mit Hooks kombinieren

Hooks konnen automatisch Aktionen bei bestimmten Ereignissen ausfuhren. Kombiniert mit Skills ermoglichen sie eine starkere Automatisierung.

Zum Beispiel Code automatisch nach dem Speichern formatieren:

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // Call the format-code skill
      }
    }]
  }
}
```

### Skills mit Commands kombinieren

Commands sind einfache Verknüpfungsbefehle. Skills sind komplexe Arbeitsablaufe. Sie konnen zusammen verwendet werden.

### Teamzusammenarbeit

**Projekt-Skills teilen** :

1. die Skills unter `.claude/skills/` ablegen
2. sie in Git committen
3. Teammitglieder konnen sie nach dem Klonen des Projekts nutzen

**Versionskontrolle** :

- Skills konnen wie Code versioniert werden
- jeder Commit kann Anderungen an Skills erfassen
- Sie konnen zu alteren Versionen zuruckkehren

---

## Haufig gestellte Fragen

### F1: Warum wurde der Skill nicht ausgelost?

Mogliche Grunde:
- YAML-Frontmatter-Format ist falsch
- die Beschreibung ist nicht spezifisch genug
- Claude Code wurde nicht neu gestartet

Losung:
- uberprufen Sie, ob das YAML-Format korrekt ist
- verbessern Sie die Beschreibung und schließen Sie spezifische Nutzungsszenarien ein
- starten Sie Claude Code neu

### F2: Wie schreibe ich eine genaue Beschreibung?

Eine gute Beschreibung enthalt:
- die spezifische Funktion des Skills
- das Nutzungsszenario, wie „wenn der Benutzer erwahnt..."
- Ausloser-Schluesselworter

**Schlechtes Beispiel** :
```text
description: Review code
```

**Gutes Beispiel** :
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### F3: Was ist der Unterschied zwischen Skills und Commands?

| Commands | Skills |
|----------|--------|
| Einfache Verknupfungsbefehle | Vollstandige Arbeitsablaufe |
| Eine einzelne `.md`-Datei | Eine Verzeichnisstruktur (`SKILL.md` + optionale Dateien) |
| Manuell ausgelost | Konnen automatisch ausgelost werden |
| Fur einfache Operationen geeignet | Fur komplexe Prozesse geeignet |

### F4: Wie debugge ich einen Skill?

1. `/skills` verwenden, um zu uberprüfen, ob der Skill erkannt wurde
2. Den Skill-Namen direkt eingeben, um ihn manuell auszulosen
3. Uberprüfen, ob der `SKILL.md`-Inhalt korrekt ist
4. Die Claude Code-Protokolle uberprufen

---

## Referenzen

### Offizielle Ressourcen

- [Claude Code offizielle Docs - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills Standard](https://agentskills.io/)
- [Anthropic Engineering-Artikel (praktische Ideen hinter Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic offizielles Skills GitHub-Repository](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills Dokumentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Ressourcenverzeichnisse

- [skills.sh](https://skills.sh/) - Vercels Agent Skills App-Store mit einer Bibliothek von 48.000+ Skills
- [find-skills](https://github.com/vercel-labs/agent-skills) - intelligentes Skill-Suchwerkzeug mit 60K+ Abonnements
- [Skills-Marktplatz (chinesische Oberflache)](https://skillsmp.com/zh) - Community-Skills entdecken und installieren

### GitHub-Community-Projekte

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Offizielle Agent Skills Sammlung von Vercel Labs, inklusive find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Offizielle bewahrte Praktiken, gepflegt von Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Umfassendes Toolkit mit vorkonfigurierten Skills
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Kuratierte Liste ausgewahlter Skills-Ressourcen
- [superpowers](https://github.com/obra/superpowers) - Sammlung von Skills fur Automatisierungs-Workflows in der Softwareentwicklung
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 professionelle Skills und 300+ Referenzdokumente
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - Kuratierte Ressourcenliste

### Offizielle Skill-Beispiele

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - ein Skill zum Erstellen neuer Skills
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - ein Skill zum Erstellen von MCP-Servern
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - ein Skill zum Erstellen von Slack-GIFs

### Chinesische Tutorials

- [Vollstandiger Leitfaden zur erweiterten Claude Code-Konfiguration und Nutzungstipps](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - Vollketten-Praxis mit CLAUDE.md, Skills und Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Schritt-fur-Schritt-Anleitung zum Anpassen von Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Weiterfuhrendes: Der interne Mechanismus der Claude Skills

Als nachstes werden wir tiefer in die interne Funktionsweise der Claude Skills eintauchen, damit Sie nicht nur wissen, wie man sie verwendet, sondern auch verstehen, warum sie so konzipiert sind.

### Prinzipienansicht: promptbasierte dynamische Kontextinjektion

Verstehen Sie zunachst eine Schlussatsache: **Skills sind kein ausfuhrbarer Code**.

Skills sind im Wesentlichen fortgeschrittene Anweisungen oder Prompts, die bei Bedarf in Claudes Kontext „injiziert" werden. Dieses Design wird als „Prompt-based Dynamic Context Injection & Meta-Tool Architecture" bezeichnet.

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ User Request│ ───> │ LLM Matches │ ───> │ Trigger Skill│
└─────────────┘      │Description  │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Inject Full  │
                                          │ Instructions │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Execute Task │
                                          └──────────────┘
```

### Dreischichtige progressive Lade-Architektur (Token-Optimierung)

Um eine große Anzahl von Skills zu verwalten, ohne zu viele Tokens zu verbrauchen, verwendet Claude einen intelligenten dreischichtigen Lade-Mechanismus:

| Schicht | Inhalt | Wann geladen | Token-Kosten |
|------|------|----------|-----------|
| **Schicht 1: Metadaten** | YAML-Frontmatter (`name + description`) | Beim Start von Claude | ~30-50 Tokens/Skill |
| **Schicht 2: Anweisungen** | Vollstandiger `SKILL.md`-Inhalt | Wenn der Skill ausgelost wird | ~5.000 Tokens |
| **Schicht 3: Ressourcen** | Skripte, Vorlagen, Referenzen | Bei Bedarf aus dem Dateisystem abgerufen | Nicht zum Kontext hinzugefugt |

**Vorteile dieses Designs** :

- Angenommen, Sie haben 100 Skills. Beim Start werden nur etwa 3.000-5.000 Tokens fur Metadaten verbraucht
- Nur der ausgeloste Skill ladet seinen vollstandigen Inhalt
- Ressourcendateien wie Referenzdokumente werden niemals vollstandig in den Kontext geladen

**Im Vergleich zu ohne Skills** :

```text
Without Skills: every conversation needs 50,000+ tokens to describe all capabilities
With Skills: startup ~100 tokens/skill + 5,000 tokens loaded on demand
Savings: on average 40,000+ tokens saved per conversation
```

### Dualer Kontextinjektions-Mechanismus

Wenn ein Skill aktiviert wird, nimmt das System gleichzeitig zwei Änderungen vor:

**1. Konversationskontext-Injektion**

```javascript
// Was der Benutzer sieht (sichtbare Nachricht)
<command-message>The "pdf" skill is loading</command-message>

// Was die KI tatsachlich erhalt (versteckte Meta-Nachricht)
{
  isMeta: true,  // als Meta-Nachricht markiert, nicht in der UI angezeigt
  content: `
    # PDF Analysis Expert Instructions

    You are a professional PDF analysis expert. Workflow:
    1. Use pdftotext to extract text
    2. Analyze the document structure
    3. Generate a summary report
    ...
  `  // vollstandiger SKILL.md-Inhalt, moglicherweise tausende Worter
}
```

**2. Ausfuhrungskontext-Modifikation**

Zusatzlich zur Injektion von Anweisungen kann ein Skill auch Claudes Umgebung dynamisch andern:

| Änderungstyp | Beispiel | Erklarung |
|---------|------|------|
| **Werkzeugberechtigungen** | `allowed-tools: "Bash(pdftotext:*)"` | Vorubergehend Zugang zu einem bestimmten Werkzeug gewahren |
| **Modellwechsel** | Von Sonnet zu Opus wechseln | Einige komplexe Aufgaben erfordern starkere Schlusselbildungsprozesse |
| **Kontextisolierung** | Einen Kind-Sitzungsraum erstellen | Vermeidung der Verschmutzung des Hauptkonversationskontexts |

### Ein Routing-Mechanismus, der vollstandig auf LLM-Schlusselberuht

Dies ist eine sehr wichtige Designentscheidung: **Claude Skills verwendet kein fest codiertes Routing**.

| Traditioneller Ansatz | Claude Skills |
|---------|--------------|
| Embedding-Vektor-Zuordnung | Reines LLM-Schlussfolgerung |
| Klassifikator | Transformer-Vorwartsdurchlauf |
| Regex oder Schlusselwort-Zuordnung | Naturlich-Sprache-Verstandnis |
| Separater Routing-Algorithmus | Einheitliche Modellentscheidung |

**Arbeitsablauf** :

```text
1. The name and description of every Skill are formatted into the Skill tool description

2. Claude receives:
   - the user message
   - the list of available tools, including the Skill meta-tool
   - the Skill list, with name + description

3. Claude's natural language understanding matches the user's intent to a Skill description

4. When the match succeeds, it calls: command: "skill-name"
```

**Warum dieses Design?**

**Fest codiertes Routing erfordert** :
- zusatzliche Wartungskosten
- keine Fahigkeit, komplexe semantische Beziehungen zu verstehen
- Schwierigkeiten bei der Behandlung mehrerer Sprachen
- keine Unterstutzung fur unscharfe Zuordnung

**Reine LLM-Schlussfolgerung** :
- nutzt Claudes eigenes Sprachverstandnis
- behandelt automatisch mehrere Sprachen, Synonyme und unscharfe Beschreibungen
- erfordert keine zusatzliche Wartung
- macht Routing-Entscheidungen intelligenter

### Datei-Analyse-Mechanismus

**`SKILL.md`-Dateistruktur** :

```bash
my-custom-skill/
├── SKILL.md              # Obligatorisch: Kern-Definitionsdatei
├── config.json           # Optional: Metadaten-Konfiguration
├── README.md             # Empfohlen: Nutzungsdokumentation
├── scripts/              # Optional: ausfuhrbare Skripte
├── templates/            # Optional: Vorlagenordner
└── references/           # Optional: Referenzdokumente
```

**Analyseablauf** :

```text
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code startup                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Scan ~/.claude/skills/ and .claude/skills/ directories    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Use the gray-matter library to parse each SKILL.md        │
│  YAML frontmatter                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Validate required fields (name and description)           │
│  - name: max 64 characters, only lowercase letters,        │
│    numbers, and hyphens                                     │
│  - description: used for LLM automatic matching            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Extract metadata and build the Skill list                 │
│  (only load name + description, not the full body)         │
└─────────────────────────────────────────────────────────────┘
```

### Beispiel des vollstandigen Ausfuhrungsablaufs

Schauen wir uns den gesamten Ablauf an einem konkreten Beispiel an:

```text
User: "Help me analyze this PDF file"

═══════════════════════════════════════════════════════════════

Step 1: LLM decision
────────────────
Claude finds the description of the "pdf" skill in the Skill list:
  description: "Analyze PDF document content, extract text, generate a summary"

═══════════════════════════════════════════════════════════════

Step 2: System intervention
────────────────
Claude Code executes:
  1. Read ~/.claude/skills/pdf/SKILL.md
  2. Generate a visible message: "The pdf skill is loading"
  3. Generate a hidden meta-message: the full SKILL.md content
  4. Modify session permissions: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Step 3: LLM execution
────────────────
Now Claude's context contains:
  - the original user request
  - the PDF expert workflow instructions
  - access permission to the pdftotext tool

Claude executes:
  1. Use pdftotext to extract the PDF text
  2. Analyze the content structure
  3. Generate a summary report
  4. Present the result to the user

═══════════════════════════════════════════════════════════════

Step 4: Dispose after use
────────────────
After the task is completed, the full Skill content is removed from context
(only the conversation history remains, not the full Skill instruction)
```

### Wichtigste Designinnovationen

| Innovation | Traditioneller Ansatz | Skills-Ansatz | Vorteil |
|--------|---------|------------|------|
| **Quelle der Fahigkeit** | In Modellgewichten fixiert | Dynamisch geladene Prompts | Erweiterbar und aktualisierbar |
| **Token-Effizienz** | Alle Fahigkeiten bleiben immer im Speicher | Laden bei Bedarf | 80%+ Tokens sparen |
| **Wissensmanagement** | Verstreut im Konversationsverlauf | Modulares Dateisystem | Versionierbar und teilbar |
| **Lebenszyklus** | Belegt kontinuierlich Speicherplatz | Entsorgung nach Verwendung | Sauberer Kontext |

### Akademische Grundlagen

Das Design der Claude Skills basiert auf folgenden Forschungen:

| Forschungsbereich | Repräsentatives Werk | Hier angewendet als |
|---------|---------|---------|
| **Bestarkendes Lernen** | Voyager (2023) | Die Idee, eine Fahigkeitsbibliothek aufzubauen |
| **Kognitive Architektur** | ACT-R, Soar | Trennung von prozeduralem und deklarativem Gedachtnis |
| **Hierarchische Politik** | Options Framework | Dreischichtiges progressives Laden |

**Grundlegende Perspektivenanderung** :

```text
Traditional: AI needs to remember everything
      ↓
Skills: AI knows where to find specialized knowledge
      ↓
Result: more like the thinking pattern of a human expert
```

### Beziehung zum Agent Skills Standard

Claude Skills folgt dem [offenen Agent Skills Standard](https://agentskills.io/), was bedeutet:

- Plattformubergreifende Kompatibilitat: Tools wie Cursor, Windsurf und Aider unterstutzen ihn ebenfalls
- Einheitliches Dateiformat: standardisierte `SKILL.md`-Struktur
- Interoperabilitat: Skills konnen uber verschiedene Tools hinweg geteilt werden

```text
Agent Skills standard defines:
├── Required: SKILL.md file (metadata + instructions)
├── Optional: scripts/ (executable code)
├── Optional: references/ (knowledge base documents)
└── Optional: assets/ (templates and resources)
```

### Zusammenfassung: Warum ist dieses Design brillant?

1. **Entkoppelt Fahigkeit vom Modell**: spezialisiertes Wissen hangt nicht mehr vom Modelltraining ab und kann jederzeit uber Markdown-Dateien aktualisiert werden

2. **Extreme Token-Effizienz**: der dreischichtige Lade-Mechanismus stellt sicher, dass nur notwendiger Inhalt geladen wird

3. **Nutzt die eigenen Starken des LLMs**: Routing und Zuordnung basieren vollstandig auf Claudes Sprachverstandnis, ohne zusatzlichen Algorithmus

4. **Entwicklerfreundlich**: einen Skill zu erstellen erfordert nur das Schreiben von Markdown, keine Programmierung

5. **Zusammensetzbar**: Skills konnen sich gegenseitig referenzieren und kombinieren, um komplexe Arbeitsablaufe zu bilden

6. **Entsorgung nach Verwendung**: automatische Bereinigung nach Abschluss und Aufrechterhaltung eines frischen Kontexts

---

### Zusammenfassung

Skills sind der Schlussel, um Claude Code von einem „allgemeinen Assistenten" in einen „Team-Experten" zu verwandeln.

Durch Skills konnen Sie:
- Arbeitsablaufe standardisieren
- Teamwissen wiederverwenden
- die Zusammenarbeitseffizienz verbessern
- wiederholte Erklarungen reduzieren

Denken Sie daran: **wenn Sie sich dabei ertappen, dieselbe Anweisung zweimal zu wiederholen, sollten Sie die Erstellung eines Skills in Betracht ziehen**.

Jetzt gehen Sie und erstellen Ihren ersten Skill.
