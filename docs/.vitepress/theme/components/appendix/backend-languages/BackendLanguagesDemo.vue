<template>
  <div class="backend-languages-demo">
    <div class="demo-header">
      <span class="icon">🛠️</span>
      <span class="title">后端语言工具箱</span>
      <span class="subtitle">选择合适的工具完成工作</span>
    </div>

    <div class="intro-text">
      想象你是一名<span class="highlight">建筑工人</span>：搬砖用铁铲，砌墙用瓦刀，装修用刷子。后端语言也一样，不同场景适合不同的"工具"。没有最好的语言，只有最合适的选择。
    </div>

    <div class="language-grid">
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="language-card"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <div class="lang-icon">{{ lang.icon }}</div>
        <div class="lang-name">{{ lang.name }}</div>
        <div class="lang-metaphor">{{ lang.metaphor }}</div>
        <div class="lang-description">{{ lang.description }}</div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selectedLang" class="lang-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ getCurrentLang().icon }}</span>
          <span class="detail-title">{{ getCurrentLang().name }}</span>
        </div>

        <div class="detail-sections">
          <div class="detail-section">
            <h6>🎯 适用场景</h6>
            <ul>
              <li v-for="scenario in getCurrentLang().scenarios" :key="scenario">
                {{ scenario }}
              </li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>✅ 优势</h6>
            <ul>
              <li v-for="pro in getCurrentLang().pros" :key="pro">{{ pro }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h6>❌ 劣势</h6>
            <ul>
              <li v-for="con in getCurrentLang().cons" :key="con">{{ con }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="!selectedLang" class="hint-text">
      👆 点击上方任意语言，查看详细说明
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>选择语言时，先想清楚"我要解决什么问题"，而不是"哪个语言最火"。初创公司选 Python/Node.js 快速验证，大厂选 Java/Go 保证稳定，游戏开发选 C++ 追求极致性能。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLang = ref('Go')

const languages = [
  {
    name: 'Go',
    icon: '🐹',
    metaphor: '电动螺丝刀',
    description: '云原生时代的高效工具',
    scenarios: [
      '微服务架构（Docker、K8s 都是 Go 写的）',
      '高并发 API 服务',
      'DevOps 工具开发',
      '区块链基础设施'
    ],
    pros: [
      '并发性能优秀（Goroutine 轻量级协程）',
      '编译快，部署简单（单一可执行文件）',
      '语法简洁，学习曲线平缓',
      '内存占用低，性能接近 C++'
    ],
    cons: [
      '生态不如 Java/Python 成熟',
      '错误处理繁琐（if err != nil）',
      '泛型支持较弱（Go 1.18+ 引入）',
      '不适合 CPU 密集型任务'
    ]
  },
  {
    name: 'Python',
    icon: '🐍',
    metaphor: '瑞士军刀',
    description: '什么都能干的全能工具',
    scenarios: [
      'AI/机器学习（PyTorch、TensorFlow）',
      '数据分析和处理',
      '快速原型开发',
      '自动化脚本'
    ],
    pros: [
      '语法极简，学习曲线平缓',
      'AI 生态无与伦比',
      '开发速度快，代码量少',
      '库丰富，几乎任何功能都有现成方案'
    ],
    cons: [
      '运行速度慢（比 Go/Java 慢 10-100 倍）',
      'GIL 限制多线程性能',
      '打包部署复杂（依赖地狱）',
      '动态类型，运行时错误多'
    ]
  },
  {
    name: 'Java',
    icon: '☕',
    metaphor: '重型挖掘机',
    description: '企业级开发的稳定选择',
    scenarios: [
      '大型企业系统（银行、保险、电商）',
      'Android 应用开发',
      '大数据处理（Hadoop、Spark）',
      '微服务架构（Spring Cloud）'
    ],
    pros: [
      '生态极其成熟，框架完备',
      '强类型，编译时检查',
      '多线程模型成熟',
      '跨平台，JVM 优化强大'
    ],
    cons: [
      '代码冗长，样板代码多',
      '启动慢，内存占用高',
      '学习曲线陡峭（Spring 全家桶）',
      '版本更新快，兼容性问题'
    ]
  },
  {
    name: 'Node.js',
    icon: '💚',
    metaphor: '万能扳手',
    description: '前后端统一的利器',
    scenarios: [
      '全栈 Web 应用（React + Node.js）',
      '实时系统（聊天应用、协作工具）',
      'Serverless（AWS Lambda、Vercel）',
      'I/O 密集型 API'
    ],
    pros: [
      '前后端统一语言，减少切换成本',
      'NPM 生态庞大，世界最大包仓库',
      '适合 I/O 密集型应用',
      '事件驱动，非阻塞 I/O'
    ],
    cons: [
      '单线程，CPU 密集型性能差',
      '回调地狱（虽然 async/await 有改善）',
      '动态类型，运行时错误多',
      '版本兼容性问题多'
    ]
  },
  {
    name: 'Rust',
    icon: '🦀',
    metaphor: '激光切割机',
    description: '内存安全的系统级工具',
    scenarios: [
      '系统编程（操作系统、数据库）',
      '区块链（Solana、Polkadot）',
      'WebAssembly（前端高性能计算）',
      '基础设施（AWS Firecracker）'
    ],
    pros: [
      '内存安全，编译时保证无泄漏',
      '性能接近 C++',
      '现代化语法，零成本抽象',
      '无 GC，运行时开销低'
    ],
    cons: [
      '学习曲线极其陡峭',
      '编译时间长',
      '生态不如 Go/Java 成熟',
      '开发速度慢'
    ]
  },
  {
    name: 'C++',
    icon: '⚡',
    metaphor: '工业电钻',
    description: '高性能计算的基石',
    scenarios: [
      '游戏开发（Unreal Engine）',
      '高频交易（金融系统）',
      '浏览器引擎（Chrome V8）',
      'AI 框架底层（PyTorch、TF）'
    ],
    pros: [
      '性能极致，无语言能超越',
      '底层控制力强，直接操作内存',
      '游戏开发标准',
      '生态成熟'
    ],
    cons: [
      '学习曲线极其陡峭',
      '内存管理复杂（易泄漏）',
      '开发效率低',
      '不适合 Web 开发'
    ]
  }
]

const getCurrentLang = () => {
  return languages.find(l => l.name === selectedLang.value) || languages[0]
}
</script>

<style scoped>
.backend-languages-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.language-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.language-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.lang-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.lang-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.lang-metaphor {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.lang-description {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 0.75rem 0;
}

.lang-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-section h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  padding: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  position: relative;
  padding-left: 1rem;
}

.detail-section li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
