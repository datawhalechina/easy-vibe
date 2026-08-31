<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['es-es/stage-2/frontend/ui-design'] ?? []
</script>

# Construye tu primera aplicación moderna - Diseño de UI

¿Recuerdas la sensación cuando viste por primera vez una página de producto bellamente diseñada? Aunque las funciones son prácticamente las mismas, la página de los demás siempre se ve más "premium": colores limpios, espaciado cómodo, esquinas redondeadas perfectas en los botones. No puedes evitar pensar: **"¿Cómo la diseñaron? ¿Podemos hacer nosotros también una página así?"**

Ese impulso de "querer descubrir cómo lo hacen los demás" es precisamente el mejor punto de partida para el diseño frontend. Antes de empezar a trabajar, repasemos las capacidades que ya dominamos:

- En las lecciones anteriores aprendimos a usar NanoBanana para generar activos de diseño en lote, y comprendimos cómo el "estilo" del prompt afecta al resultado final;
- Conocimos herramientas de diseño profesionales como Figma y MasterGo, y entendimos cómo está organizado un archivo de diseño;
- También vimos el flujo de conversión de un diseño a código frontend.

Pero cuando realmente quieres hacer una página presentable para tu propio proyecto, quizá te sigas atascando: sabes usar las herramientas, puedes generar activos, pero **no sabes cómo se ve lo "bonito", y mucho menos cómo desglosar e imitar una página excelente**. No te preocupes, esta lección está pensada precisamente para resolver ese problema.

Para ayudarte a conectar los contenidos anteriores, puedes reflexionar primero sobre algunas preguntas:

1. ¿De qué secciones suele estar compuesta una página web moderna?
2. ¿"Bonito" es una sensación subjetiva, o se puede cuantificar en números (valores de color, tamaño de fuente, espaciado, radio de borde)?
3. Si te pidieran imitar el estilo visual de un sitio web, ¿por dónde empezarías?

Si aún no tienes respuestas claras a estas preguntas, no importa: eso es exactamente lo que te enseñará esta lección. Si durante la práctica encuentras pasos difíciles de entender, no dudes en hacer una captura de pantalla de la página actual y enviársela al modelo de lenguaje grande; atrévete a experimentar y no temas equivocarte, cada intento es una oportunidad de aprender y avanzar.

::: tip 🎯 Pregunta central
**Ante una APP o página web bellamente diseñada, ¿cómo analizar cómo fue diseñada y, con la ayuda de herramientas de diseño de IA, replicarla hasta que sea "indistinguible de la original"?**
:::

---

## Lo que aprenderás en esta lección

1. **Aprender a "ver" el diseño**: al obtener una página, saber qué mirar y cómo desglosarla
2. **Dominar la metodología de iniciación**: buscar referencias → analizar → imitar → lograr parecerse → iniciarse
3. **Conocer 2 rutas de diseño**: Figma/MasterGo y Claude Design/Open Design (incluidos los UI design Skills)
4. **Práctica de réplica**: elegir una página web real y replicarla desde cero hasta una entrega de alta fidelidad
5. **Consolidar un sistema de diseño**: convertir las especificaciones de las grandes empresas en las tuyas propias

::: tip 📚 Conocimientos previos
Este tutorial está pensado para desarrolladores que ya saben usar herramientas de programación con IA (como Trae) y quieren completar las capacidades visuales del frontend de sus proyectos. Si quieres desarrollar primero el "sentido" de generación de imágenes, te recomendamos estudiar primero [Producción de activos con NanoBanana](../lovart-assets/); si quieres profundizar en las herramientas de diseño, puedes combinarlo con [Introducción a Figma y MasterGo](../figma-mastergo/).
:::

---

## Capítulo 1: Introducción al diseño frontend, comienza por "copiar"

En la sección anterior planteamos tres preguntas: de qué secciones se compone una página, qué hace que se vea bien y cómo imitar. Esta sección empieza por la metodología: **la primera lección del diseño frontend no es crear, sino replicar.**

Igual que para aprender caligrafía primero se copian modelos, o para aprender a dibujar primero se pintan escayolas, ¿por qué precisamente "copiar"?

- Lo "bueno" del diseño se puede cuantificar: **valores de color, tamaño de fuente, espaciado, radio de borde, sombras**, todo son números
- Al replicar píxel a píxel un diseño maduro, te ves obligado a entender cada decisión que hay detrás
- Cuando "copias hasta parecerte", la próxima vez que te encuentres con una situación similar, sabrás "en qué dirección copiar"

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡 Resumen en una frase: **si puedes replicar un buen producto, significa que ya tienes la base del diseño frontend; si además puedes hacer modificaciones sobre esa base, significa que ya te has graduado.**

### 1.1 Por qué replicar es la forma más rápida de iniciarse

Algunos se preocupan: "Estoy copiando cosas de otros, ¿de verdad puedo aprender algo así?" La respuesta es: sí, y es el camino más rápido. La razón es que replicar no es copiar el resultado, sino **forzarte a reproducir el proceso**:

- Te ves obligado a medir cada espaciado, y así entiendes "cómo el espacio en blanco crea sensación de respiración"
- Te ves obligado a consultar cada valor de color, y así entiendes "por qué esta paleta se ve armoniosa"
- Te ves obligado a comparar cada nivel jerárquico, y así entiendes "cómo se ordena la información principal y secundaria"

Cuando puedes "desglosar hasta el nivel de parámetros" una página excelente y reconstruirla, tu comprensión del diseño ya supera a la de muchas personas que solo trabajan "por intuición".

### 1.2 Las grandes empresas también "se referencian", no es ningún secreto

La forma de trabajar de los diseñadores incluye naturalmente las referencias: Pinterest para buscar inspiración, Dribbble para ver tendencias, análisis de la competencia para ver estructuras. En la era de la IA esto se ha amplificado, porque las herramientas convierten directamente la "referencia" en una capacidad ejecutable:

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design puede importar los sitios de referencia que hayas guardado y generar un borrador siguiendo su estilo
- Open Design incluye 151 sistemas de diseño de código abierto, aplicables a tu proyecto con un clic
- Varios UI design Skills empaquetan "las especificaciones visuales de las grandes empresas" en instrucciones ejecutables por IA

Así que tu pregunta no debería ser "¿puedo copiar?", sino "**¿cómo copiar con profesionalidad, dentro de la legalidad y produciendo algo propio?**"

#### Dónde buscar referencias: guarda estos sitios primero

El primer paso de las referencias es **acumular una "biblioteca de referencias"**. Los sitios siguientes están clasificados por uso; te recomendamos guardarlos todos y usarlos según lo que necesites:

| Sitio | Uso | Qué encontrar |
| :--- | :--- | :--- |
| [Awwwards](https://www.awwwards.com) | Los "Óscar" del diseño web | Creatividad, animación e interacción de primer nivel; aprende cómo se ve el "techo" |
| [Recent (antes Godly)](https://godly.website) | Colección de inspiración web de alta calidad | Diseños vanguardistas de IA, Web3 y sitios de portafolio |
| [Landbook](https://land-book.com) | Selección de diseño de landing pages | Filtrar sitios oficiales, páginas de precios y layout de primera pantalla por industria/paleta |
| [Lapa Ninja](https://www.lapa.ninja) | Biblioteca de más de 7300 capturas de landing pages | Buscar por elemento: navegación, exhibición de funciones, testimonios |
| [Mobbin](https://mobbin.com) | Biblioteca de interfaces reales de apps | Estudiar páginas y flujos reales de productos como Uber o Notion |
| [Dribbble](https://dribbble.com) | Comunidad de diseñadores | Inspiración de paletas, iconos, estilos de ilustración y microinteracciones |
| [Behance](https://www.behance.net) | Biblioteca de casos de proyectos completos | Ver procesos de diseño, investigación y portafolios completos |

¿Cómo se ven estos sitios? Un adelanto (haz clic en las imágenes para ampliarlas):

![Awwwards — los "Óscar" del diseño web](/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg)

![Recent (antes Godly) — colección de inspiración web de alta calidad](/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg)

![Landbook — selección de diseño de landing pages](/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg)

![Lapa Ninja — biblioteca de más de 7300 capturas de landing pages](/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg)

![Mobbin — biblioteca de interfaces reales de apps](/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg)

![Dribbble — comunidad de diseñadores](/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg)

![Behance — biblioteca de casos de proyectos completos](/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg)

::: tip 💡 Crea tu propia biblioteca de referencias
Cuando encuentres una página que te enamore, **haz una captura de pantalla y guarda el enlace de inmediato**, y clasifícala en "landing pages / componentes / paletas / animaciones". Al replicar, elige directamente el objetivo de esta biblioteca; es mucho más rápido que buscar en internet en ese momento.
:::

### 1.3 Referencia vs. plagio: una línea clara

| Dimensión | Referencia (recomendado ✅) | Plagio (peligroso ❌) |
| :--- | :--- | :--- |
| Objeto | Estructura de layout, estilo visual, especificaciones de diseño | Logos de marca, iconos exclusivos, ilustraciones originales |
| Forma | Rehacer tras comprender, integrándolo en tu propio producto | Copiar directamente activos, código e imágenes |
| Resultado | Similar en estilo, pero con contenido completamente distinto | Hasta el texto, la paleta y los activos son idénticos |
| Riesgo | Bajo | Alto riesgo de copyright/comercial |

El capítulo 7 hablará específicamente de los límites del copyright; por ahora recuerda una frase: **copiar las "reglas" está bien, copiar el "resultado" es peligroso.**

---

## Capítulo 2: Saber ver, para saber diseñar: desglosar una página

La premisa de "copiar para parecerse" es "saber leer". Este capítulo te enseña un marco universal para desglosar páginas.

![](/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg)

### 2.1 Ver la estructura: de qué secciones se compone una página

La gran mayoría de las páginas web modernas se pueden dividir en 4 grandes bloques:

```
┌───────────────────────────┐
│ ① Barra de navegación     │  Logo · Menú · Login/CTA
├───────────────────────────┤
│ ② Hero                    │  Título · Subtítulo · Botón principal · Imagen del producto
├───────────────────────────┤
│ ③ Secciones de contenido  │  Tarjetas de funciones · Datos · Testimonios · Precios
├───────────────────────────┤
│ ④ Pie de página           │  Enlaces · Copyright · Suscripción
└───────────────────────────┘
```

Al mirar una página, no te fijes primero en los detalles: **dibuja primero con los ojos su "esqueleto"**: qué parte es la navegación, cuál es la primera pantalla, en cuántas secciones se divide el centro y cuántos elementos tiene cada una.

### 2.2 Ver lo visual: 4 elementos cuantificables

| Elemento | Qué observar | Cómo anotarlo |
| :--- | :--- | :--- |
| **Color** | Cuáles son el color principal, el de fondo y el del texto | Tomar el valor Hex directamente con un cuentagotas |
| **Tipografía** | Qué fuente, tamaño y grosor usan los títulos/el cuerpo | Ver font-family/size/weight en los DevTools del navegador |
| **Espaciado** | El espacio en blanco entre secciones y dentro de las tarjetas | Anotar el ritmo habitual de 8 / 16 / 24 / 48 px |
| **Radio de borde y sombra** | El radio de borde y la intensidad de sombra de tarjetas y botones | Ver border-radius / box-shadow en DevTools |

::: tip 💡 La ventaja natural del diseño frontend
**Eres desarrollador frontend: DevTools es tu analizador de diseño.** Clic derecho → Inspeccionar, y cualquier página expone por completo sus valores de color, tamaño de fuente, espaciado y radio de borde. Es una capacidad que los diseñadores desean y que los desarrolladores tienen por naturaleza.

Herramientas habituales de selección de color: el selector de color de Chrome DevTools, extensiones tipo `color-picker`; también puedes enviar la captura directamente a un modelo multimodal grande para que te ayude a extraer las especificaciones de diseño.
:::

### 2.3 Ver los componentes: extraer "piezas reutilizables"

Desglosa la página en componentes y registra los parámetros de estilo de cada uno:

```text
Botón Primary Button
- Fondo: #4F46E5
- Texto: #FFFFFF, 14px / 600
- Radio de borde: 8px
- Relleno: 12px 24px
- Sombra: 0 2px 8px rgba(79,70,229,0.3)

Tarjeta Card
- Fondo: #FFFFFF
- Radio de borde: 16px
- Borde: 1px solid #E2E8F0
- Sombra: 0 4px 12px rgba(15,23,42,0.08)
```

Después de desglosar 3-5 páginas, tendrás en tus manos una "biblioteca de estilos de componentes": ese es el embrión de tu propio sistema de diseño.

### 2.4 Traducir "lo que ves" a "lo que la IA entiende"

Para replicar en una herramienta de IA, necesitas traducir lo visual a una descripción estructurada. **Cuanto más fino observes, más precisa será la traducción y más parecida será la copia de la IA.**

```text
Tomando como referencia el estilo de esta landing page, crea una página isomórfica:
- Estructura: navegación + Hero + 3 tarjetas de funciones + sección de precios + pie de página
- Colores: color principal Indigo #4F46E5, fondo #F8FAFC, texto #0F172A
- Tipografía: títulos Space Grotesk 700, cuerpo Inter 400
- Espaciado: secciones 96px, interior de tarjetas 24px, rejilla 24px
- Radio de borde: tarjetas 16px, botones 8px
- Sombra: 0 4px 12px rgba(15,23,42,0.08)
```

---

## Capítulo 3: Panorama de las herramientas de diseño frontend en la era de la IA

"¿Cómo lo diseñaron?" Las respuestas son cada vez más diversas. Estas son 2 rutas típicas, que cubren desde el "control manual fino" hasta la "generación automática por conversación".

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 Ruta 1: Figma / MasterGo — herramientas profesionales de archivos de diseño

Si lo que necesitas es un **archivo de diseño editable, colaborativo y controlable a nivel de píxel**, usa Figma (estándar internacional) o MasterGo (nacional, más ligero para empezar):

- Construir layouts en el lienzo, ajustar componentes y crear prototipos interactivos
- Usar capacidades como Figma Make / MasterGo AI para generar y ajustar en lote
- Finalmente, entregarlo al frontend para implementar según el archivo de diseño, o convertirlo a código mediante plugins

![Editor de Figma: panel de capas a la izquierda, lienzo en el centro, panel de propiedades a la derecha](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![Editor de MasterGo: herramienta de diseño en la nube de fabricación nacional, con un lienzo similar al de Figma](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> Adecuado para: escenarios que requieren entrega estricta de archivos de diseño, colaboración en equipo e interacciones complejas. Para la operación de las herramientas, consulta [Introducción a Figma y MasterGo](../figma-mastergo/).

### 3.2 Ruta 2: Claude Design / Open Design — lienzo de diseño conversacional

El punto en común de este tipo de herramientas es **generar prototipos de diseño interactivos directamente con lenguaje natural**, no imágenes estáticas. Sus representantes son Claude Design y su alternativa de código abierto, Open Design.

#### Claude Design: el lienzo de diseño conversacional oficial

Claude Design es el producto de diseño de IA de Anthropic (entrada en `claude.ai/design`):

- Introduce una necesidad en una frase y, por defecto, obtienes 3 variantes de diseño, que cubren landing pages, wireframes, presentaciones, etc.
- Admite importar sistemas de diseño (repositorios de GitHub, exportaciones de Figma, capturas de sitios web, archivos de marca) y extrae automáticamente colores/fuentes/componentes
- En el lienzo puedes comentar, modificar y arrastrar para ajustar; finalmente exporta HTML / PDF / PPTX, o lo transfiere a Claude Code para implementarlo como código real

**Escenarios de uso típicos:**

**① Replicar directamente una página de alta fidelidad desde una captura de referencia (el más habitual)**

Introduce la descripción del producto y la referencia de estilo, y Claude genera automáticamente una landing page completa: a la izquierda, el registro de la conversación con el prompt y el proceso de generación; a la derecha, el lienzo renderiza el resultado en tiempo real.

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Generación real de Claude Design: landing page de alta fidelidad de Mist Island Coffee, diálogo y progreso a la izquierda, el lienzo a la derecha renderiza la sección Hero completa](/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg)

**② 3 variantes de diseño por defecto; elige la dirección y luego refina**

Claude Design no da una sola respuesta, sino que por defecto genera varias direcciones para que elijas: estilo editor, estilo museo, estilo Zine, etc.; haz clic para entrar y refinar.

![Caso real: un periodista de PCWorld pidió a Claude que explicara el concepto de tokens de IA, y devolvió tres estilos para elegir: Editorial / Museum / Field Notes](/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg)

**③ Generar prototipos interactivos (no solo imágenes estáticas)**

Las páginas generadas son HTML realmente cliqueable y editable: los botones tienen efectos hover, los formularios aceptan entrada y los datos se calculan en tiempo real.

![Página divulgativa de tokens generada: incluye un tokenizador en tiempo real que resalta cada token con bloques de color al introducir una frase, y estadísticas de caracteres/palabras/tokens en la parte inferior](/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg)

**④ Crear presentaciones/PPT de producto**

No solo puede hacer páginas web, también genera diapositivas completas (varias páginas, con navegación, exportables a PDF/PPTX).

![Generación real: pitch deck de una marca de café, con el esquema de 13 páginas a la izquierda, el contenido de la diapositiva actual a la derecha y paginación en la parte inferior](/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg)

**⑤ Generar videos animados**

Con "From template" puedes crear videos HTML animados: guion gráfico + animación realmente renderizada, con barra de control de reproducción.

![Generación real: video animado de 45 segundos sobre cómo hacer café, con el guion gráfico a la izquierda y la animación reproduciéndose en el lienzo a la derecha (granos de café → tostado → preparación)](/zh-cn/stage-2/frontend/ui-design/images/claude_case_video.jpg)

**⑥ Iterar un diseño existente (comentar directamente en el lienzo)**

Después de generar el prototipo, no hace falta reescribir el prompt: haz clic en el botón Comment, encierra un elemento y escribe un comentario; Claude hará la modificación local.

![En el lienzo, haz clic en el botón Comment, encierra cualquier elemento y aparecerá un cuadro de comentario; escribe "Suggest to Claude" para iterar localmente](/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg)

**⑦ Diseño de páginas de apps móviles**

Admite especificar el tamaño del dispositivo (como iPhone) y generar prototipos de UI móvil con el marco del dispositivo.

![Generación real: interfaz móvil de la app de marcador de críquet (Tracket): Header oscuro + marcador + botones de acción, con un diseño de alto contraste pensado para exteriores con luz solar](/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg)

![Vista general del lienzo de Claude Design: diálogo a la izquierda, panel Tweaks a la derecha para ajustar en tiempo real temas, breakpoints, colores y otros parámetros](/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg)

> Adecuado para: personas sin formación en diseño que quieren saltarse la curva de aprendizaje de Figma y obtener prototipos interactivos rápidamente.

#### Open Design: la alternativa de código abierto a Claude Design

Si no quieres suscribirte, o valoras más la privacidad de los datos, puedes probar Open Design (proyecto de código abierto de nexu-io). Sigue la misma ruta que Claude Design: **generación conversacional de prototipos de diseño**, con la diferencia de que es **local-first, BYOK (trae tu propia clave de modelo) y no está vinculado a ningún Agent**.

Tiene dos conceptos centrales:

| Concepto | Explicación | Su valor para ti |
| :--- | :--- | :--- |
| **Skills (habilidades)** | 16 habilidades de diseño basadas en instrucciones (redacción, paleta, dirección creativa, brainstorming…) | Una habilidad = una plantilla de tarea profesional |
| **Templates (plantillas)** | 288 plantillas ejecutables (prototipos, diapositivas, animaciones…), todas con `example.html` | Haz fork y cambia los datos para entregar |
| **Design Systems (sistemas de diseño)** | 151 sistemas de diseño portables (paletas, tipografías, animaciones, estilo de redacción) | Aplica las especificaciones visuales de las grandes empresas con una frase |

Detectará tu Agent de codificación local (Claude Code, Codex, Cursor, Qwen, Kimi, etc.; oficialmente soporta 21) como "motor de diseño": **tu Agent actual es el diseñador**. Además, los **UI design Skills** del ecosistema de herramientas como Claude Code (p. ej. frontend-design) también empaquetan las especificaciones de diseño en instrucciones ejecutables por IA, para que la IA produzca según la especificación.

**Escenarios de uso típicos:**

**① Nuevo proyecto: elige Skill + sistema de diseño + fidelidad**

Al crear un prototipo, puedes elegir wireframe o alta fidelidad, especificar la plataforma de destino (Web responsive / móvil, etc.) y elegir una de las más de 150 sistemas de diseño integrados como base visual.

```text
Con Open Design, aplica el sistema de diseño de Linear y genera un HTML de landing page para un producto SaaS
```

![Diálogo de nuevo prototipo de Open Design: interfaz en chino, permite elegir prototipo/diapositiva/medios, alternar entre wireframe/alta fidelidad, y seleccionar el sistema de diseño y la plataforma de destino](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Open Design incluye más de 150 sistemas de diseño (Agentic, Airbnb, Airtable, Linear, Stripe, Vercel…), agrupados por categorías, cada uno con vista previa de paleta y descripción](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Área de trabajo Studio: conversación que genera en tiempo real**

A la izquierda está el panel de conversación (muestra los pasos de razonamiento de la IA, la lista de tareas, las operaciones de Write); a la derecha, el lienzo iframe renderiza el resultado en tiempo real: similar a Claude Design, pero en la parte inferior se muestra qué CLI Agent local se está invocando (Claude Code, Codex, deepseek, etc.).

![Área de trabajo Studio de Open Design: el panel Chat de la izquierda muestra el plan y el progreso de generación, el lienzo de la derecha renderiza una portada con el texto "Open Design" (modo diapositiva), y arriba se puede alternar entre Preview/Source/Comment/Edit](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ Aplicar un sistema de diseño para generar diapositivas/PPT**

Elige el tipo Slide deck, introduce el tema y obtén una presentación completa de varias páginas. La siguiente imagen es una presentación en chino generada por un usuario de la comunidad con Open Design.

![Caso real de usuario: portada de la presentación "One-person company · la organización plegada por la IA": fondo oscuro, título grande en serif, información del ponente y navegación de páginas en la parte inferior](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ Generar prototipos de apps móviles de alta fidelidad**

Admite vista previa simultánea de múltiples pantallas, genera automáticamente el marco del iPhone y componentes como la barra de pestañas, layouts de tarjetas y barras de progreso.

![Caso real generado: app de gestión de vida gamificada (Level): vista previa de 3 pantallas en paralelo, con la página principal de tareas diarias, el panel de categorías de tareas y la página de detalles de la tarea, en modo claro con tarjetas de colores](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ Usar UI design Skills para estandarizar la salida de la IA**

Instala Skills como frontend-design en Claude Code / Cursor, y la IA seguirá automáticamente las especificaciones de diseño al crear páginas:

```text
# Invocación en Claude Code
/frontend-design ayúdame a implementar una página de inicio de sesión
→ Genera automáticamente según las especificaciones de diseño integradas del Skill:
   - Colores: principal #4F46E5, éxito #10B981, error #EF4444
   - Espaciado: cuadrícula base de 8px
   - Componentes: Button / Input / Form accesibles
   - Responsive: adaptación a móvil / tablet / escritorio
```

**⑥ Proyectos locales privados sin salir de la red**

Para proyectos internos de empresa o diseños de producto con datos sensibles, todos los archivos se procesan localmente y el modelo puede ir por despliegue local o BYOK:

```text
# Inicia Open Design localmente, el modelo usa Qwen desplegado en local
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# Todos los archivos de diseño se guardan localmente en ~/.open-design/, sin pasar por ningún servidor de terceros
```

![Interfaz principal de Open Design: selecciona un Skill (prototipo/diapositiva/imagen/video, etc.) + introduce la necesidad y se genera, con el CLI Agent local actuando automáticamente como motor](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> Adecuado para: desarrolladores que valoran la privacidad de los datos, ya tienen un Agent de codificación y quieren control total del proceso de diseño.

### 3.3 Cómo elegir entre las dos rutas

| Comparación | Ruta 1: Figma / MasterGo | Ruta 2: Claude Design / Open Design |
| :--- | :--- | :--- |
| Posicionamiento | Herramienta profesional de archivos de diseño | Lienzo de diseño de IA conversacional |
| Herramientas representativas | Figma, MasterGo | Claude Design (oficial), Open Design (alternativa de código abierto) |
| Resultado | Archivos de diseño editables | Prototipos HTML interactivos |
| Dificultad de aprendizaje | ⭐⭐ media | ⭐ baja |
| Costo | Versión gratuita disponible | Claude Design requiere suscripción; Open Design es código abierto y gratuito (BYOK) |
| Adecuado para | Entrega rigurosa y colaboración | Validación rápida de prototipos, prioridad a la privacidad |

::: tip 💡 Uso combinado en la práctica
**Referencia → diseño → entrega** se puede mezclar en todo el proceso: usa Claude Design / Open Design para sacar rápido la dirección y el prototipo → una vez fijado, impórtalo a Figma/MasterGo para el refinado → entrégalo a Claude Code para escribir el código. Cada ruta aporta sus fortalezas.
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## Capítulo 4: Práctica 1: replicar "una página web ajena" hasta que se parezca

El objetivo es concreto: **elige una página web real que te guste y réplicala hasta que "se parezca".** Aquí usamos una landing page como ejemplo.

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### Paso 1: elige el objetivo

Elige una landing page con estructura clara que te interese (sitio oficial de SaaS, página de presentación de producto, da igual). Guarda su captura de pantalla y su enlace.

### Paso 2: desglosa con el marco del Capítulo 2

En el navegador, clic derecho → Inspeccionar, y registra en 4 pasos:

```text
Objetivo: landing page del sitio oficial de un SaaS
① Estructura: navegación (Logo/Menú/CTA) → Hero (título/subtítulo/botón/captura) → 3 tarjetas de funciones → Precios (3 niveles) → Pie de página
② Colores: principal #0F172A oscuro, acento #6366F1, fondo #FFFFFF / #F8FAFC
③ Tipografía: títulos Inter 800 48px, cuerpo Inter 400 16px
④ Componentes: botones radio 8px/sólido, tarjetas radio 16px/fondo gris claro/sin borde
```

### Paso 3: dáselo a la herramienta de diseño con IA y genera la primera versión

Entrega el resultado del desglose a Claude Design / Open Design para que genere según estas especificaciones:

```text
Genera una landing page isomórfica según las siguientes especificaciones de diseño:
[Pega el registro del desglose del Paso 2]
Producto: mi proyecto (una frase que explique su propósito)
Requisito: seguir a nivel de píxel las especificaciones anteriores de color, tipografía, espaciado y radio de borde
```

La primera versión suele ser "parecida en espíritu, pero no en forma": la estructura está bien, pero los detalles difieren. **Eso no se llama fracaso; precisamente te dice qué tienes que ajustar a continuación.**

### Paso 4: compara bloque por bloque e itera

Pon la captura de referencia y el resultado generado en paralelo, compara bloque por bloque y usa "instrucciones de modificación" para acercarte:

| Problema detectado | Instrucción de modificación |
| :--- | :--- |
| El color principal es demasiado claro | "Cambia el color principal a #0F172A y el de acento a #6366F1" |
| El radio de borde del botón no es correcto | "Unifica todos los botones con radio de 8px y fondo sólido" |
| El espaciado es demasiado apretado | "Cambia el espaciado entre secciones a 96px y el relleno interno de las tarjetas a 24px" |
| La tipografía no es correcta | "Cambia los títulos a Inter 800 y el cuerpo a Inter 400" |
| Sobran elementos decorativos | "Quita la decoración de fondo y conserva solo el contenido principal" |

### Paso 5: criterio de aceptación: "parecerse"

¿Cómo saber si ya te has iniciado? Pónte un criterio objetivo:

- [ ] Haz dos capturas: la página original vs. tu versión replicada
- [ ] Pon ambas imágenes en paralelo, ampliadas, y compara píxel a píxel
- [ ] Los valores de color, tamaño de fuente, espaciado y radio de borde **no muestran diferencias de layout a simple vista**
- [ ] Reduce al 50% y compara de nuevo; sigues sin distinguir cuál es la original

> 💡 **"Parecerse" no es el fin, es el medio.** Después de replicar 2-3 sitios con estilos completamente distintos, acumularás de forma natural un "sentido del diseño": cuándo usar mucho espacio en blanco, cuándo alta saturación, cuándo contener el radio de borde. En ese momento, replicar páginas nuevas será mucho más rápido.

---

## Capítulo 5: Práctica 2: del diseño al código

El archivo de diseño / prototipo replicado finalmente debe convertirse en una página real del producto. Hay dos rutas de traspaso:

![](/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg)

### 5.1 Ruta A: herramienta de diseño con IA → código frontend

- **Claude Design**: tras fijar el diseño en el lienzo, usa `/design-sync` para sincronizarlo con Claude Code y continuar escribiendo el código directamente desde el diseño, sin empezar de nuevo desde la captura
- **Open Design**: puede exportar directamente HTML y luego entregarlo al Agent para transformarlo en componentes del proyecto
- **Figma/MasterGo**: exporta código React / Vue mediante plugins o MCP

### 5.2 Ruta B: captura → modelo multimodal grande

Lo más simple: envía la captura del diseño replicado directamente al modelo multimodal grande, pídele "reproducir como componentes de React" e impleméntala bloque por bloque.

> Para la comparación detallada de las tres rutas de "diseño a código", consulta [Del prototipo de diseño al código de proyecto](../design-to-code/). Si quieres una mejora de eficiencia de ingeniería a nivel de componentes, consulta también [Actualiza tu interfaz con una biblioteca moderna de componentes](../modern-component-library/).

---

## Capítulo 6: Convierte el sistema de diseño de las grandes empresas en el tuyo

Después de replicar 3 páginas descubrirás que **detrás de cada página bonita hay un "sistema de diseño" estable**. En lugar de crearlo desde cero, apóyate en los hombros de gigantes.

![](/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg)

### 6.1 Qué es un "sistema de diseño portable"

Open Design convierte los sistemas de diseño en archivos `DESIGN.md` (Linear, Vercel, Stripe, Apple, Cursor, Figma…), mientras que Claude Design los extrae automáticamente de tu repositorio de código/archivos de diseño. En esencia, ambos hacen lo mismo:

```text
DESIGN.md = Tokens de color + Especificaciones de tipografía + Ritmo de espaciado + Estilos de componentes + Convenciones de uso
```

Un ejemplo real de estructura:

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: 大量留白，克制用色
- Don't: 不使用渐变、不使用阴影堆叠
```

### 6.2 Tres pasos para crear tu propio sistema de diseño

1. **Elige la base**: aplica un sistema de diseño de una gran empresa que te guste (como la sobriedad oscura de Linear, el espacio en blanco de Apple)
2. **Cambia los parámetros**: sustituye el color principal por tu color de marca y ajusta el radio de borde y el espaciado
3. **Consolídalo en un archivo**: guárdalo como `DESIGN.md` o como Skill, para que la IA lo cumpla automáticamente en cada generación

### 6.3 Avanzado: fija el estilo con un UI design Skill

Una vez encapsulado el sistema de diseño como Skill, se invoca con una frase:

```text
Usa las especificaciones de diseño del skill my-brand y genera propuestas de primera pantalla para 3 páginas funcionales
```

Para saber cómo crear y usar Skills, consulta [Haz que tu interfaz se vea bien con LLM y Skills](../llm-skills-beautiful/).

---

## Capítulo 7: Copyright y ética

Cuanto más fuerte es tu capacidad de réplica, más hay que respetar los límites:

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**Copia las reglas, no los resultados.** Los layouts, las paletas y los espaciados son "reglas" que se pueden aprender; los logos, iconos, ilustraciones y textos son "resultados" que no deben copiarse directamente.

**Ten cuidado con los proyectos comerciales.** Antes de la entrega comercial confirma: el copyright de los activos, las licencias de las fuentes (las fuentes comerciales requieren compra) y los términos de uso de los sitios de referencia.

**La atribución del contenido generado por IA.** Las condiciones varían según la plataforma (Claude Design, Open Design, etc.); revisa los términos de servicio antes del uso comercial.

**Indica la participación de la IA.** Algunas plataformas/regulaciones exigen declarar que el contenido es generado por IA.

**Supervisión final.** En escenarios sensibles como la identidad de marca o los materiales publicitarios, la revisión humana es obligatoria.

::: tip 💡 Recomendación
En las fases de aprendizaje y prototipado, replica libremente; **cuando entres en la entrega comercial, convierte la "referencia" en una "recreación de tu propio sistema de diseño" y conserva los registros de generación**.
:::

---

## Resumen

Este capítulo ha convertido la "iniciación al diseño frontend" en una ruta ejecutable:

1. **Mentalidad**: la iniciación al diseño frontend comienza por "copiar": copia las reglas, no los resultados
2. **Ver**: desglosa cualquier página con tres niveles: estructura (4 grandes bloques) + visual (color/tipografía/espaciado/radio de borde) + componentes; DevTools es tu analizador
3. **Herramientas**: 2 rutas: Figma/MasterGo (archivos de diseño finos), Claude Design / Open Design + UI design Skills (prototipos conversacionales)
4. **Replicar**: elegir objetivo → desglosar → generar → iterar bloque por bloque → verificación de aceptación a nivel de píxel
5. **Consolidar**: transforma el DESIGN.md de las grandes empresas en tu propio sistema de diseño y fíjalo después con un Skill

::: tip 💡 Próximo paso
Completa hoy mismo un ejercicio completo de réplica:
1. Encuentra una landing page que quieras "copiar" y extrae su color/tipografía/espaciado/radio de borde con DevTools
2. Genera la primera versión con Claude Design u Open Design y modifícala bloque por bloque hasta que "se parezca"
3. Entrega la versión final a la IA para convertirla en código y guarda de paso tu propio DESIGN.md
:::

<RelatedArticlesSection
  title="Artículos relacionados"
  description="Continúa profundizando en el diseño con IA, la producción de activos y la práctica de diseño a código."
  :items="relatedArticles"
/>
