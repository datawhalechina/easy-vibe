# Guía Completa de Claude Code Skills

## Introducción a Skills

**Claude Code Skills** es una función que empaqueta conocimiento especializado, flujos de trabajo y buenas prácticas en "paquetes de habilidades" reutilizables.

Puedes imaginar Skills como "libros de habilidades" equipados para Claude. Cuando necesitas que complete una tarea específica, ya no tienes que explicar los requisitos una y otra vez. En su lugar, puede ejecutar el trabajo directamente según los estándares predefinidos por el Skill.

### ¿Por qué necesitamos Skills?

Antes de que existieran Skills, usar Claude Code tenía varios problemas:

- **Instrucciones repetidas**: cada vez tenías que explicar cosas como "qué estilo de código seguir" y "cómo deberían escribirse los mensajes de commit"
- **El conocimiento no podía acumularse**: la experiencia individual de los miembros del equipo usando Claude no podía compartirse
- **Estándares inconsistentes**: diferentes personas usando Claude podían obtener resultados completamente distintos
- **Baja eficiencia**: las tareas comunes tenían que explicarse desde cero cada vez

Skills resuelve estos problemas y convierte a Claude en un "miembro experimentado del equipo" que conoce las convenciones de tu proyecto, flujos de trabajo y buenas prácticas.

---

## ¿Por qué aprender Skills ahora?

**Skills se está convirtiendo en una capacidad imprescindible para los ingenieros de IA**:

- **Alto interés de la comunidad**: los repositorios relacionados en GitHub están ganando estrellas rápidamente. Por ejemplo, el proyecto OpenSkills ya ha alcanzado 7.2k estrellas, y Obsidian Skills ganó 6.6k estrellas en solo 9 días
- **Soporte oficial**: Anthropic mantiene un repositorio oficial de Skills, y Vercel ha lanzado Agent Skills y la herramienta find-skills
- **Altamente práctico**: desde revisión de código y operaciones con Git hasta creación de videos y generación de PPTs, Skills cubre muchos escenarios. La plataforma skills.sh ya tiene skills populares con más de 60K suscripciones
- **Ganancias de eficiencia**: configura una vez, reutiliza repetidamente, y deja que Claude se convierta verdaderamente en tu "empleado digital"
- **Reconocimiento de desarrolladores**: recomendado por múltiples comunidades técnicas y ampliamente considerado como una herramienta clave para mejorar la eficiencia en programación con IA

---

## Inicio Rápido

Ahora que entiendes el valor de Skills, probémoslo de inmediato. Esta sección te guiará en la instalación de tu primer Skill y la realización de algunas tareas prácticas interesantes para que construyas intuición rápidamente.

### Paso 1: Instalar `find-skills` (muy recomendado)

Antes de comenzar a usar Skills, se recomienda encarecidamente que instales `find-skills` primero. Es la "herramienta de búsqueda de skills definitiva" en el mundo de los Agentes de IA y ya tiene más de 60K suscripciones.

**¿Qué es `find-skills`?**

En pocas palabras, `find-skills` es como un "motor de búsqueda de tienda de aplicaciones" para Agentes de IA. Cuando necesitas completar una tarea pero no tienes un Skill local adecuado, buscará automáticamente y recomendará el más apropiado.

**Instalar `find-skills`:**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

Después de la instalación, puedes decirle directamente a Claude lo que necesitas, y usará `find-skills` para buscar automáticamente los skills relevantes.

**Ejemplo de uso:**

```text
Necesito optimizar el rendimiento de un componente React. Ayúdame a encontrar qué skills puedo usar.
```

Claude buscará a través de `find-skills` y te dirá qué skills relevantes encontró para que elijas uno para instalar.

**¿Por qué instalar `find-skills` primero?**

Antes de `find-skills`:
- buscar manualmente en GitHub skills relacionados
- copiar, instalar y configurar uno por uno
- depurar y adaptar repetidamente

Después de `find-skills`:
- describir el requisito en una frase
- la IA busca automáticamente el skill que mejor coincide
- instalar con un clic y usarlo de inmediato

**Nota para usuarios de Windows**: la versión oficial tiene soporte limitado para Windows. La comunidad ha creado una versión compatible con Windows que soporta CMD y PowerShell y añade búsqueda en chino.

Descarga la versión de Windows: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Pasos de instalación:
1. Descarga la versión de Windows de `SKILL.md`
2. Reemplaza el archivo en `C:/Users/your-username/.agents/skills/find-skills`
3. Reinicia Claude Code y surtirá efecto

**Enlaces relacionados**:
- [Sitio web oficial de Skills](https://skills.sh/) - navega todos los skills disponibles
- [Repositorio de find-skills](https://github.com/vercel-labs/agent-skills) - código fuente oficial

### Instalar y Probar tu Primer Skill

Después de instalar `find-skills`, usémoslo para buscar e instalar un primer Skill divertido: la herramienta de creación de videos Remotion.

#### Paso 1: Usar `find-skills` para buscar Remotion

Escribe esto en Claude Code:

```text
Ayúdame a encontrar skills relacionados con Remotion. Quiero hacer videos.
```

Claude buscará a través de `find-skills` y recomendará `remotion-dev/skills`.

#### Paso 2: Instalar Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### Paso 3: Úsalo para crear algo divertido

Remotion es un framework para hacer videos con código React. Después de instalar este Skill, puedes pedirle a Claude en lenguaje natural que te ayude a escribir código de video.

**Tarea 1: Hacer un video de texto animado genial**

```text
Usa Remotion para hacer un video:
- 1920x1080, 5 segundos
- Una línea de texto "Hello World" vuela desde la izquierda
- Con efectos de rotación y escalado al mismo tiempo
- El fondo es un degradado
```

Claude generará código Remotion completo, y podrás ejecutarlo para ver la animación.

**Tarea 2: Hacer un video de visualización de datos**

```text
Haz un video de 10 segundos mostrando el crecimiento de datos:
- Comienza con un gráfico de barras
- Las barras crecen una a una con animación
- Los números cuentan hacia arriba
- Al final, muestra texto grande diciendo "300% de crecimiento"
```

**Tarea 3: Hacer un video de demostración de producto con múltiples escenas**

```text
Haz un video de demostración de producto con tres escenas:
Escena 1: El logo aparece con fundido, 2 segundos
Escena 2: Las características del producto aparecen una a una, 3 segundos
Escena 3: Aparece un botón CTA, 2 segundos
Usa transiciones suaves entre cada escena
```

**Ejecutar el código**:

El código que Claude genera es un proyecto Remotion completo. Puedes:

1. Crear un nuevo proyecto: `npx create-video my-video`
2. Copiar el código generado por Claude en él
3. Ejecutar una vista previa: `npm start`
4. Renderizar el video: `npm run build`

---

### El Segundo Skill: Usar `find-skills` para resolver "el frontend se ve feo y se siente lento"

#### Paso 1: Describe tu problema en lenguaje natural

Dile directamente a Claude tu necesidad de alto nivel:

```text
Mi sitio web se ve anticuado y carga lentamente. Ayúdame a encontrar qué skills puedo usar.
```

O sé un poco más específico:

```text
Quiero que el frontend se vea mejor y deje de ser tan lento.
```

#### Paso 2: Claude buscará con `find-skills`

Claude buscará en la base de datos de skills.sh a través de `find-skills` y recomendará skills relacionados. Para un requisito como "hacer que se vea mejor + reducir la lentitud", recomendará:

**anthropics/skills/frontend-design** (skill oficial)

Este skill está diseñado específicamente para resolver el problema de las interfaces generadas por IA que "se ven simples y genéricas", ayudando a Claude a diseñar:

- estilos visuales únicos que evitan el mismo "aspecto de plantilla de IA" de siempre
- esquemas de color y tipografía profesionales
- efectos de animación fluidos
- calidad de código de producción, con código limpio y naturalmente mejor rendimiento

#### Paso 3: Instalarlo y usarlo

**Instalar**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Tareas que puedes completar con él**:

```text
Ayúdame a rediseñar esta página. Quiero que se vea muy profesional y no como si hubiera sido generada por IA.
```

```text
Esta interfaz es muy fea. Reescríbela con un estilo de diseño más moderno.
```

```text
Haz un panel de control con tema oscuro con un fuerte aspecto tecnológico.
```

Claude seguirá las convenciones de este skill y te ayudará a diseñar:
- una dirección visual única como minimalismo, retro-futurismo o brutalismo
- colores y fuentes cuidadosamente elegidos
- espaciado y diseño razonables
- animación interactiva fluida

---

### Comparando los Dos Skills

| Skills | ¿Qué problema resuelve? | Factor de diversión |
|--------|------------------------|---------------------|
| **remotion-dev/skills** | Hacer videos con código | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Hacer que el frontend se vea mejor | ⭐⭐⭐⭐ |

---

### El Tercer Skill: Usar `frontend-slides` para hacer rápidamente presentaciones PPT hermosas

#### Introducción

**frontend-slides** es un Skill que te permite crear hermosas presentaciones HTML con lenguaje natural, incluso si no conoces CSS ni JavaScript.

Su idea central es "**mostrar, no contar**". Si no puedes describir claramente el estilo de diseño que deseas, generará 3 vistas previas visuales para que elijas, en lugar de obligarte a describir requisitos abstractos como "fondo azul, fuente grande".

#### Instalar `frontend-slides`

**Método 1: Instalar manualmente**

```bash
# Crear el directorio del skill
mkdir -p ~/.claude/skills/frontend-slides

# Descargar archivos (o copiar desde GitHub)
# 1. Visita https://github.com/zarazhangrui/frontend-slides
# 2. Descarga SKILL.md y STYLE_PRESETS.md
# 3. Colócalos en ~/.claude/skills/frontend-slides/
```

**Método 2: Instalar con `find-skills`**

```text
Ayúdame a encontrar un skill para hacer presentaciones PPT
```

Claude buscará a través de `find-skills` y recomendará `frontend-slides`.

#### Escenarios de uso

**Escenario 1: Crear una presentación desde cero**

```text
/frontend-slides

Quiero crear una presentación de pitch deck para recaudar fondos para un proyecto de startup de IA, alrededor de 10 diapositivas
```

Claude te guiará para:
1. completar el contenido de cada diapositiva como títulos, viñetas e imágenes
2. describir la sensación que deseas como impresionante, profesional o cálido
3. elegir entre 3 vistas previas de estilo visual
4. crear la presentación HTML completa
5. abrir una vista previa en el navegador

**Escenario 2: Convertir un archivo de PowerPoint**

```text
/frontend-slides

Convierte mi presentacion.pptx en una presentación web
```

Claude:
1. extraerá todo el texto, imágenes y notas del PPT
2. mostrará el contenido extraído para que lo confirmes
3. te dejará elegir un estilo visual
4. generará una presentación HTML que conserva todo el contenido original

**Escenario 3: Generar rápidamente vistas previas de estilos**

```text
/frontend-slides

Quiero hacer un PPT para una charla técnica. Muéstrame los estilos visuales disponibles primero.
```

Claude generará directamente 3 páginas de vista previa en diferentes estilos:
- **Temas oscuros**: Neon Cyber, Terminal Green, Deep Space
- **Temas claros**: Paper & Ink, Swiss Modern, Soft Pastel
- **Estilos especiales**: Brutalist, Gradient Wave

#### Estilos visuales integrados

| Nombre del estilo | Características | Escenarios adecuados |
|-------------------|----------------|---------------------|
| **Neon Cyber** | Sensación tecnológica futurista, efectos de partículas | Charlas técnicas, productos de IA |
| **Midnight Executive** | Negocios de alta gama, confiable | Informes de negocios, pitch decks de recaudación |
| **Paper & Ink** | Estilo editorial, atmósfera literaria | Creación de contenido, compartir educativo |
| **Swiss Modern** | Geometría limpia, estilo Bauhaus | Portafolios de diseño, minimalismo |
| **Brutalist** | Crudo, audaz, llamativo | Exhibición artística, expresión personal |

#### Resultado de salida

La presentación generada es un documento **HTML de archivo único** que incluye:

- código de estilos e interacción completo
- navegación con teclado mediante flechas y barra espaciadora
- soporte táctil y deslizamiento
- cambio de diapositivas con rueda del ratón
- barras de progreso y puntos de navegación
- animación activada por desplazamiento
- diseño responsivo

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Todos los estilos están inline, cero dependencias -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Tu Título</h1>
    </section>
    <!-- Más diapositivas... -->
</body>
</html>
```

#### ¿Por qué lo recomendamos?

1. **Cero dependencias**: un solo archivo HTML que seguirá abriéndose dentro de 10 años
2. **Descubrimiento visual**: no necesitas describir el diseño, solo elige lo que te gusta
3. **Conversión de PPT**: conserva tu contenido existente y dale una mejor apariencia visual
4. **Código de nivel producción**: accesible, claramente comentado y fácil de personalizar

**Enlaces relacionados**:
- [Repositorio de GitHub de frontend-slides](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ estrellas
- [Ejemplo de vista previa en línea](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### Comparando los Tres Skills

| Skills | ¿Qué problema resuelve? | Factor de diversión | Practicidad |
|--------|------------------------|---------------------|-------------|
| **remotion-dev/skills** | Hacer videos con código | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Hacer que el frontend se vea mejor | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Hacer rápidamente PPTs hermosos | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### Cómo usarlos después de la instalación

Después de la instalación, no necesitas ninguna configuración adicional. Cuando pidas a Claude que realice una tarea relacionada, llamará automáticamente al Skill correspondiente.

Ver Skills instalados:

```bash
npx skills list
```

---

## ¿Qué son Skills?

### Concepto central

**Skills son "paquetes de habilidades" almacenados en el sistema de archivos** y pueden incluir:

- **SKILL.md**: el archivo de definición del skill, obligatorio
- **scripts/**: scripts auxiliares, opcional
- **templates/**: plantillas de salida, opcional
- **references/**: documentos de referencia, opcional

### Skills vs. prompts

Puede que te preguntes: ¿cuál es la diferencia entre Skills y enviar prompts directamente a Claude?

| Prompts | Skills |
|---------|--------|
| Temporales, tienes que repetirlos cada vez | Persistentes, se escriben una vez y se reutilizan muchas veces |
| Viven en el historial de conversación y consumen tokens | Se cargan bajo demanda y ahorran tokens |
| No se pueden compartir entre sesiones | Se pueden compartir dentro de un equipo |
| Difíciles de controlar versiones | Se pueden gestionar con Git |

### Dos tipos de Skills

**Skills Globales (personales)**:
- ubicación de almacenamiento: `~/.claude/skills/`
- alcance: todos los proyectos
- escenarios adecuados: habilidades personales de uso general

**Skills de Proyecto (equipo)**:
- ubicación de almacenamiento: `directorio-del-proyecto/.claude/skills/`
- alcance: el proyecto actual
- escenarios adecuados: compartir en equipo y convenciones específicas del proyecto

### Cómo funcionan Skills

Cuando Claude Code se inicia:

1. escanea los directorios de Skills
2. analiza cada archivo `SKILL.md`
3. extrae los metadatos del YAML frontmatter
4. añade el contenido del skill a su "base de conocimientos"
5. coincide automáticamente con los triggers basándose en la descripción

---

## Estructura del Archivo `SKILL.md`

### Estructura básica

Un directorio de Skill completo se ve así:

```text
my-skill/
├── SKILL.md          # Obligatorio: archivo de definición del skill
├── scripts/          # Opcional: scripts auxiliares
├── templates/        # Opcional: plantillas de salida
├── references/       # Opcional: documentos de referencia
└── examples/         # Opcional: archivos de ejemplo
```

### Plantilla `SKILL.md`

El archivo `SKILL.md` tiene dos partes:

**Parte 1: YAML Frontmatter (metadatos)**

```yaml
---
name: skill-name              # Nombre del Skill, se convierte en el comando /skill-name
description: short description # Usado para la coincidencia automática de triggers de Claude
category: development         # Categoría
tags:                         # Etiquetas
  - code
  - automation
---
```

**Parte 2: Contenido Markdown (instrucciones)**

```markdown
# Título del Skill

## Casos de uso
Cuándo usar este skill

## Pasos de ejecución
1. Paso uno
2. Paso dos

## Notas
- Nota 1
- Nota 2
```

### Explicación de campos clave

| Campo | Obligatorio | Explicación |
|-------|------------|-------------|
| `name` | Sí | El nombre del skill. Solo se permiten letras minúsculas, números y guiones |
| `description` | Sí | La descripción del skill. Cuanto más específica sea, más fácil será para Claude coincidir automáticamente |
| `category` | No | Etiqueta de categoría |
| `tags` | No | Etiquetas de categoría adicionales |
| `allowed-tools` | No | Herramientas que pueden usarse sin permisos adicionales |

---

## Skills vs. MCP: ¿Cuál es la diferencia?

Muchos principiantes confunden Skills y MCP, pero son cosas completamente diferentes.

### Diferencias principales

| Dimensión | Skills | MCP |
|-----------|--------|-----|
| **Naturaleza** | Conocimiento y flujo de trabajo | Herramientas e interfaces |
| **Qué proporciona** | Le dice a la IA "cómo hacerlo" | Le da a la IA "qué puede usar" |
| **Ubicación de almacenamiento** | Directorio `skills/` | Servidor MCP |
| **Formato de configuración** | Archivos Markdown | Archivos de configuración JSON |
| **Método de activación** | `/skill-name` o reconocimiento automático | Cargado automáticamente a través de configuración |

### Una analogía intuitiva

Si Claude fuera un "trabajador":

- **MCP** serían las "herramientas" dadas al trabajador, como una llave inglesa, un ordenador y permisos de acceso
- **Skills** serían el "manual de operaciones" dado al trabajador, como cómo hacer revisión de código o cómo enviar código

### Su relación

Skills y MCP no compiten entre sí. Son complementarios:

```text
Tarea del usuario -> Claude reconoce el requisito
               ↓
        Carga Skills relevantes (sabe cómo hacerlo)
               ↓
        Llama herramientas a través de MCP (tiene herramientas disponibles)
               ↓
        Completa la tarea
```

### Ejemplo

**Escenario: revisión de código**

- **Skills** definen los pasos de revisión, la lista de verificación y el formato de salida
- **MCP** proporciona la capacidad de acceder a PRs de GitHub y obtener diffs de código

Trabajando juntos: Skills le dicen a Claude "cómo revisar", y MCP le da a Claude "la capacidad de acceder al código".

### Recomendación para elegir

| Tu necesidad | Solución recomendada |
|-------------|---------------------|
| Necesitas definir un flujo de trabajo | Usa Skills |
| Necesitas acceder a datos externos | Usa MCP |
| Necesitas ambos | Úsalos juntos |

---

## Recursos Comunes para Obtener Skills

### Recursos oficiales

- [Repositorio oficial de Skills de Anthropic](https://github.com/anthropics/skills) - una colección de skills mantenida oficialmente
- [Documentación oficial de Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - documentación oficial

### Recursos de la comunidad de GitHub

| Repositorio | Descripción |
|-------------|-------------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Mantenido por Boris Cherny, jefe de Claude Code, incluyendo Skills, Agents, Hooks y más |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Kit de herramientas completo incluyendo Skills preconfigurados |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Lista curada de recursos de Skills |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 skills profesionales y 300+ documentos de referencia |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Colección seleccionada de código abierto |

### Cómo instalar Skills de la comunidad

Usando `find-skills`, solo necesitas decirle a Claude lo que necesitas, y buscará y recomendará automáticamente:

```text
Ayúdame a encontrar un skill relacionado con la optimización de rendimiento en React
```

Claude buscará en la base de datos de skills.sh a través de `find-skills`, luego listará los skills más relevantes, y podrás elegir uno para instalar.

**Consejos de búsqueda**:

- usa palabras clave específicas: `"react testing"` es mejor que `"testing"`
- combina "dominio + acción": `"nextjs deploy"`, `"typescript lint"`
- prioriza skills con alto número de instalaciones, ya que 10K+ generalmente significa probados en combate
- vigila la lista de tendencias para descubrir skills emergentes

---

## Cómo Crear tus Propios Skills

Hay dos formas de crear Skills: pedirle directamente a Claude que cree uno por ti, o usar la herramienta dedicada `skill-creator`.

### Método 1: Pedir directamente a Claude que te ayude a crear uno

Este es el enfoque más simple. Solo dile a Claude tu requisito en lenguaje natural.

**Ejemplo**:

```text
Por favor ayúdame a crear un skill llamado "format-code" para formatear código automáticamente.

Requisitos:
1. Detectar automáticamente el lenguaje de programación
2. Aplicar las reglas de formato correspondientes
3. Devolver el diff antes y después del formateo
```

Claude automáticamente:
1. creará la estructura de directorios
2. generará el archivo `SKILL.md`
3. completará el YAML frontmatter
4. escribirá el contenido del skill

**Escenarios adecuados**:
- crear rápidamente skills simples
- sabes lo que quieres pero no estás familiarizado con el formato `SKILL.md`
- quieres iterar y modificar rápidamente

### Método 2: Usar `skill-creator`

`skill-creator` es una herramienta dedicada para crear Skills. Te guía paso a paso a través del proceso.

**Instalar**:

```bash
npx skills add anthropics/skills@skill-creator -g
```

O instala el repositorio completo de skills oficiales:

```bash
npx skills add anthropics/skills -g
```

**Usar**:

```text
/skill-creator
```

Luego completa los campos:
- nombre del skill
- descripción de funcionalidad
- escenarios de uso
- pasos de ejecución

`skill-creator`:
1. te guiará para aclarar el propósito del skill
2. generará un borrador de `SKILL.md`
3. creará casos de prueba
4. ejecutará la evaluación y lo optimizará

**Escenarios adecuados**:
- crear skills complejos
- necesitar un proceso de creación más estándar
- querer probar y verificar el skill

### Comparación de los dos métodos

| Método 1: Creación directa | Método 2: `skill-creator` |
|---------------------------|--------------------------|
| Rápido y simple | Pasos guiados |
| Adecuado para skills simples | Adecuado para skills complejos |
| Completado directamente en la conversación | Proceso estandarizado |
| Modificación flexible | Incluye pruebas y verificación |

### Consejo: cómo escribir un buen requisito

**Una buena descripción de requisito**:

```text
Crea un skill "git-commit" que haga commit del código automáticamente.

Pasos de ejecución:
1. Verificar qué archivos fueron modificados
2. Generar un mensaje de commit que siga Conventional Commits
3. Ejecutar git commit
4. Preguntar si se debe hacer push

Notas:
- Verificar información sensible antes de hacer commit
- No hacer commit de directorios como dist/ o node_modules/
```

**Una mala descripción de requisito**:

```text
Ayúdame a escribir un skill para hacer commit de código
```

Eso es demasiado vago. Claude no sabrá exactamente qué necesita hacer.

---

## Ejemplos de Skills Comunes

### Ejemplo 1: Skill de Revisión de Código

Crea el directorio y archivo:

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

Cómo usarlo:

```text
/review-pr
Por favor revisa el PR de la rama actual
```

### Ejemplo 2: Skill de Auto-Commit de Git

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

Cómo usarlo:

```text
/git-commit
```

### Ejemplo 3: Skill de Generación de Tests

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

Cómo usarlo:

```text
/gen-test
Genera tests unitarios para src/utils.ts
```

### Ejemplo 4: Skill de Generación de Documentación

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

Cómo usarlo:

```text
/gen-readme
Genera un documento README para el proyecto actual
```

---

## Consejos Avanzados

### Combinar Skills con Hooks

Los Hooks pueden realizar acciones automáticamente en eventos específicos. Combinados con Skills, permiten una automatización más potente.

Por ejemplo, formatear código automáticamente después de guardar:

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // Llamar al skill format-code
      }
    }]
  }
}
```

### Combinar Skills con Comandos

Los Comandos son comandos de acceso directo simples. Los Skills son flujos de trabajo complejos. Pueden usarse juntos.

### Colaboración en equipo

**Compartir Skills de proyecto**:

1. coloca los Skills bajo `.claude/skills/`
2. haz commit de ellos a Git
3. los miembros del equipo pueden usarlos después de clonar el proyecto

**Control de versiones**:

- los Skills pueden controlarse por versiones igual que el código
- cada commit puede registrar cambios en los Skills
- puedes revertir a versiones anteriores

---

## Preguntas Frecuentes

### P1: ¿Por qué no se activó el Skill?

Posibles razones:
- el formato del YAML frontmatter es incorrecto
- la descripción no es lo suficientemente específica
- Claude Code no se reinició

Cómo solucionarlo:
- verifica si el formato YAML es correcto
- mejora la descripción e incluye escenarios de uso específicos
- reinicia Claude Code

### P2: ¿Cómo escribo una descripción precisa?

Una buena descripción incluye:
- la función específica del skill
- el escenario de uso, como "cuando el usuario menciona..."
- palabras clave de activación

**Ejemplo malo**:
```text
description: Revisar código
```

**Ejemplo bueno**:
```text
description: Revisar código de Pull Request. Se activa cuando el usuario menciona PR, revisión o revisión de código.
```

### P3: ¿Cuál es la diferencia entre Skills y Comandos?

| Comandos | Skills |
|----------|--------|
| Comandos de acceso directo simples | Flujos de trabajo completos |
| Un solo archivo `.md` | Una estructura de directorios (`SKILL.md` + archivos opcionales) |
| Activados manualmente | Pueden activarse automáticamente |
| Adecuados para operaciones simples | Adecuados para procesos complejos |

### P4: ¿Cómo depuro un Skill?

1. Usa `/skills` para verificar si el skill fue reconocido
2. Ingresa directamente el nombre del skill para activarlo manualmente
3. Verifica si el contenido de `SKILL.md` es correcto
4. Revisa los registros de Claude Code

---

## Referencias

### Recursos oficiales

- [Documentación oficial de Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Estándar Agent Skills](https://agentskills.io/)
- [Artículo de ingeniería de Anthropic (ideas prácticas detrás de Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Repositorio de GitHub de Skills oficiales de Anthropic](https://github.com/anthropics/skills)
- [Documentación de VS Code Copilot Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Directorios de recursos

- [skills.sh](https://skills.sh/) - Tienda de Agent Skills de Vercel con una biblioteca de más de 48,000 skills
- [find-skills](https://github.com/vercel-labs/agent-skills) - Herramienta de búsqueda inteligente de skills con más de 60K suscripciones
- [Marketplace de Skills (interfaz en chino)](https://skillsmp.com/zh) - descubre e instala Skills de la comunidad

### Proyectos de la comunidad en GitHub

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Colección oficial de Agent Skills de Vercel Labs, incluyendo find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Mejores prácticas oficiales mantenidas por Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Kit de herramientas completo incluyendo Skills preconfigurados
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Lista curada de recursos de Skills seleccionados
- [superpowers](https://github.com/obra/superpowers) - Colección de Skills para flujos de trabajo de automatización de desarrollo de software
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 skills profesionales y 300+ documentos de referencia
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - Lista curada de recursos

### Ejemplos de Skills oficiales

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - un skill para crear nuevos skills
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - un skill para construir servidores MCP
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - un skill para crear GIFs de Slack

### Tutoriales en chino

- [Guía completa de configuración avanzada de Claude Code y consejos de uso](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - práctica de cadena completa con CLAUDE.md, Skills y Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Guía paso a paso para personalizar Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Lectura Adicional: El Mecanismo Interno de Claude Skills

A continuación, profundizaremos en cómo funcionan internamente los Claude Skills, para que no solo sepas cómo usarlos, sino que también entiendas por qué están diseñados de esta manera.

### Vista de primeros principios: inyección de contexto dinámica basada en prompts

Primero, entiende un hecho clave: **Skills no son código ejecutable**.

Skills son esencialmente instrucciones avanzadas, o prompts, que se "inyectan" en el contexto de Claude cuando se necesitan. Este diseño se llama "**Inyección de Contexto Dinámica Basada en Prompts y Arquitectura de Meta-Herramientas**".

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ User Request│ ───> │ LLM Matches │ ───> │ Trigger Skill│
└─────────────┘      │Description  │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Inject Full  │
                                          │ Instructions │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Execute Task │
                                          └──────────────┘
```

### Arquitectura de carga progresiva de tres capas (optimización de tokens)

Para manejar una gran cantidad de Skills sin consumir demasiados tokens, Claude usa un inteligente mecanismo de carga de tres capas:

| Capa | Contenido | Cuándo se carga | Costo de tokens |
|------|-----------|----------------|-----------------|
| **Capa 1: Metadatos** | YAML frontmatter (`name + description`) | Cuando Claude se inicia | ~30-50 tokens/skill |
| **Capa 2: Instrucciones** | Contenido completo de `SKILL.md` | Cuando se activa el Skill | ~5,000 tokens |
| **Capa 3: Recursos** | Scripts, plantillas, referencias | Accedidos desde el sistema de archivos bajo demanda | No se añaden al contexto |

**Ventajas de este diseño**:

- Supón que tienes 100 Skills. Al inicio, solo se consumen unos 3,000-5,000 tokens para metadatos
- Solo el Skill activado carga su contenido completo
- Los archivos de recursos como documentos de referencia nunca se cargan completamente en el contexto

**Comparado con no tener Skills**:

```text
Sin Skills: cada conversación necesita 50,000+ tokens para describir todas las capacidades
Con Skills: inicio ~100 tokens/skill + 5,000 tokens cargados bajo demanda
Ahorro: un promedio de 40,000+ tokens ahorrados por conversación
```

### Mecanismo de doble inyección de contexto

Cuando se activa un Skill, el sistema realiza dos modificaciones simultáneamente:

**1. Inyección en el contexto de conversación**

```javascript
// Lo que ve el usuario (mensaje visible)
<command-message>The "pdf" skill is loading</command-message>

// Lo que la IA realmente recibe (meta-mensaje oculto)
{
  isMeta: true,  // marcado como meta-mensaje, no se muestra en la UI
  content: `
    # Instrucciones del Experto en Análisis de PDF

    Eres un experto profesional en análisis de PDF. Flujo de trabajo:
    1. Usa pdftotext para extraer texto
    2. Analiza la estructura del documento
    3. Genera un informe resumido
    ...
  `  // contenido completo de SKILL.md, posiblemente miles de palabras
}
```

**2. Modificación del contexto de ejecución**

Además de inyectar instrucciones, un Skill también puede modificar dinámicamente el entorno de Claude:

| Tipo de modificación | Ejemplo | Explicación |
|---------------------|---------|-------------|
| **Permisos de herramientas** | `allowed-tools: "Bash(pdftotext:*)"` | Concede temporalmente acceso a una herramienta específica |
| **Cambio de modelo** | Cambiar de Sonnet a Opus | Algunas tareas complejas requieren razonamiento más fuerte |
| **Aislamiento de contexto** | Crear un espacio de sesión hijo | Evita contaminar el contexto de la conversación principal |

### Un mecanismo de enrutamiento basado enteramente en razonamiento LLM

Esta es una decisión de diseño muy importante: **Claude Skills no usa enrutamiento hardcoded**.

| Enfoque tradicional | Claude Skills |
|--------------------|---------------|
| ❌ Coincidencia de vectores de embedding | ✅ Razonamiento LLM puro |
| ❌ Clasificador | ✅ Paso forward del Transformer |
| ❌ Regex o coincidencia de palabras clave | ✅ Comprensión de lenguaje natural |
| ❌ Algoritmo de enrutamiento separado | ✅ Toma de decisiones unificada del modelo |

**Flujo de trabajo**:

```text
1. El nombre y la descripción de cada Skill se formatean en la descripción de la herramienta Skill

2. Claude recibe:
   - el mensaje del usuario
   - la lista de herramientas disponibles, incluyendo la meta-herramienta Skill
   - la lista de Skills, con nombre + descripción

3. La comprensión de lenguaje natural de Claude coincide la intención del usuario con una descripción de Skill

4. Cuando la coincidencia tiene éxito, llama: command: "skill-name"
```

**¿Por qué diseñarlo así?**

**El enrutamiento hardcoded requiere**:
- costo de mantenimiento adicional
- sin capacidad para entender relaciones semánticas complejas
- dificultad para manejar múltiples idiomas
- sin soporte para coincidencia fuzzy

**Razonamiento LLM puro**:
- aprovecha la propia comprensión del lenguaje de Claude
- maneja automáticamente múltiples idiomas, sinónimos y descripciones fuzzy
- no requiere mantenimiento adicional
- hace que las decisiones de enrutamiento sean más inteligentes

### Mecanismo de análisis de archivos

**Estructura del archivo `SKILL.md`**:

```bash
my-custom-skill/
├── SKILL.md              # Obligatorio: archivo de definición central
├── config.json           # Opcional: configuración de metadatos
├── README.md             # Recomendado: documentación de uso
├── scripts/              # Opcional: scripts ejecutables
├── templates/            # Opcional: carpeta de plantillas
└── references/           # Opcional: documentos de referencia
```

**Flujo de análisis**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    Inicio de Claude Code                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Escanear directorios ~/.claude/skills/ y .claude/skills/    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Usar la biblioteca gray-matter para analizar cada SKILL.md │
│  YAML frontmatter                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Validar campos obligatorios (name y description)            │
│  - name: máx 64 caracteres, solo letras minúsculas,         │
│    números y guiones                                        │
│  - description: usado para coincidencia automática del LLM  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Extraer metadatos y construir la lista de Skills            │
│  (solo cargar name + description, no el cuerpo completo)    │
└─────────────────────────────────────────────────────────────┘
```

### Ejemplo del flujo de ejecución completo

Veamos el flujo completo a través de un ejemplo concreto:

```text
Usuario: "Ayúdame a analizar este archivo PDF"

═══════════════════════════════════════════════════════════════

Paso 1: Decisión del LLM
────────────────
Claude encuentra la descripción del skill "pdf" en la lista de Skills:
  description: "Analizar contenido de documentos PDF, extraer texto, generar un resumen"

═══════════════════════════════════════════════════════════════

Paso 2: Intervención del sistema
────────────────
Claude Code ejecuta:
  1. Leer ~/.claude/skills/pdf/SKILL.md
  2. Generar un mensaje visible: "El skill pdf se está cargando"
  3. Generar un meta-mensaje oculto: el contenido completo de SKILL.md
  4. Modificar permisos de sesión: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Paso 3: Ejecución del LLM
────────────────
Ahora el contexto de Claude contiene:
  - la solicitud original del usuario
  - las instrucciones del flujo de trabajo experto en PDF
  - permiso de acceso a la herramienta pdftotext

Claude ejecuta:
  1. Usar pdftotext para extraer el texto del PDF
  2. Analizar la estructura del contenido
  3. Generar un informe resumido
  4. Presentar el resultado al usuario

═══════════════════════════════════════════════════════════════

Paso 4: Eliminación después del uso
────────────────
Después de completar la tarea, el contenido completo del Skill se elimina del contexto
(solo permanece el historial de conversación, no la instrucción completa del Skill)
```

### Innovaciones de diseño central

| Innovación | Enfoque tradicional | Enfoque Skills | Ventaja |
|-----------|--------------------|----------------|---------|
| **Fuente de capacidad** | Fijada en los pesos del modelo | Prompts cargados dinámicamente | Extensible y actualizable |
| **Eficiencia de tokens** | Todas las capacidades siempre en memoria | Carga bajo demanda | Ahorra 80%+ tokens |
| **Gestión del conocimiento** | Dispersa en el historial de conversación | Sistema de archivos modular | Controlable por versiones y compartible |
| **Ciclo de vida** | Ocupa espacio continuamente | Eliminación después del uso | Contexto más limpio |

### Fundamentos académicos

El diseño de Claude Skills se basa en las siguientes investigaciones:

| Campo de investigación | Trabajo representativo | Aplicado aquí como |
|----------------------|----------------------|-------------------|
| **Aprendizaje por refuerzo** | Voyager (2023) | La idea de acumular una biblioteca de skills |
| **Arquitectura cognitiva** | ACT-R, Soar | Separación de memoria procedimental y memoria declarativa |
| **Política jerárquica** | Options Framework | Carga progresiva de tres capas |

**Cambio central de pensamiento**:

```text
Tradicional: la IA necesita recordar todo
      ↓
Skills: la IA sabe dónde encontrar conocimiento especializado
      ↓
Resultado: más parecido al patrón de pensamiento de un experto humano
```

### Relación con el estándar Agent Skills

Claude Skills sigue el [estándar abierto Agent Skills](https://agentskills.io/), lo que significa:

- ✅ Compatibilidad multiplataforma: herramientas como Cursor, Windsurf y Aider también lo soportan
- ✅ Formato de archivo unificado: estructura `SKILL.md` estandarizada
- ✅ Interoperabilidad: los Skills pueden compartirse entre diferentes herramientas

```text
El estándar Agent Skills define:
├── Obligatorio: archivo SKILL.md (metadatos + instrucciones)
├── Opcional: scripts/ (código ejecutable)
├── Opcional: references/ (documentos de base de conocimientos)
└── Opcional: assets/ (plantillas y recursos)
```

### Resumen: ¿por qué este diseño es brillante?

1. **Desacopla la capacidad del modelo**: el conocimiento especializado ya no depende del entrenamiento del modelo y puede actualizarse en cualquier momento a través de archivos Markdown

2. **Eficiencia extrema de tokens**: el mecanismo de carga de tres capas asegura que solo se cargue el contenido necesario

3. **Usa las propias fortalezas del LLM**: el enrutamiento y la coincidencia dependen completamente de la comprensión del lenguaje de Claude, sin algoritmo adicional necesario

4. **Amigable para desarrolladores**: crear un Skill solo requiere escribir Markdown, no programar

5. **Componible**: los Skills pueden referenciarse y combinarse entre sí para formar flujos de trabajo complejos

6. **Eliminación después del uso**: se limpia automáticamente después de completar y mantiene el contexto fresco

---

### Resumen

Skills son la clave para convertir Claude Code de un "asistente general" en un "experto de equipo".

A través de Skills, puedes:
- estandarizar flujos de trabajo
- reutilizar conocimiento del equipo
- mejorar la eficiencia de colaboración
- reducir explicaciones repetidas

Recuerda: **si te encuentras repitiendo la misma instrucción dos veces, deberías considerar crear un Skill**.

Ahora ve y crea tu primer Skill.
