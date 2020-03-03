<template>
  <div class="card" style="width: 18rem;">
    <img src="https://picsum.photos/200/300" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{boardData.title}}</h5>
      <p class="card-text">{{boardData.description}}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  props: ["BoardData", "BoardId"],
  mounted() {},
  data() {
    return {
      newBoard: {}
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>