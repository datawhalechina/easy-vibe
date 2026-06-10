
# Module 2 : Apprendre les outils de programmation IA

## Introduction au chapitre

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'environ <strong>1 jour</strong>, réalisable en plusieurs sessions'
const relatedArticles =
  relatedArticlesMap['fr-fr/stage-1/introduction-to-ai-ide'] ?? []
</script>

<ChapterIntroduction :duration="duration" :tags="['Configuration de l\'environnement local', 'IDE et AI IDE', 'Techniques de développement efficace']" coreOutput="1 mini-jeu créé de toutes pièces" expectedOutput="Réalisé avec Trae">

Dans le chapitre précédent, nous avons expérimenté la programmation IA sur z.ai, mais la version web a beaucoup de limitations -- <strong>pas de sauvegarde permanente</strong>, <strong>gestion de fichiers difficile</strong>, et <strong>impossibilité de faire des projets complexes</strong>. Ce chapitre vous aide à déplacer votre environnement de développement sur votre propre ordinateur, pour que vous puissiez <strong>réellement créer des choses de manière indépendante</strong>.

Nous allons d'abord comprendre <strong>quelle est la différence entre un IDE et un AI IDE</strong>, et pourquoi ce dernier peut <strong>doubler votre efficacité</strong> ; puis <strong>vous guider pas à pas</strong> pour créer un jeu de serpent avec Trae en local, en parcourant le <strong>processus complet</strong> de l'installation à l'exécution ; enfin, nous partagerons quelques <strong>astuces pratiques</strong> pour communiquer avec l'IA, afin que vous évitiez les détours.

À la fin de ce chapitre, vous <strong>maîtriserez un flux de développement similaire à celui d'un programmeur</strong>.

::: tip 💡 Conseil pour aller plus loin
Si vous avez déjà des bases en programmation et souhaitez utiliser des outils plus puissants, vous pouvez combiner avec la référence [Outils CLI Coding modernes](../../stage-2/backend/modern-cli/) pour un développement en ligne de commande.
:::

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Compréhension de l\'environnement', description: 'Comprendre IDE et AI IDE' },
      { title: 'Pratique locale', description: 'Créer un jeu de serpent avec Trae' },
      { title: 'Détails des outils', description: 'Se familiariser avec l\'interface de l\'IDE' },
      { title: 'Techniques de communication', description: 'Communiquer efficacement avec l\'IA' }
    ]" />
  </ClientOnly>
</div>

## 1. De quel environnement et quels outils a-t-on besoin pour coder

### 1.1 Changement de mentalité : face à un problème, demandez d'abord à l'IA

Avant de présenter les différents environnements et outils, il faut d'abord signaler que vous devez **changer vos habitudes de réflexion**.

Dans l'apprentissage traditionnel de la programmation, si vous devez installer Python, configurer Conda, ou résoudre un échec d'installation npm, vous ouvrez généralement un moteur de recherche, trouvez un tutoriel, puis suivez les étapes une par une. Si une erreur se produit en cours de route, vous devrez peut-être rechercher le message d'erreur et essayer encore et encore.

Faux ! ❌

À l'ère de l'IA, en particulier lors de l'utilisation d'un AI IDE, gardez à l'esprit un principe fondamental : **toute opération peut d'abord être demandée à l'IA, voire lui être confiée directement.**

- **Vous ne savez pas comment installer l'environnement ?** Demandez directement à l'IA dans la barre latérale : « Je veux écrire en Python, aide-moi à vérifier si Python est installé, et si ce n'est pas le cas, aide-moi à l'installer. »
- **Le réseau est bloqué ?** Si le téléchargement de paquets tourne en boucle ou échoue, envoyez l'erreur à l'IA : « Le téléchargement a échoué, est-ce un problème réseau ? Peux-tu changer pour un miroir national ? »
- **Vous ne vous souvenez pas des commandes ?** Pas besoin de mémoriser les commandes Git ou Conda, dites simplement à l'IA : « Crée un nouvel environnement virtuel nommé demo. »

### 1.2 Pourquoi a-t-on besoin d'un environnement et d'outils

Passer de « essayer d'écrire quelques lignes de code » à « faire un projet maintenable à long terme », les exigences envers l'environnement et les outils sont complètement différentes.

En théorie, on peut écrire du code avec le bloc-notes du système, mais les problèmes apparaissent vite :

- **Le code est tout en texte noir**, mots-clés, chaînes et commentaires sont mélangés, difficile de distinguer la structure d'un coup d'oeil
- **Pas d'autocomplétion intelligente**, chaque mot doit être tapé au clavier en entier, une seule lettre fausse et il faut vérifier
- **Les fichiers s'accumulent et deviennent chaotiques**, avec des dizaines de fichiers entre lesquels il faut naviguer, on ne trouve jamais la ligne à modifier
- **En cas d'erreur, on ne peut que deviner**, le programme plante sans savoir où est le problème, on doit imprimer des logs ligne par ligne pour tâtonner

C'est pourquoi vous avez besoin d'un IDE (Environnement de Développement Intégré). Il affiche le code en couleur, suggère automatiquement pendant la saisie, organise les fichiers par projet, et permet de suivre les erreurs pas à pas, rendant le développement plus efficace et moins sujet aux erreurs.

## 2. Qu'est-ce qu'un IDE, pourquoi en a-t-on besoin

::: info Conseil de préparation
Si vous n'êtes pas encore familier avec ce qu'est un IDE et à quoi servent les différents éléments de l'interface, il est recommandé de lire d'abord [Introduction à l'IDE](/fr-fr/appendix/2-development-tools/ide-basics) pour comprendre les concepts de base et les fonctionnalités courantes des IDE.
:::

À l'époque des premiers pas de la programmation, nous n'avions besoin que de simples éditeurs de texte et de processeurs de langage. Mais avec l'augmentation de la complexité des projets, les développeurs avaient un besoin urgent d'un outil capable de gérer efficacement les fichiers, de supporter la coloration syntaxique et le débogage. C'est ainsi que l'IDE (Environnement de Développement Intégré) est né.

Vous pouvez comprendre l'IDE comme un programme dédié à « éditer, gérer, exécuter et déboguer » le code. Les premiers IDE avaient une apparence très « primitive », fonctionnant presque entièrement au clavier.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image1.png)![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image2.png)

Interface terminal (Terminal) Source de l'image : https://en.wikipedia.org/wiki/File:Emacs-screenshot.png

Un IDE « historique » bien connu et fonctionnellement mature comme `Vim` est souvent utilisé pour les opérations distantes sur les serveurs.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image3.png)

Pour plus d'efficacité, nous avons besoin d'IDE modernes prenant en charge la souris, incluant généralement :

- **Éditeur de code source** : coloration syntaxique, autocomplétion.
- **Outils de build et d'exécution** : compilateur/interpréteur intégré.
- **Débogueur** : débogage par points d'arrêt, inspection de variables.

Les IDE modernes intègrent souvent des outils comme Git. Le plus populaire est **[Visual Studio Code (VS Code)](https://code.visualstudio.com/)** de Microsoft, léger et extensible. Bien qu'il existe des IDE professionnels comme la suite JetBrains, VS Code est le plus convivial pour les débutants.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image4.png)

Le concept central de VS Code est « tout est plugin ». Grâce à son système de plugins, il supporte divers langages : installer le plugin Python en fait un IDE Python, installer le plugin C++ en fait un IDE C++. Sans plugin, ce n'est qu'un éditeur de texte avancé.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image5.png)

On peut même l'utiliser pour éditer des documents Markdown.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image6.png)

En résumé, un IDE est un ensemble d'outils qui aide les développeurs à écrire du code et à exécuter des programmes plus efficacement.

Pour plus de détails, consultez [l'annexe sur les principes de l'IDE virtuel](/fr-fr/appendix/2-development-tools/ide-basics).

## 3. Quelle est la différence entre un AI IDE et un IDE classique

Un IDE classique (comme VS Code original) est essentiellement une « boîte à outils » :
vous pouvez ouvrir un projet, écrire du code, l'exécuter et le déboguer, installer des plugins, mais à condition que vous sachiez vous-même quoi faire et comment le faire :

- En cas d'erreur, vous lisez vous-même le message et cherchez quelle ligne pose problème ;
- Pour ajouter une nouvelle page ou interface, vous trouvez vous-même le fichier correspondant et écrivez le code ;
- Pour configurer l'environnement ou le build, vous consultez vous-même la documentation et suivez les étapes.

Mais dans un AI IDE, vous pouvez utiliser directement un grand modèle de langage pour vous aider à coder et modifier des fichiers :

- Dites simplement « crée une page de connexion », il génère d'abord la structure de code de base ;
- Donnez-lui le message d'erreur et le code concerné, il analyse d'abord la cause et suggère des corrections ;
- Après votre confirmation, il crée automatiquement des fichiers, modifie le code en masse, et gère les tâches fastidieuses à travers plusieurs fichiers.

Par exemple, vous pouvez sélectionner un bloc de code et lui demander de « le refactorer » ou « d'ajouter des commentaires » ; ou dans la barre latérale demander « comment ce projet est-il conçu ? », en utilisant `@nom_de_fichier` ou `@tout_le_projet` pour spécifier la portée de référence, et accomplir en une phrase les opérations fastidieuses de création de fichiers, d'écriture de code et d'exécution.

Dans les dernières versions de VS Code, un assistant de grand modèle de langage est déjà intégré. Vous pouvez dialoguer directement avec le modèle pour l'ensemble du dépôt de code, un fichier spécifique, ou même une fonction. Vous pouvez aussi, comme auparavant sur le web avec les outils de génération automatique de code, envoyer vos besoins sous forme de prompt à l'Agent de codage intégré, pour qu'il vous aide automatiquement à implémenter les fonctionnalités souhaitées, créer des fichiers, modifier le code, configurer l'environnement, etc.

Vous pouvez télécharger et installer VS Code, puis cliquer sur l'icône de la barre latérale en haut à droite pour ouvrir la zone de fonctionnalités IA et découvrir ces capacités.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image7.png)

Cependant, VS Code n'est pas l'IDE avec les capacités IA les plus puissantes. Pour les scénarios nécessitant beaucoup d'assistance IA pour le codage, nous préférons souvent des outils « plus intelligents et plus efficaces » -- un bon AI IDE peut considérablement réduire le temps d'écriture de code et de correction de bugs. Ci-dessous, nous présenterons quelques AI IDE populaires actuels. Vous pouvez choisir celui qui vous convient selon vos préférences.

Puisque VS Code est open source (n'importe qui peut télécharger le code source et le compiler lui-même), la grande majorité des AI IDE actuels sont des dérivés de VS Code. Vous n'avez donc pas à craindre d'avoir « beaucoup d'IDE à apprendre » -- **si vous maîtrisez les bases de VS Code**, la transition vers ces AI IDE ne nécessite pas de réapprentissage.

En général, les différences entre les différents AI IDE se concentrent sur quatre aspects : le prix ; les modèles disponibles (certains modèles avancés peuvent être limités dans certaines régions) ; les capacités de l'Agent (niveau d'intelligence et d'exécution lors de l'assistance au codage) ; et la vitesse de fonctionnement et les performances. Vous pouvez faire des essais et choisir celui qui vous convient le mieux.

> Un AI IDE typique offre généralement les capacités clés suivantes :
>
> - Génération et complétion de code intelligente : dans un IDE classique, on tape quelques caractères pour compléter un nom de variable ou de fonction ; dans un AI IDE moderne, vous pouvez écrire quelques lignes de pseudo-code ou décrire simplement vos besoins, et l'IDE complète automatiquement la logique entière, voire génère un bloc entier de code selon l'instruction.
> - Compréhension et questions-réponses sur le code : l'IDE peut comprendre et répondre aux questions sur un bloc de code, un fichier, ou même la structure complète du projet.
> - Refactorisation et optimisation du code : l'IDE peut réécrire ou optimiser la logique d'un bloc de code selon vos intentions.
> - Génération automatique de tests : l'IDE peut générer automatiquement du code de test pour différentes fonctions et modules, facilitant des tests ciblés.
> - Exécution de tâches de type Agent : l'Agent intelligent peut automatiquement générer, empaqueter, installer, exécuter et modifier le code, remplaçant en partie le travail d'un développeur junior dans de nombreuses tâches.

::: details Antigravity

### [Antigravity](https://antigravity.google/)

Antigravity est un nouvel AI IDE publié par Google en novembre 2025 avec Gemini 3, adoptant un mode de développement « Agent-First » (Agent en premier). Contrairement à l'assistance de codage IA traditionnelle, Antigravity fait de l'agent IA un « exécuteur proactif » qui peut directement manipuler l'éditeur, le terminal et le navigateur, assumant davantage de travail « d'exécution », de « planification » et de « vérification ». Le développeur n'a qu'à exprimer son intention de haut niveau, et l'agent décompose automatiquement les tâches, élabore un plan, exécute le code, lance les tests et génère les résultats. Il supporte le basculement entre plusieurs modèles, notamment Gemini 3 Pro, Claude Sonnet 4.5, etc., et est actuellement proposé en préversion publique sur Windows, macOS et Linux.
:::

::: details Trae

### [Trae](https://www.trae.ai/)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image8.png)

Trae est un assistant de programmation IA développé par ByteDance, supportant plus de 100 langages de programmation et intégrable dans les IDE majeurs. Ses fonctionnalités incluent la génération de code en langage naturel, le débogage automatique et la conversion de maquettes en composants React/Vue. Après la mise à jour d'août 2025, Trae a ajouté l'importation intelligente de dépendances, des suggestions de renommage et la gestion de listes de tâches ; le mode SOLO supporte également la génération de code backend et l'édition de documents d'architecture technique.
:::

::: details Cursor

### [Cursor](https://cursor.com/)

Cursor est un éditeur de code IA développé par Anysphere, basé sur VS Code, optimisé pour les projets à grande échelle et la collaboration multi-fichiers. Il supporte GPT-4o, Claude 3.7 et d'autres modèles ; le mode Claude Max lancé en 2025 peut gérer des projets de plusieurs millions de lignes de code. La version professionnelle a supprimé la limite de requêtes, ce qui la rend très adaptée aux projets d'entreprise complexes.

Actuellement, Cursor est probablement l'un des AI IDE avec interface graphique offrant la meilleure expérience globale, avec une base d'utilisateurs importante et une fréquence d'itération élevée. Son plus grand inconvénient est son prix élevé -- la version professionnelle coûte environ 20 dollars par mois.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image9.png)
:::

::: details Qoder

### [Qoder](https://qoder.com/)

Qoder est un AI IDE développé par Alibaba, mettant l'accent sur la « collaboration transparente » et les « capacités d'ingénierie de contexte améliorées ». Il supporte le décomposition de tâches en plusieurs étapes via Action Flow et le suivi en temps réel de l'exécution de l'IA ; il supporte également le routage dynamique multi-modèles et la gestion de machines à états pour les tâches, ce qui le rend très adapté à la gouvernance d'architecture et à l'analyse de « rétro-ingénierie » des systèmes hérités dans les projets de taille moyenne à grande.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image10.png)
:::

::: details CodeBuddy

### [CodeBuddy](https://www.codebuddy.com/)

CodeBuddy est un outil de programmation IA de Tencent Cloud, mettant l'accent sur le support des instructions en chinois et les capacités de conformité entreprise. Il offre des fonctionnalités de complétion de code, de revue de code en masse et de basculement entre plusieurs modèles ; l'Agent Craft peut réaliser la génération de code multi-fichiers et l'intégration d'API. La version entreprise supporte le déploiement en mode privé et a obtenu la certification de sécurité de niveau 3, ce qui la rend adaptée aux secteurs comme la finance et la santé qui ont des exigences élevées en matière de sécurité des données.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image11.png)
:::

::: details VS Code + Cline

### VS Code + [Cline](https://cline.bot/)

Cline est un plugin Agent de programmation IA pour VS Code (Visual Studio Code), qui permet de changer de modèle de manière flexible en configurant différents endpoints API. Cline supporte l'entrée multimodale, l'extension d'outils MCP et la surveillance des coûts. Toutes les opérations nécessitent la confirmation de l'utilisateur avant exécution. Il est très adapté pour valider rapidement des idées ou pour s'intégrer à un flux de développement existant. Les fonctionnalités de base sont gratuites, et la version entreprise supporte le déploiement de modèles en environnement privé.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image13.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image14.png)
:::

::: details Kiro

### [Kiro](https://kiro.dev/)

Kiro est un AI IDE d'AWS (Amazon Cloud), profondément intégré à l'écosystème Amazon Bedrock et AWS Cloud Services. Il supporte Claude, Nova et d'autres modèles, et est particulièrement adapté aux scénarios de développement nécessitant une intégration étroite avec les services cloud AWS. Kiro offre des capacités de génération de code intelligente, de tests automatisés et d'intégration transparente avec les ressources AWS (comme Lambda, S3, DynamoDB), offrant un avantage unique pour le développement d'applications cloud natives.

> **Remarque :** Si vous souhaitez utiliser les modèles d'Anthropic Claude, vous devez utiliser Cursor, Kiro ou Antigravity comme IDE. Ces IDE ont un partenariat officiel ou une intégration profonde avec Anthropic, offrant une expérience plus stable et complète des modèles Claude.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Compréhension de l\'environnement', description: 'Comprendre IDE et AI IDE' },
      { title: 'Pratique locale', description: 'Créer un jeu de serpent avec Trae' },
      { title: 'Détails des outils', description: 'Se familiariser avec l\'interface de l\'IDE' },
      { title: 'Techniques de communication', description: 'Communiquer efficacement avec l\'IA' }
    ]" />
  </ClientOnly>
</div>

## 4. Pratique : Créer un jeu de serpent en local avec un AI IDE

Dans les sections précédentes, nous avons surtout parlé de « concepts » et de « différences ». Dans cette section, nous allons réaliser une pratique complète pour passer des concepts abstraits à des actions concrètes : **créer un dossier vide → l'ouvrir avec l'AI IDE → dans la barre latérale, demander à l'IA de générer un jeu de serpent en React à partir de zéro.** Nous prenons Trae présenté ci-dessus comme exemple, il faut d'abord l'installer et comprendre brièvement ce qu'est Trae.

::: tip 💡 Astuce : une transition fluide du web au local
Si vous avez déjà développé des projets sur z.ai ou d'autres plateformes web de programmation IA, vous pouvez directement télécharger le code en local, puis l'ouvrir avec un AI IDE pour continuer le développement. Ainsi, vous conservez les résultats précédents tout en bénéficiant des capacités IA plus puissantes de l'IDE local.

Les étapes sont simples :
1. Sur z.ai ou d'autres plateformes, cliquez sur le bouton de téléchargement pour sauvegarder le projet en local
2. Après décompression, ouvrez le dossier avec un AI IDE comme Trae/Cursor
3. Continuez à dialoguer avec l'IA dans la barre latérale pour itérer et améliorer votre projet
:::

### 4.1 Préparation : Installer et comprendre Trae

#### 4.1.1 Qu'est-ce que Trae

Le nom complet de Trae peut être compris comme « The Real AI Engineer ». C'est un AI IDE adaptatif développé par ByteDance, construit sur la base du populaire VS Code. Si vous êtes déjà habitué à VS Code, l'utilisation de Trae vous semblera très familière et confortable, tant au niveau de la disposition de l'interface que des opérations de base.

L'objectif central de Trae est d'être le « partenaire de programmation intelligent » du développeur. Grâce à l'intégration profonde des capacités IA, il peut gérer automatiquement une grande quantité de travail répétitif, offrant une expérience de développement plus intuitive et plus efficace. Ce n'est pas seulement un « outil de complétion de code », mais plutôt un compagnon qui accompagne l'ensemble du flux de développement, de la création de projet à l'écriture de code, au débogage, aux tests et au déploiement.

#### 4.1.2 Installer Trae

Trae existe en version internationale et en version chinoise. La version internationale nécessite un accès au réseau international mais permet d'utiliser les derniers modèles comme GPT-5. La version chinoise supporte principalement les modèles nationaux les plus récents, comme GLM, Qwen, Kimi, etc.

Téléchargement de la version internationale : https://www.trae.ai/
Téléchargement de la version chinoise : https://www.trae.cn/

##### Tarification et modes d'utilisation de Trae

::: info 💡 Conseil de choix de version (recommandé CN pour les débutants)
- **Pour les débutants, la version chinoise (CN, trae.cn) est fortement recommandée**, l'expérience est actuellement meilleure et les fonctionnalités de base sont gratuites, sans besoin d'accès au réseau international
- Si vous avez besoin de modèles internationaux comme GPT-5 et que votre connexion le permet, choisissez la version internationale
- Si vous avez déjà des clés API de modèles tiers, vous pouvez les intégrer pour contrôler les coûts de manière flexible
:::

> 💡 **Actuellement, il est recommandé d'utiliser les modèles gratuits d'OpenRouter pour les tests**
>
> Au moment de la rédaction de ce tutoriel (2026-02-12), les modèles de StepFun sont encore disponibles gratuitement en essai. Pour plus de détails, reportez-vous à la section 4.2 ci-dessous sur l'intégration de modèles, en connectant `stepfun/step-3.5-flash:free`.

Concernant les frais et les modes d'utilisation de Trae, plusieurs options sont disponibles :

- **Version chinoise CN (fortement recommandée)** : l'utilisation de base est gratuite, l'expérience globale est actuellement meilleure que la version internationale, très adaptée aux débutants. En raison du grand nombre d'utilisateurs, il peut parfois être nécessaire d'attendre en file.
- **Version internationale** : l'abonnement coûte environ 3 dollars par mois, permet d'accéder à des modèles internationaux comme GPT-5, mais nécessite un accès au réseau international.
- **Intégration de modèles tiers** : si vous avez déjà des tokens API de modèles nationaux (comme DeepSeek, Tongyi Qianwen, Kimi, etc.), vous pouvez les intégrer via la fonction de configuration de modèles tiers de Trae. Les grands fournisseurs de services cloud (comme Alibaba Cloud, Tencent Cloud, Baidu Cloud, etc.) proposent généralement des abonnements Coding Plan, qui permettent d'utiliser leurs API de modèles à des prix plus avantageux après achat. Ainsi, vous pouvez choisir librement le modèle que vous préférez tout en contrôlant les coûts.

Il est recommandé aux débutants de commencer par la version chinoise gratuite (téléchargement : https://www.trae.cn/), l'expérience d'utilisation de la version CN étant meilleure et entièrement gratuite. Si vous rencontrez des problèmes de file d'attente ou avez besoin d'un service plus stable, envisagez d'intégrer un modèle tiers et d'acheter le plan Coding Plan du fournisseur cloud correspondant.

#### 4.1.3 Présentation de l'interface de Trae

Visuellement, l'interface de Trae est très similaire à celle de VS Code : le même layout classique à trois colonnes avec l'explorateur de fichiers à gauche, la zone d'édition au centre et le panneau d'extensions à droite.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image17.png)

La barre latérale droite est la fenêtre d'interaction Copilot, aussi appelée fenêtre Agent. Si vous ne la voyez pas, cliquez sur l'icône de la barre latérale en haut à droite de Trae pour l'ouvrir.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image18.png)

Une fois la barre latérale ouverte, vous verrez une option `Builder`, c'est le mode Agent. Pour faire simple, c'est l'équivalent « local » de z.ai, capable d'opérer sur votre environnement local, d'installer des environnements d'exécution, d'ouvrir des pages web, etc.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image19.png)

Après avoir cliqué sur « Builder », vous verrez les modes « Chat » et « Builder with MCP » :

- **Mode Chat** : principalement pour dialoguer avec le code du dossier courant, ou utilisé comme modèle de chat classique. (Vous pouvez ouvrir un dossier via le menu « File » en haut à gauche et effectuer des opérations d'édition dans ce dossier. Dans ce cas, les fichiers créés ou modifiés par le Builder n'affecteront que ce dossier.)
- **Mode Builder with MCP** : fournit à l'Agent plus d'outils disponibles (par exemple, connecter le modèle de langage à d'autres logiciels, interroger la météo, etc.). Vous pouvez le comprendre simplement : MCP permet au modèle de langage d'appeler plus facilement divers outils externes.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image20.png)

Dans la zone inférieure, vous verrez également les options de sélection de modèle, cliquez pour modifier le modèle actuellement utilisé. Dans la version chinoise, vous pouvez choisir des modèles nationaux comme Kimi k2 ou GLM ; si vous utilisez la version internationale de Trae, vous pouvez choisir ChatGPT ou Claude. Cependant, les modèles nationaux progressant très vite, Kimi, Qwen, GLM offrent une expérience comparable à Claude 3.5 ou 3.7 dans de nombreuses tâches, ce qui est largement suffisant pour le développement quotidien. Il n'est pas obligatoire d'utiliser la version internationale ou la version chinoise.

**Il est à noter que nous ne recommandons pas d'utiliser le mode Auto (sélection automatique de modèle). Pour la version internationale, nous recommandons d'utiliser Gemini ou GPT ; pour la version chinoise, nous recommandons d'essayer Kimi k2, Minimax ou GLM.** Les différents modèles ont différents cas d'usage, il n'y a pas de règle absolue sur lequel est le meilleur. Vous pouvez changer de modèle si vous rencontrez des difficultés dans différentes tâches, et trouver par vous-même les meilleurs résultats grâce à plusieurs essais.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image21.png)

Voilà pour la présentation de Trae. Maintenant, reprenons les opérations que nous avons faites sur z.ai et essayons de les reproduire dans Trae.

### 4.2 Première étape : Créer un dossier vide et l'ouvrir avec l'AI IDE

Avant de commencer, préparons un répertoire de travail propre. Pour cet exemple, créez un dossier vide nommé `snake-game-react` en local.

Ensuite, ouvrez l'AI IDE installé, dans l'écran de démarrage choisissez « Ouvrir un dossier » (Open Folder), et importez ce dossier vide comme racine du projet ; vous pouvez aussi glisser-déposer le dossier dans la fenêtre de l'IDE. À ce stade, aucun fichier de code n'apparaît dans l'explorateur de fichiers, indiquant que nous partons d'un projet complètement vierge.

::: details 📚 Optionnel : Intégrer l'API ou le Coding Plan d'un fournisseur cloud

Cette section présente comment intégrer l'API ou le Coding Plan d'un fournisseur cloud pour obtenir des appels de modèle plus stables et plus fréquents. La fin de la section inclut des captures d'écran de l'intégration dans Trae.

**Qu'est-ce qu'un Coding Plan ?**

Le Coding Plan est un abonnement proposé par les grands fournisseurs de services cloud. Après l'achat, vous pouvez utiliser l'API du grand modèle du fournisseur de manière **illimitée ou à haute fréquence** pendant une période donnée. Par rapport à la facturation au token, le Coding Plan ressemble davantage à un « forfait mensuel » -- vous payez un montant fixe et pouvez utiliser sans souci, sans vous soucier de chaque appel facturé.

**Pourquoi acheter un Coding Plan ?**

Vous vous demandez peut-être : puisque l'on peut déjà appeler les modèles via API, pourquoi acheter un Coding Plan ? Les raisons principales sont : **vous pouvez utiliser autant que vous voulez** : le plus grand avantage du Coding Plan est que vous pouvez appeler le modèle à tout moment, fréquemment, sans craindre une explosion des coûts, sans avoir à consulter constamment la facturation.

**Coding Plan nationaux recommandés :**

Voici les options recommandées des Coding Plan des principaux fournisseurs de services cloud nationaux :

- Zhipu AI (BigModel Plan) : https://bigmodel.cn/glm-coding
- Volcengine (ByteDance Cloud AI Plan) : https://www.volcengine.com/activity/codingplan

> 💡 **Vous pouvez aussi intégrer directement les API des modèles**
> En plus du Coding Plan, vous pouvez intégrer les API des modèles via Add Model. Vous pouvez vous référer à la méthode d'intégration de l'API gratuite d'OpenRouter StepFun décrite ci-dessous pour connecter l'API dans Trae. Les tests montrent que cela suffit à satisfaire les besoins de programmation de base.
> Si vous devez recharger, il est recommandé de recharger 10 yuans d'abord pour voir combien de temps cela dure, par exemple avec des modèles très rentables comme DeepSeek.

**Comment intégrer un Coding Plan**

L'intégration d'un Coding Plan est très simple, quelques minutes suffisent :

1. Visitez le site du fournisseur cloud choisi (par exemple Zhipu AI : https://bigmodel.cn/glm-coding, Volcengine : https://www.volcengine.com/activity/codingplan)
2. Inscrivez-vous et connectez-vous
3. Trouvez la page « Tarification » ou « Coding Plan »
4. Choisissez le forfait adapté et effectuez le paiement
5. Après le paiement, vous recevrez une clé API ou un ID de plan

::: tip 🎯 Recommandation de modèle personnalisé

Lors de l'intégration d'un modèle personnalisé dans Trae, nous **recommandons par défaut la solution OpenRouter**. OpenRouter fournit une API unifiée qui permet d'intégrer facilement plusieurs grands modèles de langage.

**Au 12 février 2026, vous pouvez encore utiliser l'API gratuite de StepFun :**

- **`stepfun/step-3.5-flash:free`** : modèle gratuit fourni par StepFun, utilisable directement dans Trae.

**Autres modèles gratuits :**

- **`openrouter/free`** : une option de modèle qui utilise par défaut une API LLM gratuite, utilisable directement dans la configuration de modèle personnalisé de Trae (il suffit d'entrer l'ID du modèle), sans paiement nécessaire pour expérimenter les fonctionnalités de programmation IA.

Ces options gratuites sont très adaptées aux débutants pour se familiariser avec le flux de travail des AI IDE avant de s'investir dans un environnement de production.

**Optionnel : Intégrer l'API d'un modèle (exemple avec DeepSeek)**

1. Visitez la plateforme DeepSeek : https://platform.deepseek.com/usage
2. Inscrivez-vous et connectez-vous
3. Sur la page de recharge, achetez un pack de tokens de 10 yuans
4. Après la recharge, créez et copiez une clé API sur la page API Keys
5. Dans Trae, cliquez sur **« Add Model »**, trouvez DeepSeek, sélectionnez le modèle correspondant, entrez la clé API et c'est prêt

Via l'interface suivante, vous pouvez ajouter avec succès (notez qu'après avoir sélectionné les options de modèle, vous devez **absolument faire défiler jusqu'en bas**, il y a un champ « modèle personnalisé » en dessous, cliquez dessus pour pouvoir entrer l'ID du modèle. Vous pouvez alors entrer les IDs de modèle recommandés ci-dessus comme `stepfun/step-3.5-flash:free`, et cliquer sur le lien d'obtention de clé en dessous pour obtenir la clé API correspondante sur le site officiel et l'entrer pour utiliser normalement.)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-14-51.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-15-29.png)
:::

### 4.3 Deuxième étape : Dans la barre latérale, demander à l'IA de créer un jeu de serpent en React

Ouvrez la barre latérale de chat IA : généralement en appuyant sur `Ctrl+L` ou en cliquant sur l'icône de chat à droite. Puis tapez un prompt suffisamment clair :

> Crée un jeu de serpent en React avec contrôle au clavier, le serpent grandit et marque des points en mangeant de la nourriture, et affiche « Game Over » quand il heurte un mur ou lui-même, avec la possibilité de recommencer. Lance le projet après l'implémentation. Si l'environnement d'exécution n'est pas installé, installe-le automatiquement.

Dans ce processus, vous devez réaliser que l'IA n'est pas seulement un modèle de chat, elle peut vous aider à opérer sur votre environnement local : créer des fichiers, installer des dépendances, exécuter des commandes de démarrage, etc. Vous pouvez décrire directement en langage naturel l'objectif que vous souhaitez atteindre, et laisser l'IA décider quelles commandes exécuter et comment organiser le code.

Si des erreurs se produisent pendant l'exécution, l'IA les affichera dans la conversation avec des solutions. Vous pouvez continuer à dialoguer pour les ajuster, sans avoir à mémoriser tous les détails des commandes.

::: warning ⚠️ À noter
Par exemple, comme le montre la capture d'écran ci-dessous, **parfois l'Agent IA peut se mettre en pause pendant l'exécution, car il a besoin que vous saisissiez des informations pour interagir**, comme le nom à créer, ou la confirmation d'une commande par Entrée. Ou cliquer sur une commande pour l'exécuter. En général, il suffit d'appuyer sur Entrée. Si vous n'êtes pas sûr de ce qu'il faut faire à cette étape, vous pouvez faire une capture d'écran de l'interface actuelle et demander au modèle comment procéder.
:::

Comme le montre la capture d'écran, ici nous devons cliquer sur Run pour confirmer :
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-52-55.png)

Comme le montre la capture d'écran, ici il suffit de taper y pour confirmer :
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-53-24.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-26-33.png)

Comme le montre la capture d'écran, ici nous sommes en train de créer un modèle mais nous ne savons pas comment procéder. Nous pouvons faire une capture d'écran de cette partie et interroger le modèle :

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-29-12.png)

Une autre raison pour laquelle l'Agent IA se met en pause pendant l'exécution est qu'un « service » a été lancé. Notre jeu de serpent est lui-même un « service ». Si vous voyez une URL de commande comme ci-dessous, cela signifie que l'Agent a lancé un service local sur votre ordinateur. Vous pouvez accéder à l'URL correspondante pour voir votre jeu de serpent. Comme le service doit continuer à tourner, il y a une pause ici. Il suffit de cliquer sur le bouton `Skip`.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-30-51.png)

Pendant ce processus, si vous rencontrez des termes ou du contenu que vous ne comprenez pas, ne vous inquiétez pas. Vous pouvez consulter la section « explication des termes informatiques » dans l'annexe, ou demander directement à l'IA, ou poser une question à temps !

Si vous rencontrez des résultats inattendus pendant le processus, par exemple le serpent ne termine pas le jeu quand il heurte un mur, ou le serpent ne bouge pas après avoir cliqué sur démarrer, il vous suffit de décrire le phénomène à l'Agent de la barre latérale. En cas d'erreur, n'oubliez pas de faire une capture d'écran ou de copier l'erreur vers l'Agent de la barre latérale. Si le problème persiste après plusieurs tentatives, essayez de changer de modèle.

Après un moment, nous obtenons un résultat similaire à z.ai :

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-33-37.png)

Vous pouvez cliquer sur la coche en bas à droite pour confirmer les modifications de code, ou sur le bouton `Cancel` pour les annuler. Vous pouvez aussi cliquer sur « 2 files need review » pour développer et voir le code modifié.

Il est également important de noter que, comme les modifications de code ne sont pas toujours correctes, vous devez savoir que tous les IDE Agent supportent la réversion de code. Par exemple, si vous avez fait une modification erronée ou que le résultat ne vous satisfait pas, une fois la modification terminée, vous pouvez revenir à la zone de saisie et cliquer sur le bouton Revert pour revenir à l'état précédent la modification. Vous pouvez alors modifier le texte de saisie et relancer une opération :

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-42-53.png)

### 4.4 Troisième étape (optionnelle) : Demander à l'IA d'expliquer les détails de l'implémentation

Quand le jeu de serpent fonctionne normalement, si vous n'êtes pas familier avec le frontend ou React, vous pouvez continuer dans la même fenêtre de chat et demander à l'IA de vous guider dans le code avec un langage le plus simple possible. Vous n'avez pas besoin de changer d'outil ni de fouiller dans la documentation, il suffit de poser des questions autour du projet actuel.

Une approche pratique est de demander d'abord à l'IA d'expliquer globalement « comment le jeu fonctionne », puis de creuser dans les détails. Par exemple, vous pouvez poser directement la question :

> « Explique-moi de haut en bas, étape par étape, comment ce jeu de serpent fonctionne. Utilise le moins de jargon technique possible. »

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-44-36.png)

Puis continuez avec des questions sur les points clés en fonction de ses réponses, par exemple :

> « Comment chaque segment du corps du serpent est-il enregistré ? Quelle structure de données est utilisée ? Peux-tu faire une comparaison ? »
> « Comment tu gères le "bouger à intervalles réguliers" ? C'est quelle partie du code ? »
> « Quelles opérations sont effectuées quand le serpent mange la nourriture ? Dans quelle partie de la logique est-ce vérifié ? »
> « La collision avec le mur et la collision avec soi-même, dans quelles parties du code sont-elles vérifiées ? »

Si vous voyez un fichier (comme `SnakeGame.tsx`) mais ne comprenez pas du tout ce qu'il fait, vous pouvez aussi demander à l'IA de l'expliquer par blocs :

> « Explique-moi `SnakeGame.tsx` par blocs fonctionnels : à quoi sert chaque bloc, avec des termes simples. »

Dans cette série de dialogues, vous pouvez traiter chaque mot que vous ne comprenez pas comme un point d'entrée pour approfondir, par exemple :

> « De quoi tu parles quand tu dis "état" ? Peux-tu l'expliquer avec un exemple de la vie quotidienne ? »
> « À quoi sert le "timer" dont tu parles ? Que se passerait-il si on le retirait ? »

Par cette approche, votre objectif n'est pas de mémoriser tous les concepts d'un coup, mais de comprendre trois choses : quelles sont les données clés de ce jeu (le serpent, la nourriture, le score, l'état du jeu, etc.), à quels moments ces données changent (mouvement, manger de la nourriture, fin du jeu, etc.), et à quel petit bout de code correspond chaque changement. Une fois ces trois points clarifiés, vous comprendrez fondamentalement la logique principale de ce code.

### 4.5 Quatrième étape : Demander à l'IA d'améliorer l'interface

Un point très important pour les débutants : ne dites pas simplement à l'IA « je veux rendre l'interface plus jolie ». Cette formulation est trop vague même pour un designer humain, encore moins pour un modèle -- quel style « joli » ? Quels éléments doivent être ajustés ? Est-ce un problème de mise en page ou de couleurs ? L'IA ne peut déduire tout cela d'une seule phrase. Pour que l'IA produise un résultat proche de vos attentes, vous devez apprendre à décomposer un objectif vague comme « je veux que ce soit joli » en une série de petites exigences concrètes et exécutables.

Par exemple, beaucoup de débutants commencent par dire :

> « Je veux rendre l'interface plus jolie. »

Par exemple, vous pouvez d'abord donner un ensemble de besoins globaux :

> « Améliore l'interface du jeu :
>
> - Centre la zone de jeu, ne la colle pas en haut à gauche ;
> - Utilise une couleur de fond plus claire pour que le serpent et la nourriture soient plus visibles ;
> - Agrandis le score et place-le dans un endroit bien visible ;
> - Utilise le bleu comme couleur dominante et améliore le schéma de couleurs global et les boutons. »

Si vous voulez un retour plus clair en « Game Over », vous pouvez ajouter :

> « Quand le jeu est terminé, affiche "Game Over" au centre de l'écran, avec un bouton "Recommencer" en dessous pour réinitialiser le jeu. »

L'IA modifiera directement les composants et les styles React. Après sauvegarde et rafraîchissement du navigateur, vous verrez la nouvelle interface. Si le résultat ne correspond pas encore à ce que vous imaginez, vous pouvez continuer avec des petits ajustements, par exemple :

> « Le score encore un peu plus grand, avec une couleur plus visible. »
> « La zone de jeu un peu plus compacte, avec un peu d'espace blanc autour. »
> « Change le bouton recommencer en style bleu arrondi, centré sous le message. »

À ce stade, si une modification provoque une erreur, pas besoin de chercher vous-même. Copiez simplement le message d'erreur dans la fenêtre de chat, ou accompagnez-le d'une brève description comme « c'est l'erreur qui est apparue après avoir amélioré l'interface », et laissez l'IA localiser et réparer dans le contexte du projet actuel. Ainsi, vous pouvez, dans une boucle de « dialogue continu, rafraîchissement continu », transformer un Demo fonctionnel en un petit produit fini avec une interface claire et des interactions fluides.

### 4.6 (Optionnel) Référencer l'architecture de z.ai pour modifier le résultat du jeu de serpent

Pour les débutants en vibe coding, la chose la plus difficile est en fait de ne pas savoir ce qui constitue une « bonne pratique », ni quelle architecture est la plus adaptée ; faute de bases en informatique, il est difficile de bien guider l'IA. La solution à ce problème est de « se référer directement » ; vous vous souvenez que nous avons dit qu'on pouvait voir le code sur z.ai ? En fait, le README (la partie du projet qui présente les fonctionnalités et l'architecture technique) donne déjà une référence d'architecture optimale :

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-49-33.png)

Nous voulons que le résultat local soit aussi conforme que possible à celui de z.ai. Nous pouvons copier tout le contenu de ce README et le coller dans la barre latérale de Trae, pour qu'il modifie le code local en fonction de l'architecture du README.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-50-31.png)

Finalement, nous obtenons un style de conception de page très similaire à celui de z.ai :

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-11-00-57.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Compréhension de l\'environnement', description: 'Comprendre IDE et AI IDE' },
      { title: 'Pratique locale', description: 'Créer un jeu de serpent avec Trae' },
      { title: 'Détails des outils', description: 'Se familiariser avec l\'interface de l\'IDE' },
      { title: 'Techniques de communication', description: 'Communiquer efficacement avec l\'IA' }
    ]" />
  </ClientOnly>
</div>

## 5. À quoi sert chaque bouton de l'interface

Après avoir parcouru le cycle minimal de génération, nous ne sommes pas encore tout à fait familiers avec l'IDE. Pour nous familiariser complètement avec cet outil qui nous accompagnera longtemps, nous allons expliquer en détail chaque élément de l'interface dans cette section. Les interfaces des différents AI IDE varient légèrement, mais la plupart reprennent le [layout de VS Code](https://code.visualstudio.com/docs/getstarted/getting-started).

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image32.webp)

Voici le rôle de chaque section :

- **Title Bar (Barre de titre)** : affiche le nom du fichier et les boutons de contrôle de la fenêtre.
- **Activity Bar (Barre d'activité)** : bascule entre les vues fichiers, recherche, etc.
- **Side Bar (Barre latérale)** : affiche le contenu spécifique du mode actuel.
- **Editor Groups (Zone d'édition)** : la zone principale où vous écrivez et modifiez le code.
- **Breadcrumbs (Fil d'Ariane)** : affiche le chemin du fichier et permet la navigation.
- **Minimap (Mini-carte)** : aperçu rapide et repérage dans le code.
- **Panel (Panneau inférieur)** : contient le terminal et la fenêtre de sortie.
- **Status Bar (Barre d'état)** : affiche l'état actuel de l'environnement.

Pour plus de détails, consultez [l'annexe sur les principes de l'IDE virtuel](/fr-fr/appendix/2-development-tools/ide-basics).

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Compréhension de l\'environnement', description: 'Comprendre IDE et AI IDE' },
      { title: 'Pratique locale', description: 'Créer un jeu de serpent avec Trae' },
      { title: 'Détails des outils', description: 'Se familiariser avec l\'interface de l\'IDE' },
      { title: 'Techniques de communication', description: 'Communiquer efficacement avec l\'IA' }
    ]" />
  </ClientOnly>
</div>

## 6. Comment parler efficacement avec l'IA

Avec l'IA de plus en plus puissante, nous pouvons confier à l'IA beaucoup du travail qui revenait autrefois aux programmeurs.
Mais en pratique, vous découvrirez que pour un même AI IDE, certaines personnes obtiennent en quelques phrases un petit projet fonctionnel, tandis que d'autres discutent longuement sans obtenir le résultat souhaité. La différence ne réside pas dans « qui est plus intelligent », mais dans la façon dont vous parlez à l'IA -- est-ce assez précis et assez structuré ?
Cette section présente quelques approches de formulation adaptées aux grands débutants, pour vous aider à obtenir plus régulièrement des résultats utilisables de l'IA.

### 6.1 Décrivez clairement vos besoins : d'une « idée vague » à une « description précise »

Beaucoup de débutants ont l'habitude de dire une seule phrase très générale, par exemple :

> « Fais-moi une page web. »
> « Fais-moi une petite application. »

Dans ce cas, l'IA ne peut que « deviner » ce que vous voulez, et elle vous donnera quelque chose qui a l'air complet mais qui ne correspond souvent pas à ce que vous vouliez vraiment.
Pour que l'IA comprenne mieux, vous devez décomposer « l'idée dans votre tête » en plusieurs phrases claires :

1. **Dites-lui à quoi ça va servir**
   Par exemple, ne dites pas simplement « site personnel », mais plutôt :
   - « Je veux faire une page personnelle d'une seule page, pour l'envoyer aux recruteurs. »

2. **Dites-lui quelles sections vous voulez**
   Pas besoin de termes techniques, décrivez simplement ce que vous voulez voir sur la page, par exemple :
   - « La page doit avoir trois parties : en haut le nom et une phrase de présentation, au milieu quelques expériences professionnelles, en bas l'e-mail et le numéro WeChat. »

3. **Dites-lui votre niveau et vos limites**
   Demandez à l'IA de faire de manière accessible aux débutants, par exemple :
   - « Je ne sais pas coder du tout, utilise uniquement la méthode la plus simple pour que je puisse copier dans un fichier et l'ouvrir dans le navigateur. »

4. **Dites-lui comment vous voulez recevoir le résultat**
   Par exemple :
   - « Donne-moi un code complet que je peux sauvegarder en `index.html` et ouvrir dans le navigateur. »

En combinant tout cela, vous pouvez demander à l'IA ceci :

> « Je ne sais pas coder du tout, je veux faire une page personnelle d'une seule page, pour l'envoyer aux recruteurs.
> La page doit avoir trois parties : en haut le nom et une phrase de présentation, au milieu quelques expériences professionnelles, en bas l'e-mail et le numéro WeChat.

Quand vous aurez clarifié toutes ces informations, l'IA pourra mieux s'approcher de vos vrais besoins, au lieu de vous donner « quelque chose qui a l'air impressionnant mais que vous ne pouvez pas utiliser ».

### 6.2 Utiliser le bon rythme : d'abord « que ça marche », puis ajouter de la complexité

Pour les grands débutants, le piège le plus courant est de vouloir d'emblée faire quelque chose de « très complet » avec « beaucoup de fonctionnalités ».
Par exemple :

> « Fais-moi un site comme Taobao. »
> « Fais-moi un système avec inscription, connexion et commande. »

Le résultat est souvent : l'IA vous donne un gros bloc de code, vous le copiez mais ça ne s'ouvre pas, ou ça affiche des erreurs partout ; vous ne comprenez pas où est le problème, et vous finissez par abandonner.

Une approche plus adaptée est de **contrôler activement le rythme**, de demander à l'IA de procéder étape par étape, au lieu de tout vous jeter d'un coup. Vous pouvez suivre cet ordre :

1. **Première étape : d'abord un « exemple minimal »**
   Vérifiez seulement une chose : est-ce qu'on peut voir quelque chose dans le navigateur.
   Par exemple :

   > « Donne-moi d'abord l'exemple le plus simple possible, juste pour voir une ligne "Ceci est ma page d'accueil" dans le navigateur.
   > Explique-moi ensuite étape par étape : comment nommer le fichier, comment le sauvegarder, comment l'ouvrir. »

2. **Deuxième étape : sur cette base, ajouter progressivement du contenu**
   Quand vous avez confirmé « oui, je vois bien la ligne de texte », dites :

   > « Sur cette base, ajoute une section "Expériences professionnelles" et donne-moi le code complet mis à jour. Ne m'envoie pas que la partie modifiée. »

3. **Troisième étape : quand la structure est bonne, penser à l'esthétique**
   Par exemple :
   > « Maintenant la page affiche correctement le contenu. Améliore un peu le design : centre tout, agrandis le titre, utilise une police agréable. Donne-moi le code complet mis à jour. »

À chaque étape, exécutez d'abord pour vérifier qu'il y a bien un changement, puis demandez à l'IA de continuer. Ainsi, si une étape pose problème, vous pouvez rapidement revenir à la « version précédente qui fonctionnait », sans avoir à tout recommencer de zéro.

### 6.3 Utiliser les captures d'écran et le copier-coller : si vous ne savez pas décrire, « montrez l'écran à l'IA »

La difficulté pour les grands débutants n'est souvent pas de « ne pas savoir modifier le code », mais de **ne pas savoir comment décrire le problème**.
Par exemple :

- Le navigateur affiche soudainement plein d'erreurs en anglais que vous ne comprenez pas du tout.
- La mise en page de la page n'est pas ce que vous vouliez, mais vous ne savez pas quels mots utiliser pour la décrire.

Dans ces cas, pas besoin de chercher des termes techniques, le plus simple est de **montrer directement à l'IA ce que vous voyez**.

Vous pouvez procéder ainsi :

1. **Copier le texte d'erreur**
   Quand vous voyez un message d'erreur rouge, copiez-le directement, puis dites :

   > « Voici le message d'erreur complet après l'exécution. Je ne comprends pas cet anglais, explique-moi d'abord simplement ce que ça veut dire.
   > Puis dis-moi ce que je dois modifier de la manière la plus simple. »

2. **Montrer une capture d'écran à l'IA**
   Si vous pensez « cette page ne va pas » mais ne savez pas comment le décrire, vous pouvez :
   - Prendre une capture d'écran de la page actuelle ;
   - Copier tout le code que vous utilisez à l'IA ;
   - Puis expliquer :
     > « Voici à quoi ressemble la page, et voici mon code complet.
     > Je voulais une mise en page en trois colonnes, mais ça n'en fait qu'une. Aide-moi à trouver le problème et donne-moi le code corrigé complet. »

   ::: tip 💡 Complément sur la fonctionnalité de capture d'écran

   Il est important de noter que **tous les modèles IA ne supportent pas la « vision d'images »**. Cela concerne deux concepts différents :

   - **Modèles de langage purement textuels (LLM)** : ils ne traitent que du texte et ne peuvent pas identifier le contenu des images. Si vous leur envoyez une capture d'écran, ils refuseront de la traiter ou ne pourront pas comprendre correctement les informations de l'image.

   - **Modèles multimodaux** : capables de traiter simultanément du texte, des images et d'autres types d'entrées, ils peuvent « comprendre » vos captures d'écran et donner des suggestions basées sur le contenu de l'image.

   **Référence des capacités des modèles courants** (exemple avec les modèles disponibles dans Trae) :

   | Modèle | Supporte l'entrée d'images |
   |------|-----------------|
   | Série Doubao-Seed | ✅ Oui |
   | GLM-4.7 / 4.6 | ❌ Non |
   | MiniMax-M2.7 / M2.5 | ❌ Non |
   | DeepSeek-V3.1 | ❌ Non |
   | Kimi-K2.5 | ✅ Oui |
   | Kimi-K2-0905 | ❌ Non |
   | Qwen-3-Coder | ❌ Non |
   | Série Gemini | ✅ Oui |
   | Série GPT | ✅ Oui |

   **Conseil d'utilisation** : si vous voulez utiliser des captures d'écran pour que l'IA vous aide à résoudre des problèmes d'interface, vérifiez d'abord que le modèle que vous utilisez supporte l'entrée d'images. Si ce n'est pas le cas, vous pouvez décrire le problème en texte ou copier-coller le message d'erreur à l'IA.

   :::

3. **Quand vous aimez une page web et voulez en faire une similaire**
   Pas besoin de dire « comment s'appelle cette mise en page », directement :
   - Prenez une capture d'écran ou copiez les titres et paragraphes principaux de la page ;
   - Puis dites :
     > « Je veux faire une page avec une structure similaire, pas forcément identique.
     > Aide-moi avec un code simple pour créer un cadre similaire, puis je remplacerai le texte par le mien. »

En résumé : vous êtes responsable de « montrer à l'IA ce que vous voyez », puis de dire avec les mots les plus simples « comment je veux que ça devienne » ; le reste -- « traduire en code, expliquer les termes, trouver les problèmes » -- laissez l'IA le faire.

### 6.4 Quand le code généré par l'IA ne fonctionne pas : une méthode universelle

En pratique, vous rencontrerez inévitablement cette situation :
l'IA vous a donné un code très sérieusement, vous l'avez copié fidèlement, mais le résultat est soit une page vide, soit complètement différent de ce qui avait été décrit.
Cela ne signifie pas que vous « ne pouvez pas apprendre », ni que l'IA s'est complètement trompée, mais qu'il vous manque quelques « allers-retours de confirmation ».

Quand le code « ne fonctionne pas », suivez ce processus fixe pour dialoguer avec l'IA :

1. **Dites d'abord ce que vous avez fait et ce que vous voyez**
   Évitez de dire juste « ça ne marche pas » ou « ça ne fonctionne pas ». Décrivez ainsi :

   > Après ouverture, la page est complètement vide, le texte d'accueil ne s'affiche pas.
   > J'ai ouvert la page xxxx, et la partie dont je parlais n'est pas là, ça ne marche pas.

2. **Envoyez votre code complet à l'IA**
   Souvent, le problème vient du fait qu'une ligne a été oubliée lors de la copie, ou que l'ancien et le nouveau contenu se sont mélangés.
   Vous pouvez dire :

   > « Voici le code complet de mon fichier actuel.
   > Compare pour voir s'il manque quelque chose, s'il y a une erreur ou si l'ordre n'est pas bon.
   > Donne-moi directement le code complet corrigé, n'envoie pas qu'un petit bout. »

3. **Fournissez aussi le message d'erreur**
   Par exemple une erreur qui apparaît en haut à droite du navigateur, ou du texte rouge en bas. Vous pouvez :
   - Copier le texte de l'erreur ;
   - Ou faire une capture d'écran ;
   - Puis dire :
     > « Voici le message d'erreur que je vois. Je ne comprends pas du tout, explique-moi d'abord simplement ce que c'est, puis dis-moi quelles sont les lignes à modifier en priorité. »

4. **Demandez le mode « débutant » étape par étape**
   Vous pouvez directement expliquer votre situation pour qu'il ne saute pas d'étapes :

   > « Je ne sais pas coder du tout, explique-moi étape par étape :
   > Étape 1 : quelle ligne modifier,
   > Étape 2 : comment sauvegarder,
   > Étape 3 : comment rouvrir ou rafraîchir la page.
   > Chaque étape doit être écrite avec des phrases complètes. »

5. **Enfin, demandez-lui de faire une comparaison « ce que vous devriez voir »**
   Par exemple :
   > Dis-moi d'abord, avec le code corrigé, que devrais-je normalement voir quand j'ouvre la page.

Tant que vous suivez ce processus pour interagir avec l'IA, la plupart des situations de « code qui ne fonctionne pas » pourront être résolues en quelques allers-retours.
Parallèlement, vous vous familiariserez progressivement avec les types de problèmes courants, et vous pourrez les résoudre directement la prochaine fois.

## 7. Résumé et prochaines étapes

Dans ce chapitre, vous avez accompli une évolution : de « jouer à un jeu de serpent généré par l'IA dans le navigateur » à « créer vous-même un petit jeu en local avec un AI IDE ». Vous avez compris trois choses : pourquoi on ne peut pas se passer d'un IDE comme VS Code ; comment l'ajout de l'IA (Trae, Cursor, etc.) transforme l'IDE d'une simple boîte à outils en un « stagiaire » qui comprend le langage naturel, crée des fichiers, installe des environnements et modifie le code ; et à quoi sert chaque zone de l'interface (fichiers à gauche, terminal en bas, éditeur au centre, panneau IA à droite).

Plus important encore, vous avez accompli un cycle complet : créer un dossier vide en local → l'ouvrir avec l'AI IDE → décrire vos besoins dans la barre latérale → demander à l'IA de générer le projet et de lancer le serveur de développement → en cas de problème, envoyer « le symptôme + tout le code + la capture d'écran d'erreur » à l'IA pour qu'elle corrige en mode « débutant ». Dans ce processus, vous avez aussi pratiqué comment écrire des prompts plus efficaces : clarifier l'objectif, la structure du contenu et votre niveau, contrôler le rythme, passer de « d'abord que ça marche » à « puis que ce soit joli et amusant ».

Le chapitre suivant va déplacer le focus de « savoir utiliser les outils » vers « créer un prototype que les gens veulent vraiment utiliser » : en partant de la perspective utilisateur, concevoir les règles, les interactions et les retours, puis demander à l'IA de transformer ces idées en un prototype de produit.

## 8. 📚 Devoir : Créer un jeu plus complexe avec un AI IDE local

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Défi : Créez votre jeu personnel</div>
  </template>

  <p>
    Vous avez déjà créé un jeu de serpent avec un AI IDE local. Maintenant, relevez un défi avec un jeu plus complexe, en parcourant le cycle complet « décrire les besoins → générer le projet → exécuter en local → déboguer et itérer ».
  </p>

  <ol>
    <li>
      <strong>Choisir un jeu plus complexe que le serpent</strong>
      <ul>
        <li>Vous pouvez choisir « Tétris », « Jeu du mole », « Démineur », « 2048 », « Bataille aérienne », etc.</li>
        <li>Ou un jeu original simple de votre invention</li>
      </ul>
    </li>
    <li>
      <strong>Utiliser obligatoirement un AI IDE local pour tout le processus</strong>
      <ul>
        <li>Créer un dossier vide, l'ouvrir avec l'AI IDE</li>
        <li>Décrire clairement vos besoins de jeu dans la barre latérale</li>
        <li>Laisser l'IA créer les fichiers, structurer le projet et implémenter la logique principale</li>
        <li>Lancer le serveur de développement en local et vérifier que le jeu fonctionne</li>
      </ul>
    </li>
    <li>
      <strong>Avoir une « jouabilité » et des retours de base</strong>
      <ul>
        <li>Au minimum trois états : début, en cours, fin</li>
        <li>Un mode de contrôle clair pour le joueur (clavier ou souris)</li>
        <li>Un score ou une progression visible à l'écran</li>
      </ul>
    </li>
    <li>
      <strong>Faire au moins 2 itérations ou plus</strong>
      <ul>
        <li>Premier tour : l'IA fait une version « jouable »</li>
        <li>À partir du deuxième tour : proposer des améliorations concrètes (style, difficulté, optimisation des interactions, etc.)</li>
      </ul>
    </li>
  </ol>
</el-card>

<RelatedArticlesSection
  title="Continuer l'apprentissage"
  description="Il est recommandé de d'abord passer à la pratique des prototypes, puis d'intégrer progressivement les capacités IA."
  :items="relatedArticles"
/>

# Annexe

<el-card id="appendix-nav" shadow="hover" style="margin-top: 40px; margin-bottom: 24px; border-left: 5px solid #E6A23C;">
  <div style="font-weight: bold; margin-bottom: 8px;">Navigation de l'annexe</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Voici les ressources complémentaires « à consulter au besoin » : revenez ici quand vous rencontrez un terme que vous ne comprenez pas ou que vous ne trouvez pas l'entrée dans l'interface.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <a href="#appendix-1-map" style="text-decoration: none; color: inherit;"><b>Annexe 1 : Glossaire des termes informatiques courants</b></a><br/>
      <span style="font-size: 12px; color: #909399">Quand vous rencontrez un terme informatique que vous ne comprenez pas, venez ici pour trouver rapidement sa signification. Il est recommandé de le lire une fois en entier.</span>
    </el-col>
    <el-col :span="12">
      <a href="/fr-fr/appendix/2-development-tools/ide-basics" style="text-decoration: none; color: inherit;"><b>Annexe 2 : Explication de la barre de menus de Visual Studio Code</b></a><br/>
      <span style="font-size: 12px; color: #909399">Quand vous ne savez pas à quoi sert un élément de l'interface de l'AI IDE, utilisez le contenu ci-dessous pour dialoguer avec l'IA, ou consultez-le directement.</span>
    </el-col>
  </el-row>
  <div style="margin-top: 12px; font-size: 12px; color: #909399;">
    Support : utilisez Ctrl/⌘+F pour rechercher des mots-clés ; en cas de nouveau terme, copiez l'erreur et demandez à l'IA de l'expliquer en « mode débutant ».
  </div>
</el-card>

# Annexe 1 : Glossaire des termes informatiques courants

<el-card id="appendix-1-map" shadow="hover" style="margin-top: 40px; margin-bottom: 20px; border-left: 5px solid #409EFF;">
  <div style="font-weight: bold; margin-bottom: 10px;">Carte des termes : vous rencontrerez ici...</div>
  <el-row :gutter="20">
    <el-col :span="6">
      <a href="#term-tool-ui" style="text-decoration: none; color: inherit;"><b>Interface des outils</b></a><br/>
      <span style="font-size: 12px; color: #909399">IDE / Terminal / Panneau</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-network" style="text-decoration: none; color: inherit;"><b>Réseau et services</b></a><br/>
      <span style="font-size: 12px; color: #909399">URL / Port / Local</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-frontend-backend" style="text-decoration: none; color: inherit;"><b>Frontend / Backend</b></a><br/>
      <span style="font-size: 12px; color: #909399">API / JSON / Interface</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-code-basic" style="text-decoration: none; color: inherit;"><b>Bases du code</b></a><br/>
      <span style="font-size: 12px; color: #909399">Variable / Fonction / Composant</span>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="6">
      <a href="#term-debug" style="text-decoration: none; color: inherit;"><b>Débogage</b></a><br/>
      <span style="font-size: 12px; color: #909399">Bug / Point d'arrêt / Log</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-project" style="text-decoration: none; color: inherit;"><b>Gestion de projet</b></a><br/>
      <span style="font-size: 12px; color: #909399">Git / Dépôt / Commit</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-ai-tool" style="text-decoration: none; color: inherit;"><b>Outils IA</b></a><br/>
      <span style="font-size: 12px; color: #909399">Agent / Modèle / Key</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-browser" style="text-decoration: none; color: inherit;"><b>Navigateur</b></a><br/>
      <span style="font-size: 12px; color: #909399">DevTools / Console</span>
    </el-col>
  </el-row>
</el-card>

Cette section n'a pas besoin d'être mémorisée, il est plus important de se faire d'abord une impression mentale.

## <span id="term-tool-ui">[I. Termes liés à « l'interface des outils »](#appendix-1-map)</span>

### 1. IDE, éditeur, terminal

**IDE (Environnement de Développement Intégré)**
Imaginez l'IDE comme le « bureau du programmeur » :

- D'un côté le bureau pour écrire (l'éditeur),
- De l'autre les prises et les boutons (exécuter, déboguer),
- Dans les tiroirs divers petits outils (recherche, gestion de versions).
  VS Code, Trae, Cursor sont tous des IDE ou des outils basés sur des IDE.

**Éditeur de code (Editor)**
Plus comme un « bloc-notes avancé », responsable uniquement de :

- Vous permettre de taper du code ;
- Colorer différemment les éléments (coloration syntaxique) ;
- Vous proposer de l'autocomplétion.
  La zone où vous écrivez le code dans l'IDE est l'éditeur.

**Terminal / Ligne de commande (Terminal)**
Une fenêtre à fond noir et texte blanc, où vous **tapez des commandes** pour demander à l'ordinateur de travailler :

- `npm run dev` signifie « lance le serveur de développement » ;
- `python main.py` signifie « exécute ce fichier Python ».
  Imaginez-le comme : « vous envoyez des SMS de commandes à votre ordinateur, et il répond avec du texte. »

### 2. Zones courantes de l'IDE

**Activity Bar (Barre d'activité)**
La rangée de petites icônes verticales à l'extrême gauche, comme des « onglets de fonctionnalités » :

- Cliquer sur l'icône de fichier → affiche la liste des fichiers à gauche ;
- Cliquer sur la loupe → le panneau de recherche apparaît ;
- Cliquer sur l'icône Git → affiche la gestion de versions.

**Side Bar (Barre latérale)**
La grande zone à droite de la barre d'activité, affichant le contenu du mode actuel :

- Mode fichier : affiche les fichiers et dossiers du projet ;
- Mode recherche : affiche la liste des résultats de recherche ;
- Mode gestion de sources : affiche quels fichiers ont été modifiés.

**Editor (Zone d'édition)**
La plus grande zone au centre, où vous voyez et modifiez le contenu des fichiers ouverts ;
les onglets (Tab) en haut indiquent « quels fichiers sont actuellement ouverts ».

**Panel (Panneau inférieur)**
Généralement tout en bas, comprenant plusieurs types :

- Terminal : taper des commandes pour lancer le projet ;
- Problems : lister les fichiers et lignes avec des erreurs ;
- Output : informations d'exécution imprimées par certains outils ;
- Debug Console : sortie lors du débogage.

**Status Bar (Barre d'état)**
La fine barre tout en bas :

- Affiche le langage du fichier actuel (JS, HTML, Python, etc.) ;
- Affiche si l'indentation est de « 2 espaces » ou « 4 espaces » ;
- Affiche s'il y a des erreurs et quelle est la branche Git actuelle.
  Vous pouvez la considérer comme « un petit bilan de santé de l'environnement d'édition actuel ».

## <span id="term-network">[II. Termes liés à « Web / Réseau / Service »](#appendix-1-map)</span>

### 1. URL, HTTP, port, service local

**URL (adresse web)**
Ce qui se trouve dans la barre d'adresse du navigateur, par exemple :

- `https://www.trae.cn/`
- `http://localhost:3000/`
  C'est comme « l'adresse complète d'une pièce dans le monde de l'Internet ».

**HTTP / HTTPS**
Ce que vous voyez au début de l'URL : `http://` ou `https://` :

- HTTP : mode de transmission normal ;
- HTTPS : avec une couche de chiffrement supplémentaire, plus sûr.
  Vous pouvez retenir pour l'instant : « les adresses web commencent généralement par `http` ou `https` ».

**Port (Port)**
Imaginez votre ordinateur comme un immeuble, le port est le **numéro de la porte de chaque pièce** :

- `:3000` signifie la pièce numéro 3000 ;
- Sur le même ordinateur, plusieurs services peuvent tourner simultanément, chacun occupant un port.
  `http://localhost:3000` signifie « accéder au service qui tourne dans la pièce 3000 de mon propre ordinateur ».

**Local / localhost**
Désigne votre propre ordinateur.

- `localhost` peut être compris comme « cette machine elle-même ».
  Quand vous accédez à `http://localhost:3000`, vous communiquez en fait avec un programme qui tourne sur votre propre ordinateur, et non pas avec un serveur distant sur Internet.

**Service (Service / Serveur)**
Un « service » est un programme qui **tourne en permanence en arrière-plan et est prêt à recevoir vos instructions** :

- Service web : quand le navigateur accède à une adresse, il renvoie le contenu de la page ;
- Service de jeu : gère les parties, les sauvegardes, le classement, etc.
  Exécuter `npm run dev` dans le terminal, c'est fondamentalement « lancer un service web en local ».

## <span id="term-frontend-backend">[III. Termes liés à « Frontend / Backend / Données »](#appendix-1-map)</span>

### 1. Frontend, Backend

**Frontend**
La partie que l'utilisateur **voit et sur laquelle il peut cliquer** :

- Les boutons, textes, images et animations d'une page web ;
- Les pages écrites avec React / Vue.
  Responsable de l'affichage de l'interface et de la réponse aux actions de l'utilisateur (clic, saisie, glisser-déposer, etc.).

**Backend**
La partie que l'utilisateur **ne voit pas**, qui tourne sur le serveur :

- Stocker et lire les données (informations utilisateur, commandes, scores, etc.) ;
- Exécuter les règles métier (vérification de connexion, vérification des permissions).
  Vous pouvez comparer le frontend au « magasin et aux vendeurs », et le backend à « l'entrepôt et au système comptable ».

### 2. API, requête, réponse, JSON

**Interface / API**
Un ensemble de règles convenues entre le frontend et le backend pour « poser des questions et recevoir des réponses ».

- Le frontend dit : « je t'interroge à cette adresse, dans ce format » ;
- Le backend dit : « je te renvoie le résultat dans ce format ».

**Requête (Request)**
Une « question » envoyée par le frontend au backend :

- Où aller (l'URL) ;
- Par quelle méthode (GET, POST, etc.) ;
- Avec quels paramètres (par exemple l'ID utilisateur).

**Réponse (Response)**
La « réponse » du backend au frontend :

- Code de statut (200 succès, 404 non trouvé, 500 erreur serveur) ;
- Les données réelles (généralement en JSON).

**JSON**
Un format de données qui utilise une **écriture très similaire au code JavaScript**, par exemple :

```json
{
  "name": "Alice",
  "score": 120
}
```

On peut le comprendre comme un « carnet de notes clé-valeur version machine », souvent utilisé par le frontend et le backend pour échanger des données.

## <span id="term-code-basic">[IV. Termes liés à « l'écriture de code »](#appendix-1-map)</span>

### 1. Variable, identifiant, état

**Variable (Variable)**
Une « étiquette collée sur une donnée ».

- Par exemple, on enregistre le score sous le nom `score` ;
- Ensuite, en utilisant le nom `score`, on peut lire et modifier cette donnée :

```js
let score = 0
score = score + 10
```

**Identifiant (Identifier)**
Le terme générique pour « tous les noms que vous donnez vous-même » :

- Nom de variable : `score`
- Nom de fonction : `moveSnake`
- Nom de composant : `SnakeGame`
  C'est comme donner des noms aux dossiers « Photos », « Travail », « Factures » pour distinguer différentes « choses » dans le code.

**État (State)**
L'enregistrement des « situations clés » actuelles du programme :

- Est-ce que le jeu est terminé ;
- À quelle position est le serpent ;
- Quel est le score actuel.
  En React, on comprend généralement : **quand l'état change, l'interface doit se mettre à jour automatiquement**.

### 2. Fonction, composant, module

**Fonction (Function)**
« Empaqueter » une action répétable sous un nom :

```js
function sayHello(name) {
  console.log('Hello, ' + name)
}
```

Ensuite, écrire `sayHello('Bob')` revient à exécuter à nouveau les lignes à l'intérieur.

**Composant (Component)**
Dans le frontend, un « petit morceau d'interface + petite logique réutilisable » :

- Un bouton peut être un composant ;
- Une barre de navigation en haut peut être un composant ;
- La zone de jeu entière peut aussi être un composant.
  Les composants s'assemblent comme des Legos.

**Module (Module)**
Un « fichier contenant un ensemble de code lié » :

- `snakeLogic.ts` contient spécifiquement le code lié au « mouvement du serpent » ;
- `score.ts` contient spécifiquement le code de calcul du score.
  Les modules peuvent s'importer / s'exporter entre eux, comme des outils dans différents tiroirs.

### 3. Syntaxe, langage de programmation, framework

**Syntaxe**
Les « règles grammaticales » et « habitudes de ponctuation » d'un langage de programmation :

- Les chaînes de caractères doivent être entre guillemets ;
- Faut-il un point-virgule à la fin de chaque instruction ;
- Les blocs de code doivent être entre `{}`.
  Une erreur de syntaxe fait que le compilateur / interpréteur affiche directement une « erreur de syntaxe ».

**Langage de programmation (Programming Language)**
Un ensemble complet de règles et de vocabulaire pour communiquer avec l'ordinateur, par exemple :

- JavaScript, Python, Java, C++, Go...
  Les différents langages sont adaptés à des tâches différentes, avec des syntaxes et des écosystèmes d'outils différents.

**Framework (Framework)**
Une grande base de code et un ensemble de pratiques que d'autres ont « préconstruites » pour vous :

- Frontend : React, Vue (aide à gérer les mises à jour de l'interface, la gestion d'état, etc.) ;
- Backend : Django, Spring Boot, etc.
  Vous êtes en quelque sorte en train de « remplir le contenu sur une ossature existante », bien plus facile que de réinventer la roue.

## <span id="term-debug">[V. Termes liés au « débogage / recherche d'erreurs »](#appendix-1-map)</span>

### 1. Bug, message d'erreur, log / console.log

**Bug**
Quand le programme ne se comporte pas comme prévu, c'est un bug :

- Un bouton devrait apparaître mais n'est pas là ;
- On devrait ajouter 10 points mais on en ajoute plein ;
- La page est blanche dès l'ouverture.

**Message d'erreur (Error Message)**
Le texte « effrayant » en anglais qui s'affiche sur l'écran ou dans le terminal quand le programme plante.
Bien qu'il soit intimidant, il indique généralement :

- En gros où est l'erreur ;
- Quel fichier et autour de quelle ligne il faut vérifier.
  Vous pouvez le copier directement et le donner à l'IA pour qu'elle le traduise et l'analyse.

**Log (Journal)**
Ce que le programme « dit » pendant son exécution.
Le plus courant dans le frontend est :

```js
console.log('Score actuel', score)
```

Vous pouvez le comprendre comme : **à chaque étape clé, faire un rapport pour confirmer que le programme suit bien le comportement attendu**.

> **Qu'est-ce que console.log ?**
>
> - `console` peut être compris comme un « petit tableau noir pour le débogage » ;
> - `.log` c'est « écrire une ligne sur le petit tableau noir » ;
> - Dans le navigateur, appuyez sur F12 pour ouvrir le panneau Console des outils de développement, et vous verrez ces sorties.

### 2. Débogage, point d'arrêt, exécution pas à pas, instantané

**Débogage (Debug)**
Quand le programme a un problème, au lieu de modifier au hasard, on :

- Fait « pause » le programme à une ligne précise (point d'arrêt) ;
- Regarde la valeur de chaque variable à ce moment ;
- Avance pas à pas en observant « à partir d'où ça dérape ».

**Point d'arrêt (Breakpoint)**
Vous pouvez comprendre le point d'arrêt comme « insérer un bouton de pause sur une ligne » :

- Le programme court normalement de haut en bas ;
- Quand il arrive à la ligne où vous avez inséré le point d'arrêt, il s'arrête temporairement et attend que vous inspectiez.

**Exécution pas à pas (Step)**
Après l'arrêt au point d'arrêt, vous pouvez choisir :

- Avancer ligne par ligne (step over) ;
- Entrer dans une fonction pour la détailler (step into).
  C'est comme regarder un mouvement de danse au ralenti, au lieu de regarder la vidéo en accéléré.

**Instantané (Snapshot) -- compréhension simplifiée**
Ici, « instantané » peut être compris comme :

> **À un moment donné, prendre une « photo de l'état actuel » pour pouvoir comparer plus tard.**
> Dans les outils réels, « instantané » peut désigner :

- L'état complet du projet à un instant de commit ;
- La situation globale de la mémoire / des variables à un moment du débogage.
  Retenez cette comparaison, elle suffit : **instantané ≈ une photo de l'état à un moment donné**.

## <span id="term-project">[VI. Termes liés à la « gestion de projet »](#appendix-1-map)</span>

### 1. Projet, espace de travail, dossier

**Projet (Project)**
L'ensemble des éléments placés dans un même dossier pour réaliser une application :

- Les fichiers de code source
- Les fichiers de configuration
- Les ressources (images, audio, etc.)

**Espace de travail (Workspace)**
Le concept utilisé par VS Code / Trae pour décrire « ce qui a été ouvert dans la session actuelle » :

- Ouvrir un dossier → un espace de travail simple ;
- Parfois, plusieurs dossiers sont regroupés en un espace de travail multi-projets.

### 2. Git, dépôt, commit

**Git (outil de contrôle de version)**
On peut le comprendre comme une « machine à voyager dans le temps » pour le projet :

- Après chaque série de modifications, vous pouvez « prendre une photo de la version » ;
- Plus tard, si besoin, vous pouvez revenir à un état historique.

**Dépôt (Repository / Repo)**
Une fois Git activé, le dossier du projet avec l'historique des versions s'appelle « dépôt ».

**Commit**
Chaque fois que vous estimez que vos modifications constituent une étape importante, vous pouvez :

- Écrire une description (par exemple : `Add score panel`) ;
- Empaqueter toutes les modifications actuelles en une version ;
- Git enregistre l'état à ce moment.
  Cette action s'appelle « faire un commit ».

## <span id="term-ai-tool">[VII. Termes liés aux « outils de développement IA »](#appendix-1-map)</span>

### 1. AI IDE, Agent, mode SOLO

**AI IDE**
Un IDE classique avec une couche d'IA supplémentaire capable de « comprendre le langage humain et d'agir » :

- Vous dites « fais un jeu de serpent », il vous aide à structurer le projet et à écrire le code ;
- Vous lui donnez une capture d'écran d'erreur, il l'explique d'abord puis essaie de réparer ;
- Il peut modifier plusieurs fichiers en même temps, au lieu de compléter ligne par ligne.

**Agent (Agent intelligent)**
Vous pouvez imaginer l'Agent comme un **petit ingénieur IA en permanence disponible** :

- Il lit la structure de votre projet ;
- Il décompose les tâches (d'abord installer les dépendances, puis générer le code, puis lancer le projet) ;
- S'il y a une erreur pendant l'exécution, il ajuste son plan en fonction du message d'erreur.

**Mode SOLO (exemple de Trae)**
Signifie :

> Vous n'avez qu'à exprimer clairement « le point d'arrivée »,
> il planifie « l'itinéraire » lui-même,
> l'exécute pas à pas en local,
> et ne vous demande confirmation qu'aux étapes clés.

### 2. Modèle, clé (API Key)

**Modèle (Model, ici spécifiquement grand modèle de langage)**
Ce terme peut être simplement compris comme « le gros cerveau IA derrière » :

- Comme GPT, Claude, Kimi, GLM, etc. ;
- Les différents modèles ont des niveaux différents en « compréhension du chinois », « écriture de code » et « raisonnement » ;
- Dans l'AI IDE, on peut généralement changer de modèle dans un menu déroulant.

**Clé / API Key**
Vous pouvez comprendre l'API Key comme **un très long « mot de passe avancé + numéro d'identité »**.
Son seul rôle est :

> Dire au serveur distant : « Je suis tel utilisateur, autorisez-moi à utiliser votre service IA et enregistrez ma consommation. »

Quelques points importants :

- Cette chaîne est généralement une longue série de lettres et chiffres aléatoires ;
- Ne la publiez jamais dans des endroits publics (dépôt, capture d'écran, chat de groupe), quelqu'un pourrait l'utiliser pour usurper votre compte ;
- Remplir une API Key dans un outil équivaut à « insérer la clé dans la serrure », après quoi l'outil peut appeler le service IA correspondant pour vous.

## <span id="term-browser">[VIII. Termes liés au « navigateur / Outils de développement »](#appendix-1-map)</span>

**Chrome (Google Chrome)**
L'un des navigateurs les plus utilisés pour le développement frontend :

- Il ouvre les pages rapidement ;
- Il intègre des « outils de développement » assez puissants, pratiques pour chercher les problèmes.

**Actualiser (Refresh / Reload)**
Recharger la page actuelle :

- Après avoir modifié le code frontend, sans outil de rafraîchissement automatique, vous devez actualiser manuellement pour voir les changements.

**Outils de développement (DevTools)**
Un ensemble de panneaux d'outils dans le navigateur réservés aux développeurs :

- Voir la structure de la page (Elements) ;
- Voir les styles (Styles) ;
- Voir les erreurs et les logs (Console) ;
- Voir les requêtes réseau (Network).
  Dans Chrome, généralement accessible avec `F12` ou `Ctrl+Shift+I`.

**Console**
Un onglet des outils de développement, dédié à l'affichage de :

- Vos sorties `console.log(...)` ;
- Les erreurs survenues pendant l'exécution (texte rouge).
  Vous pouvez le considérer comme la « boîte de dialogue du programme » :
- Le programme a quelque chose à dire, il l'écrit ici ;
- C'est la zone que vous consultez le plus souvent pendant le débogage.

Si vous rencontrez de nouveaux termes par la suite, vous pouvez demander à l'IA de vous aider à compléter votre glossaire personnel en suivant ce modèle :

- D'abord « à quoi ça sert » ;
- Puis « à quoi on peut le comparer » ;
- Enfin « un petit exemple très simple ».
Ainsi, votre « glossaire personnel » deviendra de plus en plus utile, et vous pourrez mieux communiquer avec l'ordinateur.
---
title: 'Debutant 2 : Outils de programmation IA'
description: 'Passer du codage IA sur le web au dev local : comprendre IDE vs AI IDE, construire un jeu du serpent avec Trae et ameliorer la collaboration avec l IA.'
---
