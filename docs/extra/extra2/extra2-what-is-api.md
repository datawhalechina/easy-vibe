# 扩展知识 2 - 什么是 API

在本教程中，我们将学习什么是 API，它是如何工作的，并了解它是如何驱动我们每天使用的数字体验的。

# 你将学到

* 使用简单、真实的类比来理解什么是 API。
* API 请求和响应循环的基本步骤。
* 如何识别你日常使用的应用中的 API，如天气、地图和社交媒体。
* 为什么 API 对于现代技术的创新、安全和效率至关重要。

# **什么是 API？ - 自动售货机类比**

想象一下你想从自动售货机买一罐汽水。

1. **你不需要知道它内部是如何工作的：** 你不关心冷却系统、机械臂，或者它是如何验证你的钱的。对你来说，它是一个“黑盒子”。
2. **它有清晰的操作按钮：** 机器上有一排排按钮，每个按钮都清楚地标明了它提供的饮料。这是你与它交流的唯一方式。你必须按下“汽水”按钮。
3. **简单的“请求”和“响应”：**
   1. 你投入硬币并按下“汽水”按钮。这是你的 **“请求”**。
   2. 机器发出嗡嗡声，一罐汽水掉了下来供你拿取。这是它的 **“响应”**。

在这个例子中：

* 你是你的程序（比如一个移动应用）。
* 自动售货机是另一个程序或服务（比如天气服务或地图服务）。
* 机器上的按钮就是 API。

API，全称 Application Programming Interface（应用程序编程接口），就是那组“按钮”。它是不同软件组件之间进行通信的一种预定义的、直接的方式，允许一个程序轻松地从另一个程序获取它需要的东西（数据或功能），而无需了解其内部的复杂性。

API 连接了各种软件系统，为开发者和用户带来了巨大的好处。

* **创新：** 公共 API 允许任何开发者使用强大的功能（如支付处理或地图）来创建新的数字体验，而无需从头开始构建它们。
* **自动化：** API 可以自动化重复性工作，如发送电子邮件或在系统之间共享数据，提高生产力，让人类可以专注于更有创造性的任务。
* **安全性：** API 充当安全的守门人。它们可以要求对任何请求进行身份验证，增加一层保护，防止未经授权访问敏感数据。
* **成本效率：** 企业可以使用第三方 API 来访问有用的工具和基础设施，帮助他们避免构建复杂内部系统的巨额费用。

API 是现代数字世界的基石。通过理解请求和响应这个简单的概念，你已经迈出了进入更广阔、互联的软件开发世界的第一步。

# API 是如何工作的？

API 通过 **请求和响应** 循环在应用程序之间共享数据。让我们把它想象成在餐厅点餐。

在这个比喻中，你是 **API 客户端**（发出请求的应用程序），服务员是 **API**，厨房是 **API 服务器**（拥有数据或功能的系统）。

## **API 请求（你的订单）**

客户端通过向服务器发送请求来开始对话。这就像告诉服务员你想要什么。一个典型的 API 请求包括：

* **Endpoint（端点）：** 指向资源的特定 URL。这就像菜单上的特定项目。对于天气应用，端点可能是 `/current-weather`。
* **Method（方法）：** 你想执行的操作。最常见的是 `GET`，意味着你想获取数据。其他的包括 `POST`（创建新数据）、`PUT`（更新数据）和 `DELETE`（删除数据）。
* **Parameters（参数）：** 指定请求的额外细节。如果你询问天气，你需要提供位置。例如：`city=London`。
* **Request Body（请求体）：** 创建或更新资源所需的实际数据。如果你要向社交媒体应用发布新照片，照片本身就在请求体中。

## **API 响应（你的食物到了）**

在厨房（服务器）准备好你的订单后，服务员（API）将其带回给你。响应包括：

* **Status Code（状态码）：** 一个三位数的代码，指示结果。`200 OK` 表示请求成功。`404 Not Found` 表示找不到请求的资源。
* **Response Body（响应体）：** 你请求的实际数据或内容。对于天气请求，这将是包含温度、状况和湿度的结构化数据。

# 现实世界的例子：我们周围的 API

API 无处不在，在后台默默工作。让我们看几个常见的“自动售货机”。

### **天气预报 API**

这个 API 就像一个只卖天气信息的自动售货机。

* **它提供什么：** 当前天气、未来几天的预报、空气质量等。
* **一个简单的‘请求’示例：**
  * **Endpoint:** `/current-weather`
  * **Parameters:** `city=London` & `apiKey=your_access_key`（证明你有权限）

‘响应’（它返回的数据）：

```JSON
{
  "city": "London",
  "temperature": "15°C",
  "condition": "Cloudy",
  "humidity": "70%"
}
```

* 你的天气应用获取这些数据并以用户友好的格式显示。

### **地图服务 API（如 Google Maps）**

这个自动售货机专门提供地理信息。

* **它提供什么：** 行车路线、从地址查找坐标、搜索附近地点。
* **一个简单的‘请求’示例：**
  * **Endpoint:** `/directions`
  * **Parameters:** `origin=Eiffel Tower` & `destination=Louvre Museum` & `mode=driving`

```JSON
{
  "total_distance": "4.5 kilometers",
  "estimated_time": "15 minutes",
  "route_steps": [
    "1. Head east on Champ de Mars...",
    "2. Turn left onto Quai Branly...",
    "..."
  ]
}
```

* 拼车或送货应用使用这些数据在地图上绘制路线并提供逐向导航指令。

### **社交媒体登录 API（如“使用 Google 登录”）**

这是一个特殊的自动售货机，不卖产品；它帮助“验证你的身份”。

* **它提供什么：**

确认用户身份并安全地向另一个应用提供基本信息（如姓名和头像）。

* **它是如何工作的：**
  * 你在新的购物应用上点击“使用 Google 登录”。
  * 购物应用向 Google 的 API 发出请求：“嘿，有个用户想登录。你能确认他是谁吗？”
  * Google 请求你的批准。
  * 一旦你批准，Google 的 API 向购物应用发送响应：“身份已确认。用户是‘John Doe’。”
    这样，购物应用就知道你是谁，而无需看到你的密码，既方便又安全。

### **大语言模型 API（如 OpenAI 或 DeepSeek）**

这是一个 **“超级大脑”自动售货机**。你给它一个纯文本的命令或问题，它给你一个详细的、类似人类的文本回复。

* **它提供什么：** 为几乎任何任务生成原创文本，如回答问题、写邮件、总结文章或创建计算机代码。
* **它是如何工作的：**
  * 想象你正在使用一个新的“AI 写作助手”应用程序。你输入一个命令：“给我的团队写一封简短、专业的邮件，关于新项目的截止日期。”
  * 写作应用向 OpenAI 的 API 发出请求：“嘿，有个用户想写封邮件。你能生成关于新项目截止日期的专业信息的文本吗？”
  * OpenAI API 处理此命令，理解上下文和语气，并生成文本。
  * API 向写作应用发送响应：“请求完成。这是邮件文本：‘Hi Team, This is a quick update to let you know that the deadline for Project X has been moved to this Friday...’”

通过这种方式，写作应用可以即时为用户提供强大的 AI 功能，而无需从头开始构建自己的大型语言模型。

# 在 Z.ai 上查看 LLM API

接下来，我们将学习调用大语言模型 API 的基本方法。我们可以简单参考之前贪吃蛇游戏的 API 使用示例。

我们不需要自己搜索。我们需要做的就是向语言模型提出后续问题，例如：“在代码中，哪几行调用了语言模型和图像生成模型？”，“如果用 Python 代码写会是什么样？”通过问这些问题，你将能直接得到完整的答案。

![](images/image1.png)

这些 API 是使用官方智谱 SDK（SDK 代表 **软件开发工具包**）调用的。接下来，让我们看看如何调用 OpenAI 的官方 API。

你稍后可能会遇到很多名词。不需要一下子掌握所有名词——**你只需要在这里大致了解它们的样子**。

### Python API

要在 Python 中调用 OpenAI 的文本生成 API，可以使用官方的 openai 库。

**`base_url`** 参数指定 API 的端点。默认情况下，它指向 OpenAI 的服务器（例如 `https://api.openai.com/v1/`）。如果你使用代理、自托管服务器或兼容的提供商，你可能需要将此参数更改为相应的地址。

```Python
import openai

openai.api_key = "YOUR_OPENAI_API_KEY"
# 如果你使用自定义 base URL（例如 Azure、代理或其他提供商）
# openai.base_url = "<https://your-custom-base-url/v1/>"

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello, how can I use the OpenAI API?"}
    ]
)

print(response.choices[0].message["content"])
```

**注意：**

* `openai.api_key` 是你的秘密 API 密钥。
* `openai.base_url` 是可选的，仅当你未使默认 OpenAI 端点时才需要。
* `model` 参数指定你想使用的语言模型。

许多其他流行的大语言模型都兼容 OpenAI API 调用格式。例如，如果你需要使用 [DeepSeek](https://platform.deepseek.com/sign_in)（中国最好的大语言模型之一），你可以通过更改 API 端点和模型名称以非常相似的方式进行操作。

以下是典型示例：

```JavaScript
import openai

openai.api_key = "YOUR_DEEPSEEK_API_KEY"
openai.base_url = "<https://api.deepseek.com/v1/>"  # DeepSeek 的端点

response = openai.ChatCompletion.create(
    model="deepseek-chat",  # 更改为 DeepSeek 的模型名称
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me about DeepSeek."}
    ]
)

print(response.choices[0].message["content"])
```

### 前端 API

如果你想从 React 前端调用 OpenAI API，绝不应该直接在浏览器中暴露你的 API 密钥。

相反，使用 **后端代理**（例如 Express.js），或从服务器函数安全地调用 API。

```JavaScript
// 安装命令：npm install express axios dotenv
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "<https://api.openai.com/v1/chat/completions>",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});`
```

要测试这个 Node.js 程序，首先使用 npm install express axios dotenv 安装所需的包，并将你的 OpenAI API 密钥保存在 .env 文件中，格式为 `OPENAI_API_KEY=your_key_here`。然后，使用 node server.js 运行服务器。一旦运行起来，你可以通过使用工具如 curl 或 Postman 发送带有 JSON 体（如 `{"message": "Hello"}`）的 POST 请求到 [http://localhost:3001/api/chat](http://localhost:3001/api/chat) 来测试 /api/chat 端点，你应该会收到来自 OpenAI API 的回复。

```JavaScript
curl -X POST <http://localhost:3001/api/chat> \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Hello, who are you?"}'
```

# 参考资料

* https://www.postman.com/what-is-an-api/
