<!--
  LinuxCommandDemo.vue
  Linux 常用命令分类演示
-->
<template>
  <div class="linux-cmd-demo">
    <div class="header">
      <div class="title">Linux 命令速查</div>
      <div class="subtitle">按分类查看常用命令及示例</div>
    </div>

    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['cat-btn', { active: activeCat === cat.key }]"
        @click="activeCat = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <div v-if="current" class="cmd-list">
      <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-card">
        <div class="cmd-header">
          <code class="cmd-name">{{ cmd.name }}</code>
          <span class="cmd-brief">{{ cmd.brief }}</span>
        </div>
        <div class="cmd-example">
          <code>{{ cmd.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCat = ref('file')

const categories = [
  {
    key: 'file',
    label: '文件操作',
    commands: [
      { name: 'ls', brief: '列出文件和目录', example: 'ls -la /home' },
      { name: 'cd', brief: '切换目录', example: 'cd /var/log' },
      { name: 'cp', brief: '复制文件', example: 'cp -r src/ backup/' },
      { name: 'mv', brief: '移动/重命名', example: 'mv old.txt new.txt' },
      { name: 'rm', brief: '删除文件', example: 'rm -rf dist/' },
      { name: 'mkdir', brief: '创建目录', example: 'mkdir -p src/components' },
      { name: 'find', brief: '查找文件', example: 'find . -name "*.js" -type f' }
    ]
  },
  {
    key: 'text',
    label: '文本处理',
    commands: [
      { name: 'cat', brief: '查看文件内容', example: 'cat config.json' },
      { name: 'grep', brief: '搜索文本', example: 'grep -rn "ERROR" /var/log/' },
      { name: 'head/tail', brief: '查看文件头/尾', example: 'tail -f app.log' },
      { name: 'awk', brief: '文本列处理', example: "awk '{print $1, $3}' data.txt" },
      { name: 'sed', brief: '流式文本替换', example: "sed -i 's/old/new/g' file.txt" },
      { name: 'wc', brief: '统计行/词/字符数', example: 'wc -l *.js' },
      { name: 'sort | uniq', brief: '排序去重', example: 'sort data.txt | uniq -c' }
    ]
  },
  {
    key: 'process',
    label: '进程管理',
    commands: [
      { name: 'ps', brief: '查看进程', example: 'ps aux | grep node' },
      { name: 'top/htop', brief: '实时监控', example: 'top -o %CPU' },
      { name: 'kill', brief: '终止进程', example: 'kill -9 12345' },
      { name: 'nohup', brief: '后台运行', example: 'nohup node app.js &' },
      { name: 'lsof', brief: '查看打开的文件', example: 'lsof -i :3000' },
      { name: 'systemctl', brief: '管理系统服务', example: 'systemctl restart nginx' }
    ]
  },
  {
    key: 'network',
    label: '网络工具',
    commands: [
      { name: 'curl', brief: '发送 HTTP 请求', example: 'curl -X POST -d "data" url' },
      { name: 'ping', brief: '测试连通性', example: 'ping -c 4 google.com' },
      { name: 'ss/netstat', brief: '查看网络连接', example: 'ss -tlnp' },
      { name: 'dig', brief: 'DNS 查询', example: 'dig example.com' },
      { name: 'ssh', brief: '远程登录', example: 'ssh user@server -p 22' },
      { name: 'scp', brief: '远程复制文件', example: 'scp file.txt user@server:/tmp/' }
    ]
  }
]

const current = computed(() => categories.find(c => c.key === activeCat.value))
</script>

<style scoped>
.linux-cmd-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.cat-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.cat-btn:hover { border-color: var(--vp-c-brand); }
.cat-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.cmd-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
}
.cmd-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.cmd-name {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
.cmd-brief {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.cmd-example code {
  font-size: 0.73rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}
</style>
