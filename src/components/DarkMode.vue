<template>
  <div>
    <button
      type="button"
      class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 max-h-10 max-w-10"
      @click="onThemeChange"
    >
      <Transition name="slide-up">
        <IDark v-if="isDark" />
      </Transition>
      <Transition name="slide-up">
        <ILight v-if="!isDark" />
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
import IDark from "@/components/icons/IDark.vue";
import ILight from "@/components/icons/ILight.vue";
import { ref } from "vue";

const isDark = ref<boolean>(false);

const onThemeChange = () => {
  isDark.value = !isDark.value;

  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
};
</script>

<style scoped>
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
