# Comment construire une application de bureau Electron multiplateforme : une application de reconnaissance vocale

# Chapitre 1 : Ce que sont Electron et le développement d'applications de bureau

Dans ce tutoriel, nous allons réaliser une boucle complète : construire une application de bureau de reconnaissance vocale depuis zéro avec Electron, supporter à la fois les modes de reconnaissance par API cloud et par modèle local, et enfin l'empaqueter en une véritable application de bureau installable et exécutable sur Windows, macOS et Linux.

Pour ce tutoriel, vous devez au minimum disposer de :

- Un ordinateur (Windows ou Mac, Mac est recommandé car les modèles locaux fonctionnent très rapidement sur Apple Silicon)
- Un environnement Node.js (version 18.0 ou supérieure)
- Votre assistant de codage IA (Cursor / Trae / Claude Code)
- (Optionnel) Une clé API OpenAI (si vous utilisez le mode cloud)
- Un microphone (le microphone intégré du portable convient)

## 1.1 Qu'est-ce qu'Electron ?

Les applications que vous utilisez tous les jours, comme **VS Code, Slack, Discord et Notion**, ont un point commun : ce sont toutes des applications de bureau construites avec **Electron**.

Electron est un framework open-source qui vous permet d'utiliser **HTML + CSS + JavaScript** (la même pile technologique que pour les pages web) pour construire des applications de bureau fonctionnant sur **Windows, macOS et Linux**. Son principe est simple : empaqueter Chromium et Node.js ensemble, et votre page web devient une application de bureau autonome.

**Compréhension en une phrase** : Electron = un « navigateur Chrome invisible » + les capacités système de Node.js.

<!-- ![placeholder: A diagram showing the Electron architecture: Chromium (for UI rendering) + Node.js (for system access) = desktop application](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.webp) -->

## 1.2 Architecture fondamentale d'Electron

Une application Electron se compose de deux types de processus. Les comprendre est la clé du développement :

**Processus principal (Main Process)**

* Le « directeur général » de l'application
* Responsable de la création des fenêtres, de la gestion du cycle de vie de l'application et de l'accès aux capacités natives comme le système de fichiers
* S'exécute dans l'environnement Node.js et peut utiliser tous les modules Node.js
* Il n'y a qu'un seul processus principal par application

**Processus de rendu (Renderer Process)**

* Le « visage » de l'application
* Essentiellement une page web Chromium responsable du rendu de l'UI
* Chaque fenêtre correspond à un processus de rendu
* Pour des raisons de sécurité, le processus de rendu ne peut pas accéder directement aux API Node.js

**Script de préchargement (Preload Script)**

* Le « pont » entre le processus principal et le processus de rendu
* Utilise `contextBridge` pour exposer de manière sécurisée certaines API au processus de rendu

Ils communiquent via **IPC (Communication Inter-Processus)**, comme passer un coup de téléphone : le processus de rendu dit « je veux commencer l'enregistrement », et le processus principal reçoit cette demande et appelle le microphone du système.

<!-- ![placeholder: An Electron process architecture diagram showing Main Process, Renderer Process, and Preload Script, plus IPC communication between them](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.webp) -->

## 1.3 Que construisons-nous ?

Dans ce tutoriel, nous allons construire une application de bureau de **reconnaissance vocale (Speech-to-Text)**. Sa fonctionnalité est simple :

1. Cliquez sur le bouton « Démarrer l'enregistrement », et l'application commence à écouter le microphone
2. Après avoir parlé, cliquez sur « Arrêter », et l'application envoie l'audio à l'IA pour la reconnaissance
3. Le texte reconnu s'affiche dans l'UI et peut être copié en un clic

**Deux modes de reconnaissance sont disponibles :**

| Dimension de comparaison | Mode API Cloud | Mode Modèle Local |
|---------|-------------|------------|
| Solution représentative | OpenAI Whisper API | whisper.cpp |
| Internet requis | Oui | Non |
| Vitesse de reconnaissance | Dépend du réseau | Dépend du matériel (très rapide sur Apple Silicon) |
| Qualité de reconnaissance du chinois | Excellente | Excellente (modèle large-v3) |
| Coût | 0,006 $/minute | Gratuit |
| Taille du modèle | Pas de téléchargement requis | modèle tiny 75 Mo, modèle large 3 Go |
| Meilleur pour | Démarrage rapide, utilisation légère | Axé sur la confidentialité, utilisation hors ligne, utilisation fréquente à long terme |

<!-- ![placeholder: An app preview showing the speech-to-text UI: recording button and waveform animation at top, recognized text below, and a mode toggle in the top-right corner](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.webp) -->

## 1.4 Remarque importante : l'API Web Speech n'est pas disponible dans Electron

Si vous avez cherché « reconnaissance vocale Electron », vous avez peut-être vu des recommandations pour utiliser l'API `Web Speech` intégrée au navigateur. **Attention : cela ne fonctionne pas dans Electron.**

Google a interrompu le support de l'API de reconnaissance vocale pour les shells de navigateur non-Chrome/Edge. Electron est basé sur Chromium, mais ce n'est pas Chrome lui-même, donc `window.SpeechRecognition` échouera directement.

C'est pourquoi nous avons besoin de solutions indépendantes comme l'API OpenAI Whisper ou whisper.cpp.

## 1.5 Feuille de route du tutoriel

Nous effectuerons le flux complet en suivant ces étapes :

1. **Créer un projet Electron** : Utiliser Electron Forge pour scaffolder le projet et comprendre la communication inter-processus
2. **Implémenter l'enregistrement** : Capturer l'entrée du microphone dans le processus de rendu et traiter les données audio
3. **Reconnaissance cloud (Option A)** : Utiliser l'API OpenAI Whisper pour la reconnaissance vocale
4. **Reconnaissance locale (Option B)** : Utiliser whisper.cpp localement sans accès internet
5. **Empaquetage et distribution** : Empaqueter l'application en un programme de bureau installable

# Chapitre 2 : Créer le projet Electron

## 2.1 Initialiser le projet avec l'IA

Ouvrez votre assistant de codage IA et entrez ce prompt :

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge est l'outil de scaffolding officiellement recommandé par Electron. Il aide à l'initialisation du projet, à l'empaquetage, à la distribution et à d'autres tâches de configuration fastidieuses.

Après la création, la structure du projet est approximativement :

```text
voice-to-text/
├── src/
│   ├── main.js            # Point d'entrée du processus principal
│   ├── preload.js         # Script de préchargement (pont)
│   ├── renderer.js        # Point d'entrée du processus de rendu
│   └── index.html         # Page HTML de l'application
├── forge.config.js        # Configuration Electron Forge
├── vite.main.config.mjs   # Configuration Vite du processus principal
├── vite.preload.config.mjs # Configuration Vite du script de préchargement
├── vite.renderer.config.mjs # Configuration Vite du processus de rendu
└── package.json
```

## 2.2 Démarrer et prévisualiser

Demandez à l'IA de démarrer le serveur de développement :

```
Please help me start the Electron development server by running npm start
```

Après quelques secondes, une fenêtre de bureau apparaît. C'est votre application Electron. Même si elle n'affiche qu'une page d'accueil par défaut pour l'instant, c'est déjà un vrai programme de bureau.

<!-- ![placeholder: Screenshot of first Electron app startup with the default welcome page](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 Comprendre l'IPC (Communication Inter-Processus)

Avant d'implémenter les fonctionnalités vocales, nous devons comprendre le concept le plus important d'Electron : **IPC (Communication Inter-Processus)**.

Comme le processus de rendu (UI) et le processus principal (capacités système) sont isolés, ils doivent utiliser des « appels téléphoniques » IPC pour collaborer :

```text
Processus de rendu (UI)                 Processus principal (système)
    │                                │
    │── "Je veux commencer l'enregistrement" ──────────→   │
    │                                │── Appeler le microphone
    │                                │── Traiter l'audio
    │   ←──── "Voici le résultat" ─────────────│
    │                                │
    │── Afficher le texte dans l'UI  │
```

Dans le code, cette communication est pontée via `preload.js` :

```javascript
// preload.js - exposer les API de manière sécurisée au processus de rendu
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Rendu -> Principal
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Principal -> Rendu
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - le processus principal écoute les messages
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Appeler l'API Whisper ou whisper.cpp ici
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: IPC flow diagram showing message transfer from Renderer -> Preload -> Main](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.webp) -->

# Chapitre 3 : Implémenter l'enregistrement

## 3.1 Capturer l'entrée du microphone dans le processus de rendu

Le navigateur (c'est-à-dire le processus de rendu Electron) fournit `navigator.mediaDevices.getUserMedia` pour accéder au microphone. Demandez à l'IA d'aider à implémenter l'enregistrement :

```
Please help me modify src/index.html and src/renderer.js to implement:

UI:
1. A large circular "Start Recording" button, which turns into a red "Stop Recording" button when clicked
2. Show a simple pulse animation while recording
3. A text display area below for recognition results
4. Two buttons at the bottom: "Copy Text" and "Clear"
5. A settings icon at top-right to switch recognition mode (cloud/local)

Recording logic (in renderer.js):
1. On button click, request microphone access via navigator.mediaDevices.getUserMedia
2. Use MediaRecorder to record audio in webm format
3. After stopping, convert audio Blob to ArrayBuffer
4. Send it to main process via window.electronAPI.sendAudio
5. Wait for recognition result from main process and display it
```

Code d'enregistrement principal :

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // Envoyer au processus principal pour transcription
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: Screenshot of recording UI with red recording state button and pulse animation, plus text result area below](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.webp) -->

## 3.2 Gérer les permissions du microphone

Electron bloque les demandes de permission par défaut. Nous devons autoriser explicitement l'accès au microphone dans le processus principal :

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// Ajouter à main.js
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **Remarque pour les utilisateurs macOS** : macOS affichera une boîte de dialogue de permission microphone au niveau système. C'est normal. Cliquez sur « Autoriser ».

# Chapitre 4 : Option A - Reconnaissance cloud (API OpenAI Whisper)

C'est l'option la plus simple. Vous n'avez besoin que d'une clé API et de quelques lignes of code.

## 4.1 Obtenir une clé API OpenAI

1. Visitez [OpenAI Platform](https://platform.openai.com/), inscrivez-vous et connectez-vous
2. Allez sur la page API Keys et cliquez sur **« Create new secret key »**
3. Copiez la clé générée (commence par `sk-`) et stockez-la en toute sécurité

> **Référence de coût** : l'API Whisper coûte **0,006 $/minute**. Cela signifie que reconnaître 1 heure d'audio ne coûte que 0,36 $, ce qui est très abordable.

## 4.2 Appeler l'API Whisper dans le processus principal

Demandez à l'IA d'implémenter la reconnaissance vocale dans le processus principal :

```
Please help me implement OpenAI Whisper API in main.js:
1. Install node-fetch (if needed) or use built-in fetch in Node.js
2. Create transcribeWithWhisper function that accepts audio ArrayBuffer
3. Convert ArrayBuffer to Blob/File and build FormData
4. Call https://api.openai.com/v1/audio/transcriptions
5. Use model whisper-1 and set language to zh (Chinese)
6. Return the recognized text
7. Read API key from environment variables or config file
```

Code principal :

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'zh')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![placeholder: Running app screenshot showing recognized Chinese speech returned by Whisper API](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.webp) -->

## 4.3 Ajouter une interface de paramètres

Demandez à l'IA d'ajouter un panneau de paramètres simple dans le processus de rendu pour saisir la clé API et basculer le mode de reconnaissance :

```
Please help me add a settings panel in index.html:
1. Add a gear icon in the top-right corner; click to expand settings panel
2. The panel includes:
   - Recognition mode switch (Cloud API / Local model)
   - API Key input (only visible in cloud mode)
   - Language dropdown (Chinese / English / Auto detect)
3. Save settings to localStorage
4. Close panel when clicking outside
```

<!-- ![placeholder: Screenshot of expanded settings panel showing mode switch and API key input](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# Chapitre 5 : Option B - Reconnaissance locale (whisper.cpp)

Si vous ne voulez pas dépendre d'API cloud, ou si vous avez besoin d'une utilisation hors ligne, whisper.cpp est le meilleur choix. C'est un portage C++ du modèle OpenAI Whisper qui fonctionne entièrement localement sans internet.

## 5.1 Installer les bindings Node.js whisper.cpp

Demandez à l'IA d'installer et configurer :

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **Guide de sélection du modèle** :
> * `tiny` (75 Mo) : le plus rapide, bon pour les tests et une utilisation légère, précision moyenne
> * `base` (142 Mo) : bon équilibre entre vitesse et précision
> * `small` (466 Mo) : qualité de reconnaissance du chinois nettement meilleure
> * `large-v3-turbo` (1,5 Go) : recommandé ; 5 à 8 fois plus rapide que large, avec seulement 1 à 2 % de précision en moins
> * `large-v3` (3 Go) : précision la plus élevée, mais plus lent et nécessite un meilleur matériel

## 5.2 Intégrer whisper.cpp dans le processus principal

Demandez à l'IA d'implémenter la reconnaissance locale :

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

Code principal :

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Sauvegarder comme fichier temporaire
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'zh',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // Nettoyer le fichier temporaire
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: Screenshot of local model recognition working offline with Chinese speech input](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Bonne nouvelle pour les utilisateurs Apple Silicon

Si vous utilisez un Mac M1/M2/M3/M4, whisper.cpp peut automatiquement utiliser l'**accélération GPU Metal** et l'**Apple Neural Engine**. La reconnaissance peut fonctionner **plus vite que le temps réel**, ce qui signifie que 1 minute d'audio peut ne prendre que quelques secondes à traiter.

Pour les utilisateurs de GPU NVIDIA, whisper.cpp supporte également l'**accélération CUDA**, offrant aussi de solides performances.

# Chapitre 6 : Empaquetage et distribution

Une fois le développement terminé, nous devons empaqueter l'application en installateurs distribuables.

## 6.1 Empaqueter avec Electron Forge

Electron Forge est déjà inclus dans notre projet, donc l'empaquetage est simple :

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

Cette commande génère automatiquement des installateurs pour votre système d'exploitation actuel :

* **macOS** : image installateur `.dmg` et archive `.zip`
* **Windows** : installateur `.exe` (format Squirrel)
* **Linux** : paquets `.deb` (Debian/Ubuntu) et `.rpm` (Fedora)

Les résultats de construction se trouvent dans le répertoire `out/make/`.

<!-- ![placeholder: Screenshot of files in out/make directory showing generated .dmg or .exe installers](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 Optimisation de la taille de l'application

Un « point douloureux » des applications Electron est leur taille importante (car Chromium est inclus). Suggestions d'optimisation :

* Assurez-vous que seuls les paquets dans `dependencies` sont inclus, et gardez les dépendances de développement dans `devDependencies`
* Utilisez le tree-shaking de Vite pour réduire la taille du JavaScript
* Si vous utilisez des modèles locaux, envisagez de télécharger les modèles au premier lancement au lieu de les inclure dans l'installateur

| Configuration | Taille estimée |
|------|---------|
| Application Electron pure (sans modèle) | ~150-200 Mo |
| + modèle whisper tiny | ~250 Mo |
| + modèle whisper large-v3-turbo | ~1,7 Go |

## 6.3 Remarques multiplateformes

**macOS :**
* Publier sur l'App Store ou distribuer à d'autres nécessite la **signature de code** (Apple Developer ID, 99 $/an)
* Nécessite également le processus de **Notarisation** d'Apple
* Les permissions du microphone doivent déclarer `NSMicrophoneUsageDescription` dans `Info.plist`
* Recommandé de construire un Binary Universal pour supporter à la fois Intel et Apple Silicon

**Windows :**
* La signature de code est recommandée, sinon Windows SmartScreen affichera des avertissements de sécurité
* Les utilisateurs peuvent toujours choisir « Exécuter quand même » pour les applications non signées

**Linux :**
* Pas de signature de code requise
* Recommandé de fournir à la fois les formats `.deb` et `.AppImage`

> **Astuce** : Pour les projets personnels ou la distribution à petite échelle, vous pouvez temporairement ignorer la signature de code et partager directement les fichiers empaquetés avec des amis.

# Chapitre 7 : Remarques finales

Félicitations ! Vous avez construit une application de bureau de reconnaissance vocale multiplateforme depuis zéro. Récapitulons ce que nous avons fait :

1. Utilisé Electron Forge pour scaffolder une application de bureau multiplateforme
2. Compris le processus principal, le processus de rendu et la communication IPC
3. Implémenté l'enregistrement par microphone et la capture audio
4. Intégré deux options de reconnaissance vocale : l'API Whisper cloud et whisper.cpp local
5. Appris à empaqueter et distribuer une application Electron

Ce qui rend Electron puissant, c'est que vous pouvez construire des applications de bureau au niveau de VS Code ou Slack en utilisant une pile technologique web. Et avec la reconnaissance vocale IA mature, une fonctionnalité comme la reconnaissance vocale, qui nécessitait autrefois une équipe spécialisée, peut maintenant être construite par une seule personne.

**Directions avancées :**

* **Sous-titres en temps réel** : Utiliser AudioWorklet pour l'audio en streaming et associer avec des API de reconnaissance en streaming pour la transcription en direct
* **Assistant de réunion** : Enregistrer des réunions complètes, générer automatiquement des transcriptions avec horodatage, et résumer les points clés avec l'IA
* **Traduction multilingue** : Transcrire la parole et appeler des API de traduction pour la conversion linguistique en temps réel
* **Carnet de notes vocal** : Combiner avec une base de données locale (comme SQLite) pour construire des notes vocales recherchables

***Que votre voix résonne, et que le code enregistre tout pour vous.***

# Références

* [Documentation officielle Electron](https://www.electronjs.org/docs/latest/)
* [Documentation officielle Electron Forge](https://www.electronforge.io/)
* [Documentation API OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text)
* [Dépôt GitHub whisper.cpp](https://github.com/ggml-org/whisper.cpp)
* [Paquet npm nodejs-whisper](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
