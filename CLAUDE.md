# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Easy-Vibe** is an educational curriculum for learning AI Vibe Coding from zero to advanced levels. It's a documentation-based project using **VitePress** to serve educational content about AI-assisted software development.

The curriculum follows a progressive four-stage structure:

- **Stage 0 (幼儿园)**: Introduction to AI programming through games
- **Stage 1 (AI 产品经理)**: Building AI-powered web application prototypes
- **Stage 2 (初中级开发工程师)**: Full-stack development with databases and deployment
- **Stage 3 (高级开发工程师)**: Cross-platform development (WeChat mini-programs, Android apps, MCP)

## Development Commands

### Start Local Documentation Server

```bash
npm install      # Install dependencies (first time only)
npm run dev      # Start VitePress dev server
```

The documentation will be available at `http://localhost:5173` (VitePress default port)

### Build/Run Commands

- `npm run dev` - Start VitePress development server with hot reload
- `npm run build` - Build static site for production (outputs to `docs/.vitepress/dist`)
- `npm run preview` - Preview production build locally
- `npm run format` - Format code using Prettier

### Node Version Requirement

- Node.js >= 18.0.0 required (specified in package.json `engines`)

## Project Architecture

### VitePress Base Path Configuration

The site automatically configures its base path based on the deployment environment:

- **Vercel**: Uses `/` as base (detected via `VERCEL` environment variable)
- **GitHub Pages / Local**: Uses `/easy-vibe/` as base

This logic is in `docs/.vitepress/config.mjs:3-5`. When linking assets or configuring paths, the `${base}` variable is used to ensure compatibility across environments.

### Directory Structure

```
easy-vibe/
├── docs/                        # Main documentation content (served by VitePress)
│   ├── .vitepress/             # VitePress configuration and theme
│   │   ├── config.mjs          # Site configuration (nav, sidebar, plugins)
│   │   ├── theme/              # Custom theme extensions
│   │   │   ├── Layout.vue      # Override default layout with typewriter effect
│   │   │   ├── index.js        # Theme setup (Viewer.js, TypeIt, image optimization)
│   │   │   └── style.css       # Custom CSS overrides
│   │   ├── dist/               # Production build output (generated)
│   │   └── cache/              # VitePress cache (generated)
│   ├── index.md                # Homepage
│   ├── public/                 # Static assets (logo.png, etc.)
│   ├── assets/                 # Symlink to ../assets
│   ├── stage-0/                # Stage 0 content (幼儿园)
│   ├── stage-1/                # Stage 1 content (AI 产品经理)
│   ├── stage-2/                # Stage 2 content (初中级开发工程师)
│   ├── stage-3/                # Stage 3 content (高级开发工程师)
│   ├── appendix/               # Reference materials (AI capability dictionary)
│   ├── examples/               # Practical examples and tutorials (legacy)
│   ├── extra/                  # Additional knowledge (Git, API, RAG, etc.)
│   ├── guide/                  # Course guide
│   └── project/                # Legacy project documentation
├── assets/                     # Images and static assets
├── package.json                # Project dependencies and scripts
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project overview and contribution guide
```

### Content Organization

Each stage follows a numbered chapter structure:

```
stage-{N}/
└── {category or chapter-dir}/
    └── index.md          # Main content file (or .md file directly)
```

Examples:

- `stage-1/1.1-introduction-to-ai-ide/index.md`
- `stage-2/backend/2.1-what-is-api/extra2/extra2-what-is-api.md`

**Note**: Content files may use either `index.md` or direct `.md` files depending on the chapter structure.

### Documentation System (VitePress)

The project uses **VitePress 2.0.0-alpha.15** with these key features:

**Configuration** (`docs/.vitepress/config.mjs`):

- **Single Sidebar**: Route-based sidebars configured per path prefix (`/stage-0/`, `/stage-1/`, etc.)
- **Navigation**: Top nav with links to each stage and appendix
- **Search**: Local search via `minisearch` (no external API required)
- **Dark Mode**: Built-in VitePress theme with toggle

**Custom Theme** (`docs/.vitepress/theme/`):

- **Image Viewer**: Viewer.js integration for zoom/rotate/flip on all images
- **Typewriter Effect**: TypeIt.js for homepage hero tagline animation
- **Image Optimization**: Automatic image height classes based on aspect ratio
- **Custom Layout**: Extends default theme with `Layout.vue` override
- **Reading Settings**: Element Plus popover panel for adjusting font size (12-18px) and line height (1.25-1.8) with localStorage persistence

**Key Theme Behaviors**:

- Images with aspect ratio > 1.2 get height-limited classes (tall/very-tall/ultra-tall)
- Viewer.js initialized on `.vp-doc` container on each route change
- Typewriter effect only activates on homepage when `frontmatter.hero.tagline` is an array
- Font size/line height adjustments use CSS custom properties `--ev-doc-font-size` and `--ev-doc-line-height`
- Reading settings panel appears in nav bar after the search/home buttons (gear icon)

### Sidebar Management

The sidebar is defined in `docs/.vitepress/config.mjs`. When adding new chapters:

1. Locate the appropriate route prefix section (`/stage-0/`, `/stage-1/`, etc.)
2. Add a new object with `text` (display name) and `link` (relative path)
3. For nested items, use `items` array with `collapsed: true|false`
4. **Links should not include `.md` extension** - VitePress handles this
5. Links should not include `index` - use directory path with trailing slash

Example pattern:

```javascript
{
  text: 'Chapter Title',
  link: '/stage-1/chapter-directory/'  // Note: trailing slash, no .md
}
```

### Asset Management

- Root-level static assets are in `/assets/` at project root
- Public files (favicon, logo) go in `docs/public/`
- Images are referenced with relative paths from markdown file location
- VitePress serves `docs/assets` as symlink to `../assets`
- Image optimization is automatic via theme (height-limited classes based on aspect ratio)

### Deployment

**Vercel** (vercel.json):

- Build command: `npm run build`
- Output directory: `docs/.vitepress/dist`
- Framework: vitepress

**Preview Production Build**:

```bash
npm run build
npm run preview  # Preview built site locally
```

### Legacy Content Structure

The project maintains three legacy sections for backward compatibility:

1. **Project 文档** (`project/`): Older chapter-based tutorials (migrated to Stage 2)
2. **Extra 扩展知识** (`extra/`): Supplementary topics - Git, APIs, RAG, deployment (migrated to Stage 2/3)
3. **Examples 实战案例** (`examples/`): Practical tutorials (migrated to Stage 0/3)

When updating content, prefer integrating into the stage structure over adding to legacy sections.

## Content Guidelines

### Writing New Chapters

1. Create directory: `docs/stage-{N}/{chapter-directory}/`
2. Create `index.md` or direct `.md` file with chapter content
3. Update `docs/.vitepress/config.mjs` sidebar with the new entry
4. Follow Chinese language conventions (this is a Chinese curriculum)

### Content Status Markers

In README.md, use these status indicators:

- ✅ Completed
- 🚧 In progress/Under construction

### File Naming Conventions

- Use kebab-case for directories: `1.1-introduction-to-ai-ide`, `frontend`, `backend`
- Content can be either `index.md` in a directory or a direct `.md` file
- Images use descriptive names; can be in chapter subdirectories or root `/assets/`

### Code Formatting

Prettier configuration (`.prettierrc`):

- No semicolons (`semi: false`)
- Single quotes (`singleQuote: true`)
- No trailing commas (`trailingComma: "none"`)

Run `npm run format` before committing code changes.

## Interactive Vue Components

### Component Registration

All interactive Vue components for the documentation are registered in `docs/.vitepress/theme/index.js`. To add a new component:

1. Create the `.vue` file in the appropriate subdirectory of `docs/.vitepress/theme/components/`
2. Import the component in `docs/.vitepress/theme/index.js`
3. Register the component using `app.component('ComponentName', ComponentName)` in the `enhanceApp` function

### Component Categories

Components are organized by topic:

- `appendix/llm-intro/` - Large Language Model interactive demos
- `appendix/vlm-intro/` - Vision Language Model interactive demos
- `appendix/git-intro/` - Git workflow visualizations
- `appendix/terminal-intro/` - Terminal/CLI interactive demos
- `appendix/web-basics/` - HTML/CSS/JavaScript fundamentals
- `appendix/auth-design/` - Authentication/authorization demos
- `appendix/cache-design/` - Caching strategy visualizations
- `appendix/database-intro/` - Database fundamentals
- `appendix/queue-design/` - Message queue demos
- `appendix/operations/` - DevOps/monitoring demos
- `appendix/deployment/` - Deployment architecture demos
- `appendix/frontend-performance/` - Frontend performance demos
- `appendix/frontend-evolution/` - Frontend history/evolution demos
- `appendix/backend-evolution/` - Backend architecture evolution
- `appendix/backend-languages/` - Backend language comparisons

### Using Components in Markdown

Components can be used directly in markdown files:

```markdown
## LLM Basics

<LLMQuickStartDemo />

### Tokenization

<TokenizationDemo />
```

### Component Development Best Practices

1. **Props**: Use props for configurable demo parameters
2. **Styling**: Use scoped CSS or Tailwind-like utility classes
3. **Responsiveness**: Ensure components work on mobile and desktop
4. **Accessibility**: Include aria labels where appropriate
5. **i18n**: Keep text content minimal or use props for text

## Multi-language Support

### Supported Locales

The project supports 13 languages:

- `zh-cn` - Simplified Chinese (primary)
- `zh-tw` - Traditional Chinese
- `en-us` - English (US)
- `ja-jp` - Japanese
- `ko-kr` - Korean
- `es-es` - Spanish
- `fr-fr` - French
- `de-de` - German
- `ar-sa` - Arabic
- `vi-vn` - Vietnamese

### Adding Multi-language Content

1. Create content in `docs/{locale}/` following the same structure as `docs/zh-cn/`
2. Add locale configuration in `docs/.vitepress/config.mjs` under `locales`
3. Copy the sidebar structure from `zh-cn` and translate the text values

### Content Translation Priority

1. **Primary**: `zh-cn` (Simplified Chinese) - always complete this first
2. **Secondary**: `en-us` (English) - for international reach
3. **Tertiary**: Other languages based on contributor availability

## Permissions

The project has configured bash permissions in `.claude/settings.local.json`:

- File operations: `which`, `find`, `mv`, `tree`, `cat`, `curl`, `lsof`, `mkdir`, `cp`, `ls`
- Process management: `xargs ps`, `kill`
- Development: `npm run dev`, `npm run build`, `npm run preview`, `npm run format`

## Key Context for Development

- **Educational Focus**: This is curriculum content, not application code
- **Target Audience**: Beginners to advanced developers learning AI-assisted programming
- **Language**: Primary content is in Chinese
- **Build Pipeline**: VitePress requires build step for production (`npm run build`)
- **Git Workflow**: Content changes should preserve formatting and structure
- **Asset Paths**: Always use relative paths from markdown file location

When making changes:

- Preserve the VitePress configuration in `docs/.vitepress/config.mjs`
- Maintain sidebar structure consistency in config.mjs
- Test locally with `npm run dev` before committing
- Check that image links work correctly
- Ensure theme customizations in `.vitepress/theme/` are not broken
- Run `npm run format` before committing code changes (uses Prettier: no semicolons, single quotes)
