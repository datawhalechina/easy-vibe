# Guia Completa de Claude Agent SDK

## Introduccion

Es posible que ya hayas usado la API basica de Claude: envias un mensaje, recibes una respuesta, como en un chat. Pero si quieres que Claude te ayude a leer archivos, ejecutar comandos, buscar codigo, corregir errores, verificar el resultado por si mismo y continuar iterando, este tipo de "trabajo autonomo" no es algo que la API basica pueda hacer.

Claude Agent SDK esta construido exactamente para este escenario. Empaqueta todas las capacidades de Claude Code - lectura y escritura de archivos, ejecucion de comandos, busqueda de codigo, edicion de archivos, navegacion web - en una biblioteca programable. No necesitas escribir tu mismo el bucle de llamadas a herramientas. Claude puede ejecutar herramientas de forma autonoma e iterar de forma autonoma hasta que la tarea este verdaderamente completada.

Resumen en una oracion: el SDK basico es "tu preguntas, el responde"; el Agent SDK es "tu asignas, el trabaja."

---

## Cual Es la Diferencia con el SDK Basico?

Mira el codigo primero, y la diferencia es obvia:

```python
# SDK basico de anthropic: debes escribir tu propio bucle para manejar llamadas a herramientas
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Corrige el error en auth.py"}],
    tools=[...]  # Debes definir las herramientas tu mismo
)
# Claude pide llamar alguna herramienta
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # Debes ejecutarla tu mismo
    response = client.messages.create(tool_result=result, **params)  # Debes alimentarla tu mismo
```

```python
# Agent SDK: un bloque y listo, Claude lee archivos, encuentra errores y edita codigo por si mismo
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Corrige el error en auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude lee archivos, localiza problemas y edita codigo por si mismo
```

La diferencia es clara:

| Elemento de Comparacion | SDK basico de anthropic | Claude Agent SDK |
|--------|-------------------|-----------------|
| Ejecucion de herramientas | Tu la implementas | Claude la maneja |
| Bucle de herramientas | Tu lo implementas | Bucle de agente integrado |
| Herramientas integradas | Ninguna, todas autodefinidas | Lectura/escritura de archivos, Bash, busqueda y mas listas para usar |
| Gestion de contexto | Tu lo mantienes | Compresion automatica y gestion automatica |
| Mejor para | Chat, generacion, uso simple de herramientas | Completar autonomamente tareas complejas |

---

## En Que Se Diferencia de Otros Frameworks de Agentes?

Hay muchos frameworks de Agentes en el mercado - LangChain, LlamaIndex, CrewAI, AutoGPT y mas. Que tiene de unico Claude Agent SDK en comparacion con ellos?

> 📚 **Para una comparacion detallada, consulta el apendice**: [Comparacion de Frameworks de Agentes Mainstream](/es-es/appendix/8-artificial-intelligence/ai-agents.html)

En resumen:

| Framework | Escenario de Mejor Ajuste |
|------|-------------|
| **Claude Agent SDK** | Dejar que Claude complete autonomamente codificacion, operaciones de archivos y ejecucion de comandos |
| **LangChain** | Construir aplicaciones de IA generales complejas con flujos altamente personalizados |
| **CrewAI** | Simular escenarios de colaboracion multi-rol (equipos virtuales, juego de roles) |
| **LlamaIndex** | Construir sistemas de QA sobre bases de conocimiento que conectan datos empresariales con LLMs |

---

## Instalacion y Configuracion

### Instalacion

Python necesita 3.10+, y TypeScript necesita Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Autenticacion

Solo configura la variable de entorno de la clave API:

```bash
export ANTHROPIC_API_KEY=tu-clave-api
```

Tambien se soporta la autenticacion en plataformas en la nube:
- AWS Bedrock: configurar `CLAUDE_CODE_USE_BEDROCK=1` + credenciales AWS
- Google Vertex AI: configurar `CLAUDE_CODE_USE_VERTEX=1` + credenciales GCP
- Microsoft Azure: configurar `CLAUDE_CODE_USE_FOUNDRY=1` + credenciales Azure

### Endpoint de API Personalizado

Si usas un proxy, gateway o endpoint de API autohospedado, puedes cambiar la URL de API predeterminada a traves del parametro `env`:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hola",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://tu-proxy.ejemplo.com",
            "ANTHROPIC_API_KEY": "tu-clave-api",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` no tiene un parametro directo `base_url`, pero el campo `env` puede pasar variables de entorno arbitrarias al CLI subyacente de Claude Code. Variables de entorno comunes:

| Variable de Entorno | Proposito |
|---------|------|
| `ANTHROPIC_BASE_URL` | Endpoint de API personalizado (proxy, gateway) |
| `ANTHROPIC_API_KEY` | Clave API |
| `ANTHROPIC_AUTH_TOKEN` | Token de autenticacion alternativo |
| `ANTHROPIC_CUSTOM_HEADERS` | Encabezados de solicitud personalizados |

---

## Conceptos Centrales

El principio de ejecucion del Agent SDK se puede resumir en una oracion: **recolectar contexto -> ejecutar acciones -> verificar resultados -> repetir**.

Esto es exactamente como trabajan los desarrolladores humanos: primero leen codigo, luego modifican codigo, luego ejecutan pruebas y verifican resultados. Si esta mal, siguen iterando. Agent SDK automatiza este bucle.

### Dos Modos de Uso

**Modo 1: Funcion `query()` - sin estado, adecuada para tareas unicas**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Que archivos hay en este directorio?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Modo 2: `ClaudeSDKClient` - con estado, adecuado para conversacion de multiples turnos**

Usa esto cuando necesitas preservar contexto e interactuar a traves de multiples turnos. Por ejemplo, primero pedir a Claude que lea un modulo, luego pedirle que encuentre todos los sitios de llamada de ese modulo - en el segundo turno aun recuerda lo que leyo en el primer turno.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Turno 1: leer el modulo de autenticacion
    async for message in query(
        prompt="Lee el codigo del modulo de autenticacion",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Turno 2: continuar basandose en el contexto anterior
    async for message in query(
        prompt="Encuentra todos los lugares que lo llaman",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## Herramientas Integradas: Listas para Usar

Esta es una de las mejores partes del Agent SDK - no necesitas implementar ninguna herramienta tu mismo, Claude puede usarlas directamente:

| Herramienta | Capacidad | Uso Tipico |
|------|------|---------|
| Read | Leer archivos | Ver codigo, leer configuraciones |
| Write | Crear archivos | Generar nuevos archivos |
| Edit | Ediciones precisas de archivos | Correccion de errores, refactorizacion |
| Bash | Ejecutar comandos de terminal | Ejecutar pruebas, instalar dependencias, operaciones git |
| Glob | Busqueda de archivos por patron | `**/*.py`, `src/**/*.ts` |
| Grep | Busqueda de contenido por regex | Encontrar definiciones de funciones, TODOs |
| WebSearch | Buscar paginas web | Buscar documentacion, encontrar enfoques |
| WebFetch | Obtener contenido web | Leer documentacion en linea |
| Task | Lanzar sub-agentes | Paralelizar subtareas |

Usa `allowed_tools` para controlar que herramientas puede usar el agente:

```python
# Agente de solo lectura: puede inspeccionar pero no modificar
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Agente completo: puede leer, escribir y ejecutar comandos
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## Funciones Avanzadas

### Hooks: Inserta Tu Propia Logica en Puntos Clave

Los Hooks te permiten inyectar codigo personalizado en momentos criticos de la ejecucion del agente - por ejemplo, registro, intercepcion de operaciones riesgosas y auditoria de cambios de archivos.

Los tipos de hooks soportados incluyen: `PreToolUse` (antes de la ejecucion de herramientas), `PostToolUse` (despues de la ejecucion de herramientas), `Stop` (cuando el agente se detiene), `SessionStart`, `SessionEnd` y mas.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Registrar un log de auditoria cada vez que se modifica un archivo
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modificado {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactoriza utils.py para mejor legibilidad",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

Usos en el mundo real:
- Registro de auditoria: registrar cada operacion realizada por el agente
- Intercepcion de seguridad: bloquear modificaciones a archivos criticos
- Notificaciones push: enviar mensajes cuando las tareas del agente se completan
- Monitoreo de costos: contar llamadas a herramientas y uso de tokens

### Sub-Agentes: Dividir Tareas Grandes Entre Especialistas

Cuando una tarea es lo suficientemente compleja, puedes definir multiples sub-agentes especializados y dejar que el agente principal delegue subtareas a ellos. Cada sub-agente tiene sus propias instrucciones y permisos de herramientas, aislados entre si.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Usa el agente code-reviewer para revisar la calidad del codigo de este proyecto",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Revisor de codigo profesional responsable de revisiones de calidad y seguridad",
                prompt="Analiza la calidad del codigo, identifica problemas potenciales y proporciona sugerencias de mejora.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Especialista en pruebas responsable de escribir pruebas unitarias",
                prompt="Escribe pruebas unitarias para funciones que carecen de pruebas.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Los mensajes de sub-agentes incluyen un campo `parent_tool_use_id`, lo que facilita rastrear que mensajes vinieron de que sub-agente.

### Integracion MCP: Conectarse al Mundo Exterior

A traves del Protocolo de Contexto de Modelo (MCP), tu agente puede conectarse a sistemas externos como bases de datos, navegadores y APIs de terceros. La comunidad ya proporciona [cientos de servidores MCP](https://github.com/modelcontextprotocol/servers) que puedes usar directamente.

```python
# Conectar Playwright para que el agente pueda operar un navegador
async for message in query(
    prompt="Abre example.com y describe lo que ves",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Escenarios comunes de integracion MCP:
- Playwright: automatizacion de navegador, scraping de paginas, llenado de formularios
- PostgreSQL/MySQL: consulta y operaciones directas de base de datos
- Slack/Email: envio de notificaciones y mensajes
- GitHub: operacion de PRs, Issues y repositorios

---

## Que Puedes Construir? Escenarios Practicos

Despues de entender las funciones, la pregunta mas importante es: que puede hacer esto realmente? A continuacion se presentan escenarios reales validados por la comunidad.

### Escenario 1: Agente de Correccion Automatica de Errores

Dale una descripcion de error, y puede encontrar codigo, localizar el problema, corregirlo y ejecutar pruebas para verificar:

```python
async for message in query(
    prompt="Los usuarios reportan errores HTTP 500 ocasionales durante el inicio de sesion. Investiga y corrige el codigo bajo src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude hara grep de logs, leera codigo relacionado, encontrara el error, modificara codigo y ejecutara pruebas para confirmar la correccion.

### Escenario 2: Agente de Revision de Codigo

Construye un agente de revision de codigo de solo lectura que audite calidad sin hacer ninguna modificacion:

```python
async for message in query(
    prompt="Revisa el codigo bajo src/ con enfoque en vulnerabilidades de seguridad, problemas de rendimiento y convenciones de codificacion",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### Escenario 3: Integracion CI/CD

En un pipeline de CI, deja que el agente analice pruebas fallidas e intente correcciones automaticas:

```python
async for message in query(
    prompt="Ejecuta npm test, analiza los casos de prueba fallidos y corrige el codigo para que todas las pruebas pasen",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

Esta es una gran ventaja del Agent SDK sobre el CLI - el CLI es bueno cuando un humano esta sentado en la terminal, mientras que el SDK es ideal para integrar en flujos de trabajo automatizados.

### Escenario 4: Agente de Investigacion

Deja que el agente busque en la web, lea documentacion, sintetice informacion y produzca un informe:

```python
async for message in query(
    prompt="Investiga los frameworks web Python mainstream en 2026. Compara FastAPI, Django y Litestar, luego escribe un informe de seleccion tecnica en report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### Escenario 5: Agente Full-Stack con Capacidad de Navegador

Al conectar Playwright a traves de MCP, el agente no solo puede escribir codigo sino tambien abrir un navegador para verificar resultados:

```python
async for message in query(
    prompt="Corrige el problema de estilo de la pagina principal, luego abre un navegador y toma capturas de pantalla para verificar el resultado",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### Referencia Rapida de Escenarios

| Escenario | Herramientas Centrales | Dificultad |
|------|---------|------|
| Correccion automatica de errores | Read, Edit, Bash, Grep | Principiante |
| Revision de codigo | Read, Glob, Grep | Principiante |
| Correccion automatica CI/CD | Read, Edit, Bash | Intermedio |
| Informe de investigacion tecnica | WebSearch, WebFetch, Write | Principiante |
| Automatizacion de navegador | MCP (Playwright) | Intermedio |
| Colaboracion multi-agente | Task + AgentDefinition | Avanzado |
| Operaciones de base de datos | MCP (PostgreSQL/MySQL) | Intermedio |
| Asistente de email/notificaciones | MCP (Slack/Email) | Intermedio |

---

## Cuando Deberias Usar Agent SDK?

No todos los escenarios necesitan Agent SDK. Elegir la herramienta correcta importa:

| Lo Que Quieres Hacer | Herramienta Recomendada |
|-----------|---------|
| Chat simple, generacion de texto, traduccion | SDK basico `anthropic` |
| Uso de herramientas de una sola vez (consulta meteorologica, aritmetica) | SDK basico `anthropic` |
| Completar autonomamente tareas de desarrollo de multiples pasos | Agent SDK |
| Integrar en pipelines CI/CD | Agent SDK |
| Construir aplicaciones que operan en un sistema de archivos | Agent SDK |
| Desarrollo interactivo diario | Claude Code CLI |
| Tareas rapidas puntuales | Claude Code CLI |

En resumen: si tu tarea requiere que Claude "trabaje con las manos" por si mismo (leyendo archivos, editando codigo, ejecutando comandos), usa Agent SDK. Si solo necesitas preguntas y respuestas, el SDK basico es suficiente.

---

## Practica Empresarial: Construir un Pipeline de Proteccion de Calidad de Codigo

Los escenarios anteriores todos usaron un agente para un trabajo. En entornos empresariales reales, lo que necesitas es un pipeline completo - multiples agentes encadenados, cada etapa con entrada/salida clara, mas auditoria, rollback y notificaciones.

Ahora construiremos un escenario real: despues de cada envio de PR, activar automaticamente **revision de codigo -> escaneo de seguridad -> correccion automatica -> verificacion de pruebas -> generacion de informe** como un pipeline completo.

### Diseno de Arquitectura

```text
PR enviado
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Revision de │───▶│ Escaneo de  │───▶│  Correccion  │
│  Codigo      │    │  Seguridad  │    │  Automatica  │
│  Agente      │    │  Agente     │    │  Agente      │
│ (solo lectura)│    │ (solo lectura)│    │ (escribible) │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ Verificacion │───▶│ Construccion │
                                     │ de Pruebas   │    │ de Informe   │
                                     │  Agente      │    │  Agente      │
                                     │   (Bash)     │    │   (Write)    │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Notificacion Slack
```

Idea central: **cada agente hace una cosa, los permisos se minimizan y los resultados se pasan en secuencia**.

### Paso 1: Definir el Framework del Pipeline

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Log de auditoria: registrar cada operacion de cada agente
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Configuracion de hooks compartida: todos los agentes comparten capacidad de auditoria
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### Paso 2: Agente de Revision de Codigo (Solo Lectura)

```python
async def run_code_review(pr_diff: str) -> str:
    """Agente de solo lectura, revisa calidad del codigo y emite un informe estructurado"""
    result_text = ""
    async for message in query(
        prompt=f"""Revisa el siguiente diff de PR desde estas dimensiones:
1. Convenciones de codigo: nomenclatura, formateo, comentarios
2. Problemas de logica: casos extremos, riesgos de puntero nulo, condiciones de carrera
3. Riesgos de rendimiento: consultas N+1, fugas de memoria, bucles innecesarios
4. Mantenibilidad: funciones demasiado grandes, responsabilidades poco claras, numeros magicos

PR Diff:
{pr_diff}

Salida en formato JSON: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Paso 3: Agente de Escaneo de Seguridad (Solo Lectura)

```python
async def run_security_scan() -> str:
    """Agente de solo lectura enfocado en escaneo de vulnerabilidades"""
    result_text = ""
    async for message in query(
        prompt="""Escanea el codigo del proyecto en busca de vulnerabilidades de seguridad:
1. Inyeccion SQL, XSS, CSRF
2. Claves o credenciales codificadas
3. Versiones de dependencias inseguras
4. Verificaciones de permisos faltantes

Salida JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Paso 4: Agente de Correccion Automatica (Escribible)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Agente escribible que corrige codigo automaticamente basandose en resultados de revision y escaneo"""
    result_text = ""
    async for message in query(
        prompt=f"""Corrige el codigo segun los siguientes resultados de revision:

Informe de revision de codigo:
{review_result}

Informe de escaneo de seguridad:
{security_result}

Reglas de correccion:
1. Solo corregir problemas con severidad alta o critica
2. Ejecutar pruebas relacionadas despues de cada cambio para asegurar que no se rompa funcionalidad existente
3. No refactorizar codigo no relacionado, aplicar solo correcciones minimas
4. Emitir la lista de archivos modificados despues de completar""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Paso 5: Verificacion de Pruebas + Generacion de Informe

```python
async def run_test_and_report(fix_result: str) -> str:
    """Ejecutar pruebas y generar informe final"""
    result_text = ""
    async for message in query(
        prompt=f"""Ejecuta estas acciones:
1. Ejecutar el conjunto completo de pruebas (npm test o pytest)
2. Calcular la tasa de aprobacion de pruebas
3. Generar un informe de calidad en Markdown en pr-report.md, incluyendo:
   - Cantidad de problemas encontrados en la revision de codigo y distribucion de severidad
   - Numero de vulnerabilidades de seguridad
   - Cambios de correccion automatica: {fix_result}
   - Tasa de aprobacion de pruebas
   - Conclusion final: si se recomienda la fusion""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Paso 6: Encadenar Todo el Pipeline

```python
import subprocess

async def run_pipeline():
    """Pipeline completo de proteccion de calidad de PR"""
    print("🔍 Etapa 1/4: revision de codigo...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ Etapa 2/4: escaneo de seguridad...")
    security_result = await run_security_scan()

    print("🔧 Etapa 3/4: correccion automatica...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ Etapa 4/4: verificacion de pruebas + generacion de informe...")
    report = await run_test_and_report(fix_result)

    # Guardar log de auditoria
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Pipeline finalizado, log de auditoria guardado ({len(audit_log)} registros de operaciones)")
    return report

asyncio.run(run_pipeline())
```

### Pensamiento de Diseno Empresarial

Este pipeline refleja varios principios clave de diseno empresarial:

**Privilegio minimo**: los agentes de revision de codigo y escaneo de seguridad son de solo lectura y no pueden modificar codigo accidentalmente. Solo el agente de correccion automatica tiene permiso de escritura, e incluso ese esta restringido por `acceptEdits`.

**Auditable**: cada paso de cada agente se registra a traves de Hooks. Si algo sale mal, puedes rastrear que agente hizo que y cuando.

**Encadenamiento de resultados**: la salida de cada agente se convierte en la entrada del siguiente agente. Los resultados de revision alimentan la correccion automatica; los resultados de correccion automatica alimentan la verificacion de pruebas. Cada etapa tiene un contrato claro de entrada/salida.

**Control de costos**: cada agente tiene un limite `max_turns` para prevenir bucles descontrolados. En produccion, tambien puedes agregar `max_budget_usd` para control presupuestario.

**Extensibilidad**: quieres otra etapa, como un "agente de verificacion de documentacion" o "agente de benchmark de rendimiento"? Agrega una nueva funcion e insertala en el pipeline.

Este modelo puede integrarse directamente en GitHub Actions o GitLab CI, activado automaticamente en cada PR, logrando verdaderamente "barreras de calidad de codigo impulsadas por IA."

---

## Manejo de Errores

Agent SDK proporciona tipos de excepcion claros para que puedas construir tolerancia a fallos robusta en produccion:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Analizar codigo"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI no esta instalado. Por favor instalalo primero.")
except ProcessError as e:
    print(f"El proceso salio inesperadamente con codigo de salida: {e.exit_code}")
```

---

## Resumen

El valor central de Claude Agent SDK es actualizar el "razonamiento del modelo" a "ejecucion controlada." No solo genera texto. Puede verdaderamente completar tareas dentro de un sistema de herramientas auditable y restringido.

Recuerda una linea del blog oficial de Anthropic: la filosofia de diseno del Agent SDK es "dale al agente una computadora y dejalo trabajar como un humano."

Una buena aplicacion de agente = diseno de herramientas claro + limites de tarea explicitos + supervision humana apropiada. Las herramientas le dan capacidad al agente, los limites le dan restricciones, y la supervision te da confianza. Ninguno de los tres puede faltar.

---

## Referencias

### Recursos Oficiales

- [Documentacion Oficial del Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) - la referencia mas autorizada
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - codigo fuente del SDK Python
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - codigo fuente del SDK TypeScript
- [Proyectos Demo del Agent SDK](https://github.com/anthropics/claude-agent-sdk-demos) - asistente de email, agente de investigacion y mas

### Blogs y Tutoriales

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - blog de ingenieria de Anthropic sobre filosofia de diseno y arquitectura
- [Guia de Estudio de Claude Agent SDK Python](https://redreamality.com/blog/claude-agent-sdk-python-) - tutorial completo desde cero en chino
- [Tutorial Completo de Claude Agent SDK](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - guia practica de sistemas de herramientas, Agent Loop y ejecucion controlada
- [12 Escenarios Practicos del Agent SDK](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - cubre codificacion, datos, automatizacion y mas
- [Tutorial Paso a Paso de Agente](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - tutorial de doble via TypeScript + Python
