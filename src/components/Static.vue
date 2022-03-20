<script setup lang="ts">
import { useToDoStore } from "@/stores/todo";
import ITotal from "@/components/icons/ITotal.vue";
import IDelete from "@/components/icons/IDelete.vue";
import IWrite from "@/components/icons/IWrite.vue";
import IComplete from "@/components/icons/IComplete.vue";
const store = useToDoStore();

</script>

<template>
  <div
    class="static-container flex justify-around flex-row flex-wrap gap-2 p-5 dark:text-[#A5B4FC]"
  >
    <div class="total-note bg-white dark:bg-slate-800">
      <h1><ITotal />Total note</h1>
      <h2>
        {{
          store.pendingListComputed.length + store.doneListComputed.length - 1
        }}
      </h2>
    </div>
    <div class="total-deleted bg-white dark:bg-slate-800">
      <h1><IDelete />Total deleted</h1>
      <h2>{{ store.deleteCount }}</h2>
    </div>
    <div class="total-pending bg-white dark:bg-slate-800">
      <h1><IWrite />Total pending</h1>
      <h2>{{ store.pendingListComputed.length - 1 }}</h2>
    </div>
    <div class="total-complete bg-white dark:bg-slate-800">
      <h1><IComplete />Total completed</h1>
      <h2>{{ store.doneListComputed.length }}</h2>
    </div>
    <div class="progress w-full bg-white rounded-full dark:bg-slate-800">
      <div
        class="bg-blue-600 text-xs font-medium text-blue-100 text-center py-0.5 leading-none rounded-full duration-1000 drop-shadow-lg"
        :style="`width: ${store.progressComputed}%`"
      >
        {{ store.progressComputed }}%
      </div>
    </div>
  </div>
</template>

<style scoped>
.static-container > div {
  padding: 1rem;
  border-radius: 0.5rem;
  flex: 40%;
  text-align: center;
  box-shadow: 2px 2px 4px #888;
}
.static-container > div > h1 {
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
.static-container > div > h2 {
  font-size: 1rem;
  font-weight: 500;
}
</style>
