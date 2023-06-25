<template>
  <div class="flex justify-between border rounded-2xl shadow-[6px_5px_2px_1px_#9A969B] dark:shadow-none">
    <div class="flex-1 m-4 overflow-auto h-[500px]">
      <label
        for="selector"
        class="text-white bg-sky-500 hover:bg-sky-400 cursor-pointer text-center block p-2 sticky top-0"
      >添加音频</label>
      <input type="file" accept="audio/*" id="selector" ref="audioSelector" style="display: none;" @change="selectFile">
      <template v-if="audios.length">
        <div
          v-for="item, index in audios"
          class="p-2 my-1 hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-400"
          @click="playAudio(item, index)"
          :class="[{'bg-slate-300': index === currentPlayIndex}, {'dark:bg-slate-500': index === currentPlayIndex}]"
          title="点击播放"
        >
          {{ item.name }}
        </div>
      </template>
      <div v-else class="text-center text-stone-400 py-2">音频列表为空</div>
    </div>
    <canvas width="650" height="500" id="canvas" class="bg-slate-200 rounded-r-xl cursor-pointer" title="点击变色"></canvas>
  </div>
  <div class="flex items-center">
    <audio :src="audioSrc" ref="audioRef" controls class="mx-auto my-2"></audio>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import getColor from "@/utils/getRandomColor"

let canvas, ctx, isInit
onMounted(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.lineWidth = 1
  ctx.lineCap = 'round'
  canvas.addEventListener('click', () => {
    ctx.strokeStyle = getColor()
  })
  draw(new Array(360).fill(1))
  audioRef.value.addEventListener('ended', endPlay)
})

function endPlay() {
  if(currentPlayIndex.value === audios.value.length - 1) {
    currentPlayIndex.value = 0
  }
  else {
    currentPlayIndex.value ++
  }
  const item = audios.value[currentPlayIndex.value]
  playAudio(item, currentPlayIndex.value)
}

const draw = (lines) => {
  // 由于canvas的原点已经移动，需要注意清除画布的区域
  ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2)
  for(let i = 0; i < lines.length; i++) {
    let len = 1
    if(lines[i] !== 0) {
      len = lines[i]
    }
    ctx.beginPath()
    // 80相当于内圆(空白区)的半径, len/* 为线的长度
    ctx.moveTo(80,0)
    ctx.lineTo(80 + len / 1.3,0)
    ctx.stroke()
    ctx.rotate(Math.PI * 2 / lines.length)
  }
}

const audioSelector = ref(null)
const audios = ref([])
const currentPlayIndex = ref(0)
const audioSrc = ref('')
const audioRef = ref(null)
let analyser, buffer
function selectFile(e) {
  if(e.target.files[0]) {
    audios.value.push(e.target.files[0])
  }
}

function initAudio() {
  const audioCtx = new AudioContext()
  analyser = audioCtx.createAnalyser()
  analyser.fftSize = 512
  buffer = new Uint8Array(analyser.frequencyBinCount)
  const source = audioCtx.createMediaElementSource(audioRef.value)
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  isInit = true
}

function playAudio(item, index) {
  currentPlayIndex.value = index
  if(!isInit) {
    initAudio()
  }
  const url = URL.createObjectURL(item)
  audioSrc.value = url
  nextTick(() => {
    audioRef.value.play()
    updateData()
  })
}
function updateData() {
  analyser.getByteFrequencyData(buffer)
  const offset = Math.floor(buffer.length / 2)
  const data = new Array(offset *2)
  for(let i=0; i < offset; i++) {
    data[i] = data[data.length - i - 1] = buffer[i]
  }
  draw(data)
  requestAnimationFrame(updateData)
}
</script>