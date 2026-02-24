<template>
  <div class="demo-wrapper">
    <div class="demo-header" dir="ltr">
      <span class="icon">🌍</span> 
      <span>浏览器原生的本地化转换 (i18n) 演示</span>
    </div>
    
    <div class="intro-text" dir="ltr">
      请在下方切换用户的本地化偏好（环境代号）。体验浏览器引擎在不修改任何底层数据逻辑的前提下，是如何同时处理**语言字典**、**弹性换行**、**排版反转 (RTL)** 以及**原生数据格式转换**的。
    </div>

    <!-- 顶层控制面板 -->
    <div class="controls-panel" dir="ltr">
      <label for="env-selector" class="control-label">🌐 模拟操作系统/浏览器偏好环境：</label>
      <select id="env-selector" v-model="currentLocale" class="env-select">
        <option value="zh-CN">🇨🇳 zh-CN (简体中文)</option>
        <option value="en-US">🇺🇸 en-US (美国英语)</option>
        <option value="de-DE">🇩🇪 de-DE (德国德语) - 关注文字长度爆增</option>
        <option value="ar-SA">🇸🇦 ar-SA (沙特阿拉伯语) - 关注 RTL 排版全量反转</option>
      </select>
    </div>

    <div class="lab-container">
      
      <!-- 实验室 1：排版与字典 -->
      <div class="lab-section">
        <h3 class="lab-title" dir="ltr">实战区 1：依赖 Flex 面向字典与排版进行重构</h3>
        <p class="lab-desc" dir="ltr">
          由于我们在 CSS 中使用了弹性的 Flex 布局，并且没有写死 `margin-left` 而是用了 `gap` 与 `justify-content`，当切换到阿拉伯语时，`dir="rtl"` 属性会指挥浏览器**完美镜像反转**整个布局。当切换到德语时，超长的按钮文字会自动引发弹性换行，而不会溢出。
        </p>
        
        <!-- 核心演示区域，响应 RTL -->
        <div class="lab-window" :dir="layoutDirection">
          <header class="app-nav">
            <div class="logo-area">
              <span class="logo">⚡</span>
              <span class="appName">{{ dictionary[currentLocale].appName }}</span>
            </div>
            <div class="links-area">
              <a href="#">{{ dictionary[currentLocale].navIndex }}</a>
              <a href="#">{{ dictionary[currentLocale].navMe }}</a>
            </div>
          </header>

          <main class="app-content">
            <div class="alert-box">
              {{ dictionary[currentLocale].alertDesc }}
            </div>
            <div class="action-bar">
              <button class="btn btn-primary">{{ dictionary[currentLocale].btnPay }}</button>
              <button class="btn btn-ghost">{{ dictionary[currentLocale].btnBack }} <span dir="ltr">➔</span></button>
            </div>
          </main>
        </div>
      </div>

      <!-- 实验室 2：Intl API 底层转换 -->
      <div class="lab-section rtl-ignore-section">
        <h3 class="lab-title" dir="ltr">实战区 2：使用 Intl 引擎接管数据呈现</h3>
        <p class="lab-desc" dir="ltr">
          彻底抛弃正则表达式的截取与拼接！看看原生的 <code>Intl.NumberFormat</code> 和 <code>Intl.DateTimeFormat</code> 是如何根据我们上方选择的“环境代号”将下方固定不变的底层二进制数据无缝格式化的。
        </p>

        <div class="data-compare-window" dir="ltr">
          <!-- 金钱数据对比 -->
          <div class="data-row">
            <div class="raw-data">
              <span class="data-label">底层内存数值 (Float):</span>
              <code class="data-code">1459800.5</code>
            </div>
            <div class="data-arrow">
              引擎介入<br/> ➔
            </div>
            <div class="intl-data">
              <span class="data-label">DOM 最终呈现:</span>
              <span class="formatted-val highlight-money">{{ formattedAmount }}</span>
            </div>
          </div>

          <!-- 日期数据对比 -->
          <div class="data-row">
            <div class="raw-data">
              <span class="data-label">底层内存数值 (Timestamp):</span>
              <code class="data-code">1757430000000</code>
            </div>
            <div class="data-arrow">
              引擎介入<br/> ➔
            </div>
            <div class="intl-data">
              <span class="data-label">DOM 最终呈现:</span>
              <span class="formatted-val highlight-date">{{ formattedDate }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentLocale = ref('zh-CN')

// 极其简易的本地化字典
const dictionary = {
  'zh-CN': {
    appName: '企业云服务',
    navIndex: '控制台首页',
    navMe: '账户设置',
    alertDesc: '您有一个待支付的云服务器实例账单，请在 24 小时内完成续费操作以免停机。',
    btnPay: '立即确认并支付款项',
    btnBack: '取消并返回'
  },
  'en-US': {
    appName: 'Enterprise Cloud',
    navIndex: 'Dashboard',
    navMe: 'Account',
    alertDesc: 'You have a pending cloud server instance bill. Please renew within 24 hours to avoid suspension.',
    btnPay: 'Confirm & Proceed to Pay',
    btnBack: 'Cancel'
  },
  'de-DE': {
    appName: 'Unternehmenscloud',
    navIndex: 'Startseite',
    navMe: 'Kontoeinstellungen',
    alertDesc: 'Sie haben eine ausstehende Rechnung für Ihre Cloud-Server-Instanz. Bitte verlängern Sie innerhalb von 24 Stunden, um eine Aussetzung zu vermeiden.',
    btnPay: 'Bestätigen und sofortigen Zahlungsvorgang abschließen', // 故意设置的德语超长合成词
    btnBack: 'Abbrechen'
  },
  'ar-SA': {
    appName: 'سحابة المؤسسة',
    navIndex: 'لوحة القيادة',
    navMe: 'إعدادات الحساب',
    alertDesc: 'لديك فاتورة معلقة لمثيل خادم السحابة الخاص بك. يرجى التجديد خلال 24 ساعة لتجنب التعليق.',
    btnPay: 'تأكيد والمتابعة للدفع',
    btnBack: 'إلغاء والعودة'
  }
}

// 固定的底层原始数据
const RAW_TIMESTAMP = 1757430000000 // 模拟某个固定时间 2025-09-09(近似)
const RAW_MONEY = 1459800.5

// 计算布局方向 (核心知识点：处理 RTL)
const layoutDirection = computed(() => {
  return currentLocale.value === 'ar-SA' ? 'rtl' : 'ltr'
})

// 原生 Intl 货币格式化
const formattedAmount = computed(() => {
  let currency = 'CNY'
  if (currentLocale.value === 'en-US') currency = 'USD'
  if (currentLocale.value === 'de-DE') currency = 'EUR'
  if (currentLocale.value === 'ar-SA') currency = 'SAR'

  return new Intl.NumberFormat(currentLocale.value, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(RAW_MONEY)
})

// 原生 Intl 日期格式化
const formattedDate = computed(() => {
  return new Intl.DateTimeFormat(currentLocale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(new Date(RAW_TIMESTAMP))
})
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.8rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.8rem;
}

.intro-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.controls-panel {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .controls-panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.control-label {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-size: 1rem;
}

.env-select {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
  cursor: pointer;
  min-width: 280px;
}

/* 两个实战区的公共样式 */
.lab-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.lab-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lab-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 18px;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
}

.lab-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1.2rem;
}
.lab-desc code {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

/* 实验室 1 的内部排版沙盒 */
.lab-window {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  color: white;
  padding: 1rem 1.5rem;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
}

.logo { color: #38bdf8; font-size: 1.3rem; }

.links-area {
  display: flex;
  gap: 1.5rem;
}
.links-area a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: 0.2s;
}
.links-area a:hover { color: white; }

.app-content {
  padding: 2rem;
  background: #f8fafc;
}

.alert-box {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 1.2rem;
  color: #b45309;
  border-radius: 0 6px 6px 0;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* RTL 环境下，警告框的彩色边框需要自动镜像到了右侧！这通过 CSS 的逻辑属性来实现最佳！但我们还是直接利用 dir 的流式特性。我们把 border-left 改为 border-inline-start */
[dir="rtl"] .alert-box {
  border-left: none;
  border-right: 4px solid #f59e0b;
  border-radius: 6px 0 0 6px;
}

.action-bar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap; /* 核心知识点：弹性拉伸保护 */
}

.btn {
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  flex: 1; /* 弹性填满剩余空间，对抗超长德语 */
  min-width: 150px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background: #1d4ed8; }
.btn-ghost { background: #e2e8f0; color: #475569; border: 1px solid #cbd5e1;}
.btn-ghost:hover { background: #cbd5e1; }

.dark .app-content { background: var(--vp-c-bg-alt); }
.dark .alert-box { background: rgba(245, 158, 11, 0.1); color: #fcd34d; }
.dark .btn-ghost { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.dark .btn-ghost:hover { background: var(--vp-c-divider); }

/* 实验室 2 的转换展示面板 */
.data-compare-window {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.data-row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: var(--vp-c-bg);
  padding: 1.2rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

@media (min-width: 768px) {
  .data-row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.raw-data, .intl-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.intl-data {
  text-align: left;
}
@media (min-width: 768px) {
  .intl-data { text-align: right; }
}

.data-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-code {
  font-family: monospace;
  background: #1e293b;
  color: #a7f3d0;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 1.05rem;
  font-weight: bold;
  word-break: break-all;
}

.data-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 767px) {
  .data-arrow { padding: 0.5rem; }
}

.formatted-val {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.highlight-money { color: #f59e0b; } /* 显眼的金色/橙色代表金钱 */
.highlight-date { color: #3b82f6; } /* 蓝色代表日期体系 */

.dark .data-code { background: #000; color: #10b981; border: 1px solid #333; }
</style>
