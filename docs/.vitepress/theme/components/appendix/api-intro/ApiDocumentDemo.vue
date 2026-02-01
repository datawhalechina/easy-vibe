<!--
  ApiDocumentDemo.vue - 翻译版
  目标：一键把"黑话"翻译成"人话"
-->
<template>
  <div class="demo">
    <div class="header">
      <div class="title-area">
        <span class="icon">📖</span>
        <span class="title">API 文档翻译机</span>
      </div>
      <button class="translate-btn" @click="isHuman = !isHuman">
        {{ isHuman ? '🔄 还原回黑话' : '✨ 翻译成人话' }}
      </button>
    </div>

    <div class="doc-container">
      <!-- 模拟 API 文档 -->
      <div class="api-doc">
        <div class="doc-row method-row">
          <span class="label">Method:</span>
          <span class="value method" :class="{ human: isHuman }">
            {{ isHuman ? '我要下单 (POST)' : 'POST' }}
          </span>
        </div>

        <div class="doc-row url-row">
          <span class="label">Endpoint:</span>
          <span class="value url" :class="{ human: isHuman }">
            {{ isHuman ? '去哪里找厨师' : 'https://api.deepseek.com/chat' }}
          </span>
        </div>

        <div class="doc-row headers-row">
          <span class="label">Headers:</span>
          <div class="code-block" :class="{ human: isHuman }">
            <div class="line">
              <span class="key">{{
                isHuman ? '我是谁:' : 'Authorization:'
              }}</span>
              <span class="val">{{
                isHuman ? ' 这是我的会员卡号' : ' Bearer sk-8f9s...'
              }}</span>
            </div>
            <div class="line">
              <span class="key">{{
                isHuman ? '用什么语言:' : 'Content-Type:'
              }}</span>
              <span class="val">{{
                isHuman ? ' 标准格式(JSON)' : ' application/json'
              }}</span>
            </div>
          </div>
        </div>

        <div class="doc-row body-row">
          <span class="label">Body:</span>
          <div class="code-block" :class="{ human: isHuman }">
            <div class="line">{</div>
            <div class="line indent">
              <span class="key">"model":</span>
              <span class="val">"deepseek-chat",</span>
              <span class="comment" v-if="isHuman"> // 选个聪明的厨师</span>
            </div>
            <div class="line indent">
              <span class="key">"messages":</span>
              <span class="val">[...]</span>
              <span class="comment" v-if="isHuman"> // 我要说的话</span>
            </div>
            <div class="line">}</div>
          </div>
        </div>

        <div class="doc-row response-row">
          <span class="label">Response:</span>
          <div class="code-block" :class="{ human: isHuman }">
            <div class="line">
              <span class="key">{{ isHuman ? '状态:' : 'Status:' }}</span>
              <span class="status-ok">{{
                isHuman ? '搞定了 (200)' : '200 OK'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHuman = ref(false)
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 24px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.translate-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.translate-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.doc-container {
  padding: 20px;
}

.api-doc {
  background: #1e293b;
  border-radius: 8px;
  padding: 20px;
  color: #e2e8f0;
  font-family: monospace;
  font-size: 14px;
}

.doc-row {
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
}

.doc-row:last-child {
  margin-bottom: 0;
}

.label {
  width: 80px;
  color: #94a3b8;
  font-weight: bold;
  flex-shrink: 0;
  padding-top: 2px;
}

.value {
  color: #38bdf8;
  transition: all 0.3s;
}

.method {
  font-weight: bold;
  color: #eab308;
}

.method.human {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.url.human {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.code-block {
  flex: 1;
  background: #0f172a;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  transition: all 0.3s;
}

.code-block.human {
  background: #1e293b;
  border-color: #64748b;
}

.line {
  line-height: 1.6;
}

.indent {
  padding-left: 20px;
}

.key {
  color: #94a3b8;
}

.val {
  color: #a5f3fc;
}

.comment {
  color: #22c55e;
  font-style: italic;
}

.status-ok {
  color: #22c55e;
  font-weight: bold;
}
</style>
