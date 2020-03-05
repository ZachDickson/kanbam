<template>
  <div class="col-md-6 offset-md-3 col-12 d-flex flex-column align-items-center">
    <form @submit.prevent>
      <input
        v-model="newList.title"
        class="rounded-pill pl-1 border-0 form-control-sm create-list"
        placeholder="List Title"
        type="text"
      />
      <h3 class="create" @click="CreateList">Create List</h3>
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
input.create-list {
  min-width: 30vw;
}
h3.create {
  cursor: pointer;
}
</style>