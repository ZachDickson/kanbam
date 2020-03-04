<template>
  <form @submit.prevent>
    <input v-model="newTask.title" type="text" />
    <button @click="CreateTask">create task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        listId: this.listId,
        boardId: this.boardId,
        authorId: this.$auth.userInfo.email
      }
    };
  },
  methods: {
    async CreateTask() {
      console.log(this.newTask);
      await this.$store.dispatch("createTask", this.newTask);
      this.newTask.title = "";
    }
  },
  props: ["listId", "boardId"]
};
</script>

<style>
</style>