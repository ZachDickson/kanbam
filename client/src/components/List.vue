<template>
  <div class="list bg-primary rounded mt-5 text-warning">
    <h1>{{listData.title}}</h1>

    <create-task :listId="listData.id" :boardId="listData.boardId" />
    <div v-for="(task) in tasks" :key="task.id">
      <task :taskData="task" />
    </div>
    <button @click="deleteList" class="btn btn-warning">Delete List</button>
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
</style>