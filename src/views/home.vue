<script setup lang="ts">
import Input from '@/components/Input.vue'
import Pending from '@/components/Pending.vue'
import Done from '@/components/Done.vue'
</script>

<template>
  <main>
    <Input />
    <div class="flex gap-5 p-5">
      <Pending class="basis-1/2" />
      <Done class="basis-1/2" />
    </div>
  </main>
</template>
