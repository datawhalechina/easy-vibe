export default {
  common: {
    before: 'Before',
    after: 'After',
    reset: 'Reset'
  },
  compare: {
    title: 'One page, two hierarchies',
    subtitle:
      'Both sides use exactly the same words. I only changed the hierarchy. Try hovering a problem below to compare the two pages, then drag the squint test.',
    squint: 'Squint test',
    squintHint:
      'It works like squinting at a page: whatever you can still make out once it blurs is what grabs your attention.',
    squintClear: 'Sharp',
    squintBlurry: 'Blurred',
    issueLabel: 'Four problems in the left page',
    applyHint:
      'Try the switches above the right page: each one you turn off brings an old problem back.',
    tableHead: ['Problem', 'How to fix it', 'What changes'],
    metrics: {
      borders: 'Decorative borders',
      solid: 'Filled buttons',
      legend:
        'Compare the numbers above each page. The right page has far fewer borders and filled buttons, and that is exactly why its title and primary button stand out.'
    },
    moreMenu: ['Rename', 'Delete'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'Type scale',
        problem:
          'Title, filters and buttons are crammed together, all at the same size',
        fix: 'Give each layer its own row: title first, then filters. Largest title, then description, then small details like dates',
        result:
          'You can tell at a glance what the page is and where to look first'
      },
      {
        id: 'borders',
        n: '②',
        short: 'Fewer borders',
        problem:
          'Every module sits in a heavy border, with another border nested inside',
        fix: 'Group with alignment and spacing first, and keep a box only where a real boundary is needed',
        result: 'Fewer lines, yet it is easier to see what belongs together'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'Button hierarchy',
        problem:
          'All 8 buttons are filled, so every one of them looks like the main action',
        fix: 'Keep one primary button per area and turn the rest into outlined or text buttons',
        result: 'You can see what to click next at a glance'
      },
      {
        id: 'scope',
        n: '④',
        short: 'Action placement',
        problem:
          '"Delete" affects a single project, yet it sits next to a page-wide action like "New"',
        fix: 'Page-wide actions go in a page-level spot. Actions that affect one item sit next to that item',
        result: 'You can say exactly what each button will affect'
      }
    ],
    mock: {
      pageTitle: 'Projects',
      count: '2 projects',
      filters: ['All', 'Active'],
      sort: 'Recently updated',
      create: 'New project',
      export: 'Export',
      remove: 'Delete',
      open: 'Open',
      more: 'More actions',
      items: [
        { name: 'Course design', meta: 'Docs · updated today' },
        { name: 'Research notes', meta: 'Docs · updated 3 days ago' }
      ]
    }
  },
  anatomy: {
    title: 'Page anatomy: four layers, four jobs',
    subtitle:
      'Hover a layer below and the page will show you where it sits. Click to keep it highlighted.',
    taskLabel: 'What it is responsible for',
    meansLabel: 'How it does it',
    showLabels: 'Show labels',
    showGuides: 'Show guides',
    guidesNote:
      'With the guides on you can see that everything starts on the same vertical line. Neighbouring content sits close together, while different layers are kept far apart.',
    gap: 'Gap',
    typeTitle:
      'These three lines are pulled apart by nothing more than size, weight and color depth',
    typeSample: 'Sample',
    layers: [
      {
        id: 'locate',
        name: 'Orientation',
        task: 'Tells the user where they are and how to get back',
        means: 'A quiet navigation title plus a familiar way back'
      },
      {
        id: 'primary',
        name: 'Primary information',
        task: 'Tells the user what matters most on this page',
        means:
          'The largest text on the page, a stretch of whitespace after it, and a fixed position'
      },
      {
        id: 'support',
        name: 'Supporting information',
        task: 'Adds context and metadata',
        means:
          'Smaller and lighter but still readable, placed right beside what it describes'
      },
      {
        id: 'action',
        name: 'Actions',
        task: 'Tells the user what they can do next',
        means:
          'One filled primary button, the rest toned down, placed after the content'
      }
    ],
    typeScale: [
      {
        name: 'Content title',
        px: 22,
        weight: 700,
        note: 'Appears only once on the page'
      },
      {
        name: 'Body',
        px: 14,
        weight: 400,
        note: 'Meant for reading, with a little more line height'
      },
      {
        name: 'Supporting text',
        px: 12,
        weight: 400,
        note: 'Smaller and lighter, but no smaller than this'
      }
    ],
    mock: {
      back: 'Back',
      navTitle: 'Projects',
      title: 'Course design',
      meta: '4 members · 12 docs · updated yesterday',
      body: 'Tracking this term of the course design, updated weekly.',
      link: 'View all documents',
      primary: 'Open project',
      secondary: 'Archive'
    }
  },
  grouping: {
    title: 'Should you add a border? Watch three steps',
    subtitle:
      'Below is the same settings form. Click through the three steps in order and see where the grouping starts to read.',
    stepLabel: 'Step {n}',
    metricBorders: 'Decorative borders',
    metricGaps: 'Different gap sizes',
    showGaps: 'Show spacing',
    explicitToggle: 'Give "Notifications" a tinted background',
    implicitTitle: 'Implicit grouping',
    implicitText:
      'No box is drawn. Distance, alignment and whitespace make related content look like one group.',
    explicitTitle: 'Explicit grouping',
    explicitText:
      'A tint or an outline gives one group a clearer edge. Before adding one, ask yourself: does this group really need an edge?',
    gapInside: 'Within a group',
    gapBetween: 'Between groups',
    steps: [
      {
        caption:
          'Step one: a border on everything. Every element shouts "I matter", and you can no longer tell what belongs together.'
      },
      {
        caption:
          'Step two: only the borders are removed. It is quieter, but the gaps are all still the same size, so the content drifts apart.'
      },
      {
        caption:
          'Step three: spacing does the grouping. Related items move closer, unrelated ones move apart. Not one line is drawn, yet you can already see the groups.'
      }
    ],
    mock: {
      pageTitle: 'Account settings',
      basic: 'Basic info',
      email: 'Email',
      phone: 'Phone',
      password: 'Change password',
      newPassword: 'New password',
      confirm: 'Confirm password',
      notify: 'Notifications',
      mail: 'Email notifications',
      desktop: 'Desktop notifications',
      save: 'Save',
      cancel: 'Cancel'
    }
  },
  buttonSpec: {
    title: 'The complete definition of one button',
    subtitle:
      'Saying "add a button" turns into 10 questions inside a design system. Open them one by one on the left and see how far each one has to be spelled out.',
    questionLabel: 'What the system asks',
    sampleLabel: 'Written out, it looks like this',
    sourceLabel: 'Read the source',
    rolesRule:
      'Note that a role is about what happens when the button is clicked, not about how important it is. That is why Delete, dangerous as it is, should not be the most prominent button on the page.',
    structureRule:
      'Start the label with a verb. Compared with "OK", "Save draft" tells you at a glance what clicking will do.',
    visualRule:
      'Style decides how prominent a button is. Role decides what happens. Keep those two ideas separate.',
    sizeRule:
      'A button can look small, but the area a finger can hit cannot be. That is why the two sizes are defined separately.',
    sizeVisible: 'Visible height',
    sizeTarget: 'Hit area',
    statesRule:
      'All of these states have to be defined ahead of time, and color alone cannot tell them apart.',
    behaviorRule:
      'After the click, the user wants to know what is going on at every moment: react right away, show something while waiting, and on failure explain what to do next.',
    adaptiveRule:
      'Try the slider above: as the text grows, the button grows with it and the label wraps instead of being cut off.',
    a11yRule:
      'The button has to work for someone using only a keyboard, or not looking at the screen.',
    boundaryRule:
      'The last big job of a design system is telling you when not to use a component. That matters as much as what it can do.',
    a11yNoName: 'Screen reader announces: button',
    a11yWithName: 'Screen reader announces: delete, button',
    fontSize: 'Text size',
    dimsLabel: 'Definition dimensions',
    purposeExamples: ['Save', 'Send', 'Delete'],
    purposeLine:
      'These three buttons look different, but they all do the same thing: the moment you click, something happens.',
    roleSamples: {
      Normal: 'Preview',
      Primary: 'Publish',
      Cancel: 'Cancel',
      Destructive: 'Delete project'
    },
    anatomyBtn: 'Publish project',
    genericBtn: 'Continue',
    deleteLabel: 'Delete',
    roles: [
      {
        name: 'Normal',
        desc: 'An ordinary action that needs no extra emphasis'
      },
      { name: 'Primary', desc: 'The one to click now, one or two per view' },
      {
        name: 'Cancel',
        desc: 'Lets the user back out without stealing the spotlight'
      },
      {
        name: 'Destructive',
        desc: 'There is no undo, so it warns with color and is never the default'
      }
    ],
    parts: [
      {
        name: 'Container',
        desc: 'The body of the button: its color, size and pressed state all live here'
      },
      {
        name: 'Icon',
        desc: 'Optional, helps you recognize what the button is for at a glance'
      },
      { name: 'Label', desc: 'Says clearly what will happen when you click' }
    ],
    levels: [
      {
        name: 'Filled',
        desc: 'The most prominent, saved for the most important action right now'
      },
      {
        name: 'Tonal',
        desc: 'A little more visible than an outline, for secondary actions that still need to be seen'
      },
      {
        name: 'Outlined',
        desc: 'The alternative placed next to a filled button'
      },
      { name: 'Text', desc: 'The least prominent, for supporting entry points' }
    ],
    stateGallery: ['Default', 'Hover', 'Pressed', 'Focused', 'Disabled'],
    behaviorStages: ['Ready', 'Pressed', 'In progress', 'Done / failed'],
    a11yChecks: [
      'Has an accessible name, including icon-only buttons',
      'Can be focused by keyboard, with a visible focus',
      'Text and background have enough contrast',
      'State is conveyed by more than color'
    ],
    boundaries: [
      { want: 'Go to another page', use: 'Link, tab' },
      { want: 'Switch between two states', use: 'Switch, toggle button' },
      { want: 'Pick one of several values', use: 'Pop-up button, select' },
      { want: 'Hold a set of rarely used commands', use: 'Menu' }
    ],
    boundaryWant: 'What you want to do',
    boundaryUse: 'A better-fit component',
    dims: [
      {
        id: 'purpose',
        name: 'Purpose',
        question: 'What problem does this element solve?',
        sample:
          'The "Publish" button submits the current project; on success its state becomes published.',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'Role',
        question: 'Does it express an action, a selection or navigation?',
        sample:
          'Delete project has the Destructive role and an Outlined style, and is not the default button.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: 'Structure',
        question: 'Which parts is it made of?',
        sample:
          'A container, an optional icon and a label; the label is a one-line verb phrase.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: 'Visual',
        question: 'How is emphasis expressed?',
        sample:
          'Only "Publish" is Filled on this page; other actions are Outlined or Text.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'Size',
        question: 'Within which constraints is it laid out?',
        sample:
          'Visible height 40, hit area no smaller than 44×44; buttons in a group share a height with 8 spacing.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: 'States',
        question: 'What does it show under each condition?',
        sample:
          'Define six states: default, hover, pressed, focused, disabled and loading.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: 'Behavior',
        question: 'What happens once it is triggered?',
        sample:
          'Enter the loading state right after the click and block duplicate submits, then report the result.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: 'Adaptation',
        question: 'How does it stay usable when the environment changes?',
        sample:
          'Allow the label to wrap to two lines as text size grows; the button height grows with it.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'Accessibility',
        question: 'Can it be operated without relying on one sense?',
        sample:
          'The icon button exposes "Delete" as its accessible name; focus order matches visual order.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: 'Boundary',
        question: 'When should it not be used?',
        sample:
          'Use a link to navigate to a page; use a switch to toggle between two values.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'Button states and behavior',
    subtitle:
      'The state is how the button looks right now. The behavior is what happens after you click it.',
    statesTitle: 'First, the states: there are six',
    stateHead: ['State', 'When it appears', 'How it changes', 'Watch out'],
    liveHint:
      'Hover over this button, hold the pointer down, or select it with the Tab key, and watch how it changes each time:',
    currentState: 'Current state',
    sample: 'Button',
    stateNames: {
      default: 'Default',
      hover: 'Hover',
      pressed: 'Pressed',
      focus: 'Focus'
    },
    states: [
      {
        id: 'default',
        name: 'Default',
        trigger: 'No interaction',
        change: 'The regular look',
        tip: 'Most buttons on a page sit here'
      },
      {
        id: 'hover',
        name: 'Hover',
        trigger: 'Pointer enters',
        change: 'Background gets slightly darker',
        tip: 'Tells the user "this is clickable"'
      },
      {
        id: 'pressed',
        name: 'Pressed',
        trigger: 'Held down, not yet released',
        change: 'Background gets darker still',
        tip: 'If you draw your own button, you have to add this state yourself'
      },
      {
        id: 'focus',
        name: 'Focus',
        trigger: 'Keyboard Tab moves onto it',
        change: 'A focus ring appears around it',
        tip: 'Do not remove it with outline: none'
      },
      {
        id: 'disabled',
        name: 'Disabled',
        trigger: 'A precondition is not met',
        change: 'Lower opacity, ignores clicks',
        tip: 'Ideally also explain why it cannot be clicked'
      },
      {
        id: 'loading',
        name: 'Loading',
        trigger: 'The action has started and not finished',
        change: 'Label switches to in-progress, a spinner appears',
        tip: 'It tells the user "I am working on it", not "you cannot click this"'
      }
    ],
    behaviorTitle: 'Now the behavior: what happens after the click',
    behaviorHint:
      'Click "Publish project" once and watch everything that happens between the click and the result.',
    scenario: 'Simulated result',
    scenarioSuccess: 'Success',
    scenarioFail: 'Failure',
    run: 'Publish project',
    running: 'Publishing…',
    done: 'Published',
    failed: 'Publishing failed, your content is kept',
    retry: 'Try again',
    stageHead: ['Stage', 'What the user needs to know'],
    stages: [
      {
        name: 'Ready',
        desc: 'Before the click: the button tells me what will happen'
      },
      {
        name: 'Instant feedback',
        desc: 'The moment of the click: the look changes, so I know it registered'
      },
      {
        name: 'In progress',
        desc: 'While waiting: a progress indicator, and repeated clicks are blocked'
      },
      {
        name: 'Result',
        desc: 'Success is stated plainly; failure explains the next step'
      },
      {
        name: 'Recovery',
        desc: 'After a failure the input is still there, so I can retry'
      }
    ],
    rulesTitle: 'Four rules',
    rules: [
      'React right after the click, even if all that changes is the button getting a little darker',
      'Show something while waiting, so the user does not think the page froze',
      'Loading and disabled are not the same thing: loading says "I am working on it", disabled says "you cannot click this"',
      'Let the label follow along: before the click it says "Publish project", after the click it says "Publishing…"'
    ]
  },
  lookalike: {
    title: 'They look alike, but they are not the same',
    subtitle:
      'The two controls below look almost identical. Open each one and pick an option, then see how they differ.',
    popupTag: 'Picks one value',
    pullTag: 'Runs one command',
    popupInitial: 'Sort: Newest',
    popupPrefix: 'Sort: ',
    popupOptions: ['Newest', 'Oldest', 'Name'],
    pullInitial: 'Actions',
    pullOptions: ['Rename', 'Copy link', 'Delete'],
    pullDone: 'Done: {name}',
    popupValue: 'Current value: {value}',
    pullIdle: 'No command has run yet',
    tableHead: ['', 'Pop-up button', 'Pull-down button'],
    rows: [
      [
        'When you open it',
        'A few options to choose from, with the current one checked',
        'A few commands you can run'
      ],
      [
        'After you pick one',
        'Remembers your choice, and the text on the button changes too',
        'Runs that command and closes, and the text on the button stays the same'
      ],
      [
        'Good for',
        'Switching sort order, choosing a view, picking an option',
        'Actions such as rename, export or delete'
      ],
      ['Do not use it to', 'Hold commands', 'Act as a filter or navigation']
    ],
    conclusion:
      'See the difference? The two controls look the same, but when you clicked just now the one on the left only changed a value for you, while the one on the right actually did something. So next time you are unsure which to use, do not go by the look. Ask yourself: when the user clicks, do they want to pick a value, or do they want something done?'
  },
  skeleton: {
    title: 'Take a page apart: who handles navigation, content and actions',
    subtitle:
      'Below is an ordinary project list page. Hover an item on the left (click to keep it) and the page will outline in a solid line where it lives, and in a dashed line what it affects.',
    legendCtl: 'Solid line: where it lives',
    legendAffect: 'Dashed line: what it affects',
    leading: 'Back and the title go on the left',
    trailing: 'Actions go on the right, with only one standing out',
    taskLabel: 'The question it answers',
    affectLabel: 'What it affects',
    misplacedToggle: 'Try moving "Delete" up into the toolbar',
    misplacedHint:
      'Now "Delete" sits in the toolbar right next to "New project". Click it, and which project gets deleted? You can no longer tell. That is why an action belongs next to the content it affects.',
    items: [
      {
        id: 'global',
        name: 'Global navigation',
        question: 'Which area of the product do I want to go to?',
        affect: 'The whole page is swapped for another area'
      },
      {
        id: 'locate',
        name: 'Page title',
        question: 'Which page am I on, and how do I get back?',
        affect: 'This page'
      },
      {
        id: 'content',
        name: 'Main content',
        question: 'What am I looking at?',
        affect: 'It is the content that the other controls affect'
      },
      {
        id: 'listctl',
        name: 'Filter and sort',
        question: 'How do I want to view this list?',
        affect: 'Which projects the list shows, and in what order'
      },
      {
        id: 'pageact',
        name: 'Page-level actions',
        question: 'What do I want to do to the whole page?',
        affect: 'Every project in the list'
      },
      {
        id: 'itemact',
        name: 'Item-level actions',
        question: 'What do I want to do to one particular item?',
        affect: 'Only that one project'
      }
    ],
    mock: {
      nav: ['Projects', 'Members', 'Settings'],
      title: 'Projects',
      section: 'Recent projects',
      filters: ['All', 'Active'],
      sort: 'Recently updated',
      export: 'Export',
      create: 'New project',
      remove: 'Delete',
      open: 'Open',
      more: 'More actions',
      items: [
        { name: 'Course design', meta: 'Docs · updated today' },
        { name: 'Research notes', meta: 'Docs · updated 3 days ago' }
      ]
    }
  },
  specMap: {
    title: 'First, look at what a design system actually contains',
    subtitle:
      'Many people think a design system is just about colors and corner radius. Count up the table of contents of the Apple guidelines with me: it has 6 major categories and 158 topics. Click any topic below, or use the switch above to pick out the topics related to pages and buttons.',
    checkedAt:
      'Categories and counts checked against the Apple HIG table of contents, November 2026',
    all: 'All topics',
    page: 'About pages',
    button: 'About buttons',
    topicsUnit: 'topics',
    moreTopics: '{n} more',
    pick: 'Click a topic to see the question it answers',
    questionLabel: 'The question it answers',
    relPage: 'You will use it in the page part of this chapter',
    relButton: 'You will use it in the button part of this chapter',
    relNone:
      'Not needed in this chapter, but you will meet it when building products',
    relPageShort: 'About pages',
    relButtonShort: 'About buttons',
    relBoth: 'Used for both pages and buttons',
    paraphraseNote:
      'These questions are our own plain-language paraphrases, not official wording.',
    takeaway:
      'Once you have counted, you can see that page hierarchy and buttons take up only a small slice. But once you understand this slice, you have a ruler you can use to read the rest on your own.',
    categories: [
      {
        id: 'getting-started',
        name: 'Getting started',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'Design principles',
            rel: 'both',
            q: 'What makes an interface good to use and good to look at'
          },
          {
            name: 'Designing for iOS',
            rel: '',
            q: 'What to watch out for when designing for a phone'
          },
          {
            name: 'Designing for macOS',
            rel: '',
            q: 'How designing for a computer differs from designing for a phone'
          }
        ]
      },
      {
        id: 'foundations',
        name: 'Foundations',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'Layout',
            rel: 'page',
            q: 'How to arrange things on a page so it works at any screen size'
          },
          {
            name: 'Typography',
            rel: 'page',
            q: 'Which sizes and weights make primary and secondary content distinguishable'
          },
          {
            name: 'Color',
            rel: 'both',
            q: 'Where each color is used, and what happens in dark mode'
          },
          {
            name: 'Accessibility',
            rel: 'both',
            q: 'How people who cannot see well, hear well, or use only a keyboard can use your product'
          },
          {
            name: 'Icons',
            rel: 'button',
            q: 'What style and size icons should be, and when they need a text label'
          },
          {
            name: 'Writing',
            rel: 'both',
            q: 'How to word buttons and messages so they are understood at a glance'
          },
          {
            name: 'Motion',
            rel: '',
            q: 'When things should move, and how to move them without distracting'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Patterns',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'Feedback',
            rel: 'button',
            q: 'How to let people know their click registered'
          },
          {
            name: 'Loading',
            rel: 'both',
            q: 'What to show while waiting, so it does not look frozen'
          },
          {
            name: 'Undo and redo',
            rel: 'both',
            q: 'How to recover from a mistake, and which actions need no confirmation'
          },
          {
            name: 'Modality',
            rel: 'page',
            q: 'When you may interrupt someone, and how they get back out'
          },
          {
            name: 'Searching',
            rel: 'page',
            q: 'How to help people find what they want quickly'
          },
          {
            name: 'Settings',
            rel: 'page',
            q: 'How to organize a settings page so nobody gets lost'
          }
        ]
      },
      {
        id: 'components',
        name: 'Components',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'Buttons',
            rel: 'button',
            q: 'Which actions should be buttons, and what states they have'
          },
          {
            name: 'Toolbars',
            rel: 'page',
            q: 'How to group a row of actions, and which one gets the most prominent spot'
          },
          {
            name: 'Menus',
            rel: 'button',
            q: 'How to tuck away many commands, and when not to use a menu'
          },
          {
            name: 'Alerts',
            rel: 'both',
            q: 'Which information is important enough to interrupt someone'
          },
          {
            name: 'Lists and tables',
            rel: 'page',
            q: 'How to arrange many rows so they are easy to scan'
          },
          {
            name: 'Toggles',
            rel: 'button',
            q: 'Which control to use for switching between two states'
          },
          {
            name: 'Pickers',
            rel: 'button',
            q: 'Which control to use for choosing one of several values'
          }
        ]
      },
      {
        id: 'inputs',
        name: 'Inputs',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'Gestures',
            rel: '',
            q: 'Which actions can be done with a swipe or a tap'
          },
          {
            name: 'Keyboards',
            rel: 'both',
            q: 'Whether the whole flow can be completed with a keyboard alone'
          },
          {
            name: 'Pointing devices',
            rel: 'both',
            q: 'How a control should respond when the pointer hovers or presses'
          }
        ]
      },
      {
        id: 'technologies',
        name: 'Technologies',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: 'Notifications',
            rel: '',
            q: 'When to send a notification, and how to word it without being intrusive'
          },
          {
            name: 'Widgets',
            rel: '',
            q: 'How much content a home-screen widget should show'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'Which actions people can do just by asking'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'Your turn: which one should be the primary button?',
    subtitle:
      'Below is an "Edit project" page. To make the problem obvious, I have drawn all 5 buttons exactly alike. Click the one you think should stand out the most.',
    cardTitle: 'Edit project',
    nameLabel: 'Project name',
    nameValue: 'Course design',
    descLabel: 'Description',
    descValue: 'Tracking this term of the course design',
    buttons: [
      { id: 'save', label: 'Save changes' },
      { id: 'preview', label: 'Preview' },
      { id: 'export', label: 'Export' },
      { id: 'cancel', label: 'Cancel' },
      { id: 'remove', label: 'Delete project' }
    ],
    hintToggle: 'Stuck? Look at the steps for deciding',
    stepsTitle: 'Three questions for ranking buttons',
    steps: [
      {
        q: 'What did the user come here to get done?',
        a: 'Saving their changes. That is the one and only primary button.'
      },
      {
        q: 'Which actions are only there to help?',
        a: 'Preview, export and cancel. Give them an outlined or text button so they do not steal the show.'
      },
      {
        q: 'Which action cannot be undone?',
        a: 'Delete project. Warn with color, and keep it away from the primary button.'
      }
    ],
    feedback: {
      save: 'The user opened "Edit project" to save their changes, so that is the single primary button.',
      preview:
        'Preview is a helper step, a quick look before saving. An outlined button is enough. It does not need to be the most prominent.',
      export:
        'Export is a helper action that gets used less often. A text button is enough.',
      cancel:
        'Cancel is the way out. A way out should be easy to find, but it should not be more prominent than the main task.',
      remove:
        "Delete project is the most dangerous action, but the user did not come here to delete. A red warning is enough. It should not take the primary button's place."
    },
    wrongLabel: 'Not quite',
    rightLabel: 'You got it',
    solvedTitle: 'After the fix',
    solvedNote:
      'Now it reads at a glance: save first, preview if you want a look first, and delete sits apart on the other side.',
    reset: 'Try it again'
  },
  fluent: {
    title: 'The more buttons, the more you have to manage which one stands out',
    subtitle:
      'Fluent 2 sorts buttons into four levels: Primary, Secondary, Subtle and Transparent. The row of actions below comes from an ordinary admin page. Drag the slider to add or remove buttons, then switch between the two approaches and see what changes.',
    count: 'Number of buttons',
    styleAll: 'Make them all Primary',
    styleLevels: 'Use the four Fluent levels',
    allNote:
      'Every one is a solid Primary button. Once there are this many, your eyes no longer know where to look first.',
    levelsNote:
      'Only "New project" stays Primary, "Export" drops to Secondary, and the rest are nearly invisible until you hover over them.',
    legendTitle: 'The four levels. Hover over them to compare',
    levels: [
      { name: 'Primary', desc: 'Solid. One per area' },
      {
        name: 'Secondary',
        desc: 'Outlined. Secondary but frequently used actions'
      },
      {
        name: 'Subtle',
        desc: 'Transparent until you hover, then a light background appears'
      },
      {
        name: 'Transparent',
        desc: 'No border until you hover, then one appears'
      }
    ],
    actions: [
      { id: 'create', label: 'New project' },
      { id: 'export', label: 'Export' },
      { id: 'import', label: 'Import' },
      { id: 'filter', label: 'Filter' },
      { id: 'sort', label: 'Sort' },
      { id: 'refresh', label: 'Refresh' },
      { id: 'share', label: 'Share' },
      { id: 'archive', label: 'Archive' }
    ]
  },
  tokens: {
    title: 'Change one value, and both pages change together',
    subtitle:
      'Atlassian turns values like color, corner radius and size into "tokens", and every page reads from the same set. Below are two pages. Drag the sliders on the right, then tick "each page does its own thing" and compare.',
    pageA: 'Project list',
    pageB: 'Account settings',
    radius: 'Corner radius',
    height: 'Button height',
    accent: 'Accent color',
    pixel: '{n}px',
    colors: ['Blue', 'Green', 'Orange', 'Purple'],
    inconsistent: 'Each page does its own thing (no tokens)',
    inconsistentNote:
      'Now the page on the right uses whatever color, radius and height someone picked on the spot. Each one looks fine alone, but together they no longer look like the same product.',
    consistentNote:
      'Both pages read from the same tokens. When you dragged the sliders just now, they changed together.',
    mock: {
      list: {
        title: 'Projects',
        create: 'New project',
        open: 'Open',
        items: [
          { name: 'Course design', meta: 'Docs · updated today' },
          { name: 'Research notes', meta: 'Docs · updated 3 days ago' }
        ]
      },
      settings: {
        title: 'Account settings',
        email: 'Email',
        emailValue: 'you@example.com',
        notify: 'Receive notifications',
        save: 'Save',
        cancel: 'Cancel'
      }
    }
  },
  layers3: {
    title: 'Pull the three layers apart',
    subtitle:
      'A page usually has three layers: primary information, supporting information and secondary actions. The page below uses the same content throughout. Drag the slider and watch the three layers go from "equally heavy" to "pulled apart".',
    slider: 'Distance between layers',
    flat: 'All three equally heavy: everything matters, so nothing does',
    mid: 'Partly apart: you see the title first, then the description',
    full: 'Fully apart: you know at a glance what to look at first and what to do next',
    labels: [
      'Primary information',
      'Supporting information',
      'Secondary actions'
    ],
    mock: {
      title: 'Course design',
      body: 'Tracking this term of the course design, updated weekly.',
      meta: '4 members · 12 docs · updated yesterday',
      primary: 'Open project',
      secondary: ['Archive', 'Share']
    }
  },
  taskflow: {
    title: 'One page, two ways to lay it out',
    subtitle:
      "The two pages below use the same six modules. The left one puts things wherever they came to mind. The right one is organized around the user's task. Hover over the steps on the right and follow how the task plays out.",
    stacked: 'Piled-up modules',
    task: 'Organized around the task',
    taskLine:
      "The user's task: find the project I worked on most recently and keep editing",
    steps: [
      {
        name: 'Know what this page is',
        detail: 'The title states the page goal in one line and is seen first'
      },
      {
        name: 'Narrow things down',
        detail:
          'Filters sit right under the title, so I can filter before I look'
      },
      {
        name: 'Find the target',
        detail:
          'The project list is the body of the page, most recently updated first'
      },
      {
        name: 'Start working',
        detail: "Each row's main action sits right beside that row"
      }
    ],
    modules: {
      title: 'Projects',
      goal: 'Manage all your projects',
      announce: 'Announcement',
      announceText: 'Scheduled maintenance this Saturday, 02:00–04:00',
      recommend: 'Recommended',
      recommendText: 'Try the new Gantt view',
      settings: 'Settings',
      filter: 'Filter',
      list: 'Project list',
      open: 'Open',
      items: [
        { name: 'Course design', meta: 'Docs · updated today' },
        { name: 'Research notes', meta: 'Docs · updated 3 days ago' }
      ]
    }
  },
  roleKinds: {
    title: 'What the five common roles look like',
    subtitle:
      'The five roles from the table above, laid out in one row. They share the same size and corner radius. Only the fill and color differ.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: 'The most important action in the area',
        sample: 'Save'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: 'Supporting actions',
        sample: 'Preview'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: 'Low-priority actions',
        sample: 'Learn more'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: 'Risky actions like deleting or deactivating',
        sample: 'Delete project'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: 'Local tool actions',
        sample: 'Close'
      }
    ]
  }
}
