import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDatabaseStore = defineStore('database', () => {
  const pomodoros = ref([])
  const tasks = ref([])
  const settings = ref({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  })

  return {
    pomodoros,
    tasks,
    settings
  }
})
