我将严格参照 `llm-intro.md` 的结构（**引言 -> 基础单元 -> 核心机制 -> 架构演进 -> 训练目标 -> 总结**）来撰写这三个新章节，确保风格统一且深入浅出。

### 1. 创建 `docs/zh-cn/appendix/vlm-intro.md` (多模态大模型：给 AI 装上眼睛)

- **0. 引言**: 从“读万卷书”到“行万里路”。VLM 的核心任务：把图像信号翻译成大模型能懂的语言信号。

- **1. 第一步：视觉翻译 (Visual Tokenization)**:
  - **ViT (Vision Transformer)**: 计算机怎么“看”图？将图片切成 16x16 的小方块 (Patches)，就像把句子切成词 (Tokens)。
  - **Qwen-VL 的创新**: 提到 **Naive Dynamic Resolution**（动态分辨率），不强制压缩图片，而是根据图片比例动态切分 Patch，像人眼一样看清细节（分辨率自适应），解决了传统模型“看不清长图”的问题。

- **2. 核心难题：跨界沟通 (Projection)**:
  - 视觉向量 vs 语言向量。我们需要一个“适配器” (Projector)，把视觉特征映射到文本空间。
  - **架构对比**:
    - **Linear (LLaVA)**: 简单粗暴的线性投影，训练快，保留信息多。
    - **Q-Former (BLIP-2)**: 使用查询向量 (Query) 提取关键视觉信息，更轻量。
    - **C-Abstractor (Qwen-VL)**: 结合注意力机制，更高效地压缩视觉信息。

- **3. 进化之路：ViT + LLM**:
  - Vision Transformer (ViT) 负责“看”，LLM 负责“想”和“说”。
  - **M-LLM**: 像 GPT-4V 或 Qwen2-VL，已经不仅是“拼接”，而是深度的多模态融合，甚至能处理视频（视为连续的图片帧）。

- **4. 训练揭秘：从对齐到对话**:
  - **阶段一 (Pre-training)**: 像 CLIP 一样，在大规模图文对上预训练，学会“这张图是猫”。
  - **阶段二 (Instruction Tuning)**: 学会“看图说话”，使用 `<image>` 标签和对话数据，让模型能回答“这只猫在干什么？”。

- **5. 总结**: 视觉与语言的统一。

### 2. 创建 `docs/zh-cn/appendix/image-gen-intro.md` (AI 绘画：从噪声中重构世界)

- **0. 引言**: 生成式 AI 的魔法——从混沌 (Noise) 到秩序 (Data)。

- **1. 第一步：降维打击 (VAE & Latent Space)**:
  - 直接画像素太累了（1024x1024 有百万像素）。我们先用 **VAE (变分自编码器)** 把图片压缩成“潜变量” (Latent)，在小黑屋里作画（效率提升）。

- **2. 核心机制：扩散 (Diffusion)**:
  - **破坏 (Forward)**: 像滴入墨水一样，一步步把图片变成纯高斯噪声。
  - **重构 (Reverse)**: 训练神经网络预测噪声 $\epsilon$，一步步把墨水“吸”出来。
  - **SDE 视角**: 理解为在概率分布上进行随机游走。

- **3. 进化之路：流匹配 (Flow Matching)**:
  - **为什么 Diffusion 慢？**: 它的去噪路径是弯弯曲曲的随机路径。
  - **Flow Matching (Flux/SD3)**: 寻找从噪声分布到图像分布的 **“直线”路径 (Optimal Transport)**。
  - **向量场 (Vector Field)**: 训练模型预测“速度”而非“噪声”，采样时直接沿着直线飞奔，几步就能画出好图。

- **4. 操控：文本如何指挥绘画**:
  - **CLIP / T5 Encoder**: 充当“甲方”，把 Prompt 变成向量。
  - **DiT (Diffusion Transformer)**: 像 Sora 和 SD3 一样，用 Transformer 替换掉老的 U-Net，处理能力更强，画质上限更高。

- **5. 总结**: 概率分布的搬运工。

### 3. 创建 `docs/zh-cn/appendix/audio-intro.md` (AI 音频：声音的数字化身)

- **0. 引言**: 听与说的艺术。声音本质上是空气的振动，计算机如何处理？

- **1. 第一步：声音的“文字” (Audio Tokenization)**:
  - 声音是连续的波形，语言是离散的 Token。
  - **Neural Codec (VQ-VAE / EnCodec)**: 把连续波形切碎，通过 **量化 (Quantization)** 变成一个个数字 Token (Codebook)。
  - **RVQ (Residual VQ)**: 像洋葱一样一层层剥开声音细节，保证高保真音质。

- **2. 核心表示：梅尔频谱 (Mel-Spectrogram)**:
  - 把“听觉问题”转化成“视觉问题”。在频域上处理声音往往比时域更高效。

- **3. 架构演进：从 GPT 到 Flow**:
  - **AudioLM / VALL-E**: 把声音 Token 当作文字，用 GPT **自回归 (Autoregressive)** 地狂猜下一个音。优点是能学到很好的韵律，缺点是容易“胡言乱语”或无限循环。
  - **F5-TTS / CosyVoice**: 使用 **Flow Matching** 直接生成频谱。不需要复杂的 Token 预测，而是从噪声中“流”出声音频谱，速度更快，控制更稳，支持零样本克隆。

- **4. 总结**: 统一多模态的未来。

### 4. 更新配置

- 修改 `docs/.vitepress/config.mjs`，在 `zh-cn` 侧边栏添加这三个章节。
