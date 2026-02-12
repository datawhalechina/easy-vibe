<template>
  <div class="build-pipeline-demo">
    <div class="demo-header">
      <span class="icon">🏭</span>
      <span class="title">构建流水线</span>
      <span class="subtitle">从源代码到产物的完整旅程</span>
    </div>

    <div class="intro-text">
      想象你在开一家<span class="highlight">面包店</span>：面粉要过筛、搅拌、发酵、烘烤，最后才能变成香喷喷的面包。代码也一样，需要经过一道道"加工工序"，才能变成浏览器能运行的程序。
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div class="stage-simple">{{ stage.simple }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="activeStage" class="stage-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
        </div>
        <div class="detail-content">
          <p class="detail-desc">{{ currentStage?.detailDesc }}</p>
          <div class="detail-example">
            <div class="example-label">🌰 举个例子：</div>
            <div class="example-content">{{ currentStage?.example }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="!activeStage" class="hint-text">
      👆 点击上方任意阶段，查看详细解释
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>就像工厂流水线一样，代码经过一道道工序，最终变成可以在浏览器运行的产物。每个阶段各司其职，环环相扣。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)

const stages = ref([
  {
    id: 1,
    icon: '🔍',
    name: '代码检查',
    simple: '找错误',
    detailDesc: '就像写作文前先检查有没有错别字和语法错误。代码检查工具会自动发现你的代码问题，比如变量名拼写错误、漏写了分号、使用了未定义的变量等。',
    example: '你写了 const mesage = "hello"，检查工具会提醒："mesage 是不是想写 message？这个变量名看起来有拼写错误。"'
  },
  {
    id: 2,
    icon: '⚙️',
    name: '代码转换',
    simple: '翻译官',
    detailDesc: '就像把中文翻译成英文让外国人能看懂。你写的可能是 TypeScript 或新版 JavaScript 语法，但老浏览器"看不懂"，需要转换成它们能理解的旧版本。',
    example: '你写了 const name = user?.name（新版语法），转换后变成 var name = user && user.name ? user.name : undefined（老浏览器能懂的写法）'
  },
  {
    id: 3,
    icon: '📦',
    name: '依赖解析',
    simple: '理关系',
    detailDesc: '就像整理食谱，搞清楚做一道菜需要哪些食材。你的代码可能引用了很多其他文件，这个阶段会分析"谁依赖谁"，画出一张完整的关系图。',
    example: 'main.js 引用了 utils.js，utils.js 又引用了 helper.js，解析后会生成一张"依赖地图"，告诉打包工具按什么顺序处理这些文件。'
  },
  {
    id: 4,
    icon: '📚',
    name: '模块打包',
    simple: '装箱子',
    detailDesc: '就像搬家时把零散的东西装进几个大箱子。你的项目可能有上百个文件，浏览器加载太多小文件会很慢，打包就是把它们合并成少数几个文件。',
    example: '原来有 100 个 .js 文件，打包后变成 2 个文件：app.js（你的代码）和 vendor.js（第三方库）。浏览器只需请求 2 次而不是 100 次。'
  },
  {
    id: 5,
    icon: '✨',
    name: '代码优化',
    simple: '瘦身',
    detailDesc: '就像压缩行李箱，把不必要的东西扔掉。删除代码中的空格和注释、去掉没用到代码（Tree Shaking）、压缩变量名，让文件体积更小。',
    example: '原来 100KB 的代码，优化后变成 30KB。比如把 function getUserName() { return name } 压缩成 function a(){return n}'
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.build-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

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

.pipeline {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow-x: auto;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 85px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  background: var(--vp-c-brand-soft);
}

.stage-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
}

.stage:hover .stage-icon {
  transform: scale(1.1);
}

.stage-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stage-simple {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.2rem;
  font-weight: 500;
}

.arrow {
  position: absolute;
  right: -12px;
  top: 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.stage-detail {
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
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
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

.info-box .icon { margin-right: 0.25rem; }
</style>
