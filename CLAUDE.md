# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Easy-Vibe**, an educational curriculum for learning AI Vibe Coding from zero to advanced levels. It's a documentation-based project using Docsify to serve educational content about AI-assisted software development.

The curriculum follows a progressive four-stage structure:

- **Stage 0 (幼儿园)**: Introduction to AI programming through games
- **Stage 1 (AI 产品经理)**: Building AI-powered web application prototypes
- **Stage 2 (初中级开发工程师)**: Full-stack development with databases and deployment
- **Stage 3 (高级开发工程师)**: Cross-platform development (WeChat mini-programs, Android apps, MCP)

## Development Commands

### Start Local Documentation Server

```bash
npm install      # Install dependencies (first time only)
npm run dev      # Start docsify server on port 3000
# or
npm start        # Same as npm run dev
```

The documentation will be available at `http://localhost:3000`

### Build/Run Commands

- `npm run dev` - Serves the documentation using docsify-cli on port 3000
- No build step required - docsify serves markdown files directly

## Project Architecture

### Directory Structure

```
easy-vibe/
├── docs/                    # Main documentation content (served by docsify)
│   ├── index.html          # Docsify configuration and plugins
│   ├── _sidebar.md         # Sidebar navigation structure
│   ├── README.md           # Homepage (symlink to root README.md)
│   ├── stage-0/            # Stage 0 content (幼儿园)
│   ├── stage-1/            # Stage 1 content (AI 产品经理)
│   ├── stage-2/            # Stage 2 content (初中级开发工程师)
│   ├── stage-3/            # Stage 3 content (高级开发工程师)
│   ├── appendix/           # Reference materials (AI capability dictionary)
│   ├── examples/           # Practical examples and tutorials
│   ├── extra/              # Additional knowledge (Git, API, RAG, etc.)
│   └── project/            # Legacy project documentation
├── assets/                 # Images and static assets (symlinked in docs/)
├── package.json           # Project dependencies and scripts
└── README.md              # Project overview and contribution guide
```

### Content Organization

Each stage follows a numbered chapter structure:

```
stage-{N}/
└── {N}.{M}-{chapter-name}/
    ├── index.md          # Main content file
    └── images/           # Chapter-specific images
```

Example: `stage-1/1.1-introduction-to-ai-ide/index.md`

### Documentation System (Docsify)

The project uses **Docsify** with the following key configuration in `docs/index.html`:

- **Single Sidebar**: `loadSidebar: true` with `/_sidebar.md` alias for all routes
- **Search**: Full-text search across all documentation
- **Dark Mode**: Theme toggle with localStorage persistence
- **Image Viewer**: Viewer.js for image zoom/rotate/flip
- **Code Copy**: Copy code button on all code blocks
- **Pagination**: Previous/Next navigation between chapters
- **Word Count**: Chinese word count display on each page

### Sidebar Management

The sidebar is defined in `docs/_sidebar.md`. When adding new chapters:

1. Add the chapter entry to the appropriate stage section
2. Follow the existing pattern: `* [Chapter Title](stage-{N}/{chapter-dir}/index.md)`
3. Ensure relative paths match the actual directory structure

### Asset Management

- Static assets are in `/assets/` at the root level
- Chapter-specific images go in `stage-{N}/{chapter-dir}/images/`
- Images are referenced with relative paths from the markdown file location
- Global CSS limits image display to max 80% width, 300px height with centered alignment

### Legacy Content Structure

The project maintains three legacy sections in the sidebar for backward compatibility:

1. **Project 文档** (`project/`): Older chapter-based tutorials
2. **Extra 扩展知识** (`extra/`): Supplementary topics (Git, APIs, RAG, deployment)
3. **Examples 实战案例** (`examples/`): Practical tutorials (some moved to stage-3)

When updating content, prefer integrating into the stage structure over adding to legacy sections.

## Content Guidelines

### Writing New Chapters

1. Create directory: `docs/stage-{N}/{N}.{M}-{chapter-name}/`
2. Create `index.md` with chapter content
3. Add images subdirectory if needed: `images/`
4. Update `docs/_sidebar.md` with the new entry
5. Follow Chinese language conventions (this is a Chinese curriculum)

### Content Status Markers

In README.md, use these status indicators:

- ✅ Completed
- 🚧 In progress/Under construction

### File Naming Conventions

- Use kebab-case for directories: `1.1-introduction-to-ai-ide`
- Use `index.md` for primary content files
- Images use descriptive names in their respective chapter directories

## Permissions

The project has configured bash permissions in `.claude/settings.local.json`:

- File operations: `which`, `find`, `mv`, `tree`, `cat`, `curl`, `lsof`
- Process management: `xargs ps`, `kill`
- Development: `npm run dev`

## Key Context for Development

- **Educational Focus**: This is curriculum content, not application code
- **Target Audience**: Beginners to advanced developers learning AI-assisted programming
- **Language**: Primary content is in Chinese
- **No Build Pipeline**: Docsify serves markdown directly, no compilation needed
- **Git Workflow**: Content changes should preserve formatting and structure
- **Asset Paths**: Always use relative paths from markdown file location

When making changes:

- Preserve the Docsify configuration in `docs/index.html`
- Maintain sidebar structure consistency
- Test locally with `npm run dev` before committing
- Check that image links work correctly
- Ensure dark mode styles are not broken
