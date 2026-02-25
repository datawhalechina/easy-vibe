<!--
  FileUploadFlowDemo.vue
  文件上传流程演示：直传 vs 服务端中转
-->
<template>
  <div class="upload-flow-demo">
    <div class="header">
      <div class="title">文件上传方式对比</div>
      <div class="subtitle">点击切换查看两种上传方式的流程差异</div>
    </div>

    <div class="mode-tabs">
      <button
        :class="['tab', { active: mode === 'proxy' }]"
        @click="mode = 'proxy'; reset()"
      >服务端中转</button>
      <button
        :class="['tab', { active: mode === 'direct' }]"
        @click="mode = 'direct'; reset()"
      >客户端直传</button>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, i) in currentSteps"
        :key="i"
        :class="['step', { active: currentStep === i, done: currentStep > i }]"
      >
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="step.note" class="step-note">{{ step.note }}</div>
        </div>
      </div>
    </div>

    <button class="play-btn" @click="playFlow" :disabled="playing">
      {{ playing ? '演示中...' : '播放流程' }}
    </button>

    <div :class="['verdict', mode]" v-if="currentStep >= currentSteps.length">
      <template v-if="mode === 'proxy'">
        ⚠️ 服务端中转：文件经过你的服务器，占用带宽和内存，大文件容易超时
      </template>
      <template v-else>
        ✅ 客户端直传：文件直接上传到 OSS，服务器只负责签发凭证，高效且省资源
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('proxy')
const currentStep = ref(-1)
const playing = ref(false)

const proxySteps = [
  { title: '客户端 → 服务器', desc: '用户选择文件，上传到你的后端服务器', note: '大文件会占用服务器带宽和内存' },
  { title: '服务器接收文件', desc: '后端将文件暂存到本地磁盘或内存', note: '可能触发 Nginx 的 body size 限制' },
  { title: '服务器 → OSS', desc: '后端再将文件转发到对象存储', note: '文件传输了两次，效率低' },
  { title: 'OSS 返回 URL', desc: '对象存储返回文件的访问地址', note: '' },
  { title: '服务器 → 客户端', desc: '后端将文件 URL 返回给前端', note: '' }
]

const directSteps = [
  { title: '客户端 → 服务器', desc: '前端请求一个临时上传凭证（Pre-signed URL）', note: '只传少量 JSON 数据，毫秒级' },
  { title: '服务器签发凭证', desc: '后端用 OSS SDK 生成带签名的临时上传 URL', note: '凭证有效期通常 5-15 分钟' },
  { title: '客户端 → OSS', desc: '前端直接将文件上传到对象存储', note: '文件不经过你的服务器，节省带宽' },
  { title: 'OSS 回调通知', desc: '上传完成后 OSS 回调你的服务器确认', note: '服务器记录文件元信息到数据库' }
]

const currentSteps = computed(() => mode.value === 'proxy' ? proxySteps : directSteps)

function reset() {
  currentStep.value = -1
  playing.value = false
}

async function playFlow() {
  reset()
  playing.value = true
  for (let i = 0; i < currentSteps.value.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 800))
  }
  currentStep.value = currentSteps.value.length
  playing.value = false
}
</script>

<style scoped>
.upload-flow-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.mode-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tab {
  padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem;
}
.tab.active { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.flow-steps { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.step {
  display: flex; gap: 0.75rem; padding: 0.6rem 0.75rem; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); transition: all 0.3s;
}
.step.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.step.done { border-color: #22c55e; background: rgba(34,197,94,0.03); }
.step-num {
  width: 28px; height: 28px; border-radius: 50%; background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); display: flex; align-items: center;
  justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0;
}
.step.active .step-num { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.step.done .step-num { border-color: #22c55e; color: #22c55e; }
.step-title { font-weight: 600; font-size: 0.9rem; }
.step-desc { font-size: 0.8rem; color: var(--vp-c-text-2); }
.step-note { font-size: 0.75rem; color: var(--vp-c-text-3); font-style: italic; margin-top: 0.2rem; }
.play-btn {
  padding: 0.5rem 1.5rem; border-radius: 6px; border: none;
  background: var(--vp-c-brand); color: #fff; cursor: pointer; font-size: 0.9rem;
}
.play-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.verdict {
  margin-top: 1rem; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem;
}
.verdict.proxy { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); }
.verdict.direct { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.3); }
</style>
