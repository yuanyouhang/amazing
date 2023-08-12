<template>
  <header class="py-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 flex items-center relative">
    <el-icon size="28" class="cursor-pointer" @click="$router.back()" :class="{'invisible': !showBack}">
      <i-ep-ArrowLeftBold />
    </el-icon>
    <div class="italic text-2xl font-bold mx-auto">Hello, World!</div>
    <div class="absolute right-0 flex items-center">
      <img class="dark:hidden h-6 w-6 mx-4 cursor-pointer hover:opacity-80" src="@/assets/github.svg" @click="toGithub">
      <img class="hidden dark:block h-6 w-6 mx-4 cursor-pointer hover:opacity-80" src="@/assets/github-dark.svg" @click="toGithub">
      <el-switch
        size="large"
        v-model="theme"
        active-value="dark"
        inactive-value="light"
        inline-prompt
        active-text="Dark"
        inactive-text="Light"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'

const route = useRoute()
const showBack = ref(false)
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    showBack.value = false
  }
  else {
    showBack.value = true
  }
})

const themeStore = useThemeStore()
const setLightTheme = () => {
  localStorage.theme = 'light'
  themeStore.changeTheme('light')
  document.documentElement.classList.remove('dark')
}
const setDarkTheme = () => {
  localStorage.theme = 'dark'
  themeStore.changeTheme('dark')
  document.documentElement.classList.add('dark')
}
if (!('theme' in localStorage)) {
  setLightTheme()
}

const theme = ref(localStorage.theme)
watchEffect(() => {
  if (theme.value === 'light') {
    setLightTheme()
  }
  else {
    setDarkTheme()
  }
})

const github = "https://github.com/yuanyouhang/amazing"
function toGithub() {
  window.open(github, '_blank')
}
</script>