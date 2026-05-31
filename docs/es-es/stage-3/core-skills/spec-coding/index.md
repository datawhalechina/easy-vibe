# De Vibe Coding a Spec Coding: La Evolución de la Programación con IA

> "El código es una proyección con pérdida de la intención."
> Code is a lossy projection of intent.
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## La Idea Central de Spec Coding: Todo Es Markdown

Antes de profundizar en Spec Coding, primero entiende la filosofía subyacente de Claude Code: **todo es Markdown**.

En la filosofía de diseño de Claude Code, registros de proceso, transferencia de información e incluso las conversaciones con el modelo pueden ser Markdown:

- **CLAUDE.md**: un documento Markdown para convenciones del proyecto
- **.claude/rules/**: una colección de archivos de reglas Markdown en capas
- **specs/**: descripciones Markdown de requisitos de funciones
- **Historial de conversaciones**: los registros de chat de Claude Code están en formato Markdown
- **AGENTS.md**: instrucciones Markdown que definen el comportamiento del agente

Esto es exactamente el núcleo de Spec Coding: **la especificación misma es código**. Cuando escribes requisitos, decisiones de diseño y criterios de aceptación en Markdown, ya estás escribiendo "código" - la IA leerá ese Markdown y luego generará la implementación real.

El resumen de Josh Beckman de la charla de Grove lo captura perfectamente:

> "La ingeniería de software (y la legislación y la revisión legal) es reparación de especificaciones."
> Software engineering (and lawmaking and legal review) is specification repair.

En Claude Code, este proceso de "reparación de especificaciones" es: **modificar Markdown -> la IA lee Markdown -> generar/modificar código -> verificar el resultado**. Todo el flujo de trabajo está impulsado por Markdown.

---

## 1. "The New Code" de Sean Grove: Una Charla Que Cambia Tu Forma de Pensar

En 2025, el investigador de OpenAI **Sean Grove** dio una charla titulada **"The New Code"** en AI Engineer World's Fair, y sacudió a toda la comunidad de desarrolladores. Propuso una idea disruptiva: **durante 70 años hemos estado escribiendo código para resolver problemas, pero el código es solo una proyección con pérdidas de la intención - las especificaciones son el verdadero "nuevo código".**

Esa charla dio origen a un nuevo paradigma de desarrollo: **Spec Coding** - hacer que los documentos de especificación, en lugar del código, sean el artefacto central del desarrollo, y dejar que la IA genere código a partir de la especificación.

Comenzando desde la charla de Grove, este artículo te ayudará a entender las ideas centrales de Spec Coding, revisar los límites del Vibe Coding y mostrar cómo aplicar esta metodología en desarrollo real con Claude Code.

::: info 📚 Lo que aprenderás

1. Entender las ideas clave de la charla "The New Code" de Sean Grove
2. Dominar los conceptos centrales y la metodología de Spec Coding
3. Reconocer tanto el valor como el techo del Vibe Coding
4. Aprender cómo practicar un flujo de trabajo de Spec Coding en Claude Code
5. Dominar una estrategia gradual de transición de Vibe Coding a Spec Coding

:::

---

## 1. "The New Code" de Sean Grove: Una Charla Que Cambia Tu Forma de Pensar

En 2025, el investigador de OpenAI Sean Grove dio una charla titulada **"The New Code"** en AI Engineer World's Fair. Esta charla es ampliamente considerada como el punto de partida intelectual del movimiento Spec Coding.

Grove previamente fundó OneGraph, una empresa de herramientas de desarrolladores GraphQL que fue adquirida más tarde por Netlify, y ahora trabaja en razonamiento de alineación en OpenAI - ayudando a convertir intenciones de alto nivel en especificaciones ejecutables y estándares de evaluación.

### 1.1 Argumento Central: El Código Es una Proyección con Pérdidas de la Intención

El concepto central de la charla de Grove puede resumirse en una oración:

> **El código es una proyección con pérdidas de la intención.**
> Code is a lossy projection of intent.

¿Qué significa eso? Cuando tienes una idea en tu cabeza y la conviertes en código, una enorme cantidad de contexto se pierde en el camino - **por qué** elegiste este enfoque, **qué compromisos** consideraste y **qué restricciones** importaban. El código final solo preserva "cómo hacerlo", mientras pierde "por qué debería hacerse de esta manera."

Es como comprimir un libro en un tuit - la densidad de información cae bruscamente, y la intención original se degrada fuertemente.

### 1.2 La Esencia de la Programación Es Comunicación

Grove propuso una idea simple pero profunda:

> "Si puedes comunicarte efectivamente, puedes programar."
> If you can communicate effectively, you can program.

Argumenta que el trabajo real de codificación solo representa **10-20%** del desarrollo. El otro 80% es **comunicación estructurada** alrededor de requisitos y objetivos - entender lo que quieren los usuarios, alinearse con el equipo en soluciones, definir criterios de aceptación y manejar casos extremos.

Eso significa que el núcleo de la capacidad de programación no es el dominio de la sintaxis de un lenguaje particular, sino la capacidad de **convertir intenciones vagas en descripciones precisas**.

### 1.3 Quien Escribe la Especificación Es el Programador

Esta es la idea más disruptiva de Grove:

> "Quien escribe la especificación - sea un PM, un legislador, un ingeniero, un marketer - es ahora el programador."
> Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer.

A medida que la IA se vuelve cada vez mejor convirtiendo especificaciones en código, el **verdadero trabajo de programación** se desplaza de "escribir código" a "escribir especificaciones." Quien pueda expresar la intención más precisamente se convierte en el "programador" más valioso.

### 1.4 Las Especificaciones Pueden Tener una Cadena de Herramientas Similar al Código

Grove señaló que las especificaciones pueden tener una cadena de herramientas completa igual que el código:

> "Las especificaciones realmente nos dan una cadena de herramientas muy similar, pero está dirigida a intenciones en lugar de sintaxis."

- **Composición**: las especificaciones pueden ser modulares y componibles, como módulos de código
- **Testing**: las especificaciones pueden embeber pruebas unitarias para verificar que el comportamiento coincide con las expectativas
- **Linting**: el lenguaje ambiguo en las especificaciones puede detectarse, igual que un linter captura problemas de sintaxis
- **Verificaciones de consistencia**: las especificaciones entre departamentos pueden verificarse por consistencia, similar a un verificador de tipos

### 1.5 Model Spec de OpenAI: Evidencia Viviente

Grove usó el propio documento **Model Spec** de OpenAI como evidencia.

Cuando OpenAI descubrió un problema de servilismo, no re-entrenaron el modelo. En cambio, **modificaron el documento de especificación**. El cambio se propagó automáticamente por todo el sistema, y el problema fue corregido.

Esto prueba un punto crucial: **la especificación misma puede actuar como código ejecutable**. Cambiar la especificación es equivalente a cambiar el comportamiento, sin tocar una sola línea de código tradicional.

El resumen de Josh Beckman de la charla de Grove lo captura perfectamente:

> "La ingeniería de software (y la legislación y la revisión legal) es reparación de especificaciones."
> Software engineering (and lawmaking and legal review) is specification repair.

---

## 2. Spec Coding: La Especificación como Código

### 2.1 Qué Es Spec Coding

Spec Coding, también llamado Spec-Driven Development (SDD), es una metodología que trata los **documentos de especificación como el artefacto central del desarrollo**.

La idea central es: **escribir la especificación claramente primero, luego dejar que la IA genere código a partir de esa especificación. La especificación es la fuente de verdad, y el código es solo el artefacto de implementación derivado de ella.**

La declaración clásica de Robert C. Martin de *Clean Code* se vuelve recién relevante en la era de la IA:

> "Especificar requisitos tan precisamente que una máquina pueda ejecutarlos es programar."
> Specifying requirements so precisely that a machine can execute them is programming.

### 2.2 Comparando Vibe Coding y Spec Coding

| Dimensión | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **Enfoque** | Prompts improvisados, iteración de ida y vuelta | Escribir una especificación completa primero, luego generar código |
| **Mejor para** | Prototipos, hackathons, exploración | Sistemas en producción, colaboración en equipo, trabajo empresarial |
| **Calidad del código** | Rápido pero frágil | Estructurado, testeable, auditable |
| **Tasa de éxito al primer intento** | Inestable | Apunta a 95%+ |
| **Reutilizabilidad** | Prompts de un solo uso | Las especificaciones pueden reutilizarse entre proyectos |
| **Seguridad** | Fácil pasar cosas por alto | Incorporada en la capa de especificación |
| **Documentación** | Ausente o siempre rezagada | La especificación es la documentación y se mantiene actualizada |
| **Colaboración en equipo** | Depende de la habilidad individual de prompting | Especificaciones compartidas, estándares compartidos |

Los dos no son opuestos. Como señala Brad Jolicoeur:

> "Los ingenieros astutos incluso usarán vibe coding como primer paso para generar el borrador inicial de una especificación."
> Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification.

### 2.3 La Estructura de Especificación de Tres Capas de Spec Coding

Los ingenieros de Red Hat resumieron un modelo práctico de especificación de tres capas:

**Capa 1: Especificación Funcional (Qué)**

Describe el resultado esperado en lenguaje natural y responde "qué debería hacer":

```markdown
## Función de Autenticación de Usuario

### Historias de Usuario
- Como usuario nuevo, quiero registrarme con mi email
- Como usuario registrado, quiero iniciar sesión con email y contraseña
- Como usuario que olvidó su contraseña, quiero restablecerla por email

### Criterios de Aceptación
- Validar formato de email y fortaleza de contraseña durante el registro
- Bloquear la cuenta por 15 minutos después de 5 intentos de login fallidos
- Los enlaces de restablecimiento de contraseña son válidos por 30 minutos
```

**Capa 2: Especificación Independiente del Lenguaje (Cómo - Capa de Arquitectura)**

Define estructuras de datos, patrones arquitectónicos y requisitos de seguridad:

```markdown
## Diseño Técnico

### Modelo de Datos
- tabla users: id, email, password_hash, created_at, locked_until
- tabla sessions: id, user_id, token, expires_at

### Diseño de API
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### Requisitos de Seguridad
- Las contraseñas usan bcrypt con factor de costo >= 12
- JWT expira en 15 minutos, refresh token en 7 días
- Habilitar rate limiting en todos los endpoints
```

**Capa 3: Especificación Específica del Lenguaje (Cómo - Capa de Implementación)**

Requisitos de versión, framework de pruebas y estándares de documentación:

```markdown
## Restricciones de Implementación

### Stack Tecnológico
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### Convenciones de Código
- Usar TypeScript en modo estricto
- Usar una clase AppError personalizada para manejo de errores
- Todos los endpoints de API requieren comentarios JSDoc
```

---

## 3. Practicar Spec Coding en Claude Code

Una vez que entiendes la teoría, la siguiente pregunta es cómo aplicarla en Claude Code. La filosofía de diseño de Claude Code encaja naturalmente con Spec Coding - su `CLAUDE.md`, directorio Rules y comando `/plan` son todas formas de desarrollo impulsado por especificaciones.

Cuando OpenAI mismo construye proyectos con Codex, usa un patrón similar: usando un archivo `AGENTS.md` como especificación para guiar al agente de IA. Su lección central es esta: **cuando el agente tiene dificultades, trata eso como una señal - identifica qué falta, ya sean herramientas, barreras de protección o documentación, y luego añádelo al repositorio**. Eso se alinea perfectamente con Spec Coding: las especificaciones son artefactos vivos y deben seguir evolucionando.

La investigación de Augment Code respalda la misma conclusión: **las especificaciones ejecutables se mantienen precisas porque los agentes de IA generan código directamente a partir de ellas, creando una función forzada - especificaciones desactualizadas producen implementaciones rotas**. Eso significa que las especificaciones no se pudren como lo hace la documentación tradicional.

### 3.1 Paso Uno: Usar `CLAUDE.md` para Establecer Especificaciones del Proyecto

`CLAUDE.md` es la "especificación viva" de tu proyecto. Cada vez que Claude Code se inicia, lee este archivo, lo cual es equivalente a darle a la IA un manual persistente del proyecto.

En el capítulo anterior [Guía Central de Inicio Rápido de Claude Code](../basics/), ya aprendimos cómo crear `CLAUDE.md`. En el contexto de Spec Coding, su rol se vuelve aún más importante - **no es solo un archivo de configuración, sino el punto de entrada a la especificación del proyecto**.

Los ingenieros de LogRocket enfatizan que **el contexto sólido es crucial para los agentes de IA porque previene alucinaciones e ineficiencia**. Sin especificaciones, un agente de IA puede hacer cambios grandes y descontrolados a un proyecto. `CLAUDE.md` es la primera línea de defensa que proporciona ese "contexto sólido."

```markdown
# Especificación de Proyecto E-commerce

## Posicionamiento del Proyecto
Una plataforma e-commerce SaaS para comerciantes pequeños y medianos, soportando múltiples tiendas y múltiples canales de pago.

## Decisiones Arquitectónicas
- Separación frontend-backend con diseño API-first
- Arquitectura backend de microservicios, con servicios comunicándose a través de una cola de mensajes
- Separación de base de datos lectura-escritura

## Restricciones Centrales
- Almacenar todos los montos monetarios como enteros en centavos para evitar problemas de precisión de punto flotante
- La máquina de estados de pedidos debe seguir estrictamente: pendiente de pago -> pagado -> enviado -> completado
- Los endpoints relacionados con pagos deben ser idempotentes
```

El equipo de Aviator resumió la información clave que las especificaciones deben capturar - y eso es exactamente lo que tu `CLAUDE.md` debería cubrir:

- formatos de entrada y salida y tipos de datos
- reglas de negocio y casos extremos
- dependencias del sistema y restricciones
- requisitos de rendimiento y escalabilidad
- manejo de errores y requisitos de seguridad

### 3.2 Paso Dos: Usar el Directorio Rules para Gestionar Especificaciones en Capas

A medida que tu proyecto crece, un solo `CLAUDE.md` no será suficiente. En ese punto, usa el directorio `.claude/rules/` para organizar especificaciones en capas.

Esto es exactamente lo que Augment Code llama la idea de "especificaciones ejecutables": **las especificaciones no son documentos estáticos, sino instrucciones vivas consumidas directamente por agentes de IA**. Cuando divides reglas en el directorio Rules, cada archivo de reglas se carga solo cuando se están editando archivos relacionados, lo cual ahorra tokens y preserva la precisión.

Los ingenieros de Tessl encontraron que dividir los requisitos en documentos estructurados - con un PRD definiendo "qué y por qué" y especificaciones técnicas definiendo "cómo" - ayuda a prevenir que la IA acumule confusión en conversaciones largas y mejora significativamente la consistencia de la salida.

```text
.claude/rules/
├── 00-architecture.md      # Reglas de arquitectura (global)
├── 01-security.md          # Reglas de seguridad (global)
├── 10-api-design.md        # Reglas de diseño de API
├── 11-frontend-patterns.md # Reglas de patrones frontend
├── 12-database.md          # Reglas de base de datos
└── 20-testing.md           # Reglas de testing
```

Cada archivo de reglas puede especificar su alcance a través de frontmatter:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# Reglas de Diseño de API

## Diseño de Rutas
- Estilo RESTful, usar sustantivos en plural: /api/v1/orders
- Recursos anidados pueden ir como máximo dos niveles de profundidad: /api/v1/users/123/orders

## Formato de Respuesta
- Éxito: { data, pagination? }
- Error: { error: { code, message, details? } }

## Debe Seguir
- Todas las operaciones de escritura requieren autenticación
- Todos los endpoints de lista deben soportar paginación
- Operaciones sensibles deben escribir logs de auditoría
```

De esa manera, cuando Claude Code edita archivos relacionados con la API, cargará automáticamente esta especificación y se asegurará de que el código generado siga el estándar.

### 3.3 Paso Tres: Usar `/plan` para Implementar Especificar -> Planificar -> Tareas -> Implementar

El flujo de trabajo estándar de Spec Coding es un ciclo de cuatro etapas. GitHub Spec Kit lo estandariza como Specify -> Plan -> Tasks -> Implement, y el comando `/plan` de Claude Code soporta naturalmente este flujo.

El equipo de SpecThis enfatizó un principio clave: **definir límites antes de que el agente se ejecute - saber qué debería cambiar antes de que ocurran cambios de código**. Ese es exactamente el valor de `/plan`.

**Etapa 1: Especificar**

Primero escribe claramente lo que quieres construir. No te apresures con el código:

```text
/plan
Necesito implementar una función de reembolso de pedidos. La especificación es:

Requisitos funcionales:
- Los usuarios pueden solicitar un reembolso completo antes del envío
- Dentro de 7 días después del envío, los usuarios pueden solicitar devolución y reembolso
- Los reembolsos requieren aprobación del administrador

Criterios de aceptación:
- El monto del reembolso no puede exceder el monto realmente pagado por el pedido
- Máquina de estados de reembolso: solicitado -> aprobado -> reembolsando -> reembolsado
- El inventario se restaura después de que se completa el reembolso
- Registrar cada operación durante todo el proceso
```

**Etapa 2: Planificar**

Claude generará un plan técnico basado en tu especificación:

```text
📋 Plan de Implementación de Reembolso

1. Diseño de modelo de datos
   - Crear tabla refunds
   - Añadir estados relacionados con reembolso a la máquina de estados de pedidos

2. Diseño de API
   - POST /api/orders/:id/refund - solicitar reembolso
   - PUT /api/refunds/:id/approve - aprobar reembolso
   - GET /api/refunds - lista de reembolsos

3. Lógica de negocio
   - Verificaciones de elegibilidad de reembolso
   - Cálculo de monto de reembolso
   - Lógica de restauración de inventario

4. Integraciones
   - Conectar con la API de reembolso del proveedor de pagos
   - Enviar notificaciones de reembolso
```

**Etapa 3: Tareas**

Dividir el plan en pequeñas tareas que puedan ejecutarse independientemente, y dar a cada tarea un estándar de completitud claro.

**Etapa 4: Implementar**

Implementar una tarea a la vez, validando después de que cada una se completa.

### 3.4 Ejemplo Real: Construir un Sistema de Notificaciones de Usuario con Spec Coding

Usemos un ejemplo completo para comparar Vibe Coding y Spec Coding. Datos de Orchestrator.dev muestran que en la encuesta Stack Overflow 2025, 84% de desarrolladores usan o planean usar herramientas de IA, pero solo 22% están satisfechos con los resultados, y 46% creen que la precisión es un problema. Spec Coding es exactamente la clave para cerrar esa brecha de satisfacción.

**Enfoque Vibe Coding:**

```text
Tú: Construye una función de notificaciones
IA: [Inmediatamente empieza a escribir código y genera una lista de notificaciones simple]

Tú: Debería soportar leídas y no leídas
IA: [Modifica el código y añade un campo read]

Tú: También necesita múltiples tipos de notificación
IA: [Lo cambia de nuevo y añade un campo type]

Tú: También debería enviar notificaciones push a los teléfonos
IA: [Hace una gran reescritura, y la estructura anterior ya no encaja muy bien...]
```

Resultado: después de cuatro rondas de cambios, la arquitectura ha sido revocada una y otra vez, y el código se vuelve más desordenado con el tiempo.

**Enfoque Spec Coding:**

Primero escribe un documento de especificación `specs/notification.md`:

```markdown
# Especificación del Sistema de Notificaciones de Usuario

## Requisitos Funcionales
1. Soportar tres canales: notificaciones in-app, notificaciones por email y notificaciones push
2. Tipos de notificación: anuncios del sistema, estado de pedidos, campañas promocionales, alertas de seguridad
3. Los usuarios pueden configurar preferencias de notificación por canal y tipo
4. Soportar estado leído/no leído y marcar todo como leído en lote

## Modelo de Datos
- tabla notifications: id, user_id, type, channel, title, content,
  is_read, created_at
- tabla notification_preferences: user_id, type, channel, enabled

## Diseño de API
- GET /api/notifications?type=&is_read= - obtener lista de notificaciones (paginada)
- PUT /api/notifications/:id/read - marcar como leído
- PUT /api/notifications/read-all - marcar todo como leído
- GET /api/notification-preferences - obtener configuración de preferencias
- PUT /api/notification-preferences - actualizar configuración de preferencias

## Criterios de Aceptación
- El conteo de notificaciones no leídas se actualiza en tiempo real
- La lista de notificaciones soporta scroll infinito
- Latencia de notificación push < 3 segundos
- Los cambios de preferencia surten efecto inmediatamente
```

Luego en Claude Code:

```text
@specs/notification.md
Implementa el sistema de notificaciones de usuario según esta especificación.
Comienza con el modelo de datos, luego implementa la API, y finalmente construye los componentes frontend.
Haz una pausa después de que cada módulo esté completo y confirmaré antes de que continúes.
```

Resultado: se logra limpiamente en un solo intento, con una arquitectura clara y sin necesidad de desmantelar y reconstruir repetidamente.

### 3.5 Fortaleciendo Spec Coding con Superpowers

En el capítulo anterior [Superpowers para Desarrollo de Grado Ingenieril](../superpowers/), aprendimos sobre el sistema de habilidades Superpowers. Spec Coding y Superpowers son compañeros naturales:

| Etapa de Spec Coding | Habilidad Superpowers Correspondiente |
|------------------|---------------------|
| Definir la especificación | `brainstorming` - usar interrogatorio socrático para aclarar requisitos |
| Planificación técnica | `writing-plans` - dividir la especificación en tareas pequeñas |
| Implementación incremental | `test-driven-development` - TDD rojo-verde-refactor |
| Verificación de calidad | `code-review` + `verification-before-completion` |

**Ejemplo de uso combinado:**

```text
@specs/notification.md
Implementa el sistema de notificaciones según esta especificación usando TDD,
y ayúdame a revisar el código después de terminar
```

Esta sola instrucción activa tanto el flujo de trabajo de Spec Coding como habilidades de Superpowers como TDD y Code Review, formando un proceso completo de desarrollo de grado ingenieril.

### 3.6 Control de Versiones y Evolución Continua de las Especificaciones

El Vibe Coding Substack propuso un punto de vista importante: **Las especificaciones ahora son código**. Si las especificaciones son código, entonces deberían gestionarse como código:

- **Control de versiones**: mantener archivos de especificación en Git y commitearlos junto con el código
- **Seguimiento de cambios**: cada cambio a la especificación tiene un registro de commit para que sepas quién cambió qué y por qué
- **Revisión de código**: los cambios a las especificaciones también deberían pasar por revisión PR para que el equipo se mantenga alineado
- **Integración CI**: los cambios de especificación disparan pruebas automatizadas para verificar si la implementación aún se ajusta a la especificación

En Claude Code, eso significa que tu `CLAUDE.md`, `.claude/rules/` y directorio `specs/` deberían todos tener control de versiones. La experiencia de Robomotion es que **versionar especificaciones junto con implementaciones previene desviaciones y mantiene todo auditable**.

La práctica de Harness Engineering de OpenAI también confirma esto: su archivo `AGENTS.md` es en sí mismo escrito por Codex y se actualiza continuamente a medida que el proyecto evoluciona. Cuando el agente encuentra dificultades, la solución no es cambiar el código directamente, sino **hacer que Codex actualice la especificación misma** - formando un bucle de auto-reparación para las especificaciones.

---

## 4. Una Estrategia Híbrida: Moviéndose Gradualmente de Vibe a Spec

El consenso de la industria no es "abandonar Vibe Coding," sino más bien **elegir el enfoque correcto para el escenario correcto**.

### 4.1 Cuándo Usar Vibe Coding

- Validar si una idea es factible, con un prototipo construido en 30 minutos
- Explorar tecnologías o frameworks desconocidos
- Hackathons o demos internas
- Scripts o herramientas de un solo uso

### 4.2 Cuándo Usar Spec Coding

- Desarrollo de funciones en producción
- Proyectos colaborativos multi-persona
- Código que necesitará mantenimiento a largo plazo
- Dominios sensibles como seguridad, pagos o datos
- Diseño de API e integración de sistemas

### 4.3 Un Flujo de Trabajo Gradual Recomendado

**Etapa 1: Exploración Vibe**

Usar Vibe Coding para validar la idea rápidamente. No escribas especificaciones todavía, y no te preocupes por la calidad del código:

```text
Construye un popup de notificación simple para que veamos cómo se siente
```

**Etapa 2: Refinar la Especificación**

Una vez confirmada la factibilidad, organizar lo aprendido durante la exploración en una especificación. Puedes incluso pedir a la IA que ayude:

```text
Basándote en el prototipo de notificación que acabamos de construir,
ayúdame a organizar un documento de especificación funcional formal,
incluyendo el modelo de datos, diseño de API y criterios de aceptación
```

**Etapa 3: Reconstruir con Spec**

Basándose en esa especificación, re-implementar la versión de grado de producción usando Spec Coding:

```text
@specs/notification.md
Implementa esto desde cero según la especificación, y no te refieras al código del prototipo anterior
```

La ventaja de este flujo de trabajo es clara: **usar la velocidad de Vibe Coding para validar dirección, y la calidad de Spec Coding para entregar el producto**.

Robomotion lo resumió bien:

> "La especificación es la fuente de verdad. La salida generada por IA es el borrador de implementación. La validación no es opcional."
> The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional.

---

## 5. Preguntas Frecuentes

### Q1: ¿No se siente Spec Coding demasiado lento?

Escribir especificaciones requiere inversión inicial. Pero el equipo de Greg Ceccarelli usó Spec Coding para entregar un producto macOS completo con **tres personas en cuatro semanas** - algo que sería casi imposible en desarrollo tradicional.

El tiempo gastado escribiendo especificaciones al principio se recuperará más tarde a través de menos retrabajo, menos bugs y menor costo de comunicación.

### Q2: ¿Qué tan detallada debería ser una especificación?

La sugerencia de Robomotion es: **una especificación de alta calidad puede ser de solo una página**. Lo que importa es si responde estas ocho preguntas:

1. ¿Qué estamos automatizando?
2. ¿Cuál es la entrada?
3. ¿Cuál es la salida?
4. ¿Cuáles son las restricciones?
5. ¿Cuáles son los modos de fallo?
6. ¿Cuáles son los requisitos de seguridad?
7. ¿Cuáles son los requisitos de rendimiento?
8. ¿Qué pruebas prueban que funciona?

### Q3: ¿Qué pasa si la IA solo hace exactamente lo que dice la especificación y pasa por alto funciones "obvias"?

Esta realmente es una limitación de Spec Coding. El feedback de usuarios de GitHub Spec Kit es que la IA hará **"exactamente y solo"** lo que está escrito en la especificación.

La solución es añadir una sección de "requisitos no funcionales" a la especificación y listar expectativas comunes ahí, como manejo de errores, logging y accesibilidad. O establecer reglas globales en `CLAUDE.md`.

### Q4: ¿Los proyectos pequeños también necesitan Spec Coding?

No. Spec Coding es más adecuado para:

- proyectos de grado de producción
- proyectos colaborativos en equipo
- proyectos que necesitan mantenimiento a largo plazo

Para prototipos rápidos, scripts de un solo uso y experimentos de aprendizaje, Vibe Coding es más adecuado.

### Q5: ¿Cómo hacer que un equipo acepte Spec Coding?

Comienza con una función pequeña como piloto. Deja que el equipo vea cómo Spec Coding reduce el retrabajo y mejora la tasa de éxito al primer intento. La encuesta Stack Overflow 2025 muestra que 84% de desarrolladores usan o planean usar herramientas de IA, pero solo 22% están satisfechos con los resultados - Spec Coding es exactamente la clave para mejorar esa satisfacción.

---

## 6. Resumen

Moverse de Vibe Coding a Spec Coding no es una revolución. Es una evolución.

Sean Grove lo dejó muy claro en "The New Code": **durante 70 años hemos estado escribiendo código para resolver problemas; ahora deberíamos estar escribiendo especificaciones para generar código**. El código es una proyección con pérdidas de la intención, mientras que las especificaciones pueden capturar completamente la intención, el contexto y las restricciones.

Para desarrolladores que usan Claude Code, este cambio ya está ocurriendo:

- el `CLAUDE.md` que escribes es tu especificación del proyecto
- el directorio Rules que configuras es tu sistema de especificaciones en capas
- la planificación que haces con `/plan` es el flujo Specify -> Plan -> Tasks
- combinar TDD y Code Review de Superpowers te da un flujo de trabajo Spec Coding completo

**Conclusiones clave:**

- Vibe Coding es adecuado para exploración y prototipos, mientras Spec Coding es adecuado para producción y colaboración
- La especificación es la fuente de verdad, y el código es un artefacto de implementación producido a partir de ella
- La capacidad de escribir especificaciones = capacidad de programación, y la capacidad de comunicación importa más que la capacidad de sintaxis
- Comienza pequeño: solo escribiendo bien `CLAUDE.md`, ya has dado el primer paso hacia Spec Coding

::: tip 💡 Próximo paso
En el próximo capítulo, aprenderemos cómo usar la capacidad Agent Teams de Claude Code para que múltiples instancias de IA puedan colaborar como un equipo de desarrollo real.
:::

---

## Referencias

### Relacionadas con la charla "The New Code" de Sean Grove

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Transcripción completa de "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Metodología Spec Coding

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs. Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### Herramientas y Prácticas

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
