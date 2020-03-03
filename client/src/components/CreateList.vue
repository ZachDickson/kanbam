<template>
  <div class="col-md-4 offset-md-4 col-12">
    <form @submit.prevent>
      <input v-model="newList.title" type="text" />
      <button @click="CreateList">create list</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newList: {
        boardId: this.$route.params.boardId,
        authorId: this.$auth.userInfo.email
      }
    };
  },
  methods: {
    async CreateList() {
      await this.$store.dispatch("createList", this.newList);
      console.log(this.newList);
      this.newList.title = "";
    }
  }
};
</script>

<style>
</style>