<template>
  <div class="compilation-practice-demo">
    <div class="demo-header">
      <span class="icon">⚙️</span>
      <span class="title">编译过程实践</span>
      <span class="subtitle">从代码到可执行文件</span>
    </div>

    <div class="code-input">
      <div class="input-title">输入代码</div>
      <textarea 
        v-model="sourceCode" 
        class="code-textarea"
        placeholder="输入 C 语言代码..."
      ></textarea>
    </div>

    <div class="compilation-steps">
      <div class="steps-title">编译步骤</div>
      <div class="steps-flow">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step-item"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-command">{{ step.command }}</div>
            <div class="step-output">{{ step.output }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="file-outputs">
      <div class="outputs-title">生成的文件</div>
      <div class="file-list">
        <div
          v-for="file in outputFiles"
          :key="file.name"
          class="file-item"
        >
          <div class="file-icon">{{ file.icon }}</div>
          <div class="file-info">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-desc">{{ file.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="tools">
      <div class="tools-title">常用编译工具</div>
      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-name">GCC</div>
          <div class="tool-desc">GNU Compiler Collection</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">Clang</div>
          <div class="tool-desc">LLVM 的 C/C++ 编译器</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">MSVC</div>
          <div class="tool-desc">Microsoft Visual C++</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sourceCode = ref(`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`)

const steps = [
  {
    name: '预处理',
    command: 'gcc -E hello.c -o hello.i',
    output: '处理 #include，展开宏定义'
  },
  {
    name: '编译',
    command: 'gcc -S hello.i -o hello.s',
    output: '生成汇编代码'
  },
  {
    name: '汇编',
    command: 'gcc -c hello.s -o hello.o',
    output: '生成目标文件'
  },
  {
    name: '链接',
    command: 'gcc hello.o -o hello',
    output: '生成可执行文件'
  }
]

const outputFiles = [
  {
    name: 'hello.c',
    icon: '📄',
    desc: '源代码文件'
  },
  {
    name: 'hello.i',
    icon: '📝',
    desc: '预处理后的文件'
  },
  {
    name: 'hello.s',
    icon: '⚙️',
    desc: '汇编代码文件'
  },
  {
    name: 'hello.o',
    icon: '📦',
    desc: '目标文件'
  },
  {
    name: 'hello',
    icon: '🚀',
    desc: '可执行文件'
  }
]
</script>

<style scoped>
.compilation-practice-demo {
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

.code-input {
  margin-bottom: 2rem;
}

.input-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.code-textarea {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  background: #1e1e1e;
  color: #d4d4d4;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  resize: vertical;
}

.compilation-steps {
  margin-bottom: 2rem;
}

.steps-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.steps-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.step-command {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.35rem;
}

.step-output {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.file-outputs {
  margin-bottom: 2rem;
}

.outputs-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.file-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.file-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
}

.file-name {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.file-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.tools {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.tools-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.tool-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.tool-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.tool-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
