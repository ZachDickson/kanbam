<template>
  <div class="bg-dark text-success">
    <button class="btn btn-success" v-show="!create" @click="create = !create">Create Board</button>
    <div class="container">
      <div v-show="create" class="row">
        <div class="boards col-12 col-md-6 offset-md-3 pb-2">
          <h1 class="border-bottom border-success">Create a Board!</h1>
          <form class="create-board" @submit.prevent="addBoard">
            <input
              class="rounded-pill border-0 height-2 form-control form-control-default mb-5 mt-3 p-2 border-bottom border-success"
              type="text"
              placeholder="title"
              v-model="newBoard.title"
              required
            />
            <input
              class="rounded-pill border-0 height-2 form-control form-control-default mb-5 p-2"
              type="text"
              placeholder="description"
              v-model="newBoard.description"
            />
            <button class="btn btn-light" type="submit">Create Board</button>
            <button class="btn btn-warning" @click="create=!create">Cancel</button>
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
      },
      create: false
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    async addBoard() {
      await this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      this.create = false;
      console.log("FALSE");
    }
  },
  components: {
    Board
  }
};
</script>
<style>
div.bg-dark {
  min-height: 92vh;
  font-family: cursive;
}
div.boards {
  margin-top: 10%;
  border: 0.1rem solid #4f48db;
  border-top: 2rem solid #4f48db;
}
</style>