<template>
  <div class="demo-wrapper" :dir="layoutDirection">
    <div class="demo-header" dir="ltr">i18n / 布局与本地化 API 演示</div>

    <!-- 控制面板 -->
    <div class="controls" dir="ltr">
      <div class="lang-selector">
        <label>选择环境 (Locale)：</label>
        <select v-model="currentLocale">
          <option value="zh-CN">🇨🇳 简体中文 (zh-CN)</option>
          <option value="en-US">🇺🇸 English (en-US)</option>
          <option value="de-DE">🇩🇪 Deutsch (de-DE) [测试超长文本]</option>
          <option value="ar-SA">🇸🇦 العربية (ar-SA) [测试从右到左]</option>
        </select>
      </div>
    </div>

    <!-- 演示应用 -->
    <div class="app-ui">
      <!-- 头部导航栏 -->
      <nav class="app-nav">
        <div class="nav-brand">
          <span class="logo">⚡</span>
          <span>{{ t('app_name') }}</span>
        </div>
        <div class="nav-links">
          <a href="#">{{ t('home') }}</a>
          <a href="#">{{ t('profile') }}</a>
        </div>
      </nav>

      <!-- 主要内容区 -->
      <main class="app-body">
        <div class="card">
          <h2 class="card-title">{{ t('payment_title') }}</h2>
          <p class="card-desc">{{ t('payment_desc') }}</p>

          <div class="data-row">
            <span class="label">{{ t('date_label') }}：</span>
            <span class="value date-val">{{ formattedDate }}</span>
          </div>

          <div class="data-row">
            <span class="label">{{ t('amount_label') }}：</span>
            <span class="value amount-val">{{ formattedAmount }}</span>
          </div>

          <div class="actions">
            <!-- 演示按钮超长溢出防护 -->
            <button class="btn btn-primary">
              {{ t('confirm_btn') }}
            </button>
            <button class="btn btn-ghost">
              {{ t('cancel_btn') }} <span dir="ltr">➔</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentLocale = ref('zh-CN')

// 极其简易的字典
const dictionary = {
  'zh-CN': {
    app_name: '随星流界',
    home: '首页',
    profile: '我的',
    payment_title: '账单详情',
    payment_desc: '请在到期前完成支付以避免服务中断。',
    date_label: '出账日期',
    amount_label: '应付总额',
    confirm_btn: '立即确认支付',
    cancel_btn: '返回上一页'
  },
  'en-US': {
    app_name: 'Easy Vibe',
    home: 'Home',
    profile: 'Profile',
    payment_title: 'Invoice Details',
    payment_desc: 'Please complete your payment before the due date to avoid service interruption.',
    date_label: 'Issued Date',
    amount_label: 'Total Due',
    confirm_btn: 'Confirm Payment',
    cancel_btn: 'Go Back'
  },
  'de-DE': {
    app_name: 'Einfache Stimmung',
    home: 'Startseite',
    profile: 'Profil',
    payment_title: 'Rechnungsdetails',
    payment_desc: 'Bitte schließen Sie Ihre Zahlung vor dem Fälligkeitsdatum ab, um eine Unterbrechung des Dienstes zu vermeiden.',
    date_label: 'Ausstellungsdatum',
    amount_label: 'Fälliger Gesamtbetrag',
    confirm_btn: 'Zahlungsvorgang jetzt bestätigen', // 超长按钮文本
    cancel_btn: 'Zurück zur vorherigen Seite'
  },
  'ar-SA': {
    app_name: 'إيزي فايب',
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    payment_title: 'تفاصيل الفاتورة',
    payment_desc: 'يرجى إتمام عملية الدفع قبل تاريخ الاستحقاق لتجنب انقطاع الخدمة.',
    date_label: 'تاريخ الإصدار',
    amount_label: 'الإجمالي المستحق',
    confirm_btn: 'تأكيد الدفع',
    cancel_btn: 'العودة'
  }
}

// 模拟的原始数据
const rawDate = new Date()
const rawAmount = 14590.5

const t = (key) => dictionary[currentLocale.value][key]

// 核心特性：自动计算布局方向
const layoutDirection = computed(() => {
  return currentLocale.value === 'ar-SA' ? 'rtl' : 'ltr'
})

// 核心特性：使用浏览器原生 Intl API 进行本地化格式，告别手写正则
const formattedDate = computed(() => {
  return new Intl.DateTimeFormat(currentLocale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }).format(rawDate)
})

const formattedAmount = computed(() => {
  let currency = 'CNY'
  if (currentLocale.value === 'en-US') currency = 'USD'
  if (currentLocale.value === 'de-DE') currency = 'EUR'
  if (currentLocale.value === 'ar-SA') currency = 'SAR'

  return new Intl.NumberFormat(currentLocale.value, {
    style: 'currency',
    currency: currency
  }).format(rawAmount)
})
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.demo-header {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.controls {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.lang-selector label {
  font-weight: 600;
  margin-right: 0.5rem;
  color: var(--vp-c-text-1);
}

select {
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* 内部 APP 模拟容器 */
.app-ui {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* 如果是 RTL，Flex 的 start 自动会贴到右边！ */
.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #1e293b;
  color: white;
}

.nav-brand {
  font-weight: 800;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a { color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 600; }
.nav-links a:hover { color: white; }

.app-body {
  padding: 2rem 1.5rem;
  background: #f8fafc;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #0f172a;
  border: none;
}

.card-desc {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}
.data-row:last-of-type { border-bottom: none; margin-bottom: 1rem; }

.label { color: #64748b; font-weight: 600; font-size: 0.9rem; }

.value { font-weight: bold; color: #0f172a; }
.date-val { font-size: 0.9rem; }
.amount-val { font-size: 1.25rem; color: #10b981; }

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap; /* 关键：德文过长时允许换行，保护布局 */
}

.btn {
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  min-width: fit-content;
  flex: 1; /* 按钮自动填满空间 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary { background: var(--vp-c-brand); color: white; }
.btn-primary:hover { opacity: 0.9; }

.btn-ghost { background: #f1f5f9; color: #475569; }
.btn-ghost:hover { background: #e2e8f0; }

/* 暗黑模式适配 */
.dark .app-body { background: var(--vp-c-bg-alt); }
.dark .card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.dark .card-title { color: var(--vp-c-text-1); }
.dark .value { color: var(--vp-c-text-1); }
.dark .amount-val { color: var(--vp-c-brand-1); }
.dark .btn-ghost { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.dark .data-row { border-color: var(--vp-c-divider); }
</style>
