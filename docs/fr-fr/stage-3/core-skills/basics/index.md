# Guide de demarrage rapide de Claude Code

Claude Code est l'outil de programmation natif AI officiel d'Anthropic. Il integre les capacites des grands modeles de langage directement dans le terminal, vous permettant de realiser des taches de programmation en collaborant avec l'IA en langage naturel. Contrairement aux outils traditionnels de completion de code, Claude Code peut comprendre le contexte d'un projet entier et executer des taches de developpement complexes. De la generation de code au refactoring, en passant par le debogage et la redaction de documentation, il peut tout gerer.

Ce chapitre vous aide a maitriser rapidement l'utilisation principale de Claude Code, y compris l'installation et la configuration, les operations de base, les techniques pratiques et les commandes couramment utilisees. Que ce soit votre premiere utilisation d'un outil de codage AI ou que vous souhaitiez utiliser Claude Code plus efficacement, vous trouverez ici ce dont vous avez besoin.

---

## Installation rapide

Claude Code est construit sur Node.js, donc avant l'installation, assurez-vous que Node.js 18 ou superieur est installe sur votre systeme. Le processus est tres simple et ne prend generalement que quelques minutes.

### Pourquoi vous avez besoin de Claude Code

Dans les flux de travail de developpement traditionnels, les developpeurs passent frequemment d'un editeur a un terminal, a un navigateur et a la documentation. Claude Code unifie ces flux de travail en une seule interface : dans la meme fenetre de terminal, vous pouvez ecrire du code, executer des tests, lire la documentation et meme collaborer avec des coequipiers. Plus important encore, il peut comprendre la structure de votre projet et memoriser vos habitudes de codage, devenant ainsi un veritable assistant de programmation.

### Methode 1 : Installation manuelle

L'installation manuelle convient aux developpeurs qui aiment avoir un controle total sur chaque etape, et elle vous aide egalement a comprendre clairement les composants de l'outil.

```bash
# Installer Claude Code CLI globalement
# Utilisez -g pour installer la commande globalement, afin de pouvoir l'utiliser dans n'importe quel repertoire
npm install -g @anthropic-ai/claude-code

# Verifier l'installation
# Si la version s'affiche (par exemple 0.1.25), l'installation a reussi
claude --version
```

Pendant l'installation, npm telecharge automatiquement les dependances et configure les variables d'environnement. Si vous rencontrez des problemes de permissions, essayez `sudo` (macOS/Linux) ou executez le terminal en tant qu'administrateur (Windows).

### Methode 2 : Laisser un Agent AI l'installer pour vous

Si vous utilisez deja d'autres assistants de codage AI (comme Cursor, Windsurf ou l'Agent AI de ce projet), vous pouvez leur demander de completer l'installation pour vous. L'avantage est que l'IA peut detecter automatiquement votre environnement, gerer les conflits de dependances et choisir le meilleur chemin d'installation pour votre systeme.

**Vous pouvez simplement dire :**

```text
Help me install Anthropic Claude Code.
```

Ou plus specifiquement :

```text
Install Claude Code CLI and check whether my Node.js version is compatible.
```

Un Agent AI va :
1. Verifier la version actuelle de Node.js
2. Vous inviter a effectuer une mise a jour si les exigences ne sont pas satisfaites
3. Executer les commandes d'installation
4. Verifier le resultat de l'installation
5. Tenter des corrections automatiques en cas de probleme

### Premier lancement et initialisation

Apres l'installation, accedez au repertoire de votre projet et lancez Claude Code :

```bash
# Acceder au repertoire du projet (Claude Code fonctionne dans le repertoire courant)
cd /path/to/your/project

# Demarrer Claude Code
claude
```

Lors du premier lancement, Claude Code vous guide a travers plusieurs etapes de configuration importantes :

1. **Connexion au compte Anthropic** : vous avez besoin d'un compte Anthropic pour utiliser Claude Code. Si vous n'en avez pas, vous serez invite a vous inscrire.
2. **Choisir un forfait** :
   - **Forfait gratuit** : adapte a l'apprentissage personnel et a une utilisation legere, avec des limites d'appels
   - **Forfait Pro** : adapte aux developpeurs professionnels, avec un quota plus eleve et une reponse prioritaire
3. **Accepter les conditions** : lire et accepter les conditions d'utilisation et la politique de confidentialite d'Anthropic
4. **Optionnel : configurer la cle API** : si vous avez une cle personnalisee (par exemple d'un fournisseur tiers), configurez-la ici

::: info Note speciale pour les utilisateurs en Chine continentale

En raison de contraintes reseau, les utilisateurs en Chine continentale peuvent ne pas pouvoir acceder directement aux services officiels d'Anthropic. Claude Code prend en charge les services tiers compatibles avec le format API Anthropic, et cela est techniquement realisable.

**Vous avez deux options :**

1. **Utiliser un jeton API directement** : achetez un jeton aupres d'un fournisseur compatible avec l'API Anthropic et configurez-le avec des variables d'environnement
2. **Utiliser un forfait de codage** : certains fournisseurs proposent des forfaits optimises pour le codage qui sont generalement plus rentables pour les scenarios de programmation

**Approche recommandee** : laissez un Agent AI vous aider a configurer. Vous n'avez qu'a fournir les informations de configuration du fournisseur (point de terminaison API, cle, etc.), et l'IA peut definir les variables d'environnement correctement.

**Voir le guide de configuration detaille :** [Comment installer Claude Code et configurer les variables d'environnement](/fr-fr/stage-2/backend/modern-cli/)

:::

---

## Demarrage rapide : Realisez quelques petites experiences

Apres l'installation, ne vous precipitez pas dans des projets formels. Realisez d'abord quelques petites experiences pour comprendre le fonctionnement de Claude Code. Ces trois experiences sont concues du plus simple au plus avance, correspondant a trois competences principales : la comprehension du langage naturel, la generation de contenu et l'execution de code.

### Experience 1 : Conversation - Ressentir la comprehension de l'IA

L'objectif est de vivre la comprehension du langage naturel de Claude Code. Contrairement aux moteurs de recherche classiques, Claude Code peut comprendre le contexte, mener des conversations multi-tours et ajuster ses reponses en fonction de vos retours.

**Essayez ces prompts :**

```text
Hello, who are you?
```

Claude se presente comme Claude Code, un assistant de codage AI d'Anthropic.

```text
What is a closure? Give me the too-long-didnt-read version.
```

Observez comment Claude utilise "too-long-didnt-read" comme indice et donne une explication concise mais precise.

```text
What is the difference between JavaScript and TypeScript?
```

C'est une question de comparaison technique. Verifiez si Claude fournit une reponse structuree et approfondie.

**Point de l'experience** : notez le style de reponse de Claude. Il donne generalement la conclusion principale en premier, puis les details. Ce style en "pyramide inversee" est excellent pour une recherche rapide d'informations.

### Experience 2 : Generer un document Markdown - Vivre la creation de contenu

Cette experience illustre la capacite de generation de contenu de Claude Code. Pour les developpeurs, rediger de la documentation est souvent penible. Claude peut generer rapidement une documentation claire et complete a partir d'exigences.

**Entrez cette instruction :**

```text
Write a Markdown document of commonly used Git commands.
Requirements: include command, explanation, and example.
```

**Ce que fait Claude :**

1. Analyse votre exigence : commandes Git courantes, format Markdown, et trois elements (commande/explication/exemple)
2. Planifie la structure du document : generalement groupe par scenario d'utilisation (initialisation, developpement quotidien, flux de travail des branches, collaboration a distance, etc.)
3. Genere le contenu : explication concise et exemples pratiques pour chaque commande
4. Formate la sortie : utilise la syntaxe Markdown et une structure appropriee

**Exemple de sortie attendue :**

```markdown
# Common Git Command Cheat Sheet

## Initialize Repository

| Command | Explanation | Example |
|------|------|------|
| `git init` | Initialize new repository | `git init my-project` |
| `git clone` | Clone remote repository | `git clone https://github.com/user/repo.git` |

...
```

**Tentatives avancees** : vous pouvez ajouter des exigences supplementaires comme "ajouter des commentaires en chinois", "trier par frequence", "inclure la gestion des erreurs courantes", etc., et observer comment Claude adapte sa sortie.

### Experience 3 : Ecrire et executer un jeu - Flux de travail de codage de bout en bout

C'est l'experience la plus stimulante. Elle illustre le flux de travail complet de Claude Code : comprendre les exigences, ecrire du code, creer des fichiers, executer le programme et gerer les erreurs. A travers celle-ci, vous pouvez reellement ressentir la puissance d'un assistant de codage AI.

**Entrez cette instruction :**

```text
Write a Snake game in Python.
Requirements:
1. Use pygame
2. Show score
3. Press ESC to exit

After writing, help me run it.
```

**Claude execute ces etapes :**

**Etape 1 : Verifier l'environnement**
- Verifier si Python est installe
- Verifier si pygame est disponible
- Proposer l'installation si manquant

**Etape 2 : Ecrire le code**
- Creer le fichier d'entree du jeu (par exemple `snake_game.py`)
- Implementer le deplacement, la generation de nourriture, la detection de collisions
- Ajouter l'affichage du score
- Implementer la sortie par ESC

**Etape 3 : Executer le jeu**
- Executer le script Python et lancer le jeu
- La fenetre de jeu apparait, utilisez les fleches pour controler le serpent

**Etape 4 : Support supplementaire**
- S'il y a un bug, vous pouvez directement dire "le serpent traverse les murs, corrige-le"
- Si vous voulez plus de fonctionnalites, comme "augmenter la difficulte avec le score", Claude peut continuer a modifier

**Valeur de cette experience :**

1. **Verifier l'installation** : confirmer que Claude Code peut executer du code correctement
2. **Vivre l'interaction** : ressentir le developpement collaboratif avec l'IA
3. **Renforcer la confiance** : voir l'IA completer un programme executable de bout en bout

**Questions frequentes :**

- **Q : Que faire si pygame n'est pas installe ?**
  - R : Claude le detecte et suggere `pip install pygame`, ou vous pouvez demander a Claude de l'installer

- **Q : Le terminal est occupe apres le lancement du jeu, que faire ?**
  - R : Appuyez sur ESC pour quitter le jeu, ou continuez a utiliser Claude Code dans une autre fenetre de terminal

- **Q : Puis-je changer de langage ?**
  - R : Absolument. Essayez "write in JavaScript", "write with HTML5 Canvas", etc.

---

## Techniques principales

Maitrisez ces techniques et votre efficacite avec Claude Code peut etre multipliee. Elles proviennent de la pratique reelle de developpement et couvrent des scenarios a haute frequence.

### Technique 1 : Double Esc pour revenir en arriere dans la conversation - Annuler les mauvaises operations

C'est le raccourci le plus courant et le plus important dans Claude Code. Pendant la collaboration, vous pouvez faire une faute de frappe, donner une mauvaise instruction ou ne pas aimer une reponse. Un double appui sur Esc vous offre un rapide "retour dans le temps".

**Details du raccourci :**

```text
Appuyer sur Esc une fois     -> effacer l'entree actuelle (similaire a Ctrl+C)
Appuyer sur Esc deux fois    -> revenir a l'etat precedent de la conversation (annuler le tour precedent)
Appuyer sur Esc trois fois   -> effacer tout l'historique de conversation (recommencer)
```

**Cas d'utilisation :**

- **Cas A** : vous avez accidentellement envoye une mauvaise instruction et Claude a commence a l'executer. Appuyez rapidement deux fois sur Esc pour revenir avant l'execution.
- **Cas B** : la reponse de Claude ne correspond pas a ce que vous vouliez, et vous souhaitez reformuler. Double Esc pour annuler et redemander.
- **Cas C** : la conversation a de nombreux tours et le contexte est embrouille. Triple Esc pour effacer et recommencer.

**Note importante** : le double Esc annule **l'etat de la conversation**, pas les modifications de code. Si Claude a deja modifie des fichiers, ces modifications ne sont pas automatiquement revertees. Vous devez les restaurer manuellement via Git.

**Recommandation** : avant des modifications de code potentiellement importantes, sauvegardez l'etat actuel (`git commit` ou `git stash`) pour faciliter la recuperation.

### Technique 2 : Utiliser @ pour referencer des fichiers - Controle precis du contexte

Bien que Claude Code puisse lire les fichiers du projet automatiquement, referencer explicitement les fichiers rend l'intention plus claire et evite de gaspiller des tokens sur des fichiers non lies.

**Utilisation de base :**

Au lieu d'un vague :

```text
Explain src/utils.ts
```

Utilisez une reference explicite :

```text
@src/utils.ts Explain this file
```

**Utilisation avancee :**

**Comparer plusieurs fichiers :**
```text
@src/app.tsx @src/components/Header.tsx What is the relationship between these two files?
```

**Referencer un repertoire :**
```text
@src/components/ Summarize all components under this directory
```

**Referencer des lignes specifiques (avec editeur) :**
```text
@src/utils.ts:45-60 Explain what this code does
```

**Conseils d'utilisation :**

1. **Completion par Tab** : tapez `@` puis appuyez sur Tab, Claude affiche la liste des fichiers du repertoire courant et vous pouvez choisir avec les fleches
2. **Chemins relatifs** : supporte les references comme `@./config.json` ou `@../shared/types.ts`
3. **Correspondance floue** : les noms de fichiers partiels sont autorises, par ex. `@utils` peut correspondre a `src/utils.ts` ou `src/utils/index.ts`

### Technique 3 : Utiliser ! pour executer des commandes - Integration terminal

Claude Code integre l'execution de commandes. Vous pouvez executer des commandes sans basculer vers un autre terminal.

**Utilisation de base :**

```text
!npm test           # executer les tests
!git status         # verifier le statut Git
!ls -la             # lister les fichiers
```

**Scenarios pratiques :**

**Scenario : executer des tests et analyser les echecs**
```text
!npm test
# apres l'echec
Analyze test failure reasons and fix code
```

**Scenario : inspecter le diff Git**
```text
!git diff
# demander a Claude d'expliquer les changements
Summarize key changes in this diff
```

**Scenario : construire le projet**
```text
!npm run build
# si la construction echoue
Build failed, help me fix it
```

**Note de securite :**

Pour les commandes sensibles (par exemple `rm -rf`, `sudo`), Claude Code demande une confirmation. C'est un mecanisme de protection. Confirmez avec soin.

### Technique 4 : /plan avant de coder - La bonne facon de traiter les taches complexes

Pour les taches complexes, coder directement est souvent inefficace. `/plan` entre en mode planification : definir d'abord le plan d'implementation, puis executer etape par etape.

**Utilisation :**

```text
/plan
I want to add user authentication. Please create an implementation plan.
```

**Ce que fait Claude :**

1. **Analyser les exigences**
2. **Evaluer le projet actuel et la pile technologique**
3. **Creer un plan etape par etape**
4. **Discuter et ajuster avec vos retours**

**Exemple de sortie :**

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

**Meilleure pratique :**

- Pour les taches de plus de 30 minutes, utilisez `/plan` d'abord
- Executez phase par phase et verifiez chaque phase
- Si les exigences changent, relancez `/plan` pour ajuster

### Technique 5 : /init genere automatiquement la configuration - Initialisation rapide du projet

`/init` est l'une des commandes les plus puissantes de Claude Code. Elle analyse automatiquement votre projet, identifie la pile technologique et la structure, et genere un `CLAUDE.md` complet.

**Utilisation :**

```text
/init
```

**Claude effectue :**

1. **Analyser la structure du projet** : identifier le framework/langage/outils de construction
2. **Analyser les fichiers de configuration** : lire package.json, tsconfig.json, etc.
3. **Inferer le style** : conventions de nommage et organisation des fichiers
4. **Generer CLAUDE.md**

**Exemple de CLAUDE.md genere :**

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

**Pourquoi c'est important :**

`CLAUDE.md` est la "memoire du projet" de Claude Code. A chaque lancement, Claude lit ce fichier et comprend le contexte du projet. Cela signifie que :

- vous n'avez pas besoin d'expliquer repetitivement le framework et la pile technologique
- Claude suit vos conventions et meilleures pratiques
- les nouveaux membres de l'equipe peuvent se familiariser plus rapidement

**Recommandation** : apres l'initialisation du projet, executez `/init` immediatement, puis affinez la configuration generee pour correspondre a la realite.

### Technique 6 : /compact compresse le contexte - Economiser des tokens

La fenetre de contexte de Claude Code est limitee (souvent autour de 200K tokens). Les longues conversations consomment de nombreux tokens, augmentent les couts et peuvent pousser les informations importantes hors du contexte.

**Utilisation :**

```text
/compact
```

**Comment ca fonctionne :**

`/compact` analyse l'historique de discussion, extrait les informations cles (decisions prises, code genere, exigences confirmees) et cree un resume concis. Les dialogues ulterieurs sont bases sur ce resume plutot que sur l'historique complet.

**Quand l'utiliser :**

- apres 5-6 tours
- quand Claude semble "oublier" le contexte precedent
- lors du passage a une nouvelle sous-tache tout en conservant le contexte important

**Recommandation :**

```text
# compresser apres une longue conversation
/compact

# continuer le travail
Now that user module is done, let's build order module.
```

### Technique 7 : Utiliser Claude Code pour assister les commits Git

Dans Claude Code, le flux de commit recommande est : laisser Claude inspecter le diff et rediger le message de commit, puis vous executez les commandes Git standard. C'est clair et vous donne un point de controle supplementaire avant le commit.

References officielles :

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**Flux de travail recommande :**

```bash
# 1. Verifier les changements actuels
/diff
!git status

# 2. Demander a Claude de resumer et generer le message de commit
Based on current git diff, generate a Conventional Commits message,
and explain in Chinese why this category is appropriate.

# 3. Apres confirmation, executer le commit Git standard
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**Avantages de cette approche :**

1. **Aligne avec les capacites officielles actuelles** : pas de dependance envers des commandes integrees supprimees
2. **Transparent** : examiner le diff et le message de commit avant la soumission
3. **Portable** : le meme flux de fonctionnement dans d'autres IDE AI ou avec Git pur

**Si vous souhaitez une experience de "commit en une commande" :**

Claude Code recommande maintenant l'extension via des plugins. Par exemple, `commit-commands` fournit des commandes comme `/commit-commands:commit`.

```bash
# 1. Ajouter l'exemple du marche des plugins
/plugin marketplace add anthropics/claude-code

# 2. Installer le plugin de flux de commit
/plugin install commit-commands@anthropics-claude-code

# 3. Recharger les plugins
/reload-plugins

# 4. Utiliser la commande du plugin pour commit
/commit-commands:commit
```

**Notes supplementaires :**

- `/commit-commands:commit` est fourni par un plugin, pas une commande integree par defaut actuelle
- si vous avez seulement besoin d'inspecter les changements avant le commit, preferez `/diff` ou demandez a Claude d'expliquer `git diff`
- le `/review` officiel a également ete marque comme deconseille ; pour une capacite similaire, utilisez un plugin ou un flux de revue en langage naturel

### Technique 8 : Shift+Tab Acceptation automatique - Ameliorer la fluidite

Par defaut, Claude demande confirmation avant de modifier du code. C'est utile en phase d'apprentissage, mais peut sembler lent par la suite. `Shift+Tab` active le mode d'acceptation automatique pour une iteration plus rapide.

**Utilisation :**

- appuyez sur `Shift+Tab` -> entrer en mode d'acceptation automatique
- appuyez a nouveau sur `Shift+Tab` -> quitter le mode d'acceptation automatique

**Comparaison des modes :**

| Mode | Comportement | Scenario d'utilisation |
|------|------|----------|
| Mode par defaut | Demander confirmation pour chaque modification | Phase d'apprentissage, code important |
| Acceptation automatique | Appliquer les modifications directement | Apres familiarisation, iteration rapide |

**Remarques :**

- En mode d'acceptation automatique, Claude modifie les fichiers directement sans seconde confirmation
- Recommande de l'utiliser avec Git pour faciliter le retour en arriere
- Pour les operations sensibles (suppression de fichiers, modification de configurations cles), Claude demande quand meme

### Technique 9 : Ctrl+C Annuler l'operation - Frein d'urgence

Quand Claude execute une tache longue, ou que vous realisez avoir donne une mauvaise instruction, `Ctrl+C` est le frein d'urgence.

**Utilisation :**

- appuyez sur `Ctrl+C` une fois -> annuler l'operation en cours d'execution
- appuyez sur `Ctrl+C` deux fois -> quitter completement Claude Code

**Cas d'utilisation :**

- une commande longue doit etre interrompue
- Claude genere un grand code non pertinent
- mauvaise instruction detectee et vous voulez un arret immediat

**Difference avec le double Esc :**

- `Ctrl+C` : arreter l'**operation** en cours (commande en cours / generation de code)
- `double Esc` : annuler l'**etat de la conversation** (defaire le tour precedent)

### Technique 10 : /context Verifier l'utilisation du contexte - Optimiser le cout des tokens

`/context` affiche l'utilisation du contexte de la session actuelle, vous aidant a comprendre la consommation de tokens et a optimiser les couts.

**Utilisation :**

```text
/context
```

**Exemple de sortie :**

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

**Comment utiliser ces informations :**

1. **Identifier les fichiers volumineux** : si un fichier consomme beaucoup de tokens, verifiez s'il est reellement necessaire
2. **Optimiser .claudeignore** : ignorer les fichiers non lies (node_modules, sorties de construction, etc.)
3. **Decider quand compacter** : quand l'utilisation depasse 70%, envisagez `/compact`

### Technique 11 : /resume Restaurer la session - Basculer entre des conversations multi-taches

Lors du traitement de plusieurs taches, vous pouvez avoir plusieurs fils de conversation. `/resume` vous permet de revenir au contexte d'une session precedente dans le chat actuel, sans redemarrage.

**Utilisation :**

```text
/resume
```

**Comment ca fonctionne :**

Claude Code enregistre automatiquement les sessions precedentes. Quand vous executez `/resume`, il bascule vers le contexte de la session precedente et conserve tout le contenu de discussion et l'etat anterieurs.

**Cas d'utilisation :**

**Cas A : multi-taches paralleles**
```text
# Tache 1 : corriger un bug
claude> Fix login-page validation issue
# ... une conversation ...

# Tache 2 : ajouter une fonctionnalite (nouveau fil)
claude> Add user registration feature
# ... une autre conversation ...

# Revenir a la tache 1
claude> /resume
# Continuer le travail de correction de bug precedent
```

**Cas B : recherche temporaire puis retour**
```text
claude> Explain this algorithm
# ... discuter de l'algorithme ...

claude> /resume
# Revenir au travail de codage precedent
```

**Cas C : reprendre apres une interruption**
```text
claude> Continue previous work
# Si vous avez ete interrompu avant, /resume vous ramene
```

**Comparaison avec les commandes associees :**

| Commande | Fonction | Scenario |
|------|------|----------|
| `/resume` | Revenir a la session precedente dans le chat actuel | Basculement multi-taches |
| `claude -c` | Continuer la session la plus recente | Reconnexion apres sortie |
| `claude -r` | Restaurer une session precedente | Retrouver un etat anterieur apres sortie |
| `double Esc` | Annuler un tour | Defaire le tour de conversation le plus recent |

**Suggestions :**

1. **Gestion multi-taches** : `/resume` est plus efficace que de re-expliquer le contexte
2. **Memoire de session** : chaque session a un contexte independant ; `/resume` le preserve
3. **Utiliser avec /compact** : dans les longues sessions, compacter d'abord, puis reprendre le changement pour garder le contexte propre

---

## Configuration principale

Une configuration raisonnable aide Claude Code a mieux s'adapter a votre projet et votre equipe. Cette section explique le role de la configuration, la priorite et l'optimisation pour differents scenarios d'utilisation.

### Emplacements et priorite des fichiers de configuration

Claude Code utilise une strategie de configuration en couches. Les differents niveaux ont differentes portees et priorites. Comprendre cela vous permet de gerer les parametres de maniere flexible.

**Priorite de configuration (de haut en bas) :**

| Emplacement | Portee | Objectif | Commit dans Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | projet local | preferences personnelles | non |
| `.claude/settings.json` | projet partage | configuration d'equipe | oui |
| `~/.claude/settings.json` | global | defauts personnels | non |

**Regles de fusion :**

- La configuration de priorite superieure ecrase la meme cle dans la priorite inferieure
- Les cles non conflictuelles sont fusionnees
- La configuration du projet ecrase la configuration globale
- La configuration personnelle locale ecrase la configuration partagee du projet

**Scenarios pratiques :**

**Scenario 1 : projet d'equipe**
```text
~/.claude/settings.json          # vos parametres d'editeur par defaut personnels
.claude/settings.json            # normes de codage et configuration de permissions de l'equipe
.claude/settings.local.json      # vos preferences de debogage et parametres de theme
```

**Scenario 2 : projet personnel**
```text
~/.claude/settings.json          # configuration par defaut globale
.claude/settings.json            # configuration specifique au projet (par ex. regles de permissions speciales)
```

### CLAUDE.md - Memoire du projet

`CLAUDE.md` est le fichier le plus important pour la configuration de Claude Code. Il agit comme un "manuel" du projet. A chaque demarrage de Claude Code, il lit le `CLAUDE.md` du repertoire courant, comprenant le contexte, la pile technologique et les conventions.

**Pourquoi CLAUDE.md est si important :**

Imaginez rejoindre un nouveau projet : vous devez apprendre la pile technologique, les conventions de codage et les commandes courantes. Normalement, cela prend des heures de lecture de documentation/code et de questions aux coequipiers. Avec `CLAUDE.md`, Claude connait tout cela au demarrage et vous pouvez collaborer efficacement immediatement.

**Modele minimum viable :**

```text
# [Nom du projet]

## Pile technologique
- Framework : React 18 + TypeScript
- Etat : Zustand
- Style : Tailwind CSS
- Outil de construction : Vite

## Commandes courantes

\`\`\`bash
npm run dev      # demarrer le serveur de developpement (port 5173)
npm run test     # executer les tests unitaires
npm run build    # construction de production
npm run lint     # verification du lint
\`\`\`

## Conventions de code
- Les composants utilisent des composants fonctionnels + Hooks
- Nomage : PascalCase (composants), camelCase (fonctions utilitaires)
- Les commits Git utilisent les Conventional Commits
- Tous les appels API doivent passer par un wrapper de requete unifie
```

**Modele complet (recommande) :**

```text
# [Nom du projet]

## Apercu du projet
Description en une phrase de la fonctionnalite principale et des utilisateurs cibles.

## Pile technologique
### Frontend
- Framework : React 18 + TypeScript
- Routeur : React Router v6
- Etat : Zustand + React Query
- Style : Tailwind CSS + Headless UI
- Construction : Vite

### Backend (si applicable)
- Runtime : Node.js + Express
- Base de donnees : PostgreSQL + Prisma
- Authentification : JWT + bcrypt

## Structure du projet

\`\`\`
src/
├── components/      # composants reutilisables
├── pages/           # composants de page
├── hooks/           # Hooks personnalises
├── lib/             # fonctions utilitaires
├── types/           # types TypeScript
└── api/             # appels API
\`\`\`

## Commandes courantes

\`\`\`bash
# developpement
npm run dev              # demarrer le serveur de dev
npm run dev:mock         # utiliser des donnees mock en developpement

# tests
npm run test             # executer tous les tests
npm run test:watch       # mode veille
npm run test:coverage    # generer le rapport de couverture

# qualite du code
npm run lint             # verification ESLint
npm run lint:fix         # correction automatique ESLint
npm run format           # formatage Prettier
npm run typecheck        # verification de types TypeScript

# construction
npm run build            # construction de production
npm run preview          # apercu de la construction de production
\`\`\`

## Regles de developpement
### Style de code
- Utiliser des composants fonctionnels, eviter les composants de classe
- Preferer les Hooks personnalises pour l'abstraction logique
- Les props des composants doivent definir des interfaces TypeScript

### Flux de travail Git
- Prefixe de branche : `feature/`, `fix/`, `refactor/`
- Les messages de commit suivent les Conventional Commits
- Les PR doivent passer le CI et la revue de code

### Exigences de performance
- Chargement paresseux des composants pour reduire le temps de chargement initial
- Utiliser des images WebP et activer le chargement paresseux
- Garder le temps de reponse API sous 200ms

## Variables d'environnement

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Problemes courants

### Le serveur de dev n'a pas pu demarrer ?

Verifiez si le port 5173 est occupe, ou essayez `npm run dev -- --port 3000`

### Erreurs de type ?

Executez `npm run typecheck` pour voir les erreurs detaillees
```

**Generation rapide de CLAUDE.md :**

Si votre projet existe mais n'a pas de `CLAUDE.md`, executez `/init` :

```bash
claude
# dans Claude Code
/init
```

Claude analyse la structure du projet, le package.json et le code actuel, puis genere un `CLAUDE.md` pratique. Apres generation, verifiez et ajustez manuellement.

### .claudeignore - Economiser des tokens

`.claudeignore` indique a Claude Code quels fichiers ne doivent pas etre lus dans le contexte. Une configuration correcte peut reduire significativement l'utilisation de tokens (souvent de 40 a 60%) et ameliorer la vitesse de reponse.

**Pourquoi .claudeignore est necessaire :**

Quand Claude Code essaie de comprendre le projet, il lit les fichiers associes. Certains fichiers n'aident pas la comprehension et peuvent :
- consommer de nombreux tokens (par exemple les fichiers de definitions de types dans node_modules)
- introduire du bruit (journaux, sorties de construction)
- contenir des informations sensibles (fichiers .env)

**Configuration recommandee :**

```text
# ===== dependances =====
# code tiers volumineux, generalement inutile pour le contexte de Claude
node_modules/
.pnp/
.pnp.js

# ===== sorties de construction =====
# artefacts generes, pas de logique source
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== journaux =====
# journaux d'execution, aucune valeur pour comprendre l'architecture
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== sorties de test =====
coverage/
.nyc_output/

# ===== editeur / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== fichiers systeme =====
.DS_Store
Thumbs.db

# ===== fichiers env =====
.env
.env.local
.env.*.local

# ===== gros fichiers binaires =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== fichiers de verrouillage (optionnel) =====
# Si vous n'avez pas besoin que Claude analyse les versions de dependances, ignorez-les
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Conseils de configuration :**

1. **Commencer minimal** : ignorez d'abord node_modules et les sorties de construction, puis observez l'utilisation des tokens
2. **Ajuster par projet** : projet riche en images -> ignorer les formats d'image ; projet de documentation -> conserver le Markdown
3. **Optimiser regulierement** : utilisez `/context` pour voir les fichiers les plus consommateurs de tokens et decider s'il faut les ignorer

### Configuration des permissions

Par defaut, Claude Code demande confirmation avant les operations sensibles. Via `permissions` dans `settings.json`, vous pouvez controler quelles actions sont autorisees automatiquement, necessitent une confirmation ou sont completement interdites.

**Structure de configuration des permissions :**

```json
{
  "permissions": {
    "allow": [
      // autoriser automatiquement sans demander
    ],
    "ask": [
      // demander avant l'execution
    ],
    "deny": [
      // interdire completement
    ]
  }
}
```

**Syntaxe des regles :**

Les regles de permission utilisent le format `ActionType(pattern)` :

| Type d'action | Description | Exemple |
|----------|------|------|
| `Bash` | executer une commande terminal | `Bash(git status)` |
| `Edit` | modifier un fichier | `Edit(src/**/*.ts)` |
| `Read` | lire un fichier | `Read(README.md)` |
| `Write` | creer un fichier | `Write(src/components/*.tsx)` |

**Support des caracteres generiques :**

- `*` correspond a des caracteres arbitraires (a l'exclusion de `/`)
- `**` correspond a des chemins arbitraires
- `?` correspond a un caractere

**Exemple de configuration reelle :**

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

**Suggestions de configuration :**

1. **Phase de developpement** : permissions relativement detendues pour une iteration plus rapide
2. **Phase de production** : permissions plus strictes, en particulier pour le deploiement et les operations sur les donnees sensibles
3. **Collaboration d'equipe** : placer les regles de base dans le `settings.json` partage, les ajustements personnels dans `settings.local.json`

### Repertoire des regles

Pour les grands projets, un seul `CLAUDE.md` peut devenir volumineux et difficile a maintenir. Claude Code prend en charge la gestion modulaire via le **Repertoire des regles**, divisant les conventions par sujet en fichiers separes.

**Structure du repertoire :**

```text
.claude/
├── settings.json          # fichier de configuration principal
├── CLAUDE.md              # apercu du projet (toujours necessaire)
└── rules/                 # repertoire des regles
    ├── 00-security.md     # regles de securite (globales)
    ├── 01-coding-style.md # regles de style de code (globales)
    ├── 10-api.md          # regles de developpement API
    ├── 11-frontend.md     # regles de developpement frontend
    ├── 12-backend.md      # regles de developpement backend
    └── 20-testing.md      # regles de test
```

**Suggestion de nommage :**

Utilisez des prefix numeriques (`00-`, `01-`) pour controler l'ordre de chargement : les regles de base d'abord, les regles specifiques ensuite.

**Format des fichiers de regles :**

Les fichiers de regles supportent le frontmatter YAML pour definir l'applicabilite :

```markdown
---
# Optionnel : chemins ou cette regle s'applique
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Optionnel : commandes ou cette regle s'applique
commands:
  - "generate api"
  - "create endpoint"

# Optionnel : priorite de la regle (nombre plus petit = priorite plus elevee)
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

**Heritage et surcharge des regles :**

- Les regles globales (sans frontmatter ou `globs: *`) s'appliquent a tous les fichiers
- Les regles specifiques a un chemin s'appliquent uniquement aux fichiers correspondants
- Si les regles sont en conflit, la regle de priorite superieure l'emporte
- Les regles specifiques peuvent surcharger les regles globales

**Exemples de scenarios d'utilisation :**

**Scenario 1 : projet separe frontend-backend**
```text
.claude/rules/
├── 00-general.md          # normes generales (message de commit, nommage)
├── 10-backend.md          # normes backend (specifique NestJS)
├── 11-frontend.md         # normes frontend (specifique React)
└── 20-database.md         # normes base de donnees (specifique Prisma)
```

**Scenario 2 : architecture microservices**
```text
.claude/rules/
├── 00-global/             # regles globales
│   ├── security.md
│   └── logging.md
├── 10-services/           # regles specifiques aux services
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # regles des composants partages
    ├── shared-lib.md
    └── common-utils.md
```

**Recommandation de migration :**

Si vous avez deja un tres grand `CLAUDE.md`, migrez vers le Repertoire des regles comme ceci :

1. Creer `.claude/rules/`
2. Diviser `CLAUDE.md` par sujet
3. Ajouter un frontmatter approprie par fichier de regle
4. Garder `CLAUDE.md` comme apercu du projet et deplacer les normes detaillees
5. Tester et s'assurer que le chargement des regles fonctionne correctement

---

## Commandes d'operation principales

Claude Code fournit un ensemble riche de commandes operationnelles pour une collaboration AI efficace. Ces commandes se divisent en categories : commandes Slash (fonctionnalites integrees), systeme de symboles (operations rapides) et instructions en langage naturel (developpement quotidien).

### Reference rapide des commandes Slash

Les commandes Slash sont des operations integrees commencant par `/`. Elles fournissent des actions standardisees comme l'initialisation du projet, la gestion de la configuration et les verifications de statut.

| Commande | Fonction | Scenario d'utilisation |
|------|------|----------|
| `/help` | Afficher toutes les commandes | recherche rapide quand vous oubliez les commandes |
| `/init` | Initialiser le projet et generer CLAUDE.md | nouveau projet ou ajout de configuration |
| `/plan` | Entrer en mode planification | creer un plan avant les taches complexes |
| `/clear` | Effacer l'historique de conversation | recommencer quand le contexte est embrouille |
| `/compact` | Compresser le contexte | economiser des tokens apres une longue discussion |
| `/diff` | Ouvrir la vue diff interactive | inspecter les changements non commites actuels |
| `/plugin` | Gerer les plugins | installer des extensions commit/review |
| `/context` | Afficher l'utilisation du contexte | optimiser le cout des tokens |
| `/cost` | Afficher le cout de la session | surveiller le cout d'utilisation |
| `/config` | Ouvrir le panneau de configuration | mettre a jour les parametres |
| `/permissions` | Gestion des permissions | ajuster les permissions d'operation |
| `/model` | Changer de modele | choisir differents modeles |

**Exemple de combinaison de commandes :**

```bash
# flux de developpement complet
/plan                    # 1. creer un plan
# ... executer le developpement ...
/diff                    # 2. inspecter les changements
Generate a commit message from current diff
!git add -A              # 3. staging des changements
!git commit -m "..."     # 4. commit
/cost                    # 5. verifier le cout
```

### Systeme de symboles

Le systeme de symboles est le mecanisme d'operations abreges de Claude Code. Des symboles speciaux declenchent rapidement des capacites specifiques.

| Symbole | Nom | Objectif | Exemple |
|------|------|------|------|
| `/` | Commande Slash | executer une operation integree | `/help`, `/plan` |
| `@` | Reference At | referencer un fichier/repertoire | `@src/app.tsx` |
| `!` | Mode Bang | executer une commande terminal | `!npm test` |
| `&` | Execution en arriere-plan | executer une tache en arriere-plan | `&npm run dev` |

**Conseils de combinaison de symboles :**

```bash
# combiner des symboles
@src/utils.ts !npm test
# signification : lire utils.ts, puis executer les tests

@src/components/ @src/pages/ compare structures of these two directories
# signification : referencer deux repertoires simultanement pour comparaison

!git diff @src/app.tsx explain these changes
# signification : inspecter le diff Git et demander a Claude d'expliquer les changements du fichier specifique
```

### Operations sur les fichiers

Les operations sur les fichiers sont les actions quotidiennes les plus courantes : lire, modifier, creer et supprimer des fichiers.

**Lire des fichiers :**

```bash
# lecture de base
@src/app.tsx explain this file

# lecture + analyse
@src/utils/helpers.ts find potential performance issues

# lecture comparative
@src/components/OldButton.tsx @src/components/NewButton.tsx compare differences
```

**Modifier des fichiers :**

```bash
# modification simple
Modify formatDate in src/utils/date.ts to support Chinese locale format

# modification complexe
@src/api/users.ts Refactor this file:
1. Extract duplicated error handling into shared handleError
2. Replace Promise chains with async/await
3. Add JSDoc comments

# modification par lot
Convert all class components under src/components/ into function components
```

**Creer des fichiers :**

```bash
# creer un fichier
Create src/components/UserCard.tsx, a card component to display user info

# creer des fichiers lies
Create user module:
1. src/types/user.ts - define User interface
2. src/api/users.ts - user API calls
3. src/components/UserCard.tsx - user card component
4. src/hooks/useUser.ts - hook to fetch user data
```

**Supprimer des fichiers :**

```bash
# supprimer avec confirmation
Delete src/old-component.tsx (this component is no longer used)

# Claude demande confirmation et peut suggerer de verifier les references d'abord
```

### Operations Git

Claude Code s'integre profondement avec Git pour vous permettre de completer le flux de controle de version complet sans quitter le terminal.

**Verifier le statut :**

```bash
# afficher le statut Git
Show git status and uncommitted changes

# diff detaille
!git diff
Explain changes in src/api/users.ts
```

**Creer des commits :**

```bash
# inspecter les changements
/diff

# generer le message de commit
Generate a Conventional Commit message from current git diff

# commit manuel
!git add -A
!git commit -m "..."
```

**Operations de branche :**

```bash
# creer une branche de fonctionnalite
!git checkout -b feature/user-authentication

# apres implementation
Generate commit message based on current changes
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Exemple complet de flux de travail Git :**

```bash
# 1. commencer une nouvelle fonctionnalite
!git checkout -b feature/payment-integration

# 2. developper la fonctionnalite (avec l'aide de Claude)
Create payment module with Alipay and WeChat Pay

# 3. executer les tests
!npm test

# 4. inspecter les changements
/diff

# 5. generer et confirmer le message de commit
Generate a Conventional Commit message from current git diff
!git add -A
!git commit -m "..."

# 6. pousser vers le distant
!git push -u origin feature/payment-integration

# 7. creer une PR (optionnel, avec GitHub CLI)
!gh pr create --title "feat: add payment integration" --body "Support Alipay and WeChat Pay"
```

### Operations de code

Les operations de code sont les points forts de Claude Code : generation, explication, refactoring et optimisation.

**Generer du code :**

```bash
# generer un composant
Create a React Hook to manage auth state, including login/logout/permission checks

# generer une fonction utilitaire
Create a date-formatting utility that supports relative time (e.g. "2 hours ago")

# generer un module complet
Create order module with:
- order list page
- order detail page
- create-order API
- order status management
```

**Expliquer le code :**

```bash
# explication ligne par ligne
Explain src/algorithms/quicksort.ts line by line

# explication de haut niveau
@src/services/payment.ts explain architecture design of this module

# expliquer une logique complexe
Explain what reduce in src/utils/dataTransformer.ts is doing
```

**Refactorer du code :**

```bash
# refactoring d'architecture
Convert class components in src/components/ to function components

# refactoring de performance
Optimize rendering performance in src/App.tsx, reduce unnecessary re-renders

# refactoring de nettoyage
@src/utils/helpers.ts Refactor this file:
1. Delete unused functions
2. Extract repeated logic into shared utilities
3. Add type definitions
4. Improve function naming
```

**Deboguer le code :**

```bash
# analyse d'erreur
npm test failed, analyze root cause and fix it

# analyse de performance
@src/components/DataTable.tsx This component renders slowly, find bottlenecks

# analyse de journaux
!cat logs/error.log
Analyze these error logs and identify root cause
```

### Operations de test

Les tests sont essentiels pour l'assurance qualite. Claude Code peut aider a generer des tests, a les executer et a analyser les resultats.

**Generer des tests :**

```bash
# tests unitaires
Generate unit tests for src/utils/math.ts, including boundary cases

# tests de composants
Generate React Testing Library tests for src/components/UserForm.tsx

# tests d'integration
Create integration test for user registration flow from form submission to DB write
```

**Executer et deboguer des tests :**

```bash
# executer les tests
!npm test

# deboguer les tests echoues
Analyze failure reasons and fix
@tests/auth.test.ts

# verification de couverture
!npm run test:coverage
Which code paths are not covered?
```

**Suggestion de strategie de test :**

```bash
I added user authentication. Please:
1. Generate unit tests for auth.service.ts
2. Generate component tests for LoginForm
3. Run all tests and ensure pass
```

### Chainage de commandes et composition de flux de travail

La facon la plus efficace d'utiliser Claude Code est de chaner des commandes en flux de travail complets.

**Scenario 1 : flux de travail de correction de bug**

```bash
# 1. inspecter le probleme
!npm test
Tests failed, analyze why

# 2. localiser le probleme
@src/utils/validation.ts Is the issue in this file?

# 3. corriger le probleme
Fix isEmail in validation.ts to correctly handle addresses containing +

# 4. verifier la correction
!npm test

# 5. commit de la correction
Generate a fix-type commit message from current diff
!git add -A
!git commit -m "fix: ..."
```

**Scenario 2 : flux de travail de revue de code**

```bash
# 1. inspecter les changements
!git diff --stat
Which files changed?

# 2. revue detaillee
@src/components/ Review these component changes

# 3. suggerer des ameliorations
What improvements should be made based on this review?

# 4. implementer les ameliorations
Optimize performance of UserList component

# 5. revue finale
/diff
Review current changes and point out potential risks and improvements
```

**Scenario 3 : flux de travail de nouvelle fonctionnalite**

```bash
# 1. planifier d'abord
/plan
I want to add shopping cart feature

# 2. creer une branche
!git checkout -b feature/shopping-cart

# 3. implementer la fonctionnalite
Implement step by step according to plan

# 4. ajouter des tests
Generate tests for shopping cart module

# 5. executer les tests
!npm test

# 6. revue de code
/diff
Please do a code review on current diff

# 7. commit
Generate commit message for this feature development
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Questions frequentes

Lors de l'utilisation de Claude Code, vous pouvez rencontrer divers problemes. Cette section resume les problemes courants et leurs solutions.

### L'utilisation des tokens est trop rapide ?

Une consommation rapide de tokens est l'un des problemes les plus courants. Voici une strategie d'optimisation complete.

**Diagnostic :**

Executez d'abord `/context` pour inspecter l'utilisation actuelle des tokens :

```text
/context
```

Concentrez-vous sur :
- **Taux d'utilisation des tokens** : si superieur a 70%, envisagez la compression du contexte
- **Nombre de fichiers references** : plus de fichiers signifie une consommation de tokens plus elevee
- **Fichiers volumineux** : verifiez quels fichiers consomment le plus de tokens

**Strategie d'optimisation :**

**1. Ameliorer .claudeignore**

Assurez-vous que `.claudeignore` inclut les fichiers inutiles :

```text
# a ignorer imperativement
node_modules/
dist/
build/
*.log
.env

# specifique au projet
# React
.next/
out/

# Vue
.nuxt/
.output/

# generique
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Compresser le contexte regulierement**

Les longues conversations accumulent de nombreux tokens. Il est recommande d'executer `/compact` tous les 5-6 tours :

```text
# apres une longue conversation
/compact

# continuer
Now let's implement order module...
```

**3. Referencer les fichiers avec precision**

Evitez de referencer un repertoire entier si ce n'est pas necessaire :

```bash
# non recommande
@src/ Explain this code

# recommande
@src/utils/auth.ts @src/components/Login.tsx Explain login flow
```

**4. Eviter de lire des fichiers volumineux**

Si `/context` montre qu'un fichier consomme de nombreux tokens, envisagez :
- en avez-vous reellement besoin ?
- pouvez-vous referencer seulement une section ?
- ce fichier peut-il etre divise en modules plus petits ?

### Claude ne comprend pas le projet ?

Si Claude repond de maniere imprecise ou demande repetitivement des informations de base sur le projet, il lui manque le contexte du projet.

**Solutions :**

**1. Generer CLAUDE.md**

Executez `/init` pour generer la configuration du projet :

```bash
/init
```

Apres generation, validez :
- le resume du projet est-il precis ?
- la pile technologique est-elle complete ?
- les commandes courantes sont-elles correctes ?
- les conventions de codage sont-elles claires ?

**2. Editer manuellement CLAUDE.md**

Si la configuration auto-generee n'est pas assez detaillee, ajoutez :

```markdown
## Informations specifiques au projet

### Decisions d'architecture
- Pourquoi choisir X plutot que Y ?
- Quels sont les modeles de conception principaux ?

- Pieges courants
- Lors de l'utilisation de useEffect, attention a...
- Les requetes DB doivent...

### Integrations tierces
- Paiements via Stripe
- Email via SendGrid
- Stockage de fichiers via AWS S3
```

**3. Utiliser le Repertoire des regles**

Pour les grands projets, organisez les conventions dans les Regles :

```text
.claude/rules/
├── 00-architecture.md    # apercu de l'architecture
├── 01-coding-style.md    # style de code
├── 10-frontend.md        # regles frontend
├── 11-backend.md         # regles backend
└── 20-testing.md         # regles de test
```

**4. Ajouter du contexte dans le prompt si necessaire**

Pour des taches specifiques, ajoutez le contexte pertinent :

```text
We use a custom useAuth Hook for authentication.
It returns { user, login, logout, isLoading }.
Please build a user-menu component based on this Hook.
```

### Comment annuler des operations ?

Claude Code fournit de multiples mecanismes d'annulation pour differents scenarios.

**Scenario 1 : annuler l'etat de la conversation**

Si vous avez simplement fait une faute de frappe ou n'aimez pas la reponse :

```text
Double Esc  -> annuler le tour precedent
Triple Esc  -> effacer tout l'historique de conversation
```

**Note** : cela annule uniquement l'etat de la conversation, pas les modifications de fichiers.

**Scenario 2 : annuler les modifications de fichiers**

Si Claude a deja modifie des fichiers, annulez manuellement :

```bash
# verifier les changements
!git status
!git diff

# revenir sur un fichier
git checkout -- src/utils/helpers.ts

# annuler tous les changements de l'arbre de travail
git checkout -- .

# si deja commit
# retour en arriere doux (conserver les changements)
git reset --soft HEAD~1

# retour en arriere dur (ignorer les changements)
git reset --hard HEAD~1
```

**Scenario 3 : utiliser preventivement le flux de travail Git**

Meilleure pratique : sauvegarder le travail actuel avant la session Claude :

```bash
# sauvegarder l'etat actuel avant de commencer
git add .
git commit -m "WIP: before Claude Code session"
# ou utiliser stash
git stash push -m "before claude"

# developper avec Claude Code...

# si le resultat est insatisfaisant, retour en arriere complet
git reset --hard HEAD~1
# ou
git stash pop
```

### Trop de demandes de permission ?

Les confirmations de permissions frequentes nuisent a l'efficacite. Une configuration appropriee des permissions peut rendre le flux de travail plus fluide.

**Modele de permissions :**

Les permissions de Claude Code sont de trois niveaux :
- **allow** : autoriser automatiquement
- **ask** : demander avant l'execution
- **deny** : interdire completement

**Configuration d'optimisation :**

Editez `.claude/settings.json` :

```json
{
  "permissions": {
    "allow": [
      // Operations de lecture Git
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // tests et verifications
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // serveur de dev
      "Bash(npm run dev:*)",

      // modifications de sources
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Operations d'ecriture Git
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // gestion des paquets
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // construction et deploiement
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // modifications de fichiers de configuration
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // lectures de fichiers sensibles
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // commandes dangereuses
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // fichiers systeme
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // internes Git
      "Edit(.git/*)"
    ]
  }
}
```

**Strategie de permissions progressive :**

- **Phase d'apprentissage** : garder les defauts et comprendre ce que Claude essaie d'executer
- **Phase de familiarisation** : ajouter les operations courantes sures (comme git status, npm test) dans allow
- **Phase de haute efficacite** : creer des regles fines basees sur les caracteristiques du projet

### Comment utiliser en Chine continentale ?

En raison de contraintes reseau, les utilisateurs en Chine peuvent ne pas acceder directement aux services officiels d'Anthropic. Voici plusieurs options.

**Option 1 : utiliser un service proxy API**

De nombreux fournisseurs cloud offrent des services proxy API compatibles avec Anthropic :

```bash
# definir les variables d'environnement
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# demarrer Claude Code
claude
```

**Option 2 : utiliser des outils tiers compatibles Claude Code**

Certains fournisseurs nationaux proposent des outils compatibles :

```bash
# installer la version compatible
npm install -g @some-provider/claude-code

# configurer la cle API
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**Option 3 : utiliser d'autres outils de codage AI**

Si Claude Code n'est pas disponible, envisagez des alternatives :

| Outil | Caracteristiques | Scenario d'utilisation |
|------|------|----------|
| Cursor | Base sur VS Code, complet | experience IDE complete |
| GitHub Copilot | autocompletion puissante | principalement la completion de code |
| Tongyi Lingma | produit national, stable en Chine | environnement de developpement national |
| Codeium | quota gratuit genereux | budget limite |

**Option 4 : laisser un Agent AI aider a configurer**

Si vous n'etes pas sur de savoir configurer, demandez a un Agent AI :

```text
I want to use Claude Code, but I cannot directly access it in mainland China.
I bought an API from provider XXX.
API endpoint is https://api.xxx.com,
key is sk-xxx.

Please configure environment variables so Claude Code can work correctly.
```

**Questions courantes :**

- **Q : toujours impossible de se connecter apres configuration ?**
  - R : verifiez l'exactitude du point de terminaison API, y compris le chemin `/v1`
  - R : verifiez la validite et le solde de la cle API
  - R : verifiez si le reseau local necessite un proxy

- **Q : la reponse est lente ?**
  - R : choisissez un fournisseur avec une region geographiquement plus proche
  - R : utilisez un forfait optimise pour le codage au lieu d'un forfait API generique
  - R : utilisez `/compact` pour reduire l'utilisation des tokens

- **Q : certaines fonctionnalites sont indisponibles ?**
  - R : certains fournisseurs tiers peuvent ne pas prendre en charge completement toutes les fonctionnalites de Claude Code
  - R : consultez la documentation du fournisseur pour connaitre l'etendue des fonctionnalites prises en charge

---

## Ressources de reference

- [Documentation officielle de Claude Code](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
