<template>
  <BgCanvas />
  <LightBgCanvas />
  <div class="h-screen flex flex-col dark:text-white">
    <HelloWorld />
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
</script>