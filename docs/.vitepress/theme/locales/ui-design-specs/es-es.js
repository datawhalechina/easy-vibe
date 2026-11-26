export default {
  common: {
    before: 'Antes',
    after: 'Después',
    reset: 'Restablecer'
  },
  compare: {
    title: 'Una página, dos jerarquías',
    subtitle:
      'Los dos lados tienen exactamente el mismo texto. Solo he cambiado la jerarquía. Pasa el cursor por uno de los problemas de abajo para comparar ambas páginas y luego arrastra el control de la prueba de entrecerrar los ojos.',
    squint: 'Prueba de entrecerrar los ojos',
    squintHint:
      'Es como entrecerrar los ojos para mirar una página. Lo que todavía distingues cuando se desenfoca es lo que más llama tu atención.',
    squintClear: 'Nítido',
    squintBlurry: 'Desenfocado',
    issueLabel: 'Cuatro problemas de la página de la izquierda',
    applyHint:
      'Prueba los interruptores sobre la página de la derecha. Cada vez que desactives uno, reaparecerá un problema.',
    tableHead: ['Problema', 'Cómo corregirlo', 'Qué cambia'],
    metrics: {
      borders: 'Bordes decorativos',
      solid: 'Botones con relleno',
      legend:
        'Compara las cifras sobre las dos páginas. En la derecha hay muchos menos bordes y botones con relleno, y por eso destacan el título y el botón principal.'
    },
    moreMenu: ['Cambiar nombre', 'Eliminar'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'Jerarquía tipográfica',
        problem:
          'El título, los filtros y los botones están amontonados y todo el texto tiene el mismo tamaño',
        fix: 'Separa los niveles y coloca el título y los filtros en filas distintas. Dale al título el mayor tamaño, seguido de la descripción y luego de detalles como las fechas',
        result: 'De un vistazo sabes qué página es y dónde mirar primero'
      },
      {
        id: 'borders',
        n: '②',
        short: 'Menos bordes',
        problem: 'Cada módulo tiene un borde grueso y otro borde dentro',
        fix: 'Agrupa primero con alineación y espaciado. Conserva un borde solo donde haga falta marcar un límite',
        result: 'Con menos líneas, es más fácil ver qué elementos van juntos'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'Jerarquía de botones',
        problem:
          'Los 8 botones tienen relleno y todos parecen la acción principal',
        fix: 'Deja un solo botón principal por área y convierte los demás en botones con contorno o de texto',
        result: 'De un vistazo sabes dónde pulsar a continuación'
      },
      {
        id: 'scope',
        n: '④',
        short: 'Ubicación de las acciones',
        problem:
          '«Eliminar» solo afecta a un proyecto, pero aparece al lado de una acción de toda la página como «Nuevo»',
        fix: 'Coloca las acciones que afectan a toda la página en una zona general. Pon las que afectan a un solo elemento junto a ese elemento',
        result: 'Queda claro a qué afecta cada botón'
      }
    ],
    mock: {
      pageTitle: 'Proyectos',
      count: '2 proyectos',
      filters: ['Todos', 'Activos'],
      sort: 'Última actualización',
      create: 'Nuevo proyecto',
      export: 'Exportar',
      remove: 'Eliminar',
      open: 'Abrir',
      more: 'Más acciones',
      items: [
        { name: 'Diseño del curso', meta: 'Documentos · actualizados hoy' },
        {
          name: 'Notas de investigación',
          meta: 'Documentos · actualizados hace 3 días'
        }
      ]
    }
  },
  anatomy: {
    title: 'Anatomía de una página: cuatro niveles con funciones distintas',
    subtitle:
      'Pasa el cursor por un nivel de abajo para ver dónde aparece en la página. Haz clic para mantenerlo resaltado.',
    taskLabel: 'De qué se encarga',
    meansLabel: 'Cómo lo consigue',
    showLabels: 'Mostrar etiquetas',
    showGuides: 'Mostrar guías',
    guidesNote:
      'Con las guías activadas, verás que todo el contenido empieza en la misma línea vertical. Los elementos relacionados están juntos y entre los niveles hay más espacio.',
    gap: 'Espaciado',
    typeTitle:
      'El tamaño, el grosor y el tono del texto distinguen estas tres líneas',
    typeSample: 'Ejemplo',
    layers: [
      {
        id: 'locate',
        name: 'Orientación',
        task: 'Indica al usuario dónde está y cómo volver',
        means: 'Un título de navegación discreto y una forma familiar de volver'
      },
      {
        id: 'primary',
        name: 'Información principal',
        task: 'Indica al usuario qué es lo más importante de esta página',
        means:
          'El texto más grande de la página, seguido de un espacio en blanco y situado siempre en el mismo lugar'
      },
      {
        id: 'support',
        name: 'Información auxiliar',
        task: 'Añade contexto y metadatos',
        means:
          'El texto es más pequeño y claro, pero sigue siendo legible. Va justo al lado de lo que describe'
      },
      {
        id: 'action',
        name: 'Acciones',
        task: 'Indican al usuario qué puede hacer a continuación',
        means:
          'Después del contenido hay un botón principal con relleno y otros con menos énfasis'
      }
    ],
    typeScale: [
      {
        name: 'Título del contenido',
        px: 22,
        weight: 700,
        note: 'Aparece una sola vez en toda la página'
      },
      {
        name: 'Cuerpo del texto',
        px: 14,
        weight: 400,
        note: 'Tiene un interlineado algo mayor para facilitar la lectura'
      },
      {
        name: 'Texto auxiliar',
        px: 12,
        weight: 400,
        note: 'Es más pequeño y claro, pero no conviene reducirlo más'
      }
    ],
    mock: {
      back: 'Volver',
      navTitle: 'Proyectos',
      title: 'Diseño del curso',
      meta: '4 miembros · 12 documentos · actualizado ayer',
      body: 'Seguimiento del diseño del curso de este semestre, con actualizaciones semanales.',
      link: 'Ver todos los documentos',
      primary: 'Abrir proyecto',
      secondary: 'Archivar'
    }
  },
  grouping: {
    title: '¿Hace falta un borde? Compruébalo en tres pasos',
    subtitle:
      'Abajo tienes el mismo formulario de configuración. Pulsa en los tres pasos en orden y fíjate en qué momento se distinguen los grupos.',
    stepLabel: 'Paso {n}',
    metricBorders: 'Bordes decorativos',
    metricGaps: 'Tamaños de espaciado distintos',
    showGaps: 'Mostrar espaciado',
    explicitToggle: 'Añadir un fondo tenue a «Notificaciones»',
    implicitTitle: 'Agrupación implícita',
    implicitText:
      'La distancia, la alineación y el espacio en blanco hacen que el contenido relacionado se perciba como un grupo sin dibujar un borde.',
    explicitTitle: 'Agrupación explícita',
    explicitText:
      'Un fondo de color o un contorno delimita mejor un grupo. Antes de añadirlo, pregúntate si el grupo realmente necesita ese límite.',
    gapInside: 'Dentro del grupo',
    gapBetween: 'Entre grupos',
    steps: [
      {
        caption:
          'Primer paso: añade bordes a todo. Cada elemento pide atención y ya no se distingue qué elementos van juntos.'
      },
      {
        caption:
          'Segundo paso: quita solo los bordes. La página se ve más despejada, pero los espacios siguen siendo iguales y el contenido queda disperso.'
      },
      {
        caption:
          'Tercer paso: agrupa con el espaciado. Acerca los elementos relacionados y separa los demás. Los grupos ya se distinguen sin dibujar una sola línea.'
      }
    ],
    mock: {
      pageTitle: 'Configuración de la cuenta',
      basic: 'Información básica',
      email: 'Correo electrónico',
      phone: 'Teléfono móvil',
      password: 'Cambiar contraseña',
      newPassword: 'Nueva contraseña',
      confirm: 'Confirmar contraseña',
      notify: 'Notificaciones',
      mail: 'Notificaciones por correo',
      desktop: 'Notificaciones de escritorio',
      save: 'Guardar',
      cancel: 'Cancelar'
    }
  },
  buttonSpec: {
    title: 'La definición completa de un botón',
    subtitle:
      '«Añade un botón» se convierte en 10 preguntas en un sistema de diseño. Abre los apartados de la izquierda uno a uno para ver con cuánto detalle hay que describir cada aspecto.',
    questionLabel: 'Qué pregunta la guía',
    sampleLabel: 'Cómo queda por escrito',
    sourceLabel: 'Consultar la fuente',
    rolesRule:
      'El rol indica qué ocurre al pulsar el botón. La importancia se define por separado. Por eso, aunque Eliminar sea una acción peligrosa, el botón no debería ser el más visible de la página.',
    structureRule:
      'Empieza la etiqueta con un verbo. Frente a «OK», «Guardar borrador» deja claro de un vistazo qué pasará al pulsar.',
    visualRule:
      'El estilo indica cuánto destaca el botón y el rol indica qué ocurre al pulsarlo. Define ambos por separado.',
    sizeRule:
      'Un botón puede parecer pequeño, pero necesita una zona amplia para poder pulsarlo con el dedo. Por eso se definen las dos medidas por separado.',
    sizeVisible: 'Altura visible',
    sizeTarget: 'Zona pulsable',
    statesRule:
      'Define todos estos estados de antemano y usa algo más que el color para distinguirlos.',
    behaviorRule:
      'Tras pulsar, el usuario quiere saber qué pasa en todo momento. Responde al instante, muestra un indicador mientras espera y, si algo falla, explica qué hacer a continuación.',
    adaptiveRule:
      'Prueba el control de arriba. Al aumentar el tamaño del texto, el botón gana altura y la etiqueta pasa a otra línea sin quedar cortada.',
    a11yRule:
      'El botón también debe poder usarse solo con el teclado o sin ver la pantalla.',
    boundaryRule:
      'Una última función de la guía es indicar cuándo conviene evitar un componente. Es tan importante como explicar para qué sirve.',
    a11yNoName: 'El lector de pantalla anuncia «botón»',
    a11yWithName: 'El lector de pantalla anuncia «Eliminar, botón»',
    fontSize: 'Tamaño de letra',
    dimsLabel: 'Aspectos que hay que definir',
    purposeExamples: ['Guardar', 'Enviar', 'Eliminar'],
    purposeLine:
      'Aunque estos tres botones se vean distintos, cumplen la misma función: al pulsarlos, activan una acción de inmediato.',
    roleSamples: {
      Normal: 'Vista previa',
      Primary: 'Publicar',
      Cancel: 'Cancelar',
      Destructive: 'Eliminar proyecto'
    },
    anatomyBtn: 'Publicar proyecto',
    genericBtn: 'Continuar',
    deleteLabel: 'Eliminar',
    roles: [
      {
        name: 'Normal',
        desc: 'Una acción habitual que no necesita énfasis adicional'
      },
      {
        name: 'Primary',
        desc: 'La acción que conviene realizar ahora, una o dos por página'
      },
      {
        name: 'Cancel',
        desc: 'Permite abandonar la acción sin quitar protagonismo al botón principal'
      },
      {
        name: 'Destructive',
        desc: 'La acción es irreversible, así que usa un color de advertencia y evita que sea la opción por defecto'
      }
    ],
    parts: [
      {
        name: 'Contenedor',
        desc: 'Es el cuerpo del botón y define su color, su tamaño y cómo cambia al pulsarlo'
      },
      {
        name: 'Icono',
        desc: 'Es opcional y ayuda a reconocer de un vistazo para qué sirve el botón'
      },
      { name: 'Etiqueta', desc: 'Aclara qué ocurrirá al pulsar el botón' }
    ],
    levels: [
      {
        name: 'Filled',
        desc: 'El estilo más visible, reservado para la acción más importante del momento'
      },
      {
        name: 'Tonal',
        desc: 'Destaca algo más que un contorno y sirve para acciones secundarias que conviene hacer visibles'
      },
      {
        name: 'Outlined',
        desc: 'La acción alternativa que acompaña al botón con relleno'
      },
      { name: 'Text', desc: 'El estilo más discreto, para accesos auxiliares' }
    ],
    stateGallery: [
      'Por defecto',
      'Al pasar el cursor',
      'Pulsado',
      'Con foco',
      'Deshabilitado'
    ],
    behaviorStages: ['Listo', 'Pulsado', 'En curso', 'Completado / Con error'],
    a11yChecks: [
      'Tiene un nombre accesible aunque solo muestre un icono',
      'Se puede enfocar con el teclado y el foco es visible',
      'El texto y el fondo tienen suficiente contraste',
      'El estado se comunica con algo más que el color'
    ],
    boundaries: [
      { want: 'Ir a otra página', use: 'Enlace, pestaña' },
      {
        want: 'Alternar entre dos estados',
        use: 'Interruptor, botón de alternancia'
      },
      { want: 'Elegir un valor entre varios', use: 'Botón Pop-up, selector' },
      { want: 'Agrupar comandos de uso poco frecuente', use: 'Menú' }
    ],
    boundaryWant: 'Qué quieres hacer',
    boundaryUse: 'Componente más apropiado',
    dims: [
      {
        id: 'purpose',
        name: 'Propósito',
        question: '¿Qué problema resuelve este elemento?',
        sample:
          'El botón «Publicar» envía el proyecto actual. Si el envío se completa, el proyecto pasa al estado publicado.',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'Rol',
        question: '¿Expresa una acción, una selección o navegación?',
        sample:
          '«Eliminar proyecto» tiene el rol Destructive y el estilo Outlined. No es el botón por defecto.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: 'Estructura',
        question: '¿De qué partes se compone?',
        sample:
          'Incluye un contenedor, un icono opcional y una etiqueta de una línea con una frase que empieza por un verbo.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: 'Diseño visual',
        question: '¿Cómo se comunica la prioridad?',
        sample:
          'En esta página solo «Publicar» usa Filled. Las demás acciones usan Outlined o Text.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'Tamaño',
        question: '¿Qué restricciones de tamaño y espaciado tiene?',
        sample:
          'La altura visible es 40 y la zona pulsable mide al menos 44×44. Los botones de un grupo tienen la misma altura y un espaciado de 8.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: 'Estados',
        question: '¿Qué muestra en cada situación?',
        sample:
          'Define seis estados: por defecto, al pasar el cursor, pulsado, con foco, deshabilitado y en carga.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: 'Comportamiento',
        question: '¿Qué ocurre cuando se activa?',
        sample:
          'Al pulsarlo, entra de inmediato en el estado de carga y bloquea los envíos repetidos. Al terminar, comunica el resultado.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: 'Adaptación',
        question: '¿Cómo sigue siendo usable si cambian las condiciones?',
        sample:
          'Cuando aumenta el tamaño de letra, la etiqueta puede ocupar dos líneas y el botón aumenta de altura.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'Accesibilidad',
        question: '¿Se puede usar sin depender de un sentido concreto?',
        sample:
          'El botón de icono tiene «Eliminar» como nombre accesible. El orden del foco coincide con el orden visual.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: 'Límites',
        question: '¿Cuándo conviene evitarlo?',
        sample:
          'Usa un enlace para ir a otra página y un interruptor para alternar entre dos valores.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'Estados y comportamiento de los botones',
    subtitle:
      'El estado muestra cómo se ve el botón en ese momento. El comportamiento es lo que ocurre al pulsarlo.',
    statesTitle: 'Primero, los seis estados',
    stateHead: [
      'Estado',
      'Cuándo aparece',
      'Cómo cambia el aspecto',
      'En qué fijarte'
    ],
    liveHint:
      'Pasa el cursor por encima del botón, mantenlo pulsado o selecciónalo con la tecla Tab. Fíjate en cómo cambia en cada caso.',
    currentState: 'Estado actual',
    sample: 'Botón',
    stateNames: {
      default: 'Por defecto',
      hover: 'Al pasar el cursor',
      pressed: 'Pulsado',
      focus: 'Con foco'
    },
    states: [
      {
        id: 'default',
        name: 'Por defecto',
        trigger: 'Sin interacción',
        change: 'Aspecto habitual',
        tip: 'La mayoría de los botones de una página están en este estado'
      },
      {
        id: 'hover',
        name: 'Al pasar el cursor',
        trigger: 'El puntero entra en el área del botón',
        change: 'El fondo se oscurece un poco',
        tip: 'Indica al usuario que puede pulsarlo'
      },
      {
        id: 'pressed',
        name: 'Pulsado',
        trigger: 'El botón sigue pulsado',
        change: 'El fondo se oscurece aún más',
        tip: 'Si diseñas tu propio botón, tendrás que añadir este estado'
      },
      {
        id: 'focus',
        name: 'Con foco',
        trigger: 'El foco llega al botón con la tecla Tab',
        change: 'Aparece un anillo de foco alrededor del botón',
        tip: 'Evita quitarlo con outline: none'
      },
      {
        id: 'disabled',
        name: 'Deshabilitado',
        trigger: 'No se cumple una condición previa',
        change: 'Baja la opacidad y el botón deja de responder al clic',
        tip: 'Conviene indicar también por qué no se puede pulsar'
      },
      {
        id: 'loading',
        name: 'En carga',
        trigger: 'La acción ya ha empezado y aún no ha terminado',
        change:
          'La etiqueta anuncia que la acción está en curso y aparece un indicador',
        tip: 'Le dice al usuario «estoy procesando la acción». Un botón deshabilitado indica «no puedes pulsarlo»'
      }
    ],
    behaviorTitle: 'Después, el comportamiento al pulsar el botón',
    behaviorHint:
      'Pulsa «Publicar proyecto» una vez y observa todo lo que ocurre hasta que se muestra el resultado.',
    scenario: 'Resultado simulado',
    scenarioSuccess: 'Éxito',
    scenarioFail: 'Error',
    run: 'Publicar proyecto',
    running: 'Publicando…',
    done: 'Publicado',
    failed: 'No se ha podido publicar. Se ha conservado tu contenido',
    retry: 'Volver a intentar',
    stageHead: ['Etapa', 'Qué necesita saber el usuario'],
    stages: [
      {
        name: 'Listo',
        desc: 'Antes de pulsar: el botón me indica qué va a ocurrir'
      },
      {
        name: 'Respuesta inmediata',
        desc: 'Al pulsar: el aspecto cambia y sé que la pulsación se ha registrado'
      },
      {
        name: 'En curso',
        desc: 'Durante la espera: un indicador muestra el progreso y se bloquean las pulsaciones repetidas'
      },
      {
        name: 'Resultado',
        desc: 'Comunica el éxito con claridad y, si algo falla, explica el siguiente paso'
      },
      {
        name: 'Recuperación',
        desc: 'Si algo falla, los datos que introduje se conservan y puedo volver a intentarlo'
      }
    ],
    rulesTitle: 'Cuatro reglas',
    rules: [
      'Responde en cuanto se pulse, aunque solo sea oscureciendo un poco el botón',
      'Muestra un indicador durante la espera para que el usuario sepa que la página sigue funcionando',
      'Durante la carga, indica que la acción está en curso. Si el botón está deshabilitado, indica que no se puede pulsar',
      'Actualiza también la etiqueta. Antes de pulsar, dice «Publicar proyecto». Después, «Publicando…»'
    ]
  },
  lookalike: {
    title: 'Se parecen, pero funcionan de forma distinta',
    subtitle:
      'Los dos controles de abajo tienen un aspecto casi idéntico. Abre cada uno, elige una opción y fíjate en qué se diferencian.',
    popupTag: 'Elige un valor',
    pullTag: 'Ejecuta un comando',
    popupInitial: 'Orden: más recientes',
    popupPrefix: 'Orden: ',
    popupOptions: ['Más recientes', 'Más antiguos', 'Nombre'],
    pullInitial: 'Acciones',
    pullOptions: ['Cambiar nombre', 'Copiar enlace', 'Eliminar'],
    pullDone: 'Acción ejecutada: {name}',
    popupValue: 'Valor actual: {value}',
    pullIdle: 'Todavía no se ha ejecutado ningún comando',
    tableHead: ['', 'Botón Pop-up', 'Botón Pull-down'],
    rows: [
      [
        'Al abrirlo',
        'Varias opciones para elegir, con la actual marcada',
        'Varios comandos que puedes ejecutar'
      ],
      [
        'Al elegir una opción',
        'Recuerda tu elección y actualiza el texto del botón',
        'Ejecuta el comando y se cierra. El texto del botón sigue igual'
      ],
      [
        'Sirve para',
        'Cambiar el orden, elegir una vista o seleccionar una opción',
        'Acciones como cambiar el nombre, exportar o eliminar'
      ],
      ['Evita usarlo para', 'Agrupar comandos', 'Filtrar o navegar']
    ],
    conclusion:
      '¿Has visto la diferencia? Los controles se ven iguales, pero al pulsarlos, el de la izquierda cambió un valor y el de la derecha ejecutó una acción. Si vuelves a dudar, piensa en qué quiere hacer el usuario al pulsar: elegir un valor o ejecutar una acción.'
  },
  skeleton: {
    title: 'Anatomía de una página: navegación, contenido y acciones',
    subtitle:
      'Abajo tienes una página de lista de proyectos. Pasa el cursor por un elemento de la izquierda o haz clic para fijarlo. La línea continua señala dónde aparece y la discontinua indica a qué afecta.',
    legendCtl: 'Línea continua: dónde aparece',
    legendAffect: 'Línea discontinua: a qué afecta',
    leading: 'El botón de volver y el título van a la izquierda',
    trailing: 'Las acciones van a la derecha y solo destaca una',
    taskLabel: 'Qué pregunta responde',
    affectLabel: 'A qué afecta',
    misplacedToggle: 'Prueba a mover Eliminar a la barra superior',
    misplacedHint:
      '«Eliminar» aparece ahora junto a «Nuevo proyecto» en la barra superior. Si lo pulsas, ¿qué proyecto se elimina? Ya no queda claro. Por eso, cada acción debe ir junto al contenido al que afecta.',
    items: [
      {
        id: 'global',
        name: 'Navegación global',
        question: '¿A qué sección del producto quiero ir?',
        affect: 'Toda la página da paso a otra sección'
      },
      {
        id: 'locate',
        name: 'Título de la página',
        question: '¿En qué página estoy y cómo vuelvo?',
        affect: 'Esta página'
      },
      {
        id: 'content',
        name: 'Contenido principal',
        question: '¿Qué estoy viendo?',
        affect: 'Es el contenido al que afectan los demás controles'
      },
      {
        id: 'listctl',
        name: 'Filtros y orden',
        question: '¿Cómo quiero ver esta lista?',
        affect: 'Qué proyectos se muestran en la lista y en qué orden'
      },
      {
        id: 'pageact',
        name: 'Acciones de toda la página',
        question: '¿Qué quiero hacer con toda la página?',
        affect: 'Todos los proyectos de la lista'
      },
      {
        id: 'itemact',
        name: 'Acciones por elemento',
        question: '¿Qué quiero hacer con un elemento concreto?',
        affect: 'Solo ese proyecto'
      }
    ],
    mock: {
      nav: ['Proyectos', 'Miembros', 'Configuración'],
      title: 'Proyectos',
      section: 'Proyectos recientes',
      filters: ['Todos', 'Activos'],
      sort: 'Última actualización',
      export: 'Exportar',
      create: 'Nuevo proyecto',
      remove: 'Eliminar',
      open: 'Abrir',
      more: 'Más acciones',
      items: [
        { name: 'Diseño del curso', meta: 'Documentos · actualizados hoy' },
        {
          name: 'Notas de investigación',
          meta: 'Documentos · actualizados hace 3 días'
        }
      ]
    }
  },
  specMap: {
    title: 'Qué contiene una guía de diseño',
    subtitle:
      'Mucha gente piensa que las guías de diseño solo hablan de colores y bordes redondeados. Cuenta conmigo los apartados del índice de las guías de Apple: hay 6 categorías y 158 temas. Pulsa en un tema de abajo o usa los interruptores de arriba para encontrar los que tienen que ver con las páginas y los botones.',
    checkedAt:
      'Las categorías y las cifras se cotejaron con el índice de Apple HIG en noviembre de 2026',
    all: 'Todos los temas',
    page: 'Sobre páginas',
    button: 'Sobre botones',
    topicsUnit: 'temas',
    moreTopics: '{n} más',
    pick: 'Pulsa un tema para ver qué pregunta responde',
    questionLabel: 'Qué pregunta responde',
    relPage: 'Lo usarás en la parte del capítulo sobre páginas',
    relButton: 'Lo usarás en la parte del capítulo sobre botones',
    relNone:
      'Aquí todavía no lo necesitas, pero te lo encontrarás al diseñar productos',
    relPageShort: 'Sobre páginas',
    relButtonShort: 'Sobre botones',
    relBoth: 'Sirve tanto para páginas como para botones',
    paraphraseNote:
      'Hemos reformulado estas preguntas con nuestras propias palabras. La redacción oficial puede ser distinta.',
    takeaway:
      'Al contar los temas, verás que la jerarquía de las páginas y los botones solo ocupan una pequeña parte. Cuando entiendas esta parte, tendrás un criterio para interpretar el resto por tu cuenta.',
    categories: [
      {
        id: 'getting-started',
        name: 'Primeros pasos y plataformas',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'Principios de diseño',
            rel: 'both',
            q: 'Qué hace que una interfaz sea fácil de usar y agradable a la vista, y cómo evaluarlo'
          },
          {
            name: 'Diseño para iOS',
            rel: '',
            q: 'A qué prestar especial atención al diseñar para un móvil'
          },
          {
            name: 'Diseño para macOS',
            rel: '',
            q: 'En qué se diferencia diseñar para un ordenador de diseñar para un móvil'
          }
        ]
      },
      {
        id: 'foundations',
        name: 'Fundamentos',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'Disposición',
            rel: 'page',
            q: 'Cómo distribuir los elementos de una página para que se adapten a distintos tamaños de pantalla'
          },
          {
            name: 'Tipografía',
            rel: 'page',
            q: 'Qué tamaños y grosores de letra ayudan a distinguir el contenido principal del secundario'
          },
          {
            name: 'Color',
            rel: 'both',
            q: 'Dónde usar cada color y qué hacer en el modo oscuro'
          },
          {
            name: 'Accesibilidad',
            rel: 'both',
            q: 'Cómo pueden usar tu producto las personas con dificultades de visión o audición, o que solo usan el teclado'
          },
          {
            name: 'Iconos',
            rel: 'button',
            q: 'Qué estilo y tamaño deben tener los iconos y cuándo necesitan una etiqueta de texto'
          },
          {
            name: 'Textos de interfaz',
            rel: 'both',
            q: 'Cómo redactar botones y mensajes para que se entiendan de un vistazo'
          },
          {
            name: 'Animaciones',
            rel: '',
            q: 'Cuándo conviene animar un elemento y cómo hacerlo sin distraer'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Patrones de interacción',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'Respuesta a las acciones',
            rel: 'button',
            q: 'Cómo indicar al usuario que su pulsación se ha registrado'
          },
          {
            name: 'En carga',
            rel: 'both',
            q: 'Qué mostrar durante la espera para que la página no parezca bloqueada'
          },
          {
            name: 'Deshacer y rehacer',
            rel: 'both',
            q: 'Cómo recuperarse de un error y qué acciones se pueden ejecutar sin confirmación'
          },
          {
            name: 'Modalidad',
            rel: 'page',
            q: 'Cuándo se puede interrumpir al usuario y cómo permitirle volver'
          },
          {
            name: 'Búsqueda',
            rel: 'page',
            q: 'Cómo ayudar al usuario a encontrar pronto lo que busca'
          },
          {
            name: 'Configuración',
            rel: 'page',
            q: 'Cómo organizar una página de configuración para que nadie se pierda'
          }
        ]
      },
      {
        id: 'components',
        name: 'Componentes',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'Botones',
            rel: 'button',
            q: 'Qué acciones deben representarse con botones y qué estados necesitan'
          },
          {
            name: 'Barras de herramientas',
            rel: 'page',
            q: 'Cómo agrupar una fila de acciones y cuál va en el lugar más visible'
          },
          {
            name: 'Menús',
            rel: 'button',
            q: 'Cómo agrupar muchos comandos y cuándo conviene evitar un menú'
          },
          {
            name: 'Alertas',
            rel: 'both',
            q: 'Qué información es lo bastante importante como para interrumpir al usuario'
          },
          {
            name: 'Listas y tablas',
            rel: 'page',
            q: 'Cómo ordenar muchas filas para que se puedan revisar de un vistazo'
          },
          {
            name: 'Interruptores',
            rel: 'button',
            q: 'Qué control usar para alternar entre dos estados'
          },
          {
            name: 'Selectores',
            rel: 'button',
            q: 'Qué control usar para elegir entre varios valores'
          }
        ]
      },
      {
        id: 'inputs',
        name: 'Métodos de entrada',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'Gestos',
            rel: '',
            q: 'Qué acciones se pueden realizar al deslizar o tocar'
          },
          {
            name: 'Teclados',
            rel: 'both',
            q: 'Si todo el recorrido se puede completar solo con el teclado'
          },
          {
            name: 'Dispositivos apuntadores',
            rel: 'both',
            q: 'Cómo debe responder un control al pasar el cursor por encima o pulsarlo'
          }
        ]
      },
      {
        id: 'technologies',
        name: 'Tecnologías y servicios',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: 'Notificaciones',
            rel: '',
            q: 'Cuándo enviar una notificación y cómo redactarla sin molestar'
          },
          {
            name: 'Widgets',
            rel: '',
            q: 'Cuánto contenido debe mostrar un widget de la pantalla de inicio'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'Qué acciones se pueden realizar con solo pedirlas en voz alta'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'Ahora te toca decidir: ¿cuál debería ser el botón principal?',
    subtitle:
      'Abajo tienes una página para editar un proyecto. Para que el problema se vea mejor, he hecho que los 5 botones tengan el mismo aspecto. Pulsa el que creas que debería destacar más.',
    cardTitle: 'Editar proyecto',
    nameLabel: 'Nombre del proyecto',
    nameValue: 'Diseño del curso',
    descLabel: 'Descripción',
    descValue: 'Seguimiento del diseño del curso de este semestre',
    buttons: [
      { id: 'save', label: 'Guardar cambios' },
      { id: 'preview', label: 'Vista previa' },
      { id: 'export', label: 'Exportar' },
      { id: 'cancel', label: 'Cancelar' },
      { id: 'remove', label: 'Eliminar proyecto' }
    ],
    hintToggle: '¿Tienes dudas? Consulta los pasos para decidir',
    stepsTitle: 'Tres preguntas para jerarquizar los botones',
    steps: [
      {
        q: '¿Qué quiere conseguir el usuario al abrir esta página?',
        a: 'Guardar los cambios. Ese es el único botón principal.'
      },
      {
        q: '¿Qué acciones solo sirven de apoyo?',
        a: 'Vista previa, Exportar y Cancelar. Usa botones con contorno o de texto para darles menos protagonismo.'
      },
      {
        q: '¿Qué acción no se puede deshacer?',
        a: 'Eliminar proyecto. Usa un color de advertencia y ponla lejos del botón principal.'
      }
    ],
    feedback: {
      save: 'El usuario ha abierto «Editar proyecto» para guardar los cambios, así que ese debe ser el único botón principal.',
      preview:
        'Vista previa es un paso auxiliar para comprobar el resultado antes de guardar. Basta con un botón con contorno.',
      export:
        'Exportar es una acción auxiliar que se usa con menos frecuencia. Basta con un botón de texto.',
      cancel:
        'Cancelar permite salir. Debe ser fácil de encontrar y destacar menos que la tarea principal.',
      remove:
        'Eliminar proyecto es la acción más peligrosa, pero el usuario ha venido a editar. Basta con señalar el peligro en rojo y reservar el botón principal para guardar.'
    },
    wrongLabel: 'Casi',
    rightLabel: '¡Has acertado!',
    solvedTitle: 'Después de corregirlo',
    solvedNote:
      'Ahora se entiende de un vistazo: la acción principal es guardar, puedes previsualizar primero si quieres y Eliminar queda separado en el otro lado.',
    reset: 'Volver a probar'
  },
  fluent: {
    title: 'Cuantos más botones hay, más importa decidir cuál destaca',
    subtitle:
      'Fluent 2 distingue cuatro niveles: Primary, Secondary, Subtle y Transparent. La fila de abajo reúne acciones de una página de administración. Arrastra el control para añadir o quitar botones y alterna entre las dos opciones para ver qué cambia.',
    count: 'Número de botones',
    styleAll: 'Hacer que todos sean Primary',
    styleLevels: 'Usar los cuatro niveles de Fluent',
    allNote:
      'Todos son botones Primary con relleno. Cuando hay tantos, cuesta saber dónde mirar primero.',
    levelsNote:
      'Solo «Nuevo proyecto» sigue siendo Primary. «Exportar» pasa a Secondary y los demás apenas se ven hasta que pasas el cursor por encima.',
    legendTitle: 'Pasa el cursor para comparar los cuatro niveles',
    levels: [
      { name: 'Primary', desc: 'Con relleno. Uno por área' },
      {
        name: 'Secondary',
        desc: 'Con contorno. Para acciones secundarias de uso frecuente'
      },
      {
        name: 'Subtle',
        desc: 'Transparente. Al pasar el cursor aparece un fondo tenue'
      },
      {
        name: 'Transparent',
        desc: 'El borde aparece al pasar el cursor'
      }
    ],
    actions: [
      { id: 'create', label: 'Nuevo proyecto' },
      { id: 'export', label: 'Exportar' },
      { id: 'import', label: 'Importar' },
      { id: 'filter', label: 'Filtrar' },
      { id: 'sort', label: 'Ordenar' },
      { id: 'refresh', label: 'Actualizar' },
      { id: 'share', label: 'Compartir' },
      { id: 'archive', label: 'Archivar' }
    ]
  },
  tokens: {
    title: 'Cambia un valor y las dos páginas cambian a la vez',
    subtitle:
      'Atlassian convierte valores como el color, el radio de las esquinas y el tamaño en tokens (cada valor es un token). Todas las páginas usan el mismo conjunto. Abajo hay dos páginas. Arrastra los controles de la derecha y marca «Cada página por su cuenta» para comparar.',
    pageA: 'Lista de proyectos',
    pageB: 'Configuración de la cuenta',
    radius: 'Radio de las esquinas',
    height: 'Altura del botón',
    accent: 'Color de acento',
    pixel: '{n}px',
    colors: ['Azul', 'Verde', 'Naranja', 'Morado'],
    inconsistent: 'Cada página por su cuenta (sin tokens)',
    inconsistentNote:
      'La página de la derecha usa el color, el radio y la altura que alguien eligió sobre la marcha. Cada página se ve bien por separado, pero juntas ya no parecen del mismo producto.',
    consistentNote:
      'Ambas páginas usan el mismo conjunto de tokens. Por eso, al arrastrar los controles, han cambiado a la vez.',
    mock: {
      list: {
        title: 'Proyectos',
        create: 'Nuevo proyecto',
        open: 'Abrir',
        items: [
          { name: 'Diseño del curso', meta: 'Documentos · actualizados hoy' },
          {
            name: 'Notas de investigación',
            meta: 'Documentos · actualizados hace 3 días'
          }
        ]
      },
      settings: {
        title: 'Configuración de la cuenta',
        email: 'Correo electrónico',
        emailValue: 'you@example.com',
        notify: 'Recibir notificaciones',
        save: 'Guardar',
        cancel: 'Cancelar'
      }
    }
  },
  layers3: {
    title: 'Distingue los tres niveles',
    subtitle:
      'Una página suele tener tres niveles: información principal, información auxiliar y acciones secundarias. El contenido de abajo es siempre el mismo. Arrastra el control y observa cómo los tres niveles pasan de tener el mismo peso a distinguirse con claridad.',
    slider: 'Diferencia entre niveles',
    flat: 'Los tres tienen el mismo peso. Todo parece importante y nada destaca',
    mid: 'Se distinguen un poco. Primero ves el título y después la descripción',
    full: 'Se distinguen con claridad. De un vistazo sabes qué mirar primero y qué hacer después',
    labels: [
      'Información principal',
      'Información auxiliar',
      'Acciones secundarias'
    ],
    mock: {
      title: 'Diseño del curso',
      body: 'Seguimiento del diseño del curso de este semestre, con actualizaciones semanales.',
      meta: '4 miembros · 12 documentos · actualizado ayer',
      primary: 'Abrir proyecto',
      secondary: ['Archivar', 'Compartir']
    }
  },
  taskflow: {
    title: 'Una página, dos formas de organizarla',
    subtitle:
      'Las dos páginas de abajo tienen los mismos seis módulos. En la izquierda están colocados según se le ocurrieron a quien la diseñó. La derecha está organizada en torno a la tarea del usuario. Pasa el cursor por los pasos de la derecha para seguir el recorrido.',
    stacked: 'Módulos amontonados',
    task: 'En torno a la tarea',
    taskLine:
      'Tarea del usuario: encontrar el proyecto en el que trabajé por última vez y seguir editándolo',
    steps: [
      {
        name: 'Identificar la página',
        detail:
          'El título explica el objetivo de la página en una sola línea y es lo primero que se ve'
      },
      {
        name: 'Acotar la búsqueda',
        detail:
          'Los filtros van justo debajo del título, así puedo filtrar antes de buscar'
      },
      {
        name: 'Encontrar el proyecto',
        detail:
          'La lista de proyectos es el contenido principal y muestra primero los que se han actualizado más recientemente'
      },
      {
        name: 'Empezar a trabajar',
        detail:
          'La acción principal de cada fila va junto al elemento correspondiente'
      }
    ],
    modules: {
      title: 'Proyectos',
      goal: 'Gestiona todos tus proyectos',
      announce: 'Aviso',
      announceText: 'Mantenimiento programado este sábado, 02:00–04:00',
      recommend: 'Recomendación',
      recommendText: 'Prueba la nueva vista de Gantt',
      settings: 'Configuración',
      filter: 'Filtrar',
      list: 'Lista de proyectos',
      open: 'Abrir',
      items: [
        { name: 'Diseño del curso', meta: 'Documentos · actualizados hoy' },
        {
          name: 'Notas de investigación',
          meta: 'Documentos · actualizados hace 3 días'
        }
      ]
    }
  },
  roleKinds: {
    title: 'Qué aspecto tienen los cinco roles habituales',
    subtitle:
      'Los cinco roles de la tabla anterior, dispuestos en una fila. Tienen el mismo tamaño y el mismo radio de las esquinas. Solo cambian el relleno y el color.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: 'La acción más importante del área',
        sample: 'Guardar'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: 'Acciones de apoyo',
        sample: 'Vista previa'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: 'Acciones de baja prioridad',
        sample: 'Más información'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: 'Acciones de riesgo como eliminar o desactivar',
        sample: 'Eliminar proyecto'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: 'Acciones de herramienta que afectan al elemento cercano',
        sample: 'Cerrar'
      }
    ]
  }
}
