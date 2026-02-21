<template>
  <div class="language-map-demo">
    <div class="demo-header">
      <span class="title">编程语言图谱</span>
      <span class="subtitle">演化历程 · 编程范式 · 类型系统 · 语言对比</span>
    </div>

    <div class="control-panel">
      <div class="tab-btns">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <!-- Tab 1: Timeline -->
      <div v-if="activeTab === 'timeline'" class="timeline-section">
        <div class="timeline-track">
          <div
            v-for="(era, i) in eras"
            :key="i"
            :class="['era-card', { active: activeEra === i }]"
            @click="activeEra = i"
          >
            <div class="era-decade">{{ era.year }}</div>
            <div class="era-name">{{ era.name }}</div>
            <div class="era-langs-inline">
              <span
                v-for="lang in era.languages"
                :key="lang"
                class="lang-dot"
                >{{ lang }}</span
              >
            </div>
          </div>
        </div>

        <div v-if="selectedEra" class="era-detail">
          <div class="era-detail-header">
            <span class="era-detail-year">{{ selectedEra.year }}</span>
            <span class="era-detail-name">{{ selectedEra.name }}</span>
          </div>
          <div class="era-detail-desc">{{ selectedEra.desc }}</div>
          <div class="era-detail-milestone">
            <div
              v-for="m in selectedEra.milestones"
              :key="m.lang"
              class="milestone-item"
            >
              <span class="milestone-lang">{{ m.lang }}</span>
              <span class="milestone-significance">{{ m.significance }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Paradigms -->
      <div v-if="activeTab === 'paradigms'" class="paradigms-section">
        <div class="paradigm-cards">
          <div
            v-for="p in paradigms"
            :key="p.name"
            :class="['paradigm-card', { active: activeParadigm === p.name }]"
            @click="activeParadigm = p.name"
          >
            <div class="paradigm-icon">{{ p.icon }}</div>
            <div class="paradigm-name">{{ p.name }}</div>
            <div class="paradigm-one-liner">{{ p.oneLiner }}</div>
          </div>
        </div>

        <div v-if="selectedParadigm" class="paradigm-detail">
          <div class="paradigm-detail-header">
            <span class="paradigm-detail-icon">{{
              selectedParadigm.icon
            }}</span>
            <span class="paradigm-detail-name">{{
              selectedParadigm.name
            }}</span>
          </div>
          <div class="paradigm-detail-desc">{{ selectedParadigm.desc }}</div>
          <div class="paradigm-detail-langs">
            <span class="detail-label">代表语言：</span>
            <span
              v-for="lang in selectedParadigm.languages"
              :key="lang"
              class="lang-tag"
              >{{ lang }}</span
            >
          </div>
          <div class="paradigm-detail-example">
            <pre><code>{{ selectedParadigm.example }}</code></pre>
          </div>
          <div class="paradigm-traits">
            <span
              v-for="t in selectedParadigm.traits"
              :key="t"
              class="trait-chip"
              >{{ t }}</span
            >
          </div>
        </div>
      </div>

      <!-- Tab 3: Comparison Table -->
      <div v-if="activeTab === 'compare'" class="compare-section">
        <div class="compare-intro">点击语言名称高亮对比</div>
        <div class="compare-table-wrapper">
          <table class="compare-table">
            <thead>
              <tr>
                <th>语言</th>
                <th>类型系统</th>
                <th>范式</th>
                <th>运行方式</th>
                <th>主要用途</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="lang in languageComparison"
                :key="lang.name"
                :class="{
                  'row-highlight': highlightedLangs.includes(lang.name)
                }"
                @click="toggleHighlight(lang.name)"
              >
                <td class="lang-name-cell">{{ lang.name }}</td>
                <td>
                  <span :class="['type-badge', lang.typeClass]">{{
                    lang.type
                  }}</span>
                </td>
                <td>{{ lang.paradigm }}</td>
                <td>{{ lang.runtime }}</td>
                <td class="usage-cell">{{ lang.usage }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 4: How to Choose -->
      <div v-if="activeTab === 'choose'" class="choose-section">
        <div class="choose-grid">
          <div
            v-for="rec in recommendations"
            :key="rec.scene"
            class="choose-card"
          >
            <div class="choose-icon">{{ rec.icon }}</div>
            <div class="choose-scene">{{ rec.scene }}</div>
            <div class="choose-langs">
              <span
                v-for="lang in rec.langs"
                :key="lang"
                class="choose-lang-tag"
                >{{ lang }}</span
              >
            </div>
            <div class="choose-reason">{{ rec.reason }}</div>
          </div>
        </div>

        <div class="learning-path">
          <div class="path-title">学习路线建议</div>
          <div class="path-steps">
            <div v-for="(step, i) in learningPath" :key="i" class="path-step">
              <div class="path-num">{{ i + 1 }}</div>
              <div class="path-content">
                <span class="path-lang">{{ step.lang }}</span>
                <span class="path-why">{{ step.why }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span v-if="activeTab === 'timeline'"
        >编程语言从机器语言到现代高级语言，一直在朝着"更接近人类思维"的方向演化。</span
      >
      <span v-else-if="activeTab === 'paradigms'"
        >编程范式是思考问题的方式——命令式关注"怎么做"，声明式关注"做什么"，选择范式比选语言更重要。</span
      >
      <span v-else-if="activeTab === 'compare'"
        >没有最好的语言，只有最适合场景的语言。类型系统、运行方式、生态都是选择时的关键考量。</span
      >
      <span v-else
        >初学者先学 Python（简单通用），再学 JavaScript（Web
        必备），最后选一门静态语言（TypeScript/Go/Rust）深入。</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('timeline')

const tabs = [
  { id: 'timeline', label: '演化历程' },
  { id: 'paradigms', label: '编程范式' },
  { id: 'compare', label: '语言对比' },
  { id: 'choose', label: '如何选择' }
]

const activeEra = ref(4)

const eras = [
  {
    year: '1940s',
    name: '机器语言',
    languages: ['二进制'],
    desc: '直接用 0 和 1 编写指令，计算机可以直接执行。人类极难阅读和维护。',
    milestones: [
      { lang: '机器码', significance: '最底层的编程方式，一个 0 写成 1 就全错' }
    ]
  },
  {
    year: '1950s',
    name: '汇编 & 早期高级语言',
    languages: ['汇编', 'Fortran', 'Lisp', 'COBOL'],
    desc: '用助记符代替 0/1，Fortran 开创高级语言时代，Lisp 奠定函数式编程基础。',
    milestones: [
      { lang: 'Fortran', significance: '第一个高级语言，科学计算之王' },
      { lang: 'Lisp', significance: '函数式编程鼻祖，影响至今' }
    ]
  },
  {
    year: '1970s',
    name: '系统编程时代',
    languages: ['C', 'Pascal', 'Smalltalk'],
    desc: 'C 语言诞生，用它写了 Unix 操作系统，开创了系统编程时代。',
    milestones: [
      { lang: 'C', significance: '影响最深远的语言，Unix/Linux 的基础' },
      { lang: 'Smalltalk', significance: '面向对象编程的先驱' }
    ]
  },
  {
    year: '1980-90s',
    name: 'OOP & 互联网',
    languages: ['C++', 'Java', 'Python', 'JavaScript'],
    desc: '面向对象成为主流，Java"一次编写到处运行"，JavaScript 统治了浏览器。',
    milestones: [
      { lang: 'Java', significance: '跨平台企业应用，JVM 生态' },
      { lang: 'JavaScript', significance: 'Web 前端的唯一选择' },
      { lang: 'Python', significance: '简洁优雅，后来成为 AI 之王' }
    ]
  },
  {
    year: '2000s',
    name: '现代语言',
    languages: ['C#', 'Go', 'Scala', 'Ruby'],
    desc: '语言设计更注重开发效率和安全性，Go 为云原生而生。',
    milestones: [
      { lang: 'Go', significance: '并发友好，Docker/K8s 的实现语言' },
      { lang: 'Ruby', significance: 'Rails 框架带来 Web 开发效率革命' }
    ]
  },
  {
    year: '2010s+',
    name: '新一代语言',
    languages: ['Rust', 'Swift', 'Kotlin', 'TypeScript'],
    desc: '强调内存安全（Rust）、类型安全（TypeScript）和开发体验。',
    milestones: [
      { lang: 'Rust', significance: '无 GC 的内存安全，系统编程新选择' },
      { lang: 'TypeScript', significance: '给 JavaScript 加上类型系统' },
      { lang: 'Kotlin', significance: '取代 Java 成为 Android 首选' }
    ]
  }
]

const selectedEra = computed(() => eras[activeEra.value])

const activeParadigm = ref('命令式')

const paradigms = [
  {
    name: '命令式',
    icon: '📝',
    oneLiner: '告诉计算机"怎么做"',
    desc: '通过一条条语句改变程序状态，按步骤描述解决问题的过程。最接近计算机实际执行方式。',
    languages: ['C', 'Fortran', 'BASIC', 'Go'],
    example: `// 计算数组总和（命令式）
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];  // 逐步累加
}`,
    traits: ['关注步骤', '状态可变', '接近底层', '易理解']
  },
  {
    name: '面向对象',
    icon: '📦',
    oneLiner: '把数据和行为封装在对象中',
    desc: '用"类"和"对象"模拟现实世界，通过封装、继承、多态组织代码。适合大型软件。',
    languages: ['Java', 'C++', 'Python', 'C#'],
    example: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} says woof!")

dog = Dog("Buddy")
dog.bark()  # Buddy says woof!`,
    traits: ['封装', '继承', '多态', '适合大型项目']
  },
  {
    name: '函数式',
    icon: '🔗',
    oneLiner: '用纯函数组合解决问题',
    desc: '将计算视为函数求值，数据不可变，没有副作用。代码更容易测试和推理。',
    languages: ['Haskell', 'Lisp', 'Erlang', 'F#'],
    example: `-- 计算数组总和（函数式）
sum = foldl (+) 0

-- 数据不可变，函数无副作用
map (*2) [1, 2, 3]  -- [2, 4, 6]
filter even [1..10]  -- [2, 4, 6, 8, 10]`,
    traits: ['纯函数', '不可变数据', '无副作用', '易测试']
  },
  {
    name: '声明式',
    icon: '🎯',
    oneLiner: '只说"做什么"，不管"怎么做"',
    desc: '描述想要的结果，具体执行方式由系统决定。SQL、HTML 都是典型的声明式。',
    languages: ['SQL', 'HTML', 'CSS', 'Prolog'],
    example: `-- 查询所有活跃用户（声明式）
SELECT name, email
FROM users
WHERE active = true
ORDER BY created_at DESC
-- 数据库自己决定怎么查最快`,
    traits: ['描述结果', '系统优化执行', '简洁表达', '领域专用']
  }
]

const selectedParadigm = computed(() =>
  paradigms.find((p) => p.name === activeParadigm.value)
)

const highlightedLangs = ref([])

function toggleHighlight(name) {
  const idx = highlightedLangs.value.indexOf(name)
  if (idx >= 0) {
    highlightedLangs.value.splice(idx, 1)
  } else {
    highlightedLangs.value.push(name)
  }
}

const languageComparison = [
  {
    name: 'Python',
    type: '动态强类型',
    typeClass: 'dynamic-strong',
    paradigm: '多范式',
    runtime: '解释执行',
    usage: 'AI、数据分析、Web 后端'
  },
  {
    name: 'JavaScript',
    type: '动态弱类型',
    typeClass: 'dynamic-weak',
    paradigm: '多范式',
    runtime: 'JIT 编译',
    usage: 'Web 全栈、跨端应用'
  },
  {
    name: 'TypeScript',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '多范式',
    runtime: '编译为 JS',
    usage: 'Web 前端、Node.js'
  },
  {
    name: 'Java',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '面向对象',
    runtime: 'JVM',
    usage: '企业应用、Android'
  },
  {
    name: 'C/C++',
    type: '静态弱类型',
    typeClass: 'static-weak',
    paradigm: '多范式',
    runtime: '编译执行',
    usage: '系统、游戏、嵌入式'
  },
  {
    name: 'Rust',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '多范式',
    runtime: '编译执行',
    usage: '系统编程、WebAssembly'
  },
  {
    name: 'Go',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '并发导向',
    runtime: '编译执行',
    usage: '云原生、微服务'
  },
  {
    name: 'Swift',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '多范式',
    runtime: '编译执行',
    usage: 'iOS/macOS 开发'
  },
  {
    name: 'Kotlin',
    type: '静态强类型',
    typeClass: 'static-strong',
    paradigm: '多范式',
    runtime: 'JVM',
    usage: 'Android、后端'
  }
]

const recommendations = [
  {
    icon: '🌐',
    scene: 'Web 前端',
    langs: ['JavaScript', 'TypeScript'],
    reason: '浏览器原生支持 JS，TS 是 JS + 类型系统'
  },
  {
    icon: '🖥️',
    scene: 'Web 后端',
    langs: ['Go', 'Java', 'Python', 'Node.js'],
    reason: '生态成熟，框架丰富'
  },
  {
    icon: '📱',
    scene: '移动开发',
    langs: ['Swift', 'Kotlin'],
    reason: 'Apple 和 Google 官方推荐'
  },
  {
    icon: '🤖',
    scene: 'AI / 数据',
    langs: ['Python'],
    reason: 'PyTorch、TensorFlow、Pandas 全在 Python'
  },
  {
    icon: '⚙️',
    scene: '系统编程',
    langs: ['C', 'Rust'],
    reason: '直接操控硬件，性能极致'
  },
  {
    icon: '☁️',
    scene: '云原生',
    langs: ['Go', 'Rust'],
    reason: 'Docker、K8s 都是 Go 写的'
  },
  {
    icon: '🎮',
    scene: '游戏开发',
    langs: ['C++', 'C#'],
    reason: 'Unreal 用 C++，Unity 用 C#'
  },
  {
    icon: '📊',
    scene: 'DevOps 脚本',
    langs: ['Python', 'Bash'],
    reason: '快速编写自动化脚本'
  }
]

const learningPath = [
  { lang: 'Python', why: '语法最简单，覆盖面最广（AI、Web、脚本）' },
  { lang: 'JavaScript', why: 'Web 开发必备，前后端通吃（Node.js）' },
  { lang: 'TypeScript', why: '给 JS 加上类型系统，体验静态类型的好处' },
  { lang: 'Go 或 Rust', why: '理解编译型语言和底层概念' }
]
</script>

<style scoped>
.language-map-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.tab-btns {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Timeline */
.timeline-track {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
}

.era-card {
  min-width: 110px;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  flex-shrink: 0;
}

.era-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.era-decade {
  font-weight: bold;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
}

.era-name {
  font-size: 0.78rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.era-langs-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
}

.lang-dot {
  font-size: 0.65rem;
  padding: 0.05rem 0.25rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
}

.era-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.era-detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.era-detail-year {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 0.88rem;
}

.era-detail-name {
  font-weight: bold;
  font-size: 0.88rem;
}

.era-detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.era-detail-milestone {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.8rem;
}

.milestone-lang {
  font-weight: bold;
  color: var(--vp-c-brand);
  min-width: 75px;
}

.milestone-significance {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}

/* Paradigms */
.paradigm-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.paradigm-card {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.paradigm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.paradigm-icon {
  font-size: 1.2rem;
}

.paradigm-name {
  font-weight: bold;
  font-size: 0.82rem;
}

.paradigm-one-liner {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.paradigm-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.paradigm-detail-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}

.paradigm-detail-icon {
  font-size: 1rem;
}

.paradigm-detail-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.paradigm-detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.paradigm-detail-langs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.detail-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.lang-tag {
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  font-size: 0.75rem;
}

.paradigm-detail-example {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  margin-bottom: 0.35rem;
  overflow: hidden;
}

.paradigm-detail-example pre {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  line-height: 1.5;
}

.paradigm-traits {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.trait-chip {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
}

/* Compare Table */
.compare-intro {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
  text-align: center;
}

.compare-table-wrapper {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.compare-table th,
.compare-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.35rem 0.5rem;
  text-align: left;
}

.compare-table th {
  background: var(--vp-c-bg-alt);
  font-size: 0.78rem;
}

.compare-table tbody tr {
  cursor: pointer;
  transition: background 0.2s;
}

.compare-table tbody tr:hover {
  background: var(--vp-c-bg-alt);
}

.row-highlight {
  background: var(--vp-c-brand-soft) !important;
}

.lang-name-cell {
  font-weight: bold;
}

.type-badge {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.type-badge.static-strong {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-green-1);
}
.type-badge.static-weak {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}
.type-badge.dynamic-strong {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.type-badge.dynamic-weak {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.usage-cell {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Choose */
.choose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.choose-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.choose-icon {
  font-size: 1.2rem;
}

.choose-scene {
  font-weight: bold;
  font-size: 0.82rem;
  margin: 0.1rem 0;
}

.choose-langs {
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.choose-lang-tag {
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
}

.choose-reason {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.learning-path {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.path-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.path-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.path-num {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: bold;
  flex-shrink: 0;
}

.path-lang {
  font-weight: bold;
  font-size: 0.82rem;
  min-width: 80px;
}

.path-why {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

/* Info Box */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .timeline-track {
    flex-direction: column;
  }

  .era-card {
    min-width: auto;
  }

  .paradigm-cards {
    grid-template-columns: 1fr 1fr;
  }

  .choose-grid {
    grid-template-columns: 1fr;
  }
}
</style>
