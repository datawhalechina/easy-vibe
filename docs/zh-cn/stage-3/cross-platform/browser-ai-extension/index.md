# 如何开发浏览器 AI 助手插件

目标是做一个 Chrome 扩展：打开制度、帮助中心或项目文档时，点击一次就能在侧边栏看到标题、关键规则、风险和下一步动作。

企业常把这类扩展做成客服坐席助手、内部知识检索、销售情报侧栏、合规提醒和流程录制工具。浏览器扩展离员工正在处理的网页最近，适合提供“看完当前页面，马上给出下一步”的能力。

开发从不联网的本地版本开始，确认扩展结构与页面读取都正常后，再按需要接 Chrome 内置 AI 或企业后端。

![Enterprise Knowledge Copilot 在侧边栏整理客户支持文档](images/extension-enterprise-preview.png)

## 真正的浏览器助手长什么样

浏览器助手不是把一个聊天框缩小以后塞到右边。它真正有用的地方，是离用户正在处理的网页足够近：读者不需要复制网址、切换窗口，再向另一个工具解释“我刚才在看什么”。

不同产品选择的入口不一样。有的理解当前页面，有的直接出现在输入框旁边，还有的连接公司的文档、聊天记录和人员目录。下面三个真实产品，分别展示了侧边栏、输入框提示和浏览器内置助手的做法。

### Glean：一边看网页，一边查公司的资料

Glean 做的是企业知识助手。员工打开制度、项目文档或客户页面时，可以在浏览器侧栏继续提问。回答不只参考当前网页，也会查公司已经接入的文档、对话和人员信息。

![Glean 在浏览器侧栏结合当前页面和企业知识回答问题](images/browser-real-glean.webp)

它的[官方产品页](https://www.glean.com/platform/browser-extension)展示了四个主要入口：发现相关内容、对当前页面提问、搜索公司资料和生成内容。搜索结果仍然遵守原系统的权限，不是装上扩展以后就能看到全公司的文件。

这和后面要做的知识助手最接近。真正落到企业里时，侧边栏只是入口；后面还要有员工身份、文档权限、搜索服务和日志审计。扩展不能自己决定用户有权看到什么。

### Grammarly：建议直接出现在正在写的句子旁边

Grammarly 没有要求用户每写一句话都打开聊天窗口。它先在 Gmail、在线文档等输入区域旁边工作：发现问题时画出下划线，用户停在文字上方时再显示修改建议。

![Grammarly 在网页输入框里给出局部修改建议](images/browser-real-grammarly.png)

从这张 [Grammarly 官方帮助页](https://support.grammarly.com/hc/en-us/articles/115000091592-Grammarly-s-browser-extension-user-guide)的真实截图可以看出，建议卡片很小，用户可以接受，也可以忽略。需要生成或重写时，再主动打开生成式 AI。

这个设计很值得借鉴：简单问题就在原位置解决，复杂任务才进入侧边栏。浏览器扩展不是越显眼越好，平时安静、需要时马上出现，反而更像一个成熟工具。

### Copilot in Edge：浏览器本身也在做“理解当前页面”

Microsoft 把 Copilot 放进了 Edge 侧边栏。用户可以让它总结网页、视频或 PDF，也可以根据打开的标签页比较信息。它和普通聊天网页的区别，就是浏览器可以在用户允许时提供当前页面标题、页面内容和标签页上下文。

Microsoft 的[使用说明](https://support.microsoft.com/en-us/microsoft-copilot/getting-started-with-copilot-in-microsoft-edge)还专门提供了关闭页面上下文的设置；企业账号则有对应的[数据保护和管理说明](https://learn.microsoft.com/en-us/copilot/edge)。这说明“能读当前页面”只是第一步，用户是否知情、管理员能否管理、哪些页面不能读，同样属于产品功能。

Glean 选择侧边栏，Grammarly 把建议放在句子旁边，Edge 则直接利用浏览器掌握的页面上下文。入口不同，但它们都只在用户需要时出现，也都要把读取页面和使用权限说清楚。

第一版只验证一条最短流程：点击按钮，读取当前公开页面，再把本地摘要放进侧边栏。这条流程稳定以后，再接浏览器内置 AI 或企业后端。

## 1. 先看懂扩展的结构

这个扩展只有三个核心部分：

- Content Script 读取当前页面可见文字；
- Service Worker 负责接收事件和组织处理流程；
- Side Panel 展示按钮、加载状态和摘要结果。

![Content Script、Service Worker 和 Side Panel 的消息流](images/image2.webp)

Service Worker 会在需要时启动，空闲后可能被浏览器回收，所以不能把必须保留的状态只放在内存里。

## 2. 创建第一版

新建空文件夹 `enterprise-knowledge-copilot`，用 Trae 或 Cursor 打开，然后说：

> 请创建一个 Chrome Manifest V3 扩展。点击图标后打开侧边栏，里面先放一个“读取当前页面”按钮。

AI 完成后，项目里至少应有 manifest、service worker、content script 和 side panel 页面。不要手工复制一整套陌生代码，先让它解释每个文件负责什么。

## 3. 加载到 Chrome

在地址栏打开 `chrome://extensions`，打开右上角“开发者模式”，点击“加载已解压的扩展程序”，选择刚才的项目文件夹。

![在 Chrome 扩展管理页加载未打包扩展](images/image3.png)

成功时，卡片上能看到扩展名称和版本，没有红色错误。把扩展固定到工具栏，点击图标，确认右侧能打开空白侧边栏。

如果加载失败，把卡片上的第一条错误交给 AI：

> Chrome 加载扩展失败，错误是【粘贴错误】。请只修复这一项，并告诉我重新加载的位置。

## 4. 读取当前页面

现在只做页面读取：

> 请让“读取当前页面”按钮取得当前标签页的标题、网址和正文可见文字，并显示在侧边栏。不要读取密码框、表单输入和隐藏内容。

修改完成后，在扩展管理页点击该扩展的“重新加载”，再打开一篇普通文章测试。

成功标准：

- 标题与当前网页一致；
- 正文不是整页 HTML；
- 切换标签页以后读取的是新页面；
- `chrome://` 页面或无权限页面会显示清楚的提示。

## 5. 做一个不联网的摘要

第一版不接模型。用固定规则提取页面标题、前几段和列表项，这样任何电脑都能验证消息链路。

> 请把读取结果整理成“页面主题、关键要点、数字与时间、下一步”四部分。先使用本地规则，不调用网络 API。

![侧边栏的按钮、加载状态和摘要结果](images/image5.png)

摘要不需要像模型一样聪明，但必须稳定。找一篇有标题、列表和日期的页面，确认每个区域都有内容；再打开空白页，确认不会一直显示加载中。

## 6. 加上复制和错误状态

> 请增加复制摘要按钮，并补齐加载中、空内容和失败三种状态。重复点击时只处理最后一次请求。

验证时连续点击两次，侧边栏不能出现两份结果。故意在 `chrome://extensions` 页面点击读取，应该显示“当前页面不能读取”，而不是控制台异常。

## 7. 选择真正的 AI 方式

本地规则跑通以后，再从下面两条里选一条。

### 7.1 Chrome 内置 Summarizer

Chrome 的 Summarizer API 需要先做功能检测，模型也可能处于待下载状态。不要只根据版本号假定它一定可用。

> 请增加 Chrome Summarizer 模式。先检测是否支持并显示模型下载进度；不可用或语言不支持时自动回到本地摘要。

Chrome 官方目前要求由用户操作触发模型创建。首次下载需要网络，下载完成后的处理在本机进行。不同语言的支持范围会变化，实际结果以运行时检测为准。

### 7.2 企业后端

团队共用时，不要把共享密钥放进扩展或 `chrome.storage.local`。让扩展把经过限制和脱敏的正文发给企业后端，由后端完成身份、配额和模型调用。

> 请增加企业后端模式。扩展只发送当前页面标题和用户确认过的正文；密钥留在服务端，失败时保留本地摘要。

如果只是个人本机实验，也可以允许用户填写自己的密钥，但设置页必须明确说明风险，不能把它当成组织部署方案。

![设置页选择摘要方式](images/image6-1.png)

![设置页填写个人测试配置](images/image6-2.png)

![设置页保存配置后的状态](images/image6-3.png)

## 8. 检查权限

回到 manifest，确认只申请当前功能需要的权限。能用 `activeTab` 完成的事情，不要直接申请读取所有网站。

> 请检查 manifest 权限，只保留当前功能需要的项目，并解释每一项为什么存在。

发布前至少检查：

- 没有把密钥写进源码或安装包；
- 不读取密码框、表单输入和隐藏内容；
- 用户点击后才读取页面；
- 日志不记录完整网页正文；
- 企业模式经过登录和文档权限校验。

## 9. 调试三个位置

浏览器扩展有三个不同的调试位置：

1. 侧边栏界面：在侧边栏中打开开发者工具。
2. Service Worker：在扩展管理页点击“Service Worker”。
3. Content Script：在当前网页的开发者工具里查看。

![在 Chrome DevTools 中选择扩展执行上下文](images/image9.webp)

报错时先确认错误来自哪一层，再交给 AI：

> 点击摘要后没有结果。侧边栏错误是【内容】，Service Worker 错误是【内容】。请只修复消息没有返回的问题。

## 10. 完整验收

按下面顺序操作一次：

1. 在扩展管理页重新加载项目。
2. 打开一篇有标题、列表和日期的文章。
3. 打开侧边栏并生成本地摘要。
4. 复制结果，确认格式完整。
5. 切换到另一篇文章，再生成一次。
6. 打开无权限页面，确认错误提示清楚。
7. 重启浏览器，确认非敏感设置仍在。

一项失败时，不要让 AI 重写项目：

> 验收第【几】步失败，现象是【描述】。请只修复这一项，不改已经通过的功能。

## 11. 打包和发布

本地使用时，在项目文件夹外复制一份干净版本，删除日志、测试数据和本地配置，再压缩为 ZIP。

发布到 Chrome Web Store 前，准备图标、说明、隐私政策、权限用途和真实截图。商店规则会更新，提交时以 Chrome Web Store 后台的当前要求为准。

![Chrome Web Store 后台填写扩展资料](images/image10.png)

![Chrome Web Store 后台上传截图和发布资料](images/image10-1.png)

发布前再做一次隐私检查：

> 请检查当前扩展是否上传网页内容、保存密钥或申请了多余权限。只列风险和必须修改项。

## 12. 把它留在浏览器里用一会儿

扩展能加载还不算结束。把开发者工具关掉，像普通用户一样连续打开几篇不同的网页：有长文章，也有几乎没有正文的页面，再试一个浏览器不允许读取的地址。侧边栏应该知道什么时候显示摘要，什么时候老实说明“这里读不到”，而不是一直转圈。

最后断开网络再生成一次本地摘要，然后重启浏览器。如果设置还在、结果没有串到上一页，ZIP 里也没有密钥、日志和测试数据，这个版本就可以交给别人试用了。以后接企业知识库时，仍然保留这条本地退路，并让后端负责身份和权限，不要让一个浏览器扩展变成读取所有网页的黑盒。

## 参考资料

- [Glean Browser Extension](https://www.glean.com/platform/browser-extension)
- [Grammarly 浏览器扩展使用说明](https://support.grammarly.com/hc/en-us/articles/115000091592-Grammarly-s-browser-extension-user-guide)
- [Microsoft：在 Edge 中使用 Copilot](https://support.microsoft.com/en-us/microsoft-copilot/getting-started-with-copilot-in-microsoft-edge)
- [Microsoft 365 Copilot Chat in Edge](https://learn.microsoft.com/en-us/copilot/edge)
- [Chrome Extensions 文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Service Worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers)
- [Chrome Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
- [Chrome Web Store 发布文档](https://developer.chrome.com/docs/webstore/publish/)
