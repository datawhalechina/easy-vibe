export default {
  common: {
    before: 'Avant',
    after: 'Après',
    reset: 'Réinitialiser'
  },
  compare: {
    title: 'Une même page, deux hiérarchies',
    subtitle:
      'Le texte est exactement le même des deux côtés. Seule la hiérarchie a changé. Survolez un des problèmes ci-dessous pour comparer les pages, puis déplacez le curseur du test des yeux plissés.',
    squint: 'Test des yeux plissés',
    squintHint:
      'Imaginez que vous plissez les yeux devant la page. Ce que vous distinguez encore dans le flou est ce qui attire le plus votre attention.',
    squintClear: 'Net',
    squintBlurry: 'Flou',
    issueLabel: 'Quatre problèmes dans la page de gauche',
    applyHint:
      'Essayez les interrupteurs au-dessus de la page de droite. Chaque fois que vous en désactivez un, un ancien problème réapparaît.',
    tableHead: ['Problème', 'Comment le corriger', 'Ce qui change'],
    metrics: {
      borders: 'Bordures décoratives',
      solid: 'Boutons pleins',
      legend:
        'Comparez les chiffres au-dessus des deux pages. À droite, les bordures et les boutons pleins sont beaucoup moins nombreux. Le titre et le bouton principal ressortent ainsi davantage.'
    },
    moreMenu: ['Renommer', 'Supprimer'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'Hiérarchie des tailles de texte',
        problem:
          'Le titre, les filtres et les boutons sont serrés les uns contre les autres. Tous les textes ont la même taille.',
        fix: 'Séparez le titre et les filtres sur deux lignes. Donnez la plus grande taille au titre, une taille intermédiaire à la description et la plus petite aux détails comme les dates.',
        result:
          'On comprend d’un coup d’œil à quoi sert la page et où regarder en premier.'
      },
      {
        id: 'borders',
        n: '②',
        short: 'Moins de bordures',
        problem:
          'Chaque module est entouré d’une bordure épaisse qui en contient une autre.',
        fix: 'Regroupez d’abord les éléments par l’alignement et l’espacement. Réservez les bordures aux groupes qui ont besoin d’une limite claire.',
        result:
          'Avec moins de traits, on voit mieux quels éléments vont ensemble.'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'Hiérarchie des boutons',
        problem:
          'Les 8 boutons sont pleins et ressemblent tous à l’action principale.',
        fix: 'Gardez un seul bouton principal par zone et utilisez des boutons à contour ou textuels pour les autres actions.',
        result: 'On voit d’un coup d’œil où cliquer ensuite.'
      },
      {
        id: 'scope',
        n: '④',
        short: 'Placement des actions',
        problem:
          '« Supprimer » ne concerne qu’un projet, mais se trouve à côté d’une action qui concerne toute la page, comme « Nouveau projet ».',
        fix: 'Placez les actions globales au niveau de la page et les actions propres à un élément juste à côté de cet élément.',
        result: 'On sait exactement sur quoi agit chaque bouton.'
      }
    ],
    mock: {
      pageTitle: 'Projets',
      count: '2 projets',
      filters: ['Tous', 'En cours'],
      sort: 'Dernière modification',
      create: 'Nouveau projet',
      export: 'Exporter',
      remove: 'Supprimer',
      open: 'Ouvrir',
      more: 'Plus d’actions',
      items: [
        {
          name: 'Conception du cours',
          meta: 'Document · mis à jour aujourd’hui'
        },
        {
          name: 'Notes de recherche',
          meta: 'Document · mis à jour il y a 3 jours'
        }
      ]
    }
  },
  anatomy: {
    title: 'Anatomie d’une page en quatre niveaux',
    subtitle:
      'Survolez un niveau ci-dessous pour voir où il se trouve sur la page. Cliquez dessus pour le garder en surbrillance.',
    taskLabel: 'Son rôle',
    meansLabel: 'Comment il le remplit',
    showLabels: 'Afficher les annotations',
    showGuides: 'Afficher les repères',
    guidesNote:
      'Les repères montrent que tous les éléments partent du même axe vertical. Les contenus liés sont rapprochés et des espaces plus grands séparent les niveaux.',
    gap: 'Espacement',
    typeTitle:
      'La taille, la graisse et l’intensité de la couleur suffisent à distinguer ces trois lignes.',
    typeSample: 'Exemple',
    layers: [
      {
        id: 'locate',
        name: 'Repères de navigation',
        task: 'Aide l’utilisateur à savoir où il se trouve et comment revenir en arrière.',
        means:
          'Un titre de navigation discret et un contrôle de retour familier.'
      },
      {
        id: 'primary',
        name: 'Information principale',
        task: 'Indique à l’utilisateur ce qui compte le plus sur la page.',
        means:
          'Le texte le plus grand de la page, placé à un endroit fixe et suivi d’un espace blanc.'
      },
      {
        id: 'support',
        name: 'Information secondaire',
        task: 'Apporte des explications et des métadonnées.',
        means:
          'Un texte plus petit et plus clair, toujours lisible et placé juste à côté de ce qu’il décrit.'
      },
      {
        id: 'action',
        name: 'Actions',
        task: 'Indiquent à l’utilisateur ce qu’il peut faire ensuite.',
        means:
          'Un bouton principal plein après le contenu, accompagné de boutons plus discrets.'
      }
    ],
    typeScale: [
      {
        name: 'Titre du contenu',
        px: 22,
        weight: 700,
        note: 'N’apparaît qu’une fois sur la page.'
      },
      {
        name: 'Corps du texte',
        px: 14,
        weight: 400,
        note: 'Conçu pour la lecture, avec un interligne un peu plus grand.'
      },
      {
        name: 'Texte secondaire',
        px: 12,
        weight: 400,
        note: 'Plus petit et plus clair. C’est la taille minimale.'
      }
    ],
    mock: {
      back: 'Retour',
      navTitle: 'Projets',
      title: 'Conception du cours',
      meta: '4 membres · 12 documents · mis à jour hier',
      body: 'Suivi de la conception du cours pour ce semestre. Mise à jour hebdomadaire.',
      link: 'Voir tous les documents',
      primary: 'Ouvrir le projet',
      secondary: 'Archiver'
    }
  },
  grouping: {
    title: 'Faut-il ajouter une bordure ? Voyez-le en trois étapes',
    subtitle:
      'Le formulaire de paramètres ci-dessous reste le même. Cliquez sur les trois étapes dans l’ordre pour voir quand les groupes deviennent clairs.',
    stepLabel: 'Étape {n}',
    metricBorders: 'Bordures décoratives',
    metricGaps: 'Tailles d’espacement utilisées',
    showGaps: 'Afficher les espacements',
    explicitToggle: 'Ajouter un fond légèrement teinté à « Notifications »',
    implicitTitle: 'Regroupement implicite',
    implicitText:
      'L’espacement, l’alignement et les espaces blancs suffisent à faire apparaître les groupes de contenus liés.',
    explicitTitle: 'Regroupement explicite',
    explicitText:
      'Un fond teinté ou un contour rend les limites d’un groupe plus visibles. Avant de l’ajouter, demandez-vous si le groupe a vraiment besoin d’une limite plus nette.',
    gapInside: 'Dans un groupe',
    gapBetween: 'Entre les groupes',
    steps: [
      {
        caption:
          'Première étape : tout est encadré. Chaque élément semble dire « Regardez-moi ! » et les groupes deviennent difficiles à reconnaître.'
      },
      {
        caption:
          'Deuxième étape : on retire seulement les bordures. La page paraît plus calme, mais comme tous les espacements sont identiques, les éléments restent éparpillés.'
      },
      {
        caption:
          'Troisième étape : on se sert des espacements. Rapprochez les éléments liés et éloignez les autres. Les groupes apparaissent sans qu’il soit nécessaire de tracer un trait.'
      }
    ],
    mock: {
      pageTitle: 'Paramètres du compte',
      basic: 'Informations de base',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      password: 'Modifier le mot de passe',
      newPassword: 'Nouveau mot de passe',
      confirm: 'Confirmer le mot de passe',
      notify: 'Notifications',
      mail: 'Notifications par e-mail',
      desktop: 'Notifications sur le bureau',
      save: 'Enregistrer',
      cancel: 'Annuler'
    }
  },
  buttonSpec: {
    title: 'La définition complète d’un bouton',
    subtitle:
      '« Ajouter un bouton » soulève 10 questions dans une guideline de design. Ouvrez-les une par une à gauche pour voir le niveau de détail attendu.',
    questionLabel: 'Ce que la guideline demande',
    sampleLabel: 'Exemple de définition',
    sourceLabel: 'Lire la source',
    rolesRule:
      'Le rôle indique ce qui se passe au clic. La priorité de l’action détermine sa visibilité. Même si Supprimer est une action à risque, elle ne doit pas être la plus visible de la page.',
    structureRule:
      'Commencez le libellé par un verbe. « Enregistrer le brouillon » indique tout de suite ce qui se passera au clic, là où « OK » reste vague.',
    visualRule:
      'Le style détermine la visibilité du bouton. Le rôle indique la conséquence du clic. Définissez-les séparément.',
    sizeRule:
      'Un bouton peut paraître petit tout en offrant une zone assez grande pour être touchée du doigt. Définissez les deux dimensions séparément.',
    sizeVisible: 'Hauteur visible',
    sizeTarget: 'Zone cliquable',
    statesRule:
      'Définissez tous ces états à l’avance et prévoyez d’autres repères que la couleur pour les distinguer.',
    behaviorRule:
      'Après le clic, l’utilisateur doit pouvoir suivre ce qui se passe à tout moment. Réagissez aussitôt, affichez un indicateur pendant l’attente et expliquez la suite en cas d’échec.',
    adaptiveRule:
      'Essayez le curseur ci-dessus. Quand le texte grossit, le bouton gagne en hauteur et le libellé passe à la ligne sans être tronqué.',
    a11yRule:
      'Le bouton doit rester utilisable au clavier seul ou sans voir l’écran.',
    boundaryRule:
      'Une guideline indique aussi dans quels cas éviter un composant. C’est aussi important que de savoir ce qu’il permet de faire.',
    a11yNoName: 'Le lecteur d’écran annonce « bouton »',
    a11yWithName: 'Le lecteur d’écran annonce « Supprimer, bouton »',
    fontSize: 'Taille du texte',
    dimsLabel: 'Éléments à définir',
    purposeExamples: ['Enregistrer', 'Envoyer', 'Supprimer'],
    purposeLine:
      'Ces trois boutons ont des apparences différentes et remplissent la même fonction de base : un clic déclenche aussitôt une action.',
    roleSamples: {
      Normal: 'Aperçu',
      Primary: 'Publier',
      Cancel: 'Annuler',
      Destructive: 'Supprimer le projet'
    },
    anatomyBtn: 'Publier le projet',
    genericBtn: 'Continuer',
    deleteLabel: 'Supprimer',
    roles: [
      {
        name: 'Normal',
        desc: 'Une action courante qui n’a pas besoin d’être particulièrement visible.'
      },
      {
        name: 'Primary',
        desc: 'L’action à privilégier à cet instant. Un ou deux boutons de ce type par page.'
      },
      {
        name: 'Cancel',
        desc: 'Permet de renoncer à l’action en laissant le bouton principal au premier plan.'
      },
      {
        name: 'Destructive',
        desc: 'L’action est irréversible. Utilisez une couleur d’avertissement et choisissez un autre bouton par défaut.'
      }
    ],
    parts: [
      {
        name: 'Conteneur',
        desc: 'Le corps du bouton définit sa couleur, sa taille et son apparence quand on appuie dessus.'
      },
      {
        name: 'Icône',
        desc: 'Facultative, elle aide à reconnaître la fonction du bouton d’un coup d’œil.'
      },
      {
        name: 'Libellé',
        desc: 'Indique clairement ce qui se passe au clic.'
      }
    ],
    levels: [
      {
        name: 'Filled',
        desc: 'Le plus visible, réservé à l’action la plus importante du moment.'
      },
      {
        name: 'Tonal',
        desc: 'Un peu plus visible qu’un contour, pour les actions secondaires qui doivent rester faciles à repérer.'
      },
      {
        name: 'Outlined',
        desc: 'L’action de rechange placée à côté d’un bouton plein.'
      },
      {
        name: 'Text',
        desc: 'Le plus discret, pour les accès secondaires.'
      }
    ],
    stateGallery: ['Par défaut', 'Survol', 'Enfoncé', 'Focus', 'Désactivé'],
    behaviorStages: ['Prêt', 'Enfoncé', 'En cours', 'Terminé / échec'],
    a11yChecks: [
      'Un nom accessible est défini, y compris pour les boutons composés uniquement d’une icône.',
      'Le bouton est accessible au clavier et son focus est visible.',
      'Le contraste entre le texte et le fond est suffisant.',
      'L’état se reconnaît aussi sans la couleur.'
    ],
    boundaries: [
      {
        want: 'Aller sur une autre page',
        use: 'Lien, onglet'
      },
      {
        want: 'Passer d’un état à l’autre',
        use: 'Interrupteur, bouton bascule'
      },
      {
        want: 'Choisir une valeur parmi plusieurs',
        use: 'Bouton Pop-up, sélecteur'
      },
      {
        want: 'Regrouper des commandes rarement utilisées',
        use: 'Menu'
      }
    ],
    boundaryWant: 'Ce que vous voulez faire',
    boundaryUse: 'Composant mieux adapté',
    dims: [
      {
        id: 'purpose',
        name: 'Usage',
        question: 'À quel besoin répond cet élément ?',
        sample:
          'Le bouton « Publier » soumet le projet en cours. Si l’action réussit, le projet passe à l’état « Publié ».',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'Rôle',
        question: 'Exprime-t-il une action, un choix ou une navigation ?',
        sample:
          '« Supprimer le projet » a le rôle Destructive, le style Outlined et reste distinct du bouton par défaut.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: 'Structure',
        question: 'De quelles parties se compose-t-il ?',
        sample:
          'Un conteneur, une icône facultative et un libellé. Le libellé commence par un verbe et tient sur une ligne.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: 'Visuel',
        question: 'Comment faire ressortir les actions prioritaires ?',
        sample:
          'Sur cette page, seul « Publier » utilise le style Filled. Les autres actions utilisent Outlined ou Text.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'Dimensions',
        question: 'Quelles contraintes déterminent sa disposition ?',
        sample:
          'La hauteur visible est de 40 et la zone cliquable mesure au moins 44×44. Les boutons d’un même groupe ont la même hauteur et sont séparés par un espace de 8.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: 'États',
        question: 'Qu’affiche-t-il dans chaque situation ?',
        sample:
          'Définissez six états : par défaut, survol, appui, focus, désactivé et chargement.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: 'Comportement',
        question: 'Que se passe-t-il après le déclenchement ?',
        sample:
          'Passez à l’état de chargement dès le clic et bloquez les envois répétés. Indiquez ensuite le résultat.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: 'Adaptation',
        question:
          'Comment reste-t-il utilisable quand les conditions changent ?',
        sample:
          'Quand la taille du texte augmente, laissez le libellé passer sur deux lignes et augmentez la hauteur du bouton en conséquence.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'Accessibilité',
        question: 'Peut-on l’utiliser sans dépendre d’un sens en particulier ?',
        sample:
          'Le bouton à icône a « Supprimer » comme nom accessible. L’ordre du focus correspond à l’ordre visuel.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: 'Limites',
        question: 'Dans quels cas faut-il éviter de l’utiliser ?',
        sample:
          'Utilisez un lien pour aller sur une autre page ou un interrupteur pour basculer entre deux valeurs.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'États et comportement d’un bouton',
    subtitle:
      'L’état décrit l’apparence du bouton à un instant donné. Le comportement décrit ce qui se passe après le clic.',
    statesTitle: 'Commençons par les six états',
    stateHead: [
      'État',
      'Quand il apparaît',
      'Ce qui change à l’écran',
      'À retenir'
    ],
    liveHint:
      'Survolez ce bouton, maintenez-le enfoncé ou donnez-lui le focus avec la touche Tab. Observez comment il change à chaque fois.',
    currentState: 'État actuel',
    sample: 'Bouton',
    stateNames: {
      default: 'Par défaut',
      hover: 'Survol',
      pressed: 'Enfoncé',
      focus: 'Focus'
    },
    states: [
      {
        id: 'default',
        name: 'Par défaut',
        trigger: 'Aucune interaction',
        change: 'Apparence habituelle',
        tip: 'La plupart des boutons d’une page sont dans cet état.'
      },
      {
        id: 'hover',
        name: 'Survol',
        trigger: 'Le pointeur arrive sur le bouton',
        change: 'Le fond s’assombrit légèrement',
        tip: 'Ce changement indique que le bouton est cliquable.'
      },
      {
        id: 'pressed',
        name: 'Enfoncé',
        trigger: 'L’appui est maintenu',
        change: 'Le fond s’assombrit davantage',
        tip: 'Si vous créez votre propre bouton, pensez à prévoir cet état.'
      },
      {
        id: 'focus',
        name: 'Focus',
        trigger: 'La touche Tab déplace le focus sur le bouton',
        change: 'Un contour de focus apparaît',
        tip: 'Gardez ce contour visible en évitant outline: none.'
      },
      {
        id: 'disabled',
        name: 'Désactivé',
        trigger: 'Une condition préalable n’est pas remplie',
        change: 'Le bouton devient moins opaque et ne réagit plus au clic',
        tip: 'Dans l’idéal, expliquez aussi pourquoi le bouton est désactivé.'
      },
      {
        id: 'loading',
        name: 'Chargement',
        trigger: 'L’action a commencé et se poursuit',
        change:
          'Le libellé indique que l’opération est en cours et un indicateur apparaît',
        tip: 'Cet état signale à l’utilisateur que son action est en cours. L’état désactivé signale que le bouton est indisponible.'
      }
    ],
    behaviorTitle: 'Comportement après le clic',
    behaviorHint:
      'Cliquez une fois sur « Publier le projet » et observez tout ce qui se passe jusqu’au résultat.',
    scenario: 'Résultat simulé',
    scenarioSuccess: 'Réussite',
    scenarioFail: 'Échec',
    run: 'Publier le projet',
    running: 'Publication en cours…',
    done: 'Publié',
    failed: 'La publication a échoué. Votre contenu a été conservé.',
    retry: 'Réessayer',
    stageHead: ['Étape', 'Ce que l’utilisateur doit savoir'],
    stages: [
      {
        name: 'Prêt',
        desc: 'Avant le clic, le bouton m’indique ce qui va se passer.'
      },
      {
        name: 'Retour immédiat',
        desc: 'Au moment du clic, le bouton change d’apparence. Je sais que le clic a été pris en compte.'
      },
      {
        name: 'En cours',
        desc: 'Pendant l’attente, un indicateur montre la progression et les clics répétés sont bloqués.'
      },
      {
        name: 'Résultat',
        desc: 'Indiquez clairement la réussite. En cas d’échec, expliquez la marche à suivre.'
      },
      {
        name: 'Reprise',
        desc: 'En cas d’échec, ma saisie est conservée et je peux réessayer.'
      }
    ],
    rulesTitle: 'Quatre règles',
    rules: [
      'Réagissez dès le clic, même si le seul changement est un fond un peu plus foncé.',
      'Affichez un indicateur pendant l’attente pour que l’utilisateur sache que la page répond toujours.',
      'En cours de chargement, l’action se poursuit. Quand le bouton est désactivé, l’action est indisponible.',
      'Faites évoluer le libellé avec l’action. Affichez « Publier le projet » avant le clic et « Publication en cours… » après.'
    ]
  },
  lookalike: {
    title: 'Deux contrôles qui se ressemblent et réagissent différemment',
    subtitle:
      'Les deux contrôles ci-dessous se ressemblent presque trait pour trait. Ouvrez-les et choisissez une option dans chacun pour voir la différence.',
    popupTag: 'Sélectionne une valeur',
    pullTag: 'Exécute une commande',
    popupInitial: 'Tri : plus récents',
    popupPrefix: 'Tri : ',
    popupOptions: ['Plus récents', 'Plus anciens', 'Nom'],
    pullInitial: 'Actions',
    pullOptions: ['Renommer', 'Copier le lien', 'Supprimer'],
    pullDone: 'Commande exécutée : {name}',
    popupValue: 'Valeur actuelle : {value}',
    pullIdle: 'Aucune commande exécutée pour le moment',
    tableHead: ['', 'Bouton Pop-up', 'Bouton Pull-down'],
    rows: [
      [
        'À l’ouverture',
        'Plusieurs options, avec une coche devant l’option sélectionnée',
        'Plusieurs commandes à exécuter'
      ],
      [
        'Après avoir choisi une option',
        'Le contrôle mémorise votre choix et le libellé du bouton change',
        'Le contrôle exécute la commande et se referme. Le libellé reste le même'
      ],
      [
        'À utiliser pour',
        'Changer l’ordre de tri, choisir une vue ou sélectionner une option',
        'Effectuer des actions comme renommer, exporter ou supprimer'
      ],
      ['À éviter pour', 'Regrouper des commandes', 'Filtrer ou naviguer']
    ],
    conclusion:
      'Vous voyez la différence ? Les deux contrôles se ressemblent. Au clic, celui de gauche a simplement changé une valeur et celui de droite a exécuté une action. La prochaine fois que vous hésitez, posez-vous cette question : l’utilisateur veut-il choisir une valeur ou déclencher une action ?'
  },
  skeleton: {
    title: 'Anatomie d’une page : navigation, contenu et actions',
    subtitle:
      'Voici une page de liste de projets ordinaire. Survolez un élément à gauche ou cliquez dessus pour garder le repère. Le trait plein indique où il se trouve sur la page, les pointillés montrent ce qu’il affecte.',
    legendCtl: 'Trait plein : emplacement',
    legendAffect: 'Pointillés : portée',
    leading: 'Le retour et le titre sont à gauche',
    trailing: 'Les actions sont à droite, avec une seule mise en avant',
    taskLabel: 'La question à laquelle cet élément répond',
    affectLabel: 'Ce qu’il affecte',
    misplacedToggle: 'Essayez de déplacer « Supprimer » dans la barre d’outils',
    misplacedHint:
      '« Supprimer » se trouve maintenant dans la barre d’outils à côté de « Nouveau projet ». Quel projet serait supprimé au clic ? Impossible de le savoir. Placez donc chaque action près de l’élément qu’elle affecte.',
    items: [
      {
        id: 'global',
        name: 'Navigation globale',
        question: 'Dans quelle section du produit est-ce que je veux aller ?',
        affect: 'Une autre section remplace toute la page.'
      },
      {
        id: 'locate',
        name: 'Titre de la page',
        question: 'Sur quelle page suis-je et comment revenir en arrière ?',
        affect: 'La page en cours.'
      },
      {
        id: 'content',
        name: 'Contenu principal',
        question: 'Qu’est-ce que je suis en train de regarder ?',
        affect: 'C’est le contenu sur lequel agissent les autres contrôles.'
      },
      {
        id: 'listctl',
        name: 'Filtrage et tri',
        question: 'Comment est-ce que je veux afficher cette liste ?',
        affect: 'Les projets affichés dans la liste et leur ordre.'
      },
      {
        id: 'pageact',
        name: 'Actions sur la page',
        question: 'Qu’est-ce que je veux faire à l’échelle de la page ?',
        affect: 'Tous les projets de la liste.'
      },
      {
        id: 'itemact',
        name: 'Actions sur un élément',
        question: 'Qu’est-ce que je veux faire sur un élément en particulier ?',
        affect: 'Uniquement le projet concerné.'
      }
    ],
    mock: {
      nav: ['Projets', 'Membres', 'Paramètres'],
      title: 'Projets',
      section: 'Projets récents',
      filters: ['Tous', 'En cours'],
      sort: 'Dernière modification',
      export: 'Exporter',
      create: 'Nouveau projet',
      remove: 'Supprimer',
      open: 'Ouvrir',
      more: 'Plus d’actions',
      items: [
        {
          name: 'Conception du cours',
          meta: 'Document · mis à jour aujourd’hui'
        },
        {
          name: 'Notes de recherche',
          meta: 'Document · mis à jour il y a 3 jours'
        }
      ]
    }
  },
  specMap: {
    title: 'Que trouve-t-on dans des guidelines de design ?',
    subtitle:
      'Beaucoup pensent que les guidelines de design se limitent aux couleurs et aux coins arrondis. Prenons le sommaire des guidelines d’Apple : il contient 6 grandes catégories et 158 sujets. Cliquez sur les sujets ci-dessous ou utilisez le filtre au-dessus pour afficher ceux qui concernent les pages et les boutons.',
    checkedAt:
      'Catégories et décomptes vérifiés dans le sommaire des Apple HIG en novembre 2026',
    all: 'Tous les sujets',
    page: 'Sur les pages',
    button: 'Sur les boutons',
    topicsUnit: 'sujets',
    moreTopics: '{n} de plus',
    pick: 'Cliquez sur un sujet pour voir à quelle question il répond',
    questionLabel: 'La question à laquelle ce sujet répond',
    relPage:
      'Vous le retrouverez dans la partie de ce chapitre consacrée aux pages',
    relButton:
      'Vous le retrouverez dans la partie de ce chapitre consacrée aux boutons',
    relNone:
      'Ce sujet vous servira dans la conception de produits, au-delà de ce chapitre',
    relPageShort: 'Sur les pages',
    relButtonShort: 'Sur les boutons',
    relBoth: 'Utile pour les pages et les boutons',
    paraphraseNote:
      'Ces questions sont nos reformulations en termes simples des guidelines officielles.',
    takeaway:
      'La hiérarchie des pages et les boutons ne couvrent qu’une petite partie du sommaire. Une fois ces notions comprises, vous aurez des repères pour explorer les autres sujets par vous-même.',
    categories: [
      {
        id: 'getting-started',
        name: 'Prise en main et plateformes',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'Principes de design',
            rel: 'both',
            q: 'À quels critères reconnaît-on une interface agréable à utiliser et à regarder ?'
          },
          {
            name: 'Concevoir pour iOS',
            rel: '',
            q: 'À quoi faut-il particulièrement faire attention quand on conçoit pour un téléphone ?'
          },
          {
            name: 'Concevoir pour macOS',
            rel: '',
            q: 'Qu’est-ce qui change quand on conçoit pour un ordinateur plutôt que pour un téléphone ?'
          }
        ]
      },
      {
        id: 'foundations',
        name: 'Fondements',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'Mise en page',
            rel: 'page',
            q: 'Comment disposer les éléments d’une page pour qu’elle s’adapte à différentes tailles d’écran ?'
          },
          {
            name: 'Typographie',
            rel: 'page',
            q: 'Quelles tailles et graisses permettent de distinguer le contenu principal du contenu secondaire ?'
          },
          {
            name: 'Couleur',
            rel: 'both',
            q: 'Où utiliser chaque couleur et comment l’adapter au mode sombre ?'
          },
          {
            name: 'Accessibilité',
            rel: 'both',
            q: 'Comment utiliser votre produit quand on voit mal, qu’on entend mal ou qu’on utilise uniquement le clavier ?'
          },
          {
            name: 'Icônes',
            rel: 'button',
            q: 'Quel style et quelle taille choisir pour les icônes, et quand leur ajouter un libellé ?'
          },
          {
            name: 'Textes d’interface',
            rel: 'both',
            q: 'Comment écrire le texte des boutons et des messages pour qu’il soit compris d’un coup d’œil ?'
          },
          {
            name: 'Animations',
            rel: '',
            q: 'Quand faire bouger un élément et comment l’animer sans distraire ?'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Modèles d’interaction',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'Retour d’information',
            rel: 'button',
            q: 'Comment indiquer à l’utilisateur que son clic a été pris en compte ?'
          },
          {
            name: 'Chargement',
            rel: 'both',
            q: 'Qu’afficher pendant l’attente pour que la page ne paraisse pas bloquée ?'
          },
          {
            name: 'Annulation et rétablissement',
            rel: 'both',
            q: 'Comment revenir en arrière après une erreur et quelles actions peuvent se passer de confirmation ?'
          },
          {
            name: 'Modalité',
            rel: 'page',
            q: 'Quand peut-on interrompre l’utilisateur et comment lui permettre de reprendre son parcours ?'
          },
          {
            name: 'Recherche',
            rel: 'page',
            q: 'Comment aider l’utilisateur à trouver rapidement ce qu’il cherche ?'
          },
          {
            name: 'Paramètres',
            rel: 'page',
            q: 'Comment organiser une page de paramètres pour que l’utilisateur s’y retrouve ?'
          }
        ]
      },
      {
        id: 'components',
        name: 'Composants',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'Boutons',
            rel: 'button',
            q: 'Quelles actions doivent prendre la forme de boutons et quels états prévoir ?'
          },
          {
            name: 'Barres d’outils',
            rel: 'page',
            q: 'Comment regrouper les actions d’une barre d’outils et à laquelle donner la place la plus visible ?'
          },
          {
            name: 'Menus',
            rel: 'button',
            q: 'Comment ranger de nombreuses commandes et dans quels cas éviter les menus ?'
          },
          {
            name: 'Alertes',
            rel: 'both',
            q: 'Quelles informations sont assez importantes pour interrompre l’utilisateur ?'
          },
          {
            name: 'Listes et tableaux',
            rel: 'page',
            q: 'Comment présenter de nombreuses lignes pour qu’elles soient faciles à parcourir du regard ?'
          },
          {
            name: 'Interrupteurs',
            rel: 'button',
            q: 'Quel contrôle utiliser pour basculer entre deux états ?'
          },
          {
            name: 'Sélecteurs',
            rel: 'button',
            q: 'Quel contrôle utiliser pour choisir une valeur parmi plusieurs ?'
          }
        ]
      },
      {
        id: 'inputs',
        name: 'Modes de saisie',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'Gestes',
            rel: '',
            q: 'Quelles actions peut-on effectuer en balayant ou en touchant l’écran ?'
          },
          {
            name: 'Claviers',
            rel: 'both',
            q: 'Peut-on parcourir tout le processus au clavier seul ?'
          },
          {
            name: 'Dispositifs de pointage',
            rel: 'both',
            q: 'Comment un contrôle doit-il réagir quand le pointeur le survole ou qu’on appuie dessus ?'
          }
        ]
      },
      {
        id: 'technologies',
        name: 'Technologies et services',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: 'Notifications',
            rel: '',
            q: 'Quand envoyer une notification et comment la rédiger sans être intrusif ?'
          },
          {
            name: 'Widgets',
            rel: '',
            q: 'Quelle quantité de contenu afficher dans un widget sur l’écran d’accueil ?'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'Quelles actions peut-on effectuer par une simple demande vocale ?'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'À vous de jouer : quel bouton devrait être le bouton principal ?',
    subtitle:
      'Voici la page « Modifier le projet ». Pour mettre le problème en évidence, les 5 boutons ont exactement la même apparence. Cliquez sur celui qui devrait, selon vous, être le plus visible.',
    cardTitle: 'Modifier le projet',
    nameLabel: 'Nom du projet',
    nameValue: 'Conception du cours',
    descLabel: 'Description du projet',
    descValue: 'Suivi de la conception du cours pour ce semestre',
    buttons: [
      {
        id: 'save',
        label: 'Enregistrer les modifications'
      },
      {
        id: 'preview',
        label: 'Aperçu'
      },
      {
        id: 'export',
        label: 'Exporter'
      },
      {
        id: 'cancel',
        label: 'Annuler'
      },
      {
        id: 'remove',
        label: 'Supprimer le projet'
      }
    ],
    hintToggle: 'Vous hésitez ? Consultez les étapes pour décider',
    stepsTitle: 'Trois questions pour hiérarchiser les boutons',
    steps: [
      {
        q: 'Qu’est-ce que l’utilisateur veut avant tout accomplir sur cette page ?',
        a: 'Enregistrer ses modifications. C’est le seul bouton principal.'
      },
      {
        q: 'Quelles actions servent simplement à l’y aider ?',
        a: 'Aperçu, Exporter et Annuler. Utilisez des boutons à contour ou textuels pour les laisser en retrait.'
      },
      {
        q: 'Quelle action est irréversible ?',
        a: 'Supprimer le projet. Utilisez une couleur d’avertissement et éloignez ce bouton du bouton principal.'
      }
    ],
    feedback: {
      save: 'L’utilisateur ouvre « Modifier le projet » pour enregistrer ses modifications. Ce bouton doit donc être le seul bouton principal.',
      preview:
        'L’aperçu permet de vérifier le résultat avant d’enregistrer. Un bouton à contour suffit.',
      export:
        'L’export est une action secondaire peu fréquente. Un bouton textuel suffit.',
      cancel:
        'Annuler permet de quitter sans poursuivre. Le bouton doit rester facile à trouver, avec une visibilité moindre que celle de l’action principale.',
      remove:
        'Supprimer le projet est l’action la plus risquée. L’utilisateur est ici pour modifier son projet. Le rouge suffit à signaler le danger et l’enregistrement garde la place principale.'
    },
    wrongLabel: 'Pas tout à fait',
    rightLabel: 'Bien vu',
    solvedTitle: 'Après correction',
    solvedNote:
      'On voit d’un coup d’œil qu’enregistrer est l’action principale. L’aperçu permet de vérifier le résultat avant d’enregistrer et la suppression reste à part, de l’autre côté.',
    reset: 'Recommencer'
  },
  fluent: {
    title:
      'Plus il y a de boutons, plus il faut choisir lequel mettre en avant',
    subtitle:
      'Fluent 2 répartit les boutons en quatre niveaux : Primary, Secondary, Subtle et Transparent. La rangée d’actions ci-dessous vient d’une page de back-office ordinaire. Déplacez le curseur pour ajouter ou retirer des boutons, puis alternez entre les deux approches pour voir ce qui change.',
    count: 'Nombre de boutons',
    styleAll: 'Mettre tous les boutons en Primary',
    styleLevels: 'Utiliser les quatre niveaux de Fluent',
    allNote:
      'Tous les boutons utilisent le style plein de Primary. Quand ils sont aussi nombreux, on ne sait plus où regarder en premier.',
    levelsNote:
      'Seul « Nouveau projet » reste Primary. « Exporter » passe en Secondary. Les autres boutons restent très discrets jusqu’au survol.',
    legendTitle: 'Survolez les quatre niveaux pour les comparer',
    levels: [
      {
        name: 'Primary',
        desc: 'Plein. Un seul par zone.'
      },
      {
        name: 'Secondary',
        desc: 'À contour. Pour les actions secondaires fréquentes.'
      },
      {
        name: 'Subtle',
        desc: 'Transparent au repos. Un fond clair apparaît au survol.'
      },
      {
        name: 'Transparent',
        desc: 'Le contour apparaît uniquement au survol.'
      }
    ],
    actions: [
      {
        id: 'create',
        label: 'Nouveau projet'
      },
      {
        id: 'export',
        label: 'Exporter'
      },
      {
        id: 'import',
        label: 'Importer'
      },
      {
        id: 'filter',
        label: 'Filtrer'
      },
      {
        id: 'sort',
        label: 'Trier'
      },
      {
        id: 'refresh',
        label: 'Actualiser'
      },
      {
        id: 'share',
        label: 'Partager'
      },
      {
        id: 'archive',
        label: 'Archiver'
      }
    ]
  },
  tokens: {
    title: 'Changez une valeur et les deux pages évoluent ensemble',
    subtitle:
      'Atlassian définit la couleur, le rayon des coins et les dimensions sous forme de tokens. Toutes les pages utilisent le même jeu de tokens. Déplacez les curseurs à droite, puis cochez « Chaque page applique ses propres règles » pour comparer.',
    pageA: 'Liste des projets',
    pageB: 'Paramètres du compte',
    radius: 'Rayon des coins',
    height: 'Hauteur des boutons',
    accent: 'Couleur d’accent',
    pixel: '{n}px',
    colors: ['Bleu', 'Vert', 'Orange', 'Violet'],
    inconsistent: 'Chaque page applique ses propres règles (sans tokens)',
    inconsistentNote:
      'La page de droite utilise maintenant des valeurs choisies sur le moment pour la couleur, les coins et la hauteur. Chaque page fonctionne visuellement à elle seule, mais côte à côte, elles ne semblent plus appartenir au même produit.',
    consistentNote:
      'Les deux pages utilisent les mêmes tokens. Quand vous avez déplacé les curseurs, elles ont changé ensemble.',
    mock: {
      list: {
        title: 'Projets',
        create: 'Nouveau projet',
        open: 'Ouvrir',
        items: [
          {
            name: 'Conception du cours',
            meta: 'Document · mis à jour aujourd’hui'
          },
          {
            name: 'Notes de recherche',
            meta: 'Document · mis à jour il y a 3 jours'
          }
        ]
      },
      settings: {
        title: 'Paramètres du compte',
        email: 'Adresse e-mail',
        emailValue: 'you@example.com',
        notify: 'Recevoir les notifications',
        save: 'Enregistrer',
        cancel: 'Annuler'
      }
    }
  },
  layers3: {
    title: 'Distinguez les trois niveaux',
    subtitle:
      'Une page comporte généralement trois niveaux : l’information principale, l’information secondaire et les actions secondaires. Le contenu ci-dessous reste le même. Déplacez le curseur pour voir comment les trois niveaux se distinguent peu à peu.',
    slider: 'Écart entre les niveaux',
    flat: 'Les trois niveaux attirent autant l’attention. Rien ne ressort.',
    mid: 'Les niveaux commencent à se distinguer. On voit d’abord le titre, puis la description.',
    full: 'Les niveaux sont bien distincts. On sait d’un coup d’œil où regarder et quoi faire ensuite.',
    labels: [
      'Information principale',
      'Information secondaire',
      'Actions secondaires'
    ],
    mock: {
      title: 'Conception du cours',
      body: 'Suivi de la conception du cours pour ce semestre. Mise à jour hebdomadaire.',
      meta: '4 membres · 12 documents · mis à jour hier',
      primary: 'Ouvrir le projet',
      secondary: ['Archiver', 'Partager']
    }
  },
  taskflow: {
    title: 'Une même page, deux mises en page',
    subtitle:
      'Les deux pages ci-dessous utilisent les mêmes six modules. À gauche, ils sont placés au fil des idées. À droite, ils suivent la tâche de l’utilisateur. Survolez les étapes à droite pour voir comment la tâche se déroule.',
    stacked: 'Modules empilés',
    task: 'Page organisée autour de la tâche',
    taskLine:
      'Tâche de l’utilisateur : retrouver le projet sur lequel j’ai travaillé en dernier et continuer à le modifier',
    steps: [
      {
        name: 'Comprendre à quoi sert la page',
        detail:
          'Le titre indique en une ligne l’objectif de la page. C’est ce qu’on voit en premier.'
      },
      {
        name: 'Réduire le nombre de résultats',
        detail:
          'Les filtres suivent le titre. Je peux affiner la liste avant de la parcourir.'
      },
      {
        name: 'Trouver le bon projet',
        detail:
          'La liste de projets occupe la zone principale. Les projets les plus récemment modifiés sont en tête.'
      },
      {
        name: 'Passer à l’action',
        detail:
          'L’action principale de chaque ligne se trouve juste à côté du projet concerné.'
      }
    ],
    modules: {
      title: 'Projets',
      goal: 'Gérez tous vos projets',
      announce: 'Annonce',
      announceText: 'Maintenance de routine ce samedi, 02:00–04:00',
      recommend: 'Recommandation',
      recommendText: 'Essayez la nouvelle vue Gantt',
      settings: 'Paramètres',
      filter: 'Filtrer',
      list: 'Liste des projets',
      open: 'Ouvrir',
      items: [
        {
          name: 'Conception du cours',
          meta: 'Document · mis à jour aujourd’hui'
        },
        {
          name: 'Notes de recherche',
          meta: 'Document · mis à jour il y a 3 jours'
        }
      ]
    }
  },
  roleKinds: {
    title: 'À quoi ressemblent les cinq rôles courants ?',
    subtitle:
      'Voici les cinq rôles du tableau ci-dessus, sur une même ligne. Les boutons ont les mêmes dimensions et les mêmes coins arrondis. Seuls le remplissage et la couleur changent.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: 'L’action la plus importante de la zone',
        sample: 'Enregistrer'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: 'Actions de support',
        sample: 'Aperçu'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: 'Actions peu prioritaires',
        sample: 'En savoir plus'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: 'Actions à risque, comme la suppression ou la désactivation',
        sample: 'Supprimer le projet'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: 'Actions d’outil liées au contexte immédiat',
        sample: 'Fermer'
      }
    ]
  }
}
