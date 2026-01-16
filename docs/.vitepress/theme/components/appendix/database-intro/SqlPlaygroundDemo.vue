<script setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 101, name: '张三', score: 100 },
  { id: 102, name: '李四', score: 85 },
  { id: 103, name: '王五', score: 120 },
  { id: 104, name: '赵六', score: 90 }
])

const commands = [
  {
    label: '查询所有用户',
    sql: 'SELECT * FROM users;',
    action: 'read_all'
  },
  {
    label: '查询分数 > 90',
    sql: 'SELECT * FROM users WHERE score > 90;',
    action: 'read_filter'
  },
  {
    label: '给张三加 10 分',
    sql: 'UPDATE users SET score = score + 10 WHERE name = "张三";',
    action: 'update_add'
  }
]

const currentSql = ref('')
const terminalOutput = ref([])
const displayedUsers = ref([...users.value])
const isAnimating = ref(false)

const execute = async (cmd) => {
  if (isAnimating.value) return
  isAnimating.value = true
  currentSql.value = cmd.sql

  // Reset display for read operations
  if (cmd.action.startsWith('read')) {
    displayedUsers.value = [] // clear first
    await new Promise((r) => setTimeout(r, 300))
  }

  terminalOutput.value.push({ type: 'cmd', text: `> ${cmd.sql}` })

  await new Promise((r) => setTimeout(r, 500))

  if (cmd.action === 'read_all') {
    displayedUsers.value = [...users.value]
    terminalOutput.value.push({
      type: 'result',
      text: `Returned ${users.value.length} rows.`
    })
  } else if (cmd.action === 'read_filter') {
    displayedUsers.value = users.value.filter((u) => u.score > 90)
    terminalOutput.value.push({
      type: 'result',
      text: `Returned ${displayedUsers.value.length} rows.`
    })
  } else if (cmd.action === 'update_add') {
    const target = users.value.find((u) => u.name === '张三')
    if (target) {
      target.score += 10
      displayedUsers.value = [...users.value] // refresh display
      terminalOutput.value.push({ type: 'success', text: `Updated 1 row.` })
    }
  }

  // Scroll terminal to bottom
  setTimeout(() => {
    const term = document.querySelector('.sql-terminal-body')
    if (term) term.scrollTop = term.scrollHeight
  }, 100)

  isAnimating.value = false
}
</script>

<template>
  <div class="sql-playground">
    <div class="left-panel">
      <div class="panel-header">数据库表: users</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in displayedUsers" :key="u.id" class="fade-in">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>
                <span
                  :class="{ 'score-up': u.name === '张三' && u.score > 100 }"
                  >{{ u.score }}</span
                >
              </td>
            </tr>
            <tr v-if="displayedUsers.length === 0">
              <td colspan="3" class="empty-hint">（无数据或正在查询...）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="right-panel">
      <div class="panel-header">SQL 终端</div>
      <div class="sql-terminal-body">
        <div v-for="(line, i) in terminalOutput" :key="i" :class="line.type">
          {{ line.text }}
        </div>
        <div class="cursor-line">_</div>
      </div>

      <div class="actions">
        <div class="action-label">常用指令:</div>
        <div class="btn-group">
          <button
            v-for="cmd in commands"
            :key="cmd.label"
            @click="execute(cmd)"
            :disabled="isAnimating"
            class="cmd-btn"
          >
            {{ cmd.label }}
          </button>
        </div>
        <div class="current-sql" v-if="currentSql">
          执行中: <code>{{ currentSql }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sql-playground {
  display: flex;
  border: 1px solid #333;
  border-radius: 8px;
  background: #1e1e1e;
  color: #ccc;
  font-family: 'Consolas', monospace;
  overflow: hidden;
  min-height: 350px;
}
.left-panel {
  flex: 1;
  border-right: 1px solid #444;
  display: flex;
  flex-direction: column;
}
.right-panel {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  background: #252526;
}
.panel-header {
  background: #333;
  padding: 8px 15px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  border-bottom: 1px solid #444;
}

.table-container {
  padding: 15px;
  flex: 1;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th,
td {
  border: 1px solid #444;
  padding: 6px 10px;
  text-align: left;
}
th {
  color: #569cd6;
}
td {
  color: #ce9178;
}
td:first-child {
  color: #b5cea8;
} /* id color */

.sql-terminal-body {
  flex: 1;
  padding: 15px;
  font-size: 13px;
  overflow-y: auto;
  max-height: 200px;
}
.cmd {
  color: #fff;
  margin-top: 5px;
}
.result {
  color: #aaa;
  margin-bottom: 5px;
}
.success {
  color: #67c23a;
  margin-bottom: 5px;
}
.cursor-line {
  animation: blink 1s infinite;
}

.actions {
  padding: 15px;
  background: #2d2d2d;
  border-top: 1px solid #444;
}
.action-label {
  font-size: 12px;
  margin-bottom: 8px;
  color: #999;
}
.btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cmd-btn {
  background: #0e639c;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}
.cmd-btn:hover {
  background: #1177bb;
}
.cmd-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-sql {
  margin-top: 10px;
  font-size: 12px;
  color: #888;
}
.current-sql code {
  color: #dcdcaa;
  background: transparent;
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.score-up {
  color: #67c23a;
  font-weight: bold;
  animation: pulse 0.5s;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
.empty-hint {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
  border: none;
}
</style>
