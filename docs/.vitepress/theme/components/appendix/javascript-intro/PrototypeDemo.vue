<template>
  <div class="prototype-demo">
    <div class="demo-header">
      <span class="icon">🧬</span>
      <span class="title">原型与继承</span>
      <span class="subtitle">理解 JavaScript 的原型链机制</span>
    </div>

    <div class="intro-text">
      想象你有本<span class="highlight">秘籍</span>，上面记载了很多通用技能。当你需要某个技能时，
      先翻翻自己的<span class="highlight">技能书</span>，没有就去翻<span class="highlight">师傅的秘籍</span>，
      还没有就去翻<span class="highlight">师傅的师傅的秘籍</span>……这条<span class="highlight">查找链</span>就是原型链
    </div>

    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 原型基础 -->
    <div
      v-if="activeTab === 'basic'"
      class="tab-content"
    >
      <div class="concept-explanation">
        <div class="code-panel">
          <div class="code-title">
            创建对象的方式
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // 方式 1：对象字面量
            </div>
            <div class="code-line">
              const obj1 = { name: "对象1" }
            </div>
            <div class="code-line">
              obj1.__proto__ === Object.prototype <span class="comment">// true</span>
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 方式 2：构造函数
            </div>
            <div class="code-line">
              function Person(name) {
            </div>
            <div class="code-line indent">
              this.name = name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line">
              const p = new Person("张三")
            </div>
            <div class="code-line">
              p.__proto__ === Person.prototype <span class="comment">// true</span>
            </div>
          </div>
        </div>

        <div class="prototype-visual">
          <div class="prototype-chain">
            <div
              class="chain-node"
              :class="{ active: chainLevel >= 0 }"
              @click="chainLevel = 0"
            >
              <div class="node-title">
                对象实例 (p)
              </div>
              <div class="node-content">
                <div class="property">
                  name: "张三"
                </div>
                <div class="proto-link">
                  __proto__ →
                </div>
              </div>
            </div>

            <div
              v-if="chainLevel >= 0"
              class="chain-arrow"
            >
              ↓ 查找
            </div>

            <div
              class="chain-node constructor"
              :class="{ active: chainLevel >= 1 }"
              @click="chainLevel = 1"
            >
              <div class="node-title">
                Person.prototype
              </div>
              <div class="node-content">
                <div class="method">
                  constructor: Person
                </div>
                <div class="proto-link">
                  __proto__ →
                </div>
              </div>
            </div>

            <div
              v-if="chainLevel >= 1"
              class="chain-arrow"
            >
              ↓ 查找
            </div>

            <div
              class="chain-node object"
              :class="{ active: chainLevel >= 2 }"
              @click="chainLevel = 2"
            >
              <div class="node-title">
                Object.prototype
              </div>
              <div class="node-content">
                <div class="method">
                  toString()
                </div>
                <div class="method">
                  hasOwnProperty()
                </div>
                <div class="proto-link">
                  __proto__ → null
                </div>
              </div>
            </div>
          </div>

          <div class="chain-explanation">
            <div v-if="chainLevel === 0">
              <strong>实例对象</strong>
              <p>访问 p.name 时，在自己的属性中找到 → 返回 "张三"</p>
            </div>
            <div v-else-if="chainLevel === 1">
              <strong>Person 原型</strong>
              <p>访问 p.toString() 时，实例中没有 → 向上查找 → Person.prototype 中没有 → 继续向上</p>
            </div>
            <div v-else>
              <strong>Object 原型（链的顶端）</strong>
              <p>找到了 toString() 方法！这是所有对象的祖先提供的方法。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 原型继承 -->
    <div
      v-else-if="activeTab === 'inheritance'"
      class="tab-content"
    >
      <div class="inheritance-demo">
        <div class="inheritance-code">
          <div class="code-title">
            原型继承示例
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // 父类构造函数
            </div>
            <div class="code-line">
              function Animal(name) {
            </div>
            <div class="code-line indent">
              this.name = name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              Animal.prototype.eat = function() {
            </div>
            <div class="code-line indent">
              return this.name + " 在吃东西"
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 子类构造函数
            </div>
            <div class="code-line">
              function Dog(name, breed) {
            </div>
            <div class="code-line indent">
              Animal.call(this, name) <span class="comment">// 继承属性</span>
            </div>
            <div class="code-line indent">
              this.breed = breed
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 继承方法
            </div>
            <div class="code-line">
              Dog.prototype = Object.create(Animal.prototype)
            </div>
            <div class="code-line">
              Dog.prototype.constructor = Dog
            </div>
          </div>
        </div>

        <div class="inheritance-visual">
          <div class="class-diagram">
            <div class="class-box parent">
              <div class="class-title">
                Animal (父类)
              </div>
              <div class="class-content">
                <div class="class-section">
                  <div class="section-title">
                    属性
                  </div>
                  <div class="section-item">
                    name: String
                  </div>
                </div>
                <div class="class-section">
                  <div class="section-title">
                    方法 (prototype)
                  </div>
                  <div class="section-item">
                    eat()
                  </div>
                </div>
              </div>
            </div>

            <div class="inherit-arrow">
              ↓ 继承
            </div>

            <div class="class-box child">
              <div class="class-title">
                Dog (子类)
              </div>
              <div class="class-content">
                <div class="class-section">
                  <div class="section-title">
                    属性
                  </div>
                  <div class="section-item">
                    name: String
                  </div>
                  <div class="section-item">
                    breed: String
                  </div>
                </div>
                <div class="class-section">
                  <div class="section-title">
                    方法 (prototype)
                  </div>
                  <div class="section-item">
                    eat() <span class="inherited">[继承]</span>
                  </div>
                  <div class="section-item">
                    bark() <span class="own">[新增]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="inheritance-playground">
            <div class="playground-title">
              试试创建实例
            </div>
            <div class="input-group">
              <input
                v-model="dogName"
                placeholder="狗狗名字"
              >
              <input
                v-model="dogBreed"
                placeholder="品种"
              >
              <button @click="createDog">
                创建
              </button>
            </div>
            <div
              v-if="dogInstance"
              class="instance-result"
            >
              <div class="result-item">
                <span class="label">名字：</span>
                <span class="value">{{ dogInstance.name }}</span>
              </div>
              <div class="result-item">
                <span class="label">品种：</span>
                <span class="value">{{ dogInstance.breed }}</span>
              </div>
              <div class="result-item">
                <span class="label">调用 eat()：</span>
                <button
                  class="action-btn"
                  @click="callEat"
                >
                  调用
                </button>
                <span
                  v-if="eatResult"
                  class="method-result"
                >{{ eatResult }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- class 语法 -->
    <div
      v-else
      class="tab-content"
    >
      <div class="class-syntax-demo">
        <div class="syntax-comparison">
          <div class="syntax-panel old">
            <div class="panel-title">
              ES5 构造函数
            </div>
            <div class="code-block">
              <div class="code-line">
                function Person(name) {
              </div>
              <div class="code-line indent">
                this.name = name
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                Person.prototype.greet = function() {
              </div>
              <div class="code-line indent">
                return "你好，我是" + this.name
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                const p = new Person("小明")
              </div>
            </div>
          </div>

          <div class="syntax-panel new">
            <div class="panel-title">
              ES6 class 语法
            </div>
            <div class="code-block">
              <div class="code-line">
                class Person {
              </div>
              <div class="code-line indent">
                constructor(name) {
              </div>
              <div class="code-line indent indent">
                this.name = name
              </div>
              <div class="code-line indent">
                }
              </div>
              <div class="code-line" />
              <div class="code-line indent">
                greet() {
              </div>
              <div class="code-line indent indent">
                return "你好，我是" + this.name
              </div>
              <div class="code-line indent">
                }
              </div>
              <div class="code-line">
                }
              </div>
              <div class="code-line" />
              <div class="code-line">
                const p = new Person("小明")
              </div>
            </div>
          </div>
        </div>

        <div class="class-features">
          <div class="feature-card">
            <div class="feature-icon">
              🎯
            </div>
            <div class="feature-title">
              更清晰的语法
            </div>
            <div class="feature-desc">
              class 语法让面向对象编程更直观，但本质还是基于原型
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              🔗
            </div>
            <div class="feature-title">
              继承更简单
            </div>
            <div class="feature-desc">
              使用 extends 关键字实现继承，代码更简洁
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              ⚠️
            </div>
            <div class="feature-title">
              注意
            </div>
            <div class="feature-desc">
              class 只是语法糖，底层仍然是原型链机制
            </div>
          </div>
        </div>

        <div class="inheritance-example">
          <div class="code-title">
            class 继承示例
          </div>
          <div class="code-block">
            <div class="code-line">
              class Animal {
            </div>
            <div class="code-line indent">
              constructor(name) {
            </div>
            <div class="code-line indent indent">
              this.name = name
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line indent">
              eat() {
            </div>
            <div class="code-line indent indent">
              return this.name + " 在吃东西"
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              class Dog extends Animal {
            </div>
            <div class="code-line indent">
              constructor(name, breed) {
            </div>
            <div class="code-line indent indent">
              super(name) <span class="comment">// 调用父类构造函数</span>
            </div>
            <div class="code-line indent indent">
              this.breed = breed
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line indent">
              bark() {
            </div>
            <div class="code-line indent indent">
              return "汪汪！"
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="key-points">
      <div class="point-title">
        🎯 核心要点
      </div>
      <ul class="point-list">
        <li>每个对象都有 <code>__proto__</code> 属性，指向其构造函数的 <code>prototype</code></li>
        <li>访问对象属性时，先在自身查找，找不到就沿着原型链向上查找</li>
        <li>原型链顶端是 <code>Object.prototype</code>，它的 <code>__proto__</code> 是 <code>null</code></li>
        <li><code>class</code> 是语法糖，本质仍然是原型继承</li>
      </ul>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>
      <span v-if="activeTab === 'basic'">JavaScript 通过原型链实现继承，而不是像其他语言那样使用类。每个对象都有一个原型对象，对象以其原型为模板、从原型继承方法和属性。这种"原型式继承"机制让 JavaScript 更加灵活。</span>
      <span v-else-if="activeTab === 'inheritance'">原型继承让对象可以共享方法，节省内存。子类通过原型链继承父类的方法，同时可以添加自己的方法。理解原型链是掌握 JavaScript 面向对象编程的关键。</span>
      <span v-else>ES6 的 class 语法让面向对象编程更加清晰易读，但它只是语法糖，底层仍然是原型链。使用 class 可以让代码更接近传统面向对象语言的风格，降低学习成本。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('basic')
const chainLevel = ref(0)
const dogName = ref('')
const dogBreed = ref('')
const dogInstance = ref(null)
const eatResult = ref('')

const tabs = [
  { id: 'basic', label: '原型基础' },
  { id: 'inheritance', label: '原型继承' },
  { id: 'class', label: 'class 语法' }
]

const createDog = () => {
  if (dogName.value && dogBreed.value) {
    dogInstance.value = {
      name: dogName.value,
      breed: dogBreed.value
    }
    eatResult.value = ''
  }
}

const callEat = () => {
  if (dogInstance.value) {
    eatResult.value = `${dogInstance.value.name} 在吃东西`
  }
}
</script>

<style scoped>
.prototype-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
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
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.demo-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-content {
  min-height: 380px;
}

.concept-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.code-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.code-block {
  line-height: 1.5;
}

.code-line {
  padding: 0.1rem 0;
}

.code-line.indent {
  padding-left: 1.5rem;
}

.code-line .comment {
  color: #6a9955;
}

.prototype-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prototype-chain {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chain-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.chain-node:hover {
  border-color: var(--vp-c-brand);
}

.chain-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.chain-node.constructor {
  border-color: #c8e6c9;
}

.chain-node.constructor.active {
  background: #e8f5e9;
}

.chain-node.object {
  border-color: #bbdefb;
}

.chain-node.object.active {
  background: #e3f2fd;
}

.node-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.node-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.property {
  background: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.method {
  background: #e3f2fd;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  color: #1976d2;
}

.proto-link {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.chain-arrow {
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.85rem;
}

.chain-explanation {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.85rem;
}

.chain-explanation strong {
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 0.5rem;
}

.chain-explanation p {
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.inheritance-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.inheritance-code {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
}

.inheritance-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.class-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.class-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.class-box.parent {
  border-color: #c8e6c9;
}

.class-box.child {
  border-color: var(--vp-c-brand);
}

.class-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.class-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.class-section {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.5rem;
}

.section-title {
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.section-item {
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.15rem 0;
  color: var(--vp-c-text-2);
}

.inherited {
  color: #4caf50;
  font-size: 0.7rem;
}

.own {
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.inherit-arrow {
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.inheritance-playground {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.playground-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.input-group input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.input-group button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.instance-result {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.85rem;
}

.result-item .label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 4rem;
}

.result-item .value {
  color: var(--vp-c-text-1);
}

.action-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.method-result {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.class-syntax-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.syntax-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.syntax-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.syntax-panel.new {
  border: 2px solid var(--vp-c-brand);
}

.panel-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.class-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.feature-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.inheritance-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.key-points {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.point-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.point-list {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.6;
}

.point-list code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
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

@media (max-width: 768px) {
  .concept-explanation,
  .inheritance-demo,
  .syntax-comparison,
  .class-features {
    grid-template-columns: 1fr;
  }
}
</style>
