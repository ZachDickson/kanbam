<template>
  <div class="bg-dark">
    <div class="container">
      <div class="row">
        <div class="boards col-12">
          <h1></h1>
          <form @submit.prevent="addBoard">
            <input
              class="rounded-pill border-0 height-2 form-control form-control-lg"
              type="text"
              placeholder="title"
              v-model="newBoard.title"
              required
            />
            <input
              class="rounded-pill border-0 height-2 form-control form-control-lg"
              type="text"
              placeholder="description"
              v-model="newBoard.description"
            />
            <button class="btn btn-info" type="submit">Create Board</button>
          </form>
          <div v-for="board in boards" :key="board._id">
            <router-link :to="{name: 'board', params: {boardId: board._id}}">>{{board.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>
<style>
div.bg-dark {
  min-height: 92vh;
}
</style>