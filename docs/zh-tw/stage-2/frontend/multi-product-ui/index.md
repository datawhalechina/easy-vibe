# 參考 UI 設計規範設計頁面和按鈕

很多人說"我想讓頁面更像 Apple 一點""按鈕想做得更高級一點"，但真正開始做時，往往會卡在一個問題上：

**到底該參考什麼？**

盯著截圖模仿，學到的只是"像不像"。但打開 Apple、Google、Microsoft、Atlassian 的設計規範，你會發現它們真正厲害的地方不是視覺風格，而是**把設計問題講清楚**：頁面先突出什麼、按鈕如何分級、操作怎麼強調——這些判斷標準才是核心。

> 參考設計規範，不是為了做得"像誰"，而是學會別人怎麼做判斷。

:::: info 為什麼現在還要學這些
設計規則早已被訓練進模型、被設計工具默認吸收，甚至貼幾張截圖 AI 就能學會。但我們仍然有必要知道這些規則從哪來、為什麼這樣定。
::::

## 先看幾段原文，感受差距

如果你以前覺得“設計規範不就是講講風格嗎”，先看幾條官方原文。

平時我們在團隊裡經常會這樣說：

- 做個下拉框
- 這裡放個菜單
- 菜單欄加幾個功能
- 這裡放兩個按鈕，一個確認一個取消

聽起來沒問題，但在大廠規範裡，這些詞都不是模糊概念，而是被拆得非常細。

| 平時隨口說的話 | 官方原文 | 簡單說 |
| :--- | :--- | :--- |
| “做個菜單” | Apple: [“A menu reveals its options...”](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` 是拿來做操作的 |
| “菜單欄裡放功能” | Apple: [“menu bar menus contain all the commands...”](https://developer.apple.com/design/human-interface-guidelines/menus) | 這是應用頂部的命令菜單 |
| “做個下拉框” | Apple: [“A pop-up list lets the user choose one option among several.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` 是從列表裡選一個 |
| “也做個下拉框” | Apple: [“A pull-down list is generally used for selecting commands in a specific context.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` 是點開做當前操作 |
| “菜單也能拿來篩選吧” | Fluent: [“If you need to collect information from people, try a select, dropdown, or combobox instead.”](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` 不是拿來選值的 |
| “菜單也能當導航吧” | Material: [“Menus should not be used as a primary method for navigation within an app.”](https://m1.material.io/components/menus.html) | `Menu` 不是主導航 |
| “按鈕隨便寫個 OK / Cancel” | Apple: [“Always use ‘Cancel’ to title a button that cancels the alert’s action.”](https://developer.apple.com/design/human-interface-guidelines/alerts) | 按鈕文字不能隨便寫 |

> 表格裡的引文都可以直接點擊，跳到對應的官方頁面。

這就是第一次真正看設計規範時最容易被震到的地方：

> 我們平時以為自己在討論 UI，實際上很多時候只是在用一堆含糊詞交流。

Apple 不會只說“做個菜單”；它會繼續區分：

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent 不會只說“下拉框”；它會繼續區分：

- `menu`
- `dropdown`
- `select`
- `combobox`

這就是設計規範的必要性。

它不是為了讓頁面顯得更專業，而是為了讓團隊在討論 UI 時，不再每個人腦子裡都是不同的東西。

光看名字很難體會這些差別。下面兩個控件長得幾乎一樣。你可以分別點開，各選一項試試，看看它們的行為有什麼不同：

<UiSpecLookalikeControlsDemo />

這兩個控件在 Apple 規範裡各有一頁，可以對照著看：[Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) 和 [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)。

## 你將學到

1. 為什麼設計頁面和按鈕時要先看設計規範
2. Apple、Material、Fluent、Atlassian 這些規範裡，哪些內容最值得參考
3. 如何把“頁面層級”和“按鈕層級”設計清楚
4. 一份成熟的規範會把一個按鈕定義得多細
5. 如何讓 AI 參考別人的規範來生成頁面和按鈕

每一部分都配有可以動手試試的圖解。

## 1. 設計規範為什麼能幫你把頁面做清楚

看完上面這些原文，你會發現一個關鍵點：

**設計規範不是錦上添花，而是在先把詞說準。**

很多頁面不好看，不是因為配色不夠高級，而是因為資訊層級混亂。

先看一個例子。下面是同一個「項目列表頁」的兩種做法，文字一模一樣，我只改了層級。你可以這樣看：

- 把滑鼠移到下方表格的任一列，左右兩張圖會同時標出問題出現在哪裡
- 點點右圖上方的開關，看看每關掉一項改進，頁面會變回什麼樣子
- 拖動「瞇眼測試」的滑桿。畫面模糊後，左圖裡的東西還是都在搶你的注意力，右圖只剩標題和主按鈕看得見

<UiSpecHierarchyCompareDemo />

很多按鈕不好用，也不是因為圓角不對，而是因為：

- 主按鈕太多，用戶不知道該點哪個
- 危險按鈕和普通按鈕看起來差不多
- 頁面裡所有按鈕都在搶注意力
- 不同頁面裡的按鈕樣式和語義不一致

成熟的設計規範，恰好就是在解決這些問題。它們通常會定義：

| 規範內容 | 它解決什麼問題 |
| :--- | :--- |
| **頁面層級** | 先看哪裡、後看哪裡，資訊怎麼組織 |
| **視覺基礎** | 顏色、間距、字體、圓角、陰影怎樣統一 |
| **按鈕層級** | 主按鈕、次按鈕、文字按鈕、危險按鈕如何區分 |
| **狀態規則** | hover、focus、disabled、loading 怎麼表現 |
| **交互語義** | 哪個按鈕是“確認”，哪個是“取消”，哪個是“更多操作” |

所以，設計規範真正提供的不是一套“皮膚”，而是一套**判斷標準**。

### 1.1 打開一份設計規範，裡面有什麼

上面這張表只有五列，只說了個大概。你可能會好奇，真的打開一份設計規範，裡面到底有多少東西？

我們拿 Apple 的規範目錄來數一數。你可以點點下面的主題，再用上方的開關挑出和「頁面」「按鈕」有關的主題：

<UiSpecSpecMapDemo />

這一章先挑出和「頁面」「按鈕」最有關的幾部分，讓你弄懂它們，整份規範不用背。想看完整目錄，可以直接打開 [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)。

## 2. 參考大廠規範時，重點看什麼

這幾套規範各有擅長的地方。你想了解某件事時，可以先用下面這張表看看該去哪套規範找答案。

| 你想知道 | 可以看 Apple | 可以看 Material |
| :--- | :--- | :--- |
| 一個組件要定義到多細 | 它的用途、角色、行為和無障礙設計 | 它的結構、樣式配置和狀態 |
| 頁面怎麼呈現層級 | 導航關係、文字樣式，以及內容和控件的層級 | 頁面骨架，包含導航、內容和操作各自的位置 |
| 操作怎麼分主次 | 分別定義按鈕的角色和顯眼程度 | Filled、Tonal、Outlined、Text 各級的強調程度 |
| 怎麼做到剋制 | 減少重複，把相關的命令放在一起 | 每個區塊只負責一件事 |

選規範時要留意混用的問題。比如把「Apple 的玻璃質感 + Material 的全套按鈕樣式」拼在一起，往往會把兩邊的規則都弄丟。可以先選定一套，從頭到尾維持一致。

### 2.1 參考 Apple：學習“定義得足夠細”這件事

Apple 最值得學的，不只是視覺上的剋制感，而是它會把概念定義得非常細。

同樣是很多團隊口中的“菜單”或“下拉框”，Apple 會繼續往下拆：

- `menu`：一組命令、選項或狀態
- `menu bar menu`：應用級命令集合
- `pop-up button`：選擇一個值
- `pull-down button`：在當前上下文裡觸發命令
- `context menu`：與當前對象或任務相關的常用動作

這套區分非常重要，因為它會直接影響：

- 這個組件是拿來選值，還是拿來做動作
- 它屬於頁面局部，還是屬於應用級
- 它應該長期顯示當前選中值，還是隻臨時展開命令

當你開始按這種粒度思考時，你設計出來的頁面就會一下子清楚很多。

#### 一個按鈕，要定義到多細

「定義得足夠細」到底是什麼意思？我們拿最普通的按鈕來試試。你平常說「加個按鈕」，腦中可能只想到「藍色、圓角、高度 40」。成熟的規範還會接著問 10 個問題。下面這張「規格書」逐一列出了這些問題，你可以從左邊一項項點開，看看每一項要交代到什麼程度。

<UiSpecButtonSpecDemo />

點完你會發現，顏色、圓角和字級只佔其中一小部分。定義夠詳細，另一位設計師或工程師光看規格，就能做出一模一樣的東西。

其中「狀態」和「行為」最容易漏掉，因為靜態截圖根本看不出來。你可以在下面親手試試：把滑鼠移上去、按住不放、用 Tab 鍵把焦點移到按鈕上，再點一次「發佈項目」，看看完整過程。

<UiSpecButtonStatesDemo />

想看看官方的按鈕長什麼樣，可以打開 Apple 的 [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) 和 Material 的 [Buttons](https://m3.material.io/components/buttons/overview)。

回頭看看本章開頭那兩個長得一樣的下拉控件，你應該能理解為什麼它們不能互換。規範除了定義外觀，也定義了**控件對用戶的承諾**：點下去，一個會「幫你換個值」，另一個會「替你做件事」。

同樣的道理也能回答一個常見的問題：為什麼「刪除」不能因為危險就做成最顯眼的按鈕？風險和重要性要分開看。按鈕的角色說明風險，樣式則反映操作的重要性。

規範裡還有不少外觀相似、用途不同的組合。下面挑了幾對常見的。下次遇到它們，可以先問自己，用戶點下去是想做什麼？

| 容易搞混的兩種設計 | 各自負責什麼 | 舉個例子 |
| :--- | :--- | :--- |
| 分頁導航 / 工具列 | 分頁負責在幾個主要區域之間切換，工具列提供目前頁面的操作 | 「項目」「設定」是要去哪裡，「刪除所選項目」則是要做什麼 |
| 開關 / 按鈕 | 開關在兩個狀態之間切換，按鈕觸發一個動作 | 「接收通知」用開關，「提交」用按鈕 |
| 選擇器 / 菜單 | 選擇器從幾個值裡挑一個，菜單用來執行命令 | 「依最近更新排序」用選擇器，「重新命名」放進菜單 |
| 確認對話框 / 側邊面板 | 確認對話框用來傳達必須馬上知道的重要資訊，側邊面板用來完成一件範圍明確的任務 | 「確定要刪除嗎」用確認對話框，「新建資料夾」用側邊面板 |

### 2.2 參考 Apple：學習頁面層級和剋制感

Apple Human Interface Guidelines 特別適合學習兩件事：

- 頁面如何建立清晰層級
- 控件如何在不喧賓奪主的前提下保持明確

Apple 強調 `Hierarchy`、`Harmony`、`Consistency`。這意味著頁面設計時要回答：

- 當前頁面最重要的資訊是什麼
- 用戶的主要任務是什麼
- 哪個操作該最顯眼，哪個操作應該退後

如果你參考 Apple 來設計頁面，可以重點借鑑：

- 首屏資訊不要太碎，核心內容先聚焦
- 用留白、字號、分組建立秩序，而不是靠堆很多邊框
- 按鈕不要全部高強調，只有關鍵動作才應該最突出

#### 圖解：頁面解剖圖

把上面幾條建議用在實際頁面上，會是什麼樣子？把滑鼠移到左側的任一層級，或點一下把它固定，右邊就會指出它在頁面上的位置，以及它怎麼讓你注意到它。勾選「顯示參考線」，還能看到間距是怎麼分配的。

<UiSpecPageAnatomyDemo />

看完可以留意右圖的三個細節：

- **靠字級、字重和顏色深淺拉開層級。** 最大的字級在頁面裡只用了一次，也沒有把每個標題都加粗
- **輔助資訊緊鄰它所說明的主資訊**，字更小、顏色更淺，但還是要讓人看得清楚
- **主按鈕只有一個**，讀完內容才會看到它

想看官方是怎麼講的，可以打開 Apple 的 [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) 和 [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) 頁面。

#### 圖解：為什麼「去掉邊框」反而更清楚

「用留白、字號、分組建立秩序」很容易被理解成「把邊框都刪掉」。真的是這樣嗎？你可以依序點下面三個步驟，看看分組從哪一步開始變清楚：

<UiSpecGroupingDemo />

到了第三步，你會發現真正起作用的是間距。把相關內容放近一點，光靠位置就能讓人看出分組。所以要**先分組，再決定要不要加邊框**。某一組確實需要更明顯的邊界時，再加一層底色或輪廓。

Apple 的 [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) 頁面也有一組前後對照圖，說明如何把相關命令放在同一組。

### 2.3 參考 Material：學習清晰的頁面結構

Material Design 很適合學習“頁面是怎麼組織任務流”的。

它的很多組件和佈局規範，核心都在幫助你明確：

- 頁面是瀏覽型，還是執行任務型
- 當前頁面是讓用戶閱讀、選擇，還是提交
- 一個頁面裡哪些元素應該穩定重複，哪些元素應該響應上下文變化

如果你參考 Material 來設計頁面，可以重點借鑑：

- 頁面區塊清楚，模塊職責明確
- 導航、內容區、操作區分工清晰
- 不同按鈕樣式對應不同操作優先級

#### 圖解：導航、內容、操作各管哪一段

「分工清楚」說起來簡單，實際要怎麼分？Material 把頁面分成三種職責：導航告訴你「去哪裡」，內容讓你知道「看什麼」，操作讓你知道「做什麼」。每個操作也都要讓人看得出它會影響哪些內容。

下面這張圖就照這個思路拆解了一個頁面。把滑鼠移到左邊任一項，看看實線和虛線分別指向哪裡：

<UiSpecPageSkeletonDemo />

看的時候可以留意三點：

- **頂端列的兩側各有分工。** 返回和標題在左邊，操作在右邊，右邊只突出一個按鈕。相關的操作放在一起，其他操作用留白隔開，這就是「剋制」
- **不同操作影響的範圍可能差很多。** 「新建項目」影響整份列表，「打開」只影響一筆
- **放錯位置，操作範圍就不清楚了。** 勾選「試試把『刪除』移到頂端列」，你會發現根本看不出它會刪掉哪一筆

想看官方的原圖，可以打開 Apple 的 [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) 和 Material 的 [Layout](https://m3.material.io/foundations/layout/layout-overview/overview)。

### 2.4 參考 Fluent：學習組件邊界和按鈕層級

Fluent 2 很適合後臺、工具型產品和複雜表單系統。它最值得學的地方，是會直接告訴你“不要混用概念”。

例如它明確寫到：如果你要“collect information”，就不要繼續用 `menu`，而應該考慮 `select`、`dropdown`、`combobox`。

這句話非常重要，因為它把很多人腦中的“都差不多”打碎了。

Fluent 2 也很重視：

- 操作層級
- 組件語義邊界
- 密集資訊場景下的清晰度

如果你參考 Fluent 來設計按鈕，可以重點借鑑：

- `Primary button` 用來承接當前最重要的動作
- `Secondary button` 用來承接支持性動作
- `Subtle`、`Transparent` 這類弱強調按鈕用於不該搶主流程的操作
- 頁面裡的按鈕數量越多，越要控制視覺優先級


#### 圖解：四級按鈕怎麼用

「控制視覺優先級」具體是什麼意思？你可以在下面的示範裡親手試試：

<UiSpecFluentButtonsDemo />

### 2.5 參考 Atlassian：學習系統化地管理頁面和按鈕

Atlassian Design System 特別適合“一個團隊做很多頁面”的情況。它強調：

- foundations 是共享基礎
- tokens 是統一視覺決策的方法
- components 是被反覆複用的交互構件

如果你參考 Atlassian 來做頁面和按鈕，最有價值的是：

- 把按鈕尺寸、顏色、圓角、間距做成統一規則
- 把頁面佈局的節奏固定下來
- 讓不同頁面雖然內容不同，但結構語言一致


#### 圖解：把樣式變成設計 token

「統一規則」聽起來有點抽象。你可以拖動右邊的滑桿，再勾選「各做各的」，比較有沒有這套規則的差別：

<UiSpecTokensDemo />

## 3. 設計頁面時，應該參考規範裡的哪些點

當你看一個設計系統時，不要先問“這個頁面好不好看”，而要先問下面幾個問題。

### 3.1 頁面第一眼，主次是不是明確

一個頁面通常至少要有三層：

- **主資訊**：當前頁面最重要的內容
- **輔助資訊**：幫助理解或補充的內容
- **次級操作**：不應該干擾主任務的動作

如果三層沒有拉開，頁面就會“都重要”，等於“都不重要”。


拖動下面的滑桿，親手把這三層拉開：

<UiSpecThreeLayersDemo />

### 3.2 頁面佈局，是不是服務任務而不是堆模塊

參考規範時，可以特別注意：

- 標題區有沒有明確頁面目標
- 主內容區是不是圍繞任務組織
- 操作按鈕是不是貼近相關內容
- 次要資訊有沒有被弱化


最後一點值得多說一句。想知道「次要資訊有沒有被弱化」，很多時候只要看看它有沒有放在該放的位置：

<UiSpecTaskFlowLayoutDemo />

### 3.3 頁面裡的操作，是不是有優先級

很多頁面一眼看過去有 6 個按鈕，結果每個按鈕都像 CTA，這是典型的層級失控。

更合理的方式是：

- 一個區域通常只有一個主動作
- 次級動作可以用描邊、文字按鈕或更弱的樣式
- 風險動作不要和主動作長得一樣


這兩種做法你其實已經看過了。第 1 節的對照圖讓你看到按鈕太多時的樣子，2.4 節的 Fluent 圖解則示範了怎麼把它們分級。

### 3.4 怎樣判斷哪些該強調、哪些該弱化

你可以回到第 1 節，再拖一次「瞇眼測試」的滑桿，把頁面模糊到看不清文字。這時還看得見的東西，就是最搶眼的。哪些該強調、哪些該弱化？可以參考下面的分類：

- **值得強調**：頁面標題、用戶目前任務的核心內容、下一步的主要操作
- **應該弱化**：中繼資料、補充說明、次要入口
- **一律不該強調**：裝飾性邊框、每個模塊都加上的標題、跟主要操作搶注意力的次按鈕

如果模糊後滿畫面都是差不多大小的黑塊，代表每樣東西都在喊「看我」，結果哪一樣也沒能突出。

## 4. 設計按鈕時，應該參考規範裡的哪些點

按鈕是最容易被“隨手設計”的部分，但也是最能暴露系統是否成熟的部分。

### 4.1 按鈕先分“語義”，再分“樣式”

不要先想“藍色按鈕還是黑色按鈕”，先想這個按鈕是什麼角色。

常見按鈕角色可以這樣分：

| 按鈕類型 | 作用 | 常見樣式策略 |
| :--- | :--- | :--- |
| **Primary** | 當前區域最關鍵動作 | 實心、高對比、最顯眼 |
| **Secondary** | 支持性動作 | 描邊或低一級強調 |
| **Tertiary / Text** | 弱操作 | 文字或低視覺佔比 |
| **Destructive** | 刪除、停用、清空等風險操作 | 警示色或明確風險樣式 |
| **Icon button** | 局部工具操作 | 簡潔、靠近上下文 |


放到頁面上，它們長這樣：

<UiSpecRoleSamplesDemo />

### 4.2 一個頁面不要有太多 Primary Button

這是很多新手最容易踩的坑。

如果頁面上有 4 個主按鈕，那麼等於沒有主按鈕。主按鈕的意義本來就是“告訴用戶現在最應該做什麼”。

你可以借鑑很多設計系統的共同做法：

- 一個主要區域通常只保留一個主按鈕
- 取消、返回、關閉一般不和確認按鈕搶同級
- 更多操作放到次級按鈕或菜單中

#### 輪到你來判斷

看懂規則之後，來試著用用看。下面這個頁面有 5 個長得一模一樣的按鈕，你覺得哪一個應該是主按鈕？

<UiSpecButtonDecisionDemo />

做完這題你會發現，判斷時其實只要問三件事：用戶最想完成什麼？哪些操作只是輔助？哪個操作一做就無法復原？以後要分辨按鈕的主次，可以先問一遍這三個問題。

### 4.3 按鈕要能表達狀態變化

設計規範通常會對按鈕狀態寫得很清楚：

- 默認態
- 懸停態
- 聚焦態
- 禁用態
- 加載態
- 危險態

這很重要，因為按鈕不是一張靜態圖，而是用戶操作過程中最常被觸發的控件之一。


這六種狀態長什麼樣、怎麼區分？可以回到 2.1 節的「按鈕的狀態與行為」示範親手試試。

### 4.4 按鈕文案，也屬於設計的一部分

按鈕文案不只是“文案問題”，它直接影響用戶理解。

例如：

- `保存`
- `保存更改`
- `立即發佈`
- `刪除項目`
- `移到回收站`

這些文案傳達的心理預期完全不同。成熟規範通常會要求按鈕標籤清楚表達動作，而不是使用含糊詞。


下面是幾種常見的含糊寫法，以及可以怎麼改：

| 含糊的寫法 | 更好的寫法 | 為什麼 |
| :--- | :--- | :--- |
| 確定 | 保存草稿 | 一眼看出點下去會發生什麼 |
| 提交 | 發佈文章 | 動詞加上對象，一看就懂 |
| 是 / 否 | 刪除項目 / 取消 | 把後果直接寫在按鈕上 |
| 點這裡 | 查看訂單詳情 | 單看按鈕就知道會去哪裡 |
| OK | 重新寄送郵件 | 同一頁可能有好幾個 OK，很難分辨各自的用途 |

## 5. 一個很實用的頁面與按鈕設計清單

你自己設計頁面時，可以先快速過一遍這張清單：

### 頁面清單

- 頁面標題是否清楚說明當前任務
- 首屏最重要的資訊是否一眼可見
- 頁面是不是按任務流程組織，而不是按想到什麼放什麼
- 同一個區域裡是否只有一個主要動作
- 次要內容是否被適當弱化
- 用戶能不能隨時知道自己在哪裡、怎麼回去
- 載入中、沒有資料、請求失敗時，頁面分別會顯示什麼
- 視窗變窄、字級放大時，有沒有內容被擋住或被截斷

### 按鈕清單

- 這個按鈕是主動作還是次動作
- 它為什麼值得比別的按鈕更顯眼
- 頁面裡是不是有太多主按鈕
- 危險操作是否被明確標識
- 按鈕文案是否足夠具體
- 點下去之後，用戶能不能馬上知道操作有沒有觸發、結果是什麼
- 只用鍵盤，能不能把焦點移到按鈕上，並且看清楚焦點在哪裡

### 可重複使用的定義範本

清單可以用來檢查，範本可以用來寫規格。試著填完下面這張表，一個頁面或組件的基本定義就齊了：

| 定義項目 | 怎麼填 |
| :--- | :--- |
| **任務** | [誰] 在 [情境] 下，透過這個頁面完成 [任務]，結果是 [可驗證的結果] |
| **層級** | 主資訊 [ ]、輔助資訊 [ ]、預設先顯示 [ ] |
| **操作** | 主動作 [ ]、次動作 [ ]、危險動作 [ ] 及其防護方式 [ ] |
| **視覺** | 使用的組件 [ ]、字級、顏色和間距遵循的規則 [ ] |
| **狀態** | 載入中 [ ]、沒有資料 [ ]、失敗 [ ]、成功 [ ]、無法使用 [ ] |
| **無障礙** | 無障礙名稱 [ ]、鍵盤操作和朗讀順序 [ ]、對比度 [ ] |
| **適應不同情境** | 窄視窗 [ ]、大字級 [ ]、較長的文案 [ ] |
| **使用限制** | 什麼時候不適合用它 [ ]、替代方案 [ ] |

驗收方法很簡單。找一位沒參與設計的人，請他只看這張表，把「進入、瀏覽、操作、失敗、離開」的流程說一遍。如果他講到一半還得問你，表示這份定義還沒寫完。

## 6. 怎樣用 AI 參考別人的規範來設計頁面

這一節最實用。

很多人讓 AI 設計頁面時，只會說：

```md
幫我做一個設置頁面，要高級一點，參考蘋果風格
```

這類提示詞太模糊了，AI 最後通常只能模仿“白底、圓角、陰影”。

對新手來說，更實用的方式不是自己總結一大段，而是直接把**規範原文裡的關鍵句**貼給 AI。

這樣做有兩個好處：

- 你不用自己先“翻譯”一遍設計思想
- AI 更容易按官方定義去理解頁面和按鈕

### 6.1 例子一：讓 AI 參考 Apple 設計一個設置頁面

先找一句 Apple 原文：

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

你可以直接這樣貼給 AI：

```md
參考 Apple Human Interface Guidelines 裡的這句話：
"Establish a clear visual hierarchy..."

幫我設計一個賬號安全設置頁面。
要求頁面層級清楚，重要資訊放前面，分組整齊一點。
```

這樣寫的重點是：不用你自己解釋太多，直接把 Apple 的原話貼進去。

### 6.2 例子二：讓 AI 參考 Fluent 設計後臺頁面按鈕

先找一句 Fluent 原文：

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

你可以直接這樣貼給 AI：

```md
參考 Fluent 2 裡的這句話：
"Only use one primary button in a layout..."

幫我設計一個團隊管理後臺的按鈕。
添加成員按鈕最明顯，導出、篩選、更多操作弱一點，刪除按鈕單獨突出。
```

這一句非常適合新手，因為它直接告訴 AI：一個區域不要放太多主按鈕。

### 6.3 例子三：讓 AI 同時參考頁面規範和按鈕規範

你也可以一次貼兩句原文，讓 AI 同時參考頁面和按鈕：

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

然後直接這樣寫：

```md
參考下面兩句設計規範原文：
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

幫我設計一個項目詳情頁。
頁面包含項目介紹、成員、最近活動和設置入口。
頁面層級清楚一點，主按鈕只保留一個，其他按鈕弱一點。
```

這種方式特別適合新手，因為你只要會複製原文，再加兩句自己的需求就夠了。

### 6.4 動手做：把圖解裡的規則寫進提示詞

前面的圖解雖然是給人看的，每一條規則也都能直接變成給 AI 的要求。以第 1 節那張調整前後的對照圖為例，你可以把圖裡的改法直接寫給 AI：

```md
參考 Fluent 2 的按鈕規範和 Apple HIG 的 Layout，幫我設計一個項目列表頁面。

頁面要求：
- 頁面標題的字級最大，而且只出現一次。篩選和操作分開放在不同列
- 用留白和字級建立層級，不要給每個模塊都加邊框
- 整個頁面只保留一個主按鈕（新建項目），導出用描邊按鈕
- 刪除只影響單一項目，放進每一筆的「更多」菜單，不要放在頁面頂部

按鈕要求：
- 按鈕要定義預設、懸停、按下、聚焦、禁用、載入六種狀態
- 刪除按鈕用警示色，但不要做成主按鈕
```

這樣寫比「要高級一點、參考蘋果風格」具體得多，因為 AI 知道該用**哪些標準來做設計判斷**。

## 7. 怎樣用 AI 參考按鈕規範來直接生成按鈕設計

如果你只想先做按鈕，也可以直接貼按鈕規範原文。

例如 Atlassian 對按鈕的定義很短：

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

你可以這樣問 AI：

```md
參考 Atlassian 的這句話：
"A button triggers an event or action."

幫我設計一套後臺頁面按鈕樣式。
我要有主按鈕、次按鈕、刪除按鈕，順便告訴我分別用在什麼地方。
```

這類提示詞尤其適合新手，基本就是“貼原文 + 說需求”。

## 8. 小結

參考 UI 設計規範設計頁面和按鈕，最重要的不是“做得像誰”，而是學會下面這幾件事：

1. 用層級組織頁面，而不是把內容堆上去
2. 用按鈕分級表達操作優先級，而不是讓所有按鈕都一樣搶眼
3. 用設計規範裡的定義、邊界和判斷標準指導設計
4. 讓 AI 參考別人規範時，參考的是“原則和結構”，而不是隻參考皮膚

當你這樣使用規範時，你參考到的就不只是一個風格，而是一套成熟的設計思考方式。

---

## 參考資料

以下鏈接都來自官方設計系統或官方文檔：

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design 3: [Layout overview](https://m3.material.io/foundations/layout/layout-overview/overview)
- Material Design 3: [Buttons accessibility](https://m3.material.io/components/buttons/accessibility)
- Apple Human Interface Guidelines: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- Apple Human Interface Guidelines: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Apple Human Interface Guidelines: [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Apple Human Interface Guidelines: [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
- Apple Human Interface Guidelines: [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
