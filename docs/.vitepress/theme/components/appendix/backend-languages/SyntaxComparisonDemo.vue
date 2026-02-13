<template>
  <div class="syntax-comparison-demo">
    <div class="demo-header">
      <span class="icon">📝</span>
      <span class="title">语法对比镜</span>
      <span class="subtitle">同样的功能，不同的表达方式</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">写信</span>：有人喜欢简洁明了（Python、Ruby），有人喜欢正式严谨（Java、C#），有人喜欢直接高效（Go）。不同语言的语法反映了不同的设计哲学。
    </div>

    <div class="language-tabs">
      <button
        v-for="lang in languages"
        :key="lang.name"
        class="lang-tab"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <span class="tab-icon">{{ lang.icon }}</span>
        <span class="tab-name">{{ lang.name }}</span>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="selectedLang" class="code-display">
        <div class="code-window">
          <div class="window-header">
            <div class="window-controls">
              <span class="control red"></span>
              <span class="control yellow"></span>
              <span class="control green"></span>
            </div>
            <div class="file-name">{{ getCode(selectedLang).filename }}</div>
          </div>
          <pre class="code-content">{{ getCode(selectedLang).code }}</pre>
        </div>

        <div class="code-stats">
          <div class="stat-item">
            <span class="stat-label">代码行数：</span>
            <span class="stat-value">{{ getLineCount(selectedLang) }} 行</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">复杂度：</span>
            <span class="stat-value">{{ getCode(selectedLang).complexity }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>简洁的语法（Python、Ruby）让开发更快，但冗长的语法（Java、C#）提供了更强的类型安全性和可维护性。没有"最好"的语法，只有最适合团队的语法。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLang = ref('Python')

const languages = [
  { name: 'Python', icon: '🐍' },
  { name: 'Go', icon: '🐹' },
  { name: 'Node.js', icon: '💚' },
  { name: 'Java', icon: '☕' },
  { name: 'Rust', icon: '🦀' }
]

const codes = {
  Python: {
    code: `print("Hello, World!")`,
    filename: 'hello.py',
    complexity: '极简'
  },
  Go: {
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
    filename: 'hello.go',
    complexity: '简洁'
  },
  'Node.js': {
    code: `console.log("Hello, World!");`,
    filename: 'hello.js',
    complexity: '极简'
  },
  Java: {
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    filename: 'HelloWorld.java',
    complexity: '冗长'
  },
  Rust: {
    code: `fn main() {
    println!("Hello, World!");
}`,
    filename: 'main.rs',
    complexity: '简洁'
  }
}

const getCode = (lang) => {
  return codes[lang]
}

const getLineCount = (lang) => {
  return codes[lang].code.split('\n').length
}
</script>

<style scoped>
.syntax-comparison-demo {
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

.language-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.lang-tab {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.lang-tab:hover {
  border-color: var(--vp-c-brand);
}

.lang-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1rem;
}

.code-display {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.code-window {
  background: #1e1e1e;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.window-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: #2d2d2d;
  gap: 0.5rem;
}

.window-controls {
  display: flex;
  gap: 4px;
}

.control {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.control.red {
  background: #ff5f56;
}

.control.yellow {
  background: #ffbd2e;
}

.control.green {
  background: #27c93f;
}

.file-name {
  flex: 1;
  text-align: center;
  color: #858585;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
}

.code-content {
  margin: 0;
  padding: 1rem;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
}

.code-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-label {
  margin-right: 0.25rem;
}

.stat-value {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
