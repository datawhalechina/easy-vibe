# Desarrollo remoto con Claude Code en dispositivos móviles

## Introducción

Imagina estos escenarios: se te ocurre una idea brillante para corregir un error mientras viajas en el metro; recibes una alerta urgente de un incidente en producción mientras esperas en la fila de una cafetería; quieres comprobar el progreso de tu proyecto construido con IA mientras acompañas a tu novia de compras.

En los flujos de trabajo de desarrollo tradicionales, estos escenarios suelen significar que necesitas encontrar un lugar para abrir tu portátil, o posponer el trabajo impotente. Pero en la era de la codificación asistida por IA, las reglas han cambiado. Claude Code hace posible llevar tu entorno de desarrollo en el bolsillo y mantener la productividad en cualquier momento y lugar.

En el verano de 2025, a medida que creció la adopción de Claude Code, los desarrolladores comenzaron a explorar diferentes enfoques para "programar desde el móvil". Desde el simple uso local de Termux, hasta complejas conexiones remotas SSH + Tailscale, pasando por aplicaciones dedicadas como Happy Coder, se fue formando gradualmente un ecosistema completo de desarrollo móvil.

El problema central que resuelve este capítulo es: cómo hacer que Claude Code te siga en tu teléfono y se convierta en un verdadero "asistente de desarrollo de bolsillo".

---

::: info Resumen de comentarios de la comunidad

Basándonos en comentarios reales de la comunidad, la experiencia de cada enfoque se compara de la siguiente manera:

**Happy Coder (Enfoque 2)**
- Problemas de estabilidad de conexión: las desconexiones ocurren con frecuencia, y el contexto se pierde después de desconectarse
- Funcionalidad limitada: no se pueden usar comandos `/`
- Preocupaciones de seguridad: depende de servidores de retransmisión oficiales, y algunos usuarios están preocupados por la seguridad de los datos

**HAPI (Enfoque 3)**
- Soporta servidores autoalojados: se puede implementar en tu propio VPS
- Mejor experiencia cuando se combina con Tailscale: ejecuta `hapi server` en tu computadora y conéctate desde tu teléfono a través de la IP de Tailscale
- Conexión relativamente estable, adecuada para uso a largo plazo

**Claude Remote Control (Enfoque oficial)**
- Solución oficial, integrada nativamente con Claude Code
- Soporta acceso completo a entornos locales (MCP, herramientas, configuración del proyecto)
- Requiere suscripción Max (soporte para Pro próximamente)
- Depende de la conectividad en la nube de Anthropic

**Recomendación**: si requieres alta estabilidad de conexión, o estás preocupado por la seguridad de retransmisión de terceros, elige **HAPI + Tailscale** o el enfoque de **Remote Control oficial**.

:::

---

## Principio fundamental: patrones de arquitectura para desarrollo móvil

Antes de introducir los enfoques específicos, primero comprende la esencia del problema.

### ¿Por qué el desarrollo móvil es un problema?

Los IDEs tradicionales (como VS Code e IntelliJ) requieren un entorno de sistema operativo completo, una CPU potente, mucha memoria y espacio de almacenamiento. Aunque los teléfonos son cada vez más potentes, todavía tienen limitaciones naturales para la experiencia de desarrollo:

**Restricciones de entrada**: los teclados virtuales son ineficientes para programar, y la sintaxis compleja es fácil de escribir mal

**Restricciones de pantalla**: las pantallas pequeñas dificultan ver el código, la terminal y el navegador al mismo tiempo

**Restricciones de entorno**: los teléfonos no pueden ejecutar cadenas de herramientas de desarrollo completas (compiladores, bases de datos, depuradores)

**Restricciones de conexión**: las redes móviles son inestables, y las sesiones SSH se desconectan fácilmente

### Idea central: arquitectura de cliente ligero

La idea central detrás de todos los enfoques de desarrollo móvil es la misma: el teléfono es solo la "consola de control"; el trabajo de desarrollo real se realiza en otro lugar.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   Teléfono  │              │ Host/Nube   │             │
│    │ (Controlador)│  ────────►  │ (Ejecutor)  │             │
│    │             │  Comandos    │             │             │
│    │ • Enviar    │              │ • Ejecutar  │             │
│    │   cmds     │              │   CLI       │             │
│    │ • Ver      │              │ • Ejecutar  │             │
│    │   salida   │              │   código    │             │
│    │ • Revisar  │              │ • Acceder   │             │
│    │            │              │   fs        │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Esta arquitectura permite que el teléfono se enfoque solo en la interacción humano-computadora, mientras que la computación pesada se delega a tu host o a la nube.

---

## Enfoque 1: Aplicación oficial para iOS

En octubre de 2025, Anthropic lanzó oficialmente el soporte móvil de Claude Code en la aplicación para iOS. Esta es la opción de desarrollo móvil más simple.

### Limitaciones regionales

Nota importante: la aplicación de Claude **no se puede usar directamente** en China continental.

Si estás en China continental, se recomienda usar **Happy Coder** directamente (Enfoque 2), que puede funcionar normalmente a través de servicios de retransmisión API nacionales configurados.

Si tienes un Apple ID internacional, puedes cambiar de región y descargar la aplicación de Claude.

### Cómo funciona

```text
┌─────────────┐                    ┌─────────────────┐
│  App iOS    │ ──────────────────► │ Anthropic Cloud │
│  (Teléfono) │   HTTPS + OAuth    │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

La aplicación de tu teléfono solo envía comandos. Toda la ejecución de código se ejecuta en el sandbox en la nube de Anthropic, y los resultados se sincronizan a través de GitHub.

### Uso básico

**Requisitos previos:**

- iPhone con iOS 15 o posterior
- Suscripción a Claude Pro/Team/Enterprise (el plan gratuito no es compatible)
- Cuenta de GitHub

**Pasos:**

1. Descarga la aplicación de Claude desde la App Store
2. Inicia sesión en tu cuenta de Anthropic
3. Encuentra la pestaña "Code" en la aplicación
4. Conecta tu repositorio de GitHub a través de OAuth
5. Comienza a crear tareas

### Ventajas y desventajas

Las ventajas son cero barrera de configuración, experiencia fluida y notificaciones push. Las desventajas son solo soporte para iOS, flujo de trabajo principalmente con GitHub, capacidades relativamente limitadas (no puede acceder a sistemas de archivos locales) y no disponible directamente en China continental.

---

## Enfoque 2: Happy Coder

Happy Coder es un cliente móvil y web de código abierto diseñado para Claude Code y Codex, con cifrado de extremo a extremo y control remoto de tu asistente de codificación con IA desde cualquier lugar.

### Cómo funciona

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server │   ◄────────  │happy-coder  │
│(Teléfono/Web)│ WS cifrado  │  (Retrans.)  │  WebSocket   │ (Escritorio)│
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

En tu computadora, ejecuta `happy` en lugar de `claude` para iniciar tu asistente de codificación con IA. Cuando necesites control desde el teléfono, la sesión cambia automáticamente al modo remoto. Presiona cualquier tecla en tu computadora para volver al control local.

### Instalación y uso

**Paso 1: descargar la aplicación**

| Plataforma | Enlace |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**Paso 2: instalar CLI en la computadora**

```bash
npm install -g happy-coder
```

**Paso 3: iniciar y emparejar**

```bash
# ejecutar en el directorio de tu proyecto
cd ~/my-project
happy

# se mostrará un código QR de emparejamiento
```

**Paso 4: escanear y emparejar en el teléfono**

Abre la aplicación Happy y escanea el código QR que se muestra en tu computadora. Después de que el emparejamiento tenga éxito, podrás controlar Claude Code desde tu teléfono.

**Paso 5: usar**

```bash
# iniciar Claude Code
happy

# o iniciar Codex
happy codex
```

### Enlaces de recursos

- [Proyecto en GitHub](https://github.com/slopus/happy) - código fuente
- [Documentación](https://happy.engineering/docs) - documentación de uso
- [Comunidad en Discord](https://discord.gg/fX9WBAhyfD) - discusión comunitaria

### Ventajas y desventajas

Las ventajas son configuración simple, soporte multiplataforma, cifrado de extremo a extremo y auditabilidad de código abierto. Las desventajas son la dependencia de infraestructura de retransmisión de terceros y la necesidad de verificar la disponibilidad de la aplicación móvil en tu propio entorno.

---

## Enfoque 3: HAPI

HAPI es una alternativa a Happy Coder, con un diseño local-first y soporte para cambio de dispositivo fluido entre múltiples modelos de IA.

### Cómo funciona

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI App   │   ────────►  │ HAPI Server │   ◄────────  │    hapi     │
│(Teléfono/PWA/│  WireGuard   │(Autoalojado │  WireGuard   │ (Escritorio)│
│  Telegram)  │   + TLS      │  retrans.)  │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini etc. │
                                                        └─────────────┘
```

HAPI usa WireGuard más TLS para cifrado de extremo a extremo. Toda la comunicación pasa por servidores de retransmisión cifrados. Puedes autoalojar los servidores de retransmisión para controlar completamente el flujo de tus datos.

### Características principales

- **Cambio fluido**: cambia el control entre el escritorio y el teléfono; presiona cualquier tecla para volver al control local
- **Nativo primero**: las aplicaciones móviles están envueltas con tecnología nativa para una interacción fluida
- **Aprobaciones AFK**: recibe solicitudes de aprobación en tu teléfono mientras estás lejos de tu computadora
- **Soporte multimodelo**: soporta Claude Code, Codex, Gemini, OpenCode y más
- **Terminal en cualquier lugar**: acceso a través de PWA, Telegram Mini App y más
- **Control por voz**: soporta comandos de entrada por voz, para que tus manos permanezcan libres

### Instalación y uso

**Paso 1: iniciar el servidor de retransmisión**

```bash
# ejecutar en tu servidor (o iniciar directamente con npx)
npx @twsxtd/hapi hub --relay
```

**Paso 2: instalar CLI en la computadora**

```bash
# ejecutar en el directorio de tu proyecto
cd ~/my-project
npx @twsxtd/hapi

# o instalar globalmente
npm install -g @twsxtd/hapi
hapi
```

**Paso 3: emparejar dispositivos**

Sigue las indicaciones de la terminal, abre la aplicación HAPI en tu teléfono y escanea el código QR para completar el emparejamiento.

**Paso 4: métodos de acceso**

| Método de acceso | Descripción |
|---------|------|
| Web PWA | Acceso desde navegador, soporta instalación en pantalla de inicio |
| Telegram Mini App | Usar directamente dentro de Telegram |
| Aplicación móvil | Experiencia de aplicación nativa (si está publicada) |

### Diferencias con Happy Coder

| Característica | Happy Coder | HAPI |
|------|-------------|------|
| Filosofía de diseño | Cloud-first | Local-first |
| Método de cifrado | WebSocket + E2E | WireGuard + TLS |
| Soporte multimodelo | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| Métodos de acceso | iOS/Android/Web | PWA, Telegram, más |
| Control por voz | No | Sí |
| Aprobaciones AFK | No | Sí |
| Retransmisión autoalojada | Requiere implementación manual | Soporte listo para usar |

### Enlaces de recursos

- [Proyecto en GitHub](https://github.com/tiann/hapi) - código fuente
- [Documentación PWA](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - instalación y uso de PWA
- [Cómo funciona](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - detalles de implementación técnica
- [Asistente de voz](https://github.com/tiann/hapi/blob/main/docs/voice.md) - funciones de control por voz
- [Por qué HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - filosofía de diseño
- [FAQ](https://github.com/tiann/hapi/blob/main/docs/faq.md) - preguntas frecuentes

### Ventajas y desventajas

Las ventajas son diseño local-first, soporte multimodelo, cifrado de extremo a extremo, control por voz y capacidad de retransmisión autoalojada. Las desventajas son que el proyecto es relativamente nuevo y el ecosistema aún está creciendo.

---

## Enfoque 4: SSH + Tailscale + Tmux

Esta es la mejor opción para desarrolladores profesionales. Te conectas remotamente a tu máquina de desarrollo por SSH y mantienes las sesiones persistentes con Tmux.

### Cómo funciona

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Teléfono  │   ────────►  │  Tailscale  │   ◄────────  │ Computadora │
│(cliente SSH)│   VPN P2P    │  relay/hole  │   VPN P2P    │ (host dev)  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │(persistencia│
                                                        │ de sesión)  │
                                                        └─────────────┘
```

Tailscale crea una VPN peer-to-peer para que puedas acceder a tu computadora de casa desde cualquier red. Tmux asegura que Claude Code siga ejecutándose en segundo plano incluso cuando SSH se desconecta.

### ¿Por qué necesitas Tailscale?

**Problemas con el SSH tradicional:**

```text
Teléfono (4G) ──XX──> Router NAT ──XX──> Computadora de casa
             (no puede penetrar)   (aislamiento LAN)
```

Tu computadora está en una red privada y tu teléfono está en la red pública, por lo que el acceso directo falla. Las soluciones tradicionales requieren port forwarding más DNS dinámico, que son complejos y riesgosos.

**Solución con Tailscale:**

```text
Teléfono (4G) ──► Retransmisión Tailscale ──◄── Computadora de casa
            (auto hole-punch o retransmisión)
```

Tailscale usa traversía de NAT, y recurre a retransmisión automáticamente si la traversía falla. Toda la conexión está cifrada.

### Pasos completos de configuración

**Paso 1: instalar Tailscale en la computadora**

```bash
# macOS
brew install --cask tailscale

# o descargar instalador
# https://tailscale.com/download
```

**Paso 2: iniciar sesión y obtener IP**

```bash
# iniciar Tailscale
sudo tailscale up

# verificar IPv4 de Tailscale
tailscale ip -4
# ejemplo de salida: 100.x.x.x
```

**Paso 3: instalar Tailscale en el teléfono**

Descarga Tailscale desde la App Store o Google Play e inicia sesión con la misma cuenta.

**Paso 4: instalar y configurar Tmux**

```bash
# macOS
brew install tmux

# crear ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# habilitar soporte de ratón
set -g mouse on

# terminal por defecto con 256 colores
set -g default-terminal "screen-256color"

# cambiar tecla prefijo a Ctrl+A (opcional)
unbind C-b
set -g prefix C-a

# atajos de división simplificados
bind v split-window -h
bind h split-window
EOF
```

**Paso 5: crear una sesión persistente**

```bash
# crear sesión llamada "claude"
tmux new -s claude

# iniciar Claude Code en esta sesión
cd ~/my-project
claude

# desconectar sin cerrar
# presiona Ctrl+B luego D
```

**Paso 6: conectar desde el cliente SSH del teléfono**

Clientes SSH recomendados:

| Cliente | Plataforma | Notas |
|--------|------|------|
| Blink Shell | iOS | Soporta MOSH, ideal para redes inestables |
| Termius | iOS/Android | Multiplataforma con UI pulida |
| a-Shell | iOS | Gratuito y ligero |

Configuración de conexión:

```text
Host: 100.x.x.x (tu IP de Tailscale)
Port: 22
Username: tu nombre de usuario de la computadora
```

Después de conectar, adjuntar a Tmux:

```bash
tmux attach -t claude
```

### Consejos avanzados

**Evitar que la computadora entre en reposo:**

```bash
# macOS
caffeinate -dimsu &

# o configurar Ajustes del Sistema > Ahorro de energía > evitar reposo automático
```

**Usar MOSH para redes inestables:**

MOSH (Mobile Shell) es una alternativa a SSH optimizada para redes móviles, con recuperación fluida ante cambios de red.

```bash
# instalar en la computadora
brew install mosh

# usar MOSH desde el cliente del teléfono
# Blink Shell soporta MOSH nativamente
```

**Script de conexión con un comando:**

Configura esto como comando de inicio en tu cliente SSH:

```bash
tmux attach -t claude || tmux new -s claude
```

Esto se adjuntará automáticamente a una sesión existente o creará una nueva.

### Ventajas y desventajas

Las ventajas son capacidades completas y flujo de trabajo equivalente al de escritorio con todas las herramientas de desarrollo. Las desventajas son configuración más compleja y el requisito de mantener la computadora encendida.

---

## Enfoque 5: Entorno de ejecución local con Termux

Si eres usuario de Android, puedes ejecutar Claude Code directamente en tu teléfono sin conectar dispositivos externos.

### Cómo funciona

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │(entorno     │                          │
│                    │  Linux)     │                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • Archivos  │                          │
│                    │   proyecto  │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux es un emulador de terminal y entorno Linux para Android. Puedes instalar directamente Node.js y Claude Code en él.

### Pasos de instalación

**Importante**: descarga Termux desde [F-Droid](https://f-droid.org/), no desde Google Play (la versión de Play está desactualizada).

**Paso 1: instalar herramientas base**

```bash
# actualizar gestor de paquetes
pkg update && pkg upgrade

# instalar herramientas de desarrollo
pkg install git nodejs python vim
```

**Paso 2: instalar Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**Paso 3: configurar el entorno**

```bash
# crear espacio de trabajo
mkdir -p ~/projects
cd ~/projects

# inicializar proyecto
git clone https://github.com/your-repo.git
cd your-repo

# iniciar Claude Code
claude
```

**Paso 4: configurar teclado externo (recomendado)**

En Termux:

```bash
# habilitar fila de teclas extra
# mantener pulsado en pantalla > Más > Extra keys row

# configurar atajos
# agregar en ~/.termux/termux.properties
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### Consideraciones de rendimiento

| Tipo de tarea | Rendimiento en Android |
|---------|-------------|
| Desarrollo web (HTML/CSS/JS) | Excelente |
| Scripts Python | Excelente |
| Aplicaciones Node.js | Bueno |
| Ejecución de suites de pruebas | Medio |
| Compilación de proyectos grandes | No recomendado |

### Ventajas y desventajas

Las ventajas son control local completo, sin dependencia de host externo y funcionamiento offline-first. Las desventajas son rendimiento limitado del teléfono, experiencia débil de entrada de texto y disponibilidad solo para Android.

---

## Enfoque 6: Claude Code UI

Claude Code UI (también conocido como CloudCLI) es un proyecto de código abierto que proporciona una interfaz web para Claude Code, con soporte para el navegador del teléfono.

### Cómo funciona

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│Navegador del│   ────────►  │ Servidor Web│   ◄────────  │Claude Code  │
│  teléfono   │ HTTP/HTTPS  │ (localhost) │   invocar    │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

Ejecutas un servidor web en tu computadora, luego accedes a él desde el navegador de tu teléfono. Esto requiere acceso LAN o tunelización.

### Instalación y uso

**Paso 1: instalar**

```bash
# inicio con un comando (recomendado)
npx @siteboon/claude-code-ui

# o instalación global
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**Paso 2: abrir la interfaz**

El servidor se inicia por defecto en `http://localhost:3001`.

**Paso 3: acceder desde el teléfono**

Método A - acceso LAN (misma Wi-Fi):

```bash
# vincular todas las interfaces
claude-code-ui --host 0.0.0.0

# acceder desde el teléfono
http://<ip-lan-computadora>:3001
```

Método B - túnel ngrok:

```bash
# instalar ngrok
brew install ngrok

# iniciar túnel
ngrok http 3001

# abrir URL de ngrok desde el teléfono
```

### Características

- Diseño responsivo con soporte móvil
- Interfaz de chat integrada
- Explorador de archivos
- UI de operaciones Git
- Gestión de sesiones

### Ventajas y desventajas

Las ventajas son interfaz gráfica y funciones ricas. Las desventajas son requisitos de tunelización fuera de LAN y configuración relativamente más compleja.

---

## Enfoque 7: Entorno de desarrollo en la nube

Si no tienes una computadora local siempre encendida, puedes usar entornos de desarrollo en la nube donde Claude Code se ejecuta en servidores en la nube.

### Cómo funciona

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Teléfono  │   ────────►  │  Cloud Box  │   ─────────► │Claude Code  │
│(Navegador/  │    HTTPS     │  (DevBox)   │              │    CLI      │
│   App)      │              │             │              │             │
└─────────────┘              └─────────────┘              └─────────────┘
```

Un contenedor en la nube viene con Claude Code preinstalado, y accedes a él desde el navegador o una aplicación móvil.

### Usando Sealos DevBox

**Paso 1: crear el entorno**

Ve a [Sealos DevBox](https://sealos.io/devbox), elige una plantilla de Claude Code y crea un entorno.

**Paso 2: iniciar el entorno de desarrollo**

El entorno está listo en unos 30-60 segundos, y obtienes una terminal web.

**Paso 3: configurar la API de Claude**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**Paso 4: conectar la aplicación Happy**

```bash
# instalar happy-coder (o usar preinstalado)
npm install -g happy-coder

# generar código QR de emparejamiento
happy
```

Después de escanear desde tu teléfono, puedes usarlo inmediatamente.

### Comparación de opciones en la nube

| Plataforma | Claude Code | Optimización móvil | Tiempo de inicio | Precio |
|------|------------|----------|----------|------|
| Sealos DevBox | Preinstalado | Soporte Happy | ~60s | Pago por uso |
| GitHub Codespaces | Configuración manual | Flujo por navegador | ~2-3 min | Cuota gratuita + por hora |
| Gitpod | Configuración manual | Flujo por navegador | ~1-2 min | Cuota gratuita + por hora |
| Replit | Sin Claude Code nativo | App nativa | Instantáneo | Gratuito + suscripción |

### Ventajas y desventajas

Las ventajas son sin requisito de computadora local, consistencia del entorno y escalabilidad. Las desventajas son uso de pago, dependencia de red y código alojado en la nube.

---

## Comparación y selección

Cada enfoque tiene diferentes fortalezas y es adecuado para diferentes escenarios.

### Tabla comparativa

| Enfoque | Dificultad | Requiere túnel | Coste | Mejores escenarios |
|------|------|-------------|------|----------|
| App oficial iOS | Fácil | No | $20/mes | Revisiones rápidas, tareas simples |
| Happy Coder | Relativamente fácil | No | Gratuito | Uso diario, conveniencia |
| HAPI | Medio | No | Gratuito | Multimodelo, local-first |
| SSH + Tailscale | Relativamente complejo | No | Gratuito | Desarrollo profesional, funciones completas |
| Termux | Medio | No | Gratuito | Desarrollo local en Android |
| Claude Code UI | Medio | Sí | Gratuito | Preferencia por interfaz web |
| Cloud DevBox | Fácil | No | Pago por uso | Sin computadora local |

### Guía de selección

**Si estás en China continental**: usa **Happy Coder**; con la configuración de retransmisión API nacional, funciona bien.

**Si quieres máxima conveniencia**: elige Happy Coder. El flujo de escanear y usar es muy conveniente.

**Si necesitas soporte multimodelo**: elige HAPI. Soporta múltiples asistentes de codificación con IA y es ideal para flujos de trabajo de cambio de modelo.

**Si tienes una computadora siempre encendida**: elige SSH + Tailscale. Esto ofrece la experiencia más completa.

**Si eres usuario de iPhone (fuera de China continental)**: la aplicación oficial es la forma más fácil de empezar.

**Si solo tienes Android**: Termux ofrece una ruta de desarrollo móvil completamente local.

**Si no tienes computadora**: cloud DevBox es la opción ideal.

---

## Seguridad y privacidad

El desarrollo móvil implica la transferencia de código a través de redes, por lo que la seguridad necesita atención especial.

### Riesgos de los servidores de retransmisión

Al usar servicios que dependen de retransmisión como Happy Coder o HAPI, considera estos riesgos:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ¿Qué puede ver potencialmente un servidor de retransmisión?│
│                                                             │
│  • Datos antes del cifrado (si E2E está mal implementado)   │
│  • Metadatos (cuándo te conectas, cuánto duran las sesiones)│
│  • Tu clave API (si está configurada incorrectamente)       │
│                                                             │
│  ¿Qué puede hacer potencialmente un servidor de retransmisión?│
│                                                             │
│  • Registrar el contenido de tu código                      │
│  • Robar credenciales de API                                │
│  • Inyectar comandos maliciosos                             │
│  • Usar tu dispositivo como nodo de ataque                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mejores prácticas de seguridad

**1. Clasificación de sensibilidad del código**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Proyectos públicos/código de aprendizaje -> cualquier      │
│  enfoque es aceptable                                       │
│                                                             │
│  Proyectos privados -> preferir SSH+Tailscale o autoalojado│
│                                                             │
│  Código comercial -> usar solo SSH+Tailscale, deshabilitar │
│  todas las rutas de retransmisión de terceros               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. Gestión de claves**

```bash
# no codificar claves en el fuente
const apiKey = "sk-ant-xxxxx"

# usar variables de entorno
const apiKey = process.env.ANTHROPIC_API_KEY

# usar archivos .env (agregar a .gitignore)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. Usar modo sandbox**

Claude Code soporta modo sandbox para limitar el alcance de acceso:

```bash
claude --sandbox /path/to/project
```

**4. Autoalojar la retransmisión**

Si usas Happy Coder, considera autoalojar la retransmisión:

```bash
# clonar proyecto (incluye implementación del servidor)
git clone https://github.com/slopus/happy.git
cd happy

# desplegar servidor en tu VPS
# seguir documentación del proyecto para más detalles
```

**5. Usar Headscale**

Headscale es una implementación de código abierto de Tailscale que puede ser autoalojada:

```bash
# despliegue Docker con un comando
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## Preguntas frecuentes

### ¿Necesito traversía de NAT?

La mayoría de los enfoques modernos **no** requieren traversía de NAT manual:

| Enfoque | Principio |
|------|------|
| Happy Coder | Modo retransmisión, ambos lados se conectan activamente al servidor |
| HAPI | Modo retransmisión, WireGuard + TLS |
| Tailscale | Hole-punching de NAT o retransmisión |
| iOS App | Ejecución en la nube |
| Claude Code UI | Requiere acceso entrante |

### ¿Por qué el modo de retransmisión no requiere traversía?

```text
Conexión saliente (NAT permite):
Computadora ──► Servidor de retransmisión sí

Conexión entrante (NAT bloquea):
Externo ──► Computadora no

Truco de retransmisión:
Ambos lados hacen conexiones salientes al servidor de retransmisión,
por lo que ningún lado necesita conectividad entrante.
```

### ¿El desarrollo móvil afecta la duración de la batería?

Diferentes enfoques consumen diferente energía:

| Enfoque | Consumo de energía | Motivo |
|------|--------|------|
| Terminal SSH | Bajo | Solo renderizado de texto |
| App iOS | Medio | Ejecución en la nube, el teléfono solo controla |
| Termux | Alto | Runtime de CLI local |
| Navegador | Medio | Carga de renderizado de UI web |

Para sesiones largas, mantén tu teléfono cargando.

### ¿Qué pasa cuando se desconecta la red?

| Enfoque | Impacto de la desconexión de red |
|------|-------------|
| SSH + Tmux | Claude sigue ejecutándose; se recupera al reconectar |
| Happy Coder | Reconexión automática |
| HAPI | Reconexión automática |
| iOS App | La nube continúa; la app muestra desconexión |
| Termux | Interrupción de sesión |

### ¿Puedo compilar proyectos grandes en un teléfono?

No es recomendado. La CPU y la memoria del teléfono son limitadas, y las compilaciones grandes pueden causar:

- sobrecalentamiento significativo
- drenaje rápido de la batería
- tiempos de compilación muy largos

Ejecuta tareas de construcción pesadas en hosts remotos o entornos en la nube.

---

## Resumen

La idea central del desarrollo móvil con Claude Code es: **el teléfono es el controlador, y el desarrollo real se ejecuta en otro lugar**.

Qué enfoque deberías elegir depende de tus necesidades específicas.

Si estás en China continental, se recomienda **Happy Coder**, especialmente cuando se combina con la configuración de retransmisión API nacional.

Si quieres la configuración más conveniente, usa **Happy Coder**. Escanea para conectar, recibe notificaciones push y cambia de dispositivos fluidamente.

Si necesitas soporte multimodelo o arquitectura local-first, usa **HAPI**. Soporta múltiples asistentes y retransmisión autoalojada.

Si quieres la experiencia de desarrollo más completa, usa **SSH + Tailscale**. La configuración es más compleja, pero la capacidad es la más cercana al escritorio.

Si eres usuario de iOS fuera de China continental, la **aplicación oficial** es la forma más fácil de empezar.

Si eres usuario de Android, **Termux** permite desarrollo completamente local en el teléfono.

Si no tienes una computadora siempre encendida, **cloud DevBox** es la opción ideal.

No importa qué solución elijas, la seguridad importa: sé cauteloso con la retransmisión de terceros para código sensible, gestiona las claves API apropiadamente y prefiere rutas autoalojadas o privadas para proyectos importantes.

---

## Referencias

### Recursos oficiales

- [Documentación oficial de Claude Code](https://docs.anthropic.com/en/docs/claude-code) - documentación completa oficial de Claude Code
- [App de Claude para iOS](https://apps.apple.com/app/claude/id6473753684) - aplicación oficial para iOS

### Proyectos de código abierto

- [slopus/happy](https://github.com/slopus/happy) (2.5k estrellas) - cliente móvil Happy Coder
- [tiann/hapi](https://github.com/tiann/hapi) - asistente de codificación con IA multimodelo local-first de HAPI
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k estrellas) - implementación de código abierto de Tailscale

### Tutoriales en chino

- [Programa en cualquier momento y lugar: Configura Claude Code en el teléfono](https://m.blog.csdn.net/haa_y/article/details/151156494) - guía de configuración de Termux
- [Un laboratorio de IA en tu bolsillo: Flujo de trabajo móvil de Claude Code siempre conectado](https://www.cnblogs.com/swizard/p/19308983) - enfoque Tmux + Docker
- [Llevé Claude Code de compras con mi novia](https://post.m.smzdm.com/p/a3r7d63d/) - conexión remota con Tailscale
- [Construye aplicaciones en producción desde tu teléfono](https://m.toutiao.com/article/7611823834756301318/) - caso real de desarrollo móvil

### Recursos en inglés

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - guía móvil más completa
- [SSH + Tailscale + Termius Complete Guide](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - guía detallada de conectividad remota

### Descargas de herramientas

- [Tailscale](https://tailscale.com/download) - herramienta VPN peer-to-peer
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - emulador de terminal para Android
- [Blink Shell](https://blink.sh/) - cliente SSH para iOS (soporte MOSH)
- [Termius](https://termius.com/) - cliente SSH multiplataforma
