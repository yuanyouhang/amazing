<template>
  <div class="h-full flex flex-col">
    <template v-if="!showArticle">
      <div class="flex-1 border shadow-[6px_4px_3px_0px_#918F8F] dark:shadow-none overflow-auto rounded p-6 bg-white text-black">
        <div
          class="px-4 py-2 cursor-pointer bg-slate-50 hover:bg-slate-100 mb-6 items-center rounded"
          v-for="item,index in articles"
          :key="item._id"
          @click="showDetail(item, index)"
        >
          <div class="text-lg font-bold">{{ item.name }}</div>
          <div
            class="mb-2 mt-4"
            style="text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;"
          >
            <div v-html="item.desc"></div>
          </div>
          
          <div class="flex">
            <span class="text-sky-400">More ></span>
            <span class="ml-auto text-gray-500 text-sm">{{ item.create_at }}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex bg-white text-black p-2 rounded-t">
        <div class="cursor-pointer text-blue-500 text-xl ml-6" @click="closeDetail">返回</div>
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
      </div>
      <div class="flex-1 overflow-auto rounded-b px-8 py-1 bg-white text-black" id="shadowContainer"></div>
    </template>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, onActivated, computed, nextTick } from 'vue'
import purify from '@/utils/dompurify.js'
import githubCSS from 'highlight.js/styles/github.css?url'

const api = inject('API')
const articles = ref([])
async function getArticles() {
  const res = await api.getArticles()
  console.log('获取文章列表返回：', res)
  articles.value = res.map(item => {
    return {
      ...item,
      desc: purify(item.desc),
      create_at: new Date(item.create_at).toLocaleDateString(),
    }
  })
  getMdContent()
}

function getMdContent() {
  articles.value.forEach((item, index) => {
    fetch(item.url).then(res => {
      return res.text()
    }).then(text => {
      const newItem = {
        ...item,
        content: purify(text)
      }
      articles.value.splice(index, 1, newItem)
    })
  })
}

onMounted(() => {
  getArticles()
})

let shadowRoot
function createShadowDOM() {
  // 创建Shadow DOM
  const container = document.getElementById('shadowContainer')
  shadowRoot = container.attachShadow({ mode: 'open' });
  setShadowInner()
}
function setShadowInner() {
  shadowRoot.innerHTML = currentArticle.value.content
  const style = document.createElement("style")
  const link = document.createElement('link')
  link.href = githubCSS
  link.rel = "stylesheet"
  style.textContent = `
  h1 {
    text-align: center;
  }
  pre {
    background-color: #F3F6F6;
    padding: 10px 20px;
    font-size: 17px;
  }
  `
  shadowRoot.prepend(link)
  shadowRoot.prepend(style)
  const container = document.getElementById('shadowContainer')
  container.scroll(0, 0)
}

const currentArticleIndex = ref(0)
const currentArticle = computed(() => {
  return articles.value[currentArticleIndex.value]
})
const showArticle = ref(false)
function showDetail(item, index) {
  showArticle.value = true
  currentArticleIndex.value = index
  nextTick(() => {
    createShadowDOM()
  })
}
function preArticle() {
  currentArticleIndex.value--
  nextTick(() => {
    setShadowInner()
  })
}
function nextArticle() {
  currentArticleIndex.value++
  nextTick(() => {
    setShadowInner()
  })
}
function closeDetail() {
  showArticle.value = false
}
onActivated(() => {
  showArticle.value = false
})
</script>