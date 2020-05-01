<template>
  <div class="card shadow p-3 mb-5 rounded mx-1 my-1">
    <div class="card-body">
      <h5 class="card-title">{{boardData.title}}</h5>
      <p class="card-text">{{boardData.description}}</p>
      <router-link :to="{name: 'board', params: {boardId: boardId}}">
        <button class="btn btn-primary">View Board</button>
      </router-link>
      <button @click="deleteBoard" class="btn btn-warning">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  props: ["boardData", "boardId"],
  mounted() {},
  data() {
    return {
      newBoard: {}
    };
  },
  computed: {},
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoardById", this.boardId);
    }
  }
};
</script>

<style>
h5 {
  text-shadow: white 0px 0px 10px;
}
p {
  text-shadow: white 0px 0px 10px;
}
</style>