# Superpowers de Claude Code para Desarrollo de Grado Ingenieril

## Introducción a Superpowers

**Superpowers** es un framework de habilidades de agentes de código abierto creado por Jesse Vincent (alias en línea: obra), diseñado específicamente para resolver un problema central en la programación con IA: cómo hacer que la IA produzca código de "grado ingenieril" en lugar de código de "grado de juguete".

Imagina un asistente normal de codificación con IA como un "pasante inteligente." Puede escribir código ejecutable, pero puede que no tenga pruebas, ni documentación, ni disciplina de mejores prácticas. Superpowers es como asignar un "mentor de ingeniero senior" a ese pasante, forzándolo a seguir un proceso completo de desarrollo de software.

### ¿Por Qué Necesitamos Superpowers?

Antes de Superpowers, había varios problemas al usar Claude Code:

- **Caos en vibe coding**: la IA comienza a codificar directamente sin planificación, causando retrabajo frecuente
- **Falta de disciplina TDD**: la IA tiende a escribir código primero y añadir pruebas después, o saltar pruebas completamente
- **Codificación con requisitos vagos**: el usuario dice "construye una función de login," la IA empieza inmediatamente, y el resultado no es lo que se quería
- **Calidad de código inestable**: no hay mecanismo de code-review, así que la calidad depende del "humor" de la IA

Superpowers resuelve estos problemas y convierte a Claude en un "equipo de desarrollo disciplinado." Ayuda a aclarar los requisitos primero, luego crea un plan, luego desarrolla con TDD y finalmente asegura la calidad a través de revisión de código.

---

## Inicio Rápido

### Paso 1: Instalar Superpowers

Ejecuta en Claude Code:

```bash
# Añadir marketplace
/plugin marketplace add obra/superpowers-marketplace

# Instalar superpowers
/plugin install superpowers@superpowers-marketplace
```

O clona manualmente:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Paso 2: Prueba Tu Primera Habilidad

Usemos la habilidad de **brainstorming** de Superpowers para experimentar su valor.

En Claude Code, escribe:

```text
Constrúyeme una función de login de usuario
```

**Antes de Superpowers**: Claude comienza a escribir código directamente y puede producir algo que no realmente quieres.

**Con Superpowers**: Claude usa preguntas socráticas para ayudar a aclarar requisitos:

> ¿Esta función de login es para una app Web o una app móvil?
>
> ¿Qué métodos de login se requieren? Email/contraseña? Login de terceros (Google, GitHub)?
>
> ¿Necesitas una función de "recuérdame"?
>
> ¿El restablecimiento de contraseña debería ser por email o SMS?
>
> ...

Estas preguntas te fuerzan a aclarar qué necesitas realmente antes de codificar, previniendo mucho código no utilizado.

### Paso 3: Entender los Mecanismos de Activación de Habilidades

Superpowers no es un "interruptor mágico." Es un **conjunto de habilidades**. Entender cómo se activan las habilidades es importante.

**Tres métodos de activación:**

1. **Activación por palabra clave**
   - Cuando mencionas "TDD," "desarrollo guiado por pruebas" o "escribir pruebas primero"
   - La habilidad `test-driven-development` se activa

2. **Activación por escenario**
   - Cuando los requisitos no están claros, `brainstorming` hace preguntas proactivas
   - Cuando aparecen bugs, `systematic-debugging` se activa

3. **Invocación manual**
   - Usa nombres de habilidades directamente, como: `/test-driven-development`

#### 💡 Aclaración Importante: ¿Qué Pasa Si No Especificas TDD?

Este es un malentendido común. Vamos a aclarar:

```text
# Caso A: TDD no mencionado
"Implementa una calculadora"
-> Claude puede escribir pruebas, o puede que no
-> Depende de los propios hábitos del modelo

# Caso B: TDD explícitamente solicitado
"Implementa una calculadora con TDD"
-> la habilidad test-driven-development se activa
-> RED-GREEN-REFACTOR es forzado
```

**El valor real de Superpowers**: no crear habilidades de la nada, sino fortalecer la disciplina.

- Sin la habilidad TDD: Claude escribiendo pruebas es "quizás"
- Con la habilidad TDD: Claude está forzado a seguir el flujo TDD

### Entendiendo el Valor de Superpowers

De la explicación anterior, el valor central de Superpowers es claro:

1. **Requisitos primero**: `brainstorming` pregunta activamente cuando los requisitos son vagos
2. **Disciplina de proceso**: `test-driven-development` fuerza el ciclo TDD rojo-verde-refactor
3. **Descomposición de tareas**: `writing-plans` divide proyectos grandes en tareas pequeñas
4. **Control de calidad**: las habilidades de `code-review` aseguran la calidad del código

---

## Habilidades Centrales de Superpowers en Detalle

Superpowers incluye **20+ habilidades componibles** que cubren todo el ciclo de vida del software. Repasémoslas por categoría.

### 🧪 Habilidades de Testing

#### test-driven-development

**Cómo activar**: mencionar palabras clave como "TDD," "desarrollo guiado por pruebas" o "escribir pruebas primero."

**Qué hace esta habilidad**: fuerza a Claude a seguir el ciclo TDD rojo-verde-refactor en lugar de "quizás escribir pruebas después."

**Enfoque tradicional** (problemas comunes):
1. Escribir código directamente
2. Hacer una prueba manual rápida
3. Encontrar bugs y parchar código
4. Repetir... (¿pruebas? quizás la próxima vez)

**Enfoque TDD** (después de activar la habilidad):
1. 🔴 **ROJO**: escribir una prueba que falle primero
2. 🟢 **VERDE**: escribir el código mínimo para pasar la prueba
3. 🔵 **REFACTORIZAR**: refactorizar mientras se mantienen las pruebas pasando
4. Repetir

**Ejemplo de uso**:

```text
Implementa un módulo de autenticación de usuario usando TDD
```

Claude hará:
1. Escribir pruebas primero (validación de usuario/contraseña, generación de token, etc.)
2. Ejecutar pruebas y confirmar que todas fallan (ROJO)
3. Escribir código de implementación mínimo
4. Ejecutar pruebas y confirmar que pasan (VERDE)
5. Refactorizar código y extraer lógica compartida
6. Ejecutar pruebas nuevamente y confirmar que pasan (REFACTORIZAR)

> **Nota**: si no mencionas "TDD," Claude puede o no escribir pruebas. El rol de la habilidad es **forzar disciplina de proceso** para que las pruebas no se "olviden."

### 🐛 Habilidades de Depuración

#### systematic-debugging

Cuando aparecen bugs, los desarrolladores humanos a menudo prueban correcciones aleatorias. Superpowers fuerza un análisis de causa raíz de cuatro etapas:

**Etapa 1: Reproducir el problema**
- Confirmar que el bug puede reproducirse consistentemente
- Registrar los pasos exactos de reproducción

**Etapa 2: Aislar la causa raíz**
- Reducir el alcance usando reducción estilo búsqueda binaria
- Añadir logs para localizar código problemático

**Etapa 3: Validar hipótesis**
- Proponer hipótesis de causa raíz
- Diseñar experimentos de validación

**Etapa 4: Corregir y verificar**
- Implementar la corrección
- Confirmar que el bug está resuelto
- Añadir pruebas de regresión

#### verification-before-completion

Esta habilidad previene que Claude se detenga cuando las cosas solo "parecen lo suficientemente cerca." Antes de reclamar completitud, requiere que Claude:

1. Ejecute todas las pruebas
2. Pruebe manualmente las funciones clave
3. Verifique la calidad del código (lint)
4. Confirme que la documentación está actualizada

### 🤝 Habilidades de Colaboración

#### brainstorming

Esta es una de las habilidades más interesantes de Superpowers. Usa interrogatorio socrático para aclarar requisitos.

**Cómo funciona**: cuando proporcionas un requisito vago, Claude no comienza a codificar directamente. Hace preguntas:

```text
Tú: Construye un sistema de blog

Claude:
- ¿Para quién es este blog? ¿Lectores técnicos o público general?
- ¿Debería soportar edición Markdown?
- ¿Necesitas comentarios?
- ¿Necesitas búsqueda?
- ¿Un solo usuario o multi-autor?
- ...
```

Estas preguntas te fuerzan a pensar en qué funcionalidad es verdaderamente necesaria, evitando muchas funciones no utilizadas.

#### writing-plans

Esta habilidad descompone tareas grandes en tareas pequeñas que cada una puede completarse en 2-5 minutos.

**Ejemplo**:

```text
Usa writing-plans para planificar el desarrollo de una API de todo
```

Claude generará un plan detallado:

```markdown
# Plan de Implementación

## Tarea 1: Diseñar esquema de base de datos (estimado 5 minutos)
- Crear tabla todos
- Definir campos: id, title, completed, createdAt

## Tarea 2: Crear rutas Express (estimado 10 minutos)
- POST /todos - crear tarea
- GET /todos - listar tareas
- GET /todos/:id - obtener una tarea
- PUT /todos/:id - actualizar
- DELETE /todos/:id - eliminar

## Tarea 3: Añadir validación de entrada (estimado 10 minutos)
- title no puede estar vacío
- completed debe ser booleano

## Tarea 4: Escribir pruebas (estimado 15 minutos)
- Escribir pruebas para cada endpoint
- Cubrir casos extremos

## Tarea 5: Iniciar servidor y verificar (estimado 5 minutos)
- Ejecutar pruebas
- Probar API manualmente

Criterios de aceptación:
- Todas las pruebas pasan
- Prueba curl pasa para cada endpoint
```

#### executing-plans

Esta habilidad ejecuta un plan en lotes y hace una pausa en cada punto de control para confirmación.

**Ejemplo de uso**:

```text
Ejecuta el plan anterior, y haz una pausa después de cada tarea completada
```

Claude hará:
1. Terminar tarea 1, luego pausar: `✅ Esquema de base de datos hecho. ¿Continuar?`
2. Después de tu confirmación, terminar tarea 2 y pausar nuevamente
3. Y así sucesivamente

Esto te permite verificar dirección en cada etapa, evitando descubrir tarde que las cosas se desviaron del camino.

#### dispatching-parallel-agents

Esta habilidad puede lanzar múltiples sub-agentes en paralelo.

**Caso de uso**: cuando necesitas procesar múltiples tareas independientes simultáneamente.

```text
Usa agentes en paralelo para completar:
- Agente A: escribir APIs backend
- Agente B: escribir componentes frontend
- Agente C: escribir pruebas
```

Cada agente trabaja en su propio entorno aislado sin interferencia.

#### subagent-driven-development

Esta habilidad lanza un sub-agente independiente para cada tarea pequeña.

**Ventajas**:
- Cada sub-agente tiene un contexto aislado
- El fallo de una tarea no afecta a otras
- Múltiples tareas pueden ejecutarse en paralelo

#### using-git-worktrees

Esta habilidad usa Git worktree para crear entornos de desarrollo aislados.

**Beneficios**:
- Múltiples funciones pueden desarrollarse en paralelo
- Cada worktree es independiente
- Sin conflictos mutuos

### 👀 Habilidades de Revisión de Código

#### requesting-code-review

Después de que el código se completa, esta habilidad solicita automáticamente revisión de código.

```text
Activar automáticamente revisión de código después de terminar la función
```

#### receiving-code-review

Esta habilidad define cómo recibir y procesar feedback de revisión.

**Flujo de revisión**:
1. Enviar código
2. Activar revisión automáticamente
3. El revisor verifica calidad del código, seguridad y cobertura de pruebas
4. El revisor proporciona sugerencias de mejora
5. Corregir problemas
6. Re-revisión hasta aprobación

---

## Flujo de Trabajo Completo de Superpowers

El verdadero poder de Superpowers viene de combinar múltiples habilidades en un flujo de trabajo completo.

### Flujo de Trabajo de Desarrollo Estándar

```text
1. Brainstorming
   ↓ Aclarar requisitos reales a través de Q&A

2. Documento de Diseño
   ↓ Presentar diseño en fragmentos y esperar confirmación

3. Writing Plans
   ↓ Dividir en tareas de 2-5 minutos

4. Desarrollo con Subagent
   ↓ Lanzar sub-agente aislado por tarea
   ↓ Revisión en dos etapas: conformidad con spec + calidad de código

5. TDD
   ↓ Forzar RED-GREEN-REFACTOR

6. Code Review
   ↓ Puerta de calidad

7. Hecho
```

### Ejemplo Práctico: Construir un Sistema de Autenticación de Usuario con Superpowers

Experimentemos el flujo de trabajo de Superpowers a través de un ejemplo completo.

#### Paso 1: Aclarar Requisitos con Brainstorming

```text
Necesito un sistema de autenticación de usuario
```

Claude preguntará:
- ¿Es una app Web o app móvil?
- ¿Qué métodos de login se requieren?
- ¿Se necesita restablecimiento de contraseña?
- ¿Se necesita "recuérdame"?
- ...

#### Paso 2: Generar un Documento de Diseño

Después de confirmar los requisitos, Claude producirá un documento de diseño:

```markdown
# Diseño del Sistema de Autenticación de Usuario

## Requisitos Funcionales
1. Registro de usuario (email + contraseña)
2. Login de usuario
3. Restablecimiento de contraseña (email)
4. Recuérdame (JWT + Refresh Token)

## Decisiones Tecnológicas
- Backend: Node.js + Express
- Base de datos: SQLite
- Auth: JWT
- Encriptación: bcrypt

## Diseño de API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Paso 3: Escribir el Plan de Implementación

```text
Usa writing-plans para crear el plan de implementación
```

Claude generará una lista detallada de tareas, cada tarea completable en 2-5 minutos.

#### Paso 4: Ejecutar el Desarrollo

```text
Ejecuta el plan anterior con TDD
```

Claude hará:
1. Escribir pruebas primero
2. Confirmar que las pruebas fallan (ROJO)
3. Escribir código de implementación
4. Confirmar que las pruebas pasan (VERDE)
5. Refactorizar código (REFACTORIZAR)

#### Paso 5: Revisión de Código

Después de completar, la revisión de código se activa automáticamente para verificar:
- calidad del código
- seguridad (inyección SQL, XSS, etc.)
- cobertura de pruebas
- completitud de la documentación

---

## Superpowers vs Uso Directo de Claude Code

| Dimensión | Uso Directo de Claude Code | Usando Superpowers |
|------|---------------------|-----------------|
| **Aclaración de requisitos** | La IA comienza a codificar directamente | Preguntas socráticas aclaran requisitos primero |
| **Proceso de desarrollo** | Forma libre dependiendo de la IA | TDD rojo-verde-refactor forzado |
| **Gestión de tareas** | Completado de una vez | Dividido en tareas pequeñas con puntos de control |
| **Calidad del código** | Depende del juicio de la IA | Revisión de código forzada |
| **Previsibilidad** | Resultados inestables | Proceso repetible |
| **Mejor para** | Tareas simples, validación de prototipos | Proyectos complejos, código en producción |

### Metáfora Visual

Si Claude Code es un "pasante inteligente":

- **Uso directo**: dile al pasante "construye una función de login" y empieza a codificar inmediatamente, posiblemente produciendo algo fuera de objetivo
- **Con Superpowers**: asigna al pasante un mentor senior que aclara requisitos, crea planes y verifica la calidad del código

---

## Instalación y Configuración en Detalle

### Método 1: Via Marketplace (Recomendado)

```bash
# Añadir marketplace
/plugin marketplace add obra/superpowers-marketplace

# Instalar
/plugin install superpowers@superpowers-marketplace

# Verificar instalación
/skills
```

### Método 2: Clonación Manual

```bash
# Crear directorio
mkdir -p ~/.claude/skills

# Clonar repositorio
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Método 3: Instalación a Nivel de Proyecto

Si quieres usar Superpowers en un proyecto específico:

```bash
# En la raíz del proyecto
mkdir -p .claude/skills

# Clonar o copiar superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Esto permite que los miembros del equipo compartan la misma configuración de Superpowers.

---

## Referencia Rápida de Habilidades Comunes

| Nombre de Habilidad | Función | Caso de Uso |
|---------|------|---------|
| `brainstorming` | Aclarar requisitos mediante interrogatorio socrático | Cuando los requisitos no están claros |
| `writing-plans` | Dividir tareas en pasos pequeños | Antes de comenzar proyectos grandes |
| `executing-plans` | Ejecutar plan con puntos de control | Durante desarrollo basado en planes |
| `test-driven-development` | Ciclo TDD rojo-verde-refactor | Para todo desarrollo de funciones |
| `systematic-debugging` | Análisis de causa raíz de cuatro etapas | Cuando aparecen bugs |
| `verification-before-completion` | Verificación pre-completitud | Al completar tareas |
| `requesting-code-review` | Solicitar revisión de código | Antes de enviar código |
| `subagent-driven-development` | Desarrollo impulsado por sub-agentes | Tareas en paralelo |
| `using-git-worktrees` | Aislamiento con Git worktree | Desarrollo paralelo de funciones |

---

## Mejores Prácticas

### 1. Usar Palabras Clave de Activación Claras

Las habilidades de Superpowers se activan por palabras clave. Aprende palabras de activación comunes:

| Habilidad | Palabras Clave de Activación |
|------|-----------|
| `test-driven-development` | "TDD", "desarrollo guiado por pruebas", "escribir pruebas primero" |
| `brainstorming` | Auto-activado cuando los requisitos no están claros |
| `systematic-debugging` | "depurar", "bug", "no funciona" |
| `writing-plans` | "haz un plan", "planificación" |

### 2. Usar Superpowers Cuando Se Necesita Disciplina de Proceso

- Desarrollo de código de grado de producción -> mencionar "TDD"
- Los requisitos no están claros -> dejar que `brainstorming` aclare
- Proyecto complejo -> usar `writing-plans` para descomponer tareas

### 3. No Forzarlo para Tareas Simples

Si es un prototipo rápido o script de un solo uso, no necesitas el proceso completo. Superpowers es más adecuado para código que requiere mantenimiento a largo plazo.

### 4. Las Habilidades Pueden Combinarse

```text
Implementa autenticación de usuario con TDD, y después de terminar, ayúdame a hacer una revisión de código
```

Esto activa tanto las habilidades `test-driven-development` como `code-review`.

---

## Preguntas Frecuentes

### Q1: ¿Tengo que especificar "TDD" al usar Superpowers?

**No es requerido**.

Superpowers es un conjunto de habilidades, y cada habilidad tiene sus propias condiciones de activación:
- Decir "usa TDD" -> activa `test-driven-development`
- No decir TDD -> Claude puede escribir pruebas o no (depende del comportamiento del modelo)

Superpowers existe para **forzar disciplina de proceso**, no para crear capacidad de la nada.

### Q2: ¿Superpowers hace el desarrollo más lento?

Al principio puede sentirse más lento porque:
- la aclaración de requisitos toma tiempo
- las pruebas se escriben antes del código
- se requiere revisión de código

Pero a largo plazo, la eficiencia general mejora debido a menos retrabajo y menos bugs.

### Q3: ¿Los proyectos pequeños también necesitan Superpowers?

Para validación de prototipos o tareas muy simples, puedes usar Claude Code directamente. Superpowers es más adecuado para:
- proyectos de grado de producción
- colaboración multi-persona
- mantenibilidad a largo plazo

### Q4: ¿Cuál es la diferencia entre Superpowers y Skills?

| Dimensión | Superpowers | Skills |
|------|-------------|--------|
| **Naturaleza** | Framework completo de metodología de desarrollo | Paquetes de habilidades reutilizables |
| **Alcance** | Cubre todo el proceso de desarrollo | Se enfoca en funciones específicas |
| **Relación** | Superpowers usa Skills internamente | Superpowers es una colección de Skills |

### Q5: ¿Puedo personalizar las habilidades de Superpowers?

Sí. Superpowers es de código abierto, y puedes:
1. Hacer fork del repositorio
2. Modificar habilidades existentes
3. Añadir nuevas habilidades
4. Contribuir de vuelta a la comunidad

---

## Referencias

### Recursos Oficiales

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - repositorio oficial (50,000+ ⭐)
- [Tutorial Detallado de Uso de Superpowers](https://www.cnblogs.com/gyc567/p/19510203) - tutorial detallado en chino
- [Guía de Configuración de Entorno de Superpowers](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - guía de configuración

### Recursos de la Comunidad

| Repositorio | Descripción |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | toolkit completo incluyendo flujos de trabajo TDD |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | mejores prácticas oficiales |

### Artículos Relacionados

- [¡Adiós Vibe Coding! Usa Superpowers para Hacer que Claude Code Escriba Código de Grado Ingenieril](https://juejin.cn/post/7593573617648123956)
- [Cómo Uso Superpowers MCP para Forzar a Claude Code a Planificar Antes de Codificar](https://juejin.cn/post/7570341520551673871)
- [Tutorial para Principiantes de Claude Code + Superpowers](https://juejin.cn/post/7594832320030638123)

---

## Resumen

Superpowers es un conjunto de **habilidades de desarrollo de grado ingenieril** que mejora a Claude Code de un "pasante inteligente" a un "equipo de desarrollo disciplinado."

### Conclusiones Centrales

1. **Superpowers es un conjunto de habilidades, no magia**
   - Después de la instalación, las habilidades están disponibles en segundo plano
   - Activadas a través de palabras clave o escenarios
   - Puedes invocar habilidades específicas manualmente

2. **Recuerda frases clave de activación**
   - Quieres TDD -> decir "usar TDD"
   - Requisitos vagos -> `brainstorming` pregunta proactivamente
   - Aparece un bug -> mencionar "depurar" para activar `systematic-debugging`

3. **Escenarios de mejor ajuste**
   - ✅ Desarrollo de código de grado de producción
   - ✅ Proyectos mantenibles a largo plazo
   - ✅ Proyectos de colaboración en equipo
   - ❌ Prototipos rápidos (opcional)
   - ❌ Scripts de un solo uso (opcional)

Recuerda: **Superpowers no hace a la IA más inteligente; hace a la IA más disciplinada.**
