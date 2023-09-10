<template>
  <BgCanvas />
  <LightBgCanvas />
  <el-button class="fixed right-2 bottom-2 z-10" @click="changeResting">{{ isResting ? '返回' : '休息一下' }}</el-button>
  <div
    class="h-screen flex flex-col dark:text-white transition-all duration-500 origin-bottom-right"
    :class="{'scale-0': isResting}"
  >
    <HelloWorld ref="headerRef" />
    <main class="flex-1 overflow-auto mx-auto py-4 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import BgCanvas from '@/components/BgCanvas.vue'
import LightBgCanvas from '@/components/LightBgCanvas.vue'
import { ref } from 'vue';

const isResting = ref(false)
const headerRef = ref(null)
function changeResting() {
  isResting.value = !isResting.value
  if(isResting.value) {
    headerRef.value.theme = 'dark'
  }
}
</script>