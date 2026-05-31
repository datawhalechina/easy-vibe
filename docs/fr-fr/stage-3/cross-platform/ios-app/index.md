# Comment construire une application iOS - Développement natif SwiftUI

## Chapitre 1 : Qu'est-ce qu'une application iOS et le développement d'applications iOS

Dans ce tutoriel, nous allons accomplir une boucle complète : **d'une idée dans votre esprit à une véritable application iOS qui peut être installée et exécutée avec succès sur un iPhone.**

Pour ce tutoriel, vous devez au moins disposer de :

1. Un Mac exécutant une version relativement récente de macOS
2. Un iPhone exécutant une version relativement récente d'iOS, avec le mode développeur activé
3. Xcode installé avec succès
4. Trae installé et ouvert
5. Un Apple ID utilisable

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image1.png)

### 1.1 Application iOS

Une application iOS est une application native fonctionnant sur le système d'exploitation de l'iPhone. Elle se lance rapidement, paraît fluide et peut utiliser profondément les fonctionnalités du système comme les notifications, l'appareil photo et le stockage local.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image2.png)

### 1.2 Développement d'applications iOS

À la base, construire une application iOS implique seulement quelques choses :

1. Clarifier le problème que votre application résout
2. Concevoir l'interface que les utilisateurs peuvent voir et utiliser
3. Définir le comportement de l'application sous différentes actions
4. Construire l'application correctement et l'installer sur un iPhone

### 1.3 Méthodes courantes pour construire des applications iOS

En développement réel, il y a plus d'une façon de construire une application iOS. Nous n'irons pas en profondeur ici, mais fournirons uniquement une compréhension générale.

La première méthode est l'approche native officielle d'Apple : créer un projet dans Xcode et utiliser Swift et SwiftUI pour construire l'interface et la logique.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image3.png)

La deuxième méthode est d'utiliser des frameworks multi-plateformes, comme React Native et Flutter, et adapter une base de code à plusieurs plateformes.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image4.png)

Sur la base des approches ci-dessus, ce tutoriel choisit : **le développement natif SwiftUI comme fondation, avec les outils IA effectuant la majorité du travail de codage**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image5.png)

### 1.4 Étapes de développement d'application iOS couvertes dans ce tutoriel (aperçu général)

L'application exemple utilisée dans ce tutoriel est **FridgeChef**.

L'utilisateur entre les ingrédients actuellement disponibles dans le réfrigérateur, et l'application utilise une véritable API d'IA pour générer une recette réalisable, puis sauvegarde le résultat localement pour consultation ultérieure. Cet exemple couvre entièrement les parties principales d'une véritable application iOS, incluant l'entrée et l'affichage de l'interface, les requêtes réseau, l'analyse de données, le stockage local, et l'installation et l'exécution finales sur un véritable appareil.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image6.png)

- L'idée générale du prototype à l'application native

En implémentation, ce tutoriel adopte une approche par phases. Nous utiliserons d'abord l'IA pour générer rapidement un prototype d'interface avec HTML et CSS, confirmer la structure de mise en page et la hiérarchie d'information dans le navigateur, puis le migrer dans SwiftUI.

- Aperçu du flux de développement global

Dans l'ensemble, les chapitres suivants traverseront ces étapes dans l'ordre :

1. Construire une compréhension de base
   Comprendre la forme d'une application iOS, les méthodes de développement courantes et le problème que cette application exemple résout.
2. Compléter la configuration de l'environnement
   Préparer un Mac et un iPhone, mettre à jour les systèmes, installer Xcode et Trae, et créer un projet iOS de base qui peut fonctionner avec succès dans le simulateur.
3. Entrer en développement formel
   Ouvrir le projet dans Trae et générer progressivement l'interface et l'interaction de base par conversation avec l'IA, transformant l'application d'une coquille vide en quelque chose d'utilisable.
4. Déboguer et organiser
   Lorsque des erreurs de compilation apparaissent ou le comportement ne correspond pas aux attentes, laisser l'IA aider au dépannage ; lorsque la structure devient désordonnée, utiliser l'IA pour refactoriser et simplifier.
5. Exécuter sur un véritable appareil
   Configurer la signature, installer l'application sur un véritable iPhone, et compléter une vérification complète du code au matériel.

## Chapitre 2 : Préparation de l'environnement de développement

### 2.1 Appareils et systèmes requis

Dans cette pratique, deux éléments matériels sont irremplacibles : un Mac et un iPhone.
En même temps, les deux appareils doivent exécuter **une version système officielle relativement récente**.

#### 2.1.1 Mac

Les applications iOS ne peuvent être développées et compilées que sur macOS. C'est une exigence stricte de la plateforme d'Apple.

Pour s'assurer que Xcode peut être installé et utilisé normalement, il est recommandé de mettre à jour macOS vers une version officielle relativement récente. Vous pouvez vérifier et mettre à jour depuis **Réglages Système -> Général -> Mise à jour logicielle**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 Véritable appareil iPhone

En plus du Mac, ce tutoriel nécessite également un véritable iPhone pour vérifier si l'application peut être installée et lancée correctement.

Pour garder le processus de débogage fluide, l'iPhone doit également exécuter une version iOS relativement récente. Vous pouvez vérifier et mettre à jour depuis **Réglages -> Général -> Mise à jour logicielle**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

Plus tard en développement, cet iPhone sera connecté au Mac par câble pour le débogage sur véritable appareil.

#### 2.1.3 Activer le mode développeur sur l'iPhone

Pour installer et exécuter des applications de débogage depuis Xcode sur un véritable appareil, vous devez activer le mode développeur sur l'iPhone.

Étapes :

1. Ouvrez **Réglages**
2. Entrez dans **Confidentialité et sécurité**
3. Faites défiler vers le bas et trouvez **Mode développeur**
4. Activez-le, puis redémarrez l'appareil comme demandé
5. Après le redémarrage, déverrouillez l'appareil et confirmez l'activation du mode développeur

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

Si votre iPhone n'a jamais été connecté à Xcode ou d'autres outils de développement, vous pourriez trouver que **Mode développeur** n'apparaît pas sous **Confidentialité et sécurité**. Ce n'est pas un problème système - cela signifie simplement que le mode développeur n'a pas encore été déclenché.

Dans ce cas, vous pouvez le faire apparaître en suivant ces étapes :

1. Ouvrez **Réglages -> Confidentialité et sécurité -> Analyses et améliorations**
2. Activez **Partager avec les développeurs d'applications**
3. Revenez d'un niveau, entrez à nouveau dans **Confidentialité et sécurité**, et faites défiler vers le bas
4. Vous devriez maintenant voir **Mode développeur**, puis activez-le et redémarrez l'appareil

Après avoir terminé les étapes ci-dessus, le mode développeur n'a besoin d'être activé qu'une seule fois. Le débogage futur sur véritable appareil avec Xcode ne nécessitera pas de répéter cette configuration.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 Logiciels requis

Après que les appareils et systèmes sont prêts, vous devez encore installer les logiciels utilisés pour le développement. Ce tutoriel utilise uniquement deux catégories d'outils : l'outil de développement iOS officiel et l'outil de développement assisté par IA.

#### 2.2.1 Xcode

Xcode est l'outil de développement officiel d'Apple pour iOS. Dans ce tutoriel, il est principalement utilisé pour créer des projets iOS, compiler du code Swift / SwiftUI et exécuter l'application sur le simulateur ou un véritable appareil.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image11.png)

Xcode peut être trouvé et installé directement depuis l'App Store. Après l'installation, lorsque vous l'ouvrez pour la première fois, vous verrez l'écran d'accueil. La création de projet suivante commence à partir de là.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image12.png)

#### 2.2.2 Trae

Trae est l'environnement principal où le travail de développement est effectué dans ce tutoriel. Vous placerez tout le projet iOS dans Trae et collaborerez avec l'IA par dialogue pour compléter le développement.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image13.png)

### 2.3 Apple ID et notes sur le débogage de développement

Sur la plateforme iOS, pour qu'une application soit installée sur un véritable appareil, elle doit passer par la signature de développeur. Ce tutoriel ne nécessite pas que vous payiez pour l'adhésion au Programme Développeur Apple. Un Apple ID personnel suffit.

### 2.4 Liste de contrôle avant de continuer

Avant d'entrer dans le prochain chapitre, vous pouvez comparer votre état actuel avec la liste de contrôle ci-dessous.

Vous devriez maintenant déjà avoir :

1. Un Mac exécutant une version relativement récente de macOS
2. Un iPhone exécutant une version relativement récente d'iOS avec le mode développeur activé
3. Xcode installé avec succès
4. Trae installé et ouvert
5. Un Apple ID utilisable

Si tout cela est prêt, vous pouvez continuer et créer votre première application iOS.

## Chapitre 3 : Créer le premier projet iOS

### 3.1 Utiliser Xcode pour créer un nouveau projet

Ouvrez Xcode. Sur l'écran d'accueil, choisissez de créer un nouveau projet.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image14.png)

Cliquez sur **Create new project** pour entrer dans l'écran de sélection de modèle de projet.

### 3.2 Choisir le modèle App et la stack technique

Sur l'écran de sélection de modèle, utilisez la configuration suivante :

1. Plateforme : iOS
2. Type d'application : App

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image15.png)

Cliquez sur **Next** pour entrer dans l'écran de configuration des informations du projet.

### 3.3 Configurer les informations du projet

Sur l'écran des informations du projet, remplissez simplement les paramètres de base :

1. Nom du produit : nom de l'application (par exemple `FridgeChef`)
2. Équipe : choisissez votre Apple ID personnel
3. Identifiant d'organisation : format de domaine inversé (par exemple `com.example`)
4. Identifiant de bundle : généré automatiquement, gardez le défaut
5. Système de test : Swift Testing with XCTest UI Tests
6. Stockage : choisissez Core Data (pour sauvegarder l'historique des recettes plus tard)
7. Laissez les autres options par défaut

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image16.png)

Cliquez sur **Next** et choisissez l'emplacement de stockage du projet.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image17.png)

### 3.4 Reconnaître la structure du projet après création

Après la création du projet, Xcode ouvrira automatiquement l'espace de travail. À ce stade, vous n'avez pas besoin de comprendre chaque fichier. Vous devez seulement reconnaître quelques parties clés.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image18.png)

Dans le projet par défaut, vous verrez :

- Un dossier nommé d'après le projet
- Un fichier Swift se terminant par `App` (l'entrée de l'application)
- Un fichier `ContentView.swift` (la page par défaut)

C'est déjà la plus petite application iOS exécutable.

### 3.5 Exécuter la première application iOS

Avant de changer quelque code que ce soit, exécutez directement le projet original.

Dans la barre d'outils supérieure d'Xcode, gardez le simulateur iPhone par défaut sélectionné, puis cliquez sur le bouton **Run** en haut à gauche.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image19.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image20.png)

Si tout est normal, le simulateur affichera une application vide qui peut démarrer avec succès. La première compilation peut prendre un temps relativement long. Dans les chapitres suivants, nous réduisons le temps d'attente en utilisant d'abord des prototypes HTML.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image21.png)

Pour arrêter l'application, cliquez sur **Stop** à côté du bouton Run.

### 3.6 Ce que vous avez réellement accompli à ce stade

Même si l'interface est encore simple, vous avez déjà accompli plusieurs confirmations clés :

1. Le projet peut compiler avec succès
2. Le simulateur peut exécuter l'application correctement
3. Le processus de développement a déjà été prouvé fonctionnel de bout en bout

Cela signifie que les problèmes futurs se concentreront principalement sur **le code et la logique eux-mêmes**, plutôt que sur des problèmes d'environnement.

### 3.7 Transférer le projet à Trae

À partir de la section suivante, le travail de développement principal sera progressivement transféré dans Trae.

Ce que vous devez faire est simple : **ouvrez le dossier du projet iOS que vous venez de créer dans Trae.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image22.png)

## Chapitre 4 : Pratique de développement assisté par l'IA - Construire FridgeChef à partir de zéro

Ce chapitre est la partie principale de tout le tutoriel.

Ce tutoriel n'utilise pas la route traditionnelle de "écrire d'abord SwiftUI, compiler à plusieurs reprises et ajuster continuellement les aperçus." Au lieu de cela, nous utilisons un flux plus efficace :
**utiliser d'abord HTML pour valider rapidement la structure de l'interface, puis migrer le résultat confirmé dans SwiftUI, et finalement compléter progressivement la logique métier, les données locales et les détails d'interaction.**

### 4.1 Étape une : Clarification des exigences

Avant d'écrire du code, la première étape n'est pas de construire des pages - c'est de clarifier ce que nous construisons. **Laissez d'abord l'IA agir comme un chef de produit et organiser les exigences en un document de spécification structuré.**

Dans la fenêtre de chat de Trae, entrez l'instruction suivante. Trae générera un fichier `REQUIREMENTS.md` à la racine du projet, décrivant la fonctionnalité et la structure de toute l'application.

Prompt à copier :

```text
We are now going to develop an iOS App called "FridgeChef".

1. Core concept
This is an AI assistant that solves the problem of "I don't know what to cook with the leftover ingredients in my fridge."
Users input the ingredients they currently have, and the app calls a large model to generate a practical recipe.

2. Core functions
- Home page:
  Show a prominent "Start Cooking" entry, and below it display historical recipe records in card or list form.
- Input page:
  Users input ingredients, supporting text input or simple quick tags.
- Result page:
  Display the AI-generated recipe, including dish name, ingredient list, and cooking steps.

3. Technical requirements
- Use SwiftUI
- Save data locally (Core Data)
- Support basic page navigation and state updates

Please help me organize this into a clear, structured REQUIREMENTS.md document from the perspective of a product manager, and save it in the project root.
```

Après la génération, lisez rapidement le document et confirmez si les points de fonctionnalité correspondent à vos attentes.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23.png)

### 4.2 Étape deux : Prototype visuel

Laissez l'IA dessiner rapidement un prototype d'interface haute-fidélité en utilisant **HTML + CSS**, pour que nous puissions d'abord confirmer la mise en page et le style globaux. Continuez en entrant ceci dans Trae :

Prompt à copier :

```text
The requirements are confirmed.
Please use HTML + Tailwind CSS to generate a high-fidelity interface prototype for me.

Design style: Neo-Pop
Colors:
- Background: light cream #FFFDF5
- Accent colors: acid green #CCFF00, hot pink

Visual characteristics:
- 3px thick black borders
- Hard shadow without blur (offset 4px)
- Large rounded cards, overall sticker / comic feeling

Layout requirements:
- Home page should use a Bento Grid-like layout
- Include two screens: home page and input page

Please generate a single-file index.html and simulate an iPhone screen ratio around the content.
```

Après la génération, trouvez `index.html` dans la liste de fichiers et ouvrez-le directement dans un navigateur.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

À ce stade, l'important n'est pas que chaque détail soit parfait. L'important est de savoir si **la structure de la page est raisonnable, les éléments principaux sont complets et la direction générale est correcte.**

### 4.3 Étape trois : Recréation native

Une fois le prototype HTML finalisé, **traduisez l'interface confirmée en SwiftUI.**

Étapes :

1. Téléversez le fichier `index.html` (ou une capture d'écran du navigateur) dans Trae
2. Dites à l'IA de générer du code SwiftUI basé dessus

Prompt à copier :

```text
[index.html uploaded]

Please read the layout and style of this HTML file.

Task: recreate this interface in the current project using SwiftUI.

Requirements:
1. Encapsulate a NeoPopStyle modifier including background color, thick border, and hard shadow
2. Create HomeView.swift for the home layout
3. Create InputView.swift for the input page
4. Use Mock Data for now, and make sure it can display correctly in Xcode Preview and simulator
```

Après qu'elle a terminé, ouvrez Xcode et exécutez le simulateur. Vous verrez une application iOS qui a déjà une structure visuelle complète.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 Étape quatre : Connecter l'API d'IA

Une fois l'interface terminée, l'application n'est encore qu'une couche d'affichage. Ensuite, nous devons connecter une véritable capacité d'IA. Dans ce tutoriel, nous utilisons le service de grand modèle fourni par **SiliconFlow** :
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow fournit une API compatible avec la spécification API OpenAI, donc il est très pratique à appeler depuis un projet iOS en utilisant des requêtes réseau standard.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

Avant de commencer, vous devez créer un compte sur le site et créer une clé API.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

Cette clé sera utilisée pour les appels de modèle ultérieurs.

Prompt à copier :

```text
Now we need to connect AI capability.

Please create APIService.swift.

Configuration:
- Base URL: https://api.siliconflow.cn/v1
- Model: Qwen/Qwen2.5-7B-Instruct
- API Key: define it as a variable for now, I will fill it later

Functions:
- Write a generateRecipe(ingredients: [String]) method
- The System Prompt must strictly require the model to return pure JSON only
- JSON fields should include: dishName, ingredients, steps

Also define a RecipeModel struct for parsing the returned data.
```

Après la génération du code, remplissez votre propre clé dans `APIService.swift`.

### 4.5 Étape cinq : Stockage local Core Data

Pour que l'application se souvienne des recettes qu'elle a générées, nous devons introduire le stockage de données local. Cette étape est divisée en deux parties.

**Étape 1 : configurer manuellement Core Data dans Xcode**

1. Ouvrez `FridgeChef.xcdatamodeld`
2. Créez une nouvelle Entity nommée `RecipeEntity`

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. Ajoutez les attributs suivants :
   1. `id` : **UUID**
   2. `name` : **String**
   3. `cookTime` : **String**
   4. `difficulty` : **String**
   5. `desc` : **String**
   6. `timestamp` : **Date**
   7. `colorIndex` : **Integer 16**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**Étape 2 : laisser l'IA écrire le code logique**

Prompt à copier :

```text
I have finished configuring the Core Data Entity.

Entity: RecipeEntity
Attributes: id, name, difficulty, timestamp, colorindex, cookTime, desc

Please complete the following tasks:
1. Save data into Core Data after recipe generation succeeds
2. Use FetchRequest on the home page to read historical records and display them in reverse chronological order
3. When the database is empty, show a friendly empty-state message
```

### 4.6 Étape six : Générer une icône d'application

La dernière étape est de préparer une icône appropriée pour l'application. Ici, nous utilisons **Lovart** pour générer l'icône : [https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

Prompt à copier dans Lovart :

```text
Subject: A cute anthropomorphic fridge character with a happy face
Style: Minimalistic App Icon, Neo-pop style, thick black outlines, vector art
Colors: Acid green (#CCFF00) and deep blue
Background: Solid cream color
Negative Prompt: Text, realistic details, 3D render, complex background
```

Après la génération, recadrez l'image en 1024x1024 et glissez-la dans `Assets.xcassets` -> `AppIcon` dans Xcode.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

Exécutez à nouveau l'application, et vous verrez maintenant une application iOS complète, reconnaissable et réelle.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 Étape sept : Amélioration avancée de l'expérience

Une fois la fonctionnalité stabilisée, si vous voulez améliorer davantage le style visuel, il suffit de décrire l'effet souhaité à l'IA, de la laisser générer une nouvelle proposition de conception, puis de migrer le résultat confirmé dans SwiftUI.

Prompt de référence :

```text
The app's functionality is already complete, but I want to try a more visually impactful UI style.
Please first generate a new design draft in HTML + Tailwind CSS for me, with the file name design_v2.html.

Design style: Neo-Pop (dopamine style)
Color requirements:
Use Deep Royal Blue as the full-screen background
Use Acid Green (#CCFF00) as the accent color

Visual feel:
All cards should use a 3px thick black border
Use a hard shadow without transparency blur, shifted down-right

Layout requirements:
Keep the home page structure unchanged
Use pill-shaped buttons and input boxes

Please generate the full code so I can preview it in a browser.
```

Après la génération, ouvrez ce fichier HTML dans un navigateur.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

Une fois la version HTML finalisée, vous pouvez commencer à modifier le projet iOS.

Prompt de référence :

```text
[design_v2.html uploaded]
Please analyze the visual style of this HTML and migrate it into the current iOS project.

Task requirements:
Create a new NeoPopStyle.swift file
Encapsulate a neoPopBlue() style modifier

The modifier needs to include:
- rounded corners
- thick black border
- opaque hard shadow

Refactor HomeView:
- change the background to Deep Royal Blue
- use Acid Green for the primary button
- use white background for historical record cards
- make sure text remains clear and readable on the dark background

Please provide the full modified code.
```

Cliquez à nouveau sur Run dans Xcode. Si tout fonctionne, vous devriez voir :

- la fonctionnalité est exactement la même qu'avant
- le style visuel a changé significativement
- la qualité globale de l'application est nettement améliorée

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image38.png)

## Chapitre 5 : Exécution, débogage et gestion des erreurs

Dans le chapitre précédent, vous avez complété la fonctionnalité principale et exécuté avec succès l'application dans le simulateur.
Mais pour une application iOS, la véritable complétion n'est pas seulement "compile avec succès" - c'est **un fonctionnement stable, et savoir comment gérer les problèmes lorsqu'ils apparaissent**.

### 5.1 Exécuter l'application dans Xcode

D'abord, assurez-vous que le projet peut fonctionner correctement dans Xcode.

En haut à gauche d'Xcode, sélectionnez l'appareil d'exécution et gardez le simulateur iPhone par défaut. Cliquez sur le bouton **Run** pour compiler et exécuter. Si tout est normal, l'application se lancera dans le simulateur et affichera l'interface construite au Chapitre 4.

### 5.2 Exécuter l'application sur un véritable appareil

Connectez votre iPhone au Mac en utilisant un câble.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image39.png)

Lors de la première connexion, le téléphone affichera **Faire confiance à cet ordinateur ?** Appuyez sur Faire confiance et entrez le code de déverrouillage.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image40.png)

Dans la liste des appareils d'Xcode, sélectionnez votre iPhone, puis cliquez à nouveau sur **Run**.

À ce stade, vous devriez pouvoir voir l'icône **FridgeChef** sur l'écran d'accueil de votre téléphone, et l'ouvrir et l'utiliser normalement.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image41.png)

Cette étape marque l'achèvement d'une boucle complète de développement iOS.

### 5.3 D'où viennent généralement les erreurs de développement iOS

En développement réel, **rencontrer des erreurs est normal**, pas une exception.

Les problèmes courants viennent généralement de ces catégories :

1. **Erreurs de compilation**
   Syntaxe Swift, inadéquation de types, paramètres manquants, etc. Xcode les mettra directement en évidence en rouge.
2. **Erreurs d'exécution**
   L'application compile, mais plante pendant l'exécution - par exemple, dépassement de tableau ou déballage forcé d'une valeur nil.
3. **Erreurs de permission ou de configuration**
   Requêtes réseau bloquées par le système, configuration Info.plist manquante, problèmes de signature, etc.
4. **Erreurs de logique**
   L'application ne plante pas, mais le comportement est incorrect - par exemple, boutons ne répondant pas ou données ne se rafraîchissant pas.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image42.png)

Lorsque n'importe quelle erreur apparaît, vous devez seulement **copier le message d'erreur complet tel quel dans la boîte de chat de Trae.** Avec la conscience du contexte du projet, Trae peut vous aider à déboguer.

### 5.4 Erreurs courantes de débogage sur véritable appareil et solutions

Les erreurs lors du débogage sur véritable appareil sont très courantes. Ces problèmes ne sont généralement pas causés par le code lui-même, mais par la confiance de l'appareil, les règles de sécurité ou la configuration de signature. Si l'application ne peut pas fonctionner correctement sur votre iPhone, vous pouvez vérifier cette section en premier.

#### 1. Problèmes de signature et d'enregistrement

**Symptômes courants :**

- Xcode affiche des erreurs rouges comme
  `"Communication with Apple failed"`
  ou
  `"No profiles for 'com.xxx.xxx' were found"`
- Ou il indique
  `"Your team has no devices which are compatible"`

**Cause :**

- L'identifiant de bundle n'est pas unique ou valide
- L'iPhone actuel n'a pas encore été enregistré sous votre Apple ID pour le développement

**Solution :**

1. **Modifier l'identifiant de bundle**
   Dans les paramètres du projet Xcode, changez l'identifiant de bundle en quelque chose de plus unique, comme :
   `com.yourname.FridgeChef`
2. **Laisser Xcode enregistrer automatiquement l'appareil**
   Dans le message d'erreur, cliquez sur `Try Again` ou `Register Device`, et laissez Xcode compléter l'enregistrement de l'appareil et la configuration du certificat automatiquement.

#### 2. Problèmes d'appariement et de connexion de l'appareil

**Symptômes courants :**

- Xcode affiche
  `"Device is not available because pairing is in progress"`
- Ou il indique
  `"Device Locked"`
- Ou vous avez déjà appuyé sur Faire confiance, mais Xcode reste bloqué

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image43.png)

**Cause :**

- L'iPhone est encore verrouillé
- Le processus d'appariement ne s'est pas complètement terminé
- Xcode n'a pas rafraîchi l'état de connexion

**Solution :**

1. Déverrouiller le téléphone
   Assurez-vous que l'iPhone est déverrouillé et reste sur l'écran d'accueil.
2. Terminer le processus de confiance
   Lorsque le téléphone affiche **Faire confiance à cet ordinateur ?**, appuyez sur **Faire confiance** et **entrez le code de déverrouillage**.
3. Rafraîchir l'état de connexion
   Si cela reste bloqué, débranchez le câble, attendez 2-3 secondes, et rebranchez. Si nécessaire, redémarrez Xcode et réessayez.

#### 3. L'application s'installe mais ne peut pas s'ouvrir

**Symptôme courant :**

- L'icône de l'application apparaît déjà sur l'écran d'accueil de l'iPhone
- Le système affiche
  **Développeur non approuvé**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image44.png)

**Cause :**

C'est un mécanisme de sécurité iOS. Les applications de débogage installées avec un Apple ID personnel nécessitent une autorisation de confiance manuelle.

**Solution :**

1. Ouvrez **Réglages**
2. Entrez dans **Général**
3. Appuyez sur **VPN et gestion des appareils**
4. Sous **App de développeur**, trouvez votre Apple ID
5. Appuyez sur **Faire confiance**, puis confirmez à nouveau

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image45.png)

Après cela, retournez à l'écran d'accueil et appuyez à nouveau sur l'application. Elle devrait maintenant fonctionner normalement.

## Chapitre 6 : Si vous voulez publier l'application sur l'App Store

Dans ce tutoriel, ce que nous avons principalement accompli est la boucle complète pour une **version de développement et de débogage personnelle d'une application** : de la création du projet, l'implémentation des fonctions et le débogage, jusqu'à l'installation et l'utilisation réussie sur un véritable appareil.

Si vous voulez aller plus loin et publier formellement l'application sur l'**Apple App Store** pour que tous les utilisateurs puissent la télécharger et l'utiliser, vous devez entrer dans un processus de publication plus formel. Puisque ce processus implique un compte développeur payant, des règles de révision et des exigences de conformité, et qu'il n'est pas l'objectif pratique principal de ce tutoriel, le contenu suivant est fourni uniquement comme **référence générale et feuille de route**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image46.png)

> Le contenu suivant fait référence aux exigences de révision officielles d'Apple et aux discussions publiques d'expérience (incluant un partage original sur Zhihu). Les liens sont listés ci-dessous. Si un lien devient indisponible, vous pouvez rechercher par titre ou mot-clé pour trouver la source originale.

### 6.1 Programme Développeur Apple

Pour publier une application sur l'App Store, vous devez rejoindre le programme développeur payant d'Apple :

- **Apple Developer Program** (99 USD par an)
- Site officiel : [https://developer.apple.com/](https://developer.apple.com/)

Après l'adhésion, vous pouvez utiliser **App Store Connect** pour créer la fiche de l'application, gérer les versions et publier formellement.

### 6.2 App Store Connect : Créer la fiche de l'application

Dans App Store Connect, vous devez créer un enregistrement complet de l'application, incluant mais sans s'y limiter :

1. Nom de l'application et identifiant de bundle
2. Description, mots-clés et lien de politique de confidentialité
3. Icône de l'application, captures d'écran et matériaux de prévisualisation
4. Paramètres de tarification et de région de distribution

Toutes ces informations doivent être complétées avant que la soumission puisse être effectuée.

### 6.3 Construire et soumettre pour révision

Après que les métadonnées sont prêtes, vous devez :

1. Utiliser le compte développeur payant dans Xcode pour signer un build Release
2. Construire et téléverser la version formelle
3. La soumettre pour révision dans App Store Connect

Après la soumission, l'application entre dans la file d'attente de révision d'Apple. Le temps de révision est typiquement de 1 à 3 jours, selon le cas.

### 6.4 Règles de révision et raisons courantes de rejet

Apple révise principalement les applications sous les aspects suivants :

- fonctionnalité et stabilité
- conformité en matière de confidentialité et de données
- cohérence entre les métadonnées et la fonctionnalité réelle
- s'il y a contrefaçon ou comportement trompeur

Si l'application ne répond pas aux exigences, la révision sera rejetée et Apple fournira une raison spécifique. Le développeur doit alors modifier l'application et la soumettre à nouveau.

### 6.5 Que faire après un rejet

Si l'application est rejetée, vous pouvez :

- modifier le code ou la description selon le retour
- soumettre à nouveau la version
- communiquer avec l'équipe de révision via App Store Connect

C'est une partie très courante du processus de publication et ne signifie pas que le projet a échoué.

### Sources de référence

Le contenu suivant fait référence à la documentation officielle d'Apple et au partage d'expérience publique :

- App Store Review Guidelines (officiel Apple)
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- Guide officiel pour soumettre à la révision
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- Guide illustré complet de publication et pièges de révision iOS App Store (Zhihu)
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## Chapitre 7 : Résumé

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

Félicitations ! À ce stade, vous avez personnellement traversé le processus complet de développement d'application iOS de 0 à 1. De la configuration de l'environnement, l'exécution du projet, puis l'atterrissage progressif de l'interface, de la fonctionnalité, des données et des tests sur véritable appareil, toutes les étapes clés ont été accomplies avec succès. Plus important encore, vous n'êtes pas arrivé ici en mémorisant la syntaxe Swift - vous avez confié la majeure partie de l'implémentation à l'IA. Quel que soit votre background, chaque tentative comme celle-ci vous rend plus fluide, et vous réaliserez que le développement iOS n'est pas aussi difficile qu'il le paraissait. Même si vous ne pouviez pas écrire une seule ligne de code avant, vous pouvez quand même construire votre propre application.

En y repensant, tout le processus n'est en fait pas si compliqué : décidez ce que vous voulez construire, utilisez HTML pour tester rapidement l'interface, convertissez-la en SwiftUI, connectez l'API et les données locales, puis passez par le débogage une fois. Sur cette base, à l'avenir vous pourrez aussi construire facilement un réveil personnel, une liste de tâches minimale, ou même un chatbot qui parle avec le ton de votre célébrité préférée.

C'est exactement la chose la plus importante que ce tutoriel - et easy-vibe - veut vous enseigner. J'ai hâte de voir les créations les plus récentes de vous tous, futurs maîtres du vibe coding, et le jour où je serai ébloui par votre travail.
