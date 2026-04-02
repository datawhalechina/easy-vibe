# 🚀 部署说明

## Base 路径自动适配

本项目的 VitePress 配置已经正确处理了 **Vercel** 和 **GitHub Pages** 两种部署环境的不同 base 路径。

### 自动适配逻辑

```javascript
// docs/.vitepress/config.mjs
const isVercel = process.env.VERCEL === '1'
const base = isVercel ? '/' : '/easy-vibe/'
```

### 部署环境对比

| 平台             | Base 路径     | 示例 URL                                                    |
| ---------------- | ------------- | ----------------------------------------------------------- |
| **Vercel**       | `/`           | `https://your-project.vercel.app/cn/stage-1/...`            |
| **GitHub Pages** | `/easy-vibe/` | `https://datawhalechina.github.io/easy-vibe/cn/stage-1/...` |
| **本地开发**     | `/easy-vibe/` | `http://localhost:5173/easy-vibe/cn/stage-1/...`            |
| **本地预览**     | `/easy-vibe/` | `http://localhost:4173/easy-vibe/cn/stage-1/...`            |

### 首页动态链接

首页使用 VitePress 的 `useData()` API 来动态获取 base 路径：

```vue
<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const base = site.value.base
</script>

<template>
  <a :href="base + 'cn/stage-1/learning-map/'">
    <!-- 链接会自动适配部署环境 -->
  </a>
</template>
```

**优点**：

- ✅ 无需硬编码 fallback 值
- ✅ 自动适配 Vercel 和 GitHub Pages
- ✅ 构建时和运行时都正确

## 部署步骤

### Vercel 部署

1. 推送代码到 GitHub
2. Vercel 会自动检测 `vercel.json` 配置
3. 自动构建并部署
4. 访问 `https://your-project.vercel.app`

**环境变量**：Vercel 自动设置 `VERCEL=1`

### GitHub Pages 部署

1. 配置 GitHub Pages 设置：
   - Source: `gh-pages` 分支
   - 或使用 GitHub Actions 从 `main` 分支部署

2. 构建命令：

   ```bash
   npm run build
   ```

3. 访问 `https://datawhalechina.github.io/easy-vibe`

## 验证部署

部署后检查以下链接是否正常：

- [ ] 首页能正常访问
- [ ] 导航栏链接能正确跳转
- [ ] 首页卡片"查看详情"链接正确
- [ ] 语言切换功能正常
- [ ] 图片资源能正常加载

## 常见问题

### Q: Vercel 部署后链接变成 `/easy-vibe/cn/...` 导致 404

**原因**：Vercel 环境变量未正确设置

**解决**：

1. 检查 Vercel 项目设置中 `Environment Variables`
2. 确保 `VERCEL` = `1` 已设置（通常自动设置）
3. 重新部署

### Q: GitHub Pages 部署后所有链接 404

**原因**：缺少 `/easy-vibe/` base 路径

**解决**：

1. 检查 `docs/.vitepress/config.mjs` 中的 base 配置
2. 确保 GitHub Pages 环境下 `isVercel = false`
3. 重新构建并部署

### Q: 本地预览链接缺少 `/easy-vibe/` 前缀

**原因**：使用了错误的预览命令

**解决**：

```bash
# 错误
npm run preview  # 默认端口 4173，但路径可能不对

# 正确
npm run build
npm run preview  # 访问 http://localhost:4173/easy-vibe/
```
