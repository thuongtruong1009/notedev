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
      const temp = document.querySelector("body");
      const colorText = document.querySelector("#app");
      if (status == true) {
        temp.style.background = "black";
        this.status = false;
        colorText.style.color = "white";
      } else {
        temp.style.background =
          "linear-gradient(139deg, #03ddffcb 0%, #ff0381b6 90%)";
        temp.style.backgroundSize = "100% 140%";
        this.status = true;
        colorText.style.color = "black";
      }
    },
  },
};
</script>

<template>
  <HelloWorld @mode="lightMode(this.status)" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  display: flex;
  justify-content: center;
  height: 100%;
  background: linear-gradient(139deg, #03ddffcb 0%, #ff0381b6 90%);
  background-size: 100% 140%;
}
</style>
