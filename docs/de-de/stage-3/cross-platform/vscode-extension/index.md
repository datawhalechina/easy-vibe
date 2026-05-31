# Wie man eine VS Code-Erweiterung erstellt: Ihren KI-Projekassistenten bauen

# Kapitel 1: Was ist VS Code-Erweiterungsentwicklung

In diesem Tutorial werden wir einen vollständigen Kreislauf abschließen: eine VS Code-Erweiterung von Grund auf neu erstellen, die als Ihr KI-Projektassistent fungiert, mit Ein-Klick-Projektvorlagenerstellung, KI-Chat für ausgewählte Dateien oder Codeausschnitte, Multi-Datei-Frage-Antwort-Analyse und benutzerdefinierten Tastenkombinationen. Sie werden die Entwicklung abschließen, debuggen und lernen, wie Sie im VS Code Marketplace veröffentlichen.

Für dieses Tutorial sollten Sie mindestens Folgendes haben:

- Node.js-Umgebung (Version 18.0+)
- VS Code-Editor (Version 1.90+)
- Ihren KI-Coding-Assistenten (Cursor / Trae / Claude Code)
- (Optional) GitHub Copilot-Abonnement (für Language Model API)

> **Vibe Coding Ende-zu-Ende**: Wir werden einen KI-Coding-Assistenten verwenden, um den meisten Code zu generieren. Sie müssen nur Kernkonzepte und Architektur verstehen und dann Anforderungen in natürlicher Sprache beschreiben.

## 1.1 Was können VS Code-Erweiterungen tun?

Sie nutzen bereits täglich VS Code-Erweiterungen. Prettier formatiert Ihren Code, GitLens zeigt den Git-Verlauf und GitHub Copilot hilft Ihnen beim Schreiben von Code. Diese Erweiterungen sind im Wesentlichen Programme, die in TypeScript/JavaScript geschrieben sind und den Editor über VS Code-APIs erweitern.

VS Code-Erweiterungen können viel mehr als viele Menschen erwarten:

* **Neue UI-Elemente hinzufügen**: Seitenleisten-Panels, Statusleisten-Informationen, benutzerdefinierte Webview-Seiten
* **Dateien und Code verarbeiten**: Dateien lesen, ändern und erstellen; Code-Struktur analysieren
* **Externe Dienste integrieren**: APIs aufrufen, Datenbanken verbinden, CI/CD integrieren
* **Editor-Funktionen erweitern**: Benutzerdefinierte Sprachunterstützung, Code-Vervollständigung, Diagnose
* **KI-Funktionen hinzufügen**: KI-Assistenten mit der Chat Participant API erstellen, Modelle mit der Language Model API aufrufen

<!-- ![Platzhalter: VS Code-Erweiterungs-Ökosystem-Diagramm mit erweiterbaren Bereichen: Seitenleiste, Editor, Statusleiste, Befehlspalette, Chat-Panel](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![Diagramm des VS Code-Erweiterungs-Ökosystems mit den Bereichen, die Erweiterungen erweitern können: Seitenleiste, Editor, Statusleiste, Befehlspalette und Chat-Panel](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 Kernarchitektur einer VS Code-Erweiterung

Eine VS Code-Erweiterung läuft in einem isolierten **Extension Host**-Prozess, getrennt vom Hauptprozess des Editors. Das bedeutet, dass selbst wenn eine Erweiterung abstürzt, der Editor selbst nicht beeinträchtigt wird.

Eine typische Erweiterung hat diese Kernbestandteile:

* **package.json (Manifest)**: der "Ausweis" der Erweiterung, der Name, Einstiegsdatei, Contribution Points (`commands`, `menus`, `keybindings` usw.) deklariert
* **extension.ts (Einstiegsdatei)**: das "Gehirn" der Erweiterung, das `activate()` und `deactivate()` exportiert
* **Contribution Points**: das, was Ihre Erweiterung zu VS Code in der package.json beiträgt (Befehle, Menüelemente, Tastenkombinationen, Ansichten usw.)
* **VS Code API**: das TypeScript-API-Set zum Bedienen von Editor-Funktionen

```text
VS Code Editor
    │
    ├── Extension Host (Erweiterungsprozess)
    │   ├── Ihre Erweiterung
    │   │   ├── package.json  -> deklariert "was ich kann"
    │   │   ├── extension.ts  -> implementiert "wie es funktioniert"
    │   │   └── andere Module -> konkreter Funktionscode
    │   ├── Andere Erweiterung A
    │   └── Andere Erweiterung B
    │
    └── Editor-Hauptprozess (UI-Rendering)
```

<!-- ![Platzhalter: VS Code-Erweiterungsarchitekturdiagramm mit Extension Host vs. Editor-Hauptprozess](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![Architekturdiagramm der VS Code-Erweiterung mit dem Extension Host-Prozess und dem Editor-Hauptprozess](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 Welche Erweiterung bauen wir?

Wir werden eine VS Code-Erweiterung namens **"AI Project Bot"** erstellen, einen KI-Projektassistenten mit folgenden Funktionen:

| Funktion | Beschreibung |
|------|------|
| Projektvorlagen | Seitenleisten-Liste von Vorlagen, Ein-Klick-Projektgerüst-Erstellung |
| KI-Chat | `@project-bot`-Teilnehmer im VS Code Chat für Projekt-Fragen |
| Datei/Ausschnitt-Chat | Rechtsklick auf ausgewählten Code oder Datei und an KI zur Analyse/Erklärung/Refactoring senden |
| Multi-Datei-F&A | Mehrfachauswahl von Dateien im Explorer und KI bitten, Beziehungen und Logik zu analysieren |
| Tastenkombinationen | Benutzerdefinierte Keybindings zum schnellen Auslösen häufiger Aktionen |

<!-- ![Platzhalter: AI Project Bot-Vorschau mit Seitenleisten-Vorlagen, @project-bot-Chat-Panel und Rechtsklick-Menü](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![Vorschau der AI Project Bot-Erweiterung mit der Vorlagenliste in der Seitenleiste, dem @project-bot-Chat-Panel und dem Rechtsklick-Menü](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 Tutoriums-Fahrplan

Wir werden den Ablauf in diesen Schritten abschließen:

1. **Erweiterungsprojekt erstellen** (3 Minuten): Projektgerüst erstellen und Kerndateien verstehen
2. **Projektvorlagen implementieren** (5 Minuten): TreeView verwenden, um Vorlagen in der Seitenleiste anzuzeigen und Projekte zu erstellen
3. **KI-Chat-Teilnehmer implementieren** (5 Minuten): `@project-bot` über die Chat Participant API erstellen
4. **Datei/Ausschnitt-Chat und Multi-Datei-F&A implementieren** (5 Minuten): Rechtsklick-Menüs + Mehrfachauswahlanalyse
5. **Tastenkombinationen und UX-Verbesserungen hinzufügen** (3 Minuten): Keybindings und Statusleisten-Hinweise
6. **Im Marketplace veröffentlichen** (optional): Verpacken und einreichen

# Kapitel 2: Das Erweiterungsprojekt erstellen (3 Minuten)

## 2.1 Projekt mit Gerüst erstellen

VS Code bietet offiziell ein Yeoman-Gerüstwerkzeug. Bitten Sie KI, Folgendes auszuführen:

```text
Bitte helfen Sie mir, VS Code-Erweiterungs-Gerüstwerkzeuge zu installieren und ein Projekt zu erstellen:
1. Yeoman und generator-code installieren: npm install -g yo generator-code
2. yo code ausführen und wählen:
   - Typ: New Extension (TypeScript)
   - Name: ai-project-bot
   - Kennung: ai-project-bot
   - Beschreibung: KI-Projektassistent - Vorlagenerstellung, intelligenter Chat, Multi-Datei-F&A
   - Paketmanager: npm
3. Projektverzeichnis öffnen und Abhängigkeiten installieren
```

Erzeugte Struktur:

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # Debug-Konfiguration (F5 startet Debugging)
│   └── tasks.json           # Build-Aufgaben
├── src/
│   └── extension.ts         # Einstiegsdatei der Erweiterung
├── package.json             # Erweiterungs-Manifest (wichtigste Datei)
├── tsconfig.json            # TypeScript-Konfiguration
└── vsc-extension-quickstart.md  # Schnellstart-Leitfaden (kann entfernt werden)
```

## 2.2 package.json verstehen: Der "Ausweis" der Erweiterung

`package.json` ist die Kerndatei einer VS Code-Erweiterung. Neben den normalen npm-Feldern enthält sie `contributes`, um alles zu deklarieren, was Ihre Erweiterung zu VS Code beiträgt:

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "KI-Projektassistent - Vorlagenerstellung, intelligenter Chat, Multi-Datei-F&A",
  "version": "0.0.1",
  "engines": { "vscode": "^1.90.0" },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [],
    "menus": {},
    "keybindings": [],
    "viewsContainers": {},
    "views": {},
    "chatParticipants": []
  }
}
```

**Wichtige Felder:**

| Feld | Zweck |
|------|------|
| `engines.vscode` | Mindestens unterstützte VS Code-Version |
| `activationEvents` | Wann die Erweiterung aktiviert wird (leer bedeutet bedarfsgesteuerte Aktivierung) |
| `main` | Pfad zur kompilierten Einstiegsdatei |
| `contributes` | Alle beigetragenen Funktionen (Befehle, Menüs, Tastenkombinationen, Ansichten usw.) |

<!-- ![Platzhalter: package.json-Screenshot mit hervorgehobenem contributes-Feld](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![Screenshot der package.json-Datei im Editor mit hervorgehobenem contributes-Feld](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 extension.ts verstehen: Das "Gehirn" der Erweiterung

Öffnen Sie `src/extension.ts` und Sie werden zwei Kernfunktionen sehen:

```typescript
import * as vscode from 'vscode'

// Wird aufgerufen, wenn die Erweiterung aktiviert wird (erste Befehlsausführung, Öffnen bestimmter Dateien usw.)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot aktiviert!')

  // Befehle, Ansichten, Chat-Teilnehmer usw. registrieren
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hallo von AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// Wird aufgerufen, wenn die Erweiterung deaktiviert wird (z. B. wenn VS Code geschlossen wird)
export function deactivate() {}
```

**Kernkonzepte:**

* `activate(context)`: Erweiterungsinitialisierung, alle Funktionen hier registrieren
* `context.subscriptions`: eine automatische Bereinigungsliste; VS Code gibt registrierte Elemente bei Deaktivierung frei
* `vscode.commands.registerCommand`: Befehl registrieren, der über die Befehlspalette aufrufbar ist (`Ctrl+Shift+P`)

## 2.4 Debugging starten

Drücken Sie **F5**, und VS Code öffnet ein neues **Extension Development Host**-Fenster. Dies ist eine frische VS Code-Instanz mit Ihrer geladenen Erweiterung.

Im neuen Fenster drücken Sie **Ctrl+Shift+P**, tippen "Hello World" ein, und Sie sehen eine Nachricht als Popup. Das bedeutet, dass Ihre Erweiterung läuft.

<!-- ![Platzhalter: VS Code-Erweiterungs-Debugging-Screenshot mit Extension Development Host und Hello World-Nachricht](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![Screenshot des Debuggens einer VS Code-Erweiterung mit dem Extension Development Host-Fenster und der Hello World-Nachricht](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **Debugging-Tipp**: Nach Code-Änderungen im Extension Development Host **Ctrl+Shift+P** drücken -> **Developer: Reload Window**, um die Erweiterung schnell neu zu laden.

# Kapitel 3: Projektvorlagen implementieren (5 Minuten)

## 3.1 Vorlagensystem entwerfen

Wir möchten ein "Projektvorlagen"-Panel in der VS Code-Seitenleiste hinzufügen, in dem Benutzer Vorlagen durchsuchen und Projektgerüste mit einem Klick erstellen können. Dies verwendet die VS Code **TreeView-API**.

Bitten Sie KI, Folgendes zu implementieren:

```text
Bitte helfen Sie mir, Projektvorlagen in ai-project-bot zu implementieren:

1. Contribution Points in package.json hinzufügen:
   - Ein neues viewsContainers.activitybar-Element mit id "project-bot", Titel "AI Project Bot"
   - Eine Ansicht darunter mit id "projectTemplates", Name "Projektvorlagen"
   - Befehl "ai-project-bot.createFromTemplate", Titel "Projekt aus Vorlage erstellen"

2. src/templates/templateProvider.ts erstellen:
   - TreeDataProvider mit Vorlagenkategorien und Vorlagen implementieren:
     - Frontend: React + TypeScript, Vue 3 + TypeScript, Next.js App
     - Backend: Express API, FastAPI Python
     - Full-Stack: T3 Stack (Next.js + tRPC + Prisma)
   - Jedes Vorlagenelement zeigt Name, Beschreibung und Icon

3. src/templates/scaffolder.ts erstellen:
   - Funktion createProjectFromTemplate implementieren
   - Benutzer Zielordner wählen lassen
   - Projektstruktur nach Vorlagentyp erstellen
```

## 3.2 Ansicht in package.json deklarieren

Fügen Sie zuerst die Seitenleisten-Ansichts-Contributions in `package.json` hinzu:

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "project-bot",
          "title": "AI Project Bot",
          "icon": "resources/bot-icon.svg"
        }
      ]
    },
    "views": {
      "project-bot": [
        {
          "id": "projectTemplates",
          "name": "Projektvorlagen"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "Projekt aus Vorlage erstellen",
        "icon": "$(add)"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "ai-project-bot.createFromTemplate",
          "when": "view == projectTemplates",
          "group": "navigation"
        }
      ]
    }
  }
}
```

Diese Konfiguration bewirkt drei Dinge:

1. Fügt einen "AI Project Bot"-Icon-Eintrag in der Aktivitätsleiste hinzu
2. Erstellt eine "Projektvorlagen"-Ansicht unter diesem Eintrag
3. Fügt eine "+"-Schaltfläche in der Ansichtstitelleiste zur Projekterstellung hinzu

<!-- ![Platzhalter: Screenshot zeigt AI Project Bot-Icon und Projektvorlagenliste in der VS Code-Seitenleiste](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![Screenshot zeigt das AI Project Bot-Icon und die Projektvorlagenliste in der VS Code-Seitenleiste](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 TreeDataProvider implementieren

TreeDataProvider ist die Schnittstelle, die VS Code verwendet, um Baumdaten zu füllen. Wir benötigen `getTreeItem` (Anzeigeinformationen für einen Knoten) und `getChildren` (Liste der untergeordneten Knoten).

Kerncode:

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // Befehl zum Erstellen des Projekts, z. B. "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'React-Projekt mit Vite erstellt', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'Vue 3-Projekt mit Vite erstellt', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Next.js App Router Full-Stack-Projekt', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'Express + TypeScript REST API', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Python FastAPI Backend-Projekt', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// Baumknoten: Kategorie oder Vorlage
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nBefehl: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Projekt erstellen',
        arguments: [template]
      }
    }
  }
}

export class TemplateProvider implements vscode.TreeDataProvider<TemplateItem> {
  getTreeItem(element: TemplateItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: TemplateItem): TemplateItem[] {
    if (!element) {
      // Wurzel: Kategorienliste zurückgeben
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // Kinder: Vorlagen in der Kategorie
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 Ansicht und Erstellungsbefehl registrieren

Registrieren Sie TreeView und Projekterstellungsbefehl in `extension.ts`:

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // Vorlagenansicht registrieren
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // Projekterstellungsbefehl registrieren
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // Wenn keine Vorlage übergeben wurde (über Befehlspalette aufgerufen), Benutzer auswählen lassen
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'Wählen Sie eine Projektvorlage' }
        )
        if (!pick) return
        template = pick.template
      }

      // Nach Projektname fragen
      const name = await vscode.window.showInputBox({
        prompt: 'Projektname eingeben',
        placeHolder: 'mein-tolles-projekt'
      })
      if (!name) return

      // Nach Zielordner fragen
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'Zielordner auswählen'
      })
      if (!folder) return

      // Erstellungsbefehl ausführen
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`Erstelle ${template.name}-Projekt: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

Drücken Sie nun F5 zum Debuggen. Sie sehen AI Project Bot in der Aktivitätsleiste. Erweitern Sie die Vorlagenliste und klicken Sie auf eine beliebige Vorlage, um ein Projekt zu erstellen.

<!-- ![Platzhalter: Screenshot zeigt Projekteingabe und Ordnerauswahldialog nach Klick auf eine Vorlage](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![Screenshot zeigt das Projekteingabefeld und den Ordnerauswahldialog nach Klick auf eine Vorlage](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# Kapitel 4: KI-Chat-Teilnehmer implementieren (5 Minuten)

## 4.1 Was ist die Chat Participant API?

Ab VS Code 1.90 können Erweiterungen ihren eigenen KI-Assistenten im Chat-Panel über die **Chat Participant API** erstellen. Wenn ein Benutzer `@project-bot hilf mir, diese Projektarchitektur zu analysieren` eingibt, empfängt Ihre Erweiterung die Nachricht und gibt eine modellgenerierte Antwort zurück.

Kernkonzepte:

* **Participant**: Ihre Assistentenidentität im Chat-Panel, aufgerufen mit `@name`
* **Slash-Befehle**: Vom Teilnehmer unterstützte Schnellbefehle, wie `/explain`, `/refactor`
* **Language Model API**: integrierte Modelle in VS Code aufrufen (z. B. Copilot GPT-4o)
* **Stream**: Antworten progressiv über `stream.markdown()` ausgeben

## 4.2 Chat-Teilnehmer in package.json deklarieren

Fügen Sie dies in `contributes` hinzu:

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "Ihr KI-Projektassistent für Code-Analyse, Architektur-Erklärung und Lösungsgenerierung",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` bedeutet, dass einmal ausgewählt, weitere Nachrichten standardmäßig an diesen Teilnehmer gehen, ohne dass jedes Mal `@project-bot` eingegeben werden muss.

## 4.3 Chat-Participant-Handler implementieren

Bitten Sie KI, die Kernlogik zu schreiben:

```text
Bitte helfen Sie mir, src/chat/chatParticipant.ts zu erstellen und Chat Participant zu implementieren:
1. Teilnehmer "ai-project-bot.projectBot" registrieren
2. Drei Slash-Befehle unterstützen:
   - /explain: ausgewählten Code oder aktuelle Datei erklären
   - /refactor: Refactoring-Vorschläge bereitstellen
   - /template: geeignete Tech-Stack-Vorlagen empfehlen
3. Language Model API mit dem in VS Code integrierten Modell verwenden
4. Antwort im Streaming-Modus zurückgeben (stream.markdown)
```

Kerncode:

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // Verfügbares Modell auswählen
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('Kein Sprachmodell verfügbar. Bitte stellen Sie sicher, dass GitHub Copilot installiert ist.')
        return
      }

      // System-Prompt nach Slash-Befehl erstellen
      let systemPrompt = 'Sie sind ein professioneller Projektentwicklungsassistent.'

      if (request.command === 'explain') {
        systemPrompt = 'Sie sind ein Code-Erklärungs-Experte. Bitte erklären Sie den Benutzercode in präzisem Deutsch, einschließlich Zweck, logischem Ablauf und wichtigen Designentscheidungen.'
      } else if (request.command === 'refactor') {
        systemPrompt = 'Sie sind ein Code-Refactoring-Experte. Analysieren Sie den Benutzercode und geben Sie konkrete Refactoring-Vorschläge mit verbesserten Codebeispielen.'
      } else if (request.command === 'template') {
        systemPrompt = 'Sie sind ein Tech-Stack-Auswahl-Experte. Empfehlen Sie geeignete Tech-Stacks und Projektvorlagen basierend auf den Benutzeranforderungen.'
      }

      // Nachrichten erstellen
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // Stream-Ausgabe
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // Slash-Befehle registrieren
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: 'Code-Funktion und Logik erklären' },
      { name: 'refactor', description: 'Refactoring-Vorschläge und Verbesserungen bereitstellen' },
      { name: 'template', description: 'Geeignete Projektvorlagen und Tech-Stacks empfehlen' }
    ]
  }

  // Folgevorschläge registrieren
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: 'Können Sie ein Flussdiagramm erstellen?', label: 'Flussdiagramm generieren' },
          { prompt: 'Gibt es hier potenzielle Bugs?', label: 'Potenzielle Probleme prüfen' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

Rufen Sie die Registrierung in `extension.ts` auf:

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... vorheriger Vorlagen-Registrierungscode ...
  registerChatParticipant(context)
}
```

Geben Sie nun `@project-bot /explain was macht dieser Code?` im Chat-Panel ein, und Ihre Erweiterung wird das Modell aufrufen und eine Erklärung generieren.

<!-- ![Platzhalter: VS Code Chat-Screenshot mit @project-bot, /explain-Befehl und Streaming-Antwort](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![Screenshot des VS Code Chat-Panels mit @project-bot, dem /explain-Befehl und einer Streaming-Antwort](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# Kapitel 5: Datei/Ausschnitt-Chat und Multi-Datei-F&A (5 Minuten)

## 5.1 Rechtsklick-Menü: Ausgewählten Code an KI senden

Wir möchten, dass Benutzer Code im Editor auswählen und über das Kontextmenü an die KI senden können. Dies verwendet die VS Code **Context Menu**-Contribution Points.

In `package.json` hinzufügen:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "KI: Ausgewählten Code erklären"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "KI: Ausgewählten Code refactoren"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "ai-project-bot.explainSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@1"
        },
        {
          "command": "ai-project-bot.refactorSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@2"
        }
      ]
    }
  }
}
```

**Wichtige Konfigurationshinweise:**

* `when: "editorHasSelection"`: Menü nur anzeigen, wenn Text ausgewählt ist
* `group: "ai-project-bot@1"`: Menügruppierung und Reihenfolge (`@1`, `@2`)

## 5.2 Ausgewählten-Code-Analyse implementieren

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // Ausgewählten Code erklären
  const explainCmd = vscode.commands.registerCommand(
    'ai-project-bot.explainSelection',
    async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const selectedText = editor.document.getText(selection)
      const fileName = editor.document.fileName.split('/').pop()
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1

      // Prompt mit Kontext erstellen
      const prompt = [
        `Bitte erklären Sie den folgenden Code (aus ${fileName}, Zeilen ${startLine}-${endLine}):`,
        '```',
        selectedText,
        '```',
        'Bitte erklären Sie: 1) was dieser Code tut 2) Kernlogik 3) mögliche Verbesserungen'
      ].join('\n')

      // Language Model API aufrufen
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('Kein Sprachmodell verfügbar')
        return
      }

      // Ergebnisse im Ausgabe-Panel anzeigen
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Code-Erklärung (${fileName}:${startLine}-${endLine}) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(explainCmd)
}
```

<!-- ![Platzhalter: Screenshot des Editor-Kontextmenüs mit KI-Elementen nach Code-Auswahl](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png) -->
![Screenshot des Editor-Kontextmenüs mit KI-Elementen nach Code-Auswahl](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 Multi-Datei-F&A: Dateibeziehungen batch-analysieren

Dies ist eine der leistungsstärksten Funktionen: Mehrfachauswahl von Dateien im Explorer und KI-Analyse von Beziehungen und Logik mit einem Klick.

Explorer-Kontextmenü in `package.json` hinzufügen:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "KI: Beziehungen ausgewählter Dateien analysieren"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "ai-project-bot.analyzeFiles",
          "when": "explorerResourceIsFile",
          "group": "ai-project-bot"
        }
      ]
    }
  }
}
```

Multi-Datei-Analysebefehl implementieren:

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles enthält alle ausgewählten Dateien
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('Bitte wählen Sie mindestens 2 Dateien zur Analyse aus')
        return
      }

      // Alle ausgewählten Dateien lesen
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `Bitte analysieren Sie die Beziehungen zwischen diesen ${files.length} Dateien:`,
        '',
        ...fileContents,
        '',
        'Bitte erklären Sie:',
        '1. Verantwortlichkeiten jeder Datei',
        '2. Abhängigkeits-/Aufrufbeziehungen zwischen ihnen',
        '3. Datenfluss (falls vorhanden)',
        '4. Architektur-Vorschläge oder potenzielle Probleme'
      ].join('\n')

      // Modell aufrufen und Ergebnis anzeigen
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('Kein Sprachmodell verfügbar')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Multi-Datei-Analyse (${files.length} Dateien) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(analyzeCmd)
}
```

Verwendung: Im Explorer `Strg` (`Cmd` auf Mac) gedrückt halten, um Dateien mehrfach auszuwählen, Rechtsklick und "KI: Beziehungen ausgewählter Dateien analysieren" wählen. Die KI liest alle ausgewählten Dateien und gibt eine Analyse zurück.

<!-- ![Platzhalter: Screenshot des Explorers mit mehrfach ausgewählten Dateien und KI-Analyse-Kontextmenüelement](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png) -->
![Screenshot des Explorers mit mehreren ausgewählten Dateien und einem KI-Analyse-Element im Kontextmenü](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# Kapitel 6: Tastenkombinationen und UX-Optimierung (3 Minuten)

## 6.1 Benutzerdefinierte Tastenkombinationen

Tastenkombinationen sind entscheidend für die Effizienz. In `package.json` hinzufügen:

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "ai-project-bot.explainSelection",
        "key": "ctrl+shift+e",
        "mac": "cmd+shift+e",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "key": "ctrl+shift+r",
        "mac": "cmd+shift+r",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.createFromTemplate",
        "key": "ctrl+shift+n",
        "mac": "cmd+shift+n",
        "when": ""
      }
    ]
  }
}
```

**`when`-Bedingungen:**

| Bedingung | Bedeutung |
|------|------|
| `editorTextFocus` | Cursor befindet sich im Editor |
| `editorHasSelection` | Etwas Text ist ausgewählt |
| `explorerViewletVisible` | Explorer-Panel ist sichtbar |
| `!editorReadonly` | Datei ist nicht schreibgeschützt |

Mehrere durch `&&` verbundene Bedingungen bedeuten, dass alle erfüllt sein müssen.

## 6.2 Statusleisten-Hinweis

Fügen Sie einen schnellen Statusleisten-Eintrag hinzu, damit Benutzer immer wissen, dass die Erweiterung läuft:

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = 'Klicken, um AI Project Bot zu öffnen'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` ist die eingebaute VS Code-Icon-Syntax. Sie finden alle Icons in der [Codicon-Bibliothek](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

<!-- ![Platzhalter: Screenshot des AI Bot-Icons in der VS Code-Statusleiste](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![Screenshot des AI Bot-Icons in der VS Code-Statusleiste](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# Kapitel 7: Im Marketplace veröffentlichen (Optional)

## 7.1 Veröffentlichung vorbereiten

VS Code-Erweiterungen werden mit **vsce** verpackt und veröffentlicht:

```text
Bitte helfen Sie mir, vsce zu installieren: npm install -g @vscode/vsce
```

Vor der Veröffentlichung vorbereiten:

1. **Azure DevOps-Konto**: Registrieren und eine Organisation unter [dev.azure.com](https://dev.azure.com/) erstellen
2. **Personal Access Token (PAT)**: In Azure DevOps mit Berechtigung **Marketplace -> Manage** erstellen
3. **Publisher-ID**: Herausgeberidentität im [VS Code Marketplace](https://marketplace.visualstudio.com/manage) erstellen

## 7.2 package.json-Metadaten verbessern

Metadaten vor der Veröffentlichung hinzufügen:

```json
{
  "publisher": "ihre-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/ihrname/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "project", "template", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

Sie benötigen außerdem eine `README.md` für die Marketplace-Beschreibung und eine `CHANGELOG.md` für den Versionsverlauf.

## 7.3 Verpacken und veröffentlichen

```bash
# Als .vsix verpacken (manuelle Installationsdatei)
vsce package

# Im Marketplace veröffentlichen
vsce publish
```

Nach dem Verpacken erhalten Sie `ai-project-bot-0.0.1.vsix`. Sie können diese Datei an Freunde senden, die sie über "Install from VSIX" in VS Code installieren können.

Für die offizielle Marketplace-Veröffentlichung führen Sie `vsce publish` aus; die Erweiterung erscheint normalerweise innerhalb weniger Minuten.

<!-- ![Platzhalter: Screenshot der AI Project Bot-Erweiterungsseite im VS Code Marketplace](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **Tipp**: Die erste Veröffentlichung kann eine Überprüfung erfordern. Stellen Sie sicher, dass die README klar ist und Screenshots vollständig sind, um die Genehmigung zu beschleunigen.

# Kapitel 8: Abschließende Bemerkungen

Herzlichen Glückwunsch! Sie haben eine voll funktionsfähige VS Code-Erweiterung von Grund auf neu erstellt. Zusammenfassung:

1. Erweiterungsprojekt mit Yeoman-Gerüst erstellt und die Rollen von `package.json` und `extension.ts` verstanden
2. Seitenleisten-Projektvorlagenliste mit der TreeView-API und Ein-Klick-Projekterstellung implementiert
3. `@project-bot`-KI-Assistent mit der Chat Participant API erstellt, einschließlich Slash-Befehlen und Streaming-Antworten
4. Rechtsklick-Code-Auswahlanalyse implementiert
5. Multi-Datei-Beziehungsanalyse implementiert
6. Benutzerdefinierte Tastenkombinationen und Statusleisten-Hinweise hinzugefügt

Der Vorstellungsraum der VS Code-Erweiterungsentwicklung ist riesig. Die Technologie hinter den nützlichen Erweiterungen, die Sie täglich nutzen, ist genau das, was Sie gerade gelernt haben.

**Weiterführende Richtungen:**

* **Benutzerdefinierte Webview-Panels**: Vollständig benutzerdefinierte UI mit HTML/CSS/JS erstellen, wie visuelle Architekturdiagramme und interaktive Code-Review-Oberflächen
* **Language Model Tools**: Benutzerdefinierte Tools registrieren, die von KI aufgerufen werden können, wie Datenbankabfragen oder API-Anfragen
* **Diagnose und CodeLens**: KI-Vorschläge, Leistungshinweise und Sicherheitswarnungen inline anzeigen
* **Benutzerdefinierte Sprachunterstützung**: Syntax-Hervorhebung, Vervollständigung und Diagnose für DSLs oder spezifische Konfigurationsformate bereitstellen
* **Remote-Entwicklungsintegration**: Erweiterung in SSH, Containern und WSL funktionsfähig machen

***Ihr Editor, Ihre Regeln.***

# Referenzen

* [VS Code Extension API-Dokumentation](https://code.visualstudio.com/api)
* [Chat Participant API-Leitfaden](https://code.visualstudio.com/api/extension-guides/chat)
* [Language Model API-Leitfaden](https://code.visualstudio.com/api/extension-guides/language-model)
* [TreeView API-Leitfaden](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Webview API-Leitfaden](https://code.visualstudio.com/api/extension-guides/webview)
* [VS Code-Erweiterungsveröffentlichungs-Leitfaden](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Codicon-Icon-Bibliothek](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
