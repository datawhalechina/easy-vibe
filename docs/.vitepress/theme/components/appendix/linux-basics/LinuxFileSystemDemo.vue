<!--
  LinuxFileSystemDemo.vue
  Linux 文件系统层级演示
-->
<template>
  <div class="linux-fs-demo">
    <div class="header">
      <div class="title">Linux 文件系统层级</div>
      <div class="subtitle">点击目录查看用途说明</div>
    </div>

    <div class="tree">
      <div
        v-for="dir in dirs"
        :key="dir.path"
        :class="['dir-item', { active: activeDir === dir.path }]"
        @click="activeDir = dir.path"
      >
        <span class="dir-icon">{{ dir.icon }}</span>
        <span class="dir-path">{{ dir.path }}</span>
        <span class="dir-brief">{{ dir.brief }}</span>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.path }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div v-if="current.examples.length" class="examples">
        <div class="ex-label">常见内容：</div>
        <div class="ex-list">
          <span v-for="(ex, i) in current.examples" :key="i" class="ex-tag">{{ ex }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDir = ref('/')

const dirs = [
  { path: '/', icon: '📁', brief: '根目录', desc: '整个文件系统的起点，所有目录和文件都从这里开始。Linux 中一切皆文件，所有设备、进程信息都以文件形式存在于这棵目录树中。', examples: [] },
  { path: '/bin', icon: '⚙️', brief: '基础命令', desc: '存放系统启动和单用户模式下必需的基础命令二进制文件。这些命令所有用户都可以使用。', examples: ['ls', 'cp', 'mv', 'cat', 'grep', 'chmod'] },
  { path: '/etc', icon: '📋', brief: '配置文件', desc: '存放系统和应用的配置文件。几乎所有软件的配置都在这里，修改配置是 Linux 运维的日常。', examples: ['nginx.conf', 'hosts', 'passwd', 'ssh/sshd_config', 'crontab'] },
  { path: '/home', icon: '🏠', brief: '用户目录', desc: '普通用户的家目录。每个用户在这里有一个以用户名命名的子目录，存放个人文件和配置。', examples: ['/home/alice', '/home/bob', '~/.bashrc', '~/.ssh/'] },
  { path: '/var', icon: '📊', brief: '可变数据', desc: '存放运行时会变化的数据：日志、缓存、邮件、数据库文件等。排查问题时经常需要查看这里的日志。', examples: ['/var/log/', '/var/cache/', '/var/lib/mysql/', '/var/www/'] },
  { path: '/tmp', icon: '🗑️', brief: '临时文件', desc: '存放临时文件，系统重启后通常会被清空。所有用户都有写权限，适合存放不需要持久化的中间文件。', examples: ['编译中间文件', '下载缓存', '会话临时数据'] },
  { path: '/usr', icon: '📦', brief: '用户程序', desc: '存放用户安装的程序、库和文档。可以理解为 "Unix System Resources"，是最大的目录之一。', examples: ['/usr/bin/', '/usr/lib/', '/usr/local/', '/usr/share/'] },
  { path: '/proc', icon: '🔍', brief: '进程信息', desc: '虚拟文件系统，不占磁盘空间。内核将进程和系统信息以文件形式暴露在这里，是监控和调试的重要数据源。', examples: ['/proc/cpuinfo', '/proc/meminfo', '/proc/[pid]/status'] },
  { path: '/dev', icon: '🔌', brief: '设备文件', desc: '存放设备文件。Linux 中硬件设备也是文件，通过读写这些文件与硬件交互。', examples: ['/dev/sda', '/dev/null', '/dev/zero', '/dev/tty'] }
]

const current = computed(() => dirs.find(d => d.path === activeDir.value))
</script>

<style scoped>
.linux-fs-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.tree {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.dir-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 0.82rem;
}
.dir-item:hover { border-color: var(--vp-c-divider); }
.dir-item.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.dir-icon { font-size: 0.9rem; }
.dir-path { font-weight: 700; font-family: var(--vp-font-family-mono); min-width: 60px; }
.dir-brief { color: var(--vp-c-text-3); font-size: 0.78rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  font-family: var(--vp-font-family-mono);
  margin-bottom: 0.4rem;
}
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.5rem; line-height: 1.6; }
.examples { margin-top: 0.4rem; }
.ex-label { font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 0.3rem; }
.ex-list { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.ex-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}
</style>
