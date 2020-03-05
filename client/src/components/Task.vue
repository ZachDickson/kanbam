<template>
  <div class="task bg-light rounded mt-5 p-2">
    <div class="d-flex justify-content-between">
      <h3>{{taskData.title}}</h3>
      <div class="dropdown">
        <button
          class="btn btn-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            v-show="list.id != taskData.listId"
            @click="changeList(list.id)"
            v-for="list in lists"
            :key="list.id"
            class="dropdown-item"
          >Move to {{list.title}}</a>
        </div>
        <img
          class="delete-task"
          @click="destroy(taskData)"
          src="../assets/images/deleteTask.png"
          alt="delete"
        />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <button v-if="!form" @click="form=!form" class="btn btn-light add-button">+</button>
      <input
        v-else
        type="text"
        class="rounded-pill border-0 pl-1"
        v-model="newComment.comment"
        placeholder="Create Comment"
      />
      <img v-if="form" class="form" @click="comment()" src="../assets/images/check.png" alt />
      <img v-if="form" class="form" @click="form = !form" src="../assets/images/x.png" alt />
    </div>
    <div
      v-for="commentData in taskData.comments"
      :key="commentData.id"
      class="d-flex justify-content-between bg-primary text-light rounded mb-1 comment"
    >
      {{commentData.comment}}
      <img
        class="form"
        @click="deleteComment(commentData)"
        src="../assets/images/x.png"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ["taskData", "listTitle"],
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