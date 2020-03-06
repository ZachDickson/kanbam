<template>
  <div class="list bg-primary rounded mt-5 text-warning p-2">
    <div class="d-flex justify-content-between align-items-center">
      <h1>{{listData.title}}</h1>
      <span class="d-flex align-items-center">
        <img src="../assets/images/delete.png" @click="deleteList" alt="delete" />
        <create-task :listId="listData.id" :boardId="listData.boardId" />
      </span>
    </div>

    <div v-for="(task) in tasks" :key="task.id">
      <task :taskData="task" :listTitle="listData.title" />
    </div>
  </div>
</template>

<script>
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listData"],
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData._id);
    this.$store.dispatch("joinRoom", "tasks");
  },
  beforeDestroy() {
    this.$store.dispatch("leaveRoom", "tasks");
  },
  data() {
    return {};
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    }
  },
  components: {
    Task,
    CreateTask
  }
};
</script>

<style>
div.list {
  padding-bottom: 2rem;
  padding-top: 2rem;
}
img {
  max-height: 2rem;
  cursor: pointer;
}
</style>