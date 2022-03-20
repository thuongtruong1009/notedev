<script setup lang="ts">
import { useToDoStore } from "@/stores/todo";
import ITrash from "@/components/icons/ITrash.vue";
import ICheck from "@/components/icons/ICheck.vue";
import IEmptyNote from "@/components/icons/IEmptyNote.vue";
import IPending from "@/components/icons/IPending.vue";
const store = useToDoStore();
</script>
<template>
  <div class="pending-container bg-white rounded-lg drop-shadow-xl h-min dark:bg-slate-800">
    <div class="px-5 flex justify-center items-center gap-1 border-b border-b-solid dark:border-b-gray-500">
      <ICheck />
      <h1
        class="text-2xl font-medium text-green-600 py-3"
      >
        Done
      </h1>
    </div>
    <Transition name="slide-up">
      <div
        class="pending-empty grid justify-center text-center py-1"
        v-if="store.doneListComputed.length <= 0"
      >
        <IEmptyNote class="dar:bg-gray-500" />
        <p class="text-xs opacity-60">Empty completed note here!</p>
      </div>
    </Transition>
    <div
      class="overflow-y-scroll overflow-x-hidden max-h-[31rem] px-5"
      v-if="store.doneListComputed.length > 0"
    >
      <TransitionGroup name="list" tag="ul">
        <li
          v-for="note in store.doneListComputed"
          :key="note.id"
          class="flex justify-between items-center py-2 line-through"
        >
          <div>
            <h5 class="text-xl dark:text-[#D266A3]">{{ note.content }}</h5>
            <p class="text-xs text-black/50 dark:text-gray-500">{{ note.time }}</p>
          </div>
          <div>
            <ITrash @click="store.deleteDoneNote(note.id)" />
          </div>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* ************************************ */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
