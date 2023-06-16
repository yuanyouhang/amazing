import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: '',
  }),
  actions: {
    changeTheme(theme) {
      this.theme = theme
    }
  },
})