<template>
  <div class="list bg-primary rounded mt-5 text-warning">
    <h1>{{listData.title}}</h1>

    <create-task :listId="listData.id" />
    <div v-for="(taskData) in tasks" :key="taskData.id" :task="taskData"></div>
    <task />
  </div>
</template>

<script>
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData.id);
  },
  data() {
    return {
      newTask: {}
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {},
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