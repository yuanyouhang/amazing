<template>
  <div class="h-full flex flex-col">
    <div>
      持续学习以创造更多：
    </div>
    <div class="flex-1 overflow-auto p-4 border mt-2 rounded shadow-inner">
      <div class="h-full overflow-auto">
        <div
          v-for="item in sites"
          class="mb-2"
        >
          {{ item.name }}（<a :href="item.url" target="_blank" class="hover:text-blue-400 hover:underline">{{item.url}}</a>）
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'

const api = inject('API')
const sites =ref([])
async function getSites() {
  const res = await api.getSites()
  sites.value = res.data
}
onMounted(() => {
  getSites()
})
</script>