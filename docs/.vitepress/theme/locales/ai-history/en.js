// AI History – English locale
export default {
  // AiEvolutionDemo
  aiEvolution: {
    eras: [
      { label: 'Foundations', years: '1940s-50s' },
      { label: '1st Wave', years: '1960s-70s' },
      { label: '❄️ Winter I', years: '1974-80' },
      { label: '2nd Wave', years: '1980s' },
      { label: '❄️ Winter II', years: '1987-93' },
      { label: 'ML Rise', years: '1990s-2000s' },
      { label: 'Deep Learning', years: '2010s' },
      { label: 'LLM Era', years: '2018+' }
    ],
    legend: {
      wave: 'Tech Wave',
      winter: '❄️ AI Winter',
      llm: 'LLM Era'
    }
  },

  // DiscriminativeVsGenerativeDemo
  schools: {
    repLabel: 'Examples',
    items: [
      {
        name: 'Symbolism',
        idea: 'Intelligence = symbolic reasoning / If-Then rules',
        rep: 'Expert Systems, Deep Blue',
        status: '→ Merging with connectionism (neuro-symbolic AI)'
      },
      {
        name: 'Connectionism',
        idea: 'Intelligence = neural networks + massive data',
        rep: 'AlphaGo, GPT series',
        status: '→ Dominates the LLM era, current mainstream'
      },
      {
        name: 'Behaviorism',
        idea: 'Intelligence = interaction with environment / RL',
        rep: 'AlphaGo (RL component)',
        status: '→ Merging with connectionism (deep RL)'
      }
    ]
  },

  // FoundationDemo
  foundation: {
    label: 'Core idea of Symbolism — encoding knowledge as rules',
    lines: [
      {
        parts: [
          { kw: 'IF' },
          { text: '  temperature > 38.5°C  ' },
          { kw: 'AND' },
          { text: '  WBC count > 11000' }
        ]
      },
      {
        indent: true,
        parts: [
          { kw: 'THEN' },
          { text: '  diagnosis = ' },
          { str: '"bacterial infection"' }
        ]
      },
      {
        parts: [
          { kw: 'IF' },
          { text: '  diagnosis = ' },
          { str: '"bacterial infection"' },
          { text: '  ' },
          { kw: 'AND' },
          { text: '  no penicillin allergy' }
        ]
      },
      {
        indent: true,
        parts: [
          { kw: 'THEN' },
          { text: '  treatment = ' },
          { str: '"penicillin 400mg / twice daily"' }
        ]
      }
    ],
    comment:
      '// The early medical expert system MYCIN (1977) consisted of 450+ rules like these',
    caption:
      'Human experts translate experience into IF-THEN rules; the machine matches and executes them one by one'
  },

  // PerceptronDemo
  perceptron: {
    features: ['Feature x₁', 'Feature x₂'],
    biasLabel: 'Bias',
    activated: 'Fire',
    silent: 'Silent',
    caption:
      '① Input features\u2003② Multiply by weights (importance)\u2003③ Sum + bias\u2003④ Fires output 1 if above threshold, otherwise 0'
  },

  // BackpropagationDemo
  backprop: {
    steps: [
      {
        icon: '➡️',
        name: 'Forward Pass',
        desc: 'Data flows through the network to produce a prediction'
      },
      {
        icon: '📐',
        name: 'Compute Loss',
        desc: 'Prediction vs. ground truth → calculate loss'
      },
      {
        icon: '⬅️',
        name: 'Backpropagation',
        desc: 'Trace back each weight\'s "responsibility" layer by layer'
      },
      {
        icon: '⚙️',
        name: 'Update Weights',
        desc: 'Adjust proportionally to reduce future error'
      }
    ],
    lossLabel: 'Loss decreases over training epochs:',
    axisHigh: 'High',
    axisLow: 'Low',
    axisEpochs: 'Training Epochs'
  },

  // NeuralNetworkVisualizationDemo
  neuralNet: {
    layers: [
      { name: 'Input Layer', desc: 'Raw pixels / numerical signals' },
      {
        name: 'Hidden Layers (stackable)',
        desc: 'Low → edges; Mid → shapes; High → semantic concepts'
      },
      { name: 'Output Layer', desc: 'Final classification or prediction' }
    ]
  },

  // AttentionMechanismDemo
  attention: {
    colLabel: 'Attention distribution when processing "{word}":',
    sentence: ['John', 'gave', 'the', 'apple', 'to', 'his', 'mother'],
    focusIdx: 5,
    weights: [0.62, 0.08, 0.03, 0.1, 0.05, 0.07, 0.05],
    caption:
      '"his" sits mid-sentence, yet the model directs 62% attention to "John" at the start — resolving the pronoun across distance'
  },

  // GPTEvolutionDemo
  gptEvolution: [
    {
      name: 'GPT-1',
      year: '2018',
      params: '117 M',
      barWidth: '2%',
      key: 'Pre-train + fine-tune paradigm'
    },
    {
      name: 'GPT-2',
      year: '2019',
      params: '1.5 B',
      barWidth: '6%',
      key: 'Zero-shot generalization'
    },
    {
      name: 'GPT-3',
      year: '2020',
      params: '175 B',
      barWidth: '45%',
      key: '⚡ Emergence! In-context learning'
    },
    {
      name: 'GPT-4',
      year: '2023',
      params: '~1.8 T',
      barWidth: '100%',
      key: 'Multimodal + complex reasoning'
    }
  ],

  // AIErasComparisonDemo
  erasComparison: {
    header: '🌟 AI Development Stages & Core Paradigms at a Glance',
    driverLabel: 'Driver',
    mechanismLabel: 'Core Mechanism',
    examplesLabel: 'Key Examples',
    eras: [
      {
        name: 'Rule-Based Era',
        time: '1960s - 1980s',
        driver: 'Human-coded knowledge',
        mechanism: 'If-Then logical deduction',
        examples: ['Dendral', 'Deep Blue']
      },
      {
        name: 'Classical ML',
        time: '1990s - 2000s',
        driver: 'Manual feature engineering + statistics',
        mechanism: 'Finding mathematical decision boundaries',
        examples: ['SVM', 'Random Forest']
      },
      {
        name: 'Deep Learning Revolution',
        time: '2010s',
        driver: 'Big data + GPU compute',
        mechanism: 'Neural nets auto-extract features',
        examples: ['AlexNet (CNN)', 'AlphaGo (RL)']
      },
      {
        name: 'Large Language Models',
        time: '2018 - present',
        driver: 'Massive unlabeled data + brute-force compute',
        mechanism: 'Next-token prediction + emergent knowledge',
        examples: ['GPT-4', 'Claude 3']
      },
      {
        name: 'Agentic AI',
        time: 'Now - future',
        driver: 'LLM brain + environment perception',
        mechanism: 'Autonomous planning + tool use',
        examples: ['AI Programmer', 'Embodied AI']
      }
    ]
  }
}
