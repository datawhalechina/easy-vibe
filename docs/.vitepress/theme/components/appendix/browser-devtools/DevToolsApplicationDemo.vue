<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('local')

const storageData = reactive({
  local: [
    { key: 'theme', value: 'dark' },
    { key: 'user_id', value: '10086' },
    { key: 'is_first_visit', value: 'false' }
  ],
  session: [
    { key: 'current_step', value: '2' },
    { key: 'temp_token', value: 'abc-123-xyz' }
  ],
  cookies: [
    { key: 'session_id', value: 's%3A123456...', domain: 'example.com', expires: 'Session' },
    { key: 'ga_id', value: 'GA1.2.345...', domain: '.example.com', expires: '2025-12-31' }
  ]
})

const newEntry = reactive({ key: '', value: '' })

const addEntry = () => {
  if (!newEntry.key || !newEntry.value) {
    ElMessage.warning('Key and Value are required')
    return
  }
  
  // Check duplicate
  const list = storageData[activeTab.value]
  if (list.some(item => item.key === newEntry.key)) {
      ElMessage.error(`Key "${newEntry.key}" already exists!`)
      return
  }

  const item = { key: newEntry.key, value: newEntry.value }
  if (activeTab.value === 'cookies') {
      item.domain = 'example.com'
      item.expires = 'Session'
  }
  
  list.push(item)
  newEntry.key = ''
  newEntry.value = ''
  ElMessage.success('Added successfully')
}

const deleteEntry = (index) => {
  storageData[activeTab.value].splice(index, 1)
  ElMessage.success('Deleted')
}

const clearAll = () => {
  storageData[activeTab.value] = []
  ElMessage.success('Cleared all data')
}
</script>

<template>
  <el-card class="app-demo" shadow="hover">
    <template #header>
      <div class="header">
        <span class="title">Application (应用面板)</span>
        <el-button type="danger" size="small" icon="Delete" @click="clearAll">Clear All</el-button>
      </div>
    </template>

    <div class="layout">
      <div class="sidebar">
        <div 
          class="nav-item" 
          :class="{ active: activeTab === 'local' }"
          @click="activeTab = 'local'"
        >
          Local Storage
        </div>
        <div 
          class="nav-item" 
          :class="{ active: activeTab === 'session' }"
          @click="activeTab = 'session'"
        >
          Session Storage
        </div>
        <div 
          class="nav-item" 
          :class="{ active: activeTab === 'cookies' }"
          @click="activeTab = 'cookies'"
        >
          Cookies
        </div>
      </div>

      <div class="content">
        <div class="toolbar">
            <el-input 
                v-model="newEntry.key" 
                placeholder="Key" 
                size="small" 
                style="width: 120px" 
            />
            <el-input 
                v-model="newEntry.value" 
                placeholder="Value" 
                size="small" 
                style="width: 120px" 
            />
            <el-button type="primary" size="small" @click="addEntry">Add</el-button>
        </div>

        <el-table :data="storageData[activeTab]" style="width: 100%" height="250" border>
          <el-table-column prop="key" label="Key" width="120" />
          <el-table-column prop="value" label="Value" min-width="150" />
          <el-table-column v-if="activeTab === 'cookies'" prop="domain" label="Domain" width="110" />
          <el-table-column label="Action" width="70" align="center">
            <template #default="scope">
              <el-button 
                type="danger" 
                icon="Close" 
                circle 
                size="small" 
                @click="deleteEntry(scope.$index)" 
              />
            </template>
          </el-table-column>
        </el-table>
        
        <div class="info-bar" v-if="activeTab === 'local'">
            持久化存储：即便关闭浏览器，数据也会保留。
        </div>
        <div class="info-bar" v-else-if="activeTab === 'session'">
            临时存储：关闭标签页后，数据会被清空。
        </div>
        <div class="info-bar" v-else>
            Cookies：通常用于身份验证，会随请求发送给服务器。
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.app-demo {
  margin: 20px 0;
}

.layout {
  display: flex;
  height: 350px;
  border: 1px solid #ebeef5;
}

.sidebar {
  width: 150px;
  border-right: 1px solid #ebeef5;
  background-color: #f9fafc;
}

.nav-item {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #ecf5ff;
}

.nav-item.active {
  background-color: #e6f7ff;
  color: #409eff;
  font-weight: bold;
  border-left: 3px solid #409eff;
}

.content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.info-bar {
    margin-top: auto;
    padding-top: 8px;
    font-size: 12px;
    color: #909399;
    border-top: 1px solid #ebeef5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
