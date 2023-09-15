<template>
  <div class="flex h-full z-10 py-4">
    <div class="h-full border-r-2 border-slate-300 pr-4 flex-1 flex flex-col">
      <div class="font-bold text-center text-xl">physicists</div>
      <div
        v-for="item in physicists"
        :key="item._id"
        class="mt-4 flex flex-col items-center"
      >
        <el-image :src="item.img" class="w-2/3" fit="contain"></el-image>
        <div>{{ `(${item.info.start}~${item.info.end})` }}</div>
        <div>{{ item.name }}</div>
      </div>
      <div class="text-sky-400 cursor-pointer text-2xl mt-auto text-right hover:text-sky-300" @click="toPhysicists()">More ></div>
    </div>
    <div class="h-full border-r-2 border-slate-300 px-4 flex-1 overflow-auto">
      <div class="font-bold text-center text-xl">concepts</div>
      <div class="flex flex-wrap items-start p-4 gap-4 flex-1">
        <div
          v-for="item in concepts"
          :key="item._id"
          @click="showDialog(item)"
          class="rounded px-4 py-2 bg-slate-200 hover:bg-sky-400 hover:text-white cursor-pointer"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="h-full w-1/4 px-4">
      <div
        class="h-1/4 flex items-center justify-center bg-orange-300 mt-4 rounded cursor-pointer relative group"
        @click="toTheories"
      >
        <div class="font-bold text-xl">theories</div>
        <div class="absolute right-3 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <el-icon size="26" color=""><i-ep-Right /></el-icon>
        </div>
      </div>
      <div
        class="h-1/4 flex items-center justify-center bg-sky-300 mt-4 rounded cursor-pointer relative group"
        @click="toExperiments"
      >
        <div class="font-bold text-xl">experiments</div>
        <div class="absolute right-3 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <el-icon size="26" color=""><i-ep-Right /></el-icon>
        </div>
      </div>
      <div
        class="h-1/4 flex items-center justify-center bg-green-300 mt-4 rounded cursor-pointer relative group"
        @click="toStories"
      >
        <div class="font-bold text-xl">stories</div>
        <div class="absolute right-3 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <el-icon size="26" color=""><i-ep-Right /></el-icon>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:dialogVisible="dialogVisible" :conceptItem="currentConcept" @update:dialogVisible="closeDialog" title="标题" />
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Dialog from '@/components/Dialog.vue';

const router = useRouter()
const api = inject('API')
const physicists = ref([])
async function getPhysicists() {
  const res = await api.getPhysicistsLimit()
  physicists.value = res.map(item => {
    return {
      ...item,
      info: JSON.parse(item.info)
    }
  })
}
const concepts = ref([])
const currentConcept = ref({})
async function getConcepts() {
  const res = await api.getConcepts()
  concepts.value = res
}
onMounted(() => {
  getPhysicists()
  getConcepts()
})

function toPhysicists() {
  router.push('/Physics/Physicists')
}

const dialogVisible = ref(false)
function showDialog(item) {
  currentConcept.value = item
  dialogVisible.value = true
}
function closeDialog() {
  dialogVisible.value = false
}

function toTheories() {
  router.push('/Physics/Theories')
}
function toExperiments() {
  router.push('/Physics/Experiments')
}
function toStories() {
  router.push('/Physics/Stories')
}
</script>