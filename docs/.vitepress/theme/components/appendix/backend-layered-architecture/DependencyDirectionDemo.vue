<template>
  <div class="dep-demo">
    <div class="header">
      <div class="title">依赖方向：分层架构的核心规则</div>
      <div class="subtitle">理解依赖方向，才能真正掌握分层架构</div>
    </div>

    <div class="content-box">
      <div class="layers">
        <div class="layer outer">
          <div class="layer-label">外层（UI / 外部系统）</div>
          <div class="layer-box">Controller</div>
        </div>
        <div class="dep-arrow">↓ 依赖</div>
        <div class="layer middle">
          <div class="layer-label">中层（应用层）</div>
          <div class="layer-box">Service</div>
        </div>
        <div class="dep-arrow">↓ 依赖</div>
        <div class="layer inner">
          <div class="layer-label">内层（领域层）</div>
          <div class="layer-box">Domain / Repository</div>
        </div>
      </div>

      <div class="principle-box">
        <div class="p-title">核心原则：依赖倒置（DIP）</div>
        <p>上层模块不应该依赖下层模块的具体实现，而应该依赖于抽象。</p>
        <div class="rules">
          <div v-for="r in rules" :key="r.title" class="rule">
            <strong>{{ r.title }}</strong>
            <div class="rule-desc">{{ r.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const rules = [
  { title: 'Controller → Service 接口', desc: 'Controller 只依赖 Service 的接口，不依赖实现类' },
  { title: 'Service → Repository 接口', desc: 'Service 只依赖 Repository 接口，不关心数据怎么存' },
  { title: '所有层依赖 Domain', desc: 'Domain 是核心，被所有上层依赖，但 Domain 不依赖任何层' }
]
</script>

<style scoped>
.dep-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.content-box {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.layers { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.layer-label { font-size: 11px; color: var(--vp-c-text-3); margin-bottom: 4px; }
.layer-box {
  padding: 14px; border-radius: 6px; text-align: center;
  font-weight: 500; color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.layer.outer .layer-box { border-left-color: #10b981; }
.layer.middle .layer-box { border-left-color: #f59e0b; }
.layer.inner .layer-box { border-left-color: #3b82f6; }
.dep-arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.principle-box {
  padding: 16px; border-radius: 8px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
}
.p-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 8px; }
.principle-box p { margin: 0 0 12px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }

.rules { display: flex; flex-direction: column; gap: 8px; }
.rule {
  padding: 10px; border-radius: 6px;
  background: var(--vp-c-bg); font-size: 13px; color: var(--vp-c-text-1);
}
.rule-desc { font-size: 12px; color: var(--vp-c-text-3); margin-top: 2px; }
</style>
