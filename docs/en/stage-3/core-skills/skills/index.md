# Claude Code Skills Complete Guide

## Introduction to Skills

**Claude Code Skills** is a feature that packages specialized knowledge, workflows, and best practices into reusable "skill packs."

You can imagine Skills as "skill books" equipped for Claude. When you need it to complete a specific task, you no longer have to explain the requirements over and over again. Instead, it can directly carry out the work according to the standards defined in advance by the Skill.

### Why do we need Skills?

Before Skills existed, using Claude Code had several problems:

- **Repeated instructions**: every time, you had to explain things like "what coding style to follow" and "how commit messages should be written"
- **Knowledge could not accumulate**: team members' individual experience using Claude could not be shared
- **Inconsistent standards**: different people using Claude could get completely different results
- **Low efficiency**: common tasks had to be explained from scratch every time

Skills solve these problems and turn Claude into an "experienced team member" - it knows your project conventions, workflows, and best practices.

---

## Why learn Skills now?

**Skills are becoming a must-have capability for AI engineers**:

- **High community interest**: related GitHub repositories are gaining stars rapidly. For example, the OpenSkills project has already reached 7.2k stars, and Obsidian Skills gained 6.6k stars in just 9 days
- **Official support**: Anthropic maintains an official Skills repository, and Vercel has launched Agent Skills and the find-skills tool
- **Highly practical**: from code review and Git operations to video creation and PPT generation, Skills cover many scenarios. The skills.sh platform already has popular skills with 60K+ subscriptions
- **Efficiency gains**: configure once, reuse repeatedly, and let Claude truly become your "digital employee"
- **Developer recognition**: recommended by multiple technical communities and widely considered a key tool for improving AI programming efficiency

---

## Quick Start

Now that you understand the value of Skills, let's try them right away. This section will take you through installing your first Skill and completing a few interesting hands-on tasks so you can quickly build intuition.

### Step 1: Install `find-skills` (strongly recommended)

Before you start using Skills, it is strongly recommended that you install `find-skills` first. It is the "ultimate skill search tool" in the AI Agent world and already has 60K+ subscriptions.

**What is `find-skills`?**

Simply put, `find-skills` is like an "app store search engine" for AI Agents. When you need to complete a task but do not have a suitable local Skill, it will automatically search for and recommend the most appropriate one.

**Install `find-skills`:**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

After installation, you can directly tell Claude what you need, and it will use `find-skills` to search for relevant skills automatically.

**Example usage:**

```text
I need to optimize the performance of a React component. Help me find what skills I can use.
```

Claude will search through `find-skills`, then tell you which relevant skills it found so that you can choose one to install.

**Why install `find-skills` first?**

Before `find-skills`:
- manually search GitHub for related skills
- copy, install, and configure them one by one
- repeatedly debug and adapt them

After `find-skills`:
- describe the requirement in one sentence
- AI automatically searches for the best matching skill
- install with one click and use it immediately

**Note for Windows users**: the official version has limited Windows support. The community has made a Windows-compatible version that supports CMD and PowerShell and adds Chinese-language search.

Download the Windows version: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Installation steps:
1. Download the Windows version of `SKILL.md`
2. Replace the file in `C:/Users/your-username/.agents/skills/find-skills`
3. Restart Claude Code and it will take effect

**Related links**:
- [Skills official website](https://skills.sh/) - browse all available skills
- [find-skills repository](https://github.com/vercel-labs/agent-skills) - official source code

### Install and Try Your First Skill

After installing `find-skills`, let's use it to search for and install a fun first Skill: the Remotion video creation tool.

#### Step 1: Use `find-skills` to search for Remotion

Type this in Claude Code:

```text
Help me find skills related to Remotion. I want to make videos.
```

Claude will search via `find-skills` and recommend `remotion-dev/skills`.

#### Step 2: Install Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### Step 3: Use it to build something fun

Remotion is a framework for making videos with React code. After installing this Skill, you can ask Claude in natural language to help you write video code.

**Task 1: Make a cool animated text video**

```text
Use Remotion to make a video:
- 1920x1080, 5 seconds
- A line of text "Hello World" flies in from the left
- With rotation and scaling effects at the same time
- The background is a gradient
```

Claude will generate complete Remotion code, and you can run it to see the animation.

**Task 2: Make a data visualization video**

```text
Make a 10-second video showing data growth:
- Start with a bar chart
- The bars grow one by one with animation
- Numbers count upward
- At the end, show large text saying "300% growth"
```

**Task 3: Make a multi-scene product demo video**

```text
Make a product demo video with three scenes:
Scene 1: Logo fades in, 2 seconds
Scene 2: Product features appear one by one, 3 seconds
Scene 3: CTA button pops up, 2 seconds
Use smooth transitions between each scene
```

**Run the code**:

The code Claude generates is a complete Remotion project. You can:

1. Create a new project: `npx create-video my-video`
2. Copy Claude's generated code into it
3. Run a preview: `npm start`
4. Render the video: `npm run build`

---

### The Second Skill: Use `find-skills` to solve "the frontend looks ugly and feels slow"

#### Step 1: Describe your problem in natural language

Directly tell Claude your high-level need:

```text
My website looks outdated and loads slowly. Help me find what skills I can use.
```

Or make it a bit more specific:

```text
I want the frontend to look better and stop being so laggy.
```

#### Step 2: Claude will search with `find-skills`

Claude will search the skills.sh database via `find-skills` and recommend related skills. For a requirement like "make it look better + reduce lag," it will recommend:

**anthropics/skills/frontend-design** (official skill)

This skill is specifically designed to solve the problem of AI-generated interfaces that "look plain and generic," helping Claude design:

- unique visual styles that avoid the same old "AI template look"
- professional color schemes and typography
- smooth animation effects
- production-grade code quality, with clean code and naturally better performance

#### Step 3: Install and use it

**Install**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Tasks you can complete with it**:

```text
Help me redesign this page. I want it to look very professional and not like it was generated by AI.
```

```text
This UI is too ugly. Rewrite it in a more modern design style.
```

```text
Make a dark-theme dashboard with a strong tech feel.
```

Claude will follow this skill's conventions and help you design:
- a unique visual direction such as minimalism, retro-futurism, or brutalism
- carefully chosen colors and fonts
- reasonable spacing and layout
- smooth interactive animation

---

### Comparing the Two Skills

| Skills | What problem does it solve? | Fun factor |
|--------|-------------|---------|
| **remotion-dev/skills** | Make videos with code | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Make the frontend look better | ⭐⭐⭐⭐ |

---

### The Third Skill: Use `frontend-slides` to quickly make beautiful PPT presentations

#### Introduction

**frontend-slides** is a Skill that lets you create beautiful HTML presentations with natural language - even if you do not know any CSS or JavaScript.

Its core idea is "**show, don't tell**." If you cannot clearly describe the design style you want, it will generate 3 visual previews for you to choose from, rather than forcing you to describe abstract requirements like "blue background, large font."

#### Install `frontend-slides`

**Method 1: Install manually**

```bash
# Create the skill directory
mkdir -p ~/.claude/skills/frontend-slides

# Download files (or copy from GitHub)
# 1. Visit https://github.com/zarazhangrui/frontend-slides
# 2. Download SKILL.md and STYLE_PRESETS.md
# 3. Put them into ~/.claude/skills/frontend-slides/
```

**Method 2: Install with `find-skills`**

```text
Help me find a skill for making PPT presentations
```

Claude will search through `find-skills` and recommend `frontend-slides`.

#### Usage scenarios

**Scenario 1: Create a presentation from scratch**

```text
/frontend-slides

I want to create a fundraising pitch deck for an AI startup project, around 10 slides
```

Claude will guide you to:
1. fill in the content of each slide such as titles, bullet points, and images
2. describe the feeling you want such as stunning, professional, or warm
3. choose from 3 visual style previews
4. create the complete HTML presentation
5. open a preview in the browser

**Scenario 2: Convert a PowerPoint file**

```text
/frontend-slides

Convert my presentation.pptx into a web presentation
```

Claude will:
1. extract all text, images, and notes from the PPT
2. show the extracted content for you to confirm
3. let you choose a visual style
4. generate an HTML presentation that preserves all original content

**Scenario 3: Quickly generate style previews**

```text
/frontend-slides

I want to make a PPT for a technical talk. Show me the available visual styles first.
```

Claude will directly generate 3 preview pages in different styles:
- **Dark themes**: Neon Cyber, Terminal Green, Deep Space
- **Light themes**: Paper & Ink, Swiss Modern, Soft Pastel
- **Special styles**: Brutalist, Gradient Wave

#### Built-in visual styles

| Style name | Characteristics | Suitable scenarios |
|---------|------|---------|
| **Neon Cyber** | Futuristic tech feel, particle effects | Technical talks, AI products |
| **Midnight Executive** | High-end business, trustworthy | Business reports, fundraising pitches |
| **Paper & Ink** | Editorial style, literary atmosphere | Content creation, educational sharing |
| **Swiss Modern** | Clean geometry, Bauhaus style | Design portfolios, minimalism |
| **Brutalist** | Raw, bold, attention-grabbing | Art showcase, personal expression |

#### Output result

The generated presentation is a **single-file HTML** document that includes:

- complete styling and interaction code
- keyboard navigation with arrow keys and space
- touch and swipe support
- mouse wheel slide turning
- progress bars and navigation dots
- scroll-triggered animation
- responsive design

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- All styles are inlined, zero dependencies -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Your Title</h1>
    </section>
    <!-- More slides... -->
</body>
</html>
```

#### Why recommend it?

1. **Zero dependency**: a single HTML file that will still open 10 years from now
2. **Visual discovery**: no need to describe the design, just pick what you like
3. **PPT conversion**: keep your existing content and give it a better visual skin
4. **Production-grade code**: accessible, clearly commented, and easy to customize

**Related links**:
- [frontend-slides GitHub repository](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ stars
- [Online preview example](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### Comparing the Three Skills

| Skills | What problem does it solve? | Fun factor | Practicality |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | Make videos with code | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Make the frontend look better | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Quickly make beautiful PPTs | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### How to use them after installation

After installation, you do not need any extra configuration. When you ask Claude to perform a related task, it will automatically call the corresponding Skill.

View installed Skills:

```bash
npx skills list
```

---

## What are Skills?

### Core concept

**Skills are "skill packs" stored in the file system** and can include:

- **SKILL.md**: the definition file for the skill, required
- **scripts/**: helper scripts, optional
- **templates/**: output templates, optional
- **references/**: reference docs, optional

### Skills vs. prompts

You may wonder: what is the difference between Skills and directly sending prompts to Claude?

| Prompts | Skills |
|--------|--------|
| Temporary, you have to repeat them every time | Persistent, write once and reuse many times |
| Live in conversation history and consume tokens | Loaded on demand and save tokens |
| Cannot be shared across sessions | Can be shared within a team |
| Hard to version-control | Can be managed with Git |

### Two types of Skills

**Global Skills (personal)**:
- storage location: `~/.claude/skills/`
- scope: all projects
- suitable scenarios: general-purpose personal skills

**Project Skills (team)**:
- storage location: `project-directory/.claude/skills/`
- scope: the current project
- suitable scenarios: team sharing and project-specific conventions

### How Skills work

When Claude Code starts, it will:

1. scan the Skills directories
2. parse each `SKILL.md` file
3. extract YAML frontmatter metadata
4. add the skill content into its "knowledge base"
5. automatically match triggers based on the description

---

## `SKILL.md` File Structure

### Basic structure

A complete Skill directory looks like this:

```text
my-skill/
├── SKILL.md          # Required: skill definition file
├── scripts/          # Optional: helper scripts
├── templates/        # Optional: output templates
├── references/       # Optional: reference documents
└── examples/         # Optional: example files
```

### `SKILL.md` template

The `SKILL.md` file has two parts:

**Part 1: YAML Frontmatter (metadata)**

```yaml
---
name: skill-name              # Skill name, becomes the /skill-name command
description: short description # Used for Claude's automatic trigger matching
category: development         # Category
tags:                         # Tags
  - code
  - automation
---
```

**Part 2: Markdown content (instructions)**

```markdown
# Skill Title

## Use cases
When to use this skill

## Execution steps
1. Step one
2. Step two

## Notes
- Note 1
- Note 2
```

### Explanation of key fields

| Field | Required | Explanation |
|------|------|------|
| `name` | Yes | The skill name. Only lowercase letters, numbers, and hyphens are allowed |
| `description` | Yes | The skill description. The more specific it is, the easier it is for Claude to match automatically |
| `category` | No | Category label |
| `tags` | No | Additional category labels |
| `allowed-tools` | No | Tools that may be used without extra permission |

---

## Skills vs. MCP: What is the difference?

Many beginners confuse Skills and MCP, but they are completely different things.

### Core differences

| Dimension | Skills | MCP |
|------|--------|-----|
| **Nature** | Knowledge and workflow | Tools and interfaces |
| **What it provides** | Tells AI "how to do it" | Gives AI "what it can use" |
| **Storage location** | `skills/` directory | MCP server |
| **Configuration format** | Markdown files | JSON config files |
| **Trigger method** | `/skill-name` or automatic recognition | Automatically loaded through configuration |

### An intuitive analogy

If Claude were a "worker":

- **MCP** would be the "tools" given to the worker, such as a wrench, a computer, and access permissions
- **Skills** would be the "operating manual" given to the worker, such as how to do code review or how to submit code

### Their relationship

Skills and MCP are not competing with each other. They are complementary:

```text
User task -> Claude recognizes the requirement
               ↓
        Load relevant Skills (know how to do it)
               ↓
        Call tools through MCP (have tools available)
               ↓
        Complete the task
```

### Example

**Scenario: code review**

- **Skills** define the review steps, checklist, and output format
- **MCP** provides the ability to access GitHub PRs and fetch code diffs

Working together: Skills tell Claude "how to review," and MCP gives Claude "the ability to access the code."

### Recommendation for choosing

| Your need | Recommended solution |
|----------|----------|
| Need to define a workflow | Use Skills |
| Need to access external data | Use MCP |
| Need both | Use them together |

---

## Common Resources for Getting Skills

### Official resources

- [Anthropic official Skills repository](https://github.com/anthropics/skills) - an officially maintained collection of skills
- [Claude Code official docs - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - official documentation

### GitHub community resources

| Repository | Description |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Maintained by Boris Cherny, head of Claude Code, including Skills, Agents, Hooks, and more |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Comprehensive toolkit including preconfigured Skills |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Curated Skills resource list |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 professional skills and 300+ reference documents |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Selected open-source collection |

### How to install community Skills

Using `find-skills`, you only need to tell Claude what you need, and it will automatically search and recommend:

```text
Help me find a skill related to React performance optimization
```

Claude will search the skills.sh database through `find-skills`, then list the most relevant skills, and you can choose one to install.

**Search tips**:

- use specific keywords: `"react testing"` is better than `"testing"`
- combine "domain + action": `"nextjs deploy"`, `"typescript lint"`
- prioritize skills with high install counts, since 10K+ usually means battle-tested
- watch the trending list to discover emerging skills

---

## How to Create Your Own Skills

There are two ways to create Skills: directly ask Claude to create one for you, or use the dedicated `skill-creator` tool.

### Method 1: Directly ask Claude to help you create one

This is the simplest approach. Just tell Claude your requirement in natural language.

**Example**:

```text
Please help me create a skill named "format-code" to automatically format code.

Requirements:
1. Automatically detect the programming language
2. Apply the corresponding formatting rules
3. Return the diff before and after formatting
```

Claude will automatically:
1. create the directory structure
2. generate the `SKILL.md` file
3. fill in the YAML frontmatter
4. write the skill content

**Suitable scenarios**:
- quickly creating simple skills
- you know what you want but are not familiar with the `SKILL.md` format
- you want to iterate and modify quickly

### Method 2: Use `skill-creator`

`skill-creator` is a dedicated tool for creating Skills. It guides you step by step through the process.

**Install**:

```bash
npx skills add anthropics/skills@skill-creator -g
```

Or install the entire official skills repository:

```bash
npx skills add anthropics/skills -g
```

**Use**:

```text
/skill-creator
```

Then fill in the prompts:
- skill name
- feature description
- usage scenarios
- execution steps

`skill-creator` will:
1. guide you to clarify the purpose of the skill
2. generate a draft `SKILL.md`
3. create test cases
4. run evaluation and optimize it

**Suitable scenarios**:
- creating complex skills
- needing a more standard creation process
- wanting to test and verify the skill

### Comparison of the two methods

| Method 1: Direct creation | Method 2: `skill-creator` |
|-----------------|---------------------|
| Fast and simple | Guided steps |
| Suitable for simple skills | Suitable for complex skills |
| Completed directly in conversation | Standardized process |
| Flexible modification | Includes testing and verification |

### Tip: how to write a good requirement

**A good requirement description**:

```text
Create a "git-commit" skill that automatically commits code.

Execution steps:
1. Check which files were modified
2. Generate a commit message that follows Conventional Commits
3. Run git commit
4. Ask whether to push

Notes:
- Check for sensitive information before committing
- Do not commit directories like dist/ or node_modules/
```

**A bad requirement description**:

```text
Help me write a skill for committing code
```

That is too vague. Claude will not know exactly what it needs to do.

---

## Common Skill Examples

### Example 1: Code Review Skill

Create the directory and file:

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

How to use it:

```text
/review-pr
Please review the PR for the current branch
```

### Example 2: Git Auto-Commit Skill

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

How to use it:

```text
/git-commit
```

### Example 3: Test Generation Skill

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

How to use it:

```text
/gen-test
Generate unit tests for src/utils.ts
```

### Example 4: Documentation Generation Skill

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

How to use it:

```text
/gen-readme
Generate a README document for the current project
```

---

## Advanced Tips

### Combine Skills with Hooks

Hooks can automatically perform actions on specific events. Combined with Skills, they enable more powerful automation.

For example, automatically format code after saving:

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // Call the format-code skill
      }
    }]
  }
}
```

### Combine Skills with Commands

Commands are simple shortcut commands. Skills are complex workflows. They can be used together.

### Team collaboration

**Share project Skills**:

1. put the Skills under `.claude/skills/`
2. commit them to Git
3. team members can use them after cloning the project

**Version control**:

- Skills can be version-controlled just like code
- each commit can record changes to Skills
- you can roll back to older versions

---

## Frequently Asked Questions

### Q1: Why was the Skill not triggered?

Possible reasons:
- YAML frontmatter format is wrong
- the description is not specific enough
- Claude Code was not restarted

How to solve it:
- check whether the YAML format is correct
- improve the description and include specific usage scenarios
- restart Claude Code

### Q2: How do I write an accurate description?

A good description includes:
- the specific function of the skill
- the usage scenario, such as "when the user mentions..."
- trigger keywords

**Bad example**:
```text
description: Review code
```

**Good example**:
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### Q3: What is the difference between Skills and Commands?

| Commands | Skills |
|----------|--------|
| Simple shortcut commands | Complete workflows |
| A single `.md` file | A directory structure (`SKILL.md` + optional files) |
| Manually triggered | Can be automatically triggered |
| Suitable for simple operations | Suitable for complex processes |

### Q4: How do I debug a Skill?

1. Use `/skills` to check whether the skill was recognized
2. Directly enter the skill name to trigger it manually
3. Check whether the `SKILL.md` content is correct
4. Review the Claude Code logs

---

## References

### Official resources

- [Claude Code official docs - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills standard](https://agentskills.io/)
- [Anthropic engineering article (practical ideas behind Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic official Skills GitHub repository](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Resource directories

- [skills.sh](https://skills.sh/) - Vercel's Agent Skills app store with a 48,000+ skill library
- [find-skills](https://github.com/vercel-labs/agent-skills) - intelligent skill search tool with 60K+ subscriptions
- [Skills marketplace (Chinese interface)](https://skillsmp.com/zh) - discover and install community Skills

### GitHub community projects

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel Labs official Agent Skills collection, including find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - official best practices maintained by Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - comprehensive toolkit including preconfigured Skills
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - curated list of selected Skills resources
- [superpowers](https://github.com/obra/superpowers) - collection of Skills for software development automation workflows
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 professional skills and 300+ reference documents
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - curated resource list

### Official Skill examples

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - a skill for creating new skills
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - a skill for building MCP servers
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - a skill for creating Slack GIFs

### Chinese tutorials

- [Complete guide to advanced Claude Code configuration and usage tips](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - full-chain practice with CLAUDE.md, Skills, and Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [A step-by-step guide to customizing Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Further Reading: The Internal Mechanism of Claude Skills

Next, we will go deeper into how Claude Skills work internally, so you not only know how to use them, but also understand why they are designed this way.

### First-principles view: prompt-based dynamic context injection

First, understand one key fact: **Skills are not executable code**.

Skills are essentially advanced instructions, or prompts, that are "injected" into Claude's context when needed. This design is called "**Prompt-based Dynamic Context Injection & Meta-Tool Architecture**."

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ User Request│ ───> │ LLM Matches │ ───> │ Trigger Skill│
└─────────────┘      │Description  │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Inject Full  │
                                          │ Instructions │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Execute Task │
                                          └──────────────┘
```

### Three-layer progressive loading architecture (token optimization)

To handle a large number of Skills without consuming too many tokens, Claude uses a smart three-layer loading mechanism:

| Layer | Content | When loaded | Token cost |
|------|------|----------|-----------|
| **Layer 1: Metadata** | YAML frontmatter (`name + description`) | When Claude starts | ~30-50 tokens/skill |
| **Layer 2: Instructions** | Full `SKILL.md` content | When the Skill is triggered | ~5,000 tokens |
| **Layer 3: Resources** | Scripts, templates, references | Accessed from the file system on demand | Not added to context |

**Advantages of this design**:

- Suppose you have 100 Skills. At startup, only about 3,000-5,000 tokens are consumed for metadata
- Only the triggered Skill loads its full content
- Resource files such as reference documents are never fully loaded into the context

**Compared with no Skills**:

```text
Without Skills: every conversation needs 50,000+ tokens to describe all capabilities
With Skills: startup ~100 tokens/skill + 5,000 tokens loaded on demand
Savings: on average 40,000+ tokens saved per conversation
```

### Dual context injection mechanism

When a Skill is activated, the system makes two modifications at the same time:

**1. Conversation context injection**

```javascript
// What the user sees (visible message)
<command-message>The "pdf" skill is loading</command-message>

// What the AI actually receives (hidden meta-message)
{
  isMeta: true,  // marked as a meta-message, not shown in the UI
  content: `
    # PDF Analysis Expert Instructions

    You are a professional PDF analysis expert. Workflow:
    1. Use pdftotext to extract text
    2. Analyze the document structure
    3. Generate a summary report
    ...
  `  // full SKILL.md content, possibly thousands of words
}
```

**2. Execution context modification**

Besides injecting instructions, a Skill can also dynamically modify Claude's environment:

| Modification type | Example | Explanation |
|---------|------|------|
| **Tool permissions** | `allowed-tools: "Bash(pdftotext:*)"` | Temporarily grant access to a specific tool |
| **Model switching** | Switch from Sonnet to Opus | Some complex tasks require stronger reasoning |
| **Context isolation** | Create a child session space | Avoid polluting the main conversation context |

### A routing mechanism based entirely on LLM reasoning

This is a very important design decision: **Claude Skills do not use hardcoded routing**.

| Traditional approach | Claude Skills |
|---------|--------------|
| ❌ Embedding vector matching | ✅ Pure LLM reasoning |
| ❌ Classifier | ✅ Transformer forward pass |
| ❌ Regex or keyword matching | ✅ Natural language understanding |
| ❌ Separate routing algorithm | ✅ Unified model decision-making |

**Workflow**:

```text
1. The name and description of every Skill are formatted into the Skill tool description

2. Claude receives:
   - the user message
   - the list of available tools, including the Skill meta-tool
   - the Skill list, with name + description

3. Claude's natural language understanding matches the user's intent to a Skill description

4. When the match succeeds, it calls: command: "skill-name"
```

**Why design it this way?**

**Hardcoded routing requires**:
- extra maintenance cost
- no ability to understand complex semantic relationships
- difficulty handling multiple languages
- no support for fuzzy matching

**Pure LLM reasoning**:
- leverages Claude's own language understanding
- automatically handles multiple languages, synonyms, and fuzzy descriptions
- requires no extra maintenance
- makes routing decisions more intelligent

### File parsing mechanism

**`SKILL.md` file structure**:

```bash
my-custom-skill/
├── SKILL.md              # Required: core definition file
├── config.json           # Optional: metadata config
├── README.md             # Recommended: usage documentation
├── scripts/              # Optional: executable scripts
├── templates/            # Optional: template folder
└── references/           # Optional: reference documents
```

**Parsing flow**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code startup                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Scan ~/.claude/skills/ and .claude/skills/ directories    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Use the gray-matter library to parse each SKILL.md        │
│  YAML frontmatter                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Validate required fields (name and description)           │
│  - name: max 64 characters, only lowercase letters,        │
│    numbers, and hyphens                                     │
│  - description: used for LLM automatic matching            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Extract metadata and build the Skill list                 │
│  (only load name + description, not the full body)         │
└─────────────────────────────────────────────────────────────┘
```

### Example of the full execution flow

Let's look at the entire flow through a concrete example:

```text
User: "Help me analyze this PDF file"

═══════════════════════════════════════════════════════════════

Step 1: LLM decision
────────────────
Claude finds the description of the "pdf" skill in the Skill list:
  description: "Analyze PDF document content, extract text, generate a summary"

═══════════════════════════════════════════════════════════════

Step 2: System intervention
────────────────
Claude Code executes:
  1. Read ~/.claude/skills/pdf/SKILL.md
  2. Generate a visible message: "The pdf skill is loading"
  3. Generate a hidden meta-message: the full SKILL.md content
  4. Modify session permissions: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Step 3: LLM execution
────────────────
Now Claude's context contains:
  - the original user request
  - the PDF expert workflow instructions
  - access permission to the pdftotext tool

Claude executes:
  1. Use pdftotext to extract the PDF text
  2. Analyze the content structure
  3. Generate a summary report
  4. Present the result to the user

═══════════════════════════════════════════════════════════════

Step 4: Dispose after use
────────────────
After the task is completed, the full Skill content is removed from context
(only the conversation history remains, not the full Skill instruction)
```

### Core design innovations

| Innovation | Traditional approach | Skills approach | Advantage |
|--------|---------|------------|------|
| **Source of capability** | Fixed in model weights | Dynamically loaded prompts | Extensible and updatable |
| **Token efficiency** | All capabilities always stay in memory | Load on demand | Save 80%+ tokens |
| **Knowledge management** | Scattered in conversation history | Modular file system | Version-controllable and shareable |
| **Lifecycle** | Continuously occupies space | Dispose after use | Cleaner context |

### Academic foundations

The design of Claude Skills draws on the following research:

| Research field | Representative work | Applied here as |
|---------|---------|---------|
| **Reinforcement learning** | Voyager (2023) | The idea of accumulating a skill library |
| **Cognitive architecture** | ACT-R, Soar | Separation of procedural memory and declarative memory |
| **Hierarchical policy** | Options Framework | Three-layer progressive loading |

**Core shift in thinking**:

```text
Traditional: AI needs to remember everything
      ↓
Skills: AI knows where to find specialized knowledge
      ↓
Result: more like the thinking pattern of a human expert
```

### Relationship to the Agent Skills standard

Claude Skills follows the [Agent Skills open standard](https://agentskills.io/), which means:

- ✅ Cross-platform compatibility: tools such as Cursor, Windsurf, and Aider also support it
- ✅ Unified file format: standardized `SKILL.md` structure
- ✅ Interoperability: Skills can be shared across different tools

```text
Agent Skills standard defines:
├── Required: SKILL.md file (metadata + instructions)
├── Optional: scripts/ (executable code)
├── Optional: references/ (knowledge base documents)
└── Optional: assets/ (templates and resources)
```

### Summary: why is this design brilliant?

1. **Decouples capability from the model**: specialized knowledge no longer depends on model training and can be updated at any time through Markdown files

2. **Extreme token efficiency**: the three-layer loading mechanism ensures only necessary content is loaded

3. **Uses the LLM's own strengths**: routing and matching rely entirely on Claude's language understanding, with no extra algorithm required

4. **Developer-friendly**: creating a Skill only requires writing Markdown, not programming

5. **Composable**: Skills can reference and combine with each other to form complex workflows

6. **Dispose after use**: automatically cleans up after completion and keeps context fresh

---

### Summary

Skills are the key to turning Claude Code from a "general assistant" into a "team expert."

Through Skills, you can:
- standardize workflows
- reuse team knowledge
- improve collaboration efficiency
- reduce repeated explanation

Remember: **if you find yourself repeating the same instruction twice, you should consider creating a Skill**.

Now go create your first Skill.
