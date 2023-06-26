import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDatabaseStore = defineStore('database', () => {
  const pomodoros = ref([])
  const tasks = ref([])
  const settings = ref({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  })
  const taskActive = ref({
    id: null,
    name: '',
    count: 1,
    notes: '',
    isCompleted: false,
    isActive: false
  })
  const setTaskActive = (task) => {
    taskActive.value.id = task.id
    taskActive.value.name = task.name
    taskActive.value.count = task.count
    taskActive.value.notes = task.notes
    taskActive.value.isCompleted = task.isCompleted
    taskActive.value.isActive = task.isActive
  }
  return {
    pomodoros,
    tasks,
    settings,
    taskActive,
    setTaskActive,
  }
})
