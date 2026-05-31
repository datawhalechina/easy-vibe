# Comment créer une extension VS Code : Construisez votre assistant de projet IA

# Chapitre 1 : Qu'est-ce que le développement d'extensions VS Code

Dans ce tutoriel, nous allons réaliser une boucle complète : créer une extension VS Code from scratch qui servira d'assistant de projet IA, avec génération de modèles de projets en un clic, chat IA sur des fichiers ou extraits de code sélectionnés, analyse Q&R multi-fichiers et raccourcis personnalisés. Vous effectuerez le développement, le débogage et apprendrez à publier sur le VS Code Marketplace.

Pour ce tutoriel, vous devez disposer au minimum de :

- Environnement Node.js (version 18.0+)
- Éditeur VS Code (version 1.90+)
- Votre assistant de codage IA (Cursor / Trae / Claude Code)
- (Facultatif) Abonnement GitHub Copilot (pour l'API Language Model)

> **Vibe Coding de bout en bout** : nous utiliserons un assistant de codage IA pour générer la majeure partie du code. Vous n'avez besoin que de comprendre les concepts clés et l'architecture, puis de décrire vos besoins en langage naturel.

## 1.1 Que peuvent faire les extensions VS Code ?

Vous utilisez déjà des extensions VS Code au quotidien. Prettier formate votre code, GitLens affiche l'historique Git et GitHub Copilot vous aide à écrire du code. Ces extensions sont essentiellement des programmes écrits en TypeScript/JavaScript qui étendent l'éditeur via les API VS Code.

Les extensions VS Code peuvent faire bien plus que ce que beaucoup de gens imaginent :

* **Ajouter de nouveaux éléments d'interface** : panneaux de barre latérale, informations de barre d'état, pages Webview personnalisées
* **Manipuler les fichiers et le code** : lire, modifier et créer des fichiers ; analyser la structure du code
* **Intégrer des services externes** : appeler des API, se connecter à des bases de données, intégrer CI/CD
* **Étendre les capacités de l'éditeur** : support de langages personnalisés, complétion de code, diagnostics
* **Ajouter des capacités IA** : créer des assistants IA avec l'API Chat Participant, appeler des modèles avec l'API Language Model

<!-- ![placeholder: VS Code extension ecosystem diagram showing expandable areas: sidebar, editor, status bar, command palette, Chat panel](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![Diagramme de l'écosystème des extensions VS Code montrant les zones extensibles : barre latérale, éditeur, barre d'état, palette de commandes et panneau Chat](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 Architecture de base d'une extension VS Code

Une extension VS Code s'exécute dans un processus **Extension Host** isolé, séparé du processus principal de l'éditeur. Cela signifie que même si une extension plante, l'éditeur lui-même n'est pas affecté.

Une extension typique comporte ces éléments fondamentaux :

* **package.json (manifeste)** : la « carte d'identité » de l'extension, déclarant le nom, le fichier d'entrée, les points de contribution (`commands`, `menus`, `keybindings`, etc.)
* **extension.ts (fichier d'entrée)** : le « cerveau » de l'extension, exportant `activate()` et `deactivate()`
* **Points de contribution** : ce que votre extension contribue à VS Code dans package.json (commandes, éléments de menu, raccourcis clavier, vues, etc.)
* **API VS Code** : l'ensemble d'API TypeScript utilisé pour exploiter les capacités de l'éditeur

```text
Éditeur VS Code
    │
    ├── Extension Host (processus d'extension)
    │   ├── Votre extension
    │   │   ├── package.json  -> déclare « ce que je peux faire »
    │   │   ├── extension.ts  -> implémente « comment le faire »
    │   │   └── autres modules -> code concret des fonctionnalités
    │   ├── Autre extension A
    │   └── Autre extension B
    │
    └── Processus principal de l'éditeur (rendu UI)
```

<!-- ![placeholder: VS Code extension architecture diagram showing Extension Host vs editor main process](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![Diagramme d'architecture d'une extension VS Code montrant le processus Extension Host et le processus principal de l'éditeur](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 Quelle extension allons-nous construire ?

Nous allons construire une extension VS Code nommée **« AI Project Bot »**, un assistant de projet IA avec les fonctionnalités suivantes :

| Fonctionnalité | Description |
|------|------|
| Modèles de projets | Liste de modèles dans la barre latérale, génération de squelette de projet en un clic |
| Chat IA | Participant `@project-bot` dans VS Code Chat pour les Q&R sur le projet |
| Chat fichier/extrait | Clic droit sur du code ou un fichier sélectionné et envoi à l'IA pour analyse/explication/refactorisation |
| Q&R multi-fichiers | Sélection multiple de fichiers dans l'explorateur et demande à l'IA d'analyser les relations et la logique |
| Raccourcis | Raccourcis clavier personnalisés pour déclencher rapidement les actions courantes |

<!-- ![placeholder: AI Project Bot preview showing sidebar templates, @project-bot chat panel, and right-click menu](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![Aperçu de l'extension AI Project Bot montrant la liste des modèles dans la barre latérale, le panneau de chat @project-bot et le menu contextuel](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 Feuille de route du tutoriel

Nous allons suivre ces étapes :

1. **Créer le projet d'extension** (3 minutes) : scaffolder le projet et comprendre les fichiers clés
2. **Implémenter les modèles de projets** (5 minutes) : utiliser TreeView pour afficher les modèles dans la barre latérale et générer des projets
3. **Implémenter le participant AI Chat** (5 minutes) : créer `@project-bot` via l'API Chat Participant
4. **Implémenter le chat fichier/extrait et la Q&R multi-fichiers** (5 minutes) : menus contextuels + analyse multi-sélection
5. **Ajouter des raccourcis et peaufiner l'UX** (3 minutes) : raccourcis clavier et indicateurs dans la barre d'état
6. **Publier sur le marketplace** (facultatif) : empaqueter et soumettre

# Chapitre 2 : Créer le projet d'extension (3 minutes)

## 2.1 Générer le projet avec le scaffolder

VS Code fournit officiellement un outil de scaffolding Yeoman. Demandez à l'IA d'exécuter :

```text
Aidez-moi à installer les outils de scaffolding d'extensions VS Code et à créer un projet :
1. Installer Yeoman et generator-code : npm install -g yo generator-code
2. Exécuter yo code et choisir :
   - Type : New Extension (TypeScript)
   - Nom : ai-project-bot
   - Identifiant : ai-project-bot
   - Description : Assistant de projet IA - génération de modèles, chat intelligent, Q&R multi-fichiers
   - Gestionnaire de paquets : npm
3. Entrer dans le répertoire du projet et installer les dépendances
```

Structure générée :

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # Configuration de débogage (F5 démarre le débogage)
│   └── tasks.json           # Tâches de build
├── src/
│   └── extension.ts         # Fichier d'entrée de l'extension
├── package.json             # Manifeste de l'extension (fichier le plus important)
├── tsconfig.json            # Configuration TypeScript
└── vsc-extension-quickstart.md  # Guide de démarrage rapide (peut être supprimé)
```

## 2.2 Comprendre package.json : la « carte d'identité » de l'extension

`package.json` est le fichier central d'une extension VS Code. Outre les champs npm classiques, il contient `contributes` pour déclarer tout ce que votre extension apporte à VS Code :

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "Assistant de projet IA - génération de modèles, chat intelligent, Q&R multi-fichiers",
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

**Champs clés :**

| Champ | Rôle |
|------|------|
| `engines.vscode` | Version minimale de VS Code prise en charge |
| `activationEvents` | Quand l'extension s'active (vide = activation à la demande) |
| `main` | Chemin vers le fichier d'entrée compilé |
| `contributes` | Toutes les fonctionnalités contribuées (commandes, menus, raccourcis, vues, etc.) |

<!-- ![placeholder: package.json screenshot with contributes field highlighted](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![Capture d'écran du fichier package.json dans l'éditeur avec le champ contributes mis en surbrillance](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 Comprendre extension.ts : le « cerveau » de l'extension

Ouvrez `src/extension.ts` et vous verrez deux fonctions centrales :

```typescript
import * as vscode from 'vscode'

// Appelée lors de l'activation de l'extension (première exécution de commande, ouverture de fichiers spécifiques, etc.)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot activated!')

  // Enregistrer les commandes, vues, participants de chat, etc.
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello from AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// Appelée lors de la désactivation de l'extension (par exemple à la fermeture de VS Code)
export function deactivate() {}
```

**Concepts clés :**

* `activate(context)` : initialisation de l'extension, enregistrer toutes les capacités ici
* `context.subscriptions` : une liste de nettoyage automatique ; VS Code supprime les éléments enregistrés lors de la désactivation
* `vscode.commands.registerCommand` : enregistrer une command appelable depuis la palette de commandes (`Ctrl+Shift+P`)

## 2.4 Démarrer le débogage

Appuyez sur **F5**, et VS Code ouvre une nouvelle fenêtre **Extension Development Host**. Il s'agit d'une instance VS Code vierge avec votre extension chargée.

Dans la nouvelle fenêtre, appuyez sur **Ctrl+Shift+P**, tapez « Hello World », et vous verrez un message popup. Cela signifie que votre extension fonctionne.

<!-- ![placeholder: VS Code extension debugging screenshot showing Extension Development Host and Hello World message](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![Capture d'écran du débogage d'une extension VS Code, montrant la fenêtre Extension Development Host et le message Hello World](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **Astuce de débogage** : après des modifications de code, dans l'Extension Development Host, appuyez sur **Ctrl+Shift+P** -> **Developer: Reload Window** pour recharger rapidement l'extension.

# Chapitre 3 : Implémenter les modèles de projets (5 minutes)

## 3.1 Concevoir le système de modèles

Nous voulons ajouter un panneau « Modèles de projets » dans la barre latérale de VS Code où les utilisateurs peuvent parcourir les modèles et générer des squelettes de projets en un clic. Cela utilise l'API **TreeView** de VS Code.

Demandez à l'IA d'implémenter :

```text
Aidez-moi à implémenter les modèles de projets dans ai-project-bot :

1. Ajouter des points de contribution dans package.json :
   - Ajouter un nouvel élément viewsContainers.activitybar avec l'id « project-bot », le titre « AI Project Bot »
   - Ajouter une vue en dessous avec l'id « projectTemplates », le nom « Modèles de projets »
   - Ajouter la commande « ai-project-bot.createFromTemplate », titre « Créer un projet à partir d'un modèle »

2. Créer src/templates/templateProvider.ts :
   - Implémenter TreeDataProvider avec des catégories de modèles et des modèles :
     - Frontend : React + TypeScript, Vue 3 + TypeScript, Next.js App
     - Backend : Express API, FastAPI Python
     - Full-stack : T3 Stack (Next.js + tRPC + Prisma)
   - Chaque élément de modèle affiche le nom, la description et l'icône

3. Créer src/templates/scaffolder.ts :
   - Implémenter la fonction createProjectFromTemplate
   - Laisser l'utilisateur choisir le dossier cible
   - Générer la structure du projet selon le type de modèle
```

## 3.2 Déclarer la vue dans package.json

Ajoutez d'abord les contributions de vue dans la barre latérale dans `package.json` :

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
          "name": "Project Templates"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "Create Project from Template",
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

Cette configuration fait trois choses :

1. Ajoute une entrée d'icône « AI Project Bot » dans la barre d'activité
2. Crée une vue « Project Templates » sous cette entrée
3. Ajoute un bouton « + » dans la barre de titre de la vue pour la création de projets

<!-- ![placeholder: Screenshot showing AI Project Bot icon and project template list in VS Code sidebar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![Capture d'écran montrant l'icône AI Project Bot et la liste des modèles de projets dans la barre latérale de VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 Implémenter TreeDataProvider

TreeDataProvider est l'interface utilisée par VS Code pour remplir les données arborescentes. Nous avons besoin de `getTreeItem` (informations d'affichage pour un nœud) et `getChildren` (liste des nœuds enfants).

Code central :

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // commande pour générer le projet, par exemple « npx create-react-app »
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'Projet React construit avec Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'Projet Vue 3 construit avec Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Projet full-stack Next.js App Router', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'API REST Express + TypeScript', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Projet backend Python FastAPI', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// Nœud d'arbre : catégorie ou modèle
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nCommande : ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Créer le projet',
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
      // Racine : retourner la liste des catégories
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // Enfants : modèles dans la catégorie
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 Enregistrer la vue et la commande de création

Enregistrez le TreeView et la commande de création de projet dans `extension.ts` :

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // Enregistrer la vue des modèles
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // Enregistrer la commande de création de projet
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // Si aucun modèle n'est passé (appel depuis la palette de commandes), laisser l'utilisateur choisir
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'Choisissez un modèle de projet' }
        )
        if (!pick) return
        template = pick.template
      }

      // Demander le nom du projet
      const name = await vscode.window.showInputBox({
        prompt: 'Entrez le nom du projet',
        placeHolder: 'mon-super-projet'
      })
      if (!name) return

      // Demander le dossier cible
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'Sélectionner le dossier cible'
      })
      if (!folder) return

      // Exécuter la commande de création
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`Création du projet ${template.name} : ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

Maintenant, appuyez sur F5 pour le débogage. Vous verrez AI Project Bot dans la barre d'activité. Déroulez la liste des modèles et cliquez sur n'importe quel modèle pour créer un projet.

<!-- ![placeholder: Screenshot showing project name input and folder picker dialog after clicking a template](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![Capture d'écran montrant la saisie du nom du projet et le dialogue de sélection de dossier après avoir cliqué sur un modèle](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# Chapitre 4 : Implémenter le participant AI Chat (5 minutes)

## 4.1 Qu'est-ce que l'API Chat Participant ?

Depuis VS Code 1.90, les extensions peuvent créer leur propre assistant IA dans le panneau Chat via l'**API Chat Participant**. Si l'utilisateur saisit `@project-bot aide-moi à analyser l'architecture de ce projet`, votre extension reçoit le message et retourne une réponse générée par le modèle.

Concepts clés :

* **Participant** : l'identité de votre assistant dans le panneau Chat, invoqué avec `@nom`
* **Commandes slash** : commandes rapides prises en charge par le participant, telles que `/explain`, `/refactor`
* **API Language Model** : appeler les modèles intégrés dans VS Code (par exemple Copilot GPT-4o)
* **Stream** : sortie progressive des réponses via `stream.markdown()`

## 4.2 Déclarer le Chat Participant dans package.json

Ajoutez ceci dans `contributes` :

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "Votre assistant de projet IA pour l'analyse de code, l'explication d'architecture et la génération de solutions",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` signifie qu'une fois sélectionné, les messages suivants sont envoyés à ce participant par défaut, sans avoir à taper `@project-bot` à chaque fois.

## 4.3 Implémenter le gestionnaire de Chat Participant

Demandez à l'IA d'écrire la logique centrale :

```text
Aidez-moi à créer src/chat/chatParticipant.ts et à implémenter le Chat Participant :
1. Enregistrer le participant « ai-project-bot.projectBot »
2. Prendre en charge trois commandes slash :
   - /explain : expliquer le code sélectionné ou le fichier courant
   - /refactor : fournir des suggestions de refactorisation
   - /template : recommander des modèles de stack technique adaptés
3. Utiliser l'API Language Model avec le modèle intégré de VS Code
4. Retourner la réponse en mode streaming (stream.markdown)
```

Code central :

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // Sélectionner un modèle disponible
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('Aucun modèle de langage disponible. Veuillez vous assurer que GitHub Copilot est installé.')
        return
      }

      // Construire le prompt système selon la commande slash
      let systemPrompt = 'Vous êtes un assistant professionnel de développement de projets.'

      if (request.command === 'explain') {
        systemPrompt = 'Vous êtes un expert en explication de code. Expliquez le code de l\'utilisateur en français concis, y compris le but, le flux logique et les décisions de conception clés.'
      } else if (request.command === 'refactor') {
        systemPrompt = 'Vous êtes un expert en refactorisation de code. Analysez le code de l\'utilisateur et fournissez des suggestions de refactorisation concrètes avec des exemples de code amélioré.'
      } else if (request.command === 'template') {
        systemPrompt = 'Vous êtes un expert en sélection de stack technique. Recommandez des stacks techniques et des modèles de projets adaptés aux besoins de l\'utilisateur.'
      }

      // Construire les messages
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // Sortie en streaming
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // Enregistrer les commandes slash
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: 'Expliquer la fonction et la logique du code' },
      { name: 'refactor', description: 'Fournir des suggestions de refactorisation et améliorations' },
      { name: 'template', description: 'Recommander des modèles de projets et stacks techniques adaptés' }
    ]
  }

  // Enregistrer les suggestions de suivi
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: 'Peux-tu dessiner un organigramme ?', label: 'Générer un organigramme' },
          { prompt: 'Y a-t-il des bugs potentiels ici ?', label: 'Vérifier les problèmes potentiels' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

Appelez l'enregistrement dans `extension.ts` :

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... code d'enregistrement des modèles précédent ...
  registerChatParticipant(context)
}
```

Maintenant, saisissez `@project-bot /explain que fait ce code ?` dans le panneau Chat, et votre extension appellera le modèle et générera une explication.

<!-- ![placeholder: VS Code Chat screenshot showing @project-bot, /explain command, and streaming response](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![Capture d'écran du panneau VS Code Chat montrant @project-bot, la commande /explain et une réponse en streaming](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# Chapitre 5 : Chat fichier/extrait et Q&R multi-fichiers (5 minutes)

## 5.1 Menu contextuel : envoyer le code sélectionné à l'IA

Nous voulons que les utilisateurs puissent sélectionner du code dans l'éditeur et l'envoyer à l'IA depuis le menu contextuel. Cela utilise les points de contribution **Context Menu** de VS Code.

Ajoutez dans `package.json` :

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "IA : Expliquer le code sélectionné"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "IA : Refactoriser le code sélectionné"
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

**Notes de configuration importantes :**

* `when: "editorHasSelection"` : afficher le menu uniquement lorsque du texte est sélectionné
* `group: "ai-project-bot@1"` : regroupement et ordre des menus (`@1`, `@2`)

## 5.2 Implémenter l'analyse du code sélectionné

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // Expliquer le code sélectionné
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

      // Construire le prompt avec le contexte
      const prompt = [
        `Veuillez expliquer le code suivant (de ${fileName}, lignes ${startLine}-${endLine}) :`,
        '```',
        selectedText,
        '```',
        'Veuillez expliquer : 1) ce que fait ce code 2) la logique centrale 3) les améliorations possibles'
      ].join('\n')

      // Appeler l'API Language Model
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('Aucun modèle de langage disponible')
        return
      }

      // Afficher les résultats dans le panneau de sortie
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Explication du code (${fileName}:${startLine}-${endLine}) ---\n`)

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

<!-- ![placeholder: Screenshot of editor context menu showing AI items after selecting code](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png) -->
![Capture d'écran du menu contextuel de l'éditeur montrant les éléments IA après la sélection de code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 Q&R multi-fichiers : analyse en lot des relations entre fichiers

C'est l'une des fonctionnalités les plus puissantes : sélection multiple de fichiers dans l'explorateur et analyse IA des relations et de la logique en un clic.

Ajoutez le menu contextuel de l'explorateur dans `package.json` :

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "IA : Analyser les relations des fichiers sélectionnés"
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

Implémenter la commande d'analyse multi-fichiers :

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles contient tous les fichiers sélectionnés
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('Veuillez sélectionner au moins 2 fichiers pour l\'analyse')
        return
      }

      // Lire tous les fichiers sélectionnés
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `Veuillez analyser les relations entre ces ${files.length} fichiers :`,
        '',
        ...fileContents,
        '',
        'Veuillez expliquer :',
        '1. Les responsabilités de chaque fichier',
        '2. Les relations de dépendance/appel entre eux',
        '3. Le flux de données (le cas échéant)',
        '4. Suggestions architecturales ou problèmes potentiels'
      ].join('\n')

      // Appeler le modèle et afficher le résultat
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('Aucun modèle de langage disponible')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Analyse multi-fichiers (${files.length} fichiers) ---\n`)

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

Utilisation : dans l'explorateur, maintenez `Ctrl` (`Cmd` sur Mac) pour sélectionner plusieurs fichiers, faites un clic droit et choisissez « IA : Analyser les relations des fichiers sélectionnés ». L'IA lit tous les fichiers sélectionnés et retourne l'analyse.

<!-- ![placeholder: Screenshot of explorer with multi-selected files and AI analysis context menu item](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png) -->
![Capture d'écran de l'explorateur avec plusieurs fichiers sélectionnés et un élément d'analyse IA dans le menu contextuel](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# Chapitre 6 : Raccourcis et optimisation UX (3 minutes)

## 6.1 Raccourcis clavier personnalisés

Les raccourcis sont essentiels pour l'efficacité. Ajoutez dans `package.json` :

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

**Conditions `when` :**

| Condition | Signification |
|------|------|
| `editorTextFocus` | Le curseur est dans l'éditeur |
| `editorHasSelection` | Du texte est sélectionné |
| `explorerViewletVisible` | Le panneau de l'explorateur est visible |
| `!editorReadonly` | Le fichier n'est pas en lecture seule |

Plusieurs conditions connectées par `&&` signifient que toutes doivent être satisfaites.

## 6.2 Indicateur dans la barre d'état

Ajoutez une entrée rapide dans la barre d'état pour que les utilisateurs sachent toujours que l'extension est active :

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = 'Cliquer pour ouvrir AI Project Bot'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` est la syntaxe d'icône intégrée de VS Code. Vous pouvez trouver toutes les icônes dans la [bibliothèque Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

<!-- ![placeholder: Screenshot of AI Bot icon displayed in VS Code status bar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![Capture d'écran de l'icône AI Bot affichée dans la barre d'état de VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# Chapitre 7 : Publier sur le Marketplace (facultatif)

## 7.1 Se préparer à la publication

Les extensions VS Code sont empaquetées et publiées avec **vsce** :

```text
Aidez-moi à installer vsce : npm install -g @vscode/vsce
```

Avant la publication, préparez :

1. **Compte Azure DevOps** : inscrivez-vous et créez une organisation sur [dev.azure.com](https://dev.azure.com/)
2. **Personal Access Token (PAT)** : créez-le dans Azure DevOps avec la permission **Marketplace -> Manage**
3. **ID d'éditeur** : créez votre identité d'éditeur sur le [VS Code Marketplace](https://marketplace.visualstudio.com/manage)

## 7.2 Améliorer les métadonnées de package.json

Ajoutez des métadonnées avant la publication :

```json
{
  "publisher": "votre-id-editeur",
  "repository": {
    "type": "git",
    "url": "https://github.com/votrenom/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "projet", "modele", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

Vous aurez également besoin d'un `README.md` pour la description sur le marketplace et d'un `CHANGELOG.md` pour l'historique des versions.

## 7.3 Empaqueter et publier

```bash
# Empaqueter en .vsix (fichier d'installation manuelle)
vsce package

# Publier sur le marketplace
vsce publish
```

Après l'empaquetage, vous obtenez `ai-project-bot-0.0.1.vsix`. Vous pouvez envoyer ce fichier à vos amis et ils peuvent l'installer via VS Code « Install from VSIX ».

Pour la publication officielle sur le marketplace, exécutez `vsce publish` ; l'extension apparaît généralement en quelques minutes.

<!-- ![placeholder: Screenshot of AI Project Bot extension page in VS Code Marketplace](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **Astuce** : la première publication peut nécessiter une révision. Assurez-vous que le README est clair et que les captures d'écran sont complètes pour accélérer l'approbation.

# Chapitre 8 : Notes finales

Félicitations ! Vous avez construit une extension VS Code entièrement fonctionnelle from scratch. Récapitulatif :

1. Créé un projet d'extension avec le scaffolder Yeoman et compris les rôles de `package.json` et `extension.ts`
2. Implémenté une liste de modèles de projets dans la barre latérale avec l'API TreeView et la création de projets en un clic
3. Créé un assistant IA `@project-bot` avec l'API Chat Participant, incluant des commandes slash et des réponses en streaming
4. Implémenté l'analyse du code sélectionné via clic droit
5. Implémenté l'analyse des relations multi-fichiers
6. Ajouté des raccourcis clavier personnalisés et un indicateur dans la barre d'état

L'espace d'imagination du développement d'extensions VS Code est immense. La technologie derrière les extensions utiles que vous utilisez tous les jours est exactement celle que vous venez d'apprendre.

**Directions avancées :**

* **Panneaux Webview personnalisés** : construire des interfaces entièrement personnalisées avec HTML/CSS/JS, comme des graphes d'architecture visuels et des interfaces de revue de code interactives
* **Outils Language Model** : enregistrer des outils personnalisés appelables par l'IA, comme interroger une base de données ou exécuter des requêtes API
* **Diagnostics et CodeLens** : afficher en ligne des suggestions IA, des indications de performance et des avertissements de sécurité
* **Support de langage personnalisé** : fournir la coloration syntaxique, la complétion et les diagnostics pour des DSL ou des formats de configuration spécifiques
* **Intégration du développement à distance** : faire fonctionner l'extension en SSH, conteneurs et WSL

***Votre éditeur, vos règles.***

# Références

* [Documentation de l'API Extension VS Code](https://code.visualstudio.com/api)
* [Guide de l'API Chat Participant](https://code.visualstudio.com/api/extension-guides/chat)
* [Guide de l'API Language Model](https://code.visualstudio.com/api/extension-guides/language-model)
* [Guide de l'API TreeView](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Guide de l'API Webview](https://code.visualstudio.com/api/extension-guides/webview)
* [Guide de publication d'extensions VS Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Bibliothèque d'icônes Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
