# Claude Code Remote Development on Mobile

## Introduction

Imagine these scenarios: you suddenly think of a brilliant bug-fix idea on the subway during your commute; you receive an urgent production incident alert while waiting in line at a cafe; you want to check how your AI-built project is progressing while accompanying your girlfriend shopping.

In traditional development workflows, these scenarios usually mean you need to find a place to open your laptop, or helplessly postpone the work. But in the AI-assisted coding era, the rules have changed. Claude Code makes it possible to carry your development environment in your pocket and stay productive anytime, anywhere.

In the summer of 2025, as Claude Code adoption grew, developers started exploring different "coding on phone" approaches. From simple local Termux usage, to complex SSH + Tailscale remote connections, to dedicated Happy Coder apps, a full mobile development ecosystem gradually took shape.

The core problem this chapter solves is: how to make Claude Code follow your phone and become a true "pocket development assistant."

---

::: info Community Feedback at a Glance

Based on real-world community feedback, the experience of each approach compares as follows:

**Happy Coder (Approach 2)**
- Connection stability issues: disconnections happen often, and context is lost after disconnects
- Limited functionality: cannot use `/` commands
- Security concerns: depends on official relay servers, and some users are concerned about data security

**HAPI (Approach 3)**
- Supports self-hosted servers: can be deployed on your own VPS
- Better experience when paired with Tailscale: run `hapi server` on your computer and connect from your phone through the Tailscale IP
- Relatively stable connection, suitable for long-term use

**Claude Remote Control (Official Approach)**
- Official solution, natively integrated with Claude Code
- Supports full access to local environments (MCP, tools, project configuration)
- Requires Max subscription (Pro support is coming soon)
- Relies on Anthropic cloud connectivity

**Recommendation**: if you require high connection stability, or are concerned about third-party relay security, choose **HAPI + Tailscale** or the **official Remote Control** approach.

:::

---

## Core Principle: Mobile Development Architecture Patterns

Before introducing specific approaches, first understand the essence of the problem.

### Why is mobile development a problem?

Traditional IDEs (such as VS Code and IntelliJ) require a full operating system environment, strong CPU, large memory, and storage space. Although phones are increasingly powerful, they still have natural limits for development experience:

**Input constraints**: virtual keyboards are inefficient for coding, and complex syntax is easy to mistype

**Screen constraints**: small screens make it hard to view code, terminal, and browser at the same time

**Environment constraints**: phones cannot run full development toolchains (compilers, databases, debuggers)

**Connection constraints**: mobile networks are unstable, and SSH sessions disconnect easily

### Core idea: thin-client architecture

The core idea behind all mobile development approaches is the same: the phone is only the "control console"; real development work is done elsewhere.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   Phone     │              │ Host/Cloud  │             │
│    │ (Controller)│   ────────►  │ (Executor)  │             │
│    │             │   Commands   │             │             │
│    │ • Send cmds │              │ • Run CLI   │             │
│    │ • View out  │              │ • Exec code │             │
│    │ • Review    │              │ • Access fs │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

This architecture allows the phone to focus only on human-computer interaction, while heavy computation is delegated to your host or cloud.

---

## Approach 1: Official iOS App

In October 2025, Anthropic officially launched Claude Code mobile support in the iOS app. This is the simplest mobile development option.

### Regional limitations

Important note: the Claude app **cannot be used directly** in mainland China.

If you are in mainland China, it is recommended to use **Happy Coder** directly (Approach 2), which can work normally through configured domestic API relay services.

If you have an overseas Apple ID, you can switch regions and download the Claude app.

### How it works

```text
┌─────────────┐                    ┌─────────────────┐
│  iOS App    │ ──────────────────► │ Anthropic Cloud │
│  (Phone)    │   HTTPS + OAuth     │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

Your phone app only sends commands. All code execution runs in Anthropic's cloud sandbox, and results are synced through GitHub.

### Basic usage

**Prerequisites:**

- iPhone with iOS 15 or later
- Claude Pro/Team/Enterprise subscription (free plan is not supported)
- GitHub account

**Steps:**

1. Download Claude app from App Store
2. Log in to your Anthropic account
3. Find the "Code" tab in the app
4. Connect your GitHub repository through OAuth
5. Start creating tasks

### Pros and cons

Pros are zero setup barrier, smooth experience, and push notifications. Cons are iOS-only support, primary GitHub workflow, relatively limited capability (cannot access local file systems), and no direct availability in mainland China.

---

## Approach 2: Happy Coder

Happy Coder is an open-source mobile and web client designed for Claude Code and Codex, with end-to-end encryption and remote control of your AI coding assistant from anywhere.

### How it works

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server │   ◄────────  │happy-coder  │
│ (Phone/Web) │ Encrypted WS │   (Relay)    │  WebSocket   │ (Desktop)   │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

On your computer, run `happy` instead of `claude` to launch your AI coding assistant. When you need phone control, the session automatically switches to remote mode. Press any key on your computer to switch back to local control.

### Installation and usage

**Step 1: download app**

| Platform | Link |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**Step 2: install CLI on computer**

```bash
npm install -g happy-coder
```

**Step 3: launch and pair**

```bash
# run in your project directory
cd ~/my-project
happy

# a pairing QR code will be shown
```

**Step 4: scan and pair on phone**

Open Happy app and scan the QR code shown on your computer. After pairing succeeds, you can control Claude Code from your phone.

**Step 5: use**

```bash
# launch Claude Code
happy

# or launch Codex
happy codex
```

### Resource links

- [GitHub Project](https://github.com/slopus/happy) - source code
- [Documentation](https://happy.engineering/docs) - usage docs
- [Discord Community](https://discord.gg/fX9WBAhyfD) - community discussion

### Pros and cons

Pros are simple setup, cross-platform support, end-to-end encryption, and open-source auditability. Cons are dependence on third-party relay infrastructure and the need to verify mobile app availability in your own environment.

---

## Approach 3: HAPI

HAPI is an alternative to Happy Coder, with a local-first design and support for seamless device switching across multiple AI models.

### How it works

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI App   │   ────────►  │ HAPI Server │   ◄────────  │    hapi     │
│ (Phone/PWA/ │  WireGuard   │ (Self-hosted│  WireGuard   │ (Desktop)   │
│ Telegram)   │   + TLS      │   relay)    │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini etc. │
                                                        └─────────────┘
```

HAPI uses WireGuard plus TLS for end-to-end encryption. All communication goes through encrypted relay servers. You can self-host relay servers to fully control your data flow.

### Core features

- **Seamless switching**: switch control between desktop and phone; press any key to return to local control
- **Native-first**: mobile apps are wrapped with native technology for smooth interaction
- **AFK approvals**: receive approval requests on your phone while away from your computer
- **Multi-model support**: supports Claude Code, Codex, Gemini, OpenCode, and more
- **Terminal anywhere**: access via PWA, Telegram Mini App, and more
- **Voice control**: supports voice input commands, so your hands stay free

### Installation and usage

**Step 1: start relay server**

```bash
# run on your server (or launch directly with npx)
npx @twsxtd/hapi hub --relay
```

**Step 2: install CLI on computer**

```bash
# run in your project directory
cd ~/my-project
npx @twsxtd/hapi

# or install globally
npm install -g @twsxtd/hapi
hapi
```

**Step 3: pair devices**

Follow terminal prompts, open HAPI app on your phone, and scan the QR code to complete pairing.

**Step 4: access methods**

| Access Method | Description |
|---------|------|
| Web PWA | Browser access, supports install-to-home-screen |
| Telegram Mini App | Use directly inside Telegram |
| Mobile App | Native app experience (if published) |

### Differences from Happy Coder

| Feature | Happy Coder | HAPI |
|------|-------------|------|
| Design philosophy | Cloud-first | Local-first |
| Encryption method | WebSocket + E2E | WireGuard + TLS |
| Multi-model support | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| Access methods | iOS/Android/Web | PWA, Telegram, more |
| Voice control | No | Yes |
| AFK approvals | No | Yes |
| Self-hosted relay | Requires manual deployment | Out-of-the-box support |

### Resource links

- [GitHub Project](https://github.com/tiann/hapi) - source code
- [PWA Docs](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - PWA installation and usage
- [How It Works](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - technical implementation details
- [Voice Assistant](https://github.com/tiann/hapi/blob/main/docs/voice.md) - voice control features
- [Why HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - design philosophy
- [FAQ](https://github.com/tiann/hapi/blob/main/docs/faq.md) - frequently asked questions

### Pros and cons

Pros are local-first design, multi-model support, end-to-end encryption, voice control, and self-hosted relay capability. Cons are that the project is relatively new and the ecosystem is still growing.

---

## Approach 4: SSH + Tailscale + Tmux

This is the best option for professional developers. You remotely connect to your development machine over SSH and keep sessions persistent with Tmux.

### How it works

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Phone     │   ────────►  │  Tailscale  │   ◄────────  │  Computer   │
│ (SSH client)│   VPN P2P    │ relay/hole  │   VPN P2P    │ (dev host)  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │ (session    │
                                                        │ persistence)│
                                                        └─────────────┘
```

Tailscale creates a peer-to-peer VPN so you can access your home computer from any network. Tmux ensures Claude Code keeps running in the background even when SSH disconnects.

### Why do you need Tailscale?

**Problems with traditional SSH:**

```text
Phone (4G) ──XX──> Router NAT ──XX──> Home Computer
             (cannot penetrate)   (LAN isolation)
```

Your computer is on a private network, and your phone is on the public network, so direct access fails. Traditional solutions require port forwarding plus dynamic DNS, which are complex and risky.

**Tailscale solution:**

```text
Phone (4G) ──► Tailscale Relay ──◄── Home Computer
            (auto hole-punch or relay)
```

Tailscale uses NAT traversal, and falls back to relay automatically if traversal fails. The entire connection is encrypted.

### Full setup steps

**Step 1: install Tailscale on computer**

```bash
# macOS
brew install --cask tailscale

# or download installer
# https://tailscale.com/download
```

**Step 2: log in and get IP**

```bash
# start Tailscale
sudo tailscale up

# check Tailscale IPv4
tailscale ip -4
# example output: 100.x.x.x
```

**Step 3: install Tailscale on phone**

Download Tailscale from App Store or Google Play and log in with the same account.

**Step 4: install and configure Tmux**

```bash
# macOS
brew install tmux

# create ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# enable mouse support
set -g mouse on

# default terminal with 256 colors
set -g default-terminal "screen-256color"

# change prefix key to Ctrl+A (optional)
unbind C-b
set -g prefix C-a

# simplified split shortcuts
bind v split-window -h
bind h split-window
EOF
```

**Step 5: create a persistent session**

```bash
# create session named "claude"
tmux new -s claude

# start Claude Code in this session
cd ~/my-project
claude

# detach without closing
# press Ctrl+B then D
```

**Step 6: connect from phone SSH client**

Recommended SSH clients:

| Client | Platform | Notes |
|--------|------|------|
| Blink Shell | iOS | Supports MOSH, great for unstable networks |
| Termius | iOS/Android | Cross-platform and polished UI |
| a-Shell | iOS | Free and lightweight |

Connection config:

```text
Host: 100.x.x.x (your Tailscale IP)
Port: 22
Username: your computer username
```

After connecting, attach to Tmux:

```bash
tmux attach -t claude
```

### Advanced tips

**Prevent your computer from sleeping:**

```bash
# macOS
caffeinate -dimsu &

# or set System Settings > Energy Saver > prevent automatic sleep
```

**Use MOSH for unstable networks:**

MOSH (Mobile Shell) is an SSH alternative optimized for mobile networks, with seamless recovery across network changes.

```bash
# install on computer
brew install mosh

# use MOSH from phone client
# Blink Shell supports MOSH natively
```

**One-command connect script:**

Set this as startup command in your SSH client:

```bash
tmux attach -t claude || tmux new -s claude
```

This will auto-attach to an existing session or create a new one.

### Pros and cons

Pros are full capabilities and desktop-equivalent workflow with all development tools. Cons are more complex setup and the requirement to keep your computer online.

---

## Approach 5: Local Termux Runtime

If you are an Android user, you can run Claude Code directly on your phone without connecting external devices.

### How it works

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │ (Linux env) │                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • Project   │                          │
│                    │   files     │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux is a terminal emulator and Linux environment for Android. You can directly install Node.js and Claude Code in it.

### Installation steps

**Important**: download Termux from [F-Droid](https://f-droid.org/), not from Google Play (the Play version is outdated).

**Step 1: install base tools**

```bash
# update package manager
pkg update && pkg upgrade

# install development tools
pkg install git nodejs python vim
```

**Step 2: install Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**Step 3: configure environment**

```bash
# create workspace
mkdir -p ~/projects
cd ~/projects

# initialize project
git clone https://github.com/your-repo.git
cd your-repo

# launch Claude Code
claude
```

**Step 4: configure external keyboard (recommended)**

In Termux:

```bash
# enable extra keys row
# long press screen > More > Extra keys row

# configure shortcuts
# add in ~/.termux/termux.properties
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### Performance considerations

| Task Type | Android Performance |
|---------|-------------|
| Web development (HTML/CSS/JS) | Excellent |
| Python scripts | Excellent |
| Node.js applications | Good |
| Running test suites | Medium |
| Compiling large projects | Not recommended |

### Pros and cons

Pros are full local control, no external host dependency, and offline-first operation. Cons are limited phone performance, weak text input experience, and Android-only availability.

---

## Approach 6: Claude Code UI

Claude Code UI (also known as CloudCLI) is an open-source project that provides a web interface for Claude Code, with phone browser support.

### How it works

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│Phone Browser│   ────────►  │ Web Server  │   ◄────────  │Claude Code  │
│             │  HTTP/HTTPS  │ (localhost) │   invoke     │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

You run a web server on your computer, then access it from your phone browser. This requires LAN access or tunneling.

### Installation and usage

**Step 1: install**

```bash
# one-command start (recommended)
npx @siteboon/claude-code-ui

# or global install
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**Step 2: open interface**

Server defaults to `http://localhost:3001`.

**Step 3: access from phone**

Method A - LAN access (same Wi-Fi):

```bash
# bind all interfaces
claude-code-ui --host 0.0.0.0

# access from phone
http://<computer-lan-ip>:3001
```

Method B - ngrok tunnel:

```bash
# install ngrok
brew install ngrok

# start tunnel
ngrok http 3001

# open ngrok URL from phone
```

### Features

- Responsive design with mobile support
- Built-in chat interface
- File browser
- Git operations UI
- Session management

### Pros and cons

Pros are graphical interface and rich features. Cons are tunnel requirements outside LAN and relatively more complex setup.

---

## Approach 7: Cloud Development Environment

If you do not have an always-on local computer, you can use cloud development environments where Claude Code runs on cloud servers.

### How it works

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   Phone     │   ────────►  │ Cloud Box   │   ─────────► │Claude Code  │
│(Browser/App)│    HTTPS     │  (DevBox)   │              │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

A cloud container comes with Claude Code preinstalled, and you access it from browser or mobile app.

### Using Sealos DevBox

**Step 1: create environment**

Go to [Sealos DevBox](https://sealos.io/devbox), choose a Claude Code template, and create an environment.

**Step 2: start development environment**

Environment is ready in about 30-60 seconds, and you get a web terminal.

**Step 3: configure Claude API**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**Step 4: connect Happy app**

```bash
# install happy-coder (or use preinstalled)
npm install -g happy-coder

# generate pairing QR code
happy
```

After scanning on your phone, you can use it immediately.

### Cloud option comparison

| Platform | Claude Code | Mobile Optimization | Startup Time | Pricing |
|------|------------|----------|----------|------|
| Sealos DevBox | Preinstalled | Happy support | ~60s | Pay-as-you-go |
| GitHub Codespaces | Manual setup | Browser flow | ~2-3 min | Free quota + hourly |
| Gitpod | Manual setup | Browser flow | ~1-2 min | Free quota + hourly |
| Replit | No native Claude Code | Native app | Instant | Free + subscription |

### Pros and cons

Pros are no local computer requirement, environment consistency, and scalability. Cons are paid usage, network dependency, and code hosted in cloud.

---

## Comparison and Selection

Each approach has different strengths and is suitable for different scenarios.

### Comparison table

| Approach | Difficulty | Requires Tunnel | Cost | Best Scenarios |
|------|------|-------------|------|----------|
| Official iOS App | Easy | No | $20/month | Quick checks, simple tasks |
| Happy Coder | Relatively easy | No | Free | Daily use, convenience |
| HAPI | Medium | No | Free | Multi-model, local-first |
| SSH + Tailscale | Relatively complex | No | Free | Professional development, full features |
| Termux | Medium | No | Free | Android local development |
| Claude Code UI | Medium | Yes | Free | Web interface preference |
| Cloud DevBox | Easy | No | Pay-as-you-go | No local computer |

### Selection guide

**If you are in mainland China**: use **Happy Coder**; with domestic API relay setup, it works well.

**If you want maximum convenience**: choose Happy Coder. Scan-and-use flow is very convenient.

**If you need multi-model support**: choose HAPI. It supports multiple AI coding assistants and is ideal for model switching workflows.

**If you have an always-on computer**: choose SSH + Tailscale. This gives the most complete experience.

**If you are an iPhone user (outside mainland China)**: official app is the easiest way to get started.

**If you only have Android**: Termux gives a fully local mobile development path.

**If you do not have a computer**: cloud DevBox is the ideal choice.

---

## Security and Privacy

Mobile development involves code transfer over networks, so security needs special attention.

### Risks of relay servers

When using relay-dependent services like Happy Coder or HAPI, consider these risks:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  What can a relay server potentially see?                  │
│                                                             │
│  • Data before encryption (if E2E is implemented poorly)   │
│  • Metadata (when you connect, how long sessions run)      │
│  • Your API key (if configured incorrectly)                 │
│                                                             │
│  What can a relay server potentially do?                   │
│                                                             │
│  • Record your code content                                │
│  • Steal API credentials                                   │
│  • Inject malicious commands                               │
│  • Abuse your device as an attack node                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Security best practices

**1. Code sensitivity grading**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Public projects/learning code -> any approach is acceptable│
│                                                             │
│  Private projects -> prefer SSH+Tailscale or self-hosted   │
│                                                             │
│  Commercial code -> use SSH+Tailscale only, disable all    │
│  third-party relay paths                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. Key management**

```bash
# do not hard-code keys in source
const apiKey = "sk-ant-xxxxx"

# use environment variables
const apiKey = process.env.ANTHROPIC_API_KEY

# use .env files (add to .gitignore)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. Use sandbox mode**

Claude Code supports sandbox mode to limit access scope:

```bash
claude --sandbox /path/to/project
```

**4. Self-host relay**

If using Happy Coder, consider self-hosting relay:

```bash
# clone project (includes server implementation)
git clone https://github.com/slopus/happy.git
cd happy

# deploy server to your VPS
# follow project documentation for details
```

**5. Use Headscale**

Headscale is an open-source implementation of Tailscale and can be self-hosted:

```bash
# one-command Docker deployment
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## Frequently Asked Questions

### Do I need NAT traversal?

Most modern approaches **do not** require manual NAT traversal:

| Approach | Principle |
|------|------|
| Happy Coder | Relay mode, both sides actively connect to server |
| HAPI | Relay mode, WireGuard + TLS |
| Tailscale | NAT hole-punching or relay |
| iOS App | Cloud execution |
| Claude Code UI | Requires inbound access |

### Why does relay mode not require traversal?

```text
Outbound connection (NAT allows):
Computer ──► Relay Server yes

Inbound connection (NAT blocks):
External ──► Computer no

Relay trick:
Both sides make outbound connections to the relay,
so neither side needs inbound connectivity.
```

### Does mobile development affect battery life?

Different approaches consume different power:

| Approach | Power Usage | Reason |
|------|--------|------|
| SSH terminal | Low | Text-only rendering |
| iOS App | Medium | Cloud execution, phone controls only |
| Termux | High | Local CLI runtime |
| Browser | Medium | Web UI rendering load |

For long sessions, keep your phone charging.

### What happens when network disconnects?

| Approach | Impact of Network Disconnect |
|------|-------------|
| SSH + Tmux | Claude keeps running; recover on reconnect |
| Happy Coder | Auto-reconnect |
| HAPI | Auto-reconnect |
| iOS App | Cloud continues; app shows disconnect |
| Termux | Session interruption |

### Can I compile large projects on a phone?

Not recommended. Phone CPU and memory are limited, and large builds can cause:

- significant heating
- rapid battery drain
- very long compile times

Run heavy build tasks on remote hosts or cloud environments.

---

## Summary

The core idea of Claude Code mobile development is: **the phone is the controller, and real development runs elsewhere**.

Which approach you should choose depends on your specific needs.

If you are in mainland China, **Happy Coder** is recommended, especially when paired with domestic API relay configuration.

If you want the most convenient setup, use **Happy Coder**. Scan to connect, get push notifications, and switch devices smoothly.

If you need multi-model support or local-first architecture, use **HAPI**. It supports multiple assistants and self-hosted relay.

If you want the most complete development experience, use **SSH + Tailscale**. Setup is more complex, but capability is closest to desktop.

If you are an iOS user outside mainland China, the **official app** is the easiest way to begin.

If you are an Android user, **Termux** enables fully local development on the phone.

If you do not have an always-on computer, **cloud DevBox** is the ideal option.

No matter which solution you choose, security matters: be cautious with third-party relay for sensitive code, manage API keys properly, and prefer self-hosted or private paths for important projects.

---

## References

### Official Resources

- [Claude Code Official Docs](https://docs.anthropic.com/en/docs/claude-code) - complete official Claude Code documentation
- [Claude iOS App](https://apps.apple.com/app/claude/id6473753684) - official iOS app

### Open Source Projects

- [slopus/happy](https://github.com/slopus/happy) (2.5k stars) - Happy Coder mobile client
- [tiann/hapi](https://github.com/tiann/hapi) - HAPI local-first multi-model AI coding assistant
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k stars) - open-source Tailscale implementation

### Chinese Tutorials

- [Code Anytime Anywhere: Configure Claude Code on Phone](https://m.blog.csdn.net/haa_y/article/details/151156494) - Termux setup guide
- [AI Lab in Your Pocket: Always-Online Claude Code Mobile Workflow](https://www.cnblogs.com/swizard/p/19308983) - Tmux + Docker approach
- [I Took Claude Code Shopping with My Girlfriend](https://post.m.smzdm.com/p/a3r7d63d/) - Tailscale remote connection
- [Build Production Apps from Phone](https://m.toutiao.com/article/7611823834756301318/) - real mobile development case

### English Resources

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - most comprehensive mobile guide
- [SSH + Tailscale + Termius Complete Guide](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - detailed remote connectivity guide

### Tool Downloads

- [Tailscale](https://tailscale.com/download) - peer-to-peer VPN tool
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - Android terminal emulator
- [Blink Shell](https://blink.sh/) - iOS SSH client (MOSH support)
- [Termius](https://termius.com/) - cross-platform SSH client
