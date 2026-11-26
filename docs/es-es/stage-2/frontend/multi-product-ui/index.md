# Diseña páginas y botones siguiendo guías de diseño de UI

Muchas personas dicen "quiero que mi página se parezca más a la de Apple" o "quiero que los botones se vean más sofisticados", pero cuando realmente empiezan a trabajar, a menudo se quedan atascados en una pregunta:

**Exactamente, ¿qué debo tomar como referencia?**

Mirar capturas de pantalla e imitar solo te enseña si algo "se parece o no". Pero cuando abres las guías de diseño de Apple, Google, Microsoft y Atlassian, descubres que lo realmente impresionante no es el estilo visual, sino que **explican claramente los problemas de diseño**: qué destacar primero en una página, cómo jerarquizar los botones, cómo enfatizar las operaciones - estos criterios de juicio son lo esencial.

> Seguir guías de diseño no se trata de hacer que algo "se parezca a alguien", sino de aprender cómo otros toman decisiones.

:::: info Por qué aprender esto ahora
Las reglas de diseño ya han sido entrenadas en los modelos, absorbidas por defecto en las herramientas de diseño, e incluso con solo pegar algunas capturas de pantalla la IA puede aprenderlas. Pero aún necesitamos saber de dónde vienen estas reglas y por qué se definen así.
::::

## Primero mira algunos textos originales y siente la diferencia

Si antes pensabas que "las guías de diseño solo hablan de estilo", primero mira algunas citas oficiales.

Normalmente en un equipo solemos decir cosas como:

- Haz un dropdown
- Pon un menú aquí
- Agrega algunas funciones a la barra de menú
- Pon dos botones aquí, uno de confirmar y otro de cancelar

Parece que no hay problema, pero en las guías de las grandes empresas, estos términos no son conceptos vagos, sino que están desglosados con mucho detalle.

| Lo que solemos decir casualmente | Texto oficial | En pocas palabras |
| :--- | :--- | :--- |
| "Haz un menú" | Apple: [“A menu reveals its options...”](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` se usa para realizar acciones |
| "Pon funciones en la barra de menú" | Apple: [“menu bar menus contain all the commands...”](https://developer.apple.com/design/human-interface-guidelines/menus) | Este es el menú de comandos en la parte superior de la aplicación |
| "Haz un dropdown" | Apple: [“A pop-up list lets the user choose one option among several.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` es para seleccionar uno de una lista |
| "También haz un dropdown" | Apple: [“A pull-down list is generally used for selecting commands in a specific context.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` es para abrir y realizar la acción actual |
| "¿El menú también sirve para filtrar?" | Fluent: [“If you need to collect information from people, try a select, dropdown, or combobox instead.”](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` no es para seleccionar valores |
| "¿El menú también sirve como navegación?" | Material: [“Menus should not be used as a primary method for navigation within an app.”](https://m1.material.io/components/menus.html) | `Menu` no es navegación principal |
| "Escribe OK / Cancel en los botones" | Apple: [“Always use ‘Cancel’ to title a button that cancels the alert’s action.”](https://developer.apple.com/design/human-interface-guidelines/alerts) | El texto de los botones no se puede escribir de cualquier forma |

> Las citas de la tabla se pueden hacer clic directamente para ir a la página oficial correspondiente.

Esta es la parte que más impacta cuando lees realmente las guías de diseño por primera vez:

> Lo que normalmente pensamos que es discutir de UI, en realidad muchas veces es solo comunicarnos con un montón de palabras vagas.

Apple no se limita a decir "haz un menú"; continúa distinguiendo:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent no se limita a decir "dropdown"; continúa distinguiendo:

- `menu`
- `dropdown`
- `select`
- `combobox`

Esta es la necesidad de las guías de diseño.

No es para hacer que las páginas parezcan más profesionales, sino para que cuando el equipo discuta sobre UI, cada persona no tenga cosas diferentes en mente.

Cuesta apreciar estas diferencias solo por el nombre. Los dos controles de abajo tienen un aspecto casi idéntico. Abre cada uno y elige una opción para ver cómo cambia su comportamiento.

<UiSpecLookalikeControlsDemo />

Cada control tiene su propia página en las guías de Apple. Puedes compararlas en [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) y [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons).

## Lo que aprenderás

1. Por qué debes consultar las guías de diseño al diseñar páginas y botones
2. Qué contenido de las guías de Apple, Material, Fluent y Atlassian es más valioso consultar
3. Cómo diseñar claramente la "jerarquía de páginas" y la "jerarquía de botones"
4. Hasta qué punto una guía madura define un botón
5. Cómo hacer que la IA consulte las guías de otros para generar páginas y botones

Cada parte incluye diagramas interactivos que puedes probar.

## 1. Por qué las guías de diseño te ayudan a diseñar páginas con claridad

Después de leer los textos originales anteriores, descubrirás un punto clave:

**Las guías de diseño no son un complemento estético, sino que primero precisan el vocabulario.**

Muchas páginas no se ven bien no porque la combinación de colores no sea sofisticada, sino porque la jerarquía de información es confusa.

Mira primero un ejemplo. Abajo tienes dos versiones de la misma página de lista de proyectos. El texto es idéntico y lo único que cambia es la jerarquía. Puedes explorarlas así:

- Pasa el cursor por una fila de la tabla para ver en qué parte de las dos imágenes aparece el problema
- Prueba los interruptores de encima de la imagen de la derecha para ver cómo queda la página al desactivar cada mejora
- Arrastra el control de la «prueba de entrecerrar los ojos». Al desenfocar la imagen, en la izquierda todo sigue compitiendo por tu atención, mientras que en la derecha solo se distinguen el título y el botón principal

<UiSpecHierarchyCompareDemo />

Muchos botones no son fáciles de usar no porque los bordes redondeados estén mal, sino porque:

- Hay demasiados botones principales, el usuario no sabe cuál presionar
- Los botones de peligro se ven igual que los botones normales
- Todos los botones de la página compiten por la atención
- El estilo y la semántica de los botones son inconsistentes entre páginas

Las guías de diseño maduras abordan precisamente estos problemas. Normalmente definen:

| Contenido de la guía | Qué problema resuelve |
| :--- | :--- |
| **Jerarquía de página** | Dónde mirar primero, dónde mirar después, cómo organizar la información |
| **Fundamentos visuales** | Cómo unificar colores, espaciado, tipografía, bordes redondeados, sombras |
| **Jerarquía de botones** | Cómo distinguir botón principal, secundario, de texto, de peligro |
| **Reglas de estado** | Cómo se ven hover, focus, disabled, loading |
| **Semántica de interacción** | Qué botón es "confirmar", cuál es "cancelar", cuál es "más acciones" |

Por lo tanto, lo que realmente proporcionan las guías de diseño no es un "aspecto", sino un **conjunto de criterios de juicio**.

### 1.1 Qué contiene una guía de diseño real

La tabla anterior resume el tema en solo cinco filas. Quizá te preguntes cuánto contenido hay cuando abres una guía de diseño de verdad.

Vamos a contar los apartados del índice de las guías de Apple. Pulsa en los temas de abajo y usa los interruptores de arriba para ver los que tienen que ver con las páginas y los botones.

<UiSpecSpecMapDemo />

En este capítulo vamos a entender los apartados más relacionados con las páginas y los botones. Puedes consultarlos sin tener que memorizar toda la guía. Si quieres ver el índice completo, abre [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/).

## 2. ¿En qué debes enfocarte al consultar las guías de grandes empresas?

Cada guía tiene sus puntos fuertes. Esta tabla te orienta sobre cuál consultar según lo que quieras averiguar.

| Lo que quieres saber | Qué consultar en Apple | Qué consultar en Material |
| :--- | :--- | :--- |
| Con cuánto detalle definir un componente | Su propósito, rol, comportamiento y accesibilidad | Su estructura, variantes de estilo y estados |
| Cómo expresar la jerarquía de una página | Las relaciones de navegación, los estilos de texto y la prioridad del contenido y los controles | La estructura de la página y dónde van la navegación, el contenido y las acciones |
| Cómo distinguir las acciones principales de las secundarias | El rol de los botones y su énfasis visual se definen por separado | Los niveles de énfasis Filled, Tonal, Outlined y Text |
| Cómo mantener la contención visual | Evita repeticiones y agrupa los comandos relacionados | Asigna una sola responsabilidad a cada sección |

Procura mantener la coherencia de principio a fin con la guía que elijas. Si juntas, por ejemplo, el efecto de cristal de Apple con todos los estilos de botones de Material, es fácil perder las reglas de ambas guías.

### 2.1 Consultar Apple: Aprender a "definir con suficiente detalle"

Lo más valioso de Apple no es solo la contención visual, sino que define los conceptos con mucho detalle.

Lo que muchos equipos llaman "menú" o "dropdown", Apple continúa desglosando:

- `menu`: un conjunto de comandos, opciones o estados
- `menu bar menu`: colección de comandos a nivel de aplicación
- `pop-up button`: seleccionar un valor
- `pull-down button`: activar comandos en el contexto actual
- `context menu`: acciones comunes relacionadas con el objeto o tarea actual

Esta distinción es muy importante porque afecta directamente:

- Si este componente es para seleccionar valores o para realizar acciones
- Si pertenece a una sección de la página o a nivel de aplicación
- Si debe mostrar persistentemente el valor seleccionado o solo expandir comandos temporalmente

Cuando empiezas a pensar con este nivel de granularidad, las páginas que diseñes serán mucho más claras.

#### Con cuánto detalle hay que definir un botón

¿Qué significa «definir con suficiente detalle»? Probemos con un botón corriente. Cuando dices «añade un botón», quizá solo pienses en «azul, bordes redondeados, altura 40». Una guía madura sigue adelante y plantea 10 preguntas. La ficha de abajo las enumera. Pulsa en cada apartado de la izquierda para ver con cuánto detalle hay que describirlo.

<UiSpecButtonSpecDemo />

Cuando termines, verás que el color, los bordes redondeados y el tamaño de letra son solo una pequeña parte. Una definición suficientemente detallada permite que otro diseñador o ingeniero reproduzca el botón tal cual sin tener que preguntarte.

Los estados y el comportamiento son lo más fácil de pasar por alto porque en una captura estática no se ven. Pruébalo abajo. Pasa el cursor por encima, mantén el botón pulsado, selecciónalo con la tecla Tab y, por último, pulsa «Publicar proyecto» para ver el proceso completo.

<UiSpecButtonStatesDemo />

Si quieres ver cómo son los botones oficiales, consulta [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) de Apple y [Buttons](https://m3.material.io/components/buttons/overview) de Material.

Vuelve ahora a los dos controles desplegables del comienzo. Seguramente ya ves por qué no son intercambiables. Además del aspecto, la guía define **qué le promete el control al usuario**. Al pulsar uno, cambias un valor. Al pulsar el otro, ejecutas una acción.

Esto también aclara una duda habitual. ¿Por qué «Eliminar» no tiene que ser el botón más visible solo porque la acción sea peligrosa? El rol indica si la acción entraña un riesgo y el estilo indica qué importancia tiene.

En las guías hay muchos otros pares de componentes que se parecen y cumplen funciones distintas. Aquí tienes algunos habituales. Cuando te los encuentres, pregúntate qué quiere hacer el usuario al pulsarlos.

| Controles fáciles de confundir | De qué se encarga cada uno | Ejemplo |
| :--- | :--- | :--- |
| Navegación por pestañas / Barra de herramientas | Las pestañas cambian de sección y la barra de herramientas reúne las acciones de la página actual | «Proyectos» y «Configuración» indican adónde ir. «Eliminar selección» indica qué hacer |
| Interruptor / Botón | El interruptor alterna entre dos estados y el botón ejecuta una acción | Usa un interruptor para «Recibir notificaciones» y un botón para «Enviar» |
| Selector / Menú | El selector permite elegir entre varios valores y el menú ejecuta comandos | Usa un selector para «Ordenar por última actualización» y pon «Cambiar nombre» en el menú |
| Diálogo de confirmación / Panel lateral | El diálogo comunica algo importante que el usuario debe saber de inmediato y el panel sirve para una tarea bien delimitada | Usa un diálogo para «¿Seguro que quieres eliminarlo?» y un panel lateral para «Nueva carpeta» |

### 2.2 Consultar Apple: Aprender jerarquía de páginas y contención

Las Apple Human Interface Guidelines son especialmente adecuadas para aprender dos cosas:

- Cómo establecer una jerarquía clara en las páginas
- Cómo mantener los controles claros sin que acaparen la atención

Apple enfatiza `Hierarchy`, `Harmony`, `Consistency`. Esto significa que al diseñar páginas debes responder:

- Cuál es la información más importante de la página actual
- Cuál es la tarea principal del usuario
- Qué operación debe ser más visible y cuál debe retroceder

Si consultas a Apple para diseñar páginas, puedes enfocarte en:

- No fragmentar demasiado la información del primer vistazo, enfocarse primero en el contenido central
- Usar espacios en blanco, tamaño de fuente y agrupación para crear orden, en lugar de apilar muchos bordes
- No hacer que todos los botones tengan alto énfasis, solo las acciones clave deben ser las más prominentes

#### Diagrama de la anatomía de una página

¿Cómo se verían los consejos anteriores en una página real? Pasa el cursor por uno de los niveles de la izquierda o haz clic para fijarlo. A la derecha verás dónde aparece en la página y cómo atrae tu atención. Marca «Mostrar guías» para ver cómo se reparte el espaciado.

<UiSpecPageAnatomyDemo />

Fíjate en tres detalles de la imagen de la derecha:

- **El tamaño, el grosor y el tono del texto marcan la jerarquía.** El texto más grande aparece una sola vez y no todos los títulos están en negrita
- **La información auxiliar aparece justo al lado de la información principal que explica**. Es más pequeña y tiene un tono más claro, pero sigue siendo legible aunque tenga menos énfasis
- **Solo hay un botón principal**, situado después del contenido

Si quieres ver la explicación oficial, consulta [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) y [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) de Apple.

#### Diagrama de por qué quitar bordes puede aclarar la página

Es fácil interpretar «usar espacios en blanco, tamaño de letra y agrupación para crear orden» como «quitar todos los bordes». ¿De verdad basta con eso? Pulsa en los tres pasos en orden y fíjate en qué momento se distinguen los grupos.

<UiSpecGroupingDemo />

En el tercer paso verás que el espaciado es lo que marca la diferencia. Al acercar el contenido relacionado, los grupos se distinguen por sí solos. Por eso conviene **agrupar primero y luego decidir si hace falta un borde**. Si algún grupo necesita un límite más claro, añade un fondo de color o un contorno.

La página de Apple sobre [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) incluye una comparación oficial del antes y el después que ilustra la misma idea de agrupar los comandos relacionados.

### 2.3 Consultar Material: Aprender estructura clara de páginas

Material Design es muy adecuado para aprender "cómo las páginas organizan los flujos de tareas".

Muchos de sus componentes y guías de layout tienen como núcleo ayudarte a aclarar:

- Si la página es de navegación o de ejecución de tareas
- Si la página actual es para que el usuario lea, seleccione o envíe
- Qué elementos de una página deben repetirse de forma estable y cuáles deben responder a cambios de contexto

Si consultas Material para diseñar páginas, puedes enfocarte en:

- Secciones de página claras, responsabilidades de módulos bien definidas
- Navegación, área de contenido y área de operaciones con división clara del trabajo
- Diferentes estilos de botones corresponden a diferentes prioridades de operación

#### Diagrama de la navegación, el contenido y las acciones

¿Cómo se reparten estas responsabilidades en la práctica? Material divide la página en tres partes. La navegación indica adónde ir, el contenido indica qué ver y las acciones indican qué hacer. Cada acción también deja claro a qué afecta.

El siguiente diagrama desglosa una página siguiendo esa idea. Pasa el cursor por una opción de la izquierda y fíjate en dónde caen las líneas continuas y discontinuas.

<UiSpecPageSkeletonDemo />

Observa tres detalles:

- **Cada lado de la barra superior tiene su función.** A la izquierda van el botón de volver y el título. A la derecha van las acciones y solo destaca un botón. Las acciones relacionadas van juntas y las demás quedan separadas por un espacio. Así se consigue la contención visual
- **El alcance puede variar mucho de una acción a otra.** «Nuevo proyecto» afecta a toda la lista y «Abrir» solo afecta a un elemento
- **Si una acción está fuera de sitio, cuesta saber a qué afecta.** Marca «Prueba a mover Eliminar a la barra superior» y verás que ya no se sabe qué elemento se va a eliminar

Puedes ver los diagramas oficiales en [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) de Apple y [Layout](https://m3.material.io/foundations/layout/layout-overview/overview) de Material.

### 2.4 Consultar Fluent: Aprender límites de componentes y jerarquía de botones

Fluent 2 es muy adecuado para productos de backend, herramientas y sistemas de formularios complejos. Lo más valioso que tiene es que te dice directamente "no mezcles conceptos".

Por ejemplo, dice explícitamente: si necesitas "collect information", no sigas usando `menu`, sino que deberías considerar `select`, `dropdown`, `combobox`.

Esta frase es muy importante porque rompe la idea de "todo es más o menos lo mismo" que mucha gente tiene en mente.

Fluent 2 también valora mucho:

- Jerarquía de operaciones
- Límites semánticos de componentes
- Claridad en escenarios de información densa

Si consultas Fluent para diseñar botones, puedes enfocarte en:

- `Primary button` para la acción más importante del área actual
- `Secondary button` para acciones de soporte
- Botones de énfasis débil como `Subtle`, `Transparent` para operaciones que no deben interrumpir el flujo principal
- Cuantos más botones haya en la página, más debes controlar la prioridad visual

#### Diagrama para usar los cuatro niveles de botones

¿Qué significa «controlar la prioridad visual» en la práctica? Pruébalo en esta demostración.

<UiSpecFluentButtonsDemo />

### 2.5 Consultar Atlassian: Aprender a gestionar páginas y botones de forma sistemática

El Atlassian Design System es especialmente adecuado para situaciones donde "un equipo hace muchas páginas". Enfatiza:

- Los foundations son la base compartida
- Los tokens son el método para unificar las decisiones visuales
- Los components son los bloques de interacción que se reutilizan repetidamente

Si consultas Atlassian para hacer páginas y botones, lo más valioso es:

- Convertir el tamaño, color, bordes redondeados y espaciado de los botones en reglas unificadas
- Fijar el ritmo del layout de página
- Hacer que diferentes páginas, aunque tengan contenido diferente, compartan un lenguaje estructural consistente

#### Diagrama para convertir los estilos en tokens

Lo de «unificar las reglas» puede sonar un poco abstracto. Arrastra los controles de la derecha y marca «Cada página por su cuenta» para ver qué cambia al prescindir de esas reglas.

<UiSpecTokensDemo />

## 3. Al diseñar páginas, qué puntos de la guía debes consultar

Cuando mires un sistema de diseño, no preguntes primero "esta página se ve bien o no", sino que primero te hagas las siguientes preguntas.

### 3.1 ¿Se distingue lo principal de lo secundario a primera vista?

Una página generalmente debe tener al menos tres niveles:

- **Información principal**: el contenido más importante de la página actual
- **Información auxiliar**: contenido que ayuda a comprender o complementar
- **Operaciones secundarias**: acciones que no deben interferir con la tarea principal

Si los tres niveles no están diferenciados, la página será "todo es importante", lo que equivale a "nada es importante".

Arrastra el control de abajo para distinguir tú mismo los tres niveles.

<UiSpecThreeLayersDemo />

### 3.2 ¿El layout de la página sirve a la tarea o solo apila módulos?

Al consultar las guías, presta especial atención a:

- Si el área de título aclara el objetivo de la página
- Si el área de contenido principal está organizada alrededor de la tarea
- Si los botones de operación están cerca del contenido relacionado
- Si la información secundaria esta débilmente enfatizada

Vale la pena detenerse en el último punto. Muchas veces, reducir el énfasis de la información secundaria consiste en colocarla donde corresponde.

<UiSpecTaskFlowLayoutDemo />

### 3.3 ¿Las operaciones de la página tienen prioridad?

Muchas páginas a primera vista tienen 6 botones, y cada botón parece un CTA, esta es una típica pérdida de jerarquía.

Un enfoque más razonable sería:

- Un área generalmente tiene solo una acción principal
- Las acciones secundarias pueden usar bordes, botones de texto o estilos más débiles
- Las acciones de riesgo no deben verse igual que la acción principal

Ya has visto estas dos ideas en acción. La comparación de la sección 1 muestra qué pasa cuando hay demasiados botones y el diagrama de Fluent de la sección 2.4 muestra cómo darles distintos niveles de énfasis.

### 3.4 Cómo decidir qué destacar y qué dejar en segundo plano

Vuelve a la sección 1 y arrastra otra vez el control de la «prueba de entrecerrar los ojos». Desenfoca la página hasta que no puedas leer el texto. Lo que aún distingas es lo que más llama la atención. Para decidir qué destacar y qué dejar en segundo plano, puedes guiarte por esta lista:

- **Merece destacarse** el título de la página, el contenido central de la tarea actual y la acción principal del siguiente paso
- **Conviene dejar en segundo plano** los metadatos, las explicaciones complementarias y los accesos secundarios
- **Evita destacar** los bordes decorativos, los títulos que se repiten en todos los módulos y los botones secundarios que compiten con la acción principal

Si después de desenfocar ves toda la pantalla llena de manchas oscuras más o menos del mismo tamaño, todo está pidiendo tu atención y nada destaca de verdad.

## 4. Al diseñar botones, qué puntos de la guía debes consultar

Los botones son la parte más fácil de "diseñar de cualquier manera", pero también la que más puede revelar si un sistema es maduro.

### 4.1 Primero separa los botones por "semántica", luego por "estilo"

No pienses primero en "botón azul o botón negro", primero piensa en qué rol tiene este botón.

Los roles comunes de botones se pueden clasificar así:

| Tipo de botón | Función | Estrategia de estilo común |
| :--- | :--- | :--- |
| **Primary** | La acción más crítica del área actual | Sólido, alto contraste, el más visible |
| **Secondary** | Acciones de soporte | Borde o un nivel de énfasis menor |
| **Tertiary / Text** | Operaciones débiles | Texto o baja proporción visual |
| **Destructive** | Eliminar, desactivar, limpiar y otras operaciones de riesgo | Color de advertencia o estilo de riesgo explícito |
| **Icon button** | Operaciones de herramienta locales | Simple, cerca del contexto |

Así se ven en una página:

<UiSpecRoleSamplesDemo />

### 4.2 Evita poner demasiados botones de tipo Primary Button en una página

Este es el error en el que más caen los principiantes.

Si hay 4 botones principales en la página, entonces es como si no hubiera botón principal. El significado del botón principal es "decir al usuario qué es lo que más debería hacer ahora".

Puedes seguir la práctica común de muchos sistemas de diseño:

- Un área principal generalmente conserva solo un botón principal
- Cancelar, volver, cerrar generalmente no compiten al mismo nivel que el botón de confirmación
- Más operaciones se colocan en botones secundarios o menús

#### Ahora te toca decidir

Entender la regla es solo el primer paso. Abajo tienes una página con 5 botones que se ven iguales. ¿Cuál debería ser el principal?

<UiSpecButtonDecisionDemo />

Al terminar verás que la decisión se reduce a tres preguntas. ¿Qué quiere conseguir el usuario? ¿Qué acciones solo sirven de apoyo? ¿Cuál no se puede deshacer? La próxima vez que tengas que jerarquizar los botones, empieza por ahí.

### 4.3 Los botones deben poder expresar cambios de estado

Las guías de diseño generalmente describen los estados de los botones con mucho detalle:

- Estado por defecto
- Estado hover
- Estado focus
- Estado disabled
- Estado loading
- Estado de peligro

Esto es importante porque un botón no es una imagen estática, sino uno de los controles que más se activan durante la operación del usuario.

Para ver cómo se distinguen estos seis estados, vuelve a la demostración de estados y comportamiento de los botones de la sección 2.1 y pruébala.

### 4.4 El texto de los botones también es parte del diseño

El texto del botón no es solo un "problema de redacción", afecta directamente la comprensión del usuario.

Por ejemplo:

- `Guardar`
- `Guardar cambios`
- `Publicar ahora`
- `Eliminar proyecto`
- `Mover a la papelera`

Estos textos transmiten expectativas psicológicas completamente diferentes. Las guías maduras generalmente requieren que las etiquetas de los botones expresen claramente la acción, en lugar de usar palabras vagas.

Aquí tienes algunos textos ambiguos habituales y cómo mejorarlos:

| Texto ambiguo | Texto más claro | Por qué |
| :--- | :--- | :--- |
| Aceptar | Guardar borrador | Se entiende de un vistazo qué pasa al pulsar |
| Enviar | Publicar artículo | El verbo y su objeto dejan clara la acción |
| Sí / No | Eliminar proyecto / Cancelar | Los botones explican directamente la consecuencia |
| Haz clic aquí | Ver detalles del pedido | Sabes adónde irás sin tener que leer el contexto |
| OK | Reenviar correo | Puede haber varios botones OK en la misma página y cuesta distinguirlos |

## 5. Una lista de verificación muy práctica para el diseño de páginas y botones

Cuando diseñes páginas tú mismo, puedes revisar rápidamente esta lista:

### Lista de páginas

- El título de la página explica claramente la tarea actual
- La información más importante del primer vistazo es visible de inmediato
- La página está organizada por flujo de tareas, no por lo que se te ocurre poner
- Solo hay una acción principal en la misma área
- El contenido secundario esta débilmente enfatizado
- El usuario puede saber en todo momento dónde está y cómo volver
- La página indica qué ocurre durante la carga, cuando no hay datos y cuando falla una solicitud
- Al estrechar la ventana o aumentar el tamaño de letra, comprueba si algún contenido queda oculto o cortado

### Lista de botones

- Este botón es una acción principal o secundaria
- Por qué merece ser más visible que otros botones
- Hay demasiados botones principales en la página
- Las operaciones de peligro están claramente identificadas
- El texto del botón es suficientemente específico
- Al pulsarlo, el usuario sabe enseguida que la pulsación se ha registrado y cuál ha sido el resultado
- Solo con el teclado, puedes seleccionar el botón y ver claramente dónde está el foco

### Plantilla de definición reutilizable

Usa la lista para revisar el diseño y la plantilla para concretarlo. Rellena la tabla de abajo y tendrás la definición básica de una página o un componente.

| Qué definir | Cómo rellenarlo |
| :--- | :--- |
| **Tarea** | [Quién] usa esta página en [situación] para completar [tarea] y obtiene [resultado verificable] |
| **Jerarquía** | Información principal [ ], información auxiliar [ ], qué se muestra primero por defecto [ ] |
| **Acciones** | Acción principal [ ], secundaria [ ], peligrosa [ ] y cómo se protege [ ] |
| **Diseño visual** | Componentes que se usan [ ], reglas de tamaño de letra, color y espaciado [ ] |
| **Estados** | Carga [ ], sin datos [ ], error [ ], éxito [ ], no disponible [ ] |
| **Accesibilidad** | Nombre accesible [ ], orden de navegación con teclado y de lectura [ ], contraste [ ] |
| **Adaptación** | Ventana estrecha [ ], tamaño de letra grande [ ], textos largos [ ] |
| **Límites** | Cuándo no usarlo [ ], alternativa [ ] |

Para comprobarlo, pide a alguien que no haya participado en el diseño que, basándose solo en la tabla, te cuente todo el recorrido: entrar, explorar, actuar, encontrarse con un error y salir. Si tiene que preguntarte algo a mitad del recorrido, aún te queda por completar la definición.

## 6. Cómo usar IA consultando las guías de otros para diseñar páginas

Esta sección es la más práctica.

Muchas personas cuando piden a la IA que diseñe páginas, solo dicen:

```md
Hazme una página de configuración, que se vea más sofisticada, estilo Apple
```

Este tipo de prompt es demasiado vago, la IA generalmente solo puede imitar "fondo blanco, bordes redondeados, sombras".

Para principiantes, un enfoque más práctico no es resumir un gran párrafo uno mismo, sino directamente pegar a la IA **las frases clave del texto original de la guía**.

Esto tiene dos ventajas:

- No necesitas "traducir" tú mismo el pensamiento de diseño
- La IA puede más fácilmente entender páginas y botones según las definiciones oficiales

### 6.1 Ejemplo 1: Hacer que la IA consulte Apple para diseñar una página de configuración

Primero busca una frase del texto original de Apple:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Puedes pegarlo directamente a la IA así:

```md
Consulta esta frase de las Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Ayúdame a diseñar una página de configuración de seguridad de cuenta.
Requiere jerarquía de página clara, información importante primero, agrupación ordenada.
```

El punto clave de escribirlo así: no necesitas explicar demasiado tú mismo, solo pega las palabras originales de Apple.

### 6.2 Ejemplo 2: Hacer que la IA consulte Fluent para diseñar botones de página de backend

Primero busca una frase del texto original de Fluent:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Puedes pegarlo directamente a la IA así:

```md
Consulta esta frase de Fluent 2:
"Only use one primary button in a layout..."

Ayúdame a diseñar los botones de un backend de gestión de equipos.
El botón de agregar miembro debe ser el más visible, exportar, filtrar, más operaciones más débiles, el botón de eliminar destacado por separado.
```

Esta frase es especialmente adecuada para principiantes porque le dice directamente a la IA: no pongas demasiados botones principales en un área.

### 6.3 Ejemplo 3: Hacer que la IA consulte simultáneamente las guías de página y botones

También puedes pegar dos frases originales a la vez, dejando que la IA consulte simultáneamente la página y los botones:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Luego escribe directamente así:

```md
Consulta las siguientes dos frases de guías de diseño originales:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Ayúdame a diseñar una página de detalles de proyecto.
La página incluye introducción del proyecto, miembros, actividad reciente y entrada de configuración.
Jerarquía de página más clara, solo un botón principal, otros botones más débiles.
```

Este método es especialmente adecuado para principiantes, porque solo necesitas saber copiar el texto original y agregar un par de frases con tus necesidades.

### 6.4 Práctica: incorpora las reglas de los diagramas al prompt

Aunque los diagramas de arriba parezcan pensados para personas, puedes convertir cada regla en una instrucción para la IA. Por ejemplo, puedes trasladar tal cual al prompt las mejoras de la comparación del antes y el después de la sección 1.

```md
Consulta la guía de botones de Fluent 2 y Layout de Apple HIG para ayudarme a diseñar una página de lista de proyectos.

Requisitos de la página:
- El título de la página tiene el tamaño más grande y aparece una sola vez. Pon los filtros y las acciones en filas separadas
- Usa espacios en blanco y tamaños de letra para establecer la jerarquía, sin añadir un borde a cada módulo
- Deja un solo botón principal en toda la página (Nuevo proyecto) y usa un botón con contorno para Exportar
- Eliminar afecta a un solo proyecto. Pon la acción en el menú «Más» de cada elemento, fuera de la parte superior de la página

Requisitos de los botones:
- Define seis estados: por defecto, al pasar el cursor, pulsado, con foco, deshabilitado y en carga
- Usa un color de advertencia para Eliminar, sin darle el aspecto de un botón principal
```

Así, en vez de pedir «algo más sofisticado, estilo Apple», le das a la IA **criterios concretos para tomar decisiones**.

## 7. Cómo usar IA consultando las guías de botones para generar directamente el diseño de botones

Si solo quieres hacer botones primero, también puedes pegar directamente el texto original de la guía de botones.

Por ejemplo, la definición de botón de Atlassian es muy corta:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Puedes preguntar a la IA así:

```md
Consulta esta frase de Atlassian:
"A button triggers an event or action."

Ayúdame a diseñar un conjunto de estilos de botones para páginas de backend.
Necesito botón principal, botón secundario, botón de eliminar, y dime dónde se usa cada uno.
```

Este tipo de prompt es especialmente adecuado para principiantes, básicamente es "pegar texto original + decir necesidades".

## 8. Resumen

Consultar guías de diseño de UI para diseñar páginas y botones, lo más importante no es "hacer que se parezca a alguien", sino aprender estas cosas:

1. Usar jerarquía para organizar páginas, en lugar de apilar contenido
2. Usar clasificación de botones para expresar prioridad de operaciones, en lugar de hacer que todos los botones sean igual de llamativos
3. Usar las definiciones, límites y criterios de juicio de las guías de diseño para guiar el diseño
4. Cuando la IA consulta las guías de otros, consulta "principios y estructura", no solo el aspecto

Cuando uses las guías de esta manera, lo que consultes no será solo un estilo, sino un conjunto de pensamiento de diseño maduro.

---

## Referencias

Los siguientes enlaces provienen todos de sistemas de diseño oficiales o documentación oficial:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design 3: [Layout overview](https://m3.material.io/foundations/layout/layout-overview/overview)
- Material Design 3: [Buttons accessibility](https://m3.material.io/components/buttons/accessibility)
- Apple Human Interface Guidelines: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- Apple Human Interface Guidelines: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Apple Human Interface Guidelines: [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Apple Human Interface Guidelines: [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
- Apple Human Interface Guidelines: [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
