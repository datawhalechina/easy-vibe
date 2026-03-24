# Claude Code MCP Complete Guide

## What is Claude Code MCP?

**Claude Code** is Anthropic's official AI command-line tool, while **MCP (Model Context Protocol)** is the protocol that allows Claude Code to connect to external tools and services.

Put simply, MCP turns Claude Code from an AI assistant that can only read and write local files into a super assistant that can access GitHub, databases, APIs, and cloud services.

## Why use MCP in Claude Code?

### Claude Code without MCP

```text
What you can do:
✓ Read local files
✓ Edit code
✓ Run commands
✓ Use Bash tools

What you cannot do:
✗ View your GitHub Issues
✗ Access a cloud database
✗ Call external APIs
✗ Get real-time weather
```

### Claude Code with MCP

```text
What you can do:
✓ All original functions
✓ View / create GitHub Issues and PRs
✓ Query SQLite and PostgreSQL databases
✓ Access external services such as Notion and Slack
✓ Get real-time weather and map data
✓ Browser automation
✓ ...and more
```

## Quick Start

### Step 1: Understand where the config files live

Claude Code's MCP configuration files are located at:

| Level | Config file path | Scope |
|-----|-------------|----------|
| **User level** | `~/.claude.json` | All projects |
| **Project level** | `.claude/mcp.json` | Current project |

It is recommended to use **project-level config** first, so different projects can use different MCP services.

### Step 2: Add MCP servers with natural language

In Claude Code, you do not need to manually edit configuration files or memorize commands. You can describe what you want in natural language:

```text
You: Help me add a GitHub MCP server. My token is ghp_xxx

Claude: I'll help you configure the GitHub MCP server...

[Automatically updates .claude/mcp.json]
```

```text
You: Add a SQLite database server. The database file is at ./data/app.db

Claude: Okay, I'll configure the SQLite MCP server...
```

```text
You: Add an HTTP-type MCP server with the address https://api.example.com/mcp

Claude: I'll add that remote MCP server...
```

### Step 3: Verify the configuration

Ask Claude Code directly:

```text
You: What MCP servers are available now?

Claude: Currently configured MCP servers:
• github - GitHub integration
• sqlite - SQLite database
• filesystem - Filesystem access
```

Or use the diagnostic command:

```text
/doctor
```

### Step 4: Start using it

Once configuration succeeds, you can call MCP functions directly with natural language:

```text
You: Help me create an Issue on GitHub

Claude: I can help you create a GitHub Issue. Please tell me:
- the repository address, for example owner/repo
- the Issue title
- the Issue description
```

## Natural-language management in Claude Code

### View and manage MCP servers

You can interact with Claude Code entirely in natural language:

```text
You: List all configured MCP servers

You: Check the connection status of the MCP servers

You: Delete the MCP server named notion

You: Update the token for the github server
```

### Diagnose problems

When you run into problems:

```text
You: Check what's wrong with the MCP connection

Claude: [will automatically run diagnostics, analyze configuration files, and check server status]
```

## Configuration methods in detail

### User-level config, global

Edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Project-level config, recommended

Edit `.claude/mcp.json` in the project root:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Advantages of project-level config:**

- Team members can share the config by committing it to Git
- Different projects can use different MCP services
- Configuration is more flexible and does not pollute global settings

### Transport modes

Claude Code supports three transport modes:

#### STDIO, local process

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP, remote service

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE, server-sent events

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Practical examples

### Example 1: GitHub workflow automation

```text
You: Help me push the current changes to GitHub, then create a PR titled "Add new feature"

Claude:
1. Check current git status...
2. Create a new branch feature/new-feature...
3. Commit changes...
4. Push to remote...
5. Call github_create_pull_request to create the PR...
6. PR created: https://github.com/owner/repo/pull/123
```

### Example 2: Database query

```text
You: Query the 10 most recently registered users in the database

Claude:
1. Connect to the SQLite database...
2. Execute query: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Return results:
   - Zhang San (zhang@example.com) - 2025-02-28
   - Li Si (li@example.com) - 2025-02-27
   ...
```

### Example 3: Webpage screenshot analysis

```text
You: Open https://example.com, take a screenshot, and analyze the page design

Claude:
1. Launch browser...
2. Navigate to https://example.com...
3. Capture screenshot...
4. [Returns screenshot]
5. Page design analysis:
   - The layout uses a centered design with a max width of 1200px
   - The main color is blue (#3b82f6)
   - The navigation bar is fixed to the top
   ...
```

### Example 4: Integration with Notion

```text
You: Save the notes I just wrote to Notion

Claude:
1. Use the Notion MCP server...
2. Create a new page...
3. Saved: https://notion.so/page/xxx
```

## Debugging tips

### Diagnose with natural language

When something goes wrong, just tell Claude Code directly:

```text
You: My MCP server cannot connect. Please check it for me

You: The GitHub MCP tool call failed. What is the reason?

You: Why does the sqlite server always show "connecting"?
```

Claude Code will automatically:

1. Check the configuration file format
2. Validate environment variables
3. Test the server connection
4. Provide concrete fix suggestions

### Common problem troubleshooting

| Problem | Possible cause | Solution |
|-----|---------|----------|
| Server not connected | Config file format error | Check JSON syntax |
| Tool cannot be called | Insufficient permissions | Check environment variables |
| Connection timeout | Network problem | Check URL or network |
| Process crashes | Bug in server code | Check server logs |

### Manual diagnostic command

```text
/doctor
```

Example output:

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP server status:
• github: ✓ Connected (12 tools)
• sqlite: ✗ Connection failed - Database file not found
• puppeteer: ✓ Connected (8 tools)

Suggestions:
1. Check whether the sqlite database path is correct
2. Make sure the .claude/mcp.json format is correct
```

## Best practices

### 1. Prefer project-level configuration

**Why recommend project-level configuration?**

Different projects often need different MCP services. For example, a frontend project may need browser testing tools, while a backend project may need database connections. With project-level configuration, each project can have its own dedicated set of MCP servers, avoiding the chaos of one large global config.

More importantly, project-level config can be committed to Git. After team members clone the project, they can directly use the same MCP services without reconfiguring everything.

```text
Project A, frontend project -> .claude/mcp.json contains browser testing MCP
Project B, backend project -> .claude/mcp.json contains database MCP
```

### 2. Store sensitive information in environment variables

**Never hard-code secrets in the configuration file.**

Configuration files may be accidentally committed to Git and leak keys. The correct approach is to store sensitive values in environment variables and only reference the variable names from the config file. That way, even if the config file becomes public, the real secrets are still hidden.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

The first form is good because it reads from the environment variable. The second form is bad because it hard-codes a secret directly.

### 3. Pin versions

**Why do you need to pin versions?**

By default, `npx -y` will always use the latest version of an MCP server. This can cause problems: a new version may introduce breaking changes, or a package may suddenly be removed or renamed.

By appending `@version` to the package name, you ensure that a validated version is always used, reducing surprises caused by automatic upgrades.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. Document your MCP configuration

**Help teammates understand the MCP setup quickly**

When a project includes multiple MCP servers, new team members may not understand what each server is for or what configuration it requires. Creating a `README.md` under the `.claude/` directory that explains each server's purpose, required config, and how to obtain credentials can significantly reduce communication cost.

Create `.claude/README.md` in your project:

```markdown
# MCP Configuration Notes

MCP servers used in this project:

## github
Used for GitHub automation. Requires GITHUB_TOKEN.

## sqlite
Connects to ./data/app.db for querying and modifying data.

## puppeteer
Used for E2E testing.
```

## Claude Code vs Claude Desktop

| Feature | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Config file** | `~/.claude.json` or `.claude/mcp.json` | `claude_desktop_config.json` |
| **Project-level config** | ✓ Supported | ✗ Not supported |
| **Natural-language management** | ✓ Supported | ✗ Manual editing required |
| **Diagnostics** | ✓ `/doctor` | ✗ None |
| **Hot reload** | ✓ Automatic | ✗ Requires app restart |
| **Use cases** | Development workflow, CI/CD | Daily use, office tasks |

## Common MCP servers

> 💡 For the complete MCP server list, please refer to the appendix: [MCP Server Directory](/zh-cn/appendix/mcp-servers/)

### GitHub server

**Function:** Issues, PRs, repository management

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Get a token from:** https://github.com/settings/tokens

### SQLite server

**Function:** Query and manage SQLite databases

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Filesystem server

**Function:** Access files inside a specified directory

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteer browser automation

**Function:** Browser control, screenshots, automated testing

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Brave search server

**Function:** Web search

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## Reference resources

### Official documentation

- [Claude Code official documentation - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP official website](https://modelcontextprotocol.io/)
- [MCP specification documentation](https://modelcontextprotocol.io/specification/)
- [MCP GitHub repository](https://github.com/modelcontextprotocol)

### Official servers

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub integration
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLite database
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQL database
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Filesystem access
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Browser automation
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Web fetching
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Brave search
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Git operations

### Tutorial articles

- [A thorough explanation of MCP principles and practice](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP (Model Context Protocol) architecture and how it works](https://m.toutiao.com/w/1826385835060307/)
- [2025 latest large-model tutorial: from getting started to mastering the MCP protocol](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [Learn MCP from scratch (8) - build an MCP server](https://juejin.cn/post/7582510291667419187)

### Configuration guides

- [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code complete configuration guide](https://juejin.cn/post/7576838552472043563)

### Development tutorials

- [Beginner-friendly MCP server practical guide in both TypeScript and Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Ultimate MCP server building guide: complete TypeScript and Python tutorials](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Build the simplest MCP server with TypeScript](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Generate a TypeScript MCP server using Azure container applications](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### MCP server resources

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - the most comprehensive MCP server list
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - Anthropic's official app store
- [MCP.so](https://mcp.so) - community MCP server center
- [Glama.ai MCP](https://glama.ai/mcp/servers) - MCP directory with ratings and comments
- [Smithery](https://smithery.ai) - MCP server marketplace
- [MCPHub](https://mcphub.io/registry) - clean interface directory
- [LobeHub MCP](https://lobehub.com/zh/mcp) - Chinese MCP directory

### Map and weather services

- [Amap MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tencent Location Service MCP documentation](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Caiyun Weather MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### Community resources

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - production-grade Claude Code configuration collection
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Chinese learning path for Claude Code

### Real-world application cases

- [BlenderMCP - AI-driven 3D modeling](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [15 best practices for MCP in production](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
