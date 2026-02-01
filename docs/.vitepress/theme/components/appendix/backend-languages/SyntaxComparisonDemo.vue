<template>
  <div class="syntax-comparison-demo">
    <div class="demo-header">
      <h4>Hello World 语法对比</h4>
      <p class="subtitle">同样的功能，不同的实现方式</p>
    </div>

    <div class="language-selector">
      <button
        v-for="lang in languages"
        :key="lang.name"
        class="lang-btn"
        :class="{ active: selectedLang === lang.name }"
        @click="selectedLang = lang.name"
      >
        <span class="lang-icon">{{ lang.icon }}</span>
        <span class="lang-name">{{ lang.name }}</span>
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="selectedLang" class="code-display">
        <div class="code-header">
          <div class="window-controls">
            <span class="control red"></span>
            <span class="control yellow"></span>
            <span class="control green"></span>
          </div>
          <div class="filename">{{ getFileName(selectedLang) }}</div>
        </div>

        <pre class="code-content"><code>{{ getCode(selectedLang) }}</code></pre>

        <div class="code-stats">
          <div class="stat-item">
            <span class="stat-label">代码行数：</span>
            <span class="stat-value">{{ getLineCount(selectedLang) }} 行</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">字符数：</span>
            <span class="stat-value"
              >{{ getCharCount(selectedLang) }} 字符</span
            >
          </div>
          <div class="stat-item">
            <span class="stat-label">复杂度：</span>
            <span class="stat-value">{{ getComplexity(selectedLang) }}</span>
          </div>
        </div>
      </div>
    </transition>

    <div class="analysis-panel">
      <h5>💡 语法分析</h5>
      <div class="analysis-content">
        <p>{{ getAnalysis(selectedLang) }}</p>
      </div>
    </div>

    <div class="complexity-chart">
      <h5>代码复杂度对比</h5>
      <div class="chart-bars">
        <div
          v-for="lang in languages"
          :key="lang.name"
          class="chart-bar-wrapper"
        >
          <div class="chart-label">{{ lang.name }}</div>
          <div class="chart-bar">
            <div
              class="chart-fill"
              :style="{ width: getComplexityWidth(lang.name) + '%' }"
            ></div>
          </div>
          <div class="chart-value">{{ getLineCount(lang.name) }} 行</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedLang = ref('Python')

const languages = [
  { name: 'Python', icon: '🐍' },
  { name: 'Ruby', icon: '💎' },
  { name: 'Go', icon: '🐹' },
  { name: 'Node.js', icon: '💚' },
  { name: 'Java', icon: '☕' },
  { name: 'C#', icon: '💜' },
  { name: 'Rust', icon: '🦀' },
  { name: 'C++', icon: '⚡' }
]

const codes = {
  Python: {
    code: `print("Hello, World!")`,
    filename: 'hello.py',
    complexity: '极简'
  },
  Ruby: {
    code: `puts "Hello, World!"`,
    filename: 'hello.rb',
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
  'C#': {
    code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    filename: 'Program.cs',
    complexity: '冗长'
  },
  Rust: {
    code: `fn main() {
    println!("Hello, World!");
}`,
    filename: 'main.rs',
    complexity: '简洁'
  },
  'C++': {
    code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    filename: 'hello.cpp',
    complexity: '中等'
  }
}

const analyses = {
  Python:
    'Python 的语法极其简洁，只有一行代码。这也是为什么它被称为"伪代码语言"——读起来就像英语一样自然。没有任何样板代码，直接表达意图。',
  Ruby: 'Ruby 受 Perl 影响，语法非常优雅。puts 是 "put string" 的缩写，字符串不需要括号（虽然可以加）。Ruby 哲学是"程序员快乐至上"。',
  Go: 'Go 的语法虽然比 Python 冗长，但非常清晰。package main、import、func main() 都是必要的显式声明，这让代码更容易理解和维护。',
  'Node.js':
    'Node.js 使用 JavaScript，语法简单直接。console.log() 是浏览器和 Node.js 通用的输出方式。前端开发者零学习成本。',
  Java: 'Java 是典型的"仪式感"语言。class、public static void main、String[] args 都是必须的样板代码。虽然冗长，但结构清晰，适合大型项目。',
  'C#': 'C# 和 Java 非常相似，同样需要 class 和 Main 方法。using System 类似 Java 的 import，但更现代一些。.NET Core 后跨平台能力大幅提升。',
  Rust: 'Rust 的 fn main() 和 println! 宏看起来简洁，但 println! 后面的 ! 表示这是一个宏（不是函数）。Rust 的简洁来自于零成本抽象的设计哲学。',
  'C++':
    'C++ 需要 #include 头文件，std::cout 使用流操作符 <<，return 0 表示程序成功退出。虽然比 C 语言简洁（printf），但依然保留了很多底层细节。'
}

const getCode = (lang) => {
  return codes[lang].code
}

const getFileName = (lang) => {
  return codes[lang].filename
}

const getLineCount = (lang) => {
  return codes[lang].code.split('\n').length
}

const getCharCount = (lang) => {
  return codes[lang].code.replace(/\s/g, '').length
}

const getComplexity = (lang) => {
  return codes[lang].complexity
}

const getAnalysis = (lang) => {
  return analyses[lang]
}

const getComplexityWidth = (lang) => {
  const max = 10 // Java is the longest
  const lines = getLineCount(lang)
  return (lines / max) * 100
}
</script>

<style scoped>
.syntax-comparison-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.language-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lang-btn:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.lang-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.lang-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.lang-name {
  font-size: 0.95rem;
}

.code-display {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.code-header {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3e3e3e;
}

.window-controls {
  display: flex;
  gap: 6px;
}

.control {
  width: 12px;
  height: 12px;
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

.filename {
  flex: 1;
  text-align: center;
  color: #858585;
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
}

.code-content {
  margin: 0;
  padding: 1.5rem;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-content code {
  color: #d4d4d4;
}

.code-stats {
  display: flex;
  gap: 2rem;
  padding: 1rem 1.5rem;
  background: #2d2d2d;
  border-top: 1px solid #3e3e3e;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.stat-label {
  color: #858585;
}

.stat-value {
  color: #4ec9b0;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
}

.analysis-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--vp-c-brand);
}

.analysis-panel h5 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.analysis-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-size: 0.95rem;
}

.complexity-chart {
  margin-top: 2rem;
}

.complexity-chart h5 {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chart-label {
  min-width: 80px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.chart-bar {
  flex: 1;
  height: 30px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  overflow: hidden;
}

.chart-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #8b5cf6);
  transition: width 0.5s ease;
}

.chart-value {
  min-width: 60px;
  text-align: right;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .language-selector {
    font-size: 0.85rem;
  }

  .lang-btn {
    padding: 0.5rem 1rem;
  }

  .code-stats {
    flex-direction: column;
    gap: 0.75rem;
  }

  .chart-bar-wrapper {
    flex-wrap: wrap;
  }

  .chart-label {
    min-width: 60px;
  }

  .chart-value {
    min-width: 50px;
  }
}
</style>
