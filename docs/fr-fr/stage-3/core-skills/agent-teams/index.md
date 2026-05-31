# Guide complet de Claude Agent Teams

## Introduction aux Agent Teams

**Agent Teams** est une fonctionnalité révolutionnaire de Claude Code qui permet à **plusieurs instances d'IA indépendantes de collaborer comme une véritable équipe de développement**.

Imaginez qu'auparavant, utiliser Claude Code revenait à être un chef de projet travaillant avec un seul assistant exceptionnellement compétent. Peu importe la complexité de la tâche, un seul assistant effectuait tout le travail. Désormais, avec Agent Teams, vous pouvez constituer une équipe de développement IA complète : un membre peut gérer le frontend, un autre le backend, un autre les tests, et ils peuvent **travailler simultanément, communiquer entre eux et collaborer pour accomplir des tâches complexes**.

### D'un assistant unique à la collaboration en équipe

Avant de plonger dans Agent Teams, comprenons d'abord le problème qu'il résout.

**Limites du mode IA unique** :

Lorsque vous utilisez une seule instance de Claude pour gérer un projet complexe, vous rencontrerez ces goulots d'étranglement :

- **Goulot de traitement séquentiel** : l'IA ne peut faire qu'une seule chose à la fois. Par exemple, lors de la refonte d'un projet, elle devra d'abord analyser le module d'authentification, puis le module de base de données, et enfin le module API. Ces étapes doivent être effectuées séquentiellement, même si elles ne dépendent pas les unes des autres.

- **Problème d'encombrement du contexte** : toutes les informations résident dans une seule fenêtre de conversation. À mesure que la conversation s'allonge, les détails importants des débuts peuvent être enfouis, et l'IA peut oublier les décisions clés discutées précédemment.

- **Limitation de perspective unique** : une seule IA réfléchit, il n'y a donc pas de discussion ni de validation multi-angles. Lorsque des décisions de conception complexes se présentent, il n'y a pas de « coéquipier » pour débattre ou apporter un point de vue différent.

- **Plafond d'efficacité** : les refontes majeures ou le développement multi-modules prennent beaucoup de temps, et il n'y a aucun moyen de les accélérer par le parallélisme.

**La solution Agent Teams** :

Agent Teams résout ces problèmes grâce à la **collaboration parallèle entre plusieurs instances** :

- **Véritable travail parallèle** : plusieurs IA peuvent travailler simultanément sur différentes tâches. L'une peut gérer l'interface utilisateur frontend, une autre l'API backend, et une autre la conception de base de données, sans se gêner mutuellement.

- **Espaces de contexte indépendants** : chaque membre de l'équipe dispose de sa propre fenêtre de contexte complète de 200 000 tokens, donc les informations importantes ne sont pas « oubliées » parce que la conversation devient trop longue.

- **Capacité de collaboration d'équipe** : les membres peuvent communiquer directement, discuter des décisions de conception et valider mutuellement la qualité du code, comme une véritable équipe de développement.

- **Augmentation significative de l'efficacité** : selon les tests internes d'Anthropic, l'efficacité lors des refontes de projets à grande échelle peut s'améliorer d'environ 50 %.

---

## Agent Teams vs Subagent

Avant d'approfondir l'architecture d'Agent Teams, nous devons d'abord clarifier une confusion courante : **quelle est la différence entre Agent Teams et Subagent** ?

Les deux fonctionnalités impliquent « plusieurs IA collaborant », mais leurs modèles de collaboration sont totalement différents et adaptés à des scénarios distincts.

### Différences fondamentales en un coup d'œil

| Dimension | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **Topologie** | Topologie en étoile : tous les sous-agents rapportent à l'agent principal | Topologie en maillage : les membres peuvent communiquer entre eux |
| **Style de communication** | L'agent principal transmet les informations via des prompts, les sous-agents retournent les résultats une fois terminés | Les membres peuvent communiquer, discuter et se coordonner directement |
| **Gestion du contexte** | Chaque sous-agent a un contexte indépendant, l'agent principal ne transmet que les informations nécessaires | Chaque membre a un contexte entièrement indépendant |
| **Parallélisme** | Peut s'exécuter en parallèle, mais la chaîne de collaboration reste centrée sur l'agent principal | Véritable développement et collaboration parallèles |
| **Coordination des tâches** | L'agent principal répartit et coordonne tout de manière centralisée | Les membres peuvent s'approprier les tâches de manière plus autonome |
| **Coût** | Non négligeable. L'utilisation de tokens s'accumule lorsque plusieurs sous-agents s'exécutent en parallèle | Plus élevé. Les membres s'exécutent indépendamment et communiquent plus fréquemment |

### Une analogie intuitive

**Subagent, c'est comme** : un manager qui rédige des fiches de tâches distinctes pour plusieurs assistants. Chaque assistant travaille indépendamment selon sa propre fiche de tâche, et une fois terminé, ne retourne le résultat qu'au manager. Les assistants ne communiquent pas directement entre eux, et le manager ne voit pas le processus de réflexion complet des assistants pendant leur travail.

```
Vous → Agent principal → Sous-agent A : « Analyse ce fichier »
Vous → Agent principal → Sous-agent B : « Recherche cette fonction »
         ↓
    Sous-agent A termine → rapporte le résultat à l'Agent principal
    Sous-agent B termine → rapporte le résultat à l'Agent principal
         ↓
    L'Agent principal synthétise les résultats → vous fait le rapport
```

**Agent Teams, c'est comme** : un chef de projet qui dirige une véritable équipe de développement. Les membres de l'équipe peuvent communiquer, discuter et collaborer directement, plutôt que de faire passer chaque détail par le chef de projet.

```
Vous → Chef d'équipe : « Construis une fonctionnalité d'authentification utilisateur »
         ↓
    Le chef d'équipe crée l'équipe et répartit les tâches
         ↓
    Coéquipier A : « @Coéquipier B, la conception de l'interface API est-elle prête ? »
    Coéquipier B : « Oui, voici le format... »
    Coéquipier C : « J'ai examiné l'interface et j'ai trouvé quelque chose dont nous devrions discuter... »
         ↓
    Les membres de l'équipe collaborent pour terminer le travail → Le chef d'équipe synthétise le résultat → vous fait le rapport
```

### Quand utiliser lequel

**Utilisez Subagent quand** :

- Vous avez une tâche rapide, claire et unique, comme « recherche ce code d'erreur »
- Les tâches ne dépendent pas beaucoup les unes des autres
- Vous voulez une exécution parallèle, mais n'avez pas besoin de discussions soutenues entre les membres

**Utilisez Agent Teams quand** :

- Vous effectuez une refonte de système complexe qui s'étend sur plusieurs modules
- Vous avez besoin d'une analyse et d'une discussion multi-angles, comme un expert en sécurité et un expert en performance débattant d'une solution
- Vous avez besoin d'un véritable développement parallèle, avec le frontend, le backend et les tests se déroulant simultanément
- Les tâches nécessitent une coordination et un partage d'informations fréquents

### Un résumé simple

- **Subagent** : un outil de répartition des tâches qui décompose une grande tâche en sous-tâches et les distribue à différents « travailleurs »
- **Agent Teams** : une véritable équipe collaborative où les membres peuvent communiquer, discuter et travailler ensemble comme une vraie équipe

---

## Architecture fondamentale

Agent Teams n'est pas simplement une fonctionnalité « ouvrir plusieurs instances ». C'est un véritable **système de collaboration multi-agents**. Pour le comprendre, nous devons comprendre ses composants fondamentaux et la façon dont ils travaillent ensemble.

### Composition de l'équipe

Une équipe d'agents comprend quatre composants fondamentaux, chacun ayant sa propre responsabilité, travaillant ensemble pour accomplir des tâches complexes.

**Chef d'équipe**

Le chef d'équipe est le « cerveau » et le « coordinateur » de toute l'équipe. Il n'exécute pas directement les tâches de codage. Au lieu de cela, il est responsable de :

- **Analyse des besoins et décomposition des tâches** : décomposer les exigences complexes de l'utilisateur en plusieurs sous-tâches pouvant s'exécuter en parallèle
- **Création et gestion de l'équipe** : décider combien de membres sont nécessaires et ce que chaque membre doit faire
- **Répartition et planification des tâches** : attribuer les tâches aux bons membres et gérer les dépendances entre tâches
- **Synthèse des résultats et contrôle qualité** : collecter le travail de chaque membre, l'intégrer et effectuer la revue finale

**Coéquipiers**

Les coéquipiers sont les véritables « développeurs » qui effectuent le travail. Chaque coéquipier est une instance Claude indépendante :

- **Fenêtre de contexte indépendante** : chaque membre dispose d'une fenêtre de contexte complète de 200 000 tokens, totalement isolée du chef d'équipe et des autres membres
- **Permissions complètes sur les outils** : ils peuvent utiliser tous les outils comme Read, Write, Edit et Bash
- **Prise en charge autonome des tâches** : ils peuvent sélectionner et réclamer indépendamment des tâches sur le tableau de tâches partagé
- **Capacité de communication directe** : ils peuvent communiquer directement avec les autres membres plutôt que de toujours passer par le chef d'équipe

**Liste de tâches**

La liste de tâches est l'« outil de gestion de projet » de l'équipe, similaire à Jira ou Trello :

- **Gestion du statut des tâches** : chaque tâche a un statut clair : `pending`, `in_progress`, ou `completed`
- **Gestion des dépendances** : les tâches peuvent définir des dépendances, et les tâches dépendantes ne peuvent démarrer qu'après l'achèvement des tâches prérequises
- **Mécanisme de déverrouillage automatique** : lorsqu'une tâche est terminée, le système vérifie automatiquement et déverrouille les tâches qui l'attendaient
- **Mécanisme de verrouillage de fichiers** : lorsqu'un membre réclame et commence une tâche, un fichier de verrouillage est créé dans le répertoire de la tâche pour empêcher plusieurs membres de modifier le même fichier simultanément

**Système de messagerie**

Le système de messagerie est l'« outil de chat » entre les membres de l'équipe :

- **Communication point à point** : le membre A peut envoyer un message directement au membre B
- **Annonces diffusées** : un message peut être envoyé à tous les membres en une seule fois
- **Basé sur le système de fichiers** : les messages sont stockés sous forme de fichiers JSON dans `~/.claude/teams/{team-name}/inboxes/`
- **Aucun réseau requis** : tout fonctionne entièrement via le système de fichiers local, sans connexion réseau ni écoute de port nécessaire

### Flux de collaboration

Un flux de travail typique d'Agent Teams ressemble à ceci :

```
L'utilisateur soumet une exigence complexe
       ↓
Le chef d'équipe analyse l'exigence et la décompose en tâches
       ↓
Crée les membres de l'équipe et initialise la liste de tâches
       ↓
       ├─→ Coéquipier A réclame la Tâche 1 ─┐
       ├─→ Coéquipier B réclame la Tâche 2 ─┼→ Exécution en parallèle
       ├─→ Coéquipier C réclame la Tâche 3 ─┤
       │                                      ↓
       └────────────────────────────────────── Les membres se coordonnent via le système de messagerie
                                              ↓
                                   Une fois toutes les tâches terminées, le chef d'équipe synthétise le résultat
                                              ↓
                                   Le résultat final est livré à l'utilisateur
```

### Organisation du système de fichiers

Agent Teams crée des répertoires dédiés sur votre système de fichiers local pour gérer l'état de l'équipe :

```
~/.claude/
├── teams/
│   └── {nom-de-lequipe}/
│       ├── config.json          # Configuration de l'équipe (liste des membres, sélection du modèle, etc.)
│       └── inboxes/
│           ├── team-lead.json   # Boîte de réception du chef d'équipe
│           ├── teammate-1.json  # Boîte de réception du membre 1
│           └── teammate-2.json  # Boîte de réception du membre 2
└── tasks/
    └── {nom-de-lequipe}/
        ├── task-1.json          # Informations détaillées de la Tâche 1
        ├── task-2.json          # Informations détaillées de la Tâche 2
        └── current_tasks/
            └── parse_if_statement.txt  # Fichier de verrouillage créé pendant l'exécution d'une tâche
```

L'avantage de cette conception est une **transparence totale** : vous pouvez inspecter à tout moment l'état de l'équipe, la progression des tâches et l'historique des communications entre les membres.

---

## Démarrage rapide

### Activer la fonctionnalité expérimentale

Agent Teams est actuellement une **fonctionnalité expérimentale** et est désactivé par défaut. Pour l'utiliser, vous devez d'abord l'activer.

**La méthode la plus simple : laissez Claude Code l'activer pour vous**

Tapez ceci directement dans Claude Code :

```
Help me enable Agent Teams in settings.json
```

Ou :

```
Enable the experimental feature agentTeams
```

Claude Code modifiera automatiquement `~/.claude/settings.json` et ajoutera la configuration suivante :

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Redémarrez Claude Code**

Après l'ajout de la configuration, **quittez et redémarrez complètement Claude Code**, et la fonctionnalité prendra effet.

**Configuration manuelle (si la méthode automatique ne fonctionne pas)** :

Vous pouvez modifier manuellement `~/.claude/settings.json` et ajouter ou modifier :

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Comment vérifier que c'est activé**

Après avoir redémarré Claude Code, essayez une conversation comme celle-ci :

```
Vous : Peux-tu m'aider à créer une équipe d'agents ?
Claude : Oui ! Je peux t'aider à créer une équipe d'agents pour collaborer sur une tâche...
```

Si Claude comprend et répond à la demande de création d'équipe, la fonctionnalité a été activée avec succès.

### Configuration du mode visuel (optionnel)

Si vous souhaitez voir le travail des membres de l'équipe en temps réel, vous pouvez configurer le **mode d'affichage en panneaux divisés**.

**Laissez Claude Code le configurer pour vous** :

Tapez ceci directement dans Claude Code :

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

Ou :

```
Configure agent-teams to use split-panes mode
```

**Installez tmux (si vous ne l'avez pas)** :

Si `tmux` n'est pas encore installé, vous pouvez demander à Claude Code de l'installer :

```
Help me install tmux
```

Claude Code exécutera automatiquement la commande d'installation appropriée en fonction de votre système d'exploitation, qu'il s'agisse de macOS ou de Linux.

**À quoi ressemble le résultat configuré** :

Après la configuration, les membres de l'équipe travailleront dans différents panneaux tmux, et vous pourrez voir toute leur sortie simultanément, comme un « mur de surveillance ».

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Coéquipier 1   │  Coéquipier 2   │  Coéquipier 3   │
│  Analyse du code│  Construction   │  Écriture des   │
│  ...            │  de l'API...    │  tests...       │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Configuration manuelle (si la méthode automatique ne fonctionne pas)** :

Vous pouvez modifier manuellement `~/.claude/settings.json` :

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

### Exemple pratique : construire un jeu RPG de style Pokemon avec Agent Teams

Découvrons la puissance d'Agent Teams à travers un projet complet. Cet exemple montrera comment plusieurs membres d'une équipe IA peuvent collaborer pour construire un jeu RPG à partir de zéro, incluant un système de combat, des fonctionnalités de dialogue et des éléments d'exploration.

**Exigences du projet** :

Construisez un RPG web de style Pokemon avec les fonctionnalités suivantes :

- **Système de personnages** : le joueur peut créer un personnage avec un niveau, des PV, une attaque, une défense et d'autres statistiques
- **Système de combat** : combat au tour par tour avec des options d'attaque, de compétences, d'objets et de fuite
- **Système de monstres** : plusieurs monstres sauvages avec différents attributs et compétences
- **Système de dialogue** : conversations avec les PNJ et quêtes secondaires
- **Exploration de carte** : une carte 2D simple où le joueur peut se déplacer entre les scènes
- **Système de sauvegarde** : sauvegarder la progression du jeu, y compris le niveau, la position, les quêtes terminées, etc.
- **Effets sonores et animation** : effets visuels et sonores pour les attaques, les dégâts et les montées de niveau

**Tapez ceci dans Claude Code** :

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

**Comment Claude l'exécutera** :

**Phase 1 : conception de l'architecture**

Le chef d'équipe demandera d'abord au coéquipier A, l'architecte du jeu, de concevoir la structure globale :

```
Le coéquipier A conçoit l'architecture du jeu...

Stack technique : React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Initialisation du projet :
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Structure des fichiers :
src/
├── App.tsx                 # Composant principal de l'application
├── main.tsx                # Fichier d'entrée
├── types/
│   ├── player.ts           # Définitions du type joueur
│   ├── monster.ts          # Définitions du type monstre
│   ├── skill.ts            # Définitions du type compétence
│   └── game.ts             # Types d'état du jeu
├── stores/
│   └── gameStore.ts        # Gestion d'état Zustand
├── components/
│   ├── map/                # Composants liés à la carte
│   │   ├── MapCanvas.tsx   # Canvas de la carte
│   │   ├── PlayerSprite.tsx # Sprite du joueur
│   │   └── NPCSprite.tsx   # Sprite du PNJ
│   ├── battle/             # Composants liés au combat
│   │   ├── BattleScreen.tsx    # Écran de combat
│   │   ├── BattleMenu.tsx      # Menu de combat
│   │   ├── HPBar.tsx           # Composant de barre de PV
│   │   └── BattleLog.tsx       # Journal de combat
│   ├── dialog/             # Composants liés au dialogue
│   │   ├── DialogBox.tsx   # Boîte de dialogue
│   │   └── Choices.tsx     # Composant de choix
│   └── ui/                 # Composants d'interface partagés
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # Logique du système de combat
│   ├── DialogSystem.ts     # Logique du système de dialogue
│   ├── QuestSystem.ts      # Logique du système de quêtes
│   └── MapSystem.ts        # Logique du système de carte
├── hooks/
│   ├── useBattle.ts        # Hook de combat
│   ├── useDialog.ts        # Hook de dialogue
│   └── useAudio.ts         # Hook audio
├── data/
│   ├── monsters.ts         # Données des monstres
│   ├── skills.ts           # Données des compétences
│   ├── dialogues.ts        # Scripts de dialogue
│   └── maps.ts             # Données de la carte
└── utils/
    ├── audio.ts            # Utilitaires audio
    └── storage.ts          # Utilitaires de sauvegarde

Conception de la structure de données principale :

// types/player.ts - Type joueur
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

// types/skill.ts - Type compétence
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// État du jeu
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

Conception du système de combat :
- Tour par tour, le joueur agit en premier
- À chaque tour, le joueur peut choisir : attaquer, utiliser une compétence, un objet ou fuir
- Les compétences ont des limites de PP et doivent être restaurées lorsqu'elles sont épuisées
- Formule de dégâts : (attaque de l'attaquant / défense du défenseur) × puissance de la compétence × facteur aléatoire (0,85~1,0)

Conception du système de dialogue :
- Effet machine à écrire pour l'affichage du texte
- Prend en charge les options de branchement
- Prend en charge les déclencheurs conditionnels, comme après l'achèvement d'une quête
- Les PNJ ont une orientation, et les conversations se déclenchent automatiquement lorsque le joueur s'approche
```

**Phase 2 : développement parallèle**

Une fois l'architecture confirmée, le chef d'équipe crée la liste des tâches et les autres membres commencent à travailler en parallèle :

```
Liste des tâches :
├── [Coéquipier B] Implémenter la logique principale du système de combat (en cours...)
├── [Coéquipier C] Implémenter les systèmes de dialogue et de quêtes (en cours...)
├── [Coéquipier D] Implémenter le rendu de la carte 2D (en cours...)
└── [Coéquipier E] Concevoir l'interface et l'audio (en cours...)
```

<details>
<summary>📁 Coéquipier B : code principal du système de combat</summary>

```javascript
// battle.js - Système de combat
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Attaque du joueur
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} a utilisé ${skill.name} !`);
    this.log.push(`Cela a infligé ${damage} points de dégâts !`);

    // Effet de la compétence
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Vérifier si le combat est terminé
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} est tombé !`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Attaque du monstre
  monsterAttack() {
    if (this.state !== 'active') return;

    // Choisir une compétence au hasard
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} a utilisé ${skill.name} !`);
    this.log.push(`Cela a infligé ${damage} points de dégâts !`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} est tombé...`);
    } else {
      this.turn = 'player';
    }
  }

  // Calcul des dégâts
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Bonus d'avantage de type (simplifié)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Appliquer l'effet de la compétence
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} a été brûlé !`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} a récupéré ${healAmount} PV !`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`L'attaque de ${user.name} a augmenté !`);
        break;
    }
  }

  // Gain d'expérience
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} a gagné ${expGain} points d'EXP !`);

    // Vérification de montée de niveau
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Montée de niveau
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Croissance des statistiques
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} est passé au niveau ${this.player.level} !`);
    this.log.push(`PV +${hpGain}, ATQ +${atkGain}, DEF +${defGain}`);
  }

  // Fuite
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('Vous vous êtes enfui avec succès !');
      return true;
    } else {
      this.log.push('Impossible de fuir !');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Données des monstres
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
    name: 'Gobelin',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'Griffe', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Jeune Dragon',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Griffe', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Flammèche', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Grognement', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 Coéquipier C : code du système de dialogue et de quêtes</summary>

```javascript
// dialog.js - Système de dialogue
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Afficher un dialogue
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Afficher le prochain élément de dialogue
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Gérer les types de dialogue spéciaux
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Rendu de la boîte de dialogue
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

    // Effet machine à écrire
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

    // Afficher les choix, le cas échéant
    this.renderChoices();
  }

  // Rendu des choix
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

  // Suivant
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // doit choisir quand des options existent
    this.showNext();
  }
}

// Système de quêtes
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Accepter une quête
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Mettre à jour la progression de la quête
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

  // Vérifier l'achèvement de la quête
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Terminer la quête
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Distribuer les récompenses
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Distribuer les récompenses
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Exemples de scripts de dialogue
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Chef du village', text: 'Oh, aventurier... tu es enfin arrivé.'},
      {speaker: 'Chef du village', text: 'Dernièrement, de nombreux monstres sauvages sont apparus près de notre village, et tout le monde est effrayé.'},
      {speaker: 'Chef du village', text: 'Si tu peux aider à les chasser, je t'en serais profondément reconnaissant !'},
      {
        choices: [
          {text: "D'accord, j'accepte cette quête", dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Chef du village', text: 'Merveilleux ! Veuillez vaincre 3 slimes au nord.'},
              {speaker: 'Système', text: 'Quête [Chasser les Slimes] acceptée !'}
            ];
          }},
          {text: 'Je suis un peu occupé en ce moment', dialog: [
            {speaker: 'Chef du village', text: "Très bien. Reviens quand tu seras prêt."}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Chef du village', text: "Tu as vraiment réussi ! Merci infiniment !"},
      {speaker: 'Système', text: "Quête [Chasser les Slimes] terminée ! Tu as gagné 100 EXP !"},
      {speaker: 'Chef du village', text: "Prends ceci. C'est un petit témoignage de ma gratitude."}
    ]
  },

  shopkeeper: [
    {speaker: 'Marchand', text: 'Bienvenue ! Vous cherchez quelque chose ?'},
    {
      choices: [
        {text: 'Parcourir les marchandises', dialog: () => {
          game.openShop();
          return [{speaker: 'Marchand', text: 'Prenez ce qui vous plaît !'}];
        }},
        {text: 'Partir', dialog: [{speaker: 'Marchand', text: 'Revenez la prochaine fois !'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 Coéquipier D : code du système de rendu de carte 2D</summary>

```javascript
// map.js - Système de rendu de carte
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

  // Charger la carte
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Rendu de la carte
  render() {
    if (!this.currentMap) return;

    // Effacer le canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Sauvegarder le contexte
    this.ctx.save();

    // Appliquer le décalage de la caméra
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Rendu des couches de la carte
    this.renderLayers();

    // Rendu des PNJ
    this.renderNPCs();

    // Rendu du joueur
    this.renderPlayer();

    // Restaurer le contexte
    this.ctx.restore();
  }

  // Rendu des couches de la carte
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

  // Rendu d'une tuile unique
  renderTile(x, y, tileId) {
    // Dessiner différentes tuiles selon l'ID de tuile
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Texture d'herbe
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
        // Effet de ondulation
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
        // Toit
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Obtenir le type de tuile
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // Rendu des PNJ
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // Dessiner le PNJ
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

      // Dessiner le nom
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Rendu du joueur
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Corps du joueur
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

    // Indicateur de direction du joueur
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

  // Mettre à jour la position de la caméra
  updateCamera() {
    if (!this.player) return;

    // La caméra suit le joueur et le garde centré
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Mouvement fluide
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Empêcher la caméra de dépasser les limites de la carte
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Vérifier les collisions
  checkCollision(x, y) {
    // Vérifier les limites de la carte
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Vérifier la collision des tuiles
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // les murs et les maisons sont des obstacles

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // Vérifier la collision avec les PNJ
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // Déclencher le dialogue du PNJ
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // Déclencher le dialogue du PNJ
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Exemple de données de carte
const VILLAGE_MAP = {
  name: 'Village de départ',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Données de carte (simplifiées)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... plus de données de carte
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Chef du village',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Marchand',
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
<summary>📁 Coéquipier E : code de l'interface de combat</summary>

```html
<!-- Écran de combat HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- Zone ennemie -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Slime</div>
      <div class="level">Niv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- Zone du joueur -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Héros</div>
      <div class="level">Niv. <span id="playerLevel">5</span></div>
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

  <!-- Menu de combat -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Attaquer</button>
      <button class="menu-btn" data-action="skills">Compétences</button>
      <button class="menu-btn" data-action="items">Objets</button>
      <button class="menu-btn" data-action="flee">Fuir</button>
    </div>
  </div>

  <!-- Sous-menu des compétences -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Choisir une compétence</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Retour</button>
  </div>

  <!-- Journal de combat -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Styles de l'écran de combat */
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

/* Animation de coup */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Animation d'attaque */
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
<summary>📁 Code du système audio</summary>

```javascript
// audio.js - Système audio
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Initialiser le contexte audio
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Jouer la musique de fond
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Utiliser des oscillateurs pour générer une musique de fond simple
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Générer une musique de fond simple
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

  // Arrêter la musique de fond
  stopBgm() {
    this.currentBgm = null;
  }

  // Jouer un effet sonore
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

  // Effet sonore d'attaque
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

  // Effet sonore de coup
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

  // Effet sonore de victoire
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

  // Effet sonore de montée de niveau
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

  // Effet sonore de dialogue
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

**Dialogue de collaboration entre les membres** :

```
Coéquipier B → Coéquipier C :
"Le système de combat est prêt. Quand le joueur gagne, il appelle giveExp() pour monter de niveau.
Veuillez vérifier le système de quêtes et vous assurer que les données de montée de niveau sont sauvegardées correctement."

Coéquipier C → Coéquipier B :
"Compris. Le système de quêtes stocke les données du jeu avec localStorage,
y compris le niveau, l'expérience et la liste des quêtes terminées. J'ajouterai un mécanisme de sauvegarde automatique."

Coéquipier D → Tous :
"Le système de rendu de carte est terminé, et les données d'orientation des PNJ sont maintenant connectées au système de dialogue.
Quand le joueur fait face à un PNJ, le dialogue se déclenchera automatiquement. Veuillez confirmer la logique de déclenchement dans le système de dialogue."

Coéquipier C → Coéquipier D :
"Confirmé. DialogSystem a une méthode showDialog() qui peut accepter un tableau de dialogues.
Je m'assurerai que toutes les données de dialogue des PNJ suivent ce format."

Coéquipier E → Coéquipier B :
"L'interface de combat est terminée, mais j'ai besoin des données en temps réel du joueur et du monstre pour mettre à jour les barres de PV.
Le système de combat fournit-il un callback ?"

Coéquipier B → Coéquipier E :
"Oui. BattleSystem a un callback onUpdate qui se déclenche à la fin de chaque tour.
Vous pouvez enregistrer ce callback pour mettre à jour l'interface."

Coéquipier E → Coéquipier D :
"Lors du changement de carte, nous devons repositionner la caméra.
MapRenderer fournit-il une méthode updateCamera() ?"

Coéquipier D → Coéquipier E :
"Oui. updateCamera() est appelée automatiquement après chaque loadMap().
Vous pouvez aussi l'appeler manuellement après le déplacement du joueur pour mettre à jour la caméra en douceur."
```

**Phase 3 : intégration et tests**

Une fois tous les composants terminés, le chef d'équipe est responsable de l'intégration :

<details>
<summary>📁 Code du contrôleur principal du jeu</summary>

```javascript
// game.js - Contrôleur principal du jeu
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Initialiser chaque système
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Charger la carte
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Gestion des entrées
    this.setupInput();

    // Démarrer la boucle de jeu
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Chargement automatique de la sauvegarde
    this.loadGame();
  }

  // Créer le joueur
  createPlayer() {
    return {
      name: 'Héros',
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

  // Configurer la gestion des entrées
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

  // Gestion des entrées sur la carte
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

      // Vérifier les combats aléatoires
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Sauvegarder le jeu
      this.saveGame();
    }
  }

  // Gestion des entrées de dialogue
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Gestion des entrées de combat
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Démarrer un combat
  startBattle(monsterData) {
    // Choisir un monstre au hasard
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Créer une instance de monstre
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

    // Jouer la musique de combat
    this.audioManager.playBgm('battle');

    // Afficher l'écran de combat
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Mettre à jour l'interface de combat
    this.updateBattleUI();
  }

  // Mettre à jour l'interface de combat
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

    // Mettre à jour le journal de combat
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // Terminer le combat
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Masquer l'écran de combat
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Jouer la musique de la carte
    this.audioManager.playBgm('village');

    // Sauvegarder le jeu
    this.saveGame();
  }

  // Sauvegarder le jeu
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Charger le jeu
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Boucle de jeu principale
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Effacer le canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Rendu selon l'état
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Démarrer le jeu
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**Résultat final** :

Après environ 1 à 2 heures, un RPG de style Pokemon entièrement fonctionnel est terminé !

```
Résumé du projet :
✅ Conception de l'architecture du jeu - Coéquipier A
✅ Système de combat au tour par tour - Coéquipier B
✅ Système de dialogue et de quêtes - Coéquipier C
✅ Rendu de la carte 2D - Coéquipier D
✅ Interface et effets sonores - Coéquipier E

Fichiers du projet :
├── index.html (120 lignes)
├── css/
│   ├── main.css (100 lignes)
│   ├── battle.css (180 lignes)
│   └── dialog.css (80 lignes)
├── js/
│   ├── game.js (250 lignes)
│   ├── state.js (60 lignes)
│   ├── player.js (50 lignes)
│   ├── monster.js (80 lignes)
│   ├── battle.js (220 lignes)
│   ├── dialog.js (180 lignes)
│   ├── map.js (280 lignes)
│   └── audio.js (150 lignes)
└── data/
    ├── monsters.js (100 lignes)
    ├── skills.js (80 lignes)
    └── dialogues.js (120 lignes)

Total : environ 2050 lignes de code, réalisées en collaboration par 5 membres de l'équipe IA !

Fonctionnalités du jeu :
🎮 Système de combat au tour par tour (attaque, compétences, objets, fuite)
💬 Système de dialogue avec les PNJ (effet machine à écrire, choix de branchement)
📜 Système de quêtes (accepter des quêtes, mise à jour de la progression, récompenses d'achèvement)
🗺️ Exploration de carte 2D (transitions multi-scènes, interaction avec les PNJ)
💾 Sauvegarde automatique (progression stockée avec localStorage)
🔊 Effets sonores et musique de fond (Web Audio API)
📊 Croissance du personnage (expérience, montée de niveau, augmentation des statistiques)
```

**Observer l'équipe au travail** :

Si vous avez configuré le mode de panneaux divisés tmux, vous verrez plusieurs fenêtres de terminal travaillant simultanément :

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Coéquipier B   │  Coéquipier C   │  Coéquipier D   │
│  Implémentation │  Écriture des   │  Rendu des      │
│  de la formule  │  scripts de     │  tuiles         │
│  de dégâts      │  dialogue       │                 │
│                 │                 │                 │
│  "Coéquipier E, │  "MapRenderer   │  "Les monstres  │
│   la largeur de │   est-il prêt   │   ont besoin    │
│   la barre de   │   encore ?"     │   d'animations  │
│   PV est-elle   │                 │   d'attaque..." │
│   en % ?"       │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Points clés à retenir** :

Cet exemple pratique montre plusieurs avantages fondamentaux d'Agent Teams :

1. **Véritable développement parallèle** : 5 membres développent différents systèmes de jeu simultanément
2. **Gestion de projet complexe** : plus de 2000 lignes de code sont réparties et intégrées de manière structurée
3. **Division spécialisée du travail** : combat, dialogue, carte et interface ont chacun un responsable dédié
4. **Coordination des interfaces** : les membres négocient les interfaces et les formats de données via le système de messagerie
5. **Livraison rapide** : un travail qui pourrait prendre des semaines à une seule personne peut être accompli par l'équipe en quelques heures

Vous pouvez essayer d'exécuter ce jeu vous-même et découvrir comment une équipe IA collabore pour construire un RPG de style Pokemon.

---

### Prompt unique vs Agent Teams : testez vous-même

Pour vous aider à ressentir plus directement la puissance d'Agent Teams, nous avons préparé deux plans de test que vous pouvez essayer et comparer vous-même.

#### Plan de test A : approche par prompt unique

C'est l'approche traditionnelle : utiliser un prompt complet et demander à l'IA de développer le jeu.

**Tapez ceci dans Claude Code** :

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

**Résultat attendu** :

| Élément | Situation attendue |
|---------|-------------------|
| **Qualité du code** | L'IA tentera de générer tout le code, mais en raison des limites de contexte, de nombreux détails seront omis ou remplacés par des commentaires |
| **Complétude des fonctionnalités** | Les fonctionnalités principales peuvent être présentes, mais de nombreuses fonctionnalités avancées seront manquantes ou simplifiées |
| **Capacité d'exécution** | Il peut y avoir des bugs, et vous devrez peut-être plusieurs tours de débogage avant que cela fonctionne |
| **Temps de développement** | Une conversation peut durer de 30 à 60 minutes, avec plusieurs allers-retours |
| **Volume de code** | Environ 500 à 800 lignes, car l'IA a tendance à compresser le code |

**Problèmes que vous pourriez rencontrer** :

1. **Code tronqué** : les réponses de l'IA ont des limites de longueur, la génération peut donc s'arrêter à mi-chemin
2. **Fonctionnalités incomplètes** : le système de dialogue peut n'être qu'une version basique sans système de quêtes
3. **Détails manquants** : le système audio peut être laissé sous forme de commentaire TODO
4. **Difficile à déboguer** : si le code pose problème, vous devez demander à l'IA de le corriger dans la même conversation, et le contexte devient de plus en plus encombré

#### Plan de test B : approche Agent Teams

C'est l'approche présentée dans cet article : laisser plusieurs membres de l'équipe IA collaborer au développement.

**Tapez ceci dans Claude Code** (après avoir activé Agent Teams) :

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

**Résultat attendu** :

| Élément | Situation attendue |
|---------|-------------------|
| **Qualité du code** | Chaque membre se concentre sur son propre domaine, le code est donc plus professionnel et complet |
| **Complétude des fonctionnalités** | Toutes les fonctionnalités sont implémentées plus complètement, y compris le système de quêtes et les cartes multi-scènes |
| **Capacité d'exécution** | Les membres vérifient mutuellement les interfaces, il y a donc moins de problèmes d'intégration |
| **Temps de développement** | Environ 1 à 2 heures pour terminer toutes les fonctionnalités car le développement se fait en parallèle |
| **Volume de code** | Environ 2000+ lignes, avec une implémentation complète plutôt que du code compressé |

#### Tableau de comparaison quantitative

| Dimension | Prompt unique | Agent Teams |
|---------|-------------|-------------|
| **Nombre total de lignes de code** | 500-800 lignes | 2000+ lignes |
| **Temps de développement** | 30-60 minutes, mais fonctionnalités incomplètes | 1-2 heures, avec des fonctionnalités complètes |
| **Complétude des fonctionnalités** | 60-70 % | 95 %+ |
| **Maintenabilité** | Moyenne, généralement un seul gros fichier | Élevée, avec une conception modulaire |
| **Nombre de bugs** | Plus élevé, car il y a moins de validation | Plus faible, car les membres se vérifient mutuellement |
| **Extensibilité future** | Difficile, car le code est fortement couplé | Plus facile, car la structure est modulaire |
| **Utilisation de tokens** | ~50K tokens | ~200K tokens (5 membres) |
| **Coût** | ~0,50 $ | ~2,00 $ |

#### Processus de test pratique suggéré

**Étape 1 : testez d'abord l'approche par prompt unique**

```
1. Ouvrez une nouvelle conversation Claude Code
2. Utilisez le prompt du « Plan de test A » ci-dessus
3. Notez : combien de temps cela a-t-il pris ? Combien de lignes de code ont été produites ? Quelles fonctionnalités manquaient ?
```

**Étape 2 : puis testez l'approche Agent Teams**

```
1. Confirmez qu'Agent Teams a été activé
2. Utilisez le prompt du « Plan de test B » ci-dessus
3. Observez : comment les membres de l'équipe collaborent-ils ? Le code est-il plus complet ?
```

**Étape 3 : comparez les deux résultats**

```
1. Exécutez les deux versions du code séparément
2. Comparez les listes de fonctionnalités : quelles fonctionnalités manquent dans la version à prompt unique ?
3. Comparez la structure du code : la version Agent Teams est-elle plus modulaire ?
4. Évaluez : si vous deviez continuer à développer ce jeu, quelle version serait plus facile à étendre ?
```

#### Pourquoi ces différences se produisent-elles ?

**Limites de l'approche par prompt unique** :

1. **Pression de contexte** : l'IA doit tout gérer dans une seule réponse, la simplification est donc inévitable
2. **Attention dispersée** : combat, dialogue, carte et interface se disputent l'attention, les détails sont donc faciles à manquer
3. **Pas de validation collaborative** : personne ne vérifie si les interfaces correspondent, les bugs sont donc plus probables

**Avantages d'Agent Teams** :

1. **Division spécialisée du travail** : chaque membre se concentre sur un domaine et peut approfondir les détails
2. **Traitement parallèle** : combat, dialogue et développement de carte se font simultanément, améliorant l'efficacité
3. **Validation mutuelle** : les membres négocient les interfaces entre eux, réduisant les problèmes d'intégration
4. **Contexte indépendant** : chaque membre a son propre contexte de 200K tokens et n'interfère pas avec les autres

#### Conclusion

La valeur fondamentale d'Agent Teams n'est pas simplement d'être « plus rapide », mais d'être **« plus complète et plus professionnelle »**.

- Pour des projets simples comme un jeu Snake, un prompt unique suffit
- Pour des projets complexes comme un RPG Pokemon, Agent Teams peut produire de meilleurs résultats

La clé est de **choisir le bon outil** : n'utilisez pas Agent Teams pour renommer une variable, et n'utilisez pas un prompt unique pour construire un jeu RPG complet.

---

## Bonnes pratiques

Agent Teams est un outil puissant, mais pour bien l'utiliser, vous devez comprendre certaines bonnes pratiques. Ces leçons proviennent de l'expérience pratique de la communauté et peuvent vous aider à éviter les pièges courants tout en tirant le meilleur parti de la collaboration d'équipe.

### Pratique 1 : contrat d'abord

Avant que plusieurs agents ne commencent à travailler en parallèle, prenez le temps de définir un « contrat » clair, c'est-à-dire l'accord d'interface.

**Pourquoi c'est important** :

Supposons que le coéquipier A soit responsable de l'API backend et le coéquipier B de l'intégration frontend. S'ils commencent en même temps sans se mettre d'accord sur le format d'interface au préalable, quelque chose comme ceci peut se produire :

```
Coéquipier A : a implémenté POST /api/login et s'attend à {username, password}
Coéquipier B : a implémenté l'appel frontend et envoie {user, pass}
Résultat : ils ne correspondent pas, et une refonte est nécessaire
```

**Comment faire** :

Avant de démarrer l'équipe, demandez d'abord à Claude de concevoir les interfaces :

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**Un contrat devrait inclure** :

- Signatures de fonctions et structures de données
- Formats JSON d'entrée et de sortie
- Significations des codes d'état HTTP
- Conventions de gestion des erreurs
- Règles de validation des champs

### Pratique 2 : attribuer les modèles judicieusement

Différentes tâches nécessitent différents modèles. Une bonne attribution des modèles aide à équilibrer qualité et coût.

**Utilisez Opus pour le chef d'équipe** :

Le chef d'équipe gère la décomposition des tâches et la synthèse des résultats, ce qui nécessite une capacité de raisonnement plus forte, Opus est donc recommandé :

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Utilisez Sonnet pour les coéquipiers** :

Pour le travail concret de codage et de test, Sonnet est tout à fait capable et nettement moins cher :

- Opus 4.6 : environ 15 $ par million de tokens de sortie
- Sonnet 4.5 : environ 3 $ par million de tokens de sortie

Utiliser Sonnet pour les membres peut réduire considérablement le coût global.

**Utilisez Haiku pour les cas spéciaux** :

Pour des tâches simples comme les mises à jour de documentation ou l'écriture de petits tests, vous pouvez envisager Haiku, environ 0,80 $ par million de tokens de sortie.

### Pratique 3 : contrôler la granularité des tâches

Des tâches trop grandes ou trop petites nuisent toutes deux à l'efficacité. Vous devez trouver la bonne granularité.

**Règle empirique** :

Chaque tâche devrait être quelque chose qu'un membre peut accomplir indépendamment en **15 à 30 minutes**.

**Tâche trop grande** :

```
Mauvais : implémenter le système d'authentification utilisateur
```

Cette tâche est trop vaste. Elle contient plusieurs sous-tâches, et une personne aurait besoin de beaucoup de temps pour la terminer, ce qui gaspille l'avantage du parallélisme.

**Tâche trop petite** :

```
Mauvais : créer un fichier vide appelé auth.js
```

Cette tâche est trop minuscule. Les membres passent plus de temps à se coordonner qu'à faire le travail réel.

**Granularité appropriée** :

```
Bon : implémenter l'API de connexion, y compris :
1. Le point de terminaison POST /api/login
2. La validation du nom d'utilisateur et du mot de passe
3. La réponse avec le token JWT
4. La gestion des erreurs
```

Cette tâche a des limites claires et des livrables. Une personne peut la terminer indépendamment, et elle n'est pas trop fragmentée.

**Configuration recommandée** :

Laissez chaque membre posséder **5 à 6 tâches de taille moyenne**. Cela offre suffisamment de parallélisme sans rendre les coûts de coordination trop élevés.

### Pratique 4 : éviter les conflits de fichiers

Plusieurs membres modifiant le même fichier simultanément est le problème le plus courant dans Agent Teams.

**Principe d'attribution** :

Essayez de laisser différents membres posséder **différents fichiers** :

```
Bon :
- Coéquipier A : possède tous les fichiers sous src/auth/
- Coéquipier B : possède tous les fichiers sous src/api/
- Coéquipier C : possède tous les fichiers sous tests/auth/

Mauvais :
- Coéquipier A et Coéquipier B modifient tous les deux src/app.js
```

**Si le même fichier doit être modifié** :

Concevez une phase d'édition séquentielle :

```
Phase 1 (parallèle) :
- Coéquipier A : analyser quelles fonctionnalités doivent être ajoutées à auth.js
- Coéquipier B : concevoir la nouvelle interface de fonctionnalité
- Coéquipier C : écrire les cas de test

Phase 2 (séquentielle) :
- Le chef d'équipe synthétise toutes les contributions
- Un membre modifie auth.js en une seule passe intégrée
```

### Pratique 5 : fournir un contexte initial riche

Lorsque les coéquipiers démarrent, leur historique de conversation est vide. Ils ne savent pas ce que le chef d'équipe et l'utilisateur ont discuté auparavant.

**Mauvaise approche** :

```
Créer l'équipe et laisser les membres commencer à travailler.
```

Les membres commenceront dans le brouillard : de quel projet s'agit-il ? Quelle pile technique utilise-t-il ? Que doivent-ils construire exactement ?

**Bonne approche** :

```
Il s'agit d'un projet e-commerce React + Node.js utilisant TypeScript.

La structure du projet est :
- src/frontend/ : code frontend React
- src/backend/ : code backend Node.js
- prisma/ : modèles de base de données

Style de code :
- Utiliser des composants fonctionnels et des Hooks
- Utiliser Express.js pour le backend
- Utiliser PostgreSQL pour la base de données

Maintenant, créez une équipe et demandez aux membres d'ajouter l'authentification utilisateur sous src/auth/.
```

Ce n'est qu'avec un contexte suffisant que les membres peuvent travailler efficacement.

### Pratique 6 : recherche avant implémentation

Ne laissez pas les membres commencer à coder immédiatement. Demandez-leur d'abord de rechercher et de concevoir la solution.

**Processus en deux phases** :

**Phase 1 : recherche et conception**

```
Créer une équipe. En phase un, faire de la recherche :
- Un membre étudie les approches d'authentification existantes (JWT vs Session)
- Un membre analyse la pile technique du projet et détermine les meilleures pratiques
- Un membre conçoit le schéma de base de données

Une fois la recherche terminée, laissez les membres discuter via le système de messagerie et arrêter un plan final.
```

**Phase 2 : implémentation**

```
Après la finalisation du plan, commencer l'implémentation :
- Un membre implémente la logique d'authentification backend
- Un membre implémente la page de connexion frontend
- Un membre écrit les tests
```

L'avantage de procéder ainsi est que vous pouvez **détecter les inadéquations architecturales tôt**, au lieu de réaliser à mi-chemin de l'implémentation que le plan ne fonctionne pas.

### Pratique 7 : surveiller et intervenir activement

Même si vous avez configuré l'automatisation, vous devriez toujours surveiller activement l'état de travail de l'équipe.

**Utiliser le mode panneaux divisés** :

Si vous avez configuré les panneaux tmux, vous pouvez voir la sortie de tous les membres en temps réel :

```
┌─────────────────┬─────────────────┐
│  Coéquipier 1   │  Coéquipier 2   │
│  Analyse du code│  Implémentation │
│  ...            │  de l'API...    │
│                 │                 │
│  Attends, cette │                 │
│  approche semble│                 │
│  mauvaise...    │                 │
└─────────────────┴─────────────────┘
```

Lorsque vous remarquez qu'un membre part dans la mauvaise direction, vous pouvez intervenir rapidement :

```
@Coéquipier1 Arrête un instant. Ton analyse part dans la mauvaise direction. Le module d'authentification devrait être sous src/auth/, pas src/user/.
```

**Vérifier régulièrement le statut des tâches** :

Utilisez la commande TaskList pour inspecter le statut de toutes les tâches :

```
/tasks
```

Cela affiche tous les états des tâches afin que vous puissiez voir ce qui est terminé, ce qui est encore en cours et ce qui est bloqué.

---

## Scénarios appropriés

Agent Teams est puissant, mais toutes les tâches ne lui conviennent pas. Comprendre les bons scénarios vous aide à choisir correctement.

### Scénarios où Agent Teams est bien adapté

**Refontes de systèmes complexes**

Lorsque la refonte s'étend sur plusieurs modules avec des limites claires :

```
Scénario : diviser une application monolithique en microservices

Créer une équipe :
- Coéquipier A : analyser les dépendances dans le module utilisateur
- Coéquipier B : analyser les dépendances dans le module de commandes
- Coéquipier C : analyser les dépendances dans le module de paiement
- Coéquipier D : concevoir le protocole de communication inter-services
```

Ces modules peuvent être analysés simultanément, et le résultat final peut être synthétisé ultérieurement, ce qui est beaucoup plus rapide que de les analyser séquentiellement.

**Revue de code multi-angles**

Lorsque vous devez réviser le code sous plusieurs dimensions :

```
Scénario : effectuer une revue de sécurité complète du module de paiement

Créer une équipe :
- Coéquipier A : se concentrer sur les vulnérabilités de sécurité (injection SQL, XSS, etc.)
- Coéquipier B : inspecter les problèmes de performance (requêtes N+1, fuites mémoire, etc.)
- Coéquipier C : vérifier l'exhaustivité de la gestion des erreurs
- Coéquipier D : évaluer la couverture des tests
```

Chaque membre se concentre sur une dimension, rendant la revue plus approfondie et le rapport final plus complet.

**Développement parallèle frontend et backend**

Lorsque vous devez construire le frontend et le backend simultanément :

```
Scénario : construire une fonctionnalité de gestion des utilisateurs

Créer une équipe :
- Coéquipier A (frontend) : implémenter la page de liste des utilisateurs
- Coéquipier B (frontend) : implémenter la page d'édition des utilisateurs
- Coéquipier C (backend) : implémenter l'API CRUD
- Coéquipier D (coordination) : concevoir le contrat API et s'assurer que frontend et backend restent alignés
```

Le frontend et le backend peuvent avancer en parallèle tant que le contrat API est défini en premier, suivant le principe du contrat d'abord.

**Débogage compétitif**

Lorsque vous avez plusieurs solutions possibles :

```
Scénario : corriger un bug complexe avec deux stratégies de réparation possibles

Créer une équipe :
- Coéquipier A : implémenter la solution 1
- Coéquipier B : implémenter la solution 2
- Coéquipier C : évaluer les avantages et inconvénients des deux
```

Les deux solutions peuvent être implémentées et testées en parallèle, et la meilleure peut être choisie par la suite.

**Génération de documentation**

Lorsque vous devez produire une grande quantité de documentation :

```
Scénario : écrire la documentation pour tout le projet

Créer une équipe :
- Coéquipier A : écrire la documentation API
- Coéquipier B : écrire le guide de déploiement
- Coéquipier C : écrire le guide de développement
- Coéquipier D : écrire le manuel de dépannage
```

Plusieurs documents peuvent être écrits en même temps, améliorant considérablement l'efficacité.

### Scénarios où Agent Teams n'est pas adapté

**Tâches de modification simples**

```
Non adapté : renommage de variables, corrections de bugs uniques, ajouts de petites fonctionnalités
```

Pour ces tâches, le coût de démarrage d'une équipe est supérieur au travail réel.

**Tâches hautement séquentielles**

```
Non adapté : tâches qui doivent se dérouler strictement en séquence
```

Si la tâche B ne peut pas commencer avant que la tâche A ne soit terminée, il n'y a pas de véritable espace pour le parallélisme.

**Tâches sensibles aux coûts**

Agent Teams consomme **2 à 4 fois** les tokens d'une instance unique, selon la taille de l'équipe. Si le coût est la préoccupation principale, une instance unique peut être le meilleur choix.

### Organigramme de décision

```
Y a-t-il plusieurs sous-tâches indépendantes ?
    │
    ├─ Non → Utiliser une instance unique
    │
    └─ Oui →
         │
         Les sous-tâches peuvent-elles être attribuées à différents fichiers ?
         │
         ├─ Non → Envisager l'exécution séquentielle ou diviser davantage la tâche
         │
         └─ Oui →
              │
              Le coût est-il acceptable (2-4x) ?
              │
              ├─ Non → Utiliser une instance unique
              │
              └─ Oui → Utiliser Agent Teams ✓
```

---

## Coût et performance

L'utilisation d'Agent Teams augmente le coût, mais elle peut aussi produire des gains d'efficacité significatifs. Comprendre ce compromis vous aide à prendre des décisions éclairées.

### Analyse des coûts

**Consommation de tokens et taille de l'équipe**

La consommation de tokens d'Agent Teams est à peu près **linéaire** par rapport à la taille de l'équipe :

| Taille de l'équipe | Coût relatif | Scénario approprié |
|-------------------|--------------|-------------------|
| 1 personne (instance unique) | 1x | Tâches simples |
| Équipe de 2 personnes | 2-2,5x | Complexité moyenne |
| Équipe de 3 personnes | 3-4x | Tâches complexes |
| Équipe de 5+ personnes | 5-6x+ | Grands projets |

**Pourquoi ce n'est pas parfaitement linéaire** :

- **Coût de démarrage** : chaque membre doit recevoir le contexte initial au démarrage
- **Coût de coordination** : la communication entre les membres via le système de messagerie consomme aussi des tokens
- **Coût du chef d'équipe** : le chef d'équipe utilise généralement Opus, qui est plus cher

**Exemples de chiffres concrets** (Claude 4.5 Sonnet) :

- Entrée : 3 $ par million de tokens
- Sortie : 15 $ par million de tokens

Supposons qu'une tâche nécessite :
- Chef d'équipe (Opus) : 50K entrée + 20K sortie ≈ 2,25 $
- 3 Coéquipiers (Sonnet) : chacun 30K entrée + 15K sortie ≈ 2,7 $ × 3 = 8,1 $
- **Total** : environ 10,35 $

La même tâche sur une instance Sonnet unique :
- 100K entrée + 50K sortie ≈ 1,05 $

**Multiplicateur de coût** : environ 10x

**Mais temps économisé** : potentiellement réduit de 3 heures à 1 heure

### Gains d'efficacité

**Données des tests internes d'Anthropic** :

- Refontes de projets majeurs : amélioration d'environ **50 %** de l'efficacité
- Développement parallèle multi-modules : amélioration d'environ **60-70 %**
- Tâches de génération de documentation : amélioration d'environ **80 %**

**Cas réel** :

L'équipe d'ingénierie d'Anthropic a autrefois utilisé **16 agents en parallèle** pour construire un compilateur C en environ 2 semaines capable de compiler le noyau Linux 6.9, environ 100 000 lignes de code Rust, et qui a réussi 99 % des tests GCC.

### Stratégies d'optimisation des coûts

**Stratégie 1 : mélanger les modèles**

```
Chef d'équipe : Opus (raisonnement fort nécessaire)
Coéquipiers : Sonnet (excellent rapport qualité-prix)
Tâches simples : Haiku (le moins cher)
```

**Stratégie 2 : ajuster dynamiquement la taille de l'équipe**

```
Phase d'analyse : équipe de 5 personnes (analyse multi-angles)
Phase d'implémentation : équipe de 3 personnes (codage en parallèle)
Phase de test : équipe de 2 personnes (test et correction)
```

**Stratégie 3 : utiliser Agent Teams uniquement dans les phases sélectionnées**

N'utilisez pas Agent Teams pour tout le projet. Utilisez-le uniquement dans les phases les plus complexes :

```
Phase 1 (analyse des besoins) : instance unique
Phase 2 (conception de l'architecture) : Agent Teams (plusieurs plans explorés en parallèle)
Phase 3 (codage) : instance unique
Phase 4 (revue de code) : Agent Teams (revue multi-angles)
Phase 5 (documentation) : Agent Teams (écriture en parallèle)
```

### Quand cela en vaut la peine

**En vaut la peine quand** :

- Le délai du projet est serré, et la valeur des gains d'efficacité dépasse le coût des tokens
- La tâche est très complexe, et une instance unique risque de manquer des détails
- Vous avez besoin d'une analyse et d'une validation multi-angles

**N'en vaut pas la peine quand** :

- La tâche est simple, et le surcoût de démarrage d'une équipe est trop élevé
- Le coût est très sensible et le budget de tokens est limité
- La tâche est hautement séquentielle et n'offre aucun espace pour le parallélisme

---

## Questions fréquemment posées

### Q1 : Agent Teams est-il stable ? Peut-il être utilisé en production ?

Agent Teams est actuellement une **fonctionnalité expérimentale**, il peut donc encore y avoir des bugs et des comportements instables. Recommandations :

- Sauvegardez d'abord les projets importants
- Commencez par de petits projets pour pouvoir tester et vous familiariser
- Suivez les notes de version officielles pour voir les améliorations dans les nouvelles versions
- Signalez rapidement les problèmes à l'équipe officielle lorsqu'ils apparaissent

### Q2 : Combien de membres puis-je créer au maximum ?

Il n'y a pas de limite théorique stricte, mais d'un point de vue pratique :

- Petits projets : 2 à 3 personnes
- Projets moyens : 3 à 5 personnes
- Grands projets : 5 à 10 personnes

Trop de membres introduisent les problèmes suivants :

- Les coûts de coordination augmentent fortement
- L'utilisation de tokens croît linéairement
- La probabilité de conflits de fichiers augmente
- La surveillance et la gestion deviennent plus difficiles

### Q3 : Les membres de l'équipe peuvent-ils voir le contexte des autres ?

**Non**. Chaque coéquipier a une fenêtre de contexte complètement indépendante. Ils communiquent via le système de messagerie plutôt que de partager directement le contexte.

C'est un choix de conception délibéré, dont les avantages sont :

- Le raisonnement d'un membre n'est pas pollué par le raisonnement d'un autre membre
- Le contexte ne devient pas chaotique parce que les conversations sont trop longues
- C'est plus proche du fonctionnement d'une vraie équipe, où chacun a son propre esprit

### Q4 : Comment passer d'un membre à un autre ?

Si le mode panneaux divisés n'est pas configuré, vous pouvez utiliser les raccourcis clavier :

- `Shift+Up` : passer au membre précédent
- `Shift+Down` : passer au membre suivant
- `Ctrl+O` : retourner au chef d'équipe

### Q5 : Que se passe-t-il si une tâche échoue ?

Si la tâche d'un membre échoue :

1. Vérifiez la cause de l'échec en lisant le journal de sortie de ce membre
2. Réattribuez la tâche à un autre membre si nécessaire
3. Intervenez manuellement et aidez à débloquer le problème directement

### Q6 : Puis-je ajouter ou retirer des membres en cours de processus ?

Oui. Vous pouvez émettre des commandes au chef d'équipe à tout moment :

```
Ajoute un nouveau membre et laisse-le gérer XXX.
```

```
Laisse le Coéquipier 3 quitter l'équipe après avoir terminé la tâche en cours.
```

### Q7 : Agent Teams peut-il être utilisé avec MCP et Skills ?

Absolument. En fait, ils fonctionnent encore mieux ensemble :

- **Agent Teams + Skills** : chaque membre peut porter différentes compétences
- **Agent Teams + MCP** : différents membres peuvent accéder à des ressources externes via différents serveurs MCP

```
Créer une équipe :
- Coéquipier A : porte la compétence frontend-design et est responsable de l'interface
- Coéquipier B : accède au dépôt via GitHub MCP et gère les PR
- Coéquipier C : interroge les données via Database MCP et gère l'analyse
```

---

## Références

### Ressources officielles

- [Documentation officielle de Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Documentation complète de Claude Code
- [Blog d'ingénierie d'Anthropic](https://www.anthropic.com/engineering) - Blog technique officiel et mises à jour

### Collection de tutoriels Agent Teams

**Guides complets en français** :

- [Guide complet de Claude Code Agent Teams : de l'introduction à la pratique](https://m.blog.csdn.net/u010634066/article/details/157903022) - Inclut les détails de configuration, des exemples pratiques et le cas frappant où 16 agents en parallèle ont construit un compilateur C
- [Développement collaboratif avec Claude Code Agent Team : un guide pratique complet](https://m.blog.csdn.net/u010028049/article/details/158126612) - Flux de travail complet de projet collaboratif
- [Guide étape par étape pour configurer et utiliser Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - Tutoriel Tencent Cloud avec des instructions de configuration détaillées

**Prise en main en pratique** :

- [Pratique avec les Agent Teams natifs de Claude Code : de l'activation à l'exécution d'une équipe de trois personnes](https://www.cnblogs.com/147api/p/19606317) - Présentation d'une équipe de trois personnes
- [Pratique de débutant avec Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - Introduction conviviale pour les débutants avec de bonnes pratiques telles que le contrat d'abord
- [Ne travaillez plus seul : laissez 7 Claude vous aider à développer en même temps avec Agent Teams](https://m.toutiao.com/a7605229732241736202/) - Étude de cas d'une équipe de 7 personnes

**Bonnes pratiques** :

- [Bonnes pratiques d'Agent Teams : contrat d'abord, granularité des tâches et attribution des modèles](https://blog.csdn.net/sinat_37574187/article/details/144727588) - Explication détaillée de 7 bonnes pratiques
- [Le manuel de terrain Claude Code d'un vétéran de sept ans dans la grande tech : huit règles du débutant à l'expert](https://new.qq.com/rain/a/20260111A02HE900) - Expérience pratique au niveau entreprise

**Principes et comparaisons** :

- [Claude Code Agent Teams : la bonne façon de faire la collaboration multi-agents](https://post.m.smzdm.com/p/adoezrmz/) - Analyse approfondie de la collaboration multi-agents
- [Développement d'équipe multi-agents Claude Code : le guide complet des principes aux pièges](https://m.toutiao.com/a7605229732241736202/) - Principes et pièges tirés d'une utilisation réelle

### Traductions du guide officiel

- [Claude a officiellement publié le « Guide de construction d'agents » (avec téléchargement PDF)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - Guide officiel de construction d'agents
- [Version intégrale traduite du « Guide de construction d'agents efficaces » officiel de Claude](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - Traduction française complète

### Technologies associées

- [Standard Agent Skills](https://agentskills.io/) - L'écosystème Skills
- [skills.sh - Magasin d'applications Agent Skills](https://skills.sh/) - Bibliothèque de plus de 70 000 compétences
