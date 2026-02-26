# Integrated Development Environment (IDE) Basics

::: tip 💡 Learning Guide
This chapter will take you deep into the core productivity tool for programmers—the **Integrated Development Environment (IDE)**. We'll start from the design philosophy of IDEs, analyze their core components one by one, and demonstrate their working principles through a virtual IDE.
:::

## What to Do When You Don't Understand Something? (How to solve problems)

In the process of learning and using an IDE, you may encounter various buttons, menus, or code errors that you don't understand. At this time, **don't panic—using an AI assistant is the most efficient solution**.

**Recommended Approach: Screenshot and Ask AI**

Modern AIs (such as ChatGPT, Claude, DeepSeek, etc.) have powerful image recognition capabilities. When you encounter unfamiliar interface elements or complex code snippets:

1.  **Screenshot**: Capture the part you don't understand (such as a strange icon or a complex configuration code).
2.  **Ask**: Send the image to AI and ask: "What is this? What's it for?" or "What does xxx do in this code?"
3.  **Follow up**: If AI's answer is too technical to understand, continue asking: "Please explain it in plain language, preferably with a real-life example."

<AiHelpDemo />

---

## 0. Introduction: Why Do We Need an IDE?

In the software development process, programmers need to frequently write code, manage files, compile and run programs, debug errors, and so on. If all these operations needed to be completed in different independent software (for example, using Notepad to write code, command line to compile, and file folders to manage files), efficiency would be extremely low and error-prone.

The core value of an **IDE (Integrated Development Environment)** lies in **integration**. It integrates various tools needed for software development (editor, compiler, debugger, file manager, etc.) into a unified graphical interface, providing a one-stop working experience.

**VS Code is one of the most popular IDEs.** Although it is essentially a lightweight code editor, through its powerful plugin system, it has all the core functions of an IDE (code editing, debugging, version control, etc.), and is therefore widely regarded as the preferred IDE for modern frontend and full-stack development.

In short, IDEs aim to maximize developer productivity and reduce the time cost of switching between different tools.

> 🔗 **Resource Downloads**:
>
> - [VS Code Official Download](https://code.visualstudio.com/Download)
> - [VS Code Web Version Experience](https://vscode.dev/)
>
> **VS Code (Visual Studio Code)** is a free, open-source, cross-platform code editor developed by Microsoft. With its **lightweight nature, rich plugins, and fast startup speed**, it has become one of the most popular development tools worldwide. Whether you're writing Python, JavaScript, or C++, VS Code can become the most suitable "tool" for you through plugin installation.

---

## 1. Core Interface Analysis

The interface layout of modern IDEs (taking VS Code as an example) has been carefully designed and usually contains the following four core areas:

1. **Sidebar: Resource Management**
   Displays the project's file tree, supports creating, renaming, moving, and deleting files, providing a global view and quick access to the project structure.

2. **Editor Area: Code Creation**
   The core area for writing and modifying code. Supports syntax highlighting, intelligent code completion, syntax checking, and other functions, providing an efficient and intelligent code writing environment.

3. **Bottom Panel: Execution and Feedback**
   Interacts with the underlying system and views running results. Includes Terminal, Output, etc., used for executing commands, viewing logs, and debugging.

4. **Activity Bar: Function Navigation**
   Located on the far left of the interface, containing icons for file explorer, search, Git management, etc., used to quickly switch between different work contexts (such as "writing code" and "submitting code").

---

## 2. Interactive Demo: Functional Experience

Seeing is believing. To let you truly feel the convenience of an IDE, we have prepared a **virtual VS Code environment** for you.

**Please try the following operations**:

1.  Click the **"▶ Start Auto Tour"** button in the upper right corner to follow the cursor and learn about each area.
2.  **Free Exploration**: Click the icons on the left to switch views, or click file names to open code.
3.  **Experience Integration**: You'll find that file management, code editing, and terminal running are all seamlessly connected within the same window.
4.  **Install Plugins**: Select **"Extensions Installation"** mode from the dropdown menu to experience how to install Python plugins in a virtual store.

<ClientOnly>
  <VirtualVSCodeDemo />
</ClientOnly>

---

## 3. Core Mechanism: Why Can VS Code Do Everything?

You might be curious: Why can the same software write Python, C++, and do web development? How does it do it?
Actually, VS Code's design philosophy can be summarized in one sentence: **"Minimalist core, pluggable capabilities."**

### 3.1 Minimalist Core: Just a "Canvas"

Imagine, the VS Code you just downloaded, if no plugins are installed, actually **doesn't understand programming**.
At this point, it is essentially just a **powerful text editor**.

- It is responsible for displaying text (rendering).
- It is responsible for managing files (IO).
- But it doesn't know that `print("Hello")` is Python code, nor does it know that `int main()` is a C++ entry point.

### 3.2 Plugin System: Injecting "Soul"

To make VS Code able to "understand" code, we need to install **Extensions**.
Plugins are like specialized **translators**:

- **Python Plugin**: Tells VS Code what variables are, what functions are, and how to run `.py` files.
- **C++ Plugin**: Tells VS Code how to call the compiler and how to debug memory.

This design makes VS Code very lightweight—if you don't write Java, you don't have to carry Java's runtime environment.

### 3.3 Behind the Scenes: From Code to Execution

<ClientOnly>
  <IdeArchitectureDemo />
</ClientOnly>

Let's look at how VS Code, plugins, and the underlying environment collaborate through a specific scenario.
Suppose you write a line of Python code and click **Run** or **Debug**:

#### 1. Language Recognition (Activation)

VS Code detects the `.py` suffix and automatically wakes up the **Python Plugin**. The plugin immediately takes over the editor, begins syntax analysis, colors the code differently (syntax highlighting), and provides intelligent suggestions.

#### 2. Task Delegation (Delegation)

When you issue a command, the plugin itself does not directly execute the code, but **delegates** the task to underlying professional tools:

- **Run Mode**: The plugin generates a command (such as `python main.py`) and sends it to the system's **terminal** for execution.
- **Debug Mode**: The plugin starts a **Debug Adapter**. It's like a "monitoring probe," connecting to the internals of the Python interpreter, allowing you to control code execution line by line.

#### 3. Result Feedback (Feedback)

The Python interpreter (or compiler) executes the code and returns the results (or error messages) to the plugin. The plugin then "carries" this information back and displays it in VS Code's **bottom terminal panel**.

### 3.4 Summary: Using a "Restaurant" as an Analogy

If the above formula is a bit abstract, we can imagine the process of writing code as **dining at a restaurant**:

1.  **VS Code is the "Restaurant Lobby"**:
    - The decoration is luxurious and the environment is comfortable (code highlighting, beautiful themes).
    - **But the lobby itself doesn't produce food**. You sit here just to more comfortably "order" (write code).

2.  **Environment (Python/Node) is the "Kitchen"**:
    - This is where the real **cooking (running code)** happens.
    - If the restaurant has no kitchen (Python not installed), you can sit in the lobby until dark and still won't get food.

3.  **Plugins are the "Waiters"**:
    - They connect the lobby and the kitchen.
    - They understand your menu, run to tell the kitchen: "Table 3 wants a 'run main.py'!"
    - When it's done, they bring the results (steaming hot food) back to you.

**Conclusion**:

- Only installing VS Code = **Only lobby, no kitchen** (can only look, can't eat).
- Only installing Python = **Only kitchen, no lobby** (can eat, but have to squat on the kitchen floor, poor experience).
- **Installing VS Code + Plugins + Python = Perfect dining experience.**

---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const openTarget = () => {
    const hash = window.location.hash
    if (hash) {
      try {
        // Handle encoded characters in hash
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

# Appendix: Visual Studio Code Menu Bar Analysis

To help everyone understand the meaning of each option, here we provide an in-depth analysis of the menu bar:

![](editors-and-ai/images/index-2026-01-09-11-35-55.png)

![](editors-and-ai/images/index-2026-01-09-11-36-23.png)

<details class="custom-block details" id="vscode-file-menu">
  <summary>File: Project and File Open/Save/Workspace Management</summary>

This menu is mainly responsible for: **Creating/Opening Files**, **Opening Project Folders**, **Managing Workspaces**, **Saving and Closing**.

> The most commonly used are: Open Folder to open a project; Open… to open a single file; then use Save / Save All to save changes, and finally use Close Editor / Close Folder to end the current work. Workspace-related content can be slowly learned as you get more projects, no need to understand everything at once.

- **New Text File**: Create a new unnamed text buffer for temporary notes or quick pasting.
- **New File…**: Create a new file in the project (usually asks you to choose path/name).
- **New Window**: Open a new VS Code window instance.
- **New Window with Profile**: Open a new window with a specified Profile (extension/settings combination), suitable for isolating environments for different courses/projects.
- **Open…**: Open a single file for editing.
- **Open Folder…**: Open a folder as the project root directory (the most commonly used "open project" method).
- **Open Workspace from File…**: Open a `.code-workspace` file to load a workspace with multiple folders/specific settings.
- **Open Recent**: Quickly access recently opened files/folders/workspaces.
- **Add Folder to Workspace…**: Add another folder to the current workspace (forming a multi-root workspace).
- **Save Workspace As…**: Save the current workspace structure as a `.code-workspace` file for easy sharing/reuse.
- **Duplicate Workspace**: Duplicate the current workspace configuration (commonly used to create similar project environments).
- **Save**: Save changes to the current file.
- **Save As…**: Save the current file with a new name/path.
- **Save All**: Save all opened files that have modifications.
- **Share**: Entry related to sharing/collaboration (specific content depends on version and extensions).
- **Auto Save**: Toggle auto-save strategy (e.g., delayed save/focus change save).
- **Revert File**: Discard unsaved changes to the current file and revert to the disk version.
- **Close Editor**: Close the current tab.
- **Close Folder**: Close the current project folder (workspace becomes empty).
- **Close Window**: Close the current VS Code window.

</details>

<details class="custom-block details" id="vscode-edit-menu">
  <summary>Edit: Basic Editing, Find/Replace, Comments and Quick Edit Actions</summary>

This menu is mainly responsible for: **Undo/Redo**, **Cut/Copy/Paste**, **Find/Replace**, **Comments and Editor Actions** (improving editing efficiency).

- **Undo / Redo**: The most basic operations for when you write code wrong.
- **Cut / Copy / Paste**: Text transportation.
- **Find / Replace**: Search or batch modify in the current file.
- **Find in Files / Replace in Files**: Global (whole project) search and replace, very powerful but use with caution.
- **Toggle Line Comment**: `Ctrl + /`, quickly comment/uncomment the current line.
- **Toggle Block Comment**: `Shift + Alt + A`, quickly comment/uncomment the selected area.
- **Emmet: Expand Abbreviation**: A powerful tool for HTML/CSS development, type shorthand and press Tab to expand code.

</details>

<details class="custom-block details" id="vscode-selection-menu">
  <summary>Selection: Multi-cursor and Smart Selection</summary>

This menu is mainly responsible for: **Cursor Control**, **Multi-line Editing**, **Expand/Shrink Selection**. This is VS Code's killer feature for improving efficiency.

- **Select All**: Select all content in the current file.
- **Expand Selection / Shrink Selection**: Intelligently perceive syntax structure, gradually expand or shrink the selection range (e.g., word -> string -> inside parentheses -> whole line -> function body).
- **Copy Line Up / Down**: Quickly clone the current line.
- **Move Line Up / Down**: `Alt + ↑ / ↓`, adjust code line order directly without cut and paste.
- **Add Cursor Above / Below**: `Ctrl + Alt + ↑ / ↓`, enable multi-cursor mode to edit multiple lines simultaneously.
- **Add Cursor to Line Ends**: After selecting multiple lines of text, add a cursor at the end of each line.

</details>

<details class="custom-block details" id="vscode-view-menu">
  <summary>View: Interface Layout and Panel Control</summary>

This menu is mainly responsible for: **Toggle Sidebar/Panel**, **Adjust Layout**, **Command Palette**, **Output and Debug Console**.

- **Command Palette…**: `Ctrl + Shift + P` / `F1`, VS Code's central command center, can search and execute all commands.
- **Open View…**: Quickly open specific sidebar views (such as Explorer, Source Control).
- **Appearance**: Control fullscreen, menu bar visibility, sidebar position, zoom level (Zoom In/Out).
- **Editor Layout**: Split editor (Split Up/Down/Left/Right) for side-by-side code comparison.
- **Explorer / Search / Source Control / Run / Extensions**: Directly switch views in the Activity Bar.
- **Problems / Output / Debug Console / Terminal**: Directly control the display content of the bottom panel.
- **Word Wrap**: `Alt + Z`, control whether long lines of code automatically wrap (does not affect actual file content).

</details>

<details class="custom-block details" id="vscode-go-menu">
  <summary>Go: Code Navigation and Jumping</summary>

This menu is mainly responsible for: **Jumping Between Files**, **Jumping Between Symbols (Functions/Variables)**.

- **Back / Forward**: Like a browser, jump between your cursor history positions.
- **Switch Editor…**: Quickly switch between opened tabs.
- **Go to File…**: `Ctrl + P`, type filename to quickly open files.
- **Go to Symbol in Editor…**: `Ctrl + Shift + O`, list functions/classes/variables in the current file for quick jumping.
- **Go to Definition**: `F12`, jump to the definition of the variable or function at the cursor.
- **Go to References**: `Shift + F12`, see where this variable or function is used.
- **Go to Line/Column…**: `Ctrl + G`, jump to a specified line number.

</details>

<details class="custom-block details" id="vscode-run-menu">
  <summary>Run: Debugging and Execution</summary>

This menu is mainly responsible for: **Start Debugging**, **Breakpoint Management**.

- **Start Debugging**: `F5`, run the program in debug mode (supports breakpoints, variable watching).
- **Run Without Debugging**: `Ctrl + F5`, run the program directly without attaching a debugger (slightly faster).
- **Stop Debugging**: Forcefully end the current debugging session.
- **Restart Debugging**: Run again.
- **Toggle Breakpoint**: `F9`, add or remove a red dot (breakpoint) on the current line.
- **New Breakpoint**: Supports conditional breakpoints, log breakpoints, and other advanced features.

</details>

<details class="custom-block details" id="vscode-terminal-menu">
  <summary>Terminal: Integrated Command Line</summary>

This menu is mainly responsible for: **New Terminal**, **Manage Terminal Windows**.

- **New Terminal**: Open a new Shell (PowerShell/Bash/Zsh) in the bottom panel.
- **Split Terminal**: Split left/right/up/down in the same terminal panel to run multiple commands simultaneously.
- **Run Task…**: Run build/test tasks defined in `tasks.json`.

</details>

<details class="custom-block details" id="vscode-help-menu">
  <summary>Help: Documentation and Feedback</summary>

- **Welcome**: Open the welcome page (contains getting started guide, recent projects).
- **Show All Commands**: Same as Command Palette.
- **Documentation**: Jump to official documentation.
- **Editor Playground**: Interactive tutorial for learning editing techniques.
- **Check for Updates…**: Manually check for updates.
- **About**: View version number, build time, Electron/Node version information.

</details>
