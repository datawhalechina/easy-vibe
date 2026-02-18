<template>
  <div class="best-practices-demo">
    <div class="demo-header">
      <span class="icon">✅</span>
      <span class="title">权限管理最佳实践</span>
      <span class="subtitle">按优先级实施安全措施</span>
    </div>

    <div class="practices-list">
      <div
        v-for="(practice, index) in bestPractices"
        :key="index"
        class="practice-item"
        :class="{ active: expandedCard === index }"
        @click="toggleCard(index)"
      >
        <div class="item-header">
          <span class="item-icon">{{ practice.icon }}</span>
          <span class="item-title">{{ practice.title }}</span>
          <span
            class="item-priority"
            :class="practice.priority"
          >{{ practice.priorityText }}</span>
        </div>
        <div
          v-if="expandedCard === index"
          class="item-body"
        >
          <p class="item-desc">
            {{ practice.description }}
          </p>
          <div class="item-checks">
            <span
              v-for="(item, i) in practice.checklist.slice(0, 3)"
              :key="i"
              class="check-tag"
            >✓ {{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>按照优先级从 P0 开始逐步实施。每个改进都能显著提升账号安全性。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedCard = ref(0)

const bestPractices = [
  {
    icon: '👑',
    title: '根账号保护',
    priority: 'p0',
    priorityText: 'P0',
    description: '根账号是云服务的所有者，必须实施最高级别的保护。',
    checklist: ['启用 MFA', '创建 IAM 管理员用户', '删除根账号访问密钥']
  },
  {
    icon: '👤',
    title: '用户权限最小化',
    priority: 'p0',
    priorityText: 'P0',
    description: '遵循最小权限原则，只授予用户完成工作所需的最低权限。',
    checklist: ['避免全权限策略', '使用用户组管理', '定期审查用户']
  },
  {
    icon: '🎭',
    title: '优先使用 IAM 角色',
    priority: 'p1',
    priorityText: 'P1',
    description: 'IAM 角色没有长期凭证，通过临时凭证访问，降低泄露风险。',
    checklist: ['EC2 使用实例角色', 'Lambda 使用执行角色', '跨账号用 AssumeRole']
  },
  {
    icon: '🔑',
    title: '访问密钥安全管理',
    priority: 'p1',
    priorityText: 'P1',
    description: '如果必须使用 AK/SK，需要实施严格的安全管理措施。',
    checklist: ['不硬编码凭证', '使用密钥管理服务', '定期轮换密钥']
  },
  {
    icon: '📊',
    title: '监控与审计',
    priority: 'p2',
    priorityText: 'P2',
    description: '建立全面的监控和审计机制，及时发现安全事件。',
    checklist: ['启用 CloudTrail', '配置关键操作告警', '定期审查权限']
  }
]

function toggleCard(index) {
  expandedCard.value = expandedCard.value === index ? null : index
}
</script>

<style scoped>
.best-practices-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0.5rem 0;
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

.practices-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.practice-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.practice-item:hover { border-color: var(--vp-c-brand); }
.practice-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
}

.item-icon { font-size: 1rem; }
.item-title { font-weight: 600; font-size: 0.85rem; flex: 1; }

.item-priority {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.item-priority.p0 { background: var(--vp-c-danger); color: #fff; }
.item-priority.p1 { background: var(--vp-c-warning); color: #fff; }
.item-priority.p2 { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }

.item-body {
  padding: 0 0.6rem 0.6rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 0;
  padding-top: 0.5rem;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.item-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.check-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
.info-box strong { color: var(--vp-c-text-1); }
</style>
