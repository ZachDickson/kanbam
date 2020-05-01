<template>
  <div class="task bg-light rounded mt-2 p-2">
    <div class="d-flex justify-content-between">
      <h3>{{taskData.title}}</h3>
      <div>
        <img
          class="delete-task"
          @click="destroy(taskData)"
          src="../assets/images/deleteTask.png"
          alt="delete"
        />
      </div>
    </div>
    <div
      v-for="commentData in taskData.comments"
      :key="commentData.id"
      class="d-flex justify-content-between bg-primary text-light rounded mb-1 comment pl-1"
    >
      {{commentData.comment}}
      <img
        class="form"
        @click="deleteComment(commentData)"
        src="../assets/images/x.png"
        alt
      />
    </div>
    <div class="d-flex justify-content-between">
      <input
        type="text"
        class="rounded-pill border-0 pl-1"
        v-model="newComment.comment"
        placeholder="Create Comment"
      />
      <img class="form" @click="comment()" src="../assets/images/check.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData", "listTitle"],
  mounted() {},
  data() {
    return {
      newComment: {
        creator: this.$auth.userInfo.name,
        taskId: this.taskData.id,
        listId: this.taskData.listId,
        comment: ""
      },
      form: false
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
      (this.newComment.comment = ""), (this.form = false);
    },
    deleteComment(commentData) {
      let banana = {
        commentId: commentData.id,
        listId: this.taskData.listId,
        taskId: this.taskData.id
      };
      this.$store.dispatch("deleteComment", banana);
    },
    changeList(listId) {
      if (this.taskData.listId == listId) {
        return "youre already here!";
      }
      let data = {
        taskId: this.taskData.id,
        listId: listId,
        boardId: this.taskData.boardId,
        priorList: this.taskData.listId,
        task: this.taskData
      };

      this.$store.dispatch("changeList", data);
    }
  }
};
</script>

<style>
div.task {
  padding-bottom: 2rem;
  padding-top: 2rem;
}
img.delete-task {
  height: 1.5rem;
}
img.form {
  height: 1.5rem;
}
div.comment {
  opacity: 90%;
}
</style>