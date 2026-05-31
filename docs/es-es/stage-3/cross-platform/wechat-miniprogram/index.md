# Cómo construir el Mini Programa de WeChat más simple

# 1. Qué son los Mini Programas de WeChat y el desarrollo de Mini Programas

En este tutorial, completaremos un ciclo completo: desde una idea en tu mente hasta un mini programa real que puede ser buscado y abierto por código QR dentro de WeChat.

Antes de comenzar a construir, necesitamos establecer dos conocimientos básicos.

El primero es la **esencia**: ¿qué es exactamente un mini programa de WeChat? ¿En qué se diferencia de una aplicación normal o un sitio web? ¿Por qué tantos productos eligen este formato? Solo cuando comprendas la lógica central podrás juzgar si tu idea se adapta a un mini programa.

El segundo es el **camino**: cuando dices "quiero construir un mini programa", ¿cómo se ve el camino completo desde cero hasta el lanzamiento? ¿Cuáles son los nodos clave en ese camino - en qué pensar durante la ideación, cómo configurar el entorno, cómo el desarrollo asistido por IA mejora la eficiencia, qué obstáculos aparecen en la depuración del simulador, y qué resuelve cada cuenta de prueba frente al lanzamiento formal. Si recorres mentalmente este proceso primero, no te perderás durante la implementación.

Después de aclarar estas dos preguntas, podemos entrar formalmente al desarrollo. Comencemos con la primera pregunta: ¿qué es exactamente un mini programa de WeChat?

## 1.1 Mini Programa de WeChat

Un mini programa de WeChat puede verse como una aplicación que vive dentro de WeChat. No necesitas buscar en una tienda de aplicaciones, descargar o instalar. Los usuarios pueden buscar por nombre en WeChat, escanear un código QR, o abrir una tarjeta compartida y usarlo inmediatamente. Después de usarlo, simplemente lo cierran. No ocupa permanentemente la pantalla de inicio del teléfono ni el almacenamiento.

Para los usuarios regulares, los mini programas resuelven muchas "tareas pequeñas": rastrear entregas, pedir café, ver pedidos, jugar un juego rápido. El inicio rápido y la entrada unificada dentro de WeChat son sus mayores características de experiencia.

Para las empresas y desarrolladores, los mini programas son un "formato de aplicación pequeña" que se puede buscar y compartir. Mientras te registres en la Plataforma Oficial de WeChat, completes la configuración y pases la revisión, tu mini programa puede abrirse a todos los usuarios de WeChat. Comparado con las aplicaciones tradicionales, es más fácil conseguir el primer lote de usuarios porque la gente ya está acostumbrada a hacer muchas tareas en WeChat.

En este tutorial, no construiremos un sistema de negocio complejo. Elegimos un ejemplo clásico: el juego de la serpiente. Es pequeño y lógicamente claro, pero incluye los elementos completos que un mini programa debería tener: múltiples páginas, interacciones simples, cambios de estado, registro de puntuación, etc. Es perfecto como tu primer proyecto.

## 1.2 Desarrollo de Mini Programas de WeChat

Después de entender "qué son los mini programas", la siguiente pregunta es: ¿qué implica realmente desarrollar uno?

Necesitas un objetivo claro (por ejemplo, un juego de serpiente que los usuarios puedan jugar en cualquier momento), diseñar la interfaz que verán los usuarios, definir qué debe suceder bajo diferentes acciones, y finalmente publicarlo.

En el desarrollo tradicional, los programadores usualmente lideran todos estos pasos y escriben mucho código. En el desarrollo asistido por IA, esto se puede dividir más claramente: tú explicas lo que quieres, y la IA ayuda con la mayoría de los detalles de implementación. Eso significa que para los principiantes, la habilidad más importante ya no es memorizar sintaxis, sino describir claramente los requisitos y comprender la salida de la IA.

## 1.3 Varias formas de desarrollar Mini Programas de WeChat

En proyectos reales, la gente usa diferentes rutas técnicas. Para evitar abrumarte con términos al principio, solo haremos una clasificación aproximada para que entiendas los caminos comunes.

La primera forma es usar las capacidades nativas oficiales directamente. Después de crear un proyecto en WeChat DevTools, verás un conjunto fijo de tipos de archivos usados para describir la estructura de páginas, estilos y lógica. Esta forma se mantiene cerca de la documentación oficial y da un control fuerte, pero para los aprendices de frontend por primera vez, la curva de aprendizaje es un poco más pronunciada.

La segunda forma es usar frameworks multiplataforma, como uni-app. Principalmente escribes código similar al web localmente (por ejemplo archivos `.vue`), y el framework convierte este código a formatos que los mini programas de WeChat pueden ejecutar. La ventaja es la estructura unificada. Si luego publicas en otras plataformas (como H5 o App), los cambios son relativamente menores.

Basado en estos dos métodos, este tutorial se enfoca en el SOP de mini programas usando herramientas asistidas por IA. Por ejemplo, abre todo el proyecto en Trae y dile a la IA integrada directamente: "Por favor añade una página de inicio con título y botón en este archivo" o "Por favor crea una página de juego que muestre la serpiente y la puntuación." La IA generará nuevos fragmentos de código o modificará/refactorizará el código existente basándose en el contexto actual del proyecto.

Estas tres formas no se excluyen mutuamente. Puedes perfectamente construir en un proyecto uni-app mientras usas Trae AI para la mayor parte del trabajo de código. La clave no es elegir un método, sino saber dónde estás ahora y qué herramientas están disponibles.

## 1.4 Pasos de Desarrollo de Mini Programas de WeChat cubiertos en este artículo (Vista previa de alto nivel)

Este tutorial sigue un ritmo desde el **entorno hasta el producto final**. Alrededor del ejemplo de la serpiente y el estilo de vibecoding de Trae, dividimos el proceso en una ruta reutilizable. En capítulos posteriores, pasarás por estas etapas:

1. Construir base conceptual: entender qué son los mini programas, qué métodos de desarrollo comunes existen, y para quién es este mini programa de serpiente y en qué escenarios se usa.
2. Preparar entorno: registrar cuenta de mini programa, instalar HBuilderX, Trae y WeChat DevTools, luego crear un esqueleto básico de proyecto con HBuilderX que pueda ejecutarse en WeChat DevTools y mostrar la página más simple primero.
3. Entrar al desarrollo formal: abrir proyecto en Trae, usar diálogo de vibecoding con IA para generar página de inicio y diseño de página de juego paso a paso, e implementar jugabilidad central como movimiento de serpiente, comer comida y fin del juego.
4. Después de que las funciones centrales funcionen, aprender a usar IA como "compañero de depuración y refactorización": pedirle que diagnostique bugs, ordene la estructura cuando el código se vuelva desordenado, y gradualmente añada detalles como inicio/pausa, récord de puntuación alta y pulido de UI.
5. Entrar a publicación: construir proyecto en una versión reconocible por WeChat, previsualizar y probar en dispositivos reales en WeChat DevTools, lanzar primero con cuenta de prueba y versión de experiencia para validación de proceso, luego completar registro y revisión antes del lanzamiento formal para que otros puedan buscar y jugar tu mini programa.

Esta sección solo dibuja el mapa completo y aún no expande comandos o detalles de código. Por ahora, recuerda estos 5 pasos: **Entender -> Configurar entorno -> Desarrollo Vibecoding -> Depurar y pulir -> Construir y lanzar**. Los capítulos posteriores profundizarán en cada paso, mostrando qué preparar, qué decirle a la IA y qué resultados deberías ver en pantalla en cada etapa.

# 2. Preparación del Entorno

Antes de escribir cualquier línea de código, prepararemos el entorno primero.
El objetivo de esta parte es asegurarse de que ya no te quedes atascado en **dónde descargar herramientas y por qué las cosas no funcionan**, para que puedas enfocarte directamente en el diálogo con la IA y la implementación de requisitos.

Si puedes abrir un navegador, descargar archivos y hacer doble clic en instaladores, puedes completar esta sección.

## 2.1 Tres Herramientas Usadas en Este Tutorial

Para el desarrollo del mini programa de la serpiente, usamos tres herramientas juntas, cada una con diferentes responsabilidades:

1. La primera es Trae. Piensa en ella como un editor de código integrado con IA. Puede abrir archivos de proyecto como un IDE normal y también dejarte chatear con IA en lenguaje natural para generar, modificar y explicar código. La mayoría de las operaciones de "construir mini programa con IA" en este tutorial ocurren en Trae. Descarga la última versión desde https://www.trae.cn .
2. La segunda es HBuilderX. Tiene un fuerte soporte para Vue y uni-app, y ofrece plantillas de mini programa listas para usar. La usamos para "generar con un clic" un proyecto base de mini programa - esto es establecer los cimientos antes de pasarlo a Trae + IA para mayor iteración. Descarga desde https://www.dcloud.io/hbuilderx.html .
3. La tercera es WeChat DevTools. Esta herramienta oficial se usa para desarrollar y previsualizar mini programas. Ejecuta tu proyecto en el escritorio y soporta depuración en dispositivo real en el móvil. Descarga desde https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .

En resumen: HBuilderX crea el proyecto base rápidamente, Trae te ayuda a programar con IA, y WeChat DevTools muestra el mini programa ejecutándose realmente.

## 2.2 Registrar Cuenta en la Plataforma Oficial de WeChat y Obtener AppID

Con las herramientas listas, aún necesitas una **identidad de mini programa**, que se crea en la Plataforma Oficial de WeChat.
Si nunca has registrado un mini programa antes, sigue este orden:

1. Ingresa https://mp.weixin.qq.com en tu navegador, abre la Plataforma Oficial de WeChat e inicia sesión escaneando el código QR con WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image1.png)

2. Elige "Mini Program" en la página de inicio y completa las indicaciones de registro, incluyendo correo electrónico, número de teléfono y tipo de entidad (individual o empresa).
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image2.png)
3. Después del registro exitoso, entra al backend, busca "Gestión de Desarrollo" o "Configuración de Desarrollo", y verás un ID único llamado AppID. Esta es la identidad de tu mini programa y se usará en la configuración del proyecto más adelante.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image3.png)

Se recomienda guardar el AppID en un lugar fácil de encontrar. En secciones posteriores, llenaremos este valor directamente para mapear el proyecto local a tu mini programa en línea.

## 2.3 Instalar WeChat DevTools

Luego necesitamos un lugar para ejecutar y previsualizar realmente los mini programas. Eso es exactamente para lo que sirve WeChat DevTools.

1. Visita la página de descarga https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .
   En esta página verás versiones para diferentes sistemas operativos. Usualmente elige la versión estable que coincida con tu sistema, como Windows 64-bit o macOS.
2. Después de la descarga, haz doble clic en el instalador y sigue el asistente paso a paso. Si no estás seguro, mantén las opciones predeterminadas.
3. Después de la instalación, inicia WeChat DevTools desde el escritorio o menú de inicio. En el primer inicio, muestra un código QR y te pide que lo escanees con WeChat. Escanea y autoriza para entrar a la interfaz principal.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image4.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image5.png)

Más adelante, cuando los archivos del proyecto estén listos en Trae, importaremos el mini programa construido a WeChat DevTools y veremos los resultados reales de ejecución aquí.

## 2.4 Preparar Trae y HBuilderX

Finalmente, instala las dos herramientas usadas para la codificación real: Trae y HBuilderX.

Puedes **instalar Trae primero**. Visita https://www.trae.cn en el navegador y descarga la versión correcta para tu sistema operativo. La instalación es como un software normal: haz doble clic en el instalador y sigue las indicaciones. Después de instalar, obtienes un IDE que puede abrir carpetas locales, inspeccionar código y chatear con IA. Todos los pasos posteriores de vibecoding ocurren aquí.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image6.png)

**Luego instala HBuilderX**. Visita https://www.dcloud.io/hbuilderx.html y descarga el paquete para tu sistema operativo. HBuilderX es ligero y se inicia rápidamente. Después de instalar, puedes echar un vistazo breve a la interfaz; no es necesario un estudio profundo de funciones ahora. En capítulos posteriores, lo usamos para crear una plantilla de mini programa uni-app como punto de partida del proyecto.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image7.png)

Después de terminar esta sección, tu entorno está completo: tienes una cuenta de mini programa + AppID, una herramienta de previsualización en tiempo de ejecución y un IDE de codificación con IA. A continuación comenzamos desde **crear el primer esqueleto de proyecto** y hacer que estas herramientas realmente funcionen.

## 2.5 Preparar Archivos Base

1. Haz clic en "Nuevo Proyecto".

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image8.png)

2. Elige la plantilla predeterminada, establece el nombre del mini programa, selecciona la ruta de almacenamiento, luego haz clic en crear en la esquina inferior derecha:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image9.png)

3. Aparece la pantalla de creación exitosa:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image10.png)

4. Luego busca esta carpeta en el sistema de archivos, ábrela en Trae y verás que los archivos base están todos listos:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image11.png)

# 3. Desarrollo del Mini Programa

En las primeras dos partes, ya aclaramos "qué son los mini programas" y "cómo configurar herramientas y entorno". Desde esta sección, entramos a la práctica: no solo conceptos, sino IA ayudándote realmente a construir el mini programa de la serpiente desde cero.

En esta sección, recorrerás un SOP completo para la fase de desarrollo, incluyendo aproximadamente:

1. Abrir el proyecto actual en Trae y darle a la IA tu primera instrucción completa para que diseñe e implemente una versión ejecutable de la serpiente basándose en el esqueleto actual.
2. Dejar que Trae modifique los archivos reales del proyecto directamente, no solo produzca "código de ejemplo", y aprender a usar rollback para restaurar el estado anterior cuando sea necesario.
3. Regresar a HBuilderX y WeChat DevTools, ejecutar en el simulador de mini programa, y jugar esta versión en el simulador para cambiar de "perspectiva de código" a "perspectiva de usuario".
4. Basándote en los resultados del juego, seguir proponiendo modificaciones en lenguaje natural y dejar que la IA itere los controles de botones a joystick, mientras experimentas un ciclo completo de "encontrar problema -> describir problema -> IA corrige -> verificar nuevamente".

Puedes elegir diseñar cada página y botón antes del desarrollo.
Pero para principiantes completos, el diseño de interfaz e interacción en sí mismo es también un dominio nuevo (más adelante mostraremos diseño asistido por IA). Así que en esta ronda usamos intencionalmente otra forma: comenzar primero - dejar que la IA genere una versión ejecutable, luego refinar gradualmente viendo efectos y chateando en lenguaje natural.

## 3.1 Explicar Requisitos Claramente de Una Vez: Darle a Trae el Primer "Prompt Maestro"

Después de abrir el proyecto de mini programa preparado en Trae, no me apresuré a editar una línea específica. En cambio, le dije al asistente de IA integrado:

**Le di a la IA un comando: basándose en el framework actual, construir un mini programa de serpiente. Por favor diseña este mini programa y escríbeme un prompt.**

En otras palabras, no le pedí que "escribiera una función paso a paso." Primero lancé un objetivo completo, dejé que la IA ayudara a planificar, y la IA no solo planificó sino que también implementó directamente la primera versión.

Después de recibir esta instrucción, Trae lee la estructura actual del proyecto, determina dónde añadir páginas y dónde añadir lógica, y modifica directamente los archivos/código del proyecto. No necesitas escribir código a mano ni crear/modificar carpetas manualmente.

## 3.2 Dejar que la IA Modifique el Código Real Automáticamente, No Codificar Manualmente

Cuando ejecutas esta instrucción en Trae, la IA entra en un flujo de "edición de proyecto". Durante este proceso, puedes observar puntos clave:

1. Explica su pensamiento en el área de chat, por ejemplo a qué directorios añadirá páginas y cómo organizará la lógica del juego.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image12.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image13.png)

2. Edita directamente los archivos reales del proyecto, en lugar de solo dar "código de ejemplo" para copiar y pegar.
3. Después de terminar, Trae produce un breve resumen diciéndote qué archivos se cambiaron y qué se hizo.

Si no estás satisfecho con esta ronda (o crees que algo está mal), no necesitas entrar en pánico. Trae proporciona rollback en la parte superior izquierda fuera del cuadro de chat. Puedes restaurar el estado del proyecto antes de esta instrucción con un clic - como una tecla de deshacer de seguridad.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image14.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image15.png)

## 3.3 Ver Efectos en HBuilderX y WeChat DevTools

Después de que la IA completa la primera ronda de desarrollo, el código ha sido escrito en el proyecto, pero aún no has visto el efecto real del lado del jugador.
A continuación necesitamos ejecutarlo.

Operación específica: regresa a HBuilderX, busca el menú superior "Ejecutar", selecciona "Ejecutar en Simulador de Mini Programa" -> "WeChat DevTools." Esto activa la construcción del proyecto y abre el resultado en WeChat DevTools.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image16.png)

El panel de salida en la parte inferior muestra el proceso de construcción. Si el estado final es "listo" sin errores, la construcción fue exitosa. Luego cambia a WeChat DevTools para verificar la UI y las funciones de esta versión.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image17.png)

En la mayoría de los casos, HBuilderX abre automáticamente WeChat DevTools y puedes ver directamente el mini programa actualizado. Si no se abre automáticamente, haz esto:

1. Detén la ejecución actual en HBuilderX primero.
2. Inicia WeChat DevTools manualmente y mantenlo abierto.
3. De vuelta en HBuilderX, haz clic en "Ejecutar -> Ejecutar en Simulador de Mini Programa -> WeChat DevTools" nuevamente.

Luego puedes ver el mini programa de vibecoding en WeChat DevTools:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image18.png)

## 3.4 Usar Lenguaje Natural para Ajustar Repetidamente Hasta Estar Satisfecho

En esta práctica, la IA inicialmente generó una serpiente controlada por botones: cuatro botones de dirección en pantalla, y la serpiente cambia de dirección cuando se hace clic. Es completamente jugable, pero personalmente prefiero el control por joystick. Para tus solicitudes de ajuste (no solo funciones, sino también diseño de UI y layout; una vez experimentado, puedes incluso pedirle a la IA que integre APIs de modelos externos o bases de datos), nuevamente: solo necesitas describir los requisitos en lenguaje natural.

Esta es la ventaja central del vibecoding: no tienes que profundizar en el código para enlazar eventos o lógica de coordenadas. Le dices directamente a la IA lo que quieres. Por ejemplo, en el chat de Trae puedes escribir:

Reemplazar los botones con control por joystick. Cuando el usuario suelta el joystick, la serpiente debe seguir moviéndose en la dirección actual hasta la próxima acción del joystick.

Mientras el requisito sea claro, la IA localizará automáticamente los archivos objetivo y modificará los estilos de control, las vinculaciones de interacción y la lógica de manejo de dirección.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image19.png)

Después de la modificación, regresa a WeChat DevTools para verificar.
Si los cambios no son visibles inmediatamente, haz clic en "Ejecutar" en DevTools o actualiza la ventana de previsualización para aplicar la última construcción. Si aún no se actualiza, detén la ejecución en HBuilderX y ejecuta en el simulador nuevamente, luego podrás ver el mini programa actualizado:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image20.png)

## 3.5 ¿Qué Hacer Si Aparecen Problemas: Seguir Comunicándose en Lenguaje Natural

Las versiones generadas por IA no siempre son perfectas al principio. Puedes encontrar:

- errores en tiempo de ejecución y la aplicación no se abre;
- funciones mayormente correctas, pero detalles difieren de tu expectativa;
- UI usable pero aún no visualmente atractiva o suficientemente conveniente.

En estos momentos, no necesitas editar código a ciegas tú mismo. Describe los problemas directamente al asistente de IA de Trae en lenguaje natural, por ejemplo:

"El control por joystick funciona ahora, pero la serpiente a veces se detiene repentinamente. Por favor revisa la implementación actual."
O: "El juego ya es jugable, pero la interfaz se siente abarrotada. Quiero más espaciado vertical en el móvil. Por favor ajusta el layout."

La IA usará el contexto actual del proyecto + tu descripción, y luego proporcionará y aplicará cambios de código directamente. Si el resultado empeora o la dirección es incorrecta, aún puedes hacer rollback a la versión estable anterior e intentar con otra formulación.

A través de varias rondas así, puedes pulir desde la "primera versión aproximada" hasta una serpiente basada en joystick más cercana a tu preferencia.
Por ejemplo, le di una imagen de referencia de estilo y pedí a la IA que ajustara el estilo de UI en consecuencia:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image21.png)

## 3.6 Resultado Final y Resumen de la Sección

Después de rondas repetidas de **descripción en lenguaje natural -> modificación por IA -> previsualización en WeChat DevTools -> microajustes continuos**, finalmente obtuve este resultado:

- página de juego completa;
- la serpiente se mueve suavemente y come comida;
- control por joystick soportado;
- se ejecuta correctamente en el simulador de mini programa.

Ejemplos del producto final:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image22.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image23.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image24.png)

En esta sección, has visto un ciclo cerrado completo:

1. En Trae, una instrucción clara dejó que la IA construyera la primera versión del mini programa de serpiente;
2. Con HBuilderX + WeChat DevTools, validar el efecto real desde la perspectiva del usuario;
3. Seguir proponiendo modificaciones en lenguaje natural, dejar que la IA maneje la optimización de funciones y UI;
4. Cuando aparecen problemas, usar rollback + reejecución para mantener el proceso seguro.

A continuación, puedes usar el mismo ritmo para tus propias ideas: no limitado a la serpiente, sino también mini programas de utilidades, páginas de eventos o prototipos de negocio reales. Tu tarea principal es pensar claramente y describir claramente. Deja que la IA y las herramientas manejen el resto.

# 4. Publicación del Mini Programa

En los tres capítulos anteriores, completamos el flujo completo desde **configuración de entorno** -> **desarrollo asistido por IA** -> **ejecución de la serpiente en el simulador local**.

Desde este capítulo, la pregunta clave se convierte en: **¿cómo publicar realmente este trabajo en WeChat, para que no sea solo un juguete, sino un mini programa utilizable?**

Para reducir la dificultad, primero tomaremos el **ciclo cerrado más corto**: publicar solo como una **versión de prueba/experiencia** para ti y algunos compañeros de equipo. Después de que la función y la experiencia sean estables, proceder al lanzamiento público formal.

Este capítulo primero cubre 4.1 para completar el camino más corto para el **lanzamiento de versión de experiencia**. El lanzamiento formal para todos los usuarios se explica en 4.2.

## 4.1 SOP Más Corto - Lanzar como Versión de Experiencia

El objetivo de esta subsección es solo una cosa: dejarte abrir tu mini programa de serpiente en WeChat como una **versión de experiencia**.

Todo el flujo son cuatro tareas:

1. Encontrar y confirmar tu AppID en la Plataforma Oficial de WeChat.
2. Configurar este AppID en tu proyecto.
3. Subir la versión actual en WeChat DevTools.
4. Regresar a la Plataforma Oficial y establecer esta versión subida como "Versión de Experiencia."

Vamos en este orden.

### 4.1.1 Confirmar AppID en la Plataforma Oficial de WeChat

Primer paso: confirmar tu AppID de mini programa en la Plataforma Oficial de WeChat.

Ya hiciste esto una vez en **Sección 2 Preparación del Entorno**. Aquí lo usamos para real.

1. Visita `https://mp.weixin.qq.com` e inicia sesión en el backend de tu mini programa.
2. Busca "Gestión de Desarrollo" en el menú izquierdo, luego entra a "Configuración de Desarrollo."
3. En la parte superior, busca el área "ID de Desarrollador". Hay una línea "AppID (ID de Mini Programa)" - este es tu ID único.

Este ID debe coincidir exactamente con la configuración del proyecto. De lo contrario WeChat lo ve como otra identidad de aplicación y la previsualización/publicación fallará.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image25.png)

### 4.1.2 Llenar AppID en el Proyecto

Segundo paso: escribir este AppID en la configuración del proyecto para que la construcción local se mapee a tu cuenta oficial de mini programa.

Si tu proyecto usa la plantilla uni-app, haz esto:

1. Abre HBuilderX y carga el proyecto de la serpiente.
2. Encuentra `manifest.json` en el árbol de archivos y ábrelo.
3. Desplázate hasta "Configuración de Mini Programa de WeChat" y verás un campo como "AppID de Mini Programa de WeChat."
4. Pega el AppID copiado de la Plataforma Oficial exactamente, luego guarda el archivo.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image26.png)

Ahora tu proyecto local ha reclamado esta identidad de mini programa. A continuación, cuando subas desde WeChat DevTools, se registrará bajo este AppID.

### 4.1.3 Subir una Versión en WeChat DevTools

Ya hemos ejecutado el proyecto en WeChat DevTools para previsualizar en el simulador.

Ahora haremos: "empaquetar el código actual como una versión y subirlo al servidor."

Pasos:

1. En la barra de herramientas superior derecha de WeChat DevTools, haz clic en "Subir."
2. En la ventana emergente, llena dos campos clave:
   1. Número de versión: por ejemplo `1.0.0` (solo dígitos y puntos).
   2. Nota del proyecto: descripción breve, como "Jugabilidad central completada."
3. Confirma y haz clic en "Subir." El panel de salida muestra el proceso de construcción. Si todos los pasos se ponen verdes y la subida se completa, esta versión se ha enviado exitosamente al servidor de WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image27.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image28.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image29.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image30.png)

### 4.1.4 Establecer la Versión Subida como Versión de Experiencia en el Backend

La subida solo envía el código al lado de WeChat. Aún necesitas decirle al sistema "esta es una versión de experiencia."

Paso final: regresa al backend de la Plataforma Oficial y completa el ciclo.

1. Abre `https://mp.weixin.qq.com` y entra al backend del mini programa.
2. En el menú izquierdo, busca "Gestión" -> "Gestión de Versiones."
3. En la sección "Versión de Desarrollo", deberías ver la versión subida: versión `1.0.0`, tu nota, y la marca de tiempo de la subida reciente.
4. En el lado derecho de esta fila, usa el menú desplegable/botón de acción para elegir "Establecer como Versión de Experiencia," confirma la acción. Antes de este paso, asegúrate de que tu categoría principal esté configurada en la página de inicio/configuración de categorías.

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image31.png)

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image32.png)

Después de completar, esta versión se convierte en la "Versión de Experiencia" de tu mini programa. Puedes generar un código QR de experiencia en el backend, o añadirte a ti/equipo como miembros de experiencia, luego escanear en WeChat para pruebas en dispositivo real.

En este punto, hemos terminado el ciclo más corto desde el proyecto local hasta el lanzamiento de prueba:

No necesitas abrir a todos los usuarios de WeChat inmediatamente. En un rango seguro, ejecuta el mini programa real en un entorno real de WeChat primero. Eso es suficiente para pruebas de funciones, recolección de feedback e iteración.

## 4.2 Lanzamiento Formal del Mini Programa

Después de que la versión de experiencia funcione bien, ya puedes jugar este mini programa de serpiente en tu propio WeChat.
El siguiente paso es pasar de usuarios de experiencia limitados a un mini programa de WeChat completamente público.

Dividamos esto en pasos: completar información básica, elegir categoría, terminar el registro, luego enviar para revisión. Sigue este orden:

### 4.2.1 Entrar al Flujo de Publicación del Mini Programa

Primero regresa al backend de la Plataforma Oficial de WeChat e inicia sesión.
En la navegación izquierda busca las entradas relacionadas con "Gestión de Versiones / Publicación" (la UI puede variar ligeramente con el tiempo). Encontrarás "Flujo de Publicación de Mini Programa."

Después de entrar, el área superior muestra una barra de progreso. Debajo lista pasos como:

1. Información del Mini Programa
2. Categoría del Mini Programa
3. Información Operativa / Registro
4. Verificación de WeChat (dependiendo del tipo de entidad)

Al principio el progreso es 0%. A medida que se completa cada paso, el sistema se actualiza automáticamente.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image33.png)

### 4.2.2 Llenar Información Básica del Mini Programa

El primer paso es completar la "tarjeta de presentación" de tu mini programa, que es lo que los usuarios ven primero en WeChat.

En la página "Información del Mini Programa", usualmente necesitas llenar/confirmar:

1. Nombre del mini programa
   Esto aparece en los resultados de búsqueda y en el encabezado de la aplicación. Tiene límites de longitud y reglas de nomenclatura. Elige un nombre que describa la función y sea fácil de recordar.
2. Descripción / introducción
   Usa una o dos oraciones para explicar qué hace este mini programa, por ejemplo: "Un juego de serpiente desarrollado con codificación asistida por IA, adecuado para juego casual rápido."
   Mantén la descripción consistente con la funcionalidad real y evita texto de marketing exagerado.
3. Ícono y capturas de pantalla
   1. El ícono usualmente requiere una imagen cuadrada con soporte PNG/JPG y límites de tamaño/píxeles (revisa las reglas de la página). Usa un ícono simple y de alto contraste.
   2. Sube varias capturas de pantalla como página de inicio, página de juego, página de configuración. Ayudan a los usuarios a entender el contenido.
4. Otros campos requeridos
   Como etiquetas y región de servicio, llenar según las indicaciones.
   Solo un principio: toda la información debe coincidir con la funcionalidad real de tu mini programa de serpiente.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image34.png)

Después de completar todos los campos, haz clic en Guardar o Siguiente. El primer paso en el flujo de publicación está completo.

### 4.2.3 Seleccionar Categoría de Servicio del Mini Programa

Después de la información básica, el asistente te guía a "Categoría del Mini Programa."
La categoría es la clasificación de tu aplicación en WeChat, afecta la ruta de revisión y la posterior visualación/operación.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image35.png)

En esta página verás "Añadir Categoría." Haz clic y elige la categoría apropiada en el árbol de categorías del sistema, por ejemplo:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image36.png)

1. Elige "Educación" como categoría de nivel superior;
2. Luego elige una subcategoría más específica como "Herramientas Educativas / Asistente de Enseñanza." En este ejemplo, se seleccionan herramientas educativas como ayuda de aprendizaje para vibecoding.

En tu propio proyecto, simplemente elige la categoría más cercana según el caso de uso real.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image37.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image38.png)

Después de confirmar la categoría, haz clic en Guardar. Si la página muestra "categoría creada exitosamente" y muestra tu nuevo elemento, este paso está completo.

### 4.2.4 Completar Información de Registro

A continuación, el flujo de publicación pide "Información Operativa / Registro." Esto verifica la entidad responsable detrás del mini programa.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image39.png)

Bajo el ejemplo de entidad individual, el flujo usualmente incluye:

1. Seleccionar tipo de registro
   Elige entre tipos como "Individual" o "Empresa," consistente con tu entidad de registro.
2. Llenar información de la entidad
   Incluye nombre, tipo de documento, número de documento, etc. Esto debe coincidir con la información de registro, de lo contrario la revisión puede rechazar.
3. Subir documentos de respaldo
   Usualmente requiere fotos de documento de identidad u otros archivos de prueba, con requisitos específicos de formato/tamaño/claridad mostrados en la página. Prepara y sube archivos claros.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image40.png)

Después del envío, el sistema entra en "en revisión" y muestra un mensaje como "Información enviada, por favor espera." Esto puede tomar algún tiempo. Puedes verificar el progreso en cualquier momento en el backend.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image41.png)

### 4.2.5 Enviar para Revisión y Esperar el Lanzamiento Formal

Cuando "Información del Mini Programa," "Categoría" e "Información Operativa/Registro" estén todos completos, haz la acción final: enviar para revisión.

1. Regresa a la página de resumen del flujo de publicación y confirma que todos los elementos muestren completados, con progreso cercano al 100%.
2. Haz clic en "Enviar para Revisión" (o botón similar) para enviar la versión de desarrollo actual al equipo de revisión de WeChat.
3. En "Gestión de Versiones," el estado de esta versión se convierte en "En Revisión." Después de la aprobación se convierte en "Publicado" o disponible para "Lanzamiento."

Si la revisión del registro falla, los desarrolladores pueden recibir una llamada especificando las partes fallidas.

Para el registro, puedes recibir un código de verificación y un enlace de verificación del Ministerio de Industria y Tecnología de la Información. Abre el enlace y completa el código + información personal (verificación válida por 1 día). Si el registro pasa, recibes notificación por correo electrónico y SMS con número de registro.
Verificación de WeChat: individual usualmente paga 30 CNY, empresa alrededor de 300 CNY. La tarifa no es reembolsable independientemente del resultado de aprobación. Puedes recibir notificación de verificación y llamada de confirmación.

Al enviar para revisión, sube video/ capturas de pantalla de operación y llena la información requerida. Luego haz clic en "Enviar Publicación" para el lanzamiento formal.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image42.png)

# 5. Resumen

En este punto, has completado un ciclo completo de desarrollo de mini programa de **0 a 1**: desde entender los mini programas, hasta instalar Trae, HBuilderX y WeChat DevTools; desde darle a la IA tu idea y dejarla "mover ladrillos" en el código, hasta jugar la primera versión de la serpiente en el simulador; luego empaquetar como versión de experiencia, terminar el registro/revisión, y hacerlo realmente utilizable en WeChat - has recorrido personalmente toda la cadena una vez.

Más importante aún, no lograste esto memorizando sintaxis. Lo lograste expresando claramente los requisitos + comunicándote efectivamente con la IA. Ya has experimentado esto: **una instrucción en lenguaje natural puede dejar que la IA satisfaga tus necesidades de desarrollo muy efectivamente**. Esta capacidad no se limita a la serpiente. Puede transferirse a cualquier mini programa que quieras construir más adelante - herramientas, páginas de eventos, aplicaciones educativas o proyectos de trabajo reales.

Si lo resumimos en un **SOP general**, son solo cinco pasos:
**Aclarar un pequeño requisito -> construir esqueleto de proyecto en Trae -> usar vibecoding + IA para crear primera versión -> jugar-probar y mejorar repetidamente en WeChat DevTools -> subir, registrar, revisar y lanzar.**
Cada vez que repites estos cinco pasos, ganas otro mini programa real que puede ser abierto y compartido, y otra capa de confianza de que "puedo usar IA para convertir ideas en productos."

A continuación, puedes seguir puliendo esta aplicación de serpiente, o cerrarla y comenzar un proyecto en blanco desde tu propia idea. No importa lo que construyas, recuerda una cosa: ya no eres solo alguien que "quiere construir algo." Ya eres un desarrollador de vibecoding que ha recorrido el flujo de trabajo completo. Lo demás es repetición hasta que esta capacidad se convierta en hábito.

# Referencias:

- https://zhuanlan.zhihu.com/p/1889401120939567074
- https://blog.csdn.net/2401_87407347/article/details/155193007
