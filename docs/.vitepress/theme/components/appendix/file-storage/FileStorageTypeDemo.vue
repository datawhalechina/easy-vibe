<!--
  StorageTypeDemo.vue (file-storage)
  文件存储类型对比演示
-->
<template>
  <div class="storage-type-demo">
    <div class="header">
      <div class="title">存储类型对比</div>
      <div class="subtitle">点击查看不同存储方式的特点</div>
    </div>

    <div class="type-cards">
      <div
        v-for="t in types"
        :key="t.key"
        :class="['type-card', { active: selected === t.key }]"
        @click="selected = t.key"
      >
        <div class="type-icon">{{ t.icon }}</div>
        <div class="type-name">{{ t.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-grid">
        <div class="detail-item">
          <div class="item-label">访问方式</div>
          <div class="item-value">{{ current.access }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">典型场景</div>
          <div class="item-value">{{ current.scenario }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">代表产品</div>
          <div class="item-value">{{ current.products }}</div>
        </div>
        <div class="detail-item">
          <div class="item-label">扩展性</div>
          <div class="item-value">{{ current.scalability }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('object')

const types = [
  {
    key: 'block', icon: '🧱', name: '块存储',
    desc: '将数据切分为固定大小的"块"，像硬盘一样提供原始存储空间。操作系统可以在上面创建文件系统。性能最高，但不能直接通过网络共享。',
    access: 'iSCSI / FC 协议，挂载为磁盘设备',
    scenario: '数据库存储、虚拟机磁盘',
    products: 'AWS EBS、阿里云云盘、Ceph RBD',
    scalability: '单卷有容量上限，需要手动扩容'
  },
  {
    key: 'file', icon: '📁', name: '文件存储',
    desc: '提供传统的文件系统接口（目录 + 文件），支持多台服务器同时挂载和读写。就像一个网络共享文件夹。',
    access: 'NFS / SMB / CIFS 协议，挂载为目录',
    scenario: '共享配置文件、CMS 媒体文件、日志收集',
    products: 'AWS EFS、阿里云 NAS、NFS Server',
    scalability: '容量可弹性伸缩，但性能受限于协议开销'
  },
  {
    key: 'object', icon: '☁️', name: '对象存储',
    desc: '通过 HTTP API 存取文件（对象），每个对象有唯一 Key。扁平结构，无目录层级。容量几乎无限，成本最低，是互联网应用的首选。',
    access: 'HTTP/HTTPS RESTful API（PUT/GET/DELETE）',
    scenario: '图片、视频、备份、静态网站托管、数据湖',
    products: 'AWS S3、阿里云 OSS、MinIO、Cloudflare R2',
    scalability: '近乎无限扩展，自动分布式存储'
  }
]

const current = computed(() => types.find(t => t.key === selected.value))
</script>

<style scoped>
.storage-type-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.type-cards { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
.type-card {
  flex: 1; padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center; transition: all 0.2s;
}
.type-card:hover { border-color: var(--vp-c-brand); }
.type-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.type-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.type-name { font-weight: 700; font-size: 0.95rem; }
.detail {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 1rem; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.detail-item { padding: 0.5rem 0.75rem; background: var(--vp-c-bg-soft); border-radius: 6px; }
.item-label { font-weight: 600; font-size: 0.8rem; color: var(--vp-c-text-3); margin-bottom: 0.25rem; }
.item-value { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.5; }
@media (max-width: 640px) {
  .type-cards { flex-direction: column; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
