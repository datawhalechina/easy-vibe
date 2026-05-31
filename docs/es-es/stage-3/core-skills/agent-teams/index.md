# Guia completa de los equipos de agentes de Claude

## Introducci0n a los equipos de agentes

**Los equipos de agentes** son una caracter0stica revolucionaria en Claude Code que permite que **m03ltiples instancias de IA independientes colaboren como un equipo de desarrollo real**.

Imagina que en el pasado, usar Claude Code era como ser un gerente de proyecto que trabajaba con un asistente excepcionalmente capaz. No importa cu00e1n compleja fuera la tarea, solo ese asistente hac0a el trabajo. Ahora, con los equipos de agentes, puedes ensamblar un equipo de desarrollo de IA completo: un miembro puede manejar el frontend, otro el backend, otro las pruebas, y pueden **trabajar al mismo tiempo, comunicarse entre s0 y colaborar para completar tareas complejas**.

### De un solo asistente a la colaboraci03n en equipo

Antes de profundizar en los equipos de agentes, primero entendamos el problema que resuelve.

**Limitaciones del modo de IA 03nica**:

Cuando usas una 03nica instancia de Claude para manejar un proyecto complejo, te encontrar00e1s con estos cuellos de botella:

- **Cuello de botella de procesamiento serie**: la IA solo puede hacer una cosa a la vez. Por ejemplo, al refactorizar un proyecto, puede que necesite analizar primero el m03dulo de autenticaci03n, luego el m03dulo de base de datos y finalmente el m03dulo de API. Estos pasos deben realizarse secuencialmente, incluso si no dependen entre s0.

- **Problema de saturaci03n del contexto**: toda la informaci03n vive en una 03nica ventana de conversaci03n. A medida que la conversaci03n se alarga, los detalles importantes pueden quedar enterrados, y la IA puede olvidar las decisiones clave discutidas anteriormente.

- **Limitaci03n de perspectiva 03nica**: solo una IA est00e1 pensando, por lo que no hay discusi03n ni validaci03n desde m03ltiples 00e1ngulos. Cuando aparecen decisiones de dise00f1o complejas, no hay un "compa00f1ero de equipo" con quien debatir o proporcionar una perspectiva diferente.

- **Techo de eficiencia**: las refactorizaciones grandes o el desarrollo de m03ltiples m03dulos toman mucho tiempo, y no hay forma de acelerarlos mediante el paralelismo.

**La soluci03n de los equipos de agentes**:

Los equipos de agentes resuelven estos problemas mediante la **colaboraci03n paralela entre m03ltiples instancias**:

- **Trabajo verdaderamente paralelo**: m03ltiples IAs pueden trabajar en diferentes tareas simult00e1neamente. Una puede manejar la interfaz de usuario, otra la API del backend y otra el dise00f1o de la base de datos, sin interferir entre s0.

- **Espacios de contexto independientes**: cada miembro del equipo tiene su propia ventana de contexto completa de 200K tokens, por lo que la informaci03n importante no se "olvida" porque la conversaci03n se vuelve demasiado larga.

- **Capacidad de colaboraci03n en equipo**: los miembros pueden comunicarse directamente, discutir decisiones de dise00f1o y validar la calidad del c03digo entre s0, como un equipo de desarrollo real.

- **Un aumento significativo de eficiencia**: seg03n las pruebas internas de Anthropic, la eficiencia en refactorizaciones de proyectos a gran escala puede mejorar aproximadamente un 50%.

---

## Equipos de agentes vs Subagente

Antes de profundizar en la arquitectura de los equipos de agentes, debemos aclarar un punto de confusi03n com03n: **00bfcu00e1l es la diferencia entre equipos de agentes y Subagente**?

Ambas caracter0sticas involucran "m03ltiples IAs colaborando", pero sus modelos de colaboraci03n son completamente diferentes y adecuados para diferentes escenarios.

### Diferencias centrales de un vistazo

| Dimensi03n | Subagente | Equipos de agentes |
|---------|-------------------|----------------------|
| **Topolog0a** | Topolog0a en estrella: todos los subagentes reportan al agente principal | Topolog0a en malla: los miembros pueden comunicarse entre s0 |
| **Estilo de comunicaci03n** | El agente principal pasa informaci03n expl0citamente mediante prompts, y los subagentes devuelven resultados al terminar | Los miembros pueden comunicarse, discutir y coordinar directamente |
| **Gesti03n del contexto** | Cada subagente tiene un contexto independiente, y el agente principal solo pasa la informaci03n necesaria | Cada miembro tiene un contexto completamente independiente |
| **Paralelismo** | Puede ejecutarse en paralelo, pero la cadena de colaboraci03n sigue centrada en el agente principal | Desarrollo y colaboraci03n verdaderamente paralelos |
| **Coordinaci03n de tareas** | El agente principal despacha y coordina todo de forma centralizada | Los miembros pueden asumir la propiedad de las tareas de manera m00e1s aut03noma |
| **Costo** | No bajo. El uso de tokens se acumula cuando m03ltiples subagentes se ejecutan en paralelo | M00e1s alto. Los miembros se ejecutan de forma independiente y se comunican m00e1s frecuentemente |

### Una analog0a intuitiva

**El Subagente es como**: un gerente que escribe notas de tarea separadas para varios asistentes. Cada asistente trabaja de forma independiente bas00e1ndose en su propia nota de tarea, y al terminar, solo devuelve el resultado al gerente. Los asistentes no se comunican directamente, y el gerente no ve el proceso de pensamiento completo de los asistentes mientras trabajan.

```
T03 → Agente principal → Subagente A: "Analiza este archivo"
T03 → Agente principal → Subagente B: "Busca esa funci03n"
         ↓
    Subagente A completa → reporta resultado al Agente principal
    Subagente B completa → reporta resultado al Agente principal
         ↓
    El Agente principal sintetiza los resultados → te reporta
```

**Los equipos de agentes son como**: un gerente de proyecto liderando un equipo de desarrollo real. Los miembros del equipo pueden comunicarse, discutir y colaborar directamente, en lugar de enrutar cada detalle a trav00e9s del gerente de proyecto.

```
T03 → L0der del equipo: "Construye una funci03n de autenticaci03n de usuarios"
         ↓
    El L0der del equipo crea el equipo y asigna tareas
         ↓
    Compa00f1ero A: "@Compa00f1ero B, 00bfest00e1 listo el dise00f1o de la interfaz API?"
    Compa00f1ero B: "S0, aqu0 est00e1 el formato..."
    Compa00f1ero C: "Revis00e9 la interfaz y encontr00e9 algo que deber0amos discutir..."
         ↓
    Los miembros del equipo colaboran para terminar el trabajo → El L0der del equipo sintetiza el resultado → te reporta
```

### Cu00e1ndo usar cada uno

**Usa Subagente cuando**:

- Tienes una tarea r00e1pida, clara y 03nica, como "busca este c03digo de error"
- Las tareas no dependen mucho entre s0
- Quieres ejecuci03n paralela, pero no necesitas discusi03n sostenida entre los miembros

**Usa equipos de agentes cuando**:

- Est00e1s haciendo una refactorizaci03n compleja de sistema que abarca m03ltiples m03dulos
- Necesitas an00e1lisis y discusi03n desde m03ltiples perspectivas, como un experto en seguridad y un experto en rendimiento debatiendo una soluci03n
- Necesitas desarrollo verdaderamente paralelo, con frontend, backend y pruebas ocurriendo al mismo tiempo
- Las tareas requieren coordinaci03n frecuente y compartir informaci03n

### Un resumen simple

- **Subagente**: una herramienta de distribuci03n de tareas que divide una tarea grande en tareas m00e1s peque00f1as y las despacha a diferentes "trabajadores"
- **Equipos de agentes**: un equipo colaborativo real donde los miembros pueden comunicarse, discutir y trabajar juntos como un verdadero equipo

---

## Arquitectura central

Los equipos de agentes no son simplemente una caracter0stica de "abrir m03ltiples instancias". Es un **sistema completo de colaboraci03n multi-agente**. Para entenderlo, debemos comprender sus componentes centrales y c03mo trabajan juntos.

### Composici03n del equipo

Un equipo de agentes consta de cuatro componentes centrales, cada uno con su propia responsabilidad, trabajando juntos para completar tareas complejas.

**L0der del equipo**

El L0der del equipo es el "cerebro" y "coordinador" de todo el equipo. No ejecuta directamente tareas de codificaci03n. En su lugar, es responsable de:

- **An00e1lisis de requisitos y descomposici03n de tareas**: dividir los requisitos complejos del usuario en m03ltiples subtareas que pueden ejecutarse en paralelo
- **Creaci03n y gesti03n del equipo**: decidir cu00e1ntos miembros se necesitan y qu00e9 debe hacer cada miembro
- **Asignaci03n y programaci03n de tareas**: asignar tareas a los miembros adecuados y gestionar las dependencias de tareas
- **S0ntesis de resultados y control de calidad**: recopilar el trabajo de cada miembro, integrarlo y hacer la revisi03n final

**Compa00f1eros**

Los compa00f1eros son los verdaderos "desarrolladores" que hacen el trabajo. Cada compa00f1ero es una instancia independiente de Claude:

- **Ventana de contexto independiente**: cada miembro tiene una ventana de contexto completa de 200K tokens, completamente aislada del L0der del equipo y de los otros miembros
- **Permisos completos de herramientas**: pueden usar todas las herramientas como Read, Write, Edit y Bash
- **Recogida aut03noma de tareas**: pueden seleccionar y reclamar independientemente tareas del tablero compartido
- **Capacidad de comunicaci03n directa**: pueden comunicarse directamente con otros miembros en lugar de pasar siempre por el L0der del equipo

**Lista de tareas (TaskList)**

La TaskList es la "herramienta de gesti03n de proyectos" del equipo, similar a Jira o Trello:

- **Gesti03n del estado de las tareas**: cada tarea tiene un estado claro: `pending`, `in_progress` o `completed`
- **Gesti03n de dependencias**: las tareas pueden definir dependencias, y las tareas dependientes solo pueden comenzar despu00e9s de que las tareas previas terminen
- **Mecanismo de desbloqueo autom00e1tico**: cuando se completa una tarea, el sistema verifica autom00e1ticamente y desbloquea las tareas que la estaban esperando
- **Mecanismo de bloqueo de archivos**: cuando un miembro reclama y comienza una tarea, se crea un archivo de bloqueo en el directorio de la tarea para evitar que m03ltiples miembros editen el mismo archivo al mismo tiempo

**Sistema de mensajer0a**

El sistema de mensajer0a es la "herramienta de chat" entre los miembros del equipo:

- **Comunicaci03n punto a punto**: el miembro A puede enviar un mensaje directamente al miembro B
- **Anuncios de difusi03n**: se puede enviar un mensaje a todos los miembros a la vez
- **Basado en el sistema de archivos**: los mensajes se almacenan como archivos JSON en `~/.claude/teams/{team-name}/inboxes/`
- **No requiere red**: todo funciona completamente a trav00e9s del sistema de archivos local, sin necesidad de conexi03n de red ni escucha de puertos

### Flujo de colaboraci03n

Un flujo de trabajo t0pico de los equipos de agentes se ve as0:

```
El usuario env0a un requisito complejo
       ↓
El L0der del equipo analiza el requisito y lo divide en tareas
       ↓
Crea miembros del equipo e inicializa la TaskList
       ↓
       ├─→ Compa00f1ero A reclama Tarea 1 ─┐
       ├─→ Compa00f1ero B reclama Tarea 2 ─┼→ Ejecuci03n en paralelo
       ├─→ Compa00f1ero C reclama Tarea 3 ─┤
       │                             ↓
       └──────────────────────────── Los miembros se coordinan a trav00e9s del sistema de mensajer0a
                                     ↓
                          Una vez completadas todas las tareas, el L0der del equipo sintetiza el resultado
                                     ↓
                          El resultado final se entrega al usuario
```

### Estructura del sistema de archivos

Los equipos de agentes crean directorios dedicados en tu sistema de archivos local para gestionar el estado del equipo:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Configuraci03n del equipo (lista de miembros, selecci03n de modelo, etc.)
│       └── inboxes/
│           ├── team-lead.json   # Bandeja de entrada del L0der del equipo
│           ├── teammate-1.json  # Bandeja de entrada del Miembro 1
│           └── teammate-2.json  # Bandeja de entrada del Miembro 2
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Informaci03n detallada de la Tarea 1
        ├── task-2.json          # Informaci03n detallada de la Tarea 2
        └── current_tasks/
            └── parse_if_statement.txt  # Archivo de bloqueo creado mientras se ejecuta una tarea
```

La ventaja de este dise00f1o es la **transparencia completa**: puedes inspeccionar el estado del equipo, el progreso de las tareas y el historial de comunicaci03n entre los miembros en cualquier momento.

---

## Inicio r00e1pido

### Habilitar la caracter0stica experimental

Los equipos de agentes son actualmente una **caracter0stica experimental** y est00e1n deshabilitados por defecto. Para usarlos, necesitas habilitarlos primero.

**La forma m00e1s f00e1cil: deja que Claude Code los habilite para ti**

Escribe esto directamente en Claude Code:

```
Help me enable Agent Teams in settings.json
```

O:

```
Enable the experimental feature agentTeams
```

Claude Code modificar00e1 autom00e1ticamente `~/.claude/settings.json` y agregar00e1 la siguiente configuraci03n:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Reinicia Claude Code**

Despu00e9s de agregar la configuraci03n, **cierra completamente y reinicia Claude Code**, y la caracter0stica surtir00e1 efecto.

**Configuraci03n manual (si el m00e9todo autom00e1tico no funciona)**:

Puedes editar manualmente `~/.claude/settings.json` y agregar o modificar:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**C03mo verificar que est00e1 habilitado**

Despu00e9s de reiniciar Claude Code, intenta una conversaci03n como esta:

```
T03: 00bfPuedes ayudarme a crear un equipo de agentes?

Claude: 00a1S0! Puedo ayudarte a crear un equipo de agentes para colaborar en una tarea...
```

Si Claude comprende y responde a la solicitud de crear un equipo, la caracter0stica se ha habilitado correctamente.

### Configuraci03n del modo visual (opcional)

Si quieres ver el trabajo de los miembros del equipo en tiempo real, puedes configurar el **modo de visualizaci03n en paneles divididos**.

**Deja que Claude Code lo configure para ti**:

Escribe esto directamente en Claude Code:

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

O:

```
Configure agent-teams to use split-panes mode
```

**Instala tmux (si no lo tienes)**:

Si `tmux` a03n no est00e1 instalado, puedes pedirle a Claude Code que lo instale:

```
Help me install tmux
```

Claude Code ejecutar00e1 autom00e1ticamente el comando de instalaci03n apropiado seg03n tu sistema operativo, ya sea macOS o Linux.

**C03mo se ve el resultado configurado**:

Despu00e9s de la configuraci03n, los miembros del equipo trabajar00e1n en diferentes paneles de tmux, y podr00e1s ver toda su salida al mismo tiempo, como un "muro de monitoreo".

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Compa00f1ero 1     │  Compa00f1ero 2     │  Compa00f1ero 3     │
│  Analizando      │  Construyendo   │  Escribiendo    │
│  c03digo          │  API            │  pruebas        │
│  ...             │  ...            │  ...            │
│                  │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Configuraci03n manual (si el m00e9todo autom00e1tico no funciona)**:

Puedes editar manualmente `~/.claude/settings.json`:

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

### Ejemplo pr00e1ctico: construye un juego RPG estilo Pokemon con equipos de agentes

Experimentemos el poder de los equipos de agentes a trav00e9s de un proyecto completo. Este ejemplo mostrar00e1 c03mo m03ltiples miembros del equipo de IA pueden colaborar para construir un juego RPG desde cero, incluyendo un sistema de batalla, funciones de di00e1logo y elementos de exploraci03n.

**Requisitos del proyecto**:

Construye un RPG web estilo Pokemon con las siguientes caracter0sticas:

- **Sistema de personajes**: el jugador puede crear un personaje con nivel, HP, ataque, defensa y otras estad0sticas
- **Sistema de batalla**: combate por turnos con opciones de ataque, habilidades, objetos e huida
- **Sistema de monstruos**: m03ltiples monstruos salvajes con diferentes atributos y habilidades
- **Sistema de di00e1logo**: conversaciones con NPCs y misiones secundarias
- **Exploraci03n de mapa**: un mapa 2D simple donde el jugador puede moverse entre escenas
- **Sistema de guardado**: guardar el progreso del juego, incluyendo nivel, posici03n, misiones completadas y m00e1s
- **Efectos de sonido y animaci03n**: efectos visuales y sonoros para ataques, da00f1o y subida de nivel

**Escribe esto en Claude Code**:

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

**C03mo ejecutar00e1 Claude**:

**Fase 1: dise00f1o de la arquitectura**

El L0der del equipo primero pedir00e1 al Compa00f1ero A, el arquitecto del juego, que dise00f1e la estructura general:

```
El Compa00f1ero A est00e1 dise00f1ando la arquitectura del juego...

Stack tecnol03gico: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Inicializaci03n del proyecto:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Estructura de archivos:
src/
├── App.tsx                 # Componente principal de la aplicaci03n
├── main.tsx                # Archivo de entrada
├── types/
│   ├── player.ts           # Definiciones de tipos del jugador
│   ├── monster.ts          # Definiciones de tipos de monstruos
│   ├── skill.ts            # Definiciones de tipos de habilidades
│   └── game.ts             # Tipos de estado del juego
├── stores/
│   └── gameStore.ts        # Gesti03n de estado con Zustand
├── components/
│   ├── map/                # Componentes relacionados con el mapa
│   │   ├── MapCanvas.tsx   # Canvas del mapa
│   │   ├── PlayerSprite.tsx # Sprite del jugador
│   │   └── NPCSprite.tsx   # Sprite del NPC
│   ├── battle/             # Componentes relacionados con la batalla
│   │   ├── BattleScreen.tsx    # Pantalla de batalla
│   │   ├── BattleMenu.tsx      # Men03 de batalla
│   │   ├── HPBar.tsx           # Componente de barra de HP
│   │   └── BattleLog.tsx       # Registro de batalla
│   ├── dialog/             # Componentes relacionados con di00e1logos
│   │   ├── DialogBox.tsx   # Caja de di00e1logo
│   │   └── Choices.tsx     # Componente de opciones
│   └── ui/                 # Componentes UI compartidos
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # L03gica del sistema de batalla
│   ├── DialogSystem.ts     # L03gica del sistema de di00e1logos
│   ├── QuestSystem.ts      # L03gica del sistema de misiones
│   └── MapSystem.ts        # L03gica del sistema de mapas
├── hooks/
│   ├── useBattle.ts        # Hook de batalla
│   ├── useDialog.ts        # Hook de di00e1logos
│   └── useAudio.ts         # Hook de audio
├── data/
│   ├── monsters.ts         # Datos de monstruos
│   ├── skills.ts           # Datos de habilidades
│   ├── dialogues.ts        # Scripts de di00e1logo
│   └── maps.ts             # Datos de mapas
└── utils/
    ├── audio.ts            # Utilidades de audio
    └── storage.ts          # Utilidades de guardado

Dise00f1o de la estructura de datos central:

// types/player.ts - Tipo de jugador
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

// types/skill.ts - Tipo de habilidad
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// Estado del juego
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

Dise00f1o del sistema de batalla:
- Por turnos, con el jugador actuando primero
- Cada turno el jugador puede elegir: ataque, habilidad, objeto o huida
- Las habilidades tienen l0mites de PP y deben restaurarse cuando se agotan
- F03rmula de da00f1o: (ataque del atacante / defensa del defensor) × poder de habilidad × factor aleatorio (0.85~1.0)

Dise00f1o del sistema de di00e1logos:
- Efecto de m00e1quina de escribir para la visualizaci03n de texto
- Soporta opciones ramificadas
- Soporta disparadores condicionales, como despu00e9s de completar una misi03n
- Los NPCs tienen direcci03n de orientaci03n, y las conversaciones se activan autom00e1ticamente cuando el jugador se acerca
```

**Fase 2: desarrollo en paralelo**

Una vez confirmada la arquitectura, el L0der del equipo crea la lista de tareas y los otros miembros comienzan a trabajar en paralelo:

```
Lista de tareas:
├── [Compa00f1ero B] Implementar l03gica central del sistema de batalla (en progreso...)
├── [Compa00f1ero C] Implementar sistemas de di00e1logo y misiones (en progreso...)
├── [Compa00f1ero D] Implementar renderizado de mapa 2D (en progreso...)
└── [Compa00f1ero E] Dise00f1ar UI y audio (en progreso...)
```

<details>
<summary>00f1 Compa00f1ero B: c03digo central del sistema de batalla</summary>

```javascript
// battle.js - Sistema de batalla
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Ataque del jugador
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} us03 ${skill.name}!`);
    this.log.push(`Caus03 ${damage} de da00f1o!`);

    // Efecto de la habilidad
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Verificar si la batalla termin03
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} se desplom03!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Ataque del monstruo
  monsterAttack() {
    if (this.state !== 'active') return;

    // Elegir una habilidad al azar
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} us03 ${skill.name}!`);
    this.log.push(`Caus03 ${damage} de da00f1o!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} cay03...`);
    } else {
      this.turn = 'player';
    }
  }

  // C00e1lculo de da00f1o
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Bonificaci03n de ventaja de tipo (simplificado)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Aplicar efecto de habilidad
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} fue quemado!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} recuper03 ${healAmount} HP!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`El ataque de ${user.name} aument03!`);
        break;
    }
  }

  // Ganar experiencia
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} gan03 ${expGain} EXP!`);

    // Verificar subida de nivel
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Subir de nivel
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Crecimiento de estad0sticas
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} subi03 al nivel ${this.player.level}!`);
    this.log.push(`HP +${hpGain}, ATK +${atkGain}, DEF +${defGain}`);
  }

  // Huir
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('Huiste exitosamente!');
      return true;
    } else {
      this.log.push('No pudiste huir!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Datos de monstruos
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'Slime',
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
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Ember', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Growl', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>00f1 Compa00f1ero C: c03digo del sistema de di00e1logo y misiones</summary>

```javascript
// dialog.js - Sistema de di00e1logo
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Mostrar di00e1logo
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Mostrar el siguiente elemento de di00e1logo
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Manejar tipos especiales de di00e1logo
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Renderizar la caja de di00e1logo
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

    // Efecto de m00e1quina de escribir
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

    // Mostrar opciones, si las hay
    this.renderChoices();
  }

  // Renderizar opciones
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

  // Siguiente
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // debe elegir cuando hay opciones
    this.showNext();
  }
}

// Sistema de misiones
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Aceptar una misi03n
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Actualizar progreso de la misi03n
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

  // Verificar completitud de la misi03n
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Completar misi03n
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Dar recompensas
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Dar recompensas
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Ejemplos de scripts de di00e1logo
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Jefe de la aldea', text: 'Oh, aventurero... finalmente llegaste.'},
      {speaker: 'Jefe de la aldea', text: '00faltimamente, muchos monstruos salvajes han aparecido cerca de nuestra aldea, y todos est00e1n asustados.'},
      {speaker: 'Jefe de la aldea', text: 'Si puedes ayudar a ahuyentarlos, estar00e9 profundamente agradecido!'},
      {
        choices: [
          {text: 'De acuerdo, acepto esta misi03n', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Jefe de la aldea', text: '00a1Maravilloso! Por favor, derrota 3 slimes al norte.'},
              {speaker: 'Sistema', text: '00a1Misi03n [Ahuyentar los Slimes] aceptada!'}
            ];
          }},
          {text: 'Estoy un poco ocupado ahora', dialog: [
            {speaker: 'Jefe de la aldea', text: 'Est00e1 bien. Vuelve cuando est00e9s listo.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Jefe de la aldea', text: '00a1Realmente lo lograste! 00a1Muchas gracias!'},
      {speaker: 'Sistema', text: '00a1Misi03n [Ahuyentar los Slimes] completada! 00a1Ganaste 100 EXP!'},
      {speaker: 'Jefe de la aldea', text: 'Por favor, toma esto. Es una peque00f1a muestra de mi agradecimiento.'}
    ]
  },

  shopkeeper: [
    {speaker: 'Tendero', text: '00a1Bienvenido! 00bfBuscas algo?'},
    {
      choices: [
        {text: 'Ver mercanc0a', dialog: () => {
          game.openShop();
          return [{speaker: 'Tendero', text: '00a1Lleva lo que te llame la atenci03n!'}];
        }},
        {text: 'Irse', dialog: [{speaker: 'Tendero', text: '00a1Vuelve la pr03xima vez!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>00f1 Compa00f1ero D: c03digo del sistema de renderizado de mapa 2D</summary>

```javascript
// map.js - Sistema de renderizado de mapa
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

  // Cargar mapa
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Renderizar el mapa
  render() {
    if (!this.currentMap) return;

    // Limpiar el canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Guardar contexto
    this.ctx.save();

    // Aplicar desplazamiento de c00e1mara
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Renderizar capas del mapa
    this.renderLayers();

    // Renderizar NPCs
    this.renderNPCs();

    // Renderizar jugador
    this.renderPlayer();

    // Restaurar contexto
    this.ctx.restore();
  }

  // Renderizar capas del mapa
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

  // Renderizar un solo tile
  renderTile(x, y, tileId) {
    // Dibujar diferentes tiles seg03n el ID del tile
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Textura de hierba
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
        // Efecto de ondas
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
        // Techo
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Obtener tipo de tile
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // Renderizar NPCs
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // Dibujar NPC
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

      // Dibujar nombre
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Renderizar jugador
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Cuerpo del jugador
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

    // Indicador de direcci03n del jugador
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

  // Actualizar posici03n de la c00e1mara
  updateCamera() {
    if (!this.player) return;

    // La c00e1mara sigue al jugador y lo mantiene centrado
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Movimiento suave
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Evitar que la c00e1mara salga de los l0mites del mapa
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Verificar colisi03n
  checkCollision(x, y) {
    // Verificar l0mites del mapa
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Verificar colisi03n de tiles
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // paredes y casas son obst00e1culos

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // Verificar colisi03n con NPCs
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // Activar di00e1logo del NPC
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // Activar di00e1logo del NPC
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Ejemplo de datos de mapa
const VILLAGE_MAP = {
  name: 'Aldea inicial',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Datos del mapa (simplificado)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... m00e1s datos del mapa
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Jefe de la aldea',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Tendero',
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
<summary>00f1 Compa00f1ero E: c03digo de UI de batalla</summary>

```html
<!-- HTML de la pantalla de batalla -->
<div id="battleScreen" class="screen hidden">
  <!-- 00e1rea del enemigo -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Slime</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- 00e1rea del jugador -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Heroe</div>
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

  <!-- Men03 de batalla -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Atacar</button>
      <button class="menu-btn" data-action="skills">Habilidades</button>
      <button class="menu-btn" data-action="items">Objetos</button>
      <button class="menu-btn" data-action="flee">Huir</button>
    </div>
  </div>

  <!-- Submen03 de habilidades -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Elige una habilidad</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Volver</button>
  </div>

  <!-- Registro de batalla -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Estilos de la pantalla de batalla */
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

/* Animaci03n de impacto */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Animaci03n de ataque */
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
<summary>00f1 C03digo del sistema de audio</summary>

```javascript
// audio.js - Sistema de audio
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Inicializar contexto de audio
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Reproducir m03sica de fondo
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Usar osciladores para generar BGM simple
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Generar m03sica de fondo simple
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

  // Detener m03sica de fondo
  stopBgm() {
    this.currentBgm = null;
  }

  // Reproducir efecto de sonido
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

  // Efecto de sonido de ataque
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

  // Efecto de sonido de impacto
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

  // Efecto de sonido de victoria
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

  // Efecto de sonido de subida de nivel
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

  // Efecto de sonido de di00e1logo
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

**Di00e1logo de colaboraci03n entre miembros**:

```
Compa00f1ero B → Compa00f1ero C:
"El sistema de batalla est00e1 listo. Cuando el jugador gana, llama a giveExp() para subir de nivel.
Por favor, revisa el sistema de misiones y aseg03rate de que los datos de subida de nivel se guarden correctamente."

Compa00f1ero C → Compa00f1ero B:
"Entendido. El sistema de misiones almacena los datos del juego con localStorage,
incluyendo nivel, experiencia y la lista de misiones completadas. Agregar00e9 un mecanismo de autoguardado."

Compa00f1ero D → Todos:
"El sistema de renderizado de mapa est00e1 terminado, y los datos de orientaci03n del NPC ahora est00e1n conectados al sistema de di00e1logo.
Cuando el jugador mira hacia un NPC, el di00e1logo se activar00e1 autom00e1ticamente. Por favor, confirmen la l03gica de activaci03n en el sistema de di00e1logo."

Compa00f1ero C → Compa00f1ero D:
"Confirmado. DialogSystem tiene un m00e9todo showDialog() que puede aceptar un array de di00e1logos.
Me asegurar00e9 de que todos los datos de di00e1logo de NPCs sigan ese formato."

Compa00f1ero E → Compa00f1ero B:
"La UI de batalla est00e1 terminada, pero necesito datos del jugador y del monstruo en tiempo real para actualizar las barras de HP.
00bfEl sistema de batalla proporciona un callback?"

Compa00f1ero B → Compa00f1ero E:
"S0. BattleSystem tiene un callback onUpdate que se activa al final de cada turno.
Puedes registrar ese callback para actualizar la UI."

Compa00f1ero E → Compa00f1ero D:
"Al cambiar de mapas, necesitamos reposicionar la c00e1mara.
00bfMapRenderer proporciona un m00e9todo updateCamera()?"

Compa00f1ero D → Compa00f1ero E:
"S0. updateCamera() se llama autom00e1ticamente despu00e9s de cada loadMap().
Tambi00e9n puedes llamarlo manualmente despu00e9s de que el jugador se mueva para actualizar la c00e1mara suavemente."
```

**Fase 3: integraci03n y pruebas**

Despu00e9s de que todos los componentes est00e9n completos, el L0der del equipo es responsable de la integraci03n:

<details>
<summary>00f1 C03digo del controlador principal del juego</summary>

```javascript
// game.js - Controlador principal del juego
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Inicializar cada sistema
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Cargar mapa
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Manejo de entrada
    this.setupInput();

    // Iniciar bucle del juego
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Cargar partida guardada autom00e1ticamente
    this.loadGame();
  }

  // Crear jugador
  createPlayer() {
    return {
      name: 'Heroe',
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

  // Configurar manejo de entrada
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

  // Manejo de entrada del mapa
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

      // Verificar batalla aleatoria
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Guardar juego
      this.saveGame();
    }
  }

  // Manejo de entrada de di00e1logo
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Manejo de entrada de batalla
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Iniciar batalla
  startBattle(monsterData) {
    // Elegir un monstruo al azar
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Crear instancia de monstruo
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

    // Reproducir m03sica de batalla
    this.audioManager.playBgm('battle');

    // Mostrar pantalla de batalla
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Actualizar UI de batalla
    this.updateBattleUI();
  }

  // Actualizar UI de batalla
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

    // Actualizar registro de batalla
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // Terminar batalla
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Ocultar pantalla de batalla
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Reproducir m03sica del mapa
    this.audioManager.playBgm('village');

    // Guardar juego
    this.saveGame();
  }

  // Guardar juego
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Cargar juego
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Bucle principal del juego
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Limpiar canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Renderizar seg03n estado
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Iniciar el juego
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**Resultado final**:

Despu00e9s de aproximadamente 1 a 2 horas, un RPG estilo Pokemon completamente funcional est00e1 listo!

```
Resumen del proyecto:
00a1 Arquitectura del juego - Compa00f1ero A
00a1 Sistema de batalla por turnos - Compa00f1ero B
00a1 Sistema de di00e1logo y misiones - Compa00f1ero C
00a1 Renderizado de mapa 2D - Compa00f1ero D
00a1 UI y efectos de sonido - Compa00f1ero E

Archivos del proyecto:
├── index.html (120 l0neas)
├── css/
│   ├── main.css (100 l0neas)
│   ├── battle.css (180 l0neas)
│   └── dialog.css (80 l0neas)
├── js/
│   ├── game.js (250 l0neas)
│   ├── state.js (60 l0neas)
│   ├── player.js (50 l0neas)
│   ├── monster.js (80 l0neas)
│   ├── battle.js (220 l0neas)
│   ├── dialog.js (180 l0neas)
│   ├── map.js (280 l0neas)
│   └── audio.js (150 l0neas)
└── data/
    ├── monsters.js (100 l0neas)
    ├── skills.js (80 l0neas)
    └── dialogues.js (120 l0neas)

Total: aproximadamente 2050 l0neas de c03digo, completadas colaborativamente por 5 miembros del equipo de IA!

Caracter0sticas del juego:
00a4 Sistema de batalla por turnos (ataque, habilidades, objetos, huida)
00a7 Sistema de di00e1logo de NPCs (efecto de m00e1quina de escribir, opciones ramificadas)
00a8 Sistema de misiones (aceptar misiones, actualizar progreso, recompensas de completitud)
00a1 Exploraci03n de mapa 2D (transiciones multi-escena, interacci03n con NPCs)
00a7 Autoguardado (progreso almacenado con localStorage)
00a4 Efectos de sonido y BGM (Web Audio API)
00a8 Crecimiento del personaje (experiencia, subida de nivel, aumento de estad0sticas)
```

**Observa al equipo en acci03n**:

Si configuraste el modo de paneles divididos de tmux, ver00e1s m03ltiples ventanas de terminal trabajando al mismo tiempo:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Compa00f1ero B     │  Compa00f1ero C     │  Compa00f1ero D     │
│  Implementando   │  Escribiendo    │  Renderizando   │
│  f03rmula de       │  scripts de     │  tiles          │
│  da00f1o            │  di00e1logo        │                 │
│                  │                 │                 │
│  "Compa00f1ero E,   │  "00bfEst00e1        │  "Los monstruos │
│   00bfel ancho de   │   MapRenderer   │   necesitan     │
│   la barra HP    │   listo ya?"    │   animaciones   │
│   es porcentaje?"│                 │   de ataque..." │
└─────────────────┴─────────────────┴─────────────────┘
```

**Conclusiones clave**:

Este ejemplo pr00e1ctico muestra varias ventajas centrales de los equipos de agentes:

1. **Desarrollo verdaderamente paralelo**: 5 miembros desarrollan diferentes sistemas del juego al mismo tiempo
2. **Gesti03n de proyectos complejos**: m00e1s de 2000 l0neas de c03digo se dividen e integran de manera estructurada
3. **Divisi03n especializada del trabajo**: batalla, di00e1logo, mapas y UI tienen cada uno un propietario dedicado
4. **Coordinaci03n de interfaces**: los miembros negocian interfaces y formatos de datos a trav00e9s del sistema de mensajer0a
5. **Entrega r00e1pida**: trabajo que podr0a tomar semanas a una persona puede ser completado por el equipo en pocas horas

Puedes intentar ejecutar este juego t03 mismo y experimentar c03mo un equipo de IA colabora para construir un RPG estilo Pokemon.

---

### Un solo prompt vs equipos de agentes: pru00e9balo t03 mismo

Para ayudarte a sentir el poder de los equipos de agentes m00e1s directamente, preparamos dos planes de prueba que puedes intentar y comparar.

#### Plan de prueba A: enfoque de un solo prompt

Este es el enfoque tradicional: usa un prompt completo y pide a la IA que desarrolle el juego.

**Escribe esto en Claude Code**:

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

**Resultado esperado**:

| Elemento | Situaci03n esperada |
|------|---------|
| **Calidad del c03digo** | La IA intentar00e1 generar todo el c03digo, pero debido a los l0mites de contexto, muchos detalles se omitir00e1n o se reemplazar00e1n con comentarios |
| **Completitud de funciones** | Las funciones centrales pueden estar presentes, pero muchas funciones avanzadas faltar00e1n o estar00e1n simplificadas |
| **Ejecutabilidad** | Puede haber errores, y pueden ser necesarias varias rondas de depuraci03n antes de que funcione |
| **Tiempo de desarrollo** | Una conversaci03n puede tomar de 30 a 60 minutos, con m03ltiples rondas de ida y vuelta |
| **Volumen de c03digo** | Aproximadamente 500 a 800 l0neas, porque la IA tiende a comprimir el c03digo |

**Problemas que puedes encontrar**:

1. **El c03digo se corta**: las respuestas de la IA tienen l0mites de longitud, por lo que la generaci03n puede detenerse a la mitad
2. **Funciones incompletas**: el sistema de di00e1logo puede ser solo una versi03n b00e1sica sin sistema de misiones
3. **Detalles faltantes**: el sistema de audio puede dejarse como un comentario TODO
4. **Dif0cil de depurar**: si el c03digo tiene problemas, debes pedirle a la IA que lo arregle en la misma conversaci03n, y el contexto se vuelve cada vez m00e1s desordenado

#### Plan de prueba B: enfoque con equipos de agentes

Este es el enfoque introducido en este art0culo: deja que m03ltiples miembros del equipo de IA colaboren en el desarrollo.

**Escribe esto en Claude Code** (despu00e9s de habilitar los equipos de agentes):

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

**Resultado esperado**:

| Elemento | Situaci03n esperada |
|------|---------|
| **Calidad del c03digo** | Cada miembro se enfoca en su propia 00e1rea, por lo que el c03digo es m00e1s profesional y completo |
| **Completitud de funciones** | Todas las funciones se implementan m00e1s completamente, incluyendo el sistema de misiones y mapas de m03ltiples escenas |
| **Ejecutabilidad** | Los miembros verifican las interfaces entre s0, por lo que hay menos problemas de integraci03n |
| **Tiempo de desarrollo** | Aproximadamente 1 a 2 horas para completar todas las funciones porque el desarrollo ocurre en paralelo |
| **Volumen de c03digo** | Aproximadamente 2000+ l0neas, con una implementaci03n completa en lugar de c03digo comprimido |

#### Tabla de comparaci03n cuantitativa

| Dimensi03n | Un solo prompt | Equipos de agentes |
|---------|-------------|-------------|
| **Total de l0neas de c03digo** | 500-800 l0neas | 2000+ l0neas |
| **Tiempo de desarrollo** | 30-60 minutos, pero funciones incompletas | 1-2 horas, con funciones completas |
| **Completitud de funciones** | 60-70% | 95%+ |
| **Mantenibilidad** | Media, generalmente un archivo grande | Alta, con dise00f1o modular |
| **Cantidad de bugs** | Mayor, porque hay menos validaci03n | Menor, porque los miembros se verifican entre s0 |
| **Extensibilidad futura** | Dif0cil, porque el c03digo est00e1 fuertemente acoplado | M00e1s f00e1cil, porque la estructura es modular |
| **Uso de tokens** | ~50K tokens | ~200K tokens (5 miembros) |
| **Costo** | ~$0.50 | ~$2.00 |

#### Proceso de prueba real sugerido

**Paso 1: prueba primero el enfoque de un solo prompt**

```
1. Abre una nueva conversaci03n de Claude Code
2. Usa el prompt del "Plan de prueba A" anterior
3. Registra: 00bfcu00e1nto tiempo tom03? 00bfCu00e1ntas l0neas de c03digo se produjeron? 00bfQu00e9 funciones faltaron?
```

**Paso 2: luego prueba el enfoque con equipos de agentes**

```
1. Confirma que los equipos de agentes est00e9n habilitados
2. Usa el prompt del "Plan de prueba B" anterior
3. Observa: 00bfc03mo colaboran los miembros del equipo? 00bfEs el c03digo m00e1s completo?
```

**Paso 3: compara los dos resultados**

```
1. Ejecuta ambas versiones del c03digo por separado
2. Compara las listas de funciones: 00bfqu00e9 funciones faltan en la versi03n de un solo prompt?
3. Compara la estructura del c03digo: 00bfes la versi03n de equipos de agentes m00e1s modular?
4. Eval03a: si quisieras continuar desarrollando este juego, 00bfqu00e9 versi03n ser0a m00e1s f00e1cil de extender?
```

#### 00bfPor qu00e9 ocurren estas diferencias?

**Limitaciones del enfoque de un solo prompt**:

1. **Presi03n del contexto**: la IA debe manejar todo en una sola respuesta, por lo que la simplificaci03n es inevitable
2. **Atenci03n dispersa**: batalla, di00e1logo, mapa y UI compiten por la atenci03n, por lo que es f00e1cil perder detalles
3. **Sin validaci03n colaborativa**: nadie verifica si las interfaces coinciden, por lo que es m00e1s probable que haya bugs

**Ventajas de los equipos de agentes**:

1. **Divisi03n especializada del trabajo**: cada miembro se enfoca en un 00e1rea y puede profundizar en los detalles
2. **Procesamiento paralelo**: el desarrollo de batalla, di00e1logo y mapa ocurre al mismo tiempo, mejorando la eficiencia
3. **Validaci03n mutua**: los miembros negocian interfaces entre s0, reduciendo problemas de integraci03n
4. **Contexto independiente**: cada miembro tiene su propio contexto de 200K y no interfiere con los dem00e1s

#### Conclusi03n

El valor central de los equipos de agentes no es simplemente que es "m00e1s r00e1pido", sino que es **"m00e1s completo y m00e1s profesional"**.

- Para proyectos simples como Snake, un solo prompt es suficiente
- Para proyectos complejos como un RPG estilo Pokemon, los equipos de agentes pueden producir mejores resultados

La clave es **elegir la herramienta correcta**: no uses equipos de agentes para renombrar una variable, y no uses un solo prompt para construir un juego RPG completo.

---

## Mejores pr00e1cticas

Los equipos de agentes son una herramienta poderosa, pero para usarlos bien, necesitas comprender algunas mejores pr00e1cticas. Estas lecciones provienen de la experiencia real en la comunidad y pueden ayudarte a evitar errores comunes mientras obtienes el m00e1ximo valor de la colaboraci03n en equipo.

### Pr00e1ctica 1: contrato primero

Antes de que m03ltiples agentes comiencen a trabajar en paralelo, dedica tiempo a definir un "contrato" claro, es decir, el acuerdo de interfaz.

**Por qu00e9 es importante**:

Supongamos que el Compa00f1ero A es responsable de la API del backend y el Compa00f1ero B es responsable de la integraci03n del frontend. Si comienzan al mismo tiempo sin acordar primero el formato de interfaz, puede ocurrir algo como esto:

```
Compa00f1ero A: implement03 POST /api/login y espera {username, password}
Compa00f1ero B: implement03 la llamada del frontend y env0a {user, pass}
Resultado: no coinciden, y se requiere retrabajo
```

**C03mo hacerlo**:

Antes de iniciar el equipo, primero pide a Claude que dise00f1e las interfaces:

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**Un contrato debe incluir**:

- Firmas de funciones y estructuras de datos
- Formatos JSON de entrada y salida
- Significados de los c03digos de estado HTTP
- Convenciones de manejo de errores
- Reglas de validaci03n de campos

### Pr00e1ctica 2: asignar modelos sabiamente

Diferentes tareas requieren diferentes modelos. Una buena asignaci03n de modelos ayuda a equilibrar calidad y costo.

**Usa Opus para el L0der del equipo**:

El L0der del equipo maneja la descomposici03n de tareas y la s0ntesis de resultados, lo que requiere mayor capacidad de razonamiento, por lo que se recomienda Opus:

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Usa Sonnet para los compa00f1eros**:

Para trabajo concreto de codificaci03n y pruebas, Sonnet es completamente capaz y significativamente m00e1s econ03mico:

- Opus 4.6: aproximadamente $15 por mill03n de tokens de salida
- Sonnet 4.5: aproximadamente $3 por mill03n de tokens de salida

Usar Sonnet para los miembros puede reducir significativamente el costo general.

**Usa Haiku para casos especiales**:

Para tareas simples como actualizaciones de documentaci03n o peque00f1as tareas de escritura de pruebas, puedes considerar Haiku, aproximadamente $0.80 por mill03n de tokens de salida.

### Pr00e1ctica 3: controlar la granularidad de las tareas

Las tareas demasiado grandes o demasiado peque00f1as perjudican la eficiencia. Necesitas encontrar la granularidad adecuada.

**Regla general**:

Cada tarea debe ser algo que un miembro pueda completar independientemente en **15 a 30 minutos**.

**Tarea demasiado grande**:

```
Mal: implementar el sistema de autenticaci03n de usuarios
```

Esta tarea es demasiado amplia. Contiene varias subtareas, y una persona necesitar0a mucho tiempo para terminarla, lo que desperdicia la ventaja del paralelismo.

**Tarea demasiado peque00f1a**:

```
Mal: crear un archivo vac0o llamado auth.js
```

Esta tarea es demasiado peque00f1a. Los miembros gastan m00e1s tiempo coordinando que haciendo trabajo real.

**Granularidad adecuada**:

```
Bien: implementar la API de login, incluyendo:
1. El endpoint POST /api/login
2. Validaci03n de nombre de usuario y contrase00f1a
3. Respuesta con token JWT
4. Manejo de errores
```

Esta tarea tiene l0mites claros y entregables. Una persona puede terminarla independientemente, y no est00e1 excesivamente fragmentada.

**Configuraci03n recomendada**:

Deja que cada miembro posea **5 a 6 tareas de tama00f1o mediano**. Esto proporciona suficiente paralelismo sin hacer que los costos de coordinaci03n sean demasiado altos.

### Pr00e1ctica 4: evitar conflictos de archivos

M03ltiples miembros modificando el mismo archivo al mismo tiempo es el problema m00e1s com03n en los equipos de agentes.

**Principio de asignaci03n**:

Intenta que diferentes miembros posean **diferentes archivos**:

```
Bien:
- Compa00f1ero A: posee todos los archivos bajo src/auth/
- Compa00f1ero B: posee todos los archivos bajo src/api/
- Compa00f1ero C: posee todos los archivos bajo tests/auth/

Mal:
- Compa00f1ero A y Compa00f1ero B ambos modifican src/app.js
```

**Si el mismo archivo debe ser modificado**:

Dise00f1a una fase de edici03n serial:

```
Fase 1 (paralelo):
- Compa00f1ero A: analizar qu00e9 funcionalidad debe agregarse a auth.js
- Compa00f1ero B: dise00f1ar la interfaz de la nueva funci03n
- Compa00f1ero C: escribir los casos de prueba

Fase 2 (serial):
- El L0der del equipo sintetiza todas las entradas
- Un miembro modifica auth.js en una pasada integrada
```

### Pr00e1ctica 5: proporcionar contexto inicial rico

Cuando los compa00f1eros comienzan, su historial de conversaci03n est00e1 vac0o. No saben lo que el L0der del equipo y el usuario discutieron antes.

**Enfoque incorrecto**:

```
Crear el equipo y dejar que los miembros comiencen a trabajar.
```

Los miembros comenzar00e1n en la niebla: 00bfde qu00e9 proyecto se trata? 00bfQu00e9 stack tecnol03gico usa? 00bfQu00e9 exactamente deben construir?

**Enfoque correcto**:

```
This is a React + Node.js e-commerce project using TypeScript.

The project structure is:
- src/frontend/: React frontend code
- src/backend/: Node.js backend code
- prisma/: database models

Code style:
- Use function components and Hooks
- Use Express.js on the backend
- Use PostgreSQL for the database

Now create a team and have the members add user authentication under src/auth/.
```

Solo con contexto suficiente pueden los miembros trabajar de manera eficiente.

### Pr00e1ctica 6: investigar antes de implementar

No dejes que los miembros comiencen a codificar inmediatamente. P0deles que primero investiguen y dise00f1en la soluci03n.

**Proceso de dos fases**:

**Fase 1: investigaci03n y dise00f1o**

```
Create a team. In phase one, do research:
- One member investigates existing authentication approaches (JWT vs Session)
- One member analyzes the project's tech stack and determines best practices
- One member designs the database schema

After the research is complete, let the members discuss through the messaging system and settle on a final plan.
```

**Fase 2: implementaci03n**

```
After the plan is finalized, begin implementation:
- One member implements the backend authentication logic
- One member implements the frontend login page
- One member writes tests
```

El beneficio de hacerlo as0 es que puedes **descubrir incompatibilidades de arquitectura temprano**, en lugar de darte cuenta a mitad de la implementaci03n de que el plan no funciona.

### Pr00e1ctica 7: monitorear e intervenir activamente

Incluso si configuraste la automatizaci03n, a03n debes monitorear activamente el estado de trabajo del equipo.

**Usa el modo de paneles divididos**:

Si configuraste los paneles de tmux, puedes ver la salida de todos los miembros en tiempo real:

```
┌─────────────────┬─────────────────┐
│  Compa00f1ero 1     │  Compa00f1ero 2     │
│  Analizando      │  Implementando  │
│  c03digo          │  API...         │
│  ...             │                 │
│                  │                 │
│  Espera, este    │                 │
│  enfoque parece  │                 │
│  incorrecto...   │                 │
└─────────────────┴─────────────────┘
```

Cuando notes que un miembro va en la direcci03n equivocada, puedes intervenir r00e1pidamente:

```
@Teammate1 Stop for a moment. Your analysis is headed in the wrong direction. The authentication module should be under src/auth/, not src/user/.
```

**Verifica el estado de las tareas regularmente**:

Usa el comando TaskList para inspeccionar el estado de todas las tareas:

```
/tasks
```

Esto muestra todos los estados de las tareas para que puedas ver qu00e9 est00e1 completado, qu00e9 a03n se est00e1 ejecutando y qu00e9 est00e1 bloqueado.

---

## Escenarios adecuados

Los equipos de agentes son poderosos, pero no toda tarea es adecuada para ellos. Comprender los escenarios correctos te ayuda a elegir correctamente.

### Escenarios donde los equipos de agentes encajan bien

**Refactorizaciones de sistemas complejos**

Cuando la refactorizaci03n abarca m03ltiples m03dulos con l0mites claros:

```
Escenario: dividir una aplicaci03n monol0tica en microservicios

Crear un equipo:
- Compa00f1ero A: analizar dependencias en el m03dulo de usuarios
- Compa00f1ero B: analizar dependencias en el m03dulo de pedidos
- Compa00f1ero C: analizar dependencias en el m03dulo de pagos
- Compa00f1ero D: dise00f1ar el protocolo de comunicaci03n entre servicios
```

Estos m03dulos pueden analizarse simult00e1neamente, y el resultado final puede sintetizarse despu00e9s, lo cual es mucho m00e1s r00e1pido que analizarlos secuencialmente.

**Revisiones de c03digo desde m03ltiples perspectivas**

Cuando necesitas revisar c03digo desde varias dimensiones:

```
Escenario: realizar una revisi03n de seguridad completa del m03dulo de pagos

Crear un equipo:
- Compa00f1ero A: enfocarse en vulnerabilidades de seguridad (inyecci03n SQL, XSS, etc.)
- Compa00f1ero B: inspeccionar problemas de rendimiento (consultas N+1, fugas de memoria, etc.)
- Compa00f1ero C: verificar completitud del manejo de errores
- Compa00f1ero D: evaluar cobertura de pruebas
```

Cada miembro se enfoca en una dimensi03n, haciendo la revisi03n m00e1s profunda y el informe final m00e1s completo.

**Desarrollo paralelo de frontend y backend**

Cuando necesitas construir frontend y backend al mismo tiempo:

```
Escenario: construir una funci03n de gesti03n de usuarios

Crear un equipo:
- Compa00f1ero A (frontend): implementar la p00e1gina de lista de usuarios
- Compa00f1ero B (frontend): implementar la p00e1gina de edici03n de usuarios
- Compa00f1ero C (backend): implementar la API CRUD
- Compa00f1ero D (coordinaci03n): dise00f1ar el contrato API y asegurar que frontend y backend se mantengan alineados
```

Frontend y backend pueden avanzar en paralelo siempre que el contrato API se defina primero, siguiendo el principio de contrato primero.

**Depuraci03n competitiva**

Cuando tienes m03ltiples soluciones posibles:

```
Escenario: corregir un bug complejo con dos estrategias de reparaci03n posibles

Crear un equipo:
- Compa00f1ero A: implementar soluci03n 1
- Compa00f1ero B: implementar soluci03n 2
- Compa00f1ero C: evaluar los pros y contras de ambas
```

Ambas soluciones pueden implementarse y probarse en paralelo, y la mejor puede elegirse despu00e9s.

**Generaci03n de documentaci03n**

Cuando necesitas producir una gran cantidad de documentaci03n:

```
Escenario: escribir documentaci03n para todo el proyecto

Crear un equipo:
- Compa00f1ero A: escribir documentaci03n de API
- Compa00f1ero B: escribir la gu0a de despliegue
- Compa00f1ero C: escribir la gu0a de desarrollo
- Compa00f1ero D: escribir el manual de soluci03n de problemas
```

M03ltiples documentos pueden escribirse al mismo tiempo, mejorando enormemente la eficiencia.

### Escenarios donde los equipos de agentes no son adecuados

**Tareas de modificaci03n simple**

```
No adecuado: renombrar variables, corregir un solo bug, adiciones de funciones peque00f1as
```

Para estas tareas, el costo de iniciar un equipo es mayor que el trabajo real.

**Tareas altamente seriales**

```
No adecuado: tareas que deben ocurrir estrictamente en secuencia
```

Si la tarea B no puede comenzar hasta que la tarea A termine, no hay espacio real para el paralelismo.

**Tareas sensibles al costo**

Los equipos de agentes consumen **2 a 4 veces** los tokens de una sola instancia, dependiendo del tama00f1o del equipo. Si el costo es la preocupaci03n principal, una sola instancia puede ser la mejor opci03n.

### Diagrama de flujo de decisi03n

```
00bfHay m03ltiples subtareas independientes?
    │
    ├─ No → Usar una sola instancia
    │
    └─ S0 →
         │
         00bfLas subtareas pueden asignarse a diferentes archivos?
         │
         ├─ No → Considerar ejecuci03n serial o dividir la tarea m00e1s
         │
         └─ S0 →
              │
              00bfEs el costo aceptable (2-4x)?
              │
              ├─ No → Usar una sola instancia
              │
              └─ S0 → Usar equipos de agentes ✓
```

---

## Costo y rendimiento

Usar equipos de agentes aumenta el costo, pero tambi00e9n puede producir ganancias significativas de eficiencia. Comprender este equilibrio te ayuda a tomar decisiones informadas.

### An00e1lisis de costos

**Consumo de tokens y tama00f1o del equipo**

El consumo de tokens de los equipos de agentes es aproximadamente **lineal** con el tama00f1o del equipo:

| Tama00f1o del equipo | Costo relativo | Escenario adecuado |
|---------|---------|---------|
| 1 persona (instancia 03nica) | 1x | Tareas simples |
| Equipo de 2 personas | 2-2.5x | Complejidad media |
| Equipo de 3 personas | 3-4x | Tareas complejas |
| Equipo de 5+ personas | 5-6x+ | Proyectos grandes |

**Por qu00e9 no es perfectamente lineal**:

- **Costo de inicio**: cada miembro debe recibir contexto inicial cuando comienza
- **Costo de coordinaci03n**: la comunicaci03n entre miembros a trav00e9s del sistema de mensajer0a tambi00e9n consume tokens
- **Costo del L0der del equipo**: el L0der del equipo generalmente usa Opus, que es m00e1s costoso

**Ejemplo de n03meros concretos** (Claude 4.5 Sonnet):

- Entrada: $3 por mill03n de tokens
- Salida: $15 por mill03n de tokens

Supongamos que una tarea requiere:
- L0der del equipo (Opus): 50K entrada + 20K salida ≈ $2.25
- 3 compa00f1eros (Sonnet): cada uno 30K entrada + 15K salida ≈ $2.7 × 3 = $8.1
- **Total**: aproximadamente $10.35

La misma tarea en una sola instancia de Sonnet:
- 100K entrada + 50K salida ≈ $1.05

**Multiplicador de costo**: aproximadamente 10x

**Pero tiempo ahorrado**: potencialmente reducido de 3 horas a 1 hora

### Ganancias de eficiencia

**Datos de pruebas internas de Anthropic**:

- Refactorizaciones de proyectos grandes: aproximadamente **50%** de mejora en eficiencia
- Desarrollo paralelo de m03ltiples m03dulos: aproximadamente **60-70%** de mejora
- Tareas de generaci03n de documentaci03n: aproximadamente **80%** de mejora

**Caso real**:

El equipo de ingenier0a de Anthropic una vez us03 **16 agentes en paralelo** para construir un compilador de C en aproximadamente 2 semanas que pod0a compilar el kernel de Linux 6.9, aproximadamente 100,000 l0neas de c03digo Rust, y pas03 el 99% de las pruebas de GCC.

### Estrategias de optimizaci03n de costos

**Estrategia 1: mezclar modelos**

```
L0der del equipo: Opus (necesita fuerte razonamiento)
Compa00f1eros: Sonnet (alto valor por costo)
Tareas simples: Haiku (el m00e1s econ03mico)
```

**Estrategia 2: ajustar el tama00f1o del equipo din00e1micamente**

```
Fase de an00e1lisis: equipo de 5 personas (an00e1lisis desde m03ltiples 00e1ngulos)
Fase de implementaci03n: equipo de 3 personas (codificaci03n en paralelo)
Fase de pruebas: equipo de 2 personas (pruebas y correcciones)
```

**Estrategia 3: usar equipos de agentes solo en fases seleccionadas**

No uses equipos de agentes para todo el proyecto. 03salos solo en las fases m00e1s complejas:

```
Fase 1 (an00e1lisis de requisitos): instancia 03nica
Fase 2 (dise00f1o de arquitectura): equipos de agentes (m03ltiples planes explorados en paralelo)
Fase 3 (codificaci03n): instancia 03nica
Fase 4 (revisi03n de c03digo): equipos de agentes (revisi03n desde m03ltiples perspectivas)
Fase 5 (documentaci03n): equipos de agentes (escritura en paralelo)
```

### Cu00e1ndo vale la pena

**Vale la pena cuando**:

- El cronograma del proyecto es ajustado, y el valor de las ganancias de eficiencia excede el costo de tokens
- La tarea es muy compleja, y una sola instancia probablemente pasar00e1 por alto detalles
- Necesitas an00e1lisis y validaci03n desde m03ltiples perspectivas

**No vale la pena cuando**:

- La tarea es simple, y la sobrecarga de iniciar un equipo es demasiado alta
- El costo es altamente sensible y el presupuesto de tokens es limitado
- La tarea es altamente serial y no ofrece espacio para el paralelismo

---

## Preguntas frecuentes

### P1: 00bfSon estables los equipos de agentes? 00bfSe pueden usar en producci03n?

Los equipos de agentes son actualmente una **caracter0stica experimental**, por lo que puede que a03n haya bugs y comportamiento inestable. Recomendaciones:

- Haz una copia de seguridad de proyectos importantes primero
- Comienza con proyectos peque00f1os para que puedas probar y familiarizarte
- Sigue las notas de versi03n oficiales para ver mejoras en nuevas versiones
- Reporta problemas al equipo oficial prontamente cuando aparezcan

### P2: 00bfCu00e1ntos miembros puedo crear como m00e1ximo?

No hay un l0mite te03rico estricto, pero desde una perspectiva pr00e1ctica:

- Proyectos peque00f1os: 2 a 3 personas
- Proyectos medianos: 3 a 5 personas
- Proyectos grandes: 5 a 10 personas

Demasiados miembros introducen los siguientes problemas:

- La sobrecarga de coordinaci03n aumenta dr00e1sticamente
- El uso de tokens crece linealmente
- La probabilidad de conflictos de archivos aumenta
- El monitoreo y la gesti03n se vuelven m00e1s dif0ciles

### P3: 00bfPueden los miembros del equipo ver el contexto de los dem00e1s?

**No**. Cada compa00f1ero tiene una ventana de contexto completamente independiente. Se comunican a trav00e9s del sistema de mensajer0a en lugar de compartir contexto directamente.

Esta es una decisi03n de dise00f1o deliberada, y los beneficios son:

- El razonamiento de un miembro no es contaminado por el razonamiento de otro
- El contexto no se vuelve ca03tico porque las conversaciones son demasiado largas
- Es m00e1s cercano a c03mo trabaja un equipo real, donde cada uno tiene su propia mente

### P4: 00bfC03mo cambio entre diferentes miembros?

Si el modo de paneles divididos no est00e1 configurado, puedes usar teclas de acceso r00e1pido:

- `Shift+Up`: cambiar al miembro anterior
- `Shift+Down`: cambiar al siguiente miembro
- `Ctrl+O`: volver al L0der del equipo

### P5: 00bfQu00e9 pasa si una tarea falla?

Si la tarea de un miembro falla:

1. Verifica la causa del fallo leyendo el registro de salida de ese miembro
2. Reasigna la tarea a otro miembro si es necesario
3. Interviene manualmente y ayuda a desbloquear el problema directamente

### P6: 00bfPuedo agregar o eliminar miembros a mitad del proceso?

S0. Puedes emitir comandos al L0der del equipo en cualquier momento:

```
Add a new member and let it handle XXX.
```

```
Let Teammate 3 leave the team after finishing the current task.
```

### P7: 00bfSe pueden usar los equipos de agentes junto con MCP y Skills?

Absolutamente. De hecho, funcionan a03n mejor juntos:

- **Equipos de agentes + Skills**: cada miembro puede portar diferentes skills
- **Equipos de agentes + MCP**: diferentes miembros pueden acceder a recursos externos a trav00e9s de diferentes servidores MCP

```
Create a team:
- Teammate A: carries the frontend-design Skill and is responsible for UI
- Teammate B: accesses the repository through GitHub MCP and handles PR management
- Teammate C: queries data through Database MCP and handles analysis
```

---

## Referencias

### Recursos oficiales

- [Documentaci03n oficial de Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Documentaci03n completa de Claude Code
- [Blog de ingenier0a de Anthropic](https://www.anthropic.com/engineering) - Blog t00e9cnico oficial y actualizaciones

### Colecci03n de tutoriales de equipos de agentes

**Gu0as completas en chino**:

- [Gu0a completa de Claude Code Agent Teams: desde la introducci03n hasta la pr00e1ctica](https://m.blog.csdn.net/u010634066/article/details/157903022) - Incluye detalles de configuraci03n, ejemplos pr00e1cticos y el caso impactante donde 16 agentes en paralelo construyeron un compilador de C
- [Desarrollo colaborativo con Claude Code Agent Team: gu0a pr00e1ctica completa](https://m.blog.csdn.net/u010028049/article/details/158126612) - Flujo de trabajo completo de proyecto colaborativo
- [Gu0a paso a paso para configurar y usar Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - Tutorial de Tencent Cloud con instrucciones de configuraci03n detalladas

**Introducci03n a la pr00e1ctica**:

- [Pr00e1ctica con Claude Code Agent Teams nativos: desde habilitarlos hasta ejecutar un equipo de tres personas](https://www.cnblogs.com/147api/p/19606317) - Recorrido de un equipo de tres personas
- [Pr00e1ctica de principiante con Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - Introducci03n amigable para principiantes con mejores pr00e1cticas como contrato primero
- [No m00e1s trabajar solo: deja que 7 Claudes te ayuden a desarrollar al mismo tiempo con Agent Teams](https://m.toutiao.com/a7605229732241736202/) - Caso de estudio de un equipo de 7 personas

**Mejores pr00e1cticas**:

- [Mejores pr00e1cticas de Agent Teams: contrato primero, granularidad de tareas y asignaci03n de modelos](https://blog.csdn.net/sinat_37574187/article/details/144727588) - Explicaci03n detallada de 7 mejores pr00e1cticas
- [Manual de campo de Claude Code de un veterano de 7 a00f1os en grandes tecnol03gicas: ocho reglas de principiante a experto](https://new.qq.com/rain/a/20260111A02HE900) - Experiencia real a nivel empresarial

**Principios y comparaciones**:

- [Claude Code Agent Teams: la forma correcta de hacer colaboraci03n multi-agente](https://post.m.smzdm.com/p/adoezrmz/) - An00e1lisis profundo de colaboraci03n multi-agente
- [Desarrollo de equipos multi-agente de Claude Code: la gu0a completa desde principios hasta obst00e1culos](https://m.toutiao.com/a7605229732241736202/) - Principios y obst00e1culos del uso real

### Traducciones de gu0as oficiales

- [Claude lanz03 oficialmente la "Gu0a de construcci03n de agentes" (con descarga de PDF)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - Gu0a oficial de construcci03n de agentes
- [Versi03n traducida completa de la "Gu0a para construir agentes efectivos" oficial de Claude](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - Traducci03n completa al chino

### Tecnolog0as relacionadas

- [Est00e1ndar de Agent Skills](https://agentskills.io/) - El ecosistema de Skills
- [skills.sh - Tienda de aplicaciones de Agent Skills](https://skills.sh/) - Biblioteca de m00e1s de 70,000 skills
