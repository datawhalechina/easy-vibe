# Cómo Construir Tu Propio Sitio Web Personal y Blog Académico - Despliegue Estático con GitHub Pages

# 1. ¿Qué Es un Sitio Web Personal y un Blog Académico?

En este tutorial, recorreremos un ciclo completo cerrado: **desde encontrar una plantilla de sitio web existente, hasta modificarla para convertirla en una página personal de Elon Musk, y finalmente publicarla en línea de forma gratuita**.

Para este tutorial, deberías tener al menos:

* **Una computadora** (Windows o Mac)
* **Tu cuenta de GitHub** (usada para almacenar el código del sitio web y proporcionar alojamiento gratuito)
* **Trae instalado** (tu compañero de codificación con IA)
* **Un entorno Git**
* **Un entorno Ruby**

## 1.1 ¿Qué es una página personal académica?

Una **página personal académica** es tu propio territorio privado en internet.

A diferencia de los Moments de WeChat, Zhihu o LinkedIn, no depende del algoritmo de recomendaciones de ninguna plataforma, y no desaparecerá si una plataforma cierra. Es un espacio de **escaparate personal** a largo plazo y estable que puede ser indexado por Google y Google Scholar. Generalmente contiene tu biografía, publicaciones, proyectos y blog técnico.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 ¿Por qué construir tu propio sitio web?

En el modelo de desarrollo Vibe Coding, ya no necesitamos trabajar a través de gruesos libros de HTML/CSS como lo hacía la gente hace diez años. Con la IA, el rol de construir un sitio web pasa de "luchador con código" a "director editorial del sitio":

1. **Tú (Editor / PM)**: decides el tono y el contenido del sitio. Por ejemplo: "Pon el PPT de colonización de Marte de Musk aquí", o "Cambia este botón a rojo Tesla."
2. **Trae (Ingeniero de IA)**: maneja el duro trabajo de implementación. Convierte tus instrucciones en lenguaje natural en código, incluyendo diseño, esquemas de color y adaptación móvil.
3. **GitHub Pages (Showroom)**: proporciona un servidor y dominio gratuitos para que personas de todo el mundo puedan ver tu trabajo.

**¿Por qué vale la pena tenerlo para académicos o personas técnicas?**

* **Hacia afuera (construir influencia)**: es una **"tarjeta de presentación perenne."** Al solicitar programas de doctorado, trabajos o colaboraciones, una página personal ordenada suele ser mucho más persuasiva que un currículum en PDF.
* **Hacia adentro (acumulación de conocimiento)**: es tu **"segundo cerebro."** Puedes usarlo para registrar notas de cursos, reflexiones técnicas y construir tu propio sistema de conocimiento.
* **Para el futuro (ser descubrible)**: los motores de búsqueda prefieren contenido estructurado. Con una página personal, cuando las personas buscan tu nombre, **el contenido que tú defines** puede aparecer primero, en lugar de personas no relacionadas con el mismo nombre.

## 1.3 Cuatro formas típicas de construir un sitio web personal

En la práctica, hay innumerables formas de construir un sitio web. Aquí presentamos solo las cuatro más principales:

**Método 1: escritura a mano desde cero con HTML / CSS / JS**
Esta es la ruta tradicional de ciencias de la computación. Escribes el código carácter por carácter. La ventaja es la flexibilidad extrema. La desventaja es una barrera de entrada muy alta, y es fácil quedarse atascado ajustando CSS. No es ideal para aquellos de nosotros que queremos enfocarnos en el contenido.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**Método 2: constructores visuales de sitios como Wix / WordPress**
Esto es como construir con bloques. La ventaja es la fácil edición de arrastrar y soltar. La desventaja es que a menudo requiere pago, tiende a generar código inflado, carece de una sensación académica-geek, y es difícil de personalizar en profundidad.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**Método 3: plantillas basadas en GitHub (Generadores de Sitios Estáticos)**
Esta es la ruta principal **más recomendada** en las comunidades académicas y geek. Bifurcamos directamente una plantilla madura escrita por otros, como una basada en Jekyll o Hugo, y luego solo modificamos los archivos de configuración y el contenido.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**Método 4: Vibe Coding (flujo de generación visual con IA)**
Con agentes de IA que tienen una fuerte comprensión visual multimodal, solo necesitas ver un estilo de sitio web que te guste en línea, tomar una captura de pantalla y decirle a la IA: "Escríbeme una página web basada en este estilo." La IA puede entonces analizar los elementos visuales y generar el código subyacente para ti.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**La elección en este tutorial: GitHub Pages + plantilla académica + modificaciones con IA.**
La razón es simple:

* **Costo cero**: no necesitas comprar un servidor, no necesitas comprar un dominio.
* **Alta calidad**: las plantillas suelen ser diseñadas por desarrolladores de primer nivel, con estilo minimal, estructura profesional y carga rápida.
* **Fácil de mantener**: principalmente escribes Markdown, similar a escribir en Feishu Docs o Notion, y la IA ayuda a generar la página web.

## 1.4 La hoja de ruta completa de este tutorial

Para hacer el proceso de configuración más intuitivo y menos aburrido, usaremos un caso divertido: **construir una página académica para Musk**.

Aunque Elon Musk no es un profesor universitario, ha publicado muchos "informes técnicos públicos", como *Hyperloop Alpha*, y también tiene muchos proyectos famosos, como SpaceX y Tesla. Usaremos esos materiales como datos de prueba y, junto con el flujo de trabajo Vibe Coding de Trae, recorreremos una ruta de construcción de sitios reutilizable:

1. **Encontrar el esqueleto**: localizar una plantilla de sitio web de alta calidad en GitHub y bifurcarla en tu propio repositorio.
2. **Preparar el entorno**: clonar el código localmente y configurar Trae para que la IA pueda leer tu proyecto.
3. **Iterar con IA**: reemplazar la persona placeholder de la plantilla con Elon Musk, subir su currículum, cambiar la "lista de publicaciones" por una "escaparate de informes técnicos", e incluso pedirle a la IA que recoloque el sitio a "rojo Marte."
4. **Desplegar en línea**: subir el código modificado de vuelta a GitHub y obtener instantáneamente una URL de sitio web accesible.

Esta sección solo es responsable de dibujar el panorama general. Por ahora, solo recuerda la línea principal:
**Bifurcar plantilla -> renovación con IA -> subir en línea**
En las siguientes secciones, recorreremos cada paso juntos.

# 2. Preparación del Entorno

## 2.1 Herramientas usadas en este tutorial

Todo el proceso de construcción usa cuatro herramientas o recursos, cada uno jugando el rol de diseñador, contratista, propietario del terreno o sistema de logística.

* **Una computadora**: Windows o Mac está bien. A diferencia del desarrollo Android, que a menudo tiene altos requisitos de memoria, el desarrollo web es muy ligero y funciona sin problemas en un portátil de oficina ordinario.
* **Trae**: este es tu **compañero de codificación con IA** y herramienta de productividad central. En modo Vibe Coding, no necesitas dominar la sintaxis HTML o CSS. Principalmente le dices a la IA en lenguaje natural, como "Cambia la barra de navegación a negro" o "Pon la foto de Musk aquí", y dejas que escriba y modifique el código por ti.
* **Una cuenta de GitHub**: este es tu **servidor gratuito y caja fuerte de código**. La necesitamos para almacenar todos los archivos del sitio web. Lo más importante, usaremos **GitHub Pages** para convertir el código en una URL accesible globalmente de forma gratuita, eliminando la necesidad de comprar un servidor o dominio.
* **Entorno Git**: este es el **mensajero** entre bastidores. Aunque escribimos código localmente en Trae, Git es lo que sube el código de tu computadora a GitHub. No necesitas dominar los comandos de Git, y Trae puede ayudar a invocarlos, pero Git debe estar instalado primero.
* **Entorno Ruby**: este es el **taller de páginas web** local. Como la plantilla académica en este tutorial usa Jekyll, que se ejecuta en Ruby, necesitamos Ruby localmente para poder previsualizar el sitio web en nuestra propia computadora antes de subirlo en línea.

## 2.2 Descargar Trae

**Trae** es nuestro campo de batalla principal para Vibe Coding. Puedes pensar en él como un **editor de código con una super IA integrada**. A diferencia de los editores fríos tradicionales, es como un programador experimentado sentado a tu lado, siempre listo para ayudar.

* **Dirección de descarga**: visita el sitio oficial [https://www.trae.cn](https://www.trae.cn) y descarga la versión para tu sistema operativo, Windows o Mac.
* **Instalación**: la instalación es muy simple, justo como instalar WeChat o QQ. Haz doble clic en el paquete de instalación y haz clic en "Siguiente" hasta que termine.

Después de preparar esta herramienta, en los siguientes pasos prácticos no necesitaremos mirar paneles de código aburridos. Abriremos directamente el proyecto aquí y usaremos el panel de chat a la derecha para decirle a la IA en lenguaje natural, en chino si quieres, que nos ayude a escribir código, corregir errores e incluso refactorizar páginas enteras.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Descargar Git

**¿Qué es Git?**
Si Trae es el ingeniero de IA responsable de escribir código en Vibe Coding, entonces **Git es el mensajero responsable de transportar código**. Lo necesitas para empaquetar el código escrito en tu computadora y subirlo de forma segura a GitHub, tu repositorio en la nube. Sin él, tu sitio se ejecuta solo en tu propia máquina y nadie más puede verlo.

En el pasado, tenías que ir al sitio oficial, descargar el instalador y configurar las variables de entorno manualmente. Eso era molesto. Ahora, simplemente podemos dejar que Trae ayude a detectar e instalarlo.

**Paso 1: Verificar si Git ya está instalado**

Abre Trae y escribe la siguiente instrucción en el panel de chat en la parte inferior derecha:

```markdown
Por favor ayúdame a verificar si Git ya está instalado en esta computadora. Por favor ejecuta el comando `git --version` en la terminal.
```

* **Caso A (ya instalado)**: si ves algo como `git version 2.xx.x`, felicidades. Puedes saltarte el paso de instalación directamente.
* **Caso B (no instalado)**: si ves "command not found" o un grupo de mensajes de error en rojo, continúa abajo.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**Paso 2: Instalación asistida por IA**

No cierres Trae. Continúa escribiendo en el panel de chat:

**Instrucción (usuarios de Windows):**

```markdown
No tengo Git instalado. Por favor escribe el comando que usa la herramienta de línea de comandos `winget` para instalar Git automáticamente, y dime cómo ejecutarlo en la terminal.
```

**Instrucción (usuarios de Mac):**

```markdown
No tengo Git instalado. Por favor dime cómo instalar Git rápidamente a través de comandos de terminal, por ejemplo usando `git` o `brew`.
```

Trae te dará un comando, a menudo algo como `winget install --id Git.Git`.

Solo necesitas hacer clic en el botón **Ejecutar en Terminal** en el bloque de código o copiarlo en la terminal en la parte inferior y presionar Enter. Descargará e instalará Git automáticamente para ti.

Si aún sientes que el proceso asistido por IA no es lo suficientemente perfecto, puedes referirte a este tutorial para descarga e instalación manual:
[Tutorial de descarga e instalación de Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Instalar el Entorno Ruby

Antes de empezar oficialmente a escribir código, todavía nos falta la última pieza del rompecabezas. La plantilla de página académica usada en este tutorial está construida con Jekyll, que en sí mismo está basado en el lenguaje de programación Ruby.

Para previsualizar y depurar el "efecto de renovación" en tu propia computadora antes de subir el código a GitHub para que el mundo lo vea, debemos instalar un entorno Ruby en la computadora. Piensa en esto como contratar a un intérprete en tu computadora que entiende Ruby. No te preocupes, no necesitas aprender a escribir Ruby. Solo necesitas instalarlo, y Trae puede manejar el resto.

### 2.4.1 Instalación en Windows

**Paso 1: Descargar el instalador usando un mirror doméstico**

Para usuarios de Windows, el sitio oficial en https://rubyinstaller.org/downloads/ proporciona instaladores de un clic, pero debido a las diferencias de red, ayuda conocer un truco. La recomendación oficial para principiantes suele ser **`Ruby+Devkit 3.X.X (x64)`**, porque incluye la cadena de herramientas necesaria.

**Recordatorio para principiantes**: en la práctica, descargar directamente desde el sitio oficial puede ser lento o fallar. Recomendamos encarecidamente usar el mirror doméstico en [RubyInstaller for Windows - Mirror de China](https://rubyinstaller.cn/), que suele ser mucho más rápido.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**Paso 2: Ejecutar la instalación**

Haz doble clic en el instalador descargado. En el asistente de configuración, asegúrate de marcar **"Add Ruby executables to your PATH."** Este es el paso más importante. De lo contrario, la computadora no podrá "encontrar" el intérprete que acabas de instalar.

Después de marcarlo, sigue haciendo clic en **Siguiente** para completar la instalación.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**Paso 3: Configurar el kit de herramientas de desarrollo**

Cuando la barra de progreso de la instalación termine, se abrirá automáticamente una ventana de línea de comandos negra. No entres en pánico. Escribe el número `3` donde el cursor está parpadeando, lo que significa instalar el entorno base MSYS2 y la cadena de herramientas MINGW, luego presiona Enter. Espera hasta que los comandos terminen de ejecutarse y la ventana se cierre automáticamente.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**Paso 4: Verificar el resultado**

Ahora es el momento de pedirle a la IA que revise tu trabajo. Abre Trae y escribe la siguiente instrucción en lenguaje natural en el chat a la derecha:

```markdown
Por favor ayúdame a verificar si el entorno Ruby se ha instalado correctamente en esta computadora. Por favor ejecuta el comando `ruby -v` en la terminal en la parte inferior y dime el resultado.
```

Si Trae responde con algo como `ruby 3.x.x`, entonces tu entorno Ruby de Windows está completamente configurado.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Instalación en Mac

Configurar un entorno Mac se siente más "geek" porque generalmente requiere comandos de terminal. Pero en modo Vibe Coding, ni siquiera necesitamos abrir la terminal manualmente. Podemos simplemente dejar que Trae actúe como nuestro operador de TI personal.

**Paso 1: Dar la instrucción de configuración del entorno de una sola vez**

Abre Trae y pega la siguiente instrucción en lenguaje natural en el chat a la derecha. Le pediremos que maneje la verificación de Homebrew, la instalación si falta, y luego la instalación de Ruby:

```markdown
Estoy usando una computadora Mac y necesito configurar un entorno de desarrollo Ruby. Por favor ayúdame a completar los siguientes pasos:
1. Verificar si Homebrew ya está instalado. Si no, por favor ejecuta el script de instalación oficial de Homebrew en la terminal.
2. Después de confirmar que Homebrew está listo, ejecuta `brew install ruby` en la terminal.
3. Cuando todo esté listo, ejecuta `ruby -v` para confirmar que la instalación tuvo éxito.
Por favor guíame paso a paso, y cuando sea necesario proporciona comandos de terminal que pueda hacer clic y ejecutar directamente.
```

Después de recibir la instrucción, Trae comenzará a trabajar y mostrará bloques de código con botones de ejecución en el panel de chat.

**Nota importante para principiantes**

Al instalar Homebrew, la terminal a menudo muestra algo como `Password:` y pide tu contraseña de inicio de sesión de Mac.

**Nota:** cuando escribes una contraseña en la terminal de Mac, la pantalla no mostrará ningún carácter ni asteriscos. Esto es normal. Simplemente escribe tu contraseña a ciegas y presiona Enter.

**Paso 2: Verificar el resultado**

Después de la instalación, vuelve a Trae y escribe:

```markdown
Acabo de instalar Ruby en este Mac a través de `brew`. Por favor ayúdame a ejecutar el comando `ruby -v` en la terminal y verificar si la instalación y las variables de entorno son correctas.
```

Cuando veas algo como `ruby 3.x.x` en la terminal, el taller de páginas web local está listo y tu Mac está preparada para Vibe Coding.

## 2.5 Registrar una Cuenta de GitHub

**¿Qué es GitHub?**
Si Git es el mensajero, entonces **GitHub es el almacén en la nube y el showroom**. No solo aloja tu código de forma gratuita, sino que lo más importante, con **GitHub Pages** puede convertir tu código en una URL de sitio web accesible globalmente. También es la plataforma de alojamiento de código más grande del mundo, y tener una cuenta de GitHub es una especie de pasaporte al mundo técnico.

**Pasos de registro:**

1. **Visita el sitio oficial**: abre [https://github.com/](https://github.com/).
2. **Haz clic en Sign up**: haz clic en **"Sign up"** en la esquina superior derecha.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **Completa tu información**
4. **Correo electrónico**: introduce una dirección de correo electrónico real.
5. **Contraseña**: elige una contraseña fuerte.
6. **Nombre de usuario (importante!)**: **elígelo con cuidado**. La URL de tu página personal más tarde será **`https://tu-nombre-de-usuario.github.io`**. Es mejor usar tu nombre en inglés, pinyin, un ID familiar o una combinación simple de letras y números. **No** elijas algo como `a1b2c3d4`, de lo contrario el enlace de tu sitio web será difícil de recordar.
7. **Verificación y activación**: completa la verificación humana, a menudo girando imágenes o eligiendo galaxias espirales, luego revisa tu correo electrónico para el código de verificación.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

Una vez que el registro esté completo, tienes un terreno propio en internet. En la siguiente sección, comenzaremos a construir en ese terreno.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. De la Plantilla a Tu Primera Página Accesible

Todo está listo. En los primeros dos capítulos, preparamos las herramientas. En este capítulo, reclamaremos oficialmente terreno en internet. La tarea en este capítulo es simple:
**No te preocupes por la decoración o el contenido todavía. Primero construye el esqueleto del sitio y obtén un enlace de acceso activo.**

Bifurcaremos directamente una plantilla académica madura y usaremos la automatización de GitHub Pages para tenerla funcionando en veinte minutos. Cuando termines, tendrás un enlace accesible globalmente.

## 3.1 Obtener una plantilla de sitio web

En modo Vibe Coding, no necesitamos escribir HTML desde cero. GitHub tiene miles de excelentes plantillas de código abierto. Solo necesitamos "tomar prestada" una y cambiarle el nombre al nuestro.

**Paso 1: Encontrar una plantilla**

Aquí hemos seleccionado una plantilla clásica con una estructura clara y fuerte idoneidad para presentación académica:
https://github.com/luost26/academic-homepage?tab=readme-ov-file
Esta plantilla está basada en el framework Jekyll.

Por supuesto, también puedes buscar **`academic-homepage`** en GitHub y elegir otro estilo que te guste, pero para seguir este tutorial, se recomienda usar la plantilla de arriba primero.

También preparamos varias recomendaciones de plantillas adicionales para ti:

* Minimal Light tema de página personal: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**Paso 2: Bifurcar el proyecto**

Visita la página principal del repositorio objetivo y haz clic en el botón **Fork** en la esquina superior derecha. Aparecerá un cuadro de confirmación. Haz clic en **Create Fork** directamente.

* Explicación: este paso es equivalente a copiar el repositorio de código de otra persona con un juego completo de llaves a tu propia cuenta de GitHub. Ahora, eres dueño de tu copia del sitio.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**Paso 3: Renombrar el repositorio, el paso más importante**

Cambia el nombre del repositorio a:
`tu-nombre-de-usuario.github.io`

**Nota importante para principiantes**:
Esta es una regla estricta de GitHub Pages.
Por ejemplo, si tu nombre de usuario de GitHub es `musk-fan`, entonces el nombre del repositorio **debe** ser `musk-fan.github.io`.
Solo así GitHub te asignará automáticamente un dominio gratuito. Si el nombre es incorrecto, la página web no se abrirá más adelante.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 Obtener la URL del Proyecto de GitHub

Después de renombrar, necesitamos el recibo de recogida del repositorio.

1. Vuelve a la página principal del repositorio, bajo la pestaña **Code**.
2. Haz clic en el botón verde **Code**.
3. Asegúrate de que la pestaña **HTTPS** esté seleccionada.
4. Haz clic en el botón de copiar y copia la URL que termina en `.git`, por ejemplo `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 Clonar el Proyecto Localmente

En el pasado, los programadores tenían que escribir comandos Git complejos en una terminal negra para descargar código. En la era de Vibe Coding, tenemos Trae. Solo necesitamos decirle a la IA, "Quiero esto, ayúdame a bajarlo."

**Paso 1: Preparación**

Crea una nueva carpeta en tu computadora, por ejemplo `MyWebsite`, luego haz clic derecho y elige **Abrir con Trae**, o abre Trae primero y elige **Abrir Carpeta**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**Paso 2: Dar el comando de clonación**

Después de que Trae se abra, abre el panel de chat de IA a la derecha e introduce la siguiente instrucción en lenguaje natural:

```text
Por favor ayúdame a clonar el repositorio remoto de GitHub en la carpeta actual.
Dirección del repositorio: pega la URL que acabas de copiar, por ejemplo https://github.com/musk-fan/musk-fan.github.io.git
Requisito de ejecución: por favor ejecuta el comando `git clone` directamente en la terminal.
```

**Paso 3: Confirmar la descarga**

Trae invocará automáticamente la terminal en la parte inferior y ejecutará el comando. Espera unos segundos. Cuando veas archivos como `_config.yml` e `index.html` aparecer en el árbol de archivos a la izquierda, el proyecto se ha movido exitosamente a tu computadora.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 Previsualizar la Página Web Localmente

El código está en tu máquina y el entorno Ruby está listo. Antes de modificar el sitio, primero debemos inspeccionarlo localmente en nuestra propia computadora. Esto es como renovar una casa: primero arreglas todo en la sala de exposición, confirmas que se ve bien, y solo entonces la abres al público.

Gracias al entorno Ruby instalado en la **Sección 2.4**, esto ahora es muy simple.

**Paso 1: Instalar dependencias**

Un sitio Jekyll depende de muchas Gems para ejecutarse. Esto es como comprar todos los muebles de una lista de compras. **Sin embargo**, debido a las condiciones de red, las descargas directas pueden estancarse. Pediremos a Trae que **cambie a un mirror doméstico** e instale las dependencias desde allí.

En el cuadro de chat de Trae, introduce:

```markdown
Necesito instalar las dependencias de Jekyll. Considerando el entorno de red, por favor primero cambia el `source` en el Gemfile al mirror doméstico `https://gems.ruby-china.com/`. Después de eso, por favor ejecuta el comando `bundle install` en la terminal para instalar todas las dependencias.
```

**Paso 2: Iniciar el servicio local**

Ahora iniciaremos un **servidor local** para simular el sitio web ejecutándose. Continúa y dile a Trae:

```markdown
Las dependencias han terminado de instalarse. Por favor ayúdame a iniciar el servicio de previsualización local de Jekyll en la terminal. Por favor ejecuta el comando `bundle exec jekyll serve`.
```

Después de que la terminal se ejecute durante unos segundos, verás algo similar a:
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **Abre el navegador**: haz clic en ese enlace, o escríbelo directamente en tu navegador:
   `http://127.0.0.1:4000/academic-homepage/`
2. **Ve la magia**: ahora tu sitio ya se está ejecutando en el navegador. Aunque todavía muestra el nombre del autor original de la plantilla, ya se está ejecutando localmente en tu computadora.

A partir de este punto, cada vez que cambies el contenido y presiones `Ctrl+S`, luego actualices el navegador, **el contenido de la página web cambiará en consecuencia**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

Una vez que la previsualización local funcione, podemos entrar al próximo capítulo y empezar a convertir el sitio web en algo con la forma de Elon Musk.

# 4. Modificación de Contenido Asistida por IA

Para ayudar a todos a experimentar rápidamente el proceso completo, no usaremos nuestra propia información personal, para evitar la ansiedad de privacidad. En su lugar, usaremos **a Elon Musk como ejemplo** y construiremos una página académica para él. Esto nos permite dejar de lado la presión aburrida de escribir un currículum personal y enfocarnos en la diversión de Vibe Coding para sitios web. También nos permite ver lo genial que es colocar los "informes técnicos" de un hombre de hierro de Silicon Valley, como *Hyperloop Alpha*, en un sitio web de estilo académico.

Recorreremos el ciclo completo desde **obtener la plantilla** hasta **publicar el sitio**, y construiremos un escaparate personal de clase mundial con nuestras propias manos.

Sigue mi ritmo y envía la primera instrucción a la IA.

## 4.1 Restricciones Globales Unificadas

Este es el **prompt de configuración global**. Solo necesitas enviarlo una vez.
Su propósito es establecer reglas para la IA, para evitar que improvise y rompa la estructura del sitio. Cópialo directamente en Trae:

```text
Ahora eres el mantenedor de un sitio de "plantilla de página académica GitHub Pages + Jekyll".
El repositorio actual es una página académica impulsada por Jekyll (incluyendo `_config.yml`, `_data`, `_layouts`, etc.).
Tus modificaciones deben seguir estos principios:
1. Cada paso solo debe resolver el objetivo de la etapa actual. No hagas contenido de etapas posteriores por adelantado.
2. No modifiques la estructura del sitio, no introduzcas nuevos plugins y no cambies el estilo del tema.
3. Todo el contenido debe ser renderizable por Jekyll sin errores.
4. Toda la información de identidad debe seguir un tono de "simulación de estilo académico" y no debe usar voz en primera persona.
5. No inventes artículos IEEE / Nature obviamente falsos.
6. Si la información es incierta, usa "hechos públicamente conocidos" o "etiquetado de simulación académica razonable".
```

## 4.2 Construir la Página de Musk, la Parte de Contenido

### 4.2.1 Primera Instrucción Global: Reemplazar la Identidad

Lo primero que necesitamos resolver es "¿Quién soy?" La plantilla está llena con la información del autor original, y necesitamos reemplazarla con IA de una sola vez.

**Paso 1: Preparar los Activos**

Coloca los activos de imagen que te proporciono, `University_of_Pennsylvania.jpg` y `Queen_University.jpg`, en la carpeta correspondiente del proyecto, usualmente `/assets/images/badges/`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**Paso 2: Enviar la Instrucción**

En el cuadro de chat a la derecha de Trae, introduce el siguiente prompt. Ten en cuenta que no necesitamos encontrar y editar líneas manualmente. Simplemente le decimos a la IA lo que queremos:

```text
1. Objetivo: reemplazar la "identidad de persona" de la página académica actual con Elon Musk. Solo modificar la información básica del perfil.
2. Requisitos específicos:
1. Nombre: Elon Musk
2. Identidad profesional:
    Emprendedor Tecnológico
    Ingeniero
    Fundador y CEO de SpaceX
    CEO de Tesla, Inc.
3. Educación:
    Queen's University (Física y Economía, no completado) (ruta de imagen: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. en Física, B.A. en Economía) (ruta de imagen: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Intereses de Investigación (puede simularse como):
    Ingeniería de Sistemas Espaciales
    Sistemas de Energía Sostenible
    Inteligencia Artificial y Robótica
    Innovación Tecnológica a Gran Escala
5. Honores y Reconocimientos:
    Persona del Año de Time (2021)
    Fellow de la Royal Society (FRS)
    Listado en Forbes Billionaires (múltiples años)
6. Restricciones:
    No añadir artículos / publicaciones
    No inventar artículos IEEE, Nature o Science
    Usar redacción de estilo académico y evitar tono promocional comercial
    Mantener la estructura de campos original sin cambios y solo reemplazar el contenido
```

En este punto, puedes ver que Trae ha completado todos nuestros requisitos de modificación.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**Paso 3: Actualizar el Navegador Local**

Actualiza el navegador local ahora, y deberías ver todo reemplazado correctamente.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 Mejora Iterativa: Añadir "Artículos" y Proyectos

Como Elon Musk no es un profesor universitario tradicional, rara vez publica artículos en *Nature* o *Science*. Pero como "ingeniero en jefe", ha publicado muchos **informes técnicos** y **planes maestros** altamente técnicos.

Dentro del contexto de una página académica, podemos redefinir el significado de "Publicaciones" como **"Informes Técnicos y Planes Visionarios".** Esto no es nada incómodo. De hecho, se ajusta muy bien a su identidad de constructor.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**Paso 1: Preparar los Activos**

Descarga las imágenes de portada que te proporciono, namely `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg` y `Neuralink_sewing_machine_robot.jpg`, colócalas bajo `/assets/images/covers/`, y elimina las imágenes de ejemplo que originalmente estaban en esa carpeta.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**Paso 2: Enviar la Instrucción**

Envía el siguiente prompt a Trae y deja que nos ayude a reconstruir la estructura de datos:

```text
1. Configuración de rol: eres un experto en desarrollo de sitios estáticos que domina Jekyll y la sintaxis Liquid.
2. Objetivo de la tarea:
Modificar el título de la sección en la página principal o en la barra de navegación.
La estructura de archivos actual está organizada por subcarpetas de año, por ejemplo `_publications/2023/xxx.md`.
Crear tres nuevos archivos Markdown en el formato especificado para mostrar los informes técnicos y planes visionarios de Elon Musk.
3. Pasos específicos y requisitos:
1. Modificar el título de la sección
    Por favor busca globalmente la cadena "Selected Publications" (puede aparecer en `index.html`, `_config.yml` o `_pages/publications.md`).
    Reemplázala por: "Informes Técnicos y Planes Visionarios".
2. Reconstruir los datos de publicación (paso crítico)
    Limpiar todo el contenido antiguo bajo la carpeta `_publications`, incluyendo carpetas de años antiguos como 2023 y 2024.
    Crear tres nuevas carpetas: `_publications/2013/`, `_publications/2017/` y `_publications/2019/`.
    En esas carpetas, crear los siguientes tres archivos Markdown.
3. Seguir estrictamente este formato de archivo
Importante: debes seguir estrictamente el formato YAML Front Matter a continuación, y no debes inventar nuevos nombres de campos:
    - title:          "título del artículo"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "nombre del venue / revista"
    - pub_date:       "año"
    - abstract: >-    contenido del resumen...
    - cover:          /assets/images/covers/nombre_portada.jpg
    - authors:        - Autor1- Autor2
    - links:Paper:    https://enlace-del-articulo
4. Por favor genera el código completo para los siguientes tres archivos (incluyendo las descripciones de ruta):
(1) Ruta: `_publications/2013/2013-hyperloop.md`
    Título: Hyperloop Alpha
    Fecha: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: Una propuesta para un quinto modo de transporte, utilizando un tubo de baja presión y rodamientos de aire para alcanzar velocidades subsónicas.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Autores: Elon Musk, Equipos de SpaceX y Tesla
    Enlace: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Ruta: `_publications/2017/2017-mars.md`
    Título: Making Humans a Multi-Planetary Species
    Fecha: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Arquitectura detallada del sistema Starship diseñado para colonizar Marte. Este artículo describe los desafíos técnicos para establecer una ciudad autosostenible.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Autores: Elon Musk
    Enlace: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Ruta: `_publications/2019/2019-neuralink.md`
    Título: An Integrated Brain-Machine Interface Platform
    Fecha: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: Hemos construido arrays de hilos de electrodos pequeños y flexibles, con hasta 3,072 electrodos por array, y un robot neuroquirúrgico.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Autores: Elon Musk, Neuralink
    Enlace: https://www.jmir.org/2019/10/e16194/
Requisito de ejecución:
Por favor proporciona directamente el contenido completo de estos tres archivos, y también proporciona el código de modificación para el archivo donde cambiaste el título.
```

**Paso 3: Actualizar el Navegador Local**

Cuando la construcción se complete, encontrarás que la lista de publicaciones originalmente aburrida se ha convertido en un escaparate de tecnología negra futurista.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 Toque Final: Enlaces Sociales y Avatar

Este es el paso clave para pasar de una puntuación de 90 a una puntuación de 100. La barra lateral aún puede contener el enlace GitHub original de la plantilla o un correo electrónico incorrecto. Necesitamos apuntarlos a las cuentas sociales reales de Musk, principalmente X.com.

**Paso 1: Preparación**

Busca en Google una buena foto de Musk, guárdala como `portrait.png`, o arrástrala a la carpeta `images/photo` en Trae y reemplaza la imagen original.

**Paso 2: Copia el Siguiente Prompt en Trae**

```text
1. Configuración de rol: eres un experto en desarrollo de sitios Jekyll orientado a los detalles.
2. Objetivo de la tarea: completar la actualización final de la barra lateral del sitio web y la configuración de información personal. Necesitamos actualizar el avatar del autor, la introducción y los enlaces sociales a la información real de Elon Musk.
Por favor primero escanea la estructura del proyecto y encuentra el archivo de configuración que controla la información del autor.
3. Por favor haz las siguientes modificaciones:
1. Corrección de ruta del avatar
    Ya he subido una nueva imagen llamada `portrait.png` a la carpeta `images/` o `assets/images/`.
    Por favor modifica la ruta del avatar en el archivo de configuración para apuntar a esta imagen, y asegúrate de que la ruta relativa es correcta, por ejemplo `/images/portrait.png`.
2. Limpieza de enlaces sociales
    Por favor actualiza o elimina los enlaces de iconos sociales en la barra lateral:
    Correo electrónico: cámbialo a `elon@spacex.com`, o si el campo lo permite, coméntalo o elimínalo para evitar acoso.
    Twitter / X: cámbialo a `https://x.com/elonmusk` (este es el enlace central).
    GitHub: cámbialo a `https://github.com/tesla` para apuntar al repositorio de código abierto de Tesla, o elimínalo directamente.
    Google Scholar: debe ser eliminado, porque él no lo mantiene.
    LinkedIn / ResearchGate: si existen, elimínalos todos.
Requisito de salida:
Por favor proporciona directamente el fragmento de código de configuración modificado completo.
```

**Paso 3: Actualizar el Navegador Local**

1. Mira la barra lateral. ¿Está ahora usando esa foto atractiva? ¿Al hacer clic en el icono de Twitter te lleva a X.com?

En este punto, localmente, ya tienes una página académica personal completa, profesional y con un estilo distintivamente Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 Inyectando Alma a Través de Personalización de UI, la Parte de Estilo

Ahora mismo el contenido es correcto, pero la página todavía se ve como un currículum impreso. Le falta la sensación tecnológica. En modo Vibe Coding, no necesitamos entender CSS. Solo necesitamos describir a la IA la **sensación** que queremos.

**Escenario de ejemplo**:
Si crees que el fondo gris es demasiado aburrido y quieres cambiarlo a **rojo Marte**, simplemente pídele a Trae:
*"Quiero cambiar el color de fondo de la barra lateral a rojo oscuro (#8B0000) para reflejar la sensación de Marte. ¿Qué archivo CSS o SCSS debería modificar? Por favor dame el código directamente."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

Si te gusta el estilo **SpaceX Dashboard** en la imagen de ejemplo de arriba, puedes copiar directamente el siguiente prompt de nivel diseñador:

```text
1. Configuración de rol: eres un diseñador UI de primer nivel que admira el "estilo internacionalista suizo" y es bueno en interfaces como Notion, Linear o Apple.
2. Objetivo de la tarea: por favor reescribe completamente el CSS / SCSS para crear una página académica minimalista con estilo "SpaceX Dashboard". Las palabras clave centrales son: transparente, contenido, preciso.
3. Por favor aplica las siguientes sobrescrituras de estilo concretas:
1. Tipografía global
    Fuente: abandona la fuente serif original. Fuerza todo el sitio a usar el stack sans-serif de nivel del sistema:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Altura de línea: aumenta el espacio de respiración en el texto del cuerpo con `line-height: 1.75`.
    Colores:
        Título principal: #111111
        Texto del cuerpo: #333333
        Información secundaria como fechas o citas: #666666
2. Encabezado limpio
    Fondo: elimina el fondo negro anterior y usa blanco puro (#FFFFFF), o blanco translúcido con desenfoque si es soportado, por ejemplo `rgba(255, 255, 255, 0.9)` más `backdrop-filter: blur(10px)`.
    Borde: mantén solo un borde inferior muy fino, `border-bottom: 1px solid #EAEAEA`.
    Texto: los enlaces de navegación deben usar gris oscuro #333333, y solo volverse negros y en negrita al pasar el cursor.
3. Eliminar tarjetas y volver al contenido
    Elimina el fondo y la sombra de la barra lateral izquierda y las tarjetas About me (`box-shadow: none`, `background: transparent`).
    El gran minimalismo deja el texto flotar directamente sobre el fondo de la página.
    Aumenta el espaciado: aumenta significativamente `margin-bottom`, por ejemplo 80px, entre secciones y usa espacio en blanco en lugar de bordes para separar contenido.
4. Uso contenido del color de marca
    Usa Tesla Red (#E82127) solo en enlaces y botones importantes.
    Estilo de enlace: elimina el subrayado y solo cambia el color. Al pasar el cursor, añade un bloque de fondo rojo claro como `background: rgba(232, 33, 39, 0.05)`.
5. Ajuste del avatar
    Mantenlo circular con `border-radius: 50%`.
    Elimina el borde.
    Mantén solo una sombra muy ligera, como `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Requisito de ejecución:
Por favor analiza los archivos `_sass` o CSS. No parchees el código antiguo. En su lugar, proporciona directamente el código que resetea y sobrescribe los estilos anteriores.
```

## 4.4 Reemplazar con Tu Propia Información, la Parte de Personalización

Felicidades. Después de pasar por el flujo de la página de Musk de arriba, ya has dominado la mentalidad central de Vibe Coding para la construcción de sitios. Convertir este modelo de muestra en tu propio hogar es realmente fácil ahora.

No necesitas empezar de nuevo. Solo necesitas repetir los pasos anteriores, pero con una estrategia un poco más flexible:

**Paso 1: Reemplazo Físico, Avatar e Información Básica**

Este es el paso más fácil:

1. **Cambiar la foto**: en el panel de archivos en el lado izquierdo de Trae, encuentra `assets/images/` y arrastra tu propia foto de retrato allí, reemplazando `portrait.png`.
2. **Cambiar el nombre**: dile a Trae, "Reemplaza todas las instancias de Elon Musk en todo el sitio con [tu nombre]."

**Paso 2: Preprocesamiento con IA, Deja que ChatGPT / Gemini Ayude a Organizar el Contenido**

Trae es bueno escribiendo código, pero si le lanzas directamente un currículum PDF desordenado, puede confundirse.

**Así que un enfoque más eficiente es este**:
primero usa una IA que sea fuerte manejando texto largo, como ChatGPT, Gemini o Kimi, para ayudarte a **formatear limpiamente** el currículum.

Puedes enviar a ChatGPT un prompt como este:

```text
Configuración de rol: eres un planificador de contenido de sitios web académicos profesional.
Objetivo de la tarea:
Te enviaré mi currículum / CV personal. Por favor ayúdame a extraer información clave de él y organizarla en una estructura Markdown clara adecuada para rellenar directamente en un sitio web estático.
Por favor organiza y refina estrictamente en los siguientes cinco módulos. Si algún contenido no existe, déjalo en blanco.
1. Perfil
Nombre: mi nombre completo.
Eslogan: una etiqueta profesional de una línea, por ejemplo "Estudiante de CS @ XX Univ | Entusiasta de IA".
Bio: una introducción en tercera persona de 50 a 100 palabras resumiendo mi formación y habilidades centrales, en un tono académico profesional.
Redes sociales: extraer correo electrónico, GitHub, LinkedIn, enlaces de blog, etc.
2. Educación
Por favor lista: nombre de la escuela, grado como B.S. en CS, y rango de fechas.
Opcional: si GPA o cursos centrales están disponibles, añádelos en una línea separada.
3. Proyectos Seleccionados — importante
Por favor extrae los 2 a 3 proyectos más fuertes, y para cada incluye:
Título: nombre del proyecto.
Stack Tecnológico: tecnologías usadas, como Python, React, PyTorch.
TL;DR: un resumen de una línea de lo que hace el proyecto.
Descripción: 2 a 3 contribuciones centrales, refinadas usando el estilo STAR.
Marcador de Posición de Imagen: reserva un nombre de archivo de imagen como `nombre_proyecto.jpg`.
4. Publicaciones / Artículos
Si hay artículos o artículos técnicos, por favor extrae:
Título
Venue
Fecha, el año es suficiente
Resumen, un resumen de una oración
5. Habilidades
Por favor organízalas en categorías: lenguajes de programación, frameworks / herramientas y otras habilidades.
Requisito de salida:
No expliques el proceso. Produce directamente el contenido Markdown limpio.
```

Una vez que obtengas este texto limpio, pásalo a Trae, y la precisión mejorará dramáticamente.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**Paso 3: Reemplazar el Contenido Central, con Dos Posibles Rutas**

En este paso, dependiendo de tu preferencia, puedes elegir dos modos diferentes de Vibe Coding:

1. **Modo A: dejar que la IA navegue, luego editar manualmente**

Si quieres saber exactamente dónde se cambia todo, puedes preguntarle a Trae:

```markdown
Quiero modificar la sección "Educación". Por favor dime dónde está la ruta del archivo correspondiente y qué líneas contienen el código.
```

Trae te dirá en el chat algo como:
"El archivo que necesitas modificar es `_pages/about.md`, y el código relevante está alrededor de la línea XX..."

Luego puedes abrir ese archivo tú mismo desde el árbol de archivos a la izquierda y rellenar el contenido limpio de ChatGPT como un ejercicio de edición estructurada.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **Modo B: automatización completamente gestionada**

Si crees que encontrar archivos es demasiado molesto, pega directamente tu información limpiada en Trae:

```markdown
Aquí está el contenido limpio para mis secciones de "Educación" y "Experiencia de Proyectos" (pega el contenido Markdown).
Por favor reemplaza directamente el contenido correspondiente en el sitio actual y preserva el formato de diseño existente.
```

# 5. Desplegar en Línea

## 5.1 Desplegar en GitHub Pages

**Paso 1: Habilitar GitHub Actions, la Construcción en la Nube**

Vuelve a GitHub en el navegador:

1. Haz clic en **Settings** en la parte superior del repositorio.
2. En la barra lateral izquierda, haz clic en **Pages**.
3. Bajo **Build and deployment**, cambia **Source** de `Deploy from a branch` a **`GitHub Actions`**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**Paso 2: Configurar Automáticamente el Flujo de Trabajo de Jekyll**

Después de cambiar, el diseño de la página cambia. GitHub reconocerá automáticamente que este es un proyecto Jekyll.

1. Encuentra la tarjeta **Jekyll (By GitHub Actions)**.
2. Haz clic en **Configure** en esa tarjeta.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**Paso 3: Confirmar el Archivo de Configuración**

Después de hacer clic, serás llevado a una página llena de código. Este es un archivo de configuración `.yml` ya escrito por GitHub para construir un sitio Jekyll.

1. **No modifiques ningún código**.
2. Haz clic en el botón verde **Commit changes...** en la esquina superior derecha.
3. En el cuadro de confirmación emergente, haz clic en **Commit changes** nuevamente.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**Paso 4: Esperar y Verificar**

Después de la confirmación, los servidores de GitHub comienzan a trabajar automáticamente.

1. Haz clic en la pestaña **Actions** en el menú superior.
2. Verás una tarea llamada `Deploy Jekyll site to Pages` girando.
3. Espera uno o dos minutos hasta que el círculo amarillo se convierta en una **marca de verificación verde**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**Paso 5: Visitar Tu Sitio Web**

Una vez que el círculo se ponga verde, puedes acceder a la versión predeterminada de la plantilla a través de una dirección como:
**`https://tu-nombre-de-usuario.github.io/`**

Felicidades. Has desplegado exitosamente una página académica personal que es accesible globalmente.

## 5.2 Confirmar Cambios y Actualizar la Página Personal

Ahora subiremos todas las modificaciones locales que hicimos antes a GitHub, para que esta página personal con estilo Musk pueda ser vista por el mundo.

1. Haz clic en **Source Control** a la izquierda.
2. Añade todos los **cambios** a **staged changes**.
3. Deja que Trae ayude a generar un mensaje de commit, luego haz clic en **Commit**.
4. Haz clic en **Sync Changes** o **Push** para subir a la rama `main`.
5. Espera un momento hasta que todos los procesos bajo la pestaña **Actions** se completen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

Ahora, felicidades. Abre **`https://tu-nombre-de-usuario.github.io/`**, y ya tienes una página académica personal completa, profesional y con un fuerte sabor a Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. Juego Avanzado: Construir una Página Personal a Mano desde Cero

Si crees que las plantillas académicas son demasiado rígidas, o si quieres hacer un sitio web de una sola página tan genial como *The Matrix*, bienvenido a la **sección DIY**.

Aquí, no bifurcamos el código de nadie más. Usaremos Trae, empezando desde una carpeta vacía, y generaremos un sitio web completo con una sola instrucción, luego lo desplegaremos en línea.

## 6.1 ¿Por qué Construirlo a Mano?

* **Libertad absoluta**: sin restricciones de plantillas. Si quieres la barra de navegación a la derecha, o fuegos artificiales en el fondo, solo necesitas decírselo a la IA.
* **Minimalismo**: las plantillas suelen contener cientos de archivos, mientras que un sitio web construido a mano puede necesitar solo un `index.html`.
* **Control técnico**: esta es la mejor manera de entender cómo funciona realmente una página web.

Demostraremos el clásico **flujo de HTML puro**:
no se requiere compilación, y GitHub Pages lo soporta nativamente, lo que lo hace ideal para construir una página de aterrizaje personal.

## 6.2 Ejemplo Práctico: Pedir a la IA que Escriba una Página de "Centro de Comando de Marte"

Esta vez no estamos haciendo la ruta académica. Supongamos que Musk quiere una página personal extremadamente minimalista y futurista para presentar su plan de Marte.

**Paso 1: Crear un Proyecto Vacío**

Crea una nueva carpeta en tu computadora y ábrela con Trae. En ese momento, el árbol de archivos a la izquierda está completamente vacío.

*(Consejo: puedes preparar una foto de Musk con anticipación y nombrarla `portrait.png`.)*

**Paso 2: Construir el Framework**

Introduce el siguiente prompt en el panel de chat de Trae. Ten en cuenta que requerimos que la IA escriba todo el código en un solo archivo para que sea fácil de gestionar para principiantes:

```text
Quiero construir una página personal minimalista para Elon Musk desde cero, sin ningún framework complejo, usando solo HTML + CSS + JS.
Estilo de diseño: estilo SpaceX dashboard.
    Fondo: usar negro espacio profundo (#000000), con animación de luz estelar.
    Color de acento principal: usar "rojo Marte" (#E82127).
    Fuente: usar un stack de fuentes monoespaciadas para imitar la sensación de una terminal de código.
Contenido de la página:
    Colocar el avatar de Elon Musk en el centro, circular, con un borde giratorio. La ruta de la imagen es `portrait.png`.
    Nombre: Elon Musk (Technoking of Tesla)
    Introducción: "Ocupando Marte... 99% Cargando."
    En la parte inferior, poner tres botones brillantes enlazando a X (Twitter), SpaceX y Tesla.
Requisito técnico:
Por favor pon todos los estilos CSS y la estructura HTML dentro de un solo archivo `index.html`.
Por favor genera el código completo directamente.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**Paso 3: Generar y Previsualizar**

En el paso anterior, Trae ya nos ayudó a generar un archivo `index.html`. ¿Así que cómo vemos su efecto actual?

Dile a Trae en el chat:

```markdown
Por favor ayúdame a iniciar un servicio local para previsualizar esta página web.
```

Recibirás un enlace como `http://localhost:8000`. Cópialo y ábrelo en el navegador, y verás una genial "página de Marte", quizás con estrellas parpadeando en el fondo.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

Pero notaremos que la página actual es solo una página de aterrizaje muy genial. Como una página personal completa, todavía tiene muy poca información y carece de la profundidad esperada de una página académica. Así que basándonos en este framework visual, ahora continuamos enriqueciéndola con información de estilo académico sobre Elon Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**Paso 4: Mejorar la Información Más Aún**

Queremos que Trae mantenga el estilo Marte actual, pero reestructure la página en algo más parecido a la plantilla académica. Necesitamos decirle claramente que mueva los elementos existentes a la izquierda y cree una nueva área de contenido a la derecha para texto de perfil e informes técnicos, mientras mantiene todo el contenido recién añadido en el mismo estilo cyberpunk negro y rojo.

Copia el siguiente prompt y envíalo a Trae:

```text
Principio central:
Debes preservar estrictamente el estilo de diseño actual "SpaceX / Marte", incluyendo fondo negro puro, decoraciones de luz estelar, color de acento neón rojo y fuente monoespaciada de estilo código. No uses el fondo blanco de la imagen de referencia.

Pasos de modificación específicos:
1. Crear un diseño de dos columnas
Divide la página en columnas izquierda y derecha. La barra lateral izquierda debe tomar aproximadamente 30% a 35% del ancho, y el área de contenido derecha debe tomar aproximadamente 65% a 70%.

2. Barra lateral izquierda - mover la información existente
Mueve todos los elementos actuales de la pantalla hero original a la barra lateral izquierda fija:
    - Avatar: mantiene el avatar circular de Elon Musk.
    - Nombre y título: mantiene el texto neón rojo "ELON MUSK" y "Technoking of Tesla".
    - Barra de carga: mantiene "Ocupando Marte... 99% Cargando" como firma personal.
    - Botones sociales: mueve los tres botones rojos, X, SPACE X y TESLA, a la parte inferior de la barra lateral izquierda.

3. Área de contenido derecha - añadir información detallada
Añade una introducción personal detallada y logros en el área derecha. Todo el texto del cuerpo nuevo debe usar blanco o gris claro, mientras que los títulos deben usar énfasis neón rojo. Por favor crea las siguientes secciones:
- Sobre Mí:
    Escribe una breve introducción, por ejemplo: "Emprendedor tecnológico e ingeniero enfocado en expansión multiplanetaria, energía sostenible e inteligencia artificial."
- Áreas de Enfoque:
    Lista Ingeniería de Sistemas Espaciales, Arquitectura de Colonización de Marte, Interfaces Cerebro-Máquina.
- Planes Visionarios e Informes Técnicos:
    Esta es la sección clave. Refiérete al estilo de lista en la imagen de ejemplo, pero conviértelo en un estilo de fondo negro.
    Crea una lista mostrando sus planes técnicos importantes, usando bordes rojos o efectos de brillo para distinguir cada elemento.
    Elemento 1: "Making Humans a Multi-Planetary Species" (Arquitectura Starship, 2017).
    Elemento 2: "Hyperloop Alpha" (Propuesta de transporte de alta velocidad, 2013).
    Elemento 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Logros Notables:
    Lista brevemente hitos como:
    Primer cohete de propergol líquido privado en alcanzar órbita (Falcon 1)
    Primer cohete de clase orbital reutilizable (Falcon 9)

4. Requisitos de Detalle de Estilo
Todos los títulos de sección a la derecha, como "Sobre Mí", deben usar el mismo estilo de brillo rojo que el texto "ELON MUSK" a la izquierda.
Asegúrate de que toda la página siga siendo responsiva y preserve un buen diseño de dos columnas en diferentes tamaños de pantalla.
```

Actualiza el navegador después de eso, y tu página académica cyberpunk está completa. Por supuesto, puedes seguir mejorándola según tus propias preferencias. Al igual que en los pasos anteriores, solo necesitas decirle a Trae el objetivo claramente, y él manejará el tedioso proceso de codificación por ti.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 Cómo Desplegar el Sitio Construido a Mano

A diferencia de la plantilla bifurcada anteriormente, que provenía del repositorio de otra persona, este proyecto es creado recién por ti y aún no tiene una ubicación correspondiente en GitHub. Por lo tanto, necesitamos vincularlo manualmente.

**Paso 1: Crear un Nuevo Repositorio en GitHub**

1. Inicia sesión en GitHub en el navegador.
2. Haz clic en el icono **+** en la esquina superior derecha, luego **New repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **Nombre del repositorio**: introduce `mars-profile`, o cualquier otro nombre que te guste.

**Nota**:
Si ya has usado **`tu-nombre-de-usuario.github.io`**, no puedes reusar ese nombre aquí. Puedes elegir otro nombre, y GitHub entonces generará una URL como **`tu-nombre-de-usuario.github.io/mars-link`**.

4. **Public / Private**: elige **Public**.
5. **No marques "Add a README file"!**
   Deja las otras opciones en sus valores predeterminados.
6. Haz clic en **Create repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**Paso 2: Subir el Código Local a la Nube**

Después de la creación, GitHub te llevará a una página con mucho contenido que parece código. No te preocupes. Solo necesitamos copiar el enlace del repositorio que se muestra en esa página.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Vuelve a Trae y escribe en el chat:

```markdown
He creado un repositorio vacío en GitHub. La dirección es: https://github.com/tu-nombre-de-usuario/mars-link.git (por favor reemplaza esto con la dirección real del repositorio que acabas de crear).
Ahora por favor ayúdame a inicializar el proyecto local actual como un repositorio Git y subir el código a la rama `main` de esta dirección remota.
```

Trae usualmente ayudará a ejecutar la secuencia estándar de abajo, y puede que solo necesites hacer clic para ejecutarlas:

1. `git init`
2. `git add .` y `git commit -m "First commit"`
3. `git branch -M main` y `git remote add origin [tu dirección]`
4. `git push -u origin main`

Después de que Trae complete la subida, vuelve a GitHub y actualiza la página. Haz clic en la pestaña **Code**, y verás que el código escrito en Trae ha sido exitosamente subido al repositorio.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**Paso 3: Habilitar GitHub Pages**

Después de que el código se sube, la página web no aparecerá automáticamente. Aún necesitamos encender el interruptor manualmente:

1. Vuelve a la página del repositorio de GitHub y haz clic en **Settings** en la parte superior.
2. Haz clic en **Pages** en la barra lateral izquierda.
3. Bajo **Build and deployment**:
   1. Establece **Source** en `Deploy from a branch`.
   2. Establece **Branch** en `main`, y elige `/(root)` como carpeta.
4. Haz clic en **Save**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Después de hacer clic en Save, la página web no aparecerá instantáneamente. El backend de GitHub funciona como una pequeña fábrica de robots. Necesita alrededor de **1 a 2 minutos** para empaquetar tu código, construirlo y publicarlo en servidores globales.

Espera pacientemente y actualiza la página. Bajo el gran encabezado **GitHub Pages**, verás una línea con una URL similar a:
**"Your site is live at `https://tu-nombre-de-usuario.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

Haz clic en ella, y tu centro de comando de Marte está en línea.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. Palabras Finales

El tutorial ha terminado. Ahora, cuando mires el `.github.io` brillando en la barra de direcciones de tu navegador, ¿sientes un poco como si hubieras plantado una bandera en internet?

En este tutorial, tomamos prestada la persona de Elon Musk y construimos un sitio web como un proyecto de Lego que se ve bastante impresionante. Pero esto es solo el comienzo. La parte más encantadora de Vibe Coding no es cuánto tiempo de escritura ahorra. Es que **destruye completamente la pared entre "idea" y "realidad".**

En el pasado, podrías haber renunciado a mostrar un proyecto porque **no podías escribir CSS**.
Ahora, los únicos límites que quedan son tu **imaginación** y tu **gusto**.

**No dejes que este sitio permanezca como un "clon inspirado en Musk".**
Ese enlace de Tesla que usaste para practicar y ese informe de colonización de Marte son finalmente la historia de otra persona. Tu página personal debería ser tu propia tarjeta de presentación en el mundo digital.

Ve y pon allí tu primera experiencia de proyecto real.
Ve y publica tus propios pensamientos únicos sobre un tema técnico.
Incluso puedes poner tu lista de libros favoritos o tus propias fotos.
Pensamientos que quedarían enterrados en los Moments de WeChat pueden permanecer aquí permanentemente.
Pasión que no cabe dentro de un currículum puede extenderse libremente aquí.

No dejes este terreno vacío.
Ve a experimentar. Ve a romperlo. Ve a reconstruirlo.
Sigue haciendo eso hasta que crezca hasta la forma que más te gusta.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***Adelante, y deja que el mundo te vea.***

# Referencias

CSDN: [Tutorial de nivel niñera más reciente de 2025: paso a paso sobre cómo usar GitHub para construir una página personal](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Tutorial de descarga e instalación de Git](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Tutorial de instalación de Ruby en Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
