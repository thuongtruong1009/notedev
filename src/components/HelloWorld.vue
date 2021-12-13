<template>
  <header>
    <img alt="Vue logo" src="/label_main.png" />
    <h1>{{ msg }}</h1>
  </header>
  <div class="container">
    <form @submit.prevent="addNewToDo">
      <input
        type="text"
        placeholder="✎ add somethings daily to do..."
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '✎ add somethings daily to do...'"
        v-model="inputData"
        name="newToDo"
      />
      <button type="submit">
        <ion-icon name="bookmarks-outline"></ion-icon> Add
      </button>
    </form>
    <div class="un-complete">
      <h2>UNCOMPLETED<img src="/assets/cross.ico" /></h2>
      <ul v-for="(data, index) in listData" :key="data.id">
        <span>{{ index }}</span>
        <li>
          {{ data.content }}
          <div class="tool">
            <ion-icon
              id="trash"
              name="trash-outline"
              @click="removeToDo(index)"
            ></ion-icon>
            <ion-icon
              id="check"
              name="checkmark-done-outline"
              @click="doneTodo(data, index)"
            ></ion-icon>
          </div>
        </li>
      </ul>
    </div>
    <div class="complete">
      <h2>COMPLETED <img src="/assets/tick.ico" /></h2>
      <ul v-for="(unData, unIndex) in unListData" :key="unData.unId">
        <span
          v-bind:style="{
            textDecoration: 'line-through',
            background: 'rgba(0, 177, 59, 0.39)',
          }"
          >{{ unIndex }}</span
        >
        <li
          v-bind:style="{
            textDecoration: 'line-through',
            background: 'rgba(0, 177, 59, 0.39)',
          }"
        >
          {{ unData.unContent }}
          <div class="tool">
            <ion-icon
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
  <div class="statistical">
    <div>
      <p>Total: {{ listData.length + unListData.length }}</p>
      <p>Unfinish: {{ listData.length }}</p>
      <p>Done: {{ unListData.length }}</p>
      <p>
        Process:
        {{ (unListData.length / (listData.length + unListData.length)) * 100 }}%
      </p>
    </div>
    <div>
      <p>Last note: {{ this.timeData }}</p>
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
    <a class="author" href="https://github.com/thuongtruong1009/"
      ><p>view source code</p>
      <ion-icon name="logo-github"></ion-icon>
    </a>
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
      var date = dateArr.join(" ");
      this.timeData = date;
    },
    removeToDo(index) {
      this.listData.splice(index, 1);
    },
    removeUnToDo(index) {
      this.unListData.splice(index, 1);
    },
    doneTodo(data, index) {
      this.unListData.push({ unId: Date.now(), unContent: data.content });
      this.listData.splice(index, 1);
    },
    mode(event) {
      this.$emit("mode", event);
      this.isLight = !this.isLight;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  grid-gap: 20px;
}
header > h1 {
  font-size: 3rem;
  font-family: "Balsamiq Sans", cursive;
  text-shadow: 4px 4px 2px gray;
}
header > img {
  width: 75px;
  height: 80px;
}
/*-----------------container-----------------------*/
.container {
  width: 700px;
  flex-direction: row;
  margin-top: 30px;
}

form {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
}

form input {
  width: 80%;
  height: 40px;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  border-radius: 20px;
  box-shadow: 3px 1px 7px gray;
}

form input[type="text"] {
  padding-left: 15px;
  font-style: italic;
}

form button {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.849);
  border-radius: 13px;
  font-size: 1.1rem;
  border: none;
  transition: 0.4s;
  height: 40px;
  width: 70px;
  cursor: pointer;
  box-shadow: 1px 1px 2px rgb(80, 80, 80);
}

form button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 4px 4px 3px rgba(94, 94, 94, 0.9);
}

.un-complete {
  border-top: 2px solid gray;
  margin-top: 20px;
}

.complete {
  border-top: 2px solid gray;
}

h2 {
  display: flex;
  justify-content: center;
  font-family: "Ubuntu", sans-serif;
}

h2 img {
  transform: translateY(-2px) scale(0.9);
  margin-left: 5px;
}

li {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  width: 90%;
  margin-bottom: 10px;
  padding: 2px 0 10px 20px;
  border-radius: 8px;
  font-family: "Mukta", sans-serif;
  background: rgba(255, 255, 255, 0.2);
  /* background: rgba(0, 177, 59, 0.39), */
}
ul {
  display: flex;
  grid-gap: 10px;
  padding: 0;
}
ul > span {
  width: 8%;
  height: 100%;
  padding: 12px 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 1.5rem;
}
.tool {
  display: flex;
  grid-gap: 25px;
  margin-right: 20px;
  padding-top: 10px;
  cursor: pointer;
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
button {
  outline: none;
  border: none;
  background: transparent;
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
/*---------- statistical --------------------------*/
.statistical {
  display: grid;
  grid-gap: 0;
  background: rgba(150, 150, 150, 0.247);
  /* background: pink; */
  border: 1px dotted rgba(128, 128, 128, 0.719);
  border-radius: 10px;
}
.statistical > div {
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
}
.statistical > p {
  margin: 0;
  padding: 0;
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