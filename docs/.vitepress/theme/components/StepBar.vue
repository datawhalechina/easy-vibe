<template>
  <el-steps
    :active="active"
    align-center
  >
    <el-step
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :description="item.description"
    />
  </el-steps>
</template>

<script setup>
defineProps({
  active: {
    type: Number,
    default: 0
  },
  items: {
    type: Array,
    default: () => [
      { title: '困境与机会', description: '普通人的编程新可能' },
      { title: '能力初探', description: '60秒极速开发体验' },
      { title: '原生实战', description: '打造AI原生贪吃蛇' },
      { title: '拓展创造', description: '举一反三做游戏' }
    ]
  }
})
</script>
