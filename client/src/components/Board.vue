<template>
  <div id="card-bg" class="card text-dark mt-5" style>
    <div id="real-bg">
      <h5 class="card-title">{{boardData.title}}</h5>
      <h6 class="card-text">{{boardData.description}}</h6>
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
#real-bg {
  background-image: url(https://store.schoolspecialty.com/OA_HTML/xxssi_ibeGetWCCImage.jsp?docName=F1620581&Rendition=Large);
  background-size: cover;
}
h5 {
  text-shadow: white 0px 0px 10px;
}
p {
  text-shadow: white 0px 0px 10px;
}
</style>