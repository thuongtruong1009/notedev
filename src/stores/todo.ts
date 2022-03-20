import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useToDoStore = defineStore("todo", () => {
  const note = ref({
    id: 0,
    content: "",
    time: "",
    isDone: false,
  });
  const pendingList = reactive([
    { id: 0, content: "", time: "", isDone: false },
  ]);
  const doneList = reactive([{ id: 0, content: "", time: "", isDone: false }]);
  const deleteCount = ref(0);
  const lengthNote = computed(() => {
    return note.value.content.length;
  });
  const addNote = (id: number, newNote: string, status: boolean) => {
    note.value.id = id;
    note.value.content = newNote;
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getUTCMonth().toString();
    const day = date.getUTCDate().toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const second = date.getSeconds().toString();
    note.value.time = year
      .concat("/")
      .concat(month)
      .concat("/")
      .concat(day)
      .concat(" - ")
      .concat(hour)
      .concat(":")
      .concat(minute)
      .concat(":")
      .concat(second);

    note.value.isDone = status;

    pendingList.push({
      id: note.value.id,
      content: note.value.content,
      time: note.value.time,
      isDone: false,
    });
  };
  const saveDoneList = (
    id: number,
    content: string,
    time: string,
    isDone: boolean
  ) => {
    doneList.push({ id: id, content: content, time: time, isDone: isDone });

    const todo = pendingList.find((todo) => todo.id === id);
    todo.isDone = true;
  };
  const pendingListComputed = computed(() => {
    return pendingList.filter((el) => el.isDone === false);
  });
  const doneListComputed = computed(() => {
    return pendingList.filter((el) => el.isDone === true);
  });
  const deletePendingNote = (id: number) => {
    const todo = pendingListComputed.value.find((todo) => todo.id === id);
    todo.isDone = NaN;
    deleteCount.value += 1;
  };
  const deleteDoneNote = (id: number) => {
    const todo = doneListComputed.value.find((todo) => todo.id === id);
    todo.isDone = NaN;
    deleteCount.value += 1;
  };
  const progressComputed = computed(() => {
    let progress = 0;
    if (doneListComputed.value.length > 0) {
      progress = (doneListComputed.value.length * 100) /
        (pendingListComputed.value.length + doneListComputed.value.length - 1);
    }
    return parseFloat(progress.toString()).toFixed(2);
  });
  return {
    note,
    pendingList,
    pendingListComputed,
    doneList,
    doneListComputed,
    deleteCount,
    lengthNote,
    addNote,
    saveDoneList,
    deletePendingNote,
    deleteDoneNote,
    progressComputed,
  };
});
