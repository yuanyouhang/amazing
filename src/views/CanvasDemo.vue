<template>
    <div class="h-5/6" ref="canvasWrapper" style="border: 4mm ridge rgba(211, 220, 50, .6);">
      <canvas id="canvas" style="background-color: #FFFFFF;" class="cursor-pointer"></canvas>
    </div>
    <div class="h-1/6 p-4 flex justify-around items-center">
      <div>
        <el-color-picker v-model="lineColor" @change="changeColor" />
      </div>
      <div class="w-1/4">
        <el-slider v-model="lineWidth" :min="1" :max="10" />
      </div>
      <div>
        <el-button type="warning" @click="undo">回退</el-button>
        <el-button type="danger" @click="clear">重置</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const defaultColor = '#000000'
const lineColor = ref(defaultColor)
const changeColor = (value) => {
  if(!value) {
    lineColor.value = defaultColor
  }
}

const lineWidth = ref(1)
let canvas, context
let isDrawing = false
let records = []

function startDrawing(e) {
  isDrawing = true
  context.beginPath()
  context.moveTo(e.offsetX, e.offsetY)
}

function draw(e) {
  if (!isDrawing) return
  context.strokeStyle = lineColor.value
  context.lineWidth = lineWidth.value
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.lineTo(e.offsetX, e.offsetY)
  context.stroke()
}

function endDrawing() {
  records.push(context.getImageData(0, 0, canvas.width, canvas.height))
  isDrawing = false
}

// canvas的大小响应窗口的变化
const canvasWrapper = ref(null)
function refreshCanvasSize() {
  canvas.width = canvasWrapper.value?.clientWidth
  canvas.height = canvasWrapper.value?.clientHeight
  if(records.length === 0) return
  context.putImageData(records[records.length - 1], 0, 0) // 改变完宽高后恢复画布数据
}
window.addEventListener('resize', refreshCanvasSize)

onMounted(() => {
  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')
  refreshCanvasSize()
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', endDrawing)
  canvas.addEventListener('mouseout', () => {
    if(isDrawing) {
      endDrawing()
    }
  })
})

function undo() {
  if (records.length > 0) {
    records.pop()
    if(records.length === 0) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    context.putImageData(records[records.length - 1], 0, 0)
  }
}
function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  records = []
}
const imgName = ref('我的画板')
function save() {
  const a = document.createElement("a")
  a.href = canvas.toDataURL()
  a.download = imgName.value
  a.click()
}
</script>