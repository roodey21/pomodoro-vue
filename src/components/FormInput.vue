<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['close-form', 'add-task'])
const inputTitleRef = ref(null)

onMounted(() => {
  inputTitleRef.value.focus()
})

const task = ref({
  id: Date.now(),
  name: '',
  count: 1,
  notes: '',
  isCompleted: false
})
const showNote = ref(false)

const closeForm = () => {
  emit('close-form')
}
const addTask = () => {
  if(task.value.name === '') {
    alert('Task name cannot be empty')
    return
  }
  emit('add-task', task.value)
}
const incrementTaskCount = () => {
  task.value.count++
}
const decrementTaskCount = () => {
  if (task.value > 1) {
    task.value.count--
  }
}
</script>

<template>
  <div class="input-form card bg-white rounded-lg text-slate-500 overflow-hidden">
    <div class="card-body p-3 grid gap-3">
      <input
        type="text"
        class="py-3 px-2 placeholder:italic font-medium text-slate-900 text-xl focus:border-b"
        placeholder="What are you working on?"
        ref="inputTitleRef"
        v-model="task.name"
        @keyup.enter="addTask"
      />
      <div class="px-2">
        <label for="" class="block font-semibold text-slate-800 mb-1">Est Pomodoros</label>
        <div class="flex flex-row gap-4 mb-4">
          <input
            type="number"
            class="px-2 py-1 bg-slate-200 text-slate-900 font-semibold rounded w-16 no-arrow"
            min="1"
            v-model="task.count"
            @keyup.enter="addTask"
            @keypress.up="incrementTaskCount"
            @keypress.down="decrementTaskCount"
          />
          <div class="flex flex-row gap-1.5">
            <button
              class="p-1.5 py-1 bg-white shadow border-2 border-slate-300/50 font-bold rounded flex flex-row"
              @click="incrementTaskCount"
            >
              <span class="material-icons"> arrow_drop_up </span>
            </button>
            <button
              class="p-1.5 py-1 bg-white shadow border-2 border-slate-300/50 font-bold rounded flex flex-row"
              @click="decrementTaskCount"
            >
              <span class="material-icons"> arrow_drop_down </span>
            </button>
          </div>
        </div>
        <textarea
          class="bg-slate-200 text-slate-900 p-1.5 rounded w-full mb-2 transition-all"
          placeholder="Some notes"
          v-show="showNote"
          v-model="task.notes"
        ></textarea>
        <div class="flex flex-row gap-2">
          <a
            class="text-sm text-slate-600/50 hover:text-slate-600 font-semibold flex items-center hover:cursor-pointer"
            @click="showNote = !showNote"
            v-if="!showNote"
            ><span class="underline mr-1">+ Add Note</span>
          </a>
          <a
            href="#"
            class="text-sm text-slate-600/50 hover:text-slate-600 font-semibold flex items-center"
            ><span class="underline mr-1">+ Add Projects</span>
            <span class="material-icons text-slate-600/70 !text-sm"> lock </span></a
          >
        </div>
      </div>
    </div>
    <div class="card-footer bg-slate-200 p-3 flex flex-row gap-2 justify-end">
      <button class="py-2.5 px-5 rounded text-sm font-semibold" @click="closeForm">Cancel</button>
      <button
        class="py-2.5 px-5 rounded bg-slate-800/90 hover:bg-slate-800 text-rose-50 shadow-xl flex text-sm font-semibold flex-row self-end"
        @click="addTask"
      >
        Add Task
      </button>
    </div>
  </div>
</template>
