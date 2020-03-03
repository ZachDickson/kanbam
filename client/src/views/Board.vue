<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  mounted() {
    this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    console.log(this.$route.params.boardId);
  },
  props: ["boardId"]
};
</script>
