# 部署说明

本项目是 VitePress 文档站，生产输出目录是 `docs/.vitepress/dist`。GitHub Pages 使用 `.github/workflows/deploy.yml` 自编译部署，不提交构建产物。

## 部署目标

| 目标                 | URL                                           | 触发方式                  |
| -------------------- | --------------------------------------------- | ------------------------- |
| 上游 GitHub Pages    | `https://datawhalechina.github.io/easy-vibe/` | 上游 `main` push 自动部署 |
| 当前 fork Pages      | `https://longbiaochen.github.io/easy-vibe/`   | fork `main` push 自动部署 |
| Vercel               | 由 Vercel 项目域名决定                        | Vercel 自动构建           |
| 本地预览             | `http://localhost:4173/easy-vibe/`            | `npm run preview`         |

fork 默认不会部署 Pages。需要在 fork 仓库中启用 GitHub Pages 的 GitHub Actions 发布源，并设置仓库变量 `ENABLE_PAGES_DEPLOY=true`。

## Base 和站点 URL

`docs/.vitepress/config.mjs` 支持通过环境变量覆盖部署路径：

- `BASE` 控制 VitePress 静态资源和路由前缀。
- `SITE_URL` 控制 canonical、Open Graph、sitemap 和 robots 中的站点 URL。

GitHub Actions 会默认设置：

```bash
BASE="/<repo-name>/"
SITE_URL="https://<owner>.github.io/<repo-name>"
```

如果需要自定义域名或非标准路径，在仓库变量中设置：

- `PAGES_BASE`
- `PAGES_SITE_URL`

## Ship-It 流程

当操作者说 `ship it` 时，按下面顺序执行：

1. 确认只发布本次目标变更，保留无关 dirty 文件。
2. 运行本地验证：

   ```bash
   npm run verify
   ```

3. 如果改动影响页面渲染或交互，启动本地预览并用官方 Codex in-app browser 验证相关页面。
4. 提交目标变更并推送到 fork `main`。
5. 等待 `Deploy VitePress site to Pages` workflow 完成。
6. 在官方 Codex in-app browser 打开 fork Pages：

   ```text
   https://longbiaochen.github.io/easy-vibe/
   ```

7. 验证首页、`/welcome.html`、相关变更页面、导航、资源加载和 canonical/sitemap/robots URL。
8. 预览确认后，整理相对 `upstream/main` 的变更摘要，并询问操作者是否创建上游 PR。没有明确确认前，不创建 PR。

## 一次性 fork 配置

首次启用 fork Pages 时执行：

```bash
git remote add upstream git@github.com:datawhalechina/easy-vibe.git
gh variable set ENABLE_PAGES_DEPLOY --repo longbiaochen/easy-vibe --body true
gh api repos/longbiaochen/easy-vibe/pages -X POST -f build_type=workflow
gh repo edit longbiaochen/easy-vibe --homepage https://longbiaochen.github.io/easy-vibe/
```

如果 `upstream` 已存在，用下面命令确认它指向上游：

```bash
git remote set-url upstream git@github.com:datawhalechina/easy-vibe.git
```

## 验证清单

- [ ] `npm run verify` 通过。
- [ ] GitHub Actions Pages workflow 成功部署。
- [ ] fork Pages 首页能正常访问。
- [ ] `/welcome.html` 能正常访问。
- [ ] 本次变更涉及的页面能正常访问。
- [ ] 导航、语言切换和图片资源能正常加载。
- [ ] canonical、sitemap 和 robots 指向当前部署域名。
- [ ] 只有在操作者明确确认后，才创建到上游的 PR。

## 常见问题

### fork push 后没有部署

检查 fork 仓库变量：

```bash
gh variable list --repo longbiaochen/easy-vibe
```

必须有 `ENABLE_PAGES_DEPLOY=true`。如果 Pages 仍未启用，确认 GitHub Pages source 是 GitHub Actions。

### 页面资源 404

通常是 `BASE` 不正确。GitHub Pages 项目站点应使用 `/<repo-name>/`，当前 fork 是 `/easy-vibe/`。

### sitemap 或 robots 指向上游

通常是 `SITE_URL` 没有设置。GitHub Actions 默认会按当前仓库所有者生成 fork URL；自定义域名时设置 `PAGES_SITE_URL`。
