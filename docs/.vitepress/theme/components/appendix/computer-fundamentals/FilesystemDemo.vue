<template>
  <div class="filesystem-demo">
    <div class="demo-header">
      <span class="icon">📁</span>
      <span class="title">文件系统：数据的"档案柜"</span>
      <span class="subtitle">操作系统如何组织和管理文件</span>
    </div>

    <div class="demo-content">
      <div class="fs-tree">
        <div class="tree-header">
          <span class="header-icon">📂</span>
          <span>目录结构</span>
        </div>
        <div class="tree-content">
          <div 
            v-for="item in fileTree" 
            :key="item.path"
            class="tree-item"
            :class="{ selected: selectedItem === item.path }"
            :style="{ paddingLeft: (item.level * 12) + 'px' }"
            @click="selectItem(item)"
          >
            <span class="item-icon">{{ item.icon }}</span>
            <span class="item-name">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <div class="fs-detail">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedItemInfo?.icon }}</span>
          <span class="detail-name">{{ selectedItemInfo?.name }}</span>
        </div>
        
        <div
          v-if="selectedItemInfo"
          class="detail-info"
        >
          <div class="info-row">
            <span class="info-label">类型</span>
            <span class="info-value">{{ selectedItemInfo.type }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">路径</span>
            <span class="info-value">{{ selectedItemInfo.path }}</span>
          </div>
          <div
            v-if="selectedItemInfo.type === '文件'"
            class="info-row"
          >
            <span class="info-label">大小</span>
            <span class="info-value">{{ selectedItemInfo.size }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">权限</span>
            <span class="info-value">{{ selectedItemInfo.permission }}</span>
          </div>
        </div>

        <div
          v-if="selectedItemInfo?.type === '文件'"
          class="inode-info"
        >
          <div class="inode-title">
            inode 信息
          </div>
          <div class="inode-visual">
            <div class="inode-block">
              <span class="inode-label">inode 编号</span>
              <span class="inode-value">{{ selectedItemInfo.inode }}</span>
            </div>
            <div class="inode-block">
              <span class="inode-label">数据块</span>
              <div class="data-blocks">
                <span
                  v-for="b in selectedItemInfo.blocks"
                  :key="b"
                  class="block"
                >{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>文件系统用"目录树"组织文件，用"inode"记录文件元数据。文件名只是给人看的，系统通过 inode 编号找到真正的数据。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedItem = ref('/home')

const fileTree = ref([
  { name: '/', path: '/', icon: '📁', level: 0, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'home', path: '/home', icon: '📁', level: 1, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'user', path: '/home/user', icon: '📁', level: 2, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'documents', path: '/home/user/documents', icon: '📁', level: 3, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'report.pdf', path: '/home/user/documents/report.pdf', icon: '📄', level: 4, type: '文件', size: '2.5MB', permission: 'rw-r--r--', inode: 12345, blocks: ['块1', '块2', '块3'] },
  { name: 'photos', path: '/home/user/photos', icon: '📁', level: 3, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'vacation.jpg', path: '/home/user/photos/vacation.jpg', icon: '🖼️', level: 4, type: '文件', size: '4.2MB', permission: 'rw-r--r--', inode: 12346, blocks: ['块4', '块5', '块6', '块7'] },
  { name: 'etc', path: '/etc', icon: '📁', level: 1, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'config.yml', path: '/etc/config.yml', icon: '⚙️', level: 2, type: '文件', size: '1.2KB', permission: 'rw-r--r--', inode: 10001, blocks: ['块8'] },
  { name: 'var', path: '/var', icon: '📁', level: 1, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'log', path: '/var/log', icon: '📁', level: 2, type: '目录', permission: 'rwxr-xr-x' },
  { name: 'system.log', path: '/var/log/system.log', icon: '📝', level: 3, type: '文件', size: '128MB', permission: 'rw-r-----', inode: 20001, blocks: ['块9', '块10', '...'] }
])

const selectedItemInfo = computed(() => {
  return fileTree.value.find(item => item.path === selectedItem.value)
})

const selectItem = (item) => {
  selectedItem.value = item.path
}
</script>

<style scoped>
.filesystem-demo {
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

.demo-content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.fs-tree {
  flex: 1;
  min-width: 250px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.tree-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-size: 0.85rem;
}

.tree-content {
  max-height: 280px;
  overflow-y: auto;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.tree-item:hover {
  background: var(--vp-c-bg-soft);
}

.tree-item.selected {
  background: var(--vp-c-brand-soft);
}

.item-icon {
  font-size: 0.9rem;
}

.fs-detail {
  flex: 1;
  min-width: 250px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-name {
  font-weight: bold;
  font-size: 1rem;
}

.detail-info {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--vp-c-text-2);
}

.info-value {
  font-weight: 500;
}

.inode-info {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.inode-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.inode-visual {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.inode-block {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
}

.inode-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.inode-value {
  font-weight: bold;
  font-size: 0.9rem;
}

.data-blocks {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.block {
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  font-size: 0.75rem;
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
