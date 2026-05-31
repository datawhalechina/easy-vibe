# Comment creer votre propre site personnel et blog academique - Deploiement statique avec GitHub Pages

# 1. Qu'est-ce qu'un site personnel et un blog academique ?

Dans ce tutoriel, nous allons parcourir une boucle complete : **de la recherche d'un modele de site web existant, a sa modification en une page personnelle pour Elon Musk, et enfin sa publication en ligne gratuitement**.

Pour ce tutoriel, vous devez au minimum disposer de :

* **Un ordinateur** (Windows ou Mac)
* **Votre compte GitHub** (utilise pour stocker le code du site et fournir un hebergement gratuit)
* **Trae installe** (votre partenaire de codage IA)
* **Un environnement Git**
* **Un environnement Ruby**

## 1.1 Qu'est-ce qu'une page personnelle academique ?

Une **page personnelle academique** est votre propre territoire prive sur Internet.

Contrairement aux Moments WeChat, Zhihu ou LinkedIn, elle ne depend d'aucun algorithme de recommandation de plateforme, et elle ne disparaitra pas si une plateforme ferme. C'est un **espace de vitrine personnelle** a long terme et stable qui peut etre indexe par Google et Google Scholar. Elle contient generalement votre biographie, vos publications, vos projets et votre blog technique.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 Pourquoi creer votre propre site ?

Dans le modele de developpement Vibe Coding, nous n'avons plus besoin de travailler a travers d'epais manuels HTML/CSS comme les gens le faisaient il y a dix ans. Avec l'IA, le role de la construction d'un site passe de "codeur en difficulte" a "redacteur en chef du site" :

1. **Vous (Redacteur / Chef de projet)** : decidez du ton et du contenu du site. Par exemple : "Mettez la PPT de colonisation de Mars de Musk ici" ou "Changez ce bouton en rouge Tesla."
2. **Trae (Ingenieur IA)** : gere le travail d'implementation difficile. Il transforme vos instructions en langage naturel en code, y compris la mise en page, les schemas de couleurs et l'adaptation mobile.
3. **GitHub Pages (Showroom)** : fournit un serveur et un domaine gratuits pour que les gens du monde entier puissent voir votre travail.

**Pourquoi cela vaut-il la peine pour les universitaires ou les techniciens ?**

* **A l'externe (construction de l'influence)** : c'est une **"carte de visite perenne."** Lors de candidatures pour des programmes de doctorat, des emplois ou des collaborations, une page personnelle soignee est souvent beaucoup plus persuasive qu'un CV en PDF.
* **A l'interne (accumulation de connaissances)** : c'est votre **"second cerveau."** Vous pouvez l'utiliser pour enregistrer des notes de cours, des reflexions techniques et construire votre propre systeme de connaissances.
* **Pour l'avenir (etre decouvrable)** : les moteurs de recherche aiment le contenu structure. Avec une page personnelle, quand les gens recherchent votre nom, **le contenu que vous definissez** peut apparaitre en premier, au lieu de personnes sans rapport portant le meme nom.

## 1.3 Quatre methodes typiques pour creer un site personnel

En pratique, il existe d'innombrables facons de creer un site. Nous presentons ici uniquement les quatre plus repandues :

**Methode 1 : ecriture manuelle a partir de zero avec HTML / CSS / JS**
C'est la voie traditionnelle de l'informatique. Vous ecrivez le code caractere par caractere. L'avantage est une flexibilite extreme. L'inconvenient est une barriere d'entree tres elevee, et il est facile de rester bloque en ajustant le CSS. Ce n'est pas ideal pour ceux d'entre nous qui veulent se concentrer sur le contenu.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**Methode 2 : constructeurs de sites visuels tels que Wix / WordPress**
C'est comme construire avec des blocs. L'avantage est l'edition glisser-deposer facile. L'inconvenient est qu'il faut souvent payer, que le code genere tend a etre volumineux, que ca manque de cote geek academique, et que la personnalisation profonde est difficile.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**Methode 3 : modeles bases sur GitHub (Generateurs de sites statiques)**
C'est la route **la plus recommandee** dans les communautes academiques et geeks. Nous forkons directement un modele mature ecrit par d'autres, comme un modele base sur Jekyll ou Hugo, puis nous modifions uniquement les fichiers de configuration et le contenu.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**Methode 4 : Vibe Coding (flux de generation visuelle par IA)**
Avec des agents IA ayant une forte comprehension visuelle multimodale, il suffit de voir un style de site que vous aimez en ligne, de faire une capture d'ecran et de dire a l'IA : "Ecrivez-moi une page web basee sur ce style." L'IA peut alors analyser les elements visuels et generer le code sous-jacent pour vous.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**Le choix dans ce tutoriel : GitHub Pages + modele academique + modifications par IA.**
La raison est simple :

* **Cout zero** : pas besoin d'acheter un serveur, pas besoin d'acheter un domaine.
* **Haute qualite** : les modeles sont souvent concus par des developpeurs de premier plan, avec un style minimal, une structure professionnelle et un chargement rapide.
* **Facile a maintenir** : vous ecrivez principalement en Markdown, similaire a ecrire dans Feishu Docs ou Notion, et l'IA aide a generer la page web.

## 1.4 La feuille de route complete de ce tutoriel

Pour rendre le processus de configuration plus intuitif et moins ennuyeux, nous utiliserons un cas amusant : **construire une page personnelle academique pour Musk**.

Bien qu'Elon Musk ne soit pas professeur d'universite, il a publie de nombreux "livres blancs techniques" publics, comme *Hyperloop Alpha*, et a aussi de nombreux projets celebres, comme SpaceX et Tesla. Nous utiliserons ces materiaux comme donnees de test et, avec le flux de travail Vibe Coding de Trae, parcourrons une route de construction de site reutilisable :

1. **Trouver le squelette** : localiser un modele de site web de haute qualite sur GitHub et le forker dans votre propre depot.
2. **Preparer l'environnement** : recuperer le code localement et configurer Trae pour que l'IA puisse lire votre projet.
3. **Iterer avec l'IA** : remplacer la personne fictive du modele par Elon Musk, telecharger son CV, changer la "liste des publications" en "vitrine de livres blancs techniques," et meme demander a l'IA de recolorer le site en "rouge Mars."
4. **Deployer en ligne** : pousser le code modifie vers GitHub et obtenir instantanement une URL de site web accessible.

Cette section est uniquement responsable de brosser le tableau d'ensemble. Pour l'instant, retenez simplement la ligne principale :
**Forker le modele -> renovation par IA -> pousser en ligne**
Dans les sections suivantes, nous parcourrons chaque etape ensemble.

# 2. Preparation de l'environnement

## 2.1 Outils utilises dans ce tutoriel

L'ensemble du processus de construction utilise quatre outils ou ressources, chacun jouant le role de designer, d'entrepreneur, de proprietaire foncier ou de systeme logistique.

* **Un ordinateur** : Windows ou Mac convient. Contrairement au developpement Android qui a souvent des exigences de memoire elevees, le developpement web est tres leger et fonctionne fluidement sur un ordinateur de bureau ordinaire.
* **Trae** : c'est votre **partenaire de codage IA** et votre outil de productivite principal. En mode Vibe Coding, vous n'avez pas besoin de maitriser la syntaxe HTML ou CSS. Vous dites principalement a l'IA en langage naturel, comme "Changez la barre de navigation en noir" ou "Mettez la photo de Musk ici," et laissez-la ecrire et modifier le code pour vous.
* **Un compte GitHub** : c'est votre **serveur gratuit et coffre-fort de code**. Nous en avons besoin pour stocker tous les fichiers du site web. Plus important encore, nous utiliserons **GitHub Pages** pour transformer le code en une URL accessible dans le monde entier gratuitement, eliminant le besoin d'acheter un serveur ou un domaine.
* **Un environnement Git** : c'est le **coursier** des coulisses. Bien que nous ecrivions du code localement dans Trae, c'est Git qui pousse le code de votre ordinateur vers GitHub. Vous n'avez pas besoin de maitriser les commandes Git, et Trae peut aider a les invoquer, mais Git doit etre installe au prealable.
* **Un environnement Ruby** : c'est l'**atelier de pages web** local. Parce que le modele academique dans ce tutoriel utilise Jekyll, qui fonctionne sur Ruby, nous avons besoin de Ruby localement pour pouvoir previsualiser le site web sur notre propre ordinateur avant de le pousser en ligne.

## 2.2 Telecharger Trae

**Trae** est notre champ de bataille principal pour le Vibe Coding. Vous pouvez le considerer comme un **editeur de code avec une super IA integree**. Contrairement aux editeurs traditionnels froids, c'est comme un programmeur experimente assis a cote de vous, toujours pret a aider.

* **Adresse de telechargement** : visitez le site officiel [https://www.trae.cn](https://www.trae.cn) et telechargez la version pour votre systeme d'exploitation, Windows ou Mac.
* **Installation** : l'installation est tres simple, comme installer WeChat ou QQ. Double-cliquez sur le package d'installation et cliquez sur "Suivant" jusqu'a ce que ca se termine.

Apres avoir prepare cet outil, dans les etapes pratiques suivantes, nous n'aurons pas besoin de regarder des panneaux de code ennuyeux. Nous ouvrirons directement le projet ici et utiliserons le panneau de chat a droite pour dire a l'IA en langage naturel, en chinois si vous le souhaitez, de nous aider a ecrire du code, corriger des bugs et meme refactoriser des pages entieres.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Telecharger Git

**Qu'est-ce que Git ?**
Si Trae est l'ingenieur IA responsable d'ecrire du code en Vibe Coding, alors **Git est le coursier responsable du transport du code**. Vous en avez besoin pour empaqueter le code ecrit sur votre ordinateur et le pousser en toute securite vers GitHub, votre depot cloud. Sans lui, votre site fonctionne uniquement sur votre propre machine et personne d'autre ne peut le voir.

Auparavant, vous deviez aller sur le site officiel, telecharger l'installateur et configurer les variables d'environnement manuellement. C'etait ennuyeux. Maintenant, nous pouvons simplement laisser Trae aider a detecter et installer.

**Etape 1 : Verifier si Git est deja installe**

Ouvrez Trae et tapez l'instruction suivante dans le panneau de chat en bas a droite :

```markdown
Aidez-moi a verifier si Git est deja installe sur cet ordinateur. Veuillez executer la commande `git --version` dans le terminal.
```

* **Cas A (deja installe)** : si vous voyez quelque chose comme `git version 2.xx.x`, felicitations. Vous pouvez passer directement l'etape d'installation.
* **Cas B (non installe)** : si vous voyez "command not found" ou un groupe de messages d'erreur rouges, continuez ci-dessous.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**Etape 2 : Installation assistee par IA**

Ne fermez pas Trae. Continuez a taper dans le panneau de chat :

**Instruction (utilisateurs Windows) :**

```markdown
Je n'ai pas installe Git. Veuillez ecrire la commande qui utilise l'outil en ligne de commande `winget` pour installer Git automatiquement, et me dire comment l'executer dans le terminal.
```

**Instruction (utilisateurs Mac) :**

```markdown
Je n'ai pas installe Git. Veuillez me dire comment installer rapidement Git par des commandes terminal, par exemple en utilisant `git` ou `brew`.
```

Trae vous donnera une commande, souvent quelque chose comme `winget install --id Git.Git`.

Vous n'avez qu'a cliquer sur le bouton **Executer dans le Terminal** dans le bloc de code ou le copier dans le terminal en bas et appuyer sur Entree. Il telechargera et installera automatiquement Git pour vous.

Si vous trouvez encore que le processus assiste par IA n'est pas assez parfait, vous pouvez vous referer a ce tutoriel pour le telechargement et l'installation manuels :
[Tutoriel de telechargement et d'installation de Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Installer l'environnement Ruby

Avant de commencer officiellement a ecrire du code, il nous manque encore une derniere piece du puzzle. Le modele de page personnelle academique utilise dans ce tutoriel est construit avec Jekyll, qui est lui-meme base sur le langage de programmation Ruby.

Pour previsualiser et deboguer "l'effet de renovation" sur votre propre ordinateur avant de pousser le code vers GitHub pour que le monde entier le voie, nous devons installer un environnement Ruby sur l'ordinateur. Considerez cela comme engager un interprete sur votre ordinateur qui comprend Ruby. Ne vous inquietez pas, vous n'avez pas besoin d'apprendre a ecrire du Ruby. Vous n'avez qu'a l'installer, et Trae peut gerer le reste.

### 2.4.1 Installation sous Windows

**Etape 1 : Telecharger l'installateur en utilisant un miroir domestique**

Pour les utilisateurs Windows, le site officiel a https://rubyinstaller.org/downloads/ fournit des installateurs en un clic, mais en raison des differences de reseau, il est utile de connaitre une astuce. La recommandation officielle pour les debutants est generalement **`Ruby+Devkit 3.X.X (x64)`**, car elle inclut la chaine d'outils necessaire.

**Rappel pour les debutants** : en pratique, le telechargement direct depuis le site officiel peut etre lent ou echouer. Nous recommandons fortement d'utiliser le miroir domestique a [RubyInstaller pour Windows - Miroir chinois](https://rubyinstaller.cn/), qui est generalement beaucoup plus rapide.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**Etape 2 : Executer l'installation**

Double-cliquez sur l'installateur telecharge. Dans l'assistant de configuration, assurez-vous de cocher **"Add Ruby executables to your PATH."** C'est l'etape la plus importante. Sinon, l'ordinateur ne pourra pas "trouver" l'interprete que vous venez d'installer.

Apres l'avoir coche, continuez a cliquer sur **Suivant** pour terminer l'installation.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**Etape 3 : Configurer la boite a outils de developpement**

Lorsque la progression de l'installation se termine, une fenetre de ligne de commande noire s'ouvrira automatiquement. Ne paniquez pas. Tapez le numero `3` a l'endroit ou le curseur clignote, ce qui signifie installer l'environnement de base MSYS2 et la chaine d'outils MINGW, puis appuyez sur Entree. Attendez que les commandes terminent de s'executer et que la fenetre se ferme automatiquement.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**Etape 4 : Verifier le resultat**

Il est maintenant temps de demander a l'IA de verifier votre travail. Ouvrez Trae et tapez l'instruction en langage naturel suivante dans le chat a droite :

```markdown
Aidez-moi a verifier si l'environnement Ruby a ete correctement installe sur cet ordinateur. Veuillez executer la commande `ruby -v` dans le terminal en bas et me dire le resultat.
```

Si Trae repond par quelque chose comme `ruby 3.x.x`, alors votre environnement Ruby Windows est completement configure.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Installation sous Mac

Configurer un environnement Mac semble plus "geek" car il necessite generalement des commandes terminal. Mais en mode Vibe Coding, nous n'avons meme pas besoin d'ouvrir le terminal manuellement. Nous pouvons simplement laisser Trae agir comme notre operateur IT personnel.

**Etape 1 : Donner l'instruction de configuration d'environnement en une seule fois**

Ouvrez Trae et collez l'instruction en langage naturel suivante dans le chat a droite. Nous lui demanderons de gerer la verification de Homebrew, son installation si manquant, puis l'installation de Ruby :

```markdown
J'utilise un ordinateur Mac et j'ai besoin de configurer un environnement de developpement Ruby. Aidez-moi a accomplir les etapes suivantes :
1. Verifier si Homebrew est deja installe. Si non, veuillez executer le script d'installation officiel de Homebrew dans le terminal.
2. Apres avoir confirme que Homebrew est pret, executez `brew install ruby` dans le terminal.
3. Quand tout est termine, executez `ruby -v` pour confirmer que l'installation a reussi.
Veuillez me guider etape par etape, et si necessaire fournir des commandes terminal que je peux cliquer et executer directement.
```

Apres avoir recu l'instruction, Trae commencera a travailler et affichera des blocs de code avec des boutons d'execution dans le panneau de chat.

**Note importante pour les debutants**

Lors de l'installation de Homebrew, le terminal affiche souvent quelque chose comme `Password:` et demande votre mot de passe de connexion Mac.

**Note :** lorsque vous tapez un mot de passe dans le terminal Mac, l'ecran n'affichera aucun caractere ni etoile. C'est normal. Tapez simplement votre mot de passe a l'aveugle et appuyez sur Entree.

**Etape 2 : Verifier le resultat**

Apres l'installation, retournez dans Trae et tapez :

```markdown
Je viens d'installer Ruby sur ce Mac via `brew`. Aidez-moi a executer la commande `ruby -v` dans le terminal et a verifier si l'installation et les variables d'environnement sont correctes.
```

Quand vous voyez quelque chose comme `ruby 3.x.x` dans le terminal, l'atelier de pages web local est pret et votre Mac est prepare pour le Vibe Coding.

## 2.5 Creer un compte GitHub

**Qu'est-ce que GitHub ?**
Si Git est le coursier, alors **GitHub est l'entrepot cloud et le showroom**. Il heberge non seulement votre code gratuitement, mais plus important encore, avec **GitHub Pages** il peut transformer votre code en une URL de site web accessible dans le monde entier. C'est aussi la plus grande plateforme d'hebergement de code au monde, et avoir un compte GitHub est une sorte de passeport dans le monde technique.

**Etapes d'inscription :**

1. **Visitez le site officiel** : ouvrez [https://github.com/](https://github.com/).
2. **Cliquez sur Sign up** : cliquez sur **"Sign up"** dans le coin superieur droit.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **Remplissez vos informations**
4. **Email** : entrez une adresse email reelle.
5. **Mot de passe** : choisissez un mot de passe fort.
6. **Nom d'utilisateur (important !)** : **choisissez avec soin**. L'URL de votre page personnelle deviendra plus tard **`https://votre-nom-utilisateur.github.io`**. Il est preferable d'utiliser votre nom anglais, pinyin, un identifiant familier ou une simple combinaison de lettres et de chiffres. Ne choisissez **pas** quelque chose comme `a1b2c3d4`, sinon le lien de votre site web sera difficile a retenir.
7. **Verification et activation** : completez la verification humaine, souvent des images rotatives ou le choix de galaxies en spirale, puis verifiez votre email pour le code de verification.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

Une fois l'inscription terminee, vous avez un terrain a vous sur Internet. Dans la section suivante, nous commencerons a construire sur ce terrain.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. Du modele a votre premiere page accessible

Tout est pret. Dans les deux premiers chapitres, nous avons prepare les outils. Dans ce chapitre, nous allons officiellement revendiquer un terrain sur Internet. La tache dans ce chapitre est simple :
**Ne vous inquietez pas encore de la decoration ou du contenu. Construisez d'abord le squelette du site et obtenez un lien d'acces en direct.**

Nous allons directement forker un modele academique mature et utiliser l'automatisation de GitHub Pages pour le faire fonctionner en vingt minutes. Une fois termine, vous aurez un lien accessible dans le monde entier.

## 3.1 Obtenir un modele de site web

En mode Vibe Coding, nous n'avons pas besoin d'ecrire du HTML a partir de zero. GitHub a des milliers de modeles open source excellents. Nous n'avons qu'a "emprunter" un modele et changer le nom pour le nôtre.

**Etape 1 : Trouver un modele**

Ici, nous avons selectionne un modele classique avec une structure claire et une forte adequation pour l'affichage academique :
https://github.com/luost26/academic-homepage?tab=readme-ov-file
Ce modele est base sur le framework Jekyll.

Bien sûr, vous pouvez aussi rechercher **`academic-homepage`** sur GitHub et choisir un autre style que vous aimez, mais pour suivre ce tutoriel, il est recommande d'utiliser d'abord le modele ci-dessus.

Nous avons aussi prepare plusieurs recommandations de modeles supplementaires pour vous :

* Minimal Light personal homepage theme : https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes : [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll : https://github.com/johno/pixyll
* Hydejack : https://github.com/hydecorp/hydejack
* Forty Jekyll Theme : https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids : https://github.com/github.com/renyuanz/leonids
* YAT : https://github.com/jeffreytse/jekyll-theme-yat

**Etape 2 : Forker le projet**

Visitez la page d'accueil du depot cible et cliquez sur le bouton **Fork** dans le coin superieur droit. Une boite de confirmation apparaîtra. Cliquez directement sur **Create Fork**.

* Explication : cette etape equivaut a copier le depot de code de quelqu'un d'autre avec un jeu complet de cles dans votre propre compte GitHub. Maintenant, vous possedez votre copie du site.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**Etape 3 : Renommer le depot, l'etape la plus importante**

Changez le nom du depot en :
`votre-nom-utilisateur.github.io`

**Note importante pour les debutants** :
C'est une regle stricte de GitHub Pages.
Par exemple, si votre nom d'utilisateur GitHub est `musk-fan`, alors le nom du depot **doit** etre `musk-fan.github.io`.
Seulement ainsi GitHub vous assignera automatiquement un domaine gratuit. Si le nom est incorrect, la page web ne s'ouvrira pas plus tard.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 Obtenir l'URL du projet GitHub

Apres le renommage, nous avons besoin du bon de retrait du depot.

1. Retournez sur la page d'accueil du depot, sous l'onglet **Code**.
2. Cliquez sur le bouton vert **Code**.
3. Assurez-vous que l'onglet **HTTPS** est selectionne.
4. Cliquez sur le bouton de copie et copiez l'URL se terminant par `.git`, par exemple `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 Recuperer le projet localement

Auparavant, les programmeurs devaient taper des commandes Git complexes dans un terminal noir pour telecharger du code. A l'ere du Vibe Coding, nous avons Trae. Nous n'avons qu'a dire a l'IA, "Je veux ca, aidez-moi a le recuperer."

**Etape 1 : Preparation**

Creez un nouveau dossier sur votre ordinateur, par exemple `MyWebsite`, puis faites un clic droit et choisissez **Open with Trae**, ou ouvrez Trae d'abord et choisissez **Open Folder**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**Etape 2 : Donner la commande de clonage**

Apres que Trae s'est ouvert, affichez le panneau de chat IA a droite et entrez l'instruction en langage naturel suivante :

```text
Aidez-moi a cloner le depot GitHub distant dans le dossier courant.
Adresse du depot : collez l'URL que vous venez de copier, par exemple https://github.com/musk-fan/musk-fan.github.io.git
Exigence d'execution : veuillez executer directement la commande `git clone` dans le terminal.
```

**Etape 3 : Confirmer le telechargement**

Trae invoquera automatiquement le terminal en bas et executera la commande. Attendez quelques secondes. Quand vous voyez des fichiers tels que `_config.yml` et `index.html` apparaitre dans l'arborescence de fichiers a gauche, le projet a ete deplace avec succes sur votre ordinateur.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 Previsualiser la page web localement

Le code est sur votre machine et l'environnement Ruby est pret. Avant de modifier le site, nous devons d'abord l'inspecter localement sur notre propre ordinateur. C'est comme pour la renovation d'une maison : vous arrangez d'abord tout dans le showroom, confirmez que ca a l'air bien, et seulement apres vous l'ouvrez au public.

Grace a l'environnement Ruby installe dans la **Section 2.4**, c'est maintenant tres simple.

**Etape 1 : Installer les dependances**

Un site Jekyll depend de nombreux Gems pour fonctionner. C'est comme acheter tous les meubles d'une liste de courses. **Cependant**, en raison des conditions reseau, les telechargements directs peuvent bloquer. Nous demanderons a Trae de **basculer vers un miroir domestique** et d'y installer les dependances.

Dans la boite de chat de Trae, entrez :

```markdown
J'ai besoin d'installer les dependances Jekyll. Compte tenu de l'environnement reseau, veuillez d'abord changer la `source` dans le Gemfile pour le miroir domestique `https://gems.ruby-china.com/`. Apres cela, veuillez executer la commande `bundle install` dans le terminal pour installer toutes les dependances.
```

**Etape 2 : Demarrer le service local**

Maintenant, nous allons demarrer un **serveur local** pour simuler le fonctionnement du site web. Continuez et dites a Trae :

```markdown
Les dependances ont termine d'installer. Aidez-moi a demarrer le service de previsualisation locale Jekyll dans le terminal. Veuillez executer la commande `bundle exec jekyll serve`.
```

Apres que le terminal a tourne pendant quelques secondes, vous verrez quelque chose de similaire a :
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **Ouvrez le navigateur** : cliquez sur ce lien, ou tapez-le directement dans votre navigateur :
   `http://127.0.0.1:4000/academic-homepage/`
2. **Voyez la magie** : maintenant votre site fonctionne deja dans le navigateur. Bien qu'il affiche encore le nom de l'auteur original du modele, il fonctionne deja localement sur votre ordinateur.

A partir de ce point, chaque fois que vous modifiez le contenu et appuyez sur `Ctrl+S`, puis rafraichissez le navigateur, **le contenu de la page web changera en consequence**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

Une fois que la previsualisation locale fonctionne, nous pouvons passer au chapitre suivant et commencer a transformer le site web en quelque chose qui ressemble a Elon Musk.

# 4. Modification de contenu assistee par IA

Pour aider chacun a vivre rapidement l'experience complete, nous n'utiliserons pas nos propres informations personnelnelles, pour eviter l'anxiete de la vie privee. Au lieu de cela, nous utiliserons **Elon Musk comme exemple** et construirons une page personnelle academique pour lui. Cela nous permet de laisser de cote la pression ennuyeuse d'ecrire un CV personnel et de nous concentrer sur le plaisir du Vibe Coding pour les sites web. Cela nous permet aussi de voir a quel point il est cool de placer les "livres blancs techniques" d'un homme de fer de la Silicon Valley, comme *Hyperloop Alpha*, sur un site de style academique.

Nous allons parcourir la boucle complete de **l'obtention du modele** a **la publication du site**, et construire un espace de vitrine personnel de classe mondiale de nos propres mains.

Suivez mon rythme et envoyez la premiere instruction a l'IA.

## 4.1 Contraintes globales unifiees

Ceci est le **prompt de configuration globale**. Vous n'avez qu'a l'envoyer une seule fois.
Son but est de definir des regles pour l'IA, pour l'empecher d'improviser et de casser la structure du site. Copiez-le directement dans Trae :

```text
Vous etes maintenant le mainteneur d'un site "GitHub Pages + Jekyll modele de page personnelle academique".
Le depot actuel est une page personnelle academique propulse par Jekyll (incluant `_config.yml`, `_data`, `_layouts`, etc.).
Vos modifications doivent suivre ces principes :
1. Chaque etape ne doit resoudre que l'objectif de l'etape actuelle. Ne faites pas le contenu des etapes ulterieures a l'avance.
2. Ne modifiez pas la structure du site, n'introduisez pas de nouveaux plugins et ne changez pas le style du theme.
3. Tout le contenu doit pouvoir etre rendu par Jekyll sans erreurs.
4. Toutes les informations d'identite doivent suivre un ton "simulation de style academique" et ne doivent pas utiliser la voix a la premiere personne.
5. N'inventez pas de faux articles IEEE / Nature evident.
6. Si les informations sont incertaines, utilisez des "faits publiquement connus" ou un "etiquetage de simulation academique raisonnable."
```

## 4.2 Construire la page de Musk, la partie contenu

### 4.2.1 Premiere instruction globale : remplacer l'identite

La premiere chose que nous devons resoudre est "Qui suis-je ?" Le modele est rempli des informations de l'auteur original, et nous devons les remplacer avec l'IA en une seule fois.

**Etape 1 : Preparer les actifs**

Placez les images d'actifs que je vous fournis, `University_of_Pennsylvania.jpg` et `Queen_University.jpg`, dans le dossier de projet correspondant, generalement `/assets/images/badges/`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**Etape 2 : Envoyer l'instruction**

Dans la boite de chat a droite de Trae, entrez le prompt suivant. Notez que nous n'avons pas besoin de trouver et d'editer des lignes manuellement. Nous disons simplement a l'IA ce que nous voulons :

```text
1. Objectif : remplacer "l'identite de la personne" de la page personnelle academique actuelle par Elon Musk. Ne modifier que les informations de profil de base.
2. Exigences specifiques :
1. Nom : Elon Musk
2. Identite professionnelle :
    Entrepreneur technologique
    Ingenieur
    Fondateur et PDG de SpaceX
    PDG de Tesla, Inc.
3. Education :
    Universite Queen's (Physique et Economie, non termine) (chemin de l'image : /assets/images/badges/Queen_University.jpg)
    Universite de Pennsylvanie (B.S. en Physique, B.A. en Economie) (chemin de l'image : /assets/images/badges/University_of_Pennsylvania.jpg)
4. Interets de recherche (peut etre simule comme) :
    Ingenierie des systemes spatiaux
    Systemes d'energie durable
    Intelligence artificielle et robotique
    Innovation technologique a grande echelle
5. Honneurs et reconnaissance :
    Personnalite de l'annee du Time (2021)
    Fellow de la Royal Society (FRS)
    Liste des milliardaires de Forbes (plusieurs annees)
6. Contraintes :
    Ne pas ajouter d'articles / publications
    Ne pas inventer d'articles IEEE, Nature ou Science
    Utiliser un vocabulaire de style academique et eviter le ton promotionnel commercial
    Conserver la structure des champs originale et ne remplacer que le contenu
```

A ce stade, vous pouvez voir que Trae a complete toutes nos exigences de modification.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**Etape 3 : Rafraichir le navigateur local**

Rafraichissez le navigateur local maintenant, et vous devriez voir tout remplace correctement.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 Amelioration iterative : ajouter des "articles" et des projets

Parce qu'Elon Musk n'est pas un professeur d'universite traditionnel, il publie rarement des articles dans *Nature* ou *Science*. Mais en tant qu'"ingenieur en chef," il a publie de nombreux **livres blancs** et **plans directeurs** hautement techniques.

Dans le contexte d'une page personnelle academique, nous pouvons redefinir la signification de "Publications" comme **"Livres blancs techniques et plans visionnaires."** Ce n'est pas du tout maladroit. En fait, cela correspond tres bien a son identite de constructeur.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**Etape 1 : Preparer les actifs**

Telechargez les images de couverture que je vous fournis, a savoir `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg` et `Neuralink_sewing_machine_robot.jpg`, placez-les sous `/assets/images/covers/` et supprimez les images d'exemple qui etaient originellement dans ce dossier.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**Etape 2 : Envoyer l'instruction**

Envoyez le prompt suivant a Trae et laissez-le nous aider a reconstruire la structure de donnees :

```text
1. Parametrage du role : vous etes un expert en developpement de sites statiques qui maitrise Jekyll et la syntaxe Liquid.
2. Objectif de la tache :
Modifier le titre de section sur la page d'accueil ou dans la barre de navigation.
La structure de fichiers actuelle est organisee par sous-dossiers d'annee, par exemple `_publications/2023/xxx.md`.
Creez trois nouveaux fichiers Markdown dans le format specifie pour afficher les livres blancs techniques et les plans visionnaires d'Elon Musk.
3. Etapes specifiques et exigences :
1. Modifier le titre de section
    Veuillez rechercher globalement la chaine "Selected Publications" (elle peut apparaitre dans `index.html`, `_config.yml` ou `_pages/publications.md`).
    Remplacez-la par : "Technical White Papers & Visionary Plans".
2. Reconstruire les donnees de publication (etape critique)
    Effacez tout l'ancien contenu sous le dossier `_publications`, y compris les anciens dossiers d'annee comme 2023 et 2024.
    Creez trois nouveaux dossiers : `_publications/2013/`, `_publications/2017/` et `_publications/2019/`.
    Dans ces dossiers, creez les trois fichiers Markdown suivants.
3. Suivez strictement ce format de fichier
Important : vous devez suivre strictement le format YAML Front Matter ci-dessous, et ne devez pas inventer de nouveaux noms de champs :
    - title:          "titre de l'article"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "nom du lieu / journal"
    - pub_date:       "annee"
    - abstract: >-    contenu du resume...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Auteur1- Auteur2
    - links:Paper:    https://paper-link
4. Veuillez generer le code complet pour les trois fichiers suivants (y compris les descriptions de chemin) :
(1) Chemin : `_publications/2013/2013-hyperloop.md`
    Titre : Hyperloop Alpha
    Date : 2013-08-12
    Pub : Tesla Blog (Open Source)
    Pub_date : "2013"
    Resume : Une proposition pour un cinquieme mode de transport, utilisant un tube a basse pression et des paliers d'air pour atteindre des vitesses subsoniques.
    cover : /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Auteurs : Elon Musk, equipes SpaceX & Tesla
    Lien : https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Chemin : `_publications/2017/2017-mars.md`
    Titre : Making Humans a Multi-Planetary Species
    Date : 2017-06-01
    Pub : New Space
    Pub_date : "2017"
    Resume : Architecture detaillee du systeme Starship concu pour coloniser Mars. Ce document decrit les defis techniques pour etablir une ville autonome.
    cover : /assets/images/covers/SpaceX_Starship.jpg
    Auteurs : Elon Musk
    Lien : https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Chemin : `_publications/2019/2019-neuralink.md`
    Titre : An Integrated Brain-Machine Interface Platform
    Date : 2019-10-16
    Pub : Journal of Medical Internet Research
    Pub_date : "2019"
    Resume : Nous avons construit des reseaux de petits fils d'electrodes flexibles, avec jusqu'a 3072 electrodes par reseau, et un robot neurochirurgical.
    cover : /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Auteurs : Elon Musk, Neuralink
    Lien : https://www.jmir.org/2019/10/e16194/
Exigence d'execution :
Veuillez fournir directement le contenu complet de ces trois fichiers, ainsi que le code de modification pour le fichier ou vous avez change le titre.
```

**Etape 3 : Rafraichir le navigateur local**

Lorsque la construction se termine, vous decouvrirez que la liste de publications originellement terne s'est transformee en une vitrine de haute technologie futuriste.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 Touche finale : liens sociaux et avatar

C'est l'etape cle pour passer d'un score de 90 a un score de 100. La barre laterale peut encore contenir le lien GitHub original du modele ou un email incorrect. Nous devons les pointer vers les veritables comptes sociaux de Musk, principalement X.com.

**Etape 1 : Preparation**

Recherchez sur Google une belle photo de Musk, enregistrez-la comme `portrait.png`, ou faites-la glisser dans le dossier `images/photo` dans Trae et remplacez l'image originale.

**Etape 2 : Copiez le prompt suivant dans Trae**

```text
1. Parametrage du role : vous etes un expert en developpement de sites Jekyll attentif aux details.
2. Objectif de la tache : completer la mise a jour finale de la barre laterale du site et de la configuration des informations personnelles. Nous devons mettre a jour l'avatar de l'auteur, l'introduction et les liens sociaux avec les veritables informations d'Elon Musk.
Veuillez d'abord scanner la structure du projet et trouver le fichier de configuration qui controle les informations de l'auteur.
3. Veuillez effectuer les modifications suivantes :
1. Correction du chemin de l'avatar
    J'ai deja telecharge une nouvelle image nommee `portrait.png` dans le dossier `images/` ou `assets/images/`.
    Veuillez modifier le chemin de l'avatar dans le fichier de configuration pour pointer vers cette image, et assurer que le chemin relatif est correct, par exemple `/images/portrait.png`.
2. Nettoyage des liens sociaux
    Veuillez mettre a jour ou supprimer les liens d'icones sociales dans la barre laterale :
    Email : changez-le en `elon@spacex.com`, ou si le champ le permet, commentez-le ou supprimez-le pour eviter le harcelement.
    Twitter / X : changez-le en `https://x.com/elonmusk` (c'est le lien principal).
    GitHub : changez-le en `https://github.com/tesla` pour pointer vers le depot open source de Tesla, ou supprimez-le directement.
    Google Scholar : doit etre supprime, car il ne le maintient pas.
    LinkedIn / ResearchGate : s'ils existent, supprimez-les tous.
Exigence de sortie :
Veuillez fournir directement l'extrait de code de configuration modifie complet.
```

**Etape 3 : Rafraichir le navigateur local**

1. Regardez la barre laterale. Utilise-t-elle maintenant cette belle photo ? Le clic sur l'icone Twitter vous mene-t-il a X.com ?

A ce stade, localement, vous avez deja une page personnelle academique complete, professionnelle et distinctement stylee Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 Injecter l'ame par la personnalisation de l'UI, la partie style

Pour le moment, le contenu est correct, mais la page ressemble encore a un CV imprime. Elle manque de sens technologique. En mode Vibe Coding, nous n'avons pas besoin de comprendre le CSS. Nous n'avons qu'a decrire le **sentiment** que nous voulons a l'IA.

**Exemple de scenario** :
Si vous trouvez le fond gris trop terne et voulez le changer en **rouge Mars**, demandez simplement a Trae :
*"Je veux changer la couleur de fond de la barre laterale en rouge fonce (#8B0000) pour refleter le sentiment de Mars. Quel fichier CSS ou SCSS dois-je modifier ? Donnez-moi le code directement."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

Si vous aimez le style **SpaceX Dashboard** dans l'image d'exemple ci-dessus, vous pouvez copier directement le prompt de niveau designer suivant :

```text
1. Parametrage du role : vous etes un designer UI de premier plan qui admire le "style internationaliste suisse" et qui est doue pour les interfaces comme Notion, Linear ou Apple.
2. Objectif de la tache : veuillez reecrire completement le CSS / SCSS pour creer une page personnelle academique minimaliste de style "SpaceX Dashboard". Les mots-cles principaux sont : transparent, retenu, precis.
3. Veuillez appliquer les surcharges de style concretes suivantes :
1. Typographie globale
    Police : abandonnez la police serif originale. Forcez tout le site a utiliser la pile sans-serif au niveau systeme :
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Hauteur de ligne : augmentez l'espace de respiration dans le texte du corps avec `line-height: 1.75`.
    Couleurs :
        Titre principal : #111111
        Texte du corps : #333333
        Informations secondaires comme les dates ou citations : #666666
2. En-tete epure
    Fond : supprimez le fond noir precedent et utilisez du blanc pur (#FFFFFF), ou du blanc translucide avec flou si supporte, par exemple `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Bordure : gardez uniquement une tres fine bordure inferieure, `border-bottom: 1px solid #EAEAEA`.
    Texte : les liens de navigation doivent utiliser le gris fonce #333333, et ne devenir noirs et gras qu'au survol.
3. Supprimer les cartes et retourner au contenu
    Supprimez le fond et l'ombre de la barre laterale gauche et des cartes About me (`box-shadow: none`, `background: transparent`).
    Le grand minimalisme laisse le texte flotter directement sur le fond de la page.
    Augmentez l'espacement : augmentez significativement `margin-bottom`, par exemple 80px, entre les sections et utilisez l'espace blanc au lieu des bordures pour separer le contenu.
4. Usage retenu de la couleur de marque
    Utilisez le rouge Tesla (#E82127) uniquement sur les liens et les boutons importants.
    Style de lien : supprimez le soulignement et changez uniquement la couleur. Au survol, ajoutez un bloc de fond rouge clair tel que `background: rgba(232, 33, 39, 0.05)`.
5. Reglage de l'avatar
    Gardez-le circulaire avec `border-radius: 50%`.
    Supprimez la bordure.
    Gardez uniquement une ombre tres legere, comme `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Exigence d'execution :
Veuillez analyser les fichiers `_sass` ou CSS. Ne corrigez pas l'ancien code. Au lieu de cela, fournissez directement le code qui reinitialise et surcharge les styles ci-dessus.
```

## 4.4 Remplacez-le par vos propres informations, la partie personnalisation

Felicitations. Apres avoir traverse le flux de la page de Musk ci-dessus, vous avez deja maitrise l'etat d'esprit principal du Vibe Coding pour la construction de sites. Transformer ce modele d'exemple en votre propre maison est en fait facile maintenant.

Vous n'avez pas besoin de recommencer a zero. Vous n'avez qu'a repeter les etapes ci-dessus, mais avec une strategie legerement plus flexible :

**Etape 1 : Remplacement physique, avatar et informations de base**

C'est l'etape la plus facile :

1. **Changez la photo** : dans le panneau de fichiers a gauche de Trae, trouvez `assets/images/` et faites glisser votre propre portrait, en remplacant `portrait.png`.
2. **Changez le nom** : dites a Trae, "Remplacez toutes les occurrences d'Elon Musk sur l'ensemble du site par [votre nom]."

**Etape 2 : Pretraitement par IA, laissez ChatGPT / Gemini aider a organiser le contenu**

Trae est doue pour ecrire du code, mais si vous lui jetez directement un CV PDF desordonne, il peut etre confus.

**Donc une approche plus efficace est celle-ci** :
utilisez d'abord une IA forte pour le traitement de texte long, comme ChatGPT, Gemini ou Kimi, pour vous aider a **formater proprement** le CV.

Vous pouvez envoyer a ChatGPT un prompt comme celui-ci :

```text
Parametrage du role : vous etes un planificateur de contenu de site academique professionnel.
Objectif de la tache :
Je vais vous envoyer mon CV / resume personnel. Aidez-moi a extraire les informations cles et a les organiser dans une structure Markdown claire adaptee pour etre directement remplie dans un site statique.
Veuillez organiser et affiner strictement en cinq modules. Si certains contenus n'existent pas, laissez-les vides.
1. Profil
Nom : mon nom complet.
Accroche : une etiquette professionnelle en une ligne, par exemple "Etudiant en CS @ XX Univ | Passionne d'IA".
Bio : une introduction a la troisieme personne de 50 a 100 mots resumant mon parcours et competences cles, dans un ton academique professionnel.
Reseaux sociaux : extrayez email, GitHub, LinkedIn, liens de blog, etc.
2. Education
Veuillez lister : nom de l'ecole, diplome comme B.S. en CS, et plage de temps.
Optionnel : si le GPA ou les cours cles sont disponibles, ajoutez-les sur une ligne separee.
3. Projets selectionnes - important
Veuillez extraire 2 a 3 des projets les plus forts, et pour chacun inclure :
Titre : nom du projet.
Pile technologique : technologies utilisees, comme Python, React, PyTorch.
TL;DR : un resume en une ligne de ce que fait le projet.
Description : 2 a 3 contributions cles, affinees en style STAR.
Espace pour image : reservez un nom de fichier image comme `project_name.jpg`.
4. Publications / Articles
S'il y a des articles ou articles techniques, veuillez extraire :
Titre
Lieu
Date, l'annee suffit
Resume, un resume en une phrase
5. Competences
Veuillez les organiser en categories : langages de programmation, frameworks / outils et autres competences.
Exigence de sortie :
N'expliquez pas le processus. Produisez directement le contenu Markdown nettoye.
```

Une fois que vous obtenez ce texte nettoye, transmettez-le a Trae, et la precision s'ameliorera de maniere spectaculaire.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**Etape 3 : Remplacer le contenu principal, avec deux routes possibles**

A cette etape, selon vos preferences, vous pouvez choisir deux modes differents de Vibe Coding :

1. **Mode A : laissez l'IA naviguer, puis editez manuellement**

Si vous voulez savoir exactement ou tout est change, vous pouvez demander a Trae :

```markdown
Je veux modifier la section "Education". Dites-moi ou se trouve le chemin du fichier correspondant et quelles lignes contiennent le code.
```

Trae vous dira dans le chat quelque chose comme :
"Le fichier que vous devez modifier est `_pages/about.md`, et le code pertinent se trouve autour de la ligne XX..."

Vous pouvez alors ouvrir ce fichier vous-meme depuis l'arborescence de fichiers a gauche et remplir le contenu nettoye de ChatGPT comme un exercice d'edition structuree.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **Mode B : automatisation completement geree**

Si vous trouvez que chercher des fichiers est trop ennuyeux, collez directement vos informations nettoyees dans Trae :

```markdown
Voici le contenu nettoye pour mes sections "Education" et "Experience de Projet" (collez le contenu Markdown).
Veuillez remplacer directement le contenu correspondant dans le site actuel et preserver le format de mise en page existant.
```

# 5. Deploiement en ligne

## 5.1 Deployer sur GitHub Pages

**Etape 1 : Activer GitHub Actions, la construction cloud**

Retournez sur GitHub dans le navigateur :

1. Cliquez sur **Settings** en haut du depot.
2. Dans la barre laterale gauche, cliquez sur **Pages**.
3. Sous **Build and deployment**, changez **Source** de `Deploy from a branch` a **`GitHub Actions`**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**Etape 2 : Configurer automatiquement le flux de travail Jekyll**

Apres le changement, la mise en page de la page change. GitHub reconnaitra automatiquement qu'il s'agit d'un projet Jekyll.

1. Trouvez la carte **Jekyll (By GitHub Actions)**.
2. Cliquez sur **Configure** sur cette carte.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**Etape 3 : Commiter le fichier de configuration**

Apres avoir clique, vous serez amene a une page pleine de code. C'est un fichier de configuration `.yml` deja ecrit par GitHub pour construire un site Jekyll.

1. **Ne modifiez aucun code**.
2. Cliquez sur le bouton vert **Commit changes...** dans le coin superieur droit.
3. Dans la boite de confirmation pop-up, cliquez a nouveau sur **Commit changes**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**Etape 4 : Attendre et verifier**

Apres le commit, les serveurs de GitHub commencent a travailler automatiquement.

1. Cliquez sur l'onglet **Actions** dans le menu du haut.
2. Vous verrez une tache nommee `Deploy Jekyll site to Pages` tourner.
3. Attendez une a deux minutes jusqu'a ce que le cercle jaune se transforme en **coche verte**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**Etape 5 : Visitez votre site web**

Une fois que le cercle devient vert, vous pouvez acceder a la version par defaut du modele via une adresse comme :
**`https://votre-nom-utilisateur.github.io/`**

Felicitations. Vous avez maintenant deploye avec succes une page personnelle academique accessible dans le monde entier.

## 5.2 Commiter les modifications et mettre a jour la page personnelle

Maintenant, nous allons pousser toutes les modifications locales que nous avons faites precedemment vers GitHub, pour que cette page personnelle de style Musk puisse etre vue par le monde entier.

1. Cliquez sur **Source Control** a gauche.
2. Ajoutez toutes les **modifications** dans **staged changes**.
3. Laissez Trae aider a generer un message de commit, puis cliquez sur **Commit**.
4. Cliquez sur **Sync Changes** ou **Push** pour pousser vers la branche `main`.
5. Attendez un moment jusqu'a ce que tous les processus sous l'onglet **Actions** soient termines.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

Maintenant, felicitations. Ouvrez **`https://votre-nom-utilisateur.github.io/`**, et vous avez deja une page personnelle academique complete, professionnelle et fortement aromatisee Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. Jeu avance : construire manuellement une page personnelle a partir de zero

Si vous trouvez les modeles academiques trop rigides, ou si vous voulez faire un site d'une seule page aussi cool que *The Matrix*, bienvenue dans la **section DIY**.

Ici, nous ne forkons le code de personne d'autre. Nous utiliserons Trae, en commencant a partir d'un dossier vide, et genererons un site web complet avec une seule instruction, puis le deploierons en ligne.

## 6.1 Pourquoi construire a la main

* **Liberte absolue** : aucune contrainte de modele. Si vous voulez la barre de navigation a droite ou des feux d'artifice en arriere-plan, vous n'avez qu'a le dire a l'IA.
* **Minimalisme** : les modeles contiennent souvent des centaines de fichiers, alors qu'un site construit a la main peut n'avoir besoin que d'un seul `index.html`.
* **Maitrise technique** : c'est la meilleure facon de comprendre comment une page web fonctionne reellement.

Nous demontrerons le flux classique **HTML pur** :
pas de compilation requise, et GitHub Pages le supporte nativement, ce qui le rend ideal pour construire une page d'atterrissage personnelle.

## 6.2 Exemple pratique : demander a l'IA d'ecrire une page d'accueil "centre de commandement Mars"

Cette fois, nous ne faisons pas la route academique. Supposons que Musk veuille une page personnelle extremement minimale et futuriste pour presenter son plan Mars.

**Etape 1 : Creer un projet vide**

Creez un nouveau dossier sur votre ordinateur et ouvrez-le avec Trae. A ce moment, l'arborescence de fichiers a gauche est completement vide.

*(Astuce : vous pouvez preparer a l'avance une photo de Musk et la nommer `portrait.png`.)*

**Etape 2 : Construire le framework**

Entrez le prompt suivant dans le panneau de chat de Trae. Notez que nous exigeons que l'IA ecrive tout le code dans un seul fichier pour que ce soit facile a gerer pour les debutants :

```text
Je veux construire une page personnelle minimaliste pour Elon Musk a partir de zero, sans aucun framework complexe, en utilisant uniquement HTML + CSS + JS.
Style de design : style tableau de bord SpaceX.
    Fond : utilisez le noir de l'espace profond (#000000), avec une animation de lumiere d'etoiles.
    Couleur d'accent principale : utilisez le "rouge Mars" (#E82127).
    Police : utilisez une pile de polices monospace pour imiter le sensation d'un terminal de code.
Contenu de la page :
    Placez l'avatar d'Elon Musk au centre, circulaire, avec une bordure rotative. Le chemin de l'image est `portrait.png`.
    Nom : Elon Musk (Technoking of Tesla)
    Introduction : "Occupation de Mars... 99% Chargement."
    En bas, mettez trois boutons lumineux reliant a X (Twitter), SpaceX et Tesla.
Exigence technique :
Veuillez mettre tous les styles CSS et la structure HTML dans un seul fichier `index.html`.
Veuillez generer le code complet directement.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**Etape 3 : Generer et previsualiser**

A l'etape precedente, Trae nous a deja aide a generer un fichier `index.html`. Alors comment voir son effet actuel ?

Dites a Trae dans le chat :

```markdown
Aidez-moi a demarrer un service local pour previsualiser cette page web.
```

Vous recevrez un lien comme `http://localhost:8000`. Copiez et ouvrez-le dans le navigateur, et vous verrez une cool "page Mars," peut-etre avec des etoiles scintillantes en arriere-plan.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

Mais nous remarquerons que la page actuelle est seulement une landing page tres cool. En tant que page personnelle complete, elle a encore trop peu d'informations et manque de la profondeur attendue d'une page personnelle academique. Donc sur la base de ce cadre visuel, nous continuons maintenant a l'enrichir avec des informations de style academique sur Elon Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**Etape 4 : Ameliorer davantage les informations**

Nous voulons que Trae conserve le style Mars actuel, mais restructure la page en quelque chose de plus ressemblant au modele academique. Nous devons lui dire clairement de deplacer les elements existants vers la gauche et de creer une nouvelle zone de contenu a droite pour le texte de profil et les livres blancs, tout en gardant tout le contenu nouvellement ajoute dans le meme style cyberpunk noir et rouge.

Copiez le prompt suivant et envoyez-le a Trae :

```text
Principe cle :
Vous devez strictement preserver le style de design "SpaceX / Mars" actuel, y compris le fond noir pur, les decorations de lumiere d'etoiles, la couleur d'accent rouge neon et la police de style code monospace. N'utilisez pas le fond blanc de l'image de reference.

Etapes de modification specifiques :
1. Creer une mise en page a deux colonnes
Divisez la page en colonnes gauche et droite. La barre laterale gauche doit prendre environ 30 a 35 % de largeur, et la zone de contenu droite doit prendre environ 65 a 70 %.

2. Barre laterale gauche - deplacer les informations existantes
Deplacez tous les elements actuels de l'ecran hero original dans la barre laterale gauche fixe :
    - Avatar : gardez l'avatar circulaire d'Elon Musk.
    - Nom et titre : gardez le texte rouge neon "ELON MUSK" et "Technoking of Tesla".
    - Barre de chargement : gardez "Occupying Mars... 99% Loading" comme signature personnelle.
    - Boutons sociaux : deplacez les trois boutons rouges, X, SPACE X et TESLA, au bas de la barre laterale gauche.

3. Zone de contenu droite - ajouter des informations detaillees
Ajoutez une presentation personnelle detaillee et des realisations dans la zone droite. Tout nouveau texte de corps doit utiliser le blanc ou le gris clair, tandis que les titres doivent utiliser l'accent rouge neon. Veuillez creer les sections suivantes :
- A propos de moi :
    Ecrivez une courte introduction, par exemple : "Entrepreneur technologique et ingenieur concentre sur l'expansion multi-planetaire, l'energie durable et l'intelligence artificielle."
- Domaines de concentration :
    Listez Ingenierie des systemes spatiaux, Architecture de colonisation de Mars, Interfaces cerveau-machine.
- Plans visionnaires et livres blancs :
    C'est la section cle. Referez-vous au style de liste dans l'image d'exemple, mais convertissez-le en style fond noir.
    Creez une liste affichant ses importants plans techniques, en utilisant des bordures rouges ou des effets de lumiere pour distinguer chaque element.
    Element 1 : "Making Humans a Multi-Planetary Species" (Architecture Starship, 2017).
    Element 2 : "Hyperloop Alpha" (Proposition de transport a grande vitesse, 2013).
    Element 3 : "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Realisations notables :
    Listez brievement des jalons comme :
    Premierne fusee a propergol liquide privee a atteindre l'orbite (Falcon 1)
    Premierne fusee orbitale reutilisable (Falcon 9)

4. Exigences de detail de style
Tous les titres de section a droite, comme "A propos de moi," doivent utiliser le meme style rouge lumineux que le texte "ELON MUSK" a gauche.
Assurez-vous que toute la page reste responsive et preserve une bonne mise en page a deux colonnes sur differentes tailles d'ecran.
```

Rafraichissez le navigateur apres cela, et votre page academique cyberpunk est terminee. Bien sûr, vous pouvez continuer a l'ameliorer selon vos propres preferences. Comme dans les etapes precedentes, vous n'avez qu'a dire clairement l'objectif a Trae, et il gerera le processus de codage fastidieux pour vous.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 Comment deployer le site construit a la main

Contrairement au modele forke precedemment, qui provenait du depot de quelqu'un d'autre, ce projet est nouvellement cree par vous et n'a pas encore d'emplacement GitHub correspondant. Nous devons donc le lier manuellement.

**Etape 1 : Creer un nouveau depot sur GitHub**

1. Connectez-vous a GitHub dans le navigateur.
2. Cliquez sur l'icone **+** dans le coin superieur droit, puis **New repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **Nom du depot** : entrez `mars-profile`, ou tout autre nom que vous aimez.

**Note** :
Si vous avez deja utilise **`votre-nom-utilisateur.github.io`**, vous ne pouvez pas reutiliser ce nom ici. Vous pouvez choisir un autre nom, et GitHub generera alors une URL comme **`votre-nom-utilisateur.github.io/mars-link`**.

4. **Public / Prive** : choisissez **Public**.
5. **Ne cochez pas "Add a README file" !**
   Laissez les autres options par defaut.
6. Cliquez sur **Create repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**Etape 2 : Pousser le code local vers le cloud**

Apres la creation, GitHub vous amenera a une page avec beaucoup de contenu ressemblant a du code. Ne vous inquietez pas. Nous avons juste besoin de copier le lien du depot affiche sur cette page.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Retournez dans Trae et tapez dans le chat :

```markdown
J'ai cree un depot vide sur GitHub. L'adresse est : https://github.com/votre-nom-utilisateur/mars-link.git (veuillez remplacer ceci par l'adresse reelle du depot que vous venez de creer).
Maintenant aidez-moi a initialiser le projet local actuel comme un depot Git et a pousser le code vers la branche `main` de cette adresse distante.
```

Trae aidera generalement a executer la sequence standard ci-dessous, et vous n'aurez peut-etre qu'a cliquer pour les executer :

1. `git init`
2. `git add .` et `git commit -m "First commit"`
3. `git branch -M main` et `git remote add origin [votre adresse]`
4. `git push -u origin main`

Apres que Trae a termine le push, retournez sur GitHub et rafraichissez la page. Cliquez sur l'onglet **Code**, et vous verrez que le code ecrit dans Trae a ete pousse avec succes dans le depot.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**Etape 3 : Activer GitHub Pages**

Apres que le code est pousse, la page web n'apparaitra pas automatiquement. Nous devons encore allumer l'interrupteur manuellement :

1. Retournez sur la page du depot GitHub et cliquez sur **Settings** en haut.
2. Cliquez sur **Pages** dans la barre laterale gauche.
3. Sous **Build and deployment** :
   1. Definissez **Source** sur `Deploy from a branch`.
   2. Definissez **Branch** sur `main`, et choisissez `/(root)` comme dossier.
4. Cliquez sur **Save**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Apres avoir clique sur Save, la page web n'apparaitra pas instantanement. L'infrastructure de GitHub fonctionne comme une petite usine de robots. Elle a besoin d'environ **1 a 2 minutes** pour empaqueter votre code, le construire et le publier sur des serveurs mondiaux.

Attendez patiemment et rafraichissez la page. Sous le grand titre **GitHub Pages**, vous verrez une ligne avec une URL similaire a :
**"Your site is live at `https://votre-nom-utilisateur.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

Cliquez dessus, et votre centre de commandement Mars est en ligne.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. Derniers mots

Le tutoriel est termine. Maintenant, quand vous regardez le `.github.io` qui brille dans la barre d'adresse de votre navigateur, avez-vous l'impression d'avoir un peu plante un drapeau sur Internet ?

Dans ce tutoriel, nous avons emprunte le personnage d'Elon Musk et construit un site web comme un projet Lego qui a l'air plutot impressionnant. Mais ce n'est que le debut. La partie la plus charmante du Vibe Coding n'est pas le temps de frappe qu'il economise. C'est qu'il **demolit completement le mur entre "idee" et "realite."**

Auparavant, vous auriez pu renoncer a montrer un projet parce que **vous ne saviez pas ecrire du CSS**.
Maintenant, les seules limites qui restent sont votre **imagination** et votre **gout**.

**Ne laissez pas ce site rester un "clone inspire de Musk."**
Ce lien Tesla que vous avez utilise pour vous entrainer et ce livre blanc sur la colonisation de Mars sont au final l'histoire de quelqu'un d'autre. Votre page personnelle devrait etre votre propre carte de visite dans le monde numerique.

Allez mettre votre premiere veritable experience de projet la-bas.
Allez publier vos propres reflexions uniques sur un sujet technique.
Vous pouvez meme y mettre votre liste de livres preferes ou vos propres photos.
Des pensees qui seraient enterrees sur les Moments WeChat peuvent rester ici permanentment.
Une passion qui ne rentre pas dans un CV peut se repandre librement ici.

Ne laissez pas ce terrain vide.
Allez experimenter. Allez le casser. Allez le reconstruire.
Continuez a faire ca jusqu'a ce qu'il atteigne la forme que vous aimez le plus.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***Allez-y, et laissez le monde vous voir.***

# References

CSDN : [Tutoriel de niveau nounou le plus recent de 2025 : etape par etape pour utiliser GitHub pour construire une page personnelle](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN : [Tutoriel de telechargement et d'installation de Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN : [Tutoriel d'installation de Ruby sous Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
