
# Nivel basico 2: aprende herramientas de programacion con IA

## Introduccion del capitulo

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Aprox. <strong>1 dia</strong>, se puede completar en varias sesiones'
const relatedArticles =
  relatedArticlesMap['es-es/stage-1/introduction-to-ai-ide'] ?? []
</script>

<ChapterIntroduction :duration="duration" :tags="['Configuracion de entorno local', 'IDE y AI IDE', 'Tecnicas de desarrollo eficiente']" coreOutput="1 minijuego original" expectedOutput="Creado con Trae">

Antes experimentamos la programacion con IA en z.ai, pero la version web tiene muchas limitaciones: <strong>no permite guardar en cualquier momento</strong>, <strong>no facilita gestionar archivos</strong> y tampoco <strong>sirve bien para proyectos complejos</strong>. Este capitulo te ayuda a llevar el entorno de desarrollo a tu propio ordenador, para que puedas <strong>crear cosas de forma realmente independiente</strong>.

Primero aclararemos <strong>cual es la diferencia entre un IDE y un AI IDE</strong>, y por que este ultimo puede <strong>multiplicar tu eficiencia</strong>. Luego te guiaremos <strong>paso a paso</strong> para crear localmente un juego de Snake con Trae, recorriendo el <strong>flujo completo</strong> desde la instalacion hasta la ejecucion. Al final compartiremos algunas <strong>tecnicas practicas para conversar con la IA</strong>, para que evites desvio innecesarios.

Al terminar este capitulo, habras <strong>dominado un flujo de desarrollo parecido al de un programador</strong>.

::: tip 💡 Consejo avanzado
Si ya tienes cierta base de programacion y quieres usar herramientas mas potentes por adelantado, puedes consultar [Herramientas modernas de CLI Coding](../../stage-2/backend/modern-cli/) para desarrollar desde la linea de comandos.
:::

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Entorno', description: 'Entender IDE y AI IDE' },
      { title: 'Practica local', description: 'Crear Snake con Trae' },
      { title: 'Herramienta', description: 'Conocer la interfaz del IDE' },
      { title: 'Comunicacion', description: 'Hablar eficazmente con la IA' }
    ]" />
  </ClientOnly>
</div>

## 1. Que entorno y herramientas necesitas para escribir codigo

### 1.1 Cambio de mentalidad: ante un problema, pregunta primero a la IA

Antes de presentar distintos entornos y herramientas, conviene recordar algo importante: necesitas **cambiar tus habitos de pensamiento**.

En el aprendizaje tradicional de programacion, si necesitas instalar Python, configurar Conda o resolver un fallo de instalacion de npm, normalmente abres un buscador, encuentras un tutorial y sigues los pasos uno por uno. Si aparece un error en medio, tal vez tengas que buscar el mensaje de error y probar varias veces.

Error! ❌

En la era de la IA, especialmente al usar un AI IDE, recuerda un principio central: **cualquier operacion se puede preguntar primero a la IA, e incluso dejar que la IA la haga por ti.**

- **No sabes como instalar el entorno?** Pregunta directamente a la IA en la barra lateral: "Quiero escribir Python. Ayudame a comprobar si Python esta instalado; si no, instalalo por favor."
- **La red se queda bloqueada?** Si al instalar dependencias todo queda cargando o aparece un error, pasa el error a la IA: "La descarga fallo. Es un problema de red? Puedes ayudarme a cambiar a otro mirror?"
- **No recuerdas comandos?** No hace falta memorizar comandos de Git o Conda. Dile directamente a la IA: "Ayudame a crear un nuevo entorno virtual llamado demo."

### 1.2 Por que necesitas entorno y herramientas

Pasar de "probar unas lineas de codigo" a "construir un proyecto mantenible a largo plazo" exige entornos y herramientas completamente distintos.

En teoria, tambien puedes escribir codigo con el bloc de notas del sistema, pero los problemas aparecen enseguida:

- **Todo el codigo es texto negro**: palabras clave, strings y comentarios se mezclan, y cuesta ver la estructura de un vistazo.
- **No hay sugerencias inteligentes**: hay que escribir cada palabra completa a mano, y una letra mal escrita obliga a revisar una y otra vez.
- **Con muchos archivos todo se desordena**: al cambiar entre docenas de archivos, a menudo no encuentras la linea que necesitas modificar.
- **Al fallar solo puedes adivinar**: si el programa se rompe, no sabes donde esta el problema y solo puedes imprimir logs linea por linea.

Por eso necesitas un IDE (Integrated Development Environment, entorno de desarrollo integrado). Un IDE muestra el codigo con colores, ofrece sugerencias al escribir, organiza archivos por proyecto y permite rastrear errores paso a paso, haciendo el desarrollo mas eficiente y menos propenso a errores.

## 2. Que es un IDE y por que lo necesitas

::: info Lectura previa
Si todavia no sabes que es un IDE o para que sirve cada elemento de su interfaz, te recomendamos leer primero [Introduccion a IDE](/es-es/appendix/2-development-tools/ide-basics) para conocer los conceptos basicos y funciones habituales.
:::

En los primeros tiempos de la programacion, bastaban un editor de texto simple y un procesador del lenguaje. Pero al aumentar la complejidad de los proyectos, los desarrolladores necesitaron con urgencia una herramienta que gestionara archivos de forma eficiente, soportara resaltado de sintaxis y permitiera depurar. Asi nacio el entorno de desarrollo integrado, o IDE.

Puedes entender un IDE como un programa especializado para "editar, gestionar, ejecutar y depurar" codigo. Los IDE tempranos tenian un aspecto muy "primitivo" y se operaban casi por completo con el teclado.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image1.png)![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image2.png)

Interfaz de terminal. Fuente de la imagen: https://en.wikipedia.org/wiki/File:Emacs-screenshot.png

Los "IDE integrados" conocidos y maduros, como `Vim`, se usan a menudo para operaciones remotas en servidores.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image3.png)

Para trabajar con mas eficiencia, necesitamos IDE modernos que soporten operaciones con raton. Normalmente incluyen:

- **Editor de codigo fuente**: resaltado de sintaxis y autocompletado.
- **Herramientas de build y ejecucion**: compilador/interprete integrado.
- **Depurador**: depuracion con breakpoints e inspeccion de variables.

Los IDE modernos suelen integrar tambien herramientas como Git. El mas popular es **[Visual Studio Code (VS Code)](https://code.visualstudio.com/)** de Microsoft: ligero y extensible. Aunque existen IDE profesionales como la suite de JetBrains, VS Code es el mas amable para principiantes.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image4.png)

La idea central de VS Code es "todo es un plugin". Mediante su sistema de plugins soporta muchos lenguajes: instala el plugin de Python y se convierte en un IDE de Python; instala el plugin de C++ y se convierte en un IDE de C++. Sin plugins, es solo un editor de texto avanzado.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image5.png)

Incluso puede usarse para editar documentos Markdown.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image6.png)

En resumen, un IDE es un conjunto de herramientas que ayuda a los desarrolladores a escribir codigo y ejecutar programas con eficiencia.

Para una explicacion mas detallada, consulta [la seccion del apendice sobre el principio visual de un IDE](/es-es/appendix/2-development-tools/ide-basics).

## 3. En que se diferencia un AI IDE de un IDE normal

Un IDE normal, como VS Code original, es en esencia una "caja de herramientas":  
puede abrir proyectos, escribir codigo, ejecutar y depurar, e instalar plugins, pero parte de una condicion: debes saber por tu cuenta que hacer y como hacerlo.

- Cuando hay un error, lees el mensaje y buscas que linea tiene el problema.
- Si quieres agregar una pagina o API nueva, buscas el archivo correspondiente y escribes el codigo.
- Si quieres configurar el entorno o empaquetar, consultas documentacion y sigues los pasos.

En un AI IDE, en cambio, puedes usar directamente un modelo de lenguaje grande para ayudarte a programar y modificar archivos:

- Dices "haz una pagina de login" y primero genera una estructura basica de codigo.
- Le pasas el mensaje de error y el codigo relacionado para que analice la causa y proponga cambios.
- Tras tu confirmacion, puede crear archivos, modificar codigo en lote y encargarse del trabajo repetitivo entre varios archivos.

Por ejemplo, puedes seleccionar un bloque de codigo y pedirle "refactoriza esto" o "agrega comentarios". Tambien puedes preguntar en la barra lateral "como esta disenado este proyecto?", usando `@nombre-de-archivo` o `@todo-el-proyecto` para indicar el alcance de referencia, y completar con una frase tareas tediosas como crear archivos, escribir codigo y ejecutar.

En la version mas reciente de VS Code ya hay integrado un asistente basado en un modelo de lenguaje grande. Puedes conversar con el modelo sobre todo el repositorio, un archivo concreto o incluso una funcion. Tambien puedes, como hiciste antes con herramientas web de autoprogramacion, enviar requisitos como prompts al Agent de codigo integrado para que implemente funciones, cree archivos, modifique codigo, configure entornos y mas.

Puedes descargar e instalar VS Code, hacer clic en la entrada de la barra lateral en la esquina superior derecha y abrir el area de funciones de IA para probar estas capacidades.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image7.png)

Sin embargo, VS Code no es el IDE con capacidades de IA mas fuertes. Para escenarios que requieren mucha asistencia de IA al programar, a menudo conviene usar herramientas "mas inteligentes y eficientes": un buen AI IDE puede ahorrar mucho tiempo escribiendo codigo y corrigiendo bugs. A continuacion presentamos varios AI IDE populares; puedes elegir cualquiera segun tus preferencias.

Como VS Code es open source, cualquiera puede descargar el codigo fuente y compilarlo por su cuenta. Por eso, la gran mayoria de AI IDE del mercado estan desarrollados sobre VS Code. No tienes que preocuparte por "aprender muchos IDE": **si conoces el uso basico de VS Code**, pasar a estos AI IDE no requiere empezar de cero.

En general, las diferencias entre AI IDE se concentran en cuatro aspectos: precio; tipos de modelos disponibles, pues algunos modelos avanzados pueden estar restringidos en ciertas regiones; capacidad del Agent, es decir, que tan inteligente y capaz es al ayudarte a programar; y velocidad/rendimiento. Puedes elegir segun tus pruebas reales: la mejor herramienta es la que mejor te funcione.

> Un AI IDE tipico suele tener estas capacidades centrales:
>
> - Generacion y autocompletado inteligente de codigo: en un IDE tradicional escribimos unos caracteres para completar nombres de variables o funciones; en un AI IDE moderno puedes escribir unas lineas de pseudocodigo o explicar brevemente el requisito, y el IDE completa la logica, o incluso genera bloques grandes de codigo segun la instruccion.
> - Comprension de codigo y Q&A: el IDE puede entender y responder preguntas sobre un fragmento, un archivo o incluso toda la estructura del proyecto.
> - Refactorizacion y optimizacion: el IDE puede reescribir u optimizar la logica de un fragmento segun tu intencion.
> - Generacion automatica de tests: el IDE puede generar tests para distintas funciones y modulos, facilitando pruebas dirigidas.
> - Ejecucion de tareas tipo Agent: un Agent inteligente puede generar, empaquetar, instalar, ejecutar y modificar codigo; en muchas tareas puede reemplazar parcialmente el trabajo de un ingeniero junior.

::: details Antigravity

### [Antigravity](https://antigravity.google/)

Antigravity es un AI IDE nuevo lanzado por Google en noviembre de 2025 junto con Gemini 3. Usa un modo de desarrollo "Agent-First". A diferencia de la asistencia de codigo tradicional, Antigravity convierte al agente de IA en un "ejecutor activo": puede operar directamente el editor, terminal, navegador y otras herramientas, asumiendo mas trabajo de ejecucion, planificacion y verificacion. El desarrollador solo plantea una intencion de alto nivel; el agente divide tareas, crea planes, escribe codigo, ejecuta pruebas y genera resultados. Soporta cambio entre modelos como Gemini 3 Pro y Claude Sonnet 4.5. Actualmente se ofrece como public preview y soporta Windows, macOS y Linux.
:::

::: details Trae

### [Trae](https://www.trae.ai/)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image8.png)

Trae es un asistente de programacion con IA lanzado por ByteDance. Soporta mas de 100 lenguajes de programacion y puede integrarse con IDE populares. Sus funciones incluyen generar codigo desde lenguaje natural, depuracion automatica y convertir disenos en componentes React/Vue. Tras la actualizacion de agosto de 2025, Trae agrego importacion inteligente de dependencias, sugerencias de renombrado, gestion de listas de tareas y mas; el modo SOLO tambien empezo a soportar generacion de backend y edicion de documentos de arquitectura tecnica.
:::

::: details Cursor

### [Cursor](https://cursor.com/)

Cursor es un editor de codigo con IA desarrollado por Anysphere, personalizado sobre VS Code y optimizado para repositorios grandes y colaboracion entre multiples archivos. Soporta modelos como GPT-4o y Claude 3.7. El modo Claude Max lanzado en 2025 puede manejar proyectos de millones de lineas de codigo. La version Pro elimino limites de solicitudes, por lo que es adecuada para proyectos empresariales complejos.

Actualmente, Cursor puede considerarse uno de los AI IDE con interfaz grafica de mejor experiencia global. Tiene una base de usuarios grande y un ritmo alto de iteracion. Su mayor desventaja es el precio: la version Pro cuesta alrededor de 20 USD al mes.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image9.png)
:::

::: details Qoder

### [Qoder](https://qoder.com/)

Qoder es un AI IDE lanzado por Alibaba que enfatiza la "colaboracion transparente" y una "capacidad reforzada de context engineering". Mediante Action Flow permite dividir tareas en varios pasos y seguir en tiempo real la ejecucion de la IA. Tambien soporta routing dinamico entre modelos y gestion de estado de tareas, por lo que es adecuado para gobernanza de arquitectura en proyectos medianos/grandes y analisis de "reverse engineering" de sistemas legacy.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image10.png)
:::

::: details CodeBuddy

### [CodeBuddy](https://www.codebuddy.com/)

CodeBuddy es una herramienta de programacion con IA lanzada por Tencent Cloud, centrada en soporte para instrucciones en chino y cumplimiento empresarial. Ofrece autocompletado de codigo, revision de codigo por lotes y cambio entre modelos. Su agente Craft puede generar codigo en multiples archivos e integrar APIs. La version enterprise soporta despliegue privado y ha pasado certificacion de seguridad de nivel 3, adecuada para sectores con altas exigencias de seguridad de datos como finanzas y salud.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image11.png)
:::

::: details VS Code + Cline

### VS Code + [Cline](https://cline.bot/)

Cline es un plugin de AI programming Agent para VS Code (Visual Studio Code). Permite cambiar de forma flexible el modelo grande configurando distintos endpoints de API. Cline soporta entrada multimodal, extension de herramientas MCP y monitoreo de costes; todas las operaciones requieren confirmacion del usuario antes de ejecutarse. Es muy adecuado para validar ideas rapidamente o integrarse con flujos de desarrollo existentes. Las funciones basicas son gratuitas, y la version enterprise soporta desplegar modelos en entornos privados.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image13.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image14.png)
:::

::: details Kiro

### [Kiro](https://kiro.dev/)

Kiro es un AI programming IDE lanzado por AWS, profundamente integrado con Amazon Bedrock y el ecosistema de servicios cloud de AWS. Soporta varios modelos grandes como Claude y Nova, y es especialmente adecuado para escenarios que requieren integracion estrecha con servicios AWS. Kiro ofrece generacion inteligente de codigo, pruebas automatizadas e integracion fluida con recursos de AWS como Lambda, S3 y DynamoDB, lo que le da ventajas particulares en desarrollo cloud-native.

> **Nota**: si quieres usar modelos relacionados con Anthropic Claude, necesitas usar Cursor, Kiro o Antigravity como IDE. Estos IDE tienen colaboracion oficial o integracion profunda con Anthropic y ofrecen una experiencia de Claude mas estable y completa.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Entorno', description: 'Entender IDE y AI IDE' },
      { title: 'Practica local', description: 'Crear Snake con Trae' },
      { title: 'Herramienta', description: 'Conocer la interfaz del IDE' },
      { title: 'Comunicacion', description: 'Hablar eficazmente con la IA' }
    ]" />
  </ClientOnly>
</div>

## 4. Practica: crear un juego de Snake en local con un AI IDE

Lo anterior trato sobre "conceptos" y "diferencias". En esta seccion convertiremos esas ideas abstractas en acciones concretas mediante una practica completa: **crear una carpeta vacia -> abrirla con un AI IDE -> conversar en la barra lateral para que use React y genere desde cero un juego de Snake.** Aqui usaremos Trae como ejemplo, asi que primero debemos instalarlo y entender brevemente que es.

::: tip 💡 Consejo: conexion fluida de la web a local
Si antes desarrollaste un proyecto en z.ai u otra plataforma web de programacion con IA, puedes descargar el codigo a local y abrirlo con un AI IDE para seguir trabajando. Asi conservas el resultado anterior y ademas aprovechas las capacidades mas potentes de un IDE local.

Los pasos son sencillos:
1. En z.ai u otra plataforma, haz clic en descargar y guarda el proyecto en local
2. Descomprimelo y abre la carpeta con un AI IDE como Trae o Cursor
3. Sigue conversando con la IA en la barra lateral para iterar y mejorar el proyecto
:::

### 4.1 Preparacion: instalar y conocer Trae

#### 4.1.1 Que es Trae

El nombre Trae puede entenderse como "The Real AI Engineer". Es un entorno de desarrollo integrado con IA adaptativa desarrollado por ByteDance. Esta construido sobre el popular VS Code, lo que significa que si ya estabas acostumbrado a VS Code, al usar Trae tanto el layout como las operaciones basicas te resultaran familiares y comodas.

El objetivo central de Trae es ser el "companero inteligente de programacion" del desarrollador. Gracias a una integracion profunda de capacidades de IA, puede automatizar mucho trabajo repetitivo y ofrecer una experiencia de desarrollo mas intuitiva y eficiente. No es solo una "herramienta de autocompletado", sino que busca ayudar durante todo el flujo: crear proyectos, escribir codigo, depurar, probar y desplegar.

#### 4.1.2 Instalar Trae

Trae tiene version internacional y version china. La internacional requiere acceso a red internacional, pero permite usar modelos extranjeros recientes como GPT-5; la version china soporta principalmente modelos grandes chinos recientes, como GLM, Qwen y Kimi.

Descarga de la version internacional: https://www.trae.ai/  
Descarga de la version china: https://www.trae.cn/

##### Precio y formas de uso de Trae

::: info 💡 Consejo de version (para principiantes se recomienda CN)
- **Para empezar desde cero recomendamos mucho descargar la version china (CN, trae.cn)**. Actualmente ofrece mejor experiencia, las funciones basicas son gratuitas y no requiere red internacional.
- Si necesitas usar modelos extranjeros como GPT-5 y tu red lo permite, puedes elegir la version internacional.
- Si ya tienes una API Key de un modelo de terceros, conectarlo puede ayudarte a controlar costes con flexibilidad.
:::

> 💡 **Actualmente se recomienda probar con modelos gratuitos de OpenRouter**
> 
> En el momento de escribir este tutorial (2026-02-12), todavia se puede probar gratis el modelo de StepFun. Puedes consultar la forma de conexion en la seccion 4.2 y conectar `stepfun/step-3.5-flash:free`.

Sobre el coste y uso de Trae, hay varias opciones:

- **Version CN nacional (muy recomendada)**: uso basico gratuito; por ahora la experiencia global es mejor que la internacional y es muy adecuada para principiantes. Como hay muchos usuarios, a veces puede haber cola.
- **Version internacional**: la suscripcion cuesta alrededor de 3 USD al mes y permite acceder a modelos extranjeros como GPT-5, pero requiere acceso a red internacional.
- **Conexion de modelos de terceros**: si ya tienes Token API de modelos nacionales como DeepSeek, Tongyi Qianwen o Kimi, puedes conectarlos mediante la configuracion de modelos de terceros de Trae. Los grandes proveedores cloud como Alibaba Cloud, Tencent Cloud o Baidu Cloud suelen ofrecer planes Coding Plan; tras comprarlos, puedes usar sus APIs de modelos grandes a menor coste. Asi eliges libremente tu modelo preferido y controlas el coste.

Se recomienda a principiantes empezar con la version CN gratuita (descarga: https://www.trae.cn/). Actualmente funciona mejor y es completamente gratuita. Si encuentras colas o necesitas un servicio mas estable, puedes conectar un modelo de terceros y comprar el Coding Plan correspondiente del proveedor cloud.

#### 4.1.3 Introduccion rapida a la interfaz de Trae

En cuanto a interfaz, Trae se parece mucho a VS Code: mantiene el layout clasico de tres columnas, con explorador de recursos a la izquierda, editor en el centro y panel extendido a la derecha.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image17.png)

La barra lateral derecha es la ventana de interaccion de Copilot, que tambien puede entenderse como ventana del Agent. Si no la ves, puedes abrirla haciendo clic en el icono de barra lateral en la esquina superior derecha de Trae.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image18.png)

Al abrir la barra lateral veras una opcion `Builder`: ese es el modo Agent. De forma simple, es como una "version local" de z.ai; puede operar tu entorno local, instalar runtimes, abrir paginas web, etc.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image19.png)

Tras hacer clic en "Builder", veras los modos "Chat" y "Builder with MCP":

- **Modo Chat**: se usa principalmente para conversar sobre el codigo de la carpeta actual o como modelo de chat normal. Puedes abrir una carpeta desde el menu "File" en la esquina superior izquierda y editar dentro de esa carpeta. En ese caso, los archivos que Builder cree o modifique solo ocurriran dentro de esa carpeta.
- **Modo Builder with MCP**: ofrece mas herramientas al Agent, por ejemplo conectar el modelo de lenguaje con otro software o consultar el clima. Puedes entenderlo asi: MCP permite que el modelo llame herramientas externas con mas facilidad.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image20.png)

En la zona inferior tambien veras la opcion de seleccion de modelo; al hacer clic puedes cambiar el modelo grande actual. En la version china puedes elegir modelos nacionales como Kimi k2 o GLM; si usas Trae internacional, tambien puedes elegir modelos extranjeros como ChatGPT o Claude. Sin embargo, como los modelos nacionales avanzan muy rapido, Kimi, Qwen y GLM ya se acercan en muchas tareas a Claude 3.5 o 3.7 y son suficientes para desarrollo diario. Aqui no exigimos usar una version concreta.

**Ten en cuenta que aqui no se recomienda usar modo Auto (seleccion automatica de modelo). Si es la version internacional, recomendamos Gemini o GPT; si es la version china, recomendamos probar modelos nacionales como Kimi k2, MiniMax o GLM.** Cada modelo encaja mejor en escenarios distintos; no hay una regla dogmatica sobre cual es mejor. Si una tarea se atasca, cambia de modelo y usa varias pruebas para encontrar tu mejor resultado.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image21.png)

Esto es una introduccion breve a Trae. A continuacion, podemos repasar lo que hicimos antes en z.ai e intentar hacer lo mismo en Trae.

### 4.2 Paso 1: crea una carpeta vacia y abrela con el AI IDE

Antes de empezar, primero necesitamos preparar un directorio de trabajo limpio.  
Para el ejemplo de esta seccion, puedes crear localmente una carpeta vacia llamada snake-game-react.

Despues abre el AI IDE instalado, elige abrir carpeta u Open Folder en la pantalla inicial, e importa esa carpeta vacia como raiz del proyecto. Tambien puedes arrastrar la carpeta directamente a la ventana del IDE. En ese momento, el explorador de la izquierda no mostrara archivos de codigo, lo que indica que empezamos desde un proyecto totalmente en blanco.

::: details 📚 Opcional: conectar API o Coding Plan de proveedores cloud

Esta seccion explica como conectar API o Coding Plan de proveedores cloud para obtener llamadas de modelo mas estables y frecuentes. Al final se muestran capturas de conexion en Trae.

**Que es Coding Plan**

Coding Plan es un plan de suscripcion ofrecido por grandes proveedores cloud. Tras comprarlo, puedes usar durante cierto periodo la API de modelos grandes de ese proveedor **sin limite o con alta frecuencia**. Frente al cobro por Token, Coding Plan se parece mas a un "paquete mensual": pagas una cantidad fija y puedes usarlo con tranquilidad sin preocuparte por cada llamada.

**Por que comprar Coding Plan**

Tal vez preguntes: si ya puedo llamar modelos grandes directamente por API, por que comprar Coding Plan? La razon principal es: **puedes usarlo continuamente**. Su ventaja central es que permite llamar modelos grandes en cualquier momento y con frecuencia, sin miedo a que el coste se dispare ni necesidad de revisar la tabla de facturacion todo el tiempo.

**Coding Plan nacionales recomendados**

Estas son opciones recomendadas de Coding Plan de proveedores cloud principales en China:

- Zhipu AI (BigModel Plan): https://bigmodel.cn/glm-coding  
- Volcengine (ByteDance Cloud AI Plan): https://www.volcengine.com/activity/codingplan

> 💡 **Tambien puedes conectar directamente APIs de modelos grandes**
> Ademas de Coding Plan, puedes conectar APIs de modelos mediante Add Model. Puedes consultar mas abajo el metodo para conectar la API gratuita OpenRouter StepFun y usarla en Trae. En pruebas, cubre necesidades basicas de programacion.
> Si necesitas recargar saldo, se recomienda probar primero con 10 yuan para ver cuanto dura, por ejemplo con modelos de buena relacion coste-rendimiento como DeepSeek.

**Como conectar Coding Plan**

Los pasos son muy simples y solo tardan unos minutos:

1. Visita el sitio del proveedor cloud elegido, por ejemplo Zhipu AI: https://bigmodel.cn/glm-coding o Volcengine: https://www.volcengine.com/activity/codingplan
2. Registra una cuenta e inicia sesion
3. Busca la pagina "Pricing" o "Coding Plan"
4. Elige el paquete adecuado y completa el pago
5. Tras pagar, recibiras una API Key o Plan ID

::: tip 🎯 Recomendacion de modelo personalizado

Al conectar modelos personalizados en Trae, **recomendamos por defecto la opcion OpenRouter**. OpenRouter ofrece una API unificada que facilita conectar multiples modelos de lenguaje grandes.

**Hasta el 12 de febrero de 2026, tambien puedes usar la API gratuita de StepFun:**

- **`stepfun/step-3.5-flash:free`**: modelo gratuito ofrecido por StepFun, tambien conectable directamente en Trae.

**Otros modelos gratuitos:**

- **`openrouter/free`**: opcion de modelo que usa por defecto una API LLM gratuita. Puede usarse directamente en Custom Model de Trae escribiendolo como model ID, sin pagar, para experimentar programacion con IA.

Estas opciones gratuitas son ideales para principiantes. Antes de entrar en produccion, puedes familiarizarte con el flujo del AI IDE usando estas alternativas.

**Opcional: conectar API de modelos grandes (ejemplo con DeepSeek)**

1. Visita la plataforma DeepSeek: https://platform.deepseek.com/usage
2. Registra una cuenta e inicia sesion
3. Compra un paquete de Token de 10 yuan en la pagina de recarga
4. Tras recargar, crea y copia la API Key en la pagina API Keys
5. En Trae, haz clic en **"Add Model"**, busca DeepSeek, elige el modelo correspondiente e introduce la API Key

Con la siguiente interfaz puedes agregarlo correctamente. Ojo: tras ver las opciones de seleccion de modelo, **debes desplazarte hasta el final**. Abajo hay una opcion "Custom Model"; solo al hacer clic podras introducir el model ID. Aqui puedes escribir directamente el model ID recomendado, por ejemplo `stepfun/step-3.5-flash:free`. Luego haz clic abajo para obtener Key, ve al sitio oficial y escribe la API Key correspondiente para usarlo normalmente.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-14-51.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-15-29.png)
:::

### 4.3 Paso 2: conversa en la barra lateral y deja que la IA disene Snake con React

Ahora abre la barra lateral de chat con IA: normalmente con `Ctrl+L` o haciendo clic en el icono de chat a la derecha. Luego escribe un prompt suficientemente claro:

> Usa arquitectura React para implementar un juego de Snake, con control por teclado, crecimiento y puntos al comer comida, mensaje "Game over" al chocar contra la pared o contra si mismo, y soporte para reiniciar. Cuando lo implementes, ayudame a arrancar el proyecto. Si falta algun entorno o programa, instalalo automaticamente.

Durante este proceso debes entender que la IA no es solo un modelo de chat: puede operar tu entorno local, crear archivos, instalar dependencias, ejecutar comandos de arranque, etc. Puedes describir el objetivo en lenguaje natural y dejar que la IA decida que comandos ejecutar y como organizar el codigo.

Si aparece un problema durante la ejecucion, la IA mostrara el error y la solucion propuesta en la conversacion. Puedes seguir pidiendole ajustes sin memorizar todos los detalles de comandos.

::: warning ⚠️ Atencion
Como se muestra abajo, **a veces el AI Agent se pausa durante la ejecucion porque espera que introduzcas alguna informacion interactiva**, por ejemplo un nombre, Enter para confirmar una instruccion o hacer clic para ejecutarla. En general basta con pulsar Enter. Si no sabes que hacer en ese paso, puedes capturar la pantalla y preguntar al modelo como operar.
:::

Como se muestra, aqui debemos hacer clic en Run para confirmar:
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-52-55.png)

Como se muestra, aqui solo necesitamos introducir y para confirmar:
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-53-24.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-26-33.png)

Como se muestra, aqui estamos creando una plantilla pero no sabemos como operar; podemos capturar esta parte y preguntar al modelo:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-29-12.png)

Otra razon por la que el AI Agent se pausa es que en ese momento se ha iniciado un "service". Nuestro Snake tambien es una especie de "service". Si ves una URL como la del comando siguiente, significa que el Agent ha ejecutado un servicio local en tu ordenador; puedes visitar esa URL para abrir Snake. Como el servicio debe seguir ejecutandose, aqui parece quedar pausado. Solo tienes que hacer clic en `Skip`.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-30-51.png)

Si durante el proceso encuentras terminos o contenido que no entiendes, no te preocupes. Puedes consultar la seccion "explicacion de terminos de computacion" del apendice, preguntar directamente a la IA o plantear dudas a tiempo.

Si encuentras comportamientos inesperados, por ejemplo Snake no termina al chocar contra la pared, o la serpiente no se mueve tras hacer clic en iniciar, solo describe el fenomeno al Agent de la barra lateral. Si hay errores, recuerda capturar pantalla o copiar el error al Agent. Si despues de varios intentos sigue sin resolverse, prueba a cambiar de modelo.

Tras esperar un momento, obtendremos un resultado similar al de z.ai:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-33-37.png)

Podemos hacer clic en el check de la esquina inferior derecha para confirmar los cambios de codigo, o en `Cancel` para cancelarlos. Tambien puedes hacer clic donde dice 2 files need review para desplegar y revisar el codigo modificado.

Tambien conviene recordar que las modificaciones de codigo no siempre son correctas. Los Agent de IDE suelen soportar rollback. Por ejemplo, si aqui haces una modificacion equivocada o el resultado no te satisface, tras terminar puedes volver al area de entrada, hacer clic en Revert y regresar al estado anterior. Luego ajusta el texto de entrada y vuelve a intentarlo:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-42-53.png)

### 4.4 Paso 3 (opcional): preguntar a la IA por detalles de implementacion

Cuando Snake ya pueda ejecutarse correctamente, si todavia no conoces bien frontend o React, puedes seguir en la misma ventana de chat y pedir a la IA que te guie por el codigo con lenguaje lo mas cotidiano posible. No necesitas cambiar de herramienta ni buscar documentacion: pregunta continuamente sobre el proyecto actual.

Un metodo util es pedir primero una explicacion general de "como se mueve el juego" y luego bajar a detalles concretos. Por ejemplo, pregunta:

> "Explicame de arriba abajo como funciona paso a paso este juego de Snake. Usa la menor cantidad posible de terminos tecnicos."

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-44-36.png)

Luego sigue preguntando puntos clave segun su respuesta, por ejemplo:

> "Cada segmento del cuerpo de la serpiente en pantalla, con que estructura de datos se guarda? Puedes poner una analogia?"  
> "Como controlas que se mueva cada cierto tiempo? En que parte del codigo esta?"  
> "Cuando la serpiente come comida, que pasos haces? En que logica se detecta?"  
> "Donde se detecta chocar contra la pared y chocar contra si misma?"

Si ves un archivo, por ejemplo `SnakeGame.tsx`, pero no sabes que hace, puedes pedir a la IA que lo explique por bloques:

> "Divide `SnakeGame.tsx` en varios bloques por funcion y explicame que hace cada uno con palabras sencillas."

En esta conversacion, cualquier palabra que no entiendas puede ser una entrada para preguntar mas:

> "Que significa exactamente 'estado' en lo que acabas de decir? Puedes explicarlo con un ejemplo cotidiano?"  
> "Para que sirve aqui el 'temporizador'? Que pasaria si lo quitamos?"

Con este metodo, tu objetivo no es memorizar todos los conceptos de golpe, sino aclarar tres cosas: que datos centrales hay en el juego (serpiente, comida, puntuacion, estado del juego), cuando cambian esos datos (movimiento, comer comida, fin del juego) y que pequeno bloque de codigo corresponde a cada cambio. Si entiendes estos tres puntos, podras leer la logica principal del codigo.

### 4.5 Paso 4: pedir a la IA que mejore la interfaz

Aqui va un recordatorio importante para principiantes: no le digas solo a la IA "quiero que esta pantalla se vea mejor". Incluso para un disenador humano eso es demasiado vago, y mas aun para un modelo. "Mejor" que estilo es, que zonas ajustar, es problema de layout o de colores? La IA no puede deducirlo de una frase. Para acercarte al resultado que imaginas, debes convertir una meta vaga como "quiero que se vea bonito" en una lista de requisitos concretos y ejecutables.

Por ejemplo, mucha gente empieza asi:

> "Quiero que esta pantalla se vea un poco mejor."

Puedes empezar con un conjunto de requisitos generales:

> "Ayudame a mejorar la interfaz general del juego:
>
> - Centra el area de juego, que no quede pegada arriba a la izquierda;
> - Usa un fondo mas claro para que la serpiente y la comida destaquen;
> - Aumenta el tamano de la puntuacion y ponla en un lugar visible;
> - Usa azul como color principal y mejora la paleta y los botones."

Si quieres una respuesta mas clara cuando termina el juego, puedes agregar:

> "Cuando termine el juego, muestra 'Game over' en el centro de la pantalla y debajo un boton 'Reiniciar' que resetee el juego."

La IA modificara directamente los componentes React y estilos segun tu descripcion. Tras guardar y refrescar el navegador, veras la nueva interfaz. Si todavia no coincide con lo que imaginabas, puedes hacer ajustes pequenos:

> "Haz la puntuacion un poco mas grande y con color mas llamativo."  
> "Haz el area de juego un poco mas compacta y deja algo de margen alrededor."  
> "Cambia el boton de reiniciar a estilo azul con esquinas redondeadas y centralo debajo del aviso."

En esta etapa, si una modificacion causa error, no necesitas investigarlo a la fuerza. Copia el error en el chat o agrega una descripcion breve, como "este error aparecio despues de mejorar la interfaz", para que la IA lo ubique y repare dentro del contexto del proyecto. Asi, en un ciclo de "conversar y refrescar", puedes pulir un demo funcional hasta convertirlo en un producto pequeno con interfaz clara e interaccion fluida.

### 4.6 (Opcional) modificar Snake tomando como referencia la arquitectura de z.ai

Para principiantes de vibe coding, lo mas dificil suele ser no saber que cuenta como "best practice" ni que arquitectura conviene. Como falta base de computacion, tambien cuesta guiar bien a la IA. La solucion es "referenciar directamente". Recuerdas que dijimos que en z.ai se puede ver el codigo? En el README correspondiente, que presenta funciones y arquitectura tecnica del proyecto, ya hay una buena referencia arquitectonica:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-49-33.png)

Si queremos que el resultado local se parezca lo mas posible al de z.ai, podemos copiar todo el README, pegarlo en la barra lateral de Trae y pedirle que modifique el codigo local segun esa arquitectura.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-50-31.png)

Al final obtendremos un estilo de pagina muy parecido al de z.ai:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-11-00-57.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Entorno', description: 'Entender IDE y AI IDE' },
      { title: 'Practica local', description: 'Crear Snake con Trae' },
      { title: 'Herramienta', description: 'Conocer la interfaz del IDE' },
      { title: 'Comunicacion', description: 'Hablar eficazmente con la IA' }
    ]" />
  </ClientOnly>
</div>

## 5. Para que sirve cada boton de la interfaz

Con las operaciones anteriores ya completamos rapidamente un ciclo minimo de generacion de programa, pero todavia no podemos decir que dominamos el IDE. Para familiarizarnos a fondo con esta herramienta que nos acompanara durante mucho tiempo, en esta seccion explicaremos cada detalle del IDE, empezando por la interfaz. Las interfaces de distintos AI IDE varian un poco, pero la mayoria hereda [el layout de VS Code](https://code.visualstudio.com/docs/getstarted/getting-started).

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image32.webp)

La funcion concreta de cada parte es:

- **Title Bar (barra de titulo)**: muestra el nombre del archivo y los controles de ventana.
- **Activity Bar (barra de actividad)**: cambia entre vistas como archivos y busqueda.
- **Side Bar (barra lateral)**: muestra listas de archivos y otros contenidos concretos.
- **Editor Groups (area de editor)**: zona central para escribir codigo.
- **Breadcrumbs (ruta de navegacion)**: muestra la ruta del archivo y permite saltar.
- **Minimap (minimapa de codigo)**: permite previsualizar y ubicar codigo rapidamente.
- **Panel (panel inferior)**: contiene terminal y ventanas de salida.
- **Status Bar (barra de estado)**: muestra el estado del entorno actual.

Para una explicacion mas detallada, consulta [la seccion del apendice sobre el principio visual de un IDE](/es-es/appendix/2-development-tools/ide-basics).

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Entorno', description: 'Entender IDE y AI IDE' },
      { title: 'Practica local', description: 'Crear Snake con Trae' },
      { title: 'Herramienta', description: 'Conocer la interfaz del IDE' },
      { title: 'Comunicacion', description: 'Hablar eficazmente con la IA' }
    ]" />
  </ClientOnly>
</div>

## 6. Como hablar con la IA de forma eficaz

A medida que la IA se vuelve mas capaz, ya podemos entregarle muchas tareas que antes dependian de un programador.  
Pero en la practica veras algo muy claro: usando la misma IA, algunas personas consiguen un proyecto pequeno que funciona con pocas frases, mientras otras conversan durante mucho tiempo y reciben algo que no querian. La diferencia no suele estar en quien es mas inteligente, sino en si hablas con la IA de forma concreta y por pasos.  
En esta seccion partimos de varios escenarios comunes y mostramos formas de preguntar pensadas para principiantes, para que la IA produzca resultados utilizables con mas estabilidad.

### 6.1 Explica bien la necesidad: de una idea vaga a una descripcion concreta

Muchas personas, la primera vez que usan IA, solo escriben una frase muy general, por ejemplo:

> "Ayudame a hacer una pagina web."  
> "Ayudame a escribir una aplicacion pequena."

En ese caso, la IA solo puede imaginar por su cuenta lo que quieres. Puede darte algo que parece completo, pero que se aleja bastante de lo que realmente tenias en mente.  
Para que la IA entienda mejor, conviene separar la idea que tienes en la cabeza y explicarla en varias frases.

Puedes completar la peticion desde estos angulos:

1. **Dile para que usaras eso**  
   Por ejemplo, en vez de decir solo "sitio personal", di:
   - "Quiero crear una pagina personal de una sola pagina para enviarla a reclutadores."

2. **Dile que bloques de contenido necesitas**  
   No hace falta usar palabras tecnicas. Describe lo que quieres ver en la pagina:
   - "La pagina debe tener tres partes: arriba mi nombre y una frase de presentacion, en medio varias experiencias laborales, y abajo mi email y mi contacto."

3. **Dile tu nivel y tus limites**  
   Pide que trabaje de una forma adecuada para principiantes:
   - "No se programar. Usa solo la forma mas sencilla, para que pueda copiarlo en un archivo y abrirlo en el navegador."

4. **Dile como quieres recibir el resultado**  
   Por ejemplo:
   - "Dame el codigo completo que pueda guardar directamente como `index.html` y abrir en el navegador."

Juntando todo, podrias decirle a la IA:

> "No se programar. Quiero hacer una pagina personal de una sola pagina para enviarla a reclutadores.  
> La pagina necesita tres partes: arriba mi nombre y una frase de presentacion, en medio varias experiencias laborales, y abajo email y contacto.  
> Dame el codigo completo que pueda guardar como `index.html` y abrir en el navegador."

Cuando explicas estos datos, la IA puede acercarse mucho mas a tu necesidad real, en vez de darte algo que parece impresionante pero no te sirve.

### 6.2 Usa el ritmo correcto: primero que funcione, luego hacerlo mas complejo

Para principiantes, una trampa comun es querer empezar con algo "muy completo" y con "muchas funciones".  
Por ejemplo:

> "Ayudame a crear un sitio como Taobao."  
> "Ayudame a crear un sistema con registro, inicio de sesion y pedidos."

El resultado suele ser una gran cantidad de codigo. Lo copias y no abre, o aparecen errores por todas partes; no sabes donde esta el problema y acabas abandonando.

Una forma mas adecuada es **controlar el ritmo** y hacer que la IA avance contigo paso a paso, en lugar de pedirle todo de una vez. Puedes pedirlo en este orden:

1. **Paso 1: pide primero un ejemplo minimo**  
   Comprueba una sola cosa: si puedes ver algo en el navegador.  
   Por ejemplo:

   > "Primero dame el ejemplo mas simple: que en el navegador solo se vea una linea que diga 'Esta es mi pagina principal'.  
   > Despues dime paso a paso como debe llamarse el archivo, como guardarlo y como abrirlo."

2. **Paso 2: sobre esa base, completa el contenido poco a poco**  
   Cuando confirmes que de verdad puedes ver esa linea, di:

   > "Sobre la version anterior, agrega una seccion de 'experiencia laboral' y vuelve a enviarme el codigo completo. No envies solo la parte modificada."

3. **Paso 3: cuando la estructura ya este bien, piensa en el aspecto visual**  
   Por ejemplo:
   > "La pagina ya muestra el contenido correctamente. Ahora ayudame a mejorar un poco el estilo: centra el conjunto, haz el titulo mas grande y usa una fuente comoda. Dame el codigo completo actualizado."

Cada vez que agregues un paso, ejecutalo primero y confirma que cambio de verdad antes de pedir lo siguiente. Asi, si algo falla, puedes volver rapidamente a la ultima version que funcionaba, sin tirar todo el trabajo.

### 6.3 Usa capturas y copias: si no sabes explicarlo, muestra lo que ves

Para muchos principiantes, la dificultad no es "no saber modificar codigo", sino **no saber describir el problema**.  
Por ejemplo:

- El navegador muestra muchos errores en ingles y no los entiendes.
- El diseno de la pagina no se parece a lo que querias, pero no sabes que palabras usar.

En estos casos, no hace falta forzar terminos profesionales. La forma mas simple es **entregar a la IA exactamente lo que estas viendo**.

Puedes hacerlo asi:

1. **Copia el texto del error**  
   Cuando veas un mensaje rojo de error, copialo entero y di:

   > "Este es el mensaje de error completo que aparece al ejecutar. No entiendo el ingles; primero explicamelo con palabras normales.  
   > Despues dime cual es el cambio mas simple que debo hacer ahora."

2. **Muestra una captura a la IA**  
   Si sientes que "esta pagina se ve mal", pero no sabes describirlo:
   - haz una captura de la pagina actual;
   - copia tambien todo el codigo que estas usando;
   - y explica:
     > "Asi se ve la pagina ahora, y este es mi codigo completo.  
     > Yo queria que fuera un diseno de tres columnas, pero ahora aparece como una sola columna. Ayudame a encontrar la causa y dame el codigo completo corregido."

   ::: tip 💡 Nota sobre la funcion de capturas

   Ten en cuenta que **no todos los modelos de IA pueden "ver imagenes"**. Aqui hay dos conceptos distintos:

   - **Modelo grande solo de texto (LLM)**: solo procesa entrada de texto y no puede reconocer contenido de imagenes. Si le envias una captura, puede rechazarla o no entender correctamente la informacion de la imagen.

   - **Modelo multimodal**: puede procesar texto, imagenes y otros tipos de entrada al mismo tiempo; puede "entender" la captura y dar sugerencias segun lo que muestra.

   **Referencia de capacidades de modelos comunes** (tomando como ejemplo los modelos disponibles en Trae):

   | Modelo | Soporta entrada de imagen |
   |--------|---------------------------|
   | Serie Doubao-Seed | ✅ Si |
   | GLM-4.7 / 4.6 | ❌ No |
   | MiniMax-M2.7 / M2.5 | ❌ No |
   | DeepSeek-V3.1 | ❌ No |
   | Kimi-K2.5 | ✅ Si |
   | Kimi-K2-0905 | ❌ No |
   | Qwen-3-Coder | ❌ No |
   | Serie Gemini | ✅ Si |
   | Serie GPT | ✅ Si |

   **Sugerencia de uso**: si quieres que la IA revise un problema de interfaz mediante una captura, confirma primero que el modelo soporta entrada de imagen. Si no la soporta, describe el problema con texto o copia y pega el mensaje de error.

   :::

3. **Cuando veas una pagina que te gusta y quieras algo parecido**  
   No necesitas decir como se llama ese tipo de layout. Hazlo directo:
   - captura la pagina o copia sus titulos y parrafos principales;
   - luego di:
     > "Quiero hacer una pagina con una estructura parecida a esta, no tiene que ser identica.  
     > Ayudame a crear una base similar con codigo sencillo, y luego yo cambiare los textos."

En resumen: tu tarea es llevarle a la IA lo que ves y decirle con palabras simples en que quieres convertirlo; lo demas, traducirlo a codigo, explicar terminos y localizar problemas, se lo puedes encargar a la IA.

### 6.4 Cuando el codigo generado por la IA no funciona: un metodo general

En la practica vas a encontrarte con esta situacion:  
la IA te da codigo con mucha seguridad, tu lo copias con cuidado, pero el navegador queda en blanco o el resultado no se parece a lo que prometia.  
Eso no significa que "no puedas aprender", ni que la IA este completamente equivocada. Normalmente falta algunas rondas de confirmacion entre ambos.

Cuando el codigo "no funciona", puedes hablar con la IA siguiendo este flujo fijo:

1. **Primero explica que hiciste y que ves ahora**  
   Evita decir solo "no abre" o "no sirve". Puedes describirlo asi:

   > Despues de abrirlo, la pagina esta completamente en blanco y no muestra el texto de bienvenida que mencionaste.  
   > Abri la pagina xxxx y no aparece la parte que acababa de pedir; asi no me sirve.

2. **Envia a la IA tu codigo completo actual**  
   Muchas veces el problema es que copiaste una linea de menos, o mezclaste la version anterior con la nueva.  
   Puedes decir:

   > "Abajo esta todo el codigo que tengo ahora en este archivo.  
   > Comparalo y dime si falta algo, si hay algo escrito mal o si el orden no es correcto.  
   > Dame directamente una version completa corregida, no solo un fragmento."

3. **Si hay un mensaje de error, incluyelo tambien**  
   Por ejemplo, una alerta en la esquina del navegador o texto rojo en la parte inferior. Puedes:
   - copiar el texto del error;
   - o tomar una captura;
   - y decir:
     > "Este es el error que veo. No lo entiendo. Explicame primero de forma simple que problema parece ser y luego dime que lineas debo cambiar ahora."

4. **Pide que explique en "modo principiante" paso a paso**  
   Puedes decir claramente tu situacion para que no omita pasos intermedios:

   > "No se programar. Dime paso a paso:  
   > en el paso 1, que linea debo cambiar;  
   > en el paso 2, como debo guardar;  
   > en el paso 3, como debo volver a abrir o refrescar la pagina.  
   > Escribe cada paso con frases completas."

5. **Al final, pide una comparacion de lo que deberias ver**  
   Por ejemplo:
   > Primero dime que deberia ver en la pagina si abro el codigo corregido y todo funciona normalmente.

Si sigues este flujo al interactuar con la IA, la mayoria de los casos de "el codigo no funciona" se pueden resolver en unas cuantas rondas.  
Al mismo tiempo, iras reconociendo patrones comunes de error y la proxima vez podras resolver situaciones parecidas con mas rapidez.

## 7. Resumen y siguiente paso

En este capitulo hiciste una mejora importante: pasaste de "jugar en una pagina web a un Snake generado por IA" a "crear en local un minijuego con un AI IDE". Ya entiendes, en terminos generales, tres cosas: por que programar depende de un IDE como VS Code; como, al sumar IA (Trae, Cursor, etc.), el IDE deja de ser solo una caja de herramientas y gana algo parecido a un "ingeniero en practicas" que entiende lenguaje natural, crea archivos, prepara el entorno y modifica codigo; y para que sirve cada zona de la interfaz del IDE (archivos a la izquierda, terminal abajo, editor en el centro, panel de IA a la derecha).

Mas importante aun, ya recorriste un flujo completo: crear una carpeta vacia localmente -> abrirla con el AI IDE -> describir la necesidad en el chat lateral -> pedir a la IA que genere el proyecto e inicie el servidor de desarrollo -> cuando aparezca un problema, entregar "fenomeno + codigo completo + captura del error" y pedir que lo corrija paso a paso en modo principiante. En ese proceso tambien practicaste como escribir prompts mas eficaces: aclarar objetivo, estructura del contenido y nivel propio, controlar el ritmo, y avanzar desde "primero que funcione" hasta "luego que se vea mejor y sea mas divertido".

En el proximo capitulo cambiaremos el foco de "saber usar herramientas" a "hacer un prototipo que alguien realmente quiera usar": partir de la perspectiva del usuario, disenar reglas, interacciones y feedback, y despues dejar que la IA convierta esas ideas en un primer producto.

## 8. 📚 Tarea: crear un juego mas complejo con un AI IDE local

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Reto: crea tu propio juego</div>
  </template>

  <p>
    Ya hiciste un Snake con un AI IDE local. Ahora prueba un minijuego un poco mas complejo y recorre el flujo completo:
    describir la necesidad -> generar el proyecto -> ejecutarlo en local -> depurar e iterar.
  </p>

  <ol>
    <li>
      <strong>Elige un juego mas complejo que Snake</strong>
      <ul>
        <li>Puede ser Tetris, Whac-A-Mole, Buscaminas, 2048, un shooter de aviones u otro similar</li>
        <li>Tambien puede ser un juego original sencillo inventado por ti</li>
      </ul>
    </li>
    <li>
      <strong>Debes completar todo el proceso con un AI IDE local</strong>
      <ul>
        <li>Crea una carpeta vacia y abrela con el AI IDE</li>
        <li>Describe claramente los requisitos del juego en el chat lateral</li>
        <li>Deja que la IA cree archivos, prepare la estructura del proyecto e implemente la logica principal</li>
        <li>Inicia el servidor de desarrollo local y confirma que el juego funciona correctamente</li>
      </ul>
    </li>
    <li>
      <strong>Debe tener jugabilidad basica y feedback</strong>
      <ul>
        <li>Incluye al menos tres estados: inicio, partida en curso y final</li>
        <li>El jugador debe tener una forma clara de controlar el juego, con teclado o raton</li>
        <li>La pantalla debe mostrar puntuacion o progreso de forma clara</li>
      </ul>
    </li>
    <li>
      <strong>Realiza al menos 2 rondas de iteracion</strong>
      <ul>
        <li>En la primera ronda, pide a la IA una version jugable</li>
        <li>Desde la segunda ronda, plantea mejoras concretas: estilo, dificultad, interaccion, etc.</li>
      </ul>
    </li>
  </ol>
</el-card>

<RelatedArticlesSection
  title="Seguir aprendiendo"
  description="Te recomendamos entrar primero en la practica de prototipos y luego incorporar capacidades de IA paso a paso."
  :items="relatedArticles"
/>

# Apendice

<el-card id="appendix-nav" shadow="hover" style="margin-top: 40px; margin-bottom: 24px; border-left: 5px solid #E6A23C;">
  <div style="font-weight: bold; margin-bottom: 8px;">Navegacion del apendice</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Esta es una referencia para consultar cuando la necesites: vuelve aqui si no entiendes un termino o no encuentras una entrada en la interfaz.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <a href="#appendix-1-map" style="text-decoration: none; color: inherit;"><b>Apendice 1: glosario rapido de terminos informaticos comunes</b></a><br/>
      <span style="font-size: 12px; color: #909399">Cuando veas un termino informatico que no entiendes, consultalo aqui. Conviene leerlo una vez completo.</span>
    </el-col>
    <el-col :span="12">
      <a href="/es-es/appendix/2-development-tools/ide-basics" style="text-decoration: none; color: inherit;"><b>Apendice 2: explicacion de la barra de menus de Visual Studio Code</b></a><br/>
      <span style="font-size: 12px; color: #909399">Si no sabes para que sirve una parte del AI IDE, usa este contenido para preguntar a la IA o consultalo directamente.</span>
    </el-col>
  </el-row>
  <div style="margin-top: 12px; font-size: 12px; color: #909399;">
    Consejo: usa Ctrl/⌘+F para buscar palabras clave. Si aparece un termino nuevo, copia el error y pide a la IA que lo explique en modo principiante.
  </div>
</el-card>

# Apendice 1: glosario rapido de terminos informaticos comunes

<el-card id="appendix-1-map" shadow="hover" style="margin-top: 40px; margin-bottom: 20px; border-left: 5px solid #409EFF;">
  <div style="font-weight: bold; margin-bottom: 10px;">🗺️ Mapa de terminos: aqui encontraras...</div>
  <el-row :gutter="20">
    <el-col :span="6">
      <a href="#term-tool-ui" style="text-decoration: none; color: inherit;">🖥️ <b>Interfaz de herramientas</b></a><br/>
      <span style="font-size: 12px; color: #909399">IDE / terminal / panel</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-network" style="text-decoration: none; color: inherit;">🌐 <b>Servicios de red</b></a><br/>
      <span style="font-size: 12px; color: #909399">URL / puerto / local</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-frontend-backend" style="text-decoration: none; color: inherit;">⚙️ <b>Frontend y backend</b></a><br/>
      <span style="font-size: 12px; color: #909399">API / JSON / interfaz</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-code-basic" style="text-decoration: none; color: inherit;">📝 <b>Fundamentos de codigo</b></a><br/>
      <span style="font-size: 12px; color: #909399">variable / funcion / componente</span>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="6">
      <a href="#term-debug" style="text-decoration: none; color: inherit;">🐞 <b>Depuracion y errores</b></a><br/>
      <span style="font-size: 12px; color: #909399">bug / breakpoint / log</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-project" style="text-decoration: none; color: inherit;">📂 <b>Gestion de proyectos</b></a><br/>
      <span style="font-size: 12px; color: #909399">Git / repositorio / commit</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-ai-tool" style="text-decoration: none; color: inherit;">🤖 <b>Herramientas de IA</b></a><br/>
      <span style="font-size: 12px; color: #909399">Agent / modelo / Key</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-browser" style="text-decoration: none; color: inherit;">🛠️ <b>Navegador</b></a><br/>
      <span style="font-size: 12px; color: #909399">DevTools / consola</span>
    </el-col>
  </el-row>
</el-card>

No necesitas memorizar esta parte. Lo mas importante es formar primero una impresion general.

## <span id="term-tool-ui">[1. Terminos relacionados con la interfaz de herramientas](#appendix-1-map)</span>

### 1. IDE, editor y terminal

**IDE (entorno de desarrollo integrado)**  
Puedes imaginar un IDE como el "banco de trabajo" de un programador:

- una mesa para escribir (editor),
- enchufes y botones (ejecutar, depurar),
- cajones con herramientas pequenas (busqueda, control de versiones).  
  VS Code, Trae y Cursor son IDE o herramientas construidas sobre un IDE.

**Editor de codigo (Editor)**  
Se parece mas a un "bloc de notas avanzado" y se encarga de:

- permitirte escribir codigo;
- distinguir contenidos con colores (resaltado de sintaxis);
- ofrecer autocompletado.  
  La zona del IDE donde escribes codigo es el editor de codigo.

**Terminal / linea de comandos (Terminal / command line)**  
Es una ventana de fondo negro y texto claro donde **escribes comandos** para que la computadora trabaje:

- por ejemplo, `npm run dev` significa "inicia el servidor de desarrollo";
- `python main.py` significa "ejecuta este archivo Python".  
  Puedes imaginarlo asi: envias mensajes de texto con instrucciones a la computadora, y ella responde con texto sobre el resultado.

### 2. Zonas comunes de un IDE

**Barra de actividad (Activity Bar)**  
Es la fila vertical de iconos a la izquierda, como pestanas de funciones:

- icono de archivos -> muestra la lista de archivos;
- icono de lupa -> cambia a busqueda;
- icono de Git -> muestra control de versiones.

**Barra lateral (Side Bar)**  
Es el area grande a la derecha de la barra de actividad. Muestra el contenido del modo actual:

- modo archivos: muestra archivos y carpetas del proyecto;
- modo busqueda: muestra resultados de busqueda;
- modo control de codigo fuente: muestra que archivos cambiaron.

**Area de editor (Editor)**  
La zona central mas grande es donde ves y modificas el contenido de los archivos abiertos.  
Las pestanas superiores muestran que archivos estan abiertos.

**Panel inferior (Panel)**  
Normalmente esta abajo y contiene varias vistas comunes:

- Terminal: escribir comandos para ejecutar el proyecto;
- Problems: listar archivos y lineas con errores;
- Output: mostrar informacion impresa por herramientas;
- Debug Console: salida durante la depuracion.

**Barra de estado (Status Bar)**  
Es la barra delgada en la parte inferior:

- muestra el lenguaje del archivo actual (JS, HTML, Python, etc.);
- muestra si la indentacion usa 2 o 4 espacios;
- muestra si hay errores y cual es la rama Git actual.  
  Puedes verla como una pequena ficha de salud del entorno de edicion.

## <span id="term-network">[2. Terminos sobre paginas web, red y servicios](#appendix-1-map)</span>

### 1. URL, http, puerto y servicio local

**URL (direccion web)**  
Es la cadena que aparece en la barra de direcciones del navegador, por ejemplo:

- `https://www.trae.cn/`
- `http://localhost:3000/`  
  Es como la direccion completa de una habitacion dentro del mundo de internet.

**HTTP / HTTPS**  
Son los textos `http://` o `https://` que ves al inicio de una URL:

- HTTP: metodo de transferencia normal;
- HTTPS: agrega una capa de cifrado y es mas seguro.  
  Puedes recordarlo asi: las direcciones web suelen empezar con `http` o `https`.

**Puerto (Port)**  
Imagina una computadora como un edificio. Un puerto es **el numero de una puerta**:

- `:3000` significa puerta 3000;
- en la misma computadora pueden ejecutarse varios servicios, cada uno usando un puerto.  
  `http://localhost:3000` significa "visitar el servicio que corre en la puerta 3000 de mi propia computadora".

**Local / localhost**  
Se refiere a tu propia computadora.

- `localhost` puede entenderse como "esta maquina misma".  
  Cuando visitas `http://localhost:3000`, estas hablando con un programa que se ejecuta en tu computadora, no con un servidor de otra persona en internet.

**Servicio (Service / Server)**  
Un servicio es un programa que **sigue ejecutandose en segundo plano y espera instrucciones**:

- servicio web: cuando el navegador visita una direccion, devuelve contenido web;
- servicio de juego: gestiona partidas, guardados, rankings, etc.  
  Ejecutar `npm run dev` en la terminal es, en esencia, abrir un servicio web local.

## <span id="term-frontend-backend">[3. Terminos sobre frontend, backend y datos](#appendix-1-map)</span>

### 1. Frontend y backend

**Frontend**  
La parte que el usuario **puede ver y tocar**:

- botones, texto, imagenes y animaciones de una pagina;
- paginas escritas con React o Vue.  
  Se encarga de mostrar la interfaz y responder a acciones del usuario, como clics, entradas de texto o arrastres.

**Backend**  
La parte que el usuario **no ve** y que se ejecuta en el servidor:

- guardar y leer datos (usuarios, pedidos, puntuaciones, etc.);
- ejecutar reglas de negocio (validar inicio de sesion, permisos, etc.).  
  Puedes comparar el frontend con la tienda y el vendedor, y el backend con el almacen y el sistema de cuentas.

### 2. API, request, response y JSON

**API / interfaz**  
Un conjunto de reglas acordadas entre frontend y backend para "hacer preguntas y devolver respuestas".

- El frontend dice: "te preguntare usando esta direccion y este formato";
- el backend dice: "te devolvere el resultado con este formato".

**Peticion (Request)**  
Una "pregunta" que el frontend envia al backend:

- a donde va (URL);
- con que metodo (GET, POST, etc.);
- que parametros lleva (por ejemplo, ID de usuario).

**Respuesta (Response)**  
La "contestacion" que el backend devuelve al frontend:

- codigo de estado (200 exito, 404 no encontrado, 500 error del servidor);
- datos reales, normalmente en JSON.

**JSON**  
Un formato para representar datos con una escritura **muy parecida a codigo JavaScript**, por ejemplo:

```json
{
  "name": "Alice",
  "score": 120
}
```

Puedes entenderlo como un bloc de notas de pares clave-valor para maquinas. Frontend y backend lo usan con frecuencia para intercambiar datos.

## <span id="term-code-basic">[4. Terminos sobre escribir codigo](#appendix-1-map)</span>

### 1. Variable, identificador y estado

**Variable**  
Una "etiqueta pegada a un dato".

- Por ejemplo, puedes guardar la puntuacion con el nombre `score`;
- despues, usando `score`, puedes leer o modificar ese dato:

```js
let score = 0
score = score + 10
```

**Identificador (Identifier)**  
El nombre general de las cosas que nombras en el codigo:

- nombre de variable: `score`
- nombre de funcion: `moveSnake`
- nombre de componente: `SnakeGame`  
  Es como llamar a carpetas "fotos", "trabajo" o "facturas" para distinguir cosas distintas.

**Estado (State)**  
El registro de las condiciones clave actuales del programa:

- si el juego ya termino;
- en que celda esta la serpiente;
- cual es la puntuacion actual.  
  En React se suele entender asi: **cuando cambia el estado, la interfaz debe actualizarse**.

### 2. Funcion, componente y modulo

**Funcion (Function)**  
Empaqueta una accion que puede repetirse y le da un nombre:

```js
function sayHello(name) {
  console.log('Hello, ' + name)
}
```

Despues, escribir `sayHello('Bob')` equivale a ejecutar otra vez esas lineas internas.

**Componente (Component)**  
En frontend, una pieza reutilizable que combina una parte pequena de interfaz y una parte pequena de logica:

- un boton puede ser un componente;
- una navegacion superior puede ser un componente;
- toda el area del juego tambien puede ser un componente.  
  Los componentes se pueden ensamblar como piezas de construccion.

**Modulo (Module)**  
Un archivo formado por un conjunto de codigo relacionado:

- `snakeLogic.ts` guarda codigo relacionado con como se mueve la serpiente;
- `score.ts` guarda codigo para calcular la puntuacion.  
  Los modulos pueden importarse y exportarse entre si, como herramientas guardadas en cajones distintos.

### 3. Sintaxis, lenguaje de programacion y framework

**Sintaxis (Syntax)**  
Las reglas gramaticales y de puntuacion de un lenguaje de programacion:

- si los strings necesitan comillas;
- si cada instruccion debe terminar con punto y coma;
- si los bloques de codigo se envuelven con `{}`.  
  Si escribes mal la sintaxis, el compilador o interprete reportara directamente un error de sintaxis.

**Lenguaje de programacion (Programming Language)**  
Un conjunto completo de reglas y vocabulario para comunicarse con la computadora, por ejemplo:

- JavaScript、Python、Java、C++、Go……  
  Cada lenguaje sirve mejor para ciertas tareas y tiene su propia forma de escribir y su propio ecosistema de herramientas.

**Framework**  
Un conjunto grande de codigo y patrones donde otra persona ya preparo la estructura base:

- frontend: React, Vue (ayudan con actualizacion de interfaz, gestion de estado, etc.);
- backend: Django, Spring Boot, etc.  
  Es como rellenar contenido sobre una estructura ya hecha, mucho mas facil que construir todo desde cero.

## <span id="term-debug">[5. Terminos sobre depuracion y busqueda de errores](#appendix-1-map)</span>

### 1. Bug, error, log / console.log

**Bug**  
Cuando el programa se comporta de una forma distinta a la esperada, eso es un bug:

- deberia aparecer un boton, pero no aparece;
- deberia sumar 10 puntos, pero suma demasiado;
- la pagina queda en blanco al abrirla.

**Mensaje de error (Error Message)**  
El texto en ingles que aparece en pantalla o en la terminal cuando el programa falla.  
Aunque se vea intimidante, normalmente indica:

- mas o menos donde esta el problema;
- que archivo y que linea cercana debes revisar.  
  Puedes copiarlo directamente y pedir a la IA que lo traduzca y analice.

**Log**  
Lo que el programa "dice" durante su ejecucion.  
Lo mas comun en frontend es:

```js
console.log('Puntuacion actual', score)
```

Puedes entenderlo asi: **en pasos clave, el programa informa valores para que confirmes si avanza como esperabas**.

> **Que es console.log?**
>
> - `console` puede entenderse como una pequena pizarra de depuracion;
> - `.log` significa escribir una linea en esa pizarra;
> - si abres DevTools con F12 y entras en el panel Console, veras esas salidas.

### 2. Depuracion, breakpoint, ejecucion paso a paso y snapshot

**Depuracion (Debug)**  
Cuando el programa tiene un problema, no empiezas cambiando codigo al azar. En cambio:

- haces que el programa se detenga en una linea (breakpoint);
- miras el valor actual de cada variable;
- avanzas paso a paso y observas desde donde empieza a ir mal.

**Breakpoint**  
Puedes imaginar un breakpoint como poner un boton de pausa en una linea:

- normalmente el programa corre hacia abajo;
- cuando llega a la linea con breakpoint, se detiene temporalmente para que lo revises.

**Ejecucion paso a paso (Step)**  
Despues de detenerte en un breakpoint, puedes elegir:

- ejecutar una linea cada vez (step over);
- entrar dentro de una funcion para verla con detalle (step into).  
  Es como ver una secuencia descompuesta paso a paso, no en avance rapido.

**Snapshot - explicacion simple**  
Aqui puedes entender "snapshot" como:

> **Tomar una foto del estado actual en un momento concreto para compararlo despues.**  
> En herramientas reales, "snapshot" puede referirse a:

- el estado completo del proyecto en el momento de un commit;
- el estado general de memoria o variables en un momento de depuracion.  
  Por ahora basta con esta imagen mental: **snapshot = registro de un estado en cierto momento**.

## <span id="term-project">[6. Terminos sobre gestion de proyectos](#appendix-1-map)</span>

### 1. Proyecto, workspace y carpeta

**Proyecto (Project)**  
El conjunto de elementos colocados en una misma carpeta para crear una aplicacion:

- archivos de codigo fuente
- archivos de configuracion
- recursos, como imagenes o audio

**Workspace**  
Concepto que VS Code / Trae usa para describir "que conjunto de cosas esta abierto ahora":

- abrir una carpeta -> un workspace simple;
- a veces se combinan varias carpetas en un workspace multiproyecto.

### 2. Git, repositorio y commit

**Git (herramienta de control de versiones)**  
Puedes entenderlo como una "maquina del tiempo" del proyecto:

- cada vez que terminas un conjunto de cambios, puedes guardar una foto de esa version;
- despues, si lo necesitas, puedes volver a un estado anterior.

**Repositorio (Repository / Repo)**  
Despues de activar Git, la carpeta de proyecto que contiene historial de versiones se llama repositorio.

**Commit**  
Cada vez que sientas que "estos cambios ya son un avance concreto", puedes:

- escribir una descripcion (por ejemplo: `Add score panel`);
- empaquetar todos los cambios actuales como una version;
- Git guardara el estado de ese momento.  
  Esa accion se llama hacer un commit.

## <span id="term-ai-tool">[7. Terminos sobre herramientas de desarrollo con IA](#appendix-1-map)</span>

### 1. AI IDE, Agent y modo SOLO

**AI IDE**  
Sobre un IDE normal, agrega una capa de IA que entiende lenguaje natural y puede actuar:

- si dices "haz un Snake", puede preparar el proyecto y escribir codigo;
- si le das una captura de error, puede explicarla y luego intentar corregirla;
- puede modificar varios archivos juntos, no solo completar una linea.

**Agent**  
Puedes imaginar un Agent como un **pequeno ingeniero de IA siempre disponible**:

- lee la estructura del proyecto;
- divide tareas (instalar dependencias, generar codigo, ejecutar el proyecto);
- cuando algo falla, ajusta el plan segun el error.

**Modo SOLO (tomando Trae como ejemplo)**  
Significa:

> tu solo explicas el destino final;  
> la IA planifica la ruta;  
> ejecuta pasos localmente;  
> y solo pregunta si debe continuar en puntos clave.

### 2. Modelo y clave (API Key)

**Modelo (Model, aqui: modelo grande de lenguaje)**  
Puedes entenderlo como "el cerebro de IA que hay detras":

- por ejemplo GPT, Claude, Kimi, GLM, etc.;
- distintos modelos tienen niveles diferentes en comprension de idiomas, escritura de codigo y razonamiento;
- en un AI IDE normalmente puedes cambiar de modelo desde un menu desplegable.

**Clave / API Key**  
Puedes entender una API Key como **una contrasena avanzada y un identificador muy largos**.  
Su funcion es:

> decirle al servidor de otra empresa: "soy este usuario; permite que use tu servicio de IA y registra mi consumo".

Puntos importantes:

- suele ser una cadena larga de letras y numeros aleatorios;
- no debe publicarse en repositorios, capturas o chats, porque otros podrian usar tu cuenta;
- escribir la API Key en una herramienta equivale a insertar una llave en una cerradura: despues la herramienta puede llamar al servicio de IA correspondiente.

## <span id="term-browser">[8. Terminos sobre navegador y herramientas de desarrollador](#appendix-1-map)</span>

**Chrome**  
Uno de los navegadores mas usados para desarrollo frontend:

- abre paginas rapidamente;
- trae herramientas de desarrollador potentes para revisar problemas.

**Refrescar (Refresh / Reload)**  
Volver a cargar la pagina actual:

- despues de modificar codigo frontend, si no hay recarga automatica, debes refrescar manualmente para ver el efecto.

**Herramientas de desarrollador (DevTools)**  
Un conjunto de paneles del navegador pensados para desarrolladores:

- ver la estructura de la pagina (Elements);
- ver estilos (Styles);
- revisar errores y logs (Console);
- revisar peticiones de red (Network).  
  En Chrome normalmente se abren con `F12` o `Ctrl+Shift+I`.

**Console**  
Una pestana de DevTools dedicada a mostrar:

- la salida de `console.log(...)` que escribes;
- errores que ocurren durante la ejecucion, normalmente en rojo.  
  Puedes verla como el chat del programa:
- si el programa tiene algo que decir, lo escribe aqui;
- durante la depuracion, esta suele ser una de las zonas que mas miras.

Si mas adelante encuentras terminos nuevos durante el aprendizaje, tambien puedes pedir a la IA que complete tu glosario con este estilo:

- primero una frase sobre para que sirve;
- luego una frase sobre como imaginarlo;
- al final, un ejemplo muy simple.  
  Asi tu glosario personal sera cada vez mas util y podras comunicarte mejor con la computadora.
---
title: 'Principiante 2: Herramientas de programacion con IA'
description: 'Pasar de programar con IA en la web a un flujo local: entender IDE vs AI IDE, construir un juego de serpiente con Trae y mejorar la colaboracion con IA.'
---
