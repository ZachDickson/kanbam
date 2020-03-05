<template>
  <div class="task bg-light rounded mt-5">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >Move Task?</button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a
          @click="changeList(list.id)"
          v-for="list in lists"
          :key="list.id"
          class="dropdown-item"
        >{{list.title}}</a>
      </div>
    </div>
    <h1>{{taskData.title}}</h1>
    <button @click="destroy(taskData)" class="btn btn-warning">Delete</button>
    <input type="text" v-model="newComment.comment" placeholder="You're a noob" />
    <button @click="comment()" class="btn btn-success">Create Comment</button>
    <div v-for="commentData in taskData.comments" :key="commentData.id">
      {{commentData.comment}}
      <button
        @click="deleteComment(commentData)"
        class="btn btn-danger"
      >Delete Comment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  mounted() {
    console.log(this.taskData);
  },
  data() {
    return {
      newComment: {
        creator: this.$auth.userInfo.name,
        taskId: this.taskData.id,
        listId: this.taskData.listId,
        comment: ""
      }
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    destroy(task) {
      this.$store.dispatch("deleteTaskById", task);
    },
    async comment() {
      await this.$store.dispatch("createComment", this.newComment);
    },
    deleteComment(commentData) {
      this.$store.dispatch("deleteComment", update);
    },
    changeList(listId) {
      if (this.taskData.listId == listId) {
        return "youre already here!";
      }
      let banana = {
        taskId: this.taskData.id,
        listId: listId,
        boardId: this.taskData.boardId,
        priorList: this.taskData.listId
      };

      this.$store.dispatch("changeList", banana);
    }
  }
};
</script>

<style>
div.task {
  padding-bottom: 2rem;
  padding-top: 2rem;
}
</style>