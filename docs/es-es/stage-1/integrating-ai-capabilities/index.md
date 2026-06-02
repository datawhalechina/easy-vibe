---
title: 'Anadiendo capacidades de IA al prototipo - Integracion de APIs de texto e imagen'
description: 'Integra capacidades reales de IA en tu prototipo web: comprende los conceptos centrales de API, aprende a encontrar API Keys y ejemplos oficiales.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'aprox. <strong>1 dia</strong>'
const relatedArticles =
  relatedArticlesMap['es-es/stage-1/integrating-ai-capabilities'] ?? []
</script>

# Nivel inicial 4: Incorporar capacidades de IA al prototipo

## Introduccion del capitulo

<ChapterIntroduction :duration="duration" :tags="['API', 'Modelo de texto', 'Generacion de imagenes', 'Integracion de prototipo']" coreOutput="Conectar el prototipo con 1 modelo de texto + 1 modelo de imagen opcional" expectedOutput="Un prototipo de IA que puede llamar APIs reales">

En los capitulos anteriores completamos el flujo completo desde <strong>encontrar una buena idea</strong> hasta <strong>crear un prototipo de producto</strong>. Pero por ahora el prototipo sigue siendo solo una "carcasa": al hacer clic en los botones no se genera contenido real y los datos de la pagina estan escritos de forma fija.

Recuerda lo que enfatizamos en el primer capitulo: <strong>queremos crear "productos por los que alguien estaria dispuesto a pagar", no "prototipos que solo parecen decentes".</strong> El valor real viene de que el producto pueda <strong>resolver problemas reales</strong>, y para lograrlo el prototipo debe <strong>funcionar de verdad</strong>.

Este capitulo hara que el prototipo <strong>"cobre vida"</strong>: conectaremos <strong>capacidades reales de IA</strong>, desde obtener una API Key hasta leer la documentacion oficial y pedir al AI IDE que integre la interfaz en el codigo. Usaremos el <strong>modelo de texto DeepSeek</strong> como ejemplo para aprender como hacer que una aplicacion <strong>llame de verdad a un modelo grande para generar contenido</strong>; si te interesa, tambien puedes hacer de forma opcional la <strong>integracion de generacion de imagenes</strong>.

Al terminar este capitulo, tu prototipo <strong>dejara de ser una demo estatica</strong> y se convertira en <strong>una aplicacion capaz de llamar capacidades reales de IA y resolver problemas reales</strong>.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Bases de API', description: 'Comprender conceptos clave y normas de seguridad' },
      { title: 'Conectar texto', description: 'Practica de generacion de texto con DeepSeek' },
      { title: 'Conectar imagenes', description: 'Comprension y generacion de imagenes con VLM' }
    ]" />
  </ClientOnly>
</div>

# 1. Conceptos basicos de API

Como mencionamos antes, nuestro objetivo es "conectar capacidades de IA" para que el prototipo deje de ser una demo estatica y se convierta en una herramienta capaz de llamar servicios reales de IA. La clave para lograrlo es entender y usar APIs.

API es un concepto abstracto importante en informatica. Podemos entenderlo de forma simple asi: **envias una pregunta en el formato que la otra parte exige, y la otra parte devuelve un resultado en un formato acordado**.

- **Lo que envias**: normalmente incluye una "clave (API Key)" y "lo que quieres generar"
- **Lo que recibes**: si todo sale bien, devuelve el resultado; si falla, indica la causa, por ejemplo "clave incorrecta", "saldo insuficiente" o "parametro mal escrito"

En concreto, necesitas dominar estos elementos centrales:

1. **API Key**: tu "pase de acceso" y tambien la "llave de tu cartera". Si otra persona la obtiene, puede llamar la API en tu nombre y generar costes.
2. **Endpoint (ruta de interfaz)**: la ruta concreta de una solicitud API, que indica al servidor que funcion quieres usar. La direccion completa suele componerse de "URL base + endpoint". Por ejemplo:
   - Generacion de texto: URL base (`https://api.service.com`) + Endpoint (`/v1/chat/completions`) = URL completa `https://api.service.com/v1/chat/completions`
   - Generacion de imagenes: URL base (`https://api.service.com`) + Endpoint (`/v1/images/generations`) = URL completa `https://api.service.com/v1/images/generations`
3. **Llamada/solicitud**: el proceso de enviar una tarea a un servicio de IA y obtener el resultado.
4. **Contenido de la solicitud**: el contenido concreto que envias a la IA, por ejemplo el tema del articulo que quieres que escriba o la descripcion de la imagen que quieres generar.
5. **Resultado de respuesta**: lo que la IA devuelve tras procesar la solicitud, por ejemplo un articulo o una imagen generada.
6. **Manejo de errores**: saber diagnosticar y resolver problemas como API Key incorrecta o demasiadas solicitudes.

::: info ℹ️ Que es una API
Para una explicacion mas profunda de API, consulta el apendice: [Introduccion a API](/zh-cn/appendix/4-server-and-backend/api-intro).

::: warning 🔐 **Notas de seguridad sobre API**
La API Key es tu "pase de acceso" para solicitar servicios de IA. Es una cadena secreta usada para autenticacion y facturacion.

Como la API Key esta directamente vinculada a tu cuenta y costes, presta especial atencion:

- Nunca la **compartas en chats grupales, subas capturas a internet** ni la publiques en foros abiertos.
- **No la hardcodees en el codigo** ni la subas a un repositorio Git, especialmente si es publico.
- Si sospechas que la clave se filtro, **reemplazala de inmediato**.

En los siguientes pasos **pegaremos directamente la API KEY en el AI IDE para practicar**. **No hagas esto en un proyecto formal.** Aqui lo hacemos solo porque es un ejercicio. Cuando tengas mas soltura, puedes pedir a la IA que genere un archivo de configuracion y poner la API KEY alli.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Bases de API', description: 'Comprender conceptos clave y normas de seguridad' },
      { title: 'Conectar texto', description: 'Practica de generacion de texto con DeepSeek' },
      { title: 'Conectar imagenes', description: 'Comprension y generacion de imagenes con VLM' }
    ]" />
  </ClientOnly>
</div>

# 2. Conectar una API de generacion de texto: DeepSeek

Aunque API implica estos conceptos tecnicos, en la etapa de prototipado la operacion real puede ser muy simple y eficiente. La idea central es:

> **Encontrar el ejemplo oficial, obtener la API Key y pedir al AI IDE que la conecte al boton.**

Cuando entiendas estos conceptos, veras que conectar un modelo de texto o un modelo de imagen sigue esencialmente el mismo flujo: cuando el usuario hace clic en un boton, el frontend organiza la entrada y envia una solicitud; cuando la interfaz devuelve el resultado, lo muestra en la pagina. A continuacion lo comprobaremos con una practica real.

En `1.2 Crear un prototipo con tus manos`, ya construiste un prototipo interactivo. Ahora vamos a convertir las funciones que "parecen IA" en capacidades realmente utilizables: **cuando el usuario haga clic en un boton, el prototipo enviara una solicitud a un servicio externo de IA y mostrara el texto devuelto.**

::: info ℹ️ Ampliacion conceptual
Si quieres conocer mas sobre los principios, consulta el apendice: [Introduccion a los modelos de lenguaje grandes (LLM)](/zh-cn/appendix/8-artificial-intelligence/llm-principles).
::: details Saber mas: que es DeepSeek

**Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd.**, que opera bajo la marca DeepSeek, es una **empresa china de inteligencia artificial dedicada al desarrollo de modelos de lenguaje grandes (LLMs)**. DeepSeek tiene sede en Hangzhou, Zhejiang, y pertenece al fondo cuantitativo chino High-Flyer, que tambien la financia. Fue fundada en julio de 2023 por Liang Wenfeng, cofundador de High-Flyer, quien tambien es CEO de ambas companias. En enero de 2025 lanzo su chatbot homonimo y el modelo DeepSeek-R1.

Veamos como se compara DeepSeek con otros modelos lideres en el benchmark GPQA. Cabe destacar que DeepSeek es un modelo open source, es decir, cualquiera puede descargarlo desde internet, mientras que otros modelos comunes como Grok, Google Gemini y ChatGPT son cerrados. Como se puede observar, DeepSeek ya se acerca bastante al primer grupo de modelos.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-16-48.png)

GPQA significa "Graduate-Level Google-Proof Q&A Benchmark". Es un benchmark de nivel posgrado para tareas de preguntas y respuestas cientificas. A continuacion va una explicacion mas detallada.

GPQA contiene 448 preguntas de opcion multiple que cubren subcampos de biologia, fisica y quimica, como mecanica cuantica, quimica organica y biologia molecular. Las preguntas fueron redactadas por 61 expertos con doctorado o en proceso de doctorado y pasaron por un proceso estricto de verificacion.
:::

Con estos 3 pasos puedes integrar rapidamente una API de generacion con modelo grande:

1. **Crear una API Key en la plataforma de DeepSeek**
2. **Encontrar el ejemplo de generacion de texto en la documentacion de DeepSeek** (normalmente hay codigo listo para copiar)
3. **Abrir el AI IDE, pegar la API Key + el ejemplo oficial** y decirle a la IA que funcion debe implementar:
   > Ayudame a conectar esta API del modelo grande para soportar la tarea de generacion de copy en esta aplicacion

A continuacion haremos una demostracion. Puedes seguir el flujo completo paso a paso. Primero registra una cuenta en [DeepSeek](https://platform.deepseek.com/usage), crea una API Key y recarga una pequena cantidad para verificar la llamada.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-57-41.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-13.png)

Haz clic en "API KEYS" y busca "create new API key" en la parte inferior de la pantalla. Al final obtendras una API key parecida a `sk-8573341c39fc44315aadc071c53rh7d2`.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-32.png)

Una vez obtenida la clave, ya tienes permiso para llamar al modelo.

En este punto puedes leer directamente la documentacion de [API](https://api-docs.deepseek.com/), que normalmente ofrece ejemplos de llamada con curl o Python.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-56.png)

Despues de encontrar el ejemplo, puedes copiar el contenido de la documentacion y la clave en el cuadro de dialogo del AI IDE, y pedirle que integre el modelo grande en el prototipo que ya desarrollaste.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-59-31.png)

Puedes usar como referencia este prompt:

```
Toma como referencia este metodo de llamada y ayudame a soportar una funcion de generacion de copy. Debe poder generar copy de ecommerce para Douyin/TikTok a partir de la informacion del producto al hacer clic, con varios estilos.

Material de referencia:
api key：sk-8573341c39aefa1efe
Referencia de solicitud API:
curl  \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

Tras un rato de generacion de codigo por parte de la IA, normalmente obtendremos facilmente un boton de generacion de copy para probar. Si no encuentras la entrada, puedes pedir al AI IDE que te indique desde que pagina se accede; si aun asi no la encuentras, puedes pedirle que refactorice y mejore directamente segun tu idea hasta obtener el resultado final de generacion de copy.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-23-23.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-26-35.png)

Puede que aqui te preguntes: como se si realmente esta llamando al modelo grande y no solo usando respuestas fijas integradas? Puedes introducir un copy personalizado y pedir al modelo que genere el resultado segun el analisis personalizado que acabas de especificar.

Si ves que cada resultado es diferente y logicamente coherente, puedes considerar que la API ya se esta llamando correctamente. Tambien puedes revisar en la [plataforma de gestion de uso de API](https://platform.deepseek.com/usage) si la llamada fue exitosa, aunque puede tardar unos minutos en aparecer.

## Mas opciones de modelos de generacion de texto

Ademas de DeepSeek, tambien puedes probar otros modelos de lenguaje grandes. Como la mayoria ofrece **interfaces compatibles con OpenAI**, cambiar de modelo es muy sencillo: solo necesitas sustituir la API Key, la URL base y el nombre del modelo.

### Integracion de MiniMax

::: details Saber mas: que es MiniMax

**MiniMax** es una empresa china de inteligencia artificial dedicada a la investigacion y desarrollo de tecnologias de inteligencia artificial general. MiniMax ha lanzado de manera sucesiva las series de modelos de lenguaje grandes MiniMax-M3 y MiniMax-M2.7, que han mostrado buen rendimiento en varios benchmarks y ofrecen una relacion coste-rendimiento muy alta.

**Principales caracteristicas de la serie MiniMax:**

- **Contexto ultralargo**: M3 admite una ventana de contexto de hasta 512K tokens (M2.7 admite 204,800 tokens), adecuada para documentos largos y conversaciones de multiples turnos.
- **Alta relacion coste-rendimiento**: precio muy competitivo.
- **Interfaz compatible con OpenAI**: se puede llamar directamente con el OpenAI SDK sin aprender un nuevo formato de API.
- **Modelos disponibles**:
  - `MiniMax-M3`: nuevo modelo insignia, contexto de 512K, salida maxima de 128K y soporte para entrada de imagenes.
  - `MiniMax-M2.7`: modelo insignia anterior, sigue disponible.
  - `MiniMax-M2.7-highspeed`: version de alta velocidad, con rendimiento similar pero mas rapida.
:::

La forma de integrarlo es igual que DeepSeek y solo requiere tres pasos:

1. Ir a la [plataforma abierta de MiniMax](https://platform.minimax.io/), registrar una cuenta y crear una API Key.
2. Encontrar un ejemplo de llamada en la documentacion de MiniMax.
3. Pegar la API Key + el ejemplo en el AI IDE.

Como MiniMax ofrece una interfaz compatible con OpenAI, puedes copiar directamente el siguiente ejemplo curl junto con tu API Key y enviarlo al AI IDE para integrarlo:

```bash
curl https://api.minimax.io/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${MINIMAX_API_KEY}" \
  -d '{
        "model": "MiniMax-M3",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

::: tip ✅ Consejo
El formato de API de MiniMax es casi identico al de DeepSeek, ya que ambos son compatibles con OpenAI. Si ya integraste DeepSeek correctamente, cambiar a MiniMax solo requiere modificar tres lugares:
1. **URL base**: cambiarla a `https://api.minimax.io/v1`
2. **API Key**: usar la API Key de MiniMax
3. **Nombre del modelo**: cambiarlo a `MiniMax-M3` (nueva insignia), `MiniMax-M2.7` o `MiniMax-M2.7-highspeed`

Para mas informacion, consulta la [documentacion de la interfaz compatible con OpenAI de MiniMax](https://platform.minimax.io/docs/api-reference/text-openai-api).
:::

# 3. Conectar una API de imagen a texto: Qwen3 VL

::: info ℹ️ Ampliacion conceptual
Si quieres conocer mas sobre los principios, consulta el apendice: [Introduccion a los modelos vision-lenguaje (VLM)](/zh-cn/appendix/8-artificial-intelligence/multimodal-models).

::: details Saber mas: que es Qwen3 VL

**Qwen3 VL** es la version mas reciente de la serie de modelos multimodales vision-lenguaje lanzada por el equipo Tongyi Qianwen de Alibaba Cloud. VL significa "Vision-Language", es decir, modelo vision-lenguaje. Puede entender el contenido de una imagen, generar descripciones textuales a partir de imagenes, responder preguntas sobre imagenes y extraer informacion visual.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-27.png)
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-41.png)

**Las principales capacidades de Qwen3 VL incluyen:**

- **Comprension de imagenes**: identifica objetos, escenas, personas, texto y otros contenidos dentro de una imagen.
- **Preguntas y respuestas visuales**: responde con precision preguntas del usuario sobre una imagen.
- **Descripcion de imagenes**: genera descripciones textuales detalladas o concisas.
- **Comprension de multiples imagenes**: permite procesar varias imagenes a la vez para compararlas.
- **Extraccion de texto**: extrae texto de imagenes mediante capacidades OCR.

**Por que elegir Qwen3 VL?**

Comparado con la generacion anterior, Qwen3 VL mejora de forma notable la precision de comprension de imagenes y soporta tareas de analisis visual mas largas y complejas. Tiene buen rendimiento en comprension de chino, costes de API relativamente bajos y una buena relacion coste-rendimiento. Ademas, su ventana de contexto es mayor y puede manejar tareas de razonamiento visual mas complejas.

**Escenarios de uso tipicos:**

- Ecommerce: generar automaticamente titulos, descripciones y puntos de venta a partir de imagenes de producto.
- Creacion de contenido: generar copy o sugerencias visuales a partir de imagenes de material.
- Oficina: extraer contenido de imagenes y reconocer informes automaticamente.
- Educacion: analizar automaticamente preguntas en imagenes y extraer puntos de conocimiento.

:::

En la seccion anterior explicamos como conectar una API de generacion de texto. Pero en nuestros escenarios anteriores aparece un problema: subimos una imagen, y si usamos solo un modelo de lenguaje, no puede entender bien el contenido visual, por lo que el resultado generado puede desviarse bastante.

Queremos un modelo que nos ayude a convertir una imagen en descripcion textual. Para eso necesitamos un modelo vision-lenguaje (VLM). En este caso, usaremos un VLM para generar descripciones de puntos de venta del producto y mejorar la experiencia de usuario.

Para simplificar, usaremos la API ofrecida por la [plataforma cloud SiliconFlow](https://cloud.siliconflow.cn/me) para conectar una API de imagen a texto.

::: details Saber mas: que es SiliconFlow
**SiliconFlow** es una conocida plataforma china de agregacion de modelos de IA que ofrece servicios API para multiples modelos de lenguaje grandes y modelos vision-lenguaje populares.

**Caracteristicas de la plataforma:**

- **Soporte multimodelo**: integra multiples modelos de IA populares, incluidos modelos open source como DeepSeek, Qwen y la serie Llama.
- **Optimizacion tecnica**: optimiza la inferencia de modelos open source y ofrece servicios API de baja latencia y alta concurrencia.
- **Compatibilidad de interfaz**: ofrece APIs compatibles con el formato OpenAI, facilitando la integracion en aplicaciones existentes.
- **Pago bajo demanda**: permite facturacion por volumen de llamadas.

SiliconFlow esta relativamente maduro en servicios de inferencia para modelos open source y es una opcion comun para usar modelos chinos open source de IA.
:::

Al entrar en la pagina principal de SiliconFlow, veras muchos modelos disponibles. Busca el filtro en la esquina superior izquierda, abrelo y selecciona la etiqueta de vision. Alli veras muchos modelos de imagen a texto, por ejemplo GLM-4.6V de Zhipu o Qwen3-VL.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-05-04.png)

Puedes elegir cualquiera para probar. Aqui usaremos `Qwen/Qwen3-VL-8B-Instruct` como ejemplo.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-07-44.png)

Entra en la [plataforma SiliconFlow](https://cloud.siliconflow.cn/me/account/ak), haz clic en "Crear nueva API Key" dentro de la seccion de claves API y crea una nueva API Key.

Puedes usar directamente el siguiente codigo como referencia y enviarlo junto con la API Key generada al AI IDE para integrar la funcion.

::: details Codigo de referencia de imagen a texto

```python
from openai import OpenAI
from typing import Dict, Any, List
import base64
import os
SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/"
MODEL_NAME: str = "Qwen/Qwen3-VL-8B-Instruct"

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def get_vlm_completion(client: OpenAI, messages: List[Dict[str, Any]]) -> str:
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        max_tokens=512,
        temperature=0.7,
        top_p=0.7,
        frequency_penalty=0.5,
        stream=False,
        n=1
    )
    return response.choices[0].message.content

def caption_image(image_path: str) -> str:
    base64_image = encode_image(image_path)
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Please describe this image in detail."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]

    client = OpenAI(
        api_key=SILICONFLOW_API_KEY,
        base_url=SILICONFLOW_BASE_URL
    )

    return get_vlm_completion(client, messages)

image_path = "images.jpg"
caption = caption_image(image_path)
```

:::

En este escenario, probamos directamente pedir al AI IDE que implemente una funcion para generar automaticamente texto de puntos de venta ecommerce y palabras clave a partir de una imagen subida, como se muestra a continuacion:

```
Basandote en la siguiente API de imagen a texto, ayudanos a implementar una funcion que genere automaticamente texto de puntos de venta ecommerce y palabras clave a partir de imagenes subidas.

<Codigo omitido aqui; debes pegar por tu cuenta la clave y el codigo de referencia>
```

Finalmente se obtiene el resultado generado:
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-34-36.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-35-41.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Bases de API', description: 'Comprender conceptos clave y normas de seguridad' },
      { title: 'Conectar texto', description: 'Practica de generacion de texto con DeepSeek' },
      { title: 'Conectar imagenes', description: 'Comprension y generacion de imagenes con VLM' }
    ]" />
  </ClientOnly>
</div>

# 4. Conectar una API de generacion de imagenes: Seedream

En las secciones anteriores trabajamos principalmente con tareas relacionadas con texto. Ahora intentaremos conectar capacidades de generacion de imagenes, para soportar generar imagenes desde descripciones de texto o modificar imagenes existentes.

::: info ℹ️ Ampliacion conceptual
Si quieres conocer mas sobre los principios, consulta el apendice: [Introduccion a la generacion de imagenes](/zh-cn/appendix/8-artificial-intelligence/image-generation).

::: details Saber mas: que es [Seedream](https://seed.bytedance.com/en/seedream4_5)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-17.png)

> Tal vez ya conozcas Nano Banana, desarrollado por Google, pero no conviene pasar por alto Seedream. Seedream 4.5 es una nueva generacion de modelo de creacion de imagenes desarrollada por ByteDance. Integra generacion y edicion de imagenes en una arquitectura unificada, lo que le permite manejar de forma flexible tareas multimodales complejas, como generacion basada en conocimiento, razonamiento complejo y consistencia con referencias. Ademas, su velocidad de inferencia es mucho mayor que la generacion anterior y puede generar imagenes HD impresionantes con resolucion de hasta 4K.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-38.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-50.png)

**Capacidades principales:**

- **Texto a imagen**: genera imagenes a partir de descripciones textuales y soporta varios estilos, como realista, cartoon, tinta china o cyberpunk.
- **Transferencia de estilo**: convierte una imagen a un estilo artistico especificado.
- **Variantes de imagen**: genera nuevas imagenes de estilo similar basadas en una referencia.
- **Mejora de resolucion**: aumenta claridad y detalles.
- **Edicion de imagenes**: edita y modifica imagenes existentes mediante instrucciones en lenguaje natural.

**Por que elegir Seedream?**

- **Red estable en China**: acceso rapido y baja latencia dentro de China.
- **Buenos resultados**: rendimiento estable y fiable en ecommerce y escenarios de material visual.
- **Optimizacion para chino**: comprende mejor prompts en chino, adecuado para usuarios locales.
- **Rapidez**: alta eficiencia de generacion y tiempos de respuesta cortos.
- **Calidad estable**: genera imagenes HD de hasta 4K.

**Escenarios de uso tipicos:**

- Ecommerce: generar imagen principal, imagenes para pagina de detalle y posters promocionales.
- Redes sociales: generar avatar, stickers e imagenes de apoyo.
- Diseno: producir rapidamente conceptos, materiales y fondos.
- Marketing: crear anuncios, banners de campana y posters festivos.

**Combinacion con Qwen3 VL:**

Estas dos APIs pueden encadenarse: primero usar Qwen3 VL para analizar una imagen de referencia y entender su contenido; luego usar Seedream para generar una nueva imagen basandose en el prompt derivado del analisis.
:::

Muchos "posters de IA / imagenes principales de IA / personajes de IA" que ves en Douyin, Bilibili o YouTube usan esencialmente las tecnologias explicadas en esta seccion. Lo que necesitas hacer es sencillo: convertir la entrada del usuario en una frase, solicitar la API de imagenes y mostrar la imagen devuelta. El modelo usado aqui se llama modelo de generacion/edicion de imagenes.

Mostraremos paso a paso como integrar la API de Seedream en tu proyecto, con ayuda del AI IDE.

Tras [visitar la pagina inicial](https://www.volcengine.com/experience/ark?launch=seedream), haz clic en iniciar sesion.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-07.png)

Despues de iniciar sesion, busca la opcion de recarga en la esquina superior derecha.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-22.png)

Para recargar se requiere verificacion de identidad real.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-30.png)

Tras completar la verificacion, puedes [recargar 1 yuan para pruebas](https://console.volcengine.com/finance/fund/recharge).

Vuelve a la [pantalla inicial](https://www.volcengine.com/experience/ark?launch=seedream) y haz clic en acceso API.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-43.png)

Primero crea una API key y luego haz clic en la opcion de seleccion.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-01.png)

Esto te llevara al paso 2. Alli debes confirmar que el servicio llamado es Seedream 4.5 y copiar el ejemplo de llamada proporcionado. La captura es antigua, por eso la version del modelo aun aparece como 4.0.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-11.png)

Despues de preparar la API Key y el ejemplo de llamada, puedes pegarlos directamente en el AI IDE para que genere una demo de interaccion frontend o integre la capacidad en el prototipo existente. Observa que en la pagina puedes elegir entre texto a imagen o generar una sola imagen a partir de varias imagenes; debes seleccionar el codigo de referencia segun tu necesidad actual.

::: warning ⚠️ Nota importante
El ejemplo por defecto aqui es relativamente complejo. Recuerda desactivar **"agregar marca de agua"** y **"respuesta en streaming"** para evitar marcas de agua y posibles fallos de solicitud.
:::

Como luego usaremos el modo de generacion con imagenes de referencia, primero entramos en la funcion de generar una sola imagen a partir de varias imagenes. El codigo de referencia copiado es:

```
curl -X POST https://ark.cn-beijing.volces.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer xxxxxxx" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "Sustituye la ropa de la imagen 1 por la ropa de la imagen 2",
    "image": ["https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_1.png", "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_2.png"],
    "sequential_image_generation": "disabled",
    "response_format": "url",
    "size": "2K",
    "stream": false,
    "watermark": true
}'
```

Con el codigo de referencia de imagenes, pedimos al AI IDE que soporte funciones de imagen comunes en ecommerce:

```
Basandote en la siguiente API, ayudame a implementar en este proyecto funciones comunes de ecommerce, por ejemplo generacion de posters o generacion de imagen principal para ecommerce en Douyin/TikTok.

<Pega aqui la API KEY y el codigo de edicion de imagenes>
```

El resultado implementado queda asi:

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-21-13.png)

Vale la pena notar que la generacion de imagenes suele encontrarse con problemas raros. Te recomendamos pedir al AI IDE que muestre el mensaje de error completo para poder copiarlo y corregirlo; de lo contrario, puede repetir "generacion fallida" sin decir por que. Por ejemplo, puedes decir:

```
No muestres solo "fallo la generacion de imagen". Muestra siempre la razon completa del fallo, por ejemplo imagenes no compatibles, error de solicitud, timeout, etc.
```

A veces los cambios no se aplican en la pagina despues de actualizar. Si ves que la pagina sigue mostrando errores una y otra vez tras modificarla, tambien puedes probar a decir directamente al AI IDE: reinicia este proyecto.

En ecommerce, tal vez queramos que la ropa subida por el usuario se pruebe automaticamente sobre una persona, o generar automaticamente imagenes de venta y posters atractivos para un producto. Aqui probamos un prompt que le pide generar un poster ecommerce:

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-14-10.png)

Puedes usar APIs de texto a imagen o imagen a imagen para implementar distintas funciones segun el escenario de negocio que imagines.

## Mas opciones de servicios de imagen

A continuacion se ofrecen otras opciones. Te recomendamos primero hacer funcionar la generacion de imagenes con Qwen y luego sustituirla por los siguientes servicios segun resultado y coste, de acuerdo con tu experiencia real.

### Integracion de Recraft

Si tu prototipo se orienta mas a "produccion de diseno", por ejemplo generar ilustraciones de estilo de marca, posters de marketing o materiales vectoriales, Recraft suele ser mas comodo. El modo de integracion es identico al de la seccion anterior: **obtener la Key + encontrar el ejemplo oficial + pedir al AI IDE que lleve el ejemplo a tu boton/pagina**.

::: details Saber mas: que es Recraft

> Recraft es una herramienta de IA para disenadores, ilustradores y profesionales de marketing. Fue fundada en Estados Unidos en 2022 y tiene sede en Londres. Ayuda a generar e iterar efectos visuales, como imagenes, arte vectorial y graficos 3D, con ventajas como salidas de alta calidad, posicionamiento preciso de elementos y diseno consistente con la marca. Cuenta con la confianza de mas de 3 millones de usuarios en 200 paises y regiones, incluidos Ogilvy y Netflix, y ya ha creado mas de 350 millones de imagenes. Su equipo busca convertirla en una herramienta imprescindible para disenadores, permitiendo que los creadores controlen sus flujos de trabajo asistidos por IA.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-34.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-42.png)

Primero, todavia necesitamos encontrar la [entrada de API](https://www.recraft.ai/profile/api) para obtener una API Key.

Como aqui no hay cuota gratuita, necesitamos recargar 1,000 creditos. El sitio soporta Alipay y WeChat Pay, asi que es facil obtener esos creditos. Nota: no recargues mas de lo necesario.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image40.png)

Despues seguimos el mismo metodo: ir a la documentacion oficial y encontrar el ejemplo de solicitud correspondiente:

- <https://www.recraft.ai/docs/api-reference/getting-started>
- <https://www.recraft.ai/docs/api-reference/usage>
- <https://www.recraft.ai/docs/api-reference/guides>

:::

### Integracion de Qwen Image / Qwen Image Edit

Si quieres conectar un servicio de generacion de imagenes de una forma mas simple, puedes considerar Qwen Image. La idea no cambia: tratarlo como una "API de generacion de imagenes" y conectarlo al boton de tu prototipo.

::: details Saber mas: que son Qwen Image / Qwen Image Edit

**Qwen Image** es una serie de modelos de generacion de imagenes lanzada por el equipo Tongyi de Alibaba Cloud. Incluye principalmente dos modelos:

**1. Qwen Image: modelo de texto a imagen (Text-to-Image)**

Genera imagenes completamente nuevas a partir de descripciones textuales. Introduces un prompt, el modelo entiende tu intencion y genera una imagen acorde a la descripcion.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-43-30.png)

**Capacidades principales:**

- **Texto a imagen**: genera imagenes a partir de descripciones textuales y soporta varios estilos, como realista, cartoon, tinta china o cyberpunk.
- **Transferencia de estilo**: convierte una imagen a un estilo artistico especificado.
- **Variantes de imagen**: genera nuevas imagenes de estilo similar basadas en una referencia.
- **Mejora de resolucion**: aumenta claridad y detalles.

**2. Qwen Image Edit: modelo de imagen a imagen (Image-to-Image)**

Edita y modifica imagenes existentes. Mediante instrucciones en lenguaje natural, el modelo entiende tu intencion de edicion y genera el resultado.

**Capacidades principales:**

- **Reemplazo local**: sustituye un objeto o una persona en la imagen, por ejemplo "cambia el fondo por la playa".
- **Eliminacion de elementos**: elimina elementos no deseados de la imagen.
- **Cambio de estilo**: anade filtros o efectos artisticos.
- **Expansion de imagen**: extiende los bordes de una imagen y genera nuevo contenido.
- **Retoque inteligente**: embellece automaticamente, ajusta luz y sombras y repara imperfecciones.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-17.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-29.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-33.png)

**Por que elegir la serie Qwen Image?**

- **Optimizacion para chino**: comprende mejor prompts en chino, adecuado para usuarios locales.
- **Bajo coste**: mas asequible que muchos competidores internacionales.
- **Rapidez**: alta eficiencia de generacion y respuesta corta.
- **Calidad estable**: rendimiento fiable en ecommerce y escenarios de material visual.
- **Variedad de estilos**: soporta varios estilos artisticos y efectos creativos.

**Escenarios de uso tipicos:**

- Ecommerce: generar imagen principal, imagenes de detalle y posters promocionales.
- Redes sociales: generar avatar, stickers e imagenes de apoyo.
- Diseno: producir rapidamente conceptos, materiales y fondos.
- Marketing: crear anuncios, banners de campana y posters festivos.
  :::

Consulta el sitio oficial de [SiliconFlow](https://siliconflow.cn/). En la parte izquierda hay una seccion "Playground", donde puedes probar distintos modelos sin hacer llamadas API. En la parte superior de la pagina hay un boton "Filters"; al hacer clic puedes filtrar la lista de modelos de la derecha.

Si eliges "Image", veras solo los modelos de texto a imagen soportados actualmente. En este caso usaremos Qwen/Qwen-Image.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-52-56.png)

Tras completar la configuracion, necesitamos consultar la documentacion correspondiente de API de generacion de imagenes. En la documentacion oficial puedes encontrar una seccion marcada como "API Reference". Haz clic alli, navega a la [seccion de API de generacion de imagenes](https://docs.siliconflow.cn/cn/api-reference/images/images-generations) y busca el ejemplo de solicitud correspondiente.

Puedes enviar el siguiente ejemplo de solicitud junto con la API KEY al AI IDE para implementar la funcion de generacion de imagenes.

```bash
curl --request POST \
  --url https://api.siliconflow.cn/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "Qwen/Qwen-Image-Edit-2509",
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
}
'
```

El modelo aqui puede ser Qwen/Qwen-Image o Qwen/Qwen-Image-Edit-2509.

::: details Codigo de referencia para edicion de imagenes

Copia el siguiente codigo y la key, y envialos juntos al AI IDE:

```python
import requests
import os
from typing import Dict, Any, Optional

SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/images/generations"
QWEN_IMAGE_EDIT_MODEL: str = "Qwen/Qwen-Image-Edit-2509"

def generate_image_edit(
    prompt: str,
    image: Optional[str] = None,
    image2: Optional[str] = None,
    image3: Optional[str] = None,
    negative_prompt: Optional[str] = None,
    cfg: Optional[float] = 4.0,
    seed: Optional[int] = None
) -> Optional[Dict[str, Any]]:
    payload: Dict[str, Any] = {
        "model": QWEN_IMAGE_EDIT_MODEL,
        "prompt": prompt,
    }
    if image:
        payload["image"] = image
    if image2:
        payload["image2"] = image2
    if image3:
        payload["image3"] = image3
    if negative_prompt:
        payload["negative_prompt"] = negative_prompt
    if cfg is not None:
        payload["cfg"] = cfg
    if seed is not None:
        payload["seed"] = seed

    headers: Dict[str, str] = {
        "Authorization": f"Bearer {SILICONFLOW_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SILICONFLOW_BASE_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error generating image: {e}")
        return None

def save_image_from_url(image_url: str, output_path: str = "image.png") -> bool:
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else ".", exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"Image saved successfully to: {output_path}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return False
    except Exception as e:
        print(f"Error saving image: {e}")
        return False

prompt: str = "Convierte el cielo en un atardecer, con luna y estrellas, estilo onirico"
negative_prompt: str = "borroso, baja calidad, deformado"
image_url: str = "https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641"
image2_url: Optional[str] = None
image3_url: Optional[str] = None

cfg: float = 4.0
seed: int = 12345
output_path: str = "edited_image.png"

print(f"Generating edited image with prompt: {prompt}")
print(f"Input image: {image_url}")
print(f"CFG: {cfg}, Seed: {seed}")
print("-" * 50)

result = generate_image_edit(
    prompt=prompt,
    image=image_url,
    image2=image2_url,
    image3=image3_url,
    negative_prompt=negative_prompt,
    cfg=cfg,
    seed=seed
)

if result and "images" in result:
    images = result["images"]
    if images and len(images) > 0:
        image_url_result = images[0]["url"]
        print(f"Image edit generated successfully. URL: {image_url_result}")
        success = save_image_from_url(image_url_result, output_path)
        if success:
            print(f"Image saved to: {output_path}")
        else:
            print("Failed to save image to local file")
    else:
        print("No images found in response")
else:
    print("Image generation failed")
    if result:
        print(f"Response: {result}")
```

:::

# Apendice: como encontrar modelos de IA "mas fuertes actualmente"

Los modelos de texto, tambien llamados con frecuencia "modelos de lenguaje grandes", evolucionan muy rapido. Siempre necesitamos asegurarnos de usar uno de los modelos con mejor rendimiento. Con los dos sitios siguientes puedes ver facilmente que modelos son mas usados y mejor valorados actualmente.

En general, estos sitios pueden entenderse como **"arenas de modelos"**: ponen juntas las salidas de dos modelos y votas por la que prefieres. Un modelo con mas votos suele significar que mas personas lo consideran "mas util".

Ademas, a veces puedes ver modelos anonimos misteriosos ("Unknown Model") en estas arenas. Normalmente significa que alguien ha incluido discretamente un "modelo interno de prueba" para evaluacion ciega, y tal vez tengas la oportunidad de experimentar capacidades mas fuertes antes de tiempo.

## LMArena

Sitio web: <https://lmarena.ai/>

LMArena es mas adecuado para juzgar "que respuesta de modelo prefiere la mayoria". Cuantos mas votos y mayor puntuacion, normalmente mas estable es en escenarios reales.

Una forma simple de usarlo:

1. Mira directamente el ranking (Leaderboard)
2. Elige primero el area que necesitas, por ejemplo conversacion general, programacion o vision
3. Dentro del Top 3, elige el que puedas usar: accesible, coste aceptable y latencia aceptable

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image.png)

## Artificial Analysis

Sitio web: <https://artificialanalysis.ai/>

Artificial Analysis es mas adecuado para comparar "calidad / precio / velocidad" en una misma tabla. Puedes tratarlo como una tabla de parametros para seleccionar modelos.

Uso habitual:

1. Encuentra la categoria de modelo que te interesa, por ejemplo texto o generacion de imagenes
2. Revisa calidad (Quality) + precio (Price) + latencia/throughput (Latency/Throughput)
3. Elige el modelo cuya relacion global coste-rendimiento encaje mejor con tu producto

::: tip ✅ Recomendacion
No discutas "cual es mas fuerte" solo por intuicion. Un metodo mas fiable es probar 2 o 3 modelos con el mismo conjunto de entradas y luego decidir combinando ranking y precio.
:::

## Resumen

Al integrar distintos servicios de IA, no hace falta imaginar las APIs como algo demasiado complejo. Si dominas los siguientes conceptos centrales, podras manejar la mayoria de escenarios:

**La esencia de una API es ser un puente de comunicacion**. Hace algo muy simple: envia tu solicitud y trae de vuelta la respuesta del modelo. No necesitas preocuparte por lo que ocurre detras; solo debes organizar correctamente el formato de la solicitud.

**Un SDK es una capa de encapsulacion sobre la API**. Si la API es una interfaz raw, el SDK es una caja de herramientas lista para usar: se encarga de detalles tediosos como firma de solicitudes, manejo de errores y validacion de parametros. En el desarrollo diario, priorizar SDK frente a llamadas API directas ahorra muchos problemas.

**Al leer documentacion, basta con fijarse en tres cosas**: direccion del servicio (endpoint), credencial de identidad (API key) y como rellenar los parametros de llamada. Si entiendes estas tres cosas, hacer funcionar la llamada es cuestion de tiempo.

El resto del trabajo lo completaran el IDE y las herramientas modernas de desarrollo. Concetrate en tu logica de negocio y deja las llamadas de bajo nivel a SDKs y toolchains maduros.

# 5. 📚 Tarea: integra tu primera capacidad de IA

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Reto: integrar capacidades de IA en tu workspace</div>
  </template>

  <p>
    Toma como referencia los prompts y contenidos de esta leccion y completa un ciclo cerrado:
  </p>

  <ul>
    <li>
      <strong>Practica de ciclo completo</strong>
      <ul>
        <li>Elige e integra un servicio de IA (LLM / texto a imagen / imagen a imagen) → implementa interaccion frontend-backend → integralo en tu prototipo</li>
      </ul>
    </li>
    <li>
      <strong>Compartir resultados</strong>
      <ul>
        <li>Captura la pagina de tu funcion y compartela con los demas</li>
      </ul>
    </li>
    <li>
      <strong>Pregunta de reflexion</strong>
      <ul>
        <li>Reserva espacio mental para la siguiente seccion, "practica de proyecto completo": piensa de antemano como combinar estas capacidades de IA y que funcion interesante quieres crear.</li>
      </ul>
    </li>
  </ul>
</el-card>

## Siguiente paso

En la siguiente seccion conectaremos estas capacidades de IA dispersas y las combinaremos con un escenario de negocio real para construir un producto completo:

- Conectar planificacion de contenido, publicacion de productos, analisis de datos y otros pasos en un flujo de negocio completo
- Integrar las capacidades de IA aprendidas en esta leccion, como generacion de copy con LLM, texto a imagen y edicion de imagenes, en nodos reales del negocio
- Implementar un "workspace de IA para ecommerce" realmente utilizable, no una demo aislada

<RelatedArticlesSection
  title="Articulos relacionados"
  description="Ruta recomendada para pasar de capacidades de IA puntuales a un flujo completo de producto."
  :items="relatedArticles"
/>
