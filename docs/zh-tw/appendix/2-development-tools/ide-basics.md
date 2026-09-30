# 整合開發環境（IDE）基礎

::: tip 💡 學習指南
本章節將帶你深入了解程式設計師的核心生產力工具——**整合開發環境 (IDE)**。我們將從 IDE 的設計理念出發，逐一解析其核心組件，並透過虛擬 IDE 演示其工作原理。
:::

## 不懂的故障排查(How to solve problems)

在學習和使用 IDE 的過程中，你可能會遇到各種看不懂的按鈕、選單或者程式碼報錯。這時候，**不要慌張，利用 AI 助手是最高效的解決辦法**。

**推薦做法：截圖問 AI**

現在的 AI（如 ChatGPT、Claude、DeepSeek 等）都具備強大的識圖能力。當你遇到不認識的介面元素或複雜的程式碼片段時：

1.  **截圖**：截取你不懂的那一部分（比如某個奇怪的圖示，或者一段複雜的設定程式碼）。
2.  **提問**：把圖片發給 AI，並問它：「這個是什麼？有什麼用？」或者「這段程式碼裡的 xxx 是幹嘛的？」。
3.  **追問**：如果 AI 的回答太專業看不懂，繼續問：「請用白話解釋一下，最好舉個生活中的例子。」

<AiHelpDemo />

---

## 0. 引言：需要 IDE 的動機

在軟體開發過程中，程式設計師需要頻繁地進行編寫程式碼、管理檔案、編譯執行、除錯錯誤等操作。如果這些操作都需要在不同的獨立軟體中完成（例如用記事本寫程式碼，用命令列編譯，用資料夾管理檔案），效率將極低且容易出錯。

**IDE (Integrated Development Environment)** 的核心價值在於**整合**。它將軟體開發所需的各種工具（編輯器、編譯器、除錯器、檔案管理器等）整合到一個統一的圖形介面中，提供一站式的工作體驗。

**VS Code 就是一種最流行的 IDE。** 雖然它本質上是一個輕量級的程式碼編輯器，但透過強大的擴充套件系統，它具備了 IDE 的所有核心功能（程式碼編輯、除錯、版本控制等），因此被廣泛視為現代前端和全端開發的首選 IDE。

簡而言之，IDE 旨在最大化開發者的生產力，減少在不同工具間切換的時間成本。

> 🔗 **資源下載**：
>
> - [VS Code 官網下載](https://code.visualstudio.com/Download)
> - [VS Code 網頁版體驗](https://vscode.dev/)
>
> **VS Code (Visual Studio Code)** 是由微軟開發的一款免費、開源、跨平台的程式碼編輯器。它憑藉**輕量級、擴充套件豐富、啟動速度快**等特點，成為了全球最受歡迎的開發工具之一。無論你是寫 Python、JavaScript 還是 C++，VS Code 都能透過安裝擴充套件變成最適合你的「神器」。

---

## 1. 核心介面解析

現代 IDE（以 VS Code 為例）的介面佈局經過精心設計，通常包含以下四個核心區域：

1. **側邊欄 (Sidebar)：資源管理**
   展示專案的檔案樹，支援新建、重新命名、移動和刪除檔案，提供對專案結構的全域檢視和快速存取能力。

2. **編輯區 (Editor Area)：程式碼創作**
   編寫與修改程式碼的核心區域。支援語法突顯、智慧程式碼補全、語法檢查等功能，提供高效、智慧的程式碼編寫環境。

3. **底部面板 (Panel)：執行與回饋**
   與底層系統互動及檢視執行結果。包括終端 (Terminal)、輸出 (Output) 等，用於執行指令、檢視日誌及除錯。

4. **活動欄 (Activity Bar)：功能導覽**
   位於介面最左側，包含檔案總管、搜尋、Git 管理等圖示，用於在不同的工作上下文（如「寫程式碼」與「提交程式碼」）之間快速切換。

---

## 2. 互動演示：功能體驗

百聞不如一見。為了讓你真正感受到 IDE 的便捷，我們為你準備了一個**虛擬的 VS Code 環境**。

**請嘗試以下操作**：

1.  點選右上角的 **「▶ 開始自動導覽」**，跟隨游標瞭解各個區域。
2.  **自由探索**：點選左側圖示切換檢視，或者點選檔名開啟程式碼。
3.  **體驗整合**：你會發現，檔案管理、程式碼編輯、終端執行，都在同一個視窗內無縫銜接。
4.  **安裝擴充套件**：在下拉選單中選擇 **「擴充套件安裝 (Extensions)」** 模式，體驗如何在虛擬商店中安裝 Python 擴充套件。

<ClientOnly>
  <VirtualVSCodeDemo />
</ClientOnly>

---

## 3. 核心機制：VS Code 無所不能的動機

你可能會好奇：為什麼同一個軟體，既能寫 Python，又能寫 C++，還能做網頁開發？它是怎麼做到的？
其實，VS Code 的設計哲學可以總結為一句話：**「核心極簡，能力外掛」。**

### 3.1 極簡核心：只是一個「畫板」

想像一下，你剛下載好的 VS Code，如果不安裝任何擴充套件，它其實**並不懂程式設計**。
此時的它，本質上只是一個**功能強大的文字編輯器**。

- 它負責顯示文字（渲染）。
- 它負責管理檔案（IO）。
- 但它不知道 `print("Hello")` 是 Python 程式碼，也不知道 `int main()` 是 C++ 入口。

### 3.2 擴充套件系統：注入「靈魂」

為了讓 VS Code 能夠「理解」程式碼，我們需要安裝**擴充套件 (Extensions)**。
擴充套件就像是專門的**翻譯官**：

- **Python 擴充套件**：告訴 VS Code 什麼是變數，什麼是函式，怎麼執行 `.py` 檔案。
- **C++ 擴充套件**：告訴 VS Code 如何呼叫編譯器，如何除錯記憶體。

這種設計使得 VS Code 非常輕量——你不寫 Java，就不用背負 Java 的執行環境。

### 3.3 幕後流程：從程式碼到執行

<ClientOnly>
  <IdeArchitectureDemo />
</ClientOnly>

讓我們透過一個具體的場景，來看看 VS Code、擴充套件和底層環境是如何協作的。
假設你寫了一行 Python 程式碼並點選了**執行**或**除錯**：

#### 1. 語言識別 (Activation)

VS Code 偵測到 `.py` 後綴，自動喚醒 **Python 擴充套件**。擴充套件立刻接管了編輯器，開始進行語法分析，將程式碼染上不同的顏色（語法突顯），並提供智慧提示。

#### 2. 任務委託 (Delegation)

當你下達指令時，擴充套件本身並不直接執行程式碼，而是將任務**委託**給底層的專業工具：

- **執行模式**：擴充套件生成一條指令（如 `python main.py`），傳送給系統的**終端**去執行。
- **除錯模式**：擴充套件啟動一個**除錯適配器 (Debug Adapter)**。它就像一個「監控探頭」，連線到 Python 直譯器內部，讓你能一行行地控制程式碼執行。

#### 3. 結果回饋 (Feedback)

Python 直譯器（或編譯器）執行完程式碼，將結果（或錯誤資訊）返回給擴充套件。擴充套件再把這些資訊「搬運」回來，顯示在 VS Code 的**底部終端面板**中。

### 3.4 總結：用「餐廳」來打個比方

如果覺得上面的公式有點抽象，我們可以把寫程式碼的過程想像成**去餐廳吃飯**：

1.  **VS Code 是「餐廳大廳」**：
    - 這裡裝潢豪華，環境舒適（程式碼突顯、好看的主題）。
    - **但大廳本身不生產食物**。你坐在這裡，只是為了更舒服地「點菜」（寫程式碼）。

2.  **環境 (Python/Node) 是「後廚」**：
    - 這是真正**做飯（執行程式碼）**的地方。
    - 如果餐廳沒有後廚（沒安裝 Python），你在大廳坐到天黑也吃不上飯。

3.  **擴充套件 是「服務生」**：
    - 他連線了大廳和後廚。
    - 他看得懂你的選單，跑去告訴後廚：「3 號桌要一份『執行 main.py』！」
    - 做好了，他又把結果（熱騰騰的飯菜）端回到你面前。

**結論**：

- 只裝 VS Code = **只有大廳沒後廚**（只能看，不能吃）。
- 只裝 Python = **只有後廚沒大廳**（能吃，但得蹲在廚房地上吃，體驗很差）。
- **裝了 VS Code + 擴充套件 + Python = 完美的用餐體驗。**

---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const openTarget = () => {
    const hash = window.location.hash
    if (hash) {
      try {
        // Handle encoded Chinese characters in hash
        const target = document.querySelector(decodeURIComponent(hash))
        // If the target is a details element, open it
        if (target && target.tagName === 'DETAILS') {
          target.setAttribute('open', '')
        }
        // If the target is inside a details element, open the parent details
        const parentDetails = target?.closest('details')
        if (parentDetails) {
          parentDetails.setAttribute('open', '')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  openTarget()
  window.addEventListener('hashchange', openTarget)
})
</script>

# 附錄： Visual Studio Code 選單列解析

為了方便大家理解每個選項的含義，在這裡我們對選單列進行深入解析：

![](../../../zh-cn/appendix/2-development-tools/editors-and-ai/images/index-2026-01-09-11-35-55.webp)

![](../../../zh-cn/appendix/2-development-tools/editors-and-ai/images/index-2026-01-09-11-36-23.png)

<details class="custom-block details" id="vscode-file-menu">
  <summary>File（檔案）：專案與檔案的開啟/儲存/工作區管理</summary>

本選單主要負責：**建立/開啟檔案**、**開啟專案資料夾（Folder）**、**管理工作區（Workspace）**、**儲存與關閉**。

> 其中最常用的就是：Open Folder（開啟資料夾） 來開啟一個專案；Open…（開啟…） 來單獨開啟一個檔案；然後用 Save / Save All（儲存/全部儲存） 來儲存修改，最後用 Close Editor / Close Folder（關閉編輯器/關閉資料夾） 結束本次工作。工作區（Workspace）、複製工作區之類的內容可以等你專案多起來再慢慢用，不必一上來全搞懂

- **New Text File（新增文字檔案）**：新增一個未命名文字緩衝區，用於臨時記錄或快速貼上內容。
- **New File…（新增檔案…）**：在專案中建立新檔案（通常會要求你選擇路徑/命名）。
- **New Window（新增視窗）**：開啟一個新的 VS Code 視窗實例。
- **New Window with Profile（使用設定檔新增視窗）**：以指定 Profile（擴充套件/設定組合）開啟新視窗，適合不同課程/專案隔離環境。
- **Open…（開啟…）**：開啟單個檔案進行編輯。
- **Open Folder…（開啟資料夾…）**：開啟一個資料夾作為專案根目錄（最常用的「開啟專案」方式）。
- **Open Workspace from File…（從檔案開啟工作區…）**：開啟 `.code-workspace` 檔案，載入多資料夾/特定設定的工作區。
- **Open Recent（開啟最近）**：快速進入最近開啟的檔案/資料夾/工作區。
- **Add Folder to Workspace…（新增資料夾到工作區…）**：把另一個資料夾加入目前工作區（形成 multi-root workspace）。
- **Save Workspace As…（工作區另存為…）**：將目前工作區結構儲存為 `.code-workspace` 檔案，便於分享/複用。
- **Duplicate Workspace（複製工作區）**：複製目前工作區設定（常用於建立相似專案環境）。
- **Save（儲存）**：儲存目前檔案更改。
- **Save As…（另存為…）**：以新名稱/新路徑儲存目前檔案。
- **Save All（全部儲存）**：儲存所有已開啟且有修改的檔案。

- **Share（分享）**：與共享/協作相關的入口（具體內容取決於版本與擴充套件）。
- **Auto Save（自動儲存）**：切換自動儲存策略（例如延遲儲存/失焦儲存）。
- **Revert File（還原檔案）**：捨棄目前檔案未儲存改動，回到磁碟版本。
- **Close Editor（關閉編輯器）**：關閉目前標籤頁。
- **Close Folder（關閉資料夾）**：關閉目前專案資料夾（工作區變為空）。
- **Close Window（關閉視窗）**：關閉目前 VS Code 視窗。

</details>

<details class="custom-block details" id="vscode-edit-menu">
  <summary>Edit（編輯）：基礎編輯、尋找取代、註解與快速編輯動作</summary>

本選單主要負責：**復原/重做**、**剪下複製貼上**、**尋找取代**、**註解與編輯器動作**（提升編輯效率）。

- **Undo / Redo（復原 / 重做）**：程式碼寫錯了後悔藥，最基礎的操作。
- **Cut / Copy / Paste（剪下 / 複製 / 貼上）**：文字搬運工。
- **Find / Replace（尋找 / 取代）**：在目前檔案中搜尋或批次修改。
- **Find in Files / Replace in Files（在檔案中尋找 / 在檔案中取代）**：全域（全專案）搜尋與取代，非常強大但需謹慎使用。
- **Toggle Line Comment（切換行註解）**：`Ctrl + /`，快速註解/取消註解目前行。
- **Toggle Block Comment（切換區塊註解）**：`Shift + Alt + A`，快速註解/取消註解選取區。
- **Emmet: Expand Abbreviation（Emmet 展開）**：HTML/CSS 開發神器，輸入簡寫按 Tab 展開程式碼。

</details>

<details class="custom-block details" id="vscode-selection-menu">
  <summary>Selection（選取）：多游標與智慧選取區</summary>

本選單主要負責：**游標控制**、**多行編輯**、**擴大/縮小選取區**。這是 VS Code 提升效率的殺手鐧。

- **Select All（全選）**：選取目前檔案所有內容。
- **Expand Selection / Shrink Selection（擴大 / 縮小選取區）**：智慧感知語法結構，逐級擴大或縮小選取範圍（例如：單詞 -> 字串 -> 括號內 -> 整行 -> 函式體）。
- **Copy Line Up / Down（向上 / 向下複製行）**：快速複製目前行。
- **Move Line Up / Down（向上 / 向下移動行）**：`Alt + ↑ / ↓`，無需剪下貼上，直接調整程式碼行順序。
- **Add Cursor Above / Below（在上方 / 下方新增游標）**：`Ctrl + Alt + ↑ / ↓`，開啟多游標模式，同時編輯多行。
- **Add Cursor to Line Ends（在行尾新增游標）**：選取多行文字後，在每一行末尾新增游標。

</details>

<details class="custom-block details" id="vscode-view-menu">
  <summary>View（檢視）：介面佈局與面板控制</summary>

本選單主要負責：**開關側邊欄/面板**、**調整佈局**、**命令面板**、**輸出與除錯控制台**。

- **Command Palette…（命令面板…）**：`Ctrl + Shift + P` / `F1`，VS Code 的總指揮中心，可以搜尋並執行所有命令。
- **Open View…（開啟檢視…）**：快速開啟特定的側邊欄檢視（如檔案總管、原始程式碼管理）。
- **Appearance（外觀）**：控制全螢幕、選單列顯隱、側邊欄位置、縮放級別（Zoom In/Out）。
- **Editor Layout（編輯器佈局）**：拆分編輯器（Split Up/Down/Left/Right），實現分屏對比程式碼。
- **Explorer / Search / Source Control / Run / Extensions**：直接切換活動欄（Activity Bar）的檢視。
- **Problems / Output / Debug Console / Terminal**：直接控制底部面板（Panel）的顯示內容。
- **Word Wrap（自動換行）**：`Alt + Z`，控制長行程式碼是否自動換行顯示（不影響實際檔案內容）。

</details>

<details class="custom-block details" id="vscode-go-menu">
  <summary>Go（前往）：程式碼導覽與跳轉</summary>

本選單主要負責：**在檔案間跳轉**、**在符號（函式/變數）間跳轉**。

- **Back / Forward（後退 / 前進）**：像瀏覽器一樣，在你的游標歷史位置之間跳轉。
- **Switch Editor…（切換編輯器…）**：在已開啟的標籤頁之間快速切換。
- **Go to File…（前往檔案…）**：`Ctrl + P`，輸入檔名快速開啟檔案。
- **Go to Symbol in Editor…（前往編輯器中的符號…）**：`Ctrl + Shift + O`，列出目前檔案的函式/類別/變數，快速跳轉。
- **Go to Definition（前往定義）**：`F12`，跳轉到游標處變數或函式的定義處。
- **Go to References（前往參考）**：`Shift + F12`，檢視該變數或函式在哪些地方被使用了。
- **Go to Line/Column…（前往行/列…）**：`Ctrl + G`，跳轉到指定行號。

</details>

<details class="custom-block details" id="vscode-run-menu">
  <summary>Run（執行）：除錯與執行</summary>

本選單主要負責：**啟動除錯**、**中斷點管理**。

- **Start Debugging（開始除錯）**：`F5`，以除錯模式執行程式（支援中斷點、變數監視）。
- **Run Without Debugging（以非除錯模式執行）**：`Ctrl + F5`，直接執行程式，不駐留除錯器（速度稍快）。
- **Stop Debugging（停止除錯）**：強行結束目前除錯會話。
- **Restart Debugging（重啟除錯）**：重新執行。
- **Toggle Breakpoint（切換中斷點）**：`F9`，在目前行打上或取消紅點（中斷點）。
- **New Breakpoint（新增中斷點）**：支援條件中斷點、日誌中斷點等進階功能。

</details>

<details class="custom-block details" id="vscode-terminal-menu">
  <summary>Terminal（終端）：整合命令列</summary>

本選單主要負責：**新增終端**、**管理終端視窗**。

- **New Terminal（新增終端）**：在底部面板開啟一個新的 Shell（PowerShell/Bash/Zsh）。
- **Split Terminal（拆分終端）**：在同一個終端面板中左右/上下拆分，同時執行多個命令。
- **Run Task…（執行任務…）**：執行 `tasks.json` 中定義的建置/測試任務。

</details>

<details class="custom-block details" id="vscode-help-menu">
  <summary>Help（說明）：文件與回饋</summary>

- **Welcome（歡迎）**：開啟歡迎頁（包含入門引導、最近專案）。
- **Show All Commands（顯示所有命令）**：同命令面板。
- **Documentation（文件）**：跳轉官方文件。
- **Editor Playground（編輯器演練場）**：互動式教學，學習編輯技巧。
- **Check for Updates…（檢查更新…）**：手動檢查更新。
- **About（關於）**：檢視版本號、建置時間、Electron/Node 版本資訊。

</details>