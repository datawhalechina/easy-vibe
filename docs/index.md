---
layout: home
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  // 语言映射：浏览器语言代码 -> 网站路径
  const langMap = {
    'zh': '/zh-cn/',
    'zh-cn': '/zh-cn/',
    'zh-tw': '/zh-tw/',
    'zh-hk': '/zh-tw/',
    'en': '/en-us/',
    'en-us': '/en-us/',
    'en-gb': '/en-us/',
    'ja': '/ja-jp/',
    'ja-jp': '/ja-jp/',
    'ko': '/ko-kr/',
    'ko-kr': '/ko-kr/',
    'es': '/es-es/',
    'es-es': '/es-es/',
    'fr': '/fr-fr/',
    'fr-fr': '/fr-fr/',
    'de': '/de-de/',
    'de-de': '/de-de/',
    'ar': '/ar-sa/',
    'ar-sa': '/ar-sa/',
    'vi': '/vi-vn/',
    'vi-vn': '/vi-vn/'
  }

  // 获取浏览器语言
  const browserLang = navigator.language.toLowerCase()
  const browserLangShort = browserLang.split('-')[0]

  // 确定目标语言
  let targetLang = langMap[browserLang] || langMap[browserLangShort]

  // 如果没有匹配的语言，默认使用中文
  if (!targetLang) {
    targetLang = '/zh-cn/'
  }

  // 立即跳转，不显示任何内容
  // 使用 withBase 自动处理 base 路径（根据 config.mjs 中的配置）
  window.location.replace(withBase(targetLang))
})
</script>
