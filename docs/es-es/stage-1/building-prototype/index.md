---
title: 'Construyendo un prototipo - Del analisis de negocio al prototipo multipagina'
description: 'Experimenta el ciclo completo desde el analisis de negocio hasta la implementacion de un prototipo de producto multipagina.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Aproximadamente <strong>8 horas</strong>'
const relatedArticles =
  relatedArticlesMap['es-es/stage-1/building-prototype'] ?? []
</script>

# Construyendo un prototipo

## Resumen del capitulo

<ChapterIntroduction :duration="duration" :tags="['Analisis de negocio', 'Diseno de prototipo', 'Programacion asistida por IA', 'Aplicacion multipagina']" coreOutput="1 prototipo de espacio de trabajo de materiales de e-commerce" expectedOutput="Prototipo web interactivo">

En el capitulo anterior, aprendimos como <strong>encontrar buenas ideas</strong>: partiendo de las necesidades de los usuarios, encontrar direcciones por las que alguien este dispuesto a pagar. Pero encontrar la direccion es solo el primer paso; <strong>lo que realmente pone a prueba al product manager es: como convertir necesidades vagas en un producto util.</strong>

Este capitulo va a resolver un <strong>problema real</strong>: tu jefe te dice "usa IA para mejorar la eficiencia de publicar productos en plataformas de e-commerce" -- como lo conviertes en un <strong>prototipo de producto util</strong>?

A diferencia de hacer un juego de Snake o una calculadora, <strong>en negocios reales no puedes inventar funcionalidades de la nada</strong>:

1. <strong>Aclarar los puntos de dolor</strong>: hablar con el equipo de operaciones, extraer de la vaga "mejorar la eficiencia" los <strong>verdaderos puntos de dolor</strong>
2. <strong>Elegir lo mas importante</strong>: de todos los problemas, resolver primero <strong>el mas doloroso</strong>, sin intentar hacer todo de una vez
3. <strong>Validar rapidamente</strong>: usar el AI IDE para hacer primero un <strong>prototipo de una sola pagina</strong>, y una vez que funcione, expandirlo a multipagina
4. <strong>Hacer algo util</strong>: entregar finalmente un <strong>espacio de trabajo de materiales de e-commerce que se pueda demostrar y operar</strong>

Aprenderemos la <strong>transicion de hacer juguetes a hacer aplicaciones</strong>, y a <strong>empatizar y pensar en las necesidades reales de los clientes</strong>.

</ChapterIntroduction>

::: info Nota
En este capitulo pueden aparecer terminos de negocio. Si no los entiendes, puedes preguntar a la IA para obtener una explicacion.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Analisis de necesidades', description: 'De lo vago a lo concreto' },
      { title: 'Validacion de una pagina', description: 'La funcionalidad central toma forma' },
      { title: 'Expansion multipagina', description: 'Completar la estructura de la aplicacion' },
      { title: 'Mejora estetica', description: 'Mejorar la experiencia del usuario' }
    ]" />
  </ClientOnly>
</div>

## 1. Definir los requisitos antes de escribir codigo

En los tutoriales anteriores, usamos AI IDE para generar facilmente el juego de Snake y otros juegos pequenos, pero estos solo pueden considerarse proyectos de juguete y no se pueden aplicar al trabajo y la vida cotidiana. Si queremos que las capacidades de IA sean realmente utiles para todos, deberiamos combinar la programacion Vibe Coding con escenarios de la vida real y del trabajo.

En el capitulo anterior aprendimos como encontrar <strong>buenas ideas por las que la gente este dispuesta a pagar</strong>, pero encontrar la direccion es solo el comienzo. Cuando realmente haces un producto, descubres que: <strong>saber "que hacer" y saber "como hacerlo" tienen una enorme brecha entre ellos.</strong>

Esta brecha es la <strong>concrecion de los requisitos</strong>.

Por ejemplo, en clase o en proyectos personales, a menudo empezamos con la funcion ejecutable mas simple:

- "Haz un tablero kanban, pon las tareas en una lista."
- "Hazme una herramienta de dibujo."
- "Hazme un software para recoger cuestionarios."

Estas a menudo son solo una herramienta, un modulo funcional, ni siquiera pueden considerarse un problema de negocio claro. Lo mas critico es que <strong>estas ideas a menudo son solo "tu crees que son utiles", no "los usuarios realmente las necesitan".</strong>

En proyectos empresariales o de startup, los product managers e ingenieros suelen partir de una proposicion de negocio mas grande. Por ejemplo, podemos suponer este escenario:

<el-card shadow="hover" style="border-left: 5px solid #409EFF; background-color: #ecf5ff; margin: 20px 0;">
  <div style="font-weight: bold; color: #303133; margin-bottom: 10px;">Escenario de negocio:</div>
  <div style="color: #606266; line-height: 1.6;">
    <p>Eres el product manager de operaciones de e-commerce de una tienda. Tu jefe te ha dado una proposition vaga pero con mucha presion:</p>
    <p style="font-style: italic; margin-top: 10px;">"Ahora todo el mundo en las cuentas oficiales esta usando IA para hacer imagenes y textos, parece muy facil. Ayudame con esto, para que seamos mas eficientes cuando subamos productos nuevos al e-commerce de TikTok."</p>
  </div>
</el-card>

En este momento puedes pensar: "Jefe, estas sonando otra vez!" Sin embargo, en el trabajo real, este tipo de decisiones vagas con una sola frase son muy comunes, incluso mas frecuentes que las veces que pides te con leche a la semana. Por lo tanto, para ser un buen profesional (y mas aun si eres el CEO de una nueva startup), debemos aprender a pasar de hacer herramientas para nosotros mismos a hacer prototipos de productos reales.

Como hemos aprendido AI IDE, si lo piensas bien, este requisito es bastante simple: solo tienes que darle un prompt a la IA basado en esto, pasarlo al Agent y ya esta, no?

```
Por favor refierete a mi necesidad xxxx,
ayudame a disenar un espacio de trabajo de materiales de e-commerce,
que incluya funciones de generacion y gestion de materiales como descripciones de productos, imagenes y videos.
```

Si emocionado conviertes directamente este requisito en un prototipo y se lo envias al jefe -- felicidades, tu bonificacion de este trimestre acaba de ser cancelada!

**Por que? Este es el punto de dolor central que vamos a resolver:**

Antes aprendimos AI IDE haciendo proyectos de juguete como el juego de Snake o una calculadora -- funcionalidades simples, tu sabes lo que quieres, y lo haces para ti mismo. Pero **los escenarios de negocio reales son completamente diferentes**:

- **Tu no eres el usuario**: el jefe quiere "mejorar la eficiencia", pero no sabes como trabaja exactamente el equipo de operaciones cada dia ni donde se atascan;
- **La IA tampoco entiende el negocio**: si le das a la IA un requisito vago, solo puede adivinar basandose en conocimientos generales. Lo que produce puede parecer correcto, pero en realidad no se puede usar;
- **Una buena idea no equivale a un buen producto**: crees que "anadir una funcion de generacion con IA" es genial, pero los usuarios puede que no lo necesiten, o que sea mas complicado de usar que antes.

**Por eso debemos aprender a "pasar de tener una idea a entender a los usuarios"** Solo cuando tu creatividad resuelve realmente los problemas de los demas, cuando preguntas, cuando profundizas en el entendimiento del negocio, puedes crear algo verdaderamente valioso. (Una buena idea puede ser incluso mas importante que una buena tecnologia).

### 1.1 De la imaginacion a la realidad: aprender a hacer preguntas sobre el negocio

::: info Primero aclaremos: que es un requisito? Que es un negocio?

Un **requisito** es lo que el usuario realmente quiere, los problemas que encuentra, lo que quiere resolver. Por ejemplo, "el jefe quiere que publique productos mas rapido", eso es un requisito.

Un **negocio** es lo que los usuarios hacen realmente cada dia, su forma de trabajar. Por ejemplo, lo que hace el equipo de operaciones de e-commerce cada dia: publicar productos, cambiar precios, hacer imagenes, ver datos... todo esto es negocio.

**Por que prestar atencion al negocio?**
Porque si no entiendes el negocio, la herramienta que hagas puede ser "parece buena, pero nadie la usa". Solo entendiendo realmente como trabajan los usuarios cada dia y donde se atascan, puedes hacer algo que realmente les ayude.

:::

Desde la perspectiva mas simple, puedes empezar por preguntarte:

- Cuando el jefe dice "**mas eficiencia**", que significa exactamente? Quiere **hacerlo mas rapido**? O quiere **gastar menos**? O quiere **vender mas**?
- Como se publican los productos ahora? **Donde esta el problema**?
- Cuantos **productos nuevos** hay que hacer cada dia? Cuantas **imagenes** y cuanto **texto** por producto?
- En el trabajo actual, **que es lo mas molesto**, **lo que menos quieres hacer**?

Pero estas son preguntas que suponemos; debemos preguntar directamente al equipo de operaciones de e-commerce de primera linea: "Cuales son sus dificultades y en que se enfocan?" A traves de la comunicacion, obtendremos respuestas mas precisas:

::: info Resultado de la entrevista real de negocio

Preguntamos a personas que hacen operaciones de e-commerce, y nos contaron estas frustraciones:

**1. Demasiadas cosas y muy dispersas**
- Una persona tiene que gestionar varias tiendas, cada tienda tiene muchos productos que preparar;
- Cada dia va de aqui para alla: **publicar productos nuevos**, **cambiar precios**, **hacer imagenes**, **ver datos**; una cosa no termina y ya hay que hacer otra.

**2. Hacer contenido no es hacerlo bien de una vez, sino ir probando**
- Primero usan **las imagenes del fabricante**, **materiales usados antes** o **imagenes de referencia encontradas en internet** para **publicar** rapidamente el producto y probar;
- Gastan un poco en promocion para **ver si alguien compra**;
- Solo para los **productos que venden bien**, se toman el tiempo de hacer buenas imagenes, escribir descripciones detalladas y grabar videos.

:::
Despues de entrevistar al equipo de negocio, sentimos entusiasmo, porque ahora realmente podemos hacer un prototipo perfecto que se ajuste al negocio! -- Nos equivocamos de nuevo. Si intentamos "satisfacer todas las demandas de una vez", el producto sera muy grande y dificil de implementar dentro del tiempo del curso. Por lo tanto, necesitamos organizar y priorizar aun mas, para encontrar el verdadero punto de dolor central.

### 1.2 De la divergencia a la convergencia: identificar el punto de dolor central y la funcionalidad del negocio

::: info Por que "converger"? Que es un "punto de dolor"?

**Hay muchos problemas, pero cual hacemos primero?**

Los usuarios pueden contarte un monton de problemas: A tambien es molesto, B tambien es molesto, C tambien... Pero si intentas resolver todos los problemas a la vez, probablemente no hagas bien ninguno. Por eso hay que **converger**: elegir de todos los problemas el **mas doloroso, el mas urgente y el mas resoluble** para empezar.

**Que es un punto de dolor?**
Es el problema concreto que los usuarios **mas odian, en el que mas tiempo gastan y que mas quieren resolver**. No es "me parece util", sino algo de lo que los usuarios **se quejan todos los dias y que les duele cada vez que hacen**.

:::

A traves de la entrevista anterior, descubrimos que las operaciones encuentran muchos problemas: el ritmo interrumpido por promociones, tener que gestionar multiples tiendas, ir de publicar/cambiar precios/hacer imagenes/ver datos de un lado a otro...

Si intentamos "resolver todos estos problemas", terminaremos con una herramienta **grande y completa pero inutil**.

Vamos a clasificar estos problemas (puedes pedirle ayuda a la IA); aproximadamente hay tres categorias:

1. **Problemas de ritmo**: cuando publicar, cuando ajustar precios;
2. **Problemas de eficiencia**: como gestionar bien multiples tiendas y multiples productos a la vez;
3. **Problemas de contenido**: como hacer rapidamente imagenes y textos de productos.

Para nuestro curso, lo mas adecuado para resolver primero es la **categoria 3: el problema de hacer contenido**. Pero "hacer contenido rapidamente" sigue siendo algo abstracto, asi que preguntamos al equipo de negocio donde se atascan especificamente:

::: info El equipo de negocio dice: hay dos cosas mas dolorosas al hacer contenido

**Dolor 1: hacer imagenes y textos en lote es demasiado laborioso**
- Los materiales estan por todas partes: en la nube, en el historial de WeChat, en el backend de la plataforma... **encontrarlos es muy dificil**;
- Hay que publicar muchos productos a la vez, **no hay tiempo para hacerlos uno por uno con cuidado**, solo se puede hacer algo rapido;
- Los requisitos no son altos, **con que se pueda ver y publicar**, no necesita ser muy elaborado.

**Dolor 2: las buenas soluciones no se pueden guardar y reutilizar**
- Los titulos y layouts que funcionaron bien antes, **la proxima vez que se necesitan no se encuentran**;
- Las soluciones estan dispersas en el historial de chat y en enlaces de productos anteriores;
- Cuando se necesitan hay que **buscar un buen rato y copiar/pegar/modificar otro rato**;
- Falta una herramienta para **guardar, gestionar y aplicar directamente**.

:::

Basandose en estos dos puntos de dolor, vamos a hacer una pequena herramienta: **ayudar al equipo de operaciones a hacer imagenes y textos en lote, y ademas poder guardar las buenas soluciones para usarlas directamente la proxima vez**.

Solo hace dos cosas (puedes pedirle a la IA que las refine, recuerda ir recortando funcionalidades segun el feedback del negocio):

::: info Funcionalidad 1: Generar en lote imagenes y textos de productos de e-commerce

**Para que sirve?**
Le das al sistema informacion del producto, y automaticamente te genera imagenes y textos que se pueden usar para publicar en plataformas de e-commerce (como TikTok, Taobao).

**Entrada**
| Tipo | Contenido |
|------|------|
| Informacion del producto | Nombre, categoria, marca, material, talla, color, etc. |
| Imagenes del producto | Foto con fondo blanco o con escenario simple |
| Imagenes de referencia | Capturas de productos que se vendieron bien antes o enlaces de referencia |
| Forma de importar | Importar en lote via Excel, o rellenar directamente en la pagina |

**Salida (materiales de e-commerce generados)**
- **Imagen principal del producto**: imagen de presentacion con puntos de venta en texto (la primera imagen que ve el usuario al desplazar)
- **Titulo del producto**: combinacion de palabras clave que se pueden buscar
- **Texto de puntos de venta**: 1-2 frases atractivas para los compradores
- Todo es un producto final que **con pequenos ajustes se puede publicar**

**Resultado esperado**
- Antes: cada producto habia que hacerlo desde cero, imagen y texto
- Ahora: pasas un lote de productos al sistema, y despues de generar borradores solo eliges y ajustas

:::

::: info Funcionalidad 2: Guardar las buenas soluciones como plantillas

**Entrada**
| Tipo | Contenido |
|------|------|
| Un conjunto completo | Imagen principal + titulo + texto |

**Salida**
| Funcion | Descripcion |
|------|------|
| Aplicar | Al hacer un producto nuevo la proxima vez, generar automaticamente con la plantilla |
| Modificar | Cambiar directamente el titulo y el texto |
| Gestionar | Poner nombre, etiquetar (ej. "plantilla de bolsos de hombre", "titulo de promocion"), para facilitar la busqueda |

**Resultado esperado**
1. Importar un producto nuevo
2. Elegir: dejar que el sistema genere por defecto, o **usar mi plantilla guardada**
3. El sistema aplica automaticamente el estilo de la plantilla, generando nuevas imagenes y textos

:::

---

**Repasemos lo que acabamos de hacer:**

1. **Primero hicimos preguntas**: en lugar de empezar directamente a hacer, primero preguntamos al equipo de operaciones "que es lo que mas les molesta";
2. **Encontramos los puntos de dolor**: descubrimos que lo mas doloroso es "hacer imagenes y textos es demasiado trabajoso" y "las buenas soluciones no se pueden guardar";
3. **Convergimos el alcance**: no hacemos una plataforma grande y completa, solo hacemos dos funciones: "generar imagenes y textos en lote + guardar plantillas".

**Por que es importante hacer esto?**

Un error comun de los principiantes al hacer productos es: cuantas mas funcionalidades, mejor. Pero lo que los usuarios realmente necesitan es **que se resuelva el problema mas doloroso**. Mejor hacer una o dos funcionalidades que realmente ayuden al usuario que un monton que no funcionen bien.

**El nucleo del pensamiento de producto y negocio:**
- No pienses "creo que el usuario necesita esto"
- Ve y pregunta al usuario "que haces cada dia? Donde te duele mas?"
- De todos los problemas, **converge** al mas doloroso y mas resoluble
- Haz primero la **version minima usable**, y luego itera poco a poco

Esto es lo que debemos aclarar antes de escribir codigo. El codigo es solo una herramienta; **entender al usuario y encontrar el problema correcto** es el primer paso.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Analisis de necesidades', description: 'De lo vago a lo concreto' },
      { title: 'Validacion de una pagina', description: 'La funcionalidad central toma forma' },
      { title: 'Expansion multipagina', description: 'Completar la estructura de la aplicacion' },
      { title: 'Mejora estetica', description: 'Mejorar la experiencia del usuario' }
    ]" />
  </ClientOnly>
</div>

## 2. Producir un prototipo en 10 minutos: dejar que el AI IDE implemente la "funcionalidad central"

::: info Sobre el Plan de programacion
Si sientes que tu IDE actual no es lo suficientemente inteligente, o que te quedas sin cuota muy rapido, puedes comprar un **plan de programacion**. Puedes prever este articulo de referencia sobre el uso de Claude para programar.
:::

Pensar es bueno, pero no hay que sobre-pensar. Dejemos de lado el exceso de reflexion y intentemos hacer un prototipo empezando con una sola pagina.

### 2.1 Primer paso: dile a la IA en lenguaje llano que quieres

Al principio no busques el prompt perfecto; empieza con tu expresion mas natural. Como cuando le describes un requisito a un companero, dile a la IA en lenguaje llano lo que quieres hacer, y luego deja que la IA te ayude a optimizarlo en algo mas profesional.

#### 2.1.1 Empezar con una descripcion verbal (recomendado para principiantes)

Primero describe la idea con tus propias palabras, aunque sea rudimentario, no importa:

```
Quiero hacer una herramienta que ayude a operaciones de e-commerce a generar automaticamente imagenes principales y textos de productos.
Los de operaciones normalmente tienen que hacer imagenes y escribir textos uno por uno, lo cual es muy molesto.
Mi idea es: suben la informacion del producto, el sistema genera un lote de borradores,
y los de operaciones eligen los buenos, los ajustan un poco y ya los pueden usar.

Primero hagamos la version mas simple: una pagina, a la izquierda se rellena la informacion del producto,
a la derecha se muestra el resultado generado. Que se puedan subir imagenes, rellenar texto,
y despues de generar, mostrar la vista previa de la imagen principal y el texto.
```

A continuacion, enviale este texto a la IA (como ChatGPT, Claude, etc.) y pidele que te ayude a expandirlo. La IA normalmente te ayudara a completar detalles que no habias considerado, organizar tu idea mas claramente, y finalmente generar un prompt adecuado para enviar al AI IDE.

Puedes decirle a la IA asi:
```
Ayudame a expandir la idea anterior, organizala en un documento de logica de negocio claro,
y luego genera un prompt adecuado para enviar a un AI IDE (como Cursor, Trae),
para generar el codigo de un prototipo de aplicacion de una sola pagina.
```

La IA devolvera un conjunto de requisitos estructurados y el prompt correspondiente. Tu lo revisas, eliminas las funcionalidades innecesarias, confirmas que esta todo correcto, y luego lo usas para generar el codigo.

La ventaja de hacer esto es que lo que describes verbalmente es tu idea mas autentica, aunque puede faltar algunos detalles importantes. Cuando la IA te ayuda a expandir, puede preguntar cosas como "quieres soportar subida en lote?" que no habias pensado, ayudandote a validar mas. Puedes elegir conservar o eliminar funcionalidades poco practicas segun el feedback, y en iteraciones sucesivas determinar el prompt inicial para la IA.

#### 2.1.2 Saltarse la expansion: enviar directamente tu documento de negocio organizado a la IA

Si ya has organizado el documento de logica de negocio en capitulos anteriores (por ejemplo, una descripcion de requisitos en lenguaje llano), puedes usar directamente el siguiente formato para enviarlo al AI IDE, ahorrando el paso intermedio de la expansion. Adecuado cuando los requisitos ya estan claros y quieres empezar a escribir codigo directamente:

```
Ayudame a implementar una aplicacion de una sola pagina basandote en la logica de negocio, para validar la funcionalidad central.

La logica de negocio es la siguiente:
1. Ayudar a operaciones a generar en lote la primera version de borradores de imagenes y textos:
- **Entrada (soporta subida directa e importacion en lote de materiales):**
  - Informacion basica del producto: nombre, categoria, marca, material, talla, color, publico objetivo, etc.;
  - Imagenes del producto: foto con fondo blanco / foto con escenario simple;
  - Cada generacion soporta subir capturas de productos exitosos anteriores o enlaces de referencia;
  - Soporta importar en lote via Excel, o rellenar/subir online en la pagina.
  - Soporta especificar en la pagina si guardar los materiales en la biblioteca, para facilitar el proximo uso
- **Salida (contenido que se puede publicar directamente o con pequenos cambios):**
  - Para cada producto, un borrador de imagen principal "presentable, con puntos de venta basicos";
  - Un titulo "con estructura razonable y palabras clave centrales" + 1-2 frases de puntos de venta.
- **Cambio esperado en la forma de uso:**
  Pasar de empezar cada lote desde cero a pasar un lote de productos al sistema y usar los borradores generados para filtrar y ajustar.

Primero hagamos la primera funcionalidad; la segunda (biblioteca de plantillas) la anadiremos despues.
```

#### 2.1.3 El enfoque del programador (avanzado): dejar que la IA escriba "el prompt del prompt"

Si quieres controlar mas finamente el proceso de generacion de codigo, primero puedes pedirle a la IA (como ChatGPT) que genere un prompt especifico para el AI IDE basandose en tus requisitos:

```
Basandote en la siguiente idea, ayudame a escribir un prompt para enviar a un coding Agent que generara codigo,
necesito usar este prompt para generar codigo.

[Pega aqui tu descripcion de la logica de negocio]

Requisitos:
1. El prompt debe incluir una descripcion clara del layout de la pagina
2. Definir claramente la estructura de datos y la logica de interaccion
3. Especificar el stack tecnologico (ej. React + Tailwind)
4. Listar los puntos de funcionalidad central a implementar
```

Normalmente la IA generara un prompt estructurado como el siguiente:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-25-56.png)

Puedes modificar ligeramente este prompt y luego enviarlo al AI IDE para generar codigo.

### 2.2 Segundo paso: dejar que el AI IDE genere codigo directamente

#### 2.2.1 Preparacion: conocer las operaciones basicas del AI IDE

Si aun no estas familiarizado con el uso basico del AI IDE (como Cursor, Trae, Windsurf, etc.), te recomendamos primero ver el [tutorial basico de IDE](/es-es/appendix/2-development-tools/ide-basics) en el apendice, para entender como:
- Crear un nuevo proyecto
- Conversar con el AI Agent
- Entender el proceso de generacion de codigo de la IA

#### 2.2.2 Empezar a generar codigo

Ya tienes el prompt inicial; usemos el primer estilo de prompt como ejemplo para que la IA nos ayude a generar codigo. Primero crea una ventana y la carpeta correspondiente, abre la carpeta (inicializa un nuevo proyecto en la direccion de carpeta que prefieras):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-28-44.png)
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-30-00.png)

En la barra lateral, elige el modelo que prefieras (se recomiendan gemini, gpt, glm, kimi, minimax, etc.), e introduce el prompt obtenido en el primer paso:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-31-41.png)

Despues de hacer clic en generar, veremos la etapa familiar: la IA planificara la estructura de directorios del proyecto, los archivos necesarios y dara el contenido inicial de cada archivo.

::: warning Nota especial: la IA puede detenerse esperando tu confirmacion
Durante el proceso de generacion, el AI Agent frecuentemente **se detendra esperando tu input o confirmacion**, por ejemplo:
- Preguntandote si quieres continuar al siguiente paso
- Pidiendote que presiones Enter para confirmar una operacion
- Preguntandote sobre alguna eleccion tecnica

**Si ves que la IA no avanza, primero revisa la interfaz de chat para ver si esta esperando tu respuesta.** Muchos principiantes creen que la IA esta pensando, cuando en realidad ya se detuvo esperandote. Responde activamente o presiona Enter, y la IA continuara trabajando.
:::

Tambien recuerda presionar Enter para confirmar la informacion (de lo contrario se quedara esperando; algunos AI IDE no tienen este problema):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-33-03.png)

Si te encuentras con la siguiente situacion, significa que ya se ha iniciado un servicio local; necesitas hacer clic para saltar, de lo contrario te quedaras en esta pantalla (si despues de generar el codigo no aparece nada, necesitas decir activamente "ayudame a iniciar este proyecto"):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-38-11.png)

::: info Explicacion del escenario
**Explicacion del escenario**: usaste `npm create vite@latest` para crear un proyecto React + TypeScript (easy-vibe-web). Una vez completada la creacion, la computadora automaticamente "ejecutara" esta pagina web, para que puedas ver el efecto inmediatamente.

**Servicio local**: se puede entender como que tu computadora ha abierto temporalmente una ventana de muestra de pagina web, que solo se ejecuta en tu computadora; los demas no pueden acceder.

**localhost (direccion local)**: `localhost` significa "esta computadora misma". Cuando el navegador accede a esta direccion, en realidad esta accediendo a la pagina web que se esta ejecutando en tu computadora.

**Puerto**: el puerto se puede entender como un numero que se usa para distinguir diferentes servicios de paginas web que se ejecutan en la misma computadora. Este proyecto usa el 5174.

**Enlace de acceso `http://localhost:5174/`**: esta direccion significa "acceder a la pagina web con numero 5174 en esta computadora". Abriendo este enlace en el navegador podras ver el efecto.

**Explicacion de este escenario**: el sistema originalmente queria usar el puerto 5173, pero ese numero ya estaba en uso, asi que cambio automaticamente al 5174. Esto es normal.

**Instrucciones de operacion**: abre el navegador, introduce `http://localhost:5174/` en la barra de direcciones y presiona Enter para ver la pagina del proyecto actual.
:::

Despues de confirmar todo, espera un momento a que el agente termine de ejecutarse, y podemos obtener el siguiente resultado:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-50-34.png)

Podemos ver que ya hay una vista preliminar de las funcionalidades, pero la pagina frontend se ve muy fea. En este momento podemos intentar hablar directamente con la IA para optimizar la visualizacion de la interfaz:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-01-16.png)

Despues de optimizar, podemos obtener una interfaz mas bonita:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-05-16.png)

Puedes modificar las funcionalidades de la pagina web segun tus necesidades; puedes adjuntar capturas de pantalla y preguntar libremente, por ejemplo: "Todavia no necesito la funcion de importacion en lote, ayudame a quitarla", "Hay demasiadas cosas que rellenar a la izquierda, ayudame a dejar solo xxxxx". Incluso puedes referenciar otros sitios web maduros; por ejemplo, aqui podemos referirnos directamente a un producto de diseno de Google (puedes pegar una captura de pantalla de un sitio web maduro que te guste):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-13-12.png)

Finalmente podemos obtener:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-15-18.png)

### 2.3 Que hacer cuando hay errores

En la practica, encontrar errores es inevitable; es un fenomeno normal y no significa que hayas hecho algo mal. No necesitas entender el error; solo pasa "lo que ves" completamente a la IA.

Solo hay tres formas comunes de manejarlos:

- **Forma 1: Error en la pagina o terminal**
  Cuando la pagina se pone roja, queda en blanco, o aparecen un monton de letras rojas en la terminal, simplemente haz una captura de pantalla o copia toda la informacion del error y enviasela a la IA para que te ayude a repararlo.

- **Forma 2: La funcionalidad no esta bien pero no hay error**
  Por ejemplo, el boton no responde, los datos no se muestran, los estilos estan desordenados. Describe en lenguaje llano "que esta pasando ahora + lo que tu querias", y si es necesario, anade una captura de pantalla.

- **Forma 3: No estas seguro de si hay algun problema**
  Puedes preguntar directamente a la IA: "Ayudame a revisar si esta funcionalidad tiene algun problema obvio, si necesita ajustes."

#### 2.3.1 Preguntas frecuentes de principiantes

- **P: No se donde esta la informacion del error?**
- R: Generalmente, mira todas las "letras rojas". En la terminal, la consola o la pagina, busca las indicaciones en rojo, selecciona todo y copialo para la IA.

- **P: Que hago si la IA lo arregla pero sigue dando el mismo error?**
- R: Esto es comun. Sigue haciendo capturas de pantalla o copiando la ultima informacion del error y enviasela, para que lo repare aun mas basandose en la ultima modificacion.

- **P: Necesito entender completamente el plan de reparacion de la IA?**
- R: No necesitas entenderlo todo de una vez. Puedes centrarte en uno o dos puntos cada vez; con el tiempo, iras entendiendo cada vez mas codigo, como cuando acumulas vocabulario en ingles.

- **P: Despues de muchas modificaciones, el problema sigue sin resolverse?**
- R: Puedes intentar:
  - Usar la funcion de "rollback de version" del IDE, encontrar el boton de deshacer en el chat del agente, volver a una version que funcionaba y empezar de nuevo;
  - Cambiar de modelo o ajustar el prompt, describiendo el fenomeno y la informacion del error de forma mas especifica;
  - Empaquetar "codigo actual + log de errores + comportamiento esperado" y enviarlo todo de una vez a la IA, para que reestructure completamente la parte problematica.

## 3. Expandir de aplicacion de una sola pagina a multipagina

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Analisis de necesidades', description: 'De lo vago a lo concreto' },
      { title: 'Validacion de una pagina', description: 'La funcionalidad central toma forma' },
      { title: 'Expansion multipagina', description: 'Completar la estructura de la aplicacion' },
      { title: 'Mejora estetica', description: 'Mejorar la experiencia del usuario' }
    ]" />
  </ClientOnly>
</div>

Cuando la logica de la funcionalidad central esta basicamente generada, podemos generar el resto del contenido. Por ejemplo, en este punto, si hacemos clic en configuracion o en algunos botones, no hacen nada.

Puedes pedirle a la IA que revise segun los requisitos del prompt de negocio y genere las partes que faltan, o pedirle directamente que complete las paginas no implementadas. Tambien puedes especificar una pagina para que la IA la complete, hasta que las paginas se puedan hacer clic y las funcionalidades puedan interactuar normalmente:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-17-55.png)

Despues de esperar un momento, podemos ver que el programa ya ha completado multiples paginas y funcionalidades interactivas basandose en lo anterior:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-40.png)

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-53.png)

En este punto solo necesitas hacer clic manualmente en cada funcion y boton que te interese, asegurandote de que la interaccion sea normal. Si hay funcionalidades que no se pueden interactuar, puedes comunicarte con la IA para que te ayude a repararlas.

## 4. Hacer que el prototipo "parezca profesional"

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Analisis de necesidades', description: 'De lo vago a lo concreto' },
      { title: 'Validacion de una pagina', description: 'La funcionalidad central toma forma' },
      { title: 'Expansion multipagina', description: 'Completar la estructura de la aplicacion' },
      { title: 'Mejora estetica', description: 'Mejorar la experiencia del usuario' }
    ]" />
  </ClientOnly>
</div>

Despues de tener la estructura multipagina, el ultimo paso es hacer que el prototipo pase de "funcional" a "comodo de usar y profesional". Para ello, necesitamos experimentar todo el flujo (flujo de usuario) y hacer que la IA repare las partes que no funcionan, para que podamos simular un nuevo usuario recorriendo todo el flujo desde cero cada vez que actualizamos, obteniendo el resultado esperado.

Recordemos los requisitos iniciales:

```
1. Ayudar a operaciones a generar en lote la primera version de borradores de imagenes y textos:
- **Entrada (soporta subida directa e importacion en lote de materiales):**
  - Informacion basica del producto: nombre, categoria, marca, material, talla, color, publico objetivo, etc.;
  - Imagenes del producto: foto con fondo blanco / foto con escenario simple;
  - Cada generacion soporta subir capturas de productos exitosos anteriores o enlaces de referencia;
  - Soporta importar en lote via Excel, o rellenar/subir online en la pagina.
  - Soporta especificar en la pagina si guardar los materiales en la biblioteca, para facilitar el proximo uso
- **Salida (contenido que se puede publicar directamente o con pequenos cambios):**
  - Para cada producto, un borrador de imagen principal "presentable, con puntos de venta basicos";
  - Un titulo "con estructura razonable y palabras clave centrales" + 1-2 frases de puntos de venta.
- **Cambio esperado en la forma de uso:**
  Pasar de empezar cada lote desde cero a pasar un lote de productos al sistema y usar los borradores generados para filtrar y ajustar.

2. Guardar las buenas soluciones como una biblioteca de plantillas reutilizables:
- **Que se puede guardar?**
  - Cualquier salida que las operaciones consideren "buena" se puede guardar con un clic:
    - Puede ser la combinacion completa de "imagen principal + titulo + puntos de venta";
    - O solo una parte, como una estructura de titulo o un texto de puntos de venta.
- **Que se puede hacer despues de guardar?**
  - **Reutilizar:**
    - Usar esta entrada guardada para generar un nuevo lote de imagenes y textos con los parametros de nuevos productos;
    - O sobre el mismo producto, generar multiples variantes basadas en la plantilla para hacer tests A/B.
  - **Editar:**
    - Modificar directamente el titulo / texto de puntos de venta;
    - Si se soporta edicion de imagen, se pueden ajustar elementos como texto y pegatinas en la imagen principal.
  - **Gestionar:**
    - Poner nombre a las entradas guardadas, etiquetar (ej. "plantilla de imagen principal de bolsos de hombre", "estructura de titulo de promocion"), soportar clasificacion por tienda para facilitar la busqueda posterior.
- **Como usarlo la proxima vez que se publique un producto nuevo?**
  - Despues de importar productos nuevos, las operaciones pueden elegir:
    - Usar la logica por defecto del sistema, o
    - Especificar "usar una de mis plantillas guardadas para generar";
  - El sistema basandose en los datos del nuevo producto, aplica automaticamente la estructura y el estilo de la plantilla, generando nuevos borradores de imagen principal + titulo + puntos de venta.
```

Si cada vez que pruebas necesitas crear datos nuevos, esto lleva mucho tiempo. En este caso, normalmente usamos algo llamado "datos de prueba". Podemos comunicarnos con la IA de la siguiente manera, para que genere en la interfaz una entrada rapida de datos de prueba que nos permita verificar que todas las funcionalidades funcionan correctamente:

```
Necesito probar el proceso de uso del usuario, asegurandome de que pueda completarse totalmente. Por favor genera una entrada de datos de prueba basandote en los siguientes requisitos, para que pueda hacer clic y probar rapidamente si todo el flujo funciona normalmente:
1. Ayudar a operaciones a generar en lote la primera version de borradores de imagenes y textos:
- **Entrada (soporta subida directa e importacion en lote de materiales):**
  - Informacion basica del producto: nombre, categoria, marca, material, talla, color, publico objetivo, etc.;
  - Imagenes del producto: foto con fondo blanco / foto con escenario simple;
  - Cada generacion soporta subir capturas de productos exitosos anteriores o enlaces de referencia;
  - Soporta importar en lote via Excel, o rellenar/subir online en la pagina.
  - Soporta especificar en la pagina si guardar los materiales en la biblioteca, para facilitar el proximo uso
- **Salida (contenido que se puede publicar directamente o con pequenos cambios):**
  - Para cada producto, un borrador de imagen principal "presentable, con puntos de venta basicos";
  - Un titulo "con estructura razonable y palabras clave centrales" + 1-2 frases de puntos de venta.
- **Cambio esperado en la forma de uso:**
  Pasar de empezar cada lote desde cero a pasar un lote de productos al sistema y usar los borradores generados para filtrar y ajustar.
```

Es facil obtener resultados (si crees que un dato es muy poco, puedes pedirle a la IA que genere multiples casos de prueba):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-30-30.png)

Despues de hacer clic, obtenemos el resultado:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-31-23.png)

En este punto lo que obtenemos directamente es el resultado, no hay un "proceso de generacion simulado". Si queremos simular un proceso de generacion real, podemos hablar directamente con la IA: "Por favor simula un proceso de generacion real, que me des el resultado despues de un rato al hacer clic."
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-50-05.png)

Despues de verificar la funcionalidad de generacion, tambien debemos asegurarnos de que la funcionalidad de la biblioteca de plantillas funciona correctamente. En la tarjeta de generacion de la pagina podemos ver que la funcion de guardado de plantillas no se ha implementado; necesitamos tener una conversacion mas profunda con la IA: "Por favor ayudame a asegurarme de que el requisito [pega aqui el contenido del punto 2 de arriba] funciona correctamente, que se pueda hacer clic en un resultado para guardar la plantilla correspondiente, y que al abrirlo se puedan ver los parametros de generacion"

La generacion a menudo no se consigue de una sola vez; frecuentemente hay que hacer capturas de pantalla para corregir:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-57-14.png)

Finalmente obtenemos el resultado esperado:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-16-12-56.png)

Ademas de experimentar manualmente el flujo de requisitos, tambien puedes pedirle a la IA que haga directamente una verificacion de requisitos, por ejemplo:

- "Por favor compara con mis requisitos originales, revisa si la aplicacion actual ya cubre todas las funcionalidades centrales."
- "Ayudame a hacer una lista de funcionalidades, indicando cuales ya estan completadas, cuales aun no estan implementadas o tienen una experiencia insuficiente."

La IA generalmente generara un checklist, y puedes pensar si necesitas seguir mejorando basandote en los resultados. Despues de iteraciones repetidas, puedes obtener un resultado de prototipo bastante completo.

## 5. Asignacion: replica tu propio espacio de trabajo de e-commerce de TikTok

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Mision de desafio: replica el espacio de trabajo de materiales de e-commerce</div>
  </template>

  <p>
    Referenciando los prompts y el contenido de esta leccion, completa un ciclo cerrado:
  </p>

  <ul>
    <li>
      <strong>Practica de ciclo cerrado completo</strong>
      <ul>
        <li>Generacion de prompts a partir del analisis de negocio -> generacion de prototipo de una pagina -> generacion de prototipo multipagina</li>
      </ul>
    </li>
    <li>
      <strong>Compartir resultados</strong>
      <ul>
        <li>Haz capturas de pantalla de tu programa y compartelas con todos</li>
      </ul>
    </li>
    <li>
      <strong>Pregunta de reflexion</strong>
      <ul>
        <li>Para la proxima seccion "integrar capacidades de LLM y generacion de texto a imagen", piensa con antelacion: como podrias integrar capacidades como "IA que escribe textos / genera imagenes / genera scripts" en tu espacio de trabajo?</li>
      </ul>
    </li>
  </ul>
</el-card>

## Proximo paso

En la siguiente seccion, construiremos sobre este espacio de trabajo de produccion de contenido e integraremos capacidades especificas de IA (texto a texto, imagen a texto, texto a imagen), por ejemplo:

- Generar automaticamente un primer borrador de texto y multiples opciones de titulos para una tarea de contenido
- Generar automaticamente un borrador de imagen de acompanamiento basandose en la descripcion de la tarea (texto a imagen)
- Clasificar y resumir automaticamente las tareas de contenido historicas, ayudandote a planificar los temas de la proxima campana

<RelatedArticlesSection
  title="Sigue aprendiendo"
  description="Se recomienda seguir el orden 'integrar capacidades de IA -> ciclo completo de proyecto -> ingenieria de diseno'."
  :items="relatedArticles"
/>
