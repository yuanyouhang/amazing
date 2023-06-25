<template>
  <canvas
    class="fixed top-0 left-0 block dark:hidden dark:bg-slate-700 -z-10"
    id="lightBgCanvas"
  ></canvas>
</template>

<script setup>
import { onMounted } from 'vue'

let bgCanvas, ctx
function initBgCanvas() {
  bgCanvas = document.getElementById('lightBgCanvas')
  ctx = bgCanvas.getContext('2d')
  const width = innerWidth
  const height = innerHeight
  bgCanvas.style.width = width + 'px'
  bgCanvas.style.height = height + 'px'
  const scale = devicePixelRatio
  bgCanvas.width = width * scale
  bgCanvas.height = height * scale
}

let innerRadius = 50
let outerRadius = 70
let originX = 85
let originY = 85
let lines = new Array(180).fill(0).map(() => {
  return Math.random() * (outerRadius - innerRadius)
})
function drawInner() {
  const gradient = ctx.createRadialGradient(originX, originY, innerRadius * 0.2, originX, originY, innerRadius)
  gradient.addColorStop(0, "#F5ECB1")
  gradient.addColorStop(0.5, "#F5E78D")
  gradient.addColorStop(1, "#F5E87A")
  ctx.fillStyle = gradient
  ctx.save()
  ctx.beginPath()
  ctx.arc(originX, originY, innerRadius, 0, Math.PI * 2)
  ctx.fill()
}

function drawOuter() {
  ctx.translate(originX, originY)
  ctx.strokeStyle = '#F8EB95'
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  for(let i = 0; i < lines.length; i++) {
    let len = 1
    if(lines[i] > 1) {
      len = lines[i]
    }
    ctx.beginPath()
    ctx.moveTo(innerRadius, 0)
    ctx.lineTo(innerRadius + len, 0)
    ctx.stroke()
    ctx.rotate(Math.PI * 2 / lines.length)
  }
}

onMounted(() => {
  initBgCanvas()
  drawInner()
  drawOuter()
})
</script>