# Como hacer que Claude Code trabaje durante largos periodos

## Introduccion

Los asistentes de codificacion IA tradicionales son "conversacionales": dices algo, responde una vez y luego se detiene. Pero para tareas de desarrollo reales, este modo esta lejos de ser suficiente.

Imagina estos escenarios: quieres que Claude refactorice un proyecto entero, pero edita algunos archivos y dice "listo"; quieres que Claude siga corrigiendo errores hasta que todas las pruebas pasen, pero ejecuta una vez y se detiene; quieres que Claude "trabaje toda la noche," pero a la manana siguiente descubres que se detuvo hace mucho.

En el verano de 2025, un desarrollador australiano llamado Geoffrey Huntley (que tambien es pastor de ovejas) escribio un script bash de 5 lineas. El script era simple: reiniciar continuamente Claude Code y alimentarlo con la misma tarea. Lo llamo "Ralph Wiggum," por el personaje de Los Simpson que sigue intentandolo y nunca se rinde.

Este script simple impacto a Silicon Valley. En solo dos semanas, los proyectos relacionados obtuvieron mas de 7.000 estrellas en GitHub. La gente lo uso para generar 6 proyectos completos durante la noche, entrego trabajo por contrato de $50.000 con solo $297 de coste de API, e incluso lo uso para construir un lenguaje de programacion completo en 3 meses.

La pregunta central que resuelve este capitulo es: como hacer que Claude Code trabaje continuamente como un desarrollador real hasta que las tareas esten verdaderamente completas.

---

## Principio Central: Por que la IA se "Detiene Demasiado Pronto"?

Antes de discutir metodos especificos, primero comprende la causa raiz.

### El juicio de finalizacion de la IA no es confiable

Los LLM tienen una debilidad fundamental: no pueden juzgar de manera confiable si el trabajo esta verdaderamente completo.

Los criterios de finalizacion humanos son objetivos: todas las pruebas pasan, las funciones estan completas y la calidad del codigo cumple los estandares. Pero la IA solo puede juzgar por "sensacion." Puede detenerse porque "esto parece mas o menos," o porque "la salida parece suficiente," o porque no sabe que hacer a continuacion.

Por eso necesitamos un sistema externo para determinar la finalizacion real en lugar de depender del sentido interno de la IA.

### La idea central de la solucion

La solucion central es mantener la IA trabajando dentro de un "bucle."

Siempre que intente salir, el sistema externo verifica tres preguntas: esta verdaderamente completo? cumple con criterios objetivos? falta algo? Si no, inyecta la tarea de nuevo y continua otra ronda.

Esta idea puede implementarse en muchas formas, desde scripts bash simples hasta sistemas de orquestacion complejos, pero la esencia es la misma.

---

## Metodo 1: Bucle While True Bash (El Metodo Mas Primitivo)

Esta es la implementacion mas simple y directa. En esencia, escribir un bucle infinito que reinicia Claude Code cada ronda y alimenta la misma descripcion de tarea.

La implementacion mas simple es de solo 5 lineas:

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### Como funciona

El flujo del script es directo. Paso 1 lee la descripcion de la tarea de `PROMPT.md`. Paso 2 lanza Claude Code y pasa la descripcion de la tarea. Paso 3 Claude trabaja y produce resultados. Paso 4 Claude sale al terminar. Paso 5 el bucle se reinicia automaticamente y vuelve al paso 1, creando un ciclo infinito a menos que lo interrumpas manualmente con `Ctrl+C`.

### Pros y contras

La ventaja es la simplicidad extrema: cualquiera puede entenderlo, sin configuracion necesaria, usable inmediatamente y bueno para experimentos rapidos.

Pero las desventajas son obvias: no puede juzgar la finalizacion real, puede girar para siempre, no tiene barreras de seguridad y puede desperdiciar llamadas API.

### Ejemplo de uso real

Primero, crea un archivo `PROMPT.md` para describir tu tarea. Por ejemplo, refactorizar un modulo de autenticacion de usuario:

```markdown
# Tarea: Refactorizar modulo de autenticacion de usuario

Requisitos:
1. Extraer toda la logica de autenticacion en una clase AuthService independiente
2. Agregar pruebas unitarias, cobertura > 80%
3. Actualizar la documentacion relacionada

Cuando todas las pruebas pasen y la documentacion este actualizada, producir: task complete
```

Luego crea y ejecuta el script de bucle:

```bash
chmod +x loop.sh
./loop.sh
```

### Version mejorada mas segura

Para evitar bucles infinitos, agrega un limite de iteraciones:

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== Iteracion $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "Alcanzado el maximo de iteraciones, deteniendo"
        break
    fi

    sleep 5  # pequeno retraso para evitar limites de tasa de API
done
```

Esta version mejorada agrega un limite maximo de iteraciones, muestra progreso por ronda y se detiene automaticamente en el limite. Tambien agrega un retraso de 5 segundos en cada bucle para evitar limites de tasa.

---

## Metodo 2: Plugin Ralph Wiggum (Recomendacion Oficial)

Ralph Wiggum es un plugin oficial de Anthropic construido especificamente para tareas de larga duracion. Se nombra por el personaje de Los Simpson, representando el espiritu de "seguir intentando a pesar del fracaso."

### Mecanismo central: Stop Hook

El nucleo de Ralph es Stop Hook. Cuando Claude quiere salir, Stop Hook intercepta la senal de salida. Luego el sistema verifica: la salida incluia el marcador de finalizacion especifico? Si no se encuentra marcador, re-inyecta el prompt original y comienza otra iteracion. Solo cuando se detecta el marcador de finalizacion se permite a Claude salir.

Esto garantiza que Claude no se detiene solo porque "se siente suficientemente cerca." Debe completar los requisitos claramente marcados.

### Instalacion

Ralph Wiggum es un plugin oficial de Claude Code y puede instalarse de dos formas.

**Opcion 1: instalar desde el mercado oficial de plugins (recomendado)**

```bash
# ejecutar en Claude Code
claude

# agregar mercado oficial de plugins
/plugin marketplace add anthropics/claude-code

# instalar Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# verificar instalacion
/plugin
```

**Opcion 2: instalar directamente desde GitHub**

```bash
# entrar al directorio de plugins
cd ~/.claude/plugins/

# clonar el repositorio del plugin
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

Despues de instalar, puedes usar:

- `/ralph-wiggum:ralph-loop` - iniciar bucle
- `/ralph-wiggum:cancel-ralph` - cancelar bucle
- `/ralph-wiggum:help` - mostrar ayuda

### Uso basico

Usa `/ralph-wiggum:ralph-loop`:

```bash
/ralph-wiggum:ralph-loop "Construye una API de tareas con operaciones CRUD, validacion de entrada y pruebas.
             Produce <promise>COMPLETE</promise> cuando todo este listo." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### Explicacion de parametros

Los dos parametros mas importantes son `--max-iterations` y `--completion-promise`.

`--max-iterations` establece el limite de seguridad duro. Los valores recomendados son tipicamente 20-100. Incluso si no esta terminado, Ralph se detiene en este limite para prevenir gasto infinito de API.

`--completion-promise` especifica el texto del marcador de finalizacion, que debe ser explicito y unico. Ralph trata la tarea como completa solo cuando la salida de Claude contiene ese marcador. Usa marcadores claros como `COMPLETE` o `TASK_DONE` y evita palabras ambiguas.

### Mejores practicas de prompts

Escribir buenos prompts es clave para el exito de Ralph.

Los prompts malos usualmente no definen criterios de finalizacion. Por ejemplo, "escribir una API de tareas" puede llevar a la IA a producir un esqueleto rugoso y detenerse, sin pruebas, sin verificacion y sin documentacion.

Los buenos prompts deben incluir requisitos por fases y criterios de aceptacion claros. Por ejemplo:

Describe primero las tareas por fases. Fase 1 es funcionalidad central con todos los endpoints CRUD: POST `/todos` crear, GET `/todos` listar, GET `/todos/:id` obtener uno, PUT `/todos/:id` actualizar, DELETE `/todos/:id` eliminar. Fase 2 es validacion de entrada: el titulo no puede estar vacio, el estado de finalizacion debe ser booleano. Fase 3 es pruebas: escribir pruebas para cada endpoint, con cobertura > 80%.

Luego define criterios de aceptacion: todas las pruebas pasan, el codigo pasa el linter, el README incluye documentacion de API.

Finalmente define un marcador de finalizacion unico: `<promise>TODO_API_COMPLETE</promise>`.

De esta manera Claude sabe exactamente que hacer y cuando la finalizacion se ha logrado verdaderamente.

### Mas plantillas de prompts

Aqui hay plantillas de tareas comunes que puedes usar directamente o adaptar.

**Plantilla 1: migracion de pruebas (Jest -> Vitest)**

```text
/ralph-wiggum:ralph-loop "
Migra todas las pruebas en este proyecto de Jest a Vitest:
- Mantener toda la logica de pruebas sin cambios
- Actualizar archivos de configuracion (vite.config.js, vitest.config.js)
- Reemplazar APIs especificas de Jest (ej., jest.mock -> vi.mock)
- Asegurar que todas las pruebas pasen
- Eliminar dependencias relacionadas con Jest

Criterios de aceptacion:
- npm test pasa completamente
- no hay dependencia Jest en package.json
- el proyecto se construye exitosamente

Producir despues de completar: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**Plantilla 2: optimizacion UI/UX (mobile-first)**

```text
/ralph-wiggum:ralph-loop "
Pule el UI/UX de este proyecto en una aplicacion de aprendizaje de idiomas mobile-first refinada:
- unificar espaciado y espacios en blanco (usar unidad base de 4px)
- establecer jerarquia tipografica clara (titulo/cuerpo/texto auxiliar)
- unificar estilos para tarjetas, listas y componentes compartidos
- agregar navegacion inferior (Inicio/Aprender/Quiz/Progreso/Configuracion)
- asegurar calidad de renderizado movil

Criterios de aceptacion:
- npm run build tiene exito
- sin errores TypeScript
- paginas clave se previsualizan correctamente en movil

Producir despues de completar: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**Plantilla 3: anotacion TypeScript masiva**

```text
/ralph-wiggum:ralph-loop "
Agrega anotaciones de tipo TypeScript a todas las funciones en el proyecto:
- priorizar directorio src/
- agregar tipos para parametros de funcion y valores de retorno
- evitar any, usar tipos concretos o unknown
- agregar definiciones de tipo necesarias

Criterios de aceptacion:
- npm run typecheck pasa
- sin comentarios @ts-ignore o @ts-any
- el codigo se ejecuta correctamente

Producir despues de completar: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**Plantilla 4: desarrollo de funciones impulsado por TDD**

```text
/ralph-wiggum:ralph-loop "
Implementa la funcionalidad de checkout usando TDD:
1. Escribir pruebas primero (checkout.test.ts)
2. Ejecutar pruebas (deberian fallar)
3. Escribir codigo minimo para pasar las pruebas
4. Refactorizar y optimizar
5. Repetir hasta que todas las pruebas pasen

Requisitos de funcionalidad:
- lista de articulos del carrito de compras
- calculo de tarifas de envio
- aplicacion de cupones
- validacion del formulario de pago

Criterios de aceptacion:
- todas las pruebas pasan (npm test checkout.test.ts)
- cobertura de codigo > 80%
- sin errores ESLint

Producir despues de completar: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**Plantilla 5: unificacion de estilo de codigo**

```text
/ralph-wiggum:ralph-loop "
Unifica el estilo de codigo en todo el proyecto:
- formatear todos los archivos con Prettier
- unificar convenciones de nomenclatura (variables camelCase, componentes PascalCase)
- eliminar imports y variables no utilizados
- unificar estilo de comillas de cadena (comillas simples)
- unificar estilo de punto y coma (sin punto y coma)

Criterios de aceptacion:
- npm run lint pasa
- estilo de codigo consistente
- build tiene exito

Producir despues de completar: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### Casos reales

Un caso famoso ocurrio en un hackathon de Y Combinator, donde un equipo uso Ralph Loop. A las 11 PM, establecieron una tarea: implementar MVPs para 6 especificaciones de producto en secuencia y emitir marcadores de finalizacion especificos para cada uno. Establecieron maximo de iteraciones en 200 y se fueron a dormir.

A la manana siguiente, tenian 6 proyectos listos para demo y el coste de API fue solo $297. Ese es el poder de Ralph: mientras duermes, la IA sigue trabajando.

Otro caso vino de Boris Cherny (lider de Claude Code). Con Ralph mas Opus 4.5, entrego 259 PRs en 30 dias, incluyendo 497 commits, anadiendo 40.000 lineas y eliminando 38.000. Lo mas sorprendente, todo fue producido por Claude Code sin escribir codigo manualmente.

Un caso aun mas loco es el lenguaje de programacion CURSED. El creador de Ralph, Geoffrey Huntley, uso Ralph Loop durante 3 meses para construir autonomamente un lenguaje de programacion completo. Sus palabras clave usan jerga de la Generacion Z (como `slay`, `sus`, `based`) y mas importante aun incluye una implementacion completa de compilador LLVM, biblioteca estandar y soporte parcial de editor. Esto demuestra el verdadero potencial de Ralph Loop: si proporcionas un objetivo claro, puede seguir trabajando durante meses hasta que un proyecto complejo este verdaderamente terminado.

### Mas casos reales

**Refactorizacion de proyecto automatizada**

Un desarrollador uso Ralph para refactorizar un proyecto heredado con codigo desordenado, sin pruebas y documentacion faltante. Las tareas asignadas fueron:

1. Agregar pruebas para el codigo existente
2. Refactorizar paso a paso, asegurando que las pruebas pasen despues de cada cambio
3. Actualizar la documentacion

Ralph corrio durante todo un fin de semana. Para el lunes, habia 47 commits, estructura de codigo mas limpia, 75% de cobertura de pruebas y documentacion de API completa. El coste fue alrededor de $12.

### Filosofia Ralph

Ralph refleja tres filosofias centrales.

La primera es iteracion sobre perfeccion. No esperes perfeccion en un intento; usa bucles para mejorar. El primer intento puede solo construir un esqueleto, el segundo corrige errores, el tercero optimiza, el cuarto agrega pruebas; cada ronda mejora.

La segunda es el fracaso como datos. Cada fallo de prueba es una oportunidad para mejorar; no temas al fracaso, aprende de el.

La tercera es intento persistente: sigue intentando hasta que funcione. Ese es el espiritu de Ralph.

### Cuando Ralph es adecuado o inadecuado

Saber donde Ralph encaja ayuda a ahorrar tanto tiempo como coste.

**Escenarios adecuados para Ralph**

Estas tareas tienen criterios de finalizacion claros y son buenas para iteracion automatica:

| Escenario | Por que |
|------|------|
| Migracion de pruebas | Framework objetivo claro, validado por pruebas que pasan |
| Refactorizaciones grandes | Se pueden definir reglas de refactorizacion especificas |
| Migracion de framework | Migracion exitosa verificable por codigo funcional |
| Anotacion de tipo masiva | Hecho cuando typecheck pasa |
| Mejora de cobertura de pruebas | Porcentaje de cobertura es objetivo |
| Generacion de documentacion | Documentacion de API puede validarse automaticamente |
| Unificacion UI/UX | Se pueden definir reglas de diseno concretas |
| Correccion de errores con repro | Condicion de paso es testeable |

**Escenarios inadecuados para Ralph**

Estas tareas requieren juicio humano o exploracion:

| Escenario | Por que |
|------|------|
| Decisiones de arquitectura | ej., microservicios vs monolito requiere juicio de compensacion |
| Codigo sensible a seguridad | Vulnerabilidades pueden ser sutiles y dificiles de detectar automaticamente |
| Requisitos ambiguos | Sin criterios de finalizacion claros |
| Trabajo exploratorio | Direccion cambia continuamente |
| Diseno creativo | Requiere juicio estetico humano |
| Tareas simples de una sola vez | Usar Ralph es excesivo |

**Lista de verificacion de decision**

Hazte tres preguntas:
1. **Puedo definir criterios de finalizacion explicitos?** Si no, no adecuado
2. **Hay un metodo de validacion objetivo?** (pruebas/build/typecheck) Si no, no adecuado
3. **Esta tarea requiere retroalimentacion humana continua?** Si si, no adecuado

Si las tres respuestas son "no," deja que Ralph corra.

---

## Metodo 3: Ralph Mejorado

Esta es una implementacion mejorada por la comunidad del Ralph oficial. El proyecto [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) agrega mecanismos de seguridad mas fuertes.

### Caracteristicas adicionales

Ralph mejorado agrega varias funciones de seguridad adicionales.

Primero son condiciones de salida duales. Ralph oficial solo verifica el marcador de finalizacion, pero la version mejorada requiere tanto el marcador de finalizacion como la `EXIT_SIGNAL` explicita antes de detenerse. Esto significa que incluso si Claude produce el marcador de finalizacion, el bucle puede continuar para verificacion adicional a menos que aparezca la senal de salida explicita.

Segundo es limitacion de tasa. El valor predeterminado es 100 ejecuciones/hora, previniendo facturas API disparadas si un error causa bucles infinitos. Puedes ajustar este limite.

Tercero es interruptor inteligente. Si el sistema detecta el marcador de finalizacion 5 veces consecutivas, se detiene forzosamente. Esto previene casos extremos raros donde los bucles no terminan correctamente.

Cuarto es panel en tiempo real. Ralph mejorado proporciona un panel de linea de comandos que muestra iteraciones actuales, progreso de la tarea y coste estimado.

### Instalacion

Instala Ralph mejorado clonando desde GitHub:

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

El script de instalacion configura automaticamente los archivos y configuracion necesarios.

### Uso

El uso de Ralph mejorado tiene dos pasos. Primero inicializa el proyecto con `ralph-setup`:

```bash
ralph-setup my-project
```

Esto crea los archivos de configuracion necesarios en el proyecto. Luego inicia el bucle con `ralph loop`:

```bash
ralph loop
```

### Archivo de configuracion

Ralph mejorado usa `.claude/ralph-config.json`:

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` es el maximo de conteo de bucles. `rateLimitPerHour` es el limite por hora. `completionPromise` es el texto del marcador de finalizacion. `exitSignal` es la senal de salida explicita. `costAlertThresholds` define niveles de alerta de presupuesto.

---

## Metodo 4: Agent Teams (Multi-Agente Paralelo)

Cuando las tareas son suficientemente grandes, un solo Claude no es suficiente; necesitas "colaboracion en equipo."

Agent Teams es una capacidad avanzada que permite que multiples instancias de Claude corran en paralelo y se coordinen a traves de listas de tareas y dependencias compartidas. Esto es adecuado para proyectos muy grandes. En el experimento de Nicholas Carlini, 16 agentes en paralelo produjeron mas de 100.000 lineas de codigo en dos semanas y construyeron un compilador C capaz de compilar el kernel de Linux.

Agent Teams es mas complejo y lo cubriremos en detalle en la siguiente seccion: "3.3 Agent Teams Colaboracion Multi-Agente."

---

## Metodo 5: Tareas en Segundo Plano (Ctrl+B)

Este es un metodo simple y practico de ejecucion sin bloqueo.

### Operacion basica

El uso es directo. Cuando Claude inicia una tarea, presiona `Ctrl+B` para enviarla a segundo plano.

Por ejemplo, dices: "Ejecutar el suite de pruebas completo." Claude comienza a ejecutar. Presionas `Ctrl+B` y Claude responde: "Tarea enviada a segundo plano (ID: task_abc123)." Luego puedes continuar: "Mientras tanto, analiza este archivo de log." Claude puede analizar logs mientras las pruebas continuan en segundo plano.

### Ver tareas en segundo plano

Hay varias formas de verificar las tareas en segundo plano. Usa `/tasks` para listar todas las tareas con ID de tarea, estado y hora de inicio. Presiona `Ctrl+T` para un resumen rapido de estado. Tambien puedes traer una tarea al primer plano para inspeccionar la salida en vivo.

### Escenarios adecuados

Las tareas en segundo plano son buenas para situaciones tipicas:

Primero, pruebas de larga duracion. Suites completos pueden tomar decenas de minutos y el modo en segundo plano evita bloqueos.

Segundo, compilaciones de proyectos grandes. Los pipelines de build pueden correr mientras continuas con otro trabajo.

Tercero, operaciones masivas de archivos como renombrar y formatear en masa.

Cuarto, cualquier cosa que no quieras esperar sincronicamente.

---

## Mecanismos de Seguridad: Prevencion de Bucles Infinitos

Cualquier sistema de bucle automatizado debe incluir protecciones, de lo contrario puede salir de control.

### Limites duros

La proteccion mas basica es establecer `--max-iterations` (maximo conteo de bucles). Esto es obligatorio. Independientemente del estado de finalizacion, la tarea se detiene en este limite y previene gasto API ilimitado.

Tambien puedes imponer limites de tiempo, por ejemplo detener automaticamente despues de 4 horas. Tambien puedes establecer alertas de presupuesto que pausen y notifiquen en umbrales de gasto (por ejemplo 10 USD, 50 USD, 100 USD).

### Deteccion inteligente

Puedes agregar deteccion inteligente de bucle muerto. Por ejemplo, verificar si los commits recientes incluyen cambios significativos:

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "Sin cambios sustanciales en los ultimos 5 commits, posible bucle"
    exit 1
fi
```

Si los diffs recientes son minimos, el sistema puede estar atascado y deberia detenerse con alerta.

### Alertas de coste

Establece umbrales de alerta de coste en la configuracion:

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

Cuando el gasto alcanza 10, 50 o 100 USD, el sistema pausa y notifica para que decidas si continuar.

### Puntos de control manuales

Para tareas importantes, agrega puntos de control manuales:

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "Completadas $iteration iteraciones. Continuar? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

Esto pausa cada 10 iteraciones para confirmacion, permitiendo intervencion humana oportuna.

---

## Practica: Construir un Foro BBS Completo con Ralph Loop

Usemos un ejemplo completo para mostrar el poder de Ralph Loop. Construiremos un sistema de foro estilo BBS desde cero, incluyendo autenticacion de usuarios, publicacion de posts, centro de perfil y panel de administracion.

### Objetivo del proyecto

Construir un sistema de foro BBS completamente funcional con:

**Funciones del lado del usuario:**
- registro, inicio de sesion, cierre de sesion
- navegar lista de posts (paginacion)
- ver detalle de post
- publicar nuevos posts
- funcion de comentarios
- centro de perfil (ver propios posts, actualizar perfil)

**Funciones del panel de administracion:**
- inicio de sesion de administrador
- gestion de usuarios (banear/desbanear)
- gestion de posts (eliminar/fijar)
- gestion de comentarios
- estadisticas del sistema

**Stack tecnologico:**
- backend: Node.js + Express + SQLite
- frontend: React + React Router + Axios
- autenticacion: JWT token
- estilizado: Tailwind CSS

### Preparacion

Primero instala el plugin Ralph Wiggum:

```bash
claude /plugins:add ralph-wiggum
```

### Iniciar Ralph Loop

Ahora lanza Ralph Loop para construir todo el proyecto:

```bash
/ralph-wiggum:ralph-loop "
Por favor construye un sistema de foro BBS completo desde cero usando TDD.

Requisitos de estructura del proyecto:
- directorio backend/: servidor Express API
- directorio frontend/: aplicacion React frontend
- ambos directorios tienen sus propias pruebas

Requisitos del backend:
- usar framework Express
- almacenamiento SQLite (better-sqlite3)
- autenticacion JWT (jsonwebtoken + bcrypt)
- tabla user: id, username, password, email, role, createdAt
- tabla post: id, title, content, authorId, category, pinned, createdAt
- tabla comment: id, content, postId, authorId, createdAt

Endpoints API del backend:
- POST /api/auth/register - registro de usuario
- POST /api/auth/login - inicio de sesion de usuario
- GET /api/posts - obtener lista de posts (paginacion + filtro de categoria)
- GET /api/posts/:id - obtener detalle de post
- POST /api/posts - crear post (autenticacion requerida)
- PUT /api/posts/:id - editar post (autor o administrador)
- DELETE /api/posts/:id - eliminar post (autor o administrador)
- POST /api/posts/:id/comments - agregar comentario (autenticacion requerida)
- GET /api/user/profile - obtener perfil (autenticacion requerida)
- PUT /api/user/profile - actualizar perfil (autenticacion requerida)
- GET /api/admin/stats - estadisticas de administrador (solo administrador)
- GET /api/admin/users - lista de usuarios (solo administrador)
- PUT /api/admin/users/:id/ban - banear usuario (solo administrador)

Requisitos de paginas frontend:
- /login - pagina de inicio de sesion
- /register - pagina de registro
- / - pagina principal (lista de posts)
- /post/:id - detalle de post
- /new - publicar post
- /profile - centro de perfil
- /admin - panel de administracion (permiso de administrador requerido)

Funciones del panel de administracion:
- gestion de usuarios (ver, banear, desbanear)
- gestion de posts (ver, eliminar, fijar)
- gestion de comentarios (ver, eliminar)
- estadisticas del sistema (conteo de usuarios, conteo de posts, conteo de comentarios)

Requisitos TDD:
- escribir pruebas primero, luego implementacion
- cada funcion debe tener pruebas correspondientes
- backend usa Jest, pruebas API cubren todos los endpoints
- frontend usa Vitest, pruebas de componentes cubren funciones principales
- middleware de autenticacion debe tener pruebas

Criterios de aceptacion:
- npm test (backend) pasa
- npm test (frontend) pasa
- frontend inicia y funciona correctamente
- backend API responde correctamente
- aislamiento de permisos apropiado entre usuarios normales y administrador
- el codigo pasa verificaciones ESLint

Producir despues de completar: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### Tiempo estimado

Basado en la complejidad:

**Si se codifica manualmente**: aproximadamente 40-60 horas (incluyendo diseno de esquema, sistema de autenticacion, integracion frontend/backend y pruebas)

**Usando Ralph Loop**:
- version base (funciones centrales): alrededor de 3-5 horas
- version completa (panel de administracion + pruebas): alrededor de 6-10 horas

### Monitoreo de progreso

Mientras Ralph Loop esta corriendo, puedes monitorear el progreso de varias formas:

**Conteo de iteraciones**: Ralph muestra iteraciones actuales y maximas, ayudando a estimar tiempo restante.

**Logs**: puedes ver que esta haciendo Claude ahora, como disenar esquemas, escribir APIs, construir componentes y corregir errores.

**Estado de pruebas**: cada resultado de ejecucion de pruebas se muestra. Las pruebas que pasan aumentan y las que fallan disminuyen. Cuando los fallos comienzan a bajar, el proyecto se acerca a la finalizacion.

### Verificacion post-completado

Despues de que Ralph produce el marcador de finalizacion, realiza verificacion manual:

```bash
# pruebas backend
cd backend
npm test

# pruebas frontend
cd frontend
npm test

# iniciar backend
cd backend
npm start

# iniciar frontend (en otra terminal)
cd frontend
npm run dev
```

Abre el navegador y prueba:

1. registrar un nuevo usuario
2. iniciar sesion
3. navegar posts
4. publicar nuevo post
5. agregar comentario
6. abrir centro de perfil
7. cerrar sesion e iniciar como administrador (cuenta predeterminada: admin/admin123)
8. probar funciones del panel de administracion

### Notas

Ralph Loop es poderoso, pero ten en cuenta estos puntos:

**Primero, prompts mas detallados producen mejores resultados.** Los prompts ambiguos requieren mas iteraciones para correccion.

**Segundo, establece limites de iteracion razonables.** Los sistemas BBS son complejos; se recomienda al menos 100 iteraciones.

**Tercero, se recomienda TDD.** Escribir pruebas primero puede reducir significativamente el tiempo de depuracion.

**Cuarto, se requiere verificacion manual final.** La IA puede pasar por alto casos extremos o escenarios especiales, especialmente en rutas sensibles a la seguridad.

**Quinto, presta mucha atencion al diseno del esquema.** Ralph puede necesitar varias iteraciones antes de llegar a un esquema robusto.

---

## Comparacion y Seleccion de Metodos

Cada metodo tiene sus propias caracteristicas y se ajusta a diferentes escenarios.

While True Loop es el mas simple: solo 5 lineas para correr, bueno para experimentos rapidos y prototipos. Pero es limitado y no detecta finalizacion real, confiando solo en limites de iteracion.

Ralph Wiggum es la recomendacion general para la mayoria de escenarios. Tiene un mecanismo Stop Hook completo, soporta verificacion de marcadores de finalizacion, tiene soporte oficial y documentacion solida.

Ralph Mejorado es mejor para entornos de produccion, con condiciones de salida duales, limites de tasa e interruptores inteligentes.

Las tareas en segundo plano son utiles para ejecucion sin bloqueo simple: solo presiona `Ctrl+B`. Pero es solo ejecucion en segundo plano, no orquestacion de bucle iterativo.

---

## Resumen

La idea central para hacer que Claude Code trabaje a largo plazo es simple: no le pidas que "termine de una vez," pidele que "siga intentando hasta la finalizacion verdadera."

Todos los metodos estan fundamentalmente haciendo lo mismo: darle a Claude una tarea, dejarlo correr, verificar si la finalizacion es real y si no, continuar la siguiente ronda.

Que metodo elegir depende de tus necesidades.

Si quieres simplicidad y rapidez, usa While True Loop. Cinco lineas pueden correr, pero las funciones son limitadas.

Si quieres la recomendacion general, usa Ralph Wiggum. Soporte oficial, capacidad completa, adecuado para la mayoria de casos.

Si esto es uso en produccion, usa Ralph mejorado. Tiene mecanismos de seguridad adicionales y es mas confiable.

(Para la colaboracion multi-agente de Agent Teams, ver la siguiente seccion: "3.3 Agent Teams Colaboracion Multi-Agente."

Esperamos que este capitulo te ayude a usar Claude Code mas efectivamente para que la IA se convierta en una verdadera herramienta de productividad en lugar de solo un chatbot.

---

## Referencias

### Recursos oficiales

- [Documentacion Oficial de Claude Code](https://docs.anthropic.com/en/docs/claude-code) - documentacion oficial completa de Claude Code
- [Ralph Wiggum Plugin README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - documentacion oficial del plugin
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - documentacion oficial del sistema Hooks

### Proyectos de la comunidad

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k estrellas) - implementacion mejorada de Ralph con protecciones adicionales
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - recursos y ejemplos de Ralph curados
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - generacion de PRD + integracion de bucle Ralph
- [snarktank/ralph](https://github.com/snarktank/ralph) - implementacion original de Ralph

### Articulos y Tutoriales

**Recursos en ingles**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - concepto original de Ralph por su creador
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - lectura profunda del blog de ingenieria de Anthropic
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - guia de uso completa

**Tutoriales en chino**

- [Beginner-Friendly Tutorial - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - guia detallada de instalacion y uso
- [Deep Analysis - Toutiao](https://m.toutiao.com/a7585579989207188006/) - mecanismo y principios centrales
- [Full-Stack Plain-Language Guide](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - guia completa de principios a practica
- [Beginner and Practical Guide - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - conceptos basicos y ejemplos practicos
- [Ralph Loop Deep Dive - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - detalles del mecanismo Stop Hook
- [Claude Code Perpetual Engine - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - analisis profundo del plugin de iteracion de bucle infinito
- [Ralph Loop New User Starter - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - mejores practicas y resumen de prompts

### Estudios de caso practicos

- [CURSED Programming Language](https://github.com/geoffreyhuntley/cursed) - lenguaje de programacion completo construido con Ralph durante 3 meses
- [Boris Cherny's 30 Days](https://twitter.com/boriskirov/status/1756002385683786616) - caso de 259 PRs compartido
- [Y Combinator Hackathon](https://github.com/geoffreyhuntley/ralph) - caso de generacion de 6 proyectos durante la noche
- [Geoffrey Huntley's Blog](https://ghuntley.com/) - blog tecnico del creador
