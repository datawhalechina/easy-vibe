# Cómo elegir la plataforma adecuada para tu aplicación

Tienes una idea y quieres convertirla en un producto real. Pero con tantas opciones de plataforma - Mini Programas de WeChat, apps iOS, apps Android, sitios web, extensiones de navegador, aplicaciones de escritorio - ¿por dónde deberías empezar?

::: tip 💡 Navegación Rápida
Si ya conoces las características de cada plataforma, puedes saltar directamente a la [Sección 2](#2-hazte-tres-preguntas-primero) para el proceso de decisión, o ver [el diagrama de flujo de decisión en la Sección 7](#7-resumen-flujo-de-decision-de-seleccion-de-plataforma).
:::

Este artículo te ayudará a organizar tu pensamiento y encontrar la plataforma de desarrollo más adecuada según tu escenario específico.

## 1 Conoce Estas Plataformas Primero

Antes de discutir "cuál elegir", primero entiende "cuáles existen". A continuación están las categorías de plataformas principales actuales:

### 1.1 Plataformas Móviles

#### App Nativa iOS

Las apps que descargas de la App Store en tu iPhone son apps nativas iOS. Sus características son: inicio rápido, experiencia fluida y acceso completo a las capacidades del teléfono (cámara, ubicación, datos de salud, etc.). Pero el desarrollo requiere una Mac, y el lanzamiento en App Store requiere la revisión de Apple.

**Ejemplos comunes**: WeChat, Douyin (TikTok China), Xiaohongshu, Keep, Meituan, Alipay

#### App Nativa Android

Las apps descargadas de tiendas de apps de Android, o instaladas desde archivos APK enviados por amigos, son apps nativas Android. Son similares a las apps iOS, pero Android tiene más usuarios y más canales de distribución. La desventaja es la fragmentación de dispositivos: los desarrolladores deben adaptarse a muchos tamaños de pantalla y versiones de sistema.

**Ejemplos comunes**: Tasker (automatización), MX Player (reproductor de video), AirDroid (gestor de teléfono), Greenify (optimización de batería), Xposed Framework (personalización del sistema)

#### Mini Programa de WeChat

Las "pequeñas apps" que puedes usar directamente dentro de WeChat escaneando un código o buscando por nombre, sin necesidad de instalación. La ventaja es baja fricción para el usuario: todos ya tienen WeChat, así que los usuarios pueden empezar instantáneamente. La desventaja es capacidades limitadas, y solo se ejecuta dentro de WeChat.

**Ejemplos comunes**: Pinduoduo (compras grupales), Meituan Waimai (servicios locales), Mobike (compartir bicicletas), Jump Jump (mini juego), Zhouheiya (pedidos/compras)

#### PWA (Progressive Web App)

Suena técnico, pero básicamente es "una página web que puede instalarse como una app." Cuando los usuarios abren un sitio en un navegador móvil, pueden ver "Añadir a Pantalla de Inicio." Con un toque, aparece un ícono en la pantalla de inicio y se comporta como una app. La ventaja es una base de código para móvil y escritorio. La desventaja es que muchos usuarios no conocen este patrón de uso.

**Ejemplos comunes**: Twitter Lite, Starbucks, Pinterest, Uber, Spotify Web Player

### 1.2 Plataformas de Escritorio

#### App de Escritorio Electron

Puedes usarlas todos los días: VS Code, Slack, Discord, Notion, Figma - todas construidas con Electron. La característica clave es: construir software de escritorio usando tecnologías web (HTML, CSS, JavaScript), y ejecutar una base de código en Windows, Mac y Linux. La desventaja son instaladores más grandes y mayor uso de memoria en tiempo de ejecución.

**Ejemplos comunes**: VS Code, Slack, Discord, Notion, Figma, Herramientas de Desarrollador de WeChat

#### Aplicación de Escritorio Qt

Si has usado WPS, VirtualBox u OBS, pueden haber sido construidas con Qt. Qt usa C++, con buen rendimiento y estabilidad, especialmente adecuada para escenarios industriales. Pero la curva de aprendizaje es mayor, y se requiere conocimiento de C++.

**Ejemplos comunes**: WPS Office, VirtualBox, Autodesk Maya, Telegram Desktop, OBS Studio

#### Aplicación de Escritorio Nativa

Estas aplicaciones "pesadas" usualmente se construyen con tecnologías nativas. Windows a menudo usa C# o C++; macOS usa Swift. Proporcionan el mejor rendimiento y la experiencia más fluida, pero las versiones de Windows y macOS deben desarrollarse por separado, lo cual es costoso.

**Ejemplos comunes**: Microsoft Office, Adobe Photoshop, Final Cut Pro, WeChat (Windows/Mac), QQ Music

### 1.3 Plataformas Relacionadas con la Web

#### Sitio Web

Son las páginas que se abren ingresando URLs en un navegador. Ventajas: accesibles en cualquier dispositivo (teléfono, computadora, tablet), no requieren instalación y son rastreables por motores de búsqueda. Desventaja: se requiere conexión a internet, por lo que el uso sin conexión no está disponible.

**Ejemplos comunes**: Taobao, Zhihu, GitHub, Bilibili, Juejin, CSDN

#### Extensión de Navegador

¿Has usado bloqueadores de anuncios, herramientas de traducción o gestores de contraseñas? Estas son extensiones de navegador. Se ejecutan dentro de los navegadores y pueden leer/modificar el contenido de las páginas web. Por ejemplo, instalas una extensión de traducción y traduces páginas en inglés con un clic. Ventaja: ligera y se inicia con el navegador. Desventaja: solo funciona en navegadores, y las extensiones no siempre son compatibles entre Chrome, Edge y Firefox.

**Ejemplos comunes**: AdBlock Plus, Immersive Translate, 1Password, Grammarly, Tampermonkey, Dark Reader

### 1.4 Otras Plataformas

#### Extensión de VS Code

Si eres desarrollador, probablemente usas VS Code. Las extensiones de VS Code son pequeños programas que "añaden funciones" al editor. Ventaja: audiencia de desarrolladores muy específica. Desventaja: solo útil para usuarios desarrolladores.

**Ejemplos comunes**: Prettier, GitLens, GitHub Copilot, ESLint, Live Server, Chinese Language Pack

#### Contrato Inteligente NFT

Puedes haber oído sobre los NFTs - esos "avatares digitales" vendidos por millones. Los NFTs son esencialmente certificados de propiedad basados en blockchain que prueban que un elemento digital te pertenece. Los contratos inteligentes son programas que se ejecutan en blockchain para crear y gestionar NFTs. Ventaja: inalterables y comercializables. Desventaja: alta barrera técnica y mercado volátil.

**Ejemplos comunes**: BAYC, CryptoPunks, NBA Top Shot, Azuki, Moonbirds

### 1.5 ¿Hay Más Opciones?

Más allá de las plataformas anteriores, también hay "caminos intermedios" y más posibilidades:

#### Frameworks Multiplataforma

::: details Haz clic para ver detalles de frameworks multiplataforma

**React Native / Flutter**: ¿quieres tanto iOS como Android sin escribir dos bases de código? Estos frameworks te permiten escribir una vez y generar apps para ambas plataformas. Muchas empresas los usan, como Airbnb e Instagram.

**Tauri**: una "alternativa ligera" a Electron. También usa tecnologías web para construir apps de escritorio pero con instaladores más pequeños y ejecución más rápida. Desventaja: el ecosistema es menos maduro.

**uni-app**: muy popular en China. Una base de código puede dirigirse a Mini Programa de WeChat, app iOS, app Android y sitio H5. Adecuado para equipos que quieren "construir una vez, ejecutar en todas partes."

**Capacitor / Ionic**: ¿ya tienes un sitio web y quieres convertirlo rápidamente en una app? Estas herramientas pueden "envolver" tu sitio web en una app instalable para tiendas de apps.

Estos frameworks son esencialmente compromisos entre desarrollo nativo y web: mayor eficiencia de desarrollo, pero algunos compromisos en rendimiento y experiencia.
:::

#### Ecosistema de Mini Programas de China

::: details Haz clic para ver opciones de mini programas en China

**Mini Programa de Alipay**: escenarios de finanzas y servicios locales. Si tus usuarios pagan facturas, piden comida o usan transporte en Alipay, entonces el Mini Programa de Alipay es adecuado. Capacidades como crédito Zhima e identidad de confianza son únicas de Alipay.

**Mini Programa de Douyin**: comercio de contenido y ventas en vivo. Si vendes en Douyin, los mini programas pueden adjuntarse bajo videos para conversión instantánea.

**Mini Programa de Kuaishou**: mercados de niveles inferiores y fuerte economía comunitaria. Los usuarios de Kuaishou son muy participativos, adecuados para compras grupales comunitarias y servicios locales.

**Mini Programa de Baidu**: entrada de tráfico de búsqueda. Si los usuarios buscan "restaurantes cercanos" en Baidu, tu mini programa puede aparecer directamente en los resultados.
:::

#### Ecosistema HarmonyOS

**Apps de HarmonyOS**: pueden ejecutarse en teléfonos Huawei, tablets, relojes y dispositivos de hogar inteligente. Desarrolladas con ArkTS (similar a TypeScript), una base de código puede soportar múltiples dispositivos. Si tu audiencia está en el ecosistema Huawei o tu producto involucra vinculación IoT, HarmonyOS es una opción clave.

#### Más Herramientas de Desarrollador

::: details Haz clic para ver más opciones de herramientas de desarrollador

**Herramientas de Línea de Comandos (CLI)**: los desarrolladores usan la terminal diariamente. Las herramientas CLI pueden automatizar trabajo repetitivo, generar plantillas de código y desplegar proyectos. Ejemplos incluyen `create-react-app`, `git` y `npm`. Adecuadas para productividad de desarrolladores y automatización DevOps.

**Plugins de JetBrains**: además de VS Code, muchos desarrolladores usan IntelliJ IDEA, PyCharm y WebStorm. Si tu herramienta se dirige a desarrolladores de Java, Python o frontend, JetBrains Marketplace también vale la pena considerar.

**Plugins de Cursor / Windsurf**: ecosistemas emergentes para herramientas de codificación con IA. Si estás construyendo funciones de codificación asistida por IA, estos ecosistemas de plugins de IDE están creciendo rápidamente.
:::

#### Bots de Comunidad

::: details Haz clic para ver opciones de bots de comunidad

**Bot de Telegram**: gran base de usuarios en el extranjero y APIs amigables para desarrolladores. Adecuado para notificaciones, tareas de automatización y gestión de comunidad. Muchos proyectos crypto y comunidades de desarrolladores usan Telegram.

**Bot de Discord**: plataforma central para comunidades de gaming y desarrolladores. Útil para reproducción de música, consultas de datos de juegos y gestión de servidores. Si tus usuarios son gamers o desarrolladores extranjeros, los bots de Discord suelen ser esenciales.
:::

#### Herramientas de Diseño y Productividad

::: details Haz clic para ver opciones de herramientas de diseño

**Plugins de Figma**: los diseñadores usan Figma diariamente. Los plugins pueden automatizar flujos de trabajo de diseño, generar código y gestionar sistemas de diseño. Adecuados para herramientas de diseño y asistencia frontend.

**Integraciones de Notion**: con la API de Notion puedes automatizar flujos de trabajo, sincronizar datos y generar informes. Adecuadas para gestión de conocimiento y herramientas de gestión de proyectos.
:::

#### Computación Espacial

**Apps de visionOS (Apple Vision Pro)**: la nueva era de la computación espacial. Adecuada para visualización de contenido 3D, experiencias inmersivas, educación/entrenamiento y colaboración virtual. La barrera técnica es alta, pero para exploración de fronteras esta es una dirección futura.

---

## 2 Hazte Tres Preguntas Primero

Antes de elegir una plataforma, responde estas tres preguntas centrales:

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">Pregunta 1: ¿Dónde están tus usuarios?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>¿Los usuarios necesitan usarlo en cualquier momento y lugar? (móvil primero)</li>
      <li>¿Los usuarios están acostumbrados a completar tareas dentro de WeChat? (mini programa)</li>
      <li>¿Los usuarios pasarán sesiones largas en escenarios de oficina? (app de escritorio)</li>
      <li>¿Los usuarios necesitan encontrarte a través de motores de búsqueda? (sitio web)</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">Pregunta 2: ¿Qué capacidades necesita tu app?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>¿Necesita acceso a cámara, micrófono, GPS u otro hardware?</li>
      <li>¿Necesita soporte sin conexión?</li>
      <li>¿Necesita notificaciones push?</li>
      <li>¿Necesita procesar grandes cantidades de datos locales?</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">Pregunta 3: ¿Cuántos recursos tienes?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>¿Cuál es tu presupuesto de tiempo de desarrollo?</li>
      <li>¿Tienes un dispositivo Mac (requerido para desarrollo iOS)?</li>
      <li>¿Necesitas cubrir múltiples plataformas a la vez?</li>
    </ul>
  </div>
</el-card>

---

## 3 Tabla de Decisión de Selección de Plataforma

Usa esta tabla para identificar rápidamente tu ajuste:

| Tu escenario | Plataforma recomendada | Por qué |
|---------|---------|------|
| Los usuarios están en el ecosistema WeChat y quieres crecimiento rápido de usuarios | <el-tag type="success">Mini Programa de WeChat</el-tag> | Sin descarga, fácil compartir en WeChat, bajo costo de adquisición |
| Necesita rastreo GPS continuo en segundo plano y acceso a datos de salud | <el-tag type="primary">Nativa iOS / Android</el-tag> | Acceso directo a APIs del sistema, mejor rendimiento |
| Quiere una base de código para múltiples plataformas | <el-tag type="warning">PWA / Electron</el-tag> | Alta eficiencia, bajo costo de mantenimiento |
| Los usuarios necesitan sesiones largas en computadoras | <el-tag type="primary">App de Escritorio</el-tag> (Electron / Qt) | Ventana separada, soporte sin conexión, fuerte integración con el sistema |
| Necesita resumen automático/traducción/gestión de contraseñas mientras navegas | <el-tag type="info">Extensión de Navegador</el-tag> | Puede leer/modificar contenido de páginas web, se inicia con el navegador |
| Quiere artículos técnicos/muestra de proyectos indexados por Google | <el-tag type="warning">Sitio Web / Blog Personal</el-tag> | Amigable con SEO, contenido rastreable |
| Quiere emitir tarjetas de membresía digitales comercializables o coleccionables | <el-tag type="danger">Contrato Inteligente NFT</el-tag> | Propiedad en cadena, transferible/comercializable |

---

## 4 Ejemplos de Escenarios Prácticos

### Escenario 1: Quiero construir una herramienta de compras grupales comunitarias

**💡 Recomendado: Mini Programa de WeChat**

¿Por qué mini programa?

- **Los usuarios ya están en WeChat**: los usuarios comunitarios están activos en grupos de WeChat; los mini programas pueden compartirse directamente en grupos
- **Comportamiento de usar y listo**: nadie quiere instalar una app dedicada solo para pedir verduras
- **Pago sin interrupciones**: WeChat Pay con un toque, sin cambio de contexto
- **Bajo costo de adquisición**: un flujo de compartir en grupo puede traer docenas de usuarios

::: tip 💡 Escenarios aplicables
Si tu producto es similar - compras grupales, reservas, encuestas, registro de eventos - los mini programas suelen ser la primera opción.
:::

---

### Escenario 2: Quiero construir una app de seguimiento de carrera

**⚡ Recomendado: Nativa iOS / Android**

¿Por qué app nativa?

- **Ejecución en segundo plano**: la app debe seguir rastreando la ruta durante la carrera, lo cual los mini programas y sitios web no pueden hacer de forma fiable
- **Precisión GPS**: las apps nativas pueden acceder a ubicación de alta precisión con pequeño margen de error
- **Acceso a datos de salud**: el acceso a conteo de pasos y frecuencia cardíaca necesita Apple HealthKit / Google Fit
- **Recordatorios push fiables**: los recordatorios diarios de "hora de correr" se hacen mejor via push nativo

::: warning ⚠️ Nota importante
Cualquier app que requiera **ejecución en segundo plano a largo plazo** o **acceso profundo al hardware** debería elegir desarrollo nativo.
:::

---

### Escenario 3: Quiero construir una app de contabilidad

**📝 Recomendado: PWA o Mini Programa**

¿Por qué?

- **Alta frecuencia pero sesiones cortas**: un registro por día, listo en 30 segundos
- **Sin necesidades complejas de hardware**: mayormente entrada y visualización de datos
- **Fuerte requisito multiplataforma**: los usuarios pueden registrar en el teléfono y revisar informes en el escritorio
- **Escenario sin conexión**: los usuarios pueden querer registrar gastos en el metro sin señal

Una PWA puede instalarse en la pantalla de inicio y sentirse como una app, mientras el costo de desarrollo es aproximadamente un tercio del nativo. Los mini programas suelen ser mejores para usuarios en China.

---

### Escenario 4: Quiero construir una plataforma de educación en línea

**📚 Recomendado: Combinación Sitio Web + Mini Programa**

¿Por qué?

- **El sitio web maneja la adquisición**: páginas de cursos, perfiles de instructores, optimización SEO
- **El mini programa maneja la conversión**: clase de prueba, inscripción con pago, unirse a grupo via QR
- **El sitio web maneja la entrega**: la reproducción de video es mejor en pantallas web más grandes
- **El mini programa maneja los puntos de contacto**: recordatorios de clase y notificaciones de tareas

::: tip 💡 Estrategia de combinación
Los negocios complejos a menudo necesitan una **combinación multiplataforma**, no una sola plataforma.
:::

---

### Escenario 5: Quiero construir una herramienta de colaboración en equipo

**🤝 Recomendado: App de escritorio Electron + versión web**

¿Por qué?

- **Lado escritorio**: los usuarios mantienen las computadoras encendidas en el trabajo; las apps de escritorio pueden permanecer residentes y recibir mensajes
- **Lado web**: uso temporal en otras computadoras sin instalación
- **Integración con el sistema**: la app de escritorio puede acceder archivos locales, notificaciones del sistema y atajos
- **Una base de código**: Electron usa stack web, y escritorio/web pueden reutilizar aproximadamente 80% del código

Slack, Notion y Discord todos siguen este patrón.

---

### Escenario 6: Quiero construir un gestor de contraseñas

**🔐 Recomendado: App de escritorio + extensión de navegador**

¿Por qué?

- **App de escritorio**: almacenamiento seguro de base de datos de contraseñas local, soporta desbloqueo biométrico
- **Extensión de navegador**: autocompletar en páginas de login sin cambiar ventanas
- **Disponibilidad sin conexión**: datos de contraseñas almacenados localmente, independientes de la red
- **Control de seguridad**: los usuarios saben dónde están sus datos, reduciendo preocupaciones de fugas en la nube

1Password y Bitwarden usan ambas esta combinación.

---

### Escenario 7: Quiero construir una plataforma de creación de contenido

**✍️ Recomendado: Sitio Web + blog personal**

¿Por qué?

- **SEO es la línea de vida**: la búsqueda es tu mayor fuente de tráfico a largo plazo
- **El contenido es el producto**: artículos, tutoriales y videos son el valor central
- **Activo a largo plazo**: los sitios web pueden operar durante años, mientras las cuentas sociales pueden ser suspendidas en cualquier momento
- **Monetización flexible**: anuncios, suscripciones pagadas y comercio del conocimiento pueden todos funcionar en sitios web

Medium, columnas de Zhihu y blogs técnicos personales son todos esencialmente plataformas de contenido.

---

### Escenario 8: Quiero construir una herramienta de productividad para desarrolladores

**🛠️ Recomendado: Extensión de VS Code o herramienta CLI**

¿Por qué?

- **Los usuarios ya están dentro del editor**: a los desarrolladores les disgusta cambiar de contexto
- **Conciencia del contexto**: las herramientas pueden leer el código actual y proporcionar sugerencias precisas
- **Distribución fácil**: publicar en el marketplace de extensiones y los usuarios instalan con un clic
- **Iteración rápida**: sin demoras de revisión de tiendas de apps, lanzamiento/actualización el mismo día

Prettier, ESLint y GitHub Copilot son todas extensiones de VS Code.

---

### Escenario 9: Quiero construir un panel de monitoreo industrial

**🏭 Recomendado: Aplicación de escritorio Qt**

¿Por qué?

- **Estabilidad ante todo**: las fábricas operan 24/7 y el software no puede fallar
- **Comunicación de hardware**: necesita comunicación serial/Modbus con sensores
- **Gráficos en tiempo real**: presión/temperatura/flujo a menudo necesitan refresco de milisegundos
- **Entorno industrial**: las computadoras industriales comúnmente ejecutan Windows, y la compatibilidad de Qt es fuerte

::: warning ⚠️ Escenarios industriales
Los escenarios industriales requieren estabilidad e interfaces de hardware que las tecnologías web usualmente no pueden satisfacer.
:::

---

### Escenario 10: Quiero emitir una tarjeta de membresía digital

**🎫 Recomendado: Contrato inteligente NFT**

¿Por qué?

- **Infalsificable**: los registros en cadena no pueden ser alterados
- **Transferible**: las membresías pueden ser regaladas o comercializadas en mercados secundarios
- **Programable**: los contratos inteligentes pueden automatizar beneficios (por ejemplo auto-upgrade después de un año)
- **Alcance global**: sin fronteras nacionales, participación global posible

Starbucks Odyssey y NBA Top Shot ambos usan NFTs en sistemas de membresía.

---

## 5 Comparación Rápida de Capacidades de Plataforma

### 5.1 Comparación de Soluciones Móviles

| Capacidad | Mini Programa WeChat | Nativa iOS | Nativa Android | PWA |
|-----|----------|---------|-------------|-----|
| Costo de adquisición de usuarios | <el-tag type="success">Bajo</el-tag> (compartir WeChat) | <el-tag type="danger">Alto</el-tag> (tienda de apps) | <el-tag type="danger">Alto</el-tag> (tienda de apps) | <el-tag type="warning">Medio</el-tag> (motores de búsqueda) |
| Uso sin conexión | <el-tag type="warning">Limitado</el-tag> | <el-tag type="success">Completo</el-tag> | <el-tag type="success">Completo</el-tag> | <el-tag type="success">Soportado</el-tag> |
| Notificaciones push | <el-tag type="success">Soportado</el-tag> | <el-tag type="success">Soportado</el-tag> | <el-tag type="success">Soportado</el-tag> | <el-tag type="warning">Parcial</el-tag> |
| Acceso a hardware | <el-tag type="warning">Restringido</el-tag> | <el-tag type="success">Acceso completo</el-tag> | <el-tag type="success">Acceso completo</el-tag> | <el-tag type="warning">Restringido</el-tag> |
| Ejecución en segundo plano | <el-tag type="warning">Restringido</el-tag> | <el-tag type="success">Soportado</el-tag> | <el-tag type="success">Soportado</el-tag> | <el-tag type="warning">Restringido</el-tag> |
| Costo de desarrollo | <el-tag type="success">Bajo</el-tag> | <el-tag type="danger">Alto</el-tag> | <el-tag type="danger">Alto</el-tag> | <el-tag type="success">Bajo</el-tag> |
| Requiere revisión | <el-tag type="warning">Sí</el-tag> | <el-tag type="warning">Sí</el-tag> | <el-tag type="warning">Sí</el-tag> | <el-tag type="success">No</el-tag> |

### 5.2 Comparación de Soluciones de Escritorio

| Capacidad | Electron | Qt | Extensión de Navegador |
|-----|----------|-----|-----------|
| Multiplataforma | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| Integración con el sistema | <el-tag type="warning">Media</el-tag> | <el-tag type="success">Alta</el-tag> | <el-tag type="warning">Baja</el-tag> |
| Uso sin conexión | <el-tag type="success">Soportado</el-tag> | <el-tag type="success">Soportado</el-tag> | <el-tag type="warning">Parcial</el-tag> |
| Acceso a hardware | <el-tag type="warning">Via Node.js</el-tag> | <el-tag type="success">Acceso completo</el-tag> | <el-tag type="warning">Restringido</el-tag> |
| Instalación | Paquete instalador | Paquete instalador | Tienda de extensiones del navegador |
| Stack de desarrollo | Tecnologías web | C++/QML | JavaScript |

---

## 6 Conceptos Erróneos Comunes

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Concepto erróneo 1: "Quiero construir una app, así que debo construir tanto iOS como Android"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      No necesariamente. Si tu app es ligera y de usar y listo, un mini programa o PWA puede ser una mejor opción. El desarrollo nativo vale la pena solo cuando necesitas acceso profundo al sistema o rendimiento de primer nivel.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Concepto erróneo 2: "Los sitios web están anticuados y nadie los lee ya"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Lo contrario es cierto. Los sitios web son la única plataforma indexable por motores de búsqueda. Si quieres crecimiento de usuarios basado en contenido, los sitios web y blogs personales son opciones principales. Los artículos técnicos y las muestras de proyectos pueden traer tráfico SEO continuamente.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Concepto erróneo 3: "Las apps de escritorio ya no se usan"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      En escenarios de oficina, las apps de escritorio siguen siendo predominantes. VS Code, Slack y Notion son todas apps de escritorio. Si tu app necesita sesiones de uso largas, manejo de datos pesado o integración con el sistema, el escritorio es a menudo la mejor opción.
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ Concepto erróneo 4: "La experiencia PWA es peor que la nativa"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      Las PWAs modernas ya están muy cerca de la experiencia nativa. Starbucks, Pinterest y Uber todas tienen versiones PWA. Si tu app no requiere integración compleja de hardware, PWA es a menudo la solución multiplataforma más rentable.
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 Resumen: Flujo de Decisión de Selección de Plataforma

```text
Inicio
  │
  ├─ ¿Los usuarios están en el ecosistema WeChat? ───────────────────→ Mini Programa de WeChat
  │
  ├─ ¿Necesita mejor rendimiento y acceso profundo al hardware? ──→ Nativa iOS / Android
  │
  ├─ ¿Necesita sesiones largas de uso en computadoras? ───────────→ App de Escritorio
  │     │
  │     ├─ ¿Escenario industrial? ───────────────────────→ Qt
  │     └─ ¿Escenario general? ──────────────────────────→ Electron
  │
  ├─ ¿Necesita procesar contenido de páginas del navegador? ────────────→ Extensión de Navegador
  │
  ├─ ¿Ligera + multiplataforma + sin conexión? ──────────→ PWA
  │
  ├─ ¿Necesita ser descubrible por búsqueda? ───────────────→ Sitio Web / Blog
  │
  ├─ ¿Herramienta de desarrollador? ───────────────────────────→ Extensión de VS Code
  │
  └─ ¿Activo blockchain? ────────────────────────────────→ Contrato Inteligente NFT
```

---

## 8 Próximo Paso

::: tip 🎯 Comienza a Actuar
Basándote en el análisis anterior, ahora deberías tener una respuesta preliminar a "qué plataforma elegir." A continuación, haz clic en el tutorial correspondiente para comenzar:
:::

<NavGrid>
  <NavCard
    href="/es-es/stage-3/cross-platform/wechat-miniprogram/"
    title="Cómo construir un Mini Programa de WeChat"
    description="Construye un Mini Programa de WeChat desde cero y domina el flujo de desarrollo central"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/android-app/"
    title="Cómo construir una App Android"
    description="Construye aplicaciones nativas de Android con frameworks multiplataforma modernos"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/ios-app/"
    title="Cómo construir una App iOS"
    description="Desarrolla y publica aplicaciones iOS con las mejores prácticas del ecosistema Apple"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/pwa-local-app/"
    title="Cómo construir una App PWA Local"
    description="Convierte un sitio web en una app real con soporte sin conexión e instalación de escritorio"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/browser-ai-extension/"
    title="Cómo construir una Extensión de Navegador con IA"
    description="Resume cualquier página web con un clic y construye tu asistente de IA para el navegador"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/electron-voice-to-text/"
    title="Cómo construir una App de Escritorio Electron Multiplataforma"
    description="Construye una app de escritorio de voz a texto para Windows, macOS y Linux"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/vscode-extension/"
    title="Cómo construir una Extensión de VS Code"
    description="Crea tu asistente de proyecto de IA con Q&A multi-archivo y atajos personalizados"
  />
  <NavCard
    href="/es-es/stage-3/cross-platform/qt-industrial-hmi/"
    title="Cómo construir una HMI Industrial Qt"
    description="Construye una interfaz humano-máquina de grado industrial que se conecta a hardware real"
  />
</NavGrid>
