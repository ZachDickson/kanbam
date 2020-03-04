<template>
  <div class="list bg-primary rounded mt-5 text-warning">
    <h1>{{listData.title}}</h1>

    <create-task :listId="listData.id" />
    <div v-for="(task) in list.tasks" :key="task.id">
      <task :taskData="task" />
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
    list() {
      tasks: [];
    }
  },
  mounted() {
    this.list.tasks = this.$store.dispatch(
      "getTasksByListId",
      this.listData._id
    );
  },
  data() {
    return {
      list: {
        tasks: []
      }
    };
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