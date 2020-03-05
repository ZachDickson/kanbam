<template>
  <div class="board bg-dark text-secondary">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <create-list />
    <add-collab :boardData="board" />
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-4" v-for="(list) in lists" :key="list.id">
          <list :listData="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import CreateList from "../components/CreateList";
import AddCollab from "../components/AddCollaborator";

export default {
  name: "board",
  computed: {
    board() {
      console.log("ACTIVE " + this.$store.state.activeBoard);
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  mounted() {
    this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getList", this.$route.params.boardId);
  },
  components: {
    List,
    CreateList,
    AddCollab
  },
  props: ["boardId"]
};
</script>
