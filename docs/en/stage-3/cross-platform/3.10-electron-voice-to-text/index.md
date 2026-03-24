# How to Build a Cross-Platform Electron Desktop App: A Speech-to-Text Application

# Chapter 1: What Electron and Desktop App Development Are

In this tutorial, we will complete a full closed loop: build a speech-to-text desktop app from scratch with Electron, support both cloud API and local model recognition modes, and finally package it into a real desktop application that can be installed and run on Windows, macOS, and Linux.

For this tutorial, you should at least have:

- A computer (Windows or Mac, Mac is recommended because local models run very fast on Apple Silicon)
- A Node.js environment (version 18.0 or above)
- Your AI coding assistant (Cursor / Trae / Claude Code)
- (Optional) An OpenAI API Key (if you use cloud mode)
- A microphone (the built-in laptop microphone is fine)

## 1.1 What Is Electron?

Apps you use every day, such as **VS Code, Slack, Discord, and Notion**, have one thing in common: they are all desktop applications built with **Electron**.

Electron is an open-source framework that lets you use **HTML + CSS + JavaScript** (the same stack used for web pages) to build desktop apps that run across **Windows, macOS, and Linux**. Its principle is simple: package Chromium and Node.js together, and your web page becomes a standalone desktop app.

**One-sentence understanding**: Electron = an "invisible Chrome browser" + Node.js system capabilities.

<!-- ![placeholder: A diagram showing the Electron architecture: Chromium (for UI rendering) + Node.js (for system access) = desktop application](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image1.png) -->

## 1.2 Core Electron Architecture

An Electron app consists of two process types. Understanding them is the key to development:

**Main Process**

* The "general manager" of the app
* Responsible for creating windows, managing app lifecycle, and accessing native capabilities such as the file system
* Runs in the Node.js environment and can use all Node.js modules
* There is only one main process per app

**Renderer Process**

* The "front face" of the app
* Essentially a Chromium web page responsible for UI rendering
* Each window corresponds to one renderer process
* For security reasons, the renderer process cannot directly access Node.js APIs

**Preload Script**

* The "bridge" between the main process and renderer process
* Uses `contextBridge` to safely expose selected APIs to the renderer process

They communicate through **IPC (Inter-Process Communication)**, like making a phone call: the renderer says "I want to start recording," and the main process receives that request and calls the system microphone.

<!-- ![placeholder: An Electron process architecture diagram showing Main Process, Renderer Process, and Preload Script, plus IPC communication between them](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image2.png) -->

## 1.3 What Are We Building?

In this tutorial, we will build a **Speech-to-Text** desktop app. Its functionality is straightforward:

1. Click the "Start Recording" button, and the app starts listening to the microphone
2. After speaking, click "Stop," and the app sends audio to AI for recognition
3. The recognized text is displayed in the UI and can be copied with one click

**Two recognition modes are available:**

| Comparison Dimension | Cloud API Mode | Local Model Mode |
|---------|-------------|------------|
| Representative Solution | OpenAI Whisper API | whisper.cpp |
| Internet Required | Yes | No |
| Recognition Speed | Depends on network | Depends on hardware (very fast on Apple Silicon) |
| Chinese Recognition Quality | Excellent | Excellent (large-v3 model) |
| Cost | $0.006/minute | Free |
| Model Size | No download required | tiny model 75MB, large model 3GB |
| Best For | Fast onboarding, lightweight usage | Privacy-focused, offline usage, long-term high-frequency usage |

<!-- ![placeholder: An app preview showing the speech-to-text UI: recording button and waveform animation at top, recognized text below, and a mode toggle in the top-right corner](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image3.png) -->

## 1.4 Important Note: Web Speech API Is Not Available in Electron

If you have searched for "Electron speech recognition," you may have seen recommendations to use the browser's built-in `Web Speech API`. **Please note: this does not work in Electron.**

Google has discontinued speech API support for non-Chrome/Edge browser shells. Electron is Chromium-based, but it is not Chrome itself, so `window.SpeechRecognition` will fail directly.

That is why we need independent solutions such as OpenAI Whisper API or whisper.cpp.

## 1.5 Tutorial Roadmap

We will complete the full flow in the following steps:

1. **Create an Electron project**: Use Electron Forge to scaffold the project and understand inter-process communication
2. **Implement recording**: Capture microphone input in the renderer process and process audio data
3. **Cloud recognition (Option A)**: Use OpenAI Whisper API for speech-to-text
4. **Local recognition (Option B)**: Use whisper.cpp locally without internet access
5. **Packaging and distribution**: Package the app into an installable desktop program

# Chapter 2: Create the Electron Project

## 2.1 Initialize the Project with AI

Open your AI coding assistant and enter this prompt:

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge is the official Electron-recommended scaffolding tool. It helps with project initialization, packaging, distribution, and other tedious setup tasks.

After creation, the project structure is roughly:

```text
voice-to-text/
├── src/
│   ├── main.js            # Main process entry
│   ├── preload.js         # Preload script (bridge)
│   ├── renderer.js        # Renderer process entry
│   └── index.html         # App HTML page
├── forge.config.js        # Electron Forge config
├── vite.main.config.mjs   # Main process Vite config
├── vite.preload.config.mjs # Preload script Vite config
├── vite.renderer.config.mjs # Renderer process Vite config
└── package.json
```

## 2.2 Start and Preview

Ask AI to start the development server:

```
Please help me start the Electron development server by running npm start
```

After a few seconds, a desktop window appears. This is your Electron app. Even though it only shows a default welcome page now, it is already a real desktop program.

<!-- ![placeholder: Screenshot of first Electron app startup with the default welcome page](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image4.png) -->

## 2.3 Understand IPC (Inter-Process Communication)

Before implementing speech features, we need to understand Electron's most important concept: **IPC (Inter-Process Communication)**.

Because the renderer process (UI) and main process (system capabilities) are isolated, they must use IPC "phone calls" to collaborate:

```text
Renderer process (UI)                 Main process (system)
    │                                │
    │── "I want to start recording" ──────────→   │
    │                                │── Call microphone
    │                                │── Process audio
    │   ←──── "Here is the result" ─────────────│
    │                                │
    │── Display text in UI           │
```

In code, this communication is bridged via `preload.js`:

```javascript
// preload.js - safely expose APIs to renderer process
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Renderer -> Main
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Main -> Renderer
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - main process listens for messages
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Call Whisper API or whisper.cpp here
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: IPC flow diagram showing message transfer from Renderer -> Preload -> Main](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image5.png) -->

# Chapter 3: Implement Recording

## 3.1 Capture Microphone Input in the Renderer Process

The browser (which is the Electron renderer process) provides `navigator.mediaDevices.getUserMedia` to access the microphone. Ask AI to help implement recording:

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

Core recording code:

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

    // Send to main process for transcription
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: Screenshot of recording UI with red recording state button and pulse animation, plus text result area below](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image6.png) -->

## 3.2 Handle Microphone Permissions

Electron blocks permission requests by default. We need to explicitly allow microphone access in the main process:

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// Add to main.js
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

> **Note for macOS users**: macOS will show a system-level microphone permission dialog. This is normal. Click "Allow."

# Chapter 4: Option A - Cloud Recognition (OpenAI Whisper API)

This is the simplest option. You only need an API key and a few lines of code.

## 4.1 Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/), sign up, and log in
2. Go to the API Keys page and click **"Create new secret key"**
3. Copy the generated key (starts with `sk-`) and store it safely

> **Cost reference**: Whisper API costs **$0.006/minute**. That means recognizing 1 hour of audio only costs $0.36, which is very affordable.

## 4.2 Call Whisper API in the Main Process

Ask AI to implement speech recognition in the main process:

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

Core code:

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

<!-- ![placeholder: Running app screenshot showing recognized Chinese speech returned by Whisper API](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image7.png) -->

## 4.3 Add a Settings UI

Ask AI to add a simple settings panel in the renderer process to input API key and switch recognition mode:

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

<!-- ![placeholder: Screenshot of expanded settings panel showing mode switch and API key input](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image8.png) -->

# Chapter 5: Option B - Local Recognition (whisper.cpp)

If you do not want to rely on cloud APIs, or if you need offline usage, whisper.cpp is the best choice. It is a C++ port of the OpenAI Whisper model and runs fully locally without internet.

## 5.1 Install whisper.cpp Node.js Bindings

Ask AI to install and configure:

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **Model selection guide**:
> * `tiny` (75MB): fastest, good for testing and lightweight usage, average accuracy
> * `base` (142MB): balance between speed and accuracy
> * `small` (466MB): clearly better Chinese recognition quality
> * `large-v3-turbo` (1.5GB): recommended; 5-8x faster than large, with only 1-2% lower accuracy
> * `large-v3` (3GB): highest accuracy, but slower and needs better hardware

## 5.2 Integrate whisper.cpp in Main Process

Ask AI to implement local recognition:

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

Core code:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Save as temp file
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
    // Clean up temp file
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: Screenshot of local model recognition working offline with Chinese speech input](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image9.png) -->

## 5.3 Good News for Apple Silicon Users

If you are using an M1/M2/M3/M4 Mac, whisper.cpp can automatically use **Metal GPU acceleration** and **Apple Neural Engine**. Recognition can run **faster than real-time**, which means 1 minute of audio may only take a few seconds to process.

For NVIDIA GPU users, whisper.cpp also supports **CUDA acceleration**, which provides strong performance too.

# Chapter 6: Packaging and Distribution

After development is complete, we need to package the app into distributable installers.

## 6.1 Package with Electron Forge

Electron Forge is already included in our project, so packaging is simple:

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

This command automatically generates installers for your current operating system:

* **macOS**: `.dmg` installer image and `.zip` archive
* **Windows**: `.exe` installer (Squirrel format)
* **Linux**: `.deb` (Debian/Ubuntu) and `.rpm` (Fedora) packages

Build outputs are in the `out/make/` directory.

<!-- ![placeholder: Screenshot of files in out/make directory showing generated .dmg or .exe installers](../../../../zh-cn/stage-3/cross-platform/3.10-electron-voice-to-text/images/image10.png) -->

## 6.2 App Size Optimization

One "pain point" of Electron apps is large package size (because Chromium is bundled). Optimization suggestions:

* Ensure only packages in `dependencies` are bundled, and keep dev dependencies in `devDependencies`
* Use Vite tree-shaking to reduce JavaScript size
* If using local models, consider downloading models on first launch instead of bundling them into the installer

| Configuration | Estimated Size |
|------|---------|
| Pure Electron app (no model) | ~150-200 MB |
| + whisper tiny model | ~250 MB |
| + whisper large-v3-turbo model | ~1.7 GB |

## 6.3 Cross-Platform Notes

**macOS:**
* Publishing to App Store or distributing to others requires **code signing** (Apple Developer ID, $99/year)
* Also requires Apple's **Notarization** process
* Microphone permissions must declare `NSMicrophoneUsageDescription` in `Info.plist`
* Recommend building a Universal Binary to support both Intel and Apple Silicon

**Windows:**
* Code signing is recommended, otherwise Windows SmartScreen will show security warnings
* Users can still choose "Run anyway" for unsigned apps

**Linux:**
* No code signing required
* Recommended to provide both `.deb` and `.AppImage` formats

> **Tip**: For personal projects or small-scale distribution, you can temporarily skip code signing and directly share packaged files with friends.

# Chapter 7: Final Notes

Congratulations! You have built a cross-platform speech-to-text desktop app from scratch. Let's recap what we did:

1. Used Electron Forge to scaffold a cross-platform desktop app
2. Understood main process, renderer process, and IPC communication
3. Implemented microphone recording and audio capture
4. Integrated two speech recognition options: cloud Whisper API and local whisper.cpp
5. Learned how to package and distribute an Electron app

What makes Electron powerful is that you can build desktop apps at the level of VS Code or Slack using a web-tech stack. And with mature AI speech recognition, a feature like speech-to-text, once requiring a specialized team, can now be built by one person.

**Advanced directions:**

* **Real-time subtitles**: Use AudioWorklet for streaming audio and pair with streaming recognition APIs for live transcription
* **Meeting assistant**: Record full meetings, auto-generate timestamped transcripts, and summarize key points with AI
* **Multilingual translation**: Transcribe speech and call translation APIs for real-time language conversion
* **Voice notebook**: Combine with a local database (such as SQLite) to build searchable voice notes

***Let your voice, and let code record everything for you.***

# References

* [Electron Official Docs](https://www.electronjs.org/docs/latest/)
* [Electron Forge Official Docs](https://www.electronforge.io/)
* [OpenAI Whisper API Docs](https://platform.openai.com/docs/guides/speech-to-text)
* [whisper.cpp GitHub Repository](https://github.com/ggml-org/whisper.cpp)
* [nodejs-whisper npm Package](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
