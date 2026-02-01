<script setup>
import { ref, computed } from 'vue'

const codeLines = [
  'function calculateTotal(price, tax) {',
  '  const taxAmount = price * tax;',
  '  const total = price + taxAmount;',
  '  return total;',
  '}',
  '',
  'const myPrice = 100;',
  'const myTax = 0.1;',
  'const result = calculateTotal(myPrice, myTax);',
  'console.log("Total:", result);'
]

const breakpoints = ref([2]) // Line 2 has breakpoint initially
const currentLine = ref(-1)
const isRunning = ref(false)
const variables = ref({})
const logs = ref([])

const toggleBreakpoint = (index) => {
  const i = breakpoints.value.indexOf(index)
  if (i === -1) {
    breakpoints.value.push(index)
  } else {
    breakpoints.value.splice(i, 1)
  }
}

const reset = () => {
    currentLine.value = -1
    isRunning.value = false
    variables.value = {}
    logs.value = []
}

const run = () => {
    reset()
    isRunning.value = true
    step()
}

const step = () => {
    if (!isRunning.value) return

    let nextLine = currentLine.value + 1
    
    // Skip empty lines
    while (nextLine < codeLines.length && codeLines[nextLine].trim() === '') {
        nextLine++
    }

    if (nextLine >= codeLines.length) {
        isRunning.value = false
        currentLine.value = -1
        return
    }

    currentLine.value = nextLine

    // Execute logic for simulation
    updateVariables(nextLine)

    // Check breakpoint
    if (breakpoints.value.includes(nextLine)) {
        // Paused
    } else {
        // Auto continue if no breakpoint, but for demo we might want manual stepping or slow motion
        // For this demo, "Run" just goes to first breakpoint or end. 
        // But "Step" button is manual.
        // Let's make "Run" auto-advance until breakpoint.
        setTimeout(() => {
            if (breakpoints.value.includes(nextLine)) {
                // Pause
            } else {
                step()
            }
        }, 200) // Small delay to see execution
    }
}

const stepOver = () => {
    if (!isRunning.value && currentLine.value === -1) {
        run()
        return
    }
    
    // Force move to next line regardless of breakpoint
    let nextLine = currentLine.value + 1
    while (nextLine < codeLines.length && codeLines[nextLine].trim() === '') {
        nextLine++
    }
    
    if (nextLine >= codeLines.length) {
        isRunning.value = false
        currentLine.value = -1
        return
    }
    
    currentLine.value = nextLine
    updateVariables(nextLine)
}

const updateVariables = (lineIndex) => {
    // Simulation logic based on line number
    // 0: function def
    // 1: taxAmount = ... (inside function)
    // 2: total = ... (inside function)
    // 3: return
    // 6: myPrice = 100
    // 7: myTax = 0.1
    // 8: call function
    // 9: log
    
    // We simulate the execution flow roughly
    if (lineIndex === 6) variables.value = { ...variables.value, myPrice: 100 }
    if (lineIndex === 7) variables.value = { ...variables.value, myTax: 0.1 }
    
    // When calling function at line 8, we jump to line 0? 
    // This simple line-by-line is hard for function calls without complex logic.
    // Let's simplify: Flatten the logic or just simulate state at specific lines.
    
    if (lineIndex === 8) {
        // Simulate jumping into function? 
        // For simplicity, let's just pretend we are inside.
        // Or actually, let's just change the code to be flat for easier understanding in demo.
    }
}

// Let's use a simpler flat code example for the demo to be robust
const flatCodeLines = [
    'let count = 0;',
    'const max = 3;',
    'while (count < max) {',
    '  count = count + 1;',
    '  console.log("Count is:", count);',
    '}',
    'console.log("Done");'
]
// 0: let count = 0
// 1: const max = 3
// 2: while check
// 3: count++
// 4: log
// 5: } -> jump back to 2
// 6: log Done

// Re-implement step logic for flat code
const demoState = ref({
    line: -1,
    vars: { count: undefined, max: undefined },
    output: [],
    history: [] // to track loop
})

const flatStep = () => {
    const s = demoState.value
    let next = s.line
    
    // Logic flow
    if (s.line === -1) next = 0
    else if (s.line === 0) next = 1
    else if (s.line === 1) next = 2
    else if (s.line === 2) {
        // Check condition
        if (s.vars.count < s.vars.max) next = 3
        else next = 6
    }
    else if (s.line === 3) next = 4
    else if (s.line === 4) next = 5
    else if (s.line === 5) next = 2 // Loop back
    else if (s.line === 6) {
        // End
        s.line = -1
        isRunning.value = false
        return
    }
    
    s.line = next
    
    // Execute line
    if (next === 0) s.vars.count = 0
    if (next === 1) s.vars.max = 3
    if (next === 3) s.vars.count++
    if (next === 4) s.output.push(`Count is: ${s.vars.count}`)
    if (next === 6) s.output.push('Done')
}

const flatRun = () => {
    if (isRunning.value) return
    demoState.value.line = -1
    demoState.value.vars = { count: undefined, max: undefined }
    demoState.value.output = []
    isRunning.value = true
    
    const tick = () => {
        if (!isRunning.value) return
        
        // Peek next line
        // ... (Logic duplication is tricky, let's just use flatStep)
        flatStep()
        
        if (breakpoints.value.includes(demoState.value.line)) {
            // Pause
        } else if (demoState.value.line !== -1) {
            setTimeout(tick, 500)
        }
    }
    tick()
}

const flatResume = () => {
    if (!isRunning.value) return
    const tick = () => {
         flatStep()
         if (breakpoints.value.includes(demoState.value.line)) {
             // Pause again
         } else if (demoState.value.line !== -1) {
             setTimeout(tick, 500)
         }
    }
    setTimeout(tick, 500)
}

const flatNext = () => {
    if (!isRunning.value && demoState.value.line === -1) {
        demoState.value.vars = { count: undefined, max: undefined }
        demoState.value.output = []
        isRunning.value = true
    }
    flatStep()
}
</script>

<template>
  <el-card class="sources-demo" shadow="hover">
    <template #header>
      <div class="header">
        <span class="title">Sources (源代码调试)</span>
        <div class="controls">
            <el-button-group>
                <el-button type="success" size="small" icon="VideoPlay" @click="flatRun" :disabled="isRunning && demoState.line !== -1 && !breakpoints.includes(demoState.line)">Run</el-button>
                <el-button type="primary" size="small" icon="VideoPause" @click="flatResume" :disabled="!breakpoints.includes(demoState.line)">Resume</el-button>
                <el-button type="info" size="small" icon="ArrowRight" @click="flatNext">Step</el-button>
            </el-button-group>
        </div>
      </div>
    </template>

    <div class="container">
      <div class="code-area">
        <div 
          v-for="(line, index) in flatCodeLines" 
          :key="index"
          class="line"
          :class="{ 
            active: demoState.line === index, 
            breakpoint: breakpoints.includes(index) 
          }"
          @click="toggleBreakpoint(index)"
        >
          <div class="line-num">{{ index + 1 }}</div>
          <div class="code-text">{{ line }}</div>
        </div>
      </div>

      <div class="sidebar">
        <div class="section">
            <div class="section-title">Scope (Variables)</div>
            <div class="var-list">
                <div class="var-item">
                    <span class="name">count:</span>
                    <span class="value">{{ demoState.vars.count !== undefined ? demoState.vars.count : 'undefined' }}</span>
                </div>
                <div class="var-item">
                    <span class="name">max:</span>
                    <span class="value">{{ demoState.vars.max !== undefined ? demoState.vars.max : 'undefined' }}</span>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="section-title">Console Output</div>
            <div class="output-list">
                <div v-for="(log, i) in demoState.output" :key="i" class="log-line">
                    {{ log }}
                </div>
            </div>
        </div>
      </div>
    </div>
    
    <div class="footer-tip">
        点击行号设置断点。点击 Run 开始执行，代码将在断点处暂停。
    </div>
  </el-card>
</template>

<style scoped>
.sources-demo {
  margin: 20px 0;
}

.container {
  display: flex;
  height: 300px;
  border: 1px solid #dcdfe6;
}

.code-area {
  flex: 2;
  background: #f5f7fa;
  overflow-y: auto;
  font-family: monospace;
  border-right: 1px solid #dcdfe6;
}

.line {
  display: flex;
  cursor: pointer;
  line-height: 24px;
}

.line:hover {
  background-color: #ecf5ff;
}

.line.active {
  background-color: #e8f3ff; /* Light blue background for execution line */
}

.line.active .code-text {
    background-color: #cce5ff;
}

.line-num {
  width: 40px;
  text-align: right;
  padding-right: 10px;
  color: #909399;
  border-right: 1px solid #ebeef5;
  user-select: none;
  position: relative;
}

.line.breakpoint .line-num::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 6px;
  width: 12px;
  height: 12px;
  background-color: #f56c6c;
  border-radius: 50%;
}

/* Green arrow for current line */
.line.active .line-num::after {
    content: '→';
    position: absolute;
    right: 2px;
    color: #409eff;
    font-weight: bold;
}

.code-text {
  padding-left: 10px;
  white-space: pre;
  color: #303133;
  flex: 1;
}

.sidebar {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.section {
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
}

.section-title {
    font-weight: bold;
    font-size: 12px;
    color: #606266;
    margin-bottom: 8px;
    background: #f0f2f5;
    padding: 4px;
}

.var-item {
    font-family: monospace;
    font-size: 13px;
    margin-bottom: 4px;
}

.var-item .name {
    color: #906fa5;
    margin-right: 8px;
}

.var-item .value {
    color: #409eff;
}

.output-list {
    font-family: monospace;
    font-size: 12px;
    color: #606266;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #909399;
    text-align: center;
}
</style>
