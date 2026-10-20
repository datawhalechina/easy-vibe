# AI Capability Dictionary
As generative AI technologies become widely adopted across various products and business scenarios, an increasingly practical question confronts each of us: **What AI capabilities are actually available?** And for a specific requirement, **which capability, which type of model, or which product should be chosen to implement it?**

Faced with this confusion, the most intuitive approach might be "cramming at the last minute": **search for cloud service providers' product APIs or corresponding models when a need arises, then look up commercial solutions, compare documentation and demos, and proceed**. When you see an image-related requirement, you think of image generation; when you encounter a text task, you pull in a large model; when it involves voice interaction, you recall ASR and TTS — and then shop around among a sea of APIs and services. However, cobbling together scattered products is fundamentally different from systematically planning, selecting, and combining AI capabilities in enterprise-level scenarios. Relying solely on ad-hoc research and experience-based judgment leads to a series of serious challenges: fragmented capability awareness, arbitrary solution design, and difficulty in reusing capabilities.

To address these pain points, this article is organized around the core idea of an "AI Capability Panorama." In this handbook, our goal is not to pile up jargon, but to help you quickly figure out three things: **"What AI capability can handle this task? Which type of model or product should I roughly choose? What keywords should I use next to find APIs, projects, or services to try out?"** Through a systematic review spanning modalities (text, image, audio, video, 3D, multimodal) and architecture layers (models, retrieval, agents, platform engineering), **we can identify the corresponding AI capabilities, representative models/products, and common real-world business use cases for each typical requirement and scenario**, helping teams build AI systems with lower trial-and-error costs, higher decision-making efficiency, and stronger reusability.

In this handbook, we will systematically introduce the current mainstream AI capability landscape — from single modalities to multimodal fusion, from individual models to the overall framework of platforms and engineering — combined with common product forms and application scenarios, to provide practice-oriented capability selection references.

> Due to **the extensive content**, you may consult the handbook when you encounter scenarios in practice where you're unsure how to select capabilities. It is recommended that you **let AI reference this handbook based on specific application directions and provide suggested model selection recommendations and solution API calling advice.**

If you only want to understand the corresponding categories without reading the detailed content, just read the opening paragraph of each major section, such as 1.1 and 1.2, but you don't need to read 1.1.1 or 1.1.2.

**It is recommended to consult only the relevant parts of this handbook when needed or to browse only the first-level table of contents; if interested, then browse the full text.**

**Future updates will include recommended model API service addresses in each section.**

# What You Will Learn in This Lesson

- AI Capability Panorama: A comprehensive approach to organizing capabilities spanning text, image, audio, video, 3D, multimodal, agents, RAG, security, and platform engineering
- Models and Products Corresponding to Each Capability: Understand the representative models and services behind key capabilities such as Embedding, OCR, ASR, TTS, VLM, RAG, and more
- Capability-to-Scenario Mapping Methods: Master how to transform a "capability checklist" into specific applications such as product content, search and Q&A, intelligent customer service, and automated operations

After completing this handbook, you will establish an introductory-level systematic understanding of mainstream AI capabilities — not only knowing "what capabilities are available on the market and which products are commonly paired with them," but also understanding their positions and interrelationships within the overall architecture. You will know how to quickly identify the required capabilities and make informed selections when facing specific business requirements, laying a solid foundation for building AI capability systems.

## Model Parameters Covered in This Handbook

Before diving into the specific capability map, let's clarify a concept that is frequently mentioned yet somewhat abstract: What exactly counts as a large model? What counts as a small model?

**From an academic perspective**, large models typically refer to general-purpose models with parameter counts in the billions, tens of billions, or even trillions, while small models are specialized models tailored for specific tasks or scenarios with smaller parameter counts (tens of millions to hundreds of millions).

**From a pricing perspective**, if a model's API call is very cheap — for instance, costing a few cents or fractions of a cent per call, or only a few cents per thousand tokens — and there is no particular emphasis on it being a general-purpose large model, then it is typically either a classic small model (e.g., models specifically designed for OCR, ASR, image classification, or content moderation) or a lightweight version of a large model with fewer parameters (compressed or distilled specifically for high concurrency and low cost). If the per-call price is notably higher — say, several dimes or even starting at 1 RMB per call — then it is most likely a large model.

Additionally, if the product copy explicitly emphasizes the use of large language models (LLMs), general-purpose large models, multimodal large models, or mentions completing complex tasks end-to-end from input to output (such as end-to-end conversational bots, end-to-end retrieval Q&A, end-to-end video generation), then it can generally be regarded as a large model.

Conversely, if the promotional focus is on a specific vertical capability — such as bank card recognition, invoice recognition, license plate recognition, ad click-through rate prediction, speech transcription, or content safety moderation — this indicates that the underlying product is more likely one or a group of small models.

Therefore, in the narrative that follows in this article, we can make a pragmatic convention:

- Large models refer more to that category of general-purpose, conversational, programmable models that tend to be slightly more expensive (including their multimodal versions, such as GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, etc.), which can cover most general-purpose text, code, as well as image, audio, and video multimodal tasks;
- Small models refer to those fine-tuned or customized for a specific task, typically cheaper, with more stable and controllable performance, but with a narrower scope of application, requiring you to actively combine and orchestrate them within your system.

It's worth supplementing here with a key industry shift: many of the model capabilities mentioned in this handbook were actually handled by "small models" before 2021 — training dedicated models for specific scenarios and specific data to meet precise needs. **Today, however, the vast majority of general-purpose scenarios and tasks can already be solved by directly calling large models.**

From the perspective of pursuing the ultimate in **precision and cost**, the training and application of small models still hold irreplaceable value; but **for beginners, we can absolutely start by learning how to find and call large model APIs**, then gradually delve into more advanced techniques. You only need to weigh the trade-offs between cost, precision, and latency, then decide where to use general-purpose large models and where to retain or introduce dedicated small models.

> **Getting to know common text and multimodal general-purpose large models through some familiar products:**
>
> - OpenAI series: GPT-4, GPT-4.1, GPT-4o, GPT-5.1, etc.
> - Google series: Gemini 1.5 Pro, Gemini 1.5 Flash, etc.
> - Anthropic series: Claude 3.5 Sonnet, Claude 3.5 Haiku, etc.
> - Domestic models: Tongyi Qianwen (Qwen) series, Wenxin Yiyan (ERNIE Bot) series, GLM/Zhipu Qingyan, Tencent Hunyuan, iFlytek Spark, the large model behind Moonshot AI's Kimi, MiniMax MiniMax-M3.1-Flash / MiniMax-M3 series, etc.
>
> Large models and services more oriented toward vision and video include:
>
> - Image generation: DALL·E, Midjourney, Stable Diffusion, SDXL, Flux, etc.
> - Multimodal visual understanding: GPT-4o, GPT-4.1 with Vision, Gemini 1.5 (image-text multimodal), Claude 3.5 Sonnet Vision, LLaVA, etc.
> - Video generation: Sora, Kling, Runway Gen-2, Pika, Luma, Veo, etc.
>
> Large models in the voice and audio direction include:
>
> - Speech recognition ASR: Whisper series (Whisper, Whisper-large-v3, etc.), Deepgram, end-to-end ASR large models from various cloud vendors (such as iFlytek, Baidu, Volcano Engine, Alibaba, etc.)
> - Voice multimodal and voice conversation: GPT-4o (end-to-end voice conversation), OpenAI Realtime, Gemini 1.5's audio understanding capability, etc.
> - TTS / Audio and music generation: OpenAI TTS, ElevenLabs, Suno, Udio, MusicGen, etc.
>
> Generation and understanding models in the 3D / spatial direction include:
>
> - Text-to-3D and image-to-3D: DreamFusion, Shap-E, GET3D, Zero-1-to-3, TripoSR, etc.
> - NeRF / neural rendering family: Instant-NGP, NeRF series, Gaussian Splatting-related models, etc.

# 1. Text Tasks (Text / NLP / LLM)

Among AI capabilities, text tasks are the most fundamental. Whether we ultimately want to do content moderation, search and recommendation, knowledge Q&A, or writing assistants and code copilots, it all essentially comes down to one question: how to make machines truly understand text.

## 1.1 Foundational Language Modeling and Representation

Let's start from the most fundamental layer: foundational language modeling and representation. Its role is to first familiarize the machine with language in a statistical sense and, on that basis, find a stable vector/matrix representation for words, sentences, and documents, so as to facilitate downstream tasks such as classification, matching, extraction, and generation. No matter what text-related task you want to do in the future, you will more or less need to answer the same question first: how do I represent this passage with a string of numbers?

We can look at this topic from three angles: scenarios, principles, and models:

- **Scenarios**
  - **Retrieval and search related**
    - General search engines: users casually type a sentence and get documents relevant in meaning, rather than just exact keyword matches.
    - On-site search / e-commerce search: users use colloquial descriptions (e.g., "a white shirt suitable for summer commuting") and find products matching the meaning.
    - Document library / knowledge base retrieval: in technical documentation, policy regulations, or enterprise knowledge bases, directly enter a sentence to retrieve relevant entries.
  - **Recommendation and ranking related**
    - Information feed / content recommendation: based on content users have recently viewed or clicked, automatically find other content with similar meaning to continue recommending, rather than relying solely on manual rules or tags.
    - E-commerce / product recommendation: based on product descriptions users have viewed, purchased, or favorited, find products with similar style or use to provide personalized recommendations.
    - User interest modeling: based on titles users have viewed, search terms they've used, etc., summarize several main interest directions to improve recommendation and ranking effectiveness.
  - **Q&A assistant related**
    - FAQ Q&A: users ask the same question in different ways ("How do I get an invoice?" vs "Where do I issue an invoice?"), and the system can jump to the same answer.
    - Knowledge base Q&A / enterprise assistant: users ask questions in natural language, and the system matches by meaning within internal documents to find the most relevant passage to answer.
  - **Text understanding and analysis related**
    - Comment sentiment analysis: roughly classify a large volume of comments and posts by "what they're about / what the sentiment is."
    - Text deduplication / similarity detection: used to discover rewritten articles and pseudo-original content.
    - Document clustering / grouping: group many articles and reports by content similarity into several clusters, facilitating navigation, recommendation, or sampling checks.
  - **Serving as general-purpose features for downstream tasks (downstream tasks refer to using the model's foundational capabilities to implement more specific text processing tasks)**
    - Text classification: downstream models for sentiment classification, intent recognition, spam identification, etc., directly reuse the representations from this layer.
    - Information extraction: entity recognition and relation extraction are fine-tuned on top of word/sentence representations rather than trained from scratch.
    - Text generation: provide semantic representation input for generation tasks such as summarization, rewriting, and continuation, improving generation quality and controllability.
- **Principles**
  Learning representations of words, sentences, and documents as the foundation for subsequent, more complex tasks.
  - Language modeling
    - Autoregressive language models: predict the next token (GPT series, LLaMA, Qwen, etc.)
    - Masked language models (Masked LM): predict masked tokens (BERT, RoBERTa, ERNIE)
  - Word / sentence / paragraph representation
    - Static word vectors: Word2Vec, GloVe, FastText
    - Contextual representations: BERT embedding, Sentence‑BERT, etc.
    - Document-level vectors: used for semantic retrieval and similarity matching
- **Models**
  BERT / RoBERTa / ERNIE, the GPT family, LLaMA / Qwen / Yi and other LLMs; various Embedding models (OpenAI text‑embedding‑3 series, bge, E5, SimCSE, etc.).

### **1.1.1 Language Modeling: Learning Language by "Guessing the Next Word"**

The first step at this layer is to let the model **become familiar with linguistic patterns** through massive amounts of text. The approach can be simply understood as: give the model countless "fill-in-the-blank" exercises — after seeing the context of a passage, have it fill in the most reasonable word (token). With enough practice problems and sufficiently broad corpora, the model gradually learns: what a natural sentence looks like, which words frequently appear together, and what expressions sound awkward. This process is called "language modeling," which is essentially a unified **word-guessing training mechanism**.

There are two common ways of posing the question, each illustrated with a simple one-sentence example:

1. **Continue forward (autoregressive)**: only give the preceding content and have the model guess "what comes next."
2. Input prefix: `It's raining today, so I`
3. Model task: guess the next word, such as "**brought** (an umbrella)," "**didn't** (go out)," "**plan to** (stay home)," etc., and then continue generating further.
   This approach primarily trains the model's grasp of **continuation, coherence, and common expressions**.
4. **Fill in the blank (masked)**: remove a word from the middle and have the model use both preceding and following context to fill in the blank.
5. Original sentence: `It's raining today, so I brought an umbrella`
6. Training sentence: `Today [MASK] raining, so I brought an umbrella`
7. Model task: fill `[MASK]` with a reasonable word like "**is**."
   Here the model must simultaneously look at the left context "Today" and the right context "so I brought an umbrella" to decide what to fill in, which is more conducive to learning **whole-sentence semantics**.

By repeatedly doing these two types of "word-guessing exercises" on massive corpora, the model gradually accumulates **linguistic intuition and statistical common sense**. On this foundation, the next step is to explicitly transform this capability into **vector representations of words, sentences, and documents**, laying the groundwork for subsequent tasks such as retrieval, recommendation, and Q&A.

### 1.1.2 Word, Sentence, and Document Representation: Mapping Discrete Symbols into Semantic Space

The earliest generation of methods for constructing text vectors was **static word vectors**: assigning each word a fixed vector that, once trained, does not change with context — intuitive and simple, but **unable to distinguish the meanings of polysemous words in different contexts.** To solve this problem, context-based dynamic representation methods later emerged: the same word in different sentences generates different vectors, entirely determined by its surrounding context. For example, "apple" in "Apple released a new phone" would lean toward the semantic direction of "tech company," while in "apples are rich in vitamins" it would be closer to the "fruit" concept.

This mechanism not only enhances representational capacity at the word level but also paves the way for vectorizing sentences and documents. For sentences, sentence vectors can be generated; for documents, the entire text can be encoded as input (if length permits), or encoded segment by segment and then aggregated into a global vector through attention mechanisms, hierarchical pooling, contrastive learning, or other methods. In recent years, dedicated embedding models (such as bge, E5, and the text-embedding series) have been continuously optimized around the goal of "making semantically similar texts closer in vector space," performing particularly well on tasks such as semantic retrieval and similarity matching.

This pipeline from contextual modeling to sentence/document vector generation has become the core infrastructure behind systems for search, recommendation, Q&A, and more, bringing us back to the various scenarios mentioned earlier:

- Retrieval and search scenarios (general search, e-commerce search, knowledge base retrieval) all require encoding both user input and candidate documents into vectors, then performing similarity matching in vector space to find the semantically closest results, rather than relying solely on exact keyword matching.
- Recommendation and ranking scenarios (information feed recommendation, product recommendation, user interest modeling) require converting the content corresponding to user historical behavior into vectors, then finding new content with similar vectors to recommend to the user, achieving the personalized effect of "viewed A, recommended B."
- Q&A assistant scenarios (FAQ Q&A, knowledge base Q&A) require encoding both user questions and the questions or passages in the knowledge base into vectors, then finding the best-matching answer through vector similarity.
- Text understanding and analysis scenarios (comment sentiment, deduplication, clustering) require first converting each piece of text into a vector, then performing clustering, similarity calculation, or classification based on the vectors.
- Downstream task scenarios (text classification, information extraction, text generation) directly use the vector representations from this layer as input features, feeding them to subsequent classifiers, extractors, or generators, avoiding the need to learn semantics from scratch.

In engineering terms, the common practice is to encapsulate this into a unified "text vector service": input any piece of text, output a fixed-dimension vector, shared across multiple systems such as search, recommendation, and Q&A. At the product level, the capabilities of this layer are mainly reflected in: semantic recall in search and recommendation (no longer relying solely on keywords, but recalling content that is "worded differently but similar in meaning" through vector similarity), as well as unified embedding/vector retrieval services for enterprise knowledge bases, FAQs, and case libraries.

## 1.2 Text Classification and Text Matching (Classification & Matching)

In the previous section, we found the "coordinates" of each piece of text in semantic space through foundational language modeling and representation. But coordinates alone are not enough — the questions that businesses truly care about are often: What category does this text belong to? Is it about the same thing as another piece of text? Do two sentences logically support or contradict each other? You can think of it this way: use the two capabilities of classification and matching to transform the underlying vector representations into labels and relevance signals that can directly drive business decisions. We'll again examine this layer from three angles: scenarios, principles, and models:

- **Scenarios**
  - Content understanding and moderation: tag comments, posts, and articles with labels for topic, sentiment, risk, etc., for use in moderation, recommendation, and statistical analysis.
  - Recommendation and ranking: decide what content to display and how high to rank it based on the degree of match between "user interest tags" and "content tags."
  - Search and FAQ: users casually enter a natural language question, and the system can automatically find the most relevant question-answer pair or document fragment.
  - Similar content identification: find "semantically similar" entries among large volumes of text for deduplication, merged statistics, and recommending "related content."
  - Logical relationship judgment: determine whether two sentences support each other, contradict each other, or are unrelated, for use in fact-checking, multi-turn conversation consistency checks, etc.
- **Principles**
  On top of semantic representations, make holistic judgments about an entire piece of text or text pairs:
  - Text classification: assign labels to individual pieces of text (such as sentiment, topic, risk type, etc.);
  - Text matching: determine the similarity or relevance between two pieces of text, or whether a "question–answer" pair matches;
- **Models**
  Based on pre-trained encoders, with simple classification / matching structures attached:
  - Single text classification: BERT / RoBERTa / DeBERTa + fully connected classification layer;
  - Text matching: Sentence‑BERT, SimCSE, two-tower (Bi‑Encoder), Cross‑Encoder;
  - Complex judgment: instruction fine-tune on LLMs to have the model directly output labels or logical relationships.

### 1.2.1 Text Classification: From "Understanding Content" to "Characterizing Content"

Leveraging the semantic representations from the previous layer, we can very naturally attach a simple classification head on top and, with a small amount of labeled data, have the model learn to answer one question: **"What category does this text belong to?"**

The most classic example is **sentiment classification**. A user's review might be praise, a complaint, or simply a statement of fact. After obtaining the vector representation of the sentence, the model only needs to attach a softmax classification layer to output the probabilities of "positive / negative / neutral." This capability is already very mature in scenarios such as e-commerce, social platforms, and app marketplaces.

Another major category is **topic / industry classification**. In news recommendation, we want to know whether an article is about sports, finance, or entertainment; in an enterprise's internal customer service / ticketing system, the concern is more about whether it's a product inquiry, a functional anomaly, or a complaint/suggestion. These labels can help route content more precisely to the appropriate workflow and can also serve as important features in the recommendation and ranking stage.

Going further, **risk / compliance classification** is directly tied to platform safety. We set up dedicated classification models for categories such as ad trafficking, abusive attacks, politically sensitive content, and vulgar/pornographic material, working in conjunction with human review to intercept or downgrade high-risk content. It can be said that the first gate of the vast majority of content safety strategies is built from these types of classifiers.

As we can see, by this layer we are already able to transform "abstract semantic representations" into several business-usable labels. Next, we will discuss: when relationships arise between pieces of text, how do we perform **matching and inference**.

### 1.2.2 Text Matching: "Finding the Most Suitable Match" for a Sentence

Unlike classification, which "characterizes individual pieces of text," **text matching** focuses on "the relevance between two pieces of text." In many products, this is often the key link in achieving "intelligence": whether the system can find the most suitable response in the knowledge base when a user says something depends entirely on matching quality.

The most fundamental aspect is **semantic similarity calculation**. We first use the embedding model from the previous layer to encode two sentences into vectors, then determine their distance in semantic space through cosine similarity, dot product, or other methods. Models like SimCSE and Sentence‑BERT are specifically designed, through contrastive learning, to pull "similar sentence pairs" closer and push "dissimilar sentence pairs" farther apart.

Building on this, **paraphrase detection** and **plagiarism detection** are simply matching tasks for specific application scenarios. The former is used for content deduplication, preventing platforms from being flooded with repetitive expressions; the latter is used in scenarios such as education and knowledge communities to identify highly similar answers or articles. Technically, both essentially involve binary classification or ranking based on text similarity.

A very important downstream application is **Q&A matching**. When a user poses a natural language question, we don't directly use keywords to match FAQs; instead, we first perform recall through semantic vectors, then use a finer-grained matching model (such as a Cross‑Encoder) to re-rank several candidates and select the most likely corresponding one. This pipeline forms the foundation of FAQ bots and document Q&A systems.

At this layer, we already have the ability to classify and judge relationships for "entire pieces of text." But in many scenarios, businesses are not satisfied with this alone — they further want to know: **what specific entities are mentioned in this text, and what events occurred.** This naturally leads to the topic of the next section — **sequence labeling and information extraction**.

## 1.3 Sequence Labeling and Information Extraction (Sequence Labeling & Information Extraction)

After completing the classification and matching of entire texts, we often encounter a more granular requirement: not only knowing "what this article is about and how risky it is," but also knowing "who it specifically mentions, where, when, and what the amount is." This section is a key step beyond holistic judgment toward "fine-grained structuring." You can think of it as: on the premise of already knowing "which category of text to look at and roughly what it's about," we mine entities, relations, events, and various fields from within the text, enabling unstructured text to be directly consumed by business systems. We'll again look at this layer from four aspects: scenarios, principles, models, and products:

- **Scenarios**
  - Industry text structuring: extract key fields such as person names, organizations, amounts, dates, and clauses from documents like contracts, reports, announcements, medical records, and policies, for storage and retrieval.
  - Knowledge graphs and relationship networks: identify entities and their relationships from news, papers, and Q&A, building graphs of "who has what relationship with whom" for search, recommendation, and analysis.
  - Invoice and document processing: automatically extract fields such as title, tax ID, amount, and date from invoices, reconciliation statements, and expense reports, reducing manual data entry.
  - Public opinion and event analysis: extract "who did what, when, and where" from massive volumes of text for event tracking, risk alerts, and statistical reporting.
  - Log and ticket structuring: extract key information from unstructured text such as customer service conversations, tickets, and system logs, facilitating statistics, monitoring, and automated processing.
- **Principles**
  Perform fine-grained labeling and structuring of text at the token / phrase level:
  - Sequence labeling: tag each token (e.g., person name, location, organization, product name, etc.) to achieve named entity recognition, part-of-speech tagging, phrase segmentation, etc.;
  - Relation and event extraction: on top of entities, identify relationships between "entity–entity" pairs and the event structure of "who did what, when, and where";
  - Business field extraction: around specific business schemas (e.g., contract fields, invoice fields), convert long documents into standardized key‑value pairs or record tables.
- **Models**
  Based on pre-trained representations, perform information extraction through structures such as sequence labeling or span extraction:
  - Sequence labeling models: BiLSTM‑CRF, BERT + CRF / Softmax, etc.;
  - Span‑based extraction: directly predict the start and end positions of entity / relation spans;
  - Document-level extraction: DocIE-type models that incorporate layout and formatting;
  - LLM-based extraction: through Prompt / Few‑shot, have large models extract required fields in a specified format.

### 1.3.1 Sequence Labeling: Attaching Semantic "Tags" to Each Token and Phrase

In the text classification stage, we only cared about what category an entire piece of text belongs to; in the sequence labeling stage, we need to label every token and every phrase in the text. The most typical task is Named Entity Recognition (NER): identifying specific types of entities such as person names, organization names, location names, product names, and disease names.

- For example, in the sentence "Zhang San joined a certain tech company in Beijing," label "Zhang San" as a person name, "Beijing" as a location, and "a certain tech company" as an organization.

In terms of modeling approaches, the traditional method uses sequence labeling structures like BiLSTM + CRF, while later approaches more commonly adopt BERT + CRF or BERT + Softmax, leveraging the contextual representation capability of pre-trained encoders to determine each token's label (e.g., B‑ORG, I‑ORG, O, etc.). In practice, NER models are often the first "preprocessing" step for subsequent knowledge graphs and relation extraction.

Beyond NER, part-of-speech tagging and phrase segmentation are also typical sequence labeling tasks. They serve more for underlying linguistic analysis, providing basic structures for subsequent, more complex syntactic / semantic tasks.

- For example, for "quickly improve model performance," tag "quickly" as an adverb, "improve" as a verb, and "performance" as a noun, for downstream analysis.

### 1.3.2 Relation and Event Extraction: Connecting "Points" into "Lines" and "Stories"

Once we have identified entities in the text through sequence labeling, a natural next question is: what exactly are the relationships between these entities, and what kind of events do they collectively constitute?

Relation extraction focuses on "entity pairs + relation types." For example, in the sentence "Zhang San joined a certain tech company as CTO in 2024," we need to not only identify the two entities "Zhang San" and "a certain tech company" but also extract the "employed at" relationship between them.

- Simply put, it means attaching a relation label like "employment" to the entity pair "Zhang San – a certain tech company."

Building on relations, event extraction attempts to reconstruct "who did what, when, and where." Taking a news article as an example, a standard event template might include multiple slots: event type (acquisition, partnership, accident), time, location, participants, amount, consequences, etc. Event extraction models need to automatically fill these slots from lengthy text, thereby constructing an "event table" that can be retrieved, statistically analyzed, and reasoned about.

- For example, from "Company A acquired another company for 500 million RMB," extract: event type = acquisition, amount = 500 million RMB, participants = two companies.

In terms of modeling methods, beyond traditional sequence-labeling-style extraction, we also use Span‑based IE (directly predicting the start and end positions of entity / relation spans) as well as the more recently emerged Prompt‑based IE and LLM-based Few‑shot extraction. The advantage of the latter is that new schemas can be quickly adapted through natural language prompts, significantly reducing the cost of extensive re-labeling and retraining.

From an engineering perspective, a mature extraction system typically forms a pipeline:

- Upstream: NER / sequence labeling identifies entities;
- Middle layer: models relations and event structures;
- Downstream: writes results into databases or knowledge graphs for consumption by search, analysis, and risk control systems.

## 1.4 Text Generation and Editing (Text Generation & Editing)

In the preceding sections, we sequentially built the understanding pipeline of "representation → classification and matching → sequence labeling and extraction": the model can not only map text into semantic space but also make judgments about entire pieces of text and extract structured information from them. What this section aims to do is "reverse" that understanding pipeline: on the basis of sufficient understanding, have the model proactively produce, rewrite, compress, and polish text. You can think of it as: performing "reverse encoding" in semantic space, turning internal representations back into high-quality natural language output — the layer closest to user perception in the entire text modality capability chain. We'll again break it down from four dimensions: scenarios, principles, models, and products:

- **Scenarios**
  - Daily writing and office work: generate emails, notifications, draft proposals, or expand, rewrite, and polish existing text.
  - Knowledge management and summarization: automatically summarize long documents, reports, and meeting minutes to help quickly grasp key points.
  - Customer service and Q&A: automatically generate clearly structured, consistently toned responses based on user questions and retrieved materials.
  - Marketing and creative content: generate ad copy, social media posts, event descriptions, scripts, etc.
  - Multilingual scenarios: complete translation and localization rewriting while preserving original meaning, adapting to different languages and contexts.
- **Principles**
  On the foundation of language modeling, perform "creation from scratch" and "modification based on existing content" on text:
  - Free generation: generate a complete piece of text from scratch based on intent, prompts, or outlines;
  - Controlled rewriting: adjust style, length, and structure while keeping core information unchanged (e.g., summarization, expansion, style transfer);
  - Error correction and polishing: correct typos and grammar issues, optimize expression order and logical structure.
- **Models**
  Primarily large-scale pre-trained + instruction fine-tuned generative models:
  - Instruction fine-tuned LLMs: GPT series, LLaMA / Qwen / GLM, etc., for general-purpose generation and editing;
  - Seq2Seq models: T5, BART, mT5, etc., for tasks such as summarization, translation, and format conversion;
  - Alignment and safety: through methods like RLHF / RLAIF, make generated content more compliant with instructions and safety requirements.

Since this section is essentially equivalent to prompt engineering, it will not be elaborated further here; you can refer to the prompt engineering tutorial section on your own.
# 2. Image Modality (Image / Vision)

In AI capabilities, the image modality is responsible for "understanding the world through vision." Whether the goal is security surveillance, autonomous driving, short video effects, e-commerce intelligent retouching, multimodal Q&A, or AI painting, it all essentially follows one path: starting from raw pixels and progressively obtaining structured understanding and controllable generation of images.

## 2.1 Low-Level Vision

In the previous section, we introduced the role of the vision modality in multimodal systems and how it interfaces with language and speech. But before diving into "high-level semantic tasks" like object detection, image understanding, and visual question answering, there is a foundational capability layer that is often overlooked yet critically important — low-level vision. You can think of it this way: before "understanding what is in the image," the system needs to first address two questions: "how good is the quality of this image itself" and "what stable local structures can be reused by upper layers." Through a layer of universal restoration, enhancement, and structure extraction, raw pixels are transformed into cleaner, more stable image representations.

From an engineering perspective, low-level vision directly affects both the "image quality experience" perceived by users and the health of input distributions for downstream tasks like detection, recognition, and segmentation. If this layer is not done well, all subsequent models have to struggle in environments with "heavy noise, severe distortion, and extreme lighting." Conversely, if images are repaired as much as possible and structural information is well extracted at this layer, high-level tasks can perform on a much friendlier foundation. Below, we organize this layer from three angles: scenarios, principles, and models.

- **Scenarios**
  - Cameras and capture devices: automatic denoising, HDR, night mode, stabilization on phones/cameras; multi-frame fusion to enhance detail and dynamic range.
  - Content platforms and short videos: one-click quality enhancement for uploaded images/videos — removing compression artifacts, improving sharpness and contrast, and enhancing subjective visual perception.
  - Old photo and document restoration: denoising, colorization, and super-resolution of old photos; automatically straightening and enhancing crooked or dark receipts, contracts, and book pages to facilitate OCR.
  - Surveillance and security: denoising, dehazing, rain removal, and resolution enhancement of low-light surveillance footage, laying the groundwork for subsequent face/license plate recognition.
  - AR/VR and 3D reconstruction: providing stable corners, edges, and local descriptors for SLAM, panorama stitching, and 3D reconstruction, ensuring robustness in tracking and registration.
- **Principles**
  Centered on two core objectives — "image quality" and "local structure" — physical and statistical modeling is applied to pixel-level information:
  - Image restoration and enhancement: assuming the observed image is a degraded version of the ideal image (through noise, blur kernels, compression, and imaging nonlinearities), perform denoising, deblurring, compression artifact removal, low-light enhancement, and super-resolution reconstruction, making the output closer to real scene imaging while aligning with human visual perception habits.
  - Structural feature extraction: without introducing specific semantic labels, extract features such as edges, corners, local textures, and salient regions from pixel gradients and texture statistics, providing a "geometric skeleton" for subsequent detection, registration, tracking, and segmentation.
  - Geometric and illumination preprocessing: based on camera models and simple geometric cues (straight lines, vanishing points, symmetry, etc.), estimate distortion and perspective relationships; through operations like undistortion, straightening, contrast and illumination normalization, align the raw image into a more standardized and stable input space.
- **Models**
  A combination of classical image processing methods and deep learning models, balancing efficiency and effectiveness:
  - Traditional image processing: bilateral filtering, non-local means, guided filtering, Retinex, histogram equalization, Canny/LoG edge detection, Harris/FAST corners, SIFT/SURF/ORB descriptors, Hough transform, camera calibration and geometric correction, etc.
  - Deep restoration and enhancement models: CNN-based or Vision Transformer-based denoising, deblurring, super-resolution, deraining/dehazing/compression artifact removal models (e.g., EDSR, RCAN, SwinIR, ESRGAN), as well as multi-frame/video enhancement networks that learn the mapping from degraded images to high-quality images in an end-to-end manner, or use modern image editing models such as Jimeng and Qwen editing models.

### 2.1.1 Image Restoration and Enhancement: From "Visible" to "Clearly Visible"

In low-level vision, image restoration and enhancement first confront various types of degradation: noise, blur, compression artifacts, low light, insufficient dynamic range, etc. Raw images in many real-world scenarios are not "clean": night scenes and indoor low light fill the frame with grain and color noise; snapshots and surveillance footage often appear blurry due to motion or poor focus; video compression introduces blocky artifacts. The goal of restoration and enhancement is to restore clear details and natural visual perception as much as possible without altering the semantic content of the image — turning "blurry, dark, dirty" inputs into "clear, bright, comfortable" ones.

Typical tasks include denoising, deblurring, low-light enhancement, and super-resolution. Denoising and deblurring require a trade-off between local texture and global structure: suppressing high-frequency noise and deconvolving blur kernels without also smoothing away real details. Low-light enhancement must boost brightness and contrast while avoiding amplifying dark-area noise, correcting color casts, and controlling overexposed regions. Super-resolution focuses on adding reasonable high-frequency information during upscaling, so the enlarged image neither looks "blurry and plasticky" nor excessively "fabricates" details. Modern approaches mostly use deep networks (CNN or Vision Transformer), learning the mapping from observed image y to ideal image x on large-scale "degraded–clean" paired data, with composite objectives including pixel error, perceptual loss, and adversarial loss to strike a balance between "good metrics" and "pleasing to the human eye."

These capabilities often manifest implicitly in products: the night mode and HDR capture on phone cameras, one-click quality enhancement on short video platforms, old photo restoration tools, and cloud-based enhancement services for surveillance systems all fundamentally rely on this layer's restoration and enhancement modules. For businesses, they directly affect users' subjective perception of "image quality" and indirectly determine the input quality for downstream detection, recognition, and segmentation algorithms. One could say that the more complex the upper-level vision tasks, the more they depend on a high-quality, distributionally stable "image foundation" at the bottom layer.

### 2.1.2 Structural Features and Preprocessing: Building the "Scaffolding" for High-Level Understanding

Once image quality has been restored to a usable level, the second key task of low-level vision is to extract features from pixels that are temporarily unrelated to specific semantics but are very important for geometric structure and visual perception, and to unify geometry and illumination. This step won't directly tell you "this is a car" or "this is someone's face," but it will answer questions like "where are the clear contours and corners," "which regions have significant texture structure," and "is the image distorted or tilted," providing reliable structural input for upper-level models.

In terms of feature extraction, edges and corners are the most fundamental elements. Using operators like Canny and Sobel, the system can mark the "edges" where grayscale or color changes most sharply across the entire image — these often correspond to object contours, component boundaries, and texture directions. Corner detection (e.g., Harris, FAST) finds "corners" where local gradients change significantly in multiple directions, typically appearing at object corners and line intersections. Further, local descriptors like SIFT, SURF, and ORB encode the texture pattern of a small region around these keypoints, enabling the same physical point to be matched across different viewpoints, scales, and certain illumination changes. This provides foundational support for image registration, panorama stitching, SLAM, AR tracking, and 3D reconstruction.

In parallel with feature extraction are various geometric and illumination preprocessing operations. Barrel/pincushion distortion from wide-angle lenses, and skew and perspective stretching when photographing documents, are identified through low-level geometric cues like line detection and vanishing point estimation, and are "pulled back to normal" through undistortion, straightening, and perspective correction. Global or adaptive histogram equalization, contrast stretching, and illumination normalization enhance local contrast and reduce the impact of uneven lighting and shadows while preserving details. Color space transformations (RGB → HSV/Lab) and color histogram statistics provide directly usable input for simple color-based segmentation, saliency region detection, and color cast correction.

After end-to-end deep learning became mainstream, some of these structural features and preprocessing steps have been "internalized" into the convolutional kernels and normalization strategies of the first few network layers, no longer appearing as explicit operators in system architecture diagrams. But functionally, they still play the same role: first using a relatively universal, class-agnostic low-level processing layer to organize raw pixels into representations that are more stable in terms of geometric shape, lighting conditions, and local structure, then handing them off to upper-level classification, detection, segmentation, and multimodal modules to complete the task of "understanding what this is." Without this layer of "scaffolding," upper-level models would have to struggle on raw images with heavy noise, severe distortion, and blurred structures, and the overall system's robustness and generalization ability would significantly degrade.

## 2.2 Image Classification & Recognition

In most image tasks, the questions businesses truly care about are: **What category does this entire image belong to? Who is the person in this image? Is this pedestrian the same person across different cameras?** You can think of this layer as: on a unified, clean input space, assigning "category labels" or "identity labels" to entire images or entire persons/objects, converting visual signals into the most directly usable recognition results.

From a product perspective, image classification and recognition were among the first vision capabilities to be deployed at scale and serve as the "entry module" for many upper-level applications. E-commerce and content platforms use it to automatically tag images and identify main product categories; security and access control systems use it to confirm "is this the same person"; person re-identification systems sift through feeds from multiple cameras to find the cross-scene trajectory of the same target. Below, we organize this layer from three angles: scenarios, principles, and models.

- **Scenarios**
  - General image understanding: automatically tagging user-uploaded images with theme labels like "landscape / food / pet / document" for retrieval, recommendation, and content moderation.
  - Face recognition and access control: in face-based access control and attendance systems, identifying individuals from face images to enable "face-scan entry" and "face-scan clock-in."
  - Pedestrian/person re-identification: determining whether the same pedestrian or person appears in different camera feeds, used for security retrieval and trajectory analysis.
  - Human attribute recognition: without directly confirming identity, recognizing attributes such as gender, age group, whether wearing a hat/backpack/uniform, etc., providing clues for retrieval and behavior analysis.
- **Principles**
  Discriminative modeling of entire images or entire persons/objects in a unified visual feature space:
  - Image classification: taking the entire image as input, extracting global features through convolutional networks or Vision Transformers, and attaching a classification head on top of the features to output single-label or multi-label category probabilities, answering "what type of image is this."
  - Identity/instance recognition: transforming the "who is this" question into a metric learning problem in feature space — learning an embedding space where features of the same identity are close to each other and features of different identities are far apart, then using nearest neighbor search or clustering to complete recognition and retrieval.
  - Attribute recognition: on top of shared pedestrian/human features, adding multi-task output heads to predict attribute labels such as gender, age group, clothing color, whether carrying items, etc., so that the same features can serve multiple downstream retrieval and analysis needs.
- **Models**
  Deep convolutional networks and Vision Transformers serve as the backbone, combined with classification heads or metric learning heads to implement different types of recognition tasks:
  - Image classification backbones: ResNet, DenseNet, EfficientNet, ConvNeXt, Vision Transformer (ViT), Swin Transformer, etc., typically pre-trained on large-scale datasets like ImageNet and then fine-tuned on specific business data.
  - General classification structures: Backbone + fully connected classification layer (Softmax / Sigmoid) for single-label or multi-label image classification tasks; class re-weighting and focal loss can be used to handle long-tail distributions.
  - Identity/instance recognition: on top of backbone feature outputs, using angular-margin loss functions like ArcFace, CosFace, SphereFace to explicitly widen inter-class margins between different identities, improving separability in feature space, and completing large-scale gallery matching via vector retrieval (ANN).
  - Pedestrian/attribute recognition structures: for person Re-ID and human attribute recognition, a common approach is to use a shared backbone to extract pedestrian features, then branch out "identity branch" and "attribute branch" at the top, optimizing both cross-camera identity discrimination and multi-attribute prediction.

Corresponding to specific product forms, the capabilities of this layer are often delivered as "image content recognition / classification APIs," "face recognition SDK / SaaS," "person re-identification platforms," etc. They often directly drive business decisions (e.g., access control clearance, content tag writing) and also serve as upstream, providing structured labels and stable identity representations for subsequent retrieval, recommendation, behavior analysis, and multimodal understanding. Below, we expand on two directions: image classification and identity/attribute recognition.

### 2.2.1 Image Classification: Answering "What Kind of Image Overview of This"

In the most basic image classification task, the system faces an entire image and the goal is to assign it one or several semantic category labels. The most common form is single-label classification — for example, in datasets like ImageNet, each image is labeled with one primary category such as "dog," "cat," "car," "airplane." In business scenarios, this capability is widely used to tag user-uploaded images with theme labels like "landscape / food / pet / portrait / document" to support retrieval, recommendation, and content moderation. Similar to text classification, the model attaches a fully connected + Softmax layer on top of global visual features extracted by a pre-trained backbone, outputting a probability distribution over all candidate categories.

In many real-world applications, an image often belongs to multiple categories simultaneously. For example, a "seaside sunset selfie" image could be "landscape," "portrait," and also tagged as "travel" or "seaside." This calls for multi-label classification: the model still starts from whole-image features, but the output layer is no longer a mutually exclusive Softmax — instead, it predicts the presence/absence probability (Sigmoid) for each label independently, trained with a multi-label loss function. To handle the large number of "long-tail categories" (rare labels with very few samples) in real-world data, multi-label classification models often incorporate class re-weighting, hard example mining, or label structure modeling to improve recall for niche categories.

At the human-machine interface level, image classification is typically provided as an "image content recognition API." Upstream businesses only need to upload an image to receive a set of category labels and their confidence scores for subsequent decision-making: for example, an ad delivery system can restrict certain sensitive categories based on image content; an e-commerce platform can use image classification to assist with product category correction; a content platform can use it to enrich recommendation features and moderation signals. Although technically relatively mature, this capability remains the cornerstone for more complex downstream capabilities like object detection, instance segmentation, and visual question answering.

### 2.2.2 Image Recognition and Attribute Recognition: Answering "Who Overview of This / What Instance Is This"

Unlike "what type of image is this," image recognition is more concerned with "who is the person/object in this image" — that is, identity-level, instance-level differentiation. Typical representatives are face recognition and person re-identification: the former determines "which identity in the gallery is closest to the current face" in scenarios like access control, attendance, and payment; the latter searches across multiple camera feeds and time periods to find whether the same pedestrian appears, assisting with case review and trajectory analysis. The core of these tasks is no longer simple multi-class classification, but rather learning an embedding in feature space that is "compact within classes and separated between classes," so that images of the same identity captured under different poses, lighting, and cameras can still be clustered together.

In model design, face recognition and person re-identification typically adopt a similar paradigm: first use backbones like ResNet, ConvNeXt, ViT, Swin to extract face/person-centered features, then apply loss functions specifically designed for metric learning, such as ArcFace, CosFace, etc. Unlike ordinary classification losses, these losses directly constrain inter-class boundaries in angular space or feature space, explicitly widening the margin between features of different identities, so that the trained features can be used for large-scale vector retrieval without being limited to the fixed classes seen during training. During online serving, the system pre-computes and indexes features for each identity in the gallery, then performs approximate nearest neighbor search on the query face/person features to find the most similar candidates, making final decisions based on business thresholds and multimodal information.

Complementing "direct identity recognition" is **attribute recognition**, which does not point to a specific person. In many security and retail scenarios, the system only needs to know attributes like "male or female," "approximate age group," "whether wearing a hat/mask," "clothing color and style," "whether carrying a backpack/luggage," etc., for quick target filtering — without, and often without being appropriate to, directly outputting personal identity. These tasks typically attach multiple parallel attribute heads on top of shared pedestrian/human features (a "head" here means the position where probabilities are output; multiple probability output positions can be used to determine categories), with each head responsible for predicting one or a group of attribute labels, forming a multi-task learning framework. On one hand, multi-task training can make features richer and better generalized; on the other hand, attributes themselves can serve as auxiliary conditions for Re-ID or retrieval, improving system usability in complex scenarios.

In product form, these capabilities are typically packaged as "face recognition SDK / cloud service," "person re-identification platform," "human attribute recognition API," etc., and integrated into access control gates, attendance machines, security platforms, and video structuring systems. Compared to general image classification, they have higher requirements for data security and privacy protection, and are more sensitive to the trade-off between false recognition rate and recall rate. Therefore, beyond algorithms, they are supplemented with mechanisms such as quality detection (e.g., whether it is a real person, whether occluded/recaptured), liveness detection, and multimodal cross-verification, forming a more complete and responsible identity recognition solution.

## 2.3 Object Detection

In the previous image classification and recognition sections, we only assigned an overall label to "the entire image" or "the entire person," ignoring where and at what size the object appears in the image. However, a more common question in real business is: **What objects are in this image? Where is each one located?** For example, in a street scene image, we want to simultaneously mark all pedestrians, vehicles, and traffic signs; on an industrial production line, we need to mark all defect areas and part positions in the same frame. Object detection is designed for these needs: in a single image or video frame, it simultaneously predicts the **position (bounding box) and category** of every object, serving as the foundational capability for many downstream vision tasks (tracking, segmentation, behavior analysis, multi-object counting, etc.).

From an engineering usage perspective, object detection is the "first step of structuring" for many vision systems — decomposing a raw image into several labeled rectangular boxes, each of which can be further sent to other modules for recognition, tracking, attribute analysis, and even semantic generation. Pedestrian/vehicle detection in surveillance cameras, product detection on unmanned retail shelves, defect/foreign object detection in industrial quality inspection, and the "object detection" APIs provided by cloud vendors all fundamentally rely on this layer of capability. Below, we organize object detection from three angles — **scenarios**, **principles**, and **models** — and expand on key directions in subsequent subsections.

- **Scenarios**
  - Security and traffic surveillance: real-time detection of pedestrians, vehicles, non-motor vehicles, traffic signs, wrong-way/encroaching objects in camera feeds, providing the basis for subsequent behavior analysis and alerts.
  - Industrial quality inspection and manufacturing: detecting product defects (scratches, breakage, foreign objects), part positions, and assembly completeness on production lines, supporting automatic rejection and robot positioning.
  - Retail and logistics: product detection on unmanned retail shelves and at checkout; target detection and positioning of packages, pallets, and stacks in warehousing, assisting inventory counting and robotic grasping.
  - Content understanding and moderation: detecting people, logos, weapons, sensitive items, etc. in images/videos, providing structured signals for content moderation, ad compliance, and brand recognition.
- **Principles**
  The core of object detection is building a dense prediction mechanism on the image:
  - Extract multi-scale feature maps from the input image through a backbone; on these feature maps, simultaneously predict "is there an object," "what category," and "the corresponding bbox parameters" for each "position" (or candidate region).
  - By architecture, there are **two-stage detectors** that first generate candidate boxes and then refine them, and **one-stage detectors** that directly perform classification + regression on feature maps in a unified manner; each has different emphases on accuracy vs. speed.
  - By candidate box design, there are **anchor-based** methods that rely on predefined anchor boxes, and **anchor-free** methods that directly predict center points/boundaries, as well as the **DETR family** based on set matching.
  - To handle small objects, dense objects, occlusion, and scale variation in real-world data, detectors typically combine multi-scale features (FPN), higher-resolution inputs, specific loss functions, and post-processing strategies (e.g., NMS variants, multi-scale testing) for optimization.
- **Models**
  Detection models are generally composed of three parts: **backbone network + feature pyramid / head structure + loss and post-processing**:
  - Classic two-stage detectors: Faster R-CNN, Mask R-CNN, etc., which first generate candidate boxes via RPN, then perform fine classification and regression on each candidate region — high accuracy, clear structure, suitable for scenarios with extremely high accuracy requirements.
  - One-stage detectors: SSD, RetinaNet, YOLO series (YOLOv5/6/7/8, YOLOX, YOLOv10, etc.), which complete detection in a unified network — compact structure, low latency, the workhorse of real-time detection in industry.
  - Anchor-free / Transformer detectors: FCOS, CenterNet, ATSS, etc., which predict boxes directly centered on pixels; DETR / Deformable DETR, etc., which treat detection as "generating a set of objects from a set of queries" through Transformers and set matching, simplifying many hand-crafted designs.
  - Video detection and tracking: building on image detectors, introducing temporal information and association strategies (e.g., tracking heads, optical flow, trajectory matching) to form a unified Detection + Tracking framework, supporting long-duration, multi-object behavior analysis.

Overall, object detection sits at the "hub position" of the vision capability spectrum — on one hand, it receives clean image inputs provided by low-level vision; on the other hand, it decomposes images into "object-level" elements that can be used for recognition, tracking, segmentation, and multimodal understanding. Below, we expand on three directions: **single/two-stage detection architectures**, **anchor-based / anchor-free / Transformer detection**, and **small object and video detection**.

### 2.3.1 Single-Stage and Two-Stage Detection: The Accuracy–Speed Architectural Trade-off

From an architectural perspective, the most classic division in object detection is **two-stage vs. one-stage**. The main difference between the two is: whether to first "roughly select a batch of candidate boxes and then refine them," or to "predict all boxes and categories in one go on the feature map."

Two-stage detection is represented by Faster R-CNN. It first generates a batch of candidate boxes with "high probability of containing an object" through an RPN (Region Proposal Network) on the backbone feature maps (first stage), then performs RoI alignment and feature extraction for each candidate region, followed by finer classification and bounding box regression (second stage). The advantage of this design is that a large number of negative samples are filtered out at the RPN stage, and the second stage can focus on high-quality discrimination on a small number of candidate regions, thus often having an edge in accuracy and being easier to extend to tasks like instance segmentation (Mask R-CNN) and keypoint detection (Keypoint R-CNN). However, the multi-stage structure brings relatively higher computational and implementation complexity, making it more suitable for offline or near-real-time scenarios where real-time requirements are less stringent but accuracy and extensibility are emphasized.

One-stage detection aims to streamline the entire pipeline, completing both category classification and bounding box regression in a unified network. Representative models include SSD, RetinaNet, and the YOLO series: they directly predict "foreground/background + category + bbox" for several candidate boxes at each position on multi-scale feature maps, omitting the explicit proposal stage and being more suitable for end-to-end acceleration and deployment. Early one-stage detectors had a certain accuracy gap compared to two-stage ones, but with their simple structure and fast speed, they quickly dominated industry. With the introduction of FPN, focal loss, IoU-aware loss, and stronger backbones and necks, newer models like RetinaNet, YOLOX, YOLOv7/8/10 have achieved accuracy–speed balances that "approach or even surpass two-stage" on many tasks.

At the application level, engineering choices between these two architectures are typically made based on requirements: for cloud-based batch offline analysis tasks requiring high accuracy and extensibility (e.g., simultaneous detection + segmentation + keypoints), two-stage detection remains a stable and reliable choice; for latency-sensitive scenarios like edge devices, mobile applications, and real-time camera detection, one-stage detectors like the YOLO series are almost the default go-to, often combined with techniques like quantization, pruning, and distillation to further compress models and increase throughput.

### 2.3.2 Anchor-Based and Anchor-Free: From Hand-Crafted Design to End-to-End Learning

On the question of how to define "candidate boxes," detection methods can be divided into two major categories: **anchor-based and anchor-free**. Early mainstream methods (e.g., Faster R-CNN, SSD, RetinaNet, YOLOv3/v4/v5) adopted the anchor-based approach: predefining several anchor boxes with different scales and aspect ratios at each position on the feature map, then learning the foreground probability and bbox offset for each anchor. This approach is simple to implement and effective, but requires substantial manual tuning of anchor sizes and ratios, and in small-object or dense-object scenarios, can lead to an enormous number of anchors and extreme positive-negative sample imbalance.

Anchor-free methods attempt to break free from dependence on predefined anchors. Represented by FCOS, CenterNet, ATSS, etc., they typically directly predict at each pixel of the feature map "whether this is the center of some object (or belongs to that object)" and the corresponding boundary distances, thus completely avoiding the complexity of preset anchors. The benefits are: simpler model structure, more natural training sample assignment strategies, and better generalization and scalability, especially when facing real-world scenes with large scale variations and complex object shapes. At the same time, anchor-free detectors have also driven more pixel/point-based unified frameworks, making it easier to jointly model detection with keypoints, segmentation, and other tasks.

Going further, Transformer-based detectors like DETR / Deformable DETR rethink the detection problem from another dimension: instead of densely laying anchors on feature maps, they introduce a fixed number of "object queries" and, through the Transformer's self-attention and cross-attention mechanisms, "generate" a set of object predictions from global features, achieving one-to-one alignment via Hungarian matching. This set prediction approach completely eliminates traditional components like NMS and manual sample assignment — conceptually very clean, but early implementations suffered from slow convergence and being unfriendly to small objects. Subsequent work like Deformable DETR, by introducing deformable attention and multi-scale mechanisms, has significantly improved both convergence speed and performance, gradually gaining more applications in detection and multi-task scenarios.

For engineering practice, anchor-based, anchor-free, and Transformer detection are not mutually exclusive choices but rather an evolutionary chain: from heavily engineered anchor design, to more end-to-end point/center prediction, to fully set-prediction and attention-based unified frameworks. In current industrial deployment, mature anchor-based models like the YOLO series remain the workhorses, while anchor-free and the DETR family appear more in systems with higher demands for structural simplicity, multi-task unification, and scalability.

### 2.3.3 Small Object and Video Detection: Robustness for Real-World Scenarios

Object detection on public datasets often gives the impression that "the problem is basically solved," but once entering real-world scenarios, two types of challenging problems immediately arise: **small/dense objects** and **robust detection and tracking in video**.

In small object detection, the target often occupies only a tiny pixel area in the original image — for example, distant pedestrians, faraway vehicles, aerial drones, or minute defects on high-resolution industrial images. As the backbone downsamples and feature map resolution decreases, these small objects can easily be "drowned out" in high-level features, leading to missed detections. To address this, detectors typically employ multi-scale feature pyramids (FPN/PAFPN, etc.), increase input resolution, add detection heads on shallow feature maps, and even design dedicated branches and loss weighting strategies for small objects. At the data level, techniques like cropping, zooming, and small-object resampling are also needed to improve the model's perception and memory of small-scale targets.

Dense objects (e.g., crowded crowds, dense parking lots, tightly packed products/parts) expose problems like anchor box overlap, NMS false suppression, and severe occlusion. Improvement strategies include finer label assignment (e.g., adaptive assignment methods like ATSS), soft NMS or learning-based deduplication strategies, and mitigating inter-box competition through center-point/density-map modeling. In industrial quality inspection, many systems also combine detection with pixel-level segmentation for more precise defect localization, facilitating subsequent automated processing.

When detection extends from single frames to video, another challenge is **temporal continuity and target stability**. Single-frame detectors make independent predictions on each frame, making it difficult to avoid short-term missed detections, ID jitter, and false alarms — yet real-world applications for alerting, counting, and trajectory analysis often require consistent cross-frame target trajectories. For this, video object detection typically overlays a tracking module, connecting "detection + object tracking": the classic approach uses an image detector as the frontend, and in the backend uses Kalman filtering, Hungarian matching, and appearance feature similarity for multi-object tracking (e.g., SORT, DeepSORT). More advanced approaches integrate tracking heads directly into the detection network, jointly learning detection and cross-frame association to improve robustness in scenarios with short-term occlusion and fast motion.

In real systems, small objects, dense objects, and video detection are often not isolated problems but appear simultaneously: for example, distant pedestrians/vehicles in urban road surveillance, dense crowds in station squares, and high-speed moving parts in production line video. This also means that high-quality object detection modules, beyond having impressive metrics on standard benchmarks, need to withstand the test of various complex factors under real-world conditions like multi-scale, multi-density, and long-duration video, in order to truly support upper-level behavior analysis, intelligent alerting, and multimodal understanding.

## 2.4 Image Segmentation

With object detection, we already know "what objects are in the image and roughly where they are," but many tasks require even finer structured understanding: **precisely determining, for every pixel, which category it belongs to and which instance it belongs to**. For example, in autonomous driving, we need to know which pixels are road, which are people, and which are cars; cutout tools need to cleanly separate hair strands from the background; medical images require precise delineation of tumor and organ boundaries. These tasks are collectively called image segmentation, which directly outputs semantic or instance labels at the pixel level, providing finer-grained spatial structure information compared to detection.

From a product perspective, image segmentation is the core capability for "pixel-level structuring": cutout and background replacement tools rely on it to decide which pixels to keep; autonomous driving perception modules rely on it to build fine-grained "drivable area + obstacle" maps; medical imaging software relies on it to measure lesion size, shape, and volume; remote sensing platforms rely on it to distinguish farmland, water bodies, buildings, roads, and other land features. Below, we organize image segmentation from three angles — **scenarios**, **principles**, and **models** — and expand on directions like semantic/instance/panoptic/large-model segmentation in subsequent subsections.

- **Scenarios**
  - Content editing and cutout: portrait cutout, hair-level background replacement, object extraction and layered editing for image beautification, short video effects, and advertising creative production.
  - Autonomous driving and robotics: labeling each pixel as road surface, lane line, pedestrian, vehicle, guardrail, building, sky, etc., for path planning, collision warning, and environment modeling.
  - Medical image analysis: precisely segmenting organs, tumors, and lesion regions in CT, MRI, ultrasound, and other images, supporting assisted diagnosis, surgical planning, and treatment evaluation.
  - Remote sensing and geographic information: segmenting farmland, water bodies, roads, buildings, forests, and other land features in satellite/aerial imagery, supporting land planning, land use monitoring, and disaster assessment.
- **Principles**
  Image segmentation is essentially "dense prediction": extracting multi-scale features from the input image through an encoder (backbone), then progressively restoring the feature maps to a segmentation map of the same size as the input through a decoder or upsampling modules, outputting a semantic or instance label at each pixel position.
  - **Semantic Segmentation**: assigns a semantic category to each pixel (e.g., road, person, car, sky), without distinguishing different individuals of the same class — suitable for describing "scene composition."
  - **Instance Segmentation**: further distinguishes different instances of the same class on top of semantic information, generating independent masks for "each car, each person" — a combination of detection and segmentation.
  - **Panoptic Segmentation**: uniformly handles "countable things (e.g., people, cars)" and "uncountable stuff (e.g., road, sky)," providing both a semantic label and an instance ID for each pixel.
    Compared to detection, segmentation is more sensitive to spatial details and boundary quality, requiring richer multi-scale contextual information and finer upsampling/fusion strategies.
- **Models**
  Classic to latest segmentation models have roughly evolved along the path of "FCN → encoder–decoder → multi-scale context → detection+segmentation unification → large-model segmentation":
  - Semantic segmentation: FCN, U-Net and variants, DeepLab series (DeepLabv3/v3+), PSPNet, etc., obtaining multi-scale context and fine boundaries through dilated convolutions, pyramid pooling, skip connections, etc.
  - Instance/panoptic segmentation: Mask R-CNN, Panoptic FPN, Mask2Former, etc., combining detection heads with segmentation heads to achieve object-level segmentation and panoptic segmentation.
  - Large models and general segmentation: foundation segmentation models like Segment Anything Model (SAM), elevating segmentation from "training separately for each task" to "one model adaptable to most segmentation scenarios," supporting interactive, prompt-based segmentation.

Overall, image segmentation provides finer spatial structure representation compared to object detection, and is an indispensable link in building highly reliable perception systems and advanced editing tools. Below, we expand on three directions: **semantic segmentation and instance segmentation**, **panoptic segmentation and detection unification**, and **general segmentation, large models, and unsupervised segmentation**.

### 2.4.1 Semantic Segmentation and Instance Segmentation: From "Pixel Category" to "Pixel Instance"

The goal of **semantic segmentation** is to assign a semantic category to every pixel in the image, so that the network learns "this region is road, that region is car, here is person, there is sky and building." Classic approaches typically use an encoder–decoder structure: the encoder (e.g., ResNet, EfficientNet, Swin Transformer) extracts progressively downsampled high-level features, and the decoder restores resolution to the original through upsampling, skip connections, and multi-scale fusion, combining coarse high-level semantic features with low-level details. FCN was the first to systematize this dense prediction form; U-Net achieved great success in medical imaging through its symmetric U-shaped structure and abundant skip connections; the DeepLab series expanded the receptive field without reducing resolution through dilated convolutions and ASPP (Atrous Spatial Pyramid Pooling); PSPNet obtained global context information through pyramid pooling. These models collectively drove large-scale applications in road scenes, remote sensing, medical imaging, and other domains.

**Instance segmentation** further distinguishes different individuals of the same class on top of pixel semantic labels: not only knowing which pixels are "car," but also knowing which pixels belong to which specific car. The most representative model is Mask R-CNN, which adds a parallel segmentation branch to the Faster R-CNN detection framework: the detection head first predicts the category and position of each candidate box, then generates a binary mask within each box, yielding "box + mask" object-level segmentation results. Compared to pure semantic segmentation, this approach handles object overlap and occlusion well, and serves as the foundation for tasks like portrait/product cutout, multi-object counting, and fine-grained editing. Subsequent instance segmentation methods have continuously improved in mask quality, multi-scale handling, and speed, with new anchor-free and Transformer-based architectures also emerging, but the "detection + local segmentation" approach remains very mainstream.

At the product level, semantic segmentation typically appears in "scene-level" applications such as autonomous driving road segmentation, remote sensing land feature recognition, and medical organ segmentation; instance segmentation is more commonly used for "object-level" cutout, counting, and editing, such as one-click selection and separation of each car, each person, and each product. The combination of both provides fine-grained yet structured spatial information for upper-level tasks.

Doing only semantic segmentation mixes same-class objects together (all "car" pixels belong to the same class); doing only instance segmentation often focuses only on countable "things" (e.g., people, cars, animals) while ignoring large areas of uncountable "stuff" (e.g., road, grass, sky). In many scenarios, we need both **instance-level masks for each object** and an understanding of the **overall scene composition**. This gave rise to **panoptic segmentation**: simultaneously providing a semantic class and instance ID for every pixel, achieving unified modeling of things + stuff.

Early panoptic segmentation systems were typically implemented through "semantic segmentation model + instance segmentation model + post-processing fusion": first using one network to predict the semantic category of each pixel, then using another network to output masks and categories for each instance, and finally merging the two into a consistent panoptic segmentation result through a set of rules (e.g., priority, overlap handling). Panoptic FPN represents a more elegant engineering path: on a shared backbone and feature pyramid (FPN), separately attaching semantic segmentation heads and instance segmentation heads, obtaining both outputs simultaneously through joint training and feature sharing, then fusing them through lightweight post-processing. This not only improves efficiency but also enhances consistency between semantics and instances.

At the model level, with the development of detection/segmentation unification and Transformer architectures, unified panoptic segmentation frameworks like Mask2Former have emerged: they tend to use a universal "query + mask decoder" structure, simultaneously predicting masks for semantics, instances, and even other downstream tasks within the same network, thereby greatly simplifying the system architecture and facilitating multi-task extension. For complex tasks like autonomous driving, robot navigation, and AR scene understanding, panoptic segmentation provides a more complete scene description closer to "human subjective perception," allowing upper-level decision-making and planning to operate on more accurate spatial semantics.

In product form, panoptic segmentation is often embedded within autonomous driving, robotics systems, and high-end visual analysis platforms. Users may not directly perceive the concept of "panoptic segmentation," but they genuinely benefit from more robust scene understanding and more natural interactive experiences.

### 2.4.2 General Segmentation and Unsupervised Segmentation: From Task-Specific to "Segment Anything"

Traditional segmentation models are often trained around specific datasets and tasks: for example, "19-class semantic segmentation of road scenes," "segmentation of a certain type of tumor," "segmentation of certain product categories," etc. Each new task requires re-annotation and re-training. In real business, this approach of heavily relying on precisely labeled data is extremely costly and struggles to cover long-tail categories and constantly emerging new scenarios. In recent years, with the development of large-scale pre-trained vision models and prompt-based paradigms, **general segmentation large models** represented by the **Segment Anything Model (SAM)** have emerged, attempting to elevate segmentation capability from "task-specific customization" to "infrastructure."

Taking SAM as an example, it learns universal features of the entire image through a powerful image encoder (typically a large-scale pre-trained ViT), and then converts user-provided points, boxes, text prompts, etc. into segmentation results through a lightweight prompt encoder and mask decoder. During training, SAM leverages massive, multi-source, multi-task mask annotations, so that the model learns a "generalized segmentation capability" rather than rote memorization of a specific dataset's labels. During use, users only need to provide very few prompts (a single point or a rough box) to obtain high-quality masks on various unseen image types and object categories. This paradigm greatly lowers the barrier to building new segmentation applications and provides a powerful tool for unsupervised/weakly-supervised scenarios.

Related to this is the broader direction of **unsupervised / self-supervised segmentation**: without relying on or minimally relying on human-annotated masks, automatically dividing images into several meaningful regions through signals such as intra-image similarity, temporal consistency, and multi-view constraints. Early work focused more on "visual clustering" and region proposal generation, while nowadays it is increasingly internalized by large models as a form of representation learning, providing good initialization for downstream segmentation tasks. Combined with text–image contrastive learning models like CLIP, an increasing number of methods can perform zero-shot or few-shot segmentation under the condition of "only providing text category names, without providing mask annotations," offering new solutions for cold-start scenarios and long-tail categories.

In actual products, general segmentation large models often appear in forms like "interactive cutout tools," "smart selection," and "one-click background removal," and are gradually being integrated into professional software in fields like medicine, remote sensing, and industry, serving as accelerators for semi-automatic annotation and assisted segmentation. Compared to traditional custom models, they may not achieve the ultimate performance on a specific task, but they have a significant advantage in "being able to do a bit of everything and quickly landing in multiple scenarios," laying the groundwork for building truly multimodal foundation vision models.

## 2.5 Keypoint Detection & Action Recognition

After classification, detection, and segmentation, we already know "what is in the image, where it is, and what each pixel belongs to." But in many real-world tasks, businesses care not only about "object presence and position" but also about **pose and action**: Is a person walking or running? Is this hand raised or making a certain gesture? Is the worker correctly wearing safety equipment and performing standardized actions? Is the athlete's technique correct? These questions require us to further understand the **internal structure and temporal changes of objects**.

Keypoint detection and action recognition are two layers of capability designed for this need:

- **Keypoint Detection**: on an image or video frame, predict several "skeleton points" (e.g., joints, fingertips, facial features) of a target (typically a human body, hand, face, or specific mechanical structure), obtaining a fine-grained structured pose representation.
- **Action Recognition**: analyze how these keypoints or appearance features change over time in the temporal dimension, determining "what action or behavior this person/group is performing."

From a product perspective, this capability widely serves: human-computer interaction (gesture control), sports analysis (technique evaluation), security (fall detection, fighting/running and other abnormal behavior recognition), industrial safety (violation action detection), virtual human driving (driving 3D skeletons and animations via body/facial keypoints), and other scenarios. Below, we organize this layer of capability from three angles — **scenarios**, **principles**, and **models** — and expand on keypoint detection and action recognition in subsections.

- **Scenarios**
  - Human-computer interaction and AR/VR: through gesture recognition and body pose detection, enabling natural interaction where "a gesture is enough to control," or driving virtual avatars in real-time in AR/VR.
  - Sports training and motion analysis: tracking keypoints and analyzing angles for actions like running, high jump, shooting, weightlifting, providing technique evaluation and correction suggestions.
  - Security and public safety: detecting abnormal behaviors like falling, fighting, violent running, climbing over barriers for timely alerts; identifying whether operations are standardized on construction sites and in factory areas.
  - Industry and human-robot collaboration: detecting whether workers operate in standard postures, safe distances during robot collaboration, and whether dangerous actions occur.
  - Facial/expression driving and virtual humans: capturing expression details through facial keypoints for expression transfer, digital human driving, video conference avatars, etc.
- **Principles**
  The two types of tasks respectively emphasize spatial structure and temporal change, but both are essentially structured predictions in high-dimensional feature space:
  - Keypoint detection: locating a set of predefined keypoints on an image (e.g., 17/25 body joints, 21 hand joints, 68/106 facial keypoints). A common approach is predicting a heatmap for each keypoint on feature maps, then deriving coordinates through peak position back-projection; in multi-person scenarios, "joint-to-person assembly" is also needed.
  - Single-frame/short-term action recognition: based on a single image or short time window, using human pose (keypoints) and appearance features to determine the action category occurring in that frame/clip (e.g., walking, running, raising hand, waving, sitting).
  - Temporal action recognition: on longer time scales, analyzing feature sequences (image features, keypoint sequences, or optical flow, etc.), modeling the start, duration, and end of actions, recognizing complex behaviors like "making a phone call," "doing push-ups," "two people shoving each other."
  - Structured representation: keypoint sequences provide a more compact and stable structured representation than raw pixels, making it easier to handle viewpoint changes, background interference, and appearance differences in action recognition.
- **Models**
  Common models have roughly developed along the unified paradigm of "convolutional/Transformer feature extraction + keypoint/temporal heads":
  - Keypoint detection: OpenPose series, Hourglass Network, HRNet, branching into top-down (detect person first then estimate pose) and bottom-up (detect joints first then assemble) approaches; in recent years, Transformer-based pose estimators have also emerged.
  - Video action recognition: 2D/3D CNN-based video models (I3D, SlowFast, etc.), skeleton-based GCN models (ST-GCN, etc., directly modeling spatiotemporal relationships on keypoint graphs), and end-to-end solutions based on video Transformers (Video Swin, TimeSformer, etc.).
  - Unified multi-task and large models: simultaneously outputting detection, segmentation, keypoint, and action labels on a general vision backbone, or using multimodal large models to directly understand "what action this person is doing" through text prompts, connecting structured prediction with semantic understanding.

Below, we expand on two directions: **keypoint detection and pose estimation** and **action recognition and behavior understanding**.

### 2.5.1 Keypoint Detection and Pose Estimation: Drawing the "Skeleton" for People and Objects

Keypoint detection (also often called pose estimation) focuses on the **spatial structure in a single frame or single image**: finding a set of semantically meaningful keypoints in a 2D image and connecting them into a skeleton. For example, in human pose estimation, we typically need to detect joints like the head, shoulders, elbows, wrists, hips, knees, and ankles; in facial pose, it's the eye corners, mouth corners, nose tip, face contour, etc.; in hand pose, it's the finger roots, knuckles, and fingertips. For non-human objects like robotic arms and articulated structural components, a keypoint system can also be defined similarly.

In model design, keypoint detection commonly uses the **"feature extraction + heatmap prediction"** paradigm:

- First, use a CNN or Vision Transformer (e.g., ResNet, HRNet, Swin) to extract multi-scale features from the input image.
- Then, through a decoding head or multi-layer convolution, output a heatmap for each keypoint type, where each pixel value represents "the likelihood that this position is that keypoint."
- During inference, the peak position of each heatmap is typically taken as the keypoint coordinate, with sub-pixel optimization through bilinear interpolation, local fitting, etc.

For multi-person scenarios, pose estimation methods roughly divide into two paths:

- **Top-down**: first use a person detector to find each person's bounding box in the image, then perform single-person pose estimation on the image within each box. This approach has high per-person accuracy and a simple framework, but incurs high computational cost in dense multi-person scenarios and is sensitive to detection quality. Representative systems include many combinations based on Faster R-CNN/YOLO + Hourglass/HRNet.
- **Bottom-up**: instead of distinguishing each person first, directly predict all potential keypoints (and their types) on the entire image, while also predicting connection relationships or affinity fields between keypoints (e.g., OpenPose's PAF). Then, through graph matching/clustering algorithms, assemble keypoints into multiple independent human skeletons. These methods are more efficient in dense multi-person scenarios and more robust to crowd size, but the assembly process is complex and sensitive to connection quality.

In recent years, Transformer-based pose estimation models have also gradually emerged, treating keypoint detection as a set of "query–response" tasks, similar to DETR, which can unify object detection and pose estimation architecturally. In engineering applications, keypoint detection capability is typically packaged as "human body/gesture/facial keypoint SDK or API," where upstream applications only need to input images or video frames to obtain structured skeleton coordinates for subsequent action recognition, interaction control, or animation driving.

### 2.5.2 Action Recognition and Behavior Understanding: Making the "Skeleton" Move

After obtaining keypoints or high-level visual features, the next step is to understand **changes in the temporal dimension** — that is, action recognition and behavior analysis. Unlike keypoint detection, action recognition is no longer confined to single frames; it is concerned with the evolution patterns of features over a period of time: from "raising a hand" to "waving," from "walking" to "running," from "standing" to "falling."

In terms of input representation, there are roughly three routes:

- **Based on raw video frames / optical flow**: directly modeling video frame sequences, or additionally introducing optical flow (a field describing local motion velocity) as input, allowing the model to jointly learn from appearance + motion information.
- **Based on skeleton/keypoint sequences**: first using pose estimation to obtain human keypoint coordinate sequences, then modeling on a "spatiotemporal skeleton graph," weakening background and lighting interference while focusing more on human body structure and motion patterns.
- **Multimodal fusion**: incorporating video features, keypoint sequences, and even audio, text, and other modalities together to handle complex behavior scenarios (e.g., multi-person interaction, event-level actions).

Correspondingly, model structures have also shown diversified development:

- Early action recognition mainly relied on **2D CNN + temporal pooling** or **3D CNN** (e.g., I3D, C3D): the former extracts features for each frame and then pools or applies RNN in the temporal dimension; the latter directly performs 3D convolutions in both space and time to capture short-term motion patterns.
- For skeleton sequences, the typical method is **spatial-temporal graph convolutional networks (ST-GCN)**: treating human keypoints as graph structure nodes, with edges between joint connections and also edges in the temporal dimension, propagating information on the spatiotemporal graph through graph convolutions to learn action patterns. These methods are lightweight, robust to background, and suitable for deployment on resource-constrained devices.
- In recent years, **video Transformers** (e.g., TimeSformer, Video Swin) have performed outstandingly in action recognition, segmenting video into spatiotemporal patches and modeling long-range dependencies through self-attention mechanisms, better capturing complex actions and multi-object interactions.

On the business side, action recognition is often combined with detection, tracking, and keypoint detection to form end-to-end behavior analysis systems:

- In security, first detect and track people, then classify actions on the keypoint sequences of each trajectory to achieve fall detection, fighting/running recognition, etc.;
- In sports and fitness applications, analyze whether actions are standard and whether the range of motion is appropriate through keypoint sequences, and provide correction suggestions;
- In human-computer interaction scenarios, perform lightweight action classification on real-time pose streams to achieve interactions like waving, making a heart gesture, gesture commands, etc.;
- In industrial safety, continuously monitor worker operations to identify dangerous postures (e.g., leaning into danger zones, crossing safety lines, etc.).

Looking ahead, multimodal large models are elevating "action recognition" to a higher level of "event and intent understanding": models can not only label "walking, running, making a phone call" but also answer descriptions closer to everyday language like "this person seems to be signaling someone" or "these two people are having an argument." Keypoint detection and action recognition, as important structured motion cues, together with appearance features and language prompts, jointly support more complex spatiotemporal understanding capabilities.

## 2.6 Open-Vocabulary / Open-World / Open-Domain Detection

The detection and segmentation capabilities discussed earlier all basically default to one premise: **the set of categories during training and inference is fixed**. That is, the model has fully seen "all categories to be recognized" during the training phase, and during inference, it only needs to choose from this closed set of labels. But the real world is far more complex than datasets: new products, new brands, new signs, new species, and new scenarios appear at any time, and it is impossible to prepare sufficient annotated data for each new class and retrain the detector. This gave rise to **open-vocabulary / open-world / open-domain detection**: under the condition that training data only covers a limited set of "known classes," enabling the model to still perceive, locate, and recognize **unseen new classes** during inference, while maintaining robustness under changes in visual style and capture domain.

You can think of this layer as: adding "alignment and generalization capability to the language space and open world" on top of traditional detection. The model no longer only says "this is one of the 80 COCO classes," but can understand and retrieve objects in the space of arbitrary text descriptions — for example, "detect all 'red sports shoes' in the image," "mark all 'suspected small aircraft'," even if these fine-grained categories never explicitly appeared in the training set. Below, we organize this layer from three angles — **scenarios**, **principles**, and **models** — and expand on open-vocabulary detection, open-world detection, and open-domain generalization in subsections.

- **Scenarios**
  - General scene understanding API: users provide arbitrary natural language descriptions (category words or short phrases), and the system returns detection boxes or segmentation masks for corresponding objects in images of any style — e.g., "all hard hats in the image," "all suspected brand logos," "all objects with wheels."
  - Large-scale product / species recognition: constantly emerging long-tail products in e-commerce, the enormous number of animal and plant species in nature — training data can only cover a portion of known classes, but the system needs to locate and roughly recognize massive new classes, and support retrieval via text or images.
  - Cross-domain security / autonomous driving perception: training data mostly comes from daytime urban roads / a few camera angles, but actual deployment faces different cities, rural areas, highways, extreme weather, infrared/fisheye cameras, and other "new domains," where new types of objects never annotated in the training set may also appear (new car models, new traffic facilities, new types of obstacles).
- **Principles**
  The core of these methods is to replace the traditional "fixed one-hot category head" with a **vision–language aligned embedding space**, and handle "unseen classes" and "new domains" through various mechanisms:
  - Open-vocabulary detection: during training, leverage large-scale image–text pairs to pre-train an aligned space similar to CLIP, so that image regions and text embeddings can be directly matched for similarity in the same semantic space; the detection head no longer outputs fixed category logits, but outputs a region feature vector that can be compared with arbitrary text description vectors, thus supporting "training only sees some categories, inference can specify arbitrary text categories."
  - Open-world detection: further handles "new classes completely unannotated in the training set," requiring the model to detect such objects as "unknown" and, through subsequent interactive annotation or continual learning, gradually incorporate these unknown classes into the known class set, forming an online learning system that can continuously expand categories.
  - Open-domain / cross-domain detection: facing significant changes in image style, imaging equipment, environmental conditions, etc. (domain shift), through techniques like domain adaptation and domain generalization, enabling the detector to maintain stable detection performance in unseen new domains; common approaches include adversarial domain alignment, multi-domain training, style randomization, meta-learning, etc.
  - Open-vocabulary segmentation and detection unification: extending the above ideas to the pixel level, generating segmentation masks for arbitrary text descriptions (open-vocabulary segmentation), achieving "describe a region/object in natural language and get the corresponding mask or box" through Region–Word or Mask–Word alignment losses.
- **Models**
  Current mainstream technical routes for open-vocabulary / open-world / open-domain detection basically revolve around "large-scale vision–language pre-training + detection head adaptation + domain generalization mechanisms":
  - CLIP-based detectors: using CLIP-style image encoders and text encoders as the foundation, applying contrastive learning and Region–Word alignment losses between region-level features (ROI, feature map patches, mask regions) and text embeddings; typical implementations include replacing or extending classification heads on architectures like Faster R-CNN / RetinaNet / YOLO / DETR to output category scores via "cosine similarity + text embeddings."
  - Caption-driven / prompt-based detection: leveraging large-scale image caption data to automatically generate text descriptions for regions or masks in images, then aligning these auto-generated texts with detection/segmentation regions for training, thereby reducing dependence on manual category labels; during inference, natural language prompts (e.g., "all people wearing red clothes," "all electric vehicles") drive detection/segmentation.
  - Open-world detection series: explicitly introducing "unknown class" modeling, progressive category expansion, and incremental learning mechanisms in traditional detection frameworks; some methods determine "whether it is an unknown class" through distance and uncertainty estimation in metric space, while others introduce memory banks and online retraining, enabling the system to accumulate new category knowledge over time.
  - Domain adaptation / domain generalization detection: adding domain discriminators, adversarial losses, multi-domain batch normalization, style randomization augmentation, and other modules at the backbone and detection head levels, enabling the detector to learn more domain-invariant representations across different domains; some work also introduces multi-source domain training and meta-learning strategies on Transformer detection frameworks (e.g., Deformable DETR) to improve cross-domain generalization.
  - General / foundation detection models: elevating the detection problem to the "foundation model" level, pre-training a detection foundation model that is as general as possible in both categories and domains, then adapting to specific scenarios through lightweight fine-tuning or text prompts; these models typically combine large-scale detection annotations, multi-source image–text pairs, and even video data, with the goal of making "arbitrary text + arbitrary style image" general understanding possible.

In specific product forms, open-vocabulary/open-world/open-domain detection often manifests as "more natural, less restricted" visual interfaces: users don't need to pre-agree on a small set of fixed labels, but can describe what they want to find in natural language; the system also doesn't need to retrain detectors from scratch for each business scenario, but can quickly adapt through prompts or few-shot samples based on a unified general model. For large-scale product/species recognition and globally deployed security and autonomous driving perception systems, this layer of capability is becoming the key springboard from "closed dataset performance" to "real open-world usability."

### 2.6.1 Open-Vocabulary Detection: From Fixed Category Heads to Text-Driven Category Spaces

The starting point of **open-vocabulary detection** is to break through the limitation of "fixed category heads" in traditional detection. Previous detectors attached a fixed-size classification layer at the top (corresponding to the N categories in the training set), and after training, could only choose among these N categories. Open-vocabulary detection, by introducing **text encoders** and a **shared semantic embedding space**, allows the region features output by the detection head to be compared for similarity with arbitrary text descriptions, thereby accepting unseen new categories during inference.

A typical approach uses CLIP-like vision–language pre-trained models:

- Text side: encode category names or natural language descriptions (e.g., "person," "red sports car," "yellow construction helmet") to obtain text vectors.
- Vision side: in the detection framework (Faster R-CNN, RetinaNet, YOLO, DETR, etc.), extract region feature vectors for each candidate region or feature point.
- Alignment training: through contrastive loss and Region–Word alignment loss, make text and region features of the same semantics close in the embedding space, and vectors of different semantics far apart. Even if explicit box annotations are only provided for some categories during training, semantic coverage can be expanded using image–text pairs or image captions.

During inference, the system no longer relies on a fixed set of class names from training, but allows users to provide arbitrary category words or natural language descriptions online, convert them to embeddings via the text encoder, and then perform similarity matching with region features. This enables the detector to support flexible requirements like "detect all skateboards," "detect all green plants," "detect all safety-related equipment" without retraining — even if certain specific categories never had complete annotations in the training set, as long as they semantically overlap with the pre-trained image–text space, they can be recognized and located to some degree.

In engineering practice, open-vocabulary detection needs to balance effectiveness and efficiency: on one hand, maintaining semantic alignment with the large-scale pre-trained vision–language backbone; on the other hand, meeting the detection task's requirements for multi-scale and real-time performance. Mainstream CLIP-based detectors often adopt the approach of "pre-computed text embeddings + efficient vector similarity computation" to avoid repeatedly encoding text during online serving, while also quantizing or distilling region features to balance accuracy and inference speed.

### 2.6.2 Open-World Detection: From "Unseen Classes" to "Learnable Unknowns"

**Open-world detection, building on open-vocabulary, further requires the model to explicitly handle "unknown classes"**: the training data only annotates some categories, while other objects are either unannotated or collectively labeled as background. During inference, these "unannotated real objects" should neither be simply treated as background nor incorrectly classified into known categories, but should be detected as "unknown" and have the potential to be subsequently converted into "new known classes."

In modeling, open-world detection typically needs to address three problems:

1. **Unknown class perception**: how to avoid learning all unannotated objects as "background" during training? Common approaches include: introducing explicit "unknown class" slots, using negative example mining and uncertainty modeling to make the model output "unknown" in low-confidence regions; or using unannotated data and self-supervised mechanisms to cluster and generate pseudo-labels for high-confidence potential object regions.
2. **Misclassification control**: the model needs to balance "preferring to judge as unknown rather than incorrectly classifying into wrong known classes," which involves loss design (e.g., margin, open-set discrimination), decision thresholds, and post-processing strategies.
3. **Progressive category expansion**: when business teams manually annotate new categories for a batch of "unknown" objects, the model should be able to incorporate these new categories into the "known class" set through incremental learning without significantly forgetting old classes. To this end, many works introduce memory banks, distillation losses, parameter isolation, or replay mechanisms to achieve stable absorption of new categories.

From a product perspective, open-world detection is particularly suitable for scenarios where **categories are constantly growing and long-tail is extremely severe**, such as natural species recognition, product recognition for rapidly emerging new items, and abnormal object detection in complex security scenarios. The system can first use open-world detection to mark "any non-background suspicious objects," and gradually upgrade valuable clusters to formal categories through manual or semi-automatic annotation, thus forming a detection system where "categories can sustainably grow," rather than being constrained by fixed datasets.

### 2.6.3 Open-Domain / Open-Distribution Detection: Robustness Across Styles, Devices, and Scenarios

Even if the category set remains unchanged, detectors still encounter severe **domain shift** in real deployment: training data may come from high-definition daytime cameras in a few cities, while deployment environments include different countries, rural areas, highways, tunnels, nighttime, rain/snow, low-resolution cameras, fisheye lenses, and even infrared imaging. Huge differences also exist between e-commerce product photography and user-taken photos, or between ad images/illustrations/anime styles. **Open-domain detection** focuses precisely on: maintaining stable and reliable detection performance under conditions of significantly changed image distributions.

Typical technical paths include:

- **Domain adaptation**: with access to unlabeled or a small amount of labeled data from the target domain, using adversarial domain alignment (confusing source/target domains in feature space), multi-level domain alignment (image style, features, detection head outputs), style transfer (e.g., transferring source domain image style to target domain), etc., to make the model learn domain-insensitive features.
- **Domain generalization**: with only multiple source domain data and no target domain data, using multi-domain training, style randomization, feature perturbation, meta-learning, etc., to expose the model to diverse distributions as much as possible during training, improving generalization to unknown new domains.
- **General / foundation detection models**: by pre-training detection backbones and head structures on extremely large-scale, multi-source, multi-style data (including natural images, video frames, synthetic data, cross-modal data, etc.), then lightly fine-tuning for specific business scenarios, thereby achieving stronger open-domain robustness than "single-domain training."

These open-domain mechanisms are often superimposed with open-vocabulary/open-world capabilities: a general detection system for the real world needs to both understand users' natural language category descriptions (open-vocabulary), give reasonable "unknown" judgments and progressive absorption for newly appearing objects (open-world), and maintain performance across different countries, devices, weather conditions, and styles (open-domain). In engineering deployment, these three are not isolated research directions but together form the key capability combination for moving from "closed benchmarks" to "open-world usability."

## 2.7 Vision–Language Tasks

The previous sections mainly focused on "single-modality vision": the input is an image, and the output is detection boxes, segmentation masks, category labels, or quality scores. But in many real applications, visual information does not exist in isolation — an image often comes with captions, descriptive text, dialogue, or search queries. Users want to ask "what is happening in this image" or "does this image match this sentence." **Vision–language tasks** are precisely designed to solve these problems: they take image + text as input or output, and through **cross-modal alignment and joint modeling**, enable the system to "describe images in words," "answer questions about images," and "find images by text / find text by image."

From a product perspective, vision–language models (VLMs) are the hub capability of multimodal systems: search engines rely on them for "text-to-image / image-to-text search"; content platforms use them for smart image matching, ad moderation, and image–text consistency checking; multimodal assistants use them as foundational capabilities for "chatting about images" and "asking questions about documents/screenshots." Below, we organize this layer from three angles — **scenarios**, **principles**, and **models** — and expand on image captioning, visual question answering, and cross-modal retrieval in subsequent subsections.

- **Scenarios**
  - Image captioning: automatically generating one or two sentences of natural language description for an image, used for accessibility-assisted reading, smart album captions, and search index enrichment.
  - Visual question answering (VQA): users ask natural language questions about an image ("What is this person holding?" "What is the license plate number?"), and the system provides precise answers, applicable to education, assisted decision-making, and multimodal assistants.
  - Cross-modal retrieval: retrieving relevant images by text (Text-to-Image) and retrieving relevant text by image (Image-to-Text), supporting "text-to-image / image-to-text" search, creative image selection, and ad delivery moderation.
  - Image–text consistency and moderation: determining whether an image matches its caption/ad copy, whether there are risks like "image–text mismatch" or "misleading descriptions," used for content moderation and brand safety.
- **Principles**
  The core problem is: how to map images and text into the **same semantic space** and perform alignment and reasoning within this space:
  - Cross-modal alignment: through jointly trained image encoders and text encoders, making corresponding "image–text pairs" close to each other in the representation space and unrelated pairs far apart (typified by CLIP); this provides the foundation for retrieval and matching.
  - Joint understanding and generation: on top of aligned representations, introducing cross-modal attention so that the language model can generate text (image captioning), reason, and answer questions (VQA) while "looking at image features."
  - Prompting and instruction-based: using natural language instructions to uniformly describe various vision–language tasks ("write a caption for this image," "answer a question about this image," "determine whether this text describes the image"), allowing one model to complete multiple tasks through different prompts.
- **Models**
  Mainstream vision–language models have roughly evolved into two categories: **contrastive learning VLMs** and **generative multimodal large models**:
  - Contrastive learning type: CLIP, ALIGN, etc., encoding images and text separately into vectors, trained on large-scale image–text pairs, performing excellently on retrieval and matching tasks — the foundation for "text-to-image / image-to-text search."
  - Vision–language generative models: BLIP / BLIP-2, Flamingo, Kosmos, LLaVA, etc., connecting vision encoders with large language models (LLMs), supporting complex tasks like image captioning, VQA, and multi-turn dialogue through cross-modal attention and instruction fine-tuning.
  - General multimodal large models: GPT-4.1 with Vision, Gemini 1.5, etc., further unifying vision with more modalities (speech, code, etc.) in a single large model, completing retrieval, Q&A, reasoning, and generation through a unified interface.

Overall, vision–language tasks mark the point where "vision is no longer a separate perception channel" but participates together with language in higher-level knowledge representation and reasoning. Below, we expand on two directions: **image captioning and visual question answering**, and **cross-modal retrieval and cross-modal alignment** (merged into two subsections here based on content).

### 2.7.1 Image Captioning and Visual Question Answering: From "Describing Images" to "Reasoning About Images"

The goal of **image captioning** is to take an image as input and output a natural language description, such as "a little girl flying a kite on the grass." Traditional approaches typically used a "CNN + RNN" structure: extracting whole-image features with a convolutional network, then generating descriptions word by word with LSTM/GRU. With the emergence of Transformers and pre-trained VLMs, the mainstream paradigm has gradually shifted to an "image encoder + text decoder" structure, such as BLIP / BLIP-2, ViT + GPT, etc. For training, models are typically trained autoregressively on large-scale image–text pairs, sometimes also using reinforcement learning or contrastive losses to optimize description diversity and correctness. At the product level, image captioning is widely used for accessibility reading (generating image descriptions for screen reader software), automatically adding captions to smart albums, and providing more text indices for search systems.

**Visual question answering (VQA) further brings human interaction into the picture: the model's input is no longer "image + blank prompt" but "image + question," and the output is a short answer or natural language explanation. Compared to image captioning, VQA emphasizes controllability and reasoning ability more**: questions can focus on local details ("What color is the man's hat?"), relationships ("Which car is closer to the intersection?"), counting ("How many dogs are there?"), and even require external knowledge ("Which cuisine does this dish belong to?"). Early VQA models typically used an image encoder + question encoder + fusion module (e.g., bilinear pooling, attention) + classification head, outputting an answer from a limited vocabulary. Modern multimodal large models directly use an image encoder + LLM, performing natural language generation while "looking at the image," with clear advantages in open-ended answers and multi-turn dialogue.

Both can be viewed as different "prompt templates" under a unified VLM framework:

- Captioning: `<image> + "Describe this image in one sentence."` → text;
- VQA: `<image> + "Q: ... A:"` → text.

Through instruction tuning, the same multimodal large model can be compatible with multiple tasks like captioning, Q&A, explanation, and tagging — this is also the foundational engineering approach for modern VLM products (multimodal assistants, image Q&A bots, etc.).

### 2.7.2 Cross-Modal Retrieval and Cross-Modal Alignment: Text-to-Image & Image-to-Text Search

**Cross-modal retrieval** addresses another high-frequency need: given a piece of text, find matching images (Text-to-Image Retrieval); or given an image, find related text descriptions, product information, news reports, etc. (Image-to-Text Retrieval). These capabilities form the core of products like "text-to-image / image-to-text search," "find products by image," and "match images to news articles."

The core technology is **cross-modal alignment**: models represented by CLIP use separate encoders for images and text (e.g., ViT and a Transformer text encoder), trained with contrastive learning on large-scale image–text pair data:

- For the same (image, text) pair, make their vectors close to each other in the embedding space;
- For mismatched image–text pairs, push their vectors apart.

After training, simply encode all images and texts into vectors, and fast matching can be performed in the shared space through vector retrieval (nearest neighbor search):

- Text-to-Image: text → text vector → nearest image vectors;
- Image-to-Text: image → image vector → nearest text vectors.

In engineering practice, these models typically use a two-stage structure:

- The first stage uses a lightweight, fast bi-encoder (e.g., CLIP) for coarse retrieval, quickly filtering a small set of candidates from a billion-scale image library;
- The second stage can optionally use a stronger cross-encoder or multimodal large model for fine-ranking and re-ranking of candidates to improve relevance and robustness.

On the product side, cross-modal retrieval and alignment are widely used in: image search, ad retrieval (finding suitable images based on ad copy), compliance moderation (checking ad image–text consistency), content recommendation (recommending relevant images/videos based on users' reading text history), etc. With the rise of multimodal large models, these retrieval capabilities are gradually being unified into larger multimodal frameworks, provided as unified interfaces in the form of "natural language instructions + multimodal memory/vector database."

## 2.8 Optical Character Recognition (OCR)

In many businesses, the most important information is neither reflected in "objects and scenes in the image" nor in natural language descriptions of the image, but is directly written as **text** on the image: contract clauses, invoice amounts, street sign names, meter readings, error messages on screenshots, etc. **Optical character recognition (OCR)** is precisely the structured understanding task centered on "image + document layout": automatically detecting and recognizing text content from complex visual inputs, understanding document layout and structure, and further supporting search, statistics, automatic data entry, and intelligent Q&A.

From a product perspective, OCR is the key bridge for "turning paper/image information into computable text" and is the infrastructure for digitization, automation, and intelligent office work: contract review, invoice entry, government and enterprise archive digitization, PDF-to-Word in office software, document Q&A assistants, etc., are all built on OCR capabilities. Below, we organize the OCR system from three angles — **scenarios**, **principles**, and **models** — and expand on core directions in subsequent subsections.

- **Scenarios**
  - Scene text recognition: store signs, street signs, billboards, packaging text in street scenes, used for navigation, search, retail insights, and compliance moderation.
  - Document OCR: text recognition and structuring of scanned documents, faxes, PDFs, photos of contracts/invoices/reports, etc., restoring them to editable text.
  - Specialized scenarios: license plate recognition, meter reading (electricity, water, gas meters), screenshot text extraction, exam paper/form recognition, etc.
  - Document understanding: in long documents with complex layouts, extracting structures like titles, paragraphs, tables, and annotations, laying the foundation for search, summarization, and Q&A.
- **Principles**
  The OCR system is typically divided into several key steps:
  - Text detection: detecting all text regions (text lines or text blocks) on the image, outputting positioning boxes (horizontal or quadrilateral polygons), which serve as input for subsequent recognition.
  - Text recognition: performing sequence recognition on each detected text region, converting pixel sequences into character sequences (e.g., Chinese, English, numbers, symbols).
  - Layout analysis: in document scenarios, identifying the roles of various regions (title, body text, image, table, header, footer, etc.), recovering reading order and hierarchical structure.
  - Table structure recognition: performing row/column division, cell boundary parsing, and merged cell recovery on table regions, reconstructing logical table structures.
  - Document visual question answering (DocVQA): building on OCR and layout understanding, enabling the model to answer questions like "What is the payment date of this contract?" or "What is the amount on this invoice?" — questions requiring cross-region, multi-step reasoning.
- **Models**
  In engineering, a common combination is "specialized OCR modules + document understanding models + multimodal large models":
  - Text detection and recognition:
    - Detection: EAST, DBNet/DBNet++, etc., segmentation-based or edge-learning-based methods, adept at handling curved text and complex backgrounds;
    - Recognition: CRNN, RARE, SAR, etc., sequence models (CNN + RNN/Attention + CTC or autoregressive decoding), supporting multiple languages and fonts.
  - Document layout and structure understanding:
    - LayoutLM / LayoutLMv2/v3, DocFormer, etc., jointly encoding text content (token), position information (bounding box), and visual features;
    - Donut and other "end-to-end document understanding" models, going directly from image to structured output (e.g., JSON / Markdown), weakening the boundaries of traditional OCR.
  - Document Q&A and multimodal understanding:
    - Stacking task heads on top of layout models for DocVQA;
    - Or directly using multimodal large models (VLMs) to read document images, completing Q&A and summarization at the natural language level while implicitly leveraging OCR capabilities.

Overall, OCR has evolved from early "simple character recognition" to a comprehensive document understanding system covering **text + layout + structure + Q&A**, and is a key pillar of enterprise digitization, government archive management, and intelligent office work. Below, we expand on three directions: **text detection and recognition**, **document layout and table structure analysis**, and **document Q&A and multimodal DocVQA**.

### 2.8.1 Text Detection and Recognition: From Pixels to Usable Text

The first step of OCR is **text detection**: finding all text-containing regions in the input image. Street/scene text faces challenges like diverse fonts, skew and distortion, complex lighting, and severe background interference; document scenarios emphasize robust support for dense text and multi-column layouts. Methods like EAST, DBNet, etc., transform the detection problem into "pixel-level segmentation + edge learning," predicting text probability and geometric parameters on feature maps, then obtaining precise text boxes (which can be horizontal boxes or arbitrary quadrilaterals/polygons) through post-processing, balancing accuracy and speed.

**Text recognition** then crops each detected text region and converts it into a character sequence. The classic approach is represented by CRNN: first extracting features with CNN, then performing sequence modeling with RNN or Transformer, and finally outputting character sequences using CTC or attention decoding. For variable-length text, curved text, and complex languages (Chinese-English mixed, multilingual), recognition models need to simultaneously excel at visual feature modeling and character language modeling. Methods like RARE, SAR, etc., introduce spatial transformer networks (STN) or attention alignment mechanisms to correct geometric distortions and improve adaptability to complex layouts.

In engineering systems, detection and recognition typically serve as two decoupled services forming an OCR pipeline: the frontend detection breaks the image into several text lines/blocks, and the backend recognition performs character recognition on each block, optionally overlaying a language model for error correction (e.g., spell correction, number/amount validation). For specific scenarios like license plates and meter readings, specially fine-tuned detection/recognition models are used to leverage scene priors (fixed fonts, limited character sets) for higher accuracy and lower latency.

### 2.8.2 Document Layout and Table Structure Analysis: Restoring the "Shape of the Document"

Simply recognizing the text is not enough, especially in scenarios like long documents, reports, contracts, and invoices, where **layout structure** often determines the meaning and importance of information: the hierarchical relationship between titles and body text, the positioning of figures and captions, the role of headers and footers, the logical order of text inside and outside tables, etc. The goal of **document layout analysis** is to identify the roles and boundaries of different regions on a two-dimensional page and recover a reasonable reading order and hierarchical structure.

Models like LayoutLM / LayoutLMv2/v3, DocFormer, etc., jointly encode the content of each text token (text embedding), spatial position (bounding box coordinates), and local visual features (from CNN/ViT), modeling semantic–spatial relationships between tokens through Transformers. By training on datasets with layout annotations, the model can learn to distinguish various region types such as "title/paragraph/list/table/figure caption/header/footer" and output corresponding labels and hierarchies. These models typically serve as a "middle layer," providing structured document skeletons for contract review systems, report parsing, and archive digitization platforms.

**Table structure recognition** is a particularly critical branch of layout analysis: it not only needs to detect table regions but also further parse row/column boundaries, cell coordinates, and merged cells, ultimately reconstructing a logical table (typically represented as HTML, Markdown tables, or structured JSON with coordinates). Implementation methods include:

- Rule/vision-based: using line detection, segmentation networks, object detection, etc., to extract table lines and cell regions, then performing topological graph construction;
- Transformer-based: encoding text blocks and geometric information of table regions into sequences, directly predicting cell structures and association relationships.

In products, these capabilities support high-value scenarios like "PDF to Word/Excel," "structured entry of receipts/invoices," and "report parsing and metric extraction," and are key components of government and enterprise office automation.

### 2.8.3 Document Q&A and DocVQA: From "Reading Documents" to "Asking Documents"

When OCR and layout analysis capabilities are strong enough, the next natural demand is: **no longer having people flip through documents themselves, but directly "asking the document."** This is **document visual question answering (DocVQA)**: the model answers questions on complex documents like contracts, reports, receipts, and manuals — for example, "What is the effective date of this contract?" "What is the net profit for Q4 2023 on this report page?" "Who is the buyer on this invoice?"

Traditional DocVQA systems are typically built as "OCR + layout model + QA head":

- First, use OCR to extract text and coordinates;
- Use LayoutLM / DocFormer, etc., to model the text–layout–visual tri-modal relationships;
- Finally, stack a task head (classification / extraction / span prediction) on this representation to locate answers or relevant passages in the document based on the question.

With the development of multimodal large models, more and more systems are starting to directly use "document image + question" as input, letting a VLM or multimodal LLM directly generate answers or cited explanations. Under this architecture, OCR, layout, semantic understanding, and reasoning capabilities work together end-to-end within the model: the model can both see the original layout and visual cues and leverage linguistic world knowledge and reasoning patterns to complete complex question answering.

In product form, DocVQA typically appears as "contract review assistant," "invoice/report Q&A," "long document intelligent Q&A," helping users quickly locate key information from large volumes of documents, automatically generate summaries, perform clause comparison, etc., significantly reducing the burden of manual review and information retrieval.

## 2.9 Image Generation & Editing

Most of the vision capabilities introduced earlier are "discriminative": input an image, output labels, boxes, masks, or text. Another main line that has rapidly developed in recent years is **generative vision**: models no longer just understand images, but **create or modify images**, generating high-quality, multi-style visual content given text/image conditions. **Image generation and editing** is precisely the core capability in this direction, supporting a large number of products from AIGC drawing platforms to intelligent retouching/effects tools.

From a business perspective, generative vision has evolved from "technical demonstrations" to genuinely usable productivity tools: designers use it for inspiration sketches and refined drafts; marketing teams use it to batch-generate posters and ad materials; ordinary users use it to create avatars, illustrations, and wallpapers; video creators use it for cutout, background replacement, and effects. Below, we organize this layer from three angles — **scenarios**, **principles**, and **models** — and expand on text-to-image generation, image-to-image, and editing capabilities in subsequent subsections.

- **Scenarios**
  - Text-to-image generation: users input a description ("a cyberpunk-style night city"), and the system automatically generates multiple images matching the description, supporting image selection and iterative refinement.
  - Style transfer and image translation: converting real photos to anime/sketch/oil painting/watercolor styles, or mapping between different domains (day ↔ night, summer ↔ winter).
  - Conditional inpainting and expansion: locally repainting parts of the original image (inpainting), expanding beyond the frame (outpainting), for fixing defects, removing/adding objects, and expanding composition.
  - Text-driven editing: modifying images with natural language instructions ("change the sky to sunset," "make this car a red sports car"), so users don't need to master complex image editing software.
- **Principles**
  Generative vision models primarily complete generation and editing by learning "image distributions" and "conditional control":
  - Distribution modeling: GANs, diffusion models, Flow Matching, etc., learn high-dimensional distributions from large volumes of images, enabling models to gradually "sample" realistic images from random noise.
  - Conditional generation: on top of pure image distribution modeling, introducing conditions like text/sketch/segmentation map/keypoints/depth map, so that the generation process is constrained by external signals (Text-to-Image, Image-to-Image, ControlNet, etc.).
  - Controllable editing: in the latent space of existing images, guiding and modifying local features through text or local masks to achieve local inpainting, style changes, composition adjustments, etc.
- **Models**
  Current mainstream image generation and editing models are primarily **diffusion models + conditional control**:
  - GAN series: StyleGAN, etc., perform outstandingly in high-resolution faces and style control; but training is unstable and difficult to cover complex multimodal distributions.
  - Diffusion models: Stable Diffusion, Imagen, DALL·E series, etc., sample through a "forward noising + reverse denoising" process, combining quality and diversity — the current main direction for Text-to-Image.
  - Controllable generation and editing: ControlNet, T2I-Adapter, etc., stack conditional channels (edges, poses, segmentation, etc.) on top of base diffusion models for precise control; combined with text-guided inpainting/outpainting for local editing and frame expansion.
  - Flow Matching and next-generation generative models: transforming noise distributions to image distributions by learning continuous flow fields, exploring new balances in efficiency, controllability, and stability.

At the product level, these technologies are presented to users in forms like Jimeng, Alibaba Qwen image models, FLUX, OpenAI or Gemini NanoBanana, Stable Diffusion ecosystem, Photoshop Generative Fill, Canva AI, Jianying/CapCut smart cutout and effects, gradually evolving from "toys" to formal links in the content production chain. Below, we expand on three directions: **text-to-image generation**, **image-to-image translation**, and **text-driven editing**.

### 2.9.1 Text-to-Image Generation: From a Sentence to a Picture

The core task of **text-to-image generation** is: given a natural language description, generate an image that matches its semantics and style as closely as possible. Modern text-to-image models are primarily based on diffusion architectures:

- First, use a text encoder (e.g., CLIP Text Encoder or T5/LLM) to encode the input text into a conditional vector;
- Then, in the image latent space, starting from a high-noise state, perform multi-step reverse denoising sampling, using the text condition to guide the generation direction at each step;
- Finally, obtain a high-resolution image matching the description, which can be further upscaled or post-processed.

Stable Diffusion, Imagen, DALL·E series, and other methods are trained on large-scale image–text pairs, enabling the model to both master the visual spectrum (shapes, textures, composition, lighting) and acquire a certain degree of language–vision alignment capability (understanding complex descriptions like "style," "material," "composition"). At the product level, this capability allows "people who can't draw to create images": users simply describe their ideas in natural language, and the system provides multiple visual implementations, supporting iterative exploration and refinement.

Text-to-image models typically support multi-style, multi-resolution output simultaneously: by incorporating style tokens, size conditions, etc., during training or inference, the same model can switch between different styles like "photorealistic, flat illustration, 3D render." Common engineering techniques include:

- Text prompt engineering for refining and stabilizing output style;
- LoRA / DreamBooth and other lightweight fine-tuning techniques, quickly adapting general models to specific characters, IPs, or brand styles.

### 2.9.2 Image-to-Image: Translation, Style Transfer, and Local Inpainting

**Image-to-Image** tasks, given an input image, generate another image version "constrained by it": preserving the overall structure or content of the original while achieving some transformation or enhancement. Typical forms include:

- Image translation / style transfer: mapping between different visual domains, such as "photo → anime," "summer → winter," "day → night," "sketch → color image." Early work was mostly based on GANs (CycleGAN, Pix2Pix, etc.), but diffusion models can now also accomplish this under conditional control.
- Conditional generation: using sketches, segmentation maps, depth maps, edge maps, etc., as conditions, guiding the diffusion process through modules like ControlNet, T2I-Adapter, so that the generated image strictly follows geometric/layout conditions while freely expressing texture, lighting, and style.
- Inpainting / outpainting: delineating a region on the original image to be treated as the area to repaint (inpainting), or generating new content extending beyond the frame (outpainting), achieving operations like "filling holes" and "expanding the image."

The key to these tasks is **creating new content while preserving constraints**. Diffusion models perform outstandingly here: in inpainting, the model only samples the masked region while keeping the original image unchanged in unoccluded areas, using semantic understanding and contextual information to naturally blend new content with surrounding areas in style and lighting. For style transfer, the model preserves the input structure while sampling textures and colors from the target style distribution, achieving "changing the shell without changing the bones."

In products, image-to-image capabilities support a large number of creative tools: style filters, comic conversion, one-click sky replacement, automatic beautification, old photo restoration, local retouching, etc., typically presented to users through highly visual interfaces.

### 2.9.3 Text-Driven Image Editing: Natural Language as the "Brush"

In traditional image editing software, users need to master a whole set of professional concepts like layers, masks, selections, and filters. **Text-driven image editing** attempts to replace most professional operations with natural language:

- "Change the background to a night city skyline";
- "Make this person wear a black suit";
- "Turn this car into a blue sports car, add motion blur effect."

Technically, text-driven editing is typically built on top of text-to-image diffusion models, implemented through several approaches:

- Searching or sampling in the latent space near the original image, so that the edited image maintains high similarity with the original, changing only in local areas affected by the text;
- Using explicit masks (user-delineated regions) to limit the editing scope to specific areas (this is the "select area then input text instruction" in many tools);
- Introducing "instruction control" modules (e.g., ControlNet, learnable control tokens) to enhance the model's controllability and stability for editing requests.

Jimeng, FLUX, Alibaba Qwen image models, the Stable Diffusion ecosystem, Canva AI, and other products all provide similar capabilities: users can complete complex edits through simple text and minimal interaction. For professional users, this becomes a "smart assistant" that accelerates the creative workflow; for ordinary users, it greatly lowers the barrier to image editing.

## 2.10 Image Quality Assessment (IQA)

In tasks like low-level vision enhancement, compression encoding, and image generation and editing, we often need to answer a seemingly subjective question: **"Does this image look good?"** Manual inspection clearly cannot scale, and traditional metrics like PSNR often do not align with human subjective perception. The goal of **image quality assessment (IQA)** is to establish an automated mechanism for scoring or ranking the subjective/objective quality of images, serving as the key link between "low-level algorithm output" and "real user experience."

From a system perspective, IQA is the "gatekeeper" and "tuning reference" in many pipelines: e-commerce/content platforms use it to filter out blurry, noisy, heavily compressed uploaded images; phone cameras/albums use it to pick the "best shot" from a burst; cloud-based enhancement and compression services use it for before-and-after comparison evaluation to guide model iteration. Below, we organize IQA from three dimensions — **scenarios**, **principles**, and **models** — and expand on evaluation types and metrics/learning paradigms in subsequent subsections.

- **Scenarios**
  - Upload quality inspection and moderation: scoring the quality of user-uploaded images/videos, filtering out content with severe blur, exposure anomalies, obvious noise, and heavy compression artifacts.
  - Smart photo selection and deduplication: in phone albums and camera apps, selecting versions with better sharpness, expression, and composition from multiple similar photos, while identifying low-quality or redundant images for cleanup.
  - Enhancement/compression algorithm evaluation: in A/B testing of algorithms like image enhancement, denoising, super-resolution, and encoding/decoding, using IQA metrics to objectively measure "which strategy is better," assisting parameter search and model selection.
  - Poster/thumbnail auto-selection: automatically selecting frames with higher visual quality and appeal from videos or multi-image collections as cover or poster candidates.
- **Principles**
  The core of IQA is to characterize image quality from two dimensions: **the degree of distortion relative to a reference image** and **the goodness of human subjective perception**:
  - Full-reference IQA (FR-IQA): with a high-quality reference image available, comparing the image under evaluation with the reference pixel-by-pixel or feature-by-feature to measure the degree of distortion, used for algorithm development and experimental evaluation.
  - No-reference IQA (NR-IQA / Blind IQA): more common in real scenarios, with no reference image available — quality can only be inferred from the statistical features or deep features of a single image, requiring the model to learn "what kind of images the human eye likes" from large volumes of images and subjective ratings.
  - Pseudo-reference / reduced-reference IQA: in some scenarios, using an obtainable approximate version (e.g., pre-compression low-resolution image, model-predicted "clean image") as a reference to estimate the degree of degradation, balancing feasibility and evaluation accuracy.
- **Models**
  IQA models are roughly divided into two categories: **traditional hand-crafted feature metrics** and **deep learning-based quality prediction**:
  - Traditional metrics:
    - FR-IQA: PSNR, SSIM, MS-SSIM, FSIM, etc., emphasizing structure, contrast, and phase information, more sensitive to simple degradations (e.g., noise, blur).
    - Perceptual metrics: LPIPS, DISTS, etc., measuring perceptual differences between images in deep feature space, with higher correlation to human subjective perception.
  - No-reference / learning-based IQA:
    - Early methods: BRISQUE, NIQE, BLIINDS series, etc., starting from natural scene statistics (NSS) and hand-crafted features, training shallow models to predict quality scores.
    - Deep NR-IQA: RankIQA, DBCNN, HyperIQA, MUSIQ, etc., directly extracting features from images using CNN / ViT, and training with supervision on MOS (Mean Opinion Score) data to make output quality scores fit human eye evaluations as closely as possible.
    - Pre-trained representations: using features from large models like CLIP, ViT as input or backbone for quality prediction networks, fine-tuning on limited MOS data to improve generalization across complex distortion types.

Overall, IQA is not a single metric where "higher is always better," but an evaluation system related to specific business objectives: in some scenarios (e.g., surveillance enhancement), preserving detail and recognizability is more important than visual naturalness; in content creation platforms, subjective perception and aesthetic standards dominate. Therefore, common industry practice is: building on top of general IQA models, fine-tuning or learning weights with a small amount of business data to construct "task-aware" quality evaluators.

### 2.10.1 Evaluation Types: Full-Reference, No-Reference, and Pseudo-Reference

Based on whether a high-quality reference image exists, IQA can be divided into three categories: **full-reference (FR-IQA)**, **no-reference (NR-IQA)**, and **pseudo-reference**.

In **full-reference IQA**, we assume the existence of an ideal high-quality reference image, and the image under evaluation is its degraded version after compression, transmission, or processing. The model quantifies the degree of distortion by comparing the two pixel-by-pixel or at the feature level. PSNR is the simplest metric (based on mean squared error); SSIM/MS-SSIM/FSIM, etc., further consider brightness, contrast, structure, or phase information, coming closer to human visual perception to some extent. These metrics are very suitable for evaluating methods like encoding/decoding, super-resolution, and denoising during the algorithm development phase, but in real business, reference images are often unavailable, limiting application scenarios.

**No-reference IQA (Blind IQA)** is the more common setting in real systems: only the image under evaluation itself is available, with no reference at all. Early no-reference methods (e.g., BRISQUE, NIQE, BLIINDS, etc.) were mainly based on natural scene statistics: assuming that high-quality natural images have stable forms in certain statistical distributions, and that distortion causes changes in statistical features, allowing models to be trained to predict quality scores based on these features. In the deep learning era, NR-IQA models typically directly use CNN / ViT to extract features and regress quality scores or learn ranking relationships on datasets with human subjective ratings (MOS), enabling them to cover various distortion types like noise, blur, compression artifacts, and exposure anomalies.

**Pseudo-reference / reduced-reference IQA** falls between the two: without a truly high-quality reference, using some obtainable approximate version (e.g., pre-compression low-resolution image, model-predicted "clean image") as a reference to estimate the degree of degradation. This approach is common in online video quality monitoring and encoding/decoding optimization tasks, striking a balance between cost and accuracy.

### 2.10.2 Metrics and Learning Paradigms: From PSNR to Perceptual Quality Prediction

At the specific implementation level, IQA employs various metrics and learning paradigms to approximate human subjective perception.

**Traditional metrics**:

- PSNR is directly based on pixel-level error — simple and efficient, but it also heavily penalizes changes that are imperceptible to the human eye (e.g., slight translation, structure-preserving filtering);
- SSIM, MS-SSIM, FSIM, etc., model image similarity from multiple dimensions like brightness, contrast, structure, and phase, being more sensitive to structural distortions and also reflecting to some degree the human eye's preference for structural information.

**Perceptual metrics**: LPIPS, DISTS, etc., compute vector differences in the internal feature layers of pre-trained deep networks (VGG, AlexNet, ViT, etc.), weighted by the importance of different layers, yielding a "distance in feature space" that has higher correlation with subjective perceptual similarity. They are particularly suitable as training objectives or evaluation metrics for generative tasks (super-resolution, generation, editing), used to measure "how similar it looks."

**Learning-based quality prediction**: deep NR-IQA models (e.g., RankIQA, DBCNN, HyperIQA, MUSIQ, etc.) directly score or rank images:

- In training data, each image comes with a set of subjective ratings (MOS), and the model is trained with this supervision for quality regression or ranking networks;
- In model structure, CNN/ViT + global pooling + MLP are commonly used to output quality scores, or output a quality distribution and take the expectation;
- Some methods also use contrastive learning or pairwise ranking to make the model focus more on "relatively good/bad" relationships rather than absolute scores.

With the widespread adoption of large-scale pre-trained vision models, more and more IQA methods adopt the "pre-trained backbone + lightweight head" paradigm: leveraging rich visual representations from CLIP, ViT, etc., and fine-tuning on relatively little MOS data, thereby maintaining good generalization across distortion types and scenarios.

In engineering deployment, multiple of the above metrics are typically combined: for example, FR-IQA metrics for evaluating algorithm improvements during the experimental phase; deep NR-IQA models for online real-time quality inspection; perceptual metrics for internal optimization of generative tasks. Through A/B experiments, these automatic metrics are aligned with real user data (click-through rate, completion rate, complaint rate, etc.), gradually building a "perceptual quality measurement system" highly correlated with business objectives.
# 3. 3D / Spatial Modality (3D / Spatial / XR)

As applications move from "flat images/video" to autonomous driving, robotics, AR/VR/XR, and similar scenarios, systems are no longer satisfied with merely looking at "2D pixels" — they need to understand **the three-dimensional structure, scale, and pose relationships of the real world**. These tasks are collectively referred to as the 3D / spatial modality: they encompass both precise geometric and topological modeling, as well as semantic understanding, localization and navigation, and content generation within 3D space. On one end, they connect to various sensors such as LiDAR, RGB‑D, and IMU; on the other, they connect to autonomous driving perception modules, robot navigation systems, ARKit/ARCore environment models, mobile 3D scanning and modeling applications, and digital twin platforms.

## 3.1 3D Perception & Reconstruction

In 2D vision, we only see "the world after it has been photographed"; but in scenarios like autonomous driving, robotics, and AR/VR, what matters more is: **the position, shape, and structure of the real world in 3D space**. 3D perception and reconstruction aims to recover the three-dimensional geometric information of the environment from multiple sensors (cameras, LiDAR, depth cameras, etc.) and express it in forms such as point clouds, voxels, meshes, and implicit fields, providing the foundation for path planning, physics simulation, digital twins, and 3D content generation.

In engineering practice, this layer covers multiple technical directions from **point cloud processing** to **multi-view geometric reconstruction** to **neural radiance fields / neural field rendering**, corresponding to product forms such as autonomous driving 3D perception modules, ARKit/ARCore environment modeling, mobile 3D scanning/modeling apps, and digital twin city/campus modeling platforms. The following expands from three angles — **scenarios**, **principles**, and **models** — and further subdivides into several key sub-directions.

- **Scenarios**
  - Autonomous driving and assisted driving: perceiving 3D structures such as vehicles, pedestrians, curbs, lane lines, and traffic facilities from onboard LiDAR point clouds and multi-camera images, used for path planning and safety decisions.
  - Indoor/outdoor environment scanning: using phones/tablets (structured light / ToF / stereo) or handheld scanners to capture multi-view data, building 3D models of rooms, buildings, and neighborhoods in real time for AR modeling, home design, and digital twins.
  - Digital twins and BIM: reconstructing actual factories, campuses, and cities into high-precision 3D models through multi-view imagery and point clouds for operations management, simulation, and visualization.
  - Consumer-grade 3D scanning: mobile 3D scanning apps, one-click "photo-to-3D-model" tools that provide raw geometry for 3D printing, virtual try-on, and game/film asset production.
- **Principles**
  - Point cloud processing: treating sparse/dense point sets obtained from LiDAR or multi-view reconstruction as 3D sampling point sets, performing filtering, registration, downsampling, and feature learning, then doing classification, semantic/instance segmentation, or 3D object detection.
  - Multi-view geometry and 3D reconstruction: using SfM (Structure‑from‑Motion) to estimate camera poses and sparse 3D point clouds across multiple images, then using MVS (Multi‑View Stereo) to generate dense point clouds, followed by mesh reconstruction and texture mapping.
  - Neural radiance fields / neural implicit fields: using methods such as NeRF, Instant‑NGP, and Gaussian Splatting to represent a 3D scene as a continuous volume density/color field or a collection of Gaussian particles, generating images through volume rendering or rasterization and learning from multi-view supervision; once trained, they can perform novel view synthesis and geometry extraction.
- **Models**
  - Point cloud networks: PointNet / PointNet++, PointCNN, DGCNN, MinkowskiNet, etc. learn features directly on points or sparse voxels for point cloud classification, segmentation, and 3D detection. In autonomous driving, 3D detection frameworks such as VoxelNet, SECOND, and CenterPoint are commonly used, converting point clouds into voxel or BEV (Bird's Eye View) features before detection.
  - Geometric reconstruction toolchains: traditional SfM/MVS systems such as COLMAP and OpenMVG / OpenMVS can recover camera poses and dense point clouds from multi-view photos and construct high-quality meshes.
  - Neural field reconstruction and rendering: NeRF / Instant‑NGP, Gaussian Splatting, and numerous improved models encode scenes in neural networks or Gaussian clouds, achieving high-fidelity novel view synthesis and 3D scene reconstruction, progressively forming engineered products. The industry has also seen 3D AI services targeting developers and content production, such as "Hunyuan 3D" and "Tripo," which package NeRF/Gaussian technologies into cloud APIs or interactive tools.

Starting from this layer, traditional geometry, deep learning, implicit representations, and explicit meshes are closely intertwined — the goal is both to solve "how to accurately reconstruct the real world" and to balance real-time performance and usability, serving higher-level 3D scene understanding, 3D generation, and editing.

### 3.1.1 Point Cloud Processing and 3D Object Detection

For autonomous driving, robotics, and high-precision surveying, LiDAR point clouds are one of the most critical forms of 3D sensing information. A point cloud is a sparse set of points composed of 3D coordinates (sometimes accompanied by reflection intensity, timestamps, etc.), lacking a regular grid structure, which poses challenges for traditional convolution. The goal of point cloud processing is to extract useful geometric and semantic information from these unstructured points — for example, "this is a car," "this is a curb/ground," "this is a building."

In **point cloud classification and segmentation** tasks, we typically focus on: which category a given point (or point cluster) belongs to, such as car, pedestrian, ground, curb, building, vegetation, etc., or performing semantic/instance segmentation on the scene. From a modeling perspective, approaches can be roughly divided into three categories:

1. Direct point cloud networks: PointNet / PointNet++, PointCNN, DGCNN, etc. define permutation-invariant operations directly on point sets, building hierarchical features through local neighborhood aggregation, suitable for classification and segmentation of small-to-medium-scale point clouds.
2. Voxelization and sparse convolution: rasterizing point clouds into 3D voxels, then using sparse 3D CNNs (such as VoxelNet, MinkowskiNet) for convolution, balancing structural regularity with spatial sparsity, widely used in autonomous driving 3D detection.
3. Projection and multi-view: projecting point clouds into BEV (Bird's Eye View), front-view depth maps, or multi-view perspectives, then using 2D CNNs to extract features, relatively easy to combine with mature 2D detection networks.

In **3D object detection**, the goal is no longer simply labeling points, but predicting 3D bounding boxes (position, size, orientation) and their categories — this is the core of autonomous driving environment perception. Typical methods such as VoxelNet, SECOND, PointPillars, and CenterPoint usually convert point clouds into voxel or pillar representations and perform detection regression in BEV or 3D space. Methods like CenterPoint use a "center point detection" paradigm, directly detecting object centers and their sizes/orientations on BEV, balancing accuracy and speed. As deep learning and sensor hardware evolve, 3D detection can now achieve real-time inference on automotive-grade chips, becoming one of the foundational modules of the autonomous driving perception stack.

### 3.1.2 Multi-View Geometry and 3D Reconstruction: From Photos to Mesh

Without LiDAR, can we still "understand" 3D? The answer is yes — multi-view geometry and 3D reconstruction rely on "multiple photos + camera motion." By capturing the same scene from different viewpoints, we can use geometric constraints to recover camera poses and spatial structure — this is the classic SfM/MVS pipeline.

**SfM (Structure‑from‑Motion)** primarily solves two problems:

1. Estimating the camera extrinsic parameters (position and orientation) for each image from multiple pairwise or multi-view images;
2. Recovering a set of sparse 3D feature points in a unified coordinate system.

Typical tools such as COLMAP and OpenMVG, through feature extraction and matching (SIFT/ORB, etc.) and incremental or global BA (Bundle Adjustment), can automatically recover sparse point clouds and camera poses from uncalibrated image collections.
Building on this, **MVS (Multi‑View Stereo)** uses multi-view photometric consistency to generate dense point clouds: performing depth estimation for each pixel/ray, gradually filling in the geometric details of the scene.

After obtaining a dense point cloud, the next step is **mesh reconstruction**:

- Through Poisson Surface Reconstruction, Marching Cubes, or learning-based methods, the scattered point cloud is "wrapped" into a continuous surface, forming a mesh with topological structure.
- This is typically followed by hole filling, smoothing, boundary optimization, and texture mapping, yielding a 3D model that can be directly used for rendering and editing.

In terms of product form, this entire pipeline has been delivered through desktop software, cloud services, and SDKs. For example: 3D scanning apps on phones call SfM/MVS-like processes in the background, automatically outputting a mesh model that can be imported into game engines after the user "circles around and takes photos" or "scans a video"; digital twin platforms run large-scale reconstruction at the city/campus scale using aerial imagery + street view data to generate interactive 3D scenes.

### 3.1.3 Neural Radiance Fields and Volume Rendering: NeRF, Gaussian, and Next-Generation 3D Reconstruction

Traditional SfM/MVS/mesh reconstruction can produce well-structured explicit geometry, but still has limitations in rendering quality, viewpoint continuity, and detail representation; neural radiance fields (NeRF) and its follow-up work have redefined 3D reconstruction and novel view synthesis through **implicit fields + volume rendering**.

In NeRF, the entire 3D scene is modeled as a continuous function:

$$
F_\theta(\mathbf{x}, \mathbf{d}) = (\sigma, \mathbf{c})
$$

where $\mathbf{x}$ represents the position of a point in 3D space, $\mathbf{d}$ represents the viewing direction, $\sigma$ represents volume density, $\mathbf{c}$ represents color, and $\theta$ represents network parameters.

Given a point position x and viewing direction d in 3D space, the network outputs the corresponding volume density σ and color c at that point. By performing volume rendering integration along the camera ray direction on this mapping function, we can obtain the pixel color for that camera pose; conversely, given a set of multi-view photos and their camera parameters, we can solve for the model parameters θ by minimizing the error between rendered results and real images. Once the model is trained, simply changing the camera pose allows synthesizing novel view images that were "never actually photographed" (Novel View Synthesis).

Traditional NeRF has relatively slow training and rendering speeds; subsequent work such as **Instant‑NGP** uses techniques like multi-resolution hash grid encoding to dramatically accelerate convergence and inference; **Gaussian Splatting** replaces scene representation with 3D Gaussian particles, achieving high-quality, real-time novel view rendering through efficient rasterization strategies. Meanwhile, a large body of work has extended NeRF/Gaussian with editability, multimodality, and composability, gradually moving from research prototypes to engineering systems.

At the productization level, NeRF/Gaussian technologies have been embedded into various 3D AI products:

- Mobile/PC "multi-view video → 3D scene" tools, whose underlying layers often use neural fields or Gaussian particles for reconstruction and rendering;
- Game/film asset pipelines that use neural fields for rapid scene capture and lighting recovery, then export as Mesh + textures for use in traditional DCC tools;
- 3D AI services launched by major cloud providers and content platforms, such as Tencent's "Hunyuan 3D" and Tripo, typically supporting "multi-view photos/short videos → editable 3D models/scenes," internally combining neural radiance fields, SDF/Gaussian representations, and subsequent explicit reconstruction to package high-quality 3D results into developer-friendly APIs or interactive products.

## 3.2 3D Scene Understanding & SLAM

If 3D perception and reconstruction answers "what does this world look like," then 3D scene understanding and localization further answers: "**Where am I in this world? Which places in this world are traversable, and which are obstacles?**" For robot vacuums, AGV robots, drones, AR navigation, and indoor positioning systems, the ability to self-localize, self-map, and autonomously plan paths in a 3D environment is a prerequisite for survival.

This body of work primarily revolves around **3D semantic understanding** and **SLAM (Simultaneous Localization and Mapping)**: the former performs semantic segmentation and traversable region identification within reconstructed 3D scenes, while the latter uses visual/IMU/LiDAR and other sensors for camera/robot pose estimation and map construction. In engineering, this layer is typically embedded as SDKs or algorithm modules into robot chassis, drone flight controllers, or mobile AR engines.

- **Scenarios**
  - Home and service robots: robot vacuums, food delivery/patrol robots build maps in indoor environments, identify room types and obstacles, and automatically plan cleaning or patrol paths.
  - Warehousing and logistics: AGV/AMR robots perform autonomous navigation in warehouses, identifying shelves, aisles, and restricted areas to complete transport and inventory tasks.
  - Drones and outdoor robots: build 3D maps in outdoor environments, avoiding buildings, trees, power lines, and other obstacles to perform inspection, surveying, and security tasks.
  - AR navigation and indoor positioning: phones/AR glasses obtain camera pose through SLAM, overlay navigation arrows, room information, and POIs on semantic maps, enabling immersive guided tours and navigation.
- **Principles**
  - 3D semantic segmentation and scene understanding: performing semantic segmentation on point cloud or voxel representations to distinguish walls, floors, tables and chairs, shelves, doors and windows, and other structures, while identifying traversable regions and obstacles, providing semantic-layer information for navigation and behavioral decisions.
  - Pose estimation and SLAM: using Visual SLAM (monocular/stereo / RGB‑D) or LiDAR‑SLAM to estimate the 6D pose of the camera/robot from continuous sensor data, handling loop closure detection and map optimization, and fusing multi-source information such as IMU, wheel odometry, and GNSS when necessary to improve robustness.
  - Map construction and navigation: overlaying geometric and semantic information on local/global maps to form 2D/3D/topological/semantic maps, and performing path planning, obstacle avoidance, and task assignment on this basis.
- **Models**
  - SLAM systems: classic feature-point methods such as the ORB‑SLAM series, direct methods such as DSO, and inertial-fused systems such as VINS‑Mono / VINS‑Fusion, achieving precise pose estimation and dense/semi-dense maps through frontend feature tracking + backend optimization. In LiDAR/visual‑LiDAR fusion, frameworks such as LIO‑SAM are common.
  - 3D semantic segmentation networks: 3D U‑Net, MinkowskiNet, and other 3D CNNs, as well as point-cloud-based PointNet++ / KPConv / SparseConv series for semantic and instance segmentation of point clouds/voxels.
  - Multi-sensor fusion localization: methods based on graph optimization or filtering (EKF/UKF) that fuse visual, IMU, LiDAR, odometry, and other multi-source information in a unified state space, improving localization stability in harsh lighting, texture-poor, or dynamic environments.

Overall, 3D scene understanding and localization form the foundation for robots to "get moving": they must both build a reliable self-localization framework in complex 3D worlds and make maps "meaningful," thereby supporting high-level task planning and human-robot interaction.

### 3.2.1 3D Semantic Segmentation and Traversable Region Understanding

In a purely geometric map, all structures are just undifferentiated points/voxels; in real applications, what we care about is: where is the ground, where are the walls, where are tables or shelves, and where is traversable. **3D semantic segmentation** aims to assign a semantic label to every point or voxel, transforming "pure geometry" into "geometry + semantics."

In indoor/outdoor scenes, typical targets include:

- Fixed structures: walls, floors, ceilings, stairs, columns, roads, curbs, etc.;
- Furniture and fixtures: tables and chairs, cabinets, shelves, doors and windows, handrails, etc.;
- Traversable/non-traversable regions: robot-walkable areas, obstacles to circumvent, restricted zones, etc.

In terms of modeling, 3D semantic segmentation commonly uses:

- Voxel/sparse convolution approaches: after voxelizing point clouds, using sparse CNNs such as 3D U‑Net and MinkowskiNet to learn voxel-level features, balancing local details and global structure.
- Direct point cloud approaches: PointNet++, KPConv, and other point cloud networks that perform feature aggregation on local neighborhoods for point-level semantic prediction.

In applications such as robot vacuums and AGV robots, semantic segmentation results are further abstracted into **semantic maps**: for example, dividing rooms into bedroom/living room/kitchen, and dividing warehouse spaces into shelf areas/aisles/restricted zones. Robots not only know "where they can go" but can also tailor different strategies based on room type (e.g., avoiding carpeted areas in bedrooms, prioritizing certain shelf zones in warehouses).

### 3.2.2 Pose Estimation, SLAM, and Multi-Sensor Fusion Localization

The goal of **SLAM (Simultaneous Localization and Mapping)** is: in an unknown environment, to estimate one's own trajectory while moving and simultaneously build a map of the environment. For indoor environments without high-precision external positioning (such as RTK‑GNSS), SLAM is the preferred solution for the vast majority of robots and AR engines.

In visual SLAM, methods represented by ORB‑SLAM, DSO, and VINS‑Mono/VINS‑Fusion are typically divided into several key modules:

- Frontend: extracting and tracking keypoints/image patches from consecutive images, estimating relative pose between adjacent frames.
- Backend: performing BA or graph optimization within a sliding window or global graph, handling drift, loop closure detection, and relocalization.
- Mapping: constructing dense or semi-dense maps based on pose and depth information, providing the foundation for subsequent navigation or rendering.

Pure vision tends to fail in texture-poor areas or under drastic lighting changes, so in practice **multi-sensor fusion localization** is generally adopted:

- Visual + IMU: frameworks such as VINS‑Mono/VINS‑Fusion combine the high-frequency short-term accuracy of IMU with the scale and geometric constraints of vision, significantly improving stability in short-term and sharp-turn scenarios.
- LiDAR + IMU + vision: odometry frameworks such as LIO‑SAM introduce inertial navigation and optional visual information into LiDAR‑SLAM, leveraging the complementary nature of the three to achieve robust localization, widely used in autonomous driving and high-precision surveying.

At the product level, these methods are typically encapsulated as part of robot chassis controllers, drone flight controllers, AR engines (such as Visual‑Inertial SLAM in ARKit/ARCore), or indoor positioning SDKs, shielding upper-layer applications from complex state estimation and graph optimization logic, allowing developers to directly obtain "real-time pose + map."

### 3.2.3 Semantic Maps, Navigation, and Obstacle Avoidance

With stable pose estimation and geometric/semantic maps in place, the next step is to make the robot "move intelligently." This part primarily involves **semantic map construction, path planning, and obstacle avoidance**.

- **Semantic map construction**: overlaying semantic information (room types, POIs, region labels) on geometric maps to form map representations suitable for high-level decision-making. For example:
  - In home scenarios, dividing the map into areas such as bedrooms, living room, kitchen, and bathrooms;
  - In warehouse scenarios, labeling shelf locations, loading/unloading zones, hazardous areas, etc.;
  - In large malls/exhibition halls, labeling stores, service desks, restrooms, and other POIs for AR navigation and guided tours.
- **Path planning and obstacle avoidance**: building grid maps or topological maps, using planning algorithms such as A*, D* Lite, and RRT to find feasible paths from start to goal for the robot; simultaneously combining real-time perception (obstacles ahead, dynamic pedestrians/vehicles) for local replanning and obstacle avoidance, ensuring operational safety and efficiency.
- **Navigation behavior and task scheduling**: in AGV robots and drones, task scheduling and multi-robot coordination modules are layered on top of navigation: assigning tasks, avoiding congestion, and optimizing overall paths and energy consumption.

AR navigation and indoor positioning systems also essentially rely on similar semantic maps and path planning, except the "executor" changes from a robot to a person: the system obtains the user's device pose through SLAM, plans a walking path on the semantic map, and then visualizes the path as an augmented reality overlay on the real-world view.

## 3.3 3D Generation & Editing

If 3D perception and SLAM are about "capturing and understanding" geometry from the real world, then 3D generation and editing take the perspective of content production: **how to use AI to automatically produce and modify 3D assets**. This directly addresses the enormous content demands of gaming, film, digital humans, virtual spaces, e-commerce displays, 3D printing, and more.

In the past two to three years, with breakthroughs in technologies such as NeRF/Gaussian, SDF representations, and multimodal diffusion models, 3D generation has entered a period of rapid development: one-click generation of 3D models or scenes from text, images, and video has become a reality, and major cloud providers and startup teams have launched products such as "Hunyuan 3D," Tripo, and the DreamFusion / Magic3D series of methods, implemented as online tools, gradually moving 3D production toward "accessible to everyone." 3D generation and editing can be roughly divided into four capabilities: text-to-3D, image/video-to-3D, model optimization and editing, and rigging and animation.

- **Scenarios**
  - Game / film asset production: rapidly generating usable 3D models for characters, props, buildings, and scenes, significantly reducing art workload.
  - E-commerce and product display: automatically generating 3D display models from product copy or photos for 3D preview, AR placement, and interactive advertising.
  - Digital humans and virtual content: rapidly generating 3D assets such as virtual humans, virtual fitting models, and virtual streamer scenes, supporting live streaming, short videos, and interactive applications.
  - 3D printing and personalized modeling: generating printable models from sketches/photos/text, enabling personalized gifts, prototype design, and educational scenario applications.
- **Principles**
  - Text‑to‑3D: encoding text descriptions as semantic vectors, then generating 3D representations (NeRF/SDF/Gaussian/Mesh) through multi-stage optimization or diffusion processes, often leveraging powerful 2D text-to-image models as "scorers" or priors.
  - Image / video‑to‑3D: using single or multiple images, or multi-view video as supervision, combined with NeRF, SDF, or implicit/explicit hybrid representations, to reconstruct 3D models with geometry and textures.
  - 3D model optimization and editing: performing retopology, simplification, detail enhancement, LOD generation, UV unwrapping, and texture generation on existing models, as well as language/image-based deformation and stylization.
  - Rigging and animation: automatically inferring skeletal structures for 3D characters and completing rigging, supporting skeletal animation and physics simulation (cloth, soft bodies, rigid bodies), forming drivable dynamic assets.
- **Models**
  - Foundational 3D generation representations: NeRF / Instant‑NGP, SDF (implicit surfaces), Gaussian Splatting, and mesh-based generation networks, constituting the expression space for 3D data.
  - Text‑to‑3D methods: typical approaches such as DreamFusion, Magic3D, and Fantasia3D, completing end-to-end generation from text to 3D through "2D text-to-image model + 3D optimization" or "3D diffusion models," laying the technical foundation for later products such as Hunyuan 3D and Tripo.
  - Image/video‑to‑3D models: reconstruction and optimization frameworks based on NeRF/SDF/Gaussian, recovering stable 3D geometry and textures from multi-view consistency and single-view priors.
  - Rigging and animation algorithms: automatic skeleton extraction, skeletal weight prediction, deep-learning-based retargeting and motion generation, providing one-click tools for virtual human/character animation.

In this layer, traditional 3D DCC (Maya/Blender/3ds Max, etc.) and AI toolchains are gradually merging: many 3D AI services are embedded into existing production workflows as plugins or cloud interfaces, allowing modelers/artists to rapidly iterate assets through human-AI collaboration.

### 3.3.1 Text‑to‑3D and Scene Rough Models

The goal of **Text‑to‑3D** is: given a natural language description, such as "a cartoon-style yellow duck toy with a blue scarf, suitable for children's toy display," the system automatically generates an editable 3D model (Mesh/NeRF/SDF/Gaussian, etc.). This is a classic application of combining large language models / multimodal models with 3D representations.

Typical technical paths include:

1. **Optimization based on 2D text-to-image models** (e.g., DreamFusion, Magic3D):
2. Using powerful Text‑to‑Image models (such as diffusion models) as "evaluators," given an image rendered from a 3D representation at a certain viewpoint, assessing how well it matches the text description.
3. Through gradient optimization or diffusion processes, iteratively adjusting the 3D representation (NeRF/SDF/Mesh) so that images rendered from multiple viewpoints all conform to the text semantics.
4. **3D diffusion models / direct generation**:
5. Treating 3D data (point clouds, voxels, implicit field parameters, Gaussian particles, etc.) as the generation target of diffusion models, pretrained on large-scale 3D datasets;
6. Achieving end-to-end Text‑to‑3D sampling through text-conditioned control.

At the scene level, **scene rough model** capabilities allow users to describe spatial layouts using natural language or rough sketches — for example, "a living room with floor-to-ceiling windows, an L-shaped sofa on the left, a coffee table in the middle, and bookshelves and a TV stand on the right" — and the system automatically builds a geometrically and semantically reasonable 3D layout sketch. Subsequently, models and materials can be refined in DCC tools, or usable scene prototypes can be quickly produced directly through the "scene generation" capabilities in tools like Hunyuan 3D and Tripo.

Currently, multiple platforms have launched Text‑to‑3D products for designers and developers:

- "Hunyuan 3D" and similar platforms integrate text-to-3D, multi-view generation, and reconstruction capabilities into a unified interface, supporting rapid generation of characters, props, and scenes from text, then exporting to game engines;
- Tripo-class products emphasize "multimodal input + one-click 3D output," supporting mixed simple text and reference images to guide the generation of 3D assets that meet style and structure requirements.

### 3.3.2 Image / Video‑to‑3D and Model Optimization & Editing

Compared to pure text, generating 3D models from images or video provides stronger geometric constraints and better visual consistency. Therefore, a large number of 3D AI products support **image-to-3D / video-to-3D**:

- Single photo → rough 3D: using single-view priors (such as shape priors for faces, human bodies, and common object categories) to infer approximate 3D geometry, generating 3D models suitable for preview or simple interaction.
- Multiple photos / short video → high-quality 3D: comprehensively using NeRF/SDF/Gaussian reconstruction, multi-view geometry, and post-processing to convert dozens of photos or a few seconds of video into high-fidelity 3D models, suitable for game/film assets or high-quality e-commerce displays.

Generating 3D geometry is only the first step; substantial **model optimization and editing** work is still needed afterward:

- Retopology and simplification: converting implicit fields or high-polygon meshes into structurally regular, face-count-controllable topology for rigging, animation, and real-time rendering.
- LOD generation: automatically generating multi-level detail models (Level of Detail), using low-poly models at a distance and high-poly models up close, balancing image quality and performance.
- UV unwrapping and texture generation: automatically unwrapping UVs for models, generating or optimizing normal maps, displacement maps, roughness/metallic maps, and other PBR materials; some models also support automatically generating stylized textures from text or reference images.
- Geometry and style editing: making localized modifications based on language or example images, such as "make this chair's legs a bit shorter" or "change this building to a cyberpunk style," typically implemented through shape latent space manipulation or neural field editing.

Products such as Hunyuan 3D and Tripo often connect the above workflows end-to-end: users start from photos/videos or simple text, and the system internally completes reconstruction, retopology, texturing, and export, allowing non-professional users to obtain "plug-and-play" 3D models within minutes, dramatically shortening the time from concept to asset.

### 3.3.3 Rigging, Animation, and Dynamic 3D Assets

Static models are only half the content; 3D assets that "can move" are more critical in gaming, film, virtual humans, and interactive applications. This involves **skeletal rigging, weight painting, animation, and physics simulation** — traditionally high-barrier professional tasks that are now increasingly assisted or even semi-automated by AI tools.

- **Automatic rigging**: given a character mesh, the system automatically infers the skeletal hierarchy (spine, limbs, fingers, etc.) and the positions of bones within the model, and predicts the weight of each vertex relative to each bone. Recent deep learning methods can learn this mapping on large-scale rigged character datasets, achieving one-click skeletal rigging.
- **Animation and motion generation**: overlaying motion data (mocap or AI-generated) on existing skeletons to produce walking, running, facial expressions, gestures, and other animations; deep-learning-based motion generation and retargeting can transfer human motions from video or motions from other characters onto new characters.
- **Physics simulation**: performing physics simulation on cloth, soft bodies, rigid bodies, etc., making the movement of hair, clothing, flags, and soft objects more natural. Some systems use neural networks to accelerate or approximate physics, making physical effects in real-time engines more realistic.

In terms of products and ecosystems, these capabilities are often embedded in:

- Game / film asset toolchains: providing modelers with one-click rigging, automatic weight assignment, and basic motion libraries, significantly reducing repetitive labor;
- Virtual human / digital asset creation platforms: starting from character photos or scans, going through 3D reconstruction + automatic rigging + motion driving to output virtual humans that can be driven in live streaming, short videos, and interactive applications;
- 3D AI platforms (such as Hunyuan 3D, Tripo, and similar products): adding rigging and simple animation capabilities on top of 3D generation, so that "generated characters can immediately start moving" without requiring complex DCC tool operations.

As 3D generation and editing technologies mature, the entire 3D content production pipeline is evolving from "centered on professional DCC tools" to "AI-driven human-AI collaboration": AI handles generation and extensive foundational work, while humans make more decisions on style definition, quality control, and key design nodes. Hunyuan 3D, Tripo, and other next-generation 3D AI products are a concentrated manifestation of this trend, providing faster and more accessible 3D infrastructure for upstream gaming, film, AR/VR, digital twin, and virtual human applications.
# 4. Audio / Speech

In the overall technology stack, "audio" corresponds to the perception and generation of acoustic signals: it includes not only the processing of raw waveforms and spectra, but also converting speech to text, understanding "who is speaking" and "what is being said," as well as further creating and synthesizing sound and music. Similar to vision, audio can also be broken down into multiple layers: the bottom layer of **waveform and spectrum processing** is responsible for "hearing clearly"; the middle layer of **speech recognition and speaker technology** is responsible for "understanding who is saying what"; above that are more abstract layers of **audio/music understanding** and **speech and music generation**. This entire set of capabilities collectively supports products such as real-time meeting captions, voice assistants, podcast post-production tuning, smart speakers, acoustic security monitoring, and music recommendation and generation.

## 4.1 Waveform-Level Audio Processing: Starting from "Hearing Clearly"

At the lowest level of audio technology, what we first care about is not "what is being said," "who is speaking," or "what style of music this is," but rather **whether the sound itself is clean and clear enough to hear**. This layer primarily works at the waveform and spectrum level, using operations such as resampling, enhancement, noise reduction, and separation to process noisy, distorted, and mixed raw audio into "clean signals" that are more suitable for subsequent recognition, analysis, and generation. It can be likened to "image enhancement + denoising + foreground/background separation" in vision — it is more about performing acoustic-level cleanup rather than directly processing semantics.

From a product perspective, this layer is almost "invisible" behind every audio product: real-time noise reduction in meeting software, post-production tuning for podcasts and short videos, the "voice enhancement mode" in voice recorders and phones, the "beautify voice" toggle on live streaming platforms, and the front-end preprocessing for ASR/speaker verification models — all of these are direct manifestations of waveform-level audio processing. Below, we continue to organize this from three angles — **scenarios**, **principles**, and **models** — and in subsequent subsections we will specifically expand on three key directions: preprocessing & feature extraction, enhancement & noise reduction, and sound source separation.

- **Scenarios**
  - Online communication and meetings: Zoom, Tencent Meeting, etc., in noisy offices, open workstations, and home environments, suppress keyboard sounds, tapping, street noise, and echo in real time to make speech clearer.
  - Content creation and post-production tuning: In podcast, short video, and live streaming post-production, automatically eliminate background noise, electrical hum, and room reverberation, repair recording pops and frequency band gaps, and improve overall listening quality.
  - Recording and transcription front-end: Voice recorders, smart captions, and meeting transcription services perform VAD, noise reduction, and loudness normalization before entering ASR, improving back-end recognition robustness.
  - Terminals and IoT: "Far-field pickup" and "noise reduction modes" on devices such as smart speakers, in-vehicle systems, and cameras capture the primary speaker or key sound sources as much as possible in complex acoustic fields.
- **Principles**
  Waveform-level processing usually does not directly understand semantics; instead, it performs signal optimization around spectral structure and statistical characteristics:
  - Transform back and forth between the time domain and frequency domain (e.g., STFT → spectrum/Mel-spectrogram → iSTFT), suppressing or modeling noise bands, reverberation characteristics, or background sounds.
  - Use VAD and energy/spectral features to distinguish "segments with speech" from "silence/noise segments," reducing the impact of invalid segments on the back end.
  - Use deep learning or classical filtering methods to estimate masks or gain functions for "clean speech spectrum" and "noise spectrum," weighting the spectrum to achieve enhancement and noise reduction.
  - In multi-source mixing scenarios, use end-to-end separation networks or sparse representations to unmix different speakers, vocals and accompaniment, and foreground and background ambient sounds into independent tracks.
- **Models**
  Models at the waveform/spectrum level can be roughly divided into two categories: **spectral-domain models** and **time-domain end-to-end models**:
  - U-Net series on spectrograms/Mel-spectrograms: Spectrogram-based U-Net, DCCRN, etc., performing "image-style" convolution and encoding–decoding on the time–frequency plane — a common approach for tasks such as speech enhancement and singing voice separation.
  - Waveform end-to-end models: Wave-U-Net, Conv-TasNet, Demucs, etc., modeling directly on time-domain waveforms, avoiding explicit STFT/ISTFT, and often achieving better results in subjective listening quality and time-domain fidelity.
  - Classical signal processing methods: Traditional frequency-domain methods such as spectral subtraction and Wiener filtering are still widely used in lightweight devices or latency-sensitive scenarios, often combined with deep enhancement networks to form "hybrid solutions."

### 4.1.1 Preprocessing & Feature Extraction: "Clearing the Stage" for the Back End

Any subsequent ASR, speaker verification, event detection, TTS, and other models require audio input that is as unified, clean, and structured as possible — this is the responsibility of the preprocessing and feature extraction layer. It handles the most basic yet critically important tasks of "clearing the stage" and "format unification," setting the stage for upstream audio models.

In the preprocessing stage, the collected audio first undergoes **sample rate conversion and channel conversion**: for example, converting 48kHz stereo to 16kHz mono to meet the input specifications of downstream models and reduce computational cost. Subsequently, loudness normalization, DC offset removal, simple filtering, etc., are performed to make audio recorded from different devices and scenarios more consistent on the energy scale.

**Voice Activity Detection (VAD)** is another key component of preprocessing. It attempts to automatically segment "speech segments" and "silence/pure noise segments" in the audio stream, often based on frame energy, spectral entropy, zero-crossing rate, or small neural network discrimination. The benefit of VAD is that it can significantly reduce the amount of invalid data fed into ASR/speaker verification models, lowering computational load while preventing silence segments from interfering with recognition (e.g., being misrecognized as long strings of spaces or strange characters). In real-time communication, VAD can also drive the "voice activity indicator" and automatic mute logic.

At the feature extraction level, the most common approach is to convert the time-domain waveform into a **spectrum** or **Mel-spectrogram**. Through the Short-Time Fourier Transform (STFT), audio is decomposed into a frequency distribution that varies over time; through Mel filter banks, more perceptually relevant Mel-spectrograms or Mel cepstral features (such as log Mel-spectrogram, MFCC) can be obtained. These time–frequency features provide a "two-dimensional representation" for subsequent recognition, separation, and generation, analogous to grayscale images or multi-channel feature maps in vision, making them convenient for convolution, attention, and other architectures to process. With the development of end-to-end modeling, more and more models are learning features directly from waveforms (e.g., Wav2Vec 2.0), but in engineering practice, the combination of STFT + Mel features remains the most common and reliable front-end.

### 4.1.2 Enhancement & Noise Reduction: Restoring "Muddy Sound" to "Dry Sound"

In real environments, sound almost always propagates through noise and reverberation: air conditioning hum, keyboard clicks, road noise, crowd chatter, and room echo all degrade the intelligibility and subjective quality of speech and music to varying degrees. The goal of **speech enhancement and noise reduction** is to suppress these background interferences while preserving the naturalness and completeness of speech as much as possible, restoring "muddy" sound to "clean" sound.

In traditional methods, this task is primarily achieved through frequency-domain techniques such as spectral subtraction and Wiener filtering: first estimate the noise spectrum, then "subtract" the noise or adjust frequency band gains on the spectrum according to certain rules. While simple to implement and offering good real-time performance, these methods tend to produce noticeable "musical noise" and artifacts in scenarios with strong noise, non-stationary noise, and complex reverberation.

Deep learning methods, on the other hand, learn a **mapping** on the spectrum or waveform: given noisy speech, predict a time–frequency mask or directly predict the clean waveform. Common approaches include using **Spectrogram-based U-Net, DCCRN**, and other encoder–decoder architectures on Mel/linear spectrograms to carefully repair the spectrum of each frame; there are also end-to-end waveform enhancement methods using models such as **Conv-TasNet, Demucs, Wave-U-Net** directly on time-domain waveforms. These methods can significantly improve speech clarity and subjective listening quality in scenarios such as voice calls, online meetings, and recording restoration.

In content creation and post-production, "recording restoration" often also involves reducing plosives, cutting sibilance, compensating for frequency band gaps, as well as equalization (EQ) and dynamic processing (compressor/limiter) — operations that are more "audio engineer" in nature. An increasing number of tools combine these traditional processes with deep models to provide one-click "audio repair" and "audio beautification" capabilities, serving podcasters, video creators, and live streaming platforms.

### 4.1.3 Sound Source Separation: Unmixing the "Mix"

If enhancement and noise reduction are about "making the main sound more prominent and the background quieter," then **sound source separation** goes a step further by attempting to completely split multiple mixed sound sources into independent tracks. For example: multiple speakers talking simultaneously in a meeting recording; vocals and accompaniment mixed together in music; key events (such as alarms, shouting) buried in background noise in environmental recordings. The goal of sound source separation is to recover the waveform or spectrum of each individual sound source from a single or multiple mixed signals.

In the speech domain, **multi-speaker separation** is a core application: the model needs to separate multiple overlapping voices into different channels based on speaker embeddings, time–frequency structure, and speaker characteristics, without separate microphone tracks. This capability not only improves the performance of multi-speaker ASR but also provides cleaner input for speaker diarization. In the music domain, **vocals/accompaniment separation (singing voice separation)** can extract clear vocal tracks and pure accompaniment tracks from a mixed song, used for covers, remixes, karaoke, music analysis, and more. Similarly, **ambient sound/foreground sound separation** can be used in security and IoT scenarios to extract key event sounds (such as glass breaking, conflict sounds) from complex backgrounds.

At the model level, sound source separation typically employs stronger modeling capabilities and more complex architectures than ordinary enhancement. End-to-end networks such as **Conv-TasNet, Demucs, Wave-U-Net** can directly perform multi-source decomposition in the time domain; in the spectral domain, multi-branch U-Net, attention, mask estimation, and other architectures are common, predicting specialized masks or spectra for different sound sources. With the growth of training data and computational resources, modern sound source separation models can already output high-quality separated tracks usable for practical creation and analysis in fairly complex reverberation and noise environments, providing a solid foundation for live voice beautification, multi-speaker meetings, music production, and audio retrieval.

## 4.2 Speech Recognition & Describeer Technology (ASR & Describeer)

After completing preprocessing, enhancement, and separation at the waveform level, we can finally begin to ask higher-level questions: **"What is being said in the audio?" "Who is speaking?" "When is who speaking?"** This layer focuses on various "understanding and annotation" tasks centered around speech itself: Automatic Speech Recognition (ASR), speaker recognition and verification, speaker diarization, and hotword and keyword detection (KWS) for interaction.

From a product perspective, this layer is the core of the vast majority of "voice products": voice input methods, meeting transcription, customer service recording analysis, intelligent customer service quality inspection, smart speaker and in-vehicle voice interaction, phone robots, and voiceprint verification in financial scenarios — almost all directly depend on these technologies. They transform the "clean sound" from the previous layer into text sequences, speaker labels, or keyword events, serving as one of the most important bridges from audio to the semantic world.

- **Scenarios**
  - Automatic Speech Recognition (ASR): Real-time captions, voice input methods, meeting and classroom recording, customer service call transcription, providing users with an immediate "hearing to text" channel.
  - Speaker Recognition and Verification: "Voiceprint unlock" and "voiceprint verification" in phones/banking/call centers, as well as searching for a specific speaker in massive amounts of recordings.
  - Speaker Diarization: In meetings, interviews, and roundtable discussions, automatically answering "who is speaking when," enabling "speaker-attributed transcription."
  - Hotword and Keyword Detection (KWS): Wake word detection in smart speakers/in-vehicle systems ("Hey Siri," "OK Google"), as well as capturing key phrases (such as "complaint," "refund," "upgrade," etc.) in customer service recordings and quality inspection.
- **Principles**
  Most tasks in this layer can be uniformly viewed as performing **time alignment and sequence labeling** on audio sequences:
  - ASR: Given a segment of speech, learn the mapping from acoustic features to text sequences, often using CTC, RNN-Transducer (RNN-T), or attention-based end-to-end architectures; modern models typically use large-scale pre-training (e.g., Wav2Vec 2.0, Whisper, etc.) followed by fine-tuning.
  - Speaker Recognition: Extract a fixed-dimensional **speaker embedding** (e.g., x-vector, ECAPA-TDNN) from audio. In this embedding space, voices from the same person are close to each other, and voices from different people are far apart, which is then combined with metric or classification models for recognition and verification.
  - Speaker Diarization: Comprehensively use speaker embeddings, VAD, segment clustering, or end-to-end networks (EEND) to assign speaker labels to each time slice, thereby piecing together a "multi-speaker timeline on the time axis."
  - KWS: Perform low-latency small-model detection on continuous audio streams, conducting local pattern matching and confidence evaluation for predefined wake words or keywords, balancing low computational cost with high recall.
- **Models**
  The model landscape for ASR and speaker technology includes both end-to-end architectures and specialized embedding models and clustering methods:
  - ASR: Wav2Vec 2.0, Conformer, Whisper, RNN-T, Citrinet, etc., mostly using convolution + self-attention or pure self-attention architectures, supporting multilingual, large-vocabulary, and long-context scenarios.
  - Speaker Embedding: ECAPA-TDNN, x-vector, i-vector, etc., trained through classification or metric learning on large amounts of speaker data to obtain robust speaker feature spaces.
  - Diarization: From the traditional pipeline of VAD + segmentation + clustering, to end-to-end methods such as End-to-End Diarization (EEND) that directly output a "time × speaker" matrix.
  - Hotword/Keyword Detection: Lightweight CNN/RNN/Transformer front-ends combined with CTC or gating mechanisms, embedded locally on devices for always-on listening at ultra-low computational cost and latency.

### 4.2.1 Automatic Speech Recognition (ASR): Turning "Sound" into "Text"

**Automatic Speech Recognition (ASR) is the main "audio → text" pathway: whether it's voice input methods, meeting transcription, smart captions, or customer service recording analysis, the first step is always to accurately convert what the user says into text. Modern ASR systems mostly adopt end-to-end architectures**: starting from acoustic features (such as Mel-spectrograms or raw waveforms), going through a series of deep networks (such as Conformer, Citrinet, Transformer-based Encoders), and directly outputting text sequences or corresponding token sequences.

In terms of modeling, the main challenges of ASR include long-range dependencies, multilingualism and dialects, accent variations, overlapping speech, background noise, and domain-specific terminology. To address these, the current mainstream direction is to use large-scale unlabeled audio for self-supervised pre-training (such as Wav2Vec 2.0, HuBERT), or to perform large-scale supervised training on multilingual and multi-task data (such as Whisper), and then fine-tune with relatively small amounts of domain-specific data, thereby achieving good robustness across different languages, accents, and scenarios.

At the product level, ASR is typically packaged as capabilities such as "voice input SDK," "cloud speech recognition API," and "meeting transcription service": the front-end can be real-time streaming recognition (RNN-T, streaming Transformer, etc.), while the back-end can enhance recognition of specific person names, place names, brand names, and business terminology through hotword injection, custom vocabularies, and contextual constraints. These recognition results often serve as the foundation for subsequent NLP, dialogue systems, and data analysis.

### 4.2.2 Describeer Recognition & Diarization: Answering "Who" and "When"

Compared to "what is being said," **"who is speaking" is equally important in many applications: scenarios such as finance, government, customer service, and security require voiceprint recognition** to verify identity or investigate risks; while meeting and interview scenarios need to know "who said each sentence" to support speaker-attributed transcription, speaking statistics, and behavioral analysis.

In the **Speaker Recognition/Verification** task, the system's goal is: given a segment of speech, determine who the speaker is, or determine whether it matches a registered speaker. Modern systems typically use models such as ECAPA-TDNN and x-vector to extract a fixed-dimensional speaker embedding vector from the speech segment. During the training phase, a combination of speaker classification and metric learning ensures that embeddings of the same person are more clustered and the distance between embeddings of different people is larger; during the inference phase, nearest neighbor or back-end discriminators (such as PLDA, Cosine scoring with margin) are used for verification and recognition. In this way, the system can answer "is it the same person" with a certain confidence level across phone, microphone, and noisy environments.

**Speaker Diarization** further answers "who is speaking when." The traditional approach typically involves three steps: first use VAD to find segments with speech, then cut the long audio into short segments, extract speaker embeddings for each segment, and finally perform clustering and temporal stitching in the embedding space to obtain a multi-speaker timeline. More advanced **End-to-End Diarization (EEND)** methods attempt to directly output a "time × speaker" boolean matrix from audio features, learning complex patterns such as overlapping speech and speaker changes in an end-to-end manner. Diarization is highly valuable in scenarios such as meetings, interview programs, court records, and phone customer service, often combined with ASR to produce "text records with speaker labels."

### 4.2.3 Hotword & Keyword Detection: The "Ears" for Interaction and Monitoring

In a continuous audio stream, not every second is worth being fully recognized and stored. The role of **hotword and keyword detection (KWS)** is that of an always-on "gatekeeper":

- In smart speakers, in-vehicle systems, and phone assistants, the KWS module is responsible for detecting wake words (such as "Hey Siri," "OK Google," "Xiao Ai Tong Xue"). Once a wake word is detected, the audio stream is handed off to more expensive ASR and dialogue systems for processing.
- In intelligent customer service, quality inspection, and compliance scenarios, KWS marks and alerts on key phrases (such as "complaint," "return," "rights protection," "fraud") appearing in recordings or real-time calls, providing trigger points for back-end analysis and quality inspection strategies.

In terms of technical implementation, KWS typically needs to operate under constraints of **extremely low computational cost and low latency**, especially for wake word detection on local devices: the model is often a small CNN/RNN/Transformer front-end connected to a CTC or gated discrimination head, detecting acoustic patterns of specific words, and using sliding windows and confidence smoothing to avoid false wakes. For keyword quality inspection scenarios, stronger ASR + keyword matching/regex + statistical analysis can be used, or end-to-end keyword tagging models can be trained directly. Regardless of the form, KWS essentially adds a layer of "event-level" semantic filtering on the speech stream, serving as an important interface connecting the audio world with interaction logic.

## 4.3 Audio/Music Understanding (Audio Event & Music Understanding)

Not all audio is centered on "speech." In reality, there are many scenarios related to environmental sounds, event sounds, and music, which are more concerned with: **"What sound event occurred?" "What is the current acoustic scene?" "What style is this song, what instruments are used, what are the rhythm and key?"** This set of capabilities is collectively referred to as audio/music understanding, primarily revolving around sound event detection, environmental/scene classification, and music attribute understanding.

From a product perspective, audio understanding technology supports a wide range of applications such as acoustic security monitoring, IoT acoustic sensors, environmental adaptation for smart devices, music recommendation and classification, music copyright identification, music retrieval, and creative assistance. Similar to "image classification + fine-grained classification" in vision, this layer structures the originally continuous and complex sound space into discrete event labels, multi-dimensional attribute vectors, and style descriptions.

- **Scenarios**
  - Sound Event Detection: Detecting alarm sounds, glass breaking, baby crying, impact sounds, etc., for security monitoring, smart buildings, vehicle safety systems, and industrial alerts.
  - Environmental/Scene Classification: Identifying acoustic scenes such as "indoor/outdoor," "office/car/street/subway," providing a basis for noise reduction strategies, adaptive gain, and mode switching in smart devices.
  - Music Understanding and Music Information Retrieval (MIR): Genre classification, instrument recognition, rhythm and key analysis, supporting music recommendation, playlist generation, music retrieval, copyright identification, and creative assistants.
- **Principles**
  Audio/music understanding is mostly based on **time–frequency features + deep neural networks** for classification or multi-label annotation:
  - Using features such as log Mel-spectrogram to convert audio into "acoustic images," then using CNN, CRNN, or Transformer architectures for time–frequency pattern recognition.
  - For sound event detection, multi-label, multi-temporal output is often used, predicting the presence of each event on the time axis, sometimes combined with weak supervision labels and multi-instance learning.
  - For environmental/scene classification, more emphasis is placed on long-term statistical features and background patterns, often requiring modeling over longer windows.
  - Music understanding tasks combine music theory knowledge to model tempo (BPM), beat positions, key, chords, and structure, with some tasks using self-supervised or contrastive learning to pre-train music embeddings, followed by downstream fine-tuning.
- **Models**
  Common audio understanding models are mostly pre-trained on public datasets (such as AudioSet) and then transferred to specific tasks:
  - CNN/CRNN models such as VGGish, YAMNet, PANNs, pre-trained on large-scale audio data, can be used for various audio event and acoustic scene tasks.
  - Transformer-based models such as AST (Audio Spectrogram Transformer) directly use self-attention on spectrograms, achieving stronger global time–frequency modeling capabilities.
  - Music-oriented MusicTagging/MIR models are pre-trained on millions of songs to learn tag models or embedding models for style/mood/instrument tagging, music retrieval, and recommendation.

### 4.3.1 Sound Events & Acoustic Scenes: Letting Devices "Understand the Environment"

In security, IoT, smart cities, and in-vehicle systems, cameras alone are not sufficient to fully understand environmental states. The goal of **sound event detection** is to enable systems to "hear and understand" key events: when glass breaks, an alarm sounds, a baby cries, a collision, scream, fight, or destructive behavior occurs, the system can identify and alert from the audio signal. Unlike speech recognition, such events are often short, non-verbal, with varying frequency ranges and energy patterns, and may be highly overlapped with background noise.

**Environmental/scene classification** focuses more on persistent acoustic scenes: is it a quiet office, a bustling street, inside a car, a high-speed rail station, or a café? The system can automatically adjust noise reduction intensity, echo cancellation parameters, microphone array beam steering based on the acoustic scene, and even change interaction strategies (e.g., using shorter feedback interactions in a car, increasing output volume on noisy streets). In IoT scenarios, an "acoustic network" composed of multiple sound sensors can be used for long-term monitoring and statistical analysis of environmental states.

In terms of technical implementation, both types of tasks mostly adopt **multi-label classification + temporal modeling** approaches: convert audio to Mel-spectrograms, use VGGish, PANNs, AST, or similar models for feature extraction, and then use temporal pooling or sequence models to output the activation of each label on the time axis. Since many datasets only provide "clip-level labels" (weak labels), models often need to learn the temporal localization of events under weak supervision through methods such as multi-instance learning and self-attention pooling.

### 4.3.2 Music Understanding & Tagging: From "Playlist Tags" to "Structural Analysis"

In the music domain, the goal of audio understanding is not merely "what song is this," but also to answer: **"What style is this song? What instruments are used? How fast or slow is the tempo? What is the key and general harmonic structure?"** This information supports music recommendation and playlist curation on the one hand, and on the other hand provides structured "music metadata" for creators and generative models.

The **genre classification** task categorizes songs into different styles such as pop, rock, classical, hip-hop, electronic, Lo-Fi based on their overall acoustic features and structure; **instrument recognition** distinguishes the acoustic fingerprints of different instruments such as drums, bass, guitar, piano, and strings on time–frequency features, which can be used for instrument statistics, music retrieval, and mixing analysis. **Tempo/key analysis** estimates BPM, beat positions, time signature, and key, providing a foundation for tasks such as beat matching, automatic harmonization, DJ mixing, and game soundtrack synchronization.

In terms of models, music understanding largely follows general audio models (such as PANNs, AST), but there are also many models and pre-trained embeddings specifically oriented toward Music Information Retrieval (MIR). A typical approach is to perform **multi-label music tag learning** (genre, mood, instrument, era, etc.) on large-scale music datasets to obtain a music embedding space, and then fine-tune or perform zero-shot inference on the specific tasks mentioned above. By combining these models, music platforms can more intelligently complete music classification and recommendation, copyright platforms can enhance music fingerprinting and similarity retrieval, and creative tools can leverage these understanding capabilities to recommend suitable accompaniment to users, extend similar styles, or automatically generate musical structures.

## 4.4 Speech & Audio Generation (TTS / VC / Music Generation)

After completing the "cleanup," "recognition," and "understanding" of audio, the natural next-layer question is: **"Can we directly make machines 'speak,' 'sing,' or even 'compose'?"** This is the world of speech and audio generation: from Text-to-Speech (TTS), from one voice to another (VC / Voice Cloning), to broader music and sound effect generation, and further to singing voice synthesis that can sing lyrics and melodies. Similar to image generation, this layer is no longer just about labeling or extracting structure from existing data but actively "creating" new sound content.

At the product level, this layer's capabilities have already permeated various applications: voice product lines such as OpenAI TTS, ElevenLabs, ByteDance Volcano Engine, and MiniMax provide high-quality synthesized speech for applications; music generation platforms such as Suno and Udio provide creators and even ordinary users with the ability to go from text prompts to complete music; games, videos, virtual streamers, and digital humans rely on these models for dubbing and singing, greatly lowering the barrier to content production.

- **Scenarios**
  - Text-to-Speech (TTS): News broadcasting, navigation announcements, intelligent customer service voice responses, content reading in learning apps, accessibility screen reading, etc., requiring the conversion of arbitrary text into natural, clear, and controllable speech.
  - Voice Conversion / Voice Cloning (VC / Voice Cloning): Changing the speaker's timbre while preserving semantics and prosody, enabling "voice swapping" or "few-shot voiceprint cloning" (under strict compliance conditions).
  - Music and Sound Effect Generation: Generating suitable background music and sound effects (ambient sounds, UI sound effects, transition sounds) for short videos, games, advertisements, podcasts, etc.
  - Singing Voice Synthesis and Cover Songs: Given a melody and lyrics, having a virtual singer perform, or generating a cover version in a certain style/timbre under compliant conditions.
- **Principles**
  Speech and audio generation typically adopts a layered modeling approach of **"high-level representation → low-level waveform"**:
  - In TTS, text is first converted into phoneme/syllable/character-level sequences, then through sequence-to-acoustic-feature (e.g., Mel-spectrogram) models (Tacotron, FastSpeech, VITS, etc.), and finally neural vocoders (WaveNet, WaveRNN, HiFi-GAN, etc.) generate high-fidelity waveforms from the features.
  - In Voice Conversion, by decoupling "what is said (content)" from "who is speaking (timbre)," content representations are extracted from the source speech and then combined with the target speaker embedding or vocoder conditions to generate new speech waveforms.
  - Music and sound effect generation can be based on tokenized representations (such as notes, MIDI, encoded spectrograms/codec tokens), using autoregressive, diffusion, or neural codec generative models to sample new audio from text, reference audio, or structural parameters.
  - Singing voice synthesis introduces finer prosody, pitch trajectories, and singing control on top of TTS, typically modeling pitch, duration, legato, vibrato, etc., explicitly or implicitly.
- **Models**
  The current mainstream technical approaches for speech and audio generation include:
  - TTS: Tacotron/Tacotron2, FastSpeech series (non-autoregressive TTS), VITS, etc., handle text-to-Mel-spectrogram or codec tokens; WaveNet, WaveRNN, HiFi-GAN, WaveGlow, etc., serve as vocoders or decoders handling features-to-waveform. Recent Diffusion-based TTS and Neural Codec models have further improved naturalness and diversity.
  - Voice Conversion / Cloning: VC frameworks based on speaker embedding + content encoder, as well as voice conversion models using neural codecs, supporting few-shot timbre cloning and cross-lingual speaker transfer. This type of technology has been commercially deployed by multiple platforms, providing convenient voice cloning API services. Common domestic platforms include ByteDance Volcano Engine, MiniMax, iFlytek Open Platform, Baidu AI Cloud Qianfan Large Model Platform, and Alibaba Cloud Intelligent Speech Interaction Platform; overseas mainstream platforms include ElevenLabs, Resemble.ai, Play.ht, and others. Among them, ByteDance Volcano Engine's voice cloning capability supports rapid training with a small number of audio samples, adapting to commercial use across multiple scenarios such as intelligent customer service and audiobooks; MiniMax leverages its large model technology advantages to achieve natural alignment between cloned timbre and text content, while also supporting cross-lingual speaker timbre transfer; iFlytek Open Platform's voice cloning has significant advantages in the clarity and emotional expressiveness of Chinese pronunciation, widely serving fields such as education and broadcasting.
  - Music and Sound Effect Generation: MusicLM, MusicGen, and Suno/Udio-type models typically generate long-form audio on discrete codec tokens using autoregressive or diffusion architectures based on text and/or reference audio conditions.

### 4.4.1 Text-to-Speech (TTS): Making Machines "Communicate Naturally"

**Text-to-Speech (TTS)** is the most intuitive speech generation task: input a piece of text, output a segment of natural and fluent speech that ideally is nearly indistinguishable from a human voice. Modern TTS systems are typically divided into two main stages: text to acoustic features (such as Mel-spectrogram), and acoustic features to waveform.

In the first stage, the model needs to handle problems such as tokenization, phonemization, polyphone disambiguation, punctuation and pausing, and prosody prediction. Typical models include the attention-based Tacotron series and the length-prediction-based FastSpeech series, with the latter significantly accelerating synthesis and improving stability through a non-autoregressive architecture. In recent years, end-to-end models such as VITS have merged acoustic modeling and the vocoder into a unified framework, further simplifying the system.

In the second stage, Neural Vocoders such as WaveNet, WaveRNN, HiFi-GAN, WaveGlow, etc., are responsible for converting Mel-spectrograms or other intermediate representations into high-fidelity waveforms. A well-trained vocoder can not only generate natural and clear speech but also faithfully reproduce different timbres, emotions, and styles. Modern TTS systems also support **multi-speaker modeling** (via speaker embedding), timbre/speed/emotion control (such as "excited," "calm," "broadcasting style"), and cross-lingual TTS, providing highly customizable voice capabilities for various applications.

### 4.4.2 Voice Conversion & Voice Cloning: Changing "Who Is Communicating"

In many creative and assistive scenarios, we want to change the speaker's timbre or style **without altering the content and prosody** — this is the task of **Voice Conversion (VC)** and **Voice Cloning**. The former primarily addresses "turning person A's speech into person B's voice"; the latter further emphasizes "learning a new timbre from just a few samples or even a few seconds of speech."

Technically, VC typically adopts a "content–timbre decoupling" approach: a content encoder extracts speech content and prosody information (which can be discrete units based on ASR or continuous representations from self-supervised learning), and then a conditional generator combines the target speaker embedding or codec conditions to generate new speech with the target timbre but largely unchanged semantics and rhythm. With the introduction of neural codecs, speech can be directly edited in the codec space to achieve high-fidelity conversion.

**Voice Cloning** builds on VC with an emphasis on few-shot and generalization capabilities: the model needs to extract stable speaker representations from a few samples or even a few seconds of audio, and based on this, generate synthesized speech with consistent style and similar timbre. This capability is very useful in virtual personas, personalized assistants, game character customization, dubbing acceleration, and more, but it must also strictly comply with legal and ethical norms, ensuring use only under conditions of compliant authorization, full informed consent, and security controls, to avoid risks of misuse or identity impersonation.

### 4.4.3 Music & Sound Effect Generation: From Prompts to Complete Soundscapes

Compared to speech generation, **music and sound effect generation** is more complex in structure and time scale: music often lasts longer with richer internal structure (sections, melody, harmony, rhythm); sound effects are diverse, ranging from natural environments (rain, wind, ocean waves) to foley sounds (UI clicks, notification sounds, game skill effects), each with their own patterns. In recent years, models based on neural codecs, sequence modeling, and diffusion have made "generating complete music/sound effects from text" a reality.

In music generation, models like MusicLM, MusicGen, Suno, and Udio typically encode audio into discrete codec token sequences and then train text-conditioned or multimodal-conditioned generative models in this discrete space. Users only need to provide a text description (such as "moderate tempo, warm and healing Lo-Fi background music, suitable for studying and focusing," "tense electronic orchestral score, suitable for a sci-fi trailer"), or upload a reference music clip, and the model can generate high-quality music lasting tens of seconds or even minutes. For creators, this is both a source of inspiration and a powerful tool for rapid prototyping and background music generation.

In sound effect generation, similar techniques can generate UI sound effects, notification sounds, game ambient sounds, etc., from text prompts, helping product and game teams rapidly iterate on sound design. Combined with the audio understanding capabilities of the previous layer, style alignment and scene adaptation can also be achieved, such as automatically matching sound effect styles based on visuals or game levels.

Whether it is speech or music and sound effect generation, this layer of capability is rapidly evolving: from the early days of heavily synthesized machine sounds to today's high-fidelity content that is nearly indistinguishable from human voices and professional music. At the same time, issues surrounding copyright, compliance, traceability, and controllability have become increasingly important — how to provide powerful creative tools while protecting the legitimate rights and interests of creators and users will remain a key topic that this layer of technology must continuously address.
# 5. Video

In the multimodal AI system, the **video modality** is responsible for understanding and generating "visual signals that change over time." Compared to single-frame images, video not only contains spatial information such as texture, shape, and layout, but also carries rich **temporal cues**: the rise and fall of actions, the motion trajectories of objects, the rhythm of shot transitions, and so on. Whether it's behavior recognition in surveillance, motion analysis in sports training, one-click editing on short-video platforms, or intelligent parsing of long videos, they all fundamentally rely on a comprehensive set of understanding and generation capabilities built around "frame sequences."

From an engineering perspective, video capabilities can be roughly divided into several layers: **low-level video enhancement and restoration** ensures that content is "clear enough to see"; **video understanding and structural analysis** answers the question of "what is happening"; building on that, **video + language multimodal tasks** convert video content into structured descriptions and retrieval interfaces usable by text; further, **video generation and editing** works in reverse, starting from text or example videos to generate or reassemble video content in a controllable manner; and a class of applications represented by **digital humans / virtual avatars** integrates speech, language, motion, and video rendering together, forming a new paradigm for interaction and content production.

Below, we similarly start from layered capabilities to organize video-related capabilities.

## 5.1 Traditional Video Processing: From "Playable" to "Good-Looking and Useful"

At the most fundamental level of video technology, the first concern is not "who is in the frame" or "what event is happening," but whether the video itself is stable, clear, and comfortable: whether the picture shakes, is blurry, has excessive noise, or whether the aspect ratio suits the target playback device. The **traditional video processing** layer primarily works at the level of frame sequences and spatiotemporal pixels, using operations such as enhancement, restoration, super-resolution, frame interpolation, and reframing to convert noisy, shaky, low-resolution, or improperly proportioned raw video into "high-quality temporal signals" that are more suitable for viewing and subsequent analysis. It can be analogized to "image restoration and enhancement + geometric correction" in the image modality, except that here, smoothness and consistency across the time dimension are additionally introduced.

From a product perspective, this layer of capabilities is almost "invisible" behind all video products: one-click quality enhancement in editing software, automatic quality upgrades on short-video platforms, intelligent super-resolution and frame interpolation in TV boxes and players, film restoration services, and multi-frame preprocessing for upstream detection/recognition models are all direct manifestations of traditional video processing. Below, we continue to organize from three angles — **scenarios**, **principles**, and **models** — and expand on key directions such as video enhancement and restoration, super-resolution, and frame interpolation in subsequent subsections.

- **Scenarios**
  In online video platforms, editing tools, surveillance systems, and terminal devices, traditional video processing mainly appears in the following typical scenarios:
  - Content platforms and editing tools: When short videos or long videos are uploaded or edited, one-click quality enhancement, image stabilization, anti-shake, and denoising allow users to "pick up a phone and shoot, then use it right away"; when old video footage is imported into an editing project, restoration and frame supplementation make it more visually consistent with new material.
  - Film and old footage restoration: Digital restoration of historical film, early TV programs, and standard-definition material — removing scratches, noise, and jitter, restoring color and detail — to provide higher-quality versions for re-release, redistribution, and digital archiving.
  - Video surveillance and dashcams: Denoising, dehazing, contrast enhancement, and image stabilization for surveillance footage shot in low light, rain, fog, or heavy compression, improving the robustness of downstream detection and recognition modules and facilitating forensics and traceability.
  - Terminal playback and device-side enhancement: TVs, set-top boxes, and mobile players locally integrate super-resolution and frame interpolation to "upgrade" existing 720p/1080p, 24/30fps content to visual effects approximating 4K, 60/120fps at playback time.
  - Multi-terminal adaptation and distribution: To cover mobile portrait, tablet landscape, and large-screen TV simultaneously, the same video undergoes portrait/landscape adaptation, intelligent cropping, and multi-aspect-ratio reframing, reducing the cost of manual editing and multi-version maintenance.
- **Principles**
  Traditional video processing typically does not directly understand semantic categories; instead, it models and optimizes around quality, stability, and temporal consistency at the spatiotemporal signal level:
  - Joint spatiotemporal modeling: Building on single-frame image enhancement, temporal information is introduced. Through optical flow estimation, camera motion modeling, or spatiotemporal convolution, preceding and following frames serve as additional "observations," enabling multi-frame fusion and noise suppression along the time axis.
  - Image stabilization and anti-shake: Camera shake is modeled as a sequence of geometric transformations (translation, rotation, scaling, etc.) over a period of time. By estimating global or local motion trajectories and smoothing them before reprojecting onto the output video, shake is removed and stability is achieved.
  - Video super-resolution and frame interpolation: Video super-resolution uses multi-frame alignment and detail reconstruction to improve spatial resolution while maintaining temporal consistency; frame interpolation uses optical flow estimation or spatiotemporal generation networks to synthesize intermediate frames between two frames, presenting motion at a higher frame rate for improved smoothness.
  - Reframing and automatic composition: By detecting and tracking subjects (people, objects) in the video, estimating subject trajectories along the time axis, and combining with the target resolution's aspect ratio, an appropriate cropping window is selected for each frame, and the cropping window's motion is temporally smoothed to ensure a natural viewing experience.
  - Quality vs. efficiency trade-offs: Cloud offline processing can pursue optimal quality and complex models, while mobile, player, and real-time scenarios require controlling model parameter counts, computational complexity, and latency, making fine trade-offs in algorithm architecture and inference frameworks.
- **Models**
  In concrete implementation, traditional video processing comprehensively uses classical video signal processing methods and deep learning models, striking a balance between effectiveness, efficiency, and deployment form:
  - Classical video processing methods: Optical-flow-based stabilization and frame interpolation, temporal filtering and multi-frame fusion, block-matching-based denoising and compression artifact removal, etc., are still widely used in scenarios with limited compute or where interpretability is required.
  - Deep video restoration and enhancement models: Multi-frame super-resolution and enhancement networks represented by EDVR, BasicVSR / BasicVSR++, and the video version of Real‑ESRGAN, through alignment and spatiotemporal feature aggregation, significantly outperform traditional methods in denoising, deblurring, detail recovery, and compression artifact removal.
  - Deep frame interpolation models: Frame interpolation networks such as DAIN, RIFE, and FILM generate intermediate frames through explicit or implicit optical flow estimation and intermediate feature fusion, and are more stable than traditional optical flow + resampling methods in complex motion and occlusion scenarios.
  - Transformer-based video restoration: Using spatiotemporal attention to uniformly process spatial textures and temporal dependencies, these models offer stronger modeling capability in complex camera motion and multi-object scenes, while controlling computation at inference time through mechanisms such as sparse attention and sliding windows.
  - Real products and systems: The intelligent enhancement in Jianying / CapCut, commercial enhancement software such as Topaz Video Enhance, the quality enhancement pipelines of Bilibili and various short-video platforms, and old film restoration SaaS services typically cascade multiple models and strategies, dynamically selecting the optimal processing path based on material type and terminal conditions.

Taken together, this layer primarily lays the physical and perceptual foundation for video "before semantics": it helps users obtain a more comfortable viewing experience and also provides cleaner, more stable input for upstream detection, recognition, and generation models. Below, we expand on the sub-directions of **video enhancement and restoration** and **super-resolution and frame interpolation**.

### 5.1.1 Video Enhancement and Restoration: Polishing "Watchable" to "Good-Looking"

Under real shooting conditions, video is often not "clean": severe shaking from handheld devices, high noise and a smeared look in low light, block artifacts and color banding from network compression, and fading and scratches from old equipment all make video quality noticeably below the ideal. The goal of video enhancement and restoration is to restore a stable, clear, and natural viewing experience to the greatest extent possible without changing the semantic content of the video — polishing material that is "barely watchable" to a level that is "pleasing or even good-looking."

In the temporal domain, enhancement and restoration must first address the problem of stability. By performing feature matching or optical flow estimation on consecutive frames, global camera motion and local object motion can be separated, and the smoothed camera trajectory is then used to re-render output frames, thereby suppressing rapid jitter and subtle shaking and preventing viewers from experiencing dizziness during viewing. On this foundation, frame-level denoising, deblurring, and artifact removal focus more on joint spatial–temporal modeling: multi-frame joint denoising uses redundant information from preceding and following frames, performing processing similar to "multi-exposure fusion" in the temporal direction, effectively suppressing high-ISO noise and compression noise while preserving detail texture; for mild motion blur, deconvolution-style sharpening is performed on the frame sequence by estimating the blur kernel or using an end-to-end deep network, making both static backgrounds and moving subjects sharper.

For old films and low-quality material, restoration also involves "reconstruction" at the color and structure level. Film aging causes yellowing, reduced contrast, and noticeable local scratches and blemishes; early digital video commonly suffers from low resolution, heavy compression, and edge aliasing. Modern restoration workflows often use multi-step collaboration: first, detection and segmentation models locate locally damaged areas such as scratches and blemishes; then, spatiotemporal inpainting networks "borrow material to fill holes" from neighboring frames and neighboring spatial pixels; simultaneously, color restoration and contrast reshaping bring the overall tone close to the original shooting or intended style reference. For heavily compressed video, dedicated artifact-removal networks targeting blocking artifacts and ringing artifacts are also introduced, improving edges and details without excessive smoothing.

These enhancement and restoration capabilities are often presented as "one-click" in products: the user simply checks "stabilization," "quality enhancement," or "old video restoration," and the system automatically selects the appropriate model and parameter combination in the background, performing multi-stage processing on the video frame sequence. For the business, this layer directly determines the audience's subjective evaluation of image quality and indirectly affects the performance of upstream analysis models: cleaner, more stable video input often means more reliable face/license plate recognition, more accurate behavior detection, and fewer false alarms.

### 5.1.2 Super-Resolution and Frame Interpolation: From "Barely Clear" to "Smoother"

Against the backdrop of ever-upgrading display devices and increasing user demands for detail and smoothness, a large amount of existing video content appears "innately inadequate" in resolution and frame rate: 1080p looks insufficiently sharp on 4K screens, and 24/30fps tends to show ghosting or stuttering on large screens and in fast-motion scenes. Super-resolution and frame interpolation technologies are designed to solve these two problems: the former "fills in details" in the spatial dimension, and the latter "fills in the process" in the temporal dimension, together elevating video that is "barely clear" to a viewing experience that is "rich in detail and smoothly playing."

Video super-resolution adds one key dimension compared to single-frame image super-resolution: time. Simple frame-by-frame upscaling tends to cause inconsistency in details between adjacent frames, resulting in flickering and texture jitter. Therefore, mainstream methods all leverage information from multiple surrounding frames, using optical flow estimation or feature-level alignment to align details from neighboring frames to the target frame, and then performing detail reconstruction after alignment. Models such as EDVR, BasicVSR / BasicVSR++, and the video version of Real‑ESRGAN first align and aggregate multiple frames in feature space, then use deep networks to infer high-resolution details, avoiding the "blur" and "plastic feel" that come with simple interpolation. In this process, balancing "physical plausibility" and "perceptual attractiveness" is the core of loss design and training strategy: both objective metrics (such as PSNR, SSIM) must be improved, and subjective viewing must feel natural, without over-sharpening or false details.

Frame interpolation focuses on "filling frames" along the time axis. Traditional methods rely on optical flow estimation, first predicting the motion of each pixel between two frames, then interpolating at an intermediate position according to certain rules to generate a new frame. However, in areas of fast motion, multi-object occlusion, or complex texture, optical flow is often not accurate enough, easily producing ghosting, double images, or local deformation. Deep frame interpolation models such as DAIN, RIFE, and FILM simultaneously learn fusion strategies for optical flow, depth, or intermediate features through end-to-end networks, directly outputting interpolated frames, with noticeably improved stability and visual quality in complex scenes. For sports events, action game recordings, and slow-motion creation, frame interpolation can smoothly boost 24/30fps original video to 60/120fps, preserving motion detail while reducing stutter and ghosting.

In engineering practice, super-resolution and frame interpolation are often used together: for low-resolution, low-frame-rate existing content, temporal frame interpolation is performed first, followed by spatial super-resolution, or both are implemented in a unified spatiotemporal network. In terms of deployment, cloud offline processing is suitable for film restoration and platform-level "quality upgrade" services that demand the highest image quality, while device-side real-time inference is more commonly seen in TV boxes, player apps, and gaming/action cameras, requiring low latency through model compression and hardware acceleration. Regardless of the form they take, super-resolution and frame interpolation have become essential infrastructure for the "HD/UHD experience," giving old content a "second life" on new terminals.

## 5.2 Video Understanding and Structural Analysis

If traditional video processing stays more at the level of "image quality and stability," then **video understanding and structural analysis** begins to answer semantic questions of the type "what is happening in the video": who is doing what, where, for how long, and whether there is abnormal behavior. The goal here is to structurally decompose the video along the time axis: recognize actions and behaviors, detect and track targets, segment foreground and background, partition scenes and shots, and extract high-level semantic signals usable for downstream decision-making, retrieval, and alerting.

From a product perspective, this layer of capabilities has already penetrated various intelligent security platforms, sports training analysis systems, smart dashcams, and industrial quality inspection video analysis systems: identifying fighting, falling, loitering, and other anomalies in surveillance; analyzing movement standardization and technical details in sports and fitness scenarios; tracking vehicle and person trajectories and monitoring whether production processes are normal in traffic and industrial environments. Below, we continue to organize these capabilities from three angles — **scenarios**, **principles**, and **models** — and focus on several representative directions in subsequent subsections.

- **Scenarios**
  - Security and public safety: In urban surveillance, campuses, and buildings, identify behaviors such as fighting, falling, gathering, running, and climbing over fences, and provide early warnings for abnormal patterns such as loitering and late-night lingering.
  - Traffic and travel: Detect and track the trajectories of pedestrians, vehicles, and bicycles at intersections, in tunnels, and on highways; analyze behaviors such as running red lights, driving against traffic, occupying lanes, and speeding, providing a basis for traffic management and accident tracing.
  - Sports and athletic training: Analyze the key phases and posture quality of actions such as basketball shooting, tennis serving, and yoga poses, providing technical analysis and corrective suggestions for athletes and general users.
  - Industrial production and quality inspection: Monitor whether operational steps on the production line are standardized, detect missing or incorrect assembly and abnormal movements during the assembly process, and provide foundational data for safe production and yield improvement.
  - Content structuring and retrieval: Perform shot segmentation, scene classification, and key moment marking on long videos, providing structured indices for subsequent retrieval, recommendation, and editing.
- **Principles**
  The key to video understanding and structural analysis is joint modeling of spatial targets and semantics in the temporal dimension:
  - Action recognition and behavior analysis: Based on 2D/3D convolution, temporal pooling, or Transformers, an entire video clip is encoded to recognize the action category occurring within it; advanced methods combine human keypoint sequences with skeletal topology for more fine-grained analysis of action quality and patterns.
  - Object detection and tracking: While performing detection on each frame, cross-frame association mechanisms (appearance features, motion trajectories, etc.) are introduced to connect the detection boxes of the same target at different times into continuous trajectories, yielding multi-object tracking results.
  - Video semantic segmentation and scene analysis: Semantic segmentation or instance segmentation is performed on each frame of the video at the pixel level, and temporal continuity is used to smooth predictions; simultaneously, shot transitions and scene boundaries are detected to achieve structural decomposition of long videos.
  - High-level event and anomaly detection: On top of basic action and trajectory features, temporal modeling and pattern recognition methods are used to detect rare events and abnormal patterns, often combined with unsupervised or weakly supervised learning to alleviate the problem of scarce annotations.
- **Models**
  In terms of model selection, video understanding and structural analysis typically adopt a combined architecture of "spatial features + temporal modeling":
  - Classical models based on 3D convolution and Two‑Stream, such as I3D, perform end-to-end action recognition on short video clips by convolving simultaneously in spatial and temporal dimensions.
  - SlowFast series models based on multi-path and multi-temporal scales capture semantics through a slow pathway and motion details through a fast pathway, achieving a better balance between computation and accuracy.
  - Transformer-based video models, such as TimeSformer and Video Swin Transformer, use spatiotemporal attention mechanisms to model videos over long time ranges, and are better suited to capturing complex events and multi-agent interactions.
  - Tube‑based detectors and spatiotemporal convolution / Transformer models extend detection boxes temporally into "tubes," performing action detection and spatiotemporal segmentation on joint spatial–temporal features.
  - Multi-object tracking (MOT) methods, such as DeepSORT, combine frame-level detection results with appearance embeddings and motion prediction to stably associate target identities across the video.

Overall, this layer of capabilities further abstracts video from a "high-quality pixel stream" into a "behavior and event stream," laying the structural foundation for upstream multimodal understanding, retrieval, and decision-making. Below, we expand on three directions: **action recognition and behavior analysis**, **object detection and tracking**, and **event and anomaly detection**.

### 5.2.1 Action Recognition and Behavior Analysis: From Frame Sequences to "Who Is Doing What"

Action recognition and behavior analysis is concerned with "what the subject is doing within a time window." In security scenarios, this means recognizing behaviors such as "walking, running, falling, fighting" from video; in sports and fitness, it corresponds to more fine-grained actions such as "whether the basketball shot, tennis serve, or squat is standard" and "whether the yoga pose is correct." Technically, early methods mainly relied on 2D convolution + optical flow or handcrafted features, stacking several frames and classifying them as a whole; modern methods more commonly use 3D convolution (I3D, a series of 3D ResNet variants), multi-temporal-scale structures such as SlowFast, or spatiotemporal-attention-based models such as TimeSformer and Video Swin Transformer to jointly model spatial textures and temporal changes.

In many scenarios requiring high-precision pose analysis, directly classifying RGB clips is insufficient; human pose estimation and skeletal sequence modeling are also incorporated: 2D/3D keypoints are first extracted from each frame, and the keypoint sequence is then fed into RNNs, temporal convolutions, or GCN/Transformer networks to analyze the temporal structure and spatial coordination of the action. This "pose prior + temporal modeling" approach is more robust to changes in background, lighting, and clothing, and is suitable for applications with high demands on action detail, such as yoga, fitness, and industrial operation compliance assessment.

### 5.2.2 Object Detection and Tracking: From "Where in This Frame" to "The Entire Trajectory"

Single-frame object detection can tell us "what targets are in this frame and where," but many real-world tasks require knowing "where this car / person came from, where they went, and what they did in between." The object detection and tracking module exists precisely to string frame-level detections into continuous temporal trajectories: on one hand, a detector runs on each frame, producing candidate bounding boxes; on the other hand, based on cues such as appearance features (ReID embeddings), motion prediction (Kalman filtering), and spatial overlap, boxes on adjacent frames are matched and associated, yielding multi-object tracking (MOT) results.

In engineering practice, a typical pipeline is: "robust pedestrian / vehicle detection + an association algorithm such as DeepSORT," deployed on surveillance cameras or dashcams, outputting the motion trajectory of each ID in real time. In more complex systems, these trajectories are further combined with regional semantics (lanes, zone divisions) and business logic rules to infer higher-level behavior patterns such as driving against traffic, prolonged loitering, and frequent entry/exit, providing continuous temporal signals for upstream security, traffic flow analysis, and industrial process monitoring.

### 5.2.3 Event and Anomaly Detection: Finding "What's Off" from "Normal Patterns"

In most business scenarios, what truly requires focused attention is often the "minority of anomalies" and "key events": for example, fighting, falling, and gathering in security; abnormal shutdowns or non-compliant operations in industrial production; dangerous driving behavior in traffic. Such events are relatively rare, with high annotation costs and extremely imbalanced samples, posing additional challenges for model construction.

A common approach is to build a temporal anomaly detection module on top of basic action recognition, object tracking, and scene segmentation: either directly learning from a small number of labeled anomaly samples through supervised methods; or using unsupervised/weakly supervised methods to model the motion and behavior distribution of "normal patterns," issuing an alert whenever a new observation significantly deviates from the historical distribution. At the model level, temporal autoencoders, contrastive learning, graph neural networks, or temporal Transformers are combined to uniformly encode spatial relationships and temporal dependencies, thereby capturing more complex group behavior patterns and long-range dependencies.

## 5.3 Video + Language Multimodal Tasks (Video‑Language)

If video understanding solves the problem of "understanding the video itself clearly," then **video + language multimodal tasks** focus on "how to use natural language to describe, answer questions about, and retrieve video content," as well as "how to quickly locate key information along the long video timeline based on textual needs." Such tasks require simultaneously processing visual, speech, and text signals: on one hand, extracting visual and audio features from the video; on the other, connecting to the reasoning and generation capabilities of language models, compressing spatiotemporal content into text summaries, Q&A results, and semantic indices suitable for human consumption and machine invocation.

From a product perspective, this layer of capabilities has already penetrated scenarios such as automatic subtitle and timeline generation for long videos, "smart marking / key clip extraction" on short-video editing platforms, and Q&A assistants for corporate training and meeting videos: users no longer need to "watch from beginning to end," but can directly search, ask questions about, and reorganize video content through natural language. Below, we continue to expand from three angles — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Subtitle and summary generation: Automatically generate multilingual subtitles for courses, lectures, meetings, and long-form video content, and on that basis generate chapter-level summaries, highlight lists, and timelines.
  - Video Q&A and knowledge access: Build "video Q&A assistants" for instructional videos, operation demonstrations, and corporate training content, supporting users in asking questions in natural language, such as "how is this step done" or "where did this person put the phone in the end."
  - Video content retrieval and clip localization: Support precise "text → video clip" retrieval in large-scale video libraries, for example, "find the part that mentions the price" or "find the clip that explains a certain formula"; automatically mark and annotate highlights and key information within a single long video.
  - Content production and editing assistance: Combine video content understanding with language generation to automatically generate titles, copy, and storyboard scripts, assisting creators in quickly editing and reorganizing material.
- **Principles**
  The core of video–language multimodal systems is to align temporal visual features with text representations in a unified embedding space, and to perform retrieval, generation, and reasoning on this foundation:
  - Multimodal feature extraction and alignment: Extract spatiotemporal features (CNN/ViT/Video Transformer) from video frames/clips and language embeddings (pretrained LLM or text encoder) from text, and align the two modalities through contrastive learning or multimodal pretraining.
  - Speech and text pipeline: For content containing speech, ASR is typically used first to generate timestamp-aligned transcription text, which is then jointly modeled with visual features — text can directly drive retrieval and also enable cross-modal comparison and error correction.
  - Temporal modeling and clip localization: For long videos, "clip-level" representations must be learned along the time axis, dynamically switching between local clips and global context through attention or temporal RAG to achieve precise localization of query-relevant intervals.
  - Generation and reasoning: Connect a large language model to the aligned multimodal representations to perform natural language generation (subtitles, summaries, explanations) or multi-turn Q&A and logical reasoning.
- **Models**
  In terms of model form, video–language multimodal tasks have undergone an evolution from "dedicated encoder + simple head" to "unified multimodal large models":
  - Early video–language models: Such as VideoBERT, which jointly model visual and text tokens during the pretraining phase, obtaining transferable video–language representations through masked prediction and contrastive learning.
  - All‑in‑One Video‑Language Models: Unify video, text (and speech) into a single multimodal Transformer, achieving unified processing of multiple tasks such as description generation, retrieval, and QA through shared or partially shared parameters.
  - Long-video multimodal models: Such as Gemini, Claude, and GPT with video capabilities, which use long contexts and hierarchical temporal modeling to holistically understand videos ranging from tens of minutes to hours, supporting timeline-level summarization and Q&A.
  - Temporal RAG + VLM: Build a "temporal vector index" on the video, first using a VLM to encode video clips and build a database, then retrieving relevant clips at query time, and combining with an LLM for answer synthesis and explainable reasoning.

Overall, this layer elevates video from "machine understanding" further to the level of "human–machine dialogue and collaboration": users can ask questions about a video as if asking a person, while the system performs complex visual, speech, and language alignment and reasoning behind the scenes.

### 5.3.1 Subtitles, Summaries, and Timelines: Compressing Long Videos into Browsable Text

For courses, lectures, meetings, and long-form content videos, the most urgent need is often to "quickly know what was said and where the key points are," rather than watching the entire thing from beginning to end. Automatic subtitle and summary systems use a combination of "ASR + text processing + visual assistance" to transcribe audio content into timestamp-aligned text, and then generate structured outlines and concise summaries on that basis, achieving information compression from "hour-long video" to "minute-level reading."

At the implementation level, the ASR module is responsible for stably and reliably producing multilingual transcription and timeline alignment; the text side uses a large language model to correct errors, segment sentences, and semantically reorganize the raw transcription, extracting chapter titles, key information, and question–answer pairs. In some scenarios, visual cues (such as PPT page changes, scene transitions) are also incorporated to assist in demarcating chapter boundaries and key clips, ensuring that the summary structure is more consistent with the rhythm of the actual content.

### 5.3.2 Video Q&A and Semantic Retrieval: "Manipulating" Video with Natural Language

Building on subtitles and summaries, a further need is the ability to perform Q&A and retrieval on specific video content: for example, "where did this person put the phone in the end," "which part talks about the pricing strategy," "at what minute is this step demonstrated." Such tasks require semantic localization of the query along the time axis: understanding the people, objects, and actions involved in the query, and finding the corresponding clip in the video's temporal representation.

In concrete terms, a multi-granularity index is typically built offline for the video: multimodal representations (visual + text/speech) are extracted for fixed-length clips, and a vector index or graph structure is established. During online interaction, the user's question is encoded as a text vector and matched against the clip representations in the index to find the most relevant time intervals; then, the content of these clips (keyframe screenshot descriptions, transcription text, etc.) is fed into an LLM together with the question, and the model generates a natural language answer or returns the corresponding time points. For large-scale video libraries, "cross-video retrieval" can be supported under the same mechanism, for example, searching across collections in corporate training knowledge bases or e-commerce product videos.

### 5.3.3 Multimodal Editing Assistance: From Understanding to "Helping You Edit"

Once the system can stably understand the content and semantic structure of a video, the natural next step is to reversely use these understanding results to assist in creation and editing. Video–language multimodal models can automatically select clips that match the semantics from existing material based on a script or prompt provided by the creator, generating a rough-cut timeline; they can also automatically generate titles, cover copy, and chapter labels based on the video content, and even suggest shot rhythm and soundtrack choices.

In workflows, such capabilities typically appear in the form of "intelligent recommendations" and "automatic rough cuts": after the creator uploads material, the system automatically completes analysis, storyboarding, and marking, and provides several candidate versions (such as editing plans with different rhythms and durations); the creator can fine-tune on this basis without needing to screen frame by frame from scratch. For enterprise applications, the system can also combine knowledge bases and brand guidelines to ensure that the generated copy, subtitles, and editing style comply with established business requirements and compliance standards.

## 5.4 Video Generation & Editing

After possessing stable understanding and structural analysis capabilities, **video generation and editing** steps into the phase of "actively creating content": no longer just improving image quality or performing structural analysis, but generating entirely new shots based on text scripts, reference images, or existing videos, or performing structural editing and reorganization of original videos. This includes both text-to-video generation from scratch, as well as style transfer, extension, and rearrangement based on existing images/videos, and fine-grained object-level editing and replacement.

In terms of products, this layer of capabilities has already entered the content creation mainstream through a series of products such as Jimeng Video, MiniMax Video, Sora, Runway Gen‑2, Pika, and Kling: advertisements, concept films, animations, and storyboard sequences can be quickly generated without relying on large filming crews and complex post-production; creators can drive shots and styles through natural language scripts; traditional video editing workflows are beginning to deeply integrate with structured generation tools. Below, we continue to organize from the angles of **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Copy and script to short video: Brand advertisements, mini-dramas, plot clips, and concept animations — automatically or semi-automatically generate playable video drafts based on scripts.
  - Image / video to video: Generate animated versions for illustrations or character designs, perform style transfer on real-world footage (real → anime / illustration), or extend/reorganize existing video in time and space.
  - Structured editing and post-production: Without changing the overall content semantics, achieve fine operations such as face swapping, lip-sync, object erasure and replacement, and text-driven clip rearrangement.
- **Principles**
  Current mainstream video generation and editing methods mostly use diffusion models or their variants as the core, gradually "denoising" to generate video in a high-dimensional spatiotemporal latent space:
  - Text-conditioned modeling: A text encoder (such as T5/CLIP text tower or a dedicated language model) maps the script into a condition vector, guiding the video decoder to align with the text description in terms of style, content, and motion patterns.
  - Spatiotemporal consistency and motion control: Spatiotemporal convolutions, temporal attention, or 4D representations (NeRF/GS, etc.) are incorporated into the diffusion process or posterior optimization to ensure the video's coherence and physical plausibility along the time axis.
  - Image / video conditioned generation: The diffusion process is initiated in the feature space of the input image or video, and by controlling noise injection, mask regions, and condition channels, controlled editing or extension is achieved that "preserves the given parts + generates new content."
  - Structured control signals: Structural information such as pose skeletons, segmentation masks, depth maps, and camera trajectories is incorporated to make the generated video more controllable in terms of subject motion and viewpoint changes.
- **Models**
  Representative models and directions include:
  - Diffusion‑based Text‑to‑Video models (Sora, Runway Gen‑2, Pika, Kling, etc.), pretrained on large-scale video–text pairs, with strong generation capabilities in complex scenes, multi-shot motion, and diverse styles.
  - Image‑to‑Video diffusion models: Using a single-frame image as a condition to predict the dynamic evolution of subsequent frames, achieving "single image → animation / motion effect"; or performing operations such as continuation, extension, and viewpoint rotation on short videos.
  - NeRF / 4D representations and keyframe + interpolation methods: Using 3D scene representations or keyframes + temporal interpolation to combine generation with geometric and consistency modeling, achieving more stable viewpoint roaming and complex motion.

These capabilities do not exist in isolation but are gradually permeating editing and post-production pipelines: from copy to storyboard, storyboard to rough cut, rough cut to stylization and local editing — more and more stages are being driven by "text + structured control."

### 5.4.1 Text-to-Video: From Script to "Watchable" Shot Sequences

What text-to-video (Text‑to‑Video) aims to achieve is: the user describes a scene, shot, or story fragment in natural language, and the system automatically generates a coherent video. Compared to image generation, text-to-video adds the challenge of the temporal dimension: not only must image quality and style consistency be maintained at the single-frame level, but the coherence of subject identity, lighting, background, and motion trajectories across frames must also be ensured.

Typical diffusion-based text-to-video models are first pretrained on large-scale video–text paired data: a text encoder extracts semantic conditions, and a video decoder repeatedly denoises a "noisy video" in latent space, gradually converging to spatiotemporal signals consistent with the text. In this process, structures such as temporal attention, 3D convolution, or 4D representations explicitly build temporal dependencies into the network to avoid problems such as "inter-frame jumping" and "character resetting." Some systems also support control over shot motion (push, pull, pan, tilt) and composition rhythm, making the generated results closer to real cinematographic language.

### 5.4.2 Image / Video to Video: "Growing" and "Morphing" on Existing Content

Another important route is generation and editing based on existing images or videos: for example, "bringing to life" an illustration or concept design, stylizing real-person video into anime, or changing the background, adjusting weather and time while keeping the structure unchanged. Technically, such methods often add a "reference channel" to the diffusion process: the input image or video is encoded as features, participating in denoising as a condition or initial state, while mechanisms such as masks and explicit geometric constraints control "which regions can be changed and which must be preserved."

For style transfer scenarios, the model redraws textures and lighting while preserving the original motion and composition, matching the target style; for video extension and reorganization, new frames are "continued" at the temporal ends or in the middle, achieving horizontal/vertical scene expansion, viewpoint orbiting, or plot supplementation. Such capabilities are very suitable for integration with traditional editing workflows: the editor first provides key shots and rhythm, and the model then automatically generates transitions and variations between these "anchor points."

### 5.4.3 Structured Video Editing: Object-Level Fine Control

In many business scenarios, fully regenerating video is not a hard requirement; what is more critical is performing fine, controllable structured editing on existing footage: for example, face swapping, modifying mouth shapes, erasing unwanted objects, replacing advertising content, or rearranging shot order based on a text script. Structured video editing develops along this line of thinking: building on video understanding, object-level segmentation, tracking, and parametric representations are introduced, so that editing operations can be stably bound to specific targets and time periods.

Face swapping and lip-sync are the most typical applications in this direction: the model needs to map the target person's identity onto the original video's performance while ensuring natural and coherent head pose and overall expression, and precisely control mouth shape movements based on the new speech signal. Object erasure / replacement relies on high-quality segmentation and spatiotemporal inpainting: first segment and remove the target object in each frame, then fill the hole using neighboring frames and contextual texture, avoiding obvious "patching" traces. Text-driven editing aligns the "script structure" with the video timeline, automatically selecting and stitching clips that match the script semantics, achieving higher-level automated editing.

## 5.5 Digital Human / Avatar

**Digital Human / Avatar** can be seen as a "system-level integration" of video generation, speech synthesis, multimodal understanding, and graphics rendering: it is not just about generating a segment of video, but about continuously and controllably driving a virtual figure to "speak, make expressions, and gesture" based on text or speech input, and in more and more scenarios, achieving near-real-time or even real-time interaction. Compared to general video generation, digital humans emphasize three points more: **long-term consistency of identity and appearance, fine alignment of speech–expression–motion, and the real-time performance and stability of the end-to-end system**.

From a product perspective, digital humans have already widely appeared in scenarios such as **content production platforms, virtual customer service / smart reception / virtual guided tours, education and training and online classrooms, brand virtual IP / virtual idols, and virtual streamer / digital avatar tools for creators**: enterprises can batch-produce video content with fixed appearances and styles, government and enterprise services can use virtual receptionists to serve users 24/7, and individual creators can consistently produce "person-on-camera" videos without ever showing their face. Below, we continue to organize from three dimensions — **scenarios**, **principles**, and **models** — and expand on three directions in subsequent subsections: driving and expression, appearance and video generation, and real-time interaction and system integration.

- **Scenarios**
  - Content production and online distribution: Corporate promotional videos, product feature explanations, course recordings, and news broadcasts — using digital humans instead of real people on camera, significantly reducing the costs of shooting venues, lighting equipment, and human resources.
  - Virtual customer service and guided tours: In bank branches, government service halls, scenic spots, museums, and other venues, using digital humans to handle greeting, inquiries, business consulting, and route guidance, balancing consistent image with 24/7 service.
  - Brand virtual IP / virtual idols: Operating short videos, live streams, and e-commerce content around a virtual figure over the long term, maintaining a unified persona and visual style across different platforms.
  - Virtual streamers and digital avatars: For creators who prefer not to appear on camera or need to operate multiple identities, providing configurable virtual streamers / digital avatars bound to real or synthesized voices, enabling "stable on-camera presence just by speaking or typing."
- **Principles**
  A digital human system is essentially a multimodal pipeline of "speech / text driving + appearance modeling + video / rendering output," with slight differences between offline and real-time scenarios but similar core components:
  - Speech and language driving: Use TTS to synthesize speech directly from a script, or connect ASR + LLM to generate reply text from user speech/text and then use TTS to output speech; speech features (such as mel spectrograms) serve as driving signals to control mouth shape and expression timelines.
  - Appearance and motion space modeling: Construct a controllable geometric and appearance representation for the virtual figure, such as a 2D portrait/illustration, a skeleton- and Blendshape-based 3D Avatar, or a renderable volumetric representation based on NeRF / 4D Gaussians; and define a set of "driving parameters" (such as keypoints, pose skeletons, Blendshape coefficients) to encode expressions and poses.
  - Speech → expression / motion mapping: Through a dedicated "speech-driven" model, map speech features to driving parameters for the face and upper body, achieving lip-sync, expression details, and head-and-shoulder movements; real-time digital humans require this mapping to be end-to-end low-latency and stable.
  - Rendering and compositing: Based on the current frame's driving parameters, perform image or 3D rendering of the virtual figure, outputting a continuous video stream or real-time display; backgrounds, props, subtitles, and other elements can be overlaid, integrating with traditional video editing workflows.
- **Models**
  In terms of specific models, digital human systems often comprehensively use multiple types of specialized models and general multimodal models:
  - Audio‑driven Talking Head models: Lip-sync models such as Wav2Lip learn the alignment between speech and mouth-region pixels/geometry, generating natural mouth movements while maintaining identity consistency.
  - Real-time / lightweight digital human models: Such as Ultralight‑Digital‑Human and lightweight Talking Head models, which significantly compress parameter counts and computation in their architecture, enabling near-real-time driving and rendering even on CPU / mobile / WebGPU.
  - NeRF / 4D representation models: Such as ER‑NeRF (digital human NeRF approaches in the Explicit / Efficient / Editable direction), which model the figure's appearance and expression changes in 3D space, making viewpoint, lighting, and motion more natural and coherent — suitable for high-fidelity and multi-camera scenarios.
  - Speech-driven and multimodal alignment models: Such as MuseTalk-type "speech → facial expression / talking head" models, which align audio features and visual features, achieving realistic speaking expressions and head movements without relying on large amounts of 3D annotations.
  - Speech and dialogue models: High-naturalness multi-speaker TTS, end-to-end speech dialogue models (ASR + LLM + TTS integrated), providing digital humans with multi-style, multilingual voice and dialogue capabilities.

Taken together, digital humans are both a set of models and a complete system: they integrate language understanding, speech, visual generation, and real-time inference to present an interactive virtual character "on screen." Below, we expand on three directions: **driving and expression**, **appearance and video generation**, and **real-time interaction and system integration**.

### 5.5.1 Driving and Expression: From Script / Speech to a Person Who "Describes and Expresses"

In the digital human pipeline, **driving and expression** is responsible for answering a core question: given a script or speech, what mouth shape, expression, and head-and-shoulder movements should the virtual figure present in each frame. This includes both offline batch production scenarios and responses to real-time dialogue.

In offline content production, a common pipeline is "text script → TTS → speech-driven": the business side provides the narration script, the TTS module generates speech in the target timbre (such as a brand's virtual spokesperson), and the speech features are then fed into a "speech → motion" model. **Wav2Lip-type models** are an important representative of this stage:

- They take a reference portrait frame and the corresponding speech segment as input, and through a convolutional / attention network predict a mouth region finely aligned with the speech, which is then fused with the original portrait, thereby precisely modifying the mouth shape while preserving identity and most expressions.
- During training, speech–video alignment data supervises the network to learn the oral cavity shapes corresponding to different phonemes, maintaining temporal continuity to avoid mouth-shape jumping or delay.

Compared to earlier pure lip-sync approaches, the new generation of speech-driven models (such as MuseTalk-type methods) further extend to **full-face expressions and head pose**:

- Such models typically map speech features to a low-dimensional "emotion / expression latent space," then generate keypoints, Blendshape coefficients, or directly generate image features through a decoder, driving subtle changes in areas such as eyebrows, eyes, and cheeks, making "speaking expressions" more vivid.
- Some models also encode the semantic information of the speech content (such as questions, emphasis, exclamations), combining syntactic/pragmatic signals analyzed by an LLM to add nodding, frowning, gesturing, and other movements at points of intonation change, enhancing the naturalness and appeal of the expression.

At a higher dimension, **driving and expression** can also incorporate external control signals: for example, using pose skeletons, gesture trajectories, and gaze direction as additional inputs, enabling the digital human to imitate the style of a specific speaker, or to execute predefined action templates based on "directive actions" in the script (such as "point to the screen," "open both hands"). Whether it is local mouth-shape driving like Wav2Lip, or more full-body expression modeling like MuseTalk / real-time skeleton driving, they together achieve continuous mapping from speech/text to facial and upper-body movements, and are the key link that makes a digital human "look like it's seriously speaking."

### 5.5.2 Appearance and Video Generation: From "a Model" to "a Malleable Character"

The driving pipeline solves "how to move," while **appearance and video generation** determines "who is moving, where they are moving, and in what style." This includes both high-fidelity photorealistic digital humans and stylized figures such as 2D anime, cartoon, and low-poly avatars, as well as different technical choices for real-time and offline rendering.

In 2D portrait and illustration scenarios, the typical approach is to train a **Talking Head generation model** based on a small number of reference images and short videos:

- The model encodes the person's identity information as an "appearance vector" or style feature, and takes driving parameters (such as speech latent vectors, keypoints, expression encodings) as conditional inputs to synthesize new frames in image space.
- Unlike pure Wav2Lip which only modifies the mouth shape, such models can make small-amplitude pose swings and superimpose emotional changes on expressions, making the digital human look less "stiff."

In scenarios pursuing higher realism, freer viewpoints, and multi-camera switching, an increasing number of solutions adopt digital human modeling based on **NeRF / 4D representations** (such as ER‑NeRF-type methods):

- Through multi-view capture or video, the 3D volume or Gaussian field of the person's head / upper body is first reconstructed, encoding the states corresponding to different expressions and mouth shapes as an interpolatable latent space;
- During driving, speech/expression parameters are mapped to this latent space, and volumetric rendering or Gaussian rendering is performed in 3D, then projected onto the screen.
- The advantage of this approach is that viewpoint, lighting, and background are more natural, supporting "surround viewpoint" and "virtual camera" movements, and are particularly friendly to VR/AR, virtual live streaming rooms, and high-end advertising production.

In businesses emphasizing cross-platform deployment and real-time performance, lightweight solutions such as **Ultralight‑Digital‑Human** are also adopted:

- Through structural pruning, operator restructuring, and model distillation, the Talking Head or Avatar rendering network is compressed to a scale that can run on mobile / WebGPU;
- Generation from driving parameters to a single frame image is completed within milliseconds, aligned with real-time speech streams or control signals, achieving "low-latency digital humans" suitable for interactive terminals, self-service kiosks, and web frontend applications.

At the level of complete video production, appearance and video generation must also be combined with backgrounds, props, and cinematic language. A common workflow is:

- First, customize a digital human appearance (2D or 3D) for a brand or individual;
- Preset several virtual scenes (studio, office, classroom, exhibition hall, etc.);
- When producing content, the system automatically selects the appropriate scene and camera position based on the script, generates the digital human footage, and arranges it in multi-picture compositions with PPTs, demo videos, and product shots.
  This makes the digital human not just a "talking head," but a "character" that can naturally blend into various program and content formats.

### 5.5.3 Real-Time Digital Humans and System Integration: From Offline Video to "a Colleague on Screen"

As ASR, TTS, LLM, and lightweight video generation models mature, more and more digital human systems are moving from **offline batch video production** to **real-time interaction**: the user speaks or types at the terminal, and within a few hundred milliseconds to a few seconds, the digital human on screen "understands — thinks — responds — speaks," creating an experience similar to a real customer service agent / guide / host. The key here is not just the models themselves, but also how to compress the multimodal pipeline to **acceptable end-to-end latency**.

In a typical real-time digital human closed loop:

- **Frontend input**: The ASR module converts user speech to text in real time, or directly receives user text input.
- **Semantic understanding and decision-making**: The LLM combines the business knowledge base and tools (RAG, database queries, workflow orchestration) to generate reply text, along with necessary structured instructions (such as which PPT page to show, which video clip to play).
- **Speech and driving**: TTS converts the reply text into speech in the target timbre; the speech stream is generated and simultaneously consumed by the Wav2Lip / MuseTalk / real-time skeleton driving model, outputting corresponding mouth-shape and expression parameters segment by segment.
- **Rendering output**: A lightweight rendering network of the Ultralight‑Digital‑Human type or a GPU-based NeRF / Avatar rendering engine converts driving parameters into video frames in real time, outputting directly to the screen via WebRTC, RTMP, or local rendering.

To provide a consistent experience across multiple terminals, the system also needs to make careful trade-offs among **latency, bandwidth, and compute**:

- In cloud rendering schemes, the vast majority of computation (LLM, TTS, driving, and rendering) is completed on the server, and the terminal only plays the video stream — suitable for web/app and offline large screens with limited compute, but dependent on network stability;
- In "cloud + edge hybrid" schemes, ASR and part of the LLM inference are completed in the cloud, while lightweight driving and rendering are performed locally, significantly reducing audio-visual interaction latency — suitable for mobile devices and self-service kiosks;
- On high-compute terminals (such as high-performance PCs, dedicated workstations), most of the pipeline can even be offloaded locally, achieving stable interaction in weak-network environments.

On the model side, **real-time digital humans** also impose additional requirements on architectural design:

- Speech-driven models need to support streaming inference, capable of producing mouth-shape and expression predictions after receiving a small segment of speech, rather than waiting for the entire sentence to finish;
- Rendering networks need to minimize reliance on large convolution kernels and global attention, using structures such as local convolutions, lightweight self-attention, and resolution pyramids to control computation;
- For high-fidelity solutions based on NeRF / 4D, techniques such as mesh caching, frustum culling, sparse volumes, and GPU optimization are needed to keep per-frame rendering within a few milliseconds to tens of milliseconds.

At the system integration level, real-time digital humans often also need to be tightly bound to **business knowledge, persona settings, and dialogue strategies**:

- Manage industry knowledge, business processes, and FAQs through knowledge bases and RAG, ensuring "what is said is correct and complete";
- Control speaking style and expression boundaries through persona configuration and script templates, ensuring "what is said sounds like this person (or this brand)";
- Through multi-turn dialogue strategies and conversation state management, enable the digital human to remember user context, confirm and follow up at appropriate times, presenting an interaction feel "like a real colleague / guide / instructor."

Overall, with the addition of models such as Wav2Lip, MuseTalk, ER‑NeRF, and Ultralight‑Digital‑Human specifically designed for lip-sync, expression driving, and real-time rendering, digital humans are accelerating their evolution from "offline video template tools" into **virtual entities that can respond in real time, have stable personalities and professional knowledge**, becoming the most comprehensive and application-rich component of the video technology system.
# 6. Time Series & Sequential Decision

In the previous sections on vision and structured modeling, we mostly thought about problems in "static" spaces: an image, a record, a piece of text. In real business, however, a large portion of core metrics evolve over time: sales and traffic fluctuate daily, server load and sensor readings change every second, and financial prices and macro indicators continually adjust under the influence of policies and events. The **Time Series & Sequential Decision** layer focuses on: forecasting the future along the time axis, identifying anomalies, characterizing structural breaks, and on that basis making forward-looking decisions and control actions.

From a product perspective, such capabilities span critical functions like operations, planning, risk control, and scheduling: metric forecasting modules embedded in traditional BI/reporting systems, demand forecasting and safety stock recommendations in financial and supply chain planning tools, macro correlation analysis and causal mining in quantitative research software, traffic and capacity forecasting on e-commerce and mobility platforms, and metric anomaly detection and alerting in AIOps for operations. These are all typical product manifestations of this layer. Below, we elaborate from four directions: **classical statistical methods**, **deep learning time series modeling**, **anomaly & change point detection**, and **spatio-temporal sequence modeling**.

## 6.1 Statistical TS Modeling

In many business contexts, "time" is the natural backbone: sales vary by day/week, website traffic fluctuates with campaigns, equipment load follows user behavior, and sensor readings reflect subtle changes in system state. **Classical statistical time series modeling** leverages relatively interpretable and analyzable statistical models on such temporal structures to answer three core questions: **What will happen in the future? How are variables related to each other? What is the current state of the system?** Although deep learning has emerged prominently in many scenarios, traditional methods like ARIMA, cointegration analysis, and Kalman filtering still serve long-term roles in finance, supply chain, operations, and risk control, and often act as the "baseline" and interpretation tool for more complex systems.

From an application perspective, classical time series models are widely present in metric forecasting modules of traditional BI/reporting systems, financial and supply chain planning tools, and various quantitative research software. They can provide future prediction intervals for single or multiple time series, analyze co-movement and long-run equilibrium relationships among macro indicators, and estimate trajectories and hidden states through state-space modeling. Below, we organize the typical usage of these methods along three dimensions — **scenarios**, **principles**, and **models** — and then elaborate on each specific direction.

- **Scenarios**
  - Metric forecasting: Short- to medium-term prediction of numerical values that change over time, such as sales volume, website traffic, CPU load, and sensor readings, used for inventory stocking, capacity planning, and operations scheduling decisions.
  - Macroeconomic and financial analysis: Studying long-run relationships and short-run dynamics among macro and market indicators such as GDP, inflation rate, interest rates, exchange rates, and asset prices, supporting policy research and quantitative strategy development.
  - Process and trajectory estimation: In localization, navigation, target tracking, and equipment monitoring, estimating and smoothing time-varying trajectories, velocities, and states, and recovering the "true process" as much as possible in noisy environments.
- **Principles**
  Classical time series methods are generally based on the idea of **statistical assumptions + parametric structure**:
  - Assuming the time series satisfies certain stationarity or weak stationarity conditions, characterizing "how many past lags determine the current value" through autocorrelation structure (ACF, PACF).
  - In multivariate settings, using cointegration and vector autoregression (VAR) models to characterize long-run equilibrium relationships and short-run deviation corrections among multiple time series.
  - For systems with heavy noise and unobservable states, introducing latent states and observation equations to form state-space models, using Bayesian inference or recursive filtering (such as Kalman filtering) for online estimation and prediction.
- **Models**
  The model family for such methods is relatively well-defined and structurally clear, facilitating interpretation and tuning:
  - Univariate and multivariate AR/MA/ARIMA/SARIMA series, used for stationary/seasonal time series modeling — the "resident members" of BI systems and traditional forecasting modules.
  - VAR/cointegration models, used for joint modeling and causality testing of multidimensional macro and financial time series, suitable for correlation analysis at the policy and strategy level.
  - State-space models and Kalman filtering, Hidden Markov Models (HMM), etc., used for trajectory estimation, equipment state estimation, and hidden state inference — foundational tools in engineering control and signal processing.

Taken together, the strengths of classical time series modeling lie in **interpretability, diagnosability, and engineering controllability**: the modeling workflow, hypothesis testing, and residual analysis all have mature standards, making them easy to integrate into existing BI and planning systems. Below, we elaborate on three directions: univariate/multivariate forecasting, cointegration and causality, and state-space modeling.

### 6.1.1 Univariate/Multivariate Time Series Forecasting: From ARIMA to VAR

In the most typical business scenarios, the first thing we face is one or several metric curves ordered by time: for example, daily sales of a product, hourly PV of a website, per-minute CPU usage of a server room, or per-second readings from a device sensor. The goal is to provide short- to medium-term forecasts based on historical patterns and to give reasonable confidence intervals. The **AR/MA/ARMA/ARIMA/SARIMA** family of models is the standard toolkit designed for this purpose.

For univariate series, ARIMA-type models assume that "the current value is linearly determined by past values and random disturbances over a number of lags," and eliminate trends and seasonality by differencing and seasonal differencing to make the series stationary:

- The AR (AutoRegressive) part characterizes "the influence of own lags on the current value";
- The MA (Moving Average) part captures "the influence of historical error terms on the current value";
- The I (Integrated) part is responsible for removing trends;
- Adding seasonal terms yields SARIMA, which can explicitly describe periodic structures such as weekly or monthly patterns.

In engineering practice, one typically first performs stationarity tests (e.g., ADF), examines ACF/PACF plots, and then selects reasonable orders via information criteria (AIC/BIC) and residual diagnostics. For metrics with pronounced seasonality (e.g., e-commerce daily sales, holiday traffic), SARIMA modeling is especially suitable, and incorporating holiday features or exogenous variables can further improve forecasting performance.

When we wish to model multiple related time series jointly, we can introduce **multivariate time series models**. The representative method is VAR (Vector AutoRegression) and its variants. VAR treats multiple series as a joint vector, using their own and each other's lagged terms to jointly explain current values, thereby capturing mutual influences among different indicators. For example, in macroeconomic analysis, one can include GDP growth, inflation rate, interest rates, and exchange rates in a single VAR model to study impulse responses and transmission pathways; in business operations, VAR can also describe "how traffic changes in one channel affect other channels" or "the dynamic relationship between promotion intensity and sales," providing references for resource allocation.

In terms of product form, this type of univariate/multivariate forecasting capability is typically embedded in **forecasting functions of traditional BI/reporting systems, and financial and supply chain planning tools**: the user selects one or several time series, and the system automatically completes modeling and forecasting, providing prediction intervals, residual analysis, and model diagnostic reports to support decision-making without requiring the user to deeply understand all the mathematical details behind the decisions.

### 6.1.2 Cointegration and Causality: Long-Run Equilibrium Among Macro Indicators

In economics and finance, many time series appear to be random walks on the surface, but over longer time scales, there exists some kind of **stable long-run equilibrium relationship**. Typical examples include exchange rates and interest rate spreads, stock indices and macro earnings, commodity prices and cost indices. Individually, each series may be non-stationary; yet some linear combination oscillates around a stable level in the long run. This phenomenon is called **cointegration**, and it provides important clues for understanding the structural relationships among macro indicators.

In engineering practice, cointegration analysis typically involves several steps:

1. Perform unit root tests on each time series to confirm they are integrated of the same order (e.g., all I(1));
2. Conduct cointegration tests (such as the Engle-Granger two-step method, Johansen test, etc.) to determine whether there exists a non-trivial linear combination that makes the combination stationary;
3. If a cointegration relationship is found, an Error Correction Model (ECM) can be constructed to characterize "how the system gradually corrects back to equilibrium when it deviates from the long-run equilibrium in the short run."

Related to cointegration is the **Granger causality test**. It is not causality in the strict philosophical sense, but a statistical definition based on predictive power: if the historical information of variable X can significantly improve the prediction accuracy of variable Y, then "X Granger-causes Y." By comparing prediction errors with and without the lagged terms of a certain variable within a VAR or regression framework, one can assess the directional influence among different macro or market indicators. In quantitative research and macro analysis, this type of test is often used to identify potential leading indicators, construct factors, or validate strategy hypotheses.

From a product perspective, cointegration and causality analysis more often appear in **quantitative research software, macroeconomic analysis platforms, and financial research tools**. They help researchers extract relatively robust structural relationships from piles of time series and map these relationships to higher-level business concepts (such as "the long-run constraint of interest rates on exchange rates" or "spread mean-reversion among different assets"), serving as an important basis for strategy design and risk management.

### 6.1.3 State-Space Models and Hidden State Estimation: Kalman Filter & HMM

In many real-world systems, the time series we observe is merely **a noise-contaminated surface manifestation**, while what we are truly interested in is the underlying "system state" evolving over time: for example, the true position and velocity of a vehicle, the health status of equipment, or the latent behavioral patterns of users. In such cases, if we merely do ARIMA-style modeling on the observed series, it is difficult to fully leverage our understanding of the system structure. **State-Space Models** are proposed precisely for this kind of "hidden state + noisy observation" problem.

A state-space model typically consists of two parts:

- State transition equation: describes how the hidden state evolves over time, which can be linear or nonlinear;
- Observation equation: describes how the hidden state generates noisy observations.

Under the linear Gaussian assumption, this framework can achieve recursive estimation and prediction of the state through the **Kalman Filter and Smoother**: each step is divided into two major phases — "prediction" and "update" — combining the state distribution from the previous moment with the current observation to obtain a new state estimate. This is extremely common in navigation and localization (e.g., trajectory estimation, target tracking), financial time series (e.g., volatility estimation), and equipment state estimation (e.g., health monitoring, remaining useful life prediction).

Adjacent to continuous state-space models is the **Hidden Markov Model (HMM)**. HMM assumes that the system transitions over time among a number of discrete hidden states, with different probability distributions for generating observed data under each hidden state. Through the forward-backward algorithm and the Viterbi algorithm, HMM can estimate the hidden state sequence, compute the probability of an observation sequence, and predict the next state and observation. HMM was widely used early on in speech recognition and text tagging, and is also commonly used for simple behavioral pattern recognition and event sequence modeling. It still has advantages in certain industrial and financial scenarios — interpretable structure, stable training, and easy integration with domain experience.

At the system level, state-space modeling, Kalman filtering, and HMM often serve as the underlying modules for **trajectory estimation, equipment state estimation, and financial and engineering control systems**, encapsulated within larger toolchains. They may not be directly exposed to end users, but behind products in navigation, target tracking, industrial control, and risk measurement, they have long played the role of "invisible engines."

## 6.2 Deep TS Forecasting

As data scale and scenario complexity continue to rise, classical models that rely solely on linearity and stationarity assumptions increasingly appear "inadequate" in many applications: a large number of nonlinear patterns, long-span dependencies, complex multivariate interactions, sudden behaviors, and period superposition characteristics require more flexible, higher-capacity model structures. **Deep learning time series modeling** has developed against this backdrop: from RNN/LSTM/GRU, to Temporal CNN/TCN, to time-series-specific Transformers, hybrid and hierarchical models — together they form the main toolkit for modern time series forecasting and modeling.

From an application perspective, deep time series models have been widely deployed in **e-commerce traffic & sales forecasting platforms, supply-demand/capacity/scheduling forecasting systems, cloud resource load forecasting and capacity planning tools**, used to provide unified and flexible forecasting solutions under complex structures spanning multiple categories, stores, cities, and even business lines. Compared to classical models, they emphasize "end-to-end representation learning" and "global pattern modeling," and are better at handling long sequences, high-dimensional, and multivariate scenarios. Below, we likewise elaborate along three dimensions: **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Large-scale multi-sequence forecasting: Tens of thousands of sales/traffic series across product, store, and city dimensions need to be modeled jointly under a unified model, with support for cold-start and long-tail series.
  - Complex operations and scheduling: In systems for power/water supply, capacity, and shift scheduling, demand is influenced by multidimensional features (weather, holidays, price, campaigns), and there exist multi-level structures (store/city/national), requiring simultaneous attention to both global patterns and local differences.
  - Cloud resources and infrastructure: Large-scale server clusters, container platforms, network and storage loads exhibit highly nonlinear and multi-peak structures, requiring high-frequency forecasting and capacity planning to support SLOs.
- **Principles**
  The core of deep time series models lies in **automatically learning multi-scale patterns and long-term dependencies from historical sequences and covariates**:
  - RNN/LSTM/GRU explicitly pass "memory" along the time dimension through recurrent structures, suitable for capturing sequential dependencies and local temporal structures.
  - Temporal CNN / TCN use one-dimensional convolution and dilated convolution to expand the receptive field while ensuring causality, enabling parallel training and stable gradient propagation.
  - Time series Transformers and specially designed variants (Informer, Autoformer, TimesNet, etc.) leverage self-attention mechanisms to model complex dependencies and periodic patterns in long-sequence, multivariate settings.
  - Hybrid and hierarchical models further introduce structural assumptions of "global + local" and "multi-level time series," simultaneously learning global patterns and individual characteristics within a unified framework.
- **Models**
  In terms of concrete implementation, deep time series modeling has produced a series of representative architectures:
  - Classical deep sequence models: RNN/LSTM/GRU and autoregressive probabilistic forecasting models based on them, such as DeepAR.
  - Integrated decomposition and forecasting models: N‑BEATS and others enhance interpretability through explicit trend/seasonal decomposition modules.
  - Attention-based time series models: Temporal Fusion Transformer (TFT) and others combine attention, gating, and variable selection, suitable for multivariate business scenarios with rich covariates.
  - Long-sequence Transformer models: Informer, Autoformer, TimesNet, PatchTST, etc., with specialized designs around long-sequence efficiency and multi-scale modeling.

Below, we elaborate on three directions: deep sequence models, convolutional and Transformer models, and hybrid and hierarchical modeling.

### 6.2.1 Deep RNN/LSTM/GRU: From Single Series to DeepAR

In the early days of deep learning entering the time series domain, **RNN/LSTM/GRU** were the most natural choice. Similar to text and speech modeling, they "remember" historical information by passing hidden states between time steps, allowing the capture of more complex nonlinearities and long-term dependencies than traditional linear models. For a single or a small number of time series, simple LSTM/GRU can achieve decent forecasting results given sufficient data; in large-scale multi-sequence scenarios, one can adopt **shared-parameter RNN/LSTM/GRU models**, jointly training on all sequences to learn universal temporal patterns.

Building on this, autoregressive probabilistic models like **DeepAR** provide a standard framework for deep time series modeling: they feed historical observations and covariates into a shared RNN/LSTM/GRU network, output the parameters of the conditional distribution of the series value at each time step (e.g., Gaussian, negative binomial, etc.), and achieve end-to-end probabilistic forecasting through maximum likelihood training. This design enables the model to naturally generate prediction intervals, handle irregular scales and multi-series mixing, and facilitates deployment in scenarios such as e-commerce sales and demand forecasting.

However, RNN-type models have typical problems: gradient decay over long sequences, and inability to fully parallelize during training. Although gating mechanisms (LSTM/GRU) alleviate some of these issues, training and inference efficiency remain factors to weigh for particularly long time spans and high-frequency data. This has also prompted both industry and academia to explore more parallel-friendly structures, such as TCN and Transformer.

### 6.2.2 Temporal CNN & Transformer: From Local Convolution to Long-Sequence Attention

To address the efficiency and stability issues of RNNs on long sequences, **Temporal CNN / TCN** introduced one-dimensional convolution and dilated convolution to model temporal dependencies: by stacking multiple layers of causal convolution and progressively expanding the receptive field layer by layer, it achieves modeling of long-range history without breaking temporal causality. Compared to RNNs, TCNs can be highly parallel during training and have shorter gradient propagation paths, thus excelling in training stability and efficiency, making them suitable for high-frequency data and industrial time series forecasting scenarios that require large receptive fields.

At a higher level of complexity, **Transformers and time-series-specific structures** have become the protagonists of long-sequence, multivariate time series modeling in recent years. Directly using standard Transformers encounters the problem of computational complexity growing quadratically with sequence length, so a series of time-series-oriented adaptations have emerged:

- **Informer** reduces the computational burden on long sequences through mechanisms such as ProbSparse self-attention and optimizes the structure for forecasting tasks.
- **Autoformer** incorporates trend and seasonal decomposition into the self-attention framework, aiming to improve interpretability and stability while maintaining long-sequence modeling capability.
- **TimesNet** enhances the perception of periods and patterns by unfolding in the time-frequency domain or multi-scale representations, better handling complex, multi-period long sequences.
- **PatchTST** borrows the "patch" idea from Vision Transformer, treating contiguous sub-sequences as patches, improving modeling efficiency and generalization for long sequences.

These models are often particularly well-suited for complex time series scenarios with **long sequences, multiple variables, and high-dimensional covariates**, such as large-scale cloud resource loads, multi-region energy demand, and multi-channel traffic forecasting. They can simultaneously model multidimensional inputs, static features, and time-dependent variables within a unified architecture, and provide some clues for subsequent interpretation and diagnosis through attention weights.

### 6.2.3 Hybrid & Hierarchical Models: Global + Local, Multi-Level Time Series

In real business, time series are rarely "isolated": they often have clear **hierarchical structures and shared patterns** — for example, store/city/region/national sales hierarchies, SKU/category/brand product hierarchies, or business-line/product/channel organizational structures. If one simply models each series individually, it is difficult to leverage this hierarchical structure; while mixing all series together indiscriminately ignores their individual differences. **Hybrid and hierarchical models** are designed precisely to address such problems.

One common approach is the **global + local model**: a shared "global model" learns the common patterns of all series (such as overall trends, holiday effects, seasonality), while introducing local parameters or embedding vectors for each series or each sub-group to capture individual characteristics. This structure avoids the data sparsity problem of training separate models for long-tail series while retaining the ability to finely model popular series.

Another category is **hierarchical time series (hierarchical TS) modeling**: explicitly considering hierarchical constraints during the forecasting process (e.g., the sum of sub-level forecasts should be consistent with the upper-level forecast), and through top-down, bottom-up, or mid-level joint optimization, ensuring that forecasts at all levels are consistent in both value and structure. Under deep time series frameworks, this typically manifests as incorporating hierarchical features in input encoding, designing multi-head outputs for different levels, or training with hierarchical loss functions.

From a product perspective, this type of hybrid and hierarchical modeling is widely applied in **e-commerce sales forecasting platforms, supply-demand/capacity/scheduling forecasting systems**, and similar scenarios: the system needs to simultaneously provide forecasts at different granularities such as "single store, single product," "city level," and "national total," and maintain consistency between upper and lower levels during resource planning and KPI decomposition. The flexible structure of deep models allows such constraints to be embedded into the modeling process end-to-end, rather than relying entirely on post-hoc corrections.

## 6.3 Anomaly & Change Point Detection

In time series scenarios, "forecasting the future" is only part of the problem; another equally critical part is: **real-time discovery of anomalies and structural changes**. Whether it is equipment operation, business metrics, transaction behavior, or operations monitoring, anomaly detection and change point detection are core capabilities for ensuring system stability and identifying risks and opportunities. Traditionally, statistical threshold methods, EWMA, CUSUM, and others have been widely used; as data dimensionality and complexity increase, various machine learning and deep learning methods (Isolation Forest, One‑Class SVM, AutoEncoder/VAE, time series GAN, GNN + time series models) have also begun to play important roles.

In terms of product form, such capabilities are often embedded in **equipment fault early-warning systems, business metric anomaly alerting platforms (e.g., sudden conversion rate drops), security attack and fraud detection systems, and operations AIOps alerting engines**, automatically flagging suspicious points and structural changes by monitoring multidimensional time series signals in real time, and integrating with rules, knowledge bases, and manual decision-making processes. Below, we continue to elaborate from three angles: **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Equipment and industrial systems: Monitoring sensor data such as temperature, vibration, current, and pressure to detect faults and degradation trends early, reducing downtime and losses.
  - Business and operations metrics: Monitoring key metrics such as PV/UV, conversion rate, order volume, latency, and error rate to quickly detect sudden drops, spikes, and abnormal fluctuations, providing alerts for operations and technical teams.
  - Security and risk control: Analyzing time series such as login behavior, transaction sequences, and access patterns to identify potential attacks, cheating, and fraud.
- **Principles**
  Anomaly and change point detection is essentially about finding significant deviations and structural breaks from "normal patterns":
  - For point anomalies and sequence anomalies, one can use statistical distribution fitting, density estimation, or boundary learning to determine whether the current observation falls outside the "normal region."
  - For change points, the focus is on abrupt changes in the statistical properties of the time series (mean, variance, correlation structure, distribution, etc.) along the time axis, and attempting to locate the time position where the change occurs.
  - In high-dimensional and multi-point networks, it is necessary to incorporate the dependency structure among multiple time series (such as topology, correlation) into the modeling, to avoid confusing local anomalies with overall trends.
- **Models**
  From the perspective of method families, they can be roughly divided into statistical methods, one-class/isolation learning methods, reconstruction-based deep models, and graph + time series combination models:
  - Statistical anomaly detection: Threshold, EWMA, CUSUM, etc., extremely efficient for univariate or simple scenarios — the foundation of traditional monitoring systems.
  - Machine learning methods: Isolation Forest, One‑Class SVM, etc., used to characterize the "normal region" in multidimensional feature space and isolate anomalous samples.
  - Deep reconstruction models: AutoEncoder / VAE / time series GAN, which learn to reconstruct normal sequences and flag anomalies when the reconstruction error is large.
  - Graph neural networks + time series models: In scenarios such as sensor networks and microservice metrics, introducing graph structure and time series models to jointly learn normal patterns, enhancing the identification of topology-related anomalies.

Below, we elaborate on three directions: point/sequence anomalies, change point detection, and multidimensional and graph-structured approaches.

### 6.3.1 Point Anomalies & Sequence Anomalies: From Statistical Thresholds to Reconstruction-Based Models

The most intuitive form of anomaly detection is **point anomalies**: the observed value at a certain time point is far from the historical normal range (e.g., CPU usage suddenly spikes to 100%, transaction amount is abnormally large, sensor reading jumps instantaneously). In traditional methods, the most common practice is to fit a statistical distribution or sliding statistics (mean, variance, quantiles) to historical normal data, set thresholds or control charts (such as EWMA, CUSUM) on this basis, and issue an alert when the current observation exceeds the acceptable interval. The advantages are simple implementation, low computational cost, and easy interpretability, so they remain widely used in a large number of operations monitoring and industrial systems.

When dimensionality increases or patterns become more complex, one can introduce one-class/isolation learning methods such as **Isolation Forest and One‑Class SVM**: they learn an aggregated region (or boundary) on "normal samples" and treat points falling outside this region as anomalies. By extracting statistical features (such as window mean, variance, frequency-domain features, etc.) on sliding windows of the series, these methods can also be used to identify local "sequence anomalies" (i.e., behavior deviating from normal patterns over a period of time), suitable for multidimensional metrics and scenarios where the distribution shape is difficult to precisely define.

Under the deep learning framework, methods based on **reconstruction error using AutoEncoder / VAE / time series GAN** offer more flexible options:

- Train an AutoEncoder or VAE on a large number of normal sequences to learn a "compress–reconstruct" model, enabling it to learn to reconstruct normal patterns;
- During online monitoring, feed new time windows into the model; if the reconstruction error increases significantly, the interval is considered to contain an anomaly;
- Time series GAN-type methods learn to generate normal sequences and look for anomaly signals in the discriminator's judgment results or generation errors.

These methods can adapt to highly nonlinear patterns and complex covariate structures, making them particularly suitable for building unified anomaly detection engines on **multidimensional business metrics and complex equipment sensor data**.

### 6.3.2 Change Point Detection: Structural Breaks and Event Activation

Unlike point anomalies and local anomalies, **change point detection** focuses on structural breaks in time series: for example, the mean jumps from one level to another, volatility changes, or periodicity and correlation structures adjust. Such changes often correspond to some kind of event or state switch in the real world, such as configuration changes, new policy activation, policy adjustments, production process changes, or market regime switches, and are extremely critical for business diagnosis and causal analysis.

Among traditional statistical methods, change point detection often employs techniques such as likelihood ratio tests, CUSUM, and Bayesian Online Change Point Detection (BOCPD):

- By fitting models with different parameters (e.g., different means/variances) before and after different time points, comparing the goodness of fit under the "no change point hypothesis" and the "change point hypothesis";
- In online scenarios, recursively updating the posterior probability of "whether a change point has occurred up to the current segment" at each time point, and triggering an alert once it exceeds a set threshold.

In more complex settings, one can combine deep representation learning with segmentation models, treating change point detection as a **sequence segmentation problem**: use neural networks to extract features, then find segment boundaries in the feature space, or directly train a model to predict the probability that a given time point is a "change point." This is particularly useful for business metrics that exhibit multiple forms of change (not just mean/variance changes) and are difficult to characterize with simple statistical assumptions.

In product systems, change point detection is typically integrated into **business metric analysis platforms, A/B experiment analysis systems, and configuration and policy change monitoring tools**: when key metrics show structural changes, the system can automatically flag potential change points and associate them with corresponding change events (such as version releases, parameter adjustments, policy implementations), providing clues for subsequent root cause analysis.

### 6.3.3 Multidimensional Time Series & Graph Structure: Joint Modeling with GNN + Time Series Models

In modern distributed systems and IoT scenarios, we often face **multi-point, multidimensional time series with associated topological structures**: for example, multiple measurement points in a sensor network, various service metrics in a microservice architecture, or multiple nodes and edges in a power distribution/transportation network. In such cases, performing anomaly detection on each time series individually and in isolation can easily misjudge local fluctuations or ignore overall patterns — true anomalies are often manifestations of "local-global inconsistency" or "topological structure incoordination."

To this end, a large number of combination methods of **Graph Neural Networks (GNN) + time series models** have emerged in recent years:

- First, construct a graph structure representing the relationships among multiple points based on the real topology (physical connections, network topology) or a correlation graph estimated from data;
- At each time step, use GNN to perform message passing on node features (the time series values of each point and their local context), learning spatial correlation features;
- Then feed the graph-encoded representations into time series models such as RNN, TCN, or Transformer to capture dynamic patterns in the time dimension;
- Finally, perform anomaly scoring or change point detection on the joint representation, achieving **spatio-temporal joint anomaly identification**.

This framework is particularly applicable in scenarios such as **sensor network monitoring, microservice metric anomaly detection, and spatio-temporal anomaly detection in urban computing**: it can distinguish "global changes" (such as an overall system load increase) from "local anomalies" (such as abnormal congestion at a single node), and can also better identify topology-related anomaly patterns (such as link-level problems, regional network failures).

At the engineering level, such methods typically appear as advanced capabilities of **operations AIOps alerting systems, security and risk control platforms, and equipment fleet monitoring systems**, combining basic statistical monitoring, rule systems, and expert knowledge to provide more intelligent, more context-aware anomaly discovery mechanisms for complex systems.

## 6.4 Spatio-Temporal Modeling

In many critical business scenarios, modeling only "time" is insufficient: **"when" and "where" coexist**, and the two are highly coupled. Urban traffic flow is jointly influenced by road network structure and temporal patterns; meteorology and air quality depend on both temporal evolution and geographic proximity and atmospheric flow fields; logistics, bike-sharing, and ride-hailing dispatch need to simultaneously consider the spatio-temporal distribution of demand and road/area structure. **Spatio-temporal sequence modeling** is precisely the systematic approach for such "time + space" joint modeling problems.

Compared to pure time series models, spatio-temporal models need to explicitly incorporate **spatial dependency structure**: traffic flow on adjacent road segments, air quality at nearby monitoring stations, and load and status of connected nodes are usually more correlated than points farther apart. To this end, structures such as Graph Neural Networks (GNN) and Convolutional LSTM (ConvLSTM) are widely used to combine feature learning in both spatial and temporal dimensions. At the product level, such capabilities support a large number of critical applications in **urban computing platforms (traffic/pedestrian flow forecasting), meteorological/environmental forecasting systems, logistics route planning, and bike-sharing/ride-hailing dispatch platforms**.

- **Scenarios**
  - Traffic flow and pedestrian flow forecasting: On road network or metro network structures, forecast vehicle and pedestrian flow at different time periods to support signal optimization, congestion management, and dispatch decisions.
  - Meteorology and environmental monitoring: On geographic grids or monitoring station networks, forecast the future spatio-temporal distribution of temperature, rainfall, wind, air quality, etc., providing support for forecasting and decision-making.
  - Logistics and mobility dispatch: On urban area or road network structures, forecast order demand, vehicle distribution, and warehouse/station load conditions, providing a basis for route planning, vehicle dispatch, and capacity allocation.
- **Principles**
  The core of spatio-temporal sequence modeling is **simultaneously learning spatial correlation and temporal dynamics within a unified framework**:
  - In the spatial dimension, characterize "who is related to whom" through graph structures or convolutional structures, and perform message passing and feature aggregation based on this;
  - In the temporal dimension, use RNN, TCN, Transformer, or specialized temporal structures to characterize dynamic changes;
  - The two can be connected in series (spatial first, then temporal), or interleaved or simultaneous (such as spatio-temporal convolution, spatio-temporal attention).
- **Models**
  Typical spatio-temporal models mostly adopt the combination form of "GNN + time series model" or "convolution + LSTM":
  - Graph neural networks + time series models: ST‑GCN, DCRNN, Graph WaveNet, ST‑Transformer, etc., capturing spatial dependencies through graph convolution or graph attention, and then capturing temporal dynamics through time series structures.
  - Convolutional LSTM-type models: ConvLSTM, Conv‑TT‑LSTM, etc., embedding spatial convolution gating within temporal recurrence to achieve joint modeling of spatio-temporal local features.

Below, we elaborate on three directions: spatio-temporal tasks and data representation, GNN + time series models, and convolutional LSTM and spatio-temporal convolution.

### 6.5.1 Spatio-Temporal Tasks & Data Representation: From Road Networks to Geographic Grids

Before diving into specific models, the first thing spatio-temporal sequence modeling must address is **how to represent spatial structure**. Unlike the one-dimensional time axis, spatial structures can be regular grids, irregular graphs, or hybrid forms.

- In traffic scenarios, roads and intersections naturally form a directed or undirected graph: nodes represent road segments or intersections, edges represent road connections and travel directions; each node has a set of features at each time step, such as traffic flow, average speed, congestion index, etc.
- In meteorology and air quality forecasting, one can use regular geographic grids (such as latitude-longitude grids), or construct the adjacency relationships among monitoring stations as a graph structure, defining edge weights based on geographic distance, wind direction, or correlation.
- In logistics and shared mobility scenarios, the city can be divided into grids or area units, each unit having features such as order volume and active vehicle count over time, while being spatially connected through adjacency relationships or actual road distances.

This unified representation of **"spatial structure + time series"** allows many different scenarios to be modeled as similar problems: given historical spatio-temporal sequences, predict the state of each node or grid cell at several future time steps. Subsequent model designs (whether GNN + time series models, or ConvLSTM) are all developed from this unified perspective.

At the product level, this layer of abstraction is often encapsulated in the data layer and modeling layer of **urban computing platforms, meteorological/environmental forecasting systems, and route planning and dispatch platforms**: business stakeholders only need to know "we are predicting future traffic/demand on the road network/grid," while the underlying data representation and spatio-temporal fusion are handled uniformly by the modeling framework.

### 6.5.2 Graph Neural Networks + Time Series Models: ST‑GCN, DCRNN, Graph WaveNet, etc.

For modeling spatio-temporal sequences on graph structures, the current mainstream approach is the combination of **Graph Neural Networks (GNN) + time series models**. Representative models include **ST‑GCN, DCRNN, Graph WaveNet, ST‑Transformer**, and their common characteristics are:

- In the spatial dimension, using graph convolution (GCN), graph attention (GAT), or spectral domain convolution methods to perform "neighborhood aggregation" on node features at each time step, thereby capturing spatial dependencies and the influence of topological structure;
- In the temporal dimension, using RNN (such as GRU/LSTM), TCN, or Transformer to perform sequence modeling on node-level features, capturing temporal trends and periodicity;
- Through alternating stacking or joint design, enabling the model to learn local and global patterns at multiple spatio-temporal scales.

For example, **DCRNN (Diffusion Convolutional RNN)** combines graph convolution with gated recurrent units, using diffusion convolution to simulate the propagation of information on road networks, and then capturing temporal dynamics through RNN, making it very suitable for tasks such as traffic flow forecasting. **Graph WaveNet** introduces adaptive graph structure learning and multi-scale modeling on top of graph convolution and temporal convolution, improving adaptability to complex road networks and irregular topologies. Models such as **ST‑Transformer** introduce self-attention mechanisms into spatio-temporal modeling, simultaneously considering correlations between different temporal and spatial positions through spatio-temporal attention modules.

In real systems, this category of GNN + time series models is widely deployed in products such as **urban traffic and pedestrian flow forecasting platforms, shared mobility dispatch systems, and complex IoT network monitoring**. They typically serve as one of the core forecasting engines, forming a closed loop together with rule systems, simulation models, and business strategies, enabling dispatch and planning to consider both global structure and respond to local changes.

### 6.5.3 Convolutional LSTM & Spatio-Temporal Convolution: ConvLSTM, Conv‑TT‑LSTM, etc.

Another important route is spatio-temporal modeling based on **Convolutional LSTM (ConvLSTM)** and its variants. Unlike standard LSTM, which passes one-dimensional vectors between time steps, ConvLSTM uses convolution operators in the gating structure, so that both the hidden state and input remain as multi-dimensional tensors (such as feature maps on a spatial grid). In this way, each time step's state update includes both temporal recurrence and local convolution aggregation in the spatial dimension, achieving natural modeling of spatio-temporal local patterns.

Building on this, **improved models such as Conv‑TT‑LSTM** attempt to enhance model expressiveness and efficiency through mechanisms such as tensor decomposition, parameter sharing, and multi-scale convolution, adapting to larger-scale, more complex spatio-temporal data. For example, in meteorological forecasting, one can stack multiple layers of ConvLSTM to perform spatio-temporal recurrence on multi-channel meteorological element maps (temperature, humidity, wind direction, etc.), predicting the spatial distribution for the next few hours or days from several historical frames; in traffic and environmental monitoring, one can also map road networks or monitoring points onto regular grids and use models such as ConvLSTM for forecasting.

Compared to GNN + time series models, the ConvLSTM family is more commonly used in scenarios with **regular grid structures and pronounced local spatial smoothness**, such as meteorological radar echo forecasting, air quality grid forecasting, and video frame-level prediction. Its advantages lie in relatively direct implementation, ease of leveraging existing convolutional network infrastructure for acceleration and deployment, and ease of collaboration with visual models such as CNN/ViT, for example, combining convolutional features and temporal recurrence in remote sensing image spatio-temporal modeling.

In terms of product form, models in this direction are mostly used in **meteorological/environmental forecasting systems, remote sensing spatio-temporal analysis platforms, and video and image spatio-temporal forecasting**, often exposing their capabilities upstream in the form of "future spatio-temporal scenario forecast maps," serving as important input for business decision-making and visual analysis.
# 7. Agents & Tool Use

In the previous capability layers such as vision and language, models mostly operated in a "passive answering" mode — receiving input and producing output. In many real-world business scenarios, however, what we need is an **agent that can proactively plan, invoke external tools, and orchestrate workflows**: it must not only see/read/hear, but also "decide what to do next" on its own — such as looking up information, running code, reading/writing files, calling internal systems, then integrating, interpreting, and feeding the results back to the user.

This layer can be understood as the critical glue that "turns a foundation model into an actionable system": through **structured tool-calling interfaces, workflow orchestration, multi-agent collaboration, and human-in-the-loop mechanisms**, it extends an LLM from a powerful "cognitive kernel" into a "digital employee" capable of completing end-to-end tasks.

## 7.1 Tool Calling / Function Calling

In the plain-text era of read-only, say-only interactions, an LLM was more like a "super conversationalist": it could understand questions, give advice, write code, and outline plans, but all the "truly executable" work — querying databases, running scripts, generating files, invoking cloud services — still had to be done manually by humans. The emergence of **Tool Calling / Function Calling** allows models, for the first time, to "take action" within a safety boundary: they automatically generate structured parameters from natural language to invoke external capabilities such as search engines, databases, computation engines, and image/audio/video generation services, and then organize and return the execution results, thereby forming a closed loop of "understanding → decision → execution."

From a product perspective, tool calling is the "chassis capability" of virtually all agent systems: the OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, and agent platforms from various cloud providers are essentially building a runtime layer on top of LLMs centered around **how to define tools, how to let the model correctly select tools, and how to handle errors and retries**. Below, we examine this layer from three angles — **scenarios**, **principles**, and **models** — and then expand on "tool-calling interface design," "tool selection and strategy," and "typical tool types" in the subsequent subsections.

- **Scenarios**
  - Intelligent Q&A and retrieval augmentation: The model automatically decides, based on the user's question, whether to invoke retrieval tools (vector/keyword search), query internal enterprise knowledge bases or public web search, and integrate retrieved documents and FAQs into the final answer.
  - Data and report automation: For requests like "look up sales for this period and draw a chart" or "calculate the risk metrics for this portfolio," the model automatically generates SQL or analysis parameters, invokes databases and computation engines, and returns charts and conclusions.
  - Document and file operations: Automatically read PDF/Word/Excel/database tables, extract and summarize key information, or generate new files (reports, contracts, proposals) as instructed, and upload/store them to designated locations via tools.
  - Media generation and processing: Invoke image/audio/video/3D generation services based on text instructions, or perform editing, compression, transcoding, watermarking, and other operations on existing media, forming a one-click "copywriting + design + export" content pipeline.
- **Principles**
  The core of tool calling is: **driving structured function calls with natural language**.
  - First, expose external tools' names, descriptions, and parameter structures (types, required fields, enumerated values, etc.) to the LLM in the form of JSON Schema or function signatures.
  - When a user makes a request, the LLM must not only understand the semantics but also determine "whether a tool needs to be called," "which tool(s) are needed," and "how the parameters for those tools should be filled in."
  - Once the model decides to call a tool, it generates structured parameters (typically JSON), which the runtime uses to actually execute the external API/program, and returns the execution result in structured form to the model, allowing the model to continue reasoning or generate the final answer based on the result.
  - To ensure safety and robustness, the system must handle parameter validation, timeouts, error returns, retries, and fallbacks during this process, and apply permission and audit controls for calls that may involve security/privacy concerns.
- **Models**
  The models and frameworks supporting this capability fall into three main categories:
  - LLMs with native Function Calling support: such as the GPT‑4.1 / o series, which natively understand "tool signatures + JSON Schema" at the decoding level and can proactively or reactively produce structured call parameters at the appropriate moment.
  - Tool-augmented reasoning paradigms: such as ReAct and Toolformer, which weave "thinking + tool calling" into the same reasoning chain, treating tool use as part of the intermediate steps rather than simple pre/post-processing.
  - Engineering frameworks and runtimes: the OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, cloud vendor agent platforms, etc., which provide infrastructure for tool definition, call routing, state management, error handling, and log auditing, allowing developers to focus on "which tools to expose" and "what business API abstractions to design" rather than building a runtime from scratch.

### 7.1.1 Tool-Calling Interfaces: From Natural Language to Structured Function Calls

A usable tool-calling system first requires a clear, standardized, LLM-friendly "tool interface layer." This layer is responsible for wrapping external-world APIs, scripts, and services into "functions" that the model can understand and safely invoke, enabling the model to "verbalize" the tool and its parameters it wishes to call as if writing pseudocode.

- **Tool definitions and parameter schemas**
  At the interface layer, each tool is typically defined using a structure similar to JSON Schema or a function signature: including the name, description, parameter fields (properties), types (string / number / boolean / array / object), whether they are required, and allowed value ranges or enumerations.
  This information is used on one hand to drive type checking in the frontend/SDK, and on the other hand is fed directly to the LLM to help the model "learn" how to correctly fill in parameters. The clearer the descriptions and the more reasonable the constraints, the more standardized the model's generated calls and the lower the error rate.
- **LLM-generated structured parameters**
  When a user makes a request like "look up Q3 2024 revenue and draw a bar chart broken down by region," the model must first reason that this requires at least a "report query tool" (to access data) and possibly a "chart generation tool" (to draw the chart). For each tool, it must extract and map structured parameters from the raw language — such as time range (start_date/end_date), dimension (region), metric (revenue), chart type (bar), output format, etc. — and then output them as JSON to be handed off to the runtime.
  In this process, the model is essentially performing integrated reasoning of "natural language → task planning → parameter extraction/filling," making the natural-language prompts in tool descriptions, parameter examples, and few-shot samples critically important.
- **Tool execution and result feedback**
  After receiving the JSON call produced by the model, the runtime first performs parameter validation and security checks before actually invoking the backend API or program. Once execution is complete, the result is wrapped as a structured object (such as a query result table, file URL, media resource ID, etc.) and returned to the model.
  The model then transforms these raw results into a user-readable explanation or performs further processing, such as summarizing reports, generating natural-language analysis, or embedding chart annotations. For the model, tool results are merely intermediate information — it is still responsible for "understanding the results + explaining the results."

### 7.1.2 Tool Selection and Strategy: Making Decisions in a Multi-Tool World

When there is only one tool in the system, "whether to use a tool" is the only question. But in real-world agent applications, there are often dozens or even hundreds of tools: retrieval from different data sources, business APIs from different departments, generation/analysis capabilities from different technical domains. This introduces a new challenge: **how the model makes reasonable selection and orchestration in a multi-tool environment**.

- **Tool selection and routing**
  First, the model must determine "whether the current request requires a tool call" and "which tool (or tools) to call." This is typically achieved by listing available tool descriptions in the system prompt and providing typical examples so the model learns to select the appropriate tool based on user intent.
  For scenarios with a large number of tools and high description similarity, many frameworks introduce a "tool router" (such as vector-retrieval-based or rule-based pre-filtering) that first narrows down a large list to several candidate tools, which are then exposed to the LLM for selection, thereby reducing the model's burden and the probability of misselection.
- **Multi-tool sequencing and composition**
  Complex tasks often require multiple tools working together. For example, "research the major listed companies in a certain industry and generate a report with financial comparison charts" may involve a search engine, a financial report database, a computation engine, a chart generation tool, and a document export tool.
  In such cases, the model needs to perform lightweight task planning: which tool to use first to obtain a list, then query detailed information for each item on the list one by one, then merge the data, perform calculations and visualization, and finally invoke the export tool to generate the report. Typical practices include ReAct/Planner-Executor approaches, where the model progressively completes combined tool calls in a cycle of "thinking (Plan) — calling (Act) — reflecting (Reflect)."

### 7.1.3 Typical Tool Types: The Capability Puzzle from Retrieval to Media Generation

Different types of tools provide agent systems with different dimensions of "external brains." From an engineering practice perspective, the following categories of tools are almost "standard equipment" for all complex applications.

- **Retrieval tools: vector and keyword search**
  Retrieval tools are responsible for extending "memory" to the external world:
  - Keyword search is suitable for traditional documents and business databases with good structure and clear fields.
  - Vector search uses embeddings to build semantic indexes for unstructured text, code, conversation logs, and even multimodal data, supporting "fuzzy but semantically relevant" retrieval.
    In RAG scenarios, the LLM pulls context relevant to the user's question via retrieval tools and then performs reasoning and generation on top of that context, significantly improving the timeliness and accuracy of answers.
- **Code execution and computation engines**
  Code execution tools (such as Python/JS sandboxes, notebook executors) allow LLMs to "write a piece of code and run it immediately" to solve complex computation, data processing, numerical simulation, visualization, and other problems.
  The model is responsible for producing code and input parameters, while the execution environment is responsible for security isolation, resource limiting, and result collection. These tools are critical in scenarios such as data analysis, quantitative research, automated reporting, scientific computing, and agent self-verification (where the model generates an answer and then verifies it with code).
- **File and data source access**
  File read/write tools are responsible for bringing external file systems and data sources into the agent's field of view: reading PDF/Word/Excel, accessing database tables, calling internal business APIs, etc. The model obtains real business data through these tools and then performs summarization, comparison, and report generation.
  Accompanying these are file writing and management tools: persisting generated reports, charts, PPTs, code, etc., and returning links or IDs for convenient subsequent access and integration by users.
- **Media generation and processing tools**
  Media generation tools add "creative" and "design" arms to agents:
  - Image/video generation and editing: automatically generate illustrations, posters, and storyboards based on copy, or crop, subtitle, watermark, etc., existing media.
  - Audio generation and processing: TTS, dubbing, music generation, audio enhancement and editing.
  - 3D / engineering tools: generate simple 3D scenes, CAD sketches, UI prototypes, etc.
    In content production, marketing design, education and training, gaming, and multimedia applications, these tools bring "from idea to finished product" closer to an automated pipeline.

Taken together, tool calling and execution extend LLMs from "language models" to "general-purpose controllers with action interfaces": the model understands requirements and the environment through language, performs real operations through tools, and continuously adjusts its strategy through feedback. Combined with appropriate workflow orchestration and multi-agent collaboration (see 7.2), this forms the foundational architecture for the next generation of intelligent applications.

## 7.2 Workflow & Orchestration

With tool-calling capabilities, an LLM is no longer just a "question answerer" but can become an "execution unit" oriented toward specific tasks. However, real-world business is often far more complex than a single conversation: a complete litigation analysis, a market research project, an A/B experiment configuration, or an end-to-end ops handling process typically requires multi-step operations, multiple tools, and even long-term participation from multiple roles. At this point, the single LLM + tools pattern begins to strain, necessitating further **workflow orchestration and multi-agent collaboration**.

From a systems perspective, this layer's responsibility is: **abstracting a complex, multi-step, multi-stakeholder business process into a workflow graph that LLMs can understand and manipulate**, then scheduling one or more agents on this graph, coordinating with human intervention, to jointly complete the task. Typical implementations include Planner-Executor agent architectures, agents with reflection/self-correction capabilities, and graph-based Workflow Orchestrators; corresponding product forms include various automated report generation and operations automation platforms, low-code workflow + LLM integration, complex business process robots, automated ops systems, and so on.

- **Scenarios**
  - Report and content pipelines: From "receiving requirements → retrieval and data pulling → analysis and visualization → writing reports → review and revision → export and distribution," automating or semi-automating multi-step content production processes.
  - Business process automation: Such as "product analysis → competitor monitoring → campaign strategy generation → deployment configuration" in e-commerce operations, or "monitoring alerts → root cause analysis → mitigation execution → post-mortem report" in ops scenarios.
  - Cross-role collaboration: Enabling agents from different domains (legal, finance, engineering, operations) to collaborate around a complex project, such as M&A due diligence, investment and financing material preparation, or large-scale project bid preparation.
- **Principles**
  The core of workflow and multi-agent collaboration is adding a layer of **structured control and state management** on top of LLMs:
  - Decompose complex tasks into several subtasks with dependencies, represent them using DAGs / state machines / directed graphs and other structures, and configure trigger conditions, inputs/outputs, and required agents/tools for each node.
  - A Planner-type agent or upper-level orchestrator decides when to trigger which node and which agent or tool to use, and dynamically adjusts subsequent paths (conditional branches, loops, error fallbacks) based on execution results.
  - Introduce Human-in-the-loop at critical junctures, performing manual confirmation and editing for high-risk decisions and key outputs, and feeding human feedback back into the system to update strategies or fine-tune models.
- **Models**
  The main technical directions supporting this layer include:
  - Planner-Executor agent architecture: A "planning agent" is responsible for task decomposition and path design, while one or more "execution agents" are responsible for implementing specific steps.
  - Reflection / self-correction agents: Continuously review their own performance during execution, reflect on and correct unreasonable intermediate results, and reduce the silent propagation of "confident errors."
  - Graph-based Workflow Orchestrator: Model the entire task flow as a graph structure, introducing node states, edge conditions, parallel/serial control, and other mechanisms, so that LLM calls become one or more nodes in the graph rather than the sole control center.

### 7.2.1 Task Decomposition and Planning: From "One-Sentence Requirements" to Executable Flows

What users give to agents is typically a highly compressed natural-language requirement, such as "do a market research report on the new energy vehicle industry and output a PPT," which actually encompasses numerous steps including retrieval, filtering, analysis, visualization, layout, and multiple rounds of revision. How to automatically build a clear, executable workflow from this single sentence is the first step in workflow orchestration.

- **From natural language to subtask graphs**
  A Planner-type agent must first "unfold" the requirement: combine built-in templates, historical cases, and the tool inventory to identify key phases (such as information collection, data analysis, structural design, content writing, review and export) and further refine them into executable subtasks (such as "retrieve 5 authoritative industry reports from the past year," "pull the last 3 years of sales data broken down by vehicle model," "generate 3 comparison charts," etc.).
  The dependencies and scheduling logic among these subtasks are explicitly represented as a graph or state machine: which ones can run in parallel, which must execute sequentially, at which nodes human confirmation is needed, and under what conditions rollback or retry is required.
- **Conditional branches, loops, and exception paths**
  Real-world processes are often not linear pipelines but contain **conditional branches** (e.g., "if not enough high-quality reports can be retrieved, switch keywords or data sources"), **loops** (e.g., "continuously attempt rewriting and compression until the report length meets the limit"), and **exception paths** (e.g., "if a data source is unreachable, switch to an alternative source or use an estimation method").
  This requires the workflow orchestration layer to be able to express control-flow semantics such as if/else, while/for, and try/catch on the graph structure, and to allow the Planner Agent or upper-level orchestrator to make decisions based on real-time results during execution, rather than merely planning all steps upfront in a one-shot manner.
- **Connection with tool calling**
  Task decomposition and planning are tightly connected with the tool calling discussed in 7.1: when generating subtasks, the Planner often simultaneously specifies "which tools/agents this task requires" and "the input/output format of this node," laying the groundwork for subsequent automatic parameter filling and tool execution.
  Some systems adopt an explicit two-phase "Plan + Execute" approach: the Planner first outputs a machine-readable plan (such as a JSON workflow description), and then the Executor strictly invokes tools and agents according to the plan. Other systems adopt a ReAct style, weaving "thinking–tool calling–observation–rethinking" into the same conversation to achieve more flexible adaptive execution.

### 7.2.2 Multi-Agent Collaboration: Letting a "Virtual Team" Play to Their Strengths

A single large model is certainly powerful, but in complex business scenarios, different domains often require different knowledge structures, style preferences, and safety strategies. The idea behind **multi-agent collaboration** is to decompose a single "big and comprehensive" intelligence into multiple "specialized and refined" roles: someone is responsible for planning, someone for execution, someone for review, and someone for domain-specific professional judgment, forming a virtual team composed of agents + tools + humans.

- **Role division: planning, execution, and review**
  In a typical multi-agent workflow, common roles include:
  - Planning Agent: Responsible for understanding user requirements, designing the overall plan, decomposing subtasks, and dynamically adjusting the path based on results during execution.
  - Execution Agents: Deeply optimized around certain tools or subdomains (such as retrieval agents, data analysis agents, content writing agents), completing specific steps according to the plan.
  - Review Agent: Inspects and revises intermediate and final outputs from structural, logical, stylistic consistency, and risk-control perspectives, analogous to a "virtual editor/reviewer."
- **Domain-expert agent coordination**
  For highly specialized domains such as law, finance, engineering, and operations, domain-expert agents can be further subdivided: such as "legal advisor agent," "investment research analyst agent," "cloud-native ops agent," "advertising optimization agent," etc.
  They can participate in project-based collaboration based on domain-specific knowledge bases, tools, and even specially fine-tuned models: for example, in investment and financing materials, the technical agent handles the technical feasibility section, the financial agent handles the financial model and valuation, the legal agent handles compliance and risk disclosure, the operations agent handles market and growth strategy, and a master control agent consolidates and unifies the style.
- **Collaboration protocols and message routing**
  The key to multi-agent collaboration also lies in "who talks to whom and when." The system needs a message routing and coordination mechanism to:
  - Decide which agent should handle a given user request or intermediate result.
  - Maintain shared context and each agent's private memory.
  - Control parallel and serial execution, as well as conflict resolution (such as how to arbitrate when different agents propose contradictory suggestions).
    These capabilities are typically provided by an upper-level orchestrator or "management agent," while frameworks such as LangChain and AutoGen provide infrastructure at the engineering level for conversation routing, multi-agent sessions, role configuration, and more.

### 7.2.3 Human-in-the-Loop: Keeping Risk Gates in Hand

No matter how intelligent workflows and multi-agent collaboration become, real-world business still cannot completely dispense with human judgment, especially in **high-risk, high-cost, high-sensitivity** scenarios such as legal compliance, financial decision-making, medical advice, large-scale production changes, and public opinion response. The design of **Human-in-the-loop** is precisely about finding a balance between automation and controllability: automate what should be automated, and definitely pause for a human to review what requires manual confirmation.

- **Manual confirmation at critical steps**
  In the workflow graph, several "manual approval/confirmation nodes" are typically explicitly marked:
  - For example, when auto-generating a contract, dual confirmation from legal and business leads is required before issuance;
  - In automated ops systems, operations involving production environment changes, batch restarts, or configuration modifications must be confirmed by the on-call engineer with a click;
  - In content generation scenarios, content intended for broad public release or that is brand-sensitive requires manual review.
    The Orchestrator pauses automatic execution at these nodes, sends intermediate results to the corresponding human roles, and continues the subsequent flow only after receiving feedback.
- **Feedback-driven strategy updates**
  Humans don't just "press approve or reject" at a certain moment; more importantly, the content of their feedback can be absorbed by the system:
  - Compare human-edited versions with original outputs and record them as "positive/negative examples" for subsequent prompt optimization or model fine-tuning.
  - Based on statistical analysis, identify which types of tasks/steps are most frequently modified by humans, and then optimize the corresponding agent's prompts, tool combinations, or workflow design.
  - In extreme or anomalous cases, humans can add "blacklists / whitelists / special rules" that directly influence the system's strategy selection in similar situations.
- **Risk grading and observability**
  Finally, Human-in-the-loop also requires a clear set of risk-grading and observability mechanisms:
  - Classify processes into different risk levels based on dimensions such as task type, scope of impact, monetary scale, and sensitive information involved, corresponding to different intensities of human intervention (e.g., read-only review, mandatory approval, multi-level approval).
  - Through logs, audits, visualization dashboards, and other means, enable operations/management personnel to track at any time which tasks are running, which step they are at, where human intervention was triggered, and what failures and manual corrections have occurred historically.
    These capabilities not only improve the system's acceptability within the enterprise but also provide a foundation for subsequent compliance audits and responsibility attribution.

Taken together, tool calling and execution (7.1) addresses the problem of "single-step action," while workflow orchestration and multi-agent collaboration (7.2) attempts to answer "how to string many steps together so that different roles can collaborate long-term and operate in a controllable manner." The combination of both, along with Human-in-the-loop and sound engineering practices, forms the next-generation intelligent application foundation for real-world business scenarios.
# 8. Retrieval & Knowledge

In the preceding vision and understanding layers, models primarily rely on "knowledge learned within their own parameters" to understand and generate content. In real business settings, however, many problems cannot be solved by "memory" alone: internal company policies change daily, regulations and industry standards are continuously updated, and a particular customer's history exists only in internal databases. In these cases, relying solely on what the model has "memorized" is far from sufficient — what matters more is whether the model can **efficiently retrieve and reason over external knowledge bases, structured data, and knowledge graphs**.

Think of this layer as adding an "external brain that can look up references and query databases" on top of the model's capabilities. When a user poses a question, the system no longer generates an answer directly; instead, it first goes to the appropriate data sources to "look things up": document repositories, databases, search engines, knowledge graphs, logs, and business systems... and then has the model produce an answer or decision based on the genuinely retrieved content. This not only significantly improves accuracy and timeliness but also substantially enhances explainability and compliance (for example, citing sources and preserving executed SQL records).

Within this layer, common capabilities broadly fall into two directions: one is **Retrieval-Augmented Generation (RAG)**, primarily oriented toward "natural language Q&A + document/knowledge base retrieval"; the other is **Structured Data & Knowledge Graphs (Structured Data & KG)**, responsible for more precise, controllable access and reasoning over databases, graph databases, and domain knowledge platforms. These are detailed below.

## 8.1 Retrieval-Augmented Generation (RAG)

RAG (Retrieval‑Augmented Generation) can be thought of as an "LLM that knows how to look things up." Unlike relying purely on a model's internal parameters, RAG, before answering each question, first retrieves from an external knowledge base, finds the most relevant document fragments (chunks), and then feeds those retrieved pieces as "context" to the LLM so that it generates an answer based on "having seen the material." For enterprise knowledge base Q&A, industry report search, legal/medical/financial professional Q&A, internal document search bots, and similar scenarios, RAG has become the default paradigm.

Architecturally, a typical RAG system can be broken down into three layers: **the indexing layer, the retrieval layer, and the generation layer**. The first two are primarily about "retrieving accurately," while the last is responsible for "articulating clearly." The following sections expand on these three layers, with further refinement of core design and practices in the subsections.

- **Scenarios**
  - Enterprise internal knowledge Q&A: employees ask questions in natural language about policies and procedures, technical documentation, or project materials; the system retrieves relevant content from internal documents and wikis, then the LLM generates clear answers with citations.
  - Industry report and research search: searching across large volumes of PDFs, reports, and papers for content related to an industry question (e.g., "changes in new energy vehicle subsidy policies"), and automatically summarizing, comparing, and listing sources.
  - Legal / medical / financial domain Q&A: retrieval augmentation based on authoritative materials such as legal provisions, court judgments, clinical guidelines, and product manuals, reducing the risk of "fabrication."
  - Internal document / ticket search bots: helping operations, customer support, and R&D quickly locate answers in knowledge bases, tickets, and change logs, then summarizing the results in natural language.
- **Principles**
  The core idea of RAG is "store knowledge externally, delegate reasoning to the model":
  - Break unstructured documents (PDFs, web pages, Word documents, technical docs, etc.) into chunks suitable for retrieval, map them into vector space using an Embedding model, and build vector indexes (e.g., FAISS, Milvus, PGVector).
  - At query time, leverage both semantic vector retrieval and keyword retrieval (Hybrid Search) to find the document chunks most relevant to the question, then re-rank them (Re‑ranking) based on relevance and coverage.
  - Feed the retrieved context, the user's question, and any necessary system instructions / format constraints into the LLM; the model answers under the constraint of "visible evidence" and includes source citations in its output to improve explainability and auditability.
- **Models**
  A typical RAG system is often a **model composition architecture**:
  - Embedding model: encodes queries and document chunks into the same semantic space and is key to vector retrieval quality (includes general-purpose embeddings and domain‑specific embeddings).
  - Retrieval and re‑ranking models: Hybrid Search (e.g., BM25 + Vector) handles the first round of recall; a Cross‑Encoder Re‑ranker or the LLM itself performs finer-grained re‑ranking on the recalled results.
  - Generation model: the LLM answers given the retrieved context; in more complex RAG / HyDE / ReAct + RAG setups, the LLM also participates in processes such as "pseudo-document generation," "multi‑turn tool calling," and "thought + retrieval alternation" to improve recall, reduce forgetting, and enhance reasoning ability.

### 8.1.1 Index Construction & Knowledge Asset Curation

In any RAG system, index construction is foundational. Without high‑quality indexing, even the most powerful LLM downstream is like "a skilled cook without ingredients." The goal of index construction is to transform messy document resources into "retrievable, maintainable, and scalable knowledge assets."

From a process perspective, typical index construction involves the following key steps:

1. **Document chunking and preprocessing**
   Documents are often long PDFs, PPTs, Word files, or web pages. Vectorizing an entire document at once both tends to cause "dilution" (one document spans multiple topics) and hinders efficient retrieval. Therefore, you need to:
   1. Chunk by paragraph, heading, page number, and chapter structure, balancing "semantic completeness" and "chunk size";
   2. Handle formatting issues (tables, formulas, OCR for text in images), denoise (headers, footers, tables of contents, copyright notices, etc.);
   3. Generate "context labels" for each chunk (e.g., source document, chapter title, page number) to prepare for subsequent interpretation and citation.
2. **Embedding and vector index**
   Based on the chunks, generate semantic vectors for each document chunk:
   1. Select an appropriate Embedding model (e.g., general‑purpose semantic embeddings, domain‑finetuned models) to ensure strong representation capability for the target language and domain terminology;
   2. Use FAISS, Milvus, PGVector, or similar tools to build high‑dimensional vector indexes that support approximate nearest‑neighbor search at scale;
   3. Handle multi‑version and incremental updates: when documents are updated, support incremental index rebuilds, version tracking, and stale‑version cleanup strategies.
3. **Meta‑information indexing and filtering**
   Semantic vectors alone cannot meet complex filtering needs; a **meta‑information index** is usually also required:
   1. Supplement each document chunk with metadata such as time, author, source, document type, line of business, and sensitivity level;
   2. Support pre‑filtering based on metadata during retrieval (e.g., time range, department, permission level) to reduce irrelevant results;
   3. Lay the groundwork for access control and auditing, preventing RAG from leaking content that the user is not authorized to view.

### 8.1.2 Retrieval & Re‑ranking: From "Recalling Relevant" to "Finding the Most Suitable Evidence"

Once index construction is complete, when a user submits a query, the system enters the retrieval and re‑ranking phase. The key here is not just "finding some relevant documents," but finding an **evidence set that is both relevant, sufficiently comprehensive, and supportive of reasoning**.

1. **Hybrid retrieval: the complementarity of vector + keyword**
   Pure vector retrieval excels at capturing semantic similarity, but for exact terminology, codes, table fields, etc., keyword retrieval (e.g., BM25) is often more robust. Therefore, Hybrid Search is widely adopted in engineering practice:
   1. First perform vector retrieval and keyword retrieval on the query separately, obtaining two sets of candidate document chunks;
   2. Merge the two candidate sets using weighted scoring or a learned fusion strategy;
   3. In some scenarios, dynamically adjust the weights of vector and keyword retrieval based on the query type (FAQ‑style Q&A vs. legal provision lookup).
2. **Re‑ranking: more fine‑grained selection of the "evidence set"**
   Initial retrieval results often include many "marginally relevant" or "redundant" document chunks, requiring re‑ranking to improve the quality of the final Top‑K:
   1. Use a Cross‑Encoder to perform bidirectional encoding and relevance scoring on each "query–document chunk" pair; it is more accurate than a dual‑tower Embedding model but more expensive, making it suitable as a second‑stage re‑ranker;
   2. When performance allows, introduce the LLM for lightweight re‑ranking, letting the model judge which chunks are truly "useful" based on richer semantic and contextual information;
   3. Simultaneously consider coverage and diversity to avoid all retrieved chunks concentrating on the same document or paragraph, which would narrow the answer's perspective.
3. **Retrieval‑generation closed‑loop optimization**
   In more advanced practice, retrieval and generation are no longer a one‑way pipeline but form a closed loop:
   1. Use the LLM to analyze the "usage" of retrieval results (which chunks are cited, which are consistently ignored) and feed that back to guide optimization of indexing and chunking strategies;
   2. Leverage "follow‑up / correction" signals from conversation logs to annotate and retrain on recall failures and false‑positive retrievals, improving the system's robustness for ambiguous queries and long‑tail problems.

### 8.1.3 Generation & Citation: Answering Questions "Constrained by Evidence"

The final link is the generation layer, which directly determines the user experience. The goal here is not to let the model "freely improvise," but to have it produce **clear, bounded, and well‑cited answers under the constraints of the retrieved evidence**.

1. **Controlled generation based on retrieval context**
   In a RAG architecture, the LLM receives not only the user's question but also multiple retrieved document chunks and system instructions. The system typically:
   1. Constrains the model via prompts to "answer only based on the given documents" and "clearly state if the answer cannot be found in the documents";
   2. Structurally organizes the retrieval context (segmented, numbered, source‑annotated) so that the model can easily understand and cite it;
   3. Controls the output format (lists, tables, bullet‑point explanations, etc.) to accommodate downstream systems or frontend display.
2. **Citation and explainability (Source Citation)**
   To facilitate auditing and traceability — especially in high‑risk domains like legal, medical, financial, and internal corporate policy — answers often need to include explicit citations:
   1. Annotate citations in the output, e.g., "[Document A, Chapter 3, Section 2]" or "[Regulation X, Article 12]";
   2. Support one‑click navigation to the original text location in the frontend, making it easy for users to verify and read further;
   3. Persist the complete "question → retrieval results → cited chunks → final answer" chain log in the backend, providing data for subsequent risk control and model improvement.
3. **Advanced RAG variants: HyDE / ReAct + RAG, etc.**
   To further improve results in challenging scenarios, more complex RAG variants are used in practice:
   1. HyDE: the LLM first generates a "hypothetical answer document" based on the question, then uses that document's vector to retrieve real documents, thereby improving recall quality;
   2. ReAct + RAG: the LLM operates in a "Reasoning + Action" mode, calling the retrieval tool multiple times during reasoning to progressively refine the question and supplement evidence — akin to "thinking while looking things up";
   3. Multi‑turn RAG: during a conversation, historical retrieval results and answers are retained, forming a context‑aware, long‑term knowledge session rather than merely "one question, one retrieval."

## 8.2 Structured Data & Knowledge Graphs (Structured Data & KG)

If RAG primarily addresses "how to look up information in large‑scale unstructured documents," then the structured data and knowledge graph layer is more about "how to elegantly leverage structured knowledge in databases, reporting systems, and graph databases."

In enterprise environments, the truly critical business data — orders, customers, contracts, inventory, behavioral logs — often resides in relational databases, data warehouses, OLAP engines, or graph databases. These systems are already very mature in terms of query capability, computational efficiency, and auditing, but for business users, writing SQL or DSL directly still has a fairly high barrier to entry. **Text‑to‑SQL / Text‑to‑DSL** and **knowledge graph Q&A and reasoning** aim to let the LLM serve as a "natural language interface" and "reasoning collaboration partner" without disrupting the stability of these systems.

- **Scenarios**
  - BI intelligent Q&A and self‑service analytics: business users ask questions in natural language (e.g., "Show me the repurchase rate trend for new customers in East China over the last 3 months"); the system automatically generates SQL, queries the data warehouse, and returns results in natural language with visualizations.
  - Operations / sales analysis assistant: operations staff can explore data conversationally ("Why did this campaign's conversion rate drop?" "Which channels contributed the most high‑value users?"), progressively refining conditions and dimensions over multiple turns.
  - Domain knowledge platform: organize entities, concepts, rules, and cases into a knowledge graph, supporting upstream‑downstream relationship exploration and compliance checks around specific entities.
  - Graph database Q&A and reasoning systems: in scenarios such as risk control, anti‑money laundering, and supply chain analysis, use graph databases together with LLMs to answer and explain questions involving "relationship chains" and "multi‑hop reasoning."
- **Principles**
  The core of this layer is transforming the LLM from "someone who directly gives answers" into "an assistant that can query databases and graph databases":
  - In database Q&A, the model needs to understand the user's natural language intent, combine it with the database schema (table structures, field meanings, constraints, etc.), generate correct SQL / GraphQL / internal DSL, and then explain and visualize the execution results.
  - In knowledge graph scenarios, the system first needs to extract entities and relationships from documents and logs to build a structured graph; then, during Q&A, the LLM is responsible for translating natural language questions into graph queries (e.g., Cypher) and performing multi‑hop reasoning and explanation based on the query results.
  - Unlike RAG, the emphasis here is on **precise access to structured data and graph structures** — ensuring semantic correctness and syntactic rigor on one hand, while controlling side‑channel attacks, sensitive data exposure, and expensive queries on the other.
- **Models**
  Typical solutions are usually "LLM + specialized components" multi‑module architectures:
  - Text‑to‑SQL model: models pretrained or finetuned on large‑scale SQL corpora (e.g., PICARD, DIN‑SQL), emphasizing syntactic correctness and schema alignment, sometimes paired with execution feedback for self‑correction.
  - Information extraction and graph construction pipeline: through modules such as named entity recognition (NER), relation extraction, and event extraction, build and update knowledge graphs from text and logs; the LLM can assist with hard‑case extraction and borderline ambiguous relationships.
  - LLM + graph database joint Q&A: the LLM handles question parsing, query generation, and result explanation, while the graph database (e.g., Neo4j) handles efficient execution and multi‑hop relationship search; the two interface via tool‑calling protocols or an intermediate DSL.

### 8.2.1 Database Q&A (Text‑to‑SQL / DSL) in Practice

The goal of database Q&A is to let business users "ask data questions in natural language" while the system automatically handles query generation, execution, and explanation behind the scenes. Doing this well requires balancing **semantic accuracy, syntactic correctness, and execution safety**.

1. **Natural language to SQL / DSL conversion**
   In the most basic pipeline, the system needs to:
   1. Parse user intent: identify the query target (e.g., "new customers in East China"), filter conditions (time, region, channel), aggregation methods (count, average, YoY/QoQ), and display requirements (trend, ranking, Top‑N);
   2. Combine with the database schema: understand which tables and fields can express the above concepts, and how to join, group by, and sort;
   3. Generate executable SQL / GraphQL / internal DSL, and ensure structural legality through a syntax validator or a specialized Text2SQL model (PICARD, DIN‑SQL, etc.).
2. **Natural language explanation and visualization of execution results**
   After query execution, the system must also turn "a cold result set" into "understandable insights":
   1. Provide textual explanations for simple results, e.g., "Over the last 3 months, the repurchase rate of new customers in East China has shown an overall upward trend, rising from 15% to 21%";
   2. Select appropriate visualization forms for complex results (line chart, bar chart, pie chart, distribution chart, etc.) and provide brief analysis;
   3. Support users asking follow‑up questions based on current results (e.g., "Which channels mainly drove this growth?"), automatically constructing new queries based on historical SQL and context.
3. **Security and control: preventing "reckless queries" and "unauthorized access"**
   Because LLM‑generated SQL is highly flexible, a layer of security and governance mechanisms is essential:
   1. Strictly limit the queryable databases, tables, fields, and time ranges based on user roles and permissions;
   2. Equip model‑generated SQL with static/dynamic review rules that filter out dangerous operations (e.g., large‑scale scans, high‑cost joins, cross‑tenant queries);
   3. Fully log "natural language question → generated SQL → execution result → final answer" for auditing and anomaly analysis.

### 8.2.2 Knowledge Graph Construction & Querying

Knowledge graphs attempt to organize knowledge scattered across text, tables, and logs into a structured network of "entities–relationships–attributes–events," thereby better supporting **relationship exploration, multi‑hop reasoning, and complex Q&A**. In this direction, LLMs complement traditional information extraction and graph databases well.

1. **Extracting entities and relationships from documents to build graphs**
   Constructing a knowledge graph typically uses a multi‑stage pipeline:
   1. Information extraction: use models such as NER, relation extraction, and event extraction to identify entities (people, organizations, products, places, concepts, etc.), their relationships (subordination, collaboration, dependency, causality), and key events (transactions, risks, changes) from text;
   2. Normalization and alignment: normalize different expressions of the same entity (abbreviations, aliases, spelling variants) and align them to a unified ID;
   3. Graph updates and version management: support incremental updates, conflict resolution, and error correction, ensuring the graph maintains quality and consistency over long‑term evolution. LLMs can assist traditional algorithms in disambiguation, relationship type refinement, and rule induction.
2. **LLM + graph database (Neo4j, etc.) querying and reasoning**
   Once the graph is built, the graph database handles efficient storage and retrieval, while the LLM can play the role of "natural language entry point + reasoning controller":
   1. Question parsing and graph query generation: translate natural language questions into graph query statements (e.g., Neo4j's Cypher), including determining the starting entity, relationship types, path length, and filter conditions;
   2. Multi‑hop reasoning: use paths and local subgraphs obtained from graph queries, then have the LLM explain and summarize, e.g., "Customer A is indirectly connected to high‑risk entity B through three intermediary companies";
   3. Result visualization and explainability: present graph query results as a visual network, while the LLM provides a verbal explanation to help users understand complex relationship structures.
3. **Domain knowledge platform and unified services**
   In larger‑scale enterprise or industry‑level applications, knowledge graphs often serve as a "domain knowledge platform":
   1. Provide a unified entity and relationship view for upstream business systems (risk control, compliance, customer 360 view, supply chain analysis, etc.);
   2. Together with RAG and database Q&A, form a unified knowledge service layer, where a unified LLM orchestration logic decides whether the current question should access the document index, relational database, or graph database;
   3. Under security and compliance requirements, use graph‑level access control and masking strategies to further reduce the risk of sensitive information leakage.

The shared goal of this layer is to upgrade "the model can talk" to "the model can both talk and truly connect to the enterprise's real data and knowledge assets." When RAG, Text‑to‑SQL, knowledge graphs, and traditional data infrastructure are effectively integrated, AI systems can maintain both intelligence and flexibility in complex business environments while also possessing controllability, explainability, and long‑term evolution capability.
# 9. Safety, Alignment & Evaluation

In previous chapters, we focused more on "what the model can do": interpreting images, writing code, conversing with users. But in real-world large model systems, mere "capability" is far from enough: **how do we prove these capabilities are stable, reliable, and controllable? How do we ensure outputs align with values and compliance requirements? How do we continuously monitor, iterate, and regress during long-term operations?**
This layer is concerned with: **capability evaluation & benchmarks, value alignment & training, content safety & compliance, and robustness & hallucination control** — together forming a sustainable "infrastructure layer" for large model operations.

From a product perspective, these capabilities span the entire model lifecycle: models require standard benchmarks and professional evaluation during the lab phase; they must pass alignment training and safety reviews before launch; post-launch they rely on content safety gateways, log auditing, and A/B testing for continuous monitoring; and when facing new scenarios and threats, they return to the evaluation and alignment stages for retraining and re-validation. Below, we explore four dimensions: **capability evaluation & benchmarks, value alignment & training, content safety & compliance, and robustness & hallucination control**.

## 9.1 Capability Evaluation & Benchmarks

In the process of developing and deploying large models, **capability evaluation & benchmarks** is the critical link that transforms "model capability" into "observable signals": it must answer both "how good is this model overall" and "how does it perform in a specific domain or real business scenario." On one hand, we use standardized benchmark suites and automated evaluation systems to measure model performance on general dimensions such as **language understanding & generation, reasoning & math, and knowledge & factuality**. On the other hand, we need to build specialized evaluations for domains like **healthcare, law, finance, and education**, and continuously validate and refine them through **real user conversations, A/B testing, and business metrics (Task Success Rate, CSAT, ticket closure rate, etc.)**. Overall, this layer ultimately crystallizes into an internal capability evaluation platform and an external-facing **"capability specification,"** providing a unified decision-making basis for model selection across multiple versions, tenants, and scenarios. Below, we elaborate from three perspectives: **scenarios**, **principles**, and **models**.

- **Scenarios**
  - **General Capability Evaluation Scenarios**: When releasing a base model or major version update, we need to systematically evaluate its performance on **language understanding & generation** tasks such as reading comprehension, summarization, translation, and dialogue quality, as well as its ability in **reasoning & math** tasks like arithmetic, multi-step reasoning, and code/logic problems. At the same time, we measure its **knowledge & factuality** level through fact-based QA, open-domain QA, and knowledge coverage tasks, to determine "whether the new model represents an overall improvement."
  - **Domain-Specific Evaluation Scenarios**: For specialized fields such as healthcare, law, finance, and education, we need to design professional Q&A and decision-making simulations — for example, disease Q&A and triage recommendations, legal text comprehension and case classification, investment analysis and risk control judgments, teaching assistance and homework tutoring — and test the model's consistency and stability in **multilingual and multicultural environments**, confirming whether it can "say the right thing, and say it appropriately" in high-stakes settings.
  - **Real-World & Business Metric Evaluation Scenarios**: During product launch and ongoing operations, through user conversation log replay, online A/B testing, etc., we map model performance to business metrics such as **Task Success Rate**, **Customer Satisfaction (CSAT)**, and **ticket closure rate**. At this point, the evaluation target is effectively the entire "model + policy + product flow" system, used to guide version rollbacks, policy tuning, and new feature rollout.
- **Principles**
  The capability evaluation system can be viewed as a layered "measurement systems engineering" effort, with core principles including:
  - **Standard Benchmark Suites: Common Yardsticks & Reproducible Experiments**
    - Language / Reasoning: Use comprehensive tasks like **MMLU** and **BIG-Bench**, combined with math and logic problems such as **GSM8K** and **MATH**, to establish a unified yardstick for language understanding, knowledge mastery, and multi-step reasoning.
    - Coding: Through **HumanEval**, **MBPP**, and **Codeforces** problem sets, quantify code generation, program repair, and problem-solving capabilities.
    - Multimodal: Leverage benchmarks like **VQA**, **MMBench**, **ScienceQA**, and **MathVista** to evaluate image-text understanding, visual question answering, and mathematical reasoning in images.
      These benchmarks emphasize **standardization, reproducibility, and comparability**, facilitating cross-model and cross-institution horizontal comparisons and external disclosure.
  - **Automated Evaluation: Scaling & Continuous Regression**
    - **LLM-as-a-Judge**: Use a stronger or specially trained model to score/rank responses, evaluating correctness, completeness, style, and safety, enabling large-scale automated subjective evaluation.
    - **Rule-based Metrics**: Such as BLEU / ROUGE / BERTScore for measuring text similarity, Pass@k for measuring code problem pass rates, etc., allowing rapid comparison of differences across versions on fixed datasets.
      The key to automated evaluation lies in **stability and consistency** — even if imperfect, as long as "the bias is consistent," it can reliably reflect relative model changes in continuous integration (CI).
  - **Human Evaluation: Aligning with Human Perception & Business Objectives**
    - **Pairwise Comparison & Scoring Annotation**: Annotators perform pairwise selection or multi-dimensional scoring (helpful / honest / harmless, etc.) on A/B model responses — an important data source for training RLHF / RLAIF reward models.
    - **Online User Experiments**: Conduct A/B testing in deployment scenarios such as conversational assistants, search/recommendation, directly observing the impact of different models/policies on metrics like user satisfaction and conversion rates.
      Human evaluation serves both to **calibrate automated evaluation** and as an important basis for externally "explaining model behavior."
- **Models**
  In engineering practice, capability evaluation crystallizes into a relatively complete "platform + pipeline + metrics system":
  - **Internal Capability Evaluation Platform & CI Pipeline**: Unified management of various benchmark suites, evaluation scripts, LLM-as-a-Judge configurations, and human annotation tools, supporting one-click benchmark regression upon new model or policy submission; automatically aggregating metric changes across different tasks and dimensions, providing visual dashboards and regression alerts.
  - **External "Capability Specification" & Model Profile**: Organizing internal evaluation results into an externally consumable "capability specification," including representative benchmark scores, recommended applicable scenarios (e.g., general conversation, code assistance, multimodal understanding), known limitations, and unsuitable scenarios — helping customers form correct expectations and providing a basis for compliance and liability delineation.
  - **Multi-Tenant / Multi-Version Unified Model Evaluation & Selection Tool**: Under a single evaluation framework, uniformly compare models of different sizes, alignment strategies, or architectures, supporting weight configuration by industry, region, and SLA requirements, automatically generating a "performance–cost–latency" composite score to help product and business teams make model selection and canary release decisions.

### 9.1.1 General & Domain-Specific Capability Evaluation: From Benchmarks to Scenario Validation

General and domain-specific capability evaluation is the "first layer of the foundation" for the entire evaluation system, with the key focus being: first measuring the model's **foundational capabilities** on a unified yardstick, then validating its **usability and risk** in specialized scenarios.

In general capability evaluation, tasks are typically broken down into three dimensions: language understanding & generation, reasoning & math, and knowledge & factuality. The first examines whether the model can accurately understand context, control style, and output coherent text through reading comprehension, summarization, translation, and dialogue quality tasks; the second evaluates the model's ability in complex reasoning chains and program structure through arithmetic, multi-step reasoning, and code/logic problems; the third measures knowledge coverage and factuality through fact-based QA and open-domain QA. In domain-specific evaluation, industry experts need to be involved in data design: for example, in medical Q&A, setting contexts such as medical history and lab results, requiring the model to provide risk warnings and boundaries for medical advice in its responses; in legal tasks, designing statute retrieval, case comparison, and legal applicability analysis; in finance and education, focusing on compliance disclosures and instructional guidance. This layer of evaluation often combines standard benchmark suites with custom-built datasets, pursuing both comparability and business relevance.

### 9.1.2 Automated Evaluation & LLM-as-a-Judge: Making Evaluation Scalable

When the scale of tasks and the number of model versions grow rapidly, relying solely on human evaluation can no longer meet evaluation needs — at this point, an automated evaluation system is required to achieve **scalability and high-frequency regression**.

One approach uses traditional rule-based metrics: for translation and summarization tasks, comparing against reference answers using BLEU / ROUGE / BERTScore; for coding tasks, using Pass@k to test whether at least one of multiple generated samples passes unit tests. These metrics are simple to implement and highly automatable, but are insensitive to answer diversity and stylistic nuances. Another more representative approach is **LLM-as-a-Judge**: using a stronger or specially trained model as a "scoring referee," performing dimensional scoring or pairwise ranking of the evaluated model's outputs based on predefined scoring rubrics. This enables efficient automated evaluation even in open-ended QA and dialogue tasks where there are no standard answers and responses are diverse. In practical engineering, the scoring criteria and prompts for LLM-as-a-Judge need to be calibrated and iterated against human-annotated data to ensure consistency with human judges.

### 9.1.3 Human Evaluation & Business Metrics: Closing the Loop to Real User Experience

No matter how comprehensive offline metrics are, they can only approximate real user experience. To close the capability evaluation loop to the business, two types of methods are needed: human evaluation and online experiments.

On the human evaluation side, the most common approach is Pairwise Comparison: annotators, without knowing the model identity, make preference selections or score A/B responses based on dimensions such as helpful / honest / harmless, producing high-quality preference data. This data is used both for direct evaluation and for training reward models in RLHF / RLAIF. On the business side, online A/B testing compares the impact of different models, prompts, and policy configuration versions on key metrics such as task completion rate, customer satisfaction (CSAT), and ticket closure rate, supplemented by user conversation log replay and manual spot checks, to continuously monitor the model's real-world performance post-launch. The output of this layer of evaluation in turn feeds back to guide the focus and weight adjustments of the capability evaluation platform, forming a closed loop of "offline metrics — human evaluation — online metrics."

## 9.2 Value Alignment & Training

After acquiring powerful foundational capabilities, for a large model to become a "safe, reliable, and controllable" product, it must also undergo **value alignment & training**. This layer is no longer concerned with whether the model "can answer," but with "**whether the answer is helpful, honest, and harmless**" and "how it should speak in different roles and industries." From an engineering perspective, the alignment process roughly involves three steps: first, clearly defining **alignment goal definitions (What to Align)** through documentation and specifications, decomposing Helpful, Honest, and Harmless into annotatable and trainable standards; second, constructing broad-coverage **instruction data and safety data**, covering normal tasks, gray-area cases, and inappropriate responses; and finally, through methods such as **SFT, RLHF / RLAIF, and refusal/redirection policy modeling**, embedding these preferences and rules into model behavior, supplemented by upstream dialogue management and policy engines to achieve end-to-end safety alignment. Below, we again elaborate from three perspectives: **scenarios**, **principles**, and **models**.

- **Scenarios**
  - **General Consumer-Facing Assistant Scenarios**: For chat assistants and information retrieval assistants targeting the general public, they need to remain **"friendly, helpful, and within bounds"** across a broad range of topics: providing professional, task-focused answers while honestly expressing limitations when uncertain, and refusing or gently redirecting clearly inappropriate requests.
  - **Professional Industry Assistant Scenarios**: In fields such as healthcare, law, finance, and education, beyond basic safety, industry-specific regulations must be layered on: for example, medical assistants need to repeatedly emphasize "non-diagnostic nature + risk warnings + recommend consulting a doctor," legal assistants should avoid providing advice on circumventing the law, financial assistants must comply with investment compliance disclosure requirements, and education assistants need to consider minor protection and age-appropriate content.
  - **Enterprise Configurable Alignment Layer Scenarios**: Enterprises often wish to further embed their own industry requirements, brand tone, and internal policies on top of a general safety baseline, thus requiring a **configurable alignment layer** that allows customers to self-configure safety thresholds, sensitive categories, and phrasing styles without retraining the underlying large model.
- **Principles**
  Value alignment can be understood as "constraining the model's behavioral space with human and organizational values," with core principles including:
  - **Alignment Goal Definition (What to Align)**
    - **Helpful**: Responses should be high-quality, professional, well-structured, and focused on the task objective, without excessive divergence or idle chatter.
    - **Honest**: Avoid fabrication as much as possible; when knowledge is missing or understanding is unclear, proactively acknowledge uncertainty, provide estimated ranges, or suggest verification channels.
    - **Harmless**: Comply with laws and platform policies, avoid generating content involving hate, discrimination, self-harm encouragement, illegal activity guidance, etc., and respect user dignity and boundaries.
      These goals are written into annotation guidelines and policy documents, serving as unified standards for subsequent data construction, reward modeling, and evaluation.
  - **Alignment Training Data Construction**
    - **Instruction Data**: Design a broad range of task instructions and ideal responses covering Q&A, writing, summarization, coding, planning, and other scenarios, teaching the model optimal behavior for "normal requests."
    - **Safety Data**: Construct "good response vs. inappropriate response" comparison samples, with special attention to gray zones, such as educational information vs. specific operational instructions, emotional support vs. self-harm encouragement, legitimate debate vs. hate incitement — providing the model with fine-grained boundary examples.
  - **Alignment Training Methods**
    - **SFT (Supervised Fine-Tuning)**: Conduct supervised fine-tuning on high-quality dialogue/instruction data — the first step in shaping the model's baseline behavior and tone.
    - **RLHF / RLAIF**: Build preference data through human or model scoring, train a reward model, then perform policy optimization so that the model tends to generate "preferred" responses (more helpful, safer, more honest) during generation.
    - **Refusal / Redirection Policy Modeling**: For high-risk or inappropriate requests, train the model not only to refuse but also to provide reasonable explanations and guide users to safe alternatives (e.g., offering help resources, encouraging consultation with professionals, etc.).
- **Models**
  In system design, value alignment typically manifests as a combination of "**bottom-layer alignment training + upper-layer policy guardrails**":
  - **SFT + RLHF / RLAIF Aligned Models**: The SFT stage teaches the model the basic patterns of ideal responses; the RLHF / RLAIF stage further "tightens" behavior through preference learning, making it more aligned with human preferences and safety standards. In the safety dimension, separate reward heads or classifiers can be built for harmfulness, used to apply penalties during policy optimization.
  - **Constitutional AI / Policy-based Alignment**: By first drafting a set of "Constitution" or policy documents, then having the model self-criticize and rewrite according to these rules, generating large amounts of "self-supervised revision data," strengthening the model's internalization of rules while reducing human labor costs.
  - **Dialogue Management & Intent Detection Collaboration**: In the product pipeline, move safety/alignment logic partially upstream to the dialogue management layer, using intent recognition, slot filling, and task routing to determine whether a request should be passed to the large model, whether additional safety filtering or templated responses are needed. This creates a dual safeguard of "model alignment + policy guardrails."
  - **Internal Alignment Platform & Role Configuration**: Build an internal alignment platform providing annotation/scoring tools, policy version management, and training pipelines; simultaneously support configuring differentiated alignment goals and phrasing styles for different roles (customer service, medical advice, educational tutoring, etc.), enabling the same base model to exhibit distinctly different yet controllably consistent personalities across different products.

### 9.2.1 Alignment Goals & Training Data: Turning Values into Learnable Signals

The first step in value alignment is translating "abstract values" into signals that the model can learn — and this depends on alignment goal definition and training data construction.

At the alignment goal level, teams typically produce a detailed set of behavioral specification documents, decomposing Helpful / Honest / Harmless into specific provisions, such as: prohibiting specific step-by-step instructions for certain high-risk operations, requiring disclaimers and risk warnings for medical/legal advice, maintaining neutrality and multi-perspective presentation on controversial topics, etc. Then, in the instruction data phase, diverse tasks and ideal responses are built around these indicators, covering scenarios like chatting, writing, coding, and Q&A, incorporating multilingual and multicultural contexts. In the safety data phase, paired "good/bad response" examples are constructed targeting harmful content, high-risk domains, and gray zones, providing training material for subsequent preference learning and safety classifiers. Through this approach, value objectives are "translated" into actual data distributions, becoming signals that model training can directly perceive.

### 9.2.2 SFT, RLHF / RLAIF & Refusal Strategies: Shaping Model Behavior

With alignment goals and data in place, the next step is to write these goals into model behavior through a multi-stage training process.

In the SFT stage, the model undergoes supervised fine-tuning on high-quality human demonstration data — akin to "textbook-style learning": it determines the model's tone, structure, and standard problem-solving paradigms for the vast majority of normal requests. Subsequently, **RLHF / RLAIF** is used for preference optimization: first, a reward model is trained using preference labels produced by human annotation or a larger LLM, then policy optimization algorithms (such as PPO) are used to adjust the model so that it tends to achieve higher rewards during generation. In this way, the model not only "knows what the correct answer looks like" but also knows "which type of answer better aligns with human preferences and safety requirements." On top of this, various **refusal & redirection policies** are specifically modeled: for questions that are clearly illegal, extremely high-risk, or unsuitable for AI to answer, the model should learn to give clear refusals with explanations and provide safe alternative paths (such as helplines, professional consultation, etc.), rather than simply remaining silent or casually deflecting.

### 9.2.3 Policy Layer & Alignment Platform: Making Alignment Configurable and Evolvable

Even when the underlying model has undergone sufficient alignment training, a **policy layer and alignment platform** are still needed in real-world systems to achieve finer-grained controllability and evolvability.

The policy layer typically includes intent recognition, risk assessment, and routing logic: when user input reaches the system, a lightweight model first determines its intent, domain, and risk level, then decides whether to directly invoke the large model, whether additional safety filtering is needed, or whether it should fall into a templated response or human handoff channel. For different industries and customers, the policy layer can load different policy configurations, enabling customization of sensitive categories, refusal styles, and brand tone. Meanwhile, the internal alignment platform manages all alignment-related assets: annotation/scoring tools, reward model versions, policy change records, online A/B results, etc., allowing teams to rapidly iterate and canary-release alignment policies without frequently retraining the base model, thereby maintaining continuous control over model behavior.

## 9.3 Content Safety & Compliance

As large models become embedded in search, dialogue, content creation, social platforms, and even enterprise internal systems, **content safety & compliance** has shifted from an "add-on feature" to a "barrier to entry." This layer is concerned with: whether the model generates illegal or harmful content when producing text, images, audio, and video; whether the system complies with the laws and regulations of the countries/regions and industries in which it operates when processing user data; and whether it can provide clear, traceable evidence chains when facing audits and regulatory oversight. To this end, we need to build a complete technical and governance system covering **multimodal content moderation, regional & industry compliance, and local privacy & data protection**, and package it into product forms such as SaaS content safety services, enterprise compliance middle platforms, and industry security gateways. Below, we again elaborate from three perspectives: **scenarios**, **principles**, and **models**.

- **Scenarios**
  - **Multimodal Content Moderation & Filtering Scenarios**: In conversational products, UGC platforms, communities, and social applications, large models generate or receive large volumes of text, images, audio, and video content, requiring unified **multimodal moderation** capabilities to identify and block high-risk outputs involving personal privacy, illegal activity guidance, hate incitement, extreme violence, pornography, and inappropriate content involving minors in real time.
  - **Compliance Constraints & Localization Scenarios**: Different countries/regions have different legal and regulatory requirements for data protection, minor protection, and content regulation; different industries (healthcare, finance, education, advertising, etc.) also have detailed compliance norms. Therefore, the system must support loading different policy templates by **region and industry** to comply with local regulatory requirements.
  - **User Privacy & Data Protection Scenarios**: During model training and online services, large volumes of user conversations and business data need to be processed. How to achieve data anonymization, desensitization, and minimal collection, while protecting privacy through technical and institutional measures during both training and inference, is another pillar of the content safety & compliance system — especially critical in highly sensitive industries such as finance and healthcare.
- **Principles**
  The underlying principles of content safety & compliance can be divided into three layers: policy, filtering, and privacy:
  - **Safety Policy System (Policy Engine)**
    - Formalize laws, regulations, platform rules, and industry norms into **executable policies**, using a rule engine combined with model scoring to classify content by risk level (safe / gray zone / high-risk).
    - Support selecting different policy templates by scenario and customer, for example configuring different sensitive categories and thresholds for teen products, professional communities, or multinational enterprises.
  - **Multi-Level Content Filtering: Pre-Event — In-Event — Post-Event**
    - **Pre-Event**: Intercept and rewrite user prompts (Prompt Shielding), blocking clearly illegal or highly sensitive intents before they reach the large model, or guiding them toward safer expressions.
    - **In-Event**: During model output generation, use safety classification models and rules for real-time content review (Real-time Safety Filter), truncating, replacing, masking, or triggering refusal for high-risk content.
    - **Post-Event**: Conduct sampling audits and human review of conversation and generation logs, perform root cause analysis on discovered issues, then update policies and models, and provide traceable records for external regulatory oversight.
  - **Privacy Protection Technologies & Data Governance**
    - Before data storage and training, perform **anonymization and desensitization** on user conversation data, removing or replacing sensitive fields such as names, ID numbers, phone numbers, and addresses, following the **principle of minimal collection** to retain only necessary information.
    - In certain scenarios, adopt **Differential Privacy (DP)** to limit the influence of individual samples on model parameters, or use **Federated Learning (FL)** to keep training within local data domains, avoiding raw data from going to the cloud.
    - Use access control mechanisms such as **RBAC** / **ABAC** to strictly limit who can access what level of logs and sensitive data, complemented by audit logs to ensure access paths are traceable.
- **Models**
  From a product and system design perspective, content safety & compliance ultimately evolves into a series of reusable "safety services and middle platforms":
  - **SaaS Content Safety Service**: Package text/image/audio/video moderation capabilities as a unified API, connecting to upstream applications; input content, output risk type, classification, and handling recommendations (allow, block, human review), helping developers quickly integrate safety modules.
  - **Enterprise Internal Compliance Middle Platform**: Provide large enterprises with centralized compliance policy configuration, audit reporting, and risk alerting capabilities, connecting to internal business systems and human review teams, enabling each business line to execute customized rules under unified policies while meeting external regulatory reporting requirements.
  - **High-Risk Industry-Specific Security Gateways & Log Auditing Systems**: In high-risk industries such as finance and healthcare, proxy all large model calls through dedicated security gateways, performing real-time traffic inspection and desensitization, retaining critical logs locally or in compliant regions, and providing detailed access auditing and incident traceability capabilities to meet stringent regulatory requirements.

### 9.3.1 Multimodal Moderation & Policy Engine: Turning Rules into "Executable Code"

A real content safety system must first be able to "understand" content from different channels and modalities, and then enforce policies on every request and response.

In multimodal moderation, the system typically builds multiple detection models for text, images, video, etc.: text-side models identify sensitive keywords, contextual semantics, and veiled expressions; image and video-side models detect violence, pornography, minors, hate symbols, illegal items, and other content, combining OCR, ASR, and visual features for joint judgment where necessary. The policy engine binds these model outputs to regulatory requirements: for example, if a region has stricter restrictions on gambling or political content, the sensitivity of related detection categories can be raised in the corresponding policy template, or content matching these categories can be forced into human review. By transforming abstract rules into rule chains, thresholds, and actions (allow/block/human review/mask), the Policy Engine makes compliance requirements truly "operational."

### 9.3.2 Multi-Level Filtering & Log Auditing: Building an End-to-End Safety Closed Loop

Single-point interception can hardly cover all risks, so content safety systems generally adopt a **pre-event — in-event — post-event** three-layer defense design.

In the pre-event stage, the system performs rapid detection on user input, directly rejecting or rewriting clearly violating or highly sensitive prompts, guiding users to ask questions in a safe manner; for borderline attempts and ambiguous requests, it can also proactively add disclaimers and risk warnings. In the in-event stage, model outputs pass through a real-time safety filtering component: this component uses text classification and rule matching to clip, replace, or trigger refusal flows for potentially high-risk outputs, ensuring that the content ultimately presented to the user falls within an acceptable range. In the post-event stage, through log auditing and sampling mechanisms, safety teams or trusted automated systems periodically replay and review conversations, analyze false positives, false negatives, and emerging risk patterns, and accordingly update policies, training data, and detection models. This forms a continuously evolving safety closed loop rather than a "one-time configuration."

### 9.3.3 Privacy Protection & Industry Security Gateways: Making Data Security "Provable"

In highly sensitive industries, "not outputting harmful content" is far from enough — one must also prove that "internal use of user data is equally safe, compliant, and traceable."

Privacy protection begins the moment data enters the system: anonymization and desensitization are performed as early as the collection and storage stages, ensuring that even if logs are leaked, they are difficult to directly associate with specific individuals. During training, differential privacy, sampling strategies, or federated learning reduce the impact and leakage risk of individual user data on the final model. For model inference traffic, a **security gateway** provides unified access control: all requests and responses pass through the gateway's content inspection, permission verification, and audit logging, with different access policies and data views applied as needed based on business line and user role. Ultimately, these logs and policy change records crystallize into an "evidence chain" viewable by internal auditors and external regulators, enabling the enterprise to not only be compliant in fact but also "provably compliant" in form.
# 10. AI for Science (AI4Science)

When deep learning and large models move from "recommendation ads and natural language understanding" toward **scientific problems themselves**, the goal is no longer just predicting a metric or performing classification, but genuinely participating in **discovering patterns, designing experiments, and accelerating simulation and reasoning**. AI4Science seeks to combine "statistical pattern recognition" with "physical laws / biochemical principles / mathematical structures," enabling models to serve as "programmable scientific assistants" in molecular design, protein engineering, materials discovery, physics simulation, mathematical reasoning, and beyond.

In engineering practice, this layer connects on one end to "traditional scientific infrastructure" such as quantum chemistry software, molecular dynamics (MD), CFD/FEA simulators, automated theorem provers, literature databases, and robotic labs, and on the other end to the real-world R&D workflows of pharmaceutical companies, materials enterprises, energy firms, and research institutions. The following discussion unfolds from three perspectives — **scenarios**, **principles**, and **models** — and further subdivides several key directions.

- **Scenarios**
  - Molecular and drug design: Starting from massive libraries of small molecules or fragments, predict properties and ADMET, design candidate drugs targeting specific targets, and narrow the experimental space through virtual screening and multi-objective optimization.
  - Protein and biological structure modeling: Predict the 3D structures of proteins and complexes, assist in antibody, enzyme, and protein drug design, and evaluate the impact of mutations on function and stability.
  - Physics simulation and engineering design: Use deep surrogate models to accelerate expensive simulations such as CFD / FEA / molecular dynamics, providing rapid evaluation and optimization tools for aerospace, automotive, energy, and other fields.
  - Materials discovery and crystal design: Conduct virtual screening and inverse design across vast chemical / materials spaces, accelerating the R&D of key materials such as batteries, photovoltaics, catalysts, and alloys.
  - Mathematics and symbolic reasoning: Perform automated theorem proving, symbolic computation, and equation solving within formal systems, enhancing the rigorous reasoning capabilities of large models in mathematical problems and engineering derivations.
  - Scientific workflows and automated experimentation: Connect with literature, databases, and automated experimental platforms to build "Self‑Driving Labs," enabling models to participate in experimental design, execution, and result analysis.
- **Principles**
  - Structured representation and graph modeling: Use graphs, crystal graphs, molecular graphs, and other structures to represent complex objects, modeling geometric and topological relationships on graph neural networks or E(3)-equivariant networks.
  - Physics / chemistry inductive biases: Incorporate physical priors into model architectures and loss functions through conservation laws, symmetries (translation / rotation / reflection), PDE constraints (PINN), energy potential functions, and other means.
  - Generation and inverse design: Use generative modeling methods such as VAE, GAN, Diffusion, and RL to support inferring structures from "target properties / constraints," enabling inverse design of molecules, materials, and structures.
  - Surrogate models and multi-scale coupling: Use deep surrogate models to approximate expensive quantum chemistry / continuum / structural mechanics simulations, and stitch together micro–meso–macro models to achieve multi-scale modeling.
  - Tool augmentation and agent workflows: Combine LLMs with simulators, symbolic calculators, automated theorem provers, literature retrieval systems, and experimental robots to build agents capable of autonomously planning and executing scientific tasks.
- **Models**
  - Molecular and materials representation models: E(3)-equivariant networks and graph networks such as SchNet, DimeNet, PhysNet, CGCNN, MEGNet, ALIGNN; molecular language models such as ChemBERTa, MolBERT, and MoleculeSTM.
  - Structural biology models: AlphaFold / AlphaFold2 / AlphaFold3, RoseTTAFold, OpenFold, ProteinMPNN, ESM‑IF, the ESM series of protein language models and structure generation models.
  - Physics simulation and operator learning: PINN, DeepONet, Fourier Neural Operator (FNO) and the Neural Operator family, DeepMD, NequIP, and other potential energy surface and operator learning models.
  - Mathematics and symbolic reasoning models: Math/proof-specialized models such as Minerva, Gödel, GPT‑f, and Lean‑Dojo, as well as tool-augmented systems combining LLMs with SymPy / Mathematica / Lean / Coq.
  - Scientific agents and workflow systems: Combining retrieval, code generation, simulation invocation, and experimental control interfaces to create "AI scientific assistants" and self-driving experimental platforms tailored for pharmaceuticals, materials, physics, chemistry, and other domains.

Starting from this layer, traditional scientific computing becomes deeply intertwined with deep learning and large models: both respecting the strict constraints of physics / chemistry / biology / mathematics, and leveraging the powerful data-driven fitting capabilities to improve efficiency. The ultimate goal is for AI to become a "collaborator" in scientific research, not merely a predictive black box.

---

## 10.1 Molecular Modeling & Drug Discovery

In traditional drug development, going from target discovery to clinical trials often takes 10+ years and billions of dollars, with a huge portion of that time and cost consumed in the early stages of molecular design, property prediction, and virtual screening. AI-driven molecular modeling and drug discovery aims to accelerate this process using **data-driven + generative modeling**: starting from structures or textual descriptions, predict molecular properties and ADMET, design candidate compounds targeting specific targets, and significantly reduce the burden of wet-lab experiments through multi-objective optimization and virtual screening.

This direction connects on one end to data sources such as quantum chemistry software (DFT, ab initio), bioactivity assays, and HTS (High‑Throughput Screening), and on the other end to internal Small Molecule Design platforms, property prediction SaaS, and materials / chemicals design tools within pharmaceutical companies. The following unfolds from three dimensions — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Early virtual screening and hit discovery: Facing virtual molecular libraries on the scale of millions to billions, rapidly predict activity / ADMET via AI, rank candidate molecules, and filter out a small number of high-value hits for experimental validation.
  - Molecular property and ADMET evaluation: During the lead optimization stage, continuously predict metrics such as solubility, toxicity, metabolic stability, and oral bioavailability, providing references for pharmacokinetic and safety assessment.
  - Target-oriented molecular generation: Given protein target information (pocket characteristics, known ligands) or target property constraints, automatically generate candidate small molecules with structural diversity, high activity, and synthetic feasibility.
  - Materials and chemicals molecular design: For non-pharmaceutical scenarios such as coatings, solvents, electrolytes, and surfactants, design formula molecules that meet specific physical properties (viscosity, polarity, interfacial energy, etc.).
- **Principles**
  - Molecular representation and property prediction:
    - **Structural representation**: Common forms include SMILES sequences, molecular graphs (atoms as nodes, bonds as edges), 3D coordinates, and quantum features; models need to extract generalizable semantic and geometric information from these representations.
    - **Property prediction**: Through GNNs (GCN, GAT, MPNN) or 3D-equivariant networks (SchNet, DimeNet, PhysNet, etc.), learn quantum properties such as energy, dipole moment, and orbital energy levels from molecular graphs or 3D structures, as well as ADMET attributes such as solubility, LogP, toxicity, and metabolic stability.
    - **Representation learning and pretraining**: Conduct masked prediction, contrastive learning, or autoregressive pretraining on large-scale molecular libraries (e.g., ZINC, ChEMBL, PubChem) to obtain transferable universal molecular representations, providing features for downstream QSAR / ADMET tasks.
  - Structure generation and molecular optimization:
    - **Generative modeling**: Use generative models such as VAE, GAN, Flow, and Diffusion to sample new molecules in SMILES or molecular graph space, ensuring chemical structure validity (valence, ring structures, etc.) and diversity.
    - **Conditional generation**: Introduce condition vectors (target activity, physicochemical properties, structural fragments, target pocket descriptions, etc.) to generate candidate molecules under given constraints, enabling property-oriented or fragment-completion-based design.
    - **Multi-objective optimization and RL**: Through reinforcement learning (e.g., MolDQN) perform "editing" operations (adding atoms, changing bonds, replacing fragments) in molecular space, balancing multiple objectives such as activity, toxicity, synthetic feasibility, and patent avoidance.
  - Protein–small molecule interaction modeling:
    - **Binding site and scoring functions**: Model the spatial relationship between protein pockets and ligands through 3D convolution / graph networks / interaction graphs, predicting binding sites and binding affinity.
    - **Docking and binding pose prediction**: Combine conformational search in docking with deep models, using deep scoring functions or diffusion-based generation to predict stable conformations, improving docking accuracy and reducing computational cost.
- **Models**
  - Molecular representation models:
    - **GNNs and 3D networks**: 3D-equivariant models such as DimeNet / DimeNet++, SchNet, and PhysNet that consider angles / distances; general graph neural networks such as GCN / GAT / MPNN, suitable for property prediction and QSAR.
    - **SMILES-based Transformers**: Treat molecules as "chemical language sentences," using Transformers for autoregressive or masked language modeling, providing sequence representations for generation and property prediction.
  - Generation and optimization models:
    - Graph generation models: GraphVAE, Junction Tree VAE, GraphAF, etc., generate molecules in graph / fragment space, emphasizing structural validity and interpretability (fragment-level construction).
    - Diffusion models: Diffusion for Molecules generates new molecules or conformations by adding/removing noise in graph or 3D structure space, and can be combined with condition vectors for customized generation.
    - Reinforcement learning optimization: RL-based methods such as MolDQN treat molecular optimization as a sequential decision-making problem in a "molecular editing" state space, encoding multi-objective metrics via reward functions.
  - Molecular large models and multimodal directions:
    - **Molecular language models**: ChemBERTa, MolBERT, etc., pretrained on large-scale SMILES corpora, supporting zero-shot or few-shot transfer to downstream tasks.
    - **Multimodal molecular models**: MoleculeSTM and others integrate structure (graph / 3D), textual descriptions (synthesis routes, literature abstracts), and molecular properties, enabling cross-modal retrieval and joint prediction.
  - Products and application forms:
    - Early-stage drug screening platforms and internal Small Molecule Design platforms for pharmaceutical companies, providing integrated capabilities including virtual screening, molecular generation, and ADMET prediction.
    - Property prediction SaaS for R&D personnel: quickly query molecular properties, ADMET, molecular similarity, etc., via web or API.
    - Molecular-level design tools for materials and chemicals design, used for custom development of molecular systems such as coatings, solvents, and electrolytes.

Starting from this sub-direction, the drug design workflow is moving from "experts + high-throughput experimentation" toward a closed loop of "experts + models + automated experimentation," where AI not only gives scores but gradually participates in the full cycle from "proposing ideas" to "generating candidates" to "screening and optimization."

### 10.1.1 Molecular Representation and Property / ADMET Prediction

In drug and materials R&D, a fundamental capability is: **given a molecule, quickly and accurately predict its properties and behavior**, including quantum chemical properties (energy, orbitals, dipole moment), physicochemical properties (solubility, LogP), and pharmacokinetic / toxicity-related ADMET metrics. The essence of this problem is how to learn, from different forms of molecular representation, a **representation that both conforms to chemical principles and possesses generalization ability**.

- At the **molecular representation** level, common representations include:
  - **SMILES / SELFIES and other strings**: Treat molecules as sequences, naturally suited for language modeling with RNNs / Transformers.
  - **Molecular graph representation**: Atoms as nodes, bonds as edges, with nodes and edges carrying features such as type, valence, and aromaticity; suitable for modeling neighborhoods and topology using GNNs, MPNNs, etc.
  - **3D geometric representation**: 3D coordinates, bond angles, dihedral angles, and other information obtained from quantum chemistry or force field optimization, providing the basis for E(3)-equivariant networks to capture spatial structure.
- At the **property and ADMET prediction** level, target tasks include:
  - Small molecule quantum property prediction: energy, dipole moment, HOMO/LUMO energy levels, etc., used to replace expensive DFT / ab initio calculations.
  - QSAR / activity prediction: predicting a compound's activity (IC50, Ki), selectivity, etc., against specific targets, for screening potential candidates.
  - ADMET-related metrics: solubility, permeability, toxicity, metabolic stability, CYP inhibition, etc., which are key to assessing drug developability.

Typical model pathways: use DimeNet / SchNet / PhysNet / GNNs to extract high-dimensional representations from molecular structures, then simultaneously predict multiple properties via multi-task learning; conduct pretraining on large-scale public or internal corporate data to improve modeling capability in small-data scenarios. Externally, these are offered as ADMET prediction SaaS or internal platform APIs, providing project teams with rapid "virtual experiment" capabilities.

### 10.1.2 Structure Generation and Molecular Optimization: From SMILES / Graph to Drug Candidates

With reliable molecular representation and property prediction models in place, the next goal is to **actively generate "better" molecules**: no longer just evaluating given compounds, but directly designing new candidate molecules around targets and property constraints. This direction is commonly referred to as **molecular generation and molecular optimization**.

In terms of **structure generation**, research and engineering practice center on three main pathways:

1. **SMILES-based sequence generation**
   Treat molecules as strings, using VAE, GAN, or autoregressive Transformers to sample new structures in SMILES space; ensure chemical validity through grammatical constraints (e.g., SELFIES) or post-processing.
2. **Graph / fragment-based generation**
   Models such as GraphVAE, Junction Tree VAE, and GraphAF construct structures directly at the molecular graph or primitive fragment (fragment / motif) level, which is closer to chemical synthesis thinking and facilitates control over rings, groups, and scaffold structures.
3. **Diffusion and 3D generation**
   Methods such as Diffusion for Molecules perform diffusion and denoising in graph or 3D coordinate space, simultaneously considering spatial conformation, suitable for generating ligands or material units that are sensitive to 3D shape.

In terms of **molecular optimization**, the key is introducing **objectives and constraints**:

- **Conditional generation**: Input target activity, physicochemical properties, or fragment anchors as condition vectors into the model, biasing generation toward satisfying these conditions.
- **Reinforcement learning and multi-objective optimization**: Use property prediction models as the "environment," employ RL for sequential decision-making in molecular space (e.g., MolDQN), setting rewards and penalties on multi-dimensional metrics such as activity, toxicity, synthetic feasibility, and patent risk to achieve multi-objective trade-offs.
- **Synthetic feasibility and chemical priors**: Incorporate synthesis route prediction models and synthetic complexity metrics (e.g., SA score) during generation and optimization to avoid producing structures that are difficult to synthesize or unstable.

In terms of productization, these models are often packaged into internal "AI drug design platforms" within pharmaceutical companies: given a target, known lead structures, and optimization directions, the platform automatically proposes batches of candidate molecules; project teams then progressively screen and iterate in combination with experimental, patent, and commercial considerations, forming a "model–experiment–model" closed-loop optimization.

## 10.2 Protein & Structural Biology

In life sciences, **structure determines function** is a near-dogmatic principle: how a protein folds into a three-dimensional structure and how it assembles into complexes with other molecules directly determines its functional behavior in cells. Traditional structural determination relies on experimental techniques such as X‑ray crystallography, NMR, and cryo‑EM, which are time-consuming, expensive, and have massive blind spots where "difficult to crystallize, difficult to resolve" applies. Deep learning models represented by AlphaFold have dramatically advanced the ability to go "directly from sequence to structure," making it possible to obtain high-quality structures at the genome-wide scale.

This direction connects on one end to sequence and structure databases such as UniProt / PDB, omics experiments, and structural genomics projects, and on the other end to structure design and analysis platforms in industries such as biopharmaceuticals, synthetic biology, and enzyme engineering. The following unfolds from three perspectives — **scenarios**, **principles**, and **models** — and further breaks down key sub-directions.

- **Scenarios**
  - Target structure annotation and screening: Predict structures for large numbers of proteins at the genome level, aiding target discovery, functional annotation, and pathway analysis; combine with variant information to assess potential pathogenic mechanisms.
  - Antibody / protein drug design: Perform fine-grained modeling and design of key regions such as antibody variable regions (CDRs) and receptor binding domains, optimizing affinity, specificity, and immunogenicity.
  - Enzyme and biocatalysis design: Based on enzyme 3D structures and active site environments, design mutation and variant libraries to improve catalytic efficiency, substrate scope, and stability.
  - Complex and interaction studies: Predict protein–protein, protein–nucleic acid, and protein–small molecule complex structures, resolve interface interaction patterns, and provide a foundation for drug design and signaling pathway modeling.
  - Mutation effect and drug resistance analysis: Evaluate the impact of natural variants or artificial mutations on structural stability, function, and ligand binding; analyze the structural basis of drug resistance mutations.
- **Principles**
  - Protein structure prediction:
    - **Sequence → structure**: Starting from amino acid sequences (single sequence or including multiple sequence alignment MSA), model pairwise geometric constraints between residues (distances, angles, contact maps), then generate full-atom 3D structures via geometry reconstruction modules.
    - **Coevolutionary signals**: Use co‑mutation patterns (co‑evolution) among homologous sequences to infer potential residue contact relationships, providing strong priors for folding constraints.
    - **Structure refinement and uncertainty estimation**: Perform local refinement (relax, repack) on predicted structures, and output confidence scores (e.g., pLDDT, PAE) to guide the selection of "trusted regions" in downstream applications.
  - Complex and molecular assembly modeling:
    - **Multi-chain joint modeling**: Take multiple protein chains or protein + nucleic acid sequences as input, introduce chain identification and interface constraints, and directly output complete complex structures.
    - **Interface prediction and assembly**: Based on known monomer structures, predict the most likely interface configurations and assembly modes through graph models or diffusion models.
  - Protein design and mutation effect prediction:
    - **Inverse folding**: Given a target 3D backbone structure or topological constraints, generate amino acid sequences that can stably fold into that structure, enabling de novo protein design.
    - **Mutation effect modeling**: Combine protein language models with structural models to predict the impact of specific mutations on stability (ΔΔG), activity, or binding affinity, aiding directed evolution and variant screening.
- **Models**
  - Structure prediction:
    - AlphaFold / AlphaFold2 / AlphaFold3: Centered on attention mechanisms and geometric modules, predict high-precision protein structures from MSA, template structures, and sequence features, and output uncertainty estimates.
    - RoseTTAFold, OpenFold: Employ multi-track (sequence / pair / structure) representations and multi-scale attention mechanisms, providing foundational implementations for open-source and industrial deployment.
  - Complex and interface modeling:
    - AlphaFold‑Multimer: Directly model protein–protein complex structures in multi-chain scenarios, accounting for both monomer folding and interface interactions.
    - RFdiffusion: Based on diffusion models, generate or optimize protein backbones and complex interfaces in 3D space, enabling complex assembly and symmetric body design.
    - Methods such as DiffDock: In protein–small molecule systems, use diffusion or deep scoring functions to predict binding poses and binding modes.
  - Design and mutation models:
    - ProteinMPNN: Generate compatible sequences given a structure, used for stabilizing backbones and interface design.
    - ESM‑IF, ESMFold / ESM‑2 series: Language models pretrained on large-scale protein sequences, with the ability to infer structure, function, and mutation effects from sequences.
  - Products and applications:
    - Public cloud protein structure prediction services and databases (e.g., AlphaFold DB), providing large-scale structural annotations and download interfaces for research.
    - Internal structure design platforms at biopharmaceutical companies: integrating modules for protein structure prediction, antibody design, enzyme engineering, and protein–ligand docking.
    - Biotechnology SaaS: Providing tools for binding site prediction, interface thermodynamics evaluation, affinity and immunogenicity assessment, serving antibody drug and biologic development.

From this sub-direction onward, AI is not only "interpreting" naturally occurring protein structures but also "creating" entirely new protein and complex architectures, moving structural biology from the "passive measurement era" into the "active design era."

### 10.2.1 Protein Structure Prediction and Complex Assembly

Protein structure prediction is one of the most representative breakthroughs at the intersection of structural biology and AI. The core question is: **can we predict 3D structures at near-experimental resolution from sequence alone, with little to no reliance on experimental data?** In real-world applications, monomer structures are often just the starting point; more critically, how proteins assemble into complexes with other molecules.

In **monomer structure prediction**, the typical workflow includes:

1. **Sequence / MSA encoding**: Extract sequence features and mine coevolutionary signals through multiple sequence alignment.
2. **Geometric constraint inference**: Predict distance distributions, contact probabilities, and relative orientations between residue pairs, forming a "pseudo-measurement" geometric field.
3. **Structure construction and iterative refinement**: Build 3D structures under geometric constraints using structural modules (e.g., rotation-translation invariant blocks, internal coordinate updates), and iteratively refine multiple times to reduce geometric violations.
4. **Uncertainty and quality assessment**: Output per-residue confidence (pLDDT), residue-pair error estimates (PAE), and other metrics to inform subsequent modeling and screening.

In **complex and assembly prediction**, the problem further extends to "how multiple chains organize and interact in space":

- For **protein–protein complexes**, specialized multi-chain modeling strategies (e.g., AlphaFold‑Multimer) are typically used with multi-chain inputs to directly output assembly structures.
- For **protein–nucleic acid / protein–small molecule systems**, one approach is to first predict individual structures, then predict assembly modes through docking and interface scoring functions; another is to use diffusion models or joint modeling to directly generate complex conformations in 3D space.
- In multi-subunit, large assembly scenarios, it is also necessary to incorporate symmetry constraints, low-resolution EM density maps, and other information for hierarchical and multi-scale assembly.

In product practice, structure prediction and assembly are often packaged as cloud services or local toolchains, providing foundational structural information for protein function annotation, interaction network modeling, and drug target validation.

### 10.2.2 Protein Design and Mutation Effect Prediction: From Structure to Functional Regulation

After mastering the "sequence → structure" mapping, the next step is the inverse problem: **given a structure or functional requirement, how do we design suitable protein sequences and mutation strategies?** This is the core of protein design and mutation effect prediction.

In **protein design**, key tasks include:

- **Inverse folding**: Given a target backbone or overall topological structure, generate amino acid sequences that can stably fold into that structure. This process can be achieved through structure-conditioned generative models such as ProteinMPNN and ESM‑IF.
- **Function-oriented design**: While maintaining overall structural stability, perform targeted design on active sites, binding pockets, and interface regions to optimize affinity, specificity, and catalytic efficiency.
- **Manufacturability and immunogenicity constraints**: During sequence design, introduce constraints such as expression feasibility, post-translational modifications, and immunogenicity risk to ensure the practical viability of candidate sequences in biologic development.

In **mutation effect prediction**, the focus is on:

- **Stability change (ΔΔG)**: Given a wild-type structure and mutation sites, predict the impact of single-point or multi-point mutations on folding stability, used for directed evolution and drug resistance mutation analysis.
- **Activity and affinity changes**: Combine structural and protein language models to evaluate the impact of mutations on enzymatic activity, ligand affinity, and signaling pathway regulation.
- **Large-scale variant library design**: Before in vivo / in vitro screening experiments, use models to pre-screen vast mutation spaces, retaining high-potential variants and reducing experimental costs.

At the engineering and product level, protein design and mutation effect prediction are often integrated as "structural design and optimization modules" within biopharmaceutical / synthetic biology companies: starting from candidate backbone structures, automatically propose multiple rounds of mutation and variant library design plans, forming a data-driven closed loop with high-throughput screening experiments.

## 10.3 Physics Simulation & Surrogate Modeling

In aerospace, automotive, civil engineering, energy, chemical, and other fields, **high-fidelity simulation is a core part of design and verification**. However, CFD (Computational Fluid Dynamics), FEA (Finite Element Analysis), molecular dynamics (MD), and various PDE solvers are often computationally expensive, making it difficult to support large-scale parameter sweeps, real-time control, or online optimization. AI-driven physics simulation and surrogate modeling seeks to use deep networks to approximate numerical solvers or operators themselves, achieving orders-of-magnitude acceleration while maintaining physical consistency and interpretability.

This direction connects on one end to traditional simulation software (ANSYS, Fluent, COMSOL, custom solvers), experimental measurements, and sensor data, and on the other end to engineering design platforms, autonomous driving and aerospace aerodynamic design, and chemical process simulation and optimization systems. The following unfolds from three perspectives — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Engineering simulation acceleration: Given geometry and operating conditions, use deep surrogate models to rapidly predict pressure fields, velocity fields, temperature fields, stress/strain distributions, etc., supporting multi-round design iteration and optimization.
  - Complex process simulation and process optimization: In process industries such as chemicals and energy, use ML to approximate mechanistic models or black-box process models, enabling rapid evaluation and real-time control.
  - Molecular / materials scale simulation: Use ML potential energy surfaces (Neural Network Potential) to replace expensive ab initio potential energy and force calculations, accelerating molecular dynamics and materials phase behavior simulation.
  - Multi-scale and cross-disciplinary coupling: Use deep surrogate models to stitch together micro–meso–macro models, building end-to-end multi-scale simulation and optimization chains.
- **Principles**
  - Surrogate models:
    - Learn the "input parameters → output fields / metrics" mapping from numerical simulation or experimental data, serving as an approximation of high-fidelity solvers.
    - In high-dimensional parameter spaces, combine active learning and Bayesian optimization to automatically select the most informative sample points for high-fidelity simulation or experimentation, continuously improving surrogate model quality.
  - Physics-Informed Neural Networks (PINN):
    - Write PDEs, initial / boundary conditions, and physical conservation laws into the loss function, using automatic differentiation to solve physical fields over continuous space.
    - Support forward problems (solving state fields) and inverse problems (inferring source terms, material parameters, etc., from sparse observations), particularly suited for complex geometries and boundaries that are difficult for traditional numerical methods.
  - Operator learning and Neural Operators:
    - Not just fitting "solutions under specific conditions," but learning mappings from functions to functions (operators), such as "boundary conditions / source terms → entire solution field."
    - Representative methods include Fourier Neural Operator (FNO), DeepONet, etc., which improve generalization across different mesh densities and geometries through frequency-domain transformations or specialized network architectures.
  - Multi-scale modeling:
    - Train effective parameters or constitutive relations at meso / macro levels on micro-scale simulation data, with deep surrogate models serving as the "scale bridging layer."
    - For complex materials, fluid-structure coupling, and multiphase flow problems, use deep models to transfer information between different scales and physics modules.
- **Models**
  - General physics neural networks:
    - PINN series: Solve by minimizing PDE residuals at spatiotemporal sampling points, applicable to Navier‑Stokes, Maxwell, elasticity, and other equations.
    - DeepONet, FNO, Neural Operator family: Directly learn "operator-level" approximations of PDE solvers, enabling fast inference across multiple operating conditions and geometries.
  - Molecular / materials scale potential energy models:
    - DeepMD, SchNet, NequIP, SpookyNet, etc.: Build high-precision ML potential energy surfaces, significantly accelerating force and energy calculations while maintaining near-ab initio accuracy.
    - Couple with traditional MD engines to achieve high-precision molecular dynamics for large systems and long timescales.
  - CFD / structural mechanics surrogate models:
    - U‑Net / UNet++ and other Encoder‑Decoder networks: Predict flow fields or temperature fields from geometry / boundary conditions on regular grids.
    - Graph neural networks on mesh: Perform message passing and updates on nodes / elements over unstructured meshes, suitable for complex geometries and multi-physics coupling scenarios.
    - Neural Operator for CFD: Generalize flow field predictions across different Reynolds numbers, inflow conditions, and geometric parameters.
  - Products and applications:
    - AI acceleration modules in industrial simulation software: Provide rapid estimation and sensitivity analysis capabilities on top of traditional solvers.
    - Chemical / energy process simulation and optimization platforms: Combine mechanistic models + surrogate models + optimization algorithms into integrated process optimization tools.
    - Autonomous driving / aerospace aerodynamic design: Conduct large-scale design variable sweeps and automatic shape optimization in aerodynamic shape design.

### 10.3.1 Surrogate Models and Physics-Informed Neural Networks (PINN)

**Surrogate models** and **Physics-Informed Neural Networks (PINN)** are two complementary paths for AI-enabled physics simulation: the former approximates simulation mappings from data, while the latter constructs learning objectives from physics.

In **surrogate model** scenarios, the typical workflow is:

1. Collect a batch of sample data (input parameters, boundary conditions, geometry → output physical quantities) through high-fidelity numerical simulation or experimentation.
2. Train a deep network (e.g., MLP, convolutional networks, GNNs, Neural Operators) to approximate this mapping function.
3. In design optimization, parameter sweeps, or real-time control, use the surrogate model in place of expensive solvers for rapid evaluation.

In **PINN** scenarios, the model no longer relies primarily on large amounts of supervised labels, but instead constructs the loss function by minimizing PDE residuals and boundary condition violations:

- At spatial / temporal sampling points, use the neural network to output physical quantities (e.g., velocity, pressure, displacement fields), and obtain gradients and derivatives via automatic differentiation.
- Substitute these derivatives into the PDE to form residuals, which together with the errors of boundary conditions and initial conditions constitute the total loss.
- Optimize to make PDE residuals and boundary errors as close to 0 as possible, thereby obtaining an approximate solution that satisfies the physical equations.

The two can be used in combination: when partial high-fidelity data is available, jointly constrain training with data error + physical residuals to improve accuracy and generalization. In engineering applications, PINN is particularly well-suited for inverse problems and data-driven modeling, such as inferring material parameters, source terms, or defect locations from sensor observations.

### 10.3.2 Neural Operators and Multi-Scale Physics Modeling

**Neural Operators** elevate physics modeling from "point-to-point / parameter-to-solution" mappings to the "function-to-function" level: they learn a unified operator approximation for "given a class of PDEs and boundary conditions, solve for the solution field," rather than a specific solution under a single operating condition. This opens new possibilities for generalization across multiple conditions, geometries, and mesh resolutions.

In **operator learning**, typical approaches are:

- Take functions (e.g., source terms, boundary conditions, material parameter fields) as input, and use networks (e.g., FNO, DeepONet) to output the entire solution field function.
- Train on samples across different meshes, parameters, and geometries, so the model learns the "common patterns" of PDE solvers.
- At deployment, simply provide new input functions (e.g., new boundary conditions, geometry) to rapidly infer approximate solution fields.

In **multi-scale modeling** scenarios:

- Train Neural Operators on large amounts of data generated at the micro scale (e.g., molecular dynamics, crystal plasticity) to learn the mapping between microstructure and macroscopic response.
- In macroscopic continuum models, use this mapping as a constitutive relation or effective parameter computation module to achieve micro–macro coupling.
- For complex systems such as fluid-structure coupling, multiphase flow, and reacting flow, separately model different physical fields and couple them through shared interface variables (e.g., fluxes, interface forces).

In engineering practice, Neural Operators are gradually moving from research prototypes to applications, becoming an important technical direction for "accelerated solvers + multi-scale bridging" in CFD, geophysics, climate modeling, and other scenarios.

## 10.4 Materials Science & Crystal Design

In materials science, a core contradiction is: **the design space is nearly infinite, while the cost of experimentation and high-precision computation is extremely high**. How to efficiently find candidate materials that meet specific performance requirements within the vast chemical and structural combination space is a key problem in new energy, electronics, structural materials, functional materials, and other fields. AI-driven materials discovery and crystal design, through graph neural networks, generative models, and high-throughput virtual screening, is progressively shifting "trial-and-error" R&D toward "data-driven + inverse design."

This direction connects on one end to materials databases such as Materials Project, OQMD, AFLOW and DFT / MD computation results, and on the other end to materials R&D platforms in application scenarios such as batteries, photovoltaics, catalysis, semiconductors, and alloys. The following unfolds from three perspectives — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Performance-oriented materials screening: Given crystal structures or chemical formulas, predict band structures, band gaps, carrier mobility, thermal / electrical / magnetic properties, etc., providing a basis for materials screening and combinatorial optimization.
  - New energy materials R&D: For systems such as battery electrolytes, electrode materials, solid-state ion conductors, photovoltaic absorber layers, and catalysts, predict ionic conductivity, stability, electrochemical windows, activity, etc.
  - High-throughput virtual screening (HTVS): In large-scale constructed candidate libraries, rapidly evaluate using ML models, filter out promising materials, then validate and calibrate with a small amount of DFT / experimentation.
  - Crystal structure and composition inverse design: Starting from target properties, reverse-search for crystal structure / composition combinations that satisfy performance and process constraints.
- **Principles**
  - Materials and crystal representation:
    - Represent periodic crystal structures as crystal graphs: nodes as atoms, edges as interatomic neighbor relationships, combined with lattice parameters and space group information.
    - For amorphous or complex multi-phase materials, use local environment descriptors (e.g., SOAP), Voronoi features, or multi-scale graph structures to represent their microstructure.
  - Property prediction:
    - Perform convolution / message passing on crystal graphs using GNN models such as CGCNN, MEGNet, and ALIGNN to predict energy, band gap, elastic modulus, thermal conductivity, etc.
    - Use embeddings based on literature and chemical formulas such as Mat2Vec to achieve transfer learning and zero-shot estimation in low-data scenarios.
  - High-throughput virtual screening:
    - Construct candidate libraries (via combinatorial enumeration, structure generation, empirical rules, etc.) → rapidly predict properties using ML models → select top candidates for DFT or experimental calibration → update models and screening strategies, forming an active learning closed loop.
  - Generation and inverse design:
    - Use diffusion models, VAEs, or GNN generative models to sample new structures in crystal structure space, with constraints such as composition, space group, and density.
    - Combine surrogate models with Bayesian optimization to search for suitable structure / composition combinations from target properties, achieving inverse design.
- **Models**
  - Representation and prediction:
    - CGCNN (Crystal Graph Convolutional Neural Network): Performs convolution on crystal graphs for predicting properties of inorganic materials such as energy and band gap.
    - MEGNet, ALIGNN: Integrate graph structure with edge / angle information, offering stronger generalization and accuracy across multiple material families.
    - Mat2Vec + lightweight ML: Rapidly train small models for specific property prediction by vectorizing chemical formulas and elemental information.
  - Generation and inverse design:
    - Diffusion for Crystals: Perform diffusion / denoising in the high-dimensional space composed of lattice parameters and atomic positions, generating crystal structures that satisfy certain constraints.
    - GNN‑based Generative Models: Search from random initialization toward structures near target properties by progressively adding/modifying atoms and bonds or manipulating the lattice.
    - Surrogate + Bayesian Optimization: Use ML models as approximate black boxes for "structure → property" mapping, performing Bayesian optimization on top to find optimal structures or compositions.
  - Data platforms and toolchains:
    - Materials Project, OQMD, AFLOW: Provide large amounts of structure and DFT computation data, forming the foundation for training and evaluating materials ML models.
    - Internal corporate materials databases and models: Combine company experimental data and process information to build domain-specific materials AI design platforms.
  - Products and applications:
    - New energy materials R&D acceleration platforms: Provide integrated property prediction, HTVS, and inverse design capabilities for battery, electrocatalysis, photovoltaic, and other teams.
    - Virtual screening software and SaaS: Provide digital screening tools for alloys, semiconductors, functional ceramics, etc., reducing early trial-and-error costs.
    - AI design tools within materials companies: Interface with Laboratory Information Management Systems (LIMS) and production line data, forming a closed loop from "model → experiment → production."

### 10.4.1 Materials Property Prediction and High-Throughput Virtual Screening (HTVS)

In the materials R&D workflow, **fast and reliable property prediction** is a foundational capability: given a candidate structure or composition, can we roughly determine whether it is worth further exploration without performing expensive DFT / experimentation? Property prediction models based on GNNs and materials databases make high-throughput virtual screening possible.

At the **property prediction** level:

- Use crystal graphs to represent periodic structures, learning interactions between atoms and their neighborhoods through models such as CGCNN, MEGNet, and ALIGNN.
- Conduct single-task or multi-task training for different tasks (energy, band gap, elastic constants, thermal conductivity, electrical conductivity, magnetism, etc.), achieving prediction performance close to DFT accuracy on datasets such as Materials Project.
- In industrial scenarios, often combine with internal experimental data for retraining or domain adaptation to improve suitability for specific material families and process conditions.

In **high-throughput virtual screening (HTVS)** scenarios, the typical workflow is:

1. Construct large-scale candidate libraries (combinatorial enumeration, structure generation, or expansion from existing databases).
2. Use ML models to rapidly predict the target properties and auxiliary properties (stability, safety, cost-related metrics, etc.) of each candidate.
3. Rank by target properties and multiple constraints, selecting Top‑K candidates for high-fidelity DFT computation or experimental validation.
4. Feed validation results back to the model, updating parameters and uncertainty estimates, forming an active learning closed loop of "screening–validation–re-screening."

This workflow has entered practical use in multiple domains including battery materials, photovoltaic absorber layers, catalysts, and structural materials, becoming a "front-end screening engine" for materials R&D teams.

### 10.4.2 Crystal Generation and Inverse Design: From Target Properties to Candidate Structures

With reliable property prediction and HTVS capabilities in place, the next goal is to **directly propose new crystal structures and composition candidates from target properties and constraints** — i.e., materials inverse design and generation.

In **crystal generation**, key questions include:

- How to generate physically reasonable lattices and atomic arrangements under periodic constraints?
- How to explicitly or implicitly impose constraints such as composition, symmetry, and density during generation?
- How to ensure generated structures remain stable after simple relaxation?

To address these, research and engineering practice commonly adopt:

- **Diffusion for Crystals**: Add/remove noise in the joint space of lattice parameters + atomic positions, achieving progressive generation from random initialization to structural samples, with target properties and composition constraints incorporated into the noise process or condition vectors.
- **GNN‑based Generative Models**: Gradually add atoms and connections on graph structures, or edit existing structures, to generate candidate structures that satisfy constraints.

In **inverse design**, it is typically combined with surrogate models and optimization methods:

- Treat property prediction models as black-box functions for "structure → property."
- Explore the structural space through Bayesian optimization, evolutionary algorithms, or RL, progressively bringing predicted properties closer to target values while satisfying constraints such as stability, safety, and cost.
- Validate the searched candidate structures through DFT / experimentation, and use the results to update surrogate models and search strategies.

In engineering applications, inverse design modules are often integrated into materials AI platforms, providing R&D personnel with an interactive interface for "set target properties → system automatically proposes candidate structures," significantly improving the efficiency of new materials exploration.

## 10.5 Mathematics & Symbolic Reasoning

Mathematics is a highly formalized, precisely verifiable language, which gives it both "extremely high difficulty" and "potentially enormous returns" in the AI era. On one hand, complex theorem proving and higher-order reasoning place extremely high demands on model capabilities; on the other hand, the results of mathematical reasoning and symbolic computation can be rigorously verified, making them naturally suited for collaboration with programmatic tools. The goal of AI in mathematics and symbolic reasoning is to build models capable of **reliable reasoning and computation within formal systems**, and to integrate them into education, research, and engineering applications.

This direction connects on one end to interactive theorem provers such as Lean / Coq / Isabelle, computer algebra systems (CAS) such as SymPy / Mathematica / Maple, and large mathematical problem banks and literature corpora; on the other end to mathematics education products, research assistance tools, and formula derivation and risk analysis needs in engineering / finance and other fields. The following unfolds from three perspectives — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Automated theorem proving and assisted proving: Automatically generate theorem proofs within formal systems, or produce readable proof drafts for human review and refinement.
  - Expression manipulation and symbolic computation: Automatically simplify expressions, differentiate, integrate, perform series expansions, transformations, and equation solving, providing symbolic tools for engineering modeling and financial risk analysis.
  - Math problem understanding and solution step generation: Extract structured representations from problems in natural language or images, produce rigorous, verifiable solution steps, serving education and training scenarios.
  - Mathematical reasoning capability enhancement: Through math-specific fine-tuning and tool augmentation, improve large models' multi-step reasoning and rigor in arithmetic, algebra, geometry, combinatorics, and other domains.
- **Principles**
  - Formal systems and search:
    - Within systems such as Lean / Coq / Isabelle, mathematical objects and theorems are formalized as terms and types, and the proof process corresponds to constructing proof trees under rule constraints.
    - Proof search can be viewed as "finding a path satisfying constraints in an extremely large state space," suitable for methods such as reinforcement learning, MCTS (Monte Carlo Tree Search), and policy / value networks.
  - Neural–symbolic collaboration:
    - LLMs are responsible for extracting problem structures and solution approaches from natural language or unstructured inputs, translating them into symbolic expressions (e.g., SymPy code, Lean proof scripts).
    - Computer algebra systems and theorem provers are responsible for executing rigorous symbolic computation and formal verification, validating and correcting LLM outputs.
  - Mathematical reasoning capability improvement:
    - Through targeted pretraining or fine-tuning on large-scale mathematical texts and problem banks (e.g., Minerva, Gödel), enhance models' understanding of mathematical language and mastery of reasoning styles.
    - Adopt Tool‑Augmented LLM frameworks, incorporating symbolic solvers, numerical computation libraries, plotting tools, and theorem provers as external tools, enabling models to learn to "call tools" rather than "memorize results" in complex reasoning.
- **Models**
  - Automated theorem proving:
    - AlphaZero‑style provers: View the proof process as a game, using policy networks and value networks to guide search, progressively constructing formal proofs.
    - GPT‑f, Lean‑Dojo, etc.: Trained on large-scale formalized theorem and proof corpora, used to automatically generate proofs in systems such as Lean.
  - Mathematical large models and tool augmentation:
    - Minerva, Gödel, etc.: Large models fine-tuned on corpora such as math textbooks, papers, and problem banks, demonstrating stronger performance on proof problems, competition problems, and higher-order reasoning tasks.
    - LLM + SymPy / Mathematica / Lean / Coq: LLMs handle problem parsing and strategy planning, invoking symbolic computation and proof tools for precise operations and verification.
  - Products and applications:
    - "Math teaching assistants / problem-solving assistants" in educational products, providing personalized explanations and multiple solution paths.
    - Research assistance tools: Help researchers construct conjectures, generate proof drafts, search for related theorems and lemmas, accelerating theoretical exploration.
    - Formula derivation and risk model analysis in engineering / finance: Formalize complex models, perform symbolic sensitivity analysis and compliance review.

### 10.5.1 Automated Theorem Proving and Formal Reasoning

**Automated Theorem Proving (ATP) and Interactive Theorem Proving (ITP)** are important directions at the intersection of mathematics and computer science. The core task for AI in this domain is to automatically construct or assist in constructing proofs within formal systems, reducing the human burden on low-level details and allowing more focus on high-level ideas.

In **formal systems**:

- Theorems are encoded as goal types to be constructed, and proofs correspond to constructing a term whose type matches the goal type.
- The proof process consists of a series of tactics or reasoning steps, each advancing under strict logical rules.

AI can play multiple roles in this:

1. **Tactic selection and parameter recommendation**: Given the current proof state, predict the next tactic to use and its parameters, reducing manual trial-and-error and backtracking.
2. **Lemma and theorem retrieval**: Retrieve the most relevant lemmas / theorems from large libraries for the current goal, narrowing the search space.
3. **End-to-end proof generation**: Given a theorem and context, directly generate complete or partial proof scripts, which are then verified for correctness by the prover.

AlphaZero‑style provers, GPT‑f, Lean‑Dojo, and other works, by training policy and value networks or language models on large-scale formalized corpora, have achieved automatic proof of a considerable proportion of theorems in systems such as Lean / Coq. In terms of product direction, this capability is expected to evolve into "formal verification assistants" for software / hardware verification, cryptographic protocol analysis, and high-reliability system design.

### 10.5.2 Symbolic Computation and Mathematical Problem Solving: LLM + CAS

Compared to theorem proving, **symbolic computation and mathematical problem solving** are closer to engineering and education scenarios. The goal is: **starting from natural language problems, automatically construct symbolic expressions, perform computations, and produce interpretable solution steps**.

In this direction, the typical neural–symbolic collaboration workflow is:

1. **Problem understanding and abstraction**: The LLM parses problems in natural language or images into structured mathematical expressions (equations, constraints, objective functions, etc.).
2. **Symbolic expression generation**: Translate the abstracted results into CAS code (e.g., SymPy expressions, Mathematica commands).
3. **Invoke CAS for execution**: Use CAS for precise algebraic operations, differentiation, integration, solving systems of equations, limits, etc.
4. **Result interpretation and step generation**: The LLM, based on CAS computation results, generates human-readable solution steps and explanations.

This model has several key advantages:

- Correctness of computation is guaranteed by CAS, avoiding LLM "misaligned operations" and accumulated errors on long expressions.
- The LLM provides natural language understanding and expression, lowering the barrier to using CAS and enabling non-expert users to invoke powerful symbolic tools.
- In educational scenarios, the level of detail and style of explanation can be controlled, generating expositions suitable for different learning stages.

In engineering / finance scenarios, this capability can be extended to the formalization and analysis of complex models: automatically extracting model structures from documents and code, constructing symbolic representations, and performing sensitivity analysis, boundary case analysis, and risk identification.

## 10.6 Scientific Workflow & Lab Automation

The preceding sub-directions mostly focus on "single-point capabilities": predicting a property, generating a structure, proving a theorem. However, in real-world scientific and industrial R&D, what is more critical is how to **chain these capabilities into complete workflows** and connect them with literature, databases, simulation platforms, and automated experimental equipment. The scientific workflow and lab automation direction aims to build integrated **Agent + Tools + Robots** systems for scientific scenarios, enabling AI to evolve from "knowing how to compute" to "knowing how to run experiments and conduct research."

This direction connects on one end to paper and patent databases (e.g., PubMed, arXiv), scientific data warehouses, domain knowledge graphs, and simulation platforms, and on the other end to robotic labs, high-throughput screening equipment, and research process management systems. The following unfolds from three perspectives — **scenarios**, **principles**, and **models**.

- **Scenarios**
  - Scientific literature mining and knowledge base construction: Automatically extract compounds, proteins, materials, reaction conditions, experimental results, and other information from massive papers, building structured knowledge bases and knowledge graphs.
  - Experimental design and Self‑Driving Lab: Under AI-proposed experimental plans, robotic experiment platforms automatically execute formulation, reactions, measurements, and data acquisition, achieving "closed-loop" optimization.
  - Scientific data management and reproducibility assurance: Automatically organize simulation and experimental data, metadata, and code scripts, generating standardized experimental records and reports to improve traceability and reproducibility.
  - Domain "AI experiment assistants": Provide one-stop literature retrieval, protocol design, experimental planning, and result analysis support for pharmaceutical companies, materials companies, and research institutions.
- **Principles**
  - Literature mining and domain LLMs:
    - Use domain-pretrained models such as SciBERT, BioBERT, and PubMedBERT for named entity recognition, relation extraction, reaction parsing, and experimental condition extraction.
    - On this foundation, train domain LLMs such as Bio‑LM, Chem‑LM, and Materials‑LM to improve understanding and reasoning of specialized terminology, experimental statements, and implicit assumptions.
  - Experimental design and Self‑Driving Lab:
    - Treat the experimental space (formulation, temperature, time, addition order, etc.) as optimization variables, with LLM + RL or Bayesian optimization strategies proposing the next set of experimental conditions.
    - Experimental robots and instruments execute according to the plan, collect data and return it in real time, with models updating parameters and uncertainty estimates, forming an active learning closed loop.
  - Workflow orchestration and agents:
    - Under the Agent & Tool Use framework, unify literature retrieval, code generation, simulation invocation, data analysis, visualization, and report generation tools.
    - Agents, based on task objectives (e.g., "find a high-conductivity electrolyte formulation"), automatically plan task decomposition, tool invocation order, and result integration.
- **Models**
  - Literature and knowledge mining models:
    - SciBERT, BioBERT, PubMedBERT, etc.: Models pretrained on scientific and biomedical literature for entity / relation extraction, classification, and question answering.
    - Galactica, domain-specialized LLMs: Trained primarily on scientific corpora, supporting review generation, code drafts, experimental design suggestions, etc.
  - Experimental planning and control models:
    - LLM + RL / Bayesian Optimization: Combine domain priors, model uncertainty, and experimental cost to efficiently explore and exploit the experimental space.
    - Agents integrated with Robotic Lab control interfaces: Translate natural language experimental descriptions into structured experimental steps and instrument control commands.
  - Scientific agents and workflow systems:
    - Building on the Agent & Tool Use capabilities from Chapter 7, construct "multi-tool agents" for scientific scenarios: able to retrieve literature, generate code, invoke simulations, process data, create charts, and write report drafts.
  - Products and applications:
    - "AI experiment assistants" and automated experiment benches within pharmaceutical / materials companies: used to accelerate formulation development, process optimization, and candidate screening.
    - Domain scientific search engines and knowledge graphs (Bio / Chem / Materials / Physics Knowledge Graph): Support semantic search, interactive exploration, and knowledge reasoning.
    - Research process management platforms: Integrate experimental planning, data recording, version management, visualization, and automated report generation, improving research team efficiency and result reproducibility.

### 10.6.1 Scientific Literature Mining and Domain Knowledge Base Construction

The vast majority of scientific knowledge first appears in the form of papers and reports. For AI to truly participate in research, it must be able to "read papers and extract structured knowledge from them." **Scientific literature mining and knowledge base construction** is precisely about building queryable, reason-able knowledge infrastructure from unstructured text.

In this direction, core tasks include:

- **Entity recognition and standardization**: Identify entities such as compounds, proteins, materials, reactants, products, experimental equipment, and conditions in literature, and align them with standard databases (e.g., ChEMBL, Uniprot, Materials Project).
- **Relation and event extraction**: Extract relationships and events such as "who interacts with whom and how" and "what results were produced under what conditions" from text, e.g., reaction equations, formulation–performance correspondences, etc.
- **Knowledge graph construction**: Organize entities and relations into graph structures, supporting complex queries (e.g., "all reported methods for improving a certain property under certain conditions") and path reasoning.

To achieve these goals, the following are commonly adopted:

- Pretrained models such as SciBERT, BioBERT, and PubMedBERT for NER, RE, and document-level event extraction.
- On this foundation, build domain-specialized LLMs (Bio‑LM, Chem‑LM, Materials‑LM) for more complex question answering, review generation, and knowledge completion.

The constructed domain knowledge bases and knowledge graphs not only provide smarter retrieval and recommendation services for R&D personnel, but also supply data and prior support for subsequent experimental design and materials / drug inverse design.

### 10.6.2 Self‑Driving Lab and Scientific Workflow Agents: From "Reading Papers" to "Running Experiments"

With literature mining, modeling, and optimization capabilities in place, the next step is to combine these capabilities with **automated experimental platforms** to build truly **Self‑Driving Labs** and scientific workflow agents.

In a Self‑Driving Lab, the typical closed-loop workflow is:

1. **Goal setting**: The researcher provides a macro-level goal (e.g., "improve the conductivity of a certain material under specific conditions") and constraints (cost, safety, process limitations, etc.).
2. **Literature and knowledge retrieval**: The agent invokes literature retrieval and knowledge graphs to understand existing work and empirical patterns, forming initial hypotheses and an experimental design space.
3. **Experimental planning and optimization strategy**: Based on LLM + RL / Bayesian optimization strategies, propose the first batch of experimental conditions (formulation, temperature, time, environment, etc.).
4. **Robotic execution and data acquisition**: The automated experiment bench (Robotic Lab) executes the experiments, collects results in real time, and feeds them back.
5. **Model update and next-round design**: The surrogate model updates parameters and uncertainty estimates based on new data, then proposes the next round of more informative or promising experimental conditions.

In the broader **scientific workflow agent**, this closed loop extends to simulation, data analysis, and report generation:

- Agents can automatically generate simulation code or invoke existing simulation tools to pre-evaluate certain experimental conditions;
- During the data analysis phase, automatically complete data cleaning, visualization, and statistical testing;
- At project milestone summaries, generate structured experimental records and report drafts with charts and references.

In terms of product form, such systems are typically delivered as platforms: providing a unified interface and API, connecting to literature databases, simulation engines, and experimental equipment, allowing scientists and engineers to set goals at a high level using natural language and visual interfaces, with the remaining steps automatically orchestrated and executed by agents + toolchains.

From this sub-direction onward, AI's role in science truly shifts from "offline analysis tool" to "online research collaborator": not only able to read papers, write code, and compute models, but also to work alongside robots to complete real experiments and discoveries.
# 11. Platform & Engineering Capabilities (MLOps / Infra)

Moving large models from the lab to enterprise production is never just about "the model itself being good enough" — it requires a complete set of **stable, scalable, and operable platform and engineering systems**. This system must span the entire lifecycle: **model training and fine-tuning, deployment and inference optimization, data and model operations, monitoring and cost management, security and compliance, as well as platform and application enablement capabilities**, threading together otherwise scattered technical components into a sustainable closed loop.

From a business perspective, platform and engineering capabilities often determine whether an organization can use large models "at scale, safely, and at low cost." With the same underlying model, without a sound MLOps system, you may be stuck at the demo and pilot stage; but once a mature platform is in place, enterprises can rapidly replicate and evolve high-quality applications across multiple business units, countries/regions, and industry scenarios. Below, we elaborate across six dimensions: **model training and fine-tuning platforms, deployment and inference optimization, data and model operations, monitoring and cost/reliability, security and compliance infrastructure, and upper-layer application and platform capabilities**.

## 11.1 Model Training & Fine-tuning

At the base model level, most organizations do not train hundred-billion-parameter models from scratch. Instead, they perform **continued pre-training + fine-tuning** on open-source or commercial base models. The core question at this layer is: how to efficiently leverage compute and data to "pull" a general-purpose large model closer to a specific industry, enterprise, or task, while ensuring engineering manageability across multiple models and versions.

From an engineering perspective, this layer typically comprises three parts: **pre-training and continued pre-training**, **fine-tuning paradigms and toolchains**, and **large-scale distributed training infrastructure**.

- **Scenarios**
  - General-purpose large model base research and development: Cloud vendors / large companies develop proprietary general-purpose language / multimodal base models for external APIs and internal multi-business sharing.
  - Industry large models and proprietary models: Building industry base models or "enterprise-owned large models" around specific domains such as finance, healthcare, law, manufacturing, energy, and gaming.
  - Enterprise-level model customization: Custom fine-tuned models or LoRA weights for a single major customer (banks, insurance, government, manufacturing groups, etc.) based on their internal data.
  - Multi-tenant model marketplace: SaaS / cloud platforms providing "one model per customer" fine-tuning and hosting capabilities for numerous small and medium customers, with one set of weights or adapter layers per tenant.
  - One-click fine-tuning platform: A fully managed product open to non-algorithm teams, with a workflow of "upload data → select base model → auto fine-tune → one-click deploy."
- **Principles**
  - Pre-training and continued pre-training:
    - Large-scale pre-training on massive general-purpose text, code, and multimodal data, enabling the model to acquire **general language understanding, world knowledge, and basic reasoning capabilities**.
    - For specific industries, continued pre-training on top of a general model via **Domain-adaptive Pretraining (DAPT)**, introducing industry-specific terminology, writing styles, and knowledge distributions.
    - Multilingual / multimodal pre-training through shared semantic spaces and joint training, giving the model **cross-lingual transfer** and **image-text / speech / structured data fusion** capabilities.
  - Fine-tuning paradigms:
    - **Full-parameter fine-tuning**: When the target task distribution differs greatly from pre-training and sufficient compute and data are available, directly update all parameters for the highest performance ceiling.
    - **Parameter-Efficient Fine-Tuning (PEFT)**: Through methods such as Adapter, LoRA / QLoRA, Prefix / P-Tuning, train only a very small number of "incremental parameters," suitable for multi-task, multi-customer, and frequently updated scenarios.
    - **Instruction fine-tuning and task fine-tuning**: Use "instruction + examples" to teach the model to understand natural language task descriptions; can target a single vertical task or support multiple tasks on a unified model.
    - **RLHF / RLAIF**: Train a reward model through human or AI feedback, then further align model behavior (politeness, safety, refusal strategies, values) via reinforcement learning.
  - Distributed training and engineering systems:
    - Use strategies such as **data parallelism, model parallelism, pipeline parallelism, and tensor parallelism** to split ultra-large models and massive datasets across cluster nodes and multiple GPUs for collaborative training.
    - Through techniques such as ZeRO / FSDP, **reduce GPU memory usage and improve training throughput**, combined with efficient scheduling (Kubernetes + Slurm / Ray) for large-scale cluster training.
    - Rely on standardized data pipelines (dataset loading, cleaning, deduplication, sharding, caching) and fine-tuning frameworks (Transformers Trainer, DeepSpeed, Lightning, etc.) to reduce redundant reinvention.
- **Models**
  - Pre-training and continued pre-training toolchain:
    - Training frameworks: PyTorch, TensorFlow, JAX.
    - Large-scale training acceleration: DeepSpeed, Megatron-LM, Colossal-AI, Fairscale.
    - Distributed training strategies: Data Parallelism (DP), Model Parallelism (MP), Pipeline Parallelism (PP), Tensor Parallelism; ZeRO / FSDP, Megatron (TP+PP), DeepSpeed ZeRO.
    - Cluster scheduling and management: Kubernetes + Slurm / Ray / Horovod / TorchElastic.
    - Data pipeline: Hugging Face Datasets, WebDataset, Petastorm, tf.data, Arrow; object storage (S3 / OSS / GCS) + local cache; data cleaning and deduplication tools.
  - Fine-tuning and PEFT tools:
    - Fine-tuning frameworks: Hugging Face Transformers + Trainer / Accelerate, PyTorch Lightning, DeepSpeed, Colossal-AI.
    - PEFT toolset: PEFT (LoRA / QLoRA / Prefix Tuning / Prompt Tuning, etc.), LLaMA-Adapter and various LoRA toolchains.
    - Instruction and data construction: Self-Instruct, Alpaca / Dolly-style pipelines, various data augmentation and dialogue rewriting tools.
  - RLHF / RLAIF toolchain:
    - TRL (Transformers Reinforcement Learning), trlx, DeepSpeed-RLHF, custom RLHF pipelines.
    - Reward model training, ranking / scoring models, refusal strategies, and alignment strategy templates.

In terms of product form, this layer often manifests as: **base model research and development platforms, enterprise-level "training-as-a-service + customization" services, one-click fine-tuning platforms, and model marketplaces (Model Hub / Model Store)**, supporting the production path from "general-purpose models" to "thousands of models for thousands of enterprises."

### 11.1.1 Pre-training and Continued Pre-training: From General Capabilities to Industry Base Models

Pre-training is the "source engineering" of modern large model capabilities: through self-supervised learning on massive unlabeled text, code, and multimodal data, the model gradually acquires language modeling, world knowledge, basic reasoning, and representation learning abilities. On top of this, continued pre-training (especially **Domain-adaptive Pretraining, DAPT**) takes on the task of "pulling the model toward a specific vertical domain."

In the **general-purpose pre-training** phase, core considerations include:

1. **Corpus scale and diversity**: Mixing web text, books, code, dialogue, multilingual content, and multimodal data such as image-text pairs to cover as broad a range of knowledge and expression forms as possible.
2. **Training objectives and multi-task mixing**: Beyond classical autoregressive language modeling, sometimes incorporating fill-in-the-blank, next-sentence prediction, contrastive learning, image-text alignment, and other objectives to improve the model's semantic alignment and multimodal understanding.
3. **Multilingualism and alignment**: Through shared vocabularies or subword encoding, as well as cross-lingual parallel corpora or alignment tasks, the model models different languages in a unified vector space, enabling **cross-lingual transfer and translation**.

In the **industry continued pre-training (DAPT)** phase, the focus shifts to:

1. **Industry corpus construction**: Building proprietary corpora from channels such as medical records and guidelines, legal judgments and statutes, financial research reports and transaction data, and manufacturing / energy / gaming design documents.
2. **Style and terminology adaptation**: Through continued pre-training on large volumes of domain-specific corpora, the model naturally acquires industry terminology, fixed expressions, professional writing styles, and tacit knowledge (such as clinical expression conventions and legal phrasing).
3. **Enterprise-specific proprietary knowledge injection**: For large enterprises or institutions, further incorporate internal documents, knowledge bases, and work order records on top of general + industry corpora to train an "enterprise proprietary large model" as a unified intelligent foundation.

In engineering practice, pre-training and continued pre-training run on large-scale distributed frameworks (Megatron-LM, DeepSpeed ZeRO, etc.) and efficient data pipelines (WebDataset / HF Datasets + object storage), forming **stable, reusable training pipelines**. For cloud vendors or large companies, such pipelines are often encapsulated as internal platforms, supporting periodic incremental pre-training and parallel iteration of multiple industry base models.

### 11.1.2 Fine-tuning Paradigms and RLHF: From "Able to Communicate" to "Understands the Business and Respects Boundaries"

After having a powerful pre-trained base, the key to making the model "useful for the business" and "behaviorally controllable" lies in the fine-tuning and alignment stages. This includes both traditional supervised fine-tuning (SFT) and instruction fine-tuning, multi-task fine-tuning, and feedback-based reinforcement learning (RLHF / RLAIF).

At the **fine-tuning paradigm** level, it can be roughly divided into:

1. **Full Fine-tuning**
   When the task distribution differs significantly from pre-training, or when ultimate performance is rigidly required and compute is abundant (such as for specific programming language models or specific language / industry dialogue models), directly updating all parameters yields the maximum performance ceiling. However, its cost is high and version management is complex, so it is generally used only for a few core models.
2. **Parameter-Efficient Fine-tuning (PEFT)**
   Through methods such as Adapter, LoRA / QLoRA, Prefix / P-Tuning, only the inserted "small incremental parameter blocks" or low-rank weight deltas are trained, while the original large model weights remain frozen. This brings three engineering advantages:
   1. Multiple tasks / customers can share the same base model, switching only different Adapter / LoRA weights.
   2. Significantly reduces GPU memory and compute requirements, enabling fine-tuning on small to medium GPU clusters or single-machine environments.
   3. Frequent updates and simple rollbacks facilitate rapid experimentation and A/B testing.
3. **Instruction Fine-tuning and Task Fine-tuning**
   1. **Instruction Tuning**: Using samples of "natural language instruction + input + expected output," the model learns to understand human instruction forms such as "Help me...", "Please explain...", thus freeing itself from task-specific templates.
   2. **Single-task fine-tuning**: Fine-tuning only for vertical tasks such as customer service Q&A, code completion, or legal consultation, maximizing performance on that task.
   3. **Multi-task fine-tuning**: Carrying multiple tasks (Q&A, summarization, translation, code, recommendation rationale generation, etc.) on a unified model simultaneously, improving model generality and resource utilization.

At the **behavioral alignment and safety** level, **RLHF / RLAIF** plays a key role:

1. **Reward Model training**: Collect human or AI preferences (ranking / scoring) over multiple candidate model responses, and train a reward model capable of evaluating "how good an answer is."
2. **Reinforcement learning (e.g., PPO) optimization of the base model**: Under the guidance of the reward model, adjust model parameters via reinforcement learning to better align with human preferences and platform values, for example:
3. More polite, neutral, and professional;
4. Refuse or safely rewrite responses to dangerous, policy-violating, or privacy-related requests;
5. Express uncertainty when uncertain, rather than fabricating facts.
6. **RLAIF and self-supervised alignment**: In some scenarios, use a strong base model as the feedback provider, or combine rules with automated evaluation to perform semi-automatic alignment during fine-tuning, reducing human annotation costs.

In terms of toolchains, frameworks such as Hugging Face Transformers + PEFT, TRL / trlx, and DeepSpeed-RLHF have essentially formed a **standard industrial workflow** from SFT → RM training → RLHF. In product definition, typical implementations at this layer include: **model customization / training-as-a-service, one-click fine-tuning platforms, multi-tenant model marketplaces, and industry / enterprise proprietary large model engineering platforms**.

## 11.2 Model Deployment and Inference (Serving & Optimization)

After training a large model, how to provide inference services in a **highly available, low-latency, scalable, and cost-reducible** manner is the second pillar of the AI engineering system. The deployment and inference layer connects GPU / NPU compute clusters on one end and API gateways, enterprise applications, and external-facing platforms on the other. Its core responsibilities include: **deployment architecture design, model routing strategies, inference performance optimization, and hardware utilization**.

Overall, this layer addresses three questions: **what architecture to use for external service**, **how to make inference faster and cheaper**, and **how to maintain high availability and governability in multi-model, multi-region, multi-tenant environments**.

- **Scenarios**
  - Internal enterprise AI platform / model service bus: Unified provision of large model APIs to various business lines, shielding underlying model and hardware differences.
  - External-facing cloud API: Providing standardized inference interfaces to external developers and ecosystem partners, supporting multi-model selection and version management.
  - High-QPS online services: Customer service assistants, search, recommendation, office assistants, and other scenarios with extremely high latency and stability requirements.
  - Low-cost offline generation: Advertising / game copywriting, knowledge base generation, batch code refactoring, and other batch processing tasks where throughput and cost are primary and real-time requirements are low.
  - Cross-region, multi-cluster deployment: Providing nearby access for global or multi-region users, while supporting multi-cloud or hybrid cloud configurations.
- **Principles**
  - Deployment architecture and model routing:
    - **Single-model serving**: In early or simple scenarios, a single main model provides unified external service with simple architecture, but it is difficult to balance latency and cost.
    - **Multi-model serving and routing**: Configure models of different sizes or specialties for different dimensions such as task type, latency requirements, cost constraints, and user tier, and route requests via rules or a Meta-model (including A/B testing, multi-armed bandit / Bandit strategies, etc.).
    - **Multi-tenant isolation and SLA management**: In multi-customer scenarios, ensure performance and security isolation between tenants through resource quotas, QPS limits, access authentication, and SLA tiering.
    - **Elastic scaling and high availability**: Leverage infrastructure such as Kubernetes / Service Mesh to implement auto-scaling, multi-replica deployment, canary releases, blue-green deployments, and cross-region disaster recovery.
  - Inference performance optimization:
    - **Model compression and acceleration**: Reduce model computation and GPU memory usage through quantization (INT8 / INT4 / NF4 / GPTQ / AWQ), pruning / sparsification, knowledge distillation, and other techniques.
    - **System-level optimization**: Use KV Cache to cache attention keys and values, accelerating long conversations and continuous inference; balance throughput and latency through batching, parallel token generation, and streaming output; reduce memory access and kernel launch overhead through operator fusion and graph optimization.
    - **Heterogeneous hardware utilization**: Build adapted runtimes and scheduling strategies for different hardware such as GPU, CPU, NPU, FPGA, and ASIC; improve overall efficiency through high-speed interconnects such as NVLink / RDMA in single-machine multi-GPU and multi-machine multi-GPU scenarios.
  - Engineering and operations:
    - Use specialized inference frameworks such as vLLM, TGI, and Triton to significantly reduce self-development costs.
    - Perform cross-platform deployment and operator-level optimization through compilers and runtimes such as ONNX Runtime, TensorRT, TVM, and OpenVINO.
    - Build a unified **online inference cluster and traffic scheduling layer** with Kubernetes, Ray, Service Mesh, and API gateways.
- **Models**
  - Serving frameworks and inference services:
    - vLLM, TGI (Text Generation Inference), Triton Inference Server.
    - Ray Serve, KServe, TorchServe, SageMaker Endpoint, Vertex AI Endpoint, etc.
  - Cluster and scheduling:
    - Kubernetes (K8s), Kubeflow, Ray, Slurm.
    - Service Mesh: Istio / Linkerd (supporting canary releases, rate limiting, circuit breaking, fallback, and other traffic governance).
  - API gateway and authentication:
    - Kong, NGINX / APISIX / Envoy.
    - IAM / Keycloak / Auth0, cloud vendor API Gateway, OAuth2 / OIDC, etc.
  - Model compression and performance libraries:
    - Quantization: NVIDIA TensorRT-LLM / TensorRT, Intel Neural Compressor, OpenVINO (PTQ / QAT), BitsAndBytes, GPTQ, AWQ, AutoGPTQ.
    - Pruning / Sparsity: PyTorch Sparse, TensorFlow Model Optimization Toolkit, SparseML, Neural Magic.
    - Distillation: DistilBERT / TinyBERT and similar reference solutions, or distillation pipelines based on Hugging Face Trainer + custom distillation loss.
  - Inference engines / runtimes and graph optimization:
    - ONNX Runtime, TensorRT, OpenVINO Runtime, TVM, MNN, NCNN.
    - Large-model-specific inference engines: Sglang, vLLM, FasterTransformer, TGI, LMDeploy, DeepSpeed-Inference.
    - Compilation and graph optimization: TVM, XLA (JAX/TF), TensorRT Graph Optimizer, TorchDynamo / TorchInductor, MLIR, Glow, ONNX Graph Optimizer, Intel NNCF, etc.
  - Hardware and heterogeneous support:
    - GPU: CUDA / cuDNN / cuBLAS, ROCm (AMD).
    - CPU: oneDNN (MKL-DNN), OpenBLAS, Eigen.
    - NPU / dedicated accelerator cards: Ascend CANN, Habana Gaudi, Graphcore IPU, and other SDKs.

On the product side, this layer often takes the form of **enterprise AI platforms / model service buses, external cloud APIs, unified inference gateways, high-QPS online inference clusters, low-cost batch processing platforms, and compute utilization optimization solutions** — the runtime "operating system" that supports the large-scale deployment of large model capabilities.

### 11.2.1 Deployment Architecture and Model Routing: From Single Model to Multi-Model Service Mesh

In the early experimentation phase, many teams choose to provide services with a single "large and comprehensive" model as the **single entry point**: all requests are handled by the same model. This architecture is simple and has low maintenance costs, suitable for POC and low-traffic scenarios. However, as business expands and cost pressure increases, the shortcomings of a single-model architecture quickly become apparent:

1. Different tasks have different requirements for latency / cost / quality; using the same large model for all requests causes **compute waste**.
2. Different industries and different customers require differentiated capabilities, such as industry-specific models or customer-specific fine-tuned weights, which are difficult to manage uniformly in a "single model" mode.
3. Scenarios such as canary releases, A/B testing, and cross-region disaster recovery require flexible scheduling across multiple model versions.

Therefore, mature large model serving architectures tend to evolve into **multi-model serving and intelligent routing** architectures:

1. **Multi-model pool and model catalog**: Simultaneously maintain models of various sizes (small / base / large / ultra), various specialties (general / code / multimodal / industry-specific), and various versions (v1 / v1.1 / customer-customized, etc.), with unified registration and management at the service layer.
2. **Routing strategies**:
3. **Rule-based routing**: Explicit selection based on request parameters (task type, user tier, latency / cost preferences, etc.) and business rules (mandatory use of specific models for a given industry or region).
4. **Model selector (Meta-model)**: Use a lightweight model to automatically select the optimal model based on input content, historical performance, and real-time metrics (e.g., fast small model vs. slow large model).
5. **A/B / Bandit routing**: Conduct online experiments between old and new models or different configurations, automatically converging to the better option based on metrics such as CTR, user satisfaction, and task success rate.
6. **Multi-tenant isolation and quota management**:
7. Layer tenant-level quota control, QPS limits, access authentication, and SLA tiering on top of model routing to ensure resource and data isolation between different customers.
8. Use **logical isolation + physical isolation (dedicated clusters or dedicated nodes)** to address high-compliance scenarios such as finance / healthcare / government.
9. **Elastic scaling and high availability**:
10. Auto-scale based on traffic using Kubernetes HPA / VPA and Cluster Autoscaler.
11. Ensure service stability through multi-replica deployment, load balancing, canary releases, blue-green deployments, and multi-region disaster recovery.

Technically, this often employs a combination of **Kubernetes + Service Mesh (Istio / Linkerd) + API Gateway (Kong / APISIX / Envoy) + Model Serving Frameworks (vLLM / TGI / Triton / Ray Serve / KServe)**, forming a **service-mesh-based inference platform** that supports multi-model, multi-tenant operation as well as traffic governance and canary releases.

### 11.2.2 Inference Performance Optimization and Hardware Acceleration: Driving "Cost Per Inference" to a Minimum

In large-scale commercial deployment of large models, inference cost is often one of the largest ongoing expenses. How to compress **unit request cost (Cost per Request / per Token) and end-to-end latency** to an acceptable range while maintaining experience quality is the core technical challenge of the deployment layer.

On the **model side**, common techniques include:

1. **Quantization**
   Compressing weights and activations from FP16 / BF16 to low-bit formats such as INT8 / INT4 / NF4, significantly reducing GPU memory usage and bandwidth overhead.
   1. Post-Training Quantization (PTQ): Such as GPTQ, AWQ, BitsAndBytes, etc., performing offline quantization on existing models.
   2. Quantization-Aware Training (QAT): Accounting for quantization error during the training / fine-tuning phase to improve post-quantization accuracy.
2. **Pruning & Sparsity**
   Removing unimportant weights or channels through structured / unstructured pruning to make the model sparse, and combining with hardware-friendly sparse operators (such as NVIDIA sparse matrix acceleration) to improve inference speed.
3. **Distillation**
   Using a large model as a teacher to distill knowledge into a smaller student model or task-specific model, significantly reducing parameter scale while maintaining close task performance — suitable for latency-sensitive online services or edge deployment.

On the **system and runtime side**, key optimization points include:

1. **KV Cache and long-context optimization**:
   Cache the attention keys and values of historical tokens during autoregressive generation to avoid repeated computation, thus improving efficiency for long conversations and multi-turn requests; combine with chunked computation and dynamic pruning strategies to control GPU memory overhead.
2. **Batching and parallel generation**:
   Improve overall throughput without significantly increasing P95 latency through dynamic batching, group scheduling, and parallel token generation across multiple requests; combine with streaming output to improve the frontend interaction experience.
3. **Operator and graph optimization**:
   Use compilers and runtimes (such as TensorRT, TVM, ONNX Runtime, TorchInductor) for operator fusion, memory layout optimization, and static graph compilation, reducing kernel launch and memory access overhead.
4. **Heterogeneous hardware scheduling**:
   Allocate tasks reasonably across heterogeneous resources such as GPU, CPU, NPU, and FPGA based on the computational characteristics and latency requirements of different tasks:
   5. Extremely latency-sensitive and high-concurrency dialogue / search requests are preferentially scheduled to GPU / NPU.
   6. Batch generation, offline evaluation, log replay, and other tasks can be scheduled to CPU or low-cost GPU / NPU.

In terms of tools and frameworks, TensorRT-LLM, SgLang, vLLM, FasterTransformer, LMDeploy, DeepSpeed-Inference, and others have formed a relatively mature **large model inference acceleration ecosystem**. On the business side, these optimizations ultimately manifest as: **high-QPS, low-latency online inference clusters, low-cost batch generation platforms, compute utilization optimization solutions, and MaaS / API billing and cost accounting systems**.

## 11.3 Data & Model Operations (Data / Model Ops)

Once a large model enters production, it is no longer a "one-time delivery" static asset, but rather a dynamic system that requires continuous iteration across five dimensions: **data, model, configuration, versioning, and experimentation**. The Data / Model Ops layer is the engineering paradigm built around this reality: from data flywheels and model lifecycle management to online experimentation and automated releases, it provides the foundation for **sustainable improvement and controlled evolution** of model capabilities.

This layer connects data lakes / warehouses, logging and collection systems on one end, and training platforms, evaluation systems, and online service gateways on the other — it is the hub that closes the "data–model–business feedback" loop.

- **Scenarios**
  - Enterprise data platform + model training integrated platform: Connecting the full chain from data collection, cleaning, annotation, and management to training / fine-tuning, supporting continuous iteration of multiple models.
  - "Continuous effect improvement mechanism" for consumer / business AI applications: Relying on a data flywheel driven by user feedback and usage data.
  - Data management and annotation workbench shared by annotation teams and algorithm teams: Supporting task assignment, quality inspection, and version rollback.
  - Enterprise-grade ModelOps platform: Unified recording and management of all model versions, evaluation results, and release statuses.
  - Online business experimentation and canary release system: Supporting A/B testing, small-traffic trial runs of multiple models, and automatic optimal rollout.
  - Model hosting service: Providing partners / customers with model management capabilities for "upload once, deploy in multiple environments, manage multiple versions."
- **Principles**
  - Data management and data flywheel:
    - **Data collection and governance**: Collect samples from business logs, user conversations, public data, and partner data; perform deduplication, denoising, desensitization, format unification, and quality assessment.
    - **Annotation and feedback closed loop**: Build high-quality annotated data through a combination of expert annotation and crowdsourcing, with quality inspection mechanisms; channel user likes / dislikes, corrections, and manual reviews back into the training sample pool.
    - **Data Flywheel**: After the model goes live, continuously collect real usage data → select high-value samples from it (such as model errors, low-confidence cases, high-yield tasks) → retrain or fine-tune → model performance improves → a new round of usage, forming a positive feedback loop.
  - Model lifecycle and release:
    - **Model version management**: Maintain clear version numbers (major / minor), training data versions, configuration parameters, evaluation results, safety reports, and change records for each model.
    - **CI/CD and automated pipelines**: After training completes, automatically trigger evaluation and safety checks; pass regression tests and threshold gates; only allow canary release and full rollout if key metrics do not degrade excessively.
    - **Experimentation and traffic allocation**: Use online experimentation methods such as A/B testing and multi-armed bandits to compare multi-version models and automatically select the best based on real-time business metrics (e.g., task success rate, ticket resolution rate, user satisfaction).
- **Models**
  - Data lake and data warehouse:
    - Delta Lake, Apache Hudi, Iceberg, Hive, BigQuery, Snowflake, etc., for unified storage and management of large-scale structured / unstructured data.
  - Stream data processing:
    - Kafka, Pulsar, Flink, Spark Streaming, etc., for real-time log, user conversation, and event stream ingestion.
  - Feature and sample management:
    - Feast and other Feature Stores, custom sample repositories, ML Metadata Store, for recording sample, feature, and training metadata.
  - Annotation and quality inspection platforms:
    - Label Studio, Scale-like platforms, custom annotation systems, supporting multi-task annotation, quality inspection, and personnel management.
  - MLOps / ModelOps platforms:
    - MLflow, Kubeflow, SageMaker, Vertex AI, Azure ML, Weights & Biases, etc., for managing training experiments, parameters, metrics, and model artifacts.
  - Model registry and version management:
    - MLflow Model Registry, SageMaker Model Registry, W&B Artifacts, etc.
  - CI/CD tools:
    - GitHub Actions, GitLab CI, Jenkins, Argo CD, Flux, etc., for building model continuous delivery pipelines.

### 11.3.1 Data Flywheel and Training Closed Loop: Making Models "Smarter with Use"

In traditional software development, version upgrades are often driven by development plans; in the large model era, **data and feedback** become the primary drivers of iteration. The goal of the data flywheel is to turn "model usage → data accumulation → retraining → model upgrade" into an automatically rolling closed loop, so that models **get better with use** in real business.

Core components include:

1. **Online data collection and filtering**
   In applications such as chatbots, Copilots, search Q&A, and code assistants, every user interaction is a potentially high-value training sample. Through logging systems and event tracking, structurally collect requests, model responses, and user behavior (clicks, adoption or not), and perform privacy desensitization and field trimming at the collection end to avoid introducing additional compliance risks.
2. **High-value sample mining**
   Filter out the small fraction of samples most valuable for training from massive logs, such as:
   1. Clearly erroneous or user-downvoted responses, used for "corrective" retraining.
   2. High-difficulty long questions and complex workflow task samples, used to improve the model's capabilities in "long-chain reasoning / multi-step tool use."
   3. Typical business cases and high-value work orders, used to build industry / enterprise-specific capabilities.
3. **Annotation and quality control**
   Perform manual or semi-automatic annotation on candidate samples (including expected responses, quality ranking, safety labels, etc.), and ensure annotation quality through multiple rounds of quality inspection, review, and spot-checking, providing reliable data for subsequent SFT or RLHF.
4. **Continuous retraining and evaluation rollout**
   Periodically add new samples to the training set, perform SFT / DAPT / RLHF and other retraining operations, and simultaneously evaluate both "offline metrics + online performance" through standard evaluation sets and online A/B experiments, ensuring the new version is overall better than the old version and preventing the data flywheel from "veering in the wrong direction."

In its mature form, the vast majority of data flywheel operations are automated and encapsulated within a **Data / Model Ops platform**: from data collection, sample filtering, and annotation task dispatch, to model retraining triggers, evaluation result collection, and rollout decisions — minimizing manual operations and turning model iteration into a stable, controllable engineering process.

### 11.3.2 Model Lifecycle and ModelOps: From Experimental Models to Production Assets

As the number of models and versions grows exponentially, without rigorous lifecycle management, problems such as "models scattered everywhere, chaotic versioning, and difficult rollbacks" easily arise. The goal of ModelOps is to manage models as **first-class engineering assets**, fully traceable, comparable, and rollback-capable.

Key points include:

1. **Versioning and metadata management**
   Assign a clear version number to each model (e.g., `industry-legal-base-v1.2.3`) and record:
   1. Training data version and time range;
   2. Training configuration (hyperparameters, training script version, code commit used);
   3. Evaluation metrics (general benchmarks + business-specific benchmarks);
   4. Safety evaluation and alignment strategy (e.g., sensitive topic response policy version);
   5. Rollout / rollback / decommissioning history.
2. **End-to-end automated pipelines (CI/CD for Models)**
   Encapsulate the process of "model training complete → automatic evaluation → safety and bias checks → canary release → full rollout" into a CI/CD pipeline.
   3. If offline evaluation metrics do not meet the preset threshold, automatically block rollout.
   4. If online A/B experiment performance is poor, automatically reduce traffic or roll back to the previous version.
5. **Multi-version coexistence and traffic scheduling**
   In production, multiple model versions often coexist simultaneously (e.g., `stable` / `canary` / `experimental`), compared online through traffic allocation strategies (fixed ratio, user dimension, feature dimension).
   1. A/B testing focuses more on stable statistical conclusions;
   2. Multi-armed bandit automatically balances exploration and exploitation, accelerating convergence to better-performing versions.
6. **Compliance and audit support**
   For industries such as finance, healthcare, and government, every model version change must maintain traceable records: who upgraded which model from which version to which version based on what data and when, and what the post-upgrade impact assessment was. This part typically integrates with the **security and compliance infrastructure** in section 11.5.

In engineering implementation, tools such as MLflow / SageMaker / Vertex AI / W&B already provide relatively mature ModelOps capabilities; most enterprises build on top of these with secondary encapsulation tailored to their own processes, constructing a unified **internal model registry and release platform**.

## 11.4 Monitoring, Cost & Reliability

When large models become core business infrastructure, ensuring they are **observable, alertable, scalable, and cost-controllable** becomes the core responsibility of SRE and platform teams. The monitoring, cost, and reliability layer combines traditional observability systems with large-model-specific metrics, building a multi-dimensional view for operations, algorithms, and management.

This layer connects monitoring collection, logging / tracing systems on one end, and business KPIs and cost analysis platforms on the other — it is the key pillar ensuring model services are "stable, fast, and cost-effective."

- **Scenarios**
  - Operations / SRE-facing monitoring dashboard: Unified display of CPU / GPU utilization, QPS, latency, error rates, alerts, etc.
  - Algorithm-team-facing data and model quality monitoring platform: Monitoring input data distribution, model drift, prompt engineering effectiveness, and RAG hit rates, etc.
  - Management-facing service health dashboard: Displaying business KPIs (conversion rate, satisfaction, task completion rate) bound with model metrics.
  - AI cost analysis and optimization platform: Breaking down compute costs by model, project, and business line, supporting budget management and cost optimization strategies.
  - Intelligent scheduling and elastic scaling system: Automatically scaling or switching model specifications based on load and budget.
  - External MaaS / API billing and cost accounting system: Supporting billing by call volume, token count, compute usage, and other dimensions.
- **Principles**
  - Monitoring and observability:
    - **Multi-layer monitoring**: From the infrastructure layer (CPU / GPU / memory / network / storage) to the service layer (QPS, P50 / P95 / P99 latency, error rate, timeout retries), and further to the model layer (token usage, context length distribution, response length, common error types).
    - **Logging and distributed tracing**: Record requests / responses via structured logging (on the premise of desensitization), carrying model version, routing decision, and tenant information; use distributed tracing tools to record the complete path of a request from API gateway → model service → downstream systems.
    - **Alerting and analysis**: Set threshold alerts, anomaly detection, and trend analysis, linked with business metrics, cost, and security events for rapid localization and recovery.
  - Cost control and elastic scheduling:
    - **Cost analysis**: Break down GPU / CPU / storage / bandwidth costs by model, project, and business line dimensions; calculate average cost per request and marginal cost for different tasks / customers.
    - **Elastic scheduling**: Use peak/off-peak time-based strategies to automatically scale up during peak periods and scale down during troughs; shift offline batch tasks to nighttime or low-load periods.
    - **Strategic degradation and on-demand acceleration**: Automatically switch to smaller models, shorter contexts, or more conservative inference configurations when resources are tight; automatically use larger models or longer contexts for high-value requests.
- **Models**
  - Monitoring and visualization:
    - Prometheus + Grafana, VictoriaMetrics, Thanos, and other metric collection and visualization solutions.
  - Logging systems:
    - ELK (Elasticsearch + Logstash + Kibana), EFK (Fluentd / Fluent Bit), OpenSearch, etc.
  - Distributed tracing:
    - OpenTelemetry, Jaeger, Zipkin, etc.
  - Model-specific monitoring:
    - WhyLabs, Arize AI, Fiddler, Evidently AI, etc., for data / model drift monitoring and output quality evaluation.
  - Cost tracking and allocation:
    - K8s Metrics / Cost Exporter, Kubecost, and cloud vendor Cost Management tools (AWS Cost Explorer / GCP Billing / Azure Cost Management).
  - Resource scheduling and elastic scaling:
    - K8s HPA / VPA, Cluster Autoscaler, Volcano, Ray Cluster Autoscaler.
  - Task orchestration:
    - Argo Workflows, Airflow, Prefect, Dagster, etc.

### 11.4.1 Monitoring and Observability: From Infrastructure to Model Behavior

In large model systems, traditional CPU / memory / QPS metrics are no longer sufficient; an additional layer of "model-perspective" monitoring is needed to truly see system health. A complete observability system typically includes:

1. **Infrastructure and service layer monitoring**
   Collect and visualize via Prometheus / Grafana, VictoriaMetrics, etc.:
   1. Node / Pod-level CPU, GPU, memory, disk, and network usage;
   2. Service-level QPS, P50 / P95 / P99 latency, error rate, timeout retry ratio, connection count;
   3. Cluster-level resource utilization and capacity warnings.
2. **Model-layer metric monitoring**
   For large model services, beyond conventional performance metrics, specialized monitoring is also needed:
   1. Token consumption per request (input / output), context length distribution;
   2. Response length and truncation ratio, to troubleshoot quality issues caused by context / output length limits;
   3. Statistics on common error types (such as overly long input, model timeout, tool call failures, etc.).
3. **Logging and distributed tracing**
   1. Use structured logging to record request parameters (after desensitization), model version, routing decision, tenant identifier, return code, and other information.
   2. Use OpenTelemetry, Jaeger, Zipkin, etc., to trace the full path of a request through API gateway → model service → downstream systems → callback chain, facilitating latency bottleneck and fault point localization.
4. **Anomaly detection and intelligent alerting**
   On top of traditional threshold-based alerting, introduce simple statistical monitoring or machine learning models to perform anomaly detection on QPS, latency, error rate, token distribution, etc., automatically alerting when sudden changes occur and triggering self-healing strategies (such as auto-scaling, traffic switching, service degradation).

For algorithm teams, tools such as WhyLabs, Arize, and Evidently AI can also be integrated at this layer to track input distributions, model output characteristics, and drift over the long term, providing signals for subsequent data flywheel and retraining efforts.

### 11.4.2 Cost Analysis and Elastic Scheduling: Finding the Balance Between "Experience" and "Budget"

One of the most significant operational challenges of large model services is **high and volatile costs**. Without refined cost analysis and elastic scheduling, it is easy to lose sight of "where the money is being burned" as the business grows, and difficult to make timely adjustments. A mature cost and resource scheduling system typically includes:

1. **Cost attribution and allocation**
   Use Kubecost, cloud vendor Billing tools, and custom ledgers to break down GPU / CPU / storage / bandwidth costs by dimensions such as model, project, business line, and tenant, so that every team and customer can see their corresponding real resource consumption and expenses.
2. **Unit request cost and marginal cost analysis**
   1. Calculate the average cost per request for each model / task (Cost per 1k tokens / per request), comparing cost-effectiveness across different models and configurations.
   2. Analyze the marginal cost of different customers and business scenarios, providing a basis for pricing strategies (API billing), SLA tiering, and product packaging.
3. **Elastic scaling and peak/off-peak utilization**
   1. Implement auto-scaling through mechanisms such as K8s HPA / VPA, Cluster Autoscaler, and Ray Autoscaler, ensuring no overload during peaks and no idle waste during troughs.
   2. Schedule offline tasks (such as batch content generation, log replay, offline evaluation) during nighttime or off-peak hours to improve overall GPU utilization and smooth the cost curve.
4. **Strategic degradation and on-demand acceleration**
   1. Automatically trigger degradation strategies when resources are tight or costs exceed budget: use smaller models, shorten context or output, reduce parallelism.
   2. Automatically use larger models, longer contexts, or richer tool-calling capabilities for high-value requests (such as paying premium users, critical business processes), achieving "compute allocation by value."

In external API scenarios, this layer also deeply integrates with billing systems, forming a **MaaS / API billing and cost accounting platform**: billing based on token usage, call count, model specification, and request type, while providing cost and margin analysis for operations / sales.

## 11.5 Security, Access Control & Compliance Infrastructure

Once large model capabilities enter highly sensitive industries such as finance, healthcare, and government, security and compliance are no longer "added value" but a prerequisite for entering the scenario. The security, access control, and compliance infrastructure layer is responsible for building system-level defenses spanning **access control, data security, privacy protection, and compliance auditing**, ensuring model services operate reliably within legal and regulatory frameworks.

This layer connects identity authentication, permission management, key and encryption systems on one end, and model services and logging / auditing platforms on the other — it is the key to turning "a model that can be used" into "a model that dares to be used."

- **Scenarios**
  - Localized large model platforms for high-compliance industries such as finance / healthcare / government: Requiring data to remain within the domain, with auditability and traceability.
  - Enterprise unified AI access control and audit gateway: Unified authentication, permission management, and audit logging for all model calls.
  - Multi-tenant SaaS / cloud platforms: Needing strict security isolation and compliance support for different customers at both logical and physical levels.
  - Open interfaces for partners / ecosystem: Requiring fine-grained permission control and quota limits on API calls, and meeting compliance requirements (such as GDPR, etc.).
- **Principles**
  - Access control and tenant isolation:
    - Use API Key / Token / OAuth / SSO and other methods for identity authentication.
    - Implement fine-grained permission management across dimensions such as model, function, call frequency, and data scope through RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control).
    - Achieve isolation of **data, logs, configuration, and model weights** in multi-tenant environments, preventing cross-tenant access and information leakage.
  - Data security and privacy protection:
    - Use TLS encrypted transport, storage encryption, and centralized key management (KMS) to ensure data security during transmission and storage.
    - Implement log desensitization and data minimization strategies, retaining only the information necessary for business and optimization, and auditing access behavior.
    - Introduce privacy-enhancing technologies (such as data anonymization, differential privacy, federated learning) where necessary to further reduce privacy risks.
  - Compliance and auditing:
    - Maintain full audit trails and approvals for key operations such as model releases, configuration changes, permission changes, and routing policy adjustments.
    - Record traceable metadata for every request: request source, model version, decision basis (such as knowledge base / tool call usage).
    - Ensure system design and operation comply with financial, healthcare, government, and other industry regulatory requirements, as well as local and cross-border data compliance regulations.
- **Models**
  - Identity authentication and permission management:
    - Keycloak, Auth0, Okta, cloud vendor IAM (AWS IAM / GCP IAM / Azure AD).
    - Policy engines such as OPA (Open Policy Agent) + Rego Policy for unified policy management and enforcement.
  - API security gateway:
    - Kong, Apigee, Envoy, cloud vendor API Gateway, etc.
  - Data and key security:
    - KMS (Key Management Service), HashiCorp Vault.
    - TLS termination, Confidential Computing, etc.

### 11.5.1 Access Control and Tenant Isolation: Ensuring "Who Can Use What, and How Much"

In a large model platform shared by multiple business lines, customers, and roles, without fine-grained access control and tenant isolation, serious problems such as permission abuse, data leakage, and resource contention can easily arise. A comprehensive access and isolation system requires coordination across the following dimensions:

1. **Identity authentication and single sign-on**
   Use API Key / Token, OAuth2 / OIDC, enterprise SSO, and other methods for unified identity authentication of internal employees, external partners, and third-party applications. For enterprise users, integrate with existing identity systems (such as AD / LDAP / enterprise IAM) to avoid duplicate account systems.
2. **Fine-grained permission control (RBAC / ABAC)**
   3. RBAC: Configure accessible models, environments (test / production), operations (call / configure / release), and quotas for roles such as administrators, algorithm engineers, business operators, regular users, and partners.
   4. ABAC: On top of roles, introduce attributes such as tenant ID, project ID, data domain, and time period to implement more flexible policies (such as "only allow government tenant A to call localized model clusters within the local region").
5. **Multi-tenant isolation and quota management**
   1. At the logical level, isolate different customers' calls, data, and logs through tenant IDs;
   2. At the physical level, provide dedicated clusters or dedicated nodes for high-compliance customers (such as banks / government), achieving a higher level of isolation;
   3. Configure QPS limits, concurrent connection counts, and token quotas for different tenants to prevent "one tenant's surge from dragging down the entire platform."
6. **Access auditing and policy evaluation**
   1. Audit and record key operations (such as creating / deleting API Keys, adjusting permissions, modifying quotas);
   2. Use policy engines such as OPA / Rego to uniformly evaluate and interpret complex access policies before execution, reducing the risk of "policies scattered throughout the code."

Through this layer of mechanisms, the platform can open up large model capabilities to internal and external users while ensuring resource and data security, and provide foundational data for subsequent compliance auditing and issue accountability.

### 11.5.2 Data Security, Privacy & Compliance Auditing: Making Models "Both Useful and Compliant"

Large models often come into contact with vast amounts of sensitive data (user conversations, business documents, transaction records, etc.). If security or compliance issues arise, the consequences can be extremely severe. Therefore, "multi-layer defense" is needed across the full data lifecycle and the full model invocation chain.

1. **Data transmission and storage security**
   1. Universally enable TLS encryption for all external and internal interfaces to prevent eavesdropping or tampering during transmission;
   2. Use static encryption for storing sensitive data, with cloud-vendor or self-built KMS managing the key lifecycle;
   3. Use tools such as Vault to centrally manage keys and credentials needed for accessing databases, object storage, and third-party APIs.
2. **Minimization principle and desensitization**
   1. Only collect data fields necessary for the business, and remove personally identifiable information (PII) and sensitive fields from logs and training samples as much as possible;
   2. Hash or anonymize identifiers that must be retained, reducing the risk of exposure;
   3. In RAG / knowledge base scenarios, implement permission tiering for document access, ensuring the model cannot retrieve information from "documents it shouldn't read."
3. **Privacy-enhancing technologies and edge constraints**
   1. In scenarios requiring model sharing without sharing raw data, introduce differential privacy or federated learning to balance privacy and efficacy;
   2. For government, finance, healthcare, and similar scenarios, adopt a "data stays in-domain, model is pushed down or deployed locally" model, deploying training / inference capabilities within the compliant domain.
4. **Compliance and auditing mechanisms**
   1. Apply approval workflows and audit trails to operations such as model releases, configuration changes, and permission adjustments for easy retrospective tracing;
   2. Record metadata such as model version, caller, routing decision, and data access scope for each request, enabling post-mortem analysis when disputes or investigation needs arise;
   3. Periodically output compliance reports (such as data access audits, permission usage records, anomaly event reports), interfacing with internal risk control and external regulatory requirements.

This set of capabilities works in concert with the Data / Model Ops and monitoring platforms in sections 11.3 and 11.4, together forming a model operating environment that "can continuously iterate while remaining secure and compliant."

## 11.6 Upper-Layer Applications & Platform Capabilities (Application Enablers)

With a complete infrastructure spanning training, inference, security, and operations, an additional "capability layer" facing business and developers is needed — abstracting the underlying large models into components and services that are easier to use and closer to business semantics. This layer is often referred to as the **AI platform, application enablement layer, or Copilot platform**. Its responsibility is: packaging large models + RAG + Agents + workflows into standardized capabilities, so that business teams and ecosystem partners can rapidly build AI applications.

This layer connects model APIs, RAG engines, and Agent Orchestrators on one end, and business systems such as CRM / ERP / OA / ticketing on the other — it is the key bridge "from model capabilities to business scenarios."

- **Scenarios**
  - Enterprise AI platform / Copilot platform: Unified provision of intelligent capabilities such as dialogue, RAG, and Agent for internal systems such as CRM, ERP, OA, customer service, marketing, and R&D.
  - Application development platform for developers and ecosystem partners: Enable third parties to quickly build and deploy AI applications through SDKs, template projects, and visual orchestration tools.
  - AI backends for industry SaaS products: Such as intelligent customer service cloud, marketing cloud, office collaboration cloud, R&D management cloud, etc., embedding AI capabilities into existing product systems.
  - Vertical scenario assistants: Code Copilot, sales assistant, operations assistant, legal assistant, medical assistant, etc., rapidly assembling scenario-specific solutions through platform capabilities.
- **Principles**
  - Dialogue and Agent capabilities:
    - **Conversation management and memory**: Maintain multi-turn dialogue state and long-term memory, supporting topic switching, context compression, and personalized profiles.
    - **Tool Use and workflow orchestration**: Connect the model with external systems (databases, search, business APIs, third-party services) through function calling or plugin mechanisms; use Workflow / Orchestrator to chain multi-step operations for complex tasks.
    - **Multi-Agent collaboration**: Split complex tasks into different roles (such as planner, executor, reviewer), completing task decomposition and result aggregation through collaboration.
  - RAG and knowledge bases:
    - **Document parsing and preprocessing**: Parse and chunk documents such as PDF, Word, web pages, and scanned documents into structured text.
    - **Vectorization and retrieval**: Use Embedding models to vectorize content such as text / tables / code, building vector indexes; combine keyword retrieval with vector retrieval to achieve high recall.
    - **Retrieval + Generation (RAG) and evidence chains**: At inference time, first retrieve relevant content from the knowledge base, then have the large model generate a response based on the retrieved results, outputting citations and evidence chains to improve accuracy and explainability.
    - **Knowledge graphs and structured knowledge fusion**: Combine domain knowledge graphs, business data tables, and rule systems with LLMs to improve handling of structured queries and complex constraints.
  - Developer access and secondary development:
    - **Multi-language SDKs and API design**: Provide SDKs in Python / JS / Java / Go and other languages, encapsulating invocation patterns, retries, and idempotency handling.
    - **Templates and low-code / no-code building**: Enable non-professional developers to build RAG / Agent / Workflow through pre-built template projects and visual "building block" tools.
    - **Plugins and middleware**: Provide plugins or middleware for common business systems (CRM / ERP / OA / ticketing systems, etc.), reducing system integration costs.
- **Models**
  - Dialogue / Agent frameworks:
    - LangChain, LlamaIndex, Haystack, Semantic Kernel, etc.
    - Custom Orchestration layer: Typically includes Workflow Engine, Tool Router, and Memory management modules.
  - RAG and vector retrieval:
    - Vector databases: FAISS, Milvus, Qdrant, Weaviate, Pinecone, etc.
    - Document parsing: unstructured, Textract, pdfplumber, Apache Tika, etc.
  - SDK / access layer:
    - Official or custom SDKs, frontend component libraries (chat components, prompt template management, conversation history views).
    - Middleware / plugins for business systems (CRM / ERP / OA / ticketing, etc.).

### 11.6.1 Dialogue and Agent Orchestration: From "Q&A Bot" to "Task Collaboration Agent"

Compared to early FAQ-style Q&A bots, modern large-model-driven applications are more like "intelligent collaborators that can use tools." The goal of dialogue and Agent orchestration is to upgrade large models from "language generators" to intelligent agents capable of **calling tools, executing plans, and coordinating multiple roles**.

1. **Dialogue management and memory mechanisms**
   1. Maintain dialogue context, user profiles, and long-term memory, ensuring consistency and coherence across multi-turn interactions;
   2. Use summarization, retrieval-based memory, and other techniques to compress ultra-long dialogues, preventing context from "overflowing";
   3. In enterprise applications, introduce identity and permission information into the dialogue context, so that responses and actions align with the user's permissions in the business system.
2. **Tool Use and workflow orchestration**
   1. Provide the model with a structured list of tools (such as "look up order," "create ticket," "query inventory," "call search engine," etc.), and let the model proactively invoke them when needed through a function calling interface;
   2. Use an Orchestrator to coordinate the sequence, data flow, and error handling of multiple tool calls based on the plan proposed by the model;
   3. Model complex business processes (such as approval flows, expense reimbursement, after-sales processing) as workflows, allowing the Agent to play the role of "process coordinator."
3. **Multi-Agent collaboration patterns**
   1. Split complex tasks into multiple roles: such as "task planning Agent," "information retrieval Agent," "execution Agent," "quality inspection / review Agent";
   2. Enable inter-Agent collaboration through message channels or shared memory, improving the robustness and explainability of complex tasks;
   3. In enterprise environments, human roles can also be included in the collaboration loop, such as "AI drafting – human review – AI revision – system execution."

This layer typically leverages existing frameworks such as LangChain, Semantic Kernel, and LlamaIndex, combined with custom Orchestration services, to unify dialogue, tools, workflows, permissions, and auditing within a single "Agent platform."

### 11.6.2 RAG, Knowledge Bases & Developer Platforms: "Connecting Enterprise Knowledge to the Model's Mind"

No matter how powerful a large model is, it cannot naturally master every enterprise's proprietary knowledge, let alone know the latest policies, products, and business rules in real time. RAG + knowledge bases + developer platforms are the key path to connecting this **enterprise knowledge, industry knowledge, and real-time data** to model capabilities in an engineered way.

1. **Document parsing and knowledge ingestion**
   1. Use components such as unstructured, Textract, pdfplumber, and Tika to parse PDFs, Office documents, web pages, and scanned images into structured text;
   2. "Chunk" by chapter, heading, and semantic block to provide appropriate granularity for subsequent vectorization and retrieval;
   3. For structured information such as tabular data, business databases, and API documentation, build corresponding schema mappings and access interfaces.
2. **Vectorization, indexing, and retrieval reranking**
   1. Use Embedding models to convert text / code / multimodal content into vectors, storing them in vector databases such as FAISS, Milvus, Qdrant, Weaviate, and Pinecone;
   2. Simultaneously retain keyword indexing and metadata filtering capabilities (such as filtering by tenant, department, document type), combining them into a high-precision "pre-retrieval filtering + semantic retrieval + reranking" pipeline;
   3. At query time, feed the retrieval results together with the original question into the large model, achieving "Retrieval-Augmented Generation (RAG)," and return citations and evidence chains.
3. **RAG application templates and low-code building**
   1. Provide pre-built RAG templates for common scenarios (knowledge Q&A, policy interpretation, product documentation, internal document assistants, etc.);
   2. Rapidly build dedicated knowledge assistants through a visual configuration interface (select knowledge source, set chunking rules, choose vector model and large model);
   3. Expose these capabilities to developers in SDK form, supporting rapid embedding in Web, mobile, desktop, or business system plugins.
4. **Developer platform and ecosystem integration**
   1. Provide SDKs in Python / JS / Java / Go and other languages, as well as frontend components (chat bubbles, document citation areas, feedback buttons, etc.), lowering the integration barrier;
   2. Provide plugins or middleware for mainstream business systems (CRM / ERP / OA / ticketing), enabling them to "check a few options" and connect to AI capabilities;
   3. Open up the application development platform to the outside, allowing ecosystem partners to build their own industry applications based on the base model, RAG, and Agent capabilities, forming a positive cycle of "platform–ecosystem–end customer."

This layer ultimately encapsulates complex model and infrastructure capabilities into "reusable, composable business components," helping enterprises — under the premise of **security, compliance, and cost control** — to truly turn large models into productivity tools that drive business innovation, with lower barriers and faster speed.
