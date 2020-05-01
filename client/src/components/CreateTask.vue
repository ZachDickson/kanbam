<template>
  <div class="d-flex flex-column align-items-end">
    <form class @submit.prevent>
      <input
        class="rounded-pill border-1 pl-1 mb-1"
        placeholder="Add a Task"
        v-model="newTask.title"
        type="text"
      />
      <p class="text-success" @click="CreateTask">create task</p>
    </form>
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