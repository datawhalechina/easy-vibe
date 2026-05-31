# Cómo construir una extensión de VS Code: Crea tu asistente de proyecto con IA

# Capítulo 1: Qué es el desarrollo de extensiones de VS Code

En este tutorial, completaremos un ciclo completo: construir desde cero una extensión de VS Code que actúe como tu asistente de proyecto con IA, con generación de plantillas de proyecto con un clic, chat de IA sobre archivos seleccionados o fragmentos de código, análisis de preguntas y respuestas en múltiples archivos, y atajos personalizados. Completarás el desarrollo, la depuración y aprenderás cómo publicar en el VS Code Marketplace.

Para este tutorial, deberías tener al menos:

- Entorno Node.js (versión 18.0+)
- Editor VS Code (versión 1.90+)
- Tu asistente de codificación con IA (Cursor / Trae / Claude Code)
- (Opcional) Suscripción a GitHub Copilot (para la API de modelos de lenguaje)

> **Vibe Coding de extremo a extremo**: usaremos un asistente de codificación con IA para generar la mayor parte del código. Solo necesitas comprender los conceptos básicos y la arquitectura, y luego describir los requisitos en lenguaje natural.

## 1.1 ¿Qué pueden hacer las extensiones de VS Code?

Ya usas extensiones de VS Code a diario. Prettier formatea tu código, GitLens muestra el historial de Git y GitHub Copilot te ayuda a escribir código. Estas extensiones son esencialmente programas escritos en TypeScript/JavaScript que extienden el editor a través de las APIs de VS Code.

Las extensiones de VS Code pueden hacer mucho más de lo que muchos esperan:

* **Agregar nuevos elementos de UI**: paneles en la barra lateral, información en la barra de estado, páginas Webview personalizadas
* **Manejar archivos y código**: leer, modificar y crear archivos; analizar la estructura del código
* **Integrar servicios externos**: llamar a APIs, conectar bases de datos, integrar CI/CD
* **Extender las capacidades del editor**: soporte de lenguaje personalizado, autocompletado de código, diagnósticos
* **Agregar capacidades de IA**: crear asistentes de IA con la Chat Participant API, llamar a modelos con la Language Model API

<!-- ![placeholder: VS Code extension ecosystem diagram showing expandable areas: sidebar, editor, status bar, command palette, Chat panel](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![Diagrama del ecosistema de extensiones de VS Code mostrando las áreas que las extensiones pueden ampliar: barra lateral, editor, barra de estado, paleta de comandos y panel de Chat](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 Arquitectura central de una extensión de VS Code

Una extensión de VS Code se ejecuta en un proceso aislado llamado **Extension Host**, separado del proceso principal del editor. Esto significa que incluso si una extensión falla, el editor no se ve afectado.

Una extensión típica tiene estas partes fundamentales:

* **package.json (manifiesto)**: la "tarjeta de identidad" de la extensión, declarando nombre, archivo de entrada, puntos de contribución (`commands`, `menus`, `keybindings`, etc.)
* **extension.ts (archivo de entrada)**: el "cerebro" de la extensión, exportando `activate()` y `deactivate()`
* **Puntos de contribución**: lo que tu extensión contribuye a VS Code en el package.json (comandos, elementos de menú, atajos, vistas, etc.)
* **VS Code API**: el conjunto de APIs TypeScript utilizado para operar las capacidades del editor

```text
Editor VS Code
    │
    ├── Extension Host (proceso de extensión)
    │   ├── Tu extensión
    │   │   ├── package.json  -> declara "qué puedo hacer"
    │   │   ├── extension.ts  -> implementa "cómo hacerlo"
    │   │   └── otros módulos -> código de funcionalidades concretas
    │   ├── Otra extensión A
    │   └── Otra extensión B
    │
    └── Proceso principal del editor (renderizado de UI)
```

<!-- ![placeholder: VS Code extension architecture diagram showing Extension Host vs editor main process](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![Diagrama de arquitectura de extensión de VS Code mostrando el proceso Extension Host y el proceso principal del editor](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 ¿Qué extensión vamos a construir?

Construiremos una extensión de VS Code llamada **"AI Project Bot"**, un asistente de proyecto con IA con las siguientes funcionalidades:

| Funcionalidad | Descripción |
|------|------|
| Plantillas de proyecto | Lista de plantillas en la barra lateral, generación de scaffolding de proyecto con un clic |
| Chat con IA | Participante `@project-bot` en el Chat de VS Code para preguntas sobre el proyecto |
| Chat de archivo/fragmento | Clic derecho en código seleccionado o archivo y enviar a IA para análisis/explicación/refactorización |
| Preguntas y respuestas en múltiples archivos | Selección múltiple de archivos en el explorador y pedir a la IA que analice relaciones y lógica |
| Atajos | Atajos de teclado personalizados para activar acciones comunes rápidamente |

<!-- ![placeholder: AI Project Bot preview showing sidebar templates, @project-bot chat panel, and right-click menu](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![Vista previa de la extensión AI Project Bot mostrando la lista de plantillas en la barra lateral, el panel de chat @project-bot y el menú contextual](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 Hoja de ruta del tutorial

Completaremos el flujo en estos pasos:

1. **Crear el proyecto de extensión** (3 minutos): scaffolding del proyecto y comprensión de los archivos principales
2. **Implementar plantillas de proyecto** (5 minutos): usar TreeView para mostrar plantillas en la barra lateral y generar proyectos
3. **Implementar participante de Chat con IA** (5 minutos): crear `@project-bot` mediante la Chat Participant API
4. **Implementar chat de archivo/fragmento y preguntas en múltiples archivos** (5 minutos): menús contextuales + análisis de selección múltiple
5. **Agregar atajos y pulir la experiencia de usuario** (3 minutos): atajos de teclado e indicadores en la barra de estado
6. **Publicar en el marketplace** (opcional): empaquetar y enviar

# Capítulo 2: Crear el proyecto de extensión (3 minutos)

## 2.1 Generar el proyecto con scaffolding

VS Code proporciona oficialmente una herramienta de scaffolding Yeoman. Pide a la IA que ejecute:

```text
Por favor, ayúdame a instalar las herramientas de scaffolding de extensiones de VS Code y crear un proyecto:
1. Instalar Yeoman y generator-code: npm install -g yo generator-code
2. Ejecutar yo code y elegir:
   - Tipo: New Extension (TypeScript)
   - Nombre: ai-project-bot
   - Identificador: ai-project-bot
   - Descripción: Asistente de proyecto con IA - generación de plantillas, chat inteligente, preguntas en múltiples archivos
   - Gestor de paquetes: npm
3. Entrar al directorio del proyecto e instalar dependencias
```

Estructura generada:

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # Configuración de depuración (F5 inicia la depuración)
│   └── tasks.json           # Tareas de construcción
├── src/
│   └── extension.ts         # Archivo de entrada de la extensión
├── package.json             # Manifiesto de la extensión (archivo más importante)
├── tsconfig.json            # Configuración de TypeScript
└── vsc-extension-quickstart.md  # Guía de inicio rápido (se puede eliminar)
```

## 2.2 Entender package.json: la "tarjeta de identidad" de la extensión

`package.json` es el archivo central de una extensión de VS Code. Además de los campos npm normales, tiene `contributes` para declarar todo lo que tu extensión contribuye a VS Code:

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "AI project assistant - template generation, intelligent chat, multi-file Q&A",
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

**Campos clave:**

| Campo | Función |
|------|------|
| `engines.vscode` | Versión mínima de VS Code soportada |
| `activationEvents` | Cuándo se activa la extensión (vacío significa activación bajo demanda) |
| `main` | Ruta al archivo de entrada compilado |
| `contributes` | Todas las funcionalidades contribuidas (comandos, menús, atajos, vistas, etc.) |

<!-- ![placeholder: package.json screenshot with contributes field highlighted](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![Captura de pantalla del archivo package.json en el editor con el campo contributes resaltado](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 Entender extension.ts: el "cerebro" de la extensión

Abre `src/extension.ts` y verás dos funciones principales:

```typescript
import * as vscode from 'vscode'

// Se llama cuando la extensión se activa (primera ejecución de comando, apertura de archivos específicos, etc.)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot activated!')

  // Registrar comandos, vistas, participantes de chat, etc.
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello from AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// Se llama cuando la extensión se desactiva (por ejemplo, cuando se cierra VS Code)
export function deactivate() {}
```

**Conceptos básicos:**

* `activate(context)`: inicialización de la extensión, registra todas las capacidades aquí
* `context.subscriptions`: una lista de limpieza automática; VS Code elimina los elementos registrados al desactivarse
* `vscode.commands.registerCommand`: registra un comando invocable desde la paleta de comandos (`Ctrl+Shift+P`)

## 2.4 Iniciar la depuración

Presiona **F5** y VS Code abre una nueva ventana de **Extension Development Host**. Esta es una instancia nueva de VS Code con tu extensión cargada.

En la nueva ventana, presiona **Ctrl+Shift+P**, escribe "Hello World" y verás un mensaje emergente. Esto significa que tu extensión está funcionando.

<!-- ![placeholder: VS Code extension debugging screenshot showing Extension Development Host and Hello World message](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![Captura de pantalla de la depuración de una extensión de VS Code, mostrando la ventana Extension Development Host y el mensaje Hello World](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **Consejo de depuración**: después de cambios en el código, en el Extension Development Host presiona **Ctrl+Shift+P** -> **Developer: Reload Window** para recargar la extensión rápidamente.

# Capítulo 3: Implementar plantillas de proyecto (5 minutos)

## 3.1 Diseñar el sistema de plantillas

Queremos agregar un panel de "Plantillas de proyecto" en la barra lateral de VS Code donde los usuarios puedan explorar plantillas y generar esqueletos de proyecto con un clic. Esto usa la **TreeView API** de VS Code.

Pide a la IA que implemente:

```text
Por favor, ayúdame a implementar plantillas de proyecto en ai-project-bot:

1. Agregar puntos de contribución en package.json:
   - Agregar un nuevo elemento viewsContainers.activitybar con id "project-bot", título "AI Project Bot"
   - Agregar una vista debajo con id "projectTemplates", nombre "Project Templates"
   - Agregar comando "ai-project-bot.createFromTemplate", título "Create Project from Template"

2. Crear src/templates/templateProvider.ts:
   - Implementar TreeDataProvider con categorías de plantillas y plantillas:
     - Frontend: React + TypeScript, Vue 3 + TypeScript, Next.js App
     - Backend: Express API, FastAPI Python
     - Full-stack: T3 Stack (Next.js + tRPC + Prisma)
   - Cada elemento de plantilla muestra nombre, descripción e icono

3. Crear src/templates/scaffolder.ts:
   - Implementar función createProjectFromTemplate
   - Permitir al usuario elegir la carpeta de destino
   - Generar estructura de proyecto según el tipo de plantilla
```

## 3.2 Declarar la vista en package.json

Primero agrega las contribuciones de la vista en la barra lateral en `package.json`:

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

Esta configuración hace tres cosas:

1. Agrega una entrada de icono "AI Project Bot" en la barra de actividad
2. Crea una vista "Project Templates" debajo de esa entrada
3. Agrega un botón "+" en la barra de título de la vista para la creación de proyectos

<!-- ![placeholder: Screenshot showing AI Project Bot icon and project template list in VS Code sidebar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![Captura de pantalla mostrando el icono de AI Project Bot y la lista de plantillas de proyecto en la barra lateral de VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 Implementar TreeDataProvider

TreeDataProvider es la interfaz que VS Code usa para llenar datos de árbol. Necesitamos `getTreeItem` (información de visualización de un nodo) y `getChildren` (lista de nodos hijos).

Código central:

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // comando para generar proyecto, por ejemplo "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'React project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'Vue 3 project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Next.js App Router full-stack project', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'Express + TypeScript REST API', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Python FastAPI backend project', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// Nodo de árbol: categoría o plantilla
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nCommand: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Create Project',
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
      // Raíz: devolver lista de categorías
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // Hijos: plantillas en la categoría
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 Registrar la vista y el comando de creación

Registra TreeView y el comando de creación de proyecto en `extension.ts`:

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // Registrar vista de plantillas
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // Registrar comando de creación de proyecto
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // Si no se pasa plantilla (invocado desde paleta de comandos), dejar que el usuario elija
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'Choose a project template' }
        )
        if (!pick) return
        template = pick.template
      }

      // Pedir nombre del proyecto
      const name = await vscode.window.showInputBox({
        prompt: 'Enter project name',
        placeHolder: 'my-awesome-project'
      })
      if (!name) return

      // Pedir carpeta de destino
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'Select target folder'
      })
      if (!folder) return

      // Ejecutar comando de creación
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`Creating ${template.name} project: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

Ahora presiona F5 para depurar. Verás AI Project Bot en la barra de actividad. Expande la lista de plantillas y haz clic en cualquier plantilla para crear un proyecto.

<!-- ![placeholder: Screenshot showing project name input and folder picker dialog after clicking a template](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![Captura de pantalla mostrando el cuadro de entrada del nombre del proyecto y el diálogo de selección de carpeta después de hacer clic en una plantilla](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# Capítulo 4: Implementar el participante de Chat con IA (5 minutos)

## 4.1 ¿Qué es la Chat Participant API?

A partir de VS Code 1.90, las extensiones pueden crear su propio asistente de IA en el panel de Chat usando la **Chat Participant API**. Si el usuario introduce `@project-bot help me analyze this project architecture`, tu extensión recibe el mensaje y devuelve la respuesta generada por el modelo.

Conceptos básicos:

* **Participant**: la identidad de tu asistente en el panel de Chat, invocado con `@name`
* **Slash Commands**: comandos rápidos soportados por el participante, como `/explain`, `/refactor`
* **Language Model API**: llama a modelos integrados en VS Code (por ejemplo Copilot GPT-4o)
* **Stream**: emite respuestas progresivamente a través de `stream.markdown()`

## 4.2 Declarar el Chat Participant en package.json

Agrega esto en `contributes`:

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "Your AI project assistant for code analysis, architecture explanation, and solution generation",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` significa que una vez seleccionado, los mensajes siguientes van a este participante por defecto, sin necesidad de escribir `@project-bot` cada vez.

## 4.3 Implementar el manejador del Chat Participant

Pide a la IA que escriba la lógica central:

```text
Por favor, ayúdame a crear src/chat/chatParticipant.ts e implementar Chat Participant:
1. Registrar participante "ai-project-bot.projectBot"
2. Soportar tres slash commands:
   - /explain: explicar código seleccionado o archivo actual
   - /refactor: proporcionar sugerencias de refactorización
   - /template: recomendar plantillas de stack tecnológico adecuadas
3. Usar Language Model API con el modelo integrado de VS Code
4. Devolver respuesta en modo streaming (stream.markdown)
```

Código central:

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // Seleccionar modelo disponible
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('No language model available. Please make sure GitHub Copilot is installed.')
        return
      }

      // Construir prompt del sistema según el slash command
      let systemPrompt = 'You are a professional project development assistant.'

      if (request.command === 'explain') {
        systemPrompt = 'You are a code explanation expert. Please explain user code in concise Chinese, including purpose, logic flow, and key design decisions.'
      } else if (request.command === 'refactor') {
        systemPrompt = 'You are a code refactoring expert. Analyze user code and provide specific refactoring suggestions with improved code examples.'
      } else if (request.command === 'template') {
        systemPrompt = 'You are a tech stack selection expert. Recommend suitable tech stacks and project templates based on user requirements.'
      }

      // Construir mensajes
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // Salida en streaming
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // Registrar slash commands
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: 'Explain code function and logic' },
      { name: 'refactor', description: 'Provide refactoring suggestions and improvements' },
      { name: 'template', description: 'Recommend suitable project templates and tech stacks' }
    ]
  }

  // Registrar sugerencias de seguimiento
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: 'Can you draw a flowchart?', label: 'Generate flowchart' },
          { prompt: 'Any potential bugs here?', label: 'Check potential issues' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

Llama al registro en `extension.ts`:

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... código de registro de plantillas anterior ...
  registerChatParticipant(context)
}
```

Ahora introduce `@project-bot /explain what does this code do?` en el panel de Chat y tu extensión llamará al modelo y generará una explicación.

<!-- ![placeholder: VS Code Chat screenshot showing @project-bot, /explain command, and streaming response](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![Captura de pantalla del panel de Chat de VS Code mostrando @project-bot, el comando /explain y una respuesta en streaming](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# Capítulo 5: Chat de archivo/fragmento y preguntas en múltiples archivos (5 minutos)

## 5.1 Menú contextual: enviar código seleccionado a la IA

Queremos que los usuarios seleccionen código en el editor y lo envíen a la IA desde el menú contextual. Esto usa los puntos de contribución **Context Menu** de VS Code.

Agrega en `package.json`:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "AI: Explain Selected Code"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "AI: Refactor Selected Code"
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

**Notas de configuración clave:**

* `when: "editorHasSelection"`: mostrar menú solo cuando hay texto seleccionado
* `group: "ai-project-bot@1"`: agrupación y orden del menú (`@1`, `@2`)

## 5.2 Implementar análisis de código seleccionado

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // Explicar código seleccionado
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

      // Construir prompt con contexto
      const prompt = [
        `Please explain the following code (from ${fileName}, lines ${startLine}-${endLine}):`,
        '```',
        selectedText,
        '```',
        'Please explain: 1) what this code does 2) core logic 3) possible improvements'
      ].join('\n')

      // Llamar a Language Model API
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('No language model available')
        return
      }

      // Mostrar resultados en panel de salida
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Code Explanation (${fileName}:${startLine}-${endLine}) ---\n`)

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
![Captura de pantalla del menú contextual del editor mostrando elementos de IA después de seleccionar código](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 Preguntas en múltiples archivos: análisis por lotes de relaciones entre archivos

Esta es una de las funcionalidades más potentes: selección múltiple de archivos en el explorador y dejar que la IA analice relaciones y lógica con un clic.

Agrega el menú contextual del explorador en `package.json`:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "AI: Analyze Relationships of Selected Files"
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

Implementa el comando de análisis de múltiples archivos:

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles contiene todos los archivos seleccionados
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('Please select at least 2 files for analysis')
        return
      }

      // Leer todos los archivos seleccionados
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `Please analyze relationships among these ${files.length} files:`,
        '',
        ...fileContents,
        '',
        'Please explain:',
        '1. Responsibilities of each file',
        '2. Dependency/call relationships among them',
        '3. Data flow (if any)',
        '4. Architectural suggestions or potential issues'
      ].join('\n')

      // Llamar al modelo y mostrar resultado
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('No language model available')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- Multi-file Analysis (${files.length} files) ---\n`)

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

Uso: en el explorador, mantén `Ctrl` (`Cmd` en Mac) para seleccionar múltiples archivos, haz clic derecho y elige "AI: Analyze Relationships of Selected Files." La IA lee todos los archivos seleccionados y devuelve el análisis.

<!-- ![placeholder: Screenshot of explorer with multi-selected files and AI analysis context menu item](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png) -->
![Captura de pantalla del explorador con múltiples archivos seleccionados y un elemento de análisis de IA en el menú contextual](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# Capítulo 6: Atajos y optimización de la experiencia de usuario (3 minutos)

## 6.1 Atajos de teclado personalizados

Los atajos de teclado son clave para la eficiencia. Agrega en `package.json`:

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

**Condiciones `when`:**

| Condición | Significado |
|------|------|
| `editorTextFocus` | El cursor está en el editor |
| `editorHasSelection` | Hay texto seleccionado |
| `explorerViewletVisible` | El panel del explorador está visible |
| `!editorReadonly` | El archivo no es de solo lectura |

Múltiples condiciones conectadas por `&&` significan que todas deben cumplirse.

## 6.2 Indicador en la barra de estado

Agrega una entrada rápida en la barra de estado para que los usuarios siempre sepan que la extensión está funcionando:

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = 'Click to open AI Project Bot'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` es la sintaxis de iconos integrados de VS Code. Puedes encontrar todos los iconos en la [biblioteca Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html).

<!-- ![placeholder: Screenshot of AI Bot icon displayed in VS Code status bar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![Captura de pantalla del icono de AI Bot mostrado en la barra de estado de VS Code](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# Capítulo 7: Publicar en el Marketplace (opcional)

## 7.1 Prepararse para la publicación

Las extensiones de VS Code se empaquetan y publican con **vsce**:

```text
Por favor, ayúdame a instalar vsce: npm install -g @vscode/vsce
```

Antes de publicar, prepara:

1. **Cuenta de Azure DevOps**: regístrate y crea una organización en [dev.azure.com](https://dev.azure.com/)
2. **Personal Access Token (PAT)**: crea uno en Azure DevOps con permiso **Marketplace -> Manage**
3. **Publisher ID**: crea una identidad de publicador en [VS Code Marketplace](https://marketplace.visualstudio.com/manage)

## 7.2 Mejorar los metadatos de package.json

Agrega metadatos antes de publicar:

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/ai-project-bot"
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

También necesitas un `README.md` para la descripción del marketplace y un `CHANGELOG.md` para el historial de versiones.

## 7.3 Empaquetar y publicar

```bash
# Empaquetar a .vsix (archivo de instalación manual)
vsce package

# Publicar en el marketplace
vsce publish
```

Después de empaquetar, obtienes `ai-project-bot-0.0.1.vsix`. Puedes enviar este archivo a amigos y pueden instalarlo a través de "Install from VSIX" de VS Code.

Para la publicación oficial en el marketplace, ejecuta `vsce publish`; la extensión suele aparecer en cuestión de minutos.

<!-- ![placeholder: Screenshot of AI Project Bot extension page in VS Code Marketplace](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **Consejo**: la primera publicación puede requerir revisión. Asegúrate de que el README sea claro y las capturas de pantalla estén completas para acelerar la aprobación.

# Capítulo 8: Notas finales

¡Felicidades! Has construido una extensión de VS Code completamente funcional desde cero. Resumen:

1. Creaste el proyecto de extensión con scaffolding Yeoman y comprendiste los roles de `package.json` y `extension.ts`
2. Implementaste la lista de plantillas de proyecto en la barra lateral con TreeView API y la creación de proyectos con un clic
3. Creaste el asistente de IA `@project-bot` con Chat Participant API, incluyendo slash commands y respuestas en streaming
4. Implementaste el análisis de código seleccionado desde el menú contextual
5. Implementaste el análisis de relaciones entre múltiples archivos
6. Agregaste atajos personalizados e indicador en la barra de estado

El espacio para la imaginación en el desarrollo de extensiones de VS Code es enorme. La tecnología detrás de las extensiones útiles que usas a diario es exactamente lo que acabas de aprender.

**Direcciones avanzadas:**

* **Paneles Webview personalizados**: construye UI completamente personalizada con HTML/CSS/JS, como gráficos de arquitectura visual e interfaces interactivas de revisión de código
* **Language Model Tools**: registra herramientas personalizadas invocables por IA, como consultar bases de datos o ejecutar peticiones API
* **Diagnósticos y CodeLens**: muestra sugerencias de IA, consejos de rendimiento y advertencias de seguridad en línea
* **Soporte de lenguaje personalizado**: proporciona resaltado de sintaxis, autocompletado y diagnósticos para DSLs o formatos de configuración específicos
* **Integración con desarrollo remoto**: haz que la extensión funcione en SSH, contenedores y WSL

***Tu editor, tus reglas.***

# Referencias

* [Documentación de VS Code Extension API](https://code.visualstudio.com/api)
* [Guía de Chat Participant API](https://code.visualstudio.com/api/extension-guides/chat)
* [Guía de Language Model API](https://code.visualstudio.com/api/extension-guides/language-model)
* [Guía de TreeView API](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Guía de Webview API](https://code.visualstudio.com/api/extension-guides/webview)
* [Guía de publicación de extensiones de VS Code](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Biblioteca de iconos Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
