<template>
  <div class="h-full flex flex-col relative bg-white text-black rounded" ref="containerRef">
    <PhysicsBg ref="physicsBgRef" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
  </router-view>
  </div>
</template>

<script setup>
import PhysicsBg from '@/components/PhysicsBg.vue';
import _ from 'lodash'
import { ref } from 'vue';

const containerRef = ref(null)
const physicsBgRef = ref(null)
// 获取背景画布的宽高
function getFullWH() {
  physicsBgRef.value.fullWidth = containerRef.value.clientWidth
  physicsBgRef.value.fullHeight = containerRef.value.clientHeight
}
onMounted(() => {
  getFullWH()
  window.addEventListener('resize', _.debounce(getFullWH, 300)) // 防抖，只在窗口尺寸变化停止后计算
})
</script>