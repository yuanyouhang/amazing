<template>
  <div class="border-4 border-sky-500 rounded-lg h-full p-4">
    <!-- 视频列表页 -->
    <div v-if="!showPlayer" class="h-full flex">
      <template v-if="videos.length">
        <div class="w-3/5 h-full overflow-auto border-r-2 px-2">
          <div
            v-for="item in videos"
            :key="item._id"
            class="flex items-center p-2 hover:bg-sky-200 dark:hover:bg-sky-700 border-b-2 border-orange-300"
          >
            <div>{{ item.name }}</div>
            <el-button type="success" class="ml-auto" @click="setPlayer(item)">播放</el-button>
            <el-button type="primary" @click="addToDownload(item)">{{ item.downloading ? '下载中' : '下载' }}</el-button>
          </div>
        </div>
        <div class="w-2/5 px-2 h-full flex flex-col">
          <div class="text-center my-2 text-lg">下载列表</div>
          <div v-if="downloadList.length" class="flex-1 overflow-auto">
            <div v-for="item in downloadList" class="p-2 border-2 border-orange-300 mb-3">
              <div class="flex justify-between items-center mb-2">
                <span>{{ item.name }}({{ (item.loaded/1024/1024).toFixed(2) }} / {{ (item.total/1024/1024).toFixed(2) }}M)</span>
                <el-button type="danger" size="small" @click="cancelDownload(item)">取消</el-button>
              </div>
              <el-progress
                v-if="item.total"
                :percentage="item.progress"
                :text-inside="true"
                :stroke-width="18"
              />
            </div>
          </div>
          <div v-else class="text-center">无下载任务</div>
        </div>
      </template>
      <div v-else class="p-2 w-full text-center">暂无数据</div>
    </div>
    <!-- 播放页 -->
    <div v-else class="border mx-2 h-full flex flex-col">
      <div class="text-right">
        <el-icon size="28" class="cursor-pointer" @click="closePlayer">
          <i-ep-Close />
        </el-icon>
      </div>
      <div class="flex-1 overflow-auto flex justify-center">
        <video controls class="max-h-full max-w-full" :src="currentPlay.url"></video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';

const api = inject('API')
const videos = ref([])
const getVideos = async () => {
  const res = await api.getVideos()
  console.log('获取视频列表返回：', res)
  videos.value = res.data.map(item => {
    return {
      ...item,
      downloading: false,
      loaded: 0,
      total: 0,
      progress: 0, // 0 - 100
    }
  })
}
onMounted(() => {
  getVideos()
})

const showPlayer = ref(false)
const currentPlay = ref({})
function setPlayer(item) {
  currentPlay.value = item
  showPlayer.value = true
}
function closePlayer() {
  currentPlay.value = {}
  showPlayer.value = false
}

const downloadList = ref([])
function addToDownload(item) {
  if(item.downloading === true) return
  item.downloading = true
  downloadList.value.push(item)
  downLoad(item)
}

async function downLoad(item) {
  const controller = new AbortController()
  item.controller = controller
  const signal = controller.signal
  const url = item.url
  const res = await fetch(url, { signal })
  console.log('文件下载返回res：', res)
  item.loaded = 0 // 当前下载进度
  item.total = res.headers.get('content-length') // 文件大小
  const reader = res.body.getReader()
  const chunks = []
  async function read() {
    const { done, value } = await reader.read()
    if (done) {
      setTimeout(() => {
        const blob = new Blob(chunks)
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = item.name
        link.click()
        const it = videos.value.find(i => i._id === item._id)
        it.downloading = false
        const index = downloadList.value.findIndex(i => i._id === item._id)
        downloadList.value.splice(index, 1)
      }, 1000)
      return
    }
    chunks.push(value)
    item.loaded += value.length
    item.progress = Math.round((item.loaded / item.total) * 100)
    read()
  }
  read()
}

function cancelDownload(item) {
  item.controller.abort('取消下载')
  const it = videos.value.find(i => i._id === item._id)
  it.downloading = false
  const index = downloadList.value.findIndex(i => i._id === item._id)
  downloadList.value.splice(index, 1)
}
</script>