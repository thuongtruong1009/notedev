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
  <HelloWorld  @mode="lightMode(this.status)" />
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
body {

  margin: 0;
  padding: 0;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar,
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #785a28;
  border-radius: 300px;
}
</style>
