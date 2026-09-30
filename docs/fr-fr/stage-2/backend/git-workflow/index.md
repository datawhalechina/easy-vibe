# Flux de travail Git et GitHub

Dans les cours précédents, nous avons appris à écrire du code en utilisant des outils de vibe coding basés sur le web. Chaque conversation crée une nouvelle version du code. Mais réfléchissons à une question : si nous voulons revenir à une modification précédente, existe-t-il une méthode pratique ? Y a-t-il un outil capable d'enregistrer notre code à différents stades, nous permettant de basculer et de modifier librement entre les versions ?

Pour répondre à ce besoin, les logiciels de contrôle de version sont apparus. Dans cet article, nous présenterons le programme de contrôle de version le plus célèbre — Git — ainsi que la meilleure plateforme d'hébergement de code — GitHub. Nous apprendrons à utiliser Git pour la gestion de code, comment récupérer le code d'autres personnes depuis GitHub, comment télécharger notre propre code, et comment collaborer avec d'autres sur des projets d'envergure.

Que ce soit pour le suivi de versions de projets personnels, la synchronisation de code dans la collaboration en équipe, ou la contribution à la communauté open source, Git et GitHub sont des outils indispensables pour les développeurs modernes. En les maîtrisant, vous serez capable de gérer votre code plus efficacement, de créer des points de contrôle selon vos besoins, de naviguer librement entre les différentes étapes du code, et de traiter facilement tout, de la modification d'un seul fichier au développement de projets d'envergure — rendant chaque itération de code contrôlable et traçable.

> 💡 **Prérequis**
> 
> Avant d'apprendre Git, il est recommandé de connaître les concepts suivants :
> - [Qu'est-ce que le terminal/la ligne de commande](/fr-fr/appendix/2-development-tools/command-line-shell) - Apprendre à interagir avec l'ordinateur via la ligne de commande
> - [Qu'est-ce que Git](/fr-fr/appendix/2-development-tools/git-version-control) - Comprendre les concepts clés du système de contrôle de version Git
>
> Cet article se concentrera sur le flux de travail GitHub et les opérations pratiques. Les connaissances de base mentionnées ci-dessus sont disponibles via les liens de l'annexe.

# Démarrage rapide avec Git

Avant de commencer à utiliser Git, assurez-vous d'avoir lu le contenu de l'annexe sur la [ligne de commande](/fr-fr/appendix/2-development-tools/command-line-shell) et les [bases de Git](/fr-fr/appendix/2-development-tools/git-version-control). Cet article suppose que vous possédez déjà ces connaissances de base et abordera directement l'installation, la configuration de Git et l'utilisation de GitHub pour la collaboration.

## Comment installer Git

Nous démontrerons trois méthodes d'installation de Git sur différents systèmes d'exploitation. Veuillez suivre les instructions correspondant à votre version du système :

### Windows

1. Allez sur la [page de téléchargement officielle de Git](https://git-scm.com/download/win) et téléchargez le programme d'installation adapté à votre système : [Installateur](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe). Par défaut, l'installateur x64 est recommandé.
2. Double-cliquez sur le programme d'installation et suivez les instructions de l'assistant d'installation :
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. Il est recommandé de conserver les options par défaut. Si vous souhaitez personnaliser, notez les points suivants (dans la plupart des cas, vous pouvez simplement cliquer sur « Next ») :
      - Choisir l'éditeur par défaut utilisé par Git : sélectionnez votre éditeur préféré (comme VS Code). Vous pouvez garder le premier choix par défaut, Vim (un éditeur de texte), ou choisir l'option « Visual Studio Code as Git's default editor » (nécessite l'installation préalable de VS Code). Vous pouvez garder la sélection par défaut et cliquer « Next » pour continuer.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Choisir comment utiliser Git : ces trois options contrôlent l'accessibilité de Git sur le système. L'option 2 est recommandée (« from command line and 3rd-party software ») — elle ajoute les outils Git de base au PATH, vous permettant d'utiliser Git dans Git Bash, l'invite de commandes, PowerShell et les IDE, sans surcharger le système.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. Après l'installation, faites un clic droit sur le bureau. Si vous voyez « Git Bash Here » dans le menu, l'installation a réussi.

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

Pour macOS, vous pouvez d'abord taper `git --version` dans le terminal pour vérifier si Git est déjà installé. Si ce n'est pas le cas, le système vous invitera à l'installer — suivez simplement les instructions.

1. Méthode 1 : Installation via Homebrew
   Si vous avez installé [Homebrew](https://brew.sh/) (le gestionnaire de paquets Mac), ouvrez le terminal et tapez
   ```bash
   brew install git
   ```
2. Méthode 2 : (Recommandée) Installation via Xcode : https://developer.apple.com/xcode/ , Xcode inclut Git. Après l'installation, suivez simplement les instructions.

### Linux

La plupart des distributions Linux peuvent installer Git via leur gestionnaire de paquets :

- Ubuntu/Debian :

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL :

```bash
sudo yum install git
```

- Vérification de l'installation : tapez `git --version` dans le terminal. Si le numéro de version s'affiche, l'installation a réussi.

## Initialisation de Git

Après avoir installé Git, vous devez d'abord configurer vos informations utilisateur — c'est l'étape fondamentale pour utiliser le contrôle de version Git. Exécutez les commandes suivantes dans le terminal (remplacez le contenu entre crochets par vos propres informations) :

```bash
# Définir le nom d'utilisateur global (apparaîtra dans les enregistrements de commit)
git config --global user.name "Your Name"

# Définir l'e-mail global (il est recommandé d'utiliser l'e-mail enregistré sur GitHub/GitLab)
git config --global user.email "your.email@example.com"
```

Git intègrera ces informations dans chaque enregistrement de commit, comme « informations d'auteur » de chaque modification. Lorsque vous consultez l'historique des versions (par exemple avec `git log`), vous pouvez clairement voir qui a modifié chaque ligne de code, facilitant la traçabilité des responsabilités et la communication. Dans les projets collaboratifs, des informations d'identité unifiées permettent aux membres de l'équipe d'identifier rapidement qui a effectué quelles modifications, améliorant l'efficacité de collaboration (par exemple, trouver le développeur concerné via les enregistrements de commit pour discuter d'un problème).

Vous pouvez vérifier vos informations de configuration Git actuelles en tapant `git config --list` dans la ligne de commande, pour confirmer que la configuration a réussi.

# Qu'est-ce que GitHub

GitHub est une plateforme d'hébergement de code basée sur Git. Elle offre non seulement un stockage distant pour les dépôts Git, mais inclut également des outils de collaboration (comme Issues, Pull Requests, Projects) qui facilitent le partage de code et la collaboration entre développeurs. En bref, Git est un outil de contrôle de version local, tandis que GitHub est un « cloud de dépôts de code + communauté de collaboration » distant.

GitHub n'est pas seulement la plus grande plateforme d'hébergement de code au monde, c'est aussi la communauté open source la plus active et la plus influente au niveau mondial. L'idée centrale de l'« open source » est que n'importe qui peut télécharger et exécuter le code source du logiciel. Ce modèle permet à des personnes du monde entier d'examiner le code des autres, de le modifier ou de créer de nouveaux projets à partir de celui-ci. Par exemple, vous pouvez trouver sur GitHub toutes sortes de tutoriels d'apprentissage ainsi que le code source complet de frameworks d'entraînement de modèles GPT (comme PyTorch). Chaque jour, d'innombrables personnes collaborent à l'échelle mondiale pour examiner et améliorer le code.

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

De nombreuses grandes entreprises publient en open source leurs programmes ou tutoriels sur GitHub pour obtenir un avantage concurrentiel dans l'industrie — ce qui peut aussi être vu comme une forme de publicité. Dans la communauté GitHub, le nombre d'« étoiles (stars) » obtenues par un projet est l'indicateur principal de sa valeur ; plus un projet ou une organisation possède d'étoiles, plus sa crédibilité et son influence sont grandes.

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

Dans notre cours, les ressources de support et les devoirs seront également téléchargés sur un dépôt GitHub dédié. À travers le processus de soumission des devoirs, vous vous familiariserez progressivement avec l'utilisation de GitHub, posant ainsi des bases solides pour le contrôle de version dans le développement futur d'applications.

## Créer un compte GitHub

1. Visitez le [site officiel de GitHub](https://github.com/) et cliquez sur « Sign up » en haut à droite.
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. Entrez votre adresse e-mail (il est recommandé d'utiliser une adresse courante, car les vérifications et notifications y seront envoyées), définissez un mot de passe (doit contenir des lettres, des chiffres et des caractères spéciaux).
3. Complétez la vérification humaine, vérifiez votre e-mail selon les instructions, et votre compte sera créé.

## Créer votre premier dépôt sur GitHub

Ensuite, nous allons créer notre premier dossier de stockage, aussi appelé dépôt ou « repo ».

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name : le nom du dépôt visible par les autres.
2. Description : une description détaillée du dépôt.
3. Choose visibility : pour un dépôt personnel, si vous le définissez comme privé, seuls vous et les personnes spécialement invitées pouvez le voir. Si vous le définissez comme public, tout le monde peut le voir.
   Pour les dépôts d'organisation, si c'est Privé, seuls les membres de l'organisation peuvent le voir.
   Si c'est Public, les personnes extérieures à l'organisation peuvent également le voir.
4. README : il est d'usage que chaque dépôt possède un fichier README. Vous pouvez le considérer comme la présentation complète du dépôt, incluant les instructions d'utilisation, la liste des fichiers et les méthodes de fonctionnement.
5. Add .gitignore and license :
   1. Le fichier .gitignore indique à Git d'ignorer certains dossiers ou fichiers lors du téléchargement vers GitHub, ils ne seront donc pas suivis ni ajoutés à la zone de staging. Cela est utile pour les fichiers de test temporaires, les packages de dépendances ou les fichiers volumineux. Une fois spécifiés, ces fichiers ne seront plus suivis.
   2. License fait référence au type de licence open source que vous choisissez. Différentes licences détaillent si d'autres personnes peuvent utiliser votre code à des fins commerciales, et incluent d'autres clauses et conditions.

Il est recommandé de cocher « Add README », de définir la visibilité du dépôt sur « Private », de remplir le nom et la description du dépôt selon vos préférences, puis de cliquer sur « Create repository » pour terminer la création de votre premier dépôt distant.

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

Vous disposerez ensuite d'un dépôt propre sans fichiers supplémentaires. Vous pouvez maintenant commencer à télécharger des fichiers.

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

La commande pour obtenir le dépôt est `git clone`, mais elle nécessite l'adresse du dépôt. Vous pouvez trouver cette adresse en cliquant sur le bouton vert « Code », où vous verrez les options HTTPS et SSH. En général, vous pouvez utiliser l'une ou l'autre méthode pour télécharger le dépôt sur votre machine locale (c'est la seule façon de modifier et de télécharger des fichiers).

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

En règle générale, le clonage via HTTP est adapté au téléchargement temporaire et au test des dépôts d'autres personnes, mais n'est pas recommandé pour votre propre développement. Pour une meilleure expérience d'apprentissage, vous devriez d'abord configurer l'authentification SSH.

## Lier le SSH local

Dans GitHub, la « liaison du protocole SSH » signifie essentiellement associer la clé publique SSH de votre appareil local à votre compte GitHub, permettant à GitHub d'identifier votre appareil via le protocole SSH. Cela vous permet d'opérer de manière sécurisée sur les dépôts distants (cloner, pousser ou tirer du code) sans avoir besoin de mot de passe.

En termes simples : c'est comme donner à votre appareil un « badge d'accès GitHub dédié ». Une fois lié, lorsque votre appareil accède aux dépôts GitHub via le protocole SSH, GitHub vérifie ce « badge d'accès » (votre clé publique SSH). Une fois confirmé comme appareil autorisé, vous pouvez opérer directement — sans avoir à saisir votre nom d'utilisateur et votre mot de passe à chaque fois.

> 💡 Qu'est-ce que SSH

### Pourquoi la liaison du protocole SSH est-elle nécessaire ?

GitHub prend en charge deux principaux protocoles d'opération des dépôts : le protocole HTTPS et le protocole SSH :

- Protocole HTTPS : chaque opération (comme push) nécessite de saisir le nom d'utilisateur et le mot de passe GitHub (ou un Personal Access Token PAT). Le processus de vérification est fastidieux et comporte un risque de fuite de mot de passe.
- Protocole SSH : l'authentification est effectuée via une « paire de clés », il n'est donc pas nécessaire de saisir le mot de passe à plusieurs reprises, et la transmission chiffrée est plus sécurisée.

La « liaison du protocole SSH » est une étape préalable à l'activation de l'authentification SSH GitHub — ce n'est qu'après avoir « lié » votre clé publique SSH locale à votre compte GitHub que GitHub pourra identifier votre appareil et autoriser les opérations SSH sur les dépôts.

### Logique centrale de la « liaison » : le rôle de la paire de clés SSH

L'authentification SSH repose sur une paire de clés (clé publique + clé privée), qui sont des fichiers chiffrés correspondants. Après les avoir générées, vous devez fournir la « clé publique » à GitHub (la « liaison »), tandis que la « clé privée » reste sur votre appareil local :

1. Clé privée : stockée dans un répertoire spécifié de votre appareil local (généralement ~/.ssh/), agissant comme « votre clé personnelle » — à ne jamais partager avec qui que ce soit.
2. Clé publique : c'est une « serrure » partageable publiquement — vous devez la copier dans la « liste des clés SSH » de votre compte GitHub (l'opération de « liaison »).

Lorsque vous opérez sur un dépôt GitHub via SSH (par exemple `git push git@github.com:xxx/xxx.git`) :

- Votre appareil local utilise la clé privée pour chiffrer la « requête d'opération » et l'envoie à GitHub ;
- Après réception de la requête, GitHub tente de la déchiffrer avec la clé publique que vous avez précédemment liée ;
- Si le déchiffrement réussit, votre appareil est confirmé comme autorisé et l'opération est permise ; sinon, l'accès est refusé.

### Étapes spécifiques de la « liaison » (flux principal)

Une fois que vous avez compris le principe, l'opération pratique est simple — le cœur est « générer une paire de clés → télécharger la clé publique sur GitHub » :

1. Générer une paire de clés SSH localement
   1. Utiliser Trae pour obtenir la clé publique (recommandé)
      Prompt : `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   Après avoir entré le prompt, vous devez également appuyer sur la touche Entrée dans le terminal de gauche, sinon la commande restera en attente sans s'exécuter. Comme Trae ne peut pas exécuter de jugements conditionnels pour vous, il suffit d'appuyer sur Entrée jusqu'à ce que le processus se termine.

   Enfin, vous verrez que Trae à droite a renvoyé la clé publique qu'il a lue. Il vous suffit de la copier et de vous préparer à la coller à l'étape suivante.

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. Obtenir manuellement la clé publique
   Ouvrez votre terminal local (Git Bash ou PowerShell sur Windows ; Terminal sur macOS/Linux) et entrez la commande suivante (remplacez your_email@example.com par l'e-mail utilisé pour votre inscription GitHub) :

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Appuyez sur Entrée pour accepter les valeurs par défaut (chemin de fichier par défaut, sans phrase de passe, ou définissez-en une si nécessaire). Cela générera deux fichiers dans le répertoire ~/.ssh/ :
      - id_ed25519 : clé privée (stockée localement, **à ne jamais partager**) ;
      - id_ed25519.pub : clé publique (à télécharger sur GitHub).

2. « Lier » la clé publique à votre compte GitHub

C'est l'étape centrale de la liaison — ajouter la clé publique locale à la « liste des clés SSH » de votre compte GitHub :

1. Copier le contenu de la clé publique :
   1. Via Trae :
   2. Windows : ouvrez C:\Users\<your>\.ssh\id_ed25519.pub avec le Bloc-notes et copiez tout son contenu ;
   3. macOS/Linux : exécutez `cat ~/.ssh/id_ed25519.pub` dans le terminal et copiez toute la sortie (depuis le début SSH-ed25519 jusqu'à l'e-mail à la fin).
2. Connectez-vous à GitHub et accédez à la page « SSH Key Management » :
   1. Cliquez sur l'avatar en haut à droite → Settings → menu latéral SSH and GPG keys → cliquez sur New SSH key.
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. Saisissez n'importe quel titre (par exemple, SSH de votre ordinateur local), puis collez la clé publique SSH que vous venez d'obtenir.

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. Vérifier que la liaison a réussi

Tapez la commande suivante dans le terminal (**Trae peut également effectuer les opérations suivantes**) pour tester si GitHub peut identifier votre appareil :

```bash
ssh -T git@github.com
```

- Si vous voyez un message du type « Hi [votre nom d'utilisateur GitHub] ! You've successfully authenticated... », cela signifie que votre clé a été liée avec succès ;
- Si vous rencontrez une erreur, c'est généralement parce que la clé publique a été copiée de manière incomplète, que les permissions de la clé privée sont trop larges (votre répertoire ~/.ssh/ local ne doit être accessible qu'en lecture/écriture pour vous), etc. Vérifiez ces points si nécessaire.

### Remarques importantes

Si vous avez plusieurs appareils (comme un ordinateur portable et un ordinateur de bureau), vous devez générer une paire de clés SSH distincte pour chaque appareil et lier chaque clé publique au même compte GitHub — chaque appareil a son propre « badge d'accès ».

Ne partagez jamais votre clé privée (ne la téléchargez pas sur GitHub et ne la partagez pas avec d'autres), sinon quelqu'un pourrait se faire passer pour vous et opérer sur vos dépôts. Si la clé privée est compromise, supprimez immédiatement la clé publique correspondante de GitHub et générez une nouvelle paire de clés.

Après avoir lié SSH, utilisez les adresses de dépôt au format SSH (par exemple `git@github.com:username/repository.git`) pour vos opérations, et non le format HTTPS (par exemple `https://github.com/username/repository.git`). Si vous avez précédemment cloné le dépôt via HTTPS, vous pouvez changer de protocole avec `git remote set-url origin <new>`.

# Utiliser Trae pour les opérations GitHub

Nous avons expliqué ce qu'est Git, ce qu'est GitHub, ce qu'est SSH et comment le configurer. Vous pouvez maintenant utiliser librement Trae pour effectuer des opérations Git. Commençons par apprendre à cloner un dépôt distant sur votre machine locale.

## Git clone : télécharger un dépôt existant

Vous pouvez directement lui indiquer l'adresse du dépôt que vous souhaitez cloner

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull : récupérer les mises à jour du dépôt distant

Avant chaque mise à jour du dépôt, comme il peut être maintenu par plusieurs personnes, vous devez d'abord tirer les dernières modifications. Ensuite, vous pouvez modifier et pousser les fichiers.

**N'oubliez pas d'inclure le nom du dossier et son chemin relatif ou absolu, pour éviter de pousser vers le mauvais dépôt.**

prompt : `Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push : staging des mises à jour et push vers GitHub

Une fois que tout est prêt, vous pouvez essayer de modifier les fichiers locaux, d'ajouter ou de supprimer des éléments dans le dossier. Ensuite, demandez à Trae de détecter les modifications et de vous aider à les pousser vers GitHub.

prompt : `I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

Le push a réussi. Vous pouvez maintenant voir le contenu mis à jour sur GitHub.

# Ressources de référence

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
