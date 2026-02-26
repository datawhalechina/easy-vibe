// AI 简史 – 中文语言包
export default {
  // AiEvolutionDemo
  aiEvolution: {
    eras: [
      { label: '理论奠基', years: '1940s-50s' },
      { label: '第一次浪潮', years: '1960s-70s' },
      { label: '❄️ 寒冬 I', years: '1974-80' },
      { label: '第二次浪潮', years: '1980s' },
      { label: '❄️ 寒冬 II', years: '1987-93' },
      { label: 'ML 崛起', years: '1990s-2000s' },
      { label: '深度学习', years: '2010s' },
      { label: '大模型时代', years: '2018+' }
    ],
    legend: {
      wave: '技术浪潮',
      winter: '❄️ AI 寒冬',
      llm: '大模型时代'
    }
  },

  // DiscriminativeVsGenerativeDemo
  schools: {
    repLabel: '代表',
    items: [
      {
        name: '符号主义',
        idea: '智能 = 符号推理 / If-Then 规则',
        rep: '专家系统、深蓝',
        status: '→ 与连接主义融合（神经符号 AI）'
      },
      {
        name: '连接主义',
        idea: '智能 = 神经元网络 + 海量数据',
        rep: 'AlphaGo、GPT 系列',
        status: '→ 主导大模型时代，当前主流'
      },
      {
        name: '行为主义',
        idea: '智能 = 与环境互动 / 强化学习',
        rep: 'AlphaGo（RL 部分）',
        status: '→ 与连接主义融合（深度强化学习）'
      }
    ]
  },

  // FoundationDemo
  foundation: {
    label: '符号主义的核心思路 ── 把知识写成规则',
    lines: [
      {
        parts: [
          { kw: 'IF' },
          { text: '  体温 > 38.5°C  ' },
          { kw: 'AND' },
          { text: '  白细胞计数 > 11000' }
        ]
      },
      {
        indent: true,
        parts: [{ kw: 'THEN' }, { text: '  诊断 = ' }, { str: '"细菌感染"' }]
      },
      {
        parts: [
          { kw: 'IF' },
          { text: '  诊断 = ' },
          { str: '"细菌感染"' },
          { text: '  ' },
          { kw: 'AND' },
          { text: '  对青霉素不过敏' }
        ]
      },
      {
        indent: true,
        parts: [
          { kw: 'THEN' },
          { text: '  治疗方案 = ' },
          { str: '"青霉素 400mg / 每日两次"' }
        ]
      }
    ],
    comment: '// 早期医疗专家系统（MYCIN，1977）就是由 450+ 条这样的规则组成的',
    caption: '人类专家把经验翻译成一条条 IF-THEN 规则，机器逐条匹配执行'
  },

  // PerceptronDemo
  perceptron: {
    features: ['特征 x₁', '特征 x₂'],
    biasLabel: '偏置',
    activated: '激活',
    silent: '静默',
    caption:
      '① 输入特征\u2003② 乘以权重（重要性）\u2003③ 求和 + 偏置\u2003④ 超过阈值就激活输出 1，否则输出 0'
  },

  // BackpropagationDemo
  backprop: {
    steps: [
      { icon: '➡️', name: '前向传播', desc: '数据流过网络，得出预测' },
      { icon: '📐', name: '计算误差', desc: '预测值 vs 正确答案，算 Loss' },
      { icon: '⬅️', name: '反向传播', desc: '逐层追溯每个权重的"责任"' },
      { icon: '⚙️', name: '更新权重', desc: '按责任微调，减少下次误差' }
    ],
    lossLabel: 'Loss（误差）随训练轮次下降：',
    axisHigh: '高',
    axisLow: '低',
    axisEpochs: '训练轮次 (Epochs)'
  },

  // NeuralNetworkVisualizationDemo
  neuralNet: {
    layers: [
      { name: '输入层', desc: '原始像素 / 数值信号' },
      {
        name: '隐藏层（可叠加多层）',
        desc: '底层识别边缘 → 中层识别形状 → 高层识别语义概念'
      },
      { name: '输出层', desc: '最终分类或预测结果' }
    ]
  },

  // AttentionMechanismDemo
  attention: {
    colLabel: '处理「{word}」时的注意力分配：',
    sentence: ['小明', '把', '苹果', '给了', '他', '的', '母亲'],
    focusIdx: 4,
    weights: [0.65, 0.05, 0.1, 0.1, 0.05, 0.03, 0.02],
    caption:
      '「他」虽在句中间，模型却把 65% 注意力精准投向句首的「小明」，跨越距离识别代词指代'
  },

  // GPTEvolutionDemo
  gptEvolution: [
    {
      name: 'GPT-1',
      year: '2018',
      params: '1.17 亿',
      barWidth: '2%',
      key: '预训练+微调范式确立'
    },
    {
      name: 'GPT-2',
      year: '2019',
      params: '15 亿',
      barWidth: '6%',
      key: 'Zero-shot 零样本泛化'
    },
    {
      name: 'GPT-3',
      year: '2020',
      params: '1750 亿',
      barWidth: '45%',
      key: '⚡ 涌现！上下文学习'
    },
    {
      name: 'GPT-4',
      year: '2023',
      params: '~1.8 万亿',
      barWidth: '100%',
      key: '多模态 + 复杂推理'
    }
  ],

  // AIErasComparisonDemo
  erasComparison: {
    header: '🌟 AI 发展阶段与核心范式全景对比',
    driverLabel: '驱动方式',
    mechanismLabel: '核心机制',
    examplesLabel: '典型代表',
    eras: [
      {
        name: '规则系统时代',
        time: '1960s - 1980s',
        driver: '人类硬编码知识',
        mechanism: 'If-Then 逻辑推演',
        examples: ['Dendral', '深蓝 (Deep Blue)']
      },
      {
        name: '传统机器学习',
        time: '1990s - 2000s',
        driver: '人工特征工程 + 统计学',
        mechanism: '寻找数学决策边界',
        examples: ['支持向量机 (SVM)', '随机森林']
      },
      {
        name: '深度学习革命',
        time: '2010s',
        driver: '大数据 + 算力爬升',
        mechanism: '神经网络自动提取特征',
        examples: ['AlexNet (CNN)', 'AlphaGo (RL)']
      },
      {
        name: '大语言模型 (LLM)',
        time: '2018 - 至今',
        driver: '海量无标注数据 + 暴力计算',
        mechanism: '预测下一个词 + 涌现常识',
        examples: ['GPT-4', 'Claude 3']
      },
      {
        name: '智能体 (Agentic AI)',
        time: '现在 - 未来',
        driver: '大模型大脑 + 环境感知',
        mechanism: '自主规划 + 工具调用',
        examples: ['AI 程序员', '具身智能']
      }
    ]
  }
}
