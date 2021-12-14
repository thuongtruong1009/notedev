<template>
  <div class="grid w-screen h-screen justify-center items-center">
    <header class="flex justify-center items-center min-h-18">
      <img class="w-13 h-13" src="/label_main.png" alt="Vue logo" />
      <h1 class="text-5xl p-0">{{ msg }}</h1>
    </header>
    <form class="flex justify-center items-center gap-1.5 h-10" @submit.prevent="addNewToDo">
        <input
          class="p-1.5 rounded-3xl outline-none w-11/12 h-10"
          type="text"
          placeholder="✎ add somethings daily to do..."
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = '✎ add somethings daily to do...'"
          v-model="inputData"
          name="newToDo"
        />
        <button
          class="text-white bg-gray-800 rounded-lg text-xl border-none w-20 h-10 cursor-pointer transition duration-400"
          type="submit"
        >
          <ion-icon name="bookmarks-outline"></ion-icon>Add
        </button>
      </form>
    <div class="flex-row">
      <div class="flex justify-center max-h-6">
          <h2>UNCOMPLETED</h2>
          <img class="w-6 h-7" src="/assets/cross.ico" />
        </div>
      <div class="un-complete devide-y-2 divide-solid divide-gray-500 overflow-y-scroll max-h-50">
        <ul class="flex mt-2" v-for="(data, index) in listData" :key="data.id">
          <li
            class="rounded-lg py-1 text-2xl max-w-1/12 p-3 mr-1"
            v-bind:style="{
              background: 'rgba(255, 255, 255, 0.2)'
            }"
          >{{ index }}</li>
          <li
            class="w-11/12 flex justify-between items-center text-2xl rounded-lg pl-3 pr-3"
            v-bind:style="{
              background: 'rgba(255, 255, 255, 0.2)'
            }"
          >
            {{ data.content }}
            <div class="tool">
              <ion-icon
                class="duration-300 mx-2 cursor-pointer"
                id="trash"
                name="trash-outline"
                @click="removeToDo(index)"
              ></ion-icon>
              <ion-icon class="mx-2 cursor-pointer" id="check" name="checkmark-done-outline" @click="doneTodo(data, index)"></ion-icon>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex justify-center max-h-6">
          <h2>COMPLETED</h2>
          <img class="w-6 h-7" src="/assets/tick.ico" />
        </div>
      <div class="complete overflow-y-scroll max-h-50">
        <ul class="flex" v-for="(unData, unIndex) in unListData" :key="unData.unId">
          <li
            class="rounded-lg py-1 text-2xl max-w-1/12 p-3 mr-1"
            v-bind:style="{
              textDecoration: 'line-through',
              background: 'rgba(0, 177, 59, 0.39)',
            }"
          >{{ unIndex }}</li>
          <li
            class="w-11/12 flex justify-between items-center text-2xl rounded-lg pl-3 pr-3"
            v-bind:style="{
              textDecoration: 'line-through',
              background: 'rgba(0, 177, 59, 0.39)',
            }"
          >
            {{ unData.unContent }}
            <div class="tool flex">
              <ion-icon class="mx-2 cursor-pointer"
                id="trash"
                v-bind:style="{ marginRight: '20px' }"
                name="trash-outline"
                @click="removeUnToDo(unIndex)"
              ></ion-icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="statistical rounded-xl border-1 border-dotted border-gray-600 grid h-12" v-bind:style="{background: 'rgba(94, 94, 94, 0.1'}">
      <div class="flex justify-around items-center">
        <p>
          <ion-icon name="wallet-outline"></ion-icon>
          Total: {{ total }}
        </p>
        <p>
          <ion-icon name="extension-puzzle-outline"></ion-icon>
          Unfinish: {{ listData.length }}
        </p>
        <p>
          <ion-icon name="cloud-done-outline"></ion-icon>
          Done: {{ unListData.length }}
        </p>
        <p>
          <ion-icon name="analytics-outline"></ion-icon>
          Process:
          {{ process() }}%
        </p>
      </div>
      <div>
        <p>
          <ion-icon name="pencil-outline"></ion-icon>
          Last note: {{ this.timeData }}
        </p>
      </div>
    </div>
    <div class="footer">
      <div class="mode" @click="mode">
        <ion-icon name="sunny-outline" v-if="isLight == true"></ion-icon>
        <ion-icon
          name="moon-outline"
          v-if="isLight == false"
          v-bind:style="{ filter: 'invert(100%)' }"
        ></ion-icon>
      </div>
      <a class="author" href="https://github.com/thuongtruong1009/">
        <p>view source code</p>
        <ion-icon name="logo-github"></ion-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "MODERN NOTE FOR US",
      inputData: "",
      listData: [],
      unListData: [],
      isLight: true,
      timeData: "",
      total: 0
    };
  },

  methods: {
    addNewToDo() {
      this.listData.push({ id: Date.now(), content: this.inputData });
      this.inputData = "";

      var d = new Date().toString();
      var split = d.split(" ");
      var dateArr = [];
      for (let i = 0; i < 5; i++) {
        dateArr.push(split[i]);
      }
      dateArr.splice(4, 0, " - ");
      this.timeData = dateArr.join(" ");
      this.total = this.listData.length + this.unListData.length;
    },
    removeToDo(index) {
      this.listData.splice(index, 1);
    },
    removeUnToDo(index) {
      this.unListData.splice(index, 1);
      this.total = this.listData.length + this.unListData.length;
    },
    doneTodo(data, index) {
      this.unListData.push({ unId: Date.now(), unContent: data.content });
      this.listData.splice(index, 1);
    },
    mode(event) {
      this.$emit("mode", event);
      this.isLight = !this.isLight;
    },
    process() {
      return parseFloat((this.unListData.length * 100 / (this.listData.length + this.unListData.length)).toString()).toFixed(2);
    },
  },
};
</script>

<style scoped>
header > h1 {
  font-family: "Balsamiq Sans", cursive;
  text-shadow: 4px 4px 2px gray;
}

form input[type="text"] {
  font-style: italic;
  box-shadow: 3px 1px 7px gray;
}

form button {
  box-shadow: 1px 1px 2px rgb(80, 80, 80);
}

form button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 4px 4px 3px rgba(94, 94, 94, 0.9);
}

h2 {
  font-family: "Ubuntu", sans-serif;
}

li {
  font-family: "Mukta", sans-serif;
}
.tool > ion-icon:hover {
  transition: 0.3s;
  transform: scale(1.2) translateY(2px);
}
.tool #trash {
  color: rgb(216, 0, 0);
}
.tool #check {
  color: rgb(1, 165, 1);
  transform: scale(1.2);
}

#delBtn,
#checkBtn {
  transition: 0.3s;
  position: absolute;
  font-size: 1.2rem;
  right: var(--distance);
}

#delBtn:hover,
#checkBtn:hover {
  cursor: pointer;
  transform: translateY(-4px);
}

#delBtn {
  --distance: 30%;
}

#checkBtn {
  --distance: 25%;
}
/*---------- author -------------------------------*/
.footer {
  width: 200px;
  height: 110px;
  position: absolute;
  right: 40px;
  bottom: 30px;
  display: grid;
  grid-template-rows: 50px 50px;
  grid-gap: 10px;
  justify-content: right;
  align-items: center;
}
.author {
  /* position: relative;
  right: 40px;
  bottom: 30px;  */
  transition: 0.4s;
  width: 35px;
  height: 37px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
}
.author:hover {
  background: white;
  width: 180px;
}
.author > p {
  margin-left: 5px;
  margin-top: 10px;
  display: none;
}
.author:hover.author > p {
  display: block;
}
.author > ion-icon {
  width: 35px;
  height: 35px;
  color: rgb(17, 0, 255);
}
.mode {
  /* position: relative;
  margin-right: 10px;
  margin-bottom: 10px; */
  justify-self: end;
  transition: 0.7s;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(253, 253, 253, 0.808);
  box-shadow: 3px 3px 15px rgb(168, 85, 153), -3px 3px 15px rgb(168, 85, 153),
    3px -3px 15px rgb(168, 85, 153), -3px -3px 15px rgb(168, 85, 153);
  cursor: pointer;
}
.mode > ion-icon {
  width: 35px;
  height: 35px;
}
.mode:hover {
  transform: scale(0.9) rotate(360deg);
}
</style>