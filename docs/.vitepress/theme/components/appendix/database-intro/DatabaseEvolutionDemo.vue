<template>
  <div class="data-evolution-demo">
    <div class="demo-header">
      <span class="icon">📊</span>
      <span class="title">数据存储演进</span>
      <span class="subtitle">从记事本到数据库的演变</span>
    </div>

    <div class="intro-text">
      想象你在经营一家<span class="highlight">书店</span>：从记在小本本上，到用 Excel 管理，再到用专业的数据库系统。每一步演变，都是为了解决数据量增长带来的新问题。
    </div>

    <div class="evolution-stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.id"
        class="stage"
        :class="{ active: activeStage === stage.id }"
        @click="activeStage = activeStage === stage.id ? null : stage.id"
      >
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-simple">
          {{ stage.simple }}
        </div>
        <div class="stage-capacity">
          {{ stage.capacity }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="arrow"
        >
          →
        </div>
      </div>
    </div>

    <div
      v-if="!activeStage"
      class="hint-text"
    >
      👆 点击上方任意阶段，查看详细特点
    </div>

    <Transition name="fade">
      <div
        v-if="activeStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-icon">{{ currentStage?.icon }}</span>
          <span class="detail-title">{{ currentStage?.name }}</span>
          <span class="detail-capacity">{{ currentStage?.capacity }}</span>
        </div>
        <div class="detail-content">
          <div class="pros-cons">
            <div class="pros">
              <div class="list-title">
                ✅ 优点
              </div>
              <ul>
                <li
                  v-for="pro in currentStage?.pros"
                  :key="pro"
                >
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons">
              <div class="list-title">
                ❌ 缺点
              </div>
              <ul>
                <li
                  v-for="con in currentStage?.cons"
                  :key="con"
                >
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentStage?.example"
            class="example-box"
          >
            <div class="example-label">
              🌰 举个例子：
            </div>
            <div class="example-content">
              {{ currentStage?.example }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>数据存储方式的演进，本质上是<span class="highlight">用更复杂的系统解决数据量增长带来的问题</span>。从"能用"到"好用"，再到"专业"，每一步都是为了提升效率、保证安全、支持更大的规模。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref(null)

const stages = ref([
  {
    id: 1,
    icon: '📒',
    name: '记事本',
    simple: '手工记录',
    capacity: '100 条',
    pros: ['零门槛，拿笔就能写', '简单直接，随时查看'],
    cons: ['查询困难，需要人工计算', '容易丢失，无法备份', '无法统计和分析'],
    example: '你在笔记本上记：2024-01-15，张三买了《百年孤独》，59元。想统计上个月卖了多少，得一页页翻。'
  },
  {
    id: 2,
    icon: '📊',
    name: 'Excel',
    simple: '电子表格',
    capacity: '100 万条',
    pros: ['自动求和、排序、筛选', '界面直观，容易上手', '支持简单的公式计算'],
    cons: ['容量有限，数据量大就卡死', '难以协作，容易冲突', '数据冗余，重复信息多'],
    example: '你用 Excel 管理订单，张三买了 100 本书，他的地址和电话重复写了 100 次。如果他换电话，得修改 100 行。'
  },
  {
    id: 3,
    icon: '🗄️',
    name: '数据库',
    simple: '专业系统',
    capacity: '亿级+',
    pros: ['海量数据，毫秒查询', '多人协作，不会冲突', '数据安全，自动备份', '消除冗余，统一管理'],
    cons: ['需要学习 SQL 语言', '搭建和维护成本高', '小项目有点"杀鸡用牛刀"'],
    example: '亚马逊用数据库管理 10 亿订单。张三的地址只存一次，无论他买多少本书，查询他的所有订单只需 0.01 秒。'
  }
])

const currentStage = computed(() => {
  return stages.value.find(s => s.id === activeStage.value)
})
</script>

<style scoped>
.data-evolution-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.evolution-stages {
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
  min-width: 90px;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
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
  border-radius: 6px;
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

.stage-capacity {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
  padding: 2px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
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
  border-radius: 6px;
  padding: 0.75rem;
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
  flex: 1;
}

.detail-capacity {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  padding: 4px 8px;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}

.pros, .cons {
  padding: 0.75rem;
  border-radius: 6px;
}

.pros {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.cons {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.list-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pros ul, .cons ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  line-height: 1.6;
}

.pros li {
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.cons li {
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.example-box {
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
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
