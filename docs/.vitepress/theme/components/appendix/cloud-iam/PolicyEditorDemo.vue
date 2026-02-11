<template>
  <div class="policy-editor-demo">
    <div class="editor-layout">
      <div class="editor-panel">
        <div class="panel-title">策略编辑器</div>
        <div class="action-list">
          <div 
            v-for="action in actions" 
            :key="action.id"
            class="action-item"
          >
            <label class="checkbox">
              <input 
                type="checkbox" 
                v-model="selectedActions"
                :value="action.id"
              >
              <span>{{ action.name }}</span>
            </label>
            <span class="action-desc">{{ action.desc }}</span>
          </div>
        </div>
      </div>
      
      <div class="preview-panel">
        <div class="panel-title">生成的策略</div>
        <pre><code>{{ generatedPolicy }}</code></pre>
      </div>
    </div>
    
    <div class="effect-preview">
      <div class="effect-title">权限效果预览</div>
      <div class="effect-list">
        <div 
          v-for="effect in effectList" 
          :key="effect.action"
          class="effect-item"
          :class="effect.allowed ? 'allowed' : 'denied'"
        >
          <span class="effect-icon">{{ effect.allowed ? '✓' : '✗' }}</span>
          <span class="effect-text">{{ effect.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedActions = ref(['describe', 'start'])

const actions = [
  { id: 'describe', name: '查看实例', desc: 'DescribeInstances', resource: 'ecs:Describe*' },
  { id: 'start', name: '启动实例', desc: 'StartInstance', resource: 'ecs:StartInstance' },
  { id: 'stop', name: '停止实例', desc: 'StopInstance', resource: 'ecs:StopInstance' },
  { id: 'reboot', name: '重启实例', desc: 'RebootInstance', resource: 'ecs:RebootInstance' },
  { id: 'create', name: '创建实例', desc: 'CreateInstance', resource: 'ecs:CreateInstance' },
  { id: 'delete', name: '删除实例', desc: 'DeleteInstance', resource: 'ecs:DeleteInstance' }
]

const generatedPolicy = computed(() => {
  const selected = actions.filter(a => selectedActions.value.includes(a.id))
  const actionList = selected.map(a => a.resource)
  
  return JSON.stringify({
    Version: "1",
    Statement: [
      {
        Effect: "Allow",
        Action: actionList,
        Resource: "*"
      }
    ]
  }, null, 2)
})

const effectList = computed(() => {
  return actions.map(action => ({
    name: action.name,
    action: action.id,
    allowed: selectedActions.value.includes(action.id)
  }))
})
</script>

<style scoped>
.policy-editor-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.editor-panel,
.preview-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.panel-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.checkbox input {
  cursor: pointer;
}

.action-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.preview-panel pre {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow-x: auto;
}

.preview-panel code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.effect-preview {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.effect-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.effect-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.effect-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.effect-item.allowed {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.effect-item.denied {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.effect-icon {
  font-weight: 600;
}

@media (max-width: 640px) {
  .editor-layout {
    grid-template-columns: 1fr;
  }
  
  .effect-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
