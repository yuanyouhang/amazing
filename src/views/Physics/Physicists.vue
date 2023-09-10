<template>
  <div class="flex h-full z-10 py-4">
    <div class="w-1/5 h-full overflow-y-scroll px-4">
      <div
        v-for="item in physicists"
        :key="item._id"
        class="hover:text-sky-400 py-2 mt-2 text-ellipsis overflow-hidden whitespace-nowrap p-2 rounded cursor-pointer"
        :class="{'bg-slate-100 text-sky-400': item._id === currentItem._id}"
        @click="changeItem(item)"
        :title="item.name"
      >
        {{ item.name }}
      </div>
    </div>
    <div v-loading="loading" element-loading-background="rgba(0,0,0,0)" class="w-4/5 px-6 h-full overflow-auto">
      <div class="mb-4 overflow-hidden">
        <div class="w-1/2 mr-4 mb-2 float-left">
          <el-image :src="currentItem.img" fit="contain" class="w-full"></el-image>
        </div>
        <div ref="introContainer"></div>
      </div>
      <div ref="detailContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'
import purify from '@/utils/dompurify.js'

const api = inject('API')
const physicists = ref([])
const loading = ref(false)
async function getPhysicists() {
  loading.value = true
  const res = await api.getPhysicists()
  loading.value = false
  physicists.value = res.map(item => {
    return {
      ...item,
      info: JSON.parse(item.info)
    }
  })
  const item = physicists.value[0]
  changeItem(item)
}

const detailContainer = ref(null)
const introContainer = ref(null)
let introShadowDOM, detailShadowDOM
function createDetailShadowDOM() {
  const container = detailContainer.value
  detailShadowDOM = container.attachShadow({ mode: 'open' });
}
function setDetailShadowContent() {
  detailShadowDOM.innerHTML = currentItem.value.detailContent
  const style = document.createElement('style')
  style.textContent = `
  img {
    display: block;
    margin: 0 auto;
  }
  `
  detailShadowDOM.prepend(style)
  introContainer.value.scrollIntoView()
}
function createIntroShadowDOM() {
  const container = introContainer.value
  introShadowDOM = container.attachShadow({ mode: 'open' });
}
function setIntroShadowContent() {
  introShadowDOM.innerHTML = purify(currentItem.value.info.intro)
  const style = document.createElement('style')
  style.textContent = `
  p {
    margin: 0;
  }
  `
  introShadowDOM.prepend(style)
}

function getDetail() {
  fetch(currentItem.value.detail).then(res => {
    return res.text()
  }).then(text => {
    currentItem.value = {
      ...currentItem.value,
      detailContent: purify(text)
    }
    setDetailShadowContent()
  })
}

const currentItem = ref({})
function changeItem(item) {
  if(item._id === currentItem.value._id) return
  currentItem.value = item
  setIntroShadowContent()
  getDetail()
}

onMounted(() => {
  createIntroShadowDOM()
  createDetailShadowDOM()
  getPhysicists()
})
</script>