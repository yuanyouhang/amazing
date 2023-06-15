<template>
  <div
    class="h-full flex flex-wrap gap-1 justify-between"
    ref="containerRef"
  >
    <div
      class="w-1/4 h-1/4 rounded-lg cursor-pointer hover:scale-110 transition-all"
      v-for="item in items"
      :style="{ 'background-color': item.bgColor }"
      :draggable="true"
      @dragstart="dragstart($event, item)"
      @dragover="dragover"
      @drop.prevent="drop(item)"
      @click="clickItem(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
const router = useRouter()

const getRandomNum = () => {
  return Math.floor(Math.random() * 256) 
}
const getBgColor = () => {
  return `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`
}

const items = ref([
  { id: 1, name:'Canvas', bgColor: getBgColor(), path: '/CanvasDemo' },
  { id: 2, name: 'Audio', bgColor: getBgColor(), path: '/AudioDemo' },
  { id: 3, bgColor: getBgColor() },
  { id: 4, bgColor: getBgColor() },
  { id: 5, bgColor: getBgColor() },
  { id: 6, bgColor: getBgColor() },
  { id: 7, bgColor: getBgColor() },
  { id: 8, bgColor: getBgColor() },
  { id: 9, bgColor: getBgColor() },
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