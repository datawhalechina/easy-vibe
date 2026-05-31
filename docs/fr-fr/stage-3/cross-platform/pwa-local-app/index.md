# Comment construire une application PWA locale : transformer un site web en "vraie application"

# 1 Qu'est-ce qu'une PWA et le développement PWA

Dans ce tutoriel, nous allons accomplir une boucle complète : **d'un projet web ordinaire à une "vraie application" qui peut être installée sur le bureau et l'écran d'accueil d'un téléphone et qui fonctionne toujours hors ligne.** Vous allez transformer vous-même une application React en PWA, la déployer en ligne et l'installer sur votre téléphone pour la tester.

Ce que nous allons construire est une application **Tomato Farm** - une PWA qui combine parfaitement la technique Pomodoro avec un jeu de ferme. Vous gagnez des points grâce à 25 minutes de travail concentré, puis vous utilisez ces points pour acheter des graines et planter des cultures. À mesure que votre niveau augmente, vous débloquez plus de terres agricoles et de meilleures graines. Plus important encore, elle continue de fonctionner sans connexion internet, et toutes les données sont stockées localement.

Pour ce tutoriel, vous devez au moins disposer de :

- Un ordinateur (Windows ou Mac)
- Un environnement Node.js (version 18.0 ou supérieure)
- Votre assistant de codage IA (Cursor / Trae / Claude Code, etc.)
- Un téléphone (pour tester l'installation mobile)

## 1.1 Définition d'une PWA

**PWA (Progressive Web App)** est un type spécial de site web. Grâce à la technologie **Service Worker**, elle acquiert la capacité de "se mettre en cache et se prendre en charge elle-même."

### Pourquoi les sites web ordinaires ne peuvent pas fonctionner hors ligne, mais les PWA le peuvent

Un site web ordinaire doit télécharger les fichiers HTML, CSS et JS depuis le serveur à chaque ouverture, donc si le réseau est coupé, il ne peut tout simplement pas se charger. Une PWA, en revanche, utilise un **Service Worker** (un script JS exécuté en arrière-plan du navigateur) pour mettre en cache ces fichiers localement lors de la première visite. Après cela, même si le réseau est déconnecté, le Service Worker peut lire les fichiers directement depuis le cache local et afficher la page normalement.

**Une analogie simple** : un site web ordinaire, c'est comme emprunter un livre à la bibliothèque à chaque fois (vous devez avoir internet), tandis qu'une PWA, c'est comme acheter le livre et le mettre sur votre propre étagère (après le premier téléchargement, vous pouvez toujours le lire hors ligne).

### PWA vs Site web ordinaire vs Application native

| Fonctionnalité | Site web ordinaire | PWA | Application native |
|------|---------|-----|---------|
| **Installation** | Non nécessaire | Facultative (ajouter à l'écran d'accueil) | Doit télécharger depuis la boutique d'applications |
| **Utilisation hors ligne** | Non | Oui (après mise en cache) | Oui |
| **Méthode de mise à jour** | Rafraîchissement automatique | Mise à jour automatique / en arrière-plan | Mise à jour manuelle par l'utilisateur |
| **Taille** | Aucune | De quelques centaines de Ko à quelques Mo | Des dizaines de Mo ou plus |
| **Coût de développement** | Faible | Faible (une seule base de code) | Élevé (iOS / Android séparés) |

**Résumé en une phrase** : une PWA est "une page web qui peut stocker ses propres fichiers" - elle a la légèreté d'un site web (pas d'installation requise, mise à jour automatique) et l'expérience d'une application native (support hors ligne, installable sur le bureau/écran d'accueil).

<!-- ![](../../../../zh-cn/stage-3/cross-platform/pwa-local-app/images/image1.png) -->

## 1.2 Pourquoi choisir PWA ?

À l'ère du Vibe Coding, la PWA est l'une des solutions "multi-plateformes" les plus rentables :

| Dimension de comparaison | Application native | PWA |
|---------|---------|-----|
| Coût de développement | Doit développer iOS / Android / bureau séparément | Une seule base de code pour toutes les plateformes |
| Installation | Doit aller sur la boutique d'applications | Installation directement dans le navigateur, instantanée |
| Méthode de mise à jour | Les utilisateurs doivent mettre à jour manuellement | Mises à jour automatiques, invisibles pour l'utilisateur |
| Taille du paquet | Souvent des dizaines de Mo | Généralement seulement quelques centaines de Ko |
| Support hors ligne | Intégré naturellement | Supporté via Service Worker |
| Meilleurs scénarios | Accès matériel approfondi nécessaire (AR / Bluetooth, etc.) | Affichage de contenu, outils, applications légères |

**Résumé en une phrase** : si votre application n'a pas besoin de RA via la caméra ou d'accès Bluetooth matériel, la PWA est presque le choix le plus simple.

## 1.5 Feuille de route du tutoriel

Pour rendre le processus d'apprentissage moins ennuyeux, ce tutoriel s'articule autour d'un cas amusant et pratique - **Tomato Farm**. C'est un jeu de ferme Pomodoro qui combine le travail concentré avec des récompenses ludifiées. Avec le mode Vibe Coding des assistants de codage IA, nous décomposerons le processus de zéro à l'installation sur téléphone en une route réutilisable :

1. **Comprendre et préparer l'environnement** : comprendre ce qu'est une PWA, installer Node.js et un assistant de codage IA, et s'assurer que la chaîne d'outils fonctionne.
2. **Construire le squelette du projet** : créer un projet React + TypeScript qui peut fonctionner localement.
3. **Développement itératif avec l'IA** : par conversation avec l'IA, construire le compte à rebours Pomodoro, le système de ferme, le système de niveaux, le rendu SVG des cultures, et plus encore.
4. **Configuration PWA et test hors ligne** : ajouter le Service Worker et le Manifest, puis vérifier le support hors ligne.
5. **Déploiement et installation sur téléphone** : déployer sur Vercel pour obtenir une URL HTTPS, puis installer et l'utiliser sur un téléphone.

Cette section donne uniquement une vue d'ensemble, sans détailler les commandes exactes. Pour l'instant, retenez simplement la ligne principale : **Configuration de l'environnement -> Construction du squelette -> Description et génération par l'IA -> Configuration PWA -> Livraison par déploiement**. Dans les prochains chapitres, nous parcourrons chaque étape avec vous.

# 2 Configuration de l'environnement de développement

## 2.1 Outils utilisés dans ce tutoriel

Pendant tout le processus de développement, nous utilisons trois outils ensemble, et ils jouent les rôles de "conception," "construction" et "réception."

- **Assistant de codage IA (Cursor / Trae / Claude Code)** : c'est votre **partenaire de codage IA**. En mode Vibe Coding, nous n'avons plus besoin d'écrire du code ligne par ligne. Au lieu de cela, nous indiquons principalement à l'IA en langage naturel quelle fonctionnalité nous voulons, et elle gère la génération et la modification du code.
- **Node.js + Vite** : ce sont l'**usine de construction du projet**. Node.js fournit l'environnement d'exécution JavaScript, et Vite est un outil de construction frontend de nouvelle génération extrêmement rapide, particulièrement adapté pour construire des PWA.
- **Un téléphone** : il sert d'**appareil de test** pour vérifier le résultat de l'exécution. Vous pouvez accéder directement à la PWA déployée dans le navigateur de votre téléphone et tester l'installation réelle et la fonctionnalité hors ligne.

## 2.2 Installer Node.js

Node.js est l'environnement de base pour le développement PWA. Visitez le site officiel [https://nodejs.org](https://nodejs.org) et téléchargez la version **LTS (Support à long terme)** (ce tutoriel est basé sur Node.js 18.x ou supérieur).

Après le téléchargement, installez-le comme un logiciel ordinaire en double-cliquant sur l'installateur et en gardant les options par défaut.

Après l'installation, ouvrez le terminal (CMD / PowerShell sur Windows, Terminal sur Mac) et exécutez :

```bash
node --version
npm --version
```

Si vous voyez des sorties de version comme `v18.17.0` et `9.6.7`, l'installation est réussie.

<!-- 0 -->

## 2.3 Installer l'assistant de codage IA

L'assistant de codage IA est le champ de bataille principal du **Vibe Coding**. Vous pouvez simplement le comprendre comme un **"éditeur avec une super IA intégrée."**

**Choix recommandés :**

- **Trae** : visitez [https://www.trae.cn](https://www.trae.cn) et téléchargez la version correspondant à votre système d'exploitation
- **Cursor** : visitez [https://cursor.sh](https://cursor.sh) et installez-le
- **Claude Code** : si vous utilisez déjà Claude, vous pouvez utiliser Claude Code directement

Le processus d'installation est très simple, comme pour un logiciel normal. Après avoir préparé cet outil, dans la pratique suivante, nous n'aurons plus besoin de fixer des fenêtres de code ennuyeuses. Au lieu de cela, nous ouvrirons le projet ici et utiliserons le langage naturel dans la boîte de chat pour demander à l'IA d'écrire du code et de corriger des bugs.

<!-- 0 -->

## 2.4 Créer un nouveau projet

Ouvrez votre assistant de codage IA et entrez le Prompt suivant dans la boîte de chat :

```text
Please help me create a React project named tomato-farm-pwa for building a Tomato Farm app.
It needs to support TypeScript, and also include PWA functionality (the kind that can be installed to a phone home screen).
```

L'IA effectuera automatiquement les étapes suivantes :

**Étape 1 : Créer le projet**

```bash
npm create vite@latest tomato-farm-pwa -- --template react-ts
```

**Étape 2 : Entrer dans le projet et installer les dépendances**

```bash
cd tomato-farm-pwa
npm install
```

**Étape 3 : Installer le plugin PWA**

```bash
npm install vite-plugin-pwa -D
```

Après que l'IA a terminé, la structure de votre projet ressemblera à ceci :

```text
tomato-farm-pwa/
├── public/              # Actifs statiques (icônes, matériaux SVG vont ici)
├── src/
│   ├── App.tsx          # Composant principal
│   ├── main.tsx         # Fichier d'entrée
│   └── App.css          # Styles
├── index.html           # Entrée HTML
├── vite.config.ts       # Configuration Vite (la configuration PWA va ici)
├── package.json
└── tsconfig.json
```

## 2.5 Comprendre la structure du projet

Après la création du projet, nous devons comprendre le rôle de plusieurs fichiers clés :

| Fichier / Répertoire | Utilité |
|----------|---------|
| `src/App.tsx` | Composant principal de l'application, où la logique de la page principale est écrite |
| `src/main.tsx` | Fichier d'entrée de l'application, responsable du montage de l'application React |
| `vite.config.ts` | Fichier de configuration Vite, où la configuration PWA principale est écrite |
| `public/` | Répertoire des actifs statiques, où les icônes PWA et les matériaux SVG vont |
| `index.html` | Fichier d'entrée HTML, ne nécessite généralement pas de modification |

En tant que débutants, nous devons principalement nous soucier de trois parties :

- `App.tsx` : contrôle le comportement du programme et décide "ce qui apparaît à l'écran"
- `vite.config.ts` : configure le comportement PWA et décide "comment l'application est installée et mise en cache"
- `public/` : stocke les icônes et les actifs de l'application

## 2.6 Préparer les icônes de l'application

La PWA a besoin d'icônes avant de pouvoir être installée. Au minimum, nous avons besoin de deux images PNG aux tailles **192x192** et **512x512**.

Vous pouvez demander à l'IA de les générer :

```text
Please help me generate two app icons with sizes 192x192 and 512x512.
Use a green gradient background and draw a red tomato in the middle. Save them in the public folder.
```

Ou vous pouvez également créer vos propres icônes avec n'importe quel outil de conception (Figma, Canva) et les placer dans le répertoire `public/`.

<!-- 0 -->

## 2.7 Configurer `vite-plugin-pwa`

C'est l'étape la plus critique. Ouvrez `vite.config.ts` et demandez à l'IA de configurer le plugin PWA :

```text
Please help me change vite.config.ts into a PWA configuration so the webpage can be installed to a phone home screen:
- The app name is "Tomato Farm", with a green theme
- Use icon-192.png and icon-512.png from the public directory as icons
- Enable automatic updates
- Cache all js, css, html, and image files so the app can work offline
```

L'IA générera une configuration similaire à celle-ci :

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tomato Farm',
        short_name: 'Tomato Farm',
        description: 'Focus, plant, and grow',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

**Explication des configurations clés :**

* `registerType: 'autoUpdate'` : lorsque vous publiez une nouvelle version, l'application se mettra à jour automatiquement la prochaine fois que les utilisateurs l'ouvrent, sans opération manuelle.
* `display: 'standalone'` : après l'installation, elle s'exécute dans sa propre fenêtre, sans barre d'adresse du navigateur, et ressemble à une application native.
* `workbox.globPatterns` : indique au Service Worker quels types de fichiers doivent être mis en cache et rester accessibles hors ligne.

<!-- 0 -->

# 3 Construire la PWA Tomato Farm

Dans les deux chapitres précédents, nous avons compris ce qu'est une PWA et terminé la configuration de l'environnement. À partir de cette section, nous arrêtons de parler uniquement en théorie et passons à la pratique. Nous utiliserons le mode Vibe Coding pour construire une application amusante et pratique à partir de zéro - **Tomato Farm**. Elle combine parfaitement la technique Pomodoro avec des incitations ludifiées et couvre les éléments clés du développement PWA : **interaction UI (minuteur Pomodoro), stockage de données (points et cultures) et capacité hors ligne (mise en cache Service Worker).**

Maintenant, envoyons la première instruction à l'IA.

## 3.1 Le premier "Prompt maître" : de zéro à un

En mode Vibe Coding, nous n'avons pas besoin de suivre l'approche traditionnelle consistant à créer d'abord des fichiers de mise en page puis à écrire le code logique. Ce que nous devons faire, c'est **décrire clairement les exigences en une seule fois et laisser l'IA générer la première version exécutable**.

Ouvrez le répertoire du projet que nous venons de créer dans votre assistant de codage IA et entrez le Prompt suivant :

```text
Please help me write the main page for the Tomato Farm app, with the following functions:

**Pomodoro Timer**
- A 25-minute countdown timer with start, pause, and reset
- Show remaining time and a progress bar
- Give the user 10 points after completing one focus session

**Farming System**
- 3 plots of farmland, but initially only the first one is available; the later ones are unlocked after leveling up
- A shop to buy seeds: carrot costs 5 points, tomato 10 points, corn 15 points
- After buying seeds and planting them, crops slowly grow, and when mature they can be harvested for points

**Level System**
- Level by total points: 0-100 points = Beginner Farmer, 100-300 = Skilled Farmer, above 300 = Farm Master
- Unlock new land and better seeds after leveling up

**UI Design**
- Top shows level, points, and upgrade progress bar
- Middle shows the Pomodoro countdown
- Below is the farmland grid
- Bottom has the shop button
- Use a green theme and make it look fresh and cute
- Must adapt to phone screens

**Data Saving**
- All data (points, level, farmland state) must be saved, and refreshing the page should not lose it
```

Après l'avoir envoyé, vous verrez l'IA commencer à raisonner et analyser la structure de votre projet. Quelques secondes plus tard, elle générera directement le code complet pour `App.tsx`.

1. De sa réponse, nous pouvons voir sa logique de raisonnement et sa logique d'interaction
2. Nous pouvons directement voir quel code elle a modifié
3. Si nous ne sommes pas satisfaits, nous pouvons revenir à la version précédente

<!-- 0 -->

## 3.2 Exécuter et prévisualiser (serveur de développement local)

Maintenant, l'IA a terminé le premier cycle de développement, mais rappelez-vous : ce que nous voyons dans l'assistant de codage n'est encore que des "plans" de code, pas une véritable application interactive. Nous devons démarrer un serveur de développement local pour pouvoir réellement exécuter le code et voir l'effet réel.

Exécutez ceci dans le terminal de votre assistant de codage IA :

```bash
npm run dev
```

Après quelques secondes, le terminal affichera une sortie comme celle-ci :

```text
  VITE v5.0.0  ready in 300 ms

  ->  Local:   http://localhost:5173/
  ->  Network: use --host to expose
  ->  press h + enter to show help
```

Ouvrez `http://localhost:5173/` dans votre navigateur, et vous devriez voir :

- le niveau, les points et une barre de progression en haut
- un compte à rebours Pomodoro au milieu
- la zone de la ferme en dessous
- un bouton de boutique en bas

Essayez de cliquer sur le bouton "Démarrer la concentration" et voyez si le compte à rebours fonctionne correctement. Cliquez sur une parcelle de ferme et voyez si vous pouvez acheter des graines et les planter. C'est la première version de votre application PWA.

<!-- 0 -->

## 3.3 Itération d'optimisation (ajouter des cultures SVG et des animations)

À ce stade, notre application a déjà une forme de base : minuteur Pomodoro, système de ferme et système de niveaux. Mais elle peut encore paraître brute, avec des cultures peut-être affichées uniquement sous forme de texte ou de blocs simples. Ensuite, nous ajouterons de belles cultures SVG et des animations de croissance pour donner vie à Tomato Farm.

**C'est précisément ici que le Vibe Coding devient si attirant.** En développement traditionnel, dessiner des graphiques SVG et construire des animations de croissance complexes peut être un cauchemar pour les débutants. Vous devez non seulement gérer le dessin de chemins SVG, mais aussi calculer les courbes d'animation. En mode Vibe Coding, vous n'avez pas besoin de vous soucier de ces détails de bas niveau. Vous dites simplement à l'IA comme un directeur : "Donne aux cultures de plus beaux graphiques SVG et fais-les grandir avec animation," et le code complexe apparaît presque instantanément.

**Étape 1 : Préparer les actifs SVG des cultures**

Vous pouvez demander à l'IA de dessiner du SVG directement dans le code, ou préparer des fichiers SVG et les placer sous `public/`. Dans ce tutoriel, nous recommandons de laisser l'IA générer le code SVG directement car c'est plus flexible.

**Étape 2 : Envoyer une instruction d'itération**

Retournez à l'assistant de codage IA et entrez le Prompt suivant :

```text
Please make the crops look better and add growth animation:

**Crop graphics**
- Carrot: orange body with green leaves
- Tomato: red round shape with little green leaves
- Corn: yellow corn cob with green outer leaves
Just use simple shapes

**Growth animation**
- When first planted, it starts as a small sprout and gradually grows to maturity
- Show 3 stages

**Harvest effect**
- When clicking a mature crop, play a simple harvest animation
- Show how many points were gained

**Overall polish**
- Farmland tiles should have borders and background color
- Crops should appear centered in the tile
- Overall style should feel a little cuter
```

L'IA modifiera à nouveau le code et gérera le rendu SVG et la logique d'animation. Après qu'elle a terminé, rafraîchissez le navigateur, et vous devriez voir de meilleurs graphiques de cultures et des animations de croissance fluides.

<!-- 0 -->

## 3.4 Ajouter des effets sonores et des notifications (facultatif)

Si vous voulez que Tomato Farm soit plus immersive, vous pouvez également ajouter des effets sonores et des notifications. Cela ne nécessite également qu'un simple Prompt :

```text
Please add sound effects and notifications to Tomato Farm:

**Sound effects**
- Play a "ding" when focus starts
- Play a victory sound when focus is completed
- Also add matching sound effects for planting and harvesting

**Notifications**
- Show "Congratulations, you finished a focus session!" after a focus cycle ends
- Show "Congratulations, you leveled up to XX!" when leveling up
- Show "You unlocked a new farmland plot!" when new land is unlocked

You can implement this with simple audio files or the Web Audio API
```

L'IA vous aidera à ajouter des effets sonores et des notifications, rendant Tomato Farm plus vivante et agréable.

<!-- 0 -->

# 4 Expérimenter la PWA localement

## 4.1 Construire et prévisualiser

Le Service Worker PWA ne prend effet que dans les builds de production (il ne s'enregistrera pas en mode développement). Nous devons donc d'abord construire, puis prévisualiser :

```text
Please help me run these commands:
1. npm run build (build production version)
2. npm run preview (start local preview server)
```

Après la construction, Vite générera tous les fichiers dans le répertoire `dist/`, y compris le `sw.js` (Service Worker) et `manifest.webmanifest` générés automatiquement.

Une fois le serveur de prévisualisation démarré, ouvrez l'adresse affichée dans le terminal (généralement `http://localhost:4173`).

## 4.2 Installer la PWA sur le bureau

Après avoir ouvert l'URL de prévisualisation, vous remarquerez qu'une **icône d'installation** apparaît sur le côté droit de la barre d'adresse du navigateur (généralement une petite flèche de téléchargement ou un signe "+").

**Étapes d'installation Chrome / Edge :**

1. Cliquez sur l'icône d'installation sur le côté droit de la barre d'adresse
2. Cliquez sur **Installer** dans la boîte de dialogue popup
3. La PWA s'ouvrira dans une fenêtre autonome, et un raccourci sera créé sur votre bureau / Menu Démarrer / Dock

La PWA installée ressemble exactement à une application de bureau native - pas de barre d'adresse, pas d'onglets, avec sa propre fenêtre et icône. Maintenant, vous pouvez ouvrir Tomato Farm à tout moment et commencer votre voyage de concentration et de ferme.

<!-- 0 -->

**Étapes d'installation macOS Safari :**

1. Ouvrez l'URL PWA dans Safari
2. Cliquez sur **Fichier -> Ajouter au Dock** depuis la barre de menus
3. L'icône PWA apparaîtra dans le Dock

## 4.3 Tester la capacité hors ligne

C'est la partie la plus cool de la PWA. Vérifions si le mode hors ligne fonctionne vraiment :

1. Assurez-vous que la PWA a été ouverte dans le navigateur au moins une fois (pour que le Service Worker puisse mettre en cache les ressources)
2. **Déconnectez le réseau** (désactivez le Wi-Fi ou débranchez le câble)
3. Rafraîchissez la page - vous découvrirez que **Tomato Farm se charge toujours normalement !**
4. Démarrez une session Pomodoro - après qu'elle se termine, vous gagnez des points, achetez des graines, plantez des cultures - et toutes les données sont toujours sauvegardées normalement dans `localStorage`

Vous pouvez également ouvrir Chrome DevTools (F12) -> Application -> Service Workers pour inspecter l'état du Service Worker et les listes de ressources mises en cache.

<!-- 0 -->

## 4.4 Persistance des données et options de synchronisation

Maintenant, votre Tomato Farm peut déjà fonctionner hors ligne, et toutes les données sont sauvegardées dans le `localStorage` du navigateur. Mais il y a un problème clé : **si l'utilisateur change d'appareil ou efface les données du navigateur, toutes les données de la ferme seront perdues**. Pour les applications de production sérieuses, nous devons penser à la persistance des données et à la synchronisation multi-appareils.

### 4.4.1 Limitations du stockage local

Le `localStorage` que nous utilisons actuellement a plusieurs limitations évidentes :

| Limitation | Description |
|--------|------|
| **Lié à l'appareil** | Les données ne sont stockées que dans le navigateur actuel sur l'appareil actuel ; changer d'appareil signifie les perdre |
| **Capacité limitée** | Généralement seulement 5-10 Mo d'espace de stockage |
| **Facile à perdre** | Effacer les données du navigateur ou désinstaller la PWA entraîne une perte de données |
| **Impossible de synchroniser** | La progression sur le téléphone ne peut pas être synchronisée avec le bureau |

Si votre Tomato Farm est juste un outil personnel, cela peut ne pas être un problème. Mais si vous voulez que les utilisateurs investissent à long terme et accumulent des données, une solution plus fiable est nécessaire.

### 4.4.2 Option 1 : Synchronisation cloud (recommandée)

La solution la plus fiable est de synchroniser les données avec une base de données cloud. Pour les PWA, **Supabase** est un excellent choix - il fournit une base de données PostgreSQL, des abonnements en temps réel et une authentification, et offre également un niveau gratuit.

**Idée de mise en œuvre :**

1. **Connexion utilisateur** : utiliser l'e-mail ou la connexion sociale pour établir l'identité de l'utilisateur
2. **Synchronisation automatique des données** : chaque opération sauvegarde automatiquement dans le cloud
3. **Hors ligne d'abord** : l'application fonctionne toujours hors ligne, puis se synchronise automatiquement lorsque le réseau revient
4. **Synchronisation multi-appareils** : la progression sur le téléphone est immédiatement disponible sur le bureau

**Exemple de Prompt :**

```text
Please help me migrate Tomato Farm data storage from localStorage to Supabase cloud sync:

**Functional requirements**
- Add user login (email + password or Google login)
- Save user data (points, level, farmland state) to Supabase database
- Still work offline, and automatically sync when the network recovers
- Support multi-device sync, so crops planted on the phone can also be seen on desktop

**Tech stack**
- Use @supabase/supabase-js client
- Implement optimistic updates (update UI first, then sync to cloud)
- Add a simple sync status indicator
```

**Avantages :**

- Les données ne seront pas perdues ; les utilisateurs n'ont qu'à se reconnecter lorsqu'ils changent d'appareil
- Le niveau gratuit suffit pour les projets personnels
- Supporte les abonnements en temps réel, offrant une bonne expérience de synchronisation multi-appareils

**Inconvénients :**

- Nécessite l'inscription/connexion de l'utilisateur, ajoutant de la friction à l'utilisation
- Nécessite une connexion réseau pour effectuer la synchronisation

### 4.4.3 Option 2 : Sauvegarde par exportation / importation

Si vous ne voulez pas ajouter un service backend, un compromis plus simple est la **sauvegarde et restauration manuelles**.

**Idée de mise en œuvre :**

1. **Exportation** : empaqueter les données de la ferme sous forme de fichier JSON et laisser les utilisateurs le télécharger
2. **Importation** : les utilisateurs peuvent sélectionner un fichier JSON précédemment exporté pour restaurer les données
3. **Rappel automatique** : rappeler aux utilisateurs de sauvegarder périodiquement

**Exemple de Prompt :**

```text
Please add data backup functionality to Tomato Farm:

**Export**
- Add an "Export Data" button on the settings page
- Package all data in localStorage into a JSON file
- Automatically download it to the user's device

**Import**
- Add an "Import Data" button that accepts a JSON file
- Validate file format before restoring
- Show a warning before import because it overwrites current data

**Automatic reminders**
- If the user has not backed up for over 7 days, show a friendly reminder
```

**Avantages :**

- Simple à mettre en œuvre, aucun service backend requis
- Les utilisateurs contrôlent entièrement leurs propres données
- Peut être transféré entre appareils en partageant le fichier exporté

**Inconvénients :**

- Nécessite une opération manuelle, donc l'expérience n'est pas fluide
- Si l'utilisateur oublie de sauvegarder, les données peuvent toujours être perdues

### 4.4.4 Option 3 : Synchronisation par extension de navigateur (pour les utilisateurs Chrome)

Si votre PWA cible principalement les utilisateurs Chrome, vous pouvez envisager **Chrome Storage Sync API**. C'est un service de stockage synchronisé multi-appareils fourni par Chrome, où les données se synchronisent automatiquement avec le compte Google de l'utilisateur.

**Note :** cela nécessite d'empaqueter la PWA en tant qu'extension Chrome, ce qui est plus adapté aux développeurs ayant une expérience technique.

### 4.4.5 Stratégie de choix recommandée

| Scénario | Solution recommandée |
|------|----------|
| Outil personnel léger | `localStorage` seul suffit |
| Éviter la perte de données, sans trop de complexité | Sauvegarde par exportation / importation |
| Produit officiel avec meilleure expérience utilisateur | Synchronisation cloud Supabase |
| Principalement pour les utilisateurs Chrome | Chrome Storage Sync |

**Pour une application comme Tomato Farm, ma suggestion est :**

1. **Stade MVP** : commencer avec `localStorage` pour valider rapidement l'idée du produit
2. **Stade d'itération** : ajouter la sauvegarde par exportation / importation pour que les utilisateurs aient un filet de sécurité pour les données
3. **Stade mature** : intégrer Supabase pour atteindre une véritable synchronisation cloud

Souvenez-vous : **l'amélioration progressive** est la philosophie centrale de la PWA. Faites d'abord fonctionner l'application, puis ajoutez graduellement des capacités plus avancées.

<!-- 0 -->

# 5 Déployer en ligne

La PWA doit fonctionner sous HTTPS pour fonctionner correctement. La bonne nouvelle est que les plateformes de déploiement mainstream fournissent maintenant automatiquement le HTTPS gratuit. Nous utiliserons **Vercel** comme exemple (vous pourriez également utiliser Netlify ou GitHub Pages).

## 5.1 Déployer sur Vercel

**Étape 1 : Installer l'outil de déploiement**

```text
Please help me install Vercel's deployment tool
```

**Étape 2 : Déployer le projet**

```text
Please help me deploy this project to Vercel. The project name is tomato-farm-pwa
```

L'IA gérera automatiquement les étapes de déploiement. Vous n'avez qu'à :
- choisir votre compte
- confirmer la création d'un nouveau projet
- garder les autres options par défaut

Après avoir attendu quelques dizaines de secondes, Vercel construira et déploiera automatiquement votre projet. Une fois terminé, vous obtiendrez une URL HTTPS comme `https://tomato-farm-pwa.vercel.app`.

<!-- 0 -->

**Étape 3 : Vérifier la PWA**

Ouvrez l'URL déployée dans votre navigateur, et vous devriez voir :

1. une icône d'installation apparaître sur le côté droit de la barre d'adresse
2. dans DevTools -> Application -> Manifest, vos informations d'application configurées comme le nom "Tomato Farm"
3. dans l'onglet Service Workers, le Service Worker affiché comme activé

## 5.2 Déployer avec GitHub Pages (alternative)

Si vous préférez GitHub Pages, vous avez besoin d'une configuration de chemin supplémentaire :

```text
Please help me modify the config so the project can be deployed to GitHub Pages.
My repository name is tomato-farm-pwa, so please adjust the path configuration accordingly.
```

Puis poussez la sortie de construction vers la branche `gh-pages` de votre dépôt GitHub.

# 6 Installer la PWA sur un téléphone

C'est la partie la plus excitante - transformer votre page web Tomato Farm en "application" sur votre téléphone.

## 6.1 Installer sur Android

1. Ouvrez l'URL de votre PWA Tomato Farm déployée dans le **navigateur Chrome** sur votre téléphone
2. Chrome peut afficher automatiquement une bannière **"Ajouter à l'écran d'accueil"** - cliquez simplement dessus
3. Si elle ne s'affiche pas automatiquement, appuyez sur le **menu à trois points** dans le coin supérieur droit -> **Installer l'application** ou **Ajouter à l'écran d'accueil**
4. Confirmez l'installation, et une icône d'application Tomato Farm apparaîtra sur l'écran d'accueil de votre téléphone

Ouvrez-la et vous remarquerez qu'elle s'exécute en mode plein écran, sans la barre d'adresse du navigateur ni les boutons de navigation, ressemblant presque exactement à une application native. Maintenant, vous pouvez commencer à vous concentrer et à cultiver à tout moment.

<!-- 0 -->

## 6.2 Installer sur iPhone

Sur iOS, la PWA ne peut être installée que via le navigateur **Safari** (les autres navigateurs ne supportent pas l'installation) :

1. Ouvrez l'URL de votre PWA Tomato Farm déployée dans **Safari**
2. Appuyez sur le bouton **Partager** en bas (carré avec une flèche vers le haut)
3. Dans le menu, choisissez **Ajouter à l'écran d'accueil**
4. Donnez un nom à l'application et appuyez sur **Ajouter**

À partir d'iOS 26, tous les sites web ajoutés à l'écran d'accueil s'ouvriront par défaut en mode application autonome, ce qui est une amélioration majeure.

<!-- 0 -->

> **Limitations connues sur iOS :**
> * Les notifications push nécessitent iOS 16.4 ou supérieur, et la PWA doit déjà être ajoutée à l'écran d'accueil
> * Background Sync n'est pas supporté
> * L'espace de stockage est plus limité que sur Android

## 6.3 Auditez votre PWA avec Lighthouse

Google fournit un outil appelé **Lighthouse**, qui peut évaluer votre PWA. Ouvrez Chrome DevTools (F12) -> Lighthouse -> cochez "Progressive Web App" -> cliquez sur "Analyze page load."

Une PWA Tomato Farm qualifiée devrait obtenir un score parfait dans la catégorie PWA. Si ce n'est pas le cas, Lighthouse vous indiquera les raisons exactes et suggérera des corrections.

<!-- 0 -->

# 7 Notes finales

Félicitations ! Vous avez construit avec succès une PWA de ferme Pomodoro qui peut être installée à la fois sur le bureau et le mobile. Passons en revue ce que nous avons fait :

1. Créé une application web Tomato Farm avec Vite + React
2. Ajouté un Service Worker et un Manifest via `vite-plugin-pwa`
3. Déployé sur Vercel pour obtenir une URL HTTPS
4. Installé avec succès à la fois sur le bureau et le mobile, et testé la capacité hors ligne

Maintenant, votre PWA Tomato Farm peut déjà réaliser :
* **Ferme de concentration** : aider les utilisateurs à rester concentrés grâce au mécanisme Pomodoro
* **Récompenses ludifiées** : utiliser la plantation, les niveaux et le déverrouillage pour motiver une utilisation répétée
* **Utilisabilité hors ligne** : même sans réseau, les utilisateurs peuvent toujours se concentrer, planter et gérer leur ferme
* **Installation multi-plateformes** : développer une seule fois et installer sur plusieurs types d'appareils

Le charme de la PWA réside dans sa "progressivité" - vous n'avez pas besoin de la rendre parfaite dès le début. Rendez d'abord le site web installable et disponible hors ligne, puis ajoutez graduellement des capacités avancées comme les notifications push et la synchronisation en arrière-plan.

**Directions avancées :**

* **Notifications push** : utiliser Push API + Notification API pour rappeler aux utilisateurs lorsqu'un Pomodoro se termine, ou lorsque les cultures sont prêtes à être récoltées
* **Synchronisation en arrière-plan** : utiliser Background Sync API pour synchroniser les données de la ferme vers le cloud après le retour du réseau
* **Stratégies de mise en cache plus intelligentes** : utiliser différentes stratégies Workbox comme CacheFirst, NetworkFirst et StaleWhileRevalidate pour différents types d'actifs
* **Publier sur les boutiques d'applications** : utiliser [PWA Builder](https://www.pwabuilder.com/) pour empaqueter la PWA Tomato Farm en un APK Android ou une application Microsoft Store
* **Fonctionnalités sociales** : ajouter un système d'amis pour que les utilisateurs puissent visiter les fermes des autres et échanger des cultures

***Une seule base de code, toutes les plateformes - c'est le pouvoir de la PWA. Concentrez-vous, plantez et cultivez !***

# Références

* [Documentation officielle Vite PWA](https://vite-pwa-org.netlify.app/guide/)
* [Guide de développement Google PWA](https://web.dev/progressive-web-apps/)
* [Documentation MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
* [Aperçu des stratégies de mise en cache Workbox](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
* [PWA Builder - Publier une PWA sur les boutiques d'applications](https://www.pwabuilder.com/)
