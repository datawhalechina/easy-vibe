# Guía Completa de Claude Code MCP

## ¿Qué es Claude Code MCP?

**Claude Code** es la herramienta oficial de línea de comandos de IA de Anthropic, mientras **MCP (Model Context Protocol)** es el protocolo que permite a Claude Code conectarse a herramientas y servicios externos.

En pocas palabras, MCP convierte a Claude Code de un asistente de IA que solo puede leer y escribir archivos locales en un super asistente que puede acceder a GitHub, bases de datos, APIs y servicios en la nube.

## ¿Por qué usar MCP en Claude Code?

### Claude Code sin MCP

```text
Lo que puedes hacer:
✓ Leer archivos locales
✓ Editar código
✓ Ejecutar comandos
✓ Usar herramientas Bash

Lo que no puedes hacer:
✗ Ver tus Issues de GitHub
✗ Acceder a una base de datos en la nube
✗ Llamar a APIs externas
✗ Obtener el clima en tiempo real
```

### Claude Code con MCP

```text
Lo que puedes hacer:
✓ Todas las funciones originales
✓ Ver / crear Issues y PRs de GitHub
✓ Consultar bases de datos SQLite y PostgreSQL
✓ Acceder a servicios externos como Notion y Slack
✓ Obtener datos de clima y mapas en tiempo real
✓ Automatización del navegador
✓ ...y más
```

## Inicio Rápido

### Paso 1: Entender dónde están los archivos de configuración

Los archivos de configuración MCP de Claude Code se encuentran en:

| Nivel | Ruta del archivo de configuración | Alcance |
|-----|-------------|----------|
| **Nivel de usuario** | `~/.claude.json` | Todos los proyectos |
| **Nivel de proyecto** | `.claude/mcp.json` | Proyecto actual |

Se recomienda usar primero la **configuración a nivel de proyecto**, para que diferentes proyectos puedan usar diferentes servicios MCP.

### Paso 2: Añadir servidores MCP con lenguaje natural

En Claude Code, no necesitas editar manualmente los archivos de configuración ni memorizar comandos. Puedes describir lo que quieres en lenguaje natural:

```text
Tú: Ayúdame a añadir un servidor MCP de GitHub. Mi token es ghp_xxx

Claude: Te ayudaré a configurar el servidor MCP de GitHub...

[Actualiza automáticamente .claude/mcp.json]
```

```text
Tú: Añade un servidor de base de datos SQLite. El archivo de base de datos está en ./data/app.db

Claude: Bien, configuraré el servidor MCP de SQLite...
```

```text
Tú: Añade un servidor MCP tipo HTTP con la dirección https://api.example.com/mcp

Claude: Añadiré ese servidor MCP remoto...
```

### Paso 3: Verificar la configuración

Pregunta directamente a Claude Code:

```text
Tú: ¿Qué servidores MCP están disponibles ahora?

Claude: Servidores MCP actualmente configurados:
• github - Integración con GitHub
• sqlite - Base de datos SQLite
• filesystem - Acceso al sistema de archivos
```

O usa el comando de diagnóstico:

```text
/doctor
```

### Paso 4: Comenzar a usarlo

Una vez que la configuración tenga éxito, puedes llamar funciones MCP directamente con lenguaje natural:

```text
Tú: Ayúdame a crear un Issue en GitHub

Claude: Puedo ayudarte a crear un Issue de GitHub. Por favor dime:
- la dirección del repositorio, por ejemplo owner/repo
- el título del Issue
- la descripción del Issue
```

## Gestión en lenguaje natural en Claude Code

### Ver y gestionar servidores MCP

Puedes interactuar con Claude Code completamente en lenguaje natural:

```text
Tú: Lista todos los servidores MCP configurados

Tú: Verifica el estado de conexión de los servidores MCP

Tú: Elimina el servidor MCP llamado notion

Tú: Actualiza el token del servidor github
```

### Diagnosticar problemas

Cuando encuentres problemas:

```text
Tú: Revisa qué hay de malo con la conexión MCP

Claude: [ejecutará diagnósticos automáticamente, analizará archivos de configuración y verificará el estado del servidor]
```

## Métodos de configuración en detalle

### Configuración a nivel de usuario, global

Edita `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/tunombre/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "tu-token"
      }
    }
  }
}
```

### Configuración a nivel de proyecto, recomendada

Edita `.claude/mcp.json` en la raíz del proyecto:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Ventajas de la configuración a nivel de proyecto:**

- Los miembros del equipo pueden compartir la configuración commitiéndola a Git
- Diferentes proyectos pueden usar diferentes servicios MCP
- La configuración es más flexible y no contamina los ajustes globales

### Modos de transporte

Claude Code soporta tres modos de transporte:

#### STDIO, proceso local

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP, servicio remoto

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer tu-token"
      }
    }
  }
}
```

#### SSE, eventos enviados por el servidor

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Ejemplos prácticos

### Ejemplo 1: Automatización de flujo de trabajo con GitHub

```text
Tú: Ayúdame a enviar los cambios actuales a GitHub, luego crea un PR titulado "Añadir nueva función"

Claude:
1. Verificar estado actual de git...
2. Crear nueva rama feature/new-feature...
3. Hacer commit de los cambios...
4. Enviar al remoto...
5. Llamar github_create_pull_request para crear el PR...
6. PR creado: https://github.com/owner/repo/pull/123
```

### Ejemplo 2: Consulta de base de datos

```text
Tú: Consulta los 10 usuarios más recién registrados en la base de datos

Claude:
1. Conectar a la base de datos SQLite...
2. Ejecutar consulta: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Retornar resultados:
   - Zhang San (zhang@example.com) - 2025-02-28
   - Li Si (li@example.com) - 2025-02-27
   ...
```

### Ejemplo 3: Captura de pantalla y análisis de página web

```text
Tú: Abre https://example.com, toma una captura de pantalla y analiza el diseño de la página

Claude:
1. Iniciar navegador...
2. Navegar a https://example.com...
3. Capturar captura de pantalla...
4. [Retorna captura de pantalla]
5. Análisis del diseño de la página:
   - El layout usa un diseño centrado con ancho máximo de 1200px
   - El color principal es azul (#3b82f6)
   - La barra de navegación está fija en la parte superior
   ...
```

### Ejemplo 4: Integración con Notion

```text
Tú: Guarda las notas que acabo de escribir en Notion

Claude:
1. Usar el servidor MCP de Notion...
2. Crear una nueva página...
3. Guardado: https://notion.so/page/xxx
```

## Consejos de depuración

### Diagnosticar con lenguaje natural

Cuando algo salga mal, simplemente díselo directamente a Claude Code:

```text
Tú: Mi servidor MCP no puede conectarse. Por favor revísalo

Tú: La llamada a la herramienta MCP de GitHub falló. ¿Cuál es la razón?

Tú: ¿Por qué el servidor sqlite siempre muestra "conectando"?
```

Claude Code automáticamente:

1. Verificará el formato del archivo de configuración
2. Validará las variables de entorno
3. Probará la conexión del servidor
4. Proporcionará sugerencias concretas de solución

### Solución de problemas comunes

| Problema | Causa posible | Solución |
|-----|---------|----------|
| Servidor no conectado | Error de formato en archivo de configuración | Verificar sintaxis JSON |
| Herramienta no puede ser llamada | Permisos insuficientes | Verificar variables de entorno |
| Tiempo de conexión agotado | Problema de red | Verificar URL o red |
| Proceso se bloquea | Bug en el código del servidor | Verificar logs del servidor |

### Comando de diagnóstico manual

```text
/doctor
```

Ejemplo de salida:

```text
Informe de Diagnóstico del Sistema:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

Estado del servidor MCP:
• github: ✓ Conectado (12 herramientas)
• sqlite: ✗ Conexión fallida - Archivo de base de datos no encontrado
• puppeteer: ✓ Conectado (8 herramientas)

Sugerencias:
1. Verifica si la ruta de la base de datos sqlite es correcta
2. Asegúrate de que el formato de .claude/mcp.json sea correcto
```

## Mejores prácticas

### 1. Preferir la configuración a nivel de proyecto

**¿Por qué se recomienda la configuración a nivel de proyecto?**

Diferentes proyectos a menudo necesitan diferentes servicios MCP. Por ejemplo, un proyecto frontend puede necesitar herramientas de prueba de navegador, mientras un proyecto backend puede necesitar conexiones a bases de datos. Con la configuración a nivel de proyecto, cada proyecto puede tener su propio conjunto dedicado de servidores MCP, evitando el caos de una gran configuración global.

Más importante aún, la configuración a nivel de proyecto puede ser commitiada a Git. Después de que los miembros del equipo clonen el proyecto, pueden usar directamente los mismos servicios MCP sin reconfigurar todo.

```text
Proyecto A, proyecto frontend -> .claude/mcp.json contiene MCP de prueba de navegador
Proyecto B, proyecto backend -> .claude/mcp.json contiene MCP de base de datos
```

### 2. Almacenar información sensible en variables de entorno

**Nunca codifiques secretos en el archivo de configuración.**

Los archivos de configuración pueden ser accidentalmente commitiados a Git y filtrar claves. El enfoque correcto es almacenar valores sensibles en variables de entorno y solo referenciar los nombres de las variables desde el archivo de configuración. De esa manera, incluso si el archivo de configuración se hace público, los secretos reales siguen ocultos.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

La primera forma es buena porque lee de la variable de entorno. La segunda forma es mala porque codifica un secreto directamente.

### 3. Fijar versiones

**¿Por qué necesitas fijar versiones?**

Por defecto, `npx -y` siempre usará la última versión de un servidor MCP. Esto puede causar problemas: una nueva versión puede introducir cambios rompedores, o un paquete puede ser eliminado o renombrado repentinamente.

Al añadir `@version` al nombre del paquete, te aseguras de que siempre se use una versión validada, reduciendo sorpresas causadas por actualizaciones automáticas.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. Documentar tu configuración MCP

**Ayuda a los compañeros a entender la configuración MCP rápidamente**

Cuando un proyecto incluye múltiples servidores MCP, los nuevos miembros del equipo pueden no entender para qué sirve cada servidor o qué configuración requiere. Crear un `README.md` bajo el directorio `.claude/` que explique el propósito de cada servidor, la configuración requerida y cómo obtener credenciales puede reducir significativamente el costo de comunicación.

Crea `.claude/README.md` en tu proyecto:

```markdown
# Notas de Configuración MCP

Servidores MCP usados en este proyecto:

## github
Usado para automatización de GitHub. Requiere GITHUB_TOKEN.

## sqlite
Se conecta a ./data/app.db para consultar y modificar datos.

## puppeteer
Usado para pruebas E2E.
```

## Claude Code vs Claude Desktop

| Característica | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Archivo de configuración** | `~/.claude.json` o `.claude/mcp.json` | `claude_desktop_config.json` |
| **Configuración a nivel de proyecto** | ✓ Soportado | ✗ No soportado |
| **Gestión en lenguaje natural** | ✓ Soportado | ✗ Requiere edición manual |
| **Diagnósticos** | ✓ `/doctor` | ✗ Ninguno |
| **Recarga en caliente** | ✓ Automática | ✗ Requiere reinicio de app |
| **Casos de uso** | Flujo de trabajo de desarrollo, CI/CD | Uso diario, tareas de oficina |

## Servidores MCP comunes

> 💡 Para la lista completa de servidores MCP, por favor refiérete al apéndice: [Directorio de Servidores MCP](/es-es/appendix/8-artificial-intelligence/ai-protocols)

### Servidor GitHub

**Función:** Issues, PRs, gestión de repositorios

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "tu-token"
      }
    }
  }
}
```

**Obtener token de:** https://github.com/settings/tokens

### Servidor SQLite

**Función:** Consultar y gestionar bases de datos SQLite

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Servidor Filesystem

**Función:** Acceder a archivos dentro de un directorio específico

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/tunombre/Documents"]
    }
  }
}
```

### Automatización de navegador Puppeteer

**Función:** Control del navegador, capturas de pantalla, pruebas automatizadas

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Servidor de búsqueda Brave

**Función:** Búsqueda web

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "tu-brave-api-key"
      }
    }
  }
}
```

## Recursos de referencia

### Documentación oficial

- [Documentación oficial de Claude Code - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [Sitio web oficial de MCP](https://modelcontextprotocol.io/)
- [Documentación de especificación MCP](https://modelcontextprotocol.io/specification/)
- [Repositorio GitHub de MCP](https://github.com/modelcontextprotocol)

### Servidores oficiales

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - Integración con GitHub
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - Base de datos SQLite
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - Base de datos PostgreSQL
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Acceso al sistema de archivos
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Automatización del navegador
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Fetch web
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Búsqueda Brave
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Operaciones Git

### Artículos tutoriales

- [Explicación exhaustiva de principios y práctica de MCP](https://view.inews.qq.com/a/20250414A023WV00)
- [Arquitectura MCP (Model Context Protocol) y cómo funciona](https://m.toutiao.com/w/1826385835060307/)
- [Tutorial más reciente de grandes modelos 2025: desde iniciación hasta dominar el protocolo MCP](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [Aprende MCP desde cero (8) - construir un servidor MCP](https://juejin.cn/post/7582510291667419187)

### Guías de configuración

- [Mejores prácticas de Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Guía completa de configuración de Claude Code](https://juejin.cn/post/7576838552472043563)

### Tutoriales de desarrollo

- [Guía práctica de servidor MCP para principiantes en TypeScript y Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Guía definitiva para construir servidores MCP: tutoriales completos de TypeScript y Python](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Construye el servidor MCP más simple con TypeScript](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Genera un servidor MCP TypeScript usando aplicaciones de contenedor Azure](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### Recursos de servidores MCP

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - la lista más completa de servidores MCP
- [Registro Oficial de MCP](https://registry.modelcontextprotocol.io) - tienda oficial de Anthropic
- [MCP.so](https://mcp.so) - centro comunitario de servidores MCP
- [Glama.ai MCP](https://glama.ai/mcp/servers) - directorio MCP con calificaciones y comentarios
- [Smithery](https://smithery.ai) - marketplace de servidores MCP
- [MCPHub](https://mcphub.io/registry) - directorio de interfaz limpia
- [LobeHub MCP](https://lobehub.com/zh/mcp) - directorio MCP en chino

### Servicios de mapas y clima

- [Amap MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Documentación MCP del Servicio de Ubicación de Tencent](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Caiyun Weather MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### Recursos de la comunidad

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - colección de configuración de Claude Code de grado de producción
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - ruta de aprendizaje en chino para Claude Code

### Casos de aplicación en el mundo real

- [BlenderMCP - Modelado 3D impulsado por IA](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [15 mejores prácticas de MCP en producción](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
