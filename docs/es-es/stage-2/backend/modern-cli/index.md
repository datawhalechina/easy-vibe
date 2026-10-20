# Herramientas de programacion CLI AI

En este tutorial, presentaremos los Agentes de programacion AI que se ejecutan directamente en la linea de comandos. A diferencia de los Agentes que ya conoces en Trae y Cursor, las herramientas CLI AI solo se pueden utilizar en la terminal. Comparados con los Agentes integrados en AI IDE, suelen tener ventanas de contexto mas amplias, velocidad de llamada a herramientas mas rapida y son compatibles con una mayor variedad de modelos de lenguaje. En las practicas mas recientes de AI Vibe Coding, a menudo preferimos utilizar herramientas CLI AI en lugar de los Agentes de codificacion integrados en el IDE.

## Empecemos por CLI

Recuerdas que ya te presentamos CLI anteriormente? CLI se refiere a la operacion de aplicaciones de software mediante comandos de texto puro a traves de una terminal o simbolo del sistema, en lugar de depender de una interfaz grafica (GUI, que puedes entender simplemente como la interfaz de tu ordenador o movil con botones que puedes pulsar, sin necesidad de introducir comandos).

> En Windows, las terminales mas comunes son el "Simbolo del sistema (cmd)" y "PowerShell". Puedes escribir "cmd" o "powershell" en el cuadro de ejecucion/busqueda de tu ordenador para iniciar estos programas de linea de comandos.

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI es ideal por naturaleza para operaciones con comandos de texto. Entre un pequeno grupo de geeks (entusiastas de la programacion que buscan la excelencia), CLI incluso es mas popular que GUI: quieren que todas las operaciones se completen mediante el teclado, y sienten que usar el raton en realidad ralentiza su eficiencia de codificacion.

En la industria, CLI suele ser la forma de interfaz mas comun, ya que GUI requiere que el sistema operativo dibuje interfaces adicionales y gestione ventanas, lo que exige mas recursos del ordenador; mientras que CLI solo necesita pasar los comandos recibidos al sistema para su ejecucion. Por lo tanto, al conectarse a grandes clusters de servidores, normalmente solo interactuamos a traves de CLI.

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

Para muchos companeros sin experiencia en CLI, puede parecer que las operaciones CLI son muy complejas, con demasiados comandos, e incluso preocuparse por "romper el ordenador por accidente". No te preocupes. Recuerdas que en tutoriales anteriores a menudo pediamos a Trae que nos ayudara con diversas operaciones basicas? Aqui puedes aplicar exactamente el mismo enfoque: podemos dejar que las herramientas CLI AI ejecuten todas las operaciones CLI por nosotros: que te ayuden a entrar en una carpeta especifica, buscar y procesar archivos, ejecutar o copiar proyectos de codigo abierto, etc. Todo el proceso se puede completar mediante una conversacion con la herramienta CLI AI.

## En que se diferencia de AI IDE

Podemos comparar las herramientas CLI AI con z.ai y Trae, que ya conoces. En cierto sentido, las herramientas CLI AI pueden verse como una especie de z.ai especial: igualmente solo necesitan un punto de entrada de conversacion simple, y ejecutaran automaticamente todas las operaciones necesarias por ti (solo que a veces necesitas abrir el navegador manualmente para ver el resultado final). Y si lo comparamos con un AI IDE, las herramientas CLI AI pueden considerarse como el modulo Agent del IDE, es decir, el area de conversacion en el panel lateral.

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

Sin embargo, dado que diferentes AI IDE implementan los Agentes de maneras distintas y las diferencias de capacidad son grandes, los resultados de la programacion AI suelen ser inestables. Por ello, las herramientas CLI AI suelen ser desarrolladas directamente por grandes empresas tecnologicas, como Anthropic (detras de Claude) u OpenAI (detras de ChatGPT).

Comparados con otros Agentes de programacion AI, utilizar directamente estos productos de grandes empresas suele ser la practica mas optima, especialmente Claude Code, que es una herramienta disenada originalmente para el equipo de desarrollo interno de Anthropic, pensada desde el principio para "satisfacer las necesidades reales de los ingenieros".

Para una comparacion mas visual, podemos observar brevemente las diferencias entre Claude Code y un Agent de AI IDE (usando Cursor como ejemplo):

| Caracteristica | Claude Code | Cursor | Mejor opcion |
| ----------------- | ------------- | --------------- | ----------- |
| Ejecucion automatica de tareas | ✅ Muy fuerte | ❌ Capacidad limitada | Claude Code |
| Integracion con IDE | ❌ Solo linea de comandos | ✅ VS Code nativo | Cursor |
| Autocompletado de codigo en tiempo real | ❌ No | ✅ Excelente experiencia | Cursor |
| Operaciones en multiples archivos | ✅ Muy fuerte | ⚠️ Bastante bien | Claude Code |
| Operaciones GitHub integradas | ✅ Push directo | ⚠️ Requiere operaciones manuales | Claude Code |
| Curva de aprendizaje | ⚠️ Media | ✅ Facil de empezar | Cursor |
| Longitud del contexto | ✅ Muy larga | ⚠️ Bastante bien | Claude Code |
| Asistencia de depuracion | ✅ Automatica | ⚠️ Mas manual | Claude Code |

Fuente de la tabla: <https://northflank.com/blog/claude-code-vs-cursor-comparison>

En resumen, las herramientas CLI AI suelen poder:

- Soportar conversaciones continuas mas largas (incluso pueden "trabajar todo el dia" por ti).
- Proporcionar ventanas de contexto mas amplias (ya no necesitaras decir frecuentemente "continua").
- Responder mas rapido (pueden conectarse a mas APIs de modelos personalizados).

En operaciones relacionadas con la codificacion, suelen ser mas inteligentes y estables que la mayoria de los Agentes integrados en IDE.

## Herramientas CLI AI comunes

Aunque actualmente existen muchas implementaciones de codigo abierto, en la practica solo recomendamos dos grandes categorias de herramientas CLI AI como "combinacion principal". Puedes elegir cualquiera segun tus habitos. Te recomendamos encarecidamente que pruebes ambas y luego elijas la que mejor se adapte a ti.

- Codex utiliza GPT-5 y es mas fuerte en capacidad general;
- Claude Code reenvia la API a traves de GLM 4.6, la experiencia general es cercana a Claude 4, pero mas economica.
- OpenCode permite cambiar y combinar modelos libremente, ofrece modelos gratuitos y puede controlar mejor los costes.

Sin embargo, cual funciona mejor en un proyecto real solo se puede determinar mediante pruebas personales. Dominar multiples herramientas de programacion AI siempre es beneficioso: una vez que tengas experiencia, podras cambiar flexiblemente entre Claude Code, Codex o Trae segun los diferentes escenarios. Si despues de varios intentos descubres que una herramienta tiene un rendimiento mediocre, puedes cambiar directamente a otra herramienta o modelo y seguir experimentando.

Ademas, dado que las versiones de los modelos se actualizan muy rapidamente, te recomendamos priorizar la solucion con mejor "relacion calidad-precio (resultado / coste)".

### Claude Code

Claude Code es una herramienta de programacion AI desarrollada por Anthropic basada en las capacidades del modelo de lenguaje Claude. Su escenario principal de interaccion es la terminal, y tambien soporta su uso como plugin de VS Code. Similar a los Agentes en AI IDE, puede comprender profundamente el repositorio de codigo del desarrollador y completar tareas de desarrollo completas mediante instrucciones de lenguaje natural, incluyendo edicion de codigo, correccion de bugs, ejecucion y reparacion de tests, gestion de flujos de trabajo Git (por ejemplo, resolver conflictos de merge, crear PRs), explicacion de codigo complejo, ejecucion de comandos de terminal, etc.

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Las ventajas de Claude Code se reflejan principalmente en: una ventana de contexto extremadamente larga (puede procesar archivos completos o incluso proyectos pequenos), la capacidad de aclarar proactivamente requisitos ambiguos, planificacion y asignacion automatica de tareas, y una profunda comprension y explicacion del contenido de todo el codebase. Comparado con los Agentes de IDE convencionales, es mas adecuado para un flujo de desarrollo de "vibe coding inmersivo".

En el uso practico, puedes pedirle mediante instrucciones de conversacion que te ayude a crear nuevos proyectos, ejecutar operaciones CLI (como organizar carpetas, renombrar archivos en lote, desplegar proyectos de codigo abierto, etc.), configurar entornos de desarrollo (como instalar y depurar entornos Python). Si un fragmento de codigo es dificil de entender o la estructura de un directorio no es clara, tambien puedes pedir directamente a Claude Code que genere documentacion de analisis estructurada, o que explique paso a paso contenido especifico.

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Si quieres aprender Claude Code de forma sistematica, puedes consultar el curso conjunto de Andrew Ng y Anthropic:
<https://www.bilibili.com/video/BV176t2zSEpr>

A continuacion, aprenderemos como usar Claude Code. Dado que el coste de usar directamente el Claude Code oficial suele ser muy alto (como se muestra en la imagen a continuacion), utilizaremos una API de otro modelo de lenguaje que sea compatible con el protocolo de Claude Code.

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

Debes aprender los siguientes metodos (es mejor que pruebes todos) y finalmente elegir el que mejor se adapte a ti como ruta principal de practica.

El primer metodo es utilizar directamente una API "compatible con la interfaz de Anthropic". Con la popularidad de Claude Code, cada vez mas proveedores de modelos de lenguaje han comenzado a soportar el estilo de llamada de Anthropic. Los proveedores comunes incluyen GLM, Kimi, DeepSeek y Siliconflow, entre otros, que ofrecen APIs compatibles. Hablaremos de la configuracion especifica mas adelante.

Ten en cuenta que Claude Code normalmente consume muchos tokens. Si te preocupa que las llamadas a la API generen costes excesivos, puedes considerar comprar el paquete mensual de GLM (unos 20 yuanes/mes) para controlar los costes. Si quieres experimentar primero el gasto real, tambien puedes recargar 10 yuanes para hacer una prueba a pequena escala.

Otro metodo es usar el proyecto "Claude Code Route". Es una herramienta de codigo abierto que no solo soporta todas las interfaces de llamada API comunes, sino que tambien te permite configurar con precision el modelo a utilizar para diferentes escenarios, y soporta la conexion con modelos de lenguaje desplegados localmente. Sin embargo, dado que la configuracion de esta solucion es relativamente compleja, te recomendamos que empieces con el primer metodo.

#### Usar GLM de Zhipu como backend (recomendado)

GLM (General Language Model) es una serie de modelos de lenguaje grandes desarrollados de forma independiente por Zhipu AI. GLM-4.6 es la ultima version de la serie GLM, y su punto fuerte es su excelente rendimiento en capacidades de codigo (comparable a Claude Sonnet 4 en benchmarks publicos y tareas reales, situandose en el primer nivel nacional).

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

Tambien ha ampliado la ventana de contexto a 200K, lo que permite manejar textos largos y volumenes grandes de codigo con mayor comodidad, al tiempo que refuerza las capacidades de razonamiento y llamada a herramientas, logrando un buen equilibrio entre rendimiento y coste.

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

Antes de conectarnos a GLM, necesitamos instalar Claude Code.

Si te parece complicado el proceso de instalacion por linea de comandos, o si aparece algun error, puedes pedir directamente al Agent de Trae que te ayude con la instalacion.

```python
# Instalar Claude Code
npm install -g @anthropic-ai/claude-code

# Entrar en tu proyecto
cd your-awesome-project

# Iniciar Claude Code
claude

# Pulsa Ctrl+C para salir de Claude
```

A continuacion, necesitamos modificar la direccion de solicitud API predeterminada de Claude Code para que soporte el servicio API de GLM. Puedes copiar directamente el contenido a continuacion y pedir a Trae que te ayude a crear las variables de entorno correspondientes; tambien puedes optar por escribirlas permanentemente en las variables de entorno del sistema (si hay problemas, tambien puedes pedir ayuda al Agent).

Primero, necesitas obtener la API Key de GLM y guardarla de la forma que te resulte mas comoda.

Version nacional: <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
Version internacional: <https://z.ai/manage-apikey/apikey-list>

Si usas la **version nacional de GLM**, utiliza la siguiente configuracion de variables:

```python
# Ejecuta los siguientes comandos en Cmd
# Nota: reemplaza `your_zhipu_api_key` con la API Key que acabas de obtener
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

Si usas la **version internacional de GLM**, utiliza la siguiente configuracion:

```python
# Ejecuta los siguientes comandos en Cmd
# Igualmente, reemplaza `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Puedes introducir un prompt similar al siguiente directamente en Trae:

⚠️ Si configuras las "variables de entorno permanentes" a traves de Trae, **debes reiniciar Trae** despues de completar la configuracion. De lo contrario, las variables de entorno en su terminal integrada no se actualizaran, lo que puede causar errores de inicio de sesion o de conexion de red.

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

Veras una salida similar a la siguiente:

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 Que son las variables de entorno?
>
> Las variables de entorno son esencialmente un conjunto de informacion de configuracion "clave-valor" almacenada en el sistema operativo, normalmente en formato "nombre de variable = valor especifico". Siempre que se configuren previamente en la terminal o en la configuracion del sistema, los programas pueden leer estas variables en cualquier momento para obtener la informacion correspondiente. Dado que las variables de entorno se pueden escribir directamente en la terminal sin necesidad de modificar el codigo en si, normalmente almacenamos las claves de acceso a los modelos de lenguaje grandes en variables de entorno para evitar fugas. Los programas solo necesitan leer las variables de entorno correspondientes para completar la llamada al modelo de lenguaje.
>
> En el sistema Windows, las variables de entorno, ademas de almacenar las claves de acceso a modelos de lenguaje, tambien se usan a menudo para guardar las "rutas de llamada" de las herramientas de linea de comandos.
>
> Sabemos que la terminal en si tambien es un programa. A veces queremos iniciar un programa externo en la terminal, por ejemplo, escribir `claude` en la terminal para iniciar Claude Code. La razon por la que podemos simplemente escribir `claude` para ejecutarlo es porque la terminal lee las variables de entorno del sistema, donde la variable PATH contiene el directorio del archivo ejecutable de Claude Code, por lo que la terminal puede encontrarlo y ejecutarlo (equivalente a pegar la ruta absoluta de ese programa en la terminal y pulsar Enter).
>
> Una variable de entorno tipica podria verse asi: `PATH=C:\Windows\system32;C:\Program Files\Python`. Asi podemos ejecutar estos programas del sistema en cualquier ruta, por ejemplo, escribir directamente `python` en la linea de comandos para iniciar el interprete de Python.
>
> Si quieres ver las variables de entorno actuales del sistema, puedes escribir "variables de entorno" en la busqueda de Windows, y en la ventana "Editar variables de entorno del sistema" que se abre podras ver todas las variables y sus valores. Algunas variables se usan para almacenar claves de modelos de lenguaje, mientras que otras se usan para agregar directorios de programas, lo que facilita su llamada desde cualquier ruta.

Ahora ya puedes usar el ultimo GLM para el desarrollo con Claude Code. Puedes intentar volver a ejecutar un proyecto anterior, o retomar aquellas tareas que Trae no completo bien, y comparar las diferencias en la experiencia.

🎉 "Empezar de nuevo" repetidamente no es una perdida de tiempo: cada vez que repites algo, tus habilidades se vuelven mas solidas.

Con el mismo enfoque que con GLM, tambien puedes conectar facilmente otras interfaces que soporten el formato compatible con Anthropic.

#### Usar Kimi K2 como backend (recomendado)

Kimi K2 es el nuevo modelo de lenguaje de Moonshot AI, con un rendimiento excelente en comprension y generacion de codigo. Kimi K2 soporta una ventana de contexto ultralarga (hasta 200K tokens), lo que permite manejar facilmente codebases grandes y proyectos complejos.

**Ventajas principales:**

- **Contexto ultralargo**: soporta una ventana de contexto de 200K, puede procesar el codigo de un proyecto entero de una sola vez
- **Fuerte capacidad de codigo**: rendimiento excelente en generacion, refactorizacion y depuracion de codigo
- **Buena comprension del espanol**: comprension mas precisa de los requisitos de programacion en espanol
- **Llamada a herramientas estable**: soporta llamadas a funciones y uso de herramientas de forma estable

**Obtener API Key:**

Visita <https://platform.moonshot.cn/console/account> para registrarte y obtener tu API Key.

**Metodo de configuracion:**

Documentacion de referencia: <https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Usar Minimax como backend (recomendado)

Minimax es el nuevo modelo de lenguaje de MiniMax, con un rendimiento excelente en tareas de programacion. El modelo Minimax es conocido por su destacada capacidad de razonamiento y calidad de generacion de codigo, especialmente adecuado para escenarios de programacion complejos.

**Ventajas principales:**

- **Fuerte capacidad de razonamiento**: rendimiento excelente en razonamiento logico complejo y diseno de arquitectura de codigo
- **Alta calidad de codigo**: el codigo generado tiene una estructura clara y buena legibilidad
- **Soporte multilingue**: soporta generacion y conversion de codigo en multiples lenguajes de programacion
- **Respuesta rapida**: la API responde rapidamente, adecuada para escenarios de llamadas de alta frecuencia

**Obtener API Key:**

Visita <https://platform.minimax.io/> para registrarte y obtener tu API Key.

**Metodo de configuracion:**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### Usar DeepSeek como backend (recomendado)

DeepSeek es un modelo de lenguaje de codigo abierto desarrollado por DeepSeek, muy popular entre los desarrolladores por su excelente capacidad de codigo y su alta relacion calidad-precio. DeepSeek Coder ha sido optimizado y entrenado especificamente para tareas de programacion.

**Ventajas principales:**

- **Capacidad de codigo destacada**: rendimiento excelente en generacion de codigo, comprension de codigo y correccion de bugs
- **Codigo abierto y personalizable**: el modelo es de codigo abierto, se puede ajustar segun las necesidades
- **Alta relacion calidad-precio**: el precio de la API es relativamente bajo, adecuado para uso de alta frecuencia
- **Buen soporte para espanol**: comprension precisa de escenarios de programacion en espanol

**Obtener API Key:**

Visita <https://platform.deepseek.com/usage> para registrarte y obtener tu API Key.

**Metodo de configuracion:**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### Usar Volcano Engine Coding Plan como backend (recomendado)

Volcano Engine (Volcano Engine) es la plataforma de servicios en la nube de ByteDance, que proporciona servicios de modelos AI de nivel empresarial. El Coding Plan de Volcano Engine esta optimizado especificamente para escenarios de programacion, proporcionando capacidades de generacion de codigo estables y eficientes.

**Ventajas principales:**

- **Estabilidad de nivel empresarial**: proporciona acuerdos de nivel de servicio (SLA), garantizando la estabilidad del servicio
- **Optimizado para codigo**: optimizado especificamente para tareas de programacion
- **Amplia seleccion de modelos**: soporta multiples modelos, incluyendo Doubao-pro, Doubao-lite, etc.
- **Acceso rapido en China**: despliegue de nodos nacionales, velocidad de acceso rapida

**Obtener API Key:**

Visita <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> para registrarte y obtener tu API Key.

**Metodo de configuracion:**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### Otras APIs compatibles con Anthropic

Siliconflow:

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # Puedes modificar el modelo segun tus necesidades
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # Por favor, reemplaza la API Key
```

Alibaba Cloud DashScope (Aliyuncs): <https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Usar Claude Code Route como backend (uso avanzado)

Arriba hemos explicado como reemplazar la interfaz de Anthropic de Claude Code con la API oficial de GLM. A continuacion, veamos como la herramienta Claude Code Router permite que Claude Code sea compatible con mas APIs de modelos.

[Claude Code Router](https://github.com/musistudio/claude-code-router) es una herramienta de enrutamiento inteligente disenada especificamente para Claude Code. Su funcion principal es ayudar a los usuarios a distribuir las solicitudes de AI a modelos de diferentes plataformas segun sus necesidades, con un alto grado de personalizacion. Soporta la conexion con decenas de plataformas, incluyendo OpenRouter, DeepSeek, Ollama, Gemini, etc., y tambien puede enrutar tareas a modelos especificos segun el escenario, como GLM-4.5, Kimi-K2, Qwen3-Coder, etc. Por ejemplo, puedes asignar automaticamente las tareas en segundo plano a Ollama local para ahorrar costes; asignar las tareas de texto largo / codigo largo a Gemini-2.5-Pro; y asignar las explicaciones de codigo a DeepSeek.

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

La herramienta tambien ofrece una comoda capacidad de gestion de configuracion UI/CLI, y adapta los formatos de API de diferentes plataformas a traves de "convertidores (converter)". Soporta integraciones automatizadas como GitHub Actions y extensiones personalizadas, resolviendo los problemas de que "un unico modelo no puede cubrir todos los escenarios" y que "cambiar frecuentemente de plataforma es molesto", ayudando a los usuarios a utilizar herramientas AI de forma mas flexible y con menores costes.

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

A continuacion explicamos brevemente como instalar Claude Code Router. A grandes rasgos, necesitas los siguientes pasos (tambien puedes pedir a Trae que los ejecute por ti) para preparar el entorno correspondiente:

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

Una vez completada la instalacion, necesitas confirmar que el comando `ccr` esta disponible localmente. Si ves una salida similar a la siguiente, la instalacion ha sido exitosa:

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

A continuacion, hay dos formas de inicializar y configurar los modelos:

- Usar la UI incorporada de CCR, abriendo la pagina de configuracion que proporciona en el navegador;
- Modificar directamente el archivo de configuracion predeterminado de CCR (la UI en esencia tambien modifica el archivo de configuracion, solo que proporciona una interfaz mas intuitiva).

Si eliges usar la UI de CCR, veras una interfaz similar a la siguiente:

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

Haz clic en el boton "Add Provider" y veras la siguiente interfaz. Necesitas:

1. Introducir el nombre del proveedor del modelo en Name;
2. Rellenar la direccion de la interfaz compatible con OpenAI de ese proveedor en API Full URL;
3. Introducir la API Key de la plataforma correspondiente en API Key;
4. Rellenar el nombre del modelo en el area de Models y hacer clic en "Add Model" para agregarlo;
5. Finalmente, hacer clic en "Save" para guardar la configuracion.

(Si te desplazas hacia abajo en la interfaz, veras muchas opciones avanzadas, pero por ahora puedes ignorarlas.)

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

A continuacion se muestran ejemplos de configuracion de DeepSeek y Kimi:

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

Despues de guardar la configuracion del modelo, todavia necesitas especificar el modelo predeterminado (Default) en el area de Router a la derecha. Haz clic en el menu desplegable correspondiente y configuralo como `kimi` (recomendado), luego haz clic en `Save and Restart` en la esquina superior derecha.

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

Despues, solo necesitas escribir `ccr code` en la terminal para iniciar el flujo de trabajo de codificacion de Claude Code a traves de Claude Code Router.

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Usos avanzados de Claude Code

Muchas personas, al empezar a usar Claude Code, lo tratan simplemente como una herramienta de conversacion normal. Pero en realidad, tiene muchas capacidades integradas que te permiten usarlo de manera mas eficiente y flexible. A continuacion se muestran algunos comandos y ejemplos de uso comunes:

Documentacion de referencia:

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| Comando | Funcion | Ejemplo |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude | Iniciar modo interactivo | `claude` |
| claude "query" | Ejecutar una tarea unica y mostrar el resultado | `claude "explain this project"` |
| claude -p "query" | Ejecutar una pregunta unica y salir automaticamente al finalizar | `claude -p "explain this function xxxx"` |
| claude -c | Continuar la ultima sesion | `claude -c` |
| claude -r | Restaurar la sesion anterior | `claude -r` |
| /resume | Cambiar a la sesion anterior en el chat actual | `claude -c`, `/resume` |
| /plugin | Gestionar plugins, instalar extensiones de commit y revision | `/plugin` |
| /init | Inicializar la descripcion del proyecto con CLAUDE.md | `/init` |
| /clear | Limpiar el contexto de la sesion actual, evitar sobrecarga de informacion | `/clear` |
| /compact | Comprimir el historial de la sesion, reducir el uso de tokens de contexto | `/compact` |
| /cost | Ver el consumo actual | `/cost` |
| /model | Cambiar el modelo utilizado (generalmente ignorable con APIs compatibles) | `/model` |
| /memory | Gestionar los archivos de memoria de CLAUDE.md | |
| /help | Mostrar la lista de comandos disponibles | `/help` |
| exit o Ctrl+C | Salir de Claude Code | `exit` o `Ctrl+C` |
| /agents | Funcion avanzada, se explicara mas adelante | |
| /mcp | Funcion avanzada, se explicara mas adelante | |

**CLAUDE.md**

Referencia: <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` es un archivo especial que Claude lee automaticamente y anade al contexto al iniciar una conversacion. Por lo tanto, es ideal para registrar:

- Comandos bash de uso comun
- Archivos principales y funciones de utilidad
- Convenciones de estilo de codigo
- Instrucciones de ejecucion de tests
- Normas de colaboracion del repositorio (por ejemplo, nomenclatura de ramas, si usar merge o rebase, etc.)
- Instrucciones de configuracion del entorno de desarrollo (por ejemplo, si se usa pyenv, que compilador se recomienda, etc.)
- Comportamientos o puntos a tener en cuenta en el proyecto
- Cualquier informacion que quieras que Claude "recuerde"

`CLAUDE.md` no tiene un formato obligatorio, solo debe ser conciso y facil de leer para humanos. Por ejemplo:

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Principios internos de Claude Code

Referencia: <https://github.com/shareAI-lab/analysis_claude_code>

Si tienes curiosidad sobre por que Claude Code funciona mejor que herramientas de programacion con Agent como Trae o Cursor en muchos escenarios, podemos echar un vistazo rapido a su mecanismo de trabajo interno.

La implementacion general de otras herramientas CLI AI es bastante similar.

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code descompone las tareas de programacion en un ciclo continuo de "percibir-pensar-actuar-verificar", e invoca diferentes herramientas para completar las tareas dentro de este ciclo. Imita el flujo de trabajo de un desarrollador humano: "escribir codigo -> ejecutar -> ver resultados -> mejorar". El sistema ejecuta pasos continuamente a traves de un bucle de tareas principal. En cada ronda del ciclo, Claude puede invocar diferentes herramientas, como leer y escribir archivos, ejecutar comandos, buscar codigo, etc., y luego decidir el siguiente paso basandose en los resultados reales devueltos por las herramientas.

Vale la pena destacar varias caracteristicas clave:

- **Procesamiento en streaming (Stream Processing)**: Claude puede pensar y emitir resultados al mismo tiempo, sin tener que esperar a que se escriba todo el codigo antes de ejecutarlo.
- **Compresion inteligente (Intelligent Compression)**: las conversaciones largas tienden a producir un contexto excesivo. Claude reduce la probabilidad de "olvido" comprimiendo el historial en informacion clave, y garantiza un funcionamiento eficiente distinguiendo entre memoria a corto y largo plazo.
- **Control de concurrencia (Concurrency Control)**: el diseno interno paralelo permite que multiples tareas se ejecuten simultaneamente sin interferir entre si.
- **Gestion de sub-Agentes (Sub-agent Management)**: en la practica, no se trata solo de un "rol" que maneja todo. Puedes gestionar multiples sub-Agentes que colaboran en el codigo, cada uno responsable de tareas diferentes, como uno dedicado a testing, otro a escribir documentacion, etc.

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Al igual que Claude Code, Codex es una herramienta de programacion colaborativa AI desarrollada por OpenAI. Puedes entenderla como la "version OpenAI de Claude Code". Su mayor ventaja es la adaptacion eficiente a GPT-5.

En la experiencia practica, GPT-5 actualmente tiene una velocidad de respuesta mas rapida y una tasa de errores mas baja (mayor probabilidad de completar correctamente tareas complejas de multiples rondas). Un inconveniente es que sus explicaciones suelen ser mas "academicas" y "tecnicas", a veces demasiado rigurosas y con mucha informacion, lo que puede ser un poco dificil de entender para los principiantes.

Puedes instalar Codex con el siguiente comando:

```
npm i -g @openai/codex
```

#### Usar la API oficial de OpenAI como backend

Si usas directamente la entrada oficial de Codex de OpenAI, la configuracion es muy simple: una vez que te has suscrito a OpenAI o has obtenido la cuota de API correspondiente, solo necesitas escribir `codex` en la linea de comandos para iniciar el programa y seguir las instrucciones para completar el inicio de sesion.

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### Usar un metodo de reenvio de la API de OpenAI como backend

Dado que la API oficial de OpenAI puede tener precios elevados y requisitos de red estrictos, para evitar estas limitaciones, tambien podemos realizar llamadas reenviadas a traves de otros servicios de pasarela API.

Con este metodo, solo necesitamos comprar la cuota correspondiente de Codex API en una plataforma de reenvio de terceros para obtener una experiencia de uso cercana a la de OpenAI Codex nativo.

Referencia: <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
Recarga: <https://api.zyai.online/account/topup/recharge>

Ten en cuenta que, una vez obtenida la cuota de tokens, todavia necesitamos configurar la API Key localmente.

En la configuracion del grupo de claves, asegurate de seleccionar la opcion especifica para Codex.

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

A continuacion, necesitamos rellenar la Key obtenida en el siguiente prompt y entregar todo el prompt a Trae para que te ayude a completar todo el proceso de configuracion:

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

Una vez completada la configuracion, puedes iniciar Codex con la API reenviada usando `codex --profile myrelay`. Despues de eso, el uso es similar a Claude Code: simplemente introduce tus ideas y necesidades en el cuadro de dialogo en cualquier momento.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode es una plataforma de AI Coding Agent de codigo abierto para desarrolladores, posicionada como una "version multi-modelo de Claude Code". Tiene la Terminal como punto de entrada principal de interaccion, y tambien soporta integracion con editores (como VS Code, Neovim, etc.), pudiendo conectarse profundamente con repositorios de codigo locales y completar todo un flujo de desarrollo, desde la comprension del codigo hasta la ejecucion de ingenieria, a traves de lenguaje natural.

No es una herramienta de programacion AI vinculada a un unico modelo, sino una plataforma de AI Coding Agent abierta que permite cambiar libremente entre GPT, Claude, Gemini e incluso modelos locales. Incluso OpenAI soporta oficialmente la conexion de OpenCode con Codex / suscripciones de OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

Puedes instalar OpenCode con el siguiente comando:

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### Usar modelos gratuitos en OpenCode

En OpenCode, de forma periodica se ofrecen modelos gratuitos que puedes usar, y la configuracion es muy simple. Puedes escribir `opencode` en la linea de comandos en el directorio donde quieras usar OpenCode para iniciar el programa y entrar al panel de chat. Introduce el comando `/models` y busca la palabra clave "free" para ver los modelos gratuitos que tienen la etiqueta "free".

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

En general, los modelos gratuitos tardan mas en completar tareas de codificacion que los modelos de pago/suscripcion. Esto suele depender de si la ruta del modelo esta congestionada, si es un periodo pico de codificacion y de la capacidad del modelo en si.

#### Usar modelos de terceros como modelo principal de codificacion de OpenCode

Esta es la principal ventaja de OpenCode: puede permitirte cambiar libremente de modelo para completar diferentes tareas de codificacion, manteniendo los mismos MCP, Skills y contexto. A continuacion, tomamos como ejemplo GPT-5.3 Codex oficial de OpenAI para conectarlo con OpenCode como modelo principal de codificacion.

En la ventana de chat de OpenCode, introduce el comando `/connect`, selecciona la primera instruccion mas relevante y pulsa Enter para proceder con la autenticacion y autorizacion del proveedor de modelos de terceros.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

Tomando como ejemplo la seleccion de OpenAI, pulsa Enter para elegir el metodo de autenticacion.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

Cualquiera de las opciones funciona, solo difiere el metodo de autenticacion. Aqui seleccionamos la primera para iniciar sesion en el navegador.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

Copia este enlace al navegador para completar el inicio de sesion normal de OpenAI. Cuando aparezca "Authorization Successful" en el navegador, el cliente de OpenCode te redirigira automaticamente a la interfaz de seleccion de modelos de OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Instalar el plugin Oh My OpenAgent

La fortaleza de OpenCode tambien radica en su ecosistema comunitario muy activo. Puedes buscar en GitHub muchisimos plugins relacionados con OpenCode. Si OpenCode es una herramienta de colaboracion AI que permite cambiar libremente de modelo, entonces Oh-My-OpenAgent es un "sistema de mando de programacion multi-Agent AI" que se ejecuta sobre OpenCode. Puede descomponer una tarea compleja en multiples subtareas y asignarlas a diferentes modelos para que cada uno haga lo suyo.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

Puedes copiar el siguiente texto y pegarlo en el modelo que hayas configurado en OpenCode para instalar OpenCode.

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

A continuacion se muestran las caracteristicas y la descripcion de las funciones de Oh-My-OpenAgent.

| Caracteristica | Descripcion de la funcion |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentes disciplinarios (Discipline Agents)** | Sisyphus se encarga de coordinar a Hephaestus, Oracle, Librarian y Explorer. Un equipo completo de desarrollo AI trabajando en paralelo. |
| **Team Mode** (v4.0, activacion opcional) | Agent lider + hasta 8 miembros en paralelo, visualizacion tmux en tiempo real, familia de herramientas `team_*` dedicada. Impulsa `hyperplan` (5 revisores adversariales) y `security-research` (3 cazadores + 2 ingenieros PoC). [Documentacion](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | Activacion con un clic, todos los agentes entran en accion. No se detienen hasta que la tarea esta completa. |
| **[IntentGate](https://factory.ai/news/terminal-bench)** | Antes de actuar realmente, analiza la intencion real del usuario. Adios para siempre a las respuestas inutiles de la AI que se toma todo literalmente. |
| **Herramientas de edicion basadas en hash** | Cada modificacion se verifica con el hash de contenido `LINE#ID`, 0% de errores de edicion. Inspirado en [oh-my-pi](https://github.com/can1357/oh-my-pi). [The Harness Problem](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | Renombrado a nivel de workspace, diagnostico pre-build, reescritura basada en AST. Precision a nivel de IDE para los Agentes. |
| **Agentes en segundo plano** | Lanza 5+ expertos en paralelo simultaneamente. Mantiene el contexto limpio, obtiene resultados en cualquier momento. |
| **MCP incorporado** | Exa (busqueda web), Context7 (documentacion oficial), Grep.app (busqueda de codigo fuente en GitHub). Activados por defecto. |
| **Ralph Loop / `/ulw-loop`** | Bucle de auto-referencia. No se detiene hasta alcanzar el 100% de completitud. |
| **Ejecucion forzada de Todo** | El Agent quiere holgazanear? El sistema lo obliga a volver a la tarea. Tus tareas, deben completarse. |
| **Revisor de comentarios** | Elimina los comentarios redundantes con fuerte sabor a AI. El codigo generado parece escrito por un ingeniero senior experimentado. |
| **Integracion Tmux** | Soporte completo de terminal interactiva. Ejecuta REPL, usa depuradores, herramientas TUI, todo en sesiones en tiempo real. |
| **Compatible con Claude Code** | Tus Hooks, comandos, skills, MCP y plugins existentes? Todos migran sin problemas. |
| **Skills con MCP integrado** | Los Skills traen incorporados los servidores MCP que necesitan. Se activan segun necesidad, sin saturar tu ventana de contexto. |
| **Planificador Prometheus** | Antes de escribir codigo, planifica estrategicamente a traves de un modo de entrevista. |
| **`/init-deep`** | Genera automaticamente `AGENTS.md` en toda la jerarquia de directorios del proyecto. No solo ahorra tokens, sino que mejora drasticamente la comprension del Agent. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) es tu comandante principal. Se encarga de elaborar planes, asignar tareas al equipo de expertos y impulsar las tareas hasta su finalizacion con una estrategia de paralelismo extremadamente agresiva. Nunca se rinde a medias.

Hephaestus (gpt-5.5) es tu trabajador profundo autonomo. Solo necesitas darle un objetivo, no el metodo. Explora automaticamente los patrones del codebase, ejecuta tareas de principio a fin de forma independiente, y nunca te pedira que lo supervises. Un verdadero artesano.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) es tu planificador estrategico. A traves del modo de entrevista, antes de escribir una sola linea de codigo, define el alcance mediante preguntas y construye un plan de ejecucion detallado.

Una vez que hayas entendido todo esto, ya puedes usar OpenCode con el plugin Oh-My-OpenAgent instalado para completar tareas de codificacion.

#### Configuracion de modelos y APIs (avanzado)

A traves de `/connect` puedes conectar modelos rapidamente en la interfaz de chat, pero si necesitas un control mas fino, por ejemplo, especificar diferentes modelos para diferentes tareas o configurar multiples API Providers de respaldo, puedes editar directamente el archivo de configuracion de OpenCode: `opencode.json`.

Este archivo se encuentra en `~/.config/opencode/opencode.json` (ruta en Windows: `C:\Users\TuNombreDeUsuario\.config\opencode\opencode.json`), y se genera automaticamente la primera vez que inicias OpenCode.

A continuacion se muestra un ejemplo de configuracion para conectar el modelo Qwen de la plataforma Bailian (Alibaba Cloud):

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "small_model": "bailian-coding-plan/qwen3.5-plus",
  "provider": {
    "bailian-coding-plan": {
      "options": {
        "apiKey": "sk-tu-API-Key"
      }
    }
  }
}
```

> 💡 El formato del campo `model` es `proveedor/nombre-del-modelo`. Puedes registrarte en la plataforma correspondiente y obtener tu API Key, y luego reemplazar el valor de `apiKey` arriba.

Si quieres configurar multiples modelos simultaneamente, puedes especificar diferentes categorias de tareas en la configuracion:

The MiniMax quick-task example uses the [OpenCode Console route](https://opencode.ai/v2/docs/console/models/). Connect that provider with `/connect` first. Its `minimax-m3.1-flash-free` offer is time-limited; `opencode/minimax-m3` is a paid alternative. These gateway IDs are distinct from direct MiniMax API IDs and OpenCode Go subscription models.

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "categories": {
    "visual-engineering": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "description": "Frontend, UI/UX, diseno, estilos"
    },
    "ultrabrain": {
      "model": "bailian-coding-plan/qwen3-coder-next",
      "description": "Logica compleja, algoritmos, decisiones de arquitectura"
    },
    "quick": {
      "model": "opencode/minimax-m3.1-flash-free",
      "description": "Modificaciones simples, correccion de errores tipograficos"
    }
  }
}
```

Asi, OpenCode seleccionara automaticamente el modelo mas adecuado segun el tipo de tarea: para modificaciones simples usara un modelo rapido para ahorrar costes, y para problemas de arquitectura complejos usara un modelo mas potente para garantizar la calidad.

#### Ampliar OpenCode con servidores MCP

MCP (Model Context Protocol) es un protocolo abierto que permite a las herramientas de programacion AI invocar herramientas externas, como operar el navegador, buscar en la web, analizar imagenes, etc. OpenCode soporta MCP de forma nativa, con un metodo de configuracion similar al de Claude Code.

Anade la configuracion del servidor en el campo `mcp` de `opencode.json`:

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "local",
      "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
    },
    "zai-mcp-server": {
      "type": "local",
      "command": ["npx", "-y", "@z_ai/mcp-server"]
    }
  }
}
```

Despues de configurar, reinicia OpenCode y la AI podra invocar automaticamente estas herramientas durante la conversacion, por ejemplo, para abrir el navegador y hacer capturas de pantalla, analizar disenos UI, buscar informacion en la web, etc.

> 🎯 **Escenario practico**: cuando necesitas que la AI te ayude a analizar un problema de layout de una pagina web, configura chrome-devtools MCP y simplemente di "abreme esta pagina, mira por que el boton no esta en la posicion correcta", y la AI podra abrir automaticamente el navegador, hacer una captura de pantalla, analizar y dar sugerencias de reparacion.

#### Consejos de uso diario y problemas comunes

**Usar AGENTS.md para guiar el comportamiento de la AI**

Crea un archivo `AGENTS.md` en el directorio raiz del proyecto para informar a OpenCode sobre las convenciones y preferencias de tu proyecto. La AI leera automaticamente este archivo cada vez que se inicie:

```markdown
## Convenciones del proyecto
- Usar TypeScript en modo estricto
- Las respuestas API deben cumplir con JSON Schema
- El manejo de errores usa subclases de Error personalizadas

## Flujo de desarrollo
1. Entender el codigo existente antes de modificar
2. Commits pequenos, cada commit es una unidad logica
3. Ejecutar npm test al finalizar para verificar

## Prohibiciones
- No usar el tipo any
- No eliminar archivos de test
```

**Explorar el codebase en paralelo**

Cuando no estes familiarizado con un proyecto, puedes pedir a OpenCode que busque multiples aspectos simultaneamente:

> Hazme estas cosas a la vez:
> 1. Busca todos los lugares del proyecto que manejan solicitudes HTTP
> 2. Encuentra el codigo relacionado con la base de datos
> 3. Lista la estructura de directorios del proyecto y las responsabilidades de cada modulo

OpenCode ejecutara estas tareas de exploracion en paralelo, dandote un mapa completo del codebase de una sola vez.

**Problemas comunes**

| Problema | Solucion |
|------|---------|
| El comando `opencode` no se encuentra | El directorio global de npm no esta en PATH. Ejecuta en la terminal: `[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\AppData\Roaming\npm", "User")` y reinicia la terminal |
| La AI responde muy lento | Usa la categoria quick para tareas simples (enruta automaticamente a modelos rapidos); si el historial de conversacion es muy largo, abre una nueva sesion |
| Las llamadas a la API fallan | Verifica que la API Key sea correcta, que el nombre del modelo este bien escrito (formato provider/model-name), y que la cuenta tenga saldo suficiente |
| Los Skills no se activan | Confirma que el formato del archivo SKILL.md es correcto (necesita YAML frontmatter) y que el campo description describe con precision las condiciones de activacion |
| El contexto de la conversacion es muy largo | Abre una nueva sesion, o define convenciones clave en AGENTS.md para que las nuevas sesiones tambien las hereden |

## Mas usos de las herramientas CLI AI

### Usar AI para escribir documentos de requisitos: aprender a "concretar requisitos"

Para los modelos de lenguaje grandes, los requisitos abstractos necesitan ser "concretados". Por ejemplo: "Tengo hambre" es un requisito abstracto; necesitamos convertirlo en: "Tengo un poco de hambre, quizas necesito comer un bollo de pan de judias rojas y acompanarlo con un vaso de leche de soja". Este es un requisito concreto que puede ser ejecutado.

Pero convertir requisitos abstractos en concretos es en realidad un proceso que requiere mucho esfuerzo. Si no hemos visto suficientes ejemplos, es dificil pensar rapidamente en como descomponer un problema abstracto en modulos detallados. En estos casos, el mejor metodo es dejar que la AI te ayude con el paso de "concretar".
Por ejemplo, si quiero desarrollar una aplicacion de "planificacion diaria", la idea mas simple podria ser:

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

La AI ciertamente puede descomponer las tareas basandose en este requisito y completarlas paso a paso, pero es facil que se cometan errores o haya malentendidos en el medio. Para reducir el riesgo, podemos pedir a la AI que nos ayude a expandir los requisitos primero:

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

En este punto, la AI podria generar un PRD completo como el siguiente:

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system, ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today's plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won't miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: "Today" as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom "To-do List" section.
Interactions:
Click the "+" button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday's and tomorrow's plans.
3.1.2 Create/Edit Task
Entry: Click "+" on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., "10 AM Weekly Product Meeting."
Task time (optional):
Set "start time" and "end time."
Provide "all-day" option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal "Delete" button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task's set "start time" and the user's "reminder lead time," send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name "Today's Plan."
Body: "Reminder: [Task Title] will start at [Start Time]." E.g., "Reminder: Product Meeting will start at 10:00."
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., "15 minutes before task starts." New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide "no reminder" option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): "How was your day? Take a look at your achievements!"
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., "Efficient Workday," "Relaxing Weekend."
When creating tomorrow's plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product's lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value, planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

Comparado con nuestra frase original "ayudame a escribir una aplicacion donde pueda registrar planes diarios y recibir recordatorios", este documento es ahora mucho mas detallado. Puedes anadir, eliminar o modificar el contenido segun tus necesidades reales; para los modulos que no estes seguro, tambien puedes pedir a la AI que proporcione mas opciones alternativas, y luego tu eliges y combinas la version final.

De esta forma, podemos transformar facilmente ideas abstractas en descripciones concretas. Para el desarrollo con AI, "concreto" es productividad: cuanto mas concretos sean los requisitos, mas facil sera obtener proyectos con estructura estable y alta calidad. Puedes intentar usar este metodo para rehacer un proyecto pequeno anterior y comparar las diferencias en los resultados.

Si te parecen demasiado largos estos "prompts de requisitos", una solucion muy natural es escribirlos en un documento markdown separado, como tu "documento de requisitos / documento de desarrollo / PRD". Despues, cada vez que pidas a la AI que escriba un proyecto, solo necesitas decirle que "consulte este documento", en lugar de volver a escribir un prompt largo cada vez. Tambien puedes seguir mejorando este documento en cada iteracion, para que los proyectos posteriores se beneficien directamente.

A continuacion se muestran algunos otros escenarios de uso comunes:

### Gestionar carpetas

Podemos intentar usar herramientas CLI AI para gestionar los archivos de la carpeta actual. Por ejemplo, si tienes un monton de archivos desordenados que necesitas organizar y clasificar, puedes decirle a Claude Code o Codex:

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### Desarrollar nuevos proyectos

Esto es casi exactamente igual a lo que haciamos antes en z.ai y Trae: tambien podemos usar directamente herramientas CLI AI para desarrollar proyectos desde cero. Por supuesto, es mejor tener preparado un documento de requisitos de antemano.

Cuantos mas detalles tenga el documento de requisitos, mejor sera el resultado final. Puedes optimizar el documento en multiples rondas segun tus ideas cambiantes; cuanto mas completo este el documento, mas estable y madura sera la implementacion del codigo.

### Desplegar proyectos de codigo abierto (por ejemplo, Dify)

Para los companeros que se estan iniciando en la informatica, desplegar un proyecto de codigo abierto desde GitHub suele ser bastante dificil. Pero podemos dejar esta tarea completamente a Claude Code, como hicimos en el tutorial de Dify:

<https://github.com/langgenius/dify>

Si quiero ejecutar mi propio Dify localmente, solo necesito pasar este enlace a Claude Code y luego introducir:

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

Despues de recibir tu solicitud, Claude Code completara automaticamente una serie de operaciones, incluyendo extraer el codigo de GitHub, configurar el entorno de ejecucion e iniciar el proyecto. Si algun paso falla o el proyecto no arranca correctamente, solo necesitas hacer un minimo de intervencion manual segun las indicaciones. Ademas de Dify, tambien puedes usar Claude Code para desplegar la mayoria de los proyectos de codigo abierto comunes de GitHub: solo necesitas un cuadro de dialogo y el tiempo de tomar un cafe ☕️.

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### Explicar codigo y escribir documentacion

Para algunos proyectos complejos, o proyectos grandes generados automaticamente por AI, puede que el codigo te parezca demasiado largo, con demasiada logica, y dificil de entender. En ese momento, puedes pedir a las herramientas CLI AI que te "lean el codigo". Puedes preguntarles asi:

- Explicame este proyecto: como se ejecuta, como se usa, como se puede modificar y continuar el desarrollo?
- Explicame el flujo general de este proyecto: como funciona el programa? Que operaciones puede realizar el usuario en la interfaz?
- Escribeme una documentacion completa para este proyecto, incluyendo documentacion de desarrollo y documentacion de ejecucion.
- Basandote en todo el contenido de mi carpeta actual, escribe una descripcion detallada y guardala en un documento markdown especificado.

### Mas posibilidades

Por supuesto, las herramientas CLI AI pueden hacer mucho mas que todo lo anterior. No las veas solo como "herramientas para escribir codigo", sino como un Agente inteligente con capacidad de actuacion independiente. Puedes pedirles que:

- Gestione y organice archivos locales;
- Escriba diarios, resumenes;
- Analice y repare errores del sistema;
- Ejecute diversas tareas repetitivas de linea de comandos, etc.

Quizas en un futuro cercano, se convierta en el companero AI mas importante y que mejor te entiende en tu ordenador.
