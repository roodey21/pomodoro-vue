import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const timer = ref(0)
  const shortBreak = ref(5)
  const longBreak = ref(15)
  const pomodoro = ref(25)
  const isRunning = ref(false)
  const session = [
    { id: 1, name: 'Pomodoro' },
    { id: 2, name: 'Short Break' },
    { id: 3, name: 'Long Break' }
  ]
  const sessionCount = ref(0)
  const sessions = ref([])

  const updateTimer = (value) => {
    timer.value = value * 60
  }
  const newSession = (sessionType) => {
    let date = Date.now()
    let session = {
      id: sessions.value.maxId() + 1,
      sessionType: sessionType,
      start: date,
      end: null,
      createdAt: date,
      isCompleted: false
    }
    sessions.value.push(session)
  }
  const currentSession = ref(1) // merujuk ke session dengan id 1 / pomodoro
  const setCurrentSession = (id) => {
    currentSession.value = id
  }

  let intervalTimer

  const timerInMinutes = computed(() => {
    const minutes = Math.floor(timer.value / 60)
    const seconds = timer.value % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  })

  const timeFocus = computed(() => {
    let time = 0
    sessions.value
      .filter((session) => session.sessionType === 1 && session.end !== null)
      .forEach((session) => {
        let range = session.end - session.start
        time += range
      })
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor(time / 60000)
    // const seconds = Math.floor((time % 60000) / 1000)
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
  })

  const startTimer = () => {
    if (isRunning.value === false) {
      newSession(currentSession.value)

      isRunning.value = true
      intervalTimer = setInterval(() => {
        if (timer.value > 0) {
          timer.value--
        } else {
          stopTimer()
          resetTimer()
        }
      }, 1000)
    } else {
      stopTimer()
    }
  }

  const stopTimer = () => {
    isRunning.value = false
    if (sessions.value.length > 0) {
      sessions.value.latest().end = Date.now()
    }
    clearInterval(intervalTimer)
  }

  const resetTimer = (sessionType) => {
    stopTimer()
    if (sessionType === 1) {
      setPomodoro()
    } else if (sessionType === 2) {
      setShortBreak()
    } else if (sessionType === 3) {
      setLongBreak()
    }
  }

  const setPomodoro = () => {
    if (isRunning.value) stopTimer()
    setCurrentSession(1)
    updateTimer(pomodoro.value)
  }

  const setCompleted = (id) => {
    const session = sessions.value.find((session) => session.id === id)
    if (session) session.isCompleted = true
  }

  const setShortBreak = () => {
    if (isRunning.value) stopTimer()
    setCurrentSession(2)
    updateTimer(shortBreak.value)
  }

  const setLongBreak = () => {
    if (isRunning.value) stopTimer()
    setCurrentSession(3)
    updateTimer(longBreak.value)
  }

  return {
    timer,
    shortBreak,
    longBreak,
    pomodoro,
    isRunning,
    timerInMinutes,
    startTimer,
    stopTimer,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    currentSession,
    sessions,
    setCompleted,
    timeFocus,
    sessionCount
  }
})
