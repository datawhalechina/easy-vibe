<script setup>
import { ref } from 'vue'

const backupType = ref('full')
const isBackingUp = ref(false)
const backupProgress = ref(0)
const lastBackup = ref('2024-01-15 14:30')

const backups = ref([
  { id: 1, type: 'full', date: '2024-01-15 14:30', size: '2.3 GB', status: 'completed' },
  { id: 2, type: 'incremental', date: '2024-01-15 10:00', size: '156 MB', status: 'completed' },
  { id: 3, type: 'full', date: '2024-01-14 14:30', size: '2.2 GB', status: 'completed' }
])

const backupTypes = [
  { id: 'full', name: '全量备份', desc: '备份所有数据，像拍整套照片', icon: '📸' },
  { id: 'incremental', name: '增量备份', desc: '只备份新增/修改的部分', icon: '📝' },
  { id: 'differential', name: '差异备份', desc: '备份自上次全量后的变化', icon: '🔄' }
]

const startBackup = () => {
  isBackingUp.value = true
  backupProgress.value = 0

  const interval = setInterval(() => {
    backupProgress.value += 5
    if (backupProgress.value >= 100) {
      clearInterval(interval)
      isBackingUp.value = false
      lastBackup.value = new Date().toLocaleString()

      backups.value.unshift({
        id: Date.now(),
        type: backupType.value,
        date: lastBackup.value,
        size: backupType.value === 'full' ? '2.4 GB' : '180 MB',
        status: 'completed'
      })
    }
  }, 200)
}
</script>

<template>
  <div class="deployment-backup">
    <div class="demo-header">
      <h3>备份演示</h3>
      <p class="subtitle">数据安全就像保险柜</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明每天<strong>记账</strong>、<strong>保留发票</strong>，定期<strong>盘点库存</strong>，
        数据备份是防止数据丢失的最后一道防线。服务器故障、人为误操作都可能丢失数据！
      </p>
    </div>

    <div class="demo-content">
      <!-- 备份类型选择 -->
      <div class="backup-type-section">
        <div class="section-title">💾 选择备份类型</div>
        <div class="type-cards">
          <div
            v-for="type in backupTypes"
            :key="type.id"
            class="type-card"
            :class="{ active: backupType === type.id }"
            @click="backupType = type.id"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-name">{{ type.name }}</span>
            <span class="type-desc">{{ type.desc }}</span>
          </div>
        </div>
      </div>

      <!-- 备份操作 -->
      <div class="backup-action">
        <div class="action-info">
          <div class="info-row">
            <span class="info-label">上次备份</span>
            <span class="info-value">{{ lastBackup }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">备份总数</span>
            <span class="info-value">{{ backups.length }} 份</span>
          </div>
        </div>

        <button
          v-if="!isBackingUp"
          @click="startBackup"
          class="btn primary"
        >
          🚀 开始备份
        </button>
        <button v-else class="btn" disabled>
          ⏳ 备份中...
        </button>
      </div>

      <!-- 备份进度 -->
      <div v-if="isBackingUp" class="backup-progress">
        <div class="progress-header">
          <span class="progress-label">正在备份...</span>
          <span class="progress-percent">{{ backupProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${backupProgress}%` }"
          ></div>
        </div>
      </div>

      <!-- 备份历史 -->
      <div class="backup-history">
        <div class="section-title">📜 备份历史</div>
        <div class="history-list">
          <div
            v-for="backup in backups"
            :key="backup.id"
            class="history-item"
          >
            <div class="backup-icon">
              {{ backup.type === 'full' ? '📦' : '📄' }}
            </div>
            <div class="backup-info">
              <div class="backup-type">
                {{ backup.type === 'full' ? '全量备份' : backup.type === 'incremental' ? '增量备份' : '差异备份' }}
              </div>
              <div class="backup-date">{{ backup.date }}</div>
            </div>
            <div class="backup-meta">
              <div class="backup-size">{{ backup.size }}</div>
              <div class="backup-status">
                <span class="status-dot completed"></span>
                <span class="status-text">成功</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 备份策略 -->
      <div class="backup-strategy">
        <div class="strategy-title">🎯 推荐备份策略 (3-2-1 原则)</div>
        <div class="strategy-content">
          <div class="strategy-item">
            <div class="strategy-number">3</div>
            <div class="strategy-desc">至少保留 <strong>3 份</strong>备份</div>
          </div>
          <div class="strategy-item">
            <div class="strategy-number">2</div>
            <div class="strategy-desc">使用 <strong>2 种</strong>不同存储介质</div>
          </div>
          <div class="strategy-item">
            <div class="strategy-number">1</div>
            <div class="strategy-desc"><strong>1 份</strong>异地备份</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>小明教训</strong>：曾经因系统崩溃丢了所有销售数据，现在每天自动备份！
        <strong>备份不是是否需要的问题，而是何时需要的问题。</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-backup {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.backup-type-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.type-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.type-card:hover {
  border-color: var(--vp-c-brand-soft);
}

.type-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 1.5rem;
}

.type-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.type-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.backup-action {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.action-info {
  display: flex;
  gap: 1.5rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.info-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn.primary:hover {
  background: var(--vp-c-brand-1);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.backup-progress {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.progress-percent {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.progress-bar {
  height: 10px;
  background: var(--vp-c-bg-alt);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  transition: width 0.3s ease;
}

.backup-history {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.backup-icon {
  font-size: 1.5rem;
}

.backup-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.backup-type {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.backup-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.backup-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.backup-size {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
}

.backup-status {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.completed {
  background: var(--vp-c-brand-delta);
}

.backup-strategy {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand);
}

.strategy-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.strategy-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.strategy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
}

.strategy-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
}

.strategy-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .backup-action {
    flex-direction: column;
  }

  .type-cards {
    grid-template-columns: 1fr;
  }
}
</style>
