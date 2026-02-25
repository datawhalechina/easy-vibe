<!--
  K8sWorkloadsDemo.vue
  Kubernetes 工作负载演示：Pod、Deployment、Service 等核心资源
-->
<template>
  <div class="k8s-workloads-demo">
    <div class="header">
      <div class="title">K8s 核心资源</div>
      <div class="subtitle">点击资源类型查看说明和 YAML 示例</div>
    </div>

    <div class="resource-tabs">
      <button
        v-for="r in resources"
        :key="r.key"
        :class="['res-btn', { active: activeRes === r.key }]"
        @click="activeRes = r.key"
      >
        {{ r.name }}
      </button>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-header">
        <div class="detail-title">{{ current.name }}</div>
        <div class="detail-badge">{{ current.category }}</div>
      </div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="yaml-block">
        <div class="yaml-label">YAML 示例</div>
        <pre class="yaml-code"><code>{{ current.yaml }}</code></pre>
      </div>
      <div v-if="current.tips" class="tips">
        <span class="tip-label">要点：</span>{{ current.tips }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeRes = ref('pod')

const resources = [
  {
    key: 'pod',
    name: 'Pod',
    category: '最小调度单元',
    desc: 'Pod 是 K8s 中最小的部署单元，包含一个或多个紧密关联的容器。同一 Pod 内的容器共享网络和存储，可以通过 localhost 互相通信。',
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:1.0
      ports:
        - containerPort: 3000`,
    tips: '生产环境中很少直接创建 Pod，通常通过 Deployment 管理。'
  },
  {
    key: 'deployment',
    name: 'Deployment',
    category: '工作负载',
    desc: 'Deployment 管理 Pod 的副本数、滚动更新和回滚。你声明"我要 3 个副本运行 v1.0"，Deployment 控制器会确保始终有 3 个健康的 Pod 在运行。',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:1.0`,
    tips: '更新镜像版本后，Deployment 会自动执行滚动更新，逐步替换旧 Pod。'
  },
  {
    key: 'service',
    name: 'Service',
    category: '网络',
    desc: 'Service 为一组 Pod 提供稳定的访问入口。Pod 的 IP 会变，但 Service 的 ClusterIP 和 DNS 名称不变。它通过 label selector 找到对应的 Pod，并做负载均衡。',
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP`,
    tips: 'ClusterIP（集群内访问）、NodePort（节点端口）、LoadBalancer（云负载均衡器）是三种常用类型。'
  },
  {
    key: 'configmap',
    name: 'ConfigMap',
    category: '配置',
    desc: 'ConfigMap 存储非敏感的配置数据（如数据库地址、功能开关），可以作为环境变量或文件挂载到 Pod 中。修改 ConfigMap 后可以不重建镜像就更新配置。',
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "db.example.com"
  LOG_LEVEL: "info"`,
    tips: '敏感数据（密码、密钥）应该用 Secret 而不是 ConfigMap。'
  },
  {
    key: 'ingress',
    name: 'Ingress',
    category: '网络',
    desc: 'Ingress 管理集群的外部 HTTP/HTTPS 访问入口，支持基于域名和路径的路由规则。它是集群的"反向代理"，通常配合 Nginx Ingress Controller 使用。',
    yaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app-svc
                port:
                  number: 80`,
    tips: 'Ingress 需要 Ingress Controller 才能工作，它本身只是路由规则的声明。'
  }
]

const current = computed(() => resources.find(r => r.key === activeRes.value))
</script>

<style scoped>
.k8s-workloads-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.resource-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.res-btn {
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
.res-btn:hover { border-color: var(--vp-c-brand); }
.res-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.detail-title { font-weight: 700; font-size: 0.95rem; }
.detail-badge {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.1);
  color: var(--vp-c-brand);
  font-weight: 600;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
.yaml-block {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
}
.yaml-label {
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}
.yaml-code {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}
.tips {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: rgba(245, 158, 11, 0.08);
  border-radius: 6px;
}
.tip-label { font-weight: 600; }
</style>
