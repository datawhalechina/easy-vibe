---
title: 'A Brief History of AI: From Symbolic Logic to Hundred-Billion-Parameter Large Models'
description: "Over 70 years, AI has experienced three waves and two winters, ultimately converging into today's era of large models."
---

# A Brief History of AI: From Symbolic Logic to Hundred-Billion-Parameter Large Models

Over 70 years, AI has experienced **three waves and two winters** — from the logical deduction of symbolism, to the neural networks of connectionism, to the reinforcement learning of behaviorism — ultimately converging into today's era of large models. Understanding AI's history helps us see the true source of the "intelligence" behind modern large models.

<AiEvolutionDemo />
<DiscriminativeVsGenerativeDemo />

---

## I. Theoretical Foundations & the Birth of Symbolism (1940s–1950s)

Before computers became widespread, pioneers were already asking: "Can machines think like humans?" Research in this period focused on mathematical modeling of brain neurons, exploration of computation theory, and automation of logical reasoning. The 1956 Dartmouth Conference officially declared "Artificial Intelligence" as an independent discipline.

<FoundationDemo />

### 1.1 Core Theories & Milestone Events

- **The First Vision of Neural Networks (1943)**: Neurophysiologist Warren McCulloch and mathematician Walter Pitts proposed the **MP neuron model**. They were the first to abstract the workings of human brain neurons into simple mathematical formulas, proving that "neural networks are computable" — the ancestor of every deep network today.
- **Turing's Ultimate Question (1950)**: Alan Turing, the father of computer science, published a history-changing paper *Computing Machinery and Intelligence*, proposing the famous **Turing Test**. He sidestepped the philosophical debate of "what is intelligence" and offered a pragmatic operational standard: if a machine can fool a human in conversation into thinking it's a person, it possesses intelligence.
- **The Discipline Is Born (1956)**: At the Dartmouth summer workshop, young scholars including John McCarthy and Marvin Minsky gathered together. McCarthy coined the term "Artificial Intelligence" in the proposal — and that year became known as Year Zero of AI.

::: tip Symbolism
In early AI research, **symbolism** held absolute dominance. Since computers of the time ran on logic circuits, scholars naturally assumed: **the essence of intelligence is symbolic manipulation**.
If we encode the world's knowledge into symbols the computer can understand (concepts, rules) and process them with a logic inference engine (IF-THEN rules), the machine can think like a human. This was a **top-down** approach, heavily dependent on human expert knowledge input.
:::

---

## II. The Golden Age of Symbolism & the First AI Wave (1960s–1970s)

In the first decade or so after its birth, AI enjoyed a period of blind optimism. Researchers believed that since machines could already prove mathematical theorems, writing programs to solve any human problem was just around the corner.

### 2.1 The Glory Days of Expert Systems

The crowning achievement of symbolism was the **Expert System**. By feeding top experts' "rules of thumb" into a computer, the system could perform high-level diagnosis or decision-making in specific vertical domains.

| Expert System | Year | Historical Significance |
| --- | --- | --- |
| **Dendral** | 1965 | **The first expert system** — it could infer chemical molecular structures from mass spectrometry data, matching human chemists in performance. |
| **MYCIN** | 1977 | Diagnosed blood infections and recommended antibiotics with 69% accuracy, outperforming many non-specialist doctors of the time. |
| **XCON** | 1980 | The most commercially successful early expert system, helping DEC auto-configure computer systems based on customer needs, saving the company $40 million per year. |

Yet behind the glory of expert systems lay an insurmountable chasm.

### 2.2 The First AI Winter (1974–1980)

Over time, people discovered that "translating human knowledge into rules" was a dead end. Three fatal limitations of symbolism ultimately led to a complete withdrawal of research funding:

**Knowledge Acquisition Bottleneck**: Some knowledge humans can't even articulate (e.g., how to recognize a cat) — known as "Polanyi's Paradox." Expert systems could only hard-code explicitly expressible rules and couldn't learn automatically.

**Combinatorial Explosion & Brittleness**: Real-world situations are too numerous to enumerate; without common sense, the system collapses the moment it encounters anything outside its rule base.

**Insufficient Compute & Funding Cuts**: The hardware of the time simply couldn't support explosive logical inference, and DARPA slashed R&D budgets.

---

## III. Expert Systems & the Second AI Wave (1980s)

By the 1980s, with the spread of microcomputers and specialized LISP machines, expert systems once again attracted commercial attention. The Japanese government even launched the ambitious "Fifth Generation Computer Project," attempting to build machines that could understand natural language — triggering a global panic-driven investment frenzy.

### 3.1 The Boom and Bust of Commercial Applications

In this era, nearly every major multinational was developing its own **expert system** (a program that translates human expert experience into thousands of IF-THEN rules). However, maintaining these systems became excruciating. Once rule bases exceeded tens of thousands of entries, adding one new rule often caused conflicts with ten existing ones. As general-purpose PCs exploded in performance in the late 1980s, expensive and closed proprietary AI machines became utterly uncompetitive.

::: warning The Second AI Winter (1987–1993)
In 1987, the AI hardware market collapsed entirely. The "Fifth Generation Computer Project" was abandoned for being too detached from practical hardware architecture. Companies' investments in expert systems went up in smoke, and AI research plunged into another trough — "artificial intelligence" even became a pejorative term in academia, synonymous with grant fraud.
:::

### 3.2 Connectionism Hibernating in the Dark

Through these two boom-bust cycles, a completely different school of thought had been quietly developing — **Connectionism**, what we now call **neural networks**.

<PerceptronDemo />

Connectionism was proposed as early as 1958 by Frank Rosenblatt in the form of the **Perceptron**. It mimics the brain by adjusting connection weights between neurons to learn. Rather than teaching the machine explicit "rules," you show it massive "examples" and let it generalize on its own. However, in 1969, Minsky's book *Perceptrons* mathematically proved the limitations of single-layer networks (inability to solve even the simple XOR problem). This kept connectionism on the bench throughout symbolism's golden age — until the wheel of history turned to the 1990s.

---

## IV. The Rise of Machine Learning & the Revival of Connectionism (1990s–2000s)

Entering the 1990s, AI underwent an important pragmatic shift. Instead of debating how to achieve "magical human-like intelligence," the focus moved to using **rigorous statistical methods** to solve real-world classification and prediction problems. This was the rise of traditional **Machine Learning (ML)**.

### 4.1 From Rigid Rules to "Finding Mathematical Boundaries"

In 1997, IBM's "Deep Blue" defeated world chess champion Garry Kasparov, winning a spectacular victory for symbolism. But academia immediately recognized this was merely a triumph of "brute-force compute + massive hard-coded rules" — Deep Blue didn't truly understand chess.

Meanwhile, classical ML algorithms like **Support Vector Machines (SVM)**, decision trees, and random forests rose to prominence, dominating the field for over a decade.

If the old expert systems told the computer: "If the email contains 'you won,' then it's spam," then **machine learning's approach was: humans first define key features (feature engineering)** — such as "email length," "special word frequency," "sender credibility" — then feed tens of thousands of labeled emails to the computer. In this multi-dimensional space, the **SVM** acts like a mathematician with a ruler, using kernel functions to draw the "widest, safest mathematical boundary" between normal and spam emails.

Despite SVM's success on many tasks, it had a fatal weakness: **Feature Engineering was entirely dependent on humans.** To recognize a cat in an image, human scientists had to teach the machine to "first extract edges," then "look for triangular ears." The machine couldn't find the cat on its own! This meant model capability was firmly capped by human cognition.

### 4.2 Backpropagation Brings Neural Networks Back to Life

The true foundation of deep learning was laid during this period:

<BackpropagationDemo />

During this hibernation, Geoffrey Hinton and others further clarified the core value of **Backpropagation**: when a multi-layer neural network makes an incorrect prediction, the error can ripple backward layer by layer, telling each hidden neuron: "Here's exactly how much responsibility you bear for this mistake — fix it next time!"

This finally broke the 1960s shackles on neural networks, making networks with hidden layers viable. But with too little data and too weak hardware (not even decent GPUs), neural networks still couldn't fully defeat traditional ML models like SVM. That is, until **three ignition points** converged.

---

## V. The Deep Learning Revolution & Connectionism Takes the Lead (2010s)

In the 2010s, with the maturation of **big data (e.g., the ImageNet project)**, the **explosion of compute (GPUs applied to massively parallel computation)**, and **algorithmic improvements (solving the vanishing gradient problem)**, "deep learning" dramatically opened the curtain on the third AI wave.

**What fundamentally distinguishes deep learning from traditional ML? The hallmark is: automatic feature extraction (representation learning).** Given enough layers (dozens to hundreds), a neural network can ingest raw pixels directly — its lower layers learn to recognize lines, middle layers learn to recognize fur textures, and upper layers directly identify "cat." In this revolution, humans finally relinquished control and let the network discover the most important visual, audio, and textual features on its own.

### 5.1 Comprehensive Breakthroughs in Vision & Competition

In 2012, **AlexNet** (a classic Convolutional Neural Network, CNN), developed by Hinton's team, entered the famous ImageNet image classification competition. While others were still painstakingly extracting hand-crafted visual features, AlexNet delivered a devastating blow — slashing the error rate from 26% to 15.3%, shocking the entire traditional computer vision community. In the years that followed, virtually no paper that didn't use deep learning could be accepted at top conferences.

In the following years, AI technology advanced at breakneck speed:

<NeuralNetworkVisualizationDemo />

| Year | Landmark Achievement | Lasting Impact |
| --- | --- | --- |
| **2014** | **GAN (Generative Adversarial Network)** proposed | Two networks in an adversarial game (one forges, one detects), giving AI the ability to generate stunningly realistic images. |
| **2015** | **ResNet (Residual Network)** introduced | Innovatively added "shortcut" connections, solving the problem of networks becoming untrainable as they grow deeper — enabling hundreds or thousands of layers. |
| **2016** | **AlphaGo** defeats Lee Sedol | The pinnacle of deep learning combined with **reinforcement learning**, shattering the claim that "machines can never beat humans at Go" and making headlines worldwide. |

::: tip Behaviorism & Reinforcement Learning
AlphaGo represents a victory for another school — **Behaviorism**. It holds that intelligence arises from dynamic interaction between an agent and its environment, like training a dog to sit: reward correct behavior, punish mistakes. Through endless self-play in a vast virtual environment, AlphaGo discovered strategies that even top human players had never conceived.
:::

### 5.2 Transformer: The Cradle of Large Models

In 2017, the gears of destiny began to turn. Google published the paper *Attention Is All You Need*, proposing an entirely new deep learning architecture — the **Transformer**.

<AttentionMechanismDemo />

Previously, when processing a sentence (e.g., with RNN models), AI could only read words one by one from left to right, easily forgetting earlier words by the time it reached the end. The Transformer's **Self-Attention mechanism** shattered this limitation: it lets the AI "see the entire sentence at once" and, upon encountering the word "apple," automatically determine from context whether it refers to the fruit or Steve Jobs' company.

It is inherently suited for parallel computation, can consume unlimited data, and can be stacked to enormous scale. At this moment, the foundation for Large Language Models (LLMs) was complete.

---

## VI. The Large Model Era & the Dawn of General Intelligence (2018–Present)

When the Transformer met unlimited compute and massive data, the historical paradigm of AI development was forever changed. Scientists discovered an astonishing phenomenon: the attention-based architecture seemed insatiable. Previous deep learning models hit intelligence ceilings, but the Transformer could perfectly leverage GPUs' massive parallelism — the more data and the deeper the network, the better it performed, seemingly without limit.

### 6.1 The "Pre-train + Fine-tune" Paradigm: From Specialist to Generalist

Originally, building AI meant "one task, one small model": a dedicated translation model for translation, a dedicated chatbot model for chat — like training craftsmen who each know only one trade. But in 2018, with OpenAI's **GPT-1** and Google's **BERT**, a new paradigm emerged: **"scale is all you need."**

First comes **Pre-training**, which constitutes 99% of a large language model's core intelligence. Scientists poured trillions of words from the entire internet — articles, classic literature, computer code, encyclopedic knowledge — into a massive Transformer network. And the training task? Simply **"next-word prediction."**

To predict the next word in human language with extraordinary precision, the model is forced to internalize and compress the operating principles of the entire world within its hundreds of billions of neural parameters! It doesn't just master subject-verb-object grammar and learn that "apple" is a red fruit — it grasps the logic behind "Newton discovered gravity because of a falling apple." Like a child who never deliberately studied a grammar textbook but, through reading millions of books, automatically gained the ability to understand the complex world.

<GPTEvolutionDemo />

From GPT-2 (1.5 billion parameters) to GPT-3 (175 billion parameters), scientists were stunned to discover **Emergent Abilities** — when a model grows large enough, quantitative change triggers terrifying qualitative change. Without any deliberate training, the massive model spontaneously "figured out" logical reasoning, code writing, and in-context learning. No human needed to explicitly teach it through code.

### 6.2 The Generative AI Explosion & ChatGPT's Nuclear Moment

With a pre-trained model brimming with world knowledge, one final step remained to create the perfect personal AI assistant: **Fine-tuning**. The pre-trained model was only accustomed to blindly continuing text — it couldn't understand user "instructions" or conduct proper Q&A interactions.

In November 2022, OpenAI ingeniously introduced **RLHF (Reinforcement Learning from Human Feedback)**. They hired large teams of experts to score and correct the model's responses. It was like taking a brilliant but unfiltered genius and establishing clear communication boundaries and etiquette guidelines, forcibly shaping it into a gentle, organized, and well-mannered conversational assistant. Thus, **ChatGPT** was born.

Overnight, AI was no longer a dry laboratory toy — it became a universal intelligent brain in every ordinary person's hands.

What followed was a magnificent multimodal era:
* **2023: Unlocking multiple senses.** Image generation models like Midjourney and Stable Diffusion reshaped the digital art industry. **GPT-4**, released the same year, combined advanced visual understanding with long-range logical reasoning.
* **2024 onward: Simulating the physical world.** With the release of realistic video generation models like Sora, and real-time end-to-end voice models with full emotional nuance, AI expanded from pure text processing to comprehensive perception of the complete world — including 3D space, light and shadow, and subtle vocal emotions.

---

## VII. The Convergence of AI's Three Schools & Future Outlook

Looking back over these 70 years — from making machines prove mathematical theorems (symbolism), to finding statistical boundaries (classical ML), to winning at Go through trial and error (behaviorism/reinforcement learning), to large models that devour massive data and develop emergent common sense (the ultimate form of connectionism) — the development of artificial intelligence has never stopped.

Today's large models appear to have abandoned the manual coding of rigid "rules" (symbolism's original intent), but in reality, within the implicit parameters of their thousands of layers, they have learned and encapsulated "dark rules" far deeper than human logic. The **Chain of Thought** long-range reasoning in today's large pre-trained models — isn't that the rebirth of the symbolic school's pursuit of logical verification and rigorous step-by-step reasoning, now reincarnated within neural networks?

**Standing at the summit of the large model era and looking ahead, the path toward Artificial General Intelligence (AGI) is advancing along several profoundly broad avenues of exploration:**

1. **Toward a Unified Neural Hub (Native Multimodality):** Future models will no longer be Frankenstein-like assemblies of "text model + voice model." Architectures like GPT-4o use a single super-network to simultaneously ingest, perceive, and understand text, images, video streams, and ultra-low-latency emotionally rich 3D audio waveforms.
2. **Embodied AI:** When a supremely intelligent "brain" is imprisoned in a silicon data center, it cannot verify truth from the physical world. Through integration with Boston Dynamics-style humanoid robots, super AI may grow hands and, through physical trial and error, learn the same objective physical laws we live by.
3. **Agentic AI:** Most LLMs today remain at the stage of "passive text calculators answering one question at a time." In the AI Agent era, large models are granted **the power to act independently**. Give a single natural language instruction (e.g., "Research and plan all flights, hotels for seeing the Northern Lights in Norway next week, and generate a calendar schedule"), and the AI Agent will autonomously decompose it into dozens of sub-tasks, open virtual browsers, call real airline search APIs, perform complex verification and comparison. They are no longer passive echo chambers waiting for keystrokes — they are tireless digital workforces.

In this spiraling technological journey, history is always strikingly similar but never repeats. We are witnessing the most exhilarating cross-section of history — the transition from "force-feeding algorithms with rigid rules" to "letting machines autonomously define the laws of the world."

<AIErasComparisonDemo />
