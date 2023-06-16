<script setup>
import { ref, watchEffect } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
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
</script>

<template>
  <header class="py-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 flex relative">
    <div class="italic text-2xl font-bold mx-auto">Hello, World!</div>
    <div class="absolute right-0">
      <el-switch
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

<style scoped>

</style>
