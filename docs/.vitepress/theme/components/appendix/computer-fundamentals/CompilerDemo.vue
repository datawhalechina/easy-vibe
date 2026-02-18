<template>
  <div class="compiler-demo">
    <div class="demo-header">
      <span class="icon">⚙️</span>
      <span class="title">编译器工作流程</span>
      <span class="subtitle">从源代码到机器码的旅程</span>
    </div>

    <div class="demo-content">
      <div class="pipeline-visual">
        <div class="pipeline-title">
          编译流程
        </div>
        <div class="pipeline-stages">
          <div 
            v-for="(stage, i) in stages" 
            :key="i"
            :class="['stage', { active: activeStage === i }]"
            @click="activeStage = i"
          >
            <div class="stage-num">
              {{ i + 1 }}
            </div>
            <div class="stage-name">
              {{ stage.name }}
            </div>
            <div class="stage-output">
              {{ stage.output }}
            </div>
          </div>
          <div
            v-for="i in stages.length - 1"
            :key="'arrow-' + i"
            class="stage-arrow"
          >
            →
          </div>
        </div>
      </div>

      <div
        v-if="currentStage"
        class="stage-detail"
      >
        <div class="detail-header">
          <span class="detail-name">{{ currentStage.name }}</span>
        </div>
        <div class="detail-desc">
          {{ currentStage.desc }}
        </div>
        <div class="detail-tasks">
          <div class="task-title">
            主要任务
          </div>
          <ul>
            <li
              v-for="(task, j) in currentStage.tasks"
              :key="j"
            >
              {{ task }}
            </li>
          </ul>
        </div>
        <div class="detail-example">
          <div class="example-title">
            示例
          </div>
          <pre><code>{{ currentStage.example }}</code></pre>
        </div>
      </div>

      <div class="interactive-demo">
        <div class="demo-title">
          词法分析演示
        </div>
        <div class="lexer-input">
          <label>输入代码：</label>
          <input
            v-model="sourceCode"
            type="text"
            placeholder="例如: int x = 10 + 5;"
          >
        </div>
        <div class="lexer-output">
          <div class="output-title">
            词法单元 (Tokens)
          </div>
          <div class="tokens">
            <div 
              v-for="(token, i) in tokens" 
              :key="i"
              :class="['token', token.type]"
            >
              <span class="token-value">{{ token.value }}</span>
              <span class="token-type">{{ token.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ast-demo">
        <div class="demo-title">
          语法树 (AST) 可视化
        </div>
        <div class="ast-input">
          <label>表达式：</label>
          <input
            v-model="expression"
            type="text"
            placeholder="例如: 1 + 2 * 3"
          >
        </div>
        <div class="ast-visual">
          <div
            v-if="ast"
            class="ast-node root"
          >
            <div class="node-value">
              {{ ast.value }}
            </div>
            <div
              v-if="ast.left || ast.right"
              class="node-children"
            >
              <div
                v-if="ast.left"
                class="ast-node left"
              >
                <div class="node-value">
                  {{ ast.left.value }}
                </div>
              </div>
              <div
                v-if="ast.right"
                class="ast-node right"
              >
                <div class="node-value">
                  {{ ast.right.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <div class="section-title">
          编译型 vs 解释型 vs JIT
        </div>
        <div class="comparison-grid">
          <div
            v-for="(item, i) in executionModels"
            :key="i"
            class="comparison-item"
          >
            <div class="item-name">
              {{ item.name }}
            </div>
            <div class="item-flow">
              {{ item.flow }}
            </div>
            <div class="item-pros">
              {{ item.pros }}
            </div>
            <div class="item-cons">
              {{ item.cons }}
            </div>
            <div class="item-langs">
              {{ item.langs }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>编译器将人类可读的源代码转换为机器可执行的指令。主要阶段包括词法分析、语法分析、语义分析、中间代码生成、优化和目标代码生成。
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const activeStage = ref(0)

const stages = [
  {
    name: '词法分析',
    output: 'Token 流',
    desc: '将源代码分解为一个个词法单元（Token）',
    tasks: ['识别关键字、标识符、字面量、运算符', '过滤空白和注释', '记录位置信息'],
    example: `源代码: int x = 10;
Tokens: [int][x][=][10][;]`
  },
  {
    name: '语法分析',
    output: 'AST',
    desc: '根据语法规则，将 Token 流组织成语法树',
    tasks: ['构建抽象语法树 (AST)', '检查语法错误', '确定运算优先级'],
    example: `表达式: 1 + 2 * 3

    AST:
       +
      / \\
     1   *
        / \\
       2   3`
  },
  {
    name: '语义分析',
    output: '带类型的 AST',
    desc: '检查语义正确性，进行类型检查',
    tasks: ['类型检查', '作用域分析', '符号表构建', '类型推断'],
    example: `int x = "hello"; // 类型错误!
int y = 10 + 5;  // 正确`
  },
  {
    name: '中间代码',
    output: 'IR',
    desc: '生成平台无关的中间表示',
    tasks: ['生成三地址码或 SSA', '便于优化', '支持多目标平台'],
    example: `x = 10 + 5
// 三地址码:
t1 = 10 + 5
x = t1`
  },
  {
    name: '优化',
    output: '优化后的 IR',
    desc: '对中间代码进行各种优化',
    tasks: ['常量折叠', '死代码消除', '循环优化', '内联展开'],
    example: `// 优化前
x = 10 + 5
y = x * 2

// 优化后(常量折叠)
x = 15
y = 30`
  },
  {
    name: '代码生成',
    output: '机器码',
    desc: '生成目标机器的机器码',
    tasks: ['指令选择', '寄存器分配', '指令调度', '生成可执行文件'],
    example: `// x = 15 的汇编
mov eax, 15
mov [x], eax`
  }
]

const currentStage = computed(() => stages[activeStage.value])

const sourceCode = ref('int x = 10 + 5;')

const keywords = ['int', 'float', 'if', 'else', 'while', 'for', 'return', 'void', 'class', 'public', 'private']
const operators = ['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=']

const tokens = computed(() => {
  const code = sourceCode.value
  if (!code.trim()) return []
  
  const result = []
  const words = code.split(/(\s+|[;,\(\)\{\}\[\]])/)
  
  for (const word of words) {
    if (!word.trim()) continue
    
    if (keywords.includes(word)) {
      result.push({ value: word, type: 'keyword' })
    } else if (operators.includes(word)) {
      result.push({ value: word, type: 'operator' })
    } else if (/^\d+$/.test(word)) {
      result.push({ value: word, type: 'number' })
    } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(word)) {
      result.push({ value: word, type: 'identifier' })
    } else if (word === ';') {
      result.push({ value: word, type: 'punctuation' })
    } else {
      result.push({ value: word, type: 'unknown' })
    }
  }
  
  return result
})

const expression = ref('1 + 2 * 3')

const ast = computed(() => {
  const expr = expression.value.trim()
  if (!expr) return null
  
  const parseExpression = (str) => {
    str = str.trim()
    
    const addSubMatch = str.match(/^(.+?)\s*([+-])\s*(.+)$/)
    if (addSubMatch) {
      return {
        value: addSubMatch[2],
        left: parseExpression(addSubMatch[1]),
        right: parseExpression(addSubMatch[3])
      }
    }
    
    const mulDivMatch = str.match(/^(.+?)\s*([*/])\s*(.+)$/)
    if (mulDivMatch) {
      return {
        value: mulDivMatch[2],
        left: parseExpression(mulDivMatch[1]),
        right: parseExpression(mulDivMatch[3])
      }
    }
    
    if (/^\d+$/.test(str)) {
      return { value: str }
    }
    
    return { value: str }
  }
  
  return parseExpression(expr)
})

const executionModels = [
  {
    name: '编译型',
    flow: '源码 → 编译 → 机器码 → 执行',
    pros: '执行快，编译期检查',
    cons: '编译慢，跨平台难',
    langs: 'C, C++, Rust, Go'
  },
  {
    name: '解释型',
    flow: '源码 → 解释器 → 逐行执行',
    pros: '跨平台，开发快',
    cons: '执行慢，运行时检查',
    langs: 'Python, Ruby, PHP'
  },
  {
    name: 'JIT',
    flow: '源码 → 字节码 → JIT编译 → 执行',
    pros: '兼顾性能和跨平台',
    cons: '启动慢，内存占用大',
    langs: 'Java, JavaScript(V8)'
  }
]
</script>

<style scoped>
.compiler-demo {
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

.pipeline-visual {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.pipeline-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.pipeline-stages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  position: relative;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  cursor: pointer;
  min-width: 80px;
  border: 2px solid transparent;
}

.stage:hover {
  background: var(--vp-c-bg-soft);
}

.stage.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-num {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stage-name {
  font-size: 0.75rem;
  font-weight: bold;
}

.stage-output {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.stage-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.stage-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.detail-header {
  margin-bottom: 0.5rem;
}

.detail-name {
  font-weight: bold;
  font-size: 1rem;
  color: var(--vp-c-brand);
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.detail-tasks {
  margin-bottom: 0.5rem;
}

.task-title, .example-title {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.detail-tasks ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
}

.detail-example {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

pre {
  margin: 0;
  font-size: 0.75rem;
  white-space: pre-wrap;
}

code {
  font-family: monospace;
}

.interactive-demo, .ast-demo {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.demo-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.lexer-input, .ast-input {
  margin-bottom: 0.5rem;
}

.lexer-input label, .ast-input label {
  display: block;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.lexer-input input, .ast-input input {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  font-family: monospace;
  font-size: 0.85rem;
}

.output-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.tokens {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.token {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.token.keyword { background: #d4edda; }
.token.operator { background: #fff3cd; }
.token.number { background: #cce5ff; }
.token.identifier { background: #e2e3e5; }
.token.punctuation { background: #f8d7da; }

.token-value {
  font-family: monospace;
  font-weight: bold;
}

.token-type {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.ast-visual {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.ast-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-value {
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.node-children {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  position: relative;
}

.node-children::before {
  content: '';
  position: absolute;
  top: -0.5rem;
  left: 50%;
  width: 1px;
  height: 0.5rem;
  background: var(--vp-c-divider);
}

.ast-node.left .node-value,
.ast-node.right .node-value {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.comparison-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.section-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.comparison-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.item-name {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand);
}

.item-flow {
  font-size: 0.75rem;
  font-family: monospace;
  margin-bottom: 0.25rem;
}

.item-pros, .item-cons {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.item-pros::before { content: '✅ '; }
.item-cons::before { content: '❌ '; }

.item-langs {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 0.25rem;
}

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

.info-box .icon { flex-shrink: 0; }
</style>
