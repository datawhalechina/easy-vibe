<template>
  <div class="arch-demo">
    <div class="header">
      <div class="title">传统应用 vs AI 原生应用</div>
      <div class="subtitle">切换视图，对比两种架构的核心差异</div>
    </div>

    <div class="toggle-bar">
      <button
        :class="['toggle-btn', { active: mode === 'traditional' }]"
        @click="mode = 'traditional'"
      >
        <span>🏗️</span>
        <span>传统应用</span>
      </button>
      <button
        :class="['toggle-btn', { active: mode === 'ai-native' }]"
        @click="mode = 'ai-native'"
      >
        <span>🤖</span>
        <span>AI 原生应用</span>
      </button>
    </div>

    <div class="arch-grid">
      <div class="stack">
        <div class="stack-title">{{ currentArch.label }}</div>
        <div
          v-for="(layer, idx) in currentArch.layers"
          :key="idx"
          :class="['layer', { highlight: selectedLayer === idx }]"
          :style="{ borderLeftColor: layer.color }"
          @click="selectedLayer = idx"
        >
          <div class="layer-icon">{{ layer.icon }}</div>
          <div class="layer-info">
            <div class="layer-name">{{ layer.name }}</div>
            <div class="layer-desc">{{ layer.brief }}</div>
          </div>
        </div>
      </div>

      <div class="detail-panel">
        <div v-if="selectedLayer !== null" class="detail-content">
          <div class="detail-title">
            {{ currentArch.layers[selectedLayer].icon }}
            {{ currentArch.layers[selectedLayer].name }}
          </div>
          <div class="detail-desc">
            {{ currentArch.layers[selectedLayer].detail }}
          </div>
          <div class="detail-example">
            <div class="example-label">典型技术</div>
            <div class="tech-tags">
              <span
                v-for="t in currentArch.layers[selectedLayer].techs"
                :key="t"
                class="tech-tag"
              >{{ t }}</span>
            </div>
          </div>
        </div>
        <div v-else class="detail-placeholder">
          👆 点击左侧层级查看详情
        </div>
      </div>
    </div>

    <div class="comparison-bar">
      <span class="compare-label">💡 核心区别：</span>
      <span class="compare-text">{{ mode === 'traditional'
        ? '传统应用的逻辑由开发者用 if/else 硬编码，行为完全确定。'
        : 'AI 原生应用的核心逻辑由模型驱动，行为具有概率性，需要全新的设计思维。' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('traditional')
const selectedLayer = ref(0)

const architectures = {
  traditional: {
    label: '传统应用架构',
    layers: [
      {
        icon: '🖥️', name: '前端 UI', color: '#3b82f6',
        brief: '用户界面与交互',
        detail: '基于确定性的表单、按钮、页面路由。用户操作触发固定的业务流程，所有交互路径在开发时已经确定。',
        techs: ['React', 'Vue', 'HTML/CSS']
      },
      {
        icon: '⚙️', name: '业务逻辑层', color: '#8b5cf6',
        brief: '硬编码的规则引擎',
        detail: '开发者用 if/else、switch/case 编写所有业务规则。每一条路径都需要人工预设，无法处理规则之外的情况。',
        techs: ['Node.js', 'Java', 'Python']
      },
      {
        icon: '🗄️', name: '数据存储', color: '#06b6d4',
        brief: '结构化数据管理',
        detail: '关系型数据库存储结构化数据，Schema 固定。数据的读写遵循严格的 CRUD 模式。',
        techs: ['MySQL', 'PostgreSQL', 'Redis']
      },
      {
        icon: '🔌', name: 'API 接口', color: '#10b981',
        brief: '固定的请求/响应',
        detail: '每个 API 端点返回确定性的结果。相同的输入永远产生相同的输出，行为完全可预测。',
        techs: ['REST', 'GraphQL', 'gRPC']
      }
    ]
  },
  'ai-native': {
    label: 'AI 原生应用架构',
    layers: [
      {
        icon: '💬', name: '自然语言交互层', color: '#f59e0b',
        brief: '对话式 + 流式输出',
        detail: '用户通过自然语言表达意图，系统以流式方式逐步生成响应。交互不再是固定的表单，而是开放式的对话。',
        techs: ['Streaming UI', 'Markdown 渲染', 'SSE']
      },
      {
        icon: '🧠', name: '模型推理层', color: '#ef4444',
        brief: 'LLM 驱动的决策引擎',
        detail: '核心逻辑不再是 if/else，而是由大语言模型根据 Prompt 和上下文进行推理。输出具有概率性，同样的输入可能产生不同的结果。',
        techs: ['GPT-4', 'Claude', 'Prompt 工程']
      },
      {
        icon: '🔗', name: '编排与工具层', color: '#8b5cf6',
        brief: 'Agent 编排 + 工具调用',
        detail: '模型可以调用外部工具（搜索、数据库、API）来获取实时信息。编排层负责管理多步推理、工具选择和结果整合。',
        techs: ['LangChain', 'Function Calling', 'RAG']
      },
      {
        icon: '📦', name: '上下文管理层', color: '#06b6d4',
        brief: '向量数据库 + 记忆系统',
        detail: '使用向量数据库存储和检索非结构化知识。通过 Embedding 将文本转化为语义向量，实现基于含义的搜索而非关键词匹配。',
        techs: ['Pinecone', 'ChromaDB', 'Embedding']
      },
      {
        icon: '🛡️', name: '安全与护栏层', color: '#10b981',
        brief: '输出过滤 + 幻觉检测',
        detail: 'AI 输出不可完全信任，需要护栏机制：内容过滤、事实核查、幻觉检测、敏感信息脱敏等。这是传统应用不需要的全新层级。',
        techs: ['Guardrails', '内容审核', '事实校验']
      }
    ]
  }
}

const currentArch = computed(() => architectures[mode.value])
</script>

<style scoped>
.arch-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}
.header { text-align: center; margin-bottom: 16px; }
.title {
  font-size: 17px; font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 12px; color: var(--vp-c-text-2); margin-top: 4px; }

.toggle-bar {
  display: flex; gap: 8px; justify-content: center; margin-bottom: 16px;
}
.toggle-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 18px; border: 1px solid var(--vp-c-divider);
  border-radius: 20px; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; font-size: 13px;
}
.toggle-btn:hover { background: var(--vp-c-bg-alt); }
.toggle-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
}

.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.stack {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.stack-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }

.layer {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid; background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s;
}
.layer:hover { background: var(--vp-c-bg-alt); }
.layer.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.layer-icon { font-size: 20px; flex-shrink: 0; }
.layer-name { font-weight: 600; font-size: 13px; }
.layer-desc { font-size: 11px; color: var(--vp-c-text-2); margin-top: 2px; }

.detail-panel {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 12px; padding: 16px;
}
.detail-title { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
.detail-desc { color: var(--vp-c-text-2); line-height: 1.7; font-size: 13px; margin-bottom: 12px; }
.example-label { font-weight: 600; font-size: 12px; margin-bottom: 6px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-tag {
  padding: 3px 10px; border-radius: 12px; font-size: 11px;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark);
  border: 1px solid var(--vp-c-brand-dimm);
}
.detail-placeholder {
  color: var(--vp-c-text-3); text-align: center; padding: 40px 0; font-size: 13px;
}

.comparison-bar {
  margin-top: 16px; padding: 12px 16px;
  background: var(--vp-c-brand-soft); border-radius: 6px; font-size: 13px;
}
.compare-label { font-weight: 600; color: var(--vp-c-brand-dark); }
.compare-text { color: var(--vp-c-text-1); }
</style>
