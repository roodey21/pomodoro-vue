<script setup>
import { onMounted, ref } from "vue"

const emit = defineEmits(['delete-task', 'edit-task'])
const mouseIsInside = ref(false)

const handleClickOutside = (event) => {
    if(event.target.closest('.dropdown-wrapper') === null) {
        showDropdown.value = false
    }
}

const pomodoroCount = ref(0)
defineProps(['task'])

const showDropdown = ref(false)
const deleteTask = () => {
    emit('delete-task')
}
const editTask = () => {
    emit('edit-task')
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    class="px-3 py-2 w-full bg-white text-slate-900 rounded flex flex-col border-l-4 border-slate-900 group hover:cursor-pointer"
  >
    <div class="flex flex-row items-center justify-between py-2">
      <h3 class="flex items-center font-semibold text-lg">
        <span class="material-icons font-bold mr-2 opacity-70 group-hover:opacity-100"
          :class="{'opacity-100 text-emerald-600': task.isCompleted}"
          @click="task.isCompleted = !task.isCompleted"
          >check_circle</span
        >
        <span :class="{ 'line-through': task.isCompleted }">
          {{ task.name }}
        </span>
      </h3>
      <div class="flex flex-row gap-2 items-center">
        <span class="font-semibold text-slate-800/70">
          {{ pomodoroCount + '/' + task.count }}
        </span>
        <div class="relative dropdown-wrapper">
            <button
              class="p-1 rounded text-slate-400 bg-white hover:bg-slate-200/40 flex flex-row border border-slate-400/50"
              @click="showDropdown = !showDropdown"
            >
              <span class="material-icons font-bold">more_vert</span>
            </button>
            <div @mouseenter="mouseIsInside = true" @mouseleave="mouseIsInside = false" class="absolute right-0 top-2 translate-y-1/2 bg-white shadow-lg rounded p-1 w-48 z-20 border" v-show="showDropdown">
              <button class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded" @click="markAsCompleted">
                <span class="material-icons font-bold !text-sm">check_circle</span>
                <span class="text-sm">Mark As Completed</span>
              </button>
              <button class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded" @click="editTask">
                <span class="material-icons font-bold !text-sm">edit</span>
                <span class="text-sm">Edit</span>
              </button>
              <button class="flex flex-row items-center gap-2 hover:bg-slate-200 w-full p-1 rounded" @click="deleteTask">
                <span class="material-icons font-bold !text-sm">delete</span>
                <span class="text-sm">Delete</span>
              </button>
            </div>
        </div>
      </div>
    </div>
    <div class="pl-8" v-if="task.notes">
      <div class="p-2 bg-amber-100 rounded text-sm">
        {{ task.notes }}
      </div>
    </div>
  </div>
</template>

