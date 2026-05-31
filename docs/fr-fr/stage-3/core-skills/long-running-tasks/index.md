# Comment faire travailler Claude Code pendant de longues durées

## Introduction

Les assistants de codage IA traditionnels sont "conversationnels" : vous dites quelque chose, il répond une fois, puis s'arrête. Mais pour de vraies tâches de développement, ce mode est loin d'être suffisant.

Imaginez ces scénarios : vous voulez que Claude refactorise un projet entier, mais il édite quelques fichiers et dit "c'est fait" ; vous voulez que Claude continue à corriger des bugs jusqu'à ce que tous les tests passent, mais il s'exécute une fois et s'arrête ; vous voulez que Claude "travaille toute la nuit," mais le lendemain matin vous découvrez qu'il s'est arrêté depuis longtemps.

À l'été 2025, un développeur australien nommé Geoffrey Huntley (qui est aussi éleveur de moutons) a écrit un script bash de 5 lignes. Le script était simple : redémarrer continuellement Claude Code et lui donner la même tâche. Il l'a nommé "Ralph Wiggum," d'après le personnage des Simpson qui continue d'essayer et n'abandonne jamais.

Ce script simple a choqué la Silicon Valley. En seulement deux semaines, les projets associés ont obtenu plus de 7 000 étoiles GitHub. Les gens l'ont utilisé pour générer 6 projets complets en une nuit, livrer un travail sous contrat de 50 000 $ avec seulement 297 $ de coûts API, et même l'utiliser pour construire un langage de programmation complet en 3 mois.

La question centrale que ce chapitre résout est : comment faire travailler Claude Code en continu comme un vrai développeur jusqu'à ce que les tâches soient véritablement terminées.

---

## Principe fondamental : pourquoi l'IA "s'arrête trop tôt" ?

Avant de discuter des méthodes spécifiques, comprenons d'abord la cause racine.

### Le jugement d'achèvement de l'IA n'est pas fiable

Les LLM ont une faiblesse fondamentale : ils ne peuvent pas juger de manière fiable si le travail est véritablement terminé.

Les critères d'achèvement humains sont objectifs : tous les tests passent, les fonctionnalités sont complètes, et la qualité du code répond aux normes. Mais l'IA ne peut juger que par "ressenti." Elle peut s'arrêter parce que "ça semble à peu près correct," ou parce que "la sortie semble suffisante," ou parce qu'elle ne sait pas quoi faire ensuite.

C'est pourquoi nous avons besoin d'un système externe pour déterminer le véritable achèvement plutôt que de nous fier au sens interne de l'IA.

### L'idée centrale de la solution

La solution centrale est de maintenir l'IA à l'intérieur d'une "boucle."

Chaque fois qu'elle essaie de sortir, le système externe vérifie trois questions : est-ce véritablement terminé ? est-ce que cela répond à des critères objectifs ? y a-t-il quelque chose de manquant ? Si non, réinjecter la tâche et continuer un autre tour.

Cette idée peut être implémentée sous de nombreuses formes, des simples scripts bash aux systèmes d'orchestration complexes, mais l'essence est la même.

---

## Méthode 1 : Boucle While True Bash (méthode la plus primitive)

C'est l'implémentation la plus simple et la plus directe. Essentiellement, écrire une boucle infinie qui redémarre Claude Code à chaque tour et donne la même description de tâche.

L'implémentation la plus simple ne compte que 5 lignes :

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### Comment ça fonctionne

Le flux du script est simple. L'étape 1 lit la description de la tâche depuis `PROMPT.md`. L'étape 2 lance Claude Code et transmet la description de la tâche. L'étape 3 Claude travaille et produit des résultats. L'étape 4 Claude quitte après avoir terminé. L'étape 5 la boucle redémarre automatiquement et retourne à l'étape 1, créant un cycle infini à moins que vous n'interrompiez manuellement avec `Ctrl+C`.

### Avantages et inconvénients

L'avantage est une simplicité extrême : tout le monde peut comprendre, pas de configuration nécessaire, immédiatement utilisable, et bon pour des expériences rapides.

Mais les inconvénients sont évidents : il ne peut pas juger du véritable achèvement, il peut tourner indéfiniment, il n'a pas de garde-fous de sécurité, et il peut gaspiller des appels API.

### Exemple d'utilisation réelle

D'abord, créez un fichier `PROMPT.md` pour décrire votre tâche. Par exemple, refactoriser un module d'authentification utilisateur :

```markdown
# Task: Refactor user authentication module

Requirements:
1. Extract all authentication logic into an independent AuthService class
2. Add unit tests, coverage > 80%
3. Update related documentation

When all tests pass and docs are updated, output: task complete
```

Puis créez et exécutez le script de boucle :

```bash
chmod +x loop.sh
./loop.sh
```

### Version améliorée plus sûre

Pour éviter les boucles infinies, ajoutez un plafond d'itérations :

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== Iteration $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "Reached maximum iterations, stopping"
        break
    fi

    sleep 5  # small delay to avoid API rate limits
done
```

Cette version améliorée ajoute une limite d'itérations maximales, affiche la progression par tour, et s'arrête automatiquement à la limite. Elle ajoute également un délai de 5 secondes à chaque boucle pour éviter la limitation de débit.

---

## Méthode 2 : Plugin Ralph Wiggum (recommandation officielle)

Ralph Wiggum est un plugin officiel Anthropic construit spécifiquement pour les tâches de longue durée. Il est nommé d'après le personnage des Simpson, représentant l'esprit de "continuer à essayer malgré l'échec."

### Mécanisme central : Stop Hook

Le cœur de Ralph est le Stop Hook. Lorsque Claude veut quitter, le Stop Hook intercepte le signal de sortie. Ensuite le système vérifie : la sortie incluait-elle le marqueur d'achèvement spécifique ? Si aucun marqueur n'est trouvé, il réinjecte le prompt original et démarre une autre itération. Ce n'est que lorsque le marqueur d'achèvement est détecté que Claude est autorisé à quitter.

Cela garantit que Claude ne s'arrête pas juste parce qu'il "sent que c'est assez proche." Il doit accomplir des exigences clairement marquées.

### Installation

Ralph Wiggum est un plugin officiel Claude Code et peut être installé de deux manières.

**Option 1 : installer depuis la marketplace officielle de plugins (recommandée)**

```bash
# exécuter dans Claude Code
claude

# ajouter la marketplace officielle de plugins
/plugin marketplace add anthropics/claude-code

# installer Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# vérifier l'installation
/plugin
```

**Option 2 : installer directement depuis GitHub**

```bash
# entrer dans le répertoire des plugins
cd ~/.claude/plugins/

# cloner le dépôt du plugin
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

Après l'installation, vous pouvez utiliser :

- `/ralph-wiggum:ralph-loop` - démarrer la boucle
- `/ralph-wiggum:cancel-ralph` - annuler la boucle
- `/ralph-wiggum:help` - afficher l'aide

### Utilisation de base

Utilisez `/ralph-wiggum:ralph-loop` :

```bash
/ralph-wiggum:ralph-loop "Build a todo API with CRUD operations, input validation, and tests.
             Output <promise>COMPLETE</promise> when everything is done." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### Explication des paramètres

Les deux paramètres les plus importants sont `--max-iterations` et `--completion-promise`.

`--max-iterations` fixe le plafond de sécurité dur. Les valeurs recommandées sont typiquement 20-100. Même s'il n'est pas terminé, Ralph s'arrête à cette limite pour empêcher des dépenses API infinies.

`--completion-promise` spécifie le texte du marqueur d'achèvement, qui doit être explicite et unique. Ralph traite la tâche comme terminée uniquement lorsque la sortie de Claude contient ce marqueur. Utilisez des marqueurs clairs comme `COMPLETE` ou `TASK_DONE`, et évitez les mots ambigus.

### Meilleures pratiques pour les prompts

Écrire de bons prompts est la clé du succès de Ralph.

Les mauvais prompts ne définissent généralement pas de critères d'achèvement. Par exemple, "écrire une API todo" peut amener l'IA à produire un squelette approximatif et s'arrêter, sans tests, sans vérification et sans documentation.

Les bons prompts devraient inclure des exigences par phases et des critères d'acceptation clairs. Par exemple :

Décrivez d'abord les tâches par phases. La phase 1 est la fonctionnalité principale avec tous les endpoints CRUD : POST `/todos` créer, GET `/todos` lister, GET `/todos/:id` récupérer un seul, PUT `/todos/:id` mettre à jour, DELETE `/todos/:id` supprimer. La phase 2 est la validation des entrées : le titre ne peut pas être vide, le statut d'achèvement doit être booléen. La phase 3 est les tests : écrire des tests pour chaque endpoint, avec une couverture > 80%.

Puis définissez les critères d'acceptation : tous les tests passent, le code passe le linter, le README inclut la documentation API.

Enfin, définissez un marqueur d'achèvement unique : `<promise>TODO_API_COMPLETE</promise>`.

De cette façon, Claude sait exactement quoi faire et quand l'achèvement est véritablement atteint.

### Plus de modèles de prompts

Voici des modèles de tâches courants que vous pouvez utiliser directement ou adapter.

**Modèle 1 : migration de tests (Jest -> Vitest)**

```text
/ralph-wiggum:ralph-loop "
Migrate all tests in this project from Jest to Vitest:
- Keep all test logic unchanged
- Update config files (vite.config.js, vitest.config.js)
- Replace Jest-specific APIs (e.g., jest.mock -> vi.mock)
- Ensure all tests pass
- Remove Jest-related dependencies

Acceptance criteria:
- npm test passes fully
- no Jest dependency in package.json
- project builds successfully

Output after completion: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**Modèle 2 : optimisation UI/UX (mobile-first)**

```text
/ralph-wiggum:ralph-loop "
Polish this project's UI/UX into a refined mobile-first language learning app:
- unify spacing and whitespace (use 4px base unit)
- establish clear type hierarchy (title/body/auxiliary text)
- unify styles for cards, lists, and shared components
- add bottom navigation (Home/Learn/Quiz/Progress/Settings)
- ensure mobile rendering quality

Acceptance criteria:
- npm run build succeeds
- no TypeScript errors
- key pages preview correctly on mobile

Output after completion: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**Modèle 3 : annotation TypeScript en masse**

```text
/ralph-wiggum:ralph-loop "
Add TypeScript type annotations to all functions in the project:
- prioritize src/ directory
- add types for function params and return values
- avoid any, use concrete types or unknown
- add necessary type definitions

Acceptance criteria:
- npm run typecheck passes
- no @ts-ignore or @ts-any comments
- code runs correctly

Output after completion: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**Modèle 4 : développement de fonctionnalité piloté par TDD**

```text
/ralph-wiggum:ralph-loop "
Implement checkout functionality using TDD:
1. Write tests first (checkout.test.ts)
2. Run tests (should fail)
3. Write minimal code to pass tests
4. Refactor and optimize
5. Repeat until all tests pass

Feature requirements:
- shopping cart item list
- shipping fee calculation
- coupon application
- payment form validation

Acceptance criteria:
- all tests pass (npm test checkout.test.ts)
- code coverage > 80%
- no ESLint errors

Output after completion: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**Modèle 5 : unification du style de code**

```text
/ralph-wiggum:ralph-loop "
Unify code style across the project:
- format all files with Prettier
- unify naming conventions (variables camelCase, components PascalCase)
- remove unused imports and variables
- unify string quotes (single quotes)
- unify semicolon style (no semicolons)

Acceptance criteria:
- npm run lint passes
- consistent code style
- build succeeds

Output after completion: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### Cas concrets réels

Un cas célèbre s'est produit lors d'un hackathon Y Combinator, où une équipe a utilisé Ralph Loop. À 23h, ils ont fixé une tâche : implémenter les MVPs de 6 spécifications de produit en séquence et émettre des marqueurs d'achèvement spécifiques pour chacun. Ils ont fixé les itérations maximales à 200 et sont allés dormir.

Le lendemain matin, ils avaient 6 projets prêts pour la démonstration, et le coût API n'était que de 297 $. C'est le pouvoir de Ralph : pendant que vous dormez, l'IA continue de travailler.

Un autre cas vient de Boris Cherny (responsable de Claude Code). Avec Ralph plus Opus 4.5, il a livré 259 PRs en 30 jours, incluant 497 commits, ajoutant 40 000 lignes et supprimant 38 000 lignes. Plus frappant encore, tout cela a été produit par Claude Code sans écrire de code manuellement.

Un cas encore plus fou est le langage de programmation CURSED. Le créateur de Ralph, Geoffrey Huntley, a utilisé Ralph Loop pendant 3 mois pour construire de manière autonome un langage de programmation complet. Ses mots-clés utilisent l'argot de la génération Z (comme `slay`, `sus`, `based`), et plus important encore, il inclut une implémentation complète de compilateur LLVM, une bibliothèque standard et un support partiel d'éditeur. Cela démontre le véritable potentiel de Ralph Loop : si vous fournissez un objectif clair, il peut continuer à travailler pendant des mois jusqu'à ce qu'un projet complexe soit véritablement terminé.

### Plus de cas concrets

**Refactoring automatisé de projet**

Un développeur a utilisé Ralph pour refactoriser un projet hérité avec du code désordonné, sans tests et manquant de documentation. Les tâches assignées étaient :

1. Ajouter des tests pour le code existant
2. Refactoriser étape par étape, en s'assurant que les tests passent après chaque changement
3. Mettre à jour la documentation

Ralph a fonctionné pendant tout un week-end. Lundi, il y avait 47 commits, une structure de code plus propre, 75% de couverture de tests et une documentation API complète. Le coût était d'environ 12 $.

### Philosophie de Ralph

Ralph reflète trois philosophies centrales.

La première est l'itération plutôt que la perfection. N'attendez pas la perfection en une seule passe ; utilisez des boucles pour vous améliorer. La première passe peut ne construire qu'un squelette, la deuxième corrige des bugs, la troisième optimise, la quatrième ajoute des tests ; chaque tour s'améliore.

La deuxième est l'échec comme donnée. Chaque échec de test est une opportunité d'amélioration ; ne craignez pas l'échec, apprenez-en.

La troisième est l'essai persistant : continuez à essayer jusqu'à ce que ça fonctionne. C'est l'esprit Ralph.

### Quand Ralph est adapté ou non

Savoir où Ralph s'adapte aide à économiser du temps et des coûts.

**Scénarios adaptés à Ralph**

Ces tâches ont des critères d'achèvement clairs et sont bonnes pour l'itération automatique :

| Scénario | Pourquoi |
|------|------|
| Migration de tests | Framework cible clair, validé par des tests passants |
| Grands refactors | Des règles de refactor spécifiques peuvent être définies |
| Migration de framework | Une migration réussie est vérifiable par du code fonctionnel |
| Annotation de type en masse | Terminé lorsque le typecheck passe |
| Amélioration de la couverture de tests | Le pourcentage de couverture est objectif |
| Génération de documentation | La documentation API peut être validée automatiquement |
| Unification UI/UX | Des règles de conception concrètes peuvent être définies |
| Corrections de bugs avec reproduction | La condition de réussite est testable |

**Scénarios non adaptés à Ralph**

Ces tâches nécessitent un jugement humain ou une exploration :

| Scénario | Pourquoi |
|------|------|
| Décisions d'architecture | par ex., microservices vs monolithique nécessite un jugement de compromis |
| Code sensible à la sécurité | Les vulnérabilités peuvent être subtiles et difficiles à détecter automatiquement |
| Exigences ambiguës | Pas de critères d'achèvement clairs |
| Travail exploratoire | La direction change continuellement |
| Conception créative | Nécessite un jugement esthétique humain |
| Tâches ponctuelles simples | Utiliser Ralph est excessif |

**Liste de contrôle de décision**

Posez-vous trois questions :
1. **Puis-je définir des critères d'achèvement explicites ?** Si non, pas adapté
2. **Y a-t-il une méthode de validation objective ?** (tests/build/typecheck) Si non, pas adapté
3. **Cette tâche nécessite-t-elle un retour humain continu ?** Si oui, pas adapté

Si les trois réponses sont "non," laissez Ralph tourner.

---

## Méthode 3 : Ralph amélioré

C'est une implémentation améliorée par la communauté du Ralph officiel. Le projet [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) ajoute des mécanismes de sécurité plus forts.

### Fonctionnalités supplémentaires

Le Ralph amélioré ajoute plusieurs fonctionnalités de sécurité supplémentaires.

La première est les doubles conditions de sortie. Le Ralph officiel vérifie uniquement le marqueur d'achèvement, mais la version améliorée requiert à la fois le marqueur d'achèvement et un `EXIT_SIGNAL` explicite avant de s'arrêter. Cela signifie que même si Claude produit le marqueur d'achèvement, la boucle peut continuer pour une vérification supplémentaire à moins qu'une sortie explicite n'apparaisse.

La deuxième est la limitation de débit. Par défaut 100 exécutions/heure, empêchant des factures API incontrôlées si un bug provoque des boucles infinies. Vous pouvez ajuster cette limite.

La troisième est un disjoncteur intelligent. Si le système détecte le marqueur d'achèvement 5 fois consécutives, il force l'arrêt. Cela empêche les cas marginaux rares où les boucles échouent à se terminer correctement.

La quatrième est un tableau de bord en temps réel. Le Ralph amélioré fournit un tableau de bord en ligne de commande affichant les itérations actuelles, la progression des tâches et le coût estimé.

### Installation

Installez le Ralph amélioré en clonant depuis GitHub :

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

Le script d'installation configure automatiquement les fichiers et la configuration requis.

### Utilisation

L'utilisation du Ralph amélioré comporte deux étapes. D'abord initialiser le projet avec `ralph-setup` :

```bash
ralph-setup my-project
```

Cela crée les fichiers de configuration requis dans le projet. Puis démarrer la boucle avec `ralph loop` :

```bash
ralph loop
```

### Fichier de configuration

Le Ralph amélioré utilise `.claude/ralph-config.json` :

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` est le nombre maximum de boucles. `rateLimitPerHour` est le plafond horaire. `completionPromise` est le texte du marqueur d'achèvement. `exitSignal` est le signal de sortie explicite. `costAlertThresholds` définit les niveaux d'alerte budgétaire.

---

## Méthode 4 : Agent Teams (multi-agent parallèle)

Lorsque les tâches sont suffisamment grandes, un seul Claude ne suffit pas ; vous avez besoin de "collaboration d'équipe."

Agent Teams est une capacité avancée qui permet à plusieurs instances Claude de fonctionner en parallèle et de se coordonner via des listes de tâches partagées et des dépendances. C'est adapté aux projets très volumineux. Dans l'expérience de Nicholas Carlini, 16 agents parallèles ont produit plus de 100 000 lignes de code en deux semaines et construit un compilateur C capable de compiler le noyau Linux.

Agent Teams est plus complexe, et nous le couvrirons en détail dans la section suivante : "3.3 Agent Teams collaboration multi-agent."

---

## Méthode 5 : Tâches en arrière-plan (Ctrl+B)

C'est une méthode d'exécution non bloquante simple et pratique.

### Opération de base

L'utilisation est simple. Lorsque Claude démarre une tâche, appuyez sur `Ctrl+B` pour la pousser en arrière-plan.

Par exemple, vous dites : "Exécuter la suite de tests complète." Claude commence à s'exécuter. Vous appuyez sur `Ctrl+B`, et Claude répond : "Tâche poussée en arrière-plan (ID : task_abc123)." Ensuite vous pouvez continuer : "Pendant ce temps, analysez ce fichier de log." Claude peut analyser les logs pendant que les tests continuent en arrière-plan.

### Affichage des tâches en arrière-plan

Il existe plusieurs façons de vérifier les tâches en arrière-plan. Utilisez `/tasks` pour lister toutes les tâches avec l'ID de tâche, l'état et l'heure de début. Appuyez sur `Ctrl+T` pour un résumé rapide du statut. Vous pouvez également ramener une tâche au premier plan pour inspecter la sortie en direct.

### Scénarios adaptés

Les tâches en arrière-plan sont bonnes pour les situations typiques :

Premièrement, les tests de longue durée. Les suites complètes peuvent prendre des dizaines de minutes, et le mode arrière-plan évite le blocage.

Deuxièmement, les constructions de grands projets. Les pipelines de construction peuvent fonctionner pendant que vous continuez d'autres travaux.

Troisièmement, les opérations par lots sur les fichiers comme le renommage en masse et le formatage.

Quatrièmement, tout ce pour quoi vous ne voulez pas attendre de manière synchrone.

---

## Mécanismes de sécurité : prévention des boucles infinies

Tout système de boucle automatisé doit inclure des protections, sinon il peut devenir incontrôlable.

### Limites strictes

La protection la plus basique est de définir `--max-iterations` (nombre maximum de boucles). C'est obligatoire. Indépendamment de l'état d'achèvement, la tâche s'arrête à ce plafond et empêche les dépenses API illimitées.

Vous pouvez également imposer des limites de temps, par exemple arrêt automatique après 4 heures. Vous pouvez aussi définir des alertes budgétaires qui s'arrêtent et notifient aux seuils de dépenses (par exemple 10 USD, 50 USD, 100 USD).

### Détection intelligente

Vous pouvez ajouter une détection intelligente de boucles mortes. Par exemple, vérifier si les commits récents incluent des changements significatifs :

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "No substantive changes in the last 5 commits, possible loop"
    exit 1
fi
```

Si les diffs récents sont minimes, le système peut être bloqué et devrait s'arrêter avec alerte.

### Alertes de coûts

Définissez des seuils d'alerte de coûts dans la configuration :

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

Lorsque les dépenses atteignent 10, 50 ou 100 USD, le système s'arrête et notifie pour que vous puissiez décider de continuer.

### Points de contrôle manuels

Pour les tâches importantes, ajoutez des points de contrôle manuels :

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "Completed $iteration iterations. Continue? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

Cela s'arrête toutes les 10 itérations pour confirmation, permettant une intervention humaine rapide.

---

## Construction pratique : forum BBS complet avec Ralph Loop

Utilisons un exemple complet pour montrer le pouvoir de Ralph Loop. Nous allons construire un système de forum de type BBS à partir de zéro, incluant l'authentification utilisateur, la publication, le centre de profil et le backend d'administration.

### Objectif du projet

Construire un système de forum BBS entièrement fonctionnel avec :

**Fonctionnalités côté utilisateur :**
- inscription, connexion, déconnexion utilisateur
- parcourir la liste des publications (pagination)
- voir le détail d'une publication
- publier de nouvelles publications
- fonctionnalité de commentaires
- centre de profil (voir ses propres publications, mettre à jour le profil)

**Fonctionnalités du backend d'administration :**
- connexion administrateur
- gestion des utilisateurs (bannir/débannir)
- gestion des publications (supprimer/épingler)
- gestion des commentaires
- statistiques système

**Stack technique :**
- backend : Node.js + Express + SQLite
- frontend : React + React Router + Axios
- authentification : jeton JWT
- style : Tailwind CSS

### Préparation

D'abord installez le plugin Ralph Wiggum :

```bash
claude /plugins:add ralph-wiggum
```

### Démarrer Ralph Loop

Maintenant lancez Ralph Loop pour construire tout le projet :

```bash
/ralph-wiggum:ralph-loop "
Please build a complete BBS forum system from scratch using TDD.

Project structure requirements:
- backend/ directory: Express API server
- frontend/ directory: React frontend app
- both directories have their own tests

Backend requirements:
- use Express framework
- SQLite storage (better-sqlite3)
- JWT auth (jsonwebtoken + bcrypt)
- user table: id, username, password, email, role, createdAt
- post table: id, title, content, authorId, category, pinned, createdAt
- comment table: id, content, postId, authorId, createdAt

Backend API endpoints:
- POST /api/auth/register - user register
- POST /api/auth/login - user login
- GET /api/posts - get post list (pagination + category filter)
- GET /api/posts/:id - get post detail
- POST /api/posts - create post (auth required)
- PUT /api/posts/:id - edit post (author or admin)
- DELETE /api/posts/:id - delete post (author or admin)
- POST /api/posts/:id/comments - add comment (auth required)
- GET /api/user/profile - get profile (auth required)
- PUT /api/user/profile - update profile (auth required)
- GET /api/admin/stats - admin statistics (admin only)
- GET /api/admin/users - user list (admin only)
- PUT /api/admin/users/:id/ban - ban user (admin only)

Frontend page requirements:
- /login - login page
- /register - register page
- / - home page (post list)
- /post/:id - post detail
- /new - publish post
- /profile - profile center
- /admin - admin panel (admin permission required)

Admin panel features:
- user management (view, ban, unban)
- post management (view, delete, pin)
- comment management (view, delete)
- system statistics (user count, post count, comment count)

TDD requirements:
- write tests first, then implementation
- each feature must have corresponding tests
- backend uses Jest, API tests cover all endpoints
- frontend uses Vitest, component tests cover major features
- auth middleware must have tests

Acceptance criteria:
- npm test (backend) passes
- npm test (frontend) passes
- frontend starts and works correctly
- backend API responds correctly
- proper permission isolation between normal users and admin
- code passes ESLint checks

Output after completion: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### Temps estimé

Basé sur la complexité :

**Si codé manuellement** : environ 40-60 heures (incluant la conception de schéma, le système d'authentification, l'intégration frontend/backend et les tests)

**En utilisant Ralph Loop** :
- version de base (fonctionnalités principales) : environ 3-5 heures
- version complète (backend d'administration + tests) : environ 6-10 heures

### Surveillance de la progression

Pendant que Ralph Loop fonctionne, vous pouvez surveiller la progression de plusieurs façons :

**Nombre d'itérations** : Ralph affiche les itérations actuelles et maximales, ce qui aide à estimer le temps restant.

**Logs** : vous pouvez voir ce que Claude fait actuellement, comme concevoir le schéma, écrire des APIs, construire des composants et corriger des bugs.

**Statut des tests** : chaque résultat d'exécution de test est affiché. Les tests passants augmentent et les tests en échec diminuent. Lorsque les échecs commencent à baisser, le projet approche de l'achèvement.

### Vérification post-achèvement

Après que Ralph produit le marqueur d'achèvement, effectuez une vérification manuelle :

```bash
# tests backend
cd backend
npm test

# tests frontend
cd frontend
npm test

# démarrer le backend
cd backend
npm start

# démarrer le frontend (dans un autre terminal)
cd frontend
npm run dev
```

Ouvrez le navigateur et testez :

1. inscrivez un nouvel utilisateur
2. connectez-vous
3. parcourez les publications
4. publiez une nouvelle publication
5. ajoutez un commentaire
6. ouvrez le centre de profil
7. déconnectez-vous et connectez-vous en tant qu'administrateur (compte par défaut : admin/admin123)
8. testez les fonctionnalités du backend d'administration

### Remarques

Ralph Loop est puissant, mais gardez ces points à l'esprit :

**Premièrement, des prompts plus détaillés produisent de meilleurs résultats.** Des prompts ambigus nécessitent plus d'itérations pour correction.

**Deuxièmement, fixez des plafonds d'itérations raisonnables.** Les systèmes BBS sont complexes ; recommandez au moins 100 itérations.

**Troisièmement, le TDD est recommandé.** Écrire les tests d'abord peut réduire significativement le temps de débogage.

**Quatrièmement, une vérification manuelle finale est requise.** L'IA peut manquer des cas marginaux ou des scénarios spéciaux, en particulier dans les chemins sensibles à la sécurité.

**Cinquièmement, prêtez une attention particulière à la conception du schéma.** Ralph peut avoir besoin de plusieurs itérations avant d'obtenir un schéma robuste.

---

## Comparaison et sélection des méthodes

Chaque méthode a ses propres caractéristiques et s'adapte à différents scénarios.

La boucle While True est la plus simple : seulement 5 lignes pour fonctionner, bonne pour des expériences rapides et des prototypes. Mais elle est limitée et ne détecte pas le véritable achèvement, se fiant uniquement aux plafonds d'itérations.

Ralph Wiggum est la recommandation générale pour la plupart des scénarios. Il a un mécanisme complet de Stop Hook, supporte les vérifications de marqueurs d'achèvement, a un support officiel et une documentation solide.

Le Ralph amélioré est meilleur pour les environnements de production, avec des doubles conditions de sortie, des limites de débit et un disjoncteur intelligent.

Les tâches en arrière-plan sont utiles pour l'exécution non bloquante simple : appuyez juste sur `Ctrl+B`. Mais c'est seulement de l'exécution en arrière-plan, pas de l'orchestration de boucle itérative.

---

## Résumé

L'idée centrale pour faire travailler Claude Code à long terme est simple : ne lui demandez pas de "terminer en une seule fois," demandez-lui de "continuer à essayer jusqu'au véritable achèvement."

Toutes les méthodes font fondamentalement la même chose : donner une tâche à Claude, le laisser fonctionner, vérifier si l'achèvement est réel, et si non, continuer le tour suivant.

Quelle méthode choisir dépend de vos besoins.

Si vous voulez du simple et rapide, utilisez la boucle While True. Cinq lignes peuvent fonctionner, mais les fonctionnalités sont limitées.

Si vous voulez la recommandation générale, utilisez Ralph Wiggum. Support officiel, capacité complète, adapté à la plupart des cas.

Si c'est pour une utilisation en production, utilisez le Ralph amélioré. Il a des mécanismes de sécurité supplémentaires et est plus fiable.

(Pour la collaboration multi-agent Agent Teams, voir la section suivante : "3.3 Agent Teams collaboration multi-agent.")

J'espère que ce chapitre vous aide à utiliser Claude Code plus efficacement pour que l'IA devienne un véritable outil de productivité plutôt que seulement un chatbot.

---

## Références

### Ressources officielles

- [Documentation officielle Claude Code](https://docs.anthropic.com/en/docs/claude-code) - documentation officielle complète de Claude Code
- [README du plugin Ralph Wiggum](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - documentation officielle du plugin
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - documentation officielle du système Hooks

### Projets communautaires

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k étoiles) - implémentation améliorée de Ralph avec des garde-fous supplémentaires
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - ressources et exemples Ralph sélectionnés
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - génération PRD + intégration de boucle Ralph
- [snarktank/ralph](https://github.com/snarktank/ralph) - implémentation originale de Ralph

### Articles et tutoriels

**Ressources en anglais**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - concept original de Ralph par son créateur
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - lecture approfondie du blog d'ingénierie Anthropic
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - guide d'utilisation complet

**Tutoriels en chinois**

- [Tutoriel pour débutants - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - guide détaillé d'installation et d'utilisation
- [Analyse approfondie - Toutiao](https://m.toutiao.com/a7585579989207188006/) - mécanisme et principes fondamentaux
- [Guide complet full-stack en langage simple](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - parcours complet des principes à la pratique
- [Guide débutant et pratique - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - bases et exemples pratiques
- [Plongée profonde dans Ralph Loop - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - détails du mécanisme Stop Hook
- [Moteur perpétuel Claude Code - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - plongée profonde dans le plugin d'itération en boucle infinie
- [Démarrage pour nouveaux utilisateurs de Ralph Loop - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - meilleures pratiques et résumé de prompts

### Études de cas pratiques

- [Langage de programmation CURSED](https://github.com/geoffreyhuntley/cursed) - langage de programmation complet construit avec Ralph sur 3 mois
- [Les 30 jours de Boris Cherny](https://twitter.com/boriskirov/status/1756002385683786616) - partage de cas de 259 PRs
- [Hackathon Y Combinator](https://github.com/geoffreyhuntley/ralph) - cas de génération de 6 projets en une nuit
- [Blog de Geoffrey Huntley](https://ghuntley.com/) - blog technique du créateur
