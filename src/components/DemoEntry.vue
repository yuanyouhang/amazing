<template>
  <div
    class="h-full flex flex-wrap gap-1 justify-between"
    ref="containerRef"
  >
    <div
      class="w-1/4 h-1/4 rounded-lg cursor-pointer hover:scale-110 transition-all flex justify-center items-center text-xl shadow-[5px_5px_2px_1px_#9A969B] dark:shadow-none"
      v-for="item in items"
      :style="{ 'background-color': item.bgColor }"
      :draggable="true"
      @dragstart="dragstart($event, item)"
      @dragover="dragover"
      @drop.prevent="drop(item)"
      @click="clickItem(item)"
      title="长按拖动"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import getBgColor from "@/utils/getRandomColor"

const router = useRouter()
const items = ref([
  { id: 1, name:'Canvas', bgColor: getBgColor(), path: '/CanvasDemo' },
  { id: 2, name: 'Audio', bgColor: getBgColor(), path: '/AudioDemo' },
  { id: 3, name: 'ClipPath', bgColor: getBgColor(), path: '/ClipPath' },
  { id: 4, name: 'Articles', bgColor: getBgColor(), path: '/Articles' },
  { id: 5, name: 'Video', bgColor: getBgColor(), path: '/Video' },
  { id: 6, bgColor: getBgColor() },
  { id: 7, bgColor: getBgColor() },
  { id: 8, bgColor: getBgColor() },
  { id: 9, name: 'More...', bgColor: getBgColor(), path: '/More' },
])
const containerRef = ref(null)

let origin = null
const dragstart = (e, item) => {
  e.dataTransfer.effectAllowed = 'move'
  origin = item
}
const dragover = (e) => {
  e.preventDefault()
}
const drop = (item) => {
  // 删除源，在目标位置新增源
  const target = item
  const originIndex = items.value.findIndex(i => i.id === origin.id)
  const targetIndex = items.value.findIndex(i => i.id === target.id)
  items.value.splice(originIndex, 1)
  items.value.splice(targetIndex, 0, origin)
}

const clickItem = (item) => {
  if(item.path) {
    router.push(item.path)
  }
}
</script>