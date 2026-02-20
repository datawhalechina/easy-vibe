<template>
  <div class="language-evolution-demo">
    <div class="demo-header">
      <span class="icon">📜</span>
      <span class="title">编程语言的演化</span>
      <span class="subtitle">从机器语言到高级语言</span>
    </div>

    <div class="evolution-timeline">
      <div class="timeline-track">
        <div
          v-for="(era, index) in eras"
          :key="index"
          :class="['era-marker', { active: activeEra === index }]"
          :style="{ left: era.position }"
          @click="activeEra = index"
        >
          <div class="marker-dot"></div>
          <div class="marker-label">{{ era.name }}</div>
        </div>
      </div>
    </div>

    <div class="era-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentEra.icon }}</span>
        <span class="detail-title">{{ currentEra.fullname }}</span>
        <span class="detail-years">{{ currentEra.years }}</span>
      </div>

      <div class="detail-content">
        <div class="content-section">
          <div class="section-title">代码示例</div>
          <div class="code-example">
            <pre><code>{{ currentEra.example }}</code></pre>
          </div>
        </div>

        <div class="content-section">
          <div class="section-title">特点</div>
          <div class="features-list">
            <div
              v-for="(feature, index) in currentEra.features"
              :key="index"
              class="feature-item"
            >
              <span class="feature-icon">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <div class="content-section">
          <div class="section-title">优缺点</div>
          <div class="pros-cons">
            <div class="pros">
              <div class="list-title">✓ 优点</div>
              <ul>
                <li v-for="(pro, index) in currentEra.pros" :key="index">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <div class="list-title">✗ 缺点</div>
              <ul>
                <li v-for="(con, index) in currentEra.cons" :key="index">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 演化总结 -->
    <div class="evolution-summary">
      <div class="summary-title">演化的趋势</div>
      <div class="trend-grid">
        <div class="trend-card">
          <div class="trend-icon">🚀</div>
          <div class="trend-title">越来越抽象</div>
          <div class="trend-desc">远离硬件细节，更接近人类思维</div>
        </div>
        <div class="trend-card">
          <div class="trend-icon">👥</div>
          <div class="trend-title">越来越易用</div>
          <div class="trend-desc">语法更简洁，学习曲线更平缓</div>
        </div>
        <div class="trend-card">
          <div class="trend-icon">🛡️</div>
          <div class="trend-title">越来越安全</div>
          <div class="trend-desc">类型系统、内存管理等安全机制</div>
        </div>
        <div class="trend-card">
          <div class="trend-icon">⚡</div>
          <div class="trend-title">越来越高效</div>
          <div class="trend-desc">编译器优化、JIT 技术提升性能</div>
        </div>
      </div>
    </div>

    <!-- 现代语言生态 -->
    <div class="modern-languages">
      <div class="modern-title">现代编程语言生态</div>
      <div class="language-grid">
        <div
          v-for="lang in modernLanguages"
          :key="lang.name"
          class="lang-card"
        >
          <div class="lang-name">{{ lang.name }}</div>
          <div class="lang-year">{{ lang.year }}</div>
          <div class="lang-uses">
            <span
              v-for="(use, index) in lang.uses"
              :key="index"
              class="use-tag"
            >
              {{ use }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeEra = ref(3)

const eras = [
  {
    name: '机器语言',
    fullname: '机器语言时代',
    years: '1940s - 1950s',
    icon: '0️⃣',
    position: '5%',
    example: '10110000 11000000\n(add two numbers)',
    features: [
      '直接用二进制代码',
      '机器可以直接执行',
      '完全依赖硬件'
    ],
    pros: ['执行速度最快', '直接控制硬件'],
    cons: ['极难编写', '容易出错', '不可移植']
  },
  {
    name: '汇编语言',
    fullname: '汇编语言时代',
    years: '1950s - 1960s',
    icon: '🔧',
    position: '25%',
    example: 'MOV AX, 5\nADD AX, 3\n(add 5 and 3)',
    features: [
      '用助记符代替二进制',
      '需要汇编器翻译',
      '仍然依赖硬件'
    ],
    pros: ['比机器语言好懂', '效率仍然很高'],
    cons: ['代码冗长', '不可移植', '需要了解硬件']
  },
  {
    name: '面向过程',
    fullname: '面向过程语言',
    years: '1970s - 1980s',
    icon: '📋',
    position: '50%',
    example: 'int add(int a, int b) {\n  return a + b;\n}',
    features: [
      '函数、变量等抽象',
      '结构化编程',
      '可移植性好'
    ],
    pros: ['易读易写', '可移植', '效率较高'],
    cons: ['大型项目难以维护', '代码重用性差']
  },
  {
    name: '面向对象',
    fullname: '面向对象语言',
    years: '1990s - 2000s',
    icon: '🎯',
    position: '75%',
    example: 'class Calculator {\n  add(a, b) { return a + b; }\n}',
    features: [
      '类、对象、封装、继承',
      '模块化设计',
      '代码复用性强'
    ],
    pros: ['适合大型项目', '易维护', '可扩展'],
    cons: ['学习曲线陡', '代码量较大']
  },
  {
    name: '现代语言',
    fullname: '现代多范式语言',
    years: '2010s - 现在',
    icon: '🚀',
    position: '95%',
    example: 'const add = (a, b) => a + b;\n(add arrow function)',
    features: [
      '简洁优雅的语法',
      '多范式支持',
      '强大的标准库'
    ],
    pros: ['开发效率高', '生态丰富', '社区活跃'],
    cons: ['抽象层多', '性能可能不如底层语言']
  }
]

const modernLanguages = [
  { name: 'Python', year: '1991', uses: ['AI/ML', '数据分析', 'Web'] },
  { name: 'JavaScript', year: '1995', uses: ['Web', 'Node.js', '前端'] },
  { name: 'Rust', year: '2010', uses: ['系统', 'WebAssembly', '性能'] },
  { name: 'Go', year: '2009', uses: ['后端', '云', '微服务'] },
  { name: 'TypeScript', year: '2012', uses: ['Web', '大型项目'] },
  { name: 'Swift', year: '2014', uses: ['iOS', 'macOS'] }
]

const currentEra = computed(() => eras[activeEra.value])
</script>

<style scoped>
.language-evolution-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.evolution-timeline {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.timeline-track {
  position: relative;
  height: 60px;
  border-top: 3px solid var(--vp-c-divider);
}

.era-marker {
  position: absolute;
  top: -10px;
  transform: translateX(-50%);
  cursor: pointer;
  transition: all 0.3s;
}

.marker-dot {
  width: 20px;
  height: 20px;
  background: var(--vp-c-divider);
  border: 3px solid var(--vp-c-bg);
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  transition: all 0.3s;
}

.era-marker:hover .marker-dot,
.era-marker.active .marker-dot {
  background: var(--vp-c-brand);
  transform: scale(1.3);
}

.marker-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
}

.era-marker.active .marker-label {
  color: var(--vp-c-brand);
}

.era-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-years {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-section {}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  color: #d4d4d4;
  font-size: 0.8rem;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.feature-icon {
  color: #10b981;
  font-weight: 700;
}

.feature-text {
  font-size: 0.9rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  padding: 1rem;
  border-radius: 6px;
}

.pros {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
}

.cons {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
}

.list-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.pros ul,
.cons ul {
  margin: 0;
  padding-left: 1.25rem;
}

.pros li,
.cons li {
  font-size: 0.85rem;
  line-height: 1.8;
}

.evolution-summary {
  margin-bottom: 2rem;
}

.summary-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.trend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.trend-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.trend-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.trend-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.trend-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.modern-languages {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.modern-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.lang-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.lang-name {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
}

.lang-year {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.lang-uses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
}

.use-tag {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  font-size: 0.7rem;
}
</style>
