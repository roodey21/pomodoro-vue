import { defineStore } from 'pinia'
import { useTimerStore } from './timer'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('emerald')
  const timerStore = useTimerStore()
  const changeTheme = () => {
    if (timerStore.isPomodoro === true) {
      theme.value = 'emerald'
    }
    if (timerStore.isShortBreak === true) {
      theme.value = 'blue'
    }
    if (timerStore.isLongBreak === true) {
      theme.value = 'rose'
    }
  }
  return {
    theme,
    changeTheme
  }
})
