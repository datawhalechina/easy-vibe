# Cómo construir una aplicación de escritorio Electron multiplataforma: Una aplicación de voz a texto

# Capítulo 1: Qué son Electron y el desarrollo de aplicaciones de escritorio

En este tutorial, completaremos un ciclo completo: construiremos una aplicación de escritorio de voz a texto desde cero con Electron, soportando tanto el modo de API en la nube como el de modelo local, y finalmente la empaquetaremos en una aplicación de escritorio real que puede instalarse y ejecutarse en Windows, macOS y Linux.

Para este tutorial, deberías tener al menos:

- Una computadora (Windows o Mac, se recomienda Mac porque los modelos locales corren muy rápido en Apple Silicon)
- Un entorno Node.js (versión 18.0 o superior)
- Tu asistente de codificación con IA (Cursor / Trae / Claude Code)
- (Opcional) Una clave API de OpenAI (si usas el modo en la nube)
- Un micrófono (el micrófono incorporado del portátil es suficiente)

## 1.1 ¿Qué es Electron?

Aplicaciones que usas todos los días, como **VS Code, Slack, Discord y Notion**, tienen algo en común: todas son aplicaciones de escritorio construidas con **Electron**.

Electron es un framework de código abierto que te permite usar **HTML + CSS + JavaScript** (el mismo stack usado para páginas web) para construir aplicaciones de escritorio que funcionan en **Windows, macOS y Linux**. Su principio es simple: empaquetar Chromium y Node.js juntos, y tu página web se convierte en una aplicación de escritorio independiente.

**Comprensión en una oración**: Electron = un "navegador Chrome invisible" + capacidades de sistema Node.js.

<!-- ![placeholder: Un diagrama mostrando la arquitectura de Electron: Chromium (para renderizado de UI) + Node.js (para acceso al sistema) = aplicación de escritorio](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.png) -->

## 1.2 Arquitectura Central de Electron

Una aplicación Electron consta de dos tipos de procesos. Entenderlos es la clave para el desarrollo:

**Proceso Principal**

* El "gerente general" de la aplicación
* Responsable de crear ventanas, gestionar el ciclo de vida de la aplicación y acceder a capacidades nativas como el sistema de archivos
* Se ejecuta en el entorno Node.js y puede usar todos los módulos de Node.js
* Solo hay un proceso principal por aplicación

**Proceso de Renderizado**

* La "cara frontal" de la aplicación
* Esencialmente una página web de Chromium responsable del renderizado de UI
* Cada ventana corresponde a un proceso de renderizado
* Por razones de seguridad, el proceso de renderizado no puede acceder directamente a las APIs de Node.js

**Script de Precarga**

* El "puente" entre el proceso principal y el proceso de renderizado
* Usa `contextBridge` para exponer de forma segura APIs seleccionadas al proceso de renderizado

Se comunican a través de **IPC (Comunicación entre Procesos)**, como hacer una llamada telefónica: el renderizado dice "quiero empezar a grabar", y el proceso principal recibe esa solicitud y llama al micrófono del sistema.

<!-- ![placeholder: Un diagrama de arquitectura de procesos de Electron mostrando Proceso Principal, Proceso de Renderizado y Script de Precarga, más comunicación IPC entre ellos](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.png) -->

## 1.3 ¿Qué Vamos a Construir?

En este tutorial, construiremos una aplicación de escritorio de **Voz a Texto**. Su funcionalidad es sencilla:

1. Haz clic en el botón "Iniciar Grabación" y la aplicación comienza a escuchar el micrófono
2. Después de hablar, haz clic en "Detener" y la aplicación envía el audio a la IA para reconocimiento
3. El texto reconocido se muestra en la UI y se puede copiar con un clic

**Dos modos de reconocimiento están disponibles:**

| Dimensión de Comparación | Modo API en la Nube | Modo Modelo Local |
|---------|-------------|------------|
| Solución Representativa | OpenAI Whisper API | whisper.cpp |
| Internet Requerido | Sí | No |
| Velocidad de Reconocimiento | Depende de la red | Depende del hardware (muy rápido en Apple Silicon) |
| Calidad de Reconocimiento en Chino | Excelente | Excelente (modelo large-v3) |
| Costo | $0.006/minuto | Gratis |
| Tamaño del Modelo | No requiere descarga | modelo tiny 75MB, modelo large 3GB |
| Mejor Para | Incorporación rápida, uso ligero | Enfoque en privacidad, uso sin conexión, uso frecuente a largo plazo |

<!-- ![placeholder: Una vista previa de la app mostrando la UI de voz a texto: botón de grabación y animación de onda en la parte superior, texto reconocido debajo y un interruptor de modo en la esquina superior derecha](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.png) -->

## 1.4 Nota Importante: Web Speech API No Está Disponible en Electron

Si has buscado "reconocimiento de voz Electron", puedes haber visto recomendaciones para usar la `Web Speech API` del navegador. **Ten en cuenta: esto no funciona en Electron.**

Google ha discontinuado el soporte de la API de voz para shells de navegador que no sean Chrome/Edge. Electron está basado en Chromium, pero no es Chrome en sí, por lo que `window.SpeechRecognition` fallará directamente.

Por eso necesitamos soluciones independientes como OpenAI Whisper API o whisper.cpp.

## 1.5 Hoja de Ruta del Tutorial

Completaremos el flujo completo en los siguientes pasos:

1. **Crear un proyecto Electron**: Usar Electron Forge para generar el esqueleto del proyecto y entender la comunicación entre procesos
2. **Implementar grabación**: Capturar entrada del micrófono en el proceso de renderizado y procesar datos de audio
3. **Reconocimiento en la nube (Opción A)**: Usar OpenAI Whisper API para voz a texto
4. **Reconocimiento local (Opción B)**: Usar whisper.cpp localmente sin acceso a internet
5. **Empaquetado y distribución**: Empaquetar la aplicación en un programa de escritorio instalable

# Capítulo 2: Crear el Proyecto Electron

## 2.1 Inicializar el Proyecto con IA

Abre tu asistente de codificación con IA e ingresa este prompt:

```
Por favor ayúdame a crear un nuevo proyecto Electron con Electron Forge usando la plantilla Vite.
El nombre del proyecto es voice-to-text.
Por favor ejecuta: npx create-electron-app voice-to-text --template=vite
Después de la creación, entra al directorio del proyecto e instala las dependencias.
```

Electron Forge es la herramienta de scaffolding recomendada oficialmente por Electron. Ayuda con la inicialización del proyecto, empaquetado, distribución y otras tareas tediosas de configuración.

Después de la creación, la estructura del proyecto es aproximadamente:

```text
voice-to-text/
├── src/
│   ├── main.js            # Entrada del proceso principal
│   ├── preload.js         # Script de precarga (puente)
│   ├── renderer.js        # Entrada del proceso de renderizado
│   └── index.html         # Página HTML de la aplicación
├── forge.config.js        # Configuración de Electron Forge
├── vite.main.config.mjs   # Configuración Vite del proceso principal
├── vite.preload.config.mjs # Configuración Vite del script de precarga
├── vite.renderer.config.mjs # Configuración Vite del proceso de renderizado
└── package.json
```

## 2.2 Iniciar y Previsualizar

Pide a la IA que inicie el servidor de desarrollo:

```
Por favor ayúdame a iniciar el servidor de desarrollo de Electron ejecutando npm start
```

Después de unos segundos, aparece una ventana de escritorio. Esta es tu aplicación Electron. Aunque solo muestra una página de bienvenida predeterminada ahora, ya es un programa de escritorio real.

<!-- ![placeholder: Captura de pantalla del primer inicio de la app Electron con la página de bienvenida predeterminada](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 Entender IPC (Comunicación entre Procesos)

Antes de implementar las funciones de voz, necesitamos entender el concepto más importante de Electron: **IPC (Comunicación entre Procesos)**.

Como el proceso de renderizado (UI) y el proceso principal (capacidades del sistema) están aislados, deben usar "llamadas telefónicas" IPC para colaborar:

```text
Proceso de renderizado (UI)                 Proceso principal (sistema)
    │                                │
    │── "Quiero empezar a grabar" ──────────→   │
    │                                │── Llamar micrófono
    │                                │── Procesar audio
    │   ←──── "Aquí está el resultado" ─────────────│
    │                                │
    │── Mostrar texto en UI           │
```

En código, esta comunicación se hace a través de `preload.js`:

```javascript
// preload.js - exponer APIs de forma segura al proceso de renderizado
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Renderizado -> Principal
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Principal -> Renderizado
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - proceso principal escucha mensajes
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Llamar Whisper API o whisper.cpp aquí
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: Diagrama de flujo IPC mostrando transferencia de mensajes desde Renderizado -> Precarga -> Principal](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.png) -->

# Capítulo 3: Implementar la Grabación

## 3.1 Capturar Entrada del Micrófono en el Proceso de Renderizado

El navegador (que es el proceso de renderizado de Electron) proporciona `navigator.mediaDevices.getUserMedia` para acceder al micrófono. Pide a la IA que ayude a implementar la grabación:

```
Por favor ayúdame a modificar src/index.html y src/renderer.js para implementar:

UI:
1. Un botón circular grande "Iniciar Grabación", que se convierte en un botón rojo "Detener Grabación" al hacer clic
2. Mostrar una animación de pulso simple mientras se graba
3. Un área de visualización de texto debajo para los resultados del reconocimiento
4. Dos botones en la parte inferior: "Copiar Texto" y "Limpiar"
5. Un ícono de configuración en la esquina superior derecha para cambiar el modo de reconocimiento (nube/local)

Lógica de grabación (en renderer.js):
1. Al hacer clic en el botón, solicitar acceso al micrófono via navigator.mediaDevices.getUserMedia
2. Usar MediaRecorder para grabar audio en formato webm
3. Después de detener, convertir el Blob de audio a ArrayBuffer
4. Enviarlo al proceso principal via window.electronAPI.sendAudio
5. Esperar el resultado del reconocimiento del proceso principal y mostrarlo
```

Código central de grabación:

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

    // Enviar al proceso principal para transcripción
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: Captura de pantalla de la UI de grabación con botón rojo de estado de grabación y animación de pulso, más área de resultado de texto debajo](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.png) -->

## 3.2 Manejar Permisos del Micrófono

Electron bloquea las solicitudes de permisos por defecto. Necesitamos permitir explícitamente el acceso al micrófono en el proceso principal:

```
Por favor ayúdame a añadir manejo de permisos del micrófono en main.js:
1. Usar session.defaultSession.setPermissionRequestHandler para manejar solicitudes de permisos
2. Permitir automáticamente cuando el tipo de solicitud es 'media'
3. Para macOS, asegurar que la descripción de uso del micrófono esté declarada en package.json o entitlements
```

```javascript
// Añadir a main.js
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

> **Nota para usuarios de macOS**: macOS mostrará un diálogo de permiso de micrófono a nivel de sistema. Esto es normal. Haz clic en "Permitir".

# Capítulo 4: Opción A - Reconocimiento en la Nube (OpenAI Whisper API)

Esta es la opción más simple. Solo necesitas una clave API y unas pocas líneas de código.

## 4.1 Obtener una Clave API de OpenAI

1. Visita [OpenAI Platform](https://platform.openai.com/), regístrate e inicia sesión
2. Ve a la página de API Keys y haz clic en **"Create new secret key"**
3. Copia la clave generada (comienza con `sk-`) y guárdala de forma segura

> **Referencia de costo**: Whisper API cuesta **$0.006/minuto**. Eso significa reconocer 1 hora de audio solo cuesta $0.36, lo cual es muy asequible.

## 4.2 Llamar a la API de Whisper en el Proceso Principal

Pide a la IA que implemente el reconocimiento de voz en el proceso principal:

```
Por favor ayúdame a implementar OpenAI Whisper API en main.js:
1. Instalar node-fetch (si es necesario) o usar fetch incorporado en Node.js
2. Crear función transcribeWithWhisper que acepte audio ArrayBuffer
3. Convertir ArrayBuffer a Blob/File y construir FormData
4. Llamar a https://api.openai.com/v1/audio/transcriptions
5. Usar modelo whisper-1 y establecer idioma a zh (chino)
6. Retornar el texto reconocido
7. Leer clave API desde variables de entorno o archivo de configuración
```

Código central:

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

<!-- ![placeholder: Captura de pantalla de la app ejecutándose mostrando voz en chino reconocida devuelta por Whisper API](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.png) -->

## 4.3 Añadir una UI de Configuración

Pide a la IA que añada un panel de configuración simple en el proceso de renderizado para ingresar la clave API y cambiar el modo de reconocimiento:

```
Por favor ayúdame a añadir un panel de configuración en index.html:
1. Añadir un ícono de engranaje en la esquina superior derecha; hacer clic para expandir el panel de configuración
2. El panel incluye:
   - Interruptor de modo de reconocimiento (API en la Nube / Modelo Local)
   - Entrada de API Key (solo visible en modo nube)
   - Menú desplegable de idioma (Chino / Inglés / Detección automática)
3. Guardar configuración en localStorage
4. Cerrar panel al hacer clic fuera
```

<!-- ![placeholder: Captura de pantalla del panel de configuración expandido mostrando interruptor de modo y entrada de API key](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# Capítulo 5: Opción B - Reconocimiento Local (whisper.cpp)

Si no quieres depender de APIs en la nube, o si necesitas uso sin conexión, whisper.cpp es la mejor opción. Es un port en C++ del modelo Whisper de OpenAI y se ejecuta completamente de forma local sin internet.

## 5.1 Instalar Bindings de Node.js de whisper.cpp

Pide a la IA que instale y configure:

```
Por favor ayúdame a instalar nodejs-whisper en el proyecto:
npm install nodejs-whisper

Después de la instalación, por favor ayúdame a descargar el modelo tiny de whisper (tamaño pequeño, rápido para pruebas).
nodejs-whisper manejará la descarga del modelo automáticamente.
```

> **Guía de selección de modelo**:
> * `tiny` (75MB): el más rápido, bueno para pruebas y uso ligero, precisión promedio
> * `base` (142MB): balance entre velocidad y precisión
> * `small` (466MB): calidad de reconocimiento en chino claramente mejor
> * `large-v3-turbo` (1.5GB): recomendado; 5-8x más rápido que large, con solo 1-2% menos precisión
> * `large-v3` (3GB): máxima precisión, pero más lento y necesita mejor hardware

## 5.2 Integrar whisper.cpp en el Proceso Principal

Pide a la IA que implemente el reconocimiento local:

```
Por favor ayúdame a añadir reconocimiento local whisper.cpp en main.js:
1. Importar nodejs-whisper
2. Crear función transcribeWithLocal
3. Aceptar audio ArrayBuffer y guardarlo como archivo WAV temporal primero (16kHz mono)
4. Llamar nodejs-whisper para reconocimiento
5. Retornar texto reconocido
6. Eliminar archivo temporal después del reconocimiento
```

Código central:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Guardar como archivo temporal
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
    // Limpiar archivo temporal
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: Captura de pantalla del reconocimiento con modelo local funcionando sin conexión con entrada de voz en chino](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Buenas Noticias para Usuarios de Apple Silicon

Si estás usando una Mac M1/M2/M3/M4, whisper.cpp puede usar automáticamente **aceleración GPU Metal** y **Apple Neural Engine**. El reconocimiento puede ejecutarse **más rápido que en tiempo real**, lo que significa que 1 minuto de audio puede tomar solo unos segundos para procesarse.

Para usuarios con GPU NVIDIA, whisper.cpp también soporta **aceleración CUDA**, que proporciona un rendimiento fuerte también.

# Capítulo 6: Empaquetado y Distribución

Después de completar el desarrollo, necesitamos empaquetar la aplicación en instaladores distribuibles.

## 6.1 Empaquetar con Electron Forge

Electron Forge ya está incluido en nuestro proyecto, así que el empaquetado es simple:

```
Por favor ayúdame a ejecutar el comando de empaquetado de Electron Forge:
npx electron-forge make
```

Este comando genera automáticamente instaladores para tu sistema operativo actual:

* **macOS**: imagen instalador `.dmg` y archivo `.zip`
* **Windows**: instalador `.exe` (formato Squirrel)
* **Linux**: paquetes `.deb` (Debian/Ubuntu) y `.rpm` (Fedora)

Los resultados de construcción están en el directorio `out/make/`.

<!-- ![placeholder: Captura de pantalla de archivos en el directorio out/make mostrando instaladores .dmg o .exe generados](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 Optimización del Tamaño de la Aplicación

Un "punto doloroso" de las aplicaciones Electron es el gran tamaño del paquete (porque Chromium está incluido). Sugerencias de optimización:

* Asegúrate de que solo los paquetes en `dependencies` estén incluidos, y mantén las dependencias de desarrollo en `devDependencies`
* Usa tree-shaking de Vite para reducir el tamaño de JavaScript
* Si usas modelos locales, considera descargar modelos en el primer inicio en lugar de incluirlos en el instalador

| Configuración | Tamaño Estimado |
|------|---------|
| App Electron pura (sin modelo) | ~150-200 MB |
| + modelo whisper tiny | ~250 MB |
| + modelo whisper large-v3-turbo | ~1.7 GB |

## 6.3 Notas Multiplataforma

**macOS:**
* Publicar en App Store o distribuir a otros requiere **firma de código** (Apple Developer ID, $99/año)
* También requiere el proceso de **Notarización** de Apple
* Los permisos de micrófono deben declarar `NSMicrophoneUsageDescription` en `Info.plist`
* Se recomienda construir un Binary Universal para soportar tanto Intel como Apple Silicon

**Windows:**
* Se recomienda firma de código, de lo contrario Windows SmartScreen mostrará advertencias de seguridad
* Los usuarios aún pueden elegir "Ejecutar de todos modos" para apps sin firmar

**Linux:**
* No se requiere firma de código
* Se recomienda proporcionar formatos `.deb` y `.AppImage`

> **Consejo**: Para proyectos personales o distribución a pequeña escala, puedes omitir temporalmente la firma de código y compartir directamente los archivos empaquetados con amigos.

# Capítulo 7: Notas Finales

¡Felicidades! Has construido una aplicación de escritorio multiplataforma de voz a texto desde cero. Recapitulemos lo que hicimos:

1. Usamos Electron Forge para generar una aplicación de escritorio multiplataforma
2. Entendimos el proceso principal, proceso de renderizado y comunicación IPC
3. Implementamos grabación de micrófono y captura de audio
4. Integramos dos opciones de reconocimiento de voz: Whisper API en la nube y whisper.cpp local
5. Aprendimos cómo empaquetar y distribuir una aplicación Electron

Lo que hace poderoso a Electron es que puedes construir aplicaciones de escritorio al nivel de VS Code o Slack usando un stack de tecnologías web. Y con reconocimiento de voz IA maduro, una función como voz a texto, que antes requería un equipo especializado, ahora puede ser construida por una sola persona.

**Direcciones avanzadas:**

* **Subtítulos en tiempo real**: Usar AudioWorklet para audio en streaming y emparejar con APIs de reconocimiento en streaming para transcripción en vivo
* **Asistente de reuniones**: Grabar reuniones completas, generar automáticamente transcripciones con marcas de tiempo y resumir puntos clave con IA
* **Traducción multilingüe**: Transcribir voz y llamar APIs de traducción para conversión de idioma en tiempo real
* **Bloc de notas de voz**: Combinar con una base de datos local (como SQLite) para construir notas de voz buscables

***Deja que tu voz suene, y deja que el código registre todo por ti.***

# Referencias

* [Documentación Oficial de Electron](https://www.electronjs.org/docs/latest/)
* [Documentación Oficial de Electron Forge](https://www.electronforge.io/)
* [Documentación de OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
* [Repositorio GitHub de whisper.cpp](https://github.com/ggml-org/whisper.cpp)
* [Paquete npm nodejs-whisper](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
