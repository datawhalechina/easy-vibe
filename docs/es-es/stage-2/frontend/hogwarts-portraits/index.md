# Proyecto 4: Creemos juntos los Retratos de Hogwarts

En las lecciones anteriores, ya aprendimos a implementar interacciones AI más complejas basadas en prompt engineering y llamadas a APIs. Pudimos evolucionar un simple chatbot AI hacia un AI Agent y AI workflow; a través de lógica condicional y ramificaciones más complejas, logramos desarrollar funcionalidades con mayor utilidad práctica.

Para que estas lógicas AI complejas funcionen mejor en diferentes programas y escenarios de aplicación reales, pasamos del entorno en línea más simple de z.ai a un AI IDE local más moderno, trasladando el entorno de programación que estaba en el navegador a tu computadora. Con esto, empezaste a enfrentar realmente diversos problemas de instalación y configuración de entornos, pero durante las conversaciones con el Agente Trae, estos desafíos aparentemente difíciles se vuelven manejables.

En este proyecto, daremos un paso más allá en la utilidad de la aplicación, no solo optimizando la funcionalidad AI en sí, sino que también empezaremos a pulir la "apariencia" del producto. Intentarás hacer tu interfaz más bonita y fácil de usar, y personalizarás el layout y estilo de la interfaz según las necesidades reales.

Antes de empezar oficialmente, usemos un pequeño cuestionario para repasar rápidamente el contenido de la lección anterior:

1. ¿Qué es Dify? ¿Qué hace? ¿Por qué lo necesitamos?
2. ¿Cómo llamar a la API de Dify?
3. ¿Qué es RAG? ¿Cómo usar Dify para construir un RAG Agent o un workflow RAG? ¿Cómo usar los nodos comunes de Dify?
4. ¿Qué es un AI IDE? ¿Qué es Trae? ¿Qué diferencia hay con z.ai?

Si tienes dudas sobre alguna de estas preguntas, puedes repasar la documentación de la lección anterior o preguntar directamente en el grupo de WeChat.

El tema del proyecto de esta lección es **Hogwarts Portraits** (Retratos de Hogwarts). Como su nombre indica, se inspira en los retratos que "cobran vida" en la escuela de magia Hogwarts. Queremos usar AI para crear una experiencia de retratos mágicos "interactivos" — hablar con un retrato es como hablar con la "persona real", conservando la memoria de la conversación y el trasfondo e historia del personaje. Con este proyecto, integrarás realmente los agentes y workflows que aprendiste antes en una interfaz de producto concreta.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Para crear realmente los Retratos de Hogwarts, necesitamos construir una interfaz frontend que se ajuste a los retratos mágicos. Para ello, empezarás a conocer las herramientas modernas de diseño frontend, aprenderás a combinar el diseño de interfaces con código, transformando los bocetos de interfaz en papel o lienzo en páginas web realmente funcionales.

También necesitarás aprender a publicar esta página web desde tu entorno local a Internet, para que la página web especial que creaste no solo funcione en tu computadora, sino que pueda ser visitada y experimentada por usuarios de todo el mundo.

La dirección del proyecto de referencia de esta lección es: [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# Lo que aprenderás

1. Conocer qué son las herramientas de diseño frontend, qué problemas resuelven y cuáles son las más comunes actualmente.
2. Familiarizarte con Figma y MasterGo, dominar sus operaciones básicas y aprender a usar plugins de exportación de código frontend.
3. Usar Figma AI y MasterGo AI para generar diseños web y exportar código de páginas utilizable.
4. Entender qué es GitHub, aprender a configurar conexiones SSH, crear repositorios de código y hacer push de código.
5. Comprender el concepto de "despliegue", aprender a usar Zeabur para desplegar código desde GitHub o entorno local a Internet.

Tu propio Hogwarts Portraits, una interfaz web para mostrar **alguna celebridad, personaje histórico o personaje de animación**.

# 1. Hogwarts Portraits

¿Qué tipo de "retrato mágico" queremos crear? En pocas palabras, esperamos recrear lo más fielmente posible la escena de Harry Potter, donde los retratos ya no son solo imágenes estáticas colgadas en la pared, sino personajes antropomórficos con los que puedes conversar y que cambian de expresión y "estado de ánimo" según el contenido de la conversación.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

Para que este retrato no parezca un chatbot AI, sino que se acerque más a una "persona real", necesitamos resolver dos problemas. El primero es la memoria y el conocimiento: el retrato debe dominar una gran cantidad de información de fondo relacionada con el personaje (configuración del personaje, historia, artículos relacionados). Esta parte se puede implementar a través de una base de conocimiento, conectando los materiales textuales que prepares para el personaje a un Dify que incluya dicha base de conocimiento, permitiendo al retrato tener cierta capacidad de explicación del conocimiento de fondo.

El segundo problema es el estilo de expresión. Solo con el conocimiento no basta; también queremos que su forma de hablar se acerque lo más posible a la "persona real", incluyendo el tono, hábitos de vocabulario, forma de pensar e incluso su temperamento y sentido del humor ocasionales. Esta capa necesita manejarse a través de prompt engineering: en el system prompt, necesitamos definir claramente la identidad del personaje, los límites de su visión del mundo y el estilo lingüístico, para que cada respuesta gire en torno al personaje establecido, en lugar de retroceder a la retórica neutral de una AI genérica.

Además de la funcionalidad de diálogo, también queremos que las emociones sean realmente visibles. Para ello, podemos construir un indicador de valor emocional. Podemos configurar la salida de Dify para que el modelo genere texto de respuesta y, adicionalmente, produzca un "valor de humor" o etiqueta emocional. Cuando el frontend reciba el indicador emocional, podrá renderizar la imagen del retrato correspondiente según el valor de humor o la etiqueta. Cuando el valor es alto, el retrato se ve feliz; cuando está bajo o enojado, el retrato se ve triste o furioso. De esta manera, lo que ve el usuario ya no es una imagen que nunca cambia, sino un verdadero "retrato mágico" que "cambia de expresión" según el contenido de la conversación.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

Además, el contenido de este retrato puede ser una celebridad real, un personaje histórico, un IP de anime o incluso un personaje original que construyas desde cero. La página en sí no necesita ser compleja, pero varios elementos centrales son indispensables: un nombre de personaje claro, una breve biografía muy condensada, una imagen o póster que represente adecuadamente al personaje, y un área interactiva de "hablar con él/ella"; puedes conectar el AI Agent o workflow que hayas configurado en Dify/Trae a este módulo de diálogo para implementar la funcionalidad de role-play del retrato.

## 1.2 Recopilar información del personaje

Tomando a Elon Musk como ejemplo, necesitamos recopilar sus declaraciones públicas para imitar su forma de hablar e inyectarlas en el prompt. Estos materiales pueden venir de discursos, entrevistas o publicaciones en redes sociales. Solo necesitas convertir este contenido en texto y usarlo como referencia de few shot durante la conversación, para que el LLM responda de la misma manera casual y autocrítica que Elon Musk. Por ejemplo:

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

Para recopilar el conocimiento de fondo y usarlo como base de conocimiento, podemos buscar su biografía y la información de sus empresas, copiar todo el texto y añadirlo como contenido de la base de conocimiento en Dify. Si olvidaste cómo usar Dify, vuelve a la documentación de la lección anterior y reaprende cómo añadir conocimiento a la base de conocimiento.

Además, considerando el diseño del retrato, usar imágenes públicas del personaje puede no ser tan atractivo y puede conllevar ciertos riesgos. En este caso, te recomendamos usar la funcionalidad de imagen a imagen de herramientas de generación de imágenes para que la AI devuelva retratos en alta resolución y calidad. También puedes usar herramientas de generación de imágenes para crear una serie de materiales con diferentes expresiones, que se usarán más adelante para modificar la presentación del retrato cuando cambie el valor emocional.

En este tutorial usamos [Lovart](https://www.lovart.ai/home). Lovart es un agente de diseño AI que, a través de instrucciones en lenguaje natural, planifica y ejecuta automáticamente flujos de trabajo de diseño de extremo a extremo, desde el concepto hasta la entrega, generando pósters, logos de marca, videos, música y otros contenidos, con soporte para edición por capas. A través de Lovart, podemos obtener una serie de materiales de expresiones; puedes obtener imágenes de tus personajes favoritos con anticipación y guardarlas para uso posterior.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

Una vez que todo esté listo, podemos empezar a trabajar en el diseño de la página completa. Queremos que el estilo de esta página esté altamente vinculado al personaje.

## 1.3 Diseño del prototipo de página

También podemos primero concebir el prototipo de la página. Como mencionamos anteriormente, queremos una página de diálogo con un retrato y una presentación personal interesante. En este ejemplo, implementamos una interfaz de diálogo similar a X en lugar de la presentación personal; también puedes pensar en otras formas que se ajusten a "las características del personaje" y seleccionar nuevos elementos para reemplazar la sección de presentación personal.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

Lo más simple es que podemos usar PowerPoint para diseñar el primer prototipo visual de la página web. Buscamos en Internet una imagen de retrato mágico y configuramos la pantalla en disposición horizontal: el extremo izquierdo como área de chat, el centro como área del retrato y el extremo derecho como área de X.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

Basándonos en este prototipo simple, podemos hacer que el LLM genere un diseño de página frontend real y el código correspondiente.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

Sin embargo, en la práctica generalmente no usamos PowerPoint para el diseño de páginas frontend. Usaríamos mejores herramientas de prototipado, o herramientas de diseño frontend para implementar esto.

---

# 2. Diseñar la interfaz con Figma y MasterGo

::: tip 📚 Conocimientos previos
Antes de comenzar esta sección, te recomendamos estudiar primero el tutorial [Introducción a Figma y MasterGo](../figma-mastergo/) para dominar las operaciones básicas de las herramientas de diseño frontend, incluyendo:
- Crear archivos Design y Frame
- Usar Auto Layout para layouts adaptativos
- Métodos para exportar código desde mockups
:::

Esta sección asume que ya dominas las operaciones básicas de Figma o MasterGo. Nos enfocaremos en cómo aplicar estas herramientas al proyecto Hogwarts Portraits.

## 2.1 Diseñar la interfaz del retrato mágico

Basándonos en el concepto de prototipo de la sección 1.3, necesitamos crear una interfaz con layout de tres columnas en Figma o MasterGo:

1. **Izquierda**: Área de chat y diálogo
2. **Centro**: Área de exhibición del retrato mágico (cambiará según las emociones)
3. **Derecha**: Área de exhibición de la plataforma social del personaje (como timeline de X)

Puedes usar la funcionalidad AI de Figma (Figma Make) o la función de generación de páginas con AI de MasterGo, ingresando un prompt similar al siguiente:

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 Exportar código y ejecutar localmente

Una vez completado el diseño, puedes convertir los mockups en código ejecutable de las siguientes maneras:

**Método 1: Usar Figma Make**
1. Hacer clic en el botón Make en Figma
2. Subir tu imagen de referencia de diseño
3. Agregar un prompt describiendo los requerimientos
4. Después de generar, hacer clic en el icono del editor para ajustes finos
5. Exportar código a local o sincronizar con GitHub

**Método 2: Usar MasterGo AI**
1. Encontrar la herramienta AI en la barra superior de la interfaz de edición de MasterGo
2. Seleccionar la función "Generar página"
3. Subir imagen de referencia y describir requerimientos
4. Después de generar, hacer clic en "Vista previa de código" para obtener el código

**Método 3: Usar AI multimodal**
1. Guardar una captura del mockup
2. Usar modelos como Gemini o Qwen para convertir imagen a código
3. Solicitar generación de código HTML o React
4. Ejecutar y depurar en tu IDE local

## 2.3 Preparar materiales de cambio de emociones

Para que el retrato mágico "cobr vida", necesitas preparar un conjunto de imágenes de expresiones. Se recomienda incluir al menos las siguientes emociones:

| Valor emocional | Expresión | Descripción |
|--------|------|------|
| 0 | Tristeza | El personaje se siente triste o decepcionado |
| 1 | Enfado | El personaje se siente enojado o insatisfecho |
| 5 | Calma | Estado por defecto, emoción estable |
| 10 | Felicidad | El personaje se siente alegre o emocionado |

Puedes usar Lovart u otras herramientas de generación de imágenes AI para generar variantes de expresiones basadas en el mismo personaje, asegurando consistencia de estilo.

---

# 3. Ejecutar Hogwarts Portraits

## 3.1 Exportar código de prueba

A través de la práctica de prototipo a código, seguramente ya tienes código de prototipo en formato HTML o React. Solo necesitamos copiarlo a local, indicar en el IDE "Por favor, ayúdame a ejecutar este código y soporta las funciones necesarias", para poder ejecutar la primera versión de prueba. Vale la pena señalar que este paso a menudo produce bastantes errores; necesitas mantener la paciencia y hacer que todas las interacciones básicas y funciones funcionen correctamente.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

Es importante destacar que, como nuestras claves deben guardarse en variables de entorno y no en el código, debemos enfatizar especialmente que todo el contenido relacionado con la API de Dify debe colocarse en variables de entorno. En la sección de despliegue público posterior, podremos especificar explícitamente las variables de entorno privadas en el sitio de la herramienta de despliegue; o bien podemos pedirle al LLM que cree un botón de configuración en la página web donde podamos ingresar las variables de entorno privadas. Estas variables solo se guardan en la página actual y no son accesibles por otros.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Diseño del workflow de Dify y conexión con la API

En la sección anterior, solo completamos la presentación visual de la interfaz frontend, sin conectar el flujo de interacción de diálogo con el personaje antropomórfico. Este paso es clave para transformar el prototipo de una exhibición estática a un retrato mágico. Podemos referirnos al workflow de Dify del proyecto de demostración para diseñar las respuestas del personaje y el sistema de emociones. Aquí, nuestro diseño es: el extremo izquierdo es la interfaz de chat, el centro es el retrato mágico (cambia de expresión según el contenido del diálogo), y la derecha es la cuenta de la plataforma social X (decide si necesita publicar reflexiones en la cuenta social según el contenido del diálogo).

Generalmente, un retrato mágico solo necesita la interfaz de chat y el retrato que cambia. Aquí, para mostrar más opciones posibles, se añadió una nueva función en el extremo derecho que se ajusta a las características del personaje. Puedes añadir funciones que se ajusten al personaje que estás interpretando.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

Puedes añadir toda la información de la tarea al nodo de la base de conocimiento y configurar la lógica de respuesta correspondiente del LLM en el nodo RESPONSE. Podemos referirnos a un prompt de lógica de respuesta por defecto simple:

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

Y el prompt correspondiente al sistema de emociones:

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

La concatenación del resultado final se soporta ejecutando en el nodo RESULT de la esquina superior derecha:

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

Aquí necesitamos explicar brevemente el workflow: el retorno de `elon_chat` es el contenido del diálogo de Elon Musk que se muestra a la izquierda, `elon_x` representa el contenido publicado en la cuenta de X (derecha), y `elon_score` se usa para mostrar diferentes imágenes de expresión del retrato mágico según la puntuación emocional.

En el workflow puedes ver un nodo if-else que implementa si hay contenido de diálogo en X generando `elon_x`. Si el valor emocional no es igual a 5 (5 aquí se define como calma; la calma no necesita publicarse en la plataforma social; mientras que 0 significa tristeza, 1 significa enfado y 10 significa mucha felicidad, que sí necesitan publicarse), se genera contenido para el envío de artículos en la plataforma social derecha. Por defecto, siempre debe haber un `elon_chat` que retorna al contenido del diálogo izquierdo.

Para el trabajo de conectar esta API, podemos implementarlo dialogando con el AI IDE. Por favor, refiérete al método de integración que presentamos en la lección anterior de Dify, y recuerda reemplazar la dirección y la clave de Dify con anticipación. (Si olvidaste cómo integrar la API según la documentación, repasa el contenido de la lección anterior de Dify.)

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

También se recomienda agregar este requerimiento: "El código también necesita incluir lógica básica de manejo de errores, como mostrar 'Error de conexión, por favor intenta de nuevo' cuando se interrumpe la red, reintentar automáticamente 1 vez cuando la llamada a la API expira, mostrar error de verificación de permisos cuando la clave es incorrecta, etc., para asegurar la estabilidad del diálogo y permitir a los desarrolladores identificar rápidamente los problemas de la API."

## 3.3 GitHub y despliegue público

Finalmente, felicidades por completar exitosamente la implementación de la página de Hogwarts Portraits. Ahora necesitamos subirla a la plataforma GitHub y desplegarla en un entorno público para que todos puedan acceder.

Necesitas consultar este tutorial para investigar cómo usar GitHub y subir tu proyecto: [¿Qué es GitHub?](/es-es/stage-2/backend/git-workflow/)

Además, necesitas aprender a usar Zeabur, conectarlo con GitHub y desplegar exitosamente tu proyecto: [¿Qué es Zeabur?](/es-es/stage-2/backend/zeabur-deployment/)

Si sientes que desarrollar un proyecto de Hogwarts Portraits desde cero es muy difícil, puedes empezar modificando un proyecto existente. La dirección del código oficial de esta lección es: https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. Prueba diferentes estilos de diseño

Después de completar la primera versión del diseño, no necesitamos limitarnos a ella. Te animamos a explorar rápidamente estilos visuales más diversos. Puedes hacer cambios audaces en la parte del prototipo, o basarte en el proyecto final para modificar los prompts y generar múltiples páginas con estilos marcadamente diferentes. Por ejemplo, una página oscura con texturas retro y estilo "libro antiguo / académico", una página clara con colores vibrantes y sensación de "cuento de hadas / caricatura", o un diseño plano moderno con elementos minimalistas y visualmente limpio. Por ejemplo, la siguiente imagen muestra un caso convertido a un estilo de diseño de poeta clásico chino; solo se modificaron las demás partes, sin cambiar las imágenes del retrato:

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

No te limites a los patrones mencionados anteriormente. Puedes modificar el retrato mágico o la página de perfil para que sea más distintiva y se ajuste a los hábitos del "retrato mágico" en sí. Esto hará que tu aplicación sea más interesante. Esperamos ver tus resultados de retratos mágicos.

# 📚 Tarea

El objetivo de la tarea de esta lección es que completes un Hogwarts Portraits verdaderamente tuyo, accesible a través de un enlace público.

Necesitas proporcionar dos cosas en la entrega:

1. **El enlace de tu repositorio de GitHub;**
   1. **Escribe una o dos frases en el README.md explicando: a quién elegiste como protagonista del retrato y por qué lo/la elegiste.**
2. **El enlace de acceso en línea de tus Hogwarts Portraits;**

También puedes consultar el tutorial de Yerim sobre [crear páginas web con agentes de diseño y código](/es-es/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) para construir rápidamente un portfolio personal o cualquier página web simple.
