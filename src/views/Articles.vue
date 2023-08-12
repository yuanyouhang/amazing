<template>
  <div v-loading="loading" element-loading-background="rgba(0,0,0,0)" class="h-full flex flex-col">
    <template v-if="!showArticle">
      <div class="mb-4">
        <el-input v-model="searchInput" placeholder="搜索文章" @keyup.enter="search">
          <template #append>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>
      </div>
      <div class="flex-1 border shadow-[6px_4px_3px_0px_#918F8F] dark:shadow-none overflow-auto rounded p-6 bg-white dark:bg-opacity-95 text-black">
        <div
          class="px-4 py-2 flex bg-slate-200 mb-2 hover:bg-slate-300 items-center rounded"
          v-for="item in articlesSlice"
          :key="item._id"
        >
          <span>{{ item.name }}</span>
          <div class="ml-auto">
            <el-button type="primary" @click="showDetail(item)">查看</el-button>
            <el-button type="primary" @click="downLoad(item)">下载</el-button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <span class="cursor-pointer self-end w-fit text-blue-500 text-xl mb-2" @click="closeDetail">返回</span>
      <div class="flex-1 border overflow-auto rounded px-8 py-6 bg-white text-black">
        <zero-md :src="currentArticle.url" class="h-full overflow-auto"></zero-md>
      </div>
    </template>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

const api = inject('API')
const articles = ref([])
const articlesSlice = ref([])
const loading = ref(false)
async function getArticles() {
  loading.value = true
  const res = await api.getArticles()
  loading.value = false
  console.log('获取文章列表返回：', res)
  articles.value = res.data
  articlesSlice.value = articles.value
}
onMounted(() => {
  getArticles()
})

const searchInput = ref('')
function search() {
  articlesSlice.value = articles.value.filter(item => item.name.includes(searchInput.value))
}

const currentArticle = ref({})
const showArticle = ref(false)
function showDetail(item) {
  showArticle.value = true
  currentArticle.value = item
}
function closeDetail() {
  showArticle.value = false
}

function downLoad(item) {
  const link = document.createElement('a')
  link.href = item.url
  link.download = item.name
  link.click()
}
</script>