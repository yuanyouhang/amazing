<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="h-screen flex flex-col dark:bg-slate-600 dark:text-white">
    <HelloWorld />
    <main class="flex-1 mx-auto py-4 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 container">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

</style>
