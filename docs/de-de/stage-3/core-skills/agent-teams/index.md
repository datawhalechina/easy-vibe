# Vollständiger Leitfaden zu Claude Agent Teams

## Einführung in Agent Teams

**Agent Teams** ist eine revolutionäre Funktion in Claude Code, die es **mehreren unabhängigen KI-Instanzen ermöglicht, wie ein echtes Entwicklungsteam zusammenzuarbeiten**.

Stellen Sie sich vor, dass die Nutzung von Claude Code früher wie die Arbeit eines Projektmanagers mit einem einzigen, außergewöhnlich fähigen Assistenten war. Egal wie komplex die Aufgabe war, nur dieser eine Assistent hat die Arbeit erledigt. Jetzt können Sie mit Agent Teams ein vollständiges KI-Entwicklungsteam zusammenstellen: Ein Mitglied kann das Frontend übernehmen, ein anderes das Backend, ein weiteres die Tests, und sie können **gleichzeitig arbeiten, miteinander kommunizieren und bei der Bewältigung komplexer Aufgaben zusammenarbeiten**.

### Vom einzelnen Assistenten zur Teamzusammenarbeit

Bevor wir tiefer in Agent Teams eintauchen, sollten wir zunächst das Problem verstehen, das es löst.

**Einschränkungen des Einzel-KI-Modus** :

Wenn Sie eine einzelne Claude-Instanz verwenden, um ein komplexes Projekt zu bearbeiten, werden Sie auf folgende Engpässe stoßen:

- **Serieller Verarbeitungsengpass** : Die KI kann immer nur eine Sache gleichzeitig erledigen. Bei einer Projektüberarbeitung muss sie beispielsweise zuerst das Authentifizierungsmodul analysieren, dann das Datenbankmodul und schließlich das API-Modul. Diese Schritte müssen sequenziell durchgeführt werden, auch wenn sie nicht voneinander abhängig sind.

- **Kontextüberladungsproblem** : Alle Informationen befinden sich in einem einzigen Gesprächsfenster. Mit zunehmender Gesprächsdänge können wichtige frühe Details in Vergessenheit geraten, und die KI vergibt möglicherweise zuvor besprochene Schlüsselentscheidungen.

- **Einzelperspektiven-Einschränkung** : Es denkt nur eine einzige KI, daher gibt es keine Mehrwinkeldiskussion oder -validierung. Wenn komplexe Designentscheidungen anstehen, gibt es keinen „Teamkollegen", mit dem man diskutieren oder der eine andere Perspektive einbringen kann.

- **Effizienzdecke** : Große Überarbeitungen oder die Entwicklung mehrerer Module dauern lange, und es gibt keine Möglichkeit, sie durch Parallelisierung zu beschleunigen.

**Die Agent-Teams-Lösung** :

Agent Teams löst diese Probleme durch **parallele Zusammenarbeit über mehrere Instanzen** :

- **Echte parallele Arbeit** : Mehrere KIs können gleichzeitig an verschiedenen Aufgaben arbeiten. Eine kann das Frontend-UI übernehmen, eine andere die Backend-API und eine weitere das Datenbankdesign, ohne sich gegenseitig zu stören.

- **Unabhängige Kontexträume** : Jedes Teammitglied verfügt über ein eigenes vollständiges Kontextfenster von 200.000 Tokens, sodass wichtige Informationen nicht „vergessen" werden, weil das Gespräch zu lang wird.

- **Teamzusammenarbeitsfähigkeit** : Mitglieder können direkt kommunizieren, Designentscheidungen diskutieren und die Codequalität gegenseitig überprüfen, genau wie ein echtes Entwicklungsteam.

- **Signifikante Effizienzsteigerung** : Laut internen Tests von Anthropic kann die Effizienz bei großen Projektüberarbeitungen um etwa 50 % gesteigert werden.

---

## Agent Teams vs. Subagent

Bevor wir tiefer in die Architektur von Agent Teams eintauchen, sollten wir eine häufige Verwirrung klären : **Was ist der Unterschied zwischen Agent Teams und Subagent** ?

Beide Funktionen beinhalten „mehrere KIs, die zusammenarbeiten", aber ihre Zusammenarbeitsmodelle sind grundlegend verschieden und für unterschiedliche Szenarien geeignet.

### Kernunterschiede auf einen Blick

| Dimension | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **Topologie** | Stern-Topologie : Alle Subagenten berichten an den Hauptagenten | Mesh-Topologie : Mitglieder können miteinander kommunizieren |
| **Kommunikationsstil** | Der Hauptagent übergibt Informationen explizit über Prompts, Subagenten geben Ergebnisse nach Abschluss zurück | Mitglieder können direkt kommunizieren, diskutieren und koordinieren |
| **Kontextverwaltung** | Jeder Subagent hat einen unabhängigen Kontext, der Hauptagent übergibt nur die erforderlichen Informationen | Jedes Mitglied hat einen vollständig unabhängigen Kontext |
| **Parallelität** | Kann parallel laufen, aber die Zusammenarbeitskette bleibt auf den Hauptagenten zentriert | Echte parallele Entwicklung und Zusammenarbeit |
| **Aufgabenkoordination** | Der Hauptagent verteilt und koordiniert alles zentral | Mitglieder können Aufgaben autonomer übernehmen |
| **Kosten** | Nicht niedrig. Der Token-Verbrauch steigt, wenn mehrere Subagenten parallel laufen | Höher. Mitglieder laufen unabhängig und kommunizieren häufiger |

### Eine intuitive Analogie

**Subagent ist wie** : Ein Manager, der separate Aufgabenzettel für mehrere Assistenten schreibt. Jeder Assistent arbeitet unabhängig nach seinem eigenen Aufgabenzettel und gibt nach Abschluss nur das Ergebnis an den Manager zurück. Die Assistenten kommunizieren nicht direkt miteinander, und der Manager sieht den vollständigen Denkprozess der Assistenten während der Arbeit nicht.

```
Sie → Hauptagent → Subagent A : „Analysiere diese Datei"
Sie → Hauptagent → Subagent B : „Suche diese Funktion"
         ↓
    Subagent A fertig → berichtet Ergebnis an Hauptagenten
    Subagent B fertig → berichtet Ergebnis an Hauptagenten
         ↓
    Hauptagent synthetisiert die Ergebnisse → berichtet Ihnen
```

**Agent Teams ist wie** : Ein Projektleiter, der ein echtes Entwicklungsteam leitet. Teammitglieder können direkt kommunizieren, diskutieren und zusammenarbeiten, anstatt jedes Detail über den Projektleiter zu leiten.

```
Sie → Teamleiter : „Erstelle eine Benutzerauthentifizierungsfunktion"
         ↓
    Teamleiter erstellt das Team und verteilt Aufgaben
         ↓
    Teamkollege A : „@Teamkollege B, ist das API-Schnittstellendesign fertig?"
    Teamkollege B : „Ja, hier ist das Format..."
    Teamkollege C : „Ich habe die Schnittstelle überprüft und etwas gefunden, das wir besprechen sollten..."
         ↓
    Teammitglieder arbeiten zusammen, um die Arbeit abzuschließen → Teamleiter synthetisiert das Ergebnis → berichtet Ihnen
```

### Wann man welches verwendet

**Verwenden Sie Subagent, wenn** :

- Sie eine schnelle, klare Einzelaufgabe haben, wie „suche diesen Fehlercode"
- Die Aufgaben nicht stark voneinander abhängig sind
- Sie parallele Ausführung möchten, aber keine anhaltende Diskussion zwischen den Mitgliedern benötigen

**Verwenden Sie Agent Teams, wenn** :

- Sie eine komplexe Systemüberarbeitung durchführen, die mehrere Module umfasst
- Sie eine Mehrwinkelanalyse und -diskussion benötigen, wie ein Sicherheitsexperte und ein Leistungsexperte, die über eine Lösung debattieren
- Sie echte parallele Entwicklung benötigen, bei der Frontend, Backend und Tests gleichzeitig stattfinden
- Die Aufgaben häufige Koordination und Informationsaustausch erfordern

### Eine kurze Zusammenfassung

- **Subagent** : Ein Aufgabenverteilungstool, das eine große Aufgabe in kleinere Aufgaben zerlegt und diese an verschiedene „Arbeiter" verteilt
- **Agent Teams** : Ein echtes kollaboratives Team, in dem Mitglieder kommunizieren, diskutieren und zusammenarbeiten können wie ein echtes Team

---

## Kernarchitektur

Agent Teams ist nicht einfach eine „mehrere Instanzen öffnen"-Funktion. Es ist ein vollständiges **Multi-Agent-Zusammenarbeitssystem**. Um es zu verstehen, müssen wir seine Kernkomponenten und deren Zusammenspiel verstehen.

### Teamzusammensetzung

Ein Agent Team besteht aus vier Kernkomponenten, von denen jede eine eigene Verantwortung trägt und gemeinsam komplexe Aufgaben bewältigt.

**Teamleiter**

Der Teamleiter ist das „Gehirn" und der „Koordinator" des gesamten Teams. Er führt keine Codierungsaufgaben direkt aus. Stattdessen ist er verantwortlich für :

- **Anforderungsanalyse und Aufgabendekomposition** : Zerlegung der komplexen Benutzeranforderungen in mehrere parallel ausführbare Teilaufgaben
- **Teamerstellung und -verwaltung** : Entscheidung, wie viele Mitglieder benötigt werden und was jedes Mitglied tun soll
- **Aufgabenverteilung und Planung** : Zuweisung von Aufgaben an die richtigen Mitglieder und Verwaltung von Aufgabenabhängigkeiten
- **Ergebnissynthese und Qualitätskontrolle** : Sammlung der Arbeit jedes Mitglieds, Integration und Durchführung der abschließenden Überprüfung

**Teamkollegen**

Die Teamkollegen sind die eigentlichen „Entwickler", die die Arbeit erledigen. Jeder Teamkollege ist eine unabhängige Claude-Instanz :

- **Unabhängiges Kontextfenster** : Jedes Mitglied verfügt über ein vollständiges Kontextfenster von 200.000 Tokens, völlig isoliert vom Teamleiter und den anderen Mitgliedern
- **Vollständige Tool-Berechtigungen** : Sie können alle Tools wie Read, Write, Edit und Bash verwenden
- **Autonome Aufgabenübernahme** : Sie können unabhängig Aufgaben aus der gemeinsamen Aufgabenliste auswählen und beanspruchen
- **Direkte Kommunikationsfähigkeit** : Sie können direkt mit anderen Mitgliedern kommunizieren, anstatt immer über den Teamleiter zu gehen

**Aufgabenliste**

Die Aufgabenliste ist das „Projektmanagement-Tool" des Teams, ähnlich wie Jira oder Trello :

- **Aufgabenstatusverwaltung** : Jede Aufgabe hat einen klaren Status : `pending`, `in_progress` oder `completed`
- **Abhängigkeitsverwaltung** : Aufgaben können Abhängigkeiten definieren, und abhängige Aufgaben können erst starten, wenn die Voraussetzungsaufgaben abgeschlossen sind
- **Automatischer Entsperrungsmechanismus** : Wenn eine Aufgabe abgeschlossen ist, überprüft das System automatisch und entsperrt Aufgaben, die darauf warten
- **Dateisperrmechanismus** : Wenn ein Mitglied eine Aufgabe beansprucht und beginnt, wird eine Sperrdatei im Aufgabenverzeichnis erstellt, um zu verhindern, dass mehrere Mitglieder dieselbe Datei gleichzeitig bearbeiten

**Nachrichtensystem**

Das Nachrichtensystem ist das „Chat-Tool" zwischen den Teammitgliedern :

- **Punkt-zu-Punkt-Kommunikation** : Mitglied A kann eine Nachricht direkt an Mitglied B senden
- **Rundrufankündigungen** : Eine Nachricht kann gleichzeitig an alle Mitglieder gesendet werden
- **Dateisystembasiert** : Nachrichten werden als JSON-Dateien in `~/.claude/teams/{team-name}/inboxes/` gespeichert
- **Kein Netzwerk erforderlich** : Alles funktioniert vollständig über das lokale Dateisystem, ohne Netzwerkverbindung oder Port-Listening

### Zusammenarbeitsablauf

Ein typischer Agent Teams-Workflow sieht so aus :

```
Der Benutzer reicht eine komplexe Anforderung ein
       ↓
Der Teamleiter analysiert die Anforderung und zerlegt sie in Aufgaben
       ↓
Erstellt Teammitglieder und initialisiert die Aufgabenliste
       ↓
       ├─→ Teamkollege A übernimmt Aufgabe 1 ─┐
       ├─→ Teamkollege B übernimmt Aufgabe 2 ─┼→ Parallele Ausführung
       ├─→ Teamkollege C übernimmt Aufgabe 3 ─┤
       │                                       ↓
       └─────────────────────────────────────── Mitglieder koordinieren über das Nachrichtensystem
                                               ↓
                                    Wenn alle Aufgaben erledigt sind, synthetisiert der Teamleiter das Ergebnis
                                               ↓
                                    Das Endergebnis wird dem Benutzer übermittelt
```

### Dateisystemstruktur

Agent Teams erstellt dedizierte Verzeichnisse auf Ihrem lokalen Dateisystem, um den Teamstatus zu verwalten :

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Teamkonfiguration (Mitgliederliste, Modellauswahl usw.)
│       └── inboxes/
│           ├── team-lead.json   # Teamleiter-Posteingang
│           ├── teammate-1.json  # Mitglied-1-Posteingang
│           └── teammate-2.json  # Mitglied-2-Posteingang
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Detaillierte Informationen zu Aufgabe 1
        ├── task-2.json          # Detaillierte Informationen zu Aufgabe 2
        └── current_tasks/
            └── parse_if_statement.txt  # Sperrdatei, die während der Aufgabenausführung erstellt wird
```

Der Vorteil dieses Designs ist die **vollständige Transparenz** : Sie können jederzeit den Teamstatus, den Aufgabenfortschritt und die Kommunikationshistorie zwischen den Mitgliedern einsehen.

---

## Schnellstart

### Experimentelle Funktion aktivieren

Agent Teams ist derzeit eine **experimentelle Funktion** und standardmäßig deaktiviert. Um es zu verwenden, müssen Sie es zuerst aktivieren.

**Der einfachste Weg : Lassen Sie Claude Code es für Sie aktivieren**

Geben Sie dies direkt in Claude Code ein :

```
Help me enable Agent Teams in settings.json
```

Oder :

```
Enable the experimental feature agentTeams
```

Claude Code wird automatisch `~/.claude/settings.json` ändern und die folgende Konfiguration hinzufügen :

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Starten Sie Claude Code neu**

Nachdem die Konfiguration hinzugefügt wurde, **beenden Sie Claude Code vollständig und starten Sie es neu**, und die Funktion wird wirksam.

**Manuelle Konfiguration (falls die automatische Methode nicht funktioniert)** :

Sie können `~/.claude/settings.json` manuell bearbeiten und Folgendes hinzufügen oder ändern :

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Wie Sie überprüfen, ob es aktiviert ist**

Starten Sie nach dem Neustart von Claude Code eine Unterhaltung wie diese :

```
Sie : Kannst du mir helfen, ein Agent Team zu erstellen?
Claude : Ja! Ich kann dir helfen, ein Agent Team zu erstellen, um bei einer Aufgabe zusammenzuarbeiten...
```

Wenn Claude die Anfrage zum Erstellen eines Teams versteht und darauf antwortet, wurde die Funktion erfolgreich aktiviert.

### Konfiguration des visuellen Modus (optional)

Wenn Sie die Arbeit der Teammitglieder in Echtzeit sehen möchten, können Sie den **Geteiltes-Fenster-Anzeigemodus** konfigurieren.

**Lassen Sie Claude Code es für Sie konfigurieren** :

Geben Sie dies direkt in Claude Code ein :

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

Oder :

```
Configure agent-teams to use split-panes mode
```

**tmux installieren (falls Sie es nicht haben)** :

Wenn `tmux` noch nicht installiert ist, können Sie Claude Code bitten, es zu installieren :

```
Help me install tmux
```

Claude Code führt automatisch den entsprechenden Installationsbefehl für Ihr Betriebssystem aus, sei es macOS oder Linux.

**Wie das konfigurierte Ergebnis aussieht** :

Nach der Konfiguration arbeiten die Teammitglieder in verschiedenen tmux-Fenstern, und Sie können die gesamte Ausgabe gleichzeitig sehen, wie eine „Überwachungswand".

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teamkollege 1  │  Teamkollege 2  │  Teamkollege 3  │
│  Codeanalyse    │  API            │  Tests          │
│  ...            │  erstellen...   │  schreiben...   │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Manuelle Konfiguration (falls die automatische Methode nicht funktioniert)** :

Sie können `~/.claude/settings.json` manuell bearbeiten :

```json
{
  "experimental": {
    "agentTeams": true
  },
  "agent-teams": {
    "displayMode": "split-panes",
    "terminalMultiplexer": "tmux"
  }
}
```

---

### Praxisbeispiel : Ein Pokemon-artiges RPG-Spiel mit Agent Teams erstellen

Lassen Sie uns die Leistung von Agent Teams durch ein vollständiges Projekt erleben. Dieses Beispiel zeigt, wie mehrere KI-Teammitglieder zusammenarbeiten können, um ein RPG-Spiel von Grund auf zu erstellen, einschließlich eines Kampfsystems, Dialogfunktionen und Erkundungselementen.

**Projektanforderungen** :

Erstellen Sie ein Pokemon-artiges Web-RPG mit folgenden Funktionen :

- **Charaktersystem** : Der Spieler kann einen Charakter mit Level, HP, Angriff, Verteidigung und anderen Statistiken erstellen
- **Kampfsystem** : Rundenbasierte Kämpfe mit Optionen für Angriff, Fähigkeiten, Gegenstände und Flucht
- **Monstersystem** : Mehrere wilde Monster mit unterschiedlichen Attributen und Fähigkeiten
- **Dialogsystem** : NPC-Gespräche und Nebenquests
- **Kartenerkundung** : Eine einfache 2D-Karte, auf der sich der Spieler zwischen Szenen bewegen kann
- **Speichersystem** : Spielstand speichern, einschließlich Level, Position, abgeschlossene Quests und mehr
- **Soundeffekte und Animation** : Visuelle Effekte und Soundeffekte für Angriffe, Schaden und Level-Aufstiege

**Geben Sie dies in Claude Code ein** :

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene switching
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Use Framer Motion for animation
- Use Zustand for state management
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Wie Claude es ausführen wird** :

**Phase 1 : Architekturdesign**

Der Teamleiter wird zuerst Teamkollege A, den Spielarchitekten, bitten, die Gesamtstruktur zu entwerfen :

```
Teamkollege A entwirft die Spielarchitektur...

Technologie-Stack : React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Projektinitialisierung :
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Dateistruktur :
src/
├── App.tsx                 # Haupt-App-Komponente
├── main.tsx                # Einstiegsdatei
├── types/
│   ├── player.ts           # Spieler-Typdefinitionen
│   ├── monster.ts          # Monster-Typdefinitionen
│   ├── skill.ts            # Fähigkeiten-Typdefinitionen
│   └── game.ts             # Spielstatus-Typen
├── stores/
│   └── gameStore.ts        # Zustand-Statusverwaltung
├── components/
│   ├── map/                # Kartenbezogene Komponenten
│   │   ├── MapCanvas.tsx   # Karten-Canvas
│   │   ├── PlayerSprite.tsx # Spieler-Sprite
│   │   └── NPCSprite.tsx   # NPC-Sprite
│   ├── battle/             # Kampfbezogene Komponenten
│   │   ├── BattleScreen.tsx    # Kampfbildschirm
│   │   ├── BattleMenu.tsx      # Kampfmenü
│   │   ├── HPBar.tsx           # HP-Leiste Komponente
│   │   └── BattleLog.tsx       # Kampflog
│   ├── dialog/             # Dialogbezogene Komponenten
│   │   ├── DialogBox.tsx   # Dialogbox
│   │   └── Choices.tsx     # Auswahl-Komponente
│   └── ui/                 # Gemeinsame UI-Komponenten
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # Kampfsystem-Logik
│   ├── DialogSystem.ts     # Dialogsystem-Logik
│   ├── QuestSystem.ts      # Questsystem-Logik
│   └── MapSystem.ts        # Kartensystem-Logik
├── hooks/
│   ├── useBattle.ts        # Kampf-Hook
│   ├── useDialog.ts        # Dialog-Hook
│   └── useAudio.ts         # Audio-Hook
├── data/
│   ├── monsters.ts         # Monsterdaten
│   ├── skills.ts           # Fähigkeitsdaten
│   ├── dialogues.ts        # Dialogskripte
│   └── maps.ts             # Kartendaten
└── utils/
    ├── audio.ts            # Audio-Dienstprogramme
    └── storage.ts          # Speicher-Dienstprogramme

Kern-Datenstrukturdesign :

// types/player.ts - Spieler-Typ
interface Player {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  position: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  gold: number;
  items: string[];
}

// types/skill.ts - Fähigkeiten-Typ
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// Spielstatus
{
  screen: 'map' | 'battle' | 'dialog' | 'menu',
  player: Player,
  currentMap: string,
  position: {x: number, y: number},
  inBattle: boolean,
  dialogQueue: Array<Dialog>,
  gameData: {
    completedQuests: string[],
    items: string[],
    visitedMaps: string[]
  }
}

Kampfsystemdesign :
- Rundenbasiert, der Spieler agiert zuerst
- Jede Runde kann der Spieler wählen : Angreifen, Fähigkeit, Gegenstand oder Flucht
- Fähigkeiten haben PP-Limits und müssen wiederhergestellt werden, wenn sie aufgebraucht sind
- Schadensformel : (Angreifer-Angriff / Verteidiger-Verteidigung) × Fähigkeitsstärke × Zufallsfaktor (0,85~1,0)

Dialogsystemdesign :
- Schreibmaschinen-Effekt für die Textanzeige
- Unterstützt Verzweigungsoptionen
- Unterstützt bedingte Auslöser, z. B. nach Abschluss einer Quest
- NPCs haben eine Blickrichtung, und Gespräche werden automatisch ausgelöst, wenn sich der Spieler nähert
```

**Phase 2 : Parallele Entwicklung**

Sobald die Architektur bestätigt ist, erstellt der Teamleiter die Aufgabenliste, und die anderen Mitglieder beginnen parallel zu arbeiten :

```
Aufgabenliste :
├── [Teamkollege B] Kampfsystem-Kernlogik implementieren (in Bearbeitung...)
├── [Teamkollege C] Dialog- und Questsysteme implementieren (in Bearbeitung...)
├── [Teamkollege D] 2D-Kartenrendering implementieren (in Bearbeitung...)
└── [Teamkollege E] UI und Audio gestalten (in Bearbeitung...)
```

<details>
<summary>📁 Teamkollege B : Kampfsystem-Kerncode</summary>

```javascript
// battle.js - Kampfsystem
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Spielerangriff
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} hat ${skill.name} eingesetzt!`);
    this.log.push(`Das hat ${damage} Schaden verursacht!`);

    // Fähigkeitseffekt
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Prüfen, ob der Kampf beendet ist
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} ist besiegt!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Monsterangriff
  monsterAttack() {
    if (this.state !== 'active') return;

    // Zufällig eine Fähigkeit wählen
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} hat ${skill.name} eingesetzt!`);
    this.log.push(`Das hat ${damage} Schaden verursacht!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} ist gefallen...`);
    } else {
      this.turn = 'player';
    }
  }

  // Schadensberechnung
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Typvorteil-Bonus (vereinfacht)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Fähigkeitseffekt anwenden
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} wurde verbrannt!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} hat ${healAmount} KP wiederhergestellt!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name}s Angriff ist gestiegen!`);
        break;
    }
  }

  // Erfahrungspunkte geben
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} hat ${expGain} EP erhalten!`);

    // Level-Aufstieg prüfen
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Level-Aufstieg
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Statistik-Wachstum
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} ist auf Level ${this.player.level} aufgestiegen!`);
    this.log.push(`KP +${hpGain}, ANG +${atkGain}, VER +${defGain}`);
  }

  // Flucht
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('Du bist erfolgreich geflohen!');
      return true;
    } else {
      this.log.push('Flucht fehlgeschlagen!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Monsterdaten
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'Schleim',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'Goblin',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'Kratzer', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Junger Drache',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Kratzer', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Glut', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Knurren', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 Teamkollege C : Dialog- und Questsystem-Code</summary>

```javascript
// dialog.js - Dialogsystem
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Dialog anzeigen
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Nächstes Dialogelement anzeigen
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Spezielle Dialogtypen behandeln
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Dialogbox rendern
  renderDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const speakerEl = document.getElementById('dialogSpeaker');
    const textEl = document.getElementById('dialogText');

    if (this.currentDialog.speaker) {
      speakerEl.textContent = this.currentDialog.speaker;
      speakerEl.style.display = 'block';
    } else {
      speakerEl.style.display = 'none';
    }

    // Schreibmaschinen-Effekt
    textEl.textContent = '';
    let i = 0;
    const text = this.currentDialog.text;
    const speed = this.currentDialog.speed || 30;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, speed);

    // Auswahlmöglichkeiten anzeigen, falls vorhanden
    this.renderChoices();
  }

  // Auswahlmöglichkeiten rendern
  renderChoices() {
    if (!this.currentDialog.choices) return;

    const choicesEl = document.getElementById('dialogChoices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'block';

    this.currentDialog.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.condition === undefined || choice.condition()) {
          this.dialogQueue = [];
          this.showDialog(choice.dialog, this.onComplete);
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  // Weiter
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // muss wählen, wenn Optionen vorhanden sind
    this.showNext();
  }
}

// Questsystem
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Quest annehmen
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Quest-Fortschritt aktualisieren
  updateProgress(type, target) {
    this.activeQuests.forEach(questId => {
      const quest = this.quests[questId];
      if (!quest) return;

      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          obj.current = (obj.current || 0) + 1;
          if (obj.current >= obj.required) {
            obj.completed = true;
          }
        }
      });

      this.checkCompletion(questId);
    });
  }

  // Quest-Abschluss prüfen
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Quest abschließen
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Belohnungen geben
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Belohnungen geben
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Beispiele für Dialogskripte
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Dorfvorsteher', text: 'Oh, Abenteurer... du bist endlich angekommen.'},
      {speaker: 'Dorfvorsteher', text: 'In letzter Zeit sind viele wilde Monster in der Nähe unseres Dorfs aufgetaucht, und alle sind verängstigt.'},
      {speaker: 'Dorfvorsteher', text: 'Wenn du helfen kannst, sie zu vertreiben, wäre ich zutiefst dankbar!'},
      {
        choices: [
          {text: 'In Ordnung, ich nehme diese Quest an', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Dorfvorsteher', text: 'Wunderbar! Bitte besiege 3 Schleime im Norden.'},
              {speaker: 'System', text: 'Quest [Schleime vertreiben] angenommen!'}
            ];
          }},
          {text: 'Ich bin im Moment etwas beschäftigt', dialog: [
            {speaker: 'Dorfvorsteher', text: 'Gut. Komm zurück, wenn du bereit bist.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Dorfvorsteher', text: 'Du hast es wirklich geschafft! Vielen Dank!'},
      {speaker: 'System', text: 'Quest [Schleime vertreiben] abgeschlossen! Du hast 100 EP erhalten!'},
      {speaker: 'Dorfvorsteher', text: 'Bitte nimm das. Es ist ein kleines Zeichen meiner Dankbarkeit.'}
    ]
  },

  shopkeeper: [
    {speaker: 'Händler', text: 'Willkommen! Suchen Sie etwas Bestimmtes?'},
    {
      choices: [
        {text: 'Waren durchsuchen', dialog: () => {
          game.openShop();
          return [{speaker: 'Händler', text: 'Nehmen Sie, was Ihnen gefällt!'}];
        }},
        {text: 'Gehen', dialog: [{speaker: 'Händler', text: 'Kommen Sie das nächste Mal wieder!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 Teamkollege D : 2D-Karten-Rendering-System-Code</summary>

```javascript
// map.js - Karten-Rendering-System
class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = 32;
    this.currentMap = null;
    this.player = null;
    this.npcs = [];
    this.camera = {x: 0, y: 0};
  }

  // Karte laden
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Karte rendern
  render() {
    if (!this.currentMap) return;

    // Canvas leeren
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Kontext speichern
    this.ctx.save();

    // Kamera-Versatz anwenden
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Kartenschichten rendern
    this.renderLayers();

    // NPCs rendern
    this.renderNPCs();

    // Spieler rendern
    this.renderPlayer();

    // Kontext wiederherstellen
    this.ctx.restore();
  }

  // Kartenschichten rendern
  renderLayers() {
    const map = this.currentMap;

    for (let layer = 0; layer < map.layers.length; layer++) {
      const data = map.layers[layer].data;

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tileId = data[y * map.width + x];
          if (tileId === 0) continue;

          const tileX = x * this.tileSize;
          const tileY = y * this.tileSize;

          this.renderTile(tileX, tileY, tileId);
        }
      }
    }
  }

  // Einzelne Kachel rendern
  renderTile(x, y, tileId) {
    // Verschiedene Kacheln basierend auf Kachel-ID zeichnen
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Grastextur
        this.ctx.fillStyle = '#3d7f3d';
        for (let i = 0; i < 3; i++) {
          const px = x + Math.random() * this.tileSize;
          const py = y + Math.random() * this.tileSize;
          this.ctx.fillRect(px, py, 2, 2);
        }
        break;

      case 'water':
        this.ctx.fillStyle = '#4a90d9';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Welleneffekt
        const wave = Math.sin(Date.now() / 500 + x / 20) * 2;
        this.ctx.fillStyle = '#5aa0e9';
        this.ctx.fillRect(x, y + 10 + wave, this.tileSize, 2);
        break;

      case 'wall':
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = '#7a6248';
        this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        break;

      case 'path':
        this.ctx.fillStyle = '#c4a77d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        break;

      case 'house':
        this.ctx.fillStyle = '#a0522d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Dach
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Kacheltyp abrufen
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // NPCs rendern
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // NPC zeichnen
      this.ctx.fillStyle = npc.color || '#ff6b6b';
      this.ctx.beginPath();
      this.ctx.arc(
        x + this.tileSize / 2,
        y + this.tileSize / 2,
        this.tileSize / 3,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // Namen zeichnen
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Spieler rendern
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Spieler-Körper
    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2,
      y + this.tileSize / 2,
      this.tileSize / 3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Spieler-Richtungsanzeiger
    const directions = {UP: [0, -8], DOWN: [0, 8], LEFT: [-8, 0], RIGHT: [8, 0]};
    const [dx, dy] = directions[this.player.direction] || [0, 0];

    this.ctx.fillStyle = '#2d3436';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2 + dx,
      y + this.tileSize / 2 + dy,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  // Kameraposition aktualisieren
  updateCamera() {
    if (!this.player) return;

    // Kamera folgt dem Spieler und hält ihn zentriert
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Sanfte Bewegung
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Verhindern, dass die Kamera über Kartengrenzen hinausgeht
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Kollision prüfen
  checkCollision(x, y) {
    // Kartengrenzen prüfen
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Kachel-Kollision prüfen
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // Wände und Häuser sind Hindernisse

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // NPC-Kollision prüfen
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // NPC-Dialog auslösen
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // NPC-Dialog auslösen
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Beispiel-Kartendaten
const VILLAGE_MAP = {
  name: 'Startdorf',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Kartendaten (vereinfacht)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... weitere Kartendaten
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Dorfvorsteher',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Händler',
      x: 15,
      y: 8,
      color: '#6bcf7f',
      dialogue: DIALOGUES.shopkeeper,
      direction: 'DOWN'
    }
  ],
  exits: [
    {x: 10, y: 0, to: 'forest_map', spawnX: 5, spawnY: 14}
  ]
};
```

</details>

<details>
<summary>📁 Teamkollege E : Kampf-UI-Code</summary>

```html
<!-- Kampfbildschirm HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- Gegner-Bereich -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Schleim</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- Spieler-Bereich -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Held</div>
      <div class="level">Lv. <span id="playerLevel">5</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="playerHpBar" style="width: 80%"></div>
      </div>
      <div class="hp-text">
        <span id="playerHp">80</span> / <span id="playerMaxHp">100</span>
      </div>
      <div class="exp-bar">
        <div class="exp-fill" id="expBar" style="width: 60%"></div>
      </div>
    </div>
    <div class="player-sprite">
      <canvas id="playerSprite" width="128" height="128"></canvas>
    </div>
  </div>

  <!-- Kampfmenü -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Angreifen</button>
      <button class="menu-btn" data-action="skills">Fähigkeiten</button>
      <button class="menu-btn" data-action="items">Gegenstände</button>
      <button class="menu-btn" data-action="flee">Fliehen</button>
    </div>
  </div>

  <!-- Fähigkeiten-Untermenü -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Wähle eine Fähigkeit</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Zurück</button>
  </div>

  <!-- Kampflog -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Kampfbildschirm-Stile */
.battle-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f7fa 50%, #4a5568 50%, #2d3748 100%);
  display: flex;
  flex-direction: column;
}

.enemy-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.monster-sprite canvas {
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.monster-info {
  margin-left: 40px;
  text-align: center;
}

.monster-info .name {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.monster-info .level {
  font-size: 14px;
  color: #718096;
  margin: 8px 0;
}

.hp-bar {
  width: 200px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a5568;
}

.hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  transition: width 0.3s ease;
}

.hp-text {
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
}

.player-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
}

.player-info {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #4a5568;
}

.exp-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4299e1, #3182ce);
  border-radius: 4px;
}

.battle-menu {
  background: rgba(255,255,255,0.95);
  border: 3px solid #4a5568;
  border-radius: 12px;
  padding: 20px;
  margin: 0 40px 40px;
}

.menu-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.menu-btn {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  border: 2px solid #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: linear-gradient(180deg, #4299e1 0%, #3182ce 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.battle-log {
  position: absolute;
  bottom: 120px;
  left: 40px;
  right: 40px;
  max-height: 100px;
  overflow-y: auto;
  background: rgba(0,0,0,0.7);
  border-radius: 8px;
  padding: 12px;
}

#battleLog {
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}

.log-entry {
  margin-bottom: 4px;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Treffer-Animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Angriff-Animation */
@keyframes attackRight {
  0% { transform: translateX(0); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

.attack-right {
  animation: attackRight 0.3s ease-in-out;
}
```

</details>

<details>
<summary>📁 Audio-System-Code</summary>

```javascript
// audio.js - Audiosystem
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Audio-Kontext initialisieren
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Hintergrundmusik abspielen
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Oszillatoren verwenden, um einfache BGM zu erzeugen
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Einfache Hintergrundmusik generieren
  playGeneratedBgm(type) {
    const melodies = {
      battle: [262, 294, 330, 262, 294, 330, 349, 330],
      village: [330, 349, 392, 349, 330, 294, 262, 294],
      victory: [392, 440, 494, 523, 494, 440, 392, 349]
    };

    const melody = melodies[type] || melodies.village;
    let noteIndex = 0;

    const playNote = () => {
      if (this.currentBgm !== type) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = melody[noteIndex];
      osc.type = 'triangle';

      gain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.4);

      noteIndex = (noteIndex + 1) % melody.length;
      setTimeout(playNote, 500);
    };

    playNote();
  }

  // Hintergrundmusik stoppen
  stopBgm() {
    this.currentBgm = null;
  }

  // Soundeffekt abspielen
  playSfx(sfxName) {
    this.init();

    switch(sfxName) {
      case 'attack':
        this.playAttackSound();
        break;
      case 'hit':
        this.playHitSound();
        break;
      case 'victory':
        this.playVictorySound();
        break;
      case 'levelup':
        this.playLevelUpSound();
        break;
      case 'dialog':
        this.playDialogSound();
        break;
    }
  }

  // Angriff-Soundeffekt
  playAttackSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.1
    );
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Treffer-Soundeffekt
  playHitSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 100;
    osc.type = 'square';

    gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // Sieg-Soundeffekt
  playVictorySound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.5
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
      }, i * 150);
    });
  }

  // Level-Aufstieg-Soundeffekt
  playLevelUpSound() {
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'triangle';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.3
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
      }, i * 100);
    });
  }

  // Dialog-Soundeffekt
  playDialogSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.05
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}
```

</details>

**Zusammenarbeitsdialog zwischen den Mitgliedern** :

```
Teamkollege B → Teamkollege C :
"Das Kampfsystem ist fertig. Wenn der Spieler gewinnt, wird giveExp() für den Level-Aufstieg aufgerufen.
Bitte überprüfe das Questsystem und stelle sicher, dass die Level-Aufstiegsdaten korrekt gespeichert werden."

Teamkollege C → Teamkollege B :
"Verstanden. Das Questsystem speichert Spieldaten mit localStorage,
einschließlich Level, Erfahrung und der Liste der abgeschlossenen Quests. Ich werde einen Autospeicher-Mechanismus hinzufügen."

Teamkollege D → Alle :
"Das Karten-Rendering-System ist fertig, und die NPC-Blickrichtungsdaten sind jetzt mit dem Dialogsystem verbunden.
Wenn der Spieler einem NPC zugewandt ist, wird der Dialog automatisch ausgelöst. Bitte bestätigt die Auslöselogik im Dialogsystem."

Teamkollege C → Teamkollege D :
"Bestätigt. DialogSystem hat eine Methode showDialog(), die ein Dialog-Array akzeptieren kann.
Ich werde sicherstellen, dass alle NPC-Dialogdaten diesem Format entsprechen."

Teamkollege E → Teamkollege B :
"Die Kampf-UI ist fertig, aber ich brauche Echtzeit-Spieler- und Monsterdaten, um die KP-Leisten zu aktualisieren.
Stellt das Kampfsystem einen Callback zur Verfügung?"

Teamkollege B → Teamkollege E :
"Ja. BattleSystem hat einen onUpdate-Callback, der am Ende jeder Runde ausgelöst wird.
Du kannst diesen Callback registrieren, um die UI zu aktualisieren."

Teamkollege E → Teamkollege D :
"Beim Kartenwechsel müssen wir die Kamera neu positionieren.
Stellt MapRenderer eine updateCamera()-Methode zur Verfügung?"

Teamkollege D → Teamkollege E :
"Ja. updateCamera() wird nach jedem loadMap() automatisch aufgerufen.
Du kannst sie auch manuell nach der Spielerbewegung aufrufen, um die Kamera sanft zu aktualisieren."
```

**Phase 3 : Integration und Tests**

Nachdem alle Komponenten fertig sind, ist der Teamleiter für die Integration verantwortlich :

<details>
<summary>📁 Haupt-Spielcontroller-Code</summary>

```javascript
// game.js - Haupt-Spielcontroller
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Jedes System initialisieren
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Karte laden
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Eingabebehandlung einrichten
    this.setupInput();

    // Spiel-Schleife starten
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Spielstand automatisch laden
    this.loadGame();
  }

  // Spieler erstellen
  createPlayer() {
    return {
      name: 'Held',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // Eingabebehandlung einrichten
  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (this.state === 'map') {
        this.handleMapInput(e);
      } else if (this.state === 'dialog') {
        this.handleDialogInput(e);
      } else if (this.state === 'battle') {
        this.handleBattleInput(e);
      }
    });
  }

  // Karteneingabebehandlung
  handleMapInput(e) {
    if (this.dialogSystem.isShowing) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.dialogSystem.next();
      }
      return;
    }

    let dx = 0, dy = 0;
    switch(e.key) {
      case 'ArrowUp': case 'w': dy = -1; this.player.direction = 'UP'; break;
      case 'ArrowDown': case 's': dy = 1; this.player.direction = 'DOWN'; break;
      case 'ArrowLeft': case 'a': dx = -1; this.player.direction = 'LEFT'; break;
      case 'ArrowRight': case 'd': dx = 1; this.player.direction = 'RIGHT'; break;
      default: return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (!this.mapRenderer.checkCollision(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.mapRenderer.updateCamera();

      // Zufälligen Kampf prüfen
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Spiel speichern
      this.saveGame();
    }
  }

  // Dialogueingabebehandlung
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Kampfeingabebehandlung
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Kampf starten
  startBattle(monsterData) {
    // Zufällig ein Monster wählen
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Monster-Instanz erstellen
    const monster = {
      ...randomMonster,
      level: Math.max(1, this.player.level + Math.floor(Math.random() * 3) - 1),
      hp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      maxHp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      attack: randomMonster.baseAtk + randomMonster.baseAtk * 0.15 * this.player.level,
      defense: randomMonster.baseDef + randomMonster.baseDef * 0.1 * this.player.level
    };

    this.battleSystem = new BattleSystem(this.player, monster);
    this.state = 'battle';

    // Kampfmusik abspielen
    this.audioManager.playBgm('battle');

    // Kampfbildschirm anzeigen
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Kampf-UI aktualisieren
    this.updateBattleUI();
  }

  // Kampf-UI aktualisieren
  updateBattleUI() {
    if (!this.battleSystem) return;

    const player = this.battleSystem.player;
    const monster = this.battleSystem.monster;

    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerHp').textContent = Math.floor(player.hp);
    document.getElementById('playerMaxHp').textContent = player.maxHp;
    document.getElementById('playerHpBar').style.width =
      (player.hp / player.maxHp * 100) + '%';

    document.getElementById('enemyName').textContent = monster.name;
    document.getElementById('enemyLevel').textContent = monster.level;
    document.getElementById('enemyHp').textContent = Math.floor(monster.hp);
    document.getElementById('enemyMaxHp').textContent = Math.floor(monster.maxHp);
    document.getElementById('enemyHpBar').style.width =
      (monster.hp / monster.maxHp * 100) + '%';

    // Kampflog aktualisieren
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // Kampf beenden
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Kampfbildschirm ausblenden
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Kartenmusik abspielen
    this.audioManager.playBgm('village');

    // Spiel speichern
    this.saveGame();
  }

  // Spiel speichern
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Spiel laden
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Haupt-Spiel-Schleife
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Canvas leeren
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Nach Status rendern
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Spiel starten
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**Endergebnis** :

Nach etwa 1 bis 2 Stunden ist ein voll funktionsfähiges Pokemon-artiges RPG fertig !

```
Projektzusammenfassung :
✅ Spielarchitekturdesign - Teamkollege A
✅ Rundenbasiertes Kampfsystem - Teamkollege B
✅ Dialog- und Questsystem - Teamkollege C
✅ 2D-Karten-Rendering - Teamkollege D
✅ UI und Soundeffekte - Teamkollege E

Projektdateien :
├── index.html (120 Zeilen)
├── css/
│   ├── main.css (100 Zeilen)
│   ├── battle.css (180 Zeilen)
│   └── dialog.css (80 Zeilen)
├── js/
│   ├── game.js (250 Zeilen)
│   ├── state.js (60 Zeilen)
│   ├── player.js (50 Zeilen)
│   ├── monster.js (80 Zeilen)
│   ├── battle.js (220 Zeilen)
│   ├── dialog.js (180 Zeilen)
│   ├── map.js (280 Zeilen)
│   └── audio.js (150 Zeilen)
└── data/
    ├── monsters.js (100 Zeilen)
    ├── skills.js (80 Zeilen)
    └── dialogues.js (120 Zeilen)

Gesamt : etwa 2050 Zeilen Code, kollaborativ von 5 KI-Teammitgliedern erstellt !

Spielfunktionen :
🎮 Rundenbasiertes Kampfsystem (Angriff, Fähigkeiten, Gegenstände, Flucht)
💬 NPC-Dialogsystem (Schreibmaschinen-Effekt, Verzweigungsoptionen)
📜 Questsystem (Quests annehmen, Fortschritt aktualisieren, Abschlussbelohnungen)
🗺️ 2D-Kartenerkundung (Multi-Szenen-Übergänge, NPC-Interaktion)
💾 Autospeichern (Fortschritt mit localStorage gespeichert)
🔊 Soundeffekte und BGM (Web Audio API)
📊 Charakterwachstum (Erfahrung, Level-Aufstieg, Statistik-Erhöhungen)
```

**Das Team bei der Arbeit beobachten** :

Wenn Sie den tmux-Geteilt-Fenster-Modus konfiguriert haben, sehen Sie mehrere Terminalfenster, die gleichzeitig arbeiten :

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Teamkollege B  │  Teamkollege C  │  Teamkollege D  │
│  Implementierung│  Dialogskripte  │  Kacheln        │
│  der            │  schreiben      │  rendern        │
│  Schadensformel │                 │                 │
│                 │  "Ist           │  "Die Monster   │
│  "Teamkollege E,│   MapRenderer   │   brauchen      │
│   ist die KP-   │   schon bereit?"│   Angriffs-     │
│   Leiste in %?" │                 │   animationen..."│
└─────────────────┴─────────────────┴─────────────────┘
```

**Wichtigste Erkenntnisse** :

Dieses Praxisbeispiel zeigt mehrere Kernvorteile von Agent Teams :

1. **Echte parallele Entwicklung** : 5 Mitglieder entwickeln gleichzeitig verschiedene Spielsysteme
2. **Komplexes Projektmanagement** : Über 2000 Zeilen Code werden strukturiert aufgeteilt und integriert
3. **Spezialisierte Arbeitsteilung** : Kampf, Dialog, Karte und UI haben jeweils einen dedizierten Verantwortlichen
4. **Schnittstellenkoordination** : Mitglieder verhandlieren Schnittstellen und Datenformate über das Nachrichtensystem
5. **Schnelle Lieferung** : Arbeit, die eine Person Wochen kosten würde, kann das Team in wenigen Stunden erledigen

Sie können versuchen, dieses Spiel selbst auszuführen und zu erleben, wie ein KI-Team zusammenarbeitet, um ein Pokemon-artiges RPG zu erstellen.

---

### Einzelner Prompt vs. Agent Teams : Testen Sie es selbst

Um Ihnen zu helfen, die Leistung von Agent Teams direkter zu spüren, haben wir zwei Testpläne vorbereitet, die Sie selbst ausprobieren und vergleichen können.

#### Testplan A : Einzel-Prompt-Ansatz

Dies ist der traditionelle Ansatz : Verwenden Sie einen vollständigen Prompt und bitten Sie die KI, das Spiel zu entwickeln.

**Geben Sie dies in Claude Code ein** :

```
Help me build a Pokemon-style web RPG game with the following features:
- Character system (level, HP, attack, defense)
- Turn-based battle system (attack, skills, items, flee)
- NPC dialogue system
- 2D map exploration
- Save system
- Audio system

Use React + TypeScript + Vite + Tailwind CSS.
Please give me complete code that can run directly.
```

**Erwartetes Ergebnis** :

| Element | Erwartete Situation |
|---------|---------------------|
| **Codequalität** | Die KI wird versuchen, den gesamten Code zu generieren, aber aufgrund von Kontextlimits werden viele Details weggelassen oder durch Kommentare ersetzt |
| **Funktionsvollständigkeit** | Kernfunktionen können vorhanden sein, aber viele erweiterte Funktionen fehlen oder sind vereinfacht |
| **Ausführbarkeit** | Es kann Bugs geben, und Sie benötigen möglicherweise mehrere Debugging-Runden, bevor es läuft |
| **Entwicklungszeit** | Ein Gespräch kann 30 bis 60 Minuten dauern, mit mehreren Hin- und Her-Runden |
| **Codeumfang** | Etwa 500 bis 800 Zeilen, da die KI dazu neigt, Code zu komprimieren |

**Probleme, auf die Sie stoßen könnten** :

1. **Code wird abgeschnitten** : KI-Antworten haben Längenlimits, die Generierung kann also mittendrin stoppen
2. **Unvollständige Funktionen** : Das Dialogsystem ist möglicherweise nur eine Basisversion ohne Questsystem
3. **Fehlende Details** : Das Audiosystem wird möglicherweise als TODO-Kommentar stehen gelassen
4. **Schwer zu debuggen** : Wenn der Code Probleme hat, müssen Sie die KI bitten, ihn in derselben Unterhaltung zu korrigieren, und der Kontext wird zunehmend unübersichtlicher

#### Testplan B : Agent-Teams-Ansatz

Dies ist der in diesem Artikel vorgestellte Ansatz : Mehrere KI-Teammitglieder lassen sich bei der Entwicklung zusammenarbeiten.

**Geben Sie dies in Claude Code ein** (nachdem Agent Teams aktiviert wurde) :

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene transitions
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use plain HTML/CSS/JavaScript
- Use Canvas to render the game screen
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Erwartetes Ergebnis** :

| Element | Erwartete Situation |
|---------|---------------------|
| **Codequalität** | Jedes Mitglied konzentriert sich auf seinen eigenen Bereich, der Code ist professioneller und vollständiger |
| **Funktionsvollständigkeit** | Alle Funktionen sind vollständiger implementiert, einschließlich des Questsystems und Multi-Szenen-Karten |
| **Ausführbarkeit** | Mitglieder überprüfen gegenseitig die Schnittstellen, daher gibt es weniger Integrationsprobleme |
| **Entwicklungszeit** | Etwa 1 bis 2 Stunden für alle Funktionen, da die Entwicklung parallel erfolgt |
| **Codeumfang** | Etwa 2000+ Zeilen mit einer vollständigen Implementierung statt komprimiertem Code |

#### Quantitativer Vergleich

| Dimension | Einzelner Prompt | Agent Teams |
|---------|----------------|-------------|
| **Gesamtcodezeilen** | 500-800 Zeilen | 2000+ Zeilen |
| **Entwicklungszeit** | 30-60 Minuten, aber Funktionen unvollständig | 1-2 Stunden mit vollständigen Funktionen |
| **Funktionsvollständigkeit** | 60-70 % | 95 %+ |
| **Wartbarkeit** | Mittel, meist eine große Datei | Hoch, mit modularem Design |
| **Bug-Anzahl** | Höher, da weniger Validierung | Niedriger, da Mitglieder sich gegenseitig überprüfen |
| **Zukünftige Erweiterbarkeit** | Schwierig, da Code stark gekoppelt ist | Einfacher, da die Struktur modular ist |
| **Token-Verbrauch** | ~50K Tokens | ~200K Tokens (5 Mitglieder) |
| **Kosten** | ~0,50 $ | ~2,00 $ |

#### Empfohlener praktischer Testprozess

**Schritt 1 : Testen Sie zuerst den Einzel-Prompt-Ansatz**

```
1. Öffnen Sie ein neues Claude Code-Gespräch
2. Verwenden Sie den Prompt aus „Testplan A" oben
3. Notieren Sie : Wie lange hat es gedauert? Wie viele Codezeilen wurden produziert? Welche Funktionen fehlten?
```

**Schritt 2 : Testen Sie dann den Agent-Teams-Ansatz**

```
1. Bestätigen Sie, dass Agent Teams aktiviert wurde
2. Verwenden Sie den Prompt aus „Testplan B" oben
3. Beobachten Sie : Wie arbeiten die Teammitglieder zusammen? Ist der Code vollständiger?
```

**Schritt 3 : Vergleichen Sie die beiden Ergebnisse**

```
1. Führen Sie beide Code-Versionen separat aus
2. Vergleichen Sie die Funktionslisten : Welche Funktionen fehlen in der Einzel-Prompt-Version?
3. Vergleichen Sie die Code-Struktur : Ist die Agent-Teams-Version modularer?
4. Bewerten Sie : Wenn Sie dieses Spiel weiterentwickeln wollten, welche Version wäre einfacher zu erweitern?
```

#### Warum treten diese Unterschiede auf?

**Einschränkungen des Einzel-Prompt-Ansatzes** :

1. **Kontextdruck** : Die KI muss alles in einer einzigen Antwort verarbeiten, Vereinfachungen sind daher unvermeidlich
2. **Zerstreute Aufmerksamkeit** : Kampf, Dialog, Karte und UI konkurrieren um die Aufmerksamkeit, Details werden daher leicht übersehen
3. **Keine kollaborative Validierung** : Niemand prüft, ob die Schnittstellen übereinstimmen, Bugs sind daher wahrscheinlicher

**Vorteile von Agent Teams** :

1. **Spezialisierte Arbeitsteilung** : Jedes Mitglied konzentriert sich auf einen Bereich und kann tiefer in die Details gehen
2. **Parallele Verarbeitung** : Kampf-, Dialog- und Kartenentwicklung finden gleichzeitig statt, was die Effizienz steigert
3. **Gegenseitige Validierung** : Mitglieder verhandeln Schnittstellen miteinander, was Integrationsprobleme reduziert
4. **Unabhängiger Kontext** : Jedes Mitglied hat seinen eigenen 200K-Kontext und stört die anderen nicht

#### Fazit

Der Kernwert von Agent Teams liegt nicht einfach darin, dass es „schneller" ist, sondern dass es **„vollständiger und professioneller" ist**.

- Für einfache Projekte wie ein Snake-Spiel reicht ein einzelner Prompt
- Für komplexe Projekte wie ein Pokemon-RPG kann Agent Teams bessere Ergebnisse liefern

Der Schlüssel ist, **das richtige Werkzeug zu wählen** : Verwenden Sie Agent Teams nicht, um eine Variable umzubenennen, und verwenden Sie keinen einzelnen Prompt, um ein komplettes RPG-Spiel zu erstellen.

---

## Bewährte Praktiken

Agent Teams ist ein mächtiges Werkzeug, aber um es gut zu nutzen, müssen Sie einige bewährte Praktiken verstehen. Diese Lektionen stammen aus der praktischen Erfahrung der Community und können Ihnen helfen, häufige Fallstricke zu vermeiden und den größtmöglichen Nutzen aus der Teamzusammenarbeit zu ziehen.

### Praxis 1 : Vertrag zuerst

Bevor mehrere Agents parallel mit der Arbeit beginnen, nehmen Sie sich Zeit, einen klaren „Vertrag" zu definieren, d. h. die Schnittstellenvereinbarung.

**Warum es wichtig ist** :

Angenommen, Teamkollege A ist für die Backend-API verantwortlich und Teamkollege B für die Frontend-Integration. Wenn sie gleichzeitig starten, ohne sich vorher auf das Schnittstellenformat zu einigen, kann Folgendes passieren :

```
Teamkollege A : hat POST /api/login implementiert und erwartet {username, password}
Teamkollege B : hat den Frontend-Aufruf implementiert und sendet {user, pass}
Ergebnis : Sie stimmen nicht überein, und Nacharbeit ist erforderlich
```

**Wie man es macht** :

Bevor Sie das Team starten, bitten Sie Claude zunächst, die Schnittstellen zu entwerfen :

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**Ein Vertrag sollte Folgendes umfassen** :

- Funktionssignaturen und Datenstrukturen
- Ein- und Ausgabe-JSON-Formate
- Bedeutungen der HTTP-Statuscodes
 Fehlerbehandlungskonventionen
- Feldvalidierungsregeln

### Praxis 2 : Modelle klug zuweisen

Verschiedene Aufgaben erfordern unterschiedliche Modelle. Eine gute Modellzuweisung hilft, Qualität und Kosten auszubalancieren.

**Verwenden Sie Opus für den Teamleiter** :

Der Teamleiter übernimmt die Aufgabendekomposition und Ergebnissynthese, was stärkere Schlussfolgerungen erfordert. Opus wird daher empfohlen :

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Verwenden Sie Sonnet für Teamkollegen** :

Für konkrete Codierungs- und Testarbeiten ist Sonnet völlig fähig und deutlich günstiger :

- Opus 4.6 : etwa 15 $ pro Million Ausgabe-Tokens
- Sonnet 4.5 : etwa 3 $ pro Million Ausgabe-Tokens

Sonnet für Mitglieder zu verwenden, kann die Gesamtkosten erheblich senken.

**Verwenden Sie Haiku für Sonderfälle** :

Für einfache Aufgaben wie Dokumentationsaktualisierungen oder kleine Test-Schreib-Aufgaben können Sie Haiku in Betracht ziehen, etwa 0,80 $ pro Million Ausgabe-Tokens.

### Praxis 3 : Aufgabengranularität kontrollieren

Aufgaben, die zu groß oder zu klein sind, beeinträchtigen beide die Effizienz. Sie müssen die richtige Granularität finden.

**Faustregel** :

Jede Aufgabe sollte etwas sein, das ein Mitglied in **15 bis 30 Minuten** unabhängig abschließen kann.

**Aufgabe zu groß** :

```
Schlecht : Das Benutzerauthentifizierungssystem implementieren
```

Diese Aufgabe ist zu breit. Sie enthält mehrere Teilaufgaben, und eine Person bräuchte lange, um sie zu erledigen, was den Vorteil der Parallelität verschwendet.

**Aufgabe zu klein** :

```
Schlecht : Eine leere Datei namens auth.js erstellen
```

Diese Aufgabe ist zu winzig. Die Mitglieder verbringen mehr Zeit mit Koordination als mit eigentlicher Arbeit.

**Angemessene Granularität** :

```
Gut : Die Login-API implementieren, einschließlich :
1. Den POST /api/login-Endpunkt
2. Benutzername- und Passwort-Validierung
3. JWT-Token-Antwort
4. Fehlerbehandlung
```

Diese Aufgabe hat klare Grenzen und Lieferergebnisse. Eine Person kann sie unabhängig abschließen, und sie ist nicht übermäßig fragmentiert.

**Empfohlene Konfiguration** :

Lassen Sie jedes Mitglied **5 bis 6 mittelgroße Aufgaben** verantworten. Das bietet ausreichende Parallelität, ohne die Koordinationskosten zu hoch zu treiben.

### Praxis 4 : Dateikonflikte vermeiden

Mehrere Mitglieder, die gleichzeitig dieselbe Datei bearbeiten, ist das häufigste Problem in Agent Teams.

**Zuweisungsprinzip** :

Versuchen Sie, verschiedene Mitglieder für **verschiedene Dateien** verantwortlich zu machen :

```
Gut :
- Teamkollege A : verantwortlich für alle Dateien unter src/auth/
- Teamkollege B : verantwortlich für alle Dateien unter src/api/
- Teamkollege C : verantwortlich für alle Dateien unter tests/auth/

Schlecht :
- Teamkollege A und Teamkollege B bearbeiten beide src/app.js
```

**Wenn dieselbe Datei geändert werden muss** :

Entwerfen Sie eine serielle Bearbeitungsphase :

```
Phase 1 (parallel) :
- Teamkollege A : analysieren, welche Funktionalität zu auth.js hinzugefügt werden muss
- Teamkollege B : die neue Feature-Schnittstelle entwerfen
- Teamkollege C : die Testfälle schreiben

Phase 2 (seriell) :
- Der Teamleiter synthetisiert alle Eingaben
- Ein Mitglied ändert auth.js in einem einzigen integrierten Durchgang
```

### Praxis 5 : Reichhaltigen initialen Kontext bereitstellen

Wenn Teamkollegen starten, ist ihr Gesprächsverlauf leer. Sie wissen nicht, was der Teamleiter und der Benutzer vorher besprochen haben.

**Falscher Ansatz** :

```
Das Team erstellen und die Mitglieder mit der Arbeit beginnen lassen.
```

Die Mitglieder starten im Nebel : Um was für ein Projekt geht es? Welchen Tech-Stack verwendet es? Was genau sollen sie erstellen?

**Richtiger Ansatz** :

```
Dies ist ein React + Node.js E-Commerce-Projekt mit TypeScript.

Die Projektstruktur ist :
- src/frontend/ : React-Frontend-Code
- src/backend/ : Node.js-Backend-Code
- prisma/ : Datenbankmodelle

Code-Stil :
- Funktionskomponenten und Hooks verwenden
- Express.js im Backend verwenden
- PostgreSQL für die Datenbank verwenden

Jetzt ein Team erstellen und die Mitglieder die Benutzerauthentifizierung unter src/auth/ hinzufügen lassen.
```

Nur mit ausreichendem Kontext können die Mitglieder effizient arbeiten.

### Praxis 6 : Recherche vor Implementierung

Lassen Sie die Mitglieder nicht sofort mit dem Codieren beginnen. Bitten Sie sie, zuerst die Lösung zu recherchieren und zu entwerfen.

**Zweiphasiger Prozess** :

**Phase 1 : Recherche und Design**

```
Ein Team erstellen. In Phase eins recherchieren :
- Ein Mitglied untersucht bestehende Authentifizierungsansätze (JWT vs Session)
- Ein Mitglied analysiert den Tech-Stack des Projekts und bestimmt bewährte Verfahren
- Ein Mitglied entwirft das Datenbankschema

Nach Abschluss der Recherche lassen Sie die Mitglieder über das Nachrichtensystem diskutieren und einen finalen Plan festlegen.
```

**Phase 2 : Implementierung**

```
Nach der Festlegung des Plans mit der Implementierung beginnen :
- Ein Mitglied implementiert die Backend-Authentifizierungslogik
- Ein Mitglied implementiert die Frontend-Login-Seite
- Ein Mitglied schreibt Tests
```

Der Vorteil dieses Vorgehens ist, dass Sie **Architekturfehlanpassungen früh erkennen** können, anstatt auf halber Strecke der Implementierung festzustellen, dass der Plan nicht funktioniert.

### Praxis 7 : Aktiv überwachen und eingreifen

Auch wenn Sie Automatisierung konfiguriert haben, sollten Sie den Arbeitsstatus des Teams aktiv überwachen.

**Geteiltes-Fenster-Modus verwenden** :

Wenn Sie tmux-Fenster konfiguriert haben, können Sie die Ausgabe aller Mitglieder in Echtzeit sehen :

```
┌─────────────────┬─────────────────┐
│  Teamkollege 1  │  Teamkollege 2  │
│  Codeanalyse    │  Implementierung│
│  ...            │  der API...     │
│                 │                 │
│  Moment, dieser │                 │
│  Ansatz scheint │                 │
│  falsch...      │                 │
└─────────────────┴─────────────────┘
```

Wenn Sie bemerken, dass ein Mitglied in die falsche Richtung geht, können Sie schnell eingreifen :

```
@Teamkollege1 Halt mal kurz an. Deine Analyse geht in die falsche Richtung. Das Authentifizierungsmodul sollte unter src/auth/ sein, nicht unter src/user/.
```

**Aufgabenstatus regelmäßig prüfen** :

Verwenden Sie den TaskList-Befehl, um den Status aller Aufgaben zu überprüfen :

```
/tasks
```

Dies zeigt alle Aufgabenzustände an, damit Sie sehen können, was abgeschlossen ist, was noch läuft und was blockiert ist.

---

## Geeignete Szenarien

Agent Teams ist mächtig, aber nicht für jede Aufgabe geeignet. Das Verständnis der richtigen Szenarien hilft Ihnen, die richtige Wahl zu treffen.

### Szenarien, in denen Agent Teams gut geeignet ist

**Komplexe Systemüberarbeitungen**

Wenn die Überarbeitung mehrere Module mit klaren Grenzen umfasst :

```
Szenario : Eine monolithische Anwendung in Microservices aufteilen

Ein Team erstellen :
- Teamkollege A : Abhängigkeiten im Benutzermodul analysieren
- Teamkollege B : Abhängigkeiten im Bestellmodul analysieren
- Teamkollege C : Abhängigkeiten im Zahlungsmodul analysieren
- Teamkollege D : Das Kommunikationsprotokoll zwischen Services entwerfen
```

Diese Module können gleichzeitig analysiert werden, und das Endergebnis kann später synthetisiert werden, was viel schneller ist als eine sequenzielle Analyse.

**Mehrwinke-Code-Review**

Wenn Sie Code aus mehreren Dimensionen überprüfen müssen :

```
Szenario : Eine vollständige Sicherheitsüberprüfung des Zahlungsmoduls durchführen

Ein Team erstellen :
- Teamkollege A : Fokus auf Sicherheitslücken (SQL-Injection, XSS usw.)
- Teamkollege B : Leistungsprobleme inspizieren (N+1-Abfragen, Speicherlecks usw.)
- Teamkollege C : Vollständigkeit der Fehlerbehandlung überprüfen
- Teamkollege D : Testabdeckung bewerten
```

Jedes Mitglied konzentriert sich auf eine Dimension, was die Überprüfung tiefer und den Abschlussbericht vollständiger macht.

**Parallele Frontend- und Backend-Entwicklung**

Wenn Sie Frontend und Backend gleichzeitig erstellen müssen :

```
Szenario : Eine Benutzerverwaltungsfunktion erstellen

Ein Team erstellen :
- Teamkollege A (Frontend) : Die Benutzerlistenseite implementieren
- Teamkollege B (Frontend) : Die Benutzerbearbeitungsseite implementieren
- Teamkollege C (Backend) : Die CRUD-API implementieren
- Teamkollege D (Koordination) : Den API-Vertrag entwerfen und sicherstellen, dass Frontend und Backend synchron bleiben
```

Frontend und Backend können parallel vorankommen, solange der API-Vertrag vorher definiert wurde, nach dem Vertrag-zuerst-Prinzip.

**Wettbewerbs-Debugging**

Wenn Sie mehrere mögliche Lösungen haben :

```
Szenario : Einen komplexen Bug mit zwei möglichen Reparaturstrategien beheben

Ein Team erstellen :
- Teamkollege A : Lösung 1 implementieren
- Teamkollege B : Lösung 2 implementieren
- Teamkollege C : Die Vor- und Nachteile beider bewerten
```

Beide Lösungen können parallel implementiert und getestet werden, und die bessere kann danach ausgewählt werden.

**Dokumentationsgenerierung**

Wenn Sie eine große Menge an Dokumentation erstellen müssen :

```
Szenario : Dokumentation für das gesamte Projekt schreiben

Ein Team erstellen :
- Teamkollege A : API-Dokumentation schreiben
- Teamkollege B : Den Bereitstellungsleitfaden schreiben
- Teamkollege C : Den Entwicklungsleitfaden schreiben
- Teamkollege D : Das Fehlerbehebungs-Handbuch schreiben
```

Mehrere Dokumente können gleichzeitig geschrieben werden, was die Effizienz erheblich steigert.

### Szenarien, in denen Agent Teams nicht gut geeignet ist

**Einfache Änderungsaufgaben**

```
Nicht geeignet : Variablenumbenennung, einzelne Bug-Fixes, kleine Feature-Ergänzungen
```

Für diese Aufgaben sind die Kosten des Teamstarts höher als die eigentliche Arbeit.

**Stark serielle Aufgaben**

```
Nicht geeignet : Aufgaben, die streng nacheinander ablaufen müssen
```

Wenn Aufgabe B nicht starten kann, bis Aufgabe A abgeschlossen ist, gibt es keinen echten Raum für Parallelität.

**Kostenempfindliche Aufgaben**

Agent Teams verbraucht **2 bis 4 Mal** die Tokens einer einzelnen Instanz, abhängig von der Teamgröße. Wenn Kosten das Hauptanliegen sind, kann eine einzelne Instanz die bessere Wahl sein.

### Entscheidungsflussdiagramm

```
Gibt es mehrere unabhängige Teilaufgaben?
    │
    ├─ Nein → Einzelne Instanz verwenden
    │
    └─ Ja →
         │
         Können die Teilaufgaben verschiedenen Dateien zugewiesen werden?
         │
         ├─ Nein → Serielle Ausführung in Betracht ziehen oder die Aufgabe weiter aufteilen
         │
         └─ Ja →
              │
              Sind die Kosten akzeptabel (2-4x)?
              │
              ├─ Nein → Einzelne Instanz verwenden
              │
              └─ Ja → Agent Teams verwenden ✓
```

---

## Kosten und Leistung

Die Verwendung von Agent Teams erhöht die Kosten, kann aber auch signifikante Effizienzgewinne bringen. Das Verständnis dieses Trade-offs hilft Ihnen, fundierte Entscheidungen zu treffen.

### Kostenanalyse

**Token-Verbrauch und Teamgröße**

Der Token-Verbrauch von Agent Teams ist ungefähr **linear** zur Teamgröße :

| Teamgröße | Relative Kosten | Geeignetes Szenario |
|---------|---------|---------|
| 1 Person (einzelne Instanz) | 1x | Einfache Aufgaben |
| 2-Personen-Team | 2-2,5x | Mittlere Komplexität |
| 3-Personen-Team | 3-4x | Komplexe Aufgaben |
| 5+ Personen-Team | 5-6x+ | Große Projekte |

**Warum es nicht perfekt linear ist** :

- **Startkosten** : Jedes Mitglied muss beim Start den initialen Kontext erhalten
- **Koordinationskosten** : Die Kommunikation zwischen Mitgliedern über das Nachrichtensystem verbraucht ebenfalls Tokens
- **Teamleiter-Kosten** : Der Teamleiter verwendet normalerweise Opus, das teurer ist

**Konkrete Beispielszahlen** (Claude 4.5 Sonnet) :

- Eingabe : 3 $ pro Million Tokens
- Ausgabe : 15 $ pro Million Tokens

Angenommen, eine Aufgabe erfordert :
- Teamleiter (Opus) : 50K Eingabe + 20K Ausgabe ≈ 2,25 $
- 3 Teamkollegen (Sonnet) : jeweils 30K Eingabe + 15K Ausgabe ≈ 2,7 $ × 3 = 8,1 $
- **Gesamt** : etwa 10,35 $

Dasselbe auf einer einzelnen Sonnet-Instanz :
- 100K Eingabe + 50K Ausgabe ≈ 1,05 $

**Kostenmultiplikator** : etwa 10x

**Aber eingesparte Zeit** : potenziell von 3 Stunden auf 1 Stunde reduziert

### Effizienzgewinne

**Daten aus internen Anthropic-Tests** :

- Große Projektüberarbeitungen : etwa **50 %** Effizienzsteigerung
- Parallele Multi-Modul-Entwicklung : etwa **60-70 %** Steigerung
- Dokumentationsgenerierungsaufgaben : etwa **80 %** Steigerung

**Echter Fall** :

Das Anthropic-Engineering-Team hat einmal **16 parallele Agents** verwendet, um in etwa 2 Wochen einen C-Compiler zu erstellen, der den Linux 6.9-Kernel kompilieren konnte, etwa 100.000 Zeilen Rust-Code, und der 99 % der GCC-Tests bestand.

### Kostenoptimierungsstrategien

**Strategie 1 : Modelle mischen**

```
Teamleiter : Opus (starke Schlussfolgerungen erforderlich)
Teamkollegen : Sonnet (hervorragendes Preis-Leistungs-Verhältnis)
Einfache Aufgaben : Haiku (am günstigsten)
```

**Strategie 2 : Teamgröße dynamisch anpassen**

```
Analysephase : 5-Personen-Team (Mehrwinkelanalyse)
Implementierungsphase : 3-Personen-Team (paralleles Codieren)
Testphase : 2-Personen-Team (Testen und Beheben)
```

**Strategie 3 : Agent Teams nur in ausgewählten Phasen verwenden**

Verwenden Sie Agent Teams nicht für das gesamte Projekt. Nutzen Sie es nur in den komplexesten Phasen :

```
Phase 1 (Anforderungsanalyse) : einzelne Instanz
Phase 2 (Architekturdesign) : Agent Teams (mehrere Pläne parallel erkundet)
Phase 3 (Codierung) : einzelne Instanz
Phase 4 (Code-Review) : Agent Teams (Mehrwinke-Review)
Phase 5 (Dokumentation) : Agent Teams (paralleles Schreiben)
```

### Wann es sich lohnt

**Lohnt sich, wenn** :

- Die Projektzeitlinie eng ist und der Wert der Effizienzgewinne die Token-Kosten übersteigt
- Die Aufgabe sehr komplex ist und eine einzelne Instanz wahrscheinlich Details übersieht
- Sie Mehrwinkelanalyse und -validierung benötigen

**Lohnt sich nicht, wenn** :

- Die Aufgabe einfach ist und der Overhead des Teamstarts zu hoch ist
- Kosten sehr sensibel sind und das Token-Budget begrenzt ist
- Die Aufgabe stark seriell ist und keinen Raum für Parallelität bietet

---

## Häufig gestellte Fragen

### F1 : Ist Agent Teams stabil? Kann es in der Produktion verwendet werden?

Agent Teams ist derzeit eine **experimentelle Funktion**, daher kann es noch Bugs und instabiles Verhalten geben. Empfehlungen :

- Wichtige Projekte zuerst sichern
- Mit kleinen Projekten beginnen, um zu testen und sich vertraut zu machen
- Offizielle Versionshinweise verfolgen, um Verbesserungen in neuen Versionen zu sehen
- Probleme umgehend an das offizielle Team melden, wenn sie auftreten

### F2 : Wie viele Mitglieder kann ich maximal erstellen?

Es gibt keine strikte theoretische Grenze, aber aus praktischer Sicht :

- Kleine Projekte : 2 bis 3 Personen
- Mittlere Projekte : 3 bis 5 Personen
- Große Projekte : 5 bis 10 Personen

Zu viele Mitglieder führen zu folgenden Problemen :

- Der Koordinationsaufwand steigt stark an
- Der Token-Verbrauch wächst linear
- Die Wahrscheinlichkeit von Dateikonflikten nimmt zu
- Überwachung und Verwaltung werden schwieriger

### F3 : Können Teammitglieder den Kontext der anderen sehen?

**Nein**. Jeder Teamkollege hat ein vollständig unabhängiges Kontextfenster. Sie kommunizieren über das Nachrichtensystem anstatt den Kontext direkt zu teilen.

Dies ist eine bewusste Designentscheidung mit folgenden Vorteilen :

- Das Denken eines Mitglieds wird nicht durch das Denken eines anderen verschlechtert
- Der Kontext wird nicht chaotisch, weil Gespräche zu lang werden
- Es ist näher an der Arbeitsweise eines echten Teams, wo jeder seinen eigenen Kopf hat

### F4 : Wie wechsle ich zwischen verschiedenen Mitgliedern?

Wenn der Geteilt-Fenster-Modus nicht konfiguriert ist, können Sie Tastenkombinationen verwenden :

- `Shift+Up` : zum vorherigen Mitglied wechseln
- `Shift+Down` : zum nächsten Mitglied wechseln
- `Ctrl+O` : zum Teamleiter zurückkehren

### F5 : Was passiert, wenn eine Aufgabe fehlschlägt?

Wenn die Aufgabe eines Mitglieds fehlschlägt :

1. Überprüfen Sie die Fehlerursache, indem Sie das Ausgabeprotokoll dieses Mitglieds lesen
2. Weisen Sie die Aufgabe bei Bedarf einem anderen Mitglied neu zu
3. Greifen Sie manuell ein und helfen Sie, das Problem direkt zu lösen

### F6 : Kann ich während des Prozesses Mitglieder hinzufügen oder entfernen?

Ja. Sie können dem Teamleiter jederzeit Befehle erteilen :

```
Ein neues Mitglied hinzufügen und es XXX bearbeiten lassen.
```

```
Teamkollege 3 das Team verlassen lassen, nachdem die aktuelle Aufgabe abgeschlossen ist.
```

### F7 : Kann Agent Teams zusammen mit MCP und Skills verwendet werden?

Absolut. Tatsächlich funktionieren sie noch besser zusammen :

- **Agent Teams + Skills** : Jedes Mitglied kann verschiedene Fähigkeiten mitbringen
- **Agent Teams + MCP** : Verschiedene Mitglieder können über verschiedene MCP-Server auf externe Ressourcen zugreifen

```
Ein Team erstellen :
- Teamkollege A : bringt das Frontend-Design-Skill mit und ist für die UI verantwortlich
- Teamkollege B : greift über GitHub MCP auf das Repository zu und verwaltet PRs
- Teamkollege C : fragt Daten über Database MCP ab und übernimmt die Analyse
```

---

## Referenzen

### Offizielle Ressourcen

- [Offizielle Claude Code-Dokumentation](https://docs.anthropic.com/en/docs/claude-code) - Vollständige Claude Code-Dokumentation
- [Anthropic Engineering-Blog](https://www.anthropic.com/engineering) - Offizieller technischer Blog und Updates

### Sammlung von Agent Teams-Tutorials

**Vollständige Leitfäden** :

- [Vollständiger Leitfaden zu Claude Code Agent Teams : von der Einführung zur Praxis](https://m.blog.csdn.net/u010634066/article/details/157903022) - Enthält Konfigurationsdetails, Praxisbeispiele und den beeindruckenden Fall, in dem 16 parallele Agents einen C-Compiler erstellt haben
- [Kollaborative Entwicklung mit Claude Code Agent Team : ein vollständiger Praxisleitfaden](https://m.blog.csdn.net/u010028049/article/details/158126612) - Vollständiger kollaborativer Projekt-Workflow
- [Schritt-für-Schritt-Anleitung zur Einrichtung und Nutzung von Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - Tencent Cloud-Tutorial mit detaillierten Einrichtungsanweisungen

**Praktischer Einstieg** :

- [Praxis mit nativen Claude Code Agent Teams : von der Aktivierung bis zum Betrieb eines Dreier-Teams](https://www.cnblogs.com/147api/p/19606317) - Dreier-Team-Demonstration
- [Frische Anfängerpraxis mit Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - Anfängerfreundliche Einführung mit bewährten Praktiken wie Vertrag zuerst
- [Kein Einzelkämpfer mehr : 7 Claude gleichzeitig mit Agent Teams entwickeln lassen](https://m.toutiao.com/a7605229732241736202/) - Fallstudie eines 7-Personen-Teams

**Bewährte Praktiken** :

- [Agent Teams bewährte Praktiken : Vertrag zuerst, Aufgabengranularität und Modellzuweisung](https://blog.csdn.net/sinat_37574187/article/details/144727588) - Detaillierte Erklärung von 7 bewährten Praktiken
- [Das Claude Code-Handbuch eines Sieben-Jahre-Big-Tech-Veteranen : Acht Regeln vom Anfänger zum Experten](https://new.qq.com/rain/a/20260111A02HE900) - Erfahrung auf Unternehmensebene aus der Praxis

**Prinzipien und Vergleiche** :

- [Claude Code Agent Teams : Der richtige Weg für Multi-Agent-Zusammenarbeit](https://post.m.smzdm.com/p/adoezrmz/) - Tiefenanalyse der Multi-Agent-Zusammenarbeit
- [Claude Code Multi-Agent-Team-Entwicklung : Der vollständige Leitfaden von Prinzipien bis Fallstricken](https://m.toutiao.com/a7605229732241736202/) - Prinzipien und Fallstricke aus der praktischen Nutzung

### Übersetzungen des offiziellen Leitfadens

- [Claude hat offiziell den „Agent Building Guide" veröffentlicht (mit PDF-Download)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - Offizieller Agent-Building-Leitfaden
- [Vollständige übersetzte Version von Claudes offiziellem „Leitfaden zum Aufbau effektiver Agents"](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - Vollständige deutsche Übersetzung

### Verwandte Technologien

- [Agent Skills-Standard](https://agentskills.io/) - Das Skills-Ökosystem
- [skills.sh - Agent Skills App Store](https://skills.sh/) - Über 70.000 Skills-Bibliothek
