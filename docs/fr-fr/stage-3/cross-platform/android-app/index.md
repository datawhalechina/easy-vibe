# Comment construire une application Android simple - Développement natif avec Compose

# 1 Ce que sont les applications Android et le développement Android

Dans ce tutoriel, nous allons réaliser une boucle complète : **partir d'une idée dans votre tête pour arriver à une vraie application qui peut être installée et exécutée avec succès sur un téléphone Android.**

Pour ce tutoriel, vous devez au moins disposer de :

- Un ordinateur avec de bonnes performances (Windows ou Mac)
- Un téléphone Android (facultatif ; si vous n'en avez pas, nous utiliserons un émulateur)
- Android Studio installé (pour la compilation)
- Trae installé et enregistré (pour le codage avec l'IA)

## 1.1 Définition d'une application Android

Une application Android est une application native qui fonctionne sur le système d'exploitation Android. Contrairement aux mini-programmes, elle ne dépend pas d'un hôte comme WeChat. Elle fonctionne directement au niveau du système. Elle possède sa propre icône sur l'écran d'accueil, se lance rapidement, est fluide et peut accéder profondément aux fonctionnalités système telles que le Bluetooth, les capteurs et les services en arrière-plan.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image1.webp)

## 1.2 Développement d'applications Android

Le développement Android désigne l'ensemble du processus de construction de telles applications. Dans le mode de développement Vibe Coding utilisé dans ce tutoriel, avec **la programmation assistée par l'IA**, le rôle du développeur passe de « rédacteur de code » à « architecte produit » :

1. **Vous (architecte / PM)** : responsable de la conception de la logique métier, de la rédaction des prompts et de la validation finale du résultat.
2. **Trae (ingénieur IA)** : responsable de l'exécution des instructions, de la conversion du langage naturel en code Kotlin standard et en mises en page Jetpack Compose, et de la gestion des erreurs de syntaxe et des détails logiques.
3. **Android Studio (usine de construction)** : responsable de la fourniture de l'environnement de compilation, de l'emballage du code en une application installable et de la prévisualisation sur émulateur.

## 1.3 Méthodes courantes de construction d'applications Android

Dans le développement réel, il existe plusieurs façons de construire des applications Android. Nous n'entrerons pas dans les détails ici, mais donnerons simplement une vue d'ensemble.

**La première méthode : le développement natif**
C'est la voie officielle et recommandée par Google. Vous utilisez directement **Kotlin** et **Jetpack Compose** pour le développement. Son avantage est d'offrir les meilleures performances et un accès complet au matériel du téléphone.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image2.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image3.webp)

**La deuxième méthode : le développement multiplateforme**
Par exemple Flutter ou React Native. L'idée principale est « écrire une base de code et générer des applications Android et iOS. »

**La troisième méthode : le développement hybride**
Essentiellement, il s'agit d'intégrer une page web dans une coquille d'application. C'est rapide à développer, mais l'expérience et la fluidité sont généralement inférieures à celles d'une application native, et il est difficile de créer un petit outil soigné et immersif de cette façon.

**Le choix de ce tutoriel : le développement natif (** **Kotlin + Compose)** combiné à des outils d'IA pour le codage.
La raison est simple : le code natif Jetpack Compose a une structure très claire et est hautement adapté pour que l'IA le comprenne et le génère. Nous n'avons pas besoin d'écrire du code à la main depuis le début. Au lieu de cela, nous guidons Trae avec du langage naturel pour générer du code natif de haute qualité.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image4.webp)

## 1.4 Étapes de développement d'applications Android couvertes dans ce tutoriel

Pour rendre le processus d'apprentissage intéressant, ce tutoriel s'articule autour d'un cas relaxant mais techniquement représentatif - **le Poisson de Bois Électronique**. Nous combinons le mode Vibe Coding de Trae avec une route que vous pouvez réutiliser à plusieurs reprises :

1. **Comprendre et configurer l'environnement** : comprendre ce que sont les applications Android, installer Android Studio et Trae, et configurer des miroirs adaptés pour que la chaîne d'outils fonctionne sans problème.
2. **Construire le squelette du projet** : créer un projet Android vierge qui peut s'exécuter avec succès dans l'émulateur.
3. **Développement itératif avec l'IA** : ouvrir le projet dans Trae, puis par conversation avec l'IA, implémenter progressivement l'image du poisson de bois, l'animation de tapotement, les effets sonores, le texte flottant, et plus encore.
4. **Débogage sur appareil réel et peaufinage** : aller au-delà de l'émulateur, installer l'application sur votre véritable téléphone, ressentir les retours de vibration réels, et laisser l'IA vous aider à investiguer les bugs.
5. **Emballage et publication** : générer un APK formel et comprendre comment le partager ou le publier.

Cette section ne fait que dresser le tableau d'ensemble sans encore détailler toutes les commandes. Pour l'instant, retenez simplement la ligne principale : **configuration de l'environnement -> construction du squelette -> description IA et génération -> peaufinage sur appareil réel -> emballage et livraison**. Dans les prochains chapitres, nous vous guiderons à travers chaque étape.

# 2 Configuration de l'environnement de développement

## 2.1 Outils utilisés dans ce tutoriel

Pendant tout le processus de développement, nous utilisons trois outils ensemble, jouant les rôles de « conception », « construction » et « validation ».

- **Trae** : c'est votre **partenaire de codage IA**. En mode Vibe Coding, nous n'avons plus besoin de taper du code ligne par ligne. Au lieu de cela, nous disons principalement à l'IA en langage naturel ce que nous voulons, et elle gère la génération et la modification du code.
- **Android Studio** : c'est l'**usine de construction d'applications** officielle de Google. Bien qu'elle ait de nombreux boutons, dans ce tutoriel nous l'utilisons principalement pour créer le squelette du projet et compiler le code généré par Trae en quelque chose d'installable sur un téléphone.
- **Un appareil Android** : il sert de **terminal de test** pour voir le résultat. Vous pouvez le connecter à votre ordinateur pour le débogage sur appareil réel et ressentir de vrais retours de vibration. Si vous n'en avez pas, l'**émulateur** intégré à Android Studio peut simuler un téléphone virtuel de manière parfaite, ce qui est suffisant pour le développement préliminaire.

## 2.2 Télécharger Trae

Trae est notre principal terrain de **Vibe Coding**. Vous pouvez simplement le considérer comme un **« éditeur de code alimenté par l'IA ».**

Visitez le site officiel [https://www.trae.cn](https://www.trae.cn), téléchargez la version correspondant au système de votre ordinateur (Windows ou Mac), et installez-le comme un logiciel ordinaire en double-cliquant sur l'installateur et en suivant les instructions. Une fois cet outil prêt, dans la pratique ultérieure nous ne regarderons plus des fenêtres de code ennuyeuses, mais ouvrirons plutôt le projet ici et dirons à l'IA quoi construire en langage naturel.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image5.png)

## 2.3 Télécharger Android Studio

Nous avons besoin d'Android Studio pour fournir le SDK Android et l'émulateur nécessaires à l'exécution de l'application. Visitez la page de téléchargement officielle [https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn) et téléchargez le package correspondant à votre système d'exploitation (ce tutoriel est basé sur **2025.2.3**). Après le téléchargement, installez-le comme un logiciel normal, en gardant les options par défaut tout au long du processus.

**Rappel spécial pour les débutants :**

Bien que les versions modernes d'Android Studio aient grandement simplifié la configuration, elle dépend toujours en coulisses du **JDK (Java Development Kit)**. Si c'est votre première expérience de développement, ou si vous rencontrez des erreurs liées aux variables d'environnement ou à la configuration du SDK pendant l'installation, ne paniquez pas. Vous pouvez vous référer à ce guide de configuration détaillé : [Configuration d'Android Studio 2024 : SDK et configuration Gradle](https://blog.csdn.net/keiraee/article/details/142321644?ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image6.png)

## 2.4 Créer un nouveau projet

Ouvrez Android Studio et cliquez sur **New Project** sur l'écran d'accueil.

**Étape 1 : Choisir un modèle**

Dans la liste des modèles, sélectionnez **Empty Activity** (remarquez l'icône Jetpack Compose dessus).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image7.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image8.png)

**Étape 2 : Remplir la configuration du projet**

Vous verrez ensuite un formulaire de configuration. Remplissez-le grossièrement comme suit et gardez le reste par défaut :

| **Champ** | **Valeur recommandée** | **Explication** |
| ----------------- | -------------------------------------------------- | ---------------------------------------- |
| **Name** | My Application 1 | Nom de l'application affiché sur l'écran d'accueil du téléphone |
| **Package name** | com.example.myapplication1 | Identifiant unique de l'application |
| **Save location** | Chemin personnalisé (par exemple `E:\AndroidProjects\Myapplication1`) | Emplacement de stockage du projet ; déconseillé sur le lecteur C |
| **Minimum SDK** | API 30 | Couvre plus de 90 % des appareils actifs tout en équilibrant compatibilité et fonctionnalités |
| **Language** | Kotlin (recommandé) | Kotlin est le langage officiellement recommandé par Google, plus propre et plus sûr |

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image9.png)

**Étape 3 : Attendre la construction du projet**

Cliquez sur **Finish**. Android Studio téléchargera automatiquement les dépendances et construira le projet (vous verrez une barre de progression dans le coin inférieur droit).

- _Note : la première création de projet peut prendre plusieurs minutes. Attendez patiemment que la progression en bas se termine et que l'arborescence de fichiers du projet soit entièrement chargée à gauche._

## 2.5 Configuration des dépendances : Téléchargement Gradle et miroirs de dépôt Gradle

> C'est l'une des rares étapes du flux de travail Vibe Coding où une **opération manuelle** est recommandée. Bien que l'IA puisse aussi aider à modifier la configuration, la configuration de l'environnement touche à des fichiers de bas niveau, les modifications manuelles sont donc plus fiables.

Pourquoi devons-nous modifier la configuration ?

Par défaut, Android Studio se connecte à des serveurs étrangers, le téléchargement des outils de construction et des dépendances peut donc prendre une heure, voire échouer. Après être passé aux miroirs domestiques, cela se termine souvent en quelques minutes. **C'est une tâche ponctuelle qui rapporte pour toujours.**

1. **Préparation**

Si la barre d'état en bas à droite d'Android Studio affiche actuellement une barre de progression comme `Gradle Building...`, mettez d'abord en pause le téléchargement des dépendances en cours pour éviter les conflits de fichiers.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image10.png)

2. **Accélérer le téléchargement Gradle**

Dans l'arborescence de fichiers du projet à gauche, développez `gradle` -> `wrapper`, puis ouvrez `gradle-wrapper.properties`. Changez la source de téléchargement pour le miroir Tencent :

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

Attention : vous devez uniquement remplacer `services.gradle.org/distributions` par `mirrors.cloud.tencent.com/gradle`. Ne changez rien d'autre.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **Accélérer le téléchargement du dépôt de dépendances**

Ensuite, ouvrez `settings.gradle.kts` à la racine du projet, et remplacez le contenu du bloc `repositories` par ce qui suit :

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image12.png)

Remplacez la section en surbrillance par ce code (liste des sources mise à jour au 2025-02-21) :

```json
        // Miroirs Aliyun (couvrant Maven Central, Google, JCenter, etc.)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Miroir Huawei Cloud
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Miroir Tencent Cloud
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // Miroir NetEase
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

Le résultat devrait ressembler à la capture d'écran ci-dessous :

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **Enregistrer et appliquer les modifications**

À ce stade, enregistrez le fichier et cliquez sur `Try Again` dans le coin supérieur droit. Android Studio relancera le téléchargement. Attendez quelques minutes. Lorsque la console affiche `BUILD SUCCESSFUL`, cela signifie que la configuration de l'environnement est entièrement terminée et que nous sommes prêts à commencer à coder.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 Comprendre la structure du projet

Une fois la création du projet réussie, le panneau **Project** apparaîtra à gauche. Basculez vers la vue **Android** (par défaut), et vous verrez les répertoires clés comme ceci :

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- "Carte d'identité" de l'application, déclare le nom de l'application et l'Activity d'entrée (MainActivity)
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- Point d'entrée de l'application, construit l'UI avec Jetpack Compose
│       │
│       └── ui/                        <- Contrôle le style global de l'UI (couleurs, polices)
├── res/
│   ├── drawable/                      <- Ressources d'images (par exemple ic_launcher.png)
│   ├── mipmap/                        <- Icône de l'application
│   ├── values/                        <- Styles de texte, couleur, thème
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- Fichiers de configuration liés au système (pas l'UI)
└── build.gradle (Module: app)         <- Configuration de construction de l'application (généralement non modifiée au niveau débutant)
```

En tant que débutants, nous n'avons généralement besoin de nous concentrer que sur trois fichiers :

- `MainActivity.kt` : contrôle le comportement et décide « ce qui apparaît à l'écran »
- `AndroidManifest.xml` : enregistre les composants et décide « où l'application démarre »
- `Theme.kt` : définit l'apparence visuelle

# 3 Développement d'applications Android

Dans les deux premiers chapitres, nous avons déjà compris ce que sont les applications Android et préparé les deux outils clés : Trae et Android Studio. À partir de cette section, nous quittons la théorie pour entrer dans la pratique réelle. Nous adopterons le mode Vibe Coding pour construire de zéro une application de soulagement du stress très populaire - **le Poisson de Bois Électronique**. Il correspond bien au thème « Vibe » (simple et relaxant), tout en couvrant trois parties fondamentales du développement Android : **l'interaction UI (tapotement), le stockage de données (compteur de mérites) et le multimédia (effets sonores)**.

Maintenant, suivez et envoyez la première instruction à l'IA.

## 3.1 Le premier « Prompt Maître » : de zéro à un

En mode Vibe Coding, nous n'avons pas besoin de créer d'abord des fichiers de mise en page puis d'écrire le code logique comme dans le développement traditionnel. Ce que nous devons faire, c'est **décrire clairement les exigences en une seule fois et laisser l'IA générer le premier prototype exécutable**.

Ouvrez le répertoire du projet que nous venons de créer dans Trae, et dans le panneau de chat à droite, entrez le Prompt suivant :

```text
Vous êtes un expert expérimenté en développement Android. Veuillez réécrire le fichier MainActivity.kt actuel et le transformer en une application "Poisson de Bois Électronique". Exigences :
1. L'arrière-plan de l'écran est noir.
2. Afficher un graphique de poisson de bois au centre de l'écran, de taille modérée, en blanc.
3. Afficher une ligne de texte blanc au-dessus : "Mérite : 0".
4. Lorsque le poisson de bois au centre est tapé, le nombre augmente de 1 et un effet d'animation de mise à l'échelle simple apparaît (simulant la sensation de frappe).
5. Utiliser Jetpack Compose.
```

Après l'avoir envoyé, Trae commencera à analyser la structure de votre projet. Quelques secondes plus tard, il générera directement le code complet de `MainActivity.kt`.

1. Depuis sa réponse, nous pouvons voir sa logique de raisonnement et sa logique d'interaction
2. Nous pouvons directement voir quelles parties du code ont été réécrites
3. Si nous ne sommes pas satisfaits du résultat, nous pouvons revenir à la version précédente

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image15.png)

## 3.2 Exécuter et prévisualiser (Débogage sur émulateur)

À ce stade, l'IA a terminé le premier tour de développement. Mais rappelez-vous, ce que nous voyons dans Trae n'est que des « plans » de code, pas une véritable application interactive. Trae lui-même ne peut pas exécuter directement des applications Android, nous devons donc nous appuyer sur l'**émulateur de périphérique virtuel** fourni par Android Studio. C'est comme transformer l'écran de votre ordinateur en un téléphone Android virtuel, nous permettant d'installer le code immédiatement et de voir le résultat réel.

Ensuite, configurons ce « téléphone virtuel ».

**Étape 1 : Créer l'émulateur**

Retournez dans Android Studio, trouvez et cliquez sur **Device Manager** dans la barre d'outils de droite. Si vous ne le trouvez pas, ouvrez-le depuis `View -> Tool Windows -> Device Manager`.

Dans le panneau, cliquez sur **Add a new device**, puis choisissez **Create Virtual Device** pour accéder à la fenêtre de sélection d'appareil.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image16.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image17.png)

Dans la fenêtre de sélection du matériel, choisissez **Phone** puis **Smart Phone** (taille d'écran moyenne), ou tout autre profil d'appareil que vous préférez comme Pixel, puis cliquez sur **Next**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image18.png)

**Étape 2 : Configurer l'image système**

Dans la boîte de dialogue **System Image**, sélectionnez **API 36.1**. Si elle n'a pas encore été téléchargée, cliquez d'abord sur **Download**, puis sélectionnez-la une fois le téléchargement terminé, et cliquez sur **Finish**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image19.png)

**Étape 3 : Démarrer l'émulateur**

Après la création réussie, votre nouveau téléphone apparaîtra dans la liste du gestionnaire d'appareils. Cliquez sur le **bouton de lecture triangulaire** à droite. Après une courte attente, une fenêtre en forme de téléphone apparaîtra - c'est votre émulateur Android.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image20.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image21.webp)

**Étape 4 : Exécuter l'application**

Vient maintenant le moment magique. Assurez-vous que l'émulateur a démarré et affiche le bureau, puis cliquez sur le **triangle vert Run** bien visible dans la barre d'outils supérieure d'Android Studio (ou utilisez le raccourci `Shift + F10`). Android Studio compilera automatiquement le code écrit par Trae, l'empaquètera en une application et l'installera dans l'émulateur.

En quelques secondes, vous devriez voir l'écran de l'émulateur s'allumer, affichant un graphique blanc de poisson de bois au centre avec le texte « Mérite : 0 » au-dessus. Essayez de le taper et voyez si le nombre augmente et si l'animation fonctionne. C'est votre première application Android.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image22.webp)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image23.png)

## 3.3 Itération d'optimisation (Ajouter des ressources et du son)

À ce stade, notre application a déjà une forme de base : le tapotement augmente le nombre. Mais ce n'est encore qu'une forme géométrique blanche « muette », dépourvue d'amusement. Ensuite, nous allons rendre le Poisson de Bois Électronique beaucoup plus immersif en ajoutant une vraie image et un effet sonore de frappe.

**C'est précisément la partie la plus attrayante du mode Vibe Coding.** Dans le développement traditionnel, ajouter des effets sonores et des animations plus complexes est souvent un cauchemar pour les débutants. Vous devez gérer le chargement et la libération des ressources `MediaPlayer` (sinon des fuites de mémoire peuvent se produire), et aussi calculer les courbes d'animation. En mode Vibe Coding, vous n'avez pas du tout besoin de vous soucier de ces détails de bas niveau. Vous avez seulement besoin de dire à l'IA comme un directeur : « changez l'accessoire et ajoutez un effet sonore quand on tape », et l'implémentation apparaît immédiatement.

**Étape 1 : Préparer les ressources**
Vous avez besoin d'une image de poisson de bois (`png`) et d'un effet sonore de frappe (`mp3`).

- **Ressource image** : copiez le fichier `white_muyu.png` préparé dans `app/src/main/res/drawable`
- **Ressource audio** : dans Android Studio, faites un clic droit sur le dossier `res` dans le panneau de projet à gauche, choisissez `New -> Android Resource Directory`, sélectionnez **raw** comme type de ressource, cliquez sur OK, puis copiez `voice.mp3` dans le nouveau dossier `res/raw`. _(Note : si vous prévoyez une utilisation commerciale, assurez-vous d'avoir les droits légaux sur toutes les ressources.)_

Voici les ressources d'image et de son que j'ai trouvées pour vous. S'il vous est difficile de chercher les vôtres, vous pouvez les utiliser directement.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image24.png)

Lien de téléchargement du son de frappe : https://www.aigei.com/s?q=%E6%9C%A8%E9%B1%BC&type=sound
Choisissez le premier effet sonore de 1 seconde.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**Étape 2 : Envoyer l'instruction d'itération**

Une fois les ressources prêtes, retournez dans Trae. Trae modifiera à nouveau le code et gérera pour vous le chargement audio et la logique d'animation. Vous avez seulement besoin de lui dire quelles ressources utiliser. Entrez ce Prompt :

```text
J'ai ajouté les ressources. Le chemin de l'image est res/drawable/white_muyu.png et le chemin de l'effet sonore est res/raw/voice.mp3. Veuillez mettre à jour le code :
1. Remplacer l'icône du poisson de bois au centre par mon image.
2. Jouer le son de frappe chaque fois que le poisson de bois est tapé.
3. Lorsqu'on tape, afficher un texte temporaire "+1" au-dessus du poisson de bois, puis le laisser flotter vers le haut et disparaître (comme un texte de score flottant dans les jeux).
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**Étape 3 : Vérifier le résultat**

Une fois que Trae a fini de modifier le code, retournez dans Android Studio et cliquez à nouveau sur le bouton vert Run (Re-run) pour redémarrer l'émulateur. À ce stade, votre application sera complètement transformée. Essayez de taper continuellement - vous devriez entendre un son « tok tok » clair et voir le texte flottant « Mérite +1 » sauter. Cela complète la transition clé de « démo » à « produit ».

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 Que faire si des bugs apparaissent ? (Boucle de débogage avec l'IA)

Le code généré par l'IA n'est pas garanti d'être parfait du premier coup, tout comme les meilleurs ingénieurs ne peuvent pas non plus promettre du code sans bug en une seule tentative. Mais en mode Vibe Coding, les bugs ne sont plus un mur qui vous bloque ; ils deviennent des pierres d'appoint dans votre collaboration avec l'IA.

**Cas 1 : l'application plante**

Supposons que l'application plante immédiatement après avoir cliqué sur Run, ou que le tapotement du poisson de bois ne joue pas de son. Traditionnellement, vous auriez besoin de chercher le code d'erreur, parcourir des dizaines de forums techniques et lire beaucoup de publications en anglais difficiles. En mode Vibe Coding, vous n'avez besoin de faire qu'une seule chose - **être un coursier**.

**Étapes :**

1. **Ouvrir le journal** : trouvez le panneau **Logcat** en bas d'Android Studio (la petite icône de chat).
2. **Localiser l'erreur** : vous verrez des journaux qui défilent, et les **lignes rouges** sont généralement les erreurs clés.
3. **Copier et coller** : sélectionnez le texte d'erreur anglais en rouge, copiez-le et collez-le dans Trae : « J'ai obtenu cette erreur lors de l'exécution. Veuillez m'aider à la corriger. »
4. L'IA peut immédiatement vous dire quelque chose comme : « Cela s'est produit parce que la permission de vibration n'a pas été déclarée dans `AndroidManifest.xml` », puis vous donner le code corrigé. Vous avez juste à cliquer sur Apply et continuer.

**Cas 2 : l'application fonctionne, mais l'expérience est mauvaise**

Parfois l'application ne plante pas, mais semble quand même insatisfaisante. Par exemple, en tapant très rapidement sur le poisson de bois, vous pouvez remarquer que les nouvelles animations « +1 » n'apparaissent pas tant que le « +1 » précédent n'a pas complètement disparu. Cela donne une impression de retard qui n'est pas satisfaisant. Vous n'avez pas besoin d'étudier vous-même le multithreading ou les files d'attente d'animation. Vous avez seulement besoin de décrire clairement ce malaise à l'IA.

Envoyez cette « instruction avancée » à Trae :

```text
Veuillez modifier la logique d'animation actuelle pour résoudre le problème de "tapotement rapide ne déclenche pas".
Problème actuel : il semble n'y avoir qu'un seul état d'animation, donc je dois attendre que le "+1" précédent disparaisse complètement avant qu'un autre clic ne réponde.
Exigences :
1. Remplacer l'état d'animation unique par une liste basée sur mutableStateListOf.
2. Chaque fois que le poisson de bois est tapé, ajouter immédiatement une nouvelle instance "+1" à la liste (avec son propre ID et sa position initiale), que l'animation précédente soit terminée ou non.
3. Dans l'UI, parcourir cette liste pour que chaque "+1" exécute sa propre animation de flottaison vers le haut + fondu indépendamment.
4. Après qu'une animation "+1" est terminée, la retirer automatiquement de la liste pour éviter les fuites de mémoire.
Veuillez fournir directement le code mis à jour de MainActivity.kt.
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 Présentation du résultat final

Dans les étapes précédentes, nous avons déjà terminé un Poisson de Bois Électronique qu'on peut voir et entendre. Pour le rapprocher d'une application publiable, nous utiliserons une dernière itération pour ajouter un **retour tactile** et de la **personnalisation**. Nous implémenterons deux fonctionnalités clés : premièrement, le **retour de vibration**, pour que chaque tape reçoive une réponse physique du vibreur du téléphone et améliore grandement l'immersion ; deuxièmement, le **texte personnalisé**, permettant aux utilisateurs de modifier le texte à l'écran, par exemple changer « Mérite +1 » en « Salaire +1 » ou « Problème -1 ».

Envoyez le Prompt soigneusement conçu suivant à Trae. Il gérera la logique de dialogue, la commutation d'état et l'interaction matérielle en une seule passe :

```text
Rôle : Vous êtes un expert Android Jetpack Compose.
Tâche : Veuillez ajouter un "texte personnalisé" et un "retour de vibration" à l'application Poisson de Bois Électronique existante.
Exigences :
1. Retour Haptique
Chaque fois que l'utilisateur tape le poisson de bois, en plus du son et de l'animation, appeler le retour haptique du téléphone (en utilisant LocalHapticFeedback.current) pour donner une légère réponse tactile.
2. Fonctionnalité de texte personnalisé (UI et interaction)
Point d'entrée : Ajouter une petite icône d'édition à côté du texte supérieur comme "Mérite +1" (vous pouvez utiliser Icons.Default.Edit).
Logique de dialogue : Lorsque l'icône est tapée, afficher un dialogue (Dialog/AlertDialog).
    Titre du dialogue : "Modifier le contenu"
    Saisie : Permettre à l'utilisateur d'entrer le texte qu'il veut accumuler (par défaut "Mérite")
    Choix de valeur : Sous la saisie, fournir deux options (par exemple RadioButton ou bascule) pour que l'utilisateur puisse choisir "+1" ou "-1"
    Bouton de sauvegarde : Après avoir cliqué sur sauvegarder, fermer le dialogue et appliquer les nouveaux paramètres à l'écran principal
    Rafraîchissement des données : Si l'utilisateur met à jour le contenu, réinitialiser le compteur supérieur à 0 et recommencer à compter depuis zéro
3. Mise à jour des effets
Après la sauvegarde, le texte du compteur supérieur et le texte d'animation flottant affiché lors du tapotement du poisson de bois doivent changer au format personnalisé de l'utilisateur.
    La taille du texte flottant ne doit pas dépasser la taille du texte du compteur supérieur
    Exemple : si l'utilisateur entre "Salaire" et choisit "+1", la logique du compteur supérieur devient +1 et le texte flottant devient "Salaire+1"
    Si l'utilisateur entre "Problème" et choisit "-1", la logique du compteur supérieur devient -1 et le texte flottant devient "Problème-1"
4. Exigences techniques :
Assurez-vous que le nouvel état (texte et nombre) affecte correctement l'animation.
Veuillez fournir directement le code complet mis à jour de MainActivity.kt tout en gardant la logique de son et d'animation précédente inchangée.
```

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image31.png)

# 4 Débogage sur appareil réel et peaufinage

L'émulateur est pratique, mais il ne peut pas simuler la vibration réelle du téléphone ni refléter pleinement la latence tactile réelle. Pour obtenir la « sensation » la plus précise, nous devons installer l'application sur un vrai téléphone Android. Voici deux méthodes de connexion que vous pouvez choisir :

1. **Débogage sans fil (Wi-Fi)** : aucun câble de données requis, pratique pour les vérifications quotidiennes. Mais votre ordinateur et votre téléphone doivent être sur le **même réseau Wi-Fi**.
2. **Débogage USB filaire** : plus stable et moins susceptible de se déconnecter, adapté lorsque le réseau est mauvais ou que l'installation initiale échoue.

## 4.1 Débogage sans fil

C'est la méthode la plus pratique sur Android 11 et versions ultérieures.

**Étape 1 : Préparer le téléphone**

1. Assurez-vous que le téléphone et l'ordinateur sont sur le **même Wi-Fi**.
2. Ouvrez les **Options pour les développeurs** et activez le **Débogage sans fil**.
3. Appuyez sur **Débogage sans fil** pour entrer dans les détails, puis choisissez **Associer l'appareil avec un code QR**. Votre téléphone ouvrira une vue de scanner.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image32.webp)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image33.png)

**Étape 2 : Associer sur l'ordinateur**

1. Retournez dans Android Studio, cliquez sur le sélecteur d'appareil dans la barre d'outils supérieure.
2. Choisissez **Pair Devices Using Wi-Fi** dans le menu déroulant.
3. Un code QR apparaîtra à l'écran.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image34.png)

**Étape 3 : Scanner pour se connecter**

1. Utilisez votre téléphone pour scanner le code QR sur l'écran de votre ordinateur.
2. Le téléphone et l'ordinateur devraient tous deux afficher « association réussie ».
3. À ce stade, la barre d'appareils supérieure d'Android Studio affichera automatiquement le modèle de votre téléphone (par exemple `Google Pixel 8`).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image35.png)

4. Exécutez l'application en cliquant sur ▶️ Run

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image36.webp)

## 4.2 Débogage USB filaire

Si la connexion sans fil est instable, ou si votre réseau est complexe, brancher un câble est toujours la solution la plus fiable. Bien que ce soit moins pratique, cela offre la vitesse de transfert la plus rapide et ne se déconnecte presque jamais.

### 4.2.1 Préparer le pilote USB dans Android Studio (Windows uniquement)

Les utilisateurs de Mac peuvent sauter cette étape, car macOS reconnaît généralement le téléphone directement. Les utilisateurs de Windows doivent s'assurer que l'ordinateur peut reconnaître le téléphone Android, ce qui signifie généralement installer le pilote USB de Google :

1. Dans Android Studio, cliquez sur `Tools -> SDK Manager` (ou trouvez-le sous `Settings -> Languages & Frameworks -> Android SDK`)
2. Basculez vers l'onglet **SDK Tools**
3. Cochez **Google USB Driver** et cliquez sur **Apply** pour le télécharger et l'installer

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image37.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image38.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image39.png)

### 4.2.2 Télécharger la même version du SDK que votre appareil réel

**Étape 1 : Vérifier la version Android du téléphone**

En prenant un téléphone OPPO comme exemple : ouvrez Paramètres -> À propos du téléphone -> vérifiez la version Android (dans l'exemple c'est Android 12).

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image40.png)

**Étape 2 : Télécharger cette version de la plateforme Android dans Android Studio**

1. Dans Android Studio, cliquez sur `Tools -> SDK Manager`
2. Restez dans l'onglet **SDK Platforms** par défaut
3. Sélectionnez Android 12.0 et cliquez sur Apply pour télécharger

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image41.png)

### 4.2.3 Activer le mode développeur sur le téléphone

Ouvrez les paramètres de votre téléphone, allez dans les options pour les développeurs, et activez le **Débogage USB**.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image42.webp)

### 4.2.4 Installer l'autorisation du pilote USB sur le téléphone

À ce stade, prenez votre téléphone. Il devrait afficher une boîte de dialogue de sécurité importante : « Autoriser le débogage USB ? » Assurez-vous de cocher **Toujours autoriser** puis appuyez sur **Autoriser** ou **OK**. C'est l'autorisation clé qui donne à l'ordinateur le contrôle pour le débogage.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image43.png)

### 4.2.5 Exécuter l'application sur le téléphone

1. Dans le sélecteur d'appareil supérieur d'Android Studio, vous devriez maintenant voir le modèle de votre téléphone (par exemple `OPPO-PDKM00`)
2. Cliquez sur ▶️ Run. Votre téléphone affichera la boîte de dialogue « Autoriser le débogage USB ? » ; cochez « Toujours autoriser » et confirmez
3. L'application s'installera et se lancera automatiquement

Maintenant, essayez de taper le poisson de bois sur votre téléphone et ressentez la vraie réponse du vibreur. C'est l'expérience complète du Vibe Coding.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image44.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image45.webp)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image46.png)

# 5 Emballer l'application en APK

Le code est terminé, et le test sur appareil réel fonctionne aussi. Maintenant nous devons « sortir l'application » d'Android Studio et la transformer en un fichier que vous pouvez envoyer à vos amis pour qu'ils l'installent. Ce processus s'appelle l'**emballage**. Dans le développement Android, l'emballage a deux modes complètement différents, et nous choisissons en fonction du scénario d'utilisation.

## 5.1 Emballer la version Debug (pour un partage rapide)

Si vous voulez seulement partager l'application avec des amis pour un essai rapide, ou l'envoyer sur des téléphones de test pour vérification, la **version Debug** est l'option la plus rapide. C'est comme un « brouillon » - entièrement fonctionnel, mais non signé formellement, il ne peut donc pas être soumis aux magasins d'applications.

**Les étapes sont très simples :** dans le menu supérieur d'Android Studio, trouvez `Build`, survolez `Generate App Bundles or APKs`, et cliquez sur `Generate APKs` dans le sous-menu.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image47.png)

Attendez environ 5 secondes selon la taille du projet. Dans la zone de console en bas à droite d'Android Studio, une invite apparaîtra. Cliquez sur le lien bleu `locate` et le dossier de sortie s'ouvrira automatiquement. Le fichier nommé `app-debug.apk` est le package que nous voulons.

Vous pouvez l'envoyer directement via WeChat ou QQ vers n'importe quel téléphone Android, et le destinataire peut l'installer et l'utiliser. Notez que debug n'est pas une version de release.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image48.webp)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image49-sidebar-cropped.webp)

## 5.2 Emballer la version Release

Si vous voulez publier l'application sur un magasin d'applications (comme Google Play ou Huawei AppGallery), ou éviter l'avertissement « application non sécurisée » lors de l'installation, vous devez alors emballer une **version Release**. Cette version nécessite une **signature numérique** unique, qui est comme un sceau anti-contrefaçon prouvant que vous avez développé cette application et qu'elle n'a pas été falsifiée.

> Objectif principal de la signature
>
> - Déterminer l'identité de l'éditeur : car une application avec le même nom de package peut remplacer un programme installé, la signature empêche que cela soit abusé
> - Assurer l'intégrité de l'application : le processus de signature couvre chaque fichier du package, garantissant qu'ils ne sont pas remplacés par la suite

La signature d'une application Android est comme apposer un sceau. Une fois le sceau apposé, l'application et le développeur sont liés : l'application est à vous, et vous en êtes responsable. Les autres ne peuvent pas se faire passer pour vous, et vous ne pouvez pas vous faire passer pour les autres.

**Étape 1 : Démarrer l'assistant de signature**

Dans le menu supérieur, sélectionnez `Build`, puis cliquez sur `Generate Signed Bundle / APK`. Dans la fenêtre popup, vous ferez face à deux choix :

- Android App Bundle (`.aab`) : requis par Google Play, plus petit en taille, mais ne peut pas être installé directement sur un téléphone
- APK : package d'installation standard, peut être installé directement
_Pour la démonstration, nous choisissons d'abord APK et cliquons sur Next._

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**Étape 2 : Créer une clé numérique (KeyStore)**

C'est ici que les débutants bloquent le plus souvent. Comme c'est votre premier emballage de release, vous devez créer un nouveau **keystore**. Cliquez sur **Create new** sous `Key store path`.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image52.png)

Dans la fenêtre popup, remplissez les informations requises, similaires à l'enregistrement d'un compte. Nous recommandons fortement que le mot de passe du keystore et le mot de passe de l'alias de clé soient **les mêmes**, et que vous **les notiez soigneusement**. Si vous perdez ce mot de passe, votre application ne pourra plus jamais être mise à jour à l'avenir.

Après avoir terminé, cliquez sur OK. Vous retournerez à l'écran précédent, et les informations de clé que vous venez de remplir seront déjà automatiquement renseignées.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**Étape 3 : Générer le package formel**

Cliquez sur Next, choisissez **release** sous Build Variants, et enfin cliquez sur **Create**.

Après une courte attente, Android Studio affichera à nouveau une invite de succès « Generate Signed APK » dans le coin inférieur droit. Cliquez sur **locate**, et cette fois vous verrez le package formel signé numériquement dans le dossier (généralement nommé `app-release.apk`). Ce fichier est le produit final que vous livrez en tant que développeur.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 Publication officielle sur les magasins / marchés d'applications

Lorsque le développement de votre application est terminé et que le package Release est prêt, l'étape suivante est de la publier pour que davantage de personnes puissent la télécharger et l'utiliser. Actuellement, les principaux canaux de distribution se divisent en deux catégories : **les magasins d'applications Android nationaux** et **les magasins d'applications étrangers (Google Play)**.

## 6.1 Publier sur les marchés nationaux

L'écosystème Android en Chine continentale est particulier. Il n'y a pas de magasin officiel unique (car Google Play n'est pas directement accessible). Au lieu de cela, le marché est divisé entre **les magasins d'applications des fabricants de téléphones** et **les plateformes tierces**. Les principaux **magasins de fabricants** incluent Huawei, Xiaomi, OPPO, vivo, Meizu, Samsung, etc. Comme ils sont préinstallés sur les appareils, ils ont le plus grand trafic. Les principales **plateformes tierces** incluent Tencent MyApp et 360 Mobile Assistant.

### 6.1.1 La difficulté principale : le « barrage » pour les développeurs individuels

Avant d'enregistrer un compte, il y a une chose très importante que vous devez savoir : **les marchés d'applications nationaux sont très stricts avec les développeurs individuels**.

Actuellement, presque tous les grands magasins d'applications nationaux (Huawei, Xiaomi, OV, MyApp, etc.) **exigent** un *Certificat d'enregistrement des droits d'auteur logiciels* pour la soumission.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image58.png)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image59.png)

- **Qu'est-ce que c'est ?** C'est un document juridique prouvant que l'application vous appartient.
- **Coût pour l'obtenir** : vous devez faire une demande auprès du bureau des droits d'auteur. Le faire vous-même prend généralement 2 à 3 mois ; utiliser une agence pour un traitement plus rapide peut coûter de plusieurs centaines à plus de mille RMB.
- **Réalité actuelle** : sans ce certificat, votre application échouera très probablement à la révision, ou vous pourriez ne pas même pouvoir créer l'entrée de l'application. De plus, des catégories comme les actualités, la finance et la santé peuvent aussi nécessiter un enregistrement ICP ou d'autres qualifications.

Donc si votre application est juste un projet de pratique personnelle ou un petit outil, et que vous ne voulez pas passer du temps et de l'argent à demander ce certificat, je vous suggère de passer directement à la Section 6.2 et d'envisager Google Play à la place, ou simplement de partager le fichier APK directement avec vos amis.

### 6.1.2 Enregistrer un compte développeur

Si vous avez déjà préparé les qualifications requises, ou avez décidé de publier sur les marchés nationaux, la première étape est l'enregistrement d'un compte. Le processus est similaire sur toutes les grandes plateformes, nécessitant généralement une vérification d'identité pour les individus ou une vérification de licence commerciale pour les entreprises.

Voici les URL des plateformes développeurs pour les principaux marchés d'applications :

Tencent Open Platform : https://open.tencent.com/

360 Open Platform : http://dev.360.cn

Baidu Developer Platform : http://app.baidu.com

Xiaomi Open Platform : https://dev.mi.com

Huawei Developer Alliance : http://developer.huawei.com/consumer/cn

Alibaba Developer Platform : http://open.uc.cn
La distribution Alibaba intègre Wandoujia, Ali Jiuyou, PP Assistant, UC App Store, Shenma Search et YunOS App Store. Vous n'avez besoin d'enregistrer qu'un seul compte développeur Alibaba.

Samsung Developer Platform : http://support-cn.samsung.com/App/DeveloperChina/Home/Index

OPPO Developer Alliance : http://open.oppomobile.com

vivo Developer Alliance : https://dev.vivo.com.cn

Lenovo Open Platform : http://open.lenovo.com

Meizu Developer Alliance : http://open.flyme.cn

Gionee Developer Alliance : https://open.appgionee.com

**En prenant Tencent MyApp comme exemple :** visitez la plateforme ouverte Tencent et cliquez sur s'inscrire. Il est recommandé de vous connecter directement avec un compte QQ. Notez qu'une fois un compte QQ lié, il est difficile de le dissocier, il vaut donc mieux utiliser un compte QQ professionnel dédié. Suivez les instructions, choisissez « Développeur individuel » ou « Développeur entreprise », téléchargez vos photos d'identité et complétez la vérification faciale. Après avoir passé la vérification, cliquez sur **Créer une application** pour commencer.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image60.webp)![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image61.png)

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image62.png)

### 6.1.3 Processus de soumission et matériaux requis

Une fois la révision du compte approuvée, vous pouvez créer l'application et la soumettre pour révision. Vous devez préparer le « kit de quatre pièces » suivant :

1. **Package d'installation** : l'**APK Release** emballé au Chapitre 5
2. **Informations textuelles** :
3. **Nom de l'application** : ne doit pas contenir de mots sensibles
4. **Introduction en une ligne** : en moins de 20 caractères chinois, simple et direct (par exemple : « Une application relaxante de poisson de bois électronique »)
5. **Description détaillée** : 200+ caractères chinois présentant les fonctions et scénarios d'utilisation de l'application
6. **Matériaux visuels** :
7. **Icône de l'application** : PNG haute définition, généralement 512x512
8. **Captures d'écran de l'application** : préparez 4-5 captures d'écran claires de l'application en cours d'utilisation, couvrant de préférence les pages principales, généralement dans une taille cohérente comme 1080x1920
9. **Document de qualification** : téléchargez une copie numérisée de votre Certificat d'enregistrement des droits d'auteur logiciels

**Soumission et révision :** après avoir rempli toutes les informations et téléchargé l'APK, cliquez sur **Soumettre pour révision**. Le cycle de révision est généralement de 1 à 3 jours ouvrables. Pendant cette période, faites attention aux e-mails ou SMS. Les évaluateurs peuvent rejeter la soumission parce que les captures d'écran ne sont pas claires, les descriptions ne sont pas standardisées, ou des qualifications requises manquent. Dans ce cas, vous révisez selon le feedback et soumettez à nouveau.

## 6.2 Publier sur le marché étranger (Google Play)

Si vous ne voulez pas gérer la complexité des certificats de droits d'auteur logiciels et des enregistrements dans les magasins d'applications nationaux, ou si votre public cible est mondial, Google Play est le meilleur choix pour les développeurs individuels.

### 6.2.1 Préparation

- **Compte Google** : un simple compte Gmail suffit
- **Frais d'enregistrement de 25 $** : c'est des **frais uniques à vie**, et nécessite une carte de crédit prenant en charge les paiements en USD (Visa / Mastercard)
- **Accès réseau fiable** : vous devez pouvoir accéder à Google Play Console sans problème
- **Package d'installation formel** : notez que Google Play exige le format **.aab** (Android App Bundle), pas l'APK. Dans Android Studio, choisissez Android App Bundle lors de l'emballage. Les étapes sont presque identiques à l'emballage APK.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Processus de publication sur Google Play Console (Aperçu)

Comme l'enregistrement et le paiement Google Play ont encore quelques barrières à l'entrée (comme la nécessité d'une carte de crédit étrangère), ce tutoriel ne fournit pas actuellement de captures d'écran étape par étape. Mais voici le processus courant en quatre étapes :

**Étape 1 : Créer une application et entrer dans la console**

Cliquez sur `Create app`, remplissez le nom de l'application (`Electronic Wooden Fish`), choisissez l'anglais comme langue, choisissez App et Free comme type d'application, puis cochez l'accord. Après cela, vous aurez accès au backend.

**Étape 2 : Décorer la page du magasin**

C'est la première impression de l'utilisateur. Vous devez télécharger l'**icône** de l'application préparée (512x512) et un **graphique de présentation** (1024x500). Quant à la description en anglais, vous pouvez simplement demander à Trae : **« Veuillez m'aider à écrire une description en anglais pour publier le Poisson de Bois Électronique sur Google Play, dans un ton léger et relaxant. »** L'IA l'écrit généralement de manière plus naturelle qu'une traduction directe.

**Étape 3 : Politique de confidentialité et classification du contenu**

- Politique de confidentialité : cherchez « App Privacy Policy Generator » et générez un lien gratuit à coller
- Classification du contenu : remplissez un simple questionnaire (par exemple, s'il y a de la violence ou des jeux d'argent). Le Poisson de Bois Électronique obtient généralement une classification générale 3+.

**Étape 4 : Télécharger et publier**

Sous le menu `Production`, cliquez sur `Create new release`, téléchargez votre fichier `.aab`, enregistrez et soumettez pour révision. La révision Google Play est généralement rapide (1 à 3 jours). Une fois approuvée, votre application peut être téléchargée dans le monde entier.

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image64.webp)

_Si vous avez déjà terminé l'enregistrement de votre compte développeur, ce tutoriel vidéo peut vous guider à travers le reste du processus :_ [Flux de travail complet : télécharger une application Android sur Google Play](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 Remarques finales

Cela nous amène à la fin du tutoriel. En regardant le Poisson de Bois Électronique que vous avez personnellement créé sur votre téléphone, je me demande comment vous vous sentez maintenant.

En tant que personne formée en ingénierie logicielle, je suis en réalité assez ému dans cette ère de l'IA en développement rapide. Dans le passé, nous travaillions à travers d'épais livres de programmation, apprenions une syntaxe complexe, luttions avec la configuration de l'environnement et passions la moitié de notre journée à combattre des messages d'erreur rouges. Mais les temps ont changé, et maintenant nous apprenons de plus en plus comment diriger l'IA.

À travers cette pratique de Vibe Coding, vous avez déjà expérimenté le processus complet de développement d'applications Android. La barrière technique est effectivement en train de baisser. Nous n'avons plus besoin de triturons du code sec tout le temps, et pouvons consacrer plus d'énergie à décider **quoi construire**. Mais peu importe la puissance des outils, ils restent seulement des outils. Ne laissez pas cette application prendre la poussière sur votre téléphone. Continuez à la bidouiller, cassez-la et réparez-la à nouveau. Ce n'est que lorsque vous commencez à avoir vos propres idées et à les réaliser que vous franchissez vraiment le cap.

Si ce tutoriel vous a aidé à ressentir que « construire une application n'est en fait pas si difficile », alors je suis honoré d'avoir aidé à amener un nouveau créateur de la nouvelle génération dans le monde du développement.

J'ai vraiment hâte de voir votre prochaine création. Continuez !

![](../../../../zh-cn/stage-3/cross-platform/android-app/images/image65.webp)

**_J'espère que vous vous amuserez dans le monde du développement Android !_**

# Références

CSDN : [Comment emballer/construire un projet Android Studio (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%20%E6%89%93%E5%8C%85%20APK%20%E5%B9%B6%E5%88%86%E4%BA%AB&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN : [Installation et configuration d'Android Studio](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)
