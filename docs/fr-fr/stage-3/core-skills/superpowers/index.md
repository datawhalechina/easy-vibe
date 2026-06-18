# Superpowers de Claude Code pour le développement de niveau ingénierie

## Introduction aux Superpowers

**Superpowers** est un framework de compétences d'agent open-source créé par Jesse Vincent (pseudo en ligne : obra), spécifiquement conçu pour résoudre un problème central de la programmation IA : comment faire en sorte que l'IA produise du code de « niveau ingénierie » plutôt que du code de « niveau jouet ».

Imaginez un assistant de codage IA normal comme un « stagiaire intelligent ». Il peut écrire du code exécutable, mais il peut n'avoir aucun test, aucune documentation et aucune discipline de bonnes pratiques. Superpowers, c'est comme assigner un « mentor ingénieur senior » à ce stagiaire, le forçant à suivre un processus complet de développement logiciel.

### Pourquoi avons-nous besoin de Superpowers ?

Avant Superpowers, plusieurs problèmes existaient lors de l'utilisation de Claude Code :

- **Chaos dans le vibe coding** : l'IA commence à coder directement sans planification, causant de fréquents retravails
- **Manque de discipline TDD** : l'IA tend à écrire le code d'abord et à ajouter les tests ensuite, ou à les sauter entièrement
- **Codage avec des besoins vagues** : l'utilisateur dit « construis une fonctionnalité de connexion », l'IA commence immédiatement, et le résultat n'est pas ce qui était voulu
- **Qualité de code instable** : aucun mécanisme de revue de code, donc la qualité dépend de « l'humeur » de l'IA

Superpowers résout ces problèmes et transforme Claude en une « équipe de développement disciplinée ». Il aide à clarifier les besoins d'abord, puis crée un plan, développe ensuite avec TDD, et assure finalement la qualité via la revue de code.

---

## Démarrage rapide

### Étape 1 : Installer Superpowers

Exécutez dans Claude Code :

```bash
# Ajouter le marketplace
/plugin marketplace add obra/superpowers-marketplace

# Installer superpowers
/plugin install superpowers@superpowers-marketplace
```

Ou clonez manuellement :

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Étape 2 : Essayez votre première compétence

Utilisons la compétence **brainstorming** de Superpowers pour expérimenter sa valeur.

Dans Claude Code, tapez :

```text
Construisez-moi une fonctionnalité de connexion utilisateur
```

**Avant Superpowers** : Claude commence à écrire du code directement et peut produire quelque chose que vous ne voulez pas vraiment.

**Avec Superpowers** : Claude utilise des questions socratiques pour aider à clarifier les besoins :

> Cette fonctionnalité de connexion est-elle pour une application Web ou mobile ?
>
> Quelles méthodes de connexion sont requises ? Email/mot de passe ? Connexion tierce (Google, GitHub) ?
>
> Avez-vous besoin d'une fonctionnalité « Se souvenir de moi » ?
>
> La réinitialisation du mot de passe doit-elle se faire par email ou SMS ?
>
> ...

Ces questions vous forcent à clarifier ce dont vous avez réellement besoin avant de coder, évitant beaucoup de code inutilisé.

### Étape 3 : Comprendre les mécanismes de déclenchement des compétences

Superpowers n'est pas un « interrupteur magique ». C'est un **ensemble de compétences**. Comprendre comment les compétences sont déclenchées est important.

**Trois méthodes de déclenchement :**

1. **Déclenchement par mot-clé**
   - Quand vous mentionnez « TDD », « développement piloté par les tests » ou « écrire les tests d'abord »
   - La compétence `test-driven-development` est activée

2. **Déclenchement par scénario**
   - Quand les besoins sont flous, `brainstorming` pose des questions proactives
   - Quand des bugs apparaissent, `systematic-debugging` est activé

3. **Invocation manuelle**
   - Utilisez directement les noms de compétences, comme : `/test-driven-development`

#### 💡 Clarification importante : Que se passe-t-il si vous ne spécifiez pas TDD ?

C'est un malentendu courant. Clarifions :

```text
# Cas A : TDD non mentionné
"Implémentez une calculatrice"
-> Claude peut écrire des tests, ou peut ne pas le faire
-> Dépend des propres habitudes du modèle

# Cas B : TDD explicitement demandé
"Implémentez une calculatrice avec TDD"
-> La compétence test-driven-development est activée
-> RED-GREEN-REFACTOR est appliqué
```

**La vraie valeur de Superpowers** : non pas créer des capacités à partir de rien, mais renforcer la discipline.

- Sans la compétence TDD : Claude écrivant des tests est « peut-être »
- Avec la compétence TDD : Claude est forcé de suivre le flux TDD

### Comprendre la valeur de Superpowers

À partir de l'explication ci-dessus, la valeur fondamentale de Superpowers est claire :

1. **Besoins d'abord** : `brainstorming` questionne activement quand les besoins sont vagues
2. **Discipline de processus** : `test-driven-development` applique le cycle TDD rouge-vert-réfacter
3. **Décomposition des tâches** : `writing-plans` découpe les grands projets en petites tâches
4. **Contrôle qualité** : les compétences `code-review` assurent la qualité du code

---

## Compétences fondamentales de Superpowers en détail

Superpowers inclut **plus de 20 compétences composables** couvrant le cycle logiciel complet. Passons-les en revue par catégorie.

### 🧪 Compétences de test

#### test-driven-development

**Comment déclencher** : mentionnez des mots-clés comme « TDD », « développement piloté par les tests » ou « écrire les tests d'abord ».

**Ce que fait cette compétence** : force Claude à suivre le cycle TDD rouge-vert-réfacter au lieu de « peut-être écrire des tests plus tard ».

**Approche traditionnelle** (problèmes courants) :
1. Écrire le code directement
2. Faire un test manuel rapide
3. Trouver des bugs et corriger le code
4. Répéter... (des tests ? peut-être la prochaine fois)

**Approche TDD** (après activation de la compétence) :
1. 🔴 **RED** : écrire d'abord un test qui échoue
2. 🟢 **GREEN** : écrire le code minimal pour passer le test
3. 🔵 **REFACTOR** : refactoriser tout en gardant les tests au vert
4. Répéter

**Exemple d'utilisation** :

```text
Implémentez un module d'authentification utilisateur en utilisant TDD
```

Claude va :
1. Écrire les tests d'abord (validation nom d'utilisateur/mot de passe, génération de token, etc.)
2. Exécuter les tests et confirmer que tous échouent (RED)
3. Écrire le code d'implémentation minimal
4. Exécuter les tests et confirmer le succès (GREEN)
5. Refactoriser le code et extraire la logique partagée
6. Exécuter les tests à nouveau et confirmer le succès (REFACTOR)

> **Note** : si vous ne mentionnez pas « TDD », Claude peut ou non écrire des tests. Le rôle de la compétence est d'**appliquer la discipline de processus** pour que les tests ne soient pas « oubliés ».

### 🐛 Compétences de débogage

#### systematic-debugging

Quand des bugs apparaissent, les développeurs humains essaient souvent des corrections aléatoires. Superpowers applique une analyse des causes fondamentales en quatre étapes :

**Étape 1 : Reproduire le problème**
- Confirmer que le bug peut être reproduit de manière cohérente
- Enregistrer les étapes exactes de reproduction

**Étape 2 : Isoler la cause fondamentale**
- Réduire la portée en utilisant une réduction de style recherche binaire
- Ajouter des logs pour localiser le code problématique

**Étape 3 : Valider les hypothèses**
- Proposer des hypothèses de cause fondamentale
- Concevoir des expériences de validation

**Étape 4 : Corriger et vérifier**
- Implémenter la correction
- Confirmer que le bug est résolu
- Ajouter des tests de régression

#### verification-before-completion

Cette compétence empêche Claude de s'arrêter quand les choses ne semblent que « à peu près assez bonnes ». Avant de déclarer l'achèvement, elle exige que Claude :

1. Exécute tous les tests
2. Teste manuellement les fonctionnalités clés
3. Vérifie la qualité du code (lint)
4. Confirme que la documentation est à jour

### 🤝 Compétences de collaboration

#### brainstorming

C'est l'une des compétences Superpowers les plus intéressantes. Elle utilise le questionnement socratique pour clarifier les besoins.

**Comment ça fonctionne** : quand vous fournissez un besoin vague, Claude ne commence pas à coder directement. Il pose des questions :

```text
Vous : Construisez un système de blog

Claude :
- Pour qui est ce blog ? Lecteurs techniques ou grand public ?
- L'édition Markdown devrait-elle être supportée ?
- Avez-vous besoin de commentaires ?
- Avez-vous besoin de recherche ?
- Un seul utilisateur ou multi-auteurs ?
- ...
```

Ces questions vous forcent à réfléchir aux fonctionnalités réellement nécessaires, évitant beaucoup de fonctionnalités inutilisées.

#### writing-plans

Cette compétence décompose les grandes tâches en petites tâches réalisables chacune en 2 à 5 minutes.

**Exemple** :

```text
Utilisez writing-plans pour planifier le développement d'une API todo
```

Claude générera un plan détaillé :

```markdown
# Plan d'implémentation

## Tâche 1 : Concevoir le schéma de base de données (estimé 5 minutes)
- Créer la table todos
- Définir les champs : id, title, completed, createdAt

## Tâche 2 : Créer les routes Express (estimé 10 minutes)
- POST /todos - créer une tâche
- GET /todos - lister les tâches
- GET /todos/:id - obtenir une tâche
- PUT /todos/:id - mettre à jour
- DELETE /todos/:id - supprimer

## Tâche 3 : Ajouter la validation des entrées (estimé 10 minutes)
- title ne peut pas être vide
- completed doit être booléen

## Tâche 4 : Écrire les tests (estimé 15 minutes)
- Écrire des tests pour chaque endpoint
- Couvrir les cas limites

## Tâche 5 : Démarrer le serveur et vérifier (estimé 5 minutes)
- Exécuter les tests
- Tester l'API manuellement

Critères d'acceptation :
- Tous les tests passent
- Le test curl passe pour chaque endpoint
```

#### executing-plans

Cette compétence exécute un plan par lots et s'arrête à chaque point de contrôle pour confirmation.

**Exemple d'utilisation** :

```text
Exécutez le plan ci-dessus, et faites une pause après chaque tâche terminée
```

Claude va :
1. Terminer la tâche 1, puis s'arrêter : `✅ Schéma de base de données terminé. Continuer ?`
2. Après votre confirmation, terminer la tâche 2 et s'arrêter à nouveau
3. Et ainsi de suite

Cela vous permet de vérifier la direction à chaque étape, évitant de découvrir trop tard que les choses ont dévié.

#### dispatching-parallel-agents

Cette compétence peut lancer plusieurs sous-agents en parallèle.

**Cas d'utilisation** : quand vous devez traiter plusieurs tâches indépendantes simultanément.

```text
Utilisez des agents parallèles pour compléter :
- Agent A : écrire les API backend
- Agent B : écrire les composants frontend
- Agent C : écrire les tests
```

Chaque agent travaille dans son propre environnement isolé sans interférence.

#### subagent-driven-development

Cette compétence lance un sous-agent indépendant pour chaque petite tâche.

**Avantages** :
- Chaque sous-agent a un contexte isolé
- L'échec d'une tâche n'affecte pas les autres
- Plusieurs tâches peuvent s'exécuter en parallèle

#### using-git-worktrees

Cette compétence utilise Git worktree pour créer des environnements de développement isolés.

**Bénéfices** :
- Plusieurs fonctionnalités peuvent être développées en parallèle
- Chaque worktree est indépendant
- Pas de conflits mutuels

### 👀 Compétences de revue de code

#### requesting-code-review

Après l'achèvement du code, cette compétence demande automatiquement une revue de code.

```text
Déclenchez automatiquement la revue de code après avoir terminé la fonctionnalité
```

#### receiving-code-review

Cette compétence définit comment recevoir et traiter les retours de revue.

**Flux de revue** :
1. Soumettre le code
2. Déclencher la revue automatiquement
3. Le réviseur vérifie la qualité du code, la sécurité et la couverture de tests
4. Le réviseur fournit des suggestions d'amélioration
5. Corriger les problèmes
6. Nouvelle revue jusqu'à approbation

---

## Flux de travail complet des Superpowers

La vraie puissance de Superpowers vient de la combinaison de plusieurs compétences en un flux de développement complet.

### Flux de développement standard

```text
1. Brainstorming
   ↓ Clarifier les vrais besoins par Q&A

2. Document de design
   ↓ Présenter le design par morceaux et attendre confirmation

3. Writing Plans
   ↓ Découper en tâches de 2-5 minutes

4. Développement sous-agent
   ↓ Lancer un sous-agent isolé par tâche
   ↓ Revue en deux étapes : conformité spéc + qualité code

5. TDD
   ↓ Appliquer RED-GREEN-REFACTOR

6. Revue de code
   ↓ Porte de qualité

7. Terminé
```

### Exemple pratique : Construire un système d'authentification utilisateur avec Superpowers

Expérimentons le flux Superpowers à travers un exemple complet.

#### Étape 1 : Clarifier les besoins avec le Brainstorming

```text
J'ai besoin d'un système d'authentification utilisateur
```

Claude demandera :
- Est-ce une application Web ou mobile ?
- Quelles méthodes de connexion sont requises ?
- La réinitialisation du mot de passe est-elle nécessaire ?
- La fonctionnalité « Se souvenir de moi » est-elle nécessaire ?
- ...

#### Étape 2 : Générer un document de design

Après confirmation des besoins, Claude produira un document de design :

```markdown
# Design du système d'authentification utilisateur

## Besoins fonctionnels
1. Inscription utilisateur (email + mot de passe)
2. Connexion utilisateur
3. Réinitialisation du mot de passe (email)
4. Se souvenir de moi (JWT + Refresh Token)

## Choix technologiques
- Backend : Node.js + Express
- Base de données : SQLite
- Auth : JWT
- Chiffrement : bcrypt

## Design API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Étape 3 : Écrire le plan d'implémentation

```text
Utilisez writing-plans pour créer le plan d'implémentation
```

Claude générera une liste détaillée de tâches, chaque tâche réalisable en 2-5 minutes.

#### Étape 4 : Exécuter le développement

```text
Exécutez le plan ci-dessus avec TDD
```

Claude va :
1. Écrire les tests d'abord
2. Confirmer que les tests échouent (RED)
3. Écrire le code d'implémentation
4. Confirmer que les tests passent (GREEN)
5. Refactoriser le code (REFACTOR)

#### Étape 5 : Revue de code

Après achèvement, la revue de code est déclenchée automatiquement pour vérifier :
- la qualité du code
- la sécurité (injection SQL, XSS, etc.)
- la couverture de tests
- l'exhaustivité de la documentation

---

## Superpowers vs utilisation directe de Claude Code

| Dimension | Utilisation directe de Claude Code | Utilisation de Superpowers |
|------|---------------------|-----------------|
| **Clarification des besoins** | L'IA commence à coder directement | Questions socratiques clarifient les besoins d'abord |
| **Processus de développement** | Libre selon l'IA | TDD rouge-vert-réfacter appliqué |
| **Gestion des tâches** | Achèvement en une seule fois | Découpé en petites tâches avec points de contrôle |
| **Qualité du code** | Dépend du jugement de l'IA | Revue de code imposée |
| **Prévisibilité** | Résultats instables | Processus reproductible |
| **Meilleur pour** | Tâches simples, validation de prototype | Projets complexes, code de production |

### Métaphore visuelle

Si Claude Code est un « stagiaire intelligent » :

- **Utilisation directe** : dites au stagiaire « construis une fonctionnalité de connexion », et il commence à coder tout de suite, produisant possiblement quelque chose hors cible
- **Avec Superpowers** : assignez au stagiaire un mentor senior qui clarifie les besoins, crée des plans et vérifie la qualité du code

---

## Installation et configuration en détail

### Méthode 1 : Via le Marketplace (recommandée)

```bash
# Ajouter le marketplace
/plugin marketplace add obra/superpowers-marketplace

# Installer
/plugin install superpowers@superpowers-marketplace

# Vérifier l'installation
/skills
```

### Méthode 2 : Clone manuel

```bash
# Créer le répertoire
mkdir -p ~/.claude/skills

# Cloner le dépôt
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Méthode 3 : Installation au niveau projet

Si vous souhaitez utiliser Superpowers dans un projet spécifique :

```bash
# À la racine du projet
mkdir -p .claude/skills

# Cloner ou copier superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Cela permet aux membres de l'équipe de partager la même configuration Superpowers.

---

## Référence rapide des compétences courantes

| Nom de la compétence | Fonction | Cas d'utilisation |
|---------|------|---------|
| `brainstorming` | Clarifier les besoins par questionnement socratique | Quand les besoins sont flous |
| `writing-plans` | Découper les tâches en petites étapes | Avant de commencer de grands projets |
| `executing-plans` | Exécuter le plan avec points de contrôle | Pendant le développement piloté par plan |
| `test-driven-development` | Boucle TDD rouge-vert-réfacter | Pour tout développement de fonctionnalité |
| `systematic-debugging` | Analyse des causes fondamentales en quatre étapes | Quand des bugs apparaissent |
| `verification-before-completion` | Vérification avant achèvement | À l'achèvement d'une tâche |
| `requesting-code-review` | Demander une revue de code | Avant la soumission du code |
| `subagent-driven-development` | Développement piloté par sous-agents | Tâches parallèles |
| `using-git-worktrees` | Isolation Git worktree | Développement parallèle de fonctionnalités |

---

## Bonnes pratiques

### 1. Utiliser des mots-clés de déclenchement clairs

Les compétences Superpowers sont déclenchées par mots-clés. Apprenez les mots-clés courants :

| Compétence | Mots-clés de déclenchement |
|------|-----------|
| `test-driven-development` | « TDD », « développement piloté par les tests », « écrire les tests d'abord » |
| `brainstorming` | Déclenché automatiquement quand les besoins sont flous |
| `systematic-debugging` | « debug », « bug », « ne fonctionne pas » |
| `writing-plans` | « faire un plan », « planification » |

### 2. Utiliser Superpowers quand la discipline de processus est nécessaire

- Développement de code de niveau production -> mentionnez « TDD »
- Besoins flous -> laissez `brainstorming` clarifier
- Projet complexe -> utilisez `writing-plans` pour décomposer les tâches

### 3. Ne pas forcer pour les tâches simples

S'il s'agit d'un prototype rapide ou d'un script jetable, vous n'avez pas besoin du processus complet. Superpowers est le plus adapté au code nécessitant une maintenance à long terme.

### 4. Les compétences peuvent être combinées

```text
Implémentez l'authentification utilisateur avec TDD, et après achèvement, aidez-moi à faire une revue de code
```

Cela déclenche à la fois les compétences `test-driven-development` et `code-review`.

---

## Questions fréquemment posées

### Q1 : Dois-je obligatoirement spécifier « TDD » en utilisant Superpowers ?

**Non obligatoire**.

Superpowers est un ensemble de compétences, et chaque compétence a ses propres conditions de déclenchement :
- Dire « utiliser TDD » -> déclenche `test-driven-development`
- Ne pas dire TDD -> Claude peut ou non écrire des tests (dépend du comportement du modèle)

Superpowers existe pour **appliquer la discipline de processus**, non pour créer des capacités à partir de rien.

### Q2 : Superpowers ralentit-il le développement ?

Au début, cela peut sembler plus lent car :
- la clarification des besoins prend du temps
- les tests sont écrits avant le code
- la revue de code est requise

Mais à long terme, l'efficacité globale s'améliore grâce à la réduction du retravail et à la diminution des bugs.

### Q3 : Les petits projets ont-ils aussi besoin de Superpowers ?

Pour la validation de prototype ou des tâches très simples, vous pouvez utiliser Claude Code directement. Superpowers est mieux adapté à :
- les projets de niveau production
- la collaboration multi-personnes
- la maintenabilité à long terme

### Q4 : Quelle est la différence entre Superpowers et Skills ?

| Dimension | Superpowers | Skills |
|------|-------------|--------|
| **Nature** | Framework complet de méthodologie de développement | Paquets de compétences réutilisables |
| **Portée** | Couvre le processus de développement complet | Se concentre sur des fonctions spécifiques |
| **Relation** | Superpowers utilise des Skills en interne | Superpowers est une collection de Skills |

### Q5 : Puis-je personnaliser les compétences Superpowers ?

Oui. Superpowers est open-source, et vous pouvez :
1. Forker le dépôt
2. Modifier les compétences existantes
3. Ajouter de nouvelles compétences
4. Contribuer en retour à la communauté

---

## Références

### Ressources officielles

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - dépôt officiel (50 000+ ⭐)
- [Tutoriel détaillé d'utilisation de Superpowers](https://www.cnblogs.com/gyc567/p/19510203) - tutoriel chinois détaillé
- [Guide de configuration de l'environnement Superpowers](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - guide de configuration

### Ressources communautaires

| Dépôt | Description |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | boîte à outils complète incluant les flux de travail TDD |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | pratiques communautaires |

### Articles connexes

- [Au revoir le Vibe Coding ! Utilisez Superpowers pour que Claude Code écrive du code de niveau ingénierie](https://juejin.cn/post/7593573617648123956)
- [Comment j'utilise Superpowers MCP pour forcer Claude Code à planifier avant de coder](https://juejin.cn/post/7570341520551673871)
- [Tutoriel débutant Claude Code + Superpowers](https://juejin.cn/post/7594832320030638123)

---

## Résumé

Superpowers est un ensemble de **compétences de développement de niveau ingénierie** qui fait évoluer Claude Code d'un « stagiaire intelligent » à une « équipe de développement disciplinée ».

### Points clés à retenir

1. **Superpowers est un ensemble de compétences, pas de la magie**
   - Après installation, les compétences sont disponibles en arrière-plan
   - Déclenchées via mots-clés ou scénarios
   - Vous pouvez invoquer manuellement des compétences spécifiques

2. **Retenez les phrases de déclenchement clés**
   - Vous voulez TDD -> dites « utiliser TDD »
   - Besoins vagues -> `brainstorming` questionne proactivement
   - Un bug apparaît -> mentionnez « debug » pour déclencher `systematic-debugging`

3. **Scénarios les plus adaptés**
   - ✅ Développement de code de niveau production
   - ✅ Projets maintenables à long terme
   - ✅ Projets de collaboration d'équipe
   - ❌ Prototypes rapides (optionnel)
   - ❌ Scripts jetables (optionnel)

Souvenez-vous : **Superpowers ne rend pas l'IA plus intelligente ; il rend l'IA plus disciplinée.**
