<script setup lang="ts">
import IAdd from "@/components/icons/IAdd.vue";
import { useToDoStore } from "@/stores/todo";
import { ref } from "vue";
const store = useToDoStore();

const noteInput = ref("");

const onSaveNote = () => {
  if (noteInput.value.trim()) {
    let date = new Date();
    store.addNote(store.pendingList.length, noteInput.value, false);
    noteInput.value = "";
  }
};
</script>

<template>
  <div class="input-container flex justify-center py-10">
    <div class="input-wrapper drop-shadow-3xl w-max h-10 rounded-full flex dark:drop-shadow-lg">
      <input
        type="text"
        class="w-[25rem] h-full rounded-l-3xl px-5 py-2 dark:bg-slate-800"
        placeholder="Input somethings to do..."
        v-model="noteInput"
        @keyup.enter="onSaveNote"
      />
      <button
        class="bg-black text-white py-2 px-5 rounded-r-3xl dark:bg-[#10608C]"
        @click="onSaveNote"
      >
        <IAdd />
      </button>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  font-style: italic;
  font-size: 0.9em;
}
.input-wrapper{
  box-shadow: 2px 2px 4px #888;
}
</style>
