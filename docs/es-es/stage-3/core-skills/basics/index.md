# Guía principal de inicio rápido de Claude Code

Claude Code es la herramienta de codificación nativa de IA oficial de Anthropic. Integra la capacidad de los modelos de lenguaje grandes directamente en la terminal, para que puedas completar tareas de programación colaborando con IA en lenguaje natural. A diferencia de las herramientas tradicionales de autocompletado de código, Claude Code puede entender el contexto de un proyecto completo y ejecutar tareas de desarrollo complejas. Desde generación de código hasta refactorización, desde depuración hasta escritura de documentación, puede manejarlo todo.

Este capítulo te ayuda a dominar rápidamente el uso principal de Claude Code, incluyendo instalación y configuración, operaciones básicas, técnicas prácticas y comandos de uso frecuente. Ya sea que estés usando una herramienta de codificación con IA por primera vez, o quieras usar Claude Code de manera más eficiente, encontrarás lo que necesitas aquí.

---

## Instalación rápida

Claude Code está construido sobre Node.js, así que antes de la instalación asegúrate de tener Node.js 18 o superior instalado en tu sistema. El proceso es muy sencillo y normalmente toma solo unos minutos.

### Por qué necesitas Claude Code

En los flujos de trabajo de desarrollo tradicionales, los desarrolladores cambian frecuentemente entre editor, terminal, navegador y documentación. Claude Code unifica estos flujos de trabajo en una sola interfaz: en la misma ventana de terminal, puedes escribir código, ejecutar pruebas, leer documentación e incluso colaborar con compañeros de equipo. Más importante aún, puede entender la estructura de tu proyecto y recordar tus hábitos de codificación, convirtiéndose en un verdadero asistente de programación.

### Método 1: Instalación manual

La instalación manual es adecuada para desarrolladores que les gusta tener control total sobre cada paso, y también te ayuda a entender claramente los componentes de la herramienta.

```bash
# Instalar Claude Code CLI globalmente
# Usar -g para instalar el comando globalmente, para que pueda usarse en cualquier directorio
npm install -g @anthropic-ai/claude-code

# Verificar la instalación
# Si se muestra la versión (por ejemplo 0.1.25), la instalación fue exitosa
claude --version
```

Durante la instalación, npm descarga automáticamente las dependencias y configura las variables de entorno. Si encuentras problemas de permisos, prueba con `sudo` (macOS/Linux) o ejecuta la terminal como administrador (Windows).

### Método 2: Deja que un Agente de IA lo instale por ti

Si ya estás usando otros asistentes de codificación con IA (como Cursor, Windsurf, o el Agente de IA de este proyecto), puedes dejar que completen la instalación por ti. El beneficio es que la IA puede detectar tu entorno automáticamente, manejar conflictos de dependencias y elegir la mejor ruta de instalación para tu sistema.

**Solo necesitas decir:**

```text
Ayúdame a instalar Anthropic Claude Code.
```

O más específicamente:

```text
Instala Claude Code CLI y verifica si mi versión de Node.js es compatible.
```

Un Agente de IA hará lo siguiente:
1. Verificar la versión actual de Node.js
2. Indicarte que actualices si no cumple los requisitos
3. Ejecutar los comandos de instalación
4. Verificar el resultado de la instalación
5. Intentar correcciones automáticas si hay problemas

### Primer inicio e inicialización

Después de la instalación, entra en el directorio de tu proyecto e inicia Claude Code:

```bash
# Entrar al directorio del proyecto (Claude Code funciona en el directorio actual)
cd /ruta/a/tu/proyecto

# Iniciar Claude Code
claude
```

En el primer inicio, Claude Code te guía a través de varios pasos importantes de configuración:

1. **Iniciar sesión en la cuenta de Anthropic**: necesitas una cuenta de Anthropic para usar Claude Code. Si no tienes una, se te pedirá que te registres.
2. **Elegir un plan**:
   - **Plan gratuito**: adecuado para aprendizaje personal y uso ligero, con límites de llamadas
   - **Plan Pro**: adecuado para desarrolladores profesionales, con mayor cuota y respuesta prioritaria
3. **Aceptar los términos**: lee y acepta los términos y la política de privacidad de Anthropic
4. **Opcional: configurar clave API**: si tienes una clave personalizada (por ejemplo de un proveedor externo), configúrala aquí

::: info Nota especial para usuarios en China continental

Por razones de red, los usuarios en China continental pueden no poder acceder directamente a los servicios oficiales de Anthropic. Claude Code soporta servicios de terceros compatibles con el formato de API de Anthropic, y esto es técnicamente factible.

**Tienes dos opciones:**

1. **Usar token de API directamente**: compra un token a un proveedor compatible con la API de Anthropic y configúralo con variables de entorno
2. **Usar un plan de codificación**: algunos proveedores ofrecen planes optimizados para codificación que suelen ser más rentables para escenarios de programación

**Enfoque recomendado**: deja que un Agente de IA te ayude a configurar. Solo necesitas proporcionar la información de configuración del proveedor (endpoint de API, clave, etc.), y la IA puede configurar las variables de entorno correctamente.

**Consulta la guía de configuración detallada:** [Cómo instalar claudecode y configurar variables de entorno](/es-es/stage-2/backend/modern-cli/)

:::

---

## Inicio rápido: Ejecuta unos pequeños experimentos

Después de la instalación, no te apresures a entrar en proyectos formales. Ejecuta primero unos pequeños experimentos para entender cómo funciona Claude Code. Estos tres experimentos están diseñados de fácil a avanzado, correspondientes a tres capacidades principales: comprensión de lenguaje natural, generación de contenido y ejecución de código.

### Experimento 1: Conversación - Experimenta la comprensión de la IA

El propósito es experimentar la comprensión de lenguaje natural de Claude Code. A diferencia de los motores de búsqueda normales, Claude Code puede entender el contexto, mantener conversaciones de múltiples turnos y ajustar las respuestas según tu retroalimentación.

**Prueba estos prompts:**

```text
Hola, ¿quién eres?
```

Claude se presenta como Claude Code, un asistente de codificación con IA de Anthropic.

```text
¿Qué es un closure? Dame la versión resumida.
```

Observa cómo Claude usa "versión resumida" como pista y da una explicación concisa pero precisa.

```text
¿Cuál es la diferencia entre JavaScript y TypeScript?
```

Esta es una pregunta de comparación técnica. Verifica si Claude proporciona una respuesta estructurada y profunda.

**Punto del experimento**: nota el estilo de respuesta de Claude. Normalmente da primero la conclusión principal, luego los detalles. Este estilo de "pirámide invertida" es excelente para la recuperación rápida de información.

### Experimento 2: Genera un documento Markdown - Experimenta la creación de contenido

Este experimento demuestra la capacidad de generación de contenido de Claude Code. Para los desarrolladores, escribir documentación suele ser doloroso. Claude puede generar rápidamente documentación clara y completa a partir de los requisitos.

**Ingresa esta instrucción:**

```text
Escribe un documento Markdown de comandos de Git de uso común.
Requisitos: incluir comando, explicación y ejemplo.
```

**Lo que hace Claude:**

1. Analiza tu requisito: comandos comunes de Git, formato Markdown y tres elementos (comando/explicación/ejemplo)
2. Planifica la estructura del documento: normalmente agrupados por escenario de uso (inicialización, desarrollo diario, flujo de ramas, colaboración remota, etc.)
3. Genera contenido: explicación concisa y ejemplos prácticos para cada comando
4. Formatea la salida: usa sintaxis Markdown y estructura adecuada

**Ejemplo de salida esperada**:

```markdown
# Referencia rápida de comandos Git comunes

## Inicializar repositorio

| Comando | Explicación | Ejemplo |
|------|------|------|
| `git init` | Inicializar nuevo repositorio | `git init mi-proyecto` |
| `git clone` | Clonar repositorio remoto | `git clone https://github.com/usuario/repo.git` |

...
```

**Intentos avanzados**: puedes agregar requisitos adicionales como "añadir comentarios en español", "ordenar por frecuencia", "incluir manejo de errores comunes", etc., y observar cómo Claude adapta la salida.

### Experimento 3: Escribe y ejecuta un juego - Flujo de codificación de extremo a extremo

Este es el experimento más desafiante. Demuestra el flujo completo de Claude Code: entender requisitos, escribir código, crear archivos, ejecutar programas y manejar errores. A través de él, puedes sentir realmente el poder de un asistente de codificación con IA.

**Ingresa esta instrucción:**

```text
Escribe un juego de Snake en Python.
Requisitos:
1. Usar pygame
2. Mostrar puntuación
3. Presionar ESC para salir

Después de escribir, ayúdame a ejecutarlo.
```

**Claude ejecuta estos pasos:**

**Paso 1: Verificar entorno**
- Verificar si Python está instalado
- Verificar si pygame está disponible
- Indicar la instalación si falta

**Paso 2: Escribir código**
- Crear archivo de entrada del juego (por ejemplo `snake_game.py`)
- Implementar movimiento, generación de comida, detección de colisiones
- Añadir renderizado de puntuación
- Implementar salida con ESC

**Paso 3: Ejecutar juego**
- Ejecutar script Python y lanzar el juego
- Aparece la ventana del juego, usar teclas de flecha para controlar la serpiente

**Paso 4: Soporte adicional**
- Si hay un bug, puedes decir directamente "la serpiente puede atravesar paredes, arréglalo"
- Si quieres más funciones, como "aumentar dificultad con la puntuación", Claude puede seguir modificando

**Valor de este experimento:**

1. **Verificar configuración**: confirmar que Claude Code puede ejecutar código correctamente
2. **Experimentar interacción**: sentir el desarrollo colaborativo con IA
3. **Generar confianza**: ver a la IA completar un programa ejecutable de extremo a extremo

**Preguntas comunes:**

- **P: ¿Qué pasa si pygame no está instalado?**
  - R: Claude lo detecta y sugiere `pip install pygame`, o puedes pedir a Claude que lo instale

- **P: La terminal está ocupada después de iniciar el juego, ¿qué hago?**
  - R: Presiona ESC para salir del juego, o sigue usando Claude Code en otra ventana de terminal

- **P: ¿Puedo cambiar de lenguaje?**
  - R: Absolutamente. Prueba "escribir en JavaScript", "escribir con HTML5 Canvas", etc.

---

## Técnicas principales

Domina estas técnicas y tu eficiencia con Claude Code puede mejorar múltiples veces. Provienen de la práctica de desarrollo real y cubren escenarios de alta frecuencia.

### Técnica 1: Presionar Esc dos veces para retroceder la conversación - Deshacer operaciones incorrectas

Este es el atajo más común e importante en Claude Code. Durante la colaboración, puedes cometer errores de tipeo, dar instrucciones incorrectas o no estar satisfecho con una respuesta. Presionar Esc dos veces te da un rápido "viaje en el tiempo".

**Detalles del atajo:**

```text
Presionar Esc una vez     -> limpiar entrada actual (similar a Ctrl+C)
Presionar Esc dos veces    -> retroceder al estado anterior de conversación (deshacer turno anterior)
Presionar Esc tres veces -> limpiar todo el historial de conversación (empezar de nuevo)
```

**Casos de uso:**

- **Caso A**: enviaste accidentalmente una instrucción incorrecta y Claude empezó a ejecutar. Presiona rápidamente Esc dos veces para volver antes de la ejecución.
- **Caso B**: la respuesta de Claude no es lo que querías, y deseas reformularla. Doble Esc para deshacer y preguntar de nuevo.
- **Caso C**: la conversación tiene muchas rondas y el contexto está desordenado. Triple Esc para limpiar y reiniciar.

**Nota importante**: doble Esc retrocede el **estado de conversación**, no los cambios de código. Si Claude ya editó archivos, esas ediciones no se revierten automáticamente. Debes restaurar manualmente vía Git.

**Recomendación**: antes de ediciones de código potencialmente grandes, guarda el estado actual (`git commit` o `git stash`) para que la recuperación sea fácil.

### Técnica 2: Usar @ para referenciar archivos - Control preciso de contexto

Aunque Claude Code puede leer archivos del proyecto automáticamente, referenciar archivos explícitamente hace la intención más clara y evita desperdiciar tokens en archivos no relacionados.

**Uso básico:**

En lugar de algo vago como:

```text
Explica src/utils.ts
```

Usa referencia explícita:

```text
@src/utils.ts Explica este archivo
```

**Uso avanzado:**

**Comparar múltiples archivos:**
```text
@src/app.tsx @src/components/Header.tsx ¿Cuál es la relación entre estos dos archivos?
```

**Referenciar directorio:**
```text
@src/components/ Resume todos los componentes bajo este directorio
```

**Referenciar líneas específicas (con editor):**
```text
@src/utils.ts:45-60 Explica qué hace este código
```

**Consejos de uso:**

1. **Autocompletar con Tab**: escribe `@` y luego presiona Tab, Claude muestra la lista de archivos del directorio actual y puedes elegir con las flechas
2. **Rutas relativas**: soporta referencias como `@./config.json` o `@../shared/types.ts`
3. **Coincidencia difusa**: se permiten nombres de archivo parciales, por ejemplo `@utils` puede coincidir con `src/utils.ts` o `src/utils/index.ts`

### Técnica 3: Usar ! para ejecutar comandos - Integración con la terminal

Claude Code tiene ejecución de comandos integrada. Puedes ejecutar comandos sin cambiar a otra terminal.

**Uso básico:**

```text
!npm test           # ejecutar pruebas
!git status         # verificar estado de Git
!ls -la             # listar archivos
```

**Escenarios prácticos:**

**Escenario: ejecutar pruebas y analizar fallos**
```text
!npm test
# después del fallo
Analiza las razones del fallo de las pruebas y corrige el código
```

**Escenario: inspeccionar Git diff**
```text
!git diff
# pedir a Claude que explique los cambios
Resume los cambios clave en este diff
```

**Escenario: construir proyecto**
```text
!npm run build
# si la construcción falla
La construcción falló, ayúdame a arreglarlo
```

**Nota de seguridad:**

Para comandos sensibles (por ejemplo `rm -rf`, `sudo`), Claude Code pide confirmación. Esto es un mecanismo de protección. Confirma con cuidado.

### Técnica 4: /plan antes de codificar - La forma correcta de manejar tareas complejas

Para tareas complejas, codificar directamente suele ser ineficiente. `/plan` entra en modo de planificación: define el plan de implementación primero, luego ejecuta paso a paso.

**Uso:**

```text
/plan
Quiero añadir autenticación de usuarios. Crea un plan de implementación.
```

**Lo que hace Claude:**

1. **Analizar requisitos**
2. **Evaluar proyecto actual y stack tecnológico**
3. **Crear plan paso a paso**
4. **Discutir y ajustar con tu retroalimentación**

**Ejemplo de salida:**

```text
📋 Plan de Implementación de Autenticación de Usuarios

Fase 1: Diseño de base de datos
- [ ] Crear tabla users (id, email, password_hash, created_at)
- [ ] Crear tabla sessions (id, user_id, expires_at)

Fase 2: API Backend
- [ ] POST /api/auth/register - registro
- [ ] POST /api/auth/login - inicio de sesión
- [ ] POST /api/auth/logout - cierre de sesión
- [ ] GET /api/auth/me - obtener usuario actual

Fase 3: Integración frontend
- [ ] Crear página de inicio de sesión
- [ ] Crear página de registro
- [ ] Añadir guards de ruta

Fase 4: Pruebas
- [ ] Escribir pruebas unitarias
- [ ] Escribir pruebas de integración

¿Con qué fase quieres empezar? ¿O deberíamos ajustar el plan?
```

**Mejor práctica:**

- Para tareas de más de 30 minutos, usa `/plan` primero
- Ejecuta fase por fase y verifica cada fase
- Si los requisitos cambian, vuelve a ejecutar `/plan` para ajustar

### Técnica 5: /init genera configuración automáticamente - Inicialización rápida del proyecto

`/init` es uno de los comandos más potentes de Claude Code. Escanea tu proyecto automáticamente, identifica el stack tecnológico y la estructura, y genera un `CLAUDE.md` completo.

**Uso:**

```text
/init
```

**Claude realiza:**

1. **Escanea la estructura del proyecto**: identifica framework/lenguaje/herramientas de construcción
2. **Analiza archivos de configuración**: lee package.json, tsconfig.json, etc.
3. **Infiere el estilo**: convenciones de nomenclatura y organización de archivos
4. **Genera CLAUDE.md**

**Ejemplo de CLAUDE.md generado:**

```text
# Mi Proyecto

## Stack Tecnológico
- Framework: Next.js 14 (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS
- Estado: Zustand
- Base de datos: Prisma + PostgreSQL

## Comandos Comunes

\`\`\`bash
npm run dev      # iniciar servidor de desarrollo
npm run build    # construcción de producción
npm run test     # ejecutar pruebas
npx prisma migrate dev  # migración de BD
\`\`\`

## Convenciones de Código
- Usar componentes funcionales + Hooks
- Nomenclatura de archivos: PascalCase (componentes), camelCase (funciones utilitarias)
- Estilo de commits: Conventional Commits
```

**Por qué esto es importante:**

`CLAUDE.md` es la "memoria del proyecto" de Claude Code. En cada inicio, Claude lee este archivo y entiende el contexto del proyecto. Eso significa:

- no necesitas explicar repetidamente el framework y el stack
- Claude sigue tus convenciones y mejores prácticas
- los nuevos miembros del equipo pueden integrarse más rápido

**Recomendación**: después de la inicialización del proyecto, ejecuta `/init` inmediatamente, luego refina la configuración generada para que coincida con la realidad.

### Técnica 6: /compact comprime el contexto - Ahorra tokens

La ventana de contexto de Claude Code es limitada (normalmente alrededor de 200K tokens). Las conversaciones largas consumen muchos tokens, aumentan el costo y pueden empujar información importante temprana fuera del contexto.

**Uso:**

```text
/compact
```

**Cómo funciona:**

`/compact` analiza el historial del chat, extrae información clave (decisiones tomadas, código generado, requisitos confirmados) y crea un resumen conciso. El diálogo posterior se basa en este resumen en lugar del historial completo.

**Cuándo usar:**

- después de 5-6 rondas
- cuando Claude parece "olvidar" contexto anterior
- cuando cambias a una nueva subtarea pero mantienes información clave de fondo

**Recomendación:**

```text
# comprimir después de una conversación larga
/compact

# seguir trabajando
Ahora que el módulo de usuarios está listo, construyamos el módulo de pedidos.
```

### Técnica 7: Usar Claude Code para asistir en commits de Git

En Claude Code, el flujo de commit recomendado es: dejar que Claude inspeccione el diff y redacte el mensaje de commit, luego tú ejecutas los comandos estándar de Git. Esto es claro y te da un punto de revisión adicional antes del commit.

Referencias oficiales:

- [Comandos integrados](https://code.claude.com/docs/en/commands)
- [Descubrir plugins](https://code.claude.com/docs/en/discover-plugins)

**Flujo de trabajo recomendado:**

```bash
# 1. Verificar cambios actuales
/diff
!git status

# 2. Pedir a Claude que resuma y genere mensaje de commit
Basado en el git diff actual, genera un mensaje Conventional Commits,
y explica en español por qué esta categoría es apropiada.

# 3. Después de confirmar, ejecutar commit estándar de Git
!git add -A
!git commit -m "feat(docs): actualizar guía de flujo de trabajo de Claude Code"
```

**Beneficios de este enfoque:**

1. **Alineado con las capacidades oficiales actuales**: sin dependencia de comandos integrados eliminados
2. **Transparente**: revisar diff y mensaje de commit antes de enviar
3. **Portátil**: el mismo flujo funciona en otros IDEs con IA o Git puro

**Si quieres la experiencia de "commit con un solo comando":**

Claude Code ahora recomienda la extensión basada en plugins. Por ejemplo, `commit-commands` proporciona comandos como `/commit-commands:commit`.

```bash
# 1. Añadir ejemplo del marketplace de plugins
/plugin marketplace add anthropics/claude-code

# 2. Instalar plugin de flujo de commit
/plugin install commit-commands@anthropics-claude-code

# 3. Recargar plugins
/reload-plugins

# 4. Usar comando del plugin para commit
/commit-commands:commit
```

**Notas adicionales:**

- `/commit-commands:commit` es proporcionado por un plugin, no un comando integrado por defecto actual
- si solo necesitas inspeccionar cambios antes del commit, prefiere `/diff` o pedir a Claude que explique `git diff`
- el `/review` oficial también ha sido marcado como obsoleto; para capacidades similares, usa un plugin o flujo de revisión en lenguaje natural

### Técnica 8: Shift+Tab Auto-aceptar - Mejorar la fluidez

Por defecto, Claude pide confirmación antes de editar código. Esto es útil cuando se está aprendiendo, pero puede sentirse lento más adelante. `Shift+Tab` habilita el modo de auto-aceptación para iteración más rápida.

**Uso:**

- presiona `Shift+Tab` -> entrar en modo auto-aceptar
- presiona `Shift+Tab` de nuevo -> salir del modo auto-aceptar

**Comparación de modos:**

| Modo | Comportamiento | Escenario de uso |
|------|------|----------|
| Modo por defecto | Pedir confirmación para cada edición | Etapa de aprendizaje, código importante |
| Auto-aceptar | Aplicar ediciones directamente | Después de familiarización, iteración rápida |

**Notas:**

- En modo auto-aceptar, Claude edita archivos directamente sin segunda confirmación
- Se recomienda emparejar con Git para que la reversión sea fácil
- Para operaciones sensibles (eliminar archivos, modificar configuraciones clave), Claude sigue preguntando

### Técnica 9: Ctrl+C cancelar operación - Freno de emergencia

Cuando Claude está ejecutando una tarea larga, o te das cuenta de que diste una instrucción incorrecta, `Ctrl+C` es el freno de emergencia.

**Uso:**

- presiona `Ctrl+C` una vez -> cancelar la operación en ejecución
- presiona `Ctrl+C` dos veces -> salir completamente de Claude Code

**Casos de uso:**

- un comando de larga duración necesita interrupción
- Claude está generando código irrelevante grande
- se detectó una instrucción incorrecta y quieres parar inmediatamente

**Diferencia con doble Esc:**

- `Ctrl+C`: detener la **operación** en curso (comando en ejecución / generación de código)
- `doble Esc`: retroceder el **estado de conversación** (deshacer turno anterior)

### Técnica 10: /context verificar uso de contexto - Optimizar costo de tokens

`/context` muestra el uso de contexto de la sesión actual, ayudándote a entender el consumo de tokens y optimizar costos.

**Uso:**

```text
/context
```

**Ejemplo de salida:**

```text
📊 Uso de Contexto

Uso de tokens: 45,230 / 200,000 (22.6%)
Referencias de archivos: 12 archivos
Rondas de conversación: 8

Archivos con mayor consumo de tokens:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Sugerencias:
- El uso actual es saludable, no se necesita compresión
- Para reducir el uso, añade node_modules a .claudeignore
```

**Cómo usar esta información:**

1. **Identificar archivos grandes**: si un archivo consume muchos tokens, verifica si realmente se necesita
2. **Optimizar .claudeignore**: ignora archivos no relacionados (node_modules, salida de construcción, etc.)
3. **Decidir cuándo compactar**: cuando el uso supera el 70%, considera `/compact`

### Técnica 11: /resume restaurar sesión - Cambiar entre conversaciones multi-tarea

Cuando manejas múltiples tareas, puedes ejecutar múltiples hilos de conversación. `/resume` te permite volver al contexto de una sesión anterior en el chat actual, sin reiniciar.

**Uso:**

```text
/resume
```

**Cómo funciona:**

Claude Code registra las sesiones anteriores automáticamente. Cuando ejecutas `/resume`, cambia al contexto de la sesión anterior y mantiene todo el contenido de discusión y estado previo.

**Casos de uso:**

**Caso A: multi-tarea en paralelo**
```text
# Tarea 1: corregir bug
claude> Corregir problema de validación en página de inicio de sesión
# ... una conversación ...

# Tarea 2: añadir funcionalidad (nuevo hilo)
claude> Añadir funcionalidad de registro de usuario
# ... otra conversación ...

# Volver a la tarea 1
claude> /resume
# Continuar el trabajo anterior de corrección de bug
```

**Caso B: búsqueda temporal y volver**
```text
claude> Explica este algoritmo
# ... discutir algoritmo ...

claude> /resume
# Volver al trabajo de codificación anterior
```

**Caso C: reanudar después de interrupción**
```text
claude> Continuar trabajo anterior
# Si fuiste interrumpido antes, /resume te trae de vuelta
```

**Comparación con comandos relacionados:**

| Comando | Función | Escenario |
|------|------|----------|
| `/resume` | Volver a la sesión anterior en el chat actual | Cambio multi-tarea |
| `claude -c` | Continuar sesión más reciente | Reconectar después de salir |
| `claude -r` | Restaurar sesión anterior | Recuperar estado previo después de salir |
| `doble Esc` | Retroceder un turno | Deshacer turno de conversación más reciente |

**Sugerencias:**

1. **Gestión multi-tarea**: `/resume` es más eficiente que volver a explicar el contexto
2. **Memoria de sesión**: cada sesión tiene contexto independiente; `/resume` lo preserva
3. **Usar con /compact**: en sesiones largas, compactar primero, luego cambiar con resume para mantener el contexto limpio

---

## Configuración principal

Una configuración razonable ayuda a Claude Code a adaptarse mejor a tu proyecto y equipo. Esta sección explica el rol de la configuración, la prioridad y la optimización para diferentes escenarios de uso.

### Ubicaciones y prioridad de archivos de configuración

Claude Code usa una estrategia de configuración por capas. Diferentes niveles tienen diferente alcance y prioridad. Entender esto te permite gestionar la configuración de manera flexible.

**Prioridad de configuración (de mayor a menor):**

| Ubicación | Alcance | Propósito | Commit a Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | proyecto local | preferencias personales | ❌ no |
| `.claude/settings.json` | proyecto compartido | configuración de equipo | ✅ sí |
| `~/.claude/settings.json` | global | valores predeterminados personales | ❌ no |

**Reglas de fusión:**

- La configuración de mayor prioridad sobrescribe la misma clave en prioridad menor
- Las claves no conflictivas se fusionan
- La configuración del proyecto sobrescribe la configuración global
- La configuración personal local sobrescribe la configuración compartida del proyecto

**Escenarios prácticos:**

**Escenario 1: proyecto de equipo**
```text
~/.claude/settings.json          # configuración predeterminada personal del editor
.claude/settings.json            # estándares de codificación del equipo y configuración de permisos
.claude/settings.local.json      # preferencias de depuración y configuración de tema
```

**Escenario 2: proyecto personal**
```text
~/.claude/settings.json          # configuración predeterminada global
.claude/settings.json            # configuración específica del proyecto (ej. reglas de permisos especiales)
```

### CLAUDE.md - Memoria del proyecto

`CLAUDE.md` es el archivo más importante para la configuración de Claude Code. Actúa como un "manual" del proyecto. Cada vez que Claude Code se inicia, lee el `CLAUDE.md` del directorio actual, entendiendo el contexto, el stack tecnológico y las convenciones.

**Por qué CLAUDE.md es tan importante:**

Imagina unirte a un proyecto nuevo: necesitas aprender el stack tecnológico, las convenciones de codificación y los comandos comunes. Normalmente esto toma horas de revisar documentación/código y preguntar a compañeros. Con `CLAUDE.md`, Claude sabe esto al inicio y puedes colaborar efectivamente de inmediato.

**Plantilla mínima viable:**

```text
# [Nombre del Proyecto]

## Stack Tecnológico
- Framework: React 18 + TypeScript
- Estado: Zustand
- Estilos: Tailwind CSS
- Herramienta de construcción: Vite

## Comandos Comunes

\`\`\`bash
npm run dev      # iniciar servidor de desarrollo (puerto 5173)
npm run test     # ejecutar pruebas unitarias
npm run build    # construcción de producción
npm run lint     # verificaciones de lint
\`\`\`

## Convenciones de Código
- Componentes usan componentes funcionales + Hooks
- Nomenclatura: PascalCase (componentes), camelCase (funciones utilitarias)
- Commits de Git usan Conventional Commits
- Todas las llamadas API deben pasar por un wrapper de solicitud unificado
```

**Plantilla completa (recomendada):**

```text
# [Nombre del Proyecto]

## Descripción del Proyecto
Una frase describiendo la funcionalidad principal y los usuarios objetivo.

## Stack Tecnológico
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- Estado: Zustand + React Query
- Estilos: Tailwind CSS + Headless UI
- Construcción: Vite

### Backend (si aplica)
- Runtime: Node.js + Express
- Base de datos: PostgreSQL + Prisma
- Autenticación: JWT + bcrypt

## Estructura del Proyecto

\`\`\`
src/
├── components/      # componentes reutilizables
├── pages/           # componentes de página
├── hooks/           # Hooks personalizados
├── lib/             # funciones utilitarias
├── types/           # tipos TypeScript
└── api/             # llamadas API
\`\`\`

## Comandos Comunes

\`\`\`bash
# desarrollo
npm run dev              # iniciar servidor de desarrollo
npm run dev:mock         # usar datos mock en desarrollo

# pruebas
npm run test             # ejecutar todas las pruebas
npm run test:watch       # modo observador
npm run test:coverage    # generar informe de cobertura

# calidad de código
npm run lint             # verificación ESLint
npm run lint:fix         # auto-corregir problemas ESLint
npm run format           # formatear con Prettier
npm run typecheck        # verificación de tipos TypeScript

# construcción
npm run build            # construcción de producción
npm run preview          # previsualizar construcción de producción
\`\`\`

## Reglas de Desarrollo
### Estilo de código
- Usar componentes funcionales, evitar componentes de clase
- Preferir Hooks personalizados para abstracción de lógica
- Las props de componentes deben definir interfaces TypeScript

### Flujo de trabajo Git
- Prefijo de ramas: `feature/`, `fix/`, `refactor/`
- Los mensajes de commit siguen Conventional Commits
- Los PR deben pasar CI y revisión de código

### Requisitos de rendimiento
- Carga diferida de componentes para reducir tiempo de carga inicial
- Usar imágenes WebP y habilitar carga diferida
- Mantener tiempo de respuesta API por debajo de 200ms

## Variables de Entorno

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MiApp
\`\`\`

## Problemas Comunes

### ¿El servidor de desarrollo falló al iniciar?

Verifica si el puerto 5173 está ocupado, o prueba `npm run dev -- --port 3000`

### ¿Errores de tipos?

Ejecuta `npm run typecheck` para ver errores detallados
```

**Generación rápida de CLAUDE.md:**

Si tu proyecto existe pero no tiene `CLAUDE.md`, ejecuta `/init`:

```bash
claude
# dentro de Claude Code
/init
```

Claude analiza la estructura del proyecto, package.json y el código actual, luego genera un `CLAUDE.md` práctico. Después de la generación, revisa y ajusta manualmente.

### .claudeignore - Ahorrar tokens

`.claudeignore` le dice a Claude Code qué archivos no deben leerse en el contexto. Una configuración correcta puede reducir significativamente el uso de tokens (a menudo 40-60%) y mejorar la velocidad de respuesta.

**Por qué se necesita .claudeignore:**

Cuando Claude Code intenta entender el proyecto, lee archivos relacionados. Algunos archivos no ayudan a entender y pueden:
- consumir muchos tokens (por ejemplo archivos de definición de tipos en node_modules)
- introducir ruido (logs, salidas de construcción)
- incluir información sensible (archivos .env)

**Configuración recomendada:**

```text
# ===== dependencias =====
# código de terceros enorme, generalmente innecesario para el contexto de Claude
node_modules/
.pnp/
.pnp.js

# ===== salidas de construcción =====
# artefactos generados, no lógica fuente
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== logs =====
# logs de ejecución, sin valor para entender la arquitectura
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== salidas de pruebas =====
coverage/
.nyc_output/

# ===== editor / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== archivos del sistema =====
.DS_Store
Thumbs.db

# ===== archivos env =====
.env
.env.local
.env.*.local

# ===== activos binarios grandes =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== archivos lock (opcional) =====
# Si no necesitas que Claude analice versiones de dependencias, ignora estos
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Consejos de configuración:**

1. **Empezar mínimo**: ignora node_modules y salidas de construcción primero, luego observa el uso de tokens
2. **Ajustar por proyecto**: proyecto con muchas imágenes -> ignorar formatos de imagen; proyecto de docs -> mantener Markdown
3. **Optimizar regularmente**: usa `/context` para ver los archivos que más tokens consumen y decidir si ignorarlos

### Configuración de permisos

Por defecto, Claude Code pide confirmación antes de operaciones sensibles. A través de `permissions` en `settings.json`, puedes controlar qué acciones se auto-permiten, requieren confirmación o se deniegan completamente.

**Estructura de configuración de permisos:**

```json
{
  "permissions": {
    "allow": [
      // auto-permitir sin preguntar
    ],
    "ask": [
      // preguntar antes de ejecutar
    ],
    "deny": [
      // denegar completamente
    ]
  }
}
```

**Sintaxis de reglas:**

Las reglas de permisos usan el formato `ActionType(pattern)`:

| Tipo de acción | Descripción | Ejemplo |
|----------|------|------|
| `Bash` | ejecutar comando de terminal | `Bash(git status)` |
| `Edit` | editar archivo | `Edit(src/**/*.ts)` |
| `Read` | leer archivo | `Read(README.md)` |
| `Write` | crear archivo | `Write(src/components/*.tsx)` |

**Soporte de comodines:**

- `*` coincide con caracteres arbitrarios (excluyendo `/`)
- `**` coincide con rutas arbitrarias
- `?` coincide con un carácter

**Ejemplo de configuración real:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**Sugerencias de configuración:**

1. **Etapa de desarrollo**: permisos relativamente relajados para iteración más rápida
2. **Etapa de producción**: permisos más estrictos, especialmente para despliegue y operaciones con datos sensibles
3. **Colaboración en equipo**: colocar reglas base en `settings.json` compartido, ajustes personales en `settings.local.json`

### Directorio de reglas

Para proyectos grandes, un solo `CLAUDE.md` puede volverse inflado y difícil de mantener. Claude Code soporta gestión modular a través del **Directorio de reglas**, dividiendo las convenciones por tema en archivos separados.

**Estructura del directorio:**

```text
.claude/
├── settings.json          # archivo de configuración principal
├── CLAUDE.md              # descripción general del proyecto (aún necesario)
└── rules/                 # directorio de reglas
    ├── 00-security.md     # reglas de seguridad (global)
    ├── 01-coding-style.md # reglas de estilo de código (global)
    ├── 10-api.md          # reglas de desarrollo de API
    ├── 11-frontend.md     # reglas de desarrollo frontend
    ├── 12-backend.md      # reglas de desarrollo backend
    └── 20-testing.md      # reglas de pruebas
```

**Sugerencia de nomenclatura:**

Usa prefijos numéricos (`00-`, `01-`) para controlar el orden de carga: reglas base primero, reglas específicas después.

**Formato de archivo de reglas:**

Los archivos de reglas soportan frontmatter YAML para definir aplicabilidad:

```markdown
---
# Opcional: rutas donde esta regla aplica
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Opcional: comandos donde esta regla aplica
commands:
  - "generate api"
  - "create endpoint"

# Opcional: prioridad de regla (número menor = mayor prioridad)
priority: 10
---

# Reglas de Desarrollo de API

## Diseño de rutas
- Estilo RESTful, usar sustantivos en plural
- Versionado: /api/v1/users
- Recursos anidados: /api/v1/users/123/orders

## Formato de solicitud/respuesta
- Usar JSON consistentemente
- La respuesta de error debe incluir código y mensaje
- La respuesta paginada usa estructura { data, pagination }

## Requisitos de seguridad
- Todos los endpoints deben verificar autenticación (excepto endpoints públicos)
- Operaciones sensibles requieren confirmación secundaria
- Implementar rate limiting para prevenir abuso
```

**Herencia y sobrescritura de reglas:**

- Las reglas globales (sin frontmatter o `globs: *`) aplican a todos los archivos
- Las reglas específicas de ruta aplican solo a los archivos coincidentes
- Si las reglas entran en conflicto, la regla de mayor prioridad gana
- Las reglas específicas pueden sobrescribir las reglas globales

**Ejemplos de escenarios de uso:**

**Escenario 1: proyecto separado frontend-backend**
```text
.claude/rules/
├── 00-general.md          # estándares generales (mensaje de commit, nomenclatura)
├── 10-backend.md          # estándares backend (específico de NestJS)
├── 11-frontend.md         # estándares frontend (específico de React)
└── 20-database.md         # estándares de base de datos (específico de Prisma)
```

**Escenario 2: arquitectura de microservicios**
```text
.claude/rules/
├── 00-global/             # reglas globales
│   ├── security.md
│   └── logging.md
├── 10-services/           # reglas específicas por servicio
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # reglas de componentes compartidos
    ├── shared-lib.md
    └── common-utils.md
```

**Recomendación de migración:**

Si ya tienes un `CLAUDE.md` muy grande, migra al Directorio de reglas así:

1. Crea `.claude/rules/`
2. Divide `CLAUDE.md` por tema
3. Añade frontmatter adecuado a cada archivo de reglas
4. Mantén `CLAUDE.md` como descripción general del proyecto y mueve los estándares detallados
5. Prueba y asegúrate de que la carga de reglas funciona correctamente

---

## Comandos de operación principales

Claude Code proporciona un conjunto rico de comandos operativos para colaboración eficiente con IA. Estos comandos se dividen en categorías: comandos Slash (funciones integradas), sistema de símbolos (operaciones cortas) e instrucciones de lenguaje natural (desarrollo diario).

### Referencia rápida de comandos Slash

Los comandos Slash son operaciones integradas que comienzan con `/`. Proporcionan acciones estandarizadas como inicialización de proyecto, gestión de configuración y verificación de estado.

| Comando | Función | Escenario de uso |
|------|------|----------|
| `/help` | Mostrar todos los comandos | búsqueda rápida cuando olvidas comandos |
| `/init` | Inicializar proyecto y generar CLAUDE.md | proyecto nuevo o añadir configuración |
| `/plan` | Entrar en modo de planificación | crear plan antes de tareas complejas |
| `/clear` | Limpiar historial de conversación | reiniciar cuando el contexto está desordenado |
| `/compact` | Comprimir contexto | ahorrar tokens después de chat largo |
| `/diff` | Abrir vista diff interactiva | inspeccionar cambios no confirmados actuales |
| `/plugin` | Gestionar plugins | instalar extensiones de commit/review |
| `/context` | Mostrar uso de contexto | optimizar costo de tokens |
| `/cost` | Mostrar costo de sesión | monitorear costo de uso |
| `/config` | Abrir panel de configuración | actualizar ajustes |
| `/permissions` | Gestión de permisos | ajustar permisos de operación |
| `/model` | Cambiar modelo | elegir diferentes modelos |

**Ejemplo de combinación de comandos:**

```bash
# flujo de trabajo de desarrollo completo
/plan                    # 1. crear plan
# ... ejecutar desarrollo ...
/diff                    # 2. inspeccionar cambios
Genera un mensaje de commit a partir del diff actual
!git add -A              # 3. stage cambios
!git commit -m "..."     # 4. commit
/cost                    # 5. verificar costo
```

### Sistema de símbolos

El sistema de símbolos es el mecanismo de operación abreviada de Claude Code. Los símbolos especiales activan rápidamente capacidades específicas.

| Símbolo | Nombre | Propósito | Ejemplo |
|------|------|------|------|
| `/` | Comando Slash | ejecutar operación integrada | `/help`, `/plan` |
| `@` | Referencia At | referenciar archivo/directorio | `@src/app.tsx` |
| `!` | Modo Bang | ejecutar comando de terminal | `!npm test` |
| `&` | Ejecución en segundo plano | ejecutar tarea en segundo plano | `&npm run dev` |

**Consejos de combinación de símbolos:**

```bash
# combinar símbolos
@src/utils.ts !npm test
# significa: leer utils.ts, luego ejecutar pruebas

@src/components/ @src/pages/ compara estructuras de estos dos directorios
# significa: referenciar dos directorios simultáneamente para comparación

!git diff @src/app.tsx explica estos cambios
# significa: inspeccionar Git diff y pedir a Claude que explique cambios en archivo específico
```

### Operaciones de archivos

Las operaciones de archivos son las acciones diarias más comunes: leer, editar, crear y eliminar archivos.

**Leer archivos:**

```bash
# lectura básica
@src/app.tsx explica este archivo

# leer + analizar
@src/utils/helpers.ts encuentra posibles problemas de rendimiento

# lectura comparativa
@src/components/OldButton.tsx @src/components/NewButton.tsx compara diferencias
```

**Editar archivos:**

```bash
# edición simple
Modifica formatDate en src/utils/date.ts para soportar formato de local español

# edición compleja
@src/api/users.ts Refactoriza este archivo:
1. Extraer manejo de errores duplicado en handleError compartido
2. Reemplazar cadenas Promise con async/await
3. Añadir comentarios JSDoc

# edición por lotes
Convertir todos los componentes de clase bajo src/components/ en componentes funcionales
```

**Crear archivos:**

```bash
# crear un archivo
Crea src/components/UserCard.tsx, un componente de tarjeta para mostrar información de usuario

# crear archivos relacionados
Crear módulo de usuario:
1. src/types/user.ts - definir interfaz User
2. src/api/users.ts - llamadas API de usuario
3. src/components/UserCard.tsx - componente de tarjeta de usuario
4. src/hooks/useUser.ts - hook para obtener datos de usuario
```

**Eliminar archivos:**

```bash
# eliminar con confirmación
Eliminar src/old-component.tsx (este componente ya no se usa)

# Claude pide confirmación y puede sugerir verificar referencias primero
```

### Operaciones Git

Claude Code se integra profundamente con Git para que puedas completar el flujo completo de control de versiones sin salir de la terminal.

**Verificar estado:**

```bash
# mostrar estado Git
Mostrar git status y cambios no confirmados

# diff detallado
!git diff
Explica cambios en src/api/users.ts
```

**Crear commits:**

```bash
# inspeccionar cambios
/diff

# generar mensaje de commit
Genera un mensaje Conventional Commit a partir del git diff actual

# commit manual
!git add -A
!git commit -m "..."
```

**Operaciones de ramas:**

```bash
# crear rama de feature
!git checkout -b feature/user-authentication

# después de implementar
Genera mensaje de commit basado en cambios actuales
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Ejemplo completo de flujo Git:**

```bash
# 1. iniciar nueva funcionalidad
!git checkout -b feature/payment-integration

# 2. desarrollar funcionalidad (con asistencia de Claude)
Crear módulo de pagos con Alipay y WeChat Pay

# 3. ejecutar pruebas
!npm test

# 4. inspeccionar cambios
/diff

# 5. generar y confirmar mensaje de commit
Genera un mensaje Conventional Commit a partir del git diff actual
!git add -A
!git commit -m "..."

# 6. push al remoto
!git push -u origin feature/payment-integration

# 7. crear PR (opcional, con GitHub CLI)
!gh pr create --title "feat: añadir integración de pagos" --body "Soporte Alipay y WeChat Pay"
```

### Operaciones de código

Las operaciones de código son las fortalezas principales de Claude Code: generación, explicación, refactorización y optimización.

**Generar código:**

```bash
# generar componente
Crea un Hook de React para gestionar estado de autenticación, incluyendo login/logout/verificación de permisos

# generar función utilitaria
Crea una utilidad de formateo de fechas que soporte tiempo relativo (ej. "hace 2 horas")

# generar módulo completo
Crear módulo de pedidos con:
- página de lista de pedidos
- página de detalle de pedido
- API de creación de pedido
- gestión de estado de pedido
```

**Explicar código:**

```bash
# explicación línea por línea
Explica src/algorithms/quicksort.ts línea por línea

# explicación de alto nivel
@src/services/payment.ts explica el diseño de arquitectura de este módulo

# explicar lógica compleja
Explica qué hace el reduce en src/utils/dataTransformer.ts
```

**Refactorizar código:**

```bash
# refactorización de arquitectura
Convertir componentes de clase en src/components/ a componentes funcionales

# refactorización de rendimiento
Optimizar rendimiento de renderizado en src/App.tsx, reducir re-renderizados innecesarios

# refactorización de limpieza
@src/utils/helpers.ts Refactoriza este archivo:
1. Eliminar funciones no usadas
2. Extraer lógica repetida en utilidades compartidas
3. Añadir definiciones de tipos
4. Mejorar nomenclatura de funciones
```

**Depurar código:**

```bash
# análisis de errores
npm test falló, analiza la causa raíz y arréglalo

# análisis de rendimiento
@src/components/DataTable.tsx Este componente renderiza lentamente, encuentra cuellos de botella

# análisis de logs
!cat logs/error.log
Analiza estos logs de error e identifica la causa raíz
```

### Operaciones de pruebas

Las pruebas son esenciales para el aseguramiento de calidad. Claude Code puede ayudar a generar pruebas, ejecutarlas y analizar resultados.

**Generar pruebas:**

```bash
# pruebas unitarias
Genera pruebas unitarias para src/utils/math.ts, incluyendo casos límite

# pruebas de componentes
Genera pruebas React Testing Library para src/components/UserForm.tsx

# pruebas de integración
Crea prueba de integración para flujo de registro de usuario desde envío de formulario hasta escritura en BD
```

**Ejecutar y depurar pruebas:**

```bash
# ejecutar pruebas
!npm test

# depurar pruebas fallidas
Analiza razones de fallo y corrige
@tests/auth.test.ts

# verificar cobertura
!npm run test:coverage
¿Qué rutas de código no están cubiertas?
```

**Sugerencia de estrategia de pruebas:**

```bash
Añadí autenticación de usuarios. Por favor:
1. Genera pruebas unitarias para auth.service.ts
2. Genera pruebas de componentes para LoginForm
3. Ejecuta todas las pruebas y asegúrate de que pasen
```

### Encadenamiento de comandos y composición de flujos de trabajo

La forma más eficiente de usar Claude Code es encadenar comandos en flujos de trabajo completos.

**Escenario 1: flujo de corrección de bugs**

```bash
# 1. inspeccionar problema
!npm test
Las pruebas fallaron, analiza por qué

# 2. localizar problema
@src/utils/validation.ts ¿Está el problema en este archivo?

# 3. corregir problema
Corrige isEmail en validation.ts para manejar correctamente direcciones que contienen +

# 4. verificar corrección
!npm test

# 5. commit de la corrección
Genera un mensaje de commit tipo fix a partir del diff actual
!git add -A
!git commit -m "fix: ..."
```

**Escenario 2: flujo de revisión de código**

```bash
# 1. inspeccionar cambios
!git diff --stat
¿Qué archivos cambiaron?

# 2. revisión detallada
@src/components/ Revisa estos cambios de componentes

# 3. sugerir mejoras
¿Qué mejoras deberían hacerse basándose en esta revisión?

# 4. implementar mejoras
Optimizar rendimiento del componente UserList

# 5. revisión final
/diff
Revisa cambios actuales y señala riesgos potenciales y mejoras
```

**Escenario 3: flujo de nueva funcionalidad**

```bash
# 1. planificar primero
/plan
Quiero añadir funcionalidad de carrito de compras

# 2. crear rama
!git checkout -b feature/shopping-cart

# 3. implementar funcionalidad
Implementar paso a paso según el plan

# 4. añadir pruebas
Genera pruebas para el módulo de carrito de compras

# 5. ejecutar pruebas
!npm test

# 6. revisión de código
/diff
Por favor haz una revisión de código del diff actual

# 7. commit
Genera mensaje de commit para este desarrollo de funcionalidad
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Preguntas frecuentes

Mientras usas Claude Code, puedes encontrar varios problemas. Esta sección resume problemas comunes y soluciones.

### ¿El uso de tokens es demasiado rápido?

El consumo rápido de tokens es uno de los problemas más comunes. A continuación se presenta una estrategia de optimización completa.

**Diagnóstico:**

Primero ejecuta `/context` para inspeccionar el uso actual de tokens:

```text
/context
```

Enfócate en:
- **Tasa de uso de tokens**: si supera el 70%, considera compresión de contexto
- **Número de archivos referenciados**: más archivos significa mayor consumo de tokens
- **Archivos grandes**: verifica qué archivos consumen más tokens

**Estrategia de optimización:**

**1. Mejorar .claudeignore**

Asegúrate de que `.claudeignore` incluya archivos innecesarios:

```text
# debe ignorar
node_modules/
dist/
build/
*.log
.env

# específico del proyecto
# React
.next/
out/

# Vue
.nuxt/
.output/

# genérico
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Comprimir contexto regularmente**

Las conversaciones largas acumulan muchos tokens. Se recomienda ejecutar `/compact` cada 5-6 rondas:

```text
# después de una conversación larga
/compact

# continuar
Ahora implementemos el módulo de pedidos...
```

**3. Referenciar archivos con precisión**

Evita referenciar un directorio completo si no es necesario:

```bash
# no recomendado
@src/ Explica este código

# recomendado
@src/utils/auth.ts @src/components/Login.tsx Explica el flujo de inicio de sesión
```

**4. Evitar leer archivos enormes**

Si `/context` muestra que un archivo consume muchos tokens, considera:
- ¿realmente lo necesitas?
- ¿puedes referenciar solo una sección?
- ¿puede este archivo dividirse en módulos más pequeños?

### ¿Claude no entiende el proyecto?

Si Claude responde de forma inexacta o pregunta repetidamente información básica del proyecto, le falta contexto del proyecto.

**Soluciones:**

**1. Generar CLAUDE.md**

Ejecuta `/init` para generar la configuración del proyecto:

```bash
/init
```

Después de la generación, valida:
- ¿es precisa la descripción del proyecto?
- ¿está completo el stack tecnológico?
- ¿son correctos los comandos comunes?
- ¿son claras las convenciones de codificación?

**2. Editar CLAUDE.md manualmente**

Si la configuración auto-generada no es lo suficientemente detallada, añade:

```markdown
## Información específica del proyecto

### Decisiones de arquitectura
- ¿Por qué elegir X sobre Y?
- ¿Cuáles son los patrones de diseño principales?

### Problemas comunes
- Al usar useEffect, ten cuidado con...
- Las consultas BD deben...

### Integraciones de terceros
- Pagos vía Stripe
- Email vía SendGrid
- Almacenamiento de archivos vía AWS S3
```

**3. Usar Directorio de reglas**

Para proyectos grandes, organiza las convenciones en Rules:

```text
.claude/rules/
├── 00-architecture.md    # descripción de arquitectura
├── 01-coding-style.md    # estilo de código
├── 10-frontend.md        # reglas frontend
├── 11-backend.md         # reglas backend
└── 20-testing.md         # reglas de pruebas
```

**4. Añadir contexto en el prompt cuando sea necesario**

Para tareas específicas, añade contexto relevante:

```text
Usamos un Hook useAuth personalizado para autenticación.
Devuelve { user, login, logout, isLoading }.
Por favor construye un componente de menú de usuario basado en este Hook.
```

### ¿Cómo deshacer operaciones?

Claude Code proporciona múltiples mecanismos de reversión para diferentes escenarios.

**Escenario 1: retroceder estado de conversación**

Si solo cometiste un error de tipeo o no te gusta la respuesta:

```text
Doble Esc  -> retroceder turno anterior
Triple Esc  -> limpiar todo el historial de conversación
```

**Nota**: esto solo retrocede el estado de conversación, no las ediciones de archivos.

**Escenario 2: deshacer ediciones de archivos**

Si Claude ya modificó archivos, deshazlo manualmente:

```bash
# verificar cambios
!git status
!git diff

# revertir un archivo
git checkout -- src/utils/helpers.ts

# revertir todos los cambios del árbol de trabajo
git checkout -- .

# si ya se hizo commit
# reversión suave (mantener cambios)
git reset --soft HEAD~1

# reversión dura (descartar cambios)
git reset --hard HEAD~1
```

**Escenario 3: usar preventivamente el flujo de trabajo Git**

Mejor práctica: guardar el trabajo actual antes de la sesión con Claude:

```bash
# guardar estado actual antes de empezar
git add .
git commit -m "WIP: antes de sesión con Claude Code"
# o usar stash
git stash push -m "antes de claude"

# desarrollar con Claude Code...

# si el resultado no es satisfactorio, reversión completa
git reset --hard HEAD~1
# o
git stash pop
```

### ¿Demasiados prompts de permisos?

Las confirmaciones de permisos frecuentes afectan la eficiencia. Una configuración de permisos adecuada puede hacer el flujo de trabajo más fluido.

**Modelo de permisos:**

Los permisos de Claude Code son tres niveles:
- **allow**: auto-permitir
- **ask**: preguntar antes de ejecutar
- **deny**: denegar completamente

**Configuración de optimización:**

Edita `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // operaciones de lectura Git
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // pruebas y verificaciones
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // servidor de desarrollo
      "Bash(npm run dev:*)",

      // ediciones de fuente
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // operaciones de escritura Git
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // gestión de paquetes
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // construcción y despliegue
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // ediciones de archivos de configuración
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // lectura de archivos sensibles
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // comandos peligrosos
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // archivos del sistema
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // internos de Git
      "Edit(.git/*)"
    ]
  }
}
```

**Estrategia de permisos progresiva:**

- **Fase de aprendizaje**: mantener valores predeterminados y entender qué intenta ejecutar Claude
- **Fase de familiarización**: añadir operaciones seguras comunes (como git status, npm test) a allow
- **Fase de alta eficiencia**: crear reglas detalladas basadas en las características del proyecto

### ¿Cómo usar en China continental?

Debido a restricciones de red, los usuarios en China pueden no acceder directamente a los servicios oficiales de Anthropic. Aquí hay varias opciones.

**Opción 1: usar servicio proxy de API**

Muchos proveedores de la nube ofrecen servicios proxy de API compatibles con Anthropic:

```bash
# configurar variables de entorno
export ANTHROPIC_BASE_URL="https://tu-api-proxy.com/v1"
export ANTHROPIC_API_KEY="tu-api-key"

# iniciar Claude Code
claude
```

**Opción 2: usar herramientas compatibles con Claude Code de terceros**

Algunos proveedores nacionales ofrecen herramientas compatibles:

```bash
# instalar versión compatible
npm install -g @algun-proveedor/claude-code

# configurar clave API
claude config set api.key tu-api-key
claude config set api.baseUrl https://api.algun-proveedor.com
```

**Opción 3: usar otras herramientas de codificación con IA**

Si Claude Code no está disponible, considera alternativas:

| Herramienta | Características | Escenario de uso |
|------|------|----------|
| Cursor | Basado en VS Code, con todas las funciones | experiencia IDE completa |
| GitHub Copilot | autocompletado potente | principalmente completado de código |
| Tongyi Lingma | producto nacional, estable en China | entorno de desarrollo nacional |
| Codeium | cuota gratuita generosa | con presupuesto limitado |

**Opción 4: dejar que un Agente de IA ayude a configurar**

Si no estás seguro de cómo configurar, pregunta a un Agente de IA:

```text
Quiero usar Claude Code, pero no puedo acceder directamente en China continental.
Compré una API del proveedor XXX.
El endpoint de API es https://api.xxx.com,
la clave es sk-xxx.

Por favor configura las variables de entorno para que Claude Code funcione correctamente.
```

**Preguntas comunes:**

- **P: ¿todavía no se puede conectar después de la configuración?**
  - R: verifica la corrección del endpoint API, incluyendo la ruta `/v1`
  - R: verifica la validez de la clave API y el saldo
  - R: verifica si la red local necesita proxy

- **P: ¿la respuesta es lenta?**
  - R: elige un proveedor con región geográfica más cercana
  - R: usa un plan optimizado para codificación en lugar de un plan API genérico
  - R: usa `/compact` para reducir el uso de tokens

- **P: ¿algunas funciones no están disponibles?**
  - R: algunos proveedores externos pueden no soportar completamente todas las funciones de Claude Code
  - R: consulta la documentación del proveedor para el alcance de funciones soportadas

---

## Recursos de referencia

- [Documentación oficial de Claude Code](https://code.claude.com/docs)
- [GitHub de Claude Code](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
