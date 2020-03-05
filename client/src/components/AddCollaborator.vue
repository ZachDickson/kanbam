<template>
  <div>
    <input v-model="collaborator" type="text" />
    <button @click="addCollab()" class="btn btn-primary">Add collaborator</button>
  </div>
</template>

<script>
export default {
  props: ["boardData"],
  mounted() {},
  data() {
    return {
      collab: {
        id: this.boardData.id,
        collabEmail: this.boardData.collabEmail
      },
      collaborator: ""
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    async addCollab() {
      await this.collab.collabEmail.push(this.collaborator);
      await this.$store.dispatch("editBoard", this.collab);
      this.collaborator = "";
    }
  }
};
</script>

<style>
</style>