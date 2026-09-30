# Mettez votre site en ligne (facile) : déploiement PaaS en un clic

> 💡 **Que signifie « mettre un site en ligne » ?** On parle aussi de « mise en production » ou de « déploiement/publication ». Un site web construit sur votre propre ordinateur ne peut être ouvert que par vous. **Mettre un site en ligne signifie le placer sur un serveur qui fonctionne 24h/24, afin que n'importe qui puisse saisir une URL dans son navigateur et le visiter** — un peu comme un document Word que vous seul pouvez lire devient visible par tous une fois publié sur un blog ; la différence, c'est que cette fois vous publiez un site web complet.

Dans ce tutoriel, nous allons voir **la façon la plus simple de mettre un site en ligne — pas de serveur à acheter, pas de DevOps à apprendre**. Connectez simplement votre dépôt GitHub, cliquez sur quelques boutons, et votre site est en ligne. Nous présentons quatre plateformes populaires : **Tencent Cloud CloudBase**, **Vercel**, **Netlify** et **Zeabur**.

# Pourquoi utiliser une plateforme PaaS plutôt que monter son propre serveur ?

Vous vous demandez peut-être : si tout finit « sur un serveur », pourquoi ne pas acheter votre propre serveur et y déployer ? La réponse : **les plateformes gèrent tous les aspects pénibles à votre place**.

Un déploiement manuel nécessite souvent plusieurs étapes, chacune pouvant comporter des pièges. Les étapes clés courantes incluent :

1. **Préparation du serveur** : vous devez d'abord acheter un serveur cloud (comme Alibaba Cloud, Tencent Cloud, ou AWS EC2), choisir la région du serveur (Shanghai, Singapour, etc.), sa configuration (CPU, mémoire, taille du disque, etc.), et apprendre à vous y connecter à distance (par exemple via SSH).
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **Configuration de l'environnement** : une application web a besoin d'un « environnement » spécifique pour fonctionner — par exemple, exécuter un projet Node.js nécessite d'abord installer Node.js ; exécuter un projet Python nécessite d'installer Python et les bibliothèques tierces correspondantes. Si la version de l'environnement ne correspond pas, le programme peut générer des erreurs ou ne pas démarrer.
3. **Téléchargement des ressources** : vous devez uploader votre code et vos ressources locales vers le serveur, généralement via FTP ou Git. Si le projet est volumineux (contenant par exemple des fichiers vidéo), une interruption en cours de route peut nécessiter un re-upload complet.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **Démarrage du service et tests** : une fois l'upload terminé, vous devez exécuter des commandes sur le serveur pour lancer l'application, et vérifier si « l'adresse réseau attribuée est accessible ». Si ce n'est pas le cas, cela peut être dû au pare-feu du serveur qui n'a pas ouvert le port correspondant (par exemple, votre application écoute le port 3000, mais ce port est bloqué par le pare-feu), ou à un bug dans le programme. Il faut alors consulter les journaux du serveur pour diagnostiquer le problème.
   > On peut comprendre le port comme le « numéro de chambre » distinguant les différentes applications sur un même appareil, tandis que l'IP est le « numéro de rue » de cet appareil. L'IP et le port combinés (IP:port) permettent de localiser précisément un service réseau.
5. **Maintenance et mises à jour** : à chaque modification de code, vous devez re-uploader et redémarrer le service. En cas de panne du serveur (coupure de courant, panne réseau, etc.), vous devez redémarrer manuellement l'application, et parfois configurer un « outil de garde de processus » pour que le programme redémarre automatiquement après une sortie anormale.

Des plateformes de déploiement « low-code » comme CloudBase, Vercel et Zeabur sont précisément nées pour résoudre ces problèmes complexes. Elles automatisent pour vous les étapes « achat de serveur, configuration d'environnement, upload de code, démarrage du service, surveillance de l'exécution ». Il vous suffit de connecter votre dépôt de code (comme GitHub ou GitLab) à la plateforme, ou d'uploader directement votre code, et elle tirera automatiquement le code, identifiera le type d'application, configurera l'environnement d'exécution correspondant, et vous donnera finalement une adresse publique accessible par tous. Elle peut même lier votre propre nom de domaine en un clic.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.webp)

Ensuite, nous présenterons les caractéristiques et méthodes d'utilisation de ces plateformes pour vous aider à choisir la solution de déploiement la plus adaptée.

---

# Comparaison des plateformes de déploiement

| Plateforme | Caractéristiques | Scénarios d'utilisation | Quota gratuit |
|------|------|----------|----------|
| **Tencent CloudBase** | Accès rapide en Chine, intégration profonde avec l'écosystème WeChat | Projets principalement destinés aux utilisateurs chinois, nécessitant le support des mini-programmes WeChat | Quota gratuit disponible |
| **Vercel** | Bon support des frameworks frontend, intégration étroite avec GitHub | Projets frontend modernes comme React/Vue/Next.js | Quota gratuit disponible |
| **Netlify** | Fonctionnalités complètes, support du traitement de formulaires et de l'authentification, bonne intégration Git | Sites statiques nécessitant des fonctionnalités avancées comme le traitement de formulaires, l'authentification | Quota gratuit disponible |
| **Zeabur** | Support de multiples langages et templates de services, configuration flexible | Projets complexes nécessitant le déploiement de multiples services (comme Dify, n8n) | Environ 5 USD de quota gratuit par mois |

---

# 1. Tencent CloudBase

Tencent CloudBase (Cloud Development) est un service cloud backend tout-en-un proposé par Tencent Cloud, particulièrement adapté aux développeurs en Chine. Ses avantages sont :

- **Accès rapide en Chine** : serveurs situés en Chine, faible latence d'accès
- **Intégration avec l'écosystème WeChat** : connexion facile avec les mini-programmes et comptes officiels WeChat
- **Solution tout-en-un** : fournit un ensemble complet de services incluant l'hébergement de sites statiques, fonctions cloud, base de données, stockage, etc.
- **Quota gratuit généreux** : les développeurs individuels disposent de ressources gratuites suffisantes

## Déployer une application web avec CloudBase

### Étape 1 : Inscription et connexion

Accédez à la [console Tencent CloudBase](https://console.cloud.tencent.com/tcb) et connectez-vous avec WeChat ou QQ.

### Étape 2 : Créer un environnement

Cliquez sur « Nouvel environnement » et choisissez un nom d'environnement (comme `my-web-app`).

> **Note** : La version d'essai gratuite de CloudBase nécessite un code d'échange pour être activée. Vous devez suivre le compte officiel Tencent CloudBase, saisir «领取兑换码» dans le compte officiel pour obtenir le code d'échange de la version d'essai gratuite, puis remplir ce code lors de la création de l'environnement pour activer l'environnement gratuit (la période d'essai gratuite est de 6 mois).

### Étape 3 : Activer l'hébergement de sites statiques

Dans la page de gestion de l'environnement, trouvez la fonctionnalité « Hébergement de sites statiques » et activez-la. Une fois activée, vous obtiendrez un domaine d'accès par défaut.

L'hébergement de sites statiques de CloudBase propose plusieurs méthodes de déploiement, similaires à Zeabur :

- **Upload de projet local** : uploader directement les fichiers statiques construits (HTML, CSS, JS, etc.) depuis le local
- **Déploiement par template** : créer rapidement un projet en utilisant des templates prédéfinis, comme les templates d'application web React ou Vue
- **Déploiement depuis un dépôt Git** : supporte le pull automatique de code depuis des dépôts comme GitHub et le déploiement

### Étape 4 : Déployer le code

Dans la page d'hébergement de sites statiques, CloudBase propose trois méthodes de déploiement :

**Méthode 1 : Déploiement de projet local (upload de projet local)**
- Sélectionnez « Déploiement de projet local » dans la console
- Uploadez directement les fichiers statiques construits (HTML, CSS, JS, etc.)
- Sélectionnez le dossier de votre projet construit localement (comme le répertoire `dist` ou `build`)
- Attendez la fin de l'upload pour accéder au site

**Méthode 2 : Déploiement par template**
- Créez rapidement un projet en utilisant des templates prédéfinis
- Supporte les templates d'application web React, Vue, etc.
- Construction et déploiement automatiques basés sur le template

**Méthode 3 : Déploiement depuis un dépôt Git**
- **Déploiement de dépôt personnel Git** : liez votre dépôt de code personnel GitHub, etc.
- **Déploiement de dépôt public** : supporte le pull de code depuis des dépôts Git publics
- Configurez les commandes de build automatique (comme `npm run build`)
- Chaque push de code déclenche un redéploiement automatique

> **Astuce** : vous pouvez aussi utiliser l'outil CLI pour le déploiement :
> ```bash
> # Installer le CLI CloudBase
> npm install -g @cloudbase/cli
> # Connexion
> tcb login
> # Déploiement
> tcb hosting deploy ./dist -e your-env-id
> ```

### Étape 5 : Configurer un domaine personnalisé (optionnel)

Dans les paramètres d'hébergement de sites statiques, vous pouvez lier votre propre domaine et demander un certificat HTTPS gratuit.

---

# 2. Vercel

Vercel est l'une des plateformes de déploiement frontend les plus populaires au monde, particulièrement adaptée au déploiement de projets utilisant des frameworks frontend modernes comme React, Vue, Next.js. Ses caractéristiques incluent :

- **Intégration profonde avec GitHub** : un push de code déclenche un déploiement automatique
- **Prévisualisation automatique** : chaque Pull Request génère un lien de prévisualisation indépendant
- **CDN mondial** : le site est automatiquement distribué sur des nœuds worldwide, accès rapide
- **Fonctions Serverless** : supporte l'écriture d'API backend dans le projet

> **Note** : l'accès à Vercel peut être instable dans certains environnements réseau. Les utilisateurs en Chine sont invités à privilégier CloudBase.

## Déployer une application web avec Vercel

### Étape 1 : Créer un compte

Accédez au [site officiel de Vercel](https://vercel.com) et connectez-vous avec votre compte GitHub.

### Étape 2 : Importer le projet

1. Cliquez sur « Add New Project »
2. Sélectionnez le dépôt GitHub que vous souhaitez déployer
3. Si vous ne voyez pas le dépôt souhaité, cliquez sur « Adjust GitHub App Permissions » pour autoriser l'accès

### Étape 3 : Configurer les paramètres de build

Vercel identifiera automatiquement le type de projet et configurera les commandes de build :

| Framework | Commande de build | Répertoire de sortie |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| HTML pur | - | Répertoire racine du projet |

Si l'identification automatique n'est pas correcte, vous pouvez modifier manuellement :
- **Build Command** : commande de build, comme `npm run build`
- **Output Directory** : répertoire de sortie du build, comme `dist` ou `build`
- **Install Command** : commande d'installation des dépendances, généralement `npm install`

### Étape 4 : Déployer

Cliquez sur le bouton « Deploy » et attendez la fin du build. Une fois le build réussi, vous obtiendrez un domaine `xxx.vercel.app`.

### Étape 5 : Domaine personnalisé (optionnel)

Dans la page « Domains » des paramètres du projet, vous pouvez ajouter votre propre domaine. Vercel configurera automatiquement le HTTPS.

---

# 3. Netlify

Netlify est une autre plateforme de déploiement frontend très populaire, similaire à Vercel, particulièrement adaptée au déploiement de sites statiques et d'applications à page unique (SPA). Ses caractéristiques incluent :

- **Fonctionnalités complètes** : outre l'hébergement de sites statiques, supporte le traitement de formulaires, l'authentification, les fonctions edge, etc.
- **Intégration profonde avec Git** : supporte GitHub, GitLab, Bitbucket ; un push de code déclenche le déploiement automatique
- **Prévisualisation par branche** : chaque branche génère automatiquement un lien de prévisualisation indépendant
- **CDN mondial** : le site est automatiquement distribué sur des nœuds worldwide, accès rapide
- **Traitement de formulaires** : traite les soumissions de formulaires sans code backend
- **Authentification** : fonctionnalité d'authentification utilisateur intégrée, pour implémenter rapidement connexion/inscription

> **Note** : la vitesse d'accès à Netlify depuis la Chine peut être inférieure à celle de CloudBase. Recommandé principalement pour les projets ciblant des utilisateurs internationaux.

## Déployer une application web avec Netlify

### Étape 1 : Créer un compte

Accédez au [site officiel de Netlify](https://www.netlify.com) et cliquez sur « Sign up » pour vous inscrire. Vous pouvez utiliser GitHub, GitLab, Bitbucket ou un email.

### Étape 2 : Importer le projet

1. Après connexion, cliquez sur « Add new site » -> « Import an existing project »
2. Sélectionnez votre plateforme d'hébergement de code (comme GitHub)
3. Autorisez Netlify à accéder à vos dépôts
4. Sélectionnez dans la liste le dépôt que vous souhaitez déployer

### Étape 3 : Configurer les paramètres de build

Netlify identifiera automatiquement les frameworks frontend courants et configurera les paramètres de build :

| Framework | Commande de build | Répertoire de publication |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<nom-du-projet>` |
| Next.js | `next build` | `out` |
| HTML pur | - | `.` (répertoire racine du projet) |

Si l'identification automatique n'est pas correcte, vous pouvez configurer manuellement :
- **Build command** : commande de build, comme `npm run build`
- **Publish directory** : répertoire de sortie du build, comme `dist` ou `build`

### Étape 4 : Déployer

Cliquez sur le bouton « Deploy site » et attendez la fin du build. Une fois le build réussi, vous obtiendrez un domaine `xxx.netlify.app`, accessible par tous.

### Étape 5 : Configurer un domaine personnalisé (optionnel)

1. Accédez aux paramètres du site, cliquez sur « Domain management »
2. Cliquez sur « Add custom domain »
3. Saisissez votre domaine et configurez les enregistrements DNS selon les instructions
4. Netlify demandera et configurera automatiquement un certificat HTTPS

### Fonctionnalités spéciales

#### 1. Traitement de formulaires

Netlify offre une fonctionnalité très pratique : le traitement des soumissions de formulaires sans code backend.

Il suffit d'ajouter l'attribut `netlify` au formulaire HTML :

```html
<form name="contact" netlify>
  <p>
    <label>Nom : <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email : <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Message : <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Envoyer</button>
  </p>
</form>
```

Après déploiement, les données soumises via le formulaire seront automatiquement envoyées au tableau de bord Netlify. Vous pouvez consulter toutes les soumissions dans la page « Forms », configurer des notifications par email ou transférer les données vers d'autres services.

#### 2. Netlify Functions (fonctions edge)

Netlify supporte le déploiement de fonctions serverless, vous permettant d'implémenter des API simples sans configurer un serveur backend complet. Vous pouvez écrire des fonctions en JavaScript ou TypeScript ; une fois déployées, elles obtiendront automatiquement une URL accessible.

Par exemple, créez un fichier `hello.js` :

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

Après déploiement, vous pouvez accéder à cette fonction via `https://votre-domaine/.netlify/functions/hello`.

#### 3. Support du développement local

Netlify fournit un outil CLI pour faciliter le développement et les tests en local :

```bash
# Installer le CLI Netlify
npm install -g netlify-cli

# Connexion au compte
netlify login

# Démarrer le serveur de développement local
netlify dev

# Tester les fonctions en local
netlify functions:serve
```

L'outil CLI permet de simuler l'environnement Netlify en local, y compris la soumission de formulaires, l'appel de fonctions, etc., facilitant les tests avant le déploiement.

---

# 4. Zeabur

Zeabur est une plateforme de déploiement émergente, particulièrement adaptée aux projets complexes nécessitant le déploiement de multiples services. Ses avantages sont :

- **Templates de services riches** : templates intégrés pour Dify, n8n, bases de données et bien d'autres services
- **Support de multiples méthodes de déploiement** : GitHub, templates, images Docker, projets locaux, etc.
- **Combinaison flexible de services** : possibilité de déployer plusieurs services interconnectés dans un seul projet
- **Facturation à l'usage** : payez uniquement ce que vous consommez, adapté aux projets expérimentaux

## Déployer Dify avec Zeabur

Dans les cours précédents, nous avons brièvement découvert Dify. Maintenant, nous pouvons lancer très facilement notre propre service Dify via [Zeabur](https://zeabur.com/projects). Commencez par ouvrir la [page de la console](https://zeabur.com/projects) et examinons les différentes zones.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.webp)

Sur cette page, vous verrez d'abord plusieurs blocs : ce sont les services déjà lancés. Dans le menu supérieur, vous verrez les options Agent, Servers, Docs, Templates, qui représentent respectivement :

1. **Agent** : ouvre l'assistant intelligent (Agent) intégré à Zeabur, à qui vous pouvez poser des questions sur les opérations ou consulter l'état actuel du serveur.
2. **Servers** : ici vous pouvez ajouter vos propres serveurs cloud achetés, ou acheter directement des serveurs via Zeabur.
3. **Docs** : consulter la documentation complète de Zeabur.
4. **Templates** : liste de tous les templates d'images intégrés.

> L'« image (Image) » mentionnée ici peut être comprise comme une « archive contenant le code et l'environnement d'exécution ». Quand un service a été exécuté avec succès sur un serveur, nous pouvons choisir d'empaqueter « cet environnement d'exécution + le code » en une image. Ensuite, sur tout nouveau serveur, il suffit de décompresser et d'exécuter cette archive pour que le service fonctionne directement, sans reconfigurer l'environnement et le code.

En haut à droite de la page, vous verrez également votre solde. Par défaut, vous disposez d'environ 5 USD de quota gratuit par mois. Vous pouvez ignorer les détails de facturation pour le moment ; retenez simplement que tant que le serveur est en cours d'exécution, le quota est consommé.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image6.png)

Cliquez sur le solde pour voir le détail des consommations quotidiennes.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image7.png)

Maintenant, créons notre propre service Dify. Tout d'abord, sur la [page d'accueil de la console](https://zeabur.com/projects), cliquez sur « New Project ».

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

Voici l'explication des différentes méthodes de création :

1. **GitHub**
   Permet de se connecter à votre compte GitHub. Une fois lié, vous pouvez sélectionner directement un projet depuis vos dépôts GitHub pour le déployer (GitHub est actuellement la plus grande plateforme d'hébergement de code au monde).
2. **Template (modèle)**
   Permet de déployer un service basé sur un template. Zeabur intègre de nombreux templates de projets prédéfinis (comme Dify, n8n, etc.), vous permettant de créer et déployer rapidement une application à partir de ces templates.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)
3. **Databases (bases de données)**
   Pour déployer des services de base de données, comme MySQL, MongoDB et d'autres bases de données courantes.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image10.png)
4. **Functions (fonctions)**
   Permet de déployer des services de fonctions. Vous pouvez écrire du code JavaScript ou Python qui sera appelé sous forme de fonctions.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image11.png)

   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image12.png)

5. **Local Project (projet local)**
   Uploadez un dossier local, Zeabur identifiera automatiquement les scripts de démarrage. Idéal pour déployer rapidement sur Zeabur un projet déjà développé localement.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image13.png)
6. **Docker Image**
   Déployez une image Docker déjà empaquetée. Si votre projet a été transformé en image Docker (par exemple stockée sur Docker Hub ou un autre registre d'images), vous pouvez la déployer directement ici.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image14.png)
7. **Cursor**
   Si vous avez installé Cursor (par exemple Cursor IDE), vous pouvez déployer directement un projet depuis Cursor vers Zeabur via cette entrée.

Si vous souhaitez déployer votre propre service Dify, il est recommandé de choisir le mode **Template**, puis de saisir « dify » dans la barre de recherche. Vous verrez de nombreuses versions maintenues par différents auteurs ; vous pouvez en choisir une (par exemple la version v1.6.0).

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

Ensuite, saisissez n'importe quel nom. Zeabur générera un domaine personnalisé temporaire basé sur ce nom. Ensuite, tout le monde pourra accéder à votre service via cette URL.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

Une fois la création terminée, vous verrez plusieurs programmes (services) démarrer successivement. Soyez patient et attendez que tous les services atteignent l'état « démarré ». (Le service Dify est composé de plusieurs programmes, chacun responsable de fonctionnalités différentes, qui collaborent entre eux.)

En général, il vous suffit de cliquer sur l'application Dify à gauche pour voir l'adresse d'accès par défaut. Mais dans cet exemple, comme il y a une couche nginx supplémentaire devant, vous devez cliquer sur le service nginx pour obtenir l'adresse d'accès finale. On peut comprendre nginx comme le programme principal responsable de « recevoir et distribuer les requêtes » vers l'extérieur : il répartit les adresses d'accès externes vers les différents services internes. Cliquez sur Nginx à gauche, et dans la page de détails vous verrez l'adresse actuelle du service. Ouvrez cette adresse dans votre navigateur et attendez que le service soit complètement démarré.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

Après quelques instants, vous verrez l'interface de connexion de Dify. Saisissez votre adresse email et votre mot de passe d'inscription, et vous pouvez commencer à utiliser votre propre service Dify.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

Si vous êtes curieux, vous pouvez aussi en profiter pour lancer un service n8n. n8n est également une plateforme de workflows AI très populaire à l'international.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image19.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image20.webp)

## Déployer un jeu de serpent avec Zeabur et Trae

Dans cette prochaine partie du tutoriel, nous allons découvrir des utilisations plus avancées de Zeabur. Nous commencerons par générer un petit jeu de serpent avec Trae, puis le déploierons sur le serveur de Zeabur, en configurant un lien publiquement accessible pour que tout le monde puisse ouvrir votre jeu.

La première étape consiste à créer un projet de jeu de serpent localement avec Trae.

### Implémentation avec le framework HTML

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.webp)

Pour Trae, générer un jeu web de serpent basé sur HTML est très simple. Une fois le jeu généré, il vous suffit de suivre la méthode de déploiement local de Zeabur présentée précédemment pour uploader le dossier contenant tous les fichiers.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image24.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image25.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image26.png)

Une fois terminé, vous accéderez à l'interface de détails du service :

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.webp)

Cliquez sur l'option « Network » à gauche, et trouvez la zone « Public Address » dans la page. Cliquez sur « Generate Domain » pour générer une adresse d'accès externe. Vous pouvez saisir n'importe quel nom de votre choix.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

Une fois la génération terminée, il suffit d'ouvrir cette adresse dans votre navigateur pour jouer à votre propre jeu de serpent. Les autres applications web de type HTML peuvent être déployées exactement de la même manière.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### Implémentation avec le framework React

Précédemment, nous avons appris à déployer des applications web basées sur HTML. Ensuite, essayons de déployer une application utilisant un framework frontend plus courant : React. Comparé au HTML pur, React est considéré comme un framework de développement frontend plus mature et moderne. Il organise la structure des pages de manière componentisée, accélérant significativement le développement de pages complexes. C'est un choix très mainstream dans les projets de niveau entreprise.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.webp)

#### Refactoriser en architecture React

Dans Trae, il vous suffit de dire à l'Agent : « Aidez-moi à refactoriser ce code en architecture React », pour transformer assez facilement la structure basée sur HTML en un projet React.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image32.webp)

Cependant, comparé à de simples fichiers HTML, les applications React dépendent d'outils de build et de structures de projet plus complexes, ce qui rend le processus de déploiement un peu plus compliqué. Un problème typique concerne la configuration des ports : par défaut, une application React écoute généralement le port 3000 (vous pouvez le voir dans les fichiers de configuration ou les journaux de démarrage).

Cependant, un tel déploiement échouera sur Zeabur — car Zeabur ne supporte que les applications qui écoutent le port 8080. Autrement dit, pour que l'application React fonctionne correctement sur Zeabur, nous devons d'abord changer le port d'écoute par défaut de 3000 à 8080.

Pour effectuer correctement cette configuration, nous devons d'abord clarifier deux concepts : qu'est-ce qu'un « port (Port) », et que signifie « port d'écoute (Listening Port) ».

#### Qu'est-ce qu'un port ?

> En informatique réseau, un port peut être compris comme un « point de communication logique » servant à distinguer les différents services réseau s'exécutant sur un même appareil. Pour faire une analogie simple, si l'adresse IP est comme un « numéro de rue » (par exemple 162.128.1.1), alors le numéro de port est comme le « numéro de chambre » des différents locaux dans cet immeuble — chaque chambre correspond à un service (par exemple un serveur web, un service de messagerie, ou votre application React).
>
> Le numéro de port est représenté par un entier 16 bits, avec une plage de valeurs de 0 à 65535.

Si vous ne souhaitez pas retenir ces détails, retenez simplement : le port est une partie nécessaire de la constitution d'une « adresse d'accès réseau ».

Quand nous accédons à des sites web ou des adresses IP, nous ne saisissons généralement pas manuellement le numéro de port, car le port par défaut du web est 80 ou 443 (HTTPS). La plupart des navigateurs utilisent automatiquement ces ports standards. Pour certains ports spéciaux, comme le port 3000 par défaut de React ou le port 8080 requis par Zeabur, nous devons ajouter `:3000` ou `:8080` après l'adresse pour accéder au contenu correspondant.

#### Qu'est-ce que le « port d'écoute » ?

> Le « port d'écoute » désigne le port qu'un programme « ouvre et surveille » activement sur un appareil. Quand une application définit un port d'écoute, elle indique en fait au système d'exploitation : « Je vais attendre des requêtes réseau sur ce port en permanence — dès qu'une requête arrive, transférez-la-moi. »

Pour comprendre de manière plus imagée : imaginez que votre ordinateur est un immeuble de bureaux, l'adresse IP est l'adresse de cet immeuble. L'immeuble abrite de nombreuses entreprises ou départements, occupant différentes chambres, dont les numéros sont les numéros de port.

Quand le serveur de développement React par défaut démarre, il « ouvre » la porte d'une chambre et y place une « réception » — le numéro de cette chambre est son port d'écoute : 3000.

Parallèlement, le programme React indique à la « gestion de l'immeuble » (le système d'exploitation) : « Je suis dans la chambre 3000, veuillez me transférer tout le courrier (requêtes réseau) adressé au 3000. »

Ainsi, quand vous accédez au site React, la requête arrive d'abord à l'immeuble ; la gestion voit que la requête est destinée à la chambre 3000 et la transmet immédiatement à la « réception » de React, qui la traite et renvoie le résultat — c'est le processus d'accès à l'application React.

Quand vous exécutez `npm start` localement (commande par défaut pour démarrer le serveur de développement React, également exécutable depuis la barre latérale de l'Agent Vibe Coding), le serveur de développement React définit automatiquement le port d'écoute sur 3000.
Or, la conception de la plateforme Zeabur fait qu'elle ne « reconnaît » que les applications écoutant le port 8080. Si votre application React utilise toujours le port 3000 par défaut, Zeabur ne pourra pas transférer correctement les requêtes vers votre application, ce qui entraînera l'échec du déploiement.

#### Modifier le port d'écoute par défaut

Pour remplacer le port d'écoute par défaut de React (3000) par le port 8080 requis par Zeabur, il existe plusieurs méthodes. La plus simple est de donner directement cette instruction à l'Agent dans Trae : « Aidez-moi à changer le port par défaut de ce projet React en 8080. » Trae modifiera les fichiers de configuration correspondants dans le projet. Une fois la modification effectuée, il vous suffit de reconstruire le projet et de l'uploader sur Zeabur comme précédemment.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

Dans les paramètres réseau, spécifiez une URL d'accès, de la même manière que pour le déploiement d'un projet HTML, et vous pourrez lancer la version React du service.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

Pour les autres programmes nécessitant une modification du numéro de port, vous pouvez adopter la même approche : modifier d'abord le port par défaut, puis uploader sur Zeabur pour le déploiement. Vous maîtrisez désormais les compétences de base pour déployer des applications web courantes sur un serveur.

Vous pouvez essayer de faire construire par Trae différents types d'applications et les déployer sur le serveur par défaut de Zeabur. Dans les cours suivants, nous apprendrons également comment déployer des applications sur des serveurs cloud que vous avez achetés vous-même.

---

# Comment arrêter et supprimer un projet (Zeabur)

Étant donné que l'activation des ressources liées aux serveurs génère des coûts, il est important de prendre l'habitude de « fermer les services inutilisés en temps opportun » pour éviter d'épuiser votre quota gratuit mensuel.

Pour trouver l'interface de gestion du projet, cliquez d'abord sur l'option « Settings » du projet.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.webp)

Sur la page des paramètres, faites défiler jusqu'en bas et vous verrez une interface similaire à celle-ci :

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

Vous pouvez cliquer sur « Suspend All Services » pour suspendre tous les services et réduire les coûts ; si un service rencontre un problème, vous pouvez cliquer sur « Restart All Services » pour redémarrer tous les services. Si vous êtes sûr de ne plus avoir besoin de ce projet, vous pouvez cliquer sur « Delete Project » pour le supprimer définitivement.

---

# Résumé

Dans ce tutoriel, nous avons présenté quatre plateformes de déploiement d'applications web courantes :

1. **Tencent CloudBase** : adapté aux utilisateurs en Chine, accès rapide, bonne intégration avec l'écosystème WeChat
2. **Vercel** : adapté aux projets utilisant des frameworks frontend modernes, intégration étroite avec GitHub, accélération CDN mondiale
3. **Netlify** : fonctionnalités complètes, support du traitement de formulaires et de l'authentification, adapté aux sites statiques nécessitant des fonctionnalités avancées
4. **Zeabur** : adapté aux projets complexes, templates de services riches, support de multiples méthodes de déploiement

Le choix de la plateforme dépend de vos besoins spécifiques :
- Si vous ciblez principalement les utilisateurs en Chine, recommandez **CloudBase**
- Si vous utilisez des frameworks comme React/Next.js, recommandez **Vercel** ou **Netlify**
- Si vous avez besoin de fonctionnalités avancées comme le traitement de formulaires, l'authentification, recommandez **Netlify**
- Si vous devez déployer des services comme Dify, n8n, recommandez **Zeabur**

Quel que soit le choix de la plateforme, le processus principal de déploiement est similaire : préparer le code -> choisir la plateforme -> configurer les paramètres de build -> déployer en ligne. Une fois ces compétences maîtrisées, vous pourrez partager vos applications développées avec le monde entier !
