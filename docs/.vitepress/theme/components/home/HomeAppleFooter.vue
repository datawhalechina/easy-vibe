<script setup>
import { computed, inject } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  isCjkLocale: Boolean
})

const t = inject('t')

const appleFooterInfo = computed(() => {
  const locale = t.value._locale || 'zh-cn'
  const content = {
    'zh-cn': {
      notes: [
        '1. 学习路径与章节内容会持续更新，显示内容以当前页面为准。',
        '2. 示例项目与截图用于教学演示，可能与后续版本界面存在差异。',
        '3. 部分章节链接会随着课程迭代调整，建议优先从首页导航进入最新路径。'
      ],
      breadcrumbPrefix: 'Easy-Vibe',
      breadcrumbCurrent: '学习导航',
      columns: [
        {
          title: '学习与导航',
          links: ['零基础入门', '初中级开发', '高级开发', '附录', '学习地图', '课程总览']
        },
        {
          title: '学习支持',
          links: ['常见问题', '学习建议', '章节勘误', '版本更新']
        },
        {
          title: '项目资源',
          links: ['GitHub 仓库', '开源协议', '提交 Issue', '贡献指南']
        },
        {
          title: '社区',
          links: ['学习社群', '讨论区', '课程反馈']
        },
        {
          title: '关于 Easy-Vibe',
          links: ['项目介绍', '更新日志', '联系我们']
        }
      ],
      more: '更多学习方式：访问',
      moreLink: 'GitHub 仓库',
      moreTail: '，获取更新与交流信息。',
      copyright: 'Copyright © 2026 Easy-Vibe. 保留所有权利。',
      policies: ['隐私政策', '使用条款', '网站地图']
    },
    en: {
      notes: [
        '1. Learning paths and chapters are continuously updated.',
        '2. Screenshots and demo projects are for educational illustration.',
        '3. Some chapter links may change as the course evolves.',
        '4. The page is optimized for modern desktop browsers and responsive layouts.'
      ],
      breadcrumbPrefix: 'Easy-Vibe',
      breadcrumbCurrent: 'Learning Navigation',
      columns: [
        {
          title: 'Explore',
          links: ['Foundations', 'Junior/Mid Dev', 'Senior Dev', 'Appendix', 'Learning Map', 'Course Outline']
        },
        {
          title: 'Support',
          links: ['FAQ', 'Learning Tips', 'Errata', 'Release Notes']
        },
        {
          title: 'Resources',
          links: ['GitHub Repository', 'License', 'Report Issue', 'Contribution Guide']
        },
        {
          title: 'Community',
          links: ['Community', 'Discussions', 'Feedback']
        },
        {
          title: 'About Easy-Vibe',
          links: ['Overview', 'Changelog', 'Contact']
        }
      ],
      more: 'More ways to learn: visit',
      moreLink: 'GitHub Repository',
      moreTail: ' for updates and community discussions.',
      copyright: 'Copyright © 2026 Easy-Vibe. All rights reserved.',
      policies: ['Privacy Policy', 'Terms of Use', 'Sitemap']
    }
  }
  return content[locale] || content.en
})

const footerBtnLink = computed(() => {
  const locale = t.value._locale || 'zh-cn'
  return withBase(`/${locale}/stage-1/learning-map/`)
})

const footerRepositoryLink = 'https://github.com/datawhalechina/easy-vibe'

const footerPolicyLinkMap = {
  '隐私政策': '#',
  '使用条款': '#',
  '网站地图': '#',
  'Privacy Policy': '#',
  'Terms of Use': '#',
  'Sitemap': '#'
}

const footerColumnLinkMap = {
  '零基础入门': '/stage-1/learning-map/',
  '初中级开发': '/stage-2/',
  '高级开发': '/stage-3/',
  '附录': '/appendix/',
  '学习地图': '/stage-1/learning-map/',
  '课程总览': '/stage-1/learning-map/',
  'Foundations': '/stage-1/learning-map/',
  'Junior/Mid Dev': '/stage-2/',
  'Senior Dev': '/stage-3/',
  'Appendix': '/appendix/',
  'Learning Map': '/stage-1/learning-map/',
  'Course Outline': '/stage-1/learning-map/',
  'Overview': '/stage-1/learning-map/'
}

const footerExternalLinks = {
  'GitHub 仓库': 'https://github.com/datawhalechina/easy-vibe',
  'GitHub Repository': 'https://github.com/datawhalechina/easy-vibe',
  'Changelog': 'https://github.com/datawhalechina/easy-vibe/releases',
}

const getFooterLink = (label) => {
  const external = footerExternalLinks[label]
  if (external) return external
  const basePath = footerColumnLinkMap[label]
  if (!basePath) return '#'
  const locale = t.value._locale || 'zh-cn'
  if (basePath.startsWith('/guide/') && locale !== 'zh-cn' && locale !== 'en') {
    return `/${locale}/stage-1/learning-map/`
  }
  return `/${locale}${basePath}`
}

const getPolicyLink = (label) => {
  return footerPolicyLinkMap[label] || '#'
}

const resolveFooterHref = (link) => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link
  }
  return withBase(link)
}
</script>

<template>
  <div class="footer-callout">
    <h2 v-html="t.footer.title" />
    <p>{{ t.footer.desc }}</p>
    <a
      class="buy-btn large"
      :href="footerBtnLink"
    >{{ t.footer.btn }}</a>
  </div>

  <div
    class="apple-site-footer"
    :class="{ 'is-cjk-locale': isCjkLocale }"
  >
    <div class="apple-site-footer-inner">
      <div class="apple-footer-breadcrumb">
        <span>⌘</span>
        <span>›</span>
        <span>{{ appleFooterInfo.breadcrumbPrefix }}</span>
        <span>›</span>
        <span>{{ appleFooterInfo.breadcrumbCurrent }}</span>
      </div>

      <div class="apple-footer-notes">
        <p
          v-for="(item, idx) in appleFooterInfo.notes"
          :key="idx"
        >
          {{ item }}
        </p>
      </div>

      <div class="apple-footer-grid">
        <div
          v-for="(column, index) in appleFooterInfo.columns"
          :key="index"
          class="apple-footer-column"
        >
          <h4>{{ column.title }}</h4>
          <a
            v-for="(link, linkIndex) in column.links"
            :key="linkIndex"
            :href="resolveFooterHref(getFooterLink(link))"
          >
            {{ link }}
          </a>
        </div>
      </div>

      <div class="apple-footer-more">
        {{ appleFooterInfo.more }}
        <a :href="footerRepositoryLink">{{ appleFooterInfo.moreLink }}</a>
        {{ appleFooterInfo.moreTail }}
      </div>

      <div class="apple-footer-bottom">
        <p>{{ appleFooterInfo.copyright }}</p>
        <div class="apple-footer-policy">
          <a
            v-for="(policy, policyIndex) in appleFooterInfo.policies"
            :key="policyIndex"
            :href="resolveFooterHref(getPolicyLink(policy))"
          >
            {{ policy }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-callout {
  text-align: center;
  padding: 92px 20px;
  background: #fff;
  margin: 0 40px 64px;
  border-radius: 40px;
}

.dark .footer-callout {
  background: var(--vp-c-bg-soft);
}

.footer-callout h2 {
  font-size: 62px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #1d1d1f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC',
    sans-serif;
}

.footer-callout p {
  color: #6e6e73;
  font-size: 20px;
  margin-bottom: 18px;
}

.dark .footer-callout h2 {
  color: var(--vp-c-text-1);
}

.dark .footer-callout p {
  color: var(--vp-c-text-2);
}

.apple-site-footer {
  max-width: 1060px;
  margin: 0 auto 56px;
  padding: 0 40px;
}

.apple-site-footer-inner {
  border-top: 1px solid #d2d2d7;
  color: #6e6e73;
  font-size: 12px;
}

.apple-footer-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6e6e73;
  font-size: 12px;
  padding-top: 12px;
}

.apple-site-footer.is-cjk-locale .apple-footer-breadcrumb {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.apple-footer-notes {
  padding-top: 18px;
}

.apple-footer-notes p {
  margin: 0 0 8px;
  line-height: 1.45;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-notes p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.88;
  letter-spacing: 0.03em;
  font-weight: 400;
  color: #7d7d83;
}

.apple-footer-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 22px;
}

.apple-footer-column h4 {
  margin: 0 0 10px;
  color: #1d1d1f;
  font-size: 12px;
  font-weight: 600;
}

.apple-site-footer.is-cjk-locale .apple-footer-column h4 {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: 0.025em;
}

.apple-footer-column a {
  display: block;
  color: #424245;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 1.25;
}

.apple-site-footer.is-cjk-locale .apple-footer-column a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
  margin-bottom: 9px;
}

.apple-footer-column a:hover {
  color: #0066cc;
}

.apple-footer-more {
  margin-top: 18px;
  border-top: 1px solid #d2d2d7;
  padding-top: 14px;
  color: #6e6e73;
}

.apple-site-footer.is-cjk-locale .apple-footer-more {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.72;
  letter-spacing: 0.02em;
}

.apple-footer-more a {
  color: #0066cc;
}

.apple-footer-bottom {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #d2d2d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.apple-footer-bottom p {
  margin: 0;
  color: #86868b;
}

.apple-site-footer.is-cjk-locale .apple-footer-bottom p {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

.apple-footer-policy {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.apple-footer-policy a {
  color: #424245;
}

.apple-footer-policy a:hover {
  color: #0066cc;
}

.apple-site-footer.is-cjk-locale .apple-footer-policy a {
  font-family:
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC',
    sans-serif;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.02em;
}

@media (min-width: 1024px) {
  .apple-site-footer {
    max-width: 996px;
    padding: 0 24px;
  }

  .apple-site-footer-inner {
    font-size: 11px;
  }

  .apple-footer-notes p {
    font-size: 11px;
    line-height: 1.38;
    margin-bottom: 6px;
  }

  .apple-footer-grid {
    grid-template-columns: 1.2fr repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .apple-footer-column h4 {
    font-size: 11px;
    margin-bottom: 8px;
  }

  .apple-footer-column a {
    font-size: 11px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .site-footer-inner {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-notes p {
    font-size: 13px;
    margin-bottom: 7px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column h4 {
    font-size: 13px;
  }

  .apple-site-footer.is-cjk-locale .apple-footer-column a {
    font-size: 13px;
    margin-bottom: 8px;
  }
}

@media (max-width: 768px) {
  .footer-callout {
    margin: 0 16px 40px;
    border-radius: 28px;
  }

  .footer-callout h2 {
    font-size: 38px;
  }

  .footer-callout p {
    font-size: 17px;
  }

  .apple-site-footer {
    padding: 0 16px;
  }

  .apple-footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 14px;
  }

  .apple-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
