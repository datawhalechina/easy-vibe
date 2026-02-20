<template>
  <div class="programming-language-comparison-demo">
    <div class="demo-header">
      <span class="icon">⚖️</span>
      <span class="title">编程语言对比</span>
      <span class="subtitle">不同语言的特点和适用场景</span>
    </div>

    <div class="comparison-grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        :class="['lang-card', { active: activeLang === lang.name }]"
        @click="activeLang = lang.name"
      >
        <div class="card-header">
          <span class="card-icon">{{ lang.icon }}</span>
          <span class="card-name">{{ lang.name }}</span>
        </div>
        <div class="card-year">{{ lang.year }}</div>
        <div class="card-paradigm">{{ lang.paradigm }}</div>
      </div>
    </div>

    <!-- 详细对比 -->
    <div v-if="activeLang" class="detail-comparison">
      <div class="detail-header">
        <span class="detail-icon">{{ currentLang.icon }}</span>
        <span class="detail-name">{{ currentLang.name }}</span>
      </div>

      <div class="detail-content">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">诞生年份</div>
            <div class="info-value">{{ currentLang.year }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">编程范式</div>
            <div class="info-value">{{ currentLang.paradigm }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">类型系统</div>
            <div class="info-value">{{ currentLang.typeSystem }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性能</div>
            <div class="info-value">{{ currentLang.performance }}</div>
          </div>
        </div>

        <div class="use-cases">
          <div class="cases-title">主要用途</div>
          <div class="cases-list">
            <span
              v-for="(use, index) in currentLang.uses"
              :key="index"
              class="case-tag"
            >
              {{ use }}
            </span>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✓ 优点</div>
            <ul>
              <li v-for="(pro, index) in currentLang.pros" :key="index">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <div class="list-title">✗ 缺点</div>
            <ul>
              <li v-for="(con, index) in currentLang.cons" :key="index">{{ con }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速对比表 -->
    <div class="quick-comparison">
      <div class="comparison-title">快速对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>语言</th>
            <th>学习难度</th>
            <th>开发效率</th>
            <th>执行性能</th>
            <th>主要领域</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lang, index) in languages" :key="index" :class="{ highlighted: lang.name === activeLang }">
            <td>{{ lang.icon }} {{ lang.name }}</td>
            <td>{{ lang.difficulty }}</td>
            <td>{{ lang.efficiency }}</td>
            <td>{{ lang.performance }}</td>
            <td>{{ lang.mainField }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLang = ref('Python')

const languages = [
  {
    name: 'Python',
    icon: '🐍',
    year: '1991',
    paradigm: '多范式',
    typeSystem: '动态强类型',
    performance: '中等',
    difficulty: '⭐',
    efficiency: '⭐⭐⭐⭐⭐',
    mainField: 'AI/数据/后端',
    uses: ['人工智能', '数据分析', 'Web 后端', '自动化脚本'],
    pros: ['语法简洁优雅', '生态丰富', '学习曲线平缓', '社区活跃'],
    cons: ['执行速度较慢', '移动端支持弱', 'GIL 限制并发']
  },
  {
    name: 'JavaScript',
    icon: '📜',
    year: '1995',
    paradigm: '多范式',
    typeSystem: '动态弱类型',
    performance: '中等',
    difficulty: '⭐⭐',
    efficiency: '⭐⭐⭐⭐',
    mainField: 'Web 开发',
    uses: ['前端开发', 'Node.js 后端', '跨平台应用', '小程序'],
    pros: ['无处不在', '生态庞大', '异步编程优秀', '跨平台'],
    cons: ['类型不安全', '标准混乱', '性能不如编译语言']
  },
  {
    name: 'Java',
    icon: '☕',
    year: '1995',
    paradigm: '面向对象',
    typeSystem: '静态强类型',
    performance: '高',
    difficulty: '⭐⭐⭐',
    efficiency: '⭐⭐⭐',
    mainField: '企业级应用',
    uses: ['企业后端', 'Android 应用', '大数据', '桌面应用'],
    pros: ['跨平台', '稳定可靠', '生态系统完善', '类型安全'],
    cons: ['语法繁琐', '内存占用大', '启动慢']
  },
  {
    name: 'C/C++',
    icon: '⚙️',
    year: '1972/1983',
    paradigm: '多范式',
    typeSystem: '静态强类型',
    performance: '极高',
    difficulty: '⭐⭐⭐⭐⭐',
    efficiency: '⭐⭐',
    mainField: '系统编程',
    uses: ['操作系统', '游戏引擎', '嵌入式', '高性能计算'],
    pros: ['性能极致', '底层控制力强', '效率高'],
    cons: ['学习困难', '内存管理复杂', '开发效率低', '容易出错']
  },
  {
    name: 'Go',
    icon: '🐹',
    year: '2009',
    paradigm: '多范式',
    typeSystem: '静态强类型',
    performance: '高',
    difficulty: '⭐⭐',
    efficiency: '⭐⭐⭐⭐',
    mainField: '云原生/后端',
    uses: ['云原生', '微服务', 'DevOps', '网络服务'],
    pros: ['简洁高效', '并发优秀', '编译快', '部署简单'],
    cons: ['生态较新', '缺少泛型(旧版)', '错误处理繁琐']
  },
  {
    name: 'Rust',
    icon: '🦀',
    year: '2010',
    paradigm: '多范式',
    typeSystem: '静态强类型',
    performance: '极高',
    difficulty: '⭐⭐⭐⭐',
    efficiency: '⭐⭐⭐',
    mainField: '系统/WebAssembly',
    uses: ['系统编程', 'WebAssembly', '区块链', 'CLI 工具'],
    pros: ['内存安全', '性能极高', '现代工具链'],
    cons: ['学习曲线陡', '编译速度慢', '生态尚在发展']
  }
]

const currentLang = computed(() => languages.find(l => l.name === activeLang.value))
</script>

<style scoped>
.programming-language-comparison-demo {
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

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.lang-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.lang-card:hover {
  border-color: var(--vp-c-brand);
}

.lang-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.card-year {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.card-paradigm {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.detail-comparison {
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

.detail-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.info-item {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.info-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 600;
}

.use-cases {
  text-align: center;
}

.cases-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.cases-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.case-tag {
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.85rem;
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

.quick-comparison {
  margin-top: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.comparison-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
}

tr.highlighted {
  background: var(--vp-c-brand-soft);
}
</style>
