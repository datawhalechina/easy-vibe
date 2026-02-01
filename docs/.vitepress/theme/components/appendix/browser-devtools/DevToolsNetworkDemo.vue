<script setup>
import { ref, computed } from 'vue'

const requests = ref([
  { name: 'index.html', method: 'GET', status: 200, type: 'document', size: '12KB', time: 120, start: 0 },
  { name: 'style.css', method: 'GET', status: 200, type: 'stylesheet', size: '24KB', time: 80, start: 100 },
  { name: 'app.js', method: 'GET', status: 200, type: 'script', size: '150KB', time: 250, start: 120 },
  { name: 'logo.png', method: 'GET', status: 200, type: 'png', size: '45KB', time: 150, start: 200 },
  { name: 'api/user', method: 'GET', status: 200, type: 'fetch', size: '500B', time: 300, start: 350 },
  { name: 'analytics', method: 'POST', status: 204, type: 'xhr', size: '0B', time: 50, start: 600 },
  { name: 'broken-image.jpg', method: 'GET', status: 404, type: 'jpeg', size: '0B', time: 40, start: 220 }
])

const maxTime = computed(() => {
  return Math.max(...requests.value.map(r => r.start + r.time)) + 100
})

const getTimelineStyle = (req) => {
  const left = (req.start / maxTime.value) * 100
  const width = (req.time / maxTime.value) * 100
  return {
    left: `${left}%`,
    width: `${Math.max(width, 1)}%`,
    backgroundColor: req.status >= 400 ? '#f56c6c' : '#409eff'
  }
}

const selectedRequest = ref(null)
const drawerVisible = ref(false)

const showDetails = (row) => {
  selectedRequest.value = row
  drawerVisible.value = true
}

const refresh = () => {
  const original = [...requests.value]
  requests.value = []
  setTimeout(() => {
    requests.value = original.map(r => ({
        ...r,
        // Add random variation
        time: Math.floor(r.time * (0.8 + Math.random() * 0.4)),
        status: r.name.includes('broken') ? 404 : 200
    }))
  }, 300)
}

const addFailedRequest = () => {
    requests.value.push({
        name: 'api/error',
        method: 'GET',
        status: 500,
        type: 'fetch',
        size: '156B',
        time: 120,
        start: maxTime.value - 100
    })
}
</script>

<template>
  <el-card class="network-demo" shadow="hover">
    <template #header>
      <div class="header">
        <span class="title">Network (网络面板)</span>
        <div class="actions">
          <el-button type="primary" size="small" icon="Refresh" @click="refresh">刷新页面</el-button>
          <el-button type="danger" size="small" icon="Warning" @click="addFailedRequest">模拟请求失败</el-button>
        </div>
      </div>
    </template>

    <el-table 
      :data="requests" 
      style="width: 100%" 
      height="300" 
      @row-click="showDetails"
      class="network-table"
    >
      <el-table-column prop="name" label="Name" min-width="120">
          <template #default="scope">
              <span :class="{ error: scope.row.status >= 400 }">{{ scope.row.name }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="80">
        <template #default="scope">
          <el-tag :type="scope.row.status >= 400 ? 'danger' : 'success'" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type" width="90" />
      <el-table-column prop="size" label="Size" width="80" />
      <el-table-column prop="time" label="Time" width="80">
          <template #default="scope">{{ scope.row.time }}ms</template>
      </el-table-column>
      <el-table-column label="Waterfall" min-width="150">
        <template #default="scope">
          <div class="timeline-container">
            <div class="timeline-bar" :style="getTimelineStyle(scope.row)"></div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer-tip">
        💡 点击某一行可以查看请求详情
    </div>

    <!-- Detail Drawer -->
    <el-drawer
      v-model="drawerVisible"
      :title="selectedRequest ? selectedRequest.name : 'Detail'"
      direction="rtl"
      size="50%"
      :append-to-body="false"
      class="detail-drawer"
    >
      <div v-if="selectedRequest">
        <el-tabs>
          <el-tab-pane label="Headers">
            <div class="detail-section">
              <h4>General</h4>
              <p><strong>Request URL:</strong> https://example.com/{{ selectedRequest.name }}</p>
              <p><strong>Request Method:</strong> {{ selectedRequest.method }}</p>
              <p><strong>Status Code:</strong> {{ selectedRequest.status }}</p>
            </div>
            <div class="detail-section">
                <h4>Response Headers</h4>
                <p><strong>Content-Type:</strong> {{ selectedRequest.type === 'document' ? 'text/html' : selectedRequest.type === 'fetch' ? 'application/json' : 'text/plain' }}</p>
                <p><strong>Cache-Control:</strong> max-age=3600</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Preview">
            <div class="preview-box">
                <div v-if="selectedRequest.status >= 400">
                    ⚠️ Failed to load response data
                </div>
                <div v-else-if="selectedRequest.type === 'fetch' || selectedRequest.type === 'xhr'">
                    <pre>{ "id": 123, "data": "Sample API response" }</pre>
                </div>
                <div v-else-if="selectedRequest.type === 'png' || selectedRequest.type === 'jpeg'">
                    <div class="fake-image">Image Preview</div>
                </div>
                <div v-else>
                    <pre>&lt;html&gt;...&lt;/html&gt;</pre>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Response">
            <div class="response-raw">
                (Raw response data would appear here)
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </el-card>
</template>

<style scoped>
.network-demo {
  margin: 20px 0;
  position: relative; /* For drawer absolute positioning if needed, though drawer usually fixed */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-container {
  width: 100%;
  height: 16px;
  background-color: #f0f2f5;
  border-radius: 2px;
  position: relative;
}

.timeline-bar {
  position: absolute;
  height: 100%;
  border-radius: 2px;
  opacity: 0.8;
}

.error {
    color: #f56c6c;
}

.detail-section {
    margin-bottom: 20px;
}

.detail-section h4 {
    margin-bottom: 8px;
    color: #303133;
}

.detail-section p {
    margin: 4px 0;
    font-size: 13px;
    color: #606266;
    word-break: break-all;
}

.preview-box {
    background: #f5f7fa;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
}

.fake-image {
    width: 100px;
    height: 100px;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #909399;
}

.footer-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #909399;
    text-align: center;
}
</style>
