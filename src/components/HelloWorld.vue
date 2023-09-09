<template>
  <header class="py-2 mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 container flex items-center relative">
    <el-icon size="28" class="cursor-pointer" @click="$router.back()" :class="{'invisible': !showBack}">
      <i-ep-ArrowLeftBold />
    </el-icon>
    <div class="italic text-2xl font-bold absolute left-1/2 -translate-x-1/2">{{ welcome || 'Hello, World!' }}</div>
    <div class="flex items-center ml-auto">
      <span class="font-bold hover:text-sky-400 cursor-pointer" @click="toArticles">Blog</span>
      <img class="dark:hidden h-6 w-6 mx-6 cursor-pointer hover:opacity-80" src="@/assets/github.svg" @click="toGithub">
      <img class="hidden dark:block h-6 w-6 mx-6 cursor-pointer hover:opacity-80" src="@/assets/github-dark.svg" @click="toGithub">
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
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const welcome = ref('')
const showBack = ref(false)
watch(() => route.path, (newPath) => {
  welcome.value = route.name
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

function toArticles() {
  router.push('/Articles')
}
</script>