<template>
  <div class="board bg-dark text-secondary">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <create-list />
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3" v-for="(list) in lists" :key="list.id">
          <list :listData="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import CreateList from "../components/CreateList";

export default {
  name: "board",
  computed: {
    board() {
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
    CreateList
  },
  props: ["boardId"]
};
</script>
