# Guide complet des Claude Code Skills

## Introduction aux Skills

**Claude Code Skills** est une fonctionnalité qui regroupe des connaissances specialisees, des flux de travail et des meilleures pratiques dans des « packs de competences » reutilisables.

Vous pouvez imaginer les Skills comme des « livres de competences » equipes pour Claude. Lorsque vous avez besoin qu'il accomplisse une tache specifique, vous n'avez plus besoin d'expliquer les exigences encore et encore. Il peut directement executer le travail selon les normes predefinies par le Skill.

### Pourquoi avons-nous besoin des Skills ?

Avant l'existence des Skills, l'utilisation de Claude Code presentait plusieurs problemes :

- **Instructions repetees** : a chaque fois, vous deviez expliquer des choses comme « quel style de codage suivre » et « comment les messages de commit doivent etre ecrits »
- **Connaissances non accumulables** : l'experience individuelle des membres de l'equipe avec Claude ne pouvait pas etre partagee
- **Standards incoherents** : differentes personnes utilisant Claude pouvaient obtenir des resultats completement differents
- **Faible efficacite** : les taches courantes devaient etre expliquees de zero a chaque fois

Les Skills resolvent ces problemes et transforment Claude en un « membre experimente de l'equipe » - il connait les conventions de votre projet, les flux de travail et les meilleures pratiques.

---

## Pourquoi apprendre les Skills maintenant ?

**Les Skills deviennent une competence indispensable pour les ingenieurs IA** :

- **Fort interet de la communaute** : les depots GitHub lies gagnent rapidement des etoiles. Par exemple, le projet OpenSkills a deja atteint 7,2k etoiles, et Obsidian Skills a gagne 6,6k etoiles en seulement 9 jours
- **Support officiel** : Anthropic maintient un depot officiel de Skills, et Vercel a lance Agent Skills et l'outil find-skills
- **Tres pratique** : de la revue de code et des operations Git a la creation de videos et la generation de PPT, les Skills couvrent de nombreux scenarios. La plateforme skills.sh a deja des skills populaires avec plus de 60K abonnements
- **Gains d'efficacite** : configurez une fois, reutilisez plusieurs fois, et laissez Claude devenir veritablement votre « employe numerique »
- **Reconnaissance des developpeurs** : recommande par plusieurs communautes techniques et largement considere comme un outil cles pour ameliorer l'efficacite de la programmation IA

---

## Demarrage rapide

Maintenant que vous comprenez la valeur des Skills, essayons-les tout de suite. Cette section vous guidera dans l'installation de votre premier Skill et la realisation de quelques taches pratiques interessantes pour rapidement developper votre intuition.

### Etape 1 : Installer `find-skills` (fortement recommande)

Avant de commencer a utiliser les Skills, il est fortement recommande d'installer d'abord `find-skills`. C'est le « moteur de recherche de skills ultime » dans le monde des AI Agents et il a deja plus de 60K abonnements.

**Qu'est-ce que `find-skills` ?**

Pour faire simple, `find-skills` est comme un « moteur de recherche d'app store » pour les AI Agents. Lorsque vous devez accomplir une tache mais n'avez pas de Skill local adapte, il recherchera automatiquement et recommandera le plus approprie.

**Installer `find-skills` :**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

Apres l'installation, vous pouvez directement dire a Claude ce dont vous avez besoin, et il utilisera `find-skills` pour rechercher automatiquement les skills pertinents.

**Exemple d'utilisation :**

```text
J'ai besoin d'optimiser les performances d'un composant React. Aide-moi a trouver quels skills je peux utiliser.
```

Claude recherchera via `find-skills`, puis vous dira quels skills pertinents il a trouves pour que vous puissiez en choisir un a installer.

**Pourquoi installer `find-skills` en premier ?**

Avant `find-skills` :
- rechercher manuellement sur GitHub les skills connexes
- copier, installer et configurer un par un
- deboguer et adapter repetitivement

Apres `find-skills` :
- decrire le besoin en une seule phrase
- l'IA recherche automatiquement le skill le mieux adapte
- installer en un clic et l'utiliser immediatement

**Remarque pour les utilisateurs Windows** : la version officielle a un support Windows limite. La communaute a cree une version compatible Windows qui prend en charge CMD et PowerShell et ajoute la recherche en chinois.

Telecharger la version Windows : [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Etapes d'installation :
1. Telecharger la version Windows de `SKILL.md`
2. Remplacer le fichier dans `C:/Users/your-username/.agents/skills/find-skills`
3. Redemarrer Claude Code pour que cela prenne effet

**Liens connexes** :
- [Site officiel de Skills](https://skills.sh/) - parcourir tous les skills disponibles
- [Depot find-skills](https://github.com/vercel-labs/agent-skills) - code source officiel

### Installer et essayer votre premier Skill

Apres avoir installe `find-skills`, utilisons-le pour rechercher et installer un premier Skill amusant : l'outil de creation video Remotion.

#### Etape 1 : Utiliser `find-skills` pour rechercher Remotion

Tapez ceci dans Claude Code :

```text
Aide-moi a trouver des skills lies a Remotion. Je veux faire des videos.
```

Claude recherchera via `find-skills` et recommandera `remotion-dev/skills`.

#### Etape 2 : Installer les Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### Etape 3 : L'utiliser pour creer quelque chose d'interessant

Remotion est un framework pour creer des videos avec du code React. Apres avoir installe ce Skill, vous pouvez demander a Claude en langage naturel de vous aider a ecrire du code video.

**Tache 1 : Creer une video de texte anime**

```text
Utilise Remotion pour faire une video :
- 1920x1080, 5 secondes
- Une ligne de texte « Hello World » qui arrive en volant depuis la gauche
- Avec des effets de rotation et de mise a l'echelle en meme temps
- Le fond est un degrade
```

Claude generera du code Remotion complet, et vous pourrez l'executer pour voir l'animation.

**Tache 2 : Creer une video de visualisation de donnees**

```text
Fais une video de 10 secondes montrant la croissance des donnees :
- Commence avec un graphique a barres
- Les barres poussent une par une avec animation
- Les chiffres montent progressivement
- A la fin, affiche un texte en grand disant « 300% de croissance »
```

**Tache 3 : Creer une video de demo produit multi-scenes**

```text
Fais une video de demo produit avec trois scenes :
Scene 1 : Le logo apparait en fondu, 2 secondes
Scene 2 : Les fonctionnalites du produit apparaissent une par une, 3 secondes
Scene 3 : Le bouton CTA apparait, 2 secondes
Utilise des transitions fluides entre chaque scene
```

**Executer le code** :

Le code que Claude genere est un projet Remotion complet. Vous pouvez :

1. Creer un nouveau projet : `npx create-video my-video`
2. Y copier le code genere par Claude
3. Lancer un apercu : `npm start`
4. Rendre la video : `npm run build`

---

### Le deuxieme Skill : Utiliser `find-skills` pour resoudre « le frontend est laid et lent »

#### Etape 1 : Decrivez votre probleme en langage naturel

Dites directement a Claude votre besoin general :

```text
Mon site web a l'air vieillot et se charge lentement. Aide-moi a trouver quels skills je peux utiliser.
```

Ou soyez un peu plus precis :

```text
Je veux que le frontend soit plus beau et qu'il ne soit plus aussi saccade.
```

#### Etape 2 : Claude recherchera avec `find-skills`

Claude recherchera dans la base de donnees skills.sh via `find-skills` et recommandera les skills connexes. Pour un besoin comme « rendre plus beau + reduire la lenteur », il recommandera :

**anthropics/skills/frontend-design** (skill officiel)

Ce skill est specialement concu pour resoudre le probleme des interfaces generees par IA qui « ont l'air fades et generiques », aidant Claude a concevoir :

- des styles visuels uniques qui evitent le meme « look de modele IA » habituel
- des palettes de couleurs et une typographie professionnelles
- des effets d'animation fluides
- une qualite de code de niveau production, avec un code propre et de meilleures performances naturelles

#### Etape 3 : Installer et utiliser

**Installer** :

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Taches que vous pouvez accomplir avec** :

```text
Aide-moi a refaire le design de cette page. Je veux qu'elle ait l'air tres professionnelle et pas comme si elle avait ete generee par une IA.
```

```text
Cette UI est trop laide. Reecris-la dans un style de design plus moderne.
```

```text
Fais un tableau de bord en theme sombre avec un fort cote technologique.
```

Claude suivra les conventions de ce skill et vous aidera a concevoir :
- une direction visuelle unique telle que le minimalisme, le retro-futurisme ou le brutalisme
- des couleurs et polices soigneusement choisies
- un espacement et une mise en page raisonnables
- une animation interactive fluide

---

### Comparaison des deux Skills

| Skills | Quel probleme resout-il ? | Facteur amusant |
|--------|-------------|---------|
| **remotion-dev/skills** | Faire des videos avec du code | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Rendre le frontend plus beau | ⭐⭐⭐⭐ |

---

### Le troisieme Skill : Utiliser `frontend-slides` pour creer rapidement de belles presentations PPT

#### Introduction

**frontend-slides** est un Skill qui vous permet de creer de belles presentations HTML en langage naturel - meme si vous ne connaissez pas du tout CSS ou JavaScript.

Son idee centrale est « **montrer, ne pas dire** ». Si vous ne pouvez pas clairement decrire le style de design que vous souhaitez, il generera 3 aperçus visuels parmi lesquels choisir, plutot que de vous forcer a decrire des exigences abstraites comme « fond bleu, grande police ».

#### Installer `frontend-slides`

**Methode 1 : Installer manuellement**

```bash
# Creer le repertoire du skill
mkdir -p ~/.claude/skills/frontend-slides

# Telecharger les fichiers (ou copier depuis GitHub)
# 1. Visiter https://github.com/zarazhangrui/frontend-slides
# 2. Telecharger SKILL.md et STYLE_PRESETS.md
# 3. Les placer dans ~/.claude/skills/frontend-slides/
```

**Methode 2 : Installer avec `find-skills`**

```text
Aide-moi a trouver un skill pour faire des presentations PPT
```

Claude recherchera via `find-skills` et recommandera `frontend-slides`.

#### Scenarios d'utilisation

**Scenario 1 : Creer une presentation de zero**

```text
/frontend-slides

Je veux creer une presentation de levée de fonds pour un projet de startup IA, environ 10 diapositives
```

Claude vous guidera pour :
1. remplir le contenu de chaque diapositive tels que titres, points cles et images
2. decrire le rendu souhaite tel que impressionnant, professionnel ou chaleureux
3. choisir parmi 3 aperçus de styles visuels
4. creer la presentation HTML complete
5. ouvrir un apercu dans le navigateur

**Scenario 2 : Convertir un fichier PowerPoint**

```text
/frontend-slides

Convertis ma presentation.pptx en une presentation web
```

Claude va :
1. extraire tout le texte, les images et les notes du PPT
2. afficher le contenu extrait pour que vous le confirmiez
3. vous laisser choisir un style visuel
4. generer une presentation HTML qui preserve tout le contenu original

**Scenario 3 : Generer rapidement des aperçus de styles**

```text
/frontend-slides

Je veux faire un PPT pour une conference technique. Montre-moi d'abord les styles visuels disponibles.
```

Claude generera directement 3 pages d'apercu dans differents styles :
- **Themes sombres** : Neon Cyber, Terminal Green, Deep Space
- **Themes clairs** : Paper & Ink, Swiss Modern, Soft Pastel
- **Styles speciaux** : Brutalist, Gradient Wave

#### Styles visuels integres

| Nom du style | Caracteristiques | Scenarios adaptes |
|---------|------|---------|
| **Neon Cyber** | Aspect tech futuriste, effets de particules | Conferences techniques, produits IA |
| **Midnight Executive** | Business haut de gamme, digne de confiance | Rapports business, presentations de levée de fonds |
| **Paper & Ink** | Style editorial, atmosphere litteraire | Creation de contenu, partage educatif |
| **Swiss Modern** | Geometrie epuree, style Bauhaus | Portfolios de design, minimalisme |
| **Brutalist** | Brut, audacieux, qui attire l'attention | Vitrine artistique, expression personnelle |

#### Resultat en sortie

La presentation generee est un document **HTML monofichier** qui inclut :

- le style complet et le code d'interaction
- la navigation au clavier avec les fleches et la barre d'espace
- le support du tactile et du glissement
- le defilement des diapositives a la molette de souris
- des barres de progression et des points de navigation
- des animations declenchees au defilement
- un design responsive

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Tous les styles sont integres, zero dependance -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Your Title</h1>
    </section>
    <!-- Plus de diapositives... -->
</body>
</html>
```

#### Pourquoi le recommander ?

1. **Zero dependance** : un seul fichier HTML qui s'ouvrira encore dans 10 ans
2. **Decouverte visuelle** : pas besoin de decrire le design, choisissez simplement ce qui vous plait
3. **Conversion PPT** : conservez votre contenu existant et donnez-lui un meilleur habillage visuel
4. **Code de niveau production** : accessible, clairement commente et facile a personnaliser

**Liens connexes** :
- [Depot GitHub frontend-slides](https://github.com/zarazhangrui/frontend-slides) - 6,1k+ etoiles
- [Exemple d'apercu en ligne](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### Comparaison des trois Skills

| Skills | Quel probleme resout-il ? | Facteur amusant | Praticite |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | Faire des videos avec du code | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Rendre le frontend plus beau | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Creer rapidement de belles PPT | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### Comment les utiliser apres l'installation

Apres l'installation, vous n'avez besoin d'aucune configuration supplementaire. Lorsque vous demandez a Claude d'effectuer une tache connexe, il appellera automatiquement le Skill correspondant.

Voir les Skills installes :

```bash
npx skills list
```

---

## Que sont les Skills ?

### Concept fondamental

**Les Skills sont des « packs de competences » stockes dans le systeme de fichiers** et peuvent inclure :

- **SKILL.md** : le fichier de definition du skill, obligatoire
- **scripts/** : scripts auxiliaires, optionnel
- **templates/** : modeles de sortie, optionnel
- **references/** : documents de reference, optionnel

### Skills vs prompts

Vous vous demandez peut-etre : quelle est la difference entre les Skills et l'envoi direct de prompts a Claude ?

| Prompts | Skills |
|--------|--------|
| Temporaires, vous devez les repeter a chaque fois | Persistants, ecrivez une fois et reutilisez plusieurs fois |
| Vivent dans l'historique de conversation et consomment des tokens | Charges a la demande et economisent des tokens |
| Ne peuvent pas etre partages entre les sessions | Peuvent etre partages au sein d'une equipe |
| Difficiles a versionner | Peuvent etre geres avec Git |

### Deux types de Skills

**Skills globaux (personnels)** :
- emplacement de stockage : `~/.claude/skills/`
- portee : tous les projets
- scenarios adaptes : competences personnelles a usage general

**Skills de projet (equipe)** :
- emplacement de stockage : `repertoire-du-projet/.claude/skills/`
- portee : le projet actuel
- scenarios adaptes : partage d'equipe et conventions specifiques au projet

### Fonctionnement des Skills

Lorsque Claude Code demarre, il va :

1. scanner les repertoires de Skills
2. analyser chaque fichier `SKILL.md`
3. extraire les metadonnees YAML frontmatter
4. ajouter le contenu du skill dans sa « base de connaissances »
5. faire correspondre automatiquement les declencheurs en fonction de la description

---

## Structure du fichier `SKILL.md`

### Structure de base

Un repertoire de Skill complet ressemble a ceci :

```text
my-skill/
├── SKILL.md          # Obligatoire : fichier de definition du skill
├── scripts/          # Optionnel : scripts auxiliaires
├── templates/        # Optionnel : modeles de sortie
├── references/       # Optionnel : documents de reference
└── examples/         # Optionnel : fichiers d'exemple
```

### Modele `SKILL.md`

Le fichier `SKILL.md` comporte deux parties :

**Partie 1 : YAML Frontmatter (metadonnees)**

```yaml
---
name: skill-name              # Nom du skill, devient la commande /skill-name
description: short description # Utilise pour la correspondance automatique de Claude
category: development         # Categorie
tags:                         # Tags
  - code
  - automation
---
```

**Partie 2 : Contenu Markdown (instructions)**

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

### Explication des champs cles

| Champ | Obligatoire | Explication |
|------|------|------|
| `name` | Oui | Le nom du skill. Seuls les lettres minuscules, chiffres et tirets sont autorises |
| `description` | Oui | La description du skill. Plus elle est specifique, plus il est facile pour Claude de faire correspondre automatiquement |
| `category` | Non | Label de categorie |
| `tags` | Non | Labels de categorie supplementaires |
| `allowed-tools` | Non | Outils pouvant etre utilises sans permission supplementaire |

---

## Skills vs MCP : Quelle est la difference ?

Beaucoup de debutants confondent les Skills et le MCP, mais ce sont des choses completement differentes.

### Differences fondamentales

| Dimension | Skills | MCP |
|------|--------|-----|
| **Nature** | Connaissances et flux de travail | Outils et interfaces |
| **Ce qu'il fournit** | Dit a l'IA « comment faire » | Donne a l'IA « ce qu'elle peut utiliser » |
| **Emplacement de stockage** | Repertoire `skills/` | Serveur MCP |
| **Format de configuration** | Fichiers Markdown | Fichiers de configuration JSON |
| **Methode de declenchement** | `/skill-name` ou reconnaissance automatique | Charge automatiquement via la configuration |

### Une analogie intuitive

Si Claude etait un « travailleur » :

- **MCP** serait les « outils » donnes au travailleur, comme une cle a molette, un ordinateur et des droits d'acces
- **Skills** serait le « manuel d'utilisation » donne au travailleur, comme comment faire une revue de code ou comment soumettre du code

### Leur relation

Les Skills et le MCP ne sont pas en concurrence. Ils sont complementaires :

```text
Tache utilisateur -> Claude identifie le besoin
               ↓
        Charge les Skills pertinents (sait comment faire)
               ↓
        Appelle les outils via MCP (a les outils disponibles)
               ↓
        Accomplit la tache
```

### Exemple

**Scenario : revue de code**

- **Skills** definissent les etapes de revue, la checklist et le format de sortie
- **MCP** fournit la capacite d'acceder aux PR GitHub et de recuperer les diffs de code

Travaillant ensemble : les Skills disent a Claude « comment faire la revue », et le MCP donne a Claude « la capacite d'acceder au code ».

### Recommandation pour choisir

| Votre besoin | Solution recommandee |
|----------|----------|
| Besoin de definir un flux de travail | Utilisez les Skills |
| Besoin d'acceder a des donnees externes | Utilisez le MCP |
| Besoin des deux | Utilisez-les ensemble |

---

## Ressources courantes pour obtenir des Skills

### Ressources officielles

- [Depot officiel des Skills Anthropic](https://github.com/anthropics/skills) - une collection de skills maintenue officiellement
- [Docs officielles Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - documentation officielle

### Ressources de la communaute GitHub

| Depot | Description |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Maintenu par Boris Cherny, responsable de Claude Code, incluant Skills, Agents, Hooks et plus |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Boite a outils complete incluant des Skills preconfigures |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Liste curated de ressources Skills |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 skills professionnels et 300+ documents de reference |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Collection open-source selectionnee |

### Comment installer des Skills communautaires

En utilisant `find-skills`, vous n'avez qu'a dire a Claude ce dont vous avez besoin, et il recherchera et recommandera automatiquement :

```text
Aide-moi a trouver un skill lie a l'optimisation des performances React
```

Claude recherchera dans la base de donnees skills.sh via `find-skills`, puis listera les skills les plus pertinents, et vous pourrez en choisir un a installer.

**Conseils de recherche** :

- utilisez des mots-cles specifiques : « react testing » est meilleur que « testing »
- combinez « domaine + action » : « nextjs deploy », « typescript lint »
- privilegiez les skills avec un nombre eleve d'installations, car 10K+ signifie generalement eprouve
- surveillez la liste des tendances pour decouvrir les skills emergents

---

## Comment creer vos propres Skills

Il existe deux methodes pour creer des Skills : demander directement a Claude d'en creer un pour vous, ou utiliser l'outil dedie `skill-creator`.

### Methode 1 : Demander directement a Claude de vous aider a en creer un

C'est l'approche la plus simple. Dites simplement a Claude votre besoin en langage naturel.

**Exemple** :

```text
Aide-moi a creer un skill nomme « format-code » pour formater automatiquement le code.

Exigences :
1. Detecter automatiquement le langage de programmation
2. Appliquer les regles de formatage correspondantes
3. Retourner le diff avant et apres le formatage
```

Claude va automatiquement :
1. creer la structure de repertoire
2. generer le fichier `SKILL.md`
3. remplir le YAML frontmatter
4. ecrire le contenu du skill

**Scenarios adaptes** :
- creation rapide de skills simples
- vous savez ce que vous voulez mais n'etes pas familier avec le format `SKILL.md`
- vous voulez iterer et modifier rapidement

### Methode 2 : Utiliser `skill-creator`

`skill-creator` est un outil dedie a la creation de Skills. Il vous guide etape par etape dans le processus.

**Installer** :

```bash
npx skills add anthropics/skills@skill-creator -g
```

Ou installer l'ensemble du depot officiel de skills :

```bash
npx skills add anthropics/skills -g
```

**Utiliser** :

```text
/skill-creator
```

Puis remplissez les invites :
- nom du skill
- description des fonctionnalites
- scenarios d'utilisation
- etapes d'execution

`skill-creator` va :
1. vous guider pour clarifier l'objectif du skill
2. generer une ebauche de `SKILL.md`
3. creer des cas de test
4. executer une evaluation et l'optimiser

**Scenarios adaptes** :
- creer des skills complexes
- necessite un processus de creation plus standardise
- vouloir tester et verifier le skill

### Comparaison des deux methodes

| Methode 1 : Creation directe | Methode 2 : `skill-creator` |
|-----------------|---------------------|
| Rapide et simple | Etapes guidees |
| Adaptee aux skills simples | Adaptee aux skills complexes |
| Terminee directement dans la conversation | Processus standardise |
| Modification flexible | Inclut tests et verification |

### Conseil : comment bien rediger une exigence

**Une bonne description d'exigence** :

```text
Cree un skill « git-commit » qui commite automatiquement le code.

Etapes d'execution :
1. Verifier quels fichiers ont ete modifies
2. Generer un message de commit qui suit les Conventional Commits
3. Executer git commit
4. Demander s'il faut pousser

Notes :
- Verifier les informations sensibles avant de commiter
- Ne pas commiter les repertoires comme dist/ ou node_modules/
```

**Une mauvaise description d'exigence** :

```text
Aide-moi a ecrire un skill pour commiter du code
```

C'est trop vague. Claude ne saura pas exactement ce qu'il doit faire.

---

## Exemples de Skills courants

### Exemple 1 : Skill de revue de code

Creer le repertoire et le fichier :

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

Comment l'utiliser :

```text
/review-pr
Please review the PR for the current branch
```

### Exemple 2 : Skill de commit Git automatique

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

Comment l'utiliser :

```text
/git-commit
```

### Exemple 3 : Skill de generation de tests

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

Comment l'utiliser :

```text
/gen-test
Generate unit tests for src/utils.ts
```

### Exemple 4 : Skill de generation de documentation

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

Comment l'utiliser :

```text
/gen-readme
Generate a README document for the current project
```

---

## Conseils avances

### Combiner les Skills avec les Hooks

Les Hooks peuvent executer automatiquement des actions sur des evenements specifiques. Combines avec les Skills, ils permettent une automatisation plus puissante.

Par exemple, formater automatiquement le code apres la sauvegarde :

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

### Combiner les Skills avec les Commands

Les Commands sont des commandes de raccourci simples. Les Skills sont des flux de travail complexes. Ils peuvent etre utilises ensemble.

### Collaboration d'equipe

**Partager les Skills de projet** :

1. placer les Skills sous `.claude/skills/`
2. les commiter dans Git
3. les membres de l'equipe peuvent les utiliser apres avoir clone le projet

**Controle de version** :

- les Skills peuvent etre versionnes comme du code
- chaque commit peut enregistrer les modifications des Skills
- vous pouvez revenir a des versions anterieures

---

## Questions frequentes

### Q1 : Pourquoi le Skill n'a-t-il pas ete declenche ?

Raisons possibles :
- le format YAML frontmatter est incorrect
- la description n'est pas assez specifique
- Claude Code n'a pas ete redemarre

Comment le resoudre :
- verifier si le format YAML est correct
- ameliorer la description et inclure des scenarios d'utilisation specifiques
- redemarrer Claude Code

### Q2 : Comment rediger une description precise ?

Une bonne description inclut :
- la fonction specifique du skill
- le scenario d'utilisation, comme « lorsque l'utilisateur mentionne... »
- les mots-cles de declenchement

**Mauvais exemple** :
```text
description: Review code
```

**Bon exemple** :
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### Q3 : Quelle est la difference entre les Skills et les Commands ?

| Commands | Skills |
|----------|--------|
| Commandes de raccourci simples | Flux de travail complets |
| Un seul fichier `.md` | Une structure de repertoire (`SKILL.md` + fichiers optionnels) |
| Declenchees manuellement | Peuvent etre declenchees automatiquement |
| Adaptees aux operations simples | Adaptees aux processus complexes |

### Q4 : Comment deboguer un Skill ?

1. Utiliser `/skills` pour verifier si le skill a ete reconnu
2. Entrer directement le nom du skill pour le declencher manuellement
3. Verifier si le contenu du `SKILL.md` est correct
4. Consulter les journaux de Claude Code

---

## References

### Ressources officielles

- [Docs officielles Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Standard Agent Skills](https://agentskills.io/)
- [Article d'ingenierie Anthropic (idees pratiques derriere Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Depot GitHub officiel des Skills Anthropic](https://github.com/anthropics/skills)
- [Documentation VS Code Copilot Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Repertoires de ressources

- [skills.sh](https://skills.sh/) - App store d'Agent Skills de Vercel avec une bibliotheque de 48 000+ skills
- [find-skills](https://github.com/vercel-labs/agent-skills) - outil de recherche intelligent de skills avec 60K+ abonnements
- [Marketplace de Skills (interface chinoise)](https://skillsmp.com/zh) - decouvrir et installer des Skills communautaires

### Projets communautaires GitHub

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Collection officielle d'Agent Skills de Vercel Labs, incluant find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Meilleures pratiques officielles maintenues par Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Boite a outils complete incluant des Skills preconfigures
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Liste curated de ressources Skills selectionnees
- [superpowers](https://github.com/obra/superpowers) - Collection de Skills pour les flux de travail d'automatisation du developpement logiciel
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 skills professionnels et 300+ documents de reference
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - Liste curated de ressources

### Exemples de Skills officiels

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - un skill pour creer de nouveaux skills
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - un skill pour construire des serveurs MCP
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - un skill pour creer des GIF Slack

### Tutoriels chinois

- [Guide complet de la configuration avancee de Claude Code et astuces d'utilisation](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - pratique de la chaine complete avec CLAUDE.md, Skills et Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Guide pas a pas pour personnaliser les Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Pour aller plus loin : le mecanisme interne des Claude Skills

Ensuite, nous allons approfondir le fonctionnement interne des Claude Skills, pour que vous sachiez non seulement comment les utiliser, mais aussi pourquoi ils sont concus de cette facon.

### Vue en principes fondamentaux : injection de contexte dynamique basee sur les prompts

D'abord, comprenez un fait cles : **les Skills ne sont pas du code executable**.

Les Skills sont essentiellement des instructions avancees, ou prompts, qui sont « injectees » dans le contexte de Claude quand necessaire. Cette conception est appelee « Prompt-based Dynamic Context Injection & Meta-Tool Architecture ».

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

### Architecture de chargement progressif a trois couches (optimisation des tokens)

Pour gerer un grand nombre de Skills sans consommer trop de tokens, Claude utilise un mecanisme de chargement intelligent a trois couches :

| Couche | Contenu | Quand charge | Cout en tokens |
|------|------|----------|-----------|
| **Couche 1 : Metadonnees** | YAML frontmatter (`name + description`) | Au demarrage de Claude | ~30-50 tokens/skill |
| **Couche 2 : Instructions** | Contenu complet du `SKILL.md` | Quand le Skill est declenche | ~5 000 tokens |
| **Couche 3 : Ressources** | Scripts, modeles, references | Accessibles depuis le systeme de fichiers a la demande | Non ajoutes au contexte |

**Avantages de cette conception** :

- Supposons que vous ayez 100 Skills. Au demarrage, seulement environ 3 000-5 000 tokens sont consommes pour les metadonnees
- Seul le Skill declenche charge son contenu complet
- Les fichiers de ressources comme les documents de reference ne sont jamais charges entierement dans le contexte

**Compare a sans Skills** :

```text
Without Skills: every conversation needs 50,000+ tokens to describe all capabilities
With Skills: startup ~100 tokens/skill + 5,000 tokens loaded on demand
Savings: on average 40,000+ tokens saved per conversation
```

### Mecanisme d'injection de contexte double

Lorsqu'un Skill est active, le systeme effectue deux modifications en meme temps :

**1. Injection dans le contexte de conversation**

```javascript
// Ce que l'utilisateur voit (message visible)
<command-message>The "pdf" skill is loading</command-message>

// Ce que l'IA recoit reellement (meta-message cache)
{
  isMeta: true,  // marque comme meta-message, non affiche dans l'UI
  content: `
    # PDF Analysis Expert Instructions

    You are a professional PDF analysis expert. Workflow:
    1. Use pdftotext to extract text
    2. Analyze the document structure
    3. Generate a summary report
    ...
  `  // contenu complet du SKILL.md, potentiellement des milliers de mots
}
```

**2. Modification du contexte d'execution**

Outre l'injection d'instructions, un Skill peut aussi modifier dynamiquement l'environnement de Claude :

| Type de modification | Exemple | Explication |
|---------|------|------|
| **Permissions d'outils** | `allowed-tools: "Bash(pdftotext:*)"` | Accorde temporairement l'acces a un outil specifique |
| **Changement de modele** | Passer de Sonnet a Opus | Certaines taches complexes necessitent un raisonnement plus puissant |
| **Isolation du contexte** | Creer un espace de session enfant | Eviter de polluer le contexte de conversation principal |

### Un mecanisme de routage entierement base sur le raisonnement LLM

C'est une decision de conception tres importante : **Claude Skills n'utilise pas de routage code en dur**.

| Approche traditionnelle | Claude Skills |
|---------|--------------|
| Correspondance de vecteurs d'embedding | Raisonnement LLM pur |
| Classificateur | Passe avant du Transformer |
| Regex ou correspondance de mots-cles | Comprehension du langage naturel |
| Algorithme de routage separe | Prise de decision par modele unifie |

**Flux de travail** :

```text
1. The name and description of every Skill are formatted into the Skill tool description

2. Claude receives:
   - the user message
   - the list of available tools, including the Skill meta-tool
   - the Skill list, with name + description

3. Claude's natural language understanding matches the user's intent to a Skill description

4. When the match succeeds, it calls: command: "skill-name"
```

**Pourquoi cette conception ?**

**Le routage code en dur necessite** :
- un cout de maintenance supplementaire
- aucune capacite a comprendre des relations semantiques complexes
- des difficultes a gerer plusieurs langues
- aucun support pour la correspondance floue

**Raisonnement LLM pur** :
- tire parti de la propre comprehension linguistique de Claude
- gere automatiquement plusieurs langues, synonymes et descriptions floues
- ne necessite aucune maintenance supplementaire
- rend les decisions de routage plus intelligentes

### Mecanisme d'analyse des fichiers

**Structure du fichier `SKILL.md`** :

```bash
my-custom-skill/
├── SKILL.md              # Obligatoire : fichier de definition principal
├── config.json           # Optionnel : configuration des metadonnees
├── README.md             # Recommande : documentation d'utilisation
├── scripts/              # Optionnel : scripts executables
├── templates/            # Optionnel : dossier de modeles
└── references/           # Optionnel : documents de reference
```

**Flux d'analyse** :

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

### Exemple du flux d'execution complet

Regardons le flux entier a travers un exemple concret :

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

### Innovations de conception cles

| Innovation | Approche traditionnelle | Approche Skills | Avantage |
|--------|---------|------------|------|
| **Source de capacite** | Fixee dans les poids du modele | Prompts charges dynamiquement | Extensible et modifiable |
| **Efficacite des tokens** | Toutes les capacites restent toujours en memoire | Chargement a la demande | Economise 80%+ de tokens |
| **Gestion des connaissances** | Dispersee dans l'historique de conversation | Systeme de fichiers modulaire | Versionnable et partageable |
| **Cycle de vie** | Occupe continuellement de l'espace | Elimination apres usage | Contexte plus propre |

### Fondements academiques

La conception des Claude Skills s'inspire des recherches suivantes :

| Domaine de recherche | Travail representatif | Applique ici comme |
|---------|---------|---------|
| **Apprentissage par renforcement** | Voyager (2023) | L'idee d'accumuler une bibliotheque de competences |
| **Architecture cognitive** | ACT-R, Soar | Separation de la memoire procedurale et de la memoire declarative |
| **Politique hierarchique** | Options Framework | Chargement progressif a trois couches |

**Changement fondamental de perspective** :

```text
Traditional: AI needs to remember everything
      ↓
Skills: AI knows where to find specialized knowledge
      ↓
Result: more like the thinking pattern of a human expert
```

### Relation avec le standard Agent Skills

Claude Skills suit le [standard ouvert Agent Skills](https://agentskills.io/), ce qui signifie :

- Compatibilite multiplateforme : des outils comme Cursor, Windsurf et Aider le prennent egalement en charge
- Format de fichier unifie : structure `SKILL.md` standardisee
- Interoperabilite : les Skills peuvent etre partages entre differents outils

```text
Agent Skills standard defines:
├── Required: SKILL.md file (metadata + instructions)
├── Optional: scripts/ (executable code)
├── Optional: references/ (knowledge base documents)
└── Optional: assets/ (templates and resources)
```

### Resume : pourquoi cette conception est-elle brillante ?

1. **Dissocie la capacite du modele** : les connaissances specialisees ne dependent plus de l'entrainement du modele et peuvent etre mises a jour a tout moment via des fichiers Markdown

2. **Efficacite extreme des tokens** : le mecanisme de chargement a trois couches garantit que seul le contenu necessaire est charge

3. **Utilise les propres forces du LLM** : le routage et la correspondance reposent entierement sur la comprehension linguistique de Claude, sans algorithme supplementaire necessaire

4. **Convivial pour les developpeurs** : creer un Skill ne necessite que l'ecriture de Markdown, pas de programmation

5. **Composable** : les Skills peuvent se referencer et se combiner entre eux pour former des flux de travail complexes

6. **Elimination apres usage** : nettoyage automatique apres completion et maintien d'un contexte frais

---

### Resume

Les Skills sont la cle pour transformer Claude Code d'un « assistant generaliste » en un « expert d'equipe ».

Grace aux Skills, vous pouvez :
- standardiser les flux de travail
- reutiliser les connaissances de l'equipe
- ameliorer l'efficacite de collaboration
- reduire les explications repetees

Rappelez-vous : **si vous vous surprenez a repeter la meme instruction deux fois, vous devriez envisager de creer un Skill**.

Maintenant allez creer votre premier Skill.
