<!--
  DistributedChallengesDemo.vue
  分布式系统常见挑战交互演示
-->
<template>
  <div class="challenges-demo">
    <div class="header">
      <div class="title">分布式系统八大挑战</div>
      <div class="subtitle">点击查看每个挑战的详情和应对策略</div>
    </div>

    <div class="challenge-grid">
      <div
        v-for="c in challenges"
        :key="c.key"
        :class="['challenge-card', { active: activeChallenge === c.key }]"
        @click="activeChallenge = activeChallenge === c.key ? null : c.key"
      >
        <div class="challenge-icon">{{ c.icon }}</div>
        <div class="challenge-name">{{ c.name }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.icon }} {{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="detail-scenario">
        <span class="label">场景举例：</span>{{ current.scenario }}
      </div>
      <div class="detail-solution">
        <span class="label">应对策略：</span>
        <ul class="solution-list">
          <li v-for="(s, i) in current.solutions" :key="i">{{ s }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeChallenge = ref('network')

const challenges = [
  {
    key: 'network',
    name: '网络不可靠',
    icon: '🔌',
    desc: '分布式系统的节点通过网络通信，而网络随时可能丢包、延迟、断开。这是分布式系统最根本的挑战——你永远不能假设网络是可靠的。',
    scenario: '服务 A 调用服务 B，请求发出后 3 秒没收到响应。是 B 没收到？还是 B 处理了但响应丢了？A 无法区分。',
    solutions: [
      '超时 + 重试：设置合理超时，失败后重试（需保证幂等性）',
      '心跳检测：定期发送心跳包检测连接是否存活',
      '断路器模式：连续失败后暂停调用，避免雪崩'
    ]
  },
  {
    key: 'clock',
    name: '时钟不同步',
    icon: '⏰',
    desc: '每台机器的物理时钟都有微小偏差（时钟漂移），即使用 NTP 同步也只能精确到毫秒级。在分布式系统中，你不能依赖物理时钟来判断事件的先后顺序。',
    scenario: '节点 A 在 10:00:00.001 写入数据，节点 B 在 10:00:00.002 写入数据。但 B 的时钟快了 5ms，实际上 B 先写的。',
    solutions: [
      '逻辑时钟（Lamport Clock）：用递增计数器代替物理时钟',
      '向量时钟（Vector Clock）：每个节点维护一个向量，追踪因果关系',
      'TrueTime（Google Spanner）：用 GPS + 原子钟提供有界误差的时间'
    ]
  },
  {
    key: 'partition',
    name: '网络分区',
    icon: '✂️',
    desc: '网络分区是指部分节点之间无法通信，但各自仍在运行。这时系统必须在一致性和可用性之间做选择（CAP 定理）。',
    scenario: '数据中心 A 和 B 之间的光纤被挖断，两边的服务各自运行，但数据开始分叉。',
    solutions: [
      'CP 策略：分区时拒绝写入，保证一致性（如 ZooKeeper）',
      'AP 策略：分区时允许写入，事后合并冲突（如 DynamoDB）',
      '多数派写入：只要多数节点确认就算成功'
    ]
  },
  {
    key: 'consistency',
    name: '数据一致性',
    icon: '🔄',
    desc: '多个副本之间如何保持数据一致？强一致性性能差，最终一致性可能读到旧数据。没有银弹，只有权衡。',
    scenario: '用户在节点 A 修改了头像，但刷新页面时请求被路由到节点 B，看到的还是旧头像。',
    solutions: [
      '读写同一节点：写入后的读请求路由到同一节点',
      '读修复（Read Repair）：读取时检测不一致并修复',
      '反熵协议：后台定期比对副本，修复差异'
    ]
  },
  {
    key: 'failure',
    name: '部分失败',
    icon: '💥',
    desc: '分布式系统中，部分节点可能失败而其他节点正常运行。系统需要在部分失败的情况下继续提供服务。',
    scenario: '5 个节点的集群中有 2 个节点宕机，系统需要判断：是继续服务还是停止？剩余节点的数据是否完整？',
    solutions: [
      '冗余副本：数据存多份，单点故障不影响可用性',
      '故障检测：通过心跳和超时机制快速发现故障节点',
      '自动故障转移：检测到主节点故障后自动切换到备节点'
    ]
  },
  {
    key: 'split-brain',
    name: '脑裂问题',
    icon: '🧠',
    desc: '当网络分区导致集群分成两部分时，两边都认为自己是"主"，各自接受写入，导致数据冲突。这就是脑裂。',
    scenario: '主从架构中，主节点和从节点之间网络断开，从节点以为主节点挂了，自己升级为主。现在有两个主节点同时写入。',
    solutions: [
      '多数派选举：只有获得多数票的节点才能成为主节点',
      'Fencing Token：旧主节点的写入请求会被存储层拒绝',
      '仲裁节点：引入第三方节点来裁决谁是真正的主'
    ]
  },
  {
    key: 'ordering',
    name: '事件排序',
    icon: '📋',
    desc: '在分布式系统中，不同节点上发生的事件没有全局统一的顺序。如何确定"谁先谁后"是一个根本性难题。',
    scenario: '两个用户同时编辑同一个文档，节点 A 收到"删除第 3 行"，节点 B 收到"修改第 3 行"。最终结果取决于执行顺序。',
    solutions: [
      '全序广播（Total Order Broadcast）：所有节点以相同顺序处理消息',
      'CRDT（无冲突复制数据类型）：数据结构本身保证合并无冲突',
      'OT（操作转换）：Google Docs 使用的协作编辑算法'
    ]
  },
  {
    key: 'transaction',
    name: '分布式事务',
    icon: '🔐',
    desc: '跨多个节点的操作如何保证原子性？要么全部成功，要么全部回滚。这比单机事务复杂得多。',
    scenario: '电商下单：扣库存在服务 A，扣余额在服务 B，创建订单在服务 C。如果扣余额失败，库存需要回滚。',
    solutions: [
      '2PC（两阶段提交）：协调者先问所有参与者能否提交，再统一提交',
      'Saga 模式：每个步骤有对应的补偿操作，失败时逐步回滚',
      'TCC（Try-Confirm-Cancel）：预留资源 → 确认 → 取消'
    ]
  }
]

const current = computed(() =>
  challenges.find(c => c.key === activeChallenge.value)
)
</script>

<style scoped>
.challenges-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.challenge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 0.4rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.challenge-card:hover { border-color: var(--vp-c-brand); }
.challenge-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.challenge-icon { font-size: 1.3rem; }
.challenge-name { font-size: 0.75rem; font-weight: 600; text-align: center; }
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
}
.detail-scenario {
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(245, 158, 11, 0.06);
  border-radius: 6px;
}
.detail-solution { font-size: 0.82rem; }
.solution-list {
  margin: 0.3rem 0 0 1.2rem;
  padding: 0;
}
.solution-list li {
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
