<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green text-4xl font-medium dark:text-[#38BDF8]">{{ msg }}</h1>
  </div>
</template>
