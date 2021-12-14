<script>
import HelloWorld from "./components/Index.vue";
export default {
  components: { HelloWorld },
  data() {
    return {
      status: true,
    };
  },
  methods: {
    lightMode(status) {
      const colorApp = document.querySelector("#app");
      if (status == true) {
        this.status = false;
        colorApp.style.color = "white";
        colorApp.style.background = "black";
      } else {
        colorApp.style.background =
          "linear-gradient(139deg, #03ddffcb 0%, #ff0381b6 90%)";
        this.status = true;
        colorApp.style.color = "black";
      }
    },
  },
};
</script>

<template>
  <HelloWorld  class="min-width-95" @mode="lightMode(this.status)" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(139deg, #03ddffcb 0%, #ff0381b6 90%);
  /* background-size: 100% 140%; */
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
