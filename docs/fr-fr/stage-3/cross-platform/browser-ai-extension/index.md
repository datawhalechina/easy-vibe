# Comment construire une extension de navigateur IA : Résumer n'importe quelle page web en un clic

# Chapitre 1 : Ce que sont les extensions de navigateur et le développement d'extensions Chrome

Dans ce tutoriel, nous allons réaliser une boucle complète : construire une extension Chrome pilotée par l'IA depuis zéro. Elle peut lire le contenu de n'importe quelle page web que vous consultez, puis utiliser l'IA pour générer un résumé en un clic. Vous réaliserez personnellement le développement de l'extension, le débogage et apprendrez comment la publier sur le Chrome Web Store.

Pour ce tutoriel, vous devez au minimum disposer de :

- Un navigateur Chrome (version 138+ recommandée si vous souhaitez utiliser l'IA intégrée)
- Un éditeur de code (VS Code / Cursor / Trae)
- (Optionnel) Une clé API OpenAI ou Claude

## 1.1 Qu'est-ce qu'une extension de navigateur ?

Vous avez certainement déjà utilisé des extensions de navigateur : bloqueurs de publicités, outils de traduction, gestionnaires de mots de passe... Elles sont comme des « équipements supplémentaires » pour votre navigateur, vous donnant des super-pouvoirs pendant la navigation.

Imaginez ceci : vous ouvrez un article technique de 5 000 mots, cliquez une fois sur le bouton de l'extension, et quelques secondes plus tard un résumé concis en français apparaît dans le panneau latéral. C'est exactement ce que nous allons construire.

![placeholder: A preview image showing a long article webpage on the left and an AI-generated summary displayed in the Chrome side panel on the right](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp)

<!-- ![placeholder: A preview image showing a long article webpage on the left and an AI-generated summary displayed in the Chrome side panel on the right](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp) -->

## 1.2 L'architecture de base d'une extension Chrome

Les extensions Chrome (basées sur Manifest V3) se composent de plusieurs éléments fondamentaux, chacun avec son propre rôle :

* **Fichier manifeste (`manifest.json`)** : la « carte d'identité » de l'extension, déclarant son nom, ses permissions, ses fichiers d'entrée, et plus encore.
* **Service Worker (script d'arrière-plan)** : le « cerveau » de l'extension, gérant les événements et appelant les API en arrière-plan. Il ne fonctionne pas en continu, mais se lance quand c'est nécessaire.
* **Content Script** : les « yeux » de l'extension, injecté dans les pages web et capable de lire le contenu du DOM.
* **Side Panel** : le « visage » de l'extension, affichant l'UI sur le côté droit du navigateur où les utilisateurs voient les résultats du résumé IA.
* **Page d'options** : permet aux utilisateurs de configurer la clé API et les paramètres associés.

Leur flux de fonctionnement ressemble à ceci :

```text
L'utilisateur clique sur l'icône de l'extension
    -> Le panneau latéral s'ouvre
    -> L'utilisateur clique sur le bouton « Résumer »
    -> Le panneau latéral notifie le Service Worker
    -> Le Service Worker demande au Content Script de lire le texte de la page
    -> Le Content Script retourne le contenu de la page
    -> Le Service Worker envoie le contenu à l'API IA
    -> L'IA retourne le résumé
    -> Le Service Worker renvoie le résumé au panneau latéral pour affichage
```

![placeholder: An architecture flowchart showing how Content Script, Service Worker, and Side Panel pass messages to each other](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp)
<!-- ![placeholder: An architecture flowchart showing how Content Script, Service Worker, and Side Panel pass messages to each other](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp) -->

## 1.3 Deux options IA : API cloud vs IA intégrée au navigateur

Notre extension dispose de deux façons d'accéder aux capacités IA :

**Option A : Appeler des API IA cloud (OpenAI / Claude)**

* Avantages : capacités de modèle puissantes, supporte tous les appareils
* Inconvénients : nécessite une clé API, requiert internet, a un coût d'utilisation
* Idéal pour : des résumés de haute qualité et le traitement de contenu plus complexe

**Option B : Utiliser l'IA intégrée à Chrome (Summarizer API)**

À partir de Chrome 138, Google a intégré des capacités IA basées sur Gemini Nano directement dans le navigateur. L'une d'elles est l'**API Summarizer** - elle fonctionne entièrement localement, ne nécessite aucune clé API, aucun internet, et est totalement gratuite.

* Avantages : gratuit, respectueux de la vie privée, aucune clé API nécessaire
* Inconvénients : nécessite Chrome 138+, un meilleur matériel (4 Go+ VRAM ou 16 Go+ RAM), les capacités du modèle sont inférieures à l'IA cloud
* Idéal pour : les utilisateurs soucieux de la vie privée, ne souhaitant pas payer, et disposant d'un matériel suffisant

**Ce tutoriel implémentera les deux options**, et vous pourrez choisir en fonction de votre situation.

## 1.4 Feuille de route du tutoriel

Nous construirons une extension Chrome appelée **« AI Page Summarizer »** depuis zéro, en suivant ces étapes :

1. **Construire le squelette de l'extension** : créer une structure de projet Manifest V3 et la charger dans Chrome
2. **Implémenter la fonctionnalité principale** : le Content Script lit la page + le Service Worker appelle l'API IA + le panneau latéral affiche les résultats
3. **Intégrer l'IA intégrée à Chrome** : utiliser l'API Summarizer pour fournir une synthèse locale gratuite
4. **Tests et débogage** : apprendre les techniques de débogage des extensions Chrome
5. **Publier sur le Chrome Web Store** : empaqueter et soumettre pour revue

# Chapitre 2 : Construire le squelette de l'extension

## 2.1 Créer la structure du projet

Ouvrez votre assistant de codage IA (Cursor / Trae / Claude Code), créez un dossier vide nommé `ai-page-summarizer`, puis entrez ce qui suit dans la boîte de chat :

```text
Please help me create a Chrome browser extension project using Manifest V3.
The project name is ai-page-summarizer, and its function is to summarize webpage content with AI.
Please create the following file structure:

ai-page-summarizer/
├── manifest.json          # MV3 manifest file
├── background.js          # Service Worker background script
├── content.js             # Content script (reads webpage text)
├── sidepanel.html         # Side panel HTML
├── sidepanel.js           # Side panel logic
├── sidepanel.css          # Side panel styling
├── options.html           # Settings page
├── options.js             # Settings page logic
└── icons/                 # Icons folder

Requirements for manifest.json:
1. manifest_version: 3
2. Permissions: storage, activeTab, scripting, sidePanel
3. Use service_worker: "background.js" for background
4. Configure side_panel with default path sidepanel.html
5. Configure default icon and title for action
```

L'IA générera pour vous le squelette complet du projet. Regardons ce que fait chaque fichier.

## 2.2 `manifest.json` : la « carte d'identité » de l'extension

C'est le fichier le plus important d'une extension Chrome. Il indique au navigateur ce qu'est l'extension, quelles permissions elle nécessite et quels composants elle contient :

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Use AI to summarize any webpage in one click",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Page Summarizer",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

**Explication des permissions :**

* `storage` : permet à l'extension de stocker des données comme la clé API de l'utilisateur
* `activeTab` : permet à l'extension d'accéder à l'onglet actuel consulté par l'utilisateur (uniquement après interaction utilisateur, donc très sûr)
* `scripting` : permet à l'extension d'injecter des scripts dans les pages pour lire le contenu
* `sidePanel` : permet à l'extension d'utiliser l'API du panneau latéral Chrome

![placeholder: Screenshot of manifest.json in the editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![placeholder: Screenshot of manifest.json in the editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 Préparer les icônes

Les extensions Chrome nécessitent des icônes en trois tailles : 16x16, 48x48 et 128x128. Vous pouvez demander à l'IA de les générer :

```text
Please help me generate three simple Chrome extension icons (16x16, 48x48, 128x128),
with a rounded rectangle, gradient purple background, and a white AI lightning symbol in the center.
Save them in the icons/ directory as icon-16.png, icon-48.png, and icon-128.png.
```

## 2.4 Charger l'extension dans Chrome

Avant d'écrire du code, chargeons d'abord cette extension « coquille vide » dans Chrome, pour que chaque modification ultérieure puisse être prévisualisée immédiatement :

1. Ouvrez Chrome et entrez `chrome://extensions/` dans la barre d'adresse
2. Activez le **Mode développeur** dans le coin supérieur droit
3. Cliquez sur **Charger l'extension non empaquetée**
4. Sélectionnez votre dossier `ai-page-summarizer`

Vous verrez l'extension apparaître dans la liste, et son icône s'affichera dans la barre d'outils Chrome.

![placeholder: Screenshot of Chrome extensions page showing how to enable developer mode and load an extension](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![placeholder: Screenshot of Chrome extensions page showing how to enable developer mode and load an extension](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **Astuce** : après chaque modification du code, retournez sur `chrome://extensions/` et cliquez sur le **bouton de rafraîchissement (🔄)** sur la carte de l'extension pour la mettre à jour.

# Chapitre 3 : Implémenter la fonctionnalité principale - Lire la page + Résumé IA

## 3.1 Content Script : lire le texte de la page

Le Content Script est un script injecté dans la page web. Il peut accéder directement au DOM de la page. Nous l'utilisons pour extraire le texte de la page.

Demandez à l'IA d'écrire `content.js` :

```text
Please help me write content.js with the following functions:
1. Listen for messages from Service Worker
2. When receiving a "getPageContent" message, extract the current page text content
3. Extraction logic: get document.body.innerText, and also get the page title and URL
4. Return the extracted content via sendResponse
```

L'IA générera un code comme celui-ci :

```javascript
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const content = document.body.innerText || document.body.textContent
    sendResponse({
      content: content.trim(),
      title: document.title,
      url: window.location.href
    })
  }
  return true // Keep the message channel open
})
```

## 3.2 Service Worker : appeler l'API IA

Le Service Worker est le « cerveau » de l'extension. Il coordonne la communication entre les composants et appelle les API IA externes.

Demandez à l'IA d'écrire `background.js` :

```text
Please help me write background.js with the following functions:
1. When the user clicks the extension icon, open the side panel
2. Listen for "summarize" messages from the side panel
3. After receiving the message, send "getPageContent" to the content script in the current tab to get page content
4. After receiving the page content, read the user's configured API Key and model selection from chrome.storage.local
5. Call the corresponding AI API according to the configuration (support OpenAI and Claude)
6. Send the AI summary back to the side panel

For OpenAI, call https://api.openai.com/v1/chat/completions and use model gpt-4o-mini
For Claude, call https://api.anthropic.com/v1/messages and use model claude-sonnet-4-20250514
System prompt: Please summarize the following webpage content in Chinese, extract the key points, and keep it within 300 Chinese characters.
```

Le code principal ressemble à ceci :

```javascript
// background.js

// Ouvrir le panneau latéral quand l'utilisateur clique sur l'icône
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Écouter les messages du panneau latéral
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // Réponse asynchrone
  }
})

async function handleSummarize(tabId) {
  // 1. Obtenir le contenu de la page
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. Lire les paramètres utilisateur
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Please configure your API Key in the settings page first' }
  }

  // 3. Appeler l'API IA
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![placeholder: Screenshot of background.js code in the editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 UI du panneau latéral : afficher le résultat du résumé

Le panneau latéral est l'UI d'interaction principale pour les utilisateurs. Demandez à l'IA d'écrire le HTML, CSS et JS du panneau latéral :

```text
Please help me write these three files for the side panel:

sidepanel.html:
- Show the plugin name "AI Page Summarizer" at the top
- A blue "Summarize Current Page" button
- A loading animation area (hidden by default)
- A result display area showing the page title and AI summary
- A "Copy Summary" button at the bottom

sidepanel.css:
- Clean modern design, similar to Notion typography
- Width adapts to the side panel
- Buttons have hover effects
- Loading animation implemented with CSS

sidepanel.js:
- When clicking the "Summarize" button, get the current tab ID
- Send a summarize message to background.js
- Show loading animation
- Hide loading and display summary after receiving result
- Use navigator.clipboard.writeText in the "Copy" button to copy text
```

![placeholder: Screenshot of side panel UI showing three states: summary button, loading state, and summary result](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![placeholder: Screenshot of side panel UI showing three states: summary button, loading state, and summary result](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 Page de paramètres : configurer la clé API

Les utilisateurs ont besoin d'un endroit pour entrer leur propre clé API. Demandez à l'IA d'écrire la page de paramètres :

```text
Please help me write options.html and options.js:
- A dropdown to choose AI provider (OpenAI / Claude)
- A password input for API Key (type="password")
- A "Save" button
- Save config with chrome.storage.local.set
- Read saved config from storage and fill the form on page load
- Show "Settings saved" after saving
```

> **Rappel de sécurité** : la clé API est stockée dans `chrome.storage.local` et conservée uniquement sur l'appareil local. Mais si vous souhaitez publier cette extension sur le Chrome Web Store pour que d'autres l'utilisent, une approche plus sûre consiste à construire un serveur proxy backend pour que la clé API ne soit pas exposée directement côté client.

![placeholder: Screenshot of settings page showing provider selection and API Key input p1](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![placeholder: Screenshot of settings page showing provider selection and API Key input p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![placeholder: Screenshot of settings page showing provider selection and API Key input p3](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![placeholder: Screenshot of settings page showing provider selection and API Key input](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# Chapitre 4 : Utiliser l'IA intégrée à Chrome (sans clé API)

À partir de Chrome 138, Google a intégré des capacités IA basées sur **Gemini Nano** directement dans le navigateur. Celle qui convient le mieux à notre cas est l'**API Summarizer** - elle fonctionne entièrement localement, ne nécessite aucune clé API, aucun internet, et est gratuite.

## 4.1 Vérifier la compatibilité du navigateur

L'IA intégrée a des exigences matérielles :

* Chrome 138+ sur ordinateur (Windows 10+, macOS 13+, Linux, ChromeOS)
* 22 Go d'espace de stockage disponible (pour le téléchargement du modèle)
* 4 Go+ de VRAM GPU, ou 16 Go+ de RAM système avec 4+ cœurs CPU

Entrez `chrome://flags` dans la barre d'adresse de Chrome, recherchez le flag relatif à Summarization, et assurez-vous qu'il est **Enabled**.
* Dans Chrome 131-137, ce commutateur s'appelle Summarization API.
* Dans Chrome 138-144, il a été renommé Summarization API for Gemini Nano.
* Dans Chrome 145+, Summarization API for Gemini Nano a été supprimé, et sa fonction de synthèse a été intégrée dans Prompt API for Gemini Nano.

![placeholder: Screenshot of chrome://flags showing the Summarization API switch](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![placeholder: Screenshot of chrome://flags showing the Summarization API switch](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 Utiliser l'API Summarizer

Demandez à l'IA d'ajouter le support de l'IA intégrée dans `background.js` :

```text
Please help me add Chrome built-in Summarizer API support in background.js:
1. Add a summarizeWithBuiltinAI function
2. First check whether Summarizer.availability() returns 'readily-available'
3. If available, create a summarizer instance, configure type as 'key-points', format as 'markdown', and length as 'medium'
4. Call summarizer.summarize() to summarize
5. In handleSummarize, add a branch for provider === 'builtin'
```

Code principal :

```javascript
async function summarizeWithBuiltinAI(text) {
  // Vérifier la disponibilité
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('Chrome built-in AI is not available. Please check browser version and hardware requirements.')
  }

  // Créer le résumeur
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // Exécuter le résumé
  const summary = await summarizer.summarize(text, {
    context: 'This is a webpage article'
  })

  return summary
}
```

## 4.3 Mettre à jour la page de paramètres

Ajoutez une option **« IA intégrée Chrome (Gratuit, sans clé API) »** au menu déroulant des fournisseurs dans `options.html`. Quand les utilisateurs la choisissent, masquez le champ de saisie de la clé API car elle n'est plus nécessaire.

```text
Please help me modify options.html and options.js:
1. Add an option "Chrome built-in AI (free, no API Key needed)" to the provider dropdown, with value "builtin"
2. Hide the API Key input when builtin is selected
3. Show the API Key input when OpenAI or Claude is selected
```

![placeholder: Screenshot of updated settings page showing three AI provider options, with API Key input hidden when Chrome built-in AI is selected](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![placeholder: Screenshot of updated settings page showing three AI provider options, with API Key input hidden when Chrome built-in AI is selected](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# Chapitre 5 : Tests et débogage

## 5.1 Flux de test local

Le débogage des extensions Chrome est un peu différent du débogage des pages web classiques :

**Déboguer le Service Worker :**
1. Ouvrez `chrome://extensions/`
2. Trouvez votre extension et cliquez sur le lien **Service Worker**
3. Une fenêtre DevTools dédiée s'ouvre où vous pouvez voir les sorties `console.log` et les requêtes réseau

**Déboguer le panneau latéral :**
1. Ouvrez le panneau latéral
2. Faites un clic droit dans le contenu du panneau latéral
3. Choisissez **Inspecter**
4. Cela ouvre les DevTools pour le panneau latéral

**Déboguer le Content Script :**
1. Ouvrez les DevTools avec F12 sur n'importe quelle page web
2. Dans le panneau Console, cliquez sur le menu déroulant du contexte d'exécution en haut à gauche
3. Sélectionnez le nom de votre extension
4. Vous pouvez alors voir les sorties `console` du Content Script

![placeholder: Screenshot of Chrome DevTools showing how to choose different execution contexts to debug different extension components](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp)
<!-- ![placeholder: Screenshot of Chrome DevTools showing how to choose different execution contexts to debug different extension components](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp) -->

## 5.2 Résolution des problèmes courants

| Problème | Cause possible | Solution |
|------|---------|---------|
| Cliquer sur l'icône ne fait rien | Erreur du Service Worker | Vérifiez la Console DevTools du Service Worker |
| Impossible d'obtenir le contenu de la page | Content Script non injecté | Rafraîchissez la page et réessayez, vérifiez la config `matches` dans le manifeste |
| L'appel API échoue | Clé API incorrecte ou expirée | Entrez à nouveau la clé API dans la page de paramètres |
| Le panneau latéral est vide | Le chemin `sidepanel.html` est incorrect | Vérifiez `side_panel.default_path` dans le manifeste |


# Chapitre 6 : Publier sur le Chrome Web Store (optionnel)

Si vous souhaitez partager l'extension avec d'autres, vous pouvez la publier sur le Chrome Web Store.

## 6.1 Préparer la publication

1. **Enregistrer un compte développeur** : visitez le [Tableau de bord développeur du Chrome Web Store](https://chrome.google.com/webstore/devconsole) et payez les frais d'inscription uniques de 5 $
2. **Activer la vérification en deux étapes** : votre compte Google doit avoir la vérification en deux étapes activée avant de publier
3. **Préparer les ressources** :
   * Icône de l'extension : PNG 128x128
   * Au moins une capture d'écran : 1280x800 recommandé
   * Description fonctionnelle détaillée
   * Explication de la politique de confidentialité (si votre extension traite des données utilisateur)

## 6.2 Empaqueter et télécharger

1. Compressez le dossier de l'extension en fichier `.zip` (pas `.crx`)
2. Cliquez sur **Nouvel élément** dans le Tableau de bord développeur
3. Téléchargez le fichier `.zip`
4. Remplissez les informations du store (nom, description, captures d'écran, catégorie, etc.)
5. Remplissez les pratiques de confidentialité (déclarez quelles données utilisateur votre extension collecte)
6. Cliquez sur **Soumettre pour revue**

Google examinera les extensions soumises, ce qui prend généralement plusieurs jours ouvrables. Moins vous demandez de permissions et plus votre description est claire, plus la revue est généralement rapide.

![placeholder: Screenshot of Chrome Web Store Developer Dashboard showing extension upload and metadata form](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![placeholder: Screenshot of Chrome Web Store Developer Dashboard showing extension upload and metadata form p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![placeholder: Screenshot of Chrome Web Store Developer Dashboard showing extension upload and metadata form](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# Chapitre 7 : Remarques finales

Félicitations ! Vous avez construit une extension de navigateur pilotée par l'IA depuis zéro. Passons en revue ce que nous avons fait :

1. Compris l'architecture Manifest V3 des extensions Chrome
2. Utilisé le Content Script pour lire le contenu des pages web
3. Utilisé le Service Worker pour appeler les API IA et générer des résumés
4. Utilisé le panneau latéral pour afficher le résultat du résumé
5. Également appris à utiliser l'IA intégrée à Chrome sans aucune clé API

Le développement d'extensions de navigateur est un domaine très intéressant - il vous permet d'« améliorer » n'importe quelle page web sur internet. Outre la synthèse de pages, vous pouvez construire bien d'autres choses avec une architecture similaire :

**Directions avancées :**

* **Assistant de traduction** : traduire des pages web étrangères en français en un clic
* **Annotations de lecture** : surligner et annoter des pages, puis sauvegarder dans le cloud
* **Suivi des prix** : surveiller les changements de prix sur les pages e-commerce et notifier les utilisateurs
* **Explicateur de code** : sélectionner du code sur GitHub et laisser l'IA l'expliquer automatiquement

L'arrivée de l'IA intégrée à Chrome abaisse encore davantage la barrière - vous n'avez même pas besoin de clé API pour construire des extensions alimentées par l'IA. Alors que les capacités IA du navigateur continuent de croître, l'espace d'imagination dans ce domaine ne fera que s'élargir.

***Allez donner des super-pouvoirs à votre navigateur !***

# Références

* [Documentation officielle des extensions Chrome - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [Publier une extension Chrome sur le Chrome Web Store](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [API Chrome Side Panel](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [IA intégrée Chrome - API Summarizer](https://developer.chrome.com/docs/ai/summarizer-api)
* [IA intégrée Chrome - API Prompt](https://developer.chrome.com/docs/ai/prompt-api)
* [Documentation API OpenAI](https://platform.openai.com/docs/api-reference)
* [Documentation API Anthropic Claude](https://docs.anthropic.com/en/docs/)
* [Documentation API Anthropic Claude](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
