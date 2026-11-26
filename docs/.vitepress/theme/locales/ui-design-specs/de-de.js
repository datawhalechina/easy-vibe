export default {
  common: {
    before: 'Vorher',
    after: 'Nachher',
    reset: 'Zurücksetzen'
  },
  compare: {
    title: 'Eine Seite, zwei Hierarchien',
    subtitle:
      'Beide Seiten verwenden genau dieselben Texte. Ich habe nur die Hierarchie geändert. Fahre unten mit der Maus über ein Problem und vergleiche die beiden Seiten. Ziehe dann den Regler für den Unschärfetest.',
    squint: 'Unschärfetest',
    squintHint:
      'Das wirkt, als würdest du beim Betrachten der Seite die Augen zusammenkneifen. Was du trotz der Unschärfe noch erkennst, zieht deine Aufmerksamkeit auf sich.',
    squintClear: 'Scharf',
    squintBlurry: 'Unscharf',
    issueLabel: 'Vier Probleme auf der linken Seite',
    applyHint:
      'Probiere die Schalter über der rechten Seite aus. Mit jedem ausgeschalteten Schalter kehrt ein Problem zurück.',
    tableHead: ['Problem', 'So behebst du es', 'Das ändert sich'],
    metrics: {
      borders: 'Dekorative Rahmen',
      solid: 'Ausgefüllte Buttons',
      legend:
        'Vergleiche die Zahlen über den beiden Seiten. Rechts gibt es viel weniger Rahmen und ausgefüllte Buttons. Dadurch fallen der Titel und der Haupt-Button auf.'
    },
    moreMenu: ['Umbenennen', 'Löschen'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'Schriftgrößen abstufen',
        problem:
          'Titel, Filter und Buttons stehen dicht gedrängt und verwenden dieselbe Schriftgröße.',
        fix: 'Ordne die Ebenen in getrennten Zeilen an, zuerst den Titel, dann die Filter. Der Titel ist am größten, gefolgt von der Beschreibung und kleinen Angaben wie dem Datum.',
        result:
          'Du erkennst auf einen Blick, auf welcher Seite du bist und wo du zuerst hinschauen solltest.'
      },
      {
        id: 'borders',
        n: '②',
        short: 'Weniger Rahmen',
        problem:
          'Jedes Modul hat einen dicken Rahmen, in dem noch ein weiterer Rahmen steckt.',
        fix: 'Gruppiere zuerst mit Ausrichtung und Abständen. Setze einen Rahmen, wo du eine klare Abgrenzung brauchst.',
        result: 'Mit weniger Linien erkennst du leichter, was zusammengehört.'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'Button-Hierarchie',
        problem:
          'Alle 8 Buttons sind ausgefüllt. Dadurch sieht jeder wie die Hauptaktion aus.',
        fix: 'Verwende pro Bereich einen Haupt-Button. Stelle die übrigen als umrandete Buttons oder Text-Buttons dar.',
        result:
          'Du siehst auf einen Blick, wo du als Nächstes klicken solltest.'
      },
      {
        id: 'scope',
        n: '④',
        short: 'Aktionen richtig platzieren',
        problem:
          '„Löschen“ betrifft ein einzelnes Projekt, steht aber neben einer Aktion für die ganze Seite wie „Neu“.',
        fix: 'Platziere seitenweite Aktionen auf Seitenebene. Aktionen für einen einzelnen Eintrag stehen direkt daneben.',
        result: 'Bei jedem Button ist klar, worauf er sich auswirkt.'
      }
    ],
    mock: {
      pageTitle: 'Projekte',
      count: '2 Projekte',
      filters: ['Alle', 'Aktiv'],
      sort: 'Zuletzt aktualisiert',
      create: 'Neues Projekt',
      export: 'Export',
      remove: 'Löschen',
      open: 'Öffnen',
      more: 'Weitere Aktionen',
      items: [
        {
          name: 'Kursplanung',
          meta: 'Dokumente · heute aktualisiert'
        },
        {
          name: 'Recherchenotizen',
          meta: 'Dokumente · vor 3 Tagen aktualisiert'
        }
      ]
    }
  },
  anatomy: {
    title: 'Seitenaufbau mit vier Ebenen und vier Aufgaben',
    subtitle:
      'Fahre unten mit der Maus über eine Ebene. Die Seite zeigt dir, wo sie liegt. Klicke darauf, um die Markierung festzuhalten.',
    taskLabel: 'Aufgabe dieser Ebene',
    meansLabel: 'Woran du sie erkennst',
    showLabels: 'Beschriftungen anzeigen',
    showGuides: 'Hilfslinien anzeigen',
    guidesNote:
      'Die Hilfslinien zeigen, dass alles an derselben senkrechten Linie beginnt. Zusammengehörige Inhalte stehen dicht beieinander, zwischen verschiedenen Ebenen bleibt mehr Platz.',
    gap: 'Abstand',
    typeTitle:
      'Schriftgröße, Schriftstärke und Helligkeit heben diese drei Zeilen voneinander ab.',
    typeSample: 'Beispiel',
    layers: [
      {
        id: 'locate',
        name: 'Orientierung',
        task: 'Zeigt Nutzern, wo sie sind und wie sie zurückkommen.',
        means:
          'Ein zurückhaltender Navigationstitel und eine vertraute Möglichkeit, zurückzugehen.'
      },
      {
        id: 'primary',
        name: 'Hauptinformation',
        task: 'Zeigt Nutzern, was auf dieser Seite am wichtigsten ist.',
        means:
          'Die größte Schrift der Seite an einer festen Stelle, mit Freiraum im Anschluss.'
      },
      {
        id: 'support',
        name: 'Unterstützende Informationen',
        task: 'Liefert Kontext und Metadaten.',
        means:
          'Kleiner und heller, aber weiterhin lesbar, direkt neben dem Inhalt, den sie erklären.'
      },
      {
        id: 'action',
        name: 'Aktionen',
        task: 'Zeigt Nutzern, was sie als Nächstes tun können.',
        means:
          'Nach dem Inhalt folgt ein ausgefüllter Haupt-Button. Die übrigen Buttons treten in den Hintergrund.'
      }
    ],
    typeScale: [
      {
        name: 'Inhaltstitel',
        px: 22,
        weight: 700,
        note: 'Erscheint nur einmal auf der Seite.'
      },
      {
        name: 'Fließtext',
        px: 14,
        weight: 400,
        note: 'Zum Lesen gedacht, mit etwas größerem Zeilenabstand.'
      },
      {
        name: 'Unterstützender Text',
        px: 12,
        weight: 400,
        note: 'Kleiner und heller. Diese Schriftgröße ist die Untergrenze.'
      }
    ],
    mock: {
      back: 'Zurück',
      navTitle: 'Projekte',
      title: 'Kursplanung',
      meta: '4 Mitglieder · 12 Dokumente · gestern aktualisiert',
      body: 'Hier halten wir den Stand der Kursplanung für dieses Semester fest. Wöchentliche Aktualisierung.',
      link: 'Alle Dokumente ansehen',
      primary: 'Projekt öffnen',
      secondary: 'Archivieren'
    }
  },
  grouping: {
    title: 'Braucht es einen Rahmen? Schau dir die drei Schritte an',
    subtitle:
      'Unten siehst du immer dasselbe Einstellungsformular. Klicke die drei Schritte der Reihe nach an und achte darauf, ab wann du die Gruppen erkennst.',
    stepLabel: 'Schritt {n}',
    metricBorders: 'Dekorative Rahmen',
    metricGaps: 'Unterschiedliche Abstandsgrößen',
    showGaps: 'Abstände anzeigen',
    explicitToggle: '„Benachrichtigungen“ mit hellem Hintergrund versehen',
    implicitTitle: 'Implizite Gruppierung',
    implicitText:
      'Abstände, Ausrichtung und Freiraum machen eine Gruppe auch ohne Rahmen sichtbar.',
    explicitTitle: 'Explizite Gruppierung',
    explicitText:
      'Eine Hintergrundfarbe oder Kontur grenzt eine Gruppe deutlicher ab. Frag dich vorher, ob die Gruppe diese Abgrenzung wirklich braucht.',
    gapInside: 'Innerhalb einer Gruppe',
    gapBetween: 'Zwischen Gruppen',
    steps: [
      {
        caption:
          'Im ersten Schritt hat alles einen Rahmen. Jedes Element ruft „Ich bin wichtig“, sodass du kaum noch erkennst, was zusammengehört.'
      },
      {
        caption:
          'Im zweiten Schritt fallen nur die Rahmen weg. Die Seite wirkt ruhiger, aber die Abstände sind noch überall gleich. Dadurch verliert sich der Zusammenhang.'
      },
      {
        caption:
          'Im dritten Schritt übernehmen die Abstände die Gruppierung. Verwandte Inhalte stehen näher beieinander, andere weiter auseinander. Du erkennst die Gruppen auch ohne eine einzige Linie.'
      }
    ],
    mock: {
      pageTitle: 'Kontoeinstellungen',
      basic: 'Grunddaten',
      email: 'E-Mail',
      phone: 'Mobilnummer',
      password: 'Passwort ändern',
      newPassword: 'Neues Passwort',
      confirm: 'Passwort bestätigen',
      notify: 'Benachrichtigungen',
      mail: 'E-Mail-Benachrichtigungen',
      desktop: 'Desktop-Benachrichtigungen',
      save: 'Speichern',
      cancel: 'Abbrechen'
    }
  },
  buttonSpec: {
    title: 'Die vollständige Definition eines Buttons',
    subtitle:
      'Aus „Füge einen Button hinzu“ werden in einem Designsystem 10 Fragen. Öffne sie links nacheinander und schau dir an, wie genau du sie beantworten solltest.',
    questionLabel: 'Frage aus der Richtlinie',
    sampleLabel: 'Beispiel für die Definition',
    sourceLabel: 'Originalquelle lesen',
    rolesRule:
      'Die Rolle beschreibt die Folgen eines Klicks. Wie wichtig die Aktion gerade ist, legst du getrennt fest. Deshalb sollte „Löschen“ trotz des Risikos nicht der auffälligste Button auf der Seite sein.',
    structureRule:
      'Beginne die Beschriftung möglichst mit einem Verb. Bei „Entwurf speichern“ ist die Folge des Klicks sofort klar, während „OK“ sie offenlässt.',
    visualRule:
      'Der Stil bestimmt, wie auffällig ein Button ist. Die Rolle beschreibt, was beim Klick passiert. Lege beides getrennt fest.',
    sizeRule:
      'Ein Button darf klein aussehen, solange der Bereich, den du mit dem Finger treffen musst, groß genug ist. Lege beide Maße getrennt fest.',
    sizeVisible: 'Sichtbare Höhe',
    sizeTarget: 'Klick- und Tippbereich',
    statesRule:
      'Definiere alle Zustände im Voraus und unterscheide sie durch mehr als nur Farbe.',
    behaviorRule:
      'Gib den Nutzern direkt nach dem Klick eine Rückmeldung. Zeige beim Warten einen Hinweis und erkläre bei einem Fehler, wie es weitergeht.',
    adaptiveRule:
      'Probiere den Regler oben aus. Mit größerer Schrift wächst der Button in die Höhe. Die Beschriftung bricht um und bleibt vollständig sichtbar.',
    a11yRule:
      'Der Button muss sich allein mit der Tastatur und ohne Blick auf den Bildschirm bedienen lassen.',
    boundaryRule:
      'Eine Richtlinie erklärt auch, wann sich eine Komponente nicht eignet. Das ist genauso wichtig wie ihr Funktionsumfang.',
    a11yNoName: 'Der Screenreader liest „Button“ vor.',
    a11yWithName: 'Der Screenreader liest „Löschen, Button“ vor.',
    fontSize: 'Schriftgröße',
    dimsLabel: 'Aspekte der Definition',
    purposeExamples: ['Speichern', 'Senden', 'Löschen'],
    purposeLine:
      'Die drei Buttons sehen unterschiedlich aus. Gemeinsam haben sie, dass jeder Klick sofort eine Aktion auslöst.',
    roleSamples: {
      Normal: 'Vorschau',
      Primary: 'Veröffentlichen',
      Cancel: 'Abbrechen',
      Destructive: 'Projekt löschen'
    },
    anatomyBtn: 'Projekt veröffentlichen',
    genericBtn: 'Weiter',
    deleteLabel: 'Löschen',
    roles: [
      {
        name: 'Normal',
        desc: 'Eine gewöhnliche Aktion ohne besondere Hervorhebung.'
      },
      {
        name: 'Primary',
        desc: 'Die aktuell wichtigste Aktion. Pro Ansicht gibt es ein oder zwei solcher Buttons.'
      },
      {
        name: 'Cancel',
        desc: 'Lässt Nutzer abbrechen und überlässt dem Haupt-Button die Aufmerksamkeit.'
      },
      {
        name: 'Destructive',
        desc: 'Die Aktion lässt sich nicht rückgängig machen. Nutze eine Warnfarbe und vermeide sie als Standardaktion.'
      }
    ],
    parts: [
      {
        name: 'Container',
        desc: 'Der Grundkörper des Buttons bestimmt Farbe, Größe und die Darstellung beim Drücken.'
      },
      {
        name: 'Symbol',
        desc: 'Optional. Es macht den Zweck des Buttons auf einen Blick erkennbar.'
      },
      {
        name: 'Beschriftung',
        desc: 'Sagt klar, was beim Klick passiert.'
      }
    ],
    levels: [
      {
        name: 'Filled',
        desc: 'Die stärkste Hervorhebung für die aktuell wichtigste Aktion.'
      },
      {
        name: 'Tonal',
        desc: 'Etwas auffälliger als ein umrandeter Button, für Nebenaktionen, die sichtbar bleiben sollen.'
      },
      {
        name: 'Outlined',
        desc: 'Die Alternative neben einem ausgefüllten Button.'
      },
      {
        name: 'Text',
        desc: 'Die schwächste Hervorhebung für ergänzende Aktionen.'
      }
    ],
    stateGallery: [
      'Standard',
      'Hover',
      'Gedrückt',
      'Fokussiert',
      'Deaktiviert'
    ],
    behaviorStages: [
      'Bereit',
      'Gedrückt',
      'In Bearbeitung',
      'Abgeschlossen / fehlgeschlagen'
    ],
    a11yChecks: [
      'Hat einen zugänglichen Namen, auch wenn der Button nur ein Symbol zeigt.',
      'Per Tastatur fokussierbar, mit sichtbarem Fokus.',
      'Text und Hintergrund haben genügend Kontrast.',
      'Der Zustand ist auch ohne die Farbe erkennbar.'
    ],
    boundaries: [
      {
        want: 'Zu einer anderen Seite wechseln',
        use: 'Link, Tab'
      },
      {
        want: 'Zwischen zwei Zuständen wechseln',
        use: 'Schalter, Umschalt-Button'
      },
      {
        want: 'Einen von mehreren Werten auswählen',
        use: 'Pop-up-Button, Auswahlfeld'
      },
      {
        want: 'Selten genutzte Befehle sammeln',
        use: 'Menü'
      }
    ],
    boundaryWant: 'Was du tun möchtest',
    boundaryUse: 'Passendere Komponente',
    dims: [
      {
        id: 'purpose',
        name: 'Zweck',
        question: 'Welches Problem löst dieses Element?',
        sample:
          '„Veröffentlichen“ übermittelt das aktuelle Projekt. Bei Erfolg wechselt sein Status zu „Veröffentlicht“.',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'Rolle',
        question:
          'Steht der Button für eine Aktion, eine Auswahl oder Navigation?',
        sample:
          '„Projekt löschen“ hat die Rolle Destructive und den Stil Outlined. Der Button ist nicht als Standard festgelegt.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: 'Aufbau',
        question: 'Aus welchen Teilen besteht der Button?',
        sample:
          'Container, optionales Symbol und Beschriftung. Die Beschriftung ist eine einzeilige Formulierung mit Verb.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: 'Visuelle Gestaltung',
        question: 'Woran erkennst du die Priorität?',
        sample:
          'Auf dieser Seite verwendet nur „Veröffentlichen“ den Stil Filled. Die übrigen Aktionen verwenden Outlined oder Text.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'Maße',
        question: 'Welche Maße und Abstände gelten?',
        sample:
          'Sichtbare Höhe 40, Klick- und Tippbereich mindestens 44×44. Buttons derselben Gruppe sind gleich hoch und haben einen Abstand von 8.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: 'Zustände',
        question: 'Was zeigt der Button im jeweiligen Zustand?',
        sample:
          'Definiere sechs Zustände: Standard, Hover, gedrückt, fokussiert, deaktiviert und lädt.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: 'Verhalten',
        question: 'Was passiert nach dem Auslösen?',
        sample:
          'Zeige direkt nach dem Klick den Ladezustand an und verhindere mehrfaches Absenden. Melde am Ende das Ergebnis.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: 'Anpassung',
        question: 'Wie bleibt der Button bei anderen Bedingungen bedienbar?',
        sample:
          'Bei größerer Schrift darf die Beschriftung auf zwei Zeilen umbrechen. Der Button wird entsprechend höher.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'Barrierefreiheit',
        question:
          'Lässt sich der Button auch bedienen, wenn ein Sinn nicht zur Verfügung steht?',
        sample:
          'Der Symbol-Button hat den zugänglichen Namen „Löschen“. Die Fokusreihenfolge entspricht der visuellen Reihenfolge.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: 'Einsatzgrenzen',
        question: 'Wann eignet sich der Button nicht?',
        sample:
          'Verwende einen Link, um zu einer anderen Seite zu wechseln, und einen Schalter, um zwischen zwei Werten zu wechseln.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'Button-Zustände und Verhalten',
    subtitle:
      'Der Zustand zeigt, wie der Button gerade aussieht. Das Verhalten beschreibt, was nach dem Klick passiert.',
    statesTitle: 'Die sechs Zustände',
    stateHead: [
      'Zustand',
      'Wann er auftritt',
      'Was sich am Aussehen ändert',
      'Worauf du achten solltest'
    ],
    liveHint:
      'Fahre mit der Maus über den Button, halte ihn gedrückt oder fokussiere ihn mit der Tab-Taste. Beobachte, wie er sich jeweils verändert.',
    currentState: 'Aktueller Zustand',
    sample: 'Button',
    stateNames: {
      default: 'Standard',
      hover: 'Hover',
      pressed: 'Gedrückt',
      focus: 'Fokus'
    },
    states: [
      {
        id: 'default',
        name: 'Standard',
        trigger: 'Keine Interaktion',
        change: 'Gewöhnliches Aussehen',
        tip: 'Die meisten Buttons auf einer Seite sind in diesem Zustand.'
      },
      {
        id: 'hover',
        name: 'Hover',
        trigger: 'Der Zeiger bewegt sich auf den Button.',
        change: 'Der Hintergrund wird etwas dunkler.',
        tip: 'Signalisiert, dass der Button anklickbar ist.'
      },
      {
        id: 'pressed',
        name: 'Gedrückt',
        trigger: 'Der Button wird gedrückt gehalten.',
        change: 'Der Hintergrund wird noch dunkler.',
        tip: 'Wenn du einen eigenen Button gestaltest, musst du diesen Zustand selbst ergänzen.'
      },
      {
        id: 'focus',
        name: 'Fokus',
        trigger: 'Der Button erhält den Fokus über die Tab-Taste.',
        change: 'Um den Button erscheint ein Fokusring.',
        tip: 'Entferne den Fokusring nicht mit outline: none.'
      },
      {
        id: 'disabled',
        name: 'Deaktiviert',
        trigger: 'Eine Voraussetzung ist nicht erfüllt.',
        change: 'Der Button wird transparenter und reagiert nicht auf Klicks.',
        tip: 'Erkläre möglichst auch, warum sich der Button nicht anklicken lässt.'
      },
      {
        id: 'loading',
        name: 'Lädt',
        trigger: 'Die Aktion läuft noch.',
        change:
          'Die Beschriftung meldet, dass die Aktion läuft, und eine Ladeanzeige erscheint.',
        tip: 'Signalisiert „Ich bearbeite deine Aktion“. Ein deaktivierter Button signalisiert dagegen „Hier kannst du nicht klicken“.'
      }
    ],
    behaviorTitle: 'Was nach dem Klick passiert',
    behaviorHint:
      'Klicke einmal auf „Projekt veröffentlichen“ und beobachte den Ablauf vom Klick bis zum Ergebnis.',
    scenario: 'Simuliertes Ergebnis',
    scenarioSuccess: 'Erfolg',
    scenarioFail: 'Fehler',
    run: 'Projekt veröffentlichen',
    running: 'Wird veröffentlicht …',
    done: 'Veröffentlicht',
    failed: 'Veröffentlichung fehlgeschlagen. Deine Inhalte bleiben erhalten.',
    retry: 'Erneut versuchen',
    stageHead: ['Phase', 'Was Nutzer wissen müssen'],
    stages: [
      {
        name: 'Bereit',
        desc: 'Vor dem Klick sagt mir der Button, was passieren wird.'
      },
      {
        name: 'Sofortige Rückmeldung',
        desc: 'Beim Klick ändert sich das Aussehen. So weiß ich, dass der Klick angekommen ist.'
      },
      {
        name: 'In Bearbeitung',
        desc: 'Während ich warte, sehe ich eine Fortschrittsanzeige. Weitere Klicks werden blockiert.'
      },
      {
        name: 'Ergebnis',
        desc: 'Bei Erfolg erscheint eine klare Bestätigung. Bei einem Fehler erfahre ich, wie es weitergeht.'
      },
      {
        name: 'Wiederholen',
        desc: 'Nach einem Fehler sind meine Eingaben noch da. Ich kann es direkt erneut versuchen.'
      }
    ],
    rulesTitle: 'Vier Regeln',
    rules: [
      'Reagiere sofort auf den Klick, selbst wenn der Button dabei nur ein wenig dunkler wird.',
      'Zeige während der Wartezeit einen Hinweis, damit niemand denkt, die Seite sei eingefroren.',
      'Unterscheide Laden und Deaktivieren. Beim Laden läuft die Aktion bereits. Ein deaktivierter Button lässt sich nicht auslösen.',
      'Passe die Beschriftung an. Vor dem Klick steht dort „Projekt veröffentlichen“, danach „Wird veröffentlicht …“.'
    ]
  },
  lookalike: {
    title: 'Gleiches Aussehen, unterschiedliche Aufgaben',
    subtitle:
      'Die beiden Steuerelemente unten sehen fast gleich aus. Öffne beide und wähle jeweils einen Eintrag. Achte darauf, was passiert.',
    popupTag: 'Wählt einen Wert aus',
    pullTag: 'Führt einen Befehl aus',
    popupInitial: 'Sortierung: Neueste zuerst',
    popupPrefix: 'Sortierung: ',
    popupOptions: ['Neueste zuerst', 'Älteste zuerst', 'Name'],
    pullInitial: 'Aktionen',
    pullOptions: ['Umbenennen', 'Link kopieren', 'Löschen'],
    pullDone: 'Ausgeführt: {name}',
    popupValue: 'Aktueller Wert: {value}',
    pullIdle: 'Noch kein Befehl ausgeführt',
    tableHead: ['', 'Pop-up-Button', 'Pull-down-Button'],
    rows: [
      [
        'Beim Öffnen',
        'Mehrere Optionen. Ein Häkchen markiert die aktuelle Auswahl.',
        'Mehrere Befehle, die du ausführen kannst.'
      ],
      [
        'Nach der Auswahl',
        'Merkt sich deine Auswahl und passt die Beschriftung des Buttons an.',
        'Führt den Befehl aus und schließt sich. Die Beschriftung bleibt gleich.'
      ],
      [
        'Geeignet für',
        'Sortierung ändern, Ansicht wechseln oder eine Option wählen',
        'Aktionen wie Umbenennen, Exportieren oder Löschen'
      ],
      ['Ungeeignet für', 'Befehle sammeln', 'Filtern oder Navigieren']
    ],
    conclusion:
      'Hast du den Unterschied bemerkt? Links hat dein Klick einen Wert geändert. Rechts hat er eine Aktion ausgeführt. Wenn du das nächste Mal unsicher bist, frag dich, was die Nutzer beim Klicken erreichen wollen. Möchten sie einen Wert auswählen oder eine Aktion auslösen?'
  },
  skeleton: {
    title: 'Eine Seite im Detail: Navigation, Inhalt und Aktionen',
    subtitle:
      'Unten siehst du eine gewöhnliche Projektliste. Fahre links mit der Maus über einen Eintrag oder klicke darauf, um die Markierung festzuhalten. Die durchgezogene Linie zeigt seine Position, die gestrichelte Linie seinen Wirkungsbereich.',
    legendCtl: 'Durchgezogene Linie: Position',
    legendAffect: 'Gestrichelte Linie: Wirkungsbereich',
    leading: 'Zurück und der Titel stehen links.',
    trailing: 'Die Aktionen stehen rechts. Nur eine davon ist hervorgehoben.',
    taskLabel: 'Welche Frage der Bereich beantwortet',
    affectLabel: 'Worauf er sich auswirkt',
    misplacedToggle: 'Verschiebe „Löschen“ probeweise in die Werkzeugleiste',
    misplacedHint:
      'Jetzt steht „Löschen“ in der Werkzeugleiste direkt neben „Neues Projekt“. Welches Projekt würde ein Klick löschen? Das ist nicht mehr erkennbar. Platziere die Aktion deshalb neben dem Inhalt, auf den sie sich auswirkt.',
    items: [
      {
        id: 'global',
        name: 'Globale Navigation',
        question: 'In welchen Bereich des Produkts möchte ich wechseln?',
        affect: 'Die gesamte Seite wechselt zu einem anderen Bereich.'
      },
      {
        id: 'locate',
        name: 'Seitentitel',
        question: 'Auf welcher Seite bin ich, und wie komme ich zurück?',
        affect: 'Die aktuelle Seite.'
      },
      {
        id: 'content',
        name: 'Hauptinhalt',
        question: 'Was sehe ich hier?',
        affect: 'Der Inhalt, auf den die anderen Steuerelemente wirken.'
      },
      {
        id: 'listctl',
        name: 'Filtern und sortieren',
        question: 'Wie möchte ich die Liste sehen?',
        affect:
          'Welche Projekte in der Liste erscheinen und in welcher Reihenfolge.'
      },
      {
        id: 'pageact',
        name: 'Aktionen für die ganze Seite',
        question: 'Was möchte ich auf die gesamte Seite anwenden?',
        affect: 'Alle Projekte in der Liste.'
      },
      {
        id: 'itemact',
        name: 'Aktionen für einen Eintrag',
        question: 'Was möchte ich mit einem bestimmten Eintrag tun?',
        affect: 'Nur dieses eine Projekt.'
      }
    ],
    mock: {
      nav: ['Projekte', 'Mitglieder', 'Einstellungen'],
      title: 'Projekte',
      section: 'Aktuelle Projekte',
      filters: ['Alle', 'Aktiv'],
      sort: 'Zuletzt aktualisiert',
      export: 'Export',
      create: 'Neues Projekt',
      remove: 'Löschen',
      open: 'Öffnen',
      more: 'Weitere Aktionen',
      items: [
        {
          name: 'Kursplanung',
          meta: 'Dokumente · heute aktualisiert'
        },
        {
          name: 'Recherchenotizen',
          meta: 'Dokumente · vor 3 Tagen aktualisiert'
        }
      ]
    }
  },
  specMap: {
    title: 'Was steht eigentlich in einer Designrichtlinie?',
    subtitle:
      'Viele denken bei Designrichtlinien zuerst an Farben und Abrundungen. Zählen wir im Inhaltsverzeichnis von Apple nach. Es gibt 6 Hauptkategorien mit 158 Themen. Klicke unten auf ein Thema oder filtere oben nach Themen zu Seiten und Buttons.',
    checkedAt:
      'Kategorien und Anzahlen im November 2026 mit dem Inhaltsverzeichnis der Apple HIG abgeglichen',
    all: 'Alle Themen',
    page: 'Zu Seiten',
    button: 'Zu Buttons',
    topicsUnit: 'Themen',
    moreTopics: '{n} weitere',
    pick: 'Klicke auf ein Thema, um zu sehen, welche Frage es beantwortet.',
    questionLabel: 'Welche Frage das Thema beantwortet',
    relPage: 'Relevant für den Teil über Seiten in diesem Kapitel',
    relButton: 'Relevant für den Teil über Buttons in diesem Kapitel',
    relNone:
      'Für dieses Kapitel nicht nötig, aber bei der Produktentwicklung relevant',
    relPageShort: 'Zu Seiten',
    relButtonShort: 'Zu Buttons',
    relBoth: 'Für Seiten und Buttons relevant',
    paraphraseNote:
      'Wir haben die Fragen in eigenen Worten formuliert. Die offiziellen Formulierungen stehen in den Richtlinien.',
    takeaway:
      'Seitenhierarchie und Buttons machen nur einen kleinen Teil aus. Wenn du diesen Teil verstanden hast, kannst du das Gelernte nutzen, um dir auch die übrigen Themen selbst zu erschließen.',
    categories: [
      {
        id: 'getting-started',
        name: 'Einstieg und Plattformen',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'Designprinzipien',
            rel: 'both',
            q: 'Woran erkennst du eine Oberfläche, die sich gut bedienen lässt und gut aussieht?'
          },
          {
            name: 'Design für iOS',
            rel: '',
            q: 'Worauf solltest du beim Design für Smartphones achten?'
          },
          {
            name: 'Design für macOS',
            rel: '',
            q: 'Was ist beim Design für Computer anders als bei Smartphones?'
          }
        ]
      },
      {
        id: 'foundations',
        name: 'Grundlagen',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'Layout',
            rel: 'page',
            q: 'Wie ordnest du Inhalte so an, dass sie auf unterschiedlich großen Bildschirmen funktionieren?'
          },
          {
            name: 'Typografie',
            rel: 'page',
            q: 'Bei welchen Schriftgrößen und Schriftstärken lassen sich Haupt- und Nebeninformationen gut unterscheiden?'
          },
          {
            name: 'Farbe',
            rel: 'both',
            q: 'Wo setzt du welche Farben ein und was ändert sich im Dunkelmodus?'
          },
          {
            name: 'Barrierefreiheit',
            rel: 'both',
            q: 'Wie können Menschen, die nicht sehen, schlecht hören oder nur die Tastatur verwenden, dein Produkt bedienen?'
          },
          {
            name: 'Symbole',
            rel: 'button',
            q: 'Wie sollten Symbole aussehen, wie groß sollten sie sein und wann brauchen sie eine Beschriftung?'
          },
          {
            name: 'Oberflächentexte',
            rel: 'both',
            q: 'Wie formulierst du Button-Beschriftungen und Meldungen, damit sie sofort verständlich sind?'
          },
          {
            name: 'Animationen',
            rel: '',
            q: 'Wann sind Animationen sinnvoll und wie gestaltest du sie, damit sie nicht ablenken?'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Interaktionsmuster',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'Rückmeldung',
            rel: 'button',
            q: 'Wie zeigst du Nutzern, dass ihr Klick angekommen ist?'
          },
          {
            name: 'Laden',
            rel: 'both',
            q: 'Was zeigst du beim Warten, damit die Seite nicht eingefroren wirkt?'
          },
          {
            name: 'Rückgängig machen und wiederholen',
            rel: 'both',
            q: 'Wie lässt sich ein Fehler rückgängig machen und welche Aktionen brauchen keine vorherige Bestätigung?'
          },
          {
            name: 'Modalität',
            rel: 'page',
            q: 'Wann darfst du Nutzer unterbrechen und wie kommen sie zum vorherigen Ablauf zurück?'
          },
          {
            name: 'Suche',
            rel: 'page',
            q: 'Wie hilfst du Nutzern, schnell zu finden, was sie suchen?'
          },
          {
            name: 'Einstellungen',
            rel: 'page',
            q: 'Wie gliederst du eine Einstellungsseite, damit sich Nutzer darauf zurechtfinden?'
          }
        ]
      },
      {
        id: 'components',
        name: 'Komponenten',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'Buttons',
            rel: 'button',
            q: 'Für welche Aktionen sind Buttons sinnvoll und welche Zustände haben sie?'
          },
          {
            name: 'Werkzeugleisten',
            rel: 'page',
            q: 'Wie gruppierst du eine Reihe von Aktionen und welche bekommt den auffälligsten Platz?'
          },
          {
            name: 'Menüs',
            rel: 'button',
            q: 'Wie bringst du viele Befehle unter und wann eignet sich ein Menü dafür nicht?'
          },
          {
            name: 'Warnmeldungen',
            rel: 'both',
            q: 'Welche Informationen sind so wichtig, dass du Nutzer dafür unterbrechen solltest?'
          },
          {
            name: 'Listen und Tabellen',
            rel: 'page',
            q: 'Wie ordnest du viele Einträge an, damit man sie schnell überfliegen kann?'
          },
          {
            name: 'Schalter',
            rel: 'button',
            q: 'Welches Steuerelement eignet sich für den Wechsel zwischen zwei Zuständen?'
          },
          {
            name: 'Auswahlfelder',
            rel: 'button',
            q: 'Welches Steuerelement eignet sich, um einen von mehreren Werten auszuwählen?'
          }
        ]
      },
      {
        id: 'inputs',
        name: 'Eingabemethoden',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'Gesten',
            rel: '',
            q: 'Welche Aktionen lassen sich per Wischen oder Tippen ausführen?'
          },
          {
            name: 'Tastaturen',
            rel: 'both',
            q: 'Lässt sich der gesamte Ablauf allein mit der Tastatur durchlaufen?'
          },
          {
            name: 'Zeigegeräte',
            rel: 'both',
            q: 'Wie reagiert ein Steuerelement, wenn du den Zeiger darauf bewegst oder es drückst?'
          }
        ]
      },
      {
        id: 'technologies',
        name: 'Technologien und Dienste',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: 'Benachrichtigungen',
            rel: '',
            q: 'Wann solltest du Benachrichtigungen senden und wie formulierst du sie, damit sie nicht stören?'
          },
          {
            name: 'Widgets',
            rel: '',
            q: 'Wie viele Inhalte sollte ein Widget auf dem Startbildschirm anzeigen?'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'Welche Aktionen kannst du per Sprachbefehl ausführen?'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'Du bist dran: Welcher Button sollte der Haupt-Button sein?',
    subtitle:
      'Unten siehst du die Seite „Projekt bearbeiten“. Damit das Problem auffällt, sehen alle 5 Buttons gleich aus. Klicke auf den Button, der deiner Meinung nach am stärksten hervorgehoben werden sollte.',
    cardTitle: 'Projekt bearbeiten',
    nameLabel: 'Projektname',
    nameValue: 'Kursplanung',
    descLabel: 'Projektbeschreibung',
    descValue: 'Stand der Kursplanung für dieses Semester festhalten',
    buttons: [
      {
        id: 'save',
        label: 'Änderungen speichern'
      },
      {
        id: 'preview',
        label: 'Vorschau'
      },
      {
        id: 'export',
        label: 'Export'
      },
      {
        id: 'cancel',
        label: 'Abbrechen'
      },
      {
        id: 'remove',
        label: 'Projekt löschen'
      }
    ],
    hintToggle: 'Unsicher? Schau dir die Schritte zur Entscheidung an.',
    stepsTitle: 'Drei Fragen zur Priorität von Buttons',
    steps: [
      {
        q: 'Was möchte der Nutzer hier vor allem erledigen?',
        a: 'Er möchte seine Änderungen speichern. Dafür gibt es genau einen Haupt-Button.'
      },
      {
        q: 'Welche Aktionen helfen nur dabei?',
        a: 'Vorschau, Export und Abbrechen. Gib ihnen einen umrandeten Button oder einen Text-Button, damit die Hauptaktion im Vordergrund bleibt.'
      },
      {
        q: 'Welche Aktion lässt sich nicht rückgängig machen?',
        a: 'Projekt löschen. Nutze eine Warnfarbe und platziere den Button mit Abstand zum Haupt-Button.'
      }
    ],
    feedback: {
      save: 'Der Nutzer hat „Projekt bearbeiten“ geöffnet, um seine Änderungen zu speichern. Deshalb ist „Änderungen speichern“ der einzige Haupt-Button.',
      preview:
        'In der Vorschau kann der Nutzer vor dem Speichern kurz das Ergebnis ansehen. Dafür reicht ein umrandeter Button.',
      export:
        'Export ist eine ergänzende Aktion, die seltener gebraucht wird. Ein Text-Button reicht aus.',
      cancel:
        'Mit „Abbrechen“ kann der Nutzer die Seite verlassen. Das sollte leicht zu finden sein, während die Hauptaufgabe im Vordergrund bleibt.',
      remove:
        '„Projekt löschen“ ist die riskanteste Aktion auf dieser Seite. Der Nutzer ist hier, um Änderungen zu speichern. Ein roter Warnhinweis reicht aus und der Haupt-Button bleibt für das Speichern reserviert.'
    },
    wrongLabel: 'Nicht ganz',
    rightLabel: 'Richtig',
    solvedTitle: 'Nach der Anpassung',
    solvedNote:
      'Jetzt siehst du auf einen Blick, wie du speicherst oder vorher die Vorschau öffnest. „Projekt löschen“ steht getrennt auf der anderen Seite.',
    reset: 'Noch einmal probieren'
  },
  fluent: {
    title: 'Je mehr Buttons es gibt, desto wichtiger ist ihre Abstufung',
    subtitle:
      'Fluent 2 unterscheidet vier Stufen: Primary, Secondary, Subtle und Transparent. Die Aktionsleiste unten stammt von einer Verwaltungsseite. Ändere die Anzahl der Buttons mit dem Regler und wechsle dann zwischen den beiden Varianten. Was fällt dir auf?',
    count: 'Anzahl der Buttons',
    styleAll: 'Alle als Primary',
    styleLevels: 'Vier Stufen nach Fluent',
    allNote:
      'Jeder Button ist ein ausgefüllter Primary. Bei so vielen Buttons weißt du kaum, wo du zuerst hinschauen sollst.',
    levelsNote:
      'Nur „Neues Projekt“ bleibt Primary. „Export“ wird zu Secondary. Die übrigen Buttons treten in den Hintergrund und werden deutlicher, wenn du mit der Maus darüberfährst.',
    legendTitle: 'Fahre zum Vergleichen mit der Maus über die vier Stufen.',
    levels: [
      {
        name: 'Primary',
        desc: 'Ausgefüllt. Einer pro Bereich.'
      },
      {
        name: 'Secondary',
        desc: 'Umrandet. Für häufig genutzte Nebenaktionen.'
      },
      {
        name: 'Subtle',
        desc: 'Transparent. Beim Überfahren erscheint ein heller Hintergrund.'
      },
      {
        name: 'Transparent',
        desc: 'Ohne Rahmen. Beim Überfahren erscheint ein Rahmen.'
      }
    ],
    actions: [
      {
        id: 'create',
        label: 'Neues Projekt'
      },
      {
        id: 'export',
        label: 'Export'
      },
      {
        id: 'import',
        label: 'Import'
      },
      {
        id: 'filter',
        label: 'Filtern'
      },
      {
        id: 'sort',
        label: 'Sortieren'
      },
      {
        id: 'refresh',
        label: 'Aktualisieren'
      },
      {
        id: 'share',
        label: 'Teilen'
      },
      {
        id: 'archive',
        label: 'Archivieren'
      }
    ]
  },
  tokens: {
    title: 'Ein Wert ändert sich, beide Seiten ändern sich mit',
    subtitle:
      'Atlassian legt Werte wie Farbe, Abrundung und Größe als Tokens fest. Alle Seiten greifen auf dieselben Werte zu. Ziehe die Regler rechts und aktiviere dann „Jede Seite nutzt eigene Werte“. Vergleiche die beiden Seiten.',
    pageA: 'Projektliste',
    pageB: 'Kontoeinstellungen',
    radius: 'Abrundung',
    height: 'Button-Höhe',
    accent: 'Akzentfarbe',
    pixel: '{n}px',
    colors: ['Blau', 'Grün', 'Orange', 'Violett'],
    inconsistent: 'Jede Seite nutzt eigene Werte (ohne Tokens)',
    inconsistentNote:
      'Die Seite rechts verwendet jetzt eigene, frei gewählte Werte für Farbe, Abrundung und Höhe. Für sich sieht jede Seite gut aus. Nebeneinander wirken sie wie verschiedene Produkte.',
    consistentNote:
      'Beide Seiten verwenden dieselben Tokens. Als du die Regler bewegt hast, haben sich beide Seiten gemeinsam verändert.',
    mock: {
      list: {
        title: 'Projekte',
        create: 'Neues Projekt',
        open: 'Öffnen',
        items: [
          {
            name: 'Kursplanung',
            meta: 'Dokumente · heute aktualisiert'
          },
          {
            name: 'Recherchenotizen',
            meta: 'Dokumente · vor 3 Tagen aktualisiert'
          }
        ]
      },
      settings: {
        title: 'Kontoeinstellungen',
        email: 'E-Mail',
        emailValue: 'you@example.com',
        notify: 'Benachrichtigungen erhalten',
        save: 'Speichern',
        cancel: 'Abbrechen'
      }
    }
  },
  layers3: {
    title: 'Die drei Ebenen voneinander abheben',
    subtitle:
      'Eine Seite hat meist drei Ebenen: Hauptinformation, unterstützende Informationen und sekundäre Aktionen. Unten bleiben die Inhalte gleich. Ziehe am Regler und sieh, wie sich die Ebenen immer deutlicher voneinander abheben.',
    slider: 'Unterschied zwischen den Ebenen',
    flat: 'Alle drei Ebenen sind gleich stark betont. Da alles gleich wichtig wirkt, fällt nichts auf.',
    mid: 'Teilweise abgestuft. Du siehst zuerst den Titel, dann die Beschreibung.',
    full: 'Klar abgestuft. Du erkennst sofort, wohin du zuerst schauen und was du als Nächstes tun kannst.',
    labels: [
      'Hauptinformation',
      'Unterstützende Informationen',
      'Sekundäre Aktionen'
    ],
    mock: {
      title: 'Kursplanung',
      body: 'Hier halten wir den Stand der Kursplanung für dieses Semester fest. Wöchentliche Aktualisierung.',
      meta: '4 Mitglieder · 12 Dokumente · gestern aktualisiert',
      primary: 'Projekt öffnen',
      secondary: ['Archivieren', 'Teilen']
    }
  },
  taskflow: {
    title: 'Eine Seite, zwei Anordnungen',
    subtitle:
      'Auf beiden Seiten siehst du dieselben sechs Module. Links sind sie beliebig angeordnet. Rechts folgen sie der Aufgabe des Nutzers. Fahre rechts mit der Maus über die Schritte, um den Ablauf zu verfolgen.',
    stacked: 'Aneinandergereihte Module',
    task: 'Nach Aufgabe geordnet',
    taskLine:
      'Aufgabe: Das zuletzt bearbeitete Projekt finden und weiter bearbeiten',
    steps: [
      {
        name: 'Die Seite einordnen',
        detail:
          'Der Titel nennt das Ziel der Seite in einer Zeile und fällt zuerst ins Auge.'
      },
      {
        name: 'Die Auswahl eingrenzen',
        detail:
          'Die Filter stehen direkt unter dem Titel, damit ich die Auswahl zuerst eingrenzen kann.'
      },
      {
        name: 'Das gesuchte Projekt finden',
        detail:
          'Die Projektliste ist der Hauptinhalt der Seite. Zuletzt aktualisierte Projekte stehen oben.'
      },
      {
        name: 'Mit der Arbeit beginnen',
        detail:
          'Die Hauptaktion für jeden Eintrag steht direkt in seiner Zeile.'
      }
    ],
    modules: {
      title: 'Projekte',
      goal: 'Verwalte alle deine Projekte',
      announce: 'Ankündigung',
      announceText: 'Geplante Wartung am Samstag, 02:00–04:00 Uhr',
      recommend: 'Empfohlen',
      recommendText: 'Probiere die neue Gantt-Ansicht aus',
      settings: 'Einstellungen',
      filter: 'Filtern',
      list: 'Projektliste',
      open: 'Öffnen',
      items: [
        {
          name: 'Kursplanung',
          meta: 'Dokumente · heute aktualisiert'
        },
        {
          name: 'Recherchenotizen',
          meta: 'Dokumente · vor 3 Tagen aktualisiert'
        }
      ]
    }
  },
  roleKinds: {
    title: 'So sehen fünf häufige Button-Rollen aus',
    subtitle:
      'Hier siehst du die fünf Rollen aus der Tabelle oben nebeneinander. Größe und Abrundung sind gleich. Die Buttons unterscheiden sich nur in Füllung und Farbe.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: 'Die wichtigste Aktion im aktuellen Bereich',
        sample: 'Speichern'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: 'Unterstützende Aktionen',
        sample: 'Vorschau'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: 'Aktionen mit niedriger Priorität',
        sample: 'Mehr erfahren'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: 'Riskante Aktionen wie Löschen oder Deaktivieren',
        sample: 'Projekt löschen'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: 'Lokale Werkzeugaktionen',
        sample: 'Schließen'
      }
    ]
  }
}
