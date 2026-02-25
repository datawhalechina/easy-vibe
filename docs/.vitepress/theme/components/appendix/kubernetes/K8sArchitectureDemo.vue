<!--
  K8sArchitectureDemo.vue
  Kubernetes 架构演示：控制平面与工作节点
-->
<template>
  <div class="k8s-arch-demo">
    <div class="header">
      <div class="title">Kubernetes 架构</div>
      <div class="subtitle">点击组件查看详细说明</div>
    </div>

    <div class="arch-layout">
      <div class="plane control-plane">
        <div class="plane-title">控制平面（Control Plane）</div>
        <div class="components">
          <div
            v-for="c in controlPlane"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>

      <div class="plane worker-plane">
        <div class="plane-title">工作节点（Worker Node）× N</div>
        <div class="components">
          <div
            v-for="c in workerNode"
            :key="c.key"
            :class="['comp-card', { active: active === c.key }]"
            @click="active = c.key"
          >
            <div class="comp-name">{{ c.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-analogy">
        <span class="label">类比：</span>{{ current.analogy }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('api-server')

const controlPlane = [
  {
    key: 'api-server',
    name: 'API Server',
    desc: 'Kubernetes 的"前门"，所有操作（kubectl、Dashboard、内部组件）都通过 API Server 进行。它负责认证、授权、准入控制，是集群的唯一入口。',
    analogy: '公司前台，所有访客和快递都要经过前台登记'
  },
  {
    key: 'etcd',
    name: 'etcd',
    desc: '分布式键值存储，保存集群的所有状态数据：Pod 信息、Service 配置、Secret 等。它是集群的"记忆"，丢失 etcd 数据等于丢失整个集群。',
    analogy: '公司的档案室，记录所有员工信息和规章制度'
  },
  {
    key: 'scheduler',
    name: 'Scheduler',
    desc: '负责将新创建的 Pod 分配到合适的节点上。它会考虑资源需求、亲和性规则、污点容忍等因素，做出最优调度决策。',
    analogy: 'HR 部门，根据岗位需求把新员工分配到合适的部门'
  },
  {
    key: 'controller',
    name: 'Controller Manager',
    desc: '运行各种控制器（Deployment、ReplicaSet、Job 等），持续监控集群状态，确保实际状态与期望状态一致。如果 Pod 挂了，控制器会自动重建。',
    analogy: '各部门经理，确保每个部门的人员配置符合编制要求'
  }
]

const workerNode = [
  {
    key: 'kubelet',
    name: 'kubelet',
    desc: '每个节点上的"代理人"，负责管理本节点上的 Pod 生命周期。它接收 API Server 的指令，调用容器运行时创建/销毁容器，并上报节点状态。',
    analogy: '每个工位上的组长，负责管理组员的日常工作'
  },
  {
    key: 'kube-proxy',
    name: 'kube-proxy',
    desc: '负责实现 Service 的网络规则，将访问 Service 的流量转发到对应的 Pod。它维护节点上的 iptables/IPVS 规则，实现负载均衡。',
    analogy: '公司的电话总机，把外部来电转接到正确的分机'
  },
  {
    key: 'runtime',
    name: '容器运行时',
    desc: '实际运行容器的组件，如 containerd、CRI-O。kubelet 通过 CRI（容器运行时接口）与它交互，它负责拉取镜像、创建和管理容器。',
    analogy: '实际干活的工人，按照指令完成具体的生产任务'
  }
]

const allComponents = [...controlPlane, ...workerNode]
const current = computed(() => allComponents.find(c => c.key === active.value))
</script>

<style scoped>
.k8s-arch-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.arch-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .arch-layout { grid-template-columns: 1fr; }
}
.plane {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}
.control-plane { background: rgba(59, 130, 246, 0.06); }
.worker-plane { background: rgba(34, 197, 94, 0.06); }
.plane-title {
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}
.components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.comp-card {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all 0.2s;
}
.comp-card:hover { border-color: var(--vp-c-brand); }
.comp-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  color: var(--vp-c-brand);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem; }
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.detail-analogy {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
