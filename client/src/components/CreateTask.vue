<template>
  <div class="d-flex flex-column align-items-end">
    <form v-if="form" @submit.prevent>
      <input class="rounded-pill border-0 pl-1 mb-1" v-model="newTask.title" type="text" />
      <button class="btn btn-secondary" @click="CreateTask">create task</button>
    </form>
    <button v-if="!form" @click="form = !form" class="btn btn-secondary mr-1">+</button>
    <button v-else @click="form = !form" class="btn btn-warning mr-1">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        listId: this.listId,
        boardId: this.boardId,
        authorId: this.$auth.userInfo.email
      },
      form: false
    };
  },
  methods: {
    async CreateTask() {
      console.log(this.newTask);
      await this.$store.dispatch("createTask", this.newTask);
      this.newTask.title = "";
      this.form = false;
    }
  },
  props: ["listId", "boardId"]
};
</script>

<style>
input {
  outline: 0;
}
</style>