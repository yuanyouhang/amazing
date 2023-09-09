<template>
  <canvas
    class="absolute top-0 left-0"
    id="PhysicsBgCanvas"
  ></canvas>
</template>

<script setup>
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue'
import getRandomWeightedInteger from '@/utils/getRandomWeightedInteger.js'

const props = defineProps(['fullWidth', "fullHeight"])
const fullWidth = ref(0)
const fullHeight = ref(0)
let bgCanvas, ctx
function initBgCanvas() {
  bgCanvas = document.getElementById('PhysicsBgCanvas')
  ctx = bgCanvas.getContext('2d')
  const width = Number(fullWidth.value)
  const height = Number(fullHeight.value)
  bgCanvas.style.width = width + 'px'
  bgCanvas.style.height = height + 'px'
  // const scale = devicePixelRatio
  // bgCanvas.width = width * scale
  // bgCanvas.height = height * scale
  bgCanvas.width = width
  bgCanvas.height = height
}
// 监听父组件传递的宽高
watch([() => props.fullWidth, () => props.fullHeight], ([newWidth, newHeight], [oldWidth, oldHeight]) => {
  fullWidth.value = newWidth
  fullHeight.value = newHeight
  initBgCanvas()
})

const areaCount = 6
// 每个区域的宽度, 间隙大小设为一个区域宽度
const oneAreaWidth = computed(() => {
  return fullWidth.value / (areaCount + areaCount - 1)
})
// 获取两个数之间的随机数
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomXY() {
  const index = getRandomWeightedInteger()
  const minX = (oneAreaWidth.value + oneAreaWidth.value) * index
  const maxX = minX + oneAreaWidth.value
  let x = getRandomNumber(minX, maxX) // 起始x坐标
  let y = Math.random() * fullHeight.value
  return [x, y]
}
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  draw() {
    let x = this.x
    let y = this.y
    let radius = 4
    ctx.fillStyle = 'rgba(250, 250, 115, 0.6)'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.fill()
  }
}
const maxPointCount = 2000
let pointCount = 0
let timer
function draw() {
  const [x, y] = getRandomXY()
  const point = new Point(x, y)
  point.draw()
  pointCount++
  if(pointCount > maxPointCount) {
    clearInterval(timer)
  }
}

onMounted(() => {
  initBgCanvas()
})
onActivated(() => {
  timer = setInterval(() => {
    draw()
  }, 300)
})
onDeactivated(() => {
  clearInterval(timer)
})
</script>