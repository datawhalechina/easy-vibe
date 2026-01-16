<!--
  SemanticTagsDemo.vue
  语义标签速查：点击标签名，右侧展示用途、是否块级/行内、常见场景和示例 HTML。
-->
<template>
  <div class="semantic">
    <div class="tags">
      <button
        v-for="t in tags"
        :key="t.name"
        :class="['tag-btn', { active: t.name === current.name }]"
        @click="current = t"
      >
        {{ t.name }}
      </button>
    </div>

    <div class="panel">
      <div class="row"><span class="label">用途</span><span>{{ current.purpose }}</span></div>
      <div class="row"><span class="label">类型</span><span>{{ current.display }}</span></div>
      <div class="row"><span class="label">常见位置</span><span>{{ current.scene }}</span></div>
      <div class="row code-title">示例</div>
      <pre><code>{{ current.example }}</code></pre>
      <div class="row code-title">渲染效果</div>
      <div class="preview-box" v-html="current.example"></div>
      <div class="row tip">小贴士：{{ current.tip }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = [
  {
    name: '<header>',
    purpose: '页面/区块的头部区域，通常放 Logo、导航',
    display: '块级',
    scene: '页面顶部、文章顶部',
    example: `<header style="background:#eee; padding:10px;">\n  <h1 style="margin:0;">我的网站</h1>\n  <nav>...</nav>\n</header>`,
    tip: '一个页面可有多个 header，只要是各自区块的开头都行'
  },
  {
    name: '<nav>',
    purpose: '导航链接区域',
    display: '块级',
    scene: '全站导航、面包屑、侧边栏',
    example: `<nav style="background:#f4f4f4; padding:10px;">\n  <a href="javascript:void(0)">首页</a> | <a href="javascript:void(0)">关于</a>\n</nav>`,
    tip: '尽量只放导航链接，便于屏幕阅读器识别'
  },
  {
    name: '<main>',
    purpose: '文档主体，一个页面只能有一个',
    display: '块级',
    scene: '包裹主要内容区域',
    example: `<main style="border:1px dashed #999; padding:10px;">\n  <article>主要内容区域...</article>\n</main>`,
    tip: '辅助技术可快速跳转到 main，提高可访问性'
  },
  {
    name: '<section>',
    purpose: '主题分组的区块',
    display: '块级',
    scene: '页面分段、文档章节',
    example: `<section style="border-left:4px solid #007acc; padding-left:10px;">\n  <h2 style="margin:0;">功能亮点</h2>\n  <p>这里是功能介绍...</p>\n</section>`,
    tip: '每个 section 里最好有标题（h2/h3）'
  },
  {
    name: '<article>',
    purpose: '一篇可独立传播的内容',
    display: '块级',
    scene: '博客文章、论坛帖子、卡片',
    example: `<article style="border:1px solid #ddd; padding:10px; border-radius:4px;">\n  <h2 style="margin-top:0;">博客标题</h2>\n  <p>正文内容...</p>\n</article>`,
    tip: 'article 里可以再嵌套 section'
  },
  {
    name: '<aside>',
    purpose: '旁注/侧栏信息',
    display: '块级',
    scene: '侧边栏、提示框、相关链接',
    example: `<aside style="background:#fff3cd; padding:10px;">\n  <h3 style="margin-top:0;">相关阅读</h3>\n  <ul style="margin-bottom:0;">\n    <li>文章一</li>\n    <li>文章二</li>\n  </ul>\n</aside>`,
    tip: '与主内容相关但非主体'
  },
  {
    name: '<footer>',
    purpose: '页面/区块的底部区域',
    display: '块级',
    scene: '版权、联系信息、链接',
    example: `<footer style="background:#333; color:#fff; padding:10px; text-align:center;">\n  <p style="margin:0;">© 2026 MySite</p>\n</footer>`,
    tip: '页面可有多个 footer，对应不同区块'
  },
  {
    name: '<figure>',
    purpose: '插图+说明的容器',
    display: '块级',
    scene: '图片/代码片段/表格附说明',
    example: `<figure style="border:1px solid #ccc; padding:5px; margin:0; display:inline-block;">\n  <img src="https://placehold.co/150x100?text=Hero+Img" alt="示例" style="display:block;"/>\n  <figcaption style="text-align:center; font-size:12px; color:#666;">图注文字</figcaption>\n</figure>`,
    tip: '搭配 <figcaption> 提示内容说明'
  }
]

const current = ref(tags[0])
</script>

<style scoped>
.semantic { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 16px; margin: 20px 0; display: grid; grid-template-columns: 1fr 2fr; gap: 12px; }
@media (max-width: 720px) { .semantic { grid-template-columns: 1fr; } }
.tags { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; }
.tag-btn { padding: 10px 12px; border-radius: 10px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; text-align: left; }
.tag-btn.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.panel { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; justify-content: space-between; gap: 8px; font-size: 14px; }
.label { color: var(--vp-c-text-2); font-weight: 700; }
.code-title { font-weight: 700; margin-top: 4px; }
pre { margin: 0; background: #0b1221; color: #e5e7eb; border-radius: 8px; padding: 10px; font-family: var(--vp-font-family-mono); font-size: 13px; white-space: pre-wrap; }
.preview-box {
  border: 1px dashed var(--vp-c-divider);
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.tip { color: var(--vp-c-text-2); font-size: 13px; }
</style>
