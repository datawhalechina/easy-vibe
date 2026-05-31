# Flujo de Trabajo de Desarrollo Asistido por IA

En los capítulos anteriores aprendimos a usar IDEs con IA para escribir código, cómo gestionar versiones de código con Git y cómo diseñar e implementar interfaces API. Pero cuando te enfrentas a una tarea de desarrollo real, puedes encontrarte con preguntas como estas:

- "Este proyecto tiene miles de archivos. ¿Por dónde debería empezar?"
- "Mi jefe me pidió añadir una nueva funcionalidad, pero no conozco esta parte del código."
- "No tengo idea de dónde está este error. Hay demasiado código."
- "Necesito refactorizar este montón de código, pero tengo miedo de romper algo."

La esencia de estas preguntas es: **¿cómo usar las herramientas de IA de manera eficiente en escenarios de desarrollo reales para completar el trabajo?**

En esta lección aprenderemos cómo construir un flujo de trabajo de desarrollo asistido por IA sistemático, para que puedas usar la IA de manera eficiente en diferentes escenarios de desarrollo. A través de ejemplos concretos, mostraremos cómo usar la IA en el desarrollo de nuevas funcionalidades, corrección de errores, refactorización de código y más.

> 💡 **Requisitos previos**
>
> Antes de estudiar esta sección, se recomienda que primero conozcas:
> - [Fundamentos de IDE con IA](../../stage-1/ai-ide/) - domina el uso básico de IDEs con IA
> - [Flujo de trabajo con Git y GitHub](../../stage-2/backend/git-workflow/) - comprende la gestión de versiones de código
> - [Uso de modelos grandes para ayudar a escribir código API](../../stage-2/backend/ai-interface-code/) - comprende el concepto básico del desarrollo asistido por IA

::: info 📚 Lo que aprenderás

1. Comprender el rol de la IA en el proceso de desarrollo y sus límites de capacidad
2. Dominar estrategias de desarrollo asistido por IA para diferentes tipos de proyectos
3. Aprender a usar Claude Code en escenarios como desarrollo de nuevas funcionalidades, corrección de errores y refactorización de código
4. Construir una base de conocimiento del proyecto para mejorar la eficiencia de colaboración con Claude Code
5. Dominar técnicas prácticas para mejorar la eficiencia de colaboración con la IA

:::

# 1. Comprender los Límites de Capacidad de la IA

Antes de empezar a usar la IA para asistir el desarrollo, primero necesitamos comprender qué puede y qué no puede hacer la IA. Solo así podemos construir el modelo de colaboración correcto.

## 1.1 En qué es buena la IA

Piensa en la IA como un asistente muy inteligente que aún necesita instrucciones claras. Puede generar rápidamente un esqueleto de código basándose en tu descripción, y también puede leer miles de líneas de código en segundos para encontrar la parte que necesitas. Si hay errores de sintaxis obvios o vulnerabilidades de seguridad comunes, también puede ayudarte a descubrirlos. Las tareas repetitivas como renombrar variables por lotes, formatear código y generar comentarios de documentación son especialmente adecuadas para delegarlas a la IA.

En pocas palabras, la IA es buena en el trabajo que tiene reglas claras y puede automatizarse.

## 1.2 En qué no es buena la IA

Pero la IA también tiene sus limitaciones. No comprende tu lógica de negocio. A menos que se lo digas en detalle, no sabrá cómo funciona el flujo de pedidos de tu empresa. Tampoco puede tomar decisiones como la selección tecnológica o el diseño de arquitectura que requieren sopesar compensaciones, porque esas dependen de tu experiencia y comprensión del proyecto. La IA tampoco conoce las convenciones especiales de tu equipo, como "todas las APIs deben tener registro de logs" o "los códigos de error deben usar enums". Necesitas configurar esas reglas o decírselas explícitamente.

Lo más importante es que el código generado por la IA no puede usarse directamente. Debes revisarlo y probarlo. Puede generar código que parece correcto pero que en realidad es problemático, y puede ignorar ciertos casos límite.

## 1.3 Cómo colaborar con la IA

Una vez que comprendes los límites de capacidad de la IA, el modelo de colaboración queda claro: tú eres responsable de decidir qué construir, tomar decisiones y asegurar la calidad; la IA es responsable de ejecutar el trabajo concreto de codificación, buscar información y señalar problemas obvios.

Es como trabajar con un desarrollador junior. Le dices qué necesita hacer, ellos lo implementan, y luego tú revisas el código. La diferencia es que la IA ejecuta mucho más rápido, pero su juicio es más débil que el de un humano.

# 2. Estrategias de Desarrollo para Diferentes Tipos de Proyectos

Diferentes tipos de proyectos requieren diferentes estilos de desarrollo y estrategias de uso de la IA. Elegir la estrategia correcta puede mejorar enormemente la eficiencia del desarrollo.

## 2.1 Proyectos Nuevos (Empezando desde Cero)

**Características del proyecto:**
- Sin lastre histórico, por lo que puedes diseñar libremente
- Necesitas establecer la estructura del proyecto y las convenciones de código
- Adecuado para iteración rápida y prueba y error

**Flujo de trabajo recomendado:**

**Paso 1: Planificar la estructura del proyecto**

Antes de empezar a codificar, primero pide a la IA que te ayude a planificar la estructura del proyecto y las elecciones tecnológicas:

```text
Quiero construir una aplicación de gestión de tareas con estas funcionalidades:
- Registro e inicio de sesión de usuarios
- Crear, editar y eliminar tareas
- Categorías y etiquetas de tareas
- Recordatorios de tareas

Por favor ayúdame:
1. Recomendar un stack tecnológico adecuado
2. Diseñar la estructura de directorios del proyecto
3. Planificar el esquema de la base de datos
```

**Paso 2: Construir el marco básico**

Basándote en el plan, pide a la IA que cree la estructura básica del proyecto:

```text
Basándonos en el plan que acabamos de discutir, ayúdame:
1. Crear la estructura de directorios del proyecto
2. Inicializar los archivos de configuración (package.json, .env, etc.)
3. Crear el código básico del servidor
```

**Paso 3: Implementar las funcionalidades una por una**

Implementa los módulos de funcionalidad uno a la vez por prioridad:

```text
Ahora implementa la funcionalidad de registro de usuarios con estos requisitos:
- Registro con correo electrónico y contraseña
- Almacenar contraseñas de forma encriptada
- Verificación por correo electrónico
```

**Puntos clave:**
- Establece convenciones de código desde el principio para que la IA genere código que las siga
- Prueba y verifica cada módulo de funcionalidad tan pronto como se complete
- Mantén la documentación del proyecto actualizada oportunamente

## 2.2 Proyectos Maduros (Bases de Código Existentes Grandes)

**Características del proyecto:**
- Base de código grande con convenciones históricas
- Necesitas mantener el estilo de codificación consistente
- Los cambios deben considerar el alcance del impacto

**Flujo de trabajo recomendado:**

**Paso 1: Comprender la estructura del proyecto**

Antes de cambiar el código, primero pide a la IA que te ayude a comprender el proyecto:

```text
Este es un proyecto de comercio electrónico y necesito añadir una funcionalidad de cupones.
Por favor ayúdame:
1. Analizar la estructura general del proyecto
2. Encontrar el código relacionado con pedidos
3. Ver cómo se implementan otras funcionalidades similares
```

**Paso 2: Encontrar código de referencia**

Pide a la IA que encuentre implementaciones similares en el proyecto como referencias:

```text
Encuentra cómo se implementan otras funcionalidades promocionales en el proyecto, como descuentos por volumen y reducciones
```

**Paso 3: Seguir el estilo existente**

Pide a la IA que implemente la nueva funcionalidad en el estilo del código existente:

```text
Por favor implementa la funcionalidad de cupones siguiendo cómo se implementa la promoción de reducción por volumen.
Mantén el mismo estilo de código y estructura de directorios.
```

**Puntos clave:**
- Comprende primero, luego cambia las cosas, para no dañar la arquitectura existente
- Mantén el estilo de codificación consistente
- Prueba las funcionalidades relacionadas después del cambio

## 2.3 Prototipos Rápidos (Validando Ideas)

**Características del proyecto:**
- La velocidad es lo más importante, la calidad del código importa menos
- Se usa para validar ideas de producto o enfoques técnicos
- Puede ser descartado o reescrito más adelante

**Flujo de trabajo recomendado:**

**Describe el requisito directamente e implementa rápidamente:**

```text
Construye una aplicación de tareas simple con estos requisitos:
- Añadir, eliminar y marcar tareas como completadas
- Almacenar datos localmente
- Mantener la interfaz simple, siempre que funcione
```

**Itera rápidamente:**

```text
Añade búsqueda
Cámbialo a tema oscuro
Añade categorías de tareas
```

**Puntos clave:**
- No te preocupes demasiado por la calidad del código o las convenciones
- Valida las ideas rápidamente y ajusta la dirección a tiempo
- Si el prototipo tiene éxito, necesitará refactorización más adelante

## 2.4 Proyectos de Mantenimiento (Principalmente Corrección de Errores)

**Características del proyecto:**
- El código ya es estable, y la tarea principal es corregir problemas
- Necesitas localizar problemas rápidamente
- Los cambios deben hacerse con cuidado para evitar introducir nuevos problemas

**Flujo de trabajo recomendado:**

**Paso 1: Localizar el problema**

```text
Feedback del usuario: después de hacer clic en el botón "Enviar Pedido", la página se congela
Error de consola: TypeError: Cannot read property 'id' of undefined

Por favor ayúdame:
1. Analizar las posibles causas
2. Encontrar el código relevante
```

**Paso 2: Analizar la causa raíz**

```text
Verifica en qué situaciones ocurre este error
Inspecciona el flujo de datos
```

**Paso 3: Aplicar la corrección**

```text
Corrige este problema, y:
1. Añade código defensivo para evitar problemas similares
2. Añade mensajes de error para mejorar la experiencia del usuario
```

**Puntos clave:**
- Prueba exhaustivamente después de la corrección para asegurar que no afecte otras funcionalidades
- Añade código defensivo para mejorar la robustez del sistema
- Registra el problema y la solución para referencia futura

# 3. Flujos de Trabajo para Tareas de Desarrollo Comunes

En el desarrollo day-to-day, nos encontramos con muchos tipos diferentes de tareas. A continuación se presentan varios de los flujos de trabajo asistidos por IA más comunes.

## 3.1 Desarrollar una Nueva Funcionalidad

**Escenario:** el product manager te da un nuevo requisito, y necesitas implementar una nueva funcionalidad.

**Flujo de trabajo completo:**

**Paso 1: Comprender el requisito** (hecho por ti)

Antes de empezar a codificar, primero aclara:
- ¿Qué funcionalidad necesita implementarse?
- ¿Cuáles son las entradas y salidas?
- ¿Cuáles son las condiciones límite y los casos excepcionales?
- ¿Cuáles son los requisitos de rendimiento y seguridad?

**Paso 2: Comprender el código existente** (pide ayuda a la IA)

```text
Necesito implementar una funcionalidad de comentarios de usuarios. Por favor ayúdame:
1. Verificar si hay algo similar en el proyecto
2. Encontrar cómo se almacenan los datos de usuarios y artículos
3. Comprender las convenciones de operación de base de datos en este proyecto
```

**Paso 3: Hacer un plan de implementación** (con la IA)

```text
Basándonos en el análisis que acabamos de hacer, implementar la funcionalidad de comentarios requiere:
1. Crear un modelo de datos de comentarios
2. Implementar APIs CRUD para comentarios
3. Añadir funcionalidad de visualización y publicación de comentarios en el frontend

Por favor ayúdame a confirmar si este plan es razonable y si falta algo
```

**Paso 4: Implementar la funcionalidad** (la IA genera, tú revisas)

```text
Según el plan, primero implementa el modelo de datos de comentarios.
Requisitos:
- Incluir contenido del comentario, autor, ID del artículo y fecha de creación
- Soportar respuestas anidadas de comentarios
- Añadir los índices necesarios
```

```text
Ahora implementa los endpoints de la API de comentarios.
Requisitos:
- Publicar un comentario
- Eliminar un comentario (solo se pueden eliminar los propios comentarios)
- Obtener todos los comentarios de un artículo
- Soportar paginación
```

```text
Finalmente implementa el componente de comentarios del frontend.
Requisitos:
- Mostrar la lista de comentarios
- Formulario de publicación de comentarios
- Soportar responder a comentarios
```

**Paso 5: Probar y verificar** (hecho por ti)

- Prueba manualmente el flujo principal
- Prueba casos límite como contenido vacío y contenido excesivamente largo
- Prueba el control de permisos como la imposibilidad de eliminar el comentario de otra persona
- Pide a la IA que te ayude a escribir pruebas automatizadas

**Ejemplo de conversación real:**

```text
Tú: Quiero añadir una funcionalidad de comentarios de usuarios para que los usuarios puedan publicar comentarios en los artículos

IA: De acuerdo, primero déjame entender la estructura del proyecto.
    [La IA analiza el código del proyecto]
    Veo que el proyecto ya tiene un sistema de usuarios (models/user.js)
    y un sistema de artículos (models/article.js).

    Implementar la funcionalidad de comentarios requiere:
    1. Crear un modelo de datos de comentarios (models/comment.js)
    2. Añadir APIs relacionadas con comentarios (routes/comment.js)
    3. Añadir funcionalidad de visualización y publicación de comentarios en la página de detalle del artículo

    ¿Debo empezar a implementarlo?

Tú: Sí, empecemos. Crea el modelo de datos primero

IA: [Genera models/comment.js]
    He creado el modelo de datos de comentarios con estos campos:
    - id: ID del comentario
    - content: contenido del comentario
    - userId: ID del autor
    - articleId: ID del artículo
    - parentId: ID del comentario padre (para respuestas anidadas)
    - createdAt: fecha de creación

    ¿Debo implementar la API ahora?

Tú: Sí, implementa la API
```

## 3.2 Corregir Errores

**Escenario:** un usuario reporta un problema, y necesitas localizarlo y corregirlo rápidamente.

**Flujo de trabajo completo:**

**Paso 1: Recopilar información** (hecho por ti)

Registra la siguiente información:
- ¿Cuál es el mensaje de error?
- ¿Cómo se puede reproducir este problema?
- ¿Cuándo empezó a ocurrir?
- ¿Cuál es el alcance del impacto?

**Paso 2: Localizar el problema** (pide ayuda a la IA)

```text
Feedback del usuario: después de hacer clic en el botón "Enviar Pedido", la página se congela
Error de consola del navegador: TypeError: Cannot read property 'id' of undefined
El error ocurre en la línea 45 de checkout.js

Por favor ayúdame:
1. Analizar las posibles causas
2. Encontrar el código relevante
3. Verificar el flujo de datos
```

**Paso 3: Analizar la causa raíz** (con la IA)

```text
Verifica de dónde proviene este objeto user
Inspecciona bajo qué circunstancias user podría ser undefined
```

**Paso 4: Implementar la corrección** (la IA genera, tú revisas)

```text
Corrige este problema con estos requisitos:
1. Añade código defensivo para verificar si user existe
2. Si user no existe, redirige a la página de inicio de sesión
3. Añade un mensaje de error amigable
```

**Paso 5: Verificar la corrección** (hecho por ti)

- Reproduce el problema usando los pasos originales y confirma que el problema está resuelto
- Prueba las funcionalidades relacionadas para asegurar que no se introdujeron nuevos problemas
- Piensa si existen problemas similares en otras partes

**Ejemplo de conversación real:**

```text
Tú: Un usuario reportó que después de iniciar sesión, al actualizar la página se cierra la sesión

IA: Esto suele ser un problema de almacenamiento o validación de tokens. Déjame verificar:
    1. ¿Dónde se almacena el token, en localStorage o en cookies?
    2. ¿Se recarga el token cuando se actualiza la página?

    Por favor dime en qué archivo está el código relacionado con el token

Tú: utils/auth.js

IA: [Analiza utils/auth.js]
    Encontré el problema: el token se almacena en sessionStorage,
    y sessionStorage se borra cuando se actualiza la página.

    Solución: usar localStorage en su lugar

    ¿Te gustaría que lo cambie?

Tú: Sí, cámbialo

IA: [Modifica el código]
    El cambio está completo. El token ahora se almacena en localStorage,
    así que no se perderá después de actualizar la página.

    Te recomiendo que pruebes:
    1. Inicia sesión y actualiza la página para confirmar que el usuario permanece conectado
    2. Cierra y vuelve a abrir el navegador para confirmar que el usuario permanece conectado
```

## 3.3 Refactorizar Código

**Escenario:** el código se ha vuelto difícil de mantener, y necesita refactorización para mejorar la calidad del código.

**Flujo de trabajo completo:**

**Paso 1: Definir el objetivo de refactorización** (hecho por ti)

Aclara lo siguiente:
- ¿Qué problema estás intentando resolver? (¿código duplicado? ¿estructura desordenada? ¿problemas de rendimiento?)
- ¿Cuál es el alcance de la refactorización?
- ¿Qué nivel de riesgo es aceptable?

**Paso 2: Hacer un plan de refactorización** (con la IA)

```text
Estas tres funciones (getUserList, getArticleList, getCommentList)
contienen mucho código duplicado para paginación, ordenamiento y filtrado.

Por favor ayúdame:
1. Analizar las partes duplicadas
2. Proponer un plan de refactorización
3. Evaluar el riesgo de la refactorización
```

**Paso 3: Preparar una red de seguridad** (pide ayuda a la IA)

```text
Antes de refactorizar, por favor escríbeme casos de prueba primero
para que el comportamiento se mantenga igual después de la refactorización
```

**Paso 4: Refactorizar paso a paso** (la IA ejecuta, tú verificas)

```text
Según el plan que acabamos de discutir, primero extrae la función compartida
```

```text
Ahora optimiza la estructura de datos
```

```text
Finalmente actualiza los puntos de llamada
```

**Paso 5: Verificar el resultado** (hecho por ti)

- Ejecuta todas las pruebas y asegúrate de que pasen
- Prueba manualmente las funcionalidades clave
- Verifica si la calidad del código ha mejorado

**Ejemplo de conversación real:**

```text
Tú: Estas tres funciones tienen mucho código duplicado. ¿Puedes ayudarme a refactorizarlas?
    [Pega el código de las tres funciones]

IA: Las analicé, y las principales diferencias son:
    - getUserList: obtiene la lista de usuarios
    - getArticleList: obtiene la lista de artículos
    - getCommentList: obtiene la lista de comentarios

    Su lógica común es paginación, ordenamiento y filtrado.

    Plan de refactorización:
    1. Extraer una función genérica getList
    2. Pasar las partes diferentes como parámetros

    Esto puede reducir el 80% del código duplicado.

    ¿Debo implementarlo?

Tú: Sí, pero primero ayúdame a escribir casos de prueba

IA: [Genera pruebas]
    He escrito pruebas para las tres funciones,
    cubriendo los principales casos de uso.

    ¿Puedo empezar a refactorizar ahora?

Tú: Sí, empieza a refactorizar

IA: [Refactoriza el código]
    Refactorización completa. Creé una función getList genérica,
    y las tres funciones originales ahora llaman a esa función compartida.

    Por favor ejecuta las pruebas para confirmar que todo funciona: npm test
```

## 3.4 Revisión de Código

**Escenario:** un compañero de equipo envió código, y necesitas revisarlo.

**Flujo de trabajo completo:**

**Paso 1: Comprender rápidamente el cambio** (pide ayuda a la IA)

```text
Resume qué cambió este PR
Qué archivos se modificaron principalmente
```

**Paso 2: Verificar problemas comunes** (pide ayuda a la IA)

```text
Verifica este cambio para:
1. Problemas de seguridad (inyección SQL, XSS, etc.)
2. Problemas de rendimiento (consultas N+1, fugas de memoria, etc.)
3. Errores obvios
4. Si el estilo de codificación sigue las convenciones del proyecto
```

**Paso 3: Revisión profunda** (hecho por ti)

- Si la lógica de negocio es correcta
- Si se consideraron los casos límite
- Si hay un enfoque de implementación mejor
- Si se deberían añadir pruebas

**Paso 4: Dar feedback** (hecho por ti)

- Señala los lugares que necesitan cambios
- Explica por qué deberían cambiarse
- Proporciona sugerencias de mejora

**Ejemplo de conversación real:**

```text
Tú: Ayúdame a revisar este PR
    [Proporciona el enlace del PR o el código]

IA: Revisé el cambio y encontré estos problemas:

    1. Problemas de seguridad:
       - Línea 23: la entrada del usuario no está escapada, lo que puede llevar a riesgo de XSS
       - Línea 45: la consulta SQL se construye por concatenación de cadenas, lo que tiene riesgo de inyección

    2. Problemas de rendimiento:
       - Línea 67: se consulta la base de datos dentro de un bucle, lo que crea un problema N+1

    3. Calidad del código:
       - La función handleSubmit es demasiado larga (200 líneas); considera dividirla
       - Falta manejo de errores

    ¿Te gustaría que explique alguno de estos en más detalle?

Tú: Explica el problema de inyección SQL en detalle

IA: En la línea 45:
    ```javascript
    const query = `SELECT * FROM users WHERE name = '${userName}'`;
    ```

    Esto concatena directamente la entrada del usuario en la declaración SQL.
    Si un usuario ingresa `' OR '1'='1`, se convierte en:
    ```sql
    SELECT * FROM users WHERE name = '' OR '1'='1'
    ```
    Esto devolvería todos los datos de los usuarios.

    El enfoque correcto es usar una consulta parametrizada:
    ```javascript
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [userName]);
    ```

    ¿Te gustaría que lo corrija?
```

# 4. Construir una Base de Conocimiento del Proyecto

Para ayudar a la IA a comprender mejor tu proyecto, se recomienda construir una base de conocimiento dentro del proyecto. De esa manera la IA puede trabajar de acuerdo con tus convenciones y hábitos.

## 4.1 Crear un Archivo de Descripción del Proyecto

Crea un archivo `CLAUDE.md` o `AGENTS.md` en la raíz del proyecto para registrar información clave del proyecto:

```markdown
# Visión General del Proyecto

## Resumen del Proyecto
Esta es una plataforma de aprendizaje en línea que proporciona gestión de cursos, aprendizaje de usuarios, envío de tareas y otras funcionalidades.

## Stack Tecnológico
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL
- Despliegue: Vercel (frontend) + Railway (backend)

## Estructura del Proyecto
```
src/
├── components/     # Componentes React
├── pages/          # Componentes de página
├── api/            # Llamadas API
├── utils/          # Funciones de utilidad
└── types/          # Definiciones de tipos TypeScript
```

## Convenciones de Código
- Usar ESLint y Prettier para formatear el código
- Los archivos de componentes usan PascalCase (como UserProfile.tsx)
- Las funciones de utilidad usan camelCase (como formatDate.ts)
- Las constantes usan UPPER_SNAKE_CASE (como API_BASE_URL)

## Flujo de Desarrollo
1. Crear una rama de funcionalidad desde main
2. Enviar un PR después de completar el desarrollo
3. Fusionar después de que la revisión de código pase

## Tareas Comunes
- Iniciar el servidor de desarrollo: `npm run dev`
- Ejecutar pruebas: `npm test`
- Construir para producción: `npm run build`
- Formatear código: `npm run format`

## Notas
- Todas las llamadas API deben incluir manejo de errores
- La entrada del usuario debe ser validada y escapada
- Usar consultas parametrizadas para operaciones de base de datos para evitar inyección SQL
- Información sensible (contraseñas, tokens) no debe escribirse en los logs

## Esquema de Base de Datos
- users: tabla de usuarios (id, email, password_hash, created_at)
- courses: tabla de cursos (id, title, description, teacher_id)
- enrollments: tabla de inscripciones (id, user_id, course_id, enrolled_at)
```

## 4.2 Registrar Problemas Comunes y Soluciones

Crea `docs/troubleshooting.md` en el proyecto para registrar problemas comunes:

```markdown
# Problemas Comunes

## Problemas del Entorno de Desarrollo

### Problema: npm install falla
**Causa:** La versión de Node es incompatible
**Solución:** Usar Node.js 18 o superior

### Problema: la conexión a la base de datos falla
**Causa:** las variables de entorno no están configuradas
**Solución:** Copiar .env.example a .env y completar la información de conexión a la base de datos

## Problemas de Funcionalidad

### Problema: después de que los usuarios inician sesión, actualizar la página cierra la sesión
**Causa:** el token se almacena en sessionStorage
**Solución:** cambiar a localStorage

### Problema: la carga de imágenes falla
**Causa:** el tamaño del archivo excede el límite
**Solución:** añadir una verificación de tamaño de archivo en el frontend y limitarlo a 5MB
```

## 4.3 Mantener Registros de Decisiones Técnicas

Crea un directorio `docs/decisions/` para registrar decisiones técnicas importantes:

```markdown
# ADR-001: Elección de PostgreSQL como Base de Datos

## Estado
Aceptado

## Contexto
El proyecto necesita elegir una base de datos relacional. Los candidatos son MySQL y PostgreSQL.

## Decisión
Elegir PostgreSQL

## Justificación
1. Mejor soporte JSON, adecuado para almacenar contenido de cursos
2. Búsqueda de texto completo más fuerte
3. El equipo está más familiarizado con PostgreSQL

## Consecuencias
- Necesitamos aprender las características específicas de PostgreSQL
- El despliegue requiere un entorno PostgreSQL
```

# 5. Técnicas para Mejorar la Eficiencia de Colaboración con la IA

Dominando algunas técnicas prácticas, puedes hacer tu colaboración con la IA más eficiente.

## 5.1 Sé Claro y Específico al Describir Problemas

**Mala descripción:**
```text
Esta funcionalidad tiene un problema
Ayúdame a optimizarla
```

**Buena descripción:**
```text
Después de que el usuario hace clic en el botón "Enviar", el formulario no se envía
La consola del navegador reporta: Uncaught TypeError: Cannot read property 'value' of null
El error ocurre en la línea 23 de form.js

Esta lista carga muy lentamente y tiene 1000 elementos
Por favor ayúdame a añadir paginación con 20 elementos por página
```

**Puntos clave:**
- Proporciona información de error específica
- Explica el resultado esperado
- Da contexto relevante

## 5.2 Haz Solo Una Cosa a la Vez

**Mal enfoque:**
```text
Ayúdame a implementar inicio de sesión, registro, recuperación de contraseña, centro de perfil,
cambio de contraseña y verificación por correo electrónico
```

**Buen enfoque:**
```text
Primero implementa la funcionalidad de inicio de sesión, con estos requisitos:
- Inicio de sesión con correo electrónico y contraseña
- Recordar estado de inicio de sesión
- Mensajes de error

(Cuando termine) Ahora implementa la funcionalidad de registro

(Cuando termine) Ahora implementa la funcionalidad de recuperación de contraseña
```

**Puntos clave:**
- Divide las tareas grandes en tareas pequeñas
- Prueba y verifica después de cada tarea completada
- Confirma que no hay problemas antes de pasar a la siguiente

## 5.3 Verifica los Resultados Oportunamente

**Mal enfoque:**
- Dejar que la IA modifique 10 archivos seguidos
- Solo descubrir al final que el primer cambio ya era incorrecto
- Perder mucho tiempo

**Buen enfoque:**
- Modificar un archivo y probar inmediatamente
- Confirmar que no hay problema, luego continuar
- Corregir problemas tan pronto como se encuentren

**Puntos clave:**
- Avanza en pasos pequeños y obtén feedback rápido
- No confíes ciegamente en la IA
- Mantén el control del código

## 5.4 Usa Bien el Contexto

**Técnica 1: referirse a la conversación anterior**
```text
Implementa según el plan que acabamos de discutir
Refiérete a la función getUserList anterior
```

**Técnica 2: proporcionar código relacionado**
```text
Este es el código existente del modelo de usuario:
[pegar código]

Por favor implementa el modelo de artículo en el mismo estilo
```

**Técnica 3: explicar el contexto del proyecto**
```text
Este es un proyecto de comercio electrónico usando React + Node.js
Ya tiene un sistema de usuarios y un sistema de productos
Ahora necesitamos añadir una funcionalidad de carrito de compras
```

## 5.5 Guardar Conversaciones Útiles

**Escenario:** resolviste un problema complejo

**Cómo hacerlo:**
1. Registra la solución en la documentación del proyecto
2. Refiérete a ella la próxima vez que aparezca un problema similar
3. Compártela con otros miembros del equipo

**Ejemplo:**

Crea un documento en `docs/solutions/`:

```markdown
# Resolución del Problema de Consulta N+1

## Descripción del Problema
Al obtener la lista de artículos, el sistema consulta la información del autor una vez por artículo,
lo que causa un problema de rendimiento.

## Solución
Usar una consulta JOIN para obtener todos los datos de una vez:

```sql
SELECT articles.*, users.name as author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id
```

**Resultado:** el tiempo de consulta bajó de 2000ms a 50ms

## 5.6 Aprende el Arte de Hacer Preguntas

**Técnica 1: pregunta "por qué" primero**
```text
¿Por qué este código causa una fuga de memoria?
¿Por qué deberíamos usar useCallback en lugar de una función normal?
```

**Técnica 2: pide múltiples opciones**
```text
¿Cuáles son las diferentes formas de implementar la autenticación de usuarios?
¿Cuáles son los pros y contras de cada una?
```

**Técnica 3: pide explicaciones**
```text
¿Cómo funciona este código?
¿Puedes explicar este algoritmo en detalle?
```

# 6. Preguntas Frecuentes

## P1: ¿Puedo usar el código generado por la IA directamente?

**R:** No, no directamente. Necesita revisión y pruebas.

El código generado por la IA puede tener los siguientes problemas:
- errores lógicos o manejo deficiente de casos límite
- no seguir las convenciones de codificación del proyecto
- riesgos de seguridad
- optimización de rendimiento insuficiente

Necesitas:
- leer cuidadosamente el código generado
- entender su lógica
- probar diferentes escenarios
- confirmar que sigue las convenciones del proyecto

## P2: ¿Qué hago si la IA malinterpreta lo que quiero decir?

**R:** Corrígelo a tiempo y describe el requisito de nuevo.

```text
Eso no es lo que quería decir. Lo que quiero decir es...
Esta comprensión es incorrecta. Debería ser...
Déjame describir el requisito de nuevo...
```

Si sigue siendo incorrecto después de varias correcciones, puedes:
- proporcionar más contexto
- dar ejemplos de código específicos
- dividir la tarea en partes más pequeñas

## P3: ¿Qué hago si me encuentro con algo que la IA no puede resolver?

**R:** La IA no es todopoderosa. Algunos problemas aún necesitan que los resuelvas tú mismo.

Problemas que la IA puede no poder resolver:
- tecnologías muy nuevas (el conocimiento de la IA tiene una fecha límite)
- lógica de negocio única de tu equipo
- problemas que requieren acceso a sistemas externos
- problemas complejos de optimización de rendimiento

En ese punto, necesitas:
- leer la documentación oficial
- buscar soluciones relacionadas
- preguntar a compañeros de equipo experimentados
- preguntar en la comunidad

## P4: ¿Cómo juzgo si la sugerencia de la IA es razonable?

**R:** Usa tu propia experiencia y conocimiento para juzgarla.

Criterios de evaluación:
- si sigue las mejores prácticas
- si considera los casos límite
- si hay riesgos de seguridad potenciales
- si se ajusta al stack tecnológico del proyecto
- si el rendimiento es aceptable

Si no estás seguro, puedes:
- pedir a la IA que explique por qué sugiere ese enfoque
- pedir soluciones alternativas
- consultar con miembros del equipo

## P5: ¿Cómo debería un equipo usar la IA en colaboración?

**R:** Establecer convenciones compartidas y una base de conocimiento compartida.

Recomendaciones para la colaboración en equipo:
- compartir la configuración `CLAUDE.md` del proyecto
- unificar las convenciones y el estilo de código
- registrar soluciones a problemas comunes
- compartir regularmente prompts útiles
- verificar el código generado por la IA durante la revisión de código

## P6: ¿Cómo evito depender excesivamente de la IA?

**R:** Sigue aprendiendo y pensando. La IA es un asistente, no un reemplazo.

Recomendaciones:
- entiende el código generado por la IA en lugar de copiarlo a ciegas
- aprende activamente los conceptos que no entiendas
- revisa regularmente los conocimientos fundamentales
- intenta resolver problemas tú mismo primero, luego usa la IA para verificar
- participa en revisiones de código para aprender de la experiencia de otros

# 7. Resumen

A través de este capítulo, ahora has dominado:

1. **Límites de capacidad de la IA**: comprender en qué es buena y en qué no es buena la IA, y construir el modelo de colaboración correcto
2. **Estrategias por tipo de proyecto**: diferentes estrategias de desarrollo para proyectos nuevos, proyectos maduros, prototipos rápidos y proyectos de mantenimiento
3. **Flujos de trabajo de tareas comunes**: flujos de trabajo completos para desarrollo de nuevas funcionalidades, corrección de errores, refactorización de código y revisión de código
4. **Base de conocimiento del proyecto**: aprender a construir documentación del proyecto para que la IA pueda entender mejor tu proyecto
5. **Técnicas de colaboración**: formas prácticas de mejorar la eficiencia de colaboración con la IA

**Conclusiones clave:**

- **División clara de roles**: tú tomas decisiones y aseguras la calidad, la IA maneja la ejecución y la asistencia
- **Comunicación clara**: sé específico y haz una cosa a la vez
- **Verifica oportunamente**: no confíes a ciegas, prueba y verifica
- **Sigue aprendiendo**: entiende los límites de capacidad de la IA y mejora continuamente el modelo de colaboración

Recuerda: la IA es una herramienta, no un reemplazo. Puede hacerte más eficiente, pero la calidad final del código aún depende de tu juicio. Comienza con tareas simples y construye confianza gradualmente. Descubrirás que la IA puede ahorrarte mucho tiempo y dejarte enfocarte en un trabajo más valioso.

::: tip 💡 Siguiente paso
En el próximo capítulo, aprenderemos cómo usar la IA para la revisión de código y el aseguramiento de calidad para garantizar la mantenibilidad y seguridad del código.
:::
