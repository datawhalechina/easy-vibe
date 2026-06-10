---
title: "Créer votre prototype : de l'analyse métier au prototype produit multi-pages"
description: "Vivre le cycle complet de l'analyse métier à la réalisation d'un prototype produit multi-pages. Apprendre à poser des questions métier, décomposer les besoins, utiliser l'IDE AI pour générer des applications mono-page et multi-pages, et peaufiner et tester les prototypes."
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Environ <strong>8 heures</strong>'
const relatedArticles =
  relatedArticlesMap['fr-fr/stage-1/building-prototype'] ?? []
</script>

# Niveau débutant 3 : Créer votre prototype

## Introduction du chapitre

<ChapterIntroduction :duration="duration" :tags="['Analyse métier', 'Conception de prototype', 'Programmation assistée par AI', 'Applications multi-pages']" coreOutput="1 prototype d'atelier de contenus e-commerce" expectedOutput="Prototype Web interactif">

Dans le chapitre précédent, nous avons appris à <strong>trouver de bonnes idées</strong> — partir des besoins utilisateurs pour trouver des directions pour lesquelles quelqu'un est prêt à payer. Mais trouver la direction n'est que la première étape, <strong>ce qui met vraiment à l'épreuve le chef de produit, c'est : comment transformer des besoins flous en un produit utilisable.</strong>

Ce chapitre va résoudre un <strong>problème réel</strong> : votre patron vous lance un « utilise l'IA pour améliorer l'efficacité de la publication de produits sur les plateformes e-commerce » — comment transformer ça en un <strong>prototype produit fonctionnel</strong> ?

Contrairement aux jeux Snake et calculatrices précédents, <strong>dans les vrais projets on ne peut pas inventer les fonctionnalités</strong> :

1. <strong>Identifier les points de douleur</strong> : discuter avec les opérationnels, extraire des <strong>vrais points de douleur</strong> du vague « améliorer l'efficacité »
2. <strong>Prioriser</strong> : parmi tous les problèmes, résoudre d'abord <strong>le plus douloureux</strong>, sans vouloir tout faire d'un coup
3. <strong>Valider rapidement</strong> : utiliser l'IDE AI pour d'abord faire un <strong>prototype mono-page</strong>, puis étendre en multi-pages une fois que ça fonctionne
4. <strong>Produire quelque chose d'utilisable</strong> : livrer finalement un <strong>atelier de contenus e-commerce démontrable et utilisable</strong>

Nous apprendrons la transition de <strong>faire des jouets à faire des applications</strong>, et à <strong>empathiser et réfléchir aux vrais besoins des clients</strong>.

</ChapterIntroduction>

::: info ℹ️ Note
Ce chapitre peut contenir des termes métier que vous ne connaissez pas — vous pouvez demander à l'IA de vous les expliquer.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Analyse des besoins', description: 'Du flou au concret' },
      { title: 'Validation mono-page', description: 'Fonctionnalité clé implémentée' },
      { title: 'Extension multi-pages', description: 'Structure d\'application complète' },
      { title: 'Peaufinage', description: 'Amélioration de l\'expérience utilisateur' }
    ]" />
  </ClientOnly>
</div>

## 1. Définir les besoins avant de coder

Dans les tutoriels précédents, nous avons utilisé l'IDE AI pour générer facilement des jeux Snake et autres petits jeux, mais ce ne sont que des projets ludiques qui ne peuvent pas être appliqués au travail et à la vie quotidienne ; si nous voulons que les capacités AI soient véritablement utiles à tous, nous devons faire du Vibe Coding en combinant des scénarios de vie et de travail.

Dans le chapitre précédent, nous avons appris à trouver des <strong>bonnes idées pour lesquelles quelqu'un est prêt à payer</strong>, mais trouver une direction n'est que le début. Quand on fait vraiment un produit, on découvre que : <strong>il y a un énorme fossé entre savoir « quoi faire » et savoir « comment le faire ».</strong>

Ce fossé, c'est la <strong>spécification des besoins</strong>.

Par exemple, dans un projet de classe ou personnel, on part souvent de la fonctionnalité exécutable la plus simple pour faire un produit ou une application :

- « Fais un tableau Kanban, liste les tâches. »
- « Aide-moi à faire un outil de dessin. »
- « Aide-moi à faire un logiciel pour collecter des questionnaires. »

Ce ne sont souvent qu'un outil, un module fonctionnel, et même pas un problème métier clair. Plus important encore, <strong>ces idées sont souvent « ce que tu trouves utile » et non « ce dont l'utilisateur a vraiment besoin ».</strong>

Dans les projets d'entreprise ou de startup, les chefs de produit et les ingénieurs partent souvent d'une proposition métier plus large. Par exemple, nous pouvons imaginer le scénario suivant :

<el-card shadow="hover" style="border-left: 5px solid #409EFF; background-color: #ecf5ff; margin: 20px 0;">
  <div style="font-weight: bold; color: #303133; margin-bottom: 10px;">🛍️ Scénario métier :</div>
  <div style="color: #606266; line-height: 1.6;">
    <p>Vous êtes chef de produit e-commerce dans une boutique. Le patron vous donne une proposition vague mais stressante :</p>
    <p style="font-style: italic; margin-top: 10px;">« Maintenant tout le monde utilise l'IA pour faire des images et des textes sur les réseaux sociaux, ça a l'air simple. Aide-moi à mettre ça en place pour qu'on soit plus efficace quand on met de nouveaux produits sur TikTok Shop. »</p>
  </div>
</el-card>

À ce moment-là, vous pourriez penser : « Patron, tu rêves encore ! » Pourtant, dans le monde réel, ce genre de décision vague en une phrase est très courant — même plus fréquent que le nombre de bubble tea que vous commandez en une semaine. Donc, pour devenir un bon professionnel (ou mieux, le CEO d'une nouvelle startup), nous devons apprendre à passer de la création d'outils personnels à la création de vrais prototypes produits.

Puisque nous avons appris l'IDE AI, en y réfléchissant bien, ce besoin est assez simple — il suffit de donner un prompt à l'IA et de laisser l'Agent s'occuper de tout, non ?

```
Merci de te référer à mon besoin xxxx,
aide-moi à concevoir un atelier de contenus e-commerce,
incluant la génération et la gestion de descriptions produits, images, vidéos et autres contenus.
```

Si vous transformez joyeusement ce besoin en prototype et l'envoyez au patron — félicitations, votre bonus de ce trimestre est annulé !

**Pourquoi ? C'est le point de douleur central que nous devons résoudre :**

Quand nous avons appris l'IDE AI, nous faisions des **projets ludiques personnels** comme Snake ou une calculatrice — fonctionnalités simples, on sait ce qu'on veut, et on fait pour soi. Mais **les vrais scénarios métier sont complètement différents** :

- **Vous n'êtes pas l'utilisateur** : le patron veut « améliorer l'efficacité », mais vous ne savez pas comment les opérationnels travaillent au quotidien ni où ils bloquent ;
- **L'IA ne comprend pas le métier** : vous donnez un besoin vague à l'IA, elle ne peut que deviner à partir de connaissances générales, et le résultat peut ressembler à quelque chose mais être inutilisable en pratique ;
- **Une bonne idée n'est pas un bon produit** : vous trouvez peut-être que « ajouter une fonctionnalité de génération AI » est cool, mais les utilisateurs pourraient ne pas en avoir besoin, ou l'utiliser pourrait être plus compliqué qu'avant.

**C'est pourquoi nous devons apprendre à « passer de l'idée à la compréhension utilisateur »**. Ce n'est que lorsque votre idée résout vraiment le problème des autres, en posant des questions et en comprenant le métier en profondeur, que vous pourrez créer quelque chose de véritablement précieux. (Une bonne idée peut même être plus importante que la bonne technique.)

### 1.1 De l'imaginaire au réel : apprendre à poser des questions métier

::: info 💡 D'abord, clarifions : qu'est-ce qu'un besoin ? Qu'est-ce que le métier ?

Un **besoin** (requirement), c'est ce que l'utilisateur veut vraiment, le problème qu'il rencontre, la chose qu'il veut résoudre. Par exemple, « le patron veut que je mette les produits en ligne plus vite » — c'est un besoin.

Le **métier** (business), c'est ce que l'utilisateur fait réellement chaque jour, sa façon de travailler. Par exemple, un opérationnel e-commerce fait chaque jour : mettre des produits en ligne, modifier les prix, créer des images, analyser les données... tout ça, c'est le métier.

**Pourquoi s'intéresser au métier ?**
Parce que si vous ne comprenez pas le métier, l'outil que vous créerez risque d'être « beau mais inutilisé ». Ce n'est qu'en comprenant vraiment comment les utilisateurs travaillent au quotidien et où ils bloquent que vous pourrez créer quelque chose qui les aide vraiment.

:::

En partant de la perspective la plus simple, vous pouvez d'abord vous poser quelques questions :

- Quand le patron dit « **efficacité améliorée** », qu'est-ce que ça veut dire exactement ? Faire les choses **plus vite** ? **Dépenser moins** ? **Vendre plus** ?
- Comment sont mis en ligne les produits actuellement ? **Où ça coince** ?
- Combien de **nouveaux produits** faut-il traiter chaque jour ? Combien d'**images** et combien de **textes** par produit ?
- Dans le travail actuel, **quelle est la tâche la plus pénible**, celle qu'on **aimerait le plus éviter** ?

Mais ce sont toutes des questions spéculatives. Nous devons poser directement des questions aux opérationnels TikTok Shop : « Quelles sont vos difficultés et vos points d'attention ? » pour obtenir des réponses plus précises par la communication :

::: info 📋 Résultats d'entretien métier réel

Nous avons demandé à des personnes faisant de l'e-commerce, voici leurs frustrations :

**1. Trop de choses à faire, trop dispersées**
- Une personne gère plusieurs boutiques, chacune avec beaucoup de produits à traiter ;
- Chaque jour c'est la course : **mise en ligne de nouveaux produits**, **modification de prix**, **création d'images**, **analyse des données**, une tâche pas finie qu'il faut déjà passer à la suivue.

**2. Le contenu n'est pas fait en une fois, c'est un processus itératif**
- On commence avec les **images fournies par le fabricant**, les **anciens contenus** ou des **images de référence trouvées en ligne**, pour rapidement **mettre le produit en ligne** et tester ;
- On dépense un peu en promotion pour **voir si ça vend** ;
- Ce n'est que pour les **produits qui se vendent bien** qu'on prend le temps de faire de vraies images, descriptions détaillées et vidéos.

:::

Après avoir interrogé les opérationnels, nous sommes enthousiastes, car maintenant nous pouvons vraiment créer un prototype produit parfaitement adapté au métier ! — Encore raté. Si nous essayons de « satisfaire toutes les demandes d'un coup », le produit sera très volumineux et difficile à livrer dans le temps du cours. Il faut donc encore trier et converger pour identifier le vrai point de douleur central.

### 1.2 De la divergence à la convergence : verrouiller le point de douleur métier central et les fonctionnalités

::: info 💡 Pourquoi « converger » ? Qu'est-ce qu'un « point de douleur » ?

**Il y a beaucoup de problèmes, mais par lequel commencer ?**

L'utilisateur peut vous dire plein de problèmes : A est pénible, B est pénible, C est pénible... mais si vous essayez de tout résoudre en même temps, vous risquez de ne rien faire de bien. Donc il faut **converger** — c'est-à-dire, parmi tous les problèmes, choisir celui qui est **le plus douloureux, le plus urgent, le plus soluble** pour commencer.

**Qu'est-ce qu'un point de douleur ?**
C'est le problème spécifique que l'utilisateur **trouve le plus pénible, qui lui prend le plus de temps, qu'il veut le plus résoudre**. Pas « je trouve ça utile », mais la chose dont l'utilisateur **se plaint tous les jours, qui est douloureuse à chaque fois**.

:::

À travers les entretiens ci-dessus, nous avons découvert que les opérationnels rencontrent de nombreux problèmes : rythme perturbé par les promotions, gestion de plusieurs boutiques, jonglage entre mise en ligne / modification de prix / création d'images / analyse de données...

Si nous essayons de « résoudre tous ces problèmes », nous finirons par créer un outil **vaste mais peu utilisable**.

Classons ces problèmes (l'IA peut vous aider), on trouve grosso modo trois catégories :

1. **Problème de rythme** : quand mettre en ligne, quand ajuster les prix ;
2. **Problème d'efficacité** : comment gérer simultanément plusieurs boutiques et produits ;
3. **Problème de contenu** : comment créer rapidement des images et textes de produits.

Pour notre cours, le plus adapté à résoudre en premier est la **catégorie 3 : le problème de contenu**. Mais « créer du contenu rapidement » reste un peu abstrait, demandons encore aux opérationnels où ils bloquent exactement :

::: info 📋 Les opérationnels disent : il y a deux endroits les plus douloureux pour le contenu

**Douleur 1 : la création en masse d'images et de textes est trop pénible**
- Les contenus sont éparpillés : cloud, messages WeChat, back-office de la plateforme... **difficiles à retrouver** ;
- Il faut mettre en ligne beaucoup de produits d'un coup, **pas le temps de faire chaque chose soigneusement**, on assemble à la va-vite ;
- Les exigences ne sont pas élevées, **ça doit être présentable et publiable**, pas besoin d'être magnifique.

**Douleur 2 : les bonnes solutions ne peuvent pas être sauvegardées pour réutilisation**
- Les bons titres et mises en page d'avant, **la prochaine fois on ne les retrouve plus** ;
- Les solutions sont dispersées dans les historiques de chat, les anciens liens de produits ;
- Quand on veut les utiliser, il faut **chercher pendant des heures, copier-coller et modifier pendant des heures** ;
- Il manque un outil pour **sauvegarder, gérer et appliquer directement**.

:::

Sur la base de ces deux points de douleur, nous allons créer un petit outil simple : **aider les opérationnels à créer en masse des images et textes, et permettre de sauvegarder les bonnes solutions pour les réutiliser directement la prochaine fois**.

Il ne fait que deux choses (l'IA peut vous aider à affiner, n'oubliez pas de supprimer les fonctionnalités en fonction des retours métier) :

::: info Fonctionnalité 1 : Générer en masse des images et textes de produits e-commerce

**À quoi ça sert ?**
Donner au système des informations produit, il génère automatiquement des images et textes utilisables pour la mise en ligne sur les plateformes e-commerce (comme TikTok, Taobao).

**Entrée**
| Type | Contenu |
|------|------|
| Informations produit | Nom, catégorie, marque, matière, taille, couleur, etc. |
| Images produit | Image sur fond blanc ou photo en situation simple |
| Images de référence | Captures d'écran de produits qui se vendent bien ou liens de référence |
| Mode d'importation | Import par lot via Excel, ou saisie directe sur la page |

**Sortie (contenus e-commerce générés)**
- **Image principale** : image de présentation du produit avec points de vente en texte (la première image que l'utilisateur voit en scrollant)
- **Titre du produit** : combinaison de mots-clés trouvables par recherche
- **Texte de vente** : 1-2 phrases pour attirer les acheteurs
- Tous des produits finis **prêts à publier après quelques ajustements**

**Résultat**
- Avant : chaque produit nécessite de créer des images et textes à partir de zéro
- Maintenant : on envoie un lot de produits au système, on obtient des brouillons qu'il suffit de sélectionner et peaufiner

:::

::: info Fonctionnalité 2 : Sauvegarder les bonnes solutions en tant que modèles

**Entrée**
| Type | Contenu |
|------|------|
| Un ensemble complet | Image principale + titre + texte |

**Sortie**
| Fonction | Description |
|------|------|
| Appliquer | Utiliser le modèle pour générer automatiquement les nouveaux produits |
| Modifier | Modifier directement le titre et le texte |
| Gérer | Nommer, étiqueter (ex : « modèle sac homme », « titre promo ») pour faciliter la recherche |

**Résultat**
1. Importer un nouveau produit
2. Choisir : laisser le système générer par défaut, ou **utiliser mon modèle sauvegardé**
3. Le système applique automatiquement le style du modèle, et produit de nouvelles images et textes

:::

---

**Récapitulons ce que nous venons de faire :**

1. **D'abord poser des questions** : au lieu de se lancer directement, on demande d'abord aux opérationnels « ce qui vous embête le plus » ;
2. **Trouver les points de douleur** : on découvre que ce qu'ils trouvent le plus pénible, c'est « créer des images et textes est trop laborieux » et « les bonnes solutions ne peuvent pas être sauvegardées » ;
3. **Converger le périmètre** : au lieu de faire une plateforme exhaustive, on se concentre sur « génération en masse d'images et textes + sauvegarde de modèles », ces deux fonctionnalités uniquement.

**Pourquoi est-ce important ?**

L'erreur de beaucoup de débutants en produit est : plus il y a de fonctionnalités, mieux c'est. Mais ce dont l'utilisateur a vraiment besoin, c'est qu'on **résolve le problème le plus douloureux**. Mieux vaut faire une ou deux fonctionnalités qui aident vraiment l'utilisateur, qu'un tas de fonctionnalités mal faites.

**Le cœur de la réflexion produit et métier :**
- Ne pas imaginer « je pense que l'utilisateur a besoin de ceci »
- Aller demander à l'utilisateur « que fais-tu chaque jour ? Où as-tu le plus mal ? »
- Parmi tous les problèmes, **converger** vers le plus douloureux et le plus soluble
- D'abord créer la version **minimum viable**, puis itérer progressivement

Voilà ce qu'il faut clarifier avant de coder. Le code n'est qu'un outil — **comprendre l'utilisateur et identifier le bon problème** est la première étape.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Analyse des besoins', description: 'Du flou au concret' },
      { title: 'Validation mono-page', description: 'Fonctionnalité clé implémentée' },
      { title: 'Extension multi-pages', description: 'Structure d\'application complète' },
      { title: 'Peaufinage', description: 'Amélioration de l\'expérience utilisateur' }
    ]" />
  </ClientOnly>
</div>

## 2. Produire un prototype en 10 minutes : faire atterrir la « fonctionnalité clé » avec l'IDE AI

::: info 💡 Conseil Plan de programmation
Si vous trouvez que l'IDE actuel n'est pas assez intelligent, ou que vous épuisez rapidement vos crédits, vous pouvez acheter un **Plan de programmation**. Pour anticiper, consultez [cet article](../../stage-2/backend/modern-cli/) sur l'utilisation de Claude pour programmer.
:::

Réfléchir est une bonne chose, mais il ne faut pas sur-réfléchir. Arrêtons de trop philosopher et essayons de créer un prototype en commençant par une seule page.

### 2.1 Première étape : dire à l'IA ce que vous voulez en langage courant

Au début, ne cherchez pas le prompt parfait. Partez de votre expression la plus naturelle. Comme si vous décriviez le besoin à un collègue, dites à l'IA en langage courant ce que vous voulez faire, puis laissez l'IA vous aider à optimiser en une expression plus professionnelle.

#### 2.1.1 Commencer par l'oral (recommandé pour les débutants)

Décrivez d'abord votre idée dans vos propres mots, même si c'est très brut :

```
Je veux créer un outil pour aider les opérationnels e-commerce à générer automatiquement des images principales et des textes de produits.
Les opérationnels doivent actuellement créer les images et textes un par un manuellement, c'est très pénible.
Mon idée : ils uploadent les informations produit, le système génère un lot de brouillons,
et les opérationnels sélectionnent ceux qui sont bons, les modifient légèrement et les utilisent.

Pour commencer, la version la plus simple : une seule page, à gauche on remplit les infos produit,
à droite on affiche les résultats générés. On peut uploader des images, saisir du texte,
et après génération on voit l'aperçu de l'image principale et le texte.
```

Ensuite, envoyez ce texte à une IA (comme ChatGPT, Claude, etc.) pour qu'elle vous aide à l'enrichir. L'IA vous aidera généralement à combler des détails auxquels vous n'aviez pas pensé, et à structurer votre idée plus clairement, pour finalement générer un prompt adapté à l'IDE AI.

Vous pouvez dire à l'IA :
```
Aide-moi à enrichir l'idée ci-dessus, organise-la en un document de logique métier clair,
puis génère un prompt adapté à un IDE AI (comme Cursor, Trae) pour générer le code d'un prototype mono-page.
```

L'IA retournera un besoin structuré et le prompt correspondant. Vérifiez-le vous-même, supprimez les fonctionnalités inutiles, et une fois confirmé, utilisez-le pour générer le code.

L'avantage de cette approche : l'expression orale est l'idée la plus authentique, mais peut manquer des détails importants. Quand l'IA enrichit, elle peut poser des questions comme « voulez-vous supporter l'upload par lot ? » que vous n'aviez pas envisagées, vous aidant à valider davantage. Vous pouvez choisir de conserver ou supprimer les fonctionnalités non essentielles en fonction des retours, et déterminer le prompt initial pour l'IA après plusieurs révisions.

#### 2.1.2 Passer l'étape d'enrichissement : envoyer directement votre document métier à l'IA

Si vous avez déjà préparé un document de logique métier dans les chapitres précédents (par exemple, un cahier des charges en langage courant), vous pouvez directement utiliser le format suivant pour l'envoyer à l'IDE AI, en sautant l'étape d'enrichissement. Adapté quand le besoin est déjà clair et que vous voulez passer directement au code :

```
Aide-moi à implémenter une application mono-page en te référant à la logique métier, pour valider la fonctionnalité clé.

La logique métier de référence est la suivante :
1. Aider les opérationnels à générer en masse une première version de brouillons images/textes :
- **Entrée (supporte l'upload direct et l'import par lot de contenus) :**
  - Informations de base produit : nom, catégorie, marque, matière, taille, couleur, public cible, etc. ;
  - Images produit : image fond blanc / photo situation simple ;
  - Chaque génération supporte l'upload supplémentaire de captures de produits best-sellers ou liens de référence, permettant d'avoir des références ;
  - Supporte l'import par lot via Excel, ou la saisie en ligne / upload sur la page.
  - Supporte la spécification sur la page pour sauvegarder ou non les contenus dans la bibliothèque, pour réutilisation
- **Sortie (contenu directement publiable ou publiable après légères modifications) :**
  - Pour chaque produit, une image principale brouillon « présentable, contenant les points de vente de base » ;
  - Un titre « bien structuré, contenant les mots-clés clés » + 1-2 phrases de texte de vente.
- **Changement d'usage attendu :**
  Passer de la création de zéro pour chaque lot de produits à l'envoi d'un lot au système, puis sélection et ajustement des brouillons générés.

Faire d'abord la première fonctionnalité, la deuxième (bibliothèque de modèles) sera ajoutée plus tard.
```

#### 2.1.3 L'approche programmeur (avancé) : laisser l'IA écrire le « prompt de prompt »

Si vous voulez contrôler plus finement le processus de génération de code, vous pouvez d'abord demander à une IA (comme ChatGPT) de générer, à partir de votre besoin, un prompt spécialement conçu pour l'IDE AI :

```
En te basant sur l'idée ci-dessous, aide-moi à écrire un prompt pour un Agent de codage,
j'ai besoin de ce prompt pour générer du code.

[Colle ici ta description de logique métier]

Exigences :
1. Le prompt doit contenir une description claire de la mise en page
2. Préciser la structure de données et la logique d'interaction
3. Spécifier la stack technique (ex : React + Tailwind)
4. Lister les points fonctionnels clés à implémenter
```

L'IA générera généralement un prompt structuré comme suit :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-25-56.png)

Vous pouvez modifier légèrement ce prompt avant de l'envoyer à l'IDE AI pour générer le code.

### 2.2 Deuxième étape : laisser l'IDE AI générer directement le code

#### 2.2.1 Préparation : comprendre les opérations de base de l'IDE AI

Si vous n'êtes pas encore familier avec l'utilisation basique de l'IDE AI (comme Cursor, Trae, Windsurf, etc.), il est recommandé de consulter d'abord le [tutoriel de base sur l'IDE](/fr-fr/appendix/2-development-tools/ide-basics) en annexe, pour apprendre comment :
- Créer un nouveau projet
- Dialoguer avec l'AI Agent
- Comprendre le processus de génération de code de l'IA

#### 2.2.2 Commencer à générer le code

Vous avez maintenant obtenu le prompt initial. Prenons le premier style de prompt comme exemple, et laissons l'IA nous aider à générer le code. Créez d'abord une fenêtre et le dossier correspondant, et ouvrez le dossier (initialisez un nouveau projet à l'emplacement de votre choix) :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-28-44.png)
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-30-00.png)

Dans la barre latérale, choisissez un modèle que vous aimez (recommandé : gemini, gpt, glm, kimi, minimax, etc.), et saisissez le prompt obtenu à la première étape :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-31-41.png)

Après avoir cliqué sur Générer, nous verrons une séquence familière : l'IA va planifier la structure de répertoires du projet, les fichiers nécessaires, et donner le contenu initial de chaque fichier.

::: warning ⚠️ Attention particulière : l'IA peut s'arrêter et attendre votre confirmation
Pendant la génération, l'AI Agent **s'arrête souvent pour attendre votre saisie ou confirmation**, par exemple :
- Vous demander si vous voulez passer à l'étape suivante
- Vous demander d'appuyer sur Entrée pour confirmer une action
- Vous demander un choix sur un détail technique

**Si vous voyez que l'IA ne bouge plus, vérifiez d'abord l'interface de chat pour voir si elle attend votre réponse.** Beaucoup de débutants pensent que l'IA est en train de réfléchir, alors qu'elle s'est arrêtée pour les attendre. Répondez activement ou appuyez sur Entrée, et l'IA reprendra son travail.
:::

N'oubliez pas non plus d'appuyer sur Entrée pour confirmer (sinon vous resterez bloqué en attente — certains IDE AI ne rencontrent pas ce problème) :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-33-03.png)

Si vous rencontrez le scénario suivant, cela signifie qu'un service local a déjà été démarré. Vous devez cliquer pour passer, sinon vous resterez sur cet écran (si rien ne s'affiche après la génération du code, vous devrez dire activement « aide-moi à démarrer ce projet ») :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-38-11.png)

::: info 💡 Explication du scénario
**Explication du scénario** : vous avez créé un projet React + TypeScript avec `npm create vite@latest` (easy-vibe-web). Une fois la création terminée, l'ordinateur va automatiquement « lancer » la page web, pour que vous puissiez voir le résultat immédiatement.

**Service local** : on peut comprendre ça comme une fenêtre d'affichage web temporaire ouverte sur votre ordinateur, qui ne fonctionne que sur cette machine — les autres n'y ont pas accès.

**localhost (adresse locale)** : `localhost` signifie « cet ordinateur lui-même ». Quand le navigateur y accède, il accède en fait à la page web exécutée sur votre ordinateur.

**Port** : le port est un numéro utilisé pour distinguer les différents services web sur le même ordinateur. Ce projet utilise le port 5174.

**Lien d'accès `http://localhost:5174/`** : cette adresse signifie « accéder à la page web numéro 5174 sur cet ordinateur ». Ouvrez-la dans le navigateur pour voir le résultat.

**Explication de ce scénario** : le système voulait initialement utiliser le port 5173, mais celui-ci était déjà occupé, donc il a automatiquement basculé vers 5174 — c'est normal.

**Instructions** : ouvrez le navigateur, tapez `http://localhost:5174/` dans la barre d'adresse et appuyez sur Entrée pour voir la page du projet actuel.
:::

Une fois toutes les confirmations terminées, attendez que l'agent s'exécute quelques instants, et vous obtiendrez le résultat suivant :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-50-34.png)

On peut voir qu'il y a déjà une première version fonctionnelle, mais la page frontend est vraiment laide. À ce stade, vous pouvez essayer de dialoguer directement avec l'IA pour optimiser l'affichage de l'interface :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-01-16.png)

Après optimisation, nous obtenons une interface plus esthétique :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-05-16.png)

Vous pouvez modifier les fonctionnalités de la page selon vos besoins, joindre des captures d'écran et poser des questions librement, par exemple : « Je n'ai pas besoin de la fonctionnalité d'import par lot pour l'instant, aide-moi à la supprimer », « Il y a trop de champs à remplir à gauche, garde uniquement xxxxx ». Vous pouvez même vous référer à d'autres sites matures — par exemple, vous pouvez directement « vous inspirer » d'un produit de design de Google (vous pouvez coller une capture d'écran d'un site mature que vous aimez) :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-13-12.png)

Et finalement obtenir :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-15-18.png)

### 2.3 Que faire en cas d'erreur

En pratique, rencontrer des erreurs est inévitable — c'est normal et ne signifie pas que vous avez fait quelque chose de mal. Vous n'avez pas besoin de comprendre l'erreur ; il suffit de transmettre la « situation observée » en entier à l'IA.

Il n'y a que trois approches courantes :

- **Approche 1 : Erreur sur la page ou le terminal**
  Quand la page devient rouge, affiche un écran blanc, ou quand le terminal affiche un tas de texte rouge, faites une capture d'écran ou copiez l'intégralité du message d'erreur et envoyez-le à l'IA pour qu'elle vous aide à réparer.

- **Approche 2 : La fonctionnalité ne fonctionne pas mais pas d'erreur**
  Par exemple, un bouton ne réagit pas, les données ne s'affichent pas, les styles sont cassés — décrivez en langage courant « ce qui se passe + ce que vous vouliez », en ajoutant une capture d'écran si nécessaire.

- **Approche 3 : Vous n'êtes pas sûr s'il y a un problème**
  Vous pouvez demander directement à l'IA : « Aide-moi à vérifier si cette fonctionnalité a des problèmes évidents, est-ce qu'il faut ajuster quelque chose. »

#### 2.3.1 Questions fréquentes des débutants

- **Q : Je ne sais pas où trouver le message d'erreur ?**
- R : En général, cherchez tout le « texte rouge ». Dans le terminal, la console ou sur la page, trouvez les indications rouges, sélectionnez tout et copiez pour l'IA.

- **Q : L'IA a corrigé mais l'erreur persiste ?**
- R : C'est courant. Continuez à faire une capture d'écran ou copiez le dernier message d'erreur et envoyez-le, pour qu'elle corrige davantage sur la base de la modification précédente.

- **Q : Dois-je comprendre complètement la solution de réparation de l'IA ?**
- R : Non, pas besoin de tout comprendre d'un coup. Vous pouvez vous concentrer sur un ou deux points à chaque fois. Avec le temps, vous comprendrez de plus en plus de code, comme en accumulant du vocabulaire anglais.

- **Q : J'ai corrigé plein de fois, le problème persiste ?**
- R : Vous pouvez essayer :
  - Utiliser la fonction « retour en arrière » de l'IDE, trouver le bouton de retour dans la conversation de l'agent, revenir à une version fonctionnelle et recommencer ;
  - Changer de modèle ou ajuster le prompt, décrire le phénomène et le message d'erreur plus précisément ;
  - Regrouper « code actuel + log d'erreurs + comportement attendu » et tout envoyer d'un coup à l'IA, pour qu'elle restructure globalement la partie problématique.

## 3. Passer d'une application mono-page à une application multi-pages

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Analyse des besoins', description: 'Du flou au concret' },
      { title: 'Validation mono-page', description: 'Fonctionnalité clé implémentée' },
      { title: 'Extension multi-pages', description: 'Structure d\'application complète' },
      { title: 'Peaufinage', description: 'Amélioration de l\'expérience utilisateur' }
    ]" />
  </ClientOnly>
</div>

Une fois la logique de la fonctionnalité clé générée, nous pouvons générer le reste du contenu. Par exemple, à ce stade, si vous cliquez sur Paramètres ou certains boutons, ils ne fonctionnent pas du tout.

Vous pouvez demander à l'IA de vérifier selon les besoins du prompt métier, de générer les parties manquantes, ou de compléter directement les pages non implémentées. Vous pouvez aussi spécifier une page pour que l'IA la complète, jusqu'à ce que toutes les pages soient cliquables et que les fonctionnalités soient interactives :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-17-55.png)

Après quelques instants, nous pouvons voir que le programme a complété plusieurs pages et fonctionnalités interactives sur la base de ce qui existait déjà :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-40.png)

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-53.png)

Il vous suffit alors de cliquer manuellement sur chaque fonctionnalité et bouton qui vous intéresse, pour vous assurer que les interactions sont normales. Si une fonctionnalité n'est pas interactive, vous pouvez en parler avec l'IA pour qu'elle vous aide à la corriger.

## 4. Rendre le prototype « convaincant »

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Analyse des besoins', description: 'Du flou au concret' },
      { title: 'Validation mono-page', description: 'Fonctionnalité clé implémentée' },
      { title: 'Extension multi-pages', description: 'Structure d\'application complète' },
      { title: 'Peaufinage', description: 'Amélioration de l\'expérience utilisateur' }
    ]" />
  </ClientOnly>
</div>

Une fois la structure multi-pages en place, la dernière étape consiste à faire passer le prototype de « ça fonctionne » à « c'est fluide à utiliser et ça a l'air pro ». Cela nécessite de tester manuellement tout le flux (parcours utilisateur), et de faire corriger par l'IA les parties qui ne fonctionnent pas, pour qu'à chaque rafraîchissement on puisse simuler un nouvel utilisateur parcourant tout le flux et obtenir le résultat attendu.

Revenons au besoin initial :

```
1. Aider les opérationnels à générer en masse une première version de brouillons images/textes :
- **Entrée (supporte l'upload direct et l'import par lot de contenus) :**
  - Informations de base produit : nom, catégorie, marque, matière, taille, couleur, public cible, etc. ;
  - Images produit : image fond blanc / photo situation simple ;
  - Chaque génération supporte l'upload supplémentaire de captures de produits best-sellers ou liens de référence ;
  - Supporte l'import par lot via Excel, ou la saisie en ligne / upload sur la page.
  - Supporte la spécification sur la page pour sauvegarder ou non les contenus dans la bibliothèque
- **Sortie (contenu directement publiable ou après légères modifications) :**
  - Pour chaque produit, une image principale brouillon « présentable, contenant les points de vente de base » ;
  - Un titre « bien structuré, contenant les mots-clés clés » + 1-2 phrases de texte de vente.
- **Changement d'usage attendu :**
  Passer de la création de zéro pour chaque lot de produits à l'envoi d'un lot au système, puis sélection et ajustement des brouillons générés.

2. Capitaliser les bonnes sorties en une bibliothèque de modèles réutilisables :
- **Que peut-on sauvegarder ?**
  - Toute sortie que l'opérationnel juge « bonne » peut être sauvegardée en un clic :
    - Ça peut être la combinaison complète « image principale + titre + texte de vente » ;
    - Ou seulement une partie, comme une structure de titre ou un texte de vente spécifique.
- **Que peut-on faire après sauvegarde ?**
  - **Réutiliser :**
    - Utiliser cette sauvegarde pour appliquer un lot de nouveaux paramètres produit, et régénérer des brouillons images/textes ;
    - Ou sur le même produit, générer plusieurs variantes basées sur ce modèle pour des tests A/B.
  - **Éditer :**
    - Modifier directement le titre / texte de vente ;
    - Si l'édition d'images est supportée, affiner le texte, les stickers, etc. sur l'image principale.
  - **Gérer :**
    - Nommer les sauvegardes, étiqueter (ex : « modèle image principale sac homme », « structure titre promo »), classer par boutique pour faciliter la recherche.
- **Comment utiliser lors de la prochaine mise en ligne ?**
  - Après import de nouveaux produits, l'opérationnel peut choisir :
    - Utiliser la logique par défaut du système, ou
    - Spécifier « utiliser un de mes modèles sauvegardés pour générer » ;
  - Le système applique automatiquement la structure et le style du modèle aux nouvelles données produit, et génère de nouveaux brouillons image principale + titre + texte de vente.
```

Si vous devez créer de nouvelles données à chaque test, cela prend beaucoup de temps. C'est là qu'on utilise généralement ce qu'on appelle des « données de test ». Vous pouvez communiquer avec l'IA de la façon suivante, pour qu'elle génère une entrée rapide de données de test sur l'interface, pour que nous puissions vérifier que toutes les fonctionnalités fonctionnent correctement :

```
J'ai besoin de tester ce parcours utilisateur pour m'assurer qu'il fonctionne complètement.
Merci de générer une entrée de données de test en te basant sur les besoins suivants,
pour que je puisse cliquer et tester rapidement si le flux complet fonctionne normalement :
1. Aider les opérationnels à générer en masse une première version de brouillons images/textes :
- **Entrée (supporte l'upload direct et l'import par lot de contenus) :**
  - Informations de base produit : nom, catégorie, marque, matière, taille, couleur, public cible, etc. ;
  - Images produit : image fond blanc / photo situation simple ;
  - Chaque génération supporte l'upload supplémentaire de captures de produits best-sellers ou liens de référence ;
  - Supporte l'import par lot via Excel, ou la saisie en ligne / upload sur la page.
  - Supporte la spécification sur la page pour sauvegarder ou non les contenus dans la bibliothèque
- **Sortie (contenu directement publiable ou après légères modifications) :**
  - Pour chaque produit, une image principale brouillon « présentable, contenant les points de vente de base » ;
  - Un titre « bien structuré, contenant les mots-clés clés » + 1-2 phrases de texte de vente.
- **Changement d'usage attendu :**
  Passer de la création de zéro pour chaque lot de produits à l'envoi d'un lot au système, puis sélection et ajustement des brouillons générés.
```

On obtient facilement le résultat (si vous trouvez qu'une donnée c'est trop peu, vous pouvez demander à l'IA de générer plusieurs cas de test) :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-30-30.png)

Résultat après clic :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-31-23.png)

À ce stade, nous obtenons directement le résultat, sans qu'il y ait un « processus de génération simulé ». Si nous voulons simuler un vrai processus de génération, nous pouvons directement parler à l'IA : « Merci de simuler un vrai processus de génération, il faut attendre un moment après le clic avant de me donner le résultat. »
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-50-05.png)

Une fois la fonctionnalité de génération validée, nous devons aussi nous assurer que la fonctionnalité de bibliothèque de modèles fonctionne correctement. Sur la carte de génération de la page, nous pouvons voir que la fonctionnalité de favoris de la bibliothèque de modèles n'est pas implémentée. Il faut alors approfondir la conversation avec l'IA : « Merci de t'assurer que le besoin [collez ici le contenu du point 2 ci-dessus] fonctionne correctement, on peut cliquer sur un résultat pour sauvegarder le modèle correspondant, et en l'ouvrant on peut voir les paramètres de génération »

La génération n'est souvent pas immédiate, il faut régulièrement corriger avec des captures d'écran :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-57-14.png)

Et finalement obtenir le résultat attendu :
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-16-12-56.png)

En plus du test manuel du parcours des besoins, vous pouvez aussi demander à l'IA de faire directement une vérification des besoins, par exemple :

- « Merci de vérifier par rapport à mon besoin initial si l'application actuelle couvre toutes les fonctionnalités clés. »
- « Aide-moi à lister un checklist des fonctionnalités, en indiquant lesquelles sont terminées, lesquelles ne sont pas encore implémentées ou ont une expérience insuffisante. »

L'IA générera généralement un checklist, à partir duquel vous pouvez décider s'il faut continuer à améliorer. Après des modifications itératives, vous obtiendrez un prototype assez abouti.

## 5. 📚 Exercice : reproduisez votre propre atelier de contenus TikTok e-commerce

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Défi : reproduire l'atelier de contenus e-commerce</div>
  </template>

  <p>
    En vous référant aux prompts et au contenu de ce cours, réalisez un cycle complet :
  </p>

  <ul>
    <li>
      <strong>Pratique du cycle complet</strong>
      <ul>
        <li>Génération de prompt de synthèse métier → génération de prototype mono-page → génération de prototype multi-pages</li>
      </ul>
    </li>
    <li>
      <strong>Partage des résultats</strong>
      <ul>
        <li>Faites une capture d'écran de votre programme et partagez-la avec tout le monde</li>
      </ul>
    </li>
    <li>
      <strong>Question de réflexion</strong>
      <ul>
        <li>Réservez de l'espace pour la prochaine section « Intégration des capacités LLM et de génération d'images à partir de texte », et anticipez : comment votre atelier pourrait-il intégrer des capacités comme « IA écrit le texte / génère les images / génère le script » ?</li>
      </ul>
    </li>
  </ul>
</el-card>

## Prochaine étape

Dans la section suivante, nous construirons sur cet atelier de production de contenus en y intégrant des capacités AI spécifiques (texte vers texte, image vers texte, texte vers image), par exemple :

- Générer automatiquement des brouillons de textes et plusieurs propositions de titres pour une tâche de contenu
- Générer automatiquement des brouillons d'images à partir de la description de la tâche (texte vers image)
- Classer et résumer automatiquement les tâches de contenu passées, pour vous aider à planifier les sujets de la prochaine promotion

<RelatedArticlesSection
  title="Continuer à apprendre"
  description="Il est recommandé de continuer dans l'ordre : intégrer les capacités AI → cycle complet du projet → ingénierie du design."
  :items="relatedArticles"
/>
