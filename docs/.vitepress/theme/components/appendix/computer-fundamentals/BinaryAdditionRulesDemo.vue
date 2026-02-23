<template>
  <div class="addition-rules">
    <div class="demo-header">
      <span class="title">从手算加法到逻辑门</span>
      <span class="subtitle">计算机如何只用 0 和 1 做数学题？看看这个规律</span>
    </div>

    <!-- 1. 十进制类比 -->
    <div class="section">
      <div class="section-title">第一步：回顾十进制的"进位"</div>
      <div class="decimal-analogy">
        <div class="math-column">
          <div class="math-row">
            <span class="digit carry-mark">1</span> <!-- 进位标记 -->
          </div>
          <div class="math-row">
            <span class="digit"></span>
            <span class="digit">7</span>
          </div>
          <div class="math-row">
            <span class="op">+</span>
            <span class="digit">5</span>
          </div>
          <div class="math-line"></div>
          <div class="math-row result-row">
            <span class="digit c-color">1</span>
            <span class="digit s-color">2</span>
          </div>
        </div>

        <div class="analogy-text">
          <p>
            因为 7 + 5 = 12，这个结果超出了个位能装下的最大数字 (9)。
            我们把 12 拆成"一个完整的 10"和"剩下的 2"：
          </p>
          <ul>
            <li>
              留在当前位置的那个 <span class="badge s-badge">2</span> 被<strong>写在个位</strong>上，这叫 <strong class="s-color">本位 (Sum)</strong>。
            </li>
            <li>
              "完整的 10"向十位<strong>进了一个 1</strong>，叫 <strong class="c-color">进位 (Carry)</strong>。
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. 二进制四种情况交互 -->
    <div class="section">
      <div class="section-title">第二步：二进制加法的 4 种情况（点点看）</div>
      <div class="binary-demo">
        <div class="binary-calc">
          <button class="bit-btn" :class="{ on: inputA }" @click="inputA = !inputA">{{ inputA ? '1' : '0' }}</button>
          <span class="op">+</span>
          <button class="bit-btn" :class="{ on: inputB }" @click="inputB = !inputB">{{ inputB ? '1' : '0' }}</button>
          <span class="op">=</span>
          <span class="res-box">
            <span class="res-bit carry-bit" :class="{ lit: carry }">{{ carry ? '1' : '0' }}</span>
            <span class="res-bit sum-bit" :class="{ lit: sum }">{{ sum ? '1' : '0' }}</span>
          </span>
        </div>

        <div class="binary-explain">
          <p v-if="!inputA && !inputB">
            0 + 0 = 0。<br>本位写 <strong>0</strong>，不进位。
          </p>
          <p v-if="(!inputA && inputB) || (inputA && !inputB)">
            {{ inputA ? '1' : '0' }} + {{ inputB ? '1' : '0' }} = 1。<br>本位写 <strong>1</strong>，不进位。
          </p>
          <p v-if="inputA && inputB">
            1 + 1 = 10。<br>
            二进制"满 2 就进 1"。所以本位写 <strong class="s-color">0</strong>，向左进位 <strong class="c-color">1</strong>。
          </p>
        </div>
      </div>
    </div>

    <!-- 3. 找出规律并对应到逻辑门 -->
    <div class="section mb-0">
      <div class="section-title">第三步：给规律起个名字（电路化）</div>
      
      <div class="rules-container">
        <!-- 所有的 4 种情况一览表 -->
        <div class="rules-table">
          <div class="rt-head">
            <span>A</span><span>B</span><span class="c-color">进位</span><span class="s-color">本位</span>
          </div>
          <div class="rt-row" :class="{ active: !inputA && !inputB }"><span>0</span><span>0</span><span>0</span><span>0</span></div>
          <div class="rt-row" :class="{ active: !inputA && inputB }"> <span>0</span><span>1</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && !inputB }"> <span>1</span><span>0</span><span>0</span><span>1</span></div>
          <div class="rt-row" :class="{ active: inputA && inputB }">  <span>1</span><span>1</span><span>1</span><span>0</span></div>
        </div>

        <div class="rules-text">
          <div class="rule-card sum-rule" :class="{ active: sum }">
            <div class="rc-title"><span class="badge s-badge">本位</span> 规律：</div>
            <div class="rc-desc">
              只有当输入是 (0,1) 或 (1,0) 时，本位才是 1。<br>
              <strong>总结：</strong>只有两个输入<strong>不同</strong>时才为 1。<br>
              <div class="rc-gate">这个规律在电路中叫 <strong>XOR (异或门)</strong></div>
            </div>
          </div>

          <div class="rule-card carry-rule" :class="{ active: carry }">
            <div class="rc-title"><span class="badge c-badge">进位</span> 规律：</div>
            <div class="rc-desc">
              只有当输入是 (1,1) 时，进位才是 1。<br>
              <strong>总结：</strong>只有两个输入<strong>都是 1</strong> 时才为 1。<br>
              <div class="rc-gate">这个规律在电路中叫 <strong>AND (与门)</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputA = ref(false)
const inputB = ref(false)

const sum = computed(() => inputA.value !== inputB.value)
const carry = computed(() => inputA.value && inputB.value)
</script>

<style scoped>
.addition-rules {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1.5rem 0;
}

.demo-header {
  margin-bottom: 1.2rem;
}
.title {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.mb-0 { margin-bottom: 0; }

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

/* 颜色常量 */
.s-color { color: #16a34a; font-weight: bold; }
.c-color { color: #d97706; font-weight: bold; }
.badge { padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
.s-badge { background: #dcfce7; color: #166534; }
.c-badge { background: #fef3c7; color: #92400e; }

/* 1. 十进制类比 */
.decimal-analogy {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.math-column {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: monospace;
  font-size: 1.5rem;
  background: var(--vp-c-bg-alt);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  position: relative;
}
.math-row {
  display: flex;
  gap: 0.5rem;
  line-height: 1.2;
}
.digit { width: 1.2rem; text-align: center; }
.op { font-weight: bold; color: var(--vp-c-text-3); margin-right: 0.2rem; }
.math-line {
  width: 100%;
  height: 2px;
  background: var(--vp-c-text-2);
  margin: 0.2rem 0;
}
.carry-mark {
  color: #d97706;
  font-size: 0.8rem;
  line-height: 1;
  transform: translateY(10px);
}
.analogy-text {
  flex: 1;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.analogy-text ul { padding-left: 1.2rem; margin-top: 0.5rem; }

/* 2. 二进制四种情况 */
.binary-demo {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}
.binary-calc {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
}
.bit-btn {
  width: 3rem; height: 3rem; font-size: 1.5rem; font-weight: bold; font-family: monospace;
  border-radius: 6px; background: var(--vp-c-bg); border: 2px solid var(--vp-c-divider);
  cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.bit-btn.on { background: #dbeafe; color: #1d4ed8; border-color: #3b82f6; }
.res-box { display: flex; gap: 0.2rem; margin-left: 0.5rem; }
.res-bit {
  width: 3rem; height: 3rem; border-radius: 6px; border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg); font-size: 1.5rem; font-weight: bold; font-family: monospace;
  display: flex; align-items: center; justify-content: center;
  color: var(--vp-c-text-3); transition: all 0.2s;
}
.carry-bit.lit { background: #fef3c7; color: #d97706; border-color: #d97706; }
.sum-bit.lit   { background: #dcfce7; color: #16a34a; border-color: #16a34a; }

.binary-explain {
  flex: 1;
  background: var(--vp-c-bg-alt);
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  min-width: 200px;
}
.binary-explain p { margin: 0; }

/* 3. 找出规律 */
.rules-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.rules-table {
  flex: 0 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  font-family: monospace;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
}
.rt-head, .rt-row {
  display: grid;
  grid-template-columns: 2rem 2rem 3rem 3rem;
  text-align: center;
  padding: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.rt-row:last-child { border-bottom: none; }
.rt-head { font-weight: bold; font-family: system-ui; font-size: 0.75rem; background: var(--vp-c-bg); }
.rt-row.active { background: #dbeafe; font-weight: bold; }

.rules-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 250px;
}
.rule-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem;
  transition: all 0.2s;
  background: var(--vp-c-bg-alt);
}
.sum-rule.active { border-color: #16a34a; background: #f0fdf4; }
.carry-rule.active { border-color: #d97706; background: #fffbeb; }

.rc-title { font-size: 0.8rem; font-weight: bold; margin-bottom: 0.4rem; color: var(--vp-c-text-1); }
.rc-desc { font-size: 0.75rem; color: var(--vp-c-text-2); line-height: 1.5; }
.rc-gate {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .decimal-analogy, .binary-demo, .rules-container { flex-direction: column; align-items: stretch; }
  .math-column, .rules-table { align-self: center; }
}
</style>
