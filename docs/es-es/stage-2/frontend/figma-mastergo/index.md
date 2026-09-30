# Introducción a Figma y MasterGo

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['es-es/stage-2/frontend/figma-mastergo'] ?? []
</script>

::: tip 🎯 Pregunta central
**¿Cómo crear prototipos web desde cero usando herramientas de diseño modernas?**
:::

---

## 1. ¿Por qué aprender herramientas de diseño frontend?

Antes de comenzar, debemos entender una pregunta: ¿por qué necesitamos aprender "herramientas de diseño frontend"? Si podemos construir páginas simplemente escribiendo código HTML/CSS, ¿realmente vale la pena aprender un software y tecnología adicionales?

En realidad, hacer funcionar una página y diseñar bien un producto son conceptos completamente diferentes. El código solo se preocupa de cómo renderizar en el navegador y cómo ejecutarse en diferentes dispositivos; las herramientas de diseño frontend resuelven el problema de la distribución de información: cómo organizar las interacciones frontend, cómo gestionar la navegación entre páginas, cómo asignar las prioridades visuales. Con solo configurar un lienzo en la herramienta de diseño, puedes comparar y definir la tipografía, la jerarquía de información y los métodos de interacción en una sola pantalla, eligiendo la presentación más adecuada.

Si empiezas directamente a escribir código o usas AI para generar páginas frontend completas, la experiencia de usuario generalmente no será muy buena. Un producto riguroso considera la comodidad de la interacción usuario-frontend y la distribución del contenido que cada página quiere transmitir, abordando desde la perspectiva del usuario primero el layout de la página frontend, y luego realizando la conversión o generación de código.

Además, desde la perspectiva de la colaboración en equipo, las herramientas de diseño frontend también reducen los costos de cooperación entre múltiples partes: diseñadores, product managers y desarrolladores ya no trabajan cada uno con su propia imagen mental o descripciones abstractas de código, sino que soportan colaboración simultánea, permitiendo a todos discutir gestión de versiones, cambios de requisitos y feedback en torno a un lienzo visible, anotable e iterable. Más aún, las herramientas de diseño frontend modernas ya no son solo software de dibujo: generan código parcial con un clic, gestionan sistemas de diseño y bibliotecas de componentes, automatizando o estandarizando gran parte del trabajo manual repetitivo (alineación, anotación, exportación, modificación de estilos), mejorando enormemente la eficiencia del desarrollo de diseño de páginas.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image8.webp)

### 1.1 La evolución de las herramientas de diseño frontend

A lo largo del tiempo, las herramientas de diseño frontend han sido una tecnología en continua evolución. Desde la era de Photoshop en los años 90 centrada en la edición de mapas de bits locales, hasta el flujo de trabajo vectorizado y basado en componentes que Sketch trajo alrededor de 2010, y luego desde 2016 cuando Figma llevó la colaboración completamente a la nube, los equipos de diseño pasaron gradualmente del trabajo individual a la colaboración en tiempo real entre múltiples personas. Llegando a 2025, la AI ya se ha integrado de manera tangible dentro de estas herramientas: desde "generar un borrador de página a partir de una frase" hasta "convertir directamente un mockup en una estructura frontend ejecutable", "diseño como código" y "cocreación humano-máquina" están pasando de concepto a productividad real.

En esta sección, seleccionaremos las dos herramientas de diseño frontend modernas más representativas: Figma y MasterGo. Por un lado, ambas cubren las capacidades centrales que necesita el UI/UX moderno (edición vectorial, sistema de componentes, auto layout, entrega de código, etc.), permitiéndote completar el ciclo completo desde wireframes hasta alta fidelidad y handoff al desarrollo; por otro lado, ambas herramientas han incorporado funciones AI prácticas después de 2025, ayudándote a convertir los mockups en programas realmente ejecutables manteniendo el prototipo intacto.

## 1.2 El viaje de su creación

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image9.webp)

En la era anterior a las herramientas especializadas de frontend, el trabajo de diseño visual de toda la industria de diseño de interfaces fue durante mucho tiempo asumido por software de diseño "todo en uno" como Photoshop. Los diseñadores completaban meticulosamente el diseño visual general de la página mediante capas superpuestas localmente, entregando finalmente archivos fuente .psd de gran tamaño a los ingenieros frontend — y para reproducir con precisión el mockup, el frontend debía completar manualmente tres tareas tediosas pero críticas:

La primera era "cortar imágenes": extraer uno por uno los elementos visuales independientes como botones, iconos, logos y módulos de fondo de la estructura multicapa del archivo .psd, exportándolos a formatos de imagen que las páginas web pueden cargar directamente como PNG o JPG (ya que las páginas web no pueden reconocer directamente la información de capas PSD).

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image10.webp)

La segunda era "medir dimensiones": usar las herramientas de medición del software para confirmar una por una la anchura y altura de cada elemento y los márgenes entre diferentes módulos (margin/padding), asegurando que todas las dimensiones fueran precisas al píxel.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image11.webp)

La tercera era "extraer anotaciones": extraer del mockup aquellos parámetros implícitos "invisibles pero necesarios" — como el tamaño de fuente, peso, interlineado, y los valores RGB o HEX de cada bloque de color, equivalentes a extraer y registrar manualmente las "especificaciones de diseño" que el diseñador no escribió en papel.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image12.webp)

Después de esto, la fase de implementación frontend realmente comenzaba. Ya sea usando HTML/CSS/JS nativo o frameworks como Vue o React, el proceso esencial era el mismo. El frontend reconstruía la estructura de la página usando "contenedores" como portadores centrales, según la jerarquía y semántica de cada módulo del diseño. Un contenedor es una unidad con límites de layout claros, dedicada a alojar y organizar elementos hijos; no presenta contenido directamente, sino que define el rango de disposición de los elementos internos a través de reglas como Flex o Grid. Los "bloques estructurales" (como la barra de navegación superior, sidebar, área de lista de artículos, footer, etc.) existen en base a contenedores; dentro de cada bloque estructural se anidan contenedores más pequeños para organizar elementos.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image13.webp)

En los frameworks frontend modernos, estos "bloques estructurales (y sus contenedores y elementos asociados)" se implementan generalmente como "componentes". Un componente se puede entender simplemente como: una unidad de interfaz reutilizable con límites claros que integra layout de contenedor y lógica. Los elementos que aparecen repetidamente con forma consistente en el mockup (como botones de estilo uniforme o tarjetas de artículo usadas repetidamente) se abstraen en componentes en el código: se pueden reutilizar en diferentes páginas/escenarios, reduciendo el desarrollo repetitivo.

Luego, el frontend usa el sistema de estilos para restaurar lo visual y el layout. Los recursos PNG/JPG exportados en la fase de corte de imágenes se usan como `<img>` dentro de componentes o bloques estructurales; las dimensiones obtenidas en la fase de medición se convierten en propiedades de estilo como `width`, `height`, `margin`, `padding`, `line-height`; los colores, fuentes, sombras y bordes redondeados de la fase de anotaciones se materializan en `color`, `font-family`, `font-size`, `box-shadow`, `border-radius` y otras propiedades.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image14.webp)

Sin embargo, el modelo centrado en archivos locales es inherentemente ineficiente. Las versiones se transmitían por email y almacenamiento en la nube, los borradores nuevos y viejos se confundían fácilmente, y la colaboración entre diseño y desarrollo dependía en gran medida de estos complejos métodos de interacción.

Con el auge de Internet móvil, la complejidad de las interfaces y la velocidad de iteración aumentaron rápidamente, y el enfoque "todo en uno" de Photoshop se volvió pesado. En esta etapa apareció Sketch. Sketch se enfocó en el diseño UI en sí, eliminando la mayor parte de la carga relacionada con el post-procesamiento visual; con Symbols convirtió en componentes los elementos de alta reutilización como botones, navegación y campos de entrada, donde un cambio se sincronizaba globalmente; junto con herramientas como Zeplin, generaba automáticamente anotaciones y fragmentos de estilo. Sketch introdujo el "pensamiento de componentes" en el flujo de trabajo de diseño. Sin embargo, seguía siendo una aplicación de escritorio basada en archivos locales; la colaboración en tiempo real requería soluciones alternativas como almacenamiento en la nube, plugins de terceros o herramientas de versiones.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image15.webp)

Lo que realmente cambió las reglas del juego fue Figma. Desde 2016, integró el diseño UI, la creación de prototipos y la colaboración por comentarios en el navegador, soportando múltiples funciones modernas: cursores en tiempo real de múltiples usuarios, comentarios en línea, línea temporal de versiones, enlaces para compartir, etc.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image16.webp)

A partir de entonces, el diseño de interfaces ya no eran archivos dispersos en las computadoras de cada uno, sino que se concentraban en un lienzo en la nube, en línea y actualizado en tiempo real. Alrededor de este lienzo, podemos imaginar ir un paso más allá, difuminando los límites entre diseño y código frontend con automatización o AI.

---

## 2. Introducción a Figma

Ahora pasamos de los conceptos abstractos a la práctica real. Por razones de tiempo, solo aprenderemos la lógica de operaciones básicas de Figma, asegurándonos de que incluso si nunca has usado una herramienta de diseño, puedas seguir los ejercicios. Para un aprendizaje completo de las funciones de Figma, consulta los tutoriales oficiales detallados: https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners

O consulta el siguiente tutorial para construir rápidamente una página web simple tipo portfolio: https://help.figma.com/hc/en-us/sections/35895585621655-Figma-Sites-collectio

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image17.webp)

A la izquierda está la entrada para crear nuevos proyectos y gestión de recursos; los botones de la esquina superior derecha son las funciones comunes de Figma. Make te permite usar una frase para que la AI genere un borrador aproximado de interfaz o estructura; Design es el área de trabajo principal donde realmente diseñas páginas web/app, construyes componentes y creas prototipos; FigJam es como una pizarra de equipo para pegar notas adhesivas, dibujar flujos y hacer discusiones preliminares; Buzz es una herramienta de producción escalable de activos de marca; y Site organiza estos diseños en páginas web o sitios de documentación realmente accesibles para exhibición externa.

A primera vista, Figma tiene muchas funciones y puede parecer difícil de empezar, pero en realidad este tipo de herramientas funcionales se dominan con la práctica. No tengas miedo de cometer errores al principio, ni intentes hacerlo perfecto al primer intento; solo empieza a experimentar y con el tiempo te volverás rápido.

En este tutorial, para una introducción rápida, explicaremos brevemente la función Design.

### 2.1 Crear un nuevo archivo Design

Desde la página principal o la entrada de la esquina superior derecha, selecciona **Design** y crea un nuevo archivo. Entrarás en un lienzo de diseño vacío.
Esta interfaz se divide aproximadamente en tres partes: a la izquierda están las páginas y capas; en el centro está el lienzo; a la derecha están las propiedades y estilos; y en la parte inferior hay una barra de herramientas.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image18.png)

### 2.2 Crear tu primer Frame (artboard)

Antes de colocar elementos formalmente, necesitas establecer un límite claro para la página. Este límite lo proporciona el Frame. Puedes seleccionar la herramienta Frame en la barra de herramientas inferior o presionar directamente la tecla F, y luego arrastrar un área rectangular en el lienzo.

1. Usa la herramienta Frame en la barra de herramientas inferior, o presiona directamente `F`.
2. Arrastra un área rectangular en el lienzo; en la barra de propiedades derecha, cambia el ancho a `1440` y la altura a `900`.
3. En la barra de capas izquierda, renombra este Frame, por ejemplo `My First Page` o el nombre de tu proyecto.

Este Frame es el contenedor de página para una pantalla. Todos los títulos, textos, botones, imágenes y demás contenidos deben colocarse dentro de este Frame.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image19.png)

### 2.3 Colocar texto y elementos simples en el Frame

Con el contenedor listo, aprendamos a colocar los componentes más básicos: título, subtítulo, botón y área de imagen placeholder.

1. Selecciona la herramienta de texto (la `T` en la barra inferior), haz clic en el Frame e ingresa el título de la página, por ejemplo: `My Portfolio`. En las propiedades de la derecha, aumenta el tamaño de fuente (por ejemplo, 96) y pon el peso en negrita.
2. Debajo del título, usa la herramienta de texto nuevamente para ingresar una breve descripción.
3. Dibuja un botón básico: usa la herramienta rectangular para dibujar un rectángulo de aproximadamente `200 x 48` debajo del título, dale un color de relleno notable y agrega un poco de borde redondeado.
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image20.png)
4. Usa la herramienta de texto sobre el rectángulo para ingresar el texto del botón, como `Get Started`, selecciona ambos y usa las herramientas de alineación superior para centrarlos.
5. Al lado o debajo del botón, dibuja un rectángulo gris claro grande como "área placeholder de imagen".

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image21.png)

### 2.4 Usar Auto Layout para integrar elementos

Si todos los elementos se arrastran al azar, la página pronto será un caos. Un concepto muy importante en Figma es **Auto Layout**, que puede convertir un grupo de elementos en un contenedor con reglas.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image22.png)

Puedes seleccionar "título principal + subtítulo + botón", y hacer clic en **Add Auto layout** en la barra de propiedades derecha.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image23.png)

De manera similar, el interior del botón también puede usar Auto Layout. Selecciona el rectángulo de fondo y el texto del botón, agrega Auto Layout, y configura ancho y alto como **Hug contents**. Así, el texto siempre permanecerá centrado en el botón, y el ancho se ajustará automáticamente.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image24.png)

### 2.5 Convertir el botón en un componente reutilizable

Ahora vamos a aprender un nuevo concepto: los componentes. Un componente es un elemento que puede ser reutilizado. Si presientes que usarás un botón repetidamente, considera convertirlo en componente:

1. Selecciona todo el contenedor del botón.
2. Clic derecho y selecciona Create component.
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image25.png)

Ahora el botón se ha convertido de un grupo de capas normales en un componente maestro. Si necesitas botones del mismo estilo en otras páginas o Frames, puedes arrastrarlos directamente desde el panel Assets.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image26.png)

Todos los botones usados son copias sincronizadas del maestro. Cuando modifiques el color, bordes redondeados o espaciado del maestro, todas las instancias se actualizarán automáticamente.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image27.webp)

Con esto, ya dominas el uso básico de Figma. No necesitas entender todas las funciones desde el principio; solo sigue los pasos para crear tu primera página simple, familiarízate con estas operaciones centrales y explora gradualmente más capacidades en los tutoriales oficiales.

---

## 3. Introducción a MasterGo

Después de comprender el flujo de trabajo básico de Figma, veamos MasterGo. Puedes considerar MasterGo como una versión china de Figma, con algunas diferencias en ciertas funciones. En general, mantiene un layout y filosofía de operación similares: también tiene lienzo, árbol de capas y panel de propiedades, y soporta componentes, estilos, auto layout y colaboración multiusuario. Para contenido más detallado, consulta el tutorial oficial de MasterGo.

### 3.1 Crear un nuevo archivo de diseño

1. **Entrar al panel de MasterGo**
   1. Abre el sitio web oficial de MasterGo e inicia sesión.
   2. Verás un área de "lista de archivos / lista de proyectos" para gestionar tus archivos de diseño.
      ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image28.webp)

2. **Crear nuevo archivo**
   1. Haz clic en el botón + Nuevo archivo de diseño en la esquina superior derecha, o selecciona importar archivos de Figma.
   2. Entrarás en un lienzo vacío, que es el espacio de trabajo de diseño de MasterGo.

3. **Conocer las áreas básicas de la interfaz**
   Una vez que aprendas a usar Figma, el uso de MasterGo es muy similar:
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image29.png)
   1. Barra de herramientas superior
   2. Panel izquierdo: capas y recursos
   3. Área del lienzo central
   4. Panel de propiedades derecho

### 3.2 Crear tu primer Frame

1. **Seleccionar herramienta Frame** — Usa la tecla `F` o la herramienta del toolbar.
2. **Arrastrar un área rectangular** — Configura ancho `1440` y alto `900`.
3. **Renombrar Frame** — En el panel de capas izquierdo, haz doble clic en el nombre.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image30.png)

### 3.3 Crear contenido en el artboard

Con el contenedor listo, usa métodos similares a los que aprendimos en Figma para obtener una página de exhibición similar. (Puedes intentar copiar elementos de texto del artboard de Figma; se soporta la importación directa de componentes de texto.)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image31.png)

Ten en cuenta que el comportamiento de Auto Layout es ligeramente diferente en MasterGo. Para lograr que el ancho del botón cambie con la longitud del texto como en Figma, necesitas crear primero un contenedor o componente sobre el elemento rectangular.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image32.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image33.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image34.png)

### 3.4 Generación de páginas con AI

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image35.png)

En MasterGo, una función interesante es la generación de páginas con AI. Puedes usar una frase o una imagen de referencia para generar componentes editables de MasterGo y obtener código directamente utilizable.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image36.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image37.webp)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image38.webp)

Tienes dos opciones: insertar el resultado generado directamente en el lienzo con el botón azul, o usar la función de vista previa de código para obtener el código completo de la página.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image39.webp)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image40.webp)

Después de insertar el resultado, puedes hacer ajustes más finos al layout general y detalles de elementos (fuentes, colores, espaciado, etc.) hasta que el efecto final cumpla completamente tus expectativas.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image41.webp)

---

## 4. Siguiente paso: del prototipo al código

En el contenido anterior, ya aprendimos las operaciones básicas de Figma y MasterGo, pudiendo crear prototipos de interfaz con estructura completa. El siguiente paso clave es: **¿cómo convertir estos mockups en código frontend que realmente funcione en el navegador?**

::: tip 📚 Tutorial siguiente
Para métodos detallados, consulta [De prototipo de diseño a código de proyecto](../design-to-code/), donde aprenderás:

- **Conversión directa con AI multimodal**: enviar capturas del mockup a AI para generar código HTML/React directamente
- **Figma Make**: usar la herramienta AI oficial de Figma para reproducir el diseño con alta precisión y exportar código
- **MasterGo AI**: generar páginas editables con un clic y obtener código

Cada método tiene sus ventajas y desventajas, adecuados para diferentes escenarios. Se recomienda elegir el flujo de trabajo adecuado según las necesidades del proyecto.
:::

---

## 5. Resumen

A través de esta sección, ya has aprendido:

1. **El valor de las herramientas de diseño frontend**: entendiste por qué necesitas herramientas de diseño y cómo resuelven problemas de distribución de información y colaboración en equipo.

2. **Operaciones básicas de Figma**:
   - Crear archivos Design y Frames (artboards)
   - Agregar elementos básicos como texto y formas
   - Usar Auto Layout para layouts adaptativos
   - Crear un sistema de componentes reutilizables

3. **Operaciones básicas de MasterGo**:
   - Familiarizarte con el layout de interfaz similar a Figma
   - Crear Frames y contenido básico de artboard
   - Usar la función de generación de páginas con AI para crear prototipos rápidamente

::: tip 💡 Siguiente paso
Ahora que dominas el uso básico de las herramientas de diseño frontend, puedes intentar:
- Diseñar una página de portfolio personal
- Diseñar prototipos de interfaz para próximos proyectos
- Aprender [De prototipo de diseño a código de proyecto](../design-to-code/) para convertir mockups en código ejecutable

Si estás completando el proyecto [Retratos de Hogwarts](../hogwarts-portraits/), puedes diseñar primero el prototipo de interfaz y luego exportar código para combinarlo con las funciones de diálogo AI.
:::

<RelatedArticlesSection
  title="Artículos relacionados"
  description="Se recomienda continuar aprendiendo profundización de diseño UI y práctica de diseño a código."
  :items="relatedArticles"
/>
