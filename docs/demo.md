# 组件库演示 (Element Plus)

Easy-Vibe 已经集成了 [Element Plus](https://element-plus.org/)，你可以在 Markdown 中直接使用 Vue 组件。

## 按钮示例

<el-row class="mb-4">
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</el-row>

## 图标示例

<el-icon :size="20" color="#409EFC" class="no-inherit">
  <Edit />
</el-icon>
<el-icon :size="20" color="#67C23A" class="no-inherit">
  <Share />
</el-icon>
<el-icon :size="20" color="#F56C6C" class="no-inherit">
  <Delete />
</el-icon>
<el-icon :size="20" class="is-loading no-inherit">
  <Loading />
</el-icon>

::: tip
要使用图标，你可能需要手动导入具体的图标组件，或者配置自动导入。上面的示例假设你已经配置好了或使用了简单的图标。
:::

## 卡片示例

<el-card class="box-card" style="width: 480px">
  <template #header>
    <div class="card-header">
      <span>Card name</span>
      <el-button class="button" text>Operation button</el-button>
    </div>
  </template>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
</el-card>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
