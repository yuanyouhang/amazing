<template>
  <canvas
    class="fixed top-0 left-0 hidden dark:block dark:bg-slate-700 -z-10"
    id="bgCanvas"
  ></canvas>
</template>

<script setup>
import { onMounted } from 'vue'

let bgCanvas, ctx
function initBgCanvas() {
  bgCanvas = document.getElementById('bgCanvas')
  ctx = bgCanvas.getContext('2d')
  const width = innerWidth
  const height = innerHeight
  bgCanvas.style.width = width + 'px'
  bgCanvas.style.height = height + 'px'
  const scale = devicePixelRatio
  bgCanvas.width = width * scale
  bgCanvas.height = height * scale
}

const minRadius = 1
const maxRadius = 5
function getRadius() {
  let num = Math.floor(Math.random() * (maxRadius + 1))
  if(num < minRadius) {
    num = minRadius
  }
  return num
}

const minX = 15
let maxX = innerWidth * devicePixelRatio - 15
const minY = 15
let maxY = innerHeight * devicePixelRatio - 15
function getPointCenter() {
  // 在窗口大小变化时重新计算最大x、y
  maxX = innerWidth * devicePixelRatio - 15
  maxY = innerHeight * devicePixelRatio - 15
  let x = Math.floor(Math.random() * (maxX + 1))
  let y = Math.floor(Math.random() * (maxY + 1))
  if(x < minX) {
    x = minX
  }
  if(y < minY) {
    y = minY
  }
  return [x, y]
}

const minV = 0.2
const maxV = 1
function getV() {
  let v = Math.random() * maxV
  if(v < minV) {
    v = minV
  }
  return v
}

class Point {
  constructor(x, y, radius, v) {
    this.x = x
    this.y = y
    this.radius = radius
    this.v = v
  }
  draw() {
    let x = this.x
    let y = this.y
    let radius = this.radius
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.fill()
  }
  drawStar() {
    let x = this.x
    let y = this.y
    let radius = this.radius
    let radius1 = radius / 4
    const point1 = [x, y-radius]
    const point2 = [x+radius, y]
    const point3 = [x, y+radius]
    const point4 = [x-radius, y]
    const point5 = [x+radius1, y-radius1]
    const point6 = [x+radius1, y+radius1]
    const point7 = [x-radius1, y+radius1]
    const point8 = [x-radius1, y-radius1]
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.moveTo(point1[0], point1[1])
    ctx.lineTo(point5[0], point5[1])
    ctx.lineTo(point2[0], point2[1])
    ctx.lineTo(point6[0], point6[1])
    ctx.lineTo(point3[0], point3[1])
    ctx.lineTo(point7[0], point7[1])
    ctx.lineTo(point4[0], point4[1])
    ctx.lineTo(point8[0], point8[1])
    ctx.closePath()
    ctx.fill()
  }
}

const pointNumber = 400
let points = []
function initPoints() {
  points = new Array(pointNumber).fill(0).map(() => {
    const [x, y] = getPointCenter()
    const radius = getRadius()
    const v = getV()
    const point = new Point(x, y, radius, v)
    return point
  })
}

function animate() {
  ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height)
  ctx.fillStyle = '#FFFFFF'
  for(let i=0; i<points.length; i++) {
    points[i].y = points[i].y - points[i].v
    if(points[i].y < minY) {
      const [x, y] = getPointCenter()
      const radius = getRadius()
      const v = getV()
      points[i].x = x
      points[i].y = maxY
      points[i].radius = radius
      points[i].v = v
    }
    if(i % 2 === 0) {
      points[i].drawStar()
    }
    else {
      points[i].draw()
    }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  initBgCanvas()
  initPoints()
  animate()
})

window.addEventListener('resize', () => {
  initBgCanvas()
  initPoints()
})
</script>