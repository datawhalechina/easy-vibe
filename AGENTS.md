# Repository Guidelines

## Project Structure & Module Organization

- `docs/`: VitePress site source (Markdown content, sidebar/nav, assets referenced by docs).
- `docs/.vitepress/theme/`: custom theme, global component registration in `index.js`, shared styles in `style.css`, layout in `Layout.vue`.
- `docs/.vitepress/theme/components/appendix/*/`: interactive Vue demos used inside appendix pages (e.g. `web-basics/`, `deployment/`).
- `assets/`: repo-level images/media (if referenced, prefer linking/copying into `docs/public/` or a doc-local folder when appropriate).
- `scripts/`, `tools/`, `update_readmes.cjs`: utility scripts for maintaining docs.

## Build, Test, and Development Commands

This repo is a VitePress (Vue 3) documentation project. Requires Node.js **>= 18**.

```bash
npm install
npm run dev      # start local docs server (hot reload)
npm run build    # production build (use as CI-style check)
npm run preview  # preview the built site locally
npm run format   # run Prettier on the whole repo
```

## Coding Style & Naming Conventions

- Formatting: Prettier (`npm run format`). Keep diffs small and avoid reformatting unrelated files.
- Vue components: Vue 3 SFCs with `<script setup>`, PascalCase filenames (e.g. `SemanticTagsDemo.vue`).
- CSS: prefer VitePress theme variables (`var(--vp-c-*)`) and keep components responsive (`@media (max-width: 720px)` when needed).
- Docs: use clear headings and short paragraphs; components are referenced in Markdown as `<ComponentName />`.
- Images: prefer WebP for new screenshots (quality 80–85 is a starting point), preserving ICC color profiles and transparency. For example: `cwebp -q 85 -m 6 -sharp_yuv -metadata icc input.png -o input.webp`. Crop or resize only when small text remains readable, and check representative text-heavy crops at full size before committing.
- When replacing an image, update references in every locale and remove the obsolete source after checking that nothing still references it. Avoid keeping both PNG and WebP copies of the same screenshot.
- Measure image savings from the current tracked files; existing clones retain old image blobs in Git history. Run the production build and check rendered image URLs as well as Markdown links.

## Testing Guidelines

There is no dedicated test framework in this repo. Use `npm run build` as the primary correctness check, and manually verify interactive components in `npm run dev`.

## Commit & Pull Request Guidelines

- Commits follow a Conventional Commits style seen in history: `feat: ...`, `fix: ...`, `docs: ...` (optionally scoped like `feat(docs): ...`).
- PRs should include: a short description, screenshots/GIFs for UI or component changes, and any relevant paths touched (e.g. `docs/zh-cn/appendix/...`, `docs/.vitepress/theme/...`).

## Configuration & Deployment Notes

- `vercel.json` is present; keep builds reproducible and avoid relying on local-only assets.
