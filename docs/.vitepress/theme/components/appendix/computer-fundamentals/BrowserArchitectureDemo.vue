<template>
  <div class="browser-demo">
    <div class="demo-title">浏览器架构 ── 点击模块查看详情</div>
    <div class="arch">
      <div
        v-for="mod in modules"
        :key="mod.name"
        class="mod-card"
        :class="{ active: active === mod.name }"
        @click="active = active === mod.name ? '' : mod.name"
      >
        <div class="mod-header">
          <span class="mod-icon">{{ mod.icon }}</span>
          <span class="mod-name">{{ mod.name }}</span>
        </div>
        <transition name="expand">
          <div v-if="active === mod.name" class="mod-detail">
            <div class="mod-desc">{{ mod.desc }}</div>
            <div class="mod-tags">
              <span v-for="tag in mod.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('')
const modules = [
  { icon: '🎨', name: '用户界面', desc: '你直接看到和操作的部分：地址栏、标签页、书签、前进/后退按钮', tags: ['地址栏', '标签页', '书签栏'] },
  { icon: '🔗', name: '浏览器引擎', desc: '连接用户界面和渲染引擎的桥梁，负责协调两者之间的通信', tags: ['Blink', 'Gecko', 'WebKit'] },
  { icon: '📄', name: '渲染引擎', desc: '解析 HTML 和 CSS，将代码转换成你看到的网页画面', tags: ['HTML 解析', 'CSS 计算', '布局绘制'] },
  { icon: '⚡', name: 'JavaScript 引擎', desc: '执行网页中的 JavaScript 代码，实现页面的动态交互效果', tags: ['V8', 'SpiderMonkey', 'JavaScriptCore'] },
  { icon: '🌐', name: '网络模块', desc: '负责发送 HTTP 请求、接收服务器响应，是浏览器与外界通信的通道', tags: ['HTTP/2', 'HTTP/3', 'WebSocket'] },
  { icon: '💾', name: '数据存储', desc: '在本地保存网站数据，让你下次访问更快、不用重复登录', tags: ['Cookie', 'LocalStorage', 'Cache'] }
]
</script>

<style scoped>
.browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.arch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}
.mod-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  cursor: pointer;
  transition: border-color 0.2s;
  user-select: none;
}
.mod-card.active { border-color: var(--vp-c-brand); }
.mod-header { display: flex; align-items: center; gap: 0.4rem; }
.mod-icon { font-size: 1rem; }
.mod-name { font-size: 0.72rem; font-weight: 600; color: var(--vp-c-text-1); }
.mod-detail { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--vp-c-divider); }
.mod-desc { font-size: 0.65rem; color: var(--vp-c-text-3); line-height: 1.5; }
.mod-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.35rem; }
.tag {
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-brand);
}
.expand-enter-active, .expand-leave-active { transition: all 0.2s ease; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 8rem; }
@media (max-width: 480px) {
  .arch { grid-template-columns: 1fr; }
}
</style>
