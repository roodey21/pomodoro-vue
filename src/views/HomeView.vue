<script setup>
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import { useTimerStore } from '../stores/timer'
import { useDatabaseStore } from '../stores/database'
import FormInput from '../components/FormInput.vue'
import TaskCard from '../components/TaskCard.vue'
import ModalSetting from '../components/ModalSetting.vue'

const timerStore = useTimerStore()
const { tasks } = useDatabaseStore()
const task = ref(null)
const formVisible = ref(false)
const formContainer = ref(null)
const pomodoroCount = ref(1)

onMounted(() => {
  timerStore.setPomodoro()
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission()
  }
})

const showForm = async () => {
  formVisible.value = !formVisible.value
  await nextTick()
  if (formVisible.value === true) {
    formContainer.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
const resetPomodoro = () => {
  alert('Apakah kamu yakin ingin mereset pomodoro?')
  timerStore.sessionCount = 0
}
const addTask = (item) => {
  tasks.push(item)
  formVisible.value = false
}

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id)
  tasks.splice(taskIndex, 1)
}

const editTask = (id) => {
  task.value = tasks.find((task) => task.id === id)
  showForm()
}

const createNotification = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Timer selesai!', {
      body: 'Waktu telah habis.'
    })
  }
}

const nextSession = () => {
  timerStore.sessionCount++
  let current = timerStore.sessions.latest()
  timerStore.setCompleted(current.id)
  if (current.sessionType === 1) {
    getAllPomodoroAfterLongBreak(timerStore.sessions).length === 4
      ? timerStore.setLongBreak()
      : timerStore.setShortBreak()
  } else {
    timerStore.setPomodoro()
  }
  if (current.sessionType === 1) pomodoroCount.value++
}

function getAllPomodoroAfterLongBreak(array) {
  const sessions = []
  let isFound = false

  for (let i = array.length - 1; i >= 0; i--) {
    const currentSession = array[i]
    
    if (currentSession.sessionType === 3 && currentSession.isCompleted) {
      isFound = true;
      continue
    }
    
    if (currentSession.sessionType === 1 && currentSession.isCompleted) {
      sessions.push(currentSession);
    }
    if (isFound) break
  }
  
  return sessions;
}

watchEffect(() => {
  if (timerStore.isRunning && timerStore.timer === 0) {
    createNotification()
    nextSession()
  }
})
</script>

<template>
  <div class="bg-emerald-700 container">
    <nav>
      <div class="mx-auto max-w-2xl p-3 flex flex-row justify-between border-b border-emerald-900">
        <h1 class="text-lg font-bold text-emerald-50">Pomodoro App</h1>
          <ModalSetting />
        
      </div>
    </nav>
    <div class="content max-w-lg mx-auto py-8 text-emerald-50 flex flex-col">
      <div class="grid gap-6">
        <div class="bg-emerald-600 px-4 py-6 md:px-16 rounded flex flex-col">
          <div class="card-nav flex flex-row gap-3 justify-center">
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 1 }"
              @click="timerStore.setPomodoro"
            >
              Pomodoro
            </button>
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 2 }"
              @click="timerStore.setShortBreak"
            >
              Short Break
            </button>
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 3 }"
              @click="timerStore.setLongBreak"
            >
              Long Break
            </button>
          </div>
          <div class="timer text-center">
            <span class="text-[120px] font-bold"> {{ timerStore.timerInMinutes }} </span>
          </div>
          <div class="text-center relative">
            <button
              class="text-2xl font-semibold text-emerald-500 bg-white w-44 md:w-52 py-4 rounded shadow-noblur uppercase transition-all"
              @click="timerStore.startTimer"
              :class="{ 'shadow-none translate-y-1.5': timerStore.isRunning === true }"
            >
              {{ timerStore.isRunning === true ? 'Pause' : 'Start' }}
            </button>
            <button
              class="absolute right-0 top-1/2 -translate-y-1/2 text-2xl font-semibold rounded hover:opacity-75"
              v-if="timerStore.isRunning === true"
              @click="nextSession()"
            >
              <span class="material-icons font-bold !text-4xl">skip_next</span>
            </button>
          </div>
        </div>
        <div class="text-center mb-5">
          <h2
            class="hover:cursor-pointer hover:opacity-70"
            @click="resetPomodoro()"
          >#{{ timerStore.currentSession == 1 ? pomodoroCount : pomodoroCount-1 }}</h2>
          <h4>
            {{ timerStore.currentSession == 1 ? 'Time To Focus':'Let\'s Take a Break' }}
          </h4>
        </div>
      </div>
      <div class="grid gap-2.5 my-4">
        <div
          class="nav-task pb-4 border-b-2 border-emerald-400 flex flex-row justify-between items-center"
        >
          <span class="text-lg font-semibold">Tasks</span>
          <button
            class="p-1.5 rounded text-emerald-50 bg-emerald-600/80 hover:bg-emerald-600 flex flex-row"
          >
            <span class="material-icons font-bold">more_vert</span>
          </button>
        </div>
        <div class="flex flex-col gap-y-2" v-if="tasks.length">
          <TaskCard v-for="task in tasks" :key="task.id" :task="task" @delete-task="deleteTask(task.id)" @edit-task="editTask(task.id)"/>
        </div>
        <div v-if="formVisible" ref="formContainer">
          <FormInput @close-form="showForm" @add-task="addTask" />
        </div>
        <button
          v-else
          class="py-4 bg-emerald-800/70 text-lg font-semibold text-emerald-200 hover:bg-emerald-800 rounded border-2 border-dashed border-emerald-400 flex flex-row gap-1 items-center justify-center"
          @click="showForm"
        >
          <span class="material-icons"> add_circle </span> Add Task
        </button>
      </div>
      <div class="my-4">
        <div class="text-center">
          time you focused today : {{ timerStore.timeFocus }}
        </div>
      </div>
    </div>
  </div>
</template>
