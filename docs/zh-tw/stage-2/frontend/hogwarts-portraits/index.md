# Project 4: 一起做霍格沃茨畫像

在之前的課程中，我們已經學會如何基於 prompt engineering 和 API 調用從而實現更復雜的 AI 交互。我們已能夠將簡單的 AI 聊天機器人升級為 AI Agent 和 AI workflow ；通過更復雜的條件判斷與分支邏輯，我們得以開發出具備更強實用性的功能。

為了讓這些複雜的 AI 邏輯能更好地運行在不同的程序和實際應用場景中，我們從最簡單的 z.ai 在線環境，逐步過渡到更現代的本地 AI IDE，把原本在瀏覽器裡的程式設計環境搬到了你的電腦上。隨之而來，你開始真正面對各種環境安裝與配置問題，但在與 Trae Agent 的對話過程中，這些看似困難的挑戰也變得可以解決。

在該項目中，我們將在應用的實用性上更進一步，不僅優化 AI 功能本身，還將開始打磨產品的"外在"。你將嘗試讓自己的界面更加美觀易用，並根據實際需求，親自定製程序界面的佈局與風格。

正式開始之前，先用幾道小測驗幫你快速回顧上一節課的內容：

1. 什麼是 Dify？它是做什麼的？為什麼我們需要它？
2. 如何調用 Dify 的 API ？
3. 什麼是 RAG？如何使用 Dify 構建一個 RAG Agent 或 RAG 工作流？Dify 常見節點的使用方式
4. 什麼是 AI IDE？什麼是 Trae？它和 z.ai 有什麼區別？

如果對以上任何一個問題還有疑惑，可以先回顧上一節課的文檔，或者直接在微信群裡提問交流。

本節課的項目主題是 **Hogwarts Portraits** 。顧名思義，它的靈感來自霍格沃茨魔法學校裡那些會"活過來"的畫像。我們希望用 AI 打造一組"能互動"的魔法畫像體驗——和畫像對話就像在和"本人"對話一樣，既保留對話的記憶，又具備角色的背景與歷史。通過這個項目，你將把之前學到的智能體與工作流真正融入到一個具體的產品界面中。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

為了真正打造出 Hogwarts Portraits，我們需要親手搭建出符合魔法畫像的前端界面。為此，你將開始接觸現代前端設計工具，學習如何把界面設計和程式碼結合起來，把紙上或畫布上的界面草圖，變成真正可以操作的網頁。

你還需要會學會如何把這個網頁從本地環境發佈到互聯網上，讓你親手打造的特色網頁，不僅能在自己電腦上運行，也能被全世界的用戶訪問和體驗。

本節課的參考項目地址為：[Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# 你將學到

1. 瞭解什麼是前端設計工具、它們解決什麼問題，以及目前常見的前端設計工具有哪些。
2. 認識 Figma 和 MasterGo，掌握它們的基礎操作，並學會使用前端程式碼導出插件。
3. 利用 Figma AI 和 MasterGo AI 生成網頁設計，並導出可用的頁面程式碼。
4. 理解什麼是 GitHub，學會配置 SSH 連接、創建程式碼倉庫並完成程式碼推送。
5. 弄清"部署"這一概念，學習如何使用 Zeabur，將程式碼從 GitHub 或本地環境部署到互聯網上。

屬於自己的 Hogwarts Portraits，一個用於展示 **某位明星、歷史人物或動畫人物** 的網頁界面。

# 1. Hogwarts Portraits

我們到底想做一個什麼樣的"魔法畫像"？簡單來說，我們希望儘可能還原《哈利·波特》中的場景，畫像不再只是掛在牆上的一張靜態圖片，而是一個可以和你對話、會根據談話內容改變表情和"心情"的擬人化角色。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

要讓這個畫像看起來不像聊天 AI 機器人，而更接近一位"真實存在的人"，需要解決兩個問題：一是記憶與知識：畫像需掌握與角色相關的大量背景資料（人物設定、經歷故事、相關文章等），這個部分可以通過知識庫來實現，將你為角色準備的文本素材接入包含知識庫的 Dify ，即可讓畫像具備一定的背景知識講解能力。

其二是表達風格的問題。僅有知識還不夠，我們還希望它在說話方式上儘可能貼近"本人"，包括語氣、用詞習慣、思考方式，甚至偶爾的脾氣和幽默感。這一層需要通過提示詞工程進行處理：在系統提示詞中，我們需要明確角色的身份設定、世界觀邊界和語言風格，讓每一次回答都圍繞既定人設展開，而不是退回到通用 AI 的中性話術。

除了對話功能外，我們還希望讓情緒能夠真正被看見。為此我們可以構建一個情緒值指標，我們可以設定 Dify 的輸出內容，讓模型在生成回答文本的同時，額外輸出一個"心情值"或情緒標籤。當前端拿到情緒的指標後，就可以根據心情值或者標籤渲染對應的畫像圖片。當心情值高，畫像看起來很開心，當心情值低落時或者生氣時，畫像看起來很傷心或者憤怒。通過這種方式，用戶看到的不再是一張永遠不變的圖，而是一個會隨內容起伏不斷"變化表情"真正的"魔法畫像"。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

此外，對於這個畫像的內容，它可以是現實中的明星、歷史人物，也可以是動漫 IP，甚至是你從零構建的原創角色。頁面本身不需要複雜，但幾個核心元素不可或缺：清晰的角色名字，一段高度濃縮的人物簡介，一張足以代表該角色的核心畫像或海報，以及一個"和 TA 對話"的互動區域；你可以把在 Dify / Trae 中配置好的 AI Agent 或 workflow 接入到這個對話模塊中，實現畫像的角色扮演功能。

## 1.2 收集角色資訊

以 Elon musk 為例，我們需要收集他的公開發言用於模仿說話方式，注入提示詞。這些素材可以來自於演講、訪談、社交媒體發言，你只需要把這些內容變成文字，在對話期間作為 few shot 的參考，讓大模型用與 Elon musk 同樣隨意、自嘲的方式進行回覆即可，例如：

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

對於如何收集背景知識並將其作為知識庫，我們可以搜索他的個人介紹，以及公司的介紹複製全部文本作為知識庫的內容加入 Dify，如果你忘記了 Dify 的使用方法，請返回上節課的講義，重新學習如何將知識添加知識庫。

此外，考慮到畫像設計，使用對應人物公開的圖片也許並非那麼吸引人，並且可能存在一定風險。此時建議你可以使用圖像生成工具的圖生圖功能，讓 AI 返回高清高質量的畫像，你也可以使用圖像生成工具生成一系列表情的畫像素材，用於在之後的情緒值改變後修改對應的畫像呈現。

本教程中使用的是 [Lovart](https://www.lovart.ai/home)，Lovart 是一款AI設計智能體，它能通過自然語言指令，自動規劃和執行從概念到交付的端到端設計工作流，生成海報、品牌Logo、影片、音樂等內容，並支持分層編輯（實際上內部的功能原理是調用對應的 Seedream 或 google nanobanana 模型，我們已經在之前的課程中提到過）。通過 Lovart ，我們能夠獲得一系列的表情素材，你可以提前獲得你喜愛角色的圖片資訊，將其保存待後續使用。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

一切準備就緒後，我們能夠開始著手於整體頁面的設計，我們希望這個頁面的風格與該人物是高度綁定的。

## 1.3 頁面原型設計

我們還可以先構思一下頁面的原型，如上述所說，我們希望有一個對話頁面和畫像，以及一個有趣的個人介紹，在本篇例子中，我們實現了一個類似 X 上的對話界面替代個人介紹，你也可以想到其他符合"該人物特點"的方式，選取新的元素替換個人介紹欄目。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

最簡單的，我們可以用 PowerPoint 設計最初的網頁呈現原型，我們從網上找到一張魔法畫像的圖片，並且將畫面設定為橫向排布，最左側設定為聊天區域，中間是畫像區域，最右側是 X 的區域。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

基於上述簡單原型，我們能夠讓大模型生成真正的前端頁面設計以及對應的程式碼結果。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

不過，一般而言在實際中我們並不會用 PowerPoint 進行前端頁面的設計。我們會用更好的原型工具，又或者說是前端設計工具來實現這一點。

---

# 2. 使用 Figma 和 MasterGo 設計界面

::: tip 📚 前置知識
在開始本節之前，建議你先學習 [Figma 與 MasterGo 入門](../figma-mastergo/) 教程，掌握前端設計工具的基礎操作，包括：
- 創建 Design 文件和 Frame 畫板
- 使用 Auto Layout 實現自適應佈局
- 從設計稿導出程式碼的方法
:::

本節假設你已經掌握了 Figma 或 MasterGo 的基礎操作，我們將重點講解如何將這些工具應用到 Hogwarts Portraits 項目中。

## 2.1 設計魔法畫像界面

基於 1.3 節中的原型構思，我們需要在 Figma 或 MasterGo 中創建一個三欄佈局的界面：

1. **左側**：聊天對話區域
2. **中間**：魔法畫像展示區域（會根據情緒變化）
3. **右側**：角色社交平臺展示區域（如 X 時間線）

你可以使用 Figma 的 AI 功能（Figma Make）或 MasterGo 的 AI 生成頁面功能，輸入類似以下的提示詞：

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 導出程式碼並在本地運行

設計完成後，你可以通過以下方式將設計稿轉化為可運行的程式碼：

**方式一：使用 Figma Make**
1. 在 Figma 中點擊 Make 按鈕
2. 上傳你的設計參考圖
3. 添加提示詞描述需求
4. 生成後點擊編輯器圖標進行微調
5. 導出程式碼到本地或同步到 GitHub

**方式二：使用 MasterGo AI**
1. 在 MasterGo 編輯界面上方找到 AI 工具
2. 選擇"生成頁面"功能
3. 上傳參考圖並描述需求
4. 生成後點擊"程式碼預覽"獲取程式碼

**方式三：使用多模態 AI**
1. 將設計稿截圖保存
2. 使用 Gemini、Qwen 等模型進行圖生程式碼
3. 要求生成 HTML 或 React 程式碼
4. 在本地 IDE 中運行並調試

## 2.3 準備情緒變化素材

為了讓魔法畫像"活"起來，你需要準備一組表情圖片。建議至少包含以下情緒：

| 情緒值 | 表情 | 說明 |
|--------|------|------|
| 0 | 悲傷 | 角色感到傷心或失落 |
| 1 | 憤怒 | 角色感到生氣或不滿 |
| 5 | 平靜 | 默認狀態，情緒穩定 |
| 10 | 開心 | 角色感到高興或興奮 |

你可以使用 Lovart 或其他 AI 圖像生成工具，基於同一角色生成不同表情的變體，確保風格一致。

---

# 3. 運行 Hogwarts Portraits

## 3.1 導出測試程式碼

通過在從原型到程式碼中的實踐，相信你已經得到 Html 或者 React 格式的原型程式碼，我們只需要將其複製到本地，在 IDE 中說明"請你幫我運行這個程式碼並且支持裡面的必要的功能"，即可運行初版測試；但值得注意的是，這一步往往會出現不少報錯，你需要保持耐心，將所有基礎交互與功能調通。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

值得注意的是，由於我們的密鑰都需要放在環境變量，而不是寫入程式碼中。我們需要特別強調之後的 DIfy API 相關的內容都需要放入環境變量。我們能夠在之後公網部署的環節中，在部署工具網站中顯式指定對應的私有環境變量；又或者是我們可以讓大模型在網頁中創建一個設置按鈕，我們可以在設置按鈕中傳入對應的私密環境變量，當前變量只能在當前頁面中保存，別人無法獲取。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Dify 工作流設計與 API 對接

在上面的部分中，我們僅完成了前端界面的可視化呈現，尚未打通核心的擬人化角色對話交互流程。這一步是讓原型從靜態展示轉變為魔法畫像的關鍵，我們可以參考示範項目的 DIfy 工作流進行人物回答和情緒系統的設計，此處我們的涉及為最左側是聊天界面，中間是魔法畫像（會根據對話的內容修改對應的表情），右側是 X 社交平臺賬戶（會根據對話的內容判斷是否需要發佈感想到社交賬戶）。

一般而言，魔法畫像只需要聊天界面和會變動的畫像即可，該處為了展示更多可能選項，在最右側加入了符合當事人特點的新功能；你可以根據你扮演的角色對象，加入符合對應人物的功能進行展示。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

你可以把任務的資訊都加入知識庫的節點，並在 RESPONSE 節點設置大模型對應的回覆邏輯，我們可以參考一個簡單的默認回覆邏輯提示詞：

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

以及情緒系統對應的提示詞：

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

其中最後輸出結果的拼接，在右上角的 RESULT 節點中支持運行：

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

這裡我們需要稍微對工作流做些解釋，這裡返回 elon_chat 是左側展示 Elon Musk 的對話內容，elon_x 表示在 X 賬戶（右側）發表資訊的內容，而 elon_score 則是為了根據情緒分數顯示不同的魔法畫像表情圖片。

工作流中你可以看到 if else 節點，該節點是用來實現是否有 x 的對話生成 elon_x 內容，如果情緒值不等於 5 （5 在這裡設定表示平靜，平靜不需要發到社交平臺；而 0 表示傷心，1 表示憤怒，10 表示很開心，需要發到社交平臺。）則生成後續內容用於右側社交平臺的文章發送。默認都需要有 elon_chat 返回到左側的對話內容。

對於如何將這個 API 進行對接的工作，我們能夠與 AI IDE 對話實現這一點。請你參考之前 Dify 課程中我們介紹的集成方式，記得提前替換其中的 Dify 地址與 Key。（如果你忘了怎麼根據文檔集成 API，請複習之前的 DIfy 課程內容）

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

同時建議補充需求："程式碼還需要添加基礎錯誤處理邏輯，比如網路中斷時顯示'連接失敗，請重試'、API 調用超時自動重試 1 次、密鑰錯誤提示權限驗證失敗等等詳細報錯，確保對話穩定性並能讓開發人員快速發現 API 問題所在。"

## 3.3 Github 與公網部署

終於，恭喜你順利完成了 Hogwarts Portraits 頁面的開發實現！接下來我們需要將它上傳到 GitHub 平臺，並將其部署到公共環境讓所有人都能訪問。

你需要參考該教程，對如何使用 Github 進行研究，將自己的項目上傳至 Github：[什麼是 Github](/zh-cn/stage-2/backend/git-workflow/)

此外，你還需要學會如何使用 Zeabur，將其連接到 Github，併成功部署你的項目：[什麼是 Zeabur](/zh-cn/stage-2/backend/zeabur-deployment/)

如果你覺得自己開發一套 Hogwarts Portraits 項目很困難，你可以先從參考別的項目開始進行修改，本節課的官方程式碼地址為：https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. 嘗試不同設計風格

完成第一版設計後，我們不必侷限於此，鼓勵大家快速探索更多元的視覺風格。你可以在原型部分進行大膽的修改，又或者是基於最後的項目進行全新提示詞的修改，從而生成多套風格差異顯著的頁面。 比如帶有復古紋理、偏 "舊書卷 / 學院風" 的深色頁面，色彩明快、充滿 "童話 / 卡通" 感的亮色頁面，或是元素簡約、視覺清爽的現代扁平設計。例如下圖是一個轉換為中國古風詩人設計風格的案例，畫像圖片未更換，只修改了其他部分：

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

不用拘泥於前面提到的模式，你可以把魔法畫像或是個人資料頁面修改至更有特點，匹配"魔法畫像"本身的習慣，這會讓你的應用更加有趣。期待你的魔法畫像成果！

# 📚 Assignment

本節課的作業目標，是讓你完成一份真正屬於自己的 Hogwarts Portraits，並且可以通過公網鏈接訪問。

你需要在作業提交中提供兩樣東西：

1. **你的 GitHub 倉庫鏈接；**
   1. **在 README.md 中寫入一兩句話的小說明：你選擇了誰作為畫像主角，為什麼選 TA。**
2. **你的 Hogwarts Portraits 線上訪問鏈接；**

你也可以參考 Yerim 寫的 [使用設計和程式碼 Agent 製作網頁](/zh-tw/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) 教程，進行個人作品集或任意功能簡單網頁的快速搭建。
