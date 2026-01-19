# 1.3 给原型加上 AI 能力


# 什么是 API 

# 如何接入文本 API


# 3. **使用 API：调用 LLM 和图像生成器**

## 3.1 什么是 API

首先，**你需要知道什么是 API** `Extra Knowledge 2 - What is API`

我们将尝试集成两个 API：一个是调用 DeepSeek LLM，另一个是调用 Seedream (即梦) 模型。这两个模型都很棒，性能出色。

在使用 API 的过程中，只有两个最重要的元素：

1. API key (密钥)
2. 官方文档示例

只要你能找到这两个，你就可以让 LLM 帮你修改并实现所有类型的 API 调用。

## 3.2 将 DeepSeek API 集成到 z.ai 中

### 什么是 DeepSeek

![](images/image16.png)

> 📚 信息引用自 [DeepSeek Wiki](https://en.wikipedia.org/wiki/DeepSeek)
>
> **杭州深度求索人工智能基础技术研究有限公司**（**Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd.**），以 **DeepSeek** 为商号，是一家开发大语言模型（LLMs）的中国人工智能（AI）公司。DeepSeek 总部位于浙江杭州，由中国对冲基金幻方量化（High-Flyer）拥有并资助。DeepSeek 由幻方量化的联合创始人梁文锋于 2023 年 7 月创立，他也同时担任这两家公司的 CEO。该公司于 2025 年 1 月推出了同名聊天机器人及其 DeepSeek-R1 模型。
>
> 让我们看看 DeepSeek 在 GPQA 基准排名中与其他顶级模型的表现对比。值得注意的是，DeepSeek 是一个开源（每个人都可以从互联网下载模型）模型，而其他常见模型如 Grok、Google Gemini 和 ChatGPT 都是闭源的。正如我们所见，DeepSeek 已经很大程度上接近了第一梯队的模型。
>
> ![](images/image17.png)
>
> GPQA 是“研究生级 Google-Proof 问答基准”的缩写，这是一个用于科学问答任务的研究生级基准。以下是详细介绍。
>
> GPQA 包含 448 个多项选择题，涵盖生物学、物理学和化学的子领域，如量子力学、有机化学、分子生物学等。这些问题由 61 位持有博士学位或正在攻读博士学位的专家编写，并经过了严格的验证过程。

### 如何获取 deepseek API

我们将尝试根据我们已有的信息，让 z.ai 直接将 DeepSeek API 集成到项目中。

首先，我们需要在 DeepSeek 开放平台注册一个账户。

https://platform.deepseek.com/sign_up

然后，你会看到像这样的网页界面：

![](images/image18.png)

要使用 API，我们需要先充值 token。10 元人民币足够使用一段时间了！

![](images/image19.png)

点击“API KEYS”并在屏幕下方找到“create new API key”。你最终会得到一个像 `sk-8573341c39fc44315aadc071c53rh7d2` 这样的 API key。

![](images/image20.png)

一旦你获得了密钥，你就拥有了调用模型的权限。

此时，你可以直接阅读 [API 文档](https://api-docs.deepseek.com/)，它通常提供 curl 或 Python 的调用示例。

![](images/image21.png)

找到示例后，你可以将文档中与密钥相关的所有内容复制到 z.ai，并要求它尝试帮你集成 LLM。

![](images/image22.png)

![](images/image23.png)

自动集成可以在很短的时间内完成。我们可以询问它的操作员确认 DeepSeek API 是否已经在使用中。

![](images/image24.png)

或者，我们可以要求 z.ai 帮我们定位项目中调用 LLM 的部分。

然后我们可以独立确认是否正在使用 DeepSeek。具体来说，我们可以直接请求：`"告诉我项目中所有需要调用 LLM 的代码位置，我需要检查是否是 DeepSeek。"`，z.ai 将返回所有 API 调用的详细地址。

![](images/image25.png)

接下来，我们将简要介绍目前可用的三种最先进的图像生成模型。你可以根据自己的喜好选择一种集成到 z.ai 中。

# 如何接入图像 API

如果说大语言模型专注于理解、推理和分析我们不知道的所有事物；那么图像和视频模型则专注于生成——将你脑海中的所有想法转化为视觉现实。在今年的 AI 生成领域（2025），图像编辑和视频生成非常流行。你一定在抖音或 YouTube 上看过 AI 生成的可爱动物视频、AI 创建的角色照片、AI 生成的肖像拍摄、切玻璃苹果的视频等等。在上完今天的图像和视频课程后，你也完全有能力创建同样的内容！

在今天的课程中，我们需要生成大量的图像和视频。为了方便起见，我们将使用统一连接的云服务提供商，并将提供相应的代码和 Token。在上一节课中，大家已经学习了如何集成 API 和使用 Token。你只需要按照以下步骤操作，回忆上节课学到的内容，就可以在 Z.AI 中成功启动你自己的图像/视频应用程序。

![](images/image20.png)![](images/image21.png)![](images/image22.png)



## 3.3 将 SiliconFlow QwenImage API 集成到 z.ai 中

### 什么是 SiliconFlow

> [Silicon Flow (硅基流动)](https://cloud.siliconflow.com/me/models) 成立于 2023 年 8 月，是一家世界领先的 AI 能力提供商。它提供 SiliconCloud（具有自研推理加速的大模型云平台）和 BizyAir（用于 AI 图像生成的 ComfyUI 插件）等核心产品，为客户提供 AI 基础设施能力，拥有战略合作伙伴关系，并持有顶级行业认证。
>
> ![](images/image26.png)

### 什么是 QwenImage

> Qwen-Image 是一个强大的图像生成基础模型，能够进行复杂的文本渲染和精确的图像编辑。这是一个 20B MMDiT 图像基础模型，在复杂的文本渲染和精确的图像编辑方面取得了重大进展。实验表明，它在图像生成和编辑方面都具有很强的通用能力，在文本渲染方面表现尤为出色，尤其是中文。
>
> 从中文到英文，QwenImage 可以像 GPT-4o 或 Seedream 模型一样生成高质量的文本。
>
> ![](images/image27.png)
>
> ![](images/image28.png)
>
> ![](images/image29.png)
>
> ![](images/image30.png)

### 如何获取 SiliconFlow QwenImage API

https://cloud.siliconflow.com/me/models

查看 SiliconFlow 的官网。左侧有一个“Playground”部分，你可以在不进行 API 调用的情况下试用不同的模型。在网页顶部有一个“Filters”按钮；点击它可以筛选右侧的模型列表。

如果你选择“Image”，你将只看到当前支持的所有文生图模型。在这种情况下，我们将使用 Qwen/Qwen-Image。

![](images/image31.png)

要调用 API，首先我们需要点击左侧设置中的“API Keys”，然后点击“Create API Key”按钮生成一个 API key。记得保存这个 API key。

![](images/image32.png)

要查看可用余额，我们需要打开左侧设置中的“Payments”。在这里，你可以看到 1 美元的赠金。但是，如果你想使用 FLUX 文生图模型，你需要先充值账户。

https://cloud.siliconflow.com/me/account/ak

![](images/image33.png)

一切设置好后，我们需要参考相应的图像生成 API 文档。你可以在官方文档页面找到任何标记为“API Reference”的部分。点击它，然后导航到图像生成的 API 端点部分并找到相关的请求示例。

https://docs.siliconflow.com/en/userguide/introduction

![](images/image34.png)

```Bash
curl --request POST \
  --url https://api.siliconflow.com/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "black-forest-labs/FLUX.1-Kontext-max",
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
}'
```

记得将你打算使用的模型和 API key 填入相应的字段。之后，你可以在计算机的命令行中使用该命令运行直接请求测试。

```Bash
curl --request POST \
  --url https://api.siliconflow.com/v1/images/generations \
  --header 'Authorization: Bearer sk-defrgqrgrganpncxxibfyzfocgafga' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "Qwen/Qwen-Image",
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
}'
```

![](images/image35.png)

你可以将下面修改后的代码行发送给 z.ai，并要求它帮你创建一个前端测试演示。很快，你就能实现 SiliconFlow 的基本 API 调用。

![](images/image36.png)

## 3.4 将 Recraft API 集成到 z.ai 中

### 什么是 Recraft

> Recraft 是一款面向设计师、插画师和营销人员的 AI 工具——于 2022 年在美国成立，总部位于伦敦。它帮助生成/迭代视觉效果（图像、矢量艺术、3D 图形），具有高质量输出（任何文本大小/长度）、精确元素定位和品牌一致性设计等优势。受到 200 个国家/地区 300 多万用户（包括奥美、Netflix）的信任，并已创建了 3.5 亿多张图像，其团队旨在使其成为必备的设计师工具，确保创作者能够控制他们的 AI 辅助工作流程。
>
> ![](images/image37.png)
>
> ![](images/image38.png)
>
> ![](images/image39.png)

### 如何获取 Recraft API

首先，我们仍然需要找到重要的 API 入口以获取我们的 API key。 https://www.recraft.ai/profile/api

由于这里没有提供免费额度，我们需要自己充值 1,000 积分。这个网站支持支付宝和微信支付，所以很容易获得 1,000 积分（注意：不要充值超过必要的金额）。

![](images/image40.png)

之后，我们仍然遵循通常的方法：去官方文档找到相应的请求示例。

https://www.recraft.ai/docs/api-reference/getting-started

https://www.recraft.ai/docs/api-reference/usage

https://www.recraft.ai/docs/api-reference/guides

在这里，我们可以直接复制整个内容并粘贴到 z.ai。

![](images/image41.png)

注意，在聊天窗口中，输入你的 API key 和文档内容就足够了；z.ai 会自动为你构建前端。

如果过程中出现错误，你可以直接将错误信息粘贴到聊天窗口，让 z.ai 帮你自动解决。

![](images/image42.png)

## 3.5 将 Seedream API 集成到 z.ai 中（针对中国用户）

### 什么是 Seedream 4.0

https://seed.bytedance.com/en/seedream4_0

![](images/image43.png)

> 也许你已经知道 Nano Banana（Google 开发），但你最好不要错过 Seedream。Seedream 4.0 是字节跳动打造的新一代图像创作模型。它将图像生成和图像编辑能力集成到一个统一的架构中。这使得它能够灵活处理复杂的多模态任务，如基于知识的生成、复杂推理和参考一致性。此外，它的推理速度比前代产品快得多，并且可以生成分辨率高达 4K 的令人惊叹的高清图像。
>
> ![](images/image44.png)
>
> ![](images/image45.png)
>
> ![](images/image46.png)

### 如何获取 Seedream API - 火山引擎 (Volcengine)（针对中国用户）

我们将逐步演示如何将 Seedream API 集成到 z.ai 示例中。

https://www.volcengine.com/experience/ark?launch=seedream

访问页面后，点击登录。

![](images/image47.png)

登录后，找到页面右上角的充值选项。

![](images/image48.png)

进行充值需要实名认证。

![](images/image49.png)

认证成功后，你可以充值 1 元用于测试。

https://console.volcengine.com/finance/fund/recharge

![](images/image50.png)

返回初始界面并点击 API 访问。

![](images/image51.png)

首先，创建一个 API key，然后点击选择选项。

![](images/image52.png)

这将带你进入第 2 步。在这里，你需要确认调用的服务是 Seedream 4.0，并复制提供的调用示例。

![](images/image53.png)

准备好 API key 和调用示例后，你可以直接将它们粘贴到 z.ai 中以生成前端交互演示。

重要提示：这里的默认示例相对复杂。记得禁用“添加水印”选项和“流式响应”选项，以确保不生成水印且不会发生请求失败。

![](images/image54.png)

输入提示词后，你将收到生成的结果。享受它吧！

![](images/image55.png)

# 附录：如何找到最好的 AI 模型

大语言模型（LLM）的发展速度非常快，我们总是需要确保我们使用的是排名靠前的模型之一。通过以下两个网站，我们可以轻松确定哪些文本、视频和图像大模型目前最强大。一般来说，我们将此类网站称为 **“LLM 竞技场”** —— 我们可以并排比较两个模型的输出。你需要选择你更喜欢的响应，这种选择算作一票。获得更多选票的模型被认为具有更好的性能。

此外，你偶尔可能会在这些大模型竞技场中看到神秘的匿名模型。通常，这些是来自 OpenAI 或 Google 等公司的内部测试模型。你可能有机会意外体验到最先进模型的能力！

### LMArena

网站：https://lmarena.ai/

简介：LMArena 最初由加州大学伯克利分校大模型系统组织（LMSYS）作为一个学术副项目推出，现已发展成为一家公司。它是一个开源的众包 AI 基准测试平台。

它改变了传统的基于学科测试评估 AI 技术的方式，将评估权移交给社区用户。通过匿名和众包配对比较，它评估大规模模型。该平台支持超过 68 个模型，如 GPT-4o 和 Claude 3.5。

它使用 Elo 评分系统，可以更真实地反映用户对模型回答质量的评价。根据用户投票数据，它编制了一个排行榜，涵盖七个类别，包括文本/语言能力、Web 开发和视觉/图像理解。

截至 2025 年 4 月，它已记录了超过 300 万次比较，并评估了 400 多个模型，成为比较和评估 AI 模型性能的流行方法。

![](images/image.png)

### Artificial Analysis

网站：[https://artificialanalysis.ai](https://artificialanalysis.ai/)

Artificial Analysis 是领先的独立 AI 基准测试和分析平台。它专注于对 AI 模型和 API 提供商进行独立分析。该网站提供详细的数据和图表，可以帮助开发者、用户、研究人员和其他用户做出明智的选择。

通过比较不同 AI 模型的质量、性能、价格和其他关键指标，它帮助用户找到最适合其需求的 AI 模型解决方案。

其功能包括模型比较、质量评估、价格分析、性能测试和上下文窗口分析。它还提供了详细的用户指南和常见问题解答，涵盖各种类型模型的评估，如大语言模型、文本到图像模型和语音到文本模型。此外，它还提供了一个专注于模型基准的免费 API 和一个具有更全面数据的商业 API。

![](images/index-2026-01-19-23-36-57.png)