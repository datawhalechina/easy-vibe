# Claude Agent SDK Complete Guide

## Introduction

You may already have used Claude's basic API: send one message, get one reply, just like chatting. But if you want Claude to help you read files, run commands, search code, fix bugs, verify the result itself, and continue iterating, this kind of "autonomous work" is not something the basic API can do.

Claude Agent SDK is built exactly for this scenario. It packages all of Claude Code's capabilities - reading and writing files, executing commands, searching code, editing files, browsing the web - into a programmable library. You do not need to write the tool-calling loop yourself. Claude can execute tools autonomously and iterate autonomously until the task is truly completed.

One-sentence summary: the basic SDK is "you ask, it answers"; the Agent SDK is "you assign, it works."

---

## What Is the Difference from the Basic SDK?

Look at the code first, and the difference is obvious:

```python
# Basic anthropic SDK: you must write your own loop to handle tool calls
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Fix the bug in auth.py"}],
    tools=[...]  # You must define tools yourself
)
# Claude asks to call some tool
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # You must execute it yourself
    response = client.messages.create(tool_result=result, **params)  # You must feed it back yourself
```

```python
# Agent SDK: one block and done, Claude reads files, finds bugs, and edits code by itself
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude reads files, locates issues, and edits code by itself
```

The difference is clear:

| Comparison Item | Basic anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| Tool execution | You implement it | Claude handles it |
| Tool loop | You implement it | Built-in agent loop |
| Built-in tools | None, all self-defined | Read/write files, Bash, search, and more out of the box |
| Context management | You maintain it | Auto compression and auto management |
| Best for | Chat, generation, simple tool use | Autonomously completing complex tasks |

---

## How Is It Different from Other Agent Frameworks?

There are many Agent frameworks on the market - LangChain, LlamaIndex, CrewAI, AutoGPT, and more. What is unique about Claude Agent SDK compared with them?

> 📚 **For a detailed comparison, see the appendix**: [Mainstream Agent Framework Comparison](/en/appendix/8-artificial-intelligence/ai-agents.html)

In short:

| Framework | Best-Fit Scenario |
|------|-------------|
| **Claude Agent SDK** | Let Claude autonomously complete coding, file operations, and command execution |
| **LangChain** | Build complex general AI apps with highly customized flows |
| **CrewAI** | Simulate multi-role collaboration scenarios (virtual teams, role-playing) |
| **LlamaIndex** | Build knowledge-base QA systems that connect enterprise data with LLMs |

---

## Installation and Configuration

### Installation

Python needs 3.10+, and TypeScript needs Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Authentication

Just set the API key environment variable:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

Cloud-platform authentication is also supported:
- AWS Bedrock: set `CLAUDE_CODE_USE_BEDROCK=1` + AWS credentials
- Google Vertex AI: set `CLAUDE_CODE_USE_VERTEX=1` + GCP credentials
- Microsoft Azure: set `CLAUDE_CODE_USE_FOUNDRY=1` + Azure credentials

### Custom API Endpoint

If you use a proxy, gateway, or self-hosted API endpoint, you can change the default API URL through the `env` parameter:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` does not have a direct `base_url` parameter, but the `env` field can pass arbitrary environment variables into the underlying Claude Code CLI. Common environment variables:

| Environment Variable | Purpose |
|---------|------|
| `ANTHROPIC_BASE_URL` | Custom API endpoint (proxy, gateway) |
| `ANTHROPIC_API_KEY` | API key |
| `ANTHROPIC_AUTH_TOKEN` | Alternative auth token |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom request headers |

---

## Core Concepts

The Agent SDK runtime principle can be summarized in one sentence: **collect context -> execute actions -> verify results -> repeat**.

This is exactly how human developers work: read code first, then modify code, then run tests and check results. If it is wrong, keep iterating. Agent SDK automates this loop.

### Two Usage Modes

**Mode 1: `query()` function - stateless, suitable for one-off tasks**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="What files are in this directory?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Mode 2: `ClaudeSDKClient` - stateful, suitable for multi-turn conversation**

Use this when you need to preserve context and interact across multiple turns. For example, first ask Claude to read one module, then ask it to find all call sites of that module - in the second turn it still remembers what it read in the first turn.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Turn 1: read the auth module
    async for message in query(
        prompt="Read the authentication module code",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Turn 2: continue based on previous context
    async for message in query(
        prompt="Find all places that call it",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## Built-in Tools: Ready to Use

This is one of the best parts of Agent SDK - you do not need to implement any tools yourself, Claude can use them directly:

| Tool | Capability | Typical Use |
|------|------|---------|
| Read | Read files | View code, read configs |
| Write | Create files | Generate new files |
| Edit | Precise file edits | Bug fixes, refactoring |
| Bash | Run terminal commands | Run tests, install dependencies, git operations |
| Glob | Pattern-based file search | `**/*.py`, `src/**/*.ts` |
| Grep | Regex content search | Find function definitions, TODOs |
| WebSearch | Search web pages | Look up docs, find approaches |
| WebFetch | Fetch web content | Read online docs |
| Task | Launch sub-agents | Parallelize sub-tasks |

Use `allowed_tools` to control which tools the agent can use:

```python
# Read-only agent: can inspect but cannot modify
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Full agent: can read, write, and execute commands
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## Advanced Features

### Hooks: Insert Your Own Logic at Key Points

Hooks let you inject custom code at critical moments of agent execution - for example, logging, intercepting risky operations, and auditing file changes.

Supported hook types include: `PreToolUse` (before tool execution), `PostToolUse` (after tool execution), `Stop` (when the agent stops), `SessionStart`, `SessionEnd`, and more.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Record an audit log every time a file is modified
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactor utils.py for better readability",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

Real-world uses:
- Audit logging: record every operation performed by the agent
- Security interception: block modifications to critical files
- Notification push: send messages when agent tasks complete
- Cost monitoring: count tool calls and token usage

### Sub-Agents: Split Big Tasks Across Specialists

When a task is complex enough, you can define multiple specialized sub-agents and let the main agent delegate sub-tasks to them. Each sub-agent has its own instructions and tool permissions, isolated from each other.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Use the code-reviewer agent to review this project's code quality",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Professional code reviewer responsible for quality and security reviews",
                prompt="Analyze code quality, identify potential issues, and provide improvement suggestions.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Testing specialist responsible for writing unit tests",
                prompt="Write unit tests for functions that are missing tests.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Messages from sub-agents include a `parent_tool_use_id` field, making it easy to track which messages came from which sub-agent.

### MCP Integration: Connect to the Outside World

Through Model Context Protocol (MCP), your agent can connect to external systems such as databases, browsers, and third-party APIs. The community already provides [hundreds of MCP servers](https://github.com/modelcontextprotocol/servers) you can use directly.

```python
# Connect Playwright so the agent can operate a browser
async for message in query(
    prompt="Open example.com and describe what you see",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Common MCP integration scenarios:
- Playwright: browser automation, scraping pages, filling forms
- PostgreSQL/MySQL: direct database querying and operations
- Slack/Email: sending notifications and messages
- GitHub: operating PRs, Issues, and repositories

---

## What Can You Build with It? Practical Scenarios

After understanding features, the most important question is: what can this actually do? Below are real scenarios validated by the community.

### Scenario 1: Automatic Bug-Fix Agent

Give it a bug description, and it can find code, locate the issue, fix it, and run tests to verify:

```python
async for message in query(
    prompt="Users report occasional HTTP 500 errors during login. Investigate and fix code under src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude will grep logs, read related code, find the bug, modify code, and run tests to confirm the fix.

### Scenario 2: Code Review Agent

Build a read-only code review agent that audits quality without making any modifications:

```python
async for message in query(
    prompt="Review code under src/ with focus on security vulnerabilities, performance issues, and coding conventions",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### Scenario 3: CI/CD Integration

In a CI pipeline, let the agent analyze failing tests and attempt automatic fixes:

```python
async for message in query(
    prompt="Run npm test, analyze failing test cases, and fix the code so all tests pass",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

This is a major advantage of Agent SDK over CLI - CLI is good when a human sits at the terminal, while SDK is ideal for embedding into automated workflows.

### Scenario 4: Research Agent

Let the agent search the web, read documentation, synthesize information, and produce a report:

```python
async for message in query(
    prompt="Research mainstream Python Web frameworks in 2026. Compare FastAPI, Django, and Litestar, then write a technical selection report to report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### Scenario 5: Full-Stack Agent with Browser Capability

By connecting Playwright through MCP, the agent can not only write code but also open a browser to verify results:

```python
async for message in query(
    prompt="Fix the homepage style issue, then open a browser and take screenshots to verify the result",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### Scenario Quick Reference

| Scenario | Core Tools | Difficulty |
|------|---------|------|
| Auto bug fixing | Read, Edit, Bash, Grep | Beginner |
| Code review | Read, Glob, Grep | Beginner |
| CI/CD auto-fix | Read, Edit, Bash | Intermediate |
| Technical research report | WebSearch, WebFetch, Write | Beginner |
| Browser automation | MCP (Playwright) | Intermediate |
| Multi-agent collaboration | Task + AgentDefinition | Advanced |
| Database operations | MCP (PostgreSQL/MySQL) | Intermediate |
| Email/notification assistant | MCP (Slack/Email) | Intermediate |

---

## When Should You Use Agent SDK?

Not every scenario needs Agent SDK. Choosing the right tool matters:

| What You Want to Do | Recommended Tool |
|-----------|---------|
| Simple chat, text generation, translation | Basic `anthropic` SDK |
| One-shot tool use (weather lookup, arithmetic) | Basic `anthropic` SDK |
| Autonomously complete multi-step development tasks | Agent SDK |
| Embed into CI/CD pipelines | Agent SDK |
| Build apps that operate on a file system | Agent SDK |
| Daily interactive development | Claude Code CLI |
| One-off quick tasks | Claude Code CLI |

In short: if your task requires Claude to "work hands-on" by itself (reading files, editing code, running commands), use Agent SDK. If you only need Q&A, the basic SDK is enough.

---

## Enterprise Practice: Building a Code-Quality Guardrail Pipeline

The previous scenarios all used one agent for one job. In real enterprise environments, what you need is a full pipeline - multiple agents chained together, each stage with clear input/output, plus auditing, rollback, and notifications.

Now we will build a real scenario: after each PR submission, automatically trigger **code review -> security scan -> auto-fix -> test verification -> report generation** as a complete pipeline.

### Architecture Design

```text
PR submitted
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Code Review │───▶│ Security Scan│───▶│   Auto Fix   │
│    Agent     │    │    Agent     │    │    Agent     │
│ (read-only)  │    │ (read-only)  │    │ (writable)   │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ Test Verify  │───▶│ Report Build │
                                     │    Agent     │    │    Agent     │
                                     │   (Bash)     │    │   (Write)    │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Slack notification
```

Core idea: **each agent does one thing, permissions are minimized, and results are passed in sequence**.

### Step 1: Define the Pipeline Framework

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Audit log: record every operation by every agent
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Shared hook config: all agents share audit capability
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### Step 2: Code Review Agent (Read-Only)

```python
async def run_code_review(pr_diff: str) -> str:
    """Read-only agent, reviews code quality and outputs a structured report"""
    result_text = ""
    async for message in query(
        prompt=f"""Review the following PR diff from these dimensions:
1. Code conventions: naming, formatting, comments
2. Logic issues: edge cases, null pointer risks, race conditions
3. Performance risks: N+1 queries, memory leaks, unnecessary loops
4. Maintainability: oversized functions, unclear responsibilities, magic numbers

PR Diff:
{pr_diff}

Output JSON format: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Step 3: Security Scan Agent (Read-Only)

```python
async def run_security_scan() -> str:
    """Read-only agent focused on vulnerability scanning"""
    result_text = ""
    async for message in query(
        prompt="""Scan the project code for security vulnerabilities:
1. SQL injection, XSS, CSRF
2. Hardcoded keys or credentials
3. Insecure dependency versions
4. Missing permission checks

Output JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Step 4: Auto-Fix Agent (Writable)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Writable agent that auto-fixes code based on review and scan results"""
    result_text = ""
    async for message in query(
        prompt=f"""Fix code according to the following review results:

Code review report:
{review_result}

Security scan report:
{security_result}

Fix rules:
1. Only fix issues with severity high or critical
2. Run related tests after each change to ensure no existing functionality is broken
3. Do not refactor unrelated code, apply minimal fixes only
4. Output the list of modified files after completion""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Step 5: Test Verification + Report Generation

```python
async def run_test_and_report(fix_result: str) -> str:
    """Run tests and generate final report"""
    result_text = ""
    async for message in query(
        prompt=f"""Execute these actions:
1. Run the full test suite (npm test or pytest)
2. Compute test pass rate
3. Generate a Markdown quality report into pr-report.md, including:
   - Count of issues found in code review and severity distribution
   - Number of security vulnerabilities
   - Auto-fix changes: {fix_result}
   - Test pass rate
   - Final conclusion: whether merge is recommended""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Step 6: Chain the Whole Pipeline

```python
import subprocess

async def run_pipeline():
    """Full PR quality-guard pipeline"""
    print("🔍 Stage 1/4: code review...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ Stage 2/4: security scan...")
    security_result = await run_security_scan()

    print("🔧 Stage 3/4: auto-fix...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ Stage 4/4: test verification + report generation...")
    report = await run_test_and_report(fix_result)

    # Save audit log
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Pipeline finished, audit log saved ({len(audit_log)} operation records)")
    return report

asyncio.run(run_pipeline())
```

### Enterprise Design Thinking

This pipeline reflects several key enterprise design principles:

**Least privilege**: code-review and security-scan agents are read-only and cannot accidentally modify code. Only the auto-fix agent has write permission, and even that is constrained by `acceptEdits`.

**Auditable**: every step of every agent is logged through Hooks. If anything goes wrong, you can trace which agent did what and when.

**Result chaining**: each agent's output becomes the next agent's input. Review results feed auto-fix; auto-fix results feed test verification. Every stage has a clear input/output contract.

**Cost control**: every agent has a `max_turns` limit to prevent runaway loops. In production, you can also add `max_budget_usd` for budget control.

**Extensibility**: want another stage, such as a "documentation-check agent" or "performance benchmark agent"? Add a new function and insert it into the pipeline.

This model can be embedded directly into GitHub Actions or GitLab CI, automatically triggered on each PR, truly achieving "AI-driven code quality guardrails."

---

## Error Handling

Agent SDK provides clear exception types so you can build robust fault tolerance in production:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Analyze code"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI is not installed. Please install it first.")
except ProcessError as e:
    print(f"Process exited unexpectedly with exit code: {e.exit_code}")
```

---

## Summary

The core value of Claude Agent SDK is upgrading "model reasoning" into "controlled execution." It does not just generate text. It can truly complete tasks inside an auditable, constrained tool system.

Remember a line from Anthropic's official blog: the Agent SDK design philosophy is "give the agent a computer and let it work like a human."

A good agent application = clear tool design + explicit task boundaries + appropriate human supervision. Tools give the agent capability, boundaries give it constraints, and supervision gives you confidence. None of the three can be missing.

---

## References

### Official Resources

- [Agent SDK Official Docs](https://platform.claude.com/docs/en/agent-sdk/overview) - the most authoritative reference
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK source
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK source
- [Agent SDK Demo Projects](https://github.com/anthropics/claude-agent-sdk-demos) - email assistant, research agent, and more

### Blogs and Tutorials

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - Anthropic engineering blog on design philosophy and architecture
- [Claude Agent SDK Python Study Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - Chinese-friendly full tutorial from zero
- [Claude Agent SDK Full Tutorial](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - practical guide to tool systems, Agent Loop, and controlled execution
- [12 Practical Agent SDK Scenarios](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - covers coding, data, automation, and more
- [Step-by-Step Agent Tutorial](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python dual-track tutorial
