# Comment construire le Mini Program WeChat le plus simple

# 1. Ce que sont les Mini Programs WeChat et le développement de Mini Programs

Dans ce tutoriel, nous allons réaliser une boucle complète : depuis une idée dans votre esprit jusqu'à un vrai mini program qui peut être recherché et ouvert par QR code dans WeChat.

Avant de commencer la construction, nous devons établir deux compréhensions de base.

La première est **l'essence** : qu'est-ce qu'un mini program WeChat exactement ? En quoi diffère-t-il d'une application ou d'un site web classique ? Pourquoi tant de produits choisissent-ils ce format ? Ce n'est qu'en comprenant la logique fondamentale que vous pourrez juger si votre idée correspond à un mini program.

La seconde est **le parcours** : lorsque vous dites « je veux construire un mini program », à quoi ressemble le chemin complet du zéro au lancement ? Quels sont les nœuds clés sur ce parcours - à quoi penser pendant l'idéation, comment configurer l'environnement, comment le développement assisté par IA améliore l'efficacité, quels pièges apparaissent lors du débogage dans le simulateur, et ce que résolvent les comptes de test par rapport à la publication officielle. Si vous parcourez mentalement ce processus d'abord, vous ne vous perdrez pas pendant la mise en œuvre.

Une fois ces deux questions clarifiées, nous pouvons entrer formellement dans le développement. Commençons par la première question : qu'est-ce qu'un mini program WeChat exactement ?

## 1.1 Le Mini Program WeChat

Un mini program WeChat peut être vu comme une application vivant dans WeChat. Vous n'avez pas besoin de rechercher dans un app store, de télécharger ou d'installer. Les utilisateurs peuvent rechercher par nom dans WeChat, scanner un QR code, ou ouvrir une carte partagée et l'utiliser immédiatement. Après utilisation, il suffit de le fermer. Il n'occupe pas en permanence l'écran d'accueil ou le stockage du téléphone.

Pour les utilisateurs ordinaires, les mini programs résolvent de nombreuses « petites tâches » : suivi de livraison, commande de café, consultation de commandes, jouer à un jeu rapide. Le démarrage rapide et l'entrée unifiée dans WeChat sont ses plus grands atouts en matière d'expérience.

Pour les entreprises et les développeurs, les mini programs sont un format de « petite application » recherchable et partageable. Il suffit de s'inscrire sur la Plateforme Officielle WeChat, de compléter les paramètres et de passer la revue pour que votre mini program soit ouvert à tous les utilisateurs WeChat. Comparé aux applications traditionnelles, il est plus facile d'obtenir les premiers utilisateurs car les gens sont déjà habitués à accomplir de nombreuses tâches dans WeChat.

Dans ce tutoriel, nous ne construirons pas un système métier complexe. Nous choisissons un exemple classique : le jeu du Serpent. Il est petit et logiquement clair, tout en incluant les éléments complets qu'un mini program devrait avoir : plusieurs pages, interactions simples, changements d'état, enregistrement des scores, etc. C'est parfait comme premier projet.

## 1.2 Le développement de Mini Programs WeChat

Après avoir compris « ce que sont les mini programs », la question suivante est : que implique réellement le développement d'un mini program ?

Vous avez besoin d'un objectif clair (par exemple, un jeu du Serpent que les utilisateurs peuvent jouer à tout moment), concevoir l'interface que les utilisateurs verront, définir ce qui doit se passer sous différentes actions, et enfin le publier.

Dans le développement traditionnel, les programmeurs dirigent généralement toutes ces étapes et écrivent beaucoup de code. Dans le développement assisté par IA, cela peut être réparti plus clairement : vous expliquez ce que vous voulez, et l'IA vous aide avec la plupart des détails de mise en œuvre. Cela signifie que pour les débutants, la compétence la plus importante n'est plus de mémoriser la syntaxe, mais de décrire clairement les besoins et de comprendre les résultats de l'IA.

## 1.3 Plusieurs façons de développer des Mini Programs WeChat

Dans les projets réels, les gens utilisent différentes approches techniques. Pour éviter de vous submerger de termes au début, nous ne ferons qu'une classification grossière pour que vous compreniez les parcours courants.

La première méthode consiste à utiliser directement les capacités natives officielles. Après avoir créé un projet dans WeChat DevTools, vous verrez un ensemble fixe de types de fichiers utilisés pour décrire la structure des pages, les styles et la logique. Cette approche reste proche de la documentation officielle et offre un contrôle solide, mais pour les apprenants frontend débutants, la courbe d'apprentissage est un peu plus raide.

La deuxième méthode consiste à utiliser des frameworks cross-end, comme uni-app. Vous écrivez principalement du code de type web localement (par exemple des fichiers `.vue`), et le framework convertit ce code en formats exécutables par les mini programs WeChat. L'avantage est une structure unifiée. Si vous publiez ensuite sur d'autres plateformes (comme H5 ou App), les modifications sont relativement moindres.

Sur la base de ces deux méthodes, ce tutoriel se concentre sur le SOP des mini programs utilisant des outils assistés par IA. Par exemple, ouvrez tout le projet dans Trae et dites directement à l'IA intégrée : « Veuillez ajouter une page d'accueil avec titre et bouton dans ce fichier » ou « Veuillez créer une page de jeu qui affiche le serpent et le score. » L'IA générera de nouveaux extraits de code ou modifiera/remaniera le code existant en fonction du contexte actuel du projet.

Ces trois approches ne sont pas mutuellement exclusives. Vous pouvez tout à fait construire dans un projet uni-app tout en utilisant Trae AI pour la majorité du travail de codage. La clé n'est pas de choisir une méthode, mais de savoir où vous en êtes maintenant et quels outils sont disponibles.

## 1.4 Étapes de développement de Mini Programs WeChat couvertes dans cet article (Aperçu général)

Ce tutoriel suit un rythme allant de **l'environnement au produit final**. Autour de l'exemple du Serpent et du style vibecoding Trae, nous divisons le processus en un parcours réutilisable. Dans les chapitres suivants, vous traverserez ces étapes :

1. Construire les fondations conceptuelles : comprendre ce que sont les mini programs, quelles méthodes de développement courantes existent, et à qui s'adresse ce mini program Serpent et dans quels scénarios il est utilisé.
2. Préparer l'environnement : enregistrer un compte de mini program, installer HBuilderX, Trae et WeChat DevTools, puis créer une structure de projet de base avec HBuilderX qui peut s'exécuter dans WeChat DevTools et afficher d'abord la page la plus simple.
3. Entrer dans le développement formel : ouvrir le projet dans Trae, utiliser le dialogue vibecoding avec l'IA pour générer pas à pas la page d'accueil et la mise en page du jeu, et implémenter le gameplay principal comme le déplacement du serpent, la nourriture et la fin de partie.
4. Après que les fonctionnalités principales fonctionnent, apprendre à utiliser l'IA comme « partenaire de débogage et remaniement » : lui demander de diagnostiquer les bugs, nettoyer la structure quand le code devient désordonné, et ajouter progressivement des détails comme démarrage/pause, enregistrement des meilleurs scores et peaufinage de l'UI.
5. Entrer dans la publication : construire le projet en une version reconnaissable par WeChat, prévisualiser et tester sur de vrais appareils dans WeChat DevTools, lancer d'abord avec un compte de test et une version d'expérience pour validation du processus, puis compléter l'enregistrement et la revue avant la publication formelle pour que d'autres puissent rechercher et jouer à votre mini program.

Cette section ne dresse que la carte complète et ne développe pas encore les commandes ou les détails de code. Pour l'instant, retenez ces 5 étapes : **Comprendre -> Configurer l'environnement -> Développement Vibecoding -> Déboguer et peaufiner -> Construire et publier**. Les chapitres suivants zoomeront sur chaque étape, montrant ce qu'il faut préparer, quoi dire à l'IA et quels résultats vous devriez voir à l'écran à chaque étape.

# 2. Préparation de l'environnement

Avant d'écrire la moindre ligne de code, préparons d'abord l'environnement.
Le but de cette partie est de vous assurer que vous ne resterez plus jamais bloqué sur **où télécharger les outils et pourquoi les choses ne fonctionnent pas**, pour que vous puissiez vous concentrer directement sur le dialogue avec l'IA et la mise en œuvre des besoins.

Si vous savez ouvrir un navigateur, télécharger des fichiers et double-cliquer sur des installateurs, vous pouvez terminer cette section.

## 2.1 Les trois outils utilisés dans ce tutoriel

Pour le développement du mini program Serpent, nous utilisons trois outils ensemble, chacun avec des responsabilités différentes :

1. Le premier est Trae. Considérez-le comme un éditeur de code intégré à l'IA. Il peut ouvrir les fichiers du projet comme un IDE normal et aussi vous permettre de discuter avec l'IA en langage naturel pour générer, modifier et expliquer le code. La plupart des opérations « construire un mini program avec l'IA » de ce tutoriel se déroulent dans Trae. Téléchargez la dernière version depuis https://www.trae.cn .
2. Le deuxième est HBuilderX. Il offre un support solide pour Vue et uni-app, et propose des modèles de mini programs prêts à l'emploi. Nous l'utilisons pour « générer en un clic » un projet de mini program de base - c'est poser les fondations avant de le confier à Trae + IA pour une itération ultérieure. Téléchargez depuis https://www.dcloud.io/hbuilderx.html .
3. Le troisième est WeChat DevTools. Cet outil officiel est utilisé pour développer et prévisualiser les mini programs. Il exécute votre projet sur ordinateur et supporte le débogage sur appareil réel mobile. Téléchargez depuis https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .

En résumé : HBuilderX crée rapidement le projet de base, Trae vous aide à coder avec l'IA, et WeChat DevTools affiche le mini program en cours d'exécution.

## 2.2 Enregistrer un compte sur la Plateforme Officielle WeChat et obtenir l'AppID

Une fois les outils prêts, vous avez encore besoin d'une **identité de mini program**, qui est créée sur la Plateforme Officielle WeChat.
Si vous n'avez jamais enregistré de mini program auparavant, suivez cet ordre :

1. Entrez https://mp.weixin.qq.com dans votre navigateur, ouvrez la Plateforme Officielle WeChat, et connectez-vous en scannant le QR code avec WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image1.webp)

2. Choisissez « Mini Program » sur la page d'accueil et complétez les invites d'enregistrement, y compris l'email, le numéro de téléphone et le type d'entité (individuel ou entreprise).
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image2.png)
3. Après un enregistrement réussi, entrez dans le backend, trouvez « Development Management » ou « Development Settings », et vous verrez un identifiant unique nommé AppID. C'est l'identité de votre mini program et sera utilisé dans la configuration du projet ultérieurement.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image3.png)

Il est recommandé de sauvegarder l'AppID dans un endroit facile à retrouver. Dans les sections suivantes, nous remplirons cette valeur directement pour associer le projet local à votre mini program en ligne.

## 2.3 Installer WeChat DevTools

Ensuite, nous avons besoin d'un endroit pour exécuter et prévisualiser réellement les mini programs. C'est exactement à cela que sert WeChat DevTools.

1. Visitez la page de téléchargement https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .
   Sur cette page, vous verrez des versions pour différents systèmes d'exploitation. Choisissez généralement la version stable correspondant à votre système, comme Windows 64-bit ou macOS.
2. Après le téléchargement, double-cliquez sur l'installateur et suivez l'assistant pas à pas. En cas de doute, gardez les options par défaut.
3. Après l'installation, lancez WeChat DevTools depuis le bureau ou le menu démarrer. Au premier lancement, il affiche un QR code et vous demande de scanner avec WeChat. Scannez et autorisez pour accéder à l'interface principale.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image4.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image5.png)

Plus tard, une fois les fichiers du projet prêts dans Trae, nous importerons le mini program construit dans WeChat DevTools et verrons les résultats d'exécution réels ici.

## 2.4 Préparer Trae et HBuilderX

Enfin, installez les deux outils utilisés pour le codage réel : Trae et HBuilderX.

Vous pouvez **installer Trae en premier**. Visitez https://www.trae.cn dans le navigateur et téléchargez la bonne version pour votre système. L'installation est comme pour un logiciel normal : double-cliquez sur l'installateur et suivez les instructions. Après l'installation, vous obtenez un IDE qui peut ouvrir des dossiers locaux, inspecter le code et discuter avec l'IA. Toutes les étapes de vibecoding ultérieures se déroulent ici.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image6.png)

**Ensuite installez HBuilderX**. Visitez https://www.dcloud.io/hbuilderx.html et téléchargez le package pour votre système. HBuilderX est léger et démarre rapidement. Après l'installation, vous pouvez jeter un coup d'œil rapide à l'interface ; pas besoin d'étudier les fonctionnalités en profondeur maintenant. Dans les chapitres suivants, nous l'utiliserons pour créer un modèle de mini program uni-app comme point de départ du projet.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image7.png)

Après avoir terminé cette section, votre environnement est complet : vous avez un compte de mini program + AppID, un outil de prévisualisation d'exécution, et un IDE de codage IA. Ensuite, nous commençons par **créer le premier squelette de projet** et faire fonctionner ces outils.

## 2.5 Préparer les fichiers de base

1. Cliquez sur « New Project ».

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image8.png)

2. Choisissez le modèle par défaut, définissez le nom du mini program, sélectionnez le chemin de stockage, puis cliquez sur créer dans le coin inférieur droit :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image9.png)

3. L'écran de création réussie apparaît :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image10.png)

4. Ensuite, trouvez ce dossier dans le système de fichiers, ouvrez-le dans Trae, et vous verrez que les fichiers de base sont tous prêts :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image11.png)

# 3. Développement du Mini Program

Dans les deux premières parties, nous avons déjà clarifié « ce que sont les mini programs » et « comment configurer les outils et l'environnement ». À partir de cette section, nous entrons dans la pratique : non seulement des concepts, mais l'IA vous aidant réellement à construire le mini program Serpent depuis zéro.

Dans cette section, vous parcourerez un SOP complet pour la phase de développement, incluant approximativement :

1. Ouvrir le projet actuel dans Trae et donner à l'IA votre première instruction complète pour qu'elle conçoive et implémente une version exécutable du Serpent basée sur le squelette actuel.
2. Laisser Trae modifier directement les fichiers réels du projet, pas seulement produire du « code d'exemple », et apprendre à utiliser le rollback pour restaurer l'état précédent si nécessaire.
3. Retourner dans HBuilderX et WeChat DevTools, exécuter dans le simulateur de mini program, et jouer à cette version dans le simulateur pour passer de la « perspective code » à la « perspective utilisateur ».
4. Sur la base des résultats du jeu, continuer à proposer des modifications en langage naturel et laisser l'IA itérer les contrôles du bouton vers le joystick, tout en expérimentant une boucle complète de « trouver le problème -> décrire le problème -> l'IA corrige -> vérifier à nouveau ».

Vous pouvez choisir de concevoir chaque page et chaque bouton avant le développement.
Mais pour les débutants complets, la conception d'interface et d'interaction est elle-même aussi un nouveau domaine (nous montrerons plus tard la conception assistée par IA). Donc dans ce tour, nous utilisons intentionnellement une autre approche : commencer d'abord - laisser l'IA générer une version exécutable, puis affiner progressivement en visualisant les effets et en discutant en langage naturel.

## 3.1 Expliquer les besoins clairement en une seule fois : donner à Trae le premier « prompt maître »

Après avoir ouvert le projet de mini program préparé dans Trae, je ne me suis pas précipité pour éditer une ligne spécifique. Au lieu de cela, j'ai dit à l'assistant IA intégré :

**J'ai donné une commande à l'IA : sur la base du framework actuel, construire un mini program Serpent. Veuillez concevoir ce mini program et m'écrire un prompt.**

En d'autres termes, je ne lui ai pas demandé d'« écrire une fonction pas à pas ». J'ai d'abord lancé un objectif complet, laissé l'IA aider à planifier, et l'IA non seulement a planifié mais a aussi directement posé la première implémentation.

Après avoir reçu cette instruction, Trae lit la structure du projet actuel, détermine où ajouter des pages et où ajouter de la logique, et modifie directement les fichiers/code du projet. Vous n'avez pas besoin d'écrire le code à la main ni de créer/modifier manuellement les dossiers.

## 3.2 Laisser l'IA modifier le vrai code automatiquement, pas de codage manuel

Lorsque vous exécutez cette instruction dans Trae, l'IA entre dans un flux « d'édition de projet ». Pendant ce processus, vous pouvez observer les points clés suivants :

1. Elle explique sa réflexion dans la zone de chat, par exemple dans quels répertoires elle ajoutera des pages et comment elle organisera la logique du jeu.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image12.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image13.png)

2. Elle édite directement les fichiers réels du projet, au lieu de donner seulement du « code d'exemple » à copier-coller.
3. Après avoir terminé, Trae produit un court résumé vous indiquant quels fichiers ont été modifiés et ce qui a été fait.

Si vous n'êtes pas satisfait de ce tour (ou pensez que quelque chose ne va pas), pas besoin de paniquer. Trae offre un rollback en haut à gauche en dehors de la boîte de chat. Vous pouvez restaurer l'état du projet avant cette instruction en un clic - comme une touche d'annulation de sécurité.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image14.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image15.png)

## 3.3 Visualiser les effets dans HBuilderX et WeChat DevTools

Après que l'IA a terminé le premier tour de développement, le code a été écrit dans le projet, mais vous n'avez encore rien vu de l'effet côté joueur.
Ensuite, nous devons l'exécuter.

Opération spécifique : retournez dans HBuilderX, trouvez le menu supérieur « Run », sélectionnez « Run to Mini Program Simulator » -> « WeChat DevTools ». Cela déclenche la construction du projet et ouvre le résultat dans WeChat DevTools.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image16.png)

Le panneau de sortie en bas affiche le processus de construction. Si l'état final est « ready » sans erreurs, la construction a réussi. Basculez ensuite vers WeChat DevTools pour vérifier l'UI et les fonctionnalités de cette version.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image17.png)

Dans la plupart des cas, HBuilderX ouvre automatiquement WeChat DevTools et vous pouvez voir directement le mini program mis à jour. Si ce n'est pas ouvert automatiquement, faites ceci :

1. Arrêtez d'abord l'exécution actuelle dans HBuilderX.
2. Lancez WeChat DevTools manuellement et gardez-le ouvert.
3. De retour dans HBuilderX, cliquez à nouveau sur « Run -> Run to Mini Program Simulator -> WeChat DevTools ».

Vous pouvez alors voir le mini program vibecoding dans WeChat DevTools :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image18.png)

## 3.4 Utiliser le langage naturel pour ajuster répétitivement jusqu'à satisfaction

Dans cette pratique, l'IA a initialement généré un Serpent contrôlé par boutons : quatre boutons directionnels à l'écran, et le serpent change de direction au clic. C'est tout à fait jouable, mais je préfère personnellement le contrôle par joystick. Pour vos demandes d'ajustement (non seulement les fonctionnalités, mais aussi la conception UI et la mise en page ; une fois expérimenté, vous pouvez même demander à l'IA d'intégrer des API de modèles externes ou des bases de données), là encore : vous n'avez besoin que de décrire les besoins en langage naturel.

C'est l'avantage principal du vibecoding : vous n'avez pas à creuser dans le code pour la liaison d'événements ou la logique de coordonnées. Vous dites directement à l'IA ce que vous voulez. Par exemple, dans le chat Trae vous pouvez écrire :

Remplacer les boutons par un contrôle joystick. Quand l'utilisateur relâche le joystick, le serpent doit continuer à avancer dans la direction actuelle jusqu'à la prochaine action du joystick.

Tant que le besoin est clair, l'IA localisera automatiquement les fichiers cibles et modifiera les styles de contrôle, les liaisons d'interaction et la logique de gestion de direction.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image19.png)

Après modification, retournez dans WeChat DevTools pour vérifier.
Si les changements ne sont pas visibles immédiatement, cliquez sur « Run » dans DevTools ou rafraîchissez la fenêtre de prévisualisation pour appliquer la dernière construction. Si ce n'est toujours pas mis à jour, arrêtez l'exécution dans HBuilderX et relancez vers le simulateur, puis vous pourrez voir le mini program mis à jour :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image20.png)

## 3.5 Que faire si des problèmes apparaissent : continuer à communiquer en langage naturel

Les versions générées par l'IA ne sont pas toujours parfaites du premier coup. Vous pouvez rencontrer :

- des erreurs d'exécution et l'application ne s'ouvre pas ;
- les fonctionnalités sont globalement correctes, mais les détails diffèrent de vos attentes ;
- l'UI est utilisable mais encore pas assez esthétique ou pratique.

À ces moments, pas besoin de modifier aveuglément le code vous-même. Décrivez directement les problèmes à l'assistant IA Trae en langage naturel, par exemple :

« Le contrôle joystick fonctionne maintenant, mais le serpent s'arrête parfois brusquement. Veuillez vérifier l'implémentation actuelle. »
Ou : « Le jeu est jouable maintenant, mais l'interface semble encombrée. Je veux plus d'espacement vertical sur mobile. Veuillez ajuster la mise en page. »

L'IA utilisera le contexte du projet actuel + votre description, puis fournira et appliquera directement des modifications de code. Si le résultat empire ou la direction est mauvaise, vous pouvez toujours revenir à la version stable précédente et essayer une autre formulation.

À travers plusieurs tels tours, vous pouvez polir de la « première version brute » à un Serpent basé sur joystick plus proche de vos préférences.
Par exemple, j'ai fourni une image de référence de style et demandé à l'IA d'ajuster le style UI en conséquence :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image21.png)

## 3.6 Résultat final et résumé de la section

Après des tours répétés de **description en langage naturel -> modification par l'IA -> prévisualisation dans WeChat DevTools -> micro-ajustements continus**, j'ai finalement obtenu ce résultat :

- page de jeu complète ;
- le serpent se déplace fluidement et mange la nourriture ;
- contrôle par joystick supporté ;
- fonctionne correctement dans le simulateur de mini program.

Exemples du produit final :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image22.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image23.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image24.png)

Dans cette section, vous avez vu une boucle complète :

1. Dans Trae, une instruction claire a laissé l'IA construire la première version du mini program Serpent ;
2. Avec HBuilderX + WeChat DevTools, valider l'effet réel du point de vue utilisateur ;
3. Continuer à proposer des modifications en langage naturel, laisser l'IA gérer l'optimisation des fonctionnalités et de l'UI ;
4. Quand des problèmes apparaissent, utiliser le rollback + relance pour garder le processus sûr.

Ensuite, vous pouvez utiliser le même rythme pour vos propres idées : non limité au Serpent, mais aussi des mini programs utilitaires, des pages d'événements, ou de vrais prototypes métier. Votre tâche principale est de penser clairement et décrire clairement. Laissez l'IA et les outils gérer le reste.

# 4. Publication du Mini Program

Dans les trois chapitres précédents, nous avons complété le flux complet de **configuration de l'environnement** -> **développement assisté par IA** -> **exécution du Serpent dans le simulateur local**.

À partir de ce chapitre, la question clé devient : **comment vraiment publier ce travail sur WeChat, pour que ce ne soit pas juste un jouet, mais un mini program utilisable ?**

Pour réduire la difficulté, nous prenons d'abord le **plus court circuit fermé** : publier uniquement comme **version test/expérience** pour vous-même et quelques coéquipiers. Après que les fonctionnalités et l'expérience sont stables, procéder ensuite à la publication publique formelle.

Ce chapitre couvre d'abord 4.1 pour compléter le chemin le plus court pour le **lancement en version expérience**. La publication formelle pour tous les utilisateurs est expliquée en 4.2.

## 4.1 SOP le plus court - Lancer en version expérience

L'objectif de cette sous-section est une seule chose : vous permettre d'ouvrir votre mini program Serpent dans WeChat comme une **version expérience**.

Le flux complet comporte quatre tâches :

1. Trouver et confirmer votre AppID dans la Plateforme Officielle WeChat.
2. Configurer cet AppID dans votre projet.
3. Télécharger la version actuelle dans WeChat DevTools.
4. Retourner sur la Plateforme Officielle et définir cette version téléchargée comme « Version Expérience ».

Procédons dans cet ordre.

### 4.1.1 Confirmer l'AppID dans la Plateforme Officielle WeChat

Première étape : confirmez l'AppID de votre mini program dans la Plateforme Officielle WeChat.

Vous avez déjà fait cela une fois dans la **Section 2 Configuration de l'environnement**. Ici, nous l'utilisons pour de vrai.

1. Visitez `https://mp.weixin.qq.com` et connectez-vous au backend de votre mini program.
2. Trouvez « Development Management » dans le menu de gauche, puis entrez dans « Development Settings ».
3. En haut, trouvez la zone « Developer ID ». Il y a une ligne « AppID (Mini Program ID) » - c'est votre identifiant unique.

Cet ID doit correspondre exactement à la configuration du projet. Sinon WeChat le verra comme une autre identité d'application et la prévisualisation/publication échouera.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image25.png)

### 4.1.2 Remplir l'AppID dans le projet

Deuxième étape : écrivez cet AppID dans la configuration du projet pour que la construction locale corresponde à votre compte officiel de mini program.

Si votre projet utilise le modèle uni-app, faites ceci :

1. Ouvrez HBuilderX et chargez le projet Serpent.
2. Trouvez `manifest.json` dans l'arborescence de fichiers et ouvrez-le.
3. Défilez jusqu'à « WeChat Mini Program Configuration », et vous verrez un champ comme « WeChat Mini Program AppID ».
4. Collez l'AppID copié depuis la Plateforme Officielle exactement, puis sauvegardez le fichier.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image26.png)

Votre projet local a maintenant revendiqué cette identité de mini program. Ensuite, quand vous téléchargerez depuis WeChat DevTools, ce sera enregistré sous cet AppID.

### 4.1.3 Télécharger une version dans WeChat DevTools

Nous avons déjà exécuté le projet dans WeChat DevTools pour prévisualiser dans le simulateur.

Maintenant nous faisons : « empaqueter le code actuel comme une version et télécharger sur le serveur. »

Étapes :

1. Dans la barre d'outils en haut à droite de WeChat DevTools, cliquez sur « Upload ».
2. Dans la popup, remplissez deux champs clés :
   1. Numéro de version : par exemple `1.0.0` (chiffres et points uniquement).
   2. Note du projet : courte description, comme « Gameplay principal complété. »
3. Confirmez et cliquez sur « Upload ». Le panneau de sortie affiche le processus de construction. Si toutes les étapes deviennent vertes et le téléchargement se termine, cette version est soumise avec succès au serveur WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image27.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image28.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image29.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image30.png)

### 4.1.4 Définir la version téléchargée comme Version Expérience dans le backend

Le téléchargement envoie seulement le code côté WeChat. Vous devez encore dire au système « ceci est une version expérience. »

Dernière étape : retournez au backend de la Plateforme Officielle et complétez la boucle.

1. Ouvrez `https://mp.weixin.qq.com` et entrez dans le backend du mini program.
2. Dans le menu de gauche, trouvez « Management » -> « Version Management ».
3. Dans la section « Development Version », vous devriez voir la version téléchargée : version `1.0.0`, votre note, et l'horodatage du téléchargement.
4. Sur le côté droit de cette ligne, utilisez le menu déroulant/bouton d'action pour choisir « Set as Experience Version », confirmez l'action. Avant cette étape, assurez-vous que votre catégorie principale est configurée sur la page d'accueil/paramètres de catégorie.

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image31.png)

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image32.png)

Après achèvement, cette version devient la « Version Expérience » de votre mini program. Vous pouvez générer un QR code d'expérience dans le backend, ou vous ajouter/votre équipe comme membres d'expérience, puis scanner dans WeChat pour des tests sur appareil réel.

À ce stade, nous avons terminé le circuit le plus court du projet local au lancement de test :

Vous n'avez pas besoin d'ouvrir immédiatement à tous les utilisateurs WeChat. Dans un cadre sûr, exécutez d'abord le vrai mini program dans un vrai environnement WeChat. C'est suffisant pour les tests de fonctionnalités, la collecte de retours et l'itération.

## 4.2 Lancement formel du Mini Program

Après que la version expérience fonctionne bien, vous pouvez déjà jouer à ce mini program Serpent dans votre propre WeChat.
L'étape suivante est de passer des utilisateurs d'expérience limités à un mini program WeChat entièrement public.

Décomposons en étapes : compléter les informations de base, choisir la catégorie, terminer l'enregistrement, puis soumettre à la revue. Suivez cet ordre :

### 4.2.1 Entrer dans le flux de publication du Mini Program

Retournez d'abord au backend de la Plateforme Officielle WeChat et connectez-vous.
Dans la navigation de gauche, trouvez les entrées liées à « Version Management / Release » (l'UI peut varier légèrement au fil du temps). Vous trouverez « Mini Program Release Flow. »

Après être entré, la zone supérieure affiche une barre de progression. En dessous sont listées des étapes comme :

1. Mini Program Information
2. Mini Program Category
3. Operation Information / Filing
4. WeChat Verification (selon le type d'entité)

Au début, la progression est de 0 %. À chaque étape complétée, le système se met à jour automatiquement.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image33.png)

### 4.2.2 Remplir les informations de base du Mini Program

La première étape consiste à compléter la « carte de visite » de votre mini program, c'est ce que les utilisateurs voient en premier dans WeChat.

Sur la page « Mini Program Information », vous devez généralement remplir/confirmer :

1. Nom du mini program
   Il apparaît dans les résultats de recherche et l'en-tête de l'application. Il a des limites de longueur et des règles de nommage. Choisissez un nom qui décrit la fonction et est facile à retenir.
2. Description / introduction
   Utilisez une ou deux phrases pour expliquer ce que fait ce mini program, par exemple : « Un jeu du Serpent développé avec du codage assisté par IA, adapté pour des parties rapides et décontractées. »
   Gardez la description cohérente avec les fonctionnalités réelles et évitez le texte marketing exagéré.
3. Icône et captures d'écran
   1. L'icône nécessite généralement une image carrée avec support PNG/JPG et des limites de taille/pixels (vérifiez les règles de la page). Utilisez une icône simple à contraste élevé.
   2. Téléchargez plusieurs captures d'écran comme la page d'accueil, la page de jeu, la page de paramètres. Elles aident les utilisateurs à comprendre le contenu.
4. Autres champs obligatoires
   Comme les tags et la région de service, remplissez selon les invites.
   Un seul principe : toutes les informations doivent correspondre aux fonctionnalités réelles de votre mini program Serpent.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image34.png)

Après que tous les champs sont remplis, cliquez sur Save ou Next. La première étape du flux de publication est complète.

### 4.2.3 Sélectionner la catégorie de service du Mini Program

Après les informations de base, l'assistant vous guide vers « Mini Program Category. »
La catégorie est la classification de votre app dans WeChat, elle affecte la voie de revue et l'affichage/fonctionnement ultérieur.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image35.png)

Sur cette page, vous verrez « Add Category. » Cliquez dessus et choisissez la catégorie appropriée dans l'arborescence de catégories du système, par exemple :

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image36.png)

1. Choisissez « Education » comme catégorie de premier niveau ;
2. Puis choisissez une sous-catégorie plus spécifique comme « Education Tools / Teaching Assistant. » Dans cet exemple, les outils éducatifs sont sélectionnés comme aide à l'apprentissage pour le vibecoding.

Dans votre propre projet, choisissez simplement la catégorie la plus proche par cas d'usage réel.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image37.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image38.png)

Après confirmation de la catégorie, cliquez sur Save. Si la page affiche « catégorie créée avec succès » et montre votre nouvel élément, cette étape est complète.

### 4.2.4 Compléter les informations d'enregistrement

Ensuite, le flux de publication demande « Operation Information / Filing. » Cela vérifie l'entité responsable derrière le mini program.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image39.png)

Dans l'exemple d'une entité individuelle, le flux inclut généralement :

1. Sélectionner le type d'enregistrement
   Choisissez parmi les types comme « Individual » ou « Enterprise », cohérent avec votre entité d'enregistrement.
2. Remplir les informations de l'entité
   Inclure le nom, le type de pièce d'identité, le numéro de pièce d'identité, etc. Cela doit correspondre aux informations d'enregistrement, sinon la revue peut rejeter.
3. Télécharger les documents justificatifs
   Nécessite généralement des photos de pièce d'identité ou d'autres justificatifs, avec des exigences spécifiques de format/taille/clarté indiquées sur la page. Préparez et téléchargez des fichiers clairs.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image40.png)

Après soumission, le système entre « en cours de revue » et affiche un message comme « Informations soumises, veuillez patienter. » Cela peut prendre un certain temps. Vous pouvez vérifier la progression à tout moment dans le backend.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image41.png)

### 4.2.5 Soumettre à la revue et attendre la publication formelle

Quand « Mini Program Information, » « Category » et « Operation Information/Filing » sont tous complétés, faites l'action finale : soumettre à la revue.

1. Retournez à la page de vue d'ensemble du flux de publication et confirmez que tous les éléments affichent complétés, avec une progression proche de 100 %.
2. Cliquez sur « Submit for Review » (ou bouton similaire) pour soumettre la version de développement actuelle à l'équipe de revue WeChat.
3. Dans « Version Management », le statut de cette version devient « Under Review. » Après approbation, il devient « Published » ou disponible pour « Go Live. »

Si la revue d'enregistrement échoue, les développeurs peuvent recevoir un appel spécifiant les parties échouées.

Pour l'enregistrement, vous pouvez recevoir un code de vérification et un lien de vérification du Ministère de l'Industrie et des Technologies de l'Information. Ouvrez le lien et remplissez le code + les informations personnelles (la vérification est valable 1 jour). Si l'enregistrement est approuvé, vous recevez un e-mail et un SMS avec le numéro d'enregistrement.
Vérification WeChat : les individus paient généralement 30 CNY, les entreprises environ 300 CNY. Les frais ne sont pas remboursables quel que soit le résultat d'approbation. Vous pouvez recevoir un avis de vérification et un appel de confirmation.

Lors de la soumission à la revue, téléchargez une vidéo/copies d'écran de fonctionnement et remplissez les informations requises. Puis cliquez sur « Submit Release » pour le lancement formel.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image42.png)

# 5. Résumé

À ce stade, vous avez complété une boucle complète de développement de mini program de **0 à 1** : de la compréhension des mini programs, à l'installation de Trae, HBuilderX et WeChat DevTools ; de la transmission de votre idée à l'IA et de la laisser « poser des briques » dans le code, à jouer à la première version du Serpent dans le simulateur ; puis l'empaquetage en version expérience, la fin de l'enregistrement/revue, et sa mise en utilisation réelle dans WeChat - vous avez personnellement parcouru toute la chaîne une fois.

Plus important encore, vous n'avez pas atteint cela en mémorisant la syntaxe. Vous l'avez atteint en exprimant clairement les besoins + en communiquant efficacement avec l'IA. Vous avez déjà expérimenté ceci : **une instruction en langage naturel peut laisser l'IA satisfaire vos besoins de développement très efficacement**. Cette capacité n'est pas limitée au Serpent. Elle peut se transférer à n'importe quel mini program que vous voulez construire ensuite - outils, pages d'événements, applications éducatives, ou projets professionnels réels.

Si nous résumons en un **SOP général**, ce n'est que cinq étapes :
**Clarifier un petit besoin -> construire le squelette du projet dans Trae -> utiliser le vibecoding + IA pour créer la première version -> tester et améliorer répétitivement dans WeChat DevTools -> télécharger, enregistrer, passer en revue, et lancer.**
Chaque fois que vous répétez ces cinq étapes, vous gagnez un autre mini program réel qui peut être ouvert et partagé, et une couche supplémentaire de confiance que « je peux utiliser l'IA pour transformer mes idées en produits. »

Ensuite, vous pouvez continuer à peaufiner cette application Serpent, ou la fermer et démarrer un nouveau projet vierge à partir de votre propre idée. Peu importe ce que vous construisez, rappelez-vous une chose : vous n'êtes plus seulement quelqu'un qui « veut construire quelque chose. » Vous êtes déjà un développeur vibecoding qui a parcouru le flux de travail complet. Le reste n'est que de la répétition jusqu'à ce que cette capacité devienne une habitude.

# Références :

- https://zhuanlan.zhihu.com/p/1889401120939567074
- https://blog.csdn.net/2401_87407347/article/details/155193007
