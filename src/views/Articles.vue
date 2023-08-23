<template>
  <div v-loading="loading" element-loading-background="rgba(0,0,0,0)" class="h-full flex flex-col">
    <template v-if="!showArticle">
      <div class="flex-1 border shadow-[6px_4px_3px_0px_#918F8F] dark:shadow-none overflow-auto rounded p-6 bg-white dark:bg-opacity-95 text-black">
        <div
          class="px-4 py-2 flex bg-slate-200 mb-2 hover:bg-slate-300 items-center rounded"
          v-for="item,index in articles"
          :key="item._id"
        >
          <span>{{ item.name }}</span>
          <div class="ml-auto">
            <el-button type="primary" @click="showDetail(item, index)">查看</el-button>
            <el-button type="primary" @click="downLoad(item)">下载</el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex bg-white text-black p-2 rounded-t">
        <div class="flex flex-1 justify-around">
          <div class="cursor-pointer flex items-center opacity-60 hover:opacity-100" @click="preArticle" v-if="currentArticleIndex!==0">
            <el-icon size="20" class="mr-2">
              <i-ep-ArrowLeft />
            </el-icon>
            <span>上一篇：{{ articles[currentArticleIndex-1].name }}</span>
          </div>
          <div class="cursor-pointer flex items-center opacity-60 hover:opacity-100" @click="nextArticle" v-if="currentArticleIndex!==(articles.length-1)">
            <span>下一篇：{{ articles[currentArticleIndex+1].name }}</span>
            <el-icon size="20" class="ml-2">
              <i-ep-ArrowRight />
            </el-icon>
          </div>
        </div>
        <div class="cursor-pointer text-blue-500 text-xl " @click="closeDetail">返回</div>
      </div>
      <div class="flex-1 overflow-auto rounded-b px-8 py-1 bg-white text-black">
        <zero-md :src="currentArticle.url" class="h-full overflow-auto"></zero-md>
      </div>
    </template>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, onActivated, computed } from 'vue'

const api = inject('API')
const articles = ref([])
const loading = ref(false)
async function getArticles() {
  loading.value = true
  const res = await api.getArticles()
  loading.value = false
  console.log('获取文章列表返回：', res)
  articles.value = res.data
}
onMounted(() => {
  getArticles()
})

const currentArticleIndex = ref(0)
const currentArticle = computed(() => {
  return articles.value[currentArticleIndex.value]
})
const showArticle = ref(false)
function showDetail(item, index) {
  showArticle.value = true
  currentArticleIndex.value = index
}
function preArticle() {
  currentArticleIndex.value--
}
function nextArticle() {
  currentArticleIndex.value++
}
function closeDetail() {
  showArticle.value = false
}
onActivated(() => {
  showArticle.value = false
})

function downLoad(item) {
  const link = document.createElement('a')
  link.href = item.url
  link.download = item.name
  link.click()
}
</script>