# Dify 入門與知識庫集成

# 回顧上節課

在前幾節課中，我們分組學習了 AI 程式設計、提示詞工程以及 AI 圖像生成的基礎知識。這些內容幫助我們初步瞭解了不同大語言模型（LLM，Large Language Model）或生成式模型的邊界和能力。

為了幫助你回顧上節課的內容，下面有幾個小問題可以思考：

1. 什麼是 AI 程式設計？如何使用 AI 程式設計工具（例如 [z.ai](http://z.ai)）來創建一個網頁？
2. 什麼是大語言模型？什麼是提示詞工程和上下文工程？你該如何編寫一個複雜的提示詞？
3. 對於文本、AI Coding、圖像生成的三個不同方向，你認為模型能力的強弱分別體現在什麼地方？
4. 什麼是 API？如何使用 [z.ai](http://z.ai) 接入第三方 API ？

如果你對其中任何一個問題還感到疑惑，可以回看上節課的文檔，也可以直接在微信群裡提問。

在這節課中，我們將從簡單的 AI 文字圖片工具，進入更接近公司業務落地的工作流搭建平臺。從對話機器人走向 AI 智能體、AI 工作流，並基於 API 把它變成可交互的“智能”機器人頁面。

在操作過程中，如果遇到難以理解的步驟，請不要擔心，推薦你隨時對當前所在的操作頁面進行截圖，發送給大模型進行詢問；當前大模型已能夠解答大部分常見問題。

如果提問後仍無法解決，不妨大膽嘗試操作；不必害怕出錯，每一次嘗試都是學習和進步的機會。隨著實踐次數的增加，你會越來越熟練，操作也會越來越得心應手！

# 本節課你將學到

1. 為什麼需要從聊天機器人走向智能體和 Workflow 編排。
2. 什麼是智能體與工作流開發平臺，如何把 AI 的能力 SOP 化與可編排化。
3. 什麼是 Dify，如何用這個面向 LLM 應用的開源平臺快速搭建應用，尤其是知識庫問答機器人。
4. RAG 的實現方法與價值，為什麼需要檢索增強生成？
5. 如何從 0 到 1 學會使用 Dify 和 AI IDE Trae (`Extra Knowledge 4 - What is AI IDE and Trae`)，包括搭建 智能體、工作流，並基於 Dify API 製作前端對話機器人網頁程序。

- Dify 的基本使用原理與智能體、工作流製作方法，API 調用方法。
- AI IDE 的使用方法，如何使用 AI IDE 程式設計。
- 一個可進行對話的前端網頁智能體程序。

# 1. 從對話到智能體

在上一階段，我們學會了如何用提示詞讓大模型扮演角色、生成文本或編寫簡單程式碼。但如果你仔細思考，會發現一個問題，聊天機器人本身並不能做事。

它能回答怎麼查訂單？，卻不能真的去資料庫裡查對應的數字；它能描述一封週報應該包含什麼，卻無法自動彙總你的項目資料併發送郵件。這種“只說不做”的侷限，使得純對話式 AI 難以真正融入業務流程。

要讓 AI 從聊天夥伴升級為數字員工，我們需要賦予它三項核心能力：

1. 專屬知識——讓它能夠通讀並瞭解你的產品文檔、客戶資料、內部制度；
2. 工具調用（或者叫插件）——讓它能操作資料庫、調用 API；
3. 結構化執行——讓它按預設邏輯一步步完成任務，而非自由發揮。

這就是 AI 智能體（AI Agent）的雛形：一個具備目標、知識、工具和執行路徑的自動化單元。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image1.webp)

> 注意：當前業界所說的簡單版本的“智能體”，大多指基於 LLM + 工具 + 知識庫組合而成的增強型應用，並非所謂能夠自主規劃的智能體。簡單的智能體雖不具備真正的推理與長期規劃能力，但已足以支撐大量企業級自動化場景。我們將會在之後的章節詳細介紹真正的具備自主規劃和行動能力的智能體。

## 1.1 最簡單的智能體：基於知識庫的問答機器人

在明確智能體應具備的多項核心能力後，一個值得思考的問題隨之而來：能否僅通過實現其中某一項最簡單的功能，就構建出一個真正可用的基礎智能體？ 答案是肯定的。

事實上，在大量實際業務場景中，用戶的核心訴求並非讓 AI 自動執行復雜操作（如調用 API 或跨系統協調任務），而是希望它能基於企業自身的專屬資料，提供精準、可靠的問答支持。這恰好對應智能體三大核心能力中的第一項，專屬知識服務能力。因此，我們得以引出智能體最簡單、也最廣泛應用的形態：基於知識庫的問答機器人。

雖然它尚未具備工具調用或自主規劃能力，但其關鍵突破在於：讓大模型的回答不再憑空生成，而是有據可依。如何實現？關鍵就在於解決核心挑戰：企業內置大量文檔知識，當存在千上萬頁文檔時，模型如何在每一輪對話中快速找到與當前問題最相關的內容？

此時的一個解決方案是：檢索增強生成（Retrieval-Augmented Generation, RAG）。

RAG 的基本思路是：在用戶提問時，系統首先從企業知識庫中檢索出與問題語義最相關的若干文本片段（例如產品手冊中的某一段、HR制度中的某一條款），然後將這些片段作為上下文“注入”到大模型的輸入中，引導它基於真實資料生成回答。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image2.webp)

圖片來源：[https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag](https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag)

這樣一來，模型的回答不再是依賴其訓練資料中的泛化知識，而是錨定在企業提供的權威資訊之上。RAG 的目標，正是通過這種外部知識的動態注入，顯著提升回答的真實性、準確性和一致性——甚至可以讓回答“符合人設”，比如以客服口徑或技術文檔風格作答。

在實際業務中，這項技術尤為重要，因為大模型常常會產生“幻覺”。例如，若你以 CFO 或諮詢顧問的身份詢問某個時間段的具體資料，模型很可能編造日期和事件。引入 RAG 後，回答的可控性與可靠性將得到顯著提升。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image3.png)

圖片來源：[https://www.databricks.com/glossary/retrieval-augmented-generation-rag](https://www.databricks.com/glossary/retrieval-augmented-generation-rag)

在本節課的實操環節中，我們將使用流行的 AI 工作流平臺 Dify，動手搭建一個基於知識庫的問答機器人。你可以輕鬆將各種類型的專屬資料，如產品手冊、公司制度、項目文檔、研究論文、知識庫文章，甚至是個人筆記集構建為知識庫。

完成搭建後，你可以嘗試提出各類問題來檢驗它的能力，例如：

- “我們產品A的最新版本有哪些主要功能升級？”
- “請根據員工手冊，說明今年的年假制度是如何規定的？”
- “在XX項目中，我們遇到的技術挑戰‘XXX’是如何解決的？”
- “這篇論文中提到的核心研究方法是什麼？”

你將親身感受 RAG 技術如何將靜態分散的文檔資料，轉化為一個精準的智能知識庫，為各種場景提供高精度問答支持。

## 1.2 從對話智能體到工作流

然而，即使是加入了知識庫甚至是插件調用能力的“增強型智能體”，在面對更復雜的業務流程時仍顯不足。

試想這樣一個用戶請求：“我們新上線的 SaaS 產品最近有哪些功能更新？能幫我整理成一份給客戶的簡報嗎？”

這個請求看似簡單，背後卻需要多個協同步驟：首先從內部產品文檔或 Notion 知識庫中檢索最近一個月的功能發佈記錄；然後過濾出面向客戶的關鍵特性；接著調用大模型將技術描述轉化為客戶友好的語言；最後通過將生成內容推送至市場團隊的郵箱，或保存到 Google Docs 模板中。

如果僅靠一個大語言模型自由推理，先不說是否能夠一次對話實現所有過程，就算能，其中也很容易遺漏關鍵資訊、混淆內部術語與客戶語言，或無法結構化輸出。更重要的是，企業需要的是可審計、可複用、可監控的標準化執行路徑，而不是每次依賴模型的臨時發揮，可監控可復現對企業而言非常重要，非預期的結果很可能會帶來預期外的嚴重損失。

這就引出了更高階的 AI 應用範式：AI 工作流（AI Workflow）。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image4.webp)

工作流是指將一個複雜任務拆解為多個有序、可配置、可自動執行的子步驟，並通過可視化或程式碼方式編排它們之間的邏輯關係，如條件判斷、循環或並行執行。將 AI 能力 SOP 化（即標準化操作流程），意味著把如何用 AI 完成某項任務的經驗固化為可重複使用的模板。

這種做法帶來了多重價值：非技術人員（如產品經理或運營）可以通過拖拽組件快速搭建 AI 應用；開發者可以將 RAG 檢索、LLM 調用、API 工具等封裝為標準節點，在不同業務場景中複用；整個流程還可被完整追蹤、調試和持續優化，滿足企業對穩定性與合規性的要求。

AI 工作流的使用人群非常廣泛。產品經理無需寫程式碼，即可設計完整的用戶交互路徑；運營人員能快速搭建客服機器人、內容生成器或通知系統；開發者和算法工程師則可將核心能力模塊化，供前端調用；創業者或獨立開發者也能以極低成本驗證 AI 產品的 MVP，幾天內上線一個包含資料查詢、內容生成與動作執行的完整原型。

此外，值得注意的是，AI 工作流通常可用一種中間表示（Intermediate Representation）來描述。不同工作流平臺的具體表達方式雖有差異，但大多采用結構化文件（如 JSON、YAML 等）來定義節點類型、輸入輸出及執行邏輯，其結構類似下圖所示：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image5.png)

簡言之，如果說智能體讓 AI 從會聊天走向能做事，那麼工作流則讓 AI 從偶爾做成一件事邁向“穩定、可靠、規模化地完成一類事。在接下來的實踐中，我們還將藉助 Dify 平臺，上手並親手構建完整的 AI 工作流，體驗從想法到可運行應用的完整過程。

## 1.3 常用智能體 / 工作流平臺

隨著生成式 AI 技術的飛速發展，為幫助開發者與業務人員快速構建智能體與自動化流程，避免陷入程式設計的複雜細節，一批低程式碼甚至無程式碼的智能體及工作流平臺應運而生。

首先需要明確的是，低程式碼平臺是指通過可視化拖拽組件、預置業務邏輯模板、圖形化配置規則等方式，顯著減少手動編碼工作量的開發工具。其核心在於以可視化配置，節點式拖動變成的方式替代直接寫程式碼的方式，既能讓具備一定技術能力的開發者從重複勞動中解放出來，也能讓熟悉業務邏輯的非技術人員參與到應用搭建中。本質上，它是在開發效率與場景靈活性之間架起一座平衡的橋樑。

這類低程式碼/無程式碼智能體平臺的突出價值，正是大幅降低 AI 應用的開發門檻。以往需要團隊協作數週——從需求梳理、程式碼開發到測試部署——才能完成的 AI 智能體（如客服問答機器人、資料處理助手），現在藉助平臺提供的可視化工具，可將“從創意到上線”的週期縮短至數小時。

目前市面上主流的低程式碼 AI 工作流平臺包括：

| 平臺                                          | 特點                                               | 適用場景                               |
| --------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| Dify                                          | 開源、支持知識庫 RAG、LLM 編排、API 輸出，中文友好 | 企業知識庫問答、定製化 Agent、API 服務 |
| Coze（字節跳動）                              | 國內可用、集成抖音/飛書生態、插件豐富              | 社交機器人、國內小程序集成             |
| n8n                                           | 通用自動化工具，支持 AI 節點，強調 API 編排        | 跨系統資料同步、AI + 傳統 SaaS 自動化  |
| 百度千帆 AppBuilder / 阿里百鍊 / 騰訊 HunYuan | 大廠雲原生方案，集成自家模型                       | 企業級部署、合規要求高場景             |

目前市面上的低程式碼 AI 工作流平臺選擇豐富。儘管 AWS、Azure、阿里雲等主流雲廠商均推出了相應的 AI 工作流解決方案，但 Dify、Coze 和 n8n 憑藉以下三大核心優勢，成為當前應用最廣泛的代表：

1. 極致易用性。平臺採用可視化拖拽式界面設計，用戶無需深入理解底層技術，即可快速上手。
2. 高靈活性。支持自定義組件與擴展 API 接口，既能適應教學演示、MVP（最小可行產品）驗證等輕量場景，也能滿足中小型團隊的敏捷迭代需求。
3. 成熟生態。不僅官方文檔詳盡、響應及時，還擁有活躍的用戶社區，便於快速獲取來自不同用戶的預設方案。

這三大平臺均支持將搭建好的 AI 智能體以標準化 API 接口的形式輸出，可無縫集成至前端 Web 應用、企業內部 ERP 系統或移動端 APP 中，進一步降低了 AI 能力落地的技術門檻。

### 1.3.1 Dify：企業級LLMOps與應用生命週期管理平臺

Dify 定位是LLM應用開發與運營平臺，致力於提供AI應用從構思、部署到優化的全生命週期管理。其核心是一個低程式碼平臺，旨在幫助開發者和非技術背景的創新者快速構建生產級AI應用。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image6.png)

在功能上，Dify覆蓋了可視化工作流編排、智能體構建、知識庫管理、多模型支持等功能。平臺允許通過拖拽節點設計複雜任務流程，並支持創建基於意圖的Agent。其知識庫功能突出，能處理多種格式文檔並進行高效的向量檢索。同時，Dify兼容支持包括GPT、Claude及眾多開源模型在內的多種LLM，構建的應用可一鍵發佈為標準API便於集成。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image7.webp)

技術架構方面，Dify以開源和可私有化部署為特色，強調靈活性、擴展性及企業級合規。目標用戶包括開發者團隊和業務創新者，典型應用場景涵蓋企業知識庫與智能客服、內容創作自動化、垂直領域AI助手以及企業AI中臺。

### 1.3.2 Coze（字節跳動）：零程式碼AI智能體構建的普及者

Coze是字節跳動推出的AI智能體開發平臺，以極致易用性為核心，讓無程式設計經驗的用戶也能輕鬆創建、調試併發布功能豐富的AI聊天機器人。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image8.png)

其核心是將Bot構建簡化為搭積木式操作。用戶可通過界面輕鬆配置角色與知識庫，並利用豐富的內置插件庫為Bot添加新聞、旅遊、圖像生成等多類外部能力。創建好的Bot可一鍵快速發佈至豆包、飛書、微信公眾號等多個平臺。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image9.png)

技術架構完全服務於低門檻使用，後端集成字節自有模型並封裝複雜流程，強調多模態理解與實時響應。作為一個主要以雲服務形式提供的平臺，其私有化部署能力相對有限。典型應用場景包括個人助理與娛樂Bot、智能客服與問答系統、在線教育助手以及快速原型驗證。

### 1.3.2 n8n：可程式設計的後端工作流自動化引擎

n8n是一個通用的可程式設計工作流自動化平臺，其核心定位是連接各類應用、資料庫與API，實現資料流動與任務自動化執行。

它通過龐大的集成節點庫支持數百種SaaS服務、資料庫及協議，並採用可視化與程式碼結合的方式：用戶可在畫布拖拽節點，同時注入JavaScript或Python程式碼編寫自定義邏輯。n8n擅長處理後端資料密集型任務，如資料同步、ETL流程與API編排。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image10.png)

關鍵技術特性是“源碼可見”和“可自託管”，用戶可將其私有化部署以完全掌控資料與環境，這使其對資料安全要求高的行業極具吸引力。其主要目標用戶是開發者、技術運營及資料分析師。n8n 最大的優勢，在於擁有極其強大的社區生態。網路上擁有隨處可見豐富的 n8n 分享影片，為用戶提供了便捷的學習參考與經驗借鑑；同時，它支持連接 YouTube、Instagram 等全球眾多不同生態平臺，能夠幫助用戶輕鬆打破跨平臺資料與服務的壁壘，實現多生態流程的自動化流轉。

### 1.3.3 其他工作流平臺

除了上述的幾個最知名的平臺，中國國內的主要科技廠商也相繼推出了各自的一體化AI開發平臺，例如：百度千帆 AppBuilder 提供從模型選型、RAG構建到智能體發佈的全流程支持，深度集成文心大模型；阿里雲百鍊基於通義千問系列模型，注重企業級安全與私有化部署能力；騰訊雲 TI 平臺 則聚焦於金融、醫療等行業場景，提供豐富的預置解決方案模板。這類平臺通常與各自雲生態深度融合，適合已處於相應技術體系內的企業選用。

然而，在通用型、開放性與社區生態方面，Dify 與 Coze 仍憑藉其突出的易用性、廣泛的模型支持以及活躍的開發者社區，成為當前更受廣泛採納的選擇。

儘管各平臺在定位與生態上各有側重，其核心邏輯均是通過可視化方式編排與連接不同的能力模塊。因此，掌握其中任意一種平臺的設計思路與操作方法，即具備快速遷移到其他類似工具的基礎。在接下來的實踐中，我們將以 Dify 為例進行具體講解。

# 2. 深入淺出 Dify

## 2.1 什麼是 Dify

我們在之前已經瞭解了基礎的 Dify 的資訊介紹，對於更詳細的資訊，你可以通過 [https://cloud.dify.ai/apps](https://cloud.dify.ai/apps) 訪問 Dify 平臺，如果想了解更多資訊，可以訪問官網 https://dify.ai。

Dify 是一個用於開發 LLM 應用的開源平臺。它提供了直觀的界面，將 Agent 工作流、RAG 流水線、工具能力、模型管理、可觀測性等功能結合在一起，幫助你快速地從原型走向生產環境。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image11.webp)

你可以在 Dify 中使用大語言模型和各種功能不同的工具來搭建“工作流”。所謂工作流，就是把原本需要你手動一步步完成的操作——例如資料檢索、大模型調用、網頁搜索、結果過濾、格式整理等——按照業務邏輯串聯起來，變成一個自動化、可複用的流程。如果沒有工作流，每次你都需要把同樣的內容複製粘貼給大模型，非常低效、容易出錯，也難以在真實業務中複用。

搭建一個工作流，就像在拼搭積木或拼圖。你把“大語言模型節點”（負責理解和生成）、各類“工具節點”（負責執行具體動作，例如查資料庫、發郵件、翻譯文本等）、以及“資料節點”（負責讀取、存儲資訊）像積木一樣連接起來。它們會按照你預設的邏輯自動協同工作，而不需要你每次都手動操作。你也可以把它理解成一種“低程式碼程序”：你只需要通過拖拽的方式，配置輸入和輸出的路徑，就可以實現比較複雜的業務邏輯。

舉個例子，如果你是一個亞馬遜或抖音電商店鋪的老闆，想要搭建一個 AI 客服系統，可以參考下圖的結構設計一個工作流：

1. 觸發節點（類似 START）：接收用戶的諮詢問題，例如“這個商品的質保期有多長？”。
2. 問題分類節點（類似 QUESTION CLASSIFIER）：使用一個模型（例如 GPT）對用戶問題進行分類，判斷這是售後（比如質保）、使用方法，還是其他類型的問題。
3. 知識檢索節點（類似 KNOWLEDGE RETRIEVAL）：根據分類結果，自動訪問相應的知識庫。如果是關於“質保”的售後問題，就從售後 SOP 知識庫中檢索與“質保”相關的精確資訊。
4. 大語言模型節點（LLM Node）：將用戶問題和檢索到的知識庫內容一起發送給大語言模型（例如 GPT），讓它生成一段對用戶友好的回覆（避免太生硬的技術語氣）。
5. 條件節點：檢查大模型生成的回答中是否包含清晰的質保時間（例如“1 年”、“3 年”），如果有則繼續下一步，如果沒有則讓它回覆“請提供產品型號”。
6. 輸出節點（類似 ANSWER）：將最終答案返回給用戶，並自動把本次諮詢記錄到表格中。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image12.webp)

在整個過程中，你不需要手動去翻知識庫、反覆調整模型的回答、或單獨記錄資料——工作流會把這些步驟“連起來自動跑”。並且它非常靈活：例如，如果你之後想加一個新規則“當用戶問質保範圍時，調用另一個知識庫”，只需要在工作流中多加一個條件節點，而無需重構整個系統。

這是一個比較簡單的工作流示例，但要完全掌握這些能力，對現在的你來說可能還有點難。因此在本節課中，我們從更加基礎的知識庫智能體開始，後面再逐步學習更復雜的工作流技巧。

### 2.1.1 部署屬於自己的 Dify（可選）

本部分內容原本安排在後續課程中詳細介紹，但考慮到當前部分學習者可能因網路限制暫時無法訪問 Dify 官方網站或雲端服務，我們決定提前提供這一可選的學習路徑，幫助你順利推進課程進度。

你需要參考該教程入門 web 部署平臺的基本使用方式：[如何部署 Web 應用](/zh-cn/stage-2/backend/zeabur-deployment/)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image13.png)

你需要學習如何在 Zeabur 上部署一個自己的 Dify，部署後進入到對應鏈接註冊並登錄後繼續跟隨下列教程操作即可。

注意，不同版本的 Dify 的操作方面和前端界面可能有些許差別，但總體上差別不大，當你發現不同的時候不要慌張，找到類似的接口和入口進行操作即可。

## 2.2 創建第一個 Dify Chatbot 應用

訪問 Dify 首頁 [https://cloud.dify.ai/apps](https://cloud.dify.ai/apps) 並註冊和登錄後，選擇 Studio，你會看到如下界面：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image14.png)

在左側找到 `CREATE APP` 區塊，點擊 `Create from Blank`。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image15.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image16.webp)

在 APP Type 中找到 Chatbot（如果一開始沒看到，可以點擊“查看更多類型”的按鈕，然後在完整列表中找到）。選擇 Chatbot 之後，在下方輸入應用的名稱和描述，最後點擊創建。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image17.png)

創建完成後，你會看到類似下面的界面。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image18.png)

中間區域的 “INSTRUCTIONS” 指的是內置指令，你可以把它理解為默認提示詞或系統提示詞。

中間偏下有一個 “Knowledge” 區域，這就是知識庫區域——我們稍後會把自己的知識庫上傳到這裡。

右側是調試窗口，你可以在調整提示詞後與 Agent 進行對話，實時查看效果。

你可以在 INSTRUCTIONS 區域自由輸入角色提示詞，觀察對話效果；也可以點擊 Generate，讓大模型自動幫你生成提示詞。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image19.webp)

注意右上角會出現許多不同模型的選項，這意味著你可以點擊切換不同的對話模型，從而比較它們在語氣、邏輯推理、長文本處理等方面的差異，尋找最適合你需求的模型。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image20.png)

## 2.3 支持自定義模型供應商

為充分發揮 Dify 的靈活性，考慮到不同地區訪問模型的難度，為滿足特定業務需求、成本控制或資料隱私要求，我們常常需要接入自定義模型。Dify 支持配置三類核心模型：大語言模型（LLM）、Embedding 模型和 Rerank 模型。本部分內容將逐步指導你完成這些自定義配置。

Dify 能夠靈活接入來自 OpenAI、Azure、Anthropic 等主流服務商的模型，同時也全面兼容任何符合 OpenAI API 接口規範的自託管模型或第三方模型。你可以通過安裝內置的 OpenAI Compatible 插件以及對各大模型平臺定製的插件實現這一操作。

詳細步驟參考如下，首先我們需要安裝對應的插件：

1. 我們需要安裝 `OpenAI-API-compatible` 及 `SiliconFlow` 插件獲得對絕大部分大模型和 Embedding 模型的支持，其中前者是對 OpenAI 兼容接口的支持，後者是一個部署了當前絕大部分常見、好用的開源模型的服務站。你可以訪問下列網頁進行安裝：
   1. https://marketplace.dify.ai/plugins/langgenius/openai_api_compatible
   2. https://marketplace.dify.ai/plugins/langgenius/siliconflow
2. 如果你是自己部署的 Dify，你可以在對應系統設置界面進入插件市場進行操作

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image21.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image22.png)

進入插件市場後，搜索對應的插件名稱即可。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image23.png)

3. 安裝結束後，我們能夠配置支持新的模型供應商，在設置裡的模型提供商部分，我們可以看到目前支持的所有模型商：
   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image24.png)
4. 在開始使用前，需要先完成模型的配置。對於 OpenAI-API-compatible 插件，你可以點擊 “Add Model” 來添加並配置任意模型。你可以在 “Model Type” 中選擇該模型是LLM還是 Embedding，你需要確保模型的類型被正確配置。
   你需要寫入具體的模型名字、模型 endpoint URL 以及 API Key 才能確保模型啟用，如果你初步覺得配置該參數麻煩，你可以直接跳到後者的 SiliconFLow 平臺的 Key 配置，或者安裝 OpenRouter 等第三方服務商插件進行簡單的模型支持配置。（確保服務商內有剩餘可使用額度）

   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image25.png)

   對於 `SiliconFlow` 插件，只需要點擊 Setup 配置 key 後即可使用 Embedding 和 Rerank 模型進行測試，你可以點擊 Get you API Key from SiliconFlow 獲得鑑權密鑰。

   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image26.png)

5. 配置完成後，你可以點擊模型列表查看當前支持多少模型，此時已經完成了基礎模型的全部配置。
   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image27.png)

   其中支持了絕大部分常見的 Embedding 與 Rerank 模型：

   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image28.png)

   此時如果你想要修改 Dify 默認使用模型的配置，你還可以點擊 System Model Settings 按鈕修改默認的所有模型。

   ![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image29.png)

## 2.4 創建第一個 Dify 知識庫

到這裡，我們已經完成了最簡單的 Agent 創建，但它還缺少一個知識庫。現在，請點擊頂部菜單中的 `Knowledge`，進入知識庫創建頁面。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image30.png)

然後點擊左側的 `Create Knowledge`，創建你的第一個知識庫。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image31.png)

在這個界面中，你可以上傳多種類型的文件（例如 pdf、txt 等）來構建知識庫。可以上傳很長的文本，或者把維基百科上的內容複製下來保存成 txt 文件進行上傳。本例中，我們會上傳一份關於 Elon Musk 的維基百科 txt 文件。

點擊 Next 後，你會進入 Knowledge Base Settings（知識庫設置）頁面。這裡選項比較多，我們一步一步來看。

首先在 **General** 設置中，你可以把這裡理解成“文本切分規則”的設置區域。因為我們需要把很長的文本切分成小塊，所以必須先定義切分規則。在入門階段，你只需要關注 **maximum chunk length（最大切分長度）** 。可以嘗試設置為 512、2048 或 4096，然後點擊 **Preview Chunk** 預覽不同設置下的效果。

你也可以調整 **Chunk overlap（切片重疊）** 選項。它決定相鄰片段之間是否會保留一部分重疊內容。適當的重疊有助於避免重要資訊被拆到不同片段而難以理解。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image32.png)

在設置中還有一個選項叫做 **Chunk using Q&A format in English** 。啟用後，系統會使用大語言模型，將知識庫的一部分內容轉換成問答形式來存儲，這在某些場景下可以顯著提升檢索效果。

在真實業務中，根據場景選擇合適的切分策略，能夠更好地優化檢索結果，保證查詢能夠返回你期望的資訊。

繼續向下滾動頁面，你會看到和 Embedding 模型相關的設置。

簡單解釋一下：Embedding 模型的核心功能，是把非結構化資料（例如文本、圖片等）轉換成計算機能夠理解的“數字向量”（Embedding 向量）。通過這種轉換，模型能夠快速計算不同資料之間的相似度，從而實現語義相近內容的匹配，比如根據用戶輸入的一句話，找到語義最接近的文檔、圖片或商品。

Embedding 模型的選擇會顯著影響最終的檢索效果（例如匹配準確度、響應速度等）。在這裡，我們推薦優先使用 Qwen 0.6B 的 Embedding 模型，你也可以切換到 4B 或 8B 版本，直觀對比不同參數規模下檢索效果的差異。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image33.webp)

在此處，你還會看到另一個模型設置叫做 **Rerank model** ，默認值是 **Jina-rerank-m0** 。（如果你非校園內的學生，此時你可能會看到 Rerank 模型缺失的報錯，你需要在模型處配置 rerank 模型才能在此處啟用使用）

Rerank 模型的主要作用，是對“初步篩選出的候選結果”進行二次、更精細的排序，讓和用戶需求最匹配的結果排在更靠前的位置，從而顯著提升最終結果的相關性和用戶體驗。

簡單理解：Rerank 模型就是用來解決“初次篩選不夠精細”的問題。例如搜索引擎可能先用較簡單的規則檢索出 1000 個潛在相關網頁，再通過 Rerank 模型，從中挑出最相關的前 10 個展示在第一頁。

推薦系統同理：它可能首先找出 500 個“可能適合你”的商品，再通過 Rerank 模型排序，讓你最可能購買的商品排在列表頂部。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image34.webp)

當所有設置完成後，點擊 **Save & Process** ，系統就會進入知識庫向量化階段。在這一階段，Embedding 模型會把切分後的文本轉換為向量表示。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image35.png)

處理完成後，點擊 **Go to document** ，可以查看已經處理完畢並存儲好的知識庫內容。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image36.png)

直接點擊知識庫名稱，可以查看每個切片的具體內容。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image37.png)

在這裡，你可以對任意不合適的文本片段進行精確的編輯或刪除操作。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image38.webp)

在左側邊欄中，選擇 **Retrieval Testing** 可以對知識庫進行召回測試，檢查檢索是否正常工作。每次測試會返回若干相似度最高的切片。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image39.webp)

如果你希望看到更多的切片結果，需要點擊 `VECTOR SEARCH` 設置：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image40.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image41.png)

Top K 指的是向量檢索時，返回與查詢向量最相似的前 K 個文本切片數量。當前設置為 3，表示會返回相似度最高的 3 段文本。

Score Threshold 則是一個“得分閾值”：只有相似度得分大於或等於該閾值（示例中為 0.5）的文本片段才會被返回。這樣可以過濾掉相關度較低的內容，讓結果更加準確。

現在知識庫部分就全部準備好了。接下來，點擊頂部菜單欄中的 “studio”，找到剛才創建的智能體，為它接入我們已經配置好的知識庫。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image42.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image43.png)

此時，在每一輪對話中，你都可以在回答中看到被命中的知識庫來源。點擊對應條目即可查看檢索到的具體文本片段。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image44.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image45.png)

## 2.5 更多 DIfy 常見操作

在掌握基礎 Chatbot 和知識庫搭建的基礎內容後，我們可以深入瞭解更多有關 Dify 的使用方式。

### 2.5.1 工作流的導入與導出

還記得之前提到的工作流的中間表示法嗎？Dify 支持通過 DSL（Domain Specific Language） 格式導入和導出工作流。DSL 是一種基於 JSON 的標準化描述方式，能夠完整保留工作流的節點結構、連接關係和配置參數。你可以很容易導入和導出 DSL 文件，分享工作流給其他人使用，或者導入別人的工作流進行參考。具體而言，我們能夠容易在工作臺頁面看到工作流的導入按鈕：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image46.png)

而對於工作流的導出，我們只需要點擊單個工作流塊的右下角即可找到導出按鈕：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image47.png)

通過使用 DSL 文件，你可以輕鬆地在不同 Dify 實例之間遷移或共享複雜的工作流設計。

### 2.5.2 查看更多 Dify 項目

如果你覺得自己搭建的工作流或者智能體過於簡單，Dify平臺提供了豐富的示例項目，幫助你快速瞭解如何構建複雜應用。這些示例項目涵蓋了多種業務場景。你可以點擊 Explora 查看別人構建的工作流進行學習。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image48.webp)

## 2.6 創建第一個 Dify Workflow 應用

完成了 DIfy 的對話智能體構建入門，我們繼續查看如何構建更復雜的 Dify 業務工作流。工作流是Dify將複雜業務邏輯可視化的核心方式，通過它你可以像搭積木一樣構建智能流程。你能夠完整體會資訊如何在不同節點間流轉，判斷邏輯如何部署，人工干預點設置在哪裡，以及最終如何交付一個完整的業務結果。

你可以選擇從空白處創建，或者直接從模板處創建，此處演示如何從空白處創建工作流：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image49.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image50.webp)

在這裡我們會看見兩個選擇，分別是 Chatflow 與 Workflow，這兩者該如何選擇呢？關鍵是你需要理解你所要構建的，其核心是持續對話，還是任務流程。

Chatflow 專為對話而設計。它模擬一個具有記憶和上下文理解能力的對話者，非常適合需要多輪交互、狀態維持的場景。例如在客服諮詢中，它能連貫地理解用戶的後續追問，如同一位耐心的服務人員。其流式輸出的特性也讓交互過程更為自然。簡而言之，當你需要構建一個能“交談”的智能體時，應選擇 Chatflow。

Workflow 則專注於流程的自動化執行。它像一條預設的流水線，擅長處理一次性輸入、多步驟處理、併產生確定性輸出的任務。例如，每日定時生成資料報表、批量處理文件或調用系列API。這類任務通常由事件觸發，無需與人實時互動。因此，當你需要實現“自動化”任務時，Workflow 是更合適的選擇。

為避免選型錯誤帶來的效率低下，你可以通過四個關鍵問題來審視你的任務需求：

1. 任務過程是否需要依賴多次的用戶輸入與調整？
2. 結果的呈現是否需要分步驟、流式地進行？
3. 處理邏輯是否嚴重依賴於之前的交互歷史？
4. 任務是否由事件觸發，且輸入輸出多為一次性完成？

如果前三個問題的答案為“是”，那麼 Chatflow 是理想選擇，典型場景包括智能客服、教育輔導、創意協作等。如果第四個問題特徵顯著，則應選用 Workflow，它更適用於資料清洗、報表生成、批量處理等自動化場景。

此處我們選擇 Chatflow 作為案例進行介紹，點擊 Chatflow 後進入到操作檯界面：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image51.png)

我們來簡單介紹工作流界面的頁面。其中整個界面的核心是中央的編輯畫布，你將以可視化方式在這裡構建應用邏輯。如圖所示，一個基礎的工作流通常始於 START 節點（用於接收輸入），經由連線將資料傳遞至 LLM 節點進行處理，最終通過 ANSWER 節點輸出結果。每個節點代表一個功能模塊，而連線則決定了任務執行的順序。

環繞畫布的是完整的操作與管理功能區。界面頂部提供了全局控制選項，包括測試工作流的 Preview 按鈕和用於上線的 Publish 按鈕。畫布角落則設有縮放、撤銷等視圖控制工具，便於精細調整。

左側面板集中了應用的管理功能。你當前所在的 Orchestrate 選項卡用於流程編排；構建完成後，可通過 API Access 獲取集成憑證；Logs & Annotations 記錄了每次執行的詳細蹤跡，便於調試；而 Monitoring 則為你提供應用運行時的性能與狀態監控。

你可以簡單在該對話工作流 LLM 節點的 SYSTEM 中輸入一些提示詞內容，點擊 Preview 後嘗試運行這個工作流，查看修改 SYSTEM 提示詞後整個工作流確實按照預期在變化。

### 2.6.1 常見節點介紹

Dify 中提供了多種節點，你可以先了解每個節點的基本功能。具體使用時，建議親手嘗試，或參考他人創建的工作流模板，也可以截圖並向大模型詢問該節點的用法、所需參數等。推薦直接在現有模板中替換不同節點，通過他人的使用方式來推測節點的最佳實踐。

在畫布右鍵點擊“Add Node”即可添加節點，也可以在左側的節點面板中查看所有可用節點：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image52.png)

同時，可以打開工具選擇面板，查看支持調用的各類工具：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image53.png)

下面是一些常用節點和工具的簡要說明。不需要一次性全部掌握，建議先留個印象，在實際使用中逐步熟悉，必要時再回查閱。

1. LLM與推理節點

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image54.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image55.png)

此類節點負責工作流中的核心流程。

- LLM節點：核心計算單元，用於調用大語言模型。其配置重點在於提示詞工程與參數調優，將業務問題轉化為模型的執行指令。
- Knowledge Retrieval 節點：知識檢索單元，負責從預設知識庫、外部權威資料源中檢索與業務問題相關的資訊，為 LLM 節點提供精準的知識支撐，幫助減少大語言模型輸出的 “幻覺” 問題。
- Answer 節點：結果輸出單元，負責接收 LLM 處理後的內容，將其整理為符合業務場景需求的最終成果形式。其配置重點在於輸出格式的定義（如話術模板、排版規範）。
- Agent節點：高階決策單元。它不僅調用模型，還可實施多步驟規劃、自主選擇並調用外部工具，適用於需要動態決策的複雜任務鏈。
- Question Classifier 節點：問題分類單元，負責對輸入的業務問題進行類型識別與歸類（比如按問題意圖、主題領域等維度劃分），幫助後續流程精準匹配對應的處理節點（如不同類型的問題適配不同的 LLM 提示詞或工具鏈）。

2. 邏輯與流程控制節點

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image56.png)

此類節點定義工作流的執行路徑與規則。

- 條件節點：如 `IF/ELSE`，通過布爾判斷實現流程分支。其設計關鍵在於條件表達式的嚴謹性，確保邏輯覆蓋所有業務場景。
- Iteration 節點：作為無狀態的批量並行處理單元，它專為子任務間無資料依賴、可獨立處理的場景設計，例如批量翻譯段落、並行審核多條內容或同時生成多份報告。該節點會接收一個輸入數組並自動分片，將每個元素分發至相同處理鏈路並行執行，用戶可在迭代體內通過 {{item}} 訪問當前元素、{{index}} 獲取其索引，輸出則會自動聚合成結果數組；配置時需重點設定並行度以平衡效率與系統負載，同時通過重試策略（如重試次數、間隔）和失敗處理（如記錄日誌、返回默認值）保障批量作業的穩定性。
- Loop 節點：有狀態的遞歸迭代器，適用於結果依賴前一輪輸出的場景，比如多輪參數調優、遞歸式內容優化（如反覆修訂文案直至滿意）及依賴上次結果的鏈式計算。其核心是 “狀態變量”，需在循環開始前初始化（如當前迭代次數、中間計算結果），並在每輪迭代中明確更新以作為下一輪輸入；為防止無限循環，必須定義終止條件（包括基於計數器的 “最多循環 10 次”、基於結果判定的 “滿意度評分 > 9”、基於外部信號的 “檢測到‘停止’輸入”），同時需設置循環超時配置，並規劃異常處理路徑（如跳出循環或重置狀態後重試），確保流程穩定運行。

3. 資料操作與集成節點

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image57.png)

- Code 節點：程式碼處理單元，負責在工作流中執行自定義程式碼邏輯，可實現資料格式轉換、複雜計算等個性化處理需求。其配置重點在於程式碼語法的正確性與執行環境的適配。
- Template 節點：模板處理單元，負責將動態資料填充至預設模板中，生成符合格式要求的內容（如定製化文案、報告框架）。其配置重點在於模板語法的編寫與變量映射規則的設置。
- Variable Aggregator 節點：變量聚合單元，負責收集工作流中多個節點輸出的變量資料，將分散的變量整合為統一資料集。其配置重點在於聚合的變量範圍與資料合併規則的定義。
- Doc Extractor 節點：文檔提取單元，負責從 PDF、Word 等各類文檔中提取文本、表格等關鍵內容，轉化為工作流可處理的結構化資料。其配置重點在於文檔類型的適配與提取內容的篩選規則。
- Variable Assigner 節點：變量賦值單元，負責定義、初始化或更新工作流中的變量，為流程內的資料傳遞提供載體。其配置重點在於變量的命名、資料類型及賦值邏輯的設定。
- Parameter Extractor 節點：參數提取單元，負責從用戶請求、接口返回等輸入內容中提取指定參數，將非結構化資訊轉化為結構化資料。其配置重點在於提取規則（如正則表達式、JSON 路徑）的配置。
- HTTP Request 節點：HTTP 請求單元，負責向外部系統接口發起 HTTP 請求（含 GET、POST 等方法），實現工作流與外部服務的資料交互。其配置重點在於請求地址、請求方法及參數 /headers 的設置。
- List Operator 節點：列表操作單元，負責對數組、列表類型的資料進行處理（如過濾、排序、拆分），調整資料結構以適配後續流程。其配置重點在於操作類型（如過濾條件、排序規則）的定義。

### 2.6.2 常見工具介紹

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image58.png)

在 Dify 中，大部分工具都可以直接作為節點放在畫布上，像其他節點一樣被上下游連線，只要你提供的輸入符合該節點（工具）的參數規範，它就能正常執行併產出可繼續流轉的結果。

在左側或右側的節點面板中，可以查看所有可用工具節點，也可以通過插件市場擴展更多工具能力。簡單介紹幾個常見工具的作用：

- 網路搜索工具
  以 Tavily Search 為代表，為大模型提供面向 AI 優化的實時檢索能力。
  它會返回結構化的搜索結果（如標題、摘要、鏈接等），可以直接作為 LLM 提示詞的一部分，用於回答最新資訊類或需要權威依據的問題。
- 資料處理工具
  例如 JSON Process 插件，用於對 JSON 資料進行查詢、篩選、轉換、合併等高級操作。
  在處理複雜 API 響應或多層嵌套資料時，你可以將“資料清洗 + 重組”的邏輯交給該工具，從而簡化在 Code 節點中頻繁手寫解析程式碼的工作。
- 格式處理工具
  如 Markdown Exporter，可以將生成內容按指定格式導出，例如 Markdown 文檔、特定排版模板等，方便後續用於展示、彙報或集成到其他系統。

你可以在工具列表中看到這些插件的安裝量和簡介，初期可優先嚐試安裝“Featured / 推薦”裡的工具，往往覆蓋了最常見的業務場景。

不過，工具的使用通常比較複雜，建議你在使用的時候可以去搜索引擎先搜索對應工具的“官方推薦工作流 DSL 案例”，直接導入使用，比自己搭建要天然節約很多時間。

### 2.6.3 創建簡單的意圖分類工作流

此時我們已經初步瞭解了 Dify 工作流和工具等的基本資訊，但不經過練習我們永遠不會熟練使用細節，我們需要一個“假設”的真實業務場景來練練手。

例如，在真實的購物對話場景中，前來購買商品的用戶輸入永遠不會是“規範的參數”，而是一句隨口說出的話：有人來下單，有人來抱怨，有人只是想閒聊，也有人完全跑題。如果我們把所有這些輸入都直接交給同一個大語言模型（LLM）處理，系統通常會出現兩個典型問題：

1. 回覆風格不穩定
   同樣是抱怨，有時 LLM 能道歉安撫，有時卻像在“解釋原因”；同樣是點餐，有時會追問缺失資訊，有時則直接編造訂單細節。
2. 業務邏輯不可控
   你希望“抱怨必須先道歉”，但模型未必每次都遵守；你希望“非業務問題要引導回主線”，但模型可能會興致勃勃地和你聊起段子。

因此，更工程化的做法是將任務拆解為一條標準化流水線，先做意圖分類（確定用戶到底想幹什麼），然後再按意圖分流（不同場景使用不同的提示詞與角色），最後對不同分流後大模型的回覆統一封裝輸出（便於前端或系統集成）。

本節的目標是讓系統能處理一個餐飲場景下的多類對話。你可以跟著操作做一遍加深印象。首先需要做的是定義場景為意圖分類：

- **下單購買 (buy_food)** ：用戶表達明確的購買意願。
- _例如：“給我來一份炸雞，再加一杯可樂。”_
- **抱怨投訴 (complain)** ：用戶在表達不滿、催促或負面反饋。
- _例如：“你們也太慢了吧？等一個小時了。”_
- **閒聊諮詢 (chitchat)** ：用戶在進行開放式詢問、尋求建議，但無明確下單指令。
- _例如：“今天吃什麼好呢，你有什麼推薦嗎？”_
- **其他意圖 (other)** ：用戶的輸入與餐飲場景無關。
- _例如：“幫我寫個搞笑文案發朋友圈。”_

針對這四種意圖，我們為系統預設了四種不同的“溝通人格”，分別由四個獨立的 LLM 節點承載，每個節點都需要由具有不同人設的 LLM 進行扮演。

- **下單助手 (LLM_BuyFood)** ：專業、高效，核心任務是確認訂單細節，並主動補全缺失資訊。
- **客服專家 (LLM_Complain)** ：共情、穩重，首要任務是安撫用戶情緒，並提供清晰的解決方案。
- **聊天夥伴 (LLM_Chitchat)** ：輕鬆、友好，旨在提供個性化推薦，引導潛在消費。
- **禮貌門衛 (LLM_Other)** ：專注、邊界清晰，負責將偏離主題的對話禮貌地引導回核心業務。

#### 工作流編排設計

接下來我們進行工作流的編排設定，決定大概需要有哪些工作流節點。對於新手而言，很難想到需要有哪些節點能被用到（對於老手來說也懶得自己思考，用大模型給建議通常是最快最好的選擇），所以我們能夠使用大模型給出對應的編排建議，其核心節點結構如下：

- Start (起點)：作為資料入口，負責接收用戶的原始輸入 `user_text`。
- Question Classifier (意圖分類器)：工作流的“大腦”與“調度中心”。它負責對 `user_text` 進行分析，並從我們預設的四種意圖標籤中選擇最匹配的一個。
- Condition (條件分支)：扮演“分流閥”的角色。它根據分類器輸出的意圖標籤，決定接下來將任務導向哪一個專處理路徑。
- 四個並行的 LLM 節點 (LLM_BuyFood, LLM_Complain, LLM_Chitchat, LLM_Other)：這是四個獨立的“專家處理單元”。每個節點都接收原始問題，但依據自身獨特的 System Prompt（系統提示詞）生成風格和目標截然不同的回覆。
- Variable Aggregator (變量聚合器)：在多條路徑處理完成後，需要一個“匯集點”。此節點將四個分支中唯一被激活併產生結果的回覆，收束成一個統一的變量 `final_reply`，確保了輸出結構的穩定性。
- Output (終點)：作為最終的出口，負責將意圖標籤、原始問題、以及經過處理生成的回覆，以結構化的形式（如 JSON）統一輸出，便於後續系統調用或調試分析。

#### 工作流編排實現

本次教程我們選擇創建 Workflow 而不是 Chatflow，選擇 User Input：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image59.png)

隨後點擊 Start 的 User Input 節點，定義一個名為 `user_text` 的字符串類型變量，作為整個流程的輸入源。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image60.png)

保存後點擊右上角的 Test Run，你能夠看到需要指定對應的文本輸入進行處理：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image61.png)

隨後我們需要點擊輸入節點後的 + 符號，選擇 Question Classifier 節點添加，並且我們需為其配置四類標籤，併為每個標籤提供清晰的描述和示例。

- `buy_food`: 用戶明確想買吃的、點餐、下單。
- `complain`: 用戶在抱怨、吐槽、發脾氣，通常帶有不滿情緒。
- `chitchat`: 用戶在閒聊、討論吃什麼、諮詢推薦。
- `other`: 與餐飲場景無關，或難以判斷的內容。

此外，你還需要在 ADVANCED SETTING 中寫入提示詞，讓大模型能夠正確根據用戶輸入進行分類測試。示例提示詞如下：

```
從 buy_food / complain / chitchat / other 中選擇一個最合適的標籤。如果用戶在抱怨的同時也點了餐，請優先判斷其核心情緒，若重點在於表達不滿，應歸為 complain。如果只是輕微吐槽但主要意圖是下單，則歸為 buy_food。若實在難以判斷，使用 other 作為兜底
```

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image62.webp)

設定完成後，你可以在右上角的播放鍵單獨測試該節點是否能夠正常運行：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image63.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image64.png)

從 OUTPUT 的結果來看，我們的分類是準確的。你可以進行多種不同類型輸入的測試，驗證我們分類器的穩定性。

接下來，我們需要給分類器接上後續的大模型輸出，例如，當 `label` 等於 `"buy_food"` 時，工作流便會精確地流向 `LLM_BuyFood` 節點。我們需要新建四個 LLM 節點，並設置不同的 System Prompt ；不同 System Prompt 的差異決定了它們不同的回應方式。

- LLM_BuyFood (點餐助手)：

你是一個點餐助手。要求：1. 確認用戶想點的內容。2. 如果資訊不完整，友好地補充詢問。3. 語氣禮貌簡潔。

- LLM_Complain (客服專家)：

你是一個餐飲客服，專門處理抱怨。要求：1. 真誠道歉。2. 簡要說明可能的原因（不推卸責任）。3. 給出清晰的下一步解決方案。

- LLM_Chitchat (聊天夥伴)：

你是一個幫人選吃的的聊天小助手。要求：1. 用輕鬆友好的語氣。2. 給出 1~3 個簡單推薦。3. 如果用戶沒有偏好，就給出不同風格的選擇。

- LLM_Other (禮貌門衛)：

你是一個餐飲點餐小助手，只擅長跟‘吃’相關的話題。當用戶說的話無關時：1. 禮貌說明自己的能力範圍。2. 引導用戶回到主場景。

值得注意的是，每個節點裡面在填充了 SYSTEM 的提示詞參數後，你還要記得啟用 USER 提示詞參數表。你需要在其中需要點擊 `{x}` 符號，選擇 `user_text` 參數作為用戶輸入，並且在前面加上 `user input:` 標識這個變量是用戶輸入的意思，在問答的時候會綜合用戶的最開始的輸入和內置提示詞進行回覆。

同樣的，為了確保一切順利，你可以點擊該節點右上角的播放箭進行具體的對話測試驗證效果，比如對話說“我想要喝珍珠奶茶”等，查看回復是否符合預期。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image65.webp)

接下來我們處理並行 LLM 的輸出值，我們在 `Variable Aggregator` 節點的配置面板中，找到 `ASSIGN VARIABLES`（分配變量）區域，點擊後依次將之前的大模型回覆加入即可。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image66.webp)

接下來我們需要對所有的輸出進行聚合，最後得到我們想要的結果，包含用戶的輸入、分類、以及回覆。由於我們使用的是 Workflow 而不是 Chatflow，故沒有 Answer 節點選擇進行結果的聚合，我們能夠選擇其他節點變相實現結果的聚合與輸出，此時選擇 Template 節點，在變量部分指定用戶意圖分類結果、用戶的輸入值、變量聚合的最終回覆，並且在 CODE 中寫入最後回覆的 json 格式模板，我們可以得到：

- `intent` ← `class_name`
- `original_text` ← `user_text`
- `final_reply` ← `variable_aggregator`

```
{
  "intent": "{{ intent }}",
  "original_text": "{{ original_text }}",
  "reply": {{ final_reply }}
}
```

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image67.png)

最後加入 output 節點即完成所有操作：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image68.png)

#### 工作流運行測試

大功告成，我們可以嘗試運行這套工作流的效果。它能根據不同的輸入，展現出截然不同的行為模式：

- 輸入 (點餐): "給我來一份香辣雞腿堡套餐，大杯可樂。"
  - 路徑: `buy_food` → `LLM_BuyFood`
  - 輸出 reply: "好的，一份香辣雞腿堡套餐和大杯可樂已為您記錄。請問套餐裡的薯條需要更換嗎？"
- 輸入 (抱怨): "你們也太慢了吧？我都等一個多小時了！"
  - 路徑: `complain` → `LLM_Complain`
  - 輸出 reply: "非常抱歉讓您等了這麼久，這確實是我們的疏忽，給您帶來了很不好的體驗。我們正在緊急核實您的訂單配送情況，並會為您申請相應的補償，感謝您的耐心與反饋。"
- 輸入 (閒聊): "今天吃什麼比較健康？"
  - 路徑: `chitchat` → `LLM_Complain`
  - 輸出 reply: "追求健康的話，可以試試我們的輕食沙拉系列，或者烤雞胸肉配時蔬。您是喜歡口味清淡一些還是稍微豐富一點的呢？我可以給您更具體的推薦。"
- 輸入 (無關內容): "幫我想個明天開會的笑話。"
  - 路徑: `other` → `LLM_Other`
  - 輸出 reply: "這聽起來是個有趣的挑戰！不過我主要是個美食推薦和點餐助手。如果您需要點些什麼來犒勞一下辛苦工作的自己，我隨時可以幫忙！"

> 隱藏 Bug ：需要說明的是，若你遇到與 aggregation group 相關的奇怪問題，這大概率是 Dify 的一個內置 bug。可能在特定操作下被觸發；如果你曾經開啟又關閉過 AGGREGATION GROUP，系統可能生成過 group 配置且殘留了相關異常參數，即便現在開關看起來是關閉的，這些殘留配置也可能導致問題，比如出現 `any` 相關參數的報錯。此時你只需要刪除該節點並重新創建即可。

在 Test Run 中運行後，我們能夠看到工作流的執行過程，此時根據分類走了正確的流程，並得到了最後的 output 結果。至此，全流程完成。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image69.webp)

## 2.7 運行第一個模板 Workflow 應用

結束了簡單的分類工作流學習，接下來我們需要學習如何運行別人的 workflow，我們只需要稍作改造就可以將其變成自己的工作流。在這裡我們選擇嘗試官方的 DeepResearch 工作流，該工作流能夠幫你構建一個深度搜索框架，使用大模型+搜索引擎給你一個豐富的搜索答案，每一次提問的結果將會包含搜索引用地址和大模型對話的結果。

導入後第一步直接運行，我們根據每一步報錯的地方和原因解決具體問題即可，如果遇到解決不了的問題，你可以截圖後詢問大模型進行解決。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image70.png)

剛進入感覺十分複雜，沒關係，我們點擊右上角的 Preview 運行工作流，直到報錯出現：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image71.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image72.webp)

我們需要根據報錯的節點解決問題，打開後發現是沒有配置 Tavily 的 API Token，Tavily 的搜索API 是一個專為 AI 設計的搜索引擎，提供實時、準確和事實性的結果。此時根據提示操作：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image73.png)

經過處理後，搜索引擎能夠正常工作：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image74.webp)

繼續修正模型調用導致的問題後，你應該能夠得到如下結果，結合大模型理解下的詳細搜索：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image75.png)

我們在最後能夠看到對應的參考文檔地址：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image76.png)

如果你想理解每個環節的作用，最好的方法是將每個環節的 output 記錄為一個變量，最後在輸出的時候打印每個中間變量的結果，還有一個方法就是你可以在上方找到 Process 的過程，點擊後可以查看每個環節的細節：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image77.png)

## 2.8 將 Dify 作為 API 提供方

接下來，我們會嘗試通過 API 調用剛才創建的知識庫智能體 Agent，我們想要讓 Dify 變成一個大模型中樞後端。

還記得之前講過如何通過 API 調用模型嗎？我們需要準備一個密鑰（Key）和一份 API 調用示例（文檔中的 request/response 示例），然後把這些內容發給大模型，讓它幫我們寫出調用服務的程式碼，並從返回結果中解析出我們需要的字段。

這一次，我們會使用本地的程式碼編輯工具 [Trae](https://www.trae.cn/) 來完成這個過程。

如果你還不熟悉什麼是 IDE，可以先閱讀文檔 [Extra Knowledge 4 - What is AI IDE and Trae](/zh-tw/stage-1/introduction-to-ai-ide/)。

如果你的本地開發環境還沒有完整配置好，也不用擔心。只要你信任自己的程式碼助手（不管是 [z.ai](http://z.ai) 還是 Trae），遇到任何不懂的地方或報錯，都可以直接把問題拋給它，它會根據你的描述給出詳細的解決方案。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image78.png)

右側的區域叫做 Copilot 交互窗口，或者 Agent 窗口。如果你看不到它，可以點擊右上角的側邊欄圖標來打開。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image79.png)

打開側邊欄後，你會看到 `Builder` 選項。這就是 Agent 模式。你可以簡單地把 “Builder” 理解為 [z.ai](http://z.ai) 的“開發模式”，它同樣可以幫你操作本地電腦環境、安裝依賴、打開網頁等。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image80.png)

點擊 “Builder” 後，你會看到 “Chat” 模式和 “Builder with MCP” 模式。 Chat 模式主要用於與當前文件夾進行交互，或者和大模型進行自然語言對話。（你可以通過點擊 Trae 左上角的 “File” 打開一個文件夾，然後在該文件夾內進行編輯。這種情況下，Builder 所有的新建文件操作都會發生在這個文件夾中。）

Builder with MCP 模式則為 Agent 提供了更多工具（例如讓大模型連接到其他軟體、獲取天氣資訊等）。你可以簡單地認為 MCP 是一個讓大模型更方便調用各種外部工具的能力集合。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image81.png)

在下方區域，你還可以看到模型選擇的下拉列表，可以點擊切換不同模型。這裡你可以選擇 Kimi k2 或 GLM。如果你使用的是國際版 Trae，也可以選擇 ChatGPT 或 Claude。 不過，隨著國內大模型的快速發展，Kimi、Qwen、GLM 等模型的綜合能力已經基本接近 Claude 3.5 或 3.7，對於日常開發場景來說完全夠用。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image82.png)

上面是對 Trae 的一個簡要介紹。接下來，我們可以回顧在 [z.ai](http://z.ai) 中的操作步驟，並在 Trae 中複用這些思路。

## 2.9 利用 Dify API 創建前端對話應用

如果我們想用 Dify 的 API 搭建一個前端聊天應用，首先需要獲取 Dify 的 API 文檔和調用地址。

還記得剛才創建的那個 Agent 嗎？ 先點擊右上角的 “Publish”，然後點擊 “Publish Update”，最後點擊 “Access API Reference” 進入 API 文檔。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image83.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image84.webp)

進入 API 文檔後，找到 “Send Chat Message” 這一部分，點擊進入，然後在右側找到 “Request” 和 “Response” 示例並複製出來。

為什麼一定要複製這兩部分內容？ 因為它們是 API 的“核心資訊”： 有了 Key、請求示例和返回示例，我們就可以讓大模型幫我們生成調用服務的程式碼，並且根據返回結構把需要的字段提取出來。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image85.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image86.webp)

在找到會話所需的 Request 和 Response 示例之後，我們還需要獲取一個 API Key。在文檔右上角，你會看到 “API key” 相關選項。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image87.png)

點擊 “Create new Secret key”，就可以創建屬於你自己的 API Key。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image88.png)

現在一切準備就緒。我們會把剛才拿到的 API Key、Request 示例和 Response 示例一起交給 Trae Builder。

注意：請將 `{DIFY_API_URL}` 替換為實際的 Dify API 地址。

```json
key:
app-zKdCHUXXXXXXXX

Please write me a front-end based on the following reference:

curl -X POST 'http://{DIFY_API_URL}/v1/chat-messages' \
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

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image89.png)

在這個階段，你可能會發現生成出來的程序並不能一次性正常運行——比如對話會出現奇怪的錯誤，或者沒有任何返回結果。當出現這種情況時，你可以嘗試切換到另一個大語言模型，或者把錯誤資訊複製出來，詳細描述問題，再發給模型讓它根據反饋繼續迭代。

此時你的工作方式已經非常接近真實開發過程了。在日常開發中，我們經常會在與大模型協作時遇到各種問題，為了更好地解決這些問題，我們需要提供更多上下文資訊。除了提供錯誤資訊，你還可以複製更完整的文檔內容（例如在文檔左側 “Send message” 部分中複製更多說明），一併交給模型，讓它在更多細節的基礎上給出更完整的解決方案。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image90.webp)

此時瀏覽器是嵌在 Trae 內部的。你可以點擊頂部的指南針圖標，把網頁在外部瀏覽器中全屏打開。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image91.png)

如果運氣不錯，你可能在第一次嘗試時就能獲得一個可以正常交互的前端頁面。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image92.webp)

不過，由於大模型本身具有一定隨機性，有時你可能在單輪對話中一切順利，但在多輪對話時出現異常。因此，建議你進行多輪對話測試，確保程序在多輪交互場景下也能穩定運行。

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image93.webp)

到這裡，你已經學會了如何構建一個簡單的 Dify 知識庫 Agent，並使用 Trae 替代 [z.ai](http://z.ai) 來搭建一個交互式前端。從現在開始，Trae 將成為我們構建各種原型時的主要開發工具，逐步取代 [z.ai](http://z.ai)。你可以嘗試用 Trae 重新實現之前的貪吃蛇遊戲，看看會有什麼不同的體驗。加油！

# 3. 更多業務工作流參考

你可以在搜索引擎上使用類似關鍵詞搜索 `Dify workflow 參考`，或者直接在 Github 中找到 Dify 工作流分享倉庫進行參考工作流的查找（質量參差不齊，你需要查看多個不同倉庫學習）。當然，所謂的工作流只不過是業務上 SOP 的映射，你可以思考有哪些日常工作中的流程或者學習中的流程是重複可固化的，只需要把它變成工作流固定即可。

以下是一些大模型生成的工作流設計的參考（實際上的實現方案也比較類似，一般來說人類設計的工作流不會有大模型設計的優美，除非是高手設置的工作流），如果你覺得哪些點子有意思，可以將它發給大模型進一步細化，讓大模型幫你給出更具體的 Dify 工作流節點設定，以及內部的細節結果。

## 3.1 社媒平臺工作流

1. 跨平臺內容一鍵分發工作流（複雜）
   1. 思路：以一篇核心稿件為“原料”，自動加工成適配多個平臺的“成品”。
   2. 實現：`Start` 輸入文章 -> `LLM` 潤色 -> 並行多個 `LLM` 節點（每個節點Prompt扮演特定平臺專家，如“小紅書爆款文案專家”、“知乎專業答主”）-> `Iterator` 節點循環處理不同平臺格式要求 -> `Variable Aggregator` 彙總 -> `Answer` 輸出所有版本。複雜度在於並行處理和循環迭代。
2. 熱點話題選題與初稿生成器（中等）
   1. 思路：自動捕捉網路熱點，快速生成選題和內容草稿。
   2. 實現：`Start` 輸入關鍵詞 -> `Tool` 節點調用搜索引擎API抓取熱點 -> `LLM` 摘要提煉出3-5個話題 -> `LLM` 生成文章大綱或初稿。複雜度在於外部工具集成與資訊篩選。
3. 評論區智能分類與回覆助手（複雜）
   1. 思路：自動分析評論情感與意圖，生成分類回覆建議。
   2. 實現：`HTTP Request` 節點接入社媒API獲取評論 -> `Question Classifier` 或 `LLM` 節點進行多標籤分類（積極、疑問、投訴、廣告等）-> `Condition` 判斷節點路由至不同回覆生成鏈 -> 並行 `LLM` 節點生成個性化回覆草稿 -> `Answer` 輸出。複雜度在於條件分支和實時API調用。
4. 短影片腳本與分鏡自動生成器（複雜）
   1. 思路：根據一個熱門話題或產品描述，自動生成短影片腳本、分鏡描述和推薦標籤。
   2. 實現：`Start` 輸入主題 -> `LLM` 生成創意腳本 -> 第二個 `LLM` 節點將腳本拆解為場景序列（畫面描述、臺詞、時長）-> `Tool` 節點調用文本轉語音服務生成語音樣本 -> `Variable Aggregator` 整合所有元素 -> `Answer` 輸出結構化腳本文件。複雜度在於多步驟序列化和外部服務集成。
5. 直播互動問答實時摘要助手（中等）
   1. 思路：實時處理直播間的文字評論，提煉核心問題和觀眾反饋。
   2. 實現：`HTTP Request` 節點流式獲取直播評論 -> `Iterator` 節點以時間窗口為單位處理批資料 -> `LLM` 節點實時總結每段時間內的熱點問題與情緒傾向 -> `Answer` 或 `Webhook` 節點輸出摘要給主播。複雜度在於實時流資料處理和循環窗口。

## 3.2 職場工作流

1. 智能會議紀要與任務自動派發系統（複雜）
   1. 思路：從會議錄音文本中提取紀要，並自動創建任務。
   2. 實現：`Start` 輸入會議文本 -> `LLM` 總結議題與結論 -> `Parameter Extractor` 節點精準抽取Action Items（任務、負責人、DDL）-> 一個 `LLM` 整合成紀要郵件 -> 並行 `HTTP Request` 節點調用Jira/Trello/飛書API創建任務。複雜度在於資訊抽取與多系統聯動。
2. 簡歷批量篩選與初步評估助手（中等）
   1. 思路：自動解析簡歷，進行匹配度評估並生成面試問題。
   2. 實現：`Start` 上傳簡歷文件與JD -> `Document Extractor` 節點解析簡歷文本 -> `LLM` 扮演HR進行匹配度評估 -> 對高匹配者，另一個 `LLM` 生成深度面試問題。複雜度在於文檔解析與多條件評估。
3. 多語言郵件一鍵翻譯與草稿回覆（簡單）
   1. 思路：自動翻譯郵件並起草回覆。
   2. 實現：`Start` 輸入郵件 -> `LLM` 判斷語種並翻譯 -> `LLM` 構思回覆要點 -> `LLM` 翻譯回原始語言並潤色。主要依賴於LLM的序列調用。
4. 週報/月報資料自動彙總與洞察生成（複雜）
   1. 思路：連接多個資料源，自動生成結構化工作報告。
   2. 實現：多個 `HTTP Request`/`Tool` 節點並行調用業務系統API（如CRM、Git、項目管理工具）獲取原始資料 -> `Code` 節點或 `LLM` 進行資料清洗與基礎計算 -> `LLM` 分析趨勢、亮點與風險，生成敘述性報告 -> `Answer` 輸出圖文並茂的文檔。複雜度在於多資料源聚合、資料處理與智能分析結合。
5. 合同/文檔智能審查與要點提煉（中等）
   1. 思路：快速審查法律或商務文檔，提示風險並提煉核心條款。
   2. 實現：`Start` 上傳合同PDF -> `Document Extractor` 提取文本 -> `LLM` 節點（設定為法律專家角色）審查責任條款、支付條件、違約條款等 -> `Parameter Extractor` 節點抽取出關鍵日期、金額、義務方等結構化資料 -> `Answer` 輸出風險提示和要點表格。複雜度在於長文檔處理與結構化資訊抽取。

## 3.3 學習生活工作流

1. 學術論文深度解析與筆記生成器（複雜）
   1. 思路：上傳論文PDF，自動生成結構化筆記。
   2. 實現：`Start` 上傳PDF -> `Document Extractor` 提取全文 -> 並行多個 `LLM` 節點分工總結摘要、方法、發現、參考文獻 -> `Variable Aggregator` 彙總 -> `Answer` 輸出Markdown筆記。複雜度在於並行處理長文本的不同部分。

2. 個性化旅行計劃定製師（中等）
   1. 思路：根據用戶偏好，自動規劃詳盡行程。
   2. 實現：`Start` 輸入需求（目的地、天數、預算、興趣）-> `Tool` 節點調用搜索引擎或地圖API獲取地點資訊 -> `LLM` 整合資訊，設計每日行程（含時間、活動、預算估算）。複雜度在於外部資訊獲取與結構化規劃。

3. 外語學習互動陪練夥伴（簡單）
   1. 思路：創建可角色扮演和語法糾錯的對話機器人。
   2. 實現：系統設定AI角色 -> `Start` 接收用戶語句 -> `LLM` 執行兩項任務：角色回覆 + 語法糾錯與解釋 -> `Answer` 輸出。核心是LLM的多任務指令。

4. 個人知識庫問答與鏈接推薦系統（複雜）
   1. 思路：基於你收藏的文檔、筆記、網頁鏈接，構建一個可問答並能推薦相關舊知識的智能系統。
   2. 實現：離線處理：使用 `Document Extractor` 和 `Embedding` 工具將個人知識庫切片並向量化存儲。在線工作流：`Start` 輸入問題 -> `Retrieval` 節點從向量庫中查找最相關的知識片段 -> `LLM` 基於檢索到的上下文生成答案 -> 同時，另一個分支使用檢索到的內容作為輸入，通過 `LLM` 生成“相關舊知識”推薦列表 -> `Answer` 合併輸出答案與推薦。複雜度在於檢索增強生成（RAG）流程的構建。

5. 健身/飲食計劃追蹤與調整顧問（中等）
   1. 思路：根據用戶輸入的每日飲食和訓練日誌，提供營養分析與訓練建議。
   2. 實現：`Start` 輸入文本日誌（如“午餐：雞胸肉150g，米飯一碗，蔬菜若干；訓練：深蹲5組”）-> `Parameter Extractor` 節點嘗試結構化輸入資料 -> `LLM` 扮演健身教練，分析營養攝入是否均衡、訓練容量是否合適 -> 對比長期目標，給出微調建議（如“蛋白質攝入充足，建議增加蔬菜種類”）。複雜度在於從非結構化日誌中提取結構化資訊並提供個性化反饋。

# 6. 工作流平臺的侷限性

工作流平臺（或稱低程式碼平臺）並非萬能解決方案。它雖然對業務人員友好，降低了直接編碼的門檻，但從另一個角度看，“低程式碼”往往也是一種“高程式碼”——用戶仍需理解平臺的概念、規則與操作邏輯，這本身構成了一種新的學習成本。

也許你想問，很多簡單的工作流其實就是大模型函數包裝後的前後調用，前面函數的輸出作為後者函數的輸入，本質上幾行程式碼就能夠解決，為什麼需要那麼複雜的多重包裝工作流？反而給 API 調用造成了麻煩。

你說得是對的。在當前 vibe coding 的快速發展下，藉助 AI 程式碼生成能力，直接閱讀甚至生成程式碼有時可能更加高效。理想情況下，我們希望能用自然語言直接操作應用邏輯，這才是一個現代的軟體平臺。但目前的工作流平臺尚未實現這一點，因此它在用戶意圖與最終實現之間天然存在一個“中間層”。掌握這個中間層，正是一種需要投入時間學習的成本。理想上，之後的工作流平臺也要支持全 AI 自動對話操作，我們可以讓 AI 真正操作工作流搭建以及入參的每一個細節環節。

儘管如此，熟練使用這類平臺正逐漸成為一項基礎技能，如同微軟的辦公軟體一樣，在業務中非常普遍且實用，值得掌握。

在後續的進階課程中，我們將介紹如何通過程式碼級別的工作流與 RAG 開發平臺進行構建。屆時，你可以親身體驗不同實現方式在複雜度與靈活性上的區別。（值得注意的是，一些簡單的對話應用或嵌套邏輯，用工作流實現可能並不困難。）

# 📚 課後作業

## 掌握 Dify 基本操作

為了測試你掌握了 Dify 的常見基礎使用工具，你需要完成一個基礎作業和兩個 “小挑戰”，確保你已入門常見的操作。你需要將附帶的兩個 DSL 文件導入 Dify 工作流，併成功完成對應工作流的挑戰（遇到不懂的地方截圖詢問大模型，或自己探索其中的每個參數的用法，最後實現目標）。：

1. 參考意圖分類工作流的方法，讓大模型給你建議完全換一套場景進行應用，但是一定要用到意圖分類工作流，最後提交運行的工作流截圖、場景說明、結果。
2. Log in workflow 工作流解密挑戰

在這個解密挑戰中，你需要完成以下挑戰，讓工作流實現下列功能：

- 找出正確的密碼！
- 將密碼修改為 0925
- 當密碼不正確時，提供第二次嘗試機會（不提供第三次）
- 當用戶提及要再次登錄時，為用戶提供重新輸入密碼的機會

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image94.png)

參考輸入輸出：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image95.webp)

3. Love loop workflow 工作流解密挑戰

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image96.png)

在這個解密挑戰中，你需要修復當前工作流的問題，讓工作流最後的輸出類似如下顯示：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image97.png)

如果你遇到無法解決的問題，請截圖詢問大模型，或查閱官方文檔得到結果：[https://docs.dify.ai/en/use-dify/getting-started/quick-start](https://docs.dify.ai/en/use-dify/getting-started/quick-start)

## 實現 Dify API 調用

為了測試你真正掌握了 Dify 的 API 調用知識，你需要完成以下任務：

1. 部署 Dify 並創建一個簡單的知識庫（選取你喜歡的資料)。
2. 使用 Trae IDE 構建一個對話前端，與 Dify 知識庫進行 API 交互。
3. 測試多輪對話的效果，確保程序正常運行。

你需要提交最終運行截圖和知識庫的處理過程截圖。

## 試用第三方工作流 / 構建一個自己的業務工作流

請你在 Github、微信公眾號、或者 Reddit、推特上等所有地方找到你想嘗試的別人的 Dify 工作流，下載導入後成功運行；或者你可以根據上文中提到的業務工作流參考，根據現實中的具體需求創建一個自己的業務工作流進行運行。

最後你需要提交運行成功的截圖，並說明這個工作流的作用。

# [Bug] HTTP 請求錯誤問題的解決方法

如果你遇到了如下圖所示的問題，才需要參考本節方案進行解決，否則可以不理會當前部分。

有時候可能你會把 Dify 部署在自己的服務器，但是服務器的對外地址通常都是 http 而不是 https 的，但當我們請求一個只支持 HTTP 的服務時，你可能會看到類似這樣的提示（啟用 F12 瀏覽器調試資訊模式，查看有問題的點）：

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image98.webp)

出現這個問題的原因，是因為我們默認把 Dify 部署在一臺只支持 HTTP 而不支持 HTTPS 的服務器上。 HTTPS（HyperText Transfer Protocol Secure）是在 HTTP（超文本傳輸協議）的基礎上增加了 SSL/TLS 加密層，可以簡單理解為“更安全版的 HTTP”。

如果要讓服務支持 HTTPS，一般可以：

- 使用其他程序轉發請求（例如在有證書的 nginx 上做反向代理），或者
- 綁定域名後為該域名申請證書。

但這些操作都比較複雜，在這裡我們使用 Zeabur 作為網路轉發網關來解決問題。

Zeabur 的網頁默認是通過 HTTPS 訪問的，因此我們只需要把原來請求的域名轉發到 Zeabur 提供的域名，就可以修復這個問題。

- 原始地址：`http://{DIFY_API_URL}/v1/chat-messages`
- 現在地址：`https://{DIFY_NEW_API_URL}.zeabur.app/v1/chat-messages`

你只需要簡單地把 URL 中的域名部分（公網 IP 或域名）替換為已經在 Zeabur 上部署好的域名即可，我們已經提前在服務裡配置好了轉發功能。

如果你感興趣，也可以自己在 Zeabur 上部署一個轉發服務。在 Zeabur 中創建服務時，選擇 Python，然後填入下面的 Python 程式碼，部署後即可得到一個 https 的地址，https 即可正常使用。

部署完成後，在網路設置中把程序監聽端口設置為本地 8080，並對外暴露該端口。

注意：請將 `{DIFY_API_URL}` 替換為實際的 Dify API 地址。

```python
from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_BASE_URL = "{DIFY_API_URL}"
LISTEN_PORT = 8080

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def proxy_request(path):
    target_url = f"{TARGET_BASE_URL}/{path}"
    if request.query_string:
        target_url += f"?{request.query_string.decode('utf-8')}"

    headers = {key: value for key, value in request.headers if key.lower() not in ['host', 'connection', 'content-length', 'accept-encoding']}

    try:
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
            timeout=30
        )

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        response_headers = [(name, value) for name, value in resp.raw.headers.items() if name.lower() not in excluded_headers]

        return Response(resp.content, resp.status_code, response_headers)

    except requests.exceptions.RequestException as e:
        print(f"Error forwarding request to {target_url}: {e}")
        return Response(f"Proxy Error: Could not reach target server or invalid response: {e}", status=502)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return Response(f"Internal Proxy Error: {e}", status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=LISTEN_PORT, debug=True)
```
