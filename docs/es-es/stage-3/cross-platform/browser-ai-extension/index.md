# Cómo construir una extensión de navegador asistente de IA: Resumir cualquier página web con un clic

# Capítulo 1: Qué son las extensiones de navegador y el desarrollo de extensiones de Chrome

En este tutorial, completaremos un ciclo completo: construiremos una extensión de navegador Chrome impulsada por IA desde cero. Puede leer el contenido de cualquier página web que estés navegando, y luego usar IA para generar un resumen con un clic. Completarás personalmente el desarrollo de la extensión, la depuración y aprenderás cómo publicarla en la Chrome Web Store.

Para este tutorial, deberías tener al menos:

- Navegador Chrome (versión 138+ recomendada si quieres usar IA incorporada)
- Un editor de código (VS Code / Cursor / Trae)
- (Opcional) Una clave API de OpenAI o Claude

## 1.1 ¿Qué es una Extensión de Navegador?

Definitivamente has usado extensiones de navegador antes: bloqueadores de anuncios, herramientas de traducción, gestores de contraseñas... Son como "equipamiento extra" para tu navegador, dándote superpoderes mientras navegas la web.

Imagina esto: abres un artículo técnico de 5,000 palabras, haces clic una vez en el botón de la extensión, y unos segundos después aparece un resumen conciso en chino en el panel lateral. Eso es exactamente lo que vamos a construir.

![placeholder: Una imagen de vista previa mostrando una página web con artículo largo a la izquierda y un resumen generado por IA mostrado en el panel lateral de Chrome a la derecha](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png)

<!-- ![placeholder: Una imagen de vista previa mostrando una página web con artículo largo a la izquierda y un resumen generado por IA mostrado en el panel lateral de Chrome a la derecha](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.png) -->

## 1.2 La Arquitectura Básica de una Extensión de Chrome

Las extensiones de Chrome (basadas en Manifest V3) constan de varias partes centrales, cada una con su propio rol:

* **Archivo Manifest (`manifest.json`)**: la "tarjeta de identificación" de la extensión, declarando su nombre, permisos, archivos de entrada y más.
* **Service Worker (script de fondo)**: el "cerebro" de la extensión, manejando eventos y llamando a APIs en segundo plano. No se ejecuta continuamente, sino que se inicia cuando se necesita.
* **Content Script**: los "ojos" de la extensión, inyectado en las páginas web y capaz de leer el contenido del DOM.
* **Panel Lateral**: la "cara" de la extensión, mostrando UI en el lado derecho del navegador donde los usuarios ven los resultados del resumen de IA.
* **Página de Opciones**: permite a los usuarios configurar la clave API y ajustes relacionados.

Su flujo de trabajo se ve así:

```text
El usuario hace clic en el ícono de la extensión
    -> Se abre el panel lateral
    -> El usuario hace clic en el botón "Resumir"
    -> El panel lateral notifica al Service Worker
    -> El Service Worker pide al Content Script que lea el texto de la página
    -> El Content Script devuelve el contenido de la página
    -> El Service Worker envía el contenido a la API de IA
    -> La IA devuelve el resumen
    -> El Service Worker envía el resumen de vuelta al panel lateral para mostrarlo
```

![placeholder: Un diagrama de arquitectura mostrando cómo Content Script, Service Worker y Panel Lateral se pasan mensajes entre sí](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png)
<!-- ![placeholder: Un diagrama de arquitectura mostrando cómo Content Script, Service Worker y Panel Lateral se pasan mensajes entre sí](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.png) -->

## 1.3 Dos Opciones de IA: API en la Nube vs IA Incorporada del Navegador

Nuestra extensión tiene dos formas de acceder a la capacidad de IA:

**Opción A: Llamar a APIs de IA en la nube (OpenAI / Claude)**

* Ventajas: capacidad de modelo potente, soporta todos los dispositivos
* Desventajas: necesita una clave API, requiere internet, tiene costo de uso
* Mejor para: resúmenes de alta calidad y manejo de contenido más complejo

**Opción B: Usar IA incorporada de Chrome (Summarizer API)**

A partir de Chrome 138, Google incorporó capacidad de IA basada en Gemini Nano directamente en el navegador. Una de ellas es la **Summarizer API** - se ejecuta completamente de forma local, no requiere clave API, no requiere internet, y es completamente gratis.

* Ventajas: gratis, amigable con la privacidad, no necesita clave API
* Desventajas: requiere Chrome 138+, mejor hardware (4GB+ VRAM o 16GB+ RAM), capacidad del modelo es menor que IA en la nube
* Mejor para: usuarios que valoran la privacidad, no quieren pagar y tienen hardware suficiente

**Este tutorial implementará ambas opciones**, y podrás elegir según tu propia situación.

## 1.4 Hoja de Ruta del Tutorial

Construiremos una extensión de Chrome llamada **"AI Page Summarizer"** desde cero, siguiendo estos pasos:

1. **Construir el esqueleto de la extensión**: crear una estructura de proyecto Manifest V3 y cargarla en Chrome
2. **Implementar la función central**: Content Script lee la página + Service Worker llama a la API de IA + panel lateral muestra resultados
3. **Integrar IA incorporada de Chrome**: usar Summarizer API para proporcionar resumen local gratuito
4. **Pruebas y depuración**: aprender técnicas de depuración de extensiones de Chrome
5. **Publicar en Chrome Web Store**: empaquetar y enviar para revisión

# Capítulo 2: Construir el Esqueleto de la Extensión

## 2.1 Crear la Estructura del Proyecto

Abre tu asistente de codificación con IA (Cursor / Trae / Claude Code), crea una carpeta vacía llamada `ai-page-summarizer`, luego ingresa lo siguiente en el cuadro de chat:

```text
Por favor ayúdame a crear un proyecto de extensión de navegador Chrome usando Manifest V3.
El nombre del proyecto es ai-page-summarizer, y su función es resumir contenido de páginas web con IA.
Por favor crea la siguiente estructura de archivos:

ai-page-summarizer/
├── manifest.json          # Archivo manifest MV3
├── background.js          # Script de fondo Service Worker
├── content.js             # Content script (lee texto de páginas web)
├── sidepanel.html         # HTML del panel lateral
├── sidepanel.js           # Lógica del panel lateral
├── sidepanel.css          # Estilos del panel lateral
├── options.html           # Página de configuración
├── options.js             # Lógica de la página de configuración
└── icons/                 # Carpeta de íconos

Requisitos para manifest.json:
1. manifest_version: 3
2. Permisos: storage, activeTab, scripting, sidePanel
3. Usar service_worker: "background.js" para el fondo
4. Configurar side_panel con ruta predeterminada sidepanel.html
5. Configurar ícono y título predeterminados para action
```

La IA generará el esqueleto completo del proyecto. Veamos qué hace cada archivo.

## 2.2 `manifest.json`: La "Tarjeta de Identificación" de la Extensión

Este es el archivo más importante en una extensión de Chrome. Le dice al navegador qué es la extensión, qué permisos necesita y qué componentes contiene:

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Usa IA para resumir cualquier página web con un clic",
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

**Explicación de permisos:**

* `storage`: permite a la extensión almacenar datos como la clave API del usuario
* `activeTab`: permite a la extensión acceder a la pestaña actual que el usuario está viendo (solo después de la interacción del usuario, por lo que es muy seguro)
* `scripting`: permite a la extensión inyectar scripts en páginas para leer contenido
* `sidePanel`: permite a la extensión usar la API del panel lateral de Chrome

![placeholder: Captura de pantalla de manifest.json en el editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![placeholder: Captura de pantalla de manifest.json en el editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 Preparar Íconos

Las extensiones de Chrome necesitan íconos en tres tamaños: 16x16, 48x48 y 128x128. Puedes pedir a la IA que los genere:

```text
Por favor ayúdame a generar tres íconos simples de extensión de Chrome (16x16, 48x48, 128x128),
con un rectángulo redondeado, fondo morado degradado y un símbolo de rayo blanco de IA en el centro.
Guárdalos en el directorio icons/ como icon-16.png, icon-48.png e icon-128.png.
```

## 2.4 Cargar la Extensión en Chrome

Antes de escribir código, carguemos primero esta extensión "cáscara vacía" en Chrome, para que cada cambio posterior pueda previsualizarse inmediatamente:

1. Abre Chrome e ingresa `chrome://extensions/` en la barra de direcciones
2. Activa el **Modo de desarrollador** en la esquina superior derecha
3. Haz clic en **Cargar desempaquetada**
4. Selecciona tu carpeta `ai-page-summarizer`

Verás la extensión aparecer en la lista, y su ícono aparecerá en la barra de herramientas de Chrome.

![placeholder: Captura de pantalla de la página de extensiones de Chrome mostrando cómo activar el modo desarrollador y cargar una extensión](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![placeholder: Captura de pantalla de la página de extensiones de Chrome mostrando cómo activar el modo desarrollador y cargar una extensión](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **Consejo**: después de cada cambio de código, regresa a `chrome://extensions/` y haz clic en el **botón de actualización (🔄)** en la tarjeta de la extensión para actualizarla.

# Capítulo 3: Implementar la Función Central - Leer Página + Resumen con IA

## 3.1 Content Script: Leer Texto de la Página

El Content Script es un script inyectado en la página web. Puede acceder directamente al DOM de la página. Lo usamos para extraer el texto de la página.

Pide a la IA que escriba `content.js`:

```text
Por favor ayúdame a escribir content.js con las siguientes funciones:
1. Escuchar mensajes del Service Worker
2. Al recibir un mensaje "getPageContent", extraer el contenido de texto de la página actual
3. Lógica de extracción: obtener document.body.innerText, y también obtener el título y URL de la página
4. Retornar el contenido extraído via sendResponse
```

La IA generará código como este:

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
  return true // Mantener el canal de mensajes abierto
})
```

## 3.2 Service Worker: Llamar a la API de IA

El Service Worker es el "cerebro" de la extensión. Coordina la comunicación entre componentes y llama a APIs de IA externas.

Pide a la IA que escriba `background.js`:

```text
Por favor ayúdame a escribir background.js con las siguientes funciones:
1. Cuando el usuario hace clic en el ícono de la extensión, abrir el panel lateral
2. Escuchar mensajes "summarize" del panel lateral
3. Después de recibir el mensaje, enviar "getPageContent" al content script en la pestaña actual para obtener el contenido de la página
4. Después de recibir el contenido de la página, leer la clave API y selección de modelo configurados por el usuario desde chrome.storage.local
5. Llamar a la API de IA correspondiente según la configuración (soportar OpenAI y Claude)
6. Enviar el resumen de IA de vuelta al panel lateral

Para OpenAI, llamar a https://api.openai.com/v1/chat/completions y usar modelo gpt-4o-mini
Para Claude, llamar a https://api.anthropic.com/v1/messages y usar modelo claude-sonnet-4-20250514
Prompt del sistema: Por favor resume el siguiente contenido de página web en chino, extrae los puntos clave y manténlo dentro de 300 caracteres chinos.
```

El código central se ve así:

```javascript
// background.js

// Abrir el panel lateral cuando el usuario hace clic en el ícono
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Escuchar mensajes del panel lateral
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // Respuesta asíncrona
  }
})

async function handleSummarize(tabId) {
  // 1. Obtener contenido de la página
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. Leer configuración del usuario
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Por favor configura tu clave API en la página de configuración primero' }
  }

  // 3. Llamar a la API de IA
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![placeholder: Captura de pantalla del código background.js en el editor](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 UI del Panel Lateral: Mostrar Resultado del Resumen

El panel lateral es la UI de interacción principal para los usuarios. Pide a la IA que escriba el HTML, CSS y JS del panel lateral:

```text
Por favor ayúdame a escribir estos tres archivos para el panel lateral:

sidepanel.html:
- Mostrar el nombre del plugin "AI Page Summarizer" en la parte superior
- Un botón azul "Resumir Página Actual"
- Un área de animación de carga (oculta por defecto)
- Un área de visualización de resultados mostrando el título de la página y el resumen de IA
- Un botón "Copiar Resumen" en la parte inferior

sidepanel.css:
- Diseño moderno limpio, tipografía similar a Notion
- Ancho se adapta al panel lateral
- Los botones tienen efectos hover
- Animación de carga implementada con CSS

sidepanel.js:
- Al hacer clic en el botón "Resumir", obtener el ID de la pestaña actual
- Enviar un mensaje summarize a background.js
- Mostrar animación de carga
- Ocultar carga y mostrar resumen después de recibir resultado
- Usar navigator.clipboard.writeText en el botón "Copiar" para copiar texto
```

![placeholder: Captura de pantalla de la UI del panel lateral mostrando tres estados: botón de resumen, estado de carga y resultado del resumen](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![placeholder: Captura de pantalla de la UI del panel lateral mostrando tres estados: botón de resumen, estado de carga y resultado del resumen](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 Página de Configuración: Configurar la Clave API

Los usuarios necesitan un lugar para ingresar su propia clave API. Pide a la IA que escriba la página de configuración:

```text
Por favor ayúdame a escribir options.html y options.js:
- Un menú desplegable para elegir proveedor de IA (OpenAI / Claude)
- Una entrada de contraseña para la clave API (type="password")
- Un botón "Guardar"
- Guardar configuración con chrome.storage.local.set
- Leer configuración guardada del almacenamiento y llenar el formulario al cargar la página
- Mostrar "Configuración guardada" después de guardar
```

> **Recordatorio de seguridad**: la clave API se almacena en `chrome.storage.local` y solo se mantiene en el dispositivo local. Pero si quieres publicar esta extensión en la Chrome Web Store para que otros la usen, un enfoque más seguro es construir un servidor proxy backend para que la clave API no se exponga directamente en el lado del cliente.

![placeholder: Captura de pantalla de la página de configuración mostrando selección de proveedor y entrada de clave API p1](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![placeholder: Captura de pantalla de la página de configuración mostrando selección de proveedor y entrada de clave API p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![placeholder: Captura de pantalla de la página de configuración mostrando selección de proveedor y entrada de clave API p3](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![placeholder: Captura de pantalla de la página de configuración mostrando selección de proveedor y entrada de clave API](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# Capítulo 4: Usar IA Incorporada de Chrome (No se Necesita Clave API)

A partir de Chrome 138, Google incorporó capacidad de IA basada en **Gemini Nano** directamente en el navegador. La más adecuada para nuestro caso es la **Summarizer API** - se ejecuta completamente de forma local, no necesita clave API, no necesita internet, y es gratis.

## 4.1 Verificar Soporte del Navegador

La IA incorporada tiene requisitos de hardware:

* Chrome de escritorio 138+ (Windows 10+, macOS 13+, Linux, ChromeOS)
* 22 GB de espacio de almacenamiento disponible (para descarga del modelo)
* 4GB+ VRAM de GPU, o 16GB+ RAM del sistema con 4+ núcleos de CPU

Ingresa `chrome://flags` en la barra de direcciones de Chrome, busca el flag relacionado con Summarization y asegúrate de que esté **Enabled**.
* En Chrome 131-137, este interruptor se llama Summarization API.
* En Chrome 138-144, fue renombrado a Summarization API for Gemini Nano.
* En Chrome 145+, Summarization API for Gemini Nano fue eliminado, y su función de resumen fue integrada en Prompt API for Gemini Nano.

![placeholder: Captura de pantalla de chrome://flags mostrando el interruptor de Summarization API](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![placeholder: Captura de pantalla de chrome://flags mostrando el interruptor de Summarization API](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 Usar la Summarizer API

Pide a la IA que añada soporte para IA incorporada en `background.js`:

```text
Por favor ayúdame a añadir soporte para la Summarizer API incorporada de Chrome en background.js:
1. Añadir una función summarizeWithBuiltinAI
2. Primero verificar si Summarizer.availability() retorna 'readily-available'
3. Si está disponible, crear una instancia de summarizer, configurar type como 'key-points', format como 'markdown' y length como 'medium'
4. Llamar summarizer.summarize() para resumir
5. En handleSummarize, añadir una rama para provider === 'builtin'
```

Código central:

```javascript
async function summarizeWithBuiltinAI(text) {
  // Verificar disponibilidad
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('La IA incorporada de Chrome no está disponible. Por favor verifica la versión del navegador y los requisitos de hardware.')
  }

  // Crear summarizer
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // Ejecutar resumen
  const summary = await summarizer.summarize(text, {
    context: 'Este es un artículo de página web'
  })

  return summary
}
```

## 4.3 Actualizar la Página de Configuración

Añadir una opción **"IA Incorporada de Chrome (Gratis, No se Necesita Clave API)"** al menú desplegable de proveedor en `options.html`. Cuando los usuarios la eligen, ocultar la entrada de clave API porque ya no se necesita.

```text
Por favor ayúdame a modificar options.html y options.js:
1. Añadir una opción "IA incorporada de Chrome (gratis, no se necesita clave API)" al menú desplegable de proveedor, con valor "builtin"
2. Ocultar la entrada de clave API cuando builtin está seleccionado
3. Mostrar la entrada de clave API cuando OpenAI o Claude está seleccionado
```

![placeholder: Captura de pantalla de la página de configuración actualizada mostrando tres opciones de proveedor de IA, con entrada de clave API oculta cuando IA incorporada de Chrome está seleccionada](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![placeholder: Captura de pantalla de la página de configuración actualizada mostrando tres opciones de proveedor de IA, con entrada de clave API oculta cuando IA incorporada de Chrome está seleccionada](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# Capítulo 5: Pruebas y Depuración

## 5.1 Flujo de Trabajo de Pruebas Locales

Depurar extensiones de Chrome es un poco diferente de depurar páginas web normales:

**Depurar Service Worker:**
1. Abre `chrome://extensions/`
2. Encuentra tu extensión y haz clic en el enlace **Service Worker**
3. Se abre una ventana de DevTools dedicada donde puedes ver la salida de `console.log` y solicitudes de red

**Depurar Panel Lateral:**
1. Abre el panel lateral
2. Haz clic derecho dentro del contenido del panel lateral
3. Elige **Inspeccionar**
4. Esto abre DevTools para el panel lateral

**Depurar Content Script:**
1. Abre DevTools con F12 en cualquier página web
2. En el panel Console, haz clic en el menú desplegable de contexto de ejecución en la esquina superior izquierda
3. Selecciona el nombre de tu extensión
4. Luego puedes ver la salida de `console` del Content Script

![placeholder: Captura de pantalla de Chrome DevTools mostrando cómo elegir diferentes contextos de ejecución para depurar diferentes componentes de la extensión](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png)
<!-- ![placeholder: Captura de pantalla de Chrome DevTools mostrando cómo elegir diferentes contextos de ejecución para depurar diferentes componentes de la extensión](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.png) -->

## 5.2 Solución de Problemas Comunes

| Problema | Causa Posible | Solución |
|------|---------|---------|
| Hacer clic en el ícono no hace nada | Error del Service Worker | Verificar la Consola de DevTools del Service Worker |
| No se puede obtener contenido de la página | Content Script no inyectado | Actualizar la página e intentar de nuevo, verificar config `matches` en manifest |
| La llamada a la API falla | Clave API incorrecta o expirada | Re-ingresar la clave API en la página de configuración |
| El panel lateral está en blanco | La ruta de `sidepanel.html` es incorrecta | Verificar `side_panel.default_path` en manifest |


# Capítulo 6: Publicar en la Chrome Web Store (Opcional)

Si quieres compartir la extensión con otros, puedes publicarla en la Chrome Web Store.

## 6.1 Prepararse para la Publicación

1. **Registrar una cuenta de desarrollador**: visita [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) y paga la tarifa de registro única de $5
2. **Activar la Verificación en 2 Pasos**: tu cuenta de Google debe tener Verificación en 2 Pasos activada antes de publicar
3. **Preparar recursos**:
   * Ícono de extensión: PNG 128x128
   * Al menos una captura de pantalla: 1280x800 recomendado
   * Descripción funcional detallada
   * Explicación de política de privacidad (si tu extensión procesa datos de usuario)

## 6.2 Empaquetar y Subir

1. Comprime la carpeta de la extensión como archivo `.zip` (no `.crx`)
2. Haz clic en **New Item** en el Developer Dashboard
3. Sube el archivo `.zip`
4. Llena la información de la tienda (nombre, descripción, capturas de pantalla, categoría, etc.)
5. Llena las prácticas de privacidad (declara qué datos de usuario recopila tu extensión)
6. Haz clic en **Submit for Review**

Google revisará las extensiones enviadas, lo que usualmente toma varios días hábiles. Cuantos menos permisos solicites y más clara sea tu descripción, más rápida será la revisión.

![placeholder: Captura de pantalla del Chrome Web Store Developer Dashboard mostrando subida de extensión y formulario de metadatos](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![placeholder: Captura de pantalla del Chrome Web Store Developer Dashboard mostrando subida de extensión y formulario de metadatos p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![placeholder: Captura de pantalla del Chrome Web Store Developer Dashboard mostrando subida de extensión y formulario de metadatos](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# Capítulo 7: Notas Finales

¡Felicidades! Has construido una extensión de navegador impulsada por IA desde cero. Revisemos lo que hicimos:

1. Entendimos la arquitectura Manifest V3 de las extensiones de Chrome
2. Usamos Content Script para leer el contenido de páginas web
3. Usamos Service Worker para llamar a APIs de IA y generar resúmenes
4. Usamos Panel Lateral para mostrar el resultado del resumen
5. También aprendimos cómo usar IA incorporada de Chrome sin ninguna clave API

El desarrollo de extensiones de navegador es un campo muy interesante - te permite "mejorar" cualquier página web en internet. Además de resumir páginas, puedes construir muchas más cosas con una arquitectura similar:

**Direcciones avanzadas:**

* **Asistente de traducción**: traducir páginas web extranjeras al chino con un clic
* **Anotaciones de lectura**: resaltar y anotar páginas, luego guardar en la nube
* **Seguimiento de precios**: monitorear cambios de precio en páginas de comercio electrónico y notificar a los usuarios
* **Explicador de código**: seleccionar código en GitHub y dejar que la IA lo explique automáticamente

La llegada de la IA incorporada de Chrome reduce aún más la barrera - ni siquiera necesitas una clave API para construir extensiones impulsadas por IA. A medida que las capacidades de IA del navegador sigan creciendo, el espacio de imaginación en este campo solo aumentará.

***¡Dale a tu navegador algunos superpoderes!***

# Referencias

* [Documentación Oficial de Extensiones de Chrome - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [Publicar Extensión de Chrome en la Chrome Web Store](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [Chrome Side Panel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [IA Incorporada de Chrome - Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
* [IA Incorporada de Chrome - Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
* [Documentación de OpenAI API](https://platform.openai.com/docs/api-reference)
* [Documentación de Anthropic Claude API](https://docs.anthropic.com/en/docs/)
* [Documentación de Anthropic Claude API](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
