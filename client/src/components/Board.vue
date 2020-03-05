<template>
  <div class="card bg-light text-dark mt-5" style>
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
</style>