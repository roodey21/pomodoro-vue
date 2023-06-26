<template>
  <button
    class="py-1 px-3 text-base font-semibold text-emerald-50 bg-emerald-600 rounded flex flex-row items-center"
    @click="openModal"
  >
    <span class="material-icons !text-lg mr-1">settings</span> Setting
  </button>

  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-10 bg-black/50"
    @click.self="closeModal"
  >
    <div class="bg-white w-full max-w-md rounded-lg shadow overflow-hidden">
      <div class="modal-header flex flex-row justify-between items-center px-6 py-4 border-b">
        <h4 class="text-slate-700 font-semibold text-lg">Setting</h4>
        <div
          class="inline-block text-slate-700/75 hover:text-slate-700 hover:cursor-pointer"
          @click="closeModal"
        >
          <span class="material-icons !font-bold !text-xl">close</span>
        </div>
      </div>
      <div class="modal-body px-6 py-4 flex flex-col">
        <h5 class="text-base flex items-center font-bold text-slate-400 mb-3 uppercase">
          <span class="material-icons-outlined !text-2xl mr-1">timer</span>
          Timer
        </h5>
        <h6 class="text-slate-900 font-bold text-base mb-2">Time (minutes)</h6>
        <div class="grid grid-cols-3 gap-8">
          <div class="form-group">
            <label for="pomo" class="inline-block text-sm font-semibold text-slate-400 mb-2"
              >Pomodoro</label
            >
            <input
              id="pomo"
              type="number"
              class="px-2 py-1.5 bg-slate-200 rounded-sm w-full"
              v-model="timerStore.pomodoro"
            />
          </div>
          <div class="form-group">
            <label for="short" class="inline-block text-sm font-semibold text-slate-400 mb-2"
              >Short Break</label
            >
            <input
              id="short"
              type="number"
              class="px-2 py-1.5 bg-slate-200 rounded-sm w-full"
              v-model="timerStore.shortBreak"
            />
          </div>
          <div class="form-group">
            <label for="long" class="inline-block text-sm font-semibold text-slate-400 mb-2"
              >Long Break</label
            >
            <input
              id="long"
              type="number"
              class="px-2 py-1.5 bg-slate-200 rounded-sm w-full"
              v-model="timerStore.longBreak"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer px-6 py-4 text-right border-t">
        <button
          @click="closeModal"
          class="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTimerStore } from '../stores/timer'

const emit = defineEmits(['open-modal', 'close-modal'])
const timerStore = useTimerStore()

const showModal = ref(false)

watch(
  () => timerStore.pomodoro,
  () => {
    if (timerStore.currentSession === 1) timerStore.setPomodoro()
  }
)
watch(
  () => timerStore.shortBreak,
  () => {
    if (timerStore.currentSession === 2) timerStore.setShortBreak()
  }
)
watch(
  () => timerStore.longBreak,
  () => {
    if (timerStore.currentSession === 3) timerStore.setLongBreak()
  }
)
const closeModal = () => {
  showModal.value = false
}
const openModal = () => {
  showModal.value = true
}
</script>

<style></style>
