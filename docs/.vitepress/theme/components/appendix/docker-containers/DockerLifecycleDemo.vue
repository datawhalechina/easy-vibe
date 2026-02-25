<!--
  DockerLifecycleDemo.vue
  Docker 生命周期演示：镜像构建到容器运行的流程
-->
<template>
  <div class="docker-lifecycle-demo">
    <div class="header">
      <div class="title">Docker 生命周期</div>
      <div class="subtitle">点击每个阶段查看详细说明</div>
    </div>

    <div class="stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-card', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="command-block">
        <div class="cmd-label">常用命令</div>
        <div v-for="(cmd, i) in current.commands" :key="i" class="cmd-item">
          <code>{{ cmd.cmd }}</code>
          <span class="cmd-desc">{{ cmd.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('write')

const stages = [
  {
    key: 'write',
    name: '编写 Dockerfile',
    icon: '📝',
    desc: 'Dockerfile 是构建镜像的"配方"，定义了从基础镜像开始，如何一步步构建出你的应用环境。每条指令创建一个镜像层（Layer），Docker 会缓存这些层以加速后续构建。',
    commands: [
      { cmd: 'FROM node:18-alpine', desc: '指定基础镜像' },
      { cmd: 'WORKDIR /app', desc: '设置工作目录' },
      { cmd: 'COPY package*.json ./', desc: '复制依赖文件（利用缓存）' },
      { cmd: 'RUN npm install', desc: '安装依赖' },
      { cmd: 'COPY . .', desc: '复制应用代码' },
      { cmd: 'EXPOSE 3000', desc: '声明端口' },
      { cmd: 'CMD ["node", "server.js"]', desc: '启动命令' }
    ]
  },
  {
    key: 'build',
    name: '构建镜像',
    icon: '🔨',
    desc: 'docker build 命令读取 Dockerfile，逐层执行指令，最终生成一个不可变的镜像（Image）。镜像是只读的模板，包含运行应用所需的一切：代码、运行时、库、环境变量。',
    commands: [
      { cmd: 'docker build -t myapp:1.0 .', desc: '构建并打标签' },
      { cmd: 'docker images', desc: '查看本地镜像列表' },
      { cmd: 'docker image prune', desc: '清理无用镜像' }
    ]
  },
  {
    key: 'push',
    name: '推送仓库',
    icon: '☁️',
    desc: '将构建好的镜像推送到镜像仓库（Registry），如 Docker Hub、阿里云 ACR、AWS ECR。团队成员和部署环境可以从仓库拉取镜像，实现"一次构建，到处运行"。',
    commands: [
      { cmd: 'docker tag myapp:1.0 registry/myapp:1.0', desc: '给镜像打远程标签' },
      { cmd: 'docker push registry/myapp:1.0', desc: '推送到仓库' },
      { cmd: 'docker pull registry/myapp:1.0', desc: '从仓库拉取' }
    ]
  },
  {
    key: 'run',
    name: '运行容器',
    icon: '▶️',
    desc: '容器是镜像的运行实例。一个镜像可以启动多个容器，每个容器有独立的文件系统、网络和进程空间。容器是轻量级的，启动只需秒级。',
    commands: [
      { cmd: 'docker run -d -p 3000:3000 myapp:1.0', desc: '后台运行并映射端口' },
      { cmd: 'docker ps', desc: '查看运行中的容器' },
      { cmd: 'docker logs <container>', desc: '查看容器日志' },
      { cmd: 'docker exec -it <container> sh', desc: '进入容器终端' }
    ]
  },
  {
    key: 'manage',
    name: '管理容器',
    icon: '⚙️',
    desc: '容器运行后需要监控、停止、重启或删除。Docker Compose 可以管理多个容器的编排，定义服务间的依赖关系和网络。',
    commands: [
      { cmd: 'docker stop <container>', desc: '停止容器' },
      { cmd: 'docker restart <container>', desc: '重启容器' },
      { cmd: 'docker rm <container>', desc: '删除容器' },
      { cmd: 'docker compose up -d', desc: '用 Compose 启动多服务' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.docker-lifecycle-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.stages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.stage-card {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-card:hover { border-color: var(--vp-c-brand); }
.stage-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.05);
}
.stage-icon { font-size: 1.1rem; }
.stage-name { font-size: 0.8rem; font-weight: 600; }
.arrow { color: var(--vp-c-text-3); font-size: 0.9rem; margin: 0 0.1rem; }
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc { font-size: 0.82rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.command-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
}
.cmd-label { font-weight: 600; font-size: 0.78rem; margin-bottom: 0.4rem; color: var(--vp-c-text-2); }
.cmd-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.78rem;
}
.cmd-item code {
  background: var(--vp-c-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  color: var(--vp-c-brand);
}
.cmd-desc { color: var(--vp-c-text-3); }
</style>
