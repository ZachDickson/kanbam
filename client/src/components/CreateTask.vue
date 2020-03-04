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
  props: ["listId"]
};
</script>

<style>
</style>