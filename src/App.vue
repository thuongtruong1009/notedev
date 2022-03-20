<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Title from "@/components/Title.vue";
import Logo from "@/assets/Logo.vue";
import Static from "@/components/Static.vue";
import DarkMode from "@/components/DarkMode.vue";
import IGithub from "@/components/icons/IGithub.vue";
</script>

<template>
  <main class="main-container w-screen relative min-h-screen min-w-screen dark:bg-[#0F172A] dark:text-gray-400">
    <div class="flex flex-row">
      <div class="left-container basis-1/3">
        <div class="flex justify-center gap-2 py-10">
          <Logo class="drop-shadow-lg" />
          <div class="wrapper">
            <Title msg="Notedev!" />
            <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
            </nav>
          </div>
        </div>
        <Static />
        <div class="flex justify-center gap-5">
          <DarkMode />
          <a href="https://github.com/thuongtruong1009/notedev"><IGithub /></a>
        </div>
      </div>

      <div class="right-container basis-2/3">
        <Transition name="bounce">
          <RouterView />
        </Transition>
      </div>
    </div>

    <footer class="absolute bottom-0 flex justify-center gap-5 w-full">
      <div
        class="bg-white/20 py-2 px-10 rounded-t-xl text-sm dark:bg-black"
      >
        <h1>
          Copyright 2022
          <a
            class="text-green-600"
            href="https://github.com/thuongtruong1009/notedev"
            >&copy; thuongtruong1009</a
          >
          | All rights reserved.
        </h1>
      </div>
    </footer>
  </main>
</template>

<style>
@import "@/assets/base.css";
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
a {
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  margin-top: 0.3rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
</style>
